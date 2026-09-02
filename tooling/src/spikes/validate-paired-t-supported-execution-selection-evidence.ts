/** Validate the durable admission bundle and exact-head Group 3 selection evidence. */

import { createHash } from "node:crypto";
import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { validatePairedTAdmissionEnvironmentCandidate } from "./paired-t-supported-execution-admission-evidence-candidate.js";
import { validatePairedTSupportedExecutionAdmissionEvidenceManifests } from "./validate-paired-t-supported-execution-admission-evidence.js";

type JsonRecord = Record<string, unknown>;

const PRIOR_CANDIDATE_HEAD = "5563bae511069cc3bc73a2e3db24d8448de9fe2a";
const EXPECTED_CHECKPOINT_SHA256 =
  "sha256:5b00688bb049c37cd07ec7a3a92b15f82a8bb1e6dae382f180cdcbaf8a8be22d";
const EXPECTED_SELECTION_ROLLUP =
  "a53970d7f00b5823b2e601faaafa6dd900b7cf69ab51b4896feba7433761be20";
const EXPECTED_ARTIFACT_MANIFEST_SHA256 =
  "sha256:2aef6ddd1177a6bcae62d32325a03486c7b0ee838b48f57d6b11078fa7cf42f2";
const EVIDENCE_DIRECTORY =
  "governance/drafts/release-2-candidate/numerical/group-3-admission-evidence-5563bae";
const MAXIMUM_CLOSED_JSON_ARRAY_LENGTH = 140_000;
const VALIDATION_FAILURE =
  "supported-execution selection evidence differs from the exact candidate";

const PRESERVED_FILES = [
  [
    "cold.normalized.json",
    10861,
    "dbedda36f6ae33abb0a36b8407ee1c86f1fa0f2677646b86837c7df9aa5d08b1",
  ],
  [
    "hot.normalized.json",
    10881,
    "cc055f12397edd7a613bc73c2a5eab07552aa7c354aad72959a531c0cb31b993",
  ],
  ["compiled-sha256.txt", 2550, "56472d03f74cccd26270135d4425d5c7bb02aa68313230d9bff1b62f1d03cc04"],
  [
    "hot-optimization-matches.txt",
    20628,
    "08df887bba338ee4e825019088a7c4eb977f4aa0309f351d59fe033bc7ca74f9",
  ],
  [
    "validation.normalized.json",
    325,
    "7f0421daf0628ec617a7f2319b537f6cf3b82788c82e43e6d993a170941fdad6",
  ],
] as const;

const CANDIDATE_SELECTION = {
  candidate_supported_platform_matrix_selected: true,
  candidate_exact_runtime_allowlist_selected: true,
  candidate_controlled_process_profile_selected: true,
  every_selected_tuple_admission_evidence_complete: true,
  candidate_supported_execution_predicate_selected: true,
  selection_made_by_this_increment: true,
  selection_independent_review_complete: false,
  group_3_complete: false,
};

const PUBLIC_SUPPORT_CLAIMS = {
  authoritative_supported_platform_matrix_issued: false,
  authoritative_runtime_allowlist_issued: false,
  authoritative_controlled_process_profile_issued: false,
  authoritative_supported_execution_predicate_issued: false,
  supported_platform_claimed: false,
  supported_domain_claimed: false,
  runtime_support_claimed: false,
};

function repositoryRoot(): string {
  return path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
}

