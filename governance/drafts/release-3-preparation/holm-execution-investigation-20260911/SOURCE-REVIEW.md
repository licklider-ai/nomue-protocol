# Linux whole-call execution control: primary-source review

Review date: 2026-09-11 (UTC).

Historical source-review snapshot: the later
[repair dispositions](../holm-controlled-execution-20260911/REPAIR.md) and
[review archive](../../../../review-inputs/r3-controlled-execution-review-20260911/README.md)
record follow-up source verification, implementation and execution evidence.
The original observations and provenance below are retained. Hashes of later
mirror retrievals do not authenticate the earlier HTML retrievals.

Scope: resource control for a trusted Node.js envelope verifier and one trusted Python worker on Linux x64. This is research input before design freeze. It does not authorize public support, alter Protocol meaning, close a release gate, or supply execution evidence.

## Provenance and independence boundary

Accountable review role: separate execution-control source investigator, agent `/root/r3_execution_sources`. This investigator is separate from the authoring agent but uses the same inherited model and shared tools, infrastructure, and workspace. No distinct provider/model independence or human authorship is asserted. The exact inherited model identifier was not exposed to this investigator. The task framed the question and candidate mechanisms; this is not a blinded investigation.

The public repository reference was `licklider-ai/nomue-protocol` at immutable commit `8149731d9100b7faeae706be80cf37c7d7628dc9`. AGENTS.md, CHARTER.md, AUTHORITY.md, the authority manifest, requirements registry, ID-POLICY.md, and RFC.md were fetched through the GitHub connector. The large manifest and requirements registry were inspected selectively for verification, execution, security, and governance; the security requirement entries were read in full. No repository files were edited and no private repository was accessed. No directory-local editing instructions applied because no repository edit was performed.

Local execution failed at the first attempted read with `exec-server transport disconnected`. The authoring agent subsequently confirmed `environment_offline` HTTP 409. Kernel, Node, Python, cgroup delegation, and process behavior were therefore not measured by this investigator. Every proposed probe below remains NOT_RUN.

## Established source facts

### Process limits

Linux `RLIMIT_AS` limits one process's virtual address space, with allocation failures or failed stack expansion at the boundary. It is not a process-tree RSS budget. `RLIMIT_CPU` measures one process's CPU seconds, delivering SIGXCPU at the soft limit and SIGKILL at the hard limit. Resource limits are shared by that process's threads, inherited at fork, and preserved across exec. `RLIMIT_NPROC` is per real user, counts Linux threads, and has privilege exceptions; `RLIMIT_RSS` does not provide a modern Linux RSS ceiling. `RLIMIT_FSIZE` concerns file size, so it is not a stdout-pipe byte counter. [getrlimit(2)](https://man7.org/linux/man-pages/man2/getrlimit.2.html)

Fork resets the child's resource-utilization and CPU-time counters. Consequently, equal inherited CPU limits permit separate allowances in Node and Python; repeated worker creation also defeats interpreting a per-process allowance as a single cumulative call allowance. [fork(2)](https://man7.org/linux/man-pages/man2/fork.2.html) Exec preserves the process CPU-time clock; the reset distinction is fork versus exec, not merely a new executable image. [exec(3p), POSIX text hosted by man7](https://man7.org/linux/man-pages/man3/exec.3p.html)

### Aggregate controls

