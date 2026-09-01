import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  computePairedTSpike,
  type PairedObservationSpike,
  type PairedTSpikeInput,
} from "../../reference/spikes/paired-t.js";
import {
  PAIRED_T_CANDIDATE_COMBINED_PRIMITIVE_TRACE_NODE_MAXIMUM,
  PAIRED_T_CANDIDATE_DF_MAXIMUM,
  PAIRED_T_CANDIDATE_G4_TRACE_NODE_MAXIMUM,
  PAIRED_T_CANDIDATE_PAIR_COUNT_MAXIMUM,
  PAIRED_T_CANDIDATE_TAIL_ITERATION_CAP_MAXIMUM,
  PAIRED_T_CANDIDATE_TAIL_TRACE_NODE_MAXIMUM,
  evaluatePairedTCandidateResourceEnvelope,
  validatePairedTCandidateSupportedScopeResourceBounds,
  validatePairedTCandidateSupportedScopeResourceCorpus,
  type PairedTCandidateResourceEnvelopeInput,
} from "../src/spikes/paired-t-candidate-supported-scope-resource-bounds.js";
import { evaluatePairedTCIExecutionTraceCandidate } from "../src/spikes/paired-t-ci-execution-trace-candidate.js";
import { evaluatePairedTG4TailTraceCompositionCandidate } from "../src/spikes/paired-t-g4-tail-trace-composition-candidate.js";
import {
  evaluatePairedTSupportedExecutionCandidate,
  evaluatePairedTSupportedExecutionCandidateWithReviewLimit,
} from "../src/spikes/paired-t-supported-execution-candidate.js";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const numericalRoot = path.join(repositoryRoot, "governance/drafts/release-2-candidate/numerical");
const checkpointPath = path.join(
  numericalRoot,
  "candidate-supported-scope-resource-bounds-candidate.json",
);
const corpusPath = path.join(numericalRoot, "candidate-supported-scope-resource-corpus.json");
const boundaryPath = path.join(numericalRoot, "support-domain-boundary-cases.json");

type MutableJson = Record<string, any>;

function loadJson<T = MutableJson>(filename: string): T {
  return JSON.parse(readFileSync(filename, "utf8")) as T;
}

function loadCheckpoint(): MutableJson {
  return loadJson(checkpointPath);
}

function loadCorpus(): MutableJson {
  return loadJson(corpusPath);
}

function gitBlobSha1(bytes: Buffer): string {
  return createHash("sha1")
    .update(Buffer.from(`blob ${bytes.length}\0`, "utf8"))
    .update(bytes)
    .digest("hex");
}

