# R2-D5 G4 truth-error review-disposition synchronization adversarial review protocol

## A. Identity gate

Pin the review input in a fresh clone or detached checkout. Confirm the exact base, head, merge base, commit count, changed paths, and that the review head does not move during review.

The expected increment is review-state/readiness synchronization only. It may modify only:

- `governance/drafts/release-2-candidate/README.md`
- `governance/drafts/release-2-candidate/numerical/README.md`
- `governance/drafts/release-2-candidate/numerical/evidence-readiness.json`
- `governance/drafts/release-2-candidate/numerical/g4-execution-trace-candidate.json`
- `governance/drafts/release-2-candidate/numerical/g4-truth-error-candidate.json`
- `governance/drafts/release-2-candidate/reviews/README.md`
- `governance/drafts/release-2-candidate/reviews/d5-g4-truth-error-adversarial-review-disposition.md`
- `governance/drafts/release-2-candidate/reviews/d5-g4-truth-error-review-disposition-adversarial-review-protocol.md`
- `governance/drafts/release-2-steward-ratification-package.md`
- `tooling/src/spikes/paired-t-g4-execution-trace-candidate.ts`
- `tooling/src/spikes/paired-t-g4-truth-error-candidate.ts`
- `tooling/src/spikes/paired-t-numerical-readiness.ts`
- `tooling/tests/paired-t-g4-truth-error-candidate.test.ts`
- `tooling/tests/paired-t-numerical-readiness.test.ts`

Any other path is a `BLOCKER` unless it is mechanically necessary and independently justified.

## B. Review-chain fidelity

Independently verify the complete chain:

- PR #65 review input `fd17daf909a6c7aaad0e96a89369543c9d12282c`;
- reviewer result `6e4fa92406ab5cd28e702f8dd689e340a127b06a`;
- reviewer blob `bdf8ec380f857abfca87f367a5c27ebd9d724afd`;
- reviewer verdict `GO`, findings none, 568 checks / 0 failures;
- PR #65 merge `f8061f22e6b2a3848177b6c23c4c5ea882335cb8`;
- durable review-record merge `82d2ec5b67b748b46c3a7e3416f794a02adb5053`.

The disposition must not inflate what that review established.

## C. Mathematical implementation invariance

Diff the truth-error implementation before and after this increment. Permitted changes are review-maturity flags and the exact expected checkpoint only. The following must remain byte-semantically unchanged:

- binary64-to-exact-rational truth construction;
- rational arithmetic;
- exact-mean variance target;
- integer square root and enclosure construction;
- signed t enclosure;
- absolute-error bound calculation;
- trace/provenance bindings;
- envelope digest and verifier reconstruction;
- refusal ordering and hostile-shape behavior.

Re-run a representative success/refusal corpus and confirm all proof values and digests are unchanged apart from review-maturity metadata.

## D. Checkpoint synchronization

Confirm `g4-truth-error-candidate.json` records only the completed independent review and bounded readiness admission. It must remain `non_authoritative_candidate`, `unissued`, runtime false, domain false, CI pending, resource bound unselected, and execution predicate unselected.

Confirm the G4 execution checkpoint records the truth and tail work only as **reviewed separate candidates**. It must not claim that the execution trace itself contains Student-t tail evaluation or confidence-interval endpoints.

## E. Numerical-readiness synchronization

Confirm `evidence-readiness.json` binds the exact truth-error artifact and disposition and changes `mathematical_truth_error_bound_complete` to `true` only for the G4 trace-bound algebraic ledger.

At the same time, verify all of the following remain unchanged/open:

- runtime-series numerical closure;
- p-value enclosure evidence;
- fixed-95 critical-value evidence;
- confidence-interval trace composition;
- supported resource bounds;
- supported execution predicate selection;
- supported domain;
- runtime support;
- comparison tolerances;
- final reason-code freeze;
- numerical-contract freeze.

## F. Fail-closed validators

The G4 truth checkpoint and numerical-readiness validators must require the exact reviewed state and exact artifact/disposition paths. Test promotion, demotion, missing path, wrong path, hidden key, issuance, support, runtime, CI, resource-bound, and tolerance attacks. All must fail closed.

Hostile shapes must not escape the validators as exceptions or invoke caller-controlled accessors.

## G. Documentation consistency

Read the candidate README, numerical README, reviews README, steward package, and new disposition. They must consistently state that G4 mathematical-truth error is independently reviewed and readiness-complete while Student-t tail numerical truth, CI, support, runtime, and R2-D5 remain open.

No document may say or imply that Release 2, paired-t support, a supported platform, or an authoritative Public Check is complete.

## H. Authority and RFC invariance

Confirm authority inputs, registries, authoritative schemas, conformance, issued identifiers, Public Checks, bundles, verifier authoritative dispatch, and Release 1 are unchanged.

Confirm issue #25 remains open and its earliest decision remains `2026-09-25T20:52:54Z` (`2026-09-26T05:52:54+09:00`).

## I. Regression

From a fresh checkout run at least:

```bash
pnpm install --frozen-lockfile
pnpm check
```

Also run the focused G4 truth-error, G4 execution-trace, and numerical-readiness suites. CI may corroborate but must not substitute for the semantic review.

## J. Finding rule

Findings must arise from this synchronization delta. Do not reopen the already reviewed G4 mathematical proof, G4 F1/F2 work, Student-t tail algorithm, or unrelated Release 2 research unless this increment makes a new concrete false assumption about them.

Use only `BLOCKER`, `SHOULD-FIX`, and `NICE-TO-HAVE`.

## K. Verdict

Return exactly `GO` or `NO-GO`.

`GO` means only that the completed G4 mathematical-truth review may be synchronized into the non-authoritative readiness checkpoint. It does not approve tail numerical closure, CI, support, runtime, R2-D5, RFC closure, or Release 2.

If possible, preserve the review result only at:

`review-inputs/r2-d5-g4-truth-error-review-disposition/REVIEW-RESULT.md`
