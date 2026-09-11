# Bounded intake of the new Holm promotion review

Status: informative proposal clarification, 2026-09-11. No formal B-2 closure,
method adoption, supported execution or release decision is recorded here.

The original six-file proposal remains pinned at
`20c8e3b01f3f8983eba4f05e60c4b64ee946d795` (PR #301). Its external review is
preserved by PR #308 at
`3d071195234179b0c1ed2dddadd3481e01953c50`. The clarifications below supplement
the original wording for future revision; they do not rewrite either record.

## SF-1: B-2 provenance and remaining disposition

The external reviewer disclosed earlier candidate repairs by the same session,
including `c4ad231`, `26847d5`, `a3c51c0`, `97ef292`, `e170ced` and `cf6ae85`.
Its bounded derivation review is useful evidence, but it is not a clean
nonauthor implementation-level B-2 close.

The new R3 archive reviewer did not author or repair the candidate. That
separate task inspected the pinned `decode`, `transform`, `project` and full
declaration binding, using independent arithmetic and binding controls. Its
report is additional narrow implementation evidence. It reuses #289/#294
source reports and does not claim a fresh original-PDF pass. The requested
configuration was `gpt-5.6-sol`; no served-build attestation or human review is
inferred. A later explicit B-2 applicability/provenance disposition must name
the precise covered source, derivation and implementation scope. B-2 remains
formally open in this intake.

## SF-2: S6 resource wording

The 512-MiB process-tree RSS statement describes sampled reviewer-host
observations. Author-side sums of separately measured process peaks are
different observations and are not a proven upper bound on live simultaneous
RSS. The preserved #300 intake already records cases where live RSS exceeded
the reported peak sum. Collection windows differ; no causal or lifetime-bound
claim follows. Node old-space, Python address space, sample RSS and an outer
deadline measure different quantities. A supported whole-call memory or
latency contract remains future execution work.

## SF-3: S2 member coverage and exact declaration identity

D0 result-slot `member_ids` has set-coverage meaning in structural relation
checks. The full declaration JCS binding nevertheless preserves the actual
array order. Permuting that array changes the exact caller-selected declaration
and must not be accepted as the same expected context merely because its set
of members is unchanged. Canonical object-key ordering does not reorder arrays.
Adjusted-output row order is separately checked against the expected members.

These statements clarify how to read the proposal. They add no public schema,
registered identifier, method, p-value provenance claim, FWER guarantee,
comparison result or conformance expectation. The full remaining promotion
conditions in the fixed proposal continue to apply.
