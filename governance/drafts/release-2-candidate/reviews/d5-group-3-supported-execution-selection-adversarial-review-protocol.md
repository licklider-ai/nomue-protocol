# D5 Group 3 supported-execution selection adversarial-review protocol

## A. Exact-head identity and verdict boundary

Review the exact pull-request head, never a branch name. Record the live head at the
start and end, sole parent, merge base, commit count, tree, changed paths, line
delta, mergeability, and all hosted run identities. Stop if the head moves or the
declared delta is incomplete.

A `GO` permits merge consideration only for the exact head's non-authoritative,
one-entry Group 3 candidate selection. It does not authorize Group 3 closure before
review preservation, an authoritative allowlist or predicate, broad cross-platform
support, supported domain/runtime, reason-code freeze, Public Check/bundle issuance,
RFC disposition, R2-D5 completion, or Release 2 completion. Do not merge the
candidate during this review.

## B. Source and preserved-review reconstruction

Read `AGENTS.md`, this protocol, the selection checkpoint and evaluator, aggregate
readiness, Group 1 and Group 2 closure checkpoints/results, the Group 3
admission-evidence checkpoint/implementation/protocol/result, and every file in the
durable admission-evidence directory. Resolve all 14 source-snapshot bindings from
the declared source commit with Git object commands; do not trust the checkpoint's
declared blob values.

Reconstruct independently:

1. reviewed infrastructure head `5563bae511069cc3bc73a2e3db24d8448de9fe2a`,
   tree `1b256b4e7a969da61efb135f2c22a9166332e6d6`, and merge
   `4f48278bd50806bd16f62af4d1cc346321f7a1dc`;
2. review commit `e2274e8b844dcf08d5f4e0a8e14225528ac561bb` with the
   reviewed head as its sole parent and result blob
   `97bcc1ac0b59e56f84d997e83d10e43d3285933a` as its only added file;
3. preservation head `ff5834199b3393d3fa85294d0112213aa432aa25` and merge
   `3b4eab15bf3f5bb02819d27b4ab9e28bf2055f0b`; and
4. byte identity of the review result at the review commit, preservation head,
   preservation merge, source snapshot, and exact reviewed tree where applicable.

Read the preserved result in full. Confirm its `GO` and zero findings approve only
admission-evidence infrastructure and do not themselves make the new selection.

## C. Durable hosted-evidence binding

Independently SHA-256 and size-check `artifact-manifest.json` and each preserved
member: `cold.normalized.json`, `hot.normalized.json`, `compiled-sha256.txt`,
`hot-optimization-matches.txt`, and `validation.normalized.json`. Re-run the prior manifest
validator against candidate head `5563bae5...` and confirm the retained cold/hot
rows, exact tuple, controlled profile, Group 2 bits/digests, table hashes, resource
accounting, and rollup `a6274fb82627f0be78bc71a5e46e9641586cc8749a2c2a07de77adfddb5ddd4a`.

Confirm the normalization changed only hosted-runner absolute paths and their exact
read-grant spellings; numerical rows and all other environment facts must be
identical. The manifest must retain the source artifact's original cold/hot byte
sizes and SHA-256 values.

While the hosted artifact remains available, download run `33586026811`, artifact
ID `9830100535`; independently verify the ZIP SHA-256
`04d39b25d631ec6acc02d03d88a954d1302174f8e5790e5c6b755fdcb9af84b9`,
all preserved member bytes, and the unpreserved full optimization log SHA-256
`2d7d8ea382084ea04d3f0b19d7efa452f0dd6086a868ce0c29ab54904b4891b2`.
The artifact's 90-day retention must not be treated as the sole durable evidence.

## D. Candidate selection semantics

Recompute the checkpoint's key-sorted compact-JSON SHA-256 and compare it with the
evaluator pin. Confirm that exactly one candidate matrix entry is selected:

- Node `24.19.0` / V8 `13.6.233.17-node.51`;
- `linux` / `x64`;
- official executable SHA-256
  `bc17c508ffeed0ec622934f9b7fa72f8e78da65350e63c3eceb56fa688aa5e12`.

Confirm that candidate matrix, exact allowlist, controlled-process profile, and
supported-execution predicate selection flags are true only at the candidate layer.
“Every selected tuple has admission evidence” is quantified over this single-entry
candidate matrix. It must not imply evidence or support for an unlisted runtime,
version, engine, build, OS, or architecture.

Confirm review remains pending, Group 3 remains open, unlisted tuples refuse, and
all authoritative or public support fields remain false or unissued.

## E. Controlled-process and full-trace replay

Run the exact head with Node 24.19.0 and the pinned executable bytes. Establish the
exact controlled profile: one each of `--permission`, `--no-addons`,
`--disallow-code-generation-from-strings`, and `--frozen-intrinsics`; exactly two
non-wildcard read grants for the compiled tree and executable; no addon,
child-process, worker, WASI, inspector, or filesystem-write permission.

