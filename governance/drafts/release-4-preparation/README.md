# Release 4 Research Preparation

**Status: informative pre-public research work-start record.** Release 4 public
discussion is not open. This package prepares a bounded factorial and interaction
question for independent investigation. It creates no Protocol meaning, identifier,
Requirement ID, supported capability, RFC window, implementation authority, or
release commitment.

## Repository identity

This preparation starts from main commit
`638dd80e4f74254e881af2eae74b2ccc95859033`, tree
`d3697227340e3ec380d99218398308f52edd5432`. The steward execution issues that
activate the research commissions must pin the containing commit and the exact
commission blobs after this package is merged.

The initial package was merged at
`58675e66dbf263c94688d47867c731ad4efddbf6`. This subsequent informative
self-review revision does not replace the fixed inputs of Issues #177 and #178.
Their original blobs and repaired issue bodies remain the commissioned inputs.
The [self-review record](self-review-result.md) tracks corrections and open work;
it is not independent review or an adoption decision.

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

Historical research-start snapshot, 2026-09-06, at `58675e66dbf263c94688d47867c731ad4efddbf6`:
the Release 3 semantic result (blob `8f21526040924b891f64724c2d0fde9ea94eff92`)
records `NARROW`; its source-acquisition result (blob
`5465cbcfd00708facac94785d9244b79166cb81e`) retains 13 incomplete source holds.
Release 3 numerical PR #174 was open and unaccepted at research start. This is
a dated input snapshot, not a live status or a claim that an accepted numerical
foundation already exists. Later reuse requires fresh commit/tree/blob and
review-state pins.

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

| Lane                              | Candidate source or source family                                                                                                       | Planned evidentiary role                                                                           | Current state                                                                          |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Factorial effects                 | Yates, _The Design and Analysis of Factorial Experiments_ (1937) and original factorial-analysis lineage identified from its references | Balanced factorial contrasts, interaction construction, replication, and degrees of freedom        | Identify exact edition and inspect primary text                                        |
| Interaction interpretation        | E. J. Williams, "The Interpretation of Interactions in Factorial Experiments," _Biometrika_ 39 (1952), 65–81                            | Meaning and limits of interaction decompositions                                                   | Publisher metadata identifies the author; full text and exact scope remain uninspected |
| Orthogonal two-level design       | NIST/SEMATECH Engineering Statistics Handbook, sections on two-level full factorial designs and effect estimation                       | Authoritative executable/formula cross-check; not a substitute for original methodological sources | Public text identified; inspect exact version and archive identity                     |
| Unbalanced hypotheses             | Original papers defining or criticizing Type I, II, III, and IV sums of squares and estimable-function conventions                      | Determine whether Candidate C has one defensible portable meaning or must be split/deferred        | Bibliographic search required; software manuals alone are insufficient                 |
| Robust/randomization alternatives | Original randomization-based and heteroscedastic factorial inference papers                                                             | Determine whether these are variants, alternatives, or later Contracts                             | Catalogue and inspect by exact procedure                                               |
| Numerical F route                 | Primary numerical literature and authoritative upstream documentation for the exact F-tail/quantile algorithms considered               | Algorithm, domain, convergence, projection, and oracle evidence                                    | Reuse candidates from Release 3 only after inspection and scope match                  |

The source packet expected for Release 3 may satisfy part of the final row or identify
reusable multiplicity sources. It cannot close the factorial-specific rows merely by
arriving in the repository workflow.

Bibliographic correction: the [publisher record](https://academic.oup.com/biomet/article-abstract/39/1-2/65/295165)
identifies E. J. Williams, not Tukey, for DOI `10.1093/biomet/39.1-2.65`.
Publisher-indexed metadata was checked on 2026-09-06; the direct page route failed.
This correction establishes no methodological claim or primary-text completion.

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

## Immediate sequence

1. merge this bounded work-start package and open separate public execution issues for
   the two commissions with exact commit and blob pins;
2. execute the semantic commission independently and obtain its exact-head review;
3. execute preliminary numerical reuse analysis in parallel, then bind its final
   disposition to the reviewed semantic result and obtain independent review;
4. reconcile Release 3 results as they become accepted, without changing the Release
   4 scope silently;
5. draft and independently review the standalone Release 4 RFC; and
6. open public discussion only through a distinct steward action after R4-P1,
   R4-P2, R4-P4, R4-P5, and R4-P6 are reviewably resolved. Only R4-P3 may remain
   an explicitly named unresolved numerical hold at opening; that exception does
   not authorize design freeze or implementation while numerical evidence is open.
