# Bounded SR-J primary-source follow-up

**Author investigation, 2026-09-09; independent review pending. SR-J remains
`INPUT_INCOMPLETE`.** Three available originals were inspected for MTO-02,
MTO-03 and MCB-01. Naik (1975) remains unread and required. This supplemental
record proposes source characterizations for review; it does not amend the
commission, accept a hold, select a method or implement Protocol behavior.

## 1. Authority, role and fixed inputs

The steward asked to proceed with unfinished primary-source verification. Part
N.4 permits a bounded SR-J investigation of supplier 42 while Naik is missing.
SR-F, SR-I and SR-D have since received their recorded follow-ups. This report
continues the author/coordinator context, assisted by OpenAI Codex. It is not an
independent investigator or a blind review of prior work. Prior reports, including
the Hsu reading in Part C and the supplied SR-D review history, were available.
No exact model build or independent model attestation is claimed. The present
source readings and mathematical arguments are author work, requiring a separate
investigator under governance/RFC.md before promotion.

| Fixed input                   | Identity                                                                                                  |
| ----------------------------- | --------------------------------------------------------------------------------------------------------- |
| Parent: PR 247                | `95683fc99403dc614e4722fb2ee7ab2760afed37`                                                                |
| Parent's sole parent: Part U  | `0624d98715706f1a940025407a91dccf9e8b3881`                                                                |
| Parent tree                   | `a767192529cd161f41a1784ad00bcfb7651ac614`                                                                |
| Parts A–U result blob         | `7f05c96ea2d45ddfcc762bc1f785652dce51f5c3`                                                                |
| Result bytes / SHA-256        | 466932 / `802ca0c5adfe8c489ba5365e694237d25e2d6d84a975cef15b20e4dd2fb9a376`                               |
| PR 247 report blob            | `da6172063d72b3799e1cd47884c496901a6843c7`                                                                |
| PR 247 report bytes / SHA-256 | 17531 / `d50ad6fb2fce7c2f399c27230da400d2912f59d8ce048c19b7e27be7efdbe882`                                |
| Commission blob at parent     | `3c7ddcc696f0c284213f7efe0da68e747bc238d7`                                                                |
| Fixed semantic comparison     | commit `7bd9c5ab854777c3e99e624d9d2ed62731228852`, result blob `8f21526040924b891f64724c2d0fde9ea94eff92` |

Paths for the result, commission and semantic comparison are respectively
`governance/drafts/release-3-preparation/semantic-source-acquisition-result.md`,
`governance/drafts/release-3-preparation/semantic-source-acquisition-commission.md`
and `governance/drafts/release-3-preparation/semantic-research-result.md`.
The prior review is `review-inputs/r3-srd-acceptance/REVIEW-RESULT.md`.
Git objects supplied the parent identities; PR 247 metadata still names this head.
The seven repository Read-first files were read and compared with fetched main
`ed6e9d9bde691556b99d22e261b31c3b25df338f`: identical blobs. No applicable
nested AGENTS.md was found. Only this report and `check-srj.py` are added.
This supplement preserves the commissioned result rather than declaring a new
completion Part before independent review and the outstanding-source decision.

## 2. Source custody and reading boundary

All three files were recovered from the user's previously supplied holdings.
They are existing custody entries, not three additional received items.

| Supplier / original        |   Bytes | PDF pages | SHA-256                                                            |
| -------------------------- | ------: | --------: | ------------------------------------------------------------------ |
| 42 / `42_Dunnett_1991.pdf` |  634124 |         9 | `ed93660e9e8286f1ff2e0026f972c783ac523ac96465e1689e17b4f99a960161` |
| 29 / `29_Dunnett_1992.pdf` | 1099979 |        10 | `f1144f4ca64d874d1d812cfc6b0b8f9d275d2251619796805d5ac955594386f6` |
| 05 / `05_Hsu_1984.pdf`     |  649578 |         9 | `ac190ceeb614141b64da413248d94e3a3cfe050ab42be31ef7b4dc8db089065b` |