function closedJsonCopy(value: unknown, ancestors = new Set<object>()): unknown {
  if (
    value === undefined ||
    typeof value === "bigint" ||
    typeof value === "function" ||
    typeof value === "symbol" ||
    (typeof value === "number" && (!Number.isFinite(value) || Object.is(value, -0)))
  ) {
    throw new TypeError(VALIDATION_FAILURE);
  }
  if (typeof value !== "object" || value === null) return value;
  if (ancestors.has(value)) throw new TypeError(VALIDATION_FAILURE);
  const nextAncestors = new Set(ancestors).add(value);
  const keys = Reflect.ownKeys(value);
  if (keys.some((key) => typeof key !== "string")) throw new TypeError(VALIDATION_FAILURE);
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
      throw new TypeError(VALIDATION_FAILURE);
    }
    const result: unknown[] = [];
    for (let index = 0; index < lengthDescriptor.value; index += 1) {
      const descriptor = descriptors[String(index)];
      if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
        throw new TypeError(VALIDATION_FAILURE);
      }
      result.push(closedJsonCopy(descriptor.value, nextAncestors));
    }
    return result;
  }
  if (Reflect.getPrototypeOf(value) !== Object.prototype) throw new TypeError(VALIDATION_FAILURE);
  const entries: Array<[string, unknown]> = [];
  for (const key of keys as string[]) {
    const descriptor = descriptors[key];
    if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
      throw new TypeError(VALIDATION_FAILURE);
    }
    entries.push([key, closedJsonCopy(descriptor.value, nextAncestors)]);
  }
  return Object.fromEntries(entries);
}

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasExactKeys(value: JsonRecord, expected: readonly string[]): boolean {
  return isDeepStrictEqual(Object.keys(value).sort(), [...expected].sort());
}

function sha256Bytes(value: string | Buffer): string {
  return createHash("sha256").update(value).digest("hex");
}

function sha256Json(value: unknown): string {
  return sha256Bytes(JSON.stringify(value));
}

function withoutExecArgv(environment: unknown): unknown {
  if (!isRecord(environment)) return environment;
  return Object.fromEntries(Object.entries(environment).filter(([key]) => key !== "execArgv"));
}

function expectedSelectionRows(root: string): unknown[] {
  const prior = JSON.parse(
    readFileSync(path.join(root, EVIDENCE_DIRECTORY, "cold.normalized.json"), "utf8"),
  ) as {
    rows: unknown[];
  };
  return prior.rows.map((candidate) => {
    if (!isRecord(candidate)) throw new Error(VALIDATION_FAILURE);
    const { support_claims: _supportClaims, ...core } = candidate;
    if (candidate.ok === false) {
      return {
        case_id: candidate.case_id,
        ok: false,
        classification: "candidate_supported_execution_predicate_refusal",
        upstream_classification: candidate.classification,
        upstream_detail: candidate.upstream_classification,
        candidate_selection: CANDIDATE_SELECTION,
        public_support_claims: PUBLIC_SUPPORT_CLAIMS,
      };
    }
    return {
      ...core,
      candidate_selection: CANDIDATE_SELECTION,
      public_support_claims: PUBLIC_SUPPORT_CLAIMS,
    };
  });
}

/** Validate byte-preserved #141 evidence and its review/preservation metadata. */
export function validateDurablePairedTAdmissionEvidenceBundle(root = repositoryRoot()): string[] {
  try {
    const directory = path.join(root, EVIDENCE_DIRECTORY);
    const artifactManifestPath = path.join(directory, "artifact-manifest.json");
    const manifestBytes = readFileSync(artifactManifestPath);
    if (`sha256:${sha256Bytes(manifestBytes)}` !== EXPECTED_ARTIFACT_MANIFEST_SHA256) {
      throw new Error(VALIDATION_FAILURE);
    }
    for (const [file, expectedBytes, expectedSha256] of PRESERVED_FILES) {
      const filePath = path.join(directory, file);
      const bytes = readFileSync(filePath);
      if (statSync(filePath).size !== expectedBytes || sha256Bytes(bytes) !== expectedSha256) {
        throw new Error(VALIDATION_FAILURE);
      }
    }
    const artifactManifest = JSON.parse(manifestBytes.toString("utf8")) as unknown;
    if (!isRecord(artifactManifest) || !isRecord(artifactManifest.hosted_run)) {
      throw new Error(VALIDATION_FAILURE);
    }
    if (
      artifactManifest.candidate_head !== PRIOR_CANDIDATE_HEAD ||
      artifactManifest.candidate_merge !== "4f48278bd50806bd16f62af4d1cc346321f7a1dc" ||
      artifactManifest.hosted_run.run_id !== 33586026811 ||
      artifactManifest.hosted_run.artifact_id !== 9830100535 ||
      artifactManifest.hosted_run.artifact_zip_sha256 !==
        "sha256:04d39b25d631ec6acc02d03d88a954d1302174f8e5790e5c6b755fdcb9af84b9" ||
      !isRecord(artifactManifest.artifact_member_not_preserved_in_tree) ||
      artifactManifest.artifact_member_not_preserved_in_tree.sha256 !==
        "sha256:2d7d8ea382084ea04d3f0b19d7efa452f0dd6086a868ce0c29ab54904b4891b2"
    ) {
      throw new Error(VALIDATION_FAILURE);
    }
    const cold = JSON.parse(
      readFileSync(path.join(directory, "cold.normalized.json"), "utf8"),
    ) as unknown;
    const hot = JSON.parse(
      readFileSync(path.join(directory, "hot.normalized.json"), "utf8"),
    ) as unknown;
    if (
      validatePairedTSupportedExecutionAdmissionEvidenceManifests(cold, hot, PRIOR_CANDIDATE_HEAD)
        .length !== 0
    ) {
      throw new Error(VALIDATION_FAILURE);
    }
    return [];
  } catch {
    return [VALIDATION_FAILURE];
  }
}

