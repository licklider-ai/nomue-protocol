/** Non-authoritative fixed-95 confidence-interval actual-execution trace candidate. */

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import {
  evaluatePairedTG4ExecutionTraceCandidate,
  verifyPairedTG4ExecutionTraceCandidate,
  type PairedTG4ExecutionTraceCandidate,
} from "./paired-t-g4-execution-trace-candidate.js";
import { validatePairedTSelectedFixed95TableCandidate } from "./paired-t-selected-fixed-95-table-candidate.js";
import { validatePairedTBinary64PrimitiveCandidate } from "./paired-t-supported-execution-candidate.js";

export const PAIRED_T_SELECTED_FIXED_95_TABLE_CONTENT_HASH =
  "sha256:24ccc86d7a49b9e1ef1e3fc9b038a5b8d338b8b5ca4a02492d8900d7e7dea3c0";

const TRACE_FORMAT = "paired-t-ci-actual-execution-trace-v1";
const TABLE_PATH = fileURLToPath(
  new URL(
    "../../../governance/drafts/release-2-candidate/numerical/fixed-95-critical-value-table-selected-candidate.json",
    import.meta.url,
  ),
);
const HEX64 = /^[0-9a-f]{16}$/;

type CIOperation = "multiply" | "subtract" | "add";
type JsonRecord = Record<string, unknown>;

export interface PairedTCIExecutionTraceNodeCandidate {
  sequence: number;
  label: "ci.margin" | "ci.lower" | "ci.upper";
  operation: CIOperation;
  operand_sources: readonly [string, string];
  operand_binary64_hex: readonly [string, string];
  result_binary64_hex: string;
}

export interface PairedTCIExecutionTraceCandidate {
  format: typeof TRACE_FORMAT;
  g4_trace: PairedTG4ExecutionTraceCandidate;
  selected_table: {
    artifact: "governance/drafts/release-2-candidate/numerical/fixed-95-critical-value-table-selected-candidate.json";
    ordered_cell_content_hash: typeof PAIRED_T_SELECTED_FIXED_95_TABLE_CONTENT_HASH;
    degrees_of_freedom: number;
    critical_value_binary64_hex: string;
  };
  nodes: readonly PairedTCIExecutionTraceNodeCandidate[];
  outcome: {
    mean_difference_binary64_hex: string;
    standard_error_binary64_hex: string;
    margin_binary64_hex: string;
    lower_endpoint_binary64_hex: string;
    upper_endpoint_binary64_hex: string;
    degrees_of_freedom: number;
  };
  node_count: 3;
  sha256: string;
}

export interface PairedTCIExecutionCheckpointCandidate {
  status: string;
  issuance: string;
  review_issue: string;
  candidate_key: string;
  decision_state: string;
  runtime_support_enabled: boolean;
  supported_domain_claimed: boolean;
  scope: Record<string, unknown>;
  execution_trace: Record<string, unknown>;
  selected_table_binding: Record<string, unknown>;
  closure_state: Record<string, unknown>;
  prohibited_claims: string[];
}

export type PairedTCIExecutionCandidateResult =
  | {
      ok: true;
      status: "non_authoritative_ci_execution_evaluation";
      result: {
        meanDifference: number;
        standardError: number;
        criticalValue: number;
        margin: number;
        lowerEndpoint: number;
        upperEndpoint: number;
        degreesOfFreedom: number;
      };
      trace: PairedTCIExecutionTraceCandidate;
      ciSpecificPrimitiveChecks: 3;
      g4TraceReverified: true;
      selectedTableRevalidated: true;
      confidenceIntervalEndpointTruthComplete: false;
      supportedExecutionPredicateSatisfied: false;
      supportedDomainClaimed: false;
      runtimeSupportClaimed: false;
    }
  | {
      ok: false;
      status: "non_authoritative_ci_execution_evaluation";
      classification:
        | "g4_stage_refusal"
        | "selected_critical_value_table_unavailable"
        | "non_finite_ci_intermediate"
        | "confidence_interval_endpoint_collapse"
        | "ci_trace_verification_failed";
      upstreamClassification?: string;
      traceErrors?: string[];
      confidenceIntervalEndpointTruthComplete: false;
      supportedExecutionPredicateSatisfied: false;
      supportedDomainClaimed: false;
      runtimeSupportClaimed: false;
    };

