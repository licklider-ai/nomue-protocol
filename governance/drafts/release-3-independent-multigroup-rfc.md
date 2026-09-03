# Pre-Public Draft RFC: Release 3 Independent Multi-Group Continuous Inference and Multiplicity

**Status: pre-public draft; public discussion not open.** This informative draft is
being prepared under the
[Release 3 public-review preparation record](release-3-preparation/README.md).
It creates no Protocol meaning, identifier, Requirement ID, schema, Public Check,
supported capability, RFC window, or release commitment.

No discussion URL, opening timestamp, minimum-window determination, or earliest
decision timestamp has been assigned. Those fields are recorded only when the
public-opening gate is satisfied and the discussion issue is actually opened.

## Summary

Release 3 is proposed as a bounded but comprehensive successor program for
explicitly declared, one-way, independent multi-group continuous data. It would
define a shared Profile and separately closable Analysis Contracts and Public Checks
for omnibus inference, contrasts, post-hoc comparisons, simultaneous intervals, and
multiplicity control.

The public question includes one-member omnibus, all-pairs, many-to-one,
planned-contrast, and data-dependent post-hoc families. It also includes relevant
FWER and FDR procedures and requires each protected family, criterion, procedure,
ordering, and output guarantee to be explicit. No method would be selected from
observed values or silently substituted after a refusal.

The exact procedures, population targets, variance assumptions, member sets,
degrees-of-freedom constructions, result surfaces, and numerical contracts remain
pre-opening research holds. This draft records where those decisions belong rather
than filling them from a software default.

## Motivation

The current Protocol begins with one independent two-group Welch slice, and the
Release 2 proposal adds a paired two-condition slice and successor identity and
bundle architecture. A one-way independent multi-group capability is the next
bounded extension that can test whether the Protocol's Contract, Profile, Public
Check, numerical evidence, and fail-closed patterns remain usable beyond a two-group
test.

Multi-group inference also introduces comparison-family and multiplicity boundaries
that a two-group slice can leave implicit. The Protocol should represent the
difference among an omnibus claim, a fixed contrast family, all-pairs or many-to-one
follow-up, data-dependent post-hoc work, and the error criterion each procedure
actually protects. Restricting Release 3 to one omnibus member would postpone the
central semantic problem rather than test the successor architecture against it.

## Proposed semantic boundary

The Release 3 Profile would cover only:

- at least three explicitly identified groups;
- independent experimental units assigned explicitly to exactly one group;
- one finite continuous outcome per admitted unit;
- an explicitly declared one-way design;
- no hidden selection, transformation, weighting, imputation, or duplicate
  resolution; and
- each Analysis Contract selected by exact identifier through one exact successor
  interpretation bundle.

Each selected Contract or Public Check would define:

- the population target, member hypotheses, and null or interval claims;
- the variance and sampling assumptions attached to the claim;
- the protected comparison family, selection timing, error criterion, and guarantee
  strength;
- the statistics, covariance quantities, reference distributions, degrees of
  freedom, critical values, adjusted p-values, and intervals it uses;
- the order of numerical operations and target-format projection;
- the supported input, value, statistic, resource, platform, and execution domain;
  and
- deterministic refusal behavior outside that domain.

No Contract would claim that omnibus rejection means every group differs, or that
non-rejection proves equality. It would not produce or imply a follow-up comparison
that was not a member of the declared family and independently recomputed under the
selected procedure.

## Comparison-family and multiplicity program

Release 3 research and public discussion cover at least these member-set classes:

- one omnibus hypothesis;
- all pairwise comparisons;
- many-to-one comparisons against an explicit control;
- an explicitly declared finite family of planned contrasts;
- data-dependent or post-hoc comparison families with their selection rule; and
- hierarchical or gatekeeping families when their graph and transition rules are
  explicit.

