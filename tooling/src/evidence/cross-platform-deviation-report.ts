/**
 * Consumes two or more platform-run exports (export-platform-run.ts) and
 * computes per-statistic deviations between them (Batch 2 U4, gate R1-04
 * cross-platform evidence, discussion item S1 input data - the tolerance
 * NUMBER is not decided here, only the raw deviations are collected).
 *
 * This repository's tooling runs on whatever single OS invokes it; it
 * cannot fabricate a second operating system's numbers. Real multi-OS
 * deviation data requires actually running export-platform-run.ts on
 * Linux, Windows, and macOS (for example via CI) and pointing this script
 * at the resulting files - see evidence/development/cross-platform-runs/README.md.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { loadJson, repoRoot } from "../lib/repo.js";

interface PlatformRunExport {
  schema: string;
  platform: { platform: string; os_release: string; node_version: string; arch: string };
  oracle_results: Record<string, Record<string, number>>;
  canonicalization_hashes: Record<string, string>;
}

interface NumericDeviation {
  dataset: string;
  quantity: string;
  a: number;
  b: number;
  absolute_difference: number;
  relative_difference: number;
}

interface HashMismatch {
  vector_id: string;
  a: string;
  b: string;
}

function relDiff(a: number, b: number): number {
  if (a === b) return 0;
  const denom = Math.max(Math.abs(a), Math.abs(b));
  return denom === 0 ? 0 : Math.abs(a - b) / denom;
}

function compareRuns(
  runA: { file: string; data: PlatformRunExport },
  runB: { file: string; data: PlatformRunExport },
): { numeric_deviations: NumericDeviation[]; hash_mismatches: HashMismatch[] } {
  const numericDeviations: NumericDeviation[] = [];
  for (const [dataset, quantities] of Object.entries(runA.data.oracle_results)) {
    const other = runB.data.oracle_results[dataset];
    if (other === undefined) continue;
    for (const [quantity, a] of Object.entries(quantities)) {
      const b = other[quantity];
      if (b === undefined) continue;
      numericDeviations.push({
        dataset,
        quantity,
        a,
        b,
        absolute_difference: Math.abs(a - b),
        relative_difference: relDiff(a, b),
      });
    }
  }

  const hashMismatches: HashMismatch[] = [];
  for (const [vectorId, a] of Object.entries(runA.data.canonicalization_hashes)) {
    const b = runB.data.canonicalization_hashes[vectorId];
    if (b !== undefined && b !== a) {
      hashMismatches.push({ vector_id: vectorId, a, b });
    }
  }

  return { numeric_deviations: numericDeviations, hash_mismatches: hashMismatches };
}

function main(): void {
  const dir = path.join(repoRoot, "evidence", "development", "cross-platform-runs");
  const files = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((f) => f.endsWith(".json") && f !== "deviation-report.json")
    : [];

  if (files.length < 2) {
    console.log(
      `cross-platform-deviation-report: only ${files.length} platform run export(s) found in ${path.relative(repoRoot, dir)} - need at least 2 to compare. This is expected in a single-OS environment; see this script's module comment.`,
    );
    const report = {
      schema: "nrs-cross-platform-deviation-report",
      schema_version: "0.1.0",
      status: "insufficient_runs",
      runs_found: files,
      note: "Real cross-platform deviation data requires export-platform-run.ts output from at least two different operating systems. Not fabricated here.",
    };
    fs.writeFileSync(
      path.join(dir, "deviation-report.json"),
      `${JSON.stringify(report, null, 2)}\n`,
      "utf8",
    );
    return;
  }

  const runs = files.map((file) => ({
    file,
    data: loadJson<PlatformRunExport>(path.join("evidence/development/cross-platform-runs", file)),
  }));

  const pairwise: Json[] = [];
  for (let i = 0; i < runs.length; i += 1) {
    for (let j = i + 1; j < runs.length; j += 1) {
      const a = runs[i]!;
      const b = runs[j]!;
      const { numeric_deviations, hash_mismatches } = compareRuns(a, b);
      const maxRel = numeric_deviations.reduce((m, d) => Math.max(m, d.relative_difference), 0);
      pairwise.push({
        platform_a: a.data.platform,
        platform_b: b.data.platform,
        max_relative_difference: maxRel,
        hash_mismatch_count: hash_mismatches.length,
        numeric_deviations,
        hash_mismatches,
      });
    }
  }

  const report = {
    schema: "nrs-cross-platform-deviation-report",
    schema_version: "0.1.0",
    status: runs.length < 3 ? "partial_platform_coverage" : "full_platform_coverage",
    platforms_compared: runs.map((r) => r.data.platform),
    note:
      runs.length < 3
        ? "Fewer than 3 platforms (Linux/Windows/macOS) compared; see README for what full coverage requires."
        : "All three target platforms compared.",
    pairwise_comparisons: pairwise,
  };

  fs.writeFileSync(
    path.join(dir, "deviation-report.json"),
    `${JSON.stringify(report, null, 2)}\n`,
    "utf8",
  );
  console.log(
    `cross-platform-deviation-report: wrote deviation-report.json comparing ${runs.length} platform run(s)`,
  );
}

type Json = Record<string, unknown>;

main();
