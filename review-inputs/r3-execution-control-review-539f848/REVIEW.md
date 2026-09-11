# Adversarial review of the R3 whole-call resource-control plan (PR #315)

## Fixed identities

| Item                       | Identity                                                                                                                                                                                                                                             |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Reviewed commit            | `539f8481b5c57f8d5740af16c7a46772188b85c7` (PR #315 head), tree `5a2d4ad40e76f137adeb9e4efca77c55fe6a9238`, sole parent `633c6c650151b61c5427480fbb8ad02d908d0dff`                                                                                   |
| Pre-change main            | `8149731d9100b7faeae706be80cf37c7d7628dc9`, tree `07c7d3e76a7e00ae122491c76817034789e0d420`                                                                                                                                                          |
| Merge commit               | `d348c07dee762beb677f9b37aa16e06c9191993a` (parents `8149731…`, `539f848…`), current `origin/main` at review time                                                                                                                                    |
| Reviewed diff              | Cumulative `8149731…539f848`: three added files under `governance/drafts/release-3-preparation/holm-execution-investigation-20260911/` (275 insertions); no other path changed (verified with `git diff --stat`)                                     |
| Reviewed files             | `README.md` (blob `917804b…`), `SOURCE-REVIEW.md` (blob `0ca1925…`), `INPUTS.json` (blob `3d24d68…`); SHA-256 of each in [INPUTS.json](INPUTS.json)                                                                                                  |
| Connected inputs inspected | Envelope experiment (`envelope.mjs`, `DESIGN.md`, `README.md`, `INPUTS.json`, `test_envelope.mjs`, examples), binding experiment (`bridge.mjs`, `worker.py`, `probe.mjs`, `run_suite.py`, `live_rss.py`, `REPORT.md`), the PR #314 promotion handoff |
| Review date                | 2026-09-11 (UTC)                                                                                                                                                                                                                                     |

## Role, independence and prior involvement

Accountable role: external adversarial design reviewer, requested by the repository
owner through a Claude Code cloud session. Provider and configuration actually
available: an Anthropic Claude Code session whose session telemetry reports the
configured model `claude-fable-5-1` and the last served model `claude-fable-5-1`
(read from the session tool during this review). That is tool-reported
configuration, not a model-build attestation. No human reviewer participated. No
additional agents were started. No private repository was accessed.

Prior involvement: this session did not author, repair or review PR #315 or any
earlier packet; it began at the merge commit with no conversation history. The
reviewed packet records its author context as an OpenAI Codex agent
(`/root/r3_execution_sources`, same inherited model as the authoring agent), so
this review is separate at the provider level from the packet's author. Limits:
the binding experiment files this review reads (`bridge.mjs`, `worker.py`,
`live_rss.py`) were, according to the archived PR #300 review packet, repaired in
an earlier Claude session of the same account (`cf6ae85`). This session cannot
inspect that conversation and does not claim independence from it for those
files; they are used here as fixed inputs, not as review targets.

Accessible history: this session's own conversation and the repository at the
pinned commits. A fresh chat is not by itself proof of a different model, a human,
or an isolated execution environment; the claims above are limited to what the
session tool reports.

Primary sources: `man7.org`, `docs.kernel.org` and `docs.python.org` are blocked by
this environment's egress proxy. The same documents were opened from
`raw.githubusercontent.com` mirrors (kernel `Documentation/admin-guide/cgroup-v2.rst`
at `master`, `v5.15` and `v5.10`; Linux man-pages `cgroups.7`, `getrlimit.2`,
`fork.2`, `execve.2`, `wait.2`, `prctl.2`, `kill.2` from the frozen 2021 mirror;
CPython `subprocess.rst` for 3.11 and 3.14; Node.js v22.22.2 `child_process.md`,
`cli.md`, `process.md`, `timers.md`, `typescript.md`). `nodejs.org/api/cli.html`
(v26.8.2) was reachable and was used for the v26 statement. SHA-256 of every
downloaded source is recorded in [INPUTS.json](INPUTS.json). The `exec(3p)` POSIX
page could not be opened here; see NICE-TO-HAVE-15.

Execution: a sandboxed Linux 6.18 x86_64 container (root inside the container) with
Node v22.22.2 and CPython 3.11.15. Its cgroup setup is hybrid: `memory`, `pids`
and `cpu` are bound to cgroup v1 hierarchies, and the cgroup v2 mount has an empty
`cgroup.controllers`. Experiments were therefore limited to (a) cgroup v2 lifecycle
semantics that need no controller, (b) the cgroup v1 memory controller inside this
session's own cgroup, and (c) Node/Python process behaviour. No shared cgroup or
system-wide setting was modified; every cgroup created was private, named
`nomue-review-*`, and removed. cgroup v2 `memory.max`, `pids.max`, `cpu.max`,
`memory.oom.group` and delegation were NOT_RUN.

## Verdicts

| Question                                                                                                                   | Verdict           | Scope                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| -------------------------------------------------------------------------------------------------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Can the primary-source investigation (`SOURCE-REVIEW.md`, `INPUTS.json`) be reused as the basis for the implementation? | `REPAIR_REQUIRED` | Every decision-bearing statement checked here against the sources is accurate (table below), and those statements can be reused as facts. As the _basis_ for the supervisor design it is incomplete: it omits the cgroup v2 "no internal process" constraint, states no kernel-version dependency for `cgroup.kill`/`memory.peak`/`pids.peak`, records `memory.oom.group` as a fact without carrying it into the plan, and has no source content hashes. |
| 2. Is the implementation plan (`README.md`) concrete enough to start after repairing the design gaps?                      | `REPAIR_REQUIRED` | Two blockers (controller-enablement layout; partial OOM kill silently reported as a valid `worker_failure` report) and nine should-fix items. After those repairs the plan is specific enough to start; the unimplemented status itself is not counted against it.                                                                                                                                                                                       |

## Source verification (item A)

Each row names the packet claim, the source passage opened here, and the result.

| Packet claim (SOURCE-REVIEW.md)                                                                    | Source passage opened here                                                                                                                                                                                                                                                             | Result                                                                                                                                                          |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `RLIMIT_AS` limits one process's address space; `brk`/`mmap`/`mremap` fail with `ENOMEM`           | getrlimit.2: "maximum size of the process's virtual memory (address space) … `brk(2)`, `mmap(2)`, and `mremap(2)`, which fail with the error `ENOMEM`"                                                                                                                                 | Supported                                                                                                                                                       |
| `RLIMIT_CPU`: `SIGXCPU` at soft limit, `SIGKILL` at hard limit                                     | getrlimit.2: "sent a SIGXCPU signal … once per second until the hard limit is reached, at which time it is sent SIGKILL"                                                                                                                                                               | Supported                                                                                                                                                       |
| `RLIMIT_NPROC` per real user, counts threads, privilege exceptions                                 | getrlimit.2: "number of extant process (or, more precisely on Linux, threads) for the real user ID … not enforced for processes that have either the CAP_SYS_ADMIN or the CAP_SYS_RESOURCE capability"                                                                                 | Supported                                                                                                                                                       |
| `RLIMIT_RSS` is not a modern RSS ceiling                                                           | getrlimit.2: "has effect only in Linux 2.4.x, x < 30"                                                                                                                                                                                                                                  | Supported                                                                                                                                                       |
| Limits inherited at fork, preserved across exec, shared by threads                                 | getrlimit.2 NOTES: "A child process created via fork(2) inherits its parent's resource limits. Resource limits are preserved across execve(2). Resource limits are per-process attributes that are shared…"                                                                            | Supported                                                                                                                                                       |
| Fork resets CPU-time counters                                                                      | fork.2: "Process resource utilizations (getrusage(2)) and CPU time counters (times(2)) are reset to zero in the child."                                                                                                                                                                | Supported                                                                                                                                                       |
| Exec preserves the process CPU-time clock (exec.3p)                                                | Not opened (man7 blocked; execve.2 mirror does not state it)                                                                                                                                                                                                                           | Unverified here; not design-bearing because the plan uses `cpu.stat`, not `RLIMIT_CPU`                                                                          |
| `memory.max` is a hard limit that "permits temporary overshoot"                                    | cgroup-v2.rst: "Memory usage hard limit … Under certain circumstances, the usage may go over the limit temporarily."                                                                                                                                                                   | Supported                                                                                                                                                       |
| `memory.oom.group=1` requests group OOM treatment, except protected tasks                          | cgroup-v2.rst: "all tasks belonging to the cgroup or to its descendants … are killed together or not at all … Tasks with the OOM protection (oom_score_adj set to -1000) … are never killed."                                                                                          | Supported, but the README never adopts it (BLOCKER-2)                                                                                                           |
| `pids.max` constrains fork/clone and counts threads                                                | cgroup-v2.rst: "stop any new tasks from being fork()'d or clone()'d … PIDs used in this controller refer to TIDs"; also "Organisational operations are not blocked … possible to have pids.current > pids.max"                                                                         | Supported; migration into the cgroup is not blocked by `pids.max` (relevant to the bootstrap placement)                                                         |
| `cgroup.kill` SIGKILLs the subtree, handles concurrent forks, protected against migration          | cgroup-v2.rst: "all processes located in the affected cgroup tree will be killed via SIGKILL. Killing a cgroup tree will deal with concurrent forks appropriately and is protected against migrations."                                                                                | Supported; absent from the v5.10 document, present from v5.15 (SHOULD-FIX-3)                                                                                    |
| `cpu.max` is bandwidth per period                                                                  | cgroup-v2.rst: "The maximum bandwidth limit … `$MAX $PERIOD`"                                                                                                                                                                                                                          | Supported                                                                                                                                                       |
| Delegation requires suitable access and controller configuration                                   | cgroup-v2.rst "Model of Delegation" / "Delegation Containment"; and "No Internal Process Constraint": "only domain cgroups which don't contain any processes can have domain controllers enabled in their cgroup.subtree_control … The root cgroup is exempt"                          | Supported as far as stated; the internal-process constraint is missing from the review and breaks the plan's layout (BLOCKER-1)                                 |
| `--max-old-space-size` limits V8 old space; WebAssembly cage; v26 fallback change                  | Node v22.22.2 cli.md: "Sets the max memory size of V8's old memory section"; cage "currently 10GB", `ulimit -v` example; nodejs.org v26.8.2: "v26.0.0 Node.js now automatically disables the trap handler when there is not enough virtual memory available at startup" (8/16 GB cage) | Supported; the cage size differs by documentation version, and the verifier runs no WebAssembly, so this is a reason not to use `RLIMIT_AS`, not a sizing input |
| Node documents RSS growth from allocator fragmentation                                             | process.md: "sustained `rss` growth despite stable `heapTotal` due to fragmentation caused by the glibc `malloc`"                                                                                                                                                                      | Supported                                                                                                                                                       |
| Killing a Linux child's parent does not kill grandchildren; `detached` creates a new session/group | child_process.md: "On Linux, child processes of child processes will not be terminated when attempting to kill their parent"; "made the leader of a new process group and session. Child processes may continue running after the parent exits regardless"                             | Supported; reproduced (E3, E5)                                                                                                                                  |
| Synchronous child APIs keep waiting after timeout if SIGTERM is handled                            | child_process.md: "If the child process intercepts and handles the SIGTERM signal and does not exit, the parent process will still wait"                                                                                                                                               | Supported                                                                                                                                                       |
| `maxBuffer` terminates the child and truncates output                                              | child_process.md: "If exceeded, the child process is terminated and any output is truncated."                                                                                                                                                                                          | Supported                                                                                                                                                       |
| Python `communicate()` buffers in memory; timeout does not kill; `preexec_fn` unsafe with threads  | subprocess.rst (3.11 and 3.14): identical warning text; `process_group` "versionchanged 3.11"                                                                                                                                                                                          | Supported; the API surface relied on exists in 3.11+, so 3.14 documentation is not a version hazard for a 3.11/3.12 runtime                                     |
| Node timers make no exact-timing guarantee                                                         | timers.md: "Node.js makes no guarantees about the exact timing of when callbacks will fire"                                                                                                                                                                                            | Supported                                                                                                                                                       |
| Subreaper receives orphans; zombies remain until waited                                            | prctl.2 `PR_SET_CHILD_SUBREAPER`; wait.2 NOTES ("becomes a zombie … adopted by init(1), (or by the nearest subreaper")                                                                                                                                                                 | Supported; reproduced (E2: zombie with `ppid 1` after `cgroup.kill`)                                                                                            |

Facts, inferences and intended settings are kept apart in `SOURCE-REVIEW.md`, and
the 512 MiB / 64 tasks / 30 s values are labelled test parameters. No confusion
between the three was found. The one place where documentation freshness matters is
the kernel: the review cites the current kernel document with no kernel version,
while the interfaces it relies on appeared in different releases (SHOULD-FIX-3).

## Findings

Each finding gives location, failing condition, evidence, impact, minimal repair
and how to confirm the repair. Line numbers refer to the reviewed commit.

### BLOCKER-1: the per-call subtree cannot receive controllers in the layout the plan describes

- **Location**: README.md lines 21-24 and step 1 (line 41): "Use a writable, explicitly
  delegated cgroup location, with the required memory, pids and CPU controller
  interfaces available … allocate an empty per-call subtree"; SOURCE-REVIEW.md
  "Aggregate controls" (delegation paragraph).
- **Failing condition**: the supervisor process lives in the delegated cgroup `D`
  (the normal state of a container's or a systemd scope's root cgroup) and creates
  `D/call-N`. For `D/call-N/memory.max` to exist and be enforced, `D` must carry
  `+memory +pids +cpu` in `D/cgroup.subtree_control`. The kernel refuses that write
  while `D` contains any process, and a cgroup-namespace root is not the real root
  and is not exempt.
- **Evidence**: cgroup-v2.rst "No Internal Process Constraint": "only domain cgroups
  which don't contain any processes can have domain controllers enabled in their
  cgroup.subtree_control files … The root cgroup is exempt … To control resource
  distribution of a cgroup, the cgroup must create children and transfer all its
  processes to the children before enabling controllers". Neither reviewed document
  mentions this rule or a layout that satisfies it.
- **Impact**: a literal implementation either fails at preflight on every host where
  the supervisor starts inside the delegated cgroup (fail-closed, but the mechanism
  never runs), or an implementer "fixes" it by putting the call into `D` itself,
  which loses per-call limits and makes `cgroup.kill` kill the supervisor.
- **Minimal repair**: fix the layout in the plan: on start, the supervisor creates
  `D/supervisor` and moves itself there (`echo $$ > D/supervisor/cgroup.procs`),
  then writes `+memory +pids +cpu` to `D/cgroup.subtree_control`, then creates
  `D/calls/<call-id>` per call. Preflight reads `D/calls/<id>/cgroup.controllers`
  and requires `memory pids cpu`; anything else is the unsupported configuration the
  plan already refuses. Record `D`, the supervisor leaf and the call leaf in the
  evidence. Note that migrating a process is not blocked by `pids.max`, so the
  bootstrap placement itself cannot fail on the task limit.
- **Verification**: on a host where the supervisor starts inside `D`, show the
  `EBUSY` from enabling controllers before the move and the successful enable and
  a non-empty `cgroup.controllers` in the call leaf after it (test T2 below).

### BLOCKER-2: a partial OOM kill is reported as a valid report with `worker_failure`

- **Location**: README.md step 5 ("Forward a complete output only after a valid
  completion and successful cleanup … Never forward partial stdout or infer
  arithmetic failure from an OS kill") and step 6; `envelope.mjs` lines 414-443;
  `bridge.mjs` lines 259-263.
- **Failing condition**: `memory.oom.group` is not set (the plan never sets it), the
  cgroup hits `memory.max`, and the OOM killer chooses the Python worker. Node
  survives, `execFile` rejects, `bridge.runWorker` throws "worker process failure",
  and `envelope.verify` returns a schema-valid report whose `arithmetic` check has
  `execution: "error"` and `reasons: ["worker_failure"]`. The leader exits 0 with
  complete stdout. Nothing in step 5 distinguishes this "valid completion" from a
  worker exception.
- **Evidence**: experiment E4 (`child` mode, cgroup v1 memory controller, 96 MiB): the
  worker was SIGKILLed by the OOM killer (`oom_kill 1`), the leader printed
  `{"kind":"report","arithmetic":"error","reasons":["worker_failure"],"child_signal":"SIGKILL"}`
  and exited 0. cgroup v2 default is the same partial-kill behaviour: "This can be
  used to avoid partial kills" is the stated purpose of `memory.oom.group`. The
  packet's own inference ("A successful exit or parseable partial result does not
  override an observed resource violation") is not carried into the README steps.
- **Impact**: a memory-limit violation is forwarded as an ordinary arithmetic
  execution error; the same is possible for `pids.max` exhaustion inside the worker
  (`EAGAIN` on thread creation ends as a worker exception). This defeats the
  purpose of the control and mislabels the cause on the Protocol side.
- **Minimal repair**: (1) write `memory.oom.group=1` to the call leaf and read it
  back at preflight; (2) snapshot `memory.events.local` (`max`, `oom`, `oom_kill`,
  `oom_group_kill` where present) and `pids.events` before launch and after
  cleanup; (3) define: any positive delta is an enforcement outcome, the verifier's
  output is discarded even if it parses, and the recorded category is the resource
  event, never `worker_failure`; (4) state that a report with `worker_failure` is
  forwarded only when all counters are unchanged.
- **Verification**: test T3 and T4 below (harness-only allocation probes in the
  worker and in Node); expected: no forwarded output, `oom_kill` or
  `oom_group_kill` ≥ 1, populated 0 after cleanup, outcome `memory_enforced`.

### SHOULD-FIX-3: host preflight and kernel feature matrix are unspecified

- **Location**: README.md lines 21-24, 101-105 ("cgroup membership `0::/`, and a
  visible controller list containing cpu, memory and pids"), 113-114.
- **Failing condition**: a host with a hybrid layout shows exactly the recorded
  observation while offering no v2 controllers. This review's sandbox: `/proc/self/cgroup`
  contains `0::/` and v1 lines; `/proc/cgroups` lists `memory` (hierarchy 4),
  `pids` (8) and `cpu` (1); the cgroup v2 mount's `cgroup.controllers` is empty
  (RESULTS.json `environment`). Kernels older than 5.14 have no `cgroup.kill`
  (absent in the v5.10 document, present in v5.15); `memory.peak`, `pids.peak` and
  `oom_group_kill` are absent from the v5.15 document and present in the current one.
- **Impact**: "delegated cgroup v2 host" is not testable as written; an implementer
  on a 5.10-era or hybrid host would discover the gap at runtime. Applying the
  current document to an older kernel is the hazard item A asks about.
- **Minimal repair**: add a preflight list to the README: (a) `/proc/self/cgroup`
  has only a `0::` line, or at minimum `memory`, `pids` and `cpu` show hierarchy
  `0` in `/proc/cgroups`; (b) call-leaf `cgroup.controllers` includes `memory pids cpu`;
  (c) `cgroup.kill`, `memory.oom.group`, `memory.events.local`, `memory.swap.max`
  and `pids.events` exist and are writable/readable; (d) `memory.peak`/`pids.peak`
  are optional and their absence is recorded, never estimated; (e) record kernel
  release and note the minimum (`cgroup.kill` from 5.14; `memory.peak` from 5.19).
  Absence of any mandatory item is the unsupported configuration.
- **Verification**: test T1 (run the preflight on this review's hybrid sandbox;
  expected refusal before any input is opened).

### SHOULD-FIX-4: `populated=0` is not "all tasks terminated and reaped"

- **Location**: README.md step 4 ("Verify cgroup.events populated becomes zero"),
  step 7, and line 67 ("A process group or subreaper can assist").
- **Failing condition**: after `cgroup.kill`, `populated` drops to 0 while killed
  descendants are still zombies owned by whoever reaps them. The supervisor can only
  wait for its own children unless it is a subreaper; orphaned grandchildren go to
  PID 1 (or to a subreaper), and the cgroup's `rmdir` succeeds regardless of the
  zombies.
- **Evidence**: E2: leader killed and reaped, `populated` stayed 1 while the setsid
  grandchild lived and `rmdir` returned `EBUSY`; after `cgroup.kill`, `populated`
  became 0 in 1.6-5.5 ms while the grandchild was state `Z` with `ppid 1` and was
  still `Z` 500 ms later; `rmdir` then succeeded.
- **Impact**: "successful reaping" in the evidence would be asserted from a file that
  cannot show it; reaping evidence would depend on the container's init.
- **Minimal repair**: make `PR_SET_CHILD_SUBREAPER` mandatory in the supervisor
  before the first spawn; define cleanup evidence as all three of `populated == 0`,
  `waitpid(-1, …)` repeated until `ECHILD` inside the bounded cleanup interval, and
  `rmdir` success; record any remaining PID and its state when the interval ends.
- **Verification**: test T6 (setsid descendant); expected `ECHILD` reached and
  `rmdir` ok within the cleanup interval, with the zombie's state visible in the log.

### SHOULD-FIX-5: cleanup is conditional and does not cover process leftovers and temporary files

- **Location**: README.md step 4 (kill only "On deadline, output overflow, abnormal
  exit or cancellation") and step 7 ("Remove only the subtree"); `bridge.mjs` lines
  238-271 (`mkdtemp` under `os.tmpdir()`, removed in `finally`).
- **Failing condition**: the leader exits (normally or by OOM) while the worker is
  still running, or the leader is SIGKILLed; a JavaScript `finally` never runs after
  SIGKILL, so the `holm-worker-*` directory and `metrics.json` stay on disk. With a
  tmpfs `/tmp`, that file's pages remain charged to the killed call's cgroup until
  removed, which blocks `rmdir` if the file is left open, and leaks otherwise.
- **Evidence**: E4 `both` mode: after the leader was OOM-killed, one PID remained in
  the cgroup at the moment the leader exited. E5: SIGKILL of the Node leader during
  a real call left the worker alive (`Z`, `ppid 1`) and left `/tmp/holm-worker-uBDqdC/metrics.json`.
- **Minimal repair**: make `cgroup.kill` + drain + reap unconditional after the leader
  exits, whatever the status; give each call a private `TMPDIR` under a supervisor
  directory and remove it in cleanup; count temp-directory removal in the cleanup
  evidence.
- **Verification**: test T6 plus a check that no `holm-worker-*` directory survives
  a killed call.

### SHOULD-FIX-6: the actual process set depends on the loader, and the documented invocation adds an esbuild child

- **Location**: README.md lines 13-17 ("Node startup and dependency loading … and
  the isolated Python worker"), line 29 ("Count threads in the task allowance");
  envelope `README.md` reproduction command `node --import tsx …`.
- **Failing condition**: with `--import tsx`, tsx spawns the esbuild native binary
  (Go runtime, several threads) and Node itself runs more threads; the trusted
  process set is then Node + esbuild + Python, and esbuild is not in any pinned
  runtime list (`INPUTS.json` pins 177 package files, none from tsx/esbuild).
- **Evidence**: E1c (native type stripping, Node 22.22.2): Node 7 threads, Python 1,
  peak 8 threads. E1d (`--import tsx`): Node 12 threads and an `@esbuild/linux-x64`
  0.28.1 child with 7 threads observed, peak 20 threads (first sampling); the packet
  runner's 5 ms sampler missed the short-lived esbuild child in its run (peak 13),
  which itself shows why thread counts must come from `pids.peak`/`cgroup.threads`,
  not from `/proc` sampling. Node's own documentation: type stripping "enabled by
  default" from v22.18.0.
- **Impact**: 64 tasks is still sufficient, but the design's statement of what runs
  inside the boundary is wrong for the documented command, and the pins do not
  cover it.
- **Minimal repair**: pin the launch to native type stripping (Node ≥ 22.18 or 24)
  with no loader, or add tsx/esbuild to the pinned runtime and to the expected
  process set; state the expected process set (bootstrap shell, Node, Python) and
  read `pids.peak` (or `cgroup.threads` samples where absent) as evidence.
- **Verification**: cgroup.procs listing during a real call shows exactly the stated
  set; `pids.peak` recorded.

### SHOULD-FIX-7: no entry point or input/output contract exists for the supervised call

- **Location**: README.md step 2-3 and 5; `envelope.mjs` lines 323-327, 355-360,
  366-372; `test_envelope.mjs` lines 86-99.
- **Failing condition**: `verify(expectedText, recordBytes)` is an in-process API.
  Its success value carries the byte-identical Record (`verified_bytes`, up to
  2.25 MiB) and the parsed payload. A supervised call needs a new CLI entry point
  whose stdout must carry the report and that Record, so a 256 KiB-style stdout cap
  (the existing worker cap) would truncate every successful call; conversely an
  entry point that reads the whole file before `verify` re-creates the unbounded
  read the plan forbids. The 82 author controls and 93 investigator controls call
  `verify` in-process with an injected runner (`calls` counted per case) and cannot
  be "replayed" through a supervisor without an adapter.
- **Impact**: the refusal order and vocabulary can change by accident: if the
  supervisor refuses an oversize file itself, the verifier's `raw/resource_limit/record_bytes`
  refusal is never produced and the existing controls for it no longer describe
  the supervised behaviour.
- **Minimal repair**: specify the entry point: two regular-file paths in, one JSON
  document out on stdout (report or refusal), and the Record forwarded either by
  the caller re-reading the file it supplied (the report already carries the
  content digest) or by a separate output file, so the stdout cap can stay small;
  the entry point opens inputs with `O_NOFOLLOW|O_NONBLOCK`, checks `S_ISREG`, reads
  at most `cap + 1` bytes into the buffer and hands them to `verify`, so the
  verifier's own size refusal and priority are unchanged; the supervisor refuses only
  non-regular inputs. Name the subset of controls that must traverse the entry point
  (the two real-worker cases, every resource refusal, one of each refusal stage).
- **Verification**: test T8 (cap+1 bytes and cap+10 MiB both yield the verifier's
  `record_bytes` refusal; FIFO refused by the supervisor within one second).

### SHOULD-FIX-8: the supervisor's internal outcome vocabulary and precedence are undefined

- **Location**: README.md step 5 ("Keep supervisor failure separate from the proposed
  Protocol report/refusal mapping until that mapping is included in the coordinated
  normative candidate"); `bridge.mjs` line 251 (`timeout: 25000`); `run_suite.py`
  (30 s external deadline).
- **Failing condition**: deferring the public mapping is right, but an implementation
  must still choose categories now. Without a written enumeration and precedence,
  the first implementation fixes them by convenience: for example a hung worker is
  killed by the inner 25 s timer (report: `worker_failure`) or by the outer 30 s
  deadline (no report), depending on how long startup took; an OOM followed by the
  deadline yields two candidate causes.
- **Minimal repair**: add to the README a non-public internal enumeration
  (`completed_valid`, `completed_invalid_output`, `memory_enforced`, `pids_enforced`,
  `deadline`, `output_overflow`, `abnormal_exit`, `cancelled`, `cleanup_failed`,
  `unsupported_host`) and a precedence rule (counter-evidenced enforcement beats
  deadline beats abnormal exit beats output validity), with the explicit statement
  that no value is a public reason code. State that the inner worker timeout is
  retained as a trusted-program safeguard and that its `worker_failure` report is
  forwarded only when the supervisor observed no enforcement event and no deadline.
- **Verification**: a table in the implementation tests mapping each of T3-T9 to
  exactly one internal outcome.

### SHOULD-FIX-9: "prevent the verifier from changing or escaping the controls" has no mechanism, and the environment is not sanitized

- **Location**: README.md lines 33-36; SOURCE-REVIEW.md "Evidence needed" item 2;
  `bridge.mjs` line 253 (`env: { ...process.env, … }`).
- **Failing condition**: the verifier runs as the supervisor's uid, so it has the
  same write access to `D/*/cgroup.procs` and `D/calls/<id>/memory.max` that the
  supervisor needs; the delegation containment rule only prevents crossing the
  delegation boundary, not moving between `D`'s children. Node also honours
  `NODE_OPTIONS` (for example `--require`, `--max-old-space-size`) from the
  inherited environment; the worker receives the full environment (`-I` only covers
  `PYTHON*` variables and user site).
- **Impact**: under the trusted-program premise this is not an attack, but the plan
  claims a prevention it does not provide, and an inherited `NODE_OPTIONS` silently
  changes the launch behaviour that the evidence is supposed to fix.
- **Minimal repair**: either run the bootstrap with a distinct uid after placement
  (cgroup files owned by the supervisor uid, mode 0644 for the verifier), or replace
  the "prevent" sentence with the trusted-program premise. In both cases the
  bootstrap execs Node with a fixed minimal environment (`PATH`, `HOME`, `TMPDIR`,
  `NOMUE_EXPERIMENT_PYTHON`; no `NODE_OPTIONS`, `NODE_PATH`, `NODE_EXTRA_CA_CERTS`)
  and closes inherited descriptors above 2.
- **Verification**: test T11 (`NODE_OPTIONS=--require=<marker>` in the supervisor's
  environment must not be observable inside the call).

### SHOULD-FIX-10: memory figures from RSS are not comparable with cgroup charging, and enforcement may appear as a stall rather than a kill

- **Location**: README.md line 27 (512 MiB), step 6; binding `REPORT.md` (sum of
  peaks, live RSS 150 MiB); SOURCE-REVIEW.md "Group memory charging is not identical
  to summing process RSS".
- **Failing condition**: the 512 MiB figure descends from RSS sums. The same real
  call charged a peak of 57-60 MiB in a memory cgroup while `/proc` sampling shows
  Node alone at about 125 MiB VmRSS: file-backed pages of the Node binary and
  `node_modules` were already charged to another cgroup on this host, and charges do
  not move with the process. On a cold page cache the same call charges more. The
  reviewed plan says the 512 MiB is provisional, but it gives no rule for what
  measure replaces it.
- **Evidence**: E4b: `charged_peak_bytes` 63,410,176 (100 MiB limit) and 60,747,776
  (512 MiB limit) for a call whose sampled Node VmRSS was 124,592 KiB (E1c); at
  8-48 MiB the leader was OOM-killed with no output; one earlier 32 MiB attempt did
  not finish within 60 s (reclaim stall, leader still in the cgroup) while the
  repeated 32 MiB run was killed in 0.4 s, so the same limit can produce either a
  kill or a stall.
- **Minimal repair**: state that the limit is tuned from `memory.peak` (or
  `memory.current` samples where `memory.peak` is absent) measured inside the call
  leaf on a cold cache, never from RSS sums; record `memory.events.local` `max`
  (and `high` if a high limit is used) as enforcement evidence even when
  `oom_kill` is 0, and treat a deadline with `max > 0` as memory enforcement rather
  than as an unexplained hang.
- **Verification**: test T5 (limit chosen just under the cold-cache `memory.peak`;
  expected either an OOM event or a deadline with `max > 0`, both classified
  `memory_enforced`).

### SHOULD-FIX-11: the source review must add three facts before it is a sufficient basis

- **Location**: SOURCE-REVIEW.md "Aggregate controls" and "Source inspection record";
  INPUTS.json `external_source_content_hashes: null`.
- **Failing condition**: the design decisions in BLOCKER-1, BLOCKER-2 and SHOULD-FIX-3
  rest on primary-source facts that the review does not record (internal-process
  constraint; group OOM as a design input; interface availability by kernel release).
- **Minimal repair**: add the three facts with their passages; add a kernel-release
  column to the record; add content hashes of the documents actually read (this
  packet's INPUTS.json supplies hashes for the GitHub mirrors used here, which are
  not the same bytes as the rendered pages the investigator read).
- **Verification**: the repaired SOURCE-REVIEW.md cites the passages quoted in this
  review's verification table.

### NICE-TO-HAVE-12: record CPU throttling separately from hangs

`cpu.max` at one CPU with 7-12 Node threads will throttle; record `cpu.stat`
`nr_throttled`/`throttled_usec` per call so that a slow call under bandwidth
control is distinguishable from a blocked one.

### NICE-TO-HAVE-13: swap accounting

`memory.swap.max` exists only with swap accounting enabled; record `/proc/swaps`
in preflight so that "zero swap" evidence distinguishes "no swap device" from
"swap forbidden".

### NICE-TO-HAVE-14: the worker's own `RLIMIT_AS`

`worker.py` line 12 sets `RLIMIT_AS` to 256 MiB. Under the cgroup this remains and
turns a large allocation into a Python `MemoryError` (exit 1, stderr) instead of an
OOM kill; both reach the envelope as `worker_failure`. Say so, and keep the
counter-based rule of BLOCKER-2 as the only enforcement signal.

### NICE-TO-HAVE-15: mark `exec(3p)` as not re-inspected

This review could not open the POSIX page; the statement is not design-bearing.
A future re-inspection against the pinned runtime should include it or drop it.

## Experiments (item 5)

Scripts and raw results are in [experiments/](experiments/); `run_all.py` reproduces
them from the repository root. Environment: Linux 6.18.44 x86_64 sandbox, Node
v22.22.2 (`/opt/node22/bin/node`), CPython 3.11.15 (`/usr/local/bin/python3`),
hybrid cgroup layout as recorded in `RESULTS.json`. Every cgroup created was
private under this session's own v1 memory cgroup or the empty v2 mount, and was
removed; no shared setting changed.

| Id  | Input / configuration                                                                                                                                  | Observation                                                                                                                                                                                                     | Cleanup                           |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| E1  | `/proc` sampling every 5 ms of: plain Node; `python3 -I`; real envelope call with native type stripping; the same with `--import tsx`                  | 7 / 1 / 8 (Node 7 + Python 1) / up to 20 threads with an esbuild 0.28.1 child (7 threads) in the first sampling; the runner's sampling missed the short-lived child                                             | processes exited normally         |
| E2  | Private cgroup under the v2 mount (no controllers); leader placed via `echo $$ > cgroup.procs; exec`; leader spawns a setsid grandchild holding stdout | leader SIGKILL: `populated` stays 1, pipe not at EOF, `rmdir` EBUSY; `cgroup.kill`: `populated` 0 after 1.6-5.5 ms, grandchild still a zombie (`ppid 1`) 500 ms later, pipe EOF, `rmdir` ok                     | cgroup removed                    |
| E3  | `execFile(python, …, {timeout: 1000, killSignal: SIGKILL})`, worker spawns a setsid grandchild sharing stdout                                          | promise rejected at 1006 ms (Node destroys the stdio streams before killing, so a retained pipe does not block `execFile`); grandchild alive after rejection                                                    | grandchild killed by the script   |
| E4  | v1 memory cgroup, 96 MiB; Node leader mirroring `bridge.runWorker`; allocation in child / in both / in parent                                          | child: worker OOM-killed, leader exits 0 with a `worker_failure` report; both: leader OOM-killed, a PID still in the cgroup right after leader exit, 2 kills; parent: leader OOM-killed                         | leftovers killed, cgroups removed |
| E4b | The real envelope call under 8, 16, 32, 48, 100, 512 MiB v1 limits, 15 s deadline                                                                      | ≤ 48 MiB: leader SIGKILLed, `oom_kill 1`, no stdout; 100 and 512 MiB: complete report, charged peak 57-60 MiB versus ≈ 125 MiB sampled VmRSS; one earlier 32 MiB attempt stalled > 60 s instead of being killed | cgroups removed                   |
| E5  | Real call; SIGKILL the Node leader once the worker exists                                                                                              | worker outlives the leader (`Z`, `ppid 1`, gone after 2 s here); `/tmp/holm-worker-*/metrics.json` left behind                                                                                                  | directory removed by the script   |

NOT_RUN: cgroup v2 `memory.max`, `memory.oom.group`, `pids.max`, `cpu.max`,
delegation and the internal-process constraint (no v2 controllers in this sandbox).
The claims about them rest on the quoted kernel document only.

## Minimal tests to add (item G)

The existing 82 author controls, 93 investigator controls and 132 legacy fixtures
call `verify` in-process, inject the worker runner in all but two cases, and never
create a cgroup, a deadline, an overflow or a kill. Replaying them proves that the
verifier's semantics are unchanged; it proves nothing about admission, enforcement,
termination or cleanup, and any expectation derived from the supervisor's own
counters would be circular. The following tests each have an expected result fixed
before the run and an observation source outside the implementation.

| Id  | Input                                                                                                             | Expected result (fixed beforehand)                                                                                                        | Observation source                                                        |
| --- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| T1  | Preflight on a hybrid host (this sandbox) and on a v2 host with `memory` missing from the call leaf               | `unsupported_host` before any input file is opened                                                                                        | `strace`/`ltrace` or an `inotify` watch on the input files; preflight log |
| T2  | Supervisor started inside `D`                                                                                     | `EBUSY` on enabling controllers before moving to `D/supervisor`; success after; call-leaf `cgroup.controllers` = `memory pids cpu`        | `cgroup.subtree_control` write result, `cgroup.controllers` content       |
| T3  | Harness-only allocation probe in the worker (env-guarded test build, never Record data) touching 2 × `memory.max` | no forwarded output; `oom_group_kill ≥ 1` (or `oom_kill ≥ 2` with group OOM absent); outcome `memory_enforced`; `populated 0`; `rmdir` ok | `memory.events.local`, `cgroup.events`, supervisor stdout byte count      |
| T4  | Same probe in Node before the worker launch                                                                       | as T3, and no worker process ever appears                                                                                                 | `pids.peak` or `cgroup.procs` samples                                     |
| T5  | Real 120-member call with `memory.max` set just under its cold-cache `memory.peak`                                | OOM event, or deadline with `memory.events.local max > 0`; both `memory_enforced`; no partial stdout                                      | `memory.events.local`, wall clock                                         |
| T6  | Harness-only worker variant that spawns a setsid sleeper and exits                                                | subtree killed; `waitpid` reaches `ECHILD`; `populated 0`; `rmdir` ok; no `holm-worker-*` directory; all within the cleanup interval      | `/proc/<pid>/stat` of the sleeper, `cgroup.events`, filesystem listing    |
| T7  | Worker variant writing stdout cap + 1 bytes; then stderr cap + 1 bytes                                            | outcome `output_overflow`; subtree killed; supervisor buffers never exceed the cap                                                        | byte counters in the supervisor, `pids.current` after cleanup             |
| T8  | Record file of cap + 1 bytes; of cap + 10 MiB; a FIFO; a directory                                                | verifier's `raw/resource_limit/record_bytes` refusal for both sizes; supervisor refusal within one second for FIFO and directory          | refusal JSON on stdout; wall clock                                        |
| T9  | Harness-only worker variant spawning threads until failure                                                        | `pids.events max ≥ 1`; outcome `pids_enforced`; no forwarded output                                                                       | `pids.events`, `pids.peak`                                                |
| T10 | Two simultaneous calls in sibling leaves, one being T3                                                            | the other completes with a valid report and unchanged counters in its own leaf                                                            | per-leaf `memory.events.local`                                            |
| T11 | `NODE_OPTIONS=--require=<marker>` and a stray inherited descriptor in the supervisor environment                  | marker never executes inside the call; `/proc/<node>/fd` shows only 0-2 plus Node's own descriptors                                       | marker file absence, `/proc/<pid>/fd`                                     |
| T12 | The two real-worker author controls (baseline, 120-member) and one refusal per stage, run through the entry point | scoped outputs byte-identical to the in-process outputs except `generated_at`                                                             | diff of the JSON documents                                                |

## What can start immediately after the repairs

1. Amend the README with the layout of BLOCKER-1, the counter rule and `memory.oom.group`
   of BLOCKER-2, the preflight list of SHOULD-FIX-3 and the internal outcome
   enumeration of SHOULD-FIX-8; amend SOURCE-REVIEW.md per SHOULD-FIX-11.
2. Write the entry point and the supervisor against that amended plan, with the
   subreaper, unconditional cleanup, per-call `TMPDIR` and fixed environment.
3. Run T1-T12 on a delegated cgroup v2 host, recording kernel release, `cgroup.controllers`
   and every counter named above; keep the 82/93/132 replays as regression evidence
   only.

This review makes no merge, registration or release decision.
