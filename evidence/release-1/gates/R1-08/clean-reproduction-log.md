# R1-08 clean committed reproduction

**Target commit:** `6c4de5c1ac693f300efa424d56d3fb89e344558d`  
**Worktree:** detached checkout at target commit (no local untracked artifacts)

## Environment

| Component    | Version  |
| ------------ | -------- |
| Node         | v24.19.0 |
| pnpm         | 11.7.0   |
| Python       | 3.11.9   |
| python-flint | 0.6.0    |
| mpmath       | 1.3.0    |

Python venv created per `12-reproduction-log.md` from `environment/requirements.txt` (exact pins).

## Commands and results

| Command                 | Exit code | Result                 |
| ----------------------- | --------- | ---------------------- |
| `corepack pnpm install` | 0         | OK                     |
| `pnpm oracle:r1-08`     | 0         | failures=0, ready=true |
| `npx vitest run`        | 0         | 137 passed             |

## Hash verification

After `pnpm oracle:r1-08`, `git status` in the detached worktree was clean (no drift in committed evidence artifacts).

## Oracle summary

- Corpus cases: 15 (13 non-degenerate + degenerate + underflow)
- SUT replay failures: 0
- Metamorphic relations: pass
- Offset ladder relation checks: pass
