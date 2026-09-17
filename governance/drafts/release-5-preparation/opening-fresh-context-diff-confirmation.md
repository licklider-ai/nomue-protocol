# Release 5 fresh-context review repair diff confirmation

**Status: informative close-only diff confirmation; non-normative; not adopted.**
This record confirms the author-side repairs to the findings of the
[fresh-context review](opening-fresh-context-review-result.md) against one fixed
target. It opens no public issue, starts no clock, issues no identifier, modifies no
normative artifact, closes no readiness gate, does not merge PR #342 and claims no
steward authorization.

**Verdict: `PROCEED`**, with one wording repair (S-2a) to apply at candidate freeze
and the holds named in Section 5. No finding of the retained review is regressed, and
the repair diff creates no new semantic choice.

## 1. Fixed target and identity check

| Field                | Value                                                                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Repository           | `licklider-ai/nomue-protocol`                                                                                                         |
| Draft PR             | #342, head `proposal/r5-selection-evidence`, base `main`, draft, open, mergeable state clean                                          |
| Head commit          | `232c63b99a6f2525c5e9f452802b22e88ea33a26` ("Repair R5 timing, declaration ownership and claim boundaries")                           |
| Parent commit        | `5bca708be2004b7306db4f95d065e7e2b8bdaec7` (the fresh-context review intake)                                                          |
| Head tree            | `a729f0ead487be8f7d993195947d63c4c6f6c449`                                                                                            |
| PR base              | `07b373655110afb34ab4bcc3933f83c69fba6f2c`; `origin/main` at review time was the same commit and is the merge base                    |
| Reviewed baseline    | `0d6265f6fee059d8f8f8650600483b3a1b5e2090`                                                                                            |
| Drift                | none: GitHub PR head, parent, tree and base equal the expected identities; `TARGET_DRIFT` not raised                                  |
| Retained review blob | `b1a71ff1b53ad6679ebea0bde96aaee27c219a99`, byte-identical at parent and head                                                         |
| Parent-to-head diff  | 9 files under `governance/drafts/`, +277 / −118; no authoritative, generated, schema, registry, fixture or reference artifact changes |
| CI on head           | 12 GitHub check runs, all `success`                                                                                                   |
| Local checks on head | `pnpm format:check`, `pnpm lint:markdown` and `pnpm validate` pass                                                                    |

Blobs confirmed at the head: `README.md` `fd8cea71…`, `opening-rfc-candidate.md`
`d9dedb57…`, `research-commission.md` `5d04a47f…`, `public-discussion-readiness.md`
`ce3bba2a…`, `authority-and-surface-impact.md` `4c30e3e6…`,
`steward-publication-boundary-decision.md` `69820e8c…`, `opening-review-handoff.md`
`4cf194a5…`, `opening-fresh-context-repair-disposition.md` `953fc42c…`;
`historical-preservation-plan.md`, `research-result.md`, the three earlier review
records and `release-horizon-r3-r20.md` are unchanged from the baseline.

## 2. Continuity and independence disclosure

This confirmation was performed by the same reviewer session that produced the
fresh-context review, as the repair disposition and the updated handoff permit. It is
a continuation, not a second fresh-context review. The reviewer read the repair
disposition first, then the parent-to-head diff, and re-read only the repaired
sections in context. The unchanged scope is covered by the retained review and was
not re-reviewed. The reviewer is an Anthropic language model in a Claude Code remote
session (configured `claude-fable-5-1`; serving model may differ); not human-expert
review and not steward review. No external source was fetched; `R5-RH-1` is
untouched. Self-review by the author remains excluded from clearance; this record is
reviewer-side.

## 3. Finding-by-finding confirmation

