# Bounded investigation of supplied Troendle (1995)

2026-09-09. **Author investigation completed; separate review pending.**
Troendle supplies a specific step-down, common-resample multiple-outcome
procedure and a carefully limited asymptotic error-control result. This adds
bounded evidence for RSM-02; it does not complete its historical family-wide
source hold or certify finite-resample validity.

## 1. Fixed inputs, custody and reading

| Object                              | Verified identity                                                                       |
| ----------------------------------- | --------------------------------------------------------------------------------------- |
| Input / PR                          | `55d30240252517aa4a84b8cccf374a72260c3426`, PR #266                                     |
| Sole parent                         | `9e95cdee40b64cbf0f42dca8e3fab1c075507168`                                              |
| Input tree                          | `a469f08b484d032f2301b89518960a27c28226e1`                                              |
| Cumulative input blob               | `db3cb0bb2766c8bb776bff9162ed8b35759e29e6`                                              |
| Cumulative input bytes              | 552103                                                                                  |
| Cumulative input SHA-256            | `7f558850f37e70487e145e97d2fdf15d5ea0ddf0fb537074fb810b489bf4306c`                      |
| Acquisition commission blob         | `3c7ddcc696f0c284213f7efe0da68e747bc238d7`                                              |
| Fixed semantic commit / tree        | `7bd9c5ab854777c3e99e624d9d2ed62731228852` / `f0436f5784dbe34d4c150893c20a60f0431c5d90` |
| Fixed semantic result blob          | `8f21526040924b891f64724c2d0fde9ea94eff92`                                              |
| Reused Ge report / diagnostic blobs | `6092ab5a856673c414c02f04478373fd8492ba89` / `aa7664372c125e37e8cfc5a9c2ae8b97e44a70bb` |

The fixed catalogue path is
`governance/drafts/release-3-preparation/semantic-research-result.md`.
Its Section 8.8 labels RSM-02 a permutation-based pairwise/step-down family,
SNIPPET, TRANSFER to the seeded-stochastic reproducibility program. Supplier
30 is not the catalogue's SRC-30 (Hsu). No identifier is repurposed.

Read AGENTS.md, its six ordered Read-first documents, the acquisition
commission, cumulative Parts Y, Z and AA, the complete Troendle handoff and
Ge report. No directory-local AGENTS.md applies to these output paths.
Verified that the input changes only the cumulative append and two receipt
files. Its first 542963 bytes reproduce the entire parent result, SHA-256
`8fbe47a29f0953823af1288331b53cffa20088fb612dedd3af6856bdf8857162`.
The next append preserves all 552103 input bytes, including those earlier bytes.

**New primary reading:** the user-supplied attachment `30_Troendle_1995.pdf`,
1020647 bytes, 10 PDF pages, SHA-256
`21c9fbad95c8c29e709863aa45d314deca1f70f4bf148da1b7407f3178f08b54`.
The bytes, page count and digest were directly checked on 2026-09-09. No ZIP
was needed or rehashed; the handoff's ZIP identity is prior custody evidence.
Git clone and attachment access succeeded; no failed source-acquisition route
or new scientific-original acquisition occurred.

The supplier cover identifies James F. Troendle, JASA 90(429), March 1995,
pp.370-378, DOI `10.1080/01621459.1995.10476522`. Its 2012 online-publication
date is distinct from the article date. PDF page 1 is that cover; PDF pages
2-10 map to printed pp.370-378. All ten pages were read as extracted text
and individually inspected as 1800-pixel page images, including every equation,
algorithm, theorem and Tables 1-9. No decision-bearing passage remained
unreadable; malformed displays are reported below rather than silently repaired.
The DOI and publisher were not checked externally. Neither the PDF nor its
extracted text or page images is committed.

**Reused evidence:** Ge's report and the Y/Z/AA receipts retain their stated
scope and independence limitations. The Ge PDF was not reopened, its program
was not rerun, and its historical computations are not claimed as fresh work.
References within Troendle, including Westfall-Young 1993 and Dunnett-Tamhane,
are source-attributed discussion only, not newly inspected originals.

## 2. Source-to-procedure map

Write r(1),...,r(k) for indices in decreasing observed evidence order; this
reverses the paper's ascending t(1),...,t(k) notation. At stage w let
S_w={r(w),...,r(k)}. Larger T means more extreme evidence in the specified
direction. This notation change does not reorder the resampled data.

