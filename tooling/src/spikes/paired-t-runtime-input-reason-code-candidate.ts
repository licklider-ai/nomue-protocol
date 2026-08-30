/** Closed input shape and reason-code inventory for the non-authoritative R2-D5 candidate. */

export interface PairedTCandidateEvaluationInput {
  degreesOfFreedom: number;
  testStatistic: number;
}

export interface PairedTRuntimeInputReasonCodeCandidate {
  status: "non_authoritative_candidate";
  issuance: "unissued";
  review_issue: "https://github.com/licklider-ai/nomue-protocol/issues/25";
  candidate_key: "paired-t-d5-runtime-input-reason-code-evaluation-1";
  decision_state: "candidate_inventory_only";
  runtime_support_enabled: false;
  supported_domain_claimed: false;
  final_reason_codes_frozen: false;
  inventory_scope: Record<string, unknown>;
  input_contract: Record<string, unknown>;
  selected_operation_stage_reason_code_candidates: Array<Record<string, unknown>>;
  delegated_classifications: Array<Record<string, unknown>>;
  internal_only_classifications: Array<Record<string, unknown>>;
  deferred_reason_code_decisions: Array<Record<string, unknown>>;
  prohibited_claims: string[];
}

const EXPECTED_CHECKPOINT = {
  status: "non_authoritative_candidate",
  issuance: "unissued",
  review_issue: "https://github.com/licklider-ai/nomue-protocol/issues/25",
  candidate_key: "paired-t-d5-runtime-input-reason-code-evaluation-1",
  decision_state: "candidate_inventory_only",
  runtime_support_enabled: false,
  supported_domain_claimed: false,
  final_reason_codes_frozen: false,
  inventory_scope: {
    public_code_subset: "reviewed_operation_stage_failures_only",
    complete_release_2_reason_code_inventory_claimed: false,
    profile_admissibility_and_record_validation_codes: "outside_this_numerical_increment",
    declared_result_comparison_codes: "outside_this_numerical_increment",
    support_dependent_runtime_codes: "deferred",
  },
  input_contract: {
    entrypoints: [
      "tooling/src/spikes/paired-t-runtime-table-integration-candidate.ts",
      "tooling/src/spikes/paired-t-truth-error-support-candidate.ts",
    ],
    required_own_data_keys: ["degreesOfFreedom", "testStatistic"],
    extra_own_keys: "refuse",
    inherited_required_keys: "refuse",
    symbol_keys: "refuse",
    accessor_properties: "refuse_without_invocation",
    custom_object_prototype: "refuse",
    malformed_input_disposition: "structured_candidate_refusal",
    table_integration_classification: "invalid_candidate_input",
    truth_error_wrapper_classification: "runtime_graph_refusal",
    truth_error_graph_classification: "invalid_candidate_input",
  },
  selected_operation_stage_reason_code_candidates: [
    {
      ordinal: 1,
      source_spike_error: "PAIR_COUNT_BELOW_TWO",
      failure_class: "contract_computability",
      readiness_key: "fewer_than_two_pairs",
      candidate_reason_code: "NRS-PAIRED-T-PAIR-COUNT-BELOW-TWO",
      candidate_check_key: "paired_t_computability_check",
      state: "candidate_unissued",
    },
    {
      ordinal: 2,
      source_spike_error: "DIFFERENCE_OVERFLOW",
      failure_class: "binary64_computability",
      readiness_key: "difference_overflow",
      candidate_reason_code: "NRS-PAIRED-T-DIFFERENCE-OVERFLOW",
      candidate_check_key: "paired_t_computability_check",
      state: "candidate_unissued",
    },
    {
      ordinal: 3,
      source_spike_error: "ZERO_DIFFERENCE_VARIANCE",
      failure_class: "contract_computability",
      readiness_key: "exact_paired_differences_all_equal",
      candidate_reason_code: "NRS-PAIRED-T-ZERO-DIFFERENCE-VARIANCE",
      candidate_check_key: "paired_t_computability_check",
      state: "candidate_unissued",
    },
    {
      ordinal: 4,
      source_spike_error: "DIFFERENCE_VARIANCE_ERASED_BY_ROUNDING",
      failure_class: "binary64_computability",
      readiness_key: "difference_variance_erased_by_rounding",
      candidate_reason_code: "NRS-PAIRED-T-DIFFERENCE-VARIANCE-ERASED-BY-ROUNDING",
      candidate_check_key: "paired_t_computability_check",
      state: "candidate_unissued",
    },
    {
      ordinal: 5,
      source_spike_error: "MEAN_ACCUMULATION_OVERFLOW",
      failure_class: "binary64_computability",
      readiness_key: "mean_accumulation_overflow",
      candidate_reason_code: "NRS-PAIRED-T-MEAN-ACCUMULATION-OVERFLOW",
      candidate_check_key: "paired_t_computability_check",
      state: "candidate_unissued",
    },
    {
      ordinal: 6,
      source_spike_error: "CENTERING_OVERFLOW",
      failure_class: "binary64_computability",
      readiness_key: "centering_overflow",
      candidate_reason_code: "NRS-PAIRED-T-CENTERING-OVERFLOW",
      candidate_check_key: "paired_t_computability_check",
      state: "candidate_unissued",
    },
    {
      ordinal: 7,
      source_spike_error: "SQUARED_DEVIATION_OVERFLOW",
      failure_class: "binary64_computability",
      readiness_key: "squared_deviation_overflow",
      candidate_reason_code: "NRS-PAIRED-T-SQUARED-DEVIATION-OVERFLOW",
      candidate_check_key: "paired_t_computability_check",
      state: "candidate_unissued",
    },
    {
      ordinal: 8,
      source_spike_error: "VARIANCE_ACCUMULATION_OVERFLOW",
      failure_class: "binary64_computability",
      readiness_key: "variance_accumulation_overflow",
      candidate_reason_code: "NRS-PAIRED-T-VARIANCE-ACCUMULATION-OVERFLOW",
      candidate_check_key: "paired_t_computability_check",
      state: "candidate_unissued",
    },
    {
      ordinal: 9,
      source_spike_error: "VARIANCE_UNDERFLOW",
      failure_class: "binary64_computability",
      readiness_key: "variance_underflow",
      candidate_reason_code: "NRS-PAIRED-T-VARIANCE-UNDERFLOW",
      candidate_check_key: "paired_t_computability_check",
      state: "candidate_unissued",
    },
    {
      ordinal: 10,
      source_spike_error: "STANDARD_ERROR_SQUARED_UNDERFLOW",
      failure_class: "binary64_computability",
      readiness_key: "standard_error_squared_underflow",
      candidate_reason_code: "NRS-PAIRED-T-STANDARD-ERROR-SQUARED-UNDERFLOW",
      candidate_check_key: "paired_t_computability_check",
      state: "candidate_unissued",
    },
    {
      ordinal: 11,
      source_spike_error: "NON_FINITE_INTERMEDIATE",
      failure_class: "binary64_computability",
      readiness_key: "non_finite_later_intermediate",
      candidate_reason_code: "NRS-PAIRED-T-NON-FINITE-INTERMEDIATE",
      candidate_check_key: "paired_t_computability_check",
      state: "candidate_unissued",
    },
  ],
  delegated_classifications: [
    {
      source_classification: "non_finite_candidate_intermediate",
      delegates_to: "NON_FINITE_INTERMEDIATE",
    },
    {
      source_classification: "runtime_graph_refusal",
      delegates_to: "graphClassification",
    },
  ],
  internal_only_classifications: [
    {
      source_classification: "invalid_candidate_input",
      disposition: "pre_check_input_validation_not_a_public_check_reason",
    },
    {
      source_classification: "candidate_constant_table_unavailable",
      disposition: "candidate_configuration_failure_not_a_record_reason",
    },
    {
      source_classification: "proof_graph_reproduction_mismatch",
      disposition: "implementation_invariant_failure_not_a_record_reason",
    },
    {
      source_classification: "refuse_negative_zero",
      disposition: "candidate_output_invariant_failure_not_a_record_reason",
    },
    {
      source_classification: "refuse_invalid_probability",
      disposition: "candidate_output_invariant_failure_not_a_record_reason",
    },
  ],
  deferred_reason_code_decisions: [
    {
      decision_key: "supported_degrees_of_freedom_range",
      source_classification: "outside_evidence_evaluation_range",
      candidate_reason_code: null,
      blocked_by: "final_supported_degrees_of_freedom_maximum",
    },
    {
      decision_key: "positive_series_iteration_cap",
      source_classification: "positive_series_iteration_cap_reached",
      candidate_reason_code: null,
      blocked_by: "iteration_cap_supported_resource_bound",
    },
    {
      decision_key: "truth_error_proof_precondition",
      source_classification: "truth_error_proof_precondition_failed",
      candidate_reason_code: null,
      blocked_by: "supported_platform_and_runtime_predicate_selection",
    },
    {
      decision_key: "truth_error_bound_formation",
      source_classification: "truth_error_bound_not_finite",
      candidate_reason_code: null,
      blocked_by: "input_specific_bound_runtime_selection",
    },
    {
      decision_key: "projection_margin",
      source_classification: "projection_margin_not_established",
      candidate_reason_code: null,
      blocked_by: "input_specific_bound_and_projection_policy_selection",
    },
    {
      decision_key: "positive_subnormal_p_value",
      source_classification: "refuse_positive_subnormal",
      candidate_reason_code: null,
      blocked_by: "subnormal_projection_policy_selection",
    },
    {
      decision_key: "positive_p_value_not_representable",
      source_classification: "refuse_positive_tail_not_representable",
      candidate_reason_code: null,
      blocked_by: "target_format_projection_policy_selection",
    },
    {
      decision_key: "confidence_interval_endpoint_collapse",
      source_classification: "confidence_interval_endpoint_collapse",
      candidate_reason_code: null,
      blocked_by: "confidence_interval_endpoint_truth_ledger",
    },
    {
      decision_key: "supported_platform_predicate",
      source_classification: "unsupported_platform",
      candidate_reason_code: null,
      blocked_by: "independent_primary_source_platform_review",
    },
    {
      decision_key: "subnormal_intermediate_first_failure",
      source_classification: "subnormal_intermediate_outside_supported_scope",
      candidate_reason_code: null,
      blocked_by: "subnormal_intermediate_first_failure_order_and_activation",
    },
  ],
  prohibited_claims: [
    "issued_reason_codes",
    "final_reason_code_freeze",
    "selected_supported_domain",
    "selected_supported_platform",
    "runtime_support",
    "authoritative_public_check_or_bundle",
  ],
} as const;

