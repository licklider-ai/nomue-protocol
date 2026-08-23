/**
 * Degradation-onset map for the adopted tail-evaluation path (Batch 3 V2).
 *
 * Combines the tail corpus (p ~ 1e-8 .. underflow boundary) and the floor
 * corpus (p ~ 1e-30 .. 1e-300), orders every point by its true p magnitude
 * (the 60-digit mpmath capture), and records per point: the per-quantity
 * relative errors of the live kernel vs the captured oracle, the maximum
 * over all quantities, and whether the point satisfies the pre-fixed
 * P_floor criterion.
 *
 * P_floor decision rule (fixed IN ADVANCE by the Batch 3 instruction, not
 * chosen here): P_floor = the smallest p for which the maximum relative
 * error over ALL target quantities is <= 1e-11 (a 10x margin under the
 * 1e-10 public-contract p tolerance), rounded UP to a power of ten. This
 * script APPLIES the rule and reports the resulting candidate; adopting
 * the value is a steward decision, not made here.
 *
 * Output: evidence/development/oracle-floor-map/{floor-map.json,floor-map.md}
 * Usage: tsx tooling/src/evidence/oracle-floor-map.ts
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { repoRoot } from "../lib/repo.js";
import { compareCorpus } from "./oracle-comparisons.js";

const CRITERION = 1e-11;

interface MapRow {
  dataset: string;
  corpus: string;
  true_p_decimal_string: string;
  true_p_binary64: number;
  kernel_p: number;
  p_rel_diff: number;
  max_rel_diff_all_quantities: number;
  worst_quantity: string;
  meets_criterion: boolean;
}

const rows: MapRow[] = [];
for (const corpusName of ["tail", "floor"] as const) {
  const corpus = compareCorpus(corpusName);
  for (const [datasetName, dataset] of Object.entries(corpus.datasets)) {
    let max = 0;
    let worst = "";
    for (const [quantity, comparison] of Object.entries(dataset.comparisons)) {
      if (comparison.rel_diff > max) {
        max = comparison.rel_diff;
        worst = quantity;
      }
    }
    const pComparison = dataset.comparisons["p_value_vs_mpmath"];
    if (pComparison === undefined) throw new Error(`${datasetName}: no p_value_vs_mpmath`);
    rows.push({
      dataset: datasetName,
      corpus: corpusName,
      true_p_decimal_string: dataset.p_value_mpmath_str ?? String(pComparison.oracle),
      true_p_binary64: pComparison.oracle,
      kernel_p: pComparison.kernel,
      p_rel_diff: pComparison.rel_diff,
      max_rel_diff_all_quantities: max,
      worst_quantity: worst,
      meets_criterion: max <= CRITERION,
    });
  }
}

// Order by true p magnitude, largest first, using the decimal-string
// exponent so ordering survives binary64 underflow of the float field.
const exponentOf = (decimal: string): number => {
  const match = /e([+-]?\d+)$/.exec(decimal);
  if (match !== null) return Number(match[1]);
  const value = Number(decimal);
  return value > 0 ? Math.floor(Math.log10(value)) : Number.NEGATIVE_INFINITY;
};
rows.sort((a, b) => exponentOf(b.true_p_decimal_string) - exponentOf(a.true_p_decimal_string));

// Apply the pre-fixed rule: smallest true p whose row meets the criterion,
// rounded UP to a power of ten.
const passing = rows.filter((r) => r.meets_criterion);
const smallestPassing = passing[passing.length - 1];
const pFloorCandidate =
  smallestPassing === undefined
    ? null
    : Math.pow(10, Math.ceil(exponentOf(smallestPassing.true_p_decimal_string)));
const firstFailing = rows.find((r) => !r.meets_criterion);

const jsonDoc = {
  schema: "nrs-oracle-floor-map",
  schema_version: "0.1.0",
  description:
    "Degradation-onset map of the adopted tail-evaluation path (kernel vs 60-digit mpmath oracle), tail + floor corpora ordered by true p magnitude. Applies the pre-fixed P_floor rule; adoption of the candidate value is a steward decision. Not gated on; not R1-08 evidence.",
  criterion: {
    rule: "P_floor = smallest p with max relative error over ALL quantities <= 1e-11 (10x margin under the 1e-10 contract p tolerance), rounded up to a power of ten",
    threshold: CRITERION,
    fixed_in_advance: true,
  },
  adoption: {
    status: "adopted",
    date: "2026-08-13",
    recorded_in: "governance/decisions/ADR-0025-s1-close-numerical-deviation.md",
    note: "The steward adopted the rule-derived value on 2026-08-13; this file still only applies the rule and decides nothing itself.",
  },
  p_floor_candidate: pFloorCandidate,
  smallest_passing_dataset: smallestPassing?.dataset ?? null,
  first_failing_dataset: firstFailing?.dataset ?? null,
  generated_by: "tooling/src/evidence/oracle-floor-map.ts",
  rows,
};

const outDir = path.join(repoRoot, "evidence", "development", "oracle-floor-map");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, "floor-map.json"),
  `${JSON.stringify(jsonDoc, null, 2)}\n`,
  "utf8",
);

const fmt = (value: number): string => (value === 0 ? "0" : value.toExponential(3));
const lines: string[] = [
  "# Degradation-Onset Map (P_floor rule application, Batch 3 V2)",
  "",
  "Kernel vs 60-digit mpmath oracle over the tail + floor corpora, ordered",
  "by true p magnitude. **Rule (fixed in advance)**: P_floor = smallest p",
  "with max relative error over all quantities `<= 1e-11` (10x margin under",
  "the `1e-10` contract p tolerance), rounded up to a power of ten.",
  "**Applying the rule is done here; adopting the value is a steward",
  "decision.** Regenerate: `pnpm evidence:oracle-floor-map`.",
  "",
  "| Dataset | True p (60-digit oracle) | Kernel p | p rel_diff | Max rel_diff (all quantities) | Worst quantity | Meets criterion |",
  "| --- | --- | --- | --- | --- | --- | --- |",
];
for (const row of rows) {
  lines.push(
    `| ${row.dataset} | ${row.true_p_decimal_string} | ${fmt(row.kernel_p)} | ${fmt(row.p_rel_diff)} | ${fmt(row.max_rel_diff_all_quantities)} | ${row.worst_quantity} | ${row.meets_criterion ? "yes" : "**no**"} |`,
  );
}
lines.push(
  "",
  "## Rule application result",
  "",
  `- Smallest point meeting the criterion: \`${smallestPassing?.dataset ?? "none"}\` (true p ${smallestPassing?.true_p_decimal_string ?? "-"}).`,
  `- First point failing the criterion: \`${firstFailing?.dataset ?? "none"}\`${firstFailing === undefined ? "" : ` (true p ${firstFailing.true_p_decimal_string}, max rel_diff ${fmt(firstFailing.max_rel_diff_all_quantities)} in ${firstFailing.worst_quantity})`}.`,
  `- **P_floor: \`${pFloorCandidate === null ? "none derivable" : pFloorCandidate.toExponential(0)}\`** - rule-derived value, adopted by the steward on 2026-08-13 (ADR-0025 adoption record); this file itself only applies the rule and decides nothing.`,
);
fs.writeFileSync(path.join(outDir, "floor-map.md"), `${lines.join("\n")}\n`, "utf8");

console.log(
  `oracle-floor-map: ${rows.length} points, P_floor candidate ${pFloorCandidate === null ? "none" : pFloorCandidate.toExponential(0)} -> evidence/development/oracle-floor-map/{floor-map.json,floor-map.md}`,
);
