import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  evaluatePairedTCIEndpointTruthCandidate,
  validatePairedTCIEndpointTruthCheckpoint,
  verifyPairedTCIEndpointTruthCandidate,
} from "../src/spikes/paired-t-ci-endpoint-truth-candidate.js";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const checkpointPath = path.join(
  repositoryRoot,
  "governance/drafts/release-2-candidate/numerical/ci-endpoint-truth-candidate.json",
);

interface Fraction {
  numerator: bigint;
  denominator: bigint;
}

function inputFromDifferences(differences: readonly number[]) {
  return {
    conditionOrder: ["first", "second"] as const,
    repeatedMeasurements: "none" as const,
    observations: differences.flatMap((difference, index) => [
      {
        observationId: `p${index}-first`,
        experimentalUnitId: `u${index}-first`,
        pairId: `p${index.toString().padStart(3, "0")}`,
        conditionId: "first",
        outcomeValue: difference,
      },
      {
        observationId: `p${index}-second`,
        experimentalUnitId: `u${index}-second`,
        pairId: `p${index.toString().padStart(3, "0")}`,
        conditionId: "second",
        outcomeValue: 0,
      },
    ]),
  };
}

function fraction(value: { numerator: string; denominator: string }): Fraction {
  return { numerator: BigInt(value.numerator), denominator: BigInt(value.denominator) };
}

function compare(first: Fraction, second: Fraction): number {
  const delta = first.numerator * second.denominator - second.numerator * first.denominator;
  return delta < 0n ? -1 : delta > 0n ? 1 : 0;
}

function subtract(first: Fraction, second: Fraction): Fraction {
  return {
    numerator: first.numerator * second.denominator - second.numerator * first.denominator,
    denominator: first.denominator * second.denominator,
  };
}

function absolute(value: Fraction): Fraction {
  return {
    numerator: value.numerator < 0n ? -value.numerator : value.numerator,
    denominator: value.denominator,
  };
}

function exactBinary64(hex: string): Fraction {
  const bits = BigInt(`0x${hex}`);
  const sign = bits >> 63n === 0n ? 1n : -1n;
  const exponent = Number((bits >> 52n) & 0x7ffn);
  const significand = bits & ((1n << 52n) - 1n);
  if (exponent === 0) {
    return { numerator: sign * significand, denominator: 1n << 1074n };
  }
  const integerSignificand = (1n << 52n) | significand;
  const shift = exponent - 1023 - 52;
  return shift >= 0
    ? { numerator: sign * (integerSignificand << BigInt(shift)), denominator: 1n }
    : { numerator: sign * integerSignificand, denominator: 1n << BigInt(-shift) };
}

function expectQuantityBound(quantity: {
  graph_binary64_hex: string;
  truth_interval: {
    lower: { numerator: string; denominator: string };
    upper: { numerator: string; denominator: string };
  };
  absolute_error_upper_bound: { numerator: string; denominator: string };
}) {
  const graph = exactBinary64(quantity.graph_binary64_hex);
  const lower = fraction(quantity.truth_interval.lower);
  const upper = fraction(quantity.truth_interval.upper);
  const bound = fraction(quantity.absolute_error_upper_bound);
  expect(compare(lower, upper)).toBeLessThanOrEqual(0);
  expect(compare(absolute(subtract(graph, lower)), bound)).toBeLessThanOrEqual(0);
  expect(compare(absolute(subtract(graph, upper)), bound)).toBeLessThanOrEqual(0);
}

function loadCheckpoint(): Record<string, any> {
  return JSON.parse(readFileSync(checkpointPath, "utf8")) as Record<string, any>;
}

function rebuildOuterDigest(envelope: Record<string, any>): void {
  const { sha256: _discarded, ...payload } = envelope;
  envelope.sha256 = `sha256:${createHash("sha256").update(JSON.stringify(payload)).digest("hex")}`;
}