For each accepted case independently recompute raw-input evaluation, pre/post
environment identity, Group 2 envelope verification, all four retained digests,
both table hashes, endpoint and p-value bits, and Group 1 resource accounting. The
confidence-interval-collapse case must remain a fail-closed wrapper refusal with the
recorded upstream classifications. Confirm evaluator outputs are deeply frozen.

## F. Exact-head selection evidence

Inspect the exact-head hosted selection-evidence artifact. Recompute its compiled
file digest manifest and cold/hot projections. Require:

- six cases in the declared order;
- cold and hot rows byte-identical;
- environment identity except the single hot `--trace-opt` occurrence;
- candidate-selection projection true only for matrix, allowlist, profile,
  evidence completeness, predicate, and increment selection;
- independent review and Group 3 completion false;
- every authoritative/platform/domain/runtime support field false;
- exact numerical values equal to the preserved #141 evidence; and
- selection row rollup
  `a53970d7f00b5823b2e601faaafa6dd900b7cf69ab51b4896feba7433761be20`.

Inspect the hot optimization log and name only functions actually present in the
trace. Do not infer helper optimization. Confirm all dedicated hosted checks use the
exact reviewed head.

## G. Adversarial and coherent-mutation battery

Attack the checkpoint, aggregate readiness, selection evaluator input, durable
bundle validator, and new evidence validator with at least:

- source commit/tree/path/blob, review chain, artifact ID/hash/size, file hash, and
  preservation identity substitution;
- second matrix entry, changed tuple/build/profile, unlisted-tuple admission,
  missing or extra evidence, and broad-platform interpretation;
- selection demotion and premature review, Group 3, authoritative predicate,
  supported domain/runtime, reason-code, issuance, RFC, R2-D5, or Release 2
  promotion;
- mode, row order/value, case, rollup, p/endpoint bits, digest, table hash, resource,
  environment, flag, permission, intrinsic, sentinel, or exact-head changes;
- coherent row and rollup recomputation, cross-input trace transplantation, stale
  pre/post environment, and forged refusal ancestry; and
- missing/extra/retyped fields, `NaN`, infinities, negative zero, BigInt, function,
  hidden property, Symbol, accessor, sparse/extended array, throwing proxy, cycle,
  and non-plain prototype.

No caller getter may run and no exception may escape a public validation surface.
Object-key order may be non-semantic only where declared; array order and values
must remain pinned.

## H. Numerical and governance non-promotion

Diff the Group 1/2 numerical implementation and reviewed table bytes against their
closed reviewed trees. Confirm no numerical formula, rounding cell, truth/projection
bound, digest recipe, resource formula, table content, or reason-code behavior
changes in this selection increment.

Confirm authoritative bounds, numerical-contract freeze, final Protocol table
selection, authoritative platform/runtime/profile/predicate issuance, supported
domain/runtime, global truth-error constants, comparison tolerances, final reason
codes, Public Check/bundle, RFC #25, R2-D5, and Release 2 remain unpromoted. Values
374 ULP, 2,978 ULP, 5,182 iterations, and 72,567 nodes remain observations; 100,000
remains the reviewed fail-closed Group 1 design ceiling.

## I. Regression, merge simulation, and RFC

Run install with the frozen lockfile, focused Group 3/readiness tests, the dedicated
evidence validator, and the full repository check. If the environment blocks TSX IPC
or imposes a known heavy-test timeout, run the equivalent IPC-free or timeout-free
stages and distinguish environment limitations from candidate findings. Verify all
hosted checks on the exact head and perform a non-mutating synthetic merge against
live main.

Confirm issue #25 and its public review window remain open and earliest decision is
`2026-09-25T20:52:54Z`. This non-authoritative candidate may be reviewed before that
time; no early RFC disposition is authorized.

## J. Durable result

Report `BLOCKER`, `SHOULD-FIX`, and `NICE-TO-HAVE` counts. For `GO`, create a review
commit whose sole parent is the exact reviewed head and whose only addition is:

`review-inputs/r2-d5-group-3-supported-execution-selection/REVIEW-RESULT.md`

Record the review commit, parent, tree, result blob, neutral review branch, exact CI
runs, selection artifact identity, attack counts, getter count, and exact-head PR
comment. Do not merge the candidate.

## K. Verdict meaning and next state

`GO` means only that the exact head safely makes the non-authoritative one-entry
candidate selection and may be considered for merge. After steward approval, merge
it, preserve this result byte-identically, and create a separate closure-
synchronization increment. Only that later reviewed closure may close Group 3 and
open Group 4 reason-code finalization.
