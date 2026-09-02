import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import type { PairedObservationSpike, PairedTSpikeInput } from "../../reference/spikes/paired-t.js";
import {
  evaluatePairedTRuntimeNumericalContractFullTraceCandidate,
  validatePairedTRuntimeNumericalContractFullTraceCheckpoint,
  verifyPairedTRuntimeNumericalContractFullTraceCandidate,
  type PairedTRuntimeNumericalContractFullTraceEnvelopeCandidate,
} from "../src/spikes/paired-t-runtime-numerical-contract-full-trace-candidate.js";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const checkpointPath = path.join(
  repositoryRoot,
  "governance/drafts/release-2-candidate/numerical/runtime-numerical-contract-full-trace-candidate.json",
);

type MutableJson = Record<string, any>;

function loadCheckpoint(): MutableJson {
  return JSON.parse(readFileSync(checkpointPath, "utf8")) as MutableJson;
}

function gitBlobSha1(bytes: Buffer): string {
  return createHash("sha1")
    .update(Buffer.from(`blob ${bytes.length}\0`, "utf8"))
    .update(bytes)
    .digest("hex");
}

function observationsFromDifferences(differences: readonly number[]): PairedObservationSpike[] {
  return differences.flatMap((difference, index) => {
    const suffix = String(index + 1).padStart(3, "0");
    return [
      {
        observationId: `first-${suffix}`,
        experimentalUnitId: `first-unit-${suffix}`,
        pairId: `pair-${suffix}`,
        conditionId: "first",
        outcomeValue: difference,
      },
      {
        observationId: `second-${suffix}`,
        experimentalUnitId: `second-unit-${suffix}`,
        pairId: `pair-${suffix}`,
        conditionId: "second",
        outcomeValue: 0,
      },
    ];
  });
}

function inputFromDifferences(differences: readonly number[]): PairedTSpikeInput {
  return {
    conditionOrder: ["first", "second"],
    repeatedMeasurements: "none",
    observations: observationsFromDifferences(differences),
  };
}

function zeroMeanDifferences(nPairs: number): number[] {
  const half = Math.floor(nPairs / 2);
  const positive = Array.from({ length: half }, (_, index) => index + 1);
  const values = [...positive.map((value) => -value), ...positive];
  if (nPairs % 2 === 1) values.push(0);
  return values;
}

function cloneEnvelope(
  envelope: PairedTRuntimeNumericalContractFullTraceEnvelopeCandidate,
): MutableJson {
  return JSON.parse(JSON.stringify(envelope)) as MutableJson;
}

function canonicalJson(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalJson);
  if (typeof value !== "object" || value === null) return value;
  return Object.fromEntries(
    Object.entries(value)
      .sort(([first], [second]) => (first < second ? -1 : first > second ? 1 : 0))
      .map(([key, child]) => [key, canonicalJson(child)]),
  );
}

function recomputeOuterDigest(envelope: MutableJson): void {
  const payload = {
    format: envelope.format,
    g4_tail_composition: envelope.g4_tail_composition,
    ci_endpoint_truth: envelope.ci_endpoint_truth,
    link: envelope.link,
    resource: envelope.resource,
  };
  envelope.sha256 = `sha256:${createHash("sha256")
    .update(JSON.stringify(canonicalJson(payload)), "utf8")
    .digest("hex")}`;
}

function expectRejected(result: unknown): void {
  if (Array.isArray(result)) {
    expect(result).not.toEqual([]);
  } else if (typeof result === "object" && result !== null && "errors" in result) {
    expect(result).toMatchObject({ ok: false });
  } else {
    expect(result).toMatchObject({ ok: false });
  }
}