const EXPECTED_CHECKPOINT = {
  status: "non_authoritative_candidate",
  issuance: "unissued",
  review_issue: "https://github.com/licklider-ai/nomue-protocol/issues/25",
  candidate_key: "paired-t-d5-ci-actual-execution-trace-candidate-1",
  decision_state:
    "actual_execution_trace_candidate_pending_independent_review_and_endpoint_truth_closure",
  runtime_support_enabled: false,
  supported_domain_claimed: false,
  scope: {
    input: "explicit_paired_binary64_observations",
    upstream_graph: "reviewed_g4_actual_execution_trace",
    critical_value_source: "exact_reviewed_fixed_95_table_content_selected_for_candidate_ci_work",
    output: "fixed_95_mean_difference_confidence_interval_endpoints",
    confidence_interval_endpoint_truth_included: false,
  },
  execution_trace: {
    format: TRACE_FORMAT,
    g4_trace_reverified: true,
    selected_table_revalidated_before_lookup: true,
    critical_value_lookup: "exact_integer_df_index_into_selected_200_cell_candidate_table",
    margin_operation: "critical_value_multiply_standard_error",
    lower_operation: "mean_difference_subtract_margin",
    upper_operation: "mean_difference_add_margin",
    ci_specific_primitive_count: 3,
    exact_primitive_verification_required: true,
    returned_endpoints_from_same_verified_trace: true,
    finite_distinct_endpoint_refusal: true,
  },
  selected_table_binding: {
    artifact:
      "governance/drafts/release-2-candidate/numerical/fixed-95-critical-value-table-selected-candidate.json",
    validator: "tooling/src/spikes/paired-t-selected-fixed-95-table-candidate.ts",
    ordered_cell_content_hash: PAIRED_T_SELECTED_FIXED_95_TABLE_CONTENT_HASH,
    supported_degrees_of_freedom_maximum: null,
  },
  closure_state: {
    actual_execution_trace: "implemented_pending_independent_review",
    confidence_interval_endpoint_truth_ledger: "pending",
    supported_platform_matrix: "pending",
    supported_execution_predicate: "unselected",
    supported_domain: false,
    runtime_support: false,
    final_reason_codes_frozen: false,
    m3_closed: false,
  },
  prohibited_claims: [
    "complete_confidence_interval_truth_bound",
    "supported_df_max",
    "supported_platform_or_execution_predicate",
    "supported_runtime_paired_t",
    "final_reason_codes_frozen",
    "authoritative_public_check_or_bundle",
    "r2_d5_complete",
    "release_2_complete",
  ],
} as const;

