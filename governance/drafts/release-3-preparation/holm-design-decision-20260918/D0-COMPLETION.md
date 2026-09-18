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
failure questions and review-record path. That target subsequently received the independent review recorded below.
At that inner checkpoint, the outer cgroup supervisor, whole-process-tree cleanup,
trusted completion, original-byte forwarding and full 44-case evidence remained
unimplemented or unproven. None was inferred from an all-pass inner report.
The subsequent controlled-call checkpoint is recorded below; D1 remains open.

## D1 inner-call receipt and controlled-call continuation

The [inner-call review](../../../../review-inputs/r3-holm-d1-inner-call-20260918/REVIEW-RESULT.md)
returned GO_FOR_D1_CONTINUATION for `f4b0786`, with zero BLOCKER, zero MAJOR and
one MINOR; the routing-order MINOR is independently closed. The original is
preserved from reviewer commit `bcb723b`, blob
`dfc1d31a17ce46654f966862ecf7187625649341`, SHA-256
`13500839415e60825cfd499dbec3b5ba91daef1050ea2dee3cf8a4311917d4d0`.
Intake `a477d40fbc945d11947b2429e15905b1969e2d6f` adds only that record. Prior reviews,
confirmation and original commission bytes are unchanged.

The reviewer ran 65 TypeScript tests and skipped the actual-child test because
its host had Python 3.11.15; 86 worker vectors ran under that interpreter. The
pinned Node/Python tuple and hosted CI were NOT_RUN by the reviewer. Preserve
that distinction from the author's successful pinned-tuple run and the later
Verifier CI run 35315604170. This is not an independent host qualification.

