# Acceptance cases for the next complete-output experiment

These are design expectations, not executed wrapper tests or pinned Protocol
conformance. The successor experiment supplies independent numeric expectations,
source hashes and measured results before claiming coverage. Unexpected crashes
fail tests; expected refusals match stage and reason using explicit exceptions,
including under Python -O. Counts are accumulated, not hard-coded as results.

## Hand-derived ordinary witness

Use cells `[0,1]`, `[1,2]`, `[2,3]`, `[4,5]` in declared order, n=2.
Exact means are 1/2, 3/2, 5/2, 9/2; within-cell SSE is 4*(1/2)=2.

| Quantity        | A    | B   | AB  |
| --------------- | ---- | --- | --- |
| Signed estimate | 5/2  | 3/2 | 1   |
| SS              | 25/2 | 9/2 | 1/2 |
| F with df=(1,4) | 25   | 9   | 1   |

Tail encodings need an independent oracle; this table does not invent them.
Scaling every observation by a nonzero power of two, without input rounding,
scales signed estimates linearly and SS/SSE quadratically while preserving F.
That algebra does not imply equal complete-output admission after scaling.

## Required boundaries and adversarial cases

| Case                                                                             | Expected experimental behavior                                                          |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Ordinary witness above                                                           | All 13 real outputs and three df pairs accounted for; tail oracle checked independently |
| All four cells [0,1]                                                             | SSE=2, all estimates/SS/F exactly zero; all three tails exactly one                     |
| Each cell constant, with different means permitted                               | Exact SSE=0 refusal before division or tail work                                        |
| Ordinary witness scaled by 2^-600                                                | Exact SSE=2^-1199 positive, displayed zero; representation refusal, no tail work        |
| Ordinary witness scaled by 2^600                                                 | Finite observations but SSE=2^1201; finite-output refusal, no tail work                 |
| Signed estimate, SS or F nonzero but projected zero with positive displayed SSE  | Preserve exact status; compare tails against exact F, never projected zero              |
| Exact required magnitude at maximum finite, and just above it                    | Boundary admitted for projection; above boundary conservatively refused                 |
| Probability positive but displayed zero; probability below one but displayed one | Require enclosure-certified encoding; never relabel mathematical endpoints              |
| One unresolved tail after earlier resolved tails                                 | No complete output; earlier quantities diagnostic only                                  |
| A passes resource guard but B or AB fails                                        | No tail evaluation for any contrast; verify call counts                                 |
| Shape/count invalid and revision invalid together                                | Shape/count wins; no serialization                                                      |
| Revision oversized or containing non-ASCII and observations invalid              | Revision wins; no observation arithmetic                                                |
| Float subclass, nonfinite float, integer observation, ragged cells               | Explicit appropriate input refusal, not implicit conversion                             |
| Revision differs; signed input zero differs; same F from translated data         | Snapshot identities remain distinct                                                     |
| Internal invariant: missing or duplicate third contrast after two successes      | Injected construction defect fails the experiment; not a raw-input refusal              |
| Normal and optimized execution                                                   | Same decisions and counted checks; no assert-only acceptance                            |
| Whole-call timeout or memory termination                                         | Failed experiment, not valid resource-refusal evidence                                  |

For interval-carrier follow-up, add both orientations of an over-budget endpoint,
wide intervals containing the exact F, false intervals, contrast swaps and same-F
cross-input substitution. Check actual outward probability containment, not only
status. Do not claim these tests cover submitted probability evidence.

## Resource evidence to collect

Exercise all three contrasts together, seeded ordinary binary64 data as well as
short dyadic fixtures, and count/width boundaries from PR #291. Record runtime,
peak memory, admitted/refused counts, stage and exact input encodings. Include
n=65 ordinary data refusals; short dyadic successes do not establish uniform
support. Start with an isolated experimental 30-second / 256-MiB envelope; this
is a test ceiling proposal, not a supported platform or completion guarantee.
Any admitted input exceeding it blocks the wrapper experiment's bounded GO until
its admission is narrowed or a justified envelope is reviewed.

## Added representation witnesses from design review

Put `[0,2^-537]` in the first three cells and `[2^500,2^500]` in the
fourth. Writing t=2^-537 and H=2^500, all three effect SS values equal
`(H-t/2)^2/2`, which is finite and displayable. Exact SSE is
`3*2^-1075` and rounds to `2^-1073`, a positive subnormal. This is near
the minimum subnormal, not the minimum normal. All three F values equal
`(4/3)*(H/t-1/2)^2` and exceed maximum finite. Expect stage 5 F
representation refusal with no tail work. This is an intentional narrowing
relative to the rational-tail adapter; no claim that this particular large-width
input passes the adapter's resource budget is needed.

For the exact zero-rounding tie, put `[0,2^-538]` in all four cells. SSE is
`2^-1075`, exactly halfway between zero and minimum subnormal, and projects
to positive zero by even rounding. Expect stage 5 SSE representation refusal,
even though exact SSE is positive and all exact F values are zero.

| Additional case                                              | Expected behavior                                   |
| ------------------------------------------------------------ | --------------------------------------------------- |
| Finite SS and positive displayed SSE, F above maximum finite | Stage 5 F refusal before any probability evaluation |
| Exact SSE at half minimum subnormal                          | Stage 5 SSE refusal by even-zero projection         |

`check_review_witnesses.py` independently derives these two witnesses with
standard-library fractions and checks their representation boundaries. It does
not execute the proposed wrapper or establish its refusal implementation.