function strictJsonCopy(value: unknown, ancestors = new Set<object>()): unknown {
  if (
    value === undefined ||
    typeof value === "bigint" ||
    typeof value === "function" ||
    typeof value === "symbol" ||
    (typeof value === "number" && !Number.isFinite(value))
  ) {
    throw new TypeError("CI trace contains non-JSON data");
  }
  if (typeof value !== "object" || value === null) return value;
  if (ancestors.has(value)) throw new TypeError("CI trace contains a cycle");

  const nextAncestors = new Set(ancestors).add(value);
  const keys = Reflect.ownKeys(value);
  if (keys.some((key) => typeof key === "symbol")) throw new TypeError("CI trace has symbol keys");
  const descriptors = Object.getOwnPropertyDescriptors(value);

  if (Array.isArray(value)) {
    const lengthDescriptor = Object.getOwnPropertyDescriptor(value, "length");
    if (
      lengthDescriptor === undefined ||
      !("value" in lengthDescriptor) ||
      typeof lengthDescriptor.value !== "number" ||
      !Number.isSafeInteger(lengthDescriptor.value) ||
      lengthDescriptor.value < 0 ||
      keys.length !== lengthDescriptor.value + 1
    ) {
      throw new TypeError("CI trace has an invalid array");
    }
    const result: unknown[] = [];
    for (let index = 0; index < lengthDescriptor.value; index += 1) {
      const descriptor = descriptors[String(index)];
      if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
        throw new TypeError("CI trace has a non-JSON array entry");
      }
      result.push(strictJsonCopy(descriptor.value, nextAncestors));
    }
    return result;
  }

  if (Object.getPrototypeOf(value) !== Object.prototype) {
    throw new TypeError("CI trace has a non-JSON object");
  }
  const result: JsonRecord = {};
  for (const key of keys) {
    if (typeof key !== "string") throw new TypeError("CI trace has a non-string key");
    const descriptor = descriptors[key];
    if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
      throw new TypeError("CI trace contains hidden or accessor data");
    }
    result[key] = strictJsonCopy(descriptor.value, nextAncestors);
  }
  return result;
}

function binary64Hex(value: number): string {
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  view.setFloat64(0, value, false);
  return view.getBigUint64(0, false).toString(16).padStart(16, "0");
}

function numberFromHex(hex: string): number | undefined {
  if (!HEX64.test(hex)) return undefined;
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  view.setBigUint64(0, BigInt(`0x${hex}`), false);
  const value = view.getFloat64(0, false);
  return Number.isFinite(value) ? value : undefined;
}

function sha256Trace(value: Omit<PairedTCIExecutionTraceCandidate, "sha256">): string {
  return `sha256:${createHash("sha256").update(JSON.stringify(value)).digest("hex")}`;
}

function deepFreeze<T>(value: T): T {
  if (typeof value !== "object" || value === null || Object.isFrozen(value)) return value;
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Reflect.getOwnPropertyDescriptor(value, key);
    if (descriptor !== undefined && "value" in descriptor) deepFreeze(descriptor.value);
  }
  return Object.freeze(value);
}

function loadSelectedCriticalValue(df: number): { hex: string; value: number } | undefined {
  let parsed: unknown;
  try {
    parsed = JSON.parse(readFileSync(TABLE_PATH, "utf8")) as unknown;
  } catch {
    return undefined;
  }
  if (validatePairedTSelectedFixed95TableCandidate(parsed).length > 0) return undefined;
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) return undefined;
  const values = (parsed as JsonRecord)["critical_value_binary64_hex_by_df"];
  if (!Array.isArray(values) || !Number.isSafeInteger(df) || df < 1 || df > values.length) {
    return undefined;
  }
  const hex = values[df - 1];
  if (typeof hex !== "string") return undefined;
  const value = numberFromHex(hex);
  return value === undefined ? undefined : { hex, value };
}

function primitiveVerified(
  operation: CIOperation,
  operands: readonly [string, string],
  result: string,
): boolean {
  return (
    validatePairedTBinary64PrimitiveCandidate({ operation, operands: [...operands], result })
      .length === 0
  );
}

function buildNode(
  sequence: number,
  label: PairedTCIExecutionTraceNodeCandidate["label"],
  operation: CIOperation,
  operandSources: readonly [string, string],
  operandHex: readonly [string, string],
  resultHex: string,
): PairedTCIExecutionTraceNodeCandidate {
  return {
    sequence,
    label,
    operation,
    operand_sources: operandSources,
    operand_binary64_hex: operandHex,
    result_binary64_hex: resultHex,
  };
}

