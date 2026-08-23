<!--
GENERATED FILE - DO NOT EDIT.

Source artifacts:
- authority/release-1-gates.yaml (sha256:969e206b23cc0e0459e1355da8806f2167d49014b57ba12b14bfddaf04ff0d7d)

Generation command: pnpm generate
-->

# Release 1 Gates Index

Non-authoritative view of the Release 1 gate registry. Release 1 requires
every applicable gate to be closed with an explicit decision; there is no
conditional pass.

Registry version: 0.2.0 (updated 2026-08-24)

| Gate | Title | State | Decision | Blocking categories |
| --- | --- | --- | --- | --- |
| R1-01 | Verification depth and capability matrix | closed | pass | guarantee_boundary, core_semantics |
| R1-02 | Canonical-case differentiation against existing research-object systems | closed | pass | guarantee_boundary |
| R1-03 | Implementation evidence for conformance, verification, and attestations | closed | pass | core_semantics, evidence_integrity |
| R1-04 | External offline verification in clean environments | closed | pass | security, guarantee_boundary |
| R1-05 | Threat model and adversarial corpus | closed | pass | security |
| R1-06 | Canonical-case rights and epistemic integrity | closed | pass | rights, guarantee_boundary |
| R1-07 | Immutable public surface and version authority | closed | pass | core_semantics, evidence_integrity |
| R1-08 | Independent numerical oracle and common-cause failure control | closed | pass | guarantee_boundary, reproducibility |
| R1-09 | Verifier provenance and rebuildability | closed | pass | reproducibility, security |
| R1-10 | Canonical-case preregistration and failed-case disclosure | closed | pass | guarantee_boundary, evidence_integrity |
| R1-11 | Cryptosuite and trust semantics | closed | pass | security, core_semantics |
| R1-12 | Legal implementation boundary | closed | pass | legal, rights |
| R1-13 | Relying-party interface documentation | closed | pass | core_semantics |
| R1-14 | Release signing | open | - | security, evidence_integrity |
