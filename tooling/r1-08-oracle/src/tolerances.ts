/**
 * Contract tolerances for welch-recompute:0.2.1-draft.1 (authority: public-checks.yaml).
 */

export interface ToleranceSpec {
  absolute: number;
  relative: number;
}

const P_VALUE_RELATIVE_TOLERANCE = 1e-10;

export const TOLERANCES_021: Record<string, ToleranceSpec> = {
  mean: { absolute: 1e-12, relative: 1e-12 },
  sample_variance: { absolute: 1e-12, relative: 1e-12 },
  estimate: { absolute: 1e-12, relative: 1e-12 },
  standard_error: { absolute: 1e-12, relative: 1e-12 },
  test_statistic: { absolute: 1e-12, relative: 1e-12 },
  degrees_of_freedom: { absolute: 1e-12, relative: 1e-12 },
  p_value: { absolute: 0, relative: P_VALUE_RELATIVE_TOLERANCE },
  ci_lower: { absolute: 1e-12, relative: 1e-10 },
  ci_upper: { absolute: 1e-12, relative: 1e-10 },
  critical_value: { absolute: 1e-12, relative: 1e-10 },
};

export const CONFIDENCE_LEVEL = 0.95;

export function withinNumericTolerance(
  actual: number,
  expected: number,
  tol: ToleranceSpec,
): boolean {
  return (
    Math.abs(actual - expected) <=
    Math.max(tol.absolute, tol.relative * Math.max(Math.abs(actual), Math.abs(expected)))
  );
}

export function withinPValueTolerance021(actual: number, expected: number): boolean {
  const rel = P_VALUE_RELATIVE_TOLERANCE;
  if (expected > 0 && actual === 0) return false;
  if (expected === 0 && actual > 0) return false;
  if (expected === 0 && actual === 0) return false;
  return Math.abs(actual - expected) <= rel * Math.max(Math.abs(actual), Math.abs(expected));
}

export function relDeviation(actual: number, expected: number): number {
  if (actual === expected) return 0;
  return Math.abs(actual - expected) / Math.max(Math.abs(actual), Math.abs(expected));
}

export function ulpDistance(a: number, b: number): number {
  if (a === b) return 0;
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  view.setFloat64(0, a, false);
  const bitsA = view.getBigUint64(0, false);
  view.setFloat64(0, b, false);
  const bitsB = view.getBigUint64(0, false);
  const diff = bitsA > bitsB ? bitsA - bitsB : bitsB - bitsA;
  return Number(diff);
}