Supplier 29 was extracted from the already supplied purchased archive
`03_\u51fa\u7248\u793e\u8cfc\u5165-20260907T075725Z-1-001.zip`, member
`03_\u51fa\u7248\u793e\u8cfc\u5165/29_Dunnett_1992.pdf`. Archive bytes: 13103742; SHA-256:
`7066b13da148d8d00034c053012f245f73583fbd51e6f7c6fa702f1f8d67c6c0`.
The archive and member names above use literal Unicode escapes for the original
non-ASCII characters. These identities match the existing custody record. PDFs, page images and full
extracted copyrighted text are not committed.

The complete extracted text of 42 and 29 was read. Supplier 05 is scanned: all
nine pages were rendered and OCR text read, with decision-bearing formulas
checked on images. Direct image checks were: 42 printed pp.941–943, 945–947;
29 pp.164–165, 168–170; 05 pp.1136–1141. This is not a claim that every page
received visual formula verification. Page mapping: 42 PDF page plus 938;
29 PDF pages 2–10 plus 160 (page 1 is a cover); 05 PDF page plus 1135.
Nonparametric and best-t extensions in Hsu pp.1140–1144 were read for scope,
not exhaustively re-proved or numerically implemented.

Bibliographic identities:

- Dunnett and Tamhane (1991), _Step-Down Multiple Tests for Comparing Treatments
  with a Control in Unbalanced One-Way Layouts_, Statistics in Medicine 10:939–947,
  DOI `10.1002/sim.4780100614`.
- Dunnett and Tamhane (1992), _A Step-Up Multiple Test Procedure_, JASA 87:162–170,
  DOI `10.1080/01621459.1992.10475188`.
- Hsu (1984), _Constrained Simultaneous Confidence Intervals for Multiple
  Comparisons with the Best_, Annals of Statistics 12:1136–1144,
  DOI `10.1214/aos/1176346732`.

## 3. Entry-level characterization proposed for review

| Entry         | Supported bounded characterization                                                                                                                                                                       | Excluded inference / remaining dependency                                                                                                                                                |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MTO-02 / C-J1 | Ordered many-to-one step-down testing under independent normal groups, common unknown variance and an independent pooled chi-square scale; unequal group sizes allowed; exact joint-t subset calibration | No Welch/heteroscedastic guarantee; no automatic across-endpoint or across-control-family control; Naik formulation and attribution unread                                               |
| MTO-03 / C-J1 | Step-up testing from least significant upward with a nondecreasing sequence calibrated by joint ordered-statistic events under the paper's common-correlation model                                      | Not the step-down maximum-quantile recursion; general existence and several power comparisons remain conditional/conjectural in the source; no established unequal-correlation extension |
| MCB-01 / C-J2 | Simultaneous constrained intervals for each treatment minus the best OTHER treatment; common continuous location family, equal sample sizes and calibrated pivotal event                                 | Best-other is not a fixed control or best-including-self; coverage is at least the target level, not equality everywhere; no generic zero-exclusion test or unique-best guarantee        |

All three remain `RES-ONLY`. These are proposed supplements to the earlier
snippet characterizations, not edits to the fixed catalogue or source tokens.
The generic phrase about multivariate-t calculations at shrinking subset sizes
needs refinement for MTO-03: its calibration uses an ordered-statistic event.

## 4. Dunnett–Tamhane 1991: rule, guarantee and numerical check

### 4.1 Model and ordering

Pages 940–943 assume independent normal treatment groups with common variance.
Let treatment 0 be the specified control. For one-sided comparisons use
`t_i = (x_i - x_0 - delta)/(s sqrt(1/n_i + 1/n_0))`; the two-sided rule orders
absolute statistics. The centered joint t vector has fixed pooled degrees of
freedom and correlations `R_ij = lambda_i lambda_j`, where
`lambda_i = sqrt(n_i/(n_i+n_0))`. Sorting observed statistics requires the same
permutation of labels, sample sizes and the correlation matrix. The random
components in a subset maximum are labelled statistics, not order statistics.

