# Release 2 decision ledger

Status: **Informative decision-preparation ledger**.

## Fixed context

| Item                       | Fixed input                                                         |
| -------------------------- | ------------------------------------------------------------------- |
| Public discussion          | [RFC #25](https://github.com/licklider-ai/nomue-protocol/issues/25) |
| Opening                    | `2026-08-26T20:52:54Z`                                              |
| Earliest decision          | `2026-09-25T20:52:54Z`                                              |
| Candidate surface          | `governance/drafts/release-2-candidate/`                            |
| Existing decision sequence | `governance/drafts/release-2-steward-ratification-package.md`       |

The candidate surface and the ratification package are inputs, not authoritative
Release 2 artifacts. The decision remains subject to RFC feedback and the exact
packet review requested in this directory.

## Decisions

| Decision | Question for the steward                                                                                                                                          | Current state              | Required disposition evidence                                                                                                           |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| R2-D1    | Is the paired-t vertical-slice question validly open for public review?                                                                                           | OPENED                     | RFC #25's fixed opening, scope, tier, and elapsed minimum window.                                                                       |
| R2-D2    | Are `PT` and `PTCC` the enduring Requirement-namespace tokens, with their proposed first IDs and anchors?                                                         | Candidate reviewed         | Collision result, mnemonic rationale, exact IDs/anchors, and no competing meaning.                                                      |
| R2-D3    | Are the proposed HTTPS Contract, Profile, schema, Check, and Bundle identifiers issued together with their owners and version rules?                              | Candidate reviewed         | Lexical validation, owner/versioning map, non-aliasing evidence, and same-change-set issuance plan.                                     |
| R2-D4    | Is the proposed successor Record/Profile/report schema and Bundle surface the selected compatible structural design?                                              | Candidate reviewed         | Closed-schema fixtures, `analysis.contract_id` binding, ordered checks, exact-dispatch migration matrix, and public-surface impact map. |
| R2-D5    | Is the paired-t numerical contract selected for a stated supported domain, execution tuple, error/tolerance boundary, critical-value table, and failure ordering? | Review-ready; not selected | Exact final selection for all listed dimensions, independent oracle/evidence disposition, and final reason-code inventory.              |
| R2-D6    | Is this paired-t slice the entire Release 2 support target, with all other candidate work excluded or deferred?                                                   | Pending                    | Complete decision list, all applicable prior decisions, Release 1 invariance, validation/conformance result, and explicit exclusions.   |

## Decision rules

1. D2 through D4 may be accepted only as one compatible identity-and-surface
   selection; issuing one without the others would leave a public surface without
   its required binding.
2. D5 cannot be inferred from finite candidate evidence. The decision must select
   the supported domain, execution tuple, numerical error/tolerance boundary,
   fixed-95 critical-value table, failure ordering, and reason-code outcome.
3. D6 cannot include a capability that lacks an accepted Contract, Profile, schema,
   Check, Bundle, conformance evidence, and supported numerical boundary.
4. Any material departure from the RFC #25 proposal or the candidate inputs needs a
   new impact assessment and, where applicable, additional discussion or review.

## Outcomes permitted after the minimum window

| Outcome                       | Consequence                                                                         |
| ----------------------------- | ----------------------------------------------------------------------------------- |
| Accept all required decisions | Prepare the coupled authoritative landing and its fixed implementation/review plan. |
| Accept a narrower slice       | Revise the packet, identify the removed surfaces, and reassess the exact impact.    |
| Defer D5 or D6                | Keep all candidate assets unissued; no paired-t support is registered.              |
| Reject the proposal           | Preserve the candidate record and leave Release 1 unchanged.                        |

None of these outcomes is performed by this ledger.
