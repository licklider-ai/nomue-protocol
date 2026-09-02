/**
 * Non-authoritative Group 2 candidate that composes the reviewed paired-t G4,
 * tail, confidence-interval, mathematical-truth, projection, and resource checks.
 *
 * This module selects a candidate numerical predicate for independent review. It
 * does not select a platform, admit a supported execution, freeze the numerical
 * contract, or enable runtime support.
 */

import { createHash } from "node:crypto";
import { isDeepStrictEqual } from "node:util";
import {
  evaluatePairedTCandidateResourceEnvelope,
  type PairedTCandidateResourceEnvelopeInput,
} from "./paired-t-candidate-supported-scope-resource-bounds.js";
import {
  evaluatePairedTCIEndpointTruthCandidate,
  verifyPairedTCIEndpointTruthCandidate,
  type PairedTCIEndpointTruthEnvelopeCandidate,
} from "./paired-t-ci-endpoint-truth-error-candidate.js";
import {
  evaluatePairedTG4TailTraceCompositionCandidate,
  verifyPairedTG4TailTraceCompositionCandidate,
  type PairedTG4TailTraceCompositionCandidate,
} from "./paired-t-g4-tail-trace-composition-candidate.js";
import { evaluatePairedTSupportedExecutionCandidate } from "./paired-t-supported-execution-candidate.js";

const FULL_TRACE_FORMAT = "paired-t-runtime-numerical-contract-full-trace-v1";
const TAIL_TABLE_CONTENT_HASH =
  "sha256:ba1f992199e9e153956589d62dcf5a6509575100bb7c923c170bfa45fdd76c08";
const FIXED_95_TABLE_CONTENT_HASH =
  "sha256:24ccc86d7a49b9e1ef1e3fc9b038a5b8d338b8b5ca4a02492d8900d7e7dea3c0";
const EXPECTED_CHECKPOINT_CANONICAL_SHA256 =
  "sha256:72caa3e86b8eec0fb0c1f6ad21de9d8f480121f29e385ecec946c2dab39d3005";
const MAXIMUM_CLOSED_JSON_ARRAY_LENGTH = 120_000;

interface FullTraceLinkCandidate {
  g4_trace_sha256: string;
  tail_composition_sha256: string;
  tail_trace_sha256: string;
  ci_trace_sha256: string;
  ci_endpoint_truth_sha256: string;
  tail_table_content_hash: typeof TAIL_TABLE_CONTENT_HASH;
  fixed_95_table_content_hash: typeof FIXED_95_TABLE_CONTENT_HASH;
  p_value_binary64_hex: string;
  lower_endpoint_binary64_hex: string;
  upper_endpoint_binary64_hex: string;
}

export interface PairedTRuntimeNumericalContractFullTraceEnvelopeCandidate {
  format: typeof FULL_TRACE_FORMAT;
  g4_tail_composition: PairedTG4TailTraceCompositionCandidate;
  ci_endpoint_truth: PairedTCIEndpointTruthEnvelopeCandidate;
  link: FullTraceLinkCandidate;
  resource: PairedTCandidateResourceEnvelopeInput;
  sha256: string;
}

export type PairedTRuntimeNumericalContractFullTraceCandidateResult =
  | {
      ok: true;
      status: "non_authoritative_group_2_full_trace_evaluation";
      result: {
        nPairs: number;
        degreesOfFreedom: number;
        meanDifference: number;
        sampleVarianceDifference: number;
        standardError: number;
        testStatistic: number;
        pValue: number;
        pValueBinary64Hex: string;
        criticalValue: number;
        margin: number;
        lowerEndpoint: number;
        upperEndpoint: number;
      };
      envelope: PairedTRuntimeNumericalContractFullTraceEnvelopeCandidate;
      verification: {
        fullTraceVerified: true;
        sameG4TraceVerified: true;
        g4TailCompositionVerified: true;
        tailNumericalContractVerified: true;
        ciEndpointTruthVerified: true;
        resourceEnvelopeVerified: true;
      };
      candidateNumericalPredicateSatisfied: true;
      group2CandidateSelectionMade: true;
      group2Complete: false;
      numericalContractFrozen: false;
      supportedExecutionPredicateSatisfied: false;
      supportedPlatformClaimed: false;
      supportedDomainClaimed: false;
      runtimeSupportClaimed: false;
    }
  | {
      ok: false;
      status: "non_authoritative_group_2_full_trace_evaluation";
      classification:
        | "g4_tail_stage_refusal"
        | "ci_truth_stage_refusal"
        | "same_trace_binding_mismatch"
        | "resource_envelope_refusal"
        | "full_trace_verification_failed";
      upstreamClassification?: string;
      verificationErrors?: string[];
      candidateNumericalPredicateSatisfied: false;
      group2CandidateSelectionMade: true;
      group2Complete: false;
      numericalContractFrozen: false;
      supportedExecutionPredicateSatisfied: false;
      supportedPlatformClaimed: false;
      supportedDomainClaimed: false;
      runtimeSupportClaimed: false;
    };

