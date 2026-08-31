# R2-D5 supported-execution predicate candidate — independent adversarial review result

## Verdict

**GO.**

Implementation commit `cb4bfbc9417d0b837972acf7c2c45c6e54d888e1` may be merged as an unissued,
non-authoritative supported-execution predicate candidate. Zero `BLOCKER`, zero `SHOULD-FIX`,
zero `NICE-TO-HAVE` findings. No new primary-source research is required: the increment selects
no new numerical formula, error bound, or statistical method, and its trace is bit-for-bit
identical to the already-reviewed graph and truth-error proof.

This `GO` does not approve a runtime allowlist, enforce the controlled-process profile, select
the 100,000-node ceiling as a resource bound, complete cross-platform admission, claim a
supported platform or domain, issue a reason code, authorize a Public Check or bundle, complete
R2-D5, or publish Release 2. Public RFC issue #25 remains **open**; its state authorizes no
support or issuance.

## 1. Identity and environment

| Item                   | Value                                                                                                                |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Repository             | `https://github.com/licklider-ai/nomue-protocol`                                                                     |
| Implementation commit  | `cb4bfbc9417d0b837972acf7c2c45c6e54d888e1` (verified)                                                                |
| Implementation tree    | `bf652f8e256aee71b0bdf5e926741ef864c21165` (verified)                                                                |
| Sole parent / baseline | `43e02f366982fc7a8e1e5774235584e9755abb46` (verified single parent)                                                  |
| Baseline tree          | `2f4da1b8283dce61dc4bcdaf167bbda48759bac6` (verified)                                                                |
| Baseline identity      | Merge of PR #51 (verified merge parents `cb4c04ad…` and `80a5e788…`)                                                 |
| Review-input commit    | `e8fd88e2f9a421274fc1644d8b4b0f03fe303f6b` (sole parent is the implementation commit; adds only the review protocol) |
| Review type            | Independent, adversarial, delta-scoped; genuine fresh clone, detached exact-hash checkouts                           |
| Environment            | Node v22.22.2, V8 12.4.254.21-node.39, pnpm 11.7.0 (corepack), Linux x64; reviewer oracle in CPython 3.12.3          |

The baseline-to-implementation delta is exactly the eleven declared paths (three added, eight
modified) with **3,312 insertions and 15 deletions**; `git diff --check` reports no whitespace
errors; no other path, mode, or artifact changed. The three reviewed evidence-bound sources —
`paired-t-runtime-series-candidate.ts`, `paired-t-truth-error-support-candidate.ts`, and the
inverse-beta table bytes — are byte-identical to the baseline. All required repository context
and the four independent primary-source research role results were read.

## 2. Reviewer separation and shared-library limitation

Every decision-bearing claim rests on reviewer-owned code, an independently derived exact
oracle, or direct source inspection; repository tests were used only as additional regression
evidence. The exact-arithmetic oracle (below) is written in Python/`fractions` and shares no
code with the candidate's rounding implementation. As the research disposition itself records,
the candidate's checker runs inside the same trusted ECMAScript runtime it verifies and cannot
defeat a malicious engine that corrupts both Number and BigInt; this GO is within that stated
non-malicious pinned-runtime boundary and does not claim otherwise.

## 3. Primary-source premise (independently re-verified)

The research withdrew an implementation report's ECMAScript-2024 `Math.sqrt` claim. I verified
the standard directly from the pinned `tc39/ecma262` tags (tc39.es is egress-blocked; the git
tags are the same normative source):

- **es2024** `Math.sqrt`: "Return an implementation-approximated Number value representing the
  result of the square root of ℝ(_n_)."
- **es2025** and **es2026** `Math.sqrt`: "Return 𝔽(the square root of ℝ(_n_))." — correctly
  rounded.
- `Number::add/subtract/multiply/divide`: the 2025/2026 editions return `𝔽(ℝ(x) ∘ ℝ(y))`, and
  the "Number value for _x_" clause states verbatim that its selection "corresponds exactly to
  the behaviour of the IEEE 754-2019 roundTiesToEven mode."

