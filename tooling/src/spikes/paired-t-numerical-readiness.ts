/** Fail-closed checks for the non-authoritative R2-D5 readiness checkpoint. */

export interface PairedTNumericalReadinessCandidate {
  status: "non_authoritative_candidate";
  issuance: "unissued";
  review_issue: "https://github.com/licklider-ai/nomue-protocol/issues/25";
  candidate_development_disposition: "approved";
  final_r2_d5_disposition: "pending_public_review_and_evidence_closure";
  numerical_contract_frozen: false;
  supported_domain: null;
  comparison_tolerances: null;
  support_domain_predicate_candidate: {
    closure: "incomplete";
    artifact: "governance/drafts/release-2-candidate/numerical/support-domain-candidate.json";
    boundary_corpus: "governance/drafts/release-2-candidate/numerical/support-domain-boundary-cases.json";
    validator: "tooling/src/spikes/paired-t-support-domain-candidate.ts";
    execution_surface: "reference/spikes/paired-t.ts";
    runtime_support_enabled: false;
    final_reason_codes_frozen: false;
  };
  candidate_supported_scope_resource_bounds: {
    closure: "reviewed_group_1_candidate_selection";
    artifact: "governance/drafts/release-2-candidate/numerical/candidate-supported-scope-resource-bounds-candidate.json";
    corpus: "governance/drafts/release-2-candidate/numerical/candidate-supported-scope-resource-corpus.json";
    validator: "tooling/src/spikes/paired-t-candidate-supported-scope-resource-bounds.ts";
    selected_pair_count_minimum: 2;
    selected_pair_count_maximum: 201;
    selected_degrees_of_freedom_minimum: 1;
    selected_degrees_of_freedom_maximum: 200;
    candidate_tail_table_content_hash: "sha256:ba1f992199e9e153956589d62dcf5a6509575100bb7c923c170bfa45fdd76c08";
    candidate_fixed_95_table_content_hash: "sha256:24ccc86d7a49b9e1ef1e3fc9b038a5b8d338b8b5ca4a02492d8900d7e7dea3c0";
    selected_g4_trace_node_maximum: 1008;
    selected_tail_trace_node_maximum: 100000;
    selected_tail_iteration_cap_maximum: 8064;
    selected_ci_specific_trace_node_maximum: 3;
    selected_combined_primitive_trace_node_maximum: 101011;
    selection_made_by_this_increment: true;
    independent_review: "complete";
    group_1_complete: true;
    reviewed_candidate_head: "000705ccc3b29d3ef449c5c050e7dba4723a3cab";
    reviewed_candidate_tree: "66446cb02e01adc23d55c45ee97c89b83179a8bb";
    review_result: "review-inputs/r2-d5-candidate-supported-scope-resource-bounds/REVIEW-RESULT.md";
    review_result_blob: "18d3b6e42e3ce4eaf38a4583e89ab6b9f8405910";
    review_preservation_merge: "8aac3c192b972d679308c230efc0cb3b4eff41cf";
    supported_domain_claimed: false;
    runtime_support_enabled: false;
  };
  numerical_contract_decision_candidate: {
    closure: "incomplete";
    artifact: "governance/drafts/release-2-candidate/numerical/numerical-contract-candidate.json";
    validator: "tooling/src/spikes/paired-t-numerical-contract-candidate.ts";
    result_comparison: "exact_binary64_bit_identity_candidate";
    probability_projection: "normal_only_candidate_not_runtime";
    degrees_of_freedom_max_evaluation_target: 200;
    supported_degrees_of_freedom_max: null;
    runtime_support_enabled: false;
  };
  runtime_series_evaluation_candidate: {
    closure: "incomplete";
    artifact: "governance/drafts/release-2-candidate/numerical/runtime-series-candidate.json";
    execution_surface: "tooling/src/spikes/paired-t-runtime-series-candidate.ts";
    evidence_generator: "tooling/r2-paired-t-runtime-series/generate_evidence.py";
    evidence_validator: "tooling/src/spikes/validate-paired-t-runtime-series-evidence.ts";
    degrees_of_freedom_max_evaluation_target: 200;
    supported_degrees_of_freedom_max: null;
    runtime_constant_table_selected: false;
    truth_error_bound_complete: false;
    runtime_support_enabled: false;
  };
  runtime_inverse_beta_table_evidence_candidate: {
    closure: "reviewed_candidate_evidence";
    artifact: "governance/drafts/release-2-candidate/numerical/runtime-inverse-beta-table-candidate.json";
    evidence_generator: "tooling/r2-paired-t-runtime-series/generate_inverse_beta_table_evidence.py";
    evidence_validator: "tooling/src/spikes/validate-paired-t-runtime-inverse-beta-table-evidence.ts";
    review_disposition: "governance/drafts/release-2-candidate/reviews/d5-runtime-inverse-beta-table-evidence-adversarial-review-disposition.md";
    reviewed_table_content_hash: "sha256:ba1f992199e9e153956589d62dcf5a6509575100bb7c923c170bfa45fdd76c08";
    degrees_of_freedom_minimum: 1;
    degrees_of_freedom_max_evaluation_target: 200;
    entry_count: 200;
    contiguous_evidence_coverage_claimed: true;
    runtime_table_selected: false;
    final_content_hash: null;
    supported_degrees_of_freedom_max: null;
    runtime_support_enabled: false;
  };
  runtime_table_integration_candidate: {
    closure: "reviewed_candidate_integration";
    artifact: "governance/drafts/release-2-candidate/numerical/runtime-table-integration-candidate.json";
    execution_surface: "tooling/src/spikes/paired-t-runtime-table-integration-candidate.ts";
    candidate_table: "tooling/r2-paired-t-runtime-series/runtime-inverse-beta-table.candidate.json";
    review_disposition: "governance/drafts/release-2-candidate/reviews/d5-runtime-table-integration-adversarial-review-disposition.md";
    reviewed_evidence_table_content_hash: "sha256:ba1f992199e9e153956589d62dcf5a6509575100bb7c923c170bfa45fdd76c08";
    degrees_of_freedom_minimum: 1;
    degrees_of_freedom_max_evaluation_target: 200;
    entry_count: 200;
    candidate_table_connected: true;
    runtime_table_selected: false;
    final_content_hash: null;
    supported_degrees_of_freedom_max: null;
    truth_error_bound_complete: false;
    runtime_support_enabled: false;
  };
  truth_boundary_evidence_candidate: {
    closure: "incomplete";
    artifact: "governance/drafts/release-2-candidate/numerical/truth-boundary-candidate.json";
    boundary_manifest: "tooling/r2-paired-t-runtime-series/truth-boundary-cases.json";
    evidence_generator: "tooling/r2-paired-t-runtime-series/generate_truth_boundary_evidence.py";
    evidence_validator: "tooling/src/spikes/validate-paired-t-truth-boundary-evidence.ts";
    pointwise_truth_error_certified: true;
    global_truth_error_bound_ulp: null;
    projection_margin_runtime_activated: false;
    supported_degrees_of_freedom_max: null;
    runtime_support_enabled: false;
  };
  truth_error_support_closure_candidate: {
    closure: "reviewed_candidate_proof";
    artifact: "governance/drafts/release-2-candidate/numerical/truth-error-support-closure-candidate.json";
    execution_surface: "tooling/src/spikes/paired-t-truth-error-support-candidate.ts";
    evidence_manifest: "tooling/r2-paired-t-runtime-series/cases.json";
    review_disposition: "governance/drafts/release-2-candidate/reviews/d5-truth-error-support-closure-adversarial-review-disposition.md";
    candidate_bound_form: "input_specific_normal_binary64_roundoff_plus_positive_series_remainder";
    candidate_bound_arithmetic: "exact_rational_with_exact_integer_ulp_ceiling";
    certified_high_error_witness_case_id: "df197-high-error-scout-witness";
    certified_high_error_witness_ulp: 374;
    candidate_high_error_witness_bound_ulp: 2978;
    global_truth_error_bound_ulp: null;
    input_specific_bound_selected_for_runtime: false;
    supported_degrees_of_freedom_max: null;
    supported_domain_claimed: false;
    runtime_support_enabled: false;
  };
  tail_numerical_selection_candidate: {
    closure: "reviewed_input_specific_selection";
    artifact: "governance/drafts/release-2-candidate/numerical/tail-numerical-selection-candidate.json";
    validator: "tooling/src/spikes/paired-t-tail-numerical-selection-candidate.ts";
    review_protocol: "governance/drafts/release-2-candidate/reviews/d5-tail-numerical-selection-adversarial-review-protocol.md";
    selected_bound_form: "input_specific_normal_binary64_roundoff_plus_positive_series_remainder";
    input_specific_bound_selected_for_tail_numerical_contract: true;
    global_constant_bound_required_for_tail_numerical_closure: false;
    global_constant_truth_error_bound_selected: false;
    projection_margin_rule: "cells_to_nearest_policy_class_transition_strictly_greater_than_input_specific_bound";
    projection_margin_runtime_activated: false;
    independent_selection_review_complete: true;
    m2_closed: true;
    supported_degrees_of_freedom_max: null;
    supported_platform_matrix: "pending";
    supported_execution_predicate_selected: false;
    supported_domain_claimed: false;
    runtime_support_enabled: false;
  };
  runtime_input_reason_code_candidate: {
    closure: "reviewed_candidate_input_contract_and_partial_inventory";
    artifact: "governance/drafts/release-2-candidate/numerical/runtime-input-reason-code-candidate.json";
    validator: "tooling/src/spikes/paired-t-runtime-input-reason-code-candidate.ts";
    review_disposition: "governance/drafts/release-2-candidate/reviews/d5-runtime-input-reason-code-adversarial-review-disposition.md";
    input_contract: "exact_own_data_keys_candidate";
    selected_operation_stage_reason_code_candidate_count: 11;
    deferred_reason_code_decision_count: 10;
    final_reason_codes_frozen: false;
    runtime_support_enabled: false;
  };
  g4_actual_execution_trace_candidate: {
    closure: "reviewed_g4_actual_execution_trace_candidate";
    artifact: "governance/drafts/release-2-candidate/numerical/g4-execution-trace-candidate.json";
    execution_surface: "tooling/src/spikes/paired-t-g4-execution-trace-candidate.ts";
    review_disposition: "governance/drafts/release-2-candidate/reviews/d5-g4-execution-trace-adversarial-review-disposition.md";
    trace_format: "paired-t-g4-actual-execution-trace-v1";
    maximum_pairs_evaluation_candidate: 201;
    maximum_trace_nodes_evaluation_candidate: 2048;
    maximum_values_are_supported_resource_bounds: false;
    existing_reference_graph_unchanged: true;
    exact_primitive_verifier_reused: true;
    same_trace_result_values: true;
    independent_adversarial_review_complete: true;
    mathematical_truth_error_artifact: "governance/drafts/release-2-candidate/numerical/g4-truth-error-candidate.json";
    mathematical_truth_error_review_disposition: "governance/drafts/release-2-candidate/reviews/d5-g4-truth-error-adversarial-review-disposition.md";
    mathematical_truth_error_bound_complete: true;
    tail_trace_composition_artifact: "governance/drafts/release-2-candidate/numerical/g4-tail-trace-composition-candidate.json";
    tail_trace_composition_review_disposition: "governance/drafts/release-2-candidate/reviews/d5-g4-tail-trace-composition-adversarial-review-disposition.md";
    tail_trace_composition_complete: true;
    confidence_interval_trace_composition_artifact: "governance/drafts/release-2-candidate/numerical/ci-execution-trace-candidate.json";
    confidence_interval_trace_composition_review_result: "review-inputs/r2-d5-ci-execution-trace-candidate/REVIEW-RESULT.md";
    confidence_interval_trace_composition_complete: true;
    confidence_interval_endpoint_truth_artifact: "governance/drafts/release-2-candidate/numerical/ci-endpoint-truth-error-candidate.json";
    confidence_interval_endpoint_truth_review_result: "review-inputs/r2-d5-ci-endpoint-truth-error-candidate/REVIEW-RESULT.md";
    confidence_interval_endpoint_truth_complete: true;
    m3_closed: true;
    supported_domain_claimed: false;
    runtime_support_enabled: false;
  };
  confidence_interval_numerical_closure_candidate: {
    closure: "reviewed_m3_confidence_interval_numerical_closure";
    fixed_95_evidence_review_sync_artifact: "governance/drafts/release-2-candidate/numerical/fixed-95-critical-value-evidence-review-sync-candidate.json";
    fixed_95_evidence_review_result: "review-inputs/r2-d5-fixed-95-evidence-review-sync/REVIEW-RESULT.md";
    fixed_95_table_selection_artifact: "governance/drafts/release-2-candidate/numerical/fixed-95-critical-value-table-selected-candidate.json";
    fixed_95_table_selection_candidate_key: "paired-t-d5-fixed-95-critical-value-table-selected-candidate-1";
    fixed_95_table_selection_review_result: "review-inputs/r2-d5-fixed-95-table-selection/REVIEW-RESULT.md";
    confidence_interval_execution_trace_artifact: "governance/drafts/release-2-candidate/numerical/ci-execution-trace-candidate.json";
    confidence_interval_execution_trace_candidate_key: "paired-t-d5-ci-actual-execution-trace-candidate-1";
    confidence_interval_execution_trace_review_result: "review-inputs/r2-d5-ci-execution-trace-candidate/REVIEW-RESULT.md";
    confidence_interval_endpoint_truth_artifact: "governance/drafts/release-2-candidate/numerical/ci-endpoint-truth-error-candidate.json";
    selected_endpoint_truth_candidate_key: "paired-t-d5-ci-endpoint-mathematical-truth-error-candidate-1";
    selected_endpoint_truth_candidate_commit: "ba3d81e62f8f77884628c59c4b27d1c5ff3cb340";
    confidence_interval_endpoint_truth_review_result: "review-inputs/r2-d5-ci-endpoint-truth-error-candidate/REVIEW-RESULT.md";
    not_selected_alternative_pr: "https://github.com/licklider-ai/nomue-protocol/pull/110";
    not_selected_alternative_candidate_key: "paired-t-d5-ci-endpoint-mathematical-truth-candidate-1";
    not_selected_alternative_candidate_commit: "bbfcb104889b7ce3ed219dc30d49bd7ca1723f80";
    not_selected_alternative_merged: false;
    selected_table_content_hash: "sha256:24ccc86d7a49b9e1ef1e3fc9b038a5b8d338b8b5ca4a02492d8900d7e7dea3c0";
    finite_corpus_maximum_is_a_bound: false;
    global_confidence_interval_error_constant_selected: false;
    m3_closed: true;
    supported_degrees_of_freedom_max: null;
    supported_platform_matrix: "pending";
    supported_execution_predicate_selected: false;
    supported_domain_claimed: false;
    runtime_support_enabled: false;
    final_reason_codes_frozen: false;
    public_check_or_bundle_issued: false;
  };
  supported_execution_predicate_candidate: {
    closure: "reviewed_tail_only_implementation_candidate";
    artifact: "governance/drafts/release-2-candidate/numerical/supported-execution-predicate-candidate.json";
    execution_surface: "tooling/src/spikes/paired-t-supported-execution-candidate.ts";
    primary_source_disposition: "governance/drafts/release-2-candidate/reviews/d5-supported-platform-primary-source-research-disposition.md";
    review_disposition: "governance/drafts/release-2-candidate/reviews/d5-supported-execution-predicate-adversarial-review-disposition.md";
    section_h_review_supplement: "review-inputs/r2-d5-supported-execution-predicate/REVIEW-SUPPLEMENT-H.md";
    trace_format: "paired-t-supported-execution-trace-v1";
    maximum_trace_nodes_candidate: 100000;
    exact_primitive_verifier_implemented: true;
    same_trace_value_and_proof: true;
    exact_runtime_allowlist_selected: false;
    controlled_process_profile_enforced: false;
    cross_platform_admission_evidence_complete: false;
    independent_adversarial_review_complete: true;
    section_h_cross_runner_review_complete: true;
    supported_execution_predicate_selected: false;
    runtime_support_enabled: false;
  };
  operation_graph: {
    candidate_key: "g4-pairwise-two-pass";
    selection_state: "selected_for_candidate_testing";
    difference_target: "exact_difference_of_parsed_binary64_operands";
    binary64_difference_stage: "one_subtraction_per_canonical_pair";
    mean_reduction: "fixed_recursive_floor_half_split_tree";
    variance_path: "two_pass_center_square_fixed_recursive_floor_half_split_tree_divide_n_minus_one";
    standard_error_path: "sample_variance_divide_n_then_native_sqrt";
    test_statistic_path: "mean_divide_standard_error";
    fma_allowed: false;
    implicit_extended_precision_allowed: false;
    native_sqrt_cross_runtime_bit_identity_claimed: false;
  };
  refusal_classes: {
    contract_computability: string[];
    binary64_computability: string[];
    scope: string[];
    recompute_mismatch: string[];
  };
  p_value_enclosure_evidence: {
    closure: "reviewed_complete";
    primary_path: "arb_regularized_incomplete_beta_exact_rational_input";
    secondary_path: "rigorous_density_quadrature_with_analytic_tail_bound";
    certificate_validator: string;
    known_closure_items: string[];
  };
  fixed_95_critical_value_evidence: {
    closure: "reviewed_complete";
    primary_path: "arb_forward_probability_midpoint_bracketing";
    secondary_path: "rigorous_density_quadrature_or_executed_low_df_closed_form";
    certificate_validator: string;
    known_closure_items: string[];
  };
  required_boundary_cases: string[];
  prohibited_claims_before_final_r2_d5: string[];
}

