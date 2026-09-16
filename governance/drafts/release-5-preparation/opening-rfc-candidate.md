# Release 5: declared-design analysis binding evidence RFC candidate

Status: informative proposal for Research Gate and pre-opening review. Public
discussion is not open. No identifier, Requirement ID, schema, check, bundle or
supported capability is issued by this document.

## Decision requested

Open public discussion of an additive Protocol increment in which a common Design
Declaration Envelope is projected from Profile-owned declarations and bound to
exactly one selected Analysis Contract, Profile and interpretation bundle, with the
finalized declaration and binding recorded for independent verification.

The first slice considers only three continuous-outcome design families:

1. independent two-group;
2. paired two-condition; and
3. independent multi-group.

Every family remains conditional on a separately accepted Contract and bundle. The
proposal does not adopt, accelerate or reinterpret an owning release.

## Problem

Exact bundle dispatch answers how a verifier interprets a Record after that Record
has named a bundle. Profile admissibility answers whether the selected Profile
admits its owned design declarations. Neither requires a Record to preserve the
declared design, selection timing and exact selected tuple as one integrity-bound,
portable evidence surface.

Without that binding, a product can name a valid Contract while omitting the
declarations needed to assess whether its selected Profile admits the design. A
relying party should be able to verify the stored selection evidence without access
to an agent conversation, product session or private routing log.

## Candidate meaning

The proposed increment would require a successor Record surface to bind:

- a complete, non-contradictory Design Declaration Envelope projected from the
  Record revision's Profile-owned declaration truth carriers;
- exactly one selected Contract, Profile and interpretation bundle;
- references to the existing Record identity carriers for that selected tuple,
  without duplicating competing identity fields;
- the selected Profile's admissibility result;
- a required, non-defaulted declaration of selection timing;
- evidence references sufficient to bind the declarations, selected tuple and
  admissibility result to the Record revision; and
- explicit non-claims for declaration truth, selection quality, assumption truth and
  overall scientific validity.

A successful binding exists only when all of those conditions hold. It establishes
which tuple was selected and that the selected Profile admits the declarations. It
does not establish that the tuple was uniquely implied, optimal or produced by any
particular selection policy.

The first slice standardizes only evidence of a finalized successful binding. It
does not create a producer-side, pre-Record negative-selection workflow artifact for
clarification or unsupported-design states. Existing conformance failures, Profile
inadmissibility and verifier reports remain governed by their existing owners.

## Candidate invariants

1. The Record uses explicit declarations; pairing, independence, group membership
   and analysis population are not inferred from row order, timestamps, labels or
   numerical values.
2. Exactly one Contract, Profile and bundle tuple is identified through existing
   identity carriers.
3. Missing or contradictory declarations do not become successful through defaults.
4. The Design Declaration Envelope is a projection over one Profile-owned truth
   carrier per declaration, not a duplicate store.
5. The selection-evidence check declares `depends_on` for the selected Profile's
   admissibility result. It verifies binding consistency and does not repeat the
   Profile's judgment or numerical recomputation.
6. A passing check does not establish that declarations are truthful, the selection
   process was correct or optimal, assumptions hold in the world or the research
   project is valid.
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

An optional opaque provenance reference may identify a product-side selection event,
but it carries no portable policy meaning and is not evidence that the decision was
correct. A future public policy language or proof mechanism requires a new Research
Gate, Charter review and public decision.

## Declaration ownership and projection

The Design Declaration Envelope is a deterministic logical projection, not an
independently stored declaration object. Every source declaration has exactly one
truth carrier in its owning Profile or separately accepted successor declaration
schema.

The projection exposes only facts whose meaning is shared across the candidate
family set:

- outcome type;
- experimental-unit structure;
- independent or paired relationship;
- declared group or condition count;
- presence of an explicit pairing identity when pairing is declared;
- presence of repeated or clustered structure;
- analysis-population identity; and
- selection-timing status.

The projection does not absorb family-specific analysis meaning or create duplicate
JSON fields. The selected Profile continues to own variance structure, detailed pair
admissibility, flattened-design restrictions, multiplicity, missingness, numerical
preconditions and other family-specific declarations. R5-aware successor schemas
are needed only where an owning family lacks a required truth carrier.

## Timing declaration and attribution boundary

The first slice proposes a required, non-defaulted timing status with candidate
values `pre_outcome`, `post_outcome` and `unknown`:

- `pre_outcome`: the selection decision was completed before the selecting person
  or system had access to observed outcome values for the declared analysis
  population;
- `post_outcome`: that person or system had access to at least one such value before
  the selection decision was completed; and
- `unknown`: the producer cannot attribute either of the preceding states.

`pre_outcome` does not by itself mean before data collection or before unblinding.
The status does not prove when access or selection occurred. Neither `post_outcome`
nor `unknown` is automatically a structural failure in the first slice.

Every selection-check result carries the exact timing status in its evidence,
including a passed result, so a bare status cannot conceal a post-outcome or unknown
declaration. A Profile may impose a narrower condition only if that meaning is
expressly owned and reviewed.

## Conditional family set

| Family                  | Proposed binding fact                                                                                  | Dependency boundary                                                                                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Independent two-group   | Exactly two declared independent groups, the admitted analysis population and the exact selected tuple | Conditional on a separately accepted successor independent-two-group Contract and bundle; the Release 1 legacy method binding is not treated as that Contract |
| Paired two-condition    | Explicit pair identity, two declared conditions and the exact selected tuple                           | Conditional on the Release 2 decision and issued surfaces                                                                                                     |
| Independent multi-group | At least three explicitly declared independent groups and the exact selected tuple                     | Conditional on the Release 3 decision and selected vertical increment                                                                                         |

The table does not itself decide variance assumptions, omnibus or post-hoc
procedure, multiplicity family, missingness policy or numerical algorithm. Those
remain owned by the selected Contract, Profile and Public Checks.

## Explicit exclusions

- public method-selection policy, policy registry or recommendation algorithm;
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
| Common declaration projection    | New cross-cutting STABLE-INTENT specification under `spec/`                          |
| Finalized selected-tuple binding | New cross-cutting STABLE-INTENT specification under `spec/`                          |
| Family-specific declarations     | Existing or separately accepted Profile specifications                               |
| JSON representation              | Additive closed successor Record schema referencing existing tuple identity carriers |
| Binding verification             | New `consistency_only` Public Check specification and registry entry                 |
| Exact supported combinations     | Additive interpretation-bundle entries                                               |
| Scoped verification failures     | Additive report-schema version and registered reason codes                           |
| Non-claims                       | New additive successor clause; no edit to `NRS-CORE-0009` is proposed                |
| Interoperability                 | Positive, negative, ambiguity and historical-preservation conformance fixtures       |

There is no `selection-policy` identifier family, policy registry, policy ADR,
policy vocabulary term or policy authority-manifest target in this proposal.

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
- successor binding representation and check mechanics;
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
