import { describe, expect, it } from "vitest";
import {
  sampleMean,
  sampleVariance,
  StatsKernelError,
  welchTwoSampleTTest,
  welchTwoSampleTTestWithCi,
} from "../../reference/stats-kernel/src/kernel.js";

// Pinned expectations for the V-001 dataset, cross-checked against SciPy and
// mpmath (evidence/development/phase-1/oracle/oracle-matrix.json).
const V001_EXPECTED = {
  test_statistic: -3.6742346141747673,
  degrees_of_freedom: 4,
  p_value: 0.02131164112875673,
};

const closeTo = (actual: number, expected: number, relTol: number): void => {
  expect(Math.abs(actual - expected)).toBeLessThanOrEqual(
    Math.max(relTol, relTol * Math.max(Math.abs(actual), Math.abs(expected))),
  );
};

describe("stats kernel: Welch two-sample t-test", () => {
  it("reproduces the oracle-checked V-001 values", () => {
    const result = welchTwoSampleTTest(
      { group_id: "a", values: [1, 2, 3] },
      { group_id: "b", values: [4, 5, 6] },
    );
    expect(result.group_summaries[0].mean).toBe(2);
    expect(result.group_summaries[0].sample_variance).toBe(1);
    expect(result.group_summaries[1].mean).toBe(5);
    expect(result.mean_difference).toBe(-3);
    closeTo(result.test_statistic, V001_EXPECTED.test_statistic, 1e-14);
    closeTo(result.degrees_of_freedom, V001_EXPECTED.degrees_of_freedom, 1e-14);
    closeTo(result.p_value, V001_EXPECTED.p_value, 1e-12);
    expect(result.p_value_clamped).toBe(false);
  });

  it("uses group order for the mean-difference direction", () => {
    const forward = welchTwoSampleTTest(
      { group_id: "a", values: [1, 2, 3] },
      { group_id: "b", values: [4, 5, 6] },
    );
    const reversed = welchTwoSampleTTest(
      { group_id: "b", values: [4, 5, 6] },
      { group_id: "a", values: [1, 2, 3] },
    );
    expect(forward.mean_difference).toBe(-reversed.mean_difference);
    expect(forward.test_statistic).toBe(-reversed.test_statistic);
    expect(forward.p_value).toBe(reversed.p_value);
  });

  it("raises an explicit error for a zero standard error", () => {
    expect(() =>
      welchTwoSampleTTest(
        { group_id: "a", values: [5, 5, 5] },
        { group_id: "b", values: [5, 5, 5] },
      ),
    ).toThrowError(
      expect.objectContaining({ name: "StatsKernelError", code: "ZERO_STANDARD_ERROR" }),
    );
  });

  it("rejects non-finite and insufficient inputs explicitly", () => {
    expect(() =>
      welchTwoSampleTTest(
        { group_id: "a", values: [1, Number.POSITIVE_INFINITY] },
        { group_id: "b", values: [4, 5] },
      ),
    ).toThrowError(StatsKernelError);
    expect(() =>
      welchTwoSampleTTest({ group_id: "a", values: [1] }, { group_id: "b", values: [4, 5] }),
    ).toThrowError(expect.objectContaining({ code: "INSUFFICIENT_OBSERVATIONS" }));
  });

  it("computes two-pass mean and n-1 variance", () => {
    const values = [1.1, 2.3, 3.7, 4.1];
    const mean = sampleMean(values);
    closeTo(mean, 2.8, 1e-15);
    closeTo(sampleVariance(values, mean), 1.88, 1e-14);
  });
});

// Pinned expectations cross-checked against SciPy (t.ppf, confidence_interval)
// and mpmath (evidence/development/phase-2a/oracle/oracle-matrix.json).
const A2V001_EXPECTED = {
  standard_error: 1.1595018087284057,
  critical_value: 2.786352592472584,
  ci_lower: -7.497447537393711,
  ci_upper: -1.035885795939624,
};

describe("stats kernel: mean-difference confidence interval (Phase 2A)", () => {
  it("reproduces the oracle-checked A2-V-001 interval", () => {
    const result = welchTwoSampleTTestWithCi(
      { group_id: "a", values: [1.1, 2.3, 3.7, 4.1] },
      { group_id: "b", values: [5.2, 7.9, 8.1] },
      0.95,
    );
    closeTo(result.standard_error, A2V001_EXPECTED.standard_error, 1e-14);
    closeTo(result.confidence_interval.critical_value, A2V001_EXPECTED.critical_value, 1e-13);
    closeTo(result.confidence_interval.lower, A2V001_EXPECTED.ci_lower, 1e-12);
    closeTo(result.confidence_interval.upper, A2V001_EXPECTED.ci_upper, 1e-12);
    expect(result.confidence_interval.confidence_level).toBe(0.95);
    expect(result.confidence_interval.lower).toBeLessThanOrEqual(result.confidence_interval.upper);
  });

  it("uses the same standard error and df for test and interval", () => {
    const result = welchTwoSampleTTestWithCi(
      { group_id: "a", values: [1, 2, 3] },
      { group_id: "b", values: [4, 5, 6] },
      0.95,
    );
    const halfWidth = result.confidence_interval.critical_value * result.standard_error;
    closeTo(result.confidence_interval.lower, result.mean_difference - halfWidth, 1e-14);
    closeTo(result.confidence_interval.upper, result.mean_difference + halfWidth, 1e-14);
  });

  it("keeps the critical value sane (between 1.96 and small-sample values)", () => {
    const smallDf = welchTwoSampleTTestWithCi(
      { group_id: "a", values: [1.0, 2.0] },
      { group_id: "b", values: [3.5, 5.5] },
      0.95,
    );
    expect(smallDf.confidence_interval.critical_value).toBeGreaterThan(1.959963984540054);
    const largeA = Array.from({ length: 200 }, (_, i) => i % 7);
    const largeB = Array.from({ length: 200 }, (_, i) => (i % 7) + 0.5);
    const largeDf = welchTwoSampleTTestWithCi(
      { group_id: "a", values: largeA },
      { group_id: "b", values: largeB },
      0.95,
    );
    expect(largeDf.confidence_interval.critical_value).toBeGreaterThan(1.959963984540054);
    expect(largeDf.confidence_interval.critical_value).toBeLessThan(1.98);
  });

  it("fails closed on a zero standard error and invalid levels", () => {
    expect(() =>
      welchTwoSampleTTestWithCi(
        { group_id: "a", values: [5, 5, 5] },
        { group_id: "b", values: [5, 5, 5] },
        0.95,
      ),
    ).toThrowError(expect.objectContaining({ code: "ZERO_STANDARD_ERROR" }));
    expect(() =>
      welchTwoSampleTTestWithCi(
        { group_id: "a", values: [1, 2, 3] },
        { group_id: "b", values: [4, 5, 6] },
        1.2,
      ),
    ).toThrowError(expect.objectContaining({ code: "CRITICAL_VALUE_FAILED" }));
  });
});
