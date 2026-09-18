# D0 completion and D1 engineering handoff

Date: 2026-09-18 UTC. D0 design checkpoint complete; D1 engineering permitted.
This record is contributor intake, not a new review or formal adoption decision.

The reviewer-authored REPAIR-CONFIRMATION.md is retained without changes from
commit `6410025cb56631a63c311e4aa213890e02f4d0be`, Git blob
`47739e97439e60027221023cb6c54d6e5aabcae8`, SHA-256
`fd0a05188e3a02338f65bac778b86a17f1b4df4b6f19982cf35bdf37e1c16076`.
Its reviewed target is `1eb6b931d7e20466bb8d3c364965545362efb2f0`, tree
`a5f8e21095f396c04819ae33a80e10b5bdd7888a`. The reviewer closes two MAJOR and four
MINOR findings, permitting only unissued implementation. Prior review and
commission bytes remain unchanged. No unrelated branch history is merged.

The only design-text correction at intake is editorial E-1: K's table prerequisite
is now simply S passes. Projection unavailability still refuses as specified in
the reviewed prose and R3D-43. No new behavior or expanded claim is introduced.

## D1 continuation

The first implemented component checkpoint is saved in
[nomue-verifier PR #20](https://github.com/licklider-ai/nomue-verifier/pull/20),
head `a82997073b17277f85d524f61efb7bc9249192a5`, tree
`0695e9b67995710cd365fec944c0443c17b65107`, based on
`940b8fb6990632029bcebd2ebdf6ce9dca8e9244`.
Its [handoff and review request](https://github.com/licklider-ai/nomue-verifier/blob/a82997073b17277f85d524f61efb7bc9249192a5/development/r3-holm/HANDOFF.md)
cover raw-preserving projection and dependency/reason propagation. Author checks
passed 36 component tests (including 192 graph combinations and 15 output
mutations), strict TypeScript checking, existing npm tests and actual package
smoke/exclusion checks on Node 24.19.0 / Linux x64. Hosted CI and independent
implementation review are separate. D1 overall and all 44 full-call cases remain
open; no package runtime or Protocol source pin is advanced.

## D1 component receipt and local-check continuation

The first checkpoint received GO_FOR_D1_CONTINUATION, 0 BLOCKER, 0 MAJOR,
2 MINOR, in the [independent review](../../../../review-inputs/r3-holm-d1-component-20260918/REVIEW-RESULT.md).
It is preserved verbatim from reviewer commit `7b057d5`, blob
`3cb3514573d15427c1d4b95a90c3a8d8aab2966c`, SHA-256
`86dcb30d32c7d16519d549bc23471693e29d6649ed6904282695e1a57e592d36`.
Intake commit `3494e2d99c3f0bd9c54fc65bf971fcce98372eda` adds only that record.
The review applies to `a829970`, not to the new code below. That reviewed head's
hosted CI run 35309941826 completed successfully, separately from the reviewer's
local executions. Reviewer/model/environment disclosures remain in the original.

The local-check continuation checkpoint was fixed at head
`77bb4ebaac5eca37390b8b23aede90f3d25702c0`, parent `a82997073b17277f85d524f61efb7bc9249192a5`,
tree `b16cb336d83454adb0d0360de3ee8308c7e53f26`, still based on
`940b8fb6990632029bcebd2ebdf6ce9dca8e9244`. The incremental delta is 20 files,
+4789/-38, including eight unchanged schema/fixture copies from candidate.4 and
its D0 inputs. Source paths/blobs/hashes are recorded in the Verifier provenance
manifest; Protocol's historical candidate and review bytes are untouched.

The MINOR repairs add strict CI typechecking and typed graph invariant errors
with the required future `internal_error` invocation-refusal mapping. The new
component connects actual Record schema, D0 relationships, bounded Holm domain,
independent expected context and declared-digest comparison to the reviewed
storage/dependency foundations. It freezes the private parsed Record and keeps
unexpected/resource failures outside scoped evaluations. It does not compute A,
emit a public report/refusal or forward bytes.

Author validation passed 55/55 component tests, including all 50 retained D0
relation-stage vectors, strict typechecking, existing npm tests, actual tarball
exclusion/installed CLI checks and eight source-copy hashes on Linux x64 / Node
24.19.0. The published tree matches the locally validated tree. New-head hosted
CI is separate. Numerical/real-host/full-call suites are not claimed.

The [current handoff and independent review request](https://github.com/licklider-ai/nomue-verifier/blob/77bb4ebaac5eca37390b8b23aede90f3d25702c0/development/r3-holm/LOCAL-CHECKS-HANDOFF.md)
contains that checkpoint's repair disposition, exact extraction scope and case
map. Its subsequent independent receipt and the next checkpoint are below.

## D1 local-check receipt and successor inner call

The [local-check review](../../../../review-inputs/r3-holm-d1-local-checks-20260918/REVIEW-RESULT.md)
returned GO_FOR_D1_CONTINUATION for `77bb4eb`, with 0 BLOCKER, 0 MAJOR, 1 MINOR;
the prior two MINOR findings are independently closed. Preserve its scope and
reviewer disclosure: this is not D1 completion or adoption. The original comes
from reviewer commit `9d69da5`, blob `11039218c1167e4e8632f45fa68f908eee794407`,
SHA-256 `453c40ddf25a5684ff525a9450dd00135faca9fc236fa570cdd892cc8d5bee29`.
Intake commit `d40d61bf7a1b47ad650988cdc67033a14e7023f3` adds only that file.

Verifier PR #20's next checkpoint is head
`f4b07868db999b282126b3a1c5620ee01a5252a4`, parent
`77bb4ebaac5eca37390b8b23aede90f3d25702c0`, tree
`967e008a553cba51fe02d1c03d5dcffc2e96a121`, base
`940b8fb6990632029bcebd2ebdf6ce9dca8e9244`. Incremental delta: 26 files,
+4805/-29. This includes versioned draft schemas, exact numerical-source copies,
test evidence and documentation; it is not a numerical-method change.

The m-1 repair puts strict parse/bounds first, then exact bundle and separately
validated Record/revision identities, then canonicalization/projection/digest.
Crossed tests fix unsupported/missing bundle plus nonfinite input precedence.
The successor inner call explicitly selects candidate.5, connects the unchanged
Python numerical worker A, and produces versioned separated report/refusal output.
Schema/graph checks plus private evaluation evidence reject fabricated rows.
Bounded file acquisition, shared time/heap checkpoints, direct-child deadline,
cancellation and close-before-return are implemented. Graph and unexpected errors
map to invocation internal_error, not reported check errors.

Author validation on Linux x64 / Node 24.19.0 / Python 3.12.14: 66/66 TypeScript
tests, strict typecheck, existing npm tests and actual package checks passed.
Eighty-six actual worker vectors match the retained independent closed-testing
oracle. Numerical worker/kernel/oracle bytes match the fixed Protocol sources;
raw logs and source hashes are saved in Verifier. Hosted CI is a separate result.

The [inner-call handoff and independent review request](https://github.com/licklider-ai/nomue-verifier/blob/f4b07868db999b282126b3a1c5620ee01a5252a4/development/r3-holm/INNER-CALL-HANDOFF.md)
fixes the changed output contract, order repair, numerical reuse, execution scope,
failure questions and review-record path. This new target awaits its own review.
The outer cgroup supervisor, whole-process-tree cleanup, trusted completion,
original-byte forwarding and full 44-case evidence remain unimplemented or
unproven for this successor. None is inferred from an all-pass inner report.
D1 and all 44 full-call obligations remain open; D2/D3 follow afterward.

## Continuing engineering boundary

Develop in the public nomue-verifier repository, outside its npm runtime and
supported dispatch until the coordinated adoption/integration permits promotion.
Retain the reviewed local foundations while reviewing the new versioned output,
numerical inner call and its controls. Next connect the outer supervisor and
trusted completion with original-byte forwarding and full acceptance evidence;
do not substitute inner tests for the full controlled invocation.

This sequencing does not declare D1 complete or narrow its acceptance matrix.
Maintain a case-to-test map distinguishing component evidence from full-call
evidence. None of the 44 planned full-call cases becomes passing merely because
a helper test passes. A tested component checkpoint can receive a bounded code
review while the full candidate, schemas, fixtures, real-host evidence and
conformance/dispatcher/output-protocol join remain explicitly unfinished.

Keep Protocol candidate.4 and all original numerical/evidence bytes intact. Do not
relabel historical test runs as successor evidence or update SOURCE-PIN merely
because a development branch exists. The next implementation handoff must include
exact Verifier commit/tree, changed files, actual commands/results, self-review,
remaining cases and an independent review request for the completed code scope.

No merge, supported capability, permanent identifier, RFC-window change or release
is authorized by this intake. Prepared with OpenAI Codex assistance in the existing
author/coordinator context; the independent confirmation retains its own disclosure.
