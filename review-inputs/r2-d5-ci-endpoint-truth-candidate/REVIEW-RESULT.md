# R2-D5 confidence-interval endpoint mathematical-truth independent numerical review result

## Verdict

GO

The exact PR #110 head `bbfcb104889b7ce3ed219dc30d49bd7ca1723f80` may be
considered for merge as the M3-D non-authoritative confidence-interval endpoint
mathematical-truth composition candidate. No BLOCKER or SHOULD-FIX finding
remains; two NICE-TO-HAVE observations are recorded below.

`GO` authorizes merge consideration of this exact head only. It does not close
M3, select a supported degrees-of-freedom maximum, global endpoint error
constant, platform matrix, execution predicate, domain, or runtime, freeze
final reason codes, issue a Public Check or bundle, complete R2-D5, close
RFC #25, or complete Release 2. Any repair or any different head requires a new
independent exact-head review.

## 1. Exact identity and scope

- Repository: `licklider-ai/nomue-protocol`
- PR: `#110` (branch `r2-d5/ci-endpoint-truth-composition`)
- Pinned base and sole parent: `90e3ab6d086737b0ae754951c3e4f1b404b126be`
- Reviewed head: `bbfcb104889b7ce3ed219dc30d49bd7ca1723f80`
- Reviewed tree: `1f31096cf021bb4755aadcb4298fd516198752a4`
- Structure: one direct-child commit
- Delta: exactly four added files, `+1320/-0`
- Review date: `2026-09-01` (UTC)

Reviewed paths and head blob identities:

1. `governance/drafts/release-2-candidate/numerical/ci-endpoint-truth-candidate.json`
   (`03fcbe00bf4fe8a1448317fe620f747348af8c81`)
2. `governance/drafts/release-2-candidate/reviews/d5-ci-endpoint-truth-adversarial-review-protocol.md`
   (`e298c265f56dd1684dea8f9a3fa8ca8f27b6ff3a`)
3. `tooling/src/spikes/paired-t-ci-endpoint-truth-candidate.ts`
   (`29bd5be8ac0e2c7009f0ad8d46012f92e4f01559`)
4. `tooling/tests/paired-t-ci-endpoint-truth-candidate.test.ts`
   (`5f156d7d5c97598dae29b6da18c77fd7807d2932`)

The live PR head, parent list, tree, changed-path set, and line delta were
verified against the values pinned in the PR description before review began;
all matched exactly. The diff against the pinned base changes no pre-existing
G4, tail, fixed-table, CI-execution, readiness, authority, schema, registry,
conformance, Public Check, bundle, verifier-dispatch, or Release 1 file
(zero changed paths under `registries/`, `authority/`, `schemas/`,
`conformance/`, `generated/`, `spec/`, `reference/`).

## 2. Reviewer independence

This review was performed in a reviewer role in a separate working context
from the authoring context of the candidate. The reviewer did not create or
modify the candidate implementation, and did not adopt the author-side
validation summary in the PR description, the candidate's own helper
functions, or any prior review conclusion as an oracle. Every numerical
contract below was reconstructed independently: binary64 bit decoding, exact
rational arithmetic, the standard-error square-root enclosure, the critical
rounding cell, interval composition, error bounds, and every digest were
recomputed with an independent exact-rational implementation (arbitrary
precision integer rationals and 500-bit real arithmetic for the mathematical
Student-t targets), not with the candidate's TypeScript code and not with
binary64 floating-point arithmetic. All review harnesses, oracles, and
generated corpora were kept as temporary files outside the repository tree;
this result file is the only artifact added by the review.

## 3. Reviewed prerequisites

Resolved from repository bytes at the reviewed head rather than trusting the
new protocol's summary:

- Durable G4 mathematical-truth review:
  `review-inputs/r2-d5-g4-truth-error-candidate/REVIEW-RESULT.md` records
  `GO` with zero findings for head `fd17daf909a6c7aaad0e96a89369543c9d12282c`.