describe("paired-t fixed-95 CI endpoint truth composition candidate", () => {
  it("composes the reviewed G4 truth and selected critical-value cell without closing M3", () => {
    const result = evaluatePairedTCIEndpointTruthCandidate(inputFromDifferences([1, 2, 3]));
    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.candidateArithmeticExecutionVerified).toBe(true);
    expect(result.g4MathematicalTruthIndependentlyReviewed).toBe(true);
    expect(result.confidenceIntervalEndpointTruthImplemented).toBe(true);
    expect(result.confidenceIntervalEndpointTruthIndependentlyReviewed).toBe(false);
    expect(result.confidenceIntervalEndpointTruthComplete).toBe(false);
    expect(result.supportedDomainClaimed).toBe(false);
    expect(result.runtimeSupportClaimed).toBe(false);
    expect(result.proof.critical_value).toMatchObject({
      degrees_of_freedom: 2,
      graph_binary64_hex: "401135ea98e146bb",
      selected_table_content_hash:
        "sha256:24ccc86d7a49b9e1ef1e3fc9b038a5b8d338b8b5ca4a02492d8900d7e7dea3c0",
    });
    expect(result.proof.margin.source_sequence).toBe(0);
    expect(result.proof.lower_endpoint.source_sequence).toBe(1);
    expect(result.proof.upper_endpoint.source_sequence).toBe(2);
    expect(result.proof.endpoint_truth_bound_selected).toBe(false);
    expect(result.proof.finite_corpus_maximum_is_a_bound).toBe(false);
    expectQuantityBound(result.proof.margin);
    expectQuantityBound(result.proof.lower_endpoint);
    expectQuantityBound(result.proof.upper_endpoint);
    expect(verifyPairedTCIEndpointTruthCandidate(result.envelope)).toEqual({
      ok: true,
      errors: [],
    });
    expect(Object.isFrozen(result.envelope)).toBe(true);
    expect(Object.isFrozen(result.envelope.proof.critical_value.truth_rounding_cell)).toBe(true);
  });

  it.each([
    { label: "df=1 negative mean", values: [-2, -1], df: 1 },
    { label: "zero-crossing interval", values: [-1, 0, 1], df: 2 },
    {
      label: "df=200",
      values: Array.from({ length: 201 }, (_, index) => (index % 3) - 1),
      df: 200,
    },
  ])("builds ordered endpoint truth intervals for $label", ({ values, df }) => {
    const result = evaluatePairedTCIEndpointTruthCandidate(inputFromDifferences(values));
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.proof.critical_value.degrees_of_freedom).toBe(df);
    const lower = result.proof.lower_endpoint.truth_interval;
    const upper = result.proof.upper_endpoint.truth_interval;
    expect(compare(fraction(lower.lower), fraction(lower.upper))).toBeLessThanOrEqual(0);
    expect(compare(fraction(upper.lower), fraction(upper.upper))).toBeLessThanOrEqual(0);
    expect(compare(fraction(lower.upper), fraction(upper.lower))).toBeLessThan(0);
    expectQuantityBound(result.proof.margin);
    expectQuantityBound(result.proof.lower_endpoint);
    expectQuantityBound(result.proof.upper_endpoint);
  });

  it("pins a positive adjacent-binary64 rounding cell and a covering quantization bound", () => {
    const result = evaluatePairedTCIEndpointTruthCandidate(inputFromDifferences([1, 2, 3]));
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const critical = result.proof.critical_value;
    const graph = exactBinary64(critical.graph_binary64_hex);
    const lower = fraction(critical.truth_rounding_cell.lower);
    const upper = fraction(critical.truth_rounding_cell.upper);
    const bound = fraction(critical.absolute_quantization_error_upper_bound);
    expect(compare(lower, graph)).toBeLessThan(0);
    expect(compare(graph, upper)).toBeLessThan(0);
    expect(compare(absolute(subtract(graph, lower)), bound)).toBeLessThanOrEqual(0);
    expect(compare(absolute(subtract(upper, graph)), bound)).toBeLessThanOrEqual(0);
  });

  it("rejects coherent nested-proof, composition, source, outcome, and digest mutations", () => {
    const result = evaluatePairedTCIEndpointTruthCandidate(inputFromDifferences([1, 2, 3, 5]));
    expect(result.ok).toBe(true);
    if (!result.ok) return;

    const attacks: Array<(envelope: Record<string, any>) => void> = [
      (envelope) => {
        envelope.ci_trace.outcome.margin_binary64_hex = "3ff0000000000000";
      },
      (envelope) => {
        envelope.g4_truth_error_envelope.proof.mean_difference.truth_interval.lower.numerator = "0";
      },
      (envelope) => {
        envelope.proof.critical_value.truth_rounding_cell.lower.numerator = "0";
      },
      (envelope) => {
        envelope.proof.critical_value.absolute_quantization_error_upper_bound.numerator = "0";
      },
      (envelope) => {
        envelope.proof.margin.truth_interval.upper.numerator = "0";
      },
      (envelope) => {
        envelope.proof.lower_endpoint.source_sequence = 2;
      },
      (envelope) => {
        envelope.proof.upper_endpoint.graph_binary64_hex = "3ff0000000000000";
      },
      (envelope) => {
        envelope.proof.endpoint_truth_bound_selected = true;
      },
    ];

    for (const attack of attacks) {
      const envelope = structuredClone(result.envelope) as unknown as Record<string, any>;
      attack(envelope);
      rebuildOuterDigest(envelope);
      expect(verifyPairedTCIEndpointTruthCandidate(envelope).ok).toBe(false);
    }

    const digestOnly = structuredClone(result.envelope) as unknown as Record<string, any>;
    digestOnly.sha256 = `sha256:${"0".repeat(64)}`;
    expect(verifyPairedTCIEndpointTruthCandidate(digestOnly).ok).toBe(false);
  });

  it("keeps endpoint collapse as an upstream CI execution refusal", () => {
    const nextAfterOne = 1 + Number.EPSILON;
    const differences = Array.from({ length: 201 }, (_, index) =>
      index % 2 === 0 ? nextAfterOne : 1,
    );
    expect(
      evaluatePairedTCIEndpointTruthCandidate(inputFromDifferences(differences)),
    ).toMatchObject({
      ok: false,
      classification: "ci_execution_stage_refusal",
      upstreamClassification: "confidence_interval_endpoint_collapse",
      confidenceIntervalEndpointTruthComplete: false,
      runtimeSupportClaimed: false,
    });
  });

  it("pins the pending-review checkpoint and rejects support or closure promotion", () => {
    const checkpoint = loadCheckpoint();
    expect(validatePairedTCIEndpointTruthCheckpoint(checkpoint)).toEqual([]);
    expect(checkpoint).toMatchObject({
      decision_state: "implemented_candidate_pending_independent_endpoint_truth_review",
      runtime_support_enabled: false,
      supported_domain_claimed: false,
      closure_state: {
        endpoint_truth_implementation: "implemented_pending_independent_review",
        endpoint_truth_independent_review: "pending",
        m3_closed: false,
        supported_degrees_of_freedom_maximum: null,
        supported_execution_predicate: "unselected",
        supported_domain: false,
        runtime_support: false,
        final_reason_codes_frozen: false,
      },
    });

    const promoted = loadCheckpoint();
    promoted.runtime_support_enabled = true;
    promoted.supported_domain_claimed = true;
    promoted.closure_state.endpoint_truth_independent_review = "complete";
    promoted.closure_state.m3_closed = true;
    promoted.closure_state.supported_degrees_of_freedom_maximum = 200;
    promoted.closure_state.supported_execution_predicate = "selected";
    promoted.closure_state.supported_domain = true;
    promoted.closure_state.runtime_support = true;
    promoted.closure_state.final_reason_codes_frozen = true;
    expect(validatePairedTCIEndpointTruthCheckpoint(promoted)).not.toEqual([]);
  });

  it("fails closed on hostile checkpoint and proof shapes without invoking getters", () => {
    const evaluated = evaluatePairedTCIEndpointTruthCandidate(inputFromDifferences([1, 2, 3]));
    expect(evaluated.ok).toBe(true);
    if (!evaluated.ok) return;

    const hidden = structuredClone(evaluated.envelope) as unknown as Record<string, any>;
    Object.defineProperty(hidden, "hidden_support", { value: true, enumerable: false });
    expect(verifyPairedTCIEndpointTruthCandidate(hidden).ok).toBe(false);

    const symbol = structuredClone(evaluated.envelope) as unknown as Record<string, any>;
    Object.defineProperty(symbol, Symbol("support"), { value: true, enumerable: true });
    expect(verifyPairedTCIEndpointTruthCandidate(symbol).ok).toBe(false);

    let getterCalls = 0;
    const accessor = structuredClone(evaluated.envelope) as unknown as Record<string, any>;
    Object.defineProperty(accessor, "format", {
      enumerable: true,
      configurable: true,
      get() {
        getterCalls += 1;
        return "paired-t-ci-endpoint-mathematical-truth-v1";
      },
    });
    expect(verifyPairedTCIEndpointTruthCandidate(accessor).ok).toBe(false);
    expect(getterCalls).toBe(0);

    const sparse = structuredClone(evaluated.envelope) as unknown as Record<string, any>;
    sparse.ci_trace.nodes.length += 1;
    expect(verifyPairedTCIEndpointTruthCandidate(sparse).ok).toBe(false);

    const cycle = structuredClone(evaluated.envelope) as unknown as Record<string, any>;
    cycle.cycle = cycle;
    expect(verifyPairedTCIEndpointTruthCandidate(cycle).ok).toBe(false);

    const proxy = new Proxy(structuredClone(evaluated.envelope), {
      ownKeys() {
        throw new Error("hostile ownKeys");
      },
    });
    expect(() => verifyPairedTCIEndpointTruthCandidate(proxy)).not.toThrow();
    expect(verifyPairedTCIEndpointTruthCandidate(proxy).ok).toBe(false);

    const checkpoint = loadCheckpoint();
    Object.defineProperty(checkpoint, "runtime_support_enabled", {
      enumerable: true,
      configurable: true,
      get() {
        getterCalls += 1;
        return false;
      },
    });
    expect(validatePairedTCIEndpointTruthCheckpoint(checkpoint)).not.toEqual([]);
    expect(getterCalls).toBe(0);
  });
});
