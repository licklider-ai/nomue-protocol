import { describe, expect, it } from "vitest";
import {
  CANDIDATE_FREEZE_MANIFEST_VERSION,
  SNAPSHOT_MANIFEST_VERSION,
  SNAPSHOT_SCOPE,
  buildCandidateFreezeManifest,
  buildSnapshotManifest,
  candidateBytesSha256,
  candidateFrozenFilePathsFromEntries,
  checkCandidateEquivalence,
  checkCandidateEquivalenceFromState,
  releaseGateDefinitionHash,
  releaseGateDefinitionHashFromRegistry,
  snapshotAuthoritativeFilePaths,
  snapshotTextSha256,
  type CandidateFreezeManifest,
  type ReleaseGateRegistryFile,
  type SnapshotFileEntry,
} from "../src/release/snapshot-manifest.js";

const CANDIDATE_ID = "0".repeat(40);
const BASE_FREEZE = buildCandidateFreezeManifest(CANDIDATE_ID);

function cloneFreeze(): CandidateFreezeManifest {
  return structuredClone(BASE_FREEZE);
}

function flipHex(value: string): string {
  return `${value[0] === "0" ? "1" : "0"}${value.slice(1)}`;
}

function judge(
  freeze: CandidateFreezeManifest,
  currentFiles: SnapshotFileEntry[] = freeze.files,
  overrides: Partial<{
    pinnedCandidate: string | null;
    enforcePinnedCandidate: boolean;
    currentGateDefinitionSha256: string;
  }> = {},
) {
  return checkCandidateEquivalenceFromState({
    freeze,
    pinnedCandidate: overrides.pinnedCandidate ?? freeze.release_candidate_id,
    enforcePinnedCandidate: overrides.enforcePinnedCandidate ?? true,
    currentGateDefinitionSha256:
      overrides.currentGateDefinitionSha256 ?? freeze.release_gate_definition_sha256,
    currentFiles,
  });
}

describe("Release 1 Protocol snapshot scope (ADR-0033)", () => {
  it("includes Protocol authority but excludes release-decision-only authority", () => {
    const paths = snapshotAuthoritativeFilePaths();
    expect(paths).toContain("CHARTER.md");
    expect(paths).toContain("authority/authority-manifest.yaml");
    expect(paths).not.toContain("authority/release-1-gates.yaml");
    expect(paths).not.toContain("evidence/release-1/gate-index.json");
  });

  it("self-describes the repaired snapshot scope and manifest version", () => {
    const manifest = buildSnapshotManifest();
    expect(manifest.manifest_version).toBe(SNAPSHOT_MANIFEST_VERSION);
    expect(manifest.manifest_version).toBe("0.2.0");
    expect(manifest.snapshot_scope).toBe(SNAPSHOT_SCOPE);
    expect(manifest.excluded_authority_targets).toEqual(["release-decision"]);
    expect("source_commit" in manifest).toBe(false);
  });

  it("accepts a freshly captured candidate freeze inventory", () => {
    const freeze = cloneFreeze();
    expect(freeze.manifest_version).toBe(CANDIDATE_FREEZE_MANIFEST_VERSION);
    expect(freeze.release_gate_definition_sha256).toBe(releaseGateDefinitionHash());
    expect(freeze.release_gate_definition_sha256).toMatch(/^[0-9a-f]{64}$/);
    const result = checkCandidateEquivalence(freeze);
    expect(result.ok, result.message).toBe(true);
  });
});