The procedure catalogue covers at least single-step, stepwise, closed-testing,
simultaneous-interval, distribution-specific, FWER, FDR, and resampling-based
families. Named candidates are catalogue entries, not aliases or preselected
defaults. Each entry fixes or explicitly leaves open the member set, error criterion,
weak or strong guarantee, procedure, ordering and tie rules, alpha allocation where
relevant, confidence procedure, output relationship, numerical dependencies, and
refusal behavior.

Comprehensive means that a documented source search and inclusion rule produces a
finite catalogue and that every in-scope entry receives an explicit disposition. It
does not mean every historical technique is automatically supported. Release 3 may
implement the accepted entries as separately reviewed vertical increments, but the
final Release 3 disposition cannot silently omit an entry from its catalogue.

An omnibus result never authorizes a follow-up family by implication. Where a
procedure uses an omnibus gate, that gate and its error-control consequence are part
of the registered procedure rather than a workflow convention.

## Admissibility and refusal boundary

The Release 3 program would refuse rather than reinterpret:

- fewer than the supported number of groups or observations;
- an observation without explicit admitted group membership;
- missing, non-finite, malformed, or unsupported numeric input;
- a unit represented in more than one group;
- paired, repeated, clustered, longitudinal, blocked, factorial, or interaction
  designs;
- a request involving covariates, regression, weights, transformations,
  normalization, imputation, or automatic complete-case selection;
- an input for which the selected statistic or degrees of freedom are undefined;
- a value or intermediate outside the reviewed numerical domain;
- a resource or controlled-execution precondition failure; and
- any bundle, Contract, Profile, schema, or Public Check identity not selected by
  exact identifier.

The exact first-failure ordering and reason-code inventory remain later candidate
decisions.

## Boundary exclusions

The Release 3 RFC does not propose:

- a general framework covering designs beyond independent one-way groups;
- factorial, interaction, repeated-measures, mixed-model, or regression support;
- rank-based or Bayesian primary inference Contracts, and permutation-based omnibus
  Contracts; resampling used by an explicitly catalogued multiplicity procedure
  remains in research scope;
- standardized effect sizes;
- causal, clinical, regulatory, or domain-specific interpretation;
- a Record-supplied confidence level, tolerance, method, or algorithm;
- general missing-data or preprocessing semantics;
- attestation or procedure-selection provenance expansion; or
- an overall scientific-validity or `VERIFIED` judgment.

## Identity and Release 2 dependency

Release 3 is intended to reuse the successor distinction among Contract, Profile,
schema, Public Check, canonicalization, and interpretation-bundle identities being
prepared in Release 2. That reuse remains conditional until Release 2 has an
authoritative disposition.

Release 3 candidate identifiers remain unissued. They are not aliases of Release 1
or Release 2 identifiers, and a verifier would accept them only through an exact
bundle that eventually registers them. If Release 2 changes the successor grammar,
schema roles, bundle model, or dispatch boundary, this draft is revised before
opening or treated as a material public-review change after opening.

Release 2 publication is not a prerequisite to opening Release 3 discussion. It is a
prerequisite to treating any reused Release 2 surface as settled Protocol meaning.

## Research Gate

Two independent research lanes are commissioned:

1. [statistical semantics and comparison-family research](release-3-preparation/semantic-research-commission.md);
2. [multiplicity numerical and oracle research](release-3-preparation/numerical-research-commission.md).

The statistical result and its independent review must make the comprehensive
program scope reviewable before public discussion opens. It must provide the search
method, finite catalogue, procedure dispositions, dependency order, target and
member-set distinctions, assumptions, declarations, result classes, and refusal
conditions, or narrow or defer the proposal.

The numerical investigation may continue during the public window if this RFC does
not preselect its outcome. Before authoritative design freeze, Release 3 still needs
independently reviewed operation graphs; selected F, t, Studentized-range,
multivariate-probability, adjustment, or resampling procedures as applicable;
mathematical-truth evidence; binary64 projection policy; resource and support bounds;
platform or supported-execution predicates; tolerances; boundary fixtures; and
failure ordering.

Existing foundational estimand and multiplicity records are reused only within
their source-bounded dispositions. Open research holds are not described as closed.
The boundary exclusions keep attestation, sensitivity links, general missingness,
and broad data-transformation semantics outside the proposed program.

