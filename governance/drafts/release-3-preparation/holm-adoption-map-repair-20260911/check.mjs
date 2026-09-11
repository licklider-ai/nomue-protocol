// Structural ownership and executed evidence; no normative authority or semantic-completeness claim.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import assert from "node:assert/strict";
import YAML from "yaml";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../../../../", import.meta.url));
const local = (n) => new URL(n, import.meta.url);
const load = (n) => JSON.parse(fs.readFileSync(local(n)));
const requirements = load("REQUIREMENTS.json").requirements;
const surfaces = load("SURFACES.json").schemas;
const digest = (b) => crypto.createHash("sha256").update(b).digest("hex");
for (const pin of load("INPUTS.json").files)
  assert.equal(digest(fs.readFileSync(path.join(root, pin.path))), pin.sha256, pin.path);
const allocated = new Set(
  YAML.parse(
    fs.readFileSync(path.join(root, "registries/requirements.yaml"), "utf8"),
  ).requirements.map((r) => r.id),
);
function unique(rows) {
  assert.equal(new Set(rows.map((r) => r.proposed_id)).size, rows.length, "duplicate requirement");
}
unique(requirements);
for (const r of requirements) {
  assert.match(r.proposed_id, /^NRS-(CONTRACT|PROFILE)-[A-Z][A-Z0-9]{1,11}-[0-9]{4}$/);
  assert.ok(!allocated.has(r.proposed_id), "already allocated proposed ID");
}
const ids = new Set(requirements.map((r) => r.proposed_id));
function fields(schema, pointer = "", rows = []) {
  if (!schema || typeof schema !== "object") return rows;
  if (schema.properties)
    for (const key of Object.keys(schema.properties))
      rows.push(pointer + "/properties/" + key.replaceAll("~", "~0").replaceAll("/", "~1"));
  for (const [key, value] of Object.entries(schema))
    fields(value, pointer + "/" + key.replaceAll("~", "~0").replaceAll("/", "~1"), rows);
  return rows;
}
function ownership(schema, owners) {
  const found = fields(schema);
  assert.deepEqual(Object.keys(owners).sort(), found.sort(), "exact ownership differs");
  for (const owner of Object.values(owners)) assert.ok(ids.has(owner), "unknown owner");
  return found;
}
const schemas = surfaces.map((s) => JSON.parse(fs.readFileSync(path.join(root, s.path))));
let total = 0;
surfaces.forEach((s, i) => {
  total += ownership(schemas[i], s.owners).length;
});
const negatives = [];
function rejected(name, fn) {
  assert.throws(fn);
  negatives.push(name);
}
const extra = structuredClone(schemas[0]);
extra.properties.new_field = { type: "string" };
rejected("new real-schema field", () => ownership(extra, surfaces[0].owners));
const missing = structuredClone(surfaces[0].owners);
delete missing[Object.keys(missing)[0]];
rejected("removed real ownership", () => ownership(schemas[0], missing));
const unknown = structuredClone(surfaces[0].owners);
unknown[Object.keys(unknown)[0]] = "missing";
rejected("unknown owner", () => ownership(schemas[0], unknown));
rejected("actual duplicate requirement", () => unique([...requirements, requirements[0]]));
function evidence(req, results) {
  for (const r of req)
    for (const e of r.candidate_evidence) {
      const rows = results[e.suite]?.rows;
      assert.ok(Array.isArray(rows), "missing suite");
      assert.ok(
        rows.some((row) => (e.group ? row.group === e.group : row.name === e.name)),
        "missing executed case: " + r.proposed_id,
      );
    }
}
const out = fs.mkdtempSync(path.join(os.tmpdir(), "holm-map-"));
try {
  const dir = "governance/drafts/release-3-preparation/holm-repaired-candidate-20260911/";
  for (const name of ["test_envelope.mjs", "test_public.mjs", "test_budget.mjs"])
    execFileSync(process.execPath, ["--import", "tsx", dir + name], {
      cwd: root,
      env: { ...process.env, NOMUE_TEST_OUTPUT: out },
      stdio: "inherit",
    });
  const results = {
    envelope: JSON.parse(fs.readFileSync(path.join(out, "RESULTS.json"))),
    budget: JSON.parse(fs.readFileSync(path.join(out, "BUDGET-RESULTS.json"))),
  };
  evidence(requirements, results);
  const removed = structuredClone(results);
  removed.envelope.rows = removed.envelope.rows.filter(
    (r) => r.group !== requirements[0].candidate_evidence[0].group,
  );
  rejected("removed executed evidence", () => evidence(requirements, removed));
  const forged = structuredClone(requirements);
  forged[0].candidate_evidence = [{ suite: "envelope", group: "fromD0" }];
  rejected("import text is not executed evidence", () => evidence(forged, results));
  const result = {
    proposed_requirements: requirements.length,
    property_declarations: total,
    source_pins: load("INPUTS.json").files.length,
    negative_controls: negatives,
    readiness: "NOT_READY_FOR_ADOPTION",
  };
  if (process.env.NOMUE_TEST_OUTPUT)
    fs.mkdirSync(process.env.NOMUE_TEST_OUTPUT, { recursive: true });
  if (process.env.NOMUE_TEST_OUTPUT)
    fs.writeFileSync(
      path.join(process.env.NOMUE_TEST_OUTPUT, "MAP-RESULTS.json"),
      JSON.stringify(result, null, 2) + "\n",
    );
  console.log(JSON.stringify(result));
} finally {
  fs.rmSync(out, { recursive: true, force: true });
}
