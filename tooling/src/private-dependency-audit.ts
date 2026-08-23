/**
 * Private-dependency audit CLI: fails on any mechanically detectable
 * dependency on private repositories, foreign authority identifiers,
 * machine-local absolute paths, out-of-repository symlinks or imports, and
 * local/private package specifiers.
 */

import { runPrivateDependencyAudit } from "./lib/private-audit.js";
import { formatIssue } from "./lib/repo.js";

function main(): void {
  const issues = runPrivateDependencyAudit();
  if (issues.length === 0) {
    console.log("private-dependency-audit: OK - repository is self-contained.");
    return;
  }
  console.error(`private-dependency-audit: ${issues.length} issue(s)`);
  for (const issue of issues) console.error("  " + formatIssue(issue));
  process.exitCode = 1;
}

main();
