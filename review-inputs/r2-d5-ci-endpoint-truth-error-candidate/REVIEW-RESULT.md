# R2-D5 confidence-interval endpoint mathematical-truth independent review result

## Verdict

GO

The exact PR #108 final head `ba3d81e62f8f77884628c59c4b27d1c5ff3cb340` may be merged as the M3-D non-authoritative confidence-interval endpoint mathematical-truth candidate. No outstanding BLOCKER, SHOULD-FIX, or NICE-TO-HAVE finding remains in this bounded review.

`GO` means only that the candidate's same-trace exact-rational truth composition is defensible for the reviewed M3-C execution path and selected fixed-95 critical-value cells. It does not select a global confidence-interval error constant, Protocol support, a supported df maximum, a supported value/resource domain, a supported platform or execution profile, runtime activation, final reason codes, an authoritative Public Check or bundle, final R2-D5 disposition, RFC closure, or Release 2 completion.

## 1. Exact identity

- Repository: `licklider-ai/nomue-protocol`
- PR: `#108`
- Pinned base: `90e3ab6d086737b0ae754951c3e4f1b404b126be`
- Review-input head: `ba3d81e62f8f77884628c59c4b27d1c5ff3cb340`
- Review-input tree: `63777392e623fc1f0d5ea27a1494b5219b162dd0`
- Structure: one direct-child commit from the exact pinned base
- Delta: exactly four added files, `+1360/-0`

The four paths are the M3-D checkpoint, implementation, focused tests, and fixed adversarial-review protocol. No pre-existing numerical implementation, selected table, readiness aggregate, authority surface, schema, registry, conformance fixture, Public Check, bundle, verifier authoritative dispatch, or Release 1 file changes in this increment.

Live main remained the pinned base during final review, so there is no parallel-main path interaction to qualify.

## 2. Pre-review repair history

The first implementation required repository formatting. After formatting exposed the success paths to the full suite, a verifier-layer defect became visible: M3-D recursively canonicalized the complete outer envelope before passing the nested already-reviewed M3-C trace to the M3-C verifier. That changed nested object key order and therefore caused the exact M3-C trace reconstruction/digest check to reject an otherwise identical nested trace.

The bounded repair keeps the outer closed-JSON/hostile-shape validation but obtains the top-level own-data fields from the original candidate object, so the nested M3-C and G4 truth artifacts are handed unchanged to their existing reviewed verifiers. The repair changes no critical-value cell, mathematical interval, truth formula, error metric, checkpoint meaning, support state, or review protocol.

Temporary PR #109 performed the repair, repository-pinned Prettier, diagnostics, and full `pnpm check`, then rebuilt the exact repaired tree from the pinned base. It was not merged. The identical repaired tree was reattached connector-side to the same pinned base as the final review head above so normal exact-head CI could run.

## 3. Durable prerequisites

The review resolved the required durable base records rather than trusting the new checkpoint summary:

- G4 actual-execution repair: `CLOSED`;
- G4 mathematical-truth candidate: independently `GO`, with zero findings;
- fixed-95 200-cell evidence: independently reviewed;
- exact reviewed 200-cell fixed-95 table selected for candidate CI work only: independently `GO`;
- M3-C confidence-interval actual-execution trace: independently `GO`, with its review result durably preserved on the base.

Those prerequisite reviews retain their non-support and non-runtime boundaries.

## 4. Same-trace binding

For each successful M3-D evaluation the review confirmed:

- the nested M3-C trace passes its existing verifier;
- the nested G4 truth envelope passes its existing verifier;
- the entire G4 trace contained by M3-C is identical to the G4 trace contained by the G4 truth envelope;
- the M3-C trace digest, G4 truth-envelope digest, and G4 trace digest are bound into the outer proof;
- selected df equals the nested G4 df; and
- selected fixed-95 table content hash is exactly
  `sha256:24ccc86d7a49b9e1ef1e3fc9b038a5b8d338b8b5ca4a02492d8900d7e7dea3c0`.

Cross-dataset substitutions and nested-artifact substitutions were rejected after rebuilding the outer digest. A coherent outer rehash cannot make a mismatched M3-C/G4 truth pair acceptable.

## 5. Independent critical-value cell reconstruction

The independent Python `fractions.Fraction` oracle did not reuse the candidate's rational helpers. It reconstructed finite binary64 values directly from sign/exponent/fraction bits and independently checked all 200 selected critical-value cells.

It confirmed:

- exactly 200 cells;
- all cells positive finite;
- strict decrease with increasing integer df;
- ordered-cell content hash reproduced exactly as
  `sha256:24ccc86d7a49b9e1ef1e3fc9b038a5b8d338b8b5ca4a02492d8900d7e7dea3c0`;
- representative candidate envelopes at df 1, 2, 30, 100, and 200 bind the selected table cell for that df;
- predecessor and successor bits are the immediate positive finite binary64 neighbors;
- lower midpoint is exactly `(prev + q)/2`;
- upper midpoint is exactly `(q + next)/2`; and
- recorded critical-value quantization bound equals the larger exact rational distance from `q` to those two midpoints.

This is a conservative rounding-cell truth enclosure. It does not promote 200-cell evidence coverage into Protocol support.

## 6. Independent G4 truth reuse

