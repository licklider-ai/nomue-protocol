# R2-D5 M3-D confidence-interval endpoint mathematical-truth adversarial-review protocol

## 0. Review purpose

Perform an independent, adversarial review of the M3-D confidence-interval endpoint mathematical-truth candidate. The review input is the exact PR head supplied in the commission. Do not trust the PR description, checkpoint maturity labels, previously reported numerical values, or the implementation's rational arithmetic without reconstructing the relevant claims independently.

A `GO` in this review means only that the non-authoritative candidate correctly binds the reviewed M3-C execution trace to a defensible exact-rational mathematical-truth envelope for the fixed-95 confidence-interval margin and endpoints. It does not select Protocol support, a supported df maximum, a supported platform or execution predicate, runtime behavior, final reason codes, a Public Check, bundle, final R2-D5 disposition, RFC closure, or Release 2.

## 1. Exact identity gate

Before numerical review:

1. fresh clone the repository;
2. detach at the exact commissioned head;
3. confirm the exact parent/base and tree;
4. confirm the head is one direct-child commit from the pinned base;
5. confirm the delta is exactly four added files and no pre-existing file is modified;
6. record full SHAs and path list; and
7. stop with `NO-GO` if identity differs.

Expected candidate paths:

- `governance/drafts/release-2-candidate/numerical/ci-endpoint-truth-error-candidate.json`;
- `tooling/src/spikes/paired-t-ci-endpoint-truth-error-candidate.ts`;
- `tooling/tests/paired-t-ci-endpoint-truth-error-candidate.test.ts`; and
- `governance/drafts/release-2-candidate/reviews/d5-ci-endpoint-truth-error-adversarial-review-protocol.md`.

## 2. Mandatory prerequisite resolution

Read the following durable records from the exact base in full and independently verify their identities where commit lineage is material:

- `review-inputs/r2-d5-g4-execution-trace-repair-close/REVIEW-RESULT.md`;
- `review-inputs/r2-d5-g4-truth-error-candidate/REVIEW-RESULT.md`;
- `review-inputs/r2-d5-fixed-95-evidence-review-sync/REVIEW-RESULT.md`;
- `review-inputs/r2-d5-fixed-95-table-selection/REVIEW-RESULT.md`; and
- `review-inputs/r2-d5-ci-execution-trace-candidate/REVIEW-RESULT.md`.

Confirm that:

- G4 actual-execution repair is `CLOSED`;
- G4 mathematical-truth candidate is independently `GO`;
- fixed-95 200-cell evidence is independently reviewed;
- exact reviewed table content is selected only for candidate CI work;
- M3-C actual-execution trace is independently `GO`; and
- none of those reviews selected support/runtime/final reason codes.

If the M3-C review result is not durably present on the base, return `NO-GO` for this M3-D review.

## 3. Authority and scope boundary

Confirm byte-level or semantic invariance as applicable for all authoritative/issued surfaces. This increment must not alter:

- Release 1 artifacts;
- normative schemas or registries;
- permanent Requirement IDs or Protocol identifiers;
- Public Checks;
- bundles;
- reference-verifier authoritative dispatch; or
- authority snapshot meaning.

Confirm the candidate remains `non_authoritative_candidate` and `unissued`.

Confirm the following remain false/null/unselected/pending:

- supported df maximum;
- supported platform matrix;
- supported-execution predicate;
- supported domain;
- runtime support;
- final reason codes;
- global CI endpoint error constant;
- M3 closure before this review is admitted;
- R2-D5 completion; and
- Release 2 completion.

## 4. Same-trace binding

For every successful candidate evaluation independently confirm:

1. the nested M3-C trace passes `verifyPairedTCIExecutionTraceCandidate`;
2. the nested G4 truth envelope passes `verifyPairedTG4TruthErrorCandidate`;
3. the entire nested G4 trace in M3-C is deep-identical to the G4 trace in the truth envelope;
4. the selected fixed-95 table hash is exactly
   `sha256:24ccc86d7a49b9e1ef1e3fc9b038a5b8d338b8b5ca4a02492d8900d7e7dea3c0`;
5. selected df equals the nested G4 df; and
6. the outer proof binds the exact M3-C trace digest, G4 truth-envelope digest, G4 trace digest, df, and selected critical-value bits.

