/** Validate cold/hot Group 3 admission-evidence manifests without selecting support. */

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { validatePairedTAdmissionEnvironmentCandidate } from "./paired-t-supported-execution-admission-evidence-candidate.js";

type JsonRecord = Record<string, unknown>;

const EXPECTED_PLATFORM_NEUTRAL_ROLLUP =
  "a6274fb82627f0be78bc71a5e46e9641586cc8749a2c2a07de77adfddb5ddd4a";
const MAXIMUM_CLOSED_JSON_ARRAY_LENGTH = 140_000;
const VALIDATION_FAILURE =
  "supported-execution admission-evidence manifests differ from the exact candidate";

function closedJsonCopy(value: unknown, ancestors = new Set<object>()): unknown {
  if (
    value === undefined ||
    typeof value === "bigint" ||
    typeof value === "function" ||
    typeof value === "symbol" ||
    (typeof value === "number" && (!Number.isFinite(value) || Object.is(value, -0)))
  ) {
    throw new TypeError("evidence contains non-canonical JSON data");
  }
  if (typeof value !== "object" || value === null) return value;
  if (ancestors.has(value)) throw new TypeError("evidence contains a cycle");
  const nextAncestors = new Set(ancestors).add(value);
  const keys = Reflect.ownKeys(value);
  if (keys.some((key) => typeof key !== "string")) {
    throw new TypeError("evidence contains symbol keys");
  }
  const descriptors = Object.getOwnPropertyDescriptors(value);
  if (Array.isArray(value)) {
    const lengthDescriptor = Reflect.getOwnPropertyDescriptor(value, "length");
    if (
      Reflect.getPrototypeOf(value) !== Array.prototype ||
      lengthDescriptor === undefined ||
      !("value" in lengthDescriptor) ||
      typeof lengthDescriptor.value !== "number" ||
      !Number.isSafeInteger(lengthDescriptor.value) ||
      lengthDescriptor.value < 0 ||
      lengthDescriptor.value > MAXIMUM_CLOSED_JSON_ARRAY_LENGTH ||
      keys.length !== lengthDescriptor.value + 1
    ) {
      throw new TypeError("evidence contains an invalid array");
    }
    const result: unknown[] = [];
    for (let index = 0; index < lengthDescriptor.value; index += 1) {
      const descriptor = descriptors[String(index)];
      if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
        throw new TypeError("evidence contains a non-data array entry");
      }
      result.push(closedJsonCopy(descriptor.value, nextAncestors));
    }
    return result;
  }
  if (Reflect.getPrototypeOf(value) !== Object.prototype) {
    throw new TypeError("evidence contains a non-plain object");
  }
  const entries: Array<[string, unknown]> = [];
  for (const key of keys as string[]) {
    const descriptor = descriptors[key];
    if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
      throw new TypeError("evidence contains hidden or accessor data");
    }
    entries.push([key, closedJsonCopy(descriptor.value, nextAncestors)]);
  }
  return Object.fromEntries(entries);
}

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseManifest(manifestPath: string): unknown {
  return JSON.parse(readFileSync(manifestPath, "utf8")) as unknown;
}

function withoutExecArgv(environment: unknown): unknown {
  if (!isRecord(environment)) return environment;
  return Object.fromEntries(Object.entries(environment).filter(([key]) => key !== "execArgv"));
}

function hasExactKeys(value: JsonRecord, expected: readonly string[]): boolean {
  return isDeepStrictEqual(Object.keys(value).sort(), [...expected].sort());
}

function sha256(value: unknown): string {
  return createHash("sha256").update(JSON.stringify(value), "utf8").digest("hex");
}

function assertNoSupportClaims(rows: unknown): void {
  if (!Array.isArray(rows)) throw new Error(VALIDATION_FAILURE);
  const expectedCases = [
    ["minimum-pair-scope", 2, 1],
    ["ordinary-central-branch", 3, 2],
    ["ordinary-tail-branch", 4, 3],
    ["exact-zero-branch", 31, 30],
    ["maximum-pair-scope", 201, 200],
    ["confidence-interval-collapse-refusal", null, null],
  ] as const;
  if (
    !isDeepStrictEqual(
      rows.map((row) => (isRecord(row) ? row.case_id : null)),
      expectedCases.map(([caseId]) => caseId),
    )
  ) {
    throw new Error(VALIDATION_FAILURE);
  }
  for (const [index, row] of rows.entries()) {
    if (!isRecord(row) || !isRecord(row.support_claims)) {
      throw new Error(VALIDATION_FAILURE);
    }
    if (!Object.values(row.support_claims).every((value) => value === false)) {
      throw new Error(VALIDATION_FAILURE);
    }
    if (
      !hasExactKeys(row.support_claims, [
        "exact_runtime_allowlist_selected",
        "controlled_process_profile_selected",
        "cross_platform_admission_evidence_complete",
        "supported_execution_predicate_selected",
        "group_3_complete",
        "supported_execution_predicate_satisfied",
        "supported_platform_claimed",
        "supported_domain_claimed",
        "runtime_support_claimed",
      ])
    ) {
      throw new Error(VALIDATION_FAILURE);
    }
    if (index === expectedCases.length - 1) {
      if (
        !hasExactKeys(row, [
          "case_id",
          "ok",
          "classification",
          "upstream_classification",
          "support_claims",
        ]) ||
        row.ok !== false ||
        row.classification !== "group_2_full_trace_refusal" ||
        row.upstream_classification !== "g4_tail_stage_refusal"
      ) {
        throw new Error(VALIDATION_FAILURE);
      }
      continue;
    }
    const expectedCase = expectedCases[index];
    if (
      expectedCase === undefined ||
      !hasExactKeys(row, [
        "case_id",
        "ok",
        "n_pairs",
        "degrees_of_freedom",
        "p_value_binary64_hex",
        "lower_endpoint_binary64_hex",
        "upper_endpoint_binary64_hex",
        "full_trace_sha256",
        "g4_trace_sha256",
        "tail_trace_sha256",
        "ci_trace_sha256",
        "tail_table_content_hash",
        "fixed_95_table_content_hash",
        "resource",
        "support_claims",
      ]) ||
      row.ok !== true ||
      row.n_pairs !== expectedCase[1] ||
      row.degrees_of_freedom !== expectedCase[2] ||
      row.tail_table_content_hash !==
        "sha256:ba1f992199e9e153956589d62dcf5a6509575100bb7c923c170bfa45fdd76c08" ||
      row.fixed_95_table_content_hash !==
        "sha256:24ccc86d7a49b9e1ef1e3fc9b038a5b8d338b8b5ca4a02492d8900d7e7dea3c0"
    ) {
      throw new Error(VALIDATION_FAILURE);
    }
    for (const key of [
      "p_value_binary64_hex",
      "lower_endpoint_binary64_hex",
      "upper_endpoint_binary64_hex",
    ]) {
      if (typeof row[key] !== "string" || !/^[0-9a-f]{16}$/.test(row[key])) {
        throw new Error(VALIDATION_FAILURE);
      }
    }
    for (const key of [
      "full_trace_sha256",
      "g4_trace_sha256",
      "tail_trace_sha256",
      "ci_trace_sha256",
    ]) {
      if (typeof row[key] !== "string" || !/^sha256:[0-9a-f]{64}$/.test(row[key])) {
        throw new Error(VALIDATION_FAILURE);
      }
    }
  }
}

