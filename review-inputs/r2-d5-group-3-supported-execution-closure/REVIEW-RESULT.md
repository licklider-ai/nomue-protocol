# R2-D5 Group 3 supported-execution closure independent review result

## Verdict

GO

The exact PR #148 head `32549c855a3ecbdfb8761a617b1a3753cb7caa01` may be
considered for merge as the closure synchronization of the non-authoritative
R2-D5 Group 3 candidate supported-execution selection milestone. No BLOCKER,
SHOULD-FIX, or NICE-TO-HAVE finding remains in this bounded review.

Per protocol section K, `GO` means only that the exact head correctly binds
the preserved independent review and closes the non-authoritative one-entry
Group 3 supported-execution selection milestone without changing reviewed
selection behavior or promoting authoritative support, runtime, reason
codes, Public artifacts, RFC, R2-D5, or Release 2 state. It does not issue
an authoritative allowlist, controlled-process profile, or
supported-execution predicate, does not claim support for any tuple beyond
the single candidate entry, and opens the final reason-code inventory only
as the next ordered candidate task. Any different head requires a new
independent exact-head review.

## 1. Exact identity and permitted delta (protocol B)

- Repository: `licklider-ai/nomue-protocol`
- PR: `#148` (branch `r2-d5/group-3-supported-execution-closure`)
- Sole parent, base, and merge base:
  `7912c70d50e2206b518ad154fc869cc76de2c680` (the #143 review-preservation
  merge; live `main` at review start and end)
- Reviewed head: `32549c855a3ecbdfb8761a617b1a3753cb7caa01`
- Reviewed tree: `542a99e9bb0f3d9f77c1320e23a6b612a1165593`
- Structure: one ahead-only commit
- Delta: exactly the 10 declared paths, `+413/-39`; mergeable (clean)
- Review date: `2026-09-02` (UTC)

The live PR head was compared with the pinned head both before review began
and after all review work completed; it matched both times. The 10 paths are
limited to the closure checkpoint fields, the three Group 3 selection
runtime modules, the readiness overlay JSON/module and tests, the focused
selection test, the numerical README, and the closure review protocol.
`AGENTS.md`, `CHARTER.md`, `AUTHORITY.md`, `governance/ID-POLICY.md`,
`governance/RFC.md`, and the registries tree are byte-identical to the
previously reviewed state; no path outside the permitted delta changed.

## 2. Reviewer independence

This review was performed in a reviewer role in a separate working context
from the authoring context. No declared SHA, digest, verdict, or count was
trusted: the review/preservation chain was reconstructed from Git commit,
tree, and blob objects; the closure delta was enumerated field-by-field
against the checkpoint at the exact reviewed candidate head; the canonical
hash was recomputed with a separate implementation; and the controlled
evidence was re-collected end-to-end with the independently obtained
official Node executable. The bound selection review result originates from
this reviewer role's own earlier exact-head review of PR #143 and is
consumed as a pinned repository artifact, re-verified from Git objects. All
harnesses were temporary files outside the repository; this result file is
the review's only repository artifact.

## 3. Review and preservation identity (protocol C)

All chain facts were independently resolved from Git objects and match the
pins:

- reviewed candidate head `9e58eccb3cde54a4f653340d13170fbdf559b62b` with
  tree `fb83d6635e95d4bb50048bfcfb98bdbd835c5f28`;
- candidate merge `2e8a4100ca45c2b85d9a0adb2848ecff5fb64471` with the
  reviewed candidate head as its second parent;
- review commit `c5972d2d9550a6143544c95223c8c27fe0df7f95` whose sole
  parent is the exact reviewed candidate head and whose tree is
  `533d51773b0ab290a2115fe3e09e48b5bd28256f`;
- preservation head `0af9cad57c4918788b3a7d2ffda1e28fae2b3900` whose sole
  parent is the candidate merge and whose only change over it is the added
  result file; and
- preservation merge `7912c70d50e2206b518ad154fc869cc76de2c680` whose
  parents are the candidate merge and preservation head and which likewise
  adds only the result file over the candidate merge.

