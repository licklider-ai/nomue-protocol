// Review-preparation validation. Passing is not adoption or semantic-completeness proof.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import YAML from "yaml";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
const root = fileURLToPath(new URL("../../../../", import.meta.url));
const here = fileURLToPath(new URL("./", import.meta.url));
const load = (n) => JSON.parse(fs.readFileSync(path.join(here, n), "utf8"));
const fromRoot = (n) => fs.readFileSync(path.join(root, n));
const hash = (b) => crypto.createHash("sha256").update(b).digest("hex");
const pins = load("INPUTS.json");
for (const p of pins.files) assert.equal(hash(fromRoot(p.path)), p.sha256, p.path);
const claims = load("CLAIMS.json");
for (const c of claims.claims) {
  assert.ok(c.claim && c.disposition && c.remaining_action);
  for (const p of [...c.evidence, ...c.implementation])
    assert.ok(
      pins.files.some((x) => x.path === p),
      "unpinned claim input: " + p,
    );
}
for (const p of claims.unchanged_numerical_inputs)
  assert.equal(hash(fromRoot(p.path)), p.reviewed_sha256, "B-2 numerical drift: " + p.path);
const candidate = "governance/drafts/release-3-preparation/holm-separated-candidate-20260912/";
const predecessor = "governance/drafts/release-3-preparation/holm-repaired-candidate-20260911/";
for (const name of [
  "envelope.mjs",
  "budget.mjs",
  "entry.mjs",
  "supervisor.py",
  "prepare_cases.mjs",
  "declaration-shapes.json",
  "diagnostics.json",
  "outcomes.json",
])
  assert.equal(
    fromRoot(candidate + name)
      .toString()
      .replaceAll("0.3.0-candidate.4", "0.3.0-candidate.3"),
    fromRoot(predecessor + name).toString(),
    "unexpected private behavior delta: " + name,
  );
const req = load("REQUIREMENTS.json").requirements;
const existing = YAML.parse(fromRoot("registries/requirements.yaml").toString());
function unique(rows) {
  assert.equal(new Set(rows.map((r) => r.proposed_id)).size, rows.length, "duplicate requirement");
}
unique(req);
const ids = new Set(req.map((r) => r.proposed_id));
for (const r of req)
  assert.ok(
    !existing.requirements.some((x) => x.id === r.proposed_id),
    "already issued requirement",
  );
