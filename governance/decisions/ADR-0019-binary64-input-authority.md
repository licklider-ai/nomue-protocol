# ADR-0019: Binary64 Input Authority and Source-Decimal Non-Claim

**Status: Accepted** (numerical contract 0.2.1, 2026-08-10)

## Context

Numerical Contract Round 3 reconciled steward decisions against repository
behavior. Records arrive as JSON text, but every Welch quantity is computed
from parsed IEEE 754 binary64 values.

## Decision

- **Parsed binary64 is the numeric authority** (NRS-CANON-0009): recomputation
  uses `JSON.parse` semantics on finite binary64 values.
- **Source-decimal fidelity is not asserted** (NRS-CANON-0010): differing
  decimal tokens that parse to the same binary64 are equivalent for
  verification (TS5 alternate tokens).
- **No fixed μ/σ, σ, or |x| thresholds** as normative rejection without a
  versioned public check (NRS-CANON-0011).
- **Current Kahan–Neumaier + two-pass variance** remains the reference
  implementation strategy; Welford or automatic centering/scaling are not
  adopted.

## Consequences

- Oracle and fixture expectations must use parsed binary64 values, never
  decimal-intent literals alone.
- Domain-boundary evidence remains informative, not a universal proof.

## Rejected alternatives

- Decimal-string authority, fixed magnitude thresholds, automatic
  centering/scaling, Welford replacement.
