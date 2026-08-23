/**
 * Phase 2A development-evidence generation. Deterministic: content depends
 * only on the repository state (no timestamps, absolute paths, or platform
 * identifiers). This evidence documents the Phase 2A slice; it is NOT
 * Release 1 gate evidence and never flips a gate. oracle/, runs/, and
 * reviews/ hold captured artifacts outside the regeneration set.
 */

import { createHash } from "node:crypto";
import { loadRequirements } from "../lib/load.js";
import { loadJson, loadYaml, readText } from "../lib/repo.js";
import { loadConformanceFixtures, runConformanceSuite } from "../phase1/conformance.js";
import { runCanonicalizationVectors } from "../phase1/vectors.js";
import { compilePhase1Schemas } from "../phase1/schemas.js";

const sha256Normalized = (rel: string): string =>
  createHash("sha256").update(readText(rel).replace(/\r\n/g, "\n"), "utf8").digest("hex");

const jsonFile = (value: unknown): string => `${JSON.stringify(value, null, 2)}\n`;

const PINNED_ARTIFACTS = [
  "spec/profiles/independent-two-group-continuous/admissibility.md",
  "spec/profiles/independent-two-group-continuous/effect-estimate.md",
  "spec/profiles/independent-two-group-continuous/confidence-interval.md",
  "spec/profiles/independent-two-group-continuous/non-claims.md",
  "spec/verification/profile-admissibility-check.md",
  "spec/verification/phase-2a-welch-recompute.md",
  "spec/verification/verifier-refusal.md",
  "spec/versioning/multi-bundle-dispatch.md",
  "registries/requirements.yaml",
  "registries/public-checks.yaml",
  "registries/reason-codes.yaml",
  "registries/state-invariants.yaml",
  "registries/public-contract-surfaces.yaml",
  "registries/interpretation-bundles.yaml",
  "schemas/record/record-0.2.schema.json",
  "schemas/profiles/itgc-guarantee-0.2.schema.json",
  "schemas/reports/verification-report-0.2.schema.json",
  "schemas/reports/verifier-refusal-0.2.schema.json",
  "schemas/reports/verifier-refusal-0.2-draft-2.schema.json",
  "schemas/routing/routing-envelope-0.2.schema.json",
  "schemas/common/execution-outcome-0.2.schema.json",
  "canonicalization/record-canonicalization.md",
  "conformance/manifest.yaml",
  "conformance/expectations/phase-2a-expectations.yaml",
  "conformance/expectations/routing-expectations.yaml",
  "conformance/expectations/strict-json-expectations.yaml",
];

