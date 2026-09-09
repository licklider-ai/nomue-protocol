# Limited review of the supplied Troendle investigation

2026-09-09. **GO for the bounded author account, with one non-blocking
documentation correction: BLOCKER 0 / SHOULD-FIX 1 / NICE-TO-HAVE 0.**

The procedure, finite arithmetic and substantive guarantee boundaries survive
this review. SF-01 corrects the description of the malformed display (A.12);
it does not change the algorithm, probability calculations or retained proof
limitations. GO here permits treating the report as bounded evidence with this
correction attached. It is not unrestricted theorem certification, formal
independence satisfaction, RSM-02 closure, method adoption, public-opening
authorization, a release decision or a merge judgment.

## 1. Fixed inputs and source custody

- Reviewed PR: [267](https://github.com/licklider-ai/nomue-protocol/pull/267).
- REVIEW_COMMIT: `0e82d4a3d6f098753a703287f9424fe590b886d5`.
- Sole parent: `55d30240252517aa4a84b8cccf374a72260c3426`.
- Reviewed tree: `22991421dc023eb140e522a6962ae76ac2d7cf6a`.
- Source: user attachment `30_Troendle_1995(1).pdf`, corresponding to supplier
  `30_Troendle_1995.pdf`; 1020647 bytes, 10 PDF pages; SHA-256
  `21c9fbad95c8c29e709863aa45d314deca1f70f4bf148da1b7407f3178f08b54`.

The PDF was hashed and its size/page count verified before content inspection.
PDF 1 is the supplier cover. PDF 2-10 are JASA 90(429), March 1995,
pp.370-378, James F. Troendle, "A Stepwise Resampling Method of Multiple
Hypothesis Testing." Cover DOI: `10.1080/01621459.1995.10476522`.
The 2012 online date is distinct from the 1995 article date. The DOI was not
resolved externally. No new original or purchase archive was obtained.

The entire extracted text and all ten individual 1800-pixel page images were
read. An additional 180-dpi crop of PDF 10 was inspected to distinguish the
indicator symbol from an integral in (A.12). There was no inaccessible page;
the incomplete right-hand event is visible in the supplied image itself.
The PDF, extracted text and images are not part of this submission.

Repository reading included AGENTS.md and its six Read-first documents,
the acquisition commission, original TROENDLE-HANDOFF.md, Parts Y/ Z/ AA/ AB,
the complete author report, both author scripts and INDEPENDENT-REVIEW.md.
No additional directory-local AGENTS.md applies. The Ge report was read as
attributed reused evidence, not as a fresh Ge primary-source investigation.
The fixed semantic catalogue's Section 8.8 was checked against its pinned blob
`8f21526040924b891f64724c2d0fde9ea94eff92` at semantic commit
`7bd9c5ab854777c3e99e624d9d2ed62731228852`.
Reading the required historical Part AA is not a new investigation of its
separate numerical lane; PR #174/#263/#265 were not separately fetched,
investigated, repaired or judged.

The author increment contains exactly four additions and the cumulative
append. All five lengths, Git blob IDs and SHA-256 values agree with PR #267's
body. The 552103-byte Parts A-AA prefix has SHA-256
`7f558850f37e70487e145e97d2fdf15d5ea0ddf0fb537074fb810b489bf4306c`.
Every other parent tree entry is unchanged. The author's preservation script
passed before adding review files. The separate review preservation script
rechecks these identities without importing or relaxing the author script.

## 2. Procedure and family findings

| Source                  | Reviewed conclusion                                                                                                                                                                                                                 |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| pp.370-371, Section 3   | Two groups with k outcomes per subject; component-mean nulls and direction-appropriate alternatives. k is not the number of treatment groups. Introductory mention of more groups does not prove a multi-group all-pairs extension. |
| p.371, (1)-(2)          | Single-step whole-family maximum, inclusive exceedance, introductory rejection at probability <= alpha. Sampling whole subject vectors retains outcome dependence.                                                                  |
| p.372, (3), Algorithm 1 | Fix the observed ordering, start with the largest statistic, remove previously rejected coordinates, use the remaining-family maximum, reject strictly below alpha, and stop otherwise.                                             |
| p.372, (4), Algorithm 2 | Ideal critical value solves an inclusive-tail equality to alpha, with rejection strictly above that value. Such equality need not be attainable for discrete laws.                                                                  |
| p.372, (5), Algorithm 3 | Generate one common matrix of M resamples; count remaining-family exceedances including ties and divide by M. Return to Step 4, not the generation step. Reject only at count/M < alpha.                                            |
| p.375, Section 6        | Adjusted outputs are cumulative maxima of stage probabilities. Computing all values continues beyond a particular alpha-level stopping point.                                                                                       |
| pp.375-376              | Explicit T=1-P reverses the inclusive event to min P <= observed P. This does not identify arbitrary raw maxT with minP.                                                                                                            |

The author's all-rejected endpoint is the necessary finite termination after
the last hypothesis; the printed loop does not spell out that endpoint.
Its increasing-index convention for tied observed statistics is correctly
labelled as an investigator choice. Neither the paper nor this review supplies
a PRNG, seed contract, plus-one correction, identity-sample rule or adaptive-M
stopping rule. Zero count/M is not proof of zero population probability.

For a tied block the observed threshold is fixed. With common draws, removing
coordinates only removes exceedance events. The first tail in the block
therefore dominates the later tails, even though those raw tails can differ.
After cumulative maxima all block members have the same adjusted value,
independently of their internal order. If an earlier stage stops, no block
member is rejected. Otherwise the whole block passes or its first stage stops.
This verifies the author's tie reasoning, including ties between true and false
hypotheses.

At rank r, the stop rule rejects precisely when every stage through r is
strictly below alpha, equivalently when their maximum is strictly below alpha.
The adjusted value is an infimum of rejecting levels, not an attained smallest
level under this strict rule. The author correctly qualifies the wording on
p.375 and does not import the reused Ge diagnostic's <= rejection rule.

## 3. Guarantees, appendix and independent reasoning

**Theorem 1 (p.372; proof p.376).** This is an ideal known-critical-value
result, not a finite-M assertion. Its meaningful use requires compatible joint
null calibration and suitable critical values. Discrete unattainable tail
equalities and flat-tail quantile conventions prevent an unconditional reading
of the Algorithms 1/2 equivalence. The author explicitly preserves these limits.

**Theorem 2 (p.373, (6)-(7); pp.376-378).** The overbar belongs to the outer
limit: limsup as N tends to infinity, after the limit as M tends to infinity.
The original statistics use fixed 2N0 observations. Each replicate uses 2N0
with-replacement draws from a growing pool of 2N subjects. The statement does
not substitute N0=N, interchange limits, assert a rate, or give finite-M
control. Equation (6) requires existing finite expectation of G. The bounded
1-P example meets integrability when the statistic is well-defined.

The p.376 proof explicitly treats the true-coordinate subvectors as iid with
the same joint F^(l) across groups. Equal means, or equal separate marginals
with different dependence, do not establish that premise. The author's
restriction is necessary; neither boundedness of 1-P nor component-local
statistics manufacture the common joint law. Distribution-free rhetoric on
p.376 is not promoted into an assumption-free means test in the report.

**First true rejection.** Let I0 be the true set and r its earliest member in
descending observed order. Then S_r contains I0 and t_r is the maximum true
statistic. Under the same fixed reference Q, the exceedance event for I0 is a
subset of that for S_r, so q_I0(t_r) <= q_Sr(t_r). If a true hypothesis is
rejected, that stage was reached and q_Sr(t_r) < alpha. A valid calibrated
true-set tail therefore bounds FWER by alpha. This is a pointwise inclusion,
not an argument that a data-selected remaining set can be treated as fixed.
It also applies under observed ties. This verifies the author's conditional
sufficient proof; it does not supply bootstrap calibration for Theorem 2.

**Appendix limits.** (A.2) uses the same inclusion on the empirical common
draws. (A.3) conditions on the original data and then integrates. The <= bound
in (A.4)-(A.6) retains the boundary mass and is not equality with a strict
limiting-event indicator. For example, when the conditional tail is
q=alpha=1/2 and M is odd, the probability that the empirical tail is strictly
below alpha is exactly 1/2, not zero. Our finite binomial checks independently
exhibit this obstruction to an incorrect strong-law argument.

The second term of (A.6) is probability mass of the _tail probability_ at
alpha. In the positive-mass case (A.10)-(A.11), the intended threshold U*
has a statistic atom gamma, and the final displayed bound uses
P(G>U*) + gamma = P(G>=U*) = alpha. A discrete diagnostic with masses
(3/4,1/8,1/8) at (0,1,2), alpha=1/4, gives strict-tail mass 1/8 plus
equality-tail mass 1/8. It verifies the bookkeeping, not arbitrary-G convergence.

The report candidly leaves a complete proof audit unresolved. In particular,
we do not certify the empirical product-measure convergence asserted below
(A.6) for arbitrary measurable G, its printed "every sequence" strength,
all limit interchanges or the full quantile argument. Empirical-CDF convergence
alone is not such a proof for every measurable event. The author does not
claim otherwise. These are retained scientific limitations rather than new
procurement requirements or newly proved counterexamples to Theorem 2.

The p.373 illustrative G omits the positive normalization in the preceding
z formula, as the author reports. Direction must still be selected correctly
for the intended alternative; the signed p.372 example is explicitly
treatment-minus-control. We do not infer a two-sided test from a raw signed T.

## 4. Required correction

**SF-01 / SHOULD-FIX / non-blocking source-description correction.**
Location: author REVIEW-RESULT.md, Section 3.2, paragraph beginning
"Some displays require care," sentence describing (A.12).

The supplied p.378 image shows an indicator I[ integral ... < alpha ] on
the left, not an unfinished outer integral. Its inner integral includes the
product measure. The demonstrable defect is the missing comparison on the
right-hand indicator I[G(...)]. The following calculation uses G>U*.
Thus the phrase "and an incomplete outer integration" overstates the visible
defect. It should be removed; do not add a measure to the pointwise indicator
identity as a supposed repair of the source.

Suggested replacement:

> Page 378 (A.12), as supplied, has a right-hand indicator with its comparison
> omitted. The left-hand side is an indicator of an integrated tail probability
> being below alpha; the following calculation indicates the intended event
> G>U*. This identifies the intended reading without certifying a corrected
> appendix proof.

The main missing-event warning is correct, Part AB makes no additional
outer-integral allegation, and no calculation relies on the erroneous phrase.
Consequently this is not a blocker for the limited conclusion. The correction
is recorded here for the author/steward's later application; all reviewed
author files remain unchanged as instructed.

## 5. Independent exact calculations

[check-independent.py](check-independent.py) imports no author program or
statistical implementation. The author report and script were visible before
writing it, so this is independent recomputation, not blind derivation.
It uses signed integer sum contrasts and complement-event counting, with exact
fractions. It separately implements literal stopping by exceedance events.

- All six allocations give mean-difference pairs (5/2,1), (1/2,1),
  (-1/2,0), (1/2,0), (-1/2,-1), (-5/2,-1), as a multiset.
  Stage counts are 1 and 2: tails (1/6,1/3). At alpha=1/6 no rejection;
  at alpha=1/5 only the first outcome is rejected.
- All 256 ordered pooled draws give counts 12 and 37. An independent
  occupancy-weight calculation over unordered subject pairs reproduces the
  entire joint statistic histogram. The first-coordinate pair-sum frequencies
  are (4,4,4,1,2,1) at (0,2,3,4,5,6). Thus 4*(2+1)=12.
  The second-coordinate frequencies are (1,4,6,4,1) at (0,1,2,3,4),
  giving 1*11+4*5+6=37. Stage tails are (3/64,37/256).
- All 252 balanced allocations of the ten printed subjects give observed
  differences (50,5), P(T1*>=8)=126/252, single-step H2 tail=1/2,
  and step-down tails (1/252,1/252). Both SR hypotheses reject at .05.
- The with-replacement lower bound is checked without reusing the author's
  scalar convolution. Write each first coordinate as 50*high + residual,
  with five high and five low subjects and residuals in [-2,2]. The difference
  of five-subject sums exceeds or equals 25 exactly when the treatment high
  count exceeds the control high count. Two independent Binomial(5,1/2)
  counts tie with probability sum_j choose(5,j)^2/1024=252/1024. Symmetry
  yields (1-252/1024)/2=193/512, a lower bound for the maximum tail.
- The M=1 Bernoulli witness has exactly three rejecting outcomes among 16
  equally likely original-data/resample combinations, all with (X,Y)=(0,1).
  FWER=3/16 at alpha=1/20. The statistic is bounded and group laws agree.
  This refutes a finite-M extrapolation, not the ordered-limit theorem.
- New aligned draws ((3,3),(0,0),(0,0),(0,0)) give first tail 1/4 at
  observed (3,3). Moving the second coordinate's 3 to the second draw
  preserves both marginals but raises the tail to 1/2. Equality counts and
  strict-alpha stopping are checked, including reversal of tied indices.
- New draws ((3,0),(3,0),(0,0),(0,1)) at observed (3,1) give raw tails
  (1/2,1/4), adjusted (1/2,1/2). At alpha=1/3 the procedure stops before
  any rejection. Ignoring stopping would incorrectly reject the second.
- A separate exhaustive space of three coordinates and two binary-valued
  draws, observations in {0,1,2}^3, all admissible tied orderings and five
  alpha levels passes 19200 decision comparisons, 134400 first-true event
  inclusions and 2112 tie-order comparisons. These are algebraic checks of
  finite tables, not arbitrary partial-null calibration experiments.

Actual independent output, exit 0:

```text
6 allocations: [('-1/2', '-1'), ('-1/2', '0'), ('-5/2', '-1'), ('1/2', '0'), ('1/2', '1'), ('5/2', '1')]
256 ordered draws and weighted occupancy: counts 12, 37; tails 3/64, 37/256 PASS
252 allocations: 126/252 at T1>=8; SS H2=1/2; SR=(1/252,1/252) PASS
High-count binomial identity: P(T1>=5)=(1-252/1024)/2=193/512 PASS
M=1 Bernoulli witness: three listed errors / 16 = 3/16 PASS
Alpha equality: odd-M binomial strict event=1/2; tail mass 1/8+1/8=1/4 PASS
3-coordinate exhaustive audit: 19200 decisions, 134400 first-true inclusions, 2112 tie-order comparisons PASS
Broken alignment, inclusive ties, strict alpha, stop and cumulative maxima PASS
ALL INDEPENDENT BOUNDED CHECKS PASSED
```

The author's separate diagnostic also passed: 729 tables, 8616 stop/adjustment
checks, 25848 first-true checks, and the same six/256/252-draw results,
193/512 lower bound and 3/16 witness. That successful execution is supporting
replay evidence, not the basis for calling our calculations independent.

## 6. Empirical evidence, preservation and exclusions

Tables 1-7 are historical simulation results, with specified resampling and
covariance settings. Table 1's .0505 and .0501 are correctly transcribed and
are not exact finite-M size bounds. Section 5.3 changes the covariance pattern
relative to the SU assumption; it does not establish arbitrary different joint
laws between groups. Table 9's displayed SR values are monotone and no larger
than SS. Table 8 has marginal counts for 467 and 277 infants, not their joint
55-outcome vectors. It cannot reconstruct the dependence required for Table 9.
No Fortran, historical simulation, raw infant data, Fisher-tail replay or
Table 9 resampling reproduction was performed.

The unchanged ledger is:

| State            | Members                                              | Count |
| ---------------- | ---------------------------------------------------- | ----: |
| CLOSED           | SR-B, SR-C, SR-D, SR-F, SR-G, SR-I, SR-J, SR-K, SR-L |     9 |
| PARTIAL          | SR-H                                                 |     1 |
| INPUT_INCOMPLETE | SR-A, SR-E, RSM-01, RSM-02                           |     4 |

Overall INPUT_INCOMPLETE, SOURCE_SET_READY=false, NARROW, TRANSFER,
R3-CAND/RES-ONLY classifications, previous limited acceptances and all residual
conditions remain unchanged. The 42+1 inventory is reused, not re-inspected.
The supplied-source cap is effective without repeat approval. Unprovided
sources and variants remain excluded. No catalogue split, source substitution,
numerical/runtime contract, general unequal-size theorem or N0=N extension
is established. Bibliography entries are not independently inspected originals.

## 7. Validation and provenance

The review branch starts at REVIEW_COMMIT and adds only this report,
check-independent.py and check-preservation.py under this directory.
All prior modes/blobs, including the whole 559874-byte cumulative report
with Part AB and all author files, remain unchanged. The output audit checks
the complete index tree, not only the changed filenames. Returned immutable
commit/tree/file identities and the final head recheck are recorded in the
separate draft PR body to avoid self-referential hashes in this report.

Final required validation statuses are recorded in that PR body after running
pnpm format:check, pnpm lint:markdown, the direct TypeScript validator,
git diff --cached --check, both diagnostics and the review preservation audit.
The author preservation audit was run on the pristine reviewed commit first;
it is intentionally not relaxed to admit this review's three additions.

Environment: Python 3.12.14, Node v24.19.0, pnpm 11.19.0 (packageManager
requests 11.7.0), Poppler PDF tools. pnpm install --frozen-lockfile succeeded;
the lockfile is unchanged. Python calculations use the standard library only.
The first GitHub metadata request used an incorrect argument name and was
rejected; the corrected request succeeded. This is a tool invocation failure,
not missing source evidence. No full pnpm check, typecheck, general tests,
generated checks, Ge/SR-A statistical rerun or separate numerical-lane replay
was performed. No new GitHub CI completion is asserted by local validation.

This is OpenAI-assisted review in ChatGPT Work/Codex. The current conversation
contains historical summaries, including earlier PR #267 author work, and
the author's report/code were visible during review. In this visible task the
reviewer did not author the reviewed commit; that does not establish absence
of prior involvement across other sessions. This is a non-blind review with
fresh PDF inspection and separately written calculations, not an assertion of
a separate human reviewer, different provider, different model or clean-room
context. OpenAI is the known provider and Codex/GPT the available assistant
identification; the exact serving model/build and difference from the author's
model cannot be authenticated here. No subagents or alternative models were
used. Historical reviewer identities and testimony are not newly authenticated.
The repository's separate-investigator/model Research Gate is not self-certified.
