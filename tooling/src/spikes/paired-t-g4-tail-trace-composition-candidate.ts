/**
 * Non-authoritative composition candidate that links the reviewed G4 actual-
 * execution trace to the reviewed table-connected Student-t tail trace.
 *
 * This module does not change either underlying evaluator. It accepts raw paired
 * observations, obtains a verified G4 trace, derives df and t from that verified
 * result, evaluates the existing tail candidate, and binds the two trace digests
 * plus the exact handoff bits into one immutable composition envelope.
 *
 * G4 mathematical-truth error, confidence-interval composition, resource-bound
 * selection, platform selection, supported execution, and runtime support remain
 * outside this increment.
 */

import { createHash } from "node:crypto";
import { isDeepStrictEqual } from "node:util";
import {
  evaluatePairedTG4ExecutionTraceCandidate,
  verifyPairedTG4ExecutionTraceCandidate,
  type PairedTG4ExecutionTraceCandidate,
} from "./paired-t-g4-execution-trace-candidate.js";
import {
  evaluatePairedTSupportedExecutionCandidate,
  verifyPairedTExecutionTraceCandidate,
  type PairedTExecutionTraceCandidate,
} from "./paired-t-supported-execution-candidate.js";

const COMPOSITION_FORMAT = "paired-t-g4-tail-trace-composition-v1";

export interface PairedTG4TailCompositionLinkCandidate {
  g4_trace_sha256: string;
  tail_trace_sha256: string;
  g4_test_statistic_source_sequence: number;
  g4_test_statistic_binary64_hex: string;
  g4_degrees_of_freedom: number;
  tail_input_test_statistic_binary64_hex: string;
  tail_input_degrees_of_freedom: number;
  p_value_binary64_hex: string;
  p_value_source_sequence: number | null;
}

export interface PairedTG4TailTraceCompositionCandidate {
  format: typeof COMPOSITION_FORMAT;
  g4_trace: PairedTG4ExecutionTraceCandidate;
  tail_trace: PairedTExecutionTraceCandidate;
  link: PairedTG4TailCompositionLinkCandidate;
  sha256: string;
}

export interface PairedTG4TailCompositionCheckpointCandidate {
  status: string;
  issuance: string;
  review_issue: string;
  candidate_key: string;
  decision_state: string;
  runtime_support_enabled: boolean;
  supported_domain_claimed: boolean;
  scope: Record<string, unknown>;
  composition: Record<string, unknown>;
  readiness_admission: Record<string, unknown>;
  closure_state: Record<string, unknown>;
  prohibited_claims: string[];
}

export type PairedTG4TailCompositionCandidateResult =
  | {
      ok: true;
      status: "non_authoritative_g4_tail_composition_evaluation";
      result: {
        operationGraph: "g4-pairwise-two-pass-candidate";
        pairIds: readonly string[];
        differences: readonly number[];
        nPairs: number;
        meanDifference: number;
        sampleVarianceDifference: number;
        standardError: number;
        testStatistic: number;
        degreesOfFreedom: number;
        pValue: number;
        pValueBinary64Hex: string;
      };
      composition: PairedTG4TailTraceCompositionCandidate;
      verification: {
        compositionVerified: true;
        g4TraceVerified: true;
        tailTraceVerified: true;
        g4OrdinaryArithmeticChecks: number;
        g4SquareRootChecks: number;
        tailOrdinaryArithmeticChecks: number;
        tailSquareRootChecks: number;
        tailExactSelectionChecks: number;
      };
      tailProof: {
        source: "same_execution_trace_as_returned_value";
        candidateTruthErrorBoundUlp: number;
        truthErrorBoundSelected: false;
      };
      tailTraceCompositionImplemented: true;
      tailTraceCompositionIndependentlyReviewed: true;
      g4MathematicalTruthErrorBoundComplete: false;
      confidenceIntervalCompositionComplete: false;
      supportedExecutionPredicateSatisfied: false;
      supportedPlatformClaimed: false;
      supportedDomainClaimed: false;
      runtimeSupportClaimed: false;
    }
  | {
      ok: false;
      status: "non_authoritative_g4_tail_composition_evaluation";
      classification: "g4_stage_refusal" | "tail_stage_refusal" | "composition_verification_failed";
      g4Classification?: string;
      g4GraphClassification?: string;
      tailClassification?: string;
      tailGraphClassification?: string;
      compositionErrors?: string[];
      tailTraceCompositionImplemented: true;
      tailTraceCompositionIndependentlyReviewed: true;
      g4MathematicalTruthErrorBoundComplete: false;
      confidenceIntervalCompositionComplete: false;
      supportedExecutionPredicateSatisfied: false;
      supportedPlatformClaimed: false;
      supportedDomainClaimed: false;
      runtimeSupportClaimed: false;
    };

