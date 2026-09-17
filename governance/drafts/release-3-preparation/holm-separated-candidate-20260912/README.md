# Conformance-separated Holm candidate

Unissued `0.3.0-candidate.4`. This successor preserves candidate.3 and every
historical review. It is an executable adoption-preparation proposal, not
registered support, an accepted research-gate decision, or a released bundle.

The author-context authority audit found that candidate.3's single public
`checks` array did not explicitly separate semantic conformance from verification
as required by NRS-VERIFY-0005. The successor reports schema admission and the
`declaration`/`admission` results under `conformance`; integrity, independent
context equality, and arithmetic remain under `verification_results`.
The former top-level `checks` field is rejected. Conformance has no aggregate
verdict. Schema-invalid input produces a refusal. A report's schema-admission
pass does not imply its semantic checks ran or passed.

This changes presentation and successor identities, not private evaluation order:
integrity, context, declaration, admission, arithmetic. The inverse projection
reconstructs all five original checks before existing gating, scope and reason
validation. Moving a result between roles, deleting a result, changing a check
identity, or manufacturing conformance success fails validation. Any outer
execution/refusal continues to discard both sections and forwarded bytes.
The internal private carrier remains an implementation detail, not a public
Protocol surface or an alternative authority.

All candidate Record/Contract/Profile/check/schema/bundle spellings move together
to candidate.4. No candidate.3 Record is silently upgraded or resealed by a
verifier. The separate author test refresh creates new candidate.4 example bytes
and digests. The registered verifier continues to refuse candidate.4.
`DERIVATION.json` pins the predecessor source inputs. The adoption packet checks
that the private engine, worker launcher, budget and numerical dependencies
retain their covered semantics. The new public projection requires final bounded
review; historical B-2 approval is not extended to new wrapper bytes by assertion.

The arithmetic/input domain, bounds and guarantee exclusions are stated in the
[adoption Contract proposal](../holm-adoption-preparation-20260912/CONTRACT-PROPOSAL.md).
Input size remains truthfully `not_observed` in public refusals; adding an observed
size is deferred, not simulated with a cap-plus-one buffer or path stat.

## Reproduction

Use Node 24.19.0, Python 3.12.14 and the repository's lockfile dependencies.
Set `NOMUE_EXPERIMENT_PYTHON` to the actual absolute Python interpreter path.
Run `test_envelope.mjs`, `test_public.mjs`, `test_budget.mjs` and
`test_separation.mjs` with `node --import tsx`; run `test_identity.mjs` and
`test_repairs.mjs` with native Node. Tests compare committed snapshots and can
write separate observations through `NOMUE_TEST_OUTPUT`. Only the explicit
`--refresh-examples` author option writes examples; CI never uses that option.
`pin_runtime.py` is an explicit author-only pin refresh after source review.

The dedicated successor workflow exercises actual cgroup enforcement and
unsupported Node 22. Local cgroup unavailability is not counted as enforcement
success. Historical host measurements cannot establish candidate.4 host success.
