/**
 * Candidate-only analytic truth-error and support predicate for R2-D5.
 *
 * The existing reviewed runtime graph is replayed without changing its output.
 * Alongside that replay, this module tracks a conservative normal-binary64
 * roundoff budget and the positive-series truncation remainder. The resulting
 * per-input ULP value is a review candidate, not a selected Protocol bound.
 */

import {
  evaluatePairedTRuntimeSeriesWithCandidateTable,
  lookupReviewedInverseBetaCandidateCell,
} from "./paired-t-runtime-table-integration-candidate.js";
import { parsePairedTCandidateEvaluationInput } from "./paired-t-runtime-input-reason-code-candidate.js";
import { binary64Hex } from "./paired-t-numerical-contract-candidate.js";
import { evaluateProjectionMarginCandidate } from "./paired-t-truth-boundary-candidate.js";

const MINIMUM_NORMAL = 2 ** -1022;
const UNIT_ROUNDOFF_DENOMINATOR = 1n << 53n;
const ULP_CONVERSION_FACTOR = 1n << 54n;

interface TrackedPositive {
  value: number;
  gammaIndex: number;
  failures: string[];
  sqrtChecks: ReadonlySet<string>;
}

interface Rational {
  numerator: bigint;
  denominator: bigint;
}

interface ProofReplay {
  branch: string;
  pValue: number;
  iterations: number;
  iterationCap: number;
  relativeErrorUpperBound: Rational;
  truncationRelativeUpperBound: Rational;
  roundoffGammaIndex: number;
  accumulatedSumGammaIndex: number;
  nextTermGammaIndex: number;
  seriesRemainderMultiplier: number;
  proofFailures: string[];
  sqrtRoundingCellChecks: number;
}

interface ProofReplayFailure {
  failureClassification: "proof_graph_reproduction_mismatch" | "truth_error_bound_not_finite";
}

type ProofReplayResult = ProofReplay | ProofReplayFailure;

export interface PairedTTruthErrorSupportCheckpoint {
  status: string;
  issuance: string;
  review_issue: string;
  candidate_key: string;
  decision_state: string;
  runtime_support_enabled: boolean;
  supported_domain_claimed: boolean;
  truth_error_bound_selected: boolean;
  proof_model: Record<string, unknown>;
  evaluation_domain: Record<string, unknown>;
  certified_pointwise_witness: Record<string, unknown>;
  closure_state: Record<string, unknown>;
  prohibited_claims: string[];
}

