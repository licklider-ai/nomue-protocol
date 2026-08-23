import { createHash, createPublicKey, verify as verifyDetachedSignature } from "node:crypto";
import * as fs from "node:fs";
import * as path from "node:path";

export const RELEASE_CHECKSUMS_MANIFEST_ID = "nomue-release-checksums";
export const RELEASE_SIGNING_TARGETS_MANIFEST_ID = "nomue-release-signing-targets";
export const RELEASE_SIGNING_MANIFEST_VERSION = "1.0.0";
export const RELEASE_SIGNING_SUITE = "ecdsa-p256-sha256";

export type ReleaseSigningRole = "source_archive" | "checksums" | "protocol_snapshot_manifest";

export interface ReleaseArtifactDigest {
  role: Exclude<ReleaseSigningRole, "checksums">;
  file: string;
  sha256: string;
  size: number;
}

export interface ReleaseChecksumsManifest {
  manifest: typeof RELEASE_CHECKSUMS_MANIFEST_ID;
  manifest_version: string;
  candidate_content_commit: string;
  final_release_commit: string;
  protocol_snapshot_hash: string;
  artifacts: ReleaseArtifactDigest[];
}

export interface ReleaseSigningTarget {
  role: ReleaseSigningRole;
  file: string;
  sha256: string;
  size: number;
  signature_file: string;
}

export interface ReleaseSigningTargetsManifest {
  manifest: typeof RELEASE_SIGNING_TARGETS_MANIFEST_ID;
  manifest_version: string;
  signature_suite: typeof RELEASE_SIGNING_SUITE;
  candidate_content_commit: string;
  final_release_commit: string;
  protocol_snapshot_hash: string;
  targets: ReleaseSigningTarget[];
}

export interface PrepareReleaseSigningInput {
  sourceArchivePath: string;
  snapshotManifestPath: string;
  candidateContentCommit: string;
  finalReleaseCommit: string;
  protocolSnapshotHash: string;
  outputDir: string;
}

export interface VerifyReleaseSigningInput {
  bundleDir: string;
  publicKeyPem: string;
  expectedFingerprint?: string;
}

export interface ReleaseSigningVerificationResult {
  ok: boolean;
  public_key_fingerprint: string;
  verified_targets: ReleaseSigningRole[];
  failures: string[];
}

function assertCommit(value: string, field: string): void {
  if (!/^[0-9a-f]{40}$/.test(value)) {
    throw new Error(`${field} must be a lowercase 40-hex git commit`);
  }
}

function assertSnapshotHash(value: string): void {
  if (!/^sha256:[0-9a-f]{64}$/.test(value)) {
    throw new Error("protocolSnapshotHash must be sha256:<64 lowercase hex>");
  }
}

