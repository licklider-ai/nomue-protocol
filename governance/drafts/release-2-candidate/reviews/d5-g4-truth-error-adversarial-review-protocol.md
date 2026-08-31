# R2-D5 G4 mathematical-truth error candidate — adversarial review protocol

Status: **fixed review protocol for the unissued, non-authoritative implementation candidate only**.

This protocol does not authorize readiness admission, support selection, R2-D5 completion, RFC closure, or Release 2.

## A. Identity and delta

Independently pin the review-input commit in a fresh clone or equivalent detached checkout.

Expected implementation increment:

1. `tooling/src/spikes/paired-t-g4-truth-error-candidate.ts`
2. `tooling/tests/paired-t-g4-truth-error-candidate.test.ts`
3. `governance/drafts/release-2-candidate/numerical/g4-truth-error-candidate.json`
4. `governance/drafts/release-2-candidate/reviews/d5-g4-truth-error-adversarial-review-protocol.md`

The base must be the merge of PR #64. The increment must be ahead-only and must not modify any existing file.

Any change to the reviewed G4 implementation, G4 checkpoint, readiness, authority, registries, schemas, conformance, Public Checks, bundles, or Release 1 is a BLOCKER.

## B. Scope boundary

The candidate may establish only a reviewable mathematical-truth error proof for the already reviewed G4 operation graph:

`trace-bound paired binary64 observations`
→ exact real paired differences
→ exact mean
→ exact sample variance
→ exact standard error
→ exact t statistic.

The proof may bind exact rational truth values or rigorous rational enclosures to the existing verified G4 trace.

It must not:

- replace or alter the G4 operation graph;
- select a quantity comparison tolerance;
- claim a supported pair/df/value domain;
- select a runtime/platform predicate;
- include Student-t tail truth;
- include confidence-interval endpoints;
- change runtime behavior;
- set readiness `mathematical_truth_error_bound_complete=true`;
- issue a Public Check or bundle;
- close R2-D5 or Release 2.

## C. Mathematical target definitions

Independently reconstruct the mathematical targets from the exact real values represented by the binary64 observations embedded in the verified G4 trace.

For canonical pairs `i = 1..n`:

- `d_i = first_i - second_i` exactly;
- `mean = sum(d_i) / n` exactly;
- `variance = sum((d_i - mean)^2) / (n - 1)` exactly;
- `SE = sqrt(variance / n)`;
- `t = mean / SE`.

The reviewer must confirm that the candidate does **not** define truth as the rounded G4 intermediates. In particular, variance truth must be centered on the exact mean, not the binary64 mean produced by the graph.

Test hand-computable cases and independently generated rational cases.

## D. Exact-rational arithmetic

Adversarially verify the rational implementation:

- sign normalization;
- denominator normalization;
- gcd reduction;
- addition/subtraction;
- multiplication;
- division;
- squaring;
- comparison and absolute value;
- finite binary64 → exact dyadic lifting.

Include positive, negative, zero, normal, subnormal, large-exponent, and cancellation-heavy values.

Any silent overflow through Number arithmetic in the truth ledger is a BLOCKER. Decision-bearing truth arithmetic must remain `BigInt`/exact rational.

## E. Standard-error square-root enclosure

The candidate uses an integer-square-root enclosure of the exact rational `variance / n`.

Independently verify that:

- the lower endpoint squared is `<=` the exact radicand;
- the upper endpoint squared is `>=` the exact radicand;
- exact-at-scale square roots may collapse to one endpoint;
- non-exact roots produce a non-empty rigorous interval;
- the configured precision is sufficient for every successful G4 input in the evaluation envelope;
- no host `Math.sqrt` result is used to define mathematical truth.

Probe minimum-positive scales, large scales, exact squares, and irrational square roots.

## F. Test-statistic enclosure and signs

Confirm interval division by the positive SE enclosure is directionally correct.

For positive mean:
`mean / SE_upper <= t <= mean / SE_lower`.

For negative mean:
`mean / SE_lower <= t <= mean / SE_upper`.

For exact zero mean the truth interval must be exactly zero.

Construct positive, negative, and zero-mean witnesses.

## G. Error-bound meaning

For each difference, mean, variance, SE, and t, confirm:

- graph value is interpreted as its exact binary64 real value;
- `absolute_error_upper_bound` is at least the maximum distance from the graph value to both truth-interval endpoints;
- exact truth quantities may have zero error only when the graph value is exactly equal;
- finite corpus maxima are never promoted to a global bound;
- the result does not select a Protocol tolerance.

Where possible, compare the exact bound with independent high-precision calculations as corroboration only.

## H. Trace and provenance binding

The truth proof must be sourced only from a G4 trace that passes `verifyPairedTG4ExecutionTraceCandidate`.

