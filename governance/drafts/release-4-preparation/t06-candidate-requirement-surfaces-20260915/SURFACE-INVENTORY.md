# Mandatory surface inventory

Status: **UNISSUED CANDIDATE**. Field names below come from the opening RFC.
This is semantic inventory, not a schema implementation. T07 owns wire syntax.

## Input and declaration fields

| Object           | Exact members                                                                                                      | Binding                                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| Envelope         | $schema, record_type, record_id, revision_id, created_at, interpretation_bundle_id, profile_id, payload, integrity | Existing envelope names, new exact candidate schema/profile/bundle association; record_type nomue-record |
| integrity        | canonicalization_id, digest_algorithm, digest_scope, content_digest                                                | Existing jcs:0.2.0-draft.1; sha-256; record_without_integrity; exclude root integrity exactly            |
| dataset          | dataset_id, observations                                                                                           | Single dataset; array membership binds observation to dataset                                            |
| observations[]   | observation_id, experimental_unit_id, cell_id, outcome_value                                                       | Unique observation IDs; cell_id resolves; repeated unit IDs are admissibility failure                    |
| design           | design_id, dataset_id, factor_order, factors, cells, model_applicability_declared                                  | Exact dataset reference; required boolean, false representable                                           |
| factors[]        | factor_id, level_order                                                                                             | Two distinct factors; two distinct levels within each factor                                             |
| cells[]          | cell_id, levels                                                                                                    | Four unique IDs; level tuple positions follow factor_order; exact Cartesian coverage                     |
| analysis         | analysis_id, design_id, contract_id                                                                                | Exact design and candidate Contract; no method_id alias or producer tail options                         |
| result           | result_id, analysis_id, cell_summaries, residual_sum_of_squares, residual_degrees_of_freedom, contrasts            | Single exact analysis reference; all result members required                                             |
| cell_summaries[] | cell_id, n, mean                                                                                                   | Each design cell exactly once by ID; no positional matching                                              |
| contrasts[]      | kind, signed_estimate, sum_of_squares, f_statistic, p_value                                                        | Each kind A, B, AB exactly once                                                                          |

All listed payload members are required and objects closed. Local IDs use the
existing nonempty localId shape and exact string equality. Level IDs need only be
unique within their factor. Tuple order follows factor_order and level_order, never
lexical cell labels or arbitrary array position. Wrong Contract, missing fields and
unknown members fail conformance. Raw syntax and unsupported routing retain existing
pre-dispatch refusal precedence; no nearby bundle is substituted.

All numerical values are finite parsed binary64. Cell n is a safe integer in
[2,2251799813685247]; residual df is in [4,9007199254740984]. These are representation
ranges, not a standalone public n work cap. Means, estimates and observations may
have either sign; SS and F are nonnegative, p in [0,1], declared SSE strictly positive.
No null, omitted required result, infinity, NaN or undefined-value object is accepted.

## Exact canonical 22-quantity inventory

Every row is scoped to the exact result_id. `cell(00)` etc. are explanatory selectors
for the declared cell IDs at the canonical factor/level tuples, not literal public
IDs or new aliases. The evidence carries the actual cell_id. Payload starts at
`payload`; paths below are relative to that payload. The numerical processing order
is G5 order, independent of Record array order.