The result blob `ea0fa641af7d0a3dfd75af6bd2152025a47c4f68` at
`review-inputs/r2-d5-group-3-supported-execution-selection/REVIEW-RESULT.md`
is byte-identical at the review commit, preservation head, preservation
merge, this increment's base, and the exact PR head. Because the candidate
merged after unrelated research files reached `main`, the candidate-merge
tree does not equal the reviewed candidate tree; instead, all 18 of the
candidate's changed paths were verified byte-identical between the reviewed
head and the candidate merge (the candidate-merge tree also equals the
synthetic-merge tree this reviewer computed independently during the #143
review). The preserved result was read in full: verdict `GO` with zero
BLOCKER, zero SHOULD-FIX, and zero NICE-TO-HAVE findings, bound only to the
reviewed candidate head, and approving merge consideration only for the
non-authoritative one-entry Group 3 selection.

## 4. Reviewed selection invariance (protocol D)

The closure checkpoint was field-enumerated against the candidate reviewed
at `9e58eccb...`: exactly seven changed scalar fields (decision state,
independent-review maturity, Group 3 closure at both levels, review
maturity and result-preservation state, and the downstream ordering string
`blocked_by_group_4_and_rfc_window`) plus the added 14-field
`independent_review_binding` object, each value equal to the independently
resolved chain identity above; zero fields were removed and nothing else
changed. In particular the one-entry candidate matrix (Node 24.19.0 / V8
13.6.233.17-node.51 / linux / x64 / executable SHA-256 `bc17c508...aa5e12`),
the four required flags, the two exact read grants, the forbidden
capabilities, intrinsic identity checks, same-invocation environment and
full-trace reverification requirements, the Group 1/2 dependencies, the
source snapshot with its 14 bindings, the durable admission manifest
SHA-256 `sha256:2aef6ddd...cf42f2`, the six durable cases / 19 compiled
files / 145 retained optimization-match lines, the admission rollup
`a6274fb8...`, the selection rollup `a53970d7...`, unlisted-tuple refusal,
and `broad_cross_platform_support_claimed: false` are all unchanged.

The three Group 3 selection runtime modules (candidate evaluator, evidence
collector, evidence validator) each differ from the reviewed versions by
exactly one line: the checkpoint canonical hash pin, updated consistently
in all three to
`sha256:d1fd8bcbeeb6166c6ec23b0477fd1876be23e8e4c02dff79cdce135de3c8ce4d`,
which this review recomputed independently from the checkpoint bytes with a
separate key-sorted compact-JSON implementation. The Group 1/2 numerical
modules and both table files are blob-identical to their closed reviewed
trees.

