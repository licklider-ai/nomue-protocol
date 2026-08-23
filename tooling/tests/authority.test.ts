import { describe, expect, it } from "vitest";
import {
  checkAuthorityManifest,
  checkConformanceManifest,
  checkGateIndex,
  checkGatesRegistry,
  checkSpecClassification,
  EVIDENCE_AUTHORITY_TARGET_IDS,
  EXPECTED_GATE_IDS,
  type AuthorityCtx,
} from "../src/lib/checks.js";
import {
  loadAuthorityManifest,
  loadConformance,
  loadGateIndex,
  loadGates,
  loadRequirements,
} from "../src/lib/load.js";
import { exists, markdownFiles, readText, walkFiles } from "../src/lib/repo.js";
import type { AuthorityManifest } from "../src/lib/types.js";

const realCtx: AuthorityCtx = {
  exists,
  generatedFiles: () =>
    ["generated", "bindings/typescript/generated"].flatMap((root) =>
      walkFiles(root)
        .filter((f) => !f.isSymlink)
        .map((f) => f.rel),
    ),
  specDocs: () => [...markdownFiles("spec"), ...markdownFiles("canonicalization")],
};

const specDocs = (): Map<string, string> =>
  new Map(
    [...markdownFiles("spec"), ...markdownFiles("canonicalization")].map((rel) => [
      rel,
      readText(rel),
    ]),
  );

describe("authority manifest (repository state)", () => {
  it("validates with zero issues", () => {
    expect(checkAuthorityManifest(loadAuthorityManifest(), realCtx)).toEqual([]);
  });

  it("keeps requirement anchors only in authoritative spec documents", () => {
    expect(checkSpecClassification(loadAuthorityManifest(), specDocs())).toEqual([]);
  });

  it("classifies every requirement document as authoritative", () => {
    const manifest = loadAuthorityManifest();
    const classByPath = new Map(manifest.artifacts.map((a) => [a.path, a.class]));
    for (const req of loadRequirements().requirements) {
      expect(classByPath.get(req.document), req.id).toBe("authoritative");
    }
  });

  it("assigns every authoritative artifact to at least one authority target", () => {
    const manifest = loadAuthorityManifest();
    const assigned = new Set(manifest.targets.flatMap((t) => t.authoritative_artifacts));
    const orphans = manifest.artifacts
      .filter((a) => a.class === "authoritative" && !assigned.has(a.path))
      .map((a) => a.path);
    expect(orphans).toEqual([]);
  });

  it("exports the allowed evidence-authority target set", () => {
    expect([...EVIDENCE_AUTHORITY_TARGET_IDS].sort()).toEqual([
      "phase-1-development-evidence",
      "phase-2a-development-evidence",
      "release-decision",
    ]);
  });
});