const EXPECTED_CHECKPOINT = {
  status: "non_authoritative_candidate",
  issuance: "unissued",
  review_issue: "https://github.com/licklider-ai/nomue-protocol/issues/25",
  candidate_key: "paired-t-d5-g4-tail-trace-composition-evaluation-1",
  decision_state: "independently_reviewed_composition_candidate_pending_g4_truth_bound",
  runtime_support_enabled: false,
  supported_domain_claimed: false,
  scope: {
    input: "explicit_paired_binary64_observations",
    upstream_g4_trace_format: "paired-t-g4-actual-execution-trace-v1",
    tail_trace_format: "paired-t-supported-execution-trace-v1",
    output: "g4_result_p_value_tail_proof_and_composition_binding",
    existing_g4_implementation_changed: false,
    existing_tail_implementation_changed: false,
    g4_mathematical_truth_error_bound_included: false,
    confidence_interval_endpoints_included: false,
  },
  composition: {
    format: COMPOSITION_FORMAT,
    execution_order: "verified_g4_trace_then_verified_tail_trace",
    handoff: "g4_test_statistic_bits_and_df_equal_tail_trace_input",
    binds:
      "g4_trace_digest_tail_trace_digest_g4_test_statistic_source_and_bits_df_tail_input_bits_p_value_bits_and_source",
    both_nested_traces_reverified_before_acceptance: true,
    returned_p_value_source: "verified_tail_trace",
    mutation_disposition: "fail_closed",
  },
  readiness_admission: {
    evidence_readiness_changed_by_this_increment: true,
    admission_state: "admitted_as_independently_reviewed_non_authoritative_candidate",
  },
  closure_state: {
    implementation: "independently_reviewed_candidate",
    g4_mathematical_truth_error_bound: "pending",
    tail_trace_composition_review: "closed",
    confidence_interval_trace_composition: "pending",
    supported_resource_bound: "unselected",
    supported_execution_predicate: "unselected",
  },
  prohibited_claims: [
    "complete_g4_mathematical_truth_error_bound",
    "complete_confidence_interval_trace",
    "supported_pair_or_df_max",
    "supported_value_domain",
    "selected_supported_platform",
    "selected_supported_execution_predicate",
    "runtime_support",
    "authoritative_public_check_or_bundle",
    "r2_d5_complete",
    "release_2_complete",
  ],
} as const;

interface ParsedG4LinkSource {
  traceSha256: string;
  testStatisticSourceSequence: number;
  testStatisticBinary64Hex: string;
  degreesOfFreedom: number;
}

interface ParsedTailLinkSource {
  traceSha256: string;
  testStatisticBinary64Hex: string;
  degreesOfFreedom: number;
  pValueBinary64Hex: string;
  pValueSourceSequence: number | null;
}

function ownDataRecord(
  value: unknown,
  expectedKeys: readonly string[],
): Record<string, unknown> | undefined {
  try {
    if (typeof value !== "object" || value === null || Array.isArray(value)) return undefined;
    const prototype = Reflect.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) return undefined;
    const keys = Reflect.ownKeys(value);
    if (
      keys.length !== expectedKeys.length ||
      keys.some((entry) => typeof entry !== "string" || !expectedKeys.includes(entry))
    ) {
      return undefined;
    }
    const result: Record<string, unknown> = {};
    for (const key of expectedKeys) {
      const descriptor = Reflect.getOwnPropertyDescriptor(value, key);
      if (descriptor === undefined || !("value" in descriptor) || descriptor.enumerable !== true) {
        return undefined;
      }
      result[key] = descriptor.value;
    }
    return result;
  } catch {
    return undefined;
  }
}

