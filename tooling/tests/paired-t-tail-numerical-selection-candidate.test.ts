import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  validatePairedTTailNumericalSelectionCandidate,
  type PairedTTailNumericalSelectionCandidate,
} from "../src/spikes/paired-t-tail-numerical-selection-candidate.js";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const checkpointPath = path.join(
  repositoryRoot,
  "governance/drafts/release-2-candidate/numerical/tail-numerical-selection-candidate.json",
);

function loadCheckpoint(): PairedTTailNumericalSelectionCandidate {
  return JSON.parse(readFileSync(checkpointPath, "utf8")) as PairedTTailNumericalSelectionCandidate;
}

describe("paired-t tail numerical selection candidate", () => {
  it("selects the input-specific contract without closing M2 or runtime support", () => {
    const candidate = loadCheckpoint();
    expect(validatePairedTTailNumericalSelectionCandidate(candidate)).toEqual([]);
    expect(candidate).toMatchObject({
      decision_state: "independently_reviewed_input_specific_bound_selection",
      m2_closed: true,
      runtime_support_enabled: false,
      supported_domain_claimed: false,
      truth_error_contract: {
        input_specific_bound_selected_for_tail_numerical_contract: true,
        global_constant_bound_required_for_tail_numerical_closure: false,
        global_constant_truth_error_bound_selected: false,
        finite_corpus_maximum_is_a_bound: false,
      },
      closure_state: {
        independent_selection_review: "complete",
        supported_degrees_of_freedom_maximum: null,
        supported_platform_matrix: "pending",
        supported_execution_predicate: "unselected",
        supported_domain: false,
        runtime_support: false,
      },
    });
  });

  it("pins the reviewed table, trace, termination, remainder, and projection bindings", () => {
    expect(loadCheckpoint()).toMatchObject({
      graph_and_table_binding: {
        reviewed_inverse_beta_table_hash:
          "sha256:ba1f992199e9e153956589d62dcf5a6509575100bb7c923c170bfa45fdd76c08",
        one_actual_immutable_trace_required: true,
        exact_primitive_verification_required: true,
        supported_execution_predicate_selected: false,
      },
      series_closure: {
        non_series_branches: "reviewed_exact_zero_and_df2_closed_form_proof_paths",
        termination_observation:
          "next_sum_binary64_bits_equal_current_sum_binary64_bits_before_iteration_cap",
        central_remainder: "next_term_times_two_relative_to_accumulated_sum",
        lower_tail_remainder: "next_term_times_df_plus_one_relative_to_accumulated_sum",
        iteration_cap_failure: "fail_closed_refusal",
        iteration_cap_selected_as_supported_resource_bound: false,
      },
      projection_contract: {
        stability_condition:
          "cells_to_nearest_policy_class_transition_strictly_greater_than_input_specific_bound",
        projection_margin_runtime_activated: false,
      },
    });
  });

  it("rejects selection demotion and support or global-bound promotion", () => {
    const demoted = loadCheckpoint();
    demoted.truth_error_contract.input_specific_bound_selected_for_tail_numerical_contract = false;
    expect(validatePairedTTailNumericalSelectionCandidate(demoted)).not.toEqual([]);

    const promoted = loadCheckpoint();
    promoted.m2_closed = true;
    promoted.runtime_support_enabled = true;
    promoted.supported_domain_claimed = true;
    promoted.truth_error_contract.global_constant_truth_error_bound_selected = true;
    promoted.truth_error_contract.finite_corpus_maximum_is_a_bound = true;
    promoted.graph_and_table_binding.supported_execution_predicate_selected = true;
    promoted.projection_contract.projection_margin_runtime_activated = true;
    expect(validatePairedTTailNumericalSelectionCandidate(promoted)).not.toEqual([]);
  });

  it("fails closed on hostile shapes without invoking caller-provided getters", () => {
    const hidden = loadCheckpoint() as PairedTTailNumericalSelectionCandidate & {
      hidden_support?: boolean;
    };
    Object.defineProperty(hidden, "hidden_support", { value: true, enumerable: false });
    expect(validatePairedTTailNumericalSelectionCandidate(hidden)).not.toEqual([]);

    const symbol = loadCheckpoint() as PairedTTailNumericalSelectionCandidate & {
      [key: symbol]: unknown;
    };
    symbol[Symbol("support")] = true;
    expect(validatePairedTTailNumericalSelectionCandidate(symbol)).not.toEqual([]);

    let getterCalls = 0;
    const accessor = loadCheckpoint();
    Object.defineProperty(accessor, "runtime_support_enabled", {
      enumerable: true,
      get() {
        getterCalls += 1;
        return false;
      },
    });
    expect(validatePairedTTailNumericalSelectionCandidate(accessor)).not.toEqual([]);
    expect(getterCalls).toBe(0);

    const sparse = loadCheckpoint();
    sparse.prohibited_claims.length += 1;
    expect(validatePairedTTailNumericalSelectionCandidate(sparse)).not.toEqual([]);

    const throwingProxy = new Proxy(loadCheckpoint(), {
      ownKeys() {
        throw new Error("hostile ownKeys");
      },
    });
    expect(() => validatePairedTTailNumericalSelectionCandidate(throwingProxy)).not.toThrow();
    expect(validatePairedTTailNumericalSelectionCandidate(throwingProxy)).not.toEqual([]);

    const cyclic = loadCheckpoint() as PairedTTailNumericalSelectionCandidate & { cycle?: unknown };
    cyclic.cycle = cyclic;
    expect(validatePairedTTailNumericalSelectionCandidate(cyclic)).not.toEqual([]);
  });
});
