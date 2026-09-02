# R2-D5 Group 2 runtime numerical-contract closure independent review result

## Verdict

GO

The exact PR #138 head `ef62d8a047026eb7226a0fa38ef27dbd1a49b017` may be
considered for merge as the closure synchronization of the non-authoritative
R2-D5 Group 2 candidate runtime numerical-contract and full-trace-predicate
milestone. No BLOCKER, SHOULD-FIX, or NICE-TO-HAVE finding remains in this
bounded review.

Per the reviewed protocol, `GO` means only that the exact head correctly
binds the preserved independent numerical review and closes the
non-authoritative Group 2 candidate runtime numerical-contract and
full-trace-predicate milestone without changing its reviewed numerical
content or promoting numerical freeze, platform admission, support, runtime,
reason codes, authority, RFC, R2-D5, or Release 2 state. Any different head
requires a new independent exact-head review.

## 1. Exact identity and permitted delta (protocol B)

- Repository: `licklider-ai/nomue-protocol`
- PR: `#138` (branch `r2-d5/group-2-runtime-contract-closure`)
- Sole parent, base, and merge base:
  `b6bb348a22a25b82dfa940d39d017fe3c22859ff` (the Group 2 review-preservation
  merge required by protocol B)
- Reviewed head: `ef62d8a047026eb7226a0fa38ef27dbd1a49b017`
- Reviewed tree: `f86513452e1129058639abb9592f8de919a53c99`
- Structure: one ahead-only commit
- Delta: exactly 8 paths, `+390/-45`
- Review date: `2026-09-02` (UTC)

The live PR head was compared with the pinned head both before review began
and after all review work completed; it matched both times. The 8 paths are
limited to the Group 2 closure checkpoint JSON, the full-trace
evaluator/verifier module, its focused test, the aggregate readiness overlay
JSON/module/test, the closure review protocol, and the numerical README.
Zero paths changed under `authority/`, `registries/`, `schemas/`,
`conformance/`, `generated/`, `spec/`, `reference/`, `bindings/`,
`security/`, `evidence/`, `canonicalization/`, `examples/`, `mappings/`,
`review-inputs/`, or the table/evidence directories; no numerical formula,
component checkpoint, table byte, corpus, evidence byte, durable review,
authority input, registry, authoritative schema, conformance fixture, Public
Check, bundle, reference verifier dispatch, or Release 1 content changed.

## 2. Reviewer independence

This review was performed in a reviewer role in a separate working context
from the authoring context of the increment. No declared SHA, hash, verdict,
or count was trusted: the review/preservation chain was reconstructed from
Git commit, tree, and blob objects; every digest was recomputed from
serialized bytes with a separate SHA-256 implementation; and the numerical
content was re-verified against the same independent exact-rational oracle
used for the Group 2 selection review (arbitrary-precision integer rationals
with an independent binary64 bit decoder, an independent 2048-bit integer
square-root enclosure, and 400-bit regularized-incomplete-beta arithmetic),
re-run in full at this head. All review harnesses were temporary files
outside the repository; this result file is the review's only repository
artifact.

## 3. Review and preservation identity (protocol C)

All chain facts were independently resolved from Git objects, not from the
new closure fields, and all matched the protocol pins:

- reviewed candidate head `adea5c12d709350cbd8d4fbf918ea8344c111000` with
  tree `7d56ad8f8b97b4c0baef336716a1dfc97338d3ac`;
- candidate merge `acb2d967c8ad596ed32007f0e4091e138bf8f5eb` with parents
  `9d53f7b9ae2e6059eb8b6d9f1e3ca70002f8f24f` and the reviewed candidate head
  (second parent) and with the reviewed candidate tree as its tree;
- review commit `813ee3a7e33bacd8d772ca7b8e51e15ecbf695c8` whose sole parent
  is the exact reviewed candidate head and whose tree is
  `a63d1fc298cef54ac3a24d491c70ac2abe3c2511`;
- preservation head `801feb029687abd66f230a29fd468536a4b435f3` whose sole
  parent is the candidate merge and whose tree equals the review commit
  tree; and
- preservation merge `b6bb348a22a25b82dfa940d39d017fe3c22859ff` whose
  parents are the candidate merge and preservation head and whose tree
  equals the review commit tree.

The result blob
`fc4da85398eeda3220b0ae0f4401195db0228250` at
`review-inputs/r2-d5-group-2-runtime-numerical-contract/REVIEW-RESULT.md`
was resolved byte-identically at all five required locations: the review
commit, the preservation head, the preservation merge, this increment's
base, and the exact PR head. The preserved result was read in full: verdict
`GO` with zero BLOCKER, zero SHOULD-FIX, and zero NICE-TO-HAVE findings,
bound only to the reviewed candidate head, and approving merge consideration
of the non-authoritative Group 2 selection only — not numerical freeze,
supported execution, or runtime support.

