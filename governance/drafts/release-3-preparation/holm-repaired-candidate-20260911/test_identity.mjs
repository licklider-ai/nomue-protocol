// Read-only consistency checks; these do not allocate any identifier.
import assert from "node:assert/strict";
import fs from "node:fs";
const read = (n) => JSON.parse(fs.readFileSync(new URL(n, import.meta.url), "utf8"));
const data = Object.fromEntries(
  [
    "identities",
    "bundle",
    "check-policy",
    "outcomes",
    "diagnostics",
    "record.schema",
    "report.schema",
    "refusal.schema",
  ].map((n) => [n, read(n + ".json")]),
);
function check(d) {
  const ids = d.identities;
  const all = [
    ...Object.entries(ids)
      .filter(([k]) => k !== "checks")
      .map(([, v]) => v),
    ...Object.values(ids.checks),
  ];
  assert.equal(new Set(all).size, all.length);
  for (const id of all)
    assert.match(id, /^https:\/\/nomue\.ai\/id\/[a-z]+\/[a-z]+(?:-[a-z]+)*\/0\.3\.0-candidate\.3$/);
  assert.deepEqual(d.bundle.bindings, ids);
  for (const name of ["record", "report", "refusal"])
    assert.equal(d[name + ".schema"].properties.$schema.const, ids[name]);
  const record = d["record.schema"].properties;
  assert.equal(record.payload.properties.contract_id.const, ids.contract);
  assert.equal(record.interpretation_bundle_id.const, ids.bundle);
  assert.equal(record.profile_id.const, ids.profile);
  const checks = d["report.schema"].properties.checks.prefixItems;
  assert.equal(checks.length, Object.keys(ids.checks).length);
  for (const [i, id] of Object.values(ids.checks).entries())
    assert.equal(checks[i].allOf[1].properties.check_ref.const, id);
  assert.equal(d["check-policy"].check_id, ids.checks.arithmetic);
  assert.equal(d["check-policy"].exact_numerator_tolerance, 0);
  assert.equal(d["check-policy"].display_bits_tolerance, 0);
  for (const [reason, label] of Object.entries(d.outcomes.reasons))
    assert.equal(label, "candidate:holm:" + reason);
  const used = [
    "prerequisite_failed",
    ...Object.keys(d.diagnostics.refusals),
    ...Object.values(d.diagnostics.checks).flat(),
    ...Object.values(d.outcomes.execution).map((x) => x.reason),
  ];
  for (const reason of used) assert.ok(Object.hasOwn(d.outcomes.reasons, reason), reason);
}
check(data);
const mutations = [
  [
    "duplicate identity",
    (d) => {
      d.identities.profile = d.identities.contract;
    },
  ],
  [
    "bundle binding",
    (d) => {
      d.bundle.bindings.expected = d.identities.record;
    },
  ],
  [
    "record contract",
    (d) => {
      d["record.schema"].properties.payload.properties.contract_id.const = d.identities.profile;
    },
  ],
  [
    "ordered report check",
    (d) => {
      d["report.schema"].properties.checks.prefixItems[0].allOf[1].properties.check_ref.const =
        d.identities.checks.arithmetic;
    },
  ],
  [
    "missing reason",
    (d) => {
      delete d.outcomes.reasons.prerequisite_failed;
    },
  ],
];
for (const [name, mutate] of mutations) {
  const changed = structuredClone(data);
  mutate(changed);
  assert.throws(() => check(changed), undefined, name);
}
console.log(`Candidate identities and ${mutations.length} rejecting mutations passed`);
