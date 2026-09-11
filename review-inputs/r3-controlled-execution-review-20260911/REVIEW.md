# Independent review of the Holm controlled execution candidate

## Verdict and fixed scope

**PASS for the unissued research implementation at `dc6c9694d6a5221dfed0ea5bf4af55246549cd68`, within its documented trusted-program and host-service assumptions.** No remaining implementation blocker was identified in this bounded review. This is not a supported execution-profile registration, release decision, hostile-code sandbox certification, or cold-cache sizing result.

| Item                      | Immutable identity                                                                                                     |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Initial PR #317 candidate | `e2c998124078b737d5e0776a7fc0c2094b51fa36`                                                                             |
| Initial candidate parent  | `9f1cae75a96af08c93673cf5f4ef7d3e3f44f1c9`                                                                             |
| First repair              | `dd1088395bbc04cd3774f9dd90b46bd29ed4cacc`                                                                             |
| Final reviewed candidate  | `dc6c9694d6a5221dfed0ea5bf4af55246549cd68`                                                                             |
| Prior review input        | PR #316, `4f4c10e55e352760fcde64c9560e9f995df49e71`; archived review target `539f8481b5c57f8d5740af16c7a46772188b85c7` |
| Date                      | 2026-09-11 UTC                                                                                                         |

The target is the controlled-execution packet and dedicated workflow, with the existing envelope/bridge inspected as fixed dependencies. Initial review found two repair items. The follow-up was limited to those repairs, added controls, and refreshed pins. The initial evidence remains in `RESULTS-initial.json.txt`; final results are separate in `RESULTS-final.json.txt`.

## Role and independence

Accountable role: separate adversarial implementation investigator, OpenAI Codex agent `/root/r3_controlled_review`. This investigator did not author the candidate or edit its implementation. It received the fixed-candidate commission and independently read the public repository, designed rootless controls, and examined the provided CI receipts. Concrete findings were communicated to the authoring coordinator, who implemented the repairs.

This is a separate agent context using the same inherited model configuration and shared execution infrastructure as the coordinator. It is not a different-provider, different-model, independently provisioned host, human, or model-build-attested review. No subagents were started; no private repository was accessed. The working copy was detached at each reviewed commit. Public repository AGENTS, CHARTER, AUTHORITY, authority manifest, requirement registry, ID policy, and RFC research-gate instructions governed the review. No new statistical methodology was selected or independently certified here.

Local execution used Linux 6.18.35 x86_64, Node v24.19.0 and Python 3.12.14. `/sys/fs/cgroup` is read-only. This investigator did not create, move processes into, or alter a kernel cgroup. Ordinary temporary files used by the state-machine tests are explicitly simulated interfaces, not OS-enforcement evidence. Dependencies were copied into the detached repository; runtime package-origin checks passed. `ENVIRONMENT.json` records the environment and confirms all 41 final runtime source pins match.

## Findings and disposition

### 1. Late completion could escape the wall deadline — repaired

At the initial head, `run()` checked elapsed time before `pump(0.01)`, then accepted a completed leader immediately after that wait. Completion first observed after the deadline could therefore produce `completed_valid` and forward a result.

The independent deterministic control runs the actual `run()` state machine with ordinary fake control files, real local pipe descriptors, a simulated exited leader, and a monotonic clock that advances from 0.99 to 1.01 seconds around a one-second deadline. Initial outcome: `completed_valid`, exit zero, result present, elapsed 1.01. Final outcome: `deadline`, no result, cleanup facts true in the simulated model. The repair checks elapsed time on entrance to `finally`, before cleanup begins. It closes this acceptance gap without counting the separate cleanup budget as call execution.

This test establishes control-flow behavior, not a hard real-time timing guarantee or kernel-cgroup operation. The documented responsive-host and scheduling limits remain applicable.

### 2. Transport eligibility checks were incomplete — repaired

Initial `strict_transport()` rejected duplicate names and nonfinite JSON constants, but accepted exponent overflow (`1e400`), escaped lone surrogates, negative zero, and a 400-digit integer outside finite binary64 range. The README claimed generated-transport JSON eligibility was validated. Although the pinned trusted Node entry cannot ordinarily emit these malformed representations, the defensive validator did not meet that claim.

