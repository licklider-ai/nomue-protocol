/**
 * Non-authoritative actual-execution trace candidate for the reviewed R2-D5
 * G4 paired-data-to-statistic graph.
 *
 * This module does not select a supported domain, platform, resource bound,
 * Public Check, or runtime behavior. It traces the existing candidate graph
 * through mean difference, sample variance, standard error, t, and df only.
 * Student-t tail evaluation and confidence-interval endpoints are outside this
 * increment.
 */

import { createHash } from "node:crypto";
import { isDeepStrictEqual } from "node:util";
import {
  binary64ToExactDyadic,
  type PairedObservationSpike,
  type PairedTSpikeErrorCode,
  type PairedTSpikeInput,
} from "../../../reference/spikes/paired-t.js";
import { validatePairedTBinary64PrimitiveCandidate } from "./paired-t-supported-execution-candidate.js";

export const PAIRED_T_G4_MAXIMUM_PAIRS_EVALUATION_CANDIDATE = 201;
export const PAIRED_T_G4_MAXIMUM_TRACE_NODES_EVALUATION_CANDIDATE = 2048;

const TRACE_FORMAT = "paired-t-g4-actual-execution-trace-v1";
const MAXIMUM_OBSERVATIONS = PAIRED_T_G4_MAXIMUM_PAIRS_EVALUATION_CANDIDATE * 2;
const capturedMathSqrt = Math.sqrt;

type TraceOperation = "add" | "subtract" | "multiply" | "divide" | "sqrt";

interface CanonicalObservation {
  observation_id: string;
  experimental_unit_id: string;
  outcome_binary64_hex: string;
}

interface CanonicalPair {
  pair_id: string;
  first: CanonicalObservation;
  second: CanonicalObservation;
}

export interface PairedTG4ExecutionTraceInputCandidate {
  condition_order: readonly [string, string];
  repeated_measurements: "none" | "within_pair_only";
  pairs: readonly CanonicalPair[];
}

export interface PairedTG4ExecutionTraceNodeCandidate {
  sequence: number;
  label: string;
  operation: TraceOperation;
  operand_sources: readonly (number | null)[];
  operand_binary64_hex: readonly string[];
  result_binary64_hex: string;
}

export interface PairedTG4ExecutionTraceCandidate {
  format: typeof TRACE_FORMAT;
  input: PairedTG4ExecutionTraceInputCandidate;
  outcome: {
    difference_source_sequences: readonly number[];
    mean_difference_source_sequence: number;
    sample_variance_source_sequence: number;
    standard_error_source_sequence: number;
    test_statistic_source_sequence: number;
    n_pairs: number;
    degrees_of_freedom: number;
    difference_binary64_hex: readonly string[];
    mean_difference_binary64_hex: string;
    sample_variance_binary64_hex: string;
    standard_error_binary64_hex: string;
    test_statistic_binary64_hex: string;
  };
  node_count: number;
  maximum_node_count_evaluation_candidate: number;
  sha256: string;
  nodes: readonly PairedTG4ExecutionTraceNodeCandidate[];
}

export interface PairedTG4ExecutionCheckpointCandidate {
  status: string;
  issuance: string;
  review_issue: string;
  candidate_key: string;
  decision_state: string;
  runtime_support_enabled: boolean;
  supported_domain_claimed: boolean;
  scope: Record<string, unknown>;
  execution_trace: Record<string, unknown>;
  exact_primitive_verifier: Record<string, unknown>;
  closure_state: Record<string, unknown>;
  prohibited_claims: string[];
}

