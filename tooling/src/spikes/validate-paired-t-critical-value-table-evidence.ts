/** Validate contiguous, non-authoritative fixed-95 critical-value table evidence. */

import { createHash } from "node:crypto";
import { isDeepStrictEqual } from "node:util";
import { lstatSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  validateCriticalValueCertificateCandidate,
  type CriticalValueCertificateCandidate,
} from "./paired-t-certificate-candidate.js";

type JsonRecord = Record<string, unknown>;

const SCOPE = "contiguous_df_1_200_fixed_95_critical_value_table_evidence_not_protocol_support";
const CANDIDATE_KEY = "paired-t-d5-fixed-95-critical-value-table-evaluation-1";
const COMMIT = /^[0-9a-f]{40}$/;
const HEX64 = /^[0-9a-f]{16}$/;
const SHA256 = /^sha256:[0-9a-f]{64}$/;
const DF_MIN = 1;
const DF_MAX = 200;
const EXPECTED_FILES = [
  "cases.json",
  "certificates.json",
  "environment.json",
  "fixed-95-critical-value-table-candidate.json",
  "fixed-95-critical-value-table.json",
  "generate_certificates.py",
  "generator.py",
  "raw-evidence.json",
  "requirements.txt",
] as const;
const SOURCE_MAPPINGS = {
  "cases.json": "tooling/r2-paired-t-evidence/cases.json",
  "fixed-95-critical-value-table-candidate.json":
    "governance/drafts/release-2-candidate/numerical/fixed-95-critical-value-table-candidate.json",
  "generate_certificates.py": "tooling/r2-paired-t-evidence/generate_certificates.py",
  "generator.py": "tooling/r2-paired-t-evidence/generate_critical_value_table_evidence.py",
  "requirements.txt": "tooling/r2-paired-t-evidence/requirements.txt",
} as const;

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

function sha256(value: Buffer | string): string {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function sha256File(filePath: string): string {
  return sha256(readFileSync(filePath));
}

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function exactKeys(value: JsonRecord, expected: readonly string[]): boolean {
  const actual = Object.keys(value).sort();
  const wanted = [...expected].sort();
  return actual.length === wanted.length && actual.every((entry, index) => entry === wanted[index]);
}

function sortedJson(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortedJson);
  if (!isRecord(value)) return value;
  return Object.fromEntries(
    Object.entries(value)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, child]) => [key, sortedJson(child)]),
  );
}

function stableJson(value: unknown): string {
  return `${JSON.stringify(sortedJson(value), null, 2)}\n`;
}

function parseJson(filePath: string, errors: string[]): unknown {
  try {
    return JSON.parse(readFileSync(filePath, "utf8")) as unknown;
  } catch {
    errors.push(`${path.basename(filePath)}: not valid JSON`);
    return undefined;
  }
}

function checkpointExpected(): JsonRecord {
  return {
    status: "non_authoritative_candidate",
    issuance: "unissued",
    review_issue: "https://github.com/licklider-ai/nomue-protocol/issues/25",
    candidate_key: CANDIDATE_KEY,
    selection_state: "evidence_evaluation_only_not_table_selected",
    runtime_support_enabled: false,
    final_table_selected: false,
    degrees_of_freedom_evaluation: {
      minimum: DF_MIN,
      maximum_target: DF_MAX,
      entry_count: DF_MAX,
      contiguous_evidence_coverage_claimed: true,
      supported_maximum: null,
    },
    target: {
      confidence_level: "19/20",
      two_sided_tail_probability: "1/20",
      target_format: "binary64",
      rounding_mode: "roundTiesToEven",
    },
    evidence_surface: {
      generator: "tooling/r2-paired-t-evidence/generate_critical_value_table_evidence.py",
      certificate_core: "tooling/r2-paired-t-evidence/generate_certificates.py",
      validator: "tooling/src/spikes/validate-paired-t-critical-value-table-evidence.ts",
      mutation_probe: "tooling/src/spikes/probe-paired-t-critical-value-table-evidence.ts",
      table_content_hash: null,
      independent_review_complete: false,
    },
    held_decisions: [
      "final_table_selection",
      "final_table_content_hash",
      "final_supported_degrees_of_freedom_maximum",
      "confidence_interval_endpoint_truth_ledger",
      "supported_platform_matrix",
      "runtime_support_activation",
    ],
    prohibited_claims: [
      "supported_fixed_95_critical_value_table",
      "supported_df_max",
      "complete_confidence_interval_truth_bound",
      "authoritative_public_check_or_bundle",
      "r2_d5_complete",
    ],
  };
}

