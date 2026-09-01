/**
 * Non-authoritative confidence-interval endpoint mathematical-truth candidate.
 *
 * This module composes the independently reviewed G4 exact-rational truth envelope
 * with the independently reviewed fixed-95 critical-value rounding cell and the
 * reviewed M3-C actual-execution trace. It does not select support, platform,
 * tolerances, final reason codes, Public Check, bundle, or runtime behavior.
 */

import { createHash } from "node:crypto";
import { isDeepStrictEqual } from "node:util";
import { binary64ToExactDyadic } from "../../../reference/spikes/paired-t.js";
import {
  evaluatePairedTCIExecutionTraceCandidate,
  verifyPairedTCIExecutionTraceCandidate,
  type PairedTCIExecutionTraceCandidate,
} from "./paired-t-ci-execution-trace-candidate.js";
import {
  evaluatePairedTG4TruthErrorCandidate,
  verifyPairedTG4TruthErrorCandidate,
  type ExactRationalCandidate,
  type PairedTG4TruthErrorEnvelopeCandidate,
  type RationalIntervalCandidate,
} from "./paired-t-g4-truth-error-candidate.js";

const FORMAT = "paired-t-ci-endpoint-mathematical-truth-error-v1";
const SELECTED_TABLE_HASH =
  "sha256:24ccc86d7a49b9e1ef1e3fc9b038a5b8d338b8b5ca4a02492d8900d7e7dea3c0";
const HEX64 = /^[0-9a-f]{16}$/;
const SHA256 = /^sha256:[0-9a-f]{64}$/;
const INTEGER = /^-?(0|[1-9][0-9]*)$/;
const MAXIMUM_CLOSED_JSON_ARRAY_LENGTH = 32768;
const MAX_FINITE_POSITIVE_BITS = 0x7fefffffffffffffn;

interface Rational {
  numerator: bigint;
  denominator: bigint;
}

interface RationalInterval {
  lower: Rational;
  upper: Rational;
}

export interface PairedTCIEndpointTruthQuantityCandidate {
  graph_binary64_hex: string;
  truth_interval: RationalIntervalCandidate;
  absolute_error_upper_bound: ExactRationalCandidate;
}

export interface PairedTCIEndpointTruthProofCandidate {
  model: "same_trace_exact_rational_ci_endpoint_truth_with_reviewed_critical_rounding_cell";
  ci_trace_sha256: string;
  g4_truth_envelope_sha256: string;
  g4_trace_sha256: string;
  selected_table_content_hash: typeof SELECTED_TABLE_HASH;
  input_truth_source: "reviewed_g4_truth_envelope_bound_to_same_nested_g4_trace";
  critical_value_truth_source: "reviewed_correctly_rounded_binary64_cell_exact_midpoint_interval";
  error_metric: "exact_absolute_rational_upper_bound";
  mean_difference_truth_interval: RationalIntervalCandidate;
  standard_error_truth_interval: RationalIntervalCandidate;
  critical_value: {
    degrees_of_freedom: number;
    graph_binary64_hex: string;
    predecessor_binary64_hex: string;
    successor_binary64_hex: string;
    truth_interval: RationalIntervalCandidate;
    absolute_quantization_upper_bound: ExactRationalCandidate;
  };
  margin: PairedTCIEndpointTruthQuantityCandidate;
  lower_endpoint: PairedTCIEndpointTruthQuantityCandidate;
  upper_endpoint: PairedTCIEndpointTruthQuantityCandidate;
  finite_corpus_maximum_is_a_bound: false;
  global_endpoint_error_constant_selected: false;
}

export interface PairedTCIEndpointTruthEnvelopeCandidate {
  format: typeof FORMAT;
  ci_trace: PairedTCIExecutionTraceCandidate;
  g4_truth_envelope: PairedTG4TruthErrorEnvelopeCandidate;
  proof: PairedTCIEndpointTruthProofCandidate;
  sha256: string;
}

