/**
 * Non-authoritative supported-execution predicate candidate for the R2-D5
 * table-connected Student-t tail graph.
 *
 * The value returned by this module is produced from the same immutable trace
 * that supplies the truth-error proof inputs. Every executed binary64 +, -, *,
 * and / result is checked with exact dyadic arithmetic and roundTiesToEven;
 * every executed square root is checked against its exact rounding cell.
 *
 * This candidate deliberately does not select a runtime/build allowlist, enforce
 * a controlled process profile, claim a supported platform, or enable Protocol
 * runtime support. The existing reviewed graph and evidence-bound proof sources
 * remain unchanged for historical reproduction.
 */

import { createHash } from "node:crypto";
import { isDeepStrictEqual } from "node:util";
import {
  lookupReviewedInverseBetaCandidateCell,
  REVIEWED_INVERSE_BETA_TABLE_CONTENT_HASH,
} from "./paired-t-runtime-table-integration-candidate.js";
import { parsePairedTCandidateEvaluationInput } from "./paired-t-runtime-input-reason-code-candidate.js";
import { evaluateProjectionMarginCandidate } from "./paired-t-truth-boundary-candidate.js";

const MINIMUM_NORMAL = 2 ** -1022;
const UNIT_ROUNDOFF_DENOMINATOR = 1n << 53n;
const ULP_CONVERSION_FACTOR = 1n << 54n;
const SIGN_MASK = 1n << 63n;
const EXPONENT_MASK = 0x7ffn;
const FRACTION_MASK = 0x000f_ffff_ffff_ffffn;
const POSITIVE_INFINITY_BITS = 0x7ff0_0000_0000_0000n;
const MAXIMUM_FINITE_BITS = 0x7fef_ffff_ffff_ffffn;
const TRACE_FORMAT = "paired-t-supported-execution-trace-v1";
const CONTROLLED_PROCESS_PROFILE_KEY = "paired-t-tail-pure-js-single-invocation-profile-1";
const CONTROLLED_PROCESS_PROFILE_EXCLUSIONS = Object.freeze([
  "unreviewed_native_addons",
  "wasi",
  "worker_threads",
  "user_callbacks_during_evaluation",
  "runtime_intrinsic_replacement",
] as const);

export const PAIRED_T_SUPPORTED_EXECUTION_MAX_TRACE_NODES = 100_000;

const NativeArrayBuffer = ArrayBuffer;
const NativeDataView = DataView;
const dataViewSetFloat64 = DataView.prototype.setFloat64;
const dataViewGetFloat64 = DataView.prototype.getFloat64;
const dataViewSetBigUint64 = DataView.prototype.setBigUint64;
const dataViewGetBigUint64 = DataView.prototype.getBigUint64;
const reflectApply = Reflect.apply;
const capturedMathSqrt = Math.sqrt;
const capturedMathAbs = Math.abs;
const capturedMathMax = Math.max;

interface Rational {
  numerator: bigint;
  denominator: bigint;
}

interface TrackedValue {
  value: number;
  gammaIndex: number;
  failures: string[];
  sqrtChecks: ReadonlySet<string>;
  sourceSequence: number | null;
}

export type PairedTTraceOperation =
  "absolute" | "add" | "subtract" | "multiply" | "divide" | "sqrt" | "maximum";

export interface PairedTExecutionTraceNodeCandidate {
  sequence: number;
  label: string;
  operation: PairedTTraceOperation;
  operand_sources: readonly (number | null)[];
  operand_binary64_hex: readonly string[];
  result_binary64_hex: string;
}

export interface PairedTExecutionTraceCandidate {
  format: typeof TRACE_FORMAT;
  input: {
    degrees_of_freedom: number;
    test_statistic_binary64_hex: string;
  };
  normalization_constant: {
    inverse_beta_binary64_hex: string;
    candidate_table_content_hash: typeof REVIEWED_INVERSE_BETA_TABLE_CONTENT_HASH;
  };
  runtime_identity: PairedTRuntimeIdentityCandidate;
  proof_input: {
    roundoff_gamma_index: number;
    accumulated_sum_gamma_index: number;
    next_term_gamma_index: number;
    series_remainder_multiplier: number;
    sqrt_rounding_cell_checks: number;
    truncation_relative_upper_bound_numerator: string;
    truncation_relative_upper_bound_denominator: string;
    relative_error_upper_bound_numerator: string;
    relative_error_upper_bound_denominator: string;
  };
  outcome: {
    branch: string;
    iterations: number;
    iteration_cap: number;
    p_value_binary64_hex: string;
    p_value_source_sequence: number | null;
    positive_series_remainder_binary64_hex: string;
    positive_series_remainder_source_sequence: number | null;
  };
  node_count: number;
  maximum_node_count: number;
  sha256: string;
  nodes: readonly PairedTExecutionTraceNodeCandidate[];
}

export interface PairedTRuntimeIdentityCandidate {
  runtime_family: string;
  runtime_version: string;
  engine_family: "v8";
  engine_version: string;
  platform: NodeJS.Platform;
  architecture: string;
}

export interface PairedTSupportedExecutionCheckpoint {
  status: string;
  issuance: string;
  review_issue: string;
  candidate_key: string;
  decision_state: string;
  runtime_support_enabled: boolean;
  supported_platform_selected: boolean;
  supported_execution_predicate_selected: boolean;
  scope: Record<string, unknown>;
  execution_trace: Record<string, unknown>;
  exact_primitive_verifier: Record<string, unknown>;
  diagnostics: Record<string, unknown>;
  runtime_allowlist: Record<string, unknown>;
  controlled_process_profile: Record<string, unknown>;
  closure_state: Record<string, unknown>;
  blocker_transition: Record<string, unknown>;
  prohibited_claims: string[];
}

interface TraceVerificationSuccess {
  ok: true;
  errors: [];
  ordinaryArithmeticChecks: number;
  squareRootChecks: number;
  exactSelectionChecks: number;
}

interface TraceVerificationFailure {
  ok: false;
  errors: string[];
  ordinaryArithmeticChecks: number;
  squareRootChecks: number;
  exactSelectionChecks: number;
}

export type PairedTExecutionTraceVerificationCandidate =
  TraceVerificationSuccess | TraceVerificationFailure;

interface DiagnosticResult {
  passed: boolean;
  vectorCount: number;
  failures: readonly string[];
  fingerprint: string;
}

interface GraphProofSuccess {
  ok: true;
  branch: string;
  pValue: number;
  pValueSourceSequence: number | null;
  iterations: number;
  iterationCap: number;
  remainder: number;
  remainderSourceSequence: number | null;
  relativeErrorUpperBound: Rational;
  truncationRelativeUpperBound: Rational;
  roundoffGammaIndex: number;
  accumulatedSumGammaIndex: number;
  nextTermGammaIndex: number;
  seriesRemainderMultiplier: number;
  proofFailures: string[];
  sqrtRoundingCellChecks: number;
}

interface GraphProofFailure {
  ok: false;
  classification:
    | "non_finite_candidate_intermediate"
    | "positive_series_iteration_cap_reached"
    | "truth_error_bound_not_finite";
  iterationCap?: number;
}

type GraphProofResult = GraphProofSuccess | GraphProofFailure;

export type PairedTSupportedExecutionCandidateResult =
  | {
      ok: true;
      status: "non_authoritative_supported_execution_evaluation";
      branch: string;
      pValue: number;
      pValueBinary64Hex: string;
      iterations: number;
      iterationCap: number;
      positiveSeriesRemainderContributionCandidate: number;
      trace: PairedTExecutionTraceCandidate;
      traceVerification: {
        ordinaryArithmeticChecks: number;
        squareRootChecks: number;
        exactSelectionChecks: number;
        everyTraceNodeVerified: true;
      };
      proof: {
        model: "input_specific_normal_binary64_roundoff_plus_positive_series_remainder";
        source: "same_execution_trace_as_returned_value";
        roundoffGammaIndex: number;
        accumulatedSumGammaIndex: number;
        nextTermGammaIndex: number;
        seriesRemainderMultiplier: number;
        truncationRelativeUpperBound: number;
        relativeErrorUpperBound: number;
        candidateTruthErrorBoundUlp: number;
        positiveIntermediatesStrictlyAboveMinimumNormal: true;
        sqrtRoundingCellChecks: number;
        sqrtRoundingCellsVerified: true;
        truthErrorBoundSelected: false;
      };
      projectionMargin: {
        cellsToNearestClassTransition: bigint;
        candidateTruthErrorBoundUlp: bigint;
        candidateStable: true;
      };
      diagnostics: {
        startup: DiagnosticResult;
        preInvocation: DiagnosticResult;
        postInvocation: DiagnosticResult;
        diagnosticOnly: true;
      };
      executionProfile: {
        runtimeIdentity: PairedTRuntimeIdentityCandidate;
        controlledProcessProfileCandidateKey: typeof CONTROLLED_PROCESS_PROFILE_KEY;
        requiredExclusions: typeof CONTROLLED_PROCESS_PROFILE_EXCLUSIONS;
        exactRuntimeAllowlistSelected: false;
        controlledProcessProfileEnforced: false;
        crossPlatformAdmissionEvidenceComplete: false;
      };
      candidateArithmeticExecutionVerified: true;
      supportedExecutionPredicateSatisfied: false;
      supportedPlatformClaimed: false;
      runtimeSupportClaimed: false;
      supportedDomainClaimed: false;
    }
  | {
      ok: false;
      status: "non_authoritative_candidate_refusal";
      classification:
        | "runtime_graph_refusal"
        | "candidate_constant_table_unavailable"
        | "execution_diagnostic_failed"
        | "execution_trace_resource_bound_exceeded"
        | "execution_trace_verification_failed"
        | "truth_error_proof_precondition_failed"
        | "truth_error_bound_not_finite"
        | "projection_margin_not_established";
      graphClassification?: string;
      diagnosticFailures?: string[];
      proofFailures?: string[];
      traceErrors?: string[];
      candidateTruthErrorBoundUlp?: number;
      supportedExecutionPredicateSatisfied: false;
      supportedPlatformClaimed: false;
      runtimeSupportClaimed: false;
      supportedDomainClaimed: false;
    };

