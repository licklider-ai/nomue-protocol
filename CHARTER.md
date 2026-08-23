# nomue Protocol Charter

This charter is the authoritative statement of the **nomue Protocol** project's
mission, scope, non-goals, and non-claims. It is the top-level normative source
for what the project is, what it covers, and what it does not claim. It is
maintained by the project stewards at Licklider.

## Mission

Define a public, independently verifiable **nomue Protocol** — an open
specification system for expressing, exchanging, and verifying the connection
between research outputs and their evidence — starting in the life sciences.

The Protocol governs how research artifacts and evidence are represented,
interpreted, verified, and carried across versions and implementations. A
**nomue Record** is a machine-readable object produced in conformance with the
Protocol. The Protocol encompasses not only Record structure but also, as each
is defined and published, canonicalization rules, analytical and statistical
contracts, verification semantics, versioning and compatibility policy,
extensions and profiles, and conformance artifacts.

The Protocol binds scientific-analysis declarations, analytical decisions,
inputs, results, artifacts, approvals, verification results, and attestations
into a single verifiable structure. Not every part of that scope is defined or
supported in the current release; see Scope and Release 1 purpose below.

## Protocol, Record, and NRS

### nomue Protocol

The top-level public specification system that defines how research outputs and
evidence are represented, given meaning, verified, and handled across versions
and implementations.

### nomue Record

A machine-readable instance that records a concrete research output, its inputs,
analysis, results, and evidence in conformance with the Protocol.

### nomue Record Specification (NRS)

A part of the nomue Protocol that defines the structure of nomue Records and
Record-level semantics. NRS is not being replaced or renamed; it remains the
sub-specification for Record structure and meaning within the broader Protocol.

## Release 1 purpose

Release 1 is the nomue Protocol's first **Public Draft** — a bounded slice, not a
finished standard. It is a falsification-oriented experiment whose purpose is to
expose the project's most important hypotheses to falsification:

- that scoped, offline, independent verification of Records is practical,
- that scoped verification results are more useful and more honest than any overall
  "verified" claim, and
- that a Protocol with explicit guarantee boundaries can be differentiated from
  existing research-object systems on concrete canonical cases.

Release 1 ships only when every applicable gate in
[authority/release-1-gates.yaml](authority/release-1-gates.yaml) is closed with an
explicit decision.

## Scope

The nomue Protocol project covers the public specification material needed to
make the following independently checkable. What is actually defined and
supported in the current phase is bounded by the published specification,
registries, and conformance artifacts; items not yet defined remain out of
scope until their own phase.

- **nomue Record semantics and representation** (NRS; Layer 1).
- **Canonicalization and integrity semantics** for Records.
- **Analytical and statistical contracts and profiles** (added deliberately, one
  at a time).
- **Verification semantics** — scoped checks, verification reports, and verifier
  refusal behavior.
- **Versioning and compatibility** — interpretation bundles, public-check
  versions, and multi-bundle dispatch.
- **Extensions and profiles** as each is explicitly defined.
- Declarations, analytical decisions, provenance references, results, artifact
  bindings, revision lineage, verification results, finalized human-approval
  facts, attestations, and the stored form of policy-evaluation results — as
  each is brought under specification in its phase.
- **Registries, schemas, conformance artifacts**, and reference verification
  procedures needed to make the above independently checkable.

An initial statistical profile for independent two-group continuous outcomes is
in scope and has a Welch-only supported slice. Approval, attestation, and
artifact-binding semantics are specified only to the extent already published
under their current phase; their presence in the specification does not imply
support in a registered interpretation bundle.

## Non-goals

- Defining agent session state, interactive clarification or command protocols, MCP
  transport, user-interface behavior, or SaaS workflow orchestration (these belong to
  Layer 2).
- Serving as a general workflow or notebook format.
- Covering every statistical method. Profiles are added deliberately, one at a time.
- Replacing peer review, regulatory review, or institutional oversight.

## Non-claims

nomue Record does not guarantee:

- the correctness of a research project as a whole,
- the truth of scientific conclusions,
- that input data or researcher declarations are truthful,
- causal relationships,
- acceptance of a paper,
- complete compliance with laws or regulations,
- the validity of arbitrary statistical methods, or
- scientific validity outside a supported profile.

Scientific validity outside an explicitly supported, scoped procedure is represented
as _not asserted_ — never as "unknown" or "passed".

## Initial statistical profile

The first defined statistical profile is the **Independent Two-Group Continuous
Profile** (requirement namespace `NRS-PROFILE-ITGC`). Its supported analytical slice is
the two-sided Welch two-sample t procedure, defined under
[spec/profiles/independent-two-group-continuous/](spec/profiles/independent-two-group-continuous/README.md).
Exact currently supported version combinations are determined only by the
[interpretation-bundle registry](registries/interpretation-bundles.yaml); no nearby
version or unregistered analytical method is inferred to be supported.

## Principles

### Local independent verification

Anyone must be able to verify a Record's covered properties locally, offline, without
contacting the specification authors, a vendor service, or any network endpoint. A
conforming verifier is offline by default and never implicitly dereferences external
URIs.

### Open specification

The nomue Protocol's normative specifications, registries, conformance artifacts,
and reference verifier are developed in public, in English, under the adopted legal
terms in [LICENSE.md](LICENSE.md). The reference implementation is not the
specification: normative meaning lives only in the specification and its registries.

### Minimum standardization and proprietary implementation boundary

The Protocol standardizes the minimum semantics necessary for interoperability and
independent verification. A commercially differentiated implementation technique is
not made a Protocol requirement merely because it improves performance, automation,
scale, management, deployment, or user experience.

A proposed Normative Requirement MUST NOT be accepted merely to standardize an
implementation technique that can remain outside the Protocol without impairing
interoperability or independent verification. Technology Licklider intends to retain
as proprietary product or licensing value MUST NOT enter a normative mandatory,
recommended, or optional surface unless the steward explicitly decides that making
that technology part of the royalty-free Protocol surface is strategically preferable
to retaining it as proprietary implementation technology.

Once such technology is published as a Normative Requirement in a Covered
Specification, the project does not rely on a post-publication licensing escape hatch
to restore proprietary exclusivity. The decision must therefore be made before the
normative change is accepted and published.

### Stewardship

Changes to the public contract follow the RFC process in
[governance/RFC.md](governance/RFC.md), with discussion windows determined by the
stability tier of the affected material and explicit approval by named stewards for
CORE changes. Identifiers, once published, are permanent
([governance/ID-POLICY.md](governance/ID-POLICY.md)).

### Public Draft posture

Until a future Stable release, every published snapshot is a draft: immutable,
content-addressed, and clearly labeled. Compatibility between drafts is not promised.
A detected conflict between authoritative artifacts fails validation and blocks
release; it is never resolved by silently preferring one artifact.

## Layer boundary

**Layer 1** is the nomue Protocol: this repository and its authoritative
specification material. It stands alone and has no normative or operational
dependency on private product repositories. **Layer 2** comprises nomue
applications and private product implementations that produce or consume Records
in conformance with the Protocol; the Protocol does not prescribe Layer 2
implementation rules.

Layer 1 may define the stored representation of facts that were finalized
elsewhere (for example, a completed approval), but never the interactive protocol
that produced them. See [spec/core/layer-boundary.md](spec/core/layer-boundary.md).
