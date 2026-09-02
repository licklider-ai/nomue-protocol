# R2-D5 Group 4 final reason-code inventory closure integration adversarial review protocol

## A. Review objective

Independently determine whether the exact PR head closes only the
non-authoritative, unissued Group 4 final reason-code inventory candidate after
preserving its exact-head independent review. The closure must not change any
reviewed Public Check spelling, reason-code mapping, classification routing,
ownership rule, registry byte, Groups 1–3 input, or runtime numerical behavior.

This is a closure-synchronization review. It does not reselect, freeze, issue, or
activate any reason code or Public Check. It must not issue authoritative supported
bounds, numerical contracts, runtime tables, platform or runtime allowlists,
controlled-process profiles, supported-execution predicates, supported
domain/runtime, Public artifacts, an RFC disposition, R2-D5 completion, or Release 2
completion. It opens only the final R2-D5 review and disposition as the next ordered
task, still blocked by the RFC window.

## B. Exact identity and permitted delta

Review the exact PR head from a clean or equivalent isolated checkout. Record its
head, tree, sole parent, merge base, changed paths, and line delta. The expected base
is the review-preservation merge:

`3668fe95a0f2c5a7beaec70156d11bc523d4dc4e`

The increment is limited to exactly:

- maturity, exact review-binding, and downstream-ordering fields in
  `final-reason-code-inventory-candidate.json`;
- the candidate evaluator's canonical checkpoint hash pin;
- focused closure, binding, demotion, hostile-shape, and hash-pin tests;
- corresponding aggregate readiness fields, validator, and focused test;
- the candidate and numerical README synchronization; and
- this protocol.

No candidate Public Check, reason-code mapping, runtime routing, internal-only
classification, check ownership, count, source-snapshot binding, earlier durable
review, Groups 1–3 checkpoint, authority input, issued registry, candidate schema,
conformance fixture, runtime numerical implementation, table byte or hash, Public
Check, bundle, reference dispatch, Release 1 content, or RFC timestamp may change.
Except for the checkpoint hash pin, the final reason-code inventory evaluator and
lookup behavior and result shapes must remain unchanged.

## C. Review and preservation identity

Do not trust the new closure fields. Independently resolve and require:

- reviewed candidate head:
  `1a2802000b80ed795c51984bd88f89fc6be707a0`;
- reviewed candidate tree:
  `5dee78c6fc3585df467304c4cca821a75aac3421`;
- candidate merge:
  `7c88fa2645af03d163513f84887f3b609ea037f4`, whose parents are the candidate
  base and reviewed candidate head and whose tree is the reviewed candidate tree;
- review commit:
  `ed462eea1d149eefd5da3a971c76d9424430dbce`;
- review commit sole parent: the exact reviewed candidate head above;
- review commit tree:
  `9b331c946ec249cda192d304eb7ab6ff9445a6d1`;
- review result path:
  `review-inputs/r2-d5-group-4-final-reason-code-inventory/REVIEW-RESULT.md`;
- review result Git blob:
  `2b99afe46b953f56a398a5dd5ed333be13e57718`;
- preservation head:
  `3566b433619a9ee9c260430de4a7030e0edadf36`, whose sole parent is the candidate
  merge and which adds only the result path above;
- preservation merge:
  `3668fe95a0f2c5a7beaec70156d11bc523d4dc4e`, whose parents are the candidate
  merge and preservation head and whose tree is the review commit tree; and
- the same result blob at the review commit, preservation head, preservation merge,
  this increment's base, and the exact PR head.

Read the complete preserved result. Require verdict `GO`, zero BLOCKER, zero
SHOULD-FIX, and zero NICE-TO-HAVE findings. Confirm that the result is bound only to
the reviewed candidate head and approves merge consideration only for the
non-authoritative, unissued Group 4 candidate inventory.

## D. Reviewed inventory invariance

Compare the closure checkpoint with the checkpoint at the exact reviewed candidate
head. Apart from the decision state, independent-review and Group 4 closure flags,
the exact review/preservation binding, and the two downstream-ordering strings,
require every field and array to remain identical.

Independently require exact preservation of:

- all 24 source-snapshot bindings and their order;
- five candidate Public Checks and their order, keys, spelling, and unissued state;
- four record-level reason mappings;
- 25 relationship classifications and their mapping order;
- eleven reviewed operation-stage entries, byte-equivalent to the predecessor
  partial inventory;
- twelve declared-result comparison mappings;
- ten resolved and zero unresolved support-dependent decisions;
- all runtime classification routing and internal-only classifications;
- the registered internal verifier code and its non-record attribution;
- all check-ownership rules;
- the RFC earliest decision timestamp; and
- all non-promotions and prohibited claims.

Re-run the exact-checkpoint lookup surface. Known classifications must produce the
same deep-frozen candidate routing results, unknown and component-internal
classifications must still fail closed with `null`, and any checkpoint mutation
must disable lookup.

## E. Group 4 closure meaning

Require the checkpoint and aggregate readiness overlay to record:

- independent review complete;
- Groups 1, 2, and 3 still complete only as reviewed non-authoritative candidate
  milestones;
