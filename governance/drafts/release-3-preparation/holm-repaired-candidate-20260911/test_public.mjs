// Public expectations are authored independently of running the candidate.
import assert from "node:assert/strict";
import fs from "node:fs";
import { artifact } from "./test-artifacts.mjs";
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
  [(r) => delete r.payload.contract_id, "candidate:holm:record_schema"],
  [
    (r) => {
      r.payload.contract_id += "/";
    },
    "candidate:holm:record_schema",
  ],
  [
    (r) => {
      r.interpretation_bundle_id += "/";
    },
    "candidate:holm:bundle_unsupported",
  ],
  [
    (r) => {
      r.interpretation_bundle_id = r.interpretation_bundle_id.replace("nomue.ai", "NOMUE.AI");
    },
    "candidate:holm:bundle_unsupported",
  ],
  [
    (r) => {
      r.payload.tolerance = 0;
    },
    "candidate:holm:record_schema",
  ],
  [
    (r) => {
      r.payload.inputs.alpha = 0.05;
    },
    "candidate:holm:record_schema",
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
  ["adjusted_hex", "candidate:holm:exact_value_mismatch"],
  ["display_hex", "candidate:holm:display_value_mismatch"],
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
assert.deepEqual(error.output.checks[4].reason_codes, ["candidate:holm:worker_failure"]);
rows.push("inner worker error has no arithmetic outcome");

// These fixed expectations are not derived from outcomes.json.
const execution = [
  ["cleanup_failed", "internal_error", "candidate:holm:cleanup_failed", undefined],
  ["memory_enforced", "resource_limit", "candidate:holm:memory_enforced", "memory_limit"],
  ["pids_enforced", "resource_limit", "candidate:holm:pids_enforced", "task_limit"],
  ["cancelled", "execution_cancelled", "candidate:holm:cancelled", undefined],
  ["deadline", "resource_limit", "candidate:holm:deadline", "processing_timeout"],
  ["output_overflow", "resource_limit", "candidate:holm:output_overflow", "output_size"],
  ["unsupported_host", "unsupported_execution", "candidate:holm:unsupported_host", undefined],
  ["setup_failed", "internal_error", "candidate:holm:setup_failed", undefined],
  ["invalid_input", "input_access_error", "candidate:holm:invalid_input", undefined],
  ["abnormal_exit", "internal_error", "candidate:holm:abnormal_exit", undefined],
  [
    "completed_invalid_output",
    "internal_error",
    "candidate:holm:completed_invalid_output",
    undefined,
  ],
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
  assert.deepEqual(r.output.reason_codes, ["candidate:holm:completed_invalid_output"]);
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
    r.checks[0].reason_codes = ["candidate:holm:digest_mismatch"];
  },
  (r) => {
    r.checks[4].scope.result_id = "other";
  },
  (r) => {
    r.checks[4].reason_codes = ["candidate:holm:context_mismatch"];
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
const swapped = structuredClone(good);
swapped.result.verified_record_base64 = Buffer.from("{}").toString("base64");
const rejected = await publishReceipt(swapped, { now });
assert.equal(rejected.output.output_type, "nomue-verifier-refusal");
assert.equal(rejected.verified_record_base64, undefined);
rows.push("different forwarded bytes rejected against report digest");

const alteredIntegrity = structuredClone(good);
const alteredRecord = structuredClone(record);
alteredRecord.integrity.content_digest = "sha256:" + "0".repeat(64);
alteredIntegrity.result.verified_record_base64 = Buffer.from(canonicalize(alteredRecord)).toString(
  "base64",
);
assert.equal((await publishReceipt(alteredIntegrity, { now })).verified_record_base64, undefined);
rows.push("altered excluded integrity rejected before forwarding");

for (const [name, value] of [
  ["example-public-report.json", success.output],
  ["example-public-refusal.json", memory],
  [
    "PUBLIC-RESULTS.json",
    { status: "author checks for unissued candidate", controls: rows.length, rows },
  ],
])
  await artifact(name, value);
console.log(`${rows.length} public candidate controls passed`);
