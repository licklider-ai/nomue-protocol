# ADR-0013: Welch Mean-Difference 95% Confidence Interval

**Status: Accepted** (Phase 2A, 2026-08-10)

## Context

The confidence interval must be exactly consistent with the Welch test the
profile already verifies, and its level must not become a Record-author
degree of freedom.

## Decision

- The interval is `mean_difference ± t_quantile(0.975, df) *
standard_error` with the same unpooled standard error and
  Welch-Satterthwaite df as the test (NRS-PROFILE-ITGC-0017/0018), method id
  `urn:nomue:method:welch-satterthwaite-mean-difference-ci:1`.
- The level is **fixed at two-sided 0.95 by the check version**
  (NRS-PROFILE-ITGC-0016); Records declare it but cannot choose it.
- The Student t quantile comes from `@stdlib/stats-base-dists-t-quantile`
  0.2.3 (Apache-2.0, pinned), wrapped in
  `reference/stats-kernel/src/t-distribution.ts`. Like the CDF dependency it
  is **not an independent oracle** (shared lineage with the kernel);
  independent evidence comes from SciPy `t.ppf` and an mpmath root-finding
  quantile (evidence/development/phase-2a/oracle/).
- Critical-value failure fails closed; **no silent fallback to a normal
  approximation** exists, and clamps are recorded in evidence.
- No significance boolean is derived from the interval's relation to zero.

## Consequences

- p-value/CI consistency is checkable by recomputation because both derive
  from one SE and one df.
- A future level (0.90, 0.99) is a new check version, not a Record field.

## Rejected alternatives

- **Record-selectable confidence level**: rejected; it turns the guarantee
  surface into a presentation choice and breaks comparability.
- **Normal-approximation interval for large df**: rejected; a silent model
  switch is exactly what the profile prohibits elsewhere.
- **Hand-written quantile implementation**: rejected; same reasoning as
  ADR-0010.
