// Exact maintenance transitions for historical source pins. No runtime exemption.
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";

const previous = "059d84ddbd634f42178810a53d9db1e9886a8a07ae15d5269b6090191dca68ed";
const approved = "7cbc579ef13cd2845fba79c1e74a5eb0655719956f11d51ce20a17b09d1715a5";
const marker = Buffer.from("\n## Publication boundary and implementation ownership\n");
const digest = (bytes) => createHash("sha256").update(bytes).digest("hex");
const maintenanceTransitions = new Map([
  [
    "AUTHORITY.md\n2c7c4dd35fc86a2a87354ca40ea0ca08834998d1136d7b65de9850c007cf6ea3",
    "3d2b617162d7eea9794ffd52b5c79cd1f020a5704abf9ff0a316139bdf4ae38e",
  ],
  [
    "authority/authority-manifest.yaml\nc4d103fda174ffdf8e6a54674f79573629a6628295d09b64144c54b7a1844d74",
    "338f951dd273db1d1a44f7a49fa1667d1ead1ef8fa8642f63c0108ba6861715e",
  ],
  [
    "conformance/expectations/phase-2a-021-expectations.yaml\n8f4afd6ccecb69466229b87f90e15032e9adb54a357507da1e15ab02342ca66f",
    "0a51993e9d9a0f591d73e04cf54afec19442d438c24fc37b02a871a63b689a8e",
  ],
  [
    "conformance/manifest.yaml\n4a009d86e1616be99fdcd15712818536507ed4c53af1c01f8bba309d97d408f3",
    "b5868b9db1884b21d0fab21f26d632ece4613af61d3d97d4893ac7d85077e15d",
  ],
  [
    "governance/drafts/release-3-preparation/holm-repaired-candidate-20260911/RESULTS.json\n1a8800e50746923e893c07a2a5944133cc89ad370209cdc799b0d3a154926089",
    "84c17a5bc71bd705ba39feb7540bef2625b1824de5d496bb0650530f4d19cd8d",
  ],
  [
    "tooling/src/lib/checks.ts\n8dd56d269d62310c3c2adbf0dcd1157c0c7769dc2e97aef2d6a4a33250ce8db5",
    "bc0b335db390eb3f0f0c0c087d93eb41e45aac26c843c281e25b57d5734fa030",
  ],
  [
    "tooling/src/normative-lint.ts\n329e75bcb084954711c9c9705b402c3034a2550edc31a27f6ad5823fb0a8653b",
    "8083a37a0dea9c1fb8561f7bcf8ec9451b5faa87e19f7f20f6b107e847597f2a",
  ],
  [
    "tooling/src/phase2a/author-fixtures-021.ts\n1d4f8a78fe72d07ad4d55f76107bae9ab4e3b7d4cc2999635de457ed7ac7d132",
    "0596c98bd6802497809f8c972a69314cb720486101f7807230a03c0744e1d35d",
  ],
  [
    "tooling/src/validate.ts\nc0e6b46d7df7fe168f6d475f05a3043e25f9a55a6593249be71fa80c5bf56e7f",
    "910f810b98eda9d657f2d482d4fb94632471456e690431a94a5a78ea353e51f9",
  ],
]);

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
  const maintained = maintenanceTransitions.get(`${pin.path}\n${pin.sha256}`);
  if (maintained) {
    assert.equal(digest(bytes), maintained, `${pin.path}: unapproved maintained-source revision`);
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
