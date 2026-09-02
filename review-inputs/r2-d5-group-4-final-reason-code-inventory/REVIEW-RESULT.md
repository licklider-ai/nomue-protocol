# R2-D5 Group 4 final reason-code inventory independent review result

## Verdict

GO

The exact PR #151 head `1a2802000b80ed795c51984bd88f89fc6be707a0` may be
considered for merge as the non-authoritative, unissued R2-D5 Group 4 final
reason-code inventory candidate selection. No BLOCKER, SHOULD-FIX, or
NICE-TO-HAVE finding remains in this bounded review.

Per protocol section A, `GO` permits merge consideration for this exact
candidate selection only. It does not issue or freeze any reason code or
Public Check, change any authoritative registry, select a supported
domain/runtime, promote authoritative support bounds, freeze the numerical
contract, issue a platform/runtime allowlist or bundle, dispose RFC #25,
close R2-D5, or complete Release 2. Group 4 remains open pending this
result's preservation and a separate closure-synchronization increment. Any
different head requires a new independent exact-head review.

## 1. Exact identity and permitted delta (protocol B)

- Repository: `licklider-ai/nomue-protocol`
- PR: `#151` (branch `r2-d5/group-4-final-reason-code-inventory`)
- Sole parent, base, and merge base:
  `005d902635e98bbcfaf5caa0ade4c48204cb4851` (= live `main` at review start
  and end; base tree `027f1cd65639f1afe646a0cee31bb9bfbb15430f`)
- Reviewed head: `1a2802000b80ed795c51984bd88f89fc6be707a0`
- Reviewed tree: `5dee78c6fc3585df467304c4cca821a75aac3421`
- Structure: one ahead-only commit
- Delta: exactly the 9 declared paths, `+1516/-3`; mergeable (clean)
- Review date: `2026-09-02` (UTC)

The live PR head was compared with the pinned head both before review began
and after all review work completed; it matched both times, and `main` did
not advance, so no synthetic merge was required. All nine changed paths were
read in full; they are limited to the candidate inventory checkpoint, its
validator/lookup module and focused test, the aggregate readiness overlay
JSON/module/tests, the two candidate READMEs, and this review protocol.
There is no change under `authority/`, `registries/`, `schemas/`,
`conformance/`, `generated/`, `spec/`, `reference/`, or `review-inputs/`,
and no durable review result, candidate schema, runtime numerical
implementation, table byte, or Group 1–3 checkpoint is rewritten.
`AGENTS.md`, `CHARTER.md`, `AUTHORITY.md`, `governance/ID-POLICY.md`, and
`governance/RFC.md` are byte-identical to the previously reviewed state.

## 2. Reviewer independence

This review was performed in a reviewer role in a separate working context
from the authoring context. No declared blob, count, hash, or verdict was
trusted: all source bindings were re-resolved from Git objects; the
relationship classification set was extracted directly from the evaluator
implementation; the registry reuse and collision audit was recomputed from
`registries/reason-codes.yaml` bytes; the checkpoint canonical hash was
recomputed with a separate implementation; and the runtime classification
sweep was enumerated from the runtime modules themselves. Several bound
durable results (the closure-gap review and the Groups 1–3 closure reviews)
were produced by this reviewer role in earlier bounded exact-head reviews
and are consumed as pinned repository artifacts, re-verified from bytes.
All harnesses were temporary files outside the repository; this result file
is the review's only repository artifact.

## 3. Source snapshot reconstruction (protocol C)

The checkpoint's `source_snapshot` declares commit
`005d902635e98bbcfaf5caa0ade4c48204cb4851` with tree `027f1cd6...`; both
were independently confirmed, and all 24 bindings were re-resolved with Git
object commands: 24/24 blob SHA-1 values match, covering the closure-gap
review, the partial runtime-input reason inventory and its durable review,
the candidate identifier/Public Check inventory, profile schema, fixture
manifest, relationship evaluator, projection classifier, runtime-series,
truth-error, G4-trace, CI-trace, and supported-execution evaluators, the
Group 1/2/3 checkpoints and closure reviews, the issued reason-code and
Public Check registries, and the Group 2 full-trace and Group 3
selection/admission evaluators. The Group 3 checkpoint blob equals the
version closed at the reviewed #148 head, and each Groups 1–3 closure
review records only a preserved exact-head `GO` over a non-authoritative
candidate milestone — none is promoted to authoritative support. The
predecessor partial-inventory durable review is a `GO` with zero BLOCKER,
zero SHOULD-FIX, and zero NICE-TO-HAVE findings and no unresolved item.

## 4. Reviewed 11-code preservation (protocol D)

The 11 `retained_operation_stage_reason_code_candidates` entries are
deep-equal to the predecessor's
`selected_operation_stage_reason_code_candidates` — order, ordinals,
source spike errors, failure classes, readiness keys, candidate spellings,
check ownership, and `candidate_unissued` state all exactly preserved. The
predecessor artifact and its durable review are unchanged at the source
snapshot.

## 5. Inventory completeness and ownership (protocol E)

