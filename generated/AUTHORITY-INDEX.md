<!--
GENERATED FILE - DO NOT EDIT.

Source artifacts:
- authority/authority-manifest.yaml (sha256:da86c8a0ed4f49757cf84f73e958de715ed340c1d8fb8401781fd74a83307f21)

Generation command: pnpm generate
-->

# Authority Index

Non-authoritative view of the authority manifest.

## Authority by target

| Target | Description | Authoritative artifacts |
| --- | --- | --- |
| mission-scope-non-goals | Project mission, scope, non-goals, and non-claims for the nomue Protocol. | `CHARTER.md` |
| authority-location-and-conflicts | Location of nomue Protocol authority and how conflicts between authoritative artifacts are handled. | `AUTHORITY.md`, `authority/authority-manifest.yaml` |
| normative-meaning | Normative Protocol meaning and guarantee boundaries. | `spec/core/authority-and-governance.md`, `spec/core/layer-boundary.md`, `spec/core/verification-principles.md`, `spec/core/versioning-principles.md`, `spec/core/record-envelope.md`, `spec/core/integrity-model.md`, `spec/core/provenance-model.md`, `spec/core/record-lifecycle.md`, `spec/verification/public-checks.md`, `spec/verification/execution-outcome-model.md`, `spec/verification/verification-report.md`, `spec/verification/relying-party-interface.md`, `spec/emission/README.md`, `spec/approval/README.md`, `spec/attestation/README.md`, `spec/versioning/interpretation-bundle.md`, `spec/profiles/independent-two-group-continuous/phase-1-minimal-profile.md`, `spec/profiles/independent-two-group-continuous/welch-calculation.md`, `spec/profiles/independent-two-group-continuous/admissibility.md`, `spec/profiles/independent-two-group-continuous/effect-estimate.md`, `spec/profiles/independent-two-group-continuous/confidence-interval.md`, `spec/profiles/independent-two-group-continuous/non-claims.md`, `spec/verification/profile-admissibility-check.md`, `spec/verification/welch-computability-check.md`, `spec/verification/phase-2a-welch-recompute.md`, `spec/verification/verifier-refusal.md`, `spec/versioning/multi-bundle-dispatch.md`, `spec/versioning/public-check-versioning.md`, `canonicalization/record-canonicalization.md`, `canonicalization/phase-1-numeric-model.md`, `canonicalization/numerical-comparison.md` |
| requirement-ids | Requirement IDs, stability, and reference relations. | `registries/requirements.yaml` |
| vocabulary | Term definitions. | `registries/vocabulary.yaml` |
| stability-tiers | Stability tier definitions. | `registries/stability-tiers.yaml` |
| public-contract-surfaces | Registered public contract surfaces, their status, scope, and change policy. | `registries/public-contract-surfaces.yaml` |
| interpretation-bundles | Registered supported version combinations for interpreting Records. | `registries/interpretation-bundles.yaml` |
| json-structure | JSON structural surfaces declared as authoritative by the Protocol, including registry meta-schemas. | `schemas/record/record.schema.json`, `schemas/record/record-0.2.schema.json`, `schemas/profiles/itgc-minimal.schema.json`, `schemas/profiles/itgc-guarantee-0.2.schema.json`, `schemas/reports/verification-report.schema.json`, `schemas/reports/verification-report-0.2.schema.json`, `schemas/reports/verifier-refusal-0.2.schema.json`, `schemas/reports/verifier-refusal-0.2-draft-2.schema.json`, `schemas/routing/routing-envelope-0.2.schema.json`, `schemas/common/identifier.schema.json`, `schemas/common/execution-outcome.schema.json`, `schemas/common/execution-outcome-0.2.schema.json`, `schemas/meta/authority-manifest.schema.json`, `schemas/meta/release-gates.schema.json`, `schemas/meta/requirements-registry.schema.json`, `schemas/meta/vocabulary-registry.schema.json`, `schemas/meta/stability-tiers.schema.json`, `schemas/meta/public-contract-surfaces.schema.json`, `schemas/meta/interpretation-bundles.schema.json`, `schemas/meta/public-checks-registry.schema.json`, `schemas/meta/reason-codes-registry.schema.json`, `schemas/meta/state-invariants-registry.schema.json`, `schemas/meta/attestation-signature-suites.schema.json`, `schemas/meta/lifecycle-operations.schema.json`, `schemas/meta/attestation-trust-root.schema.json`, `schemas/lifecycle/state-view-0.1.schema.json`, `schemas/lifecycle/clarification-0.1.schema.json`, `schemas/lifecycle/disclosure-notice-0.1.schema.json`, `schemas/reports/verification-report-0.2-draft-2.schema.json`, `schemas/reports/verification-report-0.2-draft-3.schema.json`, `schemas/reports/verifier-refusal-0.2-draft-3.schema.json` |
| public-checks | Public check identifiers, versions, evidence classes, and tolerance policy. | `registries/public-checks.yaml` |
| reason-codes | Registered reason codes for check results. | `registries/reason-codes.yaml` |
| state-invariants | Registered semantic state invariants. | `registries/state-invariants.yaml` |
| attestation-signature-suites | Attestation signature suite identifiers, algorithm identity, status, and version/evolution metadata. | `registries/attestation-signature-suites.yaml` |
| attestation-trust-root | Pinned key generations, fingerprints, and validity metadata for the nomue attestation trust root. | `registries/attestation-trust-root.yaml` |
| lifecycle-operations | Record lifecycle operations and declarative operation-precondition registry semantics. | `registries/lifecycle-operations.yaml` |
| conformance-judgment | Expected conformance judgment for covered behavior: the fixture manifest and the canonicalization/digest vector manifest. | `conformance/manifest.yaml`, `canonicalization/test-vectors/manifest.yaml` |
| phase-1-development-evidence | Authoritative record of the generated Phase 1 development evidence state; never authority for Protocol semantics or Release 1 closure. | `evidence/development/phase-1/phase-1-manifest.json` |
| phase-2a-development-evidence | Authoritative record of the generated Phase 2A development evidence state; never authority for Protocol semantics or Release 1 closure. | `evidence/development/phase-2a/phase-2a-manifest.json` |
| governance-process | RFC process, release policy, identifier policy, and contribution rules. | `governance/RFC.md`, `governance/RELEASE-POLICY.md`, `governance/ID-POLICY.md`, `governance/CONTRIBUTING.md`, `governance/LICENSING-PLAN.md` |
| release-decision | Current Release 1 gate registry and gate-index decision state only (authority/release-1-gates.yaml and evidence/release-1/gate-index.json); never authority for Protocol semantics. | `authority/release-1-gates.yaml`, `evidence/release-1/gate-index.json` |

