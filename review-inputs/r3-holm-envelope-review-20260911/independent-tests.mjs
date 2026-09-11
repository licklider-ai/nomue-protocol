// Separate investigator's fixed-candidate integration controls; no new numerical method.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import assert from "node:assert/strict";
import { fileURLToPath, pathToFileURL } from "node:url";
const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(process.env.REVIEW_ROOT ?? path.join(here, "../.."));
const { default: canonicalize } = await import(
  pathToFileURL(path.join(root, "node_modules/canonicalize/lib/canonicalize.js")).href
);
const base = "governance/drafts/release-3-preparation/";
const packet = base + "holm-envelope-experiment-20260911/";
const bridge = base + "holm-declaration-binding-experiment-20260911/";
const imp = (p) => import(pathToFileURL(path.join(root, p)).href);
const { verify, validateOutput, projectStoredBytes, storedDigest, legacyTexts, IDS, CAPS } =
  await imp(packet + "envelope.mjs");
const { fromD0 } = await imp(bridge + "fixtures.mjs");
const { check } = await imp(bridge + "d0.mjs");
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
const initial = read(packet + "example-record.jcs");
const bytes = (r) => Buffer.from(canonicalize(r));
const hash = (b) =>
  "sha256:" +
  crypto
    .createHash("sha256")
    .update(Buffer.from("nomue/record-content/v1\n"))
    .update(b)
    .digest("hex");
const seal = (r) => {
  const p = structuredClone(r);
  delete p.integrity;
  r.integrity.content_digest = hash(bytes(p));
  return bytes(r);
};
const context = (r) =>
  JSON.stringify({
    record_id: r.record_id,
    revision_id: r.revision_id,
    declaration: r.payload.declaration,
    inputs: r.payload.inputs,
  });
const exact = [(3n * (1n << 1074n)) / 64n, (1n << 1074n) / 16n, (1n << 1074n) / 8n].map((x) =>
  x.toString(16),
);
const display = ["3fa8000000000000", "3fb0000000000000", "3fc0000000000000"];
const reply = JSON.stringify({ adjusted_hex: exact, display_hex: display });
let calls = 0;
const runner = async () => {
  calls++;
  return reply;
};
const rows = [];
async function test(name, fn) {
  try {
    await fn();
    rows.push({ name, pass: true });
  } catch (e) {
    rows.push({ name, pass: false, error: e.stack });
  }
}
async function run(r = structuredClone(initial), opts = {}) {
  const before = calls;
  const result = await verify(opts.expected ?? context(r), opts.raw ?? seal(r), {
    runner,
    ...opts.options,
  });
  assert.ok(await validateOutput(result.output));
  if (!result.output.checks?.every((c) => c.outcome === "pass"))
    assert.deepEqual(Object.keys(result), ["output"]);
  return { result, calls: calls - before };
}
function stage(result, s, outcome) {
  const c = result.output.checks.find((c) => c.stage === s);
  assert.equal(c.execution, outcome === "error" ? "error" : "completed");
  if (outcome !== "error") assert.equal(c.outcome, outcome);
  return c;
}
await test("cold-start pre-await snapshot", async () => {
  const b = seal(structuredClone(initial));
  const saved = Buffer.from(b);
  const p = verify(context(initial), b, { runner });
  b.fill(0);
  const r = await p;
  assert.ok(r.verified_bytes.equals(saved));
});
await test("real isolated worker hand fractions", async () => {
  const { result } = await run(undefined, { options: { runner: undefined } });
  stage(result, "arithmetic", "pass");
  assert.deepEqual(
    result.payload.result.adjusted.map((r) => r.adjusted_hex),
    exact,
  );
});
for (const text of [
  "urn:review:é",
  "urn:review:é",
  "https://example.invalid/a%2Fb",
  'urn:review:𝄞"\\{},:integrity',
  "urn:review:\u0001",
])
  await test("byte projection " + JSON.stringify(text), async () => {
    const r = structuredClone(initial);
    r.record_id = text;
    const b = seal(r);
    const p = structuredClone(r);
    delete p.integrity;
    assert.ok(projectStoredBytes(b).equals(bytes(p)));
    assert.equal(storedDigest(projectStoredBytes(b)), hash(bytes(p)));
    if (!text.includes("\u0001")) stage((await run(r)).result, "arithmetic", "pass");
  });
