# Extensions (Reserved)

**Status: Informative boundary.** No concrete extension mechanism is currently
supported by a registered Record bundle.

The Protocol reserves Extensions as the architectural mechanism for adding typed,
versioned semantics beyond a base surface without silently changing the meaning or
guarantees of covered behavior. The `NRS-EXT` Requirement namespace remains reserved;
this page creates no Extension requirements, schema, registry, or Record field.

## Boundary for a future mechanism

A future Extension design is expected to preserve these architecture properties:

- **Additive meaning, not override.** An Extension can add explicitly typed semantics;
  it does not redefine an existing field, Contract, Profile, Public Check, guarantee
  boundary, or fail-closed rule in place.
- **Explicit identity and version binding.** Semantics that affect interpretation are
  identified and versioned independently, then bound explicitly by the applicable
  specification and Interpretation Bundle. Similar names, nearby versions, registry
  order, implementation behavior, or URI resolution do not create compatibility.
- **Closed-base behavior remains closed.** Until a concrete Extension surface is
  specified and bound, extra Record fields remain governed by the applicable base
  schema. An unknown or unbound payload is not treated as covered Protocol meaning.
- **Scoped verification and conformance.** An Extension does not broaden an existing
  Verification Result or conformance claim. New covered properties need their own
  defined semantics, machine-readable representation where required, version binding,
  and conformance evidence before they can be claimed as supported.
- **Independent implementation remains possible.** Extension meaning belongs to
  Protocol authority, not to a nomue product, reference implementation, external
  package, or private plugin.

This boundary deliberately does not choose an Extension envelope, namespacing scheme,
registry shape, composition rule, or discovery mechanism. Those are capability-design
questions for the first use case that actually needs an Extension.

## External standards and domain systems

An Extension may eventually carry semantics related to an external standard, domain
ontology, workflow system, or research-object format. Referencing such a system does
not transfer Protocol authority to whatever a network endpoint or implementation
currently returns. The exact external version or profile, the Protocol interpretation
of it, and any mapping or loss boundary need to be explicit when they become part of
a supported surface.

If that interpretation materially depends on external standards, methodology, or
community practice, the Research Gate in
[../../governance/RFC.md](../../governance/RFC.md) applies before the choice is
promoted into Protocol meaning.

Informative interoperability mappings live under [../../mappings/](../../mappings/README.md).
