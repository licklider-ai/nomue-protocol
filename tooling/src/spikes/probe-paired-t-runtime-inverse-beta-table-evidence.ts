/** Mutation probes for the generated runtime inverse-beta table evidence bundle. */

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
import { validatePairedTRuntimeInverseBetaTableEvidenceBundle } from "./validate-paired-t-runtime-inverse-beta-table-evidence.js";

type JsonObject = Record<string, any>;

function readJson(filePath: string): JsonObject {
  return JSON.parse(readFileSync(filePath, "utf8")) as JsonObject;
}

function writeJson(filePath: string, value: JsonObject): void {
  writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function sha256(filePath: string): string {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

function rebuildManifest(bundlePath: string): void {
  const files = readdirSync(bundlePath)
    .filter((entry) => entry !== "MANIFEST.sha256")
    .sort();
  writeFileSync(
    path.join(bundlePath, "MANIFEST.sha256"),
    `${files.map((entry) => `${sha256(path.join(bundlePath, entry))}  ${entry}`).join("\n")}\n`,
  );
}

function mutateEvidence(bundlePath: string, mutate: (value: JsonObject) => void): void {
  const evidencePath = path.join(bundlePath, "inverse-beta-table-evidence.json");
  const evidence = readJson(evidencePath);
  mutate(evidence);
  writeJson(evidencePath, evidence);
  rebuildManifest(bundlePath);
}

export function runPairedTRuntimeInverseBetaTableMutationProbes(
  sourceBundle: string,
  expectedCommit: string,
): number {
  const baseline = validatePairedTRuntimeInverseBetaTableEvidenceBundle(
    sourceBundle,
    expectedCommit,
  );
  if (baseline.length > 0) {
    throw new Error(`baseline inverse-beta table bundle is invalid:\n${baseline.join("\n")}`);
  }

  const probes: Array<[string, (bundlePath: string) => void]> = [
    [
      "runtime support claim",
      (bundle) => mutateEvidence(bundle, (value) => (value.runtime_support_claimed = true)),
    ],
    [
      "final table selection",
      (bundle) => mutateEvidence(bundle, (value) => (value.final_table_selected = true)),
    ],
    [
      "supported df",
      (bundle) => mutateEvidence(bundle, (value) => (value.supported_degrees_of_freedom_max = 200)),
    ],
    [
      "commit",
      (bundle) => mutateEvidence(bundle, (value) => (value.generator_commit = "f".repeat(40))),
    ],
    [
      "undeclared evidence key",
      (bundle) => mutateEvidence(bundle, (value) => (value.comparison_tolerance = 4)),
    ],
    [
      "table order",
      (bundle) => {
        const tablePath = path.join(bundle, "runtime-inverse-beta-table.json");
        const table = readJson(tablePath);
        [table.entries[0], table.entries[1]] = [table.entries[1], table.entries[0]];
        writeJson(tablePath, table);
        const evidencePath = path.join(bundle, "inverse-beta-table-evidence.json");
        const evidence = readJson(evidencePath);
        evidence.table_content_hash = `sha256:${sha256(tablePath)}`;
        writeJson(evidencePath, evidence);
        rebuildManifest(bundle);
      },
    ],
    [
      "coherently rehashed table bits",
      (bundle) => {
        const tablePath = path.join(bundle, "runtime-inverse-beta-table.json");
        const table = readJson(tablePath);
        table.entries[9].inverse_beta_binary64_hex = "3ff0000000000000";
        writeJson(tablePath, table);
        const evidencePath = path.join(bundle, "inverse-beta-table-evidence.json");
        const evidence = readJson(evidencePath);
        evidence.entries[9].projection.binary64_hex = "3ff0000000000000";
        evidence.table_content_hash = `sha256:${sha256(tablePath)}`;
        writeJson(evidencePath, evidence);
        rebuildManifest(bundle);
      },
    ],
    [
      "primary enclosure",
      (bundle) =>
        mutateEvidence(bundle, (value) => {
          value.entries[2].arb_primary.enclosure = { lower: "0/1", upper: "1/1" };
        }),
    ],
    [
      "secondary coefficient",
      (bundle) =>
        mutateEvidence(
          bundle,
          (value) => (value.entries[2].exact_secondary.rational_coefficient = "3/1"),
        ),
    ],
    [
      "secondary enclosure",
      (bundle) =>
        mutateEvidence(bundle, (value) => {
          value.entries[2].exact_secondary.inverse_beta_enclosure = {
            lower: "1/2",
            upper: "1/2",
          };
        }),
    ],
    [
      "Machin term count",
      (bundle) =>
        mutateEvidence(
          bundle,
          (value) => (value.entries[2].exact_secondary.machin_terms.one_over_five = 95),
        ),
    ],
    [
      "precision history",
      (bundle) =>
        mutateEvidence(
          bundle,
          (value) => (value.entries[2].arb_primary.precision_history_bits = [128, 512]),
        ),
    ],
    [
      "containment claim",
      (bundle) =>
        mutateEvidence(
          bundle,
          (value) => (value.entries[2].secondary_contained_in_primary = false),
        ),
    ],
    [
      "environment dependency",
      (bundle) => {
        const environmentPath = path.join(bundle, "environment.json");
        const environment = readJson(environmentPath);
        environment.flint = "999.0.0";
        writeJson(environmentPath, environment);
        const evidencePath = path.join(bundle, "inverse-beta-table-evidence.json");
        const evidence = readJson(evidencePath);
        evidence.environment_hash = `sha256:${sha256(environmentPath)}`;
        writeJson(evidencePath, evidence);
        rebuildManifest(bundle);
      },
    ],
    [
      "source-copy forgery",
      (bundle) => {
        const generatorPath = path.join(bundle, "generator.py");
        writeFileSync(generatorPath, `${readFileSync(generatorPath, "utf8")}\n# forged\n`);
        const evidencePath = path.join(bundle, "inverse-beta-table-evidence.json");
        const evidence = readJson(evidencePath);
        evidence.source_hashes["generator.py"] = `sha256:${sha256(generatorPath)}`;
        writeJson(evidencePath, evidence);
        rebuildManifest(bundle);
      },
    ],
    [
      "candidate promotion",
      (bundle) => {
        const candidatePath = path.join(bundle, "runtime-inverse-beta-table-candidate.json");
        const candidate = readJson(candidatePath);
        candidate.runtime_support_enabled = true;
        writeJson(candidatePath, candidate);
        const evidencePath = path.join(bundle, "inverse-beta-table-evidence.json");
        const evidence = readJson(evidencePath);
        evidence.source_hashes["runtime-inverse-beta-table-candidate.json"] =
          `sha256:${sha256(candidatePath)}`;
        writeJson(evidencePath, evidence);
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
  ];

  const temporaryRoot = mkdtempSync(path.join(os.tmpdir(), "nomue-r2-inverse-beta-mutations-"));
  try {
    for (const [label, mutate] of probes) {
      const bundlePath = path.join(temporaryRoot, label.replaceAll(" ", "-"));
      cpSync(sourceBundle, bundlePath, { recursive: true });
      mutate(bundlePath);
      const errors = validatePairedTRuntimeInverseBetaTableEvidenceBundle(
        bundlePath,
        expectedCommit,
      );
      if (errors.length === 0) throw new Error(`${label}: mutation was accepted`);
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
    process.stderr.write(
      "usage: probe-paired-t-runtime-inverse-beta-table-evidence <bundle> <commit>\n",
    );
    process.exitCode = 2;
  } else {
    const count = runPairedTRuntimeInverseBetaTableMutationProbes(bundlePath, expectedCommit);
    process.stdout.write(`rejected ${count} inverse-beta table evidence mutations\n`);
  }
}
