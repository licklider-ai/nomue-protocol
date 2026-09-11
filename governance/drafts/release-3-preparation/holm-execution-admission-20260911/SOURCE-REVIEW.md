# Cold-cache admission measurement: primary-source review

Date: 2026-09-11. Scope: a disposable Linux test VM and the existing trusted
Holm execution candidate. This is informative research, not a public resource
contract, deployment certification, or Release 3 adoption decision.

## Investigator and independence

A separate OpenAI-assisted investigator context performed this source pass at the
coordinator's request under the repository Research Gate. The investigator did not
author the proposed measurement implementation and made no repository changes.
The context inherits the same model family, tools, and visible project history;
this is not a different-provider or human review. It is independent source
inspection, not an independent kernel experiment. No local cache reset or cgroup
mutation was attempted. The local cgroup mount is read-only.

## Primary evidence

Retrieved source-byte hashes and repository input identities are listed in
INPUTS.json. Five source files were downloaded; vmstat.c was inspected through
web retrieval only, with its unavailable exact-byte hash explicitly recorded.
Full upstream sources are scratch acquisitions only and are not redistributed
in the repository; the durable record retains URLs and available byte hashes. Linux v6.17 upstream source is the pinned explanatory
baseline, not a claim that every vendor kernel is byte-identical. Current kernel
web documentation was also checked for the drop-caches semantics; source-code
claims below are scoped to the pinned upstream version.

| Source and locator                                                                                                                                  | Established fact                                                                                                                                                                                                                                             | Measurement consequence                                                                                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [vm.rst](https://raw.githubusercontent.com/torvalds/linux/v6.17/Documentation/admin-guide/sysctl/vm.rst), `drop_caches`                             | Value 3 requests clean page-cache and reclaimable slab reclamation; dirty objects remain. A preceding sync increases eligible objects. The operation may impose substantial I/O and CPU cost.                                                                | Use only the explicitly authorized disposable test VM. This is a Linux cache-reset request, not physical disk, hypervisor, controller, or CPU-cache reset.                                           |
| [drop_caches.c](https://raw.githubusercontent.com/torvalds/linux/v6.17/fs/drop_caches.c), handler and sysctl table                                  | The handler iterates superblocks, invalidates mappings, drops slab, and increments DROP_PAGECACHE and DROP_SLAB. The exposed file has mode 0200.                                                                                                             | Record successful writing and corresponding vmstat event deltas. Reading back 3 is neither necessary nor an eviction proof; the interface is write-only in this version.                             |
| [truncate.c](https://raw.githubusercontent.com/torvalds/linux/v6.17/mm/truncate.c), `invalidate_mapping_pages` and `mapping_evict_folio`            | This path removes eligible clean, unmapped, unlocked pages; busy/mapped or dirty pages can remain.                                                                                                                                                           | Even a successful request does not establish that every runtime byte is absent from RAM.                                                                                                             |
| [mincore.c](https://raw.githubusercontent.com/torvalds/linux/v6.17/mm/mincore.c), `can_do_mincore`, `do_mincore`, syscall comments                  | File-residency disclosure requires ownership/capability or write permission; otherwise the vector can be synthetic all-ones. Results can already be stale when returned. The unmapped-range path inspects existing cache rather than faulting file contents. | Use an owned regular-file sentinel and a nonfaulting mapping. State that observations cover that file at that instant. Do not fault, read, hash, or populate the mapping during the observation.     |
| [cgroup-v2.rst](https://raw.githubusercontent.com/torvalds/linux/v6.17/Documentation/admin-guide/cgroup-v2.rst), Memory Ownership and `memory.peak` | Instantiated memory stays charged until released; moving a process does not move old charges. Shared use can belong to another cgroup. Peak covers a cgroup and descendants since creation or the applicable descriptor reset.                               | Join the supervisor branch before exec, use a fresh ancestor per trial, and preserve ancestor and call-leaf peaks separately. Neither is total physical RAM attributable to all shared dependencies. |
| [vmstat.c](https://raw.githubusercontent.com/torvalds/linux/v6.17/mm/vmstat.c), event-name table                                                    | Exposes `drop_pagecache` and `drop_slab` event names.                                                                                                                                                                                                        | Deltas confirm handler events, not bytes reclaimed. Missing counters make this observation unavailable rather than implicitly successful.                                                            |

## Existing candidate inspection

The inspected supervisor's `supported()` function hashes all 41 runtime entries
before its own move into `D/supervisor`. Later `run()` hashes the Node and Python
executables before launching the bootstrap and Node entry. These reads deliberately
warm files before the call leaf executes. A cache reset before an unchanged
supervisor therefore cannot support a claim that the call leaf starts with cold
runtime files. Moving the entire supervisor into its branch before exec makes this
preflight activity part of the measured invocation hierarchy without bypassing
integrity checks. The existing call limit still governs the leaf only.

## Recommended bounded procedure

The coordinator's revised full-invocation design is supported with these limits:

1. Before trials, prepare and hash immutable inputs, runtime identities, and
   generated cases. Record kernel, filesystem, available controllers, ancestor
   limits, VM runner identity, and the explicit disposable-host opt-in. Do not run
   this global operation on a shared/self-hosted machine merely because it has sudo.
2. Use an external cleanup owner and a fresh empty `D`, `D/supervisor`, and
   `D/calls` for every trial. Keep the external measurement program outside D.
3. For each reset trial, sync, write 3, and record the two event deltas. An optional
   4 MiB owned, fully written regular-file sentinel can establish observed eviction:
   confirm residency beforehand; unmap any touched mapping before resetting;
   inspect afterward through a new nonfaulted mapping; retain both vectors/counts.
   A resident remainder means that sentinel did not meet the chosen eviction gate.
4. Launch through a minimal child that joins `D/supervisor` before exec of the
   stock supervisor. Keep hashing, environment isolation, deadlines, limits,
   refusal ordering, and unconditional cleanup unchanged. Retain the stock receipt
   and the external elapsed interval, which also includes interpreter startup.
5. Read the ancestor peak before removing D; retain the stock call-leaf peak and
   enforcement counters. Never add independently timed peaks together or subtract
   them to claim an exact supervisor peak.
6. Follow each reset run with a fresh-process, fresh-D repeat without another reset.
   Use identical inputs and limits. Predeclare the cases and repetitions; retain
   failed trials. Four or five cases with three pairs provide bounded observations,
   not statistical population coverage or a universal maximum.

## Interpretation and residual conditions

Recommended label: **paired full-invocation admission measurements after a Linux
cache-reset request, with the stock integrity preflight retained**.

A passing run establishes completion for that recorded input, environment, and
policy. An observed maximum is a measurement, not a proven worst-case bound.
Unrelated VM activity can repopulate caches between reset and launch. Active
interpreter/shared-library mappings can remain resident. Allocations made by the
launcher before it joins D retain their earlier ownership. Warm-repeat peaks can
reflect existing shared-cache ownership outside the new D, so their difference
from reset peaks is not a measurement of physical-memory savings.

The sentinel does not certify all runtime pages, dentries, or inodes. Preserved
bytecode files, storage caches, and CPU caches are not erased by this procedure.
A new process rules out reuse of the previous process's live interpreter state;
it does not erase on-disk compiled caches. No acceptance claim should exceed the
actual stock invocation boundary. Failure or missing evidence stays explicit.

Conclusion: **SUPPORTED_FOR_BOUNDED_RESEARCH_MEASUREMENT** for the revised plan.
This does not close production concurrency, crash recovery, whole-service memory
budgeting, public refusal mapping, or a universal cold-start admission guarantee.