| Question                     | Direct source locator             | Bounded account                                                                                                                                                                                                                                                        |
| ---------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Family and null              | pp.370-371, Sections 1 and 3      | Two independent groups, N independent k-dimensional subjects per group, with common within-group joint laws F(mu1; x) and F(mu2; x). k component-mean equalities, with one-sided increase or two-sided alternatives. Not an all-pairs family among k treatment groups. |
| Dependence and pooling       | p.371, (1)-(2); p.376 after (A.2) | Sample entire subject vectors from the pooled data. Correlation among outcomes is retained. The proof treats the true-component subvectors as jointly identically distributed across groups under their intersection null.                                             |
| Statistic scale              | p.371; pp.373, 375-376            | Descending evidence, using direction-appropriate statistics or transformed p-values. Page 375 uses Fisher p-values; p.376 explicitly suggests T=1-P. A raw signed statistic does not automatically implement a two-sided alternative.                                  |
| Single step                  | p.371, (1)-(2)                    | Count maxima over the entire family; inclusive exceedance at the observed threshold. This introductory rule uses probability <= alpha.                                                                                                                                 |
| Ideal probability step-down  | p.372, SR Algorithm 1, (3)        | Drop the previously rejected component, compute the remaining maximum tail, reject if its probability is strictly < alpha; otherwise stop.                                                                                                                             |
| Ideal critical-value version | p.372, SR Algorithm 2, (4)        | Seek phi with P(max T >= phi)=alpha; reject when the observed remaining maximum is strictly > phi. This is not an automatically available exact quantile in a discrete distribution.                                                                                   |
| Practical version            | p.372, (5), SR Algorithm 3        | Generate all k statistics on each of M common resamples once. At each stage count resamples with remaining maximum >= observed statistic; divide by M. Reject if the estimate is strictly < alpha; stop at >= alpha.                                                   |
| Resampling law               | pp.371-373                        | General description allows with or without replacement. Theorem 2 specifically uses with-replacement draws of 2N0 vectors from a growing pool of 2N vectors. Without replacement is also used in Section 5.1 simulations, not covered by that theorem's stated law.    |
| Adjusted output              | p.375, Section 6; p.376           | The adjusted value at rank r is the maximum of stage estimates through r. To compute all adjusted values, continue the stage calculations after a particular alpha-level test would stop.                                                                              |
| Real-data illustration       | pp.374-375, Tables 8-9            | 55 Bernoulli outcomes, Fisher upper-tail tests, 467 versus 277 infants. The same 10000 pooled with-replacement samples of size 744 are used for SS and SR. This unequal-size application is not a newly proved unequal-size version of Theorem 2.                      |

In the practical version the exact formula, in the new index notation, is

```math
q_w^*=\frac1M\sum_{b=1}^M
  1\{\max_{i\in S_w}T_{ib}^*\ge t_{r(w)}\},
\qquad \widetilde p_{r(w)}=\max_{v\le w}q_v^*.
```

Stop at the first q_w^* >= alpha; reject the preceding hypotheses. If all k
pass, all are rejected and the procedure terminates after the last component
(the explicit endpoint needed to avoid a nonexistent next stage). The paper's
word "accept" means no rejection by this procedure, not proof that the null
is true. Shared resamples follow Algorithm 3's single generation step and
return to Step 4, not Step 3. Independent component resampling would change
the reference joint law. Keeping the original observed ordering is essential;
resample-specific reordering cannot change the component membership of S_w.

The count includes ties to the observed statistic. The paper does not prescribe
an index order for tied observed statistics, a PRNG, seed, pseudorandom stream,
identity-sample insertion, plus-one correction, or adaptive resampling stopping
rule. This investigation uses increasing original index to break observed ties;
that is an investigator convention. Equation (5) is count/M, so a zero estimate
is possible and is not proof of zero underlying probability. When T=1-P is
chosen explicitly, its inclusive upper-tail event is exactly the inclusive
lower-tail event for P, including equality. This is not a claim that arbitrary
raw maxT and minP are identical.

**Boundary details:** Algorithms 1/3 use strict alpha comparison, unlike the
introductory single-step <= convention and the Ge diagnostic. Under the strict
rule the cumulative maximum is the infimum of rejecting levels; at equality
it does not reject. Thus p.375's description as the smallest rejecting level
needs this boundary qualification. The paper calls Algorithms 1/2 equivalent
in an idealized setting; exact tail-quantile equality can fail for discrete
laws, and flat portions can require an explicit quantile convention. No universal
finite discrete equivalence is adopted here.

## 3. Guarantees, conditions and proof limits

