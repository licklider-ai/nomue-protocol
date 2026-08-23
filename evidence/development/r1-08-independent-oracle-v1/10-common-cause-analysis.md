# Common-cause failure analysis

## SUT component lineage (shared ancestry risk)

- t-CDF and t-quantile both route through @stdlib math-base-special-betainc / kernel-betaincinv — ports of Boost `beta.hpp` and `ibeta_inverse.hpp`.
- SciPy stdtr may share Boost-related paths (see dependency-provenance.yaml); not used as oracle here.
- Summary mean/variance: pure JS compensated summation — independent of betainc lineage.

## Independent oracle (disjoint lineage)

- **Exact rational oracle** (`tooling/r1-08-oracle/src/exact-algebraic.ts`): reconstructs binary64 inputs as exact rationals; computes Welch df, SE², mean difference without sqrt.
- **acb enclosure oracle** (`tooling/r1-08-oracle/python/arb_oracle.py`): python-flint FLINT acb incomplete beta; no @stdlib/Boost code dependency.
- **mpmath** column in `07-arb-pvalue-results.json` is witness-only (100 dps); not validated authority.
- **Quantile route Q2:** adaptive bracket + acb bisection; Genspark fixed bracket not used. R qt route Q1 not available.

## Independence argument

- Arb/acb uses FLINT's native beta functions on arbitrary-precision balls — different implementation family from JS Boost port.
- Tail branch selection in acb t-CDF mirrors stdlib for numerical stability but executes in independent acb arithmetic; disagreement on quantile (~1e-11) demonstrates routes are not bitwise-coupled.
- Third lineage (R Hill-396 qt) not established: `R1-08_third_oracle_lineage` hold remains open.

## Offset ladder (common-offset cancellation)

- Naive one-pass variance fails at 1e9+ offsets; SUT compensated two-pass matches exact rational oracle (variance = 1).
- Welch t, df, p invariant under common offset when binary64 inputs preserve spread.
