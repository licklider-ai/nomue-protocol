# PR #33 runtime-series evidence repair — close-only review

## Review type

Perform a close-only review of the sole NICE-TO-HAVE finding from the
independent adversarial review of the Release 2 D5 runtime-series evidence
candidate. Report in Japanese.

Do not reopen the numerical formulas, the 19-case enclosure review, the
independent 308-point corpus, the authority review, or other closed findings
unless the three-file repair directly invalidates them.

The only permitted conclusion is **CLOSED** or **NOT CLOSED** for the named
finding. This review cannot establish runtime support, correct rounding, a
supported df range, final tolerances, reason codes, identifier issuance, D5
completion, or an authoritative paired-t capability.

## Repository-native inputs

The reviewer invocation supplies an exact review-input commit on branch
`review/r2-d5-runtime-series-evidence-close-bafffea8`. Check out that exact
commit first. If it is not pinned, stop and request it.

All inputs are under:

`review-inputs/r2-d5-runtime-series-evidence-close/`

No ZIP attachment, Git bundle, or external file is part of this review.

Pinned repair target:

- repair commit: `bafffea8e7ca6f9bfb2036bfa53aaaf9219950d7`
- repair tree: `684d26d5066602a9897663197f51d316221b1a94`
- reviewed parent: `2f2672fe45704d9860d52247862a13fb1dd30ca4`
- expected delta: exactly 3 files, `+151/-4`
- original review-input commit:
  `80768e3765177086fee5d41d463be1d6f04e5b4d`
- original verdict: GO, with zero blockers, zero should-fix findings, and one
  nice-to-have finding

Create a separate clean clone or worktree at the repair commit for all code
execution. Preserve the exact bytes under `evidence/`.

## Identity checks

1. Confirm the review-input commit equals the SHA supplied in the invocation.
2. Confirm the repair commit, reviewed parent, and original review-input commit
   resolve in the same repository.
3. Confirm the repair tree and exact three-file delta.
4. Confirm the repair-to-review-input delta is confined to
   `review-inputs/r2-d5-runtime-series-evidence-close/`.
5. Verify `REVIEW-INPUTS.sha256` and `evidence/MANIFEST.sha256`.
6. Confirm the evidence files are byte-identical to the original review input at
   commit `80768e3765177086fee5d41d463be1d6f04e5b4d`.

Return NOT CLOSED if identity cannot be established. Do not review a nearby
commit, moving branch head, or current working tree as a substitute.

## Finding to close

The original validator exited nonzero through an uncaught `SyntaxError` and
stack trace when a JSON file was syntactically malformed, even after an attacker
rebuilt the bundle manifest. Expected behavior is a structured error entry and
exit 1 without an uncaught exception.

Review:

- `tooling/src/spikes/validate-paired-t-runtime-series-evidence.ts`;
- `tooling/tests/paired-t-runtime-series-evidence.test.ts`; and
- `governance/drafts/release-2-candidate/reviews/d5-runtime-series-evidence-candidate-adversarial-review-disposition.md`.

### Required close probes

For each of:

- `cases.json`;
- `environment.json`; and
- `runtime-series-evidence.json`;

copy the supplied valid evidence directory, replace that file with malformed
JSON, rebuild its entry in `MANIFEST.sha256`, and run:

```bash
node --import tsx \
  tooling/src/spikes/validate-paired-t-runtime-series-evidence.ts \
  <mutated-evidence-directory> \
  2f2672fe45704d9860d52247862a13fb1dd30ca4
```

For all three files verify:

- exit status is exactly 1;
- output contains `<file>: not valid JSON`;
- no `SyntaxError` or stack trace escapes;
- no later semantic dereference crashes; and
- the original valid evidence still validates.

Also attack simultaneous corruption of two or all three JSON files. The
validator should return every parse error that it can establish and should not
enter semantic validation with an unavailable parsed document.

### Regression and scope checks

- Run the new unit tests and independently reproduce the CLI behavior.
- From a clean repair-target clone run:

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm check
git status --porcelain
```

- Confirm the repair does not alter formulas, graph evaluation, evidence
  generation, evidence bytes, maturity state, identifiers, registries, schemas,
  conformance fixtures, reference verifier behavior, or Release 1.
- Confirm the disposition accurately records the original GO verdict, evidence
  boundaries, the single finding, the repair, and remaining held decisions.
- Confirm public review issue #25 remains open and the window need not restart.

## Verdict and report

Return:

- **CLOSED** — all identity, malformed-JSON, valid-baseline, regression, and
  disposition checks pass; or
- **NOT CLOSED** — any named check fails.

Report:

1. Identity checks
2. Verdict
3. Finding close table for the three JSON files and simultaneous corruption
4. Valid-baseline and full-regression results
5. Disposition fidelity and authority-boundary result
6. Any repair-induced regression, with severity and smallest fix
7. Reproduced commands and outputs
8. External research requirement: `none` unless the repair unexpectedly
   introduces a genuinely new numerical claim
9. Workspace cleanup confirmation

Do not add speculative polish findings or perform a new full numerical review.