Confirm exact binding of:

- G4 trace SHA-256;
- canonical pair IDs;
- exact trace-bound observation bits;
- each difference source sequence;
- mean source sequence;
- variance source sequence;
- SE source sequence;
- t source sequence;
- graph binary64 bits for every reported quantity.

The verifier must reconstruct the truth proof from the nested verified trace rather than trusting declared proof values.

## I. Coherent mutation attacks

Do not stop at stale-digest mutations.

At minimum:

1. mutate a truth rational and coherently recompute the outer envelope hash;
2. mutate an absolute-error bound and recompute the hash;
3. mutate a source sequence and recompute the hash;
4. mutate a graph-bit binding and recompute the hash;
5. mutate a nested G4 node, coherently recompute its trace hash, update the proof's trace hash, and recompute the outer hash;
6. substitute a different valid G4 trace while leaving any old proof field;
7. remove or add proof fields.

All relationship-false cases must be rejected.

A fully self-consistent envelope for a different embedded raw dataset is not itself an attack; the envelope is self-contained and does not claim identity to an external dataset unless separately pinned.

## J. Hostile shapes and immutability

Exercise the envelope verifier and checkpoint validator with:

- null and primitives;
- arrays;
- missing/extra keys;
- inherited-only data;
- symbol keys;
- accessors;
- throwing proxies;
- sparse arrays;
- cyclic objects;
- malformed SHA-256;
- malformed binary64 hex;
- overlong arrays.

Caller accessors must not be invoked and exceptions must not escape.

Successful envelope, nested trace, proof, quantity records, and arrays must be frozen against caller mutation.

## K. Refusal ordering

The truth evaluator must run the existing G4 evaluator first.

If G4 refuses, the result must remain a `g4_stage_refusal` carrying the existing G4 classification. It must not construct or expose a partial mathematical-truth proof.

Truth-proof construction or verification failures must remain distinct candidate-internal classifications.

No refusal may claim support/runtime.

## L. Checkpoint promotion attacks

The checkpoint must remain:

- `status = non_authoritative_candidate`;
- `issuance = unissued`;
- issue #25 bound;
- independent adversarial review pending;
- readiness admission held;
- G4 truth proof implemented but not reviewed;
- support/resource/execution selections unselected;
- runtime false;
- supported domain false.

Mutation-test every boundary above.

Fabricated review closure, readiness admission, truth completion, support/domain/runtime selection, tolerance selection, Public Check/bundle authority, R2-D5 completion, or Release 2 completion is a BLOCKER.

## M. Readiness and authority invariance

The implementation increment must not modify:

- `governance/drafts/release-2-candidate/numerical/evidence-readiness.json`;
- `tooling/src/spikes/paired-t-numerical-readiness.ts`;
- the existing G4 checkpoint;
- authority manifest inputs;
- registries;
- authoritative schemas;
- conformance;
- Public Checks;
- bundles;
- verifier authoritative dispatch;
- Release 1.

Issue #25 must remain OPEN and its earliest decision timestamp unchanged.

## N. Regression

From a fresh checkout run at least:

```bash
pnpm install --frozen-lockfile
pnpm check
```

Run the focused G4 execution-trace and G4 truth-error suites separately.

CI is corroboration, not a substitute for the independent semantic review.

## O. Finding rule

Findings must arise from this increment.

Do not reopen the already reviewed G4 trace graph, the Student-t tail, inverse-beta table, supported-platform research, or confidence-interval design unless this candidate makes a concrete incorrect assumption about their public interface.

Severity:

- **BLOCKER** — merge breaks mathematical containment, provenance, fail-closed behavior, or governance boundary.
- **SHOULD-FIX** — material correctness/reviewability defect worth repairing before merge.
- **NICE-TO-HAVE** — bounded improvement with no correctness or governance consequence.

## P. Verdict

Final verdict is exactly `GO` or `NO-GO`.

`GO` means only:

> The G4 mathematical-truth error implementation may be retained/merged as an unissued, non-authoritative candidate pending separate readiness synchronization.

`GO` does **not** mean the G4 truth error is admitted as complete in readiness.

Mandatory non-claims after GO:

- G4 mathematical-truth error readiness closure;
- Student-t tail numerical closure;
- confidence-interval composition;
- supported resource bounds;
- supported platform/execution predicate/domain;
- runtime support;
- final tolerances/reason codes;
- Public Check/bundle;
- R2-D5 completion;
- RFC closure;
- Release 2.

## Q. Reviewer artifact

Prefer a neutral reviewer branch based exactly on the reviewed head.

Write only:

`review-inputs/r2-d5-g4-truth-error-candidate/REVIEW-RESULT.md`

The reviewer branch must not modify implementation, tests, checkpoint, readiness, governance, or authority.