const EXPECTED_CHECKPOINT = {
  status: "non_authoritative_candidate",
  issuance: "unissued",
  review_issue: "https://github.com/licklider-ai/nomue-protocol/issues/25",
  candidate_key: "paired-t-d5-supported-execution-predicate-evaluation-1",
  decision_state:
    "reviewed_implementation_candidate_pending_resource_allowlist_profile_and_matrix_evidence",
  runtime_support_enabled: false,
  supported_platform_selected: false,
  supported_execution_predicate_selected: false,
  scope: {
    execution_surface: "tooling/src/spikes/paired-t-supported-execution-candidate.ts",
    input: "table_connected_tail_graph_degrees_of_freedom_and_test_statistic_only",
    upstream_g4_data_to_statistic_graph_included: false,
    existing_reviewed_graph_or_proof_source_changed: false,
    candidate_table_content_hash: REVIEWED_INVERSE_BETA_TABLE_CONTENT_HASH,
  },
  execution_trace: {
    format: TRACE_FORMAT,
    value_and_proof_source: "one_actual_immutable_trace",
    binds:
      "input_bits_table_identity_operation_labels_operand_bits_result_bits_branch_iterations_proof_inputs_and_returned_value",
    maximum_node_count_candidate: PAIRED_T_SUPPORTED_EXECUTION_MAX_TRACE_NODES,
    maximum_node_count_is_supported_resource_bound: false,
    integer_control_arithmetic: "exact_safe_integer_or_bigint_not_part_of_binary64_roundoff_ledger",
    mutation_disposition: "fail_closed",
  },
  exact_primitive_verifier: {
    ordinary_operations: ["add", "subtract", "multiply", "divide"],
    ordinary_method: "exact_dyadic_operands_bigint_round_ties_to_even",
    square_root_method: "exact_binary64_rounding_cell_strict_containment",
    exact_selectors: ["absolute", "maximum"],
    verifier_result_used_before_candidate_acceptance: true,
    finite_cross_platform_corpus_is_universal_proof: false,
  },
  diagnostics: {
    startup: "hard_coded_binary64_and_intrinsic_identity_sentinels",
    per_invocation: "pre_and_post_hard_coded_binary64_and_intrinsic_identity_sentinels",
    sentinel_vector_count: 9,
    sentinel_vectors: [
      "add_next:3ff0000000000001",
      "add_subnormal:0000000000000002",
      "subtract:3feffffffffffffe",
      "multiply_subnormal:0000000000000001",
      "divide_tie_to_zero:0000000000000000",
      "divide_tenth:3fb999999999999a",
      "sqrt_two:3ff6a09e667f3bcd",
      "negative_zero:Object.is(-1*0,-0)",
      "intrinsic_and_runtime_identity:unchanged",
    ],
    proof_role: "diagnostic_only_not_a_substitute_for_trace_verification",
    mutation_disposition: "fail_closed",
  },
  runtime_allowlist: {
    selection_state: "held_pending_exact_release_build_and_platform_evidence",
    entries: [],
    current_process_identity_reported: true,
    process_identity_alone_establishes_support: false,
  },
  controlled_process_profile: {
    candidate_profile_key: CONTROLLED_PROCESS_PROFILE_KEY,
    selection_state: "contract_drafted_enforcement_held",
    required_exclusions: CONTROLLED_PROCESS_PROFILE_EXCLUSIONS,
    enforced_by_this_candidate: false,
    non_malicious_pinned_runtime_threat_model: true,
  },
  closure_state: {
    implementation: "implemented_and_independently_reviewed",
    exact_runtime_allowlist: "pending",
    controlled_process_profile_enforcement: "pending",
    trace_resource_bound_selection: "pending",
    cross_platform_admission_evidence: "pending",
    public_reason_code: "unissued",
    supported_execution_predicate: "unselected",
  },
  blocker_transition: {
    historical_checkpoint:
      "governance/drafts/release-2-candidate/numerical/runtime-input-reason-code-candidate.json",
    historical_blocker: "independent_primary_source_platform_review",
    research_disposition:
      "governance/drafts/release-2-candidate/reviews/d5-supported-platform-primary-source-research-disposition.md",
    superseding_open_conditions: [
      "supported_trace_resource_bound_selection",
      "exact_runtime_build_platform_allowlist_selection",
      "controlled_process_profile_enforcement",
      "complete_cross_platform_admission_evidence",
    ],
    historical_checkpoint_rewritten: false,
  },
  prohibited_claims: [
    "selected_supported_platform",
    "selected_supported_execution_predicate",
    "supported_runtime_student_t_procedure",
    "supported_df_max",
    "complete_upstream_g4_execution_predicate",
    "issued_unsupported_platform_reason_code",
    "authoritative_public_check_or_bundle",
    "release_2_complete",
  ],
} as const;

class TraceResourceLimitError extends Error {}

function sha256Text(value: string): string {
  return `sha256:${createHash("sha256").update(value, "utf8").digest("hex")}`;
}

function bits(value: number): bigint {
  const view = new NativeDataView(new NativeArrayBuffer(8));
  reflectApply(dataViewSetFloat64, view, [0, value, false]);
  return reflectApply(dataViewGetBigUint64, view, [0, false]) as bigint;
}

function numberFromBits(valueBits: bigint): number {
  const view = new NativeDataView(new NativeArrayBuffer(8));
  reflectApply(dataViewSetBigUint64, view, [0, valueBits, false]);
  return reflectApply(dataViewGetFloat64, view, [0, false]) as number;
}

function hexFromBits(valueBits: bigint): string {
  return valueBits.toString(16).padStart(16, "0");
}

function binary64HexCandidate(value: number): string {
  return hexFromBits(bits(value));
}

function finiteRationalFromBits(valueBits: bigint): Rational | undefined {
  const exponentBits = Number((valueBits >> 52n) & EXPONENT_MASK);
  const fractionBits = valueBits & FRACTION_MASK;
  if (exponentBits === 0x7ff) return undefined;
  const sign = (valueBits & SIGN_MASK) === 0n ? 1n : -1n;
  if (exponentBits === 0 && fractionBits === 0n) {
    return { numerator: 0n, denominator: 1n };
  }
  const significand = exponentBits === 0 ? fractionBits : (1n << 52n) | fractionBits;
  const exponent = exponentBits === 0 ? -1074 : exponentBits - 1023 - 52;
  return exponent >= 0
    ? { numerator: sign * (significand << BigInt(exponent)), denominator: 1n }
    : { numerator: sign * significand, denominator: 1n << BigInt(-exponent) };
}

function positiveRationalFromBits(valueBits: bigint): Rational | undefined {
  const rational = finiteRationalFromBits(valueBits);
  return rational !== undefined && rational.numerator >= 0n ? rational : undefined;
}

function addRational(first: Rational, second: Rational): Rational {
  return {
    numerator: first.numerator * second.denominator + second.numerator * first.denominator,
    denominator: first.denominator * second.denominator,
  };
}

function subtractRational(first: Rational, second: Rational): Rational {
  return {
    numerator: first.numerator * second.denominator - second.numerator * first.denominator,
    denominator: first.denominator * second.denominator,
  };
}

function multiplyRational(first: Rational, second: Rational): Rational {
  return {
    numerator: first.numerator * second.numerator,
    denominator: first.denominator * second.denominator,
  };
}

function divideRational(first: Rational, second: Rational): Rational | undefined {
  if (second.numerator === 0n) return undefined;
  const sign = second.numerator < 0n ? -1n : 1n;
  return {
    numerator: sign * first.numerator * second.denominator,
    denominator: sign * first.denominator * second.numerator,
  };
}

function halfRational(value: Rational): Rational {
  return { numerator: value.numerator, denominator: value.denominator * 2n };
}

function squareRational(value: Rational): Rational {
  return {
    numerator: value.numerator * value.numerator,
    denominator: value.denominator * value.denominator,
  };
}

function compareRational(first: Rational, second: Rational): number {
  const delta = first.numerator * second.denominator - second.numerator * first.denominator;
  return delta < 0n ? -1 : delta > 0n ? 1 : 0;
}

function absoluteBigInt(value: bigint): bigint {
  return value < 0n ? -value : value;
}

function bitLength(value: bigint): number {
  return value === 0n ? 0 : value.toString(2).length;
}

function comparePositiveToPowerOfTwo(
  numerator: bigint,
  denominator: bigint,
  exponent: number,
): number {
  const delta =
    exponent >= 0
      ? numerator - (denominator << BigInt(exponent))
      : (numerator << BigInt(-exponent)) - denominator;
  return delta < 0n ? -1 : delta > 0n ? 1 : 0;
}

function floorLog2PositiveRational(numerator: bigint, denominator: bigint): number {
  let candidate = bitLength(numerator) - bitLength(denominator);
  if (comparePositiveToPowerOfTwo(numerator, denominator, candidate) < 0) candidate -= 1;
  while (comparePositiveToPowerOfTwo(numerator, denominator, candidate + 1) >= 0) candidate += 1;
  return candidate;
}

function roundPositiveQuotientTiesToEven(numerator: bigint, denominator: bigint): bigint {
  const quotient = numerator / denominator;
  const remainder = numerator % denominator;
  const doubled = 2n * remainder;
  if (doubled < denominator) return quotient;
  if (doubled > denominator) return quotient + 1n;
  return (quotient & 1n) === 0n ? quotient : quotient + 1n;
}

function roundRationalToBinary64Bits(value: Rational, negativeZero = false): bigint {
  if (value.denominator <= 0n) throw new RangeError("rational denominator must be positive");
  if (value.numerator === 0n) return negativeZero ? SIGN_MASK : 0n;
  const negative = value.numerator < 0n;
  const numerator = absoluteBigInt(value.numerator);
  const denominator = value.denominator;
  const exponent = floorLog2PositiveRational(numerator, denominator);
  let magnitudeBits: bigint;

  if (exponent < -1022) {
    const rounded = roundPositiveQuotientTiesToEven(numerator << 1074n, denominator);
    magnitudeBits = rounded >= 1n << 52n ? 1n << 52n : rounded;
  } else if (exponent > 1023) {
    magnitudeBits = POSITIVE_INFINITY_BITS;
  } else {
    const spacingExponent = exponent - 52;
    const scaledNumerator = spacingExponent < 0 ? numerator << BigInt(-spacingExponent) : numerator;
    const scaledDenominator =
      spacingExponent > 0 ? denominator << BigInt(spacingExponent) : denominator;
    let significand = roundPositiveQuotientTiesToEven(scaledNumerator, scaledDenominator);
    let roundedExponent = exponent;
    if (significand === 1n << 53n) {
      significand = 1n << 52n;
      roundedExponent += 1;
    }
    if (roundedExponent > 1023) {
      magnitudeBits = POSITIVE_INFINITY_BITS;
    } else {
      magnitudeBits = BigInt(roundedExponent + 1023) * (1n << 52n) + (significand - (1n << 52n));
    }
  }
  return magnitudeBits | (negative ? SIGN_MASK : 0n);
}

function exactOrdinaryResultBits(
  operation: "add" | "subtract" | "multiply" | "divide",
  firstBits: bigint,
  secondBits: bigint,
): bigint | undefined {
  const first = finiteRationalFromBits(firstBits);
  const second = finiteRationalFromBits(secondBits);
  if (first === undefined || second === undefined) return undefined;
  let exact: Rational | undefined;
  if (operation === "add") exact = addRational(first, second);
  else if (operation === "subtract") exact = subtractRational(first, second);
  else if (operation === "multiply") exact = multiplyRational(first, second);
  else exact = divideRational(first, second);
  if (exact === undefined) return undefined;

  let negativeZero = false;
  if (exact.numerator === 0n) {
    const firstNegative = (firstBits & SIGN_MASK) !== 0n;
    const effectiveSecondNegative =
      ((secondBits & SIGN_MASK) !== 0n) !== (operation === "subtract");
    if (operation === "multiply" || operation === "divide") {
      negativeZero = firstNegative !== ((secondBits & SIGN_MASK) !== 0n);
    } else {
      negativeZero =
        first.numerator === 0n &&
        second.numerator === 0n &&
        firstNegative &&
        effectiveSecondNegative;
    }
  }
  return roundRationalToBinary64Bits(exact, negativeZero);
}

function sqrtCellStrictlyContainsInputBits(inputBits: bigint, rootBits: bigint): boolean {
  if (
    inputBits === 0n ||
    (inputBits & SIGN_MASK) !== 0n ||
    rootBits <= 1n ||
    rootBits >= MAXIMUM_FINITE_BITS
  ) {
    return false;
  }
  const input = positiveRationalFromBits(inputBits);
  const previous = positiveRationalFromBits(rootBits - 1n);
  const current = positiveRationalFromBits(rootBits);
  const next = positiveRationalFromBits(rootBits + 1n);
  if (
    input === undefined ||
    previous === undefined ||
    current === undefined ||
    next === undefined
  ) {
    return false;
  }
  const lowerMidpoint = halfRational(addRational(previous, current));
  const upperMidpoint = halfRational(addRational(current, next));
  return (
    compareRational(squareRational(lowerMidpoint), input) < 0 &&
    compareRational(input, squareRational(upperMidpoint)) < 0
  );
}

