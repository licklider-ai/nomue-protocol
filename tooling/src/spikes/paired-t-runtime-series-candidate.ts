/**
 * Executable, non-authoritative Student-t positive-series candidate for R2-D5.
 *
 * This spike makes the proposed binary64 operation graph reviewable. It does not
 * define Protocol support, a supported df ceiling, a comparison tolerance, or a
 * Public Check. The inverse-beta constant is supplied by the evidence route so a
 * runtime table is not silently selected by this increment.
 */

import {
  binary64Hex,
  classifyCandidateProbabilityProjection,
  type CandidateProbabilityProjection,
} from "./paired-t-numerical-contract-candidate.js";

export const RUNTIME_SERIES_EVALUATION_DF_MIN = 1;
export const RUNTIME_SERIES_EVALUATION_DF_MAX = 200;

export interface PairedTRuntimeSeriesInput {
  degreesOfFreedom: number;
  testStatistic: number;
  inverseBeta: number;
}

export type PairedTRuntimeSeriesBranch =
  | "exact-zero"
  | "df2-central-closed-form"
  | "df2-tail-closed-form"
  | "central-complement-positive-series"
  | "lower-tail-positive-series";

export type PairedTRuntimeSeriesCandidateResult =
  | {
      ok: true;
      status: "non_authoritative_candidate_result";
      branch: PairedTRuntimeSeriesBranch;
      pValue: number;
      pValueBinary64Hex: string;
      projection: CandidateProbabilityProjection;
      iterations: number;
      iterationCap: number;
      positiveSeriesRemainderContributionCandidate: number;
      runtimeSupportClaimed: false;
      correctRoundingClaimed: false;
    }
  | {
      ok: false;
      status: "non_authoritative_candidate_refusal";
      classification:
        | "invalid_candidate_input"
        | "outside_evidence_evaluation_range"
        | "non_finite_candidate_intermediate"
        | "positive_series_iteration_cap_reached";
      iterationCap?: number;
    };

export interface PairedTRuntimeSeriesCandidateCheckpoint {
  status: string;
  issuance: string;
  review_issue: string;
  candidate_key: string;
  selection_state: string;
  runtime_support_enabled: boolean;
  correct_rounding_claimed: boolean;
  degrees_of_freedom_evaluation: Record<string, unknown>;
  normalization_constant_source: Record<string, unknown>;
  operation_graph: Record<string, unknown>;
  stopping_rule: Record<string, unknown>;
  evidence_ledgers: Record<string, unknown>;
  held_decisions: string[];
  prohibited_claims: string[];
}

const TOP_LEVEL_CHECKPOINT_KEYS = [
  "status",
  "issuance",
  "review_issue",
  "candidate_key",
  "selection_state",
  "runtime_support_enabled",
  "correct_rounding_claimed",
  "degrees_of_freedom_evaluation",
  "normalization_constant_source",
  "operation_graph",
  "stopping_rule",
  "evidence_ledgers",
  "held_decisions",
  "prohibited_claims",
] as const;

const EXPECTED_EVALUATION = {
  minimum: 1,
  maximum_target: 200,
  supported_maximum: null,
  contiguous_runtime_support_claimed: false,
} as const;

const EXPECTED_CONSTANT_SOURCE = {
  kind: "per_case_arb_certified_inverse_beta_binary64",
  runtime_table_selected: false,
  final_content_hash: null,
} as const;

const EXPECTED_OPERATION_GRAPH = {
  statistic_symmetry: "absolute_value_after_negative_zero_rejection",
  branch_boundary_candidate: "absolute_t_less_than_or_equal_to_one",
  df1_path: "positive_series_without_host_atan",
  df2_path: "cancellation_resistant_algebraic_closed_form",
  df_greater_than_two_path: "positive_incomplete_beta_series",
  integer_power: "right_to_left_binary_exponentiation_with_pinned_multiply_order",
  central_result: "one_minus_positive_central_probability",
  lower_tail_result: "positive_lower_tail_probability",
  fma_allowed: false,
  implicit_extended_precision_allowed: false,
} as const;

