/** Fail-closed checks for the non-authoritative paired-t support-domain candidate. */

import type { PairedTSpikeErrorCode } from "../../../reference/spikes/paired-t.js";

type FailureClass = "contract_computability" | "binary64_computability" | "scope";

export interface PairedTActiveSupportPredicateCandidate {
  ordinal: number;
  predicate_key: string;
  stage: string;
  pass_condition: string;
  failure_class: FailureClass;
  readiness_key: string;
  spike_error: PairedTSpikeErrorCode;
  boundary_fixture_key: string;
}

export interface PairedTSupportDomainCandidate {
  status: "non_authoritative_candidate";
  issuance: "unissued";
  review_issue: "https://github.com/licklider-ai/nomue-protocol/issues/25";
  candidate_key: "paired-t-operation-stage-support-domain-draft-1";
  decision_state: "candidate_testing_only";
  supported_domain_claimed: false;
  runtime_support_enabled: false;
  final_reason_codes_frozen: false;
  composition: {
    operation_stage_predicates: "candidate_executable";
    validated_corpus_scope: "incomplete";
    oracle_enclosure_predicate: "incomplete";
  };
  active_predicates: PairedTActiveSupportPredicateCandidate[];
  defensive_postconditions: Array<{
    predicate_key: string;
    stages: string[];
    failure_class: FailureClass;
    readiness_key: string;
    spike_error: PairedTSpikeErrorCode;
    separate_boundary_fixture_required: boolean;
    rationale: string;
  }>;
  deferred_predicates: Array<{
    predicate_key: string;
    state: "deferred";
    failure_class: FailureClass;
    readiness_key: string;
    blocked_by: string;
  }>;
  unselected_policies: string[];
  diagnostic_only: string[];
}

export interface PairedTSupportBoundaryCase {
  case_key: string;
  expected_spike_error: PairedTSpikeErrorCode | null;
  pairs: Array<[number, number]>;
}

export interface PairedTSupportBoundaryCorpus {
  status: "non_authoritative_candidate";
  issuance: "unissued";
  source: "governance/drafts/release-2-candidate/numerical/support-domain-candidate.json";
  numeric_values_are_binary64_inputs: true;
  cases: PairedTSupportBoundaryCase[];
}

const TOP_LEVEL_KEYS = [
  "status",
  "issuance",
  "review_issue",
  "candidate_key",
  "decision_state",
  "supported_domain_claimed",
  "runtime_support_enabled",
  "final_reason_codes_frozen",
  "composition",
  "active_predicates",
  "defensive_postconditions",
  "deferred_predicates",
  "unselected_policies",
  "diagnostic_only",
] as const;

const ACTIVE_PREDICATE_KEYS = [
  "ordinal",
  "predicate_key",
  "stage",
  "pass_condition",
  "failure_class",
  "readiness_key",
  "spike_error",
  "boundary_fixture_key",
] as const;

