/**
 * Non-authoritative G4 mathematical-truth error candidate for R2-D5.
 *
 * This module binds an exact-rational truth ledger to the already reviewed
 * G4 actual-execution trace. It does not change the G4 graph or select a
 * supported domain, tolerance, platform, Public Check, bundle, or runtime.
 */

import { createHash } from "node:crypto";
import { isDeepStrictEqual } from "node:util";
import {
  binary64ToExactDyadic,
  type PairedTSpikeErrorCode,
} from "../../../reference/spikes/paired-t.js";
import {
  evaluatePairedTG4ExecutionTraceCandidate,
  verifyPairedTG4ExecutionTraceCandidate,
  type PairedTG4ExecutionTraceCandidate,
} from "./paired-t-g4-execution-trace-candidate.js";

const FORMAT = "paired-t-g4-mathematical-truth-error-v1";
const SQRT_ENCLOSURE_PRECISION_BITS = 2048;
const MAXIMUM_CLOSED_JSON_ARRAY_LENGTH = 32768;

interface Rational {
  numerator: bigint;
  denominator: bigint;
}

export interface ExactRationalCandidate {
  numerator: string;
  denominator: string;
}

export interface RationalIntervalCandidate {
  lower: ExactRationalCandidate;
  upper: ExactRationalCandidate;
}

export interface PairedTG4TruthQuantityCandidate {
  source_sequence: number;
  graph_binary64_hex: string;
  truth_interval: RationalIntervalCandidate;
  absolute_error_upper_bound: ExactRationalCandidate;
}

export interface PairedTG4DifferenceTruthCandidate extends PairedTG4TruthQuantityCandidate {
  pair_id: string;
}

export interface PairedTG4TruthErrorProofCandidate {
  model: "trace_bound_exact_rational_g4_truth_with_dyadic_sqrt_enclosure";
  g4_trace_sha256: string;
  input_truth_source: "exact_real_values_of_trace_bound_binary64_observations";
  difference_truth_definition: "exact_first_condition_minus_second_condition";
  mean_truth_definition: "exact_arithmetic_mean_of_exact_paired_differences";
  sample_variance_truth_definition: "exact_sum_squared_deviation_from_exact_mean_divide_n_minus_one";
  standard_error_truth_definition: "sqrt_exact_sample_variance_divide_n";
  test_statistic_truth_definition: "exact_mean_divide_exact_standard_error";
  sqrt_enclosure: {
    method: "integer_sqrt_of_scaled_exact_rational";
    precision_bits: typeof SQRT_ENCLOSURE_PRECISION_BITS;
    lower_inclusive: true;
    upper_inclusive: true;
  };
  error_metric: "exact_absolute_rational_upper_bound";
  finite_corpus_maximum_is_a_bound: false;
  differences: readonly PairedTG4DifferenceTruthCandidate[];
  mean_difference: PairedTG4TruthQuantityCandidate;
  sample_variance: PairedTG4TruthQuantityCandidate;
  standard_error: PairedTG4TruthQuantityCandidate;
  test_statistic: PairedTG4TruthQuantityCandidate;
  truth_error_bound_selected: false;
}

export interface PairedTG4TruthErrorEnvelopeCandidate {
  format: typeof FORMAT;
  g4_trace: PairedTG4ExecutionTraceCandidate;
  proof: PairedTG4TruthErrorProofCandidate;
  sha256: string;
}

