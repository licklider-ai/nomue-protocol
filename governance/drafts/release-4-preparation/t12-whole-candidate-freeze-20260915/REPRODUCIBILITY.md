# T12 reproducibility procedure

Status: **UNISSUED CANDIDATE**.

## Checkout and environment

Checkout the exact T12 freeze commit reported as the T13 target. Confirm its parent
chain contains candidate content commit
`5478f30981da04faded03eaa0d15419a6665210d`.

Use Node 20 or later and the repository package manager. The recorded Linux closure
used Node 24.14.0, pnpm 11.7.0, CPython 3.12.14, and Linux x86_64. The T12 Windows
verification receipt records its actual tool versions. Python optimized checks use
`python -O`; normal checks omit `-O`.

Install repository dependencies without changing the lockfile:

```console
pnpm install --frozen-lockfile
```

## Immutable freeze check

Run the manifest and nested packet checks:

```console
python -B governance/drafts/release-4-preparation/t12-whole-candidate-freeze-20260915/verify_freeze.py --deep
```

Without `--deep`, the checker still verifies every commit/path/hash binding, the
T06-to-T11 chronology, the formal surface preservation boundary, Linux run bindings,
the unissued status, and the restriction that T12 changes only its own package.

## Structural verification

```console
python -B governance/drafts/release-4-preparation/t06-candidate-requirement-surfaces-20260915/verify_candidate.py
python -B governance/drafts/release-4-preparation/t07-closed-schemas-validator-20260915/verify_packet.py
pnpm exec tsc -p governance/drafts/release-4-preparation/t07-closed-schemas-validator-20260915/tsconfig.json --noEmit
pnpm exec tsx governance/drafts/release-4-preparation/t07-closed-schemas-validator-20260915/tests.ts
```

## Numerical and adapter verification

The G5 numerical truth artifacts are reused by exact commit and hash. Do not rewrite
them as newly generated T12 truth. Verify the T08 adapter boundary with:

```console
python -B governance/drafts/release-4-preparation/t08-limited-numerical-adapter-20260915/verify_packet.py
python -B governance/drafts/release-4-preparation/t08-limited-numerical-adapter-20260915/test_core_boundary.py
pnpm exec tsc -p governance/drafts/release-4-preparation/t08-limited-numerical-adapter-20260915/tsconfig.json --noEmit
pnpm exec tsx governance/drafts/release-4-preparation/t08-limited-numerical-adapter-20260915/tests.ts
```

## Integrated lifecycle verification

```console
pnpm exec tsx governance/drafts/release-4-preparation/t09-canonicalization-repair-20260915/focused.ts
pnpm exec tsx governance/drafts/release-4-preparation/t09-check-report-lifecycle-20260915/tests.ts
pnpm exec tsx governance/drafts/release-4-preparation/t09-check-report-lifecycle-20260915/tests.ts --optimized
python -B governance/drafts/release-4-preparation/t09-check-report-lifecycle-20260915/test_f01.py
python -O -B governance/drafts/release-4-preparation/t09-check-report-lifecycle-20260915/test_f01.py
```

The original T09 packet checker is historical and requires the original T09
`report.ts`. Run that checker in an isolated checkout of its immutable final commit:

```console
git worktree add --detach ../nomue-t09-repro 60ce3a41770edde6e3cf6dc67ff470cd6207af10
python -B ../nomue-t09-repro/governance/drafts/release-4-preparation/t09-check-report-lifecycle-20260915/verify_packet.py
```

At later commits it correctly reports that `report.ts` differs, because C contains
the separately frozen limited canonicalization repair. Current integrated behavior is
covered by the normal, optimized, focused, and F-01 commands above.

## Independent expectation comparison

The original failed freeze is historical. The corrected B freeze precedes repair C
and execution D. Reuse saved Windows and Linux measurements by hash; a new full
historical experiment is not required for T12.

```console
python -B governance/drafts/release-4-preparation/t10-independent-expectation-corpus-20260915/check_corpus.py
python -B governance/drafts/release-4-preparation/t10-independent-expectation-corpus-revision-2-20260915/check_revision.py
```

The final T10 packet checker has an intentional exact-stage scope assertion: at its
own final commit, only the repaired T09 `report.ts` may differ from stop A. Later
T11/T12 evidence additions are therefore outside that checker's accepted checkout.
Run it in an isolated checkout of the immutable T10 final commit:

```console
git worktree add --detach ../nomue-t10-repro db2efb3e301ba66797c1093f914b2466326e2d81
git -C ../nomue-t10-repro submodule update --init --recursive
python -B ../nomue-t10-repro/governance/drafts/release-4-preparation/t10-repaired-candidate-comparison-20260915/verify_packet.py
```

Remove that disposable worktree after review according to the reviewer's local Git
workflow. T12 does not reinterpret a failure caused solely by running the
stage-scoped checker at a later evidence commit.

## Regression preservation

```console
git worktree add --detach ../nomue-t11-repro 5478f30981da04faded03eaa0d15419a6665210d
python -B ../nomue-t11-repro/governance/drafts/release-4-preparation/t11-old-version-shared-change-regression-20260915/verify_continuation.py
```

The Linux T11 receipt is the authoritative full-check execution for the platform-bound
three-test classification. Re-running `pnpm check` on Windows can reproduce the three
known platform-path failures; it must not be presented as a candidate semantic
regression. The T11 checker has an exact-stage scope assertion and therefore runs at
the immutable T11 final commit, before the T12 package was added.

## Repository checks

Run the repository checks appropriate to the checkout:

```console
pnpm format:check
pnpm lint:markdown
pnpm typecheck
pnpm validate
pnpm check:generated
git diff --check
```

The complete Linux `pnpm check` result is preserved in T11. The T12 receipt records
the final lightweight checks actually repeated at the freeze state.