function ownDataArray(value: unknown, maximumLength: number): unknown[] | undefined {
  try {
    if (!Array.isArray(value)) return undefined;
    const lengthDescriptor = Reflect.getOwnPropertyDescriptor(value, "length");
    if (lengthDescriptor === undefined || !("value" in lengthDescriptor)) return undefined;
    const length = lengthDescriptor.value as unknown;
    if (
      !Number.isSafeInteger(length) ||
      (length as number) < 0 ||
      (length as number) > maximumLength
    ) {
      return undefined;
    }
    const expectedKeys = Array.from({ length: length as number }, (_, index) => String(index));
    const keys = Reflect.ownKeys(value).filter((entry) => entry !== "length");
    if (
      keys.length !== expectedKeys.length ||
      keys.some((entry) => typeof entry !== "string" || !expectedKeys.includes(entry))
    ) {
      return undefined;
    }
    const result: unknown[] = [];
    for (const key of expectedKeys) {
      const descriptor = Reflect.getOwnPropertyDescriptor(value, key);
      if (descriptor === undefined || !("value" in descriptor) || descriptor.enumerable !== true) {
        return undefined;
      }
      result.push(descriptor.value);
    }
    return result;
  } catch {
    return undefined;
  }
}

function parseLink(value: unknown): PairedTG4TailCompositionLinkCandidate | undefined {
  const record = ownDataRecord(value, [
    "g4_trace_sha256",
    "tail_trace_sha256",
    "g4_test_statistic_source_sequence",
    "g4_test_statistic_binary64_hex",
    "g4_degrees_of_freedom",
    "tail_input_test_statistic_binary64_hex",
    "tail_input_degrees_of_freedom",
    "p_value_binary64_hex",
    "p_value_source_sequence",
  ]);
  if (
    record === undefined ||
    typeof record["g4_trace_sha256"] !== "string" ||
    !/^sha256:[0-9a-f]{64}$/.test(record["g4_trace_sha256"]) ||
    typeof record["tail_trace_sha256"] !== "string" ||
    !/^sha256:[0-9a-f]{64}$/.test(record["tail_trace_sha256"]) ||
    !Number.isSafeInteger(record["g4_test_statistic_source_sequence"]) ||
    (record["g4_test_statistic_source_sequence"] as number) < 1 ||
    typeof record["g4_test_statistic_binary64_hex"] !== "string" ||
    !/^[0-9a-f]{16}$/.test(record["g4_test_statistic_binary64_hex"]) ||
    !Number.isSafeInteger(record["g4_degrees_of_freedom"]) ||
    (record["g4_degrees_of_freedom"] as number) < 1 ||
    typeof record["tail_input_test_statistic_binary64_hex"] !== "string" ||
    !/^[0-9a-f]{16}$/.test(record["tail_input_test_statistic_binary64_hex"]) ||
    !Number.isSafeInteger(record["tail_input_degrees_of_freedom"]) ||
    (record["tail_input_degrees_of_freedom"] as number) < 1 ||
    typeof record["p_value_binary64_hex"] !== "string" ||
    !/^[0-9a-f]{16}$/.test(record["p_value_binary64_hex"]) ||
    (record["p_value_source_sequence"] !== null &&
      (!Number.isSafeInteger(record["p_value_source_sequence"]) ||
        (record["p_value_source_sequence"] as number) < 1))
  ) {
    return undefined;
  }
  return record as unknown as PairedTG4TailCompositionLinkCandidate;
}

function parseG4LinkSource(value: unknown): ParsedG4LinkSource | undefined {
  const trace = ownDataRecord(value, [
    "format",
    "input",
    "outcome",
    "node_count",
    "maximum_node_count_evaluation_candidate",
    "sha256",
    "nodes",
  ]);
  if (trace === undefined || typeof trace["sha256"] !== "string") return undefined;
  const outcome = ownDataRecord(trace["outcome"], [
    "difference_source_sequences",
    "mean_difference_source_sequence",
    "sample_variance_source_sequence",
    "standard_error_source_sequence",
    "test_statistic_source_sequence",
    "n_pairs",
    "degrees_of_freedom",
    "difference_binary64_hex",
    "mean_difference_binary64_hex",
    "sample_variance_binary64_hex",
    "standard_error_binary64_hex",
    "test_statistic_binary64_hex",
  ]);
  if (
    outcome === undefined ||
    !Number.isSafeInteger(outcome["test_statistic_source_sequence"]) ||
    (outcome["test_statistic_source_sequence"] as number) < 1 ||
    typeof outcome["test_statistic_binary64_hex"] !== "string" ||
    !/^[0-9a-f]{16}$/.test(outcome["test_statistic_binary64_hex"]) ||
    !Number.isSafeInteger(outcome["degrees_of_freedom"]) ||
    (outcome["degrees_of_freedom"] as number) < 1
  ) {
    return undefined;
  }
  return {
    traceSha256: trace["sha256"],
    testStatisticSourceSequence: outcome["test_statistic_source_sequence"] as number,
    testStatisticBinary64Hex: outcome["test_statistic_binary64_hex"],
    degreesOfFreedom: outcome["degrees_of_freedom"] as number,
  };
}

