# Bounded design review handoff

Review this packet's published fixed commit and tree. Record actual reviewer and
model identity when available, prior involvement, inspected inputs and limits.
The author used OpenAI Codex in the continuing preparation context. This packet
has no independent review yet and changes no existing numerical implementation.

Focus on whether the consumer checks exactly the stated claim:

1. Does the independently supplied expected input remain authoritative, with
   full contrast/df/revision/digest binding and no submitter-chosen computation?
2. Does acceptance imply containment of the recomputed enclosure and one rounded
   encoding, while a tighter valid interval can still be conservatively rejected?
3. Can malformed objects, huge rational operands or later invalid rows bypass
   bounded validation, trigger premature tail work or yield partial acceptance?
4. Are runtime candidate evidence, independent test oracle, and source/runtime
   assumptions separated without an overall scientific-validity claim?
5. Do the proposed size caps and one full recomputation create a measurable,
   bounded next experiment rather than an unmeasured execution guarantee?

The 262144-bit endpoint cap and primitive in-memory structure are proposed
engineering choices. They are not a public schema or evidence that all possible
candidate outputs fit. Challenge those choices with concrete counterexamples;
no blanket second source investigation is needed for unchanged rounding algebra.

The next bounded step is design review intake and minimal repairs, followed by a
small consumer experiment with O2, wider/tighter intervals, malformed input,
identity substitution and full-call resource probes. Refactoring the wrapper's
input/identity helpers needs regression evidence preserving its fixed decisions.
The new consumer then gets one bounded implementation review. Keep earlier
complete-output evidence intact and avoid reopening resolved work without a
specific changed claim or defect. No merge, official registration or release.

## Author validation scope

The author inspected the fixed historical O2 construction and repaired checker
report. Direct fraction arithmetic checked the raw O2 witness and illustrative
predicate intervals. These are author-side design checks, not consumer execution
or independent review. Prettier, Markdown lint (407 files), repository validation through the Node
import loader and staged whitespace checks passed. Their outcomes do not
establish a numerical supported domain.

## External design review receipt

A user-supplied bounded adversarial design review of commit
`d53030585b3e55f8d8dce431a6023d51ff9c06f1` found no BLOCKER. Reviewer/model
identity and raw artifacts were not supplied; the receipt is attributed to the
user. The repair was prepared in that reviewer's session on 2026-09-11, not by
the original author context, and is not an independent close review of itself.

Reported checks against the pinned PR #295 modules: the raw-input O2 cells
reproduce SSE=2, A estimate 1, SS_A=2, F_A=4, df (1,4) with zero B/AB effects
and an A tail resolved at 128 bits; the 400-bit witness lies inside the oracle's
256-bit interval, below its 384-bit lower bound, shares the target encoding and
is refused by containment; the exact enclosure is accepted and [0,1] is refused
by encoding; all four predicate toys behave as stated; the same candidate at
512 bits nests strictly inside the 128-bit enclosure and is refused
conservatively; frontier endpoint components reach at most 161,297 bits against
the 262,144-bit cap.

| Finding                                                                                                                                | Repair                                                                                                             |
| -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| The cap had no measured producer evidence, which REVIEW requested                                                                      | Frontier endpoint sizes and cap-scale gcd/comparison cost recorded in DESIGN as reviewer observation; script added |
| The tighter-valid case was described only for an independent producer, although the same candidate at higher precision is also refused | ACCEPTANCE row added; the witness script demonstrates the nesting and refusal                                      |
| The third acceptance condition reads as independent although the first two imply it                                                    | DESIGN states the implication and keeps the check as defensive                                                     |
| The O2 witness must be submitted in reduced form under the proposed endpoint rule                                                      | ACCEPTANCE says so                                                                                                 |

Repair validation: `check_design_witnesses.py` passed with normal Python and
`python -O`; it imports the sibling wrapper packet, whose dependency hash and
origin checks run on import. No consumer was implemented and no numerical
source, wrapper evidence or gate state changed.
