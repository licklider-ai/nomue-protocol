# Candidate identity set

Status: **UNISSUED CANDIDATE**. Spellings are neither issued nor reserved.

## Protocol identities

All revisions are `0.1.0-draft.1`. Contract, Profile, schema and check version owners
are distinct. After issuance, a new meaning needs a successor identity and exact
bundle; internal JSON keys below are local document references, not public IDs.

| Role/key      | Exact candidate identity                                                            | Independent purpose / binding                                               | Version owner                                      |
| ------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------- |
| contract      | `https://nomue.ai/id/contract/balanced-two-factor/0.1.0-draft.1`                    | Scientific operation; no method alias                                       | Contract specification                             |
| profile       | `https://nomue.ai/id/profile/balanced-two-factor/0.1.0-draft.1`                     | Declared applicability and representation                                   | Profile specification                              |
| record        | `https://nomue.ai/id/schema/record-balanced-two-factor/0.1.0-draft.1`               | Closed envelope                                                             | Record schema owner                                |
| payload       | `https://nomue.ai/id/schema/profile-balanced-two-factor/0.1.0-draft.1`              | Closed analytical payload                                                   | Profile schema owner                               |
| report        | `https://nomue.ai/id/schema/report-balanced-two-factor/0.1.0-draft.1`               | Separate report, local result definitions                                   | Report schema owner                                |
| bundle        | `https://nomue.ai/id/bundle/balanced-two-factor/0.1.0-draft.1`                      | Exact coherent combination                                                  | Interpretation-bundle registry                     |
| conformance   | `https://nomue.ai/id/check/balanced-two-factor-record-conformance/0.1.0-draft.1`    | Structural and semantic coherence; report conformance only                  | Public Check registry and bound Requirement owners |
| integrity     | `https://nomue.ai/id/check/balanced-two-factor-record-integrity/0.1.0-draft.1`      | Existing JCS and digest on successor Record; no admissibility dependency    | Public Check registry and bound Requirement owners |
| admissibility | `https://nomue.ai/id/check/balanced-two-factor-profile-admissibility/0.1.0-draft.1` | Declared design; sole eligibility truth carrier                             | Public Check registry and bound Requirement owners |
| computability | `https://nomue.ai/id/check/balanced-two-factor-computability/0.1.0-draft.1`         | Ordered computability/domain/representation prerequisites before comparison | Public Check registry and bound Requirement owners |
| recompute     | `https://nomue.ai/id/check/balanced-two-factor-recompute/0.1.0-draft.1`             | All 22 comparisons and scoped aggregation                                   | Public Check registry and bound Requirement owners |

## Requirement candidates

The 16 RFC IDs and sole proposed owners appear in
[REQUIREMENT-CANDIDATE.md](REQUIREMENT-CANDIDATE.md). BTF namespaces remain unallocated.
No public IDs are minted for J-cost, B, S-C, Z-B, ordinals, helpers, research witnesses
or reference caps. They refine candidate clauses, principally NRS-VERIFY-0030.

## Bundle and check graph

The bundle pins the Contract, Profile, three schemas and five checks listed above,
with candidate public-check-set version `0.1.0-draft.1` and unchanged canonicalization
`urn:nomue:canonicalization:jcs:0.2.0-draft.1`. No legacy check set is modified.

| Check         | Scope           | Prerequisites                    | Report location      |
| ------------- | --------------- | -------------------------------- | -------------------- |
| conformance   | record_revision | Strict ingress and exact routing | conformance          |
| integrity     | record_revision | conformance                      | verification_results |
| admissibility | record_revision | conformance                      | verification_results |
| computability | result          | admissibility                    | verification_results |
| recompute     | result          | computability                    | verification_results |

Conformance branches into integrity and admissibility; admissibility gates
computability; computability gates recomputation. Transitive conformance failure
blocks all. Integrity has no admissibility dependency. Admissibility uses revision
scope for the single declared-design carrier; numerical checks use exact result_id.
No new scope-kind vocabulary is proposed. Conformance is registered for versioning
but is not a verification result. Pre-routing refusals stay outside this graph.

The listed order is registry presentation, not permission to change internal gate
order. Computability owns pre-comparison prerequisites and support/representation
exclusions. T07/T09 encode their categories without publishing partial comparisons.

## Schema and surface binding

| Role    | Future path (not created)                                                       | Surface                                                   |
| ------- | ------------------------------------------------------------------------------- | --------------------------------------------------------- |
| record  | schemas/record/record-balanced-two-factor-0.1-draft-1.schema.json               | PCS-0001 additive applicability                           |
| payload | schemas/profiles/balanced-two-factor-0.1-draft-1.schema.json                    | Candidate PCS-0014 structure; PCS-0015 declaration/result |
| report  | schemas/reports/verification-report-balanced-two-factor-0.1-draft-1.schema.json | Candidate PCS-0016, local result/evidence definitions     |

New NRS-PCS-0014/0015/0016 retain RFC STABLE-INTENT. PCS-0014 excludes the model boolean;
PCS-0015 owns it and result. Existing PCS-0006 canonicalization, PCS-0012 refusal and
PCS-0013 routing get future additive applicability only. Reuse exact identifier
scalar definitions, routing-envelope 0.2.0-draft.1 and verifier-refusal 0.2.0-draft.3.
No new canonicalization/method alias, execution-outcome schema or public profile ID
for reference execution is needed.

Base registry versions: requirements 0.2.0, checks 0.2.0, bundles 0.6.0, surfaces 0.5.0,
reasons 0.9.0. RFC future grammar/revision work is unimplemented. T07 can prepare
coupled candidates; later issuance requires namespaces/anchors, schemas, check policy,
reasons and bundle entry. Issuance must recheck allocations; this draft reserves none.
