# R2-D5 G4-to-tail trace composition candidate — adversarial review protocol

## A. Review identity

Review the immutable PR head supplied in the review commission from a fresh clone or equivalent independent checkout. Record:

- implementation head SHA and tree;
- merge base SHA and tree;
- exact changed paths and statistics;
- runtime / architecture used for local reproduction;
- whether the PR head moved during review.

The implementation must remain a non-authoritative, unissued candidate under public review issue #25.

## B. Scope boundary

This increment is only a composition layer between two already reviewed execution-trace candidates:

1. `tooling/src/spikes/paired-t-g4-execution-trace-candidate.ts`
2. `tooling/src/spikes/paired-t-supported-execution-candidate.ts`

The reviewer must independently prove that the increment does not change either underlying implementation, the G4 reference graph, the inverse-beta table, the tail proof model, readiness state, authority, registries, schemas, conformance, Public Checks, bundles, or Release 1.

Do not reopen the already completed G4 F1/F2 review or the supported-execution review except where a composition defect depends on a concrete false assumption about their public interfaces.

## C. Raw-observation → G4 trace binding

For successful inputs, independently verify that:

- evaluation begins from the closed raw paired-observation surface;
- the returned G4 trace passes `verifyPairedTG4ExecutionTraceCandidate`;
- the G4 result is read from that verified trace;
- canonical observation insertion order does not change the G4 trace or the composed result;
- G4 refusal remains the first composed-stage failure and does not invoke or expose a successful tail stage.

Exercise ordinary, exact-zero-mean, boundary, hostile-shape, and refusal inputs.

## D. Exact G4 → tail handoff

The decision-bearing handoff must be exactly:

- `g4_trace.outcome.test_statistic_binary64_hex`
  = `tail_trace.input.test_statistic_binary64_hex`;
- `g4_trace.outcome.degrees_of_freedom`
  = `tail_trace.input.degrees_of_freedom`.

The composition link must also bind:

- G4 trace digest;
- tail trace digest;
- G4 test-statistic source sequence;
- G4 test-statistic bits;
- G4 df;
- tail input test-statistic bits;
- tail input df;
- tail p-value bits;
- tail p-value source sequence.

Independently construct trace-swap and link-rewrite attacks. Recompute the outer composition digest coherently. Any mismatch between the G4 handoff and the tail input must still fail closed.

A digest-only check is insufficient.

## E. Tail trace and returned p-value

For successful inputs, independently verify that:

- the tail trace passes `verifyPairedTExecutionTraceCandidate`;
- its first operation is bound to the exact handoff test-statistic bits;
- its reviewed inverse-beta table binding remains intact;
- the returned p-value bits equal the verified tail trace outcome;
- the p-value source sequence is preserved, including `null` for the exact-zero branch;
- the existing tail truth-error proof remains sourced from the same tail trace;
- this increment does not claim a G4 mathematical-truth error bound.

Compare composed outputs against direct calls to the two reviewed evaluators over a reviewer-selected deterministic corpus spanning multiple df values and tail branches.

## F. Composition envelope and mutation resistance

The outer composition verifier must be fail-closed for:

- missing or extra keys;
- accessor properties;
- inherited properties;
- symbol keys;
- custom prototypes;
- throwing proxies;
- malformed SHA-256 strings;
- malformed binary64 hexadecimal strings;
- altered G4 digest;
- altered tail digest;
- altered G4 source sequence;
- altered df;
- altered test-statistic bits;
- altered p-value bits or p-value source;
- swapped valid G4 or tail traces;
- stale outer digest;
- coherently recomputed outer digest after a false link mutation.

No caller accessor may be invoked during hostile-shape validation.

## G. First-failure and refusal separation

Verify at minimum:

- G4-stage refusals remain distinguishable from tail-stage refusals;
- tail-stage refusals do not become composition-verification failures;
- a genuine composition-link failure remains `composition_verification_failed`;
- no refusal path returns any support claim;
- no new public reason-code claim is implied.

This review does not freeze final Release 2 reason codes.

## H. Checkpoint and promotion attacks

The exact candidate checkpoint must accept only the committed unissued state.

Mutate and require rejection of at least:

- `runtime_support_enabled = true`;
- `supported_domain_claimed = true`;
- readiness admission promoted from held to admitted;
- independent-review closure fabricated;
- G4 truth bound fabricated complete;
- confidence-interval composition fabricated complete;
- supported resource bound selected;
- supported execution predicate selected;
- prohibited-claim removal;
- hidden extra support keys.

The checkpoint must contain hostile objects without throwing or invoking accessors.

## I. Readiness and authority invariance

Confirm byte-level invariance of:

- `governance/drafts/release-2-candidate/numerical/evidence-readiness.json`;
- `tooling/src/spikes/paired-t-numerical-readiness.ts`;
- authority inputs and snapshot;
- registries;
- authoritative schemas;
- conformance surfaces;
- Public Checks and bundles;
- Release 1 surfaces.

The composition checkpoint must explicitly state that readiness admission is held pending independent adversarial review.

Any hidden readiness, support, issuance, or authority promotion is a BLOCKER.

## J. Regression

From the pinned review head run at minimum:

```bash
pnpm install --frozen-lockfile
pnpm check
```

Confirm the focused composition tests and the existing G4 / supported-execution tests pass. CI may corroborate but must not substitute for semantic inspection.

## K. Findings and verdict

Use only:

- BLOCKER;
- SHOULD-FIX;
- NICE-TO-HAVE.

Return `GO` only if the composition is exact, fail-closed, non-authoritative, unissued, non-runtime, and free of BLOCKER findings.

`GO` means only that this implementation may be retained as an unissued non-authoritative composition candidate. It does not admit the candidate into `evidence-readiness.json` and does not approve:

- a G4 mathematical-truth error bound;
- confidence-interval composition;
- supported resource bounds;
- supported platform;
- supported execution predicate;
- supported domain;
- runtime support;
- final reason codes;
- Public Check;
- bundle;
- R2-D5 completion;
- RFC closure;
- Release 2.

If practical, store the independent result as the only new file on a neutral reviewer branch at:

`review-inputs/r2-d5-g4-tail-trace-composition-candidate/REVIEW-RESULT.md`
