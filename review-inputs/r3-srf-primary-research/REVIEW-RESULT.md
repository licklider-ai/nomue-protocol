# Release 3 SR-F Primary-Source Research — Independent Review with the 1979 Corrigendum

**Status: informative independent review result; non-normative; not adopted.** This
record is the separate-investigator review of Part O of the Release 3 semantic
source-acquisition result at the fixed head of pull request #216, performed under the
instructions in Part O.6 as amended by the commissioning message of 2026-09-08 (which
supplied the 1979 corrigendum instead of asking this review to acquire it). It selects
no procedure, Contract, identifier, schema, Public Check, tolerance, implementation, or
release outcome; it accepts no formal hold, adopts no method, opens no public
discussion, and merges nothing. Attribution is role-based only.

**Verdict: `GO` on content**, with zero `BLOCKER`, two `SHOULD-FIX` (S-1, S-2), and
five `NICE-TO-HAVE` findings (Section 12). Part O's own disposition
(`INPUT_INCOMPLETE` because the 1979 correction had not been inspected) was correct
when written and is preserved. With the corrigendum now received, hashed, and read as
a page image, and with all three assigned originals re-inspected, this review finds no
remaining source-acquisition gap for SR-F and proposes **SR-F `CLOSED` candidate**
under the commission's definition, subject to two named textual residuals that are
reopen conditions rather than missing claims or missing materials (Section 13). If the
steward instead classifies the equation (1.7) sign discrepancy as a conflict that
requires separate adjudication before closure, the label is `PARTIAL` with exactly that
named gap and no acquisition request. `INPUT_INCOMPLETE` is no longer supportable for
SR-F. Nothing is enacted here: the ledger, `SOURCE_SET_READY=false`, `NARROW`, the
`RES-ONLY` classifications, and the 42-receipt count remain as recorded in Part O.

## 1. Review identity

| Field                      | Value                                                                                                                                    |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Repository                 | `licklider-ai/nomue-protocol` (public)                                                                                                   |
| Reviewed pull request      | #216 (draft, open, not merged, `mergeable_state: clean`, one commit, one changed path, +250/−0)                                          |
| Reviewed exact head        | `4ce988231330f5702a7d3d8a352b01fac575191f`                                                                                               |
| Head tree                  | `f6718d5bd0fa45a3b2d57124ed6ecbbde3e9ae17`                                                                                               |
| Sole parent / PR base      | `1da537aba29bed6bf65efc1a6e97ebdc2b1f6725` (`research/r3-source-receipt-42-20260908`; tree `084dd2b9ca142f191c8c9ad92655272e9d4dead5`)   |
| Reviewed result path       | `governance/drafts/release-3-preparation/semantic-source-acquisition-result.md`                                                          |
| Reviewed result blob       | `78feb17baba67d41d0aac274c51e2f12b507a6d3` (370999 bytes; SHA-256 `543a4c14b6e0d4fea809c6935a7bc69f08019467283edc9141f8dd1856c48596`)    |
| Parent result blob         | `60e680aefe64969b29a255ba62cfe47a92345463` (353310 bytes; SHA-256 `07b9dd6d3473170e82bf95606dcc974a2f17920a74c9f28101e94334797ba2b7`)    |
| Operative commission       | commit `f39100161cb45de15767bdb19ed54aba9489b41a`, blob `3c7ddcc696f0c284213f7efe0da68e747bc238d7` (same blob at the reviewed head)      |
| Fixed semantic input       | commit `7bd9c5ab854777c3e99e624d9d2ed62731228852`, blob `8f21526040924b891f64724c2d0fde9ea94eff92`                                       |
| Review date                | 2026-09-08 (08:06–09:00 UTC approximately)                                                                                               |
| Reviewer role              | separate-investigator independent primary-source reviewer for Part O; did not author Parts A–O, the commission, or any prior review      |
| Review branch              | `review/r3-srf-primary-research-20260908`, confirmed unused on the remote before creation, created from the reviewed head as sole parent |
| Files added by this review | this file only                                                                                                                           |
| Comment on the PR          | none posted                                                                                                                              |

Live pull-request state was read from the hosting service at review start: head
`4ce98823…`, base `1da537ab…`, one commit, one changed file, 250 additions,
`mergeable_state: clean`; the five hosted check runs on the head (run `34197396871`)
are all `completed` / `success`. The remote ref
`refs/heads/research/r3-srf-primary-research-20260908` resolved to `4ce98823…` at
review start and again immediately before the review commit was made, so the
identity-dependent statements below stand and `HEAD_MOVED` does not apply.

## 2. Independence, prior involvement, evidence reuse, and environment

- **Prior involvement.** This reviewer's work context did not participate in Parts
  A–O, in the commission, in the supply of the source PDFs, or in any earlier review
  record. No pull-request comment or issue was written or read beyond the PR #216
  body and the fixed head's diff.
- **Reading order (not blind).** The PR #216 body and the Part O diff were read
  before the page images were inspected, because Part O.6 is the operative
  instruction. Two earlier review records were opened only to align section layout
  and identity-table conventions (`r3-independent-multigroup-semantics` and
  `r3-semantic-source-acquisition-sr-l-repair`, header sections only); none of their
  source findings were reused. The fixed semantic input was read only for the
  APR-01–APR-09 catalogue rows, the SRC-36 row, Section 17's SR-F hold row, and the
  F-14/F-17 summary lines named below.
- **Evidence reused, not re-derived.** (a) Part O.4's acquisition log for the
  correction (archival issue listing, JSTOR item identifier `10.2307/2287029`, the
  failed retrieval) is author testimony; this review did not repeat any web
  retrieval. (b) The statement that the Tukey–Kramer conservativeness was later
  proved (fixed semantic input F-14, citing SRC-06 Hayter 1984, pp. 62–69) is reused
  as a recorded prior-review finding and was not re-inspected here; it is used only
  to observe that no catalogue entry depends on the withdrawn 1978 Kramer claim.
  (c) Part O's Python diagnostic was re-executed verbatim; its outputs are compared,
  not assumed.
- **Everything else was re-derived**: all Git identities from a fresh fetch of the
  fixed head; all artifact hashes, byte counts, and page counts from the supplied
  files; every pinpoint from the page images or text layers named in Section 4; every
  number in Section 10 from code written for this review.
