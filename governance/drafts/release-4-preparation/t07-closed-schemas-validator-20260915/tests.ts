/** UNISSUED CANDIDATE: T07 representation tests, not the T10 numerical corpus. */
import assert from "node:assert/strict";
import { parseStrictJson } from "../../../../reference/verifier/src/strict-json.js";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import {
  validateRecord,
  validateCheckResult,
  validateQuantityEvidence,
  validateComponent,
  schemaFor,
  schemas,
  ids,
  candidate,
  type Component,
  type Result,
} from "./validator.js";
const here = dirname(fileURLToPath(import.meta.url));
const metadata = (name: string) => JSON.parse(readFileSync(resolve(here, name), "utf8"));
const base = metadata("fixtures/minimal-record.json");
const evidence = metadata("fixtures/quantity-evidence.json");
const cases = metadata("fixtures/cases.json").cases;
let assertions = 0;
const counts: Record<string, number> = {
  fixtures: 0,
  valid: 0,
  invalid: 0,
  requiredRemoval: 0,
  unknownInsertion: 0,
  enums: 0,
  identities: 0,
  quantitySet: 0,
  references: 0,
  determinism: 0,
  agreement: 0,
  resource: 0,
};
const checked = (condition: unknown, label: string) => {
  assert.ok(condition, label);
  assertions++;
};
const clone = <T>(x: T): T => structuredClone(x);
const raw = (x: unknown) => JSON.stringify(x);
const canonical = (r: Result) =>
  raw({ category: r.category, stage: r.stage, reason: r.reason, path: r.path });