export interface PairedTCIEndpointTruthCheckpointCandidate {
  status: string;
  issuance: string;
  review_issue: string;
  candidate_key: string;
  decision_state: string;
  runtime_support_enabled: boolean;
  supported_domain_claimed: boolean;
  scope: Record<string, unknown>;
  proof_model: Record<string, unknown>;
  selected_table_binding: Record<string, unknown>;
  closure_state: Record<string, unknown>;
  prohibited_claims: string[];
}

type FailureClassification =
  | "ci_stage_refusal"
  | "g4_truth_stage_refusal"
  | "trace_binding_mismatch"
  | "endpoint_truth_proof_failed"
  | "endpoint_truth_verification_failed";

export type PairedTCIEndpointTruthCandidateResult =
  | {
      ok: true;
      status: "non_authoritative_ci_endpoint_truth_evaluation";
      ciResult: {
        meanDifference: number;
        standardError: number;
        degreesOfFreedom: number;
        criticalValue: number;
        margin: number;
        lowerEndpoint: number;
        upperEndpoint: number;
      };
      envelope: PairedTCIEndpointTruthEnvelopeCandidate;
      proof: PairedTCIEndpointTruthProofCandidate;
      candidateArithmeticExecutionVerified: true;
      confidenceIntervalEndpointTruthImplemented: true;
      confidenceIntervalEndpointTruthIndependentlyReviewed: false;
      confidenceIntervalEndpointTruthComplete: false;
      supportedExecutionPredicateSatisfied: false;
      supportedPlatformClaimed: false;
      supportedDomainClaimed: false;
      runtimeSupportClaimed: false;
    }
  | {
      ok: false;
      status: "non_authoritative_ci_endpoint_truth_evaluation";
      classification: FailureClassification;
      ciClassification?: string;
      g4TruthClassification?: string;
      proofErrors?: string[];
      candidateArithmeticExecutionVerified: false;
      confidenceIntervalEndpointTruthImplemented: false;
      confidenceIntervalEndpointTruthIndependentlyReviewed: false;
      confidenceIntervalEndpointTruthComplete: false;
      supportedExecutionPredicateSatisfied: false;
      supportedPlatformClaimed: false;
      supportedDomainClaimed: false;
      runtimeSupportClaimed: false;
    };

const EXPECTED_CHECKPOINT = {
  status: "non_authoritative_candidate",
  issuance: "unissued",
  review_issue: "https://github.com/licklider-ai/nomue-protocol/issues/25",
  candidate_key: "paired-t-d5-ci-endpoint-mathematical-truth-error-candidate-1",
  decision_state: "endpoint_truth_error_candidate_pending_independent_review_and_m3_integration",
  runtime_support_enabled: false,
  supported_domain_claimed: false,
  scope: {
    input: "reviewed_m3c_ci_actual_execution_trace_from_explicit_paired_binary64_observations",
    g4_truth_source: "independently_reviewed_g4_exact_rational_truth_envelope",
    critical_value_truth_source: "independently_reviewed_correctly_rounded_fixed_95_cell",
    output: "exact_rational_truth_intervals_and_absolute_error_bounds_for_ci_margin_and_endpoints",
    support_selection_included: false,
  },
  proof_model: {
    mean_truth: "reuse_reviewed_g4_exact_rational_truth_interval",
    standard_error_truth: "reuse_reviewed_g4_2048_bit_exact_rational_sqrt_enclosure",
    critical_value_truth: "exact_midpoint_rounding_cell_of_reviewed_correctly_rounded_binary64_cell",
    margin_truth: "positive_interval_product_of_critical_value_and_standard_error",
    lower_endpoint_truth: "mean_interval_minus_margin_interval",
    upper_endpoint_truth: "mean_interval_plus_margin_interval",
    error_metric:
      "exact_absolute_rational_maximum_distance_from_graph_binary64_value_to_truth_interval_endpoints",
    same_trace_binding_required: true,
    finite_corpus_maximum_is_a_bound: false,
  },
  selected_table_binding: {
    artifact:
      "governance/drafts/release-2-candidate/numerical/fixed-95-critical-value-table-selected-candidate.json",
    ordered_cell_content_hash: SELECTED_TABLE_HASH,
    supported_degrees_of_freedom_maximum: null,
  },
  closure_state: {
    implementation: "implemented_pending_independent_review",
    m3c_actual_execution_trace: "independently_reviewed_separate_candidate",
    endpoint_truth_error_ledger: "pending_independent_review",
    m3_closed: false,
    supported_platform_matrix: "pending",
    supported_execution_predicate: "unselected",
    supported_domain: false,
    runtime_support: false,
    final_reason_codes_frozen: false,
  },
  prohibited_claims: [
    "global_confidence_interval_error_constant",
    "supported_df_max",
    "supported_platform_or_execution_predicate",
    "supported_runtime_paired_t",
    "final_reason_codes_frozen",
    "authoritative_public_check_or_bundle",
    "r2_d5_complete",
    "release_2_complete",
  ],
} as const;