const EXPECTED_STOPPING_RULE = {
  graph_stop: "next_positive_term_no_longer_changes_binary64_sum",
  iteration_cap_candidate: "40_times_df_plus_64",
  lower_tail_mathematical_remainder_candidate: "next_term_over_one_minus_x",
  central_mathematical_remainder_candidate: "next_term_over_one_minus_ratio_ceiling",
  binary64_roundoff_included_in_remainder: false,
  cap_is_supported_resource_bound: false,
} as const;

const EXPECTED_LEDGERS = {
  graph_reproduction: "exact_binary64_bits",
  mathematical_truth: "arb_enclosure_and_ulp_observation_in_separate_evidence_bundle",
  truncation: "positive_series_analytic_remainder_candidate",
  target_projection: "normal_only_policy_candidate_not_runtime",
} as const;

const EXPECTED_HELD_DECISIONS = [
  "runtime_inverse_beta_constant_table",
  "final_supported_degrees_of_freedom_maximum",
  "truth_error_bound",
  "one_cell_projection_boundary_margin",
  "supported_platform_matrix",
  "final_runtime_refusal_codes",
] as const;

const EXPECTED_PROHIBITED_CLAIMS = [
  "supported_runtime_student_t_procedure",
  "correctly_rounded_runtime_p_value",
  "complete_operation_graph_truth_bound",
  "supported_df_max",
  "authoritative_public_check_or_bundle",
] as const;

function hasExactKeys(actual: object, expected: readonly string[]): boolean {
  const actualKeys = Object.keys(actual).sort();
  const expectedKeys = [...expected].sort();
  return (
    actualKeys.length === expectedKeys.length &&
    actualKeys.every((entry, index) => entry === expectedKeys[index])
  );
}

function canonicalizeJson(value: unknown, ancestors = new Set<object>()): unknown {
  if (
    value === undefined ||
    typeof value === "bigint" ||
    typeof value === "function" ||
    typeof value === "symbol" ||
    (typeof value === "number" && !Number.isFinite(value))
  ) {
    throw new TypeError("runtime-series checkpoint contains a value outside strict JSON");
  }
  if (typeof value !== "object" || value === null) return value;
  if (ancestors.has(value)) throw new TypeError("runtime-series checkpoint contains a cycle");
  const nextAncestors = new Set(ancestors).add(value);
  if (Array.isArray(value)) {
    return value.map((entry) => canonicalizeJson(entry, nextAncestors));
  }
  const prototype = Object.getPrototypeOf(value) as object | null;
  if (prototype !== Object.prototype && prototype !== null) {
    throw new TypeError("runtime-series checkpoint contains a non-JSON object");
  }
  return Object.fromEntries(
    Object.entries(value)
      .sort(([first], [second]) => (first < second ? -1 : first > second ? 1 : 0))
      .map(([key, entry]) => [key, canonicalizeJson(entry, nextAncestors)]),
  );
}

function equalJsonValue(actual: unknown, expected: unknown): boolean {
  try {
    return JSON.stringify(canonicalizeJson(actual)) === JSON.stringify(canonicalizeJson(expected));
  } catch {
    return false;
  }
}

function finite(values: readonly number[]): boolean {
  return values.every(Number.isFinite);
}

function integerPowerCandidate(base: number, exponent: number): number {
  let accumulator = 1;
  let factor = base;
  let remaining = exponent;
  while (remaining > 0) {
    if (remaining % 2 === 1) accumulator = accumulator * factor;
    remaining = Math.floor(remaining / 2);
    if (remaining > 0) factor = factor * factor;
  }
  return accumulator;
}

function completeCandidate(
  branch: PairedTRuntimeSeriesBranch,
  pValue: number,
  iterations: number,
  iterationCap: number,
  remainder: number,
): PairedTRuntimeSeriesCandidateResult {
  if (!finite([pValue, remainder]) || pValue < 0 || pValue > 1 || remainder < 0) {
    return {
      ok: false,
      status: "non_authoritative_candidate_refusal",
      classification: "non_finite_candidate_intermediate",
    };
  }
  return {
    ok: true,
    status: "non_authoritative_candidate_result",
    branch,
    pValue,
    pValueBinary64Hex: binary64Hex(pValue),
    projection: classifyCandidateProbabilityProjection(pValue),
    iterations,
    iterationCap,
    positiveSeriesRemainderContributionCandidate: remainder,
    runtimeSupportClaimed: false,
    correctRoundingClaimed: false,
  };
}