### 3.1 What the paper states

The criterion is the probability of at least one rejection of a true null in
the declared family: experimentwise type I error, or FWER. The proofs allow
some hypotheses to be false, so the intended result is strong control within
the stated model, not FDR or merely complete-null control.

**Theorem 1, p.372; proof p.376, (A.1):** ideal Algorithm 2 with known critical
values controls FWER at or below alpha. This is an ideal exact-calibration
claim without a sample-size limit in its statement. It is not a finite-M
resampling theorem. It depends on valid joint null calibration and compatible
true-subset laws, not only knowing a number returned by a numerical routine.
Equation (4)'s exact equality additionally presupposes a suitable cutoff exists.

**Theorem 2, p.373, (6)-(7); proof pp.376-378, (A.2)-(A.12):** the printed result is

```math
\limsup_{N\to\infty}\ \lim_{M\to\infty}
 P\{\text{at least one true null rejected}\}\le\alpha.
```

The outer limit has a bar (limsup); the inner limit is M first. N0 stays fixed:
the observed test statistics and each resample use 2N0 observations, while the
pooled source of resampling grows to 2N. The proof specifically makes the
statistic event independent of N, p.377 after (A.5). The conditions used are:

- A fixed finite k and a well-defined measurable statistic for each relevant
  true-component subset, with no dependence on false components after truncation.
- Independent subjects with a common joint distribution for the true-coordinate
  subvectors across both groups; p.376 explicitly uses iid F^(l). Arbitrary
  dependence within that common vector law is allowed.
- The maximum G on 2N0 observations has an existing finite expectation, as
  stated before (6). A bounded statistic such as 1-P meets this integrability
  condition when P is defined on every relevant sample.
- Pooled sampling with replacement, 2N0 draws per replicate, with repeated
  resamples supporting the conditional law-of-large-numbers step. The random
  draws are on whole vectors, not separately on each endpoint.
- The ordered limits and original-statistic size just described, and the
  inclusive count and strict rejection boundary of Algorithm 3.

This is asymptotic conservativeness, not convergence of FWER to alpha, not an
explicit approximation-error bound, and not a proof for N0=N growing with N.
It gives no finite N/M risk bound or rate, numerical tolerance, minimal M,
sequential stopping guarantee, or seeded replay contract. Finite simulations
are empirical support, not another theorem.

### 3.2 Joint nulls and the appendix

The article's p.376 assertion that subset pivotality always holds in its
multiple-outcome setting and its distribution-free conclusion are read within
the common-joint-law framework used in its proof. Equality of component means,
or even equality of separate marginal distributions with arbitrary different
between-group dependence, does not alone establish that framework. Section 7
also describes a same-marginal-scale setting; such scale comparability does not
by itself establish joint exchangeability. Using bounded 1-P supplies
integrability, not the missing joint-law assumption.

This restriction agrees with the **reused** Ge report's Section 5.1 discussion
of Westfall's supplied comments. No new rereading or verification of those
comments is claimed. The present Troendle image at p.376 independently shows
where the proof invokes the common truncated joint distribution.

The appendix was read throughout. Its first-true-step inclusion (A.2), the
conditional averaging (A.3), the inclusive boundary bound (A.4)-(A.6), and the
separate atom case (A.10)-(A.12) explain the intended control argument. At a
limiting tail equal to alpha, an indicator of an empirical strict inequality
need not converge to zero; the displayed <= bound and equality-mass case must
not be dropped. We do not equate the strong law with convergence of that
indicator at equality.

Some displays require care: p.373's illustrative G drops the positive z-scale
normalization displayed immediately above it; integrability is unaffected by
that constant, but it is not literally the same normalized maximum. Page 378
(A.12), as supplied, has a malformed right-hand indicator without its comparison
and an incomplete outer integration; the next displayed calculation explicitly
uses the event G>U*. This is a reported transcription/display limitation, not
an authorized correction of the article. Appendix critical values also involve
a data-selected remaining family; the sufficient argument below states the
common-reference monotonicity that makes the first-error bound precise.

We do not certify every measure-theoretic step for arbitrary measurable G,
all convergence assertions, or a corrected version of (A.12). Theorem 2 is
reported as the source's theorem under its actual conditions; the independently
established results below are narrower and explicitly separated. No paper-wide
assumption-free or universal bootstrap guarantee is inferred.

### 3.3 Investigator derivations

