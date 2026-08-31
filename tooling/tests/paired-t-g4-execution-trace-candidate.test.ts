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
  evaluatePairedTG4ExecutionTraceCandidate,
  PAIRED_T_G4_MAXIMUM_PAIRS_EVALUATION_CANDIDATE,
  validatePairedTG4ExecutionCheckpoint,
  verifyPairedTG4ExecutionTraceCandidate,
  type PairedTG4ExecutionCheckpointCandidate,
  type PairedTG4ExecutionTraceCandidate,
  type PairedTG4ExecutionTraceNodeCandidate,
} from "../src/spikes/paired-t-g4-execution-trace-candidate.js";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const checkpointPath = path.join(
  repositoryRoot,
  "governance/drafts/release-2-candidate/numerical/g4-execution-trace-candidate.json",
);
const boundaryPath = path.join(
  repositoryRoot,
  "governance/drafts/release-2-candidate/numerical/support-domain-boundary-cases.json",
);

function loadCheckpoint(): PairedTG4ExecutionCheckpointCandidate {
  return JSON.parse(readFileSync(checkpointPath, "utf8")) as PairedTG4ExecutionCheckpointCandidate;
}

function cloneCheckpoint(): PairedTG4ExecutionCheckpointCandidate {
  return JSON.parse(JSON.stringify(loadCheckpoint())) as PairedTG4ExecutionCheckpointCandidate;
}

function observationsFromPairs(pairs: Array<[number, number]>): PairedObservationSpike[] {
  return pairs.flatMap(([first, second], index) => {
    const suffix = String(index + 1).padStart(3, "0");
    return [
      {
        observationId: `before-${suffix}`,
        experimentalUnitId: `before-unit-${suffix}`,
        pairId: `pair-${suffix}`,
        conditionId: "before",
        outcomeValue: first,
      },
      {
        observationId: `after-${suffix}`,
        experimentalUnitId: `after-unit-${suffix}`,
        pairId: `pair-${suffix}`,
        conditionId: "after",
        outcomeValue: second,
      },
    ];
  });
}

function inputFromPairs(pairs: Array<[number, number]>): PairedTSpikeInput {
  return {
    conditionOrder: ["before", "after"],
    repeatedMeasurements: "none",
    observations: observationsFromPairs(pairs),
  };
}

type MutableTrace = Omit<PairedTG4ExecutionTraceCandidate, "nodes"> & {
  nodes: PairedTG4ExecutionTraceNodeCandidate[];
};

function cloneTrace(trace: PairedTG4ExecutionTraceCandidate): MutableTrace {
  return JSON.parse(JSON.stringify(trace)) as MutableTrace;
}

function recomputeTraceHash(trace: PairedTG4ExecutionTraceCandidate): void {
  const payload = {
    format: trace.format,
    input: trace.input,
    outcome: trace.outcome,
    node_count: trace.node_count,
    maximum_node_count_evaluation_candidate: trace.maximum_node_count_evaluation_candidate,
    nodes: trace.nodes,
  };
  trace.sha256 = `sha256:${createHash("sha256").update(JSON.stringify(payload), "utf8").digest("hex")}`;
}

function compareWithReviewedGraph(input: PairedTSpikeInput): void {
  const expected = computePairedTSpike(input);
  const candidate = evaluatePairedTG4ExecutionTraceCandidate(input);
  expect(candidate.ok).toBe(expected.ok);
  if (!expected.ok) {
    expect(candidate).toMatchObject({
      ok: false,
      classification: "g4_graph_refusal",
      graphClassification: expected.error,
    });
    return;
  }
  if (!candidate.ok) throw new Error("candidate refused a reviewed-graph success");
  expect(candidate.result).toEqual({
    operationGraph: expected.result.operationGraph,
    pairIds: expected.result.pairIds,
    differences: expected.result.differences,
    nPairs: expected.result.nPairs,
    meanDifference: expected.result.meanDifference,
    sampleVarianceDifference: expected.result.sampleVarianceDifference,
    standardError: expected.result.standardError,
    testStatistic: expected.result.testStatistic,
    degreesOfFreedom: expected.result.degreesOfFreedom,
  });
}