- **Environment and model disclosure (material to reproducibility).** Hosted
  Claude Code remote session, container CLI 2.1.263, Linux 6.18 (x86-64). The
  session's configured, current, and last-served model all report `claude-fable-5-1`
  (service testimony from the session-description tool; this is not verifiable from
  Git and is disclosed, not asserted). Python 3.11.15, NumPy 2.4.6, SciPy 1.17.1,
  mpmath 1.4.1; PDF text layers and 150–220 dpi raster page images were produced
  with the open-source PyMuPDF 1.28.2 library. Dependencies for the repository checks
  were installed with `pnpm install --frozen-lockfile` (pnpm 11.7.0, Node 22.22.2).
  No PDF, image, or full-text extraction is committed.

## 3. Identity gate

Every value below was re-derived from Git objects after `git fetch origin
4ce988231330f5702a7d3d8a352b01fac575191f`, not taken from the PR text or the result
text.

| Check                              | Expected (PR body / Part O.1)                                              | Observed                                                                                                               | Result |
| ---------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------ |
| Live head of the PR branch         | `4ce98823…`                                                                | remote ref and PR `head.sha` both `4ce98823…` at start and before commit                                               | match  |
| Sole parent                        | `1da537ab…`                                                                | `git rev-parse 4ce98823…^` → `1da537ab…`; exactly one parent                                                           | match  |
| Result blob at head                | `78feb17b…`, 370999 bytes, SHA-256 `543a4c14…`                             | `git rev-parse 4ce98823…:<path>` → `78feb17b…`; `wc -c` 370999; `sha256sum` `543a4c14…`                                | match  |
| Parts A–N prefix preserved         | first 353310 bytes unchanged; parent blob `60e680ae…`, SHA-256 `07b9dd6d…` | `head -c 353310` of the head blob hashes to `07b9dd6d…`; parent blob is `60e680ae…`, 353310 bytes, SHA-256 `07b9dd6d…` | match  |
| Change set parent → head           | one path, +250                                                             | `git diff --numstat` → `250 0` on the result path only                                                                 | match  |
| Commission blob                    | `3c7ddcc6…` at `f3910016…`                                                 | `git ls-tree -r f3910016…` carries `3c7ddcc6…` at the commission path; same blob at `4ce98823…`                        | match  |
| Fixed semantic input               | commit `7bd9c5ab…`, blob `8f215260…`                                       | `git cat-file -t` → commit; `git ls-tree -r 7bd9c5ab…` carries `8f215260…` at `semantic-research-result.md`            | match  |
| Continuous integration on the head | green                                                                      | five check runs on `4ce98823…`, all `success`                                                                          | match  |
| Review branch name availability    | `review/r3-srf-primary-research-20260908` unused                           | `git ls-remote origin 'refs/heads/review/*'` returned no SR-F branch                                                   | match  |

## 4. Supplied source artifacts and inspection boundary

The four files were supplied locally by the commissioning user. Hashes, byte counts,
and page counts were recomputed here; the three originals match Part O.1 exactly and
the corrigendum matches the identity stated in the commissioning message.

| Supplier | Artifact                                                                                   |   Bytes | PDF pages | SHA-256                                                            | Identity match |
| -------- | ------------------------------------------------------------------------------------------ | ------: | --------: | ------------------------------------------------------------------ | -------------- |
| 37       | Hochberg (1974), Journal of Multivariate Analysis 4, 224–234 (no cover; PDF p. 1 = p. 224) |  561598 |        11 | `4eebb9ab9e4e7c133bdc7bff7130dda98b762e498cca0ce1738680be2bb539b4` | Part O.1       |
| 23       | Genizi and Hochberg (1978), JASA 73(364), 879–884 (publisher cover; PDF p. 2 = p. 879)     | 1123267 |         7 | `21938051d7bcfd1d56babe21280976d3918b69d8ffdff4ec646c18ed3b6fe2b0` | Part O.1       |
| 32       | Stoline (1981), The American Statistician 35(3), 134–141 (publisher cover; PDF p. 2 = 134) |  910960 |         9 | `65c2ce23d2dc5adb105af5d07f6060ebc4c07c9b908dc71256abcc2b64665cb4` | Part O.1       |
| —        | Corrigenda (1979), JASA 74(367), 744 (publisher cover; PDF p. 2 = printed p. 744)          |  256229 |         2 | `07a6c3433f77e85f2ce5034e0068e7421a7f5041679705755cbfabec7493653a` | commission msg |

Corrigendum artifact details: document-information title "Corrigenda"; the cover
cites "(1979) Corrigenda, Journal of the American Statistical Association, 74:367,
744-744, DOI: 10.1080/01621459.1979.10481678" and "Published online: 05 Apr 2012".
The publisher DOI printed on the artifact differs in form from the JSTOR identifier
`10.2307/2287029` recorded in Part O.4 and the PR body; both name the same printed
page (finding N-1). The corrigendum carries no supplier number and does not change
the received total of 42, as Part O.4 states.

**Pages inspected as rendered images** (decision-bearing): Corrigenda cover and
p. 744; Genizi–Hochberg pp. 879, 880, 881, 882, 883; Hochberg pp. 225, 226, 228, 229;
Stoline pp. 136, 137, 140. **Pages read from the text layer only**: Genizi–Hochberg
p. 884 (end of Lemma 2 proof and references); Hochberg pp. 224, 227, 230–234; Stoline
pp. 134, 135, 138, 139, 141. Text-layer reading is not claimed as image verification.
This is the same decision-bearing image set that Part O.1 reports, now inspected
independently.

## 5. The 1979 corrigendum: direct reading and scope

### 5.1 What is on printed p. 744

The page is headed "CORRIGENDA" and contains three separate items, each introduced by
the corrected article's author line in bold:

1. John J. Spitzer, "A Monte Carlo Investigation of the Box-Cox Transformation in
   Small Samples," 73(363), 488–495 — a correction about the non-existence of
   `E(Y|X)` under the Box-Cox transformation for `−1 ≤ λ < 0`, with its own reference
   list (Huang 1977; Poirier and Melino 1978). Unrelated to SR-F.
2. Abraham Genizi and Yosef Hochberg, "On Improved Extensions of the T-Method of
   Multiple Comparisons for Unbalanced Designs," 73(364), 879–884 — the item relevant
   to SR-F, one paragraph, transcribed in 5.2.
