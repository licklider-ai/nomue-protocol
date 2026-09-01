import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { binary64ToExactDyadic } from "../../reference/spikes/paired-t.js";
import {
  evaluatePairedTCIEndpointTruthCandidate,
  validatePairedTCIEndpointTruthCheckpoint,
  verifyPairedTCIEndpointTruthCandidate,
  type PairedTCIEndpointTruthEnvelopeCandidate,
} from "../src/spikes/paired-t-ci-endpoint-truth-error-candidate.js";

interface Rational {
  numerator: bigint;
  denominator: bigint;
}

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const checkpointPath = path.join(
  repositoryRoot,
  "governance/drafts/release-2-candidate/numerical/ci-endpoint-truth-error-candidate.json",
);

function gcd(first: bigint, second: bigint): bigint {
  let left = first < 0n ? -first : first;
  let right = second < 0n ? -second : second;
  while (right !== 0n) {
    const remainder = left % right;
    left = right;
    right = remainder;
  }
  return left;
}

function rational(numerator: bigint, denominator = 1n): Rational {
  if (denominator === 0n) throw new RangeError("zero denominator");
  let n = numerator;
  let d = denominator;
  if (d < 0n) {
    n = -n;
    d = -d;
  }
  if (n === 0n) return { numerator: 0n, denominator: 1n };
  const factor = gcd(n, d);
  return { numerator: n / factor, denominator: d / factor };
}

function add(first: Rational, second: Rational): Rational {
  return rational(
    first.numerator * second.denominator + second.numerator * first.denominator,
    first.denominator * second.denominator,
  );
}

function subtract(first: Rational, second: Rational): Rational {
  return rational(
    first.numerator * second.denominator - second.numerator * first.denominator,
    first.denominator * second.denominator,
  );
}

function multiply(first: Rational, second: Rational): Rational {
  return rational(first.numerator * second.numerator, first.denominator * second.denominator);
}

function divide(first: Rational, second: Rational): Rational {
  return rational(first.numerator * second.denominator, first.denominator * second.numerator);
}

function compare(first: Rational, second: Rational): number {
  const difference = first.numerator * second.denominator - second.numerator * first.denominator;
  return difference < 0n ? -1 : difference > 0n ? 1 : 0;
}

function absolute(value: Rational): Rational {
  return value.numerator < 0n ? rational(-value.numerator, value.denominator) : value;
}

function maximum(first: Rational, second: Rational): Rational {
  return compare(first, second) >= 0 ? first : second;
}

function parse(value: { numerator: string; denominator: string }): Rational {
  return rational(BigInt(value.numerator), BigInt(value.denominator));
}

function fromHex(value: string): Rational {
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  view.setBigUint64(0, BigInt(`0x${value}`), false);
  const exact = binary64ToExactDyadic(view.getFloat64(0, false));
  return rational(exact.numerator, 1n << BigInt(exact.denominatorExponent));
}

function inputFromDifferences(differences: readonly number[]) {
  return {
    conditionOrder: ["first", "second"] as const,
    repeatedMeasurements: "none" as const,
    observations: differences.flatMap((difference, index) => [
      {
        observationId: `truth-${index}-first`,
        experimentalUnitId: `truth-unit-${index}-first`,
        pairId: `truth-p${index.toString().padStart(3, "0")}`,
        conditionId: "first",
        outcomeValue: difference,
      },
      {
        observationId: `truth-${index}-second`,
        experimentalUnitId: `truth-unit-${index}-second`,
        pairId: `truth-p${index.toString().padStart(3, "0")}`,
        conditionId: "second",
        outcomeValue: 0,
      },
    ]),
  };
}

function loadCheckpoint(): Record<string, unknown> {
  return JSON.parse(readFileSync(checkpointPath, "utf8")) as Record<string, unknown>;
}

function recomputeEnvelopeHash(envelope: Record<string, unknown>): void {
  const payload = {
    format: envelope.format,
    ci_trace: envelope.ci_trace,
    g4_truth_envelope: envelope.g4_truth_envelope,
    proof: envelope.proof,
  };
  envelope.sha256 = `sha256:${createHash("sha256").update(JSON.stringify(payload)).digest("hex")}`;
}

