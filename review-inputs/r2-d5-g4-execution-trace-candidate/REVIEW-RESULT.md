# R2-D5 G4 Actual-Execution Trace Candidate - Adversarial Review Result

Verdict: **NO-GO**

Two BLOCKER findings, both in the refusal behavior of the shared G4 surface:
for specific in-range inputs the candidate returns a different first-failure
classification than the unchanged reference graph. Everything else examined -
the closed input contract, the independently derived schedule for every pair
count, exact binary64 verification of every recorded node against a
reviewer-owned exact oracle, one-trace value binding with digest-rebuilding and
fully forged-trace attacks, checkpoint/readiness promotion resistance,
authority-boundary bytes, and the full repository regression - is clean. Both
blockers have small, local fixes that do not change any accepted value, any
trace layout, or any authority surface; after such a repair a close-only
re-review of the refusal surface would be sufficient.

## 1. Identity, environment, and clean-clone reproduction

| Item                   | Value                                                                                                           |
| ---------------------- | --------------------------------------------------------------------------------------------------------------- |
| Implementation commit  | `12eff9025386eb5b73db107ff4b838613b09174d` (verified)                                                           |
| Implementation tree    | `d66bac8af947f28cf6fc01d00362538d6dd74808` (verified)                                                           |
| Sole parent / baseline | `28a04792fe8dfedd4d858780cf7c2b0a4eaa88c2` = PR #54 merge (verified)                                            |
| Baseline tree          | `d76c479c9259c5e831969e9858ec211b713295cb` (verified)                                                           |
| Implementation delta   | exactly the 9 declared paths, +1,501/-0 (verified)                                                              |
| Review-input head      | `215de9a8cc6f245782964befd13a9ba287a8fd49`; adds only the review protocol and the review-index entry (verified) |
| Review environment     | fresh clone; detached checkouts; Node v22.22.2, pnpm 11.7.0, Linux x86_64                                       |

PR #55 merged into `main` after this PR was opened; per the pinned protocol the
review target was NOT rebased or reinterpreted: all verification ran at the
commits above. The pre-amendment head `25d991e4` (first public CI attempt,
implementation `2f9d89d7`) was fetched and byte-diffed against the current
head: the entire amendment is the protocol's updated commit/tree pins plus
`}, 20_000);` on the single n=2..201 invariance test. The corpus and every
assertion are byte-identical, confirming a time-budget-only change.

Authority boundary: the 9-path delta touches no path under `authority/`,
`registries/`, `spec/`, `schemas`, `conformance/`, `generated/`, `bindings/`,
Release 1, reference verifier dispatch, or `reference/spikes/paired-t.ts`. The
authority snapshot hash recomputed at the review-input head is
`sha256:d934f1781ead93c909571ec2c9af820f178568e999b39628076a38537408ed4c`,
identical to the recorded authoritative constant. Public RFC issue #25 remains
open. All context documents required by the protocol were read at the
review-input head.

## 2. Reviewer separation and source boundary

The reviewer is independent of the implementation authoring context, worked
only from fresh clones of the public repository, and used repository tests as
regression evidence only. Every decision-bearing property below was checked
with reviewer-owned code, an independently derived schedule, a reviewer-owned
exact-rational/integer binary64 oracle, or direct code and byte inspection.
The candidate's schedule builder was never called for expectations, and
`validatePairedTBinary64PrimitiveCandidate` was never used as an oracle
(it is one of the objects under test).

## 3. Independent oracle

A reviewer-owned exact binary64 oracle (BigInt integer arithmetic) implements
roundTiesToEven for add/subtract/multiply/divide over exact dyadic rationals,
exact-rational division rounding, and square root by integer square root with
guard/round/sticky bits and exact tie detection - `Math.sqrt` is never
consulted by the oracle. It models signed zeros per IEEE 754, gradual
underflow, and the ECMAScript overflow rule (magnitude >= 2^1024 - 2^970 to
Infinity). Self-test: 90,029 checks, zero failures - 29 targeted IEEE vectors
(signed-zero table, halfway and adjacent-halfway ties, overflow boundary,
subnormal boundary, sqrt specials) plus 60,000 seeded ordinary operations and
30,000 seeded square roots cross-corroborated against the host's spec-rounded
arithmetic (corroboration only; disagreement would have failed the oracle).

## 4. Per-section evidence

### A/B. Closed input contract, hostile shapes, refusal invariance (60 checks)