type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };

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
  if (denominator === 0n) throw new RangeError("rational denominator must be nonzero");
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

function addRational(first: Rational, second: Rational): Rational {
  return rational(
    first.numerator * second.denominator + second.numerator * first.denominator,
    first.denominator * second.denominator,
  );
}

function subtractRational(first: Rational, second: Rational): Rational {
  return rational(
    first.numerator * second.denominator - second.numerator * first.denominator,
    first.denominator * second.denominator,
  );
}

function multiplyRational(first: Rational, second: Rational): Rational {
  return rational(first.numerator * second.numerator, first.denominator * second.denominator);
}

function divideRational(first: Rational, second: Rational): Rational {
  if (second.numerator === 0n) throw new RangeError("cannot divide by zero rational");
  return rational(first.numerator * second.denominator, first.denominator * second.numerator);
}

function compareRational(first: Rational, second: Rational): number {
  const difference = first.numerator * second.denominator - second.numerator * first.denominator;
  return difference < 0n ? -1 : difference > 0n ? 1 : 0;
}

function absoluteRational(value: Rational): Rational {
  return value.numerator < 0n ? rational(-value.numerator, value.denominator) : value;
}

function maximumRational(first: Rational, second: Rational): Rational {
  return compareRational(first, second) >= 0 ? first : second;
}

function serializeRational(value: Rational): ExactRationalCandidate {
  return { numerator: value.numerator.toString(), denominator: value.denominator.toString() };
}

function serializeInterval(value: RationalInterval): RationalIntervalCandidate {
  return { lower: serializeRational(value.lower), upper: serializeRational(value.upper) };
}

function parseRational(value: ExactRationalCandidate): Rational {
  if (!INTEGER.test(value.numerator) || !INTEGER.test(value.denominator)) {
    throw new TypeError("serialized rational is malformed");
  }
  const parsed = rational(BigInt(value.numerator), BigInt(value.denominator));
  if (
    parsed.numerator.toString() !== value.numerator ||
    parsed.denominator.toString() !== value.denominator
  ) {
    throw new TypeError("serialized rational is not normalized");
  }
  return parsed;
}

function parseInterval(value: RationalIntervalCandidate): RationalInterval {
  const interval = { lower: parseRational(value.lower), upper: parseRational(value.upper) };
  if (compareRational(interval.lower, interval.upper) > 0) {
    throw new RangeError("truth interval is reversed");
  }
  return interval;
}

function numberFromHex(value: string): number {
  if (!HEX64.test(value)) throw new TypeError("binary64 hex is malformed");
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  view.setBigUint64(0, BigInt(`0x${value}`), false);
  const result = view.getFloat64(0, false);
  if (!Number.isFinite(result)) throw new RangeError("binary64 hex must be finite");
  return result;
}

function rationalFromHex(value: string): Rational {
  const exact = binary64ToExactDyadic(numberFromHex(value));
  return rational(exact.numerator, 1n << BigInt(exact.denominatorExponent));
}