3. Robert E. Tarone and Gary Gruenhage, "A Note on the Uniqueness of Roots of the
   Likelihood Equations for Vector-Valued Parameters," 70(352), 903–904 — a correction
   to the final two paragraphs of the proof of Theorem 2′ (quadratic-form singularity).
   Unrelated to SR-F.

The Genizi–Hochberg item is a single paragraph with no signature line; it refers to
"the authors" and to "Genizi and Hochberg" in the third person. Whether it was written
by the authors or by the editor is not stated on the page. Stoline (1981) p. 140 cites
it as Genizi and Hochberg (1979); that attribution is Stoline's, not the page's.

### 5.2 The correction text (transcribed from the page image)

> The authors consider Hochberg's T(Q) procedures and prove that within that family
> "Kramer's procedure cannot be achieved." That does not mean that Kramer's procedure
> for _pairwise comparisons only_ is liberal (as concluded erroneously by Genizi and
> Hochberg). If one wants resolution for all contrasts and adheres to a T(Q)-type
> procedure, then it is true that there is no Q that gives Kramer's intervals for all
> the pairwise comparisons. One might, however, start with resolution for pairwise
> comparisons only and extend them to general contrasts as shown in Hochberg (see
> article in _Journal of Multivariate Analysis_, 1974, 4). With the second approach,
> it may very well be that Kramer's intervals for the pairwise comparisons are
> conservative and not liberal, at least for _some_ unbalanced designs. This will have
> to be established analytically or by simulation.

The transcription was checked word by word against the rendered image; the text layer
of the file garbles "pairwise comparisons only" and "Journal", and the image was used
for those words.

### 5.3 Scope: what is withdrawn, what is maintained, what is left open

Source facts (each sentence of the paragraph mapped):

| Status                        | Statement in the corrigendum                                                                                                                               | 1978 text it bears on                                                                                                                                                                                                                    |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Withdrawn**                 | "That does not mean that Kramer's procedure for pairwise comparisons only is liberal (as concluded erroneously by Genizi and Hochberg)."                   | p. 879, "It will be shown later that Kramer's procedure does not control the experimentwise error level"; p. 882, "This again shows the inappropriateness of his method as a simultaneous inference procedure."                          |
| **Maintained**                | "within that family 'Kramer's procedure cannot be achieved'"; "there is no Q that gives Kramer's intervals for all the pairwise comparisons."              | p. 881, Section 2.5 and its Lemmas 1–2 (pp. 883–884): minimal intervals for all pairwise comparisons are achievable in `T(Q)` if and only if `B` has the balance property; hence Kramer's method "is not achievable" for unbalanced `B`. |
| **Left open (not asserted)**  | "it may very well be that Kramer's intervals … are conservative and not liberal, at least for some unbalanced designs. This will have to be established …" | No 1978 text; this is a new, explicitly unproved conjecture in the corrigendum.                                                                                                                                                          |
| **Pointer, not a new result** | "extend them to general contrasts as shown in Hochberg (… 1974, 4)"                                                                                        | Hochberg (1974) p. 229, Lemma 3.1 and the sentence following (3.2): the pairwise-to-all-contrasts algebraic equivalence.                                                                                                                 |

Reviewer inference from the mapped facts (kept separate from the page):

- The corrigendum withdraws exactly the inference "unattainable within `T(Q)` ⇒
  Kramer's intervals are liberal". It does not withdraw the Section 2.5 result, the
  Section 3 construction, Table 1, Table 2, formula (3.1), or the p. 883 example.
- The corrigendum does **not** prove, state, or cite a proof that Kramer's intervals
  are conservative. Its final two sentences are a hedged conjecture and an explicit
  statement that the question remained open in 1979. Part O.4 item 3 and the
  commissioning message are right to insist on this distinction; nothing on p. 744
  supports "Kramer's guarantee was proved".
- The corrigendum does **not** mention equation (1.7), the `= 1 − α` sign, the GT2
  procedure's coverage, the p. 883 numerical example, or the printed averages. Part
  O.4 item 2 left open "whether it also addresses (1.7)"; the direct answer is that it
  does not. The (1.7) sign discrepancy (Section 7.3) is therefore untouched by any
  published correction known to this review.
- Stoline (1981) p. 136 ("This statement was subsequently retracted (Genizi and
  Hochberg 1979), but left the liberality issue in doubt") is an accurate one-sentence
  report of the paragraph. Part O was right not to substitute that report for the
  text; the report omits the maintained non-achievability claim and the pointer to
  Hochberg (1974).

## 6. C-F1 — Hochberg (1974): GT2 construction and coverage

Source facts verified on the page images:

- **Model** (p. 225, Section 2 opening; p. 226, first paragraph and the paragraph
  before Corollary 2): `u` normal with mean `0` and dispersion `σ²B`, `B` known, `σ²`
  unknown; an unbiased `s_ν²` with `ν s_ν²/σ²` chi-square on `ν` d.f., independent of
  `u`; `θ̂ ~ N(θ, σ²B)`. Part O.2's "common unknown scalar variance with known
  covariance shape" is the correct reading. Unequal diagonal entries of `B` are
  allowed; arbitrary unknown per-population variances are not.
- **GT2 statement** (p. 228, Section 3): `P_c`, `N_c`, `ψ_ij = b_ii + b_jj − 2b_ij`,
  `k′ = k(k−1)/2`; **Theorem 3.1**: "The probability is _at least_ `1 − α` that all
  the contrasts `c ∈ G^k` simultaneously satisfy" (3.1), with `|m|^{(α)}_{k′,ν}` the
  upper `100α` percent point of the Studentized maximum modulus (SMM) with parameters
  `k′` and `ν`.
- **Pairwise event** (p. 229, (3.2)): `P{|θ̂_i − θ̂_j − (θ_i − θ_j)| ≤ s_ν ψ_ij^{1/2}
|m|^{(α)}_{k′,ν}, ∀ 1 ≤ i < j ≤ k} ≥ 1 − α`, obtained from the corollary to Theorem 2
  in Šidák (1967) applied to the multivariate-normal vector of pairwise differences.
  The inequality sign is `≥` on the image. The pairwise differences are dependent in
  general; the Šidák inequality is what supplies the bound.
