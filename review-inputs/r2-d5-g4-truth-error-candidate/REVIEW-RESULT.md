# R2-D5 G4 Mathematical-Truth Error Candidate - Adversarial Review Result

Verdict: **GO**

No BLOCKER, SHOULD-FIX, or NICE-TO-HAVE findings. The candidate's exact
truth ledger is mathematically correct against a fully independent
exact-rational oracle, its standard-error and test-statistic enclosures are
rigorous and directionally exact, its error bounds equal the maximum
distance from the exact binary64 graph value to both truth-interval
endpoints, the proof is bound to one independently verified G4 trace and is
completely reconstructed by the verifier rather than trusted, every
coherent mutation and hostile shape fails closed, the successful envelope
is deeply immutable, G4 refusals stay first, the checkpoint resists every
promotion, and readiness, authority, and Release 1 surfaces are untouched.
The reviewer battery ran 568 checks with zero failures, and the full
repository regression is green at the pinned head.

`GO` means only that the G4 mathematical-truth error implementation
candidate may proceed to merge consideration as an unissued,
non-authoritative candidate. The complete non-claims list is in section 12.

## 1. Identity and delta (protocol A)

| Item                | Value                                                                                   |
| ------------------- | --------------------------------------------------------------------------------------- |
| Review-input head   | `fd17daf909a6c7aaad0e96a89369543c9d12282c` (tree `3251ee08...`)                         |
| Base = PR #64 merge | `6c3d9acfe631c1fe6dc5e9d5b6ce0539b9231a48` = merge-base; head is ahead-only by 1 commit |
| Delta               | exactly the four expected added files, +1,426/-0, **zero modified or deleted paths**    |
| PR metadata         | head/base/branch, 4 files, 1 commit match the local git facts                           |
| Environment         | fresh clone, detached checkouts; Node v22.22.2, pnpm 11.7.0, Linux x86_64               |

The four added files are the candidate implementation, its focused test,
the truth-error checkpoint, and this review's governing protocol - exactly
the protocol-A expected increment. The head did not move during the review
(re-fetched immediately before this record was written; `main` still points
at the base).

## 2. Mathematical targets and exact-rational arithmetic (protocol C, D)

