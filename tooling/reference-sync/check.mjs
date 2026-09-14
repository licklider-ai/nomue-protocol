import { createHash } from "node:crypto";
import { lstatSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const digest = (bytes) => createHash("sha256").update(bytes).digest("hex");
const fail = (message) => {
  throw new Error(message);
};
const safePath = (value) =>
  typeof value === "string" &&
  /^reference\/(?:verifier\/src|stats-kernel\/src|spikes)\/[a-z0-9-]+\.ts$/.test(value);

function detachedHead(root) {
  let gitDir = join(root, ".git");
  if (lstatSync(gitDir).isFile()) {
    const pointer = readFileSync(gitDir, "utf8").trim();
    if (!pointer.startsWith("gitdir: ")) fail("invalid worktree metadata");
    gitDir = resolve(root, pointer.slice(8));
  }
  const head = readFileSync(join(gitDir, "HEAD"), "utf8").trim();
  if (!/^[0-9a-f]{40}$/.test(head)) fail("upstream requires a detached commit checkout");
  return head;
}

function readRegular(root, relativePath) {
  let current = root;
  for (const part of relativePath.split("/")) {
    current = join(current, part);
    if (lstatSync(current).isSymbolicLink()) fail(`symlink is not a source file: ${relativePath}`);
  }
  if (!lstatSync(current).isFile()) fail(`not a regular file: ${relativePath}`);
  return readFileSync(current);
}

function sourceFiles(root, relativePath = "reference") {
  const files = [];
  for (const entry of readdirSync(join(root, relativePath), { withFileTypes: true })) {
    const path = `${relativePath}/${entry.name}`;
    if (entry.isSymbolicLink()) fail(`symlink in reference tree: ${path}`);
    if (entry.isDirectory()) files.push(...sourceFiles(root, path));
    else if (entry.name.endsWith(".ts")) files.push(path);
  }
  return files.sort();
}

export function checkReference(root, sourceRoot = null, sync = false) {
  const pin = JSON.parse(readRegular(root, "reference/SOURCE-PIN.json"));
  if (
    pin.schema_version !== "reference-source-pin.v1" ||
    pin.repository !== "licklider-ai/nomue-verifier" ||
    !/^[0-9a-f]{40}$/.test(pin.commit)
  )
    fail("invalid source identity");
  if (
    !Array.isArray(pin.files) ||
    pin.files.length === 0 ||
    !Array.isArray(pin.local_adapters) ||
    pin.local_adapters.length !== 1 ||
    pin.local_adapters[0]?.path !== "reference/verifier/src/resources.ts"
  ) {
    fail("invalid source inventory");
  }
  const all = [...pin.files, ...pin.local_adapters];
  for (const item of all) {
    if (!safePath(item.path) || !/^[0-9a-f]{64}$/.test(item.sha256)) fail("invalid file binding");
  }
  const expected = all.map((item) => item.path).sort();
  if (new Set(expected).size !== expected.length) fail("duplicate source path");
  if (JSON.stringify(sourceFiles(root)) !== JSON.stringify(expected))
    fail("reference inventory drift");
  if (sync && !sourceRoot) fail("sync requires the pinned upstream checkout");
  const upstream = new Map();
  if (sourceRoot) {
    const commit = detachedHead(sourceRoot);
    if (commit !== pin.commit) fail("upstream commit mismatch");
    for (const item of pin.files) {
      const bytes = readRegular(sourceRoot, item.path);
      if (digest(bytes) !== item.sha256) fail(`upstream content mismatch: ${item.path}`);
      upstream.set(item.path, bytes);
    }
  }
  // Validate every source and local adapter before overwriting any consumer file.
  for (const item of all) {
    const bytes = readRegular(root, item.path);
    const isCopy = upstream.has(item.path);
    if (digest(bytes) !== item.sha256 && !(sync && isCopy))
      fail(`local content mismatch: ${item.path}`);
  }
  if (sync) {
    for (const [path, bytes] of upstream) writeFileSync(join(root, path), bytes);
  }
  return {
    source_commit: pin.commit,
    mirrored_files: pin.files.length,
    local_adapters: pin.local_adapters.length,
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
  const args = process.argv.slice(2);
  try {
    if (
      args.length !== 0 &&
      args[0] !== "--check" &&
      args[0] !== "--source" &&
      args[0] !== "--sync"
    )
      fail("unknown option");
    if (args[0] === "--source" || args[0] === "--sync" ? args.length !== 2 : args.length > 1)
      fail("invalid arguments");
    console.log(
      JSON.stringify(checkReference(root, args[1] ? resolve(args[1]) : null, args[0] === "--sync")),
    );
  } catch (error) {
    console.error(`reference source check failed: ${error.message}`);
    process.exitCode = 1;
  }
}