function isRecord(value: unknown): value is Record<PropertyKey, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function canonicalizeJson(value: unknown, ancestors = new Set<object>()): unknown {
  if (
    value === undefined ||
    typeof value === "bigint" ||
    typeof value === "function" ||
    typeof value === "symbol" ||
    (typeof value === "number" && !Number.isFinite(value))
  ) {
    throw new TypeError("runtime-input reason-code candidate contains non-JSON data");
  }
  if (typeof value !== "object" || value === null) return value;
  if (ancestors.has(value)) {
    throw new TypeError("runtime-input reason-code candidate contains a cycle");
  }
  const nextAncestors = new Set(ancestors).add(value);
  if (Array.isArray(value)) {
    return value.map((entry) => canonicalizeJson(entry, nextAncestors));
  }
  const prototype = Object.getPrototypeOf(value) as object | null;
  if (prototype !== Object.prototype && prototype !== null) {
    throw new TypeError("runtime-input reason-code candidate contains a non-JSON object");
  }
  return Object.fromEntries(
    Object.entries(value)
      .sort(([first], [second]) => (first < second ? -1 : first > second ? 1 : 0))
      .map(([key, entry]) => [key, canonicalizeJson(entry, nextAncestors)]),
  );
}

/** Parse the only candidate runtime input shape without invoking accessors. */
export function parsePairedTCandidateEvaluationInput(
  input: unknown,
): PairedTCandidateEvaluationInput | undefined {
  if (!isRecord(input)) return undefined;
  try {
    const prototype = Object.getPrototypeOf(input) as object | null;
    if (prototype !== Object.prototype && prototype !== null) return undefined;
    const keys = Reflect.ownKeys(input);
    if (
      keys.length !== 2 ||
      !keys.every((key): key is string => typeof key === "string") ||
      !keys.includes("degreesOfFreedom") ||
      !keys.includes("testStatistic")
    ) {
      return undefined;
    }
    const descriptors = Object.getOwnPropertyDescriptors(input);
    const degreesOfFreedom = descriptors["degreesOfFreedom"];
    const testStatistic = descriptors["testStatistic"];
    if (
      degreesOfFreedom === undefined ||
      testStatistic === undefined ||
      !("value" in degreesOfFreedom) ||
      !("value" in testStatistic) ||
      !degreesOfFreedom.enumerable ||
      !testStatistic.enumerable ||
      typeof degreesOfFreedom.value !== "number" ||
      typeof testStatistic.value !== "number"
    ) {
      return undefined;
    }
    return {
      degreesOfFreedom: degreesOfFreedom.value,
      testStatistic: testStatistic.value,
    };
  } catch {
    return undefined;
  }
}

/** Validate the exact non-authoritative input/reason-code checkpoint. */
export function validatePairedTRuntimeInputReasonCodeCandidate(candidate: unknown): string[] {
  try {
    const actual = JSON.stringify(canonicalizeJson(candidate));
    const expected = JSON.stringify(canonicalizeJson(EXPECTED_CHECKPOINT));
    return actual === expected
      ? []
      : ["runtime-input reason-code candidate differs from the closed non-runtime checkpoint"];
  } catch {
    return ["runtime-input reason-code candidate is not a structurally valid JSON object"];
  }
}