type JsonRecord = Record<string, unknown>;

function strictDataCopy(
  value: unknown,
  ancestors = new Set<object>(),
  sortObjectKeys = false,
): unknown {
  if (
    value === undefined ||
    typeof value === "bigint" ||
    typeof value === "function" ||
    typeof value === "symbol" ||
    (typeof value === "number" && (!Number.isFinite(value) || Object.is(value, -0)))
  ) {
    throw new TypeError("Group 2 candidate contains non-canonical JSON data");
  }
  if (typeof value !== "object" || value === null) return value;
  if (ancestors.has(value)) throw new TypeError("Group 2 candidate contains a cycle");

  const nextAncestors = new Set(ancestors).add(value);
  const keys = Reflect.ownKeys(value);
  if (keys.some((key) => typeof key !== "string")) {
    throw new TypeError("Group 2 candidate contains symbol keys");
  }
  const descriptors = Object.getOwnPropertyDescriptors(value);

  if (Array.isArray(value)) {
    const lengthDescriptor = Reflect.getOwnPropertyDescriptor(value, "length");
    if (
      Reflect.getPrototypeOf(value) !== Array.prototype ||
      lengthDescriptor === undefined ||
      !("value" in lengthDescriptor) ||
      typeof lengthDescriptor.value !== "number" ||
      !Number.isSafeInteger(lengthDescriptor.value) ||
      lengthDescriptor.value < 0 ||
      lengthDescriptor.value > MAXIMUM_CLOSED_JSON_ARRAY_LENGTH ||
      keys.length !== lengthDescriptor.value + 1
    ) {
      throw new TypeError("Group 2 candidate contains an invalid array");
    }
    const result: unknown[] = [];
    for (let index = 0; index < lengthDescriptor.value; index += 1) {
      const descriptor = descriptors[String(index)];
      if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
        throw new TypeError("Group 2 candidate contains a non-data array entry");
      }
      result.push(strictDataCopy(descriptor.value, nextAncestors, sortObjectKeys));
    }
    return result;
  }

  if (Reflect.getPrototypeOf(value) !== Object.prototype) {
    throw new TypeError("Group 2 candidate contains a non-plain object");
  }
  const entries: Array<[string, unknown]> = [];
  for (const key of keys as string[]) {
    const descriptor = descriptors[key];
    if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
      throw new TypeError("Group 2 candidate contains hidden or accessor data");
    }
    entries.push([key, strictDataCopy(descriptor.value, nextAncestors, sortObjectKeys)]);
  }
  if (sortObjectKeys) {
    entries.sort(([first], [second]) => (first < second ? -1 : first > second ? 1 : 0));
  }
  return Object.fromEntries(entries);
}

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasExactKeys(value: JsonRecord, expected: readonly string[]): boolean {
  const actual = Object.keys(value).sort();
  const sortedExpected = [...expected].sort();
  return isDeepStrictEqual(actual, sortedExpected);
}

function sha256(value: unknown): string {
  return `sha256:${createHash("sha256").update(JSON.stringify(value), "utf8").digest("hex")}`;
}

function canonicalSha256(value: unknown): string {
  return sha256(strictDataCopy(value, new Set<object>(), true));
}

