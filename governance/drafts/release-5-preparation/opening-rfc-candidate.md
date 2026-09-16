# Release 5: declared-design analysis selection evidence RFC candidate

Status: informative proposal for Research Gate and pre-opening review. Public
discussion is not open. No identifier, Requirement ID, schema, check, bundle or
supported capability is issued by this document.

## Decision requested

Open public discussion of an additive Protocol increment that records and makes
independently checkable the finalized decision connecting explicit research-design
declarations to one exact selected Analysis Contract, Profile and interpretation
bundle.

The first slice considers only three continuous-outcome design families:

1. independent two-group;
2. paired two-condition; and
3. independent multi-group.

The proposal is conditional on the exact released Contracts and bundles available
from their owning releases. It does not adopt, accelerate or reinterpret those
releases.

## Problem

Exact bundle dispatch answers how a verifier interprets a Record after the Record
has named a bundle. It does not answer why a producer selected one scientific
Contract rather than another. Those are distinct decisions.

When several capability families exist, a Record that merely names the selected
Contract can be structurally valid while omitting the declarations and decision
evidence needed to assess whether that selection was consistent with the declared
design. A portable verification artifact should not require a relying party to
trust an agent conversation or an implementation-specific routing log for that
connection.

## Candidate meaning

The proposed increment would require a successor Record surface to bind:

- the exact declared design facts used by the selection decision;
- the exact selected Contract and Profile;
- the exact interpretation bundle used for Record interpretation;
- a versioned selection-policy identity;
- a successful-selection outcome and scoped verification result;
- evidence references sufficient to bind the decision to the Record revision; and
- explicit non-claims for declaration truth and overall scientific validity.

The first slice proposes to standardize only the evidence for a successful
selection. Clarification, unsupported-design and inadmissibility workflow states do
not become Record outcomes merely because a product uses them before a Record
exists. Existing conformance and verification failures remain scoped to their
own owning surfaces. The Research Gate may identify a necessary portable negative
artifact, but adding one would require an explicit scope decision rather than an
implicit extension of this proposal.

## Candidate invariants

1. Selection uses explicit declarations and registered policy only; observed
   outcome values do not silently select a different method family.
2. Pairing, independence, group membership and analysis population are not inferred
   from row order, timestamps, labels or numerical values.
3. A successful selection identifies exactly one Contract, Profile and bundle
   combination.
4. Insufficient or contradictory declarations do not become a successful Record by
   filling defaults.
5. A selection-evidence check is scoped and separate from numerical recomputation.
6. A passing selection-evidence check does not establish that declarations are
   truthful, assumptions hold in the world or the research project is valid.
7. Existing bundle identifiers, Record meanings and pinned conformance results are
   not reinterpreted.
8. An unsupported bundle still fails exact dispatch before bundle-specific Record
   interpretation; selection evidence never creates fallback routing.

## Layer 1 and Layer 2 separation

This proposal concerns the stored result of an analytical selection decision. It
does not standardize an interactive request, clarification dialogue, command API,
agent session, authentication flow, transport or user interface. The Protocol does
not execute a language model and does not accept model reasoning as evidence.

A Layer 2 implementation may ask questions, authenticate a principal and call a
verification service. The resulting Record is conforming only if its stored facts
and evidence satisfy the issued Protocol surfaces. Layer 2 behavior is not made
portable merely by emitting a Record.

## Human declaration boundary

Some design facts may be knowable only through a researcher declaration. The
Protocol may represent a finalized declaration and its attribution evidence, but
it does not authenticate a person, decide who is authorized or prove the declaration
true. Whether the first slice needs a principal-attribution reference is an explicit
Research Gate question; it is not silently required by this draft.

## Conditional family set

| Family                  | Proposed selection fact                                                                          | Dependency boundary                                                       |
| ----------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| Independent two-group   | exactly two declared independent groups and the exact admitted analysis population               | Reuse only an issued independent-two-group Contract and bundle            |
| Paired two-condition    | explicit pair identity and two declared conditions with no inferred pairing                      | Conditional on the Release 2 decision and issued surfaces                 |
| Independent multi-group | at least three explicitly declared independent groups and an exact selected multi-group Contract | Conditional on the Release 3 decision and the selected vertical increment |

The table does not decide variance assumptions, omnibus/post-hoc procedure,
multiplicity family, missingness policy or numerical algorithm. Those remain owned
by the selected Contract, Profile and Public Checks.

## Explicit exclusions

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

| Subject                              | Candidate owner                                                                 |
| ------------------------------------ | ------------------------------------------------------------------------------- |
| Finalized selection-decision meaning | a new Contract or cross-cutting analytical-decision specification under `spec/` |
| Contextual design declarations       | the applicable Profile specifications                                           |
| JSON representation                  | additive closed successor Record schemas                                        |
| Selection-evidence verification      | a new versioned Public Check specification and registry entry                   |
| Exact supported combinations         | additive interpretation-bundle entries                                          |
| Scoped verification failures         | report schema plus registered reason codes                                      |
| Interoperability                     | positive, negative, ambiguity and historical-preservation conformance fixtures  |

Existing exact bundle dispatch remains owned by `NRS-VERSION-0005`,
`NRS-VERSION-0007` and `NRS-VERSION-0008`; this proposal does not amend their
meaning. Existing verification-report separation and exact Record reference remain
owned by `NRS-CORE-0008` and `NRS-VERIFY-0011`.

## Anticipated stability and discussion window

The working proposal is additive STABLE-INTENT material with a minimum 30-day
public-discussion window. This is not a final tier assessment. If the exact impact
inventory changes existing CORE meaning, the CORE process and 60-day minimum apply.
No clock starts until an authorized public issue is actually created.

## Research and implementation holds

The following remain open before public discussion:

- primary-source support for the proposed design-family distinctions and selection
  boundaries;
- independent review of the declaration-versus-inference boundary;
- reconciliation with the exact Release 2 and Release 3 accepted surfaces;
- the status of researcher-attributed declarations in the first slice;
- exact clause, Requirement-ID, schema and public-surface impact;
- selection-policy versioning, successful-selection semantics and failure ordering;
  and
- independent fixed-input opening review.

Numerical algorithms and tolerances remain owned by each selected procedure. Release
5 does not create a universal numerical tolerance or certify an implementation by
composition.

## Opening boundary

Public discussion may open only after the Research Gate supplies a bounded,
independently reviewed basis; the exact impact inventory is complete; all remaining
choices are either resolved or named as legitimate discussion holds; and an
independent reviewer finds the fixed candidate reviewable without hidden semantic
selection.

Opening discussion would authorize comment and reversible candidate preparation
only. It would not adopt the proposal, issue identifiers, register a bundle, merge
implementation, publish a package or release Release 5.

## Independence disclosure

This draft is coordinator synthesis in the existing planning context. It reuses
current public Protocol artifacts but performs no new primary-source review and is
not independent evidence for opening.
