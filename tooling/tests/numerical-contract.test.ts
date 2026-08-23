import { describe, expect, it } from "vitest";
import tCdf from "@stdlib/stats-base-dists-t-cdf";
import {
  isNumericalPUnderflow,
  withinNumericTolerance,
  withinPValueTolerance021,
} from "../../reference/verifier/src/numerical-comparison.js";
import {
  welchTwoSampleTTest,
  welchTwoSampleTTestWithCi,
} from "../../reference/stats-kernel/src/kernel.js";
import { twoSidedPValue } from "../../reference/stats-kernel/src/t-distribution.js";
import { recomputeContentDigest } from "../../reference/verifier/src/digest.js";
import { CHECK_IDS_2A_021, PHASE2A_021_BUNDLE_ID } from "../../reference/verifier/src/resources.js";
import { verifyRecordText } from "../../reference/verifier/src/verify.js";

describe("numerical comparison 0.2.1", () => {
  it("separates positive p from zero", () => {
    expect(withinPValueTolerance021(0, 1e-13, 1e-10)).toBe(false);
    expect(withinPValueTolerance021(1e-13, 0, 1e-10)).toBe(false);
    expect(withinPValueTolerance021(0.02131164112875673, 0.021311641128756727, 1e-10)).toBe(true);
  });

  it("detects numerical p underflow", () => {
    expect(isNumericalPUnderflow(0, -3.6, 4)).toBe(true);
    expect(isNumericalPUnderflow(0.02, -3.6, 4)).toBe(false);
  });

  it("old absolute floor would falsely pass zero vs tiny positive", () => {
    const tol = { absolute: 1e-12, relative: 1e-10 };
    expect(withinNumericTolerance(0, 1e-13, tol)).toBe(true);
    expect(withinPValueTolerance021(0, 1e-13, tol.relative)).toBe(false);
  });
});

describe("algorithm regression (AR)", () => {
  it("AR-001: one-pass variance mutation fails on large-offset data", () => {
    const values = [1e9 + 1, 1e9 + 3, 1e9 + 2];
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const naive =
      (values.reduce((s, v) => s + v * v, 0) - values.length * mean * mean) / (values.length - 1);
    const kernel = welchTwoSampleTTest(
      { group_id: "a", values },
      { group_id: "b", values: [1e9 + 2.5, 1e9 + 4.5, 1e9 + 3.5] },
    );
    expect(kernel.group_summaries[0].sample_variance).toBe(1);
    expect(naive).not.toBe(1);
  });

  it("AR-002: naive summation loses small values at large magnitude", () => {
    const values = [1e16, 1, -1e16];
    const naiveMean = values.reduce((a, b) => a + b, 0) / values.length;
    const kernel = welchTwoSampleTTest(
      { group_id: "a", values },
      { group_id: "b", values: [1e16, 2, -1e16] },
    );
    expect(kernel.group_summaries[0].mean).toBeCloseTo(1 / 3, 12);
    expect(naiveMean).toBe(0);
  });

  it("AR-003: kernel matches direct lower tail, not survival subtraction", () => {
    const df = 1.01;
    const t = 200;
    const direct = 2 * tCdf(-t, df);
    const survival = 2 * (1 - tCdf(t, df));
    const kernel = twoSidedPValue(t, df);
    expect(kernel.p_value).toBe(direct);
    expect(kernel.p_value).not.toBe(survival);
  });

  it("AR-004: deep-tail positive p is not clamped to zero", () => {
    const kernel = twoSidedPValue(200, 10);
    expect(kernel.p_value).toBeGreaterThan(0);
    expect(kernel.p_value).toBeLessThan(1e-15);
    expect(withinPValueTolerance021(0, kernel.p_value, 1e-10)).toBe(false);
  });

  it("AR-006: zero standard error is rejected", () => {
    expect(() =>
      welchTwoSampleTTestWithCi(
        { group_id: "a", values: [5, 5, 5] },
        { group_id: "b", values: [5, 5, 5] },
        0.95,
      ),
    ).toThrow();
  });

  it("AR-007: critical value uses Student t quantile, not normal approximation", () => {
    const welch = welchTwoSampleTTestWithCi(
      { group_id: "a", values: [1, 2, 3] },
      { group_id: "b", values: [4, 5, 6] },
      0.95,
    );
    const criticalFromT = welch.confidence_interval.critical_value;
    const normalApprox = 1.96;
    expect(criticalFromT).toBeCloseTo(2.776445105197794, 10);
    expect(criticalFromT).not.toBeCloseTo(normalApprox, 2);
  });

  it("AR-005: underflow guard fails computability on tail dataset", () => {
    const g1 = Array.from({ length: 70 }, (_, i) => 10 + (i % 5) * 0.01);
    const g2 = Array.from({ length: 70 }, (_, i) => (i % 5) * 0.01);
    const welch = welchTwoSampleTTestWithCi(
      { group_id: "a", values: g1 },
      { group_id: "b", values: g2 },
      0.95,
    );
    expect(welch.p_value).toBe(0);
    expect(
      isNumericalPUnderflow(welch.p_value, welch.test_statistic, welch.degrees_of_freedom),
    ).toBe(true);
  });
});

