# Author adversarial review and repair log

Continuing author context; not an independent investigator. Existing review
records were inspected, and new behavior was tested against deliberate failures.

## Historical author findings (superseded where noted)

1. **Cancellation cleanup gap.** Initial supervision handled Python interruption
   but not SIGTERM, allowing a parent termination to abandon its worker. Added
   temporary SIGINT/SIGTERM handlers, ignored repeat cancellation during cleanup,
   restored caller handlers, required main-thread use and tested real SIGTERM.
   A later lifecycle review also found the Popen handle-assignment race: blocked
   cancellation across creation, restored the parent's signal mask only after
   retaining the handle, and added a deterministic signal-during-launch control.
   The worker restores its inherited mask and the pre-selector pipe cleanup is
   explicit. This repair changes supervision only, not numerical behavior.
   The user-supplied review of be2c488 disproved this closure: thread-local
   masking, repeat-signal cleanup and cancellation propagation were insufficient.
   This historical assessment is corrected by REVIEW-RESPONSE.md.
   SIGKILL/host failure remains outside scope.
2. **Incomplete output acceptance.** Initial parent checked only outer result
   fields. Added closed result grammar, identity recomputation from the generated
   request, required 13-quantity/df/tail inventory and six malformed-output
   controls. This validates structure and binding; it does not independently
   recompute numerical truth in the parent.
3. **EOF without exit.** A worker can close both output pipes and continue running.
   A timed wait after EOF prevents false completion; a real closed-pipes/hang
   probe confirms kill and reap.
4. **Misleading aggregate-memory claim.** RLIMIT_AS is not process-tree memory,
   RSS, or a cgroup. Documentation restricts the claim to one trusted worker and
   explicitly excludes caller/supervisor/concurrent allocations and escaped
   descendants. R3's cgroup design is not copied as an untested R4 guarantee.
5. **Partial unresolved output.** The old wrapper includes diagnostic partial
   tails when final precision is unresolved. The worker emits only the unresolved
   category, with no successful tail/result body. The old source remains intact.
6. **Resource admission versus correctness.** Existing work scores and n bounds
   are preserved as provisional eligibility. Actual CPU/address-space/wall/pipe
   limits are enforced separately. No all-input completion promise or statistical
   calibration after admission selection is made.

## Remaining promotion work

M1 is a concrete candidate, not formal policy freeze. M2 demonstrates one actual
execution design, not independent implementation approval or public support.
Public ingress, factor/unit identity, Record integrity and the R3-priority common
schema/report integration remain in COUPLING.md. Final fixed-head independent
implementation review and claim-to-source applicability decisions are required
before promotion under governance/RFC.md; archive review and self-review are not
substitutes. No earlier source acceptance is reopened without a changed claim.

## Correction after supplied code review

The cancellation closure above was premature. REVIEW-RESPONSE.md records all six
findings, the new flag/self-pipe/pidfd implementation, actual regression evidence,
and the narrowed admission-check wording. These are author repairs and executed
controls, not an independent close review of the repaired head.

The follow-up review of df33b8d found that the Python-level self-pipe write did
not wake a blocked main-thread select when another thread received the signal.
The C-level wakeup-fd repair and a regression that fails on that predecessor are
recorded in REVIEW-RESPONSE.md. A successful Popen-delivery control alone did not
establish the blocked-select case. This is a further author repair, not an
independent closure claim.