The corrected premise the candidate is built on (current ECMAScript supplies observable
roundTiesToEven binary64 for the tail graph's `+ − × ÷` and `Math.sqrt`; identity and finite
tests do not attest to a deployed invocation) is source-accurate. The candidate correctly keeps
the runtime rounding-cell check as a fail-closed implementation check regardless, matching the
normative-semantics investigator's non-guarantee.

## 4. Exact binary64 primitive verification (question A)

A reviewer-owned exact oracle — round-to-nearest-ties-to-even of exact `fractions.Fraction`
operands, with the spec overflow rule and IEEE signed-zero rules, calling neither the
candidate's validator nor its rounding code — was first self-checked against host IEEE floats
over 120,000 ordinary and 60,000 square-root cases with **zero** mismatches, then used to drive
`validatePairedTBinary64PrimitiveCandidate`:

- **80,039 ordinary vectors** (`add/subtract/multiply/divide`) spanning targeted classes —
  exact/halfway/just-below/just-above-halfway, cancellation to ±0, minimum subnormal, the
  subnormal↔normal boundary, gradual underflow, largest finite, overflow to ±∞, the
  finite/overflow adjacency and its halfway-to-∞ case, every sign combination, and division-,
  NaN-, and infinity-refusal boundaries — plus a 60,000-case broad random corpus and 20,000
  near-cancellation pairs: **zero incorrectly accepted, zero incorrectly rejected, zero
  off-by-one (±1 ULP) accepted, zero uncaught exceptions.**
- **45,017 square-root vectors** verified by exact rounding-cell containment (host `Math.sqrt`
  used only as a candidate seed, never as the oracle): exact squares, adjacent values,
  subnormals, the normal/subnormal boundary, odd/even significands, near-max finite, and
  random normal/subnormal inputs — **zero wrong accepts, zero off-by-one accepts.** The two
  oracle "rejections" were sqrt(±0), which the candidate deliberately refuses (its positive
  proof domain never takes sqrt of zero); a fail-closed choice, not a defect.
- The `absolute` and `maximum` selectors preserve exact bit identity including signed zero
  (verified in the trace-node semantics: `absolute` clears only the sign bit, `maximum` returns
  the exact operand bit pattern of the `>=` winner).

The verifier rounds only in roundTiesToEven; no other rounding mode appears.

## 5. Actual-trace completeness, immutability, and schedule (questions B, C)

The returned p-value and the proof input are read from **one** trace. In the source,
`executeTracedGraph` records each operation into a `TraceRecorder`; `finalize` binds the graph's
`pValueSourceSequence`/`remainderSourceSequence` (the recorded node sequence numbers) and the
proof-input fractions computed from that same execution, then the composed evaluator both
returns `graph.pValue` and verifies the finalized trace — there is no second replay whose bits
merely agree.

I recomputed the SHA-256 digest independently from the documented byte grammar and it matched
the emitted `sha256`. The trace object, node array, individual nodes, and their operand arrays
are all `Object.isFrozen`, and an ordinary in-place mutation of a node result threw in strict
mode and left the value unchanged.

Twenty coherent attacks — each rebuilding the digest and all directly dependent fields so only
the semantic check can catch them — were all rejected while a coherent no-op control passed:
omitted node, duplicated node, reordered pair, duplicate label, renamed label, changed
operation, changed operand, changed result, changed table cell, changed table hash, changed
branch, changed iteration count, changed cap, changed proof index, changed exact proof
fraction, changed returned value, rebound p-value source, and a stale-digest control. Two
decisive cases were rejected specifically: a **graph/proof divergence** that flips one
intermediate result's bit while preserving the final p-value node (rejected: the changed node
fails exact verification and its operand dependents break), and **individually valid operations
placed in an invalid graph order** (rejected against the independently reconstructed schedule).

