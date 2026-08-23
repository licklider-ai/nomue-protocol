/**
 * CLI: replay conformance fixtures against the reference verifier.
 * Options: --include <prefix> / --exclude <prefix> filter by fixture id
 * (used by pnpm conformance:phase2a, regression:phase1, refusal:test).
 */

import { formatIssue } from "../lib/repo.js";
import { runConformanceSuite, type ConformanceFilter } from "./conformance.js";

const args = process.argv.slice(2);
const filter: ConformanceFilter = {};
for (let i = 0; i < args.length; i += 1) {
  if (args[i] === "--include" && args[i + 1] !== undefined) {
    filter.includePrefix = args[i + 1] as string;
    i += 1;
  } else if (args[i] === "--exclude" && args[i + 1] !== undefined) {
    filter.excludePrefix = args[i + 1] as string;
    i += 1;
  }
}

const label =
  filter.includePrefix !== undefined
    ? ` (include ${filter.includePrefix}*)`
    : filter.excludePrefix !== undefined
      ? ` (exclude ${filter.excludePrefix}*)`
      : "";

const { issues, executed } = runConformanceSuite(filter);
if (issues.length === 0) {
  console.log(
    `conformance:test${label}: OK (${executed} fixtures match their pinned expectations)`,
  );
} else {
  console.error(`conformance:test${label}: ${issues.length} issue(s) across ${executed} fixtures`);
  for (const issue of issues) console.error("  " + formatIssue(issue));
  process.exitCode = 1;
}
