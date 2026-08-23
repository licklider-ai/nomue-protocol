/**
 * Regenerates the non-authoritative artifacts: the views under generated/
 * and the TypeScript bindings under bindings/typescript/generated/. With
 * --check, compares instead of writing and fails on drift.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { loadViewSources } from "./lib/load.js";
import { absPath, walkFiles } from "./lib/repo.js";
import { buildGeneratedViews } from "./lib/views.js";
import { buildTypescriptBindings } from "./phase1/bindings.js";

const normalize = (text: string): string => text.replace(/\r\n/g, "\n");

async function main(): Promise<void> {
  const checkMode = process.argv.includes("--check");
  const outputs = new Map<string, string>([
    ...buildGeneratedViews(loadViewSources()),
    ...(await buildTypescriptBindings()),
  ]);

  const onDisk = new Set(
    ["generated", "bindings/typescript/generated"].flatMap((root) =>
      walkFiles(root)
        .filter((f) => !f.isSymlink)
        .map((f) => f.rel),
    ),
  );

  const drift: string[] = [];

  for (const [rel, content] of outputs) {
    const abs = absPath(rel);
    const current = fs.existsSync(abs) ? normalize(fs.readFileSync(abs, "utf8")) : undefined;
    if (current === normalize(content)) continue;
    if (checkMode) {
      drift.push(current === undefined ? `${rel} (missing)` : `${rel} (stale)`);
    } else {
      fs.mkdirSync(path.dirname(abs), { recursive: true });
      fs.writeFileSync(abs, content, "utf8");
      console.log(`generated ${rel}`);
    }
  }

  for (const rel of onDisk) {
    if (outputs.has(rel)) continue;
    if (checkMode) {
      drift.push(`${rel} (unexpected file in a generated root)`);
    } else {
      fs.rmSync(absPath(rel));
      console.log(`removed stray ${rel}`);
    }
  }

  if (checkMode) {
    if (drift.length > 0) {
      console.error("check:generated: drift detected -\n  " + drift.join("\n  "));
      console.error("Run `pnpm generate` and commit the result.");
      process.exitCode = 1;
    } else {
      console.log(`check:generated: OK (${outputs.size} generated files match their sources).`);
    }
  } else {
    console.log("generate: done.");
  }
}

await main();
