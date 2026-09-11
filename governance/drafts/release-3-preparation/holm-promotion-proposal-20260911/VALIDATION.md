# Validation and preparation limits

This packet is a documentary proposal and residual inventory. No new numerical
experiment or primary-PDF review is part of this preparation.

## Completed local checks

- Every INPUTS.json source matches its pinned commit/path Git blob, byte length
  and SHA-256; connector-decoded content also reproduces the Git blob hash.
- The branch adds only this packet to the stated main base; historical reports,
  candidate implementations, authoritative files and generated artifacts remain
  byte-preserved.
- Repository formatting, Markdown lint, direct repository validation and whitespace
  checks pass; dependency installation uses the unchanged frozen lockfile.
- Self-review checks the proposed scope, exact arithmetic and display separation,
  canonical ingress distinction, conditional source reuse, resource limitations,
  R2/public-window boundaries and explicit non-adoption.

All four checks above passed. The input check validated 27 commit/path/blob/size/
SHA-256 identities, including reconstruction of Git blob hashes from retrieved
bytes. The staged diff contains six additions under this packet only. No baseline
file changes or removals occur, and no generated output is edited.

Executed on Linux with Node 24.19.0 and pnpm 11.19.0 (the repository declares
pnpm 11.7.0). Offline frozen-lockfile installation reused 387 packages with no
lockfile change. Commands and results:

| Command or check                            | Result                                                           |
| ------------------------------------------- | ---------------------------------------------------------------- |
| `pnpm install --offline --frozen-lockfile`  | Exit 0; no dependency changes                                    |
| Input identity/byte verification            | 27 entries match                                                 |
| `pnpm format:check`                         | Exit 0                                                           |
| `pnpm lint:markdown`                        | Exit 0; 403 Markdown files, zero issues                          |
| `node --import tsx tooling/src/validate.ts` | Exit 0; registries, authority, links and repository audits clean |
| `git diff --cached --check`                 | Exit 0                                                           |

The self-review made the following boundaries explicit before publication of
this proposal: all fourteen later candidates remain accounted for; NB rows are
mapped without changing historical states; canonical Record ingress is not
relaxed by the experiment's pretty-JSON acceptance; adopted identity grammar is
separated from unsettled R2 surfaces; final envelope changes require new size
accounting; and the resource proposal does not turn observed RSS into a universal
bound. This is author self-review, not independent B-2 review.

GitHub CI for this new packet is separate and is reported in the PR handoff.

No full numerical suite, all-platform runtime test, new resource measurement,
source reread, independent B-2 closure, schema implementation, gate decision or
release validation is claimed. A later public-surface change needs the full suite
and affected conformance evidence required by AGENTS.md.
