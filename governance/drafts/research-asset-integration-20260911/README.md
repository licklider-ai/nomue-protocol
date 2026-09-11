# Research asset integration audit

Date: 2026-09-11 UTC. Status: informative preservation record, not adoption.

Useful research and development work was present on unmerged PRs and branches.
The coordinator inspected fixed inputs, successor relationships, original
reviews, path scope and CI, then merged compatible assets sequentially. Older
contradictory revisions were not substituted for current corrected material.

## Inventory and outcomes

`INVENTORY.json` records 99 inventoried PRs and 98 non-ancestor branches without
an open PR. The local inventory contained 318 origin refs including main and
the origin HEAD alias, corresponding to 317 branches. The initial main was
`8b9a95b2436fba0725e3f2753c5a41a2de24e8e3`.

- Histories of 91 inventoried PR heads are included in the integrated tree's
  ancestry. A merged latest stack includes its predecessor commits; this does
  not mean 91 separate merge operations were performed.
- PR #174's numerical result is superseded by the corrected #265 stack,
  including the withdrawal of invalid nested-callback guarantees.
- PR #182's unique author self-review is extracted; its conflicting old
  preparation edits are superseded by the reviewed current preparation.
- PR #215 adds no current tree content. Reviews #251, #252, #257 and #260 are
  already preserved as exact original blobs by #249, including disambiguated
  filenames for the two different opening reviews.
- PR #209 is not integrated. Its shell-text guard rejects harmless comments
  and read-only commands, and its blanket wording is broader than current
  AGENTS provenance rules. It requires a new bounded tooling repair before
  activation, not a research-gate waiver.

Actual merge PRs, fixed heads and returned merge commits are in `MERGES.json`.
New PRs #302–#308 preserve previously unsubmitted reviews. PR #309 preserves
17 individually pinned historical assets without reactivating old tooling.
The audit itself is a later additive PR and is not included in its own receipt
list, avoiding a circular commit identity.

## Preserved research series

| Series                                | Integration route                                            | Material boundary retained                                                                              |
| ------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| R3 sources, candidate map and opening | #275, #277, #282, #284, #289 and original historical reviews | Source completion is distinct from method and numerical support                                         |
| R3 numerical corrections              | #265                                                         | Nested B2/C3/G guarantees remain withdrawn; original transcripts remain historical                      |
| R3 D0 and Holm experiments            | #280 and #300, preserving complete ancestor stacks           | Experimental structure and supplied-p arithmetic only; no scientific validity or supported execution    |
| R4 preparation and opening            | #179, #181, #184, #189, #191, #249 and #255                  | Historical findings and final opening receipt remain distinguishable                                    |
| R4 arithmetic and tails               | #281, #286, #294, #288 and #297                              | Exact arithmetic, conservative containment and host resource observations do not imply portable support |
| Earlier foundation and R2 reviews     | #302–#307 and #309                                           | Pinned historical verdicts, original non-claims, and separate author/independent roles                  |

The independent archive assessments are under
`review-inputs/research-asset-review-20260911/`. Both were performed by separate
nonauthor tasks configured as `gpt-5.6-sol`, with no served-build attestation or
human review claimed. They did not reread original primary PDFs. The existing
fixed primary-source reports are attributed reuse, not newly authenticated
source findings. The reports give archive GO only and retain promotion holds.

## Non-integrated material

Many branches differ only by old versions of paths with reviewed successors
already in main. Their original hashes are recorded; old contents are not
reinstalled. Identical blobs found under another name count as preserved
content, not as a new review or an ancestry merge.

Seven obsolete temporary workflow files are not activated. Forty old transport
files remain at their pinned original commits: setup prompts, manifest and
environment variants, and generated evidence bundles originally intended for
isolated target worktrees. These are not missing implementation results; the
useful review outcomes are preserved separately. Whole transport directories
deliberately carried non-normalized generated JSON and are not appropriate
drop-in current-main increments. The inventory distinguishes these retained
transports from merged research results.

No branch or historical PR was deleted or bulk-closed. Open predecessor PRs
whose content is already included are not evidence of missing assets. This
audit covers the recorded fixed heads; later branch updates require a new
delta assessment.

## Concrete PR #209 guard findings

The original hook at `5a87f5c31feaee1f8f083a4a6e289478810251f6` was executed
with the following command strings as inert JSON input, not as shell commands:

1. `git checkout safe # claude/example` was denied even though the prohibited
   name appears only in a shell comment.
2. `echo 'Generated with [Claude Code]' ; gh pr view 123` was denied even though
   the PR operation is read-only and writes no signature.

Both hook runs exited zero and emitted a deny decision. A replacement needs
command-aware parsing and write-operation scoping, plus alignment with the
current requirement to preserve exact material provenance. No hook bypass or
configuration change was made.

## Formal R3 and R4 state

The R3 discussion in Issue #274 opened at 2026-09-09T11:50:18Z; its recorded
30-day earliest completion is 2026-10-09T11:50:18Z. R4 Issue #261 opened at
2026-09-09T05:59:47Z, giving 2026-10-09T05:59:47Z. These issue records were
checked during integration. Neither window is restarted by an archive merge,
and reaching those dates does not automatically adopt a specification.

R3 B-2 formal disposition, scientific input validity, public-schema and
ownership work, lossless representation, supported execution, outcomes and
coupled conformance remain open. R4 source applicability, output policy,
platform and resource support, and whole-gate disposition retain their stated
limits. `PROMOTION-INTAKE.md` records the new review's three wording
clarifications without silently changing the fixed original proposal.