export type PairedTG4ExecutionCandidateResult =
  | {
      ok: true;
      status: "non_authoritative_g4_execution_evaluation";
      result: {
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
      trace: PairedTG4ExecutionTraceCandidate;
      traceVerification: {
        everyTraceNodeVerified: true;
        ordinaryArithmeticChecks: number;
        squareRootChecks: number;
      };
      candidateArithmeticExecutionVerified: true;
      mathematicalTruthErrorBoundComplete: false;
      tailCompositionComplete: false;
      confidenceIntervalCompositionComplete: false;
      supportedExecutionPredicateSatisfied: false;
      supportedPlatformClaimed: false;
      supportedDomainClaimed: false;
      runtimeSupportClaimed: false;
    }
  | {
      ok: false;
      status: "non_authoritative_g4_execution_evaluation";
      classification:
        | "invalid_candidate_input"
        | "outside_evaluation_range"
        | "g4_graph_refusal"
        | "execution_trace_resource_bound_exceeded"
        | "execution_trace_verification_failed";
      graphClassification?: PairedTSpikeErrorCode;
      pairId?: string;
      observationId?: string;
      traceErrors?: string[];
      candidateArithmeticExecutionVerified: false;
      mathematicalTruthErrorBoundComplete: false;
      tailCompositionComplete: false;
      confidenceIntervalCompositionComplete: false;
      supportedExecutionPredicateSatisfied: false;
      supportedPlatformClaimed: false;
      supportedDomainClaimed: false;
      runtimeSupportClaimed: false;
    };

interface PairMembers {
  first?: PairedObservationSpike;
  second?: PairedObservationSpike;
}

interface TrackedValue {
  value: number;
  sourceSequence: number | null;
}

interface ParsedInputSuccess {
  ok: true;
  conditionOrder: readonly [string, string];
  repeatedMeasurements: "none" | "within_pair_only";
  pairs: readonly {
    pairId: string;
    members: PairMembers;
  }[];
}

interface ParsedInputFailure {
  ok: false;
  classification: "invalid_candidate_input" | "outside_evaluation_range" | "g4_graph_refusal";
  graphClassification?: PairedTSpikeErrorCode;
  pairId?: string;
  observationId?: string;
}

type ParsedInput = ParsedInputSuccess | ParsedInputFailure;

interface ExecutionSuccess {
  ok: true;
  input: PairedTG4ExecutionTraceInputCandidate;
  nodes: PairedTG4ExecutionTraceNodeCandidate[];
  differences: TrackedValue[];
  meanDifference: TrackedValue;
  sampleVariance: TrackedValue;
  standardError: TrackedValue;
  testStatistic: TrackedValue;
}

interface ExecutionFailure {
  ok: false;
  classification:
    | "invalid_candidate_input"
    | "outside_evaluation_range"
    | "g4_graph_refusal"
    | "execution_trace_resource_bound_exceeded"
    | "execution_trace_verification_failed";
  graphClassification?: PairedTSpikeErrorCode;
  pairId?: string;
  observationId?: string;
  traceErrors?: string[];
}

type ExecutionResult = ExecutionSuccess | ExecutionFailure;

const EXPECTED_CHECKPOINT = {
  status: "non_authoritative_candidate",
  issuance: "unissued",
  review_issue: "https://github.com/licklider-ai/nomue-protocol/issues/25",
  candidate_key: "paired-t-d5-g4-actual-execution-trace-evaluation-1",
  decision_state:
    "reviewed_implementation_candidate_pending_truth_bound_tail_ci_resource_and_support_selection",
  runtime_support_enabled: false,
  supported_domain_claimed: false,
  scope: {
    input: "explicit_paired_binary64_observations",
    output: "mean_difference_sample_variance_standard_error_test_statistic_and_df",
    operation_graph: "g4_pairwise_two_pass_fixed_recursive_floor_half_split",
    student_t_tail_included: false,
    confidence_interval_endpoints_included: false,
    existing_reference_graph_changed: false,
  },
  execution_trace: {
    format: TRACE_FORMAT,
    canonical_pair_order: "ascending_pair_id_code_unit_order",
    difference_direction: "first_condition_minus_second_condition",
    value_source: "one_actual_immutable_trace",
    maximum_pairs_evaluation_candidate: PAIRED_T_G4_MAXIMUM_PAIRS_EVALUATION_CANDIDATE,
    maximum_node_count_evaluation_candidate: PAIRED_T_G4_MAXIMUM_TRACE_NODES_EVALUATION_CANDIDATE,
    maximum_values_are_supported_resource_bounds: false,
    mutation_disposition: "fail_closed",
  },
  exact_primitive_verifier: {
    source: "tooling/src/spikes/paired-t-supported-execution-candidate.ts",
    ordinary_operations: ["add", "subtract", "multiply", "divide"],
    square_root_method: "exact_binary64_rounding_cell_strict_containment",
    every_recorded_node_verified_before_candidate_acceptance: true,
  },
  closure_state: {
    implementation: "implemented_and_independently_reviewed",
    g4_mathematical_truth_error_bound: "pending",
    tail_trace_composition: "pending",
    confidence_interval_trace_composition: "pending",
    supported_resource_bound: "unselected",
    supported_execution_predicate: "unselected",
  },
  prohibited_claims: [
    "supported_pair_or_df_max",
    "supported_value_domain",
    "complete_g4_mathematical_truth_error_bound",
    "complete_end_to_end_p_value_trace",
    "complete_confidence_interval_trace",
    "selected_supported_platform",
    "selected_supported_execution_predicate",
    "authoritative_public_check_or_bundle",
    "release_2_complete",
  ],
} as const;

class TraceResourceLimitError extends Error {}
class PrimitiveVerificationError extends Error {}
class GraphRefusalError extends Error {
  constructor(readonly graphClassification: PairedTSpikeErrorCode) {
    super(graphClassification);
  }
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

function numberHex(value: number): string {
  const view = new DataView(new ArrayBuffer(8));
  view.setFloat64(0, value, false);
  return view.getBigUint64(0, false).toString(16).padStart(16, "0");
}

function numberFromHex(value: string): number {
  const view = new DataView(new ArrayBuffer(8));
  view.setBigUint64(0, BigInt(`0x${value}`), false);
  return view.getFloat64(0, false);
}

function normalizeExactDifference(firstValue: number, secondValue: number): string {
  const first = binary64ToExactDyadic(firstValue);
  const second = binary64ToExactDyadic(secondValue);
  let denominatorExponent = Math.max(first.denominatorExponent, second.denominatorExponent);
  let numerator =
    (first.numerator << BigInt(denominatorExponent - first.denominatorExponent)) -
    (second.numerator << BigInt(denominatorExponent - second.denominatorExponent));
  if (numerator === 0n) return "0/0";
  while (denominatorExponent > 0 && (numerator & 1n) === 0n) {
    numerator >>= 1n;
    denominatorExponent -= 1;
  }
  return `${numerator}/${denominatorExponent}`;
}

function failure(
  graphClassification: PairedTSpikeErrorCode,
  detail: { pairId?: string; observationId?: string } = {},
): ParsedInputFailure {
  return { ok: false, classification: "g4_graph_refusal", graphClassification, ...detail };
}

function parseCandidateInput(candidate: unknown): ParsedInput {
  const top = ownDataRecord(candidate, ["conditionOrder", "repeatedMeasurements", "observations"]);
  if (top === undefined) return { ok: false, classification: "invalid_candidate_input" };
  const conditionOrder = ownDataArray(top["conditionOrder"], 2);
  if (
    conditionOrder === undefined ||
    conditionOrder.length !== 2 ||
    typeof conditionOrder[0] !== "string" ||
    typeof conditionOrder[1] !== "string"
  ) {
    return { ok: false, classification: "invalid_candidate_input" };
  }
  const firstCondition = conditionOrder[0];
  const secondCondition = conditionOrder[1];
  if (
    firstCondition.length === 0 ||
    secondCondition.length === 0 ||
    firstCondition === secondCondition
  ) {
    return failure("INVALID_CONDITION_ORDER");
  }
  const repeatedMeasurements = top["repeatedMeasurements"];
  if (repeatedMeasurements !== "none" && repeatedMeasurements !== "within_pair_only") {
    return failure("INVALID_REPEATED_MEASUREMENTS_DECLARATION");
  }

  const rawObservations = ownDataArray(top["observations"], MAXIMUM_OBSERVATIONS);
  if (rawObservations === undefined) {
    try {
      if (
        Array.isArray(top["observations"]) &&
        Number.isSafeInteger(top["observations"].length) &&
        top["observations"].length > MAXIMUM_OBSERVATIONS
      ) {
        return { ok: false, classification: "outside_evaluation_range" };
      }
    } catch {
      // The closed parser reports the same generic refusal for hostile arrays.
    }
    return { ok: false, classification: "invalid_candidate_input" };
  }

  const observationIds = new Set<string>();
  const experimentalUnitPairs = new Map<string, string>();
  const pairs = new Map<string, PairMembers>();
  for (const raw of rawObservations) {
    const observation = ownDataRecord(raw, [
      "observationId",
      "experimentalUnitId",
      "pairId",
      "conditionId",
      "outcomeValue",
    ]);
    if (
      observation === undefined ||
      typeof observation["observationId"] !== "string" ||
      typeof observation["experimentalUnitId"] !== "string" ||
      typeof observation["pairId"] !== "string" ||
      typeof observation["conditionId"] !== "string" ||
      typeof observation["outcomeValue"] !== "number"
    ) {
      return { ok: false, classification: "invalid_candidate_input" };
    }
    const typed = {
      observationId: observation["observationId"],
      experimentalUnitId: observation["experimentalUnitId"],
      pairId: observation["pairId"],
      conditionId: observation["conditionId"],
      outcomeValue: observation["outcomeValue"],
    };
    if (observationIds.has(typed.observationId)) {
      return failure("DUPLICATE_OBSERVATION_ID", { observationId: typed.observationId });
    }
    observationIds.add(typed.observationId);
    if (!Number.isFinite(typed.outcomeValue)) {
      return failure("NON_FINITE_OUTCOME", { observationId: typed.observationId });
    }
    if (typed.conditionId !== firstCondition && typed.conditionId !== secondCondition) {
      return failure("UNKNOWN_CONDITION", {
        pairId: typed.pairId,
        observationId: typed.observationId,
      });
    }
    const existingPairId = experimentalUnitPairs.get(typed.experimentalUnitId);
    if (existingPairId !== undefined && existingPairId !== typed.pairId) {
      return failure("EXPERIMENTAL_UNIT_REUSED_ACROSS_PAIRS", {
        pairId: typed.pairId,
        observationId: typed.observationId,
      });
    }
    experimentalUnitPairs.set(typed.experimentalUnitId, typed.pairId);
    const members = pairs.get(typed.pairId) ?? {};
    const key = typed.conditionId === firstCondition ? "first" : "second";
    if (members[key] !== undefined)
      return failure("DUPLICATE_PAIR_CONDITION", { pairId: typed.pairId });
    members[key] = typed;
    pairs.set(typed.pairId, members);
  }

  const pairIds = [...pairs.keys()].sort();
  if (pairIds.length > PAIRED_T_G4_MAXIMUM_PAIRS_EVALUATION_CANDIDATE) {
    return { ok: false, classification: "outside_evaluation_range" };
  }
  if (pairIds.length < 2) return failure("PAIR_COUNT_BELOW_TWO");

  return {
    ok: true,
    conditionOrder: [firstCondition, secondCondition],
    repeatedMeasurements,
    pairs: pairIds.map((pairId) => ({ pairId, members: pairs.get(pairId)! })),
  };
}

class TraceRecorder {
  readonly nodes: PairedTG4ExecutionTraceNodeCandidate[] = [];

  record(
    label: string,
    operation: TraceOperation,
    operands: readonly TrackedValue[],
  ): TrackedValue {
    let value: number;
    if (operation === "sqrt") {
      value = capturedMathSqrt(operands[0]!.value);
    } else if (operation === "add") {
      value = operands[0]!.value + operands[1]!.value;
    } else if (operation === "subtract") {
      value = operands[0]!.value - operands[1]!.value;
    } else if (operation === "multiply") {
      value = operands[0]!.value * operands[1]!.value;
    } else {
      value = operands[0]!.value / operands[1]!.value;
    }
    const node: PairedTG4ExecutionTraceNodeCandidate = {
      sequence: this.nodes.length + 1,
      label,
      operation,
      operand_sources: operands.map((operand) => operand.sourceSequence),
      operand_binary64_hex: operands.map((operand) => numberHex(operand.value)),
      result_binary64_hex: numberHex(value),
    };
    this.nodes.push(node);
    if (this.nodes.length > PAIRED_T_G4_MAXIMUM_TRACE_NODES_EVALUATION_CANDIDATE) {
      throw new TraceResourceLimitError("G4 trace exceeded the evaluation node ceiling");
    }
    const errors = validatePairedTBinary64PrimitiveCandidate({
      operation,
      operands: node.operand_binary64_hex,
      result: node.result_binary64_hex,
    });
    if (errors.length > 0) throw new PrimitiveVerificationError(errors.join("; "));
    return { value, sourceSequence: node.sequence };
  }
}

function constant(value: number): TrackedValue {
  return { value, sourceSequence: null };
}

function pairwiseSum(
  recorder: TraceRecorder,
  values: readonly TrackedValue[],
  label: string,
  overflowClassification: PairedTSpikeErrorCode,
): TrackedValue {
  const sumRange = (start: number, end: number): TrackedValue => {
    if (end - start === 1) return values[start]!;
    const middle = start + Math.floor((end - start) / 2);
    const left = sumRange(start, middle);
    const right = sumRange(middle, end);
    const result = recorder.record(`${label}:${start}:${end}`, "add", [left, right]);
    if (!Number.isFinite(result.value)) throw new GraphRefusalError(overflowClassification);
    return result;
  };
  return sumRange(0, values.length);
}

function candidateInputFromTraceInput(
  input: PairedTG4ExecutionTraceInputCandidate,
): PairedTSpikeInput {
  const observations: PairedObservationSpike[] = [];
  for (const pair of input.pairs) {
    observations.push(
      {
        observationId: pair.first.observation_id,
        experimentalUnitId: pair.first.experimental_unit_id,
        pairId: pair.pair_id,
        conditionId: input.condition_order[0],
        outcomeValue: numberFromHex(pair.first.outcome_binary64_hex),
      },
      {
        observationId: pair.second.observation_id,
        experimentalUnitId: pair.second.experimental_unit_id,
        pairId: pair.pair_id,
        conditionId: input.condition_order[1],
        outcomeValue: numberFromHex(pair.second.outcome_binary64_hex),
      },
    );
  }
  return {
    conditionOrder: [input.condition_order[0], input.condition_order[1]],
    repeatedMeasurements: input.repeated_measurements,
    observations,
  };
}

function executeParsedInput(parsed: ParsedInputSuccess): ExecutionResult {
  const recorder = new TraceRecorder();
  try {
    const canonicalPairs: CanonicalPair[] = [];
    const differences: TrackedValue[] = [];
    const exactDifferences: string[] = [];
    for (const [index, { pairId, members }] of parsed.pairs.entries()) {
      if (members.first === undefined || members.second === undefined) {
        return failure("INCOMPLETE_PAIR", { pairId });
      }
      const sameUnit = members.first.experimentalUnitId === members.second.experimentalUnitId;
      if (
        (parsed.repeatedMeasurements === "within_pair_only" && !sameUnit) ||
        (parsed.repeatedMeasurements === "none" && sameUnit)
      ) {
        return failure("EXPERIMENTAL_UNIT_DECLARATION_MISMATCH", { pairId });
      }
      const first = members.first.outcomeValue;
      const second = members.second.outcomeValue;
      exactDifferences.push(normalizeExactDifference(first, second));
      const difference = recorder.record(`difference:${index}`, "subtract", [
        constant(first),
        constant(second),
      ]);
      if (!Number.isFinite(difference.value)) {
        return failure("DIFFERENCE_OVERFLOW", { pairId });
      }
      differences.push(difference);
      canonicalPairs.push({
        pair_id: pairId,
        first: {
          observation_id: members.first.observationId,
          experimental_unit_id: members.first.experimentalUnitId,
          outcome_binary64_hex: numberHex(first),
        },
        second: {
          observation_id: members.second.observationId,
          experimental_unit_id: members.second.experimentalUnitId,
          outcome_binary64_hex: numberHex(second),
        },
      });
    }
    const input: PairedTG4ExecutionTraceInputCandidate = {
      condition_order: [parsed.conditionOrder[0], parsed.conditionOrder[1]],
      repeated_measurements: parsed.repeatedMeasurements,
      pairs: canonicalPairs,
    };
    if (exactDifferences.every((value) => value === exactDifferences[0])) {
      return failure("ZERO_DIFFERENCE_VARIANCE");
    }
    if (differences.every((value) => value.value === differences[0]!.value)) {
      return failure("DIFFERENCE_VARIANCE_ERASED_BY_ROUNDING");
    }

    const differenceSum = pairwiseSum(
      recorder,
      differences,
      "difference_sum",
      "MEAN_ACCUMULATION_OVERFLOW",
    );
    const meanDifference = recorder.record("mean_difference", "divide", [
      differenceSum,
      constant(differences.length),
    ]);
    if (!Number.isFinite(meanDifference.value)) return failure("NON_FINITE_INTERMEDIATE");

    const centered = differences.map((difference, index) =>
      recorder.record(`centered_difference:${index}`, "subtract", [difference, meanDifference]),
    );
    if (centered.some((value) => !Number.isFinite(value.value)))
      return failure("CENTERING_OVERFLOW");
    const squared = centered.map((value, index) =>
      recorder.record(`squared_deviation:${index}`, "multiply", [value, value]),
    );
    if (squared.some((value) => !Number.isFinite(value.value))) {
      return failure("SQUARED_DEVIATION_OVERFLOW");
    }
    const centeredSumSquares = pairwiseSum(
      recorder,
      squared,
      "centered_sum_squares",
      "VARIANCE_ACCUMULATION_OVERFLOW",
    );
    const sampleVariance = recorder.record("sample_variance", "divide", [
      centeredSumSquares,
      constant(differences.length - 1),
    ]);
    if (sampleVariance.value === 0) return failure("VARIANCE_UNDERFLOW");
    if (!Number.isFinite(sampleVariance.value)) return failure("NON_FINITE_INTERMEDIATE");
    const standardErrorSquared = recorder.record("standard_error_squared", "divide", [
      sampleVariance,
      constant(differences.length),
    ]);
    if (standardErrorSquared.value === 0) return failure("STANDARD_ERROR_SQUARED_UNDERFLOW");
    const standardError = recorder.record("standard_error", "sqrt", [standardErrorSquared]);
    const testStatistic = recorder.record("test_statistic", "divide", [
      meanDifference,
      standardError,
    ]);
    if (!Number.isFinite(standardError.value) || !Number.isFinite(testStatistic.value)) {
      return failure("NON_FINITE_INTERMEDIATE");
    }
    return {
      ok: true,
      input,
      nodes: recorder.nodes,
      differences,
      meanDifference,
      sampleVariance,
      standardError,
      testStatistic,
    };
  } catch (error) {
    if (error instanceof GraphRefusalError) {
      return failure(error.graphClassification);
    }
    if (error instanceof TraceResourceLimitError) {
      return { ok: false, classification: "execution_trace_resource_bound_exceeded" };
    }
    if (error instanceof PrimitiveVerificationError) {
      return {
        ok: false,
        classification: "execution_trace_verification_failed",
        traceErrors: [error.message],
      };
    }
    return {
      ok: false,
      classification: "execution_trace_verification_failed",
      traceErrors: ["G4 execution failed without a classified candidate outcome"],
    };
  }
}

function executeCandidate(candidate: unknown): ExecutionResult {
  const parsed = parseCandidateInput(candidate);
  return parsed.ok ? executeParsedInput(parsed) : parsed;
}

function tracePayload(trace: PairedTG4ExecutionTraceCandidate): unknown {
  return {
    format: trace.format,
    input: trace.input,
    outcome: trace.outcome,
    node_count: trace.node_count,
    maximum_node_count_evaluation_candidate: trace.maximum_node_count_evaluation_candidate,
    nodes: trace.nodes,
  };
}

function traceSha256(trace: PairedTG4ExecutionTraceCandidate): string {
  return `sha256:${createHash("sha256")
    .update(JSON.stringify(tracePayload(trace)), "utf8")
    .digest("hex")}`;
}

function buildTrace(execution: ExecutionSuccess): PairedTG4ExecutionTraceCandidate {
  const trace: PairedTG4ExecutionTraceCandidate = {
    format: TRACE_FORMAT,
    input: execution.input,
    outcome: {
      difference_source_sequences: execution.differences.map((value) => value.sourceSequence!),
      mean_difference_source_sequence: execution.meanDifference.sourceSequence!,
      sample_variance_source_sequence: execution.sampleVariance.sourceSequence!,
      standard_error_source_sequence: execution.standardError.sourceSequence!,
      test_statistic_source_sequence: execution.testStatistic.sourceSequence!,
      n_pairs: execution.differences.length,
      degrees_of_freedom: execution.differences.length - 1,
      difference_binary64_hex: execution.differences.map((value) => numberHex(value.value)),
      mean_difference_binary64_hex: numberHex(execution.meanDifference.value),
      sample_variance_binary64_hex: numberHex(execution.sampleVariance.value),
      standard_error_binary64_hex: numberHex(execution.standardError.value),
      test_statistic_binary64_hex: numberHex(execution.testStatistic.value),
    },
    node_count: execution.nodes.length,
    maximum_node_count_evaluation_candidate: PAIRED_T_G4_MAXIMUM_TRACE_NODES_EVALUATION_CANDIDATE,
    sha256: "",
    nodes: execution.nodes,
  };
  trace.sha256 = traceSha256(trace);
  return trace;
}

type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };

function canonicalizeJson(value: unknown, ancestors = new Set<object>()): JsonValue {
  if (value === null || typeof value === "boolean" || typeof value === "string") return value;
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new TypeError("trace contains a non-finite JSON number");
    return value;
  }
  if (typeof value !== "object") throw new TypeError("trace contains non-JSON data");
  if (ancestors.has(value)) throw new TypeError("trace contains a cycle");
  ancestors.add(value);
  try {
    if (Array.isArray(value)) {
      const array = ownDataArray(value, PAIRED_T_G4_MAXIMUM_TRACE_NODES_EVALUATION_CANDIDATE * 8);
      if (array === undefined) throw new TypeError("trace contains a non-data array");
      return array.map((entry) => canonicalizeJson(entry, ancestors));
    }
    const prototype = Reflect.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) {
      throw new TypeError("trace contains a non-JSON object");
    }
    const result: Record<string, JsonValue> = {};
    for (const key of Reflect.ownKeys(value)) {
      if (typeof key !== "string") throw new TypeError("trace contains a symbol key");
      const descriptor = Reflect.getOwnPropertyDescriptor(value, key);
      if (descriptor === undefined || !("value" in descriptor) || descriptor.enumerable !== true) {
        throw new TypeError("trace contains a non-data property");
      }
      result[key] = canonicalizeJson(descriptor.value, ancestors);
    }
    return result;
  } finally {
    ancestors.delete(value);
  }
}

