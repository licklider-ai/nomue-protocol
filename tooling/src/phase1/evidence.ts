/**
 * Phase 1 development-evidence generation. Deterministic: content depends
 * only on the repository state (no timestamps, no absolute paths, no
 * platform identifiers), so regeneration on any platform yields identical
 * bytes. This evidence documents the Phase 1 bootstrap; it is NOT Release 1
 * gate evidence and never flips a gate.
 *
 * oracle/, runs/, and reviews/ hold captured artifacts and are deliberately
 * outside the regeneration set.
 */

import { createHash } from "node:crypto";
import { canonicalProjection } from "../../../reference/verifier/src/digest.js";
import { semanticProjectionHash } from "../../../reference/verifier/src/projection.js";
import { verifyRecordText } from "../../../reference/verifier/src/verify.js";
import { loadRequirements } from "../lib/load.js";
import { readText, type Issue } from "../lib/repo.js";
import { loadConformanceFixtures, runConformanceSuite } from "./conformance.js";
import { compilePhase1Schemas, PHASE1_SCHEMA_FILES } from "./schemas.js";
import { runCanonicalizationVectors } from "./vectors.js";
import { loadYaml } from "../lib/repo.js";

const sha256Normalized = (rel: string): string =>
  createHash("sha256").update(readText(rel).replace(/\r\n/g, "\n"), "utf8").digest("hex");

const jsonFile = (value: unknown): string => `${JSON.stringify(value, null, 2)}\n`;

const PINNED_ARTIFACTS = [
  "spec/core/record-envelope.md",
  "spec/core/integrity-model.md",
  "spec/verification/public-checks.md",
  "spec/verification/execution-outcome-model.md",
  "spec/verification/verification-report.md",
  "spec/versioning/interpretation-bundle.md",
  "spec/profiles/independent-two-group-continuous/phase-1-minimal-profile.md",
  "spec/profiles/independent-two-group-continuous/welch-calculation.md",
  "canonicalization/record-canonicalization.md",
  "canonicalization/phase-1-numeric-model.md",
  "canonicalization/numerical-comparison.md",
  "registries/requirements.yaml",
  "registries/public-checks.yaml",
  "registries/reason-codes.yaml",
  "registries/state-invariants.yaml",
  "registries/public-contract-surfaces.yaml",
  "registries/interpretation-bundles.yaml",
  ...PHASE1_SCHEMA_FILES,
  "conformance/manifest.yaml",
  "canonicalization/test-vectors/manifest.yaml",
];

/** Build every regenerable evidence file; throws if the suites are not green. */
export function buildPhase1Evidence(): Map<string, string> {
  const requirements = loadRequirements();
  const conformance = runConformanceSuite();
  const vectors = runCanonicalizationVectors();
  const schemas = compilePhase1Schemas();
  const failures: Issue[] = [...conformance.issues, ...vectors, ...schemas.issues];
  if (failures.length > 0) {
    throw new Error(
      `evidence generation requires green suites; found ${failures.length} issue(s): ${failures[0]?.message ?? ""}`,
    );
  }

  const out = new Map<string, string>();
  const base = "evidence/development/phase-1";

  out.set(
    `${base}/phase-1-manifest.json`,
    jsonFile({
      phase: "phase-1",
      description:
        "Content pins for the Phase 1 vertical contract slice. Development evidence only; not Release 1 gate evidence.",
      artifacts: PINNED_ARTIFACTS.map((path) => ({ path, sha256: sha256Normalized(path) })),
    }),
  );

  const phase1Requirements = requirements.requirements.filter((r) => r.introduced_in === "phase-1");
  out.set(
    `${base}/requirement-traceability.json`,
    jsonFile({
      total_requirements: requirements.requirements.length,
      phase_1_added: phase1Requirements.length,
      requirements: requirements.requirements.map((r) => ({
        id: r.id,
        stability: r.stability,
        testability: r.testability,
        document: r.document,
        schema_refs: r.schema_refs,
        conformance_refs: r.conformance_refs,
      })),
    }),
  );

  const surfaces = loadYaml<{ entries: Array<{ surface_id: string; paths: string[] }> }>(
    "registries/public-contract-surfaces.yaml",
  );
  out.set(
    `${base}/public-surface-report.json`,
    jsonFile({
      surface_count: surfaces.entries.length,
      surfaces: surfaces.entries.map((s) => ({
        surface_id: s.surface_id,
        path_count: s.paths.length,
      })),
      note: "Path resolution against the pinned schemas is enforced by pnpm validate (phase1-cross-checks).",
    }),
  );

  const fixtures = loadConformanceFixtures();
  out.set(
    `${base}/schema-validation-report.json`,
    jsonFile({
      schemas: [...schemas.byId.keys()].sort(),
      compiled: true,
      reference_resolution: "all $refs resolved locally at compile time; nothing fetched",
      fixture_count: fixtures.length,
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
      all_expectations_match: true,
      by_classification: Object.fromEntries([...byClassification.entries()].sort()),
    }),
  );

  const vectorManifest = loadYaml<{ vectors: Array<{ vector_id: string; kind: string }> }>(
    "canonicalization/test-vectors/manifest.yaml",
  );
  out.set(
    `${base}/canonicalization-report.json`,
    jsonFile({
      vector_count: vectorManifest.vectors.length,
      all_match: true,
      differential_implementation: "canonicalize (npm, pinned in pnpm-lock.yaml)",
      by_kind: Object.fromEntries(
        [
          ...vectorManifest.vectors
            .reduce((m, v) => {
              m.set(v.kind, (m.get(v.kind) ?? 0) + 1);
              return m;
            }, new Map<string, number>())
            .entries(),
        ].sort(),
      ),
    }),
  );

  const exampleText = readText("examples/minimal-itgc-record/record.json");
  const exampleOutcome = verifyRecordText(exampleText);
  if (exampleOutcome.exitCode !== 0 || exampleOutcome.report === undefined) {
    throw new Error("example record no longer verifies cleanly");
  }
  const canonicalExample = canonicalProjection(JSON.parse(exampleText) as Record<string, unknown>);
  out.set(
    `${base}/verifier-report.json`,
    jsonFile({
      example: "examples/minimal-itgc-record/record.json",
      exit_code: 0,
      content_digest: exampleOutcome.report.record_reference.content_digest,
      semantic_projection_hash: semanticProjectionHash(exampleOutcome.report),
      canonical_content_sha256: createHash("sha256").update(canonicalExample, "utf8").digest("hex"),
      checks: exampleOutcome.report.verification_results.map((r) => ({
        check_id: r.check_id,
        execution: r.execution,
        outcome: r.outcome ?? null,
      })),
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
        "pinned-expectation equality: every platform recomputes canonical forms, content digests, and verification semantic projections and compares them with the platform-neutral hashes pinned in the conformance and vector manifests; matching pins on two platforms implies cross-platform agreement.",
      pinned_semantic_projection_hashes: pinnedProjectionHashes,
      pinned_canonicalization_vectors: vectorManifest.vectors.length,
      excluded_from_comparison: [
        "generated_at",
        "verifier.source_commit",
        "absolute paths",
        "runtime timing",
      ],
      note: "This file is platform-neutral by construction; per-platform run logs live under runs/ and are not part of the regeneration set.",
    }),
  );

  return out;
}
