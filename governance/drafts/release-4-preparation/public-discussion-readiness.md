# Release 4 public discussion preparation

Status: informative author proposal; independent review pending. Date: 2026-09-08.
The target is a proposal that outsiders can assess, not specification adoption.
The conversational estimate of approximately 50% is a planning judgment, not a
registered gate score or an estimate of remaining engineering hours.

## Evidence baseline

Main baseline: `cd217f88238a2ecc57b72f5835a813d92270f5ad`.
The accepted QR supplement and source-copy addendum are present there.
The addendum records `COMPLETE_ON_PROVIDED_COPIES`; independent downloading is
not an additional prerequisite. That acceptance is limited to the supplement.

The following unmerged research inputs were inspected at immutable revisions;
this synthesis does not treat their presence in a pull request as acceptance:

| Input                       | Commit                                     | File blob                                  |
| --------------------------- | ------------------------------------------ | ------------------------------------------ |
| Semantic research, PR 181   | `a2687f10719b399dafb511999cc1ef5b406a0c02` | `f70e89e995b0ec88d61d1a7eddf681ddb6d454b3` |
| Numerical research, PR 190  | `5962cc2def5b1aca7e30d219f12a9a6486ca7b11` | `200296de5745a3bc7087de4d924e1759f4c0f84e` |
| Degree-guard review, PR 191 | `2e3698ba32c0dae6dcd07ab8c71272d990fbaf49` | `8cf64bbe35e4c9f9537dc134f8334f6e5c44178f` |

PR 191's bounded numerical GO does not resolve its recorded model-independence
question or the programme's `INPUT_INCOMPLETE` status.
The Williams 1952 paper is by E. J. Williams; older preparation wording naming
Tukey is not relied upon. Existing repair work in PR 182 remains separate.

## Proposed first discussion scope

Recommend Candidate A: complete balanced replicated 2 by 2, fixed factors,
independent observational units, one finite continuous response per unit,
exactly four cells with a common replicate count of at least two, and declared
factor and level order. Retain the full A, B, and interaction model.
This is a scope recommendation awaiting review, not an adopted supported domain.

Describe signed main effects and difference-in-differences explicitly. With
cell means in order 00, 01, 10, 11, propose
`dA=(-m00-m01+m10+m11)/2`, `dB=(-m00+m01-m10+m11)/2`, and
`dAB=m00-m01-m10+m11`. Coded interaction coefficient is `dAB/4`;
a factorial-effect convention using `dAB/2` is a different normalization.
Do not let those conventions silently alter an interval or reported effect.

The discussion can compare three marginal F tests and signed estimates.
Whether pointwise confidence intervals are included, their confidence level,
and whether any familywise claim is offered remain explicit decisions.
The preparation supplies no causal or multiplicity guarantee.
General balanced designs, unbalanced Type I-IV choices, heteroscedastic methods,
repeated or mixed models, and empty cells remain research topics outside this
proposed first scope. Exclusion is not proof that those methods are invalid.

## Opening conditions and remaining work

These labels refer to the existing preparation conditions; this table does not
create a parallel gate registry or close a condition.

| Condition                     | Current evidence                                                     | Work before opening                                                                                                                                |
| ----------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| R4-P1: meaning and sources    | Semantic catalogue and bounded algebra; original-source holds remain | Complete independent primary-source support for every inferential claim retained in the proposal, especially classical F calibration and intervals |
| R4-P2: scope                  | Candidate A recommended above                                        | Review and record exact estimands, population/model assumptions, interval and multiplicity choices, and exclusions                                 |
| R4-P3: numerical feasibility  | Accepted coefficient supplement; new SS/F exploratory probe          | Independently review the new probe; map SS, residuals, F, tails and optional intervals to evidence paths or explicit blocking holds                |
| R4-P4: Release 3 relationship | Release numbering and Release 3 work remain intact                   | Compare the proposed interfaces against the then-current exact Release 3 scope; state dependencies and independent work explicitly                 |
| R4-P5: standalone RFC         | This preparation consolidates evidence and decisions                 | Draft an outsider-readable RFC with proposed authority classes, stability tier, staged contracts, public checks, exclusions and decision requested |
| R4-P6: opening review         | No independent review of this increment yet                          | Review the exact assembled proposal for unsupported claims and hidden methodological choices                                                       |

Full runtime certification and final schema/check versions need not be completed
merely to discuss a proposal. A missing proof can be an explicit implementation
hold where preparation permits it; an unsupported scientific claim is not made
acceptable by calling it a discussion draft.

## Source and comparison work order

1. Prioritize S5: original support for the chosen normal fixed-effects model,
   independent error assumptions, F null distribution, residual degrees of
   freedom, and any retained interval formula. Reconcile this with S1's missing
   Yates original and the existing independently reviewed evidence. A catalogue,
   abstract, textbook recollection, or randomization result alone does not close
   this task. Record exact pages and the claims they establish.
2. Resolve normalization against the acquired factorial/randomization source
   and clarify the role of the Williams interaction paper. Source acquisition
   and independent methodological review are separate facts.
3. Keep S3 (unbalanced sums of squares) and S4 (heteroscedastic/permutation)
   explicitly scoped as unresolved when excluded from Candidate A. Obtain
   review of whether any exclusion rationale still relies on these sources.
4. Preserve S6, the commissioned comparison in two actual software systems.
   The unequal-cell algebra example is not that comparison. R and statsmodels
   were unavailable in this execution environment. Narrowing a proposal does
   not silently waive an existing commission: record whether S6 is necessary
   before opening or can remain a separate research hold, with review.

## New numerical evidence and next handoff

See [the SS/F supplement](ss-f-propagation-supplement.md) and
[the reviewer instructions](public-discussion-review-prompt.md).
The new probe extends 945 finite cases to sums of squares, residuals and F ratios,
plus three zero-residual diagnostics. It establishes examples to investigate,
not an error bound, inferential validity, or a production algorithm selection.

OpenAI Codex assisted the authoring and execution in the maintainer's task
context. No independent investigator participated in this increment. Exact
model-build identity was not available as authenticated runtime metadata.
This work changes no normative surface, schema version, public check, release
number, or Release 3 behavior. Previous steward acceptance is not asserted as
acceptance of these new results.