export function validatePairedTCriticalValueTableCandidate(value: unknown): string[] {
  return isDeepStrictEqual(value, checkpointExpected())
    ? []
    : ["critical-value table checkpoint differs from the closed non-supporting candidate surface"];
}

function verifyManifest(bundlePath: string, errors: string[]): void {
  let names: string[];
  try {
    names = readdirSync(bundlePath);
  } catch {
    errors.push("evidence bundle directory is unavailable");
    return;
  }
  const expectedNames = [...EXPECTED_FILES, "MANIFEST.sha256"].sort();
  if (!isDeepStrictEqual([...names].sort(), expectedNames)) {
    errors.push("bundle file set is incomplete or contains an undeclared item");
  }
  for (const name of names) {
    try {
      const metadata = lstatSync(path.join(bundlePath, name));
      if (!metadata.isFile() || metadata.isSymbolicLink()) {
        errors.push(`${name}: bundle entry must be a regular non-symlink file`);
      }
    } catch {
      errors.push(`${name}: bundle entry cannot be inspected`);
    }
  }

  const manifestPath = path.join(bundlePath, "MANIFEST.sha256");
  let lines: string[];
  try {
    lines = readFileSync(manifestPath, "utf8").trimEnd().split("\n");
  } catch {
    errors.push("bundle manifest is missing or unreadable");
    return;
  }
  const parsed = lines.map((line) => /^([0-9a-f]{64})  ([A-Za-z0-9._-]+)$/.exec(line));
  if (parsed.some((entry) => entry === null)) {
    errors.push("bundle manifest contains a malformed line");
    return;
  }
  const entries = parsed as RegExpExecArray[];
  const manifestedNames = entries.map((entry) => entry[2] ?? "");
  if (!isDeepStrictEqual(manifestedNames, [...EXPECTED_FILES].sort())) {
    errors.push("bundle manifest file set or order differs from the closed surface");
  }
  for (const entry of entries) {
    const name = entry[2] ?? "";
    try {
      if (sha256File(path.join(bundlePath, name)) !== `sha256:${entry[1] ?? ""}`) {
        errors.push(`${name}: manifested file hash mismatch`);
      }
    } catch {
      errors.push(`${name}: manifested file is missing or unreadable`);
    }
  }
}

function verifySourceCopies(bundlePath: string, errors: string[]): void {
  for (const [bundleName, repositoryName] of Object.entries(SOURCE_MAPPINGS)) {
    try {
      if (
        sha256File(path.join(bundlePath, bundleName)) !==
        sha256File(path.join(repositoryRoot, repositoryName))
      ) {
        errors.push(`${bundleName}: bundled source does not match the checkout`);
      }
    } catch {
      errors.push(`${bundleName}: bundled or repository source is unavailable`);
    }
  }
}

