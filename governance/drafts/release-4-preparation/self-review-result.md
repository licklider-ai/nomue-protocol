# Release 4 Author-Side Adversarial Review and Repair

Date: 2026-09-06. Status: informative self-review and repair record.
Reviewer/repair role: preparation-package author and research coordinator.
This is not an independent review of the preparation or either research result.
No Research Gate, public-opening hold, methodology, or release is approved here.

## Scope and exact inputs

The review compared preparation, repaired execution instructions, preserved
preparation reviews, and both initial research results. The original fixed
preparation commit is `58675e66dbf263c94688d47867c731ad4efddbf6`, tree
`a1c81b6480d5518271c1a4787cf9ab0879f6c2af`.

| Input                                  | Inspected identity                                                                      |
| -------------------------------------- | --------------------------------------------------------------------------------------- |
| Preparation README                     | `34fa11bd35bbb48218ee13fa9986b61a8204cffd`                                              |
| Semantic commission                    | `f1a75907215252a466c6ad4f53120c84c3b19f9c`                                              |
| Numerical commission                   | `48836247c50ce388e1a21e5b0dd893291095809c`                                              |
| Horizon                                | `8cfe5c4226caf5545a84b30bf71f20488ae065bf`                                              |
| PR #179 close-only head                | `f8e212a8c86b83b712933e3ac785d824220eb449`                                              |
| PR #180 original numerical head / blob | `e5d5ba4e87d6dac05ad1df541a7b25aa0d8b08ab` / `da509af2ebe55795f4afe8035c7a003664672187` |
| PR #181 semantic head / blob           | `a2687f10719b399dafb511999cc1ef5b406a0c02` / `f70e89e995b0ec88d61d1a7eddf681ddb6d454b3` |

Live Issue #177 body was rehashed: 3974 UTF-8 bytes, SHA-256
`6da2af2a510d80289be5c5c8b3e885c0172332f18fec8c8cfbd602945158cf7e`.
Live Issue #178 body was rehashed: 4242 bytes, SHA-256
`362e603339f81ca72de3f3578a73b1c530ce3d0ead8dbc29e66a7c5187bf3b41`.
Both match the repaired commissioned inputs. Neither body was edited.

## Findings and author-side repairs

| Finding   | Severity / origin                   | Failure path                                                                                                                         | Repair and bounded closure evidence                                                                                                                                                                                 |
| --------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SA-1      | SHOULD-FIX, new                     | An incorrect zero passes the original absolute 1e-140 F-tail diagnostic at F=2^100, nu=60                                            | Reproduced original script/hash, demonstrated false acceptance, replaced with scale-relative endpoint diagnostic and enclosure-width guard; nine positive cases pass and eighteen zero/doubled-result controls fail |
| SA-2      | SHOULD-FIX, new                     | PR #179 summary presents historical REPAIR_REQUIRED as current, claims one changed file, and includes a non-neutral generated footer | Updated PR metadata to distinguish original and close-only outcomes and both files; removed footer; preserved both review blobs unchanged                                                                           |
| SA-3      | SHOULD-FIX, new                     | Preparation bibliography attributes the Williams interaction paper to Tukey                                                          | Corrected author to E. J. Williams using publisher-indexed metadata for DOI 10.1093/biomet/39.1-2.65; no full-text or methodological claim added                                                                    |
| SA-4      | NICE-TO-HAVE, new                   | Four binary64 endpoint projection equalities are printed but not asserted                                                            | Added assertions; original hexadecimal results reproduced unchanged                                                                                                                                                 |
| Carry S-4 | Previously closed via issue erratum | Next readers of numerical Q11 could still misclassify balanced Candidate B                                                           | Synchronized the next informative commission revision with the existing Issue #178 erratum; B remains balanced and C unbalanced                                                                                     |
| Carry N-1 | Prior next-revision observation     | The phrase resolved or explicitly bounded does not distinguish which opening holds can remain open                                   | Clarified that only numerical R4-P3 may remain explicitly unresolved at opening; other holds need resolution                                                                                                        |
| Carry N-2 | Prior next-revision observation     | R3 reuse language could imply an already accepted numerical foundation                                                               | Added a dated R3 input snapshot with semantic/acquisition blobs and conditionalized horizon reuse                                                                                                                   |

