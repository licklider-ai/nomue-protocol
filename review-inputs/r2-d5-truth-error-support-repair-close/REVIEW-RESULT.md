# R2-D5 truth-error and support-closure repair close-only review result

## Verdict

**CLOSED.**

Independent findings S1 and N1–N3 from the original adversarial review, and the supplemental
hostile-input exception findings, are repaired at commit
`84debc3f8af699fcb317ee9c9925186de20df12f`. The repair introduces no regression, and every
numerical and authority decision remains unselected. The original candidate-scoped `GO` remains
valid. One `NICE-TO-HAVE` observation is recorded; no `BLOCKER` and no `SHOULD-FIX`.

This verdict is close-only. It does not approve a selected input-specific or global bound, a
support predicate, a supported df maximum, a platform matrix, final reason codes, a runtime
table or table hash, runtime support, a Public Check, a bundle, paired-t support, R2-D5
completion, Release 2 publication, or RFC closure. RFC issue #25 remains open with its public
review window running.

## 1. Identity

| Item                    | Value                                                                                        |
| ----------------------- | -------------------------------------------------------------------------------------------- |
| Repository              | `https://github.com/licklider-ai/nomue-protocol`                                             |
| Review-input commit     | `1234b8a256b01455c984f4ebcd35a45b8ab114a1` (protocol read in full here)                      |
| Original baseline       | `6fad249dd715369de92c7c941a42ddcc34525381`                                                   |
| Original implementation | `2b9d3f40a1e067d85a8856585f597394d5f98761` (tree `87bd3305…`)                                |
| Repair parent           | `34da4fc19d38969269862f7603ca5ccfd8750659` (tree `4a6e941b…`, verified)                      |
| Repair commit           | `84debc3f8af699fcb317ee9c9925186de20df12f` (verified)                                        |
| Repair tree             | `cf339e15d5626a67cc5406a029244b3f81149735` (verified)                                        |
| PR #46 merge            | `612d0b943e34b55d8bd8cfe284d8dcdfbd3820a2` — merge tree equals the repair tree byte-for-byte |
| Review type             | Independent, adversarial, close-only; fresh clone, detached exact-hash checkouts             |

The repair commit was pinned by exact hash in a fresh clone; its only parent is the pinned
repair parent, whose sole delta from the original implementation is the adversarial-review
protocol document (a protocol-only intermediate, not part of the repair). The
repair-parent-to-repair delta is exactly the ten declared modified files with **326 insertions
and 35 deletions**; `git diff --check` is clean; no other path, mode, numerical artifact,
checkpoint, generator, table cell, or authority surface changed (the governance diff across the
repair is empty).

## 2. Review topology and finding inventory

- The independent review-result commit `773b0eadf02618c74c11c7e215d9b7d5c1f75528` has the
  original baseline as its only parent and adds exactly one file, its review report. The report
  pins the expected implementation commit, parent, tree, and exact 20-path delta, and returns
  `GO` with a `BLOCKER` section reading "None.", exactly one `SHOULD-FIX` (S1: an unreadable
  bundle file raises an uncaught exception in the validator) and exactly three `NICE-TO-HAVE`
  items (N1: `proof_graph_reproduction_mismatch` also covers bound-formation failures; N2:
  `sqrtRoundingCellChecks` over-counts a shared root; N3: the evaluator throws on
  `null`/`undefined`).