function hexFromBits(bits: bigint): string {
  return bits.toString(16).padStart(16, "0");
}

function midpoint(first: Rational, second: Rational): Rational {
  return divideRational(addRational(first, second), rational(2n));
}

function criticalValueTruth(
  criticalValueHex: string,
): {
  predecessorHex: string;
  successorHex: string;
  interval: RationalInterval;
  quantizationBound: Rational;
} {
  if (!HEX64.test(criticalValueHex)) throw new TypeError("critical-value bits are malformed");
  const bits = BigInt(`0x${criticalValueHex}`);
  if (bits === 0n || bits >= MAX_FINITE_POSITIVE_BITS || (bits >> 63n) !== 0n) {
    throw new RangeError("critical value must be positive finite with finite neighbors");
  }
  const predecessorHex = hexFromBits(bits - 1n);
  const successorHex = hexFromBits(bits + 1n);
  const graph = rationalFromHex(criticalValueHex);
  const lower = midpoint(rationalFromHex(predecessorHex), graph);
  const upper = midpoint(graph, rationalFromHex(successorHex));
  const quantizationBound = maximumRational(
    absoluteRational(subtractRational(graph, lower)),
    absoluteRational(subtractRational(graph, upper)),
  );
  return { predecessorHex, successorHex, interval: { lower, upper }, quantizationBound };
}

function quantityProof(
  graphBinary64Hex: string,
  truthInterval: RationalInterval,
): PairedTCIEndpointTruthQuantityCandidate {
  const graph = rationalFromHex(graphBinary64Hex);
  const toLower = absoluteRational(subtractRational(graph, truthInterval.lower));
  const toUpper = absoluteRational(subtractRational(graph, truthInterval.upper));
  return {
    graph_binary64_hex: graphBinary64Hex,
    truth_interval: serializeInterval(truthInterval),
    absolute_error_upper_bound: serializeRational(maximumRational(toLower, toUpper)),
  };
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

function canonicalizeJson(value: unknown, ancestors = new Set<object>()): JsonValue {
  if (value === null || typeof value === "string" || typeof value === "boolean") return value;
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new TypeError("endpoint truth envelope contains non-finite data");
    return value;
  }
  if (
    value === undefined ||
    typeof value === "bigint" ||
    typeof value === "function" ||
    typeof value === "symbol"
  ) {
    throw new TypeError("endpoint truth envelope contains non-JSON data");
  }
  if (typeof value !== "object") throw new TypeError("endpoint truth envelope is not JSON data");
  if (ancestors.has(value)) throw new TypeError("endpoint truth envelope contains a cycle");
  const nextAncestors = new Set(ancestors).add(value);

  if (Array.isArray(value)) {
    const lengthDescriptor = Reflect.getOwnPropertyDescriptor(value, "length");
    if (lengthDescriptor === undefined || !("value" in lengthDescriptor)) {
      throw new TypeError("endpoint truth envelope contains a malformed array");
    }
    const length = lengthDescriptor.value as unknown;
    if (
      !Number.isSafeInteger(length) ||
      (length as number) < 0 ||
      (length as number) > MAXIMUM_CLOSED_JSON_ARRAY_LENGTH
    ) {
      throw new TypeError("endpoint truth envelope contains an invalid array length");
    }
    const expectedKeys = Array.from({ length: length as number }, (_, index) => String(index));
    const ownKeys = Reflect.ownKeys(value);
    if (
      ownKeys.length !== expectedKeys.length + 1 ||
      ownKeys.some(
        (key) => key !== "length" && (typeof key !== "string" || !expectedKeys.includes(key)),
      )
    ) {
      throw new TypeError("endpoint truth envelope contains a sparse or extended array");
    }
    return expectedKeys.map((key) => {
      const descriptor = Reflect.getOwnPropertyDescriptor(value, key);
      if (descriptor === undefined || !("value" in descriptor) || descriptor.enumerable !== true) {
        throw new TypeError("endpoint truth envelope contains an accessor array entry");
      }
      return canonicalizeJson(descriptor.value, nextAncestors);
    });
  }

  const prototype = Reflect.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) {
    throw new TypeError("endpoint truth envelope contains a non-JSON object");
  }
  const keys = Reflect.ownKeys(value);
  if (keys.some((key) => typeof key !== "string")) {
    throw new TypeError("endpoint truth envelope contains a symbol key");
  }
  const entries = (keys as string[])
    .sort((first, second) => (first < second ? -1 : first > second ? 1 : 0))
    .map((key): [string, JsonValue] => {
      const descriptor = Reflect.getOwnPropertyDescriptor(value, key);
      if (descriptor === undefined || !("value" in descriptor) || descriptor.enumerable !== true) {
        throw new TypeError("endpoint truth envelope contains an accessor or hidden property");
      }
      return [key, canonicalizeJson(descriptor.value, nextAncestors)];
    });
  return Object.fromEntries(entries) as { [key: string]: JsonValue };
}

