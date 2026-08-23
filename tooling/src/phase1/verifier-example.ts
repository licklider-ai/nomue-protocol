/**
 * CLI: verify the informative example Record end to end and compare the
 * produced report with examples/minimal-itgc-record/expected-verification.json
 * (ignoring generated_at and verifier.source_commit, which are excluded from
 * the semantic projection), plus the canonical content and pinned hashes.
 */

import { createHash } from "node:crypto";
import { canonicalProjection } from "../../../reference/verifier/src/digest.js";
import { verifyRecordText } from "../../../reference/verifier/src/verify.js";
import { readText } from "../lib/repo.js";

const failures: string[] = [];

const recordText = readText("examples/minimal-itgc-record/record.json");
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
  const expected = JSON.parse(readText("examples/minimal-itgc-record/expected-verification.json"));
  if (JSON.stringify(normalize(outcome.report)) !== JSON.stringify(normalize(expected))) {
    failures.push("verification report differs from expected-verification.json");
  }

  const canonical = canonicalProjection(JSON.parse(recordText) as Record<string, unknown>);
  const expectedCanonical = readText("examples/minimal-itgc-record/canonical-content.json");
  if (canonical !== expectedCanonical.replace(/\r\n/g, "\n")) {
    failures.push("canonical content differs from canonical-content.json");
  }

  for (const line of readText("examples/minimal-itgc-record/hashes.sha256")
    .split("\n")
    .filter((l) => l.trim() !== "")) {
    const [hash, name] = line.split(/\s+/);
    if (hash === undefined || name === undefined) continue;
    const content = readText(`examples/minimal-itgc-record/${name}`).replace(/\r\n/g, "\n");
    const actual = createHash("sha256").update(content, "utf8").digest("hex");
    if (actual !== hash) failures.push(`${name}: hash mismatch`);
  }
}

if (failures.length === 0) {
  console.log(
    "verifier:example: OK (example record verifies; report, canonical content, and hashes match)",
  );
} else {
  console.error(`verifier:example: ${failures.length} failure(s)`);
  for (const failure of failures) console.error("  " + failure);
  process.exitCode = 1;
}