function fields(v, p = "", rows = []) {
  if (!v || typeof v !== "object") return rows;
  if (v.properties)
    for (const k of Object.keys(v.properties))
      rows.push(p + "/properties/" + k.replaceAll("~", "~0").replaceAll("/", "~1"));
  for (const [k, x] of Object.entries(v))
    fields(x, p + "/" + k.replaceAll("~", "~0").replaceAll("/", "~1"), rows);
  return rows;
}
function ownership(schema, owners) {
  const actual = fields(schema);
  assert.deepEqual(Object.keys(owners).sort(), actual.sort(), "property inventory differs");
  for (const v of Object.values(owners)) assert.ok(ids.has(v), "unknown structural owner");
  return actual.length;
}
const surfaces = load("SURFACES.json").schemas;
let count = 0;
for (const s of surfaces) count += ownership(JSON.parse(fromRoot(s.path)), s.owners);
const neg = [];
function rejected(name, fn) {
  assert.throws(fn, undefined, name);
  neg.push(name);
}
rejected("duplicate proposed requirement", () => unique([...req, req[0]]));
const added = JSON.parse(fromRoot(surfaces[0].path));
added.properties.forged = { type: "string" };
rejected("unowned actual schema field", () => ownership(added, surfaces[0].owners));
const missing = structuredClone(surfaces[0].owners);
delete missing[Object.keys(missing)[0]];
rejected("missing explicit ownership", () =>
  ownership(JSON.parse(fromRoot(surfaces[0].path)), missing),
);
const unknown = structuredClone(surfaces[0].owners);
unknown[Object.keys(unknown)[0]] = "NRS-CONTRACT-HOLM-9999";
rejected("unknown owner", () => ownership(JSON.parse(fromRoot(surfaces[0].path)), unknown));
const preview = load("REGISTRY-PREVIEW.json");
const ajv = new Ajv2020({ strict: false, allErrors: true });
addFormats(ajv);
const configs = [
  ["public-checks-registry", "public-checks", "checks", preview.checks],
  ["public-contract-surfaces", "public-contract-surfaces", "entries", preview.surfaces],
  ["reason-codes-registry", "reason-codes", "codes", preview.reasons],
  ["interpretation-bundles", "interpretation-bundles", "entries", [preview.bundle]],
];
const grammar = [];
for (const [schemaName, registry, key, rows] of configs) {
  const current = YAML.parse(fromRoot("registries/" + registry + ".yaml").toString());
  const next = structuredClone(current);
  next[key].push(...rows);
  const proposed = ajv.compile(load("meta-schema-preview/" + schemaName + ".schema.json"));
  assert.ok(proposed(current), JSON.stringify(proposed.errors));
  assert.ok(proposed(next), JSON.stringify(proposed.errors));
  const legacyAjv = new Ajv2020({ strict: false });
  addFormats(legacyAjv);
  const legacy = legacyAjv.compile(
    JSON.parse(fromRoot("schemas/meta/" + schemaName + ".schema.json")),
  );
  assert.equal(legacy(next), false, "legacy-only validator unexpectedly accepts the full new row");
  grammar.push({
    registry,
    legacy_rows_preserved: true,
    proposed_rows: rows.length,
    legacy_schema_rejects_successor: true,
  });
  if (registry === "public-checks") {
    const ref = rows[0].check_id;
    for (const variant of [
      ref.replace("nomue.ai", "NOMUE.AI"),
      ref + "/",
      ref + "?x=1",
      ref + "#x",
      ref.replace("nomue.ai", "nomue.ai:443"),
      ref.replace("/holm-", "/%68olm-"),
      ref.replace("/check/", "/check/../check/"),
      ref.replace("/check/", "/bundle/"),
    ]) {
      const bad = structuredClone(next);
      bad.checks.at(-rows.length).check_id = variant;
      rejected("noncanonical or wrong-family successor " + variant, () => assert.ok(proposed(bad)));
    }
  }
}
const candidateIds = JSON.parse(fromRoot(candidate + "identities.json"));
const candidatePolicy = JSON.parse(fromRoot(candidate + "check-policy.json"));
const { status: policyStatus, check_id: policyCheck, ...constants } = candidatePolicy;
assert.deepEqual(preview.checks.at(-1).comparison_constants.holm_supplied_p, constants);
assert.equal(preview.bundle.contract_id, candidateIds.contract);
assert.deepEqual(preview.bundle.allowed_check_ids, Object.values(candidateIds.checks));
assert.equal(preview.bundle.expected_context_schema_ref, preview.schema_destinations.expected);
assert.equal(preview.bundle.report_schema_ref, preview.schema_destinations.report);
for (const s of surfaces) assert.equal(s.future_path, preview.schema_destinations[s.name]);
const checkMeta = new Ajv2020({ strict: false });
addFormats(checkMeta);
const constValidator = checkMeta.compile(
  load("meta-schema-preview/public-checks-registry.schema.json"),
);
const brokenConstants = YAML.parse(fromRoot("registries/public-checks.yaml").toString());
brokenConstants.checks.push(structuredClone(preview.checks.at(-1)));
brokenConstants.checks.at(-1).comparison_constants.holm_supplied_p.exact_numerator_tolerance = 1;
rejected("nonzero proposed exact tolerance", () => assert.ok(constValidator(brokenConstants)));
const reasonCodes = new Set(preview.reasons.map((r) => r.id));
assert.equal(reasonCodes.size, preview.reasons.length);
const currentReasons = YAML.parse(fromRoot("registries/reason-codes.yaml").toString()).codes;
for (const r of preview.reasons)
  assert.ok(!currentReasons.some((x) => x.id === r.id), "reason collision");
