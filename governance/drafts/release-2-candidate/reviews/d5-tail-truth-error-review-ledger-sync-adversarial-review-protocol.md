# R2-D5 tail truth-error review-ledger synchronization adversarial review protocol

## A. Identity gate

Use a fresh clone or equivalent detached checkout. Pin the actual PR head and confirm its merge base is the declared current `main` base.

Expected base for this increment:

`34b5362338de035e2891f1525b63d7b69157a22b`

The final increment must be ahead-only and limited to the explicit review-ledger synchronization paths. Any unrelated implementation, support, authority, or release change is a blocker.

## B. Scope boundary

This increment may only reconcile the already-completed independent review of the Student-t tail truth-error proof candidate with its stale machine-readable checkpoint and tests.

The mathematical implementation is not being selected for runtime support. The following must remain false, null, pending, or unselected as applicable:

- `truth_error_bound_selected`;
- `global_constant_truth_error_bound_selected`;
- `input_specific_bound_selected_for_runtime`;
- supported degrees-of-freedom maximum;
- supported platform matrix;
- supported execution predicate;
- supported domain;
- runtime support;
- final reason-code freeze;
- Public Check or bundle;
- R2-D5 completion;
- Release 2.

## C. Review-chain fidelity

Independently verify the underlying tail truth-error review chain from repository evidence rather than trusting the PR body.

Required identities:

- baseline: `6fad249dd715369de92c7c941a42ddcc34525381`;
- reviewed implementation: `2b9d3f40a1e067d85a8856585f597394d5f98761`;
- independent review result: `773b0eadf02618c74c11c7e215d9b7d5c1f75528`;
- repair: `84debc3f8af699fcb317ee9c9925186de20df12f`;
- PR #46 merge: `612d0b943e34b55d8bd8cfe284d8dcdfbd3820a2`;
- close-review input: `1234b8a256b01455c984f4ebcd35a45b8ab114a1`;
- close-review result: `8783491dbf168d177faa30238349d1c7fc9663af`;
- close-review verdict: `CLOSED`.

Read the bounded disposition in full:

`governance/drafts/release-2-candidate/reviews/d5-truth-error-support-closure-adversarial-review-disposition.md`

Confirm that it permits readiness to record `reviewed_candidate_proof` while explicitly leaving every bound-selection and support field unset.

## D. Checkpoint synchronization

Review:

`governance/drafts/release-2-candidate/numerical/truth-error-support-closure-candidate.json`

The stale review-pending ledger may advance only to an independently reviewed candidate-proof state. Confirm simultaneously that:

- status remains `non_authoritative_candidate`;
- issuance remains `unissued`;
- issue #25 remains the review issue;
- runtime support remains false;
- supported domain remains false;
- `truth_error_bound_selected` remains false;
- the finite-corpus maximum remains explicitly non-normative;
- supported df remains null;
- final reason codes remain unfrozen;
- global constant bound selection remains false;
- input-specific runtime-bound selection remains false; and
- every prohibited claim remains present and unchanged.

The checkpoint must not reinterpret the df 197 witness, the df 200 long-series case, or any finite corpus as a global or supported bound.

## E. Mathematical implementation invariance

Diff:

`tooling/src/spikes/paired-t-truth-error-support-candidate.ts`

Permitted changes are limited to:

- the exact expected checkpoint review-state strings or comments directly describing that state; and
- review-triggered hardening of the checkpoint canonicalizer so hidden own properties, symbol keys, accessor properties, sparse/extended arrays, throwing proxies, and cycles fail closed without invoking caller-provided accessors.

The canonicalizer hardening is a repair of the reviewer-owned battery finding discovered during this increment. It must remain confined to checkpoint-shape validation and must not alter numerical evaluation, proof construction, projection, or support selection.

The following must remain semantically unchanged:

- candidate input parser;
- table binding;
- runtime graph replay;
- roundoff gamma construction;
- square-root cell verification;
- series stopping and remainder proof;
- exact-rational bound arithmetic;
- ULP ceiling conversion;
- projection-margin calculation;
- refusal classifications and order;
- result p-value and proof fields;
- `truthErrorBoundSelected: false` in successful proof results;
- `runtimeSupportClaimed: false`;
- `supportedDomainClaimed: false`.

