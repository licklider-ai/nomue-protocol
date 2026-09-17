# T09 invocation lifecycle

Status: **UNISSUED CANDIDATE**.

## Responsibility sequence

1. The Linux observer starts the invocation clock, acquires at most raw cap + 1 bytes,
   and creates one isolated application namespace/cgroup.
2. The application bounds raw bytes, decodes UTF-8, and calls unchanged T07 strict parse,
   schema and relational/admissibility validation. Invalid input does not call T08.
3. Conformance success permits the independent existing JCS content-digest calculation
   and admissibility result. Admissibility failure does not suppress integrity.
4. T08 prepares its unchanged bit-preserving transport. T09 checks the 8 MiB envelope.
5. An isolated Python supervisor uses the exact PR #331 _launch code. The distinct
   T09 worker sets CPU/AS/core-dump limits before importing the fixed T08/G5 code.
6. Worker mode, limits, G5 identity, T08 context and quantity associations are validated.
   The supervisor finishes direct-child kill/reap before returning a result.
7. T09 builds and validates a closed report, then writes a bounded provisional artifact.
   The ready marker does not bypass the outer deadline or signify external delivery.
8. The observer acquires the bounded artifact, sends SIGTERM with two-second escalation,
   inspects final namespace state and confirms cgroup.procs is empty or removed.
9. The exact repaired T04 finalizer latches all invocation failures. Only then can one
   bounded report/refusal envelope be delivered. Cleanup or late reports cannot restore
   a completed numerical result after failure.

## Fixed profile

[PROFILE.json](PROFILE.json) preserves the selected T04 Medium profile byte-for-byte.
CPU 25/26 seconds, full invocation wall 30 seconds, worker AS 256 MiB, application
cgroup memory 512 MiB, no swap, raw 5 MiB, internal transport 8 MiB, worker stdout
4 MiB, worker stderr 64 KiB, full report 8 MiB. The existing 128 MiB Node old-space,
32-task and two-CPU-rate settings are preserved as reference settings.

The observer checks the deadline after report acquisition and after cleanup before
finalizing. Control-plane calls have finite timeouts. Two seconds is a signal-escalation
setting, not a strict cleanup or real-time wall guarantee. The Docker daemon/kernel and
trusted observer are not covered by the application cgroup. No all-input completion,
real-time scheduling or arbitrary external sink availability is claimed.

No timeout/memory/output limit changes J-cost membership. A reference failure supplies
no fabricated non-membership or numerical indeterminate outcome. All numerical methods,
B and cost semantics are unchanged. The historical production worker remains normal-mode;
the separate T09 research worker follows the tested T04 normal/optimized convention.

## Controls and bounds

Tests may select named controls in trusted harness arguments, never through a Record.
CPU 1/2 seconds, worker wall one second and outer wall four seconds are labeled probe
overrides inherited from T04 practice. Normal invocation always selects Medium.
Synthetic cleanup-failure/descendant-remains/deadline-late-report controls alter the
observer receipt after real cleanup; they do not deliberately leave processes behind.

Full raw input and exception traces are not echoed in reports. Refusal messages are
stable reason identifiers. Internal diagnostics are capped and stay in measurement
receipts. Audit rational/tail witnesses are not added to required public report fields.