describe("Release 1 candidate freeze adversarial boundary", () => {
  it("rejects a frozen-file byte change", () => {
    const freeze = cloneFreeze();
    const currentFiles = structuredClone(freeze.files);
    currentFiles[0] = {
      ...currentFiles[0],
      sha256: flipHex(currentFiles[0]?.sha256 ?? "0".repeat(64)),
    } as SnapshotFileEntry;

    const result = judge(freeze, currentFiles);
    expect(result.ok).toBe(false);
    expect(result.message).toContain("candidate-frozen file bytes changed");
  });

  it("rejects a file added to the frozen set", () => {
    const freeze = cloneFreeze();
    const currentFiles = [
      ...freeze.files,
      { path: "zz-adversarial-added.txt", sha256: "0".repeat(64) },
    ];

    const result = judge(freeze, currentFiles);
    expect(result.ok).toBe(false);
    expect(result.message).toContain("candidate-frozen file set changed");
    expect(result.message).toContain("zz-adversarial-added.txt");
  });

  it("rejects a file removed from the frozen set", () => {
    const freeze = cloneFreeze();
    const removed = freeze.files[0];
    expect(removed).toBeDefined();

    const result = judge(freeze, freeze.files.slice(1));
    expect(result.ok).toBe(false);
    expect(result.message).toContain("candidate-frozen file set changed");
    expect(result.message).toContain(removed?.path ?? "missing-path");
  });

  it("rejects a gate-definition change after freeze", () => {
    const freeze = cloneFreeze();
    const result = judge(freeze, freeze.files, {
      currentGateDefinitionSha256: flipHex(freeze.release_gate_definition_sha256),
    });

    expect(result.ok).toBe(false);
    expect(result.message).toContain("Release 1 gate definitions changed after candidate freeze");
  });

  it("rejects a candidate-id mismatch between freeze manifest and gate index", () => {
    const freeze = cloneFreeze();
    const result = judge(freeze, freeze.files, { pinnedCandidate: "f".repeat(40) });

    expect(result.ok).toBe(false);
    expect(result.message).toContain("candidate freeze manifest pins");
    expect(result.message).toContain("gate index pins");
  });

  it("excludes only the declared post-candidate mutable paths", () => {
    const paths = candidateFrozenFilePathsFromEntries([
      { rel: "README.md", isSymlink: false },
      { rel: "authority/release-1-gates.yaml", isSymlink: false },
      { rel: "generated/RELEASE-1-GATES.md", isSymlink: false },
      { rel: "evidence/release-1/gates/R1-01/close-record.md", isSymlink: false },
      { rel: "env-report.json", isSymlink: false },
    ]);

    expect(paths).toEqual(["README.md"]);
  });

  it("rejects symlinks in frozen content but permits them only under mutable evidence", () => {
    expect(() =>
      candidateFrozenFilePathsFromEntries([{ rel: "spec/adversarial-link", isSymlink: true }]),
    ).toThrow(/candidate freeze does not accept symlinks: spec\/adversarial-link/);

    expect(
      candidateFrozenFilePathsFromEntries([
        { rel: "evidence/release-1/adversarial-link", isSymlink: true },
      ]),
    ).toEqual([]);
  });

  it("freezes gate criteria while allowing state, decision, and notes bookkeeping", () => {
    const registry: ReleaseGateRegistryFile = {
      registry: "nrs-release-1-gates",
      registry_version: "0.2.0",
      gates: [
        {
          gate_id: "R1-X",
          title: "Synthetic gate",
          purpose: "Freeze the definition",
          applicability: "Applies to the candidate.",
          state: "open",
          decision: null,
          required_evidence: ["evidence-a"],
          blocking_categories: ["core_semantics"],
          related_requirement_ids: [],
          notes: "before review",
        },
      ],
    };
    const baseHash = releaseGateDefinitionHashFromRegistry(registry);

    const closureBookkeeping = structuredClone(registry);
    Object.assign(closureBookkeeping.gates[0] ?? {}, {
      state: "closed",
      decision: "pass",
      notes: "closed against the frozen candidate",
    });
    expect(releaseGateDefinitionHashFromRegistry(closureBookkeeping)).toBe(baseHash);

    const movedGoalpost = structuredClone(registry);
    Object.assign(movedGoalpost.gates[0] ?? {}, {
      required_evidence: ["evidence-a", "new-post-freeze-requirement"],
    });
    expect(releaseGateDefinitionHashFromRegistry(movedGoalpost)).not.toBe(baseHash);
  });

  it("normalizes CRLF for Protocol snapshot meaning but not for raw candidate bytes", () => {
    const lf = "alpha\nbeta\n";
    const crlf = "alpha\r\nbeta\r\n";

    expect(snapshotTextSha256(lf)).toBe(snapshotTextSha256(crlf));
    expect(candidateBytesSha256(Buffer.from(lf, "utf8"))).not.toBe(
      candidateBytesSha256(Buffer.from(crlf, "utf8")),
    );
  });
});
