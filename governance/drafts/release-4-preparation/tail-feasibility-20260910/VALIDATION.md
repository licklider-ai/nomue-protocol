# Author-side validation record

Date: 2026-09-10. Environment: environment.json. No independent review performed.

| Check                                                           | Result                                                                                                                                                                                 |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm install --offline --frozen-lockfile`                      | Pass; 387 packages reused. Actual pnpm 11.19.0, package request 11.7.0. No lockfile change.                                                                                            |
| `python probe.py` in this directory                             | Pass; 220 cases, both interval routes and exact projection; 42 rejection calls, 408 numerical negative controls, four midpoint tests. Output in probe-transcript.txt and results.json. |
| `python verify_results.py`                                      | Pass; 220 oracle records recomputed without importing candidate code; seven altered records rejected.                                                                                  |
| `python verify_inputs.py`                                       | Pass; commit/tree/parent identities and 23 input blobs; staged changes confined to this directory.                                                                                     |
| `node node_modules/prettier/bin/prettier.cjs --check .`         | Pass.                                                                                                                                                                                  |
| `node node_modules/markdownlint-cli2/markdownlint-cli2-bin.mjs` | Pass; zero issues.                                                                                                                                                                     |
| `node node_modules/typescript/bin/tsc --noEmit`                 | Pass.                                                                                                                                                                                  |
| `node --import tsx tooling/src/validate.ts`                     | Pass; registries, links, authority, schemas and audits.                                                                                                                                |
| `node --import tsx tooling/src/generate.ts --check`             | Pass; 19 generated files unchanged.                                                                                                                                                    |
| `git diff --cached --check`                                     | Pass.                                                                                                                                                                                  |

The numerical rerun is deterministic apart from environment information stored
separately. Probe budgets and corpus maxima are not selected support bounds.
No aggregate `pnpm check` or unrelated numerical suite is claimed: authoritative,
reference, conformance, schema and registry artifacts are unchanged.

During authoring, Markdown lint caught emphasis-like notation in the report;
the notation was repaired and lint rerun. One preliminary command targeted the
Markdown lint library rather than its executable entry point, and a subsequent
incorrect filename failed; neither was counted as lint validation. The actual
executable above completed. Source-download failures and the partially returned
batch are disclosed in REPORT.md and source-access.json. None of those failures
was treated as numerical evidence.

The local starting checkout also contained untracked Release 3 material outside
this directory. It was not used as numerical input, edited or staged. The commit
tree is built only from the fixed base and this directory; no unrelated file is
included. Repository checks do not substitute for source or numerical review.

SHA256SUMS covers all delivered files except itself. It can be checked with
`sha256sum -c SHA256SUMS` from this directory. Input identities are independently
checkable against the Git objects with verify_inputs.py. No source paper is bundled.