## Proposed authoritative change classes

If accepted after public review and later ratification, the eventual change set is
expected to update these classes together:

1. one normative independent multi-group Profile;
2. one or more separately identified normative Analysis Contracts;
3. capability-scoped Requirement namespaces and anchors;
4. permanent Contract, Profile, schema, Public Check, and bundle identifiers;
5. closed Record, result, and verification-report schema surfaces;
6. an exact interpretation-bundle binding;
7. versioned Public Checks, explicit comparison-family bindings, and check-owned
   numerical policies;
8. reason codes, positive and negative conformance fixtures, and independent
   expectations;
9. exact-bundle reference-verifier dispatch and the non-authoritative reference
   calculation; and
10. authority assignments, public-contract-surface impact, and generated views.

No item in this list is changed by this draft.

## Candidate development during review

The public review window would not be an implementation freeze. Reversible,
explicitly unissued candidate namespaces, identifiers, schemas, fixtures, numerical
evidence, tables or algorithms, Contracts, Public Checks, and reference code could
be prepared and independently reviewed during the window. Candidate work proceeds
in dependency-ordered vertical increments; a shared publication train does not merge
their separate semantic and evidence obligations.

Clarifications, catalogue dispositions, and evidence that preserve the reviewed
program boundary would not by themselves restart the window. Adding an uncatalogued
target, design, member-set class, error criterion, or compatibility boundary would be
handled under the RFC process and may require a restarted window.

## Compatibility

Release 1 and an accepted Release 2 remain immutable historical snapshots. Release 3
would be additive. No old Record, Contract, Profile, schema, check, or bundle would
be silently reinterpreted, upgraded by version proximity, or routed to Release 3.

Exact identifiers and bundle selection would remain the only supported dispatch
path. Unsupported interpretations fail closed.

## Pre-opening holds

| Hold    | Required resolution before public opening                                                                                                                           |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `R3-H1` | Complete and independently review the documented search, in-scope technique catalogue, and explicit disposition ledger                                              |
| `R3-H2` | Fix the one-way design, unit, group, analysis-population, outcome, comparison-family, contrast, control, and selection declarations                                 |
| `R3-H3` | Separate omnibus, pairwise, many-to-one, planned, post-hoc, hierarchical, interval, FWER, and FDR meanings and their coherent result classes                        |
| `R3-H4` | Establish a dependency order for separately closable Release 3 Contracts and Public Checks without silently selecting implementation defaults                       |
| `R3-H5` | Confirm numerical feasibility coverage or explicit holds for every implementation candidate without preselecting an unreviewed graph, bound, platform, or tolerance |
| `R3-H6` | Reconcile the draft against the actual Release 2 disposition or keep every affected dependency explicitly conditional                                               |
| `R3-H7` | Complete an independent pre-opening readiness review with no omitted in-scope technique or undisclosed semantic selection                                           |

The public-opening gate does not require candidate implementation or final numerical
closure. It requires a bounded public question whose remaining candidate decisions
are visible and reversible.

## Expected stability and discussion window

The proposed design intent, independent-group boundary, omnibus target, and
comparison-family meaning are expected to affect STABLE-INTENT material. Candidate
schema layouts, numerical procedures, reason codes, and reference paths are expected
to begin as EXPERIMENTAL. The final classification is confirmed before opening.

If the proposal requires a change to existing CORE meaning rather than an additive
successor surface, it is reclassified before the public window begins. The
authoritative stability-tier registry determines the minimum window; this draft does
not copy or start that duration.

## Decision requested after opening

After the applicable public window, the steward would be asked to accept, revise,
defer, or reject the bounded comprehensive Release 3 program and the disposition of
every catalogued technique. Permanent namespace, identifier, schema,
numerical-contract, supported-execution, Contract, Public Check, bundle,
release-candidate, and publication decisions remain separately reviewable
ratification items.

Until then, this file is only a pre-public draft and no Release 3 decision has been
requested or made.