describe("R2-D5 G4 actual-execution trace candidate", () => {
  it("pins an unissued, incomplete, non-runtime checkpoint", () => {
    expect(validatePairedTG4ExecutionCheckpoint(loadCheckpoint())).toEqual([]);

    const promoted = cloneCheckpoint();
    promoted.runtime_support_enabled = true;
    promoted.supported_domain_claimed = true;
    promoted.closure_state["supported_execution_predicate"] = "selected";
    expect(validatePairedTG4ExecutionCheckpoint(promoted)).toContain(
      "G4 execution checkpoint differs from the closed non-runtime candidate",
    );

    const fabricatedBound = cloneCheckpoint();
    fabricatedBound.execution_trace["maximum_values_are_supported_resource_bounds"] = true;
    expect(validatePairedTG4ExecutionCheckpoint(fabricatedBound).length).toBeGreaterThan(0);
  });

  it("returns reviewed G4 values from one frozen, exactly verified trace", () => {
    const input = inputFromPairs([
      [1, 0],
      [2, 0],
      [3, 0],
    ]);
    const result = evaluatePairedTG4ExecutionTraceCandidate(input);
    expect(result).toMatchObject({
      ok: true,
      candidateArithmeticExecutionVerified: true,
      mathematicalTruthErrorBoundComplete: false,
      tailCompositionComplete: false,
      confidenceIntervalCompositionComplete: false,
      supportedExecutionPredicateSatisfied: false,
      supportedPlatformClaimed: false,
      supportedDomainClaimed: false,
      runtimeSupportClaimed: false,
      result: {
        pairIds: ["pair-001", "pair-002", "pair-003"],
        differences: [1, 2, 3],
        nPairs: 3,
        meanDifference: 2,
        sampleVarianceDifference: 1,
        degreesOfFreedom: 2,
      },
      traceVerification: {
        everyTraceNodeVerified: true,
        ordinaryArithmeticChecks: 17,
        squareRootChecks: 1,
      },
    });
    if (!result.ok) throw new Error("ordinary G4 candidate unexpectedly refused");
    expect(result.trace.node_count).toBe(18);
    expect(verifyPairedTG4ExecutionTraceCandidate(result.trace)).toEqual({ ok: true, errors: [] });
    expect(Object.isFrozen(result.trace)).toBe(true);
    expect(Object.isFrozen(result.trace.input.pairs)).toBe(true);
    expect(Object.isFrozen(result.trace.nodes)).toBe(true);
    expect(Object.isFrozen(result.trace.nodes[0])).toBe(true);
    expect(Object.isFrozen(result.result)).toBe(true);
  });

  it("is bit-for-bit invariant with the reviewed G4 graph for n=2..201", () => {
    for (let n = 2; n <= PAIRED_T_G4_MAXIMUM_PAIRS_EVALUATION_CANDIDATE; n += 1) {
      const pairs: Array<[number, number]> = [];
      for (let index = 0; index < n; index += 1) {
        const first = ((index * 17 + n * 3) % 101) - 50 + index / 16;
        const second = ((index * 7 + n) % 13) - 6;
        pairs.push([first, second]);
      }
      compareWithReviewedGraph(inputFromPairs(pairs));
    }
  }, 20_000);

  it("reproduces every reviewed operation-stage boundary disposition", () => {
    const corpus = JSON.parse(readFileSync(boundaryPath, "utf8")) as {
      cases: Array<{
        case_key: string;
        expected_spike_error: string | null;
        pairs: Array<[number, number]>;
      }>;
    };
    for (const boundaryCase of corpus.cases) {
      const result = evaluatePairedTG4ExecutionTraceCandidate(inputFromPairs(boundaryCase.pairs));
      if (boundaryCase.expected_spike_error === null) {
        expect(result, boundaryCase.case_key).toMatchObject({ ok: true });
      } else {
        expect(result, boundaryCase.case_key).toMatchObject({
          ok: false,
          classification: "g4_graph_refusal",
          graphClassification: boundaryCase.expected_spike_error,
        });
      }
    }
  });

  it("canonicalizes observation order without changing the bound trace", () => {
    const input = inputFromPairs([
      [3, 1],
      [7, 2],
      [11, 5],
      [19, 7],
    ]);
    const reversed: PairedTSpikeInput = {
      ...input,
      observations: [...input.observations].reverse(),
    };
    const first = evaluatePairedTG4ExecutionTraceCandidate(input);
    const second = evaluatePairedTG4ExecutionTraceCandidate(reversed);
    expect(first.ok && second.ok).toBe(true);
    if (!first.ok || !second.ok) throw new Error("order-invariance candidate unexpectedly refused");
    expect(second.trace).toEqual(first.trace);
    expect(second.result).toEqual(first.result);
  });

  it("rejects coherently rehashed node, schedule, source, input, and outcome mutations", () => {
    const result = evaluatePairedTG4ExecutionTraceCandidate(
      inputFromPairs([
        [3, 1],
        [7, 2],
        [11, 5],
        [19, 7],
      ]),
    );
    if (!result.ok) throw new Error("trace-mutation seed unexpectedly refused");

    const mutations: MutableTrace[] = [];
    const changedResult = cloneTrace(result.trace);
    changedResult.nodes[0]!.result_binary64_hex = "0000000000000000";
    mutations.push(changedResult);

    const reordered = cloneTrace(result.trace);
    [reordered.nodes[0], reordered.nodes[1]] = [reordered.nodes[1]!, reordered.nodes[0]!];
    mutations.push(reordered);

    const omitted = cloneTrace(result.trace);
    omitted.nodes.splice(3, 1);
    omitted.node_count -= 1;
    mutations.push(omitted);

    const changedSource = cloneTrace(result.trace);
    changedSource.outcome.test_statistic_source_sequence -= 1;
    mutations.push(changedSource);

    const changedInput = cloneTrace(result.trace);
    changedInput.input.pairs[0]!.first.outcome_binary64_hex = "4000000000000000";
    mutations.push(changedInput);

    const changedOutcome = cloneTrace(result.trace);
    changedOutcome.outcome.mean_difference_binary64_hex = "0000000000000000";
    mutations.push(changedOutcome);

    for (const mutation of mutations) {
      recomputeTraceHash(mutation);
      expect(verifyPairedTG4ExecutionTraceCandidate(mutation).ok).toBe(false);
    }
  });

  it("fails closed on hostile shapes without invoking caller accessors", () => {
    let getterCalls = 0;
    const accessor = Object.defineProperty({}, "conditionOrder", {
      enumerable: true,
      get: () => {
        getterCalls += 1;
        return ["before", "after"];
      },
    });
    const throwingProxy = new Proxy(
      {},
      {
        ownKeys: () => {
          throw new Error("hostile keys");
        },
      },
    );
    for (const hostile of [null, undefined, [], {}, "invalid", accessor, throwingProxy]) {
      expect(() => evaluatePairedTG4ExecutionTraceCandidate(hostile)).not.toThrow();
      expect(evaluatePairedTG4ExecutionTraceCandidate(hostile)).toMatchObject({
        ok: false,
        candidateArithmeticExecutionVerified: false,
        supportedExecutionPredicateSatisfied: false,
        supportedPlatformClaimed: false,
        supportedDomainClaimed: false,
        runtimeSupportClaimed: false,
      });
      expect(() => verifyPairedTG4ExecutionTraceCandidate(hostile)).not.toThrow();
      expect(verifyPairedTG4ExecutionTraceCandidate(hostile).ok).toBe(false);
      expect(() => validatePairedTG4ExecutionCheckpoint(hostile)).not.toThrow();
      expect(validatePairedTG4ExecutionCheckpoint(hostile).length).toBeGreaterThan(0);
    }
    expect(getterCalls).toBe(0);
  });

  it("keeps the df evaluation ceiling separate from supported-domain selection", () => {
    const pairs = Array.from(
      { length: PAIRED_T_G4_MAXIMUM_PAIRS_EVALUATION_CANDIDATE + 1 },
      (_, index) => [index + 1, 0] as [number, number],
    );
    expect(evaluatePairedTG4ExecutionTraceCandidate(inputFromPairs(pairs))).toMatchObject({
      ok: false,
      classification: "outside_evaluation_range",
      supportedDomainClaimed: false,
      runtimeSupportClaimed: false,
    });
  });
});
