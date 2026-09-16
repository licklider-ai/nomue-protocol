# Full-invocation boundary and security compatibility

One measured invocation begins before the outer observer creates the container.
It ends after the report has been collected, all container processes have stopped,
and the owned container has been removed. Container startup, input acquisition,
parent imports/preparation, child work, validation and report delivery are included.
Repository export, dependency installation, image build and the multi-case suite's
summary generation are trusted setup/analysis outside this per-Record boundary.
They are reproducibility steps, not part of numerical execution time.

## Owners and limits

| Stage                                    | Time boundary                                                             | Memory boundary                                                          | Input/output boundary                                                                           | Failure owner                                                    |
| ---------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Bounded raw acquisition                  | Outer wall watchdog includes blocked reads                                | Whole container cgroup; read at most raw cap+1                           | File bytes capped before strict decoding                                                        | Parent refusal or outer observer if parent cannot report         |
| Strict ingress                           | Existing in-process 5 s budget checkpoints plus remaining invocation wall | Existing 512 MiB heap checkpoints; Node old-space cap; whole-tree cap    | Existing 5 MiB/depth64/10,000 observations/string16,384 limits; strict parser, finite check     | Parent records refused ingress/child failure                     |
| Parent preparation                       | Remaining invocation wall; no new public time predicate                   | Whole-tree cap, observed parent RSS                                      | Generated internal transport capped before launch                                               | Parent; exact C>B preflight avoids tail worker                   |
| Worker start/input                       | Same remaining wall                                                       | Worker RLIMIT_AS and whole-tree cap                                      | Trusted fixed command; bounded internal JSON                                                    | Main supervisor, reused unchanged                                |
| S-C and internal evidence                | Worker CPU soft/hard plus remaining wall                                  | Worker address space; tree memory; observed RSS distinct                 | Fixed numerical snapshot and closed generated capsule                                           | Worker or supervisor; no synthetic G5 fault override used        |
| Worker stdout/stderr                     | Supervisor drains under wall deadline                                     | Bounded buffers in parent, covered by tree cap                           | Profile stdout cap; stderr 64 KiB                                                               | Supervisor overflow/error refusal                                |
| Parent result validation                 | Remaining outer wall                                                      | Whole-tree cap                                                           | Ordered 22 rows, candidate/digest/declared/scope/limits/mode bindings; gated vs completed state | Parent suppresses invalid/partial result                         |
| Report/evidence construction             | Outer watchdog includes stalled serializer                                | Whole-tree cap covers object and serialization allocation                | Separate report serialization cap; bounded refusal fallback                                     | Parent, or outer observer if memory/deadline prevents a report   |
| Normal/abnormal direct-child termination | Historical supervisor cleanup allowance 2 s                               | Child remains owned until group cleanup/reap                             | No untrusted error reflection                                                                   | Main supervisor, unchanged kill-before-reap order                |
| Descendant cleanup                       | Outer stop signal interval 2 s; command timeout 12 s separately recorded  | PID namespace and unified cgroup; 32-task cap                            | Kernel-owned membership; process-group escape does not escape container                         | Outer observer verifies stopped PID0 and empty/gone cgroup       |
| Final delivery/outcome                   | Measured through collection and container removal                         | Collector accepts at most report cap+1; fixed finite experiment metadata | Generated receipt only; no public schema claim                                                  | Outer observer records absent report/timeout/OOM/cleanup failure |

The historical `_launch` elapsed time includes transport, startup and direct-child
cleanup. The research worker also reports its own wall and CPU time, excluding
parent/startup. The outer cleanup interval is measured independently. This packet
does not invent a separate direct-child cleanup duration that the unchanged
supervisor does not expose. Phase totals are nested measurements and are not
summed as if disjoint.

## Measurement is not enforcement

- Worker and parent `ru_maxrss` are per-process high-water RSS measurements in
  Linux KiB. They are neither RLIMIT_AS nor a process-tree RSS cap.
- RLIMIT_AS caps worker virtual address space. MemoryError/exit71 is distinct from
  a kernel OOM kill. Node old-space bounds one heap component, not Node RSS.