For increasing observed statistics, step m tests the largest remaining statistic
against the central maximum quantile of the first m labelled components, stopping
at the first nonrejection. Local tails `q_m` become adjusted p values by the
suffix maximum `p_m = max(q_r: r >= m)`. Page 941 uses strict critical-value
comparison while p.942 uses inclusive p-value comparison. Under the continuous
model the boundary has probability zero, but an implementation needs an explicit
convention. This report does not select a Protocol endpoint policy.

### 4.2 Author sufficient FWER argument

The paper states strong control on p.941 and cites earlier closure sources; the
following is a fresh author argument, not a recovered proof from Naik. Fix the
true-null set I. At the first true rejection, the remaining set R contains I.
The central maximum quantile for R is at least that for I, by inclusion of maximum
exceedance events. Under the one-sided composite null, couple true statistics to
the central vector with the same positive scale: nonpositive mean shifts can only
reduce each coordinate. Therefore the first true rejection implies that the
central maximum over I exceeds its level-alpha quantile. Its probability is at
most alpha. For two-sided point nulls, use absolute central statistics.
This argument does not condition on a data-selected subset distribution. It
requires valid joint calibration for each labelled subset and establishes neither
confidence intervals nor robustness to a misspecified covariance model.

### 4.3 Local versus adjusted Bonferroni upper bound

Page 942 describes `m p''_m` as an upper bound on adjusted `p_m`. The union bound
actually gives `q_m <= m p''_m`. The valid adjusted bound is the suffix maximum
of these marginal Bonferroni bounds (the Holm adjustment).
The paper's Table II itself distinguishes them: at m=1 its marginal value .109
is below adjusted .151. This is a concrete wording/formula-target problem, not
a finding that the correctly stopped step-down procedure lacks FWER control.

With Table II's rounded increasing statistics `[1.62,1.74,2.52,2.75,4.57]`,
sizes `[10,12,9,10,10]`, control size 11 and df 93, the attached author diagnostic
gives:

| Quantity            | Increasing-rank values                                          |
| ------------------- | --------------------------------------------------------------- |
| Local tails         | .108618427, .150451054, .036242938, .025396276, .000073152      |
| Adjusted tails      | .150451054, .150451054, .036242938, .025396276, .000073152      |
| .05 critical values | 1.985801814, 2.246333594, 2.391292357, 2.488934238, 2.562465052 |

The unadjusted Holm bound for m=1 is .108618427, below adjusted Dunnett .150451054;
the cumulative Holm bound is .170334133. Ranks 3–5 reject at .05.
All compared tails and critical values are within .001 of Tables II/III.
This is **not exact printed-decimal reproduction**: .150451 and .036243 round
differently from .151 and .037. The paper explains that more precise source data
were supplied than printed. No numerical erratum follows from recomputing rounded
statistics. The .001 threshold is an author diagnostic tolerance, not a Protocol
numerical requirement.

Integration conditions on a common normal factor and an independent chi scale,
using Hermite and generalized Laguerre quadrature. Orders 64 and 96 agree in
local tails within 2e-7; critical roots use order 96. This is convergence evidence
within one numerical construction, not certified error bounds or two independent
multivariate-t implementations. Marginal t tails and the union bound offer a
separate limited sanity check. No kernel or oracle is promoted.

### 4.4 Other limits

Page 942's average-correlation approximation has numerical support but no stated
analytical conservatism proof. The Bartlett nonrejection in the example does not
prove equal variances. The example has multiple response variables and comparison
families; the within-family calculations do not supply their joint error control.
Table IV's lower confidence bounds on p.946 use the single-step Dunnett method;
pp.946–947 explicitly describe the step-down procedure as testing only. Those
bounds must not be presented as intervals compatible with all step-down rejections.

## 5. Dunnett–Tamhane 1992: conditional scope of the step-up result

Pages 163–165 describe jointly normal estimates with common variance and common
correlation, and an independent chi-square variance estimate. Equal test-group
sizes with a possibly different control size give `rho=n/(n+n_0)`.
For the common-factor computational representation considered here use
`0 <= rho < 1`. At rho zero, finite-df t statistics still share a random scale;
they are not independent t variates.

