# R2-D5 confidence-interval actual-execution trace independent review result

## Verdict

GO

The exact PR #100 final head `c571e8076a92ddd500309cf9702619feeb946b4c` may be merged as the M3-C non-authoritative confidence-interval actual-execution trace candidate. No outstanding BLOCKER, SHOULD-FIX, or NICE-TO-HAVE finding remains in this bounded review.

`GO` means only that execution identity from raw paired observations through the reviewed G4 trace, exact selected fixed-95 critical-value lookup, and the three CI-specific binary64 operations is review-closed. It does **not** close confidence-interval endpoint mathematical truth, select support, activate runtime behavior, freeze final reason codes, complete M3, complete R2-D5, close RFC #25, or complete Release 2.

## 1. Exact identity and scope

- Repository: `licklider-ai/nomue-protocol`
- PR: `#100`
- Original pinned base: `2d11edf5c1bf676d0cd1f3d663055b44ffc7752a`
- Review-input head: `c571e8076a92ddd500309cf9702619feeb946b4c`
- Review-input tree: `6e5f759b5279a3531171b6ce7e048ee93d6aa623`
- Structure: one direct-child commit from the exact pinned base
- Delta: exactly four added files, `+910/-0`

The four paths are:

1. `governance/drafts/release-2-candidate/numerical/ci-execution-trace-candidate.json`;
2. `tooling/src/spikes/paired-t-ci-execution-trace-candidate.ts`;
3. `tooling/tests/paired-t-ci-execution-trace-candidate.test.ts`; and
4. `governance/drafts/release-2-candidate/reviews/d5-ci-execution-trace-adversarial-review-protocol.md`.

No pre-existing G4 implementation, selected critical-value table, evidence generator, readiness aggregate, authority surface, registry, schema, conformance fixture, Public Check, bundle, verifier authoritative dispatch, or Release 1 file changes in this increment.

Main advanced after the pinned base only through unrelated FND-1 research/authority-index work. The changed paths between the pinned base and live main do not intersect these four M3-C paths. Exact-head PR CI also exercised the candidate on the current synthetic merge tree.

## 2. Pre-review repair history

Two classes of pre-review hygiene defect were found and repaired before this final head was frozen.

First, the initial implementation had two TypeScript annotation/narrowing errors. Second, once those were repaired and the full suite executed, the new test helper was found to violate the already reviewed G4 input contract: it declared `repeatedMeasurements: "none"` while reusing one experimental-unit ID for both observations in each pair. The G4 implementation correctly refused those intended success/collapse fixtures with `EXPERIMENTAL_UNIT_DECLARATION_MISMATCH`.

The fixture was repaired to use distinct first/second experimental-unit IDs, preserving `repeatedMeasurements: "none"`. Repository-pinned Prettier was applied. Temporary materializer PR #101 completed `pnpm check`, reconstructed the feature tree from the original pinned base with only the four M3-C files, and was closed unmerged. Because a workflow-token branch update yielded `action_required` workflow records, the exact same repaired tree was re-attached to the same pinned parent through connector-side commit creation, producing the final review head above and normal exact-head CI.

These repairs changed no selected critical-value cell, CI formula, trace schedule, refusal meaning, checkpoint meaning, support state, or review protocol semantics.

## 3. Reviewed prerequisites

The review independently resolved the required durable prerequisites rather than trusting the new checkpoint summary.

### G4 actual-execution trace

The durable close-only result at `review-inputs/r2-d5-g4-execution-trace-repair-close/REVIEW-RESULT.md` records `CLOSED` for both original blockers F1 and F2. The accepted G4 implementation preserves the reviewed raw-input first-failure order, exact binary64 primitive execution, complete trace construction, and non-support boundary.

### G4 mathematical-truth candidate

The durable result at `review-inputs/r2-d5-g4-truth-error-candidate/REVIEW-RESULT.md` records `GO`, zero findings, and 568 reviewer checks with zero failures. That proof is deliberately separate from this execution review; it is an input to the later M3-D endpoint-truth composition.

### Fixed-95 critical-value evidence and selected table

M3-A's durable result records `GO`, integer df evidence coverage `1..200`, 200 independently reviewed cells, and ordered-cell content hash:

`sha256:24ccc86d7a49b9e1ef1e3fc9b038a5b8d338b8b5ca4a02492d8900d7e7dea3c0`.

M3-B's durable result records `GO` for selection of those exact reviewed 200 binary64 cells for non-authoritative candidate CI work only. It explicitly keeps supported df maximum null and endpoint mathematical truth open.

### Exact binary64 primitive verifier

M3-C reuses `validatePairedTBinary64PrimitiveCandidate` from the independently reviewed supported-execution candidate. It verifies the exact roundTiesToEven result for the recorded multiply/subtract/add operations and does not imply supported execution.

No required prerequisite is missing or non-durable.

## 4. Actual-execution schedule

For a successful raw paired-observation input the candidate performs the following fixed sequence:

1. call the existing G4 evaluator on the raw closed input;
2. require the returned nested G4 trace to pass `verifyPairedTG4ExecutionTraceCandidate`;
3. read mean difference, standard error, and integer df only from that verified trace;
4. parse and revalidate the exact M3-B selected-table checkpoint before lookup;
5. index only by the exact integer df;
6. execute `margin = critical_value * standard_error`;
7. execute `lower = mean_difference - margin`;
8. execute `upper = mean_difference + margin`;
9. verify all three recorded operations with the exact binary64 primitive verifier;
10. reconstruct the complete CI trace and digest; and
11. decode the returned result only from that verified trace.