- cgroup v2 `memory.max` bounds charged memory for the container, including its
  descendants and relevant cache/kernel charges; it is not a pure sum-of-RSS cap.
  `memory.peak` is observed while the completed parent waits for collection, or
  before abnormal cleanup. For an already destroyed OOM cgroup the peak may be
  unavailable; OOM state/events are retained instead of inventing a peak.
- The post-report hold allows accounting collection. Peak during final cleanup
  after that snapshot is not claimed measured. The kernel limit continues to
  apply through cleanup. No sampling-based exact peak of the whole host is claimed.
- `--cpus=2` limits CPU rate. It is not the worker's cumulative RLIMIT_CPU seconds
  and does not prove a whole-tree CPU-seconds budget.
- Signals, scheduling and Docker control-plane calls are not hard real-time
  guarantees. Two seconds is the configured escalation interval; measured cleanup
  includes daemon/observer overhead. The twelve-second command timeout is a
  separate failure threshold. Persistent kernel/daemon failure produces an open
  cleanup failure, not an assurance that a process must already have disappeared.

## Failure semantics

All real execution failures produce either `execution_refusal` with `result:null`
or an outer failure with no report. They are not numerical `fail` or
`indeterminate`. A legitimate normally completed declared-result mismatch remains
in its scoped numerical result and is not confused with an execution failure.
CPU limit, memory allocation failure, cgroup OOM, crash, malformed output, overflow,
parent/report timeout and cleanup failure have separate evidence fields.

These are research receipts, not issued verification reports or refusal schema
instances. T08 still needs registered reason-code/limit-category mapping,
verifier-level refusal schema validity and public CLI/report delivery integration.
The final-delivery adapter additionally discards any previously computed report
when cleanup is not confirmed. Seven receipt-fault checks run in each mode; these
are controlled finalization tests, not a claim of inducing an unkillable kernel
task. Actual kill escalation, process-group descendants, escaped-session
descendants and OOM containment are measured separately.

Failure to complete cleanup terminates the suite and retains the failed row;
it never authorizes a partial successful numerical report.

## SEC compatibility

| Obligation                            | Research handling                                                                        | Claim boundary                                                                                                     |
| ------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| SEC-0001 offline by default           | `--network none`; trusted local schemas; no Record URI fetch                             | Network-disabled execution; image build is trusted setup                                                           |
| SEC-0002 no Record-supplied execution | Fixed trusted Node/Python paths and synthetic controls from manifest, not Record content | No runtime selection or command field is read from a Record                                                        |
| SEC-0003 bounded input                | Unchanged raw/parsed limit functions plus bounded acquisition                            | Preserves existing ingress limits; R4 scientific domain is separate                                                |
| SEC-0006 in-process budget            | Unchanged Node processing-time/heap checkpoints retained                                 | Outer watchdog supplements, rather than replaces, the existing checkpoints; not production R4 conformance issuance |
| SEC-0004 no partial success           | Invalid/partial worker outputs discarded; outer failures carry no numerical result       | Tested separately from G5 simulated controls                                                                       |
| SEC-0005 refusal evidence             | Actual causes, limits, modes, exit state and ownership receipts saved                    | Registered public refusal serialization remains T08 work                                                           |

The root filesystem is read-only, network disabled, capabilities dropped and
new privileges disabled. Only the bounded report directory and an 8 MiB tmpfs are
writable. The worker remains trusted repository code. No claim is made that this
container configuration solves all malicious-kernel/native-code escape threats,
or that PR #331 alone closed every SEC obligation.

Primary implementation references:
[Docker resource constraints](https://docs.docker.com/engine/containers/resource_constraints/)
and [Docker stop behavior](https://docs.docker.com/reference/cli/docker/container/stop/).

## F-01 precedence correction

Invocation/worker failure state precedes cleanup state, report validity and numerical
content at final delivery. Once failure is latched, later ready/report arrival or
successful cleanup cannot remove it. The observer checks the deadline before ready
and after collection and compares expected numerical success to the final outcome.
A completed report is suppressed on failure; reasons remain recorded. No resource
value or public numerical semantics changes. See [F01-REPAIR.md](F01-REPAIR.md).
