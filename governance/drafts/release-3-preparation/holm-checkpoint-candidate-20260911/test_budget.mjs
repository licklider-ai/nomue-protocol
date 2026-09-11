// Predetermined resource expectations; clock/heap hooks are trusted test inputs only.
import assert from "node:assert/strict";
import fs from "node:fs";
import { createBudget, exhausted, POLICY } from "./budget.mjs";
import { verify, validateOutput } from "./envelope.mjs";
import { transport } from "./entry.mjs";
import { publishReceipt } from "./public.mjs";
const record = fs.readFileSync(new URL("example-record.jcs", import.meta.url));
const expected = fs.readFileSync(new URL("example-expected.json", import.meta.url), "utf8");
const rows = [];
function instrument(on = () => {}) {
  const state = { time: 0, heap: 0, events: [], reads: [] };
  state.budget = createBudget({
    now: () => state.time,
    heapUsedBytes: () => state.heap,
    onCheckpoint: (name) => {
      state.events.push(name);
      on(name, state);
    },
  });
  state.read = (name) => {
    state.reads.push(name);
    return name === "record" ? record : Buffer.from(expected);
  };
  return state;
}
for (const [time, heap, want] of [
  [POLICY.maxProcessingMs, POLICY.maxHeapBytes, null],
  [POLICY.maxProcessingMs + 1, 0, "processing_timeout"],
  [0, POLICY.maxHeapBytes + 1, "processing_heap"],
  [POLICY.maxProcessingMs + 1, POLICY.maxHeapBytes + 1, "processing_timeout"],
]) {
  const s = instrument();
  s.time = time;
  s.heap = heap;
  assert.equal(exhausted(s.budget, "threshold"), want);
  rows.push({ name: "boundary", time, heap, expected: want });
}
const stages = [
  "record_parsed",
  "storage",
  "expected_parsed",
  "context",
  "declaration",
  "admission",
  "worker",
  "report",
];
for (const stage of stages)
  for (const reason of ["processing_timeout", "processing_heap"]) {
    const s = instrument((name, state) => {
      if (name === stage) {
        if (reason === "processing_timeout") state.time = 5001;
        else state.heap = POLICY.maxHeapBytes + 1;
      }
    });
    let calls = 0;
    // A malformed reply is deliberate: a crossed budget still wins over worker_failure.
    const r = await verify(expected, record, {
      budget: s.budget,
      runner: async () => {
        calls++;
        return "{";
      },
    });
    assert.equal(r.output.reason, reason, stage);
    assert.equal(r.output.stage, "processing");
    assert.ok(await validateOutput(r.output));
    assert.equal(r.verified_bytes, undefined);
    assert.equal(r.payload, undefined);
    assert.equal(r.output.checks, undefined);
    assert.equal(calls, ["worker", "report"].includes(stage) ? 1 : 0);
    rows.push({ name: stage, expected: reason });
  }
// Thrown worker errors also retain a crossed budget, instead of becoming arithmetic error.
for (const thrown of [true, false]) {
  const s = instrument();
  const r = await verify(expected, record, {
    budget: s.budget,
    runner: async () => {
      s.time = 5001;
      if (thrown) throw Error("worker");
      return "{";
    },
  });
  assert.equal(r.output.reason, "processing_timeout");
  rows.push({ name: "worker catch", thrown });
}
for (const phase of ["expected_io", "transport"])
  for (const reason of ["processing_timeout", "processing_heap"]) {
    const s = instrument((name, state) => {
      if (name === phase) {
        if (reason === "processing_timeout") state.time = 5001;
        else state.heap = POLICY.maxHeapBytes + 1;
      }
    });
    const r = JSON.parse(await transport("record", "expected", s));
    assert.equal(r.output.reason, reason);
    assert.equal(r.verified_record_base64, undefined);
    assert.deepEqual(s.reads, phase === "expected_io" ? ["record"] : ["record", "expected"]);
    rows.push({ name: phase, expected: reason });
  }
const shared = instrument((name, s) => {
  if (name === "expected_io") s.time = 4000;
  if (name === "record_parsed" && s.events.filter((x) => x === name).length === 2) s.time = 6000;
});
const sharedResult = JSON.parse(await transport("record", "expected", shared));
assert.equal(sharedResult.output.reason, "processing_timeout");
assert.equal(shared.budget.budget.startedAtMs, 0);
assert.equal(shared.budget.budget.deadlineMs, 5000);
assert.deepEqual(shared.reads, ["record", "expected"]);
rows.push({ name: "two-pass budget cannot reset", expected: "processing_timeout" });
const peak = instrument();
peak.heap = 123;
exhausted(peak.budget, "first");
peak.heap = 1;
exhausted(peak.budget, "second");
assert.equal(peak.budget.observations().sampledPeakHeapBytes, 123);
rows.push({ name: "observed peak retained across checks" });
const raw = instrument();
raw.time = 5001;
const rawResult = await verify(expected, Buffer.from('{"x":1,"x":2}'), { budget: raw.budget });
assert.equal(rawResult.output.reason, "record_duplicate_member");
assert.deepEqual(raw.events, []);
rows.push({ name: "strict input priority before checkpoint" });
for (const mutate of [
  (s) => {
    s.time = NaN;
  },
  (s) => {
    s.time = -1;
  },
  (s) => {
    s.heap = NaN;
  },
  (s) => {
    s.heap = -1;
  },
]) {
  const s = instrument();
  mutate(s);
  const r = await verify(expected, record, { budget: s.budget });
  assert.equal(r.output.refusal_kind, "internal_error");
  assert.equal(r.verified_bytes, undefined);
  rows.push({ name: "invalid trusted observation fails closed" });
}
const good = instrument();
const goodResult = JSON.parse(await transport("record", "expected", good));
assert.ok(goodResult.output.checks.every((c) => c.outcome === "pass"));
assert.equal(goodResult.verified_record_base64, record.toString("base64"));
assert.equal(good.events.filter((x) => x === "record_parsed").length, 2);
assert.equal(good.events.at(-1), "transport");
rows.push({ name: "real worker success and both passes" });
for (const reason of ["processing_timeout", "processing_heap"]) {
  const result = {
    output: {
      kind: goodResult.output.kind.replace("report/", "refusal/"),
      stage: "processing",
      refusal_kind: "resource_limit",
      reason,
    },
  };
  const r = await publishReceipt({ category: "completed_valid", causes: {}, result });
  assert.equal(
    r.output.limit_category,
    reason === "processing_timeout" ? "processing_timeout" : "memory_limit",
  );
  assert.equal(r.verified_record_base64, undefined);
  rows.push({ name: "public checkpoint refusal", reason });
}
for (const category of ["memory_enforced", "cleanup_failed"]) {
  const r = await publishReceipt({ category, causes: { [category]: true }, result: goodResult });
  assert.equal(r.output.output_type, "nomue-verifier-refusal");
  assert.equal(r.verified_record_base64, undefined);
  rows.push({ name: "outer failure discards checkpoint success", category });
}
const result = {
  status: "author checkpoint controls; no formal support adoption",
  policy: POLICY,
  controls: rows.length,
  rows,
};
fs.writeFileSync(
  new URL("BUDGET-RESULTS.json", import.meta.url),
  JSON.stringify(result, null, 2) + "\n",
);
console.log(`${rows.length} checkpoint controls passed`);
