import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  evaluatePairedTCIEndpointTruthCandidate,
  validatePairedTCIEndpointTruthCheckpoint,
  verifyPairedTCIEndpointTruthCandidate,
  type PairedTCIEndpointTruthEnvelopeCandidate,
} from "../src/spikes/paired-t-ci-endpoint-truth-error-candidate.js";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const checkpointPath = path.join(
  repositoryRoot,
  "governance/drafts/release-2-candidate/numerical/ci-endpoint-truth-error-candidate.json",
);

function inputFromDifferences(differences: readonly number[]) {
  return {
    conditionOrder: ["first", "second"] as const,
    repeatedMeasurements: "none" as const,
    observations: differences.flatMap((difference, index) => [
      {
        observationId: `review-${index}-first`,
        experimentalUnitId: `review-unit-${index}-first`,
        pairId: `review-p${index.toString().padStart(3, "0")}`,
        conditionId: "first",
        outcomeValue: difference,
      },
      {
        observationId: `review-${index}-second`,
        experimentalUnitId: `review-unit-${index}-second`,
        pairId: `review-p${index.toString().padStart(3, "0")}`,
        conditionId: "second",
        outcomeValue: 0,
      },
    ]),
  };
}

function recomputeOuterHash(envelope: Record<string, any>): void {
  const payload = {
    format: envelope.format,
    ci_trace: envelope.ci_trace,
    g4_truth_envelope: envelope.g4_truth_envelope,
    proof: envelope.proof,
  };
  envelope.sha256 = `sha256:${createHash("sha256").update(JSON.stringify(payload)).digest("hex")}`;
}

function recomputeG4TruthHash(envelope: Record<string, any>): void {
  const payload = {
    format: envelope.format,
    g4_trace: envelope.g4_trace,
    proof: envelope.proof,
  };
  envelope.sha256 = `sha256:${createHash("sha256").update(JSON.stringify(payload)).digest("hex")}`;
}

function recomputeCIHash(trace: Record<string, any>): void {
  const payload = {
    format: trace.format,
    g4_trace: trace.g4_trace,
    selected_table: trace.selected_table,
    nodes: trace.nodes,
    outcome: trace.outcome,
    node_count: trace.node_count,
  };
  trace.sha256 = `sha256:${createHash("sha256").update(JSON.stringify(payload)).digest("hex")}`;
}

function validEnvelope(
  differences: readonly number[] = [1, 2, 3, 5],
): PairedTCIEndpointTruthEnvelopeCandidate {
  const result = evaluatePairedTCIEndpointTruthCandidate(inputFromDifferences(differences));
  if (!result.ok) throw new Error(`review fixture refused: ${result.classification}`);
  return result.envelope;
}

function loadCheckpoint(): Record<string, any> {
  return JSON.parse(readFileSync(checkpointPath, "utf8")) as Record<string, any>;
}