For a fixed common joint reference Q, define
q_I(x)=Q(max over i in I of T_i >= x). Assume the true-set probability
q_I0(max observed true T) is a valid tail p-value under every allowed partial
null. Let r be the first true hypothesis encountered in descending observed
order. The remaining set S_r contains I0 and the threshold equals the maximum
true observed statistic, so q_Sr(t_r) >= q_I0(t_r), pointwise. A false rejection
requires the former to be < alpha and therefore the valid true-set tail to be
< alpha. This proves FWER <= alpha under these explicit calibration conditions.
It also avoids treating a data-selected family as fixed in a probability
statement. This is an investigator sufficient argument, analogous to the
previously recorded Ge proof, not a new source theorem or proof of the
empirical bootstrap calibration in Theorem 2.

For a tied observed block the threshold is constant and shrinking the set can
only decrease its tail count when resamples are shared. The block's first stage
therefore dominates later block stages. Cumulative maxima give identical
adjusted values throughout the block and the rejection set is unchanged by
tie order. Raw stage counts need not be equal. At every rank, rejection by the
literal stop rule is equivalent to all preceding counts being < alpha, hence
to their cumulative maximum being < alpha. This supplies the adjusted-output
and tied-order logic without imposing a new statistical contract.

No closure implementation or all-intersection equivalence test is claimed in
this pass. Its first-true-step checks are direct finite inequalities; the Ge
closure results remain attributed prior evidence.

## 4. Comparison with the reused Ge investigation

| Dimension                  | Troendle: newly inspected                                                                       | Ge: reused report Sections 4-6                                                                          |
| -------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Family                     | Component outcomes of two groups; no universal all-pairs claim                                  | Explicit finite maxT/minP formulations; broader all-pairs interpretation excluded                       |
| Statistic order            | Largest evidence first; p-values available via normalization/1-P                                | maxT orders absolute statistics; minP orders raw p-values                                               |
| Reference columns          | Common subject-vector resamples, generated once in Algorithm 3                                  | Identically ordered permutation columns; sorted row-tail ranks for fast minP                            |
| Tail / alpha equality      | Inclusive exceedance, but strict rejection < alpha                                              | Inclusive tails and diagnostic rejection <= alpha                                                       |
| Adjusted values            | Running maxima of stage probabilities, p.375                                                    | Running maxima in (3.10)-(3.11) and Boxes 2-4                                                           |
| Main new guarantee content | Ideal calibration distinguished from fixed-N0, with-replacement, ordered-limit conservativeness | Conditional calibration/subset-law argument and finite full-orbit checks; no bootstrap theorem asserted |
| Ties / computation         | Inclusive counts; tie-index convention not specified                                            | Inclusive empirical tail-rank rule and a fast minP algorithm explicitly studied                         |
| What does not transfer     | No automatic finite-M guarantee, no N0=N limit, no universal distribution-free means test       | No blanket monograph coverage, no claim that row-locality proves subset pivotality                      |

Troendle pp.375-376 summarizes conditions attributed to Westfall-Young:
subset pivotality (8), continuous p-values (9), exact adjusted probabilities
(10), vanishing false-null p-values (11), a positive lower bound for null
quantiles (12), and a continuous limiting true-minimum p-value law (13).
These are Troendle's account of unread work; they are not six independently
verified monograph conditions or requirements newly imposed on his Theorem 2.
Likewise his assertion of the same step-down algorithm is source testimony,
not authentication of every monograph or Romano-Wolf variant.

## 5. Independent finite calculations

Run `python3 review-inputs/r3-troendle-supplied-primary/check-troendle.py`.
The program is newly written from the inspected procedure and uses Python
standard-library integers and fractions only. It imports neither Ge's code nor
a production statistical implementation. These are finite diagnostics, not
independent-investigator review or a general FWER proof.

### 5.1 Four-subject example and independent hand arithmetic

The subject vectors are (0,0), (0,1), (2,1), (3,2). With the first two controls
and the last two treatment subjects, signed treatment-minus-control mean
differences are (5/2,1). Enumerate all six 2+2 allocations. Their statistic
pairs are (5/2,1), (1/2,1), (-1/2,0), (1/2,0), (-1/2,-1), (-5/2,-1).
The two stage counts are 1 and 2, giving (1/6,1/3). At alpha=1/6 the test
stops immediately; at alpha=1/5 it rejects only the first component.