- The supplemental result `befb9dc969d352764ca71152d56f6325980267d5` is a direct child of the
  implementation, states its role as an author-context supplemental self-review, marks its
  independence boundary as **not independent**, returns **NO-GO** for the exact unrepaired
  implementation on two hostile-input exception findings (the evaluator destructure throw and
  the validator's uncaught filesystem read), and reports no counterexample or understated
  accepted bound against the numerical derivation.

## 3. Filesystem and malformed-shape attack results (S1)

The new preflight and every subsequent read were inspected, then attacked with a reviewer
battery of 26 cases against the freshly regenerated bundle plus a passing no-mutation control.
Every case returned a deterministic, nonempty error list with exit code 1 and **zero** uncaught
exceptions or stack traces:

- missing bundle root → "evidence bundle cannot be read"; a regular file as the root →
  "evidence bundle root must be a directory"; an empty directory, an extra root entry, and a
  removed required entry → the closed-surface error;
- a directory in place of `truth-error-support-candidate.ts` — the original S1 `EISDIR`
  reproducer — now returns "evidence bundle entries must be regular files", as do directories
  in place of `runtime-series-candidate.ts` and `environment.json`;
- a symlinked source copy remains rejected ("symlinks are not allowed in the evidence bundle");
- malformed JSON in each of the five parsed JSON inputs, a malformed manifest, JSON roots of
  `null` and `[]` in three files, and a nested wrong-typed field all refuse without exception
  (structural failures inside the wrapped body surface as the structured
  "cannot be read or is structurally invalid" refusal).

Error containment weakens nothing: the closed expected-file set, manifest binding, source-copy
binding against the checkout, exact expected-commit binding (all-zero and uppercase commits
refused), and semantic checkpoint validation (a promoted checkpoint copy still refuses) all
still reject, and a damaged bundle never validates. The 22 bundled mutation probes below pass
through the same wrapped entry point.

## 4. Diagnostic separation (N1) and square-root accounting (N2)

**N1.** The complete `replayWithProof` result flow was inspected: every `bound === undefined`
site in all four bound-forming branches now returns
`{ failureClassification: "truth_error_bound_not_finite" }`, and both series-loop exhaustion
paths return `proof_graph_reproduction_mismatch`; the composed evaluator maps the failure
object straight to a refusal before any projection-margin logic. Because bound formation cannot
fail on currently valid inputs, a reviewer-owned instrumented copy of the repair source was
used, differing only by env-gated forcing lines (verified by diff: two `return undefined`
gates in the bound helpers and one iteration bump after replay). Results: forced central and
lower-tail bound-formation failures return classification `truth_error_bound_not_finite`;
forced replay divergence (iteration count off by one) returns
`proof_graph_reproduction_mismatch`; both refuse with `runtimeSupportClaimed: false` and
`supportedDomainClaimed: false`; controls before and after accept. No proof failure can fall
through to projection-margin acceptance. The reviewed checkout was not modified.

**N2.** The executed native square-root count was derived independently for each operation
path: exact zero → 0; df-2 central → 1; df-2 tail → 1 (one root feeding both the `root + 1`
addition and the product); central series, even df → 1 and odd df → 2; lower tail, even df → 0
and odd df → 2. Across all 1,234 accepted corpus cases below, the repair's reported
distinct-label count equals this derivation in **every** case. The required regression holds:
`df=2, t=2 → proof.sqrtRoundingCellChecks === 1` with `sqrtRoundingCellsVerified: true`. One
verified root feeding multiple operations is counted once (label-set union), while distinct
executed root labels stay distinct (odd paths report 2). A one-ordered-cell perturbation of
every executed host square root in a reviewer-only instrumented copy still refuses with the
correct per-label `*_rounding_cell` failures on all nine probed path/df combinations — zero
acceptances, so the counting repair weakens neither `sqrtRoundingCellsVerified` nor failed-root
refusal.

## 5. Direct hostile-input results (N3 and supplemental)

The exported truth-error and table-integration evaluators were called directly with 29 hostile
shapes each (58 calls): `null`, `undefined`, numbers, strings, booleans, bigints, functions,
arrays, empty objects; missing, extra, inherited-only, and wrong-typed fields; boxed numbers;
`NaN`, both infinities, negative zero, non-integer, zero, negative, and out-of-range df; a
null-prototype object; a proxy throwing from key enumeration and property access; and a
throwing getter. **Zero throws** and zero true runtime/supported-domain claims. Invalid shapes
refuse on the existing non-authoritative surface (`invalid_candidate_input` /
`runtime_graph_refusal`). A null-prototype object carrying exactly the two correctly typed
fields is accepted by both evaluators — a structurally valid input, identical to the original's
behavior.

`validatePairedTNumericalReadinessCandidate`, `validatePairedTSupportDomainCandidate`, and
`validatePairedTSupportBoundaryCorpus` were exercised with the same hostile top-level values
plus malformed nested values (90 calls): every call returned a nonempty error list without
throwing. The three checked-in valid documents still return zero errors, and promotion,
unknown-field, and missing-field mutations remain rejected, as does reordering the
support-domain candidate's deferred-predicate list. Reversing the boundary corpus's `cases`
array is accepted — verified identical in the original implementation and semantically
harmless by construction: the validator matches cases by `case_key` against a closed expected
set with duplicate and undeclared-case detection, so array order carries no meaning. Not a
repair regression.

## 6. Original-to-repair numerical and graph invariance

A reviewer-owned corpus of **1,380 inputs** — for every df 1 through 200: a seeded random
central value, exactly `1`, both adjacent cells around `1`, an ordinary tail, and a deep tail;
plus, for 15 selected df including 2, 72, and 197: exact zero, `1e-300`, `5e-324`, `1e-16`,
`1e-8`, `1e2`, `1e4`, `1e8`, `1e150`, `1e300`, `Number.MAX_VALUE`, and the minimum normal —
was evaluated identically on detached checkouts of the original implementation and the repair,
capturing graph acceptance/refusal, branch, p-value bits, iterations, caps, projection class,
and the full proof surface (all three gamma indices, remainder multiplier, truncation and
relative bounds, ULP bound, projection margin cells, disposition, refusal classifications).

Result: **zero non-permitted differences.** The only differences anywhere are the seven
documented square-root-count corrections, all on `df2-tail-closed-form` (2 → 1). Graph values,
acceptances, refusals, bounds, and margins are bit-identical; no understated bound, changed
graph value, or new acceptance exists.

## 7. Regenerated bundle, probes, table hash, and pointwise witness

At the exact repair commit, with a fresh pinned environment
(CPython 3.12.3, python-flint 0.9.0, FLINT 3.6.0, single-threaded), the 20-case runtime-series
bundle was regenerated with `NOMUE_GENERATOR_COMMIT` pinned:

- the unmodified bundle validates (`paired-t runtime-series evidence bundle: valid`);
- all **22** bundled mutation probes are rejected with no uncaught exception;
- dispositions: **16** candidate acceptances, **3** `truth_error_proof_precondition_failed`,
  **1** `projection_margin_not_established`;
- the df 197 witness carries graph bits `284f4ce6230625df`, truth bits `284f4ce623062755`,
  distance **374** cells, and the repair evaluator derives its input-specific candidate bound
  of **2,978** cells;
- **zero** accepted pointwise distances exceed their candidate bounds;
- the reviewed inverse-beta table bytes were independently rehashed:
  `sha256:ba1f992199e9e153956589d62dcf5a6509575100bb7c923c170bfa45fdd76c08` — unchanged.

Bundle-byte identity with the original implementation's bundle is not expected (provenance
embeds the repaired sources and commit) and was not used; the numerical case results above are
the invariance evidence.