/** Execute the proposed binary64 graph without promoting it to runtime support. */
export function evaluatePairedTRuntimeSeriesCandidate(
  input: PairedTRuntimeSeriesInput,
): PairedTRuntimeSeriesCandidateResult {
  const { degreesOfFreedom: df, testStatistic, inverseBeta } = input;
  if (
    !Number.isInteger(df) ||
    df < RUNTIME_SERIES_EVALUATION_DF_MIN ||
    !Number.isFinite(testStatistic) ||
    Object.is(testStatistic, -0) ||
    !Number.isFinite(inverseBeta) ||
    inverseBeta <= 0
  ) {
    return {
      ok: false,
      status: "non_authoritative_candidate_refusal",
      classification: "invalid_candidate_input",
    };
  }
  if (df > RUNTIME_SERIES_EVALUATION_DF_MAX) {
    return {
      ok: false,
      status: "non_authoritative_candidate_refusal",
      classification: "outside_evidence_evaluation_range",
    };
  }

  const absoluteT = Math.abs(testStatistic);
  const iterationCap = 40 * df + 64;
  if (absoluteT === 0) {
    return completeCandidate("exact-zero", 1, 0, iterationCap, 0);
  }

  if (df === 2) {
    if (absoluteT <= 1) {
      const squaredT = absoluteT * absoluteT;
      const root = Math.sqrt(2 + squaredT);
      const pValue = 1 - absoluteT / root;
      return completeCandidate("df2-central-closed-form", pValue, 0, iterationCap, 0);
    }
    const reciprocalT = 1 / absoluteT;
    const scaledSquaredReciprocal = 2 * (reciprocalT * reciprocalT);
    const root = Math.sqrt(1 + scaledSquaredReciprocal);
    const pValue = scaledSquaredReciprocal / (root * (root + 1));
    return completeCandidate("df2-tail-closed-form", pValue, 0, iterationCap, 0);
  }

  const halfDf = df / 2;
  if (absoluteT <= 1) {
    const squaredT = absoluteT * absoluteT;
    const denominator = df + squaredT;
    const y = squaredT / denominator;
    const x = df / denominator;
    let xPower = integerPowerCandidate(x, Math.floor(df / 2));
    if (df % 2 === 1) xPower = xPower * Math.sqrt(x);
    const prefactor = 2 * Math.sqrt(y) * xPower * inverseBeta;
    const ratioCeiling = Math.max(y, (y * (halfDf + 0.5)) / 1.5);
    if (!finite([squaredT, denominator, y, x, xPower, prefactor, ratioCeiling])) {
      return {
        ok: false,
        status: "non_authoritative_candidate_refusal",
        classification: "non_finite_candidate_intermediate",
      };
    }

    let term = 1;
    let sum = 1;
    for (let index = 0; index < iterationCap; index += 1) {
      const nextTerm = (term * y * (halfDf + 0.5 + index)) / (1.5 + index);
      const nextSum = sum + nextTerm;
      const mathematicalRemainderCandidate = nextTerm / (1 - ratioCeiling);
      const resultRemainderCandidate = prefactor * mathematicalRemainderCandidate;
      if (!finite([nextTerm, nextSum, resultRemainderCandidate])) {
        return {
          ok: false,
          status: "non_authoritative_candidate_refusal",
          classification: "non_finite_candidate_intermediate",
        };
      }
      if (nextSum === sum) {
        return completeCandidate(
          "central-complement-positive-series",
          1 - prefactor * sum,
          index + 1,
          iterationCap,
          resultRemainderCandidate,
        );
      }
      term = nextTerm;
      sum = nextSum;
    }
  } else {
    const reciprocalT = 1 / absoluteT;
    const squaredReciprocal = reciprocalT * reciprocalT;
    const scaledSquaredReciprocal = df * squaredReciprocal;
    const denominator = 1 + scaledSquaredReciprocal;
    const x = scaledSquaredReciprocal / denominator;
    let xPower = integerPowerCandidate(x, Math.floor(df / 2));
    if (df % 2 === 1) {
      const stableSquareRootX = (Math.sqrt(df) * reciprocalT) / Math.sqrt(denominator);
      xPower = xPower * stableSquareRootX;
    }
    const prefactor = (xPower * inverseBeta) / halfDf;
    if (!finite([reciprocalT, squaredReciprocal, x, xPower, prefactor])) {
      return {
        ok: false,
        status: "non_authoritative_candidate_refusal",
        classification: "non_finite_candidate_intermediate",
      };
    }

    let term = 1;
    let sum = 1;
    for (let index = 0; index < iterationCap; index += 1) {
      const nextTerm =
        (term * x * (halfDf + index) * (index + 0.5)) / (halfDf + index + 1) / (index + 1);
      const nextSum = sum + nextTerm;
      const mathematicalRemainderCandidate = nextTerm / (1 - x);
      const resultRemainderCandidate = prefactor * mathematicalRemainderCandidate;
      if (!finite([nextTerm, nextSum, resultRemainderCandidate])) {
        return {
          ok: false,
          status: "non_authoritative_candidate_refusal",
          classification: "non_finite_candidate_intermediate",
        };
      }
      if (nextSum === sum) {
        return completeCandidate(
          "lower-tail-positive-series",
          prefactor * sum,
          index + 1,
          iterationCap,
          resultRemainderCandidate,
        );
      }
      term = nextTerm;
      sum = nextSum;
    }
  }

  return {
    ok: false,
    status: "non_authoritative_candidate_refusal",
    classification: "positive_series_iteration_cap_reached",
    iterationCap,
  };
}