All 4^4=256 ordered pooled with-replacement resamples give counts 12 and 37,
or (3/64,37/256). Independent counting: first-coordinate pair-sum frequencies
at 0,2,3,4,5,6 are 4,4,4,1,2,1. A sum difference >=5 has count
4*(2+1)=12, while the second coordinate cannot reach the first-stage mean
threshold 5/2. Second-coordinate pair-sum frequencies at 0,...,4 are
1,4,6,4,1; a sum difference >=2 has count 1*11+4*5+6*1=37.
The enumeration and polynomial pair-sum reasoning agree.

The program also checks an explicit 1-P transformation against inclusive minP
counts; it does not pretend that these artificial transformed numbers are
calibrated individual p-values. A shared-draw tie example has first-stage
probability 1/4; independently permuting one coordinate increases it to 1/2
while preserving marginal histograms. Replacing >= by > instead gives zero.
A separate decreasing-stage example gives raw (1/2,1/4), adjusted (1/2,1/2),
and no rejection at alpha=2/5. Skipping the stop or monotonicity rule would
change the conclusion.

All 729 two-component, three-draw tables over {0,1,2}, treating each draw as
observed, exercise two independent calculation routes: direct maxima versus
unions of exceedance draw IDs. There are 8616 stop/adjustment comparisons and
25848 first-true-step checks over nonempty designated true subsets. Tie order,
alpha equality and complete-null calibration of these uniform finite tables
are also checked. Designated subsets test event inclusion, not a claimed
sampling model for arbitrary partial alternatives.

### 5.2 Printed example, p.372

The ten supplied subject vectors are transcribed in the script. Difference-of-
means statistics are (50,5). Across all 252 balanced allocations,
P(T1*>=8)=126/252=1/2; the single-step tail for H2 is 1/2, while step-down
stage probabilities are (1/252,1/252). This reproduces why the first large
component can mask the second in a single-step procedure. At alpha=.05 SR
rejects both in this finite example; the single-step procedure does not reject
H2. The complete-orbit calculation is an exact probability for the specified
reference allocation law, not proof about all normal samples.

For with-replacement resampling, scalar convolution enumerates the first-
coordinate pair of five-draw sum distributions without listing 10^10 tuples.
P(T1*>=5)=193/512, which is a lower bound on the single-step maximum tail
and exceeds 1/4. It supports the paper's stated a<.25 obstruction without
claiming to reproduce its unprovided historical code.

### 5.3 A finite-M limitation witness

Take a single true null, N=N0=1, and independent Bernoulli(1/2) group outcomes
X,Y. Use T=Y-X and just one pooled with-replacement resample (M=1). If
(X,Y)=(0,1), probability 1/4, the observed statistic is 1 and the resampled
upper-tail probability is 1/4. The single indicator is zero with probability
3/4, so Algorithm 3 rejects at alpha=1/20 with total probability
(1/4)*(3/4)=3/16. The other observed outcomes do not reject. Enumeration of
all 16 original/resample combinations confirms this exactly. The null has
identical group laws and a bounded statistic. Thus this is a counterexample
to a finite-M extrapolation, not to the source's ordered-limit theorem.

### 5.4 Empirical tables and execution record

Tables 1-7 were visually read for their stated scope: normal-data simulations,
HB/SR/SU comparisons, differing resampling modes and covariance assumptions.
For example, Table 1 reports SR .0505 and .0501 at nominal .05 with 500 and
1000 resamples. These are Monte Carlo observations, not exact size bounds or
proof of finite-M violation by themselves. Section 5.3's unequal covariance
entries concern the simulated covariance structure and assumed SU correlation;
they do not prove validity for arbitrary different group joint laws.

Table 8 contains marginal counts, not the 744 subject-level joint outcome
vectors. It cannot reconstruct the dependence needed for Table 9's adjusted
probabilities. Table 9's six displayed SR values are no larger than SS and
are monotone in the displayed unadjusted order; this is a visual consistency
check only. No historical simulation, Fortran routine, infant-level dataset,
Fisher-tail replay, or reproduction of Table 9's resampling was performed.

Final diagnostic output (exit 0):

```text
4 subjects, 2+2: observed ('5/2', '1')
without replacement B=6: ('1/6', '1/3')
with replacement B=256: ('3/64', '37/256')
729 tables: 8616 stop/adjustment checks; 25848 first-true checks PASS
ties, strict-alpha boundary, common-draw alignment, monotonicity mutations PASS
p.372: 252 allocations; P(T1*>=8)=1/2; single-step H2= 1/2 ; step-down= ('1/252', '1/252')
p.372 with-replacement lower bound via T1*>=5: 193/512
finite M=1 Bernoulli null: FWER=3/16 > alpha=1/20; no finite-M guarantee PASS
ALL BOUNDED TROENDLE DIAGNOSTICS PASSED
```

