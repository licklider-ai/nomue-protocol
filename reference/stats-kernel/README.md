# Minimal Public Statistics Kernel (Reference, Non-Normative)

Pure functions implementing the Phase 1 Welch two-sample t-test as defined
normatively in
[../../spec/profiles/independent-two-group-continuous/welch-calculation.md](../../spec/profiles/independent-two-group-continuous/welch-calculation.md).
The normative specification defines the mathematical result; this kernel's
particular algorithms and summation order are implementation choices, never
authority.

## Properties

- No file I/O, no network, no environment-dependent defaults, no locale
  dependence.
- Group order is an explicit input; the kernel never reorders groups.
- Explicit error types (`StatsKernelError` with codes `NON_FINITE_INPUT`,
  `INSUFFICIENT_OBSERVATIONS`, `ZERO_STANDARD_ERROR`); a zero standard error
  is an explicit error, never a silent substitute value.

## Numerical notes (informative)

- Means use compensated (Kahan-Neumaier) summation.
- Sample variances use a two-pass algorithm: the mean first, then compensated
  summation of squared deviations, with the n minus one denominator. No
  single-pass reduce is used.
- The two-sided p-value is `2 * CDF(-|t|, df)`, evaluated in the lower tail
  for stability, clamped into `[0, 1]` only as far as numerical stability
  requires; a clamp is reported to callers.

## Student t CDF dependency

The Student t cumulative distribution function comes from
`@stdlib/stats-base-dists-t-cdf` (Apache-2.0), pinned in `pnpm-lock.yaml` and
wrapped behind [src/t-distribution.ts](src/t-distribution.ts).

This dependency is **not an independent oracle**: any check that uses this
kernel shares the dependency's potential defects, so agreement between them is
not independent evidence (common-cause failure). Independent oracle evidence
comes from SciPy and mpmath comparisons recorded under
[../../evidence/development/phase-1/oracle/](../../evidence/development/phase-1/oracle/README.md),
and from the disjoint-lineage FLINT/Arb oracle recorded under
[../../evidence/development/r1-08-independent-oracle-v1/](../../evidence/development/r1-08-independent-oracle-v1/),
against which gate R1-08 is now closed with decision `pass` (see
[../../authority/release-1-gates.yaml](../../authority/release-1-gates.yaml)
and [../../tooling/r1-08-oracle/README.md](../../tooling/r1-08-oracle/README.md)).
See
[../../governance/decisions/ADR-0010-stats-dependency-oracle-separation.md](../../governance/decisions/ADR-0010-stats-dependency-oracle-separation.md).
