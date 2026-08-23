/**
 * Exact rational Welch summary quantities (no square roots).
 */

import {
  rat,
  ratAdd,
  ratDiv,
  ratIsZero,
  ratMul,
  ratSub,
  ratToString,
  sampleVarianceRational,
  meanRational,
  type Rational,
} from "./rational.js";
import type { CorpusGroup } from "./corpus.js";
import { rationalValuesFromSpecs } from "./rational.js";

export interface ExactAlgebraicResult {
  case_id: string;
  n_x: string;
  n_y: string;
  mean_x: string;
  mean_y: string;
  sample_variance_x: string;
  sample_variance_y: string;
  mean_difference: string;
  variance_x_over_n_x: string;
  variance_y_over_n_y: string;
  se_squared: string;
  welch_df_numerator: string;
  welch_df_denominator: string;
  welch_df: string;
  degenerate?: string;
}

export function exactAlgebraicFromGroups(
  caseId: string,
  groupX: CorpusGroup,
  groupY: CorpusGroup,
): ExactAlgebraicResult {
  const xVals = rationalValuesFromSpecs(groupX.values);
  const yVals = rationalValuesFromSpecs(groupY.values);

  if (xVals.length < 2 || yVals.length < 2) {
    return {
      case_id: caseId,
      n_x: String(xVals.length),
      n_y: String(yVals.length),
      mean_x: "INSUFFICIENT_OBSERVATIONS",
      mean_y: "INSUFFICIENT_OBSERVATIONS",
      sample_variance_x: "INSUFFICIENT_OBSERVATIONS",
      sample_variance_y: "INSUFFICIENT_OBSERVATIONS",
      mean_difference: "INSUFFICIENT_OBSERVATIONS",
      variance_x_over_n_x: "INSUFFICIENT_OBSERVATIONS",
      variance_y_over_n_y: "INSUFFICIENT_OBSERVATIONS",
      se_squared: "INSUFFICIENT_OBSERVATIONS",
      welch_df_numerator: "INSUFFICIENT_OBSERVATIONS",
      welch_df_denominator: "INSUFFICIENT_OBSERVATIONS",
      welch_df: "INSUFFICIENT_OBSERVATIONS",
      degenerate: "INSUFFICIENT_OBSERVATIONS",
    };
  }

  const meanX = meanRational(xVals);
  const meanY = meanRational(yVals);
  const varX = sampleVarianceRational(xVals);
  const varY = sampleVarianceRational(yVals);
  const meanDiff = ratSub(meanX, meanY);

  const nX = rat(xVals.length);
  const nY = rat(yVals.length);
  const a = ratDiv(varX, nX);
  const b = ratDiv(varY, nY);
  const seSquared = ratAdd(a, b);

  if (ratIsZero(seSquared)) {
    return {
      case_id: caseId,
      n_x: String(xVals.length),
      n_y: String(yVals.length),
      mean_x: ratToString(meanX),
      mean_y: ratToString(meanY),
      sample_variance_x: ratToString(varX),
      sample_variance_y: ratToString(varY),
      mean_difference: ratToString(meanDiff),
      variance_x_over_n_x: ratToString(a),
      variance_y_over_n_y: ratToString(b),
      se_squared: ratToString(seSquared),
      welch_df_numerator: "SE_ZERO",
      welch_df_denominator: "SE_ZERO",
      welch_df: "SE_ZERO",
      degenerate: "SE_ZERO",
    };
  }

  const dfNumer = ratMul(seSquared, seSquared);
  const termA = ratDiv(ratMul(a, a), rat(xVals.length - 1));
  const termB = ratDiv(ratMul(b, b), rat(yVals.length - 1));
  const dfDenom = ratAdd(termA, termB);
  const df = ratDiv(dfNumer, dfDenom);

  return {
    case_id: caseId,
    n_x: String(xVals.length),
    n_y: String(yVals.length),
    mean_x: ratToString(meanX),
    mean_y: ratToString(meanY),
    sample_variance_x: ratToString(varX),
    sample_variance_y: ratToString(varY),
    mean_difference: ratToString(meanDiff),
    variance_x_over_n_x: ratToString(a),
    variance_y_over_n_y: ratToString(b),
    se_squared: ratToString(seSquared),
    welch_df_numerator: ratToString(dfNumer),
    welch_df_denominator: ratToString(dfDenom),
    welch_df: ratToString(df),
  };
}

/** Naive one-pass sample variance for cancellation comparison. */
export function naiveOnePassVariance(values: number[]): number {
  const n = values.length;
  const mean = values.reduce((s, v) => s + v, 0) / n;
  const sumSq = values.reduce((s, v) => s + v * v, 0);
  return (sumSq - n * mean * mean) / (n - 1);
}
