# Phase 2A Oracle Evidence

Differential comparison of the reference statistics kernel (now including
the Student t quantile, critical value, and 95% confidence interval) against
independent numerical oracles. **Preliminary development evidence; by itself
it does not satisfy or close R1-08.**

## Oracles

| Oracle                                                                           | Status          | Notes                                             |
| -------------------------------------------------------------------------------- | --------------- | ------------------------------------------------- |
| SciPy (`ttest_ind(equal_var=False)`, `t.ppf`, `confidence_interval`)             | available       | independent implementation lineage                |
| mpmath (regularized incomplete beta CDF; quantile via root finding at 60 digits) | available       | independent p-value and critical-value path       |
| R (`t.test(var.equal = FALSE)`)                                                  | **unavailable** | not installed; recorded as missing, not simulated |

`@stdlib/stats-base-dists-t-cdf` and `@stdlib/stats-base-dists-t-quantile`
(both Apache-2.0, pinned in `pnpm-lock.yaml`) are reference-kernel
dependencies and are **not** counted as oracles (shared-lineage rule,
ADR-0010 / ADR-0013).

## Datasets

Seven datasets covering: unequal n with unequal variance, equal n with
unequal variance, negative mean difference, a CI crossing zero, one group
variance zero, minimum n=2, large-magnitude values with a small difference,
and the Phase 2A example data.

## Quantities compared

n, means, sample variances, mean difference, standard error, Welch t,
Welch-Satterthwaite df, two-sided p-value, the 0.975 t critical value, and
both CI endpoints.

## Result

Maximum relative difference across all datasets and quantities: about
`9.0e-15`, inside every declared tolerance. No unresolved differences.
`pnpm oracle:phase2a` replays the kernel against the captured outputs
offline. Files: `oracle-matrix.json` (normalized comparison),
`kernel-output.json`, `python-output.json`, `commands.txt`.
