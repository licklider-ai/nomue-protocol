/**
 * Cross-artifact consistency checks. Pure functions over loaded data so that
 * conflict detection is unit-testable; filesystem access is injected.
 */

import { collectAnchors, stripCode } from "./markdown.js";
import type { Issue } from "./repo.js";
import type {
  AuthorityManifest,
  ConformanceManifest,
  GateIndex,
  GatesRegistry,
  RequirementsRegistry,
} from "./types.js";

export const EXPECTED_GATE_IDS: string[] = [
  "R1-01",
  "R1-02",
  "R1-03",
  "R1-04",
  "R1-05",
  "R1-06",
  "R1-07",
  "R1-08",
  "R1-09",
  "R1-10",
  "R1-11",
  "R1-12",
  "R1-13",
  "R1-14",
];

export const EXPECTED_CONFORMANCE_FAMILIES: string[] = [
  "structural",
  "semantic",
  "canonicalization",
  "public_checks",
  "strict_json",
  "routing",
  "attestation",
  "verifier_behavior",
  "emitter",
  "approval",
  "lifecycle",
  "numerical_contract",
];

/** Authority targets that the manifest is required to declare. */
export const REQUIRED_TARGET_IDS: string[] = [
  "mission-scope-non-goals",
  "authority-location-and-conflicts",
  "normative-meaning",
  "requirement-ids",
  "vocabulary",
  "stability-tiers",
  "json-structure",
  "conformance-judgment",
  "release-decision",
  "public-checks",
  "reason-codes",
  "state-invariants",
];

/** Targets that may assign `class: evidence` artifacts as limited authority. */
export const EVIDENCE_AUTHORITY_TARGET_IDS = new Set([
  "phase-1-development-evidence",
  "phase-2a-development-evidence",
  "release-decision",
]);

/** Directories whose contents are generated and never authoritative. */
export const GENERATED_ROOTS: string[] = ["generated/", "bindings/typescript/generated/"];

function duplicates(values: string[]): string[] {
  const seen = new Set<string>();
  const dup = new Set<string>();
  for (const v of values) {
    if (seen.has(v)) dup.add(v);
    seen.add(v);
  }
  return [...dup];
}

/**
 * Requirement traceability between the registry and the normative documents.
 * `specDocs` maps repository-relative paths of all spec markdown files to
 * their raw content.
 */
export function checkRequirementTraceability(
  registry: RequirementsRegistry,
  specDocs: Map<string, string>,
): Issue[] {
  const check = "requirement-traceability";
  const issues: Issue[] = [];

  for (const id of duplicates(registry.requirements.map((r) => r.id))) {
    issues.push({ check, message: `duplicate Requirement ID ${id} in registry` });
  }

  const anchorsByDoc = new Map<string, Map<string, number>>();
  for (const [doc, content] of specDocs) {
    const counts = new Map<string, number>();
    for (const hit of collectAnchors(stripCode(content))) {
      counts.set(hit.id, (counts.get(hit.id) ?? 0) + 1);
    }
    anchorsByDoc.set(doc, counts);
  }

  const registryByAnchor = new Map(registry.requirements.map((r) => [r.anchor, r]));
  const knownIds = new Set(registry.requirements.map((r) => r.id));

  for (const req of registry.requirements) {
    const docAnchors = anchorsByDoc.get(req.document);
    if (docAnchors === undefined) {
      issues.push({
        check,
        file: req.document,
        message: `document for ${req.id} does not exist or is outside the spec tree`,
      });
      continue;
    }
    const count = docAnchors.get(req.anchor) ?? 0;
    if (count === 0 && req.status !== "withdrawn") {
      issues.push({
        check,
        file: req.document,
        message: `orphan requirement ${req.id}: anchor ${req.anchor} not found in document`,
      });
    }
    if (count > 1) {
      issues.push({
        check,
        file: req.document,
        message: `anchor ${req.anchor} appears ${count} times; exactly one occurrence is allowed`,
      });
    }
    for (const [field, ref] of [
      ["supersedes", req.supersedes],
      ["superseded_by", req.superseded_by],
    ] as const) {
      if (ref !== null && !knownIds.has(ref)) {
        issues.push({ check, message: `${req.id}.${field} references unknown ID ${ref}` });
      }
    }
  }

  for (const [doc, counts] of anchorsByDoc) {
    for (const [anchor, count] of counts) {
      const owner = registryByAnchor.get(anchor);
      if (owner === undefined) {
        issues.push({
          check,
          file: doc,
          message: `orphan anchor ${anchor}: not registered in the requirement registry`,
        });
      } else if (owner.document !== doc) {
        issues.push({
          check,
          file: doc,
          message: `anchor ${anchor} found here but the registry places it in ${owner.document} (${count} occurrence(s))`,
        });
      }
    }
  }

  return issues;
}

