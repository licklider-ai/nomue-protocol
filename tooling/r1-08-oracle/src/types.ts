import type { CorpusGroup } from "./corpus.js";
import type { ExactAlgebraicResult } from "./exact-algebraic.js";

export interface CorpusCase {
  case_id: string;
  seed_id: string;
  class: string;
  group_x: CorpusGroup;
  group_y: CorpusGroup;
  input_manifest_sha256: string;
  degenerate_expected?: string[];
  notes?: string;
  exact_algebraic?: ExactAlgebraicResult;
}

export interface ArbCaseResult {
  case_id: string;
  prec?: number;
  degenerate?: string;
  standard_error?: { lower: number; upper: number; mid: number };
  test_statistic?: { lower: number; upper: number; mid: number };
  p_value?: { lower: number; upper: number; mid: number };
  critical_value?: { lower: number; upper: number; mid: number };
  ci_lower?: { lower: number; upper: number; mid: number };
  ci_upper?: { lower: number; upper: number; mid: number };
  mpmath_witness_p_100dps?: number;
}

export interface ReplayRow {
  case_id: string;
  field: string;
  sut_value: number | string | null;
  reference: number | null;
  reference_kind: string;
  contract_tolerance?: { absolute: number; relative: number };
  abs_deviation?: number;
  relative_deviation?: number;
  ulp_distance?: number;
  verdict: string;
}