/**
 * Fail-closed validation for in-memory cold/hot manifests. This surface exists so
 * reviewers can attack hostile JavaScript shapes without going through JSON.parse.
 */
export function validatePairedTSupportedExecutionAdmissionEvidenceManifests(
  coldCandidate: unknown,
  hotCandidate: unknown,
  expectedCommit: unknown,
): string[] {
  try {
    if (typeof expectedCommit !== "string" || !/^[0-9a-f]{40}$/.test(expectedCommit)) {
      throw new Error(VALIDATION_FAILURE);
    }
    const cold = closedJsonCopy(coldCandidate) as JsonRecord;
    const hot = closedJsonCopy(hotCandidate) as JsonRecord;
    for (const [manifest, mode] of [
      [cold, "cold"],
      [hot, "hot"],
    ] as const) {
      if (
        !hasExactKeys(manifest, [
          "format",
          "status",
          "candidate_commit",
          "mode",
          "environment",
          "case_count",
          "rows",
          "platform_neutral_rollup",
          "support_selected_or_claimed",
        ]) ||
        manifest.format !== "paired-t-supported-execution-admission-evidence-v1" ||
        manifest.status !== "non_authoritative_candidate_evidence" ||
        manifest.candidate_commit !== expectedCommit ||
        manifest.mode !== mode ||
        manifest.case_count !== 6 ||
        manifest.support_selected_or_claimed !== false ||
        manifest.platform_neutral_rollup !== EXPECTED_PLATFORM_NEUTRAL_ROLLUP
      ) {
        throw new Error(VALIDATION_FAILURE);
      }
      assertNoSupportClaims(manifest.rows);
      if (manifest.platform_neutral_rollup !== sha256(manifest.rows)) {
        throw new Error(VALIDATION_FAILURE);
      }
      const environmentValidation = validatePairedTAdmissionEnvironmentCandidate(
        manifest.environment,
      );
      if (!environmentValidation.ok) throw new Error(VALIDATION_FAILURE);
    }
    if (
      !isDeepStrictEqual(cold.rows, hot.rows) ||
      cold.platform_neutral_rollup !== hot.platform_neutral_rollup ||
      !isDeepStrictEqual(withoutExecArgv(cold.environment), withoutExecArgv(hot.environment))
    ) {
      throw new Error(VALIDATION_FAILURE);
    }
    if (
      !isRecord(cold.environment) ||
      !Array.isArray(cold.environment.execArgv) ||
      cold.environment.execArgv.filter((value) => value === "--trace-opt").length !== 0 ||
      !isRecord(hot.environment) ||
      !Array.isArray(hot.environment.execArgv) ||
      hot.environment.execArgv.filter((value) => value === "--trace-opt").length !== 1
    ) {
      throw new Error(VALIDATION_FAILURE);
    }
    return [];
  } catch {
    return [VALIDATION_FAILURE];
  }
}

function main(): void {
  const [coldPath, hotPath, expectedCommit] = process.argv.slice(2);
  if (coldPath === undefined || hotPath === undefined || expectedCommit === undefined) {
    throw new Error("usage: validator <cold.json> <hot.json> <exact-commit>");
  }
  const cold = parseManifest(coldPath);
  const hot = parseManifest(hotPath);
  const errors = validatePairedTSupportedExecutionAdmissionEvidenceManifests(
    cold,
    hot,
    expectedCommit,
  );
  if (errors.length !== 0) throw new Error(errors[0]);
  const validatedCold = cold as JsonRecord;
  process.stdout.write(
    `${JSON.stringify({
      status: "validated_non_authoritative_group_3_admission_evidence",
      candidate_commit: expectedCommit,
      case_count: validatedCold.case_count,
      platform_neutral_rollup: validatedCold.platform_neutral_rollup,
      cold_hot_identical: true,
      support_selected_or_claimed: false,
    })}\n`,
  );
}

if (
  process.argv[1] !== undefined &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main();
}
