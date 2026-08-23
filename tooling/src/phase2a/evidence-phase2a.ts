/**
 * CLI: regenerate the deterministic Phase 2A development-evidence files
 * (evidence/development/phase-2a/*.json). With --check, compare instead of
 * writing and fail on drift.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { absPath } from "../lib/repo.js";
import { buildPhase2aEvidence } from "./evidence-2a.js";

const checkMode = process.argv.includes("--check");
const files = buildPhase2aEvidence();
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
    console.error("evidence:phase2a --check: drift detected -\n  " + drift.join("\n  "));
    console.error("Run `pnpm evidence:phase2a` and commit the result.");
    process.exitCode = 1;
  } else {
    console.log(`evidence:phase2a --check: OK (${files.size} files match)`);
  }
} else {
  console.log(`evidence:phase2a: done (${files.size} files)`);
}