export interface PairedTG4TruthErrorCheckpointCandidate {
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

type TruthErrorFailureClassification =
  "g4_stage_refusal" | "truth_error_proof_failed" | "truth_error_verification_failed";

export type PairedTG4TruthErrorCandidateResult =
  | {
      ok: true;
      status: "non_authoritative_g4_truth_error_evaluation";
      g4Result: {
        operationGraph: "g4-pairwise-two-pass-candidate";
        pairIds: readonly string[];
        differences: readonly number[];
        nPairs: number;
        meanDifference: number;
        sampleVarianceDifference: number;
        standardError: number;
        testStatistic: number;
        degreesOfFreedom: number;
      };
      envelope: PairedTG4TruthErrorEnvelopeCandidate;
      proof: PairedTG4TruthErrorProofCandidate;
      candidateArithmeticExecutionVerified: true;
      mathematicalTruthErrorBoundImplemented: true;
      mathematicalTruthErrorBoundIndependentlyReviewed: false;
      mathematicalTruthErrorBoundComplete: false;
      supportedExecutionPredicateSatisfied: false;
      supportedPlatformClaimed: false;
      supportedDomainClaimed: false;
      runtimeSupportClaimed: false;
    }
  | {
      ok: false;
      status: "non_authoritative_g4_truth_error_evaluation";
      classification: TruthErrorFailureClassification;
      g4Classification?: string;
      graphClassification?: PairedTSpikeErrorCode;
      proofErrors?: string[];
      candidateArithmeticExecutionVerified: false;
      mathematicalTruthErrorBoundImplemented: false;
      mathematicalTruthErrorBoundIndependentlyReviewed: false;
      mathematicalTruthErrorBoundComplete: false;
      supportedExecutionPredicateSatisfied: false;
      supportedPlatformClaimed: false;
      supportedDomainClaimed: false;
      runtimeSupportClaimed: false;
    };

const EXPECTED_CHECKPOINT = {
  status: "non_authoritative_candidate",
  issuance: "unissued",
  review_issue: "https://github.com/licklider-ai/nomue-protocol/issues/25",
  candidate_key: "paired-t-d5-g4-mathematical-truth-error-evaluation-1",
  decision_state: "implemented_candidate_pending_independent_adversarial_review",
  runtime_support_enabled: false,
  supported_domain_claimed: false,
  scope: {
    input: "existing_reviewed_g4_actual_execution_trace_from_explicit_paired_binary64_observations",
    operation_graph: "g4_pairwise_two_pass_fixed_recursive_floor_half_split",
    output:
      "exact_truth_intervals_and_absolute_error_bounds_for_differences_mean_sample_variance_standard_error_and_test_statistic",
    existing_g4_implementation_changed: false,
    student_t_tail_truth_not_included: true,
    confidence_interval_endpoints_not_included: true,
  },
  proof_model: {
    input_values: "exact_real_values_of_trace_bound_binary64_observations",
    paired_differences: "exact_rational_first_minus_second",
    mean_difference: "exact_rational",
    sample_variance: "exact_rational_about_exact_mean",
    standard_error: "exact_rational_input_with_2048_bit_dyadic_sqrt_enclosure",
    test_statistic: "exact_rational_division_over_standard_error_enclosure",
    error_metric: "exact_absolute_rational_upper_bound",
    proof_source: "one_independently_verified_g4_actual_execution_trace",
    finite_corpus_maximum_is_a_bound: false,
  },
  closure_state: {
    implementation: "implemented_pending_independent_adversarial_review",
    independent_adversarial_review: "pending",
    readiness_admission: "held_pending_independent_adversarial_review",
    g4_mathematical_truth_error_bound: "implemented_not_reviewed",
    tail_trace_composition: "reviewed_separate_candidate",
    confidence_interval_trace_composition: "pending",
    supported_resource_bound: "unselected",
    supported_execution_predicate: "unselected",
  },
  prohibited_claims: [
    "complete_g4_mathematical_truth_error_bound",
    "selected_quantity_comparison_tolerance",
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

function divideRational(first: Rational, second: Rational): Rational {
  if (second.numerator === 0n) throw new RangeError("cannot divide by zero rational");
  return rational(first.numerator * second.denominator, first.denominator * second.numerator);
}

function squareRational(value: Rational): Rational {
  return multiplyRational(value, value);
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

function sumRationals(values: readonly Rational[]): Rational {
  return values.reduce((sum, value) => addRational(sum, value), rational(0n));
}

function numberFromHex(value: string): number {
  if (!/^[0-9a-f]{16}$/.test(value)) throw new TypeError("invalid binary64 hex");
  const view = new DataView(new ArrayBuffer(8));
  view.setBigUint64(0, BigInt(`0x${value}`), false);
  return view.getFloat64(0, false);
}

function rationalFromNumber(value: number): Rational {
  const exact = binary64ToExactDyadic(value);
  return rational(exact.numerator, 1n << BigInt(exact.denominatorExponent));
}

function rationalFromHex(value: string): Rational {
  const number = numberFromHex(value);
  if (!Number.isFinite(number)) throw new TypeError("truth ledger requires finite binary64 values");
  return rationalFromNumber(number);
}

function serializeRational(value: Rational): ExactRationalCandidate {
  const normalized = rational(value.numerator, value.denominator);
  return {
    numerator: normalized.numerator.toString(),
    denominator: normalized.denominator.toString(),
  };
}

function exactInterval(value: Rational): { lower: Rational; upper: Rational } {
  return { lower: value, upper: value };
}

function integerSqrt(value: bigint): bigint {
  if (value < 0n) throw new RangeError("integer sqrt requires non-negative input");
  if (value < 2n) return value;
  const bitLength = value.toString(2).length;
  let current = 1n << BigInt(Math.ceil(bitLength / 2));
  while (true) {
    const next = (current + value / current) >> 1n;
    if (next >= current) return current;
    current = next;
  }
}

function sqrtRationalInterval(value: Rational): { lower: Rational; upper: Rational } {
  if (value.numerator < 0n) throw new RangeError("sqrt truth input must be non-negative");
  if (value.numerator === 0n) return exactInterval(rational(0n));

  const scale = 1n << BigInt(SQRT_ENCLOSURE_PRECISION_BITS);
  const scaledNumerator = value.numerator << BigInt(SQRT_ENCLOSURE_PRECISION_BITS * 2);
  const quotient = scaledNumerator / value.denominator;
  const floor = integerSqrt(quotient);
  if (floor === 0n) {
    throw new RangeError("sqrt enclosure precision is insufficient for this positive input");
  }
  const lower = rational(floor, scale);
  const exactAtScale = floor * floor * value.denominator === scaledNumerator;
  const upper = exactAtScale ? lower : rational(floor + 1n, scale);
  if (
    compareRational(squareRational(lower), value) > 0 ||
    compareRational(squareRational(upper), value) < 0
  ) {
    throw new Error("sqrt enclosure failed exact containment");
  }
  return { lower, upper };
}

function divideByPositiveInterval(
  numerator: Rational,
  denominator: { lower: Rational; upper: Rational },
): { lower: Rational; upper: Rational } {
  if (denominator.lower.numerator <= 0n || denominator.upper.numerator <= 0n) {
    throw new RangeError("truth denominator interval must be strictly positive");
  }
  if (numerator.numerator === 0n) return exactInterval(rational(0n));
  if (numerator.numerator > 0n) {
    return {
      lower: divideRational(numerator, denominator.upper),
      upper: divideRational(numerator, denominator.lower),
    };
  }
  return {
    lower: divideRational(numerator, denominator.lower),
    upper: divideRational(numerator, denominator.upper),
  };
}

function errorUpperBound(
  graphValue: Rational,
  interval: { lower: Rational; upper: Rational },
): Rational {
  const toLower = absoluteRational(subtractRational(graphValue, interval.lower));
  const toUpper = absoluteRational(subtractRational(graphValue, interval.upper));
  return maximumRational(toLower, toUpper);
}

function serializeInterval(interval: {
  lower: Rational;
  upper: Rational;
}): RationalIntervalCandidate {
  return {
    lower: serializeRational(interval.lower),
    upper: serializeRational(interval.upper),
  };
}

function quantityProof(
  sourceSequence: number,
  graphBinary64Hex: string,
  interval: { lower: Rational; upper: Rational },
): PairedTG4TruthQuantityCandidate {
  const graph = rationalFromHex(graphBinary64Hex);
  return {
    source_sequence: sourceSequence,
    graph_binary64_hex: graphBinary64Hex,
    truth_interval: serializeInterval(interval),
    absolute_error_upper_bound: serializeRational(errorUpperBound(graph, interval)),
  };
}

function exactDifferenceForPair(
  pair: PairedTG4ExecutionTraceCandidate["input"]["pairs"][number],
): Rational {
  return subtractRational(
    rationalFromHex(pair.first.outcome_binary64_hex),
    rationalFromHex(pair.second.outcome_binary64_hex),
  );
}

function buildProof(trace: PairedTG4ExecutionTraceCandidate): PairedTG4TruthErrorProofCandidate {
  const traceVerification = verifyPairedTG4ExecutionTraceCandidate(trace);
  if (!traceVerification.ok) {
    throw new Error(
      `G4 trace is not independently verified: ${traceVerification.errors.join("; ")}`,
    );
  }

  const exactDifferences = trace.input.pairs.map(exactDifferenceForPair);
  if (
    exactDifferences.length !== trace.outcome.n_pairs ||
    exactDifferences.length !== trace.outcome.difference_source_sequences.length ||
    exactDifferences.length !== trace.outcome.difference_binary64_hex.length ||
    exactDifferences.length < 2
  ) {
    throw new Error("G4 truth ledger input cardinality is inconsistent");
  }

  const n = rational(BigInt(exactDifferences.length));
  const mean = divideRational(sumRationals(exactDifferences), n);
  const centered = exactDifferences.map((value) => subtractRational(value, mean));
  const centeredSquares = centered.map(squareRational);
  const sampleVariance = divideRational(
    sumRationals(centeredSquares),
    rational(BigInt(exactDifferences.length - 1)),
  );
  if (sampleVariance.numerator <= 0n) {
    throw new Error("G4 success does not have a positive exact sample variance");
  }
  const standardErrorSquared = divideRational(sampleVariance, n);
  const standardError = sqrtRationalInterval(standardErrorSquared);
  const testStatistic = divideByPositiveInterval(mean, standardError);

  const differences = exactDifferences.map((truth, index) => {
    const pair = trace.input.pairs[index];
    const sourceSequence = trace.outcome.difference_source_sequences[index];
    const graphBinary64Hex = trace.outcome.difference_binary64_hex[index];
    if (pair === undefined || sourceSequence === undefined || graphBinary64Hex === undefined) {
      throw new Error("G4 truth ledger lost a difference binding");
    }
    return {
      pair_id: pair.pair_id,
      ...quantityProof(sourceSequence, graphBinary64Hex, exactInterval(truth)),
    };
  });

  return {
    model: "trace_bound_exact_rational_g4_truth_with_dyadic_sqrt_enclosure",
    g4_trace_sha256: trace.sha256,
    input_truth_source: "exact_real_values_of_trace_bound_binary64_observations",
    difference_truth_definition: "exact_first_condition_minus_second_condition",
    mean_truth_definition: "exact_arithmetic_mean_of_exact_paired_differences",
    sample_variance_truth_definition:
      "exact_sum_squared_deviation_from_exact_mean_divide_n_minus_one",
    standard_error_truth_definition: "sqrt_exact_sample_variance_divide_n",
    test_statistic_truth_definition: "exact_mean_divide_exact_standard_error",
    sqrt_enclosure: {
      method: "integer_sqrt_of_scaled_exact_rational",
      precision_bits: SQRT_ENCLOSURE_PRECISION_BITS,
      lower_inclusive: true,
      upper_inclusive: true,
    },
    error_metric: "exact_absolute_rational_upper_bound",
    finite_corpus_maximum_is_a_bound: false,
    differences,
    mean_difference: quantityProof(
      trace.outcome.mean_difference_source_sequence,
      trace.outcome.mean_difference_binary64_hex,
      exactInterval(mean),
    ),
    sample_variance: quantityProof(
      trace.outcome.sample_variance_source_sequence,
      trace.outcome.sample_variance_binary64_hex,
      exactInterval(sampleVariance),
    ),
    standard_error: quantityProof(
      trace.outcome.standard_error_source_sequence,
      trace.outcome.standard_error_binary64_hex,
      standardError,
    ),
    test_statistic: quantityProof(
      trace.outcome.test_statistic_source_sequence,
      trace.outcome.test_statistic_binary64_hex,
      testStatistic,
    ),
    truth_error_bound_selected: false,
  };
}

function envelopePayload(envelope: PairedTG4TruthErrorEnvelopeCandidate): unknown {
  return {
    format: envelope.format,
    g4_trace: envelope.g4_trace,
    proof: envelope.proof,
  };
}

function envelopeSha256(envelope: PairedTG4TruthErrorEnvelopeCandidate): string {
  return `sha256:${createHash("sha256")
    .update(JSON.stringify(envelopePayload(envelope)), "utf8")
    .digest("hex")}`;
}

function buildEnvelope(
  trace: PairedTG4ExecutionTraceCandidate,
): PairedTG4TruthErrorEnvelopeCandidate {
  const envelope: PairedTG4TruthErrorEnvelopeCandidate = {
    format: FORMAT,
    g4_trace: trace,
    proof: buildProof(trace),
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

export function verifyPairedTG4TruthErrorCandidate(candidate: unknown): {
  ok: boolean;
  errors: string[];
} {
  let canonical: JsonValue;
  try {
    canonical = canonicalizeJson(candidate);
  } catch {
    return { ok: false, errors: ["G4 truth-error envelope is not closed JSON data"] };
  }
  const top = ownDataRecord(canonical, ["format", "g4_trace", "proof", "sha256"]);
  if (
    top === undefined ||
    top["format"] !== FORMAT ||
    typeof top["sha256"] !== "string" ||
    !/^sha256:[0-9a-f]{64}$/.test(top["sha256"])
  ) {
    return { ok: false, errors: ["G4 truth-error envelope has an invalid closed structure"] };
  }

  const traceVerification = verifyPairedTG4ExecutionTraceCandidate(top["g4_trace"]);
  if (!traceVerification.ok) {
    return {
      ok: false,
      errors: ["nested G4 trace verification failed", ...traceVerification.errors],
    };
  }

  try {
    const expected = buildEnvelope(top["g4_trace"] as PairedTG4ExecutionTraceCandidate);
    return isDeepStrictEqual(canonical, expected)
      ? { ok: true, errors: [] }
      : {
          ok: false,
          errors: ["G4 truth-error envelope differs from the independently reconstructed proof"],
        };
  } catch {
    return { ok: false, errors: ["G4 truth-error proof reconstruction failed"] };
  }
}

function refusal(
  classification: TruthErrorFailureClassification,
  detail: {
    g4Classification?: string;
    graphClassification?: PairedTSpikeErrorCode;
    proofErrors?: string[];
  } = {},
): PairedTG4TruthErrorCandidateResult {
  return {
    ok: false,
    status: "non_authoritative_g4_truth_error_evaluation",
    classification,
    ...detail,
    candidateArithmeticExecutionVerified: false,
    mathematicalTruthErrorBoundImplemented: false,
    mathematicalTruthErrorBoundIndependentlyReviewed: false,
    mathematicalTruthErrorBoundComplete: false,
    supportedExecutionPredicateSatisfied: false,
    supportedPlatformClaimed: false,
    supportedDomainClaimed: false,
    runtimeSupportClaimed: false,
  };
}

/** Evaluate the G4 truth-error proof candidate without selecting Protocol support. */
export function evaluatePairedTG4TruthErrorCandidate(
  candidate: unknown,
): PairedTG4TruthErrorCandidateResult {
  const g4 = evaluatePairedTG4ExecutionTraceCandidate(candidate);
  if (!g4.ok) {
    return refusal("g4_stage_refusal", {
      g4Classification: g4.classification,
      ...(g4.graphClassification === undefined
        ? {}
        : { graphClassification: g4.graphClassification }),
      ...(g4.traceErrors === undefined ? {} : { proofErrors: g4.traceErrors }),
    });
  }

  let envelope: PairedTG4TruthErrorEnvelopeCandidate;
  try {
    envelope = buildEnvelope(g4.trace);
  } catch (error) {
    return refusal("truth_error_proof_failed", {
      proofErrors: [
        error instanceof Error ? error.message : "truth-error proof construction failed",
      ],
    });
  }

  const verification = verifyPairedTG4TruthErrorCandidate(envelope);
  if (!verification.ok) {
    return refusal("truth_error_verification_failed", { proofErrors: verification.errors });
  }

  deepFreeze(envelope);
  return {
    ok: true,
    status: "non_authoritative_g4_truth_error_evaluation",
    g4Result: g4.result,
    envelope,
    proof: envelope.proof,
    candidateArithmeticExecutionVerified: true,
    mathematicalTruthErrorBoundImplemented: true,
    mathematicalTruthErrorBoundIndependentlyReviewed: false,
    mathematicalTruthErrorBoundComplete: false,
    supportedExecutionPredicateSatisfied: false,
    supportedPlatformClaimed: false,
    supportedDomainClaimed: false,
    runtimeSupportClaimed: false,
  };
}

/** Fail-closed exact checkpoint validator for this unissued candidate. */
export function validatePairedTG4TruthErrorCheckpoint(candidate: unknown): string[] {
  try {
    const canonical = canonicalizeJson(candidate);
    return isDeepStrictEqual(canonical, EXPECTED_CHECKPOINT)
      ? []
      : ["G4 truth-error checkpoint differs from the closed non-runtime candidate"];
  } catch {
    return ["G4 truth-error checkpoint differs from the closed non-runtime candidate"];
  }
}
