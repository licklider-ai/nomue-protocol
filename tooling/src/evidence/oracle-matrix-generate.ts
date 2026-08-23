/**
 * Regenerate the captured oracle-matrix.json artifacts from the captured
 * python-output.json files plus a live kernel recomputation (Batch 2
 * addendum U8). Replaces the previously ad hoc, outside-the-repository
 * matrix production described in each oracle directory's commands.txt with
 * a checked-in, reproducible generator.
 *
 * Usage: tsx tooling/src/evidence/oracle-matrix-generate.ts
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { repoRoot } from "../lib/repo.js";
import { compareCorpus, type CorpusName } from "./oracle-comparisons.js";

const DESCRIPTIONS: Record<CorpusName, string> = {
  phase1:
    "Phase 1 differential comparison: reference kernel vs SciPy (ttest_ind equal_var=False) and mpmath (regularized incomplete beta, 60-digit unified precision - re-captured in Batch 2 addendum U8; the original capture used 50 digits). Not R1-08 closure evidence.",
  phase2a:
    "Phase 2A preliminary differential comparison: reference kernel vs SciPy (ttest_ind equal_var=False + t.ppf + confidence_interval) and mpmath (regularized incomplete beta CDF and findroot quantile at 60 digits). Not R1-08 closure evidence.",
  tail: "Tail-case corpus (Batch 2 addendum U8): extreme small-p Welch datasets (target magnitudes ~1e-8, ~1e-12, ~1e-19, and the underflow boundary) comparing the reference kernel's tail evaluation against mpmath at 60 digits. The TAIL_UNDERFLOW row intentionally exceeds every comparison tolerance: the kernel's p zeroes at the algorithm floor of the adopted tail-evaluation path (intermediate underflow in the incomplete-beta evaluation - the true value ~1.1e-308 is itself a representable binary64 subnormal, recorded as a decimal string). This is the observation, not a regression. Input for discussion item S1. Not R1-08 closure evidence.",
  floor:
    "Floor-map corpus (Batch 3 V2): target p magnitudes 1e-30 .. 1e-300 mapping where the adopted tail-evaluation path starts degrading (see evidence/development/oracle-floor-map/floor-map.md for the ordered degradation-onset view and the P_floor rule application). Record only, not gated on. Not R1-08 closure evidence.",
};

const OUT_PATHS: Record<CorpusName, string> = {
  phase1: "evidence/development/phase-1/oracle/oracle-matrix.json",
  phase2a: "evidence/development/phase-2a/oracle/oracle-matrix.json",
  tail: "evidence/development/oracle-tail-cases/oracle-matrix.json",
  floor: "evidence/development/oracle-floor-map/oracle-matrix.json",
};

for (const corpus of ["phase1", "phase2a", "tail", "floor"] as const) {
  const result = compareCorpus(corpus);
  const doc = {
    description: DESCRIPTIONS[corpus],
    oracles: {
      scipy: "1.17.1",
      mpmath: "1.4.1 (60 decimal digits)",
      r: "unavailable in the development environment",
    },
    tolerances_reference:
      "canonicalization/numerical-comparison.md (p-value: abs 1e-12 / rel 1e-10; others abs/rel 1e-12); the tail corpus is recorded against these bounds but not gated on them",
    generated_by: "tooling/src/evidence/oracle-matrix-generate.ts",
    captured_from: result.captured_from,
    max_rel_diff: result.max_rel_diff,
    datasets: result.datasets,
  };
  const outAbs = path.join(repoRoot, OUT_PATHS[corpus]);
  fs.mkdirSync(path.dirname(outAbs), { recursive: true });
  fs.writeFileSync(outAbs, `${JSON.stringify(doc, null, 2)}\n`, "utf8");
  console.log(
    `oracle-matrix-generate: ${corpus} -> ${OUT_PATHS[corpus]} (max rel_diff ${result.max_rel_diff.toExponential(2)})`,
  );
}
