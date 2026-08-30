# Runtime-series evidence close-only review inputs

This directory is a temporary, repository-native transport for the close-only
review of the sole nice-to-have finding from the independent review of PR #33.
It is not a Protocol artifact, authority source, release input, or support
claim.

The repair target and its reviewed parent are pinned in `TARGET.json`.
`evidence/` is the unchanged repository-native evidence used in the original
review. Its `MANIFEST.sha256` must verify before any mutation probe.

Read `REVIEW-PROMPT.md` and restrict the review to its named closure checks.
No ZIP attachment, Git bundle, or external file handoff is required.

The exact generated evidence JSON is intentionally not Prettier-normalized.
Run repository-wide checks only in a clean worktree at the repair target; do not
reformat `evidence/`.