Reviewer harness: 5 valid controls (ordinary, reversed insertion, deep-frozen,
null-prototype input and observations) all succeed; reversed insertion yields
the identical trace digest. 26 hostile shapes (missing/extra/inherited/
symbolic/non-enumerable keys, accessor properties on the input, on an
observation, and on an array element, class instance, boxed primitive,
Map, typed array, cyclic input, cyclic and sparse observation arrays, throwing
proxies for prototype, own-keys, descriptor, and value access, hostile
observation records) all refuse with `invalid_candidate_input`, no exception
escapes, every support/composition flag is `false`, and **zero caller
accessors run**. 23 shared-surface comparisons against the unchanged reference
(condition-order and declaration defects, duplicate identifiers, non-finite
outcomes incl. NaN/-Infinity, unknown condition, unit reuse, duplicate pair
condition, incomplete pair, declaration mismatches both ways, multi-defect
insertion-order probes, signed-zero/subnormal/max-finite value cases,
zero-difference variance, single-pair difference overflow) return identical
classifications and identical `pairId`/`observationId` detail. Evaluation
ceilings: 200 and 201 pairs succeed; 202 pairs and a 40,000-observation array
refuse `outside_evaluation_range` with no graph classification leaked. Two
cross-stage ordering probes FAILED equality - Finding F1.

### C. Independently derived schedule, n = 2..201 (2,000 checks)

The only permitted schedule was derived by the reviewer from the reviewed
graph specification (canonical ascending code-unit pair order, one subtraction
per pair, fixed recursive floor-half split reductions in post-order, mean
division, centering, squaring, second reduction, variance division by n-1,
standard-error-squared division by n, square root, t division). For every
pair count 2..201: node count equals the derived formula **5n + 3** (18 at
n=3; 1,008 at n=201); every node's sequence, label, operation, and
operand-source vector equals the derivation; operand bits equal the source
node's result bits or the declared input constants (pair outcome bits and the
binary64 encodings of n and n-1); outcome source sequences equal the derived
positions; outcome bits equal the bound nodes' results; and the digest
independently recomputed from the documented JSON payload order equals
`trace.sha256`. All 102,100 recorded nodes across the sweep were re-verified
against the reviewer oracle - zero mismatches. Observation insertion order
does not alter a successful trace (digest-identical).

Because the maximum successful node count is 5·201 + 3 = 1,008, the 2,048-node
ceiling is unreachable through the public evaluator and acts as
defense-in-depth only; the verifier's structural cap was exercised directly
with a 2,049-node trace (rejected). Counts below/at/above the pair ceiling
were exercised as above.

### D. Exact primitive verification (55,475 checks + 102,100 on-trace)

Standalone corpus with expectations from the reviewer oracle only: 20,046
exact results accepted (targeted exact/inexact/halfway/adjacent-halfway/
cancellation/signed-zero/subnormal/minimum-normal/overflow-adjacent/
maximum-finite/all-sign cases plus a seeded broad corpus, seed
`0x123456789abcdef1`) and **35,424 ±1-ULP perturbations all rejected**; NaN
results, malformed and uppercase hexadecimal, arity and unknown-operation
shapes rejected. Square-root acceptance was judged against the reviewer's
integer-sqrt oracle, not `Math.sqrt`. Scope notes: the verifier rejects
non-finite operands and `sqrt(±0)` as outside its exactly-verifiable model;
both are unreachable in an accepted G4 graph (the Inf-operand behavior is,
however, reachable during refused executions - see Finding F2).

### E. One-trace binding, immutability, digest, coherent attacks (30 checks)

Accepted results are read back from the verified trace (bit equality of
differences, mean, variance, SE, t, df against the bound source nodes,
n=2..201). The returned trace, its input, nodes, outcome, and the result
object are deeply frozen; mutation attempts throw. The digest was reproduced
independently for every trace in the sweep. Coherent attacks (digest and all
dependent fields rebuilt): 19 rehashed mutations rejected - input outcome
bits; a pair rename that changes canonical sort position; a unit rename that
violates the repeated-measurement declaration; pair reorder; declaration
flip; node omission/duplication/reorder; sequence, label, output-source,
output-bit, difference-outcome, pair-count, df, node-count, ceiling, and
format changes; a primitive-invalid result change. A stale-digest-only tamper
is rejected. Two primitive-valid schedule violations (operation flip and
operand-source retarget, each with the exactly rounded replacement result)
are rejected. Two **complete forged traces with internally consistent, exactly
rounded primitives** - a left-fold summation replacing the floor-half split,
and a population-variance (divide-by-n) graph with coherent downstream nodes -
are rejected by the schedule/outcome reconstruction, not by digest staleness.

Bounded acceptance semantics recorded for the report: relabelings that leave
arithmetic, canonical order, and declaration consistency intact (pair rename
preserving sort position, observation/unit rename, condition-order swap with
the same recorded outcomes) produce the honest trace of a _different declared
input_ and are accepted as such; `trace.input` and the digest change, so a
consumer pinning the expected input or digest always detects the swap. This
matches the reviewed tail-only candidate's binding semantics.

