/** Fail-closed helpers for the non-authoritative paired-t D5 contract candidate. */

export const MIN_POSITIVE_NORMAL_BINARY64 = 2 ** -1022;

export type CandidateBinary64Comparison =
  | { ok: true; bits: string }
  | {
      ok: false;
      classification:
        "non_finite_numeric_result" | "negative_zero_numeric_result" | "binary64_bit_mismatch";
      declared_bits?: string;
      recomputed_bits?: string;
    };

export type CandidateProbabilityProjection =
  | "supported_positive_normal"
  | "supported_rounded_one"
  | "refuse_positive_subnormal"
  | "refuse_positive_tail_not_representable"
  | "refuse_negative_zero"
  | "refuse_invalid_probability";

export interface PairedTNumericalContractCandidate {
  status: string;
  issuance: string;
  review_issue: string;
  candidate_key: string;
  decision_state: string;
  numerical_contract_frozen: boolean;
  runtime_support_enabled: boolean;
  final_reason_codes_frozen: boolean;
  research_handoff: Record<string, unknown>;
  ledger_separation: Record<string, unknown>;
  selected_candidate_directions: Record<string, unknown>;
  executable_candidate_surface: Record<string, unknown>;
  evidence_targets: Record<string, unknown>;
  held_decisions: string[];
  rejected_directions: string[];
  prohibited_claims_before_final_r2_d5: string[];
}

const TOP_LEVEL_KEYS = [
  "status",
  "issuance",
  "review_issue",
  "candidate_key",
  "decision_state",
  "numerical_contract_frozen",
  "runtime_support_enabled",
  "final_reason_codes_frozen",
  "research_handoff",
  "ledger_separation",
  "selected_candidate_directions",
  "executable_candidate_surface",
  "evidence_targets",
  "held_decisions",
  "rejected_directions",
  "prohibited_claims_before_final_r2_d5",
] as const;

const EXPECTED_RESEARCH_HANDOFF = {
  independent_passes_received: [
    "student_t_runtime_procedure",
    "binary64_target_projection",
    "tolerance_contract",
  ],
  protocol_reproduction_state: "partial",
  private_repository_dependency: false,
  unreproduced_claims_can_close_r2_d5: false,
} as const;

const EXPECTED_LEDGER_SEPARATION = {
  operation_graph_reproduction: "exact_binary64_bits_after_strict_json_parsing",
  mathematical_truth_error: "oracle_enclosure_and_analytic_error_bound",
  target_format_projection: "separate_probability_representability_policy",
  fixture_role: "reproduction_anchor_not_truth_anchor",
} as const;

const EXPECTED_DIRECTIONS = {
  operation_graph: "g4_pairwise_two_pass_fixed_recursive_floor_half_split",
  result_comparison: "exact_binary64_bit_identity",
  comparison_tolerance: null,
  student_t_tail_family: "rigorously_stopped_positive_term_series",
  df1_transcendental_policy: "no_host_atan",
  continued_fraction_role: "non_normative_divergence_probe_only",
  p_value_target_format: "positive_normal_binary64_or_one",
  p_value_subnormal_policy: "candidate_refusal",
  p_value_zero_policy: "refuse_positive_tail_not_representable",
  intermediate_subnormal_policy: "stage_specific_not_blanket",
  confidence_interval_endpoint_collapse: "candidate_refusal",
  condition_number_kappa: "diagnostic_only",
} as const;

const EXPECTED_EXECUTABLE_SURFACE = {
  validator: "tooling/src/spikes/paired-t-numerical-contract-candidate.ts",
  comparison: "finite_non_negative_zero_binary64_bit_identity",
  probability_projection: "positive_normal_or_one_else_classified_refusal",
  sample_variance: "reviewed_operation_stage_predicate_unchanged",
  standard_error_squared: "reviewed_operation_stage_predicate_unchanged",
} as const;

const EXPECTED_EVIDENCE_TARGETS = {
  degrees_of_freedom_min: 1,
  degrees_of_freedom_max_evaluation_target: 200,
  supported_degrees_of_freedom_max: null,
  critical_value_table_state: "incomplete",
  critical_value_table_final_content_hash: null,
  tail_series_iteration_cap_candidate: "40_times_df_plus_64",
  tail_series_remainder_bound_candidate: "next_term_times_x_over_one_minus_x",
} as const;

const EXPECTED_HELD_DECISIONS = [
  "degrees_of_freedom_max_final_selection",
  "runtime_tail_branch_boundary_and_complete_operation_graph",
  "kappa_gate_or_direct_truth_bound",
  "supported_platform_matrix",
  "one_cell_boundary_refusal_margin",
  "subnormal_intermediate_first_failure_order_and_activation",
  "confidence_interval_sign_stability_bound",
  "complete_critical_value_table_and_final_content_hash",
  "final_public_refusal_code_spellings",
] as const;

const EXPECTED_REJECTED_DIRECTIONS = [
  "two_times_one_minus_cdf",
  "cross_library_majority_as_oracle",
  "generic_cross_implementation_ulp_tolerance",
  "host_atan_in_df1_bit_contract",
  "continued_fraction_without_a_rigorous_truncation_bound",
  "clamp_positive_tail_to_zero",
  "replace_positive_tail_with_minimum_subnormal",
  "blanket_refusal_of_every_subnormal_input",
] as const;