The final implementation checks integer range, negative zero, finite floats, and Unicode encodability in keys and values. Independent controls now reject duplicate keys, NaN, exponent overflow, surrogate keys and values, integer/float negative zero, negative underflow, and integer overflow. The first repair still accepted the oversized integer; that concrete follow-up was repaired in the final commit. Record bytes are not parsed by this transport validator.

## PR #316 repair assessment

| Area                               | Assessment and evidence                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Distribution layout and preflight  | Explicit empty domain D and D/calls; enabled memory/cpu/pids at both levels; separate supervisor leaf; fresh-leaf controls, readbacks and mandatory interfaces checked before bootstrap launch. Initial CI records EBUSY before moving the provisioning process, then successful controller enablement. Local unavailable/read-only preflight rejects execution.                                                                              |
| Placement and startup race         | A single-threaded Python bootstrap joins the fresh call leaf before Node exec. Cleanup kills the subtree and also kills a still-running bootstrap directly, then repeats subtree kill during cleanup. Initial Python startup remains outside the call boundary, as disclosed. No Record-selected executable or probe path exists.                                                                                                             |
| Partial OOM and task exhaustion    | `memory.oom.group=1` and reset `oom_score_adj`; post-cleanup memory max/oom/kill deltas and pids max invalidate all output. CI demonstrates group OOM and exit-zero pids invalidation. Independent simulated max-only and pids-only events also suppress otherwise acceptable exit-zero output.                                                                                                                                               |
| Descendants and reaping            | Unconditional subtree termination, leader kill when needed, subreaper, waitpid until ECHILD, populated=0, pipe EOF, leaf removal and owned TMPDIR removal are separate checks. CI descendant receipt records an adopted PID reaped with signal 9 and all cleanup checks true. No claim equates populated=0 with reaping.                                                                                                                      |
| Bounded input and refusal priority | The entry uses O_NOFOLLOW/O_NONBLOCK, regular-file checks and cap+1 reads. Its first pass defers expected-file I/O until the existing context parse refusal; it cannot invoke the worker before that point. Independent file tests cover raw, routing, schema, storage and integrity refusal before a nonexistent expected file, expected byte overflow before UTF-8 decoding, and expected FIFO/directory/symlink rejection.                 |
| Output and forwarding              | Both streams have separate capped accumulation and concurrent draining. Node validates the report/refusal, Python validates the closed transport under the trusted-entry premise, and base64 forwards the saved original bytes only after five passing checks. Independent baseline verifies exact byte equality; scoped failures contain no forwarded Record. Initial CI floods observe overflow with bounded buffers and completed cleanup. |
| Pins, environment and timeout      | Native pinned Node and Python versions; absolute executables; source pins verified; executable hashes recorded per invocation; fixed child environment and close_fds. Existing worker timeout/RLIMIT_AS remain distinct from cgroup evidence. The outer deadline repair is independently reproduced. Final CI separately passes cancellation and inherited-descriptor controls at the final commit.                                           |
| Scope and service ownership        | The candidate expressly relies on trusted installed code, filesystem and operator, separately budgeted supervisor/startup, concurrency control, and external service-crash cleanup. Cold-cache sizing and public outcome mapping remain unfinished. These are retained boundaries, not claimed completed repairs.                                                                                                                             |

## Independent tests and received CI evidence

`independent_tests.py` executes 13 controls. At the initial head, five passed and eight exposed the two finding classes; at the final head all 13 pass. One aggregate control reruns the author local suite: six checks at the initial head, seven at the final head. `RESULTS-initial-first.json.txt` preserves the earlier eight-control discovery run before the negative-case inventory was expanded.

`entry_controls.py` has 16 independently specified file/priority expectations, all passing at the initial head. The entry implementation and its envelope/bridge dependencies are unchanged at the final head. It covers original-byte forwarding, Record refusal priority, expected-input transport errors and cap precedence, context failure, and arithmetic mismatch as a scoped failure. Python canonicalization in these test fixtures is used only on the ASCII/integer fixture subset; this is not an independent numerical oracle claim.

