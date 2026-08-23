# ADR-0007: Finite binary64 Numeric Model for Phase 1

**Status: Accepted** (Phase 1, 2026-08-10)

## Context

Scientific data formats accumulate special numeric states (NaN, infinities,
signed zero, exact decimals, missing values). Each one complicates
canonicalization, comparison, and verification semantics.

## Decision

Phase 1 numbers are finite IEEE 754 binary64 values only (NRS-CANON-0003):
no NaN, no infinities, no signed-zero meaning (NRS-CANON-0004), integers
within the safe-integer range, and no missing-value representation
(NRS-PROFILE-ITGC-0013). Raw NaN/Infinity tokens are JSON parse errors;
overflow-to-infinity inputs fail closed. Exact decimals, arbitrary precision,
typed error values, and undefined-statistic objects are not represented and
have no placeholder fields.

## Consequences

- Every supported value has exactly one JCS serialization; meaning and
  canonical form cannot disagree.
- Datasets that genuinely need missingness or higher precision are simply
  out of profile until a future phase models them deliberately.
- The zero-standard-error case is handled by check semantics
  (NRS-PROFILE-ITGC-0014), not by a special value.

## Rejected alternatives

- **Decimal strings for numbers**: rejected for Phase 1; it moves the
  problem into custom parsing and comparison semantics.
- **Nullable outcome values with a missingness policy**: rejected; an
  implicit policy is a scientific decision the profile must not make
  silently.
