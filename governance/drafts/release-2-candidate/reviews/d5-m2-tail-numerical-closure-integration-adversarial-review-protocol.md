# R2-D5 M2 tail numerical closure integration adversarial review protocol

## A. Identity gate

Review the exact PR head from a clean or equivalent isolated checkout. Confirm the merge base is
the declared current `main` base and the final increment is one ahead-only commit limited to the
M2 integration state transition plus this protocol.

Expected base when this protocol was authored:

`233066a38758ce59035684a901ae8fbd1a1cf4f5`

No numerical algorithm, runtime table value, G4 trace, certificate generator, authority surface,
registry, authoritative schema, conformance fixture, Public Check, bundle, or Release 1 change is
permitted.

## B. Required reviewed inputs

Independently verify both durable review inputs exist on the base and read them in full:

1. M2-B tail numerical selection:
   `review-inputs/r2-d5-tail-numerical-selection/REVIEW-RESULT.md`
2. M2-C p-value enclosure evidence closure:
   `review-inputs/r2-d5-p-value-enclosure-evidence-closure/REVIEW-RESULT.md`

The first must be `GO` for the pointwise input-specific selection. The second must be `GO` for
all six p-value evidence closure items. Neither review individually closes M2. This integration
increment may close M2 only because both reviewed prerequisites are durably present.

## C. M2 meaning

`M2 CLOSED` in this increment means only:

- the Student-t tail numerical contract selects the reviewed input-specific truth-error bound
  form;
- a global constant truth-error bound is not required for this pointwise contract and remains
  unselected;
- the selected series termination and remainder proof obligations remain fixed;
- the reviewed inverse-beta table identity and same-trace proof binding remain fixed;
- the projection-policy margin remains strict and runtime activation remains false;
- the separate p-value evidence corpus has independently closed the six recorded enclosure,
  low-df, boundary, dependency, and provenance items; and
- the two reviewed inputs are admitted into aggregate numerical readiness.

M2 closure is not supported-domain closure and is not runtime enablement.

## D. Tail selection checkpoint synchronization

Review:

`governance/drafts/release-2-candidate/numerical/tail-numerical-selection-candidate.json`

and its validator/test.

Require the state to advance only from review-pending to independently reviewed selection and
`m2_closed = true`. `closure_state.independent_selection_review` must become complete.

Simultaneously require all of the following to remain unchanged:

- `runtime_support_enabled = false`;
- `supported_domain_claimed = false`;
- no global constant bound selected;
- finite corpus maximum is not a bound;
- reviewed table hash unchanged;
- one actual immutable trace still required;
- exact primitive verification still required;
- supported execution predicate not selected;
- iteration cap is not a supported resource bound;
- projection-margin runtime activation false;
- final public reason codes unfrozen;
- supported df maximum null;
- platform pending; and
- execution predicate unselected.

## E. P-value evidence checkpoint synchronization

Review:

`governance/drafts/release-2-candidate/numerical/p-value-enclosure-evidence-closure-candidate.json`

and its validator/test.

Require the state to advance only to independently reviewed p-value enclosure evidence,
`p_value_enclosure_evidence_closed = true`, and `m2_closed = true`. Each of the six recorded
closure-item evidence statuses must become reviewed/closed, and the closure-state review and
readiness fields must become complete/admitted.

All fixed artifact identities, ZIP/internal hashes, source blobs, environment values, case ids,
rounding-cell semantics, and prohibited claims must remain byte-for-byte semantically identical
to the reviewed M2-C candidate except for review-maturity state.

## F. Aggregate readiness synchronization

Review:

`governance/drafts/release-2-candidate/numerical/evidence-readiness.json`

and `tooling/src/spikes/paired-t-numerical-readiness.ts` plus focused tests.

Require:

- tail selection closure becomes `reviewed_input_specific_selection`;
- `independent_selection_review_complete = true`;
- tail `m2_closed = true`;
- p-value evidence closure becomes `reviewed_complete`; and
- the same six p-value closure criteria remain explicitly enumerated and validated.

The fixed-95 critical-value evidence must remain incomplete. Confidence-interval work belongs to
M3, not M2.

## G. Mandatory non-promotions

The integration must not select or claim any of the following:

- global constant truth-error bound;
- supported df maximum;
- supported value or test-statistic domain;
- supported pair/resource maximum;
- supported platform matrix;
- supported-execution predicate;
- controlled process profile;
- supported domain;
- runtime support;
- final public reason-code freeze;
- quantity comparison tolerances;
- Public Check or bundle;
- R2-D5 completion; or
- Release 2 completion.

`numerical_contract_frozen` must remain false, top-level `supported_domain` must remain null, and
comparison tolerances must remain null.

## H. Correct-rounding and projection boundary

Confirm the integration does not conflate the M2-B projection-policy margin with the exact
binary64 rounding-cell evidence from M2-C.

The M2-B margin guards policy-class transitions for the selected pointwise contract. The M2-C
certificates separately provide exact rational rounding-cell containment for the reviewed p-value
evidence corpus. M2 closure does not activate a universal runtime correctly-rounded-p-value
claim or support for zero/subnormal projections.

## I. State-transition mutation battery

Starting from each committed M2 state object, independently require rejection of at least:

- demoting either review back to pending;
- setting either M2 flag back to false;
- changing p-value evidence closure back to incomplete;
- removing any of the six p-value closure criteria;
- changing any fixed artifact/table hash;
- selecting a global constant bound;
- treating a finite corpus maximum as a bound;
- selecting supported df, platform, execution predicate, domain, or runtime;
- enabling projection-margin runtime use;
- freezing final reason codes; and
- adding hidden support/authority keys.

Exercise hidden properties, symbols, accessors, sparse arrays, throwing proxies, and cycles on the
closed validators. They must fail closed without invoking caller-provided getters or leaking an
exception.

## J. Regression and authority invariance

Run at least:

```bash
pnpm install --frozen-lockfile
pnpm check
```

Also run the three focused suites for tail selection, p-value enclosure closure, and aggregate
numerical readiness, plus any reviewer-owned mutation battery needed for Sections D-I.

Confirm authority inputs, registries, authoritative schemas, conformance, Public Checks, bundles,
reference verifier authoritative dispatch, and Release 1 are byte-identical to the pinned base.

## K. RFC boundary

Independently check issue #25. It must remain open. The public review window must remain open and
the earliest decision remains:

`2026-09-25T20:52:54Z`

or `2026-09-26T05:52:54+09:00`.

M2 closure is evidence/numerical-candidate progress within the reviewed scope and does not close
or shorten the RFC window.

## L. Verdict

Return exactly `GO` or `NO-GO`.

`GO` means only:

> M2 Student-t tail numerical closure is internally complete as an independently reviewed,
> unissued, non-authoritative Release 2 candidate milestone, while support, platform, execution,
> runtime, final reason codes, CI work, R2-D5, RFC closure, and Release 2 remain open.

If possible, record the result on a neutral branch rooted at the exact review head by adding
only:

`review-inputs/r2-d5-m2-tail-numerical-closure/REVIEW-RESULT.md`
