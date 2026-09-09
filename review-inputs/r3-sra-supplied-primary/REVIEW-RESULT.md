# Bounded SR-A source investigation and receipt of the Ge review

2026-09-09. Author/coordinator record, not an independent review verdict.

## 1. Instruction, review receipt and fixed inputs

The steward supplied a separate-session review of PR #262 at
`09a75be0f3549d75e74ee7226b476a9d71480cb0`: GO for the bounded author record,
with BLOCKER 0, SHOULD-FIX 0 and NICE-TO-HAVE 0. The review reports direct Git
object/parent/prefix checks, PDF identity and page-image checks, independent
proof assessment, and independent enumeration of the Ge example. Its reported
absolute statistics are (16,11,7), raw p-values (1/10,1/5,1/10), adjusted maxT
(1/10,1/5,1/5) and adjusted minP (1/10,1/5,1/10). It independently obtains
FWER=1/10 at alpha=1/20 for the changed-subset-law counterexample.

This is an English receipt summary of the review supplied in the conversation,
not a newly authenticated signed report or a new rerun of those calculations.
The reviewer expressly reports historical summaries and prior reading of the
author report, separate-session non-blind work, and no attested different-provider
or model review. The reviewer did not run repository validation, edit files,
create a review commit/PR, inspect PR #174, or determine that the formal
independence gate was satisfied. Those limits are retained. This receipt does
not inflate the simple review into full execution of the former Section 8
delivery requirements, a comprehensive Ge review or hold acceptance.

The steward then instructed this continuation to proceed while PR #174 and its
associated independent work continue separately. The approved supplied-corpus
cap in Part Y remains effective. No new original is sought, no scope approval
is requested again, and PR #174 is neither inspected nor changed here.

The sole parent of the new research branch is the reviewed PR #262 commit above:
tree `fbcf46ac67f444161f96e1a158c1b3e88dc53328`, whose sole parent is
`72e4dd3b71868cf6423dfefa231751a03a1b2161`. The cumulative Parts A-Y result
is blob `9d4cf4b5b8a7159fd51f7c4275a0292a81acbcdc`, 533740 bytes, SHA-256
`2436a534c665a10f4e5625fa7183be0839b6cda8805ac125a8118ce9e41a6d1a`.
The Ge report remains blob `6092ab5a856673c414c02f04478373fd8492ba89`,
23698 bytes, SHA-256
`7d796eee5851998add56aef23bd2ef9ffa8544c27437fb8ddab76f1e0274632f`;
its script remains blob `aa7664372c125e37e8cfc5a9c2ae8b97e44a70bb`.
The acquisition commission remains blob
`3c7ddcc696f0c284213f7efe0da68e747bc238d7`. Fixed catalogue comparisons use
`semantic-research-result.md`, blob `8f21526040924b891f64724c2d0fde9ea94eff92`.

## 2. Supplied originals and inspection

| Supplier / mapping   | Identity                                                                                                                                                         | Bytes / PDF pages | SHA-256                                                            |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------ |
| 08 / SRC-10 / OMN-03 | G. S. James (1951), The Comparison of Several Groups of Observations When the Ratios of the Population Variances are Unknown, Biometrika 38(3/4):324-329.        | 523245 / 7        | `34d14510ddcd10b0a5e90f21412b78e1d03359358ff0ae50c86bd93c83b62145` |
| 33 / SRC-11 / OMN-04 | Morton B. Brown and Alan B. Forsythe (1974), The Small Sample Behavior of Some Statistics Which Test the Equality of Several Means, Technometrics 16(1):129-132. | 518538 / 5        | `bba8ba4d8b105b47194a20704a5967b32e2ea5447f2587986ebbca5a298a6124` |

All sizes, page counts and hashes were recomputed and match Part D's custody
table. James was recovered as the previously supplied PDF. Brown-Forsythe was
recovered from the previously supplied publisher-purchase ZIP already used in
the SR-J work; no new purchase or retrieval from a publisher occurred. Its member
is the received `33_Brown_1974.pdf`. Both PDFs contain one supplier cover;
James PDF pages 2-7 are printed pp.324-329 and Brown-Forsythe PDF pages 2-5
are printed pp.129-132. All ten article pages were read in extracted text and
as page images, including formulas, notes and references. Cover text was checked.

