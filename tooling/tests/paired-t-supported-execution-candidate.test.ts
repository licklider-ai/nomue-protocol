import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  evaluatePairedTSupportedExecutionCandidate,
  evaluatePairedTSupportedExecutionCandidateWithReviewLimit,
  PAIRED_T_SUPPORTED_EXECUTION_MAX_TRACE_NODES,
  validatePairedTBinary64PrimitiveCandidate,
  validatePairedTSupportedExecutionCheckpoint,
  verifyPairedTExecutionTraceCandidate,
  type PairedTExecutionTraceCandidate,
  type PairedTExecutionTraceNodeCandidate,
  type PairedTSupportedExecutionCheckpoint,
} from "../src/spikes/paired-t-supported-execution-candidate.js";
import { evaluatePairedTRuntimeSeriesWithCandidateTable } from "../src/spikes/paired-t-runtime-table-integration-candidate.js";
import { evaluatePairedTTruthErrorSupportCandidate } from "../src/spikes/paired-t-truth-error-support-candidate.js";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const checkpointPath = path.join(
  repositoryRoot,
  "governance/drafts/release-2-candidate/numerical/supported-execution-predicate-candidate.json",
);

function loadCheckpoint(): PairedTSupportedExecutionCheckpoint {
  return JSON.parse(readFileSync(checkpointPath, "utf8")) as PairedTSupportedExecutionCheckpoint;
}

function cloneCheckpoint(): PairedTSupportedExecutionCheckpoint {
  return JSON.parse(JSON.stringify(loadCheckpoint())) as PairedTSupportedExecutionCheckpoint;
}

type MutableTraceNode = Omit<
  PairedTExecutionTraceNodeCandidate,
  "operand_sources" | "operand_binary64_hex"
> & {
  operand_sources: Array<number | null>;
  operand_binary64_hex: string[];
};

type MutableTrace = Omit<PairedTExecutionTraceCandidate, "nodes"> & {
  nodes: MutableTraceNode[];
};

function cloneTrace(trace: PairedTExecutionTraceCandidate): MutableTrace {
  return JSON.parse(JSON.stringify(trace)) as MutableTrace;
}

function numberFromBits(value: bigint): number {
  const view = new DataView(new ArrayBuffer(8));
  view.setBigUint64(0, value, false);
  return view.getFloat64(0, false);
}

function numberHex(value: number): string {
  const view = new DataView(new ArrayBuffer(8));
  view.setFloat64(0, value, false);
  return view.getBigUint64(0, false).toString(16).padStart(16, "0");
}

