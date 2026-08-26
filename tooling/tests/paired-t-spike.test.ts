import { describe, expect, it } from "vitest";
import {
  computePairedTSpike,
  type PairedObservationSpike,
} from "../../reference/spikes/paired-t.js";

const observations: PairedObservationSpike[] = [
  { observationId: "a2", experimentalUnitId: "u2", pairId: "p2", conditionId: "after", outcomeValue: 3 },
  { observationId: "b1", experimentalUnitId: "u1", pairId: "p1", conditionId: "before", outcomeValue: 2 },
  { observationId: "a3", experimentalUnitId: "u3", pairId: "p3", conditionId: "after", outcomeValue: 1 },
  { observationId: "a1", experimentalUnitId: "u1", pairId: "p1", conditionId: "after", outcomeValue: 1 },
  { observationId: "b3", experimentalUnitId: "u3", pairId: "p3", conditionId: "before", outcomeValue: 4 },
  { observationId: "b2", experimentalUnitId: "u2", pairId: "p2", conditionId: "before", outcomeValue: 5 },
];

describe("non-authoritative paired-t spike", () => {
  it("constructs explicit pairs independent of observation order", () => {
    const outcome = computePairedTSpike({
      conditionOrder: ["before", "after"],
      repeatedMeasurements: "within_pair_only",
      observations,
    });
    expect(outcome.ok).toBe(true);
    if (!outcome.ok) return;
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
});