describe("tolerance contract lock (B)", () => {
  const rel = 1e-10;
  const fieldTol = { absolute: 1e-12, relative: 1e-12 };
  const ciTol = { absolute: 1e-12, relative: 1e-10 };
  const ts1Oracle = 0.021311641128756727;

  const assertMutationKilled = (
    actual: number,
    expected: number,
    baseTol: { absolute: number; relative: number },
    factor: number,
  ): void => {
    expect(withinNumericTolerance(actual, expected, baseTol)).toBe(false);
    expect(
      withinNumericTolerance(actual, expected, {
        absolute: baseTol.absolute,
        relative: baseTol.relative * factor,
      }),
    ).toBe(true);
  };

  it("p-exact: exactly equal passes", () => {
    expect(withinPValueTolerance021(0.05, 0.05, rel)).toBe(true);
  });

  it("p: at relative tolerance boundary passes for positive values", () => {
    const atTol = ts1Oracle * (1 + rel);
    expect(withinPValueTolerance021(atTol, ts1Oracle, rel)).toBe(true);
  });

  it("p: outside relative tolerance fails for positive values", () => {
    const outside = ts1Oracle * (1 + rel * 3);
    expect(withinPValueTolerance021(outside, ts1Oracle, rel)).toBe(false);
  });

  it("p-2x: relative tolerance mutation widens positive comparison", () => {
    const actual = ts1Oracle * (1 + rel * 1.5);
    expect(withinPValueTolerance021(actual, ts1Oracle, rel)).toBe(false);
    expect(withinPValueTolerance021(actual, ts1Oracle, rel * 2)).toBe(true);
  });

  it("p-10x: relative tolerance mutation widens positive comparison", () => {
    const actual = ts1Oracle * (1 + rel * 8);
    expect(withinPValueTolerance021(actual, ts1Oracle, rel)).toBe(false);
    expect(withinPValueTolerance021(actual, ts1Oracle, rel * 10)).toBe(true);
  });

  it("p-abs-floor: abs floor restoration mutation would pass zero vs tiny positive", () => {
    const tol = { absolute: 1e-12, relative: rel };
    expect(withinNumericTolerance(0, 1e-13, tol)).toBe(true);
    expect(withinPValueTolerance021(0, 1e-13, rel)).toBe(false);
  });

  it("p-100x-zero-separation: zero separation survives relative widening", () => {
    expect(withinPValueTolerance021(0, 1e-13, rel * 100)).toBe(false);
    expect(withinPValueTolerance021(0, 1e-29, rel * 100)).toBe(false);
  });

  it("standard_error-2x: relative mutation fails at boundary", () => {
    const actual = 1.0;
    const expected = 1.0 + 1.5e-12;
    expect(withinNumericTolerance(actual, expected, fieldTol)).toBe(false);
    const mutated = { absolute: 1e-12, relative: 1e-12 * 2 };
    expect(withinNumericTolerance(actual, expected, mutated)).toBe(true);
  });

  it("mean-2x: relative mutation fails at boundary", () => {
    const actual = 1000000002.0;
    const expected = 1000000002.0 + 1.5e-3;
    expect(withinNumericTolerance(actual, expected, fieldTol)).toBe(false);
    const mutated = { absolute: 1e-12, relative: 1e-12 * 2 };
    expect(withinNumericTolerance(actual, expected, mutated)).toBe(true);
  });

  it("mean-10x: relative mutation fails at boundary", () => {
    const actual = 1000000002.0;
    const expected = 1000000002.0 + 1e-2;
    expect(withinNumericTolerance(actual, expected, fieldTol)).toBe(false);
    const mutated = { absolute: 1e-12, relative: 1e-11 };
    expect(withinNumericTolerance(actual, expected, mutated)).toBe(true);
  });

  it("sample_variance-2x: relative mutation fails at boundary", () => {
    const actual = 1.0;
    const expected = 1.0 + 1.5e-12;
    assertMutationKilled(actual, expected, fieldTol, 2);
  });

  it("sample_variance-10x: relative mutation fails at boundary", () => {
    const actual = 1.0;
    const expected = 1.0 + 8e-12;
    assertMutationKilled(actual, expected, fieldTol, 10);
  });

  it("estimate-2x: relative mutation fails at boundary", () => {
    const actual = -3.0;
    const expected = -3.0 - 4e-12;
    assertMutationKilled(actual, expected, fieldTol, 2);
  });

  it("estimate-10x: relative mutation fails at boundary", () => {
    const actual = -3.0;
    const expected = -3.0 - 2.5e-11;
    assertMutationKilled(actual, expected, fieldTol, 10);
  });

  it("standard_error-10x: relative mutation fails at boundary", () => {
    const actual = 1.0;
    const expected = 1.0 + 8e-12;
    assertMutationKilled(actual, expected, fieldTol, 10);
  });

  it("test_statistic-2x: relative mutation fails at boundary", () => {
    const actual = -3.6742346141747673;
    const expected = actual - 4e-12;
    assertMutationKilled(actual, expected, fieldTol, 2);
  });

  it("test_statistic-10x: relative mutation fails at boundary", () => {
    const actual = -3.6742346141747673;
    const expected = actual - 2.5e-11;
    assertMutationKilled(actual, expected, fieldTol, 10);
  });

  it("degrees_of_freedom-2x: relative mutation fails at boundary", () => {
    const actual = 4.0;
    const expected = 4.0 + 5e-12;
    assertMutationKilled(actual, expected, fieldTol, 2);
  });

  it("degrees_of_freedom-10x: relative mutation fails at boundary", () => {
    const actual = 4.0;
    const expected = 4.0 + 8e-12;
    assertMutationKilled(actual, expected, fieldTol, 10);
  });

  it("ci_lower-2x: relative mutation fails at boundary", () => {
    const actual = -5.266957935527519;
    const expected = actual - 8e-10;
    assertMutationKilled(actual, expected, ciTol, 2);
  });

  it("ci_lower-10x: relative mutation fails at boundary", () => {
    const actual = -5.266957935527519;
    const expected = actual - 8e-10;
    assertMutationKilled(actual, expected, ciTol, 10);
  });

  it("ci_upper-2x: relative mutation fails at boundary", () => {
    const actual = -0.7330420644724809;
    const expected = actual + 1e-10;
    assertMutationKilled(actual, expected, ciTol, 2);
  });

  it("ci_upper-10x: relative mutation fails at boundary", () => {
    const actual = -0.7330420644724809;
    const expected = actual + 5e-10;
    assertMutationKilled(actual, expected, ciTol, 10);
  });
});

