/**
 * Non-authoritative connection between the reviewed inverse-beta table evidence
 * and the existing R2-D5 runtime-series evaluation graph.
 *
 * This module binds the exact reviewed table bytes to the evaluation wrapper. It
 * does not select a final runtime table, a supported df maximum, a truth-error
 * bound, a supported platform, or Protocol support. The older per-case entry point
 * remains unchanged so the PR #33 evidence can still be reproduced exactly.
 */

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  evaluatePairedTRuntimeSeriesCandidate,
  RUNTIME_SERIES_EVALUATION_DF_MAX,
  RUNTIME_SERIES_EVALUATION_DF_MIN,
  type PairedTRuntimeSeriesCandidateResult,
} from "./paired-t-runtime-series-candidate.js";

export const REVIEWED_INVERSE_BETA_TABLE_CONTENT_HASH =
  "sha256:ba1f992199e9e153956589d62dcf5a6509575100bb7c923c170bfa45fdd76c08";
export const REVIEWED_INVERSE_BETA_TABLE_TARGET_COMMIT = "5d58990e8cb25920bda791d0f0308ab29dcea3fb";

const TABLE_SCOPE = "contiguous_df_1_200_inverse_beta_table_evidence_not_protocol_support";
const TABLE_CANDIDATE_KEY = "paired-t-d5-runtime-inverse-beta-table-evaluation-1";
const TABLE_PATH = fileURLToPath(
  new URL(
    "../../r2-paired-t-runtime-series/runtime-inverse-beta-table.candidate.json",
    import.meta.url,
  ),
);
const HEX64 = /^[0-9a-f]{16}$/;

interface RuntimeInverseBetaTableEntry {
  degrees_of_freedom: number;
  inverse_beta_binary64_hex: string;
}

interface RuntimeInverseBetaTableCandidate {
  status: string;
  scope: string;
  candidate_key: string;
  target_format: string;
  degrees_of_freedom_minimum: number;
  degrees_of_freedom_maximum_evaluation_target: number;
  entry_count: number;
  contiguous_evidence_coverage_claimed: boolean;
  supported_degrees_of_freedom_max: null;
  runtime_support_claimed: boolean;
  final_table_selected: boolean;
  entries: RuntimeInverseBetaTableEntry[];
}

export interface PairedTRuntimeTableIntegrationInput {
  degreesOfFreedom: number;
  testStatistic: number;
}

type RuntimeSeriesSuccess = Extract<PairedTRuntimeSeriesCandidateResult, { ok: true }>;
type RuntimeSeriesRefusal = Extract<PairedTRuntimeSeriesCandidateResult, { ok: false }>;

export type PairedTRuntimeTableIntegrationCandidateResult =
  | (RuntimeSeriesSuccess & {
      normalizationConstant: {
        source: "reviewed_contiguous_candidate_table";
        inverseBetaBinary64Hex: string;
        candidateTableContentHash: typeof REVIEWED_INVERSE_BETA_TABLE_CONTENT_HASH;
        runtimeTableSelected: false;
      };
    })
  | RuntimeSeriesRefusal
  | {
      ok: false;
      status: "non_authoritative_candidate_refusal";
      classification: "candidate_constant_table_unavailable";
    };

export interface PairedTRuntimeTableIntegrationCheckpoint {
  status: string;
  issuance: string;
  review_issue: string;
  candidate_key: string;
  selection_state: string;
  runtime_support_enabled: boolean;
  correct_rounding_claimed: boolean;
  table_connection: Record<string, unknown>;
  operation_graph: Record<string, unknown>;
  held_decisions: string[];
  prohibited_claims: string[];
}

