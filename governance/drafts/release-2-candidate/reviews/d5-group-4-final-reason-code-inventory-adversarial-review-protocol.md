# R2-D5 Group 4 Final Reason-Code Inventory Candidate Independent Review Protocol

## A. Scope and verdict boundary

Review the exact pull-request head that introduces the non-authoritative Group 4
reason-code inventory candidate. A `GO` permits merge consideration for that exact
candidate selection only. It does not issue or freeze a reason code or Public Check,
select a supported domain/runtime, dispose RFC #25, close R2-D5, or complete Release 2.

Report `BLOCKER`, `SHOULD-FIX`, and `NICE-TO-HAVE` counts and bind the verdict to the
reviewed commit, parent, tree, paths, line delta, and live pull-request head.

## B. Exact identity and permitted delta

1. Confirm the live head at review start and end.
2. Confirm a single ahead-only commit from its declared base and source-snapshot
   tree.
3. Read every changed file and reject changes outside the candidate inventory,
   validator, tests, aggregate readiness overlay, candidate READMEs, and this
   protocol.
4. Confirm no change under `authority/`, `registries/`, `schemas/`, `spec/`,
   `reference/`, `conformance/`, or `generated/`.

## C. Source and durable-review reconstruction

Resolve every `source_snapshot.bindings` entry from Git objects without trusting its
declared blob. Confirm the exact source commit/tree and reconstruct:

- the preserved `GO` review for the partial 11-code operation-stage inventory;
- the preserved exact-head `GO` closure reviews for Groups 1, 2, and 3;
- the candidate identifier/check order, profile schema, fixture manifest, source
  relationship classifications, runtime evaluators, and current registries.

Confirm Groups 1–3 are closed only as non-authoritative candidate milestones.

## D. Preservation of the reviewed partial inventory

Compare all 11 retained operation-stage entries against
`runtime-input-reason-code-candidate.json`. Require exact equality of order,
ordinals, source errors, failure classes, readiness keys, spellings, check ownership,
and `candidate_unissued` state. Confirm the predecessor and its durable review are
unchanged.

## E. Completeness and ownership

Independently enumerate and compare:

1. all 25 relationship classifications emitted by
   `validatePairedCandidateRelationships`;
2. all declared result fields selected for recomputation comparison;
3. all 11 reviewed operation-stage failures;
4. all 10 formerly deferred support-dependent decisions;
5. all runtime-wrapper classifications, including delegated and internal-only
   failures; and
6. the five ordered unissued Public Check candidates.

For each public mapping, verify that the selected Check owns the semantics. Verify
that registered reuses exist with compatible meaning and that each new candidate
spelling does not collide with an issued registry entry. Treat internal verifier,
configuration, invariant, and malformed pre-check failures as non-record-caused.

## F. Resolution against closed Groups 1–3

Re-derive each of the ten support-dependent decisions from the closed candidates:

- df scope and trace/iteration resources from Group 1;
- truth-proof preconditions, input-specific truth bounds, strict projection margin,
  binary64 p-value projection, and CI endpoint collapse from Group 2; and
- exact-tuple/controlled-process supported-execution refusal from Group 3.

Confirm there are zero null or deferred entries. Confirm that this resolves candidate
vocabulary only and does not promote Group 1 bounds, Group 2 contracts/tables, or
Group 3 selection to authoritative support.

## G. Propagation and collision checks

Exercise the lookup surface for relationship, support-dependent, runtime-delegated,
resource, non-finite, and internal-only classifications. Unknown classifications
must fail closed. Verify that p-value mathematical underflow reuses the exact issued
underflow meaning, while candidate trace/iteration resource exhaustion does not
reuse the Phase 1 structural resource-limit code.

## H. Fail-closed and hostile-shape battery

Mutate, at minimum, source identities/blobs, Group closure states, check order,
mapping membership/order/value/state, all ten decisions, runtime routes, internal
classification boundaries, counts, downstream ordering, RFC date, and every
non-promotion. Exercise coherent substitutions where possible.

Across checkpoint validation and lookup, reject hidden own properties, Symbols,
accessors, sparse/extended arrays, throwing Proxies, cycles, custom prototypes,
`NaN`, infinities, negative zero, BigInt, functions, and non-object roots. Caller
getters must run zero times; exceptions must not escape; accepted results must be
deterministic. Object-key order is non-semantic, while array order and every value
are pinned.

## I. Non-promotions

Confirm all of the following remain false, null, pending, unissued, incomplete, or
otherwise unselected as declared: authoritative support bounds; frozen numerical
contract; final runtime tables; authoritative platform/runtime allowlist and
controlled-process profile; authoritative supported-execution predicate; supported
domain/runtime; global truth-error constants and comparison tolerances; frozen or
issued reason codes; Public Checks and bundle; RFC #25 disposition; R2-D5; and
Release 2. Finite observations remain non-bounds, and the 100,000-node value remains
the existing fail-closed design ceiling.

## J. Regression, CI, and governance

Run frozen installation, formatting, Markdown lint, typecheck, the focused inventory
and readiness suites, the full validation/test/generated/Phase gates, and all exact-
head hosted checks. Record any environment-only timeout separately and rerun the
affected test without changing the candidate. Confirm RFC #25 remains open and the
earliest disposition is no earlier than `2026-09-25T20:52:54Z`.

## K. Durable result

Write the English result only after completing A–J. It must record exact identity,
source/review reconstruction, coverage counts, collision and propagation results,
the ten independent resolutions, hostile-shape counts, getter/exception results,
regression/CI evidence, findings, verdict boundary, and all non-promotions.

Create a neutral review branch. The review commit must have the exact reviewed head
as its sole parent and add only:

`review-inputs/r2-d5-group-4-final-reason-code-inventory/REVIEW-RESULT.md`

Do not alter the candidate and do not merge it. Report the review commit and result
blob so the byte-identical preservation flow can follow Steward approval.
