/** Candidate-only truth-error and target-projection boundary contract for R2-D5. */

import {
  binary64Hex,
  classifyCandidateProbabilityProjection,
} from "./paired-t-numerical-contract-candidate.js";

export interface PairedTTruthBoundaryCandidate {
  status: string;
  issuance: string;
  review_issue: string;
  candidate_key: string;
  decision_state: string;
  runtime_support_enabled: boolean;
  truth_error_bound_complete: boolean;
  truth_error_evidence: Record<string, unknown>;
  projection_margin_form: Record<string, unknown>;
  boundary_search: Record<string, unknown>;
  held_decisions: string[];
  prohibited_claims: string[];
}

export type ProjectionMarginCandidateResult =
  | {
      status: "candidate_stable_for_supplied_bound";
      projectionClass: "supported_positive_normal" | "supported_rounded_one";
      cellsToNearestRejectedClass: bigint;
      suppliedTruthErrorBoundUlp: bigint;
      runtimeSupportClaimed: false;
    }
  | {
      status: "candidate_refusal";
      classification:
        | "projection_class_not_selected_for_support"
        | "projection_margin_not_larger_than_supplied_bound"
        | "invalid_candidate_input";
      cellsToNearestRejectedClass?: bigint;
      suppliedTruthErrorBoundUlp?: bigint;
      runtimeSupportClaimed: false;
    };

const MAX_SUBNORMAL_BITS = 0x000f_ffff_ffff_ffffn;
const ONE_BITS = 0x3ff0_0000_0000_0000n;

const TOP_LEVEL_KEYS = [
  "status",
  "issuance",
  "review_issue",
  "candidate_key",
  "decision_state",
  "runtime_support_enabled",
  "truth_error_bound_complete",
  "truth_error_evidence",
  "projection_margin_form",
  "boundary_search",
  "held_decisions",
  "prohibited_claims",
] as const;

const EXPECTED_TRUTH_ERROR_EVIDENCE = {
  oracle: "arb_regularized_incomplete_beta_exact_binary64_input",
  graph_reference: "paired_t_d5_runtime_series_evaluation_1",
  pointwise_measure: "exact_nonnegative_binary64_ulp_distance_to_certified_correct_rounding",
  global_bound_selected: false,
  global_bound_ulp: null,
  finite_corpus_maximum_is_a_guarantee: false,
} as const;

const EXPECTED_MARGIN_FORM = {
  target_format: "binary64_round_ties_to_even",
  candidate_supported_classes: ["positive_normal", "rounded_one"],
  future_bound_input: "future_selected_nonnegative_integer_truth_error_bound_ulp",
  stability_condition:
    "distance_to_nearest_policy_class_transition_strictly_greater_than_truth_error_bound",
  future_bound_ulp: null,
  runtime_predicate_activated: false,
} as const;

const EXPECTED_BOUNDARY_SEARCH = {
  manifest: "tooling/r2-paired-t-runtime-series/truth-boundary-cases.json",
  generator: "tooling/r2-paired-t-runtime-series/generate_truth_boundary_evidence.py",
  validator: "tooling/src/spikes/validate-paired-t-truth-boundary-evidence.ts",
  transition_families: [
    "rounded_one_to_positive_normal",
    "positive_normal_to_positive_subnormal",
    "positive_subnormal_to_zero",
  ],
  adjacent_binary64_statistics_required: true,
  contiguous_input_domain_claimed: false,
} as const;

const EXPECTED_HELD_DECISIONS = [
  "global_truth_error_bound_ulp",
  "runtime_inverse_beta_constant_table",
  "final_supported_degrees_of_freedom_maximum",
  "supported_platform_matrix",
  "final_runtime_refusal_codes",
] as const;

const EXPECTED_PROHIBITED_CLAIMS = [
  "finite_corpus_maximum_as_global_truth_bound",
  "runtime_projection_margin_without_selected_truth_bound",
  "supported_runtime_student_t_procedure",
  "correctly_rounded_runtime_p_value",
  "supported_df_max",
  "authoritative_public_check_or_bundle",
] as const;

function exactKeys(actual: object, expected: readonly string[]): boolean {
  const first = Object.keys(actual).sort();
  const second = [...expected].sort();
  return first.length === second.length && first.every((entry, index) => entry === second[index]);
}