for (const [raw, want] of [
  [
    '{"x":1,"\\u0078":2,"z":"\\ud800","n":-0,"interpretation_bundle_id":"bad"}',
    "record_duplicate_member",
  ],
  ['{"x":1,"x":2,', "record_malformed_json"],
  ['{"z":"\\ud800","n":-0}', "record_invalid_unicode"],
  ['{"n":-1e-9999}', "record_negative_zero"],
  ['{"interpretation_bundle_id":"bad","n":1e9999}', "bundle_unsupported"],
  ['{"x":' + JSON.stringify("a".repeat(4097)) + "}", "record_string"],
  [JSON.stringify({ ["k".repeat(4097)]: 0 }), "record_key"],
  [JSON.stringify(Array(1025).fill(0)), "record_container"],
  [JSON.stringify(Array.from({ length: 29 }, () => Array(1000).fill(0))), "record_nodes"],
  ["[".repeat(37) + "0" + "]".repeat(37), "record_depth"],
])
  await test("record priority " + want, async () => {
    const { result, calls } = await run(undefined, { raw: Buffer.from(raw) });
    assert.equal(result.output.reason, want);
    assert.equal(calls, 0);
  });
for (const [text, want] of [
  ['{"x":1,"\\u0078":2}', "expected_duplicate_member"],
  ['{"x":"\\udfff"}', "expected_invalid_unicode"],
  ['{"x":-0}', "expected_negative_zero"],
  ['{"x":1e999}', "expected_schema"],
  [JSON.stringify({ x: "a".repeat(4097) }), "expected_string"],
])
  await test(want, async () => {
    const { result, calls } = await run(undefined, { expected: text });
    assert.equal(result.output.reason, want);
    assert.equal(calls, 0);
  });
await test("bad digest precedes invalid expected context", async () => {
  const r = structuredClone(initial);
  r.created_at = "2026-09-10T00:00:00Z";
  const { result } = await run(r, { raw: bytes(r), expected: "{" });
  stage(result, "integrity", "fail");
});
for (const key of ["record_id", "revision_id"])
  await test("opaque exact URI " + key, async () => {
    const r = structuredClone(initial);
    const expected = context(r);
    r[key] = r[key].replace("urn:", "URN:");
    const { result, calls } = await run(r, { expected });
    stage(result, "context", "fail");
    assert.equal(calls, 0);
  });
const full = fromD0();
function fullRecord() {
  const r = structuredClone(initial);
  r.payload.declaration = structuredClone(full.d);
  r.payload.declaration.artifact_kind = "unissued-r3-declaration-body-v1";
  for (const s of r.payload.declaration.result_slots) delete s.payload_status;
  r.payload.inputs = structuredClone(full.expected);
  delete r.payload.inputs.revision;
  r.payload.inputs.kind = "unissued-holm-envelope-input-v1";
  r.payload.result = {
    analysis_id: full.expected.analysis_id,
    family_id: full.expected.family_id,
    result_id: full.expected.result_id,
    adjusted: structuredClone(full.submitted.adjusted),
  };
  return r;
}
await test("all six D0 variants survive reverse adapter", async () => {
  const r = fullRecord();
  assert.equal(r.payload.declaration.result_slots.length, 6);
  const restored = JSON.parse(legacyTexts(r, canonicalize)[0]);
  assert.deepEqual(restored, full.d);
  stage((await run(r)).result, "arithmetic", "pass");
});
for (let i = 0; i < 6; i++)
  await test("nonselected and selected D0 variant relation " + i, async () => {
    const r = fullRecord();
    r.payload.declaration.result_slots[i].analysis_id = "missing";
    const restored = JSON.parse(legacyTexts(r, canonicalize)[0]);
    const expected = check(JSON.stringify(restored));
    assert.ok(expected.codes.includes("RESULT_ANALYSIS_REF"));
    const { result, calls } = await run(r);
    const c = stage(result, "declaration", "fail");
    assert.deepEqual(c.details.codes, expected.codes);
    assert.equal(c.details.source_stage, expected.stage);
    assert.equal(calls, 0);
  });
