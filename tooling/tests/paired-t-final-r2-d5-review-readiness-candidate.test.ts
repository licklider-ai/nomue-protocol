import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { validatePairedTFinalR2D5ReviewReadinessCandidate } from "../src/spikes/paired-t-final-r2-d5-review-readiness-candidate.js";

const root = process.cwd();
const candidatePath = path.join(
  root,
  "governance/drafts/release-2-candidate/numerical/final-r2-d5-review-readiness-candidate.json",
);
const numericalRoot = path.join(root, "governance/drafts/release-2-candidate/numerical");

function loadJson(file: string): Record<string, any> {
  return JSON.parse(readFileSync(file, "utf8")) as Record<string, any>;
}

function clone<T>(value: T): T {
  return structuredClone(value);
}

function gitBlobSha1(bytes: Buffer): string {
  return createHash("sha1")
    .update(Buffer.from(`blob ${bytes.length}\0`))
    .update(bytes)
    .digest("hex");
}

function sha256(bytes: Buffer): string {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function canonicalSha256(value: unknown): string {
  const canonicalize = (item: unknown): unknown => {
    if (Array.isArray(item)) return item.map(canonicalize);
    if (typeof item !== "object" || item === null) return item;
    return Object.fromEntries(
      Object.keys(item)
        .sort()
        .map((key) => [key, canonicalize((item as Record<string, unknown>)[key])]),
    );
  };
  return `sha256:${createHash("sha256")
    .update(JSON.stringify(canonicalize(value)), "utf8")
    .digest("hex")}`;
}

describe("paired-t final R2-D5 review-readiness candidate", () => {
  it("accepts the exact pre-disposition package and keeps final authority blocked", () => {
    const candidate = loadJson(candidatePath);
    expect(validatePairedTFinalR2D5ReviewReadinessCandidate(candidate)).toEqual([]);
    expect(canonicalSha256(candidate)).toBe(
      "sha256:b7be0a3716ab5ebad2bc8029ab6ffb8708c77917949afcb48b7fe1641f680608",
    );
    expect(candidate).toMatchObject({
      status: "non_authoritative_candidate",
      issuance: "unissued",
      decision_group: "final_r2_d5_review_and_disposition",
      decision_state: "final_r2_d5_review_readiness_package_pending_independent_review",
      review_readiness_package_assembled: true,
      selection_made_by_this_checkpoint: false,
      independent_review: "pending",
      r2_d5_complete: false,
    });
    expect(candidate.rfc_boundary).toEqual({
      state: "open",
      public_review_window: "open",
      opened_at: "2026-08-26T20:52:54Z",
      earliest_decision_at: "2026-09-25T20:52:54Z",
      candidate_review_allowed_before_earliest_decision: true,
      steward_disposition_allowed_by_this_checkpoint: false,
      final_r2_d5_disposition: "blocked_by_rfc_window",
    });
    expect(Object.values(candidate.non_promotions)).not.toContain(true);
  });

  it("binds every source-snapshot entry to the current repository bytes", () => {
    const candidate = loadJson(candidatePath);
    expect(candidate.source_snapshot).toMatchObject({
      commit: "c1fc9985a9a6d989ba6985bc0d103463f86e6840",
      tree: "67c7d7fab28b7d0687d351f598ec152f39879ea9",
      binding_algorithm: "git_blob_sha1",
    });
    expect(candidate.source_snapshot.bindings).toHaveLength(18);
    for (const binding of candidate.source_snapshot.bindings) {
      const bytes = readFileSync(path.join(root, binding.path));
      expect(gitBlobSha1(bytes), binding.path).toBe(binding.blob);
    }
  });

  it("pins the four preserved non-authoritative closure milestones in order", () => {
    const candidate = loadJson(candidatePath);
    expect(candidate.prerequisite_candidate_closures).toHaveLength(4);
    expect(
      candidate.prerequisite_candidate_closures.map(
        (entry: Record<string, unknown>) => entry.decision_group,
      ),
    ).toEqual([
      "candidate_supported_scope_and_resource_bounds",
      "runtime_numerical_contract_and_full_trace_predicate",
      "supported_execution_admission",
      "final_reason_code_inventory",
    ]);
    for (const entry of candidate.prerequisite_candidate_closures) {
      expect(entry.state).toBe("reviewed_non_authoritative_candidate_closure");
      expect(entry.unresolved_review_findings).toBe(0);
      const checkpoint = readFileSync(path.join(root, entry.checkpoint));
      const result = readFileSync(path.join(root, entry.closure_review_result), "utf8");
      expect(gitBlobSha1(checkpoint)).toBe(entry.checkpoint_blob);
      expect(gitBlobSha1(Buffer.from(result, "utf8"))).toBe(entry.closure_review_result_blob);
      expect(result).toContain("GO");
      expect(result).toContain(entry.closure_reviewed_head);
    }
  });

  it("reconstructs selected-domain boundary and metamorphic coverage", () => {
    const candidate = loadJson(candidatePath);
    const corpus = loadJson(
      path.join(numericalRoot, "candidate-supported-scope-resource-corpus.json"),
    );
    const operationBoundaries = loadJson(
      path.join(numericalRoot, "support-domain-boundary-cases.json"),
    );
    const tailCases = loadJson(path.join(root, "tooling/r2-paired-t-runtime-series/cases.json"));
    const transitions = loadJson(
      path.join(root, "tooling/r2-paired-t-runtime-series/truth-boundary-cases.json"),
    );
    const coverage =
      candidate.selected_domain_oracle_boundary_and_metamorphic_evidence
        .boundary_and_metamorphic_corpus;

    expect(
      corpus.generated_pair_df_sweep.pair_count_maximum -
        corpus.generated_pair_df_sweep.pair_count_minimum +
        1,
    ).toBe(coverage.inclusive_pair_df_sweep_case_count);
    expect(operationBoundaries.cases).toHaveLength(
      coverage.reviewed_operation_stage_boundary_case_count,
    );
    expect(tailCases.cases).toHaveLength(coverage.reviewed_tail_truth_case_count);
    expect(transitions.degrees_of_freedom).toEqual(
      coverage.projection_transition_degrees_of_freedom,
    );
    expect(
      transitions.transition_families.map((entry: Record<string, string>) => entry.transition_key),
    ).toEqual(coverage.projection_transition_families);
    expect(corpus.resource_boundary_cases).toHaveLength(coverage.resource_boundary_case_count);
    expect(corpus.metamorphic_transformations).toHaveLength(coverage.metamorphic_relation_count);
    expect(
      corpus.metamorphic_transformations.map(
        (entry: Record<string, string>) => entry.transformation_key,
      ),
    ).toEqual(coverage.metamorphic_relations);
    expect(coverage).toMatchObject({
      finite_corpus_defines_supported_domain: false,
      finite_corpus_maximum_is_global_bound: false,
      unexercised_input_requires_same_per_input_checks: true,
    });
  });

  it("synchronizes the selected numerical contract and table identities without freezing them", () => {
    const candidate = loadJson(candidatePath);
    const group2 = loadJson(
      path.join(numericalRoot, "runtime-numerical-contract-full-trace-candidate.json"),
    );
    const summary =
      candidate.selected_domain_oracle_boundary_and_metamorphic_evidence.runtime_numerical_contract;
    const selected = group2.selected_runtime_numerical_contract_candidate;
    const predicate = group2.selected_full_trace_predicate_candidate;

    expect(selected.operation_graph.ordered_stages).toHaveLength(summary.ordered_stage_count);
    expect(predicate.required_same_trace_bindings).toHaveLength(summary.same_trace_binding_count);
    expect(selected.table_selection.tail_inverse_beta_content_hash).toBe(
      summary.tail_table_content_sha256,
    );
    expect(selected.table_selection.fixed_95_ordered_cell_content_hash).toBe(
      summary.fixed_95_ordered_cell_content_sha256,
    );
    expect(sha256(readFileSync(path.join(root, summary.tail_table)))).toBe(
      summary.tail_table_content_sha256,
    );
    expect(selected.table_selection.authoritative_protocol_table_selected).toBe(false);
    expect(selected.truth_and_projection.global_truth_error_constant_selected).toBe(false);
    expect(selected.comparison_contract.quantity_specific_tolerances).toBeNull();
  });

  it("pins the exact one-tuple evidence and complete unissued reason inventory", () => {
    const candidate = loadJson(candidatePath);
    const group3 = loadJson(
      path.join(numericalRoot, "supported-execution-selection-candidate.json"),
    );
    const group4 = loadJson(path.join(numericalRoot, "final-reason-code-inventory-candidate.json"));
    const execution = candidate.supported_execution_evidence;
    const reasons = candidate.final_reason_code_inventory_evidence;

    expect(group3.candidate_supported_platform_matrix.entries).toHaveLength(execution.entry_count);
    expect(group3.candidate_supported_platform_matrix.entries[0]).toMatchObject(execution.tuple);
    expect(group3.candidate_controlled_process_profile.profile_key).toBe(
      execution.controlled_process_profile,
    );
    expect(sha256(readFileSync(path.join(root, execution.durable_artifact_manifest)))).toBe(
      execution.durable_artifact_manifest_sha256,
    );
    expect(group3.candidate_supported_platform_matrix.broad_cross_platform_support_claimed).toBe(
      false,
    );
    expect(group4.inventory_completeness).toMatchObject({
      candidate_public_check_count: reasons.candidate_public_check_count,
      record_level_reason_mapping_count: reasons.record_level_reason_mapping_count,
      relationship_source_classification_count: reasons.relationship_reason_mapping_count,
      retained_operation_stage_reason_code_candidate_count:
        reasons.retained_operation_stage_reason_code_candidate_count,
      declared_result_comparison_mapping_count: reasons.declared_result_comparison_mapping_count,
      resolved_support_dependent_reason_code_decision_count:
        reasons.resolved_support_dependent_reason_code_decision_count,
      unresolved_support_dependent_reason_code_decision_count:
        reasons.unresolved_support_dependent_reason_code_decision_count,
    });
    expect(reasons).toMatchObject({
      reason_codes_frozen: false,
      reason_codes_or_public_checks_issued: false,
    });
  });

  it("rejects semantic mutations and every premature final disposition", () => {
    const candidate = loadJson(candidatePath);
    const mutations: Array<(value: Record<string, any>) => void> = [
      (value) => (value.status = "authoritative"),
      (value) => (value.issuance = "issued"),
      (value) => (value.decision_state = "approved"),
      (value) => (value.selection_made_by_this_checkpoint = true),
      (value) => (value.independent_review = "complete"),
      (value) => (value.r2_d5_complete = true),
      (value) => (value.source_snapshot.commit = "0".repeat(40)),
      (value) => (value.source_snapshot.tree = "0".repeat(40)),
      (value) => value.source_snapshot.bindings.pop(),
      (value) => value.source_snapshot.bindings.reverse(),
      (value) => (value.source_snapshot.bindings[0].blob = "0".repeat(40)),
      (value) => (value.prerequisite_candidate_closures[0].state = "open"),
      (value) => (value.prerequisite_candidate_closures[1].closure_reviewed_head = "0".repeat(40)),
      (value) => (value.prerequisite_candidate_closures[2].unresolved_review_findings = 1),
      (value) =>
        (value.prerequisite_candidate_closures[3].closure_preservation_merge = "0".repeat(40)),
      (value) => (value.checkpoint_synchronization.durable_review_results_rewritten = true),
      (value) =>
        (value.checkpoint_synchronization.candidate_values_reselected_by_this_increment = true),
      (value) =>
        (value.selected_domain_oracle_boundary_and_metamorphic_evidence.selected_domain_candidate.pair_count_maximum = 202),
      (value) =>
        (value.selected_domain_oracle_boundary_and_metamorphic_evidence.selected_domain_candidate.degrees_of_freedom_maximum = 201),
      (value) =>
        (value.selected_domain_oracle_boundary_and_metamorphic_evidence.boundary_and_metamorphic_corpus.inclusive_pair_df_sweep_case_count = 201),
      (value) =>
        value.selected_domain_oracle_boundary_and_metamorphic_evidence.boundary_and_metamorphic_corpus.metamorphic_relations.pop(),
      (value) =>
        (value.selected_domain_oracle_boundary_and_metamorphic_evidence.boundary_and_metamorphic_corpus.finite_corpus_defines_supported_domain = true),
      (value) =>
        (value.selected_domain_oracle_boundary_and_metamorphic_evidence.runtime_numerical_contract.tail_table_content_sha256 =
          "sha256:" + "0".repeat(64)),
      (value) =>
        (value.selected_domain_oracle_boundary_and_metamorphic_evidence.runtime_numerical_contract.global_truth_error_constant_selected = true),
      (value) =>
        (value.selected_domain_oracle_boundary_and_metamorphic_evidence.resource_envelope.tail_trace_node_maximum = 72567),
      (value) => (value.supported_execution_evidence.entry_count = 2),
      (value) => (value.supported_execution_evidence.tuple.platform = "darwin"),
      (value) => (value.supported_execution_evidence.broad_cross_platform_support_claimed = true),
      (value) =>
        (value.final_reason_code_inventory_evidence.unresolved_support_dependent_reason_code_decision_count = 1),
      (value) => (value.final_reason_code_inventory_evidence.reason_codes_frozen = true),
      (value) => (value.final_review_requirements.exact_head_numerical_review_required = false),
      (value) =>
        (value.final_review_requirements.steward_disposition_is_separate_post_window_increment = false),
      (value) => (value.rfc_boundary.state = "closed"),
      (value) => (value.rfc_boundary.earliest_decision_at = "2026-09-02T00:00:00Z"),
      (value) => (value.rfc_boundary.steward_disposition_allowed_by_this_checkpoint = true),
      (value) => (value.rfc_boundary.final_r2_d5_disposition = "approved"),
      (value) => (value.non_promotions.numerical_contract_frozen = true),
      (value) => (value.non_promotions.supported_domain = true),
      (value) => (value.non_promotions.runtime_support = true),
      (value) => (value.non_promotions.public_checks_issued = true),
      (value) => (value.non_promotions.r2_d5 = "complete"),
      (value) =>
        (value.finite_observations_not_bounds[0].eligible_as_global_or_supported_bound = true),
      (value) => ((value as Record<string, unknown>).extra = true),
    ];
    for (const mutate of mutations) {
      const changed = clone(candidate);
      mutate(changed);
      expect(validatePairedTFinalR2D5ReviewReadinessCandidate(changed)).toEqual([
        "final R2-D5 review-readiness checkpoint differs from the exact candidate",
      ]);
    }
  });

  it("fails closed on hostile shapes without invoking caller getters or leaking", () => {
    const candidate = loadJson(candidatePath);
    let getterCalls = 0;
    const hidden = clone(candidate);
    Object.defineProperty(hidden, "hidden", { value: true, enumerable: false });
    const symbol = clone(candidate);
    Object.defineProperty(symbol, Symbol("hidden"), { value: true, enumerable: true });
    const accessor = clone(candidate);
    Object.defineProperty(accessor, "accessor", {
      enumerable: true,
      get() {
        getterCalls += 1;
        return true;
      },
    });
    const sparse = clone(candidate);
    sparse.prerequisite_candidate_closures.length += 1;
    const extended = clone(candidate);
    extended.prerequisite_candidate_closures.extra = true;
    const cycle = clone(candidate);
    cycle.cycle = cycle;
    const nonPlain = Object.assign(Object.create(null), clone(candidate));
    const throwingProxy = new Proxy(clone(candidate), {
      ownKeys() {
        throw new Error("trap");
      },
    });
    const hostile: unknown[] = [
      hidden,
      symbol,
      accessor,
      sparse,
      extended,
      cycle,
      nonPlain,
      throwingProxy,
      { ...clone(candidate), nonfinite: Number.NaN },
      { ...clone(candidate), infinite: Number.POSITIVE_INFINITY },
      { ...clone(candidate), negativeZero: -0 },
      { ...clone(candidate), bigint: 1n },
      { ...clone(candidate), callback: () => true },
      null,
      "candidate",
      [],
    ];
    for (const value of hostile) {
      expect(() => validatePairedTFinalR2D5ReviewReadinessCandidate(value)).not.toThrow();
      expect(validatePairedTFinalR2D5ReviewReadinessCandidate(value)).toEqual([
        "final R2-D5 review-readiness checkpoint differs from the exact candidate",
      ]);
    }
    expect(getterCalls).toBe(0);
  });

  it("treats object-key order as non-semantic while pinning array order", () => {
    const candidate = loadJson(candidatePath);
    const reordered = Object.fromEntries(Object.entries(candidate).reverse());
    expect(validatePairedTFinalR2D5ReviewReadinessCandidate(reordered)).toEqual([]);
    const arrayReordered = clone(candidate);
    arrayReordered.prerequisite_candidate_closures.reverse();
    expect(validatePairedTFinalR2D5ReviewReadinessCandidate(arrayReordered)).not.toEqual([]);
  });
});