function canonicalize(value: unknown): unknown {
  if (
    value === undefined ||
    typeof value === "bigint" ||
    typeof value === "function" ||
    typeof value === "symbol" ||
    (typeof value === "number" && !Number.isFinite(value))
  ) {
    throw new TypeError("truth-boundary checkpoint contains a non-JSON value");
  }
  if (Array.isArray(value)) return value.map(canonicalize);
  if (typeof value !== "object" || value === null) return value;
  if (Object.getPrototypeOf(value) !== Object.prototype) {
    throw new TypeError("truth-boundary checkpoint contains a non-JSON object");
  }
  return Object.fromEntries(
    Object.entries(value)
      .sort(([first], [second]) => first.localeCompare(second))
      .map(([key, entry]) => [key, canonicalize(entry)]),
  );
}

function equalJson(actual: unknown, expected: unknown): boolean {
  try {
    return JSON.stringify(canonicalize(actual)) === JSON.stringify(canonicalize(expected));
  } catch {
    return false;
  }
}

function nonnegativeBits(value: number): bigint | undefined {
  if (!Number.isFinite(value) || value < 0 || Object.is(value, -0)) return undefined;
  return BigInt(`0x${binary64Hex(value)}`);
}

/**
 * Evaluate only the form of the future projection-margin predicate.
 * The supplied bound is hypothetical until R2-D5 selects and proves one.
 */
export function evaluateProjectionMarginCandidate(
  value: number,
  truthErrorBoundUlp: bigint,
): ProjectionMarginCandidateResult {
  if (truthErrorBoundUlp < 0) {
    return {
      status: "candidate_refusal",
      classification: "invalid_candidate_input",
      runtimeSupportClaimed: false,
    };
  }
  const bits = nonnegativeBits(value);
  if (bits === undefined || value > 1) {
    return {
      status: "candidate_refusal",
      classification: "invalid_candidate_input",
      runtimeSupportClaimed: false,
    };
  }
  const projection = classifyCandidateProbabilityProjection(value);
  if (projection !== "supported_positive_normal" && projection !== "supported_rounded_one") {
    return {
      status: "candidate_refusal",
      classification: "projection_class_not_selected_for_support",
      runtimeSupportClaimed: false,
    };
  }
  const cellsToNearestRejectedClass =
    projection === "supported_rounded_one"
      ? 1n
      : bits - MAX_SUBNORMAL_BITS < ONE_BITS - bits
        ? bits - MAX_SUBNORMAL_BITS
        : ONE_BITS - bits;
  if (cellsToNearestRejectedClass <= truthErrorBoundUlp) {
    return {
      status: "candidate_refusal",
      classification: "projection_margin_not_larger_than_supplied_bound",
      cellsToNearestRejectedClass,
      suppliedTruthErrorBoundUlp: truthErrorBoundUlp,
      runtimeSupportClaimed: false,
    };
  }
  return {
    status: "candidate_stable_for_supplied_bound",
    projectionClass: projection,
    cellsToNearestRejectedClass,
    suppliedTruthErrorBoundUlp: truthErrorBoundUlp,
    runtimeSupportClaimed: false,
  };
}

export function validatePairedTTruthBoundaryCandidate(
  candidate: PairedTTruthBoundaryCandidate,
): string[] {
  const errors: string[] = [];
  if (!exactKeys(candidate, TOP_LEVEL_KEYS)) {
    errors.push("truth-boundary candidate: keys are incomplete or contain an undeclared item");
  }
  if (
    candidate.status !== "non_authoritative_candidate" ||
    candidate.issuance !== "unissued" ||
    candidate.review_issue !== "https://github.com/licklider-ai/nomue-protocol/issues/25" ||
    candidate.candidate_key !== "paired-t-d5-truth-boundary-evidence-1" ||
    candidate.decision_state !== "evidence_generation_only" ||
    candidate.runtime_support_enabled !== false ||
    candidate.truth_error_bound_complete !== false
  ) {
    errors.push("truth-boundary candidate overclaims maturity, closure, or support");
  }
  const checkpoints: Array<[string, unknown, unknown]> = [
    ["truth-error evidence", candidate.truth_error_evidence, EXPECTED_TRUTH_ERROR_EVIDENCE],
    ["projection-margin form", candidate.projection_margin_form, EXPECTED_MARGIN_FORM],
    ["boundary search", candidate.boundary_search, EXPECTED_BOUNDARY_SEARCH],
    ["held decisions", candidate.held_decisions, EXPECTED_HELD_DECISIONS],
    ["prohibited claims", candidate.prohibited_claims, EXPECTED_PROHIBITED_CLAIMS],
  ];
  for (const [label, actual, expected] of checkpoints) {
    if (!equalJson(actual, expected))
      errors.push(`${label}: value differs from the candidate checkpoint`);
  }
  return errors;
}