A fully independent oracle was built for this review: its own raw-bit
binary64 decomposition to exact dyadic rationals (not calling the
repository's lifting), its own gcd-reduced BigInt rational arithmetic, and
its own result-checked integer square root. Over a 13-case corpus
(hand-computable integers; two exact-collapse cases; zero-mean;
negative-mean; non-representable decimal fractions; a cancellation case;
scales `1e-150` and `1e150`; a subnormal observation `5e-324` inside a
successful input; maximum-magnitude observations; a 31-pair mixed case; the
201-pair ceiling):

- the candidate's exact difference, mean, and sample-variance truth
  rationals equal the oracle's values **exactly** in every case, with every
  serialized rational in normalized form (positive denominator, gcd 1,
  canonical zero);
- variance truth is centered on the **exact mean** (oracle equality proves
  this; a rounded-mean centering would differ on the decimal cases);
- truth is not defined as the rounded G4 intermediates: on the
  non-representable cases the truth values differ from the graph values and
  the error bounds are strictly positive, while on exactly representable
  cases the bounds are exactly zero;
- all decision-bearing candidate arithmetic is `BigInt` rational (code
  audit); the only `Number` uses are bit-level decode, an initial
  Newton-iteration guess whose result is used only as a starting point, and
  copied integer source sequences.

## 3. Standard-error enclosure (protocol E)

For every corpus case the candidate's SE interval satisfies, in exact
rational arithmetic: `lower >= 0`, `lower <= upper`,
`lower^2 <= variance/n`, and `upper^2 >= variance/n`; the interval width is
exactly `0` or exactly `2^-2048`; and the interval contains this review's
own tighter 4096-bit enclosure. Exact-at-scale roots collapse: diffs
`{0,2}` give SE exactly `1` (and t exactly `1`), and diffs `{4,5}` give SE
exactly `1/2` (and t exactly `9`), both single-point intervals with zero SE
error terms possible only because the graph value happened to be exact;
irrational cases (diffs `{1,2,3}`) give a non-empty interval. No host
`Math.sqrt` appears anywhere in the truth path (integer Newton iteration
with an exact containment self-check).

Precision sufficiency is provable for the whole evaluation envelope, not
just the corpus: every exact difference lies in `Z * 2^-1074`, so any
nonzero centered value has magnitude at least `2^-1074 / n`; on G4 success
the exact variance is positive (if all exact differences were equal, the
binary64 variance would be exactly zero and G4 would already have refused),
so `variance >= 2^-2148 / n^3` and `SE^2 >= 2^-2148 / n^4`. With
`n <= 201` this gives `SE^2 > 2^-2180`, while the enclosure's insufficiency
guard only triggers below `2^-4096` - roughly 1,900 bits of margin. The
`floor = 0` refusal is therefore unreachable for every successful G4 input.

## 4. Test-statistic enclosure and signs (protocol F)

Witnesses for all three signs were verified exactly: for positive mean the
candidate's t interval equals `[mean/SE_upper, mean/SE_lower]`; for
negative mean it equals `[mean/SE_lower, mean/SE_upper]`; for exact zero
mean it is exactly `[0, 0]`. A sign-aware exact square comparison confirms
in every case that the interval contains the true
`t = mean / sqrt(variance/n)`.

## 5. Error-bound meaning (protocol G)

For every reported quantity the candidate's `absolute_error_upper_bound`
equals - recomputed with the oracle's own arithmetic - the maximum of the
exact distances from the graph value (interpreted as its exact binary64
real value) to the two truth-interval endpoints. Bounds are exactly zero
precisely on exactly-representable quantities. The proof and checkpoint
both pin `finite_corpus_maximum_is_a_bound: false` and
`truth_error_bound_selected: false`, and no tolerance is selected anywhere
in the increment.

## 6. Trace and provenance binding (protocol H)

In every successful envelope: `proof.g4_trace_sha256` equals the embedded
trace's `sha256`; per-difference `pair_id`, `source_sequence`, and
`graph_binary64_hex` equal the trace input pairs and outcome arrays in
canonical order; and the mean, variance, SE, and t records bind the
trace outcome's source sequences and binary64 bits field for field. The
proof is constructed only after the G4 trace passes
`verifyPairedTG4ExecutionTraceCandidate`, and the envelope verifier
re-verifies the nested trace and then **reconstructs the entire proof**
from it, accepting only deep-strict equality including the digest - so no
declared proof value is ever trusted.

## 7. Coherent mutation attacks (protocol I) - all rejected

No-op controls first proved the reviewer's rehash helpers coherent (an
unchanged envelope re-hashed at the outer layer, and re-hashed through the
full trace-digest -> proof-binding -> outer-digest chain, both verify).
Then, each with a coherently recomputed outer hash: a mutated truth
rational; a **doubled (still sound) error bound**; a mutated source
sequence; a swapped graph-bit binding; a nested G4 node mutation carried
through the full coherent rehash chain (rejected at "nested G4 trace
verification failed"); substitution of a different valid G4 trace with
stale proof, in both the stale-`g4_trace_sha256` and updated-sha variants;
removed and added proof fields; an added top-level key; swapped SE interval
endpoints; `truth_error_bound_selected: true`; and a stale-digest control -
all rejected. The honest envelope of the other dataset verifies with a
different digest, consistent with the protocol's self-contained-envelope
boundary.

## 8. Hostile shapes and immutability (protocol J)

Eighteen hostile shapes (null, undefined, primitives, arrays, functions,
symbol keys, inherited-only objects, accessor-bearing envelopes with
invocation counters, throwing proxies, cyclic proofs, malformed SHA-256,
malformed binary64 hex, sparse arrays, a 40,000-entry overlong differences
array, missing and extra keys) were driven through both the envelope
verifier and the checkpoint validator: no exception escaped, everything was
rejected, and **zero caller accessors were invoked**. On success, every
object reachable under the envelope (nested trace, proof, quantity records,
intervals, rationals, arrays - over 100 objects walked) is frozen, caller
mutation attempts have no effect, and the returned `g4Result` is frozen as
well.

## 9. Refusal ordering (protocol K)

Zero-variance, difference-overflow, hostile-input, and NaN witnesses all
return `classification: "g4_stage_refusal"` carrying the existing G4
classification (e.g. `ZERO_DIFFERENCE_VARIANCE`), with **no `envelope` or
`proof` property present** on the refusal result and every support/runtime
flag `false`. The evaluator invokes the reviewed G4 evaluator first (code
audit), and the truth-internal failure classifications
(`truth_error_proof_failed`, `truth_error_verification_failed`) remain
distinct defensive paths that never replace a G4 refusal.

## 10. Checkpoint promotion attacks (protocol L)

The committed checkpoint is accepted exactly as committed; a full key
reorder is accepted (canonicalization control) while a
`prohibited_claims` array reorder is rejected. All 98 attacks were
rejected: 72 recursive walk mutations (every field wrong-valued and
deleted, an extra key at every object level) plus 16 named promotions
(fabricated review closure, readiness admission, truth-bound completion or
review, decision-state promotion, resource-bound/predicate selection,
confidence-interval completion, runtime/domain/status/issuance promotion,
scope claiming the G4 implementation changed, corpus-maximum promoted to a
bound, tolerance-prohibition removal, hidden support key) plus removal of
each of the ten prohibited claims individually.

## 11. Invariance, RFC state, and regression (protocol M, N)

- The delta adds four files and modifies nothing: readiness
  (`evidence-readiness.json`, `paired-t-numerical-readiness.ts`), the
  reviewed G4 implementation and checkpoint, authority, registries,
  schemas, `spec/`, `conformance/`, `generated/`, `bindings/`, Public
  Checks, bundles, and Release 1 are byte-identical between base and head
  (git-level proof over the full path set).
- The content-addressed authority snapshot is identical at the exact base
  and the exact head
  (`sha256:9f2b625472e56207ab2f76ddd91ac88c69c3a9a9710ed2d3863b8630634ef0b6`,
  recomputed at both commits). Its difference from the constant recorded in
  reviews up to PR #62 originates in the already merged FND-1
  manifest-note commit on the base side, not in this increment.
- Public RFC issue #25 is OPEN with the public review window OPEN and the
  pinned earliest decision `2026-09-25T20:52:54Z` unchanged.
- Fresh checkout at the head: `pnpm install --frozen-lockfile` and the full
  `pnpm check` pass end to end (exit 0; 42 test files, 440 tests), with a
  clean tree afterward; the focused truth-error suite (9 tests) and G4
  execution-trace suite (10 tests) pass standalone. All three known CI runs
  succeeded on the exact head on their first attempt: CI #193
  (`33388937774`), paired-t candidate evidence #51 (`33388937756`), and
  runtime-series candidate evidence #41 (`33388937760`). CI was used as
  corroboration only.

## 12. Findings, verdict meaning, and non-claims (protocol O, P)

No BLOCKER, SHOULD-FIX, or NICE-TO-HAVE findings. (One neutral
observation, not a finding: on `g4_stage_refusal` results the optional
`proofErrors` field carries the G4 stage's trace errors; the field is
declared in the public result type and has no correctness or governance
consequence.)

`GO` means only that the G4 mathematical-truth error implementation
candidate may be retained/merged as an unissued, non-authoritative
candidate pending separate readiness synchronization. It does not approve
or complete any of the following, which all remain open:

- G4 mathematical-truth error readiness closure
  (`mathematical_truth_error_bound_complete` remains `false`);
- Student-t tail numerical closure;
- confidence-interval composition;
- supported resource bounds (201 pairs / 2,048 nodes remain evaluation
  ceilings);
- a supported platform, execution predicate, or domain;
- runtime support;
- final tolerances or reason codes;
- a Public Check or bundle;
- R2-D5 completion;
- RFC closure (issue #25 remains open);
- Release 2.

## 13. Deliverable identity (protocol Q)

- Branch: `review/r2-d5-g4-truth-error-candidate-fd17daf`, based exactly on
  the reviewed head `fd17daf9...`.
- This file is the only addition; no implementation, test, checkpoint,
  readiness, governance, or authority file is modified, and the working
  tree was clean after all verification runs.
