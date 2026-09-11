// Reviewer-authored expectations: no candidate-derived oracle or fixture edits.
import fs from "node:fs";
import Ajv2020 from "ajv/dist/2020.js";
import { createHash } from "node:crypto";
import { check } from "../../governance/drafts/release-3-preparation/declaration-surface-20260910/check.mjs";
import { parseStrictJson } from "../../reference/verifier/src/strict-json.ts";
import { jcsCanonicalize } from "../../reference/verifier/src/jcs.ts";
const root = new URL("../../", import.meta.url);
const dir = new URL("governance/drafts/release-3-preparation/declaration-surface-20260910/", root);
const read = (p) => parseStrictJson(fs.readFileSync(new URL(p, dir), "utf8"));
const baseline = read("example.json");
const schemaCheck = new Ajv2020({
  strict: true,
  allErrors: true,
  coerceTypes: false,
  useDefaults: false,
  removeAdditional: false,
}).compile(read("candidate.schema.json"));
const tests = [];
const add = (name, accept, why, mutate, stage = "relations") =>
  tests.push({ name, accept, why, mutate, stage });
const rename = (d, old, next) => {
  const walk = (x) => {
    if (Array.isArray(x)) return x.map(walk);
    if (x && typeof x === "object")
      return Object.fromEntries(Object.entries(x).map(([k, v]) => [k, walk(v)]));
    return x === old ? next : x;
  };
  Object.assign(d, walk(d));
};
add(
  "all-instance-ids-renamed",
  true,
  "Consistent opaque instance renaming preserves every edge; fixture labels stay fixed.",
  (d) => {
    for (const id of [
      "dataset-1",
      "design-1",
      "g-a",
      "g-b",
      "g-c",
      "u-1",
      "u-2",
      "u-3",
      "o-1",
      "o-2",
      "o-3",
      ...Array.from({ length: 6 }, (_, i) => `a-${i}`),
      ...Array.from({ length: 6 }, (_, i) => `f-${i}`),
      ...Array.from({ length: 6 }, (_, i) => `r-${i}`),
      "global",
      "m-0",
      "m-1",
      "m-2",
      "contrast-1",
    ])
      rename(d, id, `review/${id}`);
  },
);
add(
  "all-arrays-reversed",
  true,
  "Order is not reference identity; canonical bytes change.",
  (d) => {
    const reverse = (x) => {
      if (Array.isArray(x)) {
        x.reverse();
        x.forEach(reverse);
      } else if (x && typeof x === "object") Object.values(x).forEach(reverse);
    };
    reverse(d);
  },
);
add(
  "family-local-member-renaming",
  true,
  "m-0 in f-1 is independent of m-0 in f-2/f-4/f-5.",
  (d) => {
    d.families[1].members[0].member_id = "local-only";
    d.result_slots[1].member_ids[0] = "local-only";
  },
);
add(
  "complete-family-swap",
  true,
  "Swap same-shape families and update both owners and results: a valid different document, not authenticated intent.",
  (d) => {
    d.analyses[1].family_id = "f-4";
    d.analyses[4].family_id = "f-1";
    d.families[1].analysis_id = "a-4";
    d.families[4].analysis_id = "a-1";
    d.result_slots[1].family_id = "f-4";
    d.result_slots[4].family_id = "f-1";
  },
);
add(
  "complete-contract-kind-swap",
  true,
  "Consistent pairwise/interval label and result-kind changes are structurally valid different declarations.",
  (d) => {
    for (const [i, j] of [
      [1, 5],
      [5, 1],
    ]) {
      d.analyses[i].contract_ref = baseline.analyses[j].contract_ref;
      d.result_slots[i].contract_ref = baseline.result_slots[j].contract_ref;
      d.result_slots[i].kind = baseline.result_slots[j].kind;
    }
  },
);
add(
  "reverse-one-pair-direction",
  true,
  "An all-pairs endpoint set still occurs once; direction changes explicitly.",
  (d) => {
    const m = d.families[1].members[0];
    [m.minuend_group_id, m.subtrahend_group_id] = [m.subtrahend_group_id, m.minuend_group_id];
  },
);
add(
  "consistent-control-change",
  true,
  "New control with a complete treatment-minus-control family is a valid alternative.",
  (d) => {
    d.families[2].control_group_id = "g-b";
    d.families[2].members[0].minuend_group_id = "g-a";
    for (const m of d.families[2].members) m.subtrahend_group_id = "g-b";
  },
);
add(
  "no-omnibus-adjustment-only",
  true,
  "Generic adjustment has no implicit omnibus dependency inside this bounded shell.",
  (d) => {
    d.analyses = [d.analyses[4]];
    d.families = [d.families[4]];
    d.result_slots = [d.result_slots[4]];
  },
);
add(
  "unknown-planned-timing-and-zero-vector",
  true,
  "Timing and coefficient validity are explicitly held, not admission tests.",
  (d) => {
    d.families[3].selection.relative_to_outcome_inspection = "after";
    d.families[3].members[0].selection.relative_to_outcome_inspection = "not_declared";
    d.analyses[3].procedure_selection.relative_to_outcome_inspection = "after";
    for (const c of d.families[3].members[0].coefficients) c.value = 0;
  },
);
add(
  "duplicate-vector-distinct-member",
  true,
  "Semantic duplicate hypothesis detection is deferred.",
  (d) => {
    const m = structuredClone(d.families[3].members[0]);
    m.member_id = "same-vector";
    d.families[3].members.push(m);
    d.result_slots[3].member_ids.push(m.member_id);
  },
);
add(
  "fourth-group-complete",
  true,
  "Not hardcoded to three groups; independent complete enumeration for four groups.",
  (d) => {
    d.design.groups.push({ group_id: "g-d" });
    d.design.units.push({ experimental_unit_id: "u-4", group_id: "g-d" });
    d.dataset.observations.push({
      observation_id: "o-4",
      experimental_unit_id: "u-4",
      group_id: "g-d",
      value: 4,
    });
    for (const a of d.analyses) a.population.observation_ids.push("o-4");
    d.families[0].members[0].group_ids.push("g-d");
    for (const i of [1, 4, 5]) {
      for (const [j, g] of ["g-a", "g-b", "g-c"].entries()) {
        const m = structuredClone(d.families[i].members[0]);
        m.member_id = `extra-${j}`;
        m.minuend_group_id = g;
        m.subtrahend_group_id = "g-d";
        d.families[i].members.push(m);
        d.result_slots[i].member_ids.push(m.member_id);
      }
    }
    const m = structuredClone(d.families[2].members[0]);
    m.member_id = "extra-control";
    m.minuend_group_id = "g-d";
    d.families[2].members.push(m);
    d.result_slots[2].member_ids.push(m.member_id);
    d.families[3].members[0].coefficients.push({ group_id: "g-d", value: 0 });
  },
);
const faults = [
  [
    "missing-analysis-ref",
    (d) => {
      d.result_slots[0].analysis_id = "missing";
    },
  ],
  [
    "missing-family-ref",
    (d) => {
      d.result_slots[1].family_id = "missing";
    },
  ],
  [
    "missing-contract-ref",
    (d) => {
      d.result_slots[2].contract_ref = "missing";
    },
  ],
  [
    "duplicate-contrast-dimension",
    (d) => {
      d.families[3].members[0].coefficients[2].group_id = "g-a";
    },
  ],
  [
    "missing-unit-ref",
    (d) => {
      d.dataset.observations[0].experimental_unit_id = "missing";
    },
  ],
  [
    "duplicate-analysis",
    (d) => {
      d.analyses.push(structuredClone(d.analyses[4]));
    },
  ],
  [
    "missing-result",
    (d) => {
      d.result_slots.splice(5, 1);
    },
  ],
  [
    "wrong-analysis-dataset",
    (d) => {
      d.analyses[3].dataset_id = "missing";
    },
  ],
];
for (const [name, mutate] of faults)
  add(
    name,
    false,
    "An explicit required identity, reference, uniqueness or coverage condition is violated.",
    mutate,
  );
