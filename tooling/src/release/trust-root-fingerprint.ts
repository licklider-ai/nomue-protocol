/**
 * Trust-root fingerprint tool (Batch 4 X2).
 *
 * Default mode: prints every key pinned in
 * registries/attestation-trust-root.yaml with its declared fingerprint,
 * RE-DERIVES the fingerprint from the pinned PEM (SHA-256 over DER SPKI),
 * and fails (exit 1) on any mismatch - the same self-consistency the
 * validate cross-check enforces, available as a standalone printout for
 * multi-channel publication (GitHub / nomue.ai / position paper).
 *
 * --pem <file>: prints the fingerprint of an arbitrary SPKI public-key PEM
 * (used during the key ceremony, before the pin is committed).
 *
 * Usage:
 *   pnpm trust-root:fingerprint
 *   pnpm trust-root:fingerprint --pem <public-key.pem>
 */

import * as fs from "node:fs";
import {
  computeSpkiSha256Fingerprint,
  loadTrustRoot,
} from "../../../reference/verifier/src/attestation.js";

const args = process.argv.slice(2);
const pemFlagIndex = args.indexOf("--pem");

if (pemFlagIndex !== -1) {
  const pemPath = args[pemFlagIndex + 1];
  if (pemPath === undefined) {
    console.error("usage: trust-root-fingerprint --pem <public-key.pem>");
    process.exit(2);
  }
  const pem = fs.readFileSync(pemPath, "utf8");
  console.log(computeSpkiSha256Fingerprint(pem));
  process.exit(0);
}

const trustRoot = loadTrustRoot();
console.log(
  `trust root registry_version ${trustRoot.registry_version} (updated ${trustRoot.updated})`,
);
console.log(`fingerprint method: ${trustRoot.fingerprint_method.trim()}`);

if (trustRoot.keys.length === 0) {
  console.log(
    "keys: NONE PINNED - pre-ceremony state; nothing is nomue-attested until the first generation is committed (governance/KEY-CEREMONY-RUNBOOK.md).",
  );
  process.exit(0);
}

let mismatches = 0;
for (const key of trustRoot.keys) {
  const derived = computeSpkiSha256Fingerprint(key.public_key_pem);
  const ok = derived === key.fingerprint;
  if (!ok) mismatches += 1;
  console.log(
    `generation ${key.generation} ${key.key_id} [${key.status}]\n` +
      `  declared: ${key.fingerprint}\n` +
      `  derived:  ${derived} ${ok ? "(match)" : "(MISMATCH)"}\n` +
      `  validity: ${key.valid_from} .. ${key.valid_until ?? "open-ended"}`,
  );
}
if (mismatches > 0) {
  console.error(`trust-root-fingerprint: ${mismatches} fingerprint mismatch(es)`);
  process.exitCode = 1;
}