The Brown-Forsythe cover prints DOI `10.1080/00401706.1974.10489158` and an
online posting date in 2012. The article itself is the February 1974 issue;
2012 is not treated as its original publication year. No external DOI check
was performed. Copyrighted PDFs, page images and extracted text are not committed.

Welch (1951), supplier 07 / SRC-09, is reused through the existing Part C
record, especially pp.330, 334-335 and equations (29)-(30). It is not newly
read here. The original custody count remains 42 numbered originals plus one
corrigendum; reuse and recovery do not add originals.

## 3. Claim and variant map

| Entry  | Source-supported scope                                                                                                                                              | Guarantee and output boundary                                                                                                                                                                | Investigation result                                                                                                                                          |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| OMN-01 | Brown-Forsythe pp.129-130 restate the usual one-way ANOVA statistic and exact F law under independent normal observations, equal means and common variance.         | This is an inspected restatement; it does not authenticate the excluded Scheffe/Fisher-lineage assignment or introduce a new primary-basis decision.                                         | Historical formulation/lineage remains outside the capped task; no new OMN-01 acceptance.                                                                     |
| OMN-02 | Previously recorded Welch omnibus; Brown-Forsythe p.130 independently prints its inverse-variance weighting, denominator correction and approximate denominator df. | One global equality-of-means test, approximate F reference; not exact finite-sample control under arbitrary heteroscedasticity.                                                              | Supports the recorded distinction; no new review of supplier 07.                                                                                              |
| OMN-03 | James pp.324-329 give an estimated-inverse-variance quadratic statistic, first-order critical correction (43), and second-order expansion (41)-(42).                | Independent normal estimates and independent scaled-chi-square variance estimates. Approximation in inverse variance-estimate df; the paper does not establish convergence of the expansion. | Supports and narrows the catalogue's first/second-order label. First-order algebra is checked below; full second-order proof/implementation is not certified. |
| OMN-04 | Brown-Forsythe p.130 gives the modified F statistic, sample-size weighting and Satterthwaite denominator df.                                                        | Approximate global means test under the stated independent normal model; empirical robustness evidence does not imply a universal finite-sample level bound.                                 | Direct construction supported, with the separate James-summary conflict retained.                                                                             |

All four are one-member omnibus tests of a global equality null in this mapping.
Rejecting that null does not identify an individual differing pair or supply
simultaneous intervals, FWER-controlled follow-up tests, directional conclusions
or a data-dependent choice between procedures. This paper's modified F is not
the Brown-Forsythe test of equality of variances based on transformed deviations.
Likewise, the BF labels in other previously inspected multiple-comparison papers
are not interchangeable with this omnibus F-star.

## 4. James: statistic, correction orders and limitations

Use g groups, r=g-1, independently normal estimates x_i with common-null mean
mu and variances a_i^0. Let a_i be mutually independent variance estimates,
independent of all x_i, with nu_i a_i/a_i^0 distributed as chi-square(nu_i).
For independent sample means, a_i=s_i^2/n_i and nu_i=n_i-1. The original also
describes regression-coefficient comparisons under the same abstract independence
conditions; no general correlated-regression procedure is inferred.

Set w_i=1/a_i, u=sum w_i, x_w=sum(w_i x_i)/u, and

```math
Q=\sum_i w_i(x_i-x_w)^2,\qquad
S=\sum_i\frac{(1-w_i/u)^2}{\nu_i}.
```

James (44), p.329, uses Q without division by g-1. With the true weights known,
the corresponding quadratic form is chi-square(r), p.324 (2)-(3). With estimated
weights and finite nu_i this exact statement does not carry over. For a specified
upper-tail probability alpha, let q be the chi-square(r) upper-alpha point. The
first-order truncated critical value from (43) is

```math
C_1(q)=q\left[1+\frac{3q+(g+1)}{2(g^2-1)}S\right].
```

The corresponding diagnostic compares Q with C_1. If J=Q/r is used instead,
the same rule compares J with C_1/r. The paper's O(nu^-2) remainder is not an
implemented numerical adjustment, a uniform error certificate or an exact
probability identity for the truncated rule.

