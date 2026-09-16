# Resource measurements

Final Linux capture: run `34830324114`, source `a6cddeba659ae2c52e6a7901d3e5a41102080274`.

All figures below are maxima over the explicitly listed profile corpus, not universal upper bounds. Small/Large use eight comparison cases per mode; Medium uses all 153 cases per mode. Normal means completed candidate results (including legitimate candidate gates), not that all declared values pass.

| Metric                            | Small    | Medium   | Large    |
| --------------------------------- | -------- | -------- | -------- |
| Measured invocations              | 16       | 306      | 16       |
| Completed candidate results       | 14       | 258      | 16       |
| Normal full invocation seconds    | 0.835578 | 0.911920 | 0.856101 |
| All cases full invocation seconds | 0.835578 | 6.143930 | 0.856101 |
| Ingress supervisor phase seconds  | 0.119864 | 0.141678 | 0.123976 |
| Parent preparation seconds        | 0.011018 | 0.034143 | 0.010902 |
| Worker process CPU seconds        | 0.249463 | 0.275766 | 0.254043 |
| Worker internal wall seconds      | 0.101544 | 0.124403 | 0.107156 |
| Outer cleanup seconds             | 0.072951 | 2.076812 | 0.073286 |
| Normal charged tree peak bytes    | 39923712 | 44953600 | 46317568 |
| Parent peak RSS KiB               | 24816    | 28144    | 27748    |
| Worker peak RSS KiB               | 26272    | 28144    | 27748    |
| Normal acquired raw bytes         | 106968   | 2100401  | 2100401  |
| Internal transport bytes          | 107018   | 249499   | 107018   |
| Worker structured stdout bytes    | 116537   | 116537   | 116537   |
| Rendered numerical witness bytes  | 115560   | 115560   | 115560   |
| Full report bytes                 | 117667   | 117667   | 117666   |

The worker CPU clock is process-lifetime usage; the worker internal wall clock starts after early imports/configuration/limits. They have different start points. The supervisor worker phase includes launch, transport and direct-child cleanup. Outer full wall includes container startup, report delivery and removal; do not sum nested phase maxima.

Medium passes 128 frozen complete raw Records plus the whitespace-padded normal case in both modes: 258 completed candidate results and 48 correctly refused controls. Small refuses the two padded inputs at its narrower raw cap; Large is only a comparison subset. Therefore Medium is selected by the predeclared criteria, not by inferring universal support from these maxima.

Observed full-report maximum is 117,667 bytes versus an enforced 8 MiB envelope. The maximum rendered numerical witness is 115,560 bytes; G5 also constructs a larger compact witness transiently and records its hash/size. The compact bound does not establish a full-report bound. Cgroup memory captures charged application memory, not the observer/Docker daemon or an exact sum of RSS. OOM cgroups can be gone before peak capture, which is explicitly retained as unavailable.

The largest measured cleanup exceeds two seconds slightly because two seconds configures TERM-to-KILL escalation; daemon and observer overhead remain measurable. A four-second outer timeout probe can therefore take about six seconds including cleanup. This is not reported as a violation of a hard two-second real-time guarantee, because no such guarantee is made.
