# R4 T04 G4 working budget and practical domain evidence

Status: WORKING BUDGET — PENDING G5 AND EC1/EC2 CLOSE REVIEW.
Scope is G4 only. No G5 integration, EC1/EC2 closure, EC3/EC4, T05 or public
policy adoption is performed. No separate G4 independent review is added.

## 1. Executive decision and evidence index

Select Medium, exact budget **52969003320369754284032**, as the G5 working
budget for J-cost(B,S-C), Z-B and S-C. This is the smallest tested budget meeting
the preselection engineering criteria and the limited feasibility checks.
The budget is a version constant expressed with exact integer arithmetic,
not a Record-supplied number, observed CPU threshold or new Protocol identifier.

- [PLAN.md](PLAN.md): criterion and three-tier design saved before comparison.
- [COST-DEFINITION.json](COST-DEFINITION.json): unchanged reviewed cost definition.
- [DECISION.md](DECISION.md): exact G5 admission predicate and decision boundary.
- [RESULTS.jsonl](RESULTS.jsonl): deterministic corpus, per-input costs/gates,
  group distributions, budgets, monotonicity and 12 additional frontier probes.
- [REFERENCE-OBSERVATIONS.json](REFERENCE-OBSERVATIONS.json): 120 isolated
  process observations, explicitly separate from public membership.
- [ANALYSIS.jsonl](ANALYSIS.jsonl): reproducible fixed-capture analysis/selection.
- [MANIFEST.json](MANIFEST.json): input, implementation, environment and hashes.
- [check_evidence.py](check_evidence.py), [measure_reference.py](measure_reference.py),
  [analyze_results.py](analyze_results.py), [verify_artifacts.py](verify_artifacts.py).

## 2. Fixed cost and authority boundary

Direct base is `225eca96d485978ee01cbe08d535387900252bca`, with architecture
`cd9d780ac06a3b998ff5d4717429b0177a222fe8`. The commissioning user supplies the
G1-G3 independent Research Gate GO (zero BLOCKER/SHOULD-FIX) and subsequent
Level 2 working selection. No reviewer identity or additional source inspection
is invented. The supplied disposition updates the working status; historical
G1-G3 documents remain untouched with their original pending-review wording.

The fixed cost file SHA-256 is
`f1eb1fd866d3a48589c3e7d37b3536f700e4d5271f9a85834fa3575f034512d2`.
It uses the reviewed `cost(n,widths)['S_C']` expression and constants unchanged.
A separately expressed producer-side calculation is checked against that
source on every F-defined corpus row and mixed-width/extreme-count controls.

The ledger covers input scan, lattice decode/counts, cell sums/squares,
means, deviations/residual construction, contrasts, SSE/SS/F, reductions,
14 non-tail real projections, three exact-sign tails and boundary searches,
22 mandatory comparisons, aggregation and bounded numerical evidence.
Cpre already includes non-tail decisions, and evidence/aggregation includes
fixed per-quantity state slots. There is no uncharged mandatory numerical
stage identified within the reviewed G5 architecture. Actual report encoding,
raw JSON parsing, host confinement and arbitrary diagnostic text are not
silently added to this mathematical bound; G5 checks the final numerical
representation against the reviewed envelope, with other boundaries remaining
in their own scope.

The definition charges all three tails even if F=0 or equal. No historical
precision stages, measured CPU/wall, Python allocation/heap, OS scheduling,
startup time or machine speed enter it. Mathematical C is deterministic,
implementation-independent and reproducible using exact integers.

## 3. Budgets anchored to corpus transitions

All values are exact charged integers. The count tiers are declared engineering
investigation scales, not a supposed business demand distribution.

| Candidate |                          B | Anchor attaining B    | Ordinary admitted |
| --------- | -------------------------: | --------------------- | ----------------: |
| Small     |      222617084076037578752 | ordinary_decimal_n32  |             23/36 |
| Medium    |    52969003320369754284032 | ordinary_decimal_n128 |             31/36 |
| Large     | 13135451923827700234756096 | ordinary_decimal_n512 |             36/36 |

Each is the maximum cost over all four ordinary generators through its stated
count tier. Tests verify anchor admission at B and cost refusal at B-1.
These are observed symbolic transitions, not round numerical guesses or
budgets derived from reference execution speed. The cost definition was fixed
before generating/comparing these candidates and was not revised afterward.

