# Release 5: declared-design analysis selection evidence RFC candidate

Status: informative proposal for Research Gate and pre-opening review. Public
discussion is not open. No identifier, Requirement ID, schema, check, bundle or
supported capability is issued by this document.

## Decision requested

Open public discussion of an additive Protocol increment in which a common Design
Declaration Envelope is evaluated by an exact registered Selection Policy to select
exactly one Analysis Contract, Profile and interpretation bundle, and the finalized
decision is recorded for independent verification.

The first slice considers only three continuous-outcome design families:

1. independent two-group;
2. paired two-condition; and
3. independent multi-group.

Every family remains conditional on a separately accepted Contract and bundle. The
proposal does not adopt, accelerate or reinterpret an owning release.

## Problem

Exact bundle dispatch answers how a verifier interprets a Record after that Record
has named a bundle. Profile admissibility answers whether the selected Profile
admits its owned design declarations. Neither answers which exact
Contract/Profile/bundle tuple a declared design maps to before execution.

When several capability families or multiple Contracts within a family exist, a
Record that merely names its selected tuple can be structurally valid while omitting
the declarations and policy identity needed to check the mapping. A portable
verification artifact should not require a relying party to trust an agent
conversation, a product router or an implementation-specific decision log.

## Candidate meaning

The proposed increment would require a successor Record surface to bind:

- a complete, non-contradictory Design Declaration Envelope bound to the Record
  revision;
- the exact registered Selection Policy and its closed candidate set;
- exactly one policy result identifying a Contract, Profile and interpretation
  bundle;
- references to the existing Record identity carriers for that selected tuple,
  without duplicating competing identity fields;
- confirmation that the selected Profile admits the declarations it owns;
- a required, non-defaulted declaration of selection timing;
- evidence references sufficient to bind the selection result to the Record
  revision; and
- explicit non-claims for declaration truth, policy wisdom, assumption truth and
  overall scientific validity.

A successful selection exists only when all of those conditions hold. A policy
evaluation yielding zero or more than one result is not successful. The Protocol
defines no implicit priority or tie-break. When a choice among otherwise eligible
analyses is scientifically intended, the relevant method or estimand preference
must be explicit, declared and owned by the registered policy.

The first slice standardizes only evidence of a successful selection. It does not
create a producer-side, pre-Record negative-selection workflow artifact for
clarification or unsupported-design states. Existing conformance failures, Profile
inadmissibility and verifier reports remain governed by their existing owners.
Adding another portable artifact later requires an explicit scope decision.

## Candidate invariants

1. Selection uses explicit declarations and registered policy only; observed
   outcome values do not silently select a different method family.
2. Pairing, independence, group membership and analysis population are not inferred
   from row order, timestamps, labels or numerical values.
3. A successful selection identifies exactly one Contract, Profile and bundle
   combination.
4. Zero matches, multiple matches, missing declarations or contradictory
   declarations do not become successful through defaults or hidden precedence.
5. Existing tuple identities are referenced rather than restated in new competing
   fields.
6. A selection-evidence check is scoped and separate from Profile admissibility and
   numerical recomputation.
7. A passing selection-evidence check does not establish that declarations are
   truthful, that the policy is scientifically optimal, that assumptions hold in
   the world or that the research project is valid.
8. Existing bundle identifiers, Record meanings and pinned conformance results are
   not reinterpreted.
9. An unsupported bundle still fails exact dispatch before bundle-specific Record
   interpretation; selection evidence never creates fallback routing.

## Protocol policy, not product routing

The Selection Policy is a versioned Layer 1 authority target: a portable mapping
from declared inputs and a closed candidate set to zero, one or multiple exact
tuples. Its stored identity and result are independently checkable. The policy does
not prescribe how a product gathers declarations, sequences questions or presents
choices.

A Layer 2 implementation may ask questions, authenticate a principal and call a
verification service. The Protocol does not standardize that dialogue, command API,
agent session, authentication flow, transport or user interface. It does not execute
a language model and does not accept model reasoning as evidence.

## Declaration ownership

The Design Declaration Envelope owns only facts whose meaning is shared across the
candidate family set:

- outcome type;
- experimental-unit structure;
- independent or paired relationship;
- declared group or condition count;
- presence of an explicit pairing identity when pairing is declared;
- presence of repeated or clustered structure;
- analysis-population identity;
- selection-timing status; and
- an optional reference to an explicit method or estimand preference.