The received initial dedicated CI artifacts report 20/20 controls on the original candidate. They contain actual Linux cgroup v2 enforcement observations, including Node and worker group OOM, pids exhaustion, output flooding, synchronous hang, detached descendant cleanup, concurrent sibling calls and four real inputs. Those are author-run CI observations inspected by this investigator, not this investigator's own kernel experiments. The initial files are preserved as `CI-HOST-initial.json.txt` and `CI-RESULTS-initial.json.txt`.

The final CI run is **34599836146**, reported head `dc6c9694d6a5221dfed0ea5bf4af55246549cd68`, artifact **10263403165**. The coordinator verified its downloaded ZIP SHA-256 as `22ca0509b22527024ee19b5cf43724f5ad9ec9a4a4cdfb5913f98d640412c339`. This investigator inspected the extracted final receipts, whose exact content hashes are in `INPUTS.json`. They report **32/32**, on Linux 6.17.0-1022-azure, Node v24.19.0 and Python 3.12.14. These final observations are preserved separately in `CI-HOST-final.json.txt` and `CI-RESULTS-final.json.txt`.

| Final CI observation                                                         | Recorded result                                                                                              |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Baseline / 120-member / large-declaration / six-variant charged memory peaks | 59,437,056 / 66,883,584 / 73,105,408 / 63,848,448 bytes; eight tasks; no memory or pids enforcement counters |
| Worker / Node memory probes                                                  | 96 MiB control; group OOM delta 1 each; memory max deltas 20 / 19; no forwarded result                       |
| Task exhaustion                                                              | pids peak 32; max delta 1; exit zero still classified `pids_enforced`; no result                             |
| Stdout / stderr flooding                                                     | Buffers capped at 4,456,448 / 65,536 bytes; `output_overflow`                                                |
| Cancellation                                                                 | `cancelled`, no result, all cleanup checks true                                                              |
| Environment and inherited descriptor                                         | Probe completed successfully with the sentinel descriptor absent                                             |
| Ten scoped refusal/check cases                                               | Correct expected scoped outcome, no forwarded Record                                                         |

All final admitted-call receipts inspected report successful cleanup. These charged peaks are single-run observations, not cold-cache maxima, certified resource ceilings for all accepted inputs, or independent wall-clock measurements. The final run adds coverage to the original 20-control run; it does not retroactively change that original result.

## Source reuse and primary corroboration

The prior PR #316 review and its immutable source inventory remain the source basis, including its original investigation scope and stated access limitations. This implementation adds no new numerical choice. Its cgroup lifecycle, group-OOM, descendant-reaping, and descriptor assumptions fit that prior scope, so a broad new methodology survey was unnecessary.

Targeted primary pages were also opened on this review date: [Linux cgroup v2 documentation](https://docs.kernel.org/admin-guide/cgroup-v2.html), [Linux PR_SET_CHILD_SUBREAPER manual](https://man7.org/linux/man-pages/man2/PR_SET_CHILD_SUBREAPER.2const.html), and [Python 3.12 subprocess documentation](https://docs.python.org/3.12/library/subprocess.html). They corroborate the empty distribution-node constraint, recursive kill with fork-race handling, group OOM and protected-task exception, live-population versus zombie distinction, subreaper waitability, and close_fds semantics. These live corroborating pages are not substituted for the prior review's hashed snapshots and are not represented as immutable source downloads from this session.

The conclusion is implementation-level inference from those bounded source facts, code, independent controls and received CI observations. Public support registration still needs the remaining deployment and sizing evidence already named in the candidate README.

## Reproduction

The archived `.json.txt` files retain the raw JSON bytes. The scripts accept an explicit repository path and can run from this archive directory. From a detached checkout with the pinned local dependencies and runtimes:

```sh
python3 -I independent_tests.py /absolute/repository --output RESULTS.json
python3 -I entry_controls.py /absolute/repository --output ENTRY-RESULTS.json
```

The scripts require no cgroup writes and deliberately keep real cgroup tests NOT_RUN locally. CI host provisioning is a separate, dedicated-host operation. `INPUTS.json` records commit, input and result hashes; it does not elevate this review to Protocol authority.
