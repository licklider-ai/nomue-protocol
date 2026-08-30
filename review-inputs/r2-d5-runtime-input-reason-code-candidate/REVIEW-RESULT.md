# R2-D5 runtime-input and reason-code candidate — independent adversarial review result

## Verdict

**GO.**

Implementation commit `b4bf4195b93935c2da87d7f20994328f32b5c1da` may remain in the repository as
non-authoritative R2-D5 decision-preparation material, in its explicitly unissued candidate
state. Zero `BLOCKER`, zero `SHOULD-FIX`, and zero `NICE-TO-HAVE` findings. No new
primary-source research is required before repair or promotion: the increment selects no new
numerical formula, error bound, statistical method, platform guarantee, or supported-domain
predicate, and the proposed code spellings introduce no new statistical or numerical meaning —
they name only the previously reviewed operation-stage failures one-to-one.

Even this `GO` does not issue a reason code, freeze the final code inventory, select a
truth-error predicate, select a supported df or platform, activate paired-t support, issue a
Public Check or bundle, complete R2-D5, close issue #25, or publish Release 2. Public RFC
issue #25 remains **open** with its review window running; its state authorizes no support or
issuance.

## 1. Identity

| Item                   | Value                                                                                                                                                                                                     |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository             | `https://github.com/licklider-ai/nomue-protocol`                                                                                                                                                          |
| Implementation commit  | `b4bf4195b93935c2da87d7f20994328f32b5c1da` (verified)                                                                                                                                                     |
| Implementation tree    | `69e141b010f3c9dfa90cdac87941c817810f24ca` (verified)                                                                                                                                                     |
| Sole parent / baseline | `8c0ad51f88f5b517f3fcf45e508282ea6beb8ecf` (verified single parent)                                                                                                                                       |
| Baseline identity      | Merge of PR #49 (verified: merged, head `6ea9431f…`, base `bc2305f2…` — the baseline's exact two parents)                                                                                                 |
| Review-input commit    | `e5ef322d23e52372b4656ab2e7a3b0205343f816` (tree `34abc30b…`; sole parent is the implementation commit; adds only the review protocol, which carries the pinned commit, tree, baseline, and delta counts) |
| Review type            | Independent, adversarial, delta-scoped; genuine fresh clone, detached exact-hash checkouts                                                                                                                |

The baseline-to-implementation delta is exactly the thirteen declared paths (three added, ten
modified) with **999 insertions and 45 deletions**; `git diff --check` reports no whitespace
errors; no other path, mode, or artifact changed. All required repository context documents
were read, including the charter, authority, RFC, ID policy, the Release 2 candidate
checkpoints and prior review dispositions, the truth-error repair close-review result, the
reference paired-t spike, and every changed implementation and test file.

## 2. Closed input contract (question A)

`parsePairedTCandidateEvaluationInput` was inspected directly: it requires an object whose
prototype is `Object.prototype` or `null`, whose `Reflect.ownKeys` are exactly the two string
keys `degreesOfFreedom` and `testStatistic`, and whose own property descriptors are enumerable
**data** descriptors (`"value" in descriptor`) with `typeof value === "number"`; values are
extracted from descriptors, never by property access, and the whole parse is exception-
contained. `Reflect.ownKeys` makes symbol and non-enumerable keys count against the exact-two
rule, and the descriptor check refuses accessors without invoking them.

A reviewer-owned battery of **41 cases** ran against the parser and both public entrypoints:

- valid controls parse and evaluate: ordinary objects, reversed insertion order, frozen
  objects, and null-prototype data objects;
- rejected as shapes, on both entrypoints, without any exception: missing either key; an extra
  own key; a non-enumerable extra key; a non-enumerable required key; symbol keys (added or
  exclusive); required properties inherited from a prototype (fully or partially); valid own
  keys on a custom prototype and on a class instance; getters (including throwing getters) and
  setter-only properties; arrays; functions carrying the fields; boxed numbers; `Date`, `Map`,
  `Set`, `Float64Array`; proxies throwing from `getPrototypeOf`, `ownKeys`, and the
  property-descriptor trap; a cyclic meta-object; and non-number field values (strings,
  bigints, boxed numbers, `null`, `undefined`);