function validCertificateShape(value: unknown): value is CriticalValueCertificateCandidate {
  if (
    !isRecord(value) ||
    !exactKeys(value, [
      "status",
      "artifact_kind",
      "result",
      "input",
      "primary",
      "secondary",
      "closed_form",
      "projection",
      "provenance",
    ]) ||
    !isRecord(value["input"]) ||
    !exactKeys(value["input"], [
      "degrees_of_freedom",
      "two_sided_tail_target",
      "candidate_binary64_hex",
    ]) ||
    !isRecord(value["primary"]) ||
    !exactKeys(value["primary"], [
      "method",
      "exact_rational_input",
      "escalation",
      "tail_at_cell_lower",
      "tail_at_cell_upper",
    ]) ||
    !isRecord(value["primary"]["escalation"]) ||
    !exactKeys(value["primary"]["escalation"], [
      "precision_bits_history",
      "precision_bits_final",
      "precision_bits_ceiling",
      "stopping_predicate",
    ]) ||
    !isRecord(value["secondary"]) ||
    !exactKeys(value["secondary"], [
      "method",
      "quantile_enclosure",
      "projects_to_same_candidate",
    ]) ||
    !isRecord(value["projection"]) ||
    !exactKeys(value["projection"], [
      "target_format",
      "rounding_mode",
      "projected_binary64_hex",
      "cell_lower",
      "cell_upper",
      "strict_containment",
    ]) ||
    !isRecord(value["provenance"]) ||
    !exactKeys(value["provenance"], [
      "generator_commit",
      "generator_sha256",
      "environment_sha256",
      "source_output_sha256",
    ])
  ) {
    return false;
  }
  const closed = value["closed_form"];
  return (
    closed === null ||
    (isRecord(closed) &&
      exactKeys(closed, ["method", "quantile_enclosure", "projects_to_same_candidate"]))
  );
}

function tableContent(cells: JsonRecord[]): string {
  const lines = ["nomue-paired-t-fixed-95-table-v1", "two-sided-tail-target=1/20"];
  lines.push(
    ...cells.map(
      (cell) =>
        `df=${String(cell["degrees_of_freedom"])};binary64=${String(cell["critical_value_binary64_hex"])}`,
    ),
  );
  return `${lines.join("\n")}\n`;
}

function closedTraceMatches(
  trace: unknown,
  certificate: CriticalValueCertificateCandidate["closed_form"],
): boolean {
  if (certificate === null) return trace === null;
  return (
    isRecord(trace) &&
    exactKeys(trace, ["method", "quantile_enclosure", "precision_bits"]) &&
    trace["method"] === certificate.method &&
    isDeepStrictEqual(trace["quantile_enclosure"], certificate.quantile_enclosure)
  );
}

function exactBinary64Rational(hex: string): string | undefined {
  if (!HEX64.test(hex)) return undefined;
  const bits = BigInt(`0x${hex}`);
  if (bits >> 63n === 1n) return undefined;
  const exponentBits = Number((bits >> 52n) & 0x7ffn);
  const fractionBits = bits & ((1n << 52n) - 1n);
  if (exponentBits === 0x7ff) return undefined;
  if (exponentBits === 0 && fractionBits === 0n) return "0/1";
  let numerator = exponentBits === 0 ? fractionBits : (1n << 52n) | fractionBits;
  const exponent = exponentBits === 0 ? -1074 : exponentBits - 1023 - 52;
  if (exponent >= 0) return `${numerator << BigInt(exponent)}/1`;
  let denominator = 1n << BigInt(-exponent);
  while (denominator > 1n && numerator % 2n === 0n) {
    numerator /= 2n;
    denominator /= 2n;
  }
  return `${numerator}/${denominator}`;
}

export function arePositiveFiniteBinary64HexesStrictlyDecreasing(
  values: readonly unknown[],
): boolean {
  let previousBits: bigint | undefined;
  for (const value of values) {
    if (typeof value !== "string" || !HEX64.test(value)) return false;
    const bits = BigInt(`0x${value}`);
    const exponentBits = Number((bits >> 52n) & 0x7ffn);
    const fractionBits = bits & ((1n << 52n) - 1n);
    if (
      bits >> 63n === 1n ||
      exponentBits === 0x7ff ||
      (exponentBits === 0 && fractionBits === 0n)
    ) {
      return false;
    }
    if (previousBits !== undefined && bits >= previousBits) return false;
    previousBits = bits;
  }
  return true;
}

function validQuadratureTrace(value: unknown): boolean {
  return (
    isRecord(value) &&
    exactKeys(value, [
      "finite_interval",
      "integration_segment_endpoints",
      "finite_integral_real_enclosure",
      "tail_bound_upper",
      "tail_bound_ceiling",
      "upper_limit_expansion_count",
      "imaginary_part_contains_zero",
      "precision_bits",
    ])
  );
}

