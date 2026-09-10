# Validation record

2026-09-10. Author-executed checks; no independent review claimed.

Environment: Linux, Node v24.19.0, pnpm v11.19.0. Frozen-lockfile
installation succeeded with no dependency-file changes. The package requests
pnpm 11.7.0; this environment supplies pnpm 11.19.0.

| Check                                                      | Result                                                                                                     |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Candidate schema compilation and raw/shape/relation corpus | 70/70 match hand-authored expected outcomes; see STRUCTURAL-RESULTS.json                                   |
| Existing ingress/JCS/exact routing probes                  | 12/12 pass; see COMPATIBILITY-RESULTS.json                                                                 |
| Fixed input and preservation check                         | 25 file pins match; zero changes outside new directory; zero fixture-label collisions at fixed base/source |
| Repository formatting                                      | PASS, exit 0                                                                                               |
| Markdown lint                                              | PASS, 401 Markdown files, zero issues                                                                      |
| Direct repository validator                                | PASS, exit 0; registries, authority, links, schemas and code-path audits clean                             |
| Git whitespace check                                       | PASS, exit 0                                                                                               |

The 70 cases include 12 structurally acceptable examples and 58 negative cases.
Acceptance of zero contrast vectors, nonzero coefficient sums, post-inspection
selection and unknown variance is intentional: scientific admissibility is not
implemented. Schema and relation validation cannot certify those declarations.
Raw invalid strings stay inside fixture strings so repository JSON files remain
well-formed. The runner sends each materialized case through the strict parser.

No full `pnpm check`, numerical calculation, numerical oracle comparison,
statistical regression, new primary-source review or live support admission is
claimed. The 12 compatibility probes exercise existing ingress and routing only.
The preservation script checks existing blobs/modes through the Git delta and
checks source pins; it does not evaluate scientific content.