For second order, p.328 (41) prints additional inverse-df terms; p.329 (42)
defines R_st=sum_i nu_i^-s (w_i/u)^t and the scaled chi-square-power notation
X_(2s)=q^s/[r(r+2)...(r+2s-2)]. In particular X_2=q/r and
X_4=q^2/[r(r+2)], not powers of a new random statistic. The second-order rule
uses Q and a critical boundary depending on the variance estimates, alpha and
g. It is not merely a fixed chi-square tail applied to Q, a new ordinary F df,
or the first-order rule under another name.

The paper's p.329 qualification is decisive: the manner of convergence of the
full expansion is not known. Its k=2 agreement with Welch is stated there;
this pass does not claim a newly verified full second-order reduction. The
note added in proof also discusses alternative adjusted-weight constructions;
these are not automatically included in the fixed OMN-03 member description.
The full operator expansion, fourth derivatives, all coefficients of (41), and
a certified second-order numerical inversion remain outside this result's
guarantee. The available source establishes their formulation and intended
approximation order; this is not a complete proof audit of those coefficients.

An author algebra check connects the first correction in (40), (41) and (43):
put p=r/2 and zeta=q/2 in
`h1=(1/4)[3*zeta^2/(p*(p+1))+zeta/p]*S`. Then q+2*h1 equals C_1.
Independently the first correction in (41), `(1/2)*(3*X_4+X_2)*S`, gives the
same expression. The diagnostic checks this identity with exact rationals.

## 5. Brown-Forsythe modified F and comparison to Welch

Write N=sum n_i, x_N=sum(n_i x_i)/N, and

```math
A=\sum_i n_i(x_i-x_N)^2,\quad
D=\sum_i(1-n_i/N)s_i^2,\quad F^*=A/D.
```

The denominator degrees of freedom printed on p.130 are

```math
c_i=\frac{(1-n_i/N)s_i^2}{D},\qquad
f_B=\left[\sum_i\frac{c_i^2}{n_i-1}\right]^{-1}.
```

The reference is F(g-1,f_B). There is no extra factor g-1 in A/D.
For comparison, using Q and S above with nu_i=n_i-1, the Welch formula printed
on the same page is

```math
W=\frac{Q/(g-1)}{1+2(g-2)S/(g^2-1)},\qquad
f_W=\frac{g^2-1}{3S}.
```

The calculations here require n_i>1 and positive finite sample variances for
the inverse-variance formulas. A convention for zero variances, missing groups
or singular input is not invented from these sources.

Author explanation of the denominator: under equal means, independence gives
E(A)=sum_i(1-n_i/N)*sigma_i^2=E(D). Under normality,
Var(D)=2*sum_i[(1-n_i/N)*sigma_i^2]^2/(n_i-1). Matching these denominator
moments with a scaled chi-square and inserting s_i^2 gives f_B. Equal
expectations do not turn A/D into an exact F pivot under arbitrary variances;
the numerator need not be proportional to a chi-square(g-1). This derivation
explains the printed approximation, not a new proof of universal calibration.

For g=2, algebra reduces Q, W and F-star to
`(x_1-x_2)^2/(s_1^2/n_1+s_2^2/n_2)`, and both denominator dfs to the familiar
two-term moment-matching expression. This verifies the paper's two-group
reduction without requiring its unread Wang citation. For equal sample sizes
F-star's statistic equals ordinary ANOVA F, but its df need not equal N-g when
the observed sample variances differ. Equal population variances do not imply
identical observed variances. Neither statement makes Welch and F-star the same
general g-group procedure.

## 6. Decision-bearing conflict in the printed James summary

### 6.1 Normalization mismatch, directly visible on p.130

Brown-Forsythe define J=Q/(g-1), but their following display compares J to
C_1(q), not C_1(q)/(g-1). Their prose defines q as the chi-square(g-1)
percentile. All three features were checked in the page image. James (43)-(44)
instead compare Q to C_1(q). Thus the two literal formulations differ for g>2.

For a concrete admissible summary, take n=(11,11,11), means=(0,1,1), and
sample variances=(1,1,1). Then Q=22/3, J=11/3 and S=2/15. At alpha=.05,
q=-2*log(.05)=5.9914645471 and C_1=7.0886212175. The James-source rule rejects
because 7.3333>7.0886, whereas the literal printed J rule does not because
3.6667<7.0886. The equivalent J-scale cutoff is 3.5443106087.

