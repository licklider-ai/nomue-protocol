# R2-D5 G4 execution-trace refusal repair close-only review result

## Verdict

**CLOSED.**

The two blockers from the original independent adversarial review are closed by repair commit `6c9c3e57c9c50fc39f39823f036b9423fe443f96`.

- **F1:** per-pair first-failure ordering now matches the unchanged reference graph. A later incomplete pair or repeated-measurement declaration mismatch cannot preempt an earlier `DIFFERENCE_OVERFLOW`.
- **F2:** a non-finite reduction result is converted to the reviewed mean or variance accumulation-overflow classification immediately after the producing primitive is exactly verified and before that Infinity can become a parent operand.

No accepted arithmetic operation, accepted trace node, accepted output, checkpoint, readiness state, authority surface, support claim, issuance state, or Release 2 state is changed by the repair. No repair-induced `BLOCKER`, `SHOULD-FIX`, or `NICE-TO-HAVE` finding was found.

This is a bounded close-only verdict. It permits the original candidate-scoped `GO` only for retention as **unissued, non-authoritative R2-D5 decision-preparation material**. It does not approve a G4 mathematical-truth error bound, tail or confidence-interval composition, a supported resource bound, supported platform, supported execution predicate, supported domain, runtime support, a Public Check, a bundle, R2-D5 completion, RFC closure, or Release 2.

## 1. Exact identity and repair topology

- Original implementation: `12eff9025386eb5b73db107ff4b838613b09174d`.
- Original implementation tree: `d66bac8af947f28cf6fc01d00362538d6dd74808`.
- Original review input: `215de9a8cc6f245782964befd13a9ba287a8fd49`.
- Original independent review result: `860a3da434dbb1a1df0d6d997e166c52296639ef`.
- Original verdict: `NO-GO` on exactly F1 and F2, both `BLOCKER`; no `SHOULD-FIX` or `NICE-TO-HAVE`.
- Repair parent: `215de9a8cc6f245782964befd13a9ba287a8fd49`.
- Repair commit: `6c9c3e57c9c50fc39f39823f036b9423fe443f96`.
- Repair tree: `095b7a4d49a1930f1f9b7b270deeefa367ef4431`.
- Close-review input: `e94ea523216de37c799e4a61db3ce070df5f6598`.
- Close-review input tree: `0b070015e9dd6bde24fb87cf41832bf03b844098`.
- PR under review: #56, Draft at review time.

The repair is one commit directly on the pinned original review-input commit. Its complete delta is exactly two files and 202 insertions / 46 deletions:

1. `tooling/src/spikes/paired-t-g4-execution-trace-candidate.ts` — +68 / -46.
2. `tooling/tests/paired-t-g4-execution-trace-candidate.test.ts` — +134 / -0.

No other path changes between the review-input parent and repair. The public close-review input is one commit directly on the repair and adds only the close-review protocol and its review-index entry: 199 insertions / 0 deletions across two governance review files.

The current mainline used by the PR #56 synthetic-merge CI had advanced beyond the PR's pinned base. Comparison from `28a04792fe8dfedd4d858780cf7c2b0a4eaa88c2` to `b5e55b380fc2bd05a60b7f7d23e90b1ce20e03c2` showed the sole file-level addition was `review-inputs/r2-d5-supported-execution-review-disposition/REVIEW-RESULT.md`. It changed no G4 implementation, reference, numerical candidate, authority, schema, generated view, support, or Release 1 byte. This fact was used only to qualify the full-regression CI as a non-weakening superset-tree check.

## 2. Reviewer separation, source boundary, and environments

This review is independent of the repair-authoring context. The decision basis was direct inspection of the pinned original and repaired source bytes, the unchanged reference implementation, the original independent F1/F2 report, a reviewer-owned standalone adversarial harness derived independently from the documented operation and failure order, exact GitHub commit/tree/delta comparisons, and repository CI only as regression corroboration rather than as the F1/F2 oracle.

Reviewer-owned harness environment:

- Linux `6.18.35` x86_64.
- Node.js `v22.16.0`.
- Python `3.13.5` available but not required by the F1/F2 harness.
- Git `2.47.3`.
- Harness SHA-256: `f036158d3fff03a8c738e0ad42e43883564e2f647bfc09157d5e390536edc7ac`.
- Deterministic seed: `0x56f1f2a1d5c10e5d`.