Any numerical, proof, projection, refusal, or result-semantics change is a blocker for this bounded synchronization review.

## F. Readiness invariance

Review current:

`governance/drafts/release-2-candidate/numerical/evidence-readiness.json`

This file already records the tail truth-error closure as `reviewed_candidate_proof` with the bounded disposition path. It should remain byte-identical in this increment unless an independently justified exact consistency repair is necessary.

Confirm that no readiness field selects a global bound, an input-specific runtime bound, supported df, supported domain, platform, execution predicate, or runtime support.

## G. Fail-closed promotion and demotion battery

Starting from the committed checkpoint, independently mutate at least the following and require rejection by `validatePairedTTruthErrorSupportCheckpoint`:

- status to authoritative;
- issuance to issued;
- runtime support to true;
- supported domain to true;
- `truth_error_bound_selected` to true;
- global constant bound selected to true;
- input-specific runtime bound selected to true;
- supported df from null to a number;
- platform matrix from pending to selected;
- final reason codes to frozen;
- remove or alter a prohibited claim;
- inject hidden support/runtime keys;
- revert the analytic review ledger back to pending.

Also exercise hostile non-JSON shapes, accessors, throwing proxies, symbol keys, and cycles. The validator must fail closed without leaking an exception or invoking caller-provided accessors.

The original reviewer-owned battery against the pre-repair synchronization head found one blocker: a non-enumerable hidden own property was ignored by the canonicalizer and the mutated checkpoint was accepted. The repaired head must close this finding and also demonstrate that symbol and accessor variants are rejected without invoking the accessor.

## H. Existing numerical regression

Run the existing truth-error/support candidate tests and confirm that all accepted numerical outputs and proof values are unchanged from the base.

At minimum recheck:

- df 197 witness: graph-to-truth distance 374 and candidate bound 2,978;
- df 200 long-series case: 5,182 iterations and an unselected candidate bound;
- exact-zero branch;
- proof-precondition refusals;
- projection-margin refusal;
- hostile input handling;
- distinct square-root counting.

The review must treat these as candidate evidence only, not as support-domain proof.

## I. Authority and RFC invariance

Confirm byte-level invariance of authority inputs, registries, authoritative schemas, conformance, issued identifiers, Public Checks, bundles, authoritative verifier dispatch, and Release 1 surfaces relative to the pinned current-main base.

Independently check GitHub issue #25. It must remain open and the public review window must remain open. The earliest decision remains:

`2026-09-25T20:52:54Z`

which is:

`2026-09-26T05:52:54+09:00`

## J. Repository regression

From the pinned review head run at least:

```bash
pnpm install --frozen-lockfile
pnpm check
```

Also run the focused truth-error/support candidate test suite and any reviewer-owned mutation battery needed to test Sections D through G.

CI may corroborate the result but does not replace semantic review.

## K. Finding rules

Findings must arise from this synchronization delta. Do not reopen the already-reviewed mathematical derivation merely because it is complex.

Use only:

- `BLOCKER` for incorrect review-state promotion, numerical implementation changes, fail-open behavior, authority/support leakage, or concrete regression;
- `SHOULD-FIX` for a materially inaccurate or unsafe synchronization that should be repaired before merge; and
- `NICE-TO-HAVE` only for a concrete improvement that does not affect correctness or scope.

## L. Verdict

Return exactly `GO` or `NO-GO`.

`GO` means only:

> The already-reviewed tail truth-error proof may be recorded in its checkpoint as an independently reviewed, unissued, non-authoritative candidate proof while all bound selection and support fields remain unset.

`GO` does not select the candidate bound for runtime use, close Student-t tail numerical selection, establish supported df/platform/domain/runtime, close CI work, complete R2-D5, close RFC #25, or complete Release 2.

## M. Reviewer artifact

If possible, create a neutral reviewer branch from the exact PR head and add only:

`review-inputs/r2-d5-tail-truth-error-review-ledger-sync/REVIEW-RESULT.md`

Do not modify implementation, checkpoint, readiness, protocol, authority, or tests from the reviewer branch.
