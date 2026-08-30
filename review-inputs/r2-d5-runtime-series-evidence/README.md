# Release 2 D5 runtime-series review inputs

This directory is a temporary, repository-native transport for an independent
adversarial review. It is not a Protocol artifact, an authority source, a
release input, or evidence of runtime support.

The implementation target is the exact commit recorded in `TARGET.json`. The
review-transport commit is supplied separately in the reviewer invocation and
must contain only this `review-inputs/` increment beyond the implementation
target.

The `evidence/` directory is the unpacked, byte-identical content of the
GitHub Actions artifact produced for the implementation target. Its internal
`MANIFEST.sha256` authenticates all six payload files.

The reviewer should:

1. check out the exact review-transport commit supplied in the invocation;
2. read `REVIEW-PROMPT.md`;
3. verify `REVIEW-INPUTS.sha256` and `evidence/MANIFEST.sha256`;
4. create a clean worktree at the implementation target in `TARGET.json`; and
5. perform all code execution and numerical probes against that target.

No ZIP attachment, Git bundle, or external file handoff is required.

The exact Actions artifact includes generated JSON whose bytes are intentionally
preserved and are not Prettier-normalized. Do not run the repository-wide
`pnpm check` against the transport commit or reformat `evidence/`; run all
repository checks in the clean implementation-target worktree as instructed.