const REQUIRED_P_CLOSURE = [
  "remove_any_unconditional_secondary_overlap_success_path",
  "emit_exact_enclosure_endpoints_and_rounding_cells",
  "execute_and_assert_df1_and_df2_closed_form_paths",
  "make_missing_oracle_dependencies_fail_the_evidence_run",
  "add_df1_max_finite_t_and_df2_max_finite_t_cases",
  "bind_generator_environment_and_output_hashes",
] as const;

const REQUIRED_CRITICAL_CLOSURE = [
  "emit_exact_midpoint_and_tail_enclosure_endpoints",
  "execute_and_assert_df1_and_df2_closed_form_paths",
  "bind_each_table_cell_to_generator_environment_and_output_hashes",
  "bind_ordered_research_seed_to_a_table_level_content_hash",
  "keep_research_seed_coverage_separate_from_runtime_support",
  "separate_zero_reproduction_error_from_half_ulp_truth_error",
] as const;

const REQUIRED_BOUNDARIES = [
  "exact_zero_difference_variance",
  "difference_variance_erased_by_rounding",
  "finite_input_difference_overflow",
  "mean_accumulation_overflow",
  "centering_overflow",
  "squared_deviation_overflow",
  "variance_accumulation_overflow",
  "variance_underflow",
  "standard_error_squared_underflow",
  "p_rounds_to_one",
  "small_positive_normal_p",
  "small_positive_subnormal_p",
  "positive_p_not_representable_in_binary64",
  "df1_max_finite_t",
  "df2_max_finite_t",
  "confidence_interval_endpoint_collapse",
] as const;