| Finding | Repair at head                                                                                                                                                                                                                                                                                                                                                                                                                                    | Result                                                            |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| S-1     | RFC "Timing declaration boundary" now defines the decision as the selected Contract, Profile and bundle identities plus every declaration that is a projected fact's truth carrier, per Record revision; any change after access excludes `pre_outcome` even if restored. Readiness mirrors it.                                                                                                                                                   | Closed                                                            |
| S-2     | Truth carriers are confined to "the owning Profile's versioned declaration surface, including any separately accepted successor of that same surface"; the R5 Record addition "owns no design-fact carrier"; impact matrix and ownership rule match. Timing is therefore the sole non-Profile input.                                                                                                                                              | Closed as to design facts; one wording residual (S-2a, Section 4) |
| S-3     | RFC "Non-claim boundary" holds one eleven-item list adding declarant identity, authentication or authorization (10) and scientific classification of family boundaries (11); the family table states that count boundaries are Protocol conventions. Steward decision, impact, readiness, README, handoff and PR description reference eleven; no "nine" residual in any live document.                                                           | Closed                                                            |
| S-4     | "Decision requested", "Problem", invariant 2, README, readiness, impact, steward decision and commission now say issued schemas carry bundle and Profile identities plus `analysis.method_id`, that `analysis.contract_id` exists only in the unissued Release 2 candidate, that the two-group family has no issued Contract carrier, and that legacy `method_id` is never a Contract alias. Consistent with the Record 0.2 and ITGC 0.2 schemas. | Closed as text; family successor acceptance stays under R5-P3     |
| N-1     | Check described as "New Public Check whose calculation evidence is `consistency_only`" in RFC and impact.                                                                                                                                                                                                                                                                                                                                         | Closed                                                            |
| N-2     | RFC: no projection after conformance failure; `not_run` on blocked admissibility carries dependency identity, version, scope, outcome, blocking codes under NRS-VERIFY-0017, the readable timing status and the non-claim boundary, and no computed projection; errored results retain only obtained evidence with NRS-VERIFY-0012 codes. Consistent with the propagation rule in `registries/public-checks.yaml`. Encoding held under R5-P5.     | Closed; one clarity note (N-8)                                    |
| N-3     | Access event is any observed outcome value in the supplied dataset, including values outside a later declared subset; selector input context counts; stated as a proposed convention, not preregistration proof or detection of other datasets. RFC, readiness and commission Q4 agree; methodological assessment assigned to the R5-P2 addendum.                                                                                                 | Closed as bounded wording                                         |
| N-4     | Projected fact renamed "analysis-population status"; RFC and impact state it is not a population identifier and name the ITGC 0.2 enumeration.                                                                                                                                                                                                                                                                                                    | Closed                                                            |
| N-5     | Readiness R5-P2 row records Q11 to Q14 as unanswered and the repaired timing scope as needing assessment.                                                                                                                                                                                                                                                                                                                                         | Closed                                                            |
| N-6     | `research-frontier-map.md` points stale rank-based Release 5 references to the canonical horizon; frozen records unchanged.                                                                                                                                                                                                                                                                                                                       | Closed                                                            |

Consistency checks requested by the handoff: dataset-wide timing, the eleven
non-claims, blocked and errored evidence, and the Contract-carrier condition are
each stated identically across the RFC, README, readiness, impact, steward decision,
commission, handoff and PR description. The eight counterexamples in the repair
disposition each resolve as the disposition states under the repaired text.

## 4. Residual findings

### SHOULD_FIX

**S-2a. "Identity references" in the R5 Record addition can be read as stored
copies.** RFC "Declaration ownership and projection" says the addition "contains
only that timing status and references to identity carriers owned by the applicable
family schema"; the impact matrix and readiness repeat "timing and identity
references". If "references" meant copied identity values, the addition would be a
second identity carrier, which the retained review's counterexample 7 and the
impact statement "adds no competing identity field" exclude. Nothing in the package
supports the copy reading, so this is a clarity defect, not an open semantic choice.
Repair: one sentence stating that the R5 addition stores no identity value; the
successor Record schema composes the family schema's existing identity carriers,
which remain the sole carriers. Apply at candidate freeze. No further reviewer
confirmation is needed beyond the steward seeing that sentence.

### NICE_TO_HAVE

**N-7.** `release-horizon-r3-r20.md` row for Release 5 still says "Reuses existing
tuple conformance". It also says all three families require separately accepted
Contracts, so it is not contradictory, but the phrase is the one S-4 repaired.
Suggest "existing bundle and Profile conformance".

**N-8.** "Every R5 result emitted after successful Record conformance carries the
exact timing status" and "Errored results retain only evidence actually obtained"
are reconcilable because the timing status is schema-validated at conformance and
therefore always obtained. Say so in one clause to remove the apparent tension.

## 5. Gate recommendation

| Gate  | Current   | Recommendation                                                                                                                                                    |
| ----- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| R5-P1 | OPEN      | Eligible for `PREPARED`: the repaired question states the four additions, is Protocol-scoped and carries no false premise. Steward moves the gate.                |
| R5-P4 | OPEN      | Eligible for `PREPARED` once S-2a is applied: projection ownership, timing object and scope, eleven non-claims and result evidence are fixed and consistent.      |
| R5-P8 | OPEN      | Reviewer-side work is complete for this scope: the retained fresh-context review plus this diff confirmation. Remaining closure is steward opening authorization. |
| Other | unchanged | R5-P2 PARTIAL; R5-P3, R5-P5, R5-P6 OPEN; R5-P7 PROVISIONAL, additive STABLE-INTENT / 30 days still defensible under the retained review's conditions.             |

Holds that may remain named during public discussion: `R5-RH-1`, the Q11 to Q14
addendum including assessment of the supplied-dataset timing convention, exact
per-Profile mapping tables and report encoding (R5-P5), the fixture inventory
(R5-P6), family successor acceptance (R5-P3), N-7 and N-8. All must close before
design freeze and any adoption decision.

## 6. Validation

This file is the only addition on the review branch, rooted at the fixed head.
`pnpm format:check`, `pnpm lint:markdown` and `pnpm validate` pass with it added.
