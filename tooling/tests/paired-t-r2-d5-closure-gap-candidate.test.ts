import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { validatePairedTR2D5ClosureGapCandidate } from "../src/spikes/paired-t-r2-d5-closure-gap-candidate.js";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const checkpointPath = path.join(
  repositoryRoot,
  "governance/drafts/release-2-candidate/numerical/r2-d5-closure-gap-candidate.json",
);

type MutableJson = Record<string, any>;

function loadCheckpoint(): MutableJson {
  return JSON.parse(readFileSync(checkpointPath, "utf8")) as MutableJson;
}

describe("paired-t R2-D5 closure-gap checkpoint", () => {
  it("pins completed numerical readiness and the remaining dependency order without promotion", () => {
    const candidate = loadCheckpoint();
    expect(validatePairedTR2D5ClosureGapCandidate(candidate)).toEqual([]);
    expect(candidate).toMatchObject({
      status: "non_authoritative_candidate",
      issuance: "unissued",
      decision_state: "closure_gap_dependency_inventory_pending_independent_review",
      independent_review: "pending",
      final_r2_d5_disposition: "pending_public_review_and_evidence_closure",
      r2_d5_complete: false,
      rfc_boundary: {
        state: "open",
        public_review_window: "open",
        earliest_decision_at: "2026-09-25T20:52:54Z",
        authoritative_decision_allowed_by_this_checkpoint: false,
      },
      m3_d_candidate_disposition: {
        selected: {
          pull_request: 108,
          role: "sole_m3_d_candidate",
        },
        not_selected_alternative: {
          pull_request: 110,
          merged: false,
          selected: false,
          implementation_paths_present: false,
        },
      },
      non_promotions: {
        numerical_contract_frozen: false,
        supported_degrees_of_freedom_maximum: null,
        supported_platform_matrix: "pending",
        runtime_allowlist_entries: [],
        controlled_process_profile_enforced: false,
        supported_execution_predicate: "unselected",
        supported_domain: false,
        runtime_support: false,
        final_reason_codes_frozen: false,
        public_check: "unissued",
        supported_bundle: "unissued",
        r2_d5: "incomplete",
        release_2: "incomplete",
      },
    });

    expect(
      candidate.completed_candidate_readiness.map((item: MutableJson) => [
        item.ordinal,
        item.readiness_key,
        item.state,
      ]),
    ).toEqual([
      [1, "g4_algebraic_actual_trace_and_mathematical_truth", "independently_reviewed_complete"],
      [2, "student_t_tail_numerical_m2", "closed"],
      [3, "fixed_95_confidence_interval_numerical_m3", "closed"],
      [
        4,
        "p_value_and_fixed_95_oracle_evidence",
        "independently_reviewed_complete_for_candidate_readiness",
      ],
      [5, "tail_only_supported_execution_implementation", "independently_reviewed_complete"],
      [
        6,
        "runtime_input_parser_and_operation_stage_reason_inventory",
        "independently_reviewed_complete",
      ],
    ]);

    expect(
      candidate.ordered_remaining_decision_groups.map((group: MutableJson) => [
        group.ordinal,
        group.decision_group,
      ]),
    ).toEqual([
      [1, "candidate_supported_scope_and_resource_bounds"],
      [2, "runtime_numerical_contract_and_full_trace_predicate"],
      [3, "supported_execution_admission"],
      [4, "final_reason_code_inventory"],
      [5, "final_r2_d5_review_and_disposition"],
    ]);
    expect(
      candidate.ordered_remaining_decision_groups.every(
        (group: MutableJson) => group.selection_made_by_this_checkpoint === false,
      ),
    ).toBe(true);
  });

  it("rejects source substitution, milestone demotion, and M3-D candidate conflict", () => {
    const commit = loadCheckpoint();
    commit.source_snapshot.repository_commit = "0".repeat(40);
    expect(validatePairedTR2D5ClosureGapCandidate(commit)).not.toEqual([]);

    const blob = loadCheckpoint();
    blob.source_snapshot.bindings[1].blob = "0".repeat(40);
    expect(validatePairedTR2D5ClosureGapCandidate(blob)).not.toEqual([]);

    const demoted = loadCheckpoint();
    demoted.completed_candidate_readiness[1].state = "incomplete";
    expect(validatePairedTR2D5ClosureGapCandidate(demoted)).not.toEqual([]);

    const competingCandidate = loadCheckpoint();
    competingCandidate.m3_d_candidate_disposition.selected.pull_request = 110;
    competingCandidate.m3_d_candidate_disposition.selected.candidate_key =
      competingCandidate.m3_d_candidate_disposition.not_selected_alternative.candidate_key;
    competingCandidate.m3_d_candidate_disposition.selected.reviewed_commit =
      competingCandidate.m3_d_candidate_disposition.not_selected_alternative.reviewed_commit;
    expect(validatePairedTR2D5ClosureGapCandidate(competingCandidate)).not.toEqual([]);

    const mergedAlternative = loadCheckpoint();
    mergedAlternative.m3_d_candidate_disposition.not_selected_alternative.merged = true;
    mergedAlternative.m3_d_candidate_disposition.not_selected_alternative.selected = true;
    mergedAlternative.m3_d_candidate_disposition.not_selected_alternative.implementation_paths_present = true;
    expect(validatePairedTR2D5ClosureGapCandidate(mergedAlternative)).not.toEqual([]);
  });

  it("rejects dependency weakening, stale-label rollback, observation promotion, and closure claims", () => {
    const reordered = loadCheckpoint();
    [
      reordered.ordered_remaining_decision_groups[0],
      reordered.ordered_remaining_decision_groups[1],
    ] = [
      reordered.ordered_remaining_decision_groups[1],
      reordered.ordered_remaining_decision_groups[0],
    ];
    expect(validatePairedTR2D5ClosureGapCandidate(reordered)).not.toEqual([]);

    const weakenedDependency = loadCheckpoint();
    weakenedDependency.ordered_remaining_decision_groups[2].depends_on = [];
    expect(validatePairedTR2D5ClosureGapCandidate(weakenedDependency)).not.toEqual([]);

    const selectedEarly = loadCheckpoint();
    selectedEarly.ordered_remaining_decision_groups[1].selection_made_by_this_checkpoint = true;
    expect(validatePairedTR2D5ClosureGapCandidate(selectedEarly)).not.toEqual([]);

    const staleRollback = loadCheckpoint();
    staleRollback.historical_dependency_label_classification[4].current_classification =
      "still_waiting_for_primary_source_research";
    expect(validatePairedTR2D5ClosureGapCandidate(staleRollback)).not.toEqual([]);

    const observationPromotion = loadCheckpoint();
    observationPromotion.finite_observations_not_bounds[5].eligible_as_global_or_supported_bound = true;
    expect(validatePairedTR2D5ClosureGapCandidate(observationPromotion)).not.toEqual([]);

    const closed = loadCheckpoint();
    closed.independent_review = "complete";
    closed.final_r2_d5_disposition = "approved";
    closed.r2_d5_complete = true;
    expect(validatePairedTR2D5ClosureGapCandidate(closed)).not.toEqual([]);
  });

  it("rejects support, runtime, numerical-contract, reason-code, and authority promotion", () => {
    const promoted = loadCheckpoint();
    const nonPromotions = promoted.non_promotions;
    nonPromotions.numerical_contract_frozen = true;
    nonPromotions.supported_pair_count_maximum = 201;
    nonPromotions.supported_input_value_bound = 1e150;
    nonPromotions.supported_test_statistic_bound = 50.4;
    nonPromotions.supported_degrees_of_freedom_maximum = 200;
    nonPromotions.supported_trace_resource_bound = 100000;
    nonPromotions.supported_platform_matrix = "selected";
    nonPromotions.runtime_allowlist_entries = ["node-v22-linux-x64"];
    nonPromotions.controlled_process_profile_enforced = true;
    nonPromotions.supported_execution_predicate = "selected";
    nonPromotions.supported_domain = true;
    nonPromotions.runtime_support = true;
    nonPromotions.input_specific_tail_truth_error_contract_selected_for_runtime = true;
    nonPromotions.final_protocol_fixed_95_table_selected = true;
    nonPromotions.final_protocol_fixed_95_table_content_hash = `sha256:${"0".repeat(64)}`;
    nonPromotions.global_student_t_truth_error_constant = 2978;
    nonPromotions.global_confidence_interval_error_constant = 374;
    nonPromotions.comparison_tolerances = { p_value: 1e-12 };
    nonPromotions.final_reason_codes_frozen = true;
    nonPromotions.public_check = "issued";
    nonPromotions.supported_bundle = "issued";
    nonPromotions.r2_d5 = "complete";
    nonPromotions.release_2 = "complete";
    expect(validatePairedTR2D5ClosureGapCandidate(promoted)).not.toEqual([]);
  });

  it("fails closed on hidden, symbolic, accessor, sparse, extended, proxy, and cyclic data", () => {
    const hidden = loadCheckpoint();
    Object.defineProperty(hidden, "hidden_support", { value: true, enumerable: false });
    expect(validatePairedTR2D5ClosureGapCandidate(hidden)).not.toEqual([]);

    const symbol = loadCheckpoint();
    (symbol as Record<PropertyKey, unknown>)[Symbol("support")] = true;
    expect(validatePairedTR2D5ClosureGapCandidate(symbol)).not.toEqual([]);

    const accessor = loadCheckpoint();
    let getterCalls = 0;
    Object.defineProperty(accessor, "r2_d5_complete", {
      enumerable: true,
      configurable: true,
      get() {
        getterCalls += 1;
        return true;
      },
    });
    expect(validatePairedTR2D5ClosureGapCandidate(accessor)).not.toEqual([]);
    expect(getterCalls).toBe(0);

    const sparse = loadCheckpoint();
    sparse.ordered_remaining_decision_groups.length += 1;
    expect(validatePairedTR2D5ClosureGapCandidate(sparse)).not.toEqual([]);

    const extended = loadCheckpoint();
    extended.source_snapshot.bindings.extra = "hidden binding";
    expect(validatePairedTR2D5ClosureGapCandidate(extended)).not.toEqual([]);

    const proxy = new Proxy(loadCheckpoint(), {
      ownKeys() {
        throw new Error("hostile ownKeys");
      },
    });
    expect(() => validatePairedTR2D5ClosureGapCandidate(proxy)).not.toThrow();
    expect(validatePairedTR2D5ClosureGapCandidate(proxy)).not.toEqual([]);

    const nestedProxy = loadCheckpoint();
    nestedProxy.source_snapshot = new Proxy(nestedProxy.source_snapshot, {
      getOwnPropertyDescriptor() {
        throw new Error("hostile descriptor");
      },
    });
    expect(() => validatePairedTR2D5ClosureGapCandidate(nestedProxy)).not.toThrow();
    expect(validatePairedTR2D5ClosureGapCandidate(nestedProxy)).not.toEqual([]);

    const cyclic = loadCheckpoint();
    cyclic.cycle = cyclic;
    expect(validatePairedTR2D5ClosureGapCandidate(cyclic)).not.toEqual([]);

    const customPrototype = loadCheckpoint();
    Object.setPrototypeOf(customPrototype, { selected: true });
    expect(validatePairedTR2D5ClosureGapCandidate(customPrototype)).not.toEqual([]);
  });
});