- **zero accessor invocations** were observed across the entire battery (instrumented getters
  never fired, including on the rejected paths);
- shape parsing is correctly separated from value validation: `NaN`, infinities, negative zero,
  non-integer df, and df 0 parse as two-number shapes and are then value-refused by the graph
  with `invalid_candidate_input`, while df 201 refuses with `outside_evidence_evaluation_range`;
- refusal surfaces match the contract exactly: table integration returns
  `invalid_candidate_input`; the truth-error evaluator returns `runtime_graph_refusal` with
  `graphClassification: "invalid_candidate_input"` and both support claims `false`.

Both entrypoints import and use the single shared parser (verified in the diff: the
truth-error evaluator's private parser was deleted and the table-integration evaluator's
inline checks were replaced by the shared call), so no extra or inherited property can reach
the graph, and no rejected input produced a candidate support claim anywhere in the battery.

Result: 41/41 as required, zero throws, zero accessor invocations, zero support-claim leaks.

## 3. Valid-input behavior invariance (question B)

A reviewer-owned corpus of **1,205 plain two-field inputs** ran identically on detached,
separately installed checkouts of the baseline and the implementation: for every integer df
from 1 through 200 — a seeded random central value, an ordinary tail value, exactly `1`, and
both adjacent binary64 values around `|t| = 1` — plus, for ten selected df covering odd/even,
the df 1 and 2 closed forms, df 72, and the longest-series df 200 neighborhood: positive and
negative zero, `±1` and its adjacent cells, the minimum subnormal (both signs), the minimum
normal, ordinary central and tail values, `t = ±20`, the pinned `t = 50.4` high-error witness,
`1e308`, and maximum finite binary64 (both signs), and five off-grid points just above `1` at
df 200.

The complete serialized results of **both** entrypoints — acceptance/refusal, branch, p-value
bits, iteration count, cap, every proof value (gamma indices, remainder multiplier, truncation
and relative bounds, ULP bound), projection margin, normalization metadata, and every refusal
classification — are **byte-identical** between the two checkouts across all 1,205 rows. The
only intended behavioral change is the input contract itself, which affects no plain two-field
input.

Separately confirmed unchanged across the delta: the reviewed inverse-beta table bytes
(rehashed: `sha256:ba1f992199e9e153956589d62dcf5a6509575100bb7c923c170bfa45fdd76c08`), the
fixed-95 table candidate, the truth-error checkpoint, the runtime-table checkpoint, both
evidence case manifests, and the authoritative snapshot (recomputed:
`sha256:d934f1781ead93c909571ec2c9af820f178568e999b39628076a38537408ed4c`).

## 4. Operation-stage reason-code subset (question C)

The eleven selected mappings were cross-bound against the reviewed support-domain candidate:

- the ten active predicates appear exactly once each, at ordinals 1–10, in the same ordinal
  order, with `source_spike_error`, `failure_class`, and `readiness_key` matching the reviewed
  entries field-for-field;
- the defensive `NON_FINITE_INTERMEDIATE` postcondition appears once as ordinal 11 and matches
  the support-domain candidate's single postcondition entry (readiness key
  `non_finite_later_intermediate`, rationale "defensive postcondition after prior finite and
  positive predicates");
- all eleven candidate codes are unique, all name the unissued `paired_t_computability_check`
  (declared as an unissued candidate in `protocol-identifiers.json`), and all remain
  `candidate_unissued`.

Lexical and collision review: the 55 registered codes in `registries/reason-codes.yaml` follow
`NRS-…` shapes of three to five uppercase-alphanumeric segments; all eleven candidates satisfy
the same form, occupy the previously unused `NRS-PAIRED-T-…` stage namespace, and collide with
**zero** registered codes. A repository-wide search found no candidate spelling in the
authoritative registries, specifications, schemas, conformance artifacts, reference verifier,
bindings, or generated authority views. Adversarial spelling assessment: each spelling names
its operation stage unambiguously and one-to-one with the reviewed spike error (e.g.
`…-DIFFERENCE-VARIANCE-ERASED-BY-ROUNDING` vs `…-VARIANCE-UNDERFLOW` vs
`…-STANDARD-ERROR-SQUARED-UNDERFLOW` are distinct reviewed stages); none aliases or redefines
an existing code's semantics, none is misleading about stage ownership, and the inventory-scope
block explicitly disclaims a complete Release 2 inventory. No spelling introduces new
statistical or numerical meaning, so no additional primary-source research is triggered.

