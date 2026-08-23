# Mappings (Reserved)

**Status: Informative.** This directory is reserved for mappings between nomue
Protocol surfaces and external research-object, provenance, workflow, ontology, or
interoperability systems. No mapping is currently part of a registered Record
interpretation bundle.

Mappings can support differentiation work and practical interoperability, but they
never redefine either side's semantics and do not create a second source of Protocol
authority.

## Mapping discipline

A useful future mapping identifies the exact source and target versions and states
what kind of relationship each mapped element has. It records important omissions,
loss, ambiguity, or one-way conversion rather than presenting a partial mapping as
full equivalence.

In particular:

- a mapping is not an identifier alias;
- a redirect, matching label, or similar field name is not semantic equivalence;
- a successful conversion does not imply that every source guarantee survives in the
  target or that every target guarantee existed in the source;
- an informative mapping does not make an external implementation or network service
  normative authority for nomue semantics;
- interoperability with one version or profile of an external system does not imply
  compatibility with nearby or successor versions.

If a mapping later becomes necessary to interpret a supported Protocol surface, the
binding semantics move into the appropriate authoritative specification, version
identity, and conformance evidence rather than remaining authoritative by virtue of
this directory.

## Relation to Extensions

A future Extension can use an external vocabulary or domain model without treating an
informative mapping as the Extension's semantic definition. Extension semantics are
owned by the Protocol surface that binds them; mappings explain correspondence and
loss between systems.

The reserved Extension boundary is documented in
[../spec/extensions/README.md](../spec/extensions/README.md). External-knowledge
choices that become Protocol semantics pass the Research Gate in
[../governance/RFC.md](../governance/RFC.md).
