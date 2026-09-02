import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  resolvePairedTFinalReasonCodeCandidate,
  validatePairedTFinalReasonCodeInventoryCandidate,
} from "../src/spikes/paired-t-final-reason-code-inventory-candidate.js";

const root = process.cwd();
const candidatePath = path.join(
  root,
  "governance/drafts/release-2-candidate/numerical/final-reason-code-inventory-candidate.json",
);
const partialPath = path.join(
  root,
  "governance/drafts/release-2-candidate/numerical/runtime-input-reason-code-candidate.json",
);

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

describe("paired-t final reason-code inventory candidate", () => {
  it("accepts the exact checkpoint and pins candidate boundaries", () => {
    const candidate = loadJson(candidatePath);
    expect(validatePairedTFinalReasonCodeInventoryCandidate(candidate)).toEqual([]);
    expect(candidate).toMatchObject({
      status: "non_authoritative_candidate",
      issuance: "unissued",
      decision_state: "candidate_selection_pending_independent_review",
      selection_made_by_this_checkpoint: true,
      independent_review: "pending",
      group_1_complete: true,
      group_2_complete: true,
      group_3_complete: true,
      group_4_complete: false,
      final_reason_codes_frozen: false,
      authoritative_reason_codes_issued: false,
      supported_domain_claimed: false,
      runtime_support_enabled: false,
    });
    expect(candidate.inventory_completeness).toEqual({
      candidate_public_check_count: 5,
      record_level_reason_mapping_count: 4,
      relationship_source_classification_count: 25,
      retained_operation_stage_reason_code_candidate_count: 11,
      declared_result_comparison_mapping_count: 12,
      resolved_support_dependent_reason_code_decision_count: 10,
      unresolved_support_dependent_reason_code_decision_count: 0,
      runtime_source_classifications_are_routed_or_internal: true,
      candidate_inventory_complete_for_selected_groups_1_through_3: true,
      authoritative_inventory_complete_claimed: false,
    });
  });

  it("binds every source snapshot entry to the actual Git blob bytes", () => {
    const candidate = loadJson(candidatePath);
    expect(candidate.source_snapshot.commit).toBe("005d902635e98bbcfaf5caa0ade4c48204cb4851");
    expect(candidate.source_snapshot.tree).toBe("027f1cd65639f1afe646a0cee31bb9bfbb15430f");
    expect(candidate.source_snapshot.bindings).toHaveLength(24);
    for (const binding of candidate.source_snapshot.bindings) {
      const bytes = readFileSync(path.join(root, binding.path));
      expect(gitBlobSha1(bytes), binding.path).toBe(binding.blob);
    }
  });

  it("retains the independently reviewed eleven operation-stage entries byte-for-byte", () => {
    const candidate = loadJson(candidatePath);
    const partial = loadJson(partialPath);
    expect(candidate.retained_operation_stage_reason_code_candidates).toEqual(
      partial.selected_operation_stage_reason_code_candidates,
    );
  });

  it("covers every relationship classification emitted by the source evaluator", () => {
    const candidate = loadJson(candidatePath);
    const source = readFileSync(
      path.join(root, "tooling/src/spikes/release-2-candidate.ts"),
      "utf8",
    );
    const emitted = [...source.matchAll(/issues\.push\(\{\s*code:\s*"([A-Z_]+)"/g)].map(
      (match) => match[1],
    );
    const mapped = candidate.relationship_reason_mappings.map(
      (entry: Record<string, string>) => entry.source_classification,
    );
    expect([...new Set(emitted)].sort()).toEqual([...mapped].sort());
    expect(mapped).toHaveLength(25);
    expect(new Set(mapped).size).toBe(25);
    expect(candidate.record_level_reason_mappings).toHaveLength(4);
    expect(candidate.check_ownership).toEqual({
      record_level: "candidate_check_key_on_each_mapping",
      relationship_default: "paired_profile_admissibility_check",
      relationship_exception: {
        source_classification: "PAIR_COUNT_BELOW_TWO",
        candidate_check_key: "paired_t_computability_check",
      },
      operation_stage: "candidate_check_key_on_each_retained_entry",
      declared_result_comparison: "paired_t_recompute_check",
      support_dependent_and_runtime: "paired_t_computability_check",
      delegated: "owner_of_delegated_upstream_classification",
      internal_only: "none",
    });
  });

  it("resolves all ten formerly deferred support-dependent decisions", () => {
    const candidate = loadJson(candidatePath);
    const partial = loadJson(partialPath);
    const deferred = partial.deferred_reason_code_decisions.map(
      (entry: Record<string, string>) => entry.source_classification,
    );
    const resolved = candidate.resolved_support_dependent_reason_code_decisions;
    expect(resolved.map((entry: Record<string, string>) => entry.source_classification)).toEqual(
      deferred,
    );
    expect(resolved).toHaveLength(10);
    expect(resolved.every((entry: Record<string, unknown>) => entry.reason_code !== null)).toBe(
      true,
    );
    expect(resolved.every((entry: Record<string, unknown>) => entry.resolved_by !== null)).toBe(
      true,
    );
  });

  it("covers every selected declared-result comparison and interval ordering", () => {
    const candidate = loadJson(candidatePath);
    expect(
      candidate.declared_result_comparison_mappings.map(
        (entry: Record<string, string>) => entry.result_path,
      ),
    ).toEqual([
      "pair_summary.n_pairs",
      "pair_summary.mean_difference",
      "pair_summary.sample_variance_difference",
      "effect_estimate.estimate",
      "effect_estimate.standard_error",
      "effect_estimate.confidence_interval.confidence_level",
      "effect_estimate.confidence_interval.lower",
      "effect_estimate.confidence_interval.upper",
      "test.test_statistic",
      "test.degrees_of_freedom",
      "test.p_value",
      "effect_estimate.confidence_interval.lower_upper_order",
    ]);
  });

  it("reuses only registered codes and keeps new candidate codes collision-free", () => {
    const candidate = loadJson(candidatePath);
    const registry = readFileSync(path.join(root, "registries/reason-codes.yaml"), "utf8");
    const registered = new Set(
      [...registry.matchAll(/^\s*- id:\s+(NRS-[A-Z0-9-]+)\s*$/gm)].map((match) => match[1]),
    );
    const entries = [
      ...candidate.record_level_reason_mappings,
      ...candidate.relationship_reason_mappings,
      ...candidate.declared_result_comparison_mappings,
      ...candidate.resolved_support_dependent_reason_code_decisions,
      ...candidate.runtime_classification_routing.filter(
        (entry: Record<string, unknown>) => typeof entry.reason_code === "string",
      ),
      ...candidate.retained_operation_stage_reason_code_candidates.map(
        (entry: Record<string, string>) => ({
          reason_code: entry.candidate_reason_code,
          reason_code_state: entry.state,
        }),
      ),
    ];
    for (const entry of entries) {
      if (entry.reason_code_state === "registered_reuse") {
        expect(registered.has(entry.reason_code), entry.reason_code).toBe(true);
      } else {
        expect(registered.has(entry.reason_code), entry.reason_code).toBe(false);
      }
    }
    expect(registered.has(candidate.internal_failure_reason_code.reason_code)).toBe(true);
  });

  it("provides deterministic exact-checkpoint routing and fails closed on unknown input", () => {
    const candidate = loadJson(candidatePath);
    expect(resolvePairedTFinalReasonCodeCandidate(candidate, "PAIR_COUNT_BELOW_TWO")).toEqual({
      classification: "PAIR_COUNT_BELOW_TWO",
      disposition: "reason_code",
      reasonCode: "NRS-PAIRED-T-PAIR-COUNT-BELOW-TWO",
      reasonCodeState: "candidate_unissued",
      routing: null,
    });
    expect(resolvePairedTFinalReasonCodeCandidate(candidate, "runtime_graph_refusal")).toEqual({
      classification: "runtime_graph_refusal",
      disposition: "delegate",
      reasonCode: null,
      reasonCodeState: null,
      routing: "delegate_to_graph_classification",
    });
    expect(resolvePairedTFinalReasonCodeCandidate(candidate, "invalid_candidate_input")).toEqual({
      classification: "invalid_candidate_input",
      disposition: "internal_only",
      reasonCode: null,
      reasonCodeState: null,
      routing: "not_record_caused",
    });
    expect(resolvePairedTFinalReasonCodeCandidate(candidate, "UNKNOWN_NEW_FAILURE")).toBeNull();
    const changed = clone(candidate);
    changed.group_4_complete = true;
    expect(resolvePairedTFinalReasonCodeCandidate(changed, "PAIR_COUNT_BELOW_TWO")).toBeNull();
  });

  it("rejects semantic promotion and inventory mutations", () => {
    const candidate = loadJson(candidatePath);
    const attacks: Array<(value: Record<string, any>) => void> = [
      (value) => (value.issuance = "issued"),
      (value) => (value.independent_review = "complete"),
      (value) => (value.group_4_complete = true),
      (value) => (value.final_reason_codes_frozen = true),
      (value) => (value.authoritative_reason_codes_issued = true),
      (value) => (value.supported_domain_claimed = true),
      (value) => (value.runtime_support_enabled = true),
      (value) => value.relationship_reason_mappings.pop(),
      (value) => value.relationship_reason_mappings.reverse(),
      (value) =>
        (value.relationship_reason_mappings[0].reason_code = "NRS-INTERNAL-VERIFIER-ERROR"),
      (value) => value.retained_operation_stage_reason_code_candidates.pop(),
      (value) => (value.retained_operation_stage_reason_code_candidates[0].state = "issued"),
      (value) => value.declared_result_comparison_mappings.pop(),
      (value) => value.resolved_support_dependent_reason_code_decisions.pop(),
      (value) => (value.resolved_support_dependent_reason_code_decisions[0].reason_code = null),
      (value) => (value.source_snapshot.bindings[0].blob = "0".repeat(40)),
      (value) => value.candidate_public_check_order.reverse(),
      (value) => (value.non_promotions.r2_d5_complete = true),
      (value) => (value.downstream_ordering.earliest_rfc_decision = "2026-09-02T00:00:00Z"),
      (value) => (value.extra = true),
    ];
    for (const attack of attacks) {
      const changed = clone(candidate);
      attack(changed);
      expect(validatePairedTFinalReasonCodeInventoryCandidate(changed)).toEqual([
        "final reason-code inventory checkpoint differs from the exact candidate",
      ]);
    }
  });

  it("rejects hostile JavaScript shapes without invoking caller getters", () => {
    const candidate = loadJson(candidatePath);
    let getterCalls = 0;
    const hidden = clone(candidate);
    Object.defineProperty(hidden, "hidden", { value: true, enumerable: false });
    const symbol = clone(candidate);
    Object.defineProperty(symbol, Symbol("hidden"), { value: true, enumerable: true });
    const accessor = clone(candidate);
    Object.defineProperty(accessor, "status", {
      enumerable: true,
      get() {
        getterCalls += 1;
        return "non_authoritative_candidate";
      },
    });
    const sparse = clone(candidate);
    delete sparse.relationship_reason_mappings[0];
    const extended = clone(candidate);
    Object.defineProperty(extended.relationship_reason_mappings, "extra", {
      value: true,
      enumerable: true,
    });
    const cycle = clone(candidate);
    cycle.cycle = cycle;
    const custom = Object.assign(Object.create({ inherited: true }), clone(candidate));
    const negativeZero = clone(candidate);
    negativeZero.inventory_completeness.candidate_public_check_count = -0;
    const throwingProxy = new Proxy(clone(candidate), {
      ownKeys() {
        throw new Error("caller trap must not escape");
      },
    });
    for (const hostile of [
      hidden,
      symbol,
      accessor,
      sparse,
      extended,
      cycle,
      custom,
      negativeZero,
      throwingProxy,
      null,
      [],
    ]) {
      expect(() => validatePairedTFinalReasonCodeInventoryCandidate(hostile)).not.toThrow();
      expect(validatePairedTFinalReasonCodeInventoryCandidate(hostile)).toEqual([
        "final reason-code inventory checkpoint differs from the exact candidate",
      ]);
    }
    expect(getterCalls).toBe(0);
  });

  it("treats object key order as non-semantic while pinning array order", () => {
    const candidate = loadJson(candidatePath);
    const reordered = Object.fromEntries(Object.entries(candidate).reverse());
    expect(validatePairedTFinalReasonCodeInventoryCandidate(reordered)).toEqual([]);
    const arrayReordered = clone(candidate);
    arrayReordered.relationship_reason_mappings.reverse();
    expect(validatePairedTFinalReasonCodeInventoryCandidate(arrayReordered)).not.toEqual([]);
  });
});
