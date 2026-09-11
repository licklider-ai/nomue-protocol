// Public expectations are authored independently of running the candidate.
import assert from "node:assert/strict";
import fs from "node:fs";
import crypto from "node:crypto";
import canonicalize from "canonicalize";
import { verifyRecordText } from "../../../../reference/verifier/src/verify.ts";
import { verify, IDS } from "./envelope.mjs";
import { publishReceipt, validatePublic } from "./public.mjs";
const load = (n) => JSON.parse(fs.readFileSync(new URL(n, import.meta.url), "utf8"));
const record = load("./example-record.jcs");
const expected = load("./example-expected.json");
const now = () => "2026-09-11T00:00:00.000Z";
const rows = [];
const seal = (r) => {
  const { integrity, ...p } = r;
  integrity.content_digest =
    "sha256:" +
    crypto
      .createHash("sha256")
      .update("nomue/record-content/v1\n")
      .update(canonicalize(p))
      .digest("hex");
  return Buffer.from(canonicalize(r));
};
const baseline = await verify(JSON.stringify(expected), seal(record), { now });
assert.equal(baseline.output.checks[4].outcome, "pass");
const receipt = (r) => ({
  category: "completed_valid",
  causes: {},
  result: {
    output: r.output,
    ...(r.verified_bytes ? { verified_record_base64: r.verified_bytes.toString("base64") } : {}),
  },
});
const good = receipt(baseline);
const success = await publishReceipt(good, { now });
assert.equal(success.output.$schema, IDS.report);
assert.equal(success.output.checks.length, 5);
assert.ok(success.output.checks.every((c) => c.outcome === "pass" && c.reason_codes.length === 0));
assert.equal(success.verified_record_base64, baseline.verified_bytes.toString("base64"));
rows.push("five scoped passes and original bytes");

for (const [edit, want] of [
  [(r) => delete r.payload.contract_id, "NRS-HOLM-RECORD-SCHEMA"],
  [
    (r) => {
      r.payload.contract_id += "/";
    },
    "NRS-HOLM-RECORD-SCHEMA",
  ],
  [
    (r) => {
      r.interpretation_bundle_id += "/";
    },
    "NRS-HOLM-BUNDLE-UNSUPPORTED",
  ],
  [
    (r) => {
      r.interpretation_bundle_id = r.interpretation_bundle_id.replace("nomue.ai", "NOMUE.AI");
    },
    "NRS-HOLM-BUNDLE-UNSUPPORTED",
  ],
  [
    (r) => {
      r.payload.tolerance = 0;
    },
    "NRS-HOLM-RECORD-SCHEMA",
  ],
  [
    (r) => {
      r.payload.inputs.alpha = 0.05;
    },
    "NRS-HOLM-RECORD-SCHEMA",
  ],
]) {
  const r = structuredClone(record);
  edit(r);
  const actual = await publishReceipt(
    receipt(await verify(JSON.stringify(expected), seal(r), { now })),
    { now },
  );
  assert.deepEqual(actual.output.reason_codes, [want]);
  assert.equal(actual.verified_record_base64, undefined);
  rows.push(want);
}
const legacy = verifyRecordText(canonicalize(record));
assert.equal(legacy.refusal.refusal_kind, "unsupported_bundle");
rows.push("registered dispatch refuses proposed bundle");

for (const [field, reason] of [
  ["adjusted_hex", "NRS-HOLM-EXACT-VALUE-MISMATCH"],
  ["display_hex", "NRS-HOLM-DISPLAY-VALUE-MISMATCH"],
]) {
  const r = structuredClone(record);
  r.payload.result.adjusted.at(-1)[field] = field === "adjusted_hex" ? "0" : "0000000000000000";
  const result = await publishReceipt(
    receipt(await verify(JSON.stringify(expected), seal(r), { now })),
    { now },
  );
  assert.deepEqual(result.output.checks[4].reason_codes, [reason]);
  assert.equal(result.output.checks[4].outcome, "fail");
  assert.equal(result.verified_record_base64, undefined);
  rows.push(reason);
}
const failedWorker = await verify(JSON.stringify(expected), seal(record), {
  now,
  runner: async () => {
    throw Error("controlled failure");
  },
});
const error = await publishReceipt(receipt(failedWorker), { now });
assert.equal(error.output.checks[4].execution, "error");
assert.equal(error.output.checks[4].outcome, undefined);
assert.deepEqual(error.output.checks[4].reason_codes, ["NRS-HOLM-WORKER-FAILURE"]);
rows.push("inner worker error has no arithmetic outcome");