For increasing observations, scan from the least significant upward. At the
first `t_i >= c_i`, reject that and every larger statistic. The constants are
nondecreasing and calibrated for each m by
`P(T_(j:m) < c_j for all j=1,...,m) = 1-alpha`. They are not the step-down
maximum quantiles. Adjusted step-up p values on p.168 use the corresponding
implicit calibrations and a prefix minimum, not a suffix maximum or ordinary
marginal-p multiplication.

Theorem 3.1's least-favourable configuration is stated on p.164; its proof is
referred to Dunnett–Tamhane (1990), Technical Report 90-1, not printed here.
The paper does not establish finite nondecreasing solutions for arbitrary m:
it discusses a two-variable result and numerical evidence. Proposition 3.1's
comparison with the Hochberg constants has a proof cited for m=2 and a conjecture
for larger m. The approximate use of step-down constants for larger m is identified
as liberal on p.165. Pages 169–170 leave unequal-correlation generalization and
conservatism of an average-correlation approximation for investigation.
Unqualified claims of arbitrary-family existence, general unbalanced applicability
or fully proved uniform superiority would exceed this inspected source.

### 5.1 Author sufficient control argument, assuming calibration

Fix the true set I of size m and write its ordered statistics V_j. Assume the
nondecreasing full sequence c exists, and the event `V_j < c_j` for all j has
probability at least `1-alpha` for every true set. On that event the step-up rule
cannot reject a true null. Indeed, at any first crossing of rank r followed by a
true null, let V_j be the first true statistic at or above that crossing. There
are at most r-1 earlier true statistics, so j <= r, and
`V_j >= t_r >= c_r >= c_j`, a contradiction. Equicorrelation supplies the same
central subset law for a given m. Nonpositive shifts preserve the one-sided
no-error event by coordinate and order-statistic monotonicity; two-sided point
nulls use the absolute central vector.

This is an author sufficient argument. It does not prove the source's exact
least-favourable theorem, existence for every m, the conjectured constant
inequality, or an unequal-correlation extension. The uninspected technical report
is disclosed as an imported proof dependency, not silently treated as read.

### 5.2 Bounded computational corroboration

The script compares Lemma 3.1's conditional iid order-event recursion with an
independently enumerated categorical probability for four threshold vectors,
including repeated thresholds. At rho zero with known variance and m=2,
`2ab-a^2=.95`, `a=.95`, gives `b=.975`, hence c2 approximately 1.95996, consistent
with Table I's 1.960. This special case is not finite-df independence or a general
existence test.

Using the printed Table VI constants and Table VII examples (rho .5, df 30,
alpha .05) yields:

| Increasing statistics              | Step-up rejected ranks | Step-down rejected ranks |
| ---------------------------------- | ---------------------- | ------------------------ |
| 1.50, 2.02, 2.25, 2.28, 2.32, 2.50 | 2–6                    | 6                        |
| 1.50, 2.00, 2.15, 2.30, 2.47, 2.50 | 4–6                    | 2–6                      |

Neither rejection set uniformly contains the other across these examples. These
are decision reproductions from printed critical constants. The full Table VII
adjusted p values and the general finite-df critical table were not independently
recomputed. No assertion of that stronger validation is made.

## 6. Hsu 1984: target, coverage and selection interpretation

Pages 1137–1139 assume independent equal-size samples from a common absolutely
continuous location family and translation-equivariant statistics. The target is
`theta_i - max(theta_j: j != i)`. It can be positive for a uniquely best treatment;
subtracting the maximum including i would instead always be nonpositive. The
unknown true best and the observed best are different indices.

The calibrated pivotal event on p.1138 has probability at least P*, with
`P* >= 1/k`, and the stated monotonicity/symmetry conditions on its region.
Theorem 3.1 gives simultaneous coverage **at least P*** for all parameter values.
It does not promise exact equality of coverage at every configuration.
For the simple parametric form, let
`Delta_i = Y_i - max(Y_j: j != i)`. The intervals are
`[min(Delta_i-d,0), max(Delta_i+d,0)]`, with d calibrated to the specified model
and scale. In the normal example, d uses the common variance estimate and the
integral calibration on p.1140; an arbitrary univariate t or Sidak constant is
not licensed.

