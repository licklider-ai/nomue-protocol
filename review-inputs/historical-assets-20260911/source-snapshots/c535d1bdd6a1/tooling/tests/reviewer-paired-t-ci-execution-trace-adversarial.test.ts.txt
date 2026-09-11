import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  evaluatePairedTCIExecutionTraceCandidate,
  verifyPairedTCIExecutionTraceCandidate,
  type PairedTCIExecutionTraceCandidate,
} from "../src/spikes/paired-t-ci-execution-trace-candidate.js";
import { validatePairedTBinary64PrimitiveCandidate } from "../src/spikes/paired-t-supported-execution-candidate.js";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const selectedTable = JSON.parse(
  readFileSync(
    path.join(
      repositoryRoot,
      "governance/drafts/release-2-candidate/numerical/fixed-95-critical-value-table-selected-candidate.json",
    ),
    "utf8",
  ),
) as { critical_value_binary64_hex_by_df: string[] };

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

function binary64Hex(value: number): string {
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  view.setFloat64(0, value, false);
  return view.getBigUint64(0, false).toString(16).padStart(16, "0");
}

function flipLastBit(hex: string): string {
  return (BigInt(`0x${hex}`) ^ 1n).toString(16).padStart(16, "0");
}

function recomputeG4Hash(trace: Record<string, any>): void {
  const payload = {
    format: trace.format,
    input: trace.input,
    outcome: trace.outcome,
    node_count: trace.node_count,
    maximum_node_count_evaluation_candidate: trace.maximum_node_count_evaluation_candidate,
    nodes: trace.nodes,
  };
  trace.sha256 = `sha256:${createHash("sha256").update(JSON.stringify(payload)).digest("hex")}`;
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

function validTrace(): PairedTCIExecutionTraceCandidate {
  const result = evaluatePairedTCIExecutionTraceCandidate(inputFromDifferences([1, 2, 3, 5]));
  if (!result.ok) throw new Error(`review fixture refused: ${result.classification}`);
  return result.trace;
}

describe("reviewer-only M3-C adversarial battery", () => {
  it("covers df boundaries, signs, zero crossing, and large finite inputs", () => {
    const corpus: Array<{ label: string; differences: number[]; expectedDf: number }> = [
      { label: "df1", differences: [1, 3], expectedDf: 1 },
      { label: "df2", differences: [1, 2, 3], expectedDf: 2 },
      {
        label: "ordinary-df30",
        differences: Array.from({ length: 31 }, (_, index) => 1 + (index % 7)),
        expectedDf: 30,
      },
      {
        label: "df200",
        differences: Array.from({ length: 201 }, (_, index) => (index % 7) - 3),
        expectedDf: 200,
      },
      { label: "negative-mean", differences: [-1, -2, -4], expectedDf: 2 },
      { label: "cross-zero", differences: [-1, 0, 1], expectedDf: 2 },
      {
        label: "large-finite",
        differences: [0.9e150, 1e150, 1.05e150, 1.1e150],
        expectedDf: 3,
      },
    ];

    for (const entry of corpus) {
      const result = evaluatePairedTCIExecutionTraceCandidate(inputFromDifferences(entry.differences));
      expect(result.ok, entry.label).toBe(true);
      if (!result.ok) continue;
      expect(result.result.degreesOfFreedom, entry.label).toBe(entry.expectedDf);
      expect(result.trace.selected_table.critical_value_binary64_hex, entry.label).toBe(
        selectedTable.critical_value_binary64_hex_by_df[entry.expectedDf - 1],
      );
      expect(verifyPairedTCIExecutionTraceCandidate(result.trace), entry.label).toEqual({
        ok: true,
        errors: [],
      });
      expect(result.trace.nodes, entry.label).toHaveLength(3);
      for (const node of result.trace.nodes) {
        expect(
          validatePairedTBinary64PrimitiveCandidate({
            operation: node.operation,
            operands: [...node.operand_binary64_hex],
            result: node.result_binary64_hex,
          }),
          `${entry.label}:${node.label}`,
        ).toEqual([]);
      }
      expect(binary64Hex(result.result.meanDifference), entry.label).toBe(
        result.trace.outcome.mean_difference_binary64_hex,
      );
      expect(binary64Hex(result.result.standardError), entry.label).toBe(
        result.trace.outcome.standard_error_binary64_hex,
      );
      expect(binary64Hex(result.result.criticalValue), entry.label).toBe(
        result.trace.selected_table.critical_value_binary64_hex,
      );
      expect(binary64Hex(result.result.margin), entry.label).toBe(
        result.trace.outcome.margin_binary64_hex,
      );
      expect(binary64Hex(result.result.lowerEndpoint), entry.label).toBe(
        result.trace.outcome.lower_endpoint_binary64_hex,
      );
      expect(binary64Hex(result.result.upperEndpoint), entry.label).toBe(
        result.trace.outcome.upper_endpoint_binary64_hex,
      );
      expect(Number.isFinite(result.result.lowerEndpoint), entry.label).toBe(true);
      expect(Number.isFinite(result.result.upperEndpoint), entry.label).toBe(true);
      expect(result.result.lowerEndpoint, entry.label).toBeLessThan(result.result.upperEndpoint);
      expect(Object.isFrozen(result.trace), entry.label).toBe(true);
      expect(Object.isFrozen(result.result), entry.label).toBe(true);
    }

    const negative = evaluatePairedTCIExecutionTraceCandidate(
      inputFromDifferences([-1, -2, -4]),
    );
    expect(negative.ok).toBe(true);
    if (negative.ok) expect(negative.result.meanDifference).toBeLessThan(0);

    const crossing = evaluatePairedTCIExecutionTraceCandidate(inputFromDifferences([-1, 0, 1]));
    expect(crossing.ok).toBe(true);
    if (crossing.ok) {
      expect(crossing.result.lowerEndpoint).toBeLessThan(0);
      expect(crossing.result.upperEndpoint).toBeGreaterThan(0);
    }
  });

  it("rejects coherent reconstruction attacks even after digest repair", () => {
    const original = validTrace();
    const attacks: Array<(trace: Record<string, any>) => void> = [
      (trace) => {
        trace.g4_trace.nodes[0].result_binary64_hex = flipLastBit(
          trace.g4_trace.nodes[0].result_binary64_hex,
        );
        recomputeG4Hash(trace.g4_trace);
      },
      (trace) => {
        trace.selected_table.ordered_cell_content_hash = `sha256:${"1".repeat(64)}`;
      },
      (trace) => {
        trace.selected_table.critical_value_binary64_hex = flipLastBit(
          trace.selected_table.critical_value_binary64_hex,
        );
      },
      (trace) => {
        trace.selected_table.degrees_of_freedom += 1;
      },
      (trace) => {
        trace.nodes[0].operand_binary64_hex[0] = flipLastBit(
          trace.nodes[0].operand_binary64_hex[0],
        );
      },
      (trace) => {
        trace.nodes[0].result_binary64_hex = flipLastBit(trace.nodes[0].result_binary64_hex);
      },
      (trace) => {
        trace.nodes[1].operand_sources = ["g4.standard_error", "ci.margin"];
      },
      (trace) => {
        trace.nodes[2].result_binary64_hex = flipLastBit(trace.nodes[2].result_binary64_hex);
      },
      (trace) => {
        trace.nodes.splice(1, 1);
      },
      (trace) => {
        trace.nodes.push(structuredClone(trace.nodes[2]));
      },
      (trace) => {
        [trace.nodes[0], trace.nodes[1]] = [trace.nodes[1], trace.nodes[0]];
      },
      (trace) => {
        trace.nodes[0].label = "ci.lower";
      },
      (trace) => {
        trace.outcome.lower_endpoint_binary64_hex = flipLastBit(
          trace.outcome.lower_endpoint_binary64_hex,
        );
      },
      (trace) => {
        trace.node_count = 4;
      },
    ];

    for (const attack of attacks) {
      const trace = structuredClone(original) as unknown as Record<string, any>;
      attack(trace);
      recomputeCIHash(trace);
      expect(verifyPairedTCIExecutionTraceCandidate(trace).ok).toBe(false);
    }

    const digestOnly = structuredClone(original) as unknown as Record<string, any>;
    digestOnly.sha256 = `sha256:${"2".repeat(64)}`;
    expect(verifyPairedTCIExecutionTraceCandidate(digestOnly).ok).toBe(false);
  });

  it("rejects hostile trace shapes without invoking caller accessors", () => {
    const original = validTrace();
    const verify = (value: unknown) => verifyPairedTCIExecutionTraceCandidate(value);

    const hidden = structuredClone(original) as unknown as Record<string, any>;
    Object.defineProperty(hidden, "hidden", { value: true, enumerable: false });
    expect(verify(hidden).ok).toBe(false);

    const symbol = structuredClone(original) as unknown as Record<string, any>;
    Object.defineProperty(symbol, Symbol("support"), { value: true, enumerable: true });
    expect(verify(symbol).ok).toBe(false);

    let getterCalls = 0;
    const accessor = structuredClone(original) as unknown as Record<string, any>;
    Object.defineProperty(accessor, "format", {
      enumerable: true,
      configurable: true,
      get() {
        getterCalls += 1;
        return "paired-t-ci-actual-execution-trace-v1";
      },
    });
    expect(verify(accessor).ok).toBe(false);
    expect(getterCalls).toBe(0);

    const sparse = structuredClone(original) as unknown as Record<string, any>;
    sparse.nodes.length += 1;
    expect(verify(sparse).ok).toBe(false);

    const nonFinite = structuredClone(original) as unknown as Record<string, any>;
    nonFinite.outcome.extra = Number.POSITIVE_INFINITY;
    expect(verify(nonFinite).ok).toBe(false);

    const bigint = structuredClone(original) as unknown as Record<string, any>;
    bigint.extra = 1n;
    expect(verify(bigint).ok).toBe(false);

    const func = structuredClone(original) as unknown as Record<string, any>;
    func.extra = () => true;
    expect(verify(func).ok).toBe(false);

    const cycle = structuredClone(original) as unknown as Record<string, any>;
    cycle.self = cycle;
    expect(verify(cycle).ok).toBe(false);

    const proxy = new Proxy(structuredClone(original) as unknown as Record<string, any>, {
      ownKeys() {
        throw new Error("hostile ownKeys");
      },
    });
    expect(() => verify(proxy)).not.toThrow();
    expect(verify(proxy).ok).toBe(false);
  });

  it("reproduces endpoint collapse after a successful G4 stage", () => {
    const nextAfterOne = 1 + Number.EPSILON;
    const differences = Array.from({ length: 201 }, (_, index) =>
      index % 2 === 0 ? nextAfterOne : 1,
    );
    const result = evaluatePairedTCIExecutionTraceCandidate(inputFromDifferences(differences));
    expect(result).toMatchObject({
      ok: false,
      classification: "confidence_interval_endpoint_collapse",
      confidenceIntervalEndpointTruthComplete: false,
      runtimeSupportClaimed: false,
    });
  });
});
