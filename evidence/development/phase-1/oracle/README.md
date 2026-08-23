# Preliminary Oracle Evidence (Phase 1)

Differential comparison of the reference statistics kernel against
independent numerical oracles for the Phase 1 Welch datasets. **This is
preliminary development evidence; by itself it does not satisfy or close
gate R1-08 (independent numerical oracle and common-cause failure control).**

## Oracles used

| Oracle | Status | Notes |
| --- | --- | --- |
| SciPy (`scipy.stats.ttest_ind`, `equal_var=False`) | available | independent implementation lineage (Fortran/C/Python) |
| mpmath (regularized incomplete beta, 60-digit precision) | available | p-value via `I_x(df/2, 1/2)`, `x = df/(df + t^2)`; re-captured 2026-08-13 at the unified 60-digit precision (originally 50 digits) |
| R (`t.test`) | **unavailable** | not installed in the development environment; recorded as missing, not simulated |

The Python oracle capture script is checked in
(`tooling/oracle-capture/capture_oracle.py`, see `commands.txt`); it needs
a Python environment with scipy and mpmath (see `environment.json`) and is
not part of the repository's Node toolchain or `pnpm check`.

## Shared-dependency inventory

`@stdlib/stats-base-dists-t-cdf` (Apache-2.0, pinned in `pnpm-lock.yaml`) is
used by the reference kernel for the Student t CDF. It is **not** counted as
an oracle: every consumer in this repository shares it, so agreement with it
has a potential common cause. SciPy and mpmath have disjoint implementation
lineages from it and from each other's p-value path.

## Files

| File | Content |
| --- | --- |
| `oracle-matrix.json` | Normalized comparison (n, means, variances, mean difference, t, df, p) with relative differences and the tolerance verdict |
| `kernel-output.json` | Raw reference-kernel outputs |
| `python-output.json` | Raw SciPy/mpmath outputs |
| `environment.json` | Oracle environment (Python, SciPy, mpmath, NumPy versions) |
| `commands.txt` | Commands used to produce the artifacts |

## Result summary

Maximum relative difference across all datasets and quantities:
about `3.3e-15` (60-digit re-capture, 2026-08-13), well inside the declared
comparison tolerances (p-value relative `1e-10`, others `1e-12`). No
unresolved differences. Per-quantity max/p95 aggregation:
`evidence/development/oracle-deviation-summary/`.

These are captured artifacts, deliberately outside the deterministic
regeneration set (`pnpm evidence:phase1` does not rewrite them). The
matrix, however, is regenerable offline from the captured Python output:
`pnpm evidence:oracle-matrix`.