function envelopeDigestInput(
  envelope: Omit<PairedTRuntimeNumericalContractFullTraceEnvelopeCandidate, "sha256">,
): unknown {
  return {
    format: envelope.format,
    g4_tail_composition: envelope.g4_tail_composition,
    ci_endpoint_truth: envelope.ci_endpoint_truth,
    link: envelope.link,
    resource: envelope.resource,
  };
}

function expectedResource(
  g4Tail: PairedTG4TailTraceCompositionCandidate,
  ciTruth: PairedTCIEndpointTruthEnvelopeCandidate,
): PairedTCandidateResourceEnvelopeInput {
  const g4Nodes = g4Tail.g4_trace.node_count;
  const tailNodes = g4Tail.tail_trace.node_count;
  const ciNodes = ciTruth.ci_trace.node_count;
  return {
    n_pairs: g4Tail.g4_trace.outcome.n_pairs,
    degrees_of_freedom: g4Tail.g4_trace.outcome.degrees_of_freedom,
    g4_trace_nodes: g4Nodes,
    tail_iterations: g4Tail.tail_trace.outcome.iterations,
    tail_iteration_cap: g4Tail.tail_trace.outcome.iteration_cap,
    tail_trace_nodes: tailNodes,
    ci_specific_trace_nodes: ciNodes,
    combined_primitive_trace_nodes: g4Nodes + tailNodes + ciNodes,
  };
}

function numberFromBinary64Hex(value: unknown): number | undefined {
  if (typeof value !== "string" || !/^[0-9a-f]{16}$/.test(value)) return undefined;
  const view = new DataView(new ArrayBuffer(8));
  view.setBigUint64(0, BigInt(`0x${value}`), false);
  const result = view.getFloat64(0, false);
  return Number.isFinite(result) && !Object.is(result, -0) ? result : undefined;
}

function verifyTailNumericalContract(g4Tail: PairedTG4TailTraceCompositionCandidate): boolean {
  try {
    const degreesOfFreedom = g4Tail.tail_trace.input.degrees_of_freedom;
    const testStatistic = numberFromBinary64Hex(
      g4Tail.tail_trace.input.test_statistic_binary64_hex,
    );
    if (!Number.isSafeInteger(degreesOfFreedom) || testStatistic === undefined) return false;
    const replay = evaluatePairedTSupportedExecutionCandidate({
      degreesOfFreedom,
      testStatistic,
    });
    return replay.ok && isDeepStrictEqual(replay.trace, g4Tail.tail_trace);
  } catch {
    return false;
  }
}

function expectedLink(
  g4Tail: PairedTG4TailTraceCompositionCandidate,
  ciTruth: PairedTCIEndpointTruthEnvelopeCandidate,
): FullTraceLinkCandidate {
  return {
    g4_trace_sha256: g4Tail.g4_trace.sha256,
    tail_composition_sha256: g4Tail.sha256,
    tail_trace_sha256: g4Tail.tail_trace.sha256,
    ci_trace_sha256: ciTruth.ci_trace.sha256,
    ci_endpoint_truth_sha256: ciTruth.sha256,
    tail_table_content_hash: TAIL_TABLE_CONTENT_HASH,
    fixed_95_table_content_hash: FIXED_95_TABLE_CONTENT_HASH,
    p_value_binary64_hex: g4Tail.tail_trace.outcome.p_value_binary64_hex,
    lower_endpoint_binary64_hex: ciTruth.ci_trace.outcome.lower_endpoint_binary64_hex,
    upper_endpoint_binary64_hex: ciTruth.ci_trace.outcome.upper_endpoint_binary64_hex,
  };
}

function deepFreeze<T>(value: T, seen = new Set<object>()): T {
  if (typeof value !== "object" || value === null || seen.has(value)) return value;
  seen.add(value);
  for (const child of Object.values(value)) deepFreeze(child, seen);
  return Object.freeze(value);
}