const EXPECTED_ACTIVE_PREDICATES = [
  {
    ordinal: 1,
    predicate_key: "minimum_pair_count",
    stage: "canonical_pair_collection",
    pass_condition: "at_least_two_canonical_pairs",
    failure_class: "contract_computability",
    readiness_key: "fewer_than_two_pairs",
    spike_error: "PAIR_COUNT_BELOW_TWO",
    boundary_fixture_key: "fewer-than-two-pairs",
  },
  {
    ordinal: 2,
    predicate_key: "finite_binary64_differences",
    stage: "one_binary64_subtraction_per_pair",
    pass_condition: "every_binary64_difference_is_finite",
    failure_class: "binary64_computability",
    readiness_key: "difference_overflow",
    spike_error: "DIFFERENCE_OVERFLOW",
    boundary_fixture_key: "difference-overflow",
  },
  {
    ordinal: 3,
    predicate_key: "nonzero_exact_difference_variance",
    stage: "exact_dyadic_difference_classification",
    pass_condition: "exact_dyadic_differences_are_not_all_equal",
    failure_class: "contract_computability",
    readiness_key: "exact_paired_differences_all_equal",
    spike_error: "ZERO_DIFFERENCE_VARIANCE",
    boundary_fixture_key: "exact-zero-difference-variance",
  },
  {
    ordinal: 4,
    predicate_key: "binary64_difference_spread_preserved",
    stage: "binary64_difference_classification",
    pass_condition: "binary64_differences_are_not_all_equal",
    failure_class: "binary64_computability",
    readiness_key: "difference_variance_erased_by_rounding",
    spike_error: "DIFFERENCE_VARIANCE_ERASED_BY_ROUNDING",
    boundary_fixture_key: "difference-variance-erased-by-rounding",
  },
  {
    ordinal: 5,
    predicate_key: "finite_pairwise_difference_sum",
    stage: "pairwise_mean_reduction",
    pass_condition: "pairwise_difference_sum_is_finite",
    failure_class: "binary64_computability",
    readiness_key: "mean_accumulation_overflow",
    spike_error: "MEAN_ACCUMULATION_OVERFLOW",
    boundary_fixture_key: "mean-accumulation-overflow",
  },
  {
    ordinal: 6,
    predicate_key: "finite_centered_differences",
    stage: "two_pass_centering",
    pass_condition: "every_centered_difference_is_finite",
    failure_class: "binary64_computability",
    readiness_key: "centering_overflow",
    spike_error: "CENTERING_OVERFLOW",
    boundary_fixture_key: "centering-overflow",
  },
  {
    ordinal: 7,
    predicate_key: "finite_squared_deviations",
    stage: "centered_difference_squaring",
    pass_condition: "every_squared_centered_difference_is_finite",
    failure_class: "binary64_computability",
    readiness_key: "squared_deviation_overflow",
    spike_error: "SQUARED_DEVIATION_OVERFLOW",
    boundary_fixture_key: "squared-deviation-overflow",
  },
  {
    ordinal: 8,
    predicate_key: "finite_pairwise_squared_deviation_sum",
    stage: "pairwise_variance_reduction",
    pass_condition: "pairwise_squared_deviation_sum_is_finite",
    failure_class: "binary64_computability",
    readiness_key: "variance_accumulation_overflow",
    spike_error: "VARIANCE_ACCUMULATION_OVERFLOW",
    boundary_fixture_key: "variance-accumulation-overflow",
  },
  {
    ordinal: 9,
    predicate_key: "positive_binary64_sample_variance",
    stage: "sample_variance_division",
    pass_condition: "sample_variance_is_finite_and_positive",
    failure_class: "binary64_computability",
    readiness_key: "variance_underflow",
    spike_error: "VARIANCE_UNDERFLOW",
    boundary_fixture_key: "variance-underflow",
  },
  {
    ordinal: 10,
    predicate_key: "positive_binary64_standard_error_squared",
    stage: "sample_variance_divide_pair_count",
    pass_condition: "standard_error_squared_is_finite_and_positive",
    failure_class: "binary64_computability",
    readiness_key: "standard_error_squared_underflow",
    spike_error: "STANDARD_ERROR_SQUARED_UNDERFLOW",
    boundary_fixture_key: "standard-error-squared-underflow",
  },
] as const satisfies readonly PairedTActiveSupportPredicateCandidate[];

const EXPECTED_DEFENSIVE_POSTCONDITIONS = [
  {
    predicate_key: "finite_later_g4_intermediates",
    stages: [
      "mean_division",
      "sample_variance_division",
      "native_square_root",
      "test_statistic_division",
    ],
    failure_class: "binary64_computability",
    readiness_key: "non_finite_later_intermediate",
    spike_error: "NON_FINITE_INTERMEDIATE",
    separate_boundary_fixture_required: false,
    rationale: "defensive_postcondition_after_prior_finite_and_positive_predicates",
  },
] as const;