- **Extension to contrasts** (p. 229, Lemma 3.1): all contrasts satisfy
  `(½Σ|c_i|)|Σ c_i y_i| ≤ Σ_{P}Σ_{N} c_i(−c_j) a_ij` if and only if `|y_i − y_j| ≤ a_ij`
  for all pairs. Identifying `y_i = θ̂_i − θ_i` and `a_ij = s_ν ψ_ij^{1/2} |m|` yields
  Theorem 3.1. This is the equivalence that the corrigendum's "second approach"
  points to.
- **Comment (1)** (p. 229): analogous procedures for all linear functions exist; the
  GT1 version uses the Studentized augmented range. This supports Part O's SMM versus
  SR/SAR distinction from the GT2 side.
- Part O.2's half-width `s·sqrt(d_ij)·m(r,ν,α)` with `r = k′` and `d_ij = ψ_ij` is
  the (3.2) half-width in Part O's notation. The source gives intervals; no stepwise
  ordering, selection, or sorted means appears (Sections 3–4, read on the images and
  text layer).

Every C-F1 pinpoint in Part O.2 is confirmed. The at-least characterization for
APR-05 is the originating source's own wording.

## 7. C-F2 — Genizi and Hochberg (1978): T(Q), csp restriction, two-size optimum

### 7.1 Definitions and stated results (p. 879–880, images)

- (1.4)–(1.5), p. 879: for any `Q` with `QQ′ = B`, `P{|e′(θ̂ − θ)| ≤ s q̄^{(α)}_{k,ν}
M̃(Q′e), ∀ e ∈ R^k} = 1 − α`, `q̄` the upper `α` quantile of the Studentized
  **augmented** range (SAR), `M̃(e) = max{Σ e_i⁺, Σ e_i⁻}`. The text attributes this
  family and its exactness to Hochberg (1975) ("He showed that …"); the proof is not
  in the 1978 paper.
- (1.6), p. 880: if additionally `Q1 = λ1`, `λ > 0` (contrast-set-preserving, csp),
  the restriction to contrasts may use the Studentized **range** quantile
  `q^{(α)}_{k,ν}` with `M(Q′c) = ½Σ|(Q′c)_i|`; denoted `T_c(Q)`. Also attributed to
  Hochberg (1975).
- (1.7), p. 880: the GT2 statement is reprinted with `= 1 − α` while the same
  paragraph calls GT2 "the (conservative) GT2 procedure given by Hochberg (1974a)".
  Both facts confirmed on the image (Section 7.3).
- (1.3), p. 879: Kramer's intervals with `[(b_ii + b_jj − 2b_ij)/2]^{1/2} q^{(α)}_{k,ν}`,
  followed by the sentence withdrawn in 1979 (Section 5.3).

### 7.2 Section 2 and Section 3 (pp. 880–883, images)

- Section 2.5 and Appendix Lemmas 1–2: `Q′c = λc` for all contrasts (minimal intervals
  for all pairwise contrasts) is possible if and only if `B` has the balance property
  (1.1); "Therefore, for unbalanced designs, Kramer's method (1.3) … is not
  achievable." This is the maintained claim.
- Section 2.6: "We conjecture that the overall minima for these criteria can be
  reached by Q matrices of csp type." Explicitly a conjecture, supported by a search
  for `k = 3` and `k = 4` only. Part O.2's reading is correct.
- Section 3 (p. 881): `m_1` treatments of size `n_1`, `m_2 = k − m_1` of size `n_2`,
  `n_1 > n_2`, `B = D_a² = diag(1/n_1, …, 1/n_2, …)`. Restrictions (i) minimal length
  for all within-size pairs and (ii) equal length for all `m_1 m_2` cross-size pairs
  (p. 882, top); the paper notes both are shared by Kramer's (1.3), `T(D_a)` and GT2.
- Section 3.1 Lemma (p. 882): under (i)–(ii) `H` has the one-parameter form
  `H_11 = I + x11′`, `H_12 = y11′`, `H_21 = ±H_12′`, `H_22 = I + z11′` with the two
  sign cases and `−2/m_1 ≤ x ≤ 0`. (The printed Lemma writes `H_11` twice where the
  second should read `H_12`; this is a visible typesetting slip, immaterial.) The
  optimum `x_0` was found "using the computer" for `3 ≤ m_1 + m_2 ≤ 10` and
  `b = n_1/n_2 = 1.1(0.1)25`; every `Q_0` found had equal row sums (csp). Part O.2's
  "observed in that search … does not prove a universal csp optimizer" is the right
  boundary.
- Table 1 (p. 882): `R(m_1, m_2, b) = n_1^{1/2} M̃(Q_0′e)` for cross-size pairs, rows
  `m_1 = 1` and `m_1 = k − 1`, `k = 3(1)10`, six `b` values; last row Kramer's
  `[(1 + b)/2]^{1/2}`. The `T(D_a)` counterpart is `b^{1/2}`. Both methods coincide on
  within-size pairs (p. 882, parenthetical). Seven cells are reproduced in Section 10.
- Section 3.2, (3.1) (p. 883): the ratio `T_c(Q_0)/GT2` of average pairwise interval
  length; `B(m_1, m_2, ν, α)` is the smallest `b` (step 0.010) making the ratio
  `≥ 1`; Table 2 tabulates it. The average-width advantage holds for `1 < b <
B(m_1, m_2, ν, α)` only — a bounded, tabulated comparison, not dominance.
- Example (p. 883): `m_1 = 1, m_2 = 2, n_1 = 17, n_2 = 8, ν = 30, α = 0.10`;
  `n_1/n_2 = 2.125 < 2.205 = B(1,2,30,0.10)` from Table 2; GT2 half-widths
  `2.207(1/17 + 1/8)^{1/2}s` (twice) and `2.207(1/8 + 1/8)^{1/2}s`; `T_c(Q_0)`
  half-widths `3.017·17^{−1/2}·1.3157 s` (twice) and `3.017·8^{−1/2} s`; printed
  averages `0.9986s` and `0.9974s`, called "average confidence interval length".
  Part O.3 is right that the printed quantities are half-widths; doubling both leaves
  the comparison unchanged.

### 7.3 The (1.7) sign