for (const test of cases) {
  const run = () =>
    test.kind === "record"
      ? validateRecord(test.raw)
      : test.kind === "evidence"
        ? validateQuantityEvidence(test.raw, raw(base))
        : validateComponent(test.component as Component, test.raw);
  const actual = run();
  for (const key of ["category", "stage", "reason"] as const)
    checked(actual[key] === test.expected[key], test.name + ": " + key + " got " + raw(actual));
  counts.fixtures++;
  counts[actual.category === "accepted" ? "valid" : "invalid"]++;
  for (let i = 0; i < 3; i++) {
    checked(canonical(run()) === canonical(actual), test.name + ": deterministic");
    counts.determinism++;
  }
}
// Every property in these valid baseline objects is required (including conditional
// pass recomputed values and zero projection states). Exercise each actual occurrence.
type Segment = string | number;
const get = (o: any, path: Segment[]) => path.reduce((v, k) => v[k], o);
function objectPaths(o: any, path: Segment[] = []): Segment[][] {
  if (o === null || typeof o !== "object") return [];
  if (Array.isArray(o)) return o.flatMap((x, i) => objectPaths(x, [...path, i]));
  return [path, ...Object.entries(o).flatMap(([k, v]) => objectPaths(v, [...path, k]))];
}
for (const [name, value, validate] of [
  ["record", base, (x: any) => validateRecord(raw(x))],
  ["evidence", evidence, (x: any) => validateQuantityEvidence(raw(x), raw(base))],
  [
    "check",
    metadata("fixtures/check-result.json"),
    (x: any) => validateComponent("checkResult", raw(x)),
  ],
] as const) {
  for (const path of objectPaths(value)) {
    for (const field of Object.keys(get(value, path))) {
      const changed = clone(value);
      delete get(changed, path)[field];
      checked(
        validate(changed).category !== "accepted",
        name + ": required removal " + raw([...path, field]),
      );
      counts.requiredRemoval++;
    }
    const changed = clone(value);
    get(changed, path).__unknown_T07 = 1;
    checked(validate(changed).category !== "accepted", name + ": closure " + raw(path));
    counts.unknownInsertion++;
  }
}
// Exhaustive check identities and scoped grammar, including pre-conformance fallback.
for (const entry of candidate.identifiers.filter((x: any) => x.family === "check")) {
  const x = metadata("fixtures/check-result.json");
  x.check_id = entry.id;
  x.scope = {
    kind: entry.scope,
    id: entry.scope === "result" ? "result-1" : "urn:example:revision-1",
  };
  checked(
    validateComponent("checkResult", raw(x)).category === "accepted",
    entry.key + ": valid identity",
  );
  x.check_version = "0.2.0-draft.1";
  checked(
    validateComponent("checkResult", raw(x)).category === "boundary_failure",
    entry.key + ": wrong version",
  );
  counts.identities += 2;
}
for (const field of ["check_id", "check_version", "execution", "outcome"]) {
  const x = metadata("fixtures/check-result.json");
  x[field] = "unknown";
  checked(
    validateComponent("checkResult", raw(x)).category === "boundary_failure",
    "closed enum " + field,
  );
  counts.enums++;
}
for (let i = 0; i < 22; i++) {
  const removed = clone(evidence);
  removed.quantity_results.splice(i, 1);
  checked(
    validateQuantityEvidence(raw(removed), raw(base)).category === "boundary_failure",
    "evidence delete " + i,
  );
  const duplicate = clone(evidence);
  duplicate.quantity_results[(i + 1) % 22] = clone(duplicate.quantity_results[i]);
  checked(
    validateQuantityEvidence(raw(duplicate), raw(base)).reason === "NRS-BTF-IDENTITY-AMBIGUOUS",
    "evidence duplicate " + i,
  );
  const q = clone(evidence.quantity_results[i]);
  q.quantity = "display-alias";
  checked(
    validateComponent("quantityResult", raw(q)).category === "boundary_failure",
    "unknown quantity " + i,
  );
  counts.quantitySet += 3;
}
for (const path of [
  ["payload", "design", "dataset_id"],
  ["payload", "analysis", "design_id"],
  ["payload", "result", "analysis_id"],
  ...base.payload.dataset.observations.map((_: any, i: number) => [
    "payload",
    "dataset",
    "observations",
    i,
    "cell_id",
  ]),
  ...base.payload.result.cell_summaries.map((_: any, i: number) => [
    "payload",
    "result",
    "cell_summaries",
    i,
    "cell_id",
  ]),
] as Segment[][]) {
  const x = clone(base);
  get(x, path.slice(0, -1))[path.at(-1)!] = "missing-local-target";
  checked(
    validateRecord(raw(x)).reason === "NRS-BTF-LOCAL-REFERENCE-INVALID",
    "local ref " + raw(path),
  );
  counts.references++;
}
// Schema acceptance does not imply relational/admissibility success. Validator never
// reads typed fields before schema success. Test each clearly separated stage.
for (const test of cases.filter(
  (x: any) =>
    x.kind === "record" && ["semantic", "admissibility", "complete"].includes(x.expected.stage),
)) {
  const x = parseStrictJson(test.raw);
  checked(schemaFor(ids.record)(x), "schema/relations agreement " + test.name);
  counts.agreement++;
}
checked(!schemaFor(ids.report)({}), "T09 full report intentionally not implemented");
for (const schema of schemas) {
  const walk = (node: any): void => {
    if (!node || typeof node !== "object") return;
    if (node.type === "object")
      checked(
        node.additionalProperties === false && Array.isArray(node.required),
        "closed object and explicit required set",
      );
    for (const v of Object.values(node)) if (typeof v === "object") walk(v);
  };
  walk(schema);
  for (const name of Object.keys(schema.$defs ?? {}))
    checked(!!schemaFor(schema.$id + "#/$defs/" + name), "resolved definition");
}
// Pure existing input safety profile refuses independently of public numerical domain.
checked(
  validateRecord(" ".repeat(5 * 1024 * 1024 + 1)).category === "resource_refusal",
  "size refusal before parse",
);
counts.resource++;
checked(
  validateRecord("[".repeat(70) + "0" + "]".repeat(70)).category === "resource_refusal",
  "deep input",
);
counts.resource++;
const mixed = raw(base)
  .replace('"mean":0', '"mean":-0,"mean":0')
  .replace('"model_applicability_declared":true', '"model_applicability_declared":false');
checked(
  validateRecord(mixed).reason === "NRS-DUPLICATE-JSON-MEMBER",
  "existing duplicate-before-negative-zero precedence",
);
const scoped = metadata("fixtures/check-result.json");
checked(validateCheckResult(raw(scoped), raw(base)).category === "accepted", "check scope binding");
scoped.scope.id = "other-result";
checked(
  validateCheckResult(raw(scoped), raw(base)).category === "boundary_failure",
  "wrong check result scope",
);
const nonfinite = clone(base);
nonfinite.payload.result.cell_summaries[0].mean = Infinity;
checked(!schemaFor(ids.record)(nonfinite), "direct nonfinite schema guard");
nonfinite.payload.result.cell_summaries[0].mean = NaN;
checked(!schemaFor(ids.record)(nonfinite), "direct NaN schema guard");
const unchanged = raw(base);
validateRecord(unchanged);
checked(raw(base) === unchanged, "pure input");
const summary = {
  status: "UNISSUED CANDIDATE",
  runtime: process.version,
  mode: process.execArgv.includes("--jitless") ? "jitless" : "default",
  counts,
  assertions,
  result: "PASS",
  scope:
    "T07 representation only; no numerical truth, integrity digest, worker, supported-domain or final report evaluation",
};
console.log(JSON.stringify(summary, null, 2));
const save = process.argv.indexOf("--save");
if (save >= 0)
  writeFileSync(resolve(here, process.argv[save + 1]), JSON.stringify(summary, null, 2) + "\n");
