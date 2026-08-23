/** CLI: compile the Phase 1 schemas ($id uniqueness, reference resolution). */

import { formatIssue } from "../lib/repo.js";
import { compilePhase1Schemas } from "./schemas.js";

const { issues, byId } = compilePhase1Schemas();
if (issues.length === 0) {
  console.log(`schema:validate: OK (${byId.size} schemas compiled, all references resolved)`);
} else {
  console.error(`schema:validate: ${issues.length} issue(s)`);
  for (const issue of issues) console.error("  " + formatIssue(issue));
  process.exitCode = 1;
}
