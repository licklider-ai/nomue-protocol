import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  evaluatePairedTCIExecutionTraceCandidate,
  validatePairedTCIExecutionCheckpoint,
  verifyPairedTCIExecutionTraceCandidate,
} from "../src/spikes/paired-t-ci-execution-trace-candidate.js";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const checkpointPath = path.join(
  repositoryRoot,
  "governance/drafts/release-2-candidate/numerical/ci-execution-trace-candidate.json",
);

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

function loadCheckpoint(): Record<string, any> {
  return JSON.parse(readFileSync(checkpointPath, "utf8")) as Record<string, any>;
}

describe("paired-t fixed-95 CI actual-execution trace candidate", () => {
  it("composes verified G4 output with the exact selected df=2 critical cell", () => {
    const result = evaluatePairedTCIExecutionTraceCandidate(inputFromDifferences([1, 2, 3]));
    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.result.degreesOfFreedom).toBe(2);
    expect(result.trace.selected_table).toMatchObject({
      ordered_cell_content_hash:
        "sha256:24ccc86d7a49b9e1ef1e3fc9b038a5b8d338b8b5ca4a02492d8900d7e7dea3c0",
      degrees_of_freedom: 2,
      critical_value_binary64_hex: "401135ea98e146bb",
    });
    expect(result.ciSpecificPrimitiveChecks).toBe(3);
    expect(result.g4TraceReverified).toBe(true);
    expect(result.selectedTableRevalidated).toBe(true);
    expect(result.confidenceIntervalEndpointTruthComplete).toBe(false);
    expect(result.runtimeSupportClaimed).toBe(false);
    expect(result.result.margin).toBe(result.result.criticalValue * result.result.standardError);
    expect(result.result.lowerEndpoint).toBe(result.result.meanDifference - result.result.margin);
    expect(result.result.upperEndpoint).toBe(result.result.meanDifference + result.result.margin);
    expect(result.result.lowerEndpoint).toBeLessThan(result.result.upperEndpoint);
    expect(verifyPairedTCIExecutionTraceCandidate(result.trace)).toEqual({ ok: true, errors: [] });
    expect(Object.isFrozen(result.trace)).toBe(true);
    expect(Object.isFrozen(result.trace.g4_trace)).toBe(true);
  });

  it("rejects coherent handoff, node, outcome, and digest mutations", () => {
    const result = evaluatePairedTCIExecutionTraceCandidate(inputFromDifferences([1, 2, 3, 5]));
    expect(result.ok).toBe(true);
    if (!result.ok) return;

    const attacks: Array<(trace: Record<string, any>) => void> = [
      (trace) => {
        trace.selected_table.critical_value_binary64_hex = "4000000000000000";
      },
      (trace) => {
        trace.selected_table.ordered_cell_content_hash = "sha256:deadbeef";
      },
      (trace) => {
        trace.nodes[0].result_binary64_hex = "3ff0000000000000";
      },
      (trace) => {
        trace.nodes[2].operand_sources = ["g4.mean_difference", "g4.standard_error"];
      },
      (trace) => {
        trace.outcome.lower_endpoint_binary64_hex = trace.outcome.upper_endpoint_binary64_hex;
      },
      (trace) => {
        trace.g4_trace.outcome.mean_difference_binary64_hex = "3ff0000000000000";
      },
      (trace) => {
        trace.sha256 = "sha256:deadbeef";
      },
    ];
    for (const attack of attacks) {
      const trace = structuredClone(result.trace) as unknown as Record<string, any>;
      attack(trace);
      expect(verifyPairedTCIExecutionTraceCandidate(trace).ok).toBe(false);
    }
  });

  it("fails closed when finite binary64 interval endpoints collapse", () => {
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

  it("preserves upstream G4 refusal without selecting an alternate procedure", () => {
    const result = evaluatePairedTCIExecutionTraceCandidate(inputFromDifferences([1]));
    expect(result).toMatchObject({
      ok: false,
      classification: "g4_stage_refusal",
      confidenceIntervalEndpointTruthComplete: false,
      runtimeSupportClaimed: false,
    });
  });

  it("pins the reviewed M3 CI trace checkpoint and fails closed on hostile shapes", () => {
    const checkpoint = loadCheckpoint();
    expect(validatePairedTCIExecutionCheckpoint(checkpoint)).toEqual([]);
    expect(checkpoint).toMatchObject({
      decision_state: "independently_reviewed_actual_execution_trace_admitted_to_m3",
      runtime_support_enabled: false,
      supported_domain_claimed: false,
      closure_state: {
        actual_execution_trace: "independently_reviewed_complete",
        confidence_interval_endpoint_truth_ledger: "independently_reviewed_separate_candidate",
        supported_execution_predicate: "unselected",
        supported_domain: false,
        runtime_support: false,
        final_reason_codes_frozen: false,
        m3_closed: true,
      },
    });

    const demoted = loadCheckpoint();
    demoted.closure_state.actual_execution_trace = "implemented_pending_independent_review";
    demoted.closure_state.confidence_interval_endpoint_truth_ledger = "pending";
    demoted.closure_state.m3_closed = false;
    expect(validatePairedTCIExecutionCheckpoint(demoted)).not.toEqual([]);

    const promoted = loadCheckpoint();
    promoted.runtime_support_enabled = true;
    promoted.supported_domain_claimed = true;
    promoted.closure_state.supported_execution_predicate = "selected";
    promoted.closure_state.supported_domain = true;
    promoted.closure_state.runtime_support = true;
    promoted.closure_state.final_reason_codes_frozen = true;
    expect(validatePairedTCIExecutionCheckpoint(promoted)).not.toEqual([]);

    const hidden = loadCheckpoint();
    Object.defineProperty(hidden, "hidden_support", { value: true, enumerable: false });
    expect(validatePairedTCIExecutionCheckpoint(hidden)).not.toEqual([]);

    const symbol = loadCheckpoint();
    Object.defineProperty(symbol, Symbol("support"), { value: true, enumerable: true });
    expect(validatePairedTCIExecutionCheckpoint(symbol)).not.toEqual([]);

    let getterCalls = 0;
    const accessor = loadCheckpoint();
    Object.defineProperty(accessor, "runtime_support_enabled", {
      enumerable: true,
      configurable: true,
      get() {
        getterCalls += 1;
        return false;
      },
    });
    expect(validatePairedTCIExecutionCheckpoint(accessor)).not.toEqual([]);
    expect(getterCalls).toBe(0);

    const sparse = loadCheckpoint();
    sparse.prohibited_claims.length += 1;
    expect(validatePairedTCIExecutionCheckpoint(sparse)).not.toEqual([]);

    const cycle = loadCheckpoint();
    cycle.cycle = cycle;
    expect(validatePairedTCIExecutionCheckpoint(cycle)).not.toEqual([]);

    const proxy = new Proxy(loadCheckpoint(), {
      ownKeys() {
        throw new Error("hostile ownKeys");
      },
    });
    expect(() => validatePairedTCIExecutionCheckpoint(proxy)).not.toThrow();
    expect(validatePairedTCIExecutionCheckpoint(proxy)).not.toEqual([]);
  });
});