A GitHub-hosted evidence run (`33353848871`, job `99372150183`) initialized an empty repository, fetched exactly `e94ea523216de37c799e4a61db3ce070df5f6598`, checked it out in detached-HEAD state, and completed `pnpm install --frozen-lockfile`. That exact-head runner used Ubuntu 24.04.4, Git 2.55.0, Node.js 22.23.2, pnpm 11.7.0, and CPython 3.12.14.

The full repository CI (`33353848909`) also passed on the PR #56 synthetic merge. Its only mainline-only repository delta relative to the pinned PR base was the unrelated review-result file identified above, so it was a non-weakening regression check for the repaired implementation bytes. The semantic close decision did not depend on repository tests.

## 3. F1 — per-pair first-failure ordering

The original candidate performed two phases: it first sorted pair IDs and rejected incomplete or declaration-invalid pairs while constructing all canonical pairs, and only afterward executed pair subtractions and detected `DIFFERENCE_OVERFLOW`. That was the exact ordering defect reported as F1.

The repair removes that all-pairs structural pass from `parseCandidateInput`. The parser returns the sorted raw pair/member sequence. `executeParsedInput` then processes one sorted pair at a time in this order:

1. `INCOMPLETE_PAIR`.
2. `EXPERIMENTAL_UNIT_DECLARATION_MISMATCH`.
3. Exact-difference bookkeeping.
4. Exactly one recorded binary64 subtraction.
5. `DIFFERENCE_OVERFLOW` if that subtraction is non-finite.
6. Append the canonical pair and continue.

This is the unchanged reference's per-pair first-failure topology. Observation-level checks that can carry `observationId` remain before this stage and are byte-unaffected by the repair.

For accepted inputs, the move cannot create an untraced arithmetic pass: the same sorted pair is converted to the same canonical bytes and exactly one `difference:<index>` subtraction node is recorded. No pre-subtraction numerical operation was added.

Reviewer-owned F1 battery:

- 1,360 first-failure comparisons.
- 0 mismatches.
- Original direction: earlier difference overflow plus later incomplete pair.
- Original direction: earlier difference overflow plus later declaration mismatch.
- Reverse direction for both structural defects.
- Two-, three-, four-, and seven-pair cases with defects moved through first, middle, and last sorted positions.
- Repeated seeded insertion-order permutations.
- Lexically difficult pair IDs including `p-10`, `p-2`, `P-9`, `p_1`, `p.1`, and zero-padded variants.

For every modeled pair-stage refusal, reference order and repaired order agreed on success/refusal, first graph error, and `pairId`. There was no exception path and no route to a support claim.

**F1 disposition: CLOSED.**

## 4. F2 — non-root reduction overflow classification

The original `TraceRecorder.record` correctly allowed a binary64 operation with finite operands to produce Infinity when that Infinity was the correct rounded result. The old `pairwiseSum` then returned the tracked Infinity. At a non-root overflow, the parent add received Infinity as an operand, and primitive verification rejected the non-finite operand before the graph-level post-root check could return the reviewed accumulation-overflow classification.

The repair adds one classification parameter to `pairwiseSum` and performs the check at the safe point: recursively obtain finite child tracked values; call `recorder.record(add, ...)`, preserving the real executed node and exact primitive verification; immediately test the produced result; if non-finite, throw internal `GraphRefusalError` carrying the fixed graph classification; then catch that local error before resource/primitive catch branches and return the ordinary graph refusal.

The mean tree passes `MEAN_ACCUMULATION_OVERFLOW`; the squared-deviation tree passes `VARIANCE_ACCUMULATION_OVERFLOW`.

The finiteness check occurs after `recorder.record`, so an actual primitive-verification defect still throws `PrimitiveVerificationError` first and retains `execution_trace_verification_failed`. `GraphRefusalError` is non-exported and can only be constructed inside the reduction helper from one of the two hard-coded graph classifications; caller data cannot instantiate or inject it.

Reviewer-owned F2 batteries:

- Mean-reduction comparison: 50,007 deterministic witness/extreme-exponent cases, 0 classification mismatches.
- Mean cases included the original n=3 witness `[1, MAX_VALUE, MAX_VALUE / 2]`, n=2 root control, left/right non-root placement, more than one reduction depth, and power-of-two / non-power-of-two sizes.
- Full-G4 comparison: 30,004 deterministic cases, 0 classification mismatches.
- Full-G4 cases included the original variance witness with `b = 1.2e154`, represented as differences `[b, -b, b, -b - 1]`, plus the n=2 root variance control and a balanced extreme-magnitude corpus over multiple reduction shapes.
- A reviewer-only injected genuine primitive failure at the first reduction node remained `execution_trace_verification_failed`; it was not relabeled as a graph overflow.

No reachable modeled mean/variance reduction overflow fell through to primitive-verification failure after the repair.

**F2 disposition: CLOSED.**

## 5. Accepted result and complete trace invariance

Accepted-input invariance follows directly from the repair shape. Accepted inputs have no incomplete pair or repeated-measurement declaration mismatch, so relocating those checks changes neither control outcome nor data. Sorted pair IDs and observation members are unchanged. Each accepted pair executes the same single subtraction with the same label, operands, source position, result bits, and canonical input bytes. The only `pairwiseSum` addition is a post-node finiteness branch; every reduction result on an accepted execution is finite, so the branch cannot alter a node or value. All downstream arithmetic, trace construction, SHA-256 construction, trace replay verification, returned-result projection, verification counts, deep freezing, and false support/completion flags are otherwise unchanged.

A separate reviewer model serialized the complete successful candidate result surface, including canonical trace input, every node and operand source, all binary64 operand/result fields, outcome bindings, node count, trace SHA-256, returned values, verification counts, and every completion/support flag.

- Complete serialized accepted cases: 12,205.
- Mismatches: 0.
- Deterministic seed: `0x56f1f2a1d5c10e5d`.
- Reviewer rollup SHA-256: `sha256:7c95b0c2edd4d8d5bde8629a621befed2e9efbcd9d60226b18d05288cb8c6f59`.
- A broader schedule/value-only accepted model exercised 20,204 accepted cases with 0 mismatches.

The corpus contains every pair count from 2 through 201, non-power-of-two sizes, neighborhoods of powers of two, signed-zero controls, subnormal/minimum-normal controls where the complete graph remains admissible, large-finite/cancellation cases, and 12,000 seeded broad accepted cases.

The successful node formula remains exactly `5n + 3`. Reviewer controls at n = 2, 3, 4, 5, 8, 17, and 201 produced 13, 18, 23, 28, 43, 88, and 1,008 nodes respectively. The checked-in n=2..201 regression also passed in CI. The 201-pair and 2,048-node values remain evaluation ceilings only.

## 6. Refusal, hostile-shape, checkpoint, and support regression

The repaired repository test replays all checked-in support-domain boundary cases and compares their graph dispositions with the unchanged reference. The PR #56 full CI passed the repaired G4 suite (10/10 tests) and the repository full test suite (40 files / 424 tests).

Representative hostile shapes remain fail-closed: null/undefined, arrays, ordinary malformed objects, strings, accessor-bearing inputs, and a throwing proxy are tested against the evaluator, trace verifier, and checkpoint validator. No accessor is invoked and no exception escapes in the checked-in regression. Moving completeness/declaration checks does not widen the parser; the closed own-data-record and dense-array checks are unchanged before the moved stage.

Failure separation remains intact:

- `GraphRefusalError` is internal and caught as `g4_graph_refusal`.
- `TraceResourceLimitError` remains `execution_trace_resource_bound_exceeded`.
- `PrimitiveVerificationError` remains `execution_trace_verification_failed`.
- Ordinary input refusals remain graph/input refusals and cannot claim arithmetic verification, platform, domain, or runtime support.

No concrete repair-induced hostile-input regression or support-claim leak was found.

## 7. State, authority, readiness, and public-review boundary

Because the repair commit changes exactly the implementation and its test, every other path in its parent is byte-identical at the repair commit. The unchanged set includes `reference/spikes/paired-t.ts`, `governance/drafts/release-2-candidate/numerical/g4-execution-trace-candidate.json`, the G4 block in `evidence-readiness.json`, tail/truth-error/table/supported-execution implementations and evidence, authority, registries, schemas, conformance, normative specifications, generated views, Release 1, Public Checks, bundles, and verifier dispatch.