/** Fail-closed in-memory validation surface for exact-head selection evidence. */
export function validatePairedTSupportedExecutionSelectionEvidenceManifests(
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
    const expectedRows = expectedSelectionRows(repositoryRoot());
    for (const [manifest, mode] of [
      [cold, "cold"],
      [hot, "hot"],
    ] as const) {
      if (
        !hasExactKeys(manifest, [
          "format",
          "status",
          "candidate_commit",
          "selection_checkpoint_canonical_sha256",
          "mode",
          "environment",
          "case_count",
          "rows",
          "platform_neutral_rollup",
          "candidate_selection_claimed",
          "authoritative_support_selected_or_claimed",
        ]) ||
        manifest.format !== "paired-t-supported-execution-selection-evidence-v1" ||
        manifest.status !== "non_authoritative_group_3_selection_candidate_evidence" ||
        manifest.candidate_commit !== expectedCommit ||
        manifest.selection_checkpoint_canonical_sha256 !== EXPECTED_CHECKPOINT_SHA256 ||
        manifest.mode !== mode ||
        manifest.case_count !== 6 ||
        manifest.candidate_selection_claimed !== true ||
        manifest.authoritative_support_selected_or_claimed !== false ||
        manifest.platform_neutral_rollup !== EXPECTED_SELECTION_ROLLUP ||
        !isDeepStrictEqual(manifest.rows, expectedRows) ||
        sha256Json(manifest.rows) !== EXPECTED_SELECTION_ROLLUP
      ) {
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
      !isDeepStrictEqual(withoutExecArgv(cold.environment), withoutExecArgv(hot.environment)) ||
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
  if (validateDurablePairedTAdmissionEvidenceBundle().length !== 0) {
    throw new Error(VALIDATION_FAILURE);
  }
  const cold = JSON.parse(readFileSync(coldPath, "utf8")) as unknown;
  const hot = JSON.parse(readFileSync(hotPath, "utf8")) as unknown;
  const errors = validatePairedTSupportedExecutionSelectionEvidenceManifests(
    cold,
    hot,
    expectedCommit,
  );
  if (errors.length !== 0) throw new Error(errors[0]);
  const manifest = cold as JsonRecord;
  process.stdout.write(
    `${JSON.stringify({
      status: "validated_non_authoritative_group_3_selection_evidence",
      candidate_commit: expectedCommit,
      selection_checkpoint_canonical_sha256: EXPECTED_CHECKPOINT_SHA256,
      case_count: manifest.case_count,
      platform_neutral_rollup: manifest.platform_neutral_rollup,
      cold_hot_identical: true,
      candidate_selection_claimed: true,
      authoritative_support_selected_or_claimed: false,
      durable_admission_evidence_validated: true,
    })}\n`,
  );
}

if (
  process.argv[1] !== undefined &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main();
}
