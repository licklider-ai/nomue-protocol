// Test-only synthetic declarations and distinct closed-testing expectations.
import fs from "node:fs";
export const U = 1n << 1074n;
export const copy = (x) => structuredClone(x);
const original = JSON.parse(fs.readFileSync(new URL("./example.json", import.meta.url), "utf8"));
export function hex(v) {
  const b = Buffer.alloc(8);
  b.writeDoubleBE(v);
  return b.toString("hex");
}
export function closed(ps) {
  if (ps.length > 8) throw Error("test oracle cap");
  const out = ps.map(() => 0n);
  for (let mask = 1; mask < 1 << ps.length; mask++) {
    const ids = ps.map((_, i) => i).filter((i) => mask & (1 << i));
    let minimum = U;
    for (const i of ids) if (ps[i] < minimum) minimum = ps[i];
    let local = BigInt(ids.length) * minimum;
    if (local > U) local = U;
    for (const i of ids) if (local > out[i]) out[i] = local;
  }
  return out;
}
export function fixture(k = 3, observations = k, analyses = 1) {
  const d = copy(original),
    at = copy(d.analyses[4]),
    ft = copy(d.families[4]),
    rt = copy(d.result_slots[4]);
  const template = copy(ft.members[0]);
  d.design.groups = Array.from({ length: k }, (_, i) => ({ group_id: "g-" + i }));
  d.design.units = Array.from({ length: observations }, (_, i) => ({
    experimental_unit_id: "u-" + i,
    group_id: "g-" + (i % k),
  }));
  d.dataset.observations = Array.from({ length: observations }, (_, i) => ({
    observation_id: "o-" + i,
    experimental_unit_id: "u-" + i,
    group_id: "g-" + (i % k),
    value: i,
  }));
  ft.members = [];
  for (let a = 0; a < k; a++)
    for (let b = a + 1; b < k; b++)
      ft.members.push({
        ...copy(template),
        member_id: "m-" + ft.members.length,
        minuend_group_id: "g-" + a,
        subtrahend_group_id: "g-" + b,
      });
  at.population.observation_ids = d.dataset.observations.map((x) => x.observation_id);
  rt.member_ids = ft.members.map((x) => x.member_id);
  d.analyses = [];
  d.families = [];
  d.result_slots = [];
  for (let i = 0; i < analyses; i++) {
    d.analyses.push({ ...copy(at), analysis_id: "a-" + i, family_id: "f-" + i });
    d.families.push({ ...copy(ft), analysis_id: "a-" + i, family_id: "f-" + i });
    d.result_slots.push({
      ...copy(rt),
      analysis_id: "a-" + i,
      family_id: "f-" + i,
      result_id: "r-" + i,
    });
  }
  return fromD0(d, "a-0", "f-0", "r-0");
}
export function fromD0(d = copy(original), a = "a-4", f = "f-4", r = "r-4") {
  const family = d.families.find((x) => x.family_id === f),
    m = family.members.length;
  const ps = m === 3 ? [1 / 64, 1 / 32, 1 / 8] : Array(m).fill(1 / 256);
  const expected = {
    kind: "unissued-holm-binding-input-v0",
    revision: "test",
    analysis_id: a,
    family_id: f,
    result_id: r,
    members: family.members.map((x, i) => ({
      member_id: x.member_id,
      origin: { source_id: "source", hypothesis_id: "h-" + i, sidedness: "two_sided" },
      p_hex: hex(ps[i]),
    })),
  };
  const lattice = ps.map((v) => BigInt(v * 256) * (U / 256n));
  const adjusted = m <= 8 ? closed(lattice) : Array(m).fill(BigInt(m) * (U / 256n));
  const rows = adjusted.map((v, i) => ({
    member_id: family.members[i].member_id,
    adjusted_hex: v.toString(16),
    display_hex: hex(Number(v / (U / 256n)) / 256),
  }));
  return {
    d,
    expected,
    submitted: {
      kind: "unissued-holm-binding-evidence-v0",
      binding: { declaration: copy(d), inputs: copy(expected) },
      adjusted: rows,
    },
  };
}
export function texts(f) {
  return [f.d, f.expected, f.submitted].map((x) => JSON.stringify(x));
}
export function sync(f) {
  f.submitted.binding = { declaration: copy(f.d), inputs: copy(f.expected) };
  return f;
}
