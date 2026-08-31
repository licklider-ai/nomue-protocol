import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import type { PairedObservationSpike, PairedTSpikeInput } from "../../reference/spikes/paired-t.js";
import {
  evaluatePairedTG4TailTraceCompositionCandidate,
  validatePairedTG4TailCompositionCheckpoint,
  verifyPairedTG4TailTraceCompositionCandidate,
  type PairedTG4TailCompositionCheckpointCandidate,
  type PairedTG4TailTraceCompositionCandidate,
} from "../src/spikes/paired-t-g4-tail-trace-composition-candidate.js";
import { evaluatePairedTSupportedExecutionCandidate } from "../src/spikes/paired-t-supported-execution-candidate.js";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const checkpointPath = path.join(
  repositoryRoot,
  "governance/drafts/release-2-candidate/numerical/g4-tail-trace-composition-candidate.json",
);

function loadCheckpoint(): PairedTG4TailCompositionCheckpointCandidate {
  return JSON.parse(
    readFileSync(checkpointPath, "utf8"),
  ) as PairedTG4TailCompositionCheckpointCandidate;
}

function cloneCheckpoint(): PairedTG4TailCompositionCheckpointCandidate {
  return JSON.parse(
    JSON.stringify(loadCheckpoint()),
  ) as PairedTG4TailCompositionCheckpointCandidate;
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

function cloneComposition(
  composition: PairedTG4TailTraceCompositionCandidate,
): Record<string, unknown> {
  return JSON.parse(JSON.stringify(composition)) as Record<string, unknown>;
}

function recomputeCompositionHash(composition: Record<string, unknown>): void {
  const payload = { format: composition["format"], link: composition["link"] };
  composition["sha256"] = `sha256:${createHash("sha256")
    .update(JSON.stringify(payload), "utf8")
    .digest("hex")}`;
}

describe("R2-D5 G4-to-tail trace composition candidate", () => {
  it("pins an independently reviewed, unissued, non-runtime checkpoint with bounded readiness admission", () => {
    expect(validatePairedTG4TailCompositionCheckpoint(loadCheckpoint())).toEqual([]);

    const promoted = cloneCheckpoint();
    promoted.runtime_support_enabled = true;
    promoted.supported_domain_claimed = true;
    promoted.closure_state["supported_execution_predicate"] = "selected";
    expect(validatePairedTG4TailCompositionCheckpoint(promoted).length).toBeGreaterThan(0);

    const demotedReview = cloneCheckpoint();
    demotedReview.readiness_admission["admission_state"] =
      "held_pending_independent_adversarial_review";
    demotedReview.closure_state["tail_trace_composition_review"] = "pending";
    expect(validatePairedTG4TailCompositionCheckpoint(demotedReview).length).toBeGreaterThan(0);

    const fabricatedTruth = cloneCheckpoint();
    fabricatedTruth.closure_state["g4_mathematical_truth_error_bound"] = "complete";
    fabricatedTruth.closure_state["confidence_interval_trace_composition"] = "complete";
    expect(validatePairedTG4TailCompositionCheckpoint(fabricatedTruth).length).toBeGreaterThan(0);
  });

  it("binds raw paired observations through the verified G4 trace to the verified tail trace", () => {
    const result = evaluatePairedTG4TailTraceCompositionCandidate(
      inputFromPairs([
        [1, 0],
        [2, 0],
        [3, 0],
      ]),
    );
    expect(result).toMatchObject({
      ok: true,
      tailTraceCompositionImplemented: true,
      tailTraceCompositionIndependentlyReviewed: true,
      g4MathematicalTruthErrorBoundComplete: false,
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
      verification: {
        compositionVerified: true,
        g4TraceVerified: true,
        tailTraceVerified: true,
      },
      tailProof: {
        source: "same_execution_trace_as_returned_value",
        truthErrorBoundSelected: false,
      },
    });
    if (!result.ok) {
      throw new Error("ordinary composition candidate unexpectedly refused");
    }

    const { composition } = result;
    expect(composition.link.g4_trace_sha256).toBe(composition.g4_trace.sha256);
    expect(composition.link.tail_trace_sha256).toBe(composition.tail_trace.sha256);
    expect(composition.link.g4_test_statistic_binary64_hex).toBe(
      composition.tail_trace.input.test_statistic_binary64_hex,
    );
    expect(composition.link.g4_degrees_of_freedom).toBe(
      composition.tail_trace.input.degrees_of_freedom,
    );
    expect(composition.link.p_value_binary64_hex).toBe(
      composition.tail_trace.outcome.p_value_binary64_hex,
    );
    expect(result.result.pValueBinary64Hex).toBe(composition.link.p_value_binary64_hex);
    expect(verifyPairedTG4TailTraceCompositionCandidate(composition)).toEqual({
      ok: true,
      errors: [],
    });
    expect(Object.isFrozen(composition)).toBe(true);
    expect(Object.isFrozen(composition.link)).toBe(true);
    expect(Object.isFrozen(composition.g4_trace)).toBe(true);
    expect(Object.isFrozen(composition.tail_trace)).toBe(true);
  });

  it("preserves the exact-zero tail branch through the composed handoff", () => {
    const result = evaluatePairedTG4TailTraceCompositionCandidate(
      inputFromPairs([
        [-1, 0],
        [1, 0],
      ]),
    );
    expect(result).toMatchObject({
      ok: true,
      result: {
        testStatistic: 0,
        degreesOfFreedom: 1,
        pValue: 1,
        pValueBinary64Hex: "3ff0000000000000",
      },
    });
    if (!result.ok) {
      throw new Error("exact-zero composition candidate unexpectedly refused");
    }
    expect(result.composition.tail_trace.outcome.branch).toBe("exact-zero");
    expect(result.composition.link.p_value_source_sequence).toBeNull();
  });

  it("canonicalizes observation insertion order to the same composed trace chain", () => {
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
    const first = evaluatePairedTG4TailTraceCompositionCandidate(input);
    const second = evaluatePairedTG4TailTraceCompositionCandidate(reversed);
    expect(first.ok && second.ok).toBe(true);
    if (!first.ok || !second.ok) {
      throw new Error("order-invariance composition unexpectedly refused");
    }
    expect(second.composition).toEqual(first.composition);
    expect(second.result).toEqual(first.result);
  });

  it("fails closed on coherent handoff-link and swapped-tail attacks", () => {
    const result = evaluatePairedTG4TailTraceCompositionCandidate(
      inputFromPairs([
        [1, 0],
        [2, 0],
        [3, 0],
      ]),
    );
    if (!result.ok) {
      throw new Error("mutation-control composition unexpectedly refused");
    }

    const changedLink = cloneComposition(result.composition);
    const changedLinkRecord = changedLink["link"] as Record<string, unknown>;
    changedLinkRecord["tail_input_test_statistic_binary64_hex"] = "3ff0000000000000";
    recomputeCompositionHash(changedLink);
    expect(verifyPairedTG4TailTraceCompositionCandidate(changedLink)).toMatchObject({ ok: false });

    const alternateTail = evaluatePairedTSupportedExecutionCandidate({
      degreesOfFreedom: 2,
      testStatistic: 1,
    });
    if (!alternateTail.ok) {
      throw new Error("alternate tail trace unexpectedly refused");
    }
    const swappedTail = cloneComposition(result.composition);
    swappedTail["tail_trace"] = alternateTail.trace;
    const swappedLink = swappedTail["link"] as Record<string, unknown>;
    swappedLink["tail_trace_sha256"] = alternateTail.trace.sha256;
    swappedLink["tail_input_test_statistic_binary64_hex"] =
      alternateTail.trace.input.test_statistic_binary64_hex;
    swappedLink["tail_input_degrees_of_freedom"] = alternateTail.trace.input.degrees_of_freedom;
    swappedLink["p_value_binary64_hex"] = alternateTail.trace.outcome.p_value_binary64_hex;
    swappedLink["p_value_source_sequence"] = alternateTail.trace.outcome.p_value_source_sequence;
    recomputeCompositionHash(swappedTail);
    expect(verifyPairedTG4TailTraceCompositionCandidate(swappedTail)).toMatchObject({ ok: false });
  });

  it("preserves G4 refusal as the first composed-stage failure", () => {
    const result = evaluatePairedTG4TailTraceCompositionCandidate(
      inputFromPairs([
        [1, 0],
        [1, 0],
      ]),
    );
    expect(result).toMatchObject({
      ok: false,
      classification: "g4_stage_refusal",
      g4Classification: "g4_graph_refusal",
      g4GraphClassification: "ZERO_DIFFERENCE_VARIANCE",
      tailTraceCompositionImplemented: true,
      tailTraceCompositionIndependentlyReviewed: true,
      supportedDomainClaimed: false,
      runtimeSupportClaimed: false,
    });
  });

  it("contains hostile composition and checkpoint shapes without invoking accessors", () => {
    let getterCalls = 0;
    const hostileComposition = Object.defineProperty(
      {
        format: "paired-t-g4-tail-trace-composition-v1",
        g4_trace: {},
        tail_trace: {},
        link: {},
      },
      "sha256",
      {
        enumerable: true,
        get: () => {
          getterCalls += 1;
          return "sha256:0000000000000000000000000000000000000000000000000000000000000000";
        },
      },
    );
    expect(() => verifyPairedTG4TailTraceCompositionCandidate(hostileComposition)).not.toThrow();
    expect(verifyPairedTG4TailTraceCompositionCandidate(hostileComposition)).toMatchObject({
      ok: false,
    });

    const hostileCheckpoint = new Proxy(
      {},
      {
        ownKeys: () => {
          throw new Error("hostile checkpoint keys");
        },
      },
    );
    expect(() => validatePairedTG4TailCompositionCheckpoint(hostileCheckpoint)).not.toThrow();
    expect(validatePairedTG4TailCompositionCheckpoint(hostileCheckpoint).length).toBeGreaterThan(0);
    expect(getterCalls).toBe(0);
  });
});