The verifier reconstructs the closed schedule from `(branch, iterations, df)` via
`expectedTraceSchedule` and compares each node's label and operation to that reconstruction — it
does not trust the trace to declare its own schedule. Schedule attacks confirmed this:
declaring fewer or one-extra iterations, a cap/iteration disagreement, a branch mislabel, and a
truncated node array (false early termination) were all rejected. Proof gamma indices and the
series-remainder multiplier are re-derived per node from the reconstructed schedule
(`traceNodeGammaIndex`/`expectedProofInputFromTrace`) and the exact truncation and relative
fractions are recomputed, not trusted. The exact integer coefficient nodes (`half_df`, the
`.numerator_*`/`.denominator_*` control terms) are held outside the roundoff ledger only where
they are exact safe-integer/BigInt control arithmetic, verified by `isExactCoefficientTraceNode`
returning gamma index 0 for exactly those labels.

## 6. Graph, proof, and evidence invariance (question D)

A reviewer-owned corpus of 1,360 inputs — every integer df 1–200 (random central, exactly 1,
both cells around |t|=1, ordinary and deep tails) plus, for ten selected df including 2, 72,
197, and the longest-series df 200: ±0, ±1 and adjacent cells, minimum subnormal, minimum
normal, `t=20`, the pinned `t=50.4` witness, `1e308`, and maximum finite — compared the new
candidate against the reviewed table-integration graph and the reviewed truth-error evaluator.

Result across all 1,272 accepted and 88 refused cases: the candidate's returned branch, p-value
bits, iteration count, and cap equal the reviewed **graph** exactly; its full proof surface
(all three gamma indices, remainder multiplier, truncation and relative bounds, ULP bound,
`sqrtRoundingCellChecks`) and projection margin equal the reviewed **truth-error** evaluator
bit-for-bit; and every refusal classification agrees, including the closed-input and
graph-range boundaries. **Zero non-permitted differences.** The df 197 / t 50.4 witness carries
p-bits `284f4ce6230625df`, a 220-node trace, and its reviewed bound; exact-zero returns
`3ff0000000000000` with an unbound (null-source) p-value the verifier binds to that exact
constant. The inverse-beta table hash
(`sha256:ba1f992199e9e153956589d62dcf5a6509575100bb7c923c170bfa45fdd76c08`), the fixed-95,
runtime-table, truth-error, and runtime-input reason-code checkpoints, and every other reviewed
numerical artifact are byte-unchanged; the authoritative snapshot hash is unchanged (section 9).

## 7. Diagnostics and hostile runtime objects (question E)

The startup and pre/post-invocation sentinels were exercised directly: each hard-coded ordinary
and square-root vector, the negative-zero check, and the intrinsic/runtime-identity binding all
pass, and the result marks them `diagnosticOnly: true`. Trace verification remains necessary
after they pass — a valid result always runs the full trace verifier regardless. Replacing
`Math.sqrt` after startup with a same-value but different-identity function caused the candidate
to refuse with `execution_diagnostic_failed` (the `intrinsicsUnchanged` identity check fires),
and behavior restored when the intrinsic was restored.

Hostile objects into every public surface (`evaluate…`, `verify…`, `validate…Primitive`,
`validate…Checkpoint`) — null, undefined, arrays, primitives, cyclic objects, getters, setters,
inherited-field objects, symbol-keyed objects, custom prototypes, and a proxy throwing from
`getPrototypeOf`/`ownKeys`/descriptor/get traps — produced **zero uncaught exceptions and zero
support claims**. A dedicated instrumentation pass placing a value getter/setter on every data
key of every surface (including nested trace nodes, operand arrays, and checkpoint fields)
recorded **zero data-property accessor invocations**; the only trap hits were the throwing
proxy's structural traps, which the implementation reaches through `Reflect` and safely catches.
The checkpoint, primitive, and readiness validators each returned nonempty error arrays (never
threw) on hostile shapes.

## 8. Resource exhaustion, allowlist, and profile (questions F, G)

