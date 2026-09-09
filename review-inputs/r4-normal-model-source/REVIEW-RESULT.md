# Release 4 Normal-Model Source - Independent Source and Preparation Review

**Status: informative independent review; non-normative; not adopted.**

## 1. Verdict

| Dimension                          | Result                                                                                                                                                                                                                                                                                                                                                              |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Input integrity                    | **`MATCH`**: source input commit, sole parent, input tree and all six blobs match the handoff; the delivery commit adds exactly the handoff file and one README paragraph (Section 3)                                                                                                                                                                               |
| Attachment identity                | **`MATCH`**: supplied PDF is 127754 bytes, SHA-256 `baeb2fcb…ebbd49`, nine pages printed 2659-2667, Tian and Styan (2006), DOI `10.1016/j.jspi.2004.09.016` (Section 4)                                                                                                                                                                                             |
| Preservation                       | **`INTACT`**: only the seven handoff-listed paths differ between the parent and the delivery; the PR 240 review blob, every earlier probe/result, review, authority, registry, schema, conformance, generated and evidence artifact is byte-identical (Section 3)                                                                                                   |
| Source copy and access             | **`AVAILABLE`**, supplied copy; custody beyond the supplied bytes is supplier statement, not observed (Section 4)                                                                                                                                                                                                                                                   |
| Source sufficiency, retained claim | **`GO`** (bounded): the supplied paper corroborates the identity-covariance quadratic-form criteria the retained claim uses, and the explicit derivation supplies the rest; the paper itself proves none of the probability facts, and the record must say so per claim (S-A, Sections 5-6)                                                                         |
| Derivation correctness             | **`GO`**: contrasts, sign columns, four rank-one projectors, `PE` of rank `4(n-1)`, SS identities, individual-null annihilation with nuisance effects unrestricted, chi-square/independence law, gamma-ratio Jacobian, `F(1, nu)` density, its normalization and the upper-tail meaning all independently re-derived and checked in exact arithmetic (Sections 6-8) |
| Reproduction                       | **`REPRODUCED`**: the author probe returns the same three rows and 147 checks (values identical; only JSON whitespace differs from the Prettier-formatted committed file); reviewer-side fixtures with a nonzero interaction and three nuisance-null means, written without the author's functions, agree (Section 8)                                               |
| Boundaries                         | No unsupported post-quantization or conditional-on-admission guarantee found; zero-SSE, positive common variance, unequal-variance and shared-denominator limits are stated correctly; no familywise or interval claim is made (Section 7)                                                                                                                          |
| Parent prose repairs (PR 240)      | S-1 through S-4 and N-1 through N-4 **`CONFIRMED`** at the parent's exact text, with one cosmetic nit (Section 10)                                                                                                                                                                                                                                                  |
| Staging of S1/S2/P1/S3/S4/S6       | Scope-specific **nonblocking** disposition supportable for each item for this bounded opening; no hold is closed and no commission is erased (Section 9)                                                                                                                                                                                                            |
| Opening candidate                  | **`NOT_READY`**; no R4-P6 opening GO. R4-P5 clause/ID/surface/tier work and the assembled-proposal review remain undone (Section 11)                                                                                                                                                                                                                                |
| Findings                           | 0 `BLOCKER`, 1 `SHOULD-FIX`, 4 `NICE-TO-HAVE` (Section 12)                                                                                                                                                                                                                                                                                                          |

The bounded source GO covers one proposition: in the stated fixed-factor
`2 x 2` model with `n >= 2` units per cell, independent `N(0, sigma^2)` errors and
`sigma > 0`, each of the three full-model contrast statistics `F_j = nu*SS_j/SSE`
with `nu = 4(n-1)` has the central `F(1, nu)` distribution under its own null
`Delta_j = 0`, with the other effects and the intercept unrestricted. It does not
close S5 as a ledger item, does not adopt a method, allocates no identifier and
opens no discussion window.

## 2. Independence, roles and boundary

- **Commission.** `governance/drafts/release-4-preparation/normal-model-review-handoff.md`
  at delivery commit `c78d4d27163ccc6128712e1818dc6a0562695515` (blob
  `5c7c42a9da62147d305bf1564d3980514e9888f2`), reached through the branch locator
  `research/r4-normal-model-source`, which pointed at that commit when fetched
  on 2026-09-09. The user supplied the handoff link and the PDF in the task message.
- **Reviewer.** An Anthropic model, `claude-fable-5-1`, in Claude Code remote session
  `session_016nuoZmpjBu2Hzo7R1PUtPx` (container CLI 2.1.266, `anthropic_cloud`
  environment). The session service reported both `session_context.model` and
  `external_metadata.last_served_model` as `claude-fable-5-1`. Exact model-build
  identity beyond that identifier is not available as authenticated runtime metadata.
- **Author.** The reviewed increment records OpenAI Codex assistance in the existing
  authoring context with no separate investigator. The reviewer shares no context with
  that authoring session.
- **Prior involvement.** None. This session had not read, reviewed or authored any part
  of the input, the handoff, the parent or the PDF before this review. Earlier
  `review-inputs/r4-*` records name the same model identifier in other sessions.
  Independence is at the model, provider and work-context level relative to the
  author. It is not human-investigator independence and is not claimed as such.
- **Assistance.** No other model, service or person contributed. Code executed: the
  repository's own validation tooling; the author probe unchanged; two reviewer-written
  Python scripts (Section 8 and Appendix A). PDF text extraction and page rendering used
  PyMuPDF 1.28.2; exact algebra used Python `fractions`; Monte Carlo used NumPy 2.4.6.
- **Not performed.** No source acquisition, download attempt, purchase, external message,
  access-control circumvention, merge, RFC action, identifier allocation, Release 3
  change, hold closure or steward decision. The supplied copy was not re-downloaded,
  as the handoff instructs for a matching copy.

## 3. Exact identity and preservation

All objects were verified with `git cat-file`, `git ls-tree`, `git rev-parse` and
`git diff` against the fetched branch.

| Object                                       | Expected (handoff)  | Observed    |
| -------------------------------------------- | ------------------- | ----------- |
| Source input commit                          | `332322d6ae6eb5c6…` | match       |
| Sole parent                                  | `e59d2aaa43a28857…` | match       |
| Source input tree                            | `0341849e8386396…`  | match       |
| `README.md`                                  | `26ee96a27beecabe…` | match       |
| `public-discussion-readiness.md`             | `25363f361fea94f0…` | match       |
| `normal-model-source-result.md`              | `de33be2fe92548a5…` | match       |
| `normal-model-opening-scope.md`              | `e59c35ff45e0650a…` | match       |
| `probes/normal-model-projection.py`          | `b6b664c85a66fc4e…` | match       |
| `probes/normal-model-projection-result.json` | `53658f4640e4bbbe…` | match       |
| Delivery commit `c78d4d27…`, tree            | not stated          | `7b73295c…` |
| Delivery README blob                         | not stated          | `7ff4133b…` |
| PR 240 review blob at parent and delivery    | `13fb1e0fb63c96cd…` | unchanged   |

