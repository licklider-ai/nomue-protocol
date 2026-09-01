# R2-D5 Group 1 scope/resource closure integration adversarial review protocol

## A. Review objective

Independently determine whether the exact PR head closes only the non-authoritative
Group 1 candidate scope/resource selection after preserving its exact-head review,
without changing the reviewed numerical selection or promoting support, runtime,
platform, reason-code, authority, RFC, R2-D5, or Release 2 state.

This is a closure-synchronization review. It does not reselect pair/df scope or
resource limits and does not begin Group 2 selection.

## B. Exact identity and permitted delta

Review the exact PR head from a clean or equivalent isolated checkout. Record its
head, tree, parents, merge base, changed paths, and line delta. The expected base is
the review-preservation merge:

`8aac3c192b972d679308c230efc0cb3b4eff41cf`

The increment is limited to:

- maturity and review-binding fields in
  `candidate-supported-scope-resource-bounds-candidate.json`;
- the checkpoint's pinned canonical hash and focused adversarial test;
- the corresponding aggregate readiness fields, validator, and test;
- numerical README synchronization; and
- this protocol.

No corpus entry, numerical formula, selected pair/df value, selected resource value,
table cell, operation graph, trace evaluator, truth proof, projection rule, evidence
byte, prior durable review, authority input, registry, authoritative schema,
conformance fixture, Public Check, bundle, reference verifier dispatch, or Release 1
content may change.

## C. Review and preservation identity

Do not trust the new closure fields. Independently resolve and require:

- reviewed candidate head:
  `000705ccc3b29d3ef449c5c050e7dba4723a3cab`;
- reviewed candidate tree:
  `66446cb02e01adc23d55c45ee97c89b83179a8bb`;
- review commit:
  `b3ad38ea36ea66573033133ee94889508f72308f`;
- review commit sole parent: the exact reviewed candidate head above;
- review result path:
  `review-inputs/r2-d5-candidate-supported-scope-resource-bounds/REVIEW-RESULT.md`;
- review result Git blob:
  `18d3b6e42e3ce4eaf38a4583e89ab6b9f8405910`;
- preservation merge:
  `8aac3c192b972d679308c230efc0cb3b4eff41cf`; and
- the same result blob at the review commit, preservation head, preservation merge,
  this increment's base, and the exact PR head.

Read the complete preserved result. Require verdict `GO`, zero BLOCKER, zero
SHOULD-FIX, and zero NICE-TO-HAVE findings. Confirm that the result is bound only to
the reviewed candidate head and that it approves merge consideration of the
non-authoritative Group 1 selection, not support or runtime.

## D. Reviewed-selection invariance

Compare the closure checkpoint with the candidate reviewed at
`000705ccc3b29d3ef449c5c050e7dba4723a3cab`. Apart from maturity fields and the exact
review/preservation binding, require all reviewed content to remain identical.

In particular, independently require:

- pair count `2..201`;
- exact `df = n_pairs - 1` and df `1..200`;
- tail table hash
  `sha256:ba1f992199e9e153956589d62dcf5a6509575100bb7c923c170bfa45fdd76c08`;
- fixed-95 ordered-cell hash
  `sha256:24ccc86d7a49b9e1ef1e3fc9b038a5b8d338b8b5ca4a02492d8900d7e7dea3c0`;
- G4 maximum `1,008` from `5n + 3`;
- tail maximum `100,000` and cap `40df + 64`, maximum `8,064`;
- exactly three CI-specific primitive nodes;
- combined maximum `101,011`;
- the same operation-stage, same-trace truth, and strict projection predicates; and
- the same corpus hash
  `sha256:19349e5ed5e4ebbe582abe426a6024398940915da04f5c1085f797b4c82d46a7`.

The corpus file must be byte-identical to the reviewed candidate tree. The pure
resource-envelope evaluator must be byte-identical except for the checkpoint hash
pin in its containing module; no evaluation branch or result shape may change.

## E. Group 1 closure meaning

Require the checkpoint and readiness overlay to record:

- independent review complete;
- Group 1 complete;
- exact reviewed head/tree, result path/blob, and preservation merge; and
- candidate selection retained as non-authoritative and unissued.

