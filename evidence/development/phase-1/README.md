# Phase 1 Development Evidence

Evidence that the Phase 1 vertical contract slice is coherent and green.

**This is development evidence, not Release 1 gate evidence.** Nothing here
closes or passes a Release 1 gate, even where it is clearly related (R1-01,
R1-03, R1-04, R1-08). Current gate state is recorded separately in the
Release 1 release-control artifacts.

## Regenerated files (deterministic)

`pnpm evidence:phase1` regenerates the JSON reports in this directory from
the repository state; `pnpm evidence:phase1 --check` fails on drift. They
contain no timestamps, absolute paths, or platform identifiers, so
regeneration on any platform yields identical bytes.

| File                            | Content                                                  |
| ------------------------------- | -------------------------------------------------------- |
| `phase-1-manifest.json`         | Content hashes of the Phase 1 authoritative artifacts    |
| `requirement-traceability.json` | Requirement-to-document/schema/fixture map               |
| `public-surface-report.json`    | Registered surfaces summary                              |
| `schema-validation-report.json` | Schema compilation and fixture counts                    |
| `conformance-report.json`       | Fixture execution summary                                |
| `canonicalization-report.json`  | Vector execution summary                                 |
| `verifier-report.json`          | Example-record verification summary                      |
| `cross-platform-report.json`    | Cross-platform agreement strategy and pinned-hash counts |

## Captured artifacts (not regenerated)

- [oracle/](oracle/README.md) - preliminary differential evidence against
  independent numerical oracles (SciPy, mpmath); R was unavailable in that
  development environment and is recorded as such. This captured evidence does
  not by itself satisfy R1-08.
- `runs/` - raw run logs from local and CI executions.
- `reviews/` - independent review records for Phase 1.