describe("reviewer-only M3-D structural adversarial battery", () => {
  it("covers representative df/sign/magnitude cases and same-trace bindings", () => {
    const cases: Array<{ label: string; differences: number[]; df: number }> = [
      { label: "df1", differences: [1, 3], df: 1 },
      { label: "df2", differences: [1, 2, 3], df: 2 },
      {
        label: "df30",
        differences: Array.from({ length: 31 }, (_, index) => 1 + (index % 7)),
        df: 30,
      },
      {
        label: "df100",
        differences: Array.from({ length: 101 }, (_, index) => 2 + (index % 9)),
        df: 100,
      },
      {
        label: "df200",
        differences: Array.from({ length: 201 }, (_, index) => 3 + (index % 11)),
        df: 200,
      },
      { label: "negative", differences: [-1, -2, -4], df: 2 },
      { label: "zero-cross", differences: [-1, 0, 1], df: 2 },
      { label: "large-finite", differences: [0.9e150, 1e150, 1.05e150, 1.1e150], df: 3 },
      {
        label: "small-se-noncollapse",
        differences: [1, 1 + 2 ** -40, 1 + 2 * 2 ** -40, 1 + 3 * 2 ** -40],
        df: 3,
      },
    ];

    for (const entry of cases) {
      const result = evaluatePairedTCIEndpointTruthCandidate(inputFromDifferences(entry.differences));
      expect(result.ok, entry.label).toBe(true);
      if (!result.ok) continue;
      expect(result.ciResult.degreesOfFreedom, entry.label).toBe(entry.df);
      expect(result.envelope.ci_trace.g4_trace, entry.label).toEqual(
        result.envelope.g4_truth_envelope.g4_trace,
      );
      expect(result.proof.ci_trace_sha256, entry.label).toBe(result.envelope.ci_trace.sha256);
      expect(result.proof.g4_truth_envelope_sha256, entry.label).toBe(
        result.envelope.g4_truth_envelope.sha256,
      );
      expect(result.proof.g4_trace_sha256, entry.label).toBe(result.envelope.ci_trace.g4_trace.sha256);
      expect(result.proof.critical_value.degrees_of_freedom, entry.label).toBe(entry.df);
      expect(verifyPairedTCIEndpointTruthCandidate(result.envelope), entry.label).toEqual({
        ok: true,
        errors: [],
      });
      expect(result.confidenceIntervalEndpointTruthComplete, entry.label).toBe(false);
      expect(result.supportedDomainClaimed, entry.label).toBe(false);
      expect(result.runtimeSupportClaimed, entry.label).toBe(false);
    }
  });

  it("rejects coherent proof/nested-envelope substitutions after digest repair", () => {
    const original = validEnvelope();
    const other = validEnvelope([2, 4, 7, 9]);

    const attacks: Array<(envelope: Record<string, any>) => void> = [
      (envelope) => {
        envelope.proof.margin.truth_interval.lower.numerator = "123456789";
      },
      (envelope) => {
        envelope.proof.lower_endpoint.absolute_error_upper_bound.numerator = "999999";
      },
      (envelope) => {
        envelope.proof.upper_endpoint.truth_interval.upper.denominator = "3";
      },
      (envelope) => {
        envelope.proof.critical_value.predecessor_binary64_hex =
          envelope.proof.critical_value.graph_binary64_hex;
      },
      (envelope) => {
        envelope.proof.critical_value.successor_binary64_hex =
          envelope.proof.critical_value.graph_binary64_hex;
      },
      (envelope) => {
        envelope.proof.critical_value.absolute_quantization_upper_bound.numerator = "0";
      },
      (envelope) => {
        envelope.proof.mean_difference_truth_interval.lower.numerator = "0";
      },
      (envelope) => {
        envelope.proof.standard_error_truth_interval.upper.numerator = "1";
      },
      (envelope) => {
        envelope.proof.selected_table_content_hash = `sha256:${"1".repeat(64)}`;
      },
      (envelope) => {
        envelope.proof.ci_trace_sha256 = `sha256:${"2".repeat(64)}`;
      },
      (envelope) => {
        envelope.proof.g4_truth_envelope_sha256 = `sha256:${"3".repeat(64)}`;
      },
      (envelope) => {
        envelope.proof.model = "forged";
      },
      (envelope) => {
        envelope.ci_trace.outcome.lower_endpoint_binary64_hex =
          envelope.ci_trace.outcome.upper_endpoint_binary64_hex;
        recomputeCIHash(envelope.ci_trace);
      },
      (envelope) => {
        envelope.g4_truth_envelope.proof.mean_difference.truth_interval.lower.numerator = "0";
        recomputeG4TruthHash(envelope.g4_truth_envelope);
      },
      (envelope) => {
        envelope.ci_trace = structuredClone(other.ci_trace);
      },
      (envelope) => {
        envelope.g4_truth_envelope = structuredClone(other.g4_truth_envelope);
      },
    ];

    for (const attack of attacks) {
      const envelope = structuredClone(original) as unknown as Record<string, any>;
      attack(envelope);
      recomputeOuterHash(envelope);
      expect(verifyPairedTCIEndpointTruthCandidate(envelope).ok).toBe(false);
    }

    const digestOnly = structuredClone(original) as unknown as Record<string, any>;
    digestOnly.sha256 = `sha256:${"4".repeat(64)}`;
    expect(verifyPairedTCIEndpointTruthCandidate(digestOnly).ok).toBe(false);
  });

  it("rejects hostile envelope shapes without invoking caller accessors", () => {
    const original = validEnvelope();

    const hidden = structuredClone(original) as unknown as Record<string, any>;
    Object.defineProperty(hidden, "hidden", { value: true, enumerable: false });
    expect(verifyPairedTCIEndpointTruthCandidate(hidden).ok).toBe(false);

    const symbol = structuredClone(original) as unknown as Record<string, any>;
    Object.defineProperty(symbol, Symbol("support"), { value: true, enumerable: true });
    expect(verifyPairedTCIEndpointTruthCandidate(symbol).ok).toBe(false);

    let getterCalls = 0;
    const accessor = structuredClone(original) as unknown as Record<string, any>;
    Object.defineProperty(accessor, "format", {
      enumerable: true,
      configurable: true,
      get() {
        getterCalls += 1;
        return "paired-t-ci-endpoint-mathematical-truth-error-v1";
      },
    });
    expect(verifyPairedTCIEndpointTruthCandidate(accessor).ok).toBe(false);
    expect(getterCalls).toBe(0);

    const cycle = structuredClone(original) as unknown as Record<string, any>;
    cycle.self = cycle;
    expect(verifyPairedTCIEndpointTruthCandidate(cycle).ok).toBe(false);

    const bigint = structuredClone(original) as unknown as Record<string, any>;
    bigint.extra = 1n;
    expect(verifyPairedTCIEndpointTruthCandidate(bigint).ok).toBe(false);

    const func = structuredClone(original) as unknown as Record<string, any>;
    func.extra = () => true;
    expect(verifyPairedTCIEndpointTruthCandidate(func).ok).toBe(false);

    const proxy = new Proxy(structuredClone(original) as unknown as Record<string, any>, {
      ownKeys() {
        throw new Error("hostile ownKeys");
      },
    });
    expect(() => verifyPairedTCIEndpointTruthCandidate(proxy)).not.toThrow();
    expect(verifyPairedTCIEndpointTruthCandidate(proxy).ok).toBe(false);
  });

  it("rejects checkpoint maturity/support/runtime promotions", () => {
    expect(validatePairedTCIEndpointTruthCheckpoint(loadCheckpoint())).toEqual([]);

    const mutations: Array<(checkpoint: Record<string, any>) => void> = [
      (checkpoint) => {
        checkpoint.runtime_support_enabled = true;
      },
      (checkpoint) => {
        checkpoint.supported_domain_claimed = true;
      },
      (checkpoint) => {
        checkpoint.selected_table_binding.supported_degrees_of_freedom_maximum = 200;
      },
      (checkpoint) => {
        checkpoint.closure_state.endpoint_truth_error_ledger = "independently_reviewed_complete";
      },
      (checkpoint) => {
        checkpoint.closure_state.m3_closed = true;
      },
      (checkpoint) => {
        checkpoint.closure_state.supported_platform_matrix = "selected";
      },
      (checkpoint) => {
        checkpoint.closure_state.supported_execution_predicate = "selected";
      },
      (checkpoint) => {
        checkpoint.closure_state.supported_domain = true;
      },
      (checkpoint) => {
        checkpoint.closure_state.runtime_support = true;
      },
      (checkpoint) => {
        checkpoint.closure_state.final_reason_codes_frozen = true;
      },
      (checkpoint) => {
        checkpoint.proof_model.finite_corpus_maximum_is_a_bound = true;
      },
    ];

    for (const mutate of mutations) {
      const checkpoint = loadCheckpoint();
      mutate(checkpoint);
      expect(validatePairedTCIEndpointTruthCheckpoint(checkpoint)).not.toEqual([]);
    }
  });

  it("propagates the known endpoint-collapse refusal instead of creating a truth proof", () => {
    const nextAfterOne = 1 + Number.EPSILON;
    const differences = Array.from({ length: 201 }, (_, index) =>
      index % 2 === 0 ? nextAfterOne : 1,
    );
    expect(evaluatePairedTCIEndpointTruthCandidate(inputFromDifferences(differences))).toMatchObject({
      ok: false,
      classification: "ci_stage_refusal",
      ciClassification: "confidence_interval_endpoint_collapse",
      confidenceIntervalEndpointTruthComplete: false,
      runtimeSupportClaimed: false,
    });
  });
});