## 8. Authority, Release 1, and repository-wide results

- The content-addressed authoritative snapshot at the repair commit is
  `sha256:d934f1781ead93c909571ec2c9af820f178568e999b39628076a38537408ed4c` — unchanged, and
  the PR #46 merge tree is byte-identical to the repair tree, so the merge changed nothing
  further. No registry, schema, conformance, reference-verifier, Public Check, bundle,
  normative, or Release 1 path appears in the delta.
- The truth-error support checkpoint is untouched: `runtime_support_enabled`,
  `supported_domain_claimed`, and `truth_error_bound_selected` all remain `false`; the witness
  fields remain the pointwise `374` / `2,978` facts with `finite_pointwise_fact_not_global_bound`
  posture; readiness closures remain `incomplete`; the support-domain predicate
  `truth_error_and_projection_margin_support` remains `deferred`. No bound, predicate, df
  maximum, domain, platform matrix, reason-code set, runtime table, table hash, Public Check,
  bundle, R2-D5 completion, or Release 2 state is selected anywhere in the delta.
- Public review issue #25 remains **open** with its window running.
- From the clean exact checkout: `corepack pnpm install --frozen-lockfile` succeeded and
  `corepack pnpm check` exited 0 (full suite). The `tsx` entry points ran normally, so no
  substitution was needed. `git status --porcelain` is empty afterward with `HEAD` still at the
  exact repair commit. Environment: Node v22.22.2, pnpm 11.7.0 (corepack), CPython 3.12.3,
  python-flint 0.9.0, FLINT 3.6.0, Linux x86_64.

