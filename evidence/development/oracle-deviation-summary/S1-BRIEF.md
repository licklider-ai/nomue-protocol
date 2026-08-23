# S1 Brief: Cross-Implementation Numerical Deviation (1 page)

**Status**: S1 is **fully closed**. The ratified resolutions (D1-D5, D7')
and the rejected options (B, C, E) are recorded in
[ADR-0025](../../../governance/decisions/ADR-0025-s1-close-numerical-deviation.md);
D6 (cross-environment deviation) closed separately under rule (a) in
[ADR-0024](../../../governance/decisions/ADR-0024-s1-close-layer-i-cross-environment-deviation.md).
The guarantee band's lower edge **P_floor = `1e-300`** (derived by the
pre-fixed rule in
[../oracle-floor-map/floor-map.md](../oracle-floor-map/floor-map.md)) was
**adopted by the steward on 2026-08-13** - see ADR-0025's adoption record.

## Scope of comparison - read this first

The numbers summarized here compare the **reference kernel (live
recomputation)** against the **captured SciPy/mpmath oracle values**
(`python-output.json` in each oracle directory, mpmath unified at 60
decimal digits in Batch 2 addendum U8). **The R1-08 independent oracle is
NOT part of this comparison**: gate R1-08 closed on a separate,
disjoint-lineage oracle with its own evidence trail (`pnpm oracle:r1-08`,
`tooling/r1-08-oracle/README.md`, `evidence/development/r1-08-independent-oracle-v1/`).
Nothing decided under S1 reopens or amends that gate's record.

## What the data shows

Full tables: [summary.md](summary.md) / [summary.json](summary.json).
Regenerate: `pnpm evidence:oracle-summary`.

1. **Ordinary corpora (Phase 1, Phase 2A)**: maximum relative difference
   across every quantity and dataset is `8.96e-15` (Phase 2A,
   `p_value_vs_mpmath`, dataset A2V003). Everything else is at or below a
   few ulps.
2. **Tail corpus, representable range**: at p magnitudes `~1e-8`, `~1e-12`,
   and `~1e-19`, the kernel's binary64 tail evaluation still agrees with
   the 60-digit oracle to `<= 3.5e-15` relative. No tail-specific accuracy
   loss is observed while p is representable.
3. **Tail corpus, underflow boundary (`TAIL_UNDERFLOW`)**: the true
   p-value is `~1.10e-308` (a representable binary64 subnormal, recorded
   as a decimal string in the captured output). The kernel's p underflows
   to exactly `0`, and **SciPy's p also underflows to exactly `0`** - the
   two implementations agree with each other while both diverge from the
   true value (relative difference `1.0` vs mpmath). This is an
   **algorithm floor of the adopted tail-evaluation path**, not a binary64
   representational floor: the true value `~1.10e-308` is itself
   representable as a binary64 subnormal (smallest positive subnormal
   `~4.94e-324`; ULP relative width at this point `~4.5e-16`), and the
   zeroing is caused by intermediate underflow inside the
   incomplete-beta evaluation path, not by the result being
   unrepresentable. (Wording corrected in Batch 3 V1; the measured
   degradation map is in `../oracle-floor-map/`.)
4. **Floor map (Batch 3 V2)**: at target magnitudes `1e-30` through
   `1e-300` the kernel tracks the 60-digit oracle to `<= 2.6e-14` at every
   point - there is no gradual degradation onset; the algorithm floor at
   `~1e-308` is abrupt. Applying the pre-fixed P_floor rule yields
   `1e-300` ([floor-map.md](../oracle-floor-map/floor-map.md), adopted
   2026-08-13 - ADR-0025 adoption record).

## S1 resolutions (recorded in ADR-0025)

- **D1**: the comparison formula is maintained unchanged.
- **D2**: the current public-contract tolerances are ratified.
- **D3**: resolved by band declaration (guarantee band + declared floor),
  not by changing the evaluation path.
- **D4**: mpmath oracle capture unified at 60 digits (done, Batch 2 U8).
- **D5**: definitional note on "declared" recorded in ADR-0025.
- **D6**: closed under rule (a) - bit-identical across the covered CI
  matrix (ADR-0024; see the cross-environment section below).
- **D7'**: guarantee band declared via the pre-fixed P_floor rule;
  **P_floor = `1e-300` adopted 2026-08-13** (ADR-0025 adoption record).
- **Rejected**: B (neg_log10 channel), C (log-first kernel), E
  (arbitrary-precision runtime) - reasons in ADR-0025.

## Test-acceptance threshold vs public numerical contract - two different numbers

The measured oracle agreement (about `3.5e-15` relative in the
representable tail, roughly **16 ulp-widths** at binary64's
`epsilon ~ 2.22e-16`) and the public contract's p tolerance (`1e-10`
relative, roughly **450,000 epsilon**) are NOT the same kind of number,
and the contract is not "loose" for being 4-5 orders of magnitude wider.
The measured value is an empirical property of two specific
implementations on specific corpora today; the contract is a promise made
to every future independent implementation, on every admissible input,
across compilers, math libraries, and evaluation orders the reference
implementation has never seen. Narrowing the contract to the measured
agreement would convert an observation into an obligation no independent
implementer could safely sign. The two numbers must be kept separate, and
each is documented where it belongs: measurements here, the contract in
`canonicalization/numerical-comparison.md`.

## Decimal oracle reference layer (option D, formalized)

For the tail and floor corpora the oracle truth is carried as 30-digit
decimal strings (`p_value_mpmath_str`), now formalized as a reference
layer (NRS-CANON-0012/0013 in
`canonicalization/numerical-comparison.md`): the decimal string preserves
the true value's digits even where the binary64 float field cannot -
below the algorithm floor, and even outside binary64's representable
range entirely - so the reference stays citable and comparable
(round-to-nearest conversion + declared tolerance) regardless of what the
runtime representation can hold.

## Cross-environment status (layer i, D6 closed)

**D6 closed under rule (a)** — see
[governance/decisions/ADR-0024-s1-close-layer-i-cross-environment-deviation.md](../../../governance/decisions/ADR-0024-s1-close-layer-i-cross-environment-deviation.md).

Five hosted CI environments at HEAD `c4ca2ac` (GitHub Actions run
`31656773025`, workflow `CI`) were compared:

| Environment               | Node    | V8                  |
| ------------------------- | ------- | ------------------- |
| linux / x64               | 22.23.1 | 12.4.254.21-node.56 |
| linux / x64 (Node 24 job) | 24.18.0 | 13.6.233.17-node.50 |
| linux / arm64             | 22.23.1 | 12.4.254.21-node.56 |
| win32 / x64               | 22.23.2 | 12.4.254.21-node.56 |
| darwin / arm64            | 22.23.1 | 12.4.254.21-node.56 |

`tooling/src/evidence/oracle-rel-diff-compare.ts` over the five downloaded
`oracle-rel-diff-*.json` artifacts returned **exit 0 with zero differing
quantities** — every live kernel value is **bit-identical** across these
environments. The same CI run passed every platform-neutral digest and
semantic-projection pin.

**Conclusion (rule a):** covered environments are **bit-identical**, with
**digest-pin agreement demonstrated on the same run**; no separate
cross-environment numerical tolerance is adopted for layer (i).

Artifacts:
`evidence/development/oracle-rel-diff/ci-run-c4ca2ac/` (raw download) and
`evidence/development/oracle-rel-diff/cross-environment-report.json`
(summary).