for (let i = 0; i < faults.length; i++)
  for (let j = i + 1; j < faults.length; j++)
    add(
      `compound:${faults[i][0]}+${faults[j][0]}`,
      false,
      "Two independent, non-cancelling relation defects remain schema-valid and must return rejection without an exception.",
      (d) => {
        faults[i][1](d);
        faults[j][1](d);
      },
    );
add(
  "partial-family-swap",
  false,
  "Updating reciprocal owners but not results leaves cross-analysis binding defects.",
  (d) => {
    d.analyses[1].family_id = "f-4";
    d.analyses[4].family_id = "f-1";
    d.families[1].analysis_id = "a-4";
    d.families[4].analysis_id = "a-1";
  },
);
add(
  "partial-contract-swap",
  false,
  "Result labels/kinds do not agree with the unchanged analysis contract.",
  (d) => {
    d.result_slots[1].contract_ref = d.result_slots[5].contract_ref;
    d.result_slots[1].kind = "interval";
  },
);
add(
  "cross-family-same-member-labels",
  false,
  "m-0/m-1/m-2 equality cannot override f-1/f-4 ownership.",
  (d) => {
    d.result_slots[1].family_id = "f-4";
  },
);
add(
  "family-local-member-dangling",
  false,
  "Changing only a member ID leaves its own result dangling.",
  (d) => {
    d.families[1].members[0].member_id = "local-only";
  },
);
add(
  "duplicate-reversed-edge",
  false,
  "A reversed duplicate is still duplicate all-pairs coverage, even with complete result membership.",
  (d) => {
    const m = structuredClone(d.families[1].members[0]);
    m.member_id = "reverse";
    [m.minuend_group_id, m.subtrahend_group_id] = [m.subtrahend_group_id, m.minuend_group_id];
    d.families[1].members.push(m);
    d.result_slots[1].member_ids.push(m.member_id);
  },
);
add(
  "missing-pair-with-result-updated",
  false,
  "Removing both member and result entry cannot shrink an all-pairs universe.",
  (d) => {
    d.families[1].members.pop();
    d.result_slots[1].member_ids.pop();
  },
);
add(
  "wrong-control-direction",
  false,
  "Many-to-one requires treatment minus the explicit control.",
  (d) => {
    const m = d.families[2].members[0];
    [m.minuend_group_id, m.subtrahend_group_id] = [m.subtrahend_group_id, m.minuend_group_id];
  },
);
add(
  "coherent-unknown-contract",
  false,
  "Consistent spelling does not register a new contract label.",
  (d) => {
    d.analyses[0].contract_ref = "https://example.invalid/contract";
    d.result_slots[0].contract_ref = d.analyses[0].contract_ref;
  },
);
add(
  "producer-catalog-injection",
  false,
  "A producer field cannot replace the harness catalog.",
  (d) => {
    d.fixture_contracts = read("fixture-contracts.json");
  },
  "schema",
);
add(
  "coercion-and-defaults-forbidden",
  false,
  "Numeric strings and absent required booleans are rejected without repair.",
  (d) => {
    d.dataset.observations[0].value = "1";
    delete d.design.independence_declared;
  },
  "schema",
);
for (const field of ["p_value", "confidence_level", "guarantee", "tolerance"])
  add(
    `forbidden-result:${field}`,
    false,
    "Numerical and guarantee payloads are not part of this unissued result slot.",
    (d) => {
      d.result_slots[4][field] = 0.05;
    },
    "schema",
  );