export function buildPhase2aEvidence(): Map<string, string> {
  const requirements = loadRequirements();
  const conformance = runConformanceSuite();
  const vectors = runCanonicalizationVectors();
  const schemas = compilePhase1Schemas();
  const failures = [...conformance.issues, ...vectors, ...schemas.issues];
  if (failures.length > 0) {
    throw new Error(
      `evidence generation requires green suites; found ${failures.length} issue(s): ${failures[0]?.message ?? ""}`,
    );
  }

  const out = new Map<string, string>();
  const base = "evidence/development/phase-2a";
  const fixtures = loadConformanceFixtures();
  const a2 = fixtures.filter((f) => f.fixture.fixture_id.startsWith("A2-"));
  const routing = fixtures.filter((f) => f.family === "routing");
  const strictJson = fixtures.filter((f) => f.family === "strict_json");
  const phase1Fixtures = fixtures.filter(
    (f) =>
      !f.fixture.fixture_id.startsWith("A2-") &&
      f.family !== "routing" &&
      f.family !== "strict_json",
  );

  out.set(
    `${base}/phase-2a-manifest.json`,
    jsonFile({
      phase: "phase-2a",
      description:
        "Content pins for the Phase 2A ITGC guarantee slice. Development evidence only; not Release 1 gate evidence.",
      artifacts: PINNED_ARTIFACTS.map((path) => ({ path, sha256: sha256Normalized(path) })),
    }),
  );

  const phase2aRequirements = requirements.requirements.filter(
    (r) => r.introduced_in === "phase-2a",
  );
  out.set(
    `${base}/requirement-traceability.json`,
    jsonFile({
      total_requirements: requirements.requirements.length,
      phase_2a_added: phase2aRequirements.length,
      requirements: phase2aRequirements.map((r) => ({
        id: r.id,
        stability: r.stability,
        testability: r.testability,
        document: r.document,
        schema_refs: r.schema_refs,
        conformance_refs: r.conformance_refs,
      })),
    }),
  );

  const bundles = loadYaml<{
    entries: Array<{ bundle_id: string; public_check_set_version: string }>;
  }>("registries/interpretation-bundles.yaml");
  out.set(
    `${base}/bundle-compatibility-report.json`,
    jsonFile({
      registered_bundles: bundles.entries.map((b) => b.bundle_id),
      dispatch: "exact bundle identifier only (NRS-VERSION-0005, NRS-VERSION-0007)",
      routing:
        "bundle-independent routing envelope validated before any bundle-specific schema (NRS-VERSION-0008); no default bundle; registry order non-normative",
      strict_input:
        "duplicate JSON member names and unpaired-surrogate strings rejected on the raw text before routing, canonicalization, or digest computation (NRS-CANON-0007/0008); no first-wins or last-wins semantics; no Unicode normalization",
      registry_order_invariance_fixtures: ["ROUTE-007", "ROUTE-008"],
      phase_1_regression_fixtures: phase1Fixtures.length,
      routing_fixtures: routing.map((f) => f.fixture.fixture_id),
      version_dispatch_fixtures: a2
        .filter((f) => f.fixture.fixture_id.startsWith("A2-B-"))
        .map((f) => f.fixture.fixture_id),
      pinned_scope:
        "Phase 1 Record interpretation semantics and successful verification projections remain pinned (Record schema, bundle meaning, valid-Record digests, valid-Record semantic projections, Welch results).",
      corrected_scope:
        "Verifier-level refusal behavior received explicitly documented pre-release corrections under ADR-0015 (refusal kinds, parse-failure reason code, per-limit resource-refusal codes) and ADR-0017 (bundle-independent routing; no default bundle).",
      documented_corrections: [
        "B-007 refusal reason codes gained the specific limit code (ADR-0015)",
        "refusal kinds renamed and NRS-PARSE-FAILED introduced for non-JSON input (ADR-0015)",
        "B-002..B-006 input pins refreshed for the verifier version-string advance (ADR-0015)",
        "first-registered-bundle fallback removed; missing/non-string bundle declarations now yield routing refusals (ADR-0017)",
        "S-001 reclassified structural->routing with unchanged input bytes; expectations corrected from conformance-fail exit 2 to routing refusal exit 3 (ADR-0017)",
        "refusal schema advanced to 0.2.0-draft.2 adding routing_error; draft.1 retained and recorded superseded (ADR-0017)",
        "B-002..B-006 input pins refreshed for the verifier version-string advance to 0.2.0-draft.2 (ADR-0017)",
        "duplicate JSON member names and unpaired-surrogate strings now rejected before routing/JCS/digest; last-wins residual removed (ADR-0018)",
        "B-002..B-006 input pins refreshed for the verifier version-string advance to 0.2.0-draft.3 (ADR-0018)",
      ],
    }),
  );

  const admissibilityFixtures = a2.filter((f) => f.fixture.fixture_id.startsWith("A2-A-"));
  out.set(
    `${base}/admissibility-report.json`,
    jsonFile({
      admissibility_fixtures: admissibilityFixtures.map((f) => f.fixture.fixture_id),
      gating: "computability and recomputation not_run with blocking reason codes",
      judgment_basis: "declared_record_structure",
      declaration_truth: "not_asserted",
      all_expectations_match: true,
    }),
  );

  // max_rel_diff is the Batch 2 addendum U8 field name (the matrix is now
  // regenerated by tooling/src/evidence/oracle-matrix-generate.ts).
  const oracleMatrix = loadJson<{ max_rel_diff: number }>(
    "evidence/development/phase-2a/oracle/oracle-matrix.json",
  );
  out.set(
    `${base}/confidence-interval-report.json`,
    jsonFile({
      valid_ci_fixtures: a2
        .filter((f) => f.fixture.fixture_id.startsWith("A2-V-"))
        .map((f) => f.fixture.fixture_id),
      mismatch_fixtures: a2
        .filter((f) => f.fixture.fixture_id.startsWith("A2-P-"))
        .map((f) => f.fixture.fixture_id),
      confidence_level: 0.95,
      ci_method: "urn:nomue:method:welch-satterthwaite-mean-difference-ci:1",
      oracle_max_relative_difference: oracleMatrix.max_rel_diff,
      standardized_effect_size: "not_asserted",
    }),
  );

  const refusalFixtures = fixtures.filter(
    (f) => (f.fixture.expected as { kind?: string }).kind === "refusal",
  );
  out.set(
    `${base}/refusal-schema-report.json`,
    jsonFile({
      refusal_schema: "urn:nomue:schema:verifier-refusal:0.2.0-draft.2",
      supersedes: "urn:nomue:schema:verifier-refusal:0.2.0-draft.1 (retained unmodified; ADR-0017)",
      refusal_fixtures: [...new Set(refusalFixtures.map((f) => f.fixture.fixture_id))].sort(),
      every_refusal_schema_validated: true,
      no_partial_success: true,
    }),
  );

  out.set(
    `${base}/resource-limit-report.json`,
    jsonFile({
      limits: {
        file_size_bytes: 5 * 1024 * 1024,
        nesting_depth: 64,
        observations: 10000,
        string_length_code_units: 16384,
      },
      fixtures: {
        file_size: "A2-R-001",
        nesting_depth: "A2-R-002",
        observation_count: "A2-R-003",
        string_length: "A2-R-004",
        malformed_json: "A2-R-005",
        truncated_json: "A2-R-006",
      },
      behavior: "safe refusal; no code execution; no external access; no partial success",
    }),
  );

  const byClassification = new Map<string, number>();
  for (const { fixture } of fixtures) {
    byClassification.set(
      fixture.classification,
      (byClassification.get(fixture.classification) ?? 0) + 1,
    );
  }
  out.set(
    `${base}/conformance-report.json`,
    jsonFile({
      executed_fixtures: conformance.executed,
      phase_1_fixtures: phase1Fixtures.length,
      phase_2a_fixtures: a2.length,
      routing_fixtures: routing.length,
      strict_json_fixtures: strictJson.length,
      all_expectations_match: true,
      by_classification: Object.fromEntries([...byClassification.entries()].sort()),
      expectation_provenance:
        "Phase 2A expectations hand-authored in conformance/expectations/phase-2a-expectations.yaml and routing expectations hand-authored in conformance/expectations/routing-expectations.yaml before verifier execution; projection hashes pinned via an independent JCS implementation.",
    }),
  );

  const vectorManifest = loadYaml<{ vectors: unknown[] }>(
    "canonicalization/test-vectors/manifest.yaml",
  );
  out.set(
    `${base}/canonicalization-regression-report.json`,
    jsonFile({
      vector_count: vectorManifest.vectors.length,
      all_match: true,
      canonicalization_version: "urn:nomue:canonicalization:jcs:0.2.0-draft.1",
      note: "Phase 2A reuses the Phase 1 canonicalization unchanged; Phase 1 content digests are preserved.",
    }),
  );

  const pinnedProjectionHashes = fixtures.filter(
    (f) =>
      (f.fixture.expected as { semantic_projection_hash?: string }).semantic_projection_hash !==
      undefined,
  ).length;
  out.set(
    `${base}/cross-platform-report.json`,
    jsonFile({
      strategy:
        "pinned-expectation equality: every platform recomputes canonical forms, content digests, refusal kinds, reason codes, check execution/outcome, and verification semantic projections and compares them with the platform-neutral hashes pinned in the conformance and vector manifests; matching pins on two platforms implies cross-platform agreement.",
      pinned_semantic_projection_hashes: pinnedProjectionHashes,
      excluded_from_comparison: [
        "generated_at",
        "verifier.source_commit",
        "runtime duration",
        "absolute paths",
        "process identity",
      ],
      note: "Platform-neutral by construction; per-platform run logs live under runs/.",
    }),
  );

  return out;
}
