/**
 * Non-authoritative paired-t feasibility spike.
 *
 * This module exercises explicit pair construction and the algebraic quantities
 * that precede Student-t tail/quantile evaluation. It intentionally does not
 * compute a p-value, confidence interval, support limit, or comparison tolerance.
 * Those belong to a later versioned Public Check and independent oracle record.
 */

export type RepeatedMeasurementsDeclaration = "none" | "within_pair_only";

export interface PairedObservationSpike {
  observationId: string;
  experimentalUnitId: string;
  pairId: string;
  conditionId: string;
  outcomeValue: number;
}

export interface PairedTSpikeInput {
  conditionOrder: readonly [string, string];
  repeatedMeasurements: RepeatedMeasurementsDeclaration;
  observations: readonly PairedObservationSpike[];
}

export type PairedTSpikeErrorCode =
  | "INVALID_CONDITION_ORDER"
  | "INVALID_REPEATED_MEASUREMENTS_DECLARATION"
  | "DUPLICATE_OBSERVATION_ID"
  | "NON_FINITE_OUTCOME"
  | "UNKNOWN_CONDITION"
  | "INCOMPLETE_PAIR"
  | "DUPLICATE_PAIR_CONDITION"
  | "EXPERIMENTAL_UNIT_DECLARATION_MISMATCH"
  | "EXPERIMENTAL_UNIT_REUSED_ACROSS_PAIRS"
  | "PAIR_COUNT_BELOW_TWO"
  | "ZERO_DIFFERENCE_VARIANCE"
  | "NON_FINITE_INTERMEDIATE";

export interface PairedTSpikeResult {
  pairIds: string[];
  differences: number[];
  nPairs: number;
  meanDifference: number;
  sampleVarianceDifference: number;
  standardError: number;
  testStatistic: number;
  degreesOfFreedom: number;
}

export type PairedTSpikeOutcome =
  | { ok: true; result: PairedTSpikeResult }
  | { ok: false; error: PairedTSpikeErrorCode; pairId?: string; observationId?: string };

interface PairMembers {
  first?: PairedObservationSpike;
  second?: PairedObservationSpike;
}

function fail(
  error: PairedTSpikeErrorCode,
  detail: { pairId?: string; observationId?: string } = {},
): PairedTSpikeOutcome {
  return { ok: false, error, ...detail };
}

/** Run the deliberately incomplete paired-t feasibility path. */
export function computePairedTSpike(input: PairedTSpikeInput): PairedTSpikeOutcome {
  const [firstCondition, secondCondition] = input.conditionOrder;
  if (
    firstCondition.length === 0 ||
    secondCondition.length === 0 ||
    firstCondition === secondCondition
  ) {
    return fail("INVALID_CONDITION_ORDER");
  }
  if (input.repeatedMeasurements !== "none" && input.repeatedMeasurements !== "within_pair_only") {
    return fail("INVALID_REPEATED_MEASUREMENTS_DECLARATION");
  }

  const observationIds = new Set<string>();
  const experimentalUnitPairs = new Map<string, string>();
  const pairs = new Map<string, PairMembers>();
  for (const observation of input.observations) {
    if (observationIds.has(observation.observationId)) {
      return fail("DUPLICATE_OBSERVATION_ID", { observationId: observation.observationId });
    }
    observationIds.add(observation.observationId);
    if (!Number.isFinite(observation.outcomeValue)) {
      return fail("NON_FINITE_OUTCOME", { observationId: observation.observationId });
    }
    if (observation.conditionId !== firstCondition && observation.conditionId !== secondCondition) {
      return fail("UNKNOWN_CONDITION", {
        pairId: observation.pairId,
        observationId: observation.observationId,
      });
    }
    const existingPairId = experimentalUnitPairs.get(observation.experimentalUnitId);
    if (existingPairId !== undefined && existingPairId !== observation.pairId) {
      return fail("EXPERIMENTAL_UNIT_REUSED_ACROSS_PAIRS", {
        pairId: observation.pairId,
        observationId: observation.observationId,
      });
    }
    experimentalUnitPairs.set(observation.experimentalUnitId, observation.pairId);

    const members = pairs.get(observation.pairId) ?? {};
    const key = observation.conditionId === firstCondition ? "first" : "second";
    if (members[key] !== undefined) {
      return fail("DUPLICATE_PAIR_CONDITION", { pairId: observation.pairId });
    }
    members[key] = observation;
    pairs.set(observation.pairId, members);
  }

  const pairIds = [...pairs.keys()].sort();
  if (pairIds.length < 2) return fail("PAIR_COUNT_BELOW_TWO");

  const differences: number[] = [];
  for (const pairId of pairIds) {
    const members = pairs.get(pairId);
    if (members?.first === undefined || members.second === undefined) {
      return fail("INCOMPLETE_PAIR", { pairId });
    }
    const sameUnit = members.first.experimentalUnitId === members.second.experimentalUnitId;
    if (
      (input.repeatedMeasurements === "within_pair_only" && !sameUnit) ||
      (input.repeatedMeasurements === "none" && sameUnit)
    ) {
      return fail("EXPERIMENTAL_UNIT_DECLARATION_MISMATCH", { pairId });
    }
    const difference = members.first.outcomeValue - members.second.outcomeValue;
    if (!Number.isFinite(difference)) return fail("NON_FINITE_INTERMEDIATE", { pairId });
    differences.push(difference);
  }

  const nPairs = differences.length;
  if (differences.every((value) => value === differences[0])) {
    return fail("ZERO_DIFFERENCE_VARIANCE");
  }
  const meanDifference = differences.reduce((sum, value) => sum + value, 0) / nPairs;
  const centeredSumSquares = differences.reduce(
    (sum, value) => sum + (value - meanDifference) ** 2,
    0,
  );
  const sampleVarianceDifference = centeredSumSquares / (nPairs - 1);
  if (sampleVarianceDifference === 0) return fail("NON_FINITE_INTERMEDIATE");
  const standardError = Math.sqrt(sampleVarianceDifference / nPairs);
  const testStatistic = meanDifference / standardError;
  if (
    !Number.isFinite(meanDifference) ||
    !Number.isFinite(sampleVarianceDifference) ||
    !Number.isFinite(standardError) ||
    !Number.isFinite(testStatistic)
  ) {
    return fail("NON_FINITE_INTERMEDIATE");
  }

  return {
    ok: true,
    result: {
      pairIds,
      differences,
      nPairs,
      meanDifference,
      sampleVarianceDifference,
      standardError,
      testStatistic,
      degreesOfFreedom: nPairs - 1,
    },
  };
}