Independently enumerated and matched:

- 5 ordered unissued candidate Public Checks, each spelling present in the
  bound draft identifier inventory and colliding with nothing in the issued
  Public Check registry;
- 4 record-level mappings, each a registered reuse with its own
  conformance/integrity check key;
- 25 relationship classifications, extracted directly from
  `validatePairedCandidateRelationships` (all 25 `issues.push` codes in the
  module live inside that function; set equality with the mapped
  classifications holds with no duplicates);
- 11 retained operation-stage candidates (Section 4);
- 12 declared-result comparison mappings covering exactly the candidate
  schema's numeric result surface (`pair_summary.n_pairs`,
  `mean_difference`, `sample_variance_difference`,
  `effect_estimate.estimate`, `standard_error`,
  `confidence_interval.confidence_level`/`lower`/`upper`,
  `test.test_statistic`, `degrees_of_freedom`, `p_value`) plus the
  confidence-interval lower/upper ordering; and
- 10 resolved and 0 unresolved support-dependent decisions.

Check ownership matches the declared model throughout: record mappings
carry per-entry check keys; relationships default to
`paired_profile_admissibility_check` with the single
`PAIR_COUNT_BELOW_TWO` exception owned by
`paired_t_computability_check`; retained operation-stage entries keep
their existing check keys; declared-result comparisons belong to
`paired_t_recompute_check`; support-dependent and runtime codes belong to
`paired_t_computability_check`; delegated classifications belong to the
delegated upstream owner; and internal-only failures carry no Public Check
attribution.

## 6. Registry reuse and collision review (protocol E, request §7)

Against the issued registry (55 `NRS-` ids): all 18 distinct
`registered_reuse` codes exist, all 34 distinct `candidate_unissued`
spellings are absent from the issued registry, and zero violations were
found across all 69 mapping entries. Semantics were checked for the
sensitive cases: `NRS-P-VALUE-UNDERFLOW`'s issued meaning (finite statistic
and positive df yielding a binary64 p-value of zero — numerical underflow,
not the exact tail) exactly matches the reused
`positive_p_value_not_representable` resolution; numerical iteration/trace
resource exhaustion deliberately does not reuse Phase 1's structural
`NRS-RESOURCE-LIMIT-EXCEEDED` and instead uses the new
`NRS-PAIRED-T-RESOURCE-ENVELOPE-EXCEEDED`; paired experimental-unit reuse
across pairs takes the new
`NRS-EXPERIMENTAL-UNIT-REUSED-ACROSS-PAIRS` rather than reusing the
independent-group `NRS-DUPLICATE-EXPERIMENTAL-UNIT`, whose issued meaning
differs; and `NRS-INTERNAL-VERIFIER-ERROR` is registered, category
internal, `record_caused: false`, with no Public Check attribution.

## 7. Ten formerly deferred decisions (protocol F, request §8)

The 10 resolved entries correspond one-to-one, in order and by source
classification, to the predecessor's `deferred_reason_code_decisions`;
zero entries remain null, deferred, or unowned. Each resolution was
re-derived from the closed Groups 1–3 artifacts this reviewer examined at
their own exact heads: df range from Group 1's pair `2..201` / df `1..200`
scope; the iteration/resource cap from Group 1's `40·df + 64` cap and
100,000-node ceiling; truth-proof preconditions from the Group 2 truth
contract with the Group 3 execution predicate; truth-error bound formation
from Group 2's input-specific truth contract; the projection margin from
Group 2's strict pointwise projection contract; positive subnormal p from
Group 2's binary64 projection contract; positive non-representable p from
the existing issued underflow code; CI endpoint collapse from Group 2's
endpoint contract (the reviewed collapse witness); supported-execution
refusal from Group 3's one-tuple/controlled-process predicate; and the
subnormal-intermediate first-failure policy from Groups 1/2 operation
order and the full-trace contract. The resolution selects candidate
vocabulary only and promotes none of those closed candidates to
authoritative support.

## 8. Runtime propagation and internal boundary (request §9)

The wrapper-level classification unions were extracted from the runtime
modules: the selection wrapper emits only
`candidate_supported_execution_predicate_refusal` (delegated); the
admission wrapper's five classifications are mapped
(`runtime_build_platform_tuple_mismatch`,
`controlled_process_profile_not_established`), delegated
(`group_2_full_trace_refusal`), or internal-only
(`environment_changed_during_evaluation`,
`group_2_full_trace_reverification_failed`); and the full-trace wrapper's
classifications are delegated (`g4_tail_stage_refusal`,
`ci_truth_stage_refusal`, `runtime_graph_refusal`), mapped
(`resource_envelope_refusal`, `execution_trace_resource_bound_exceeded`,
`non_finite_candidate_intermediate`, `non_finite_ci_intermediate`), or
internal-only (`same_trace_binding_mismatch`,
`full_trace_verification_failed`, `invalid_candidate_input`). Deeper
component-level names (stage refusals and per-module trace-verification
spellings inside the G4/tail/CI/series modules) surface only as upstream
details beneath a delegated owner, consistent with the declared delegated
ownership; they are not wrapper classifications, and the lookup surface
returns `null` for them and for any unknown classification — a fail-closed
refusal with no guessed fallback reason. Accepted lookup results are
deep-frozen and deterministic, and a checkpoint mutated in any way refuses
lookup even for valid classifications.

