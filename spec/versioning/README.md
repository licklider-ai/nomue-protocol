# Versioning

**Status: Informative index and version-identity map.**

| Document                                                 | Content                                                               |
| -------------------------------------------------------- | --------------------------------------------------------------------- |
| [interpretation-bundle.md](interpretation-bundle.md)     | Interpretation bundles: declaration and version pinning (Normative)   |
| [multi-bundle-dispatch.md](multi-bundle-dispatch.md)     | Exact multi-bundle dispatch and prior-bundle preservation (Normative) |
| [public-check-versioning.md](public-check-versioning.md) | Public-check tolerance/comparison versioning (Normative)              |

The binding versioning principles - immutable content-addressed snapshots and
fail-closed handling of unsupported version combinations - live in
[../core/versioning-principles.md](../core/versioning-principles.md). Exact
supported combinations live in the
[interpretation-bundle registry](../../registries/interpretation-bundles.yaml).
This page is an informative map of how the different identities relate; it does
not create a new versioning authority.

## Version identity model

nomue does not treat one global version number as the identity of every part of
the Protocol. Different things change for different reasons, so their identities
remain separable and are bound together only where interpretation requires it.

The main identity classes are:

- **Protocol Snapshot identity** - fixes one immutable, content-addressed
  publication of Protocol authority artifacts. It answers what authority set was
  published, not how every Record is interpreted.
- **Interpretation Bundle identity** - fixes an exact supported composition of
  versioned Protocol components used to interpret a Record. It is the dispatch
  identity and carries no default, proximity, or fallback semantics.
- **Semantic component identity** - identifies a versioned Protocol component
  whose meaning can evolve independently. Current examples include Record Schema,
  canonicalization, Profile, and Public Check identities. Future Contracts,
  Workflows, Extensions, or other explicitly bound procedures can occupy the same
  architectural role without becoming one shared global version axis.
- **Representation identity** - identifies a machine-readable structural surface,
  such as a JSON Schema version. A representation can change independently from a
  check implementation or another semantic component when the authoritative
  versioning rules permit it.
- **Implementation identity** - identifies the software build that emitted or
  verified material. Verifier name/version/source commit and external tool
  versions belong here or in provenance; implementation identity never becomes
  semantic authority merely because one implementation produced a result.
- **Evidence and maturity state** - records how much independent evidence exists
  for a versioned capability. Better evidence can advance capability maturity
  without changing semantic identity when the meaning and verification contract
  themselves are unchanged.

An externally visible implementation change does not become new Protocol meaning by
being labeled implementation-only. If unchanged authoritative semantics reject the
new behavior, the implementation is non-conformant; if the project intends the
behavior as a Protocol change, the affected authoritative component follows its
applicable versioning or supersession process before the implementation can claim
conformance to that new meaning.

These identities can move independently. For example, the registered 0.2.1 ITGC
successor reuses the 0.2 Record schema and Profile while changing the numerical
Public Check set and bundle identity. Conversely, a new verifier build can continue
to implement the same bundle and check versions if its externally visible behavior
remains conformant.

## What creates a successor identity

A meaning-changing revision belongs under a successor semantic identity rather
than silently reusing the old one; the permanent-identifier and supersession rules
are governed by [../../governance/ID-POLICY.md](../../governance/ID-POLICY.md).
The identity that changes is the narrowest component whose meaning actually
changed. A change in one component does not automatically renumber unrelated
components.

Examples of the separation:

- changing a Public Check tolerance or comparison semantic changes the check
  identity/version and requires a successor bundle under NRS-VERSION-0009;
- changing Record structure can require a successor Schema identity without
  implying that every unchanged analytical Contract or check has new semantics;
- adding or changing a future Contract, Profile, Workflow, or bound procedure can
  create a successor identity for that component and for the bundle composition
  that binds it, without rewriting unrelated Core principles;
- fixing an implementation bug without changing the authoritative behavior changes
  implementation identity and evidence, not the Protocol semantic identity;
- adding stronger independent validation evidence can change maturity/evidence state
  without changing the capability's semantics;
- publishing a new Protocol Snapshot can reflect governance, documentation, or
  evidence changes even when no currently registered Record interpretation bundle
  changes.

A successor relationship does not itself prove compatibility. Compatibility and
support are explicit properties of the applicable authoritative artifacts and
registered bundle; they are never inferred from similar names or nearby versions.

## Composition and scaling

The Interpretation Bundle is the place where independently versioned components
become one exact supported interpretation. Exactness does not require one manually
enumerated bundle for every Cartesian-product combination of every future Contract
or Workflow operation. As described in
[../../PROTOCOL-ARCHITECTURE.md](../../PROTOCOL-ARCHITECTURE.md), a successor bundle
representation can bind an exact versioned component set or structured composition
with explicit admission rules while preserving fail-closed interpretation.

The concrete successor representation is deliberately not designed here. What is
fixed at the architecture level is the separation of component identities and the
absence of guessed compatibility: an omitted identity, nearby version, registry
order, or implementation behavior is not a substitute for explicit version binding.

## Relation to Stability and Capability Maturity

Version identity, Stability Tier, and capability maturity are orthogonal:

- **version identity** answers which exact semantic/structural/implementation object
  is being referenced;
- **Stability Tier** answers what change-control discipline applies to specification
  material;
- **capability maturity** is the informative L0-L3 planning axis in
  [../../PROTOCOL-ARCHITECTURE.md](../../PROTOCOL-ARCHITECTURE.md), describing how
  far a named/versioned capability has progressed from architectural fit to
  independently evidenced verification.

None of these alone is a support claim. Current Record support remains determined
by the applicable authoritative semantics, required machine-readable surfaces,
registered Interpretation Bundle, and conformance evidence.
