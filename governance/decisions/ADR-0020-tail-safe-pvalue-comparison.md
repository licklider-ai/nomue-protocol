# ADR-0020: Tail-Safe P-Value Comparison and Numerical Underflow

**Status: Accepted** (numerical contract 0.2.1, 2026-08-10)

## Context

The 0.2.0 check tolerated p-values with absolute `1e-12`, which equated a
positive oracle around `1e-13` with a recomputed `0`. The kernel already
evaluates `2 * cdf(-abs(t), df)`; underflow returns binary64 zero.

## Decision

- **Direct lower-tail path** is normative (NRS-VERIFY-0019); `2 * (1 - cdf)`
  is prohibited.
- Successor **p comparator**: absolute `0`, relative `1e-10`, positive p and
  zero never match (NRS-VERIFY-0020). No ULP cap, no log-p field.
- **p = 0** from finite t and positive df is **numerical underflow**
  (NRS-VERIFY-0021, `NRS-P-VALUE-UNDERFLOW`); not exact probability zero.
- `p_value_clamped` is not used to represent underflow.

## Consequences

- New bundle `itgc-guarantee:0.2.1-draft.1` and checks `0.2.1-draft.1`.
- 0.2.0 bundle semantics remain immutable.

## Rejected alternatives

- Retaining p absolute floor `1e-12`, log-p value objects, ULP cap comparator.