| Ordinal | RFC quantity                | Evidence discriminator | Declaration path                             | Comparison                |
| ------- | --------------------------- | ---------------------- | -------------------------------------------- | ------------------------- |
| 1       | n                           | cell_id=cell(00)       | result.cell_summaries[cell_id=cell(00)].n    | exact_integer             |
| 2       | n                           | cell_id=cell(01)       | result.cell_summaries[cell_id=cell(01)].n    | exact_integer             |
| 3       | n                           | cell_id=cell(10)       | result.cell_summaries[cell_id=cell(10)].n    | exact_integer             |
| 4       | n                           | cell_id=cell(11)       | result.cell_summaries[cell_id=cell(11)].n    | exact_integer             |
| 5       | residual_degrees_of_freedom | none                   | result.residual_degrees_of_freedom           | exact_integer             |
| 6       | mean                        | cell_id=cell(00)       | result.cell_summaries[cell_id=cell(00)].mean | strict_projected_binary64 |
| 7       | mean                        | cell_id=cell(01)       | result.cell_summaries[cell_id=cell(01)].mean | strict_projected_binary64 |
| 8       | mean                        | cell_id=cell(10)       | result.cell_summaries[cell_id=cell(10)].mean | strict_projected_binary64 |
| 9       | mean                        | cell_id=cell(11)       | result.cell_summaries[cell_id=cell(11)].mean | strict_projected_binary64 |
| 10      | signed_estimate             | contrast_kind=A        | result.contrasts[kind=A].signed_estimate     | strict_projected_binary64 |
| 11      | signed_estimate             | contrast_kind=B        | result.contrasts[kind=B].signed_estimate     | strict_projected_binary64 |
| 12      | signed_estimate             | contrast_kind=AB       | result.contrasts[kind=AB].signed_estimate    | strict_projected_binary64 |
| 13      | sum_of_squares              | contrast_kind=A        | result.contrasts[kind=A].sum_of_squares      | strict_projected_binary64 |
| 14      | sum_of_squares              | contrast_kind=B        | result.contrasts[kind=B].sum_of_squares      | strict_projected_binary64 |
| 15      | sum_of_squares              | contrast_kind=AB       | result.contrasts[kind=AB].sum_of_squares     | strict_projected_binary64 |
| 16      | residual_sum_of_squares     | none                   | result.residual_sum_of_squares               | strict_projected_binary64 |
| 17      | f_statistic                 | contrast_kind=A        | result.contrasts[kind=A].f_statistic         | strict_projected_binary64 |
| 18      | f_statistic                 | contrast_kind=B        | result.contrasts[kind=B].f_statistic         | strict_projected_binary64 |
| 19      | f_statistic                 | contrast_kind=AB       | result.contrasts[kind=AB].f_statistic        | strict_projected_binary64 |
| 20      | p_value                     | contrast_kind=A        | result.contrasts[kind=A].p_value             | strict_projected_binary64 |
| 21      | p_value                     | contrast_kind=B        | result.contrasts[kind=B].p_value             | strict_projected_binary64 |
| 22      | p_value                     | contrast_kind=AB       | result.contrasts[kind=AB].p_value            | strict_projected_binary64 |

Exactly five integer and seventeen real comparisons: four counts, residual df,
four means, three estimates, three SS, SSE, three F and three p. Internal df pairs,
intercept and coded coefficients do not add public outputs.

## Check result and outcomes

Conformance appears only in the report conformance section. Verification results
bind exact check/version, execution, conditional outcome, scope and reasons. Numerical
scope is result_id, with quantity_results keyed by (result scope, discriminator,
quantity). Recomputed/projected values are present only when established. Whole-check
completion does not imply an overall Record verdict.

| Category                 | Trigger                                                                               | Candidate result / propagation                                                       | Distinction                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| Conformance failure      | Malformed shape / required members / ambiguous local reference / cell cover           | completed/fail conformance; all verification not_run; eligibility not_evaluated      | No numerical conclusion                                                       |
| Admissibility failure    | False model boolean, unequal/insufficient replication, repeated unit                  | admissibility completed/fail; computability/recompute not_run; integrity independent | Eligibility ineligible, not scientific model refutation                       |
| Computability failure    | Observed exact SSE=0                                                                  | computability completed/fail; whole recomputation not_run                            | No fabricated F/p, no partial count success                                   |
| Supported-domain refusal | Cpre>B or full C>B evaluated normally                                                 | Support exclusion, dependent comparisons not_run                                     | Not mismatch or inadmissibility; evaluation error is not false membership     |
| Representation refusal   | D04, positive exact SSE rounds to zero, positive tail rounds to zero                  | Distinct refusal reason; all comparison slots not_run                                | Not indeterminate, no public underflow match                                  |
| Comparison pass          | Eligible resolved target equals declaration                                           | quantity pass; check pass only when all 22 pass                                      | Five exact integers and seventeen projected reals                             |
| Comparison fail          | Eligible resolved target differs; or generic sound candidate set excludes declaration | completed/fail, continue other executable quantities                                 | May prove mismatch even if projection unresolved; no invented point           |
| Completed indeterminate  | Generic eligible unresolved mandatory comparison and no proved fail                   | completed/indeterminate; never pass                                                  | S-C terminal decisions resolve eligible cases; generic controls only          |
| Dependency not_run       | Prerequisite failed, errored, unavailable or not_run                                  | not_run without outcome, blocking reasons                                            | No fabricated recomputed value or quantity success                            |
| Execution failure        | Timeout, crash, resource failure, malformed output or latched invocation failure      | Applicable verifier refusal or check error; no completed partial comparison result   | Not numerical fail or indeterminate; cleanup cannot restore failed invocation |

Within normally completed valid scope, fail dominates unresolved; without fail,
unresolved gives indeterminate; pass requires all 22 passes. Continue comparisons
past mismatch. Generic candidate-set reasoning uses a sound possible-encoding set:
singleton matching declaration passes; declaration outside the set fails even if
projection is unresolved; membership in a non-singleton set is indeterminate. Empty
or unsound sets are procedure failure, never mismatch evidence. S-C supplies an
exact terminal decision for eligible normal completion.