## 4. Corpus and provenance

The main corpus has 129 cases, kept in distinct groups:

- Ordinary: 36 raw-observation cases, four deterministic generators at
  n=2,3,8,16,32,64,128,256,512. They include shared zero effects, moderate
  dyadic effects, fixed decimal binary64 values and small contrasts.
- Dynamic range: 24 raw cases at n=2,16,64,256, with dyadic rescalings by
  2^-400, 2^-20, 2^20 and 2^400, mixed exponents -200/0/200 and extreme finite
  values. These include deliberately unrepresentable result controls.
- Cancellation: 20 raw cases at n=2,8,32,128,512, with large common offsets,
  tiny contrasts, tiny residuals and cancellation-heavy moments.
- Raw boundaries: seven observation arrays inherited by exact provenance from
  the G1-G3 corpus, including SSE zero, SSE rounding to zero and real positive
  tail underflow. They remain arrays, not complete schema-conformant Records.
- Synthetic tails: 42 inherited mathematical F/tail cases, including F=0,
  tiny/moderate/huge finite F, p near one, ordinary exact rounding ties and
  both sides of normal/subnormal and zero/subnormal boundaries. Their costs
  model three equal tails, with no claim that a full raw input realizes them.

Raw generator recipes, exact inherited hexadecimal values and per-array hashes
are saved. Each raw exact arithmetic result is cross-checked between moment
and direct residual constructions. No large random sample or real-world
population distribution is claimed. Corpus recipes intentionally oversample
boundaries and pathological cases.

Five separate abstract 22-slot controls cover all pass, one mismatch, multiple
mismatches, representation refusal and dependency not_run. They do not add
five full Records to the admission denominator or implement G5's final report.
Twelve additional symbolic frontier probes explore each budget at count/width
corners; these also remain separate from the main coverage denominator.

## 5. Coverage and refusal distribution

| Group                                   | Total | Small admitted | Medium admitted | Large admitted |
| --------------------------------------- | ----: | -------------: | --------------: | -------------: |
| Ordinary raw                            |    36 |             23 |              31 |             36 |
| Dynamic range raw                       |    24 |             13 |              18 |             19 |
| Cancellation raw                        |    20 |             10 |              13 |             16 |
| Raw boundaries                          |     7 |              2 |               2 |              2 |
| All raw observation arrays              |    87 |             48 |              64 |             73 |
| Synthetic three-tail proxies (separate) |    42 |             26 |              27 |             29 |

Raw refusal counts are 39/87, 23/87 and 14/87 (approximately 44.83%, 26.44%
and 16.09%). These are finite engineering-corpus fractions, not expected
customer refusal rates. Deliberate representation/underflow negatives should
remain refused regardless of budget. Therefore maximizing aggregate admission
is not a correctness or usefulness objective.

For Medium, all 28 ordinary inputs through n128 pass admission. Three of four
ordinary n256 cases are admitted; the decimal n256 case and all ordinary n512
cases exceed cost. The four uniform magnitude scalings admit 4/4 each. Mixed
exponents admit 2/4, while all four extreme-finite cases are outside the domain.
Large-offset, tiny-contrast and cancellation-moment series each admit 4/5.
Only 1/5 tiny-residual cases is admitted; others involve cost or positive-tail
underflow, not an unexplained cancellation prohibition.

RESULTS includes each group's n distribution, min/median/p90/max charged cost,
admitted cost distribution, maximum admitted n, minimum refused n, exact
refusal fractions, per-recipe strata and admitted IDs. At Medium the observed
raw maximum admitted n is 256. That observation does not define the domain.
Refused n can be as small as two for representation/underflow reasons.

## 6. Why refusals occur

At Medium, 23 raw refusals partition under the documented reporting order as:

- 11 cost refusals, all dominated by the linear tail-construction allowance.
- Five D04 exact arithmetic magnitude refusals.
- One exact-zero SSE computability refusal.
- Two positive SSE values whose projection is zero.
- Four positive-tail zero-underflow refusals.

