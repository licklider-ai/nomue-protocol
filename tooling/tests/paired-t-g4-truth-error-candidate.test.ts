import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import type { PairedObservationSpike, PairedTSpikeInput } from "../../reference/spikes/paired-t.js";
import {
  evaluatePairedTG4TruthErrorCandidate,
  validatePairedTG4TruthErrorCheckpoint,
  verifyPairedTG4TruthErrorCandidate,
  type PairedTG4TruthErrorCheckpointCandidate,
  type PairedTG4TruthErrorEnvelopeCandidate,
} from "../src/spikes/paired-t-g4-truth-error-candidate.js";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const checkpointPath = path.join(
  repositoryRoot,
  "governance/drafts/release-2-candidate/numerical/g4-truth-error-candidate.json",
);

function loadCheckpoint(): PairedTG4TruthErrorCheckpointCandidate {
  return JSON.parse(readFileSync(checkpointPath, "utf8")) as PairedTG4TruthErrorCheckpointCandidate;
}

function cloneCheckpoint(): PairedTG4TruthErrorCheckpointCandidate {
  return JSON.parse(JSON.stringify(loadCheckpoint())) as PairedTG4TruthErrorCheckpointCandidate;
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

type MutableEnvelope = {
  format: string;
  g4_trace: {
    sha256: string;
    nodes: Array<{ result_binary64_hex: string }>;
    [key: string]: unknown;
  };
  proof: {
    g4_trace_sha256: string;
    mean_difference: {
      truth_interval: {
        lower: { numerator: string; denominator: string };
        upper: { numerator: string; denominator: string };
      };
    };
    [key: string]: unknown;
  };
  sha256: string;
};

function cloneEnvelope(envelope: PairedTG4TruthErrorEnvelopeCandidate): MutableEnvelope {
  return JSON.parse(JSON.stringify(envelope)) as MutableEnvelope;
}

function recomputeTraceHash(trace: MutableEnvelope["g4_trace"]): void {
  const payload = {
    format: trace["format"],
    input: trace["input"],
    outcome: trace["outcome"],
    node_count: trace["node_count"],
    maximum_node_count_evaluation_candidate: trace["maximum_node_count_evaluation_candidate"],
    nodes: trace.nodes,
  };
  trace.sha256 = `sha256:${createHash("sha256").update(JSON.stringify(payload), "utf8").digest("hex")}`;
}

function recomputeEnvelopeHash(envelope: MutableEnvelope): void {
  const payload = {
    format: envelope.format,
    g4_trace: envelope.g4_trace,
    proof: envelope.proof,
  };
  envelope.sha256 = `sha256:${createHash("sha256")
    .update(JSON.stringify(payload), "utf8")
    .digest("hex")}`;
}

describe("R2-D5 G4 mathematical-truth error candidate", () => {
  it("pins an unissued, independently reviewed, non-runtime checkpoint", () => {
    expect(validatePairedTG4TruthErrorCheckpoint(loadCheckpoint())).toEqual([]);

    const promoted = cloneCheckpoint();
    promoted.runtime_support_enabled = true;
    promoted.supported_domain_claimed = true;
    expect(validatePairedTG4TruthErrorCheckpoint(promoted).length).toBeGreaterThan(0);

    const demoted = cloneCheckpoint();
    demoted.closure_state["independent_adversarial_review"] = "pending";
    demoted.closure_state["readiness_admission"] = "held_pending_independent_adversarial_review";
    demoted.closure_state["g4_mathematical_truth_error_bound"] = "implemented_not_reviewed";
    expect(validatePairedTG4TruthErrorCheckpoint(demoted).length).toBeGreaterThan(0);

    const selected = cloneCheckpoint();
    selected.closure_state["supported_resource_bound"] = "selected";
    selected.closure_state["supported_execution_predicate"] = "selected";
    expect(validatePairedTG4TruthErrorCheckpoint(selected).length).toBeGreaterThan(0);

    const extra = cloneCheckpoint() as PairedTG4TruthErrorCheckpointCandidate & {
      supported?: boolean;
    };
    extra.supported = true;
    expect(validatePairedTG4TruthErrorCheckpoint(extra).length).toBeGreaterThan(0);
  });

  it("binds exact difference, mean, and variance truth to the verified G4 trace", () => {
    const result = evaluatePairedTG4TruthErrorCandidate(
      inputFromPairs([
        [1, 0],
        [2, 0],
        [3, 0],
      ]),
    );
    expect(result).toMatchObject({
      ok: true,
      candidateArithmeticExecutionVerified: true,
      mathematicalTruthErrorBoundImplemented: true,
      mathematicalTruthErrorBoundIndependentlyReviewed: true,
      mathematicalTruthErrorBoundComplete: true,
      supportedExecutionPredicateSatisfied: false,
      supportedPlatformClaimed: false,
      supportedDomainClaimed: false,
      runtimeSupportClaimed: false,
    });
    if (!result.ok) throw new Error("ordinary G4 truth-error candidate unexpectedly refused");

    expect(result.proof.g4_trace_sha256).toBe(result.envelope.g4_trace.sha256);
    expect(result.proof.differences.map((entry) => entry.truth_interval.lower)).toEqual([
      { numerator: "1", denominator: "1" },
      { numerator: "2", denominator: "1" },
      { numerator: "3", denominator: "1" },
    ]);
    expect(result.proof.differences.map((entry) => entry.absolute_error_upper_bound)).toEqual([
      { numerator: "0", denominator: "1" },
      { numerator: "0", denominator: "1" },
      { numerator: "0", denominator: "1" },
    ]);
    expect(result.proof.mean_difference.truth_interval).toEqual({
      lower: { numerator: "2", denominator: "1" },
      upper: { numerator: "2", denominator: "1" },
    });
    expect(result.proof.mean_difference.absolute_error_upper_bound).toEqual({
      numerator: "0",
      denominator: "1",
    });
    expect(result.proof.sample_variance.truth_interval).toEqual({
      lower: { numerator: "1", denominator: "1" },
      upper: { numerator: "1", denominator: "1" },
    });
    expect(result.proof.sample_variance.absolute_error_upper_bound).toEqual({
      numerator: "0",
      denominator: "1",
    });

    expect(result.proof.standard_error.truth_interval.lower).not.toEqual(
      result.proof.standard_error.truth_interval.upper,
    );
    expect(result.proof.standard_error.absolute_error_upper_bound.numerator).not.toBe("0");
    expect(result.proof.test_statistic.truth_interval.lower).not.toEqual(
      result.proof.test_statistic.truth_interval.upper,
    );
    expect(result.proof.test_statistic.absolute_error_upper_bound.numerator).not.toBe("0");

    expect(verifyPairedTG4TruthErrorCandidate(result.envelope)).toEqual({
      ok: true,
      errors: [],
    });
    expect(Object.isFrozen(result.envelope)).toBe(true);
    expect(Object.isFrozen(result.envelope.proof)).toBe(true);
    expect(Object.isFrozen(result.envelope.g4_trace)).toBe(true);
  });

  it("handles exact zero and negative mathematical test statistics without widening semantics", () => {
    const zero = evaluatePairedTG4TruthErrorCandidate(
      inputFromPairs([
        [0, 1],
        [1, 1],
        [2, 1],
      ]),
    );
    if (!zero.ok) throw new Error("zero-mean G4 truth-error candidate unexpectedly refused");
    expect(zero.proof.mean_difference.truth_interval).toEqual({
      lower: { numerator: "0", denominator: "1" },
      upper: { numerator: "0", denominator: "1" },
    });
    expect(zero.proof.test_statistic.truth_interval).toEqual({
      lower: { numerator: "0", denominator: "1" },
      upper: { numerator: "0", denominator: "1" },
    });
    expect(zero.proof.test_statistic.absolute_error_upper_bound).toEqual({
      numerator: "0",
      denominator: "1",
    });

    const negative = evaluatePairedTG4TruthErrorCandidate(
      inputFromPairs([
        [0, 1],
        [0, 2],
        [0, 3],
      ]),
    );
    if (!negative.ok)
      throw new Error("negative-mean G4 truth-error candidate unexpectedly refused");
    expect(BigInt(negative.proof.mean_difference.truth_interval.lower.numerator)).toBeLessThan(0n);
    expect(BigInt(negative.proof.test_statistic.truth_interval.lower.numerator)).toBeLessThan(0n);
    expect(BigInt(negative.proof.test_statistic.truth_interval.upper.numerator)).toBeLessThan(0n);
  });

  it("is canonical with respect to raw observation insertion order", () => {
    const input = inputFromPairs([
      [0.1, -0.2],
      [0.4, 0.1],
      [1.3, 0.2],
      [-0.7, -1.1],
    ]);
    const reversed: PairedTSpikeInput = {
      ...input,
      observations: [...input.observations].reverse(),
    };
    const first = evaluatePairedTG4TruthErrorCandidate(input);
    const second = evaluatePairedTG4TruthErrorCandidate(reversed);
    expect(first.ok).toBe(true);
    expect(second.ok).toBe(true);
    if (!first.ok || !second.ok) throw new Error("canonicalization witness unexpectedly refused");
    expect(second.envelope).toEqual(first.envelope);
  });

  it("rejects a coherently rehashed false proof", () => {
    const result = evaluatePairedTG4TruthErrorCandidate(
      inputFromPairs([
        [1, 0],
        [2, 0],
        [3, 0],
      ]),
    );
    if (!result.ok) throw new Error("proof-mutation witness unexpectedly refused");
    const mutated = cloneEnvelope(result.envelope);
    mutated.proof.mean_difference.truth_interval.lower.numerator = "3";
    recomputeEnvelopeHash(mutated);
    const verification = verifyPairedTG4TruthErrorCandidate(mutated);
    expect(verification.ok).toBe(false);
    expect(verification.errors).toContain(
      "G4 truth-error envelope differs from the independently reconstructed proof",
    );
  });

  it("rejects a coherently rehashed nested G4 trace mutation before proof acceptance", () => {
    const result = evaluatePairedTG4TruthErrorCandidate(
      inputFromPairs([
        [1, 0],
        [2, 0],
        [3, 0],
      ]),
    );
    if (!result.ok) throw new Error("nested-trace mutation witness unexpectedly refused");
    const mutated = cloneEnvelope(result.envelope);
    const firstNode = mutated.g4_trace.nodes[0];
    if (firstNode === undefined) throw new Error("expected at least one G4 trace node");
    firstNode.result_binary64_hex = "0000000000000000";
    recomputeTraceHash(mutated.g4_trace);
    mutated.proof.g4_trace_sha256 = mutated.g4_trace.sha256;
    recomputeEnvelopeHash(mutated);
    const verification = verifyPairedTG4TruthErrorCandidate(mutated);
    expect(verification.ok).toBe(false);
    expect(verification.errors[0]).toBe("nested G4 trace verification failed");
  });

  it("fails closed on hostile envelope shapes without invoking caller accessors", () => {
    let getterCalls = 0;
    const accessor = {};
    Object.defineProperty(accessor, "format", {
      enumerable: true,
      get() {
        getterCalls += 1;
        throw new Error("must not be invoked");
      },
    });
    expect(verifyPairedTG4TruthErrorCandidate(accessor).ok).toBe(false);
    expect(getterCalls).toBe(0);

    const cyclic: Record<string, unknown> = {};
    cyclic["self"] = cyclic;
    expect(verifyPairedTG4TruthErrorCandidate(cyclic).ok).toBe(false);

    expect(verifyPairedTG4TruthErrorCandidate(null).ok).toBe(false);
    expect(verifyPairedTG4TruthErrorCandidate([]).ok).toBe(false);
    expect(verifyPairedTG4TruthErrorCandidate(Object.create({ format: "x" })).ok).toBe(false);
  });

  it("preserves the existing G4 first-stage refusal instead of manufacturing a truth proof", () => {
    const result = evaluatePairedTG4TruthErrorCandidate(
      inputFromPairs([
        [1, 0],
        [2, 1],
      ]),
    );
    expect(result).toMatchObject({
      ok: false,
      classification: "g4_stage_refusal",
      g4Classification: "g4_graph_refusal",
      graphClassification: "ZERO_DIFFERENCE_VARIANCE",
      mathematicalTruthErrorBoundImplemented: false,
      mathematicalTruthErrorBoundComplete: false,
      runtimeSupportClaimed: false,
    });
  });

  it("handles the full 201-pair evaluation ceiling without turning it into support", () => {
    const pairs: Array<[number, number]> = [];
    for (let index = 0; index < 201; index += 1) {
      pairs.push([index / 8 + (index % 7), (index % 11) - 5]);
    }
    const result = evaluatePairedTG4TruthErrorCandidate(inputFromPairs(pairs));
    expect(result).toMatchObject({
      ok: true,
      mathematicalTruthErrorBoundImplemented: true,
      mathematicalTruthErrorBoundIndependentlyReviewed: true,
      mathematicalTruthErrorBoundComplete: true,
      supportedDomainClaimed: false,
      runtimeSupportClaimed: false,
    });
    if (!result.ok) throw new Error("201-pair truth-error witness unexpectedly refused");
    expect(result.g4Result.nPairs).toBe(201);
    expect(result.proof.differences).toHaveLength(201);
  }, 20_000);
});
