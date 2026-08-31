# R2-D5 G4-to-Tail Trace Composition Candidate - Adversarial Review Result

Verdict: **GO**

The composition is exact, fail-closed, non-authoritative, unissued, and
non-runtime. The decision-bearing handoff - the verified G4 trace's
test-statistic bits and integer df becoming, bit for bit, the verified tail
trace's input - holds on every examined success and is enforced by the
verifier against valid-trace swaps and coherently re-digested link rewrites.
Both nested traces are re-verified by the reviewed verifiers rather than
trusted by digest, the returned p-value is read from the verified tail trace
with its source sequence (including the exact-zero `null`) preserved, refusal
stages remain separated, every hostile shape fails closed with zero caller
accessors invoked, the checkpoint rejects all promotion attacks, and
readiness/authority bytes are unchanged. Zero findings; one recorded design
observation (O1) below.

## 1. Exact identities

| Item                       | Value                                                                                                           |
| -------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Review-input head (PR #60) | `c8cfed942e56922dc22e0fa2f10dafd74de3c8f3`                                                                      |
| Base = PR #59 merge        | `81c2d2ba12849fc680ea3122c079fb2e79c2785f` = merge-base; head is its direct child, ahead-only, exactly 1 commit |
| Actual delta               | exactly 4 added files, +1,180/-0, zero modified or deleted paths                                                |
| Head stability             | identical at review start and end                                                                               |
| Environment                | fresh clone, detached checkout; Node v22.22.2, pnpm 11.7.0, Linux x86_64                                        |

Added paths match the commission exactly: the composition implementation and
test, the composition checkpoint JSON, and the review protocol (whose
sections A-K governed this review and were read in full, together with the
full implementation, test, and checkpoint).

## 2. Underlying implementation invariance

The delta is add-only, so every pre-existing byte is untouched; this was
verified explicitly for `reference/spikes/paired-t.ts`, the G4 and
supported-execution (tail) candidate implementations, the inverse-beta table
and table integration, the truth-error implementation,
`evidence-readiness.json`, `paired-t-numerical-readiness.ts`, and everything
under `authority/`, `registries/`, `spec/`, `conformance/`, `generated/`,
and `bindings/` (path-set count over those prefixes: 0). The authority
snapshot recomputed at the head is
`sha256:d934f1781ead93c909571ec2c9af820f178568e999b39628076a38537408ed4c`,
identical to the recorded authoritative constant.

## 3. Reviewer battery results (291 checks, 0 failures)

All decision-bearing properties below were established with a reviewer-owned
battery against the head, using the two reviewed evaluators directly as
cross-references and reviewer-written rehash helpers for all three digest
layers (G4 payload digest, tail byte-grammar digest, outer link digest);
a no-op rehash control reproduced all three honest digests exactly, so every
rejection below is semantic, not digest staleness.

### Raw observations -> G4 binding and direct-comparison corpus (batteries C/E of the protocol)

11 deterministic success cases spanning df 1, 2, 4, 9, 30, 149, and 200
(= the 201-pair ceiling), the exact-zero branch, central branches (|t| < 1),
and positive and negative series branches. For every case the composition,
the directly-called G4 evaluator, and the directly-called tail evaluator
(fed the G4 t and df) agree completely: the embedded G4 trace and result are
deep-equal to the direct G4 run; the embedded tail trace (branch, nodes,
proof inputs, outcome) is deep-equal to the direct tail run; and the
independently recomputed outer digest equals `composition.sha256`.
Observation insertion order canonicalizes to identical G4, tail, and outer
digests. A verifier control run accepts each clean composition clone. On
every success and every refusal all support/maturity flags are `false`, and
`tailProof` carries `truthErrorBoundSelected: false` with source
`same_execution_trace_as_returned_value` - the tail proof is not extended to
any G4 truth bound.

### Exact G4 -> tail handoff (battery D)

For all 11 cases, bit-level equality was checked directly:
`g4_trace.outcome.test_statistic_binary64_hex ===
tail_trace.input.test_statistic_binary64_hex` and integer df equality, plus
all nine link bindings (both trace digests, G4 t source sequence, G4 t bits,
G4 df, tail input bits, tail input df, p-value bits, p-value source) against
the embedded traces, and `hex(result.testStatistic)` equal to the G4 outcome
bits. The exact-zero case pins the `+0` handoff (`0000000000000000`) with
p = 1 and `p_value_source_sequence: null` preserved end to end. Decimal-only
equality can not slip through: the verifier compares the 16-digit hex
strings, and the evaluator's number-typed handoff is bijective for all
reachable values (finite, never NaN; `-0` is unreachable as a G4 t, and the
hex comparison would catch any slip regardless).

### Valid-trace swap attacks (battery C; 3 swaps)

- **C1** - a fully valid tail trace for different `(t, df)` was swapped in
  with the ENTIRE link rebuilt field-for-field from both embedded traces and
  the outer digest recomputed, so link consistency and digest checks all
  pass; rejection comes precisely from the handoff invariant ("tail trace
  input is not the exact G4 test-statistic bits and df"). Rejected.
- **C2** - a fully valid G4 trace from a different raw dataset (different t),
  same coherent rebuild. Rejected via the same handoff invariant.
- **C3** - a valid G4 trace from a DIFFERENT raw dataset with IDENTICAL
  `(t bits, df)` was constructed by exact power-of-two scaling (doubling all
  outcomes scales every graph operation exactly; t is scale-invariant
  bit-for-bit; witness verified: same t hex, same df, different G4 digest).
  The coherent swap is accepted - see observation O1.

### Coherent outer-digest attacks (battery D; 9 + 1)

Each of the nine link fields was mutated individually with the outer digest
correctly recomputed by the attacker: G4 digest, tail digest, G4 t source
sequence, G4 t bits, G4 df, tail t bits, tail df, p bits, p source. All nine
digest-valid-but-relationship-false rewrites are rejected (the verifier
rebuilds the expected link from the verified nested traces and requires deep
equality, then checks the handoff). A stale-digest control is also rejected.

### Nested-trace verification (battery E; 9 + control)

Nested mutations with the nested digest, the link, and the outer digest ALL
coherently rebuilt: G4 node result, G4 operand source, G4 outcome bits, G4
node omission; tail operation node, tail dependency, tail inverse-beta
binding, tail p-value source, tail proof-input field. All nine are rejected
by the nested re-verification (`verifyPairedTG4ExecutionTraceCandidate` /
`verifyPairedTExecutionTraceCandidate` run inside the composition verifier),
proving declared nested digests are never trusted.

### Returned p-value provenance (battery F)

Returned `pValueBinary64Hex`, `hex(pValue)`, `link.p_value_binary64_hex`,
and the verified tail trace's `outcome.p_value_binary64_hex` are identical in
all cases; the source sequence is bound and `null` is preserved on the
exact-zero branch; non-zero branches carry the tail trace's source node.

### First-failure and refusal separation (battery H)

- G4-stage refusals preserved with their classifications:
  `DIFFERENCE_OVERFLOW`, `INCOMPLETE_PAIR` (graph refusals) and
  `outside_evaluation_range` (202 pairs) all surface as `g4_stage_refusal`
  with no tail field present and no tail execution exposed.
- Tail-stage refusal preserved: a G4 SUCCESS whose t is subnormal
  (differences [1, -1, 0, 9e-320], df 3) refuses as `tail_stage_refusal`
  carrying the tail classification - not collapsed into
  `composition_verification_failed`.
- Genuine link falsehoods (batteries C/D above) are
  `composition_verification_failed`.
- Every refusal keeps all support flags `false`.

### Hostile shapes (battery I; 20 shapes x verifier and checkpoint + accessor guard)

null/primitive/array, missing and extra keys, accessor and inherited
properties, custom prototypes, symbol keys, sparse nested node arrays,
throwing own-keys and prototype proxies, cyclic links, malformed and
overlong SHA-256 and binary64 hex, wrong-typed df, negative source
sequences, fractional df - all 20 fail closed on both the composition
verifier and the checkpoint validator, no exception escapes, and **zero
caller accessors ran**.

### Immutability (battery J)

The returned composition, link, both nested traces, their node arrays and
first nodes, and the result object are frozen; five targeted mutation
attempts all throw and change nothing.

### Checkpoint promotion battery (battery K; 100 mutations)

The committed `g4-tail-trace-composition-candidate.json` is accepted exactly
(and equals the code's expected checkpoint); a key-reordered identical copy
is accepted. All 80 field-sweep mutations (every scalar/array wrong-value
and deletion at every nesting level) and all 18 promotion attacks are
rejected: `runtime_support_enabled`, `supported_domain_claimed`, readiness
`held_pending_independent_adversarial_review` -> `admitted`, the
readiness-changed flag, fabricated implementation/composition-review/truth-
bound/CI-composition closure, resource-bound or predicate selection,
prohibited-claim removal, replacement, and reordering, hidden
`supported`/platform/runtime keys, issuance flip, and review-issue
retargeting.

## 4. Readiness and authority invariance (batteries L/M)

`evidence-readiness.json` and `paired-t-numerical-readiness.ts` are
byte-identical between base and head (diff length 0);
`tail_trace_composition_complete` remains `false`. The checkpoint itself
pins `evidence_readiness_changed_by_this_increment: false` and
`admission_state: held_pending_independent_adversarial_review`. No
authority, registry, schema, conformance, generated, Public Check, bundle,
dispatch, or Release 1 byte changed; the authority snapshot hash is
unchanged (section 2).

## 5. RFC state (battery N)

Issue #25 is OPEN with the public review window OPEN, highest affected tier
STABLE-INTENT, minimum window 30 calendar days, and pinned earliest decision
`2026-09-25T20:52:54Z` (`2026-09-26T05:52:54+09:00`). Nothing in PR #60 or
its checkpoint suggests RFC closure, a final R2-D5 decision, or Release 2
approval; `r2_d5_complete` and `release_2_complete` sit in the prohibited-
claims list and their removal is rejected.

## 6. Regression

Fresh clone at the head: `pnpm install --frozen-lockfile` then the full
`pnpm check` pass end to end (exit 0; 431 tests), with a clean tree
afterward. Focused runs of the composition, G4, and supported-execution test
files pass 3 files / 31 tests. CI corroboration bound to the exact head
`c8cfed94...`: CI #181 (`33374493421`), Release 2 paired-t candidate
evidence #47 (`33374493385`), and runtime-series candidate evidence #37
(`33374493381`) - all success.

## 7. Findings

- BLOCKER: none.
- SHOULD-FIX: none.
- NICE-TO-HAVE: none.

**O1 (design observation, no action required)**: when a valid G4 trace from
a different raw dataset carries an IDENTICAL `(t bits, df)` (the reviewer
constructed such a witness by exact power-of-two scaling), a fully coherent
swap yields the honest self-contained composition of the OTHER dataset and
is accepted; the embedded `g4_trace.input`, the G4 digest, and the outer
digest all visibly change, so a consumer pinning the expected input or any
digest always detects the substitution. This is the same self-contained
binding semantics as both reviewed underlying candidates, and the protocol's
handoff invariant (which requires rejection only when the handoff bits
differ) is satisfied. Provenance to a specific raw dataset is carried by the
embedded G4 trace and its digests, not by the `(t, df)` pair alone.

## 8. Quantities

- Corpus: 11 composed success cases x ~10 direct-comparison checks each,
  plus exact-zero and insertion-order cases.
- Swap attacks: 3 (C1/C2 rejected via handoff; C3 witness per O1).
- Coherent link-rewrite mutations: 9 + stale-digest control (all rejected).
- Coherent nested mutations: 9 + no-op rehash control (all rejected).
- Hostile shapes: 20 against each of two surfaces + accessor guard.
- Checkpoint mutations: 80 field sweep + 18 promotions + 2 acceptance
  controls.
- Battery total: 291 checks, 0 failures; caller accessors invoked: 0.

## 9. Non-claims

`GO` means only that PR #60 may be retained/merged as an unissued,
non-authoritative G4-to-tail trace composition implementation candidate. It
does not mean the composition is reviewed-and-admitted into readiness (that
synchronization is a separate increment), and it approves none of the
following, which all remain open: a G4 mathematical-truth error bound;
readiness admission of the G4-to-tail composition; confidence-interval
composition; supported resource bounds; a supported platform; a supported
execution predicate; a supported domain; runtime support; the final
reason-code freeze; a Public Check; a bundle; R2-D5 completion; RFC closure
(issue #25 remains open); Release 2.

## 10. Deliverable identity

- Branch: `review/r2-d5-g4-tail-trace-composition-candidate-c8cfed9`, based
  on the review-input head `c8cfed94...`.
- This file is the only addition; no implementation, test, checkpoint,
  protocol, readiness, authority, or other repository file is modified, and
  the working tree was clean after all verification runs.