A direct author verification of the parametric event implication is useful.
Choose a true best index b, put `e_i=Y_i-theta_i`, and suppose
`e_j-e_b <= d` for every j. For a nonbest i,
`Delta_i <= Y_i-Y_b <= theta_i-theta_b+d`, proving its lower bound; its upper
bound is at least zero, hence at least its nonpositive target. For b the lower
bound is at most zero. Also `Y_b-Y_j >= theta_b-theta_j-d` for each j, so its
upper bound covers its best-other target. Ties allow any true best b.
This proves pointwise event inclusion; probability coverage still requires valid
calibration of that event. The script checks 594 finite configurations including
ties. It is not a coverage simulation or verification of the nonparametric variant.

Every such constrained interval contains zero. Ordinary exclusion-of-zero testing
would therefore misinterpret the output. A zero upper bound can exclude strict
superiority under the simultaneous statement; p.1141 gives more careful subset
selection and indifference-zone interpretations. Neither a guaranteed unique
best nor an unconstrained all-pairs confidence family follows. MCB-01 remains a
selection-type research entry, distinct from a fixed-control hypothesis family.

## 7. Bibliographic resolution and missing original

Dunnett–Tamhane 1991 p.947 and 1992 p.170 both identify Marcus, Peritz and Gabriel
(1976), Biometrika 63:655–660. This supplies the precise reference-list evidence
requested by X-8. **Proposed resolution: the step-down reference maps to SRC-18;
no distinct additional Marcus source is indicated by these inspected lists.**
This is positive bibliographic evidence, not an assertion about an unseen author's
intent. Independent review should confirm the mapping before integrating an X-8
resolution into the cumulative result. It does not reopen or broaden SR-D's
accepted scope. No new reading of supplier 15 is claimed here.

The same reference lists establish Naik, U. D. (1975), _Some selection rules for
comparing p processes with a standard_, Communications in Statistics 4:519–535.
This addresses X-3's bibliographic identification, not the article's contents.
The publisher lookup resolves DOI `10.1080/03610927508827267`:
<https://www.tandfonline.com/doi/pdf/10.1080/03610927508827267>.
The attempted PDF retrieval returned HTTP 403 and an HTML response (6063 bytes),
not an original. Search of the available supplied holdings did not recover it.
No conclusion about every possible access route follows.

**Minimum next acquisition request:** Naik's article pp.519–535 (17 printed
pages), including its assumptions, selection rules, guarantee arguments and
references. No whole book or unrelated volume is needed. Questions are: which
rule and family it actually defines; whether and under what assumptions it
supports the step-down attribution; what guarantee it proves versus imports;
and how its formulation relates to MTO-02. Until inspected, these are unanswered.
The 1991 article supports its own bounded construction but does not silently
replace the assigned Naik original. No reduced-scope waiver is requested here.
If access remains unavailable, a later explicit proposal can separate this
historical/original-formulation obligation from the available 1991 construction.

Additional proof dependencies named in Section 5 are not silently added as new
commissioned requirements. They become acquisition targets if their stronger
claims are required; otherwise the conditional characterization must remain.

## 8. Findings and disposition

- **Source-completion blocker:** required Naik original unread. SR-J stays
  `INPUT_INCOMPLETE`, not `PARTIAL` or `CLOSED`.
- **Correction for integration:** distinguish the 1991 local Bonferroni upper
  bound from its cumulative adjusted bound (Section 4.3). This is supported by
  the printed table and a fresh calculation; it does not invalidate the method.
- **Required narrowing for integration:** preserve the 1992 calibration and
  existence assumptions, uninspected proof dependency, conjecture and unbalanced
  extension boundaries. Do not conflate its ordered-event recursion with step-down.
- **Interpretation boundary:** preserve Hsu's best-other estimand, at-least
  coverage and constrained-interval selection interpretation.
- **Bibliographic proposal:** X-3 identity established from two original reference
  lists; X-8 maps to SRC-18 on that evidence, pending independent integration review.

