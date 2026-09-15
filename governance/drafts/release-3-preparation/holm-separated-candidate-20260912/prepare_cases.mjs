// Reuse reviewed fixture construction; explicit category expectations live in tests.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import canonicalize from "canonicalize";
import { fixture, fromD0 } from "../holm-declaration-binding-experiment-20260911/fixtures.mjs";
const output = process.argv[2];
const initial = JSON.parse(fs.readFileSync(new URL("./example-record.jcs", import.meta.url)));
for (const [name, f] of [
  ["maximum", fixture(16, 16, 1)],
  ["large-declaration", fixture(3, 1024, 1)],
  ["six-variants", fromD0()],
]) {
  const r = structuredClone(initial);
  const declaration = structuredClone(f.d);
  for (const item of [...declaration.analyses, ...declaration.result_slots]) {
    item.operation_kind = item.contract_ref
      .slice("example-contract-".length, -3)
      .replaceAll("-", "_");
    delete item.contract_ref;
  }
  declaration.artifact_kind = "unissued-r3-declaration-body-v1";
  for (const slot of declaration.result_slots) delete slot.payload_status;
  const inputs = structuredClone(f.expected);
  delete inputs.revision;
  inputs.kind = "unissued-holm-envelope-input-v1";
  r.payload = {
    contract_id: initial.payload.contract_id,
    declaration,
    inputs,
    result: {
      analysis_id: inputs.analysis_id,
      family_id: inputs.family_id,
      result_id: inputs.result_id,
      adjusted: f.submitted.adjusted,
    },
  };
  const { integrity, ...projection } = r;
  integrity.content_digest =
    "sha256:" +
    crypto
      .createHash("sha256")
      .update("nomue/record-content/v1\n")
      .update(canonicalize(projection))
      .digest("hex");
  fs.writeFileSync(path.join(output, name + ".record"), canonicalize(r));
  fs.writeFileSync(
    path.join(output, name + ".expected"),
    canonicalize({ record_id: r.record_id, revision_id: r.revision_id, declaration, inputs }),
  );
}
const cases = [];
const save = (name, r, editExpected, want, raw) => {
  const expected = {
    record_id: r.record_id,
    revision_id: r.revision_id,
    declaration: r.payload.declaration,
    inputs: r.payload.inputs,
  };
  if (editExpected) editExpected(expected);
  const { integrity, ...projection } = r;
  if (!raw)
    integrity.content_digest =
      "sha256:" +
      crypto
        .createHash("sha256")
        .update("nomue/record-content/v1\n")
        .update(canonicalize(projection))
        .digest("hex");
  fs.writeFileSync(path.join(output, name + ".record"), raw ?? canonicalize(r));
  fs.writeFileSync(path.join(output, name + ".expected"), canonicalize(expected));
  cases.push({ name, want });
};
let r = structuredClone(initial);
save(
  "routing",
  { ...r, interpretation_bundle_id: "https://example.invalid/unsupported" },
  null,
  "bundle_unsupported",
);
save("storage", r, null, "stored_bytes_noncanonical", canonicalize(r) + "\n");
save("raw", r, null, "record_duplicate_member", '{"a":1,"a":2}');
save("parsed", r, null, "record_depth", "[".repeat(37) + "0" + "]".repeat(37));
r = structuredClone(initial);
delete r.revision_id;
save("schema", r, null, "record_schema");
r = structuredClone(initial);
r.created_at = "2026-09-10T00:00:00Z";
save("integrity", r, null, "integrity:fail", canonicalize(r));
r = structuredClone(initial);
save(
  "context",
  r,
  (e) => {
    e.revision_id = "urn:other:revision";
  },
  "context:fail",
);
r = structuredClone(initial);
r.payload.declaration.result_slots[0].analysis_id = "missing";
save("declaration", r, null, "declaration:fail");
r = structuredClone(initial);
r.payload.result.analysis_id = "other";
save("admission", r, null, "admission:fail");
r = structuredClone(initial);
r.payload.result.adjusted[0].adjusted_hex = "0";
save("arithmetic", r, null, "arithmetic:fail");
fs.writeFileSync(path.join(output, "cases.json"), JSON.stringify(cases));
