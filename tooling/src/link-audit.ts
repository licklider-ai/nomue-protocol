/**
 * Link audit over all markdown files: relative links resolve inside the
 * repository and NRS anchor fragments resolve to real anchors. External URIs
 * are never fetched.
 */

import { auditMarkdownLinks } from "./lib/links.js";
import { exists, formatIssue, readText, walkFiles } from "./lib/repo.js";

function main(): void {
  const files = new Map(
    walkFiles(".")
      .filter((f) => !f.isSymlink && f.rel.endsWith(".md"))
      .map((f) => [f.rel, readText(f.rel)] as const),
  );
  const issues = auditMarkdownLinks(files, {
    exists,
    content: (rel) => files.get(rel),
  });
  if (issues.length === 0) {
    console.log(`link-audit: OK (${files.size} markdown files)`);
    return;
  }
  console.error(`link-audit: ${issues.length} issue(s)`);
  for (const issue of issues) console.error("  " + formatIssue(issue));
  process.exitCode = 1;
}

main();