function traceInputFromUnknown(value: unknown): PairedTG4ExecutionTraceInputCandidate | undefined {
  const record = ownDataRecord(value, ["condition_order", "repeated_measurements", "pairs"]);
  if (record === undefined) return undefined;
  const conditions = ownDataArray(record["condition_order"], 2);
  const pairs = ownDataArray(record["pairs"], PAIRED_T_G4_MAXIMUM_PAIRS_EVALUATION_CANDIDATE);
  if (
    conditions === undefined ||
    conditions.length !== 2 ||
    typeof conditions[0] !== "string" ||
    typeof conditions[1] !== "string" ||
    (record["repeated_measurements"] !== "none" &&
      record["repeated_measurements"] !== "within_pair_only") ||
    pairs === undefined
  ) {
    return undefined;
  }
  const parsedPairs: CanonicalPair[] = [];
  for (const rawPair of pairs) {
    const pair = ownDataRecord(rawPair, ["pair_id", "first", "second"]);
    if (pair === undefined || typeof pair["pair_id"] !== "string") return undefined;
    const parseObservation = (raw: unknown): CanonicalObservation | undefined => {
      const observation = ownDataRecord(raw, [
        "observation_id",
        "experimental_unit_id",
        "outcome_binary64_hex",
      ]);
      if (
        observation === undefined ||
        typeof observation["observation_id"] !== "string" ||
        typeof observation["experimental_unit_id"] !== "string" ||
        typeof observation["outcome_binary64_hex"] !== "string" ||
        !/^[0-9a-f]{16}$/.test(observation["outcome_binary64_hex"])
      ) {
        return undefined;
      }
      return {
        observation_id: observation["observation_id"],
        experimental_unit_id: observation["experimental_unit_id"],
        outcome_binary64_hex: observation["outcome_binary64_hex"],
      };
    };
    const first = parseObservation(pair["first"]);
    const second = parseObservation(pair["second"]);
    if (first === undefined || second === undefined) return undefined;
    parsedPairs.push({ pair_id: pair["pair_id"], first, second });
  }
  return {
    condition_order: [conditions[0], conditions[1]],
    repeated_measurements: record["repeated_measurements"],
    pairs: parsedPairs,
  };
}

