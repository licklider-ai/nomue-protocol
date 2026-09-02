# R2-D5 Group 4 final reason-code inventory closure independent review result

## Verdict

GO

The exact PR #154 head `8909d31cce3d36303e403103f459b10127e87a1b` may be
considered for merge as the closure synchronization of the non-authoritative,
unissued R2-D5 Group 4 final reason-code inventory candidate milestone. No
BLOCKER, SHOULD-FIX, or NICE-TO-HAVE finding remains in this bounded review.

Per protocol section K, `GO` means only that the exact head correctly binds
the preserved independent review and closes the non-authoritative, unissued
Group 4 final reason-code inventory candidate milestone without changing
reviewed inventory behavior or promoting reason-code/Public Check issuance,
authoritative support, runtime, RFC, R2-D5, or Release 2 state. It opens
only the final R2-D5 review and disposition as the next ordered task, still
blocked by the RFC window. Any different head requires a new independent
exact-head review.

## 1. Exact identity and permitted delta (protocol B)

- Repository: `licklider-ai/nomue-protocol`
- PR: `#154` (branch `r2-d5/group-4-final-reason-code-inventory-closure`)
- Sole parent, base, and merge base:
  `3668fe95a0f2c5a7beaec70156d11bc523d4dc4e` (the #151 review-preservation
  merge; live `main` at review start and end)
- Reviewed head: `8909d31cce3d36303e403103f459b10127e87a1b`
- Reviewed tree: `33c7135f959f967395b0af9a70865b41e2d9f4bf`
- Structure: one ahead-only commit
- Delta: exactly the 9 declared paths, `+388/-43`; mergeable (clean)
- Review date: `2026-09-02` (UTC)

The live PR head was compared with the pinned head both before review began
and after all review work completed; it matched both times, and `main` did
not advance, so no synthetic merge was required. All nine changed paths were
read; they are limited to the closure checkpoint fields, the candidate
evaluator's hash pin, the readiness overlay JSON/module/tests, the focused
inventory test, and the two READMEs plus this protocol. `AGENTS.md`,
`CHARTER.md`, `AUTHORITY.md`, `governance/ID-POLICY.md`,
`governance/RFC.md`, and the `authority`, `registries`, `schemas`,
`conformance`, `generated`, `spec`, and `reference` trees are byte-identical
to the reviewed #151 head; no runtime numerical implementation, table byte,
durable review, or Groups 1–3 checkpoint changed.

## 2. Reviewer independence

This review was performed in a reviewer role in a separate working context
from the authoring context. No declared SHA, count, hash, or verdict was
trusted: the review/preservation chain was reconstructed from Git commit,
tree, and blob objects; the closure delta was enumerated field-by-field
against the checkpoint at the exact reviewed candidate head; and the
canonical hash was recomputed with a separate implementation. The bound
Group 4 review result originates from this reviewer role's own earlier
exact-head review of PR #151 and is consumed as a pinned repository
artifact, re-verified from Git objects. All harnesses were temporary files
outside the repository; this result file is the review's only repository
artifact.

## 3. Review and preservation identity (protocol C)

All chain facts were independently resolved from Git objects and match the
pins:

- reviewed candidate head `1a2802000b80ed795c51984bd88f89fc6be707a0` with
  tree `5dee78c6fc3585df467304c4cca821a75aac3421`;
- candidate merge `7c88fa2645af03d163513f84887f3b609ea037f4` with parents
  `005d902635e98bbcfaf5caa0ade4c48204cb4851` and the reviewed candidate
  head, and with the reviewed candidate tree as its tree;
- review commit `ed462eea1d149eefd5da3a971c76d9424430dbce` whose sole
  parent is the exact reviewed candidate head and whose tree is
  `9b331c946ec249cda192d304eb7ab6ff9445a6d1`;
- preservation head `3566b433619a9ee9c260430de4a7030e0edadf36` whose sole
  parent is the candidate merge and whose only change over it is the added
  result file; and
- preservation merge `3668fe95a0f2c5a7beaec70156d11bc523d4dc4e` whose
  parents are the candidate merge and preservation head, whose tree equals
  the review commit tree, and which likewise adds only the result file.

The result blob `2b99afe46b953f56a398a5dd5ed333be13e57718` at
`review-inputs/r2-d5-group-4-final-reason-code-inventory/REVIEW-RESULT.md`
is byte-identical at the review commit, preservation head, preservation
merge, this increment's base, and the exact PR head. The preserved result
was read in full: verdict `GO` with zero BLOCKER, zero SHOULD-FIX, and zero
NICE-TO-HAVE findings, bound only to the reviewed candidate head, and
approving merge consideration only for the non-authoritative, unissued
Group 4 candidate inventory.

## 4. Reviewed inventory invariance (protocol D)

The closure checkpoint was field-enumerated against the checkpoint at the
exact reviewed candidate head: exactly five changed scalar fields (the
decision state, independent-review maturity, Group 4 closure flag, and the
two downstream-ordering strings — the next open group becomes the final
R2-D5 review and disposition, blocked by the RFC window) plus the added
14-field `independent_review_binding` object, each value equal to the
independently resolved chain identity above; zero fields were removed and
nothing else changed. Exact preservation was verified for all 24
source-snapshot bindings and their order; the five candidate Public Checks
(order, keys, spellings, unissued state); the 4 record-level, 25
relationship, 11 operation-stage (still byte-equivalent to the predecessor
partial inventory), 12 declared-result, and 10-resolved/0-unresolved
support-dependent mapping groups; all runtime classification routing and
internal-only classifications; the registered internal verifier code with
its non-record attribution; all check-ownership rules; the RFC earliest
decision timestamp `2026-09-25T20:52:54Z`; and all non-promotions and
prohibited claims. The candidate evaluator differs from the reviewed
version by exactly one line — the canonical hash pin — so lookup behavior
and result shapes are unchanged.