/** Validate the closed metadata surface of the executable candidate. */
export function validatePairedTRuntimeSeriesCandidateCheckpoint(
  candidate: PairedTRuntimeSeriesCandidateCheckpoint,
): string[] {
  const errors: string[] = [];
  if (!hasExactKeys(candidate, TOP_LEVEL_CHECKPOINT_KEYS)) {
    errors.push("runtime-series candidate: keys are incomplete or contain an undeclared item");
  }
  if (
    candidate.status !== "non_authoritative_candidate" ||
    candidate.issuance !== "unissued" ||
    candidate.review_issue !== "https://github.com/licklider-ai/nomue-protocol/issues/25"
  ) {
    errors.push(
      "runtime-series candidate must remain non-authoritative, unissued, and review-bound",
    );
  }
  if (
    candidate.candidate_key !== "paired-t-d5-runtime-series-evaluation-1" ||
    candidate.selection_state !== "evaluation_only_not_runtime_selected" ||
    candidate.runtime_support_enabled !== false ||
    candidate.correct_rounding_claimed !== false
  ) {
    errors.push("runtime-series candidate overclaims selection, support, or correct rounding");
  }
  const checkpoints: Array<[string, unknown, unknown]> = [
    ["df evaluation", candidate.degrees_of_freedom_evaluation, EXPECTED_EVALUATION],
    ["normalization constants", candidate.normalization_constant_source, EXPECTED_CONSTANT_SOURCE],
    ["operation graph", candidate.operation_graph, EXPECTED_OPERATION_GRAPH],
    ["stopping rule", candidate.stopping_rule, EXPECTED_STOPPING_RULE],
    ["evidence ledgers", candidate.evidence_ledgers, EXPECTED_LEDGERS],
    ["held decisions", candidate.held_decisions, EXPECTED_HELD_DECISIONS],
    ["prohibited claims", candidate.prohibited_claims, EXPECTED_PROHIBITED_CLAIMS],
  ];
  for (const [label, actual, expected] of checkpoints) {
    if (!equalJsonValue(actual, expected)) {
      errors.push(`${label}: value or order differs from the runtime-series checkpoint`);
    }
  }
  return errors;
}