For the reviewer corpus, the independent Fraction oracle reconstructed the exact mathematical mean from the raw binary64 differences and confirmed it lies within the reused reviewed G4 mean interval.

It independently reconstructed the exact sample-variance/n target and verified the reused reviewed G4 standard-error interval by exact rational squaring:

- `se_lower^2 <= exact_variance_over_n`; and
- `exact_variance_over_n <= se_upper^2`.

No M3-D narrowing of the reviewed G4 mean or standard-error truth intervals was observed.

## 7. Exact interval algebra and graph-to-truth bounds

Using independent exact rational arithmetic, the reviewer reconstructed:

- mean truth `M = [m_lo, m_hi]`;
- standard-error truth `S = [s_lo, s_hi]`;
- positive critical-value truth `Q = [q_lo, q_hi]`;
- margin truth `[q_lo*s_lo, q_hi*s_hi]`;
- lower-endpoint truth `[m_lo-margin_hi, m_hi-margin_lo]`; and
- upper-endpoint truth `[m_lo+margin_lo, m_hi+margin_hi]`.

For margin, lower endpoint, and upper endpoint, the reviewer independently lifted the actual M3-C binary64 graph result to an exact rational and reproduced exactly:

`max(|graph - truth_lower|, |graph - truth_upper|)`.

The recorded `absolute_error_upper_bound` equals this exact value in every reviewed case. The direct graph-to-truth distance therefore accounts for the actual M3-C multiply/add/subtract rounding without a separate heuristic rounding allowance or double counting.

## 8. Boundary corpus

The independent review exercised successful cases for:

- df = 1;
- df = 2;
- df = 30;
- df = 100;
- df = 200;
- negative mean;
- an interval crossing zero;
- large finite observations; and
- a small but non-collapsed standard error.

The Python exact-rational oracle reported:

`PASS (9 success cases + collapse)`.

The known 201-pair endpoint-collapse witness was also executed. M3-D propagated the M3-C refusal as `ci_stage_refusal` / `confidence_interval_endpoint_collapse` and did not fabricate an endpoint truth proof.

## 9. Mutation and hostile-shape battery

The reviewer structural/adversarial suite completed 5/5 tests and rejected coherent outer-rehash mutations of, among other targets:

- margin/lower/upper truth intervals;
- exact endpoint error bounds;
- critical predecessor/successor bits;
- critical quantization bound;
- mean and standard-error truth intervals;
- selected-table hash;
- M3-C/G4 truth digest bindings;
- nested M3-C endpoint values;
- nested G4 truth proof values; and
- cross-dataset nested artifact substitutions.

Hostile envelope shapes with hidden own properties, symbol keys, accessors, cycles, BigInt, functions, and throwing `ownKeys` proxies were rejected without an uncaught exception. The caller-provided accessor executed zero times.

Checkpoint mutations attempting review completion, M3 closure, supported df selection, platform/execution/domain/runtime activation, final reason-code freeze, or finite-corpus-bound promotion were rejected.

## 10. Exact-head CI and regression

Exact review head `ba3d81e62f8f77884628c59c4b27d1c5ff3cb340` completed:

- CI `33487651929`: success, 5/5 jobs;
- Release 2 paired-t candidate evidence `33487651956`: success; and
- Release 2 paired-t runtime-series candidate evidence `33487651944`: success.

The Linux full check completed with 48 test files and 466 tests passing. The production M3-D focused suite passed 5/5. Formatting, markdown lint, TypeScript typecheck, repository validation, generated-file checks, authority tests, Release 1 history, Phase 1/2A regression/conformance, existing G4/M3-A/M3-B/M3-C tests, and hosted Linux x64/Node 24, Linux arm64, macOS arm64, and Windows x64 checks are green.

Reviewer-only workflow `33487985344` completed successfully:

- production M3-D focused suite: 5/5 PASS;
- reviewer structural/adversarial battery: 5/5 PASS;
- independent Python Fraction oracle: PASS for 9 success cases plus collapse and all 200 selected-table cells; and
- typecheck: PASS.

Reviewer-only PR #111 was closed unmerged; candidate files were unchanged by that review instrumentation.

## 11. RFC and authority boundary

RFC #25 remains `OPEN`, its public review window remains `OPEN`, and earliest decision remains:

`2026-09-25T20:52:54Z` (`2026-09-26T05:52:54+09:00`).

M3-D is candidate implementation/evidence work inside the reviewed paired-t scope. It does not shorten or restart the RFC clock and authorizes no permanent IDs, registered support, authoritative Public Check, supported bundle, final R2-D5 disposition, or Release 2 landing.

## 12. Findings

- BLOCKER: none.
- SHOULD-FIX: none.
- NICE-TO-HAVE: none.

## 13. Disposition

GO. The exact PR #108 head `ba3d81e62f8f77884628c59c4b27d1c5ff3cb340` may merge as the independently reviewed M3-D confidence-interval endpoint mathematical-truth candidate.

The next step is a separate M3 integration/readiness synchronization increment that admits the independently reviewed M3-C execution trace and M3-D endpoint truth ledger together while keeping support-domain/resource/platform/execution/runtime and final reason-code decisions open. M3 must not be treated as closed until that integration state transition is itself reviewed.