const EXPECTED_PROHIBITED_CLAIMS = [
  "supported_df_max",
  "complete_runtime_student_t_tail_procedure",
  "complete_critical_value_table",
  "closed_platform_reproducibility_matrix",
  "authoritative_comparison_contract",
  "issued_public_check_or_supported_bundle",
] as const;

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (typeof value !== "object" || value === null) return value;
  return Object.fromEntries(
    Object.entries(value)
      .sort(([first], [second]) => (first < second ? -1 : first > second ? 1 : 0))
      .map(([key, entry]) => [key, canonicalize(entry)]),
  );
}

function equalCheckpointValue(actual: unknown, expected: unknown): boolean {
  return JSON.stringify(canonicalize(actual)) === JSON.stringify(canonicalize(expected));
}

function hasExactKeys(actual: object, expected: readonly string[]): boolean {
  const actualKeys = Object.keys(actual).sort();
  const expectedKeys = [...expected].sort();
  return (
    actualKeys.length === expectedKeys.length &&
    actualKeys.every((value, index) => value === expectedKeys[index])
  );
}

/** Return the exact big-endian binary64 bit pattern as sixteen lowercase hex digits. */
export function binary64Hex(value: number): string {
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  view.setFloat64(0, value, false);
  return `${view.getUint32(0, false).toString(16).padStart(8, "0")}${view
    .getUint32(4, false)
    .toString(16)
    .padStart(8, "0")}`;
}

/** Compare finite candidate outputs by exact binary64 identity, including zero sign. */
export function compareCandidateBinary64(
  declared: number,
  recomputed: number,
): CandidateBinary64Comparison {
  if (!Number.isFinite(declared) || !Number.isFinite(recomputed)) {
    return { ok: false, classification: "non_finite_numeric_result" };
  }
  if (Object.is(declared, -0) || Object.is(recomputed, -0)) {
    return { ok: false, classification: "negative_zero_numeric_result" };
  }
  const declaredBits = binary64Hex(declared);
  const recomputedBits = binary64Hex(recomputed);
  if (declaredBits !== recomputedBits) {
    return {
      ok: false,
      classification: "binary64_bit_mismatch",
      declared_bits: declaredBits,
      recomputed_bits: recomputedBits,
    };
  }
  return { ok: true, bits: declaredBits };
}

export function isPositiveNormalBinary64(value: number): boolean {
  return Number.isFinite(value) && value >= MIN_POSITIVE_NORMAL_BINARY64;
}

/** Classify a finite-t two-sided p-value after binary64 projection. */
export function classifyCandidateProbabilityProjection(
  value: number,
): CandidateProbabilityProjection {
  if (!Number.isFinite(value) || value < 0 || value > 1) {
    return "refuse_invalid_probability";
  }
  if (Object.is(value, -0)) return "refuse_negative_zero";
  if (value === 0) return "refuse_positive_tail_not_representable";
  if (value === 1) return "supported_rounded_one";
  if (value < MIN_POSITIVE_NORMAL_BINARY64) return "refuse_positive_subnormal";
  return "supported_positive_normal";
}

export function validatePairedTNumericalContractCandidate(
  candidate: PairedTNumericalContractCandidate,
): string[] {
  const errors: string[] = [];
  if (!hasExactKeys(candidate, TOP_LEVEL_KEYS)) {
    errors.push("numerical-contract candidate: keys are incomplete or contain an undeclared item");
  }
  if (
    candidate.status !== "non_authoritative_candidate" ||
    candidate.issuance !== "unissued" ||
    candidate.review_issue !== "https://github.com/licklider-ai/nomue-protocol/issues/25"
  ) {
    errors.push(
      "numerical-contract candidate must remain non-authoritative, unissued, and review-bound",
    );
  }
  if (
    candidate.candidate_key !== "paired-t-d5-numerical-contract-draft-1" ||
    candidate.decision_state !== "candidate_testing_only"
  ) {
    errors.push("numerical-contract candidate identity or decision state changed");
  }
  if (
    candidate.numerical_contract_frozen !== false ||
    candidate.runtime_support_enabled !== false ||
    candidate.final_reason_codes_frozen !== false
  ) {
    errors.push("numerical contract, runtime support, and final reason codes must remain unfrozen");
  }

  const checkpoints: Array<[string, unknown, unknown]> = [
    ["research handoff", candidate.research_handoff, EXPECTED_RESEARCH_HANDOFF],
    ["ledger separation", candidate.ledger_separation, EXPECTED_LEDGER_SEPARATION],
    ["selected candidate directions", candidate.selected_candidate_directions, EXPECTED_DIRECTIONS],
    [
      "executable candidate surface",
      candidate.executable_candidate_surface,
      EXPECTED_EXECUTABLE_SURFACE,
    ],
    ["evidence targets", candidate.evidence_targets, EXPECTED_EVIDENCE_TARGETS],
    ["held decisions", candidate.held_decisions, EXPECTED_HELD_DECISIONS],
    ["rejected directions", candidate.rejected_directions, EXPECTED_REJECTED_DIRECTIONS],
    [
      "prohibited pre-D5 claims",
      candidate.prohibited_claims_before_final_r2_d5,
      EXPECTED_PROHIBITED_CLAIMS,
    ],
  ];
  for (const [label, actual, expected] of checkpoints) {
    if (!equalCheckpointValue(actual, expected)) {
      errors.push(`${label}: value or order differs from the candidate checkpoint`);
    }
  }
  return errors;
}
