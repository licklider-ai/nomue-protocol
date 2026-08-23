# Per-Environment Oracle rel_diff Matrices (Batch 2 addendum U4)

Each `oracle-rel-diff-<platform>-<arch>.json` file records a live kernel
recomputation in one environment, compared against the captured
SciPy/mpmath oracle values, tagged with that environment's identity
(platform, arch, `process.versions` including the V8 build). Produced by:

```bash
pnpm evidence:oracle-rel-diff
```

CI jobs (`.github/workflows/ci.yml`) upload per-environment matrices as
build artifacts. After run 31656773025 (HEAD `c4ca2ac`), all five matrices
were downloaded to `ci-run-c4ca2ac/` and compared — see
`cross-environment-report.json` and
`../oracle-deviation-summary/S1-BRIEF.md` (D6 closed under rule (a)).

To reproduce:

```bash
gh run download <run-id> -D evidence/development/oracle-rel-diff/ci-run-c4ca2ac
pnpm exec tsx tooling/src/evidence/oracle-rel-diff-compare.ts \
  evidence/development/oracle-rel-diff/ci-run-c4ca2ac/oracle-rel-diff-linux-x64/oracle-rel-diff.json \
  ... # four more paths
```

Exit 0 means every kernel value is bit-identical across the inputs; exit 1
lists each differing corpus/dataset/quantity with both values.

The committed `oracle-rel-diff-win32-x64.json` is a local development
snapshot; the authoritative multi-environment record is under
`ci-run-c4ca2ac/`.
