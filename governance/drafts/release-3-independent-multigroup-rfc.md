# Pre-Public Draft RFC: Release 3 Independent Multi-Group Continuous Omnibus Slice

**Status: pre-public draft; public discussion not open.** This informative draft is
being prepared under the
[Release 3 public-review preparation record](release-3-preparation/README.md).
It creates no Protocol meaning, identifier, Requirement ID, schema, Public Check,
supported capability, RFC window, or release commitment.

No discussion URL, opening timestamp, minimum-window determination, or earliest
decision timestamp has been assigned. Those fields are recorded only when the
public-opening gate is satisfied and the discussion issue is actually opened.

## Summary

Release 3 is proposed as one narrow successor capability for explicitly declared,
one-way, independent multi-group continuous data. The initial slice would define one
omnibus Analysis Contract and one Profile for at least three independent groups.

The initial comparison family contains exactly one omnibus hypothesis. The release
would not automatically provide post-hoc comparisons, pairwise or planned contrasts,
simultaneous intervals, standardized effects, or a significance boolean. No method
would be selected from observed values or silently substituted after a refusal.

The exact omnibus procedure, population target, variance assumptions,
degrees-of-freedom construction, result surface, and numerical contract remain
pre-opening research holds. This draft records where those decisions belong rather
than filling them from a software default.

## Motivation

The current Protocol begins with one independent two-group Welch slice, and the
Release 2 proposal adds a paired two-condition slice and successor identity and
bundle architecture. A one-way independent multi-group capability is the next
bounded extension that can test whether the Protocol's Contract, Profile, Public
Check, numerical evidence, and fail-closed patterns remain usable beyond a two-group
test.

Multi-group inference also introduces a comparison-family boundary that a two-group
slice can leave implicit. The Protocol should state whether it verifies only one
omnibus hypothesis or also protects a family of follow-up comparisons. This proposal
starts with the smaller one-member family so that an omnibus result is not
misrepresented as pairwise evidence.

## Proposed semantic boundary

The Release 3 Profile would cover only:

- at least three explicitly identified groups;
- independent experimental units assigned explicitly to exactly one group;
- one finite continuous outcome per admitted unit;
- an explicitly declared one-way design;
- no hidden selection, transformation, weighting, imputation, or duplicate
  resolution; and
- one Analysis Contract selected by exact identifier through one exact successor
  interpretation bundle.

The selected Contract would define:

- the population target and omnibus null;
- the variance and sampling assumptions attached to the claim;
- the statistic and numerator and denominator degrees of freedom;
- the upper-tail probability and any other approved result quantity;
- the order of numerical operations and target-format projection;
- the supported input, value, statistic, resource, platform, and execution domain;
  and
- deterministic refusal behavior outside that domain.

The Contract would not claim that rejection means every group differs, or that
non-rejection proves equality. It would not produce or imply a follow-up comparison
that was not separately registered and recomputed.

## Comparison-family and multiplicity boundary

The initial Release 3 candidate uses one explicit comparison-family member: the
omnibus hypothesis owned by the selected Contract. The resulting guarantee applies
only to that member and does not extend to unregistered pairwise, many-to-one,
all-pairs, planned-contrast, post-hoc, or simultaneous-interval claims.

Adding a broader family would require a separate decision that fixes at least the
member set, error criterion, procedure, ordering, alpha allocation where relevant,
confidence procedure, output relationship, and refusal behavior. A successful
omnibus check would not authorize such an addition by implication.

## Admissibility and refusal boundary

The initial slice would refuse rather than reinterpret:

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

## Explicit exclusions

The initial Release 3 RFC does not propose:

- a general analysis-of-variance framework;
- factorial, interaction, repeated-measures, mixed-model, or regression support;
- rank, permutation, Bayesian, or resampling procedures;
- post-hoc or contrast support;
- multiplicity control beyond the one-member omnibus family;
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
2. [F-distribution numerical and oracle research](release-3-preparation/numerical-research-commission.md).

The statistical result and its independent review must make the semantic scope
reviewable before public discussion opens. It must state the selected procedure
direction, target, null, assumptions, required declarations, result boundary, and
refusal conditions, or narrow or defer the proposal.

The numerical investigation may continue during the public window if this RFC does
not preselect its outcome. Before authoritative design freeze, Release 3 still needs
an independently reviewed operation graph, F-tail or other selected probability
procedure, mathematical-truth evidence, binary64 projection policy, resource and
support bounds, platform or supported-execution predicate, tolerances, boundary
fixtures, and failure ordering.

Existing foundational estimand and multiplicity records are reused only within
their source-bounded dispositions. Open research holds are not described as closed.
The initial exclusions keep attestation, sensitivity links, general missingness, and
broad data-transformation semantics outside the proposed slice.

## Proposed authoritative change classes

If accepted after public review and later ratification, the eventual change set is
expected to update these classes together:

1. one normative independent multi-group Profile;
2. one normative omnibus Analysis Contract;
3. capability-scoped Requirement namespaces and anchors;
4. permanent Contract, Profile, schema, Public Check, and bundle identifiers;
5. closed Record, result, and verification-report schema surfaces;
6. an exact interpretation-bundle binding;
7. versioned Public Checks and check-owned numerical policies;
8. reason codes, positive and negative conformance fixtures, and independent
   expectations;
9. exact-bundle reference-verifier dispatch and the non-authoritative reference
   calculation; and
10. authority assignments, public-contract-surface impact, and generated views.

No item in this list is changed by this draft.

## Candidate development during review

The public review window would not be an implementation freeze. Reversible,
explicitly unissued candidate namespaces, identifiers, schemas, fixtures, numerical
evidence, tables or algorithms, Public Checks, and reference code could be prepared
and independently reviewed during the window.

Clarifications and evidence that preserve the reviewed semantic scope would not by
themselves restart the window. A material change to the target, design, procedure
family, multiplicity guarantee, supported result, or compatibility boundary would be
handled under the RFC process and may require a restarted window.

## Compatibility

Release 1 and an accepted Release 2 remain immutable historical snapshots. Release 3
would be additive. No old Record, Contract, Profile, schema, check, or bundle would
be silently reinterpreted, upgraded by version proximity, or routed to Release 3.

Exact identifiers and bundle selection would remain the only supported dispatch
path. Unsupported interpretations fail closed.

## Pre-opening holds

| Hold    | Required resolution before public opening                                                                                       |
| ------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `R3-H1` | Select and source the bounded omnibus procedure direction, target, null, assumptions, and degrees-of-freedom meaning            |
| `R3-H2` | Fix the minimum one-way design, unit, group, analysis-population, outcome, and admissibility declarations                       |
| `R3-H3` | Fix the minimum scientifically coherent result surface and its explicit non-claims                                              |
| `R3-H4` | Confirm that the one-member omnibus family is a sufficient initial boundary and that all follow-up comparisons remain excluded  |
| `R3-H5` | Confirm numerical feasibility without selecting an unreviewed operation graph, support bound, platform, or tolerance in the RFC |
| `R3-H6` | Reconcile the draft against the actual Release 2 disposition or keep every affected dependency explicitly conditional           |
| `R3-H7` | Complete an independent pre-opening readiness review with no undisclosed semantic selection                                     |

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
defer, or reject the bounded Release 3 semantic scope. Permanent namespace,
identifier, schema, numerical-contract, supported-execution, Public Check, bundle,
release-candidate, and publication decisions remain separately reviewable
ratification items.

Until then, this file is only a pre-public draft and no Release 3 decision has been
requested or made.