function verifyPairedTRuntimeNumericalContractFullTraceCandidateInternal(candidate: unknown): {
  ok: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  let copied: unknown;
  try {
    copied = strictDataCopy(candidate);
  } catch {
    return { ok: false, errors: ["full-trace envelope is not closed canonical JSON data"] };
  }
  if (!isRecord(copied)) return { ok: false, errors: ["full-trace envelope must be an object"] };
  if (
    !hasExactKeys(copied, [
      "format",
      "g4_tail_composition",
      "ci_endpoint_truth",
      "link",
      "resource",
      "sha256",
    ])
  ) {
    return { ok: false, errors: ["full-trace envelope keys are not exact"] };
  }
  if (copied.format !== FULL_TRACE_FORMAT) errors.push("full-trace format is not selected");

  const g4Tail = copied.g4_tail_composition as PairedTG4TailTraceCompositionCandidate;
  const ciTruth = copied.ci_endpoint_truth as PairedTCIEndpointTruthEnvelopeCandidate;
  const g4TailVerification = verifyPairedTG4TailTraceCompositionCandidate(g4Tail);
  if (!g4TailVerification.ok) errors.push("nested G4-tail composition is invalid");
  if (!verifyTailNumericalContract(g4Tail)) {
    errors.push("nested tail truth and projection contract is invalid");
  }
  const ciTruthVerification = verifyPairedTCIEndpointTruthCandidate(ciTruth);
  if (!ciTruthVerification.ok) errors.push("nested CI endpoint truth envelope is invalid");

  if (
    !isRecord(g4Tail) ||
    !isRecord(ciTruth) ||
    !isRecord(g4Tail.g4_trace) ||
    !isRecord(ciTruth.ci_trace) ||
    !isDeepStrictEqual(g4Tail.g4_trace, ciTruth.ci_trace.g4_trace)
  ) {
    errors.push("tail and confidence-interval stages are not bound to one G4 trace");
  }

  if (
    isRecord(g4Tail.tail_trace) &&
    g4Tail.tail_trace.normalization_constant.candidate_table_content_hash !==
      TAIL_TABLE_CONTENT_HASH
  ) {
    errors.push("tail table content hash is not selected");
  }
  if (
    isRecord(ciTruth.ci_trace) &&
    ciTruth.ci_trace.selected_table.ordered_cell_content_hash !== FIXED_95_TABLE_CONTENT_HASH
  ) {
    errors.push("fixed-95 table content hash is not selected");
  }

  if (isRecord(copied.link) && !isDeepStrictEqual(copied.link, expectedLink(g4Tail, ciTruth))) {
    errors.push("full-trace cross-stage link is invalid");
  } else if (!isRecord(copied.link)) {
    errors.push("full-trace link must be an object");
  }

  const resource = expectedResource(g4Tail, ciTruth);
  const resourceEvaluation = evaluatePairedTCandidateResourceEnvelope(resource);
  if (!resourceEvaluation.ok || !isDeepStrictEqual(copied.resource, resource)) {
    errors.push("full-trace resource envelope is invalid");
  }

  if (typeof copied.sha256 !== "string") {
    errors.push("full-trace digest is missing");
  } else {
    const digestInput = {
      format: copied.format,
      g4_tail_composition: copied.g4_tail_composition,
      ci_endpoint_truth: copied.ci_endpoint_truth,
      link: copied.link,
      resource: copied.resource,
    };
    if (copied.sha256 !== canonicalSha256(digestInput)) {
      errors.push("full-trace digest is invalid");
    }
  }
  return { ok: errors.length === 0, errors };
}

export function verifyPairedTRuntimeNumericalContractFullTraceCandidate(candidate: unknown): {
  ok: boolean;
  errors: string[];
} {
  try {
    return verifyPairedTRuntimeNumericalContractFullTraceCandidateInternal(candidate);
  } catch {
    return { ok: false, errors: ["full-trace envelope verification failed closed"] };
  }
}

function refusal(
  classification: Extract<
    PairedTRuntimeNumericalContractFullTraceCandidateResult,
    { ok: false }
  >["classification"],
  detail: { upstreamClassification?: string; verificationErrors?: string[] } = {},
): PairedTRuntimeNumericalContractFullTraceCandidateResult {
  return {
    ok: false,
    status: "non_authoritative_group_2_full_trace_evaluation",
    classification,
    ...detail,
    candidateNumericalPredicateSatisfied: false,
    group2CandidateSelectionMade: true,
    group2Complete: false,
    numericalContractFrozen: false,
    supportedExecutionPredicateSatisfied: false,
    supportedPlatformClaimed: false,
    supportedDomainClaimed: false,
    runtimeSupportClaimed: false,
  };
}

