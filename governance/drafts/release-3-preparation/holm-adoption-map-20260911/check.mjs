// Informative adoption-map validation. Never write authoritative registry files.
import fs from "node:fs";
import crypto from "node:crypto";
import assert from "node:assert/strict";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import YAML from "yaml";
import { format } from "prettier";
const root = new URL("../../../../", import.meta.url);
const local = (n) => new URL(n, import.meta.url);
const read = (p) => fs.readFileSync(new URL(p, root), "utf8");
const load = (p) => JSON.parse(fs.readFileSync(local(p), "utf8"));
const hash = (v) => crypto.createHash("sha256").update(v).digest("hex");
const requirements = load("REQUIREMENTS.json").requirements;
const surfaces = load("SURFACES.json").schemas;
for (const p of load("INPUTS.json").files)
  assert.equal(hash(fs.readFileSync(new URL(p.path, root))), p.sha256, p.path);
const registry = YAML.parse(read("registries/requirements.yaml"));
const meta = JSON.parse(read("schemas/meta/requirements-registry.schema.json"));
const ajv = new Ajv2020({ strict: false });
addFormats(ajv);
const validateRegistry = ajv.compile(meta);
const ids = new Set(requirements.map((r) => r.proposed_id));
assert.equal(ids.size, requirements.length);
const existing = new Set(registry.requirements.map((r) => r.id));
for (const r of requirements) {
  assert.ok(!existing.has(r.proposed_id), "proposed ID already allocated: " + r.proposed_id);
  assert.equal(typeof r.wording, "string");
  assert.ok(r.wording.length > 30);
  for (const e of r.candidate_evidence)
    assert.ok(read(e.path).includes(e.locator), e.path + ": " + e.locator);
}
export function inventory(schema, name, owners, known) {
  const rows = [];
  const esc = (s) => s.replaceAll("~", "~0").replaceAll("/", "~1");
  function walk(value, pointer = "") {
    if (!value || typeof value !== "object") return;
    if (value.properties)
      for (const key of Object.keys(value.properties)) {
        const p = pointer + "/properties/" + esc(key);
        const matches = Object.keys(owners)
          .filter((prefix) => p === prefix || p.startsWith(prefix + "/") || prefix === "")
          .sort((a, b) => b.length - a.length);
        assert.ok(matches.length, "unowned field: " + p);
        const owner = owners[matches[0]];
        assert.ok(known.has(owner), "unknown proposed owner: " + owner);
        rows.push({ schema: name, schema_pointer: p, proposed_requirement: owner });
      }
    for (const [key, child] of Object.entries(value)) walk(child, pointer + "/" + esc(key));
  }
  walk(schema);
  assert.ok(rows.length, "empty schema inventory");
  return rows;
}
const rows = surfaces.flatMap((s) => inventory(JSON.parse(read(s.path)), s.name, s.owners, ids));
assert.equal(new Set(rows.map((r) => r.schema + r.schema_pointer)).size, rows.length);
const proposedRows = requirements.map((r) => ({
  id: r.proposed_id,
  title: r.title,
  status: "active",
  stability: r.proposed_stability,
  document: r.future_document,
  anchor: r.proposed_id,
  testability: "automated",
  schema_refs: surfaces
    .filter((s) =>
      rows.some((x) => x.schema === s.name && x.proposed_requirement === r.proposed_id),
    )
    .map((s) => s.future_path),
  conformance_refs: [],
  public_surface_refs: [],
  introduced_in: "release-3",
  supersedes: null,
  superseded_by: null,
  notes:
    "PREVIEW ONLY: active is the intended post-decision status, not a current allocation. Fixture and public-surface IDs remain pending; candidate test locators are evidence, not registered conformance references.",
}));
const hypothetical = structuredClone(registry);
for (const prefix of ["NRS-CONTRACT-HOLM", "NRS-PROFILE-IMGC"])
  if (!hypothetical.namespaces.some((n) => n.prefix === prefix))
    hypothetical.namespaces.push({
      prefix,
      description: "Proposed bounded supplied-p Holm requirement namespace.",
    });
hypothetical.requirements.push(...proposedRows);
assert.ok(validateRegistry(hypothetical), JSON.stringify(validateRegistry.errors));
// Negative controls verify failures in the map checker, not numerical correctness.
assert.throws(() => inventory({ properties: { x: {} } }, "probe", {}, ids), /unowned/);
assert.throws(
  () => inventory({ properties: { x: {} } }, "probe", { "": "missing" }, ids),
  /unknown/,
);
const duplicate = structuredClone(hypothetical);
duplicate.requirements.at(-1).id = "NRS-HOLM-0001";
assert.equal(validateRegistry(duplicate), false); // Unrecognized namespace grammar.
let text =
  "# Proposed requirement wording and evidence\n\nGenerated informative draft. Proposed IDs are unallocated; this is not normative\nauthority and its merge does not activate any requirement.\n\n";
for (const r of requirements) {
  text += `## ${r.proposed_id}: ${r.title}\n\n${r.wording}\n\nProposed stability: ${r.proposed_stability}. Implementation: ${r.implementation_status}.\n\nFuture document: \`${r.future_document}\`.\n\n`;
  for (const e of r.candidate_evidence)
    text += `Candidate evidence locator: \`${e.path}\` — \`${e.locator}\`.\n\n`;
}
const outputs = {
  "WORDING.md": await format(text, {
    filepath: "WORDING.md",
    printWidth: 100,
    proseWrap: "preserve",
  }),
  "FIELD-INVENTORY.json":
    JSON.stringify(
      {
        status: "schema declaration coverage only; not proof of semantic or test completeness",
        fields: rows,
      },
      null,
      2,
    ) + "\n",
  "REGISTRY-PREVIEW.json":
    JSON.stringify(
      {
        status: "non-operative additions; apply only in a complete adopted change set",
        proposed_requirements: proposedRows,
      },
      null,
      2,
    ) + "\n",
  "RESULTS.json":
    JSON.stringify(
      {
        base: load("INPUTS.json").base,
        proposed_requirements: requirements.length,
        public_schemas: surfaces.length,
        property_declarations: rows.length,
        source_pins: load("INPUTS.json").files.length,
        negative_controls: 3,
        registry_meta_schema: "PASS",
        readiness: "NOT_READY_FOR_ADOPTION",
        reason:
          "Checkpoint implementation, output decision, permanent fixture/surface references, authoritative coupling and RFC decision remain open.",
      },
      null,
      2,
    ) + "\n",
};
for (const [name, raw] of Object.entries(outputs)) {
  const value = name.endsWith(".json")
    ? await format(raw, { filepath: name, printWidth: 100 })
    : raw;
  if (process.argv.includes("--write")) fs.writeFileSync(local(name), value);
  else assert.equal(fs.readFileSync(local(name), "utf8"), value, "generated drift: " + name);
}
console.log(
  `${requirements.length} proposed requirements; ${rows.length} field declarations; registry preview valid; adoption remains blocked`,
);
