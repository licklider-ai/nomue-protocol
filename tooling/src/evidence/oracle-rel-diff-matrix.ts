/**
 * Per-environment kernel-vs-oracle rel_diff matrix (Batch 2 addendum U4).
 *
 * Recomputes the reference kernel live in THIS environment over every
 * oracle dataset (Phase 1, Phase 2A, tail corpus) and records the relative
 * difference against the captured SciPy/mpmath oracle values, tagged with
 * the environment identity (platform, arch, Node/V8 versions). Run on each
 * CI runner and uploaded as a build artifact, two or more of these files
 * let oracle-rel-diff-compare.ts pinpoint WHICH quantity diverged when a
 * cross-platform pin mismatch appears, instead of only that something did.
 *
 * Usage:
 *   tsx tooling/src/evidence/oracle-rel-diff-matrix.ts [out-path]
 * Default out-path:
 *   evidence/development/oracle-rel-diff/oracle-rel-diff-<platform>-<arch>.json
 */

import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { repoRoot } from "../lib/repo.js";
import { compareCorpus } from "./oracle-comparisons.js";

const environment = {
  platform: process.platform,
  arch: process.arch,
  os_release: os.release(),
  node: process.version,
  versions: process.versions,
};

const corpora = (["phase1", "phase2a", "tail", "floor"] as const).map((c) => compareCorpus(c));

const doc = {
  schema: "nrs-oracle-rel-diff-matrix",
  schema_version: "0.1.0",
  environment,
  max_rel_diff: Math.max(...corpora.map((c) => c.max_rel_diff)),
  corpora: Object.fromEntries(corpora.map((c) => [c.corpus, c])),
};

const outRel =
  process.argv[2] ??
  path.join(
    "evidence",
    "development",
    "oracle-rel-diff",
    `oracle-rel-diff-${process.platform}-${process.arch}.json`,
  );
const outAbs = path.isAbsolute(outRel) ? outRel : path.join(repoRoot, outRel);
fs.mkdirSync(path.dirname(outAbs), { recursive: true });
fs.writeFileSync(outAbs, `${JSON.stringify(doc, null, 2)}\n`, "utf8");
console.log(
  `oracle-rel-diff-matrix: ${process.platform}-${process.arch} node ${process.version} -> ${outRel} (max rel_diff ${doc.max_rel_diff.toExponential(2)})`,
);