The content-addressed authority snapshot remains `sha256:d934f1781ead93c909571ec2c9af820f178568e999b39628076a38537408ed4c`. No authority input byte changed, and repository validation passed in the PR #56 full CI.

The G4 checkpoint remains `non_authoritative_candidate` / `unissued`, with `runtime_support_enabled: false`, `supported_domain_claimed: false`, mathematical-truth / tail / confidence-interval closure pending, resource bound unselected, and supported-execution predicate unselected. The readiness block remains incomplete with the 201 / 2,048 maxima marked as non-supported evaluation candidates and all support/runtime flags false.

Public RFC issue #25 remained open at review time. Its public review window had not authorized support, issuance, R2-D5 closure, or Release 2.

## 8. Regression commands and CI evidence

Exact close-review head evidence at `e94ea523...`:

- Fresh empty Git repository initialization — PASS.
- Exact SHA fetch and detached checkout — PASS.
- Node 22.23.2 / pnpm 11.7.0 — recorded.
- `pnpm install --frozen-lockfile` — PASS.
- Non-authoritative paired-t evidence generation/validation — PASS.

PR #56 full repository regression on the non-weakening synthetic-merge superset tree:

- Formatting — PASS.
- Markdown lint — PASS.
- Typecheck — PASS.
- Registry / authority / traceability / schema / audit validation — PASS.
- Vitest — 40 files / 424 tests PASS.
- Repaired G4 test — 10/10 PASS.
- n=2..201 bit-for-bit reviewed-graph regression — PASS.
- Generated-file check — 19 generated files match.
- Phase 1 / Phase 2A conformance and evidence checks — PASS.
- Linux arm64, macOS arm64, Windows x64 validation jobs — PASS.
- Linux x64 Node 24 full-check probe — PASS.

### Clean-tree note / non-weakening workaround

The available full-CI log did not emit a literal final `git status --porcelain`, and its wrapper created transient untracked report/artifact files. This review therefore does not claim to have observed a textual empty-status line from that runner. Instead, the merge decision is bound to immutable Git trees: the exact repair delta is only the two declared files, the close-input delta is only protocol/index, `check:generated` reports no tracked generated drift, and the neutral review branch was created atomically from the exact close-input commit with only this report added. No implementation or authority write was performed by the reviewer. This is a non-weakening execution-environment workaround, not evidence for F1/F2 semantics.

## 9. Findings

- `BLOCKER`: **None.**
- `SHOULD-FIX`: **None.**
- `NICE-TO-HAVE`: **None.**

The only limitation is the CI topology described above. No concrete repair regression, counterexample, claim leak, or changed accepted byte was found, so the close-only protocol does not permit elevating that environment fact into a new out-of-scope finding.

## 10. Close-only conclusion

**CLOSED.** F1 and F2 are both repaired at the failure-order boundary that produced the original `NO-GO`. The repair leaves successful arithmetic and complete trace construction unchanged, restores the reviewed graph classifications for non-root reduction overflow, retains genuine primitive/resource failure separation, and changes no checkpoint, readiness, authority, support, issuance, R2-D5, or Release 2 state.

PR #56 was therefore eligible for its subsequent merge decision only in its existing bounded status as unissued, non-authoritative G4 actual-execution-trace candidate material.

## Provenance and output

- Reviewer role: independent close-only reviewer, separate from the repair-authoring context.
- Review scope: F1 and F2 plus only those regression boundaries required by the fixed close protocol.
- Neutral reviewer branch: `review/r2-d5-g4-execution-trace-repair-close-e94ea52`.
- Branch base: `e94ea523216de37c799e4a61db3ce070df5f6598`.
- Required report path: `review-inputs/r2-d5-g4-execution-trace-repair-close/REVIEW-RESULT.md`.
- Output commit: the Git commit containing this report; its SHA is recorded externally because a Git commit cannot contain its own SHA without changing that SHA.
- Reviewer repository mutation: this report only. No implementation, test, checkpoint, readiness, protocol, authority, generated, or other repository path is modified.
