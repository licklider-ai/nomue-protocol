# ADR-0008: Welch-Only ITGC Vertical Slice

**Status: Accepted** (Phase 1, 2026-08-10)

## Context

Phase 1 must prove the contract pipeline end to end on one real statistical
method without pretending to cover statistics broadly.

## Decision

The Phase 1 ITGC profile supports exactly one method: the two-sided Welch
two-sample t-test (NRS-PROFILE-ITGC-0007), with the n minus one sample
variance, unpooled standard error, Welch-Satterthwaite degrees of freedom,
and two-sided Student t p-value (NRS-PROFILE-ITGC-0008..0011). There is no
automatic fallback to a pooled test, no alternative-hypothesis options, no
effect sizes or confidence intervals, and no assumption-driven method
switching.

## Consequences

- The verifier can recompute everything it covers; nothing in the profile is
  aspirational.
- Welch-over-Student as the sole two-group default is also scientifically
  defensible (it does not assume equal variances), which keeps the minimal
  profile honest.
- Real studies needing anything else are out of profile in Phase 1;
  differentiation work (R1-02) must acknowledge this narrowness.

## Rejected alternatives

- **Student's pooled t-test as an option**: rejected; two methods double the
  contract surface without testing anything new about the pipeline.
- **A generic "method plugin" abstraction**: rejected; plugins are an
  execution surface the verifier must never have (NRS-SEC-0002).