describe("underflow path (C)", () => {
  it("underflow kernel does not set p_value_clamped", () => {
    const g1 = Array.from({ length: 70 }, (_, i) => 10 + (i % 5) * 0.01);
    const g2 = Array.from({ length: 70 }, (_, i) => (i % 5) * 0.01);
    const welch = welchTwoSampleTTestWithCi(
      { group_id: "a", values: g1 },
      { group_id: "b", values: g2 },
      0.95,
    );
    expect(welch.p_value).toBe(0);
    expect(welch.p_value_clamped).toBe(false);
  });
});

describe("successor bundle verification", () => {
  const baseRecord = (payload: Record<string, unknown>) =>
    JSON.stringify({
      $schema: "urn:nomue:schema:record:0.2.0-draft.1",
      record_type: "nomue-record",
      record_id: "urn:uuid:00000000-0000-4000-8000-000000002101",
      revision_id: "urn:uuid:00000000-0000-4000-8000-000000002102",
      created_at: "2026-08-10T00:00:00Z",
      interpretation_bundle_id: PHASE2A_021_BUNDLE_ID,
      profile_id: "urn:nomue:profile:itgc:0.2.0-draft.1",
      payload,
      integrity: {
        canonicalization_id: "urn:nomue:canonicalization:jcs:0.2.0-draft.1",
        digest_algorithm: "sha-256",
        digest_scope: "record_without_integrity",
        content_digest: "placeholder",
      },
    });

  it("passes TS1-equivalent ordinary baseline", () => {
    const welch = welchTwoSampleTTestWithCi(
      { group_id: "group-a", values: [1, 2, 3] },
      { group_id: "group-b", values: [4, 5, 6] },
      0.95,
    );
    const payload = buildMinimalPayload([1, 2, 3], [4, 5, 6], welch);
    const parsed = JSON.parse(baseRecord(payload));
    parsed.integrity.content_digest = recomputeContentDigest(parsed);
    const outcome = verifyRecordText(JSON.stringify(parsed));
    expect(outcome.exitCode).toBe(0);
    const welchCheck = outcome.report?.verification_results.find(
      (r) => r.check_id === CHECK_IDS_2A_021.welch,
    );
    expect(welchCheck?.outcome).toBe("pass");
  });

  it("fails underflow with NRS-P-VALUE-UNDERFLOW", () => {
    const g1 = Array.from({ length: 70 }, (_, i) => 10 + (i % 5) * 0.01);
    const g2 = Array.from({ length: 70 }, (_, i) => (i % 5) * 0.01);
    const payload = buildMinimalPayload(g1, g2, null);
    const parsed = JSON.parse(baseRecord(payload));
    parsed.integrity.content_digest = recomputeContentDigest(parsed);
    const outcome = verifyRecordText(JSON.stringify(parsed));
    expect(outcome.exitCode).toBe(2);
    const comp = outcome.report?.verification_results.find(
      (r) => r.check_id === CHECK_IDS_2A_021.computability,
    );
    expect(comp?.reason_codes).toContain("NRS-P-VALUE-UNDERFLOW");
    const welch = outcome.report?.verification_results.find(
      (r) => r.check_id === CHECK_IDS_2A_021.welch,
    );
    expect(welch?.execution).toBe("not_run");
  });
});

