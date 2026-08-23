import { generateKeyPairSync, sign } from "node:crypto";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { describe, expect, it } from "vitest";
import {
  prepareReleaseSigningBundle,
  releasePublicKeyFingerprint,
  verifyReleaseSigningBundle,
} from "../src/release/release-signing.js";

function makeFixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "nomue-release-signing-"));
  const archive = path.join(root, "candidate.tar.gz");
  const snapshot = path.join(root, "snapshot.json");
  const bundle = path.join(root, "bundle");
  // Deliberately exceed the Cloud KMS Ed25519 raw-input ceiling that blocked the
  // first production ceremony. The P-256/SHA-256 suite signs a digest and must not
  // regress to a small-fixture-only assumption.
  fs.writeFileSync(archive, Buffer.alloc(70_000, 0x61));
  fs.writeFileSync(snapshot, `${JSON.stringify({ manifest: "snapshot", files: [] }, null, 2)}\n`);
  const targets = prepareReleaseSigningBundle({
    sourceArchivePath: archive,
    snapshotManifestPath: snapshot,
    candidateContentCommit: "1".repeat(40),
    finalReleaseCommit: "2".repeat(40),
    protocolSnapshotHash: `sha256:${"3".repeat(64)}`,
    outputDir: bundle,
  });
  const { publicKey, privateKey } = generateKeyPairSync("ec", {
    namedCurve: "prime256v1",
  });
  const publicKeyPem = publicKey.export({ type: "spki", format: "pem" }).toString();
  for (const target of targets.targets) {
    const targetPath = path.join(bundle, target.file);
    const signature = sign("sha256", fs.readFileSync(targetPath), privateKey);
    fs.writeFileSync(path.join(bundle, target.signature_file), `${signature.toString("base64")}\n`);
  }
  return { root, bundle, targets, publicKeyPem };
}

describe("Release 1 detached artifact signing", () => {
  it("verifies all three R1-14 targets with an ECDSA P-256 / SHA-256 public key", () => {
    const fixture = makeFixture();
    try {
      const fingerprint = releasePublicKeyFingerprint(fixture.publicKeyPem);
      const result = verifyReleaseSigningBundle({
        bundleDir: fixture.bundle,
        publicKeyPem: fixture.publicKeyPem,
        expectedFingerprint: fingerprint,
      });
      expect(result.ok, result.failures.join("\n")).toBe(true);
      expect(result.verified_targets.sort()).toEqual(
        ["checksums", "protocol_snapshot_manifest", "source_archive"].sort(),
      );
      expect(result.public_key_fingerprint).toMatch(/^sha256:[0-9a-f]{64}$/);
      expect(fs.statSync(path.join(fixture.bundle, "source-archive.tar.gz")).size).toBeGreaterThan(
        65_536,
      );
    } finally {
      fs.rmSync(fixture.root, { recursive: true, force: true });
    }
  });

  it("fails closed when a signed target is modified", () => {
    const fixture = makeFixture();
    try {
      fs.appendFileSync(path.join(fixture.bundle, "source-archive.tar.gz"), "tampered\n");
      const result = verifyReleaseSigningBundle({
        bundleDir: fixture.bundle,
        publicKeyPem: fixture.publicKeyPem,
      });
      expect(result.ok).toBe(false);
      expect(
        result.failures.some((failure) => failure.includes("source_archive: sha256 mismatch")),
      ).toBe(true);
    } finally {
      fs.rmSync(fixture.root, { recursive: true, force: true });
    }
  });

  it("fails closed on a public-key fingerprint mismatch", () => {
    const fixture = makeFixture();
    try {
      const result = verifyReleaseSigningBundle({
        bundleDir: fixture.bundle,
        publicKeyPem: fixture.publicKeyPem,
        expectedFingerprint: `sha256:${"0".repeat(64)}`,
      });
      expect(result.ok).toBe(false);
      expect(
        result.failures.some((failure) => failure.includes("public key fingerprint mismatch")),
      ).toBe(true);
    } finally {
      fs.rmSync(fixture.root, { recursive: true, force: true });
    }
  });

  it("rejects a non-P-256 release signing public key", () => {
    const fixture = makeFixture();
    const wrongKey = generateKeyPairSync("ed25519").publicKey;
    const wrongPem = wrongKey.export({ type: "spki", format: "pem" }).toString();
    try {
      const result = verifyReleaseSigningBundle({
        bundleDir: fixture.bundle,
        publicKeyPem: wrongPem,
      });
      expect(result.ok).toBe(false);
      expect(result.failures.some((failure) => failure.includes("must be ECDSA P-256"))).toBe(true);
    } finally {
      fs.rmSync(fixture.root, { recursive: true, force: true });
    }
  });

  it("rejects malformed release identities before producing signing targets", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "nomue-release-signing-invalid-"));
    try {
      const archive = path.join(root, "candidate.tar.gz");
      const snapshot = path.join(root, "snapshot.json");
      fs.writeFileSync(archive, "archive");
      fs.writeFileSync(snapshot, "{}\n");
      expect(() =>
        prepareReleaseSigningBundle({
          sourceArchivePath: archive,
          snapshotManifestPath: snapshot,
          candidateContentCommit: "not-a-commit",
          finalReleaseCommit: "2".repeat(40),
          protocolSnapshotHash: `sha256:${"3".repeat(64)}`,
          outputDir: path.join(root, "bundle"),
        }),
      ).toThrow(/candidateContentCommit/);
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });
});
