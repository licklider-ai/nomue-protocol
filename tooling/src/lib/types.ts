/** Typed shapes of the authoritative YAML/JSON artifacts. */

export interface RequirementEntry {
  id: string;
  title: string;
  status: "active" | "deprecated" | "withdrawn";
  stability: "CORE" | "STABLE-INTENT" | "EXPERIMENTAL";
  document: string;
  anchor: string;
  testability: "automated" | "human_review" | "release_gate" | "not_yet_testable";
  schema_refs: string[];
  conformance_refs: string[];
  public_surface_refs: string[];
  introduced_in: string;
  supersedes: string | null;
  superseded_by: string | null;
  notes: string;
}

export interface RequirementsRegistry {
  registry: string;
  registry_version: string;
  updated: string;
  namespaces: Array<{ prefix: string; description: string }>;
  requirements: RequirementEntry[];
}

export interface VocabularyRegistry {
  registry: string;
  registry_version: string;
  updated: string;
  terms: Array<{ term: string; definition: string; notes?: string }>;
}

export interface StabilityTiersRegistry {
  registry: string;
  registry_version: string;
  updated: string;
  tiers: Array<{
    tier: "CORE" | "STABLE-INTENT" | "EXPERIMENTAL";
    summary: string;
    compatibility: string;
    rfc_min_discussion_days: number;
    approval: string;
    notes: string;
  }>;
}

export interface SurfacesRegistry {
  registry: string;
  registry_version: string;
  updated: string;
  status_note: string;
  entries: unknown[];
}

export interface BundlesRegistry {
  registry: string;
  registry_version: string;
  updated: string;
  status_note: string;
  entries: unknown[];
}

export interface GateEntry {
  gate_id: string;
  title: string;
  purpose: string;
  applicability: string;
  state: "open" | "ready_for_review" | "closed";
  decision: null | "pass" | "fail" | "not_applicable";
  required_evidence: string[];
  blocking_categories: string[];
  related_requirement_ids: string[];
  notes: string;
}

export interface GatesRegistry {
  registry: string;
  registry_version: string;
  updated: string;
  gates: GateEntry[];
}

export interface GateIndexEntry {
  gate_id: string;
  state: "open" | "ready_for_review" | "closed";
  decision: null | "pass" | "fail" | "not_applicable";
  evidence: string[];
  open_deviations: string[];
  reviewed_by: string[];
  decided_at: string | null;
}

export interface GateIndex {
  release_candidate_id: string | null;
  gate_registry_version: string;
  gates: GateIndexEntry[];
}

export type ArtifactClass =
  "authoritative" | "informative" | "generated" | "reference" | "evidence";

export interface ManifestTarget {
  target_id: string;
  description: string;
  authoritative_artifacts: string[];
}

export interface ManifestArtifact {
  path: string;
  class: ArtifactClass;
  notes?: string;
}

export interface AuthorityManifest {
  manifest: string;
  manifest_version: string;
  updated: string;
  targets: ManifestTarget[];
  artifacts: ManifestArtifact[];
}

export interface ConformanceFamily {
  family: string;
  status: string;
  fixtures: unknown[];
  requirement_ids: string[];
  normative_scope: string;
  phase_introduced: string;
}

export interface ConformanceManifest {
  manifest: string;
  manifest_version: string;
  updated: string;
  suite_status: string;
  families: ConformanceFamily[];
}
