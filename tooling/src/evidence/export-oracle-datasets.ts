/**
 * Export every oracle dataset (Phase 1, Phase 2A, tail-case corpus) as one
 * JSON document for the Python oracle capture script
 * (tooling/oracle-capture/capture_oracle.py), so the TypeScript dataset
 * modules stay the single source and the Python side never hard-codes data.
 *
 * Usage: tsx tooling/src/evidence/export-oracle-datasets.ts <out-path>
 */

import * as fs from "node:fs";
import {
  FLOOR_ORACLE_DATASETS,
  PHASE1_ORACLE_DATASETS,
  TAIL_ORACLE_DATASETS,
} from "../phase1/oracle-datasets.js";
import { ORACLE_DATASETS } from "../phase2a/datasets.js";

const outPath = process.argv[2];
if (outPath === undefined) {
  console.error("usage: export-oracle-datasets.ts <out-path>");
  process.exit(1);
}

const doc = {
  description:
    "Oracle dataset export for capture_oracle.py; source of truth is tooling/src/phase1/oracle-datasets.ts and tooling/src/phase2a/datasets.ts.",
  corpora: {
    phase1: PHASE1_ORACLE_DATASETS,
    phase2a: ORACLE_DATASETS,
    tail: TAIL_ORACLE_DATASETS,
    floor: FLOOR_ORACLE_DATASETS,
  },
};

fs.writeFileSync(outPath, `${JSON.stringify(doc, null, 2)}\n`, "utf8");
console.log(`export-oracle-datasets: wrote ${outPath}`);