await test("complete hand-predicted simultaneous relation codes", async () => {
  const r = structuredClone(initial);
  r.payload.declaration.design.units[0].group_id = "absent";
  r.payload.declaration.dataset.observations[0].experimental_unit_id = "absent";
  const { result } = await run(r);
  assert.deepEqual(stage(result, "declaration", "fail").details.codes, [
    "OBS_UNIT_REF",
    "UNIT_COVERAGE",
    "UNIT_GROUP_REF",
  ]);
});
for (const response of [
  "{}",
  '{"adjusted_hex":[],"display_hex":[]}',
  '{"adjusted_hex":[],"adjusted_hex":[],"display_hex":[]}',
  JSON.stringify({ adjusted_hex: exact, display_hex: ["7ff0000000000000", ...display.slice(1)] }),
  JSON.stringify({ adjusted_hex: exact, display_hex: display, extra: 1 }),
  reply + "x",
])
  await test("invalid worker " + response.slice(0, 60), async () => {
    stage(
      (await run(undefined, { options: { runner: async () => response } })).result,
      "arithmetic",
      "error",
    );
  });
for (let i = 0; i < 3; i++)
  for (const key of ["adjusted_hex", "display_hex"])
    await test("every row mismatch " + i + " " + key, async () => {
      const r = structuredClone(initial);
      r.payload.result.adjusted[i][key] = key === "adjusted_hex" ? "0" : "0000000000000000";
      const { result } = await run(r);
      stage(result, "arithmetic", "fail");
    });
const successful = (await run()).result.output;
for (const [name, edit] of [
  ["order", (r) => r.checks.reverse()],
  ["check identity", (r) => (r.checks[0].check_ref = IDS.checks.context)],
  ["scope", (r) => (r.checks[3].scope.family_id = "other")],
  ["record reference", (r) => (r.record_reference.revision_id = "urn:other:revision")],
  ["pass reason", (r) => (r.checks[0].reasons = ["digest_mismatch"])],
  [
    "stage reason",
    (r) => {
      r.checks[4].outcome = "fail";
      r.checks[4].reasons = ["digest_mismatch"];
    },
  ],
  [
    "unrun first",
    (r) => {
      r.checks[0].execution = "not_run";
      delete r.checks[0].outcome;
      r.checks[0].reasons = ["prerequisite_failed"];
    },
  ],
  [
    "continuation",
    (r) => {
      r.checks[0].outcome = "fail";
      r.checks[0].reasons = ["digest_mismatch"];
    },
  ],
  ["aggregate", (r) => (r.overall_status = "VERIFIED")],
])
  await test("report rejection " + name, async () => {
    const r = structuredClone(successful);
    edit(r);
    assert.equal(await validateOutput(r), false);
  });
const diagnostics = read(packet + "diagnostics.json");
for (const [reason, pair] of Object.entries(diagnostics.refusals))
  await test("refusal tuple " + reason, async () => {
    const r = { kind: IDS.refusal, reason, stage: pair.stage, refusal_kind: pair.refusal_kind };
    assert.equal(await validateOutput(r), true);
    r.stage = pair.stage === "raw" ? "reporting" : "raw";
    assert.equal(await validateOutput(r), false);
  });
await test("supported verifier isolation", async () => {
  const { verifyRecordText } = await imp("reference/verifier/src/verify.ts");
  assert.equal(
    verifyRecordText(seal(structuredClone(initial)).toString()).refusal.refusal_kind,
    "unsupported_bundle",
  );
});
await test("82 controls and 24 labels are accurate", async () => {
  const r = read(packet + "RESULTS.json");
  assert.equal(r.controls, 82);
  assert.equal(r.rows.length, 82);
  assert.equal(new Set(r.rows.map((x) => x.group)).size, 24);
  assert.deepEqual(
    [...new Set(r.rows.map((x) => x.group))].sort(),
    read(base + "holm-envelope-coupling-plan-20260911/CASES.json")
      .cases.map((x) => x.case)
      .sort(),
  );
});
const result = {
  scope:
    "unissued fixed-candidate integration review; no formal acceptance or new primary-source review",
  node: process.version,
  controls: rows.length,
  passed: rows.filter((r) => r.pass).length,
  rows,
};
fs.writeFileSync(
  path.join(here, "independent-results.json"),
  JSON.stringify(result, null, 2) + "\n",
);
console.log(
  JSON.stringify(
    { controls: result.controls, passed: result.passed, failures: rows.filter((r) => !r.pass) },
    null,
    2,
  ),
);
if (result.passed !== result.controls) process.exitCode = 1;