An initial development execution failed because this author's provisional
four-subject expected counts were wrong. They were corrected using the explicit
six-allocation list and independent pair-sum counting above; the algorithm was
not changed to satisfy those provisional values. This was an author-fixture
error, not a source or repository defect.

## 6. RSM-02 mapping and unchanged status

| Claim                                                               | Disposition within this investigation                                                                                                                                    |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| A step-down resampling method exists with joint dependence retained | Supported for the precisely identified Troendle multiple-outcome procedure                                                                                               |
| Ordered rejections and adjusted probabilities                       | Supported by (3)-(5) and p.375, with strict-boundary qualification                                                                                                       |
| Ideal strong FWER                                                   | Source-supported conditional on valid compatible joint null calibration; not numerical certification                                                                     |
| Practical asymptotic conservative control                           | Source Theorem 2 under fixed N0, growing pool N, with replacement, M-first limits and joint-null/integrability conditions; full general proof certification not supplied |
| Finite-M exact FWER                                                 | Not supplied; explicit finite counterexample to extrapolation                                                                                                            |
| General permutation-based all-pairs family                          | Not established by this two-group multiple-outcome paper                                                                                                                 |
| All Westfall-Young / Troendle / Romano-Wolf variants                | Not established; unread originals stay excluded under the approved source cap                                                                                            |
| Seeded runtime, numerical or deployment contract                    | Not established; TRANSFER and randomness-foundation requirements retained                                                                                                |

Troendle's distinct variants and limit regime are a possible future variant-
split topic, explicitly **unapproved**. No fixed catalogue entry is redefined.
Remaining scientific questions for any wider future claim include the precise
joint-law model, discrete critical-value conventions, unequal-size theorem,
N0=N asymptotics, finite-M calibration and a complete appendix proof audit.
None is converted into a new-original procurement requirement for this task.

| Disposition      | Members                                              | Count |
| ---------------- | ---------------------------------------------------- | ----: |
| CLOSED           | SR-B, SR-C, SR-D, SR-F, SR-G, SR-I, SR-J, SR-K, SR-L |     9 |
| PARTIAL          | SR-H                                                 |     1 |
| INPUT_INCOMPLETE | SR-A, SR-E, RSM-01, RSM-02                           |     4 |

Overall INPUT_INCOMPLETE and SOURCE_SET_READY=false remain. NARROW, TRANSFER,
all R3-CAND/RES-ONLY classifications, previous limited SR-D/SR-I/SR-J
acceptances and their residual conditions, SR-A/SR-E/SR-H boundaries, all other
holds and R4 are preserved. Parts A-AA, the Ge/SR-A receipts and prior numerical
guarantee withdrawal remain historical evidence with unchanged bytes. The
PR #174/#263/#265 numerical repair lane was not investigated, edited or judged.

## 7. Validation, output and provenance

This is author/investigator work assisted by OpenAI Codex in the present
conversation, with historical summaries and prior reports visible. It is not
a blind or independent-review verdict, a different-provider attestation, an
exact-model-build claim, or unaided human authorship. New PDF inspection and
calculations are distinguished from reused evidence. No subagents were used.
The separate statistical-methodology review gate is not self-certified here.

Environment: Python 3.12.14, Node v24.19.0, pnpm 11.19.0; dependencies installed
from the unchanged frozen lockfile. The manifest requests pnpm 11.7.0; the
available executable reports 11.19.0. This environment difference is disclosed.
Poppler pdfinfo/pdftotext/pdftoppm were used for inspection. Diagnostics have no
external Python dependencies or stochastic seed.

The four required repository checks, diagnostic, exact prefix and unchanged-
file checks are run on the submitted content; final statuses and immutable
output commit/tree/blob/length/SHA-256 identities are recorded in the draft PR
body to avoid self-referential hashes. Full pnpm check, typecheck, tests,
generated checks, prior statistical scripts and historical simulations are
not run. No authoritative artifact, schema, public tolerance, reference
implementation or release state changes.

Files added are this report, `check-troendle.py`, `check-preservation.py` and
`INDEPENDENT-REVIEW.md`; the only pre-existing modified file receives Part AB.
The review handoff is [INDEPENDENT-REVIEW.md](INDEPENDENT-REVIEW.md). It requests
an independent check of this bounded account and finite calculations using
the same supplied PDF, with a separate report and draft PR. No hold closure,
source substitution, method adoption, public authorization or merge follows.
