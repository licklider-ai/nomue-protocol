# Release 2, 3, 4 and 5 coordination status

R3 reconciled 2026-09-18 UTC; R5 opening added 2026-09-17 UTC. R2/R4 summaries
retain their 2026-09-11 snapshot after PR #328 and are not a fresh status audit.
Informative coordination only. This page
summarizes recorded work and directs the next task. It does not replace the RFC,
Research Gate, authoritative registries or a steward decision. Older fixed
checkpoints and review requests describe their own dates, not the latest state.

## At a glance

| Release                            | Current bounded milestone                                                                                 | Next substantive work                                                                                | Formal state                                                                  |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| R2 paired-t                        | Candidate evidence and bounded review-readiness work are assembled and reviewed                           | Prepare exact final decision and coordinated authoritative change candidates                         | Public review open; unissued                                                  |
| R3 independent-group programme     | Candidate.4 saved in open PR #330; D0 design review complete at PR #355 head 1eb6b93                      | Implement/test the D1 unissued successor in nomue-verifier, then complete integrated output protocol | Public discussion open; no adopted Holm support or whole-programme completion |
| R4 balanced 2-by-2 factorial scope | Arithmetic, tails, complete-output and submitted-evidence experiments are integrated with review receipts | Prepare supported-domain/output policy and the public implementation connection                      | Public discussion open; numerical support not established                     |

## R5: public discussion open