describe("R2-D5 Group 2 runtime numerical contract full-trace candidate", () => {
  it("binds the preserved exact-head review and closes only Group 2", () => {
    const checkpoint = loadCheckpoint();
    expect(validatePairedTRuntimeNumericalContractFullTraceCheckpoint(checkpoint)).toEqual([]);
    expect(
      validatePairedTRuntimeNumericalContractFullTraceCheckpoint(
        Object.fromEntries(Object.entries(checkpoint).reverse()),
      ),
    ).toEqual([]);
    expect(checkpoint).toMatchObject({
      status: "non_authoritative_candidate",
      issuance: "unissued",
      decision_group: "runtime_numerical_contract_and_full_trace_predicate",
      decision_state:
        "independently_reviewed_candidate_runtime_numerical_contract_and_full_trace_predicate",
      selection_made_by_this_checkpoint: true,
      independent_review: "complete",
      group_1_dependency: "closed_with_preserved_exact_head_review",
      group_2_complete: true,
      independent_review_binding: {
        verdict: "GO",
        blocker_count: 0,
        should_fix_count: 0,
        nice_to_have_count: 0,
        reviewed_candidate_head: "adea5c12d709350cbd8d4fbf918ea8344c111000",
        reviewed_candidate_tree: "7d56ad8f8b97b4c0baef336716a1dfc97338d3ac",
        review_commit: "813ee3a7e33bacd8d772ca7b8e51e15ecbf695c8",
        review_commit_parent: "adea5c12d709350cbd8d4fbf918ea8344c111000",
        review_result: "review-inputs/r2-d5-group-2-runtime-numerical-contract/REVIEW-RESULT.md",
        review_result_blob: "fc4da85398eeda3220b0ae0f4401195db0228250",
        preservation_merge: "b6bb348a22a25b82dfa940d39d017fe3c22859ff",
      },
      numerical_contract_frozen: false,
      supported_domain_claimed: false,
      runtime_support_enabled: false,
      selected_full_trace_predicate_candidate: {
        envelope_format: "paired-t-runtime-numerical-contract-full-trace-v1",
        candidate_predicate_selected_for_independent_review: true,
        supported_execution_predicate_selected: false,
        platform_admission_required_separately: true,
      },
      downstream_dependency_state: {
        supported_execution_admission: "next_open_after_group_2_closure",
        final_reason_code_inventory: "blocked_by_group_3",
        final_r2_d5_review_and_disposition: "blocked_by_groups_3_and_4_and_rfc_window",
      },
    });

    expect(checkpoint.source_snapshot.bindings).toHaveLength(26);
    for (const binding of checkpoint.source_snapshot.bindings as MutableJson[]) {
      const bytes = readFileSync(path.join(repositoryRoot, binding.path as string));
      expect(gitBlobSha1(bytes), binding.role as string).toBe(binding.blob);
    }

    const reviewResultBytes = readFileSync(
      path.join(repositoryRoot, checkpoint.independent_review_binding.review_result as string),
    );
    expect(gitBlobSha1(reviewResultBytes)).toBe(
      checkpoint.independent_review_binding.review_result_blob,
    );
  });

  it("composes one G4 trace through tail truth, CI endpoint truth, and the resource envelope", () => {
    const result = evaluatePairedTRuntimeNumericalContractFullTraceCandidate(
      inputFromDifferences([1, 2, 3]),
    );
    expect(result).toMatchObject({
      ok: true,
      status: "non_authoritative_group_2_full_trace_evaluation",
      result: {
        nPairs: 3,
        degreesOfFreedom: 2,
        meanDifference: 2,
        sampleVarianceDifference: 1,
      },
      verification: {
        fullTraceVerified: true,
        sameG4TraceVerified: true,
        g4TailCompositionVerified: true,
        tailNumericalContractVerified: true,
        ciEndpointTruthVerified: true,
        resourceEnvelopeVerified: true,
      },
      candidateNumericalPredicateSatisfied: true,
      group2CandidateSelectionMade: true,
      group2Complete: false,
      numericalContractFrozen: false,
      supportedExecutionPredicateSatisfied: false,
      supportedPlatformClaimed: false,
      supportedDomainClaimed: false,
      runtimeSupportClaimed: false,
    });
    if (!result.ok) throw new Error("ordinary Group 2 candidate unexpectedly refused");

    const { envelope } = result;
    expect(envelope.g4_tail_composition.g4_trace).toEqual(
      envelope.ci_endpoint_truth.ci_trace.g4_trace,
    );
    expect(envelope.link.g4_trace_sha256).toBe(envelope.g4_tail_composition.g4_trace.sha256);
    expect(envelope.link.p_value_binary64_hex).toBe(result.result.pValueBinary64Hex);
    expect(envelope.link.lower_endpoint_binary64_hex).toBe(
      envelope.ci_endpoint_truth.ci_trace.outcome.lower_endpoint_binary64_hex,
    );
    expect(envelope.resource.g4_trace_nodes).toBe(18);
    expect(envelope.resource.ci_specific_trace_nodes).toBe(3);
    expect(envelope.resource.combined_primitive_trace_nodes).toBe(
      envelope.resource.g4_trace_nodes +
        envelope.resource.tail_trace_nodes +
        envelope.resource.ci_specific_trace_nodes,
    );
    expect(verifyPairedTRuntimeNumericalContractFullTraceCandidate(envelope)).toEqual({
      ok: true,
      errors: [],
    });
    const reorderedEnvelope = cloneEnvelope(envelope);
    reorderedEnvelope.link = Object.fromEntries(Object.entries(reorderedEnvelope.link).reverse());
    expect(verifyPairedTRuntimeNumericalContractFullTraceCandidate(reorderedEnvelope)).toEqual({
      ok: true,
      errors: [],
    });
    expect(Object.isFrozen(envelope)).toBe(true);
    expect(Object.isFrozen(envelope.link)).toBe(true);
  });

  it("accepts reviewed scope edges while retaining exact-zero and ordinary tail branches", () => {
    for (const nPairs of [2, 3, 30, 101, 201]) {
      const result = evaluatePairedTRuntimeNumericalContractFullTraceCandidate(
        inputFromDifferences(zeroMeanDifferences(nPairs)),
      );
      expect(result, `n=${nPairs}`).toMatchObject({
        ok: true,
        result: {
          nPairs,
          degreesOfFreedom: nPairs - 1,
          testStatistic: 0,
          pValueBinary64Hex: "3ff0000000000000",
        },
      });
      if (!result.ok) throw new Error(`scope edge n=${nPairs} unexpectedly refused`);
      expect(result.envelope.resource.g4_trace_nodes).toBe(5 * nPairs + 3);
    }

    const ordinary = evaluatePairedTRuntimeNumericalContractFullTraceCandidate(
      inputFromDifferences([1, 2, 4, 8]),
    );
    expect(ordinary).toMatchObject({ ok: true });
    if (!ordinary.ok) throw new Error("ordinary tail branch unexpectedly refused");
    expect(ordinary.envelope.g4_tail_composition.tail_trace.outcome.branch).not.toBe("exact-zero");

    expect(
      evaluatePairedTRuntimeNumericalContractFullTraceCandidate(inputFromDifferences([1])),
    ).toMatchObject({ ok: false, classification: "g4_tail_stage_refusal" });
    expect(
      evaluatePairedTRuntimeNumericalContractFullTraceCandidate(
        inputFromDifferences(zeroMeanDifferences(202)),
      ),
    ).toMatchObject({ ok: false, classification: "g4_tail_stage_refusal" });
  });

  it("rejects coherent outer-link, cross-input, and resource-envelope attacks", () => {
    const first = evaluatePairedTRuntimeNumericalContractFullTraceCandidate(
      inputFromDifferences([1, 2, 3]),
    );
    const second = evaluatePairedTRuntimeNumericalContractFullTraceCandidate(
      inputFromDifferences([1, 3, 7]),
    );
    if (!first.ok || !second.ok) throw new Error("mutation controls unexpectedly refused");

    const linkAttack = cloneEnvelope(first.envelope);
    linkAttack.link.g4_trace_sha256 = "sha256:" + "0".repeat(64);
    recomputeOuterDigest(linkAttack);
    expect(verifyPairedTRuntimeNumericalContractFullTraceCandidate(linkAttack)).toMatchObject({
      ok: false,
    });

    const crossInput = cloneEnvelope(first.envelope);
    crossInput.ci_endpoint_truth = cloneEnvelope(second.envelope).ci_endpoint_truth;
    crossInput.link.ci_trace_sha256 = crossInput.ci_endpoint_truth.ci_trace.sha256;
    crossInput.link.ci_endpoint_truth_sha256 = crossInput.ci_endpoint_truth.sha256;
    crossInput.link.lower_endpoint_binary64_hex =
      crossInput.ci_endpoint_truth.ci_trace.outcome.lower_endpoint_binary64_hex;
    crossInput.link.upper_endpoint_binary64_hex =
      crossInput.ci_endpoint_truth.ci_trace.outcome.upper_endpoint_binary64_hex;
    recomputeOuterDigest(crossInput);
    expect(verifyPairedTRuntimeNumericalContractFullTraceCandidate(crossInput)).toMatchObject({
      ok: false,
    });

    const resourceAttack = cloneEnvelope(first.envelope);
    resourceAttack.resource.combined_primitive_trace_nodes -= 1;
    recomputeOuterDigest(resourceAttack);
    expect(verifyPairedTRuntimeNumericalContractFullTraceCandidate(resourceAttack)).toMatchObject({
      ok: false,
    });
  });

  it("rejects source, selection, graph, table, truth, resource, ordering, and promotion drift", () => {
    const attacks: Array<(value: MutableJson) => void> = [
      (value) => {
        value.source_snapshot.repository_commit = "0".repeat(40);
      },
      (value) => {
        value.source_snapshot.bindings[0].blob = "0".repeat(40);
      },
      (value) => {
        value.group_1_dependency = "pending";
      },
      (value) => {
        value.independent_review = "pending";
        value.group_2_complete = false;
      },
      (value) => {
        value.independent_review_binding.verdict = "NO-GO";
        value.independent_review_binding.blocker_count = 1;
      },
      (value) => {
        value.independent_review_binding.reviewed_candidate_head = "0".repeat(40);
      },
      (value) => {
        value.independent_review_binding.reviewed_candidate_tree = "0".repeat(40);
      },
      (value) => {
        value.independent_review_binding.review_commit = "0".repeat(40);
      },
      (value) => {
        value.independent_review_binding.review_commit_parent = "0".repeat(40);
      },
      (value) => {
        value.independent_review_binding.review_result =
          "review-inputs/substituted/REVIEW-RESULT.md";
      },
      (value) => {
        value.independent_review_binding.review_result_blob = "0".repeat(40);
      },
      (value) => {
        value.independent_review_binding.preservation_merge = "0".repeat(40);
      },
      (value) => {
        value.selected_runtime_numerical_contract_candidate.input_scope.pair_count_maximum = 202;
      },
      (value) => {
        value.selected_runtime_numerical_contract_candidate.operation_graph.ordered_stages.reverse();
      },
      (value) => {
        value.selected_runtime_numerical_contract_candidate.table_selection.tail_inverse_beta_content_hash =
          "sha256:" + "0".repeat(64);
      },
      (value) => {
        value.selected_runtime_numerical_contract_candidate.table_selection.fixed_95_ordered_cell_content_hash =
          "sha256:" + "0".repeat(64);
      },
      (value) => {
        value.selected_runtime_numerical_contract_candidate.truth_and_projection.global_truth_error_constant_selected = true;
      },
      (value) => {
        value.selected_runtime_numerical_contract_candidate.stage_specific_subnormal_policy.blanket_subnormal_refusal_selected = true;
      },
      (value) => {
        value.selected_runtime_numerical_contract_candidate.comparison_contract.quantity_specific_tolerances =
          { p_value: 1 };
      },
      (value) => {
        value.selected_full_trace_predicate_candidate.resource_envelope.tail_trace_node_maximum = 72_567;
      },
      (value) => {
        value.downstream_dependency_state.supported_execution_admission = "open";
      },
      (value) => {
        value.non_promotions.authoritative_runtime_numerical_contract_selected = true;
        value.non_promotions.numerical_contract_frozen = true;
      },
      (value) => {
        value.non_promotions.runtime_allowlist_entries.push("linux-x64");
        value.non_promotions.supported_execution_predicate = "selected";
      },
      (value) => {
        value.non_promotions.supported_domain = true;
        value.non_promotions.runtime_support = true;
        value.non_promotions.r2_d5 = "complete";
        value.non_promotions.release_2 = "complete";
      },
      (value) => {
        value.finite_observations_not_global_bounds[2] = 100_000;
      },
      (value) => {
        value.undeclared = true;
      },
    ];
    for (const attack of attacks) {
      const candidate = structuredClone(loadCheckpoint()) as MutableJson;
      attack(candidate);
      expect(validatePairedTRuntimeNumericalContractFullTraceCheckpoint(candidate)).not.toEqual([]);
    }
  });

  it("fails closed on hidden, symbolic, accessor, sparse, extended, proxy, cyclic, and exotic data", () => {
    const successful = evaluatePairedTRuntimeNumericalContractFullTraceCandidate(
      inputFromDifferences([1, 2, 3]),
    );
    if (!successful.ok) throw new Error("hostile-shape control unexpectedly refused");

    const surfaces: Array<{ load: () => unknown; validate: (value: unknown) => unknown }> = [
      {
        load: loadCheckpoint,
        validate: validatePairedTRuntimeNumericalContractFullTraceCheckpoint,
      },
      {
        load: () => cloneEnvelope(successful.envelope),
        validate: verifyPairedTRuntimeNumericalContractFullTraceCandidate,
      },
      {
        load: () => structuredClone(inputFromDifferences([1, 2, 3])),
        validate: evaluatePairedTRuntimeNumericalContractFullTraceCandidate,
      },
    ];

    for (const { load, validate } of surfaces) {
      const hidden = load() as MutableJson;
      Object.defineProperty(hidden, "hidden_support", { value: true, enumerable: false });
      expectRejected(validate(hidden));

      const symbolic = load() as Record<PropertyKey, unknown>;
      symbolic[Symbol("support")] = true;
      expectRejected(validate(symbolic));

      const accessor = load() as MutableJson;
      const firstKey = Object.keys(accessor)[0]!;
      let getterCalls = 0;
      Object.defineProperty(accessor, firstKey, {
        enumerable: true,
        configurable: true,
        get() {
          getterCalls += 1;
          return true;
        },
      });
      expect(() => validate(accessor)).not.toThrow();
      expectRejected(validate(accessor));
      expect(getterCalls).toBe(0);

      const proxy = new Proxy(load() as object, {
        ownKeys() {
          throw new Error("hostile ownKeys");
        },
      });
      expect(() => validate(proxy)).not.toThrow();
      expectRejected(validate(proxy));

      const cycle = load() as MutableJson;
      cycle.cycle = cycle;
      expect(() => validate(cycle)).not.toThrow();
      expectRejected(validate(cycle));

      const exotic = load() as MutableJson;
      Object.setPrototypeOf(exotic, { supported: true });
      expectRejected(validate(exotic));

      for (const invalid of [-0, Number.NaN, Number.POSITIVE_INFINITY, 1n, () => true]) {
        const candidate = load() as MutableJson;
        candidate[Object.keys(candidate)[0]!] = invalid;
        expect(() => validate(candidate)).not.toThrow();
        expectRejected(validate(candidate));
      }
    }

    const sparseCheckpoint = loadCheckpoint();
    sparseCheckpoint.source_snapshot.bindings.length += 1;
    expectRejected(validatePairedTRuntimeNumericalContractFullTraceCheckpoint(sparseCheckpoint));

    const extendedEnvelope = cloneEnvelope(successful.envelope);
    extendedEnvelope.g4_tail_composition.g4_trace.nodes.extra = true;
    expectRejected(verifyPairedTRuntimeNumericalContractFullTraceCandidate(extendedEnvelope));

    const sparseInput = structuredClone(inputFromDifferences([1, 2, 3])) as MutableJson;
    sparseInput.observations.length += 1;
    expectRejected(evaluatePairedTRuntimeNumericalContractFullTraceCandidate(sparseInput));

    for (const invalidRoot of [null, undefined, [], "invalid"]) {
      expectRejected(validatePairedTRuntimeNumericalContractFullTraceCheckpoint(invalidRoot));
      expectRejected(verifyPairedTRuntimeNumericalContractFullTraceCandidate(invalidRoot));
      expectRejected(evaluatePairedTRuntimeNumericalContractFullTraceCandidate(invalidRoot));
    }
  });
});