function parseTailLinkSource(value: unknown): ParsedTailLinkSource | undefined {
  const trace = ownDataRecord(value, [
    "format",
    "input",
    "normalization_constant",
    "runtime_identity",
    "proof_input",
    "outcome",
    "node_count",
    "maximum_node_count",
    "sha256",
    "nodes",
  ]);
  if (trace === undefined || typeof trace["sha256"] !== "string") return undefined;
  const input = ownDataRecord(trace["input"], [
    "degrees_of_freedom",
    "test_statistic_binary64_hex",
  ]);
  const outcome = ownDataRecord(trace["outcome"], [
    "branch",
    "iterations",
    "iteration_cap",
    "p_value_binary64_hex",
    "p_value_source_sequence",
    "positive_series_remainder_binary64_hex",
    "positive_series_remainder_source_sequence",
  ]);
  if (
    input === undefined ||
    outcome === undefined ||
    !Number.isSafeInteger(input["degrees_of_freedom"]) ||
    (input["degrees_of_freedom"] as number) < 1 ||
    typeof input["test_statistic_binary64_hex"] !== "string" ||
    !/^[0-9a-f]{16}$/.test(input["test_statistic_binary64_hex"]) ||
    typeof outcome["p_value_binary64_hex"] !== "string" ||
    !/^[0-9a-f]{16}$/.test(outcome["p_value_binary64_hex"]) ||
    (outcome["p_value_source_sequence"] !== null &&
      (!Number.isSafeInteger(outcome["p_value_source_sequence"]) ||
        (outcome["p_value_source_sequence"] as number) < 1))
  ) {
    return undefined;
  }
  return {
    traceSha256: trace["sha256"],
    testStatisticBinary64Hex: input["test_statistic_binary64_hex"],
    degreesOfFreedom: input["degrees_of_freedom"] as number,
    pValueBinary64Hex: outcome["p_value_binary64_hex"],
    pValueSourceSequence: outcome["p_value_source_sequence"] as number | null,
  };
}

function compositionDigest(link: PairedTG4TailCompositionLinkCandidate): string {
  const payload = { format: COMPOSITION_FORMAT, link };
  return `sha256:${createHash("sha256").update(JSON.stringify(payload), "utf8").digest("hex")}`;
}

function buildComposition(
  g4Trace: PairedTG4ExecutionTraceCandidate,
  tailTrace: PairedTExecutionTraceCandidate,
): PairedTG4TailTraceCompositionCandidate {
  const link: PairedTG4TailCompositionLinkCandidate = {
    g4_trace_sha256: g4Trace.sha256,
    tail_trace_sha256: tailTrace.sha256,
    g4_test_statistic_source_sequence: g4Trace.outcome.test_statistic_source_sequence,
    g4_test_statistic_binary64_hex: g4Trace.outcome.test_statistic_binary64_hex,
    g4_degrees_of_freedom: g4Trace.outcome.degrees_of_freedom,
    tail_input_test_statistic_binary64_hex: tailTrace.input.test_statistic_binary64_hex,
    tail_input_degrees_of_freedom: tailTrace.input.degrees_of_freedom,
    p_value_binary64_hex: tailTrace.outcome.p_value_binary64_hex,
    p_value_source_sequence: tailTrace.outcome.p_value_source_sequence,
  };
  return {
    format: COMPOSITION_FORMAT,
    g4_trace: g4Trace,
    tail_trace: tailTrace,
    link,
    sha256: compositionDigest(link),
  };
}

function deepFreeze<T>(value: T): T {
  if (typeof value !== "object" || value === null || Object.isFrozen(value)) return value;
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Reflect.getOwnPropertyDescriptor(value, key);
    if (descriptor !== undefined && "value" in descriptor) deepFreeze(descriptor.value);
  }
  return Object.freeze(value);
}

