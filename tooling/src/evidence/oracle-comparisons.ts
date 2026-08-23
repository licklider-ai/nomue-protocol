/**
 * Shared kernel-vs-captured-oracle comparison logic (Batch 2 addendum
 * U4/U8). Used by:
 *   - oracle-matrix-generate.ts (regenerates the captured oracle-matrix.json
 *     files under evidence/development/),
 *   - oracle-rel-diff-matrix.ts (per-environment rel_diff artifact for CI),
 *   - oracle-deviation-summary.ts (per-quantity max/p95 aggregation for
 *     discussion item S1).
 *
 * The kernel side is recomputed live; the oracle side is always the CAPTURED
 * python-output.json artifacts (SciPy + mpmath at 60 digits), never
 * recomputed here - so every consumer runs offline without Python. This is
 * NOT gate R1-08 evidence: R1-08 closed on a separate, disjoint-lineage
 * oracle (see pnpm oracle:r1-08 and ADR-0010).
 */

import {
  welchTwoSampleTTest,
  welchTwoSampleTTestWithCi,
} from "../../../reference/stats-kernel/src/kernel.js";
import { loadJson } from "../lib/repo.js";
import {
  FLOOR_ORACLE_DATASETS,
  PHASE1_ORACLE_DATASETS,
  TAIL_ORACLE_DATASETS,
} from "../phase1/oracle-datasets.js";
import { ORACLE_DATASETS } from "../phase2a/datasets.js";
import type { Dataset } from "../phase2a/datasets.js";

export type CorpusName = "phase1" | "phase2a" | "tail" | "floor";

export interface CapturedRow {
  mean1: number;
  var1: number;
  mean2: number;
  var2: number;
  mean_difference: number;
  standard_error: number;
  test_statistic: number;
  scipy_statistic: number;
  scipy_df: number;
  scipy_pvalue: number;
  degrees_of_freedom: number;
  p_value_mpmath: number;
  p_value_mpmath_str?: string;
  scipy_critical_value?: number;
  mpmath_critical_value?: number;
  scipy_ci_low?: number;
  scipy_ci_high?: number;
}

export interface Comparison {
  kernel: number;
  oracle: number;
  oracle_source: string;
  rel_diff: number;
}

export interface DatasetComparison {
  data: { g1: number[]; g2: number[] };
  comparisons: Record<string, Comparison>;
  kernel_p_value_clamped: boolean;
  p_value_mpmath_str?: string;
}

export interface CorpusComparison {
  corpus: CorpusName;
  captured_from: string;
  datasets: Record<string, DatasetComparison>;
  max_rel_diff: number;
}

export const CAPTURED_PATHS: Record<CorpusName, string> = {
  phase1: "evidence/development/phase-1/oracle/python-output.json",
  phase2a: "evidence/development/phase-2a/oracle/python-output.json",
  tail: "evidence/development/oracle-tail-cases/python-output.json",
  floor: "evidence/development/oracle-floor-map/python-output.json",
};

const CORPUS_DATASETS: Record<CorpusName, Record<string, Dataset>> = {
  phase1: PHASE1_ORACLE_DATASETS,
  phase2a: ORACLE_DATASETS,
  tail: TAIL_ORACLE_DATASETS,
  floor: FLOOR_ORACLE_DATASETS,
};

export const relDiff = (a: number, b: number): number =>
  a === b ? 0 : Math.abs(a - b) / Math.max(Math.abs(a), Math.abs(b));

export function compareCorpus(corpus: CorpusName): CorpusComparison {
  const captured = loadJson<Record<string, CapturedRow>>(CAPTURED_PATHS[corpus]);
  const datasets = CORPUS_DATASETS[corpus];
  const out: Record<string, DatasetComparison> = {};
  let maxRelDiff = 0;

  for (const [name, data] of Object.entries(datasets)) {
    const row = captured[name];
    if (row === undefined) {
      throw new Error(`corpus ${corpus}: dataset ${name} has no captured oracle row`);
    }
    const g1 = { group_id: "g1", values: data.groupA };
    const g2 = { group_id: "g2", values: data.groupB };
    const kernel =
      corpus === "phase2a" ? welchTwoSampleTTestWithCi(g1, g2, 0.95) : welchTwoSampleTTest(g1, g2);
    const [s1, s2] = kernel.group_summaries;

    const comparisons: Record<string, Comparison> = {};
    const add = (quantity: string, k: number, o: number, source: string): void => {
      const diff = relDiff(k, o);
      comparisons[quantity] = { kernel: k, oracle: o, oracle_source: source, rel_diff: diff };
      maxRelDiff = Math.max(maxRelDiff, diff);
    };

    add("mean_1", s1.mean, row.mean1, "python_exact_fraction");
    add("sample_variance_1", s1.sample_variance, row.var1, "python_exact_fraction");
    add("mean_2", s2.mean, row.mean2, "python_exact_fraction");
    add("sample_variance_2", s2.sample_variance, row.var2, "python_exact_fraction");
    add("mean_difference", kernel.mean_difference, row.mean_difference, "python_exact_fraction");
    add("standard_error", kernel.standard_error, row.standard_error, "mpmath_60_digits");
    add("test_statistic_vs_mpmath", kernel.test_statistic, row.test_statistic, "mpmath_60_digits");
    add("test_statistic_vs_scipy", kernel.test_statistic, row.scipy_statistic, "scipy");
    add(
      "degrees_of_freedom_vs_mpmath",
      kernel.degrees_of_freedom,
      row.degrees_of_freedom,
      "mpmath_60_digits",
    );
    add("degrees_of_freedom_vs_scipy", kernel.degrees_of_freedom, row.scipy_df, "scipy");
    add("p_value_vs_scipy", kernel.p_value, row.scipy_pvalue, "scipy");
    add("p_value_vs_mpmath", kernel.p_value, row.p_value_mpmath, "mpmath_60_digits");

    if (corpus === "phase2a") {
      const withCi = kernel as ReturnType<typeof welchTwoSampleTTestWithCi>;
      add(
        "critical_value_vs_scipy",
        withCi.confidence_interval.critical_value,
        row.scipy_critical_value as number,
        "scipy",
      );
      add(
        "critical_value_vs_mpmath",
        withCi.confidence_interval.critical_value,
        row.mpmath_critical_value as number,
        "mpmath_60_digits",
      );
      add("ci_lower", withCi.confidence_interval.lower, row.scipy_ci_low as number, "scipy");
      add("ci_upper", withCi.confidence_interval.upper, row.scipy_ci_high as number, "scipy");
    }

    const entry: DatasetComparison = {
      data: { g1: [...data.groupA], g2: [...data.groupB] },
      comparisons,
      kernel_p_value_clamped: kernel.p_value_clamped,
    };
    if (row.p_value_mpmath_str !== undefined) {
      entry.p_value_mpmath_str = row.p_value_mpmath_str;
    }
    out[name] = entry;
  }

  return {
    corpus,
    captured_from: CAPTURED_PATHS[corpus],
    datasets: out,
    max_rel_diff: maxRelDiff,
  };
}
