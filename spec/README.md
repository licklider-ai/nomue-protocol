# Specification Documents

This tree holds the normative and informative documents of the nomue Record
Specification (NRS), a sub-specification of the nomue Protocol. The
canonicalization contract lives in the sibling tree
[../canonicalization/](../canonicalization/README.md) and follows the same
rules.

Every document declares its status near the top:

- **Status: Normative** - contains binding clauses. Each binding clause uses an
  uppercase requirement keyword and is anchored to exactly one Requirement ID
  registered in [../registries/requirements.yaml](../registries/requirements.yaml).
- **Status: Informative** - explanation only; contains no binding clauses.

Writing rules for this tree are in [AGENTS.md](AGENTS.md).

## Layout

| Path                                                                                              | Content                                                                | State                   |
| ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ----------------------- |
| [core/scope-and-non-claims.md](core/scope-and-non-claims.md)                                      | Scope and non-claims                                                   | Informative             |
| [core/authority-and-governance.md](core/authority-and-governance.md)                              | Governance requirements (`NRS-GOV-*`)                                  | Normative               |
| [core/layer-boundary.md](core/layer-boundary.md)                                                  | Layer 1 boundary (`NRS-CORE-*`)                                        | Normative               |
| [core/record-envelope.md](core/record-envelope.md)                                                | Phase 1 Record envelope (`NRS-CORE-*`)                                 | Normative               |
| [core/integrity-model.md](core/integrity-model.md)                                                | Integrity model (`NRS-CORE-*`)                                         | Normative               |
| [core/verification-principles.md](core/verification-principles.md)                                | Verification principles (`NRS-VERIFY-*`, `NRS-SEC-*`)                  | Normative               |
| [core/versioning-principles.md](core/versioning-principles.md)                                    | Versioning principles (`NRS-VERSION-*`)                                | Normative               |
| [profiles/independent-two-group-continuous/](profiles/independent-two-group-continuous/README.md) | ITGC profile (`NRS-PROFILE-ITGC-*`)                                    | Normative + informative |
| [verification/public-checks.md](verification/public-checks.md)                                    | Public checks (`NRS-VERIFY-*`, `NRS-SEC-*`)                            | Normative               |
| [verification/execution-outcome-model.md](verification/execution-outcome-model.md)                | Execution/outcome model (`NRS-VERIFY-*`)                               | Normative               |
| [verification/verification-report.md](verification/verification-report.md)                        | Verification report (`NRS-CORE-*`, `NRS-VERIFY-*`)                     | Normative               |
| [versioning/interpretation-bundle.md](versioning/interpretation-bundle.md)                        | Interpretation bundles (`NRS-VERSION-*`)                               | Normative               |
| [verification/profile-admissibility-check.md](verification/profile-admissibility-check.md)        | Admissibility/computability separation (`NRS-VERIFY-*`)                | Normative               |
| [verification/phase-2a-welch-recompute.md](verification/phase-2a-welch-recompute.md)              | Phase 2A recomputation and comparison (`NRS-VERIFY-*`)                 | Normative               |
| [verification/welch-computability-check.md](verification/welch-computability-check.md)            | Welch computability conditions                                         | Normative               |
| [verification/verifier-refusal.md](verification/verifier-refusal.md)                              | Verifier refusal artifact (`NRS-CORE-*`, `NRS-VERIFY-*`, `NRS-SEC-*`)  | Normative               |
| [versioning/multi-bundle-dispatch.md](versioning/multi-bundle-dispatch.md)                        | Multi-bundle dispatch and preservation (`NRS-VERSION-*`, `NRS-CORE-*`) | Normative               |
| [attestation/](attestation/README.md)                                                             | Attestation                                                            | Normative               |
| [extensions/](extensions/README.md)                                                               | Extensions                                                             | Reserved                |

Additional current normative increments that are intentionally not duplicated
as extra rows in the compact table above:

- [core/provenance-model.md](core/provenance-model.md) - provenance semantics
  (`NRS-PROV-*`).
- [core/record-lifecycle.md](core/record-lifecycle.md) - lifecycle state,
  operations, clarification, and disclosure (`NRS-CORE-*`).
- [verification/relying-party-interface.md](verification/relying-party-interface.md)
  - relying-party interpretation and CLI contract (`NRS-VERIFY-*`).
- [versioning/public-check-versioning.md](versioning/public-check-versioning.md)
  - public-check versioning (`NRS-VERSION-*`).
- [emission/README.md](emission/README.md) - third-party Record emitter
  requirements (`NRS-EMIT-*`).
- [approval/README.md](approval/README.md) - EXPERIMENTAL approval first
  increment (`NRS-APPROVE-*`).
- [attestation/README.md](attestation/README.md) - EXPERIMENTAL attestation,
  signature-suite, and trust semantics (`NRS-ATTEST-*`).

Phase 1 defined the minimal Record envelope, the ITGC minimal profile with the
two-sided Welch two-sample t-test, canonicalization and integrity, public
checks, and the Phase 1 verification report. Phase 2A adds the ITGC guarantee
profile, structured admissibility declarations, the mean-difference effect
estimate with its 95% Welch confidence interval, exact multi-bundle dispatch,
versioned verifier refusal, and the relying-party interface. Later pre-release
hardening added the 0.2.1 numerical-contract bundle, provenance and lifecycle
semantics, emitter/approval increments, and an EXPERIMENTAL attestation
contract with adopted Ed25519 suite and trust-root semantics. None of those
later increments should be inferred to be present in a registered Record bundle
unless the corresponding schema/bundle explicitly declares them.

Extensions, standardized effect sizes, additional statistical methods, and
prose/figure binding remain outside the currently registered Record bundles.
