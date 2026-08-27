import { describe, expect, it } from "vitest";
import {
  computePairedTSpike,
  pairwiseSum,
  type PairedObservationSpike,
} from "../../reference/spikes/paired-t.js";

const observations: PairedObservationSpike[] = [
  {
    observationId: "a2",
    experimentalUnitId: "u2",
    pairId: "p2",
    conditionId: "after",
    outcomeValue: 3,
  },
  {
    observationId: "b1",
    experimentalUnitId: "u1",
    pairId: "p1",
    conditionId: "before",
    outcomeValue: 2,
  },
  {
    observationId: "a3",
    experimentalUnitId: "u3",
    pairId: "p3",
    conditionId: "after",
    outcomeValue: 1,
  },
  {
    observationId: "a1",
    experimentalUnitId: "u1",
    pairId: "p1",
    conditionId: "after",
    outcomeValue: 1,
  },
  {
    observationId: "b3",
    experimentalUnitId: "u3",
    pairId: "p3",
    conditionId: "before",
    outcomeValue: 4,
  },
  {
    observationId: "b2",
    experimentalUnitId: "u2",
    pairId: "p2",
    conditionId: "before",
    outcomeValue: 5,
  },
];

describe("non-authoritative paired-t spike", () => {
  it("pins the G4 pairwise reduction tree rather than a left fold", () => {
    const values = [1e16, 1, -1e16, 1];
    expect(pairwiseSum(values)).toBe(0);
    expect(values.reduce((sum, value) => sum + value, 0)).toBe(1);
  });

  it("pins the G4 recursive floor-half split for a non-power-of-two count", () => {
    const values = [0.1, 0.2, 0.3];
    expect(pairwiseSum(values)).toBe(0.1 + (0.2 + 0.3));
    expect(pairwiseSum(values)).toBe(0.6);
    expect((values[0] ?? 0) + (values[1] ?? 0) + (values[2] ?? 0)).toBe(0.6000000000000001);
  });

  it("constructs explicit pairs independent of observation order", () => {
    const outcome = computePairedTSpike({
      conditionOrder: ["before", "after"],
      repeatedMeasurements: "within_pair_only",
      observations,
    });
    expect(outcome.ok).toBe(true);
    if (!outcome.ok) return;
    expect(outcome.result.operationGraph).toBe("g4-pairwise-two-pass-candidate");
    expect(outcome.result.sqrtReproducibility).toBe(
      "native-sqrt-no-cross-runtime-bit-identity-claim",
    );
    expect(outcome.result.pairIds).toEqual(["p1", "p2", "p3"]);
    expect(outcome.result.differences).toEqual([1, 2, 3]);
    expect(outcome.result.nPairs).toBe(3);
    expect(outcome.result.meanDifference).toBe(2);
    expect(outcome.result.sampleVarianceDifference).toBe(1);
    expect(outcome.result.standardError).toBeCloseTo(Math.sqrt(1 / 3), 15);
    expect(outcome.result.testStatistic).toBeCloseTo(Math.sqrt(12), 15);
    expect(outcome.result.degreesOfFreedom).toBe(2);
  });

  it("reverses the signed estimand when condition order reverses", () => {
    const outcome = computePairedTSpike({
      conditionOrder: ["after", "before"],
      repeatedMeasurements: "within_pair_only",
      observations,
    });
    expect(outcome.ok).toBe(true);
    if (outcome.ok) {
      expect(outcome.result.differences).toEqual([-1, -2, -3]);
      expect(outcome.result.meanDifference).toBe(-2);
      expect(outcome.result.testStatistic).toBeLessThan(0);
    }
  });

  it("fails closed on an incomplete pair", () => {
    const outcome = computePairedTSpike({
      conditionOrder: ["before", "after"],
      repeatedMeasurements: "within_pair_only",
      observations: observations.slice(0, -1),
    });
    expect(outcome).toMatchObject({ ok: false, error: "INCOMPLETE_PAIR" });
  });

  it("rejects an unrecognized repeated-measurements declaration at runtime", () => {
    const outcome = computePairedTSpike({
      conditionOrder: ["before", "after"],
      repeatedMeasurements: "typo" as never,
      observations,
    });
    expect(outcome).toMatchObject({
      ok: false,
      error: "INVALID_REPEATED_MEASUREMENTS_DECLARATION",
    });
  });

  it.each(["none", "within_pair_only"] as const)(
    "rejects reuse of one experimental unit across pairs under %s",
    (repeatedMeasurements) => {
      const unit = (pairId: string, member: "first" | "second"): string => {
        if (repeatedMeasurements === "within_pair_only") return "reused-unit";
        if (member === "first") return "reused-unit";
        return `${pairId}-other-unit`;
      };
      const outcome = computePairedTSpike({
        conditionOrder: ["before", "after"],
        repeatedMeasurements,
        observations: [
          {
            observationId: "b1",
            experimentalUnitId: unit("p1", "first"),
            pairId: "p1",
            conditionId: "before",
            outcomeValue: 2,
          },
          {
            observationId: "a1",
            experimentalUnitId: unit("p1", "second"),
            pairId: "p1",
            conditionId: "after",
            outcomeValue: 1,
          },
          {
            observationId: "b2",
            experimentalUnitId: unit("p2", "first"),
            pairId: "p2",
            conditionId: "before",
            outcomeValue: 4,
          },
          {
            observationId: "a2",
            experimentalUnitId: unit("p2", "second"),
            pairId: "p2",
            conditionId: "after",
            outcomeValue: 2,
          },
        ],
      });
      expect(outcome).toMatchObject({
        ok: false,
        error: "EXPERIMENTAL_UNIT_REUSED_ACROSS_PAIRS",
      });
    },
  );

  it("fails closed when all paired differences are identical", () => {
    const outcome = computePairedTSpike({
      conditionOrder: ["before", "after"],
      repeatedMeasurements: "within_pair_only",
      observations: [
        {
          observationId: "b1",
          experimentalUnitId: "u1",
          pairId: "p1",
          conditionId: "before",
          outcomeValue: 2,
        },
        {
          observationId: "a1",
          experimentalUnitId: "u1",
          pairId: "p1",
          conditionId: "after",
          outcomeValue: 1,
        },
        {
          observationId: "b2",
          experimentalUnitId: "u2",
          pairId: "p2",
          conditionId: "before",
          outcomeValue: 4,
        },
        {
          observationId: "a2",
          experimentalUnitId: "u2",
          pairId: "p2",
          conditionId: "after",
          outcomeValue: 3,
        },
      ],
    });
    expect(outcome).toMatchObject({ ok: false, error: "ZERO_DIFFERENCE_VARIANCE" });
  });

  it("does not misreport binary64 variance collapse as identical differences", () => {
    const outcome = computePairedTSpike({
      conditionOrder: ["before", "after"],
      repeatedMeasurements: "none",
      observations: [
        {
          observationId: "b1",
          experimentalUnitId: "u1",
          pairId: "p1",
          conditionId: "before",
          outcomeValue: Number.MIN_VALUE,
        },
        {
          observationId: "a1",
          experimentalUnitId: "u2",
          pairId: "p1",
          conditionId: "after",
          outcomeValue: 0,
        },
        {
          observationId: "b2",
          experimentalUnitId: "u3",
          pairId: "p2",
          conditionId: "before",
          outcomeValue: 0,
        },
        {
          observationId: "a2",
          experimentalUnitId: "u4",
          pairId: "p2",
          conditionId: "after",
          outcomeValue: 0,
        },
      ],
    });
    expect(outcome).toMatchObject({ ok: false, error: "VARIANCE_UNDERFLOW" });
  });

  it("distinguishes exact unequal differences erased by binary64 subtraction", () => {
    const outcome = computePairedTSpike({
      conditionOrder: ["before", "after"],
      repeatedMeasurements: "none",
      observations: [
        {
          observationId: "b1",
          experimentalUnitId: "u1",
          pairId: "p1",
          conditionId: "before",
          outcomeValue: 1,
        },
        {
          observationId: "a1",
          experimentalUnitId: "u2",
          pairId: "p1",
          conditionId: "after",
          outcomeValue: 2 ** -54,
        },
        {
          observationId: "b2",
          experimentalUnitId: "u3",
          pairId: "p2",
          conditionId: "before",
          outcomeValue: 1,
        },
        {
          observationId: "a2",
          experimentalUnitId: "u4",
          pairId: "p2",
          conditionId: "after",
          outcomeValue: 2 ** -55,
        },
      ],
    });
    expect(outcome).toMatchObject({
      ok: false,
      error: "DIFFERENCE_VARIANCE_ERASED_BY_ROUNDING",
    });
  });

  it("classifies finite-input subtraction overflow at the difference stage", () => {
    const outcome = computePairedTSpike({
      conditionOrder: ["before", "after"],
      repeatedMeasurements: "none",
      observations: [
        {
          observationId: "b1",
          experimentalUnitId: "u1",
          pairId: "p1",
          conditionId: "before",
          outcomeValue: Number.MAX_VALUE,
        },
        {
          observationId: "a1",
          experimentalUnitId: "u2",
          pairId: "p1",
          conditionId: "after",
          outcomeValue: -Number.MAX_VALUE,
        },
        {
          observationId: "b2",
          experimentalUnitId: "u3",
          pairId: "p2",
          conditionId: "before",
          outcomeValue: 1,
        },
        {
          observationId: "a2",
          experimentalUnitId: "u4",
          pairId: "p2",
          conditionId: "after",
          outcomeValue: 0,
        },
      ],
    });
    expect(outcome).toMatchObject({ ok: false, error: "DIFFERENCE_OVERFLOW", pairId: "p1" });
  });
});
