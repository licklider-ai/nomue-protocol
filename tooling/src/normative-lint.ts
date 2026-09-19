/**
 * Normative language lint over normative markdown: every paragraph using an
 * uppercase requirement keyword binds to exactly one Requirement ID anchor.
 *
 * Scope is spec/ and canonicalization/ - the two trees AUTHORITY.md names as
 * carrying normative clauses. Requirement traceability (tooling/src/validate.ts)
 * already scans both; this lint closes the other direction, so a MUST/SHOULD/MAY
 * paragraph in canonicalization/ cannot stay unbound to a Requirement ID.
 */

import { lintNormativeMarkdown } from "./lib/markdown.js";
import { markdownFiles, readText } from "./lib/repo.js";

const NORMATIVE_ROOTS = ["spec", "canonicalization"];

function main(): void {
  const issues = NORMATIVE_ROOTS.flatMap((root) =>
    markdownFiles(root).flatMap((rel) => lintNormativeMarkdown(readText(rel), rel)),
  );
  if (issues.length === 0) {
    console.log("normative-lint: OK");
    return;
  }
  console.error(`normative-lint: ${issues.length} issue(s)`);
  for (const issue of issues) {
    console.error(`  ${issue.file}:${issue.line} ${issue.message}`);
  }
  process.exitCode = 1;
}

main();
