import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
// Default fits review-inputs/<review-packet>/ placement; REVIEW_ROOT permits external execution.
const root = path.resolve(
  process.env.REVIEW_ROOT ?? fileURLToPath(new URL("../../", import.meta.url)),
);
const p = "governance/drafts/release-3-preparation/";
const here = p + "holm-record-surface-20260911/";
const old = p + "holm-declaration-binding-experiment-20260911/";
const imp = (x) => import(pathToFileURL(path.join(root, x)));
const S = await imp(here + "surface.mjs");
const B = await imp(old + "bridge.mjs");
const { jcsCanonicalize: jcs } = await imp("reference/verifier/src/jcs.ts");
const { fixture, fromD0 } = await imp(old + "fixtures.mjs");
const read = (x) => JSON.parse(fs.readFileSync(path.join(root, x)));
const clone = structuredClone;
const bytes = (x) => Buffer.from(jcs(x));
const rows = [];
function passed(name, extra = {}) {
  rows.push({ name, ...extra });
}
function surface(f) {
  const expected = {
    record_id: "review",
    revision_id: f.expected.revision,
    declaration: S.fromLegacyDeclaration(f.d),
    inputs: clone(f.expected),
  };
  return {
    expected,
    record: {
      kind: "unissued-r3-holm-record-body-v1",
      ...clone(expected),
      result: {
        analysis_id: f.expected.analysis_id,
        family_id: f.expected.family_id,
        result_id: f.expected.result_id,
        adjusted: clone(f.submitted.adjusted),
      },
    },
  };
}
const base = surface(fixture());
let launches = 0;
const runner = async (c) => {
  launches++;
  const n = c.members.map((x) => decode(x.p));
  const a = closed(n);
  return JSON.stringify({
    adjusted_hex: a.map((x) => x.toString(16)),
    display_hex: a.map(display),
  });
};
const U = 1n << 1074n;
function decode(h) {
  const v = BigInt("0x" + h),
    e = Number((v >> 52n) & 2047n),
    m = v & ((1n << 52n) - 1n);
  return e === 0 ? m : ((1n << 52n) + m) << BigInt(e - 1);
}
// Exhaustive intersection oracle for <= 6 members; no candidate arithmetic called.
function closed(ps) {
  assert.ok(ps.length <= 6);
  const out = ps.map(() => 0n);
  for (let mask = 1; mask < 1 << ps.length; mask++) {
    const ids = ps.map((_, i) => i).filter((i) => mask & (1 << i));
    const v = ids.reduce((a, i) => (a < ps[i] ? a : ps[i]), U) * BigInt(ids.length);
    const q = v > U ? U : v;
    for (const i of ids) if (q > out[i]) out[i] = q;
  }
  return out;
}
function display(n) {
  if (n === 0n) return "0000000000000000";
  const shift = Math.max(0, n.toString(2).length - 53);
  let m = n >> BigInt(shift);
  if (shift) {
    const rem = n - (m << BigInt(shift)),
      half = 1n << BigInt(shift - 1);
    if (rem > half || (rem === half && m & 1n)) m++;
  }
  if (m === 1n << 53n) return (BigInt(shift + 2) << 52n).toString(16).padStart(16, "0");
  const word = shift === 0 && m < 1n << 52n ? m : (BigInt(shift + 1) << 52n) + (m - (1n << 52n));
  return word.toString(16).padStart(16, "0");
}
async function check(name, want, pair = clone(base), custom = runner, raw, etext) {
  const before = launches;
  const report = await S.evaluate(
    etext ?? JSON.stringify(pair.expected),
    raw ?? bytes(pair.record),
    custom,
  );
  assert.equal(report.outcome, want, name);
  assert.ok(S.validateReport(report), name + " report");
  assert.equal(report.p_generation, "not_run");
  assert.ok(Object.values(report.guarantee_boundary).every((x) => x === "not_asserted"));
  passed(name, { outcome: report.outcome, launches: launches - before });
  return report;
}
// Exhaustively compare all six schema slot branches after only documented transformations.
const legacy = read(old + "candidate.schema.json");
for (const key of ["$schema", "title", "$comment"]) delete legacy[key];
legacy.properties.artifact_kind.const = "unissued-r3-declaration-body-v1";
for (const slot of legacy.properties.result_slots.items.oneOf) {
  slot.required = slot.required.filter((x) => x !== "payload_status");
  delete slot.properties.payload_status;
}
function refs(v) {
  if (Array.isArray(v)) v.forEach(refs);
  else if (v && typeof v === "object")
    for (const [k, x] of Object.entries(v)) {
      if (k === "$ref") v[k] = x.replace("#/$defs/", "#/$defs/declaration/$defs/");
      else refs(x);
    }
}
refs(legacy);
const rs = read(here + "record-body.schema.json"),
  es = read(here + "expected-context.schema.json");