- Durable M3-C confidence-interval execution-trace reviews:
  `review-inputs/r2-d5-ci-execution-trace-candidate/REVIEW-RESULT.md` and
  `review-inputs/r2-d5-ci-execution-trace/REVIEW-RESULT.md` record `GO` with
  zero outstanding findings for head
  `c571e8076a92ddd500309cf9702619feeb946b4c`, including the durable M3-A and
  M3-B `GO` results and the exact ordered-cell content hash.
- The selected fixed-95 table
  (`fixed-95-critical-value-table-selected-candidate.json`) was revalidated
  independently: the ordered-cell content hash was recomputed from the raw
  table bytes with an independent SHA-256 implementation and equals
  `sha256:24ccc86d7a49b9e1ef1e3fc9b038a5b8d338b8b5ca4a02492d8900d7e7dea3c0`;
  all 200 cells are positive finite binary64 and strictly decreasing.
- Independent mathematical cross-check of the reviewed table content: for
  df 1, 2, 3, 30, and 200, the two-sided fixed-95 Student-t critical value was
  recomputed from the regularized incomplete beta function at 500-bit
  precision by bisection; in every case the correctly rounded binary64 of the
  mathematical value equals the selected cell bit pattern, and the exact
  mathematical value lies strictly inside the candidate's truth rounding cell.
  This check confirms the rounding-cell containment assumption without
  inferring any support claim from evidence coverage.

## 4. Independent numerical-contract recomputation

Corpus (raw paired binary64 observations; helper pairs each difference with an
exact-zero second observation): df=1 positive mean; df=1 negative mean; df=2
positive mean; df=2 interval crossing zero (mean exactly 0); df=3 small but
non-collapsed endpoint separation (differences separated at the 2^-45 scale);
df=30 interior df with fractional exact values; df=200 mixed-sign; df=200
negative mean; large finite magnitudes (1e150 scale); and the known finite
endpoint-collapse witness (201 alternating `1+2^-52`/`1` differences).

For each of the nine accepted cases, the emitted envelope was compared field
by field against the independent oracle, 698 comparisons in total, zero
mismatches:

1. The mean truth interval equals the exact rational mean of the exact
   trace-bound differences (recomputed from raw observation bits), as an exact
   point interval, and the standard-error truth interval equals the
   independently reimplemented 2048-bit dyadic square-root enclosure of the
   exact `variance/n`, with `lower^2 <= se^2 <= upper^2` verified exactly.
   Both equal the nested reviewed G4 envelope's intervals.
2. The critical-value truth rounding cell equals the exact midpoints between
   the selected cell's binary64 bit pattern and its immediate predecessor and
   successor bit patterns, recomputed from raw bits; the selected bits equal
   the reviewed table entry for the exact df, and the cell is strictly
   positive, ordered, and contains the selected value in its interior.
3. The quantization error bound equals the exact maximum of the distances
   from the selected value to the two cell boundaries.
4. The margin truth interval equals the two-corner product
   `[c.lower * se.lower, c.upper * se.upper]`, with both factors verified
   strictly positive before the product rule is applied.
5. The lower endpoint truth interval equals
   `[mean.lower - margin.upper, mean.upper - margin.lower]` and the upper
   endpoint truth interval equals
   `[mean.lower + margin.lower, mean.upper + margin.upper]`; the two endpoint
   truth intervals are strictly separated in every accepted case.
6. Every absolute-error upper bound equals the exact maximum rational distance
   from the trace-bound binary64 graph value (decoded independently from its
   hex bit pattern) to the two truth-interval endpoints, for the margin and
   both endpoints; all serialized rationals are normalized (lowest terms,
   positive denominator, canonical integer strings).
7. The full digest chain was recomputed independently from serialized bytes:
   the outer envelope digest, the nested G4 truth-error envelope digest, the
   nested CI trace digest, and the nested G4 trace digest all match, and the
   proof's `ci_trace_sha256`, `g4_truth_error_envelope_sha256`, and
   `g4_trace_sha256` bind exactly those digests. No declared hash was trusted;
   verification reconstructs the complete proof from the nested traces.
8. The nested G4 trace inside the CI trace and inside the G4 truth-error
   envelope is byte-identical in every accepted case, and the sequence
   bindings (`margin=0`, `lower=1`, `upper=2`) and graph-hex bindings match
   the trace outcome.
