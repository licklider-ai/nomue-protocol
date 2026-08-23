/**
 * Public Draft snapshot manifest and frozen-candidate equivalence checks.
 *
 * ADR-0033 separates three objects:
 *
 * 1. Protocol snapshot content - content-addressed authoritative Protocol meaning;
 * 2. candidate freeze content - all repository/public content frozen for gate review;
 * 3. release-decision/evidence state - allowed to evolve while gates close.
 *
 * Release tooling never executes child processes. Candidate equivalence is proven
 * by a hash inventory captured at the candidate content commit and rechecked from
 * the filesystem after the release-control commit pins that commit.
 */

import { createHash } from "node:crypto";
import * as fs from "node:fs";
import { DIGEST_DOMAIN_TAGS, sha256HexOfUtf8 } from "../../../reference/verifier/src/digest.js";
import { jcsCanonicalize } from "../../../reference/verifier/src/jcs.js";
import { readSourceCommit } from "../../../reference/verifier/src/resources.js";
import { absPath, exists, loadJson, loadYaml, readText, walkFiles } from "../lib/repo.js";

export const SNAPSHOT_MANIFEST_ID = "nrs-public-draft-snapshot";
export const SNAPSHOT_MANIFEST_VERSION = "0.2.0";
export const SNAPSHOT_SCOPE = "protocol-authority-v1";
export const SNAPSHOT_EXCLUDED_AUTHORITY_TARGETS = ["release-decision"] as const;

export const CANDIDATE_FREEZE_MANIFEST_ID = "nrs-release-candidate-freeze";
export const CANDIDATE_FREEZE_MANIFEST_VERSION = "0.1.0";
export const CANDIDATE_FREEZE_MANIFEST_PATH = "evidence/release-1/candidate-freeze-manifest.json";

const RELEASE_DECISION_TARGET = "release-decision";
const RELEASE_GATE_REGISTRY_PATH = "authority/release-1-gates.yaml";
const ALLOWED_POST_CANDIDATE_EXACT_PATHS = new Set([
  RELEASE_GATE_REGISTRY_PATH,
  "generated/RELEASE-1-GATES.md",
]);
const ALLOWED_POST_CANDIDATE_PREFIXES = ["evidence/release-1/"] as const;
const WORKSPACE_EPHEMERAL_EXACT_PATHS = new Set(["env-report.json"]);

interface AuthorityTarget {
  target_id: string;
  authoritative_artifacts: string[];
}

interface AuthorityManifestFile {
  targets: AuthorityTarget[];
  artifacts: Array<{ path: string; class: string }>;
}

interface GateIndex {
  release_candidate_id: string | null;
}

export interface ReleaseGateRegistryFile {
  registry: string;
  registry_version: string;
  gates: Array<Record<string, unknown>>;
}

export interface CandidateWalkFile {
  rel: string;
  isSymlink: boolean;
}

export interface SnapshotFileEntry {
  path: string;
  sha256: string;
}

export interface SnapshotManifest {
  manifest: typeof SNAPSHOT_MANIFEST_ID;
  manifest_version: string;
  snapshot_scope: typeof SNAPSHOT_SCOPE;
  excluded_authority_targets: string[];
  file_count: number;
  files: SnapshotFileEntry[];
}

export interface CandidateFreezeManifest {
  manifest: typeof CANDIDATE_FREEZE_MANIFEST_ID;
  manifest_version: string;
  release_candidate_id: string;
  release_gate_definition_sha256: string;
  excluded_mutable_paths: {
    exact: string[];
    prefixes: string[];
  };
  frozen_file_count: number;
  files: SnapshotFileEntry[];
}

export interface SnapshotManifestCheckResult {
  ok: boolean;
  message: string;
}

export interface CandidateEquivalenceState {
  freeze: CandidateFreezeManifest;
  pinnedCandidate: string | null;
  enforcePinnedCandidate: boolean;
  currentGateDefinitionSha256: string;
  currentFiles: SnapshotFileEntry[];
}

/** LF normalization only; checkout line endings are not semantic Protocol content. */
export function normalizeLineEndings(text: string): string {
  return text.replace(/\r\n/g, "\n");
}