/** Verify both nested traces and the exact G4 -> tail handoff binding. */
export function verifyPairedTG4TailTraceCompositionCandidate(candidate: unknown): {
  ok: boolean;
  errors: string[];
} {
  const top = ownDataRecord(candidate, ["format", "g4_trace", "tail_trace", "link", "sha256"]);
  if (
    top === undefined ||
    top["format"] !== COMPOSITION_FORMAT ||
    typeof top["sha256"] !== "string" ||
    !/^sha256:[0-9a-f]{64}$/.test(top["sha256"])
  ) {
    return { ok: false, errors: ["composition has an invalid closed structure"] };
  }
  const link = parseLink(top["link"]);
  if (link === undefined) {
    return { ok: false, errors: ["composition link has an invalid closed structure"] };
  }

  const errors: string[] = [];
  const g4Verification = verifyPairedTG4ExecutionTraceCandidate(top["g4_trace"]);
  if (!g4Verification.ok) {
    errors.push(...g4Verification.errors.map((entry) => `G4 trace: ${entry}`));
  }
  const tailVerification = verifyPairedTExecutionTraceCandidate(top["tail_trace"]);
  if (!tailVerification.ok) {
    errors.push(...tailVerification.errors.map((entry) => `tail trace: ${entry}`));
  }

  if (g4Verification.ok && tailVerification.ok) {
    const g4 = parseG4LinkSource(top["g4_trace"]);
    const tail = parseTailLinkSource(top["tail_trace"]);
    if (g4 === undefined || tail === undefined) {
      errors.push("composition cannot extract the verified trace handoff fields");
    } else {
      const expectedLink: PairedTG4TailCompositionLinkCandidate = {
        g4_trace_sha256: g4.traceSha256,
        tail_trace_sha256: tail.traceSha256,
        g4_test_statistic_source_sequence: g4.testStatisticSourceSequence,
        g4_test_statistic_binary64_hex: g4.testStatisticBinary64Hex,
        g4_degrees_of_freedom: g4.degreesOfFreedom,
        tail_input_test_statistic_binary64_hex: tail.testStatisticBinary64Hex,
        tail_input_degrees_of_freedom: tail.degreesOfFreedom,
        p_value_binary64_hex: tail.pValueBinary64Hex,
        p_value_source_sequence: tail.pValueSourceSequence,
      };
      if (!isDeepStrictEqual(link, expectedLink)) {
        errors.push("composition link differs from the verified nested trace fields");
      }
      if (
        g4.testStatisticBinary64Hex !== tail.testStatisticBinary64Hex ||
        g4.degreesOfFreedom !== tail.degreesOfFreedom
      ) {
        errors.push("tail trace input is not the exact G4 test-statistic bits and df");
      }
    }
  }

  if (compositionDigest(link) !== top["sha256"]) {
    errors.push("composition digest differs from the closed link payload");
  }
  return { ok: errors.length === 0, errors: [...new Set(errors)] };
}

function refusal(
  classification: Extract<PairedTG4TailCompositionCandidateResult, { ok: false }>["classification"],
  extra: Partial<Extract<PairedTG4TailCompositionCandidateResult, { ok: false }>> = {},
): PairedTG4TailCompositionCandidateResult {
  return {
    ok: false,
    status: "non_authoritative_g4_tail_composition_evaluation",
    classification,
    tailTraceCompositionImplemented: true,
    tailTraceCompositionIndependentlyReviewed: true,
    g4MathematicalTruthErrorBoundComplete: false,
    confidenceIntervalCompositionComplete: false,
    supportedExecutionPredicateSatisfied: false,
    supportedPlatformClaimed: false,
    supportedDomainClaimed: false,
    runtimeSupportClaimed: false,
    ...extra,
  };
}