## Artifact classification

| Path | Class |
| --- | --- |
| `CHARTER.md` | authoritative |
| `AUTHORITY.md` | authoritative |
| `authority/authority-manifest.yaml` | authoritative |
| `authority/release-1-gates.yaml` | authoritative |
| `spec/core/authority-and-governance.md` | authoritative |
| `spec/core/layer-boundary.md` | authoritative |
| `spec/core/verification-principles.md` | authoritative |
| `spec/core/versioning-principles.md` | authoritative |
| `registries/requirements.yaml` | authoritative |
| `registries/vocabulary.yaml` | authoritative |
| `registries/stability-tiers.yaml` | authoritative |
| `registries/public-contract-surfaces.yaml` | authoritative |
| `registries/interpretation-bundles.yaml` | authoritative |
| `schemas/meta/authority-manifest.schema.json` | authoritative |
| `schemas/meta/release-gates.schema.json` | authoritative |
| `schemas/meta/requirements-registry.schema.json` | authoritative |
| `schemas/meta/vocabulary-registry.schema.json` | authoritative |
| `schemas/meta/stability-tiers.schema.json` | authoritative |
| `schemas/meta/public-contract-surfaces.schema.json` | authoritative |
| `schemas/meta/interpretation-bundles.schema.json` | authoritative |
| `conformance/manifest.yaml` | authoritative |
| `canonicalization/test-vectors/manifest.yaml` | authoritative |
| `spec/core/record-envelope.md` | authoritative |
| `spec/core/integrity-model.md` | authoritative |
| `spec/core/provenance-model.md` | authoritative |
| `spec/verification/public-checks.md` | authoritative |
| `spec/verification/execution-outcome-model.md` | authoritative |
| `spec/verification/verification-report.md` | authoritative |
| `spec/verification/relying-party-interface.md` | authoritative |
| `spec/core/record-lifecycle.md` | authoritative |
| `spec/emission/README.md` | authoritative |
| `spec/approval/README.md` | authoritative |
| `spec/attestation/README.md` | authoritative |
| `spec/versioning/interpretation-bundle.md` | authoritative |
| `spec/profiles/independent-two-group-continuous/phase-1-minimal-profile.md` | authoritative |
| `spec/profiles/independent-two-group-continuous/welch-calculation.md` | authoritative |
| `canonicalization/record-canonicalization.md` | authoritative |
| `canonicalization/phase-1-numeric-model.md` | authoritative |
| `canonicalization/numerical-comparison.md` | authoritative |
| `registries/public-checks.yaml` | authoritative |
| `registries/reason-codes.yaml` | authoritative |
| `registries/state-invariants.yaml` | authoritative |
| `registries/attestation-signature-suites.yaml` | authoritative |
| `schemas/meta/attestation-signature-suites.schema.json` | authoritative |
| `registries/lifecycle-operations.yaml` | authoritative |
| `schemas/meta/lifecycle-operations.schema.json` | authoritative |
| `schemas/lifecycle/state-view-0.1.schema.json` | authoritative |
| `schemas/lifecycle/clarification-0.1.schema.json` | authoritative |
| `schemas/lifecycle/disclosure-notice-0.1.schema.json` | authoritative |
| `registries/attestation-trust-root.yaml` | authoritative |
| `schemas/meta/attestation-trust-root.schema.json` | authoritative |
| `schemas/record/record.schema.json` | authoritative |
| `schemas/profiles/itgc-minimal.schema.json` | authoritative |
| `schemas/reports/verification-report.schema.json` | authoritative |
| `schemas/common/identifier.schema.json` | authoritative |
| `schemas/common/execution-outcome.schema.json` | authoritative |
| `schemas/meta/public-checks-registry.schema.json` | authoritative |
| `schemas/meta/reason-codes-registry.schema.json` | authoritative |
| `schemas/meta/state-invariants-registry.schema.json` | authoritative |
| `schemas/record/record-0.2.schema.json` | authoritative |
| `schemas/profiles/itgc-guarantee-0.2.schema.json` | authoritative |
| `schemas/reports/verification-report-0.2.schema.json` | authoritative |
| `schemas/reports/verification-report-0.2-draft-2.schema.json` | authoritative |
| `schemas/reports/verification-report-0.2-draft-3.schema.json` | authoritative |
| `schemas/reports/verifier-refusal-0.2.schema.json` | authoritative |
| `schemas/reports/verifier-refusal-0.2-draft-2.schema.json` | authoritative |
| `schemas/reports/verifier-refusal-0.2-draft-3.schema.json` | authoritative |
| `schemas/routing/routing-envelope-0.2.schema.json` | authoritative |
| `schemas/common/execution-outcome-0.2.schema.json` | authoritative |
| `spec/profiles/independent-two-group-continuous/admissibility.md` | authoritative |
| `spec/profiles/independent-two-group-continuous/effect-estimate.md` | authoritative |
| `spec/profiles/independent-two-group-continuous/confidence-interval.md` | authoritative |
| `spec/profiles/independent-two-group-continuous/non-claims.md` | authoritative |
| `spec/verification/profile-admissibility-check.md` | authoritative |
| `spec/verification/phase-2a-welch-recompute.md` | authoritative |
| `spec/verification/verifier-refusal.md` | authoritative |
| `spec/versioning/multi-bundle-dispatch.md` | authoritative |
| `spec/versioning/public-check-versioning.md` | authoritative |
| `spec/verification/welch-computability-check.md` | authoritative |
| `governance/RFC.md` | authoritative |
| `governance/RELEASE-POLICY.md` | authoritative |
| `governance/ID-POLICY.md` | authoritative |
| `governance/CONTRIBUTING.md` | authoritative |
| `governance/LICENSING-PLAN.md` | authoritative |
| `evidence/release-1/gate-index.json` | evidence |
| `evidence/release-1/decisions/2026-08-18-pre-release-gate-reset.md` | evidence |
| `evidence/development/phase-1/phase-1-manifest.json` | evidence |
| `evidence/development/phase-1/requirement-traceability.json` | evidence |
| `evidence/development/phase-1/public-surface-report.json` | evidence |
| `evidence/development/phase-1/schema-validation-report.json` | evidence |
| `evidence/development/phase-1/conformance-report.json` | evidence |
| `evidence/development/phase-1/canonicalization-report.json` | evidence |
| `evidence/development/phase-1/verifier-report.json` | evidence |
| `evidence/development/phase-1/cross-platform-report.json` | evidence |
| `evidence/development/phase-2a/phase-2a-manifest.json` | evidence |
| `evidence/development/phase-2a/requirement-traceability.json` | evidence |
| `evidence/development/phase-2a/bundle-compatibility-report.json` | evidence |
| `evidence/development/phase-2a/admissibility-report.json` | evidence |
| `evidence/development/phase-2a/confidence-interval-report.json` | evidence |
| `evidence/development/phase-2a/refusal-schema-report.json` | evidence |
| `evidence/development/phase-2a/resource-limit-report.json` | evidence |
| `evidence/development/phase-2a/conformance-report.json` | evidence |
| `evidence/development/phase-2a/canonicalization-regression-report.json` | evidence |
| `evidence/development/phase-2a/cross-platform-report.json` | evidence |
| `README.md` | informative |
| `AGENTS.md` | informative |
| `CLAUDE.md` | informative |
| `PROTOCOL-ARCHITECTURE.md` | informative |
| `spec/README.md` | informative |
| `spec/AGENTS.md` | informative |
| `spec/consuming-layer-1.md` | informative |
| `spec/core/scope-and-non-claims.md` | informative |
| `spec/profiles/README.md` | informative |
| `spec/verification/README.md` | informative |
| `spec/extensions/README.md` | informative |
| `spec/versioning/README.md` | informative |
| `schemas/README.md` | informative |
| `conformance/README.md` | informative |
| `conformance/expectations/phase-2a-expectations.yaml` | informative |
| `conformance/expectations/phase-2a-021-expectations.yaml` | informative |
| `conformance/expectations/routing-expectations.yaml` | informative |
| `conformance/expectations/strict-json-expectations.yaml` | informative |
| `conformance/AGENTS.md` | informative |
| `examples/README.md` | informative |
| `mappings/README.md` | informative |
| `security/README.md` | informative |
| `evidence/release-1/README.md` | informative |
| `evidence/research/foundation-identity/README.md` | informative |
| `evidence/research/foundation-identity/2026-08-30-counterexample-corpus-v1.md` | informative |
| `evidence/research/foundation-identity/2026-08-30-common-response-template-v1.md` | informative |
| `evidence/research/foundation-identity/fnd-1/README.md` | informative |
| `evidence/research/foundation-identity/fnd-1/2026-08-30-genspark-primary-source-prompt.md` | informative |
| `evidence/research/foundation-identity/fnd-1/2026-08-30-genspark-primary-source-result.md` | informative |
| `evidence/research/foundation-identity/fnd-1/2026-08-30-claude-code-repository-analysis-prompt.md` | informative |
| `evidence/research/foundation-identity/fnd-1/2026-08-30-claude-code-repository-analysis-result.md` | informative |
| `evidence/research/foundation-identity/fnd-1/2026-08-30-independent-research-result.md` | informative |
| `evidence/research/foundation-identity/fnd-1/2026-08-30-multiplicity-primary-text-closure-commission.md` | informative |
| `evidence/research/foundation-identity/fnd-1/2026-08-30-multiplicity-primary-text-closure-result.md` | informative |
| `evidence/research/foundation-identity/fnd-1/2026-08-30-multiplicity-close-review-commission.md` | informative |
| `evidence/research/foundation-identity/fnd-1/2026-08-30-multiplicity-close-review-result.md` | informative |
| `evidence/research/foundation-identity/fnd-1/2026-08-31-multiplicity-steward-disposition.md` | informative |
| `evidence/research/foundation-identity/fnd-1/2026-08-31-nonclinical-estimand-source-closure-commission.md` | informative |
| `evidence/research/foundation-identity/fnd-1/2026-08-31-nonclinical-estimand-primary-source-result.md` | informative |
| `evidence/research/foundation-identity/fnd-1/2026-08-31-nonclinical-estimand-repository-analysis-result.md` | informative |
| `evidence/research/foundation-identity/fnd-1/2026-09-01-nonclinical-estimand-source-reconciliation.md` | informative |
| `evidence/research/foundation-identity/fnd-1/2026-09-01-nonclinical-estimand-source-reconciliation-close-review-commission.md` | informative |
| `evidence/research/foundation-identity/fnd-1/2026-09-01-nonclinical-estimand-source-reconciliation-close-review-result.md` | informative |
| `evidence/research/foundation-identity/fnd-1/2026-09-01-nonclinical-estimand-source-steward-disposition.md` | informative |
| `evidence/research/foundation-identity/fnd-1/2026-08-31-all-pairs-successor-source-closure-commission.md` | informative |
| `evidence/research/foundation-identity/fnd-1/2026-08-31-all-pairs-successor-primary-source-result.md` | informative |
| `evidence/research/foundation-identity/fnd-1/2026-08-31-all-pairs-successor-repository-analysis-result.md` | informative |
| `evidence/research/foundation-identity/fnd-1/2026-09-01-all-pairs-successor-source-supplied-completion-commission.md` | informative |
| `evidence/research/foundation-identity/fnd-1/2026-09-01-all-pairs-successor-source-supplied-completion-result.md` | informative |
| `evidence/research/foundation-identity/fnd-1/2026-09-01-all-pairs-successor-source-reconciliation.md` | informative |
| `evidence/research/foundation-identity/fnd-1/2026-09-01-all-pairs-successor-source-reconciliation-close-review-commission.md` | informative |
| `evidence/research/foundation-identity/fnd-1/2026-09-01-all-pairs-successor-source-reconciliation-close-review-result.md` | informative |
| `evidence/research/foundation-identity/fnd-1/2026-09-01-all-pairs-successor-source-steward-disposition.md` | informative |
| `evidence/research/foundation-identity/fnd-2/README.md` | informative |
| `evidence/research/foundation-identity/fnd-2/2026-08-30-independent-research-result.md` | informative |
| `evidence/research/foundation-identity/fnd-2/2026-08-30-source-bounded-steward-disposition.md` | informative |
| `evidence/research/foundation-identity/fnd-2/2026-08-31-analysis-data-source-completion-commission.md` | informative |
| `evidence/research/foundation-identity/fnd-2/2026-08-31-analysis-data-primary-source-result.md` | informative |
| `evidence/research/foundation-identity/fnd-2/2026-08-31-analysis-data-repository-analysis-result.md` | informative |
| `tooling/README.md` | informative |
| `governance/decisions/ADR-0001-separate-layer-1-repository.md` | informative |
| `governance/decisions/ADR-0002-authority-model.md` | informative |
| `governance/decisions/ADR-0003-json-schema-primary-structure.md` | informative |
| `governance/decisions/ADR-0004-public-language-english.md` | informative |
| `governance/decisions/ADR-0005-phase-1-minimal-record-envelope.md` | informative |
| `governance/decisions/ADR-0006-jcs-sha256-digest-projection.md` | informative |
| `governance/decisions/ADR-0007-finite-binary64-numeric-model.md` | informative |
| `governance/decisions/ADR-0008-welch-only-itgc-slice.md` | informative |
| `governance/decisions/ADR-0009-verification-report-separation.md` | informative |
| `governance/decisions/ADR-0010-stats-dependency-oracle-separation.md` | informative |
| `spec/profiles/independent-two-group-continuous/README.md` | informative |
| `canonicalization/README.md` | informative |
| `security/phase-1-verifier-security.md` | informative |
| `security/phase-2a-resource-refusal.md` | informative |
| `security/threat-model.md` | informative |
| `tooling/r1-08-oracle/README.md` | informative |
| `spec/profiles/independent-two-group-continuous/phase-2a-guarantee-profile.md` | informative |
| `governance/NAME-USAGE-POLICY.md` | informative |
| `governance/SNAPSHOT-RUNBOOK.md` | informative |
| `examples/itgc-guarantee-0.2/README.md` | informative |
| `evidence/development/phase-2a/README.md` | informative |
| `governance/decisions/ADR-0011-phase-2a-mean-difference-effect-estimate.md` | informative |
| `governance/decisions/ADR-0012-standardized-effect-sizes-deferred.md` | informative |
| `governance/decisions/ADR-0013-welch-mean-difference-95-ci.md` | informative |
| `governance/decisions/ADR-0014-admissibility-computability-separation.md` | informative |
| `governance/decisions/ADR-0015-versioned-verifier-refusal-artifact.md` | informative |
| `governance/decisions/ADR-0016-exact-bundle-dispatch.md` | informative |
| `governance/decisions/ADR-0017-bundle-independent-routing.md` | informative |
| `governance/decisions/ADR-0018-strict-jcs-input.md` | informative |
| `governance/decisions/ADR-0019-binary64-input-authority.md` | informative |
| `governance/decisions/ADR-0020-tail-safe-pvalue-comparison.md` | informative |
| `governance/decisions/ADR-0021-tolerance-versioning-test-families.md` | informative |
| `governance/decisions/ADR-0022-in-process-time-memory-bounds.md` | informative |
| `governance/decisions/ADR-0023-snapshot-manifest-mechanism.md` | informative |
| `governance/decisions/ADR-0024-s1-close-layer-i-cross-environment-deviation.md` | informative |
| `governance/decisions/ADR-0025-s1-close-numerical-deviation.md` | informative |
| `governance/decisions/ADR-0026-ed25519-adoption-pq-migration-path.md` | informative |
| `governance/decisions/ADR-0027-canonicalization-hardening-revision.md` | informative |
| `governance/decisions/ADR-0028-record-lifecycle-v0.md` | informative |
| `governance/decisions/ADR-0029-domain-separated-digest-requirement-repair.md` | informative |
| `governance/decisions/ADR-0030-authority-assignment-single-source.md` | informative |
| `governance/decisions/ADR-0031-nomue-ai-identifier-architecture.md` | informative |
| `examples/minimal-itgc-record/README.md` | informative |
| `bindings/typescript/README.md` | informative |
| `evidence/development/phase-1/README.md` | informative |
| `reference/README.md` | reference |
| `reference/AGENTS.md` | reference |
| `reference/stats-kernel/README.md` | reference |
| `reference/verifier/README.md` | reference |
| `generated/README.md` | generated |
| `generated/AUTHORITY-INDEX.md` | generated |
| `generated/REQUIREMENTS.md` | generated |
| `generated/VOCABULARY.md` | generated |
| `generated/RELEASE-1-GATES.md` | generated |
| `generated/PUBLIC-CHECKS.md` | generated |
| `generated/REASON-CODES.md` | generated |
| `generated/STATE-INVARIANTS.md` | generated |
| `generated/PUBLIC-CONTRACT-SURFACES.md` | generated |
| `generated/INTERPRETATION-BUNDLES.md` | generated |
| `generated/PROFILE-CAPABILITY-MATRIX.md` | generated |
| `bindings/typescript/generated/record.ts` | generated |
| `bindings/typescript/generated/verification-report.ts` | generated |
| `bindings/typescript/generated/record-0.2.ts` | generated |
| `bindings/typescript/generated/verification-report-0.2.ts` | generated |
| `bindings/typescript/generated/verifier-refusal-0.2.ts` | generated |
| `bindings/typescript/generated/verifier-refusal-0.2-draft-2.ts` | generated |
| `bindings/typescript/generated/verifier-refusal-0.2-draft-3.ts` | generated |
| `bindings/typescript/generated/routing-envelope-0.2.ts` | generated |