The next Verifier checkpoint is head `3c51172a66d2c13ebec99e2dbe7c4ab892888af9`,
parent `f4b07868db999b282126b3a1c5620ee01a5252a4`, tree
`e3d7cc3da06ca2fccca5900c561a150c0da762ec`, based on
`940b8fb6990632029bcebd2ebdf6ce9dca8e9244`. Increment: 25 files, +2789/-21.
Its [controlled-call handoff and review request](https://github.com/licklider-ai/nomue-verifier/blob/3c51172a66d2c13ebec99e2dbe7c4ab892888af9/development/r3-holm/OUTER-CALL-HANDOFF.md)
fixes the new code, exact review scope, source provenance and remaining cases.

The expected-access MINOR is author-repaired: directories, symlink loops and
other expected-only path failures return C error `expected_unreadable`, keeping
S/K/D/H/I results; expected resource limits and unexpected host failures still
refuse the whole invocation. The exact directory regression passes. Symlink
following and candidate.5's `p_generation: not_asserted` vocabulary are documented;
the latter still needs D3 public-surface/schema disposition.

The new controlled call launches a fresh pinned supervisor directly, applies the
historical cgroup memory/swap/tasks/CPU policy before Node startup, retains fixed
failure precedence and complete descendant cleanup, and validates direct trusted
completion before releasing the retained original bytes. It accepts no saved
receipt as an invocation. Nonces and payload hashes frame local completion;
they are not a new authentication claim or Protocol identifier scheme. Supervisor
loss still requires external delegation cleanup. The released CLI is unchanged.

Author validation: 75/75 TypeScript tests with no skips, five Python supervisor
contract tests, strict typecheck, existing npm tests and actual package checks.
Twenty-six predetermined case variants pass through the inner file adapter. The
local cgroup mount is read-only, so local enforcement is NOT_RUN. The dedicated
[exact-head CI run 35318802381](https://github.com/licklider-ai/nomue-verifier/actions/runs/35318802381)
completed its controlled-host job successfully: 26 real controlled-call variants
and 13 actual-host fault controls, 39/39 passing. The unmodified 117-file artifact
is retained as [controlled-host-3c51172.zip](controlled-host-3c51172.zip), SHA-256
`8e08314c2b18ed66fcc88170848c87fbaf55e8f34e5cee3a31b63f335f088fe9`.
[Evidence metadata](CONTROLLED-HOST-EVIDENCE.json) fixes the job/artifact IDs,
source-manifest hash, checks and remaining scope. The CI checkout was synthetic
merge `532eea84fd6505e81a7128f9064f9916415144f1`; its tree equals the fixed head.
Archive hashes match GitHub, all archived input bytes match the predetermined
local inputs, all normal receipts bind the pinned source inventory and complete
cleanup, and forwarded bytes equal the archived original. Other CI jobs are
reported separately in the PR; this author host run is not independent clearance.

D1 remains open. First independently review this bounded changed scope, then
expand the missing/parameterized 44-case obligations and full-path fault injection.
D2 dispatcher/legacy compatibility and D3 authority integration remain separate.
No full acceptance row is closed merely by one representative passing variant.

## D1 controlled-call receipt and expanded checkpoint

The [controlled-call review](../../../../review-inputs/r3-holm-d1-controlled-call-20260918/REVIEW-RESULT.md)
returned GO_FOR_D1_CONTINUATION for `3c51172`, zero BLOCKER/MAJOR and two MINOR
findings. Expected-access m-1 is independently closed. The review original is
preserved from reviewer commit `310c4cf`, blob
`4694d74889a3bb69eaed07b1b2a566e392ba07ec`, SHA-256
`ecf6888d660c1ea37dbb37195e576886cecf76f10ff604d63e880daf132b039b`.
Intake `3e338d098d62e6c131a0c9910249106ac1fa9118` adds only that file. Earlier
reviews, the commission and historical evidence archives are unchanged.

The reviewer independently verified the previous 39-receipt archive and source
hashes but could not execute actual cgroup enforcement, Python 3.12.14 or the
all-pass supervisor path on its own host. These NOT_RUN limits and the continuing
language-model reviewer disclosure are preserved; this is not human-expert or
host-qualification clearance.

The next Verifier target is head `5ee62cdb98dde2b32b7910560bc85d1ad54b16c8`,
parent `3c51172a66d2c13ebec99e2dbe7c4ab892888af9`, tree
`2e7fa03210abac459b10ef781e194a68f64592c1`, base
`940b8fb6990632029bcebd2ebdf6ce9dca8e9244`. Increment: 19 files, +1569/-30.
The [expansion handoff and independent review request](https://github.com/licklider-ai/nomue-verifier/blob/5ee62cdb98dde2b32b7910560bc85d1ad54b16c8/development/r3-holm/EXPANSION-HANDOFF.md)
fixes scope, failure questions and return path
`review-inputs/r3-holm-d1-expansion-20260918/REVIEW-RESULT.md`.

m-2 author repair shares seven path-error codes and regular-file failure between
Record and expected adapters. Record symlink loops/overlong paths now refuse as
input_access_error. m-3 supplies a genuinely absent expected argument through the
supervisor and entry; R3D-16 fixes expected_missing separately from R3D-17's
missing-file expected_unreadable. Both repairs require independent closure.

The successor suite expands from 26 to 47 ordinary call variants. Three elementary
numeric endpoint/subnormal-tie targets are specified independently of the worker;
its numerical sources and oracle are unchanged. Fourteen fixed trusted fault-entry
runs challenge private-evidence/output validation, including structurally valid
fabricated S pass. Their receipts retain probe provenance; they cannot be selected
or accepted as ordinary controlledCall results. Thirteen existing host controls
remain. tsconfig and the two fault-entry runtime files join the source inventory.

Author local validation: 91/91 TypeScript tests, zero skips; 47 actual numerical
inner-file cases; 14 native fault entries; five Python supervisor tests and 86
independent numerical vectors; strict typecheck, npm tests and package checks.
Local cgroup enforcement remains NOT_RUN because the mount is read-only.

The [fixed-tree CI run 35321867056](https://github.com/licklider-ai/nomue-verifier/actions/runs/35321867056)
passes all nine jobs. Its actual-host suite passes 74/74: 47 ordinary calls,
14 controlled fault-entry runs and 13 enforcement/lifecycle controls. The original
212-file archive is [controlled-host-5ee62cd.zip](controlled-host-5ee62cd.zip),
SHA-256 `400160b5807194a8610a5e517cbc28559c25eac353fa65be8e6551d4bd0fdc3c`.
[Exact evidence metadata](EXPANSION-HOST-EVIDENCE.json) records source/runtime pins,
job/artifact identities, checks and limits. Synthetic CI merge
`e899187c53ecfb753be3206b910c2acee3471009` has the same tree as the fixed head.

Archive verification matches all 88 saved input byte files to locally regenerated
predetermined fixtures and compares expectations after input-root path normalization.
All receipts match the source inventory and complete cleanup. The 47 normal calls
have distinct nonces; all four forwards equal original archived bytes. R3D-16's
actual supervisor receipt reports expected_missing; the separate missing-file
variant reports expected_unreadable. Record loop and overlong probes both refuse
as input_access_error. All fourteen controlled fault entries return only refusal
output, never provisional Record bytes. This is author evidence awaiting review.

The [44-locator accounting](https://github.com/licklider-ai/nomue-verifier/blob/5ee62cdb98dde2b32b7910560bc85d1ad54b16c8/development/r3-holm/ACCEPTANCE-COVERAGE.json)
keeps every locator partial. Complete limit/reason/rounding matrices, independent
raw-byte oracles, helper-corruption paths, actual setup/cleanup failure and
supervisor-loss/external-owner evidence remain. D2 still owns final dispatcher and
legacy expected-argument behavior; D3 owns normative/schema/authority integration.
The next decision is independent review of this bounded delta, not D1 completion.

## Continuing engineering boundary

Develop in the public nomue-verifier repository, outside its npm runtime and
supported dispatch until the coordinated adoption/integration permits promotion.
Retain the reviewed inner foundations while independently reviewing the new
controlled lifecycle, completion and original-byte forwarding. Expand full
acceptance evidence next; do not substitute pure receipt/inner tests for actual
controlled invocation and host evidence.

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