for (const [local, permanent] of Object.entries(preview.reason_translation)) {
  assert.ok(local.startsWith("candidate:holm:"));
  assert.ok(reasonCodes.has(permanent));
}
assert.equal(new Set(Object.values(preview.reason_translation)).size, preview.reasons.length);
const currentSurfaces = YAML.parse(
  fromRoot("registries/public-contract-surfaces.yaml").toString(),
).entries;
for (const row of preview.surfaces) {
  assert.ok(!currentSurfaces.some((x) => x.surface_id === row.surface_id), "surface collision");
  const s = surfaces.find((x) => preview.schema_destinations[x.name] === row.paths_resolve_in);
  assert.ok(s, "missing prospective schema destination");
  const schema = JSON.parse(fromRoot(s.path));
  for (const p of row.paths)
    assert.ok(Object.hasOwn(schema.properties, p), "unresolved actual instance path");
  for (const r of row.requirement_ids)
    assert.ok(ids.has(r), "unknown proposed surface requirement");
}
const out = fs.mkdtempSync(path.join(os.tmpdir(), "holm-adoption-"));
function evidence(results) {
  for (const r of req)
    for (const e of r.candidate_evidence) {
      const rows = results[e.suite]?.rows;
      assert.ok(Array.isArray(rows), "missing executed suite");
      assert.ok(
        rows.some((x) => (e.group ? x.group === e.group : x.name === e.name)),
        "missing executed case " + r.proposed_id,
      );
    }
}
try {
  for (const name of [
    "test_envelope.mjs",
    "test_public.mjs",
    "test_budget.mjs",
    "test_separation.mjs",
    "test_identity.mjs",
    "test_repairs.mjs",
  ])
    execFileSync(process.execPath, ["--import", "tsx", candidate + name], {
      cwd: root,
      env: { ...process.env, NOMUE_TEST_OUTPUT: out },
      stdio: "inherit",
    });
  execFileSync(process.execPath, ["--import", "tsx", path.join(here, "test_fixtures.mjs")], {
    cwd: root,
    env: { ...process.env, NOMUE_TEST_OUTPUT: out },
    stdio: "inherit",
  });
  const read = (n) => JSON.parse(fs.readFileSync(path.join(out, n)));
  const results = {
    envelope: read("RESULTS.json"),
    budget: read("BUDGET-RESULTS.json"),
    separation: read("SEPARATION-RESULTS.json"),
  };
  evidence(results);
  const removed = structuredClone(results);
  removed.separation.rows = [];
  rejected("deleted executed separation evidence", () => evidence(removed));
  const result = {
    status: "PASS_FOR_UNISSUED_PREPARATION",
    formal_adoption: false,
    independent_review_of_new_wrapper: false,
    source_pins: pins.files.length,
    numerical_files_unchanged: claims.unchanged_numerical_inputs.length,
    proposed_requirements: req.length,
    property_declarations: count,
    registry_previews: grammar,
    negative_controls: neg,
    envelope_controls: results.envelope.controls,
    public_controls: read("PUBLIC-RESULTS.json").controls,
    budget_controls: results.budget.controls,
    separation_controls: results.separation.controls,
    fixed_preexecution_fixtures: read("FIXTURE-RESULTS.json").fixtures,
  };
  if (process.env.NOMUE_TEST_OUTPUT) {
    fs.mkdirSync(process.env.NOMUE_TEST_OUTPUT, { recursive: true });
    for (const name of [
      "SEPARATION-RESULTS.json",
      "RESULTS.json",
      "PUBLIC-RESULTS.json",
      "BUDGET-RESULTS.json",
      "FIXTURE-RESULTS.json",
    ])
      fs.copyFileSync(path.join(out, name), path.join(process.env.NOMUE_TEST_OUTPUT, name));
    fs.writeFileSync(
      path.join(process.env.NOMUE_TEST_OUTPUT, "ADOPTION-RESULTS.json"),
      JSON.stringify(result, null, 2) + "\n",
    );
  }
  console.log(JSON.stringify(result));
} finally {
  fs.rmSync(out, { recursive: true, force: true });
}