function buildProof(
  ciTrace: PairedTCIExecutionTraceCandidate,
  g4TruthEnvelope: PairedTG4TruthErrorEnvelopeCandidate,
): PairedTCIEndpointTruthProofCandidate {
  const ciVerification = verifyPairedTCIExecutionTraceCandidate(ciTrace);
  if (!ciVerification.ok) {
    throw new Error(`CI trace verification failed: ${ciVerification.errors.join("; ")}`);
  }
  const g4Verification = verifyPairedTG4TruthErrorCandidate(g4TruthEnvelope);
  if (!g4Verification.ok) {
    throw new Error(`G4 truth verification failed: ${g4Verification.errors.join("; ")}`);
  }
  if (!isDeepStrictEqual(ciTrace.g4_trace, g4TruthEnvelope.g4_trace)) {
    throw new Error("CI trace and G4 truth envelope are not bound to the same nested G4 trace");
  }
  if (ciTrace.selected_table.ordered_cell_content_hash !== SELECTED_TABLE_HASH) {
    throw new Error("CI trace does not bind the reviewed selected critical-value table");
  }
  if (ciTrace.selected_table.degrees_of_freedom !== ciTrace.g4_trace.outcome.degrees_of_freedom) {
    throw new Error("CI selected-table df differs from the nested G4 df");
  }

  const mean = parseInterval(g4TruthEnvelope.proof.mean_difference.truth_interval);
  const standardError = parseInterval(g4TruthEnvelope.proof.standard_error.truth_interval);
  if (compareRational(standardError.lower, rational(0n)) < 0) {
    throw new Error("G4 standard-error truth interval extends below zero");
  }
  const critical = criticalValueTruth(ciTrace.selected_table.critical_value_binary64_hex);
  if (compareRational(critical.interval.lower, rational(0n)) <= 0) {
    throw new Error("critical-value truth interval is not strictly positive");
  }

  const margin: RationalInterval = {
    lower: multiplyRational(critical.interval.lower, standardError.lower),
    upper: multiplyRational(critical.interval.upper, standardError.upper),
  };
  const lowerEndpoint: RationalInterval = {
    lower: subtractRational(mean.lower, margin.upper),
    upper: subtractRational(mean.upper, margin.lower),
  };
  const upperEndpoint: RationalInterval = {
    lower: addRational(mean.lower, margin.lower),
    upper: addRational(mean.upper, margin.upper),
  };

  return {
    model: "same_trace_exact_rational_ci_endpoint_truth_with_reviewed_critical_rounding_cell",
    ci_trace_sha256: ciTrace.sha256,
    g4_truth_envelope_sha256: g4TruthEnvelope.sha256,
    g4_trace_sha256: ciTrace.g4_trace.sha256,
    selected_table_content_hash: SELECTED_TABLE_HASH,
    input_truth_source: "reviewed_g4_truth_envelope_bound_to_same_nested_g4_trace",
    critical_value_truth_source:
      "reviewed_correctly_rounded_binary64_cell_exact_midpoint_interval",
    error_metric: "exact_absolute_rational_upper_bound",
    mean_difference_truth_interval: serializeInterval(mean),
    standard_error_truth_interval: serializeInterval(standardError),
    critical_value: {
      degrees_of_freedom: ciTrace.selected_table.degrees_of_freedom,
      graph_binary64_hex: ciTrace.selected_table.critical_value_binary64_hex,
      predecessor_binary64_hex: critical.predecessorHex,
      successor_binary64_hex: critical.successorHex,
      truth_interval: serializeInterval(critical.interval),
      absolute_quantization_upper_bound: serializeRational(critical.quantizationBound),
    },
    margin: quantityProof(ciTrace.outcome.margin_binary64_hex, margin),
    lower_endpoint: quantityProof(ciTrace.outcome.lower_endpoint_binary64_hex, lowerEndpoint),
    upper_endpoint: quantityProof(ciTrace.outcome.upper_endpoint_binary64_hex, upperEndpoint),
    finite_corpus_maximum_is_a_bound: false,
    global_endpoint_error_constant_selected: false,
  };
}