## 9. Canonical digest and validator (protocol/request §10)

The checkpoint's recursively key-sorted compact-JSON SHA-256 was
independently recomputed with a separate implementation:
`sha256:ad2c69ed530686b95f02d83b425391d4c87da0eefa22ce0e66914066dd00ad45`,
matching the validator pin. Object-key reordering remains accepted
(non-semantic) while array order and every value are pinned; anything but
the exact checkpoint is rejected by both the validator and the lookup
surface.

## 10. Adversarial battery (protocol H, request §11)

A reviewer-owned battery of 132 attacks ran across the checkpoint
validator, the lookup surface, and the aggregate readiness validator:
source commit/tree/path/blob/role changes; binding removal, addition, and
reordering; Groups 1–3 demotion; premature Group 4 closure and
review-complete, issuance, and freeze forgery; Public Check
order/key/spelling/state changes; removal, addition, reordering, and
substitution across the record, relationship, operation-stage,
declared-result, support-dependent, and runtime mapping groups (including
coherent candidate-code substitutions and reuse-state flips); reintroduced
deferred/null decisions; the Phase 1 resource-code and issued
duplicate-experimental-unit misuse cases; check-ownership changes;
delegate/internal boundary changes (a delegate turned into a code, a code
turned into a delegate, an internal failure made record-caused or given
attribution or moved to the public route); count forgery; downstream
reordering; an advanced RFC earliest-decision date; every non-promotion;
undeclared keys; and the full hostile-shape suite (non-enumerable hidden
properties, Symbols, accessors, sparse/extended arrays, throwing Proxies,
cycles, non-plain prototypes, NaN, Infinity, negative zero, BigInt,
functions, and null/string/array roots). All 132 were rejected
deterministically with zero caller-getter invocations (three independent
counters) and zero exception leaks; checkpoint attacks were verified
against both the validator and the lookup surface simultaneously.

## 11. Regression and hosted checks (protocol J, request §12)

`pnpm install --frozen-lockfile` succeeded. Format check, Markdown lint,
typecheck, `validate: OK`, generated, Phase 1, Phase 2A, and Phase 2A-021
are all green, and the focused inventory and readiness suites pass 36/36.
The full Vitest suite is 54 files / 511 tests with 509 passing locally;
the two failures are the known pre-existing heavy tests with in-source
30-second and 60-second limits (untouched by this PR; their modules are
blob-bound in the source snapshot), which needed ~37.6 s and ~63.5 s in
this review container's currently slowed state. Both bodies were re-run
timeout-free at this head without changing the candidate: the
operation-stage boundary/tail-edge replay passes 17/17, and the df 1..200
graph/proof equivalence sweep passes 200/200 with zero mismatches — the
failures are environment-only.

Hosted checks on the exact head are 9/9 green: CI run `33602265671` (5/5
jobs — Full check Linux x64, Full check Linux x64 Node 24, and Phase 1 +
2A on Linux arm64, macOS arm64, and Windows x64), runtime-series evidence
`33602265569`, paired-t candidate evidence `33602265627`,
supported-execution admission evidence `33602265617`, and
supported-execution selection evidence `33602265638`; every run reports
the exact head `1a2802000b80ed795c51984bd88f89fc6be707a0` as its head SHA.

## 12. Governance and non-promotions (protocols I, J; request §13)

Issue #25 was inspected live during the review: open, public review window
OPEN, earliest decision `2026-09-25T20:52:54Z`
(`2026-09-26T05:52:54+09:00`) unchanged; the checkpoint's own
`earliest_rfc_decision` matches it. All mandatory non-promotions hold at
the exact head: authoritative supported bounds, numerical-contract freeze,
final runtime table selection, authoritative platform/runtime allowlist,
authoritative controlled-process profile, authoritative
supported-execution predicate, supported domain/runtime, global
truth-error constants, comparison tolerances, final reason-code
freeze/issuance, Public Check/bundle issuance, RFC disposition, R2-D5
completion, and Release 2 completion all remain false, null, pending,
unissued, or incomplete. The finite observations 374 ULP, 2,978 ULP,
5,182 iterations, and 72,567 tail nodes remain non-bounds, and the
100,000-node value remains the existing fail-closed design ceiling.

## 13. Binding

This result is bound to exactly
`1a2802000b80ed795c51984bd88f89fc6be707a0` and approves merge consideration
of the non-authoritative, unissued Group 4 final reason-code inventory
candidate selection only. It does not merge the PR, does not issue or
freeze any reason code or Public Check, and does not change authority,
RFC #25, R2-D5, or Release 2 state. After merge and byte-identical
preservation of this result, a separate Group 4 closure-synchronization
increment with its own exact-head independent review may close Group 4,
after which the final R2-D5 disposition remains blocked by the RFC window.