/** Verify structure, exact primitives, schedule, sources, outcome, and digest. */
export function verifyPairedTG4ExecutionTraceCandidate(candidate: unknown): {
  ok: boolean;
  errors: string[];
} {
  let canonical: JsonValue;
  try {
    canonical = canonicalizeJson(candidate);
  } catch {
    return { ok: false, errors: ["G4 trace is not closed JSON data"] };
  }
  const top = ownDataRecord(canonical, [
    "format",
    "input",
    "outcome",
    "node_count",
    "maximum_node_count_evaluation_candidate",
    "sha256",
    "nodes",
  ]);
  if (top === undefined || top["format"] !== TRACE_FORMAT) {
    return { ok: false, errors: ["G4 trace has an invalid closed structure"] };
  }
  const input = traceInputFromUnknown(top["input"]);
  const nodes = ownDataArray(top["nodes"], PAIRED_T_G4_MAXIMUM_TRACE_NODES_EVALUATION_CANDIDATE);
  if (input === undefined || nodes === undefined) {
    return { ok: false, errors: ["G4 trace has an invalid closed structure"] };
  }
  const errors: string[] = [];
  for (const [index, rawNode] of nodes.entries()) {
    const node = ownDataRecord(rawNode, [
      "sequence",
      "label",
      "operation",
      "operand_sources",
      "operand_binary64_hex",
      "result_binary64_hex",
    ]);
    if (node === undefined) {
      errors.push(`G4 trace node ${index + 1} has an invalid closed structure`);
      continue;
    }
    const primitiveErrors = validatePairedTBinary64PrimitiveCandidate({
      operation: node["operation"],
      operands: node["operand_binary64_hex"],
      result: node["result_binary64_hex"],
    });
    if (primitiveErrors.length > 0)
      errors.push(`G4 trace node ${index + 1} fails exact verification`);
  }
  const replay = executeCandidate(candidateInputFromTraceInput(input));
  if (!replay.ok) {
    errors.push("G4 trace input does not reproduce a complete candidate graph");
    return { ok: false, errors };
  }
  const expected = buildTrace(replay);
  if (!isDeepStrictEqual(canonical, expected)) {
    errors.push("G4 trace differs from the independently reconstructed schedule and outcome");
  }
  return { ok: errors.length === 0, errors };
}

