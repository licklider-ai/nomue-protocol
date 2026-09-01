# R2-D5 M2 tail numerical closure integration independent review result

## Verdict

GO

The exact PR #89 head `764674bdd3f72ac7774ad456854e8e3a05183765` may be merged as the explicit M2 integration state transition. No outstanding BLOCKER, SHOULD-FIX, or NICE-TO-HAVE finding remains in this bounded review.

`GO` means only that M2 Student-t tail numerical closure is internally complete as an independently reviewed, unissued, non-authoritative Release 2 candidate milestone. It does not select support, platform, runtime, final reason codes, confidence-interval closure, R2-D5, RFC closure, or Release 2.

## 1. Identity

- Repository: `licklider-ai/nomue-protocol`
- Candidate PR: `#89`
- Base: `233066a38758ce59035684a901ae8fbd1a1cf4f5`
- Review-input head: `764674bdd3f72ac7774ad456854e8e3a05183765`
- Review-input tree: `de344d47a00a80d130a374015500dd23a70b5a9a`
- Structure: one direct-child commit from the exact base
- Delta: 10 paths, `+282/-71`
- RFC issue: `#25`, open during review

The ten-path delta contains only the M2 state synchronization, its three closed validators/tests, and the fixed integration review protocol. No numerical algorithm, runtime table value, G4 execution graph, certificate generator, authoritative schema, registry, conformance fixture, Public Check, bundle, reference-verifier authoritative dispatch, or Release 1 artifact changes in this increment.

The same tree had previously been exercised by temporary diagnostic PR #84, but PR #84 contained temporary materializer history and was not accepted as release history. It was closed unmerged. PR #89 supplies the clean one-direct-child history reviewed here.

## 2. Required reviewed inputs

Both required review inputs are durably present on the base and were read in full:

1. `review-inputs/r2-d5-tail-numerical-selection/REVIEW-RESULT.md`
   - verdict: `GO`
   - reviewed selection: input-specific truth-error bound, no required global constant
   - no support/runtime promotion
2. `review-inputs/r2-d5-p-value-enclosure-evidence-closure/REVIEW-RESULT.md`
   - verdict: `GO`
   - all six recorded p-value enclosure evidence items independently closed
   - no readiness or support/runtime transition by that review alone

The integration closes M2 only by admitting these two already-reviewed prerequisites together.

## 3. Tail numerical selection synchronization

`tail-numerical-selection-candidate.json` advances only the review-maturity state:

- `decision_state` -> `independently_reviewed_input_specific_bound_selection`;
- `m2_closed` -> `true`; and
- `closure_state.independent_selection_review` -> `complete`.

The selected numerical meaning is unchanged:

- bound form remains `input_specific_normal_binary64_roundoff_plus_positive_series_remainder`;
- global constant bound remains unnecessary for this pointwise closure and unselected;
- finite-corpus maximum remains explicitly not a bound;
- reviewed inverse-beta table hash remains `sha256:ba1f992199e9e153956589d62dcf5a6509575100bb7c923c170bfa45fdd76c08`;
- one actual immutable trace and exact primitive verification remain required;
- series termination and both a-posteriori remainder rules are unchanged; and
- projection-policy margin remains strict and runtime-inactive.

## 4. P-value enclosure evidence synchronization

`p-value-enclosure-evidence-closure-candidate.json` advances only reviewed maturity:

- `decision_state` -> `independently_reviewed_p_value_enclosure_evidence`;
- `p_value_enclosure_evidence_closed` -> `true`;
- `m2_closed` -> `true`;
- all six closure-item statuses -> `reviewed_closed`; and
- independent review/readiness admission -> complete/admitted.

The fixed artifact identity, ZIP and internal hashes, repository source blobs, environment, case identities, exact rounding-cell semantics, and prohibited-claim boundary remain unchanged from the independently reviewed M2-C input.

## 5. Aggregate readiness synchronization