9. The returned envelope, proof, rounding cell, truth intervals, and nested
   structures are recursively frozen; post-verification mutation attempts
   neither changed values nor bypassed verification.
10. The collapse witness is refused upstream as
    `ci_execution_stage_refusal` / `confidence_interval_endpoint_collapse`
    with every completion/support/runtime flag false and no truth proof
    emitted; NaN and Infinity observations, a single pair, zero variance,
    202 pairs (df=201), and null input are all refused upstream with reasoned
    classifications; large finite inputs neither overflow nor collapse.

The candidate defines the truth targets mathematically (exact mean, exact
`sqrt(variance/n)` enclosure, rounding cell around the mathematical critical
value) and does not redefine any target as the binary64 execution result.

## 5. Adversarial reconstruction and hostile-shape results

Forty-six mutation attacks were executed against a valid envelope through the
public verifier; every one was rejected, no exception leaked, and each refusal
returned the module's fail-closed reason rather than an accidental error:

- Coherent mutations with all attacker-computable digests rebuilt bottom-up:
  mean truth interval; standard-error truth interval; critical-value bits;
  selected cell replaced with the adjacent df's cell; table content hash;
  either rounding-cell boundary; shrunken quantization bound; margin interval;
  under-reported margin error bound; collapsed/mutated lower and upper
  endpoint intervals; zeroed endpoint error bound; nested CI trace substituted
  with a different valid trace; nested G4 truth-error envelope substituted
  with a different valid envelope; nested G4 trace substituted on only the CI
  path; removed, added, and promoted proof fields
  (`endpoint_truth_bound_selected`, `finite_corpus_maximum_is_a_bound`);
  outer-digest-only corruption; and cross-binding `ci_trace_sha256` to a
  different valid trace digest.
- Malformed rationals: unnormalized `2/4`, negative denominator, `+`-signed
  numerator, leading zero, decimal string, zero denominator, and a reversed
  interval.
- Hostile shapes: NaN, Infinity, BigInt, function values; hidden
  non-enumerable own properties; symbol keys; accessors at top level and deep
  inside the proof; sparse and extended arrays; arrays with extra named
  properties; a self cycle; proxies throwing from `ownKeys` and
  `getOwnPropertyDescriptor`; non-plain prototypes; null, string, and array
  roots.

Caller-supplied getters executed zero times across the envelope verifier, the
checkpoint validator, and the raw-input evaluator (invocation counters
confirmed 0). The checkpoint validator battery (13/13) rejected every
promotion attempt: runtime/domain enabled, `m3_closed`, a supported df
maximum, review completion, predicate selection, frozen reason codes, dropped
prohibited claims, added and removed fields, getters, and cycles; the pristine
checkpoint file validates cleanly.

## 6. Regression and hosted-CI results

At the exact head, in a clean checkout:

- Focused M3-D suite: `pnpm vitest run tooling/tests/paired-t-ci-endpoint-truth-candidate.test.ts` — 9/9 passed.
- Full `pnpm check` (format check, markdown lint, TypeScript typecheck,
  repository validation with private-dependency and code-path audits, unit
  tests 470/470 across 48 files, generated-artifact check 19/19, Phase 1
  schema/canonicalization/conformance/example/evidence checks, Phase 2A
  regression/conformance/refusal/oracle/evidence checks) — exit 0, all green.
- No environment-specific execution constraint was encountered; every wrapper
  ran normally.

Hosted CI on the exact head `bbfcb104` (all seven check runs successful):
Full check (Linux x64); Full check (Linux x64, Node 24); Phase 1 + 2A
validation (Linux arm64, macOS arm64, Windows x64); non-authoritative
paired-t evidence (run 33487623542); non-authoritative runtime-series
evidence (run 33487623563). Combined commit status reports no failing
contexts.

A synthetic merge of the current `main`
(`929c92cbc8bcd1f6474831ac9ef99b02952e21e7`) with the reviewed head was also
exercised: TypeScript typecheck passed and 474/475 tests passed; the single
failure was the private-dependency audit flagging the temporary review
worktree's `.git` indirection file, an artifact of the review environment's
worktree layout and not of the candidate or the merge. The two coexisting
endpoint-truth modules do not conflict.