function envelopePayload(envelope: PairedTCIEndpointTruthEnvelopeCandidate): unknown {
  return {
    format: envelope.format,
    ci_trace: envelope.ci_trace,
    g4_truth_envelope: envelope.g4_truth_envelope,
    proof: envelope.proof,
  };
}

function envelopeSha256(envelope: PairedTCIEndpointTruthEnvelopeCandidate): string {
  return `sha256:${createHash("sha256")
    .update(JSON.stringify(envelopePayload(envelope)), "utf8")
    .digest("hex")}`;
}

function buildEnvelope(
  ciTrace: PairedTCIExecutionTraceCandidate,
  g4TruthEnvelope: PairedTG4TruthErrorEnvelopeCandidate,
): PairedTCIEndpointTruthEnvelopeCandidate {
  const envelope: PairedTCIEndpointTruthEnvelopeCandidate = {
    format: FORMAT,
    ci_trace: ciTrace,
    g4_truth_envelope: g4TruthEnvelope,
    proof: buildProof(ciTrace, g4TruthEnvelope),
    sha256: "",
  };
  envelope.sha256 = envelopeSha256(envelope);
  return envelope;
}

function deepFreeze<T>(value: T): T {
  if (typeof value !== "object" || value === null || Object.isFrozen(value)) return value;
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Reflect.getOwnPropertyDescriptor(value, key);
    if (descriptor !== undefined && "value" in descriptor) deepFreeze(descriptor.value);
  }
  return Object.freeze(value);
}

export function verifyPairedTCIEndpointTruthCandidate(candidate: unknown): {
  ok: boolean;
  errors: string[];
} {
  let canonical: JsonValue;
  try {
    canonical = canonicalizeJson(candidate);
  } catch {
    return { ok: false, errors: ["CI endpoint truth envelope is not closed JSON data"] };
  }
  const top = ownDataRecord(canonical, [
    "format",
    "ci_trace",
    "g4_truth_envelope",
    "proof",
    "sha256",
  ]);
  if (
    top === undefined ||
    top["format"] !== FORMAT ||
    typeof top["sha256"] !== "string" ||
    !SHA256.test(top["sha256"])
  ) {
    return { ok: false, errors: ["CI endpoint truth envelope has an invalid closed structure"] };
  }

  const ciVerification = verifyPairedTCIExecutionTraceCandidate(top["ci_trace"]);
  if (!ciVerification.ok) {
    return { ok: false, errors: ["nested CI trace verification failed", ...ciVerification.errors] };
  }
  const g4Verification = verifyPairedTG4TruthErrorCandidate(top["g4_truth_envelope"]);
  if (!g4Verification.ok) {
    return {
      ok: false,
      errors: ["nested G4 truth envelope verification failed", ...g4Verification.errors],
    };
  }

  try {
    const expected = buildEnvelope(
      top["ci_trace"] as PairedTCIExecutionTraceCandidate,
      top["g4_truth_envelope"] as PairedTG4TruthErrorEnvelopeCandidate,
    );
    return isDeepStrictEqual(canonical, expected)
      ? { ok: true, errors: [] }
      : {
          ok: false,
          errors: ["CI endpoint truth envelope differs from the independently reconstructed proof"],
        };
  } catch {
    return { ok: false, errors: ["CI endpoint truth proof reconstruction failed"] };
  }
}