function buildMinimalPayload(
  groupA: number[],
  groupB: number[],
  welch: ReturnType<typeof welchTwoSampleTTestWithCi> | null,
): Record<string, unknown> {
  const observations = [
    ...groupA.map((v, i) => ({
      observation_id: `obs-a-${i}`,
      experimental_unit_id: `unit-a-${i}`,
      group_id: "group-a",
      outcome_value: v,
    })),
    ...groupB.map((v, i) => ({
      observation_id: `obs-b-${i}`,
      experimental_unit_id: `unit-b-${i}`,
      group_id: "group-b",
      outcome_value: v,
    })),
  ];
  const result =
    welch === null
      ? {
          result_id: "result-1",
          analysis_id: "analysis-1",
          group_summaries: [
            { group_id: "group-a", n: groupA.length, mean: 0, sample_variance: 1 },
            { group_id: "group-b", n: groupB.length, mean: 0, sample_variance: 1 },
          ],
          effect_estimate: {
            kind: "unstandardized_arithmetic_mean_difference",
            estimate: 0,
            standard_error: 1,
            confidence_interval: {
              confidence_level: 0.95,
              method_id: "urn:nomue:method:welch-satterthwaite-mean-difference-ci:1",
              lower: -1,
              upper: 1,
            },
          },
          test: {
            test_statistic: 0,
            degrees_of_freedom: 4,
            p_value: 0.5,
          },
        }
      : {
          result_id: "result-1",
          analysis_id: "analysis-1",
          group_summaries: welch.group_summaries.map((s) => ({
            group_id: s.group_id,
            n: s.n,
            mean: s.mean,
            sample_variance: s.sample_variance,
          })),
          effect_estimate: {
            kind: "unstandardized_arithmetic_mean_difference",
            estimate: welch.mean_difference,
            standard_error: welch.standard_error,
            confidence_interval: {
              confidence_level: 0.95,
              method_id: "urn:nomue:method:welch-satterthwaite-mean-difference-ci:1",
              lower: welch.confidence_interval.lower,
              upper: welch.confidence_interval.upper,
            },
          },
          test: {
            test_statistic: welch.test_statistic,
            degrees_of_freedom: welch.degrees_of_freedom,
            p_value: welch.p_value,
          },
        };
  return {
    dataset: { dataset_id: "dataset-1", observations },
    design: {
      design_id: "design-1",
      dataset_id: "dataset-1",
      experimental_unit_type: "unit",
      groups: [
        { group_id: "group-a", label: "A" },
        { group_id: "group-b", label: "B" },
      ],
      group_order: ["group-a", "group-b"],
      outcome: { outcome_id: "outcome-1", label: "y", scale: "continuous" },
      declarations: {
        grouping_structure: "independent_groups",
        pairing: "none",
        repeated_measurements: "none",
        clustering: "none_declared",
      },
      data_handling: {
        analysis_population: "all_record_observations",
        missing_outcomes: "none",
        transformation: "none",
        weighting: "none",
      },
    },
    analysis: {
      analysis_id: "analysis-1",
      design_id: "design-1",
      method_id: "urn:nomue:method:welch-two-sample-t:1",
      alternative: "two_sided",
      estimand: {
        kind: "unstandardized_arithmetic_mean_difference",
        direction: "group_order_first_minus_second",
      },
      confidence_level: 0.95,
    },
    result,
  };
}