The semantic commission also mirrors Issue #177's preparation non-authorship
boundary; the numerical commission mirrors Issue #178's mandatory
`INPUT_INCOMPLETE`, `PRELIM-*`, and later-input review-state rules. These are
maintenance clarifications, not new independent close findings or changes to
the already commissioned fixed blobs. Future commissions need fresh pins.

Publisher metadata was checked on 2026-09-06 through the indexed
[publisher record](https://academic.oup.com/biomet/article-abstract/39/1-2/65/295165).
Direct page retrieval failed; full text was not inspected. The bibliography
correction is not source completion and does not license interaction semantics.

## Numerical repair identity and verification

PR #180 was updated to commit `5bae1f2548a7126c254c51b65b0eda4ae4941343`,
result blob `5b3668b8fb1b3c23f975654b21ffb8e8a1d41c46`.
Its Section 11 preserves the old commit, blob, script hash, failure, and repair
provenance. The repair contributor is explicitly not an independent reviewer;
the original independent investigator attribution does not cover repairs.

The original script SHA-256
`65b32feeb662b7dd3fdac36a3608e82c15b943a9a6d6086b0f05bd13b15558fc`
and transcript were reproduced with exit 0 before repair. The repaired script
SHA-256 is
`b66f7826badf2d335fa7faf9669a625752c30848a1fc24a1dae0dd41eba9cf0e`;
its complete probe rerun exited 0 under Python 3.12.13, x86_64.
Formatting, Markdown lint, typecheck, direct
`node --import tsx tooling/src/validate.ts`, and `git diff --check` passed
for the repaired numerical worktree. These checks do not prove scientific
validity, a portable projection certificate, or a supported numerical domain.

The scale-relative 1e-120 threshold is an exploratory diagnostic only, not a
new public-check tolerance. The self-derived enclosure proof still requires
independent review. Toy admission and manifest comparisons remain toy tests;
the report does not turn them into production-validator evidence.

## Semantic result and remaining work

The semantic result retains `INPUT_INCOMPLETE`, the three pinned R3 semantic
review blobs and reviewed heads, its preparation non-authorship statement,
balanced Candidate B, and the more-than-two-factor catalogue entry. This
self-review does not replace direct reinspection of its hashed PDFs. No
scientific or source hold is closed, and PR #181's result is unchanged.
Its embedded JavaScript probe was also rerun during self-review and passed:
algebra, declared refusals, and the unequal-weight counterexample. This is not
a replacement for the missing two-software-system comparison.

## Maintenance validation

The five-file informative maintenance revision passed repository-wide
`pnpm format:check`, `pnpm lint:markdown`, `pnpm typecheck`, direct
`node --import tsx tooling/src/validate.ts`, and `git diff --check` before
submission. No authoritative, generated, implementation, or conformance file
was edited. The formatter realigned existing Markdown tables.

Hosted CI run `34029504271` for the repaired numerical commit
`5bae1f2548a7126c254c51b65b0eda4ae4941343` completed successfully. This
does not establish primary-source or methodological correctness. No local
aggregate `pnpm check` success is claimed for this self-review; the known
launcher IPC restriction is not bypassed. Hosted CI for the separate
maintenance PR is recorded in that PR rather than inferred from this run.

## Required follow-up

Required follow-up, in dependency order:

1. Independently review the exact revised numerical head and the exact semantic
   head. Read the raw primary artifacts, check their hashes and formula
   transcriptions, and reproduce the probes. Self-review does not satisfy this.
2. Complete or explicitly narrow the semantic source holds: classical F-test
   and interval basis, Yates/Williams full texts, exact Type I-IV mappings,
   heteroscedastic procedures, and the actual two-software comparison. Resolve
   the reported arXiv version/date discrepancy before version-dependent reuse.
3. Bind a successor numerical commission/result to the reviewed semantic
   catalogue. Obtain archived numerical source identities, portable projection
   proofs, independent graph comparisons, omitted adversarial cases, interval
   and adjustment evidence, and resource/platform certificates. No final
   feasibility disposition is available from the preliminary pass.
4. Reconcile only accepted R3 inputs with exact commit/tree/blob and review
   state. Source arrival alone closes no R4 hold.
5. Complete scope selection, a standalone RFC, and independent pre-opening
   review before any public-opening decision. Merge of review/research records
   is a separate steward action and is not methodology adoption.

Author-side repair is complete for the findings above, subject to review of
this exact revision. Overall research readiness remains `INPUT_INCOMPLETE`,
not an independent GO, release approval, or implementation authorization.
