/** Research-only adapter. Raw input uses the unchanged main strict parser. */
import { readFileSync } from "node:fs";
import Ajv2020 from "ajv/dist/2020.js";
import { parseStrictJson } from "../../../../reference/verifier/src/strict-json.js";
import { recomputeContentDigest } from "../../../../reference/verifier/src/digest.js";
import {
  checkRawSize,
  checkParsedLimits,
  startProcessingBudget,
  checkProcessingBudget,
} from "../../../../reference/verifier/src/limits.js";
const budget = startProcessingBudget();
function checkpoint() {
  if (checkProcessingBudget(budget)) throw new Error("ingress processing budget");
}
try {
  // Parent has already capped acquisition. This process is separately wall-bounded.
  const raw = readFileSync(0);
  if (checkRawSize(raw.byteLength)) throw new Error("raw size");
  checkpoint();
  const record = parseStrictJson(new TextDecoder("utf-8", { fatal: true }).decode(raw)) as Record<
    string,
    any
  >;
  if (checkParsedLimits(record).length) throw new Error("parsed resource limit");
  function finite(x: unknown): void {
    if (typeof x === "number" && !Number.isFinite(x)) throw new Error("nonfinite number");
    if (x && typeof x === "object") for (const v of Object.values(x)) finite(v);
  }
  finite(record);
  checkpoint();
  // Trusted candidate envelope from the pinned numerical snapshot, never input URIs.
  const common = JSON.parse(
    readFileSync("/numerical/schemas/common/identifier.schema.json", "utf8"),
  );
  const envelope = JSON.parse(
    readFileSync("/numerical/schemas/record/record-0.2.schema.json", "utf8"),
  );
  delete envelope.$id;
  envelope.properties.$schema = {
    const: "https://nomue.ai/id/schema/record-balanced-two-factor/0.1.0-draft.1",
  };
  envelope.properties.profile_id = {
    const: "https://nomue.ai/id/profile/balanced-two-factor/0.1.0-draft.1",
  };
  envelope.properties.payload = { type: "object" };
  const ajv = new Ajv2020({ strict: true });
  ajv.addSchema(common);
  const envelope_ok = ajv.compile(envelope)(record);
  const integrity_ok = record.integrity?.content_digest === recomputeContentDigest(record);
  checkpoint();
  process.stdout.write(JSON.stringify({ record, envelope_ok, integrity_ok }) + "\n");
} catch {
  // No unbounded raw text or parser error is reflected into the report.
  process.stdout.write('{"ingress_error":"strict/envelope processing refused"}\n');
}
