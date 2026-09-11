# Validation record

Author self-check on 2026-09-11, Linux, Node v24.19.0, Python 3.12.14,
pnpm 11.19.0 in the execution environment. The repository declares pnpm 11.7.0;
no package metadata or dependency lockfile was changed.

| Check                                                            | Result                                                                                                        |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `test_surface.mjs` with explicitly selected absolute Python path | 33 controls passed, including real isolated worker                                                            |
| `node --import tsx tooling/src/validate.ts`                      | Passed registries, authority, links, schemas, conformance manifest, language, dependency and code-path audits |
| Markdown lint                                                    | 0 issues                                                                                                      |
| Prettier check of new JSON, JavaScript and Markdown              | Passed                                                                                                        |
| `git diff --check`                                               | Passed                                                                                                        |

The `.jcs` fixture is intentionally canonical JSON without a trailing newline and
is not processed by the formatter. The executed schema checks compile all three
new schemas; they are experimental and are not registered public conformance.
The original numerical implementation and its runtime dependencies are checked
against the hashes in INPUTS.json during evaluation.

This is targeted validation of an informative experiment. No full supported-bundle
regression claim, independent review, formal gate closure or portable memory bound
is made. The PR's CI status is a separate live check against its fixed head.
