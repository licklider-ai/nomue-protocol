// Hand-authored surface controls; arithmetic expectations use simple exact fractions.
import assert from "node:assert/strict";
import fs from "node:fs";
import { fixture, U } from "../holm-declaration-binding-experiment-20260911/fixtures.mjs";
import { prepare } from "../holm-declaration-binding-experiment-20260911/bridge.mjs";
import { jcsCanonicalize as jcs } from "../../../../reference/verifier/src/jcs.ts";
import {
  evaluate,
  prepareSurface,
  fromLegacyDeclaration,
  toLegacyDeclaration,
  validateReport,
  CAPS,
} from "./surface.mjs";
const f = fixture(3, 3, 2);
const expected = {
  record_id: "record-example",
  revision_id: "test",
  declaration: fromLegacyDeclaration(f.d),
  inputs: f.expected,
};
const record = {
  kind: "unissued-r3-holm-record-body-v1",
  ...structuredClone(expected),
  result: {
    analysis_id: "a-0",
    family_id: "f-0",
    result_id: "r-0",
    adjusted: f.submitted.adjusted,
  },
};
const a = [(3n * U) / 64n, U / 16n, U / 8n].map((x) => x.toString(16));
const d = ["3fa8000000000000", "3fb0000000000000", "3fc0000000000000"];
assert.deepEqual(
  record.result.adjusted.map((x) => x.adjusted_hex),
  a,
);
assert.deepEqual(
  record.result.adjusted.map((x) => x.display_hex),
  d,
);
const reply = JSON.stringify({ adjusted_hex: a, display_hex: d });
const bytes = (x) => Buffer.from(jcs(x));
let launches = 0;
const runner = async () => {
  launches++;
  return reply;
};
const rows = [];
async function check(name, outcome, edit, expectedLaunches = 0, customRunner = runner) {
  let e = structuredClone(expected),
    r = structuredClone(record);
  let raw;
  if (edit) raw = edit(e, r);
  const before = launches;
  const report = await evaluate(JSON.stringify(e, null, 2), raw ?? bytes(r), customRunner);
  assert.equal(report.outcome, outcome, name);
  assert.ok(validateReport(report), name + " report");
  assert.equal(launches - before, expectedLaunches, name + " launches");
  rows.push({ name, outcome, launches: launches - before });
  return report;
}
assert.deepEqual(toLegacyDeclaration(expected.declaration), f.d);
assert.deepEqual(
  prepare(...prepareSurface(JSON.stringify(expected), bytes(record)).texts),
  prepare(jcs(f.d), jcs(f.expected), jcs(f.submitted)),
);
rows.push({ name: "reversible adapter and identical bridge input", outcome: "pass" });
const success = await check("canonical record and pretty external context", "consistent", null, 1);
await check("unrelated analysis bound", "mismatch", (e, r) => {
  r.declaration.analyses[1].analysis_id = "different";
});
await check("revision context mismatch", "mismatch", (e, r) => {
  r.revision_id = "other";
});
await check("revision ownership", "input_refused", (e, r) => {
  e.inputs.revision = r.inputs.revision = "other";
});
await check("result ownership", "input_refused", (e, r) => {
  r.result.result_id = "r-1";
});
await check("legacy deferred field", "input_refused", (e, r) => {
  e.declaration.result_slots[0].payload_status = r.declaration.result_slots[0].payload_status =
    "method_payload_deferred";
});
await check("legacy declaration kind", "input_refused", (e, r) => {
  e.declaration.artifact_kind = r.declaration.artifact_kind = "unissued-d0-declaration-exercise";
});
await check("unknown result field", "input_refused", (e, r) => {
  r.result.extra = true;
});
await check("integer numeric precision loss", "input_refused", (e, r) => {
  r.result.adjusted[0].adjusted_hex = 9007199254740992;
});
await check("integer beyond lattice", "input_refused", (e, r) => {
  r.result.adjusted[0].adjusted_hex = (U + 1n).toString(16);
});
await check("integer leading zero", "input_refused", (e, r) => {
  r.result.adjusted[0].adjusted_hex = "00";
});
await check("negative-zero p", "input_refused", (e, r) => {
  e.inputs.members[0].p_hex = r.inputs.members[0].p_hex = "8000000000000000";
});
await check("output member order", "mismatch", (e, r) => {
  r.result.adjusted.reverse();
});
await check(
  "last exact result mismatch",
  "mismatch",
  (e, r) => {
    r.result.adjusted[2].adjusted_hex = "0";
  },
  1,
);
await check(
  "last display mismatch",
  "mismatch",
  (e, r) => {
    r.result.adjusted[2].display_hex = "0000000000000000";
  },
  1,
);
await check("pretty storage rejected", "input_refused", (e, r) =>
  Buffer.from(JSON.stringify(r, null, 2)),
);
await check("trailing newline rejected", "input_refused", (e, r) =>
  Buffer.concat([bytes(r), Buffer.from("\n")]),
);
await check("BOM rejected", "input_refused", (e, r) =>
  Buffer.concat([Buffer.from([239, 187, 191]), bytes(r)]),
);
await check("invalid UTF-8", "input_refused", () => Buffer.from([255]));
await check("duplicate names", "input_refused", () => Buffer.from('{"x":1,"x":2}'));
await check("unpaired surrogate", "input_refused", () => Buffer.from('{"x":"\\ud800"}'));
await check("depth bound", "input_refused", () =>
  Buffer.from("[".repeat(CAPS.depth + 1) + "0" + "]".repeat(CAPS.depth + 1)),
);
await check("record byte bound", "input_refused", () => Buffer.alloc(CAPS.recordBytes + 1, 32));
await check("malformed worker output", "execution_failed", null, 0, async () => "{");
await check("partial worker output", "execution_failed", null, 0, async () =>
  JSON.stringify({ adjusted_hex: a.slice(0, 2), display_hex: d }),
);
await check("worker exception", "execution_failed", null, 0, async () => {
  throw Error("test");
});
for (const [name, edit] of [
  [
    "overall VERIFIED",
    (r) => {
      r.outcome = "VERIFIED";
    },
  ],
  [
    "scientific assertion",
    (r) => {
      r.guarantee_boundary.scientific_validity = "verified";
    },
  ],
  [
    "success without scope",
    (r) => {
      r.scope = null;
    },
  ],
  [
    "success wrong reason",
    (r) => {
      r.reason = "surface_input";
    },
  ],
  [
    "unknown report field",
    (r) => {
      r.overall_status = "VERIFIED";
    },
  ],
]) {
  const r = structuredClone(success);
  edit(r);
  assert.equal(validateReport(r), false, name);
  rows.push({ name, outcome: "schema_rejected" });
}
const real = await evaluate(JSON.stringify(expected), bytes(record));
assert.equal(real.outcome, "consistent", "real isolated Python worker");
assert.ok(validateReport(real));
rows.push({ name: "real isolated Python worker", outcome: real.outcome });
fs.writeFileSync(new URL("./example-record.jcs", import.meta.url), bytes(record));
fs.writeFileSync(
  new URL("./example-expected.json", import.meta.url),
  JSON.stringify(expected, null, 2) + "\n",
);
fs.writeFileSync(
  new URL("./RESULTS.json", import.meta.url),
  JSON.stringify(
    {
      status: "author self-check, not independent review",
      cases: rows.length,
      node: process.version,
      rows,
    },
    null,
    2,
  ) + "\n",
);
console.log(`${rows.length} surface controls passed`);