assert.deepEqual(legacy, rs.$defs.declaration);
assert.deepEqual(rs.$defs, es.$defs);
for (const k of ["record_id", "revision_id", "declaration", "inputs"])
  assert.deepEqual(rs.properties[k], es.properties[k]);
passed(
  "all six slot schemas equal precisely transformed legacy; expected and record schemas agree",
);
const mixed = fromD0();
const mix = surface(mixed);
assert.equal(new Set(mixed.d.result_slots.map((x) => x.kind)).size, 6);
assert.deepEqual(S.toLegacyDeclaration(mix.expected.declaration), mixed.d);
assert.deepEqual(
  B.prepare(...S.prepareSurface(JSON.stringify(mix.expected), bytes(mix.record)).texts),
  B.prepare(...[mixed.d, mixed.expected, mixed.submitted].map(jcs)),
);
await check(
  "all six slot variants retained, reversible, legacy preparation identical",
  "consistent",
  mix,
);
for (let i = 0; i < 6; i++) {
  let x = clone(mix);
  x.record.declaration.result_slots[i].result_id += "-changed";
  await check("slot " + i + " independently context bound", "mismatch", x);
  x = clone(mix);
  x.record.declaration.result_slots[i].payload_status = x.expected.declaration.result_slots[
    i
  ].payload_status = "method_payload_deferred";
  await check("slot " + i + " legacy field refused", "input_refused", x);
}
for (const field of ["analyses", "families", "result_slots"]) {
  const x = clone(mix);
  x.record.declaration[field].reverse();
  await check(field + " order bound", "mismatch", x);
}
const pvectors = [
  ["0000000000000000", "0000000000000001", "3ff0000000000000"],
  ["0000000000000001", "0000000000000001", "0000000000000002"],
  ["3fd5555555555555", "3fd5555555555556", "3fefffffffffffff"],
  ["3fa0000000000001", "3fa0000000000001", "3fa0000000000002"],
  ["0010000000000000", "000fffffffffffff", "0010000000000001"],
];
for (const [i, ps] of pvectors.entries()) {
  const x = clone(base);
  const a = closed(ps.map(decode));
  for (let j = 0; j < 3; j++) {
    x.expected.inputs.members[j].p_hex = x.record.inputs.members[j].p_hex = ps[j];
    x.record.result.adjusted[j].adjusted_hex = a[j].toString(16);
    x.record.result.adjusted[j].display_hex = display(a[j]);
  }
  await check("independent exact intersection oracle vector " + i, "consistent", x, runner);
  // Omit the third evaluate argument to exercise the real isolated worker.
  const real = await S.evaluate(JSON.stringify(x.expected), bytes(x.record));
  assert.equal(real.outcome, "consistent");
  passed("real worker exact oracle vector " + i, { outcome: real.outcome });
  for (let j = 0; j < 3; j++) {
    const y = clone(x);
    y.record.result.adjusted[j].adjusted_hex = (a[j] === 0n ? 1n : a[j] - 1n).toString(16);
    await check("exact row bound " + i + "/" + j, "mismatch", y);
  }
}
for (const value of [
  "8000000000000000",
  "7ff0000000000000",
  "7ff8000000000000",
  "3ff0000000000001",
]) {
  const x = clone(base);
  x.record.inputs.members[0].p_hex = x.expected.inputs.members[0].p_hex = value;
  await check("p domain " + value, "input_refused", x);
}
for (const field of ["source_id", "hypothesis_id", "sidedness"]) {
  const x = clone(base);
  x.record.inputs.members[0].origin[field] = field === "sidedness" ? "one_sided" : "changed";
  await check("input origin " + field + " bound", "mismatch", x);
}
for (const name of [
  "newline",
  "BOM",
  "duplicate escaped member",
  "negative zero token",
  "overlong UTF-8",
  "surrogate",
]) {
  let raw = bytes(base.record);
  if (name === "newline") raw = Buffer.concat([raw, Buffer.from("\n")]);
  if (name === "BOM") raw = Buffer.concat([Buffer.from([239, 187, 191]), raw]);
  if (name === "duplicate escaped member") raw = Buffer.from('{"x":1,"\\u0078":2}');
  if (name === "negative zero token")
    raw = Buffer.from(jcs(base.record).replace('"value":0', '"value":-0'));
  if (name === "overlong UTF-8") raw = Buffer.from([0xc0, 0xaf]);
  if (name === "surrogate") raw = Buffer.from('{"x":"\\ud800"}');
  await check("strict bytes " + name, "input_refused", clone(base), runner, raw);
}
await check(
  "external duplicate member refused",
  "input_refused",
  clone(base),
  runner,
  undefined,
  '{"x":1,"x":2}',
);
await check(
  "expected byte cap",
  "input_refused",
  clone(base),
  runner,
  undefined,
  " ".repeat(S.CAPS.expectedBytes + 1),
);
for (const output of ["{}", '{"adjusted_hex":[],"display_hex":[]}', '{"x":1,"x":2}', null])
  await check(
    "malformed worker " + String(output),
    "execution_failed",
    clone(base),
    async () => output,
  );
