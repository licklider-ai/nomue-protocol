# ADR-0016: Phase 1 and Phase 2A Exact Bundle Dispatch

**Status: Accepted** (Phase 2A, 2026-08-10). **Amended by
[ADR-0017](ADR-0017-bundle-independent-routing.md)** (Phase 2A repair,
2026-08-10): the fourth decision bullet and the rejected alternative
"Refusing bundle-less Records" are superseded - the first-registered-bundle
fallback was removed, bundle-less Records now receive a routing refusal,
and S-001's expectations were corrected accordingly. The remainder of this
record stands.

## Context

With two registered bundles, the verifier must decide which semantics apply
to an incoming Record - the classic place where implementations start
guessing ("0.2.1 is probably like 0.2.0").

## Decision

- Dispatch is by **exact bundle identifier** against the implemented set
  (`itgc-minimal:0.1.0-draft.1`, `itgc-guarantee:0.2.0-draft.1`); anything
  else - including nearby 0.2.x versions - is refused with
  `NRS-UNSUPPORTED-BUNDLE` (NRS-VERSION-0005, fixture A2-B-004).
- The Phase 1 pipeline is preserved verbatim in its own module; the Phase 1
  fixture manifest pins its behavior, replayed by `pnpm regression:phase1`
  (NRS-CORE-0010, NRS-VERSION-0006, fixture A2-B-001).
- Cross-bundle content is rejected by the dispatched bundle's own schema: a
  0.2-shaped Record under the 0.1 bundle fails the 0.1 schema (A2-B-002)
  and vice versa (A2-B-003).
- A Record with no bundle identifier cannot be dispatched; the reference
  verifier evaluates it against the first registered bundle's schema, where
  it fails conformance (a Record must declare its bundle,
  NRS-VERSION-0003). This documented edge preserves the pinned Phase 1
  behavior of fixture S-001 and infers no compatibility.

## Consequences

- Adding a bundle is an explicit implementation event, never a version
  comparison.
- Old bundles accumulate as maintained regression surfaces until formally
  withdrawn through the registry.

## Rejected alternatives

- **Semver-range dispatch**: rejected; it is exactly the guessed
  compatibility NRS-VERSION-0002 prohibits.
- **Refusing bundle-less Records**: rejected for Phase 2A because it would
  change a pinned Phase 1 result without necessity; may be revisited with a
  documented correction.