/** Evaluate the selected Group 2 candidate predicate without selecting support. */
export function evaluatePairedTRuntimeNumericalContractFullTraceCandidate(
  input: unknown,
): PairedTRuntimeNumericalContractFullTraceCandidateResult {
  const g4Tail = evaluatePairedTG4TailTraceCompositionCandidate(input);
  if (!g4Tail.ok) {
    return refusal("g4_tail_stage_refusal", { upstreamClassification: g4Tail.classification });
  }
  const ciTruth = evaluatePairedTCIEndpointTruthCandidate(input);
  if (!ciTruth.ok) {
    return refusal("ci_truth_stage_refusal", { upstreamClassification: ciTruth.classification });
  }
  if (!isDeepStrictEqual(g4Tail.composition.g4_trace, ciTruth.envelope.ci_trace.g4_trace)) {
    return refusal("same_trace_binding_mismatch");
  }

  const resource = expectedResource(g4Tail.composition, ciTruth.envelope);
  if (!evaluatePairedTCandidateResourceEnvelope(resource).ok) {
    return refusal("resource_envelope_refusal");
  }
  const link = expectedLink(g4Tail.composition, ciTruth.envelope);
  const digestInput = {
    format: FULL_TRACE_FORMAT,
    g4_tail_composition: g4Tail.composition,
    ci_endpoint_truth: ciTruth.envelope,
    link,
    resource,
  } as const;
  const envelope: PairedTRuntimeNumericalContractFullTraceEnvelopeCandidate = {
    ...digestInput,
    sha256: canonicalSha256(envelopeDigestInput(digestInput)),
  };
  const verification = verifyPairedTRuntimeNumericalContractFullTraceCandidate(envelope);
  if (!verification.ok) {
    return refusal("full_trace_verification_failed", { verificationErrors: verification.errors });
  }

  deepFreeze(envelope);
  const result = deepFreeze({
    nPairs: g4Tail.result.nPairs,
    degreesOfFreedom: g4Tail.result.degreesOfFreedom,
    meanDifference: g4Tail.result.meanDifference,
    sampleVarianceDifference: g4Tail.result.sampleVarianceDifference,
    standardError: g4Tail.result.standardError,
    testStatistic: g4Tail.result.testStatistic,
    pValue: g4Tail.result.pValue,
    pValueBinary64Hex: g4Tail.result.pValueBinary64Hex,
    criticalValue: ciTruth.ciResult.criticalValue,
    margin: ciTruth.ciResult.margin,
    lowerEndpoint: ciTruth.ciResult.lowerEndpoint,
    upperEndpoint: ciTruth.ciResult.upperEndpoint,
  });
  return {
    ok: true,
    status: "non_authoritative_group_2_full_trace_evaluation",
    result,
    envelope,
    verification: {
      fullTraceVerified: true,
      sameG4TraceVerified: true,
      g4TailCompositionVerified: true,
      tailNumericalContractVerified: true,
      ciEndpointTruthVerified: true,
      resourceEnvelopeVerified: true,
    },
    candidateNumericalPredicateSatisfied: true,
    group2CandidateSelectionMade: true,
    group2Complete: false,
    numericalContractFrozen: false,
    supportedExecutionPredicateSatisfied: false,
    supportedPlatformClaimed: false,
    supportedDomainClaimed: false,
    runtimeSupportClaimed: false,
  };
}

/** Fail-closed validation for the exact Group 2 candidate checkpoint. */
export function validatePairedTRuntimeNumericalContractFullTraceCheckpoint(
  candidate: unknown,
): string[] {
  try {
    const canonical = strictDataCopy(candidate, new Set<object>(), true);
    return sha256(canonical) === EXPECTED_CHECKPOINT_CANONICAL_SHA256
      ? []
      : [
          "runtime numerical contract full-trace checkpoint differs from the selected Group 2 candidate",
        ];
  } catch {
    return [
      "runtime numerical contract full-trace checkpoint differs from the selected Group 2 candidate",
    ];
  }
}