const REQUIRED_CONTRACT_COMPUTABILITY = [
  "fewer_than_two_pairs",
  "exact_paired_differences_all_equal",
] as const;

const REQUIRED_BINARY64_COMPUTABILITY = [
  "difference_overflow",
  "difference_variance_erased_by_rounding",
  "mean_accumulation_overflow",
  "centering_overflow",
  "squared_deviation_overflow",
  "variance_accumulation_overflow",
  "variance_underflow",
  "standard_error_squared_underflow",
  "non_finite_later_intermediate",
  "confidence_interval_endpoint_collapse",
] as const;

const REQUIRED_PROHIBITIONS = [
  "supported_df_max",
  "supported_value_or_test_statistic_bound",
  "quantity_comparison_tolerance",
  "cross_runtime_bit_identity_through_native_sqrt",
  "cross_library_agreement_as_oracle",
  "zero_p_for_a_positive_mathematical_tail",
  "global_confidence_interval_error_constant",
  "authoritative_public_check_or_bundle_support",
] as const;

const TOP_LEVEL_KEYS = [
  "status",
  "issuance",
  "review_issue",
  "candidate_development_disposition",
  "final_r2_d5_disposition",
  "numerical_contract_frozen",
  "supported_domain",
  "comparison_tolerances",
  "support_domain_predicate_candidate",
  "candidate_supported_scope_resource_bounds",
  "numerical_contract_decision_candidate",
  "runtime_series_evaluation_candidate",
  "runtime_inverse_beta_table_evidence_candidate",
  "runtime_table_integration_candidate",
  "truth_boundary_evidence_candidate",
  "truth_error_support_closure_candidate",
  "tail_numerical_selection_candidate",
  "runtime_input_reason_code_candidate",
  "g4_actual_execution_trace_candidate",
  "confidence_interval_numerical_closure_candidate",
  "supported_execution_predicate_candidate",
  "operation_graph",
  "refusal_classes",
  "p_value_enclosure_evidence",
  "fixed_95_critical_value_evidence",
  "required_boundary_cases",
  "prohibited_claims_before_final_r2_d5",
] as const;

const OPERATION_GRAPH_KEYS = [
  "candidate_key",
  "selection_state",
  "difference_target",
  "binary64_difference_stage",
  "mean_reduction",
  "variance_path",
  "standard_error_path",
  "test_statistic_path",
  "fma_allowed",
  "implicit_extended_precision_allowed",
  "native_sqrt_cross_runtime_bit_identity_claimed",
] as const;

const SUPPORT_DOMAIN_CANDIDATE_KEYS = [
  "closure",
  "artifact",
  "boundary_corpus",
  "validator",
  "execution_surface",
  "runtime_support_enabled",
  "final_reason_codes_frozen",
] as const;

const CANDIDATE_SUPPORTED_SCOPE_RESOURCE_BOUND_KEYS = [
  "closure",
  "artifact",
  "corpus",
  "validator",
  "selected_pair_count_minimum",
  "selected_pair_count_maximum",
  "selected_degrees_of_freedom_minimum",
  "selected_degrees_of_freedom_maximum",
  "candidate_tail_table_content_hash",
  "candidate_fixed_95_table_content_hash",
  "selected_g4_trace_node_maximum",
  "selected_tail_trace_node_maximum",
  "selected_tail_iteration_cap_maximum",
  "selected_ci_specific_trace_node_maximum",
  "selected_combined_primitive_trace_node_maximum",
  "selection_made_by_this_increment",
  "independent_review",
  "group_1_complete",
  "reviewed_candidate_head",
  "reviewed_candidate_tree",
  "review_result",
  "review_result_blob",
  "review_preservation_merge",
  "supported_domain_claimed",
  "runtime_support_enabled",
] as const;

const NUMERICAL_CONTRACT_CANDIDATE_KEYS = [
  "closure",
  "artifact",
  "validator",
  "result_comparison",
  "probability_projection",
  "degrees_of_freedom_max_evaluation_target",
  "supported_degrees_of_freedom_max",
  "runtime_support_enabled",
] as const;

const RUNTIME_SERIES_CANDIDATE_KEYS = [
  "closure",
  "artifact",
  "execution_surface",
  "evidence_generator",
  "evidence_validator",
  "degrees_of_freedom_max_evaluation_target",
  "supported_degrees_of_freedom_max",
  "runtime_constant_table_selected",
  "truth_error_bound_complete",
  "runtime_support_enabled",
] as const;

const RUNTIME_INVERSE_BETA_TABLE_CANDIDATE_KEYS = [
  "closure",
  "artifact",
  "evidence_generator",
  "evidence_validator",
  "review_disposition",
  "reviewed_table_content_hash",
  "degrees_of_freedom_minimum",
  "degrees_of_freedom_max_evaluation_target",
  "entry_count",
  "contiguous_evidence_coverage_claimed",
  "runtime_table_selected",
  "final_content_hash",
  "supported_degrees_of_freedom_max",
  "runtime_support_enabled",
] as const;

const RUNTIME_TABLE_INTEGRATION_CANDIDATE_KEYS = [
  "closure",
  "artifact",
  "execution_surface",
  "candidate_table",
  "review_disposition",
  "reviewed_evidence_table_content_hash",
  "degrees_of_freedom_minimum",
  "degrees_of_freedom_max_evaluation_target",
  "entry_count",
  "candidate_table_connected",
  "runtime_table_selected",
  "final_content_hash",
  "supported_degrees_of_freedom_max",
  "truth_error_bound_complete",
  "runtime_support_enabled",
] as const;

const TRUTH_BOUNDARY_CANDIDATE_KEYS = [
  "closure",
  "artifact",
  "boundary_manifest",
  "evidence_generator",
  "evidence_validator",
  "pointwise_truth_error_certified",
  "global_truth_error_bound_ulp",
  "projection_margin_runtime_activated",
  "supported_degrees_of_freedom_max",
  "runtime_support_enabled",
] as const;

