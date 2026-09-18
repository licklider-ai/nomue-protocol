import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { checkPinnedBytes } from "./pinned-contribution-source.mjs";

const current = readFileSync(new URL("../../AGENTS.md", import.meta.url));
const pin = {
  path: "AGENTS.md",
  sha256: "059d84ddbd634f42178810a53d9db1e9886a8a07ae15d5269b6090191dca68ed",
};

test("accepts exactly the approved instructions while retaining historical instructions", () => {
  checkPinnedBytes(current, pin);
});
test("rejects changes to either old instructions or the approved append", () => {
  const oldChanged = Buffer.from(current);
  oldChanged[0] ^= 1;
  assert.throws(() => checkPinnedBytes(oldChanged, pin));
  assert.throws(() => checkPinnedBytes(Buffer.concat([current, Buffer.from("extra")]), pin));
  const marker = current.indexOf(
    Buffer.from("\n## Publication boundary and implementation ownership\n"),
  );
  assert.throws(() => checkPinnedBytes(current.subarray(0, marker), pin));
});
test("never exempts another source or an unknown historical pin", () => {
  assert.throws(() => checkPinnedBytes(current, { ...pin, path: "src/runtime.ts" }));
  assert.throws(() => checkPinnedBytes(current, { ...pin, sha256: "0".repeat(64) }));
  const bytes = Buffer.from("unchanged runtime");
  const runtime = {
    path: "src/runtime.ts",
    sha256: createHash("sha256").update(bytes).digest("hex"),
  };
  checkPinnedBytes(bytes, runtime);
  assert.throws(() => checkPinnedBytes(Buffer.from("changed runtime"), runtime));
});

test("binds the self-pinned checker's exact delegation change only", () => {
  const path =
    "governance/drafts/release-3-preparation/holm-adoption-map-repair-20260911/check.mjs";
  const bytes = readFileSync(new URL("../../" + path, import.meta.url));
  const sourcePin = {
    path,
    sha256: "a68d1e995e07c99fb7c7eadd32f661ec21ce1079a2485578b4d0fa331692dfd5",
  };
  checkPinnedBytes(bytes, sourcePin);
  assert.throws(() => checkPinnedBytes(Buffer.concat([bytes, Buffer.from("extra")]), sourcePin));
});