No new global execution/outcome enum or numerical reason IDs are issued here.
T07/T09 represent the already separated categories and retain existing invariants.
The RFC already proposes NRS-BTF-LOCAL-REFERENCE-INVALID, NRS-BTF-IDENTITY-AMBIGUOUS,
NRS-BTF-CELL-COVERAGE-INVALID, NRS-BTF-MODEL-NOT-DECLARED,
NRS-BTF-CELL-COUNTS-UNSUPPORTED, NRS-BTF-UNIT-NOT-UNIQUE and NRS-BTF-ZERO-RESIDUAL.
These remain unissued; existing NRS-SCHEMA-INVALID keeps its original meaning with
future additive BTF applicability. Numerical/refusal reason spelling stays downstream.

Admissibility is the single profile_eligibility carrier: completed/pass -> eligible,
completed/fail -> ineligible, absence/error/not_run -> not_evaluated. It has no
completed indeterminate outcome. Other check outcomes do not change that carrier.
The existing CLI NRS-VERIFY-0025 lacks an indeterminate-only bucket; a current
reference aggregate may return zero there. T09 prepares the candidate CLI/report
mapping so indeterminate is not success, retaining fail precedence. No exit code is
allocated or implementation changed by T06.

## Evidence classification

| Classification                     | Semantic content                                                                            | Reason / boundary                                                                             |
| ---------------------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Required public evidence candidate | Exact revision/bundle/check/version and result scope                                        | RFC VERIFY-0031 context; check-owned, no producer interval                                    |
| Required public evidence candidate | quantity + cell_id or contrast_kind, declared, available recomputed value                   | RFC quantity_results and all 22 exact keys; no array-position association                     |
| Required public evidence candidate | Per-quantity comparison status; reason and dependency state when applicable                 | T03/T04 outcomes; no fabricated projected value for unresolved/not_run                        |
| Required public evidence candidate | Exact-zero versus nonzero rounded-zero projection state when relevant                       | T03 D02; no inference from displayed zero alone; syntax deferred T07                          |
| Required public evidence candidate | Check execution/outcome/reasons, conformance violations, eligibility and guarantee boundary | RFC lifecycle invariants; separate report artifact                                            |
| Reference/audit evidence candidate | Exact rational numerator/denominator; exact-target sign                                     | G5 bounded witness supports checking projection without forcing all integers into public JSON |
| Reference/audit evidence candidate | Exact F/df, reduced z, T_num/T_den, floor code, endpoint/midpoint/zero-boundary signs       | S-C rounding-cell witness; no unbounded candidate enumeration                                 |
| Reference/audit evidence candidate | Cost score/width ledger, source hashes, host/profile provenance, resource receipts          | Reproducibility and support evidence, not required numerical Record metadata                  |
| Internal-only                      | Moment accumulators, Horner scratch, temporary search state, serialization buffers          | No independent public identity; no production-specific disclosure                             |
| Internal-only                      | Historical zero encoding used for diagnostics                                               | Never public p=0 comparison pass for a positive tail                                          |

Declared and projected binary64 values and projection-state classification are public
candidate evidence; complete rational/tail witness serialization remains audit-only
unless a later explicit surface proposal requires it. Verifier generation and
validation are separate from producer declarations. D05 requires no producer interval;
D06's future optional carrier is outside this candidate. T07 cannot add one as a
supposed schema-only change.

G5 compact witness is bounded by 22*(8K+512)+320 bits under its pinned cost ledger.
Its limited local-ID encoding and sampled JSON sizes are research-witness conditions,
not new public localId limits or a universal JSON-report size promise. T07/T09 choose
representation without making Ce a host/output cap or redefining J-cost. Audit
witnesses can remain separate from the required public result report.

## Guarantee and reference surfaces

The closed guarantee_boundary has required constant not_asserted keys:
scientific_validity, declaration_truth, distributional_model_validity,
causal_interpretation, standardized_effect_size, multiplicity_control,
post_quantization_calibration and admission_conditional_calibration.

Reference CPU 25/26 seconds, wall 30 seconds, memory/address-space and output caps,
Linux host and CPython version belong solely to the pinned unissued reference
profile. They are not public numerical Record requirements. Host tuple alone proves
neither full invocation support nor equality of public-supported/reference-supported.
Latched invocation failure, including final-delivery failure, suppresses provisional
numerical results; successful containment alone cannot restore them.
