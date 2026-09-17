# Remaining work and benchmark boundary

Status: A1 CLOSED; limited close-only review GO; A1-01 / BR-02 / BR-03 CLOSED.
Main Integration Decision: **MERGE NOW**, subject to integration checks.
No implementation phase is started.

## Classification rule

BENCHMARK-REQUIRED means demonstrated by R2's actual reviewed decision-preparation
state, or necessary to describe an R4-specific final-decision consequence honestly.
STRONGER-THAN-R2 means additional pre-adoption quality not established as complete
when R2 was considered 85%. It is not an 85% blocker. Some such work will still be
necessary before actual support activation/publication; optional timing is not a
waiver of authority coupling, testing, security or release policy.

Completed technical selections and final-adoption acts are separate categories,
not mislabeled as remaining implementation. Comparison evidence is
[R2-README](https://github.com/licklider-ai/nomue-protocol/blob/f1c77b743f655a8c37f323794a4ebdcb820927ab/governance/drafts/release-2-candidate/README.md), [R2-RATIFICATION](https://github.com/licklider-ai/nomue-protocol/blob/f1c77b743f655a8c37f323794a4ebdcb820927ab/governance/drafts/release-2-steward-ratification-package.md), [R2-STRUCTURAL-REVIEW](https://github.com/licklider-ai/nomue-protocol/blob/f1c77b743f655a8c37f323794a4ebdcb820927ab/review-inputs/r2-d2-d4-structural-candidate-surface/REVIEW-RESULT.md),
[R2-D5-REVIEW](https://github.com/licklider-ai/nomue-protocol/blob/f1c77b743f655a8c37f323794a4ebdcb820927ab/review-inputs/r2-d5-final-review-readiness/REVIEW-RESULT.md), [R2-MIGRATION](https://github.com/licklider-ai/nomue-protocol/blob/f1c77b743f655a8c37f323794a4ebdcb820927ab/governance/drafts/release-2-candidate/exact-dispatch-migration-matrix.json) and [DISPATCH](https://github.com/licklider-ai/nomue-protocol/blob/f1c77b743f655a8c37f323794a4ebdcb820927ab/reference/verifier/src/verify.ts).

## BENCHMARK-REQUIRED

| Item                                                          | Current state                                             | Completion / justification                                                                                                             |
| ------------------------------------------------------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| BR-01: one decision-ready scope/contract/evidence/RFC packet  | COMPLETE; A1-01 CLOSED by close-only GO                   | Existing packet and provenance repair accepted; technical choices and benchmark classification unchanged                               |
| BR-02: traceable intake of existing closure provenance        | CLOSED by close-only GO                                   | Existing T13/T14 result intakes and their source-class/hash boundaries confirmed at the repaired target                                |
| BR-03: preserve limited A1 independent review and disposition | CLOSED; close-only GO now preserved as post-review intake | [Close-result intake](A1-CLOSE-REVIEW-RESULT-INTAKE.md) binds the reviewed repair target; original REPAIR and intake records unchanged |

There is no current evidence-backed mandatory numerical implementation milestone
after BR-01 through BR-03. If the limited review identifies a real missing candidate
decision input, record that specific item and its R2 or R4-contract rationale;
do not reinstate A2-A5 wholesale by name.

## STRONGER-THAN-R2 / optional before benchmark attainment

| Work                                                                     | Why not required for the actual R2 85% benchmark                                                                                   | Eventual boundary                                                                                                               |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Complete pretested authoritative landing candidate (previous A2)         | R2 reviews explicitly do not approve or establish the eventual authoritative change set; schema/registry artifacts remain unissued | Required change coupling applies before actual authoritative landing                                                            |
| Registry meta-schema / loader implementation and permanent entries       | R2's candidate remains outside authoritative registries/schemas and not registered                                                 | No partial issued bundle or grammar-based support inference                                                                     |
| Public CLI change implementation                                         | R2 has no issued successor CLI integration; R4 D07 intent and T09 research mapping are already explicit                            | R4-specific public interface/version/Requirement treatment is needed before activation; research 6 is not adopted automatically |
| Production dispatcher/shared Verifier connection candidate (previous A3) | R2 exact-dispatch matrix says not_supported; current dispatch has neither R2 nor R4 runner                                         | Shared source promotion belongs in nomue-verifier; exact pin and regression needed when done                                    |
| Offline distribution / release source package                            | No final R2 offline publication package was established by its readiness GO                                                        | Fixed G5 objects must be supplied or materialized if that future delivery route promises offline use                            |
| Combined review of new A2/A3 implementation (previous A4)                | There is no such new implementation in A1, and R2 parity does not require it first                                                 | Independently review actual future changed scope; retain existing T13/T14 GO                                                    |
| Full publication/signing rehearsal and package (previous A5)             | R2 README leaves publication open                                                                                                  | Required release authorization and signing steps remain governed separately; do not blindly reuse Release 1-only gates          |
| More hosts, broad completion envelope or universal performance claims    | R2 benchmark is one exact tuple with bounded per-input evidence                                                                    | Additional claims require their own evidence; no current candidate blocker                                                      |

## Final-adoption-only decisions and acts

- Namespace allocation, Requirement and permanent Protocol identifier issuance.
- Final adoption of schema/check/reason/bundle/numerical and reference-support scope.
- Explicit adopted public-interface treatment, keeping D07's fixed intent and old
  contracts distinct; no exit number is selected by A1.
- RFC/comment/tier/window disposition and release candidate scope confirmation.
- Authorization of coordinated authoritative landing and later release publication.

Waiting for public-window expiry, final steward approval, tag/signing/publication
is excluded from the benchmark-preparation completion condition. They remain
required when the corresponding final action is actually taken.

## Next milestone and stop

A1-01, BR-02 and BR-03 are CLOSED by the existing limited close-only GO, preserved
in [the post-review intake](A1-CLOSE-REVIEW-RESULT-INTAKE.md). Main integration of
the informative packet and result intake is authorized subject to validation,
CI and unchanged scope. No additional full A1 or T13/T14 review is requested.

After integration, stop. Decide the next phase separately using the unchanged
BENCHMARK-REQUIRED / STRONGER-THAN-R2 distinction above. No A2/A3 implementation,
new manager percentage or formal adoption is authorized by this record.
