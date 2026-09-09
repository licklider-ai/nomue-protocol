# Release 4 Research Preparation

**Status: informative pre-public research work-start record.** Release 4 public
discussion is not open. This package prepares a bounded factorial and interaction
question for independent investigation. It creates no Protocol meaning, identifier,
Requirement ID, supported capability, RFC window, implementation authority, or
release commitment.

## Current navigation

For the 2026-09-09 programme state, use
[public-discussion readiness](public-discussion-readiness.md) and the
[programme self-audit](programme-self-audit-2026-09-09.md). The initial work-start
identity and sequence below are historical; they are not instructions to repeat
completed preparation or the accepted QR source-copy review. Corrections to this
navigation do not rewrite immutable commission inputs or accept unmerged research.

For the next work, use the [numerical feasibility workplan](numerical-feasibility-workplan.md)
and [programme review handoff](programme-review-handoff.md). Both are author-side
instructions added after the fixed PR 227 input `f01b870bdce4e051476e4b74d56b4deb4217307e`;
they are not part of that reviewed input and do not supply an independent verdict.
The [handoff repair record](programme-handoff-repair-2026-09-09.md) records the
subsequent chat-returned editorial feedback and its disposition.

The [steward acceptance](programme-steward-acceptance-2026-09-09.md) records
integration of the bounded preparation. The subsequent
[power-of-two scaling exploration](power-scale-exploration.md) is new author-side
research accepted separately through PR 234 after PR 235 review and the C-1
repair. Its final acceptance paragraph records the bounded decision; it does not
close public-opening conditions.

The next editorial input is the [opening claim map](opening-claim-map.md), read
with the updated [RFC preparation draft](rfc-preparation-draft.md) and
[impact inventory](rfc-impact-inventory.md). These new recommendations await
review under the [opening preparation handoff](opening-preparation-handoff.md).
They are not covered by the earlier steward acceptances.

The returned PR 240 review is preserved with the
[author-side repair record](opening-preparation-repair.md). For the next source
work, use the [acquisition follow-up](source-acquisition-followup-2026-09-09.md).
Both links are added in the same increment as their destination files.

The supplied Tian/Styan copy is now recorded in the
[normal-model source result](normal-model-source-result.md), with an explicit
[bounded opening-scope proposal](normal-model-opening-scope.md). These are new
author-side inputs for independent assessment, not source-hold closure.

## Repository identity

This preparation starts from main commit
`638dd80e4f74254e881af2eae74b2ccc95859033`, tree
`d3697227340e3ec380d99218398308f52edd5432`. The steward execution issues that
activate the research commissions must pin the containing commit and the exact
commission blobs after this package is merged.

## Objective

Determine whether the first Release 4 vertical slice can be a portable, independently
checkable fixed-effects factorial Contract that represents and recomputes main-effect
and interaction inference without importing ambiguous unbalanced-design conventions,
causal claims, or generalized linear-model behavior.

Research may run before Release 3 public discussion. Every Release 3 dependency stays
conditional until the relevant Release 3 research and Protocol decisions close.

## Scope candidates

The candidates are ordered for investigation, not selected for adoption.

| Candidate | Design boundary                                                                                                                         | Benefit                                                                                                                    | Main additional burden                                                                                                                                      | Initial research priority               |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| A         | Complete balanced replicated `2 × 2`, two fixed factors, independent units, one continuous outcome                                      | Smallest slice that exposes two main effects and one interaction; orthogonal cell structure and integer degrees of freedom | Must fix effect direction, averaging weights, interaction meaning, replication, common-variance assumptions, and joint claim boundary                       | Primary candidate                       |
| B         | Complete balanced replicated `a × b`, two fixed factors with arbitrary finite levels                                                    | General two-factor use and multi-degree-of-freedom effects                                                                 | Variable-size contrasts, larger matrices, wider resource bounds, and more result shapes                                                                     | Compare, then likely stage after A      |
| C         | Unbalanced complete two-factor fixed-effects design                                                                                     | Covers common unequal-cell data                                                                                            | Estimand weighting and Type I/II/III or model-comparison semantics can yield different hypotheses; non-orthogonality and rank decisions expand the contract | Research-only until meanings are closed |
| D         | Missing cells, fractional designs, blocking, random or mixed factors, repeated or clustered units, covariates, or more than two factors | Wider experimental-design coverage                                                                                         | Aliasing, non-estimability, dependence, iterative fitting, covariance choice, and model-selection semantics                                                 | Transfer to later Contracts             |

Candidate A is the leading first slice because it tests the new factorial and
interaction semantics while keeping the initial operation graph finite and explicit.
The semantic investigation may narrow it further or reject it. Candidate priority is
not a Protocol decision.

## Candidate A boundary to investigate

- exactly two declared fixed factors and exactly two declared levels per factor;
- exactly four explicit cells and at least two independent experimental units per
  cell, with an equal admitted count in every cell;
- exactly one finite continuous outcome per admitted unit;
- complete cell membership, with no inferred factor level or duplicated unit;
- a predeclared full model containing both main effects and their interaction;
- separate candidate claim objects for factor A, factor B, and the A-by-B interaction;
- effect directions and factor-level ordering fixed by declarations rather than label
  sorting;
