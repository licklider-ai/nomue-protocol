/**
 * CLI: replay the Phase 2A oracle comparison. The reference kernel is
 * recomputed live and compared against the CAPTURED independent-oracle
 * outputs (SciPy + mpmath) pinned in
 * evidence/development/phase-2a/oracle/python-output.json, so this check
 * runs offline in CI without a Python environment. The captured outputs are
 * artifacts, not regenerated here, and R remains unavailable in this
 * comparison. This script is NOT the R1-08 gate evidence: gate R1-08
 * (independent numerical oracle) closed with decision "pass" on a separate,
 * disjoint-lineage oracle (see `pnpm oracle:r1-08`,
 * tooling/r1-08-oracle/README.md, and authority/release-1-gates.yaml). This
 * SciPy/mpmath check remains a useful fast regression signal even though it
 * does not itself carry independent-oracle authority (ADR-0010).
 */

import { welchTwoSampleTTestWithCi } from "../../../reference/stats-kernel/src/kernel.js";
import { loadJson } from "../lib/repo.js";
import { ORACLE_DATASETS } from "./datasets.js";

interface OracleRow {
  mean1: number;
  var1: number;
  mean2: number;
  var2: number;
  mean_difference: number;
  standard_error: number;
  scipy_statistic: number;
  scipy_df: number;
  scipy_pvalue: number;
  p_value_mpmath: number;
  scipy_critical_value: number;
  mpmath_critical_value: number;
  scipy_ci_low: number;
  scipy_ci_high: number;
}

const DATASETS: Record<string, { g1: number[]; g2: number[] }> = Object.fromEntries(
  Object.entries(ORACLE_DATASETS).map(([name, data]) => [
    name,
    { g1: data.groupA, g2: data.groupB },
  ]),
);

// Comparison bounds follow the check-version tolerance policy
// (canonicalization/numerical-comparison.md); p-value and CI use the looser
// relative bound, everything else 1e-12.
const REL_STRICT = 1e-12;
const REL_LOOSE = 1e-10;

const relDiff = (a: number, b: number): number =>
  a === b ? 0 : Math.abs(a - b) / Math.max(Math.abs(a), Math.abs(b));

const python = loadJson<Record<string, OracleRow>>(
  "evidence/development/phase-2a/oracle/python-output.json",
);

const failures: string[] = [];
let maxRel = 0;
for (const [name, data] of Object.entries(DATASETS)) {
  const row = python[name];
  if (row === undefined) {
    failures.push(`${name}: missing captured oracle row`);
    continue;
  }
  const r = welchTwoSampleTTestWithCi(
    { group_id: "g1", values: data.g1 },
    { group_id: "g2", values: data.g2 },
    0.95,
  );
  const comparisons: Array<[string, number, number, number]> = [
    ["standard_error", r.standard_error, row.standard_error, REL_STRICT],
    ["test_statistic", r.test_statistic, row.scipy_statistic, REL_STRICT],
    ["degrees_of_freedom", r.degrees_of_freedom, row.scipy_df, REL_STRICT],
    ["p_value_scipy", r.p_value, row.scipy_pvalue, REL_LOOSE],
    ["p_value_mpmath", r.p_value, row.p_value_mpmath, REL_LOOSE],
    [
      "critical_value_scipy",
      r.confidence_interval.critical_value,
      row.scipy_critical_value,
      REL_STRICT,
    ],
    [
      "critical_value_mpmath",
      r.confidence_interval.critical_value,
      row.mpmath_critical_value,
      REL_STRICT,
    ],
    ["ci_lower", r.confidence_interval.lower, row.scipy_ci_low, REL_LOOSE],
    ["ci_upper", r.confidence_interval.upper, row.scipy_ci_high, REL_LOOSE],
  ];
  for (const [quantity, actual, expected, bound] of comparisons) {
    const diff = relDiff(actual, expected);
    maxRel = Math.max(maxRel, diff);
    if (diff > bound) {
      failures.push(`${name} ${quantity}: relative difference ${diff} exceeds ${bound}`);
    }
  }
}

if (failures.length === 0) {
  console.log(
    `oracle:phase2a: OK (${Object.keys(DATASETS).length} datasets vs captured SciPy/mpmath outputs; max relative difference ${maxRel.toExponential(2)}; R unavailable in this comparison; independent-oracle gate R1-08 is closed separately, see pnpm oracle:r1-08)`,
  );
} else {
  console.error(`oracle:phase2a: ${failures.length} failure(s)`);
  for (const failure of failures) console.error("  " + failure);
  process.exitCode = 1;
}