function assertQuantityBound(
  quantity: {
    graph_binary64_hex: string;
    truth_interval: {
      lower: { numerator: string; denominator: string };
      upper: { numerator: string; denominator: string };
    };
    absolute_error_upper_bound: { numerator: string; denominator: string };
  },
): void {
  const graph = fromHex(quantity.graph_binary64_hex);
  const lower = parse(quantity.truth_interval.lower);
  const upper = parse(quantity.truth_interval.upper);
  const expected = maximum(absolute(subtract(graph, lower)), absolute(subtract(graph, upper)));
  const actual = parse(quantity.absolute_error_upper_bound);
  expect(compare(lower, upper)).toBeLessThanOrEqual(0);
  expect(actual).toEqual(expected);
}

describe("paired-t CI endpoint mathematical-truth candidate", () => {
  it("constructs an exact same-trace truth envelope without selecting support", () => {
    const result = evaluatePairedTCIEndpointTruthCandidate(inputFromDifferences([1, 2, 3]));
    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(verifyPairedTCIEndpointTruthCandidate(result.envelope)).toEqual({ ok: true, errors: [] });
    expect(result).toMatchObject({
      candidateArithmeticExecutionVerified: true,
      confidenceIntervalEndpointTruthImplemented: true,
      confidenceIntervalEndpointTruthIndependentlyReviewed: false,
      confidenceIntervalEndpointTruthComplete: false,
      supportedDomainClaimed: false,
      runtimeSupportClaimed: false,
    });
    expect(result.proof.ci_trace_sha256).toBe(result.envelope.ci_trace.sha256);
    expect(result.proof.g4_truth_envelope_sha256).toBe(result.envelope.g4_truth_envelope.sha256);
    expect(result.proof.g4_trace_sha256).toBe(result.envelope.ci_trace.g4_trace.sha256);
    expect(result.proof.selected_table_content_hash).toBe(
      result.envelope.ci_trace.selected_table.ordered_cell_content_hash,
    );
    expect(result.envelope.ci_trace.g4_trace).toEqual(result.envelope.g4_truth_envelope.g4_trace);
    expect(Object.isFrozen(result.envelope)).toBe(true);
    expect(Object.isFrozen(result.ciResult)).toBe(true);

    const meanLower = parse(result.proof.mean_difference_truth_interval.lower);
    const meanUpper = parse(result.proof.mean_difference_truth_interval.upper);
    expect(meanLower).toEqual(rational(2n));
    expect(meanUpper).toEqual(rational(2n));

    const seLower = parse(result.proof.standard_error_truth_interval.lower);
    const seUpper = parse(result.proof.standard_error_truth_interval.upper);
    const exactSeSquared = rational(1n, 3n);
    expect(compare(multiply(seLower, seLower), exactSeSquared)).toBeLessThanOrEqual(0);
    expect(compare(multiply(seUpper, seUpper), exactSeSquared)).toBeGreaterThanOrEqual(0);

    const critical = result.proof.critical_value;
    const bits = BigInt(`0x${critical.graph_binary64_hex}`);
    expect(critical.degrees_of_freedom).toBe(2);
    expect(critical.predecessor_binary64_hex).toBe((bits - 1n).toString(16).padStart(16, "0"));
    expect(critical.successor_binary64_hex).toBe((bits + 1n).toString(16).padStart(16, "0"));

    const graphCritical = fromHex(critical.graph_binary64_hex);
    const predecessor = fromHex(critical.predecessor_binary64_hex);
    const successor = fromHex(critical.successor_binary64_hex);
    const expectedLower = divide(add(predecessor, graphCritical), rational(2n));
    const expectedUpper = divide(add(graphCritical, successor), rational(2n));
    expect(parse(critical.truth_interval.lower)).toEqual(expectedLower);
    expect(parse(critical.truth_interval.upper)).toEqual(expectedUpper);
    expect(parse(critical.absolute_quantization_upper_bound)).toEqual(
      maximum(absolute(subtract(graphCritical, expectedLower)), absolute(subtract(graphCritical, expectedUpper))),
    );

    assertQuantityBound(result.proof.margin);
    assertQuantityBound(result.proof.lower_endpoint);
    assertQuantityBound(result.proof.upper_endpoint);
  });

  it("preserves signs and zero-crossing truth intervals", () => {
    const negative = evaluatePairedTCIEndpointTruthCandidate(inputFromDifferences([-1, -2, -4]));
    expect(negative.ok).toBe(true);
    if (negative.ok) {
      const meanUpper = parse(negative.proof.mean_difference_truth_interval.upper);
      expect(compare(meanUpper, rational(0n))).toBeLessThan(0);
      assertQuantityBound(negative.proof.lower_endpoint);
      assertQuantityBound(negative.proof.upper_endpoint);
    }

    const crossing = evaluatePairedTCIEndpointTruthCandidate(inputFromDifferences([-1, 0, 1]));
    expect(crossing.ok).toBe(true);
    if (crossing.ok) {
      const lowerUpper = parse(crossing.proof.lower_endpoint.truth_interval.upper);
      const upperLower = parse(crossing.proof.upper_endpoint.truth_interval.lower);
      expect(compare(lowerUpper, rational(0n))).toBeLessThan(0);
      expect(compare(upperLower, rational(0n))).toBeGreaterThan(0);
    }
  });

  it("fails closed when M3-C refuses endpoint collapse", () => {
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

  it("rejects coherently rehashed proof mutations and hostile envelope shapes", () => {
    const result = evaluatePairedTCIEndpointTruthCandidate(inputFromDifferences([1, 2, 3, 5]));
    expect(result.ok).toBe(true);
    if (!result.ok) return;

    const mutated = structuredClone(result.envelope) as unknown as Record<string, any>;
    mutated.proof.lower_endpoint.absolute_error_upper_bound.numerator = "999999";
    recomputeEnvelopeHash(mutated);
    expect(verifyPairedTCIEndpointTruthCandidate(mutated).ok).toBe(false);

    const critical = structuredClone(result.envelope) as unknown as Record<string, any>;
    critical.proof.critical_value.predecessor_binary64_hex =
      critical.proof.critical_value.graph_binary64_hex;
    recomputeEnvelopeHash(critical);
    expect(verifyPairedTCIEndpointTruthCandidate(critical).ok).toBe(false);

    let getterCalls = 0;
    const accessor = structuredClone(result.envelope) as unknown as Record<string, any>;
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

    const symbol = structuredClone(result.envelope) as unknown as Record<string, any>;
    Object.defineProperty(symbol, Symbol("support"), { value: true, enumerable: true });
    expect(verifyPairedTCIEndpointTruthCandidate(symbol).ok).toBe(false);

    const cycle = structuredClone(result.envelope) as unknown as Record<string, any>;
    cycle.self = cycle;
    expect(verifyPairedTCIEndpointTruthCandidate(cycle).ok).toBe(false);
  });

  it("keeps review, M3, support, runtime, and reason-code promotions unselected", () => {
    expect(validatePairedTCIEndpointTruthCheckpoint(loadCheckpoint())).toEqual([]);

    const m3 = loadCheckpoint();
    ((m3.closure_state as Record<string, unknown>).m3_closed as unknown) = true;
    expect(validatePairedTCIEndpointTruthCheckpoint(m3)).not.toEqual([]);

    const runtime = loadCheckpoint();
    runtime.runtime_support_enabled = true;
    expect(validatePairedTCIEndpointTruthCheckpoint(runtime)).not.toEqual([]);

    const reviewed = loadCheckpoint();
    (reviewed.closure_state as Record<string, unknown>).endpoint_truth_error_ledger =
      "independently_reviewed_complete";
    expect(validatePairedTCIEndpointTruthCheckpoint(reviewed)).not.toEqual([]);

    const hidden = loadCheckpoint();
    Object.defineProperty(hidden, "supported_df_max", { value: 200, enumerable: false });
    expect(validatePairedTCIEndpointTruthCheckpoint(hidden)).not.toEqual([]);
  });
});
