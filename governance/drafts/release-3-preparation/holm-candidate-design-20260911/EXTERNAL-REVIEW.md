# Bounded design adversarial review receipt

The user supplied a design-only review of PR #290 at
`9bfddcc773e70a2d38db4bc39677935cfadcd726`. Reported verdict: no BLOCKER,
three SHOULD-FIX findings and two optional observations. The reported original
CI passed five jobs. Reviewer/model identity and raw execution artifacts were
not supplied; these results are attributed to that receipt rather than treated
as authenticated separate-model B-2 completion. The response was prepared with
OpenAI Codex in the continuing author context on 2026-09-11.

Reported checks: 11 acceptance rows; 400 small families against closed-testing
Bonferroni and exact step-down; alpha=1 counterexample; both midpoint directions;
20,000 projection samples including binade carry and A=U; decoded boundary values
and bit ceilings; original-source inclusivity and four referenced commits.
These counts are external testimony, not manager-executed result counters.

| Finding                                             | Response                                                                                                                                                                   |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Exact alpha versus binary64 0.05 ambiguous          | DESIGN specifies integer numerator/denominator and explicitly distinguishes float 0.05 from 1/20; the candidate still has no alpha input                                   |
| Missing early-cap and exact-value collision vectors | ACCEPTANCE adds (3/4,1/2), its decreasing products after the cap, and the concrete E/E' collision with expected substitution refusal                                       |
| Label case and normalization unclear                | DESIGN specifies case-sensitive exact ASCII bytes, no normalization; ACCEPTANCE includes A/a and duplicate A                                                               |
| Mandated manual mergesort too specific              | Standard runtime sorting is preferred; deterministic keys and comparison budgets remain, with explicit experiment refusal on exhaustion; no handwritten algorithm required |
| Harness budget much looser than observed arithmetic | Retain the 10-second/256-MiB exploratory process budget; external millisecond observations are not a worst-case output-construction or platform proof                      |

This is a small design repair. No numerical candidate, normative surface,
source acceptance or gate state changes. IEEE clause review and actual B-2
investigator provenance remain separate conditions. Subsequent implementation
needs its own maximum-size and evidence-substitution tests. Do not reopen the
whole Holm source survey for these wording and vector changes.
