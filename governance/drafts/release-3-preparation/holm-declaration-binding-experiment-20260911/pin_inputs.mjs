// Author maintenance only: regenerate after deliberate reviewed source changes.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
const HERE = path.dirname(fileURLToPath(import.meta.url)),
  ROOT = path.resolve(HERE, "../../../..");
const m = JSON.parse(fs.readFileSync(path.join(HERE, "INPUTS.json"), "utf8"));
const hash = (f) => crypto.createHash("sha256").update(fs.readFileSync(f)).digest("hex");
m.runtime = {};
for (const f of [
  "d0.mjs",
  "candidate.schema.json",
  "fixture-contracts.json",
  "candidate.py",
  "worker.py",
  "../../../../reference/verifier/src/strict-json.ts",
  "../../../../reference/verifier/src/jcs.ts",
  "../../../../pnpm-lock.yaml",
])
  m.runtime[f] = hash(path.resolve(HERE, f));
m.packages = {};
const req = createRequire(import.meta.url),
  ajv = req.resolve("ajv/dist/2020.js");
m.ajv_origin = path.relative(ROOT, fs.realpathSync(ajv));
const ajvReq = createRequire(ajv);
for (const name of [
  "ajv",
  "fast-deep-equal",
  "fast-uri",
  "json-schema-traverse",
  "require-from-string",
]) {
  let directory = path.dirname(fs.realpathSync(name === "ajv" ? ajv : ajvReq.resolve(name)));
  while (!fs.existsSync(path.join(directory, "package.json"))) directory = path.dirname(directory);
  function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const f = path.join(dir, e.name);
      if (e.isDirectory() && e.name !== "node_modules") walk(f);
      else if (e.isFile() && /\.(js|json)$/.test(e.name))
        m.packages[path.relative(ROOT, f)] = hash(f);
    }
  }
  walk(directory);
}
fs.writeFileSync(path.join(HERE, "INPUTS.json"), JSON.stringify(m, null, 2) + "\n");
console.log(
  "runtime pins",
  Object.keys(m.runtime).length,
  "package files",
  Object.keys(m.packages).length,
);
