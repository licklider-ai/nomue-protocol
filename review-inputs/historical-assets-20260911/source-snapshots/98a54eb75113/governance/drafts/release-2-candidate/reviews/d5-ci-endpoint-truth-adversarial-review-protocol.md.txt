# R2-D5 confidence-interval endpoint mathematical-truth adversarial review protocol

## Objective

Independently determine whether the exact candidate head correctly composes the
reviewed G4 mathematical-truth envelope, the reviewed selected fixed-95 critical
value cell, and the reviewed confidence-interval actual-execution trace into exact
rational truth intervals and absolute error bounds for the margin and both interval
endpoints.

Return exactly `GO` or `NO-GO`.

This review concerns the M3-D endpoint mathematical-truth candidate only. It does
not select support, activate runtime behavior, freeze final reason codes, complete
M3 or R2-D5, close RFC #25, or publish Release 2.

## A. Exact identity and scope

Record the exact base, review-input head, tree, parent list, changed paths, and line
delta. The intended increment adds exactly:

1. `governance/drafts/release-2-candidate/numerical/ci-endpoint-truth-candidate.json`;
2. `tooling/src/spikes/paired-t-ci-endpoint-truth-candidate.ts`;
3. `tooling/tests/paired-t-ci-endpoint-truth-candidate.test.ts`; and
4. this protocol.

No pre-existing G4, tail, fixed-table, CI execution, readiness, authority, schema,
registry, conformance, Public Check, bundle, verifier dispatch, or Release 1 file
should change.

## B. Required reviewed prerequisites

Resolve and inspect rather than trusting this protocol's summary:

- the durable G4 execution review and refusal-repair closure;
- the durable G4 mathematical-truth review and its exact-rational proof code;
- M3-A fixed-95 evidence review synchronization;
- M3-B exact 200-cell table selection and its durable review;
- M3-C confidence-interval execution trace and its durable independent review; and
- the exact selected-table ordered-cell content hash
  `sha256:24ccc86d7a49b9e1ef1e3fc9b038a5b8d338b8b5ca4a02492d8900d7e7dea3c0`.

Any missing prerequisite, unresolved blocker, or mismatch between the nested G4
trace in the two reviewed inputs is a blocker.

## C. Mathematical target

For each accepted input, independently identify:

- the exact mathematical paired-difference mean `mu` from the G4 truth proof;
- the strictly positive mathematical standard error `se` from the G4 truth
  interval;
- the mathematical fixed-95 Student-t critical value `c*` for exact integer df;
- the mathematical margin `m* = c* * se`; and
- the mathematical endpoints `L* = mu - m*` and `U* = mu + m*`.

The candidate may use intervals that conservatively enclose these targets. It must
not redefine the target as the binary64 execution result.

## D. Critical-value rounding cell

Independently verify for every reviewed df used by the reviewer corpus that the
candidate:

1. obtains the exact selected binary64 critical-value bits from the reverified
   M3-C trace;
2. resolves the immediately adjacent lower and upper finite binary64 values;
3. constructs exact rational midpoints between each neighbor and the selected
   cell;
4. uses those midpoints as conservative inclusive boundaries for the true
   correctly rounded critical value; and
5. records the maximum exact distance from the selected value to either boundary
   as its quantization-error upper bound.

Recompute these values independently from the raw binary64 bits. Do not use the
candidate's rational helper as the oracle. Attack df 1, df 2, an ordinary interior
df, and df 200.

The review must preserve the distinction between zero lookup/reproduction error for
the exact selected bytes and nonzero mathematical quantization error for `c*`.

## E. Interval composition

Using an independently implemented exact-rational interval oracle, verify:

1. `margin.lower = critical.lower * se.lower`;
2. `margin.upper = critical.upper * se.upper`;
3. `lower.lower = mean.lower - margin.upper`;
4. `lower.upper = mean.upper - margin.lower`;
5. `upper.lower = mean.lower + margin.lower`; and
6. `upper.upper = mean.upper + margin.upper`.

Confirm that both factors in the margin interval are strictly positive before the
two-corner product rule is used. Reversed, unnormalized, or zero-denominator
rationals must fail closed.

