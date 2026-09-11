/** Non-authoritative fixed-95 confidence-interval endpoint truth composition candidate. */

import { createHash } from "node:crypto";
import { isDeepStrictEqual } from "node:util";
import { binary64ToExactDyadic } from "../../../reference/spikes/paired-t.js";
import {
  evaluatePairedTCIExecutionTraceCandidate,
  PAIRED_T_SELECTED_FIXED_95_TABLE_CONTENT_HASH,
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

const FORMAT = "paired-t-ci-endpoint-mathematical-truth-v1";
const MAXIMUM_CLOSED_JSON_ARRAY_LENGTH = 65536;
const HEX64 = /^[0-9a-f]{16}$/;
const INTEGER = /^-?(0|[1-9][0-9]*)$/;
const MAXIMUM_FINITE_BITS = 0x7fefffffffffffffn;

interface Rational {
  numerator: bigint;
  denominator: bigint;
}

interface RationalInterval {
  lower: Rational;
  upper: Rational;
}

export interface PairedTCIEndpointTruthQuantityCandidate {
  source_sequence: number;
  graph_binary64_hex: string;
  truth_interval: RationalIntervalCandidate;
  absolute_error_upper_bound: ExactRationalCandidate;
}

export interface PairedTCICriticalValueTruthCandidate {
  selected_table_content_hash: typeof PAIRED_T_SELECTED_FIXED_95_TABLE_CONTENT_HASH;
  degrees_of_freedom: number;
  graph_binary64_hex: string;
  truth_rounding_cell: RationalIntervalCandidate;
  absolute_quantization_error_upper_bound: ExactRationalCandidate;
  boundary_semantics: "inclusive_conservative_midpoints_between_adjacent_binary64_values";
}

export interface PairedTCIEndpointTruthProofCandidate {
  model: "trace_bound_exact_rational_fixed_95_ci_endpoint_truth_composition";
  ci_trace_sha256: string;
  g4_truth_error_envelope_sha256: string;
  g4_trace_sha256: string;
  confidence_level: "19/20";
  mean_truth_source: "reviewed_g4_exact_rational_truth_interval";
  standard_error_truth_source: "reviewed_g4_2048_bit_dyadic_sqrt_truth_interval";
  critical_value_truth_source: "reviewed_correct_rounding_cell_for_selected_fixed_95_table_cell";
  composition: {
    margin: "positive_critical_interval_multiply_positive_standard_error_interval";
    lower_endpoint: "mean_interval_subtract_margin_interval";
    upper_endpoint: "mean_interval_add_margin_interval";
  };
  error_metric: "exact_absolute_rational_upper_bound";
  critical_value: PairedTCICriticalValueTruthCandidate;
  margin: PairedTCIEndpointTruthQuantityCandidate;
  lower_endpoint: PairedTCIEndpointTruthQuantityCandidate;
  upper_endpoint: PairedTCIEndpointTruthQuantityCandidate;
  finite_corpus_maximum_is_a_bound: false;
  endpoint_truth_bound_selected: false;
}

export interface PairedTCIEndpointTruthEnvelopeCandidate {
  format: typeof FORMAT;
  ci_trace: PairedTCIExecutionTraceCandidate;
  g4_truth_error_envelope: PairedTG4TruthErrorEnvelopeCandidate;
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
  closure_state: Record<string, unknown>;
  prohibited_claims: string[];
}

type FailureClassification =
  | "ci_execution_stage_refusal"
  | "g4_truth_stage_refusal"
  | "truth_trace_mismatch"
  | "endpoint_truth_proof_failed"
  | "endpoint_truth_verification_failed";

export type PairedTCIEndpointTruthCandidateResult =
  | {
      ok: true;
      status: "non_authoritative_ci_endpoint_truth_evaluation";
      envelope: PairedTCIEndpointTruthEnvelopeCandidate;
      proof: PairedTCIEndpointTruthProofCandidate;
      candidateArithmeticExecutionVerified: true;
      g4MathematicalTruthIndependentlyReviewed: true;
      confidenceIntervalEndpointTruthImplemented: true;
      confidenceIntervalEndpointTruthIndependentlyReviewed: false;
      confidenceIntervalEndpointTruthComplete: false;
      supportedExecutionPredicateSatisfied: false;
      supportedDomainClaimed: false;
      runtimeSupportClaimed: false;
    }
  | {
      ok: false;
      status: "non_authoritative_ci_endpoint_truth_evaluation";
      classification: FailureClassification;
      upstreamClassification?: string;
      proofErrors?: string[];
      candidateArithmeticExecutionVerified: false;
      g4MathematicalTruthIndependentlyReviewed: false;
      confidenceIntervalEndpointTruthImplemented: false;
      confidenceIntervalEndpointTruthIndependentlyReviewed: false;
      confidenceIntervalEndpointTruthComplete: false;
      supportedExecutionPredicateSatisfied: false;
      supportedDomainClaimed: false;
      runtimeSupportClaimed: false;
    };

const EXPECTED_CHECKPOINT = {
  status: "non_authoritative_candidate",
  issuance: "unissued",
  review_issue: "https://github.com/licklider-ai/nomue-protocol/issues/25",
  candidate_key: "paired-t-d5-ci-endpoint-mathematical-truth-candidate-1",
  decision_state: "implemented_candidate_pending_independent_endpoint_truth_review",
  runtime_support_enabled: false,
  supported_domain_claimed: false,
  scope: {
    input: "explicit_paired_binary64_observations",
    execution_source: "independently_reviewed_ci_actual_execution_trace_candidate",
    g4_truth_source: "independently_reviewed_g4_mathematical_truth_error_candidate",
    critical_value_truth_source:
      "reviewed_correct_rounding_cell_for_exact_selected_fixed_95_table_cell",
    output:
      "exact_rational_truth_intervals_and_absolute_error_bounds_for_margin_and_both_confidence_interval_endpoints",
    existing_numerical_implementations_changed: false,
  },
  proof_model: {
    mean_difference: "reviewed_g4_exact_rational_truth_interval",
    standard_error: "reviewed_g4_2048_bit_dyadic_sqrt_truth_interval",
    critical_value:
      "exact_midpoints_to_adjacent_binary64_cells_around_reviewed_correctly_rounded_selected_value",
    margin: "positive_interval_product_of_critical_value_and_standard_error",
    lower_endpoint: "mean_truth_interval_minus_margin_truth_interval",
    upper_endpoint: "mean_truth_interval_plus_margin_truth_interval",
    execution_rounding:
      "absolute_error_of_trace_bound_binary64_result_against_composed_truth_interval",
    error_metric: "exact_absolute_rational_upper_bound",
    finite_corpus_maximum_is_a_bound: false,
  },
  closure_state: {
    actual_execution_trace: "independently_reviewed_candidate",
    endpoint_truth_implementation: "implemented_pending_independent_review",
    endpoint_truth_independent_review: "pending",
    m3_closed: false,
    supported_degrees_of_freedom_maximum: null,
    supported_platform_matrix: "pending",
    supported_execution_predicate: "unselected",
    supported_domain: false,
    runtime_support: false,
    final_reason_codes_frozen: false,
  },
  prohibited_claims: [
    "independently_reviewed_endpoint_truth_bound",
    "m3_complete",
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

function canonicalizeJson(value: unknown, ancestors = new Set<object>()): JsonValue {
  if (value === null || typeof value === "boolean" || typeof value === "string") return value;
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new TypeError("candidate contains a non-finite JSON number");
    return value;
  }
  if (typeof value !== "object") throw new TypeError("candidate contains non-JSON data");
  if (ancestors.has(value)) throw new TypeError("candidate contains a cycle");
  ancestors.add(value);
  try {
    if (Array.isArray(value)) {
      const array = ownDataArray(value, MAXIMUM_CLOSED_JSON_ARRAY_LENGTH);
      if (array === undefined) throw new TypeError("candidate contains a non-data array");
      return array.map((entry) => canonicalizeJson(entry, ancestors));
    }
    const prototype = Reflect.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) {
      throw new TypeError("candidate contains a non-JSON object");
    }
    const result: Record<string, JsonValue> = {};
    for (const key of Reflect.ownKeys(value)) {
      if (typeof key !== "string") throw new TypeError("candidate contains a symbol key");
      const descriptor = Reflect.getOwnPropertyDescriptor(value, key);
      if (descriptor === undefined || !("value" in descriptor) || descriptor.enumerable !== true) {
        throw new TypeError("candidate contains a non-data property");
      }
      result[key] = canonicalizeJson(descriptor.value, ancestors);
    }
    return result;
  } finally {
    ancestors.delete(value);
  }
}

function absoluteBigInt(value: bigint): bigint {
  return value < 0n ? -value : value;
}

function gcd(first: bigint, second: bigint): bigint {
  let a = absoluteBigInt(first);
  let b = absoluteBigInt(second);
  while (b !== 0n) {
    const remainder = a % b;
    a = b;
    b = remainder;
  }
  return a === 0n ? 1n : a;
}

function rational(numerator: bigint, denominator = 1n): Rational {
  if (denominator === 0n) throw new RangeError("rational denominator must be non-zero");
  let n = numerator;
  let d = denominator;
  if (d < 0n) {
    n = -n;
    d = -d;
  }
  if (n === 0n) return { numerator: 0n, denominator: 1n };
  const divisor = gcd(n, d);
  return { numerator: n / divisor, denominator: d / divisor };
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

function compareRational(first: Rational, second: Rational): number {
  const delta = first.numerator * second.denominator - second.numerator * first.denominator;
  return delta < 0n ? -1 : delta > 0n ? 1 : 0;
}

function absoluteRational(value: Rational): Rational {
  return rational(absoluteBigInt(value.numerator), value.denominator);
}

function maximumRational(first: Rational, second: Rational): Rational {
  return compareRational(first, second) >= 0 ? first : second;
}

function serializeRational(value: Rational): ExactRationalCandidate {
  const normalized = rational(value.numerator, value.denominator);
  return {
    numerator: normalized.numerator.toString(),
    denominator: normalized.denominator.toString(),
  };
}

function serializeInterval(interval: RationalInterval): RationalIntervalCandidate {
  return { lower: serializeRational(interval.lower), upper: serializeRational(interval.upper) };
}

function parseRational(value: ExactRationalCandidate): Rational {
  const record = ownDataRecord(value, ["numerator", "denominator"]);
  if (
    record === undefined ||
    typeof record["numerator"] !== "string" ||
    typeof record["denominator"] !== "string" ||
    !INTEGER.test(record["numerator"]) ||
    !INTEGER.test(record["denominator"])
  ) {
    throw new TypeError("invalid exact rational");
  }
  const parsed = rational(BigInt(record["numerator"]), BigInt(record["denominator"]));
  if (!isDeepStrictEqual(serializeRational(parsed), record)) {
    throw new TypeError("exact rational is not normalized");
  }
  return parsed;
}

function parseInterval(value: RationalIntervalCandidate): RationalInterval {
  const record = ownDataRecord(value, ["lower", "upper"]);
  if (record === undefined) throw new TypeError("invalid rational interval");
  const interval = {
    lower: parseRational(record["lower"] as ExactRationalCandidate),
    upper: parseRational(record["upper"] as ExactRationalCandidate),
  };
  if (compareRational(interval.lower, interval.upper) > 0) {
    throw new RangeError("rational interval is reversed");
  }
  return interval;
}

function numberFromHex(value: string): number {
  if (!HEX64.test(value)) throw new TypeError("invalid binary64 hex");
  const view = new DataView(new ArrayBuffer(8));
  view.setBigUint64(0, BigInt(`0x${value}`), false);
  const number = view.getFloat64(0, false);
  if (!Number.isFinite(number)) throw new TypeError("truth ledger requires finite binary64");
  return number;
}

function rationalFromHex(value: string): Rational {
  const exact = binary64ToExactDyadic(numberFromHex(value));
  return rational(exact.numerator, 1n << BigInt(exact.denominatorExponent));
}

function hexFromBits(bits: bigint): string {
  return bits.toString(16).padStart(16, "0");
}

function midpoint(first: Rational, second: Rational): Rational {
  return rational(
    addRational(first, second).numerator,
    addRational(first, second).denominator * 2n,
  );
}

function criticalRoundingCell(hex: string): {
  interval: RationalInterval;
  quantizationBound: Rational;
} {
  if (!HEX64.test(hex)) throw new TypeError("invalid critical-value binary64 hex");
  const bits = BigInt(`0x${hex}`);
  if (bits <= 0n || bits >= MAXIMUM_FINITE_BITS) {
    throw new RangeError("critical value does not have two finite positive neighbors");
  }
  const center = rationalFromHex(hex);
  const lower = midpoint(rationalFromHex(hexFromBits(bits - 1n)), center);
  const upper = midpoint(center, rationalFromHex(hexFromBits(bits + 1n)));
  if (compareRational(rational(0n), lower) >= 0 || compareRational(lower, upper) >= 0) {
    throw new RangeError("critical-value rounding cell is not positive and ordered");
  }
  return {
    interval: { lower, upper },
    quantizationBound: maximumRational(
      subtractRational(center, lower),
      subtractRational(upper, center),
    ),
  };
}

function multiplyPositiveIntervals(
  first: RationalInterval,
  second: RationalInterval,
): RationalInterval {
  if (first.lower.numerator <= 0n || second.lower.numerator <= 0n) {
    throw new RangeError("CI margin factors must be strictly positive");
  }
  return {
    lower: multiplyRational(first.lower, second.lower),
    upper: multiplyRational(first.upper, second.upper),
  };
}

function subtractIntervals(first: RationalInterval, second: RationalInterval): RationalInterval {
  return {
    lower: subtractRational(first.lower, second.upper),
    upper: subtractRational(first.upper, second.lower),
  };
}

function addIntervals(first: RationalInterval, second: RationalInterval): RationalInterval {
  return {
    lower: addRational(first.lower, second.lower),
    upper: addRational(first.upper, second.upper),
  };
}

function errorUpperBound(graphValue: Rational, interval: RationalInterval): Rational {
  return maximumRational(
    absoluteRational(subtractRational(graphValue, interval.lower)),
    absoluteRational(subtractRational(graphValue, interval.upper)),
  );
}

function quantityProof(
  sourceSequence: number,
  graphBinary64Hex: string,
  interval: RationalInterval,
): PairedTCIEndpointTruthQuantityCandidate {
  return {
    source_sequence: sourceSequence,
    graph_binary64_hex: graphBinary64Hex,
    truth_interval: serializeInterval(interval),
    absolute_error_upper_bound: serializeRational(
      errorUpperBound(rationalFromHex(graphBinary64Hex), interval),
    ),
  };
}

function buildProof(
  ciTrace: PairedTCIExecutionTraceCandidate,
  g4Envelope: PairedTG4TruthErrorEnvelopeCandidate,
): PairedTCIEndpointTruthProofCandidate {
  const ciVerification = verifyPairedTCIExecutionTraceCandidate(ciTrace);
  if (!ciVerification.ok) {
    throw new Error(`CI trace is not independently verified: ${ciVerification.errors.join("; ")}`);
  }
  const g4Verification = verifyPairedTG4TruthErrorCandidate(g4Envelope);
  if (!g4Verification.ok) {
    throw new Error(
      `G4 truth-error envelope is not independently verified: ${g4Verification.errors.join("; ")}`,
    );
  }
  if (!isDeepStrictEqual(ciTrace.g4_trace, g4Envelope.g4_trace)) {
    throw new Error("CI trace and G4 truth-error envelope do not bind the same G4 trace");
  }
  if (
    ciTrace.selected_table.ordered_cell_content_hash !==
    PAIRED_T_SELECTED_FIXED_95_TABLE_CONTENT_HASH
  ) {
    throw new Error("CI trace does not bind the exact selected critical-value table");
  }

  const meanTruth = parseInterval(g4Envelope.proof.mean_difference.truth_interval);
  const standardErrorTruth = parseInterval(g4Envelope.proof.standard_error.truth_interval);
  const critical = criticalRoundingCell(ciTrace.selected_table.critical_value_binary64_hex);
  const marginTruth = multiplyPositiveIntervals(critical.interval, standardErrorTruth);
  const lowerTruth = subtractIntervals(meanTruth, marginTruth);
  const upperTruth = addIntervals(meanTruth, marginTruth);

  return {
    model: "trace_bound_exact_rational_fixed_95_ci_endpoint_truth_composition",
    ci_trace_sha256: ciTrace.sha256,
    g4_truth_error_envelope_sha256: g4Envelope.sha256,
    g4_trace_sha256: ciTrace.g4_trace.sha256,
    confidence_level: "19/20",
    mean_truth_source: "reviewed_g4_exact_rational_truth_interval",
    standard_error_truth_source: "reviewed_g4_2048_bit_dyadic_sqrt_truth_interval",
    critical_value_truth_source: "reviewed_correct_rounding_cell_for_selected_fixed_95_table_cell",
    composition: {
      margin: "positive_critical_interval_multiply_positive_standard_error_interval",
      lower_endpoint: "mean_interval_subtract_margin_interval",
      upper_endpoint: "mean_interval_add_margin_interval",
    },
    error_metric: "exact_absolute_rational_upper_bound",
    critical_value: {
      selected_table_content_hash: PAIRED_T_SELECTED_FIXED_95_TABLE_CONTENT_HASH,
      degrees_of_freedom: ciTrace.selected_table.degrees_of_freedom,
      graph_binary64_hex: ciTrace.selected_table.critical_value_binary64_hex,
      truth_rounding_cell: serializeInterval(critical.interval),
      absolute_quantization_error_upper_bound: serializeRational(critical.quantizationBound),
      boundary_semantics: "inclusive_conservative_midpoints_between_adjacent_binary64_values",
    },
    margin: quantityProof(0, ciTrace.outcome.margin_binary64_hex, marginTruth),
    lower_endpoint: quantityProof(1, ciTrace.outcome.lower_endpoint_binary64_hex, lowerTruth),
    upper_endpoint: quantityProof(2, ciTrace.outcome.upper_endpoint_binary64_hex, upperTruth),
    finite_corpus_maximum_is_a_bound: false,
    endpoint_truth_bound_selected: false,
  };
}

function envelopePayload(envelope: PairedTCIEndpointTruthEnvelopeCandidate): unknown {
  return {
    format: envelope.format,
    ci_trace: envelope.ci_trace,
    g4_truth_error_envelope: envelope.g4_truth_error_envelope,
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
  g4Envelope: PairedTG4TruthErrorEnvelopeCandidate,
): PairedTCIEndpointTruthEnvelopeCandidate {
  const envelope: PairedTCIEndpointTruthEnvelopeCandidate = {
    format: FORMAT,
    ci_trace: ciTrace,
    g4_truth_error_envelope: g4Envelope,
    proof: buildProof(ciTrace, g4Envelope),
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
    return { ok: false, errors: ["CI endpoint-truth envelope is not closed JSON data"] };
  }
  const top = ownDataRecord(canonical, [
    "format",
    "ci_trace",
    "g4_truth_error_envelope",
    "proof",
    "sha256",
  ]);
  if (
    top === undefined ||
    top["format"] !== FORMAT ||
    typeof top["sha256"] !== "string" ||
    !/^sha256:[0-9a-f]{64}$/.test(top["sha256"])
  ) {
    return { ok: false, errors: ["CI endpoint-truth envelope has an invalid closed structure"] };
  }

  const ciVerification = verifyPairedTCIExecutionTraceCandidate(top["ci_trace"]);
  if (!ciVerification.ok) {
    return { ok: false, errors: ["nested CI trace verification failed", ...ciVerification.errors] };
  }
  const g4Verification = verifyPairedTG4TruthErrorCandidate(top["g4_truth_error_envelope"]);
  if (!g4Verification.ok) {
    return {
      ok: false,
      errors: ["nested G4 truth-error verification failed", ...g4Verification.errors],
    };
  }

  try {
    const expected = buildEnvelope(
      top["ci_trace"] as PairedTCIExecutionTraceCandidate,
      top["g4_truth_error_envelope"] as PairedTG4TruthErrorEnvelopeCandidate,
    );
    return isDeepStrictEqual(canonical, expected)
      ? { ok: true, errors: [] }
      : {
          ok: false,
          errors: ["CI endpoint-truth envelope differs from the independently reconstructed proof"],
        };
  } catch {
    return { ok: false, errors: ["CI endpoint-truth proof reconstruction failed"] };
  }
}

function refusal(
  classification: FailureClassification,
  detail: { upstreamClassification?: string; proofErrors?: string[] } = {},
): PairedTCIEndpointTruthCandidateResult {
  return {
    ok: false,
    status: "non_authoritative_ci_endpoint_truth_evaluation",
    classification,
    ...detail,
    candidateArithmeticExecutionVerified: false,
    g4MathematicalTruthIndependentlyReviewed: false,
    confidenceIntervalEndpointTruthImplemented: false,
    confidenceIntervalEndpointTruthIndependentlyReviewed: false,
    confidenceIntervalEndpointTruthComplete: false,
    supportedExecutionPredicateSatisfied: false,
    supportedDomainClaimed: false,
    runtimeSupportClaimed: false,
  };
}

/** Evaluate endpoint truth composition without review, support, or runtime promotion. */
export function evaluatePairedTCIEndpointTruthCandidate(
  candidate: unknown,
): PairedTCIEndpointTruthCandidateResult {
  const ci = evaluatePairedTCIExecutionTraceCandidate(candidate);
  if (!ci.ok) {
    return refusal("ci_execution_stage_refusal", { upstreamClassification: ci.classification });
  }
  const g4Truth = evaluatePairedTG4TruthErrorCandidate(candidate);
  if (!g4Truth.ok) {
    return refusal("g4_truth_stage_refusal", {
      upstreamClassification: g4Truth.classification,
      ...(g4Truth.proofErrors === undefined ? {} : { proofErrors: g4Truth.proofErrors }),
    });
  }
  if (!isDeepStrictEqual(ci.trace.g4_trace, g4Truth.envelope.g4_trace)) {
    return refusal("truth_trace_mismatch");
  }

  let envelope: PairedTCIEndpointTruthEnvelopeCandidate;
  try {
    envelope = buildEnvelope(ci.trace, g4Truth.envelope);
  } catch (error) {
    return refusal("endpoint_truth_proof_failed", {
      proofErrors: [
        error instanceof Error ? error.message : "endpoint-truth proof construction failed",
      ],
    });
  }
  const verification = verifyPairedTCIEndpointTruthCandidate(envelope);
  if (!verification.ok) {
    return refusal("endpoint_truth_verification_failed", { proofErrors: verification.errors });
  }

  deepFreeze(envelope);
  return {
    ok: true,
    status: "non_authoritative_ci_endpoint_truth_evaluation",
    envelope,
    proof: envelope.proof,
    candidateArithmeticExecutionVerified: true,
    g4MathematicalTruthIndependentlyReviewed: true,
    confidenceIntervalEndpointTruthImplemented: true,
    confidenceIntervalEndpointTruthIndependentlyReviewed: false,
    confidenceIntervalEndpointTruthComplete: false,
    supportedExecutionPredicateSatisfied: false,
    supportedDomainClaimed: false,
    runtimeSupportClaimed: false,
  };
}

/** Fail-closed exact checkpoint validator for this unreviewed candidate. */
export function validatePairedTCIEndpointTruthCheckpoint(candidate: unknown): string[] {
  try {
    const canonical = canonicalizeJson(candidate);
    return isDeepStrictEqual(canonical, EXPECTED_CHECKPOINT)
      ? []
      : ["CI endpoint-truth checkpoint differs from the pending-review candidate"];
  } catch {
    return ["CI endpoint-truth checkpoint differs from the pending-review candidate"];
  }
}