function expectedTraceFromG4(g4Trace: PairedTG4ExecutionTraceCandidate): {
  trace?: PairedTCIExecutionTraceCandidate;
  classification?: Extract<PairedTCIExecutionCandidateResult, { ok: false }>["classification"];
} {
  const g4Verification = verifyPairedTG4ExecutionTraceCandidate(g4Trace);
  if (!g4Verification.ok) return { classification: "ci_trace_verification_failed" };

  const df = g4Trace.outcome.degrees_of_freedom;
  const critical = loadSelectedCriticalValue(df);
  if (critical === undefined)
    return { classification: "selected_critical_value_table_unavailable" };

  const meanHex = g4Trace.outcome.mean_difference_binary64_hex;
  const seHex = g4Trace.outcome.standard_error_binary64_hex;
  const mean = numberFromHex(meanHex);
  const standardError = numberFromHex(seHex);
  if (mean === undefined || standardError === undefined) {
    return { classification: "non_finite_ci_intermediate" };
  }

  const margin = critical.value * standardError;
  const lower = mean - margin;
  const upper = mean + margin;
  if (!Number.isFinite(margin) || !Number.isFinite(lower) || !Number.isFinite(upper)) {
    return { classification: "non_finite_ci_intermediate" };
  }
  if (!(lower < upper)) return { classification: "confidence_interval_endpoint_collapse" };

  const marginHex = binary64Hex(margin);
  const lowerHex = binary64Hex(lower);
  const upperHex = binary64Hex(upper);
  const nodes = [
    buildNode(
      0,
      "ci.margin",
      "multiply",
      ["selected_table.critical_value", "g4.standard_error"],
      [critical.hex, seHex],
      marginHex,
    ),
    buildNode(
      1,
      "ci.lower",
      "subtract",
      ["g4.mean_difference", "ci.margin"],
      [meanHex, marginHex],
      lowerHex,
    ),
    buildNode(
      2,
      "ci.upper",
      "add",
      ["g4.mean_difference", "ci.margin"],
      [meanHex, marginHex],
      upperHex,
    ),
  ] as const;
  if (
    !primitiveVerified("multiply", [critical.hex, seHex], marginHex) ||
    !primitiveVerified("subtract", [meanHex, marginHex], lowerHex) ||
    !primitiveVerified("add", [meanHex, marginHex], upperHex)
  ) {
    return { classification: "ci_trace_verification_failed" };
  }

  const withoutHash: Omit<PairedTCIExecutionTraceCandidate, "sha256"> = {
    format: TRACE_FORMAT,
    g4_trace: g4Trace,
    selected_table: {
      artifact:
        "governance/drafts/release-2-candidate/numerical/fixed-95-critical-value-table-selected-candidate.json" as const,
      ordered_cell_content_hash: PAIRED_T_SELECTED_FIXED_95_TABLE_CONTENT_HASH,
      degrees_of_freedom: df,
      critical_value_binary64_hex: critical.hex,
    },
    nodes,
    outcome: {
      mean_difference_binary64_hex: meanHex,
      standard_error_binary64_hex: seHex,
      margin_binary64_hex: marginHex,
      lower_endpoint_binary64_hex: lowerHex,
      upper_endpoint_binary64_hex: upperHex,
      degrees_of_freedom: df,
    },
    node_count: 3 as const,
  };
  return { trace: { ...withoutHash, sha256: sha256Trace(withoutHash) } };
}

/** Verify nested G4 identity, selected table identity, three CI primitives, endpoints, and digest. */
export function verifyPairedTCIExecutionTraceCandidate(candidate: unknown): {
  ok: boolean;
  errors: string[];
} {
  let copied: unknown;
  try {
    copied = strictJsonCopy(candidate);
  } catch {
    return { ok: false, errors: ["CI trace is not strict closed JSON"] };
  }
  if (typeof copied !== "object" || copied === null || Array.isArray(copied)) {
    return { ok: false, errors: ["CI trace root is not an object"] };
  }
  const record = copied as JsonRecord;
  const keys = Object.keys(record).sort();
  const expectedKeys = [
    "format",
    "g4_trace",
    "node_count",
    "nodes",
    "outcome",
    "selected_table",
    "sha256",
  ].sort();
  if (!isDeepStrictEqual(keys, expectedKeys)) {
    return { ok: false, errors: ["CI trace keys are incomplete or contain an undeclared item"] };
  }
  if (record["format"] !== TRACE_FORMAT || record["node_count"] !== 3) {
    return { ok: false, errors: ["CI trace format or node count is not pinned"] };
  }

  const g4Trace = record["g4_trace"] as PairedTG4ExecutionTraceCandidate;
  const expected = expectedTraceFromG4(g4Trace);
  if (expected.trace === undefined) {
    return {
      ok: false,
      errors: [`CI trace cannot be reconstructed: ${expected.classification ?? "unknown"}`],
    };
  }
  return isDeepStrictEqual(copied, strictJsonCopy(expected.trace))
    ? { ok: true, errors: [] }
    : { ok: false, errors: ["CI trace differs from the independently reconstructed trace"] };
}