function sha256Bytes(bytes: Uint8Array): string {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function digestFile(filePath: string): { sha256: string; size: number } {
  const bytes = fs.readFileSync(filePath);
  return { sha256: sha256Bytes(bytes), size: bytes.length };
}

function writeDeterministicJson(filePath: string, value: unknown): void {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function copyTarget(source: string, destination: string): void {
  const sourceAbs = path.resolve(source);
  const destinationAbs = path.resolve(destination);
  if (sourceAbs === destinationAbs) return;
  fs.copyFileSync(sourceAbs, destinationAbs);
}

function targetFor(
  role: ReleaseSigningRole,
  fileName: string,
  bundleDir: string,
): ReleaseSigningTarget {
  const digest = digestFile(path.join(bundleDir, fileName));
  return {
    role,
    file: fileName,
    sha256: digest.sha256,
    size: digest.size,
    signature_file: `${fileName}.sig`,
  };
}

/**
 * Prepare the exact three targets required by R1-14. This function never
 * creates or accesses a private key and never shells out to a signer.
 * Production signing remains a deliberate steward operation in Cloud KMS.
 */
export function prepareReleaseSigningBundle(
  input: PrepareReleaseSigningInput,
): ReleaseSigningTargetsManifest {
  assertCommit(input.candidateContentCommit, "candidateContentCommit");
  assertCommit(input.finalReleaseCommit, "finalReleaseCommit");
  assertSnapshotHash(input.protocolSnapshotHash);

  if (!fs.existsSync(input.sourceArchivePath)) {
    throw new Error(`source archive does not exist: ${input.sourceArchivePath}`);
  }
  if (!fs.existsSync(input.snapshotManifestPath)) {
    throw new Error(`snapshot manifest does not exist: ${input.snapshotManifestPath}`);
  }

  fs.mkdirSync(input.outputDir, { recursive: true });
  const archiveName = "source-archive.tar.gz";
  const snapshotName = "protocol-snapshot-manifest.json";
  const checksumsName = "release-checksums.json";
  const targetsName = "release-signing-targets.json";

  copyTarget(input.sourceArchivePath, path.join(input.outputDir, archiveName));
  copyTarget(input.snapshotManifestPath, path.join(input.outputDir, snapshotName));

  const archiveDigest = digestFile(path.join(input.outputDir, archiveName));
  const snapshotDigest = digestFile(path.join(input.outputDir, snapshotName));
  const checksums: ReleaseChecksumsManifest = {
    manifest: RELEASE_CHECKSUMS_MANIFEST_ID,
    manifest_version: RELEASE_SIGNING_MANIFEST_VERSION,
    candidate_content_commit: input.candidateContentCommit,
    final_release_commit: input.finalReleaseCommit,
    protocol_snapshot_hash: input.protocolSnapshotHash,
    artifacts: [
      { role: "source_archive", file: archiveName, ...archiveDigest },
      { role: "protocol_snapshot_manifest", file: snapshotName, ...snapshotDigest },
    ],
  };
  writeDeterministicJson(path.join(input.outputDir, checksumsName), checksums);

  const targets: ReleaseSigningTargetsManifest = {
    manifest: RELEASE_SIGNING_TARGETS_MANIFEST_ID,
    manifest_version: RELEASE_SIGNING_MANIFEST_VERSION,
    signature_suite: RELEASE_SIGNING_SUITE,
    candidate_content_commit: input.candidateContentCommit,
    final_release_commit: input.finalReleaseCommit,
    protocol_snapshot_hash: input.protocolSnapshotHash,
    targets: [
      targetFor("source_archive", archiveName, input.outputDir),
      targetFor("checksums", checksumsName, input.outputDir),
      targetFor("protocol_snapshot_manifest", snapshotName, input.outputDir),
    ],
  };
  writeDeterministicJson(path.join(input.outputDir, targetsName), targets);
  return targets;
}

export function releasePublicKeyFingerprint(publicKeyPem: string): string {
  const key = createPublicKey(publicKeyPem);
  const der = key.export({ type: "spki", format: "der" });
  return sha256Bytes(der);
}

function readTargetsManifest(bundleDir: string): ReleaseSigningTargetsManifest {
  const pathName = path.join(bundleDir, "release-signing-targets.json");
  const parsed = JSON.parse(fs.readFileSync(pathName, "utf8")) as ReleaseSigningTargetsManifest;
  if (parsed.manifest !== RELEASE_SIGNING_TARGETS_MANIFEST_ID) {
    throw new Error(`unexpected release signing target manifest: ${String(parsed.manifest)}`);
  }
  if (parsed.manifest_version !== RELEASE_SIGNING_MANIFEST_VERSION) {
    throw new Error(`unsupported release signing manifest version: ${parsed.manifest_version}`);
  }
  if (parsed.signature_suite !== RELEASE_SIGNING_SUITE) {
    throw new Error(`unsupported release signing suite: ${parsed.signature_suite}`);
  }
  assertCommit(parsed.candidate_content_commit, "candidate_content_commit");
  assertCommit(parsed.final_release_commit, "final_release_commit");
  assertSnapshotHash(parsed.protocol_snapshot_hash);
  return parsed;
}

function isP256PublicKey(publicKey: ReturnType<typeof createPublicKey>): boolean {
  return (
    publicKey.asymmetricKeyType === "ec" &&
    publicKey.asymmetricKeyDetails?.namedCurve === "prime256v1"
  );
}

/**
 * Verify hashes and detached ECDSA P-256 / SHA-256 signatures for all R1-14
 * targets. `gcloud kms asymmetric-sign` writes each signature as base64 text.
 */
export function verifyReleaseSigningBundle(
  input: VerifyReleaseSigningInput,
): ReleaseSigningVerificationResult {
  const failures: string[] = [];
  const verified: ReleaseSigningRole[] = [];
  const publicKey = createPublicKey(input.publicKeyPem);
  const fingerprint = releasePublicKeyFingerprint(input.publicKeyPem);

  if (!isP256PublicKey(publicKey)) {
    failures.push("release signing public key must be ECDSA P-256 (prime256v1)");
  }

  if (input.expectedFingerprint !== undefined && input.expectedFingerprint !== fingerprint) {
    failures.push(
      `public key fingerprint mismatch: expected ${input.expectedFingerprint}, got ${fingerprint}`,
    );
  }

  let manifest: ReleaseSigningTargetsManifest;
  try {
    manifest = readTargetsManifest(input.bundleDir);
  } catch (error) {
    return {
      ok: false,
      public_key_fingerprint: fingerprint,
      verified_targets: [],
      failures: [...failures, String(error)],
    };
  }

  const expectedRoles = new Set<ReleaseSigningRole>([
    "source_archive",
    "checksums",
    "protocol_snapshot_manifest",
  ]);
  const observedRoles = new Set(manifest.targets.map((target) => target.role));
  for (const role of expectedRoles) {
    if (!observedRoles.has(role)) failures.push(`missing signing target role: ${role}`);
  }
  if (manifest.targets.length !== expectedRoles.size) {
    failures.push(
      `expected exactly ${expectedRoles.size} signing targets, got ${manifest.targets.length}`,
    );
  }

  for (const target of manifest.targets) {
    const targetPath = path.join(input.bundleDir, target.file);
    const signaturePath = path.join(input.bundleDir, target.signature_file);
    if (!fs.existsSync(targetPath)) {
      failures.push(`${target.role}: missing target file ${target.file}`);
      continue;
    }
    if (!fs.existsSync(signaturePath)) {
      failures.push(`${target.role}: missing signature file ${target.signature_file}`);
      continue;
    }

    const bytes = fs.readFileSync(targetPath);
    const actualSha = sha256Bytes(bytes);
    if (actualSha !== target.sha256) {
      failures.push(`${target.role}: sha256 mismatch (${target.sha256} != ${actualSha})`);
      continue;
    }
    if (bytes.length !== target.size) {
      failures.push(`${target.role}: size mismatch (${target.size} != ${bytes.length})`);
      continue;
    }

    const signatureText = fs.readFileSync(signaturePath, "utf8").trim();
    let signature: Buffer;
    try {
      signature = Buffer.from(signatureText, "base64");
    } catch {
      failures.push(`${target.role}: signature is not valid base64`);
      continue;
    }
    if (signature.length === 0) {
      failures.push(`${target.role}: signature is empty`);
      continue;
    }
    if (!isP256PublicKey(publicKey)) {
      continue;
    }
    const valid = verifyDetachedSignature("sha256", bytes, publicKey, signature);
    if (!valid) {
      failures.push(`${target.role}: ECDSA P-256 / SHA-256 signature verification failed`);
      continue;
    }
    verified.push(target.role);
  }

  return {
    ok: failures.length === 0,
    public_key_fingerprint: fingerprint,
    verified_targets: verified,
    failures,
  };
}
