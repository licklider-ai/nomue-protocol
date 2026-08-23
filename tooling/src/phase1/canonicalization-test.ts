/** CLI: run the canonicalization and digest test vectors. */

import { formatIssue, loadYaml } from "../lib/repo.js";
import { runCanonicalizationVectors } from "./vectors.js";

const issues = runCanonicalizationVectors();
if (issues.length === 0) {
  const manifest = loadYaml<{ vectors: unknown[] }>("canonicalization/test-vectors/manifest.yaml");
  console.log(
    `canonicalization:test: OK (${manifest.vectors.length} vectors, differential against independent JCS implementation)`,
  );
} else {
  console.error(`canonicalization:test: ${issues.length} issue(s)`);
  for (const issue of issues) console.error("  " + formatIssue(issue));
  process.exitCode = 1;
}
