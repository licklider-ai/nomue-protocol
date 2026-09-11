# Holm whole-call execution investigation

Status: source investigation and implementation plan; runtime implementation and
new resource controls are NOT_RUN. Input main:
`8149731d9100b7faeae706be80cf37c7d7628dc9`.

Historical status above is retained for this investigation snapshot. The
[controlled implementation](../holm-controlled-execution-20260911/README.md)
and its [finding dispositions](../holm-controlled-execution-20260911/REPAIR.md)
supersede this plan after PR #316 review. The
[review and execution archive](../../../../review-inputs/r3-controlled-execution-review-20260911/README.md)
records the repaired candidate, real cgroup v2 observations and remaining
promotion evidence. These later results do not retroactively change NOT_RUN
observations in this packet.

This packet continues the
[full-envelope handoff](../../../../review-inputs/r3-holm-envelope-review-20260911/PROMOTION-HANDOFF.md).
The [separate source investigation](SOURCE-REVIEW.md) supplies the external
operating-system basis. It does not establish an executable supported profile.

## Concrete implementation target

The next implementation places one complete envelope verification call in a
fresh cgroup v2 subtree on Linux x64. That includes Node startup and dependency
loading, bounded input reading, parsing and copies, the reverse adapter, and
the isolated Python worker. A small supervisor stays outside the subtree so it
can stop the call and record its termination even when the subtree exhausts its
memory. The supervisor's own input/output buffers are bounded separately.

Use a writable, explicitly delegated cgroup location, with the required memory,
pids and CPU controller interfaces available. Read back the configured controls
before admitting input. Missing delegation or interfaces is an unsupported
execution configuration; never silently substitute per-process limits.

The initial experiment can explore 512 MiB charged memory, zero swap, 64 tasks,
one CPU of bandwidth and a 30-second wall deadline. These are test parameters,
not accepted resource guarantees or public defaults. Tune them only from
recorded admission and failure evidence. Count threads in the task allowance.
Distinguish CPU bandwidth from cumulative CPU time and wall time.

Start a trusted bootstrap inside the configured cgroup before executing Node
or reading Record bytes. Its descendants inherit membership. Pin Node, Python,
the package lock and all reused implementation files. Drop unneeded privileges;
prevent the verifier from changing or escaping the supervisor-owned controls.
Keep the existing isolated Python startup and exact source pins. Record data
never supplies commands, interpreter paths, environment controls or cgroup paths.

## Supervisor and output behavior

1. Validate trusted host configuration and allocate an empty per-call subtree.
   Fix the start of the measured interval, including setup and input acquisition.
2. Open bounded regular-file inputs or use a separately specified bounded stream
   transport. Do not read arbitrary-size files into memory before applying caps;
   do not allow FIFO/device input to evade the wall deadline.
3. Run the unchanged envelope verification inside the subtree. Read stdout and
   stderr concurrently with explicit byte caps; do not use an unbounded
   communicate buffer. Cover startup, parsing, worker execution and output.
4. On deadline, output overflow, abnormal exit or cancellation, terminate the
   subtree using cgroup.kill and drain/reap with a separate bounded cleanup
   interval. Verify cgroup.events populated becomes zero. Account explicitly for
   descendants that survive the leader, including a setsid descendant.
5. Forward a complete output only after a valid completion and successful cleanup.
   Never forward partial stdout or infer arithmetic failure from an OS kill.
   Preserve existing completed check failures as check failures. Keep supervisor
   failure separate from the proposed Protocol report/refusal mapping until that
   mapping is included in the coordinated normative candidate.
6. Record applied controls, memory events, cgroup memory peak when available,
   CPU accounting, wall time, exit/signal and cleanup evidence. Treat sampled
   process RSS as observations with sampling limitations, not enforcement.
   Account for page-cache/kernel charges and documented temporary overshoot.
7. Remove only the subtree created for this invocation. Preserve diagnostics
   when cleanup fails; do not claim no remaining tasks merely from leader exit.

The controlled program and its installed dependencies remain trusted. This is
resource control for data processing, not an arbitrary hostile-code sandbox.
A process group or subreaper can assist lifecycle management but does not replace
cgroup containment. Supervisor crash recovery also needs an explicit host
lifecycle mechanism; it is not provided merely by adding a timeout in Python.

## Required execution evidence

Each case records the exact candidate commit and environment, the selected
controls, its independently specified expected category, the observed event
counters and whether all tasks terminated.

- Cold-start baseline with the existing hand-derived arithmetic expectations.
- Real 120-member computation and the largest admitted declaration shapes,
  including six D0 variants and maximum legacy reconstruction pressure.
- Record and expected-context byte boundaries; parsed node/depth/string limits;
  malformed input combined with size boundaries to preserve refusal priority.
- Memory pressure in Node, Python and both concurrently. Trigger real charged
  allocations, observe memory.events, and confirm no partial output escapes.
- Task/thread exhaustion with pids.events and a bounded spawn probe.
- Busy Node before worker launch, blocked input, blocked worker and blocked
  output; confirm the wall deadline covers each phase.
- Leader exit with a live descendant and a setsid descendant; confirm subtree
  termination and successful reaping/cleanup.
- Stdout/stderr overflow, partial output, worker crash and parent cancellation.
- Missing controllers, read-only delegation, wrong architecture and missing or
  changed executable/source pins; refuse before unbounded input processing.
- Simultaneous calls in separate subtrees and supervisor buffer accounting.
- Replay the 82 author controls, 93 archived investigator controls and 132 legacy
  fixtures where applicable. Compare scoped outputs, not timing metadata.

A resource-enforcement result needs actual enforcement controls and actual
termination observations. Existing five-job repository CI does not execute this
planned supervisor and cannot supply this evidence on its behalf.

## Current session receipt and restart

The coordinator successfully read the repository and observed Linux x86_64,
Node and Python executable paths, cgroup membership `0::/`, and a visible
controller list containing cpu, memory and pids. This establishes visibility
only. No writable delegation test or memory-limit experiment completed.

Subsequent execution requests failed with an exec-server transport disconnection,
then an explicit `409 Conflict, environment_offline` / `Environment is not
connected` response. No new launcher was implemented or executed. The public
repository API remained available, allowing this source report and restart plan
to be preserved. This is an execution-environment failure, not an approval
rejection or evidence of a Protocol defect.

Restart from the merged version of this packet, recheck main and the fixed
envelope inputs, and establish a delegated cgroup v2 host. A dedicated CI job
with the required host controls is also a possible execution venue; the existing
CI jobs are not substitutes. Implement and test the supervisor, request a
fixed-candidate implementation review, repair any findings, then integrate the
execution evidence. Advance the coordinated normative candidate described in
the linked handoff after the execution choice is supported by that evidence.
