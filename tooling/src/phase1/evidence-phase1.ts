/**
 * CLI: regenerate the deterministic Phase 1 development-evidence files
 * (evidence/development/phase-1/*.json). With --check, compare instead of
 * writing and fail on drift. oracle/, runs/, and reviews/ are captured
 * artifacts outside the regeneration set.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { absPath } from "../lib/repo.js";
import { buildPhase1Evidence } from "./evidence.js";

const checkMode = process.argv.includes("--check");
const files = buildPhase1Evidence();
const drift: string[] = [];

for (const [rel, content] of files) {
  const abs = absPath(rel);
  const current = fs.existsSync(abs)
    ? fs.readFileSync(abs, "utf8").replace(/\r\n/g, "\n")
    : undefined;
  if (current === content) continue;
  if (checkMode) {
    drift.push(current === undefined ? `${rel} (missing)` : `${rel} (stale)`);
  } else {
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, content, "utf8");
    console.log(`evidence: wrote ${rel}`);
  }
}

if (checkMode) {
  if (drift.length > 0) {
    console.error("evidence:phase1 --check: drift detected -\n  " + drift.join("\n  "));
    console.error("Run `pnpm evidence:phase1` and commit the result.");
    process.exitCode = 1;
  } else {
    console.log(`evidence:phase1 --check: OK (${files.size} files match)`);
  }
} else {
  console.log(`evidence:phase1: done (${files.size} files)`);
}