## 5. Taxonomy boundary (question D)

Every classification emitted by the current family was enumerated by direct source sweep
(reference paired-t spike, numerical contract helper, runtime-series graph, table integration,
projection-margin helper, truth-error evaluator) and placed against the checkpoint:

- **Selected (11):** exactly the reviewed operation-stage spike errors. The reference spike's
  remaining errors (pair admissibility, condition order, experimental-unit, non-finite outcome,
  and similar) belong to the Profile-admissibility/Record-validation families, which the
  inventory scope explicitly places outside this numerical increment — truthful, not lost.
- **Delegated (2):** `non_finite_candidate_intermediate` delegates to the reviewed
  `NON_FINITE_INTERMEDIATE` postcondition (no duplicate code created);
  `runtime_graph_refusal` delegates to `graphClassification`, preserving the underlying cause
  (verified live: the wrapper carries the graph classification through).
- **Internal-only (5):** `invalid_candidate_input` (pre-check input validation),
  `candidate_constant_table_unavailable` (candidate configuration),
  `proof_graph_reproduction_mismatch` (implementation invariant), `refuse_negative_zero` and
  `refuse_invalid_probability` (output invariants) — none is labeled a Record-caused Public
  Check failure, exactly as required.
- **Deferred (10):** each names a real classification of the current family
  (`outside_evidence_evaluation_range`, `positive_series_iteration_cap_reached`,
  `truth_error_proof_precondition_failed`, `truth_error_bound_not_finite`,
  `projection_margin_not_established`, `refuse_positive_subnormal`,
  `refuse_positive_tail_not_representable`, `confidence_interval_endpoint_collapse`,
  `unsupported_platform`, `subnormal_intermediate_outside_supported_scope`) with a null code
  and a truthful blocker.
- **Outside-increment:** the numerical contract helper's declared-result comparison
  classifications (`non_finite_numeric_result`, `negative_zero_numeric_result`,
  `binary64_bit_mismatch`) belong to the declared-result comparison family, which the
  inventory scope explicitly excludes — truthful.
- The projection-margin helper's internal statuses
  (`projection_class_not_selected_for_support`,
  `projection_margin_not_larger_than_supplied_bound`, `invalid_candidate_input`) are consumed
  by the truth-error evaluator and surface as the deferred
  `projection_margin_not_established`; the underlying projection-class information remains
  visible in the graph result and in deferred entries 6–7, so nothing is falsely represented
  or silently lost.

No current classification is misplaced, erased, or mislabeled.

## 6. Deferred decisions (question E)

The checkpoint contains exactly the ten required deferred decisions, in the protocol's order
(supported df range; positive-series iteration bound; truth-error proof precondition;
truth-error bound formation; projection margin; positive subnormal p-value; positive p-value
not representable; confidence-interval endpoint collapse; supported-platform predicate;
subnormal-intermediate first-failure order), each with `candidate_reason_code: null` and a
truthful blocker. Reviewer mutations attempted promotion of each entry (filling a code,
weakening or nulling the blocker, retyping fields), removal of entries, reordering the list,
undeclared siblings, and count reduction — every one failed validation with a deterministic
error, and no mutation activated runtime support anywhere (the checkpoint's
`runtime_support_enabled`, the readiness block, and both evaluators are untouched by
validation outcomes).

## 7. Validator and hostile checkpoint attacks (question F)

A reviewer-owned coherent mutation harness walked **every** key of the checked-in checkpoint at
every nesting level (top-level fields; every field of every selected, delegated, internal-only,
and deferred entry; the inventory scope; the input contract; the prohibited claims), applying
eight retypes per key plus deletion and an undeclared sibling, together with 27 targeted
attacks (support/issuance/freeze promotion; complete-inventory claim; input-contract key
renames, reorderings, and disposition weakenings; candidate-code duplication, lowercase and
non-`NRS` lexical forms; ordinal swaps and full reordering; ordinal-11 removal and
duplication; check-ownership change; state promotion; delegation erasure; internal-only
relabeling as a Record-caused reason; deferred-entry promotion, weakening, removal, and
reordering; prohibited-claims removal and emptying).

