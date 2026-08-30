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
    closure: "incomplete_pending_independent_review";
    artifact: "governance/drafts/release-2-candidate/numerical/runtime-inverse-beta-table-candidate.json";
    evidence_generator: "tooling/r2-paired-t-runtime-series/generate_inverse_beta_table_evidence.py";
    evidence_validator: "tooling/src/spikes/validate-paired-t-runtime-inverse-beta-table-evidence.ts";
    degrees_of_freedom_minimum: 1;
    degrees_of_freedom_max_evaluation_target: 200;
    entry_count: 200;
    contiguous_evidence_coverage_claimed: true;
    runtime_table_selected: false;
    final_content_hash: null;
    supported_degrees_of_freedom_max: null;
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
    closure: "incomplete";
    primary_path: "arb_regularized_incomplete_beta_exact_rational_input";
    secondary_path: "rigorous_density_quadrature_with_analytic_tail_bound";
    certificate_validator: string;
    known_closure_items: string[];
  };
  fixed_95_critical_value_evidence: {
    closure: "incomplete";
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
  "numerical_contract_decision_candidate",
  "runtime_series_evaluation_candidate",
  "runtime_inverse_beta_table_evidence_candidate",
  "truth_boundary_evidence_candidate",
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
  "degrees_of_freedom_minimum",
  "degrees_of_freedom_max_evaluation_target",
  "entry_count",
  "contiguous_evidence_coverage_claimed",
  "runtime_table_selected",
  "final_content_hash",
  "supported_degrees_of_freedom_max",
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

export function validatePairedTNumericalReadinessCandidate(
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
    "truth-boundary evidence candidate",
    candidate.truth_boundary_evidence_candidate,
    TRUTH_BOUNDARY_CANDIDATE_KEYS,
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
    inverseBetaTableCandidate.closure !== "incomplete_pending_independent_review" ||
    inverseBetaTableCandidate.artifact !==
      "governance/drafts/release-2-candidate/numerical/runtime-inverse-beta-table-candidate.json" ||
    inverseBetaTableCandidate.evidence_generator !==
      "tooling/r2-paired-t-runtime-series/generate_inverse_beta_table_evidence.py" ||
    inverseBetaTableCandidate.evidence_validator !==
      "tooling/src/spikes/validate-paired-t-runtime-inverse-beta-table-evidence.ts" ||
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
      "runtime inverse-beta table evidence candidate must remain review-pending and non-runtime",
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
    candidate.p_value_enclosure_evidence.closure !== "incomplete" ||
    candidate.fixed_95_critical_value_evidence.closure !== "incomplete"
  ) {
    errors.push("certificate evidence cannot be marked closed by this readiness increment");
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