### F. Graph and boundary-corpus invariance (543 + 2,000 comparisons)

Reviewer corpus against the unchanged `reference/spikes/paired-t.ts`: all 11
reviewed boundary cases; lexically difficult pair identifiers (`p-10` <
`p-2`, case and punctuation mixes) in both insertion orders; ±0 mixes;
subnormal ladders; cancellation; overflow neighbourhoods; rounding-erased
exact-difference variance (2^53 cases) and its broken variant; variance
underflow; 21 power-of-two-neighbourhood pair counts with mixed exponents;
500 seeded random inputs over broad exponents and signs (seed
`0xdeadbeefcafef00d`); plus the full n=2..201 sweep of section C. Success/
refusal, first-failure classification and detail, pair order, and every
binary64 bit agree - except the two overflow-classification witnesses of
Finding F2 (one crafted, one found independently by the seeded random corpus).
The reference implementation is byte-identical to the baseline.

### G. Verifier and checkpoint hostile shapes; failure isolation (26 checks)

25 hostile trace shapes (null/primitive, missing/extra/inherited/symbolic/
non-enumerable/accessor fields at several nesting levels, class prototypes,
cycles, sparse and proxied node arrays, throwing prototype traps, a
2,049-node array, overlong/uppercase hexadecimal, non-integer and huge
sequence numbers, negative and NaN counts, a 1 MiB label, deep nesting)
all return deterministic nonempty errors, never throw, and invoke zero
caller accessors. Input refusal, evaluation-range refusal, graph refusal,
resource classification, and verification failure remain distinguishable and
none falls through to success or any support claim.

### H. Evaluation limits and denial-of-service boundary

Pair ceiling exercised below/at/above (200/201/202); observation arrays to
40,000 entries refuse quickly by closed length inspection; adversarial
identifiers, giant labels, unknown-key floods, cyclic and aliased structures
fail deterministically. Maximum successful node growth derived independently
as 5n+3 <= 1,008, so the 2,048 node ceiling is not reachable through the
public evaluator (structural cap verified directly; the internal recorder
ceiling is post-push, which is unobservable from the public surface). 201 and
2,048 are treated everywhere as evaluation limits; the checkpoint pins
`maximum_values_are_supported_resource_bounds: false` and every promotion of
either value is rejected (section I). No practical resource concern found.

### I. Readiness, checkpoint, and promotion attacks (143 checks)

`g4-execution-trace-candidate.json` equals the code's expected checkpoint;
an unchanged deep copy and a key-reordered identical copy are accepted.
64 field-level mutations (every top-level and nested scalar/array wrong-value
and deletion), nested extra keys, semantic-array reorder
(`prohibited_claims`), and an accessor-property attack are all rejected.
12 promotion attacks are rejected: review complete, G4 truth-error complete,
tail composition complete, interval composition complete, 201/2,048 promoted
to supported bounds, resource bound or predicate selected, domain claimed,
runtime enabled, issuance flipped, Public Check / Release 2 prohibited-claim
removal. `evidence-readiness.json`: committed file accepted; 32 field
mutations, an undeclared key, deletion of the whole G4 block, and a
seven-flag promotion combination are all rejected - the new readiness block
cannot silently disappear, regress, or promote.

### J. Documentation truthfulness and full regression

The changed documents separate, in words matching the checkpoint pins: exact
reproduction of the reviewed graph; exact primitive verification; the missing
G4 mathematical-truth error ledger; the missing tail and confidence-interval
composition; review-only pair/node ceilings explicitly "not supported
resource bounds"; the unselected predicate and platform; the unsupported,
unissued, non-authoritative status; and incomplete R2-D5/Release 2 state.
No overstated claim was found (the findings below concern behavior, not
documentation claims).

Fresh-clone regression at the review-input head: `pnpm install
--frozen-lockfile`; the two focused test files pass 27/27; the full
`pnpm check` (format, Markdown lint, typecheck, registry/authority/
private-dependency/code-path audits, full test suite 40 files / 422 tests,
generated-file diff, Phase 1 + Phase 2A suites, oracle comparison) passes end
to end with exit 0; the working tree is clean afterward. No environment
workaround was needed in this review environment.

## 5. Findings

### F1 (BLOCKER) - first-failure order: structural pair defects preempt an earlier pair's difference overflow

The reference walks the canonically sorted pairs once, checking
INCOMPLETE_PAIR / EXPERIMENTAL_UNIT_DECLARATION_MISMATCH and computing the
difference with its DIFFERENCE_OVERFLOW check per pair
(`reference/spikes/paired-t.ts` lines 209-230). The candidate splits this
into a parse-time structural loop over all pairs
(`paired-t-g4-execution-trace-candidate.ts` lines 461-486) followed by a
separate execution-time difference loop (lines 592-604). For an input whose
earlier sorted pair overflows while a later sorted pair is structurally
defective, the two implementations report different first failures.

