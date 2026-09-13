# Validation and evidence boundaries

Local capture completed 2026-09-13 UTC on Linux x86_64, CPython 3.12.14,
Node 24.19.0 and pnpm 11.19.0 (package launcher declaration 11.7.0).

| Evidence                 | Observed result                                                  |
| ------------------------ | ---------------------------------------------------------------- |
| EXECUTION.json           | 67 checks passed                                                 |
| EXECUTION-OPTIMIZED.json | Same 67 check names passed; optimized parent, fixed normal child |
| ADMISSION.json           | 320 rows; independent admission inequality agrees for every row  |
| BENCHMARKS.json          | Seven controlled calls; expected complete/refused dispositions   |
| Source identity          | Seven inherited files equal the pinned historical commit bytes   |
| Repository checks        | Markdown lint 605 files, typecheck and direct validator passed   |

The five seeded preflights per count all pass through n=46. At n=47 one of
five passes; at n=48..65 none of these five samples passes. A separate n=65
zero-contrast example completes, demonstrating that the boundary is data dependent.
Selected ordinary calls at n=2/32/45/46 complete; n=47/65 seed-zero calls refuse.
Largest observed benchmark wall interval is 1.347 seconds on this host.
These probes do not force the full precision schedule or establish its worst case;
the historical roughly 15-second combined stress observation remains separate.

Author checks exercise actual OS CPU/address-space limits, wall timeout,
SIGTERM cancellation, pipe overflow, abnormal exit, bounded output, source drift,
identity mismatch and partial-result suppression. Separate-formula witnesses fix
SSE=2, F=(0,0,0), p=(1,1,1), and F=(25,9,1) before candidate execution.

Normal and optimized parent runs are saved separately. The production child
command deliberately uses a fixed non-optimized interpreter invocation in both;
these are not two independent child builds or a claim to test optimized child
execution. Historical normal/optimized numerical suites provide their own evidence.

The 320-row admission probe tests all three F values, with an independently
written integer-inequality ceiling. It does not run probability tails. Benchmarks
then execute selected accepted/refused inputs through the actual worker.
Seeded synthetic admission is not a scientific or user-population success rate.

The runtime manifest binds unchanged numerical files plus the new execution and
transport files. Tests reject a corrupted copied dependency. No tests regenerate
the manifest. The trusted manifest, loaders, stdlib and interpreter remain the
trust root; no hostile filesystem or runtime compromise is claimed to be solved.

Repository formatting, Markdown lint, typecheck and validation are run after
evidence capture. This change is informative and does not modify authoritative
artifacts. Exact-head GitHub CI is checked separately and recorded in the PR.
Saved local outputs are author observations, not an independent review.

The aggregate local `pnpm check` reached the tsx CLI IPC `listen EPERM` restriction
after formatting, Markdown lint and typecheck. Direct `node --import tsx` repository
validation passed. Full aggregate checks are delegated to actual GitHub CI, not
reported as a local aggregate pass. The later cancellation-during-launch repair
has 67 checks and supersedes the initial 66-check checkpoint.
