# Release 2 R2-D5 final selection record

Status: **DECISION INPUT — nothing is selected, issued, frozen, or adopted.**

[Evidence and disposition index](EVIDENCE-AND-DISPOSITION.md) requires that the final
R2-D5 record "select or explicitly defer" each listed item, and that "a reference to an
earlier candidate review is insufficient when the item is still unselected". This
document is that record in its prepared form: for every required item it fixes the exact
candidate selection that is put forward, its evidence identity, what that evidence does
not establish, and the residual gap. Where no selection can be put forward it says so.

The steward disposition itself is a separate increment. The earliest permitted decision
time under [RFC #25](https://github.com/licklider-ai/nomue-protocol/issues/25) is
`2026-09-25T20:52:54Z`, and elapse of that window is necessary, not sufficient.

## 1. Fixed identity of this record

| Item                           | Fixed value                                                                                        |
| ------------------------------ | -------------------------------------------------------------------------------------------------- |
| Record target commit           | `b02b3bcc681d259c72edde2afcc513a79d944bd0`                                                         |
| Record target tree             | `1ff8c1f945a7a57e5925b64ac3d484143a5d8983`                                                         |
| Governing discussion           | [RFC #25](https://github.com/licklider-ai/nomue-protocol/issues/25), opened `2026-08-26T20:52:54Z` |
| Earliest decision time         | `2026-09-25T20:52:54Z`                                                                             |
| Decision under preparation     | R2-D5 in the [decision ledger](DECISION-LEDGER.md)                                                 |
| Aggregate candidate readiness  | `governance/drafts/release-2-candidate/numerical/final-r2-d5-review-readiness-candidate.json`      |
| Aggregate recorded snapshot    | `c1fc9985a9a6d989ba6985bc0d103463f86e6840`                                                         |
| Candidate-development approval | Partial D5 decision recorded `2026-08-27`, candidate development only                              |

The record is bound to the target commit above. Any later head requires the binding
verification in section 3 to be repeated before this record is used as decision input.

## 2. What this record does and does not do

It does:

- state the exact candidate selection put forward for each required R2-D5 item;
- bind each selection to the artifact, key, and review receipt that carries it;
- separate a candidate selection from an authoritative one, and a finite observation
  from a bound;
- name the residual gap for every item, including the items that cannot be selected; and
- identify the remaining holds that stand between this record and a steward disposition.

It does not:

- take, anticipate, or imply the R2-D5 decision;
- issue a Requirement ID, Protocol identifier, schema, Public Check, reason code, or
  Bundle;
- freeze a numerical contract, tolerance, table, or supported domain;
- register a supported platform, runtime, or execution predicate;
- enable paired-t support or alter Release 1;
- rewrite any durable review result or earlier candidate checkpoint; or
- substitute for the independent exact-head numerical review required by item D5-S11.

## 3. Binding and drift verification at the record target

Every input this record relies on was checked against the target commit rather than
trusted from a declaration.

**All 26 bindings recorded by the aggregate are byte-identical at the target commit;
zero drifted.** That covers the eighteen source bindings of the aggregate readiness
checkpoint and, for each of decision groups 1 through 4, both the closure checkpoint and
its preserved closure review result.

Reproduce:

```sh
python3 - <<'PY'
import json, subprocess
agg = "governance/drafts/release-2-candidate/numerical/final-r2-d5-review-readiness-candidate.json"
d = json.load(open(agg))
def head_blob(p):
    return subprocess.check_output(["git", "rev-parse", f"HEAD:{p}"], text=True).strip()
rows = [(b["path"], b["blob"]) for b in d["source_snapshot"]["bindings"]]
for c in d["prerequisite_candidate_closures"]:
    rows.append((c["checkpoint"], c["checkpoint_blob"]))
    rows.append((c["closure_review_result"], c["closure_review_result_blob"]))
drift = [(p, b, head_blob(p)) for p, b in rows if b != head_blob(p)]
print(f"checked {len(rows)}; drifted {len(drift)}")
for row in drift:
    print("DRIFT", row)
PY
```

Two content hashes carried by the selections were recomputed from the committed bytes
rather than copied:

| Quantity                             | Recomputation                                                                                                                        | Result                       |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------- |
| Tail inverse-beta table content hash | `sha256` of the raw committed file `tooling/r2-paired-t-runtime-series/runtime-inverse-beta-table.candidate.json`                    | matches `ba1f9921…fdd76c08`  |
| Fixed-95 ordered-cell content hash   | `sha256` of `tableContent()` in `tooling/src/spikes/validate-paired-t-critical-value-table-evidence.ts` over the 200 committed cells | matches `24ccc86d…7e7dea3c0` |

Post-snapshot drift, from the aggregate's snapshot `c1fc998` to the record target:

- The Release 2 candidate surface changed by addition only — the final review-readiness
  checkpoint, two adversarial-review protocols, its preserved review result, and two
  chronology README updates. No candidate value, schema, fixture, migration matrix,
  surface-impact table, or numerical artifact changed.
- `reference/` changed in two commits: the introduction of `reference/SOURCE-PIN.json`
  with the pinned-Verifier mirror consistency check, and PR #351's df=1 Student-t centre
  precision fix in `reference/stats-kernel/src/t-distribution.ts`. The Release 2
  candidate does not consume that kernel, so no candidate evidence is invalidated. The
  later authoritative landing still has to run Release 1 compatibility evidence against
  the post-#351 tree and record the resulting exact target.

## 4. Required selection items

Disposition values used below:

- **SELECTION_PROPOSED** — a reviewed candidate selection exists and is put to the
  steward as written.
- **OPEN_HOLD** — no selection can be put forward yet; a named prerequisite is missing.

No item carries an authoritative selection. Every value below is unissued.

### D5-S01 — Supported input and output domain

**Disposition: SELECTION_PROPOSED.**

| Dimension                   | Proposed value                                                        |
| --------------------------- | --------------------------------------------------------------------- |
| Pair count                  | minimum `2`, maximum `201`                                            |
| Degrees of freedom          | minimum `1`, maximum `200`                                            |
| Degrees-of-freedom relation | `exact_integer_n_pairs_minus_one`                                     |
| Parsed outcome values       | `finite_binary64_after_strict_json_and_canonical_ingress`             |
| Negative zero               | `outside_candidate_scope`                                             |
| Scalar magnitude bound      | `null` — no rectangular magnitude box is selected                     |
| Scope form                  | `operation_stage_predicate_conjunction_not_rectangular_magnitude_box` |
| Guarantee form              | `predicate_bounded_per_input_not_corpus_membership`                   |
| Test-statistic tail input   | `absolute_value_after_negative_zero_rejection`                        |

The df extent is derived from the joined extents of the two reviewed tables under the
paired-t df relation, with `finite_evidence_maximum_alone_is_selection_basis: false`.
Ten named operation-stage predicates plus a finite-intermediate defensive postcondition
carry the domain; there is no scalar bound to check.

Evidence: `…/numerical/candidate-supported-scope-resource-bounds-candidate.json`
(blob `7d6572db31f40fb63619edadd9a2b76ff2b35d1e`), closed by
[Group 1 closure review](../../../review-inputs/r2-d5-group-1-scope-resource-closure/REVIEW-RESULT.md)
at head `897bd5b0ff0d9723fd6a319fc8c1a3b9d586b186` with zero unresolved findings. It
establishes a reviewed candidate scope selection; it does not establish an authoritative
supported bound, supported domain, or runtime support.

Residual gap: the selection is candidate-scoped only. `supported_domain: false` and
`authoritative_supported_pair_or_df_bound: false` remain recorded across the candidate
set.

### D5-S02 — Supported execution tuple and controlled-process enforcement

**Disposition: SELECTION_PROPOSED.**

One exact tuple, `entry_count: 1`:

| Field             | Value                                                              |
| ----------------- | ------------------------------------------------------------------ |
| Tuple key         | `node-24.19.0-v8-13.6.233.17-node.51-linux-x64-official-binary`    |
| Runtime           | `node` `24.19.0`                                                   |
| Engine            | `v8` `13.6.233.17-node.51`                                         |
| Platform          | `linux` / `x64`                                                    |
| Executable sha256 | `bc17c508ffeed0ec622934f9b7fa72f8e78da65350e63c3eceb56fa688aa5e12` |

Controlled-process profile
`paired-t-group-3-pure-js-permissioned-single-process-profile-1`: required flags
`--permission`, `--no-addons`, `--disallow-code-generation-from-strings`,
`--frozen-intrinsics`; read grants limited to the compiled candidate tree and the exact
runtime executable; `addons`, `child_process`, `worker_threads`, `wasi`, `inspector` and
filesystem write forbidden; runtime intrinsic identity checked before and after; same
invocation environment and full-trace reverification required.

Admission evidence: 6 cases, 19 compiled files, 145 optimization-match lines, cold and
optimized rows identical, manifest
`sha256:2aef6ddd1177a6bcae62d32325a03486c7b0ee838b48f57d6b11078fa7cf42f2`. The normalized
cold, hot, validation and compiled-hash files are committed under
`…/numerical/group-3-admission-evidence-5563bae/`, so custody does not depend on the
hosted run.

An unlisted tuple is a `candidate_admission_refusal_without_frozen_protocol_reason_code`.

Evidence: `…/numerical/supported-execution-selection-candidate.json` (blob
`2b90bf761693b93dae53870acadf67599aba1f06`), closed by
[Group 3 closure review](../../../review-inputs/r2-d5-group-3-supported-execution-closure/REVIEW-RESULT.md)
at head `32549c855a3ecbdfb8761a617b1a3753cb7caa01`. It does not establish broad
cross-platform support, an authoritative allowlist, an authoritative controlled-process
profile, or an issued supported-execution predicate.

Residual gap: Windows and macOS are not admitted. The repository's multi-platform CI is
not admission evidence for this tuple set, and the record puts a one-entry matrix to the
steward deliberately.

### D5-S03 — Quantity-specific numerical error and comparison tolerance policy

**Disposition: SELECTION_PROPOSED for the comparison form; numeric tolerances remain
unselected by design.**

| Comparison surface                     | Proposed rule                                         |
| -------------------------------------- | ----------------------------------------------------- |
| Operation-graph reproduction           | `exact_binary64_bit_identity`                         |
| Mathematical truth error               | `exact_rational_enclosures_and_input_specific_bounds` |
| Target-format projection               | `exact_rounding_cells_with_strict_pointwise_margin`   |
| Generic cross-implementation tolerance | `null`                                                |
| Quantity-specific tolerances           | `null`                                                |
| Global truth-error constant            | not required (`false`) and not selected (`false`)     |

The candidate position is that a tolerance constant is replaced, not deferred: exactness
plus per-input bounds plus a strict projection margin carry the comparison, so no global
constant is required. That is a substantive claim for the steward to accept or reject,
not a gap being papered over.

Evidence: `…/numerical/runtime-numerical-contract-full-trace-candidate.json` (blob
`74885507600f7fcb476af4a52d612415d68229d7`), closed by
[Group 2 closure review](../../../review-inputs/r2-d5-group-2-runtime-numerical-contract-closure/REVIEW-RESULT.md)
at head `ef62d8a047026eb7226a0fa38ef27dbd1a49b017`.

Residual gap: if the eventual Public Check needs any cross-implementation tolerance, no
value is selected, and `quantity_comparison_tolerance` is on the list of claims
prohibited before final R2-D5. Any tolerance that is later adopted belongs in
[`registries/public-checks.yaml`](../../../registries/public-checks.yaml) under a check
version, never in a Record.

### D5-S04 — Student-t tail and fixed-95 critical-value table identities

**Disposition: SELECTION_PROPOSED at candidate-contract scope.**

| Table             | Identity                                                                                                                    |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Tail inverse-beta | `tooling/r2-paired-t-runtime-series/runtime-inverse-beta-table.candidate.json`                                              |
| Content hash      | `sha256:ba1f992199e9e153956589d62dcf5a6509575100bb7c923c170bfa45fdd76c08` (recomputed, § 3)                                 |
| Extent            | df `1` through `200`, `entry_count: 200`                                                                                    |
| Constant          | `one_over_beta_df_over_two_one_half`, target `binary64_round_ties_to_even`                                                  |
| Certificates      | primary `arb_gamma_ratio_exact_integer_df`; secondary exact even recurrence or Machin-π odd recurrence                      |
| Fixed-95 table    | `…/numerical/fixed-95-critical-value-table-selected-candidate.json` (200 committed cells)                                   |
| Ordered-cell hash | `sha256:24ccc86d7a49b9e1ef1e3fc9b038a5b8d338b8b5ca4a02492d8900d7e7dea3c0` (recomputed, § 3)                                 |
| Fixed-95 routes   | primary `arb_forward_probability_midpoint_bracketing`; secondary rigorous density quadrature or executed low-df closed form |

Both tables are selected `for_group_2_candidate_contract` /
`for_candidate_ci_work_only`. `authoritative_protocol_table_selected: false` and
`final_content_hash: null` remain recorded.

Residual gaps:

- The final Protocol table selection and its content hash are open, and
  `supported_degrees_of_freedom_maximum` is `null`.
- A correctly rounded runtime p-value is explicitly not claimed.
- Two-route independence is qualified: the sync artifact records
  `two_route_independence: "method_distinct_shared_arb_flint_common_cause"`. The routes
  differ in method but share the arb/FLINT implementation, so they are not two
  independent implementations.
- Earlier per-table checkpoints still read `runtime_table_selected: false` and
  `independent_review_complete: false`; those are the pre-Group-2 chronology, superseded
  by the Group 2 contract selection, and are not current blockers.

### D5-S05 — Subnormal, non-finite, nonrepresentable and certificate-failure ordering

**Disposition: SELECTION_PROPOSED.**

Ten operation-stage first-failure classes, in the order fixed by the reviewed boundary
corpus (an eleventh case is an ordinary success control):

1. `PAIR_COUNT_BELOW_TWO`
2. `DIFFERENCE_OVERFLOW`
3. `ZERO_DIFFERENCE_VARIANCE`
4. `DIFFERENCE_VARIANCE_ERASED_BY_ROUNDING`
5. `MEAN_ACCUMULATION_OVERFLOW`
6. `CENTERING_OVERFLOW`
7. `SQUARED_DEVIATION_OVERFLOW`
8. `VARIANCE_ACCUMULATION_OVERFLOW`
9. `VARIANCE_UNDERFLOW`
10. `STANDARD_ERROR_SQUARED_UNDERFLOW`

Stage-specific policies:

| Stage                                     | Policy                                                |
| ----------------------------------------- | ----------------------------------------------------- |
| Parsed input subnormal                    | `not_blanket_refused`                                 |
| G4 intermediates                          | stage-specific predicates plus a finite postcondition |
| Tail proof-tracked positive intermediates | `strictly_above_minimum_normal_binary64`              |
| p-value subnormal or zero                 | `fail_closed_outside_candidate_scope`                 |
| Confidence-interval intermediates         | finite binary64 and strictly ordered endpoints        |
| Confidence-interval collapse              | `fail_closed_outside_candidate_scope`                 |
| Resource limit reached                    | `fail_closed_without_support_claim`                   |

`blanket_subnormal_refusal_selected: false` is deliberate: a subnormal parsed input is
not refused, while a subnormal proof-tracked intermediate or a subnormal p-value is.

Evidence: `…/numerical/support-domain-boundary-cases.json` for the ordered corpus and
the Group 2 contract for the stage policies.

Residual gap: each class maps to an unissued candidate reason code (D5-S06); nothing in
this ordering is frozen.

### D5-S06 — Final scoped reason-code set and report propagation

**Disposition: SELECTION_PROPOSED.**

Five candidate Public Checks, in evaluation order, all `unissued`:

| #   | Key                                  | Candidate spelling                                                     |
| --- | ------------------------------------ | ---------------------------------------------------------------------- |
| 1   | `record_conformance_check`           | `https://nomue.ai/id/check/record-conformance/0.3.0-draft.1`           |
| 2   | `record_integrity_check`             | `https://nomue.ai/id/check/record-integrity/0.3.0-draft.1`             |
| 3   | `paired_profile_admissibility_check` | `https://nomue.ai/id/check/paired-profile-admissibility/0.1.0-draft.1` |
| 4   | `paired_t_computability_check`       | `https://nomue.ai/id/check/paired-t-computability/0.1.0-draft.1`       |
| 5   | `paired_t_recompute_check`           | `https://nomue.ai/id/check/paired-t-recompute/0.1.0-draft.1`           |

Inventory counts: 4 record-level reason mappings (all `registered_reuse` —
`NRS-SCHEMA-INVALID`, `NRS-SEMANTIC-CONFORMANCE-FAILED`, `NRS-DIGEST-MISMATCH`,
`NRS-CANONICALIZATION-FAILED`), 25 relationship source classifications, 11 retained
operation-stage reason-code candidates, 12 declared-result comparison mappings, and 10
support-dependent decisions — **all 10 resolved, 0 unresolved**.

The 11 operation-stage candidates are `NRS-PAIRED-T-PAIR-COUNT-BELOW-TWO`,
`-DIFFERENCE-OVERFLOW`, `-ZERO-DIFFERENCE-VARIANCE`,
`-DIFFERENCE-VARIANCE-ERASED-BY-ROUNDING`, `-MEAN-ACCUMULATION-OVERFLOW`,
`-CENTERING-OVERFLOW`, `-SQUARED-DEVIATION-OVERFLOW`,
`-VARIANCE-ACCUMULATION-OVERFLOW`, `-VARIANCE-UNDERFLOW`,
`-STANDARD-ERROR-SQUARED-UNDERFLOW` and `-NON-FINITE-INTERMEDIATE`, each
`candidate_unissued` and owned by `paired_t_computability_check`.

Ownership: relationship classifications default to the admissibility check, with
`PAIR_COUNT_BELOW_TWO` excepted to the computability check; declared-result comparisons
belong to the recompute check; support-dependent and runtime classifications to the
computability check. `NRS-INTERNAL-VERIFIER-ERROR` is `registered_reuse`, is not
Record-caused, and carries no Public Check attribution.

Evidence: `…/numerical/final-reason-code-inventory-candidate.json` (blob
`d58c3bfc7df18a0d54edab090333de3742ba632e`), closed by
[Group 4 closure review](../../../review-inputs/r2-d5-group-4-final-reason-code-inventory-closure/REVIEW-RESULT.md)
at head `8909d31cce3d36303e403103f459b10127e87a1b`.

Residual gap: `reason_codes_frozen: false` and `public_checks_issued: false`. Freezing
and issuance happen only in the final authoritative change set, together with the
identifiers decided under R2-D3 and R2-D4.

### D5-S07 — Corpus coverage versus the supported-domain claim

**Disposition: SELECTION_PROPOSED.**

The explicit guarantee statement put forward:

- corpus artifact `…/numerical/candidate-supported-scope-resource-corpus.json`,
  canonical `sha256:19349e5ed5e4ebbe582abe426a6024398940915da04f5c1085f797b4c82d46a7`
  under `recursive_lexicographic_object_keys_compact_json_utf8`;
- `finite_corpus_defines_domain: false`;
- `finite_corpus_maximum_is_error_or_resource_bound: false`;
- `candidate_guarantee_form: predicate_bounded_per_input_not_corpus_membership`;
- `unexercised_input_requires_same_checks: true`.

This is the validated-corpus versus domain-bounded statement the ratification package
requires: passing the corpus is not the guarantee, and an input outside the corpus is
subject to the same per-input predicates rather than being refused for absence.

Residual gap: none specific to the statement. Its force depends on D5-S11.

### D5-S08 — Reproducible environment record for the independent oracle corpus

**Disposition: SELECTION_PROPOSED, with a material custody gap.**

Environment of the p-value enclosure oracle:

| Field               | Value                                                                     |
| ------------------- | ------------------------------------------------------------------------- |
| Python              | `3.12.14`, `CPython`                                                      |
| python-flint        | `0.9.0`                                                                   |
| FLINT               | `3.6.0`                                                                   |
| arb threads         | `1`                                                                       |
| Platform            | `Linux` / `x86_64`                                                        |
| requirements sha256 | `sha256:4cef508304e84c21f73cf412712165dc26e40978cb784bc08a876948b559d90d` |
| Generator commit    | `98da47599053d3e29a2c42f274ffc9c239621ded`                                |
| Workflow run        | `33452181213`, artifact `9780152851`                                      |
| Artifact zip sha256 | `sha256:cf092f0b3bfd4cdb8a32e5fb9864f564390dd0027f847b591be1262c134d1299` |

Internal file hashes are recorded for `MANIFEST.sha256`, `cases.json`,
`certificates.json`, `critical-value-table-manifest.json`, `environment.json`,
`generator.py`, `raw-oracle-output.json` and `requirements.txt`. A missing oracle
dependency exits non-zero and there is no fallback oracle path
(`fallback_oracle_path: false`), so the evidence run cannot silently degrade.

**Residual gap (material).** The hosted artifact records
`artifact_expires_at: 2026-11-29T23:47:55Z`, and the oracle bundle bytes — including
`raw-oracle-output.json` and `environment.json` — are not committed to this repository.
After that date, custody of the oracle corpus rests on recorded hashes alone, with no
retained bytes to hash. The Group 3 admission evidence solves the same problem by
committing normalized evidence files, and the Release 3 programme solves it by committing
the CI archives. Committing the oracle bundle, or an equivalent retained form, before the
authoritative landing is the bounded repair this record identifies; it is not performed
here, and it is a prerequisite for the landing rather than for the steward decision.

A second boundary belongs with this item: the two certificate routes are method-distinct
but share an arb/FLINT common cause, so they are not independent implementations.

### D5-S09 — Boundary and metamorphic tests

**Disposition: SELECTION_PROPOSED.**

| Family                         | Coverage                                                                                                |
| ------------------------------ | ------------------------------------------------------------------------------------------------------- |
| Inclusive pair/df sweep        | every integer pair count `2` through `201` (200 cases)                                                  |
| Operation-stage boundary cases | 11                                                                                                      |
| Tail-truth cases               | 20                                                                                                      |
| Projection-transition df       | `1`, `2`, `3`, `10`, `30`, `100`, `200`                                                                 |
| Projection-transition families | `rounded_one_to_positive_normal`, `positive_normal_to_positive_subnormal`, `positive_subnormal_to_zero` |
| Resource-boundary cases        | 6                                                                                                       |
| Metamorphic relations          | 5                                                                                                       |

The five metamorphic relations are observation and pair permutation (all values and
canonical traces identical); condition-direction swap and outcome sign reversal (mean and
t negated, variance, standard error and p unchanged, interval negated and reversed);
exact power-of-two scale (mean, standard error, margin and interval scaled by two,
variance by four, t and p unchanged); and exact common translation (all returned values
unchanged).

The resource-boundary cases include a three-way probe around the reviewed tail witness:
`72566` nodes refuses, `72567` passes, and the witness itself sits at `72567`.

Residual gap: the corpus is declared and executable at the candidate checkpoints.
Re-execution against the final selected domain at the exact final head is one of the nine
final-review requirements under D5-S11 and has not been performed.

### D5-S10 — Separate maximum-error ledgers

**Disposition: SELECTION_PROPOSED — three separate ledgers exist, each per-input.**

| Ledger                        | Truth model                                                                                                                                                                                                       | Reviewed state                             |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| Algebraic (G4)                | exact-rational differences, mean, sample variance about the exact mean, 2048-bit dyadic square-root enclosure for the standard error, exact-rational test statistic; metric `exact_absolute_rational_upper_bound` | independently reviewed, candidate complete |
| p-value / Student-t tail      | input-specific normal binary64 roundoff plus positive series remainder; unit roundoff `2^-53`; exact rational with exact integer ULP ceiling; a-posteriori positive geometric remainder bound                     | M2 closed, independently reviewed          |
| Confidence-interval endpoints | same-trace exact-rational endpoint envelope reusing the G4 truth interval and the half-ULP quantization of the correctly rounded fixed-95 cell                                                                    | M3 closed, independently reviewed          |

The certified tail witness is a **finite pointwise fact, not a bound**: case
`df197-high-error-scout-witness`, df `197`, t `4049333333333333`, observed graph-to-truth
distance `374` ULP under an input-specific candidate bound of `2978` ULP. The same applies
to the reviewed tail resource witnesses `5182` iterations and `72567` trace nodes. Each is
recorded with `eligible_as_global_or_supported_bound: false`.

Residual gap: there is no global maximum-error constant for any of the three quantities,
by selection rather than omission — `global_truth_error_constant_required: false`. A
steward who wants a single global constant would be changing the candidate's shape, not
filling a hole. `global_student_t_truth_error_constant` and
`global_confidence_interval_error_constant` are `null` throughout.

### D5-S11 — Independent numerical review disposition

**Disposition: OPEN_HOLD. This is the gating item.**

Independent reviews that do exist, each in its own bounded scope with zero unresolved
findings: Group 1 scope/resources, Group 2 runtime numerical contract, Group 3 supported
execution, Group 4 reason-code inventory, M2 tail numerical closure, M3 confidence-interval
closure, the p-value enclosure evidence closure, and the
[final review-readiness review](../../../review-inputs/r2-d5-final-review-readiness/REVIEW-RESULT.md),
which returned `GO` at head `35ab094c9106903e6b8e87a144cfbd8cd52ae124`.

What blocks the item: that `GO` states in its own terms that it establishes only a
complete, internally consistent, independently revalidated review-readiness package, with
final selection and steward disposition still blocked by the RFC window, and that **any
different head requires a new independent exact-head review**. The record target is
`b02b3bc`, not `35ab094`. The nine requirements recorded for the final review are
unmet as a set:

1. exact-head numerical review required;
2. review independent of the implementation authoring context;
3. source bindings and review chains reconstructed from Git objects;
4. selected-domain oracle, boundary and metamorphic evidence re-executed;
5. controlled-process evidence replayed for every candidate tuple;
6. reason inventory and unknown-classification fail-closed rechecked;
7. all repository validation gates green;
8. review result preserved before steward disposition; and
9. steward disposition performed as a separate post-window increment.

Requirement 3 is satisfied for the binding set at the record target by section 3 of this
document, but that is coordinator work in the authoring context and is not the
independent review. Requirements 1, 2, 4, 5, 6 and 8 are open.

Residual gap: commissioning and preserving that exact-head independent numerical review
is the single largest remaining task before R2-D5 can be disposed.

### D5-S12 — Runtime operation graph and full-trace predicate

**Disposition: SELECTION_PROPOSED.** Supplementary to the two required lists; it carries
Group 2 outputs that the lists do not name separately.

Envelope format `paired-t-runtime-numerical-contract-full-trace-v1`, seven ordered
stages:

1. `reviewed_g4_pairwise_two_pass_actual_trace`
2. `reviewed_g4_exact_rational_truth_envelope`
3. `reviewed_table_connected_positive_series_tail_trace`
4. `reviewed_same_trace_input_specific_tail_truth_and_projection`
5. `reviewed_fixed_95_confidence_interval_actual_trace`
6. `reviewed_same_trace_confidence_interval_endpoint_truth_envelope`
7. `closed_group_1_resource_envelope`

Seven same-trace bindings are required: raw input to G4 trace; G4 trace to tail input; G4
trace to G4 truth; G4 trace to interval trace; G4 truth and interval trace to endpoint
truth; returned p-value to tail trace; returned interval to interval trace. One input and
one G4 trace serve every stage, and every traced primitive is verified exactly. Acceptance
requires all stage verifiers, same-trace bindings, truth, projection and resource checks
to pass; failure is `fail_closed_without_support_claim`.

Residual gap: `supported_execution_predicate_selected: false` at this layer —
composition with the platform predicate is Group 3's, and
`platform_admission_required_separately: true`.

### D5-S13 — Trace resource envelope

**Disposition: SELECTION_PROPOSED.** Supplementary, as for D5-S12.

| Component                | Rule                                      | Maximum  |
| ------------------------ | ----------------------------------------- | -------- |
| G4 trace nodes           | `5_times_n_pairs_plus_3`                  | `1008`   |
| Tail trace nodes         | deliberately selected fail-closed ceiling | `100000` |
| Tail iterations          | `40_times_df_plus_64`                     | `8064`   |
| Interval-specific nodes  | fixed                                     | `3`      |
| Combined primitive nodes | component sum                             | `101011` |

The tail node ceiling is recorded as `deliberately_selected_not_an_observed_corpus_maximum`,
and the historical `2048` G4 evaluation ceiling is explicitly not selected as a bound.
Reaching any limit is `fail_closed_without_support_claim`.

Residual gap: the public reason code for resource exhaustion is unissued, and
`platform_admission_complete: false`.

## 5. Coverage of the two required lists

Every bullet of the packet's required list and of the ratification package's R2-D5 inputs
maps to an item above.

| Required item (source)                                                         | Item   | Disposition        |
| ------------------------------------------------------------------------------ | ------ | ------------------ |
| Supported input/output domain incl. sample-size and df boundaries (packet)     | D5-S01 | SELECTION_PROPOSED |
| Supported execution tuple and controlled-process enforcement (packet)          | D5-S02 | SELECTION_PROPOSED |
| Quantity-specific error and comparison tolerance policy (packet)               | D5-S03 | SELECTION_PROPOSED |
| Student-t tail and fixed-95 table identities (packet)                          | D5-S04 | SELECTION_PROPOSED |
| Subnormal/non-finite/nonrepresentable/certificate-failure ordering (packet)    | D5-S05 | SELECTION_PROPOSED |
| Final scoped reason-code set and report propagation (packet)                   | D5-S06 | SELECTION_PROPOSED |
| Corpus coverage versus the supported-domain claim (packet)                     | D5-S07 | SELECTION_PROPOSED |
| Reproducible environment record for the independent oracle corpus (packet)     | D5-S08 | SELECTION_PROPOSED |
| Boundary and metamorphic tests (packet)                                        | D5-S09 | SELECTION_PROPOSED |
| Separate maximum-error ledgers (packet)                                        | D5-S10 | SELECTION_PROPOSED |
| Numerical-review disposition independent of authoring (packet)                 | D5-S11 | OPEN_HOLD          |
| Independent high-precision oracle corpus and environment record (ratification) | D5-S08 | SELECTION_PROPOSED |
| Certified critical-value table evidence (ratification)                         | D5-S04 | SELECTION_PROPOSED |
| Separate maximum-error ledgers (ratification)                                  | D5-S10 | SELECTION_PROPOSED |
| Boundary and metamorphic tests (ratification)                                  | D5-S09 | SELECTION_PROPOSED |
| Validated-corpus versus domain-bounded guarantee statement (ratification)      | D5-S07 | SELECTION_PROPOSED |
| Numerical reviewer disposition independent of authoring (ratification)         | D5-S11 | OPEN_HOLD          |

The ledger's decision rule 2 names six dimensions. They map to D5-S01 (supported domain),
D5-S02 (execution tuple), D5-S03 with D5-S10 (error/tolerance boundary), D5-S04 (fixed-95
table), D5-S05 (failure ordering) and D5-S06 (reason-code outcome). D5-S12 and D5-S13 are
supplementary items carrying Group 1 and Group 2 outputs that the two lists do not name
separately; they are recorded so that no closed candidate output is lost between the
groups and the decision.

## 6. Open holds before a steward disposition

| Hold                                    | State                                                                         |
| --------------------------------------- | ----------------------------------------------------------------------------- |
| RFC #25 minimum window                  | Open until `2026-09-25T20:52:54Z`; elapse alone adopts nothing                |
| Exact-head independent numerical review | Not commissioned for `b02b3bc` (D5-S11)                                       |
| Oracle bundle custody                   | Hosted artifact expires `2026-11-29T23:47:55Z`; bytes not committed (D5-S08)  |
| Corpus re-execution at the final head   | Not performed (D5-S09)                                                        |
| Controlled-process replay per tuple     | Not performed at the final head (D5-S02, D5-S11)                              |
| Repository validation gates             | `pnpm validate` green at `b02b3bc`; the full gate set is a review requirement |
| Discussion feedback                     | RFC #25 feedback has to be considered in the disposition                      |

Two of these are independent of the window and can proceed now: commissioning the
exact-head independent numerical review, and repairing the oracle bundle custody.

## 7. Steward disposition sheet

Deliberately unfilled. A disposition increment records, per item, one of accept as
written, accept with a stated revision, defer out of Release 2, or reject — together with
the deciding date and the head the decision is taken against. Accepting D5 as a whole is
not available while D5-S11 is an open hold.

| Item   | Disposition | Stated revision | Date |
| ------ | ----------- | --------------- | ---- |
| D5-S01 |             |                 |      |
| D5-S02 |             |                 |      |
| D5-S03 |             |                 |      |
| D5-S04 |             |                 |      |
| D5-S05 |             |                 |      |
| D5-S06 |             |                 |      |
| D5-S07 |             |                 |      |
| D5-S08 |             |                 |      |
| D5-S09 |             |                 |      |
| D5-S10 |             |                 |      |
| D5-S11 |             |                 |      |
| D5-S12 |             |                 |      |
| D5-S13 |             |                 |      |

## 8. Non-promotions

At the record target, and unchanged by this record: no supported pair, df, value,
intermediate, test-statistic or endpoint bound is authoritative; the numerical contract is
not frozen; no final Protocol table is selected and no final table content hash exists; no
platform, build or runtime allowlist is issued; no controlled-process profile is
authoritative; no supported-execution predicate is issued; there is no supported domain
and no runtime support; global Student-t and confidence-interval truth-error constants are
`null`; comparison tolerances are `null`; reason codes are not frozen; no Public Check is
issued; the successor Bundle is `unissued`; RFC #25 is open; R2-D5 is incomplete; and
Release 2 is incomplete.

Release 1 meanings, identifiers, schemas, bundles and signed release evidence are
untouched.

## 9. Independence and process disclosure

| Item                  | Value                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------- |
| Accountable role      | Coordinator, in the continuing planning context; not a reviewer role                        |
| Preparation method    | Prepared with an AI coding agent under the owner's instruction                              |
| Date                  | `2026-09-19` (UTC)                                                                          |
| Inspected commit      | `b02b3bcc681d259c72edde2afcc513a79d944bd0`, tree `1ff8c1f945a7a57e5925b64ac3d484143a5d8983` |
| Environment           | Remote Linux x86_64 container, Node `v22.22.2`, pnpm from the pinned workspace              |
| Sources inspected     | Public repository artifacts only, listed inline per item                                    |
| Independence boundary | Authoring context; not independent of the candidate-preparation work                        |

Verification performed: recomputation of 26 git blob bindings, the tail table raw
`sha256`, the fixed-95 ordered-cell content hash under the validator's documented
canonicalization, and the post-snapshot drift, all from public repository sources.
`pnpm validate`, `pnpm lint:markdown` and `pnpm check` were run green at the record
target with this document applied.

This record performs no new primary-source investigation, executes no numerical evidence
generation, and is not the independent exact-head numerical review required by D5-S11.
Self-review is not independent clearance. The exact model identifier of the assisting
agent is not recorded here because the drafting session's configuration bars writing a
model identifier into repository artifacts; the owner can add it to this section if the
provenance policy requires that exact identifier.