The review-only lower-limit entrypoint enforces the node bound exactly: limits of 0, 1, and one
below the actual node count refuse with `execution_trace_resource_bound_exceeded`; the exact
actual count and the 100,000 ceiling accept; negative, over-ceiling, and non-integer limits
refuse. An oversized (10,001-digit) proof-fraction trace was rejected deterministically without
an exception (the parser caps decimal fields at 10,000 digits). The `maximum_node_count_…` field
is `false` for "supported resource bound," and I treat 100,000 only as the evaluation ceiling —
this GO selects no resource bound.

The checkpoint's `runtime_allowlist.entries` is empty with selection state
`held_pending_exact_release_build_and_platform_evidence` and
`process_identity_alone_establishes_support: false`; the controlled-process profile
`paired-t-tail-pure-js-single-invocation-profile-1` lists the five required exclusions
(unreviewed native addons, WASI, worker threads, user callbacks during evaluation, runtime
intrinsic replacement) with `enforced_by_this_candidate: false`. Sixteen promotion attacks —
populating the allowlist, marking it selected, enabling runtime/predicate/platform support,
enforcing the profile, dropping an exclusion, treating the node ceiling as a resource bound,
completing the matrix, issuing a reason code, including G4, rewriting the historical checkpoint,
and dropping a prohibited claim — were **all 16 rejected** by the checkpoint validator, with the
unchanged copy accepted. The candidate is tail-only; nothing infers upstream G4 coverage
(`scope.upstream_g4_data_to_statistic_graph_included: false`).

## 9. Checkpoint, readiness, and authority attacks (question I)

Reviewer-owned coherent mutation harnesses walked every field at every nesting level of both the
supported-execution checkpoint and the numerical-readiness document (eight retypes per key plus
deletion and an undeclared sibling), followed by hostile shapes:

- **checkpoint validator: 902 real mutations rejected, zero leaks, zero throws, zero hostile
  accepted**, unchanged copy accepted; it rejects symbol-keyed, accessor, non-JSON, cyclic, and
  throwing-proxy inputs via its own `canonicalizeJson`.
- **readiness validator: 1,896 mutations rejected, zero leaks, zero throws**, unchanged copy
  accepted. One hostile shape — an added symbol key — is accepted, but this is the pre-existing
  numerical-readiness validator behavior (identical on the baseline checkout) and is
  JSON-unreachable: a symbol key does not survive `JSON.stringify`, so no real document can carry
  one. Not introduced by this delta and not a real-document risk.

Authority: the delta touches no `registries/`, `schemas/`, `conformance/`, `reference/`, `spec/`,
`authority/`, `bindings/`, `generated/`, or `evidence/` path; the content-addressed authority
snapshot is byte-identical at baseline and implementation
(`sha256:d934f1781ead93c909571ec2c9af820f178568e999b39628076a38537408ed4c`); Release 1 behavior
is untouched; no supported df maximum, public reason code, Public Check, or bundle changes. The
readiness block adds only the incomplete-candidate record (artifact/validator/surface paths,
`trace_format`, `maximum_trace_nodes_candidate: 100000`, and every allowlist/profile/matrix/
predicate/support flag false), pinned by the readiness validator.

## 10. Cross-platform admission and CI (question H)

The CI delta adds one focused-test step (`vitest run …supported-execution…`) to the three
existing Windows/macOS/Linux-arm validation jobs; the Windows x64, macOS arm64, and Linux arm64
runners are pre-existing baseline jobs, not new matrix members. On the review-input head
(`e8fd88e2…`) all five jobs concluded success — Full check (Linux x64), Full check (Linux x64,
Node 24), and Phase 1+2A validation on Windows x64, macOS arm64, and Linux arm64 — each
publishing an env-report artifact. Locally I reproduced the focused corpus and full check on
Linux x64 / Node v22.22.2 / V8 12.4.254.21-node.39. This is admission evidence for the tested
tuples only; per the checkpoint it does not complete the matrix, populate the allowlist, or
select a platform, and I make no such inference. Runner-image and per-tuple digest retention
across every proposed member remains open evidence, correctly marked
`cross_platform_admission_evidence: pending`.