function validSecondaryTrace(value: unknown, df: number): boolean {
  if (!isRecord(value)) return false;
  if (df <= 2) {
    return exactKeys(value, [
      "method",
      "closed_form_method",
      "precision_bits",
      "quantile_enclosure",
    ]);
  }
  const divisor = value["rounding_cell_inset_divisor"];
  return (
    exactKeys(value, [
      "method",
      "precision_bits",
      "tail_bound_ceiling",
      "tail_bound_ceiling_basis",
      "rounding_cell_inset_divisor",
      "lower_test_point",
      "upper_test_point",
      "tail_at_lower_test_point",
      "tail_at_upper_test_point",
      "lower_trace",
      "upper_trace",
      "quantile_enclosure",
    ]) &&
    Number.isSafeInteger(divisor) &&
    (divisor as number) >= 1024 &&
    (divisor as number) <= 2 ** 40 &&
    Number.isInteger(Math.log2(divisor as number)) &&
    validQuadratureTrace(value["lower_trace"]) &&
    validQuadratureTrace(value["upper_trace"])
  );
}

function sourceHashes(bundlePath: string): JsonRecord {
  return Object.fromEntries(
    Object.keys(SOURCE_MAPPINGS)
      .sort()
      .map((name) => [name, sha256File(path.join(bundlePath, name))]),
  );
}