function refusal(
  classification: Extract<PairedTCIExecutionCandidateResult, { ok: false }>["classification"],
  detail: { upstreamClassification?: string; traceErrors?: string[] } = {},
): PairedTCIExecutionCandidateResult {
  return {
    ok: false,
    status: "non_authoritative_ci_execution_evaluation",
    classification,
    ...detail,
    confidenceIntervalEndpointTruthComplete: false,
    supportedExecutionPredicateSatisfied: false,
    supportedDomainClaimed: false,
    runtimeSupportClaimed: false,
  };
}

/** Evaluate the fixed-95 CI actual-execution trace candidate without truth/support promotion. */
export function evaluatePairedTCIExecutionTraceCandidate(
  candidate: unknown,
): PairedTCIExecutionCandidateResult {
  const g4 = evaluatePairedTG4ExecutionTraceCandidate(candidate);
  if (!g4.ok) return refusal("g4_stage_refusal", { upstreamClassification: g4.classification });
  const expected = expectedTraceFromG4(g4.trace);
  if (expected.trace === undefined)
    return refusal(expected.classification ?? "ci_trace_verification_failed");
  const verification = verifyPairedTCIExecutionTraceCandidate(expected.trace);
  if (!verification.ok) {
    return refusal("ci_trace_verification_failed", { traceErrors: verification.errors });
  }

  const trace = deepFreeze(expected.trace);
  const critical = numberFromHex(trace.selected_table.critical_value_binary64_hex);
  const mean = numberFromHex(trace.outcome.mean_difference_binary64_hex);
  const standardError = numberFromHex(trace.outcome.standard_error_binary64_hex);
  const margin = numberFromHex(trace.outcome.margin_binary64_hex);
  const lower = numberFromHex(trace.outcome.lower_endpoint_binary64_hex);
  const upper = numberFromHex(trace.outcome.upper_endpoint_binary64_hex);
  if (
    critical === undefined ||
    mean === undefined ||
    standardError === undefined ||
    margin === undefined ||
    lower === undefined ||
    upper === undefined
  ) {
    return refusal("ci_trace_verification_failed");
  }
  const result = deepFreeze({
    meanDifference: mean,
    standardError,
    criticalValue: critical,
    margin,
    lowerEndpoint: lower,
    upperEndpoint: upper,
    degreesOfFreedom: trace.outcome.degrees_of_freedom,
  });
  return {
    ok: true,
    status: "non_authoritative_ci_execution_evaluation",
    result,
    trace,
    ciSpecificPrimitiveChecks: 3,
    g4TraceReverified: true,
    selectedTableRevalidated: true,
    confidenceIntervalEndpointTruthComplete: false,
    supportedExecutionPredicateSatisfied: false,
    supportedDomainClaimed: false,
    runtimeSupportClaimed: false,
  };
}

/** Fail-closed exact checkpoint validator for this unissued candidate. */
export function validatePairedTCIExecutionCheckpoint(candidate: unknown): string[] {
  try {
    return isDeepStrictEqual(strictJsonCopy(candidate), EXPECTED_CHECKPOINT)
      ? []
      : ["CI execution checkpoint differs from the pending-review candidate"];
  } catch {
    return ["CI execution checkpoint differs from the pending-review candidate"];
  }
}
