<!--
GENERATED FILE - DO NOT EDIT.

Source artifacts:
- registries/public-checks.yaml (sha256:522ddfdb910f6c935baf33d93d7c5130d36227b371e22852fa46f6308713f6f9)

Generation command: pnpm generate
-->

# Public Checks Index

Non-authoritative view of the public check registry. Tolerance policy
belongs to check versions and lives only in the registry. Together with
[PROFILE-CAPABILITY-MATRIX.md](PROFILE-CAPABILITY-MATRIX.md), this table
is the published capability matrix and per-check depth analysis required
as evidence for gate R1-01 (verification depth and capability matrix,
authority/release-1-gates.yaml); the Requirement IDs column below is
that gate's third evidence item (mapping from checks to Requirement
IDs). Gate R1-01's fourth evidence item (adversarial review of overclaim
risk in all public wording) is a steward review action this generated
file does not itself perform.

## Check sets

| Set version | Checks |
| --- | --- |
| 0.1.0-draft.1 | `urn:nomue:check:record-conformance:0.1.0-draft.1`, `urn:nomue:check:record-integrity:0.1.0-draft.1`, `urn:nomue:check:itgc-preconditions:0.1.0-draft.1`, `urn:nomue:check:welch-recompute:0.1.0-draft.1` |
| 0.2.0-draft.1 | `urn:nomue:check:record-conformance:0.2.0-draft.1`, `urn:nomue:check:record-integrity:0.2.0-draft.1`, `urn:nomue:check:itgc-profile-admissibility:0.2.0-draft.1`, `urn:nomue:check:welch-computability:0.2.0-draft.1`, `urn:nomue:check:welch-recompute:0.2.0-draft.1` |
| 0.2.1-draft.1 | `urn:nomue:check:record-conformance:0.2.0-draft.1`, `urn:nomue:check:record-integrity:0.2.0-draft.1`, `urn:nomue:check:itgc-profile-admissibility:0.2.0-draft.1`, `urn:nomue:check:welch-computability:0.2.1-draft.1`, `urn:nomue:check:welch-recompute:0.2.1-draft.1` |

## Checks