## 4. Reviewed-selection invariance (protocol D)

The closure checkpoint was field-enumerated against the candidate blob at
`adea5c12d709350cbd8d4fbf918ea8344c111000` (which is byte-identical at the
increment's base). Exactly seven fields differ, all within the permitted
delta: the independent-review maturity (`complete`), the Group 2 closure
flag (`true`), the added exact `independent_review_binding` object (head,
tree, review commit, review parent, result path, result blob, preservation
merge — each equal to the independently resolved value in Section 3), and
the three downstream ordering strings (Group 3 next/open; reason-code
inventory blocked by Group 3; final R2-D5 disposition blocked by Groups 3-4
and the RFC window). All other reviewed content is identical, including all
26 source-snapshot path/blob/role bindings in their original order.

Independently re-required at this head: pair count `2..201` with exact
`df = n_pairs - 1` and df `1..200`; the same seven ordered operation-graph
stages with the one-input/one-G4-trace binding and all seven same-trace
bindings; tail table hash
`sha256:ba1f992199e9e153956589d62dcf5a6509575100bb7c923c170bfa45fdd76c08`
and fixed-95 ordered-cell hash
`sha256:24ccc86d7a49b9e1ef1e3fc9b038a5b8d338b8b5ca4a02492d8900d7e7dea3c0`,
both recomputed from the table file bytes (200 cells each), not from
declared values; the same exact-rational G4, tail, and confidence-interval
truth contracts; strict pointwise projection margins and the stage-specific
subnormal policy; exact binary64 operation-graph reproduction with null
generic and quantity-specific comparison tolerances; full-trace format
`paired-t-runtime-numerical-contract-full-trace-v1`; and resource values
G4 maximum `1,008`, tail maximum `100,000`, tail cap maximum `8,064`, three
confidence-interval-specific nodes, and combined maximum `101,011`.

The full-trace evaluator/verifier module is byte-identical to the reviewed
candidate tree except for the single checkpoint canonical hash pin line
(`sha256:72caa3e86b8eec0fb0c1f6ad21de9d8f480121f29e385ecec946c2dab39d3005`
replaced by
`sha256:934a81a940c6f30e4e19a1734618557237bcd0c6a6f3b2a28e8e90647e96bbe3`).
The independent exact-rational oracle was re-run in full at this head over
the 11-case reviewer corpus: 621 checks, zero mismatches, covering G4
algebra, fixed-95 cell/margin/endpoint/error-bound truth, in-cell `c*` and
p-value verification against the input-specific relative bounds, and the
complete digest chain including the tail line-protocol digest and the
`{format, link}` composition digest. Representative re-executions produced
the reviewed behavior: ordinary, exact-zero-statistic, scope-edge,
CI-collapse-refusal, coherent cross-input substitution, forged-p full
digest-chain replay, nested digest substitution, and resource-ceiling
boundary cases, with accepted outputs deep-frozen. The evaluator's
`group2Complete: false` result field is unchanged and correct: an
individual non-authoritative evaluation does not itself perform the
governance closure recorded by this checkpoint.

## 5. Group 2 closure meaning and readiness synchronization (protocols E, F)

The checkpoint and the aggregate readiness overlay record: independent
review complete; Group 1 still complete; Group 2 complete; the exact
reviewed head/tree, result path/blob, and preservation merge of Section 3;
and the candidate selection retained as non-authoritative and unissued. The
readiness Group 2 object binds exactly the Section C-E values with
exact-key and strict-equality pinning; object-key order is non-semantic
while array order and all values are pinned.

`GROUP 2 CLOSED` was verified to mean only that the candidate runtime
numerical graph, tables, truth/projection contract, resource envelope, and
full-trace predicate have a preserved exact-head `GO` and are ready as
inputs to Group 3 admission work. Downstream ordering is recorded as:
Group 3 supported-execution admission next and open; final reason-code
inventory blocked by Group 3; final R2-D5 review/disposition blocked by
Groups 3-4 and the RFC window.

## 6. Canonical hash and fail-closed attacks (protocol H)

The closure checkpoint's canonical SHA-256 was independently recomputed
from the file bytes with a separate implementation of the recursive
key-sorting canonical JSON recipe and equals the evaluator pin:
`sha256:934a81a940c6f30e4e19a1734618557237bcd0c6a6f3b2a28e8e90647e96bbe3`.

Reviewer-owned mutation and hostile-shape batteries were executed at this
head across the checkpoint validator, the full-trace envelope verifier, the
raw-input evaluator, component surfaces, and the aggregate readiness
validator: 185 genuine attacks (88 selection-era mutations that remain
attacks at the closed head, plus 97 closure-specific attacks covering
verdict/count forgery, every chain identity substitution, review-state and
closure demotion, Group 1 dependency, scope/graph/table/truth/projection/
format/resource mutations, downstream-ordering mutations, every mandatory
non-promotion, undeclared keys and array entries, and NaN/Infinity/negative
zero/BigInt/function/hidden-property/symbol/accessor/sparse-array/throwing-
proxy/cycle/non-plain-prototype shapes). All 185 were rejected
deterministically and fail-closed with zero caller-provided getter
invocations, zero exception leaks, and deep-frozen accepted outputs. Four
selection-era promotion mutations are no-ops at the closed head (they set
the now-true closure state) and were superseded by the closure battery's
demotion attacks; one null-root case was rejected via a direct validator
call after a harness-side coalescing artifact was identified and excluded.

## 7. Mandatory non-promotions (protocol G)

All Section G items were verified to remain false, null, empty, pending,
unselected, unfrozen, unissued, open, or incomplete as applicable:
authoritative supported bounds; authoritative or frozen runtime numerical
contract; final Protocol tail or fixed-95 table selection; platform/build/
runtime allowlist; controlled-process enforcement; full supported-execution
predicate; supported domain and runtime support; global Student-t or
confidence-interval truth-error constants and comparison tolerances; final
reason-code freeze; Public Check and supported bundle; RFC #25 closure;
R2-D5 completion; and Release 2 completion. The finite observations 374
ULP, 2,978 ULP, 5,182 iterations, and 72,567 tail nodes remain non-bounds,
and the selected 100,000-node value remains an explicit pre-existing
fail-closed design ceiling, not a corpus maximum.

## 8. Regression and authority invariance (protocol I)

`pnpm install --frozen-lockfile` succeeded. The `pnpm check` wrapper hit
the known execution-environment TSX IPC restriction, so every underlying
stage was run through an IPC-free entrypoint: 13/13 stages green, including
format check, Markdown lint, typecheck, `validate: OK` at the exact head
checkout, and the generated/Phase gates. Focused Group 2 closure, aggregate
readiness, and Group 1 suites were run directly. Two pre-existing heavy
tests exceeded their 30s/60s per-test timeouts in this review container
(which slowed measurably over the session); their behavioral content was
verified with timeout-free reviewer harnesses at this head — the heavy
witness (5,182 iterations; 8,064-byte cap path; 72,567 tail nodes), the
72,566-refuses/72,567-accepts tail edge, the 11/11 operation-stage boundary
replay, and the resource-ceiling acceptance — and exact-head hosted CI is
the gate per protocol I.

Exact-head hosted CI is green: run `33578479751` (Full check, 5/5 jobs),
run `33578479739`, and run `33578479735`, for 7/7 required checks on
`ef62d8a047026eb7226a0fa38ef27dbd1a49b017`.

Byte-identity to the base was confirmed for all pre-existing numerical
implementations (except the permitted checkpoint hash pin), component
checkpoints, source-snapshot bindings, tables, evidence, durable reviews,
authority inputs, registries, authoritative schemas, conformance, Public
Checks, bundles, reference verifier dispatch, and Release 1 content.

## 9. Synthetic merge against live `main`

`main` advanced during this review from
`0dc0739e57ca593f411a5b425c44541306df1e9c` (prompt time) to
`f705285d6a0251e8fe8d3bb24275063933d0387a` (live at review, re-confirmed at
review end), so the synthetic merge was recomputed against the live head: a
clean merge with no conflicts, merge tree
`68b65a311ccfc1f12abf8c90d3a5e47341dfd1e8`. All 8 PR paths in the merged
tree are byte-identical to the feature head and all 6 paths changed only on
`main` are byte-identical to `main`; there is no semantic conflict. On the
merged tree, typecheck passed and the focused Group 2/readiness/Group 1
suites passed 29/29. The repository validator on the merged-tree worktree
reported exactly two findings, both naming only the review workspace's
linked-worktree `.git` file and external `node_modules` symlink — the same
known review-environment artifacts documented in the earlier synthetic-merge
checks, with zero candidate-path findings; the validator is green at the
real exact-head checkout and inside hosted CI. This is a mergeability
verification only, not merge approval.

## 10. RFC boundary (protocol J)

Issue #25 was inspected live at review start and end: state open, public
review window OPEN, earliest decision timestamp
`2026-09-25T20:52:54Z` (`2026-09-26T05:52:54+09:00`) unchanged. Group 2
closure does not close or shorten the RFC window.

## 11. Binding

This result is bound to exactly
`ef62d8a047026eb7226a0fa38ef27dbd1a49b017` and approves merge consideration
of the Group 2 closure synchronization only. It does not merge the PR, does
not freeze the numerical contract, does not select a platform tuple or full
supported-execution predicate, does not freeze reason codes, and does not
change authority, RFC #25, R2-D5, or Release 2 state.