function sha256(bytes: Buffer | string): string {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function observationsFromPairs(
  pairs: ReadonlyArray<readonly [number, number]>,
): PairedObservationSpike[] {
  return pairs.flatMap(([first, second], index) => {
    const suffix = String(index + 1).padStart(3, "0");
    return [
      {
        observationId: `first-${suffix}`,
        experimentalUnitId: `first-unit-${suffix}`,
        pairId: `pair-${suffix}`,
        conditionId: "first",
        outcomeValue: first,
      },
      {
        observationId: `second-${suffix}`,
        experimentalUnitId: `second-unit-${suffix}`,
        pairId: `pair-${suffix}`,
        conditionId: "second",
        outcomeValue: second,
      },
    ];
  });
}

function inputFromPairs(pairs: ReadonlyArray<readonly [number, number]>): PairedTSpikeInput {
  return {
    conditionOrder: ["first", "second"],
    repeatedMeasurements: "none",
    observations: observationsFromPairs(pairs),
  };
}

function inputFromDifferences(differences: readonly number[], baseline = 1_024): PairedTSpikeInput {
  return inputFromPairs(differences.map((difference) => [baseline + difference, baseline]));
}

function zeroMeanDifferences(nPairs: number): number[] {
  const half = Math.floor(nPairs / 2);
  const values = Array.from({ length: half }, (_, index) => index + 1);
  const differences = [...values.map((value) => -value), ...values];
  if (nPairs % 2 === 1) differences.push(0);
  return differences;
}

function resourceInput(
  nPairs: number,
  tailIterations: number,
  tailNodes: number,
): PairedTCandidateResourceEnvelopeInput {
  const degreesOfFreedom = nPairs - 1;
  const g4Nodes = 5 * nPairs + 3;
  return {
    n_pairs: nPairs,
    degrees_of_freedom: degreesOfFreedom,
    g4_trace_nodes: g4Nodes,
    tail_iterations: tailIterations,
    tail_iteration_cap: 40 * degreesOfFreedom + 64,
    tail_trace_nodes: tailNodes,
    ci_specific_trace_nodes: 3,
    combined_primitive_trace_nodes: g4Nodes + tailNodes + 3,
  };
}

function transformedInput(
  base: PairedTSpikeInput,
  transform: (value: number) => number,
): PairedTSpikeInput {
  return {
    ...base,
    observations: base.observations.map((observation) => ({
      ...observation,
      outcomeValue: transform(observation.outcomeValue),
    })),
  };
}

function assertSuccessfulPair(input: PairedTSpikeInput) {
  const tail = evaluatePairedTG4TailTraceCompositionCandidate(input);
  const ci = evaluatePairedTCIExecutionTraceCandidate(input);
  expect(tail.ok).toBe(true);
  expect(ci.ok).toBe(true);
  if (!tail.ok || !ci.ok) throw new Error("candidate evaluation unexpectedly refused");
  return { tail, ci };
}

function expectRejected(result: unknown): void {
  if (Array.isArray(result)) {
    expect(result).not.toEqual([]);
  } else {
    expect(result).toMatchObject({ ok: false });
  }
}

describe("R2-D5 candidate supported scope and resource bounds", () => {
  it("pins the non-authoritative checkpoint, corpus, source snapshot, and clarification", () => {
    const checkpoint = loadCheckpoint();
    const corpus = loadCorpus();
    expect(validatePairedTCandidateSupportedScopeResourceBounds(checkpoint)).toEqual([]);
    expect(validatePairedTCandidateSupportedScopeResourceCorpus(corpus)).toEqual([]);
    expect(
      validatePairedTCandidateSupportedScopeResourceBounds(
        Object.fromEntries(Object.entries(checkpoint).reverse()),
      ),
    ).toEqual([]);
    expect(
      validatePairedTCandidateSupportedScopeResourceCorpus(
        Object.fromEntries(Object.entries(corpus).reverse()),
      ),
    ).toEqual([]);

    expect(checkpoint).toMatchObject({
      status: "non_authoritative_candidate",
      issuance: "unissued",
      decision_group: "candidate_supported_scope_and_resource_bounds",
      decision_state: "candidate_scope_and_resource_bounds_selected_pending_independent_review",
      independent_review: "pending",
      selection_made_by_this_checkpoint: true,
      group_1_complete: false,
      supported_domain_claimed: false,
      runtime_support_enabled: false,
      historical_label_clarification: {
        literal_source_checkpoint:
          "governance/drafts/release-2-candidate/numerical/support-domain-candidate.json",
        resolved_checkpoint:
          "governance/drafts/release-2-candidate/numerical/truth-error-support-closure-candidate.json",
        previous_closure_gap_checkpoint_rewritten: false,
      },
    });

    for (const binding of checkpoint.source_snapshot.bindings as MutableJson[]) {
      const bytes = readFileSync(path.join(repositoryRoot, binding.path as string));
      expect(gitBlobSha1(bytes), binding.role as string).toBe(binding.blob);
    }

    const tailTableBytes = readFileSync(
      path.join(
        repositoryRoot,
        "tooling/r2-paired-t-runtime-series/runtime-inverse-beta-table.candidate.json",
      ),
    );
    const tailTable = JSON.parse(tailTableBytes.toString("utf8")) as MutableJson;
    expect(tailTable.entries).toHaveLength(200);
    expect(tailTable.entries.map((entry: MutableJson) => entry.degrees_of_freedom)).toEqual(
      Array.from({ length: 200 }, (_, index) => index + 1),
    );
    expect(sha256(tailTableBytes)).toBe(
      checkpoint.selected_candidate_scope.pair_and_df.reviewed_tail_table_content_hash,
    );

    const fixedTable = loadJson<MutableJson>(
      path.join(numericalRoot, "fixed-95-critical-value-table-selected-candidate.json"),
    );
    const fixedValues = fixedTable.critical_value_binary64_hex_by_df as string[];
    expect(fixedValues).toHaveLength(200);
    const fixedLines = [
      "nomue-paired-t-fixed-95-table-v1",
      "two-sided-tail-target=1/20",
      ...fixedValues.map((hex, index) => `df=${index + 1};binary64=${hex}`),
    ];
    expect(sha256(`${fixedLines.join("\n")}\n`)).toBe(
      checkpoint.selected_candidate_scope.pair_and_df.reviewed_fixed_95_table_content_hash,
    );
  });

  it("selects pair/df and resource limits from explicit reviewed relations without promotion", () => {
    const checkpoint = loadCheckpoint();
    expect(checkpoint.selected_candidate_scope.pair_and_df).toEqual({
      pair_count_minimum: 2,
      pair_count_maximum: PAIRED_T_CANDIDATE_PAIR_COUNT_MAXIMUM,
      degrees_of_freedom_minimum: 1,
      degrees_of_freedom_maximum: PAIRED_T_CANDIDATE_DF_MAXIMUM,
      degrees_of_freedom_relation: "exact_integer_n_pairs_minus_one",
      selection_basis:
        "complete_reviewed_df_1_through_200_tail_and_fixed_95_table_extents_joined_to_paired_t_df_relation",
      reviewed_tail_table_content_hash:
        "sha256:ba1f992199e9e153956589d62dcf5a6509575100bb7c923c170bfa45fdd76c08",
      reviewed_fixed_95_table_content_hash:
        "sha256:24ccc86d7a49b9e1ef1e3fc9b038a5b8d338b8b5ca4a02492d8900d7e7dea3c0",
      finite_evidence_maximum_alone_is_selection_basis: false,
    });
    expect(checkpoint.selected_candidate_resource_bounds).toMatchObject({
      g4_trace: {
        node_formula: "5_times_n_pairs_plus_3",
        node_count_maximum: PAIRED_T_CANDIDATE_G4_TRACE_NODE_MAXIMUM,
        historical_evaluation_ceiling: 2_048,
        historical_evaluation_ceiling_selected_as_bound: false,
      },
      tail_trace: {
        node_count_maximum: PAIRED_T_CANDIDATE_TAIL_TRACE_NODE_MAXIMUM,
        iteration_cap_formula: "40_times_df_plus_64",
        iteration_cap_maximum: PAIRED_T_CANDIDATE_TAIL_ITERATION_CAP_MAXIMUM,
      },
      confidence_interval_trace: {
        ci_specific_node_count: 3,
        ci_specific_node_count_maximum: 3,
      },
      combined_primitive_trace: {
        node_count_maximum: PAIRED_T_CANDIDATE_COMBINED_PRIMITIVE_TRACE_NODE_MAXIMUM,
      },
    });
    expect(checkpoint.non_promotions).toMatchObject({
      authoritative_supported_pair_or_df_bound: false,
      authoritative_supported_value_or_intermediate_bound: false,
      supported_domain: false,
      runtime_support: false,
      supported_platform_matrix: "pending",
      supported_execution_predicate: "unselected",
      final_reason_codes_frozen: false,
      public_check: "unissued",
      supported_bundle: "unissued",
      r2_d5: "incomplete",
      release_2: "incomplete",
    });
  });

  it("executes every pair count from 2 through 201 and checks exact resource identities", () => {
    for (let nPairs = 2; nPairs <= PAIRED_T_CANDIDATE_PAIR_COUNT_MAXIMUM; nPairs += 1) {
      const { tail, ci } = assertSuccessfulPair(inputFromDifferences(zeroMeanDifferences(nPairs)));
      expect(tail.result.nPairs, `n=${nPairs}: pair count`).toBe(nPairs);
      expect(tail.result.degreesOfFreedom, `n=${nPairs}: df`).toBe(nPairs - 1);
      expect(tail.result.testStatistic, `n=${nPairs}: t`).toBe(0);
      expect(tail.result.pValueBinary64Hex, `n=${nPairs}: p bits`).toBe("3ff0000000000000");
      expect(tail.composition.g4_trace.node_count, `n=${nPairs}: G4 nodes`).toBe(5 * nPairs + 3);
      expect(tail.composition.tail_trace.outcome.branch, `n=${nPairs}: tail branch`).toBe(
        "exact-zero",
      );
      expect(ci.trace.node_count, `n=${nPairs}: CI nodes`).toBe(3);

      const resource = resourceInput(
        nPairs,
        tail.composition.tail_trace.outcome.iterations,
        tail.composition.tail_trace.node_count,
      );
      expect(
        evaluatePairedTCandidateResourceEnvelope(resource),
        `n=${nPairs}: envelope`,
      ).toMatchObject({
        ok: true,
        candidateResourceEnvelopeSatisfied: true,
        supportedDomainClaimed: false,
        runtimeSupportClaimed: false,
      });
    }
  }, 60_000);

  it("replays operation-stage boundaries and the reviewed tail resource edge", () => {
    const boundary = loadJson<{
      cases: Array<{
        case_key: string;
        expected_spike_error: string | null;
        pairs: Array<[number, number]>;
      }>;
    }>(boundaryPath);
    expect(boundary.cases).toHaveLength(11);
    for (const boundaryCase of boundary.cases) {
      const outcome = computePairedTSpike(inputFromPairs(boundaryCase.pairs));
      if (boundaryCase.expected_spike_error === null) {
        expect(outcome, boundaryCase.case_key).toMatchObject({ ok: true });
      } else {
        expect(outcome, boundaryCase.case_key).toMatchObject({
          ok: false,
          error: boundaryCase.expected_spike_error,
        });
      }
    }

    const input = { degreesOfFreedom: 200, testStatistic: 1.0000000000000002 };
    const heavy = evaluatePairedTSupportedExecutionCandidate(input);
    expect(heavy).toMatchObject({ ok: true, iterations: 5_182, iterationCap: 8_064 });
    if (!heavy.ok) throw new Error("reviewed heavy tail witness unexpectedly refused");
    expect(heavy.trace.node_count).toBe(72_567);
    expect(
      evaluatePairedTCandidateResourceEnvelope(resourceInput(201, heavy.iterations, 72_567)),
    ).toMatchObject({ ok: true });

    expect(evaluatePairedTSupportedExecutionCandidateWithReviewLimit(input, 72_566)).toMatchObject({
      ok: false,
      classification: "execution_trace_resource_bound_exceeded",
    });
    expect(evaluatePairedTSupportedExecutionCandidateWithReviewLimit(input, 72_567)).toMatchObject({
      ok: true,
      iterations: 5_182,
    });
  }, 30_000);

  it("checks permutation, direction, sign, scale, and translation metamorphisms", () => {
    const baseInput = inputFromPairs([
      [4, 3],
      [7, 5],
      [11, 7],
      [14, 9],
    ]);
    const base = assertSuccessfulPair(baseInput);

    const permuted: PairedTSpikeInput = {
      ...baseInput,
      observations: [...baseInput.observations].reverse(),
    };
    const permutation = assertSuccessfulPair(permuted);
    expect(permutation.tail).toEqual(base.tail);
    expect(permutation.ci).toEqual(base.ci);

    const swapped: PairedTSpikeInput = {
      ...baseInput,
      conditionOrder: ["second", "first"],
    };
    const reversedSignInputs = [
      assertSuccessfulPair(swapped),
      assertSuccessfulPair(transformedInput(baseInput, (value) => -value)),
    ];
    for (const changed of reversedSignInputs) {
      expect(changed.tail.result.meanDifference).toBe(-base.tail.result.meanDifference);
      expect(changed.tail.result.sampleVarianceDifference).toBe(
        base.tail.result.sampleVarianceDifference,
      );
      expect(changed.tail.result.standardError).toBe(base.tail.result.standardError);
      expect(changed.tail.result.testStatistic).toBe(-base.tail.result.testStatistic);
      expect(changed.tail.result.pValue).toBe(base.tail.result.pValue);
      expect(changed.ci.result.margin).toBe(base.ci.result.margin);
      expect(changed.ci.result.lowerEndpoint).toBe(-base.ci.result.upperEndpoint);
      expect(changed.ci.result.upperEndpoint).toBe(-base.ci.result.lowerEndpoint);
    }

    const scaled = assertSuccessfulPair(transformedInput(baseInput, (value) => value * 2));
    expect(scaled.tail.result.meanDifference).toBe(base.tail.result.meanDifference * 2);
    expect(scaled.tail.result.sampleVarianceDifference).toBe(
      base.tail.result.sampleVarianceDifference * 4,
    );
    expect(scaled.tail.result.standardError).toBe(base.tail.result.standardError * 2);
    expect(scaled.tail.result.testStatistic).toBe(base.tail.result.testStatistic);
    expect(scaled.tail.result.pValue).toBe(base.tail.result.pValue);
    expect(scaled.ci.result.margin).toBe(base.ci.result.margin * 2);
    expect(scaled.ci.result.lowerEndpoint).toBe(base.ci.result.lowerEndpoint * 2);
    expect(scaled.ci.result.upperEndpoint).toBe(base.ci.result.upperEndpoint * 2);

    const translated = assertSuccessfulPair(transformedInput(baseInput, (value) => value + 16));
    expect(translated.tail.result).toEqual(base.tail.result);
    expect(translated.ci.result).toEqual(base.ci.result);
  });

  it("rejects inconsistent bounds, finite-observation promotion, support promotion, and drift", () => {
    const maximum = resourceInput(201, 8_064, 100_000);
    expect(evaluatePairedTCandidateResourceEnvelope(maximum)).toMatchObject({ ok: true });

    const resourceAttacks: Array<(value: MutableJson) => void> = [
      (value) => {
        value.n_pairs = 202;
        value.degrees_of_freedom = 201;
        value.g4_trace_nodes = 1_013;
        value.tail_iteration_cap = 8_104;
        value.combined_primitive_trace_nodes = 101_016;
      },
      (value) => {
        value.degrees_of_freedom = 199;
      },
      (value) => {
        value.g4_trace_nodes = 1_009;
      },
      (value) => {
        value.tail_iterations = 8_065;
      },
      (value) => {
        value.tail_trace_nodes = 100_001;
        value.combined_primitive_trace_nodes = 101_012;
      },
      (value) => {
        value.ci_specific_trace_nodes = 4;
        value.combined_primitive_trace_nodes = 101_012;
      },
      (value) => {
        value.combined_primitive_trace_nodes -= 1;
      },
      (value) => {
        value.supported = true;
      },
    ];
    for (const attack of resourceAttacks) {
      const value = structuredClone(maximum) as unknown as MutableJson;
      attack(value);
      expect(evaluatePairedTCandidateResourceEnvelope(value)).toMatchObject({ ok: false });
    }

    const checkpointAttacks: Array<(value: MutableJson) => void> = [
      (value) => {
        value.source_snapshot.repository_commit = "0".repeat(40);
      },
      (value) => {
        value.selected_candidate_scope.pair_and_df.pair_count_maximum = 202;
      },
      (value) => {
        value.selected_candidate_scope.pair_and_df.finite_evidence_maximum_alone_is_selection_basis = true;
      },
      (value) => {
        value.selected_candidate_resource_bounds.tail_trace.node_count_maximum = 72_567;
        value.selected_candidate_resource_bounds.tail_trace.selection_basis =
          "observed_corpus_maximum";
      },
      (value) => {
        value.finite_observations_not_selection_bases[2].promoted_to_resource_bound = true;
      },
      (value) => {
        value.group_1_complete = true;
        value.independent_review = "complete";
      },
      (value) => {
        value.supported_domain_claimed = true;
        value.runtime_support_enabled = true;
        value.non_promotions.supported_domain = true;
        value.non_promotions.runtime_support = true;
      },
      (value) => {
        value.non_promotions.supported_platform_matrix = "selected";
        value.non_promotions.supported_execution_predicate = "selected";
      },
      (value) => {
        value.non_promotions.final_reason_codes_frozen = true;
        value.non_promotions.public_check = "issued";
        value.non_promotions.supported_bundle = "issued";
        value.non_promotions.r2_d5 = "complete";
        value.non_promotions.release_2 = "complete";
      },
      (value) => {
        value.historical_label_clarification.literal_source_checkpoint =
          value.historical_label_clarification.resolved_checkpoint;
      },
    ];
    for (const attack of checkpointAttacks) {
      const value = structuredClone(loadCheckpoint()) as MutableJson;
      attack(value);
      expect(validatePairedTCandidateSupportedScopeResourceBounds(value)).not.toEqual([]);
    }

    const corpus = loadCorpus();
    corpus.coverage_boundary.finite_corpus_defines_supported_domain = true;
    expect(validatePairedTCandidateSupportedScopeResourceCorpus(corpus)).not.toEqual([]);
  });

  it("fails closed on hidden, symbolic, accessor, sparse, extended, proxy, cyclic, and exotic data", () => {
    const validators: Array<{ load: () => unknown; validate: (value: unknown) => unknown }> = [
      {
        load: loadCheckpoint,
        validate: validatePairedTCandidateSupportedScopeResourceBounds,
      },
      { load: loadCorpus, validate: validatePairedTCandidateSupportedScopeResourceCorpus },
      {
        load: () => resourceInput(201, 8_064, 100_000),
        validate: evaluatePairedTCandidateResourceEnvelope,
      },
    ];

    for (const { load, validate } of validators) {
      const hidden = load() as MutableJson;
      Object.defineProperty(hidden, "hidden_support", { value: true, enumerable: false });
      expectRejected(validate(hidden));

      const symbolic = load() as Record<PropertyKey, unknown>;
      symbolic[Symbol("support")] = true;
      expectRejected(validate(symbolic));

      const accessor = load() as MutableJson;
      let getterCalls = 0;
      Object.defineProperty(accessor, Object.keys(accessor)[0]!, {
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
      expectRejected(validate(cycle));

      const exotic = load() as MutableJson;
      Object.setPrototypeOf(exotic, { supported: true });
      expectRejected(validate(exotic));

      for (const invalid of [-0, Number.NaN, Number.POSITIVE_INFINITY, 1n, () => true]) {
        const nonJson = load() as MutableJson;
        nonJson[Object.keys(nonJson)[0]!] = invalid;
        expect(() => validate(nonJson)).not.toThrow();
        expectRejected(validate(nonJson));
      }

      for (const invalidRoot of [null, undefined, [], "invalid"]) {
        expect(() => validate(invalidRoot)).not.toThrow();
        expectRejected(validate(invalidRoot));
      }
    }

    const sparseCorpus = loadCorpus();
    sparseCorpus.resource_boundary_cases.length += 1;
    expect(validatePairedTCandidateSupportedScopeResourceCorpus(sparseCorpus)).not.toEqual([]);

    const extendedCheckpoint = loadCheckpoint();
    extendedCheckpoint.source_snapshot.bindings.extra = "hidden binding";
    expect(validatePairedTCandidateSupportedScopeResourceBounds(extendedCheckpoint)).not.toEqual(
      [],
    );

    const nestedCheckpointProxy = loadCheckpoint();
    nestedCheckpointProxy.source_snapshot = new Proxy(nestedCheckpointProxy.source_snapshot, {
      getOwnPropertyDescriptor() {
        throw new Error("hostile nested descriptor");
      },
    });
    expect(() =>
      validatePairedTCandidateSupportedScopeResourceBounds(nestedCheckpointProxy),
    ).not.toThrow();
    expect(validatePairedTCandidateSupportedScopeResourceBounds(nestedCheckpointProxy)).not.toEqual(
      [],
    );

    const nestedCorpusProxy = loadCorpus();
    nestedCorpusProxy.coverage_boundary = new Proxy(nestedCorpusProxy.coverage_boundary, {
      getOwnPropertyDescriptor() {
        throw new Error("hostile nested descriptor");
      },
    });
    expect(() =>
      validatePairedTCandidateSupportedScopeResourceCorpus(nestedCorpusProxy),
    ).not.toThrow();
    expect(validatePairedTCandidateSupportedScopeResourceCorpus(nestedCorpusProxy)).not.toEqual([]);
  });
});
