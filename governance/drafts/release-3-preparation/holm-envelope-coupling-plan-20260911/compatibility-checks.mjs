// Existing-surface compatibility observations, not an implementation of the plan.
import fs from "node:fs";
import crypto from "node:crypto";
import assert from "node:assert/strict";
import Ajv2020 from "ajv/dist/2020.js";
import { parseStrictJson } from "../../../../reference/verifier/src/strict-json.ts";
const root = new URL("../../../../", import.meta.url);
const read = (p) => JSON.parse(fs.readFileSync(new URL(p, root), "utf8"));
const pins = JSON.parse(fs.readFileSync(new URL("./INPUTS.json", import.meta.url), "utf8"));
for (const p of pins.files)
  assert.equal(
    crypto
      .createHash("sha256")
      .update(fs.readFileSync(new URL(p.path, root)))
      .digest("hex"),
    p.sha256,
    p.path,
  );
const id = read("schemas/common/identifier.schema.json");
const eo = read("schemas/common/execution-outcome-0.2.schema.json");
const record = read("schemas/record/record-0.2.schema.json");
const report = read("schemas/reports/verification-report-0.2.schema.json");
const ajv = new Ajv2020({ strict: false });
ajv.addSchema(id);
ajv.addSchema(eo);
ajv.addSchema(report);
const body = parseStrictJson(
  fs.readFileSync(
    new URL("../holm-record-surface-20260911/example-record.jcs", import.meta.url),
    "utf8",
  ),
);
const rows = [];
function test(name, fn) {
  fn();
  rows.push({ name, result: "pass" });
}
const uri = ajv.compile({ $ref: id.$id + "#/$defs/uri" });
const invariant = ajv.compile({ $ref: eo.$id + "#/$defs/executionOutcomeInvariant" });
const scope = ajv.compile({ $ref: eo.$id + "#/$defs/scope" });
const boundary = ajv.compile({ $ref: report.$id + "#/$defs/guaranteeBoundary" });
test("nine envelope fields required", () =>
  assert.deepEqual(record.required, [
    "$schema",
    "record_type",
    "record_id",
    "revision_id",
    "created_at",
    "interpretation_bundle_id",
    "profile_id",
    "payload",
    "integrity",
  ]));
test("body record ID is not a legacy envelope URI", () => assert.equal(uri(body.record_id), false));
test("body revision ID is not a legacy envelope URI", () =>
  assert.equal(uri(body.revision_id), false));
test("producer URI outside nomue domain is allowed", () =>
  assert.equal(uri("urn:uuid:11111111-1111-4111-8111-111111111111"), true));
test("old envelope retains ITGC payload ownership", () =>
  assert.equal(
    record.properties.payload.$ref,
    "urn:nomue:schema:profile:itgc-guarantee:0.2.0-draft.1",
  ));
test("old envelope retains ITGC profile", () =>
  assert.equal(record.properties.profile_id.const, "urn:nomue:profile:itgc:0.2.0-draft.1"));
test("legacy check pattern rejects HTTPS lexical form", () =>
  assert.equal(
    new RegExp(eo.$defs.checkResult.properties.check_id.pattern).test(
      "https://example.invalid/unissued-check",
    ),
    false,
  ));
test("local result label does not satisfy existing report scope", () =>
  assert.equal(scope({ kind: "result", id: body.result.result_id }), false));
for (const [name, value, accepted] of [
  ["completed without outcome", { execution: "completed" }, false],
  ["completed pass", { execution: "completed", outcome: "pass" }, true],
  [
    "not-run with outcome",
    { execution: "not_run", reason_codes: ["NRS-SCHEMA-INVALID"], outcome: "pass" },
    false,
  ],
  [
    "error with outcome",
    {
      execution: "error",
      reason_codes: ["NRS-SCHEMA-INVALID"],
      error: { error_type: "example", message: "example" },
      outcome: "fail",
    },
    false,
  ],
  [
    "failure without reason entries",
    { execution: "completed", outcome: "fail", reason_codes: [] },
    false,
  ],
])
  test(name, () => assert.equal(invariant(value), accepted));
// Existing code strings above only exercise the invariant subschema, not code semantics.
const gb = Object.fromEntries(
  report.$defs.guaranteeBoundary.required.map((k) => [k, "not_asserted"]),
);
test("existing five-field guarantee boundary accepted", () => assert.equal(boundary(gb), true));
test("additional FWER field needs a successor closed report", () =>
  assert.equal(boundary({ ...gb, familywise_error_control: "not_asserted" }), false));
fs.writeFileSync(
  new URL("./COMPATIBILITY-RESULTS.json", import.meta.url),
  JSON.stringify(
    {
      input_commit: pins.input_commit,
      status: "author compatibility observations; envelope not implemented",
      node: process.version,
      pins_checked: pins.files.length,
      cases: rows.length,
      rows,
    },
    null,
    2,
  ) + "\n",
);
console.log(`${rows.length} existing-surface compatibility observations passed`);
