# R3 declaration-bound Holm promotion proposal

Date: 2026-09-11. Status: informative proposal for review; no formal adoption.

The D0-to-supplied-p Holm experiment has completed its bounded implementation
review, repair and author intake. The next work is to turn its precisely limited
claim into a reviewable Protocol proposal and close the remaining promotion
conditions. Repeating the whole experiment review or adding another method is
not the next task.

Read [the proposed specification](SPECIFICATION-PROPOSAL.md),
[the remaining conditions](PROMOTION-CONDITIONS.md), and
[the bounded review instructions](REVIEW.md) together.
[INPUTS.json](INPUTS.json) identifies the inspected source bytes;
[VALIDATION.md](VALIDATION.md) records checks and limits of this preparation.

## Authority and authorization

The steward instructed the coordinator to proceed with the proposed limited
specification and residual-condition inventory after the preceding status report.
That authorizes preparation and review of this packet. It does not itself adopt
an Analysis Contract, close the Research Gate, issue an identifier, merge an
implementation or publish a release. All text here is informative, including
proposed requirements and condition labels. Labels below are local navigation
within this proposal, not newly issued Requirement or gate IDs.

Preparation: OpenAI Codex in this continuing coordinating/drafting context, with
the preceding project discussion and repository records visible. No independent
review, separate-model pass, original-PDF rereading or human review is claimed
by this packet. Prior reports are attributed reuse. No additional agents were
started. This coordinator is an author of this proposal and cannot supply its
own independent B-2 closure.

## Fixed current state

| Subject                        | Fixed evidence and present interpretation                                                                                                                                           |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Integration base               | main `dedd26a3e0655001b67e40ccfb741e43ecb07beb`; this packet adds files only and does not integrate candidate branches                                                              |
| Public opening                 | [Issue #274](https://github.com/licklider-ai/nomue-protocol/issues/274), actual opening 2026-09-09T11:50:18Z; opening receipt PR #275 at `7774242f0df81342c5abca97a8fbe40844306fa6` |
| Earliest decision              | 2026-10-09T11:50:18Z, after the 30-calendar-day STABLE-INTENT window; expiry is not acceptance                                                                                      |
| D0 structure                   | PR #276 and review #280 at `25de2d2b97934476dc2ae49eeb3fa5143a74e131`: structural handoff only                                                                                      |
| Evidence mapping               | PR #277 and applicability review #282 at `a5213b446df0ec1de09d557c0c6933320f470452`                                                                                                 |
| Holm primary-source connection | PR #289 at `9793fd2f1540c26491651ff02bf51d0bd292f821`: bounded source connection supplied; no implementation or scientific-input acceptance                                         |
| Holm design and experiment     | PR #290 at `f203eb12c036b40b3602f22603d39702cdba9bba`; repaired PR #292 at `c4ad231471deba354bd018550b2378f2d740b944`                                                               |
| IEEE source supplement         | PR #294 at `864766232988181e72ae18c235dbc815466b3a1d`: independent source report plus separately attributed author applicability to Holm                                            |
| Binding experiment             | PR #300 at `cc87234d27b7a0d51bc172d0e661845a3b1f9b15`, sole parent `cf6ae859857b6bdd2df3e313c82456131fca2731`, tree `e6944ca82664264bf1b9f9af62ba944d8d32ef1e`                      |
| Integration status             | PR #300 and the inspected source/design successors remain open drafts; review-round completion does not mean merge or adoption                                                      |

The PR #300 report records 157 connection checks in each Python mode, 15
integrity checks, and 12 resource probes. These are attributed check counts,
not independent datasets or an accuracy estimate. Its head CI run
[34567277732](https://github.com/licklider-ai/nomue-protocol/actions/runs/34567277732)
was observed successful during status inspection; that is not promotion evidence
for this new proposal.

Older main and fixed RFC text still describes a pre-opening stage. The actual
issue and later receipts establish subsequent events. Historical bytes are
preserved. A future integration change should add current navigation and
successor links without editing the old reports to make them appear current.

## Proposed next round

1. Review the specification proposal and source-to-claim mapping using REVIEW.md.
   Resolve only remaining B-2 applicability/provenance gaps and concrete findings.
2. Prepare one supported-execution proposal, including a trusted launcher,
   whole-call resource controls and termination evidence. Keep implementation
   mechanisms non-normative where interoperability does not require them.
3. Prepare a closed public-surface candidate and affected-artifact plan using
   the reviewed semantics; preserve existing Record ingress and exact-bundle
   behavior. Run the coupled specification/conformance review before adoption.
4. After the applicable public window and decisions, integrate the approved
   vertical capability. Record publication conditions separately.

Steps 2 and 3 can be drafted during discussion. Their behavior is not frozen
or merged as supported behavior before the applicable Research Gate and RFC
decisions. No all-method implementation or new source survey is authorized by
this round.
