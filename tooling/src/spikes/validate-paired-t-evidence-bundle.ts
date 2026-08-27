/**
 * Validate a generated, non-authoritative Release 2 paired-t evidence bundle.
 *
 * This CLI performs file/hash/provenance and candidate-certificate checks. It
 * does not calculate a Student-t quantity and does not close R2-D5.
 */

import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { isDeepStrictEqual } from "node:util";

import {
  validateCriticalValueCertificateCandidate,
  validatePValueCertificateCandidate,
  type CriticalValueCertificateCandidate,
  type PValueCertificateCandidate,
} from "./paired-t-certificate-candidate.js";

interface PEntry {
  case_id: string;
  certificate: PValueCertificateCandidate;
}

interface CriticalEntry {
  case_id: string;
  certificate: CriticalValueCertificateCandidate;
}

interface CertificateBundle {
  status: string;
  artifact_kind: string;
  scope: string;
  generator_commit: string;
  p_value_certificates: PEntry[];
  fixed_95_critical_value_certificates: CriticalEntry[];
  boundary_probe_case_ids: string[];
}

interface CaseManifest {
  status: string;
  p_value_certificates: Array<{ case_id: string }>;
  fixed_95_critical_value_certificates: Array<{ case_id: string }>;
  boundary_probes: Array<{
    case_id: string;
    expected_projection_class: string;
    expected_projected_binary64_hex?: string;
  }>;
}

interface RawOutput {
  status: string;
  artifact_kind: string;
  scope: string;
  p_value_traces: Array<{
    case_id: string;
    input: unknown;
    primary: unknown;
    secondary: { enclosure: unknown; overlap_with_primary: boolean };
    closed_form: null | { method: string; enclosure: unknown };
    projection: ProjectionLike;
  }>;
  fixed_95_critical_value_traces: Array<{
    case_id: string;
    input: unknown;
    primary: unknown;
    secondary: { quantile_enclosure: unknown };
    closed_form: null | { method: string; quantile_enclosure: unknown };
    projection: ProjectionLike;
  }>;
  boundary_probes: Array<{
    case_id: string;
    projection: {
      projection_class: string;
      projected_binary64_hex: string;
      strict_containment: boolean;
    };
    certificate_disposition: string;
  }>;
}

interface Environment {
  status: string;
  artifact_kind: string;
  generator_commit: string;
  python_flint: string;
  requirements_sha256: string;
  arb_threads: number;
}

interface Provenance {
  generator_commit: string;
  generator_sha256: string;
  environment_sha256: string;
  source_output_sha256: string;
}

interface ProjectionLike {
  target_format: unknown;
  rounding_mode: unknown;
  projected_binary64_hex: unknown;
  cell_lower: unknown;
  cell_upper: unknown;
  strict_containment: unknown;
}

const EXPECTED_FILES = [
  "cases.json",
  "certificates.json",
  "environment.json",
  "generator.py",
  "raw-oracle-output.json",
  "requirements.txt",
] as const;
const HASH = /^[0-9a-f]{64}$/;
const COMMIT = /^[0-9a-f]{40}$/;

