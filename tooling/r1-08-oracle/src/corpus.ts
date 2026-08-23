/**
 * Canonical R1-08 oracle corpus v1 — binary64 bit patterns are authority.
 */

import { binary64FromNumber, hashCanonicalJson, type Binary64Spec } from "./binary64.js";

export interface CorpusGroup {
  group_id: string;
  values: Binary64Spec[];
}

export interface CorpusCaseSeed {
  seed_id: string;
  class: string;
  group_x: number[];
  group_y: number[];
  degenerate_expected?: string[];
  notes?: string;
}

const UNDERFLOW_SPREAD: number[] = [0, 0.01, 0.02, 0.03, 0.04];

export const CORPUS_SEEDS: CorpusCaseSeed[] = [
  {
    seed_id: "seed_balanced",
    class: "ordinary_balanced",
    group_x: [1, 2, 3],
    group_y: [4, 5, 6],
  },
  {
    seed_id: "seed_unequal_n_var",
    class: "unequal_n_unequal_variance",
    group_x: [1.1, 2.3, 3.7, 4.1],
    group_y: [5.2, 7.9, 8.1],
  },
  {
    seed_id: "seed_n2",
    class: "minimum_n_per_group",
    group_x: [1.0, 2.0],
    group_y: [3.5, 5.5],
  },
  {
    seed_id: "seed_one_var_zero",
    class: "one_group_variance_zero",
    group_x: [5, 5, 5],
    group_y: [6, 7, 8],
  },
  {
    seed_id: "seed_both_var_zero",
    class: "both_groups_variance_zero",
    group_x: [5, 5, 5],
    group_y: [5, 5, 5],
    degenerate_expected: ["ZERO_STANDARD_ERROR"],
    notes: "Welch SE is zero; numeric p-value must not pass.",
  },
  {
    seed_id: "seed_df_low",
    class: "welch_df_near_lower_boundary",
    group_x: [1.0, 2.0],
    group_y: [1.1, 2.2],
    notes: "n=2 per group yields low Welch df.",
  },
  {
    seed_id: "seed_p_below_005",
    class: "p_below_alpha_0p05",
    group_x: [1, 2, 3],
    group_y: [4, 5, 6],
    notes: "Same arithmetic data as balanced; p is about 0.0213.",
  },
  {
    seed_id: "seed_p_above_005",
    class: "p_above_alpha_0p05",
    group_x: [10.2, 9.6, 10.9, 10.1, 9.8],
    group_y: [10.5, 10.9, 9.9, 10.4, 10.7],
    notes: "CI crosses zero; p is well above 0.05.",
  },
  {
    seed_id: "seed_small_p",
    class: "non_degenerate_small_p",
    group_x: [1, 2, 3, 4],
    group_y: [8, 9, 10, 11],
    notes: "Large mean difference; small but non-underflow p.",
  },
  {
    seed_id: "seed_underflow",
    class: "p_underflow_boundary",
    group_x: Array.from(
      { length: 70 },
      (_, i) => 10 + UNDERFLOW_SPREAD[i % UNDERFLOW_SPREAD.length]!,
    ),
    group_y: Array.from({ length: 70 }, (_, i) => UNDERFLOW_SPREAD[i % UNDERFLOW_SPREAD.length]!),
    degenerate_expected: ["NRS-P-VALUE-UNDERFLOW"],
    notes:
      "Large mean separation with tiny within-group spread yields binary64 p=0 (A2-1-V-002 pattern).",
  },
  {
    seed_id: "seed_ci_crosses_zero",
    class: "ci_crosses_zero",
    group_x: [10.2, 9.6, 10.9, 10.1, 9.8],
    group_y: [10.5, 10.9, 9.9, 10.4, 10.7],
  },
  {
    seed_id: "seed_offset_base",
    class: "large_common_offset_ladder_base",
    group_x: [1000000001, 1000000003, 1000000002],
    group_y: [1000000002.5, 1000000004.5, 1000000003.5],
  },
  {
    seed_id: "seed_permutation",
    class: "within_group_permutation",
    group_x: [1.1, 2.3, 3.7, 4.1],
    group_y: [8.1, 5.2, 7.9],
    notes: "Permutation relation validated against seed_unequal_n_var order.",
  },
  {
    seed_id: "seed_swap",
    class: "group_swap",
    group_x: [4, 5, 6],
    group_y: [1, 2, 3],
    notes: "Swapped groups vs seed_balanced.",
  },
  {
    seed_id: "seed_scale_pow2",
    class: "exact_power_of_two_scaling",
    group_x: [2, 4, 6],
    group_y: [8, 10, 12],
    notes: "Exactly 2x seed_balanced; t, df, p invariant.",
  },
];

export interface OffsetLadderStep {
  offset: number;
  group_x: number[];
  group_y: number[];
}

export const OFFSET_LADDER: OffsetLadderStep[] = [
  { offset: 0, group_x: [1, 3, 2], group_y: [2.5, 4.5, 3.5] },
  { offset: 1e9, group_x: [1e9 + 1, 1e9 + 3, 1e9 + 2], group_y: [1e9 + 2.5, 1e9 + 4.5, 1e9 + 3.5] },
  {
    offset: 1e10,
    group_x: [1e10 + 1, 1e10 + 3, 1e10 + 2],
    group_y: [1e10 + 2.5, 1e10 + 4.5, 1e10 + 3.5],
  },
];

export function buildGroupValues(values: number[]): Binary64Spec[] {
  return values.map((v) => binary64FromNumber(v));
}

export function buildCorpusCaseFromSeed(seed: CorpusCaseSeed): {
  seed_id: string;
  class: string;
  group_x: CorpusGroup;
  group_y: CorpusGroup;
  degenerate_expected?: string[];
  notes?: string;
  input_manifest_sha256: string;
} {
  const manifest = {
    corpus_version: "r1-08-canonical-oracle-corpus-v1",
    seed_id: seed.seed_id,
    group_x: buildGroupValues(seed.group_x),
    group_y: buildGroupValues(seed.group_y),
  };
  return {
    seed_id: seed.seed_id,
    class: seed.class,
    group_x: { group_id: "x", values: manifest.group_x },
    group_y: { group_id: "y", values: manifest.group_y },
    degenerate_expected: seed.degenerate_expected,
    notes: seed.notes,
    input_manifest_sha256: hashCanonicalJson(manifest),
  };
}

export function formatCaseId(className: string, df: number | null, p: number | null): string {
  const dfPart = df === null ? "df_na" : `df${formatNum(df)}`;
  const pPart = p === null ? "p_na" : p === 0 ? "p0_underflow" : `p${formatNum(p)}`;
  return `${className}_${dfPart}_${pPart}`;
}

function formatNum(v: number): string {
  if (!Number.isFinite(v)) return "nonfinite";
  const s = v
    .toPrecision(16)
    .replace(/\.?0+$/, "")
    .replace(".", "p")
    .replace("-", "m");
  return s.length > 24 ? s.slice(0, 24) : s;
}