/** Snapshot-scoped text uses LF-normalized UTF-8 before hashing. */
export function snapshotTextSha256(text: string): string {
  return sha256HexOfUtf8(normalizeLineEndings(text));
}

/** Candidate freeze inventory hashes raw bytes, not normalized text. */
export function candidateBytesSha256(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function sha256FileBytes(path: string): string {
  return candidateBytesSha256(fs.readFileSync(absPath(path)));
}

function targetAssignmentsByArtifact(manifest: AuthorityManifestFile): Map<string, Set<string>> {
  const assignments = new Map<string, Set<string>>();
  for (const target of manifest.targets) {
    for (const path of target.authoritative_artifacts) {
      const current = assignments.get(path) ?? new Set<string>();
      current.add(target.target_id);
      assignments.set(path, current);
    }
  }
  return assignments;
}

/**
 * Snapshot-scoped authoritative file list from an authority manifest.
 * Artifacts assigned only to `release-decision` are intentionally omitted.
 */
export function snapshotAuthoritativeFilePathsFromManifest(
  manifest: AuthorityManifestFile,
): string[] {
  const assignments = targetAssignmentsByArtifact(manifest);
  return manifest.artifacts
    .filter((artifact) => artifact.class === "authoritative")
    .filter((artifact) => {
      const targets = assignments.get(artifact.path);
      if (targets === undefined || targets.size === 0) {
        const message = `authoritative artifact ${artifact.path} has no authority target assignment`;
        throw new Error(message);
      }
      return [...targets].some((target) => target !== RELEASE_DECISION_TARGET);
    })
    .map((artifact) => artifact.path)
    .sort();
}

/** Current-checkout Protocol snapshot scope. */
export function snapshotAuthoritativeFilePaths(): string[] {
  const authorityManifest = loadYaml<AuthorityManifestFile>("authority/authority-manifest.yaml");
  return snapshotAuthoritativeFilePathsFromManifest(authorityManifest);
}

/** Backward-compatible export name used by earlier tooling/tests. */
export const authoritativeFilePaths = snapshotAuthoritativeFilePaths;

export function buildSnapshotManifest(): SnapshotManifest {
  const paths = snapshotAuthoritativeFilePaths();
  if (paths.length === 0) {
    throw new Error(
      "no snapshot-scoped authoritative artifacts found; authority-manifest.yaml may have failed to load",
    );
  }
  const files: SnapshotFileEntry[] = paths.map((path) => {
    if (!exists(path)) {
      const message =
        `snapshot-scoped authoritative artifact ${path} is listed in ` +
        "authority/authority-manifest.yaml but does not exist on disk";
      throw new Error(message);
    }
    return { path, sha256: snapshotTextSha256(readText(path)) };
  });
  return {
    manifest: SNAPSHOT_MANIFEST_ID,
    manifest_version: SNAPSHOT_MANIFEST_VERSION,
    snapshot_scope: SNAPSHOT_SCOPE,
    excluded_authority_targets: [...SNAPSHOT_EXCLUDED_AUTHORITY_TARGETS],
    file_count: files.length,
    files,
  };
}

/**
 * The snapshot hash depends only on the declared Protocol snapshot scope and
 * its content. Release commit IDs and release evidence live in detached release
 * metadata and do not perturb the content address.
 */
export function snapshotHash(manifest: SnapshotManifest): string {
  const canonical = jcsCanonicalize(manifest);
  const payload = DIGEST_DOMAIN_TAGS.snapshot_manifest + canonical;
  return `sha256:${sha256HexOfUtf8(payload)}`;
}

function isMutableAfterCandidate(path: string): boolean {
  if (ALLOWED_POST_CANDIDATE_EXACT_PATHS.has(path)) return true;
  return ALLOWED_POST_CANDIDATE_PREFIXES.some((prefix) => path.startsWith(prefix));
}

/** Pure file-set boundary used by the real checkout walker and adversarial tests. */
export function candidateFrozenFilePathsFromEntries(files: CandidateWalkFile[]): string[] {
  const symlinks = files.filter((file) => file.isSymlink && !isMutableAfterCandidate(file.rel));
  if (symlinks.length > 0) {
    const paths = symlinks.map((file) => file.rel).join(", ");
    throw new Error(`candidate freeze does not accept symlinks: ${paths}`);
  }
  return files
    .filter((file) => !file.isSymlink)
    .map((file) => file.rel)
    .filter((path) => !isMutableAfterCandidate(path))
    .filter((path) => !WORKSPACE_EPHEMERAL_EXACT_PATHS.has(path))
    .sort();
}

function candidateFrozenFilePaths(): string[] {
  return candidateFrozenFilePathsFromEntries(walkFiles("."));
}

/**
 * Gate criteria are frozen even though state/decision/notes may evolve while
 * the steward closes gates. This prevents post-freeze goalpost changes.
 */
export function releaseGateDefinitionHashFromRegistry(registry: ReleaseGateRegistryFile): string {
  const gates = registry.gates.map((gate) => {
    const { state: _state, decision: _decision, notes: _notes, ...definition } = gate;
    return definition;
  });
  const projection = {
    registry: registry.registry,
    registry_version: registry.registry_version,
    gates,
  };
  return sha256HexOfUtf8(jcsCanonicalize(projection));
}

export function releaseGateDefinitionHash(): string {
  const registry = loadYaml<ReleaseGateRegistryFile>(RELEASE_GATE_REGISTRY_PATH);
  return releaseGateDefinitionHashFromRegistry(registry);
}

function readPinnedCandidate(): string | null {
  const index = loadJson<GateIndex>("evidence/release-1/gate-index.json");
  return index.release_candidate_id;
}

/**
 * Build the immutable hash inventory at the candidate CONTENT commit, before
 * a later release-control commit writes that commit's SHA into gate-index.json.
 * This ordering avoids a git-commit self-reference: a commit cannot contain its
 * own SHA as a field and still retain that SHA.
 */
export function buildCandidateFreezeManifest(candidateOverride?: string): CandidateFreezeManifest {
  const candidate = candidateOverride ?? readSourceCommit();
  if (!/^[0-9a-f]{40}$/.test(candidate)) {
    const message = `candidate freeze requires a concrete 40-hex source commit; got ${candidate}`;
    throw new Error(message);
  }

  const paths = candidateFrozenFilePaths();
  const files = paths.map((path) => ({ path, sha256: sha256FileBytes(path) }));
  return {
    manifest: CANDIDATE_FREEZE_MANIFEST_ID,
    manifest_version: CANDIDATE_FREEZE_MANIFEST_VERSION,
    release_candidate_id: candidate,
    release_gate_definition_sha256: releaseGateDefinitionHash(),
    excluded_mutable_paths: {
      exact: [...ALLOWED_POST_CANDIDATE_EXACT_PATHS].sort(),
      prefixes: [...ALLOWED_POST_CANDIDATE_PREFIXES],
    },
    frozen_file_count: files.length,
    files,
  };
}

function readCandidateFreezeManifest(): CandidateFreezeManifest {
  if (!exists(CANDIDATE_FREEZE_MANIFEST_PATH)) {
    throw new Error(`missing ${CANDIDATE_FREEZE_MANIFEST_PATH}`);
  }
  return loadJson<CandidateFreezeManifest>(CANDIDATE_FREEZE_MANIFEST_PATH);
}

/** Pure equivalence judgment over already-observed candidate state. */
export function checkCandidateEquivalenceFromState(
  state: CandidateEquivalenceState,
): SnapshotManifestCheckResult {
  const {
    freeze,
    pinnedCandidate,
    enforcePinnedCandidate,
    currentGateDefinitionSha256,
    currentFiles,
  } = state;

  if (enforcePinnedCandidate && pinnedCandidate !== freeze.release_candidate_id) {
    const message =
      `candidate freeze manifest pins ${freeze.release_candidate_id} but ` +
      `gate index pins ${String(pinnedCandidate)}`;
    return { ok: false, message };
  }
  if (freeze.manifest !== CANDIDATE_FREEZE_MANIFEST_ID) {
    const message = `unexpected candidate freeze manifest id: ${freeze.manifest}`;
    return { ok: false, message };
  }
  if (freeze.manifest_version !== CANDIDATE_FREEZE_MANIFEST_VERSION) {
    const message = `unsupported candidate freeze manifest version: ${freeze.manifest_version}`;
    return { ok: false, message };
  }
  if (currentGateDefinitionSha256 !== freeze.release_gate_definition_sha256) {
    const message =
      "Release 1 gate definitions changed after candidate freeze " +
      `(${freeze.release_gate_definition_sha256} -> ${currentGateDefinitionSha256})`;
    return { ok: false, message };
  }

  const currentPaths = currentFiles.map((entry) => entry.path);
  const frozenPaths = freeze.files.map((entry) => entry.path);
  if (JSON.stringify(currentPaths) !== JSON.stringify(frozenPaths)) {
    const frozenSet = new Set(frozenPaths);
    const currentSet = new Set(currentPaths);
    const added = currentPaths.filter((path) => !frozenSet.has(path));
    const removed = frozenPaths.filter((path) => !currentSet.has(path));
    const message =
      "candidate-frozen file set changed " +
      `(added: ${added.join(", ") || "none"}; ` +
      `removed: ${removed.join(", ") || "none"})`;
    return { ok: false, message };
  }

  const currentByPath = new Map(currentFiles.map((entry) => [entry.path, entry.sha256]));
  const mismatches = freeze.files
    .filter((entry) => currentByPath.get(entry.path) !== entry.sha256)
    .map((entry) => entry.path);
  if (mismatches.length > 0) {
    const message = `candidate-frozen file bytes changed: ${mismatches.join(", ")}`;
    return { ok: false, message };
  }

  const message =
    `candidate ${freeze.release_candidate_id} remains equivalent; ` +
    `${freeze.frozen_file_count} frozen files and gate definitions unchanged`;
  return { ok: true, message };
}

/**
 * Prove that current repository/public content is byte-identical to the
 * candidate freeze inventory, while allowing only release-decision/evidence
 * paths to evolve during gate closure.
 */
export function checkCandidateEquivalence(
  freezeOverride?: CandidateFreezeManifest,
): SnapshotManifestCheckResult {
  let freeze: CandidateFreezeManifest;
  try {
    freeze = freezeOverride ?? readCandidateFreezeManifest();
  } catch (error) {
    return { ok: false, message: String(error) };
  }

  let currentPaths: string[];
  try {
    currentPaths = candidateFrozenFilePaths();
  } catch (error) {
    return { ok: false, message: String(error) };
  }

  const currentFiles: SnapshotFileEntry[] = [];
  for (const path of currentPaths) {
    if (!exists(path)) continue;
    try {
      currentFiles.push({ path, sha256: sha256FileBytes(path) });
    } catch (error) {
      return { ok: false, message: String(error) };
    }
  }

  return checkCandidateEquivalenceFromState({
    freeze,
    pinnedCandidate: readPinnedCandidate(),
    enforcePinnedCandidate: freezeOverride === undefined,
    currentGateDefinitionSha256: releaseGateDefinitionHash(),
    currentFiles,
  });
}

/**
 * Structural sanity check, not a drift check against a frozen expectation.
 * Before the first Public Draft there is no frozen hash to compare against.
 */
export function checkSnapshotManifestMechanism(): SnapshotManifestCheckResult {
  const first = buildSnapshotManifest();
  if (first.file_count === 0) {
    return { ok: false, message: "no snapshot-scoped authoritative files found" };
  }
  if (first.files.some((entry) => entry.path === RELEASE_GATE_REGISTRY_PATH)) {
    return {
      ok: false,
      message: "release-decision-only gate registry leaked into Protocol snapshot scope",
    };
  }

  const second = buildSnapshotManifest();
  const firstHash = snapshotHash(first);
  const secondHash = snapshotHash(second);
  if (firstHash !== secondHash) {
    const message =
      "non-deterministic hash across two builds in one process " +
      `(${firstHash} vs ${secondHash})`;
    return { ok: false, message };
  }

  const message =
    `${first.file_count} Protocol snapshot files, ` + `deterministic content hash ${firstHash}`;
  return { ok: true, message };
}
