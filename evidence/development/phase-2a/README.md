# Phase 2A Development Evidence

Evidence that the Phase 2A ITGC guarantee slice is coherent and green.

**This is development evidence, not Release 1 gate evidence.** It does not
close or pass any Release 1 gate; current gate state is recorded separately in
the Release 1 release-control artifacts.

## Regenerated files (deterministic)

`pnpm evidence:phase2a` regenerates the JSON reports here;
`pnpm evidence:phase2a --check` fails on drift. They contain no timestamps,
absolute paths, or platform identifiers.

| File                                      | Content                                                  |
| ----------------------------------------- | -------------------------------------------------------- |
| `phase-2a-manifest.json`                  | Content hashes of the Phase 2A authoritative artifacts   |
| `requirement-traceability.json`           | The Phase 2A-introduced requirements with their bindings |
| `bundle-compatibility-report.json`        | Exact dispatch, strict JCS input, Phase 1 preservation   |
| `admissibility-report.json`               | Admissibility fixture summary and non-claims             |
| `confidence-interval-report.json`         | CI fixtures and oracle agreement                         |
| `refusal-schema-report.json`              | Refusal fixtures and schema validity                     |
| `resource-limit-report.json`              | Limits and their per-class fixtures                      |
| `conformance-report.json`                 | Fixture execution summary and expectation provenance     |
| `canonicalization-regression-report.json` | Canonicalization unchanged; Phase 1 digests preserved    |
| `cross-platform-report.json`              | Cross-platform agreement strategy                        |

## Captured artifacts (not regenerated)

- [oracle/](oracle/README.md) - differential evidence against SciPy and
  mpmath, including t critical values and CI endpoints; R was unavailable in
  that captured environment. This evidence does not by itself satisfy R1-08.
- `runs/` - raw run logs.
- `reviews/` - independent review records for Phase 2A.
