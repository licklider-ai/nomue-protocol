# ADR-0003: JSON Schema as the Primary Structural Representation

**Status: Accepted** (Phase 0, 2026-08-10)

## Context

The future Record format needs one normative structural representation.
Candidates included JSON Schema, Protobuf/IDL-first definitions, and
hand-maintained parallel type definitions per language.

## Decision

- **JSON Schema (Draft 2020-12) is the normative structural representation**
  of v0 Records, once the Record schema is defined (Phase 1 and later).
- **YAML is used for hand-written registries**, validated by JSON Schema
  meta-schemas (this is already in force in Phase 0).
- **Language bindings (TypeScript types, Python models) are generated,
  non-authoritative artifacts.**
- **Protobuf is deferred.** It is not adopted in Phase 0 and is never
  maintained as a parallel source of truth alongside JSON Schema.
- **Phase 0 defines no Record schema.** Only registry meta-schemas exist.

## Consequences

- Structural conformance can be checked with widely available, independent
  validators, which supports offline third-party verification.
- Semantic constraints that JSON Schema cannot express will live in normative
  prose plus the conformance suite, not in ad-hoc code.
- If a binary encoding is ever needed, it arrives via RFC with an explicit
  mapping from the JSON Schema representation, not as a second authority.

## Rejected alternatives

- **Protobuf-first**: rejected for v0; weaker fit for document-style records
  with human-readable review, and dual-authority risk with JSON Schema.
- **Hand-written types per language as the source**: rejected; guarantees
  drift and has no single validator.
