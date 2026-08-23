/** CLI: regenerate only the TypeScript bindings from the Phase 1 schemas. */

import * as fs from "node:fs";
import * as path from "node:path";
import { absPath } from "../lib/repo.js";
import { buildTypescriptBindings } from "./bindings.js";

const bindings = await buildTypescriptBindings();
for (const [rel, content] of bindings) {
  const abs = absPath(rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content, "utf8");
  console.log(`generated ${rel}`);
}
console.log("schema:generate-types: done.");
