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

test("accepts only the exact maintained revisions after the repository audit", () => {
  const transitions = [
    ["AUTHORITY.md", "2c7c4dd35fc86a2a87354ca40ea0ca08834998d1136d7b65de9850c007cf6ea3"],
    [
      "authority/authority-manifest.yaml",
      "c4d103fda174ffdf8e6a54674f79573629a6628295d09b64144c54b7a1844d74",
    ],
    [
      "conformance/expectations/phase-2a-021-expectations.yaml",
      "8f4afd6ccecb69466229b87f90e15032e9adb54a357507da1e15ab02342ca66f",
    ],
    [
      "conformance/manifest.yaml",
      "4a009d86e1616be99fdcd15712818536507ed4c53af1c01f8bba309d97d408f3",
    ],
    [
      "governance/drafts/release-3-preparation/holm-repaired-candidate-20260911/RESULTS.json",
      "1a8800e50746923e893c07a2a5944133cc89ad370209cdc799b0d3a154926089",
    ],
    [
      "tooling/src/lib/checks.ts",
      "8dd56d269d62310c3c2adbf0dcd1157c0c7769dc2e97aef2d6a4a33250ce8db5",
    ],
    [
      "tooling/src/normative-lint.ts",
      "329e75bcb084954711c9c9705b402c3034a2550edc31a27f6ad5823fb0a8653b",
    ],
    [
      "tooling/src/phase2a/author-fixtures-021.ts",
      "1d4f8a78fe72d07ad4d55f76107bae9ab4e3b7d4cc2999635de457ed7ac7d132",
    ],
    ["tooling/src/validate.ts", "c0e6b46d7df7fe168f6d475f05a3043e25f9a55a6593249be71fa80c5bf56e7f"],
  ];
  for (const [path, sha256] of transitions) {
    const bytes = readFileSync(new URL("../../" + path, import.meta.url));
    checkPinnedBytes(bytes, { path, sha256 });
    const changed = Buffer.from(bytes);
    changed[0] ^= 1;
    assert.throws(() => checkPinnedBytes(changed, { path, sha256 }), path);
  }
});