Controlled cold and post-warm-up selection evidence was re-collected on the
exact PR head with the independently obtained official executable and the
exact profile: six cases; cold/hot rows byte-identical; rows byte-identical
to this reviewer's #143 controlled reproduction; selection rollup
`a53970d7...` unchanged; refusal lineage
`candidate_supported_execution_predicate_refusal` →
`group_2_full_trace_refusal` → `g4_tail_stage_refusal` unchanged; candidate
selection claims and false public support claims unchanged; the only
evidence-field change is the new checkpoint hash. The optimization trace
again names only `buildTrace`, `runDiagnosticSentinels`, and
`normalizeDyadic` (145 matched lines locally). The dedicated selection
validator (which also re-validates the durable #141 bundle) accepts the
reproduction against the exact head. The evaluator's
`selectionIndependentReviewComplete: false` and `group3Complete: false`
result fields are unchanged and correct: an individual candidate evaluation
does not perform the governance closure; the preserved review chain is the
closure authority.

## 5. Closure meaning and readiness synchronization (protocols E, F)

The checkpoint and readiness overlay record: independent review complete;
Groups 1 and 2 still complete; Group 3 complete; the exact reviewed
head/tree, result path/blob, and preservation merge; and the one-entry
selection retained as non-authoritative and unissued. `GROUP 3 CLOSED`
means only that the one-entry candidate matrix, controlled-process profile,
admission evidence, and candidate supported-execution predicate have a
preserved exact-head `GO`; nothing is issued as Protocol authority and no
supported inputs are admitted for runtime use. Downstream ordering: the
final reason-code inventory is the next open candidate task, and the final
R2-D5 review/disposition remains blocked by Group 4 and the RFC window.
Object-key order remains non-semantic; array order and values remain
pinned.

## 6. Fail-closed attacks (protocol H)

A reviewer-owned battery of 216 attacks ran across the six surfaces
(closure checkpoint validator, aggregate readiness validator, raw selection
evaluator input, admission/environment guard shapes, durable bundle
validator with mutated evidence copies, and the exact-head selection
evidence validator): verdict and finding-count forgery; substitution of
every chain identity (reviewed head/tree, candidate merge, review
commit/parent/tree, result path/blob, preservation head/merge) in both the
checkpoint binding and the readiness overlay; independent-review and
Group 3 closure demotion; a second matrix entry and every tuple/runtime/
engine/platform/architecture/executable-hash change; flag, grant, forbidden
capability, and intrinsic-check changes; durable manifest identity, count,
and rollup changes (including a coherent member re-hash inside the
manifest); Group 1/2 dependency demotion; refusal-lineage forgery;
downstream-ordering changes; every mandatory non-promotion; coherent
row-and-rollup recomputation and cross-input trace transplantation; stale
and drifted environments; undeclared keys and array entries; and the full
hostile-shape suite (NaN, infinities, negative zero, BigInt, functions,
hidden properties, Symbols, accessors, sparse/extended arrays, throwing
proxies, cycles, non-plain prototypes, and null/string/array roots). All
216 were rejected deterministically with zero caller-getter invocations
(four independent counters) and zero exception leaks; accepted evaluator
outputs remain deep-frozen, and checkpoint object-key reordering remains
accepted while array order stays pinned.

## 7. Regression and hosted checks (protocol I)

`pnpm install --frozen-lockfile` succeeded and the full `pnpm check`
wrapper completed every stage in this environment (format, Markdown lint,
typecheck, `validate: OK`, full tests, generated, Phase 1, Phase 2A,
Phase 2A-021). The full Vitest suite is 53 files / 499 tests, all passing
locally at the exact head, including the focused Group 3 selection,
admission, and readiness suites (35/35).

Hosted checks on the exact head are 9/9 green: CI run `33597248730` (5/5
jobs — Full check Linux x64, Full check Linux x64 Node 24, and Phase 1 + 2A
on Linux arm64, macOS arm64, and Windows x64), paired-t candidate evidence
`33597248719`, runtime-series evidence `33597248675`, supported-execution
admission evidence `33597248680`, and supported-execution selection
evidence `33597248726`; every run reports the exact head
`32549c855a3ecbdfb8761a617b1a3753cb7caa01` as its head SHA. `main` did not
advance during the review (it equals the PR base at start and end), so no
synthetic merge was required; the PR remains cleanly mergeable.

## 8. Mandatory non-promotions and RFC (protocols G, J)

All Section G items remain unpromoted at the exact head: authoritative
supported bounds; authoritative or frozen numerical contract; final
Protocol tail and fixed-95 table selection; authoritative
platform/build/runtime allowlist; authoritative controlled-process profile;
authoritative supported-execution predicate; support for any tuple beyond
the single candidate entry; supported domain and runtime support; global
truth-error constants and comparison tolerances (null); final reason-code
freeze; Public Check and supported bundle (unissued); RFC #25 (open);
R2-D5 and Release 2 (incomplete). The finite observations 374 ULP,
2,978 ULP, 5,182 iterations, and 72,567 tail nodes remain non-bounds, and
the 100,000-node value remains the pre-existing fail-closed design
ceiling. Issue #25 was inspected live during the review: open, public
review window OPEN, earliest decision `2026-09-25T20:52:54Z`
(`2026-09-26T05:52:54+09:00`) unchanged.

## 9. Binding

This result is bound to exactly
`32549c855a3ecbdfb8761a617b1a3753cb7caa01` and approves merge consideration
of the Group 3 closure synchronization only. It does not merge the PR, does
not issue any authoritative selection, and does not change authority,
RFC #25, R2-D5, or Release 2 state. The next ordered candidate task after
merge and byte-identical preservation of this result is the Group 4 final
reason-code inventory, which requires its own separately reviewed
increments.
