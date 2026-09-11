# Coupled adoption delta

Informative proposed changes only. No Requirement ID, public surface ID or
Protocol identity is allocated by this packet. Local C1-C6 labels are not a
parallel authority registry. Every eventual normative clause needs exactly one
allocated Requirement anchor in the same authoritative change set.

| Candidate clause/surface                 | Existing authority connection                               | Proposed coupled adoption work                                                                                                                                                                                                                                                                                                              |
| ---------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| C1, C3 Contract and exact/display policy | Contract grammar in ID-POLICY; public-check versioning      | Allocate bounded Holm requirements, Contract and arithmetic check revision; record zero tolerances in registries/public-checks.yaml; add Contract prose under spec/profiles and authority assignment                                                                                                                                        |
| C2 Profile and declaration shapes        | NRS-CORE-0003/0007 envelope; D0 research                    | New closed Record schema and bounded Profile; allocate declaration/ownership requirements; explicit operation_kind representation, no fixture Contract IDs                                                                                                                                                                                  |
| C2 independent expected context          | Relying-party interface and NRS-VERIFY-0018 output validity | New expected-context schema and API requirement; local-file CLI is reference transport, not caller-origin proof                                                                                                                                                                                                                             |
| C4 exact bundle dispatch                 | NRS-VERSION-0003; strict JSON NRS-CANON-0007/0008           | Add exact bundle entry only after adoption; bind all successor identities/checks; preserve old dispatch and all old fixtures                                                                                                                                                                                                                |
| C4 storage/integrity                     | Existing integrity model and canonicalization               | Reuse exact canonicalization ID/tag only within covered semantics; explicitly document canonical-storage admission and byte/value projection distinction                                                                                                                                                                                    |
| C5 five scoped checks                    | Existing execution-outcome and verification-report meaning  | New report schema/check requirement assignments; no silent replacement of conformance/verification_results with checks; no aggregate status                                                                                                                                                                                                 |
| C5 refusals and resource evidence        | NRS-VERIFY-0018; NRS-SEC-0004/0005                          | New refusal schema and reason allocations; add successor kinds/limit categories and explicit unknown input-size representation; assess old clauses' applicability                                                                                                                                                                           |
| C6 input caps                            | NRS-SEC-0003                                                | Record candidate-specific conjunction and inner bounds; do not apply its numbers to old bundles                                                                                                                                                                                                                                             |
| C6 execution budget                      | NRS-SEC-0006                                                | Proposed new requirement scoped to this successor: declared whole-call enforcement plus no forwarding after observed resource/cleanup failure. Existing in-process checkpoint requirement and legacy implementation stay intact. Applicability and requirement allocation need explicit decision; controller evidence alone is insufficient |
| All public paths                         | registries/public-contract-surfaces.yaml                    | New versioned surface rows for payload, expected context, report and refusal; path resolution against candidate schemas; breaking-change rationale retained                                                                                                                                                                                 |
| Evidence and generated views             | authority/authority-manifest.yaml; generated views          | Assign normative meaning, schemas, checks, dispatch and conformance to their proper authority targets; retain research observations as evidence; regenerate authoritative views only as part of adoption                                                                                                                                    |

## Breaking schema impact

This candidate intentionally does not fit the existing Record payload or report
schema. The outer Record retains its nine fields, but payload adds direct
Contract ownership and full declaration/inputs/result. D0 synthetic contract_ref
is replaced by operation_kind. Public reports use five ordered scoped checks;
they do not reuse the legacy report's conformance and verification_results shape.
Refusals add kinds, stages and resource categories, and explicitly represent
unobserved input size. They omit declared_bundle_id when the private engine
did not retain a faithful declaration. These are successor-version decisions,
not clarifications of existing schema versions.

The report/refusal schema IDs and all check IDs in identities.json are proposed
allocations under adopted HTTPS grammar. The schemas are self-contained for
local compilation. No HTTP retrieval is involved. Candidate-only dispatch is
implemented inside this packet; reference/verifier and all actual registries
continue to reject its bundle.

## Decisions still required

The first-slice narrowing and existing exact numerical target fit the opened
supplied-p discussion question in the coordinator's assessment. The new public
output, unknown input-size representation, declaration shape identity and
NRS-SEC-0006 applicability change still require material-change/stability review.
This packet makes no automatic window exemption or reset decision.

Earliest decision for the unchanged STABLE-INTENT proposal is
2026-10-09T11:50:18Z. Expiry is not approval. Any CORE impact retains its
applicable window and explicit named-steward decision. Candidate merge is
informative integration, not authoritative implementation or publication.

After disposition, prepare one authoritative change updating specification,
requirements, Contract/Profile/check/bundle registries, schemas, public surfaces,
conformance expectations, reference dispatch and regenerated views together.
Adoption review checks exact candidate-bound evidence and the remaining numerical
review disposition. R3 release conditions, freeze and publication remain later
work. Other R3 capabilities and all 49 catalogue dispositions remain intact.