The exact-checkpoint lookup surface was re-exercised: known classifications
produce the same deep-frozen candidate routing results as at the reviewed
head (mapped codes, delegated routings, and internal-only dispositions all
verified, deterministic across repeated calls); unknown and
component-internal classifications still fail closed with `null` and no
fallback reason; and any checkpoint mutation — including a closure
demotion — disables lookup entirely.

## 5. Closure meaning and readiness synchronization (protocols E, F)

The checkpoint and readiness overlay record: independent review complete;
Groups 1–3 still complete only as reviewed non-authoritative candidate
milestones; Group 4 complete; the exact reviewed head/tree, result
path/blob, and preservation merge; and the selected inventory retained as
non-authoritative, unissued, and unfrozen. `GROUP 4 CLOSED` means only
that the complete candidate vocabulary for the selected Groups 1–3 surface
has a preserved exact-head `GO`; nothing is issued, frozen, or activated,
and no earlier candidate selection becomes Protocol authority. Downstream
ordering: the final R2-D5 review and disposition is the next open decision
group, blocked by the RFC window. Object-key order remains non-semantic;
array order and every value remain pinned.

## 6. Canonical digest and fail-closed attacks (protocol G)

The checkpoint's recursively key-sorted compact-JSON SHA-256 was
independently recomputed:
`sha256:8e63811f020a12447ca5bd0b345fdb19d16995539c7675d09f2110283fc2b143`,
matching the evaluator pin.

A reviewer-owned battery of 156 attacks ran across the checkpoint
validator, the lookup surface, and the aggregate readiness validator:
verdict and finding-count forgery; substitution of every chain identity
(reviewed head/tree, candidate merge, review commit/parent/tree, result
path/blob, preservation head/merge) in both the checkpoint binding and the
readiness overlay; independent-review and Group 4 closure demotion;
Groups 1–3 demotion; every source-snapshot commit/tree/path/blob/role and
binding-order change; Public Check order/key/spelling/state changes;
removal, addition, reordering, and coherent substitution across all six
mapping groups; reuse-state flips and spelling-collision attempts;
reintroduced deferred/null decisions; check-ownership changes;
delegate/mapped/internal boundary changes; an added lookup fallback for an
unknown classification; downstream reordering and an advanced RFC date; an
unblocked final disposition; every mandatory non-promotion; undeclared
keys; and the full hostile-shape suite (NaN, infinities, negative zero,
BigInt, functions, hidden own properties, Symbols, accessors,
sparse/extended arrays, throwing Proxies, cycles, non-plain prototypes,
and null/string/array roots). All 156 were rejected deterministically with
zero caller-getter invocations (three independent counters) and zero
exception leaks; accepted lookup outputs remain deep-frozen, and
checkpoint object-key reordering remains accepted while array order stays
pinned.

## 7. Regression and hosted checks (protocol I)

`pnpm install --frozen-lockfile` succeeded and the full `pnpm check`
wrapper completed every stage in this environment (format, Markdown lint,
typecheck, `validate: OK`, full tests, generated, Phase 1, Phase 2A,
Phase 2A-021). The full Vitest suite is 54 files / 511 tests, all passing
locally at the exact head, and the focused Group 4 inventory,
aggregate-readiness, Group 3 supported-execution selection, Group 2
full-trace, and Group 1 scope/resource suites pass 55/55 with no
environment caveat.

Hosted checks on the exact head are 9/9 green: CI run `33608281969` (5/5
jobs — Full check Linux x64, Full check Linux x64 Node 24, and Phase 1 +
2A on Linux arm64, macOS arm64, and Windows x64), paired-t candidate
evidence `33608281954`, runtime-series evidence `33608281963`,
supported-execution admission evidence `33608281967`, and
supported-execution selection evidence `33608281947`; every run reports
the exact head `8909d31cce3d36303e403103f459b10127e87a1b` as its head SHA.

## 8. Mandatory non-promotions and RFC (protocols H, J)

All Section H items remain unpromoted at the exact head: authoritative
supported bounds; authoritative or frozen runtime numerical contract;
final Protocol tail and fixed-95 table selection; authoritative
platform/build/runtime allowlist; authoritative controlled-process
profile; authoritative supported-execution predicate; support for any
tuple beyond the single non-authoritative Group 3 candidate entry;
supported domain and runtime support; global truth-error constants and
comparison tolerances; final reason-code or Public Check freeze, issuance,
or activation; Public Check and supported bundle; RFC #25 closure; R2-D5
completion; and Release 2 completion. The finite observations 374 ULP,
2,978 ULP, 5,182 iterations, and 72,567 tail nodes remain non-bounds, and
the 100,000-node value remains the existing fail-closed design ceiling.
Issue #25 was inspected live during the review: open, public review window
OPEN, earliest decision `2026-09-25T20:52:54Z`
(`2026-09-26T05:52:54+09:00`) unchanged; Group 4 closure neither shortens
the window nor authorizes an early final R2-D5 disposition.

## 9. Binding

This result is bound to exactly
`8909d31cce3d36303e403103f459b10127e87a1b` and approves merge consideration
of the Group 4 closure synchronization only. It does not merge the PR, does
not issue, freeze, or activate any reason code or Public Check, and does
not change authority, RFC #25, R2-D5, or Release 2 state. After merge and
byte-identical preservation of this result, the next ordered task is the
final R2-D5 review and disposition, which remains blocked until the RFC
earliest-decision time and requires its own separately reviewed
increments.
