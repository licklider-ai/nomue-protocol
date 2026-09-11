// Reuse reviewed fixture construction; explicit category expectations live in tests.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import canonicalize from "canonicalize";
import { fixture, fromD0 } from "../holm-declaration-binding-experiment-20260911/fixtures.mjs";
const output = process.argv[2];
const initial = JSON.parse(
  fs.readFileSync(
    new URL("../holm-envelope-experiment-20260911/example-record.jcs", import.meta.url),
  ),
);
for (const [name, f] of [
  ["maximum", fixture(16, 16, 1)],
  ["large-declaration", fixture(3, 1024, 1)],
  ["six-variants", fromD0()],
]) {
  const r = structuredClone(initial);
  const declaration = structuredClone(f.d);
  declaration.artifact_kind = "unissued-r3-declaration-body-v1";
  for (const slot of declaration.result_slots) delete slot.payload_status;
  const inputs = structuredClone(f.expected);
  delete inputs.revision;
  inputs.kind = "unissued-holm-envelope-input-v1";
  r.payload = {
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
