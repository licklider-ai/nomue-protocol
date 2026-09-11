// Fixed input shapes and expectations; reuse the separate closed-testing fixture oracle.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import canonicalize from "canonicalize";
import { fixture, fromD0 } from "../holm-declaration-binding-experiment-20260911/fixtures.mjs";

const directory = process.argv[2];
const template = JSON.parse(
  fs.readFileSync(
    new URL("../holm-envelope-experiment-20260911/example-record.jcs", import.meta.url),
  ),
);
const sha = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");
const nodes = (x) =>
  1 +
  (Array.isArray(x)
    ? x.reduce((n, v) => n + nodes(v), 0)
    : x !== null && typeof x === "object"
      ? Object.values(x).reduce((n, v) => n + nodes(v), 0)
      : 0);
const rows = [];
for (const [name, f, want] of [
  ["baseline", fixture(3, 3, 1), "pass"],
  ["maximum-family", fixture(16, 16, 1), "pass"],
  ["large-population", fixture(3, 1024, 1), "pass"],
  ["combined-large", fixture(16, 256, 16), "pass"],
  ["six-variants", fromD0(), "pass"],
  ["conjunctive-refusal", fixture(16, 1024, 16), "record_nodes"],
]) {
  const record = structuredClone(template);
  const declaration = structuredClone(f.d);
  declaration.artifact_kind = "unissued-r3-declaration-body-v1";
  for (const slot of declaration.result_slots) delete slot.payload_status;
  const inputs = structuredClone(f.expected);
  delete inputs.revision;
  inputs.kind = "unissued-holm-envelope-input-v1";
  record.payload = {
    declaration,
    inputs,
    result: {
      analysis_id: inputs.analysis_id,
      family_id: inputs.family_id,
      result_id: inputs.result_id,
      adjusted: f.submitted.adjusted,
    },
  };
  const { integrity, ...projection } = record;
  integrity.content_digest =
    "sha256:" + sha("nomue/record-content/v1\n" + canonicalize(projection));
  const expected = {
    record_id: record.record_id,
    revision_id: record.revision_id,
    declaration,
    inputs,
  };
  const r = canonicalize(record),
    e = canonicalize(expected);
  fs.writeFileSync(path.join(directory, name + ".record"), r);
  fs.writeFileSync(path.join(directory, name + ".expected"), e);
  rows.push({
    name,
    want,
    groups: declaration.design.groups.length,
    observations: declaration.dataset.observations.length,
    analyses: declaration.analyses.length,
    selected_members: inputs.members.length,
    record_nodes: nodes(record),
    expected_nodes: nodes(expected),
    record_bytes: Buffer.byteLength(r),
    expected_bytes: Buffer.byteLength(e),
    record_sha256: sha(r),
    expected_sha256: sha(e),
  });
}
fs.writeFileSync(path.join(directory, "cases.json"), JSON.stringify(rows, null, 2) + "\n");