// These fixed expectations are not derived from outcomes.json.
const execution = [
  ["cleanup_failed", "internal_error", "NRS-HOLM-CLEANUP-FAILED", undefined],
  ["memory_enforced", "resource_limit", "NRS-HOLM-MEMORY-ENFORCED", "memory_limit"],
  ["pids_enforced", "resource_limit", "NRS-HOLM-PIDS-ENFORCED", "task_limit"],
  ["cancelled", "execution_cancelled", "NRS-HOLM-CANCELLED", undefined],
  ["deadline", "resource_limit", "NRS-HOLM-DEADLINE", "processing_timeout"],
  ["output_overflow", "resource_limit", "NRS-HOLM-OUTPUT-OVERFLOW", "output_size"],
  ["unsupported_host", "unsupported_execution", "NRS-HOLM-UNSUPPORTED-HOST", undefined],
  ["setup_failed", "internal_error", "NRS-HOLM-SETUP-FAILED", undefined],
  ["invalid_input", "input_access_error", "NRS-HOLM-INVALID-INPUT", undefined],
  ["abnormal_exit", "internal_error", "NRS-HOLM-ABNORMAL-EXIT", undefined],
  ["completed_invalid_output", "internal_error", "NRS-HOLM-COMPLETED-INVALID-OUTPUT", undefined],
];
for (let i = 0; i < execution.length; i++) {
  const [category, kind, reason, limit] = execution[i];
  for (let j = i; j < execution.length; j++) {
    const r = { ...good, category, causes: { [category]: true, [execution[j][0]]: true } };
    const actual = await publishReceipt(r, { now });
    assert.equal(actual.output.refusal_kind, kind);
    assert.deepEqual(actual.output.reason_codes, [reason]);
    assert.equal(actual.output.limit_category, limit);
    assert.deepEqual(actual.output.input_evidence, { availability: "not_observed" });
    assert.equal(actual.verified_record_base64, undefined);
    assert.equal(actual.output.checks, undefined);
    rows.push(category + " before " + execution[j][0]);
  }
}
for (const bad of [
  { ...good, causes: { memory_enforced: true } },
  { ...good, causes: { unknown: true } },
  { ...good, category: "unknown" },
  { ...good, result: { output: {} } },
  { ...good, result: { ...good.result, verified_record_base64: "a===" } },
]) {
  const r = await publishReceipt(bad, { now });
  assert.deepEqual(r.output.reason_codes, ["NRS-HOLM-COMPLETED-INVALID-OUTPUT"]);
  assert.equal(r.verified_record_base64, undefined);
  rows.push("invalid receipt fails closed");
}
for (const edit of [
  (r) => {
    r.overall_status = "VERIFIED";
  },
  (r) => {
    r.guarantee_boundary.familywise_error_control = "asserted";
  },
  (r) => {
    r.checks[0].outcome = "fail";
    r.checks[0].reason_codes = ["NRS-HOLM-DIGEST-MISMATCH"];
  },
  (r) => {
    r.checks[4].scope.result_id = "other";
  },
  (r) => {
    r.checks[4].reason_codes = ["NRS-HOLM-CONTEXT-MISMATCH"];
  },
]) {
  const r = structuredClone(success.output);
  edit(r);
  assert.equal(await validatePublic(r), false);
  rows.push("invalid public report rejected");
}
const memory = (
  await publishReceipt({ category: "memory_enforced", causes: { memory_enforced: true } }, { now })
).output;
for (const edit of [
  (r) => delete r.limit_category,
  (r) => {
    r.limit_category = "task_limit";
  },
  (r) => {
    r.stage = "raw";
  },
  (r) => {
    r.outcome = "pass";
  },
]) {
  const r = structuredClone(memory);
  edit(r);
  assert.equal(await validatePublic(r), false);
  rows.push("invalid public refusal rejected");
}
for (const [name, value] of [
  ["example-public-report.json", success.output],
  ["example-public-refusal.json", memory],
  [
    "PUBLIC-RESULTS.json",
    { status: "author checks for unissued candidate", controls: rows.length, rows },
  ],
])
  fs.writeFileSync(new URL(name, import.meta.url), JSON.stringify(value, null, 2) + "\n");
console.log(`${rows.length} public candidate controls passed`);