Cgroup v2 limits are hierarchical. `memory.max` limits charged group memory but permits temporary overshoot; swap has a separate `memory.swap.max`. `memory.oom.group=1` requests group OOM treatment, except protected tasks. `pids.max` constrains fork/clone and counts threads, not just executable processes. `cgroup.kill` SIGKILLs the subtree with concurrent-fork and migration protection. `cpu.max` is bandwidth per period, not a lifetime CPU allowance; `cpu.stat` provides aggregate usage. Delegation requires suitable access and controller configuration. [Linux cgroup v2 documentation](https://docs.kernel.org/admin-guide/cgroup-v2.html)

Inference: investigate a fresh delegated cgroup per call containing Node and its worker before processing starts, with an external supervisor, memory/swap/task limits, explicit CPU policy, and subtree cleanup. Reserve enough task slots for runtime threads. Keep the worker unable to change the containment configuration. A missing or unwritable delegated subtree means this aggregate profile is unavailable; rlimits are not an equivalent substitute. Sampled CPU accounting implies detection delay. Group memory charging is not identical to summing process RSS. These are design candidates, not tested guarantees.

### Runtime memory

`--max-old-space-size` limits V8's old memory section, not total Node memory. Node's official CLI documentation also describes large virtual reservations for WebAssembly and a version-dependent fallback change in v26. Thus an address-space cap that seems large relative to the JavaScript heap may still reject runtime reservations. [Node CLI](https://nodejs.org/api/cli.html)

Node distinguishes V8 heap usage, native allocations associated with JavaScript objects, ArrayBuffer/Buffer allocations, and process RSS. It documents possible RSS growth from allocator fragmentation despite stable heap totals. [Node process API](https://nodejs.org/api/process.html)

Inference: a small V8 heap flag cannot certify a whole-call memory ceiling. An address-space ceiling needs startup and workload calibration against the exact Node/V8 binary and flags. This pass did not inspect an allowed-domain primary definition of the intended build's JIT code-range reservation; no numeric code-range requirement or universal safe RLIMIT_AS value is established. WebAssembly cage documentation does not establish the size of the JIT code range.

### Termination and reaping

A negative PID below -1 addresses a process group. [kill(2)](https://man7.org/linux/man-pages/man2/kill.2.html) An eligible process can create a new session and process group using setsid. [setsid(2)](https://man7.org/linux/man-pages/man2/setsid.2.html) Inference: group signaling is useful for cooperative descendants, but it is not irrevocable tree containment against a descendant that changes session/group.

A Linux subreaper receives orphaned descendants for subsequent waiting. It does not itself impose a memory budget or terminate descendants. [PR_SET_CHILD_SUBREAPER](https://man7.org/linux/man-pages/man2/PR_SET_CHILD_SUBREAPER.2const.html) Waiting collects child state; an unreaped terminated child remains a zombie. [wait(2)](https://man7.org/linux/man-pages/man2/wait.2.html) Inference: cleanup evidence needs both termination and successful reaping, including orphaned descendants; killing the direct worker alone is insufficient.

Node documents that killing a Linux child's parent does not kill that child's children. Its detached option creates a new session/group on non-Windows systems. Synchronous child APIs may continue waiting after timeout if the target handles SIGTERM without exiting. `maxBuffer` is a stdout/stderr byte ceiling for APIs that support it; pipes have limited capacity and can block writers when undrained. [Node child_process](https://nodejs.org/api/child_process.html)

### Output and elapsed time

Python `communicate()` buffers output in memory, is inappropriate for unlimited output, and its timeout does not kill the child. The Python documentation warns that `preexec_fn` can deadlock in a threaded parent and recommends dedicated session/group options for those operations. [Python subprocess](https://docs.python.org/3/library/subprocess.html)

Node does not guarantee exact timer callback timing. [Node timers](https://nodejs.org/api/timers.html) Inference: use a supervisor deadline covering Node startup, parsing, Python startup/computation, result validation, serialization, and cleanup. An in-process JavaScript timeout cannot reliably interrupt blocked synchronous execution. Define the deadline's cleanup allowance; do not present ordinary scheduler behavior as a hard real-time guarantee.

Inference: the supervisor should count raw stdout/stderr bytes before decoding or accumulating them, separately define per-stream and total limits, and terminate on overflow. Bound input bytes before parsing. Include diagnostic output and final output serialization. Avoid indefinite pipe drainage after timeout, especially when another descendant retains a write descriptor. A successful exit or parseable partial result does not override an observed resource violation.

## Evidence needed before making the proposed profile concrete

All items are NOT_RUN in this review:

1. Record the exact kernel, architecture, Node/V8/Python versions, binary identities, launch flags, privilege state, and cgroup mount/controller/delegation capabilities.
2. Verify the complete intended process set is placed inside the call boundary before input-dependent processing. Verify no undesired inherited descriptors or child-controlled environment options change the launch behavior.
3. Exercise combined Node/Python allocation, allocation outside the V8 heap, runtime startup under address-space caps, worker CPU after expensive envelope processing, and repeated child creation if it is not structurally prohibited.
4. Exercise Node hangs, worker hangs, output flooding on both streams, child exit with a surviving descendant, session-changing descendants, and timeout during retained-pipe output.
5. Record termination cause, output counts, elapsed timing and cleanup timing, final child/reaping state, and the relevant enforcement observations. Preserve control failures and unsupported-environment refusals as distinct from successful enforcement.

No public-support adoption decision is made. A delegated execution environment and passing adversarial probes remain necessary to substantiate the aggregate profile. The current offline workspace provides no such evidence.

## Source inspection record

All links above were opened and inspected through web retrieval on 2026-09-11. Sources were limited to Linux kernel documentation, upstream Linux man-pages, official Node.js documentation, and official Python documentation; incidental search results from other domains were not used as evidence. Retrieved Node pages identified v26.8.2 and Python identified 3.14.7; these are documentation versions, not claims about installed runtimes. The inspected getrlimit page identifies Linux man-pages 6.19. The kernel documentation page and unversioned API URLs are mutable and were not downloaded or content-hashed because execution was unavailable. Reinspection against the eventual pinned runtime remains necessary. The man7 exec(3p) page is POSIX material and is used only for the exec-inheritance distinction.