const EXPECTED_DEFERRED_PREDICATES = [
  {
    predicate_key: "finite_distinct_confidence_interval_endpoints",
    state: "deferred",
    failure_class: "binary64_computability",
    readiness_key: "confidence_interval_endpoint_collapse",
    blocked_by: "critical_value_table_and_endpoint_truth_ledger_unratified",
  },
  {
    predicate_key: "target_format_p_value_projection",
    state: "deferred",
    failure_class: "scope",
    readiness_key: "operation_stage_predicate_outside_validated_scope",
    blocked_by: "runtime_student_t_tail_procedure_and_boundary_evidence_incomplete",
  },
  {
    predicate_key: "truth_error_and_projection_margin_support",
    state: "deferred",
    failure_class: "scope",
    readiness_key: "operation_stage_predicate_outside_validated_scope",
    blocked_by: "closure_candidate_independent_review_platform_and_final_selection_pending",
  },
  {
    predicate_key: "validated_corpus_membership",
    state: "deferred",
    failure_class: "scope",
    readiness_key: "operation_stage_predicate_outside_validated_scope",
    blocked_by: "final_validation_corpus_incomplete",
  },
  {
    predicate_key: "oracle_enclosure_coverage",
    state: "deferred",
    failure_class: "scope",
    readiness_key: "operation_stage_predicate_outside_validated_scope",
    blocked_by: "p_value_and_critical_value_evidence_closure_incomplete",
  },
] as const;

const EXPECTED_UNSELECTED_POLICIES = [
  "subnormal_intermediate_first_failure_order_and_activation",
  "complete_runtime_student_t_series_graph_and_branch_boundary",
  "critical_value_table_extent_and_final_content_hash",
  "mathematical_truth_error_bounds_and_platform_predicate",
  "final_public_refusal_code_spellings",
] as const;

const EXPECTED_DIAGNOSTICS = [
  "condition_number_kappa",
  "cross_operation_graph_disagreement",
] as const;

const CORPUS_TOP_LEVEL_KEYS = [
  "status",
  "issuance",
  "source",
  "numeric_values_are_binary64_inputs",
  "cases",
] as const;

const CORPUS_CASE_KEYS = ["case_key", "expected_spike_error", "pairs"] as const;

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

function requireExactOrderedValue(
  label: string,
  actual: unknown,
  expected: unknown,
  errors: string[],
): void {
  const canonicalize = (value: unknown): unknown => {
    if (Array.isArray(value)) return value.map(canonicalize);
    if (typeof value !== "object" || value === null) return value;
    return Object.fromEntries(
      Object.entries(value)
        .sort(([first], [second]) => (first < second ? -1 : first > second ? 1 : 0))
        .map(([key, entry]) => [key, canonicalize(entry)]),
    );
  };
  if (JSON.stringify(canonicalize(actual)) !== JSON.stringify(canonicalize(expected))) {
    errors.push(`${label}: value or order differs from the candidate checkpoint`);
  }
}

function validatePairedTSupportDomainCandidateInternal(
  candidate: PairedTSupportDomainCandidate,
): string[] {
  const errors: string[] = [];
  requireExactKeys("support-domain candidate", candidate, TOP_LEVEL_KEYS, errors);
  requireExactKeys(
    "support-domain composition",
    candidate.composition,
    ["operation_stage_predicates", "validated_corpus_scope", "oracle_enclosure_predicate"],
    errors,
  );
  if (
    candidate.status !== "non_authoritative_candidate" ||
    candidate.issuance !== "unissued" ||
    candidate.review_issue !== "https://github.com/licklider-ai/nomue-protocol/issues/25"
  ) {
    errors.push(
      "support-domain candidate must remain non-authoritative, unissued, and review-bound",
    );
  }
  if (
    candidate.candidate_key !== "paired-t-operation-stage-support-domain-draft-1" ||
    candidate.decision_state !== "candidate_testing_only"
  ) {
    errors.push("support-domain candidate identity or decision state changed");
  }
  if (
    candidate.supported_domain_claimed !== false ||
    candidate.runtime_support_enabled !== false ||
    candidate.final_reason_codes_frozen !== false
  ) {
    errors.push("support, runtime enablement, and final reason codes must remain unfrozen");
  }
  if (
    candidate.composition.operation_stage_predicates !== "candidate_executable" ||
    candidate.composition.validated_corpus_scope !== "incomplete" ||
    candidate.composition.oracle_enclosure_predicate !== "incomplete"
  ) {
    errors.push("support-domain composition cannot be marked complete by this increment");
  }

  for (const [index, predicate] of candidate.active_predicates.entries()) {
    requireExactKeys(`active predicate ${index + 1}`, predicate, ACTIVE_PREDICATE_KEYS, errors);
  }
  requireExactOrderedValue(
    "active predicates",
    candidate.active_predicates,
    EXPECTED_ACTIVE_PREDICATES,
    errors,
  );
  requireExactOrderedValue(
    "defensive postconditions",
    candidate.defensive_postconditions,
    EXPECTED_DEFENSIVE_POSTCONDITIONS,
    errors,
  );
  requireExactOrderedValue(
    "deferred predicates",
    candidate.deferred_predicates,
    EXPECTED_DEFERRED_PREDICATES,
    errors,
  );
  requireExactOrderedValue(
    "unselected policies",
    candidate.unselected_policies,
    EXPECTED_UNSELECTED_POLICIES,
    errors,
  );
  requireExactOrderedValue(
    "diagnostic-only observations",
    candidate.diagnostic_only,
    EXPECTED_DIAGNOSTICS,
    errors,
  );
  return errors;
}

