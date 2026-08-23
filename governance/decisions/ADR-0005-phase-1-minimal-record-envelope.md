# ADR-0005: Phase 1 Minimal Record Envelope

**Status: Accepted** (Phase 1, 2026-08-10)

## Context

Phase 1 needs one Record shape that can be carried end to end through schema,
canonicalization, verification, and conformance without pre-committing the
full life-science model.

## Decision

The Phase 1 Record is a closed envelope - schema identifier, record type,
record and revision identifiers, creation time, interpretation bundle,
profile, payload, integrity - with `additionalProperties: false` everywhere
(NRS-CORE-0003, NRS-CORE-0007). Identifiers are URIs used purely as
identifiers (NRS-CORE-0004); URNs are used in examples. Revisions are
immutable (NRS-CORE-0005). No extension, attestation, approval, figure, or
lineage fields are reserved speculatively.

## Consequences

- Adding any field is a visible schema-version event, never a silent widening.
- Layer 2 products get no implicit hooks; finalized-fact representation
  waits for its own phase.
- Some future migrations will need new schema versions that would have been
  avoidable with reserved fields; this cost is accepted for a honest surface.

## Rejected alternatives

- **Open envelope with an extensions bag**: rejected; it turns the closed
  surface into an uncontrolled parallel contract.
- **Reserved placeholder fields**: rejected; placeholders become de facto
  API before their semantics exist.