function sha256(file: string): string {
  return createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

function readJson<T>(file: string): T {
  return JSON.parse(fs.readFileSync(file, "utf8")) as T;
}

function sorted(values: string[]): string[] {
  return [...values].sort((left, right) => left.localeCompare(right));
}

function sameSet(actual: string[], expected: string[]): boolean {
  const left = sorted(actual);
  const right = sorted(expected);
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function sameProvenance(actual: Provenance, expected: Provenance): boolean {
  return (
    actual.generator_commit === expected.generator_commit &&
    actual.generator_sha256 === expected.generator_sha256 &&
    actual.environment_sha256 === expected.environment_sha256 &&
    actual.source_output_sha256 === expected.source_output_sha256
  );
}

function projectionBinding(value: ProjectionLike): Record<string, unknown> {
  return {
    target_format: value.target_format,
    rounding_mode: value.rounding_mode,
    projected_binary64_hex: value.projected_binary64_hex,
    cell_lower: value.cell_lower,
    cell_upper: value.cell_upper,
    strict_containment: value.strict_containment,
  };
}

function verifyManifest(bundleDir: string, errors: string[]): void {
  const manifestPath = path.join(bundleDir, "MANIFEST.sha256");
  if (!fs.existsSync(manifestPath)) {
    errors.push("bundle manifest is missing");
    return;
  }
  const directoryEntries = fs.readdirSync(bundleDir);
  if (!sameSet(directoryEntries, [...EXPECTED_FILES, "MANIFEST.sha256"])) {
    errors.push("bundle directory file set is incomplete or contains an undeclared item");
  }
  for (const name of directoryEntries) {
    const entry = fs.lstatSync(path.join(bundleDir, name));
    if (!entry.isFile() || entry.isSymbolicLink()) {
      errors.push(`bundle entry must be a regular non-symlink file: ${name}`);
    }
  }
  const entries = fs
    .readFileSync(manifestPath, "utf8")
    .trimEnd()
    .split("\n")
    .map((line) => /^([0-9a-f]{64})  ([A-Za-z0-9._-]+)$/.exec(line));
  if (entries.some((entry) => entry === null)) {
    errors.push("bundle manifest contains a malformed line");
    return;
  }
  const parsed = entries as RegExpExecArray[];
  const names = parsed.map((entry) => entry[2] ?? "");
  if (!sameSet(names, [...EXPECTED_FILES])) {
    errors.push("bundle manifest file set is incomplete or contains an undeclared item");
  }
  for (const entry of parsed) {
    const expectedHash = entry[1] ?? "";
    const name = entry[2] ?? "";
    const file = path.join(bundleDir, name);
    if (!fs.existsSync(file)) {
      errors.push(`manifested file is missing: ${name}`);
    } else if (sha256(file) !== expectedHash) {
      errors.push(`manifested file hash mismatch: ${name}`);
    }
  }
}

function verifySourceCopies(bundleDir: string, errors: string[]): void {
  const repoSources: Array<[string, string]> = [
    ["generator.py", "tooling/r2-paired-t-evidence/generate_certificates.py"],
    ["cases.json", "tooling/r2-paired-t-evidence/cases.json"],
    ["requirements.txt", "tooling/r2-paired-t-evidence/requirements.txt"],
  ];
  for (const [bundleName, repoPath] of repoSources) {
    const bundlePath = path.join(bundleDir, bundleName);
    if (!fs.existsSync(bundlePath) || !fs.existsSync(repoPath)) continue;
    if (sha256(bundlePath) !== sha256(repoPath)) {
      errors.push(`${bundleName} does not match the repository source`);
    }
  }
}

function validateCaseCoverage(
  cases: CaseManifest,
  certificates: CertificateBundle,
  raw: RawOutput,
  errors: string[],
): void {
  const pIds = cases.p_value_certificates.map((entry) => entry.case_id);
  const criticalIds = cases.fixed_95_critical_value_certificates.map((entry) => entry.case_id);
  const boundaryIds = cases.boundary_probes.map((entry) => entry.case_id);
  const comparisons: Array<[string, string[], string[]]> = [
    ["p certificate", certificates.p_value_certificates.map((entry) => entry.case_id), pIds],
    [
      "critical certificate",
      certificates.fixed_95_critical_value_certificates.map((entry) => entry.case_id),
      criticalIds,
    ],
    ["boundary certificate index", certificates.boundary_probe_case_ids, boundaryIds],
    ["p raw trace", raw.p_value_traces.map((entry) => entry.case_id), pIds],
    [
      "critical raw trace",
      raw.fixed_95_critical_value_traces.map((entry) => entry.case_id),
      criticalIds,
    ],
    ["boundary raw trace", raw.boundary_probes.map((entry) => entry.case_id), boundaryIds],
  ];
  for (const [label, actual, expected] of comparisons) {
    if (!sameSet(actual, expected)) {
      errors.push(`${label} case set does not match cases.json`);
    }
    if (new Set(actual).size !== actual.length) {
      errors.push(`${label} contains a duplicate case id`);
    }
  }

  const rawBoundaries = new Map(raw.boundary_probes.map((entry) => [entry.case_id, entry]));
  for (const expected of cases.boundary_probes) {
    const actual = rawBoundaries.get(expected.case_id);
    if (actual === undefined) continue;
    if (
      actual.projection.projection_class !== expected.expected_projection_class ||
      actual.projection.strict_containment !== true
    ) {
      errors.push(`${expected.case_id}: boundary projection classification is not pinned`);
    }
    if (
      expected.expected_projected_binary64_hex !== undefined &&
      actual.projection.projected_binary64_hex !== expected.expected_projected_binary64_hex
    ) {
      errors.push(`${expected.case_id}: boundary projection value is not pinned`);
    }
    if (
      actual.projection.projected_binary64_hex === "0000000000000000" &&
      actual.certificate_disposition !==
        "positive_mathematical_tail_not_representable_as_positive_binary64"
    ) {
      errors.push(`${expected.case_id}: zero projection is not classified as unrepresentable`);
    }
  }
}

function validateRawBindings(
  certificates: CertificateBundle,
  raw: RawOutput,
  errors: string[],
): void {
  const pTraces = new Map(raw.p_value_traces.map((entry) => [entry.case_id, entry]));
  for (const entry of certificates.p_value_certificates) {
    const trace = pTraces.get(entry.case_id);
    if (trace === undefined) continue;
    const certificate = entry.certificate;
    if (
      !isDeepStrictEqual(trace.input, certificate.input) ||
      !isDeepStrictEqual(trace.primary, certificate.primary) ||
      !isDeepStrictEqual(trace.secondary.enclosure, certificate.secondary.enclosure) ||
      trace.secondary.overlap_with_primary !== certificate.secondary.overlap_with_primary ||
      !isDeepStrictEqual(
        projectionBinding(trace.projection),
        projectionBinding(certificate.projection),
      )
    ) {
      errors.push(`${entry.case_id}: certificate is not bound to its raw oracle trace`);
    }
    if (certificate.closed_form === null) {
      if (trace.closed_form !== null) {
        errors.push(`${entry.case_id}: raw trace has an undeclared closed-form result`);
      }
    } else if (
      trace.closed_form === null ||
      trace.closed_form.method !== certificate.closed_form.method ||
      !isDeepStrictEqual(trace.closed_form.enclosure, certificate.closed_form.enclosure)
    ) {
      errors.push(`${entry.case_id}: closed-form certificate is not bound to the raw trace`);
    }
  }

  const criticalTraces = new Map(
    raw.fixed_95_critical_value_traces.map((entry) => [entry.case_id, entry]),
  );
  for (const entry of certificates.fixed_95_critical_value_certificates) {
    const trace = criticalTraces.get(entry.case_id);
    if (trace === undefined) continue;
    const certificate = entry.certificate;
    if (
      !isDeepStrictEqual(trace.input, certificate.input) ||
      !isDeepStrictEqual(trace.primary, certificate.primary) ||
      !isDeepStrictEqual(
        trace.secondary.quantile_enclosure,
        certificate.secondary.quantile_enclosure,
      ) ||
      !isDeepStrictEqual(
        projectionBinding(trace.projection),
        projectionBinding(certificate.projection),
      )
    ) {
      errors.push(`${entry.case_id}: critical certificate is not bound to its raw oracle trace`);
    }
    if (certificate.closed_form === null) {
      if (trace.closed_form !== null) {
        errors.push(`${entry.case_id}: raw trace has an undeclared critical closed form`);
      }
    } else if (
      trace.closed_form === null ||
      trace.closed_form.method !== certificate.closed_form.method ||
      !isDeepStrictEqual(
        trace.closed_form.quantile_enclosure,
        certificate.closed_form.quantile_enclosure,
      )
    ) {
      errors.push(`${entry.case_id}: critical closed form is not bound to the raw trace`);
    }
  }
}

function validateBundle(bundleDir: string, expectedCommit: string): string[] {
  const errors: string[] = [];
  if (!COMMIT.test(expectedCommit) || /^0+$/.test(expectedCommit)) {
    return ["expected generator commit must be a nonzero full lowercase Git SHA"];
  }
  verifyManifest(bundleDir, errors);
  verifySourceCopies(bundleDir, errors);
  const required = [...EXPECTED_FILES, "MANIFEST.sha256"];
  if (required.some((name) => !fs.existsSync(path.join(bundleDir, name)))) return errors;

  const cases = readJson<CaseManifest>(path.join(bundleDir, "cases.json"));
  const certificates = readJson<CertificateBundle>(path.join(bundleDir, "certificates.json"));
  const raw = readJson<RawOutput>(path.join(bundleDir, "raw-oracle-output.json"));
  const environment = readJson<Environment>(path.join(bundleDir, "environment.json"));
  if (
    cases.status !== "non_authoritative_candidate" ||
    certificates.status !== "non_authoritative_candidate" ||
    raw.status !== "non_authoritative_candidate" ||
    environment.status !== "non_authoritative_candidate"
  ) {
    errors.push("every evidence-bundle component must remain non-authoritative");
  }
  if (
    certificates.scope !== "pilot_evidence_only_not_r2_d5_closure" ||
    raw.scope !== "pilot_evidence_only_not_r2_d5_closure"
  ) {
    errors.push("pilot evidence must not claim R2-D5 closure");
  }
  if (
    certificates.artifact_kind !== "paired-t-certificate-pilot-bundle" ||
    raw.artifact_kind !== "paired-t-oracle-source-output"
  ) {
    errors.push("evidence bundle artifact kinds are not pinned");
  }
  if (
    certificates.generator_commit !== expectedCommit ||
    environment.generator_commit !== expectedCommit
  ) {
    errors.push("bundle generator commit does not match the requested checkout");
  }
  if (
    environment.artifact_kind !== "paired-t-oracle-environment" ||
    environment.python_flint !== "0.9.0" ||
    environment.arb_threads !== 1
  ) {
    errors.push("oracle environment is not pinned to the candidate dependency contract");
  }
  const requirementsHash = `sha256:${sha256(path.join(bundleDir, "requirements.txt"))}`;
  if (environment.requirements_sha256 !== requirementsHash) {
    errors.push("environment requirements hash does not match requirements.txt");
  }

  const expectedProvenance = {
    generator_commit: expectedCommit,
    generator_sha256: `sha256:${sha256(path.join(bundleDir, "generator.py"))}`,
    environment_sha256: `sha256:${sha256(path.join(bundleDir, "environment.json"))}`,
    source_output_sha256: `sha256:${sha256(path.join(bundleDir, "raw-oracle-output.json"))}`,
  };
  for (const entry of certificates.p_value_certificates) {
    const certificateErrors = validatePValueCertificateCandidate(entry.certificate);
    errors.push(...certificateErrors.map((error) => `${entry.case_id}: ${error}`));
    if (!sameProvenance(entry.certificate.provenance, expectedProvenance)) {
      errors.push(`${entry.case_id}: certificate provenance does not bind the bundle files`);
    }
  }
  for (const entry of certificates.fixed_95_critical_value_certificates) {
    const certificateErrors = validateCriticalValueCertificateCandidate(entry.certificate);
    errors.push(...certificateErrors.map((error) => `${entry.case_id}: ${error}`));
    if (!sameProvenance(entry.certificate.provenance, expectedProvenance)) {
      errors.push(`${entry.case_id}: certificate provenance does not bind the bundle files`);
    }
  }
  validateCaseCoverage(cases, certificates, raw, errors);
  validateRawBindings(certificates, raw, errors);
  return errors;
}

const [bundleArgument, expectedCommit] = process.argv.slice(2);
if (bundleArgument === undefined || expectedCommit === undefined) {
  console.error(
    "usage: tsx tooling/src/spikes/validate-paired-t-evidence-bundle.ts <bundle-dir> <generator-commit>",
  );
  process.exit(2);
}
const bundleDir = path.resolve(bundleArgument);
const errors = validateBundle(bundleDir, expectedCommit);
if (errors.length > 0) {
  for (const error of errors) console.error(`release-2-paired-t-evidence: ${error}`);
  process.exit(1);
}
console.log(
  `release-2-paired-t-evidence: OK (${bundleDir}; manifest, provenance, case coverage, and certificate structure)`,
);
