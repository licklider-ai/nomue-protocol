/** Mutation probes for a generated paired-t runtime-series evidence bundle. */

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
import { validatePairedTRuntimeSeriesEvidenceBundle } from "./validate-paired-t-runtime-series-evidence.js";

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
  const evidencePath = path.join(bundlePath, "runtime-series-evidence.json");
  const evidence = readJson(evidencePath);
  mutate(evidence);
  writeJson(evidencePath, evidence);
  rebuildManifest(bundlePath);
}

export function runPairedTRuntimeSeriesEvidenceMutationProbes(
  sourceBundle: string,
  expectedCommit: string,
): number {
  const baseline = validatePairedTRuntimeSeriesEvidenceBundle(sourceBundle, expectedCommit);
  if (baseline.length > 0)
    throw new Error(`baseline evidence bundle is invalid:\n${baseline.join("\n")}`);

  const probes: Array<[string, (bundlePath: string) => void]> = [
    [
      "support flag",
      (bundle) => mutateEvidence(bundle, (value) => (value.runtime_support_claimed = true)),
    ],
    [
      "correct-rounding claim",
      (bundle) =>
        mutateEvidence(bundle, (value) => (value.correct_rounding_runtime_claimed = true)),
    ],
    [
      "contiguous coverage claim",
      (bundle) =>
        mutateEvidence(bundle, (value) => (value.contiguous_evaluation_coverage_claimed = true)),
    ],
    [
      "supported df",
      (bundle) => mutateEvidence(bundle, (value) => (value.supported_degrees_of_freedom_max = 200)),
    ],
    ["scope", (bundle) => mutateEvidence(bundle, (value) => (value.scope = "runtime_support"))],
    [
      "commit",
      (bundle) => mutateEvidence(bundle, (value) => (value.generator_commit = "f".repeat(40))),
    ],
    [
      "undeclared top-level key",
      (bundle) => mutateEvidence(bundle, (value) => (value.supported = true)),
    ],
    [
      "undeclared nested key",
      (bundle) =>
        mutateEvidence(bundle, (value) => (value.cases[1].binary64_graph_mirror.tolerance = 4)),
    ],
    [
      "graph branch",
      (bundle) =>
        mutateEvidence(
          bundle,
          (value) => (value.cases[1].binary64_graph_mirror.branch = "lower-tail-positive-series"),
        ),
    ],
    [
      "graph p bits",
      (bundle) =>
        mutateEvidence(
          bundle,
          (value) =>
            (value.cases[1].binary64_graph_mirror.p_value_binary64_hex = "3ff0000000000000"),
        ),
    ],
    [
      "graph iteration",
      (bundle) =>
        mutateEvidence(bundle, (value) => (value.cases[1].binary64_graph_mirror.iterations += 1)),
    ],
    [
      "graph remainder",
      (bundle) =>
        mutateEvidence(
          bundle,
          (value) =>
            (value.cases[1].binary64_graph_mirror.positive_series_remainder_contribution_candidate_binary64_hex =
              "0000000000000000"),
        ),
    ],
    [
      "inverse beta cell",
      (bundle) =>
        mutateEvidence(
          bundle,
          (value) =>
            (value.cases[1].inverse_beta_constant.projection.binary64_hex = "3fe0000000000000"),
        ),
    ],
    [
      "truth enclosure",
      (bundle) =>
        mutateEvidence(bundle, (value) => {
          value.cases[1].mathematical_truth.enclosure = { lower: "0/1", upper: "1/1" };
        }),
    ],
    [
      "truncation enclosure",
      (bundle) =>
        mutateEvidence(bundle, (value) => {
          value.cases[1].mathematical_truth.positive_series_truncation_enclosure = {
            lower: "0/1",
            upper: "0/1",
          };
        }),
    ],
    [
      "ULP observation",
      (bundle) =>
        mutateEvidence(
          bundle,
          (value) =>
            (value.cases[1].mathematical_truth.graph_to_correctly_rounded_truth_ulp_distance += 1),
        ),
    ],
    ["case order", (bundle) => mutateEvidence(bundle, (value) => value.cases.reverse())],
    [
      "environment dependency",
      (bundle) => {
        const environmentPath = path.join(bundle, "environment.json");
        const environment = readJson(environmentPath);
        environment.python_flint = "9.9.9";
        writeJson(environmentPath, environment);
        const evidencePath = path.join(bundle, "runtime-series-evidence.json");
        const evidence = readJson(evidencePath);
        evidence.environment_hash = `sha256:${sha256(environmentPath)}`;
        writeJson(evidencePath, evidence);
        rebuildManifest(bundle);
      },
    ],
    [
      "source-copy forgery",
      (bundle) => {
        const sourcePath = path.join(bundle, "runtime-series-candidate.ts");
        writeFileSync(sourcePath, `${readFileSync(sourcePath, "utf8")}\n// forged\n`);
        const evidencePath = path.join(bundle, "runtime-series-evidence.json");
        const evidence = readJson(evidencePath);
        evidence.source_hashes["runtime-series-candidate.ts"] = `sha256:${sha256(sourcePath)}`;
        writeJson(evidencePath, evidence);
        rebuildManifest(bundle);
      },
    ],
    [
      "truth-error source-copy forgery",
      (bundle) => {
        const sourcePath = path.join(bundle, "truth-error-support-candidate.ts");
        writeFileSync(sourcePath, `${readFileSync(sourcePath, "utf8")}\n// forged\n`);
        const evidencePath = path.join(bundle, "runtime-series-evidence.json");
        const evidence = readJson(evidencePath);
        evidence.source_hashes["truth-error-support-candidate.ts"] = `sha256:${sha256(sourcePath)}`;
        writeJson(evidencePath, evidence);
        rebuildManifest(bundle);
      },
    ],
    [
      "truth-error checkpoint promotion",
      (bundle) => {
        const checkpointPath = path.join(bundle, "truth-error-support-candidate.json");
        const checkpoint = readJson(checkpointPath);
        checkpoint.runtime_support_enabled = true;
        checkpoint.supported_domain_claimed = true;
        checkpoint.truth_error_bound_selected = true;
        writeJson(checkpointPath, checkpoint);
        rebuildManifest(bundle);
      },
    ],
    [
      "symlink source",
      (bundle) => {
        const sourcePath = path.join(bundle, "generator.py");
        unlinkSync(sourcePath);
        symlinkSync("cases.json", sourcePath);
        rebuildManifest(bundle);
      },
    ],
  ];

  const temporaryRoot = mkdtempSync(path.join(os.tmpdir(), "nomue-r2-series-mutations-"));
  try {
    for (const [label, mutate] of probes) {
      const bundlePath = path.join(temporaryRoot, label.replaceAll(" ", "-"));
      cpSync(sourceBundle, bundlePath, { recursive: true });
      mutate(bundlePath);
      const errors = validatePairedTRuntimeSeriesEvidenceBundle(bundlePath, expectedCommit);
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
    process.stderr.write("usage: probe-paired-t-runtime-series-evidence <bundle> <commit>\n");
    process.exitCode = 2;
  } else {
    const count = runPairedTRuntimeSeriesEvidenceMutationProbes(
      path.resolve(bundlePath),
      expectedCommit,
    );
    process.stdout.write(`paired-t runtime-series evidence mutations rejected: ${count}\n`);
  }
}