export interface AuthorityCtx {
  /** Whether a repository-relative path exists as a file. */
  exists(rel: string): boolean;
  /** Repository-relative paths of all files physically under generated/. */
  generatedFiles(): string[];
  /** Repository-relative paths of all markdown files under spec/. */
  specDocs(): string[];
}

/** Structural and classification checks over the authority manifest. */
export function checkAuthorityManifest(manifest: AuthorityManifest, ctx: AuthorityCtx): Issue[] {
  const check = "authority-manifest";
  const issues: Issue[] = [];

  const paths = manifest.artifacts.map((a) => a.path);
  for (const p of duplicates(paths)) {
    issues.push({ check, message: `artifact ${p} is classified more than once` });
  }

  const classByPath = new Map(manifest.artifacts.map((a) => [a.path, a.class]));

  for (const artifact of manifest.artifacts) {
    if (!ctx.exists(artifact.path)) {
      issues.push({ check, file: artifact.path, message: "declared artifact does not exist" });
    }
    const inGenerated = GENERATED_ROOTS.some((root) => artifact.path.startsWith(root));
    const inReference = artifact.path.startsWith("reference/");
    const inEvidence = artifact.path.startsWith("evidence/");
    if (artifact.class === "generated" && !inGenerated) {
      issues.push({
        check,
        file: artifact.path,
        message: "classified generated but not located under a generated root",
      });
    }
    if (artifact.class !== "generated" && inGenerated) {
      issues.push({
        check,
        file: artifact.path,
        message: `located under generated/ but classified ${artifact.class}; generated artifacts are never authoritative`,
      });
    }
    if (artifact.class === "reference" && !inReference) {
      issues.push({
        check,
        file: artifact.path,
        message: "classified reference but not located under reference/",
      });
    }
    if (artifact.class === "authoritative" && (inReference || inGenerated)) {
      issues.push({
        check,
        file: artifact.path,
        message: "reference and generated artifacts are never authoritative",
      });
    }
    if (artifact.class === "evidence" && !inEvidence) {
      issues.push({
        check,
        file: artifact.path,
        message: "classified evidence but not located under evidence/",
      });
    }
  }

  for (const id of duplicates(manifest.targets.map((t) => t.target_id))) {
    issues.push({ check, message: `duplicate target_id ${id}` });
  }
  const targetIds = new Set(manifest.targets.map((t) => t.target_id));
  for (const required of REQUIRED_TARGET_IDS) {
    if (!targetIds.has(required)) {
      issues.push({ check, message: `required authority target ${required} is missing` });
    }
  }
  for (const target of manifest.targets) {
    for (const ref of target.authoritative_artifacts) {
      const cls = classByPath.get(ref);
      if (cls === undefined) {
        issues.push({
          check,
          message: `target ${target.target_id} references ${ref}, which is not a classified artifact`,
        });
      } else if (cls === "evidence") {
        if (!EVIDENCE_AUTHORITY_TARGET_IDS.has(target.target_id)) {
          issues.push({
            check,
            message: `evidence artifact ${ref} cannot carry authority for semantic target ${target.target_id}`,
          });
        }
      } else if (cls !== "authoritative") {
        issues.push({
          check,
          message: `target ${target.target_id} references ${ref} as authority, but it is classified ${cls}`,
        });
      }
    }
  }

  const assignedAuthoritative = new Set(
    manifest.targets.flatMap((target) => target.authoritative_artifacts),
  );
  for (const artifact of manifest.artifacts) {
    if (artifact.class === "authoritative" && !assignedAuthoritative.has(artifact.path)) {
      issues.push({
        check,
        file: artifact.path,
        message: `authoritative artifact ${artifact.path} is not assigned to any authority target`,
      });
    }
  }

  for (const file of ctx.generatedFiles()) {
    if (classByPath.get(file) !== "generated") {
      issues.push({
        check,
        file,
        message: "file under generated/ is not classified as generated in the manifest",
      });
    }
  }

  for (const doc of ctx.specDocs()) {
    if (!classByPath.has(doc)) {
      issues.push({
        check,
        file: doc,
        message: "spec document is not classified in the authority manifest",
      });
    }
  }

  return issues;
}

