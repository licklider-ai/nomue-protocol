# R2-D5 confidence-interval actual-execution trace adversarial review protocol

## Objective

Independently determine whether the exact candidate head correctly composes the already reviewed G4 paired-data trace with the exact reviewed fixed-95 critical-value table into one immutable, re-verifiable actual-execution trace for the confidence-interval endpoints.

Return exactly `GO` or `NO-GO`.

This review concerns execution identity only. It does not close mathematical truth for the CI endpoints, select support, activate runtime behavior, freeze final reason codes, complete R2-D5, or publish Release 2.

## A. Exact identity and scope

Record the exact base, review-input head, tree, parent list, changed paths, and line delta. The intended increment adds exactly:

1. `governance/drafts/release-2-candidate/numerical/ci-execution-trace-candidate.json`;
2. `tooling/src/spikes/paired-t-ci-execution-trace-candidate.ts`;
3. `tooling/tests/paired-t-ci-execution-trace-candidate.test.ts`; and
4. this protocol.

No pre-existing numerical implementation, G4 trace, selected table, readiness aggregate, authority surface, schema, registry, conformance fixture, Public Check, bundle, or Release 1 file should change.

## B. Required reviewed prerequisites

Resolve and inspect rather than trusting this protocol's summary:

- the reviewed G4 actual-execution trace implementation and durable review/close records;
- the reviewed G4 mathematical-truth candidate, while keeping that truth ledger separate from this execution review;
- the M3-A fixed-95 evidence review-sync artifact and durable `GO` result;
- the M3-B selected fixed-95 table candidate and durable `GO` result; and
- the exact binary64 primitive verifier from the reviewed supported-execution candidate.

The selected table must bind the reviewed ordered-cell content hash:

`sha256:24ccc86d7a49b9e1ef1e3fc9b038a5b8d338b8b5ca4a02492d8900d7e7dea3c0`.

Any missing or non-durable prerequisite is a blocker.

## C. Actual execution schedule

For each successful raw paired-observation input, independently verify that the candidate:

1. executes the existing G4 candidate from the raw closed input;
2. requires the returned nested G4 trace to pass `verifyPairedTG4ExecutionTraceCandidate`;
3. reads `mean_difference`, `standard_error`, and integer df only from that verified nested trace;
4. revalidates the exact selected fixed-95 table before lookup;
5. indexes the table only by exact integer df;
6. performs exactly three CI-specific binary64 operations in order:
   - `margin = critical_value * standard_error`;
   - `lower = mean_difference - margin`;
   - `upper = mean_difference + margin`;
7. verifies each recorded operation using the exact binary64 primitive verifier; and
8. returns endpoints only from the same independently verified CI trace.

The CI trace must bind the nested G4 trace, selected table hash, df, selected critical-value bits, all three operand-source declarations, operand bits, result bits, final endpoint bits, node count, and digest.

## D. Trace reconstruction attack

Starting from a valid trace, attack at minimum:

- a nested G4 node/result/outcome mutation with coherent outer digest repair;
- selected table content hash substitution;
- selected critical-value cell substitution;
- selected df substitution;
- margin operand or result mutation;
- lower/upper operand-source mutation;
- lower/upper result mutation;
- node omission, duplication, reordering, or relabeling;
- endpoint outcome mutation;
- node-count mutation; and
- outer digest substitution/rebuild after a semantic mutation.

The verifier must reconstruct the expected CI trace from the reverified nested G4 trace plus the exact selected table. It must not trust declared CI nodes or the declared digest as authority.

## E. Primitive and endpoint boundary attacks

Independently verify the exact binary64 result of each multiply/subtract/add operation for a representative corpus including:

- df=1, df=2, ordinary df, and df=200;
- positive and negative mean differences;
- interval crossing zero;
- large but finite values; and
- small standard errors near endpoint-collapse boundaries.

A non-finite margin or endpoint must fail closed. Finite endpoints that are not strictly distinct must return the candidate `confidence_interval_endpoint_collapse` refusal. No alternate method or interval construction may be selected.

Specifically reproduce a finite endpoint-collapse case where the G4 graph succeeds but both endpoint operations round to the same binary64 value. Confirm the candidate refuses rather than reporting a degenerate interval.

## F. Selected-table handoff

Independently compare every used critical-value cell against the M3-B selected table. Mutate the selected-table file or trace binding in reviewer-owned work and prove the candidate fails closed.

Evidence coverage `df=1..200` must not become a supported df maximum. A G4 execution outside the selected table evidence range must refuse rather than extrapolate, wrap, clamp, or use another quantile source.

## G. Same-trace result binding

Confirm the returned candidate result is decoded only from the verified trace's bound binary64 endpoint, margin, mean, SE, critical-value, and df fields. Mutate a returned value independently of the trace in reviewer-owned instrumentation and confirm no production path permits such decoupling.

Trace and result objects should be deeply frozen after successful evaluation.

## H. Mathematical-truth nonclaim

This increment must keep `confidenceIntervalEndpointTruthComplete = false` and the checkpoint's endpoint truth ledger `pending`.

The review must explicitly distinguish:

- exact reproduction of the selected binary64 table lookup and three binary64 endpoint operations; from
- mathematical endpoint truth, which must later compose G4 mean/SE truth bounds, the critical-value quantization term `<= 0.5 ULP`, and the multiply/add/subtract rounding effects.

Do not infer M3 closure from successful execution tracing.

## I. Hostile input and checkpoint battery

Attack exported checkpoint/trace validators with hidden own properties, symbol keys, accessors, sparse/extended arrays, throwing proxies, cycles, non-finite values, functions, and BigInt. Caller-provided getters must execute zero times and no hostile shape may leak an exception.

Also confirm upstream raw-input refusal remains a G4-stage refusal and does not trigger an alternate statistical procedure.

## J. Regression and authority

Run focused tests and full `pnpm check`. Inspect exact-head hosted CI and paired-t evidence workflows. Confirm Release 1 historical checks and authority guards remain green.

Confirm RFC #25 remains open and earliest decision remains `2026-09-25T20:52:54Z`.

## K. GO criteria

Return `GO` only if:

1. exact four-file add-only identity matches;
2. all reviewed prerequisites are independently resolved;
3. nested G4 and selected-table handoffs are reverified rather than trusted;
4. the three CI primitives are exact and same-trace bound;
5. coherent trace mutations are rejected;
6. non-finite and endpoint-collapse cases fail closed;
7. endpoint mathematical truth, support, runtime, and authority remain open;
8. hostile programmatic shapes fail closed; and
9. exact-head checks are green.

`GO` authorizes only merge consideration of the actual-execution trace candidate. Endpoint truth composition remains a separate M3-D increment.
