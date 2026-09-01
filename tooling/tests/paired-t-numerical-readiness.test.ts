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

  it("keeps p-value evidence reviewed while critical-value evidence remains open", () => {
    const demoted = loadReadiness();
    demoted.p_value_enclosure_evidence.closure = "incomplete" as never;
    expect(validatePairedTNumericalReadinessCandidate(demoted)).toContain(
      "p-value evidence must remain reviewed complete while critical-value evidence remains incomplete",
    );

    const promoted = loadReadiness();
    promoted.fixed_95_critical_value_evidence.closure = "closed" as never;
    expect(validatePairedTNumericalReadinessCandidate(promoted)).toContain(
      "p-value evidence must remain reviewed complete while critical-value evidence remains incomplete",
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

  it("records reviewed G4 truth and tail composition without selecting support", () => {
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
      true as never;
    candidate.g4_actual_execution_trace_candidate.supported_domain_claimed = true as never;
    candidate.g4_actual_execution_trace_candidate.runtime_support_enabled = true as never;
    expect(validatePairedTNumericalReadinessCandidate(candidate)).toContain(
      "G4 actual-execution trace candidate must remain reviewed, truth-bounded, tail-composed, unbounded, and non-runtime",
    );

    const missingReview = loadReadiness();
    missingReview.g4_actual_execution_trace_candidate.independent_adversarial_review_complete =
      false as never;
    missingReview.g4_actual_execution_trace_candidate.review_disposition =
      "governance/drafts/release-2-candidate/reviews/other.md" as never;
    expect(validatePairedTNumericalReadinessCandidate(missingReview)).toContain(
      "G4 actual-execution trace candidate must remain reviewed, truth-bounded, tail-composed, unbounded, and non-runtime",
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