- Group 4 complete;
- exact reviewed head/tree, result path/blob, and preservation merge; and
- the selected inventory retained as non-authoritative, unissued, and unfrozen.

`GROUP 4 CLOSED` means only that the complete candidate vocabulary for the selected
Groups 1–3 surface has a preserved exact-head `GO`. It does not issue, freeze, or
activate reason codes or Public Checks and does not convert any earlier candidate
selection into Protocol authority.

## F. Aggregate readiness and ordering

Review `evidence-readiness.json`, its validator, and focused tests. Require the
Group 4 overlay to bind exactly the identities and values in Sections C–E. The
validator must reject a pending or incomplete review, false Group 4 closure,
substituted review identity, inventory count or mapping drift, issuance/freeze, or
support promotion.

All downstream states remain ordered as follows:

1. final R2-D5 review and disposition is the next open decision group; and
2. that disposition remains blocked by the RFC window.

Object-key order remains non-semantic. Array order and every value remain pinned.

## G. Canonical digest and fail-closed attacks

Independently recompute the recursively key-sorted compact-JSON checkpoint SHA-256.
Require it to equal the evaluator pin:

`sha256:8e63811f020a12447ca5bd0b345fdb19d16995539c7675d09f2110283fc2b143`

Attack at least:

- verdict and all finding counts;
- reviewed head/tree, candidate merge, review commit/parent/tree, result path/blob,
  preservation head, and preservation merge;
- independent-review or Group 4 closure demotion;
- Groups 1–3 dependency demotion;
- every source-snapshot commit/tree/path/blob/role and binding order;
- candidate Public Check order, key, spelling, or state;
- every record, relationship, operation-stage, declared-result, support-dependent,
  runtime-routing, and internal-only mapping group;
- registry reuse state, candidate spelling collision, count, and check ownership;
- reintroduction of deferred, null, or unowned decisions;
- delegate, mapped, and internal-only boundaries;
- lookup fallback for unknown or component-internal classifications;
- downstream ordering or an early RFC decision;
- every mandatory non-promotion;
- undeclared keys or array entries; and
- NaN, Infinity, negative zero, BigInt, functions, hidden own properties, symbols,
  accessors, sparse or extended arrays, throwing proxies, cycles, non-plain
  prototypes, and null/string/array roots.

Exercise hostile shapes across the checkpoint validator, lookup surface, and
aggregate readiness validator. Require zero caller-provided getter invocations, no
exception leak, deterministic fail-closed results, and deep-frozen accepted outputs.

## H. Mandatory non-promotions

Require all of the following to remain false, null, empty, pending, unselected,
unfrozen, unissued, open, or incomplete as applicable:

- authoritative supported pair, df, value, intermediate, statistic, endpoint, or
  resource bounds;
- authoritative or frozen runtime numerical contract;
- final Protocol tail or fixed-95 table selection;
- authoritative platform/build/runtime allowlist;
- authoritative controlled-process profile;
- authoritative supported-execution predicate;
- support for any tuple beyond the single non-authoritative Group 3 candidate entry;
- supported domain and runtime support;
- global Student-t or confidence-interval truth-error constants and comparison
  tolerances;
- final reason-code or Public Check freeze, issuance, or activation;
- Public Check and supported bundle;
- RFC #25 closure;
- R2-D5 completion; and
- Release 2 completion.

The finite observations 374 ULP, 2,978 ULP, 5,182 iterations, and 72,567 tail nodes
remain non-bounds. The 100,000-node value remains the existing fail-closed design
ceiling, not a corpus maximum.

## I. Regression and merged-tree checks

Run at least:

```bash
pnpm install --frozen-lockfile
pnpm check
```

Also run focused Group 4 inventory, aggregate-readiness, Group 3
supported-execution, Group 2 full-trace, and Group 1 resource suites plus
reviewer-owned identity and hostile-shape attacks.

If an execution-environment IPC or resource restriction blocks the wrapper, run
every underlying stage through an equivalent non-IPC entrypoint and require
exact-head hosted CI to be green. Confirm every path outside Section B is
byte-identical to the base. If main advances, construct a synthetic merge and repeat
typecheck and focused tests before the verdict.

## J. RFC boundary

Independently inspect issue #25. It must remain open, its public review window must
remain open, and the earliest decision timestamp must remain:

`2026-09-25T20:52:54Z`

or `2026-09-26T05:52:54+09:00`.

Group 4 closure does not close or shorten the RFC window and does not authorize an
early final R2-D5 disposition.

## K. Verdict and durable result

Return exactly `GO` or `NO-GO`.

`GO` means only:

> The exact head correctly binds the preserved independent review and closes the
> non-authoritative, unissued Group 4 final reason-code inventory candidate milestone
> without changing reviewed inventory behavior or promoting reason-code/Public
> Check issuance, authoritative support, runtime, RFC, R2-D5, or Release 2 state.

Do not merge. If possible, retain the result on a neutral branch rooted at the exact
reviewed head by adding only:

`review-inputs/r2-d5-group-4-final-reason-code-inventory-closure/REVIEW-RESULT.md`

Record the result commit, its sole parent, tree, result blob, changed paths, test and
CI evidence, hostile-shape counts, getter count, exception-leak count, and every
remaining non-promotion.
