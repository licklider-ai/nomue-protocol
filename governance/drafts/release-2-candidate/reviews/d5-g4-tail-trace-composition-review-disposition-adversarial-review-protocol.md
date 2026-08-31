# R2-D5 G4-to-tail composition review-state synchronization — adversarial review protocol

## A. Review identity

Review the immutable PR head supplied in the review commission from a fresh clone or equivalent
independent checkout. Record the implementation head, merge base, exact changed paths and stats,
local runtime, and whether the PR head moved during review.

The PR must remain a non-authoritative, unissued review-state synchronization under open issue #25.

## B. Scope boundary

This increment may only synchronize the completed independent review of the already merged
G4-to-Student-t tail actual-execution composition candidate into candidate checkpoints, readiness,
and explanatory governance text.

The numerical handoff, trace construction, trace verification, p-value calculation, underlying G4
and tail evaluators, authority, registries, schemas, conformance, Public Checks, bundles, and
Release 1 must not change except for explicit review-maturity metadata in the composition candidate.

Do not reopen the PR #60 composition semantics except where this synchronization introduces a
concrete contradiction with the reviewed implementation or review result.

## C. Review-chain fidelity

Verify exact identities for:

- PR #60 review input `c8cfed942e56922dc22e0fa2f10dafd74de3c8f3`;
- independent review result `480473b906f587b96a8c7cb114bd5977b332a15a`;
- PR #60 merge `106eaaf6c327975b81da71d15a498082ba0bd2b6`;
- PR #61 durable review-record merge `e674bacc90ad127602072432bc730d1b5c05c20a`;
- verdict `GO`, zero BLOCKER / SHOULD-FIX / NICE-TO-HAVE findings, and O1 as a design observation only.

The disposition must not reinterpret O1 as a defect or silently omit the self-contained provenance
boundary it records.

## D. Composition checkpoint synchronization

`g4-tail-trace-composition-candidate.json` may move only from review-pending to independently
reviewed candidate state. Require all of the following simultaneously:

- status remains `non_authoritative_candidate`;
- issuance remains `unissued`;
- issue #25 binding unchanged;
- composition review closed;
- readiness admission limited to independently reviewed non-authoritative candidate state;
- G4 mathematical-truth error bound remains pending;
- confidence-interval composition remains pending;
- resource bound and supported-execution predicate remain unselected;
- supported domain and runtime remain false.

Mutation-test every maturity boundary above. Any support, authority, runtime, truth, CI, R2-D5, or
Release 2 promotion is a BLOCKER.

## E. Composition implementation invariance

Diff `tooling/src/spikes/paired-t-g4-tail-trace-composition-candidate.ts` against the base.
Allowed changes are review-maturity metadata and the exact expected checkpoint only.

The following must be byte/semantic invariant:

- raw-observation parsing path;
- G4 evaluator invocation;
- exact `(t bits, df)` handoff;
- tail evaluator invocation;
- link fields and digest construction;
- both nested trace verifiers;
- composition verifier ordering and failure semantics;
- returned numerical values and p-value provenance;
- freezing/immutability behavior.

Any arithmetic, trace, digest, verifier, or refusal-semantic change is a BLOCKER.

## F. Numerical readiness synchronization

`evidence-readiness.json` and `paired-t-numerical-readiness.ts` may record only that the reviewed
G4-to-tail composition exists, bind its exact artifact and disposition paths, and mark the
actual-execution tail composition complete.

Require at the same time:

- G4 mathematical-truth error bound false;
- confidence-interval composition false;
- maximum pair/node values not supported bounds;
- supported domain false/null as applicable;
- runtime false;
- numerical contract unfrozen;
- comparison tolerances null;
- exact support platform / execution predicate still unselected.

Attempt wrong disposition/artifact paths, composition demotion, truth/CI promotion, hidden support
keys, runtime enablement, and extra-key attacks. The validator must fail closed.

## G. Documentation consistency

Review the candidate README, numerical README, reviews README, steward ratification package, and new
disposition. They must consistently state:

> The raw-observation → verified G4 trace → verified Student-t tail trace → returned p-value
> actual-execution composition has completed independent candidate review, while G4 mathematical-
> truth error, confidence-interval composition, support/resource/platform/domain/runtime decisions,
> R2-D5, RFC closure, and Release 2 remain open.

Any retained statement that the G4 and tail traces are not yet composed is a finding. Any statement
that the composition proves mathematical truth, production support, or Release 2 readiness is a
BLOCKER.

## H. Authority and RFC invariance

Confirm no changes to authority manifest inputs, registries, authoritative schemas, conformance,
issued identifiers, Public Checks, bundles, verifier authoritative dispatch, or Release 1 surfaces.
Recompute or run the repository's existing authority validation path where available.

Issue #25 must remain OPEN with earliest decision `2026-09-25T20:52:54Z`
(`2026-09-26T05:52:54+09:00`).

## I. Regression

From the pinned head run at minimum:

```bash
pnpm install --frozen-lockfile
pnpm check
```

Also run the focused G4-to-tail composition and numerical-readiness tests. CI is corroboration, not
a substitute for semantic inspection.

## J. Findings

Use only BLOCKER, SHOULD-FIX, and NICE-TO-HAVE. Findings must be attributable to this synchronization
delta. Do not reopen already reviewed PR #60 semantics without a concrete synchronization-induced
contradiction.

## K. Verdict and meaning

Return `GO` only if the review chain is exact, implementation semantics are unchanged, machine state
is fail-closed, documentation is consistent, authority/RFC remain unchanged, regression is green,
and there are no BLOCKER findings.

`GO` means only that the independently reviewed actual-execution composition may be recorded in the
non-authoritative R2-D5 readiness state. It does not approve a G4 mathematical-truth error bound,
confidence-interval composition, supported resource bounds, supported platform, supported execution
predicate, supported domain, runtime support, final reason codes, Public Check, bundle, R2-D5
completion, RFC closure, or Release 2.

If practical, store the independent result as the only new file on a neutral reviewer branch at:

`review-inputs/r2-d5-g4-tail-trace-composition-review-disposition/REVIEW-RESULT.md`