function refusal(
  classification: FailureClassification,
  detail: { ciClassification?: string; g4TruthClassification?: string; proofErrors?: string[] } = {},
): PairedTCIEndpointTruthCandidateResult {
  return {
    ok: false,
    status: "non_authoritative_ci_endpoint_truth_evaluation",
    classification,
    ...detail,
    candidateArithmeticExecutionVerified: false,
    confidenceIntervalEndpointTruthImplemented: false,
    confidenceIntervalEndpointTruthIndependentlyReviewed: false,
    confidenceIntervalEndpointTruthComplete: false,
    supportedExecutionPredicateSatisfied: false,
    supportedPlatformClaimed: false,
    supportedDomainClaimed: false,
    runtimeSupportClaimed: false,
  };
}

/** Evaluate exact-rational CI endpoint truth without selecting Protocol support. */
export function evaluatePairedTCIEndpointTruthCandidate(
  candidate: unknown,
): PairedTCIEndpointTruthCandidateResult {
  const ci = evaluatePairedTCIExecutionTraceCandidate(candidate);
  if (!ci.ok) return refusal("ci_stage_refusal", { ciClassification: ci.classification });

  const g4Truth = evaluatePairedTG4TruthErrorCandidate(candidate);
  if (!g4Truth.ok) {
    return refusal("g4_truth_stage_refusal", { g4TruthClassification: g4Truth.classification });
  }
  if (!isDeepStrictEqual(ci.trace.g4_trace, g4Truth.envelope.g4_trace)) {
    return refusal("trace_binding_mismatch");
  }

  let envelope: PairedTCIEndpointTruthEnvelopeCandidate;
  try {
    envelope = buildEnvelope(ci.trace, g4Truth.envelope);
  } catch (error) {
    return refusal("endpoint_truth_proof_failed", {
      proofErrors: [error instanceof Error ? error.message : "endpoint truth proof construction failed"],
    });
  }

  const verification = verifyPairedTCIEndpointTruthCandidate(envelope);
  if (!verification.ok) {
    return refusal("endpoint_truth_verification_failed", { proofErrors: verification.errors });
  }

  deepFreeze(envelope);
  const ciResult = deepFreeze({ ...ci.result });
  return {
    ok: true,
    status: "non_authoritative_ci_endpoint_truth_evaluation",
    ciResult,
    envelope,
    proof: envelope.proof,
    candidateArithmeticExecutionVerified: true,
    confidenceIntervalEndpointTruthImplemented: true,
    confidenceIntervalEndpointTruthIndependentlyReviewed: false,
    confidenceIntervalEndpointTruthComplete: false,
    supportedExecutionPredicateSatisfied: false,
    supportedPlatformClaimed: false,
    supportedDomainClaimed: false,
    runtimeSupportClaimed: false,
  };
}

/** Fail-closed exact checkpoint validator for the unissued M3-D candidate. */
export function validatePairedTCIEndpointTruthCheckpoint(candidate: unknown): string[] {
  try {
    const canonical = canonicalizeJson(candidate);
    return isDeepStrictEqual(canonical, EXPECTED_CHECKPOINT)
      ? []
      : ["CI endpoint truth checkpoint differs from the closed non-runtime candidate"];
  } catch {
    return ["CI endpoint truth checkpoint differs from the closed non-runtime candidate"];
  }
}