| Check | Title | Stability | Scope | Calculation | Consistency | Signature | Claim posture | Depends on | Requirement IDs | Implementation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `urn:nomue:check:record-conformance:0.1.0-draft.1` | Record structural and semantic conformance | EXPERIMENTAL | record | not_checked | checked | not_checked | asserted | - | `NRS-CORE-0003`, `NRS-CORE-0007`, `NRS-PROFILE-ITGC-0001`, `NRS-PROFILE-ITGC-0002`, `NRS-PROFILE-ITGC-0003`, `NRS-PROFILE-ITGC-0004`, `NRS-PROFILE-ITGC-0005`, `NRS-PROFILE-ITGC-0007`, `NRS-PROFILE-ITGC-0012` | implemented |
| `urn:nomue:check:record-integrity:0.1.0-draft.1` | Content digest recomputation | EXPERIMENTAL | record_revision | recomputed | checked | not_checked | asserted | - | `NRS-VERIFY-0006`, `NRS-CANON-0001`, `NRS-CANON-0022`, `NRS-CANON-0005`, `NRS-CORE-0006` | implemented |
| `urn:nomue:check:itgc-preconditions:0.1.0-draft.1` | ITGC profile preconditions | EXPERIMENTAL | analysis | consistency_only | checked | not_checked | asserted | - | `NRS-VERIFY-0007`, `NRS-PROFILE-ITGC-0013`, `NRS-PROFILE-ITGC-0014` | implemented |
| `urn:nomue:check:welch-recompute:0.1.0-draft.1` | Welch result recomputation and comparison | EXPERIMENTAL | result | recomputed | checked | not_checked | asserted | - | `NRS-VERIFY-0008`, `NRS-VERIFY-0009`, `NRS-PROFILE-ITGC-0006`, `NRS-PROFILE-ITGC-0008`, `NRS-PROFILE-ITGC-0009`, `NRS-PROFILE-ITGC-0010`, `NRS-PROFILE-ITGC-0011`, `NRS-CANON-0006` | implemented |
| `urn:nomue:check:record-conformance:0.2.0-draft.1` | Record structural and semantic conformance (Phase 2A) | EXPERIMENTAL | record | not_checked | checked | not_checked | asserted | - | `NRS-CORE-0003`, `NRS-CORE-0007`, `NRS-PROFILE-ITGC-0001`, `NRS-PROFILE-ITGC-0002`, `NRS-PROFILE-ITGC-0003`, `NRS-PROFILE-ITGC-0004`, `NRS-PROFILE-ITGC-0006` | implemented |
| `urn:nomue:check:record-integrity:0.2.0-draft.1` | Content digest recomputation (Phase 2A) | EXPERIMENTAL | record_revision | recomputed | checked | not_checked | asserted | `urn:nomue:check:record-conformance:0.2.0-draft.1` | `NRS-VERIFY-0006`, `NRS-CANON-0001`, `NRS-CANON-0022`, `NRS-CANON-0005`, `NRS-CORE-0006` | implemented |
| `urn:nomue:check:itgc-profile-admissibility:0.2.0-draft.1` | ITGC profile admissibility | EXPERIMENTAL | record | not_checked | checked | not_checked | asserted | `urn:nomue:check:record-conformance:0.2.0-draft.1` | `NRS-VERIFY-0013`, `NRS-CORE-0009`, `NRS-PROFILE-ITGC-0005`, `NRS-PROFILE-ITGC-0007`, `NRS-PROFILE-ITGC-0015`, `NRS-PROFILE-ITGC-0016`, `NRS-PROFILE-ITGC-0019`, `NRS-PROFILE-ITGC-0020`, `NRS-PROFILE-ITGC-0021`, `NRS-PROFILE-ITGC-0022`, `NRS-PROFILE-ITGC-0023`, `NRS-PROFILE-ITGC-0024`, `NRS-PROFILE-ITGC-0025` | implemented |
| `urn:nomue:check:welch-computability:0.2.0-draft.1` | Welch computability | EXPERIMENTAL | analysis | consistency_only | checked | not_checked | asserted | `urn:nomue:check:itgc-profile-admissibility:0.2.0-draft.1` | `NRS-VERIFY-0013`, `NRS-VERIFY-0017`, `NRS-PROFILE-ITGC-0014` | implemented |
| `urn:nomue:check:welch-recompute:0.2.0-draft.1` | Welch result recomputation and comparison (Phase 2A) | EXPERIMENTAL | result | recomputed | checked | not_checked | asserted | `urn:nomue:check:welch-computability:0.2.0-draft.1` | `NRS-VERIFY-0014`, `NRS-VERIFY-0015`, `NRS-VERIFY-0016`, `NRS-PROFILE-ITGC-0006`, `NRS-PROFILE-ITGC-0008`, `NRS-PROFILE-ITGC-0009`, `NRS-PROFILE-ITGC-0010`, `NRS-PROFILE-ITGC-0011`, `NRS-PROFILE-ITGC-0017`, `NRS-PROFILE-ITGC-0018`, `NRS-PROFILE-ITGC-0026`, `NRS-CANON-0006` | implemented |
| `urn:nomue:check:welch-computability:0.2.1-draft.1` | Welch computability (numerical contract 0.2.1) | EXPERIMENTAL | analysis | consistency_only | checked | not_checked | asserted | `urn:nomue:check:itgc-profile-admissibility:0.2.0-draft.1` | `NRS-VERIFY-0013`, `NRS-VERIFY-0017`, `NRS-VERIFY-0019`, `NRS-VERIFY-0021` | implemented |
| `urn:nomue:check:welch-recompute:0.2.1-draft.1` | Welch result recomputation (numerical contract 0.2.1) | EXPERIMENTAL | result | recomputed | checked | not_checked | asserted | `urn:nomue:check:welch-computability:0.2.1-draft.1` | `NRS-VERIFY-0014`, `NRS-VERIFY-0015`, `NRS-VERIFY-0016`, `NRS-VERIFY-0019`, `NRS-VERIFY-0020`, `NRS-PROFILE-ITGC-0006`, `NRS-PROFILE-ITGC-0008`, `NRS-PROFILE-ITGC-0009`, `NRS-PROFILE-ITGC-0010`, `NRS-PROFILE-ITGC-0011`, `NRS-PROFILE-ITGC-0017`, `NRS-PROFILE-ITGC-0018`, `NRS-PROFILE-ITGC-0026`, `NRS-CANON-0006`, `NRS-VERSION-0009` | implemented |
