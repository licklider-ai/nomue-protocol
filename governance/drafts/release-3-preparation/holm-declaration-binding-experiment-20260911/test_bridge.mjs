import fs from "node:fs";
import { isDeepStrictEqual } from "node:util";
import { fileURLToPath } from "node:url";
import {
  checkWithRunner,
  runWorker,
  Refusal,
  prepare,
  boundedNodes,
  depthPreflight,
} from "./bridge.mjs";
import { fixture, fromD0, copy, texts, sync, hex, closed, U } from "./fixtures.mjs";
const optimized = process.argv.includes("--optimized");
const labels = [];
function check(ok, label) {
  if (!ok) throw Error(label);
  labels.push(label);
}
async function accept(f, label) {
  let launches = 0;
  const result = await checkWithRunner(texts(f), (c) => {
    launches++;
    return runWorker(c, optimized);
  });
  check(
    result.outcome === "declaration_bound_supplied_p_arithmetic_consistent" &&
      result.scientific_validity === "not_asserted" &&
      launches === 1,
    label,
  );
}
async function refuse(t, reason, early = true, details = null) {
  let launches = 0;
  try {
    await checkWithRunner(Array.isArray(t) ? t : texts(t), (c) => {
      launches++;
      return runWorker(c, optimized);
    });
    throw Error("accepted " + reason);
  } catch (e) {
    check(e instanceof Refusal && e.reason === reason, "refusal " + reason);
    if (details !== null) check(isDeepStrictEqual(e.details, details), "details " + reason);
  }
  check(launches === (early ? 0 : 1), "launch count " + reason);
}
await accept(fromD0(), "original D0 example");
await accept(fixture(), "one family");
let f = fixture(),
  t = texts(f);
t[2] = JSON.stringify(f.submitted, null, 2);
await checkWithRunner(t, (c) => runWorker(c, optimized));
check(true, "pretty JSON");
const reverseKeys = (v) =>
  Array.isArray(v)
    ? v.map(reverseKeys)
    : v && typeof v === "object"
      ? Object.fromEntries(
          Object.entries(v)
            .reverse()
            .map(([k, x]) => [k, reverseKeys(x)]),
        )
      : v;
