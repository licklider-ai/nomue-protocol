# D5 Group 3 supported-execution admission-evidence adversarial-review protocol

## A. Review identity and boundary

Review the exact pull-request head, not a branch name. Record the head, sole parent,
merge base, tree, changed paths, line delta, live PR head at the beginning and end,
and exact hosted check runs. Refuse the review if the head moves or the declared
delta is incomplete.

The permitted verdict is limited to non-authoritative Group 3 admission-evidence
infrastructure. A `GO` does not select an allowlist, controlled-process profile,
supported-execution predicate, supported domain/runtime, reason codes, Public Check,
bundle, RFC disposition, R2-D5 completion, or Release 2 completion.

## B. Required source reconstruction

Read this protocol, `AGENTS.md`, the candidate checkpoint, aggregate readiness,
Group 1 and Group 2 checkpoints, both preserved Group 2 review results, the reviewed
tail supported-execution checkpoint/implementation/disposition, Section H supplement
and comparison, and the supported-platform research disposition. Resolve every
source-snapshot blob from the declared source commit with Git object commands; do not
trust the checkpoint's blob strings.

Confirm that Group 1 and Group 2 are closed only as reviewed non-authoritative
candidate-selection milestones and that the Group 2 closure review result is the
byte-identical blob preserved at the source snapshot.

## C. Proposed tuple and historical-evidence boundary

Independently reproduce the proposed tuple:

- Node `24.19.0`;
- V8 `13.6.233.17-node.51`;
- `linux` / `x64`;
- executable SHA-256
  `bc17c508ffeed0ec622934f9b7fa72f8e78da65350e63c3eceb56fa688aa5e12`.

Confirm from the historical Section H records that this exact executable and tuple
were exercised and that the entry function had recorded optimized-tier evidence.
Then confirm the new checkpoint still classifies those records as historical and
does not treat them as current Group 2 admission evidence or as an allowlist.

## D. Controlled-process enforcement

Run the compiled exact-head candidate with the declared read-only process grants.
Independently confirm all of the following:

1. `--permission`, `--no-addons`,
   `--disallow-code-generation-from-strings`, and `--frozen-intrinsics` are each
   present exactly once.
2. Exactly two non-wildcard filesystem-read grants exist: the compiled candidate
   tree and exact runtime executable.
3. Addon, child-process, worker, WASI, inspector, and filesystem-write permissions
   are denied.
4. Math, Array prototype, and Object prototype are frozen; `Math.sqrt` is not
   writable or configurable.
5. All binary64 sentinels pass before and after evaluation.
6. An ordinary process, a wrong tuple, a wrong executable digest, a missing or
   duplicate flag, a wildcard read grant, any forbidden permission grant, a mutable
   intrinsic, or a failed sentinel refuses without a support claim.

Attempt actual addon, worker, child-process, WASI, inspector, filesystem-write, and
intrinsic-mutation operations where the environment permits a safe probe. Record
whether refusal occurs at the Node permission boundary, candidate guard, or both.

## E. Group 2 composition and same-invocation binding

For each accepted evidence case, independently verify that:

- the environment report before and after evaluation is identical;
- the candidate calls the selected Group 2 evaluator and re-verifies its envelope;
- Group 2's G4, tail, confidence-interval, truth, projection, and resource checks
  remain unchanged;
- the outer full-trace digest and all nested digests recompute from the retained
  bytes;
- both table hashes and the Group 1 resource envelope match the closed selections;
  and
- all public support, platform, domain, runtime, allowlist, profile-selection,
  admission-completeness, and Group 3 completion flags remain false.

Attack the composition with a different valid Group 2 envelope, a coherently
re-digested nested trace, a changed resource envelope, a changed table hash, a stale
environment report, and environment drift between the pre and post guard.

## F. Cold and optimized evidence

Inspect the exact-head workflow artifact. Recompute every file digest in the compiled
manifest. Confirm the cold process's first accepted call and the separate hot
process's post-warm-up calls use the same exact head, compiled bytes, tuple, and
controlled profile. Inspect the engine optimization trace and identify which named
candidate functions were optimized; do not infer deeper helper optimization without
evidence.

Recompute the six ordered case projections and their rollup independently. Cold and
hot rows must be byte-identical after excluding only the declared `execArgv`
mode difference. The case set must cover both scope ends, ordinary central and tail
branches, exact zero, and the confidence-interval collapse refusal. The collapse
case must remain a fail-closed Group 2 refusal.

## G. Validator and hostile-shape battery

Attack the checkpoint, environment validator, evaluator input, and evidence
validator with at least:

- missing, extra, reordered, duplicated, and retyped fields;
- wrong source commit/tree/path/blob or reordered bindings;
- runtime/V8/platform/architecture/executable changes;
- flag, permission, intrinsic, sentinel, mode, case, row, rollup, digest, table,
  resource, and commit changes;
- coherent recomputation after each meaningful mutation;
- `NaN`, infinities, negative zero, BigInt, functions, hidden properties, Symbols,
  accessors, sparse/extended arrays, throwing proxies, cycles, and non-plain
  prototypes; and
- every attempted selection, completion, support, issuance, or RFC promotion.

No caller getter may run, no exception may escape a public validation surface, and
accepted outputs must remain deeply frozen where the implementation promises it.

## H. Regression and hosted checks

Run the focused Group 3 and readiness tests, then the full repository check. If the
environment blocks the normal TSX IPC path, run the same stages through an IPC-free
entry and record the limitation. Verify every required hosted check on the exact
head, including the dedicated admission-evidence job.

## I. Non-promotion audit

Confirm directly from the exact head that all of the following remain false, null,
pending, unselected, or unissued as applicable: authoritative bounds; numerical
contract freeze; final table promotion; selected platform matrix; runtime allowlist;
selected controlled profile; completed admission evidence; selected
supported-execution predicate; supported domain/runtime; global truth-error
constants; comparison tolerances; final reason-code freeze; Public Check/bundle;
RFC #25 disposition; R2-D5; and Release 2.

The finite historical values 374 ULP, 2,978 ULP, 5,182 iterations, and 72,567 nodes
must remain observations rather than promoted bounds. The 100,000-node tail value
remains the already reviewed fail-closed design ceiling in Group 1, not a finite
corpus maximum.

## J. RFC boundary

Independently confirm that issue #25 and its public review window remain open and
that the earliest decision remains `2026-09-25T20:52:54Z`. This increment may be
reviewed and merged before that time only as non-authoritative development material.

## K. Result artifact

Report `BLOCKER`, `SHOULD-FIX`, and `NICE-TO-HAVE` counts. If the verdict is `GO`,
create a review commit whose sole parent is the exact reviewed head and whose only
addition is:

`review-inputs/r2-d5-group-3-supported-execution-admission-evidence/REVIEW-RESULT.md`

Record the review commit, parent, tree, result blob, neutral review branch, exact CI
runs, evidence artifact identities, and a PR comment bound to the exact head. Do not
merge the candidate.

## L. Verdict semantics

`GO` means only that the exact head safely implements non-authoritative evidence
infrastructure and may be considered for merge. Group 3 remains open. After merge
and byte-identical preservation of the review result, a later selection increment
may bind exact-head evidence and decide whether to select the one-tuple allowlist,
controlled profile, and supported-execution predicate. That later selection requires
its own exact-head independent review.