function verifyPrimitiveHex(
  operation: "add" | "subtract" | "multiply" | "divide" | "sqrt",
  operands: readonly string[],
  result: string,
): boolean {
  if (!/^[0-9a-f]{16}$/.test(result) || operands.some((entry) => !/^[0-9a-f]{16}$/.test(entry))) {
    return false;
  }
  const operandBits = operands.map((entry) => BigInt(`0x${entry}`));
  const resultBits = BigInt(`0x${result}`);
  if (operation === "sqrt") {
    return (
      operandBits.length === 1 && sqrtCellStrictlyContainsInputBits(operandBits[0]!, resultBits)
    );
  }
  if (operandBits.length !== 2) return false;
  return exactOrdinaryResultBits(operation, operandBits[0]!, operandBits[1]!) === resultBits;
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

/**
 * Review hook for exact ordinary-operation and square-root boundary attacks.
 * It never executes accessors supplied by the caller.
 */
export function validatePairedTBinary64PrimitiveCandidate(candidate: unknown): string[] {
  const record = ownDataRecord(candidate, ["operation", "operands", "result"]);
  if (record === undefined) return ["binary64 primitive candidate has an invalid closed shape"];
  const operation = record["operation"];
  const operands = ownDataArray(record["operands"], 2);
  if (
    (operation !== "add" &&
      operation !== "subtract" &&
      operation !== "multiply" &&
      operation !== "divide" &&
      operation !== "sqrt") ||
    operands === undefined ||
    operands.some((entry) => typeof entry !== "string") ||
    typeof record["result"] !== "string"
  ) {
    return ["binary64 primitive candidate has an invalid closed shape"];
  }
  return verifyPrimitiveHex(operation, operands as string[], record["result"])
    ? []
    : ["binary64 primitive result is not the exact roundTiesToEven result"];
}

function verifyTraceNodeSemantics(node: PairedTExecutionTraceNodeCandidate): boolean {
  const operands = node.operand_binary64_hex;
  const resultBits = BigInt(`0x${node.result_binary64_hex}`);
  if (
    node.operation === "add" ||
    node.operation === "subtract" ||
    node.operation === "multiply" ||
    node.operation === "divide" ||
    node.operation === "sqrt"
  ) {
    return verifyPrimitiveHex(node.operation, operands, node.result_binary64_hex);
  }
  if (node.operation === "absolute") {
    return operands.length === 1 && (BigInt(`0x${operands[0]}`) & ~SIGN_MASK) === resultBits;
  }
  if (operands.length !== 2) return false;
  const first = numberFromBits(BigInt(`0x${operands[0]}`));
  const second = numberFromBits(BigInt(`0x${operands[1]}`));
  if (!Number.isFinite(first) || !Number.isFinite(second)) return false;
  const expected = first >= second ? BigInt(`0x${operands[0]}`) : BigInt(`0x${operands[1]}`);
  return expected === resultBits;
}

function runtimeIdentity(): PairedTRuntimeIdentityCandidate {
  return Object.freeze({
    runtime_family: process.release.name,
    runtime_version: process.version,
    engine_family: "v8" as const,
    engine_version: process.versions.v8,
    platform: process.platform,
    architecture: process.arch,
  });
}

const STARTUP_RUNTIME_IDENTITY = runtimeIdentity();

function intrinsicsUnchanged(): boolean {
  return (
    Math.sqrt === capturedMathSqrt &&
    Math.abs === capturedMathAbs &&
    Math.max === capturedMathMax &&
    ArrayBuffer === NativeArrayBuffer &&
    DataView === NativeDataView &&
    DataView.prototype.setFloat64 === dataViewSetFloat64 &&
    DataView.prototype.getFloat64 === dataViewGetFloat64 &&
    DataView.prototype.setBigUint64 === dataViewSetBigUint64 &&
    DataView.prototype.getBigUint64 === dataViewGetBigUint64 &&
    isDeepStrictEqual(runtimeIdentity(), STARTUP_RUNTIME_IDENTITY)
  );
}

function runDiagnosticSentinels(): DiagnosticResult {
  const failures: string[] = [];
  const vectors: Array<[string, number, string]> = [
    ["add_next", 1 + 2 ** -52, "3ff0000000000001"],
    ["add_subnormal", Number.MIN_VALUE + Number.MIN_VALUE, "0000000000000002"],
    ["subtract", 1 - 2 ** -52, "3feffffffffffffe"],
    ["multiply_subnormal", Number.MIN_VALUE * 1, "0000000000000001"],
    ["divide_tie_to_zero", Number.MIN_VALUE / 2, "0000000000000000"],
    ["divide_tenth", 1 / 10, "3fb999999999999a"],
    ["sqrt_two", reflectApply(capturedMathSqrt, Math, [2]) as number, "3ff6a09e667f3bcd"],
  ];
  for (const [label, value, expected] of vectors) {
    if (binary64HexCandidate(value) !== expected) failures.push(label);
  }
  const negativeZeroPassed = Object.is(-1 * 0, -0);
  const identityPassed = intrinsicsUnchanged();
  if (!negativeZeroPassed) failures.push("negative_zero");
  if (!identityPassed) failures.push("intrinsic_or_runtime_identity");
  const fingerprint = sha256Text(
    [
      ...vectors.map(([label, value]) => `${label}:${binary64HexCandidate(value)}`),
      `negative_zero:${String(negativeZeroPassed)}`,
      `intrinsic_and_runtime_identity:${String(identityPassed)}`,
    ].join("\n"),
  );
  return Object.freeze({
    passed: failures.length === 0,
    vectorCount: vectors.length + 2,
    failures: Object.freeze([...failures]),
    fingerprint,
  });
}

const STARTUP_DIAGNOSTIC = runDiagnosticSentinels();

function freezeNode(node: PairedTExecutionTraceNodeCandidate): PairedTExecutionTraceNodeCandidate {
  return Object.freeze({
    ...node,
    operand_sources: Object.freeze([...node.operand_sources]),
    operand_binary64_hex: Object.freeze([...node.operand_binary64_hex]),
  });
}

function traceDigest(trace: Omit<PairedTExecutionTraceCandidate, "sha256">): string {
  const hash = createHash("sha256");
  hash.update(`${trace.format}\n`, "utf8");
  hash.update(
    `${trace.input.degrees_of_freedom}|${trace.input.test_statistic_binary64_hex}\n`,
    "utf8",
  );
  hash.update(
    `${trace.normalization_constant.inverse_beta_binary64_hex}|${trace.normalization_constant.candidate_table_content_hash}\n`,
    "utf8",
  );
  hash.update(
    `${trace.runtime_identity.runtime_family}|${trace.runtime_identity.runtime_version}|${trace.runtime_identity.engine_family}|${trace.runtime_identity.engine_version}|${trace.runtime_identity.platform}|${trace.runtime_identity.architecture}\n`,
    "utf8",
  );
  hash.update(
    `${trace.proof_input.roundoff_gamma_index}|${trace.proof_input.accumulated_sum_gamma_index}|${trace.proof_input.next_term_gamma_index}|${trace.proof_input.series_remainder_multiplier}|${trace.proof_input.sqrt_rounding_cell_checks}|${trace.proof_input.truncation_relative_upper_bound_numerator}/${trace.proof_input.truncation_relative_upper_bound_denominator}|${trace.proof_input.relative_error_upper_bound_numerator}/${trace.proof_input.relative_error_upper_bound_denominator}\n`,
    "utf8",
  );
  hash.update(
    `${trace.outcome.branch}|${trace.outcome.iterations}|${trace.outcome.iteration_cap}|${trace.outcome.p_value_binary64_hex}|${String(trace.outcome.p_value_source_sequence)}|${trace.outcome.positive_series_remainder_binary64_hex}|${String(trace.outcome.positive_series_remainder_source_sequence)}\n`,
    "utf8",
  );
  hash.update(`${trace.node_count}|${trace.maximum_node_count}\n`, "utf8");
  for (const node of trace.nodes) {
    hash.update(
      `${node.sequence}|${node.label}|${node.operation}|${node.operand_sources.map(String).join(",")}|${node.operand_binary64_hex.join(",")}|${node.result_binary64_hex}\n`,
      "utf8",
    );
  }
  return `sha256:${hash.digest("hex")}`;
}

class TraceRecorder {
  private readonly nodes: PairedTExecutionTraceNodeCandidate[] = [];
  private readonly labels = new Set<string>();

  constructor(private readonly maximumNodes: number) {}

  literal(value: number, gammaIndex = 0): TrackedValue {
    return {
      value,
      gammaIndex,
      failures: [],
      sqrtChecks: new Set(),
      sourceSequence: null,
    };
  }

  private append(
    label: string,
    operation: PairedTTraceOperation,
    operands: readonly TrackedValue[],
    result: number,
  ): number {
    if (this.nodes.length >= this.maximumNodes) {
      throw new TraceResourceLimitError("candidate trace node limit reached");
    }
    if (this.labels.has(label)) throw new Error(`duplicate candidate trace label: ${label}`);
    const node = freezeNode({
      sequence: this.nodes.length + 1,
      label,
      operation,
      operand_sources: operands.map((entry) => entry.sourceSequence),
      operand_binary64_hex: operands.map((entry) => binary64HexCandidate(entry.value)),
      result_binary64_hex: binary64HexCandidate(result),
    });
    this.labels.add(label);
    this.nodes.push(node);
    return node.sequence;
  }

  absolute(input: TrackedValue, label: string): TrackedValue {
    const value = reflectApply(capturedMathAbs, Math, [input.value]) as number;
    return { ...input, value, sourceSequence: this.append(label, "absolute", [input], value) };
  }

  exactHalf(numerator: bigint, label: string): TrackedValue {
    const first = this.literal(Number(numerator));
    const second = this.literal(2);
    const value = first.value / second.value;
    return {
      value,
      gammaIndex: 0,
      failures: [],
      sqrtChecks: new Set(),
      sourceSequence: this.append(label, "divide", [first, second], value),
    };
  }

  exactAdd(first: TrackedValue, second: TrackedValue, label: string): TrackedValue {
    const value = first.value + second.value;
    return {
      value,
      gammaIndex: 0,
      failures: unique([...first.failures, ...second.failures]),
      sqrtChecks: new Set([...first.sqrtChecks, ...second.sqrtChecks]),
      sourceSequence: this.append(label, "add", [first, second], value),
    };
  }

  private rounded(
    value: number,
    gammaIndex: number | undefined,
    label: string,
    inputs: readonly TrackedValue[],
    operation: PairedTTraceOperation,
    extraValid = true,
    sqrtCheckLabel?: string,
  ): TrackedValue {
    const failures = unique(inputs.flatMap((entry) => entry.failures));
    if (!(value > MINIMUM_NORMAL) || !Number.isFinite(value)) failures.push(label);
    if (gammaIndex === undefined) failures.push(`${label}_roundoff_composition`);
    if (!extraValid) failures.push(`${label}_rounding_cell`);
    return {
      value,
      gammaIndex: gammaIndex ?? 0,
      failures: unique(failures),
      sqrtChecks: new Set([
        ...inputs.flatMap((entry) => [...entry.sqrtChecks]),
        ...(sqrtCheckLabel === undefined ? [] : [sqrtCheckLabel]),
      ]),
      sourceSequence: this.append(label, operation, inputs, value),
    };
  }

  multiply(first: TrackedValue, second: TrackedValue, label: string): TrackedValue {
    return this.rounded(
      first.value * second.value,
      composedGammaIndex("multiply", first.gammaIndex, second.gammaIndex),
      label,
      [first, second],
      "multiply",
    );
  }

  divide(first: TrackedValue, second: TrackedValue, label: string): TrackedValue {
    return this.rounded(
      first.value / second.value,
      composedGammaIndex("divide", first.gammaIndex, second.gammaIndex),
      label,
      [first, second],
      "divide",
    );
  }

  addPositive(first: TrackedValue, second: TrackedValue, label: string): TrackedValue {
    return this.rounded(
      first.value + second.value,
      composedGammaIndex("positive_add", first.gammaIndex, second.gammaIndex),
      label,
      [first, second],
      "add",
    );
  }

  subtractUntracked(first: TrackedValue, second: TrackedValue, label: string): TrackedValue {
    const value = first.value - second.value;
    return {
      value,
      gammaIndex: 0,
      failures: unique([...first.failures, ...second.failures]),
      sqrtChecks: new Set([...first.sqrtChecks, ...second.sqrtChecks]),
      sourceSequence: this.append(label, "subtract", [first, second], value),
    };
  }

  squareRoot(input: TrackedValue, label: string): TrackedValue {
    const root = reflectApply(capturedMathSqrt, Math, [input.value]) as number;
    return this.rounded(
      root,
      composedGammaIndex("square_root", input.gammaIndex),
      label,
      [input],
      "sqrt",
      sqrtCellStrictlyContainsInputBits(bits(input.value), bits(root)),
      label,
    );
  }

  maximum(first: TrackedValue, second: TrackedValue, label: string): TrackedValue {
    const value = reflectApply(capturedMathMax, Math, [first.value, second.value]) as number;
    return {
      value,
      gammaIndex: Math.max(first.gammaIndex, second.gammaIndex),
      failures: unique([...first.failures, ...second.failures]),
      sqrtChecks: new Set([...first.sqrtChecks, ...second.sqrtChecks]),
      sourceSequence: this.append(label, "maximum", [first, second], value),
    };
  }

  finalize(
    df: number,
    testStatistic: number,
    inverseBetaHex: string,
    graph: GraphProofSuccess,
  ): PairedTExecutionTraceCandidate {
    const nodes = Object.freeze([...this.nodes]);
    const withoutDigest: Omit<PairedTExecutionTraceCandidate, "sha256"> = {
      format: TRACE_FORMAT,
      input: Object.freeze({
        degrees_of_freedom: df,
        test_statistic_binary64_hex: binary64HexCandidate(testStatistic),
      }),
      normalization_constant: Object.freeze({
        inverse_beta_binary64_hex: inverseBetaHex,
        candidate_table_content_hash: REVIEWED_INVERSE_BETA_TABLE_CONTENT_HASH,
      }),
      runtime_identity: STARTUP_RUNTIME_IDENTITY,
      proof_input: Object.freeze({
        roundoff_gamma_index: graph.roundoffGammaIndex,
        accumulated_sum_gamma_index: graph.accumulatedSumGammaIndex,
        next_term_gamma_index: graph.nextTermGammaIndex,
        series_remainder_multiplier: graph.seriesRemainderMultiplier,
        sqrt_rounding_cell_checks: graph.sqrtRoundingCellChecks,
        truncation_relative_upper_bound_numerator:
          graph.truncationRelativeUpperBound.numerator.toString(),
        truncation_relative_upper_bound_denominator:
          graph.truncationRelativeUpperBound.denominator.toString(),
        relative_error_upper_bound_numerator: graph.relativeErrorUpperBound.numerator.toString(),
        relative_error_upper_bound_denominator:
          graph.relativeErrorUpperBound.denominator.toString(),
      }),
      outcome: Object.freeze({
        branch: graph.branch,
        iterations: graph.iterations,
        iteration_cap: graph.iterationCap,
        p_value_binary64_hex: binary64HexCandidate(graph.pValue),
        p_value_source_sequence: graph.pValueSourceSequence,
        positive_series_remainder_binary64_hex: binary64HexCandidate(graph.remainder),
        positive_series_remainder_source_sequence: graph.remainderSourceSequence,
      }),
      node_count: nodes.length,
      maximum_node_count: this.maximumNodes,
      nodes,
    };
    return Object.freeze({ ...withoutDigest, sha256: traceDigest(withoutDigest) });
  }
}

function unique(values: readonly string[]): string[] {
  return [...new Set(values)];
}

type RoundedOperation = "multiply" | "divide" | "positive_add" | "square_root";
const ONE_RATIONAL = { numerator: 1n, denominator: 1n } as const;
const UNIT_ROUNDOFF_RATIONAL = {
  numerator: 1n,
  denominator: UNIT_ROUNDOFF_DENOMINATOR,
} as const;

function largerRational(first: Rational, second: Rational): Rational {
  return compareRational(first, second) >= 0 ? first : second;
}

function gamma(index: number): Rational | undefined {
  if (!Number.isSafeInteger(index) || index < 0) return undefined;
  const factors = BigInt(index);
  return factors < UNIT_ROUNDOFF_DENOMINATOR
    ? { numerator: factors, denominator: UNIT_ROUNDOFF_DENOMINATOR - factors }
    : undefined;
}

function composedGammaIndex(
  operation: RoundedOperation,
  firstIndex: number,
  secondIndex = 0,
): number | undefined {
  const firstGamma = gamma(firstIndex);
  const secondGamma = gamma(secondIndex);
  if (firstGamma === undefined || secondGamma === undefined) return undefined;
  let upper: Rational;
  let lower: Rational;
  if (operation === "multiply") {
    upper = multiplyRational(
      addRational(ONE_RATIONAL, firstGamma),
      addRational(ONE_RATIONAL, secondGamma),
    );
    lower = multiplyRational(
      subtractRational(ONE_RATIONAL, firstGamma),
      subtractRational(ONE_RATIONAL, secondGamma),
    );
  } else if (operation === "divide") {
    const candidateUpper = divideRational(
      addRational(ONE_RATIONAL, firstGamma),
      subtractRational(ONE_RATIONAL, secondGamma),
    );
    const candidateLower = divideRational(
      subtractRational(ONE_RATIONAL, firstGamma),
      addRational(ONE_RATIONAL, secondGamma),
    );
    if (candidateUpper === undefined || candidateLower === undefined) return undefined;
    upper = candidateUpper;
    lower = candidateLower;
  } else {
    const inherited = largerRational(firstGamma, secondGamma);
    upper = addRational(ONE_RATIONAL, inherited);
    lower = subtractRational(ONE_RATIONAL, inherited);
  }
  const roundedUpper = multiplyRational(upper, addRational(ONE_RATIONAL, UNIT_ROUNDOFF_RATIONAL));
  const roundedLower = multiplyRational(
    lower,
    subtractRational(ONE_RATIONAL, UNIT_ROUNDOFF_RATIONAL),
  );
  const worst = largerRational(
    subtractRational(roundedUpper, ONE_RATIONAL),
    subtractRational(ONE_RATIONAL, roundedLower),
  );
  let candidate =
    operation === "positive_add" || operation === "square_root"
      ? Math.max(firstIndex, secondIndex) + 1
      : firstIndex + secondIndex + 1;
  const limit = candidate + 1024;
  while (candidate <= limit) {
    const bound = gamma(candidate);
    if (bound === undefined) return undefined;
    if (compareRational(bound, worst) >= 0) return candidate;
    candidate += 1;
  }
  return undefined;
}

function countSqrtChecks(inputs: readonly TrackedValue[]): number {
  return new Set(inputs.flatMap((entry) => [...entry.sqrtChecks])).size;
}

function integerPower(
  recorder: TraceRecorder,
  base: TrackedValue,
  exponent: number,
  label: string,
): TrackedValue {
  let accumulator = recorder.literal(1);
  let factor = base;
  let remaining = exponent;
  let step = 0;
  while (remaining > 0) {
    if (remaining % 2 === 1) {
      accumulator = recorder.multiply(accumulator, factor, `${label}.accumulate.${step}`);
    }
    remaining = Math.floor(remaining / 2);
    if (remaining > 0) factor = recorder.multiply(factor, factor, `${label}.square.${step}`);
    step += 1;
  }
  return accumulator;
}

function truncationRelativeBound(
  multiplier: number,
  sumFactors: number,
  nextTermFactors: number,
): Rational | undefined {
  if (
    !Number.isSafeInteger(multiplier) ||
    multiplier < 0 ||
    !Number.isSafeInteger(sumFactors) ||
    sumFactors < 0 ||
    !Number.isSafeInteger(nextTermFactors) ||
    nextTermFactors < 0
  ) {
    return undefined;
  }
  const sum = BigInt(sumFactors);
  const term = BigInt(nextTermFactors);
  if (sum >= UNIT_ROUNDOFF_DENOMINATOR || 2n * term >= UNIT_ROUNDOFF_DENOMINATOR) {
    return undefined;
  }
  return {
    numerator: BigInt(multiplier) * (UNIT_ROUNDOFF_DENOMINATOR - term),
    denominator: (UNIT_ROUNDOFF_DENOMINATOR - sum) * (UNIT_ROUNDOFF_DENOMINATOR - 2n * term),
  };
}

function lowerTailRelativeBound(
  core: TrackedValue,
  sum: TrackedValue,
  nextTerm: TrackedValue,
  multiplier: number,
): { relative: Rational; truncation: Rational } | undefined {
  const roundoff = gamma(core.gammaIndex);
  const truncation = truncationRelativeBound(multiplier, sum.gammaIndex, nextTerm.gammaIndex);
  if (roundoff === undefined || truncation === undefined) return undefined;
  return { relative: addRational(roundoff, truncation), truncation };
}

function centralComplementRelativeBound(
  pValue: number,
  core: TrackedValue,
  sum?: TrackedValue,
  nextTerm?: TrackedValue,
): { relative: Rational; truncation: Rational } | undefined {
  const roundoff = gamma(core.gammaIndex);
  const truncation =
    sum === undefined || nextTerm === undefined
      ? { numerator: 0n, denominator: 1n }
      : truncationRelativeBound(2, sum.gammaIndex, nextTerm.gammaIndex);
  if (roundoff === undefined || truncation === undefined) return undefined;
  const absolute = addRational(addRational(roundoff, truncation), UNIT_ROUNDOFF_RATIONAL);
  const pValueRational = positiveRationalFromBits(bits(pValue));
  if (pValueRational === undefined) return undefined;
  const lowerTruth = subtractRational(pValueRational, absolute);
  if (lowerTruth.numerator <= 0n) return undefined;
  const relative = divideRational(absolute, lowerTruth);
  return relative === undefined ? undefined : { relative, truncation };
}

function finite(values: readonly number[]): boolean {
  return values.every(Number.isFinite);
}

function graphSuccess(
  branch: string,
  pValue: TrackedValue,
  iterations: number,
  iterationCap: number,
  remainder: TrackedValue,
  relative: Rational,
  truncation: Rational,
  core: TrackedValue,
  sum: TrackedValue,
  nextTerm: TrackedValue,
  multiplier: number,
): GraphProofResult {
  if (
    !finite([pValue.value, remainder.value]) ||
    pValue.value < 0 ||
    pValue.value > 1 ||
    remainder.value < 0
  ) {
    return { ok: false, classification: "non_finite_candidate_intermediate" };
  }
  return {
    ok: true,
    branch,
    pValue: pValue.value,
    pValueSourceSequence: pValue.sourceSequence,
    iterations,
    iterationCap,
    remainder: remainder.value,
    remainderSourceSequence: remainder.sourceSequence,
    relativeErrorUpperBound: relative,
    truncationRelativeUpperBound: truncation,
    roundoffGammaIndex: core.gammaIndex,
    accumulatedSumGammaIndex: sum.gammaIndex,
    nextTermGammaIndex: nextTerm.gammaIndex,
    seriesRemainderMultiplier: multiplier,
    proofFailures: unique([...core.failures, ...sum.failures, ...nextTerm.failures]),
    sqrtRoundingCellChecks: countSqrtChecks([core, sum, nextTerm]),
  };
}

function executeTracedGraph(
  recorder: TraceRecorder,
  df: number,
  testStatistic: number,
  inverseBeta: number,
): GraphProofResult {
  const cap = 40 * df + 64;
  const inputT = recorder.literal(testStatistic);
  const absoluteT = recorder.absolute(inputT, "input.absolute_t");
  const zero = recorder.literal(0);
  if (absoluteT.value === 0) {
    return {
      ok: true,
      branch: "exact-zero",
      pValue: 1,
      pValueSourceSequence: null,
      iterations: 0,
      iterationCap: cap,
      remainder: 0,
      remainderSourceSequence: null,
      relativeErrorUpperBound: { numerator: 0n, denominator: 1n },
      truncationRelativeUpperBound: { numerator: 0n, denominator: 1n },
      roundoffGammaIndex: 0,
      accumulatedSumGammaIndex: 0,
      nextTermGammaIndex: 0,
      seriesRemainderMultiplier: 0,
      proofFailures: [],
      sqrtRoundingCellChecks: 0,
    };
  }

  const one = recorder.literal(1);
  const two = recorder.literal(2);
  const t = absoluteT;
  const inverse = recorder.literal(inverseBeta, 1);
  if (df === 2) {
    if (absoluteT.value <= 1) {
      const squared = recorder.multiply(t, t, "df2.central.squared_t");
      const rootInput = recorder.addPositive(two, squared, "df2.central.root_input");
      const root = recorder.squareRoot(rootInput, "df2.central.root");
      const quotient = recorder.divide(t, root, "df2.central.quotient");
      const pValue = recorder.subtractUntracked(one, quotient, "df2.central.p_value");
      const bound = centralComplementRelativeBound(pValue.value, quotient);
      if (bound === undefined) return { ok: false, classification: "truth_error_bound_not_finite" };
      return graphSuccess(
        "df2-central-closed-form",
        pValue,
        0,
        cap,
        zero,
        bound.relative,
        bound.truncation,
        quotient,
        zero,
        zero,
        0,
      );
    }
    const reciprocal = recorder.divide(one, t, "df2.tail.reciprocal");
    const squared = recorder.multiply(reciprocal, reciprocal, "df2.tail.squared_reciprocal");
    const scaled = recorder.multiply(two, squared, "df2.tail.scaled_reciprocal");
    const rootInput = recorder.addPositive(one, scaled, "df2.tail.root_input");
    const root = recorder.squareRoot(rootInput, "df2.tail.root");
    const rootPlusOne = recorder.addPositive(root, one, "df2.tail.root_plus_one");
    const denominator = recorder.multiply(root, rootPlusOne, "df2.tail.denominator");
    const pValue = recorder.divide(scaled, denominator, "df2.tail.p_value");
    const relative = gamma(pValue.gammaIndex);
    if (relative === undefined)
      return { ok: false, classification: "truth_error_bound_not_finite" };
    return graphSuccess(
      "df2-tail-closed-form",
      pValue,
      0,
      cap,
      zero,
      relative,
      { numerator: 0n, denominator: 1n },
      pValue,
      zero,
      zero,
      0,
    );
  }

  const halfDf = recorder.exactHalf(BigInt(df), "coefficient.half_df");
  const halfExponent = Math.floor(df / 2);
  if (absoluteT.value <= 1) {
    const squared = recorder.multiply(t, t, "central.squared_t");
    const denominator = recorder.addPositive(recorder.literal(df), squared, "central.denominator");
    const y = recorder.divide(squared, denominator, "central.y");
    const x = recorder.divide(recorder.literal(df), denominator, "central.x");
    let xPower = integerPower(recorder, x, halfExponent, "central.x_power");
    if (df % 2 === 1) {
      xPower = recorder.multiply(
        xPower,
        recorder.squareRoot(x, "central.sqrt_x"),
        "central.half_power",
      );
    }
    let prefactor = recorder.multiply(
      two,
      recorder.squareRoot(y, "central.sqrt_y"),
      "central.prefactor.sqrt",
    );
    prefactor = recorder.multiply(prefactor, xPower, "central.prefactor.power");
    prefactor = recorder.multiply(prefactor, inverse, "central.prefactor.inverse_beta");
    const ratioCoefficient = recorder.exactAdd(
      halfDf,
      recorder.literal(0.5),
      "central.ratio_ceiling.numerator_coefficient",
    );
    const ratioNumerator = recorder.multiply(
      y,
      ratioCoefficient,
      "central.ratio_ceiling.numerator",
    );
    const ratioCandidate = recorder.divide(
      ratioNumerator,
      recorder.literal(1.5),
      "central.ratio_ceiling.candidate",
    );
    const ratioCeiling = recorder.maximum(y, ratioCandidate, "central.ratio_ceiling.maximum");
    if (
      !finite([
        squared.value,
        denominator.value,
        y.value,
        x.value,
        xPower.value,
        prefactor.value,
        ratioCeiling.value,
      ])
    ) {
      return { ok: false, classification: "non_finite_candidate_intermediate" };
    }

    let term = one;
    let sum = one;
    for (let index = 0; index < cap; index += 1) {
      const label = `central.series.${index}`;
      let nextTerm = recorder.multiply(term, y, `${label}.term_y`);
      const numeratorHalf = recorder.exactAdd(
        halfDf,
        recorder.literal(0.5),
        `${label}.numerator_half`,
      );
      const numeratorCoefficient = recorder.exactAdd(
        numeratorHalf,
        recorder.literal(index),
        `${label}.numerator_index`,
      );
      nextTerm = recorder.multiply(nextTerm, numeratorCoefficient, `${label}.term_numerator`);
      const denominatorCoefficient = recorder.exactAdd(
        recorder.literal(1.5),
        recorder.literal(index),
        `${label}.denominator_index`,
      );
      nextTerm = recorder.divide(nextTerm, denominatorCoefficient, `${label}.term_divide`);
      const nextSum = recorder.addPositive(sum, nextTerm, `${label}.sum`);
      const remainderDenominator = recorder.subtractUntracked(
        one,
        ratioCeiling,
        `${label}.remainder_denominator`,
      );
      const mathematicalRemainder = recorder.divide(
        nextTerm,
        remainderDenominator,
        `${label}.mathematical_remainder`,
      );
      const resultRemainder = recorder.multiply(
        prefactor,
        mathematicalRemainder,
        `${label}.result_remainder`,
      );
      if (!finite([nextTerm.value, nextSum.value, resultRemainder.value])) {
        return { ok: false, classification: "non_finite_candidate_intermediate" };
      }
      if (nextSum.value === sum.value) {
        const core = recorder.multiply(prefactor, sum, "central.probability_core");
        const pValue = recorder.subtractUntracked(one, core, "central.p_value");
        const bound = centralComplementRelativeBound(pValue.value, core, sum, nextTerm);
        if (bound === undefined)
          return { ok: false, classification: "truth_error_bound_not_finite" };
        return graphSuccess(
          "central-complement-positive-series",
          pValue,
          index + 1,
          cap,
          resultRemainder,
          bound.relative,
          bound.truncation,
          core,
          sum,
          nextTerm,
          2,
        );
      }
      term = nextTerm;
      sum = nextSum;
    }
    return {
      ok: false,
      classification: "positive_series_iteration_cap_reached",
      iterationCap: cap,
    };
  }

  const reciprocal = recorder.divide(one, t, "tail.reciprocal");
  const squaredReciprocal = recorder.multiply(reciprocal, reciprocal, "tail.squared_reciprocal");
  const scaled = recorder.multiply(
    recorder.literal(df),
    squaredReciprocal,
    "tail.scaled_reciprocal",
  );
  const denominator = recorder.addPositive(one, scaled, "tail.denominator");
  const x = recorder.divide(scaled, denominator, "tail.x");
  let xPower = integerPower(recorder, x, halfExponent, "tail.x_power");
  if (df % 2 === 1) {
    const sqrtDf = recorder.squareRoot(recorder.literal(df), "tail.sqrt_df");
    const numerator = recorder.multiply(sqrtDf, reciprocal, "tail.stable_sqrt_x.numerator");
    const sqrtDenominator = recorder.squareRoot(denominator, "tail.sqrt_denominator");
    const stableSqrtX = recorder.divide(numerator, sqrtDenominator, "tail.stable_sqrt_x.divide");
    xPower = recorder.multiply(xPower, stableSqrtX, "tail.half_power");
  }
  let prefactor = recorder.multiply(xPower, inverse, "tail.prefactor.inverse_beta");
  prefactor = recorder.divide(prefactor, halfDf, "tail.prefactor.half_df");
  if (
    !finite([reciprocal.value, squaredReciprocal.value, x.value, xPower.value, prefactor.value])
  ) {
    return { ok: false, classification: "non_finite_candidate_intermediate" };
  }

  let term = one;
  let sum = one;
  for (let index = 0; index < cap; index += 1) {
    const label = `tail.series.${index}`;
    let nextTerm = recorder.multiply(term, x, `${label}.term_x`);
    const firstNumeratorCoefficient = recorder.exactAdd(
      halfDf,
      recorder.literal(index),
      `${label}.first_numerator_index`,
    );
    nextTerm = recorder.multiply(nextTerm, firstNumeratorCoefficient, `${label}.first_numerator`);
    const secondNumeratorCoefficient = recorder.exactAdd(
      recorder.literal(index),
      recorder.literal(0.5),
      `${label}.second_numerator_half`,
    );
    nextTerm = recorder.multiply(nextTerm, secondNumeratorCoefficient, `${label}.second_numerator`);
    const firstDenominatorIndex = recorder.exactAdd(
      halfDf,
      recorder.literal(index),
      `${label}.first_denominator_index`,
    );
    const firstDenominatorCoefficient = recorder.exactAdd(
      firstDenominatorIndex,
      one,
      `${label}.first_denominator_one`,
    );
    nextTerm = recorder.divide(nextTerm, firstDenominatorCoefficient, `${label}.first_divide`);
    const secondDenominatorCoefficient = recorder.exactAdd(
      recorder.literal(index),
      one,
      `${label}.second_denominator_one`,
    );
    nextTerm = recorder.divide(nextTerm, secondDenominatorCoefficient, `${label}.second_divide`);
    const nextSum = recorder.addPositive(sum, nextTerm, `${label}.sum`);
    const remainderDenominator = recorder.subtractUntracked(
      one,
      x,
      `${label}.remainder_denominator`,
    );
    const mathematicalRemainder = recorder.divide(
      nextTerm,
      remainderDenominator,
      `${label}.mathematical_remainder`,
    );
    const resultRemainder = recorder.multiply(
      prefactor,
      mathematicalRemainder,
      `${label}.result_remainder`,
    );
    if (!finite([nextTerm.value, nextSum.value, resultRemainder.value])) {
      return { ok: false, classification: "non_finite_candidate_intermediate" };
    }
    if (nextSum.value === sum.value) {
      const core = recorder.multiply(prefactor, sum, "tail.probability_core");
      const bound = lowerTailRelativeBound(core, sum, nextTerm, df + 1);
      if (bound === undefined) return { ok: false, classification: "truth_error_bound_not_finite" };
      return graphSuccess(
        "lower-tail-positive-series",
        core,
        index + 1,
        cap,
        resultRemainder,
        bound.relative,
        bound.truncation,
        core,
        sum,
        nextTerm,
        df + 1,
      );
    }
    term = nextTerm;
    sum = nextSum;
  }
  return { ok: false, classification: "positive_series_iteration_cap_reached", iterationCap: cap };
}

function ceilRational(value: Rational): bigint {
  if (value.numerator < 0n || value.denominator <= 0n) {
    throw new RangeError("candidate bound must be a non-negative rational");
  }
  return (value.numerator + value.denominator - 1n) / value.denominator;
}

function upwardBinary64(value: Rational): number {
  if (value.numerator === 0n) return 0;
  if (value.numerator < 0n || compareRational(value, { numerator: 1n, denominator: 2n }) >= 0) {
    throw new RangeError("candidate relative bound is outside [0, 0.5)");
  }
  let lowerBits = 0n;
  let upperBits = bits(0.5);
  while (lowerBits < upperBits) {
    const midpointBits = (lowerBits + upperBits) >> 1n;
    const midpoint = positiveRationalFromBits(midpointBits);
    if (midpoint === undefined) throw new TypeError("binary64 search reached a non-finite cell");
    if (compareRational(midpoint, value) >= 0) upperBits = midpointBits;
    else lowerBits = midpointBits + 1n;
  }
  return numberFromBits(lowerBits);
}

function parseTraceNode(value: unknown): PairedTExecutionTraceNodeCandidate | undefined {
  const record = ownDataRecord(value, [
    "sequence",
    "label",
    "operation",
    "operand_sources",
    "operand_binary64_hex",
    "result_binary64_hex",
  ]);
  if (record === undefined) return undefined;
  const sources = ownDataArray(record["operand_sources"], 2);
  const operands = ownDataArray(record["operand_binary64_hex"], 2);
  const operation = record["operation"];
  if (
    !Number.isSafeInteger(record["sequence"]) ||
    typeof record["label"] !== "string" ||
    record["label"].length > 128 ||
    !/^[a-z0-9_.]+$/.test(record["label"]) ||
    (operation !== "absolute" &&
      operation !== "add" &&
      operation !== "subtract" &&
      operation !== "multiply" &&
      operation !== "divide" &&
      operation !== "sqrt" &&
      operation !== "maximum") ||
    sources === undefined ||
    sources.some((entry) => entry !== null && !Number.isSafeInteger(entry)) ||
    operands === undefined ||
    operands.some((entry) => typeof entry !== "string" || !/^[0-9a-f]{16}$/.test(entry)) ||
    typeof record["result_binary64_hex"] !== "string" ||
    !/^[0-9a-f]{16}$/.test(record["result_binary64_hex"])
  ) {
    return undefined;
  }
  const arity = operation === "absolute" || operation === "sqrt" ? 1 : 2;
  if (sources.length !== arity || operands.length !== arity) return undefined;
  return {
    sequence: record["sequence"] as number,
    label: record["label"],
    operation,
    operand_sources: sources as (number | null)[],
    operand_binary64_hex: operands as string[],
    result_binary64_hex: record["result_binary64_hex"],
  };
}

function parseTrace(value: unknown): PairedTExecutionTraceCandidate | undefined {
  const record = ownDataRecord(value, [
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
  if (record === undefined || record["format"] !== TRACE_FORMAT) return undefined;
  const input = ownDataRecord(record["input"], [
    "degrees_of_freedom",
    "test_statistic_binary64_hex",
  ]);
  const normalization = ownDataRecord(record["normalization_constant"], [
    "inverse_beta_binary64_hex",
    "candidate_table_content_hash",
  ]);
  const runtime = ownDataRecord(record["runtime_identity"], [
    "runtime_family",
    "runtime_version",
    "engine_family",
    "engine_version",
    "platform",
    "architecture",
  ]);
  const proofInput = ownDataRecord(record["proof_input"], [
    "roundoff_gamma_index",
    "accumulated_sum_gamma_index",
    "next_term_gamma_index",
    "series_remainder_multiplier",
    "sqrt_rounding_cell_checks",
    "truncation_relative_upper_bound_numerator",
    "truncation_relative_upper_bound_denominator",
    "relative_error_upper_bound_numerator",
    "relative_error_upper_bound_denominator",
  ]);
  const outcome = ownDataRecord(record["outcome"], [
    "branch",
    "iterations",
    "iteration_cap",
    "p_value_binary64_hex",
    "p_value_source_sequence",
    "positive_series_remainder_binary64_hex",
    "positive_series_remainder_source_sequence",
  ]);
  const nodesRaw = ownDataArray(record["nodes"], PAIRED_T_SUPPORTED_EXECUTION_MAX_TRACE_NODES);
  if (
    input === undefined ||
    normalization === undefined ||
    runtime === undefined ||
    proofInput === undefined ||
    outcome === undefined ||
    nodesRaw === undefined ||
    !Number.isSafeInteger(input["degrees_of_freedom"]) ||
    typeof input["test_statistic_binary64_hex"] !== "string" ||
    !/^[0-9a-f]{16}$/.test(input["test_statistic_binary64_hex"]) ||
    typeof normalization["inverse_beta_binary64_hex"] !== "string" ||
    !/^[0-9a-f]{16}$/.test(normalization["inverse_beta_binary64_hex"]) ||
    normalization["candidate_table_content_hash"] !== REVIEWED_INVERSE_BETA_TABLE_CONTENT_HASH ||
    typeof runtime["runtime_family"] !== "string" ||
    runtime["runtime_family"].length > 128 ||
    typeof runtime["runtime_version"] !== "string" ||
    runtime["runtime_version"].length > 128 ||
    runtime["engine_family"] !== "v8" ||
    typeof runtime["engine_version"] !== "string" ||
    runtime["engine_version"].length > 128 ||
    typeof runtime["platform"] !== "string" ||
    runtime["platform"].length > 64 ||
    typeof runtime["architecture"] !== "string" ||
    runtime["architecture"].length > 64 ||
    !Number.isSafeInteger(proofInput["roundoff_gamma_index"]) ||
    (proofInput["roundoff_gamma_index"] as number) < 0 ||
    !Number.isSafeInteger(proofInput["accumulated_sum_gamma_index"]) ||
    (proofInput["accumulated_sum_gamma_index"] as number) < 0 ||
    !Number.isSafeInteger(proofInput["next_term_gamma_index"]) ||
    (proofInput["next_term_gamma_index"] as number) < 0 ||
    !Number.isSafeInteger(proofInput["series_remainder_multiplier"]) ||
    (proofInput["series_remainder_multiplier"] as number) < 0 ||
    !Number.isSafeInteger(proofInput["sqrt_rounding_cell_checks"]) ||
    (proofInput["sqrt_rounding_cell_checks"] as number) < 0 ||
    typeof proofInput["truncation_relative_upper_bound_numerator"] !== "string" ||
    !/^[0-9]{1,10000}$/.test(proofInput["truncation_relative_upper_bound_numerator"]) ||
    typeof proofInput["truncation_relative_upper_bound_denominator"] !== "string" ||
    !/^[1-9][0-9]{0,9999}$/.test(proofInput["truncation_relative_upper_bound_denominator"]) ||
    typeof proofInput["relative_error_upper_bound_numerator"] !== "string" ||
    !/^[0-9]{1,10000}$/.test(proofInput["relative_error_upper_bound_numerator"]) ||
    typeof proofInput["relative_error_upper_bound_denominator"] !== "string" ||
    !/^[1-9][0-9]{0,9999}$/.test(proofInput["relative_error_upper_bound_denominator"]) ||
    typeof outcome["branch"] !== "string" ||
    outcome["branch"].length > 64 ||
    !Number.isSafeInteger(outcome["iterations"]) ||
    !Number.isSafeInteger(outcome["iteration_cap"]) ||
    typeof outcome["p_value_binary64_hex"] !== "string" ||
    !/^[0-9a-f]{16}$/.test(outcome["p_value_binary64_hex"]) ||
    (outcome["p_value_source_sequence"] !== null &&
      !Number.isSafeInteger(outcome["p_value_source_sequence"])) ||
    typeof outcome["positive_series_remainder_binary64_hex"] !== "string" ||
    !/^[0-9a-f]{16}$/.test(outcome["positive_series_remainder_binary64_hex"]) ||
    (outcome["positive_series_remainder_source_sequence"] !== null &&
      !Number.isSafeInteger(outcome["positive_series_remainder_source_sequence"])) ||
    !Number.isSafeInteger(record["node_count"]) ||
    !Number.isSafeInteger(record["maximum_node_count"]) ||
    typeof record["sha256"] !== "string" ||
    !/^sha256:[0-9a-f]{64}$/.test(record["sha256"])
  ) {
    return undefined;
  }
  const nodes = nodesRaw.map(parseTraceNode);
  if (nodes.some((entry) => entry === undefined)) return undefined;
  return {
    format: TRACE_FORMAT,
    input: input as PairedTExecutionTraceCandidate["input"],
    normalization_constant:
      normalization as PairedTExecutionTraceCandidate["normalization_constant"],
    runtime_identity: runtime as unknown as PairedTRuntimeIdentityCandidate,
    proof_input: proofInput as PairedTExecutionTraceCandidate["proof_input"],
    outcome: outcome as PairedTExecutionTraceCandidate["outcome"],
    node_count: record["node_count"] as number,
    maximum_node_count: record["maximum_node_count"] as number,
    sha256: record["sha256"],
    nodes: nodes as PairedTExecutionTraceNodeCandidate[],
  };
}

type ExpectedTraceStep = readonly [label: string, operation: PairedTTraceOperation];

function appendExpectedPowerSteps(
  steps: ExpectedTraceStep[],
  exponent: bigint,
  label: string,
): void {
  let remaining = exponent;
  let step = 0;
  while (remaining > 0n) {
    if ((remaining & 1n) === 1n) steps.push([`${label}.accumulate.${step}`, "multiply"]);
    remaining >>= 1n;
    if (remaining > 0n) steps.push([`${label}.square.${step}`, "multiply"]);
    step += 1;
  }
}

function expectedTraceSchedule(trace: PairedTExecutionTraceCandidate):
  | {
      steps: ExpectedTraceStep[];
      pValueLabel: string | null;
      remainderLabel: string | null;
      inverseBetaLabel: string | null;
    }
  | undefined {
  const df = trace.input.degrees_of_freedom;
  const testStatistic = numberFromBits(BigInt(`0x${trace.input.test_statistic_binary64_hex}`));
  if (
    !Number.isInteger(df) ||
    df < 1 ||
    df > 200 ||
    !Number.isFinite(testStatistic) ||
    Object.is(testStatistic, -0)
  ) {
    return undefined;
  }
  const absoluteT = reflectApply(capturedMathAbs, Math, [testStatistic]) as number;
  const cap = Number(40n * BigInt(df) + 64n);
  if (trace.outcome.iteration_cap !== cap) return undefined;
  const steps: ExpectedTraceStep[] = [["input.absolute_t", "absolute"]];
  if (absoluteT === 0) {
    return trace.outcome.branch === "exact-zero" && trace.outcome.iterations === 0
      ? { steps, pValueLabel: null, remainderLabel: null, inverseBetaLabel: null }
      : undefined;
  }
  if (df === 2) {
    if (trace.outcome.iterations !== 0) return undefined;
    if (absoluteT <= 1) {
      if (trace.outcome.branch !== "df2-central-closed-form") return undefined;
      steps.push(
        ["df2.central.squared_t", "multiply"],
        ["df2.central.root_input", "add"],
        ["df2.central.root", "sqrt"],
        ["df2.central.quotient", "divide"],
        ["df2.central.p_value", "subtract"],
      );
      return {
        steps,
        pValueLabel: "df2.central.p_value",
        remainderLabel: null,
        inverseBetaLabel: null,
      };
    }
    if (trace.outcome.branch !== "df2-tail-closed-form") return undefined;
    steps.push(
      ["df2.tail.reciprocal", "divide"],
      ["df2.tail.squared_reciprocal", "multiply"],
      ["df2.tail.scaled_reciprocal", "multiply"],
      ["df2.tail.root_input", "add"],
      ["df2.tail.root", "sqrt"],
      ["df2.tail.root_plus_one", "add"],
      ["df2.tail.denominator", "multiply"],
      ["df2.tail.p_value", "divide"],
    );
    return {
      steps,
      pValueLabel: "df2.tail.p_value",
      remainderLabel: null,
      inverseBetaLabel: null,
    };
  }
  if (
    trace.outcome.iterations < 1 ||
    trace.outcome.iterations > cap ||
    !Number.isSafeInteger(trace.outcome.iterations)
  ) {
    return undefined;
  }
  steps.push(["coefficient.half_df", "divide"]);
  const exponent = BigInt(df) >> 1n;
  if (absoluteT <= 1) {
    if (trace.outcome.branch !== "central-complement-positive-series") return undefined;
    steps.push(
      ["central.squared_t", "multiply"],
      ["central.denominator", "add"],
      ["central.y", "divide"],
      ["central.x", "divide"],
    );
    appendExpectedPowerSteps(steps, exponent, "central.x_power");
    if ((BigInt(df) & 1n) === 1n) {
      steps.push(["central.sqrt_x", "sqrt"], ["central.half_power", "multiply"]);
    }
    steps.push(
      ["central.sqrt_y", "sqrt"],
      ["central.prefactor.sqrt", "multiply"],
      ["central.prefactor.power", "multiply"],
      ["central.prefactor.inverse_beta", "multiply"],
      ["central.ratio_ceiling.numerator_coefficient", "add"],
      ["central.ratio_ceiling.numerator", "multiply"],
      ["central.ratio_ceiling.candidate", "divide"],
      ["central.ratio_ceiling.maximum", "maximum"],
    );
    for (let index = 0; index < trace.outcome.iterations; index += 1) {
      const label = `central.series.${index}`;
      steps.push(
        [`${label}.term_y`, "multiply"],
        [`${label}.numerator_half`, "add"],
        [`${label}.numerator_index`, "add"],
        [`${label}.term_numerator`, "multiply"],
        [`${label}.denominator_index`, "add"],
        [`${label}.term_divide`, "divide"],
        [`${label}.sum`, "add"],
        [`${label}.remainder_denominator`, "subtract"],
        [`${label}.mathematical_remainder`, "divide"],
        [`${label}.result_remainder`, "multiply"],
      );
    }
    steps.push(["central.probability_core", "multiply"], ["central.p_value", "subtract"]);
    return {
      steps,
      pValueLabel: "central.p_value",
      remainderLabel: `central.series.${trace.outcome.iterations - 1}.result_remainder`,
      inverseBetaLabel: "central.prefactor.inverse_beta",
    };
  }
  if (trace.outcome.branch !== "lower-tail-positive-series") return undefined;
  steps.push(
    ["tail.reciprocal", "divide"],
    ["tail.squared_reciprocal", "multiply"],
    ["tail.scaled_reciprocal", "multiply"],
    ["tail.denominator", "add"],
    ["tail.x", "divide"],
  );
  appendExpectedPowerSteps(steps, exponent, "tail.x_power");
  if ((BigInt(df) & 1n) === 1n) {
    steps.push(
      ["tail.sqrt_df", "sqrt"],
      ["tail.stable_sqrt_x.numerator", "multiply"],
      ["tail.sqrt_denominator", "sqrt"],
      ["tail.stable_sqrt_x.divide", "divide"],
      ["tail.half_power", "multiply"],
    );
  }
  steps.push(["tail.prefactor.inverse_beta", "multiply"], ["tail.prefactor.half_df", "divide"]);
  for (let index = 0; index < trace.outcome.iterations; index += 1) {
    const label = `tail.series.${index}`;
    steps.push(
      [`${label}.term_x`, "multiply"],
      [`${label}.first_numerator_index`, "add"],
      [`${label}.first_numerator`, "multiply"],
      [`${label}.second_numerator_half`, "add"],
      [`${label}.second_numerator`, "multiply"],
      [`${label}.first_denominator_index`, "add"],
      [`${label}.first_denominator_one`, "add"],
      [`${label}.first_divide`, "divide"],
      [`${label}.second_denominator_one`, "add"],
      [`${label}.second_divide`, "divide"],
      [`${label}.sum`, "add"],
      [`${label}.remainder_denominator`, "subtract"],
      [`${label}.mathematical_remainder`, "divide"],
      [`${label}.result_remainder`, "multiply"],
    );
  }
  steps.push(["tail.probability_core", "multiply"]);
  return {
    steps,
    pValueLabel: "tail.probability_core",
    remainderLabel: `tail.series.${trace.outcome.iterations - 1}.result_remainder`,
    inverseBetaLabel: "tail.prefactor.inverse_beta",
  };
}

function isExactCoefficientTraceNode(node: PairedTExecutionTraceNodeCandidate): boolean {
  return (
    node.label === "coefficient.half_df" ||
    node.label === "central.ratio_ceiling.numerator_coefficient" ||
    node.label.endsWith(".numerator_half") ||
    node.label.endsWith(".numerator_index") ||
    node.label.endsWith(".denominator_index") ||
    node.label.endsWith(".first_numerator_index") ||
    node.label.endsWith(".second_numerator_half") ||
    node.label.endsWith(".first_denominator_index") ||
    node.label.endsWith(".first_denominator_one") ||
    node.label.endsWith(".second_denominator_one")
  );
}

function traceNodeGammaIndex(
  node: PairedTExecutionTraceNodeCandidate,
  operandGammaIndices: readonly number[],
): number | undefined {
  const first = operandGammaIndices[0] ?? 0;
  const second = operandGammaIndices[1] ?? 0;
  if (node.operation === "absolute" || node.operation === "subtract") return 0;
  if (node.operation === "maximum") return Math.max(first, second);
  if (isExactCoefficientTraceNode(node)) return 0;
  if (node.operation === "add") return composedGammaIndex("positive_add", first, second);
  if (node.operation === "multiply") return composedGammaIndex("multiply", first, second);
  if (node.operation === "divide") return composedGammaIndex("divide", first, second);
  return composedGammaIndex("square_root", first);
}

function expectedProofInputFromTrace(
  trace: PairedTExecutionTraceCandidate,
  gammaByLabel: ReadonlyMap<string, number>,
  sqrtChecks: number,
): PairedTExecutionTraceCandidate["proof_input"] | undefined {
  const branch = trace.outcome.branch;
  let coreLabel: string | null;
  let sumLabel: string | null = null;
  let nextTermLabel: string | null = null;
  let multiplier = 0;
  if (branch === "exact-zero") coreLabel = null;
  else if (branch === "df2-central-closed-form") coreLabel = "df2.central.quotient";
  else if (branch === "df2-tail-closed-form") coreLabel = "df2.tail.p_value";
  else if (branch === "central-complement-positive-series") {
    coreLabel = "central.probability_core";
    sumLabel =
      trace.outcome.iterations === 1 ? null : `central.series.${trace.outcome.iterations - 2}.sum`;
    nextTermLabel = `central.series.${trace.outcome.iterations - 1}.term_divide`;
    multiplier = 2;
  } else if (branch === "lower-tail-positive-series") {
    coreLabel = "tail.probability_core";
    sumLabel =
      trace.outcome.iterations === 1 ? null : `tail.series.${trace.outcome.iterations - 2}.sum`;
    nextTermLabel = `tail.series.${trace.outcome.iterations - 1}.second_divide`;
    multiplier = trace.input.degrees_of_freedom + 1;
  } else return undefined;
  const core = coreLabel === null ? 0 : gammaByLabel.get(coreLabel);
  const sum = sumLabel === null ? 0 : gammaByLabel.get(sumLabel);
  const nextTerm = nextTermLabel === null ? 0 : gammaByLabel.get(nextTermLabel);
  if (core === undefined || sum === undefined || nextTerm === undefined) return undefined;
  let truncation: Rational = { numerator: 0n, denominator: 1n };
  let relative: Rational;
  if (branch === "exact-zero") {
    relative = { numerator: 0n, denominator: 1n };
  } else if (
    branch === "df2-central-closed-form" ||
    branch === "central-complement-positive-series"
  ) {
    const roundoff = gamma(core);
    if (roundoff === undefined) return undefined;
    if (branch === "central-complement-positive-series") {
      const candidateTruncation = truncationRelativeBound(multiplier, sum, nextTerm);
      if (candidateTruncation === undefined) return undefined;
      truncation = candidateTruncation;
    }
    const absolute = addRational(addRational(roundoff, truncation), UNIT_ROUNDOFF_RATIONAL);
    const pValue = positiveRationalFromBits(BigInt(`0x${trace.outcome.p_value_binary64_hex}`));
    if (pValue === undefined) return undefined;
    const lowerTruth = subtractRational(pValue, absolute);
    if (lowerTruth.numerator <= 0n) return undefined;
    const candidateRelative = divideRational(absolute, lowerTruth);
    if (candidateRelative === undefined) return undefined;
    relative = candidateRelative;
  } else {
    const roundoff = gamma(core);
    if (roundoff === undefined) return undefined;
    if (branch === "lower-tail-positive-series") {
      const candidateTruncation = truncationRelativeBound(multiplier, sum, nextTerm);
      if (candidateTruncation === undefined) return undefined;
      truncation = candidateTruncation;
    }
    relative = addRational(roundoff, truncation);
  }
  return {
    roundoff_gamma_index: core,
    accumulated_sum_gamma_index: sum,
    next_term_gamma_index: nextTerm,
    series_remainder_multiplier: multiplier,
    sqrt_rounding_cell_checks: sqrtChecks,
    truncation_relative_upper_bound_numerator: truncation.numerator.toString(),
    truncation_relative_upper_bound_denominator: truncation.denominator.toString(),
    relative_error_upper_bound_numerator: relative.numerator.toString(),
    relative_error_upper_bound_denominator: relative.denominator.toString(),
  };
}

/** Validate trace structure, dependency binding, digest, and every primitive result. */
export function verifyPairedTExecutionTraceCandidate(
  candidate: unknown,
): PairedTExecutionTraceVerificationCandidate {
  const errors: string[] = [];
  let ordinaryArithmeticChecks = 0;
  let squareRootChecks = 0;
  let exactSelectionChecks = 0;
  const trace = parseTrace(candidate);
  if (trace === undefined) {
    return {
      ok: false,
      errors: ["candidate trace has an invalid closed shape"],
      ordinaryArithmeticChecks,
      squareRootChecks,
      exactSelectionChecks,
    };
  }
  if (
    trace.node_count !== trace.nodes.length ||
    trace.maximum_node_count < trace.node_count ||
    trace.maximum_node_count > PAIRED_T_SUPPORTED_EXECUTION_MAX_TRACE_NODES
  ) {
    errors.push("candidate trace node counts are invalid");
  }
  const schedule = expectedTraceSchedule(trace);
  if (schedule === undefined || schedule.steps.length !== trace.nodes.length) {
    errors.push("candidate trace does not match the closed branch and iteration schedule");
  }
  if (!isDeepStrictEqual(trace.runtime_identity, STARTUP_RUNTIME_IDENTITY)) {
    errors.push("candidate trace runtime identity differs from the executing runtime");
  }
  const reviewedCell = lookupReviewedInverseBetaCandidateCell(trace.input.degrees_of_freedom);
  if (
    reviewedCell === undefined ||
    reviewedCell.hex !== trace.normalization_constant.inverse_beta_binary64_hex
  ) {
    errors.push("candidate trace does not bind the reviewed inverse-beta table cell");
  }
  const labels = new Set<string>();
  const results = new Map<number, string>();
  const gammaBySequence = new Map<number, number>();
  const gammaByLabel = new Map<string, number>();
  for (let index = 0; index < trace.nodes.length; index += 1) {
    const node = trace.nodes[index]!;
    const expected = schedule?.steps[index];
    if (expected === undefined || node.label !== expected[0] || node.operation !== expected[1]) {
      errors.push(`trace node ${index + 1} differs from the closed operation schedule`);
    }
    if (node.sequence !== index + 1) errors.push(`trace node ${index + 1} is out of sequence`);
    if (labels.has(node.label))
      errors.push(`trace node ${index + 1} duplicates an operation label`);
    labels.add(node.label);
    for (let operand = 0; operand < node.operand_sources.length; operand += 1) {
      const source = node.operand_sources[operand];
      if (source === undefined) {
        errors.push(`trace node ${node.sequence} has an invalid operand dependency`);
      } else if (source !== null) {
        if (source >= node.sequence || results.get(source) !== node.operand_binary64_hex[operand]) {
          errors.push(`trace node ${node.sequence} has an invalid operand dependency`);
        }
      }
    }
    if (!verifyTraceNodeSemantics(node)) {
      errors.push(`trace node ${node.sequence} fails exact primitive verification`);
    }
    const operandGammaIndices = node.operand_sources.map((source, operandIndex) => {
      if (source === null) {
        return (node.label === "central.prefactor.inverse_beta" ||
          node.label === "tail.prefactor.inverse_beta") &&
          operandIndex === 1
          ? 1
          : 0;
      }
      return gammaBySequence.get(source) ?? -1;
    });
    const nodeGammaIndex = traceNodeGammaIndex(node, operandGammaIndices);
    if (operandGammaIndices.some((entry) => entry < 0) || nodeGammaIndex === undefined) {
      errors.push(`trace node ${node.sequence} has an invalid proof-index dependency`);
    } else {
      gammaBySequence.set(node.sequence, nodeGammaIndex);
      gammaByLabel.set(node.label, nodeGammaIndex);
    }
    if (
      node.operation === "add" ||
      node.operation === "subtract" ||
      node.operation === "multiply" ||
      node.operation === "divide"
    ) {
      ordinaryArithmeticChecks += 1;
    } else if (node.operation === "sqrt") squareRootChecks += 1;
    else exactSelectionChecks += 1;
    results.set(node.sequence, node.result_binary64_hex);
  }
  const expectedProofInput = expectedProofInputFromTrace(trace, gammaByLabel, squareRootChecks);
  if (
    expectedProofInput === undefined ||
    !isDeepStrictEqual(trace.proof_input, expectedProofInput)
  ) {
    errors.push("candidate trace proof inputs differ from the independently reconstructed indices");
  }
  const firstNode = trace.nodes[0];
  if (
    firstNode === undefined ||
    firstNode.operand_sources[0] !== null ||
    firstNode.operand_binary64_hex[0] !== trace.input.test_statistic_binary64_hex
  ) {
    errors.push("candidate trace input bits are not bound to the first operation");
  }
  const pSource = trace.outcome.p_value_source_sequence;
  if (pSource === null) {
    if (
      trace.outcome.branch !== "exact-zero" ||
      trace.outcome.p_value_binary64_hex !== "3ff0000000000000"
    ) {
      errors.push("candidate trace has an unbound returned p-value");
    }
  } else if (results.get(pSource) !== trace.outcome.p_value_binary64_hex) {
    errors.push("candidate trace returned p-value does not match its source node");
  }
  if (
    schedule?.pValueLabel !== null &&
    (pSource === null || trace.nodes[pSource - 1]?.label !== schedule?.pValueLabel)
  ) {
    errors.push("candidate trace returned p-value source differs from the closed schedule");
  }
  const remainderSource = trace.outcome.positive_series_remainder_source_sequence;
  if (remainderSource === null) {
    if (trace.outcome.positive_series_remainder_binary64_hex !== "0000000000000000") {
      errors.push("candidate trace has an unbound remainder value");
    }
  } else if (
    results.get(remainderSource) !== trace.outcome.positive_series_remainder_binary64_hex
  ) {
    errors.push("candidate trace remainder does not match its source node");
  }
  if (
    schedule?.remainderLabel !== null &&
    (remainderSource === null ||
      trace.nodes[remainderSource - 1]?.label !== schedule?.remainderLabel)
  ) {
    errors.push("candidate trace remainder source differs from the closed schedule");
  }
  const inverseBetaLabel = schedule?.inverseBetaLabel;
  if (typeof inverseBetaLabel === "string") {
    const inverseNode = trace.nodes.find((node) => node.label === inverseBetaLabel);
    if (
      inverseNode === undefined ||
      inverseNode.operand_binary64_hex[1] !== trace.normalization_constant.inverse_beta_binary64_hex
    ) {
      errors.push("candidate trace graph does not consume the bound inverse-beta table cell");
    }
  }
  const { sha256: declaredDigest, ...withoutDigest } = trace;
  if (traceDigest(withoutDigest) !== declaredDigest) errors.push("candidate trace digest differs");
  return errors.length === 0
    ? {
        ok: true,
        errors: [],
        ordinaryArithmeticChecks,
        squareRootChecks,
        exactSelectionChecks,
      }
    : {
        ok: false,
        errors: unique(errors),
        ordinaryArithmeticChecks,
        squareRootChecks,
        exactSelectionChecks,
      };
}

function refusal(
  classification: Extract<
    PairedTSupportedExecutionCandidateResult,
    { ok: false }
  >["classification"],
  extra: Partial<Extract<PairedTSupportedExecutionCandidateResult, { ok: false }>> = {},
): PairedTSupportedExecutionCandidateResult {
  return {
    ok: false,
    status: "non_authoritative_candidate_refusal",
    classification,
    supportedExecutionPredicateSatisfied: false,
    supportedPlatformClaimed: false,
    runtimeSupportClaimed: false,
    supportedDomainClaimed: false,
    ...extra,
  };
}

function evaluateWithTraceLimit(
  input: unknown,
  maximumTraceNodes: number,
): PairedTSupportedExecutionCandidateResult {
  const parsed = parsePairedTCandidateEvaluationInput(input);
  if (parsed === undefined) {
    return refusal("runtime_graph_refusal", { graphClassification: "invalid_candidate_input" });
  }
  const { degreesOfFreedom: df, testStatistic } = parsed;
  if (
    !Number.isInteger(df) ||
    df < 1 ||
    !Number.isFinite(testStatistic) ||
    Object.is(testStatistic, -0)
  ) {
    return refusal("runtime_graph_refusal", { graphClassification: "invalid_candidate_input" });
  }
  if (df > 200) {
    return refusal("runtime_graph_refusal", {
      graphClassification: "outside_evidence_evaluation_range",
    });
  }
  const tableCell = lookupReviewedInverseBetaCandidateCell(df);
  if (tableCell === undefined) return refusal("candidate_constant_table_unavailable");

  const preInvocation = runDiagnosticSentinels();
  if (!STARTUP_DIAGNOSTIC.passed || !preInvocation.passed) {
    return refusal("execution_diagnostic_failed", {
      diagnosticFailures: [
        ...STARTUP_DIAGNOSTIC.failures.map((entry) => `startup:${entry}`),
        ...preInvocation.failures.map((entry) => `pre_invocation:${entry}`),
      ],
    });
  }
  const recorder = new TraceRecorder(maximumTraceNodes);
  let graph: GraphProofResult;
  try {
    graph = executeTracedGraph(recorder, df, testStatistic, tableCell.value);
  } catch (error) {
    const postInvocation = runDiagnosticSentinels();
    if (!postInvocation.passed) {
      return refusal("execution_diagnostic_failed", {
        diagnosticFailures: postInvocation.failures.map((entry) => `post_invocation:${entry}`),
      });
    }
    return refusal(
      error instanceof TraceResourceLimitError
        ? "execution_trace_resource_bound_exceeded"
        : "execution_trace_verification_failed",
      error instanceof TraceResourceLimitError
        ? {}
        : { traceErrors: [error instanceof Error ? error.message : "candidate trace failure"] },
    );
  }
  const postInvocation = runDiagnosticSentinels();
  if (!postInvocation.passed) {
    return refusal("execution_diagnostic_failed", {
      diagnosticFailures: postInvocation.failures.map((entry) => `post_invocation:${entry}`),
    });
  }
  if (!graph.ok) {
    if (graph.classification === "truth_error_bound_not_finite") {
      return refusal("truth_error_bound_not_finite");
    }
    return refusal("runtime_graph_refusal", { graphClassification: graph.classification });
  }
  const trace = recorder.finalize(df, testStatistic, tableCell.hex, graph);
  const verification = verifyPairedTExecutionTraceCandidate(trace);
  if (!verification.ok) {
    return refusal("execution_trace_verification_failed", { traceErrors: verification.errors });
  }
  if (graph.proofFailures.length > 0) {
    return refusal("truth_error_proof_precondition_failed", {
      proofFailures: graph.proofFailures,
    });
  }
  const tracedRelativeErrorUpperBound: Rational = {
    numerator: BigInt(trace.proof_input.relative_error_upper_bound_numerator),
    denominator: BigInt(trace.proof_input.relative_error_upper_bound_denominator),
  };
  const tracedTruncationRelativeUpperBound: Rational = {
    numerator: BigInt(trace.proof_input.truncation_relative_upper_bound_numerator),
    denominator: BigInt(trace.proof_input.truncation_relative_upper_bound_denominator),
  };
  const relativeBelowHalf =
    compareRational(tracedRelativeErrorUpperBound, { numerator: 1n, denominator: 2n }) < 0;
  const boundBigInt =
    graph.branch === "exact-zero"
      ? 0n
      : ceilRational(
          addRational(
            multiplyRational(tracedRelativeErrorUpperBound, {
              numerator: ULP_CONVERSION_FACTOR,
              denominator: 1n,
            }),
            ONE_RATIONAL,
          ),
        );
  if (
    tracedRelativeErrorUpperBound.numerator < 0n ||
    !relativeBelowHalf ||
    boundBigInt > BigInt(Number.MAX_SAFE_INTEGER)
  ) {
    return refusal("truth_error_bound_not_finite");
  }
  const bound = Number(boundBigInt);
  const margin = evaluateProjectionMarginCandidate(graph.pValue, boundBigInt);
  if (margin.status !== "candidate_stable_for_supplied_bound") {
    return refusal("projection_margin_not_established", { candidateTruthErrorBoundUlp: bound });
  }
  return {
    ok: true,
    status: "non_authoritative_supported_execution_evaluation",
    branch: graph.branch,
    pValue: graph.pValue,
    pValueBinary64Hex: binary64HexCandidate(graph.pValue),
    iterations: graph.iterations,
    iterationCap: graph.iterationCap,
    positiveSeriesRemainderContributionCandidate: graph.remainder,
    trace,
    traceVerification: {
      ordinaryArithmeticChecks: verification.ordinaryArithmeticChecks,
      squareRootChecks: verification.squareRootChecks,
      exactSelectionChecks: verification.exactSelectionChecks,
      everyTraceNodeVerified: true,
    },
    proof: {
      model: "input_specific_normal_binary64_roundoff_plus_positive_series_remainder",
      source: "same_execution_trace_as_returned_value",
      roundoffGammaIndex: trace.proof_input.roundoff_gamma_index,
      accumulatedSumGammaIndex: trace.proof_input.accumulated_sum_gamma_index,
      nextTermGammaIndex: trace.proof_input.next_term_gamma_index,
      seriesRemainderMultiplier: trace.proof_input.series_remainder_multiplier,
      truncationRelativeUpperBound: upwardBinary64(tracedTruncationRelativeUpperBound),
      relativeErrorUpperBound: upwardBinary64(tracedRelativeErrorUpperBound),
      candidateTruthErrorBoundUlp: bound,
      positiveIntermediatesStrictlyAboveMinimumNormal: true,
      sqrtRoundingCellChecks: trace.proof_input.sqrt_rounding_cell_checks,
      sqrtRoundingCellsVerified: true,
      truthErrorBoundSelected: false,
    },
    projectionMargin: {
      cellsToNearestClassTransition: margin.cellsToNearestClassTransition,
      candidateTruthErrorBoundUlp: boundBigInt,
      candidateStable: true,
    },
    diagnostics: {
      startup: STARTUP_DIAGNOSTIC,
      preInvocation,
      postInvocation,
      diagnosticOnly: true,
    },
    executionProfile: {
      runtimeIdentity: STARTUP_RUNTIME_IDENTITY,
      controlledProcessProfileCandidateKey: CONTROLLED_PROCESS_PROFILE_KEY,
      requiredExclusions: CONTROLLED_PROCESS_PROFILE_EXCLUSIONS,
      exactRuntimeAllowlistSelected: false,
      controlledProcessProfileEnforced: false,
      crossPlatformAdmissionEvidenceComplete: false,
    },
    candidateArithmeticExecutionVerified: true,
    supportedExecutionPredicateSatisfied: false,
    supportedPlatformClaimed: false,
    runtimeSupportClaimed: false,
    supportedDomainClaimed: false,
  };
}

/** Evaluate the supported-execution predicate candidate without selecting support. */
export function evaluatePairedTSupportedExecutionCandidate(
  input: unknown,
): PairedTSupportedExecutionCandidateResult {
  return evaluateWithTraceLimit(input, PAIRED_T_SUPPORTED_EXECUTION_MAX_TRACE_NODES);
}

/** Review-only resource probe; a lower limit cannot produce a support claim. */
export function evaluatePairedTSupportedExecutionCandidateWithReviewLimit(
  input: unknown,
  maximumTraceNodes: number,
): PairedTSupportedExecutionCandidateResult {
  if (
    !Number.isSafeInteger(maximumTraceNodes) ||
    maximumTraceNodes < 0 ||
    maximumTraceNodes > PAIRED_T_SUPPORTED_EXECUTION_MAX_TRACE_NODES
  ) {
    return refusal("execution_trace_resource_bound_exceeded");
  }
  return evaluateWithTraceLimit(input, maximumTraceNodes);
}

function canonicalizeJson(value: unknown, ancestors = new Set<object>()): unknown {
  if (
    value === undefined ||
    typeof value === "bigint" ||
    typeof value === "function" ||
    typeof value === "symbol" ||
    (typeof value === "number" && !Number.isFinite(value))
  ) {
    throw new TypeError("supported-execution checkpoint contains non-JSON data");
  }
  if (typeof value !== "object" || value === null) return value;
  if (ancestors.has(value)) throw new TypeError("supported-execution checkpoint contains a cycle");
  const next = new Set(ancestors).add(value);
  if (Array.isArray(value)) {
    const entries = ownDataArray(value, 10_000);
    if (entries === undefined) {
      throw new TypeError("supported-execution checkpoint contains a non-data array");
    }
    return entries.map((entry) => canonicalizeJson(entry, next));
  }
  const prototype = Object.getPrototypeOf(value) as object | null;
  if (prototype !== Object.prototype && prototype !== null) {
    throw new TypeError("supported-execution checkpoint contains a non-JSON object");
  }
  const keys = Reflect.ownKeys(value);
  if (keys.some((key) => typeof key !== "string")) {
    throw new TypeError("supported-execution checkpoint contains a symbol key");
  }
  const entries: Array<[string, unknown]> = [];
  for (const key of keys as string[]) {
    const descriptor = Reflect.getOwnPropertyDescriptor(value, key);
    if (descriptor === undefined || !("value" in descriptor) || descriptor.enumerable !== true) {
      throw new TypeError("supported-execution checkpoint contains a non-data property");
    }
    entries.push([key, canonicalizeJson(descriptor.value, next)]);
  }
  entries.sort(([first], [second]) => (first < second ? -1 : first > second ? 1 : 0));
  return Object.fromEntries(entries);
}

/** Validate the exact non-authoritative checkpoint for this bounded increment. */
export function validatePairedTSupportedExecutionCheckpoint(candidate: unknown): string[] {
  try {
    return JSON.stringify(canonicalizeJson(candidate)) ===
      JSON.stringify(canonicalizeJson(EXPECTED_CHECKPOINT))
      ? []
      : ["supported-execution checkpoint differs from the closed non-runtime candidate"];
  } catch {
    return ["supported-execution checkpoint differs from the closed non-runtime candidate"];
  }
}