The trace binds the complete nested G4 trace, selected table artifact/hash, df, exact selected critical-value bits, three ordered CI nodes, operand-source declarations, operand bits, result bits, endpoint outcome bits, node count, and outer digest.

## 5. Reconstruction and coherent mutation attacks

The production verifier does not trust declared CI nodes or a declared outer digest. It strict-copies the candidate, re-verifies the nested G4 trace, revalidates the selected table, reconstructs the expected three-operation CI trace, and accepts only deep-strict equality with that reconstruction.

The reviewer-only battery attacked, with outer digest repair where applicable:

- nested G4 node/result mutation plus coherent nested G4 digest rebuild;
- selected table content-hash substitution;
- selected critical-value cell substitution;
- selected df substitution;
- margin operand mutation;
- margin result mutation;
- lower/upper operand-source mutation;
- upper result mutation;
- node omission;
- node duplication;
- node reordering;
- node relabeling;
- endpoint outcome mutation;
- node-count mutation; and
- digest-only substitution.

Every attack was rejected. Coherent outer rehashing does not turn a semantic mutation into an accepted trace.

## 6. Boundary corpus and primitive checks

The reviewer-only corpus exercised:

- df = 1;
- df = 2;
- ordinary df = 30;
- df = 200;
- negative mean difference;
- a confidence interval crossing zero;
- large but finite input magnitudes; and
- the 201-pair small-standard-error endpoint-collapse witness.

For every successful corpus item the reviewer independently compared the selected critical-value bits with the committed M3-B selected table, re-ran the exact primitive verifier on all three CI nodes, checked that every returned numerical value encodes to the exact trace bits, checked finite distinct endpoints, and confirmed deep immutability of the successful trace/result.

The fixed reviewer battery completed 4/4 tests. The production M3-C focused suite independently completed 5/5 tests.

## 7. Endpoint-collapse and refusal behavior

The 201-pair witness alternating `1` and the next binary64 value above `1` reaches the G4 success path and then produces a CI whose finite endpoint operations do not yield strictly distinct binary64 endpoints. The M3-C evaluator returns:

`confidence_interval_endpoint_collapse`

rather than reporting a degenerate interval or choosing an alternate statistical procedure.

Non-finite CI intermediates likewise fail closed. An upstream raw-input refusal remains `g4_stage_refusal`; no alternate method, quantile source, or interval construction is selected.

## 8. Hostile-shape behavior

The production checkpoint tests and reviewer trace battery cover hidden own properties, symbol keys, accessors, sparse/extended arrays, throwing `ownKeys` proxies, cycles, non-finite values, functions, and BigInt.

All hostile shapes fail closed without an uncaught exception. The accessor attack executes the caller-provided getter zero times. Successful result and trace objects are deeply frozen.

## 9. Mathematical-truth boundary

This review closes execution identity only.

The candidate correctly keeps:

- `confidenceIntervalEndpointTruthComplete = false`;
- checkpoint `confidence_interval_endpoint_truth_ledger = "pending"`;
- `m3_closed = false`; and
- support/runtime/final reason-code selections open.

Exact reproduction of a selected binary64 critical-value lookup and three binary64 endpoint operations is not mathematical endpoint truth. The next M3-D increment must still compose at least:

- the reviewed G4 mean truth/error term;
- the reviewed G4 standard-error truth interval/error term;
- the correctly rounded critical-value quantization term `|t_c - t_*| <= 0.5 ULP(t_c)`; and
- the actual multiply and final add/subtract rounding effects from this exact trace.

No endpoint truth bound is inferred here.

## 10. Exact-head CI and regression

Exact review head `c571e8076a92ddd500309cf9702619feeb946b4c` completed:

- CI `33484812984`: **success**, 5/5 jobs;
- Release 2 paired-t candidate evidence `33484812980`: **success**; and
- Release 2 paired-t runtime-series candidate evidence `33484813053`: **success**.

Linux full check completed with **47 test files / 461 tests** passing. Formatting, markdown lint, TypeScript typecheck, repository validation, generated-file checks, authority checks, Release 1 historical checks, Phase 1/2A regression/conformance, M3-A/M3-B tests, G4 tests, supported-execution tests, and the production M3-C suite are green across the hosted runner matrix.

Reviewer-only PR #104 initially failed only because the newly added reviewer test file itself had not been Prettier-formatted. Candidate files were unchanged. A temporary reviewer workflow then formatted only that reviewer file in its workspace and completed the reviewer battery 4/4, production M3-C suite 5/5, and typecheck successfully. PR #104 was closed unmerged.

## 11. RFC and authority boundary

Live RFC issue #25 remains `OPEN` and its public review window remains `OPEN`. Earliest decision remains:

`2026-09-25T20:52:54Z` (`2026-09-26T05:52:54+09:00`).

M3-C is implementation/evidence work within the reviewed paired-t scope. It does not shorten or restart the public-review window and authorizes no permanent IDs, registered support, Public Check, supported bundle, R2-D5 closure, or authoritative Release 2 landing.

## 12. Findings

- BLOCKER: none.
- SHOULD-FIX: none.
- NICE-TO-HAVE: none.

## 13. Disposition

**GO.** The exact PR #100 head `c571e8076a92ddd500309cf9702619feeb946b4c` may merge as the independently reviewed M3-C confidence-interval actual-execution trace candidate.

The next numerical increment is M3-D confidence-interval endpoint mathematical-truth composition. M3 remains open until that separate truth ledger is independently closed; support-domain/resource/platform/execution/runtime and final reason-code decisions remain later work.
