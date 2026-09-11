# Validation record

Informative Lane 3 evidence-map validation, 2026-09-10. These checks establish repository and index integrity, not statistical correctness or reviewer independence.

Environment: Linux, Node v24.19.0, pnpm 11.19.0. The repository packageManager requests pnpm 11.7.0; the available runtime used the unchanged frozen lockfile.

| Check                                                                                         | Result                                                                                                                                                                                            |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm install --frozen-lockfile --offline`                                                    | PASS; 387 cached packages installed; package.json and lockfile unchanged                                                                                                                          |
| `pnpm format:check`                                                                           | PASS; all matched files use Prettier style                                                                                                                                                        |
| `pnpm lint:markdown`                                                                          | PASS; 400 files, zero issues                                                                                                                                                                      |
| `node --import tsx tooling/src/validate.ts`                                                   | PASS; registries, traceability, normative lint, authority, gates, conformance manifest, links, private-dependency/language audits, schemas, cross-checks, code-path audits and snapshot mechanism |
| `python governance/drafts/release-3-preparation/candidate-evidence-map-20260910/check-map.py` | PASS; 49 classifications, 15 complete candidates, 30 evidence entries, 39 input entries; all referenced blob/SHA-256 identities match; retained exclusions and output-only scope                  |
| `git diff --cached --check`                                                                   | PASS; final staged whitespace check                                                                                                                                                               |

Final local checks include the validation record and machine-readable historical-ledger additions. No original, existing document, ledger, specification, authority registry, Release 2/4 artifact or prior review is edited. Exactly six new files are staged in the authorized output directory. The new check script is read-only and is not wired into repository policy or CI as a gate.

Not run: full `pnpm check`, typecheck, implementation test suites, generated-artifact regeneration, original-PDF reading, or statistical/numerical replays. No authoritative or implementation file changes, so unrelated numerical suites were not required for this informative addition. Prior review computations are attributed reuse.

The main-targeted draft PR records exact output commit, sole parent and tree; the API-created content tree is compared with the locally checked Git index before branch publication. GitHub CI, if subsequently available, is reported separately and is not implied by these local checks. No merge, exclusion release or method adoption occurs.
