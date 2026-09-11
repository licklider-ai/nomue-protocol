# Release 4 public discussion preparation

Current state: **PUBLIC_DISCUSSION_OPEN**, since 2026-09-09T05:59:47Z.
See [discussion issue 261](https://github.com/licklider-ai/nomue-protocol/issues/261)
and the [opening record](public-discussion-opening-2026-09-09.md).
The minimum 30-day window ends no earlier than 2026-10-09T05:59:47Z.
Earlier pending/NOT_READY descriptions below are preserved historical states;
the reviewed candidate is unchanged. Numerical support remains unestablished.

Current repair: [PR 251/252 response](opening-rfc-review-response.md).
Both full reports are preserved separately:
[PR 251](../../../review-inputs/r4-opening-rfc/PR-251-REVIEW.md) and
[PR 252](../../../review-inputs/r4-opening-rfc/PR-252-REVIEW.md).
The candidate includes author-side repairs; fixed-input confirmation is pending.
Public discussion is not open.

Status: NOT_READY for public discussion. Bounded programme-audit and scaling
records and the bounded normal-model evidence/scope are accepted.
The assembled-opening proposal awaits independent assessment.
Updated: 2026-09-09.
The target is a proposal that outsiders can assess, not specification adoption.
This document records evidence and open decisions rather than a completion percentage.

## Current assembled proposal

Use the [RFC candidate](opening-rfc-candidate.md) for the current proposed
clauses, identifiers, surfaces, tier, migration and Release 3 reconciliation.
Main 0abdca8f822d0de3faf35f218f762a951fd75e9e incorporates the
[normal-model acceptance](normal-model-steward-acceptance-2026-09-09.md),
PR 240/246 reviews and the repair confirmation. Within that bounded scope,
source and derivation evidence is accepted; wider holds remain staged.
Earlier source-review-pending descriptions below are historical and superseded
only to that extent. P5/P6 are not closed by the new author-side proposal.

## Evidence baseline

Historical QR baseline: `cd217f88238a2ecc57b72f5835a813d92270f5ad`.
The accepted QR supplement and source-copy addendum are present there.
The addendum records `COMPLETE_ON_PROVIDED_COPIES`; independent downloading is
not an additional prerequisite. That acceptance is limited to the supplement.

Earlier integrated baseline: `ed6e9d9bde691556b99d22e261b31c3b25df338f`.
PR 229 integrated the accepted programme preparation; PR 234 integrated the
separately accepted scaling exploration and PR 235 review records. Read the
[programme acceptance](programme-steward-acceptance-2026-09-09.md) and
[scaling acceptance](power-scale-exploration.md#steward-final-confirmation-and-acceptance)
for their exact limits. Neither decision closes an opening condition.
The [opening claim map](opening-claim-map.md) organizes the remaining review work.

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

Describe signed sample estimates explicitly. Let `m00, m01, m10, m11` be
sample cell means in declared cell order, and propose
`dA=(-m00-m01+m10+m11)/2`, `dB=(-m00+m01-m10+m11)/2`, and
`dAB=m00-m01-m10+m11`. These estimate population contrasts whose exact
population/model definition is now covered by the bounded normal-model acceptance. They are not population
values or a causal guarantee merely because they are called effects.
With factor levels coded -1 and +1 in that declared order and the full model
`intercept + betaA*xA + betaB*xB + betaAB*xA*xB`, the fitted coded coefficients
are `betaA=dA/2`, `betaB=dB/2` and `betaAB=dAB/4`. A factorial-effect convention
using `dAB/2` for the interaction is a different normalization from `dAB` itself.
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

| Condition                     | Current evidence                                                           | Work before opening                                                                                                                                |
| ----------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| R4-P1: meaning and sources    | Semantic catalogue and bounded algebra; original-source holds remain       | Complete independent primary-source support for every inferential claim retained in the proposal, especially classical F calibration and intervals |
| R4-P2: scope                  | Candidate A recommended above                                              | Review and record exact estimands, population/model assumptions, interval and multiplicity choices, and exclusions                                 |
| R4-P3: numerical feasibility  | Accepted coefficient, SS/F, scale-boundary and scaling records             | Retain bounded probe GO; map SS, residuals, F, tails and optional intervals to reviewed evidence paths or explicit blocking holds                  |
| R4-P4: Release 3 relationship | Release numbering and Release 3 work remain intact                         | Compare the proposed interfaces against the then-current exact Release 3 scope; state dependencies and independent work explicitly                 |
| R4-P5: standalone RFC         | This preparation consolidates evidence and decisions                       | Draft an outsider-readable RFC with proposed authority classes, stability tier, staged contracts, public checks, exclusions and decision requested |
| R4-P6: opening review         | Bounded numerical/editorial reviews exist; assembled opening review absent | Review the exact assembled proposal for unsupported claims and hidden methodological choices                                                       |

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
The reviewed probe extends 945 finite cases to sums of squares, residuals and F ratios,
plus three zero-residual diagnostics. It establishes examples to investigate,
not an error bound, inferential validity, or a production algorithm selection.

OpenAI Codex assisted the authoring and execution in the maintainer's task
context. The original authoring increment had no independent investigator; subsequent
separate-context reviews are indexed below. Author-side self-audits are not independent. Exact
model-build identity was not available as authenticated runtime metadata.
This work changes no normative surface, schema version, public check, release
number, or Release 3 behavior. The accepted research increments are identified above; the new opening claim map
and editorial recommendations have not yet been independently reviewed or accepted.

## Review state and review scope

| Evidence                               | Exact reviewed input                             | Result and limit                                                                                                                                                                                                                                                               |
| -------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| QR supplement and two supporting pages | `0be8bb1519d7aec2810b03192de6590ec9168c60`       | Bounded record accepted; source status COMPLETE_ON_PROVIDED_COPIES, preserved by the existing intake                                                                                                                                                                           |
| SS/F numerical review                  | `4cf3e12acc77bd38c09d5acd2588ede66ee265b2`       | Numerical GO for the finite exploratory record; no programme or source closure                                                                                                                                                                                                 |
| RFC editorial review                   | `bf4004694f68018534e01bde2f2a33214accba19`       | Editorial GO; R4-P5 not closed                                                                                                                                                                                                                                                 |
| Repair review, PR 225                  | `ed7bfeb9f9ca2cee6e8766e90d9ee6a5091cb68b`       | Bounded GO with SF-R1/SF-R2; subsequent two-site repair is `68a8726ea564a88fe3663dfd84bfde8c4550d6e6`, independently reported CLOSED in PR 232 at `510cad76132b1d18d581da581fe9c1ee162c8b59`; bounded closure accepted through PR 229, as recorded in the programme acceptance |
| Programme self-audit                   | Input `68a8726ea564a88fe3663dfd84bfde8c4550d6e6` | Author-side cross-document and boundary investigation; not an independent opening review                                                                                                                                                                                       |
| Scaling original review, PR 235        | `431ac4e6e59d880eca3df07219783d622ce11e31`       | Bounded GO with SF-1/SF-2; review `4137e4902d8460e059b3d60e31fa45905a8df5fb`; superseding corrections are preserved in the close review                                                                                                                                        |
| Scaling close review, PR 235           | `a45590d5baeee2d0e34289be8cd0f5524cb81631`       | Review `3332083e62effda3af823dc47b8d56e15cbc7fd3`: SF-1 CLOSED, SF-2 substantively CLOSED, C-1 SHOULD-FIX; author repair accepted through PR 234, not a new independent C-1 close verdict                                                                                      |

The first two returned reviews are preserved under
`review-inputs/r4-public-discussion-preparation/` and `review-inputs/r4-rfc-preparation/`.
PR 225's review is preserved under `review-inputs/r4-preparation-repair/`.
Historical author-run JSON status is not a current programme-status field.

The scaling reviews are preserved under
`review-inputs/r4-power-scale-exploration/` and
`review-inputs/r4-power-scale-exploration-close/`. SF-1 is closed; SF-2 is
closed on substance, with the subsequent author-side C-1 repair included in the
steward-accepted PR 234 input. This is not a new independent C-1 close verdict.

## Complete source and interpretation hold map

These entries restate the pinned semantic result, not new source findings.

| Hold or ambiguity                | Affected claim                                                  | Disposition before promotion                                                                                                                                                      |
| -------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| S1 and S5                        | Classical factorial F tests and any retained intervals          | Directly inspect adequate original sources, map assumptions and obtain independent review; Cochran/Yates are candidates, not irreplaceable named-file requirements                |
| S2                               | Interaction interpretation and historical decomposition lineage | Williams full text remains uninspected; clarify whether each retained claim needs this lineage or an independently justified replacement                                          |
| P1 version and formula ambiguity | Factorial/randomization normalization                           | Resolve the recorded arXiv-version/printed-date mismatch and equation-example ambiguity against exact source bytes and page images; do not promote a transcription into an oracle |
| S3                               | Type I-IV conventions in Candidate C                            | Original mappings incomplete; no portable default selected                                                                                                                        |
| S4                               | Robust and generic permutation variants                         | Exact procedure and assumptions incomplete; exclusion from Candidate A does not establish invalidity                                                                              |
| S6                               | Two-system unbalanced comparison                                | Not executed; remains a research obligation; an independent review permits staging only where Candidate A's exclusion rationale does not depend on it                             |

No source hold above was closed by the new algebraic boundary probe. The latest
Cochran acquisition report remains attributed testimony in the source follow-up.

## Numerical feasibility beyond the accepted finite record

| Quantity or hazard               | Evidence route                                                                                         | Remaining boundary                                                                                                                                                                                   |
| -------------------------------- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Effect/SS/SSE/F algebra          | Original numerical result plus reviewed SS/F probe                                                     | No supported domain, full error propagation or production operation graph selected                                                                                                                   |
| F tail and critical bracket      | PR 190 input `5962cc2def5b1aca7e30d219f12a9a6486ca7b11`: exact-rational and Decimal exploratory routes | Numerator df is one; positive even integer residual df only; not a general Candidate B oracle; endpoint handling, portable projection, series remainder and resource certification remain incomplete |
| Finite inputs with extreme scale | Reviewed scale witnesses and accepted scaling exploration                                              | All three current graphs can yield NaN although exact F is 100, 36, 4; scaling alone is not established as sufficient; graph, projection, supported domain and refusal policy remain undecided       |
| Intervals and protected families | Conditional semantic/numerical work                                                                    | Shared estimated residual denominator does not imply independent p-values; no automatic multiplicity reuse or interval/test duality after rounding                                                   |
| Trace and supported execution    | Earlier toy controls and proposed strategy                                                             | Dictionary inequality is not certificate/trace tamper resistance; no production trace, admission predicate or platform certification follows                                                         |

Source support for an F distribution and numerical ability to evaluate an F tail
are separate prerequisites. Neither one substitutes for the other.

## Returned programme review

[PR 232 review](../../../review-inputs/r4-programme-audit/REVIEW-RESULT.md),
commit `510cad76132b1d18d581da581fe9c1ee162c8b59`, reports bounded GO at
`f01b870bdce4e051476e4b74d56b4deb4217307e`, SF-R1/SF-R2 CLOSED and independent
reproduction of the scale fixture and corpus. None of R4-P1 through R4-P6 is
closed. See [the receipt and follow-up](programme-review-receipt-2026-09-09.md)
for the consumed handoff version, findings and author-side qualifications.

## Returned opening-preparation review

[PR 240 review](../../../review-inputs/r4-opening-preparation/REVIEW-RESULT.md)
at `d065570393f2d7b7ad9ba64ecb101c77cc79cd2f` reports bounded preparation GO
at `964fe8640399a984e42723ad3e6247971c067fc8` with four SHOULD-FIX items.
The [repair record](opening-preparation-repair.md) maps the author-side responses;
they have not received an independent close verdict or steward acceptance.
The [source acquisition follow-up](source-acquisition-followup-2026-09-09.md)
records a newly inspectable alternative paper and remaining acquisition tasks.
This does not close S1-S6/P1 or any R4-P1 through P6 condition.

## Supplied normal-model source and proposed scope staging

The [normal-model source result](normal-model-source-result.md) records the
user-supplied Tian/Styan PDF, all-n projection and null-calibration derivation,
and finite author-side exact checks. The [opening-scope proposal](normal-model-opening-scope.md)
requests review of an opening route without interval, multiplicity or historical
claims, preserving the wider source obligations. The earlier uninspected-source
entries are historical inputs; receipt and author reading of this new source do
not close S5 or supply the missing independent source review. R4-P1 through P6
remain open and NOT_READY remains the current opening disposition.
