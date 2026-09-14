# Candidate profile families and parameter rationale

All values are unissued research reference parameters. None defines public
J-cost(B,S-C), B, Z-B, S-C, a check tolerance, or a standalone public n ceiling.

| Parameter                       | Historical starting point                                      | Small                                 | Medium  | Large    | Basis beyond an observed maximum                                                                                                       |
| ------------------------------- | -------------------------------------------------------------- | ------------------------------------- | ------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Worker CPU soft/hard            | 25/26 s                                                        | 10/11 s                               | 25/26 s | 50/51 s  | Per-worker runaway bound; comparison spans half/double engineering budget; wall can win first                                          |
| Full invocation wall            | Historical worker 30 s only                                    | 15 s                                  | 30 s    | 60 s     | Includes raw, parent and report; prevents per-phase timers from silently multiplying total exposure                                    |
| Cleanup                         | Direct child 2 s                                               | Same child limit; outer TERM/KILL 2 s | Same    | Same     | Separate 12 s daemon-call timeout and measured latency; no hard real-time promise                                                      |
| Worker address space            | 256 MiB                                                        | 128 MiB                               | 256 MiB | 512 MiB  | Whole virtual process, not only numerical arrays; actual allocation-pressure control                                                   |
| Container memory                | No historical tree bound                                       | 128 MiB                               | 512 MiB | 1024 MiB | Includes parent plus Node or Python child, serialization/copy overlap, imports and cache; kernel-enforced irrespective of corpus speed |
| Node old space                  | Existing heap checkpoint 512 MiB                               | 64 MiB                                | 128 MiB | 256 MiB  | Additional runtime heap component bound; checkpoint kept; not a total-process guarantee                                                |
| Raw input                       | 5 MiB existing SEC input; historical worker had no raw ingress | 1 MiB                                 | 5 MiB   | 5 MiB    | Medium/Large preserve the existing documented raw size allowance; Small exposes reduced-reference-envelope effect                      |
| Internal transport              | Historical 1 MiB                                               | 2 MiB                                 | 8 MiB   | 16 MiB   | Separately bounds compact parsed transport, metadata and bounded escape expansion; inputs exceeding it are reference refusals          |
| Structured worker stdout/result | 2 MiB                                                          | 1 MiB                                 | 4 MiB   | 16 MiB   | Dedicated bounded buffer; exact witness and JSON rendering are different budgets                                                       |
| Worker stderr                   | 64 KiB                                                         | 64 KiB                                | 64 KiB  | 64 KiB   | Diagnostics are not numerical evidence; nonempty/error/overflow refused                                                                |
| Full report/evidence            | No G5 full report bound                                        | 2 MiB                                 | 8 MiB   | 32 MiB   | Independent envelope for result plus receipts; checked serialized bytes, tree cap during construction, bounded failure fallback        |
| Tasks / CPU rate                | No historical tree claim                                       | 32 tasks / 2 CPUs                     | Same    | Same     | Bounds process fan-out and rate; neither is public numerical semantics                                                                 |

## Constructive and empirical boundaries

The exact fixed numerical procedure already supplies its own finite work/witness
bounds under B; this packet does not recalculate or replace those proofs. A bounded
compact witness does not imply that every JSON representation fits a reference
stdout or report cap. The profile explicitly refuses oversized transports/results.
It makes no claim that 8 MiB covers every mathematically eligible Record/report.

Input and output byte caps are constructive service envelopes. Worker address
space and cgroup memory cap attempted allocations even outside the tested corpus.
Wall and CPU caps limit exposure; increasing them cannot turn an execution failure
into a scientific or numerical conclusion. Time allowances are operational
research candidates, not deductions from floating-point statistics or from B.

The empirical role is to establish that the required finite corpus completes with
headroom, and actual abnormal processes are contained. Selection uses the criteria
recorded before measurement in README: retain the existing 5 MiB raw allowance,
cover the frozen normal corpus and pass controls, choosing the smallest qualifying
family. No `max observed x arbitrary multiplier` is used as the sole justification.
Unvalidated public members remain a validation/resource-profile gap even if the
chosen family has large observed headroom.

Failure probes use one-second worker wall/CPU controls or a four-second outer
watchdog to reach the same mechanisms safely; the effective limits are recorded
per invocation. Nominal normal-profile values are separately measured on normal
cases. A shortened-probe success is not described as waiting out every nominal
25/30-second boundary.
