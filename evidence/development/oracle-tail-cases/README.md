# Tail-Case Oracle Corpus (Batch 2 addendum U8)

Extreme small-p Welch datasets probing the reference kernel's binary64
tail evaluation against mpmath at 60 decimal digits. Input for discussion
item S1. **Not gate R1-08 evidence** (that gate closed on a separate,
disjoint-lineage oracle - see `pnpm oracle:r1-08`).

## Datasets

Defined in `tooling/src/phase1/oracle-datasets.ts` (single source; the
capture reads an export of that module, never a copy). Construction is
mechanical: a fixed base group plus a shift chosen by inverting the
Student t tail at the target p magnitude given in the Batch 2 addendum
instruction - no statistical judgment was made here.

| Dataset        | Construction                       | df  | Achieved p (mpmath, 60 digits) |
| -------------- | ---------------------------------- | --- | ------------------------------ |
| TAIL_P_1E8     | base + 1.2 shift, equal variances  | 8   | ~9.68e-9                       |
| TAIL_P_1E12    | base + 3.8 shift                   | 8   | ~1.00e-12                      |
| TAIL_P_1E19    | base + 28.5 shift                  | 8   | ~1.01e-19                      |
| TAIL_UNDERFLOW | constant second group (variance 0) | 4   | ~1.10e-308                     |

`TAIL_UNDERFLOW` reuses the legitimate zero-sample-variance construction
of the Phase 2A `A2V004_one_variance_zero` dataset; every observation is a
finite binary64 value.

## Headline result

At p magnitudes down to `~1e-19` the kernel agrees with the 60-digit
oracle to `<= 3.5e-15` relative. At the underflow boundary the kernel's p
is exactly `0` - and so is SciPy's - while the true value `~1.10e-308` is
itself a representable binary64 subnormal; the p-value-vs-mpmath relative
difference of `1.0` in the matrix is that observation, recorded honestly,
not a regression. This zeroing is an **algorithm floor of the adopted
tail-evaluation path** (intermediate underflow inside the incomplete-beta
evaluation), not a binary64 representational floor: the smallest positive
binary64 subnormal is `~4.94e-324` and the ULP relative width at
`~1.1e-308` is `~4.5e-16`, so the true value is representable - the
evaluation path zeroes before representation runs out (wording corrected
in Batch 3 V1). The measured degradation-onset map for this floor is in
`../oracle-floor-map/`. The 30-digit decimal string `p_value_mpmath_str`
in `python-output.json` is the authoritative record of the oracle value.

## Files and regeneration

| File                 | Content                                               |
| -------------------- | ----------------------------------------------------- |
| `python-output.json` | Captured SciPy + mpmath (60 digits) oracle values     |
| `oracle-matrix.json` | Kernel-vs-oracle comparison with relative differences |

Capture (needs Python with scipy + mpmath; not part of `pnpm check`):

```bash
pnpm exec tsx tooling/src/evidence/export-oracle-datasets.ts /tmp/datasets.json
python tooling/oracle-capture/capture_oracle.py --datasets /tmp/datasets.json --corpus tail --out evidence/development/oracle-tail-cases/python-output.json
```

Matrix regeneration (offline, no Python): `pnpm evidence:oracle-matrix`.

This corpus is deliberately NOT part of the `pnpm check` oracle replay
(`tooling/src/phase2a/oracle-check.ts`) or any conformance fixture: the
underflow row exceeds every binary64 comparison tolerance by construction,
which is the observation this corpus exists to record - not a bound to
gate a build on.