Witnesses (both empirically confirmed):

- pairs `p-000` = (MAX_VALUE, -MAX_VALUE), `p-001` = (3, 1), plus a lone
  observation in `p-900`: reference `DIFFERENCE_OVERFLOW {pairId: p-000}`,
  candidate `INCOMPLETE_PAIR {pairId: p-900}`;
- the same overflow pair with a later pair violating `within_pair_only`:
  reference `DIFFERENCE_OVERFLOW {pairId: p-000}`, candidate
  `EXPERIMENTAL_UNIT_DECLARATION_MISMATCH {pairId: p-900}`.

Both classifications exist in both implementations; the ordering of existing
classifications diverges on in-range inputs, which the review protocol
(section B) designates a blocker. Values and refusal behavior for all
single-defect inputs are identical. Local fix: perform the completeness,
declaration, and difference-overflow checks per pair inside one sorted loop,
exactly as the reference does; accepted traces are unaffected.

### F2 (BLOCKER) - reduction-tree overflow misclassified as `execution_trace_verification_failed`

The recorder verifies every node immediately. The exact primitive verifier
accepts an Infinity RESULT produced by finite operands (correct overflow
rounding) but rejects any non-finite OPERAND. When a floor-half reduction
overflows at a non-root add, the parent add consumes that Infinity as an
operand, the per-node verification throws, and the candidate refuses with
`classification: "execution_trace_verification_failed"` (trace error
"binary64 primitive result is not the exact roundTiesToEven result") before
the graph's own post-reduction finiteness check can classify the refusal.
The reference classifies these inputs `MEAN_ACCUMULATION_OVERFLOW` /
`VARIANCE_ACCUMULATION_OVERFLOW`.

Witnesses (empirically confirmed; root-overflow controls agree):

- n=3, differences [1, MAX_VALUE, MAX_VALUE/2]: reference
  `MEAN_ACCUMULATION_OVERFLOW`, candidate
  `execution_trace_verification_failed`; the n=2 root-overflow analogue
  matches correctly on both sides;
- n=4, outcomes built from b = 1.2e154 as [b,0], [-b,0], [b,0], [-b,1]:
  reference `VARIANCE_ACCUMULATION_OVERFLOW`, candidate
  `execution_trace_verification_failed`; the n=2 analogue matches. The
  seeded random corpus independently produced a third witness (case 87,
  seed `0xdeadbeefcafef00d`).

This replaces an existing reviewed graph classification with a
candidate-level verification-failure classification on in-range inputs, and
mislabels an in-graph arithmetic overflow as a trace-verification failure.
Local fix options that leave accepted traces byte-identical: check
finiteness after each reduction add before recording the next node, or map
the Inf-operand primitive failure at the reduction stages to the graph's
overflow classification.

No SHOULD-FIX or NICE-TO-HAVE findings beyond these; the scope notes in
sections D and E above are recorded observations, not defects.

## 6. Limitations and unreviewed claims

- This review evaluates the trace candidate only. It establishes no G4
  mathematical-truth error bound, no composition with the Student-t tail or
  confidence-interval traces, no supported pair/df/node bound, no platform,
  domain, runtime, or supported-execution predicate, and no Public Check,
  bundle, R2-D5, or Release 2 state.
- The oracle's host cross-corroboration uses one engine build; the exact
  semantics were established by construction and targeted IEEE vectors, not
  by the host.
- The `execution_trace_resource_bound_exceeded` classification is not
  reachable through the public evaluator (maximum 1,008 nodes) and was
  exercised only via the verifier's structural cap.
- Findings F1/F2 concern refused inputs only; no accepted input produced a
  wrong value, trace, or claim anywhere in this review.

## 7. Deliverable identity

- Branch: `review/r2-d5-g4-execution-trace-candidate-12eff90`, based on the
  public review-input commit `215de9a8`.
- This file is the only addition; no implementation, test, checkpoint,
  readiness, protocol, generated, or authority file is modified, and the
  working tree was clean after all verification runs.

## 8. Verdict

**NO-GO** - solely on findings F1 and F2, which are protocol-designated
blockers on the shared refusal surface. Every other examined property of the
candidate - the closed contract, the independently derived deterministic
schedule, exact binary64 verification of every recorded primitive, one-trace
value binding with digest and forged-schedule resistance, fail-closed
checkpoint/readiness state, authority-boundary integrity, and full
regression - passed adversarial review. After the two local refusal-order
repairs, a bounded close-only re-review of the refusal surface (sections B
and F of the protocol) would suffice; no re-review of the accepted-trace
semantics is indicated by anything found here.
