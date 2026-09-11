# Exact-F to tail composition: proposed experiment and acceptance cases

2026-09-11. Preparation only; no adapter implemented or design frozen.
Read PRIMARY-REVIEW-COMMISSION.md for fixed mathematical inputs. The current
repaired checker remains restricted to the original 220 float points and is not
an adapter acceptance oracle. No new Record fields or Protocol identifiers issued.

## Target and boundary

Investigate Q_nu(F_star), where F_star is the exact ratio derived from the same
represented observations as Lane 1. Do not silently substitute Q_nu(round(F_star)).
Retain balanced complete replicated 2x2, contrasts A/B/AB, n>=2 and nu=4(n-1).
The first experiment proposes n=2..65, inherited solely as a research budget.
This is not the eventual supported domain. Inputs beyond the budget are classified
as outside this experiment, not scientifically invalid.

A local carrier needs input digest/revision, explicit factor/level and cell order,
contrast identity, n, exact df, exact SSE status, and either reduced rational F or
ordered rational [L,U]. F numerator is nonnegative and denominator positive.
Reject inconsistent bindings and exact SSE=0 before evaluation. A declaration of
positive SSE is insufficient for a raw-data end-to-end claim: bind it to the
recomputed upstream witness. Carrier syntax and digest canonicalization remain
local design questions; do not imply existing Record admission from an array API.

For interval input, compute an outward lower probability bound at U and upper
probability bound at L. For a point rational, compute the same exact transform
without a float conversion. Preserve upstream interval width and tail error as
separate evidence. Rounding is determined only after composition; unresolved
precision/resource budgets produce no guessed result. Exact positive values
rounded to zero, exact zero, and finite values beyond binary64 maximum remain
distinct. Internal rational success does not satisfy finite public-output obligations.

Proposed experiment limits: at most 6,500 bits per rational component and root
precision attempts 128, 256, 512 (bounded list). Confirm suitability before coding;
these are conservative experiment guards, not an established resource theorem.
Oracle iteration exhaustion remains explicit. Do not claim every admitted budget
tuple resolves. Decide the numeric target and acceptance cases before implementation.

## Acceptance matrix to implement with the adapter

| Case                                         | Required outcome / independent expectation                                                                       |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Existing fixed float points                  | Exact embedding as rational reproduces original 220 rounded outputs within original count budget                 |
| Rational F=0, positive SSE                   | Q=1 exactly; does not equate to exact SSE=0                                                                      |
| n=4, F=4                                     | Exact tail 35995/524288 from the separately hand-integrated witness                                              |
| Non-dyadic positive rational F               | Bracket with a separate exact-rational oracle or proved integration bounds, never rounded-F output as sole truth |
| Point interval [F,F]                         | Equivalent to point-rational route                                                                               |
| Ordered [L,U] spanning zero                  | Q(U) <= Q(F) <= 1; no global derivative bound at zero                                                            |
| Positive F that rounds to zero               | Preserve positive mathematical F; do not infer exact Q=1                                                         |
| Finite F beyond float maximum                | Preserve finite rational; no infinity substitution; resolve or explicitly stop by budget                         |
| Exact SSE=0 / rounded-zero positive SSE      | Stop only for the exact-zero case; retain upstream evidence distinction                                          |
| Contrast/digest/df mismatch                  | Reject before tail computation; test swaps even when numeric F coincides                                         |
| Bad rational/order/type or exceeded budget   | Deterministic local failure with no numeric output                                                               |
| Precision exhaustion / midpoint ambiguity    | Unresolved result; never select an endpoint or relax tolerance                                                   |
| Wider input interval                         | Outward evidence still encloses the target; may lose unique rounding                                             |
| Widened or falsified submitted tail evidence | Independent oracle plus fixed-recomputation containment; include PR 283 O2                                       |

Do not use the adapter to generate all its own expected values. Retain a separately
coded oracle, exact rational witnesses, input binding mutations and rounding-cell
boundary cases. A fixed-enclosure checker may reject a tighter mathematically valid
interval: such a rejection is contract nonconformance, not proof of false mathematics.

## Execution order and review stop

First close the repaired checker's bounded review. Primary review and carrier/test
planning can proceed in parallel. A disposable adapter experiment may proceed with
unresolved research items clearly marked, but no supported implementation or design
freeze precedes the applicable research gate. After the first complete adapter and
its evidence, obtain external adversarial review before selecting a support domain.
Review the mathematical target, bindings, error transport and refusal behavior
jointly. Record all receipts and dispositions. R3/Holm preparation may proceed
separately; R2 implementation remains later in the agreed priority order.

## First experiment acceptance-row update

Row 14 (widened or falsified submitted tail evidence, including PR #283 O2) is
**DEFERRED** in the first adapter experiment and its bdc2cc4 repair. See
[the adapter report](../rational-tail-composition-20260911/REPORT.md). There is no
submitted probability-evidence entry point; checks of upstream F intervals do
not implement this acceptance row. No interface freeze is claimed.
