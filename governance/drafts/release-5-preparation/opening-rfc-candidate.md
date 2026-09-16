# Release 5: cross-family declared-design evidence RFC candidate

Status: informative proposal for Research Gate and pre-opening review. Public
discussion is not open. No identifier, Requirement ID, schema, check, bundle or
supported capability is issued by this document.

## Decision requested

Open public discussion of an additive Protocol increment that defines:

1. a cross-family declaration-completeness contract and explicit, versioned
   per-Profile projection mappings;
2. a required selection-timing status owned by a successor Record surface;
3. a successor non-claim boundary; and
4. a common, inspectable verification-report view.

The increment consumes the already-conformant Record's selected Analysis Contract,
Profile and interpretation-bundle identities, integrity binding and Profile
admissibility result. It does not create a second tuple-binding rule or standardize
the selection policy.

The first slice considers only three continuous-outcome design families:

1. independent two-group;
2. paired two-condition; and
3. independent multi-group.

Every family remains conditional on a separately accepted Contract and bundle. The
proposal does not adopt, accelerate or reinterpret an owning release.

## Problem

Each issued or candidate Profile already requires its own design declarations,
existing closed schemas and identity rules already require one selected tuple, and
the Record integrity mechanism already binds those fields. R5 does not repair a
missing-declaration or tuple-uniqueness gap.

The residual interoperability gap is cross-family. Equivalent design facts occupy
different Profile-owned fields and vocabularies, so a relying party has no
versioned, common projection or report view across families. The Record also has no
portable selection-timing status, and the existing non-claims do not specifically
prevent a passed cross-family check from being read as endorsement of selection
quality. Those four residuals are the proposed Release 5 work.

## Candidate meaning

The proposed increment would require:

- every participating Profile version to provide one truth carrier for every
  projected design fact;
- the cross-cutting specification to own an explicit, versioned mapping table for
  each participating Profile version, without generic name matching;
- a required, non-defaulted selection-timing status as the projection's sole
  non-Profile input;
- the check to depend on the selected Profile's existing admissibility result and to
  consume the existing tuple identities without re-adjudicating either; and
- every result, including a passed result, to emit the common evidence view defined
  below.

A successful check establishes only that the emitted projection follows the
applicable mapping table, the timing status is present, and the existing selected
tuple and admissibility evidence were used consistently. It does not establish a
new tuple identity or a second admissibility decision.

The first slice standardizes only the cross-family projection, timing and report
evidence for a finalized selection. It does not create a producer-side, pre-Record
negative-selection workflow artifact for clarification or unsupported-design
states. Existing conformance failures and Profile inadmissibility remain governed by
their existing owners.

## Candidate invariants

1. The Record uses explicit declarations; pairing, independence, group membership
   and analysis population are not inferred from row order, timestamps, labels or
   numerical values.
2. Existing conformance supplies exactly one Contract, Profile and bundle tuple
   through the existing identity carriers; R5 consumes rather than redefines it.
3. Missing or contradictory declarations do not become successful through defaults.
4. The Design Declaration Envelope is an unstored projection over one Profile-owned
   truth carrier per design fact, plus exactly one non-Profile input: the
   successor-Record-owned selection-timing status.
5. The selection-evidence check declares `depends_on` for the selected Profile's
   admissibility result. It verifies cross-family evidence consistency and does not
   repeat the Profile's judgment or numerical recomputation.
6. A passing check does not establish uniqueness, optimality, fairness or absence of
   bias, preregistration, declaration truth, assumption truth, numerical correctness,
   whole-project validity or use of any particular private policy.
7. Existing bundle identifiers, Record meanings and pinned conformance results are
   not reinterpreted.
8. An unsupported bundle still fails exact dispatch before bundle-specific Record
   interpretation; selection evidence never creates fallback routing.

## Product selection and Protocol evidence boundary

The method-selection policy, recommendation algorithm, question sequence,
preference model and operating data remain Layer 2 product technology. Release 5
does not register, publish, execute or verify them. The Protocol begins at the
finalized declarations and selected tuple.

