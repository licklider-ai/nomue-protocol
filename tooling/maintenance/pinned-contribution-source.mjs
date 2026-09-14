// Exact, steward-approved operating-instruction transition. No runtime exemption.
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";

const previous = "059d84ddbd634f42178810a53d9db1e9886a8a07ae15d5269b6090191dca68ed";
const approved = "09c531ae764648caffd186970d5d9a5c5080aad7311f0644827f6ca4230abb19";
const marker = Buffer.from("\n## Publication boundary and implementation ownership\n");
const digest = (bytes) => createHash("sha256").update(bytes).digest("hex");

export function checkPinnedBytes(bytes, pin) {
  // The adoption-map checker pins itself. Bind only its explicit delegation edit,
  // and reconstruct the previous bytes rather than altering the historical pin.
  if (
    pin.path ===
      "governance/drafts/release-3-preparation/holm-adoption-map-repair-20260911/check.mjs" &&
    pin.sha256 === "a68d1e995e07c99fb7c7eadd32f661ec21ce1079a2485578b4d0fa331692dfd5"
  ) {
    assert.equal(digest(bytes), "9496bd89cbfa4b32082f9ed1a19ea35efbd26a59fec8243f67f908b28e123970");
    const historical = bytes
      .toString("utf8")
      .split("\n")
      .filter((line) => !line.startsWith("import { checkPinnedSource }"))
      .join("\n")
      .replace(
        'for (const pin of load("INPUTS.json").files) checkPinnedSource(root, pin);',
        'for (const pin of load("INPUTS.json").files)\n  assert.equal(digest(fs.readFileSync(path.join(root, pin.path))), pin.sha256, pin.path);',
      );
    assert.equal(digest(historical), pin.sha256, "historical source check changed");
    return;
  }
  if (pin.path !== "AGENTS.md" || pin.sha256 !== previous) {
    assert.equal(digest(bytes), pin.sha256, pin.path);
    return;
  }
  assert.equal(digest(bytes), approved, "unapproved contribution-instruction revision");
  const boundary = bytes.indexOf(marker);
  assert.ok(boundary > 0, "missing approved append boundary");
  assert.equal(digest(bytes.subarray(0, boundary)), previous, "historical instructions changed");
}

export function checkPinnedSource(root, pin) {
  checkPinnedBytes(readFileSync(join(root, pin.path)), pin);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [root, path, sha256] = process.argv.slice(2);
  assert.ok(root && path && sha256, "expected root, path and SHA-256");
  checkPinnedSource(root, { path, sha256 });
}
