/**
 * Release 1 historical-integrity checks for successor development.
 *
 * This check deliberately permits additive successor artifacts. It protects the
 * signed Release 1 snapshot evidence, released schema bytes, and released fixture
 * inputs while requiring already-issued registry identifiers to remain present.
 * It does not attempt to decide whether an editorial wording change preserves a
 * Requirement ID's meaning; that remains a governance review responsibility.
 */

import { createHash, createPublicKey, verify as verifyDetachedSignature } from "node:crypto";
import * as fs from "node:fs";
import { jcsCanonicalize } from "../../../reference/verifier/src/jcs.js";
import { DIGEST_DOMAIN_TAGS, sha256HexOfUtf8 } from "../../../reference/verifier/src/digest.js";
import { absPath, exists, loadJson, loadYaml, readText, type Issue } from "../lib/repo.js";
import {
  RELEASE1_BUNDLE_ENTRY_SHA256,
  RELEASE1_CHECK_ENTRY_SHA256,
  RELEASE1_FIXTURE_ENTRY_SHA256,
  RELEASE1_REASON_CODE_MEANING_SHA256,
  RELEASE1_REQUIREMENT_IDENTITY_SHA256,
  RELEASE1_SURFACE_ENTRY_SHA256,
  RELEASE1_VECTOR_ENTRY_SHA256,
} from "./release-1-history-baseline.js";
import {
  CANDIDATE_FREEZE_MANIFEST_ID,
  SNAPSHOT_MANIFEST_ID,
  snapshotTextSha256,
  type CandidateFreezeManifest,
  type SnapshotManifest,
} from "./snapshot-manifest.js";

const RELEASE_EVIDENCE_DIR = "evidence/release-1/gates/R1-14";
const RELEASE_CHECKSUMS_PATH = `${RELEASE_EVIDENCE_DIR}/release-checksums.json`;
const SNAPSHOT_PATH = `${RELEASE_EVIDENCE_DIR}/protocol-snapshot-manifest.json`;
const PUBLIC_KEY_PATH = `${RELEASE_EVIDENCE_DIR}/release-g2.pem`;
const CANDIDATE_FREEZE_PATH = "evidence/release-1/candidate-freeze-manifest.json";
const EXPECTED_SNAPSHOT_HASH =
  "sha256:fc26c770538abe3598fc27a571ca6e99cc29763e0a25859a80c267ee2d80ab06";

interface ReleaseChecksums {
  manifest: string;
  manifest_version: string;
  candidate_content_commit: string;
  final_release_commit: string;
  protocol_snapshot_hash: string;
  artifacts: Array<{ role: string; file: string; sha256: string; size: number }>;
}

interface BundleRegistry {
  entries: Array<Record<string, unknown> & { bundle_id: string }>;
}

interface CheckRegistry {
  checks: Array<Record<string, unknown> & { check_id: string }>;
}

interface SurfaceRegistry {
  entries: Array<Record<string, unknown> & { surface_id: string }>;
}

interface VectorManifest {
  vectors: Array<Record<string, unknown> & { vector_id: string }>;
}

interface ConformanceManifest {
  families: Array<{
    fixtures: Array<Record<string, unknown> & { fixture_id: string }>;
  }>;
}

interface ReasonCodeRegistry {
  codes: Array<Record<string, unknown> & { id: string }>;
}

interface RequirementRegistry {
  requirements: Array<Record<string, unknown> & { id: string }>;
}

interface PublishedSnapshotManifest extends SnapshotManifest {
  snapshot_hash: string;
}