const rawTests = [
  ["nested-escaped-duplicate", '{"x":[{"a":1,"\\u0061":2}]}', "raw_json"],
  ["invalid-unicode-key", '{"\\udfff":1}', "raw_json"],
  ["negative-zero-exponent", '{"x":-0e12}', "raw_json"],
  ["negative-underflow-to-zero", '{"x":-1e-999}', "raw_json"],
  ["nonfinite-in-array", '{"x":[1e999]}', "numeric_domain"],
  ["trailing-comma", '{"x":1,}', "raw_json"],
];
const results = [];
for (const t of tests) {
  const d = structuredClone(baseline);
  t.mutate(d);
  const raw = JSON.stringify(d);
  const shapeValid = schemaCheck(d);
  let actual,
    exception = null;
  try {
    actual = check(raw);
  } catch (e) {
    exception = String(e);
  }
  const passed =
    !exception &&
    actual.stage === t.stage &&
    (actual.codes.length === 0) === t.accept &&
    (t.stage !== "relations" || shapeValid);
  let canonicalChanged = null;
  if (t.name === "all-arrays-reversed")
    canonicalChanged = jcsCanonicalize(d) !== jcsCanonicalize(baseline);
  results.push({
    name: t.name,
    expected_accept: t.accept,
    expected_stage: t.stage,
    rationale: t.why,
    input_sha256: createHash("sha256").update(raw).digest("hex"),
    schema_valid: shapeValid,
    actual,
    exception,
    canonical_changed: canonicalChanged,
    passed: passed && canonicalChanged !== false,
  });
}
for (const [name, raw, stage] of rawTests) {
  let actual,
    exception = null;
  try {
    actual = check(raw);
  } catch (e) {
    exception = String(e);
  }
  results.push({
    name,
    expected_accept: false,
    expected_stage: stage,
    raw,
    actual,
    exception,
    passed: !exception && actual.stage === stage && actual.codes.length > 0,
  });
}
console.log(
  JSON.stringify(
    {
      scope: "Reviewer structural expectations only; no scientific or provenance certification",
      total: results.length,
      passed: results.filter((r) => r.passed).length,
      results,
    },
    null,
    2,
  ),
);
if (results.some((r) => !r.passed)) process.exitCode = 1;
