# Validation record

2026-09-10 UTC. This review adds informative documents and a read-only checking script. No authoritative artifact or implementation behavior changes.

## Input and output scope are distinct checks

The supplied check-map.py was executed at the clean, detached reviewed commit before the review branch added files: PASS (49 classifications, 15 candidates, 30 evidence entries, 39 manifest inputs, exclusions and original-directory scope). The working tree was empty before and after that check.

The companion check-review.py repeats that original check in a temporary clean detached worktree at exactly `7f3321b5d8168611baba7647a864d862d87c0a55`, verifies the sole parent/tree and six additions, compares all 49 exact ID/name/class tuples against both pinned catalogues, checks every evidence blob/byte count/SHA-256 and matching manifest identity, checks the 15 manual assessment rows and selected source-locator anchors, and separately checks review-only additions against the reviewed commit. It also confirms the six original files' bytes are unchanged. No modified original checker is used.

The checks do not establish source authenticity, scientific correctness, acceptance authority or reviewer/model independence. Content comparison is documented in CANDIDATE-CONNECTIONS.md and HOLM-APPLICABILITY.md. The cumulative files were read selectively at relevant claims, review receipts, exclusions and acceptances; they were not all reread end to end. No global evidence-absence audit is claimed.

## Environment and commands

Linux x64; Node v24.19.0; Python 3.12; pnpm 11.19.0 available, packageManager requests 11.7.0. Existing public-repository dependency artifacts were copied locally, followed by `pnpm install --offline --frozen-lockfile --ignore-scripts`: PASS, lockfile unchanged. No external private dependency or source symlink was introduced.

| Check                                              | Result                                                |
| -------------------------------------------------- | ----------------------------------------------------- |
| Original clean-input check-map.py                  | PASS; repeated in an isolated clean worktree          |
| check-review.py                                    | PASS; full deterministic result in check-results.json |
| Prettier formatting of added Markdown/JSON         | PASS after formatting only review outputs             |
| Repository-wide pnpm format:check                  | PASS                                                  |
| Repository-wide pnpm lint:markdown                 | PASS                                                  |
| Direct `node --import tsx tooling/src/validate.ts` | PASS                                                  |
| `git diff --check` and staged output-only diff     | PASS                                                  |
| Existing files and PR #277 six files               | Unchanged                                             |

The direct validator is the repository validate entry point without the package-manager script wrapper. The full pnpm check, typecheck and implementation/unit/conformance tests were not run locally for this informative-only change. No statistical original PDF, source-PDF hash, historical numerical probe/reproduction or whole mathematical proof was re-executed. The small Holm endpoint example is explanatory exact arithmetic, not a numerical research rerun.

During authoring, a draft locator assertion used a status token that appears in the all-pairs review but not the multiplicity review. The check failed, the source text was inspected, and the assertion was corrected to the actual recorded no-original-access wording. The manual-table row matcher was also adjusted to allow Prettier column padding. These were check-script corrections, not a source or candidate finding. Final checks below apply to the corrected output.

## GitHub observations

The GitHub plugin returned PR #277 open, draft and unmerged, with head `7f3321b5d8168611baba7647a864d862d87c0a55`; main still equals `dedd26a3e0655001b67e40ccfb741e43ecb07beb`. No main changes needed to be incorporated. Input [CI run 34454871059](https://github.com/licklider-ai/nomue-protocol/actions/runs/34454871059), run number 604, was completed with conclusion success. This is a dated workflow observation, not new source/numerical verification.

The separate draft review PR targets research/r3-candidate-evidence-map-20260910. Its return commit/sole parent/tree, local-to-GitHub tree comparison, final changed-path count and output CI observation are recorded in that PR and the user return, after creation. No merge or branch rebase is performed. CI on the review output is separate from the successful input run.

Final repository Markdown scan: 404 files, zero issues. Format and direct repository validation returned exit code 0.
