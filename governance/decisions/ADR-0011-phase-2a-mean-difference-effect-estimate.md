# ADR-0011: Phase 2A Mean Difference as the Supported Effect Estimate

**Status: Accepted** (Phase 2A, 2026-08-10)

## Context

Phase 1 verified a declared test result. A test alone under-represents what
readers need: the size of the effect and its uncertainty. Phase 2A must add
an estimation target without importing the ambiguities of standardized
effect sizes.

## Decision

The Phase 2A ITGC profile treats the estimand as first-class
(`analysis.estimand`) and supports exactly one: the **unstandardized
arithmetic mean difference**, direction `group_order_first_minus_second`
(NRS-PROFILE-ITGC-0015). The declared result carries the estimate, its Welch
standard error, and a 95% Welch-Satterthwaite confidence interval; the
verifier recomputes all of them (NRS-VERIFY-0014/0015/0016).

## Consequences

- The effect estimate shares the variance model of the Welch test; the test
  and interval cannot silently diverge.
- Readers get magnitude and uncertainty in outcome units, which is the
  interpretation-safest form.
- Cross-study comparability via standardization is deliberately not
  provided (ADR-0012).

## Rejected alternatives

- **Standardized effect sizes as the primary estimand**: rejected
  (ADR-0012).
- **Estimation without a declared estimand object**: rejected; making the
  estimand explicit is what lets admissibility reject unsupported ones.