describe("paired-t supported-execution predicate candidate", () => {
  it("accepts only the exact non-authoritative and unselected checkpoint", () => {
    expect(validatePairedTSupportedExecutionCheckpoint(loadCheckpoint())).toEqual([]);

    const promoted = cloneCheckpoint();
    promoted.runtime_support_enabled = true;
    promoted.supported_platform_selected = true;
    promoted.supported_execution_predicate_selected = true;
    expect(validatePairedTSupportedExecutionCheckpoint(promoted)).toContain(
      "supported-execution checkpoint differs from the closed non-runtime candidate",
    );

    const fabricatedMatrix = cloneCheckpoint();
    fabricatedMatrix.runtime_allowlist["entries"] = [
      { runtime: process.version, platform: process.platform, architecture: process.arch },
    ];
    expect(validatePairedTSupportedExecutionCheckpoint(fabricatedMatrix).length).toBeGreaterThan(0);
  });

  it("contains hostile checkpoint shapes without invoking accessors", () => {
    let getterCalls = 0;
    const accessor = Object.defineProperty(cloneCheckpoint(), "status", {
      enumerable: true,
      get: () => {
        getterCalls += 1;
        return "non_authoritative_candidate";
      },
    });
    const symbolic = cloneCheckpoint() as unknown as Record<PropertyKey, unknown>;
    symbolic[Symbol("promotion")] = true;
    const throwingProxy = new Proxy(
      {},
      {
        ownKeys: () => {
          throw new Error("hostile keys");
        },
      },
    );
    for (const candidate of [accessor, symbolic, throwingProxy]) {
      expect(() => validatePairedTSupportedExecutionCheckpoint(candidate)).not.toThrow();
      expect(validatePairedTSupportedExecutionCheckpoint(candidate).length).toBeGreaterThan(0);
    }
    expect(getterCalls).toBe(0);
  });

  it("binds one immutable actual trace to the returned value and proof", () => {
    const result = evaluatePairedTSupportedExecutionCandidate({
      degreesOfFreedom: 197,
      testStatistic: 50.4,
    });
    expect(result).toMatchObject({
      ok: true,
      branch: "lower-tail-positive-series",
      pValueBinary64Hex: "284f4ce6230625df",
      iterations: 14,
      candidateArithmeticExecutionVerified: true,
      supportedExecutionPredicateSatisfied: false,
      supportedPlatformClaimed: false,
      runtimeSupportClaimed: false,
      supportedDomainClaimed: false,
      traceVerification: {
        everyTraceNodeVerified: true,
        ordinaryArithmeticChecks: 217,
        squareRootChecks: 2,
      },
      proof: {
        source: "same_execution_trace_as_returned_value",
        roundoffGammaIndex: 1290,
        accumulatedSumGammaIndex: 196,
        nextTermGammaIndex: 210,
        seriesRemainderMultiplier: 198,
        candidateTruthErrorBoundUlp: 2978,
        truthErrorBoundSelected: false,
      },
      executionProfile: {
        controlledProcessProfileCandidateKey: "paired-t-tail-pure-js-single-invocation-profile-1",
        requiredExclusions: [
          "unreviewed_native_addons",
          "wasi",
          "worker_threads",
          "user_callbacks_during_evaluation",
          "runtime_intrinsic_replacement",
        ],
        exactRuntimeAllowlistSelected: false,
        controlledProcessProfileEnforced: false,
        crossPlatformAdmissionEvidenceComplete: false,
      },
    });
    if (!result.ok) throw new Error("supported-execution witness unexpectedly refused");
    expect(result.trace.outcome.p_value_binary64_hex).toBe(result.pValueBinary64Hex);
    expect(result.trace.node_count).toBe(220);
    expect(result.trace.outcome.p_value_source_sequence).not.toBeNull();
    expect(result.trace.normalization_constant.candidate_table_content_hash).toBe(
      "sha256:ba1f992199e9e153956589d62dcf5a6509575100bb7c923c170bfa45fdd76c08",
    );
    expect(verifyPairedTExecutionTraceCandidate(result.trace)).toMatchObject({
      ok: true,
      errors: [],
    });
    expect(Object.isFrozen(result.trace)).toBe(true);
    expect(Object.isFrozen(result.trace.nodes)).toBe(true);
    expect(Object.isFrozen(result.trace.nodes[0])).toBe(true);
    expect(Object.isFrozen(result.trace.nodes[0]?.operand_binary64_hex)).toBe(true);
  });

  it("is byte-for-byte behaviorally equivalent to the reviewed graph and proof over df 1..200", () => {
    for (let df = 1; df <= 200; df += 1) {
      const input = { degreesOfFreedom: df, testStatistic: df % 2 === 0 ? 0.5 : 2 };
      const candidate = evaluatePairedTSupportedExecutionCandidate(input);
      const graph = evaluatePairedTRuntimeSeriesWithCandidateTable(input);
      const proof = evaluatePairedTTruthErrorSupportCandidate(input);
      expect(candidate.ok, `df=${df}: graph disposition`).toBe(graph.ok);
      expect(candidate.ok, `df=${df}: proof disposition`).toBe(proof.ok);
      if (!candidate.ok || !graph.ok || !proof.ok) continue;
      expect(
        {
          branch: candidate.branch,
          pValue: candidate.pValue,
          pValueBinary64Hex: candidate.pValueBinary64Hex,
          iterations: candidate.iterations,
          iterationCap: candidate.iterationCap,
          remainder: candidate.positiveSeriesRemainderContributionCandidate,
        },
        `df=${df}: reviewed graph bytes`,
      ).toEqual({
        branch: graph.branch,
        pValue: graph.pValue,
        pValueBinary64Hex: graph.pValueBinary64Hex,
        iterations: graph.iterations,
        iterationCap: graph.iterationCap,
        remainder: graph.positiveSeriesRemainderContributionCandidate,
      });
      expect(
        {
          branch: candidate.branch,
          pValueBinary64Hex: candidate.pValueBinary64Hex,
          iterations: candidate.iterations,
          iterationCap: candidate.iterationCap,
          roundoffGammaIndex: candidate.proof.roundoffGammaIndex,
          accumulatedSumGammaIndex: candidate.proof.accumulatedSumGammaIndex,
          nextTermGammaIndex: candidate.proof.nextTermGammaIndex,
          seriesRemainderMultiplier: candidate.proof.seriesRemainderMultiplier,
          truncationRelativeUpperBound: candidate.proof.truncationRelativeUpperBound,
          relativeErrorUpperBound: candidate.proof.relativeErrorUpperBound,
          candidateTruthErrorBoundUlp: candidate.proof.candidateTruthErrorBoundUlp,
          sqrtRoundingCellChecks: candidate.proof.sqrtRoundingCellChecks,
        },
        `df=${df}: reviewed proof bytes`,
      ).toEqual({
        branch: proof.branch,
        pValueBinary64Hex: proof.pValueBinary64Hex,
        iterations: proof.iterations,
        iterationCap: proof.iterationCap,
        roundoffGammaIndex: proof.proof.roundoffGammaIndex,
        accumulatedSumGammaIndex: proof.proof.accumulatedSumGammaIndex,
        nextTermGammaIndex: proof.proof.nextTermGammaIndex,
        seriesRemainderMultiplier: proof.proof.seriesRemainderMultiplier,
        truncationRelativeUpperBound: proof.proof.truncationRelativeUpperBound,
        relativeErrorUpperBound: proof.proof.relativeErrorUpperBound,
        candidateTruthErrorBoundUlp: proof.proof.candidateTruthErrorBoundUlp,
        sqrtRoundingCellChecks: proof.proof.sqrtRoundingCellChecks,
      });
    }
  }, 60_000);

  it("covers the iteration-heavy path within an explicitly unselected resource ceiling", () => {
    const result = evaluatePairedTSupportedExecutionCandidate({
      degreesOfFreedom: 200,
      testStatistic: 1.0000000000000002,
    });
    expect(result).toMatchObject({
      ok: true,
      branch: "lower-tail-positive-series",
      iterations: 5182,
      iterationCap: 8064,
    });
    if (!result.ok) throw new Error("iteration-heavy candidate unexpectedly refused");
    expect(result.trace.node_count).toBe(72_567);
    expect(result.trace.node_count).toBeLessThan(PAIRED_T_SUPPORTED_EXECUTION_MAX_TRACE_NODES);
    expect(result.traceVerification.ordinaryArithmeticChecks).toBe(72_566);
    expect(result.supportedExecutionPredicateSatisfied).toBe(false);
  }, 20_000);

  it("implements exact ties-to-even checks at normal, subnormal, zero, and overflow boundaries", () => {
    const accepted = [
      {
        operation: "add",
        operands: ["3ff0000000000000", "3ca0000000000000"],
        result: "3ff0000000000000",
      },
      {
        operation: "add",
        operands: ["3ff0000000000000", "3cb8000000000000"],
        result: "3ff0000000000002",
      },
      {
        operation: "divide",
        operands: ["0000000000000001", "4000000000000000"],
        result: "0000000000000000",
      },
      {
        operation: "divide",
        operands: ["0000000000000003", "4000000000000000"],
        result: "0000000000000002",
      },
      {
        operation: "multiply",
        operands: ["7fefffffffffffff", "4000000000000000"],
        result: "7ff0000000000000",
      },
      {
        operation: "multiply",
        operands: ["ffefffffffffffff", "4000000000000000"],
        result: "fff0000000000000",
      },
      {
        operation: "multiply",
        operands: ["bff0000000000000", "0000000000000000"],
        result: "8000000000000000",
      },
      {
        operation: "add",
        operands: ["8000000000000000", "8000000000000000"],
        result: "8000000000000000",
      },
      {
        operation: "subtract",
        operands: ["3ff0000000000000", "3ff0000000000000"],
        result: "0000000000000000",
      },
      {
        operation: "sqrt",
        operands: ["4000000000000000"],
        result: "3ff6a09e667f3bcd",
      },
    ];
    for (const candidate of accepted) {
      expect(validatePairedTBinary64PrimitiveCandidate(candidate)).toEqual([]);
      const changed = {
        ...candidate,
        result: candidate.result.replace(/.$/, (last) => (last === "0" ? "1" : "0")),
      };
      expect(validatePairedTBinary64PrimitiveCandidate(changed).length).toBeGreaterThan(0);
    }
  });

  it("cross-checks exact primitive reconstruction over a deterministic broad bit corpus", () => {
    let state = 0x9e37_79b9_7f4a_7c15n;
    const mask = (1n << 64n) - 1n;
    const next = (): bigint => {
      state ^= state << 13n;
      state ^= state >> 7n;
      state ^= state << 17n;
      state &= mask;
      return state;
    };
    const finiteBits = (): bigint => {
      let value = next();
      if (((value >> 52n) & 0x7ffn) === 0x7ffn) value &= ~(0x7ffn << 52n);
      return value;
    };
    for (const operation of ["add", "subtract", "multiply", "divide"] as const) {
      for (let index = 0; index < 2048; index += 1) {
        const first = numberFromBits(finiteBits());
        let second = numberFromBits(finiteBits());
        if (operation === "divide" && second === 0) second = 1;
        const result =
          operation === "add"
            ? first + second
            : operation === "subtract"
              ? first - second
              : operation === "multiply"
                ? first * second
                : first / second;
        expect(
          validatePairedTBinary64PrimitiveCandidate({
            operation,
            operands: [numberHex(first), numberHex(second)],
            result: numberHex(result),
          }),
        ).toEqual([]);
      }
    }
    for (let index = 0; index < 2048; index += 1) {
      let inputBits = finiteBits() & ((1n << 63n) - 1n);
      if (inputBits === 0n) inputBits = 1n;
      const input = numberFromBits(inputBits);
      expect(
        validatePairedTBinary64PrimitiveCandidate({
          operation: "sqrt",
          operands: [numberHex(input)],
          result: numberHex(Math.sqrt(input)),
        }),
      ).toEqual([]);
    }
  });

  it("rejects malformed and hostile primitive-verifier inputs without invoking accessors", () => {
    let getterCalls = 0;
    const accessor = Object.defineProperty(
      { operation: "sqrt", operands: ["4000000000000000"] },
      "result",
      {
        enumerable: true,
        get: () => {
          getterCalls += 1;
          return "3ff6a09e667f3bcd";
        },
      },
    );
    const throwingProxy = new Proxy(
      {},
      {
        ownKeys: () => {
          throw new Error("hostile keys");
        },
      },
    );
    for (const candidate of [null, {}, [], accessor, throwingProxy]) {
      expect(() => validatePairedTBinary64PrimitiveCandidate(candidate)).not.toThrow();
      expect(validatePairedTBinary64PrimitiveCandidate(candidate).length).toBeGreaterThan(0);
    }
    expect(getterCalls).toBe(0);
  });

  it("rejects trace mutation, omission, reordering, duplication, and output rebinding", () => {
    const result = evaluatePairedTSupportedExecutionCandidate({
      degreesOfFreedom: 3,
      testStatistic: 2,
    });
    if (!result.ok) throw new Error("trace mutation control unexpectedly refused");
    expect(verifyPairedTExecutionTraceCandidate(result.trace).ok).toBe(true);

    const mutations: unknown[] = [];
    const changedResult = cloneTrace(result.trace);
    changedResult.nodes[1]!.result_binary64_hex = "0000000000000000";
    mutations.push(changedResult);
    const changedOperand = cloneTrace(result.trace);
    changedOperand.nodes[1]!.operand_binary64_hex[0] = "0000000000000000";
    mutations.push(changedOperand);
    const reordered = cloneTrace(result.trace);
    [reordered.nodes[1], reordered.nodes[2]] = [reordered.nodes[2]!, reordered.nodes[1]!];
    mutations.push(reordered);
    const omitted = cloneTrace(result.trace);
    omitted.nodes.splice(2, 1);
    mutations.push(omitted);
    const duplicate = cloneTrace(result.trace);
    duplicate.nodes[2]!.label = duplicate.nodes[1]!.label;
    mutations.push(duplicate);
    const rebound = cloneTrace(result.trace);
    rebound.outcome.p_value_source_sequence = 1;
    mutations.push(rebound);
    const changedBranch = cloneTrace(result.trace);
    changedBranch.outcome.branch = "equal-final-bits-divergent-proof-graph";
    mutations.push(changedBranch);
    const changedDigest = cloneTrace(result.trace);
    changedDigest.sha256 = `sha256:${"0".repeat(64)}`;
    mutations.push(changedDigest);
    const expandedLimit = cloneTrace(result.trace);
    expandedLimit.maximum_node_count = PAIRED_T_SUPPORTED_EXECUTION_MAX_TRACE_NODES + 1;
    mutations.push(expandedLimit);

    for (const mutation of mutations) {
      expect(() => verifyPairedTExecutionTraceCandidate(mutation)).not.toThrow();
      expect(verifyPairedTExecutionTraceCandidate(mutation).ok).toBe(false);
    }
  });

  it("contains hostile trace meta-objects without invoking accessors", () => {
    const result = evaluatePairedTSupportedExecutionCandidate({
      degreesOfFreedom: 3,
      testStatistic: 2,
    });
    if (!result.ok) throw new Error("hostile trace control unexpectedly refused");
    let getterCalls = 0;
    const accessor = Object.defineProperty(cloneTrace(result.trace), "sha256", {
      enumerable: true,
      get: () => {
        getterCalls += 1;
        return result.trace.sha256;
      },
    });
    const throwingProxy = new Proxy(
      {},
      {
        ownKeys: () => {
          throw new Error("hostile trace keys");
        },
      },
    );
    for (const trace of [accessor, throwingProxy]) {
      expect(() => verifyPairedTExecutionTraceCandidate(trace)).not.toThrow();
      expect(verifyPairedTExecutionTraceCandidate(trace).ok).toBe(false);
    }
    expect(getterCalls).toBe(0);
  });

  it("makes traces deterministic within one exact runtime identity", () => {
    const first = evaluatePairedTSupportedExecutionCandidate({
      degreesOfFreedom: 6,
      testStatistic: 0.75,
    });
    const second = evaluatePairedTSupportedExecutionCandidate({
      degreesOfFreedom: 6,
      testStatistic: 0.75,
    });
    if (!first.ok || !second.ok) throw new Error("determinism control unexpectedly refused");
    expect(first.trace.sha256).toBe(second.trace.sha256);
    expect(first.trace).toEqual(second.trace);
  });

  it("fails closed on trace resource exhaustion", () => {
    expect(
      evaluatePairedTSupportedExecutionCandidateWithReviewLimit(
        { degreesOfFreedom: 10, testStatistic: 0.5 },
        2,
      ),
    ).toMatchObject({
      ok: false,
      classification: "execution_trace_resource_bound_exceeded",
      supportedExecutionPredicateSatisfied: false,
      runtimeSupportClaimed: false,
    });
  });

  it("fails closed when a captured intrinsic is replaced after startup", () => {
    const original = Math.sqrt;
    try {
      Math.sqrt = (value: number) => original(value);
      expect(
        evaluatePairedTSupportedExecutionCandidate({ degreesOfFreedom: 2, testStatistic: 2 }),
      ).toMatchObject({
        ok: false,
        classification: "execution_diagnostic_failed",
        diagnosticFailures: ["pre_invocation:intrinsic_or_runtime_identity"],
        supportedExecutionPredicateSatisfied: false,
      });
    } finally {
      Math.sqrt = original;
    }
  });

  it("returns structured refusals for invalid and hostile input shapes", () => {
    const throwingProxy = new Proxy(
      {},
      {
        ownKeys: () => {
          throw new Error("hostile keys");
        },
      },
    );
    for (const input of [
      null,
      undefined,
      {},
      [],
      { degreesOfFreedom: 0, testStatistic: 1 },
      { degreesOfFreedom: 201, testStatistic: 1 },
      { degreesOfFreedom: 10, testStatistic: Number.NaN },
      { degreesOfFreedom: 10, testStatistic: -0 },
      { degreesOfFreedom: 10, testStatistic: 1, extra: true },
      throwingProxy,
    ]) {
      expect(() => evaluatePairedTSupportedExecutionCandidate(input)).not.toThrow();
      expect(evaluatePairedTSupportedExecutionCandidate(input)).toMatchObject({
        ok: false,
        classification: "runtime_graph_refusal",
        supportedExecutionPredicateSatisfied: false,
        supportedPlatformClaimed: false,
        runtimeSupportClaimed: false,
        supportedDomainClaimed: false,
      });
    }
  });
});
