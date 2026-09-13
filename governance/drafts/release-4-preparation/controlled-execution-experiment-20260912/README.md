# R4 output and controlled-execution experiment

Unissued, informative engineering candidate. Baseline:
`4a62f8e1768049560cb0ce8f09ef1676cb42130b`. No supported Protocol behavior,
formal policy selection, public identifier, Research Gate closure or release.

The preceding in-memory experiments produced complete results and checked
submitted probability evidence, but their measured timing did not establish an
execution contract. This packet adds a closed output proposal and a bounded
single-worker execution experiment around the unchanged numerical sources.

## Milestones

| Milestone | Deliverable                                                                | Disposition                                                                    |
| --------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| M1        | Integrated output, representation, admission and review map                | Concrete candidate in [POLICY.md](POLICY.md); author review, not formal freeze |
| M2        | Actual execution limits, cleanup, output validation and admission evidence | Executable candidate; see [VALIDATION.md](VALIDATION.md) and test results      |
| M3        | Raw Record, declarations, versioned schemas/checks and report integration  | Next bounded engineering packet; [COUPLING.md](COUPLING.md)                    |
| M4        | Exact final candidate research/implementation review and dispositions      | Open; inherited reviews cover only their pinned scopes                         |
| M5        | Coordinated authoritative adoption                                         | Open; RFC impact and steward decision required                                 |
| M6        | Candidate freeze and release                                               | Open; no automatic adoption at window expiry                                   |

R3 takes priority at a collision. PR #330 was observed in progress before this
work. Only this R4 directory and a dedicated R4 workflow are changed. R3 files,
shared registries, schemas, reference runtime, dependencies, generated views,
historical experiments and fixed reviews are preserved. No concurrent branch is
moved. Future common integration takes the accepted R3 changes first.

## Reproduce

On Linux x86_64 with CPython 3.12.14, from this directory:

```sh
python3 test_execution.py
python3 -O test_execution.py
python3 admission.py
python3 benchmark.py
```

Commands print observations and do not overwrite saved evidence or repin files.
`pin_inputs.py` is an author-only operation, never part of validation. Numerical
files are read from the preceding packet after SHA-256 checks in both parent
and child. This avoids duplicating or modifying the prior candidate.

The synchronous Python entry is `supervisor.run(cells, revision, submitted=None)`.
It accepts builtin in-memory values, not Record JSON. The generated internal
transport is not a replacement for `parseStrictJson`, JCS or Record integrity.
No command, precision, timeout, file path or code is selected by input data.

## Execution boundary

One fresh trusted Python worker receives a 256 MiB hard address-space limit,
25-second soft / 26-second hard CPU limits, a 30-second parent wall deadline,
disabled core dumps, and capped output. Input serialization, launch, pipe IO and
worker execution count toward the observed wall interval. The supervisor kills
the process group and reaps the worker before exposing a result; cleanup has its
own two-second wait. Process creation, OS scheduling and an unkillable kernel
task preclude a universal hard latency guarantee.

The numerical worker is single-process and creates no children. RLIMIT_AS is
virtual address space of that worker, not RSS or total process-tree memory.
Supervisor memory, concurrent calls and caller allocation are outside that limit.
Group cleanup is not cgroup enforcement; a malicious child that escapes the group
is outside this trusted-code experiment. SIGINT/SIGTERM cleanup is exercised;
SIGKILL of the supervisor and host failure remain outside the claim.

The host guard deliberately refuses other environments before numerical imports.
Passing the guard is experimental eligibility, not established support. Kernel,
interpreter binary hash and actual limit readback accompany completed workers.
No writable cgroup is available in the author environment; no cgroup or aggregate
memory measurement is claimed.

## Provenance and review boundary

Prepared with OpenAI Codex in the continuing author conversation, with prior
conversation summaries and repository records available. Self-review is not an
independent investigator or separate-model primary-source review. The numerical
and IEEE reviews are reused with the limits in [POLICY.md](POLICY.md). No new
PDF acquisition or primary-source inspection is asserted. Formal promotion
requires the applicable RFC Research Gate and changed-implementation review.

The public window remains at its recorded earliest unchanged-scope decision,
2026-10-09T05:59:47Z in [discussion #261](https://github.com/licklider-ai/nomue-protocol/issues/261).