## 9. Findings

```text
ID: C1
Severity: NICE-TO-HAVE
Title: Input-shape strictness now differs between the truth-error and table-integration
  evaluators
Affected files:
  tooling/src/spikes/paired-t-truth-error-support-candidate.ts (parseCandidateInput);
  tooling/src/spikes/paired-t-runtime-table-integration-candidate.ts
  (evaluatePairedTRuntimeSeriesWithCandidateTable)
Evidence: The repaired truth-error evaluator requires exactly the two own keys and
  refuses an input carrying an extra field or only prototype-inherited fields
  (runtime_graph_refusal / invalid_candidate_input). The table-integration evaluator
  accepts those same shapes when the two field values are correctly typed and valid,
  exactly as the original reviewed implementation did on both surfaces. No call throws,
  values remain fully type-checked, and runtime/supported-domain claims remain false in
  every case.
Independent reproduction: Call both exported evaluators with
  { degreesOfFreedom: 10, testStatistic: 1, extra: 1 } and with an object inheriting
  both fields from its prototype; compare against the original implementation checkout.
Why it matters: Purely a cross-surface consistency observation. The lenient surface is
  unchanged, previously reviewed behavior, so this is not a regression and does not
  affect closure; aligning the two shapes' handling would remove a minor asymmetry a
  future reader might question.
Required repair (optional): Apply the same exact-own-keys parse to the
  table-integration evaluator in a later increment, or document the intended leniency.
Retest conditions: The two probes above refuse on both surfaces, and the invariance
  corpus over declared-shape inputs still shows zero differences.
```

No `BLOCKER` findings. No `SHOULD-FIX` findings.

## 10. Close-only verdict

**CLOSED.** Independent S1 and N1–N3 and the supplemental hostile-input findings are repaired
exactly as intended — filesystem preflight and error containment without weakened bindings,
separated diagnostic classifications that cannot fall through to acceptance, distinct-label
square-root accounting that preserves every refusal, and throw-free hostile-input handling on
every exported surface in scope — with bit-identical numerical and graph behavior on the
declared input surface and every numerical and authority decision left unselected. The
original candidate-scoped `GO` remains valid with its explicitly unapproved claims unchanged.

## Provenance

- Contributor role: independent close-only reviewer, separate from the repair author; the same
  reviewing role that recorded the original independent findings.
- Review scope: the ten-file delta `34da4fc1…` → `84debc3f…` (tree `cf339e15…`), the
  close-review protocol at `1234b8a2…`, the review topology commits `773b0ead…` and
  `befb9dc9…`, and the invariance of the previously reviewed numerical surfaces as
  dependencies.
- Independence boundary: all attack batteries, the 1,380-case invariance corpus, the
  square-root path derivation, and both instrumented forcings were reviewer-owned; the
  instrumented copies differ from the repair source only by env-gated exposure lines and were
  never written into the reviewed checkout; the completed numerical derivation review was not
  repeated, per the protocol's scope.
- Date: 2026-08-30.
