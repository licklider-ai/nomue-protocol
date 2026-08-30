# Release 2 D5 critical-value table evidence N1 close-only review protocol

## Assignment

Perform an independent, adversarial, close-only review of the accepted N1 repair
for the Release 2 paired-t fixed-95 critical-value table evidence candidate.

- Repository: `https://github.com/licklider-ai/nomue-protocol`
- Baseline and PR #47 merge: `c0d6b2d8512e473111f98f9dba91ffc8bc97f3b8`
- Original reviewed implementation: `19139d51aad108125ef9854c304c698ce9b15ade`
- Original independent review result: `24456c9d3d7faef56bbb731dac57045401780ea6`
- Repair commit: `0738558902dbcc851adbfd037a4f8f157370a46d`
- Repair tree: `678e12058907010de8e3170af0f35d78948e1ec8`
- Public RFC: <https://github.com/licklider-ai/nomue-protocol/issues/25>

Check out the repair commit by exact hash in a detached fresh clone or worktree.
Do not review a moving branch. Confirm that its only parent is the baseline above.

This review must not repeat or replace the completed 200-cell numerical review.
It must instead establish that the accepted documentation clarification and exact
cross-df monotonicity check close N1 without changing any reviewed numerical
content or authority state.

## Intended repair

The exact four-file delta from the baseline to the repair commit is:

- `tooling/r2-paired-t-evidence/README.md`
- `tooling/src/spikes/validate-paired-t-critical-value-table-evidence.ts`
- `tooling/src/spikes/probe-paired-t-critical-value-table-evidence.ts`
- `tooling/tests/paired-t-critical-value-table-evidence.test.ts`

The intended delta contains 70 insertions and 2 deletions. It does only the
following:

1. explains that the validator does not execute the rigorous numerical methods
   or establish cell-level mathematical truth for an externally supplied bundle;
2. checks that valid positive finite binary64 critical-value cells decrease
   strictly as integer df increases;
3. adds one coherently rehashed mutation that must reach the dedicated
   monotonicity error; and
4. adds direct unit coverage for the comparison helper.

Any other changed path, numerical cell, generated artifact, authority state, or
behavior is outside the intended repair and must be reported.

## Required checks

### 1. Identity and scope

- Confirm the baseline, repair commit, repair tree, parent, four-file set, and
  `+70/-2` delta exactly.
- Confirm the original review-result commit is a direct child of the original
  reviewed implementation and still reports `GO`, zero blockers, zero should-fix
  items, and N1 only.
- Confirm no generator, certificate core, case manifest, candidate checkpoint,
  reviewed table cell, evidence hash, registry, schema, conformance fixture,
  verifier path, Release 1 artifact, or authoritative surface changed.

### 2. Documentation boundary

Confirm that the README now distinguishes these two claims without ambiguity:

- standalone validation checks byte binding, structure, authority posture,
  cross-df monotonicity, and internal exact-rational consistency; and
- cell-level mathematical truth requires regeneration from pinned source plus
  independent numerical review.

The wording must not imply that a matching hash, internally coherent certificate,
or successful standalone validator run proves the recorded numerical enclosures
true.

### 3. Monotonicity behavior

Inspect the comparison rather than trusting its test names. Confirm that, for
positive finite IEEE 754 binary64 values encoded as lowercase 16-digit hex, the
ordered unsigned bits have the same order as their numerical values. Confirm the
validator requires each later df cell to have strictly smaller bits than its
predecessor.

Exercise at least:

- a strictly decreasing sequence, which must pass the helper;
- equal adjacent cells, which must fail;
- an increasing adjacent pair, which must fail;
- zero, negative, infinity, NaN, malformed, uppercase, short, and long encodings,
  which must not be accepted as a valid decreasing table; and
- a real regenerated 200-cell table, which must pass.

Starting from that valid regenerated bundle, make one later cell equal to its
predecessor, rebuild the ordered-table hash and manifest with the repository's
byte formats, and run the exported validator. Require the exact error:

```text
critical-value table cells must be strictly decreasing as df increases
```

Confirm the mutation probe itself fails if that exact error is absent rather than
passing on an unrelated rejection.

### 4. Regression and authority boundary

- Generate the full 200-cell bundle at the repair commit with the pinned Python
  and FLINT dependency versions.
- Confirm the unmodified bundle validates.
- Confirm all 21 bundled mutations are rejected with no uncaught exception.
- Independently recompute the ordered-cell hash and confirm it remains
  `sha256:24ccc86d7a49b9e1ef1e3fc9b038a5b8d338b8b5ca4a02492d8900d7e7dea3c0`.
- Confirm all checkpoint selection, support, issuance, endpoint-truth, platform,
  Public Check, bundle, R2-D5, and Release 2 states remain unchanged.

### 5. Repository-wide checks

From a clean exact checkout, run:

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm check
```

If the environment prevents the `tsx` CLI from creating its IPC socket, record
that environmental limitation and run each underlying TypeScript entry point with
`node --import tsx`. Confirm `git status --porcelain` is empty afterward.

## Required output

Return one report containing:

1. exact repository, baseline, repair commit, tree, parent, and file-delta identity;
2. documentation-boundary result;
3. direct monotonicity and hostile-input results;
4. regenerated bundle, 21-probe, and ordered-hash results;
5. authority and Release 1 invariance results;
6. repository-wide check result;
7. any unexpected finding classified as `BLOCKER`, `SHOULD-FIX`, or
   `NICE-TO-HAVE`; and
8. one close-only verdict: `CLOSED` or `NOT CLOSED`.

`CLOSED` means only that the accepted N1 repair may merge and the original
candidate-scoped `GO` remains valid. It does not approve a final table or hash,
supported df, endpoint truth, platform support, runtime support, Public Check,
bundle, R2-D5 completion, Release 2 publication, or RFC closure.

If operating in the repository, write only
`review-inputs/r2-d5-critical-value-table-n1-close/REVIEW-RESULT.md` on a neutral
reviewer-owned branch such as
`review/r2-d5-critical-value-table-n1-close-07385589`. Do not modify the repair
branch or implementation files.
