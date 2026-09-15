/** UNISSUED CANDIDATE. Validate captured Linux deliveries against T07 context. */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { validateFinal } from "./report.js";
const here = dirname(fileURLToPath(import.meta.url));
const rows = readFileSync(resolve(here, "measurements/nomue-t09-results/RUNS.jsonl"), "utf8")
  .trim()
  .split("\n")
  .map((x) => JSON.parse(x));
const fixtures = JSON.parse(
  readFileSync(
    resolve(here, "../t08-limited-numerical-adapter-20260915/fixtures/cases.json"),
    "utf8",
  ),
).cases;
const index = new Map<string, any>(fixtures.map((x: any) => [x.id, x.record]));
let completed = 0,
  refused = 0;
for (const row of rows) {
  let record = index.get(row.case);
  if (["unresolved", "structural", "admissibility"].includes(row.case))
    record = structuredClone(index.get("ordinary_dyadic_n3"));
  if (row.case === "fail-unresolved") record = index.get("mismatch-6");
  if (row.case === "structural") record.payload.extra = 1;
  if (row.case === "admissibility") record.payload.design.model_applicability_declared = false;
  assert.equal(row.check, "PASS");
  assert.ok(
    validateFinal(row.delivered, record ? JSON.stringify(record) : undefined),
    row.case + ": closed contextual final delivery",
  );
  if (row.delivered.execution === "completed") completed++;
  else {
    refused++;
    assert.ok(!("report" in row.delivered));
  }
  if (row.mode === 0 && index.has(row.case))
    assert.deepEqual(row.application_diagnostics.modes, { supervisor: 0, worker: 0 });
  if (row.mode === 1 && index.has(row.case))
    assert.deepEqual(row.application_diagnostics.modes, { supervisor: 1, worker: 1 });
}
assert.equal(rows.length, 52);
console.log(
  JSON.stringify({
    status: "UNISSUED CANDIDATE",
    captured_deliveries: rows.length,
    completed,
    refused,
    result: "PASS",
  }),
);
