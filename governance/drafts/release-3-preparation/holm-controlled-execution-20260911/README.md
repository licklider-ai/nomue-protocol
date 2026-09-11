# Holm controlled execution candidate

This unissued implementation repairs the execution plan reviewed in
[PR #316](https://github.com/licklider-ai/nomue-protocol/pull/316).
The numerical kernel, bridge, envelope and public registries remain unchanged.
The historical [investigation](../holm-execution-investigation-20260911/README.md)
is retained; this packet is the current implementation instruction.

The later [R3 boundary assessment](../holm-execution-admission-20260911/SCOPE.md)
distinguishes this launcher's support obligations from hosted-service engineering.
The [full-invocation admission experiment](../holm-execution-admission-20260911/README.md)
adds cache-preparation and enclosing-hierarchy measurements without changing this
implementation or retroactively changing its original observations.

## Execution and deployment contract

Use Linux x64, Node v24.19.0 with native TypeScript stripping (no tsx/esbuild
loader), and Python 3.12.14 for both supervisor and worker. Exact executable
hashes are recorded per run; source hashes are checked against INPUTS.json.
Node's threads and the Python bootstrap/worker count toward the task budget.
The trusted program creates no unbounded child family during ordinary execution.

An operator supplies a dedicated, writable cgroup v2 delegation D. Its layout is
D/supervisor and D/calls/call-ID. Both D and D/calls are empty domain distribution
nodes with memory, cpu and pids enabled in cgroup.subtree_control. Processes live
only in the leaves. The host provisioning example first demonstrates EBUSY with a
process in D, moves that process to D/supervisor, then enables both distribution
levels. It changes only its newly created subtree; it never enables controllers
on a shared root. A namespace-root spelling such as 0::/ does not bypass the
internal-process constraint or prove that a memory controller is available.

The single-threaded, single-invocation supervisor moves to D/supervisor, becomes a
subreaper, creates a unique call leaf, sets and reads back its controls, and
starts a Python bootstrap that joins the leaf before exec of Node. This covers
Node startup, dependencies, input-dependent allocation, both verification passes,
legacy reconstruction, the worker and serialization. The bootstrap's initial
Python startup and the supervisor remain outside the call memory boundary;
the operator supplies their host service budget and concurrency cap. This is not
a total host-memory guarantee. One supervisor never manages unrelated children.

The candidate uses a trusted-program premise, including the operator, installed
code, filesystem and interpreter. Same-uid processes are not claimed to be unable
to alter cgroup controls. Hostile-code containment requires a separate privilege
boundary and is outside this candidate. The child receives a fixed minimal
environment and no inherited descriptors beyond standard I/O. Record bytes never
choose commands, interpreters, options, environment variables or probe modes.

Defaults for this experiment are 512 MiB memory.max, memory.swap.max=0,
memory.oom.group=1, pids.max=64 and cpu.max="100000 100000". The wall budget is
30 seconds plus a separate 3-second cleanup budget. These are research parameters,
not public support commitments. The deadline starts before preflight. Local host
setup calls rely on a responsive trusted kernel/filesystem; this is not hard
real-time scheduling. The external service owns supervisor-crash cleanup, for
example by killing/removing the dedicated delegation on service/job teardown.
The dedicated CI host wrapper demonstrates that teardown but does not certify a
production service manager.

## Preflight and operating-system evidence

Require a writable cgroup2 mount at /sys/fs/cgroup, a dedicated descendant D,
empty domain distribution nodes, enabled memory/cpu/pids at both levels,
D/supervisor, absolute executables and unchanged source pins. The fresh call leaf
needs writable cgroup.kill and control files; readable memory.events.local,
pids.events, cgroup.events and cpu.stat; and the max/oom/oom_kill and pids max
counters. Reject failed readbacks before opening Record input. Hybrid hosts are
judged by these actual v2 interfaces, not /proc/cgroups alone.

The source review establishes cgroup.kill absent in Linux v5.10 documentation and
present in v5.15; PR #316 reports its introduction in 5.14. Use Linux 5.14 or later
as a deployment floor and always probe interfaces rather than infer capabilities
from the version string. memory.peak and pids.peak are optional: absence is null,
never a reconstructed peak. PR #316 reports memory.peak from 5.19; no minimum for
pids.peak is relied on. CI records its actual kernel. The authoritative kernel
source passages and reviewer-acquired content hashes are reused through the
[review input inventory](../../../../review-inputs/r3-execution-control-review-539f848/INPUTS.json),
not retroactively assigned to the original investigator's unhashed HTML pages.

memory.max can reclaim/stall before killing. Any positive delta in max, oom,
oom_kill or optional oom_group_kill invalidates all output, even for exit zero;
so does pids.events max. Group OOM is enabled and the bootstrap resets its
inherited oom_score_adj to zero. Counter deltas are collected after unconditional
termination and before cgroup removal. Record CPU usage and throttling separately,
/proc/swaps, and optional charged memory/task peaks. Memory charges and sampled
RSS differ; neither warm-cache observations nor sum-of-RSS measurements establish
a cold-cache maximum. Cold-cache sizing remains a separately recorded experiment;
this harness never drops a shared host's page cache.

## File transport and outcome ordering

Invocation:

```sh
python3 -I supervisor.py --delegation /sys/fs/cgroup/owned-delegation --node /absolute/node --python /absolute/python3 record.json expected.json
```

Use the repository packet's full path for supervisor.py when outside its directory.
Inputs are local regular files, opened with O_NOFOLLOW and O_NONBLOCK. Read at
most cap+1 bytes. Entry first verifies the Record with an empty context sentinel;
only an expected_malformed_json stop causes expected-file reading and the full
second pass. Both passes use the same saved Record buffer. This deliberately
preserves Record refusal priority and performs no worker call on the first pass.
Invalid expected UTF-8/nonregular I/O is a transport invalid_input, not a newly
invented Protocol refusal. Oversize expected data reaches expected_bytes.

The generated stdout transport contains output, and only after all five checks
pass, verified_record_base64 from the original saved bytes. It does not ask a
caller to re-read a possibly changed input file. The Node entry validates the
report/refusal; the supervisor validates closed transport shape, JSON eligibility
and forwarding prerequisites under the trusted-entry premise. It does not
reparse the Record. The stdout cap is 4 MiB + 256 KiB; stderr is 64 KiB. Streams
are drained concurrently and capped before accumulation. Peak Python memory is
not equal to those caps: JSON decoding and transport serialization allocate
additional bounded copies in the separately budgeted supervisor.

Private outcome precedence is cleanup_failed, memory_enforced, pids_enforced,
cancelled, deadline, output_overflow, unsupported_host, setup_failed,
invalid_input, abnormal_exit, completed_invalid_output, then completed_valid.
All observed causes remain in the receipt; these are not public reason codes.
completed_valid means a completed transport and can carry a scoped fail/refusal.
No result field exists after any control failure. The old worker's 25-second
SIGKILL timeout and 256 MiB RLIMIT_AS remain in place: an ordinary worker failure
can be forwarded only if no outer enforcement event, cancellation or deadline
was observed. RLIMIT_AS failure without cgroup counters is not relabelled as
cgroup memory enforcement.

On every exit, including exit zero, kill the call subtree, kill a bootstrap that
has not yet joined, repeat subtree termination during bounded cleanup, drain
pipes, reap adopted descendants until ECHILD, require populated=0, remove the
call leaf and only its per-call TMPDIR. A kill request or populated=0 alone is
not evidence of reaping. Failed cleanup preserves diagnostics and prevents result
forwarding. D/supervisor and D/calls remain owned by host provisioning.

## Validation and remaining work

Run local file-transport/preflight controls with:

```sh
python3 -I test_execution.py --output local-results.json
```

Use ci_host.py only on a disposable dedicated Linux CI host whose root already
enables the required controllers. The workflow runs real allocation, task
exhaustion, synchronous hang, output flooding, setsid-descendant cleanup,
concurrent calls, environment controls, baseline, 120-member, large-declaration
and six-variant inputs. Probe programs are trusted test-only entry replacements;
there is no selection mechanism in Records. The host setup records the T2
internal-process rejection and successful corrected placement.

[REPAIR.md](REPAIR.md) maps all review findings. Run receipts distinguish actual
cgroup observations from local NOT_RUN results. Further evidence for cold-cache
sizing, service-crash recovery and a public output mapping remains necessary
before a supported execution profile is registered. Existing 82/93/132 controls
are regression evidence, not proof of the new OS enforcement. The review's
shorthand about injected runners is not applied to all legacy fixtures.
