# R3 execution boundary and next promotion work

Informative coordinator assessment at main
`0169708c9c640a3fbf4e65ce37f1fd50b07e01b6`, 2026-09-11.
This updates navigation and sequencing, not requirements or gate decisions.
The author participated in the earlier implementation and integration; this is
not an independent scientific or implementation review.

## Authority and bounded capability

[CHARTER.md](../../../../CHARTER.md) includes verification semantics and reference
procedures, requires local independent verification, excludes SaaS orchestration,
and limits standardization to what interoperability needs. [AUTHORITY.md](../../../../AUTHORITY.md)
keeps implementation techniques and observations separate from Protocol meaning.
The [R3 RFC](../../release-3-independent-multigroup-rfc.md) calls for resource and
support bounds, execution predicates and failure ordering before design freeze.
It permits unissued candidate development during discussion.

The first vertical capability remains PVL-03 ordinary unweighted supplied-p Holm
with the necessary D0 declarations: 3..16 groups, one selected all-pairs family,
3..120 supplied binary64 p encodings, exact adjusted values and binary64 display.
It checks declaration/input/arithmetic consistency, not the validity of the
producing p-values, an omnibus result, a significance decision or scientific truth.
The other fourteen R3 candidates and all 49 catalogue dispositions remain intact.

## Scope of each residual

| Residual                                                                     | R3 obligation or evidence role                                                                                                                                          | Bounded next action                                                                                                                                                          |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Input, time, memory and task limits for one invocation                       | Selected implementation support evidence; public semantics state the safe refusal and supported conditions, without mandating cgroup machinery for every implementation | Retain reviewed enforcement tests; measure full-launch admission under declared cache preparation and representative large admitted inputs                                   |
| Outcome after resource exhaustion, cancellation or cleanup failure           | Public verification/refusal semantics and evidence for no forwarded partial success                                                                                     | Map private categories to a versioned output contract in the coordinated candidate; do not equate execution failure with arithmetic disagreement                             |
| Normal and abnormal descendant cleanup                                       | One-invocation lifecycle evidence                                                                                                                                       | Reuse PR #317/#318 bounded cleanup evidence; preserve the declared external owner when the supervisor itself cannot run                                                      |
| Supervisor SIGKILL or host/service failure                                   | Lifecycle assumption of the selected launcher; lack of a report cannot mean success                                                                                     | Specify external teardown responsibility. Test it before claiming that particular launcher recovers from such failures; no requirement to build a hosted service to draft R3 |
| Supervisor/bootstrap allocations outside the call leaf                       | Honest support-boundary evidence                                                                                                                                        | Measure these together with the call at an enclosing measurement cgroup; distinguish that observed peak from the enforced call limit                                         |
| Fleet capacity, queues, autoscaling, tenant isolation and concurrency policy | Deployment/product engineering, not a prerequisite for this Protocol increment                                                                                          | Outside this work. A deployment chooses its own aggregate budget; no R3-wide service guarantee is asserted                                                                   |
| Hostile-code privilege isolation                                             | Outside the selected trusted-program model                                                                                                                              | Keep the assumption explicit; Record-controlled code remains prohibited                                                                                                      |
| Cold-cache benchmark                                                         | Evidence for a support claim, not a newly mandatory Protocol procedure                                                                                                  | Preserve exact cache-preparation facts and first-touch limitations; do not infer a universal maximum from finite trials                                                      |

Existing NRS-SEC-0003/0006 concern bounded input and in-process checkpoint
time/heap checks. NRS-SEC-0004/0005 require no partial success and meaningful
resource-refusal evidence; NRS-VERIFY-0018 requires schema-valid refusals.
These clauses do not mandate a particular cgroup tree, Linux-only Protocol,
512 MiB total-service budget or 30-second Protocol-wide deadline. The successor
candidate needs an explicit applicability/change assessment for NRS-SEC-0006;
an external controller alone does not silently satisfy or replace its current
in-process requirement. Old bundles and their supported behavior stay unchanged.

## Current evidence and sequence

1. PR #316 retains the external execution-plan critique; PR #317 implements its
   repairs; PR #318 retains initial/final review and real cgroup CI receipts.
   These close the two reported implementation defects within the trusted-program
   candidate, not the entire supported-execution or publication condition.
2. The next bounded experiment measures full-launch admission using the unchanged
   supervisor and paired cache-reset/warm invocations. Node/worker call-leaf peaks
   and enclosing supervisor-plus-call peaks are distinct observations. Failure
   tests already demonstrated by PR #317 are reused rather than rerun as a new
   scientific result.
3. Next prepare the coordinated unissued public candidate: Contract/Profile,
   successor schemas and identities, check-owned policy, complete reason/outcome
   mapping, exact-bundle dispatch, authority/surface changes, independently authored
   expectations and generated views. Resolve the proposed schema-error refusal
   and expected-context entry together. More resource experiments require a
   concrete remaining claim or failure; they are not an endless prerequisite.
4. Attach each existing source, derivation, implementation and execution review
   only to covered claims. The B-2 implementation-level closing disposition and
   precise IEEE-to-candidate applicability still need explicit connection; CI or
   this scope note cannot close them by implication. Assess changes against the
   [promotion inventory](../holm-promotion-proposal-20260911/PROMOTION-CONDITIONS.md)
   and [envelope handoff](../../../../review-inputs/r3-holm-envelope-review-20260911/PROMOTION-HANDOFF.md).
5. Preserve the public discussion and decision boundary. The recorded unchanged
   STABLE-INTENT scope has earliest decision 2026-10-09T11:50:18Z; expiry does not
   adopt it. Material changes need their own assessment, and CORE changes retain
   the named-steward and applicable-window requirements. R3 publication conditions,
   candidate freeze and publication decision remain separate work.

The earlier implementation README's phrase "service-crash recovery ... before a
supported execution profile is registered" is read as an obligation to substantiate
the selected launcher's claimed recovery boundary, not to complete production
SaaS engineering before R3 can advance. No historical observation or review is
rewritten by this clarification.