export function validatePairedTCriticalValueTableEvidenceBundle(
  bundlePath: string,
  expectedCommit: string,
): string[] {
  const errors: string[] = [];
  if (!COMMIT.test(expectedCommit) || /^0+$/.test(expectedCommit)) {
    return ["expected generator commit must be a nonzero full lowercase Git SHA"];
  }
  verifyManifest(bundlePath, errors);
  verifySourceCopies(bundlePath, errors);
  if (
    EXPECTED_FILES.some((name) => {
      try {
        return !lstatSync(path.join(bundlePath, name)).isFile();
      } catch {
        return true;
      }
    })
  ) {
    return errors;
  }

  const checkpoint = parseJson(
    path.join(bundlePath, "fixed-95-critical-value-table-candidate.json"),
    errors,
  );
  const environment = parseJson(path.join(bundlePath, "environment.json"), errors);
  const raw = parseJson(path.join(bundlePath, "raw-evidence.json"), errors);
  const certificates = parseJson(path.join(bundlePath, "certificates.json"), errors);
  const table = parseJson(path.join(bundlePath, "fixed-95-critical-value-table.json"), errors);
  const cases = parseJson(path.join(bundlePath, "cases.json"), errors);
  errors.push(...validatePairedTCriticalValueTableCandidate(checkpoint));
  if (
    !isRecord(environment) ||
    !isRecord(raw) ||
    !isRecord(certificates) ||
    !isRecord(table) ||
    !isRecord(cases)
  ) {
    errors.push("evidence bundle contains a structurally invalid JSON root");
    return errors;
  }

  if (
    !exactKeys(environment, [
      "status",
      "artifact_kind",
      "generator_commit",
      "python",
      "python_implementation",
      "python_flint",
      "flint",
      "platform_system",
      "platform_machine",
      "requirements_sha256",
      "arb_threads",
    ]) ||
    environment["status"] !== "non_authoritative_candidate" ||
    environment["artifact_kind"] !==
      "paired-t-fixed-95-critical-value-table-evidence-environment" ||
    environment["generator_commit"] !== expectedCommit ||
    typeof environment["python"] !== "string" ||
    !/^3\.12(?:\.|$)/.test(environment["python"]) ||
    environment["python_implementation"] !== "CPython" ||
    environment["python_flint"] !== "0.9.0" ||
    environment["flint"] !== "3.6.0" ||
    typeof environment["platform_system"] !== "string" ||
    typeof environment["platform_machine"] !== "string" ||
    environment["requirements_sha256"] !== sha256File(path.join(bundlePath, "requirements.txt")) ||
    environment["arb_threads"] !== 1
  ) {
    errors.push("evidence environment differs from the pinned non-authoritative surface");
  }

  const maturityKeys = [
    "status",
    "artifact_kind",
    "scope",
    "generator_commit",
    "entry_count",
    "runtime_support_claimed",
    "final_table_selected",
    "supported_degrees_of_freedom_max",
    "entries",
  ] as const;
  if (
    !exactKeys(raw, maturityKeys) ||
    raw["status"] !== "non_authoritative_candidate" ||
    raw["artifact_kind"] !== "paired-t-fixed-95-critical-value-table-raw-evidence" ||
    raw["scope"] !== SCOPE ||
    raw["generator_commit"] !== expectedCommit ||
    raw["entry_count"] !== DF_MAX ||
    raw["runtime_support_claimed"] !== false ||
    raw["final_table_selected"] !== false ||
    raw["supported_degrees_of_freedom_max"] !== null ||
    !Array.isArray(raw["entries"])
  ) {
    errors.push("raw evidence overclaims maturity, support, or provenance");
    return errors;
  }

  if (
    !exactKeys(certificates, [
      "status",
      "artifact_kind",
      "scope",
      "generator_commit",
      "entry_count",
      "runtime_support_claimed",
      "final_table_selected",
      "supported_degrees_of_freedom_max",
      "source_hashes",
      "environment_sha256",
      "raw_evidence_sha256",
      "certificates",
    ]) ||
    certificates["status"] !== "non_authoritative_candidate" ||
    certificates["artifact_kind"] !== "paired-t-fixed-95-critical-value-table-certificate-bundle" ||
    certificates["scope"] !== SCOPE ||
    certificates["generator_commit"] !== expectedCommit ||
    certificates["entry_count"] !== DF_MAX ||
    certificates["runtime_support_claimed"] !== false ||
    certificates["final_table_selected"] !== false ||
    certificates["supported_degrees_of_freedom_max"] !== null ||
    !Array.isArray(certificates["certificates"])
  ) {
    errors.push("certificate bundle overclaims maturity, support, or provenance");
    return errors;
  }
  if (
    !isRecord(certificates["source_hashes"]) ||
    !isDeepStrictEqual(certificates["source_hashes"], sourceHashes(bundlePath))
  ) {
    errors.push("certificate bundle source hashes do not bind the closed source-copy surface");
  }
  if (
    certificates["environment_sha256"] !== sha256File(path.join(bundlePath, "environment.json")) ||
    certificates["raw_evidence_sha256"] !== sha256File(path.join(bundlePath, "raw-evidence.json"))
  ) {
    errors.push("certificate bundle does not bind the environment and raw evidence");
  }

  if (
    !exactKeys(table, [
      "status",
      "artifact_kind",
      "scope",
      "generator_commit",
      "candidate_key",
      "target",
      "coverage",
      "runtime_support_claimed",
      "final_table_selected",
      "table_content_sha256",
      "certificate_bundle_sha256",
      "cells",
    ]) ||
    table["status"] !== "non_authoritative_candidate" ||
    table["artifact_kind"] !== "paired-t-fixed-95-critical-value-table-evidence-manifest" ||
    table["scope"] !== SCOPE ||
    table["generator_commit"] !== expectedCommit ||
    table["candidate_key"] !== CANDIDATE_KEY ||
    table["runtime_support_claimed"] !== false ||
    table["final_table_selected"] !== false ||
    !isRecord(table["target"]) ||
    !isDeepStrictEqual(table["target"], checkpointExpected()["target"]) ||
    !isRecord(table["coverage"]) ||
    !isDeepStrictEqual(table["coverage"], {
      degrees_of_freedom_minimum: DF_MIN,
      degrees_of_freedom_maximum_evaluation_target: DF_MAX,
      entry_count: DF_MAX,
      contiguous_evidence_coverage_claimed: true,
      supported_degrees_of_freedom_max: null,
    }) ||
    !Array.isArray(table["cells"])
  ) {
    errors.push("critical-value table overclaims maturity or differs from its closed surface");
    return errors;
  }

  const rawEntries = raw["entries"];
  const certificateEntries = certificates["certificates"];
  const cells = table["cells"];
  if (
    rawEntries.length !== DF_MAX ||
    certificateEntries.length !== DF_MAX ||
    cells.length !== DF_MAX
  ) {
    errors.push(
      "critical-value evidence must cover every integer df from 1 through 200 exactly once",
    );
    return errors;
  }

  const seedEntries =
    isRecord(cases["fixed_95_critical_value_table"]) &&
    Array.isArray(cases["fixed_95_critical_value_certificates"])
      ? cases["fixed_95_critical_value_certificates"]
      : [];
  const seed = new Map<number, string>();
  for (const value of seedEntries) {
    if (
      isRecord(value) &&
      typeof value["degrees_of_freedom"] === "number" &&
      typeof value["candidate_binary64_hex"] === "string"
    ) {
      seed.set(value["degrees_of_freedom"], value["candidate_binary64_hex"]);
    }
  }
  if (seed.size !== 9) errors.push("bundled research seed is not the expected nine-cell surface");

  const expectedProvenance = {
    generator_commit: expectedCommit,
    generator_sha256: sha256File(path.join(bundlePath, "generator.py")),
    environment_sha256: sha256File(path.join(bundlePath, "environment.json")),
    source_output_sha256: sha256File(path.join(bundlePath, "raw-evidence.json")),
  };
  const cellRecords: JsonRecord[] = [];
  for (let index = 0; index < DF_MAX; index += 1) {
    const df = index + 1;
    const rawEntry = rawEntries[index];
    const certificateEntry = certificateEntries[index];
    const cell = cells[index];
    if (
      !isRecord(rawEntry) ||
      !exactKeys(rawEntry, [
        "case_id",
        "degrees_of_freedom",
        "candidate_binary64_hex",
        "search",
        "certificate_trace",
      ]) ||
      !isRecord(certificateEntry) ||
      !exactKeys(certificateEntry, ["case_id", "certificate"]) ||
      !isRecord(cell) ||
      !exactKeys(cell, ["degrees_of_freedom", "critical_value_binary64_hex", "certificate_sha256"])
    ) {
      errors.push(`df=${df}: entry contains missing or undeclared fields`);
      continue;
    }
    cellRecords.push(cell);
    const caseId = `critical-df${df}`;
    const hex = cell["critical_value_binary64_hex"];
    if (
      rawEntry["case_id"] !== caseId ||
      rawEntry["degrees_of_freedom"] !== df ||
      certificateEntry["case_id"] !== caseId ||
      cell["degrees_of_freedom"] !== df ||
      typeof hex !== "string" ||
      !HEX64.test(hex) ||
      rawEntry["candidate_binary64_hex"] !== hex
    ) {
      errors.push(`df=${df}: df, case id, order, or binary64 cell is invalid`);
      continue;
    }
    const seedHex = seed.get(df);
    if (seedHex !== undefined && seedHex !== hex) {
      errors.push(`df=${df}: contiguous table disagrees with the committed research seed`);
    }

    const search = rawEntry["search"];
    const expectedPredecessor = (BigInt(`0x${hex}`) - 1n).toString(16).padStart(16, "0");
    if (
      !isRecord(search) ||
      !exactKeys(search, [
        "method",
        "initial_lower_binary64_hex",
        "initial_upper_binary64_hex",
        "final_predecessor_binary64_hex",
        "final_candidate_binary64_hex",
        "binary_search_steps",
        "predicate_evaluations",
        "predicate_initial_precision_bits",
        "predicate_maximum_precision_bits",
        "predicate_precision_ceiling_bits",
        "first_true_cell_proved",
      ]) ||
      search["method"] !== "monotone_binary64_cell_upper_midpoint_search" ||
      search["initial_lower_binary64_hex"] !== "3ff0000000000000" ||
      search["initial_upper_binary64_hex"] !== "4030000000000000" ||
      search["final_predecessor_binary64_hex"] !== expectedPredecessor ||
      search["final_candidate_binary64_hex"] !== hex ||
      search["binary_search_steps"] !== 54 ||
      search["predicate_evaluations"] !== 58 ||
      search["predicate_initial_precision_bits"] !== 192 ||
      ![192, 384, 768, 1536, 3072].includes(search["predicate_maximum_precision_bits"] as number) ||
      search["predicate_precision_ceiling_bits"] !== 4096 ||
      search["first_true_cell_proved"] !== true
    ) {
      errors.push(`df=${df}: monotone binary64 search trace is invalid`);
    }

    const certificate = certificateEntry["certificate"];
    if (!validCertificateShape(certificate)) {
      errors.push(`df=${df}: certificate shape is invalid`);
      continue;
    }
    let certificateErrors: string[];
    try {
      certificateErrors = validateCriticalValueCertificateCandidate(certificate);
    } catch {
      certificateErrors = ["certificate validator raised an exception"];
    }
    errors.push(...certificateErrors.map((error) => `df=${df}: ${error}`));
    if (
      certificate.input.degrees_of_freedom !== df ||
      certificate.input.candidate_binary64_hex !== hex ||
      !isDeepStrictEqual(certificate.provenance, expectedProvenance)
    ) {
      errors.push(`df=${df}: certificate input or provenance is not bound to the bundle`);
    }
    if (
      typeof cell["certificate_sha256"] !== "string" ||
      !SHA256.test(cell["certificate_sha256"]) ||
      cell["certificate_sha256"] !== sha256(stableJson(certificate))
    ) {
      errors.push(`df=${df}: table cell does not bind its certificate`);
    }

    const trace = rawEntry["certificate_trace"];
    if (
      !isRecord(trace) ||
      !exactKeys(trace, [
        "case_id",
        "input",
        "primary",
        "secondary",
        "closed_form",
        "projection",
        "candidate_exact",
      ]) ||
      trace["case_id"] !== caseId ||
      !isDeepStrictEqual(trace["input"], certificate.input) ||
      !isDeepStrictEqual(trace["primary"], certificate.primary) ||
      !validSecondaryTrace(trace["secondary"], df) ||
      !isRecord(trace["secondary"]) ||
      trace["secondary"]["method"] !== certificate.secondary.method ||
      !isDeepStrictEqual(
        trace["secondary"]["quantile_enclosure"],
        certificate.secondary.quantile_enclosure,
      ) ||
      !closedTraceMatches(trace["closed_form"], certificate.closed_form) ||
      !isDeepStrictEqual(trace["projection"], certificate.projection) ||
      trace["candidate_exact"] !== exactBinary64Rational(hex)
    ) {
      errors.push(`df=${df}: certificate is not bound to its raw generation trace`);
    }
  }

  if (cellRecords.length === DF_MAX) {
    if (
      !arePositiveFiniteBinary64HexesStrictlyDecreasing(
        cellRecords.map((cell) => cell["critical_value_binary64_hex"]),
      )
    ) {
      errors.push("critical-value table cells must be strictly decreasing as df increases");
    }
    if (table["table_content_sha256"] !== sha256(tableContent(cellRecords))) {
      errors.push("critical-value table content hash does not bind the ordered cells");
    }
  }
  if (
    table["certificate_bundle_sha256"] !== sha256File(path.join(bundlePath, "certificates.json"))
  ) {
    errors.push("critical-value table does not bind the certificate bundle");
  }
  return errors;
}

const invokedPath = process.argv[1];
if (invokedPath !== undefined && path.resolve(invokedPath) === fileURLToPath(import.meta.url)) {
  const bundleArgument = process.argv[2];
  const expectedCommit = process.argv[3];
  if (bundleArgument === undefined || expectedCommit === undefined) {
    process.stderr.write(
      "usage: validate-paired-t-critical-value-table-evidence <bundle> <commit>\n",
    );
    process.exitCode = 2;
  } else {
    const errors = validatePairedTCriticalValueTableEvidenceBundle(
      path.resolve(bundleArgument),
      expectedCommit,
    );
    if (errors.length > 0) {
      process.stderr.write(`${errors.join("\n")}\n`);
      process.exitCode = 1;
    } else {
      process.stdout.write("paired-t fixed-95 critical-value table evidence bundle: valid\n");
    }
  }
}
