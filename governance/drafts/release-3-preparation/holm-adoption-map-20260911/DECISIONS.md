# Proposed dispositions before authoritative coupling

Informative coordinator recommendations, not steward decisions. The numerical
method remains the reviewed ordinary supplied-p Holm target. No source gate is
reopened merely to repeat the existing mathematical review.

## Retain the existing in-process requirement

Recommend implementing NRS-SEC-0006 inside the candidate instead of narrowing its
applicability or replacing it with a controller-only requirement. The current
clause already explains checkpoint-based time/heap checks and their limits.
The external controller remains necessary for an unresponsive computation,
native/worker allocations, task limits and descendant cleanup. These controls
measure different things and complement each other.

The current candidate does not yet satisfy that recommendation. The prior
COUPLING.md successor-exception route remains historical proposal text; this
recommendation does not silently edit its pinned meaning. The next implementation
uses the existing limits.ts mechanism with a monotonic clock and a single budget
for the complete entry invocation, including its two-pass expected-context
transport. Restarting a budget at the second pass would omit part of the work.

The legacy 5,000-ms and 512-MiB heap values are reference inputs for that proposal,
not an automatically accepted Holm support profile. Select and justify the
candidate's declared checkpoint values against the fixed workload receipts,
then verify boundary behavior before changing the candidate revision.
Heap observations at checkpoints do not measure all native allocations or a
continuous peak, and do not establish a whole-service memory bound.

Predetermined implementation controls:

1. Time equal to the declared threshold is admitted; time above it is a resource
   refusal. Repeat for heap. Clock and heap readers are trusted test injections.
2. Exhaustion after setup, canonicalization, expected-context binding, D0 admission,
   and worker completion discards every partial report and any forwarded bytes.
3. A first refusal does not open the expected file. The two entry passes share
   one budget, so neither the start time nor observations reset.
4. A budget violation that crosses the worker catch boundary stays a resource
   refusal; it never becomes arithmetic worker_failure or numerical disagreement.
5. Invalid raw syntax retains the documented ingress priority. Exact checkpoint
   positions and simultaneous time/heap precedence are fixed before implementation.
6. Outer OOM/deadline/cleanup evidence still overrides the inner report under the
   already-reviewed private precedence. Passing the heap check cannot negate OOM.
7. Real-host controls and representative admitted large inputs pass on the new
   entry; the old candidate and its source-bound receipts remain reproducible.

This is implementation and outcome work still required before adoption. It is
not marked complete by the structural mapping tests in this packet.

## Preserve truthful input-size evidence

Recommend a successor input_evidence schema with explicit known/unknown branches.
Known size has an observation source and describes precisely what was measured;
unknown size carries no invented integer. Bytes read from a cap+1 buffer are not
automatically the complete input length. Failure before opening the Record remains
unknown. Do not reopen an untrusted path after the run merely to fill a field.

The current candidate implements only not_observed. It remains truthful but does
not yet implement useful size observations. The final output decision considers
whether the additional known branch is needed for adoption and, if so, adds it
with positive/negative fixtures and same-invocation observation binding. Changing
this shape uses a successor schema/check/bundle revision; old receipts remain
valid only under their original identities.

## Preserve scoped reports and declaration shapes

Recommend the five ordered scoped checks, distinct error versus disagreement,
complete outer-refusal mapping and no scientific/FWER assertion already reviewed
in PR #321. The schema change from legacy conformance/verification_results is
explicitly breaking; it is not a reinterpretation of old output.

Recommend operation_kind as a declaration shape and payload.contract_id as the
only executed Holm operation identity. The six shapes do not create six numerical
capabilities. Full expected-context equality precedes the private compatibility
adapter; every original byte and unrelated declaration stays bound.

## Discussion and decision boundary

The unchanged STABLE-INTENT discussion has earliest decision
2026-10-09T11:50:18Z. These recommendations do not decide whether the final delta
needs a new or extended window. Exact output and requirement changes receive
material-change/stability assessment before adoption. Any CORE change retains
its applicable window and named-steward signature. Deadline expiry is not approval.

Permanent Requirement, fixture and public-surface allocations, normative wording,
registry rows and reference dispatch land together only after that disposition.
R3 release conditions, candidate freeze and publication remain separate work.