Attempt coherent substitution of a different valid G4 trace, a different valid M3-C trace, or a different selected df/cell and rebuild every digest available to the attacker. Acceptance is a BLOCKER.

## 5. Independent critical-value rounding-cell reconstruction

Do not trust the candidate's midpoint code.

For representative df values at minimum `1`, `2`, `30`, `100`, and `200`, and preferably all 200 cells:

1. take the selected positive finite binary64 critical-value bits `q`;
2. independently reconstruct the immediately adjacent finite binary64 values `q-1` and `q+1` in positive-number bit order;
3. lift all three values to exact rationals;
4. reconstruct exact lower and upper midpoints `(prev + q)/2` and `(q + next)/2`;
5. confirm the candidate's critical truth interval is exactly those rational midpoint endpoints;
6. confirm the recorded absolute quantization bound is exactly the larger exact distance from `q` to the two midpoint endpoints; and
7. confirm the interval is strictly positive and non-reversed.

The use of inclusive midpoint endpoints is a conservative truth enclosure; do not require tie-parity endpoint exclusion.

This review may reuse the prior independent proof that the selected binary64 cell is the correctly rounded fixed-95 critical-value cell. It must not silently reinterpret 200-cell evidence coverage as Protocol support.

## 6. Independent G4 truth reuse

Do not recompute G4 truth by copying candidate helpers. Independently inspect the reviewed G4 truth envelope and confirm M3-D reuses exactly:

- `mean_difference.truth_interval`; and
- `standard_error.truth_interval`.

For ordinary exact-input witnesses independently compute the exact mathematical mean from raw binary64 observations and confirm it lies in the reused mean interval. For the standard error, independently verify the reused interval is positive/nonnegative and encloses the exact square-root target, e.g. by exact rational squaring of interval endpoints against the exact variance/n quantity where practical.

Any widening is allowed only if explicitly justified; silent narrowing of the reviewed G4 interval is a BLOCKER.

## 7. Exact interval algebra

Independently reconstruct the complete mathematical-truth intervals using exact rational arithmetic:

- let `M = [m_lo, m_hi]` be mean truth;
- let `S = [s_lo, s_hi]` be standard-error truth with `s_lo >= 0`;
- let `Q = [q_lo, q_hi]` be the positive critical-value rounding cell;
- margin truth must be exactly `[q_lo*s_lo, q_hi*s_hi]`;
- lower endpoint truth must be exactly `[m_lo - margin_hi, m_hi - margin_lo]`;
- upper endpoint truth must be exactly `[m_lo + margin_lo, m_hi + margin_hi]`.

Confirm all rational outputs are normalized, denominators positive, and intervals ordered.

For each graph quantity (`margin`, `lower`, `upper`), lift the exact M3-C binary64 result to an exact rational and independently compute:

`max(|graph - truth_lower|, |graph - truth_upper|)`.

The recorded `absolute_error_upper_bound` must equal that exact value, not merely exceed it. This direct graph-to-truth distance is the candidate's composition of upstream truth uncertainty plus actual M3-C multiply/add/subtract rounding. It must not double-count or omit a separately inferred rounding term.

## 8. Boundary corpus

At minimum execute and verify successful cases covering:

- df = 1;
- df = 2;
- an ordinary midrange df (for example 30);
- df = 200;
- positive mean;
- negative mean;
- an interval crossing zero;
- large finite observations that remain valid;
- a small but non-collapsed standard error; and
- at least one case where mean or endpoint lies near a binary64 exponent boundary if a practical witness can be generated.

For every success confirm:

- exact same-trace binding;
- critical cell lookup matches selected table;
- proof reconstructs independently;
- graph endpoint lies at finite exact distance from the truth interval; and
- all non-support flags remain false.

Also execute the known 201-pair endpoint-collapse witness. M3-D must fail at the M3-C stage with `confidence_interval_endpoint_collapse`, not fabricate a truth proof for a refused CI.

## 9. Mutation and reconstruction attacks

Starting from a valid M3-D envelope, perform coherent mutations and rebuild outer SHA-256 wherever possible. At minimum attack:

- nested M3-C G4 node/value/digest;
- nested M3-C endpoint bits;
- nested G4 truth interval and its envelope digest;
- selected table hash;
- selected df;
- selected critical-value bits;
- predecessor/successor bits;
- critical midpoint lower/upper rational;
- critical quantization bound;
- mean truth interval;
- standard-error truth interval;
- margin truth interval;
- lower truth interval;
- upper truth interval;
- each absolute-error bound;
- M3-C/G4 envelope SHA bindings;
- proof model/status fields; and
- outer digest alone.

Also attempt swapping otherwise valid envelopes/traces from two distinct raw datasets. Acceptance after coherent rehash is a BLOCKER.

## 10. Hostile-shape / fail-closed validation

Exercise both checkpoint and envelope validators with:

- hidden own properties;
- symbol keys;
- accessors/getters;
- sparse or extended arrays;
- non-JSON prototypes;
- non-finite numbers;
- BigInt;
- functions;
- cycles; and
- throwing proxies / hostile `ownKeys`.

Requirements:

- no uncaught exception;
- deterministic refusal;
- caller-provided getters execute zero times; and
- no malformed shape can be accepted by serialization side effects.

## 11. Checkpoint promotion attacks

Mutate the checkpoint, separately and in combinations, to claim:

- independent review complete;
- endpoint truth complete;
- `m3_closed = true`;
- supported df maximum = 200 or another value;
- supported platform selected;
- supported execution selected;
- supported domain true;
- runtime support true;
- final reason codes frozen;
- global endpoint error constant selected;
- R2-D5 complete; or
- Release 2 complete.

Every such promotion must be rejected by the pre-review checkpoint validator.

## 12. Independent arithmetic implementation

The reviewer must use an arithmetic implementation that is independent of the candidate's rational helper functions. Python `fractions.Fraction`, another exact-rational library, or independently written BigInt rational code is acceptable. Copying the candidate's helper functions line-for-line is not independent verification.

For the G4 standard-error square-root truth interval, the reviewer may verify enclosure from the already independently reviewed G4 proof rather than implementing a second 2048-bit square-root constructor, but should independently square the recorded endpoints against the exact target for representative cases.

## 13. Full repository regression

On the exact review head run the repository-required checks from a clean checkout, including at least:

- formatting;
- markdown lint;
- TypeScript typecheck;
- repository validation;
- full tests;
- generated-file checks;
- Phase 1 / Phase 2A regression and conformance;
- authority and Release 1 historical checks; and
- hosted candidate/evidence workflows where applicable.

Record exact workflow IDs, conclusions, test-file/test counts, platform matrix, and any environment-specific caveat.

## 14. RFC boundary

Re-fetch issue #25 during review. Confirm:

- issue state remains OPEN;
- public review remains OPEN; and
- earliest decision remains `2026-09-25T20:52:54Z` (`2026-09-26T05:52:54+09:00`) unless the public record itself has legitimately changed.

This candidate must not shorten the RFC window or authorize Release 2.

## 15. Verdict rule

Return `GO` only if all of the following hold:

- exact identity gate passes;
- prerequisites are durable and correctly scoped;
- same-trace binding is exact;
- critical rounding-cell reconstruction is correct;
- G4 mean/SE truth intervals are reused without unjustified narrowing;
- exact interval algebra and exact graph-to-truth error bounds independently reproduce;
- boundary corpus behaves correctly;
- coherent rehash/mutation attacks fail closed;
- hostile-shape tests fail closed with zero getter execution;
- checkpoint promotions are rejected;
- full exact-head regression is green; and
- there are no BLOCKER, SHOULD-FIX, or NICE-TO-HAVE findings worth changing before merge.

Otherwise return `NO-GO` and classify findings as BLOCKER / SHOULD-FIX / NICE-TO-HAVE.

## 16. Mandatory non-claims in the review result

Even on `GO`, state explicitly that the review does not establish:

- a global CI error constant;
- Protocol support for df 1..200 or any other df range;
- a supported input/value/resource domain;
- a supported platform or execution profile;
- runtime activation;
- final reason-code freeze;
- authoritative Public Check or bundle;
- final R2-D5 disposition;
- RFC closure; or
- Release 2 completion.