Every row retains the semantic gate AND full component cost where exact F
exists. Cost is reported first when exceeded; increasing B can therefore
uncover a still-present semantic refusal without changing the admitted set
incorrectly. Exact-zero SSE has no F width/complete cost and is never assigned
an invented F=0 for admission. Refusal rates are not monotone per reason label,
but admission is monotone.

The decomposition is of reviewed symbolic allowances, not measured instruction
counts: Cpre/non-tail, `32a*sum(U(Kx))` for construction, `256*sum(U(Kx))` for
fixed tail decisions, and bounded evidence/aggregation. The construction term
includes degree/operand growth; it does not pretend to distinguish exact CPU
seconds spent in coefficients versus Horner normalization. Boundary search,
evidence and preflight remain charged even when not dominant. No timeout is
used as a mathematical refusal reason.

The research evaluator sometimes evaluates tails outside a candidate budget
to explain semantic behavior. This is off-policy evidence collection, not the
prescribed G5 order; the actual candidate first rejects excessive work before
the terminal method, as DECISION specifies.

## 7. Budget monotonicity

Let R denote B-independent RFC/T03 representation and exact eligibility gates.
For fixed input and fixed cost revision, membership is `R and C<=B`.
If B1<B2 and R and C<=B1, then R and C<=B2. The exact-sign procedure and
eligibility do not change with B, so no precision/host-dependent reversal is
possible in this definition. The saved corpus confirms nested admitted sets
for all three budgets, inclusive anchor boundaries and cost-derived count
frontiers. This is also tested under normal and optimized execution.

## 8. Reference practicality evidence

Sixty selected probes were each executed in a fresh normal and optimized
process: 120/120 completed and all numerical row hashes matched the saved
results and each other. The isolated processes report actual optimization
flags 0 and 1. The implementation uses pinned historical exact arithmetic,
the reviewed research S-C terminal and a quotient projection path; it is NOT
the production controlled worker or an integrated supported public verifier.
Independent residual-oracle checks are excluded from the timed component run.
Timing includes input recipe construction, arithmetic/projections, uncached
three-tail execution and compact witness hashing where eligible. Imports/startup
are excluded from inner timings and separately included in parent wall time.

| Observation among admitted measured probes   |     Small |    Medium |     Large |
| -------------------------------------------- | --------: | --------: | --------: |
| Completed observations, including both modes |        44 |        78 |       100 |
| Maximum inner wall seconds                   | 0.0038135 | 0.0934454 | 3.3395646 |
| Maximum measured CPU seconds                 |  0.015625 |  0.093750 |  3.328125 |
| Maximum process peak working set bytes       |  25440256 |  25604096 |  41943040 |
| Maximum observed peak increase bytes         |         0 |         0 |  17727488 |
| Maximum numerical witness bytes              |     25701 |    180870 |    805776 |

Counts overlap across nested budgets and include synthetic frontier probes;
they are not full-corpus or raw-Record implementation success rates. CPU
accounting has visible quantization, including zero samples for short work.
Memory is a process-lifetime peak working set with a pre-work baseline, not
Python heap or a reference cap. Zero peak increase means no new lifetime high
was observed; it does not mean zero allocations.

The 30-second measurement timeout bounds this research session only. No probe
hit it. It is not a proposed safety cap, support guarantee, all-domain bound
or new EC3/EC4 validation. The absence of a major contradiction is scoped to
these numerical components and measured inputs. G5 integration and eventual
reference-support closure remain distinct obligations.

## 9. Cost correlation and outliers

Descriptive Spearman rank correlation between cost and inner wall is about
0.967 (normal) and 0.970 (optimized); cost/CPU is 0.892 and 0.900;
cost/process peak is 0.404 and 0.448. These are sample diagnostics, not a
conversion from charged units to seconds or memory.

Screen: bottom cost quartile AND top wall or peak-memory quartile, including
ties. No low-cost/high-wall outlier is flagged. Two normal-mode memory flags
occur: inherited_negative_mean_zero and exact_midpoint_tails_3. Their process
peaks equal their pre-work peaks (23912448 and 23920640 bytes), their observed
increase is zero, and inner wall is approximately 0.224 and 0.527 milliseconds.
The evidence therefore points to baseline/process variation rather than an
unaccounted large numerical working set. Neither is a proof of universal
memory safety; this peak metric can hide activity below the startup high.