describe("authority manifest (conflict detection)", () => {
  const base = (): AuthorityManifest => loadAuthorityManifest();

  it("rejects a generated artifact classified as authoritative", () => {
    const manifest = base();
    manifest.artifacts.push({ path: "generated/REQUIREMENTS.md", class: "authoritative" });
    const issues = checkAuthorityManifest(manifest, realCtx);
    expect(issues.some((i) => i.message.includes("classified more than once"))).toBe(true);
    const single = base();
    const entry = single.artifacts.find((a) => a.path === "generated/REQUIREMENTS.md");
    if (entry === undefined) throw new Error("expected generated entry");
    entry.class = "authoritative";
    const singleIssues = checkAuthorityManifest(single, realCtx);
    expect(singleIssues.some((i) => i.message.includes("never authoritative"))).toBe(true);
  });

  it("rejects a target whose authority is only informative", () => {
    const manifest = base();
    manifest.targets.push({
      target_id: "bogus-target",
      description: "test",
      authoritative_artifacts: ["README.md"],
    });
    const issues = checkAuthorityManifest(manifest, realCtx);
    expect(issues.some((i) => i.message.includes("classified informative"))).toBe(true);
  });

  it("rejects a missing required target", () => {
    const manifest = base();
    manifest.targets = manifest.targets.filter((t) => t.target_id !== "release-decision");
    const issues = checkAuthorityManifest(manifest, realCtx);
    expect(issues.some((i) => i.message.includes("release-decision"))).toBe(true);
  });

  it("rejects declared artifacts that do not exist", () => {
    const manifest = base();
    manifest.artifacts.push({ path: "spec/core/no-such-file.md", class: "informative" });
    const issues = checkAuthorityManifest(manifest, realCtx);
    expect(issues.some((i) => i.message.includes("does not exist"))).toBe(true);
  });

  it("rejects an authoritative artifact not assigned to any authority target", () => {
    const manifest = base();
    const orphanPath = "spec/core/record-envelope.md";
    for (const target of manifest.targets) {
      target.authoritative_artifacts = target.authoritative_artifacts.filter(
        (path) => path !== orphanPath,
      );
    }
    const issues = checkAuthorityManifest(manifest, realCtx);
    expect(issues.some((i) => i.message.includes("is not assigned to any authority target"))).toBe(
      true,
    );
    expect(issues.some((i) => i.file === orphanPath)).toBe(true);
  });

  it("rejects an evidence artifact assigned to a semantic target", () => {
    const manifest = base();
    const normative = manifest.targets.find((t) => t.target_id === "normative-meaning");
    if (normative === undefined) throw new Error("missing normative-meaning target");
    normative.authoritative_artifacts.push("evidence/development/phase-1/phase-1-manifest.json");
    const issues = checkAuthorityManifest(manifest, realCtx);
    expect(
      issues.some((i) =>
        i.message.includes(
          "evidence artifact evidence/development/phase-1/phase-1-manifest.json cannot carry authority for semantic target normative-meaning",
        ),
      ),
    ).toBe(true);
  });

  it("allows evidence artifacts on phase-1-development-evidence", () => {
    const manifest = base();
    const target = manifest.targets.find((t) => t.target_id === "phase-1-development-evidence");
    if (target === undefined) throw new Error("missing phase-1-development-evidence target");
    expect(target.authoritative_artifacts).toContain(
      "evidence/development/phase-1/phase-1-manifest.json",
    );
    expect(checkAuthorityManifest(manifest, realCtx)).toEqual([]);
  });
});

describe("release gates", () => {
  it("registers exactly R1-01 through R1-14", () => {
    const gates = loadGates();
    expect(gates.gates.map((g) => g.gate_id)).toEqual(EXPECTED_GATE_IDS);
  });

  it("validates against the requirement registry with zero issues", () => {
    const known = new Set(loadRequirements().requirements.map((r) => r.id));
    expect(checkGatesRegistry(loadGates(), known)).toEqual([]);
  });

  it("rejects a decision on a non-closed gate", () => {
    const gates = loadGates();
    const openGate = gates.gates[0];
    if (openGate === undefined) throw new Error("no gates");
    openGate.state = "open";
    openGate.decision = "pass";
    const known = new Set(loadRequirements().requirements.map((r) => r.id));
    const issues = checkGatesRegistry(gates, known);
    expect(issues.some((i) => i.message.includes("decisions require a closed gate"))).toBe(true);
  });
});