/**
 * Requirement anchors are only allowed in spec documents classified
 * authoritative; informative documents carry none (outside code examples).
 */
export function checkSpecClassification(
  manifest: AuthorityManifest,
  specDocs: Map<string, string>,
): Issue[] {
  const check = "spec-classification";
  const issues: Issue[] = [];
  const classByPath = new Map(manifest.artifacts.map((a) => [a.path, a.class]));
  for (const [doc, content] of specDocs) {
    const anchors = collectAnchors(stripCode(content));
    const cls = classByPath.get(doc);
    if (anchors.length > 0 && cls !== "authoritative") {
      issues.push({
        check,
        file: doc,
        message: `contains requirement anchors but is classified ${cls ?? "unclassified"}`,
      });
    }
  }
  return issues;
}

export function checkGatesRegistry(
  gates: GatesRegistry,
  knownRequirementIds: Set<string>,
): Issue[] {
  const check = "release-gates";
  const issues: Issue[] = [];

  const ids = gates.gates.map((g) => g.gate_id);
  for (const id of duplicates(ids)) {
    issues.push({ check, message: `duplicate gate_id ${id}` });
  }
  const idSet = new Set(ids);
  for (const expected of EXPECTED_GATE_IDS) {
    if (!idSet.has(expected)) issues.push({ check, message: `gate ${expected} is missing` });
  }
  for (const id of idSet) {
    if (!EXPECTED_GATE_IDS.includes(id)) {
      issues.push({ check, message: `unexpected gate_id ${id}` });
    }
  }

  for (const gate of gates.gates) {
    if (gate.state !== "closed" && gate.decision !== null) {
      issues.push({
        check,
        message: `gate ${gate.gate_id} has decision ${String(gate.decision)} while state is ${gate.state}; decisions require a closed gate`,
      });
    }
    if (gate.state === "closed" && gate.decision === null) {
      issues.push({
        check,
        message: `gate ${gate.gate_id} is closed without a decision`,
      });
    }
    for (const ref of gate.related_requirement_ids) {
      if (!knownRequirementIds.has(ref)) {
        issues.push({
          check,
          message: `gate ${gate.gate_id} references unknown requirement ${ref}`,
        });
      }
    }
  }
  return issues;
}

/** The evidence gate index must mirror the gate registry exactly. */
export function checkGateIndex(gates: GatesRegistry, index: GateIndex): Issue[] {
  const check = "gate-index";
  const issues: Issue[] = [];

  if (index.gate_registry_version !== gates.registry_version) {
    issues.push({
      check,
      message: `gate_registry_version ${index.gate_registry_version} does not match gate registry version ${gates.registry_version}`,
    });
  }

  const registryById = new Map(gates.gates.map((g) => [g.gate_id, g]));
  const indexById = new Map(index.gates.map((g) => [g.gate_id, g]));

  for (const id of registryById.keys()) {
    if (!indexById.has(id)) issues.push({ check, message: `gate ${id} missing from gate-index` });
  }
  for (const id of indexById.keys()) {
    if (!registryById.has(id)) {
      issues.push({ check, message: `gate-index entry ${id} does not exist in the gate registry` });
    }
  }

  for (const [id, entry] of indexById) {
    const reg = registryById.get(id);
    if (reg === undefined) continue;
    if (entry.state !== reg.state) {
      issues.push({
        check,
        message: `gate ${id}: state conflict between registry (${reg.state}) and gate-index (${entry.state})`,
      });
    }
    if (entry.decision !== reg.decision) {
      issues.push({
        check,
        message: `gate ${id}: decision conflict between registry (${String(reg.decision)}) and gate-index (${String(entry.decision)})`,
      });
    }
    if ((entry.state === "open" || entry.state === "ready_for_review") && entry.decision !== null) {
      issues.push({
        check,
        message: `gate ${id}: decision recorded while state is ${entry.state}`,
      });
    }
    if (entry.state === "closed") {
      if (index.release_candidate_id === null) {
        issues.push({
          check,
          message: `gate ${id}: closed while release_candidate_id is null`,
        });
      }
      if (entry.decision === null) {
        issues.push({ check, message: `gate ${id}: closed without decision` });
      }
      if (entry.evidence.length === 0) {
        issues.push({ check, message: `gate ${id}: closed without evidence` });
      }
      if (entry.reviewed_by.length === 0) {
        issues.push({ check, message: `gate ${id}: closed without reviewed_by` });
      }
      if (entry.decided_at === null) {
        issues.push({ check, message: `gate ${id}: closed without decided_at` });
      }
    }
    if (entry.decision !== null && entry.decided_at === null) {
      issues.push({ check, message: `gate ${id}: decision without decided_at` });
    }
  }

  const anyClosed = index.gates.some((g) => g.state === "closed");
  if (index.release_candidate_id === null && anyClosed) {
    issues.push({
      check,
      message: "release_candidate_id is null but at least one gate is closed",
    });
  }

  const anyDecision = index.gates.some((g) => g.decision !== null);
  if (anyDecision && index.release_candidate_id === null) {
    issues.push({
      check,
      message: "gate decisions exist but release_candidate_id is null",
    });
  }

  return issues;
}