A Layer 2 implementation may ask questions, rank alternatives, authenticate a
principal and call a verification service. The Protocol does not standardize that
dialogue, command API, agent session, authentication flow, transport or user
interface. It does not execute a language model and does not accept model reasoning
as evidence.

Opaque product-event provenance, attribution, attestation and approver identity are
outside the first slice. A future public policy language, provenance format or proof
mechanism requires its own Research Gate, Charter review and public decision.

## Declaration ownership and projection

The Design Declaration Envelope is a deterministic logical projection, not an
independently stored declaration object. Every projected design fact has exactly one
truth carrier in its owning Profile or separately accepted successor declaration
schema. The cross-cutting specification owns an explicit, versioned mapping table
for each participating Profile version; there is no inference by field-name
similarity.

The projection exposes only facts whose meaning is shared across the candidate
family set:

- outcome type;
- experimental-unit structure;
- independent or paired relationship;
- declared group or condition count;
- presence of an explicit pairing identity when pairing is declared;
- presence of repeated or clustered structure;
- analysis-population identity.

The selection-timing status is the projection's sole non-Profile input and is owned
by the R5 successor Record surface.

The projection does not absorb family-specific analysis meaning or create duplicate
JSON fields. The selected Profile continues to own variance structure, detailed pair
admissibility, flattened-design restrictions, multiplicity, missingness, numerical
preconditions and other family-specific declarations. R5-aware successor schemas
are needed only where an owning family lacks a required truth carrier.

## Timing declaration boundary

The first slice proposes a required, non-defaulted timing status with candidate
values `pre_outcome`, `post_outcome` and `unknown`:

- `pre_outcome`: the selection decision was completed before the selecting person or
  system, including any selector input context, had access to observed outcome
  values for the declared analysis population;
- `post_outcome`: that person or system had access to at least one such value before
  the selection decision was completed; and
- `unknown`: the producer cannot attribute either of the preceding states.

`pre_outcome` does not by itself mean before data collection or before unblinding.
The status does not prove when access or selection occurred. Neither `post_outcome`
nor `unknown` is automatically a structural failure in the first slice.

Every selection-check result carries the exact timing status in its evidence,
including a passed result, so a bare `passed` status cannot conceal a post-outcome or
unknown declaration. A Profile may impose a narrower condition only if that meaning
is expressly owned and reviewed.

## Common verification-report view

Every check result emits inspectable evidence containing:

- the selected Profile identifier and version;
- the applicable projection-mapping identifier and version;
- each projected fact, its emitted value and its exact Profile source path;
- the selection-timing status;
- the existing Contract, Profile and bundle identities consumed by the check;
- the exact Profile-admissibility result identity and outcome on which the check
  depends; and
- the applicable nine-item non-claim boundary.

The view is derived verifier output, not a second declaration store. Report-schema
design may encode the non-claim boundary by a stable clause reference rather than
copying prose, but a relying party must be able to identify it from the result.

## Conditional family set

| Family                  | Proposed projected evidence                                                  | Dependency boundary                                                                                                                                           |
| ----------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Independent two-group   | Exactly two declared independent groups and the admitted analysis population | Conditional on a separately accepted successor independent-two-group Contract and bundle; the Release 1 legacy method binding is not treated as that Contract |
| Paired two-condition    | Explicit pair identity and two declared conditions                           | Conditional on the Release 2 decision and issued surfaces                                                                                                     |
| Independent multi-group | At least three explicitly declared independent groups                        | Conditional on the Release 3 decision and selected vertical increment                                                                                         |

The table does not itself decide variance assumptions, omnibus or post-hoc
procedure, multiplicity family, missingness policy or numerical algorithm. Those
remain owned by the selected Contract, Profile and Public Checks.

## Explicit exclusions

- public method-selection policy, policy registry or recommendation algorithm;
- opaque references to product-side selection events or other extra-Record
  provenance;