const EXPECTED_CHECKPOINT = {
  status: "non_authoritative_candidate",
  issuance: "unissued",
  review_issue: "https://github.com/licklider-ai/nomue-protocol/issues/25",
  candidate_key: "paired-t-d5-runtime-table-integration-evaluation-1",
  selection_state: "evaluation_only_not_runtime_selected",
  runtime_support_enabled: false,
  correct_rounding_claimed: false,
  table_connection: {
    source: "tooling/r2-paired-t-runtime-series/runtime-inverse-beta-table.candidate.json",
    reviewed_evidence_target_commit: REVIEWED_INVERSE_BETA_TABLE_TARGET_COMMIT,
    reviewed_evidence_table_content_hash: REVIEWED_INVERSE_BETA_TABLE_CONTENT_HASH,
    degrees_of_freedom_minimum: 1,
    degrees_of_freedom_maximum_evaluation_target: 200,
    entry_count: 200,
    connected_to_runtime_series_candidate: true,
    runtime_table_selected: false,
    final_table_content_hash: null,
    supported_degrees_of_freedom_max: null,
  },
  operation_graph: {
    execution_surface: "tooling/src/spikes/paired-t-runtime-table-integration-candidate.ts",
    series_surface: "tooling/src/spikes/paired-t-runtime-series-candidate.ts",
    inverse_beta_input: "lookup_by_exact_integer_df_before_existing_series_graph",
    existing_series_graph_changed: false,
    per_case_evidence_reproduction_path_preserved: true,
  },
  held_decisions: [
    "final_runtime_inverse_beta_table_selection_and_hash",
    "final_supported_degrees_of_freedom_maximum",
    "complete_runtime_tail_operation_graph",
    "iteration_cap_supported_resource_bound",
    "global_truth_error_bound_ulp",
    "one_cell_projection_boundary_margin",
    "supported_platform_matrix",
    "final_runtime_refusal_codes",
  ],
  prohibited_claims: [
    "supported_runtime_inverse_beta_table",
    "supported_runtime_student_t_procedure",
    "supported_df_max",
    "complete_operation_graph_truth_bound",
    "correctly_rounded_runtime_p_value",
    "authoritative_public_check_or_bundle",
  ],
} as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasExactKeys(actual: Record<string, unknown>, expected: readonly string[]): boolean {
  const left = Object.keys(actual).sort();
  const right = [...expected].sort();
  return left.length === right.length && left.every((entry, index) => entry === right[index]);
}

function canonicalizeJson(value: unknown, ancestors = new Set<object>()): unknown {
  if (
    value === undefined ||
    typeof value === "bigint" ||
    typeof value === "function" ||
    typeof value === "symbol" ||
    (typeof value === "number" && !Number.isFinite(value))
  ) {
    throw new TypeError("runtime-table integration candidate contains non-JSON data");
  }
  if (typeof value !== "object" || value === null) return value;
  if (ancestors.has(value)) {
    throw new TypeError("runtime-table integration candidate contains a cycle");
  }
  const nextAncestors = new Set(ancestors).add(value);
  if (Array.isArray(value)) {
    return value.map((entry) => canonicalizeJson(entry, nextAncestors));
  }
  const prototype = Object.getPrototypeOf(value) as object | null;
  if (prototype !== Object.prototype && prototype !== null) {
    throw new TypeError("runtime-table integration candidate contains a non-JSON object");
  }
  return Object.fromEntries(
    Object.entries(value)
      .sort(([first], [second]) => (first < second ? -1 : first > second ? 1 : 0))
      .map(([key, entry]) => [key, canonicalizeJson(entry, nextAncestors)]),
  );
}

function equalJsonValue(actual: unknown, expected: unknown): boolean {
  try {
    return JSON.stringify(canonicalizeJson(actual)) === JSON.stringify(canonicalizeJson(expected));
  } catch {
    return false;
  }
}