// Every output reason is fixed for its outcome, regardless of scope.
const good = await check("baseline report", "consistent");
for (const outcome of ["consistent", "mismatch", "input_refused", "execution_failed"])
  for (const reason of [
    "all_rows_match",
    "context_or_value_mismatch",
    "surface_input",
    "worker_or_dependency_failure",
  ]) {
    const x = { ...clone(good), outcome, reason };
    assert.equal(
      S.validateReport(x),
      {
        consistent: "all_rows_match",
        mismatch: "context_or_value_mismatch",
        input_refused: "surface_input",
        execution_failed: "worker_or_dependency_failure",
      }[outcome] === reason,
    );
  }
passed("16 outcome/reason combinations checked");
// Outer schema/parse acceptance followed by legacy node admission refusal.
for (const [k, n, a] of [
  [16, 16, 1],
  [3, 1024, 1],
  [3, 1024, 16],
  [16, 1024, 16],
]) {
  const x = surface(fixture(k, n, a));
  assert.ok(S.validateExpected(x.expected));
  assert.ok(S.validateRecord(x.record));
  let prep, err;
  try {
    prep = S.prepareSurface(JSON.stringify(x.expected), bytes(x.record));
  } catch (e) {
    err = e.message;
  }
  if (prep) {
    let why = null;
    try {
      B.prepare(...prep.texts);
    } catch (e) {
      why = e.reason;
    }
    const out = await S.evaluate(JSON.stringify(x.expected), bytes(x.record));
    assert.equal(out.outcome, why ? "input_refused" : "consistent");
    passed("layered dimensions " + [k, n, a].join("/"), {
      outer: "admitted",
      legacy_refusal: why,
      outcome: out.outcome,
      bytes: bytes(x.record).length,
    });
  } else {
    assert.equal(
      (await S.evaluate(JSON.stringify(x.expected), bytes(x.record))).outcome,
      "input_refused",
    );
    passed("layered dimensions " + [k, n, a].join("/"), { outer: err });
  }
}
fs.writeFileSync(
  new URL("./independent-results.json", import.meta.url),
  JSON.stringify(
    {
      node: process.version,
      python: process.env.NOMUE_EXPERIMENT_PYTHON,
      cases: rows.length,
      rows,
    },
    null,
    2,
  ) + "\n",
);
console.log(rows.length + " independent controls passed");