t = texts(f);
t[2] = JSON.stringify(reverseKeys(f.submitted));
await checkWithRunner(t, (c) => runWorker(c, optimized));
check(true, "object key order");
for (const mutation of [
  (x) => (x.expected.revision = "changed"),
  (x) => (x.expected.members[0].origin.source_id = "other"),
  (x) => (x.expected.members[0].origin.hypothesis_id = "other"),
  (x) => (x.expected.members[0].origin.sidedness = "one_sided"),
  (x) => (x.expected.members[0].p_hex = hex(1 / 128)),
  (x) => (x.d.dataset.observations[0].value = 77),
  (x) => (x.d.analyses[0].population.definition = "changed"),
  (x) => (x.d.analyses[0].variance_model.declaration = "unknown"),
  (x) => (x.d.analyses[0].procedure_selection.relative_to_outcome_inspection = "after"),
  (x) => {
    const m = x.d.families[0].members[0];
    [m.minuend_group_id, m.subtrahend_group_id] = [m.subtrahend_group_id, m.minuend_group_id];
  },
]) {
  f = fixture();
  mutation(f);
  // The variance enum has a fixed schema: use a statement change instead.
  if (f.d.analyses[0].variance_model.declaration === "unknown") {
    f.d.analyses[0].variance_model.declaration = "not_declared";
    f.d.analyses[0].assumption_statements = ["changed"];
  }
  await refuse(f, "context binding");
}
f = fixture(3, 3, 2);
f.expected.analysis_id = "a-1";
f.expected.family_id = "f-1";
f.expected.result_id = "r-1";
await refuse(f, "context binding");
f = fixture(3, 3, 2);
f.d.analyses[1].population.definition = "unrelated";
await refuse(f, "context binding");
for (const timing of ["after", "not_declared"]) {
  f = fixture();
  f.d.analyses[0].procedure_selection.relative_to_outcome_inspection = timing;
  await accept(sync(f), "timing " + timing);
}
f = fixture();
f.expected.members[1].origin.hypothesis_id = f.expected.members[0].origin.hypothesis_id;
await refuse(f, "source hypothesis duplicate");
f = fixture();
f.d.families[0].members[1].member_id = "m-0";
await refuse(f, "D0 validation");
f = fixture();
f.expected.members.reverse();
await refuse(f, "member order");
f = fixture();
f.expected.members.pop();
await refuse(f, "input count");
f = fixture();
f.submitted.adjusted[2].member_id = "m-0";
await refuse(f, "output member order");
f = fixture();
f.submitted.adjusted.pop();
await refuse(f, "adjusted count");
f = fixture();
f.expected.result_id = "absent";
await refuse(f, "selection binding");
f = fromD0();
f.expected.analysis_id = "a-1";
f.expected.family_id = "f-1";
f.expected.result_id = "r-1";
await refuse(f, "selection kind");
f = fromD0(); // Change selected adjustment family consistently to a many-to-one family.
f.d.families[4].kind = "many_to_one";
f.d.families[4].control_group_id = "g-c";
f.d.families[4].members = f.d.families[4].members.slice(1);
f.d.result_slots[4].member_ids = ["m-1", "m-2"];
await refuse(f, "family kind");
for (const p of ["8000000000000000", "7ff0000000000000", "7ff8000000000000", "3ff0000000000001"]) {
  f = fixture();
  f.expected.members[0].p_hex = p;
  await refuse(f, "p domain");
}
for (const p of ["0x3f90000000000000", "3F90000000000000", 0, null]) {
  f = fixture();
  f.expected.members[0].p_hex = p;
  await refuse(f, "p encoding");
}
for (const [field, value, reason] of [
  ["adjusted_hex", "00", "adjusted encoding"],
  ["adjusted_hex", "g", "adjusted encoding"],
  ["adjusted_hex", "f".repeat(269), "adjusted domain"],
  ["adjusted_hex", 1, "adjusted encoding"],
  ["display_hex", "3FF0000000000000", "display encoding"],
  ["display_hex", "8000000000000000", "display domain"],
]) {
  f = fixture();
  f.submitted.adjusted[2][field] = value;
  await refuse(f, reason);
}
for (const field of ["comparisons", "alpha", "uri", "code", "interval", "sorted_trace"]) {
  f = fixture();
  f.submitted[field] = null;
  await refuse(f, "shape submitted");
}
f = fixture();
f.d.result_slots[0].p = 0.1;
await refuse(f, "D0 validation");
for (const revision of ["x".repeat(65), "é", ""]) {
  f = fixture();
  f.expected.revision = revision;
  await refuse(f, "input id");
}
f = fixture();
f.expected.revision = "x".repeat(64);
await accept(sync(f), "64-char revision");
f = fixture();
f.expected.members[0].origin.hypothesis_id = "A";
f.expected.members[1].origin.hypothesis_id = "a";
await accept(sync(f), "case-sensitive identity");
// Explicit bit-exact collision, not generated from candidate output.
f = fixture();
f.expected.members[0].p_hex = "3fd0000000000003";
f.expected.members[1].p_hex = hex(0.75);
f.expected.members[2].p_hex = hex(1);
sync(f);
f.submitted.adjusted = [
  {
    member_id: "m-0",
    adjusted_hex: ((3n * U) / 4n + (9n * U) / (1n << 54n)).toString(16),
    display_hex: "3fe8000000000004",
  },
  ...["m-1", "m-2"].map((member_id) => ({
    member_id,
    adjusted_hex: U.toString(16),
    display_hex: hex(1),
  })),
];
await accept(f, "collision true exact value");
f.submitted.adjusted[0].adjusted_hex = ((3n * U) / 4n + (8n * U) / (1n << 54n)).toString(16);
await refuse(f, "adjusted mismatch", false);
f = fixture();
f.submitted.adjusted[2].display_hex = hex(0.25);
await refuse(f, "display mismatch", false);
f = fixture();
f.submitted.adjusted[2].adjusted_hex = "0";
await refuse(f, "adjusted mismatch", false);
for (const raw of ['{"x":1,"x":2}', '{"x":"\\ud800"}', '{"x":-0}', '{"x":1e999}', "{"]) {
  t = texts(fixture());
  t[0] = raw;
  await refuse(t, raw.includes("1e999") ? "nonfinite" : "strict JSON");
}
t = texts(fixture());
t[0] = " ".repeat(1048577);
await refuse(t, "raw size");
t = texts(fixture());
t[2] = "[".repeat(35) + "]".repeat(35);
await refuse(t, "raw depth");
try {
  depthPreflight("[".repeat(32) + "]".repeat(32), 32);
  depthPreflight('{"x":"[[[\\\"[["}', 1);
  check(true, "depth boundary and quoted brackets");
} catch (e) {
  throw Error("depth predicate", { cause: e });
}
for (const [value, cap, reason] of [
  [Array(1025).fill(0), 3000, "document container"],
  ["x".repeat(4097), 10, "document string"],
  [Array(10).fill(0), 10, "document nodes"],
]) {
  try {
    boundedNodes(value, cap);
    throw Error("missed node refusal");
  } catch (e) {
    check(e instanceof Refusal && e.reason === reason, "direct " + reason);
  }
}
f = fixture(16, 1024, 16);
await refuse(f, "document nodes");
f = fixture(17);
await refuse(f, "D0 count");
// Private worker corruption is a failed experiment, not an input refusal.
for (const reply of [
  "{}",
  "{}{}",
  '{"adjusted_hex":[],"display_hex":[]}',
  "x".repeat(262145),
  JSON.stringify({ adjusted_hex: ["0", "0", "g"], display_hex: Array(3).fill(hex(0)) }),
]) {
  try {
    await checkWithRunner(texts(fixture()), async () => reply);
    throw Error("bad worker accepted");
  } catch (e) {
    check(
      !(e instanceof Refusal) && e.message.startsWith("worker response"),
      "worker failure " + e.message,
    );
  }
}
try {
  await checkWithRunner(texts(fixture()), async () => {
    throw Error("injected child failure");
  });
  throw Error("missed failure");
} catch (e) {
  check(e.message === "injected child failure", "child exception not refusal");
}
// Diverse small families against the distinct all-subsets Bonferroni oracle.
let seed = 1729;
const rnd = () => {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed;
};
for (let j = 0; j < 24; j++) {
  f = fixture(j % 2 ? 4 : 3);
  const nums = f.expected.members.map(() => rnd() % 257);
  const vals = nums.map((n) => BigInt(n) * (U / 256n));
  const adj = closed(vals);
  f.expected.members.forEach((m, i) => (m.p_hex = hex(nums[i] / 256)));
  sync(f);
  f.submitted.adjusted.forEach((row, i) => {
    row.adjusted_hex = adj[i].toString(16);
    row.display_hex = hex(Number(adj[i] / (U / 256n)) / 256);
  });
  await accept(f, "closed-testing oracle " + j);
}
console.log(JSON.stringify({ checks: labels.length, labels }, null, 2));
