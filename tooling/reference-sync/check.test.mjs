import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import { checkReference } from "./check.mjs";

function setup(t) {
  const base = mkdtempSync(join(tmpdir(), "reference-sync-"));
  t.after(() => rmSync(base, { recursive: true, force: true }));
  const root = join(base, "consumer");
  const source = join(base, "source");
  const code = "reference/stats-kernel/src/kernel.ts";
  const adapter = "reference/verifier/src/resources.ts";
  const put = (dir, path, text) => {
    mkdirSync(dirname(join(dir, path)), { recursive: true });
    writeFileSync(join(dir, path), text);
  };
  put(root, code, "export const value = 1;\n");
  put(source, code, "export const value = 1;\n");
  put(root, adapter, "export const adapter = true;\n");
  // Minimal detached-checkout metadata; content is checked separately by hash.
  put(source, ".git/HEAD", "1".repeat(40) + "\n");
  const entry = (path) => ({
    path,
    sha256: createHash("sha256")
      .update(readFileSync(join(root, path)))
      .digest("hex"),
  });
  const pin = {
    schema_version: "reference-source-pin.v1",
    repository: "licklider-ai/nomue-verifier",
    commit: "1".repeat(40),
    files: [entry(code)],
    local_adapters: [entry(adapter)],
  };
  const save = () => put(root, "reference/SOURCE-PIN.json", JSON.stringify(pin));
  save();
  return { root, source, pin, save, put, code, adapter };
}

test("accepts the pinned upstream and detects a changed local calculator", (t) => {
  const x = setup(t);
  assert.equal(checkReference(x.root, x.source).mirrored_files, 1);
  x.put(x.root, x.code, "changed");
  assert.throws(() => checkReference(x.root), /local content mismatch/);
  checkReference(x.root, x.source, true);
  assert.equal(checkReference(x.root).mirrored_files, 1);
});

test("rejects stale upstream and changed upstream bytes", (t) => {
  const x = setup(t);
  const commit = x.pin.commit;
  x.pin.commit = "0".repeat(40);
  x.save();
  assert.throws(() => checkReference(x.root, x.source), /upstream commit mismatch/);
  x.pin.commit = commit;
  x.save();
  x.put(x.source, x.code, "changed");
  assert.throws(() => checkReference(x.root, x.source, true), /upstream content mismatch/);
  assert.equal(checkReference(x.root).mirrored_files, 1);
});

test("rejects added source, duplicate entries and path traversal", (t) => {
  const x = setup(t);
  x.put(x.root, "reference/spikes/unlisted.ts", "new source");
  assert.throws(() => checkReference(x.root), /inventory drift/);
  rmSync(join(x.root, "reference/spikes/unlisted.ts"));
  x.pin.files.push(x.pin.files[0]);
  x.save();
  assert.throws(() => checkReference(x.root), /duplicate source path/);
  x.pin.files.pop();
  x.pin.files[0].path = "../outside.ts";
  x.save();
  assert.throws(() => checkReference(x.root), /invalid file binding/);
});

test("sync never overwrites the local resource adapter", (t) => {
  const x = setup(t);
  x.put(x.root, x.adapter, "changed adapter");
  assert.throws(() => checkReference(x.root, x.source, true), /local content mismatch/);
  assert.equal(readFileSync(join(x.root, x.adapter), "utf8"), "changed adapter");
});