`GROUP 1 CLOSED` means only that the candidate pair/df scope and primitive-trace
resource envelope have a preserved exact-head `GO` and are ready to serve as inputs
to Group 2 candidate work. It does not make those values authoritative supported
bounds and does not admit any input for runtime use.

## F. Aggregate readiness synchronization

Review `evidence-readiness.json`, its validator, and its focused tests. Require the
Group 1 object to bind exactly the values and identities in Sections C-E.

The validator must reject a pending or incomplete review state, a false Group 1
closure, any substituted head/tree/result/blob/preservation identity, any changed
selected value, any additional key, and every support/runtime promotion. Object-key
order remains non-semantic; array order and all values remain pinned.

All downstream states remain ordered as follows:

1. Group 2 runtime numerical contract and full-trace predicate is next and open;
2. supported-execution admission remains blocked by Group 2;
3. final reason-code inventory remains blocked by Groups 2 and 3; and
4. final R2-D5 review/disposition remains blocked by Groups 2-4 and the RFC window.

## G. Mandatory non-promotions

Require all of the following to remain false, null, empty, pending, unselected,
unfrozen, unissued, open, or incomplete as applicable:

- authoritative supported pair, df, value, intermediate, statistic, endpoint, or
  resource bounds;
- numerical-contract freeze;
- runtime graph/table/truth/projection selection;
- final Protocol fixed-95 table selection;
- platform/build/runtime allowlist;
- controlled-process enforcement;
- full supported-execution predicate;
- supported domain and runtime support;
- global Student-t or CI truth-error constants and comparison tolerances;
- final reason-code freeze;
- Public Check and supported bundle;
- RFC #25 closure;
- R2-D5 completion; and
- Release 2 completion.

The finite observations 374 ULP, 2,978 ULP, 5,182 iterations, and 72,567 tail nodes
remain non-bounds. The selected 100,000-node value remains an explicit pre-existing
fail-closed design ceiling, not a corpus maximum.

## H. Fail-closed attacks

Independently recompute the checkpoint canonical SHA-256 and compare it with the
validator pin. Attack at least:

- review verdict or finding counts;
- reviewed head, tree, review commit, review parent, result path, result blob, or
  preservation merge;
- independent review and Group 1 closure states;
- pair/df range or relation;
- either table hash;
- G4 formula/maximum, tail ceiling/cap, CI count, or combined sum;
- corpus hash or guarantee boundary;
- historical clarification;
- downstream dependency ordering;
- every mandatory non-promotion;
- undeclared keys or array entries; and
- NaN, Infinity, negative zero, BigInt, functions, hidden own properties, symbols,
  accessors, sparse or extended arrays, throwing proxies, cycles, and non-plain
  prototypes.

Exercise hostile shapes across the checkpoint validator, corpus validator, resource
evaluator, and aggregate readiness validator. Require zero caller-provided getter
invocations, no exception leak, and deterministic fail-closed results.

## I. Regression and authority invariance

Run at least:

```bash
pnpm install --frozen-lockfile
pnpm check
```

Also run the focused candidate-scope/resource and aggregate-readiness suites plus
reviewer-owned attacks for Sections C-H. If an execution-environment IPC restriction
blocks the wrapper, run every underlying stage through an IPC-free entrypoint and
require exact-head hosted CI to be green.

Confirm all pre-existing numerical implementations, corpus bytes, tables, evidence,
durable reviews, authority inputs, registries, authoritative schemas, conformance,
Public Checks, bundles, reference verifier dispatch, and Release 1 content are
byte-identical to the base, except for the explicitly permitted synchronization
paths.

## J. RFC boundary

Independently inspect issue #25. It must remain open, its public review window must
remain open, and the earliest decision timestamp must remain:

`2026-09-25T20:52:54Z`

or `2026-09-26T05:52:54+09:00`.

Group 1 closure does not close or shorten the RFC window.

## K. Verdict and durable result

Return exactly `GO` or `NO-GO`.

`GO` means only:

> The exact head correctly binds the preserved independent review and closes the
> non-authoritative Group 1 candidate scope/resource milestone without changing its
> reviewed numerical content or promoting support, runtime, platform, reason codes,
> authority, RFC, R2-D5, or Release 2 state.

Do not merge. If possible, retain the result on a neutral branch rooted at the exact
reviewed head by adding only:

`review-inputs/r2-d5-group-1-scope-resource-closure/REVIEW-RESULT.md`
