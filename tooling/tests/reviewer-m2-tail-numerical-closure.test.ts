import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { validatePairedTNumericalReadinessCandidate } from "../src/spikes/paired-t-numerical-readiness.js";
import { validatePairedTPValueEnclosureEvidenceClosureCandidate } from "../src/spikes/paired-t-p-value-enclosure-evidence-closure-candidate.js";
import { validatePairedTTailNumericalSelectionCandidate } from "../src/spikes/paired-t-tail-numerical-selection-candidate.js";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const numericalRoot = path.join(
  repositoryRoot,
  "governance/drafts/release-2-candidate/numerical",
);

function loadJson(name: string): Record<string, any> {
  return JSON.parse(readFileSync(path.join(numericalRoot, name), "utf8")) as Record<string, any>;
}

describe("reviewer-owned M2 tail numerical closure battery", () => {
  it("requires both durable GO inputs before accepting the integration state", () => {
    const selectionReview = readFileSync(
      path.join(
        repositoryRoot,
        "review-inputs/r2-d5-tail-numerical-selection/REVIEW-RESULT.md",
      ),
      "utf8",
    );
    const pValueReview = readFileSync(
      path.join(
        repositoryRoot,
        "review-inputs/r2-d5-p-value-enclosure-evidence-closure/REVIEW-RESULT.md",
      ),
      "utf8",
    );
    expect(selectionReview).toMatch(/## Verdict\s+GO/);
    expect(pValueReview).toMatch(/## Verdict\s+GO/);
  });

  it("rejects tail-selection demotion and support promotion", () => {
    const valid = loadJson("tail-numerical-selection-candidate.json");
    expect(validatePairedTTailNumericalSelectionCandidate(valid)).toEqual([]);

    const demoted = structuredClone(valid);
    demoted.m2_closed = false;
    demoted.closure_state.independent_selection_review = "pending";
    expect(validatePairedTTailNumericalSelectionCandidate(demoted)).not.toEqual([]);

    const promoted = structuredClone(valid);
    promoted.truth_error_contract.global_constant_truth_error_bound_selected = true;
    promoted.truth_error_contract.finite_corpus_maximum_is_a_bound = true;
    promoted.graph_and_table_binding.supported_execution_predicate_selected = true;
    promoted.projection_contract.projection_margin_runtime_activated = true;
    promoted.failure_semantics.final_public_reason_codes_frozen = true;
    promoted.closure_state.supported_degrees_of_freedom_maximum = 200;
    promoted.closure_state.supported_platform_matrix = "selected";
    promoted.closure_state.supported_execution_predicate = "selected";
    promoted.closure_state.supported_domain = true;
    promoted.closure_state.runtime_support = true;
    promoted.runtime_support_enabled = true;
    promoted.supported_domain_claimed = true;
    expect(validatePairedTTailNumericalSelectionCandidate(promoted)).not.toEqual([]);
  });

  it("rejects p-value-evidence demotion, artifact substitution, and support promotion", () => {
    const valid = loadJson("p-value-enclosure-evidence-closure-candidate.json");
    expect(validatePairedTPValueEnclosureEvidenceClosureCandidate(valid)).toEqual([]);

    const demoted = structuredClone(valid);
    demoted.p_value_enclosure_evidence_closed = false;
    demoted.m2_closed = false;
    demoted.closure_state.independent_numerical_review = "pending";
    demoted.closure_items.secondary_overlap_success_path.evidence_status =
      "present_pending_independent_review";
    expect(validatePairedTPValueEnclosureEvidenceClosureCandidate(demoted)).not.toEqual([]);

    const substituted = structuredClone(valid);
    substituted.source_evidence.artifact_zip_sha256 = "sha256:deadbeef";
    expect(validatePairedTPValueEnclosureEvidenceClosureCandidate(substituted)).not.toEqual([]);

    const promoted = structuredClone(valid);
    promoted.closure_state.supported_degrees_of_freedom_maximum = 200;
    promoted.closure_state.supported_platform_matrix = "selected";
    promoted.closure_state.supported_execution_predicate = "selected";
    promoted.closure_state.supported_domain = true;
    promoted.closure_state.runtime_support = true;
    promoted.closure_state.final_reason_codes_frozen = true;
    expect(validatePairedTPValueEnclosureEvidenceClosureCandidate(promoted)).not.toEqual([]);
  });

  it("rejects aggregate-readiness demotion and every premature M2-adjacent promotion", () => {
    const valid = loadJson("evidence-readiness.json");
    expect(validatePairedTNumericalReadinessCandidate(valid as never)).toEqual([]);

    const demoted = structuredClone(valid);
    demoted.tail_numerical_selection_candidate.m2_closed = false;
    demoted.tail_numerical_selection_candidate.independent_selection_review_complete = false;
    demoted.p_value_enclosure_evidence.closure = "incomplete";
    expect(validatePairedTNumericalReadinessCandidate(demoted as never)).not.toEqual([]);

    const promoted = structuredClone(valid);
    promoted.numerical_contract_frozen = true;
    promoted.supported_domain = { degrees_of_freedom_max: 200 };
    promoted.comparison_tolerances = { p_value: 1 };
    promoted.tail_numerical_selection_candidate.supported_degrees_of_freedom_max = 200;
    promoted.tail_numerical_selection_candidate.supported_platform_matrix = "selected";
    promoted.tail_numerical_selection_candidate.supported_execution_predicate_selected = true;
    promoted.tail_numerical_selection_candidate.supported_domain_claimed = true;
    promoted.tail_numerical_selection_candidate.runtime_support_enabled = true;
    expect(validatePairedTNumericalReadinessCandidate(promoted as never)).not.toEqual([]);
  });

  it("keeps fixed-95, CI, support, runtime, and final reason codes open", () => {
    const readiness = loadJson("evidence-readiness.json");
    expect(readiness.fixed_95_critical_value_evidence.closure).toBe("incomplete");
    expect(readiness.g4_actual_execution_trace_candidate.confidence_interval_trace_composition_complete).toBe(
      false,
    );
    expect(readiness.supported_domain).toBeNull();
    expect(readiness.comparison_tolerances).toBeNull();
    expect(readiness.numerical_contract_frozen).toBe(false);
    expect(readiness.supported_execution_predicate_candidate.supported_execution_predicate_selected).toBe(
      false,
    );
    expect(readiness.supported_execution_predicate_candidate.runtime_support_enabled).toBe(false);
    expect(readiness.runtime_input_reason_code_candidate.final_reason_codes_frozen).toBe(false);
  });

  it("fails closed on hidden properties and accessors without invoking getters", () => {
    const tail = loadJson("tail-numerical-selection-candidate.json");
    Object.defineProperty(tail, "hidden_support", { value: true, enumerable: false });
    expect(validatePairedTTailNumericalSelectionCandidate(tail)).not.toEqual([]);

    const pValue = loadJson("p-value-enclosure-evidence-closure-candidate.json");
    let getterCalls = 0;
    Object.defineProperty(pValue, "m2_closed", {
      enumerable: true,
      configurable: true,
      get() {
        getterCalls += 1;
        return true;
      },
    });
    expect(validatePairedTPValueEnclosureEvidenceClosureCandidate(pValue)).not.toEqual([]);
    expect(getterCalls).toBe(0);
  });
});
