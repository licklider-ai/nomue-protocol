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
| Two successful contrasts with missing or duplicate third contrast                | No complete output; no positional guess                                                 |
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
