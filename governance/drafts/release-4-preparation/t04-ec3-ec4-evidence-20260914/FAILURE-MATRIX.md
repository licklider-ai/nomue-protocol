# Failure and cleanup matrix

Actual Linux process controls in both normal and optimized modes. Every row has no delivered numerical result; all containers end stopped with PID 0 and empty/gone cgroup membership.

| Case                       | Actual cause (both modes)    | Maximum full wall seconds | Maximum cleanup seconds | Direct worker exit codes |
| -------------------------- | ---------------------------- | ------------------------- | ----------------------- | ------------------------ |
| control-cleanup-escalation | full_invocation_deadline     | 6.135572                  | 2.076264                | not available            |
| control-cpu                | worker:cpu_limit             | 1.723876                  | 0.079073                | -24                      |
| control-crash              | worker:abnormal_exit         | 0.779099                  | 0.078935                | 23                       |
| control-descendant         | worker:deadline              | 1.615114                  | 0.079733                | -9                       |
| control-escaped-descendant | worker:deadline              | 1.592245                  | 0.071743                | -9                       |
| control-malformed          | worker:invalid_worker_output | 0.731914                  | 0.072520                | 0                        |
| control-memory             | worker:allocation_failure    | 0.788093                  | 0.072706                | 71                       |
| control-parent-timeout     | full_invocation_deadline     | 6.143930                  | 2.076673                | not available            |
| control-partial            | complete ordered output      | 0.770533                  | 0.071681                | 0                        |
| control-report-cap         | full report bound            | 0.782381                  | 0.071193                | 0                        |
| control-report-timeout     | full_invocation_deadline     | 6.131935                  | 2.076812                | not available            |
| control-stderr             | worker:output_overflow       | 0.728356                  | 0.069510                | -9                       |
| control-stdout             | worker:output_overflow       | 0.722714                  | 0.072713                | -9                       |
| control-timeout            | worker:deadline              | 1.559347                  | 0.070345                | -9                       |
| control-transport          | internal transport bound     | 0.547762                  | 0.073942                | not available            |
| control-tree-memory        | tree_memory_limit            | 0.523589                  | 0.027042                | not available            |
| control-wrong-identity     | candidate binding            | 0.775851                  | 0.074034                | 0                        |
| depth                      | strict ingress refused       | 0.500009                  | 0.074104                | not available            |
| duplicate-member           | strict ingress refused       | 0.494012                  | 0.069549                | not available            |
| malformed-raw              | strict ingress refused       | 0.493987                  | 0.071639                | not available            |
| negative-zero              | strict ingress refused       | 0.504265                  | 0.072938                | not available            |
| nonfinite                  | strict ingress refused       | 0.504319                  | 0.075068                | not available            |
| raw-oversize               | raw bound                    | 0.443490                  | 0.070893                | not available            |
| unpaired-surrogate         | strict ingress refused       | 0.486580                  | 0.068236                | not available            |

The cgroup OOM probe records `OOMKilled=true` and container exit 137; worker RLIMIT_AS exhaustion instead records allocation failure/exit71. The escaped-session probe leaves a second process visible in the container cgroup before outer cleanup, then none afterwards. Direct process-group cleanup and whole-container cleanup are separate evidence.

Seven final-delivery receipt-fault checks per mode also establish that an already-computed report is discarded when cleanup confirmation fails. This is explicitly a controlled receipt failure, not a measurement of an unkillable kernel task. An actual cleanup failure stops the suite, quarantines the prior report hash and exposes no completed numerical result.

Four outer-killed cases per mode have no parent report and therefore no returned optimization flag. No flag is invented for them. Other parent receipts carry measured `sys.flags.optimize=0/1`; successfully completed research workers also return and validate their own flag. The historical production worker remains normal-mode by unchanged source.

## F-01 supplement

The matrix above is the unchanged historical Linux capture; it did not exercise
report/failure races. [F01-CONTROLS.json](F01-CONTROLS.json) adds 34 deterministic
cases per mode, including three deadline/report orders, OOM/CPU/crash with a valid
report, malformed reports and cleanup precedence. Established execution failure
always suppresses the numerical result, even after successful cleanup. These are
control-flow tests, not additional resource measurements; see [F01-REPAIR.md](F01-REPAIR.md).
