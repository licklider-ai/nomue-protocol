/**
 * Cross-environment post-process for oracle rel_diff matrices (Batch 2
 * addendum U4). Given two or more oracle-rel-diff-*.json files (produced by
 * oracle-rel-diff-matrix.ts on different runners and downloaded as CI
 * artifacts), compares the KERNEL values quantity by quantity and reports
 * exactly which dataset/quantity pairs differ between environments - the
 * diagnostic a bare "pin mismatch" cross-platform failure does not give.
 *
 * Exit code 0 when every kernel value is bit-identical across all inputs;
 * exit code 1 when any quantity differs (each difference is listed).
 *
 * Usage:
 *   tsx tooling/src/evidence/oracle-rel-diff-compare.ts a.json b.json [more...]
 */

import * as fs from "node:fs";
import { relDiff } from "./oracle-comparisons.js";

interface MatrixFile {
  environment: { platform: string; arch: string; node: string };
  corpora: Record<
    string,
    { datasets: Record<string, { comparisons: Record<string, { kernel: number }> }> }
  >;
}

const paths = process.argv.slice(2);
if (paths.length < 2) {
  console.error("usage: oracle-rel-diff-compare.ts <matrix.json> <matrix.json> [more...]");
  process.exit(2);
}

const files = paths.map((p) => ({
  path: p,
  doc: JSON.parse(fs.readFileSync(p, "utf8")) as MatrixFile,
}));

const label = (f: (typeof files)[number]): string =>
  `${f.doc.environment.platform}-${f.doc.environment.arch}-node${f.doc.environment.node}`;

const [base, ...rest] = files as [(typeof files)[number], ...typeof files];
let differences = 0;

for (const other of rest) {
  for (const [corpusName, corpus] of Object.entries(base.doc.corpora)) {
    const otherCorpus = other.doc.corpora[corpusName];
    if (otherCorpus === undefined) {
      console.error(`${label(other)}: corpus ${corpusName} missing`);
      differences += 1;
      continue;
    }
    for (const [datasetName, dataset] of Object.entries(corpus.datasets)) {
      const otherDataset = otherCorpus.datasets[datasetName];
      if (otherDataset === undefined) {
        console.error(`${label(other)}: ${corpusName}/${datasetName} missing`);
        differences += 1;
        continue;
      }
      for (const [quantity, comparison] of Object.entries(dataset.comparisons)) {
        const otherComparison = otherDataset.comparisons[quantity];
        if (otherComparison === undefined) {
          console.error(`${label(other)}: ${corpusName}/${datasetName}/${quantity} missing`);
          differences += 1;
          continue;
        }
        if (!Object.is(comparison.kernel, otherComparison.kernel)) {
          differences += 1;
          console.error(
            `DIFF ${corpusName}/${datasetName}/${quantity}: ` +
              `${label(base)}=${comparison.kernel} ${label(other)}=${otherComparison.kernel} ` +
              `(rel_diff ${relDiff(comparison.kernel, otherComparison.kernel).toExponential(3)})`,
          );
        }
      }
    }
  }
}

if (differences === 0) {
  console.log(
    `oracle-rel-diff-compare: kernel outputs bit-identical across ${files.length} environments (${files.map(label).join(", ")})`,
  );
} else {
  console.error(`oracle-rel-diff-compare: ${differences} differing quantity value(s) - see above`);
  process.exitCode = 1;
}