The ledger remains 8 CLOSED (SR-B, SR-C, SR-D, SR-F, SR-G, SR-I, SR-K, SR-L),
1 PARTIAL (SR-H), 5 INPUT_INCOMPLETE (SR-A, SR-E, SR-J, RSM-01, RSM-02).
Overall `INPUT_INCOMPLETE`, `SOURCE_SET_READY=false`, `NARROW`, `TRANSFER`,
all `R3-CAND`/`RES-ONLY` tokens, the scoped SR-D and SR-I acceptances, custody
42+1 and R4 remain unchanged. This report neither accepts a source substitution
nor establishes readiness for public opening.

## 9. Reproduction and validation

Run `python3 review-inputs/r3-srj-primary-followup/check-srj.py` with NumPy and
SciPy. Actual environment: SciPy 1.17.0. The script completed with
`ALL BOUNDED SR-J DIAGNOSTICS PASSED`; its values are reported in Sections 4–6.
It is a small author diagnostic, not the repository reference implementation.
The quadrature, tolerances and limited finite checks are disclosed above.

Repository checks: `pnpm format:check` exit 0 (all matched files formatted);
`pnpm lint:markdown` exit 0 (361 files, zero issues); direct
`node --import tsx tooling/src/validate.ts` exit 0; `git diff --cached --check`
exit 0 (no output). The first validator run rejected the non-ASCII original
archive name; it was represented with reversible Unicode escapes and rechecked.
Full
`pnpm check`, tests, typecheck, generated checks, Phase 1/2 suites and prior
statistical diagnostics are not claimed; no authoritative artifact changes.

## 10. Executable independent-review handoff

Use a separate investigator context. The new draft PR body supplies its immutable
full head, tree and two blob identities; those values, not a moving branch, pin
this packet. Review instructions:

1. Fetch that full head, verify its sole parent is
   `95683fc99403dc614e4722fb2ee7ab2760afed37`, and check out the head detached.
   Confirm exactly this report and `check-srj.py` are added versus the parent.
   Re-derive Section 1's fixed identities and confirm Parts A–U and all prior
   artifacts unchanged. Read the repository Read-first files, commission,
   result Parts N and U, and this report. Disclose prior authorship/context.
2. Obtain the three original attachments in Section 2 and verify full hashes,
   bytes and page counts. In a new environment attach `42_Dunnett_1991.pdf`,
   `29_Dunnett_1992.pdf` and `05_Hsu_1984.pdf`; do not substitute snippets or
   unverified downloads. If originals are unavailable, report the bounded gap.
3. Independently inspect the pinpointed passages. Check the 1991 labelled
   subset rule, adjusted p recursion, Table II upper-bound counterexample,
   model and CI limits. Recompute enough to challenge the .001 corroboration
   and distinguish rounded inputs from a claimed numerical erratum.
4. Check the 1992 calibration event, recursion and decision examples. Challenge
   the author's sufficient proof and every existence/conjecture/generalization
   boundary against pp.164–165 and 169–170. Do not infer that the cited 1990
   proof was inspected. Check Hsu's target, theorem premises, event inclusion,
   ties and selection interpretation directly on pp.1137–1141.
5. Verify the two reference lists for Naik and Marcus. Evaluate X-3/X-8 proposals
   separately from content completion. Keep Naik required and unread; no waiver,
   hold acceptance or method selection is authorized by this review.
6. Run the script and the four repository checks in Section 9, recording versions,
   actual outputs and omissions. Independent calculations should challenge claims,
   not merely rerun author assertions. Report BLOCKER / SHOULD-FIX / NICE-TO-HAVE
   and a verdict for this bounded author record, distinct from SR-J completion.
7. Create neutral branch `review/r3-srj-primary-followup-20260909` from the pinned
   author head. Add an English review at
   `review-inputs/r3-srj-primary-followup/INDEPENDENT-REVIEW.md`; commit and open a
   separate draft PR with base `research/r3-srj-primary-followup-20260909`.
   Pin its parent/tree/blob/bytes/SHA-256, recheck the reviewed head, disclose
   independence limits and do not create a session-labelled mirror or merge.
