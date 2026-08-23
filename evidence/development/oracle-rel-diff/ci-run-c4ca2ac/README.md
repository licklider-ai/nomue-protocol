# CI Run c4ca2ac — Oracle rel_diff Artifacts

Captured from GitHub Actions run `31656773025` (HEAD `c4ca2ac`, workflow
`CI`, result **success**).

## Contents

| Artifact directory                  | Job                                      |
| ----------------------------------- | ---------------------------------------- |
| `oracle-rel-diff-linux-x64/`        | Full check (Linux x64, Node 22)          |
| `oracle-rel-diff-linux-x64-node24/` | Full check (Linux x64, Node 24)          |
| `oracle-rel-diff-linux-arm64/`      | Phase 1 + 2A validation (Linux arm64)    |
| `oracle-rel-diff-windows-x64/`      | Phase 1 + 2A validation (Windows x64)    |
| `oracle-rel-diff-macos-arm64/`      | Phase 1 + 2A validation (macOS arm64)    |
| `env-report-*/`                     | Matching `env-report.json` from each job |

## Reproduce the D6 comparison

```bash
gh run download 31656773025 -D evidence/development/oracle-rel-diff/ci-run-c4ca2ac
pnpm exec tsx tooling/src/evidence/oracle-rel-diff-compare.ts \
  evidence/development/oracle-rel-diff/ci-run-c4ca2ac/oracle-rel-diff-linux-x64/oracle-rel-diff.json \
  evidence/development/oracle-rel-diff/ci-run-c4ca2ac/oracle-rel-diff-linux-x64-node24/oracle-rel-diff.json \
  evidence/development/oracle-rel-diff/ci-run-c4ca2ac/oracle-rel-diff-linux-arm64/oracle-rel-diff.json \
  evidence/development/oracle-rel-diff/ci-run-c4ca2ac/oracle-rel-diff-windows-x64/oracle-rel-diff.json \
  evidence/development/oracle-rel-diff/ci-run-c4ca2ac/oracle-rel-diff-macos-arm64/oracle-rel-diff.json
```

Exit 0 on run 31656773025: every kernel value bit-identical across all five
environments. Summary: `../cross-environment-report.json`.
