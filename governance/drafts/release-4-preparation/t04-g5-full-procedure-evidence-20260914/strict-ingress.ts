/** Research fixture ingress only; no public dispatch or schema registration. */
import { readFileSync } from "node:fs";
import Ajv2020 from "ajv/dist/2020.js";
import { parseStrictJson } from "../../../../reference/verifier/src/strict-json.js";
import { recomputeContentDigest } from "../../../../reference/verifier/src/digest.js";

const seal = process.argv.includes("--seal");
// Trusted repository schemas, never Record-supplied schemas or URIs.
const common = JSON.parse(readFileSync("schemas/common/identifier.schema.json", "utf8"));
const envelope = JSON.parse(readFileSync("schemas/record/record-0.2.schema.json", "utf8"));
delete envelope.$id;
envelope.properties.$schema = {
  const: "https://nomue.ai/id/schema/record-balanced-two-factor/0.1.0-draft.1",
};
envelope.properties.profile_id = {
  const: "https://nomue.ai/id/profile/balanced-two-factor/0.1.0-draft.1",
};
envelope.properties.payload = { type: "object" }; // G5's closed RFC payload gate follows separately.
const ajv = new Ajv2020({ strict: true });
ajv.addSchema(common);
const validateEnvelope = ajv.compile(envelope);
function finite(value: unknown): void {
  if (typeof value === "number" && !Number.isFinite(value))
    throw new Error("nonfinite parsed number");
  if (value && typeof value === "object") for (const child of Object.values(value)) finite(child);
}
for (const line of readFileSync(0, "utf8").split("\n").filter(Boolean)) {
  try {
    const record = parseStrictJson(line) as Record<string, any>;
    finite(record);
    const digest = recomputeContentDigest(record);
    if (seal) {
      record.integrity.content_digest = digest;
      process.stdout.write(JSON.stringify(record) + "\n");
    } else {
      process.stdout.write(
        JSON.stringify({
          record,
          envelope_ok: validateEnvelope(record),
          integrity_ok: record.integrity?.content_digest === digest,
        }) + "\n",
      );
    }
  } catch (error) {
    if (seal) throw error;
    process.stdout.write(
      JSON.stringify({ ingress_error: error instanceof Error ? error.message : String(error) }) +
        "\n",
    );
  }
}