The largest wall/working-set case is the Large frontier at n1629, with width-one
F=0. The pinned research terminal still constructs coefficients and polynomial
objects for F=0; the frozen cost deliberately charges that work. Medium's
analogous n442 frontier takes at most about 0.093 seconds. This degree-driven
burden is visible in charged cost; no special-case speed discount was added
while comparing B. It illustrates why greater admitted domain is not free.

## 10. Criterion, comparison and choice

PLAN's minimum engineering usefulness requires all ordinary n<=128, some
ordinary n>=256, useful finite scaling/offset/contrast cases, eligible boundary
coverage, meaningful explained refusals and no major observed feasibility
contradiction. It is not a business SLA or a claimed optimal threshold.

Small fails ordinary-through-128 and larger-count coverage. Medium satisfies
all specified criteria. Large adds nine raw admissions over Medium, but its
minimum-width count frontier expands from 442 to 1629 and measured frontier
burden grows materially. There is no supplied usage distribution establishing
that additional scope as necessary for the minimum G5 working target.

Boundedness is supplied by the unchanged cost construction, not by fast
measurements. Safety margin means the reviewed conservative charge envelopes
and observed finite-probe completion are separately visible; no empirical
multiplier is silently folded into B. Medium's transition anchor has zero
charged-budget slack by construction, correctly exercising inclusive admission.
Observed time below the session timeout is not a public safety margin.

Choose Medium as the smallest candidate meeting the declared engineering
criterion. The choice is a documented project working convention, not a theorem
that Medium is universally useful or globally optimal. G5 and the single
EC1/EC2 independent numerical close review can revisit it on concrete evidence.

## 11. Practical domain, count and guard interpretation

J-cost is sensitive to polynomial degree and reduced F component widths, not
simply raw magnitude or count. Uniform exact dyadic scaling can preserve F
and charged tail cost while representation gates still matter. Mixed exponents
can increase reduced widths. Large offsets do not receive a preflight discount
when F shrinks, and cancellation is not categorically excluded.

At Medium, equal-width three-tail work frontiers are: n2 w<=4353 (the raw-graph
width bound), n16 w<=2489, n32 w<=966, n64 w<=367, n128 w<=129, n256 w<=34,
and n442 w<=1. These are conservative equal-width slices of the cost predicate,
not independent per-tail limits. Unequal widths use their actual sum and
maximum in C. Every slice also needs all RFC/T03 gates.

Decision A: no ADDITIONAL standalone count ceiling. The RFC representation
ceiling remains. Since widths are at least one and C is nondecreasing with n,
`C(n,[1,1,1])<=B` gives a necessary count frontier of 442 for Medium; n443
already exceeds B even at minimum widths. This is a mathematical consequence
of the chosen cost, checked on both sides, not the observed corpus maximum
256 and not an independently chosen limit. A count-only precheck can use that
consequence without changing admission. Count below 443 is not sufficient.

The historical `w<=6500` cannot additionally reject a raw input covered by the
reviewed `w<=4353` bound. Do not impose 6500 on the public candidate. Arbitrary
external rational F is a different interface. The legacy finite-sum n65/work
checks and controlled worker do not implement this S-C/J-cost candidate;
their limitations are handed to G5/EC4 rather than shrinking the selected
domain to fit them. No legacy runtime or guard is changed in G4.

## 12. Reproduction and boundaries

Use the commands in MANIFEST. Deterministic coverage recomputation and saved
byte comparison succeed in normal and optimized mode. Captured timing bytes
are intentionally nondeterministic; analyze_results reproduces their analysis
without remeasurement. Explicit --measure creates a new capture and is not a
routine saved-result verification command.

Research JSON contains exact integers beyond binary64 safe range. Read it with
an arbitrary-precision integer JSON parser (as the provided Python tools do).
It is not JCS-eligible Record payload. DECISION exposes B as an exact decimal
constant; implementations use exact integers rather than binary64 conversion.

Public artifacts are authored by OpenAI Codex in the continuing context using
public repository inputs. G4 adds no independent review claim. The containing
Git commit binds the manifest and source hashes; no circular self-hash is used.
No historical artifact, architecture/T03 branch, main or PR331 is modified.
