import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  validatePairedTNumericalReadinessCandidate,
  type PairedTNumericalReadinessCandidate,
} from "../src/spikes/paired-t-numerical-readiness.js";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const readinessPath = path.join(
  repositoryRoot,
  "governance/drafts/release-2-candidate/numerical/evidence-readiness.json",
);

function loadReadiness(): PairedTNumericalReadinessCandidate {
  return JSON.parse(readFileSync(readinessPath, "utf8")) as PairedTNumericalReadinessCandidate;
}

describe("Release 2 numerical evidence readiness", () => {
  it("records candidate approval without freezing R2-D5 meaning", () => {
    expect(validatePairedTNumericalReadinessCandidate(loadReadiness())).toEqual([]);
  });

  it("records p-value and fixed-95 critical-value evidence as reviewed complete", () => {
    const demoted = loadReadiness();
    demoted.p_value_enclosure_evidence.closure = "incomplete" as never;
    expect(validatePairedTNumericalReadinessCandidate(demoted)).toContain(
      "p-value and fixed-95 critical-value evidence must remain reviewed complete after M3 closure",
    );

    const criticalDemoted = loadReadiness();
    criticalDemoted.fixed_95_critical_value_evidence.closure = "incomplete" as never;
    expect(validatePairedTNumericalReadinessCandidate(criticalDemoted)).toContain(
      "p-value and fixed-95 critical-value evidence must remain reviewed complete after M3 closure",
    );
  });

  it("rejects a support or tolerance freeze", () => {
    const candidate = loadReadiness();
    candidate.supported_domain = { degrees_of_freedom_max: 100 } as never;
    expect(validatePairedTNumericalReadinessCandidate(candidate)).toContain(
      "numerical support and tolerances must remain unfrozen",
    );
  });

  it("keeps the operation-stage support candidate incomplete and non-runtime", () => {
    const candidate = loadReadiness();
    candidate.support_domain_predicate_candidate.runtime_support_enabled = true as never;
    expect(validatePairedTNumericalReadinessCandidate(candidate)).toContain(
      "support-domain predicate candidate must remain incomplete and non-runtime",
    );
  });

  it("records reviewed Group 1 closure while keeping support and runtime open", () => {
    const candidate = loadReadiness();
    expect(candidate.candidate_supported_scope_resource_bounds).toEqual({
      closure: "reviewed_group_1_candidate_selection",
      artifact:
        "governance/drafts/release-2-candidate/numerical/candidate-supported-scope-resource-bounds-candidate.json",
      corpus:
        "governance/drafts/release-2-candidate/numerical/candidate-supported-scope-resource-corpus.json",
      validator: "tooling/src/spikes/paired-t-candidate-supported-scope-resource-bounds.ts",
      selected_pair_count_minimum: 2,
      selected_pair_count_maximum: 201,
      selected_degrees_of_freedom_minimum: 1,
      selected_degrees_of_freedom_maximum: 200,
      candidate_tail_table_content_hash:
        "sha256:ba1f992199e9e153956589d62dcf5a6509575100bb7c923c170bfa45fdd76c08",
      candidate_fixed_95_table_content_hash:
        "sha256:24ccc86d7a49b9e1ef1e3fc9b038a5b8d338b8b5ca4a02492d8900d7e7dea3c0",
      selected_g4_trace_node_maximum: 1008,
      selected_tail_trace_node_maximum: 100000,
      selected_tail_iteration_cap_maximum: 8064,
      selected_ci_specific_trace_node_maximum: 3,
      selected_combined_primitive_trace_node_maximum: 101011,
      selection_made_by_this_increment: true,
      independent_review: "complete",
      group_1_complete: true,
      reviewed_candidate_head: "000705ccc3b29d3ef449c5c050e7dba4723a3cab",
      reviewed_candidate_tree: "66446cb02e01adc23d55c45ee97c89b83179a8bb",
      review_result:
        "review-inputs/r2-d5-candidate-supported-scope-resource-bounds/REVIEW-RESULT.md",
      review_result_blob: "18d3b6e42e3ce4eaf38a4583e89ab6b9f8405910",
      review_preservation_merge: "8aac3c192b972d679308c230efc0cb3b4eff41cf",
      supported_domain_claimed: false,
      runtime_support_enabled: false,
    });
    expect(candidate.supported_domain).toBeNull();
    expect(candidate.numerical_contract_frozen).toBe(false);
    expect(validatePairedTNumericalReadinessCandidate(candidate)).toEqual([]);

    const demoted = loadReadiness();
    demoted.candidate_supported_scope_resource_bounds.independent_review = "pending" as never;
    demoted.candidate_supported_scope_resource_bounds.group_1_complete = false as never;
    expect(validatePairedTNumericalReadinessCandidate(demoted)).toContain(
      "candidate supported-scope/resource bounds must bind the preserved exact-head review and close only Group 1 without support or runtime promotion",
    );

    const identityAttacks: Array<
      (
        value: PairedTNumericalReadinessCandidate["candidate_supported_scope_resource_bounds"],
      ) => void
    > = [
      (value) => {
        value.reviewed_candidate_head = "0".repeat(40) as never;
      },
      (value) => {
        value.reviewed_candidate_tree = "0".repeat(40) as never;
      },
      (value) => {
        value.review_result = "review-inputs/substituted/REVIEW-RESULT.md" as never;
      },
      (value) => {
        value.review_result_blob = "0".repeat(40) as never;
      },
      (value) => {
        value.review_preservation_merge = "0".repeat(40) as never;
      },
    ];
    for (const attack of identityAttacks) {
      const substituted = loadReadiness();
      attack(substituted.candidate_supported_scope_resource_bounds);
      expect(validatePairedTNumericalReadinessCandidate(substituted)).toContain(
        "candidate supported-scope/resource bounds must bind the preserved exact-head review and close only Group 1 without support or runtime promotion",
      );
    }

    const promoted = loadReadiness();
    promoted.candidate_supported_scope_resource_bounds.supported_domain_claimed = true as never;
    promoted.candidate_supported_scope_resource_bounds.runtime_support_enabled = true as never;
    expect(validatePairedTNumericalReadinessCandidate(promoted)).toContain(
      "candidate supported-scope/resource bounds must bind the preserved exact-head review and close only Group 1 without support or runtime promotion",
    );
  });

  it("records reviewed Group 2 closure without numerical freeze or support", () => {
    const candidate = loadReadiness();
    expect(candidate.runtime_numerical_contract_full_trace_candidate).toEqual({
      closure: "reviewed_group_2_candidate_selection",
      artifact:
        "governance/drafts/release-2-candidate/numerical/runtime-numerical-contract-full-trace-candidate.json",
      evaluator: "tooling/src/spikes/paired-t-runtime-numerical-contract-full-trace-candidate.ts",
      review_protocol:
        "governance/drafts/release-2-candidate/reviews/d5-group-2-runtime-numerical-contract-adversarial-review-protocol.md",
      source_snapshot_commit: "9d53f7b9ae2e6059eb8b6d9f1e3ca70002f8f24f",
      group_1_complete: true,
      selected_pair_count_minimum: 2,
      selected_pair_count_maximum: 201,
      selected_degrees_of_freedom_minimum: 1,
      selected_degrees_of_freedom_maximum: 200,
      selected_tail_table_content_hash:
        "sha256:ba1f992199e9e153956589d62dcf5a6509575100bb7c923c170bfa45fdd76c08",
      selected_fixed_95_table_content_hash:
        "sha256:24ccc86d7a49b9e1ef1e3fc9b038a5b8d338b8b5ca4a02492d8900d7e7dea3c0",
      full_trace_format: "paired-t-runtime-numerical-contract-full-trace-v1",
      candidate_full_trace_predicate_selected: true,
      selection_made_by_this_increment: true,
      independent_review: "complete",
      group_2_complete: true,
      reviewed_candidate_head: "adea5c12d709350cbd8d4fbf918ea8344c111000",
      reviewed_candidate_tree: "7d56ad8f8b97b4c0baef336716a1dfc97338d3ac",
      review_result: "review-inputs/r2-d5-group-2-runtime-numerical-contract/REVIEW-RESULT.md",
      review_result_blob: "fc4da85398eeda3220b0ae0f4401195db0228250",
      review_preservation_merge: "b6bb348a22a25b82dfa940d39d017fe3c22859ff",
      numerical_contract_frozen: false,
      supported_platform_matrix: "pending",
      exact_runtime_allowlist_selected: false,
      controlled_process_profile_enforced: false,
      supported_execution_predicate_selected: false,
      supported_domain_claimed: false,
      runtime_support_enabled: false,
    });
    expect(validatePairedTNumericalReadinessCandidate(candidate)).toEqual([]);

    const attacks: Array<
      (
        value: PairedTNumericalReadinessCandidate["runtime_numerical_contract_full_trace_candidate"],
      ) => void
    > = [
      (value) => {
        value.source_snapshot_commit = "0".repeat(40) as never;
      },
      (value) => {
        value.group_1_complete = false as never;
      },
      (value) => {
        value.selected_pair_count_maximum = 202 as never;
      },
      (value) => {
        value.selected_tail_table_content_hash = `sha256:${"0".repeat(64)}` as never;
      },
      (value) => {
        value.selected_fixed_95_table_content_hash = `sha256:${"0".repeat(64)}` as never;
      },
      (value) => {
        value.full_trace_format = "substituted" as never;
      },
      (value) => {
        value.independent_review = "pending" as never;
        value.group_2_complete = false as never;
      },
      (value) => {
        value.reviewed_candidate_head = "0".repeat(40) as never;
      },
      (value) => {
        value.reviewed_candidate_tree = "0".repeat(40) as never;
      },
      (value) => {
        value.review_result = "review-inputs/substituted/REVIEW-RESULT.md" as never;
      },
      (value) => {
        value.review_result_blob = "0".repeat(40) as never;
      },
      (value) => {
        value.review_preservation_merge = "0".repeat(40) as never;
      },
      (value) => {
        value.numerical_contract_frozen = true as never;
      },
      (value) => {
        value.supported_platform_matrix = "selected" as never;
        value.exact_runtime_allowlist_selected = true as never;
        value.controlled_process_profile_enforced = true as never;
      },
      (value) => {
        value.supported_execution_predicate_selected = true as never;
        value.supported_domain_claimed = true as never;
        value.runtime_support_enabled = true as never;
      },
    ];
    for (const attack of attacks) {
      const substituted = loadReadiness();
      attack(substituted.runtime_numerical_contract_full_trace_candidate);
      expect(validatePairedTNumericalReadinessCandidate(substituted)).toContain(
        "runtime numerical contract full-trace candidate must bind the preserved exact-head review and close only Group 2 without numerical freeze, platform, support, or runtime promotion",
      );
    }

    const undeclared = loadReadiness();
    (
      undeclared.runtime_numerical_contract_full_trace_candidate as unknown as Record<
        string,
        unknown
      >
    ).undeclared = true;
    expect(validatePairedTNumericalReadinessCandidate(undeclared)).toContain(
      "runtime numerical contract full-trace candidate: keys are incomplete or contain an undeclared item",
    );
  });

  it("binds reviewed Group 3 infrastructure and records a review-pending selection", () => {
    const candidate = loadReadiness();
    expect(candidate.supported_execution_admission_evidence_candidate).toMatchObject({
      closure: "reviewed_admission_evidence_infrastructure",
      exact_head_cold_hot_evidence: "complete",
      independent_review: "complete",
      reviewed_candidate_head: "5563bae511069cc3bc73a2e3db24d8448de9fe2a",
      review_result_blob: "97bcc1ac0b59e56f84d997e83d10e43d3285933a",
      review_preservation_merge: "3b4eab15bf3f5bb02819d27b4ab9e28bf2055f0b",
      selection_made_by_this_increment: false,
      exact_runtime_allowlist_selected: false,
      controlled_process_profile_selected: false,
      cross_platform_admission_evidence_complete: false,
      supported_execution_predicate_selected: false,
      group_3_complete: false,
      supported_domain_claimed: false,
      runtime_support_enabled: false,
    });
    expect(candidate.supported_execution_selection_candidate).toEqual({
      closure: "candidate_selection_pending_exact_head_independent_review",
      artifact:
        "governance/drafts/release-2-candidate/numerical/supported-execution-selection-candidate.json",
      evaluator: "tooling/src/spikes/paired-t-supported-execution-selection-candidate.ts",
      collector: "tooling/src/spikes/collect-paired-t-supported-execution-selection-evidence.ts",
      validator: "tooling/src/spikes/validate-paired-t-supported-execution-selection-evidence.ts",
      workflow: ".github/workflows/release2-paired-t-supported-execution-selection-evidence.yml",
      review_protocol:
        "governance/drafts/release-2-candidate/reviews/d5-group-3-supported-execution-selection-adversarial-review-protocol.md",
      source_snapshot_commit: "3b4eab15bf3f5bb02819d27b4ab9e28bf2055f0b",
      candidate_matrix_scope: "one_exact_tuple_only",
      candidate_matrix_entry_count: 1,
      candidate_supported_platform_matrix_selected: true,
      every_selected_tuple_admission_evidence_complete: true,
      candidate_exact_runtime_allowlist_selected: true,
      candidate_controlled_process_profile_selected: true,
      candidate_supported_execution_predicate_selected: true,
      selection_made_by_this_increment: true,
      independent_review: "pending",
      group_3_complete: false,
      broad_cross_platform_support_claimed: false,
      authoritative_supported_execution_predicate_issued: false,
      supported_domain_claimed: false,
      runtime_support_enabled: false,
    });
    expect(validatePairedTNumericalReadinessCandidate(candidate)).toEqual([]);

    const infrastructureAttacks: Array<
      (
        value: PairedTNumericalReadinessCandidate["supported_execution_admission_evidence_candidate"],
      ) => void
    > = [
      (value) => {
        value.source_snapshot_commit = "0".repeat(40) as never;
      },
      (value) => {
        value.review_result_blob = "0".repeat(40) as never;
      },
      (value) => {
        value.exact_head_cold_hot_evidence = "pending" as never;
      },
      (value) => {
        value.selection_made_by_this_increment = true as never;
      },
      (value) => {
        value.exact_runtime_allowlist_selected = true as never;
      },
      (value) => {
        value.group_3_complete = true as never;
      },
      (value) => {
        value.runtime_support_enabled = true as never;
      },
    ];
    for (const attack of infrastructureAttacks) {
      const substituted = loadReadiness();
      attack(substituted.supported_execution_admission_evidence_candidate);
      expect(validatePairedTNumericalReadinessCandidate(substituted)).toContain(
        "supported-execution admission-evidence infrastructure must bind its preserved exact-head review and must not itself select or promote Group 3 support",
      );
    }

    const selectionAttacks: Array<
      (value: PairedTNumericalReadinessCandidate["supported_execution_selection_candidate"]) => void
    > = [
      (value) => {
        value.candidate_matrix_entry_count = 2 as never;
      },
      (value) => {
        value.independent_review = "complete" as never;
      },
      (value) => {
        value.group_3_complete = true as never;
      },
      (value) => {
        value.broad_cross_platform_support_claimed = true as never;
      },
      (value) => {
        value.authoritative_supported_execution_predicate_issued = true as never;
      },
      (value) => {
        value.runtime_support_enabled = true as never;
      },
    ];
    for (const attack of selectionAttacks) {
      const substituted = loadReadiness();
      attack(substituted.supported_execution_selection_candidate);
      expect(validatePairedTNumericalReadinessCandidate(substituted)).toContain(
        "supported-execution selection must remain a one-tuple candidate pending exact-head review without broad or authoritative support",
      );
    }
  });

  it("keeps the numerical-contract decision candidate incomplete and non-runtime", () => {
    const candidate = loadReadiness();
    candidate.numerical_contract_decision_candidate.supported_degrees_of_freedom_max = 200 as never;
    expect(validatePairedTNumericalReadinessCandidate(candidate)).toContain(
      "numerical-contract decision candidate must remain incomplete and non-runtime",
    );

    const runtime = loadReadiness();
    runtime.numerical_contract_decision_candidate.runtime_support_enabled = true as never;
    expect(validatePairedTNumericalReadinessCandidate(runtime)).toContain(
      "numerical-contract decision candidate must remain incomplete and non-runtime",
    );
  });

  it("keeps the runtime-series evaluation separate from runtime support", () => {
    const candidate = loadReadiness();
    candidate.runtime_series_evaluation_candidate.supported_degrees_of_freedom_max = 200 as never;
    candidate.runtime_series_evaluation_candidate.runtime_constant_table_selected = true as never;
    expect(validatePairedTNumericalReadinessCandidate(candidate)).toContain(
      "runtime-series evaluation candidate must remain incomplete and non-runtime",
    );
  });

  it("records the contiguous inverse-beta table as reviewed, non-runtime evidence", () => {
    const candidate = loadReadiness();
    candidate.runtime_inverse_beta_table_evidence_candidate.runtime_table_selected = true as never;
    candidate.runtime_inverse_beta_table_evidence_candidate.final_content_hash =
      "sha256:future" as never;
    expect(validatePairedTNumericalReadinessCandidate(candidate)).toContain(
      "runtime inverse-beta table evidence candidate must remain reviewed evidence and non-runtime",
    );
  });

  it("records the reviewed table connection separately from final runtime selection", () => {
    const candidate = loadReadiness();
    candidate.runtime_table_integration_candidate.runtime_table_selected = true as never;
    candidate.runtime_table_integration_candidate.final_content_hash = candidate
      .runtime_table_integration_candidate.reviewed_evidence_table_content_hash as never;
    expect(validatePairedTNumericalReadinessCandidate(candidate)).toContain(
      "runtime-table integration candidate must remain reviewed candidate integration and non-runtime",
    );
  });

  it("keeps pointwise truth evidence separate from a global bound and runtime margin", () => {
    const candidate = loadReadiness();
    candidate.truth_boundary_evidence_candidate.global_truth_error_bound_ulp = 236 as never;
    candidate.truth_boundary_evidence_candidate.projection_margin_runtime_activated = true as never;
    expect(validatePairedTNumericalReadinessCandidate(candidate)).toContain(
      "truth-boundary evidence candidate must remain pointwise, incomplete, and non-runtime",
    );
  });

  it("records the reviewed input-specific proof without selecting it for runtime", () => {
    const candidate = loadReadiness();
    candidate.truth_error_support_closure_candidate.input_specific_bound_selected_for_runtime =
      true as never;
    candidate.truth_error_support_closure_candidate.supported_domain_claimed = true as never;
    candidate.truth_error_support_closure_candidate.candidate_high_error_witness_bound_ulp =
      374 as never;
    candidate.truth_error_support_closure_candidate.review_disposition =
      "governance/drafts/release-2-candidate/reviews/other.md" as never;
    expect(validatePairedTNumericalReadinessCandidate(candidate)).toContain(
      "truth-error support closure candidate must remain reviewed candidate proof, unselected, and non-runtime",
    );
  });

  it("records the independently reviewed input-specific tail selection as M2 closed", () => {
    const candidate = loadReadiness();
    expect(candidate.tail_numerical_selection_candidate).toMatchObject({
      closure: "reviewed_input_specific_selection",
      input_specific_bound_selected_for_tail_numerical_contract: true,
      global_constant_bound_required_for_tail_numerical_closure: false,
      global_constant_truth_error_bound_selected: false,
      projection_margin_runtime_activated: false,
      independent_selection_review_complete: true,
      m2_closed: true,
      supported_degrees_of_freedom_max: null,
      supported_platform_matrix: "pending",
      supported_execution_predicate_selected: false,
      supported_domain_claimed: false,
      runtime_support_enabled: false,
    });
    expect(validatePairedTNumericalReadinessCandidate(candidate)).toEqual([]);

    const demoted = loadReadiness();
    demoted.tail_numerical_selection_candidate.input_specific_bound_selected_for_tail_numerical_contract =
      false as never;
    expect(validatePairedTNumericalReadinessCandidate(demoted)).toContain(
      "tail numerical selection must remain reviewed input-specific M2 closure and non-runtime",
    );

    const promoted = loadReadiness();
    promoted.tail_numerical_selection_candidate.global_constant_truth_error_bound_selected =
      true as never;
    promoted.tail_numerical_selection_candidate.independent_selection_review_complete =
      true as never;
    promoted.tail_numerical_selection_candidate.m2_closed = true as never;
    promoted.tail_numerical_selection_candidate.supported_degrees_of_freedom_max = 200 as never;
    promoted.tail_numerical_selection_candidate.supported_platform_matrix = "selected" as never;
    promoted.tail_numerical_selection_candidate.supported_execution_predicate_selected =
      true as never;
    promoted.tail_numerical_selection_candidate.supported_domain_claimed = true as never;
    promoted.tail_numerical_selection_candidate.runtime_support_enabled = true as never;
    expect(validatePairedTNumericalReadinessCandidate(promoted)).toContain(
      "tail numerical selection must remain reviewed input-specific M2 closure and non-runtime",
    );
  });

  it("records the reviewed input shape without freezing the partial reason-code inventory", () => {
    const candidate = loadReadiness();
    candidate.runtime_input_reason_code_candidate.final_reason_codes_frozen = true as never;
    candidate.runtime_input_reason_code_candidate.deferred_reason_code_decision_count = 0 as never;
    expect(validatePairedTNumericalReadinessCandidate(candidate)).toContain(
      "runtime input/reason-code candidate must remain reviewed, partial, unissued, and non-runtime",
    );

    const wrongReview = loadReadiness();
    wrongReview.runtime_input_reason_code_candidate.review_disposition =
      "governance/drafts/release-2-candidate/reviews/other.md" as never;
    expect(validatePairedTNumericalReadinessCandidate(wrongReview)).toContain(
      "runtime input/reason-code candidate must remain reviewed, partial, unissued, and non-runtime",
    );
  });

  it("records reviewed G4 truth, tail, and confidence-interval composition without support", () => {
    const candidate = loadReadiness();
    candidate.g4_actual_execution_trace_candidate.maximum_values_are_supported_resource_bounds =
      true as never;
    candidate.g4_actual_execution_trace_candidate.mathematical_truth_error_bound_complete =
      false as never;
    candidate.g4_actual_execution_trace_candidate.mathematical_truth_error_artifact =
      "governance/drafts/release-2-candidate/numerical/other.json" as never;
    candidate.g4_actual_execution_trace_candidate.mathematical_truth_error_review_disposition =
      "governance/drafts/release-2-candidate/reviews/other.md" as never;
    candidate.g4_actual_execution_trace_candidate.tail_trace_composition_complete = false as never;
    candidate.g4_actual_execution_trace_candidate.tail_trace_composition_artifact =
      "governance/drafts/release-2-candidate/numerical/other.json" as never;
    candidate.g4_actual_execution_trace_candidate.tail_trace_composition_review_disposition =
      "governance/drafts/release-2-candidate/reviews/other.md" as never;
    candidate.g4_actual_execution_trace_candidate.confidence_interval_trace_composition_complete =
      false as never;
    candidate.g4_actual_execution_trace_candidate.confidence_interval_endpoint_truth_complete =
      false as never;
    candidate.g4_actual_execution_trace_candidate.m3_closed = false as never;
    candidate.g4_actual_execution_trace_candidate.supported_domain_claimed = true as never;
    candidate.g4_actual_execution_trace_candidate.runtime_support_enabled = true as never;
    expect(validatePairedTNumericalReadinessCandidate(candidate)).toContain(
      "G4 actual-execution trace candidate must remain reviewed, truth-bounded, tail/CI-composed, unbounded, and non-runtime",
    );

    const missingReview = loadReadiness();
    missingReview.g4_actual_execution_trace_candidate.independent_adversarial_review_complete =
      false as never;
    missingReview.g4_actual_execution_trace_candidate.review_disposition =
      "governance/drafts/release-2-candidate/reviews/other.md" as never;
    expect(validatePairedTNumericalReadinessCandidate(missingReview)).toContain(
      "G4 actual-execution trace candidate must remain reviewed, truth-bounded, tail/CI-composed, unbounded, and non-runtime",
    );
  });

  it("binds the selected #108 endpoint-truth candidate and rejects the #110 alternative", () => {
    const candidate = loadReadiness();
    expect(candidate.confidence_interval_numerical_closure_candidate).toMatchObject({
      closure: "reviewed_m3_confidence_interval_numerical_closure",
      fixed_95_table_selection_candidate_key:
        "paired-t-d5-fixed-95-critical-value-table-selected-candidate-1",
      confidence_interval_execution_trace_candidate_key:
        "paired-t-d5-ci-actual-execution-trace-candidate-1",
      selected_endpoint_truth_candidate_key:
        "paired-t-d5-ci-endpoint-mathematical-truth-error-candidate-1",
      selected_endpoint_truth_candidate_commit: "ba3d81e62f8f77884628c59c4b27d1c5ff3cb340",
      not_selected_alternative_pr: "https://github.com/licklider-ai/nomue-protocol/pull/110",
      not_selected_alternative_candidate_key:
        "paired-t-d5-ci-endpoint-mathematical-truth-candidate-1",
      not_selected_alternative_candidate_commit: "bbfcb104889b7ce3ed219dc30d49bd7ca1723f80",
      not_selected_alternative_merged: false,
      global_confidence_interval_error_constant_selected: false,
      m3_closed: true,
      supported_degrees_of_freedom_max: null,
      supported_execution_predicate_selected: false,
      supported_domain_claimed: false,
      runtime_support_enabled: false,
      final_reason_codes_frozen: false,
      public_check_or_bundle_issued: false,
    });
    expect(validatePairedTNumericalReadinessCandidate(candidate)).toEqual([]);

    const substituted = loadReadiness();
    substituted.confidence_interval_numerical_closure_candidate.selected_endpoint_truth_candidate_key =
      "paired-t-d5-ci-endpoint-mathematical-truth-candidate-1" as never;
    substituted.confidence_interval_numerical_closure_candidate.selected_endpoint_truth_candidate_commit =
      "bbfcb104889b7ce3ed219dc30d49bd7ca1723f80" as never;
    substituted.confidence_interval_numerical_closure_candidate.not_selected_alternative_merged =
      true as never;
    expect(validatePairedTNumericalReadinessCandidate(substituted)).toContain(
      "confidence-interval numerical closure must bind the selected reviewed M3 chain without support or runtime promotion",
    );

    const promoted = loadReadiness();
    promoted.confidence_interval_numerical_closure_candidate.global_confidence_interval_error_constant_selected =
      true as never;
    promoted.confidence_interval_numerical_closure_candidate.supported_degrees_of_freedom_max =
      200 as never;
    promoted.confidence_interval_numerical_closure_candidate.runtime_support_enabled =
      true as never;
    expect(validatePairedTNumericalReadinessCandidate(promoted)).toContain(
      "confidence-interval numerical closure must bind the selected reviewed M3 chain without support or runtime promotion",
    );
  });

  it("records the reviewed trace implementation without selecting a profile or platform", () => {
    const candidate = loadReadiness();
    candidate.supported_execution_predicate_candidate.exact_runtime_allowlist_selected =
      true as never;
    candidate.supported_execution_predicate_candidate.controlled_process_profile_enforced =
      true as never;
    candidate.supported_execution_predicate_candidate.cross_platform_admission_evidence_complete =
      true as never;
    candidate.supported_execution_predicate_candidate.supported_execution_predicate_selected =
      true as never;
    candidate.supported_execution_predicate_candidate.runtime_support_enabled = true as never;
    expect(validatePairedTNumericalReadinessCandidate(candidate)).toContain(
      "supported-execution predicate candidate must remain reviewed, tail-only, unselected, and non-runtime",
    );

    const missingReview = loadReadiness();
    missingReview.supported_execution_predicate_candidate.independent_adversarial_review_complete =
      false as never;
    missingReview.supported_execution_predicate_candidate.section_h_cross_runner_review_complete =
      false as never;
    missingReview.supported_execution_predicate_candidate.review_disposition =
      "governance/drafts/release-2-candidate/reviews/other.md" as never;
    expect(validatePairedTNumericalReadinessCandidate(missingReview)).toContain(
      "supported-execution predicate candidate must remain reviewed, tail-only, unselected, and non-runtime",
    );
  });

  it("rejects undeclared checkpoint keys instead of carrying hidden claims", () => {
    const candidate = loadReadiness();
    (candidate as unknown as Record<string, unknown>).supported_df_max = 30;
    expect(validatePairedTNumericalReadinessCandidate(candidate)).toContain(
      "numerical readiness: keys are incomplete or contain an undeclared item",
    );

    const nested = loadReadiness();
    (nested.operation_graph as unknown as Record<string, unknown>).oracle =
      "scipy_r_boost_agreement";
    expect(validatePairedTNumericalReadinessCandidate(nested)).toContain(
      "operation graph: keys are incomplete or contain an undeclared item",
    );

    const candidateScopeResource = loadReadiness();
    (
      candidateScopeResource.candidate_supported_scope_resource_bounds as unknown as Record<
        string,
        unknown
      >
    )["authoritative_supported_df_max"] = 200;
    expect(validatePairedTNumericalReadinessCandidate(candidateScopeResource)).toContain(
      "candidate supported-scope/resource bounds: keys are incomplete or contain an undeclared item",
    );

    const runtimeSeries = loadReadiness();
    (runtimeSeries.runtime_series_evaluation_candidate as unknown as Record<string, unknown>)[
      "comparison_tolerance"
    ] = 4;
    expect(validatePairedTNumericalReadinessCandidate(runtimeSeries)).toContain(
      "runtime-series evaluation candidate: keys are incomplete or contain an undeclared item",
    );

    const truthBoundary = loadReadiness();
    (truthBoundary.truth_boundary_evidence_candidate as unknown as Record<string, unknown>)[
      "tolerance"
    ] = 236;
    expect(validatePairedTNumericalReadinessCandidate(truthBoundary)).toContain(
      "truth-boundary evidence candidate: keys are incomplete or contain an undeclared item",
    );

    const inverseBetaTable = loadReadiness();
    (
      inverseBetaTable.runtime_inverse_beta_table_evidence_candidate as unknown as Record<
        string,
        unknown
      >
    )["supported"] = true;
    expect(validatePairedTNumericalReadinessCandidate(inverseBetaTable)).toContain(
      "runtime inverse-beta table evidence candidate: keys are incomplete or contain an undeclared item",
    );

    const integration = loadReadiness();
    (integration.runtime_table_integration_candidate as unknown as Record<string, unknown>)[
      "supported"
    ] = true;
    expect(validatePairedTNumericalReadinessCandidate(integration)).toContain(
      "runtime-table integration candidate: keys are incomplete or contain an undeclared item",
    );

    const truthErrorSupport = loadReadiness();
    (truthErrorSupport.truth_error_support_closure_candidate as unknown as Record<string, unknown>)[
      "global_bound"
    ] = 374;
    expect(validatePairedTNumericalReadinessCandidate(truthErrorSupport)).toContain(
      "truth-error support closure candidate: keys are incomplete or contain an undeclared item",
    );

    const tailNumericalSelection = loadReadiness();
    (
      tailNumericalSelection.tail_numerical_selection_candidate as unknown as Record<
        string,
        unknown
      >
    )["global_bound_ulp"] = 374;
    expect(validatePairedTNumericalReadinessCandidate(tailNumericalSelection)).toContain(
      "tail numerical selection candidate: keys are incomplete or contain an undeclared item",
    );

    const runtimeInputReasonCode = loadReadiness();
    (
      runtimeInputReasonCode.runtime_input_reason_code_candidate as unknown as Record<
        string,
        unknown
      >
    )["supported"] = true;
    expect(validatePairedTNumericalReadinessCandidate(runtimeInputReasonCode)).toContain(
      "runtime input/reason-code candidate: keys are incomplete or contain an undeclared item",
    );

    const g4Trace = loadReadiness();
    (g4Trace.g4_actual_execution_trace_candidate as unknown as Record<string, unknown>)[
      "supported"
    ] = true;
    expect(validatePairedTNumericalReadinessCandidate(g4Trace)).toContain(
      "G4 actual-execution trace candidate: keys are incomplete or contain an undeclared item",
    );

    const ciClosure = loadReadiness();
    (
      ciClosure.confidence_interval_numerical_closure_candidate as unknown as Record<
        string,
        unknown
      >
    )["second_selected_candidate"] = true;
    expect(validatePairedTNumericalReadinessCandidate(ciClosure)).toContain(
      "confidence-interval numerical closure candidate: keys are incomplete or contain an undeclared item",
    );

    const supportedExecution = loadReadiness();
    (
      supportedExecution.supported_execution_predicate_candidate as unknown as Record<
        string,
        unknown
      >
    )["supported"] = true;
    expect(validatePairedTNumericalReadinessCandidate(supportedExecution)).toContain(
      "supported-execution predicate candidate: keys are incomplete or contain an undeclared item",
    );
  });

  it("pins every operation-graph stage", () => {
    const candidate = loadReadiness();
    candidate.operation_graph.standard_error_path = "fma_fast_path" as never;
    expect(validatePairedTNumericalReadinessCandidate(candidate)).toContain(
      "operation graph does not match the approved candidate direction",
    );
  });

  it("rejects a native-sqrt cross-runtime bit-identity claim", () => {
    const candidate = loadReadiness();
    candidate.operation_graph.native_sqrt_cross_runtime_bit_identity_claimed = true as never;
    expect(validatePairedTNumericalReadinessCandidate(candidate)).toContain(
      "operation graph overclaims binary64 reproducibility",
    );
  });

  it("contains hostile top-level and nested shapes in the validation result", () => {
    for (const candidate of [null, undefined, [], {}, "invalid"]) {
      expect(() => validatePairedTNumericalReadinessCandidate(candidate)).not.toThrow();
      expect(validatePairedTNumericalReadinessCandidate(candidate).length).toBeGreaterThan(0);
    }

    const malformedNested = loadReadiness();
    malformedNested.operation_graph = null as never;
    expect(() => validatePairedTNumericalReadinessCandidate(malformedNested)).not.toThrow();
    expect(validatePairedTNumericalReadinessCandidate(malformedNested)).toEqual([
      "numerical readiness candidate is not a structurally valid object",
    ]);

    const hidden = loadReadiness() as PairedTNumericalReadinessCandidate & {
      hidden_support?: boolean;
    };
    Object.defineProperty(hidden, "hidden_support", { value: true, enumerable: false });
    expect(validatePairedTNumericalReadinessCandidate(hidden)).toEqual([
      "numerical readiness candidate is not a structurally valid object",
    ]);

    let getterCalls = 0;
    const accessor = loadReadiness();
    Object.defineProperty(accessor, "supported_domain", {
      enumerable: true,
      get() {
        getterCalls += 1;
        return null;
      },
    });
    expect(validatePairedTNumericalReadinessCandidate(accessor)).toEqual([
      "numerical readiness candidate is not a structurally valid object",
    ]);
    expect(getterCalls).toBe(0);

    const sparse = loadReadiness();
    sparse.required_boundary_cases.length += 1;
    expect(validatePairedTNumericalReadinessCandidate(sparse)).toEqual([
      "numerical readiness candidate is not a structurally valid object",
    ]);

    const cycle = loadReadiness() as PairedTNumericalReadinessCandidate & { cycle?: unknown };
    cycle.cycle = cycle;
    expect(validatePairedTNumericalReadinessCandidate(cycle)).toEqual([
      "numerical readiness candidate is not a structurally valid object",
    ]);

    const throwingProxy = new Proxy(loadReadiness(), {
      ownKeys() {
        throw new Error("hostile ownKeys");
      },
    });
    expect(() => validatePairedTNumericalReadinessCandidate(throwingProxy)).not.toThrow();
    expect(validatePairedTNumericalReadinessCandidate(throwingProxy)).toEqual([
      "numerical readiness candidate is not a structurally valid object",
    ]);
  });

  it("keeps every required evidence repair and boundary case explicit", () => {
    const candidate = loadReadiness();
    candidate.required_boundary_cases.pop();
    expect(validatePairedTNumericalReadinessCandidate(candidate)).toContain(
      "boundary cases: candidate set is incomplete or contains an undeclared item",
    );
  });

  it("keeps exact zero variance in Contract computability, not binary64 failure", () => {
    const candidate = loadReadiness();
    candidate.refusal_classes.binary64_computability.push(
      candidate.refusal_classes.contract_computability.pop() ?? "",
    );
    expect(validatePairedTNumericalReadinessCandidate(candidate)).toContain(
      "Contract-computability refusals: candidate set is incomplete or contains an undeclared item",
    );
  });
});
