/**
 * Exports this environment's computed numeric results for the oracle
 * comparison datasets and the canonicalization test vectors, tagged with
 * platform identity, so a run from a different OS can be diffed against it
 * (Batch 2 U4, gate R1-04 cross-platform evidence input).
 *
 * This is the export half only. cross-platform-deviation-report.ts
 * consumes two or more of these exports and computes per-statistic
 * deviations; it does not itself run on multiple operating systems (see
 * that script's own module comment for why this repository's tooling
 * cannot fabricate a second OS's numbers).
 */

import { createHash } from "node:crypto";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { welchTwoSampleTTestWithCi } from "../../../reference/stats-kernel/src/kernel.js";
import { jcsCanonicalize } from "../../../reference/verifier/src/jcs.js";
import { loadJson, loadYaml, repoRoot } from "../lib/repo.js";
import { ORACLE_DATASETS } from "../phase2a/datasets.js";

interface Json {
  [key: string]: unknown;
}

interface CanonicalizationVector {
  vector_id: string;
  kind: string;
  input?: string;
}

function exportOracleResults(): Record<string, Json> {
  const results: Record<string, Json> = {};
  for (const [name, data] of Object.entries(ORACLE_DATASETS)) {
    const r = welchTwoSampleTTestWithCi(
      { group_id: "g1", values: data.groupA },
      { group_id: "g2", values: data.groupB },
      0.95,
    );
    results[name] = {
      standard_error: r.standard_error,
      test_statistic: r.test_statistic,
      degrees_of_freedom: r.degrees_of_freedom,
      p_value: r.p_value,
      critical_value: r.confidence_interval.critical_value,
      ci_lower: r.confidence_interval.lower,
      ci_upper: r.confidence_interval.upper,
    };
  }
  return results;
}

function exportCanonicalizationHashes(): Record<string, string> {
  const manifest = loadYaml<{ vectors: CanonicalizationVector[] }>(
    "canonicalization/test-vectors/manifest.yaml",
  );
  const hashes: Record<string, string> = {};
  for (const vector of manifest.vectors) {
    if (vector.kind !== "canonical" || vector.input === undefined) continue;
    try {
      const inputValue = loadJson<unknown>(
        path.join("canonicalization/test-vectors", vector.input),
      );
      const canonical = jcsCanonicalize(inputValue);
      hashes[vector.vector_id] =
        `sha256:${createHash("sha256").update(canonical, "utf8").digest("hex")}`;
    } catch (err) {
      hashes[vector.vector_id] =
        `canonicalization_error: ${err instanceof Error ? err.message : String(err)}`;
    }
  }
  return hashes;
}

function main(): void {
  const platformTag = `${process.platform}-${os.release().replace(/[^a-zA-Z0-9.]/g, "_")}`;
  const record = {
    schema: "nrs-platform-run-export",
    schema_version: "0.1.0",
    platform: {
      platform: process.platform,
      os_release: os.release(),
      node_version: process.version,
      arch: process.arch,
    },
    oracle_results: exportOracleResults(),
    canonicalization_hashes: exportCanonicalizationHashes(),
  };

  const dir = path.join(repoRoot, "evidence", "development", "cross-platform-runs");
  fs.mkdirSync(dir, { recursive: true });
  const outPath = path.join(dir, `${platformTag}.json`);
  fs.writeFileSync(outPath, `${JSON.stringify(record, null, 2)}\n`, "utf8");
  console.log(`export-platform-run: wrote ${path.relative(repoRoot, outPath)}`);
}

main();