As nu_i grow, Q tends to chi-square(g-1) under the model, S tends to zero and
the literal printed rule tends to Q>(g-1)*q. For g=4 at nominal .05, that tail
is approximately 0.00003262726712, not .05. This confirms the normalization
problem without reproducing the historical Monte Carlo experiment.

The author resolution for this investigation is explicit: use James (43)-(44)
for the first-order construction and preserve the Brown-Forsythe display as a
source-level mismatch. Removing division in J or dividing the cutoff by g-1
would make the scales agree, but neither is silently substituted into the
historical paper. No claim is made about which rule its authors actually coded.
No corrected Table 1 or publisher erratum is issued. This is a block on literal
reuse of that display and on attributing the historical J simulation to a
verified implementation; it does not invalidate the separately printed F-star.

### 6.2 Different James reference

Brown-Forsythe p.132 reference [2] names James (1951), Tests of linear hypotheses
in univariate and multivariate analysis when the ratios of the population
variances are unknown, Biometrika 38:19-43. Supplier 08 is the differently titled
article at pp.324-329. The supplied first-order formula has the correction
structure seen in Brown-Forsythe, but this is not proof that the two James papers
are the same text or that the complete cited paper has been inspected.
The pp.19-43 article is not acquired under the corpus cap. Its content and the
precise citation history remain excluded. No source identifier is renumbered.

### 6.3 Simulation and interpretation limits

Brown-Forsythe pp.130-132 report 10,000 normal-data replicates per condition,
sizes, powers and overlapping rejection regions. Their comparisons and sample-size
recommendations are empirical findings from those configurations, not a theorem
for all variance/sample-size ratios or nonnormal distributions. The J comparison
uses a first-order-looking cutoff, not the full James second-order expansion;
the literal normalization issue prevents an unqualified implementation attribution.

No historical simulation was rerun. As a limited transcription consistency
check, the four equal-variance rows of Table 3 yield total rejection percentages
(F,F-star,W) of (4.91,5.08,5.00), (68.55,67.63,64.98),
(55.31,54.44,52.30), and (33.62,33.34,31.78). The three pairwise decompositions
agree internally and are compatible with Table 2's one-decimal entries.
This checks arithmetic and displayed rounding only, not Monte Carlo validity.

## 7. Author diagnostic and actual results

Run `python3 review-inputs/r3-sra-supplied-primary/check-sra.py`.
The script uses Fraction for formula identities and table sums. SciPy 1.17.0
supplies explicitly labelled illustrative tails; the df=2 chi-square percentile
is independently checked against -2*log(.05). Its 1e-14 comparison and the
half-last-decimal table check are diagnostic comparisons, not Public Check
tolerances or certified numerical error bounds.

Actual output, exit 0:

```text
two-group Welch / modified-F reductions: 24 cases PASS
James (40), first-order part of (41), and (43): 15 rational cases PASS
translation / scale invariance and balanced statistic equality PASS
unequal example Q,S,W,Welch_df,Fstar,Fstar_df,ANOVA_F:
['9', '14641/162240', '2920320/663601', '432640/14641', '359/102', '9987840/250897', '1077/400']
illustrative approximate p(W), p(Fstar): 0.021238039072521017 0.03913078327086987
normalization witness Q=22/3, printed J=11/3, S=2/15
James first-order cutoff: 7.088621217492878
James Q rejects; literal Brown-Forsythe printed J does not PASS
literal printed J large-df size for g=4: 3.2627267119809065e-05
Table 3 sums (F,Fstar,W): [[4.91, 5.08, 5.0], [68.55, 67.63, 64.98], [55.31, 54.44, 52.3], [33.62, 33.34, 31.78]]
Table 3 agrees internally and with Table 2 printed rounding PASS
SciPy: 1.17.0
ALL BOUNDED SR-A DIAGNOSTICS PASSED
```

The unequal example uses n=(11,16,21), means=(0,1,2), and variances=(1,4,9).
Both approximate p-values are below .05, but different. Exact rational
translation and common-scale checks, balanced-sample statistic checks and the
two-group identities guard specific normalization/weighting risks. They do not
constitute a general proof audit or independent primary-source pass.

