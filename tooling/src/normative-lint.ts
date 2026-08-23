/**
 * Normative language lint over spec markdown: every paragraph using an
 * uppercase requirement keyword binds to exactly one Requirement ID anchor.
 */

import { lintNormativeMarkdown } from "./lib/markdown.js";
import { markdownFiles, readText } from "./lib/repo.js";

function main(): void {
  const issues = markdownFiles("spec").flatMap((rel) => lintNormativeMarkdown(readText(rel), rel));
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