[Issue #346](https://github.com/licklider-ai/nomue-protocol/issues/346) opened at
2026-09-17T00:38:15Z for cross-family declared-design evidence. The proposed four
additions are versioned Profile projection mappings, selection timing, an eleven-item
non-claim boundary and a common report view. All three families remain conditional.
The earliest decision under the provisional 30-day assessment is
2026-10-17T00:38:15Z. See the [opening record](release-5-preparation/public-opening-record.md)
for fixed inputs, authorization and research/design holds. No capability is adopted.

## R2: candidate round at a stopping point

[D2-D4 structural review](../../review-inputs/r2-d2-d4-structural-candidate-surface/REVIEW-RESULT.md)
returned GO for the unissued structural surface. Numerical M2/M3 candidate
closures and reviewed Groups 1-4 cover scope/resources, full-trace numerical
contract, one exact execution tuple, and reason inventory.
[Final R2-D5 review-readiness review](../../review-inputs/r2-d5-final-review-readiness/REVIEW-RESULT.md)
returned GO for head `35ab094c9106903e6b8e87a144cfbd8cd52ae124` with no remaining
findings in its bounded scope. The checkpoint's pending-review fields are its
pre-review state; the preserved later review supplies the current receipt.
That GO is readiness for the final decision, not the final R2-D5 decision itself.

Next, use the [ratification sequence](release-2-steward-ratification-package.md):

1. Assemble the exact current D2-D6 decision inputs and assess deltas from the
   reviewed candidate. Reuse unchanged evidence; rerun or review affected parts.
2. Prepare the coordinated specification, identifier/schema/check/bundle,
   reference-dispatch and conformance changes, retaining unissued status before
   the permitted authoritative decision.
3. After the window and explicit disposition, perform authoritative landing,
   Release 1 regression, candidate freeze and publication review.

No known mandatory candidate repair is identified by this status reconciliation.
It does not newly attest the entire codebase or make the final numerical selection.
Current candidate support evidence covers one exact Node/Linux/x64 tuple; the
multi-platform repository CI is not a claim of broad paired-t runtime support.

## R3: output-design checkpoint before successor integration

The main-only candidate.3 account below is historical implementation context.
[PR #330](https://github.com/licklider-ai/nomue-protocol/pull/330), fixed at
`b52389fd3efc6b8968613f59f147a578d5bbb55d`, already preserves candidate.4,
claim applicability, a concrete Contract proposal and coupling previews.
Its conditional changed-surface review is not adoption or complete M4 closure.
The branch is open/unmerged; its work is not missing merely because it is absent
from main.

The [design continuation](release-3-preparation/holm-design-decision-20260918/README.md)
proposes Record-local results independent of caller mismatch, faithful failure
reports versus invocation refusals, and genuine versioned schema/storage results.
It supplies 44 planned cases and the retained review/repair/confirmation chain.
D0 returned GO_FOR_UNISSUED_IMPLEMENTATION at `1eb6b93`; D1 may proceed in
nomue-verifier. This is not a tested successor or formal steward disposition.

The byte/dependency, local-check, inner-call and controlled-call checkpoints
received GO_FOR_D1_CONTINUATION at Verifier `a829970`, `77bb4eb`, `f4b0786` and
`3c51172`. The latest review independently closes the expected-access finding;
its two new MINOR findings are author-repaired in
[Verifier PR #20](https://github.com/licklider-ai/nomue-verifier/pull/20) head
`5ee62cd`: shared Record path-error classification and a truly omitted expected
argument. The next checkpoint expands 47 ordinary-call variants, 14 controlled
fault-entry runs and the retained 13 enforcement/lifecycle controls. Local author
validation passes 91 tests with no skips. This changed scope awaits independent
review; actual-host outcome and the original archive are fixed in the continuation.
See the [receipts and fixed handoff](release-3-preparation/holm-design-decision-20260918/D0-COMPLETION.md).
D1's expanded 44-case evidence and D2/D3 remain open. A tested development path
is not host qualification, adopted support or release permission.

The later [B-2 intake](release-3-preparation/holm-b2-integration-20260918/README.md)
retains bounded numerical/source GO and the reviewer's SHOULD-FIX-2 withdrawal.
Verifier `eda3ba9` wires the separately preserved stable-sort repair, replays the
independent expectations and adds a maximum 120-member full-call target. Its
actual-host suite passes 75/75 (48 ordinary, 14 fault entries, 13 host controls).
The repair was reviewer-authored; author reruns do not independently clear it.
Review the expansion plus this delta against `3c51172` before dependent promotion.
R1 is already published; its preserved-history audit passes and no R1 refreeze
or resigning is needed for this R3 continuation.

The [subsequent independent receipt and oracle checkpoint](release-3-preparation/holm-d1-oracles-20260918/README.md)
accept the expansion/B-2 wiring through `eda3ba9`, close prior m-2/m-3, and
record author repair of the new retained-result comparison MINOR. The successor
adds 324 constructed byte vectors, ten fixed-digest Record variants and 18
component limit boundaries. Local 121 tests pass without skips. All 44 locators
remain partial; helper corruption, narrower matrices, failed cleanup and supervisor
loss remain D1 work. D2/D3 remain pending. The linked packet fixes the new target,
host evidence and independent-review request; earlier head descriptions above are
retained checkpoint chronology.

Use [candidate.3](release-3-preparation/holm-repaired-candidate-20260911/README.md),
the [active adoption map](release-3-preparation/holm-adoption-map-repair-20260911/README.md),
and [follow-up repair and exact CI evidence](release-3-preparation/r3-followup-review-20260911/README.md).
PR #328 closes the reported host-guard and identity-check defects. The preceding
repairs address snapshot writes, local reason vocabulary, source pins, field
ownership and evidence integrity. This development round is saved and tested;
no new implementation repair is required merely to reconcile its status.

Next bounded task:

1. Use the completed Q1-Q3 design review, preserving the prior numerical/source
   evidence within its exact claim and byte scope.
2. Implement and test the unissued successor; complete conformance/dispatcher/
   output-protocol joins through the shared-verifier source and pinned consumer.
3. Assemble the full authoritative overlay and exact RFC/tier/window impact
   disposition, then the formal decision inputs. Neither candidate.4 review nor
   this design packet closes those substantive engineering and governance steps.

The first capability is ordinary unweighted Holm over supplied p-values with
D0 declarations: arithmetic and identity consistency, not scientific validity
of the p-producing procedure or an unconditional FWER claim. The 49 technique
dispositions and other fourteen R3 candidates remain in the programme. They do
not all have to complete before this bounded capability can advance. Naik/MTO-02
source follow-up and R4 completion are not dependencies of this slice.

## R4: experiments integrated, public implementation remains

The [integration audit](research-asset-integration-20260911/README.md) preserves
the arithmetic/tail chain, bounded primary-method and IEEE supplement, composition,
complete-output wrapper and submitted-evidence consumer. The final
[consumer report](release-4-preparation/tail-evidence-experiment-20260911/REPORT.md)
appends an external implementation review receipt after an earlier pending-review
introduction. Read that receipt as the later status. The
[archive review](../../review-inputs/research-asset-review-20260911/r4/R4-ASSET-ARCHIVE-REVIEW.md)
confirms safe experimental preservation, not supported behavior or whole-gate closure.
The experiment round can remain parked; its observed tests are not a portable
runtime or mathematical-truth guarantee for every future public implementation.

Next bounded task:

1. Produce the final integrated output/representation and admission proposal,
   connecting the existing reviews to the exact adapter/wrapper/consumer scope.
   Distinguish zero, positive values rounding to zero, nonrepresentable outputs,
   unresolved probabilities and conservative interval-containment refusals.
2. Establish selected input/resource/platform bounds with real enforcement and
   evidence. The measured host timings and size scores alone do not establish them.
3. Connect raw Record/expected context to versioned schemas, public checks,
   complete refusal/output semantics and independent conformance evidence.
4. Obtain the applicable bounded implementation and research-gate dispositions,
   then prepare authoritative adoption and release after the public window.

The retained design is complete balanced replicated 2-by-2 fixed-factor normal
inference with three marginal contrasts/tails. Intervals, multiplicity and wider
designs remain excluded. This slice has no Release 3 calendar prerequisite.

## Public windows and operational cleanup

| Release | Discussion                                                        | Earliest unchanged-scope decision, UTC | Japan time          |
| ------- | ----------------------------------------------------------------- | -------------------------------------- | ------------------- |
| R2      | [#25](https://github.com/licklider-ai/nomue-protocol/issues/25)   | 2026-09-25 20:52:54                    | 2026-09-26 05:52:54 |
| R3      | [#274](https://github.com/licklider-ai/nomue-protocol/issues/274) | 2026-10-09 11:50:18                    | 2026-10-09 20:50:18 |
| R4      | [#261](https://github.com/licklider-ai/nomue-protocol/issues/261) | 2026-10-09 05:59:47                    | 2026-10-09 14:59:47 |

These are earliest consideration times, not automatic adoption dates. Source
scope decisions already made are not reopened by this cleanup. Material changes
still require the existing RFC assessment.

The [PR cleanup ledger](release-status-cleanup-20260911/README.md) distinguishes
44 integrated heads, seven preserved/superseded predecessors and one obsolete
unactivated tooling proposal. Old delivery PRs are not missing implementation.
Their closure does not delete branches or close the three RFC discussions.
For the reconciled R3 scope, D0 design review is complete; next are the unissued
successor implementation and complete integration. This page
does not update the historical R2/R4 next-task assessments or perform adoption.
