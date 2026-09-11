# R3 admission method review and measured evidence

This archive accompanies [PR #319](https://github.com/licklider-ai/nomue-protocol/pull/319),
final candidate `f6ac2219f81749cd62bd61563146f1f0b5146085`, merged at
`5d263b6d2f6c3045c55429ecc748a8784a332ac7`.
Its [scope assessment](../../governance/drafts/release-3-preparation/holm-execution-admission-20260911/SCOPE.md)
separates R3's single-invocation support evidence from production service engineering.

## Review, repairs and provenance

REVIEW-initial.md retains the failure-recording finding; REVIEW-before-ci.md
retains its first repaired review; CI-REPAIR.md and REVIEW.md record the later
real-CI zero-charge assumption and its repair. All input inventories and safe
helper results remain available. The separate investigator shares model
configuration and infrastructure and advised on the source-based design; it
did not author the harness. Its safe tests are distinct from author-run kernel CI.

Initial CI run 34603591363 at `42a3f841d2c5f3648edb8cd1f45fce6b65ba41ee`
failed 36/36 before workload launch because it incorrectly required an empty
cgroup's memory.peak to be zero. All 18 reset requests and all 36 outer cleanups
were recorded successfully; no admission success is inferred. The implementation
now records initial peak/current charges and checks absence of tasks, preserving
the later absolute peak without subtraction. The review explains why its earlier
mock did not catch this condition.

The coordinator downloaded the initial and final CI artifacts, verified ZIP
digests against GitHub metadata, and preserved the extracted JSON bytes unchanged
as CI-initial.json.txt and CI-final.json.txt. Those files are the harness's stated
measurement projection, not complete stdout transports. INTEGRATION.json pins the
candidate, runs, artifacts and hashes. This README and integration/checksum receipts
are coordinator additions; the reviewer reports have not been rewritten to imply
that the reviewer independently executed the kernel trials.

## Final observations

Run [34603795098](https://github.com/licklider-ai/nomue-protocol/actions/runs/34603795098)
passed 36/36: six input shapes, three reset/warm pairs each. Kernel
6.17.0-1022-azure, Node 24.19.0, Python 3.12.14, hosted Ubuntu image
20260907.300.1. Each of the 18 reset requests had both vmstat counter increments
and sentinel residency 1024 pages to zero. Every trial recorded successful call
cleanup/reaping and outer hierarchy removal, with no memory/pids enforcement event.
The expected over-node-limit input produced record_nodes without forwarded bytes.

Per-cell maxima across three repetitions (MiB = 1,048,576 bytes):

| Input                      | Reset: call MiB | Reset: enclosing MiB | Reset: external seconds | Warm: call MiB | Warm: enclosing MiB | Warm: external seconds |
| -------------------------- | --------------- | -------------------- | ----------------------- | -------------- | ------------------- | ---------------------- |
| Baseline                   | 60.207          | 197.035              | 1.179                   | 57.098         | 66.504              | 0.927                  |
| 120-member family          | 69.730          | 206.559              | 1.335                   | 68.086         | 77.496              | 1.090                  |
| 1024 observations          | 73.652          | 210.723              | 1.497                   | 69.395         | 78.801              | 1.216                  |
| Combined large declaration | 83.344          | 220.168              | 1.864                   | 72.348         | 82.004              | 1.664                  |
| Six D0 variants            | 63.633          | 200.512              | 1.253                   | 60.449         | 70.113              | 1.013                  |
| Conjunctive node refusal   | 59.043          | 195.875              | 1.208                   | 54.434         | 63.848              | 0.911                  |

Initial enclosing peaks were 262,144 bytes in all trials, before tasks entered.
The maximum recorded call task peak was 8. The maximum internal elapsed interval
was 1.709 seconds and cleanup interval 0.012 seconds (rounded upward here).
The external interval includes interpreter startup and final output serialization;
it is not the same interval as the stock supervisor receipt.

Controlled-execution regression run 34603795053 succeeded for the same candidate;
standard CI run 34603795039 passed all five jobs. Local entry expectations passed
6/6 and the method review's two synthetic failure controls passed. Their scopes
and counts are distinct; none measures scientific accuracy or B-2 closure.

## Disposition and next work

Retain the existing 512 MiB call limit, 64-task limit and 30-second wall setting
as research parameters. The measurements support admission for these fixed inputs
in this host/configuration. They do not prove universal coldness or worst-case
resource use, nor turn the enclosing measurement into an enforced service budget.
Preflight rewarming and shared-page ownership remain explicit; peak differences
are not physical-memory savings and cannot isolate the supervisor by subtraction.

The next R3 step is the coordinated unissued public candidate: complete Contract,
Record/result/report/refusal surfaces, versioned check/reason mapping, expected
context, exact-bundle dispatch and independent conformance expectations, with
the applicable numerical/source-review connections. NRS-SEC-0006's existing
in-process checkpoint meaning needs explicit successor applicability assessment.
No production queue, autoscaling, fleet capacity or SaaS implementation is required
by this work. The selected launcher's external crash-cleanup obligation remains
explicit; a crash-recovery guarantee needs its own evidence if claimed.

This is a bounded advancement of the first Holm capability, not formal adoption,
publication or completion of the entire R3 programme. The public window and
steward decisions remain as recorded in the scope assessment.
