/**
 * Runtime environment report (Batch 2 addendum U4): logs process.versions,
 * process.arch, and OS identity to stdout and writes them as JSON, so every
 * CI job can archive exactly which Node/V8 build and CPU architecture
 * produced its results. Cheap by design - run it as the first step of every
 * job and upload the file as a build artifact.
 *
 * Usage: tsx tooling/src/evidence/env-report.ts [out-path]   (default env-report.json)
 */

import * as fs from "node:fs";
import * as os from "node:os";

const report = {
  schema: "nrs-env-report",
  schema_version: "0.1.0",
  platform: process.platform,
  arch: process.arch,
  os_release: os.release(),
  node: process.version,
  versions: process.versions,
};

const outPath = process.argv[2] ?? "env-report.json";
fs.writeFileSync(outPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify(report, null, 2));
console.log(`env-report: wrote ${outPath}`);