export function validatePairedTSupportDomainCandidate(candidate: unknown): string[] {
  const malformed = ["support-domain candidate is not a structurally valid object"];
  if (!isRecord(candidate)) return malformed;
  try {
    return validatePairedTSupportDomainCandidateInternal(
      candidate as unknown as PairedTSupportDomainCandidate,
    );
  } catch {
    return malformed;
  }
}

function validatePairedTSupportBoundaryCorpusInternal(
  corpus: PairedTSupportBoundaryCorpus,
): string[] {
  const errors: string[] = [];
  requireExactKeys("support boundary corpus", corpus, CORPUS_TOP_LEVEL_KEYS, errors);
  if (
    corpus.status !== "non_authoritative_candidate" ||
    corpus.issuance !== "unissued" ||
    corpus.source !==
      "governance/drafts/release-2-candidate/numerical/support-domain-candidate.json" ||
    corpus.numeric_values_are_binary64_inputs !== true
  ) {
    errors.push("support boundary corpus identity or candidate status changed");
  }

  const expectedCases = new Map<string, PairedTSpikeErrorCode | null>([
    ...EXPECTED_ACTIVE_PREDICATES.map(
      (predicate) => [predicate.boundary_fixture_key, predicate.spike_error] as const,
    ),
    ["ordinary-passing-algebra-example", null],
  ]);
  const seen = new Set<string>();
  for (const entry of corpus.cases) {
    requireExactKeys(`support boundary case ${entry.case_key}`, entry, CORPUS_CASE_KEYS, errors);
    if (seen.has(entry.case_key)) errors.push(`duplicate support boundary case ${entry.case_key}`);
    seen.add(entry.case_key);
    if (!expectedCases.has(entry.case_key)) {
      errors.push(`undeclared support boundary case ${entry.case_key}`);
    } else if (entry.expected_spike_error !== expectedCases.get(entry.case_key)) {
      errors.push(`support boundary case ${entry.case_key} has the wrong expected spike outcome`);
    }
    if (
      entry.pairs.length === 0 ||
      entry.pairs.some(
        (pair) =>
          !Array.isArray(pair) ||
          pair.length !== 2 ||
          !pair.every((value) => typeof value === "number" && Number.isFinite(value)),
      )
    ) {
      errors.push(`support boundary case ${entry.case_key} must contain finite binary64 pairs`);
    }
  }
  for (const caseKey of expectedCases.keys()) {
    if (!seen.has(caseKey)) errors.push(`support boundary corpus is missing ${caseKey}`);
  }
  return errors;
}

export function validatePairedTSupportBoundaryCorpus(corpus: unknown): string[] {
  const malformed = ["support boundary corpus is not a structurally valid object"];
  if (!isRecord(corpus)) return malformed;
  try {
    return validatePairedTSupportBoundaryCorpusInternal(
      corpus as unknown as PairedTSupportBoundaryCorpus,
    );
  } catch {
    return malformed;
  }
}