## 11. Documentation truthfulness (question J)

The candidate README, numerical README, steward package, and runtime-series README consistently
distinguish exact verification of the actual tail execution from the diagnostic sentinels, the
drafted-but-unenforced process profile, the empty unselected allowlist, incomplete admission
evidence, the unselected 100,000-node ceiling, the tail-only scope with the upstream G4 graph
explicitly excluded, and an unissued candidate with runtime support disabled. No wording calls
the candidate a supported execution, supported platform, complete matrix, final predicate, or
Release 2 completion; the successful result "says only that the arithmetic execution was
verified," with `supportedExecutionPredicateSatisfied`, platform, domain, and runtime support
all false. Truthful.

## 12. Regression execution

From the fresh clone at the review-input commit: `corepack pnpm install --frozen-lockfile`
succeeded; `corepack pnpm check` exited 0 (full suite); the focused supported-execution and
numerical-readiness tests passed 32/32; `git status --porcelain` is empty afterward with `HEAD`
at the exact commit. The `tsx` entry points ran normally in this environment, so no alternate
invocation was needed.

## 13. Findings

None. No `BLOCKER`, no `SHOULD-FIX`, no `NICE-TO-HAVE`. No new primary-source research is
required before merge.

## 14. Residual limitations

- The exact checker executes inside the same trusted ECMAScript runtime it verifies; it is
  fail-closed against drift, intrinsic mutation, and backend deviation within a non-malicious
  pinned-runtime threat model, not against a malicious engine that corrupts both Number and
  BigInt. Stated by the research and by the candidate; unchanged by this GO.
- Cross-platform admission evidence is per-runner and incomplete; green CI covers only the
  tested tuples and selects no platform.
- The candidate is tail-only; the upstream G4 data-to-statistic graph is outside its proof.
- Reviewer verification of tc39.es was performed against the pinned `tc39/ecma262` git tags
  because the live site is egress-blocked here; the tags are the same normative text.

## 15. Explicitly unapproved

This GO permits merge of the exact commit as an unissued, non-authoritative candidate only. It
does not approve a runtime/build/platform allowlist, enforce the controlled-process profile,
select the 100,000-node ceiling as a resource bound, complete cross-platform admission, claim a
supported platform or domain, select the supported-execution or truth-error predicate, select a
supported df, issue a reason code, authorize a Public Check or bundle, complete R2-D5, close
issue #25, or publish Release 2.

## Provenance

- Contributor role: independent adversarial reviewer, separate from the implementation authoring
  context; the same reviewing role that produced the prior R2-D5 review results referenced in
  the required context.
- Review scope: the eleven-file delta `43e02f36…` → `cb4bfbc9…` (tree `bf652f8e…`), the review
  protocol at `e8fd88e2…`, the four primary-source research role results, and the unchanged
  reviewed graph/truth-error/table sources as dependencies.
- Independently derived oracles and seeds: exact `fractions`-based binary64 oracle
  (self-checked against host IEEE, 180,000 cases, zero mismatch); ordinary/sqrt vector corpus
  (Python `random`, seed `0xC0FFEE`); invariance corpus (LCG seed `0xa5a5f00dcafe1234`);
  trace, checkpoint, and readiness mutation harnesses (reviewer-owned, coherent digest rebuild).
- Mutation counts: primitive 125,056 vectors + ±1-ULP probes; trace 20 coherent attacks + control;
  checkpoint 902 rejected; readiness 1,896 rejected; 16 promotion attacks rejected; schedule 5
  attacks rejected; resource 8 boundary cases; hostile shapes across 4 surfaces with 0 accessor
  invocations.
- Per-runner CI: Linux x64, Linux x64/Node 24, Windows x64, macOS arm64, Linux arm64 all green
  on `e8fd88e2…` (run 33341898202); no proposed runner was unavailable.
- Date: 2026-08-30.