export function checkConformanceManifest(
  manifest: ConformanceManifest,
  knownRequirementIds: Set<string>,
): Issue[] {
  const check = "conformance-manifest";
  const issues: Issue[] = [];

  const names = manifest.families.map((f) => f.family);
  for (const name of duplicates(names)) {
    issues.push({ check, message: `duplicate family ${name}` });
  }
  const nameSet = new Set(names);
  for (const expected of EXPECTED_CONFORMANCE_FAMILIES) {
    if (!nameSet.has(expected)) issues.push({ check, message: `family ${expected} is missing` });
  }
  for (const name of nameSet) {
    if (!EXPECTED_CONFORMANCE_FAMILIES.includes(name)) {
      issues.push({ check, message: `unexpected family ${name}` });
    }
  }

  for (const family of manifest.families) {
    if (family.status !== "reserved" && family.status !== "active") {
      issues.push({
        check,
        message: `family ${family.family} has invalid status ${family.status}`,
      });
    }
    if (family.status === "reserved" && family.fixtures.length > 0) {
      issues.push({
        check,
        message: `family ${family.family} is reserved but lists fixtures`,
      });
    }
    for (const ref of family.requirement_ids) {
      if (!knownRequirementIds.has(ref)) {
        issues.push({
          check,
          message: `family ${family.family} references unknown requirement ${ref}`,
        });
      }
    }
  }
  return issues;
}

/** Withdrawn requirements must not remain on current machine-readable authority surfaces. */
export function checkWithdrawnNotCurrentAuthority(
  registry: RequirementsRegistry,
  conformance: ConformanceManifest,
  surfaces: { entries: Array<{ surface_id: string; requirement_ids?: string[] }> },
  publicChecks: { checks: Array<{ check_id: string; requirement_ids?: string[] }> },
): Issue[] {
  const check = "withdrawn-requirement-authority";
  const issues: Issue[] = [];
  const withdrawn = new Set(
    registry.requirements.filter((r) => r.status === "withdrawn").map((r) => r.id),
  );

  const cite = (context: string, id: string): void => {
    if (withdrawn.has(id)) {
      issues.push({ check, message: `${context} references withdrawn requirement ${id}` });
    }
  };

  for (const entry of surfaces.entries) {
    for (const id of entry.requirement_ids ?? []) {
      cite(`surface ${entry.surface_id}`, id);
    }
  }

  for (const checkEntry of publicChecks.checks) {
    for (const id of checkEntry.requirement_ids ?? []) {
      cite(`public check ${checkEntry.check_id}`, id);
    }
  }

  for (const family of conformance.families) {
    for (const id of family.requirement_ids) {
      cite(`conformance family ${family.family}`, id);
    }
    for (const fixture of family.fixtures) {
      const row = fixture as { fixture_id?: string; requirement_ids?: string[] };
      for (const id of row.requirement_ids ?? []) {
        cite(`fixture ${row.fixture_id ?? "(unknown)"}`, id);
      }
    }
  }

  return issues;
}