On the p. 880 image, (1.7) ends "for all `c ∈ L_c^k} = 1 − α`". On the p. 229 image,
(3.2) ends "`≥ 1 − α`", and Theorem 3.1 (p. 228) says "at least". The 1978 paper's own
prose calls GT2 conservative in the sentence that introduces (1.7). The corrigendum is
silent on (1.7). Reviewer inference: the `=` in (1.7) is a loose restatement of a
bound by a secondary source, contradicted by the originating theorem and by the
restating paper's own adjective; it is not evidence of exact GT2 coverage. Part O.4
item 1 reaches the same reading and correctly declines to infer exact coverage. The
discrepancy is recorded (Section 13, residual R-1) because the commission requires
conflicts between primary texts to be recorded and adjudicated rather than resolved by
convenience; this review's proposed adjudication is stated there.

### 7.4 Catalogue characterization

The fixed semantic input's combined row "GT2 / Genizi-Hochberg (APR-05/06)" lists the
critical-value basis as "Studentized maximum modulus; special tables". On the assigned
text, SMM belongs to GT2 only: the GH contrast procedure `T_c(Q_0)` uses the
Studentized range quantile `q_{k,ν}` together with the Table 1 constants, and the
all-linear-functions `T(Q)` uses the Studentized augmented range. Part O.2 records the
SR/SAR facts but Part O.5 does not state the resulting catalogue narrowing for APR-06
as the commission's required-analysis items 6–7 ask (finding S-2). This is a
narrowing of the catalogue's shorthand, not a contradiction of its disposition.

## 8. C-F3 — Stoline (1981): status assessment

Source facts verified on the images (pp. 136, 137, 140) and the text layer (pp. 134,
135, 138, 139, 141):

- p. 135–136: GT2 (3.4) with `m_{α,k*,ν}` (SMM, `k* = k(k−1)/2`), T′ (3.5) with the SAR
  quantile and `min(n_i, n_j)`, TK (3.6) with the SR quantile and the harmonic form.
- p. 136: the retraction report quoted in Section 5.3; Kurtz (1956) proof for `k = 3`;
  Brown (1979) "apparent proof" for `k = 4, 5` (an unpublished manuscript, p. 140);
  Dunnett (1980a) simulation; the author's conjecture that TK "may well be
  conservative for all `k ≥ 3`"; the always-narrower inequalities
  `q/√2 ≤ m ≤ t_{α*} ≤ t_{α/2k*}`; R(TK|GT2) ranges `.92–.99`.
- p. 137: "The Genizi-Hochberg (GH) (1978) method is a conservative method that is
  applicable only to those designs with two distinct sets of sample sizes" (3.10),
  with the first block of size `n` and the second of size `nu`, `u > 1` — the
  **reversed** indexing relative to GH's `n_1 > n_2` that Part O.2 warns about;
  `L_{m,k,n,u}` from GH Table 1 for cross pairs; observations 1–3 (Tukey intervals for
  equal-size pairs; "optimal procedure among the class of GT3 procedures introduced
  by Hochberg (1975)"; Felzenbaum and Hochberg (1979) "apparently prove" the csp
  optimality); a small R(TK|GH) table (`.988` to `.823`); the conclusion that TK is
  "clearly superior" to GH for two-size cases.
- p. 138 (text layer): "continued development of these optimal type GH methods is not
  advised"; p. 139 Table 2: GH "Yes" conservative, "Applicable only for two distinct
  sizes"; TK "(a) Yes for k = 3, 4, 5. (b) Probably yes for k ≥ 6."
- p. 140: references "GENIZI … (1979), 'On Improved Extensions … (Corrigenda),'
  Journal of the American Statistical Association, 74, 744", "FELZENBAUM … (1979) …
  unpublished manuscript", "HOCHBERG (1975) … JRSS B 37, 426–433", and "BROWN,
  LAWRENCE, D. (1979) … unpublished manuscript".

Every C-F3 pinpoint in Part O.2 is confirmed. Stoline's "optimal procedure among the
class of GT3 procedures" and the Felzenbaum–Hochberg proof report are wider than what
the 1978 text proves (a conjecture plus a finite search); Part O.2's caution stands.
Stoline's recommendations are historical assessment and are not Protocol evidence.

## 9. Reviewer derivations (inference, separate from source facts)

These are this reviewer's derivations, recorded so that no coverage claim for the GH
family has to be escalated to the uninspected Hochberg (1975); they are not source
facts and are not adopted anything.

