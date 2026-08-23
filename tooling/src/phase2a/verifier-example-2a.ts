/**
 * CLI: verify the Phase 2A example Record end to end and compare the report
 * (ignoring generated_at and verifier.source_commit), the canonical content,
 * and the pinned hashes.
 */

import { createHash } from "node:crypto";
import { canonicalProjection } from "../../../reference/verifier/src/digest.js";
import { verifyRecordText } from "../../../reference/verifier/src/verify.js";
import { readText } from "../lib/repo.js";

const DIR = "examples/itgc-guarantee-0.2";
const failures: string[] = [];

const recordText = readText(`${DIR}/record.json`);
const outcome = verifyRecordText(recordText);
if (outcome.exitCode !== 0 || outcome.report === undefined) {
  failures.push(`example record did not verify cleanly (exit ${outcome.exitCode})`);
} else {
  const normalize = (report: unknown): unknown => {
    const clone = JSON.parse(JSON.stringify(report)) as Record<string, unknown>;
    clone["generated_at"] = null;
    (clone["verifier"] as Record<string, unknown>)["source_commit"] = null;
    return clone;
  };
  const expected = JSON.parse(readText(`${DIR}/expected-verification.json`));
  if (JSON.stringify(normalize(outcome.report)) !== JSON.stringify(normalize(expected))) {
    failures.push("verification report differs from expected-verification.json");
  }
  const boundary = outcome.report.guarantee_boundary as unknown as Record<string, string>;
  for (const key of [
    "scientific_validity",
    "declaration_truth",
    "distributional_model_validity",
    "causal_interpretation",
    "standardized_effect_size",
  ]) {
    if (boundary[key] !== "not_asserted") {
      failures.push(`guarantee_boundary.${key} is not not_asserted`);
    }
  }

  const canonical = canonicalProjection(JSON.parse(recordText) as Record<string, unknown>);
  const expectedCanonical = readText(`${DIR}/canonical-content.json`);
  if (canonical !== expectedCanonical.replace(/\r\n/g, "\n")) {
    failures.push("canonical content differs from canonical-content.json");
  }

  for (const line of readText(`${DIR}/hashes.sha256`)
    .split("\n")
    .filter((l) => l.trim() !== "")) {
    const [hash, name] = line.split(/\s+/);
    if (hash === undefined || name === undefined) continue;
    const content = readText(`${DIR}/${name}`).replace(/\r\n/g, "\n");
    const actual = createHash("sha256").update(content, "utf8").digest("hex");
    if (actual !== hash) failures.push(`${name}: hash mismatch`);
  }
}

if (failures.length === 0) {
  console.log(
    "verifier:example:phase2a: OK (example verifies; report, canonical content, hashes, and non-claims match)",
  );
} else {
  console.error(`verifier:example:phase2a: ${failures.length} failure(s)`);
  for (const failure of failures) console.error("  " + failure);
  process.exitCode = 1;
}