- attribution, attestation, approver identity or authentication evidence;
- product, agent or user-interface routing behavior;
- claims that the selected tuple was unique, optimal or superior;
- selection inferred from observed outcome values or software defaults;
- producer-side clarification and unsupported-design workflow artifacts;
- automatic switching between parametric and rank-based procedures;
- rank, permutation and resampling family support;
- factorial, repeated, clustered, longitudinal or mixed designs;
- regression, categorical, survival, count or nonlinear families;
- inferred declarations or complete-case defaults;
- producer-selected tolerances, confidence levels or algorithms;
- an overall `VERIFIED` status or whole-project validity claim; and
- product telemetry, data-retention policy or incident operations.

## Candidate authority placement

The exact path and Requirement-ID inventory remains open. The anticipated additive
owners are:

| Subject                          | Candidate owner                                                                      |
| -------------------------------- | ------------------------------------------------------------------------------------ |
| Common projection and non-claims | One new cross-cutting STABLE-INTENT specification under `spec/`                      |
| Per-Profile projection mappings  | Versioned tables owned by that cross-cutting specification                           |
| Family-specific declarations     | Existing or separately accepted Profile specifications                               |
| JSON representation              | Additive closed successor Record schema referencing existing tuple identity carriers |
| Cross-family verification        | New `consistency_only` Public Check specification and registry entry                 |
| Exact supported combinations     | Additive interpretation-bundle entries                                               |
| Scoped verification failures     | Additive report-schema version and registered reason codes                           |
| Common report evidence view      | The same additive report-schema version                                              |
| Non-claims                       | New additive successor clause; no edit to `NRS-CORE-0009` is proposed                |
| Interoperability                 | Positive, negative, ambiguity and historical-preservation conformance fixtures       |

There is no `selection-policy` identifier family, policy registry, policy ADR,
policy vocabulary term or policy authority-manifest target in this proposal. The
projected-fact and timing clauses fit the existing `NRS-CORE` namespace and the
check fits `NRS-VERIFY`; no new Requirement-ID prefix is proposed.

Existing exact bundle dispatch remains owned by `NRS-VERSION-0005`,
`NRS-VERSION-0007` and `NRS-VERSION-0008`; this proposal does not amend their
meaning. Existing verification-report separation and exact Record reference remain
owned by `NRS-CORE-0008` and `NRS-VERIFY-0011`.

## Anticipated stability and discussion window

The working proposal is additive STABLE-INTENT material with a minimum 30-day
public-discussion window. This is not a final tier assessment. If the exact impact
inventory requires changing existing CORE meaning rather than adding a successor
clause or surface, the CORE process and 60-day minimum apply. No clock starts until
an authorized public issue is actually created.

## Research and implementation holds

The following remain open before design freeze:

- full-text confirmation of the named Research Gate source-access hold;
- independent methodological close-only review of the repaired research result;
- reconciliation with the exact separately accepted Contract and bundle for every
  candidate family;
- exact clause, Requirement-ID, schema and public-surface inventory;
- exact per-Profile version projection tables;
- successor timing representation, common report view and check mechanics;
- independent fixed-input close-only opening review; and
- steward authorization for the exact candidate.

Numerical algorithms and tolerances remain owned by each selected procedure. Release
5 does not create a universal numerical tolerance or certify an implementation by
composition.

## Opening boundary

Public discussion may open after the revised question is frozen, the authority and
surface inventory is reviewable, predecessor dependencies remain explicit, and an
independent reviewer confirms the product/Protocol boundary and non-claims. The
full-text research hold may remain named during discussion, but it must close before
design freeze and any adoption decision.

Opening discussion would authorize comment and reversible candidate preparation
only. It would not adopt the proposal, issue identifiers, register a bundle, merge
implementation, publish a package or release Release 5.

## Independence disclosure

This draft is coordinator synthesis in the existing planning context. It incorporates
independent and same-session review records, but this scope revision is not
independent clearance.