**D-1 (Part O.3's contrast identity, checked).** For a nonzero contrast `c` with
`A = Σ_{c_i>0} c_i = ½Σ|c_i|`: `Σ_{i∈P}Σ_{j∈N} c_i(−c_j)(e_i − e_j) = A·Σ_P c_i e_i +
A·Σ_N c_j e_j = A·c′e`, using `Σ_N(−c_j) = A` and `Σ_P c_i = A`. The triangle
inequality on the pairwise event then gives exactly the (3.1) half-width. Correct.

**D-2 (exact coverage of `T(Q)` and `T_c(Q)` from the model alone).** `B` positive
definite and `QQ′ = B` give `Q` nonsingular and `θ̂ − θ = σQZ` with `Z ~ N_k(0, I)`.
For any `e`, `e′(θ̂ − θ) = σ a′Z` with `a = Q′e`. Writing `A⁺ = Σ a_i⁺`, `A⁻ = Σ a_i⁻`
and `z̄⁺`, `z̄⁻` for the corresponding weighted means of coordinates of `Z`, if
`A⁺ ≥ A⁻` then `a′Z = A⁻(z̄⁺ − z̄⁻) + (A⁺ − A⁻) z̄⁺`, so `|a′Z| ≤ M̃(a)·max{range(Z),
max_i|Z_i|}` (symmetrically if `A⁻ > A⁺`). The right-hand factor divided by `s/σ` is
the Studentized augmented range with parameters `k, ν`. Hence the (1.5) event contains
`{SAR ≤ q̄}`; conversely taking `a = e_i − e_j` on the pair attaining the range and
`a = e_i` on the coordinate attaining `max|Z_i|` (both are `Q′e` for some `e`) shows
the events coincide, so (1.5) holds with equality. For csp `Q`, `Q′c` is a contrast if
and only if `c` is (`c′Q1 = λ c′1`), `M̃(a) = M(a) = ½Σ|a_i|` for contrasts, and
`|a′Z| ≤ M(a)·range(Z)` gives (1.6) with equality by the same two-sided argument. The
1978 text states both results and attributes the proofs to Hochberg (1975); this
derivation confirms the statements from the p. 879 model without that source. No
optimality claim over `Q` follows.

**D-3 ("not longer than `T(D_a)`" is provable; "strictly shorter" is computational).**
`x = 0` in the second sign case gives `y = z = 0`, `H = I`, `Q = D_a`, which satisfies
(i)–(ii). The constrained minimum over `x` is therefore never above the `T(D_a)` value
`b^{1/2}` for cross-size pairs, and both methods coincide on within-size pairs. Strict
improvement for cross pairs is what the computed Table 1 shows (`R < b^{1/2}`); it is
reproduced for seven cells in Section 10 but is not a theorem in the text.

**D-4 (Kramer's intervals and the catalogue).** The withdrawn 1978 claim is a
statement about APR-02 (Tukey–Kramer), not about APR-05/06. The fixed semantic input
classifies APR-02 `R3-CAND` on SRC-06 (Hayter 1984, F-14, reused prior-review
evidence, not re-inspected here). No catalogue row cites Genizi–Hochberg for the
Kramer claim, so the corrigendum removes a would-be conflict and creates none.

## 10. Numerical reproduction and independent routes

**Part O.3 script, re-executed verbatim** (extracted from the fixed head's blob;
Python 3.11.15, SciPy 1.17.1 — Part O reports SciPy 1.17.0, finding N-2). Output,
identical to the fixed head's recorded output to every printed digit:

```text
2.206681092596 3.017233892894
1.13e-14
0.946243444 0.946243444 1.1035 0.998662296
0.962737136 0.962737136 1.066670579 0.997381617
```

**Separate route 1 — arbitrary-precision quadrature (mpmath 1.4.1).** The SMM
distribution function was written as `∫_0^∞ (2Φ(cs) − 1)^r f_S(s) ds` with the density
of `S = (χ²_ν/ν)^{1/2}` written out explicitly (integration in `s`, not in `x = νS²`
as in Part O.3), at 20 decimal digits, and the 0.90 quantile located by root finding:
`m(3, 30, 0.10) = 2.2066810925957`, agreeing with the SciPy route to thirteen digits.
The Studentized range function was written as the nested integral
`∫_0^∞ f_S(s)·k∫ φ(z)(Φ(z + qs) − Φ(z))^{k−1} dz ds`: at 15 decimal digits it returns `0.900000000000` (twelve digits) when evaluated at the SciPy quantile `3.017233892894`, which confirms that quantile by an independent formula and library without re-solving it; the separate 20-digit root search for the Studentized range was started but had not completed when this record was committed and is not relied on.

**Separate route 2 — Monte Carlo (NumPy, seed 20260908, 4,000,000 draws).** Empirical
0.90 quantiles `2.2055` (SMM) and `3.0158` (SR); empirical probabilities at the two
quadrature quantiles `0.90025` and `0.90020`. Sampling error at this size is about
`±0.0005` in probability, so both quadrature values are consistent with simulation.

**Table 1 constants, bounded reproduction.** Using only the p. 882 Lemma's
one-parameter family (both sign cases, `x ∈ [−2/m_1, 0]`), `R(m_1, m_2, b) =
b^{1/2}·M̃(Q′e)` for one cross-size pair was minimized numerically (dense grid then
bounded refinement); the minimizing `Q` had equal row sums (csp) in every case, and
the second cross pair and the within pair satisfied (i)–(ii):

| `(m_1, m_2, b)` | Reconstructed | Printed | `b^{1/2}` (`T(D_a)`) | Kramer `[(1+b)/2]^{1/2}` |
| --------------- | ------------: | ------: | -------------------: | -----------------------: |
| (1, 2, 2.0)     |        1.2845 |   1.284 |               1.4142 |                   1.2247 |
| (1, 2, 10)      |        2.5811 |   2.581 |               3.1623 |                   2.3452 |
| (2, 1, 10)      |        2.6458 |   2.646 |               3.1623 |                   2.3452 |
| (9, 1, 10)      |        3.0166 |   3.017 |               3.1623 |                   2.3452 |
| (1, 9, 1.1)     |        1.0439 |   1.044 |               1.0488 |                   1.0247 |
| (5, 1, 5.0)     |        2.0817 |   2.082 |               2.2361 |                   1.7321 |
| (1, 2, 2.125)   |        1.3152 |  1.3157 |               1.4577 |                   1.2500 |

Six printed Table 1 cells are reproduced to their three printed decimals. The example's
constant `1.3157` (p. 883, not a Table 1 cell) reconstructs as `1.3152` (finding N-3);
with it the GH cross half-width is `0.96235s` and the GH average `0.99713s` instead of
`0.9974s`, which leaves every ordering in the example unchanged. This diagnostic is a
check of printed numbers, not an optimizer proposed for adoption, and it does not
address the Section 2.6 conjecture (it searches only inside the constrained family).

**Formula (3.1) check.** With `q = 3.017`, `m = 2.207`, `b = 2.125`, `R = 1.3157`,
(3.1) evaluates to `0.99873`; the ratio of the reconstructed averages is `0.99872`.
The formula and the example are mutually consistent, and the algebra of (3.1) was
re-derived from the per-pair half-widths (within-size pairs `q s/n^{1/2}` versus
`m s (2/n)^{1/2}`; cross pairs `q s R/n_1^{1/2}` versus `m s ((1+b)/n_1)^{1/2}`).

**Rounding check (the basis of finding S-1).** Average of the printed four-place GT2
components: `(0.9462 + 0.9462 + 1.1035)/3 = 0.998633…`, which rounds to `0.9986` — the
printed value. Average of the full-precision reconstruction: `0.998662…`, which rounds
to `0.9987`. For `T_c(Q_0)`: printed components give `0.997366…` and the reconstruction
`0.997382…`, both `0.9974`.

## 11. Check of Part O statements

| Part O item                                                                                                                                                      | Result                                                                               |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| O.1 custody table (bytes, pages, SHA-256 for 37/23/32); covers on 23 and 32                                                                                      | confirmed (Section 4)                                                                |
| O.1 image-inspected page set                                                                                                                                     | same set inspected here; each decision-bearing pinpoint located                      |
| O.2 C-F1 row and boundary                                                                                                                                        | confirmed (Section 6)                                                                |
| O.2 C-F2 row and boundary                                                                                                                                        | confirmed (Section 7); catalogue narrowing not stated in O.5 (S-2)                   |
| O.2 C-F3 row and boundary                                                                                                                                        | confirmed (Section 8)                                                                |
| O.2 GT2 output facts (`r`, `d_ij`, half-width, intervals not a stepwise ordering)                                                                                | confirmed                                                                            |
| O.2 GH facts (SAR vs SR, two restrictions, `n_1 > n_2`, search grid, csp observation, 2.6 conjecture, within-group coincidence, "not longer / strictly shorter") | confirmed; D-3 separates the provable and computational parts                        |
| O.2 Stoline reversed indexing; Felzenbaum–Hochberg proof unpublished; Hochberg (1975) uninspected                                                                | confirmed                                                                            |
| O.3 contrast identity; strong-FWER inversion remark; SMM mixture CDF; SR bound; "does not prove the optimum"                                                     | confirmed as inference (D-1, D-2)                                                    |
| O.3 script and output                                                                                                                                            | reproduced exactly; SciPy patch version differs (N-2)                                |
| O.3 rounding statement "both round to 0.9987"                                                                                                                    | **incorrect for the printed components** (S-1)                                       |
| O.3 "half-widths called interval lengths"                                                                                                                        | confirmed on the p. 883 image                                                        |
| O.4 (1) coverage sign                                                                                                                                            | confirmed on both images; corrigendum silent (Section 7.3)                           |
| O.4 (2) Kramer assertion, Stoline's report, p. 140 bibliography; correction not inspected                                                                        | confirmed as of Part O; now inspected (Section 5)                                    |
| O.4 (3) class optimality is not coverage impossibility                                                                                                           | confirmed; the corrigendum makes the same distinction                                |
| O.4 (4) evidence-type separation                                                                                                                                 | confirmed                                                                            |
| O.4 acquisition log                                                                                                                                              | testimony; not repeated; JSTOR identifier retained alongside the publisher DOI (N-1) |
| O.5 SR-F `INPUT_INCOMPLETE`; ledger; no enactment                                                                                                                | correct at writing; superseded only as a candidate by Section 13                     |
| O.6 instructions                                                                                                                                                 | followed, with the source-acquisition step replaced by the supplied corrigendum      |

## 12. Findings by severity

No `BLOCKER`.

### S-1 (`SHOULD-FIX`) — the printed GT2 average is ordinary rounding of the printed components

Part O.3 states that the printed `0.9986` "is not ordinary four-place rounding of
either the printed four-place component values or these reconstructed values (both
round to 0.9987)". The first half is false: `(0.9462 + 0.9462 + 1.1035)/3 = 0.99863`,
which rounds to `0.9986` (Section 10). Only the full-precision reconstruction rounds
to `0.9987`. The observation should read: the printed average equals the rounding of
the printed rounded components; the reconstruction from unrounded half-widths rounds
one unit higher; the difference is rounding order, not a printed inconsistency. No
disposition, ordering, or classification depends on it; a corrective addendum in a
later Part is sufficient. Part O's own choice to retain rather than "correct" the
printed value is unaffected.

### S-2 (`SHOULD-FIX`) — state the APR-06 catalogue narrowing explicitly

The commission's required analysis (items 6–7) asks each affected entry to record any
mismatch with the reviewed catalogue and whether the source supports, narrows,
contradicts, or does not resolve it. The combined catalogue row attributes "Studentized
maximum modulus; special tables" to APR-05/06; for APR-06 the assigned text uses the
Studentized range (contrasts, csp `Q`) or the augmented range (all linear functions)
with Table 1 constants. Part O records the facts in O.2 but O.5 does not state the
entry-level verdict ("narrows: two distinct sizes; restrictions (i)–(ii); SR/SAR, not
SMM; average-width advantage bounded by Table 2"). The successor disposition record
should carry it. This is a narrowing, not a contradiction, and does not change
`RES-ONLY`.

### N-1 (`NICE-TO-HAVE`) — carry both identifiers for the corrigendum

The artifact prints the publisher DOI `10.1080/01621459.1979.10481678`; Part O.4 and
the PR body record the archival identifier `10.2307/2287029`. Both designate JASA
74(367), p. 744. The custody record should carry the DOI printed on the inspected
artifact alongside the identifier used during acquisition.

### N-2 (`NICE-TO-HAVE`) — library patch version

Part O reports SciPy 1.17.0; this review used 1.17.1. All printed digits agree. Not a
finding against Part O; recorded so that the two runs are not mistaken for one.

### N-3 (`NICE-TO-HAVE`) — the example constant 1.3157 reconstructs as 1.3152

Section 10's bounded reconstruction of `R(1, 2, 2.125)` gives `1.3152` against the
printed `1.3157`, while six Table 1 cells reproduce to their printed precision. The
difference is consistent with a coarser search step in the 1978 computation and changes
nothing in the example's ordering. It is recorded as an observation, not a claimed
erratum, and becomes a reopen item only if the constant is ever relied on numerically.

### N-4 (`NICE-TO-HAVE`) — corrigendum authorship is not stated on the page

The relevant paragraph is unsigned and refers to the authors in the third person. If a
later record cites it as "Genizi and Hochberg (1979)", that follows Stoline's reference
list, not the page. A neutral citation ("Corrigenda, JASA 74(367), 744, item on Genizi
and Hochberg 1978") avoids asserting authorship the artifact does not show.

### N-5 (`NICE-TO-HAVE`) — the Lemma's `H_11` typesetting slip

P. 882's Lemma prints `H_11` for both the first and second blocks; the second is
`H_12` by context and by the reconstruction. Worth a one-line note wherever the Lemma
is transcribed, so the constraint family is not mis-copied.

## 13. Per-claim disposition and SR-F re-judgement against the commission

The commission defines `CLOSED` as "all decision-bearing source claims needed by the
hold are directly supported, with exact artifact identity and pinpoints" and adds that
`CLOSED` "means only that the source-acquisition obstacle has been removed";
`INPUT_INCOMPLETE` is for "required source text cannot be identified or inspected";
`PARTIAL` is "some claims are supported but named gaps remain". SR-F covers APR-05 and
APR-06; the assigned sources are Hochberg (1974), Genizi–Hochberg (1978), and Stoline
(1981), all now inspected, plus the correction dependency that Part O identified, now
inspected.

| Decision-bearing claim                                                                             | Entry  | Direct support (artifact, pinpoint)                                                            | Status                                                               |
| -------------------------------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Model: `θ̂ ~ N(θ, σ²B)`, `B` known, `σ²` unknown scalar, independent chi-square scale               | 05, 06 | Hochberg p. 225–226; Genizi–Hochberg p. 879                                                    | supported                                                            |
| Member set and target: all pairwise differences, extended to all contrasts; simultaneous intervals | 05     | Hochberg (3.2) p. 229, Theorem 3.1 p. 228, Lemma 3.1 p. 229                                    | supported                                                            |
| Guarantee strength: coverage **at least** `1 − α`; SMM critical value with `k′ = k(k−1)/2`, `ν`    | 05     | Theorem 3.1 p. 228; (3.2) p. 229                                                               | supported; residual R-1 on the 1978 restatement                      |
| No stepwise ordering, selection, or sorted-mean dependence                                         | 05     | Hochberg Sections 3–4                                                                          | supported                                                            |
| GH family definition, exact coverage statements (1.5)/(1.6), csp condition, SR versus SAR          | 06     | Genizi–Hochberg pp. 879–880; proofs attributed to Hochberg (1975); D-2 confirms from the model | supported as stated; proof source not assigned; no escalation needed |
| Two-size construction, restrictions (i)–(ii), one-parameter family, computer search, csp observed  | 06     | pp. 881–882, Section 3.1 and Lemma                                                             | supported; finite search, not a universal optimizer                  |
| Width relation to `T(D_a)`: never longer, strictly shorter for cross-size pairs                    | 06     | abstract; p. 882 and Table 1; D-3; seven cells reproduced                                      | supported with the provable/computational split stated               |
| Average-width comparison with GT2 bounded by `B(m_1, m_2, ν, α)`                                   | 06     | Section 3.2, (3.1), Table 2, example p. 883                                                    | supported as a bounded, tabulated comparison                         |
| Broader csp optimality                                                                             | 06     | Section 2.6 (conjecture); Stoline p. 137 (report of an unpublished proof)                      | not established; correctly classified as conjecture in Part O        |
| Kramer non-control assertion                                                                       | —      | 1978 pp. 879, 882; **withdrawn** by Corrigenda p. 744                                          | withdrawn; not relied on by any catalogue entry (D-4)                |
| Historical status of GT2/GH/TK                                                                     | 05, 06 | Stoline pp. 136–137, 139–140                                                                   | supported as historical assessment only                              |

**Named residuals (not acquisition gaps):**

- **R-1 — (1.7) sign.** Cross-source textual discrepancy between Genizi–Hochberg (1.7)
  `= 1 − α` and Hochberg Theorem 3.1 / (3.2) `≥ 1 − α`, untouched by the 1979
  corrigendum. Proposed adjudication: the originating theorem governs; the 1978 text's
  own prose ("conservative") agrees with it; the catalogue and any later Contract text
  use the at-least form. Nothing to acquire.
- **R-2 — catalogue shorthand for APR-06** (S-2): narrowing to SR/SAR and Table 1
  constants, two distinct sizes, restrictions (i)–(ii), bounded average-width
  advantage. Nothing to acquire.

**Re-judgement.**

- `INPUT_INCOMPLETE`: no longer supportable. Every assigned text and the correction
  have been identified, hashed, and inspected with pinpoints. Hochberg (1975) is not
  an assigned source, and Part O.6's escalation condition (a required claim that
  cannot be verified from the supplied text plus an explicit derivation) is not met
  after D-2.
- `CLOSED` candidate: supported on the commission's definition. Every decision-bearing
  claim for APR-05 and APR-06 maps to an inspected artifact and pinpoint; the
  source-acquisition obstacle is removed; the two residuals are recorded reopen
  conditions and neither names a missing claim or a missing document.
- `PARTIAL`: the correct label only if the steward holds that R-1 is a primary-source
  conflict that must be separately adjudicated before closure, in which case the
  single named gap is R-1 and the remaining request is an adjudication decision, not
  a source.

This review proposes `CLOSED` candidate and records the `PARTIAL` reading so that the
steward's choice is explicit. If accepted, the candidate ledger becomes 6 `CLOSED` /
1 `PARTIAL` / 7 `INPUT_INCOMPLETE`; overall remains `INPUT_INCOMPLETE` (SR-A/D/E/I/J,
RSM-01/02 unchanged), `SOURCE_SET_READY` remains false, `NARROW` and every
classification remain unchanged. `CLOSED` does not select GT2 or GH for Release 3.
No GT3 optimizer, SMM/SR/SAR kernel, table constant, or dominance claim is proposed.

## 14. Validation

Actual runs on the review branch with this file present, from a fresh
`pnpm install --frozen-lockfile`:

| Check                                       | Result                                           |
| ------------------------------------------- | ------------------------------------------------ |
| `pnpm format:check`                         | PASS (all matched files use Prettier code style) |
| `pnpm lint:markdown`                        | PASS (356 files, 0 issues)                       |
| `node --import tsx tooling/src/validate.ts` | PASS                                             |
| `git diff --check`                          | PASS (no whitespace errors)                      |

Not run here: `pnpm check` (full suite, including tests and generated-diff) — the
change is one informative Markdown file outside authoritative artifacts, and the fixed
head's own hosted checks are green (Section 3). The hosted checks on the review branch
are the reused CI evidence for everything beyond the four commands above.

## 15. Provenance, boundary, and limits

- The review commit has the reviewed head `4ce98823…` as its sole parent and adds
  this file only; commit, tree, and blob identifiers are reported in the draft
  pull-request body and the reviewer's report because a file cannot contain its own
  commit hash.
- Parts A–O and all earlier review records are untouched; no authoritative artifact,
  registry, schema, fixture, reference code, generated view, commission, or fixed
  semantic input is changed.
- No PDF, page image, or extracted text is committed. Quotations are limited to the
  corrigendum paragraph and short pinpoint phrases.
- The numerical routes in Section 10 are research diagnostics with stated seeds and
  versions; they are not accuracy certificates and do not propose a numerical kernel.
- Hochberg (1975), Felzenbaum–Hochberg (1979), Brown (1979), and Kurtz (1956) remain
  uninspected; nothing here relies on their contents beyond the fact that the
  inspected texts cite them.
- This record proposes; it does not enact. Formal hold acceptance, method adoption,
  merge, public opening, and release remain steward decisions outside this review.