const TRUTH_ERROR_SUPPORT_CLOSURE_CANDIDATE_KEYS = [
  "closure",
  "artifact",
  "execution_surface",
  "evidence_manifest",
  "review_disposition",
  "candidate_bound_form",
  "candidate_bound_arithmetic",
  "certified_high_error_witness_case_id",
  "certified_high_error_witness_ulp",
  "candidate_high_error_witness_bound_ulp",
  "global_truth_error_bound_ulp",
  "input_specific_bound_selected_for_runtime",
  "supported_degrees_of_freedom_max",
  "supported_domain_claimed",
  "runtime_support_enabled",
] as const;

const TAIL_NUMERICAL_SELECTION_CANDIDATE_KEYS = [
  "closure",
  "artifact",
  "validator",
  "review_protocol",
  "selected_bound_form",
  "input_specific_bound_selected_for_tail_numerical_contract",
  "global_constant_bound_required_for_tail_numerical_closure",
  "global_constant_truth_error_bound_selected",
  "projection_margin_rule",
  "projection_margin_runtime_activated",
  "independent_selection_review_complete",
  "m2_closed",
  "supported_degrees_of_freedom_max",
  "supported_platform_matrix",
  "supported_execution_predicate_selected",
  "supported_domain_claimed",
  "runtime_support_enabled",
] as const;

const RUNTIME_INPUT_REASON_CODE_CANDIDATE_KEYS = [
  "closure",
  "artifact",
  "validator",
  "review_disposition",
  "input_contract",
  "selected_operation_stage_reason_code_candidate_count",
  "deferred_reason_code_decision_count",
  "final_reason_codes_frozen",
  "runtime_support_enabled",
] as const;

const G4_ACTUAL_EXECUTION_TRACE_CANDIDATE_KEYS = [
  "closure",
  "artifact",
  "execution_surface",
  "review_disposition",
  "trace_format",
  "maximum_pairs_evaluation_candidate",
  "maximum_trace_nodes_evaluation_candidate",
  "maximum_values_are_supported_resource_bounds",
  "existing_reference_graph_unchanged",
  "exact_primitive_verifier_reused",
  "same_trace_result_values",
  "independent_adversarial_review_complete",
  "mathematical_truth_error_artifact",
  "mathematical_truth_error_review_disposition",
  "mathematical_truth_error_bound_complete",
  "tail_trace_composition_artifact",
  "tail_trace_composition_review_disposition",
  "tail_trace_composition_complete",
  "confidence_interval_trace_composition_artifact",
  "confidence_interval_trace_composition_review_result",
  "confidence_interval_trace_composition_complete",
  "confidence_interval_endpoint_truth_artifact",
  "confidence_interval_endpoint_truth_review_result",
  "confidence_interval_endpoint_truth_complete",
  "m3_closed",
  "supported_domain_claimed",
  "runtime_support_enabled",
] as const;

const CONFIDENCE_INTERVAL_NUMERICAL_CLOSURE_CANDIDATE_KEYS = [
  "closure",
  "fixed_95_evidence_review_sync_artifact",
  "fixed_95_evidence_review_result",
  "fixed_95_table_selection_artifact",
  "fixed_95_table_selection_candidate_key",
  "fixed_95_table_selection_review_result",
  "confidence_interval_execution_trace_artifact",
  "confidence_interval_execution_trace_candidate_key",
  "confidence_interval_execution_trace_review_result",
  "confidence_interval_endpoint_truth_artifact",
  "selected_endpoint_truth_candidate_key",
  "selected_endpoint_truth_candidate_commit",
  "confidence_interval_endpoint_truth_review_result",
  "not_selected_alternative_pr",
  "not_selected_alternative_candidate_key",
  "not_selected_alternative_candidate_commit",
  "not_selected_alternative_merged",
  "selected_table_content_hash",
  "finite_corpus_maximum_is_a_bound",
  "global_confidence_interval_error_constant_selected",
  "m3_closed",
  "supported_degrees_of_freedom_max",
  "supported_platform_matrix",
  "supported_execution_predicate_selected",
  "supported_domain_claimed",
  "runtime_support_enabled",
  "final_reason_codes_frozen",
  "public_check_or_bundle_issued",
] as const;

const SUPPORTED_EXECUTION_PREDICATE_CANDIDATE_KEYS = [
  "closure",
  "artifact",
  "execution_surface",
  "primary_source_disposition",
  "review_disposition",
  "section_h_review_supplement",
  "trace_format",
  "maximum_trace_nodes_candidate",
  "exact_primitive_verifier_implemented",
  "same_trace_value_and_proof",
  "exact_runtime_allowlist_selected",
  "controlled_process_profile_enforced",
  "cross_platform_admission_evidence_complete",
  "independent_adversarial_review_complete",
  "section_h_cross_runner_review_complete",
  "supported_execution_predicate_selected",
  "runtime_support_enabled",
] as const;

const REFUSAL_CLASS_KEYS = [
  "contract_computability",
  "binary64_computability",
  "scope",
  "recompute_mismatch",
] as const;

const EVIDENCE_KEYS = [
  "closure",
  "primary_path",
  "secondary_path",
  "certificate_validator",
  "known_closure_items",
] as const;