function sha256(bytes: Uint8Array): string {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function signatureIsValid(
  targetPath: string,
  signaturePath: string,
  publicKeyPem: string,
): boolean {
  const target = fs.readFileSync(absPath(targetPath));
  const signature = Buffer.from(readText(signaturePath).trim(), "base64");
  return verifyDetachedSignature("sha256", target, createPublicKey(publicKeyPem), signature);
}

function releasedSnapshotHash(snapshot: PublishedSnapshotManifest): string {
  const { snapshot_hash: _recordedHash, ...manifest } = snapshot;
  const payload = DIGEST_DOMAIN_TAGS.snapshot_manifest + jcsCanonicalize(manifest);
  return `sha256:${sha256HexOfUtf8(payload)}`;
}

function checkEntryFingerprints<T extends Record<string, unknown>>(
  issues: Issue[],
  file: string,
  kind: string,
  baseline: Readonly<Record<string, string>>,
  entries: readonly T[],
  idOf: (entry: T) => string,
  projection: (entry: T) => unknown = (entry) => entry,
): void {
  const current = new Map(entries.map((entry) => [idOf(entry), entry]));
  for (const [id, expected] of Object.entries(baseline)) {
    const entry = current.get(id);
    if (entry === undefined) {
      issues.push({
        check: "release-1-history",
        file,
        message: `released ${kind} identifier disappeared: ${id}`,
      });
      continue;
    }
    const actual = sha256HexOfUtf8(jcsCanonicalize(projection(entry)));
    if (actual !== expected) {
      issues.push({
        check: "release-1-history",
        file,
        message: `released ${kind} meaning changed for ${id}; issue a successor identifier`,
      });
    }
  }
}

/** Validate the immutable parts of the published Release 1 history. */
export function checkRelease1HistoricalIntegrity(): Issue[] {
  const issues: Issue[] = [];
  let checksums: ReleaseChecksums;
  let snapshot: PublishedSnapshotManifest;
  let freeze: CandidateFreezeManifest;

  try {
    checksums = loadJson<ReleaseChecksums>(RELEASE_CHECKSUMS_PATH);
    snapshot = loadJson<PublishedSnapshotManifest>(SNAPSHOT_PATH);
    freeze = loadJson<CandidateFreezeManifest>(CANDIDATE_FREEZE_PATH);
  } catch (error) {
    return [
      {
        check: "release-1-history",
        message: `Release 1 evidence could not be loaded: ${String(error)}`,
      },
    ];
  }

  const publicKey = readText(PUBLIC_KEY_PATH);
  for (const target of [RELEASE_CHECKSUMS_PATH, SNAPSHOT_PATH]) {
    try {
      if (!signatureIsValid(target, `${target}.sig`, publicKey)) {
        issues.push({
          check: "release-1-history",
          file: target,
          message: "Release 1 detached signature verification failed",
        });
      }
    } catch (error) {
      issues.push({
        check: "release-1-history",
        file: target,
        message: `Release 1 detached signature could not be verified: ${String(error)}`,
      });
    }
  }

  if (snapshot.manifest !== SNAPSHOT_MANIFEST_ID) {
    issues.push({
      check: "release-1-history",
      file: SNAPSHOT_PATH,
      message: `unexpected Release 1 snapshot manifest id: ${String(snapshot.manifest)}`,
    });
  }
  if (freeze.manifest !== CANDIDATE_FREEZE_MANIFEST_ID) {
    issues.push({
      check: "release-1-history",
      file: CANDIDATE_FREEZE_PATH,
      message: `unexpected Release 1 candidate-freeze manifest id: ${String(freeze.manifest)}`,
    });
  }
  if (checksums.protocol_snapshot_hash !== EXPECTED_SNAPSHOT_HASH) {
    issues.push({
      check: "release-1-history",
      file: RELEASE_CHECKSUMS_PATH,
      message: `Release 1 snapshot hash changed: ${checksums.protocol_snapshot_hash}`,
    });
  }
  if (snapshot.snapshot_hash !== checksums.protocol_snapshot_hash) {
    issues.push({
      check: "release-1-history",
      file: SNAPSHOT_PATH,
      message: "embedded snapshot hash does not match the signed checksum manifest",
    });
  }
  const computedSnapshotHash = releasedSnapshotHash(snapshot);
  if (computedSnapshotHash !== checksums.protocol_snapshot_hash) {
    issues.push({
      check: "release-1-history",
      file: SNAPSHOT_PATH,
      message: `snapshot content hash mismatch (${checksums.protocol_snapshot_hash} != ${computedSnapshotHash})`,
    });
  }
  const snapshotArtifact = checksums.artifacts.find(
    (artifact) => artifact.role === "protocol_snapshot_manifest",
  );
  const snapshotBytes = fs.readFileSync(absPath(SNAPSHOT_PATH));
  if (
    snapshotArtifact === undefined ||
    snapshotArtifact.sha256 !== sha256(snapshotBytes) ||
    snapshotArtifact.size !== snapshotBytes.length
  ) {
    issues.push({
      check: "release-1-history",
      file: SNAPSHOT_PATH,
      message: "snapshot bytes do not match the signed Release 1 checksum manifest",
    });
  }
  if (freeze.release_candidate_id !== checksums.candidate_content_commit) {
    issues.push({
      check: "release-1-history",
      file: CANDIDATE_FREEZE_PATH,
      message: "candidate-freeze commit does not match the signed Release 1 checksum manifest",
    });
  }

  for (const entry of snapshot.files.filter((item) => item.path.startsWith("schemas/"))) {
    if (!exists(entry.path)) {
      issues.push({
        check: "release-1-history",
        file: entry.path,
        message: "released schema was removed",
      });
      continue;
    }
    const actual = snapshotTextSha256(readText(entry.path));
    if (actual !== entry.sha256) {
      issues.push({
        check: "release-1-history",
        file: entry.path,
        message: `released schema bytes changed (${entry.sha256} != ${actual})`,
      });
    }
  }

  for (const entry of freeze.files.filter(
    (item) =>
      item.path.startsWith("conformance/fixtures/") ||
      item.path.startsWith("canonicalization/test-vectors/inputs/") ||
      item.path.startsWith("canonicalization/test-vectors/expected/"),
  )) {
    if (!exists(entry.path)) {
      issues.push({
        check: "release-1-history",
        file: entry.path,
        message: "released fixture/vector file was removed",
      });
      continue;
    }
    const actual = createHash("sha256")
      .update(fs.readFileSync(absPath(entry.path)))
      .digest("hex");
    if (actual !== entry.sha256) {
      issues.push({
        check: "release-1-history",
        file: entry.path,
        message: "released fixture/vector bytes changed; issue a successor ID instead",
      });
    }
  }

  const bundles = loadYaml<BundleRegistry>("registries/interpretation-bundles.yaml");
  checkEntryFingerprints(
    issues,
    "registries/interpretation-bundles.yaml",
    "bundle",
    RELEASE1_BUNDLE_ENTRY_SHA256,
    bundles.entries,
    (entry) => entry.bundle_id,
  );
  const checks = loadYaml<CheckRegistry>("registries/public-checks.yaml");
  checkEntryFingerprints(
    issues,
    "registries/public-checks.yaml",
    "Public Check",
    RELEASE1_CHECK_ENTRY_SHA256,
    checks.checks,
    (entry) => entry.check_id,
  );
  const surfaces = loadYaml<SurfaceRegistry>("registries/public-contract-surfaces.yaml");
  checkEntryFingerprints(
    issues,
    "registries/public-contract-surfaces.yaml",
    "public contract surface",
    RELEASE1_SURFACE_ENTRY_SHA256,
    surfaces.entries,
    (entry) => entry.surface_id,
  );
  const vectors = loadYaml<VectorManifest>("canonicalization/test-vectors/manifest.yaml");
  checkEntryFingerprints(
    issues,
    "canonicalization/test-vectors/manifest.yaml",
    "canonicalization vector",
    RELEASE1_VECTOR_ENTRY_SHA256,
    vectors.vectors,
    (entry) => entry.vector_id,
  );
  const conformance = loadYaml<ConformanceManifest>("conformance/manifest.yaml");
  checkEntryFingerprints(
    issues,
    "conformance/manifest.yaml",
    "conformance fixture",
    RELEASE1_FIXTURE_ENTRY_SHA256,
    conformance.families.flatMap((family) => family.fixtures),
    (entry) => entry.fixture_id,
  );
  const reasonCodes = loadYaml<ReasonCodeRegistry>("registries/reason-codes.yaml");
  checkEntryFingerprints(
    issues,
    "registries/reason-codes.yaml",
    "reason code",
    RELEASE1_REASON_CODE_MEANING_SHA256,
    reasonCodes.codes,
    (entry) => entry.id,
    ({ applicable_check_ids: _applicableCheckIds, ...meaning }) => meaning,
  );
  const requirements = loadYaml<RequirementRegistry>("registries/requirements.yaml");
  checkEntryFingerprints(
    issues,
    "registries/requirements.yaml",
    "Requirement",
    RELEASE1_REQUIREMENT_IDENTITY_SHA256,
    requirements.requirements,
    (entry) => entry.id,
    (entry) => ({
      id: entry.id,
      title: entry.title,
      stability: entry.stability,
      document: entry.document,
      anchor: entry.anchor,
      introduced_in: entry.introduced_in,
    }),
  );

  return issues;
}
