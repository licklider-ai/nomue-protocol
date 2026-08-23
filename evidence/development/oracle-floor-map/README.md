# Floor-Map Corpus (Batch 3 V2)

Maps where the adopted tail-evaluation path starts degrading and where it
zeroes, extending the tail corpus with target p magnitudes 1e-30 through
1e-300. Input for the S1 guarantee-band declaration. **Record only**: this
corpus is not part of the `pnpm check` oracle replay or any conformance
fixture, and nothing here closes a gate. Not R1-08 evidence.

## Construction (mechanical, no statistical judgment)

Datasets are defined in `tooling/src/phase1/oracle-datasets.ts`
(`FLOOR_ORACLE_DATASETS`), built exactly like the tail corpus: a fixed
base group plus a shift obtained by inverting the Student t tail at the
target magnitude with mpmath. One representability constraint applies
(documented in the dataset module): the equal-shift construction preserves
the group spread only while the shift is below ~4.5e14, so targets 1e-150
and deeper use the constant-second-group construction (df = 4 exactly)
already established by `TAIL_UNDERFLOW`.

## Headline result

The kernel tracks the 60-digit oracle with relative error `<= 2.6e-14` at
EVERY point down to p ~ 1e-300 - there is no gradual degradation onset.
The failure at the algorithm floor (~1e-308, `TAIL_UNDERFLOW`) is abrupt:
intermediate underflow inside the incomplete-beta evaluation path zeroes
the result in one step, while the true value is still a representable
binary64 subnormal. See [floor-map.md](floor-map.md) for the full ordered
table and the P_floor rule application (**P_floor = `1e-300`**, adopted by
the steward on 2026-08-13 - see ADR-0025's adoption record).

## Files and regeneration

| File                 | Content                                               |
| -------------------- | ----------------------------------------------------- |
| `python-output.json` | Captured SciPy + mpmath (60 digits) oracle values     |
| `oracle-matrix.json` | Kernel-vs-oracle comparison with relative differences |
| `floor-map.json/.md` | Ordered degradation map + P_floor rule application    |

Capture (needs Python with scipy + mpmath; not part of `pnpm check`):

```bash
pnpm exec tsx tooling/src/evidence/export-oracle-datasets.ts /tmp/datasets.json
python tooling/oracle-capture/capture_oracle.py --datasets /tmp/datasets.json --corpus floor --out evidence/development/oracle-floor-map/python-output.json
```

Offline regeneration: `pnpm evidence:oracle-matrix` then
`pnpm evidence:oracle-floor-map`.