/** Evaluate raw paired observations through G4 and the existing tail trace candidate. */
export function evaluatePairedTG4TailTraceCompositionCandidate(
  input: unknown,
): PairedTG4TailCompositionCandidateResult {
  const g4 = evaluatePairedTG4ExecutionTraceCandidate(input);
  if (!g4.ok) {
    return refusal("g4_stage_refusal", {
      g4Classification: g4.classification,
      ...(g4.graphClassification === undefined
        ? {}
        : { g4GraphClassification: g4.graphClassification }),
    });
  }

  const tail = evaluatePairedTSupportedExecutionCandidate({
    degreesOfFreedom: g4.result.degreesOfFreedom,
    testStatistic: g4.result.testStatistic,
  });
  if (!tail.ok) {
    return refusal("tail_stage_refusal", {
      tailClassification: tail.classification,
      ...(tail.graphClassification === undefined
        ? {}
        : { tailGraphClassification: tail.graphClassification }),
    });
  }

  const composition = buildComposition(g4.trace, tail.trace);
  const verification = verifyPairedTG4TailTraceCompositionCandidate(composition);
  if (!verification.ok) {
    return refusal("composition_verification_failed", {
      compositionErrors: verification.errors,
    });
  }

  deepFreeze(composition);
  const result = {
    operationGraph: g4.result.operationGraph,
    pairIds: g4.result.pairIds,
    differences: g4.result.differences,
    nPairs: g4.result.nPairs,
    meanDifference: g4.result.meanDifference,
    sampleVarianceDifference: g4.result.sampleVarianceDifference,
    standardError: g4.result.standardError,
    testStatistic: g4.result.testStatistic,
    degreesOfFreedom: g4.result.degreesOfFreedom,
    pValue: tail.pValue,
    pValueBinary64Hex: tail.pValueBinary64Hex,
  };
  deepFreeze(result);
  return {
    ok: true,
    status: "non_authoritative_g4_tail_composition_evaluation",
    result,
    composition,
    verification: {
      compositionVerified: true,
      g4TraceVerified: true,
      tailTraceVerified: true,
      g4OrdinaryArithmeticChecks: g4.traceVerification.ordinaryArithmeticChecks,
      g4SquareRootChecks: g4.traceVerification.squareRootChecks,
      tailOrdinaryArithmeticChecks: tail.traceVerification.ordinaryArithmeticChecks,
      tailSquareRootChecks: tail.traceVerification.squareRootChecks,
      tailExactSelectionChecks: tail.traceVerification.exactSelectionChecks,
    },
    tailProof: {
      source: tail.proof.source,
      candidateTruthErrorBoundUlp: tail.proof.candidateTruthErrorBoundUlp,
      truthErrorBoundSelected: false,
    },
    tailTraceCompositionImplemented: true,
    tailTraceCompositionIndependentlyReviewed: true,
    g4MathematicalTruthErrorBoundComplete: false,
    confidenceIntervalCompositionComplete: false,
    supportedExecutionPredicateSatisfied: false,
    supportedPlatformClaimed: false,
    supportedDomainClaimed: false,
    runtimeSupportClaimed: false,
  };
}

function canonicalizeJson(value: unknown, ancestors = new Set<object>()): unknown {
  if (
    value === undefined ||
    typeof value === "bigint" ||
    typeof value === "function" ||
    typeof value === "symbol" ||
    (typeof value === "number" && !Number.isFinite(value))
  ) {
    throw new TypeError("composition checkpoint contains non-JSON data");
  }
  if (typeof value !== "object" || value === null) return value;
  if (ancestors.has(value)) throw new TypeError("composition checkpoint contains a cycle");
  const next = new Set(ancestors).add(value);
  if (Array.isArray(value)) {
    const entries = ownDataArray(value, 10_000);
    if (entries === undefined) {
      throw new TypeError("composition checkpoint contains a non-data array");
    }
    return entries.map((entry) => canonicalizeJson(entry, next));
  }
  const prototype = Reflect.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) {
    throw new TypeError("composition checkpoint contains a non-JSON object");
  }
  const keys = Reflect.ownKeys(value);
  if (keys.some((key) => typeof key !== "string")) {
    throw new TypeError("composition checkpoint contains a symbol key");
  }
  const entries: Array<[string, unknown]> = [];
  for (const key of keys as string[]) {
    const descriptor = Reflect.getOwnPropertyDescriptor(value, key);
    if (descriptor === undefined || !("value" in descriptor) || descriptor.enumerable !== true) {
      throw new TypeError("composition checkpoint contains a non-data property");
    }
    entries.push([key, canonicalizeJson(descriptor.value, next)]);
  }
  entries.sort(([first], [second]) => (first < second ? -1 : first > second ? 1 : 0));
  return Object.fromEntries(entries);
}

/** Fail-closed exact checkpoint validator for the independently reviewed composition candidate. */
export function validatePairedTG4TailCompositionCheckpoint(candidate: unknown): string[] {
  try {
    return JSON.stringify(canonicalizeJson(candidate)) ===
      JSON.stringify(canonicalizeJson(EXPECTED_CHECKPOINT))
      ? []
      : ["G4-to-tail composition checkpoint differs from the closed non-runtime candidate"];
  } catch {
    return ["G4-to-tail composition checkpoint differs from the closed non-runtime candidate"];
  }
}