function sha256(value: Buffer): string {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function floatFromHex(value: string): number | undefined {
  if (!HEX64.test(value)) return undefined;
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  view.setBigUint64(0, BigInt(`0x${value}`), false);
  const result = view.getFloat64(0, false);
  return Number.isFinite(result) ? result : undefined;
}

/** Validate the exact reviewed table bytes before the candidate wrapper uses them. */
export function validatePairedTRuntimeInverseBetaLookupTableCandidate(bytes: Buffer): string[] {
  const errors: string[] = [];
  if (sha256(bytes) !== REVIEWED_INVERSE_BETA_TABLE_CONTENT_HASH) {
    errors.push("candidate inverse-beta table bytes differ from the independently reviewed hash");
  }
  let table: unknown;
  try {
    table = JSON.parse(bytes.toString("utf8")) as unknown;
  } catch {
    return [...errors, "candidate inverse-beta table is not valid JSON"];
  }
  if (
    !isRecord(table) ||
    !hasExactKeys(table, [
      "status",
      "scope",
      "candidate_key",
      "target_format",
      "degrees_of_freedom_minimum",
      "degrees_of_freedom_maximum_evaluation_target",
      "entry_count",
      "contiguous_evidence_coverage_claimed",
      "supported_degrees_of_freedom_max",
      "runtime_support_claimed",
      "final_table_selected",
      "entries",
    ]) ||
    table["status"] !== "non_authoritative_candidate" ||
    table["scope"] !== TABLE_SCOPE ||
    table["candidate_key"] !== TABLE_CANDIDATE_KEY ||
    table["target_format"] !== "binary64_round_ties_to_even" ||
    table["degrees_of_freedom_minimum"] !== RUNTIME_SERIES_EVALUATION_DF_MIN ||
    table["degrees_of_freedom_maximum_evaluation_target"] !== RUNTIME_SERIES_EVALUATION_DF_MAX ||
    table["entry_count"] !== RUNTIME_SERIES_EVALUATION_DF_MAX ||
    table["contiguous_evidence_coverage_claimed"] !== true ||
    table["supported_degrees_of_freedom_max"] !== null ||
    table["runtime_support_claimed"] !== false ||
    table["final_table_selected"] !== false ||
    !Array.isArray(table["entries"])
  ) {
    errors.push("candidate inverse-beta table differs from the closed non-runtime surface");
    return errors;
  }
  if (table["entries"].length !== RUNTIME_SERIES_EVALUATION_DF_MAX) {
    errors.push("candidate inverse-beta table must cover every evaluation df exactly once");
    return errors;
  }
  for (let index = 0; index < table["entries"].length; index += 1) {
    const expectedDf = index + 1;
    const entry = table["entries"][index];
    if (
      !isRecord(entry) ||
      !hasExactKeys(entry, ["degrees_of_freedom", "inverse_beta_binary64_hex"]) ||
      entry["degrees_of_freedom"] !== expectedDf ||
      typeof entry["inverse_beta_binary64_hex"] !== "string"
    ) {
      errors.push(`df=${expectedDf}: candidate inverse-beta entry is invalid or out of order`);
      continue;
    }
    const value = floatFromHex(entry["inverse_beta_binary64_hex"]);
    if (value === undefined || value <= 0) {
      errors.push(`df=${expectedDf}: candidate inverse-beta value is not positive finite binary64`);
    }
  }
  return errors;
}

function loadBundledTable(): {
  errors: string[];
  entries: Map<number, { value: number; hex: string }>;
} {
  let bytes: Buffer;
  try {
    bytes = readFileSync(TABLE_PATH);
  } catch {
    return { errors: ["candidate inverse-beta table cannot be read"], entries: new Map() };
  }
  const errors = validatePairedTRuntimeInverseBetaLookupTableCandidate(bytes);
  if (errors.length > 0) return { errors, entries: new Map() };
  const table = JSON.parse(bytes.toString("utf8")) as RuntimeInverseBetaTableCandidate;
  return {
    errors: [],
    entries: new Map(
      table.entries.map((entry) => {
        const value = floatFromHex(entry.inverse_beta_binary64_hex);
        if (value === undefined) throw new Error("validated binary64 table entry became invalid");
        return [entry.degrees_of_freedom, { value, hex: entry.inverse_beta_binary64_hex }] as const;
      }),
    ),
  };
}

const BUNDLED_TABLE = loadBundledTable();

/**
 * Resolve one already-validated candidate table cell for later candidate-only
 * proof instrumentation. Returning a fresh object prevents callers from
 * mutating the module-level table state.
 */
export function lookupReviewedInverseBetaCandidateCell(
  degreesOfFreedom: number,
): { value: number; hex: string } | undefined {
  if (BUNDLED_TABLE.errors.length > 0) return undefined;
  const entry = BUNDLED_TABLE.entries.get(degreesOfFreedom);
  return entry === undefined ? undefined : { ...entry };
}

/** Execute the existing graph with the exact reviewed candidate table cell for df. */
export function evaluatePairedTRuntimeSeriesWithCandidateTable(
  input: PairedTRuntimeTableIntegrationInput,
): PairedTRuntimeTableIntegrationCandidateResult {
  const { degreesOfFreedom: df, testStatistic } = input;
  if (
    !Number.isInteger(df) ||
    df < RUNTIME_SERIES_EVALUATION_DF_MIN ||
    !Number.isFinite(testStatistic) ||
    Object.is(testStatistic, -0)
  ) {
    return {
      ok: false,
      status: "non_authoritative_candidate_refusal",
      classification: "invalid_candidate_input",
    };
  }
  if (df > RUNTIME_SERIES_EVALUATION_DF_MAX) {
    return {
      ok: false,
      status: "non_authoritative_candidate_refusal",
      classification: "outside_evidence_evaluation_range",
    };
  }
  const constant = BUNDLED_TABLE.entries.get(df);
  if (BUNDLED_TABLE.errors.length > 0 || constant === undefined) {
    return {
      ok: false,
      status: "non_authoritative_candidate_refusal",
      classification: "candidate_constant_table_unavailable",
    };
  }
  const result = evaluatePairedTRuntimeSeriesCandidate({
    degreesOfFreedom: df,
    testStatistic,
    inverseBeta: constant.value,
  });
  if (!result.ok) return result;
  return {
    ...result,
    normalizationConstant: {
      source: "reviewed_contiguous_candidate_table",
      inverseBetaBinary64Hex: constant.hex,
      candidateTableContentHash: REVIEWED_INVERSE_BETA_TABLE_CONTENT_HASH,
      runtimeTableSelected: false,
    },
  };
}

/** Validate the closed metadata for this bounded integration increment. */
export function validatePairedTRuntimeTableIntegrationCheckpoint(
  candidate: PairedTRuntimeTableIntegrationCheckpoint,
): string[] {
  return equalJsonValue(candidate, EXPECTED_CHECKPOINT)
    ? []
    : ["runtime-table integration candidate differs from the closed non-runtime checkpoint"];
}
