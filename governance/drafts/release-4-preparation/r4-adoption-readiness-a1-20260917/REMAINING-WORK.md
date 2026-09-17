# Remaining work and benchmark boundary

Status: A1 provenance repair COMPLETE; limited review REPAIR; close-only confirmation PENDING.
Main Integration Decision: **HOLD**. No implementation phase is started.

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

| Item                                                          | Current state                                                                                               | Completion / justification                                                                                                                                                                                     |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BR-01: one decision-ready scope/contract/evidence/RFC packet  | A1-01 repair implemented; close-only reviewer confirmation pending                                          | Existing limited review found only provenance intake missing. Candidate choices and benchmark classification remain unchanged                                                                                  |
| BR-02: traceable intake of existing closure provenance        | Existing T13/T14 result intake COMPLETE on the author side                                                  | Stable [T13](T13-RESULT-INTAKE.md) and [T14](T14-RESULT-INTAKE.md) intakes distinguish supplied results, verified repository facts and unknown original receipt details. Reviewer closure is not self-declared |
| BR-03: preserve limited A1 independent review and disposition | Original target, REPAIR verdict and A1-01 preserved; repaired target/diff bound; later close review PENDING | [A1 result intake and close-only handoff](A1-LIMITED-REVIEW-RESULT-INTAKE.md) preserves the historical review and defines the new exact target. No later GO fabricated                                         |

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

**Next: return to the existing R4-A1 limited independent review thread for
close-only review of A1-01, BR-02 and BR-03 bindings/hashes against the repaired
exact target.** The [repair handoff](A1-LIMITED-REVIEW-RESULT-INTAKE.md) binds the
original target and repair range. Do not request another full A1 review or
repeat numerical/T13/T14 reviews. The author does not grant GO.

Preserve the later close result when actually received. Main integration stays
HOLD until the limited review is closed and integration is separately decided.
A2/A3 implementation and A4/A5 upgrades remain outside this repair. No manager
percentage or final adoption status is changed.