Results: **1,975 real mutations rejected, zero accepted**, 14 value-identical no-ops, zero
validator exceptions; an unchanged deep copy is accepted. Hostile shapes passed directly to
the validator — `null`, `undefined`, primitives, arrays, cyclic objects, bigint/function/`NaN`/
`undefined` fields, a polluted prototype, and a proxy throwing from every trap — all return
the deterministic structural error without throwing. Two probe shapes are JSON-unreachable
no-ops rather than mutations: a symbol-keyed extra property and an accessor returning the
expected value serialize to a byte-identical JSON document (`JSON.parse` can produce neither),
so their acceptance changes no document content; inherited-field injection via a custom
prototype is rejected by the canonicalizer's prototype check. This matches the behavior of
every previously reviewed checkpoint validator in this family.

## 8. Readiness, documentation, and authority (question G)

- The readiness checkpoint adds exactly one block recording: `closure: "incomplete"`, the
  exact artifact and validator paths, `input_contract: "exact_own_data_keys_candidate"`,
  eleven selected operation-stage code candidates, ten deferred code decisions,
  `final_reason_codes_frozen: false`, and `runtime_support_enabled: false` — and the readiness
  validator pins each of these values.
- The checked-in checkpoint JSON validates with an empty error list against the closed module
  constant.
- Documentation (candidate README, numerical README, runtime-series README, steward
  ratification package) consistently distinguishes candidate spellings from issuance and the
  reviewed operation-stage subset from a complete Release 2 inventory, states that accessors
  are not invoked, and claims no supported domain, selected platform, selected truth-error
  predicate, final table, Public Check, bundle, R2-D5 completion, or Release 2 publication.
  The documented input-contract behavior matches the proven behavior exactly.
- The delta touches no authoritative registry, normative specification, schema, conformance
  expectation, generated artifact, Release 1 path, or reference-verifier dispatch (path scan
  empty), and the recomputed authority snapshot hash is unchanged.

This increment also resolves the deferred nice-to-have observation from the truth-error repair
close review (cross-evaluator input-strictness asymmetry): both entrypoints now share one
stricter parser.

## 9. Regression execution

From the fresh clone at the exact implementation commit:

- `corepack pnpm install --frozen-lockfile`: success;
- `corepack pnpm check`: **exit 0** (full suite — format, markdown lint, typecheck, validate,
  tests, generated-file checks, Phase 1 and Phase 2A suites), with no IPC restriction in this
  environment, so no alternate invocation was needed;
- focused tests (`paired-t-runtime-input-reason-code-candidate`,
  `paired-t-runtime-table-integration-candidate`, `paired-t-truth-error-support-candidate`,
  `paired-t-numerical-readiness`): **40/40 passed**;
- `git status --porcelain` empty afterward with `HEAD` at the exact implementation commit.

Environment: Node v22.22.2, pnpm 11.7.0 (corepack), Linux x86_64.

## 10. Findings

None. No `BLOCKER`, no `SHOULD-FIX`, no `NICE-TO-HAVE`. No new primary-source research is
required.

## Provenance

- Contributor role: independent adversarial reviewer, separate from the implementation
  authoring context; the same reviewing role that produced the prior truth-error and repair
  close-review results referenced in the required context.
- Review scope: the thirteen-path delta `8c0ad51f…` → `b4bf4195…` (tree `69e141b0…`), the
  review protocol at `e5ef322d…`, and the unchanged predecessor checkpoints and evidence
  surfaces as dependencies.
- Independence boundary: the input-contract battery (41 cases with accessor instrumentation),
  the 1,205-row baseline-versus-implementation invariance corpus, the 2,002-attempt mutation
  and hostile harness, the cross-binding of all eleven mappings, the registry collision scan,
  and the classification sweep were all reviewer-owned; repository tests were used only as
  additional regression evidence.
- Commands: fresh clone; detached checkouts of the implementation, baseline, and review-input
  commits; `corepack pnpm install --frozen-lockfile`; `corepack pnpm check`; focused vitest
  runs; `pnpm snapshot:manifest --hash-only`; reviewer harnesses under a session-local
  scratchpad outside the repository.
- Date: 2026-08-30.