- `e59d2aa..332322d` adds four files (`normal-model-opening-scope.md`,
  `normal-model-source-result.md`, the probe and its result) and modifies `README.md`
  and `public-discussion-readiness.md`: 439 insertions, 0 deletions, as the handoff says.
- `332322d..c78d4d2` adds `normal-model-review-handoff.md` and one README paragraph
  linking it: 108 insertions, 0 deletions.
- `git diff --name-only e59d2aa..c78d4d2` lists exactly those seven paths. Nothing
  under `review-inputs/`, `authority/`, `registries/`, `spec/`, `schemas/`,
  `conformance/`, `generated/`, `evidence/`, `reference/` or `tooling/` differs.
- The handoff's statement that the pinned input validates standalone is correct:
  `pnpm validate` on a clean checkout of `332322d` passes (Section 13).

## 4. Attachment identity, custody and pages inspected

| Item                 | Observed by the reviewer                                                                                                                                                                                                                  |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Filename as received | `40c987bc-tian2006.pdf` (the upload channel prefixed the handoff's `tian2006.pdf`); identity rests on bytes, not on the name                                                                                                              |
| Bytes                | 127754                                                                                                                                                                                                                                    |
| SHA-256              | `baeb2fcbf82c80e9843ade396919845df42b73657d5fae3b28bce23434ebbd49`                                                                                                                                                                        |
| Pages                | 9 (PyMuPDF page count); printed folios 2659-2667 in the running heads                                                                                                                                                                     |
| Embedded metadata    | PDF 1.4; Title `doi:10.1016/j.jspi.2004.09.016`; Creator `Elsevier`; Producer `Acrobat Distiller 6.0.1 (Windows)`; creation and modification date `2006-03-27T17:07:04+05:30`; no encryption                                              |
| First-page identity  | Yongge Tian and George P. H. Styan, "Cochran's statistical theorem revisited", Journal of Statistical Planning and Inference 136 (2006) 2659-2667; received 3 November 2002, accepted 24 September 2004, online 24 December 2004          |
| Custody              | Supplied by the user through the task attachment channel. Download operator, URL, date and any relation to the earlier ResearchGate web retrieval are supplier statements or unknown; the reviewer observed only the bytes above          |
| Text inspection      | All nine pages extracted and read                                                                                                                                                                                                         |
| Image inspection     | PDF pages 1, 5, 6, 7 and 8 (printed 2659 and 2663-2666) rendered at 150 dpi and read as images for the identity block, the criteria paragraph, (2.1)-(2.4), Lemma 2.2 with (2.9)-(2.10), Corollary 2.3 with (2.11)-(2.18) and Theorem 2.4 |

The source-result's identity table (bytes, hash, pages, DOI, dates) agrees with these
observations. Its custody row correctly withholds an acquisition route. The PDF is not
committed to the repository, as the handoff requires.

## 5. What the supplied paper establishes, restates and cites

Read against the page images and text:

| Passage                                              | Character                                                                                                                                                                                                                                                                                                                                                                  | Use by the retained claim                                                                                        |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| p. 2659, "Cochran's theorem"                         | Restated classical result, attributed to Cochran (1934, p. 179); not proved here                                                                                                                                                                                                                                                                                           | Framing only                                                                                                     |
| p. 2660, matrix version and Lemma 1.1                | Restated prior results attributed to Anderson and Styan (1982)                                                                                                                                                                                                                                                                                                             | Framing only                                                                                                     |
| pp. 2661-2662, Theorem 1.2, (1.3)-(1.10)             | New matrix result with a complete block-rank proof; (1.7)/(1.8) rank identities                                                                                                                                                                                                                                                                                            | Not used                                                                                                         |
| p. 2663, first paragraph                             | Probability criteria stated as "well known" and cited to Ogasawara and Takahashi (1951), Styan (1970), Scarowsky (1973), Dumais (2000); solutions cited to Baksalary et al. (1980): for `X ~ N_n(0, Sigma)`, `X'AX` is chi-square iff `Sigma A Sigma A Sigma = Sigma A Sigma`, and `X'AX`, `X'BX` are independent iff `Sigma A Sigma B Sigma = 0`. Not proved in the paper | Corroborates, with `Sigma = I`, the criteria the derivation satisfies (`P_j^2 = P_j`, `PE^2 = PE`, `P_j PE = 0`) |
| pp. 2663-2665, Theorem 2.1, Lemma 2.2, Corollary 2.3 | New matrix results for rectangular `M`; proofs by block-rank operations                                                                                                                                                                                                                                                                                                    | Not used; the retained claim uses identity covariance and a direct coordinate argument                           |
| p. 2666, Theorem 2.4                                 | Application of Corollary 2.3 with `M = Sigma`; its probability content is the cited p. 2663 criteria. States no degrees of freedom, no noncentrality and no ratio distribution                                                                                                                                                                                             | Corroborates the same criteria; supplies no degrees-of-freedom count and no F law                                |

Consequences for the evidence map:

- The paper is an original matrix-rank contribution. Every probability statement in
  it is either attributed (p. 2659, p. 2660) or cited as well known (p. 2663, reused in
  Theorem 2.4). The supplied copy therefore proves none of the distributional facts the
  retained claim needs; it corroborates the two criteria in their identity-covariance
  form.
- The degrees-of-freedom identification (`1` and `nu`), the chi-square densities, the
  numerator/denominator independence as a density factorization, the F ratio density and
  the upper-tail meaning are supplied only by the author's explicit derivation, which
  this review re-derived and confirms (Section 6). The source-result already says the
  factorial application is author work; it does not yet say, claim by claim, that the
  paper contributes only the cited criteria. Finding S-A asks for that sentence.
- The rank identities (1.3), (1.4), (2.3) and (2.4) were additionally checked in exact
  arithmetic on 40 random integer instances each (Appendix A, `theorem_check.py`); all
  40 hold in each case. This is informative confidence in the transcription, not a
  review of the paper's proofs, which the retained claim does not use.

### 5.1 The displayed `D`/`Dm` notation in (2.10)

The page-2664 image confirms the author's observation: the first and second
block matrices displayed for (2.10) print `D` and `D - P_m M Q_m` in their middle
blocks, while the surrounding definitions (2.1)-(2.2), the parallel display (2.9)
and the final line of (2.10) itself use `D_m`. This is in the printed source, not an
extraction artifact.

Bounded assessment: with `M` of size `n x p` and each `A_i` of size `p x n`, the
`D` of (1.1) has `p x n` diagonal blocks while `P_m M Q_m` has `n x n` blocks, so
`D - P_m M Q_m` is not dimensionally defined unless `n = p`; the display is
consistent only when read as `D_m`, which is what the equation's own last line
states. The reviewer records this reading as an observation about that display and
does not repair the source. Nothing in the retained bounded claim depends on (2.9),
(2.10), Lemma 2.2 or the general `Sigma` case, so no finding is extended to
arbitrary covariance matrices.

## 6. Independent reconstruction of the derivation

Everything below was re-derived by the reviewer from the model statement, then
checked in exact rational arithmetic with reviewer-written code (Section 8).

1. **Model and targets.** Cells `00, 01, 10, 11` in declared order, `n >= 2` units per
   cell, `N = 4n`, `Y = mu + e` with `e ~ N(0, sigma^2 I_N)`, `0 < sigma < inf`. With
   `Delta_A = (-mu00-mu01+mu10+mu11)/2`, `Delta_B = (-mu00+mu01-mu10+mu11)/2`,
   `Delta_AB = mu00-mu01-mu10+mu11`, the sample versions replace each `mu` by its cell
   mean; each cell mean is unbiased for its `mu`, so each `d_j` is unbiased for
   `Delta_j` with the same weights. Correct.
2. **Sign columns and coefficients.** `v0, vA, vB, vAB` as stated, each entry
   repeated `n` times per cell, have Gram matrix `N I_4` (verified for
   `n = 2, 3, 5, 7`). Least squares on these columns gives `beta_A = Delta_A/2`,
   `beta_B = Delta_B/2`, `beta_AB = Delta_AB/4` at the population mean and the same
   factors applied to `d_A, d_B, d_AB` at the sample. Correct, and consistent with the
   parent's S-4 repair.
3. **Projectors and ranks.** `P_j = v_j v_j'/N` is symmetric, idempotent, rank one;
   `P_j P_k = 0` for `j != k`; `PE = I - sum P_j` is symmetric, idempotent, annihilates
   all four columns, has trace and rank `N - 4 = 4(n-1)`, and `P0+PA+PB+PAB+PE = I`.
   All hold for every `n` by the orthogonality of the four columns; finite checks agree.
4. **SS normalization.** `Y'P_A Y = n d_A^2`, `Y'P_B Y = n d_B^2`,
   `Y'P_AB Y = n d_AB^2/4`, `Y'PE Y = sum (Y_ck - m_c)^2`. Verified symbolically and
   on two independent rational fixtures. `SS0 = Y'P0 Y` is the grand-mean part of the
   uncentered total; `SS_A+SS_B+SS_AB+SSE` equals the centered total. The source-result's
   warning against conflating these is correct.
5. **Individual nulls with nuisance unrestricted.** For `H_j: Delta_j = 0`, the
   population mean lies in the span of the other three columns, so `P_j mu = 0` while
   `P_k mu != 0` for the others is permitted; `PE mu = 0` always in the full model.
   Hence `Y'P_j Y = e'P_j e` and `Y'PE Y = e'PE e` exactly, for each `j` separately.
   Verified on three nuisance-null means with large nonzero non-target coefficients and
   an arbitrary added error vector. A global-null computation is not what is used and
   would not suffice; the derivation does not rely on one.
6. **Joint law.** With `Z = e/sigma ~ N(0, I_N)`, choose an orthonormal basis whose
   first vector is `v_j/sqrt(N)`, next `nu` vectors span `range(PE)`, remaining three
   span the other columns. The orthogonal change of variables has absolute Jacobian one
   and preserves `||z||^2`, so the standard normal density factorizes into `N`
   independent standard normal coordinates `W`; `Z'P_j Z = W_1^2` and
   `Z'PE Z = W_2^2 + ... + W_{nu+1}^2` are disjoint sums, hence independent chi-square
   with `1` and `nu` degrees of freedom. Correct. The paper's `Sigma = I` criteria
   (`P_j` idempotent, `PE` idempotent, `P_j PE = 0`) are satisfied and agree.
7. **Gamma-ratio Jacobian and density.** With `U ~ Gamma(1/2, 2)`,
   `V ~ Gamma(nu/2, 2)` independent and `F = nu U / V`, substituting `U = rV/nu` with
   Jacobian `V/nu` and integrating over `V > 0` gives, with `a = 1/2`, `b = nu/2`,
   `f(r) = Gamma(a+b)/(Gamma(a)Gamma(b)) * nu^(-a) * r^(a-1) * (1+r/nu)^(-(a+b))`.
   The reviewer's own integration reproduces this exactly; it equals the standard
   `F(1, nu)` density. Substituting `t = (r/nu)/(1+r/nu)` gives the beta integral, so the
   density integrates to one; numerically, total mass is `1` to within `1e-14` for
   `nu = 4, 8, 16, 24`. The upper-tail value `P(F >= f_obs)` is the integral from the
   observed exact `F` to infinity; the distribution is continuous, so `>=` and `>`
   coincide. No numerical algorithm or tolerance is selected, as the input states.
8. **Chi-square density.** The polar-coordinate route from `k` squared standard
   normals to `Gamma(k/2, 2)` is a correct elementary derivation and is not claimed to
   be in the paper.

Facts, inference and decision, per `governance/RFC.md` item 4: the **facts** taken
from the supplied source are the two identity-covariance quadratic-form criteria as
cited, well-known results; the **inference** is the entire derivation in items 1-8,
which is author work verified here; the **decision** is the project's choice of these
three contrasts, this normalization and this bounded model, which is a project
convention and is labelled as such in the input.

## 7. Boundaries and non-claims

| Boundary                                 | Assessment                                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Zero SSE                                 | Probability zero in the continuous model since `nu >= 4`; correctly retained as a possible represented input with unresolved runtime disposition. `F` is undefined there; no distributional claim is made for it                                                                                                                                                       |
| Positive common variance                 | Required and stated; `sigma` cancels only because it is common to all `N` errors                                                                                                                                                                                                                                                                                       |
| Unequal variances                        | With `Sigma = diag(4, 1, ..., 1)` the reviewer checked `Sigma P_A Sigma PE Sigma != 0` and `Sigma P_A Sigma P_A Sigma != Sigma P_A Sigma`, so both paper criteria fail; Monte Carlo shows `P(F_A > 4)` of `0.191` versus `0.116` (`n = 2`) and `0.091` versus `0.063` (`n = 5`) under a true `Delta_A = 0`. The input's negative control is correct in substance (N-B) |
| Shared denominator                       | Correct that pairwise independence does not give joint independence: under the global null with `nu = 4`, `corr(F_A, F_B) = 0.31` while `corr(SS_A, SS_B) = 0` in 400000 replications; `0.065` at `nu = 16`. No familywise, FDR or joint claim is made in the input                                                                                                    |
| Idealized reals versus binary64          | The proof is about exact reals; the input says so and says it gives no runtime accuracy or computability certificate. No post-quantization or conditional-on-admission guarantee is asserted anywhere in the six files                                                                                                                                                 |
| Intervals and significance booleans      | Excluded from the proposed first claim set; nothing in the input implies one                                                                                                                                                                                                                                                                                           |
| Causal, randomization, historical claims | None made; the contrasts are defined directly                                                                                                                                                                                                                                                                                                                          |

## 8. Reproduction and reviewer-side finite checks

- **Author probe.** `python3 governance/drafts/release-4-preparation/probes/normal-model-projection.py`
  on Python 3.11.15 returned the same three rows (`n = 2, 3, 5`; residual df `4, 8, 16`;
  SS `20402/441, 5408/441, 2/49`; `10201/147, 2704/147, 3/49`;
  `51005/441, 13520/441, 5/49`; SSE `18/25, 392/75, 1496/25`) and `49 + 49 + 49 = 147`
  checks. Parsed JSON is identical to the committed result; the raw text differs only
  because the committed file is Prettier-formatted (arrays on one line).
- **Reviewer script** (`reviewer_check.py`, SHA-256 `b43e4a2b…`, Appendix A), written
  without importing the author's module and with its own matrix product, exact rank,
  quadratic form and projector code:
  - Exact checks for `n = 2, 3, 5, 7`: Gram matrix, symmetry, idempotence, ranks, mutual
    annihilation, `PE` annihilation of all columns, trace, SS identities, uncentered and
    centered totals.
  - **Nonzero-interaction fixture**: population cell means `(3, 5, 4, 11)` giving
    `Delta = (7/2, 9/2, 5)`, with within-cell rational noise; `Y'P_AB Y = n d_AB^2/4`,
    `mu'P_AB mu = 25n/4 != 0`, `PE mu = 0`, coded coefficients `Delta_A/2, Delta_B/2,
Delta_AB/4` recovered by least squares.
  - **Nuisance-null fixtures**: for each target the coefficients `(9, -7, 13, -5)` with
    the target set to zero; the target contrast is `0`, the other two are nonzero,
    `mu'P_target mu = 0`, `mu'PE mu = 0`, other components positive, and adding an
    arbitrary error vector leaves the target and residual quadratic forms equal to the
    error-only values.
  - Unequal-variance negative control in the paper's own criterion form (Section 7).
  - Density mass and pointwise values of the derived `F(1, nu)` density.
  - Monte Carlo, 400000 replications, `sigma = 1.7`, `Delta_A = 0` with
    `intercept = 10`, `beta_B = 3`, `beta_AB = 2.5`: the empirical CDF of `F_A` matches
    the derived CDF at seven points to within `0.0015` (`n = 2`) and `0.0015` (`n = 5`),
    consistent with a binomial standard error of about `0.0008`; `corr(SS_A, SSE)`
    is `-0.001` and `0.001`; the non-null `F_B` and `F_AB` reject at `F > 4` with
    frequency above `0.96`.
- Output: `reviewer_check_result.json`, SHA-256 `883a70b7…`. Rank-identity check:
  `theorem_check.py`, SHA-256 `05a8967e…`, 40/40 for each of (1.3), (1.4), (2.3), (2.4).

Role: the all-`n` proof in Section 6 is the evidence for the claim; these finite
checks are reviewer corroboration and negative controls. They are not production
conformance fixtures, not an oracle and not a runtime algorithm.

## 9. Adversarial staging assessment, one item at a time

For each hold: which retained claim depends on it, and the scope-specific disposition.

| Item                                         | Retained claim that would depend on it                                                                                                                                                              | Finding                                                                                                                                                                                                                                                                                                  | Scope-specific disposition                                                                                                          |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| S1 Yates (1937)                              | Only a historical attribution or a general-factorial design claim                                                                                                                                   | None retained: the contrasts are defined directly; a search of the six files finds no Yates attribution or broad-design claim (the only mention is in the staging table). The `dAB/2` "factorial-effect convention" sentence in readiness names a convention without attributing it, and decides nothing | Nonblocking for this opening; the original-source obligation stays open for the wider programme                                     |
| S2 Williams (1952)                           | Only an interpretation of interaction beyond `Delta_AB = 0`                                                                                                                                         | None retained: the interaction enters as a null hypothesis and a signed estimate only                                                                                                                                                                                                                    | Nonblocking; full-text investigation stays a separate research item                                                                 |
| P1 Dasgupta, Pillai, Rubin                   | Only a randomization/potential-outcome claim or use of its formula as a normalization oracle                                                                                                        | None retained: the opening scope excludes randomization assertions; normalization is defined by the project and the ambiguous formula is not used                                                                                                                                                        | Nonblocking; version/formula reconciliation stays open and unresolved                                                               |
| S3 Type I-IV, S4 heteroscedastic/permutation | Only if the exclusion rationale claimed those procedures invalid or relied on their mappings                                                                                                        | The exclusion is scope bounding; both files say exclusion is not a validity finding; the unequal-variance control shows why the bounded proof does not extend, not that alternatives are wrong                                                                                                           | Nonblocking; wider-procedure holds preserved without prejudice                                                                      |
| S6 two-system comparison                     | The readiness hold table defines S6 as the two-system **unbalanced** comparison; a balanced retained claim would depend on it only if a software disagreement were used to justify the narrow scope | No exclusion rationale in the input cites software behaviour; the staging proposal is coherent with the hold's own definition. Independent oracles for balanced Candidate A numeric expectations remain a separate AGENTS.md implementation obligation that S6 staging does not touch (N-C)              | Staging alongside the unbalanced programme is supportable for this opening; steward disposition required; S6 is not marked executed |
| S5 classical calibration                     | The retained `F(1, nu)` claim itself                                                                                                                                                                | Bounded GO in Section 5-6 with the source/derivation split made explicit (S-A). No concrete uncovered probability premise remains for the bounded claim; intervals are outside it                                                                                                                        | Positive bounded source assessment supplied; ledger closure is a steward disposition, not this review's act                         |

Rejected staging would need a concrete dependency; none was found. Accepting the
staging does not complete any wider commission, and this review does not close any of
S1-S6 or P1.

Remaining evidence gap, stated exactly: no inspected primary passage proves (i) that an
orthogonal change of variables factorizes the standard normal density into independent
coordinates, (ii) the chi-square density of a sum of squared standard normals, or
(iii) the density of `nu U/V` for independent chi-squares. All three are elementary and
were verified here. If the steward requires a printed primary source for them rather
than an independently verified derivation, adequate options are the cited Cochran (1934)
for the decomposition and any primary treatment of the `F` distribution; the reviewer
does not impose a named-paper requirement.

## 10. Parent prose repairs: S-1 through S-4, N-1 through N-4

Checked at the parent `e59d2aa` against `git diff 2192cf2..e59d2aa` and the PR 240
findings text. The PR 240 review blob is unchanged, and the repair record
(`opening-preparation-repair.md`, blob `7a4f64ae…`) correctly says these are responses,
not self-issued close verdicts. This is a separate editorial judgment; it is not the
source verdict above and the earlier `NOT_PERFORMED` source status of PR 240 is not
altered by it.

| Finding | Confirmation                                                                                                                                                                                                                                                                                                                                                           |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| S-1     | **`CONFIRMED`**: `rfc-preparation-draft.md` now date-qualifies the unresolved placement as the PR 227 audit state and points to the concrete Contract/Profile/Public Check proposal awaiting acceptance                                                                                                                                                                |
| S-2     | **`CONFIRMED`**: the inventory's Contract admissibility row now owns "the mathematical model premises required by the operation"; the Profile row owns "the producer's declaration that the Contract-defined premises apply"; the added paragraph states a declaration is not evidence that premises hold. One owner per meaning                                       |
| S-3     | **`CONFIRMED`**: `spec/contracts/` is disclosed as a proposed new convention; `spec/README.md` layout and the manifest `normative-meaning`/`json-structure` assignments are listed as coupled changes                                                                                                                                                                  |
| S-4     | **`CONFIRMED`**: readiness now says "signed sample estimates", "sample cell means", that they estimate population contrasts under review, gives the -1/+1 coding and all three coded coefficients `dA/2, dB/2, dAB/4`; the algebra was re-checked (Section 6, item 2). The applicability declaration does not redefine the model; inspection has not become acceptance |
| N-1     | **`CONFIRMED`**: successor Record schema named as owner of the direct JSON Contract-identity binding and claim-object fields; conditional R3 reuse stays unsettled                                                                                                                                                                                                     |
| N-2     | **`CONFIRMED`** in substance: the claim map now says two retrievals of a dynamic page need not be byte-identical, and requires raw and extracted forms with hashes and missing-form disclosure. Cosmetic: the sentence begins "Two" after a semicolon (N-D)                                                                                                            |
| N-3     | **`CONFIRMED`**: navigation links and destination files are added together; the fixed input `332322d` validates standalone                                                                                                                                                                                                                                             |
| N-4     | **`CONFIRMED`**: the review-state table has rows for the scaling original review (`431ac4e6…`, review `4137e490…`) and close review (`a45590d5…`, review `3332083e…`) with the C-1 author-repair/steward-acceptance boundary                                                                                                                                           |

## 11. Opening candidate assessment

| Subject                              | Assessment                                                                                                                                                                                                                                                                          |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scope proposal                       | Concrete and internally consistent: three marginal `F(1, 4(n-1))` upper-tail quantities with signed estimates; intervals, booleans, multiplicity, randomization, historical, unbalanced, missing-cell, random/mixed, correlated and robust items excluded without invalidity claims |
| Conditional R3 reuse                 | Correctly kept conditional: no R3 multiplicity procedure, protected-family identifier or issued interface is consumed; the pinned R3 comparison must be repeated before R4-P4 disposition. Unchanged from the parent; no new dependency introduced                                  |
| Contract/Profile/schema/Public Check | The scope document's ownership paragraph matches the repaired inventory (Contract: operation/model/target meaning; Profile: applicability declaration; successor schema: direct binding and shape; Public Checks: versioned comparison rules)                                       |
| Preservation of old meanings         | Stated: Welch bundles, requirements, schemas, comparison outputs and fixtures keep their meanings; EXPERIMENTAL only where higher-tier meaning is preserved. Consistent with AGENTS.md                                                                                              |
| R4-P1                                | Advanced for the bounded `F` calibration by this review, subject to the steward's S-A/S5 disposition; intervals remain outside; still open                                                                                                                                          |
| R4-P2                                | A reviewable scope now exists; not accepted; open                                                                                                                                                                                                                                   |
| R4-P3                                | Unchanged; the exact-real proof adds no runtime evidence                                                                                                                                                                                                                            |
| R4-P4                                | Pinned R3 comparison repeat still required; open                                                                                                                                                                                                                                    |
| R4-P5                                | Explicitly incomplete: clause/ID allocation, enclosing Record/report surface, strict-input crosswalk and highest affected tier are not done; no duration can be assigned                                                                                                            |
| R4-P6                                | No assembled-proposal review has occurred; this review is not one                                                                                                                                                                                                                   |
| Public opening                       | **`NOT_READY`**. The bounded source GO does not produce an opening GO                                                                                                                                                                                                               |

## 12. Findings

### BLOCKER

None.

### S-A (`SHOULD-FIX`) - state per claim what the paper contributes and what the derivation contributes

`normal-model-source-result.md`, "What the paper supplies, and what is derived here"
and "Null calibration": the text says the application is author work and calls the
setting "the identity-covariance setting of the paper's quadratic-form statements". It
does not say that the paper proves none of the probability facts used: the p. 2663
criteria are cited to Ogasawara and Takahashi (1951), Styan (1970), Scarowsky (1973)
and Dumais (2000) as well known, and Theorem 2.4 states no degrees of freedom, no
noncentrality and no ratio law. Add one explicit map: paper (as cited criteria with
`Sigma = I`) versus derivation (degrees of freedom, chi-square densities, independence
factorization, `F` density, tail meaning). The steward's S5 disposition is
decision-bearing and should rest on that accurate split. No value or derivation step
in the input is wrong.

### N-A (`NICE-TO-HAVE`) - record the (2.10) dimension observation alongside the notation note

The source-result correctly reports the `D`/`Dm` display and declines to adjudicate it.
Adding the bounded observation from Section 5.1 (the `D` of (1.1) is dimensionally
incompatible with `P_m M Q_m` when `n != p`, and the equation's own final line uses
`D_m`) would let a later reader see why the retained claim is unaffected without
consulting the page image again.

### N-B (`NICE-TO-HAVE`) - name the paper's criterion in the unequal-variance control

The probe tests `P_A Sigma PE != 0`; Theorem 2.4(b) is stated as
`Sigma A Sigma B Sigma = 0`. The two are equivalent here because `Sigma` is invertible,
which the probe does not say. One sentence, or testing the criterion in the paper's
form, keeps the negative control readable against the source.

### N-C (`NICE-TO-HAVE`) - say that S6 staging does not stage balanced-case oracles

`normal-model-opening-scope.md`, "Treatment of existing source and comparison
obligations": add that independent numerical oracles for any balanced Candidate A
fixture remain an AGENTS.md implementation obligation, separate from the S6 unbalanced
comparison being staged, so staging cannot later be read as waiving them.

### N-D (`NICE-TO-HAVE`) - capitalization in the repaired N-2 sentence

`opening-claim-map.md`: "…needs its own traceability; Two independent retrievals…"
begins a clause with a capital after a semicolon. Cosmetic, from the parent repair.

## 13. Validation record

Environment: Node v22.22.2, pnpm 11.7.0, `pnpm install --frozen-lockfile`;
Python 3.11.15, NumPy 2.4.6, PyMuPDF 1.28.2.

| Check                               | Delivery `c78d4d2` (tree `7b73295c…`)                                                                       | Fixed input `332322d` (tree `0341849e…`, clean checkout) |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `pnpm format:check`                 | pass                                                                                                        | pass                                                     |
| `pnpm lint:markdown`                | pass (394 files, 0 issues)                                                                                  | pass (393 files, 0 issues)                               |
| `pnpm typecheck`                    | pass                                                                                                        | pass                                                     |
| `pnpm validate`                     | pass                                                                                                        | pass                                                     |
| `pnpm check:generated`              | pass (19 generated files match)                                                                             | pass (19 generated files match)                          |
| `git diff --check e59d2aa..c78d4d2` | clean                                                                                                       | -                                                        |
| Author probe rerun                  | 147 checks, values identical to committed JSON                                                              | same file                                                |
| Aggregate `pnpm check`              | not run; no authoritative, registry, schema, conformance, reference, generated or evidence artifact changed | -                                                        |

After adding this review file the same five repository checks were re-run on the
review branch; the result is recorded in the review pull request.

## 14. Bounded verdict

| Item                                              | Disposition                                                                                                                                                         |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fixed input `332322d…` (six files) and PDF        | Input **`MATCH`**; attachment **`MATCH`**; preservation **`INTACT`**                                                                                                |
| Delivery commit `c78d4d27…`                       | Validated; accurate description of the input, the attachment and the standalone-validation claim                                                                    |
| Source copy                                       | Available as supplied bytes; custody beyond that is supplier statement                                                                                              |
| Source sufficiency for the retained bounded claim | **`GO`** (bounded) with S-A: paper corroborates the identity-covariance criteria; the derivation, verified here, supplies the rest; the exact residual gap is named |
| Derivation correctness                            | **`GO`**: no error found; every step independently re-derived and finitely checked                                                                                  |
| Reproduction                                      | 147/147 author checks; reviewer fixtures and negative controls agree                                                                                                |
| Parent prose repairs                              | S-1 through S-4, N-1 through N-4 **`CONFIRMED`**                                                                                                                    |
| Staging S1/S2/P1/S3/S4/S6                         | Scope-specific nonblocking disposition supportable; steward disposition required; nothing closed                                                                    |
| S5                                                | Positive bounded source assessment supplied; not closed by this review                                                                                              |
| R4-P1 through R4-P6                               | Open; R4-P1 advanced for the bounded `F` calibration only                                                                                                           |
| Public opening                                    | **`NOT_READY`**; no R4-P6 opening GO                                                                                                                                |
| Next items                                        | S-A repair; steward S5/staging disposition; R4-P5 clause/ID/surface/tier completion; pinned R3 comparison repeat; assembled-proposal R4-P6 review                   |

RELEASE 4 NORMAL-MODEL SOURCE REVIEW COMPLETE - INPUT MATCH - ATTACHMENT MATCH - BOUNDED SOURCE GO WITH ONE SHOULD-FIX - DERIVATION GO - 147 CHECKS REPRODUCED - PR 240 REPAIRS CONFIRMED - NO HOLD CLOSED - NOT AN OPENING GO - NOT READY TO OPEN - NEW-SESSION REVIEW DISCLOSED - NOT MERGE APPROVAL - NOT PROTOCOL ADOPTION

## Appendix A. Reviewer scripts (informative, not authority)

`reviewer_check.py` (SHA-256 `b43e4a2ba831e803f1c7c6b0c317bc25d4b0b9c1a397ce3207f293ece53dd7dc`)
was run as `python3 reviewer_check.py`; its output hash is recorded in Section 8.
`theorem_check.py` (SHA-256 `05a8967ea15cf197a5c240cb156db63407acdc025786a02439a36b99ae94b840`)
imports the matrix helpers from it and checks the paper's four printed rank identities
on random integer matrices with exact fractions. The first script is reproduced here
verbatim so the record is self-contained.

```python
"""Reviewer-side independent checks. Informative research only, not authority.

Written without importing the author's probe. Exact rational arithmetic for the
algebra; float Monte Carlo only for the distributional sanity check.
"""
from fractions import Fraction as Fr
import json
import math
import sys

import numpy as np


# ---------- exact linear algebra (own implementation) ----------
def matmul(a, b):
    n, m, p = len(a), len(b), len(b[0])
    return [[sum(a[i][k] * b[k][j] for k in range(m)) for j in range(p)] for i in range(n)]


def transpose(a):
    return [list(r) for r in zip(*a)]


def rank_exact(a):
    """Row-reduce with exact fractions (own implementation)."""
    m = [list(r) for r in a]
    rows, cols = len(m), len(m[0])
    r = 0
    for c in range(cols):
        pivot = None
        for i in range(r, rows):
            if m[i][c] != 0:
                pivot = i
                break
        if pivot is None:
            continue
        m[r], m[pivot] = m[pivot], m[r]
        pv = m[r][c]
        m[r] = [x / pv for x in m[r]]
        for i in range(rows):
            if i != r and m[i][c] != 0:
                f = m[i][c]
                m[i] = [x - f * y for x, y in zip(m[i], m[r])]
        r += 1
    return r


def qform(v, a):
    av = [sum(a[i][j] * v[j] for j in range(len(v))) for i in range(len(v))]
    return sum(v[i] * av[i] for i in range(len(v)))


def design(n):
    N = 4 * n
    # cell order 00,01,10,11 ; xA = (-1,-1,1,1) ; xB = (-1,1,-1,1)
    xa = [-1, -1, 1, 1]
    xb = [-1, 1, -1, 1]
    v0 = [Fr(1)] * N
    vA = [Fr(xa[c]) for c in range(4) for _ in range(n)]
    vB = [Fr(xb[c]) for c in range(4) for _ in range(n)]
    vAB = [Fr(xa[c] * xb[c]) for c in range(4) for _ in range(n)]
    return N, [v0, vA, vB, vAB]


def projector(v):
    N = len(v)
    s = sum(x * x for x in v)
    return [[v[i] * v[j] / s for j in range(N)] for i in range(N)]


def identity(N):
    return [[Fr(int(i == j)) for j in range(N)] for i in range(N)]


def cell_means(y, n):
    return [sum(y[c * n:(c + 1) * n]) / n for c in range(4)]


def contrasts(m):
    dA = (-m[0] - m[1] + m[2] + m[3]) / 2
    dB = (-m[0] + m[1] - m[2] + m[3]) / 2
    dAB = m[0] - m[1] - m[2] + m[3]
    return dA, dB, dAB


def exact_checks(n):
    N, cols = design(n)
    # Gram matrix: N on the diagonal, 0 elsewhere
    gram = [[sum(a * b for a, b in zip(u, w)) for w in cols] for u in cols]
    assert gram == [[Fr(N if i == j else 0) for j in range(4)] for i in range(4)]
    P = [projector(v) for v in cols]
    I = identity(N)
    PE = [[I[i][j] - sum(p[i][j] for p in P) for j in range(N)] for i in range(N)]
    allP = P + [PE]
    zero = [[Fr(0)] * N for _ in range(N)]
    for i, p in enumerate(allP):
        assert transpose(p) == p, "symmetric"
        assert matmul(p, p) == p, "idempotent"
        assert rank_exact(p) == (1 if i < 4 else N - 4), "rank"
        for j, q in enumerate(allP):
            if i != j:
                assert matmul(p, q) == zero, "mutual annihilation"
    # PE annihilates every full-model column
    for v in cols:
        assert [sum(PE[i][j] * v[j] for j in range(N)) for i in range(N)] == [Fr(0)] * N
    # trace(PE) = N-4 = rank
    assert sum(PE[i][i] for i in range(N)) == N - 4

    # Fixture 1: NONZERO interaction population mean, plus nonzero A, B, intercept,
    # with within-cell rational noise so SSE > 0.
    mu_cells = [Fr(3), Fr(5), Fr(4), Fr(11)]  # DeltaAB = 3-5-4+11 = 5 != 0
    y = [mu_cells[c] + Fr((-1) ** k * (k + 1), 7) + Fr(c, 11) for c in range(4) for k in range(n)]
    m = cell_means(y, n)
    dA, dB, dAB = contrasts(m)
    SS = [qform(y, P[1]), qform(y, P[2]), qform(y, P[3])]
    SSE = qform(y, PE)
    assert SS == [n * dA ** 2, n * dB ** 2, n * dAB ** 2 / 4], "SS identities"
    assert SSE == sum((y[c * n + k] - m[c]) ** 2 for c in range(4) for k in range(n))
    assert SSE > 0
    # Uncentered total decomposition, and centered total excludes SS0
    SS0 = qform(y, P[0])
    assert SS0 + sum(SS) + SSE == sum(v * v for v in y)
    grand = sum(y) / N
    assert sum(SS) + SSE == sum((v - grand) ** 2 for v in y)
    # Population-level: the interaction contrast of the population mean is nonzero,
    # and P_AB mu != 0 while P_E mu = 0.
    mu = [mu_cells[c] for c in range(4) for _ in range(n)]
    pop = contrasts(mu_cells)
    assert pop[2] == 5
    assert qform(mu, P[3]) == n * Fr(25) / 4 and qform(mu, P[3]) != 0
    assert qform(mu, PE) == 0
    # coded coefficients: betaA = DeltaA/2 etc. via least squares on the sign columns
    beta = [sum(v[i] * mu[i] for i in range(N)) / N for v in cols]
    assert beta[1] == pop[0] / 2 and beta[2] == pop[1] / 2 and beta[3] == pop[2] / 4

    # Fixture 2: NUISANCE-NULL cases. For each target j, the population mean has
    # DeltaJ = 0 but every other component nonzero and "large"; P_j mu = 0, PE mu = 0,
    # and the numerator SS under that mean equals the pure-error quadratic form.
    nuisance = {}
    for target in (1, 2, 3):
        coef = [Fr(9), Fr(-7), Fr(13), Fr(-5)]
        coef[target] = Fr(0)
        mu_t = [sum(coef[j] * cols[j][i] for j in range(4)) for i in range(N)]
        mt = cell_means(mu_t, n)
        ct = contrasts(mt)
        assert ct[target - 1] == 0
        assert all(ct[j] != 0 for j in range(3) if j != target - 1)
        assert qform(mu_t, P[target]) == 0
        assert qform(mu_t, PE) == 0
        assert all(qform(mu_t, P[j]) > 0 for j in range(4) if j != target)
        # Shift invariance: for any error vector e, (mu+e)'P_j(mu+e) = e'P_j e when P_j mu = 0
        e = [Fr((i * 37) % 11 - 5, 3) for i in range(N)]
        ye = [a + b for a, b in zip(mu_t, e)]
        assert qform(ye, P[target]) == qform(e, P[target])
        assert qform(ye, PE) == qform(e, PE)
        nuisance[target] = str(ct)

    # Unequal variances: Sigma = diag(4, 1, ..., 1). Paper's independence criterion
    # (Theorem 2.4(b)) needs Sigma A Sigma B Sigma = 0; show it fails for A=P_A, B=P_E,
    # and the chi-square criterion Sigma A Sigma A Sigma = Sigma A Sigma also fails.
    Sig = [[Fr(4 if (i == j == 0) else int(i == j)) for j in range(N)] for i in range(N)]
    SAS = matmul(matmul(Sig, P[1]), Sig)
    SASBS = matmul(matmul(SAS, PE), Sig)
    assert SASBS != zero
    SASAS = matmul(matmul(SAS, P[1]), Sig)
    assert SASAS != SAS
    # Common variance sigma^2 I: both criteria hold (scale factor sigma^2 cancels in the criterion
    # only when A is rescaled; check the identity-covariance statements directly).
    assert matmul(P[1], PE) == zero and matmul(P[1], P[1]) == P[1]

    return {"n": n, "N": N, "residual_df": N - 4,
            "fixture1_SS": [str(x) for x in SS], "fixture1_SSE": str(SSE),
            "fixture1_pop_contrasts": [str(x) for x in pop],
            "nuisance_null_contrasts": nuisance}


# ---------- distribution checks (float, informative) ----------
def f_density(r, nu):
    a, b = 0.5, nu / 2.0
    lc = math.lgamma(a + b) - math.lgamma(a) - math.lgamma(b)
    return math.exp(lc) * nu ** (-a) * r ** (a - 1) * (1 + r / nu) ** (-(a + b))


def f_cdf(x, nu):
    """P(F <= x) for F(1, nu), via t = (x/nu)/(1+x/nu) and s = sqrt(t):
    I_t(1/2, nu/2) = (1/B) * int_0^sqrt(t) 2 (1-s^2)^(nu/2-1) ds  (smooth integrand)."""
    if x <= 0:
        return 0.0
    t = (x / nu) / (1 + x / nu)
    s_max = math.sqrt(t)
    b = nu / 2.0
    lB = math.lgamma(0.5) + math.lgamma(b) - math.lgamma(0.5 + b)
    # composite Simpson on [0, s_max]
    K = 20000
    h = s_max / K
    g = lambda s: 2.0 * (1.0 - s * s) ** (b - 1.0)
    tot = g(0.0) + g(s_max)
    for i in range(1, K):
        tot += (4 if i % 2 else 2) * g(i * h)
    return math.exp(-lB) * tot * h / 3.0


def density_integrates_to_one(nu):
    # integrate f over r in (0, inf) by the same substitution: total mass = I_1 = 1
    return f_cdf(1e12, nu)


def monte_carlo(n, seed=20260909, reps=400_000):
    rng = np.random.default_rng(seed)
    N = 4 * n
    nu = N - 4
    xa = np.repeat([-1, -1, 1, 1], n).astype(float)
    xb = np.repeat([-1, 1, -1, 1], n).astype(float)
    xab = xa * xb
    # Nuisance-null for A: DeltaA = 0, B and AB and intercept nonzero and sizeable.
    mu = 10.0 + 0.0 * xa + 3.0 * xb + 2.5 * xab
    sigma = 1.7
    E = rng.standard_normal((reps, N)) * sigma
    Y = mu + E
    cm = Y.reshape(reps, 4, n).mean(axis=2)
    dA = (-cm[:, 0] - cm[:, 1] + cm[:, 2] + cm[:, 3]) / 2
    dB = (-cm[:, 0] + cm[:, 1] - cm[:, 2] + cm[:, 3]) / 2
    dAB = cm[:, 0] - cm[:, 1] - cm[:, 2] + cm[:, 3]
    SSA = n * dA ** 2
    SSB = n * dB ** 2
    SSAB = n * dAB ** 2 / 4
    resid = Y - np.repeat(cm, n, axis=1)
    SSE = (resid ** 2).sum(axis=1)
    FA = nu * SSA / SSE
    FB = nu * SSB / SSE
    FAB = nu * SSAB / SSE
    out = {"n": n, "nu": nu, "reps": reps, "sigma": sigma}
    # Empirical CDF of F_A (null) against the derived F(1,nu) CDF at several points
    pts = [0.1, 0.5, 1.0, 2.0, 4.0, 7.0, 12.0]
    out["FA_null_cdf_check"] = [(x, float((FA <= x).mean()), f_cdf(x, nu)) for x in pts]
    # F_B and F_AB are NOT null here (DeltaB, DeltaAB nonzero): upper tails should be much larger
    out["FB_nonnull_P(F>4)"] = float((FB > 4).mean())
    out["FAB_nonnull_P(F>4)"] = float((FAB > 4).mean())
    # Numerator/denominator independence under H_A: correlation of SSA with SSE ~ 0
    out["corr_SSA_SSE"] = float(np.corrcoef(SSA, SSE)[0, 1])
    # Global null: the three F's share SSE, so they are dependent (corr of F's > 0)
    Y0 = 10.0 + E
    cm0 = Y0.reshape(reps, 4, n).mean(axis=2)
    dA0 = (-cm0[:, 0] - cm0[:, 1] + cm0[:, 2] + cm0[:, 3]) / 2
    dB0 = (-cm0[:, 0] + cm0[:, 1] - cm0[:, 2] + cm0[:, 3]) / 2
    SSE0 = ((Y0 - np.repeat(cm0, n, axis=1)) ** 2).sum(axis=1)
    FA0, FB0 = nu * n * dA0 ** 2 / SSE0, nu * n * dB0 ** 2 / SSE0
    out["global_null_corr_FA_FB"] = float(np.corrcoef(FA0, FB0)[0, 1])
    out["global_null_corr_SSA_SSB"] = float(np.corrcoef(n * dA0 ** 2, n * dB0 ** 2)[0, 1])
    # Unequal variance negative control: cell 00 has sd 4, others sd 1, DeltaA = 0
    Eu = rng.standard_normal((reps, N))
    Eu[:, :n] *= 4.0
    Yu = mu + Eu
    cmu = Yu.reshape(reps, 4, n).mean(axis=2)
    dAu = (-cmu[:, 0] - cmu[:, 1] + cmu[:, 2] + cmu[:, 3]) / 2
    SSEu = ((Yu - np.repeat(cmu, n, axis=1)) ** 2).sum(axis=1)
    FAu = nu * n * dAu ** 2 / SSEu
    out["unequal_var_P(FA>4)_vs_theory"] = (float((FAu > 4).mean()), 1 - f_cdf(4.0, nu))
    return out


if __name__ == "__main__":
    res = {"role": "reviewer-side independent checks; informative only"}
    res["exact"] = [exact_checks(n) for n in (2, 3, 5, 7)]
    res["density_mass"] = {str(nu): density_integrates_to_one(nu) for nu in (4, 8, 16, 24)}
    res["density_at_points"] = {str(nu): [(r, f_density(r, nu)) for r in (0.5, 1.0, 3.0)] for nu in (4, 16)}
    res["mc"] = [monte_carlo(2), monte_carlo(5)]
    print(json.dumps(res, indent=1))
```