function requireExactKeys(
  label: string,
  actual: object,
  expected: readonly string[],
  errors: string[],
): void {
  const actualKeys = Object.keys(actual).sort();
  const expectedKeys = [...expected].sort();
  if (
    actualKeys.length !== expectedKeys.length ||
    actualKeys.some((value, index) => value !== expectedKeys[index])
  ) {
    errors.push(`${label}: keys are incomplete or contain an undeclared item`);
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasStrictJsonShape(value: unknown, ancestors = new Set<object>()): boolean {
  if (
    value === undefined ||
    typeof value === "bigint" ||
    typeof value === "function" ||
    typeof value === "symbol" ||
    (typeof value === "number" && !Number.isFinite(value))
  ) {
    return false;
  }
  if (typeof value !== "object" || value === null) return true;
  if (ancestors.has(value)) return false;
  const nextAncestors = new Set(ancestors).add(value);
  const keys = Reflect.ownKeys(value);
  if (keys.some((key) => typeof key === "symbol")) return false;
  const descriptors = Object.getOwnPropertyDescriptors(value);
  if (Array.isArray(value)) {
    const lengthDescriptor = Object.getOwnPropertyDescriptor(value, "length");
    if (
      lengthDescriptor === undefined ||
      !("value" in lengthDescriptor) ||
      typeof lengthDescriptor.value !== "number" ||
      !Number.isSafeInteger(lengthDescriptor.value) ||
      lengthDescriptor.value < 0 ||
      keys.length !== lengthDescriptor.value + 1
    ) {
      return false;
    }
    for (let index = 0; index < lengthDescriptor.value; index += 1) {
      const descriptor = descriptors[String(index)];
      if (
        descriptor === undefined ||
        !descriptor.enumerable ||
        !("value" in descriptor) ||
        !hasStrictJsonShape(descriptor.value, nextAncestors)
      ) {
        return false;
      }
    }
    return true;
  }
  if (Object.getPrototypeOf(value) !== Object.prototype) return false;
  for (const key of keys) {
    if (typeof key !== "string") return false;
    const descriptor = descriptors[key];
    if (
      descriptor === undefined ||
      !descriptor.enumerable ||
      !("value" in descriptor) ||
      !hasStrictJsonShape(descriptor.value, nextAncestors)
    ) {
      return false;
    }
  }
  return true;
}

function requireExactSet(
  label: string,
  actual: readonly string[],
  expected: readonly string[],
  errors: string[],
): void {
  if (
    actual.length !== expected.length ||
    [...actual].sort().join("\n") !== [...expected].sort().join("\n")
  ) {
    errors.push(`${label}: candidate set is incomplete or contains an undeclared item`);
  }
}

function validatePairedTNumericalReadinessCandidateInternal(
  candidate: PairedTNumericalReadinessCandidate,
): string[] {
  const errors: string[] = [];
  requireExactKeys("numerical readiness", candidate, TOP_LEVEL_KEYS, errors);
  requireExactKeys("operation graph", candidate.operation_graph, OPERATION_GRAPH_KEYS, errors);
  requireExactKeys(
    "support-domain predicate candidate",
    candidate.support_domain_predicate_candidate,
    SUPPORT_DOMAIN_CANDIDATE_KEYS,
    errors,
  );
  requireExactKeys(
    "candidate supported-scope/resource bounds",
    candidate.candidate_supported_scope_resource_bounds,
    CANDIDATE_SUPPORTED_SCOPE_RESOURCE_BOUND_KEYS,
    errors,
  );
  requireExactKeys(
    "numerical-contract decision candidate",
    candidate.numerical_contract_decision_candidate,
    NUMERICAL_CONTRACT_CANDIDATE_KEYS,
    errors,
  );
  requireExactKeys(
    "runtime-series evaluation candidate",
    candidate.runtime_series_evaluation_candidate,
    RUNTIME_SERIES_CANDIDATE_KEYS,
    errors,
  );
  requireExactKeys(
    "runtime inverse-beta table evidence candidate",
    candidate.runtime_inverse_beta_table_evidence_candidate,
    RUNTIME_INVERSE_BETA_TABLE_CANDIDATE_KEYS,
    errors,
  );
  requireExactKeys(
    "runtime-table integration candidate",
    candidate.runtime_table_integration_candidate,
    RUNTIME_TABLE_INTEGRATION_CANDIDATE_KEYS,
    errors,
  );
  requireExactKeys(
    "truth-boundary evidence candidate",
    candidate.truth_boundary_evidence_candidate,
    TRUTH_BOUNDARY_CANDIDATE_KEYS,
    errors,
  );
  requireExactKeys(
    "truth-error support closure candidate",
    candidate.truth_error_support_closure_candidate,
    TRUTH_ERROR_SUPPORT_CLOSURE_CANDIDATE_KEYS,
    errors,
  );
  requireExactKeys(
    "tail numerical selection candidate",
    candidate.tail_numerical_selection_candidate,
    TAIL_NUMERICAL_SELECTION_CANDIDATE_KEYS,
    errors,
  );
  requireExactKeys(
    "runtime input/reason-code candidate",
    candidate.runtime_input_reason_code_candidate,
    RUNTIME_INPUT_REASON_CODE_CANDIDATE_KEYS,
    errors,
  );
  requireExactKeys(
    "G4 actual-execution trace candidate",
    candidate.g4_actual_execution_trace_candidate,
    G4_ACTUAL_EXECUTION_TRACE_CANDIDATE_KEYS,
    errors,
  );
  requireExactKeys(
    "confidence-interval numerical closure candidate",
    candidate.confidence_interval_numerical_closure_candidate,
    CONFIDENCE_INTERVAL_NUMERICAL_CLOSURE_CANDIDATE_KEYS,
    errors,
  );
  requireExactKeys(
    "supported-execution predicate candidate",
    candidate.supported_execution_predicate_candidate,
    SUPPORTED_EXECUTION_PREDICATE_CANDIDATE_KEYS,
    errors,
  );
  requireExactKeys("refusal classes", candidate.refusal_classes, REFUSAL_CLASS_KEYS, errors);
  requireExactKeys(
    "p-value evidence readiness",
    candidate.p_value_enclosure_evidence,
    EVIDENCE_KEYS,
    errors,
  );
  requireExactKeys(
    "critical-value evidence readiness",
    candidate.fixed_95_critical_value_evidence,
    EVIDENCE_KEYS,
    errors,
  );
  if (candidate.status !== "non_authoritative_candidate" || candidate.issuance !== "unissued") {
    errors.push("numerical readiness must remain non-authoritative and unissued");
  }
  if (candidate.review_issue !== "https://github.com/licklider-ai/nomue-protocol/issues/25") {
    errors.push("numerical readiness must remain bound to the open Release 2 review");
  }
  if (candidate.candidate_development_disposition !== "approved") {
    errors.push("candidate-development disposition is not recorded");
  }
  if (candidate.final_r2_d5_disposition !== "pending_public_review_and_evidence_closure") {
    errors.push("final R2-D5 disposition must remain pending");
  }
  if (
    candidate.numerical_contract_frozen !== false ||
    candidate.supported_domain !== null ||
    candidate.comparison_tolerances !== null
  ) {
    errors.push("numerical support and tolerances must remain unfrozen");
  }

  const supportCandidate = candidate.support_domain_predicate_candidate;
  if (
    supportCandidate.closure !== "incomplete" ||
    supportCandidate.artifact !==
      "governance/drafts/release-2-candidate/numerical/support-domain-candidate.json" ||
    supportCandidate.boundary_corpus !==
      "governance/drafts/release-2-candidate/numerical/support-domain-boundary-cases.json" ||
    supportCandidate.validator !== "tooling/src/spikes/paired-t-support-domain-candidate.ts" ||
    supportCandidate.execution_surface !== "reference/spikes/paired-t.ts" ||
    supportCandidate.runtime_support_enabled !== false ||
    supportCandidate.final_reason_codes_frozen !== false
  ) {
    errors.push("support-domain predicate candidate must remain incomplete and non-runtime");
  }

  const candidateScopeResource = candidate.candidate_supported_scope_resource_bounds;
  if (
    candidateScopeResource.closure !== "reviewed_group_1_candidate_selection" ||
    candidateScopeResource.artifact !==
      "governance/drafts/release-2-candidate/numerical/candidate-supported-scope-resource-bounds-candidate.json" ||
    candidateScopeResource.corpus !==
      "governance/drafts/release-2-candidate/numerical/candidate-supported-scope-resource-corpus.json" ||
    candidateScopeResource.validator !==
      "tooling/src/spikes/paired-t-candidate-supported-scope-resource-bounds.ts" ||
    candidateScopeResource.selected_pair_count_minimum !== 2 ||
    candidateScopeResource.selected_pair_count_maximum !== 201 ||
    candidateScopeResource.selected_degrees_of_freedom_minimum !== 1 ||
    candidateScopeResource.selected_degrees_of_freedom_maximum !== 200 ||
    candidateScopeResource.candidate_tail_table_content_hash !==
      "sha256:ba1f992199e9e153956589d62dcf5a6509575100bb7c923c170bfa45fdd76c08" ||
    candidateScopeResource.candidate_fixed_95_table_content_hash !==
      "sha256:24ccc86d7a49b9e1ef1e3fc9b038a5b8d338b8b5ca4a02492d8900d7e7dea3c0" ||
    candidateScopeResource.selected_g4_trace_node_maximum !== 1008 ||
    candidateScopeResource.selected_tail_trace_node_maximum !== 100000 ||
    candidateScopeResource.selected_tail_iteration_cap_maximum !== 8064 ||
    candidateScopeResource.selected_ci_specific_trace_node_maximum !== 3 ||
    candidateScopeResource.selected_combined_primitive_trace_node_maximum !== 101011 ||
    candidateScopeResource.selection_made_by_this_increment !== true ||
    candidateScopeResource.independent_review !== "complete" ||
    candidateScopeResource.group_1_complete !== true ||
    candidateScopeResource.reviewed_candidate_head !== "000705ccc3b29d3ef449c5c050e7dba4723a3cab" ||
    candidateScopeResource.reviewed_candidate_tree !== "66446cb02e01adc23d55c45ee97c89b83179a8bb" ||
    candidateScopeResource.review_result !==
      "review-inputs/r2-d5-candidate-supported-scope-resource-bounds/REVIEW-RESULT.md" ||
    candidateScopeResource.review_result_blob !== "18d3b6e42e3ce4eaf38a4583e89ab6b9f8405910" ||
    candidateScopeResource.review_preservation_merge !==
      "8aac3c192b972d679308c230efc0cb3b4eff41cf" ||
    candidateScopeResource.supported_domain_claimed !== false ||
    candidateScopeResource.runtime_support_enabled !== false
  ) {
    errors.push(
      "candidate supported-scope/resource bounds must bind the preserved exact-head review and close only Group 1 without support or runtime promotion",
    );
  }

  const contractCandidate = candidate.numerical_contract_decision_candidate;
  if (
    contractCandidate.closure !== "incomplete" ||
    contractCandidate.artifact !==
      "governance/drafts/release-2-candidate/numerical/numerical-contract-candidate.json" ||
    contractCandidate.validator !== "tooling/src/spikes/paired-t-numerical-contract-candidate.ts" ||
    contractCandidate.result_comparison !== "exact_binary64_bit_identity_candidate" ||
    contractCandidate.probability_projection !== "normal_only_candidate_not_runtime" ||
    contractCandidate.degrees_of_freedom_max_evaluation_target !== 200 ||
    contractCandidate.supported_degrees_of_freedom_max !== null ||
    contractCandidate.runtime_support_enabled !== false
  ) {
    errors.push("numerical-contract decision candidate must remain incomplete and non-runtime");
  }

  const runtimeSeriesCandidate = candidate.runtime_series_evaluation_candidate;
  if (
    runtimeSeriesCandidate.closure !== "incomplete" ||
    runtimeSeriesCandidate.artifact !==
      "governance/drafts/release-2-candidate/numerical/runtime-series-candidate.json" ||
    runtimeSeriesCandidate.execution_surface !==
      "tooling/src/spikes/paired-t-runtime-series-candidate.ts" ||
    runtimeSeriesCandidate.evidence_generator !==
      "tooling/r2-paired-t-runtime-series/generate_evidence.py" ||
    runtimeSeriesCandidate.evidence_validator !==
      "tooling/src/spikes/validate-paired-t-runtime-series-evidence.ts" ||
    runtimeSeriesCandidate.degrees_of_freedom_max_evaluation_target !== 200 ||
    runtimeSeriesCandidate.supported_degrees_of_freedom_max !== null ||
    runtimeSeriesCandidate.runtime_constant_table_selected !== false ||
    runtimeSeriesCandidate.truth_error_bound_complete !== false ||
    runtimeSeriesCandidate.runtime_support_enabled !== false
  ) {
    errors.push("runtime-series evaluation candidate must remain incomplete and non-runtime");
  }

  const inverseBetaTableCandidate = candidate.runtime_inverse_beta_table_evidence_candidate;
  if (
    inverseBetaTableCandidate.closure !== "reviewed_candidate_evidence" ||
    inverseBetaTableCandidate.artifact !==
      "governance/drafts/release-2-candidate/numerical/runtime-inverse-beta-table-candidate.json" ||
    inverseBetaTableCandidate.evidence_generator !==
      "tooling/r2-paired-t-runtime-series/generate_inverse_beta_table_evidence.py" ||
    inverseBetaTableCandidate.evidence_validator !==
      "tooling/src/spikes/validate-paired-t-runtime-inverse-beta-table-evidence.ts" ||
    inverseBetaTableCandidate.review_disposition !==
      "governance/drafts/release-2-candidate/reviews/d5-runtime-inverse-beta-table-evidence-adversarial-review-disposition.md" ||
    inverseBetaTableCandidate.reviewed_table_content_hash !==
      "sha256:ba1f992199e9e153956589d62dcf5a6509575100bb7c923c170bfa45fdd76c08" ||
    inverseBetaTableCandidate.degrees_of_freedom_minimum !== 1 ||
    inverseBetaTableCandidate.degrees_of_freedom_max_evaluation_target !== 200 ||
    inverseBetaTableCandidate.entry_count !== 200 ||
    inverseBetaTableCandidate.contiguous_evidence_coverage_claimed !== true ||
    inverseBetaTableCandidate.runtime_table_selected !== false ||
    inverseBetaTableCandidate.final_content_hash !== null ||
    inverseBetaTableCandidate.supported_degrees_of_freedom_max !== null ||
    inverseBetaTableCandidate.runtime_support_enabled !== false
  ) {
    errors.push(
      "runtime inverse-beta table evidence candidate must remain reviewed evidence and non-runtime",
    );
  }

  const runtimeTableIntegrationCandidate = candidate.runtime_table_integration_candidate;
  if (
    runtimeTableIntegrationCandidate.closure !== "reviewed_candidate_integration" ||
    runtimeTableIntegrationCandidate.artifact !==
      "governance/drafts/release-2-candidate/numerical/runtime-table-integration-candidate.json" ||
    runtimeTableIntegrationCandidate.execution_surface !==
      "tooling/src/spikes/paired-t-runtime-table-integration-candidate.ts" ||
    runtimeTableIntegrationCandidate.candidate_table !==
      "tooling/r2-paired-t-runtime-series/runtime-inverse-beta-table.candidate.json" ||
    runtimeTableIntegrationCandidate.review_disposition !==
      "governance/drafts/release-2-candidate/reviews/d5-runtime-table-integration-adversarial-review-disposition.md" ||
    runtimeTableIntegrationCandidate.reviewed_evidence_table_content_hash !==
      "sha256:ba1f992199e9e153956589d62dcf5a6509575100bb7c923c170bfa45fdd76c08" ||
    runtimeTableIntegrationCandidate.degrees_of_freedom_minimum !== 1 ||
    runtimeTableIntegrationCandidate.degrees_of_freedom_max_evaluation_target !== 200 ||
    runtimeTableIntegrationCandidate.entry_count !== 200 ||
    runtimeTableIntegrationCandidate.candidate_table_connected !== true ||
    runtimeTableIntegrationCandidate.runtime_table_selected !== false ||
    runtimeTableIntegrationCandidate.final_content_hash !== null ||
    runtimeTableIntegrationCandidate.supported_degrees_of_freedom_max !== null ||
    runtimeTableIntegrationCandidate.truth_error_bound_complete !== false ||
    runtimeTableIntegrationCandidate.runtime_support_enabled !== false
  ) {
    errors.push(
      "runtime-table integration candidate must remain reviewed candidate integration and non-runtime",
    );
  }

  const truthBoundaryCandidate = candidate.truth_boundary_evidence_candidate;
  if (
    truthBoundaryCandidate.closure !== "incomplete" ||
    truthBoundaryCandidate.artifact !==
      "governance/drafts/release-2-candidate/numerical/truth-boundary-candidate.json" ||
    truthBoundaryCandidate.boundary_manifest !==
      "tooling/r2-paired-t-runtime-series/truth-boundary-cases.json" ||
    truthBoundaryCandidate.evidence_generator !==
      "tooling/r2-paired-t-runtime-series/generate_truth_boundary_evidence.py" ||
    truthBoundaryCandidate.evidence_validator !==
      "tooling/src/spikes/validate-paired-t-truth-boundary-evidence.ts" ||
    truthBoundaryCandidate.pointwise_truth_error_certified !== true ||
    truthBoundaryCandidate.global_truth_error_bound_ulp !== null ||
    truthBoundaryCandidate.projection_margin_runtime_activated !== false ||
    truthBoundaryCandidate.supported_degrees_of_freedom_max !== null ||
    truthBoundaryCandidate.runtime_support_enabled !== false
  ) {
    errors.push(
      "truth-boundary evidence candidate must remain pointwise, incomplete, and non-runtime",
    );
  }

  const truthErrorSupportCandidate = candidate.truth_error_support_closure_candidate;
  if (
    truthErrorSupportCandidate.closure !== "reviewed_candidate_proof" ||
    truthErrorSupportCandidate.artifact !==
      "governance/drafts/release-2-candidate/numerical/truth-error-support-closure-candidate.json" ||
    truthErrorSupportCandidate.execution_surface !==
      "tooling/src/spikes/paired-t-truth-error-support-candidate.ts" ||
    truthErrorSupportCandidate.evidence_manifest !==
      "tooling/r2-paired-t-runtime-series/cases.json" ||
    truthErrorSupportCandidate.review_disposition !==
      "governance/drafts/release-2-candidate/reviews/d5-truth-error-support-closure-adversarial-review-disposition.md" ||
    truthErrorSupportCandidate.candidate_bound_form !==
      "input_specific_normal_binary64_roundoff_plus_positive_series_remainder" ||
    truthErrorSupportCandidate.candidate_bound_arithmetic !==
      "exact_rational_with_exact_integer_ulp_ceiling" ||
    truthErrorSupportCandidate.certified_high_error_witness_case_id !==
      "df197-high-error-scout-witness" ||
    truthErrorSupportCandidate.certified_high_error_witness_ulp !== 374 ||
    truthErrorSupportCandidate.candidate_high_error_witness_bound_ulp !== 2978 ||
    truthErrorSupportCandidate.global_truth_error_bound_ulp !== null ||
    truthErrorSupportCandidate.input_specific_bound_selected_for_runtime !== false ||
    truthErrorSupportCandidate.supported_degrees_of_freedom_max !== null ||
    truthErrorSupportCandidate.supported_domain_claimed !== false ||
    truthErrorSupportCandidate.runtime_support_enabled !== false
  ) {
    errors.push(
      "truth-error support closure candidate must remain reviewed candidate proof, unselected, and non-runtime",
    );
  }

  const tailNumericalSelectionCandidate = candidate.tail_numerical_selection_candidate;
  if (
    tailNumericalSelectionCandidate.closure !== "reviewed_input_specific_selection" ||
    tailNumericalSelectionCandidate.artifact !==
      "governance/drafts/release-2-candidate/numerical/tail-numerical-selection-candidate.json" ||
    tailNumericalSelectionCandidate.validator !==
      "tooling/src/spikes/paired-t-tail-numerical-selection-candidate.ts" ||
    tailNumericalSelectionCandidate.review_protocol !==
      "governance/drafts/release-2-candidate/reviews/d5-tail-numerical-selection-adversarial-review-protocol.md" ||
    tailNumericalSelectionCandidate.selected_bound_form !==
      "input_specific_normal_binary64_roundoff_plus_positive_series_remainder" ||
    tailNumericalSelectionCandidate.input_specific_bound_selected_for_tail_numerical_contract !==
      true ||
    tailNumericalSelectionCandidate.global_constant_bound_required_for_tail_numerical_closure !==
      false ||
    tailNumericalSelectionCandidate.global_constant_truth_error_bound_selected !== false ||
    tailNumericalSelectionCandidate.projection_margin_rule !==
      "cells_to_nearest_policy_class_transition_strictly_greater_than_input_specific_bound" ||
    tailNumericalSelectionCandidate.projection_margin_runtime_activated !== false ||
    tailNumericalSelectionCandidate.independent_selection_review_complete !== true ||
    tailNumericalSelectionCandidate.m2_closed !== true ||
    tailNumericalSelectionCandidate.supported_degrees_of_freedom_max !== null ||
    tailNumericalSelectionCandidate.supported_platform_matrix !== "pending" ||
    tailNumericalSelectionCandidate.supported_execution_predicate_selected !== false ||
    tailNumericalSelectionCandidate.supported_domain_claimed !== false ||
    tailNumericalSelectionCandidate.runtime_support_enabled !== false
  ) {
    errors.push(
      "tail numerical selection must remain reviewed input-specific M2 closure and non-runtime",
    );
  }

  const runtimeInputReasonCodeCandidate = candidate.runtime_input_reason_code_candidate;
  if (
    runtimeInputReasonCodeCandidate.closure !==
      "reviewed_candidate_input_contract_and_partial_inventory" ||
    runtimeInputReasonCodeCandidate.artifact !==
      "governance/drafts/release-2-candidate/numerical/runtime-input-reason-code-candidate.json" ||
    runtimeInputReasonCodeCandidate.validator !==
      "tooling/src/spikes/paired-t-runtime-input-reason-code-candidate.ts" ||
    runtimeInputReasonCodeCandidate.review_disposition !==
      "governance/drafts/release-2-candidate/reviews/d5-runtime-input-reason-code-adversarial-review-disposition.md" ||
    runtimeInputReasonCodeCandidate.input_contract !== "exact_own_data_keys_candidate" ||
    runtimeInputReasonCodeCandidate.selected_operation_stage_reason_code_candidate_count !== 11 ||
    runtimeInputReasonCodeCandidate.deferred_reason_code_decision_count !== 10 ||
    runtimeInputReasonCodeCandidate.final_reason_codes_frozen !== false ||
    runtimeInputReasonCodeCandidate.runtime_support_enabled !== false
  ) {
    errors.push(
      "runtime input/reason-code candidate must remain reviewed, partial, unissued, and non-runtime",
    );
  }

  const g4TraceCandidate = candidate.g4_actual_execution_trace_candidate;
  if (
    g4TraceCandidate.closure !== "reviewed_g4_actual_execution_trace_candidate" ||
    g4TraceCandidate.artifact !==
      "governance/drafts/release-2-candidate/numerical/g4-execution-trace-candidate.json" ||
    g4TraceCandidate.execution_surface !==
      "tooling/src/spikes/paired-t-g4-execution-trace-candidate.ts" ||
    g4TraceCandidate.review_disposition !==
      "governance/drafts/release-2-candidate/reviews/d5-g4-execution-trace-adversarial-review-disposition.md" ||
    g4TraceCandidate.trace_format !== "paired-t-g4-actual-execution-trace-v1" ||
    g4TraceCandidate.maximum_pairs_evaluation_candidate !== 201 ||
    g4TraceCandidate.maximum_trace_nodes_evaluation_candidate !== 2048 ||
    g4TraceCandidate.maximum_values_are_supported_resource_bounds !== false ||
    g4TraceCandidate.existing_reference_graph_unchanged !== true ||
    g4TraceCandidate.exact_primitive_verifier_reused !== true ||
    g4TraceCandidate.same_trace_result_values !== true ||
    g4TraceCandidate.independent_adversarial_review_complete !== true ||
    g4TraceCandidate.mathematical_truth_error_artifact !==
      "governance/drafts/release-2-candidate/numerical/g4-truth-error-candidate.json" ||
    g4TraceCandidate.mathematical_truth_error_review_disposition !==
      "governance/drafts/release-2-candidate/reviews/d5-g4-truth-error-adversarial-review-disposition.md" ||
    g4TraceCandidate.mathematical_truth_error_bound_complete !== true ||
    g4TraceCandidate.tail_trace_composition_artifact !==
      "governance/drafts/release-2-candidate/numerical/g4-tail-trace-composition-candidate.json" ||
    g4TraceCandidate.tail_trace_composition_review_disposition !==
      "governance/drafts/release-2-candidate/reviews/d5-g4-tail-trace-composition-adversarial-review-disposition.md" ||
    g4TraceCandidate.tail_trace_composition_complete !== true ||
    g4TraceCandidate.confidence_interval_trace_composition_artifact !==
      "governance/drafts/release-2-candidate/numerical/ci-execution-trace-candidate.json" ||
    g4TraceCandidate.confidence_interval_trace_composition_review_result !==
      "review-inputs/r2-d5-ci-execution-trace-candidate/REVIEW-RESULT.md" ||
    g4TraceCandidate.confidence_interval_trace_composition_complete !== true ||
    g4TraceCandidate.confidence_interval_endpoint_truth_artifact !==
      "governance/drafts/release-2-candidate/numerical/ci-endpoint-truth-error-candidate.json" ||
    g4TraceCandidate.confidence_interval_endpoint_truth_review_result !==
      "review-inputs/r2-d5-ci-endpoint-truth-error-candidate/REVIEW-RESULT.md" ||
    g4TraceCandidate.confidence_interval_endpoint_truth_complete !== true ||
    g4TraceCandidate.m3_closed !== true ||
    g4TraceCandidate.supported_domain_claimed !== false ||
    g4TraceCandidate.runtime_support_enabled !== false
  ) {
    errors.push(
      "G4 actual-execution trace candidate must remain reviewed, truth-bounded, tail/CI-composed, unbounded, and non-runtime",
    );
  }

  const ciClosureCandidate = candidate.confidence_interval_numerical_closure_candidate;
  if (
    ciClosureCandidate.closure !== "reviewed_m3_confidence_interval_numerical_closure" ||
    ciClosureCandidate.fixed_95_evidence_review_sync_artifact !==
      "governance/drafts/release-2-candidate/numerical/fixed-95-critical-value-evidence-review-sync-candidate.json" ||
    ciClosureCandidate.fixed_95_evidence_review_result !==
      "review-inputs/r2-d5-fixed-95-evidence-review-sync/REVIEW-RESULT.md" ||
    ciClosureCandidate.fixed_95_table_selection_artifact !==
      "governance/drafts/release-2-candidate/numerical/fixed-95-critical-value-table-selected-candidate.json" ||
    ciClosureCandidate.fixed_95_table_selection_candidate_key !==
      "paired-t-d5-fixed-95-critical-value-table-selected-candidate-1" ||
    ciClosureCandidate.fixed_95_table_selection_review_result !==
      "review-inputs/r2-d5-fixed-95-table-selection/REVIEW-RESULT.md" ||
    ciClosureCandidate.confidence_interval_execution_trace_artifact !==
      "governance/drafts/release-2-candidate/numerical/ci-execution-trace-candidate.json" ||
    ciClosureCandidate.confidence_interval_execution_trace_candidate_key !==
      "paired-t-d5-ci-actual-execution-trace-candidate-1" ||
    ciClosureCandidate.confidence_interval_execution_trace_review_result !==
      "review-inputs/r2-d5-ci-execution-trace-candidate/REVIEW-RESULT.md" ||
    ciClosureCandidate.confidence_interval_endpoint_truth_artifact !==
      "governance/drafts/release-2-candidate/numerical/ci-endpoint-truth-error-candidate.json" ||
    ciClosureCandidate.selected_endpoint_truth_candidate_key !==
      "paired-t-d5-ci-endpoint-mathematical-truth-error-candidate-1" ||
    ciClosureCandidate.selected_endpoint_truth_candidate_commit !==
      "ba3d81e62f8f77884628c59c4b27d1c5ff3cb340" ||
    ciClosureCandidate.confidence_interval_endpoint_truth_review_result !==
      "review-inputs/r2-d5-ci-endpoint-truth-error-candidate/REVIEW-RESULT.md" ||
    ciClosureCandidate.not_selected_alternative_pr !==
      "https://github.com/licklider-ai/nomue-protocol/pull/110" ||
    ciClosureCandidate.not_selected_alternative_candidate_key !==
      "paired-t-d5-ci-endpoint-mathematical-truth-candidate-1" ||
    ciClosureCandidate.not_selected_alternative_candidate_commit !==
      "bbfcb104889b7ce3ed219dc30d49bd7ca1723f80" ||
    ciClosureCandidate.not_selected_alternative_merged !== false ||
    ciClosureCandidate.selected_table_content_hash !==
      "sha256:24ccc86d7a49b9e1ef1e3fc9b038a5b8d338b8b5ca4a02492d8900d7e7dea3c0" ||
    ciClosureCandidate.finite_corpus_maximum_is_a_bound !== false ||
    ciClosureCandidate.global_confidence_interval_error_constant_selected !== false ||
    ciClosureCandidate.m3_closed !== true ||
    ciClosureCandidate.supported_degrees_of_freedom_max !== null ||
    ciClosureCandidate.supported_platform_matrix !== "pending" ||
    ciClosureCandidate.supported_execution_predicate_selected !== false ||
    ciClosureCandidate.supported_domain_claimed !== false ||
    ciClosureCandidate.runtime_support_enabled !== false ||
    ciClosureCandidate.final_reason_codes_frozen !== false ||
    ciClosureCandidate.public_check_or_bundle_issued !== false
  ) {
    errors.push(
      "confidence-interval numerical closure must bind the selected reviewed M3 chain without support or runtime promotion",
    );
  }

  const supportedExecutionCandidate = candidate.supported_execution_predicate_candidate;
  if (
    supportedExecutionCandidate.closure !== "reviewed_tail_only_implementation_candidate" ||
    supportedExecutionCandidate.artifact !==
      "governance/drafts/release-2-candidate/numerical/supported-execution-predicate-candidate.json" ||
    supportedExecutionCandidate.execution_surface !==
      "tooling/src/spikes/paired-t-supported-execution-candidate.ts" ||
    supportedExecutionCandidate.primary_source_disposition !==
      "governance/drafts/release-2-candidate/reviews/d5-supported-platform-primary-source-research-disposition.md" ||
    supportedExecutionCandidate.review_disposition !==
      "governance/drafts/release-2-candidate/reviews/d5-supported-execution-predicate-adversarial-review-disposition.md" ||
    supportedExecutionCandidate.section_h_review_supplement !==
      "review-inputs/r2-d5-supported-execution-predicate/REVIEW-SUPPLEMENT-H.md" ||
    supportedExecutionCandidate.trace_format !== "paired-t-supported-execution-trace-v1" ||
    supportedExecutionCandidate.maximum_trace_nodes_candidate !== 100000 ||
    supportedExecutionCandidate.exact_primitive_verifier_implemented !== true ||
    supportedExecutionCandidate.same_trace_value_and_proof !== true ||
    supportedExecutionCandidate.exact_runtime_allowlist_selected !== false ||
    supportedExecutionCandidate.controlled_process_profile_enforced !== false ||
    supportedExecutionCandidate.cross_platform_admission_evidence_complete !== false ||
    supportedExecutionCandidate.independent_adversarial_review_complete !== true ||
    supportedExecutionCandidate.section_h_cross_runner_review_complete !== true ||
    supportedExecutionCandidate.supported_execution_predicate_selected !== false ||
    supportedExecutionCandidate.runtime_support_enabled !== false
  ) {
    errors.push(
      "supported-execution predicate candidate must remain reviewed, tail-only, unselected, and non-runtime",
    );
  }

  const graph = candidate.operation_graph;
  if (
    graph.candidate_key !== "g4-pairwise-two-pass" ||
    graph.selection_state !== "selected_for_candidate_testing" ||
    graph.difference_target !== "exact_difference_of_parsed_binary64_operands" ||
    graph.binary64_difference_stage !== "one_subtraction_per_canonical_pair" ||
    graph.mean_reduction !== "fixed_recursive_floor_half_split_tree" ||
    graph.variance_path !==
      "two_pass_center_square_fixed_recursive_floor_half_split_tree_divide_n_minus_one" ||
    graph.standard_error_path !== "sample_variance_divide_n_then_native_sqrt" ||
    graph.test_statistic_path !== "mean_divide_standard_error"
  ) {
    errors.push("operation graph does not match the approved candidate direction");
  }
  if (
    graph.fma_allowed !== false ||
    graph.implicit_extended_precision_allowed !== false ||
    graph.native_sqrt_cross_runtime_bit_identity_claimed !== false
  ) {
    errors.push("operation graph overclaims binary64 reproducibility");
  }

  requireExactSet(
    "Contract-computability refusals",
    candidate.refusal_classes.contract_computability,
    REQUIRED_CONTRACT_COMPUTABILITY,
    errors,
  );
  requireExactSet(
    "binary64-computability refusals",
    candidate.refusal_classes.binary64_computability,
    REQUIRED_BINARY64_COMPUTABILITY,
    errors,
  );
  requireExactSet(
    "scope refusals",
    candidate.refusal_classes.scope,
    ["operation_stage_predicate_outside_validated_scope"],
    errors,
  );
  requireExactSet(
    "recompute mismatches",
    candidate.refusal_classes.recompute_mismatch,
    ["declared_result_differs_from_candidate_recomputation"],
    errors,
  );

  if (
    candidate.p_value_enclosure_evidence.closure !== "reviewed_complete" ||
    candidate.fixed_95_critical_value_evidence.closure !== "reviewed_complete"
  ) {
    errors.push(
      "p-value and fixed-95 critical-value evidence must remain reviewed complete after M3 closure",
    );
  }
  const expectedValidator = "tooling/src/spikes/paired-t-certificate-candidate.ts";
  if (
    candidate.p_value_enclosure_evidence.primary_path !==
      "arb_regularized_incomplete_beta_exact_rational_input" ||
    candidate.p_value_enclosure_evidence.secondary_path !==
      "rigorous_density_quadrature_with_analytic_tail_bound" ||
    candidate.fixed_95_critical_value_evidence.primary_path !==
      "arb_forward_probability_midpoint_bracketing" ||
    candidate.fixed_95_critical_value_evidence.secondary_path !==
      "rigorous_density_quadrature_or_executed_low_df_closed_form"
  ) {
    errors.push("certificate readiness paths do not match the approved evidence directions");
  }
  if (
    candidate.p_value_enclosure_evidence.certificate_validator !== expectedValidator ||
    candidate.fixed_95_critical_value_evidence.certificate_validator !== expectedValidator
  ) {
    errors.push("certificate readiness does not point to the candidate bundle validator");
  }
  requireExactSet(
    "p-value evidence closure",
    candidate.p_value_enclosure_evidence.known_closure_items,
    REQUIRED_P_CLOSURE,
    errors,
  );
  requireExactSet(
    "critical-value evidence closure",
    candidate.fixed_95_critical_value_evidence.known_closure_items,
    REQUIRED_CRITICAL_CLOSURE,
    errors,
  );
  requireExactSet("boundary cases", candidate.required_boundary_cases, REQUIRED_BOUNDARIES, errors);
  requireExactSet(
    "prohibited pre-D5 claims",
    candidate.prohibited_claims_before_final_r2_d5,
    REQUIRED_PROHIBITIONS,
    errors,
  );
  return errors;
}

export function validatePairedTNumericalReadinessCandidate(candidate: unknown): string[] {
  const malformed = ["numerical readiness candidate is not a structurally valid object"];
  try {
    if (!isRecord(candidate) || !hasStrictJsonShape(candidate)) return malformed;
  } catch {
    return malformed;
  }
  try {
    return validatePairedTNumericalReadinessCandidateInternal(
      candidate as unknown as PairedTNumericalReadinessCandidate,
    );
  } catch {
    return malformed;
  }
}