## 7. Governance invariants

Confirmed at the reviewed head:

- checkpoint `status = non_authoritative_candidate`, `issuance = unissued`;
- `confidenceIntervalEndpointTruthIndependentlyReviewed = false` and
  `confidenceIntervalEndpointTruthComplete = false` on every success result;
- `endpoint_truth_bound_selected = false` and
  `finite_corpus_maximum_is_a_bound = false` in every proof;
- `m3_closed = false`; supported degrees-of-freedom maximum `null`; platform
  matrix `pending`; execution predicate `unselected`; supported domain and
  runtime `false`; final reason codes unfrozen;
- no Public Check, bundle, authority, registry, schema, conformance,
  generated, or Release 1 surface changed; no M3-A/B/C artifact was
  re-selected or modified; `evidence-readiness.json` unchanged;
- RFC #25 remains open with pinned earliest decision `2026-09-25T20:52:54Z`.

No finite-corpus observation in this review is generalized into a global
bound or support claim.

## 8. Findings

- BLOCKER: 0
- SHOULD-FIX: 0
- NICE-TO-HAVE: 2

NICE-TO-HAVE 1 - outer digest is not unique over semantically equal
envelopes. The outer envelope digest (and the nested G4 truth-error envelope
digest) is computed over a serialization that preserves the key order of
nested objects from the incoming value; a re-serialization of the same
semantic envelope with reordered nested keys and a recomputed outer digest
still verifies. Reproduction: reorder the members of
`ci_trace.selected_table` in a valid envelope, recompute the outer digest,
and call `verifyPairedTCIEndpointTruthCandidate`; it returns `ok: true` with
a digest different from the original. No semantic field can be altered this
way - full proof reconstruction and deep-strict comparison still reject every
value change, and the nested CI/G4 trace digests remain canonical - so this
affects only digest canonicity, not soundness. The same serialization pattern
exists in the already reviewed G4 truth-error candidate. Possible repair, for
a later increment: compute envelope digests over a key-sorted canonical
serialization, or reject envelopes whose nested key order differs from the
constructor's.

NICE-TO-HAVE 2 - a parallel merged M3-D candidate exists on `main`. Merged
PR #108 (`ci-endpoint-truth-error-candidate`, key
`paired-t-d5-ci-endpoint-mathematical-truth-error-candidate-1`) targets the
same M3-D endpoint mathematical-truth milestone as this PR #110 candidate
(key `paired-t-d5-ci-endpoint-mathematical-truth-candidate-1`). The two
increments share no file paths, both remain non-authoritative and unissued,
and this review found no interaction defect on the synthetic merge; but the
later explicit M3 integration increment must select exactly one reviewed
endpoint-truth candidate and record the disposition of the other, rather than
leaving two parallel candidates implicitly current.

## 9. Review execution record

- Identity: `git cat-file commit`, `git diff --numstat/--name-status` against
  the pinned base; live PR head compared with the pinned head before review.
- Regression: `pnpm install --frozen-lockfile`, `pnpm check`, focused vitest
  run, synthetic-merge typecheck and test run.
- Hosted CI: exact-head check-run and combined-status queries via the GitHub
  API.
- Independent oracle: a temporary corpus harness exported candidate envelopes
  as JSON; a temporary exact-rational oracle (integer-rational arithmetic
  with an independent binary64 bit decoder, an independent 2048-bit integer
  square-root enclosure, independent SHA-256 digest recomputation, and
  500-bit incomplete-beta bisection for mathematical Student-t targets)
  recomputed every contract; 698 checks, 0 failures.
- Adversarial battery: 46 verifier attacks (all rejected, 0 exceptions),
  13 checkpoint attacks (all rejected), getter counters 0/0/0, deep-freeze
  mutation attempts held.
- All harnesses and corpora were temporary files outside the repository; this
  file is the review's only repository artifact, added in a dedicated review
  commit whose parent is the exact reviewed head and which changes no
  candidate file.

`GO` is bound to `bbfcb104889b7ce3ed219dc30d49bd7ca1723f80` only. Do not
merge PR #110 on the basis of this result without an explicit steward merge
decision, and re-review any different head.
