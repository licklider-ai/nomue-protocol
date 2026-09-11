# Follow-up: remove unsupported zero-charge precondition

Date: 2026-09-11. Candidate:
`f6ac2219f81749cd62bd61563146f1f0b5146085`.
Verdict: **PASS for this bounded repair**, pending actual admission observations.
This supplements the original review; it does not rewrite its finding history.

## Trigger and review limitation

Received CI run 34603591363 recorded 36 failures before invocation launch. Every
failure was the fresh-hierarchy memory.peak == 0 assertion. All 18 cache-reset
requests recorded drop_pagecache/drop_slab increments of 1 and sentinel residency
1024 pages to 0. All 36 owned measurement hierarchies were removed. The raw receipt
hash and extracted checks are fixed in CI-REPAIR-OBSERVATIONS.json.

The preceding local review did not catch this unsupported precondition. Its fake
hierarchy assigned an initial zero peak and its tests covered exception retention,
not real cgroup allocation behavior. The prior PASS did not establish kernel
admission; nevertheless, this real failure exposes a gap in that review's model.
The previous report, identities, helper, and results are retained with -before-ci
suffixes. The earlier REPAIR_REQUIRED records also remain intact.

## Exact repair assessment

The code records initial memory.peak and memory.current and checks populated=0
instead of assuming zero memory charge. These are different properties: an empty
process hierarchy does not establish zero accounted memory. The existing primary
source review already identifies kernel-memory accounting and hierarchical peak
semantics; no new scientific methodology is introduced here.

The measured final peak is still the hierarchy's peak since creation. Neither
initial value is subtracted. Stock invocation limits, source checks, result checks,
failure retention, and cleanup behavior are unchanged. The README now explicitly
states the initial-charge distinction. This removes a false rejection without
relaxing the workload result or limit-enforcement acceptance criteria.

The five files in INPUTS.json were compared byte-for-byte with the fixed candidate
commit. Only the requested code/comment and README scope repair were assessed.
The safe helper fixture now supplies nonzero initial peak/current values of
4096/2048 bytes, rather than zero, and both prior exception-retention controls pass.
The returned trial row preserves these values before its synthetic timeout.
These numbers are dummy fixture values, not real host measurements.

The investigator's role and prior design involvement remain as disclosed in the
original report. No repository edit, cache reset, cgroup mutation, extra agent,
or broad test was performed. The replacement CI result is still needed for actual
admission claims; the failed run provides cache-preparation and cleanup evidence
only, not completed workload evidence.
