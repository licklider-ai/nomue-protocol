// Exploratory D0 checks only. No registration, numerical procedure or guarantee.
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import Ajv2020 from "ajv/dist/2020.js";
import { parseStrictJson } from "../../../../reference/verifier/src/strict-json.ts";
import { jcsCanonicalize } from "../../../../reference/verifier/src/jcs.ts";
const dir = new URL("./", import.meta.url);
const read = (name) => parseStrictJson(fs.readFileSync(new URL(name, dir), "utf8"));
const schema = read("candidate.schema.json");
const ajv = new Ajv2020({
  allErrors: true,
  strict: true,
  coerceTypes: false,
  removeAdditional: false,
  useDefaults: false,
});
const shape = ajv.compile(schema);
const catalog = new Map(read("fixture-contracts.json").map((c) => [c.contract_ref, c]));
const sameSet = (a, b) =>
  a.length === b.length && a.every((x) => b.includes(x)) && b.every((x) => a.includes(x));
export function check(text) {
  let d;
  try {
    d = parseStrictJson(text);
  } catch (e) {
    return { stage: "raw_json", codes: [e.code ?? "JSON_SYNTAX"] };
  }
  try {
    jcsCanonicalize(d);
  } catch {
    return { stage: "numeric_domain", codes: ["NONFINITE"] };
  }
  if (!shape(d)) return { stage: "schema", codes: ["SHAPE"] };
  const issues = new Set();
  const fail = (c) => issues.add(c);
  const index = (xs, key) => {
    const m = new Map();
    for (const x of xs) {
      if (m.has(x[key])) fail("DUPLICATE_ID");
      else m.set(x[key], x);
    }
    return m;
  };
  const g = index(d.design.groups, "group_id"),
    u = index(d.design.units, "experimental_unit_id");
  const o = index(d.dataset.observations, "observation_id"),
    a = index(d.analyses, "analysis_id");
  const f = index(d.families, "family_id");
  index(d.result_slots, "result_id");
  const groupIds = [...g.keys()];
  const representedUnits = new Set(),
    representedGroups = new Set();
  for (const unit of u.values()) if (!g.has(unit.group_id)) fail("UNIT_GROUP_REF");
  for (const obs of d.dataset.observations) {
    if (!g.has(obs.group_id)) fail("OBS_GROUP_REF");
    const unit = u.get(obs.experimental_unit_id);
    if (!unit) fail("OBS_UNIT_REF");
    else if (unit.group_id !== obs.group_id) fail("UNIT_GROUP_MISMATCH");
    if (representedUnits.has(obs.experimental_unit_id)) fail("REPEATED_UNIT");
    representedUnits.add(obs.experimental_unit_id);
    representedGroups.add(obs.group_id);
  }
  if (!sameSet([...representedUnits], [...u.keys()])) fail("UNIT_COVERAGE");
  if (!sameSet([...representedGroups], groupIds)) fail("GROUP_COVERAGE");
  for (const an of a.values()) {
    if (an.dataset_id !== d.dataset.dataset_id || an.design_id !== d.design.design_id)
      fail("ANALYSIS_INPUT_REF");
    if (!sameSet(an.population.observation_ids, [...o.keys()])) fail("POPULATION_COVERAGE");
    const fam = f.get(an.family_id);
    if (!fam) fail("ANALYSIS_FAMILY_REF");
    else if (fam.analysis_id !== an.analysis_id) fail("FAMILY_ANALYSIS_MISMATCH");
    const contract = catalog.get(an.contract_ref);
    if (!contract) fail("CONTRACT_REF");
    else if (fam && !contract.family_kinds.includes(fam.kind)) fail("CONTRACT_FAMILY_MISMATCH");
  }
  for (const fam of f.values()) {
    const an = a.get(fam.analysis_id);
    if (!an) fail("FAMILY_ANALYSIS_REF");
    else if (an.family_id !== fam.family_id) fail("FAMILY_ANALYSIS_MISMATCH");
    index(fam.members, "member_id");
    if (fam.kind === "omnibus") {
      if (!sameSet(fam.members[0].group_ids, groupIds)) fail("OMNIBUS_GROUP_COVERAGE");
    } else if (fam.kind === "finite_contrasts") {
      for (const member of fam.members) {
        const ids = member.coefficients.map((c) => c.group_id);
        if (new Set(ids).size !== ids.length) fail("COEFFICIENT_DUPLICATE_GROUP");
        if (!sameSet(ids, groupIds)) fail("CONTRAST_DIMENSION");
        // No sum-to-zero, nonzero, scaling, sign, tolerance or equivalence rule.
      }
    } else {
      const edges = [];
      for (const m of fam.members) {
        const x = m.minuend_group_id,
          y = m.subtrahend_group_id;
        if (!g.has(x) || !g.has(y)) fail("MEMBER_GROUP_REF");
        if (x === y) fail("SELF_COMPARISON");
        // Coverage uses endpoint membership only; direction stays explicitly stored.
        if (edges.some(([v, w]) => (x === v && y === w) || (x === w && y === v)))
          fail("DUPLICATE_PAIR");
        edges.push([x, y]);
      }
      if (fam.kind === "all_pairs") {
        for (let i = 0; i < groupIds.length; i++)
          for (let j = i + 1; j < groupIds.length; j++) {
            if (!edges.some((e) => e.includes(groupIds[i]) && e.includes(groupIds[j])))
              fail("PAIR_COVERAGE");
          }
      } else {
        if (!g.has(fam.control_group_id)) fail("CONTROL_REF");
        for (const [x, y] of edges)
          if (y !== fam.control_group_id || x === fam.control_group_id) fail("CONTROL_BINDING");
        const treatments = edges.map((e) => e[0]);
        if (
          !sameSet(
            treatments,
            groupIds.filter((x) => x !== fam.control_group_id),
          )
        )
          fail("CONTROL_COVERAGE");
      }
    }
  }
  const counts = new Map();
  for (const r of d.result_slots) {
    counts.set(r.analysis_id, (counts.get(r.analysis_id) ?? 0) + 1);
    const an = a.get(r.analysis_id),
      fam = f.get(r.family_id),
      c = catalog.get(r.contract_ref);
    if (!an) fail("RESULT_ANALYSIS_REF");
    if (!fam) fail("RESULT_FAMILY_REF");
    if (an && (an.family_id !== r.family_id || an.contract_ref !== r.contract_ref))
      fail("RESULT_ANALYSIS_MISMATCH");
    if (fam && fam.analysis_id !== r.analysis_id) fail("RESULT_ANALYSIS_MISMATCH");
    if (!c) fail("CONTRACT_REF");
    else if (c.result_kind !== r.kind) fail("RESULT_KIND_MISMATCH");
    if (fam) {
      const ids = r.kind === "omnibus" ? [r.member_id] : r.member_ids;
      if (
        !sameSet(
          ids,
          fam.members.map((m) => m.member_id),
        )
      )
        fail("RESULT_MEMBER_COVERAGE");
    }
  }
  for (const id of a.keys()) if (counts.get(id) !== 1) fail("RESULT_SLOT_CARDINALITY");
  return { stage: "relations", codes: [...issues].sort() };
}
function run() {
  const baseline = read("example.json"),
    cases = read("cases.json"),
    results = [];
  for (const c of cases) {
    let raw = c.raw;
    if (raw === undefined) {
      const d = structuredClone(baseline);
      for (const edit of c.edits ?? []) {
        const parts = edit.path
          .split("/")
          .slice(1)
          .map((s) => s.replaceAll("~1", "/").replaceAll("~0", "~"));
        const key = parts.pop();
        let parent = d;
        for (const p of parts) parent = parent[p];
        if (edit.op === "delete") {
          if (Array.isArray(parent)) parent.splice(Number(key), 1);
          else delete parent[key];
        } else parent[key] = edit.value;
      }
      raw = JSON.stringify(d);
    }
    const actual = check(raw);
    results.push({
      case: c.name,
      expected: c.expected,
      actual,
      matched: JSON.stringify(actual) === JSON.stringify(c.expected),
    });
  }
  console.log(
    JSON.stringify(
      {
        scope: "unissued D0 structure and references only",
        declaration_truth: "not_asserted",
        scientific_validity: "not_asserted",
        computability: "not_run",
        recomputation: "not_run",
        total: results.length,
        matched: results.filter((x) => x.matched).length,
        results,
      },
      null,
      2,
    ),
  );
  if (results.some((x) => !x.matched)) process.exitCode = 1;
}
if (process.argv[1] === fileURLToPath(import.meta.url)) run();
