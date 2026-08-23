# ADR-0021: Field-Specific Tolerance Versioning and Numerical Test Families

**Status: Accepted** (numerical contract 0.2.1, 2026-08-10)

## Context

Tolerance widening survived oracle replay on Phase 2A datasets; algorithm
regression, tolerance contract, and domain evidence must not be conflated.

## Decision

- **Field-specific tolerances** only; no global η (NRS-CANON-0006).
- **Numerical comparison changes require new check + bundle versions**
  (NRS-VERSION-0009).
- Three test families: algorithm regression (gate), tolerance contract lock
  (gate), domain boundary evidence (informative only).
- **maxObservations = 10_000** is a resource limit, not an accuracy guarantee
  (NRS-CORE-0012).
- **R1-08 remains open**; mpmath and SciPy are preliminary oracles only.

## Consequences

- Successor public-check set `0.2.1-draft.1` ships alongside unchanged
  `0.2.0-draft.1` checks.
- `@stdlib` betainc lineage is not counted as an independent oracle (ADR-0010).

## Update (2026-08-13)

Gate R1-08 has since closed with decision `pass`, on a disjoint-lineage
FLINT/Arb oracle distinct from the mpmath/SciPy comparison this ADR
describes (see `tooling/r1-08-oracle/README.md` and
`authority/release-1-gates.yaml`). This does not change the decision above;
it is recorded here so the "R1-08 remains open" statement is not read as
current. Per this repository's convention, the original decision text is
left unchanged and this dated note is appended instead of rewriting it.
