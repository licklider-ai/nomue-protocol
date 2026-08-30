/** Coherent mutation probes for the non-authoritative truth-boundary evidence bundle. */

import { createHash } from "node:crypto";
import { cpSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validatePairedTTruthBoundaryEvidenceBundle } from "./validate-paired-t-truth-boundary-evidence.js";

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
  const evidencePath = path.join(bundlePath, "truth-boundary-evidence.json");
  const evidence = readJson(evidencePath);
  mutate(evidence);
  writeJson(evidencePath, evidence);
  rebuildManifest(bundlePath);
}

export function runPairedTTruthBoundaryMutationProbes(
  sourceBundle: string,
  expectedCommit: string,
): number {
  const baseline = validatePairedTTruthBoundaryEvidenceBundle(sourceBundle, expectedCommit);
  if (baseline.length > 0)
    throw new Error(`baseline truth-boundary bundle is invalid:\n${baseline.join("\n")}`);

  const probes: Array<[string, (bundle: string) => void]> = [
    [
      "runtime support",
      (bundle) => mutateEvidence(bundle, (value) => (value.runtime_support_claimed = true)),
    ],
    [
      "global bound",
      (bundle) =>
        mutateEvidence(bundle, (value) => {
          value.global_truth_error_bound_selected = true;
          value.global_truth_error_bound_ulp = value.pointwise_maximum_observed_ulp;
        }),
    ],
    [
      "finite maximum guarantee",
      (bundle) =>
        mutateEvidence(bundle, (value) => (value.finite_corpus_maximum_is_a_guarantee = true)),
    ],
    [
      "runtime margin",
      (bundle) =>
        mutateEvidence(bundle, (value) => (value.projection_margin_runtime_activated = true)),
    ],
    [
      "supported df",
      (bundle) => mutateEvidence(bundle, (value) => (value.supported_degrees_of_freedom_max = 200)),
    ],
    ["scope", (bundle) => mutateEvidence(bundle, (value) => (value.scope = "protocol_support"))],
    [
      "commit",
      (bundle) => mutateEvidence(bundle, (value) => (value.generator_commit = "f".repeat(40))),
    ],
    ["undeclared key", (bundle) => mutateEvidence(bundle, (value) => (value.tolerance = 236))],
    [
      "transition adjacency",
      (bundle) =>
        mutateEvidence(bundle, (value) => {
          value.transitions[0].right.test_statistic_binary64_hex =
            value.transitions[0].left.test_statistic_binary64_hex;
        }),
    ],
    [
      "truth class",
      (bundle) =>
        mutateEvidence(
          bundle,
          (value) => (value.transitions[0].right.truth.projection_class = "rounded_one"),
        ),
    ],
    [
      "graph bits",
      (bundle) =>
        mutateEvidence(
          bundle,
          (value) => (value.transitions[0].right.graph.p_value_binary64_hex = "3ff0000000000000"),
        ),
    ],
    [
      "pointwise distance",
      (bundle) =>
        mutateEvidence(
          bundle,
          (value) => (value.transitions[0].right.graph_to_truth_ulp_distance += 1),
        ),
    ],
    [
      "aggregate maximum",
      (bundle) => mutateEvidence(bundle, (value) => (value.pointwise_maximum_observed_ulp += 1)),
    ],
    ["case order", (bundle) => mutateEvidence(bundle, (value) => value.transitions.reverse())],
    [
      "source forgery",
      (bundle) => {
        const sourcePath = path.join(bundle, "truth-boundary-candidate.json");
        const candidate = readJson(sourcePath);
        candidate.runtime_support_enabled = true;
        writeJson(sourcePath, candidate);
        const evidencePath = path.join(bundle, "truth-boundary-evidence.json");
        const evidence = readJson(evidencePath);
        evidence.source_hashes["truth-boundary-candidate.json"] = `sha256:${sha256(sourcePath)}`;
        writeJson(evidencePath, evidence);
        rebuildManifest(bundle);
      },
    ],
  ];

  const temporaryRoot = mkdtempSync(path.join(os.tmpdir(), "nomue-r2-truth-boundary-mutations-"));
  try {
    for (const [label, mutate] of probes) {
      const bundle = path.join(temporaryRoot, label.replaceAll(" ", "-"));
      cpSync(sourceBundle, bundle, { recursive: true });
      mutate(bundle);
      const errors = validatePairedTTruthBoundaryEvidenceBundle(bundle, expectedCommit);
      if (errors.length === 0) throw new Error(`${label}: mutation was accepted`);
    }
  } finally {
    rmSync(temporaryRoot, { recursive: true, force: true });
  }
  return probes.length;
}

const invokedPath = process.argv[1];
if (invokedPath !== undefined && path.resolve(invokedPath) === fileURLToPath(import.meta.url)) {
  const bundle = process.argv[2];
  const commit = process.argv[3];
  if (bundle === undefined || commit === undefined) {
    process.stderr.write("usage: probe-paired-t-truth-boundary-evidence <bundle> <commit>\n");
    process.exitCode = 2;
  } else {
    const count = runPairedTTruthBoundaryMutationProbes(path.resolve(bundle), commit);
    process.stdout.write(`paired-t truth-boundary evidence mutations rejected: ${count}\n`);
  }
}