The envelope does not absorb family-specific analysis meaning. The selected Profile
continues to own such matters as variance structure, detailed pair admissibility,
flattened-design restrictions, multiplicity, missingness, numerical preconditions
and other family-specific declarations. A cross-family fact is referenced from the
Profile when needed; it is not redefined with a second meaning.

## Timing declaration and attribution boundary

The first slice proposes a required, non-defaulted timing status with candidate
values `pre_outcome`, `post_outcome` and `unknown`. These values disclose the
producer's attributed timing claim; they do not prove when the decision occurred.
Neither `post_outcome` nor `unknown` is automatically a structural failure in the
first slice. A registered policy or Profile may impose a narrower condition only if
that meaning is expressly owned and reviewed.

Revision lineage or an external timestamp attestation may provide stronger evidence
in a later increment. The Protocol may represent attribution references but does not
authenticate a person, decide who is authorized or prove any declaration true.

## Conditional family set

| Family                  | Proposed selection fact                                                                          | Dependency boundary                                                                                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Independent two-group   | Exactly two declared independent groups and the exact admitted analysis population               | Conditional on a separately accepted successor independent-two-group Contract and bundle; the Release 1 legacy method binding is not treated as that Contract |
| Paired two-condition    | Explicit pair identity and two declared conditions with no inferred pairing                      | Conditional on the Release 2 decision and issued surfaces                                                                                                     |
| Independent multi-group | At least three explicitly declared independent groups and an exact selected multi-group Contract | Conditional on the Release 3 decision and selected vertical increment                                                                                         |

The table does not itself decide variance assumptions, omnibus or post-hoc
procedure, multiplicity family, missingness policy or numerical algorithm. Those
remain owned by the selected Contract, Profile and Public Checks.

## Explicit exclusions

- product, agent or user-interface routing policy;
- implicit Contract priority, fallback or tie-breaking;
- selection inferred from observed outcome values or software defaults;
- producer-side clarification and unsupported-design workflow artifacts;
- automatic switching between parametric and rank-based procedures;
- rank, permutation and resampling family support;
- factorial, repeated, clustered, longitudinal or mixed designs;
- regression, categorical, survival, count or nonlinear families;
- inferred declarations or complete-case defaults;
- producer-selected tolerances, confidence levels or algorithms;
- an overall `VERIFIED` status or whole-project validity claim;
- approval-gate workflow, policy enforcement or organization authorization; and
- product telemetry, data-retention policy or incident operations.

## Candidate authority placement

The exact path and Requirement-ID inventory remains open. The anticipated additive
owners are:

| Subject                             | Candidate owner                                                                      |
| ----------------------------------- | ------------------------------------------------------------------------------------ |
| Common declaration-envelope meaning | New cross-cutting STABLE-INTENT specification under `spec/`                          |
| Selection Policy meaning            | New Layer 1 STABLE-INTENT specification under `spec/`                                |
| Exact registered policies           | New registry authority target                                                        |
| Family-specific declarations        | Existing or separately accepted Profile specifications                               |
| JSON representation                 | Additive closed successor Record schema referencing existing tuple identity carriers |
| Selection verification              | New `consistency_only` Public Check specification and registry entry                 |
| Exact supported combinations        | Additive interpretation-bundle entries                                               |
| Scoped verification failures        | Additive report-schema version and registered reason codes                           |
| Non-claims                          | New additive successor clause; no edit to `NRS-CORE-0009` is proposed                |
| Interoperability                    | Positive, negative, ambiguity and historical-preservation conformance fixtures       |

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
- selection-policy representation and registry mechanics;
- independent fixed-input close-only opening review; and
- steward authorization for the exact candidate.

Numerical algorithms and tolerances remain owned by each selected procedure. Release
5 does not create a universal numerical tolerance or certify an implementation by
composition.

## Opening boundary

Public discussion may open after the repaired question is frozen, the authority and
surface inventory is reviewable, predecessor dependencies remain explicit, and an
independent reviewer finds no hidden semantic selection. The full-text research hold
may remain named during discussion, but it must close before design freeze and any
adoption decision.

Opening discussion would authorize comment and reversible candidate preparation
only. It would not adopt the proposal, issue identifiers, register a policy or
bundle, merge implementation, publish a package or release Release 5.

## Independence disclosure

This draft is coordinator synthesis in the existing planning context. It incorporates
an independent opening review and Research Gate result, but the repairs themselves
are not independent clearance.