export type PairedTTruthErrorSupportCandidateResult =
  | {
      ok: true;
      status: "non_authoritative_candidate_support_evaluation";
      branch: string;
      pValue: number;
      pValueBinary64Hex: string;
      iterations: number;
      iterationCap: number;
      proof: {
        model: "input_specific_normal_binary64_roundoff_plus_positive_series_remainder";
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
      candidateDomainDisposition: "inside_candidate_truth_error_support_predicate";
      runtimeSupportClaimed: false;
      supportedDomainClaimed: false;
    }
  | {
      ok: false;
      status: "non_authoritative_candidate_refusal";
      classification:
        | "runtime_graph_refusal"
        | "candidate_constant_table_unavailable"
        | "proof_graph_reproduction_mismatch"
        | "truth_error_proof_precondition_failed"
        | "truth_error_bound_not_finite"
        | "projection_margin_not_established";
      graphClassification?: string;
      proofFailures?: string[];
      candidateTruthErrorBoundUlp?: number;
      runtimeSupportClaimed: false;
      supportedDomainClaimed: false;
    };

const EXPECTED_CHECKPOINT = {
  status: "non_authoritative_candidate",
  issuance: "unissued",
  review_issue: "https://github.com/licklider-ai/nomue-protocol/issues/25",
  candidate_key: "paired-t-d5-truth-error-support-closure-evaluation-1",
  decision_state:
    "independently_reviewed_candidate_proof_pending_bound_selection_platform_and_support",
  runtime_support_enabled: false,
  supported_domain_claimed: false,
  truth_error_bound_selected: false,
  proof_model: {
    kind: "input_specific_normal_binary64_roundoff_plus_positive_series_remainder",
    unit_roundoff: "2^-53",
    basic_operation_model: "round_to_nearest_ties_to_even_normal_results",
    roundoff_composition: "exact_worst_direction_reindexed_to_smallest_covering_gamma",
    square_root_model: "runtime_exact_rounding_cell_verification",
    inverse_beta_model: "reviewed_correctly_rounded_candidate_table_cell",
    series_remainder: "a_posteriori_positive_geometric_upper_bound",
    bound_arithmetic: "exact_rational_with_exact_integer_ulp_ceiling",
    reported_relative_bounds: "least_binary64_not_below_exact_rational",
    finite_corpus_maximum_is_a_bound: false,
  },
  evaluation_domain: {
    degrees_of_freedom_minimum: 1,
    degrees_of_freedom_maximum_evaluation_target: 200,
    supported_degrees_of_freedom_maximum: null,
    test_statistic_input: "nonnegative_finite_binary64_after_negative_zero_rejection",
    selected_projection_classes: ["positive_normal", "rounded_one"],
    positive_graph_intermediates_must_be_strictly_above_minimum_normal: true,
    projection_margin_rule:
      "cells_to_nearest_class_transition_strictly_greater_than_input_specific_bound",
    runtime_support_claimed: false,
  },
  certified_pointwise_witness: {
    evidence_case_id: "df197-high-error-scout-witness",
    degrees_of_freedom: 197,
    test_statistic_binary64_hex: "4049333333333333",
    graph_p_value_binary64_hex: "284f4ce6230625df",
    correctly_rounded_truth_binary64_hex: "284f4ce623062755",
    graph_to_truth_ulp_distance: 374,
    candidate_roundoff_gamma_index: 1290,
    candidate_accumulated_sum_gamma_index: 196,
    candidate_next_term_gamma_index: 210,
    candidate_series_remainder_multiplier: 198,
    candidate_input_specific_bound_ulp: 2978,
    included_in_runtime_series_evidence_manifest: true,
    finite_pointwise_fact_not_global_bound: true,
  },
  closure_state: {
    analytic_derivation_review: "closed",
    supported_platform_matrix: "pending",
    final_supported_degrees_of_freedom_maximum: null,
    final_reason_codes_frozen: false,
    global_constant_truth_error_bound_selected: false,
    input_specific_bound_selected_for_runtime: false,
  },
  prohibited_claims: [
    "finite_corpus_maximum_as_global_truth_bound",
    "review_candidate_bound_as_selected_runtime_bound",
    "supported_df_max",
    "supported_runtime_student_t_procedure",
    "correctly_rounded_runtime_p_value_for_every_input",
    "authoritative_public_check_or_bundle",
  ],
} as const;

function unique(values: readonly string[]): string[] {
  return [...new Set(values)];
}

function bits(value: number): bigint {
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  view.setFloat64(0, value, false);
  return view.getBigUint64(0, false);
}

function rationalFromBits(valueBits: bigint): Rational | undefined {
  const sign = valueBits >> 63n;
  const exponentBits = Number((valueBits >> 52n) & 0x7ffn);
  const fractionBits = valueBits & 0x000f_ffff_ffff_ffffn;
  if (sign !== 0n || exponentBits === 0x7ff) return undefined;
  if (exponentBits === 0 && fractionBits === 0n) {
    return { numerator: 0n, denominator: 1n };
  }
  const significand = exponentBits === 0 ? fractionBits : (1n << 52n) | fractionBits;
  const exponent = exponentBits === 0 ? -1074 : exponentBits - 1023 - 52;
  return exponent >= 0
    ? { numerator: significand << BigInt(exponent), denominator: 1n }
    : { numerator: significand, denominator: 1n << BigInt(-exponent) };
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
  if (second.numerator <= 0n) return undefined;
  return {
    numerator: first.numerator * second.denominator,
    denominator: first.denominator * second.numerator,
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

function numberFromBits(valueBits: bigint): number {
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  view.setBigUint64(0, valueBits, false);
  return view.getFloat64(0, false);
}

/** Return the least binary64 value not below an exact rational in [0, 0.5). */
function upwardBinary64(value: Rational): number {
  if (value.numerator === 0n) return 0;
  if (value.numerator < 0n || compareRational(value, { numerator: 1n, denominator: 2n }) >= 0) {
    throw new RangeError("candidate relative bound is outside [0, 0.5)");
  }
  let lowerBits = 0n;
  let upperBits = bits(0.5);
  while (lowerBits < upperBits) {
    const midpointBits = (lowerBits + upperBits) >> 1n;
    const midpoint = rationalFromBits(midpointBits);
    if (midpoint === undefined) throw new TypeError("binary64 search reached a non-finite cell");
    if (compareRational(midpoint, value) >= 0) upperBits = midpointBits;
    else lowerBits = midpointBits + 1n;
  }
  return numberFromBits(lowerBits);
}

function ceilRational(value: Rational): bigint {
  if (value.numerator < 0n || value.denominator <= 0n) {
    throw new RangeError("candidate bound must be a non-negative rational");
  }
  return (value.numerator + value.denominator - 1n) / value.denominator;
}

function sqrtCellStrictlyContainsInput(input: number, root: number): boolean {
  if (!(input > 0) || !(root > 0) || !Number.isFinite(input) || !Number.isFinite(root)) {
    return false;
  }
  const rootBits = bits(root);
  if (rootBits <= 1n || rootBits >= 0x7fef_ffff_ffff_ffffn) return false;
  const inputRational = rationalFromBits(bits(input));
  const previous = rationalFromBits(rootBits - 1n);
  const current = rationalFromBits(rootBits);
  const next = rationalFromBits(rootBits + 1n);
  if (
    inputRational === undefined ||
    previous === undefined ||
    current === undefined ||
    next === undefined
  ) {
    return false;
  }
  const lowerMidpoint = halfRational(addRational(previous, current));
  const upperMidpoint = halfRational(addRational(current, next));
  return (
    compareRational(squareRational(lowerMidpoint), inputRational) < 0 &&
    compareRational(inputRational, squareRational(upperMidpoint)) < 0
  );
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

/**
 * Re-index the exact worst-direction composition bound into the smallest
 * gamma(k) that contains it. This avoids assuming that division or a positive
 * weighted addition preserves a naive count of independent error factors.
 */
function composedGammaIndex(
  operation: RoundedOperation,
  firstIndex: number,
  secondIndex = 0,
): number | undefined {
  const firstGamma = gamma(firstIndex);
  const secondGamma = gamma(secondIndex);
  if (firstGamma === undefined || secondGamma === undefined) return undefined;

  let unroundedUpper: Rational;
  let unroundedLower: Rational;
  if (operation === "multiply") {
    unroundedUpper = multiplyRational(
      addRational(ONE_RATIONAL, firstGamma),
      addRational(ONE_RATIONAL, secondGamma),
    );
    unroundedLower = multiplyRational(
      subtractRational(ONE_RATIONAL, firstGamma),
      subtractRational(ONE_RATIONAL, secondGamma),
    );
  } else if (operation === "divide") {
    const upper = divideRational(
      addRational(ONE_RATIONAL, firstGamma),
      subtractRational(ONE_RATIONAL, secondGamma),
    );
    const lower = divideRational(
      subtractRational(ONE_RATIONAL, firstGamma),
      addRational(ONE_RATIONAL, secondGamma),
    );
    if (upper === undefined || lower === undefined) return undefined;
    unroundedUpper = upper;
    unroundedLower = lower;
  } else {
    const inherited = largerRational(firstGamma, secondGamma);
    unroundedUpper = addRational(ONE_RATIONAL, inherited);
    unroundedLower = subtractRational(ONE_RATIONAL, inherited);
  }

  const roundedUpper = multiplyRational(
    unroundedUpper,
    addRational(ONE_RATIONAL, UNIT_ROUNDOFF_RATIONAL),
  );
  const roundedLower = multiplyRational(
    unroundedLower,
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
  const searchLimit = candidate + 1024;
  while (candidate <= searchLimit) {
    const candidateGamma = gamma(candidate);
    if (candidateGamma === undefined) return undefined;
    if (compareRational(candidateGamma, worst) >= 0) return candidate;
    candidate += 1;
  }
  return undefined;
}

function exact(value: number): TrackedPositive {
  return { value, gammaIndex: 0, failures: [], sqrtChecks: new Set() };
}

function rounded(
  value: number,
  gammaIndex: number | undefined,
  label: string,
  inputs: readonly TrackedPositive[],
  extraValid = true,
  sqrtCheckLabel?: string,
): TrackedPositive {
  const failures = unique(inputs.flatMap((entry) => entry.failures));
  // Equality is refused too: a rounded minimum-normal result can have an exact
  // subnormal predecessor, for which the ordinary |delta| <= 2^-53 model is not
  // sufficient. This gives up one boundary cell to remain fail-closed.
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
  };
}

function countSqrtChecks(inputs: readonly TrackedPositive[]): number {
  return new Set(inputs.flatMap((entry) => [...entry.sqrtChecks])).size;
}

function multiply(first: TrackedPositive, second: TrackedPositive, label: string): TrackedPositive {
  return rounded(
    first.value * second.value,
    composedGammaIndex("multiply", first.gammaIndex, second.gammaIndex),
    label,
    [first, second],
  );
}

function divide(first: TrackedPositive, second: TrackedPositive, label: string): TrackedPositive {
  return rounded(
    first.value / second.value,
    composedGammaIndex("divide", first.gammaIndex, second.gammaIndex),
    label,
    [first, second],
  );
}

function addPositive(
  first: TrackedPositive,
  second: TrackedPositive,
  label: string,
): TrackedPositive {
  return rounded(
    first.value + second.value,
    composedGammaIndex("positive_add", first.gammaIndex, second.gammaIndex),
    label,
    [first, second],
  );
}

function squareRoot(value: TrackedPositive, label: string): TrackedPositive {
  const root = Math.sqrt(value.value);
  return rounded(
    root,
    composedGammaIndex("square_root", value.gammaIndex),
    label,
    [value],
    sqrtCellStrictlyContainsInput(value.value, root),
    label,
  );
}

function integerPower(base: TrackedPositive, exponent: number, label: string): TrackedPositive {
  let accumulator = exact(1);
  let factor = base;
  let remaining = exponent;
  while (remaining > 0) {
    if (remaining % 2 === 1) accumulator = multiply(accumulator, factor, label);
    remaining = Math.floor(remaining / 2);
    if (remaining > 0) factor = multiply(factor, factor, label);
  }
  return accumulator;
}

function gamma(gammaIndex: number): Rational | undefined {
  if (!Number.isSafeInteger(gammaIndex) || gammaIndex < 0) return undefined;
  const factors = BigInt(gammaIndex);
  return factors < UNIT_ROUNDOFF_DENOMINATOR
    ? {
        numerator: factors,
        denominator: UNIT_ROUNDOFF_DENOMINATOR - factors,
      }
    : undefined;
}

function truncationRelativeBound(
  multiplier: number,
  sumFactors: number,
  nextTermFactors: number,
): Rational | undefined {
  if (!Number.isSafeInteger(multiplier) || multiplier < 0) return undefined;
  if (
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
  // Exact simplification of
  // multiplier*u*(1+gamma(sumFactors))/(1-gamma(nextTermFactors)).
  return {
    numerator: BigInt(multiplier) * (UNIT_ROUNDOFF_DENOMINATOR - term),
    denominator: (UNIT_ROUNDOFF_DENOMINATOR - sum) * (UNIT_ROUNDOFF_DENOMINATOR - 2n * term),
  };
}

function lowerTailRelativeBound(
  core: TrackedPositive,
  sum: TrackedPositive,
  nextTerm: TrackedPositive,
  remainderMultiplier: number,
): { relative: Rational; truncation: Rational } | undefined {
  const coreGamma = gamma(core.gammaIndex);
  const truncation = truncationRelativeBound(
    remainderMultiplier,
    sum.gammaIndex,
    nextTerm.gammaIndex,
  );
  if (coreGamma === undefined || truncation === undefined) return undefined;
  return { relative: addRational(coreGamma, truncation), truncation };
}

function centralComplementRelativeBound(
  pValue: number,
  core: TrackedPositive,
  sum?: TrackedPositive,
  nextTerm?: TrackedPositive,
): { relative: Rational; truncation: Rational } | undefined {
  const coreGamma = gamma(core.gammaIndex);
  const truncation =
    sum === undefined || nextTerm === undefined
      ? { numerator: 0n, denominator: 1n }
      : truncationRelativeBound(2, sum.gammaIndex, nextTerm.gammaIndex);
  if (coreGamma === undefined || truncation === undefined) return undefined;
  const absolute = addRational(addRational(coreGamma, truncation), {
    numerator: 1n,
    denominator: UNIT_ROUNDOFF_DENOMINATOR,
  });
  const pValueRational = rationalFromBits(bits(pValue));
  if (pValueRational === undefined) return undefined;
  const lowerTruth = subtractRational(pValueRational, absolute);
  if (lowerTruth.numerator <= 0n) return undefined;
  const relative = divideRational(absolute, lowerTruth);
  return relative === undefined ? undefined : { relative, truncation };
}

function replayWithProof(
  degreesOfFreedom: number,
  testStatistic: number,
  inverseBeta: number,
): ProofReplayResult {
  const df = degreesOfFreedom;
  const absoluteT = Math.abs(testStatistic);
  const cap = 40 * df + 64;
  if (absoluteT === 0) {
    return {
      branch: "exact-zero",
      pValue: 1,
      iterations: 0,
      iterationCap: cap,
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

  const t = exact(absoluteT);
  const inverse = { ...exact(inverseBeta), gammaIndex: 1 };
  if (df === 2) {
    if (absoluteT <= 1) {
      const squared = multiply(t, t, "df2_central_squared_t");
      const rootInput = addPositive(exact(2), squared, "df2_central_root_input");
      const root = squareRoot(rootInput, "df2_central_root");
      const quotient = divide(t, root, "df2_central_quotient");
      const pValue = 1 - quotient.value;
      const bound = centralComplementRelativeBound(pValue, quotient);
      if (bound === undefined) {
        return { failureClassification: "truth_error_bound_not_finite" };
      }
      return {
        branch: "df2-central-closed-form",
        pValue,
        iterations: 0,
        iterationCap: cap,
        relativeErrorUpperBound: bound.relative,
        truncationRelativeUpperBound: { numerator: 0n, denominator: 1n },
        roundoffGammaIndex: quotient.gammaIndex,
        accumulatedSumGammaIndex: 0,
        nextTermGammaIndex: 0,
        seriesRemainderMultiplier: 0,
        proofFailures: quotient.failures,
        sqrtRoundingCellChecks: quotient.sqrtChecks.size,
      };
    }
    const reciprocal = divide(exact(1), t, "df2_tail_reciprocal");
    const squared = multiply(reciprocal, reciprocal, "df2_tail_squared_reciprocal");
    const scaled = multiply(exact(2), squared, "df2_tail_scaled_reciprocal");
    const rootInput = addPositive(exact(1), scaled, "df2_tail_root_input");
    const root = squareRoot(rootInput, "df2_tail_root");
    const rootPlusOne = addPositive(root, exact(1), "df2_tail_root_plus_one");
    const denominator = multiply(root, rootPlusOne, "df2_tail_denominator");
    const p = divide(scaled, denominator, "df2_tail_probability");
    const relative = gamma(p.gammaIndex);
    if (relative === undefined) {
      return { failureClassification: "truth_error_bound_not_finite" };
    }
    return {
      branch: "df2-tail-closed-form",
      pValue: p.value,
      iterations: 0,
      iterationCap: cap,
      relativeErrorUpperBound: relative,
      truncationRelativeUpperBound: { numerator: 0n, denominator: 1n },
      roundoffGammaIndex: p.gammaIndex,
      accumulatedSumGammaIndex: 0,
      nextTermGammaIndex: 0,
      seriesRemainderMultiplier: 0,
      proofFailures: p.failures,
      sqrtRoundingCellChecks: p.sqrtChecks.size,
    };
  }

  const halfDf = df / 2;
  if (absoluteT <= 1) {
    const squared = multiply(t, t, "central_squared_t");
    const denominator = addPositive(exact(df), squared, "central_denominator");
    const y = divide(squared, denominator, "central_y");
    const x = divide(exact(df), denominator, "central_x");
    let xPower = integerPower(x, Math.floor(df / 2), "central_x_power");
    if (df % 2 === 1) {
      xPower = multiply(xPower, squareRoot(x, "central_sqrt_x"), "central_half_power");
    }
    let prefactor = multiply(exact(2), squareRoot(y, "central_sqrt_y"), "central_prefactor");
    prefactor = multiply(prefactor, xPower, "central_prefactor");
    prefactor = multiply(prefactor, inverse, "central_prefactor");

    let term = exact(1);
    let sum = exact(1);
    for (let index = 0; index < cap; index += 1) {
      let nextTerm = multiply(term, y, "central_series_term");
      nextTerm = multiply(nextTerm, exact(halfDf + 0.5 + index), "central_series_term");
      nextTerm = divide(nextTerm, exact(1.5 + index), "central_series_term");
      const nextSum = addPositive(sum, nextTerm, "central_series_sum");
      if (nextSum.value === sum.value) {
        const core = multiply(prefactor, sum, "central_probability_core");
        const pValue = 1 - core.value;
        const bound = centralComplementRelativeBound(pValue, core, sum, nextTerm);
        if (bound === undefined) {
          return { failureClassification: "truth_error_bound_not_finite" };
        }
        return {
          branch: "central-complement-positive-series",
          pValue,
          iterations: index + 1,
          iterationCap: cap,
          relativeErrorUpperBound: bound.relative,
          truncationRelativeUpperBound: bound.truncation,
          roundoffGammaIndex: core.gammaIndex,
          accumulatedSumGammaIndex: sum.gammaIndex,
          nextTermGammaIndex: nextTerm.gammaIndex,
          seriesRemainderMultiplier: 2,
          proofFailures: unique([...core.failures, ...nextSum.failures, ...nextTerm.failures]),
          sqrtRoundingCellChecks: countSqrtChecks([core, nextSum, nextTerm]),
        };
      }
      term = nextTerm;
      sum = nextSum;
    }
    return { failureClassification: "proof_graph_reproduction_mismatch" };
  }

  const reciprocal = divide(exact(1), t, "tail_reciprocal");
  const squaredReciprocal = multiply(reciprocal, reciprocal, "tail_squared_reciprocal");
  const scaled = multiply(exact(df), squaredReciprocal, "tail_scaled_reciprocal");
  const denominator = addPositive(exact(1), scaled, "tail_denominator");
  const x = divide(scaled, denominator, "tail_x");
  let xPower = integerPower(x, Math.floor(df / 2), "tail_x_power");
  if (df % 2 === 1) {
    const sqrtDf = squareRoot(exact(df), "tail_sqrt_df");
    const numerator = multiply(sqrtDf, reciprocal, "tail_stable_sqrt_x");
    const sqrtDenominator = squareRoot(denominator, "tail_sqrt_denominator");
    const stableSqrtX = divide(numerator, sqrtDenominator, "tail_stable_sqrt_x");
    xPower = multiply(xPower, stableSqrtX, "tail_half_power");
  }
  let prefactor = multiply(xPower, inverse, "tail_prefactor");
  prefactor = divide(prefactor, exact(halfDf), "tail_prefactor");

  let term = exact(1);
  let sum = exact(1);
  for (let index = 0; index < cap; index += 1) {
    let nextTerm = multiply(term, x, "tail_series_term");
    nextTerm = multiply(nextTerm, exact(halfDf + index), "tail_series_term");
    nextTerm = multiply(nextTerm, exact(index + 0.5), "tail_series_term");
    nextTerm = divide(nextTerm, exact(halfDf + index + 1), "tail_series_term");
    nextTerm = divide(nextTerm, exact(index + 1), "tail_series_term");
    const nextSum = addPositive(sum, nextTerm, "tail_series_sum");
    if (nextSum.value === sum.value) {
      const core = multiply(prefactor, sum, "tail_probability_core");
      const bound = lowerTailRelativeBound(core, sum, nextTerm, df + 1);
      if (bound === undefined) {
        return { failureClassification: "truth_error_bound_not_finite" };
      }
      return {
        branch: "lower-tail-positive-series",
        pValue: core.value,
        iterations: index + 1,
        iterationCap: cap,
        relativeErrorUpperBound: bound.relative,
        truncationRelativeUpperBound: bound.truncation,
        roundoffGammaIndex: core.gammaIndex,
        accumulatedSumGammaIndex: sum.gammaIndex,
        nextTermGammaIndex: nextTerm.gammaIndex,
        seriesRemainderMultiplier: df + 1,
        proofFailures: unique([...core.failures, ...nextSum.failures, ...nextTerm.failures]),
        sqrtRoundingCellChecks: countSqrtChecks([core, nextSum, nextTerm]),
      };
    }
    term = nextTerm;
    sum = nextSum;
  }
  return { failureClassification: "proof_graph_reproduction_mismatch" };
}

function refusal(
  classification: Extract<PairedTTruthErrorSupportCandidateResult, { ok: false }>["classification"],
  extra: Partial<Extract<PairedTTruthErrorSupportCandidateResult, { ok: false }>> = {},
): PairedTTruthErrorSupportCandidateResult {
  return {
    ok: false,
    status: "non_authoritative_candidate_refusal",
    classification,
    runtimeSupportClaimed: false,
    supportedDomainClaimed: false,
    ...extra,
  };
}

/** Evaluate the non-authoritative per-input truth-error/support predicate candidate. */
export function evaluatePairedTTruthErrorSupportCandidate(
  input: unknown,
): PairedTTruthErrorSupportCandidateResult {
  const candidateInput = parsePairedTCandidateEvaluationInput(input);
  if (candidateInput === undefined) {
    return refusal("runtime_graph_refusal", { graphClassification: "invalid_candidate_input" });
  }
  const graph = evaluatePairedTRuntimeSeriesWithCandidateTable(candidateInput);
  if (!graph.ok) {
    return refusal(
      graph.classification === "candidate_constant_table_unavailable"
        ? "candidate_constant_table_unavailable"
        : "runtime_graph_refusal",
      { graphClassification: graph.classification },
    );
  }
  const tableCell = lookupReviewedInverseBetaCandidateCell(candidateInput.degreesOfFreedom);
  if (tableCell === undefined) return refusal("candidate_constant_table_unavailable");
  const replayResult = replayWithProof(
    candidateInput.degreesOfFreedom,
    candidateInput.testStatistic,
    tableCell.value,
  );
  if ("failureClassification" in replayResult) {
    return refusal(replayResult.failureClassification);
  }
  const replay = replayResult;
  if (
    replay.branch !== graph.branch ||
    replay.iterations !== graph.iterations ||
    replay.iterationCap !== graph.iterationCap ||
    binary64Hex(replay.pValue) !== graph.pValueBinary64Hex
  ) {
    return refusal("proof_graph_reproduction_mismatch");
  }
  if (replay.proofFailures.length > 0) {
    return refusal("truth_error_proof_precondition_failed", {
      proofFailures: replay.proofFailures,
    });
  }
  const relativeBelowHalf =
    compareRational(replay.relativeErrorUpperBound, { numerator: 1n, denominator: 2n }) < 0;
  const boundBigInt =
    replay.branch === "exact-zero"
      ? 0n
      : ceilRational(
          addRational(
            multiplyRational(replay.relativeErrorUpperBound, {
              numerator: ULP_CONVERSION_FACTOR,
              denominator: 1n,
            }),
            { numerator: 1n, denominator: 1n },
          ),
        );
  if (
    replay.relativeErrorUpperBound.numerator < 0n ||
    !relativeBelowHalf ||
    boundBigInt > BigInt(Number.MAX_SAFE_INTEGER)
  ) {
    return refusal("truth_error_bound_not_finite");
  }
  const bound = Number(boundBigInt);
  const margin = evaluateProjectionMarginCandidate(graph.pValue, BigInt(bound));
  if (margin.status !== "candidate_stable_for_supplied_bound") {
    return refusal("projection_margin_not_established", {
      candidateTruthErrorBoundUlp: bound,
    });
  }
  return {
    ok: true,
    status: "non_authoritative_candidate_support_evaluation",
    branch: graph.branch,
    pValue: graph.pValue,
    pValueBinary64Hex: graph.pValueBinary64Hex,
    iterations: graph.iterations,
    iterationCap: graph.iterationCap,
    proof: {
      model: "input_specific_normal_binary64_roundoff_plus_positive_series_remainder",
      roundoffGammaIndex: replay.roundoffGammaIndex,
      accumulatedSumGammaIndex: replay.accumulatedSumGammaIndex,
      nextTermGammaIndex: replay.nextTermGammaIndex,
      seriesRemainderMultiplier: replay.seriesRemainderMultiplier,
      truncationRelativeUpperBound: upwardBinary64(replay.truncationRelativeUpperBound),
      relativeErrorUpperBound: upwardBinary64(replay.relativeErrorUpperBound),
      candidateTruthErrorBoundUlp: bound,
      positiveIntermediatesStrictlyAboveMinimumNormal: true,
      sqrtRoundingCellChecks: replay.sqrtRoundingCellChecks,
      sqrtRoundingCellsVerified: true,
      truthErrorBoundSelected: false,
    },
    projectionMargin: {
      cellsToNearestClassTransition: margin.cellsToNearestClassTransition,
      candidateTruthErrorBoundUlp: BigInt(bound),
      candidateStable: true,
    },
    candidateDomainDisposition: "inside_candidate_truth_error_support_predicate",
    runtimeSupportClaimed: false,
    supportedDomainClaimed: false,
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
    throw new TypeError("truth-error support checkpoint contains non-JSON data");
  }
  if (typeof value !== "object" || value === null) return value;
  if (ancestors.has(value)) throw new TypeError("truth-error support checkpoint contains a cycle");
  const nextAncestors = new Set(ancestors).add(value);
  if (Array.isArray(value)) {
    return value.map((entry) => canonicalizeJson(entry, nextAncestors));
  }
  if (Object.getPrototypeOf(value) !== Object.prototype) {
    throw new TypeError("truth-error support checkpoint contains a non-JSON object");
  }
  return Object.fromEntries(
    Object.entries(value)
      .sort(([first], [second]) => (first < second ? -1 : first > second ? 1 : 0))
      .map(([key, entry]) => [key, canonicalizeJson(entry, nextAncestors)]),
  );
}

/** Validate the closed, non-runtime checkpoint for this proof candidate. */
export function validatePairedTTruthErrorSupportCheckpoint(
  candidate: PairedTTruthErrorSupportCheckpoint,
): string[] {
  try {
    return JSON.stringify(canonicalizeJson(candidate)) ===
      JSON.stringify(canonicalizeJson(EXPECTED_CHECKPOINT))
      ? []
      : ["truth-error support checkpoint differs from the closed non-runtime candidate"];
  } catch {
    return ["truth-error support checkpoint differs from the closed non-runtime candidate"];
  }
}