- no automatic model reduction after an interaction result;
- no missingness, imputation, transformation, weighting, covariate adjustment,
  random effect, block, cluster, repeated measurement, or fractional-design rule;
- no causal interpretation inferred from the factorial layout; and
- no familywise claim across the three tests unless a separately identified
  multiplicity procedure protects that declared family.

## Research lanes

1. The [factorial semantics commission](semantic-research-commission.md) investigates
   the estimands, hypotheses, design declarations, assumptions, result classes, and
   refusals for Candidates A through D and returns a bounded programme disposition.
2. The [numerical reuse and oracle commission](numerical-research-commission.md)
   investigates the candidate operation graphs, F-tail and projection reuse,
   independent truth routes, resource bounds, and failure ordering. It may record
   preliminary work before the semantic result exists but cannot issue a final
   numerical disposition without the reviewed semantic handoff.

Each result requires a separate-context independent primary-source review before it
may inform a Release 4 RFC, design freeze, implementation, or public-opening decision.

## Release 3 reuse boundary

Potentially reusable after scope verification:

- the claim-object separation among target, protected family, error criterion, and
  result class;
- fixed family identity and exact procedure-variant identity;
- generic multiplicity transforms applied to an explicitly declared family;
- F-tail, critical-value, binary64-projection, resource-refusal, oracle-separation,
  and supported-execution evidence patterns; and
- exact-bundle dispatch, strict input, and fail-closed architectural rules.

Release 4-specific work remains necessary for factorial main-effect estimands,
interaction hypotheses, level ordering, averaging weights, replication and residual
error, balance, estimability, model hierarchy, cell membership, simple effects, and
any operation graph that combines the four cells. A Release 3 candidate table,
algorithm, tolerance, support bound, platform predicate, or identifier is not
automatically a Release 4 decision.

## Primary-source planning ledger

The commission owns final source selection and direct inspection. This initial ledger
records source routes to inspect, not accepted evidence.

| Lane                              | Candidate source or source family                                                                                                       | Planned evidentiary role                                                                           | Current state                                                             |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Factorial effects                 | Yates, _The Design and Analysis of Factorial Experiments_ (1937) and original factorial-analysis lineage identified from its references | Balanced factorial contrasts, interaction construction, replication, and degrees of freedom        | Identify exact edition and inspect primary text                           |
| Interaction interpretation        | E. J. Williams, "The Interpretation of Interactions in Factorial Experiments," _Biometrika_ 39 (1952), 65–81                            | Meaning and limits of interaction decompositions                                                   | Publisher record identified; full text and exact scope require inspection |
| Orthogonal two-level design       | NIST/SEMATECH Engineering Statistics Handbook, sections on two-level full factorial designs and effect estimation                       | Authoritative executable/formula cross-check; not a substitute for original methodological sources | Public text identified; inspect exact version and archive identity        |
| Unbalanced hypotheses             | Original papers defining or criticizing Type I, II, III, and IV sums of squares and estimable-function conventions                      | Determine whether Candidate C has one defensible portable meaning or must be split/deferred        | Bibliographic search required; software manuals alone are insufficient    |
| Robust/randomization alternatives | Original randomization-based and heteroscedastic factorial inference papers                                                             | Determine whether these are variants, alternatives, or later Contracts                             | Catalogue and inspect by exact procedure                                  |
| Numerical F route                 | Primary numerical literature and authoritative upstream documentation for the exact F-tail/quantile algorithms considered               | Algorithm, domain, convergence, projection, and oracle evidence                                    | Reuse candidates from Release 3 only after inspection and scope match     |

The source packet expected for Release 3 may satisfy part of the final row or identify
reusable multiplicity sources. It cannot close the factorial-specific rows merely by
arriving in the repository workflow.

## Pre-public opening holds

These labels are planning references inside this informative package. A future RFC
may replace them with its own reviewed disposition structure; they are not Protocol
gate identifiers.

| Hold  | Required resolution                                                                                                                                  |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| R4-P1 | Complete and independently review the factorial design, estimand, main-effect, interaction, replication, and refusal semantics                       |
| R4-P2 | Select or narrow the first vertical-slice boundary among Candidates A through D without hiding an unbalanced-design convention                       |
| R4-P3 | Provide an independently reviewed numerical feasibility map for every implementation candidate or explicit unresolved hold                           |
| R4-P4 | Reconcile every reused Release 3 finding against its exact final scope and keep unsettled dependencies conditional                                   |
| R4-P5 | Draft a standalone RFC with explicit affected authority classes, stability tier, exclusions, staged Contracts/Public Checks, and decision requested  |
| R4-P6 | Complete an independent pre-opening readiness review with no undisclosed estimand, interaction, algorithm, tolerance, support, or identity selection |

## Original work-start sequence (historical)

1. merge this bounded work-start package and open separate public execution issues for
   the two commissions with exact commit and blob pins;
2. execute the semantic commission independently and obtain its exact-head review;
3. execute preliminary numerical reuse analysis in parallel, then bind its final
   disposition to the reviewed semantic result and obtain independent review;
4. reconcile Release 3 results as they become accepted, without changing the Release
   4 scope silently;
5. draft and independently review the standalone Release 4 RFC; and
6. open public discussion only through a distinct steward action after R4-P1 through
   R4-P6 are reviewably resolved or explicitly bounded.