`evidence-readiness.json` records:

- tail selection closure `reviewed_input_specific_selection`;
- independent selection review complete;
- tail `m2_closed = true`; and
- p-value enclosure evidence `closure = reviewed_complete`.

The six p-value closure criteria remain explicitly enumerated. This integration does not erase the evidence ledger after closure.

## 6. Mandatory non-promotions

The review confirmed all of the following remain unset or disabled:

- global constant truth-error bound: unselected;
- top-level `numerical_contract_frozen`: `false`;
- top-level `supported_domain`: `null`;
- comparison tolerances: `null`;
- supported df maximum: `null`;
- supported platform matrix: pending;
- supported-execution predicate: unselected;
- controlled process profile: unenforced;
- supported domain: false/null;
- runtime support: false;
- projection-margin runtime activation: false;
- final reason codes: unfrozen;
- Public Check/bundle: unissued;
- R2-D5: incomplete; and
- Release 2: incomplete.

The finite 374-cell witness, its 2,978-cell pointwise bound, the 5,182-iteration case, and all other finite evidence remain non-support observations rather than global or support bounds.

## 7. Confidence-interval boundary

The fixed-95 critical-value evidence remains `incomplete`, and `confidence_interval_trace_composition_complete` remains `false`. Confidence-interval numerical closure therefore belongs to the next milestone and is not implied by M2 closure.

The integration also preserves the distinction between:

- M2-B's projection-policy class-transition margin; and
- M2-C's exact binary64 rounding-cell enclosure evidence.

M2 closure does not create a universal runtime correctly-rounded-p-value claim or support for zero/subnormal projections.

## 8. Fail-closed state validation

The three integration-facing validators pin the reviewed state as closed checkpoints rather than accepting arbitrary maturity values. Their focused tests execute rejection of review demotion, M2 reopening, support/runtime promotion, undeclared or hostile checkpoint data, and the relevant fixed-evidence mutations.

The full exact-head suite also retains prior hostile-shape coverage for hidden own properties, symbol keys, accessors, sparse arrays, throwing proxies, and cycles. Existing M2-B/M2-C review results established zero caller-provided getter invocation on the closed checkpoint validators.

A reviewer-only temporary PR #91 attempted additional redundant mutation instrumentation. It was not used as review evidence because formatting validation stopped before those temporary tests executed; PR #91 was closed unmerged. No candidate defect was observed from that instrumentation attempt.

## 9. Exact-head CI and regression

Exact head `764674bdd3f72ac7774ad456854e8e3a05183765` completed:

- CI `33466976850`: success, 5/5 jobs;
- Release 2 paired-t candidate evidence `33466976788`: success; and
- Release 2 paired-t runtime-series candidate evidence `33466976759`: success.

The Linux full check completed with 44 test files and 450 tests passing. Formatting, markdown lint, typecheck, repository validation, generated-file checks, Phase 1/2A regression, conformance fixtures, oracle checks, authority checks, Release 1 historical checks, and the hosted Linux x64/Node 24, Linux arm64, macOS arm64, and Windows x64 jobs are green.

## 10. RFC and authority boundary

RFC #25 remains open. Its public review window remains open and the earliest decision timestamp remains:

`2026-09-25T20:52:54Z` (`2026-09-26T05:52:54+09:00`).

M2 closure is candidate numerical/evidence progress inside the reviewed scope. It does not shorten the public-review window or authorize authoritative landing.

## 11. Findings

- BLOCKER: none.
- SHOULD-FIX: none.
- NICE-TO-HAVE: none.

## 12. Disposition

GO means that the exact PR #89 head may merge and M2 may be recorded as `CLOSED` in the limited tail-numerical sense defined by the integration protocol.

The next numerical milestone is fixed-95 critical-value and confidence-interval closure. Support-domain/resource/platform/execution/runtime/final-reason-code decisions remain separate later work and must not be inferred from this M2 disposition.
