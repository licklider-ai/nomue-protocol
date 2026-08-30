/** Coherent mutation probes for contiguous fixed-95 critical-value table evidence. */

import { createHash } from "node:crypto";
import {
  cpSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  symlinkSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { validatePairedTCriticalValueTableEvidenceBundle } from "./validate-paired-t-critical-value-table-evidence.js";

type JsonObject = Record<string, any>;

function readJson(filePath: string): JsonObject {
  return JSON.parse(readFileSync(filePath, "utf8")) as JsonObject;
}

function sortedJson(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortedJson);
  if (typeof value !== "object" || value === null) return value;
  return Object.fromEntries(
    Object.entries(value)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, child]) => [key, sortedJson(child)]),
  );
}

function stableJson(value: unknown): string {
  return `${JSON.stringify(sortedJson(value), null, 2)}\n`;
}

function writeJson(filePath: string, value: JsonObject): void {
  writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function sha256Bytes(value: Buffer | string): string {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function sha256File(filePath: string): string {
  return sha256Bytes(readFileSync(filePath));
}

function tableContent(table: JsonObject): string {
  const lines = ["nomue-paired-t-fixed-95-table-v1", "two-sided-tail-target=1/20"];
  lines.push(
    ...table.cells.map(
      (cell: JsonObject) =>
        `df=${String(cell.degrees_of_freedom)};binary64=${String(cell.critical_value_binary64_hex)}`,
    ),
  );
  return `${lines.join("\n")}\n`;
}

function rebuildTableBindings(bundlePath: string): void {
  const certificatePath = path.join(bundlePath, "certificates.json");
  const certificates = readJson(certificatePath);
  const tablePath = path.join(bundlePath, "fixed-95-critical-value-table.json");
  const table = readJson(tablePath);
  table.table_content_sha256 = sha256Bytes(tableContent(table));
  table.certificate_bundle_sha256 = sha256File(certificatePath);
  for (let index = 0; index < table.cells.length; index += 1) {
    table.cells[index].certificate_sha256 = sha256Bytes(
      stableJson(certificates.certificates[index].certificate),
    );
  }
  writeJson(tablePath, table);
}

function rebuildManifest(bundlePath: string): void {
  const files = readdirSync(bundlePath)
    .filter((entry) => entry !== "MANIFEST.sha256")
    .sort();
  writeFileSync(
    path.join(bundlePath, "MANIFEST.sha256"),
    `${files
      .map((entry) => `${sha256File(path.join(bundlePath, entry)).slice(7)}  ${entry}`)
      .join("\n")}\n`,
  );
}

function finalize(bundlePath: string): void {
  rebuildTableBindings(bundlePath);
  rebuildManifest(bundlePath);
}

function bindRaw(bundlePath: string): void {
  const certificatesPath = path.join(bundlePath, "certificates.json");
  const certificates = readJson(certificatesPath);
  const rawHash = sha256File(path.join(bundlePath, "raw-evidence.json"));
  certificates.raw_evidence_sha256 = rawHash;
  for (const entry of certificates.certificates) {
    entry.certificate.provenance.source_output_sha256 = rawHash;
  }
  writeJson(certificatesPath, certificates);
}

function bindEnvironment(bundlePath: string): void {
  const certificatesPath = path.join(bundlePath, "certificates.json");
  const certificates = readJson(certificatesPath);
  const environmentHash = sha256File(path.join(bundlePath, "environment.json"));
  certificates.environment_sha256 = environmentHash;
  for (const entry of certificates.certificates) {
    entry.certificate.provenance.environment_sha256 = environmentHash;
  }
  writeJson(certificatesPath, certificates);
}

function bindSource(bundlePath: string, sourceName: string): void {
  const certificatesPath = path.join(bundlePath, "certificates.json");
  const certificates = readJson(certificatesPath);
  const sourceHash = sha256File(path.join(bundlePath, sourceName));
  certificates.source_hashes[sourceName] = sourceHash;
  if (sourceName === "generator.py") {
    for (const entry of certificates.certificates) {
      entry.certificate.provenance.generator_sha256 = sourceHash;
    }
  }
  writeJson(certificatesPath, certificates);
}

function coherentCertificateMutation(
  bundlePath: string,
  mutate: (raw: JsonObject, certificates: JsonObject, table: JsonObject) => void,
): void {
  const rawPath = path.join(bundlePath, "raw-evidence.json");
  const certificatesPath = path.join(bundlePath, "certificates.json");
  const tablePath = path.join(bundlePath, "fixed-95-critical-value-table.json");
  const raw = readJson(rawPath);
  const certificates = readJson(certificatesPath);
  const table = readJson(tablePath);
  mutate(raw, certificates, table);
  writeJson(rawPath, raw);
  const rawHash = sha256File(rawPath);
  certificates.raw_evidence_sha256 = rawHash;
  for (const entry of certificates.certificates) {
    entry.certificate.provenance.source_output_sha256 = rawHash;
  }
  writeJson(certificatesPath, certificates);
  writeJson(tablePath, table);
  finalize(bundlePath);
}

export function runPairedTCriticalValueTableMutationProbes(
  sourceBundle: string,
  expectedCommit: string,
): number {
  const baseline = validatePairedTCriticalValueTableEvidenceBundle(sourceBundle, expectedCommit);
  if (baseline.length > 0) {
    throw new Error(`baseline critical-value table bundle is invalid:\n${baseline.join("\n")}`);
  }

  const probes: Array<[string, (bundlePath: string) => void, string?]> = [
    [
      "runtime support claim",
      (bundle) => {
        const tablePath = path.join(bundle, "fixed-95-critical-value-table.json");
        const table = readJson(tablePath);
        table.runtime_support_claimed = true;
        writeJson(tablePath, table);
        finalize(bundle);
      },
    ],
    [
      "final table selection",
      (bundle) => {
        const tablePath = path.join(bundle, "fixed-95-critical-value-table.json");
        const table = readJson(tablePath);
        table.final_table_selected = true;
        writeJson(tablePath, table);
        finalize(bundle);
      },
    ],
    [
      "supported df maximum",
      (bundle) => {
        const tablePath = path.join(bundle, "fixed-95-critical-value-table.json");
        const table = readJson(tablePath);
        table.coverage.supported_degrees_of_freedom_max = 200;
        writeJson(tablePath, table);
        finalize(bundle);
      },
    ],
    [
      "scope promotion",
      (bundle) => {
        const tablePath = path.join(bundle, "fixed-95-critical-value-table.json");
        const table = readJson(tablePath);
        table.scope = "protocol_support";
        writeJson(tablePath, table);
        finalize(bundle);
      },
    ],
    [
      "candidate checkpoint promotion",
      (bundle) => {
        const checkpointPath = path.join(bundle, "fixed-95-critical-value-table-candidate.json");
        const checkpoint = readJson(checkpointPath);
        checkpoint.runtime_support_enabled = true;
        writeJson(checkpointPath, checkpoint);
        bindSource(bundle, "fixed-95-critical-value-table-candidate.json");
        finalize(bundle);
      },
    ],
    [
      "table order",
      (bundle) => {
        const tablePath = path.join(bundle, "fixed-95-critical-value-table.json");
        const table = readJson(tablePath);
        [table.cells[0], table.cells[1]] = [table.cells[1], table.cells[0]];
        writeJson(tablePath, table);
        finalize(bundle);
      },
    ],
    [
      "nondecreasing critical-value cells",
      (bundle) => {
        const tablePath = path.join(bundle, "fixed-95-critical-value-table.json");
        const table = readJson(tablePath);
        table.cells[149].critical_value_binary64_hex = table.cells[148].critical_value_binary64_hex;
        writeJson(tablePath, table);
        finalize(bundle);
      },
      "critical-value table cells must be strictly decreasing as df increases",
    ],
    [
      "duplicate df",
      (bundle) => {
        const tablePath = path.join(bundle, "fixed-95-critical-value-table.json");
        const table = readJson(tablePath);
        table.cells[199] = structuredClone(table.cells[198]);
        writeJson(tablePath, table);
        finalize(bundle);
      },
    ],
    [
      "coherently rehashed adjacent cell",
      (bundle) =>
        coherentCertificateMutation(bundle, (raw, certificates, table) => {
          const index = 9;
          const original = BigInt(`0x${table.cells[index].critical_value_binary64_hex}`);
          const changed = (original + 1n).toString(16).padStart(16, "0");
          const predecessor = original.toString(16).padStart(16, "0");
          table.cells[index].critical_value_binary64_hex = changed;
          raw.entries[index].candidate_binary64_hex = changed;
          raw.entries[index].search.final_candidate_binary64_hex = changed;
          raw.entries[index].search.final_predecessor_binary64_hex = predecessor;
          raw.entries[index].certificate_trace.input.candidate_binary64_hex = changed;
          raw.entries[index].certificate_trace.projection.projected_binary64_hex = changed;
          certificates.certificates[index].certificate.input.candidate_binary64_hex = changed;
          certificates.certificates[index].certificate.projection.projected_binary64_hex = changed;
        }),
    ],
    [
      "coherently rehashed midpoint inequality",
      (bundle) =>
        coherentCertificateMutation(bundle, (raw, certificates) => {
          const index = 19;
          const interval = { lower: "1/20", upper: "1/20" };
          raw.entries[index].certificate_trace.primary.tail_at_cell_lower = interval;
          certificates.certificates[index].certificate.primary.tail_at_cell_lower = interval;
        }),
    ],
    [
      "search proof flag",
      (bundle) => {
        const rawPath = path.join(bundle, "raw-evidence.json");
        const raw = readJson(rawPath);
        raw.entries[49].search.first_true_cell_proved = false;
        writeJson(rawPath, raw);
        bindRaw(bundle);
        finalize(bundle);
      },
    ],
    [
      "undeclared raw comparison tolerance",
      (bundle) => {
        const rawPath = path.join(bundle, "raw-evidence.json");
        const raw = readJson(rawPath);
        raw.entries[0].comparison_tolerance = 4;
        writeJson(rawPath, raw);
        bindRaw(bundle);
        finalize(bundle);
      },
    ],
    [
      "environment dependency",
      (bundle) => {
        const environmentPath = path.join(bundle, "environment.json");
        const environment = readJson(environmentPath);
        environment.flint = "999.0.0";
        writeJson(environmentPath, environment);
        bindEnvironment(bundle);
        finalize(bundle);
      },
    ],
    [
      "generator source forgery",
      (bundle) => {
        const sourcePath = path.join(bundle, "generator.py");
        writeFileSync(sourcePath, `${readFileSync(sourcePath, "utf8")}\n# forged\n`);
        bindSource(bundle, "generator.py");
        finalize(bundle);
      },
    ],
    [
      "certificate core forgery",
      (bundle) => {
        const sourcePath = path.join(bundle, "generate_certificates.py");
        writeFileSync(sourcePath, `${readFileSync(sourcePath, "utf8")}\n# forged\n`);
        bindSource(bundle, "generate_certificates.py");
        finalize(bundle);
      },
    ],
    [
      "research seed forgery",
      (bundle) => {
        const casesPath = path.join(bundle, "cases.json");
        const cases = readJson(casesPath);
        cases.fixed_95_critical_value_certificates[0].candidate_binary64_hex = "40296993aacc4d25";
        writeJson(casesPath, cases);
        bindSource(bundle, "cases.json");
        finalize(bundle);
      },
    ],
    [
      "coherent commit forgery",
      (bundle) => {
        const forged = "f".repeat(40);
        for (const name of ["environment.json", "raw-evidence.json", "certificates.json"]) {
          const filePath = path.join(bundle, name);
          const value = readJson(filePath);
          value.generator_commit = forged;
          writeJson(filePath, value);
        }
        bindEnvironment(bundle);
        bindRaw(bundle);
        const certificatesPath = path.join(bundle, "certificates.json");
        const certificates = readJson(certificatesPath);
        for (const entry of certificates.certificates) {
          entry.certificate.provenance.generator_commit = forged;
        }
        writeJson(certificatesPath, certificates);
        const tablePath = path.join(bundle, "fixed-95-critical-value-table.json");
        const table = readJson(tablePath);
        table.generator_commit = forged;
        writeJson(tablePath, table);
        finalize(bundle);
      },
    ],
    [
      "undeclared table key",
      (bundle) => {
        const tablePath = path.join(bundle, "fixed-95-critical-value-table.json");
        const table = readJson(tablePath);
        table.comparison_tolerance = 4;
        writeJson(tablePath, table);
        finalize(bundle);
      },
    ],
    [
      "malformed certificates JSON",
      (bundle) => {
        writeFileSync(path.join(bundle, "certificates.json"), "{ broken");
        rebuildManifest(bundle);
      },
    ],
    [
      "symlink source",
      (bundle) => {
        const sourcePath = path.join(bundle, "generator.py");
        unlinkSync(sourcePath);
        symlinkSync("environment.json", sourcePath);
        rebuildManifest(bundle);
      },
    ],
    [
      "extra file",
      (bundle) => {
        writeFileSync(path.join(bundle, "support.txt"), "enabled\n");
        rebuildManifest(bundle);
      },
    ],
  ];

  const temporaryRoot = mkdtempSync(path.join(os.tmpdir(), "nomue-r2-critical-table-mutations-"));
  try {
    for (const [label, mutate, expectedError] of probes) {
      const bundlePath = path.join(temporaryRoot, label.replaceAll(" ", "-"));
      cpSync(sourceBundle, bundlePath, { recursive: true });
      mutate(bundlePath);
      let errors: string[];
      try {
        errors = validatePairedTCriticalValueTableEvidenceBundle(bundlePath, expectedCommit);
      } catch (error) {
        throw new Error(`${label}: validator threw instead of returning errors`, { cause: error });
      }
      if (errors.length === 0) throw new Error(`${label}: mutation was accepted`);
      if (expectedError !== undefined && !errors.includes(expectedError)) {
        throw new Error(`${label}: expected validator error was not reported: ${expectedError}`);
      }
    }
  } finally {
    rmSync(temporaryRoot, { recursive: true, force: true });
  }
  return probes.length;
}

const invokedPath = process.argv[1];
if (invokedPath !== undefined && path.resolve(invokedPath) === fileURLToPath(import.meta.url)) {
  const bundlePath = process.argv[2];
  const expectedCommit = process.argv[3];
  if (bundlePath === undefined || expectedCommit === undefined) {
    process.stderr.write("usage: probe-paired-t-critical-value-table-evidence <bundle> <commit>\n");
    process.exitCode = 2;
  } else {
    const count = runPairedTCriticalValueTableMutationProbes(bundlePath, expectedCommit);
    process.stdout.write(`rejected ${count} fixed-95 critical-value table evidence mutations\n`);
  }
}
