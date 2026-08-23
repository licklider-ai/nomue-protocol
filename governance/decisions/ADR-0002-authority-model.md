# ADR-0002: Target-Specific Authority Model

**Status: Accepted** (Phase 0, 2026-08-10)

## Context

Specification projects commonly drift into having several artifacts that each
half-define the same thing (prose, schema, registry, implementation, generated
docs). When they disagree, readers silently pick one, and the disagreement
ships.

## Decision

Authority is assigned **per target**, in [../../AUTHORITY.md](../../AUTHORITY.md)
and machine-readably in
[../../authority/authority-manifest.yaml](../../authority/authority-manifest.yaml):
each target (mission, normative meaning, IDs, vocabulary, structure,
conformance, release decision, ...) has exactly one named authority.

- There is **no single implicit precedence order** across artifacts.
- A detected conflict between authoritative artifacts **fails validation and
  blocks release** (NRS-GOV-0003); it is fixed at the source, never resolved by
  silent preference.
- **Generated views are never authoritative** (NRS-GOV-0002); they carry
  generation headers and CI fails on drift.

## Consequences

- Validation tooling must actually detect cross-artifact conflicts, and does
  (registry/anchor traceability, manifest checks, clean-generation check).
- Contributors must update authority and derived artifacts in one change set.
- Evidence produced before a conflict fix is invalidated and regenerated.

## Rejected alternatives

- **"The spec prose always wins"**: rejected; it hides registry and schema rot
  behind an unenforceable rule.
- **"The implementation is the spec"**: rejected; it inverts authority and
  makes independent implementation impossible (see NRS-GOV-0006).
- **Single master document containing everything**: rejected; it cannot be
  machine-validated at the granularity this project needs.