For margin and both endpoints, independently decode the trace-bound binary64 graph
value into its exact rational value and verify that the recorded absolute-error
upper bound is the maximum exact distance to the two truth-interval endpoints.

## F. Same-trace and same-proof binding

Confirm that the candidate:

- reverifies the complete M3-C trace;
- reverifies the complete G4 truth-error envelope;
- requires their nested G4 traces to be deeply identical;
- binds both nested digests and the selected table content hash;
- reconstructs the complete endpoint proof rather than trusting declared rational
  fields or the declared outer digest; and
- returns only a recursively frozen proof/envelope.

Execute the raw input through both prerequisite paths and confirm their G4 trace
bytes are identical for the reviewer corpus.

## G. Independent numerical corpus

Exercise at minimum:

- df 1, df 2, an ordinary df, and df 200;
- positive and negative mean differences;
- an interval crossing zero;
- large but finite accepted inputs;
- small but non-collapsed endpoint separation; and
- the known finite endpoint-collapse witness.

For successful cases, compare all critical, margin, lower, upper, and error-bound
rationals against an independent exact-rational implementation. The collapse
witness must remain an upstream M3-C refusal and must not acquire a truth proof for
an unreported interval.

Where practical, independently check the mathematical Student-t target against the
existing certified critical-value evidence. Do not infer support from evidence
coverage.

## H. Reconstruction attacks

Starting from a valid envelope, attack at minimum:

- the nested CI trace, including a coherent outer digest repair;
- the nested G4 truth interval, including nested and outer digest repair;
- G4 trace identity on only one nested path;
- selected table content hash, df, or critical-value bits;
- either critical rounding-cell boundary;
- critical quantization bound;
- margin truth interval or error bound;
- lower/upper truth interval or error bound;
- source sequence and graph-value bindings;
- finite-corpus/global-bound flags; and
- the outer digest after each semantic mutation.

Every semantic mutation must be rejected even when all attacker-controlled digests
are rebuilt.

## I. Hostile shape battery

Attack the envelope and checkpoint validators with hidden own properties, symbol
keys, accessors, sparse/extended arrays, throwing proxies, cycles, non-finite
values, functions, BigInt, unnormalized rationals, negative denominators, and zero
denominators. Caller-provided getters must execute zero times and no hostile shape
may leak an exception.

Also confirm upstream raw-input and endpoint-collapse refusals remain fail-closed
and do not select an alternate statistical procedure.

## J. Maturity and nonclaims

The unreviewed candidate must keep:

- endpoint truth implemented but independent review pending;
- `confidenceIntervalEndpointTruthIndependentlyReviewed = false`;
- `confidenceIntervalEndpointTruthComplete = false`;
- `endpoint_truth_bound_selected = false`;
- `finite_corpus_maximum_is_a_bound = false`;
- M3 open;
- supported df maximum null;
- supported platform pending;
- supported-execution predicate unselected;
- supported domain and runtime false;
- final reason codes unfrozen;
- Public Check/bundle unissued; and
- R2-D5 and Release 2 incomplete.

Any premature review, closure, support, authority, or global-bound promotion is a
blocker.

## K. Regression and public-review boundary

Run focused tests and full `pnpm check`. Inspect exact-head hosted CI and both
paired-t evidence workflows. Confirm Release 1 historical checks and authority
guards remain green.

Confirm RFC #25 remains open and earliest decision remains
`2026-09-25T20:52:54Z`.

## L. GO criteria

Return `GO` only if:

1. exact four-file add-only identity matches;
2. every reviewed prerequisite is durable and correctly bound;
3. the critical rounding cell is independently exact;
4. interval propagation is mathematically conservative and independently
   reproduced;
5. every graph-to-truth absolute bound is exact and covering;
6. same-trace reconstruction and coherent mutation attacks fail closed;
7. hostile programmatic shapes fail closed with zero getter execution;
8. review, M3, support, runtime, authority, and release states remain open; and
9. exact-head checks are green.

`GO` authorizes only merge consideration of the M3-D endpoint-truth candidate. A
later explicit M3 integration increment must record reviewed closure without
promoting support or R2-D5.