function deepFreeze<T>(value: T): T {
  if (typeof value !== "object" || value === null || Object.isFrozen(value)) return value;
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Reflect.getOwnPropertyDescriptor(value, key);
    if (descriptor !== undefined && "value" in descriptor) deepFreeze(descriptor.value);
  }
  return Object.freeze(value);
}

function refused(execution: ExecutionFailure): PairedTG4ExecutionCandidateResult {
  return {
    ok: false,
    status: "non_authoritative_g4_execution_evaluation",
    classification: execution.classification,
    ...(execution.graphClassification === undefined
      ? {}
      : { graphClassification: execution.graphClassification }),
    ...(execution.pairId === undefined ? {} : { pairId: execution.pairId }),
    ...(execution.observationId === undefined ? {} : { observationId: execution.observationId }),
    ...(execution.traceErrors === undefined ? {} : { traceErrors: execution.traceErrors }),
    candidateArithmeticExecutionVerified: false,
    mathematicalTruthErrorBoundComplete: false,
    tailCompositionComplete: false,
    confidenceIntervalCompositionComplete: false,
    supportedExecutionPredicateSatisfied: false,
    supportedPlatformClaimed: false,
    supportedDomainClaimed: false,
    runtimeSupportClaimed: false,
  };
}

/** Evaluate the G4 actual-execution trace candidate without selecting support. */
export function evaluatePairedTG4ExecutionTraceCandidate(
  candidate: unknown,
): PairedTG4ExecutionCandidateResult {
  const execution = executeCandidate(candidate);
  if (!execution.ok) return refused(execution);
  const trace = buildTrace(execution);
  const verification = verifyPairedTG4ExecutionTraceCandidate(trace);
  if (!verification.ok) {
    return refused({
      ok: false,
      classification: "execution_trace_verification_failed",
      traceErrors: verification.errors,
    });
  }
  deepFreeze(trace);
  const result = {
    operationGraph: "g4-pairwise-two-pass-candidate" as const,
    pairIds: trace.input.pairs.map((pair) => pair.pair_id),
    differences: trace.outcome.difference_binary64_hex.map(numberFromHex),
    nPairs: trace.outcome.n_pairs,
    meanDifference: numberFromHex(trace.outcome.mean_difference_binary64_hex),
    sampleVarianceDifference: numberFromHex(trace.outcome.sample_variance_binary64_hex),
    standardError: numberFromHex(trace.outcome.standard_error_binary64_hex),
    testStatistic: numberFromHex(trace.outcome.test_statistic_binary64_hex),
    degreesOfFreedom: trace.outcome.degrees_of_freedom,
  };
  deepFreeze(result);
  return {
    ok: true,
    status: "non_authoritative_g4_execution_evaluation",
    result,
    trace,
    traceVerification: {
      everyTraceNodeVerified: true,
      ordinaryArithmeticChecks: trace.nodes.filter((node) => node.operation !== "sqrt").length,
      squareRootChecks: trace.nodes.filter((node) => node.operation === "sqrt").length,
    },
    candidateArithmeticExecutionVerified: true,
    mathematicalTruthErrorBoundComplete: false,
    tailCompositionComplete: false,
    confidenceIntervalCompositionComplete: false,
    supportedExecutionPredicateSatisfied: false,
    supportedPlatformClaimed: false,
    supportedDomainClaimed: false,
    runtimeSupportClaimed: false,
  };
}

/** Fail-closed exact checkpoint validator for this unissued candidate. */
export function validatePairedTG4ExecutionCheckpoint(candidate: unknown): string[] {
  try {
    const canonical = canonicalizeJson(candidate);
    return isDeepStrictEqual(canonical, EXPECTED_CHECKPOINT)
      ? []
      : ["G4 execution checkpoint differs from the closed non-runtime candidate"];
  } catch {
    return ["G4 execution checkpoint differs from the closed non-runtime candidate"];
  }
}