describe("gate index (evidence skeleton)", () => {
  it("mirrors the gate registry with zero issues", () => {
    expect(checkGateIndex(loadGates(), loadGateIndex())).toEqual([]);
  });

  it("keeps gate state synchronized before or after Release Candidate pin", () => {
    const gates = loadGates();
    const index = loadGateIndex();
    if (index.release_candidate_id !== null) {
      expect(index.release_candidate_id).toMatch(/^[0-9a-f]{40}$/);
    }
    for (const gate of gates.gates) {
      const entry = index.gates.find((g) => g.gate_id === gate.gate_id);
      if (entry === undefined) throw new Error(`missing gate-index entry for ${gate.gate_id}`);
      expect(entry.state, gate.gate_id).toBe(gate.state);
      expect(entry.decision, gate.gate_id).toBe(gate.decision);
    }
  });

  it("accepts coherent synthetic gate states across the release lifecycle", () => {
    const known = new Set(loadRequirements().requirements.map((r) => r.id));
    for (const state of ["open", "ready_for_review", "closed"] as const) {
      const gates = loadGates();
      const index = loadGateIndex();
      index.release_candidate_id = "a".repeat(40);
      for (const gate of gates.gates) {
        gate.state = state;
        gate.decision = state === "closed" ? "pass" : null;
        const entry = index.gates.find((g) => g.gate_id === gate.gate_id);
        if (entry === undefined) throw new Error(`missing gate-index entry for ${gate.gate_id}`);
        entry.state = state;
        entry.decision = state === "closed" ? "pass" : null;
        entry.evidence =
          state === "closed" ? [`evidence/release-1/gates/${gate.gate_id}/synthetic.md`] : [];
        entry.reviewed_by = state === "closed" ? ["synthetic-reviewer"] : [];
        entry.decided_at = state === "closed" ? "2026-08-20T00:00:00Z" : null;
      }
      expect(checkGatesRegistry(gates, known), state).toEqual([]);
      expect(checkGateIndex(gates, index), state).toEqual([]);
    }
  });

  it("rejects a closed gate while release_candidate_id is null", () => {
    const gates = loadGates();
    const index = loadGateIndex();
    index.release_candidate_id = null;
    const entry = index.gates[0];
    if (entry === undefined) throw new Error("no gate index entries");
    entry.state = "closed";
    entry.decision = "pass";
    entry.evidence = ["evidence/release-1/gates/R1-01/close-record.md"];
    entry.reviewed_by = ["release-gate-steward"];
    entry.decided_at = "2026-08-13T06:40:00Z";
    const issues = checkGateIndex(gates, index);
    expect(issues.some((i) => i.message.includes("release_candidate_id is null"))).toBe(true);
  });

  it("rejects a closed gate without required close metadata", () => {
    const gates = loadGates();
    const index = loadGateIndex();
    index.release_candidate_id = "abc123";
    const entry = index.gates[0];
    if (entry === undefined) throw new Error("no gate index entries");
    entry.state = "closed";
    entry.decision = "pass";
    entry.evidence = [];
    entry.reviewed_by = [];
    entry.decided_at = null;
    const issues = checkGateIndex(gates, index);
    expect(issues.some((i) => i.message.includes("closed without evidence"))).toBe(true);
    expect(issues.some((i) => i.message.includes("closed without reviewed_by"))).toBe(true);
    expect(issues.some((i) => i.message.includes("closed without decided_at"))).toBe(true);
  });

  it("detects state conflicts between registry and index", () => {
    const gates = loadGates();
    const index = loadGateIndex();
    const entry = index.gates[0];
    const registryEntry = gates.gates[0];
    if (entry === undefined || registryEntry === undefined) throw new Error("no gate entries");
    entry.state = registryEntry.state === "open" ? "ready_for_review" : "open";
    const issues = checkGateIndex(gates, index);
    expect(issues.some((i) => i.message.includes("state conflict"))).toBe(true);
  });
});

describe("conformance manifest (Phase 1)", () => {
  const ACTIVE = [
    "structural",
    "semantic",
    "canonicalization",
    "public_checks",
    "strict_json",
    "routing",
    "verifier_behavior",
    "numerical_contract",
    "emitter",
    "approval",
    "lifecycle",
  ];
  const RESERVED = ["attestation"];

  it("activates the Phase 1 (emitter, approval) families and keeps attestation reserved", () => {
    const manifest = loadConformance();
    const known = new Set(loadRequirements().requirements.map((r) => r.id));
    expect(checkConformanceManifest(manifest, known)).toEqual([]);
    for (const family of manifest.families) {
      if (ACTIVE.includes(family.family)) {
        expect(family.status, family.family).toBe("active");
      } else {
        expect(RESERVED, family.family).toContain(family.family);
        expect(family.status, family.family).toBe("reserved");
        expect(family.fixtures, family.family).toEqual([]);
        expect(family.requirement_ids, family.family).toEqual([]);
      }
    }
  });

  it("registers the expected fixture counts per active family", () => {
    const manifest = loadConformance();
    const counts = new Map(manifest.families.map((f) => [f.family, f.fixtures.length]));
    expect(counts.get("structural")).toBe(3);
    expect(counts.get("semantic")).toBe(14);
    expect(counts.get("public_checks")).toBe(38);
    expect(counts.get("strict_json")).toBe(19);
    expect(counts.get("routing")).toBe(9);
    expect(counts.get("verifier_behavior")).toBe(23);
    expect(counts.get("numerical_contract")).toBe(6);
    expect(counts.get("emitter")).toBe(5);
    expect(counts.get("approval")).toBe(3);
    expect(counts.get("lifecycle")).toBe(12);
  });

  it("rejects fixtures on a reserved family", () => {
    const manifest = loadConformance();
    const family = manifest.families.find((f) => f.family === "attestation");
    if (family === undefined) throw new Error("no attestation family");
    family.fixtures = [{ id: "fx-1" }];
    const known = new Set(loadRequirements().requirements.map((r) => r.id));
    const issues = checkConformanceManifest(manifest, known);
    expect(issues.some((i) => i.message.includes("reserved but lists fixtures"))).toBe(true);
  });
});