## 8. Dispositions, provenance and validation boundary

The investigation adds direct evidence for OMN-03 and OMN-04 and compares it
with reused OMN-02 evidence. It does not declare the excluded OMN-01 lineage
requirement fulfilled or claim that reading an expansion certifies its complete
numerical implementation. The fixed SR-A disposition remains INPUT_INCOMPLETE;
the active supplied-source reading task for 08/33 is completed within the
stated bounds, with the normalization conflict and second-order limits exposed.

The effective ledger remains 9 CLOSED / 1 PARTIAL / 4 INPUT_INCOMPLETE:
CLOSED SR-B,C,D,F,G,I,J,K,L; PARTIAL SR-H; incomplete SR-A, SR-E, RSM-01,
RSM-02. SOURCE_SET_READY=false, overall INPUT_INCOMPLETE, NARROW, TRANSFER,
all R3-CAND/RES-ONLY classifications, accepted SR-D/SR-I/SR-J limits, other
holds, inventory 42+1 and R4 remain unchanged. Neither this continuation nor the
received Ge GO determines public-discussion readiness or touches PR #174.

This is OpenAI Codex-assisted author/coordinator work in the continuing context.
Prior reports, custody records and the new conversational review are reused with
their limits. New source inspection, algebra and diagnostics are identified
above. No verified model build or satisfied formal independence gate is claimed.
No new source-cap approval, hold acceptance, method adoption or merge occurs.

Part Z and the PR body record the four required repository checks, prefix/unchanged
file verification and output identities. This change adds this report and its
diagnostic and appends only Part Z to the cumulative result. No authoritative
artifact, dependency lockfile, schema, public tolerance or production behavior
changes. Full pnpm check, tests, typecheck, generated checks, prior statistical
scripts, historical simulation and a complete James second-order oracle are
not run. No original-source text or images are published in the repository.

## 9. Next limited review: executable instruction

Fetch the full submitted commit from this PR's body and verify its sole parent
is `09a75be0f3549d75e74ee7226b476a9d71480cb0`. Read AGENTS.md, its ordered
Read-first documents, the acquisition commission, Part Z and this report.
Verify only the three stated paths change, the 533740-byte Parts A-Y prefix is
preserved, and all Ge/earlier reports and fixed inputs remain unchanged.

Use only the supplied 08_James_1951.pdf and 33_Brown_1974.pdf, verifying the
hashes and page offsets in Section 2. Inspect the decision-bearing original
formulas, James p.329 approximation caveat, Brown-Forsythe p.130 J definition
and cutoff, and p.132 reference [2]. Independently check the first-order
conversion, the scale-mismatch witness, modified-F moment argument, two-group
reduction and Table 3 sums. Run the author diagnostic as supplementary evidence.
Assess whether the distinction between formulated and fully verified second-order
claims is sufficiently explicit; do not infer a second-order certificate.

Review the received Ge review account as a faithful receipt, not another Ge
scientific review or a finding about its formal independence merits. Do not
inspect, edit or judge PR #174 or its associated work. The corpus cap is already
approved: do not request reapproval, obtain missing James pp.19-43 or other new
originals, close holds, merge, or determine release readiness. Any unsupported
claim should be narrowed explicitly, not repaired with an unprovided citation.

Return an English GO / REPAIR_REQUIRED / INSUFFICIENT_EVIDENCE assessment for
this bounded author record, severity counts, original-page evidence, independent
calculations, omissions and involvement/provider/context disclosure. If creating
a repository report, use a neutral review branch from the exact input and a
separate draft PR targeting this research branch; run format:check,
lint:markdown, the direct validator and diff --check. No session-labelled mirror.

After review and any bounded repair, the next available-source resampling
candidate is supplier 30, Troendle (1995), already listed in Part D's received
inventory. Its presence in the existing purchase ZIP was observed while
recovering supplier 33; its text was not inspected in this pass. Part Y excluded
Troendle from that pass, not from the received corpus. Any future work remains
a separately described RSM-02 variant investigation, not a universal family
definition or an instruction to obtain new originals.
