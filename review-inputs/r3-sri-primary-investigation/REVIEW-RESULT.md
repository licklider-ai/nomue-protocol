# Release 3 Semantic Source Acquisition — Independent Primary-Source Investigation of SR-I (Games–Howell, Tamhane T2, Dunnett T3 and C)

**Status: informative independent investigation record; non-normative; not adopted.**
This record is the separate-context independent primary-source investigation of hold
SR-I (catalogue entries HET-01, HET-02, HET-03; claims C-I1 and C-I2) commissioned for
the Release 3 semantic source-acquisition work. It was performed against a fixed
repository state and three lawfully supplied source PDFs. It selects no procedure,
Contract, identifier, schema, Public Check, implementation, or release outcome; it does
not open public discussion, change the fixed semantic result, adopt its catalogue, or
authorize implementation; and it merges nothing. Attribution is role-based only.

**Outcome in one paragraph.** All three assigned SR-I texts were inspected in full,
identity-matched, and read page by page, with the decision-bearing formulas, tables,
and simulation descriptions checked against page images. Every claim in C-I1 and C-I2
is now pinned to exact printed pages. The sources establish that the Games–Howell
procedure, Tamhane's T2, Dunnett's T3, and Dunnett's C are four distinct single-step
all-pairs simultaneous-interval procedures for independent normal groups with unequal
variances; that none of them carries an analytic finite-sample guarantee in these texts;
that all evidence of error-rate behaviour is Monte Carlo; and that Games–Howell is
documented by all three sources as exceeding the nominal familywise level by a small
amount in some configurations. No author-side SR-I result exists in the fixed inputs, so
this record proposes candidate dispositions only (Section 14): `CLOSED` is defensible
for the source-acquisition obstacle, subject to three catalogue narrowings that the
steward must accept or reject (Sections 10 and 13). No `GO`, no repair closure, and no
formal acceptance is issued here.

## 1. Investigation identity

| Field                             | Value                                                                                                                                                       |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository                        | `licklider-ai/nomue-protocol` (public)                                                                                                                      |
| Fixed investigation commit        | `7cf5a5d0a14446fce0a67d0850793bbd4e117d67`                                                                                                                  |
| Its tree                          | `f806edd99e94adbc9f12193ea52ec3a08611da20`                                                                                                                  |
| Its sole parent                   | `c6ba9c923d142e0dacbb62ea20009cbd0ecb34c5` (exactly one `parent` line)                                                                                      |
| Source-acquisition result path    | `governance/drafts/release-3-preparation/semantic-source-acquisition-result.md`                                                                             |
| Result blob / bytes / SHA-256     | `608cd7b04d2d34accb209060ee9163b39210f4f9` / 389970 / `48adf4a0f94fd2c0d2fc509aef1a579feb8651d339135c021975093578621f32`                                    |
| Commission path / blob            | `governance/drafts/release-3-preparation/semantic-source-acquisition-commission.md` / `3c7ddcc696f0c284213f7efe0da68e747bc238d7` (8158 bytes)               |
| Fixed semantic input commit       | `7bd9c5ab854777c3e99e624d9d2ed62731228852` (tree `f0436f5784dbe34d4c150893c20a60f0431c5d90`)                                                                |
| Fixed semantic input path / blob  | `governance/drafts/release-3-preparation/semantic-research-result.md` / `8f21526040924b891f64724c2d0fde9ea94eff92` (102312 bytes)                           |
| Live state observed at start      | `origin/main` at `cd217f88238a2ecc57b72f5835a813d92270f5ad`; `research/r3-srf-acceptance-20260908` at `7cf5a5d0…` (unchanged from the fixed commit)         |
| PR #224                           | head `7cf5a5d0…`, base `research/r3-source-receipt-42-20260908`, merged into that research aggregation branch on 2026-09-08; not an integration into `main` |
| Investigation date                | 2026-09-08 (09:22–10:40 UTC approximately)                                                                                                                  |
| Investigator role                 | separate-context independent primary-source investigator for SR-I                                                                                           |
| Investigation branch              | `review/r3-sri-primary-investigation-20260908`, created from the fixed investigation commit as sole parent                                                  |
| Files added by this investigation | this file and `reproduce-sr-i.py` (same directory)                                                                                                          |
| Files changed                     | none                                                                                                                                                        |

### 1.1 Identity gate

| Check                                    | Expected             | Observed                                                                                          | Result |
| ---------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------- | ------ |
| Fixed commit object                      | commit `7cf5a5d0…`   | `git cat-file -p` → tree `f806edd9…`, single parent `c6ba9c92…`                                   | match  |
| Sole parent                              | `c6ba9c92…`          | exactly one `parent` line                                                                         | match  |
| Result blob at the fixed commit          | `608cd7b0…`          | `git ls-tree 7cf5a5d0… governance/drafts/release-3-preparation/` → `608cd7b0…` at the result path | match  |
| Result bytes / SHA-256                   | 389970 / `48adf4a0…` | `git cat-file -s` → 389970; `git cat-file -p … \| sha256sum` → `48adf4a0…`                        | match  |
| Commission blob at the fixed commit      | `3c7ddcc6…`          | present at the commission path in the same `ls-tree`                                              | match  |
| Semantic input blob at `7bd9c5ab…`       | `8f215260…`          | `git ls-tree 7bd9c5ab… …/semantic-research-result.md` → `8f215260…`                               | match  |
| Semantic input blob also at fixed commit | `8f215260…`          | same blob at the same path in `7cf5a5d0…` (untouched between the two commits)                     | match  |
| Base branch position                     | `7cf5a5d0…`          | `git ls-remote origin refs/heads/research/r3-srf-acceptance-20260908` → `7cf5a5d0…`               | match  |
| Recommended branch name unused           | absent on the remote | `git ls-remote` returned no ref for `review/r3-sri-primary-investigation-20260908`                | match  |

The fixed commit carries no author-side SR-I result: in the result blob, C-I1 and C-I2
are `NOT_INSPECTED` (Section 3 claim table), SR-I is `INPUT_INCOMPLETE` in every ledger
through Q.4, and Q.4 names SR-I as the next queued author research. This record is
therefore an independent investigation of the sources, not a review of an author-side
result.

## 2. Independence, reading order, and model testimony

**Separate context.** This session was created fresh on 2026-09-08 (09:21:54 UTC) from a
clean clone. It did not participate in any earlier pass, drafting, or review recorded in
the result blob or in any preserved review branch. The investigator has no carried-over
memory of the target texts beyond general statistical training; every pinpoint, number,
and formula below was re-derived from the attached PDFs or from Git objects during this
session.

**Same-model caveat.** The session service reports configured model `claude-fable-5-1`
and last-served model `claude-fable-5-1` (recorded from the session-description tool
during this session; an exact-build log is not obtainable and is not claimed). The
result blob records that earlier independent reviewers also testified to
`claude-fable-5-1` service (result blob lines 1578–1580, 3270, 3648). Separate-context
independence is therefore claimed; same-model-family independence is not, and a fresh
chat alone is not treated as sufficient for the former — the disclosure of reading order
below is the supporting evidence.

**Reading order (disclosed exactly).**

1. `AGENTS.md`, `CHARTER.md`, `AUTHORITY.md`, the head and relevant target entries of
   `authority/authority-manifest.yaml`, the head and profile-namespace entries of
   `registries/requirements.yaml`, `governance/ID-POLICY.md`, `governance/RFC.md`, the
   Release 3 preparation `README.md`, and the commission blob.
2. Git identity gate (Section 1.1) and PDF identity gate (Section 3).
3. **Exposure before the primary texts:** while locating sections by keyword search,
   the investigator saw the one-line catalogue rows for HET-01/02/03 (semantic input
   Section 8.5 and the Section 9 procedure table row for Games–Howell), the Section 17
   hold row for SR-I, and the result blob's claim-table rows C-I1/C-I2 (both
   `NOT_INSPECTED`). These are short characterizations, not findings; they are
   disclosed because the work was not blind to them.
4. The three PDFs were then read in full from text extraction (Games–Howell, Dunnett,
   Tamhane in that order), and the investigator's own notes on construction,
   assumptions, degrees of freedom, and evidence type were written **before** step 5.
5. Only then were the fixed semantic input's Sections 2.2, 5 (I-04), 6 (D-02), 8.5, 9,
   10 (D7), 15, and 17, and the result blob's D.2, D.3, D.4.2, N.2, N.3, N.4, Q.4 read.
   The result blob's Part H.2 rows B-3 to B-6 (Šidák 1967 scope) were read after all
   three PDFs, to avoid contradicting or duplicating an already-inspected source
   boundary (Section 8.3).
6. Page images of the decision-bearing pages were then checked (Section 3.2), the
   reproductions were run, and this record was written.

No earlier review record for SR-I exists to read. Nothing was read from private
repositories.

## 3. Source identity and inspection boundary

### 3.1 Identity gate for the supplied PDFs

The stored identities in the result blob (D.2 for suppliers 27 and 28; N.3 for supplier 34) were read first, then the attached files were hashed and paged with PyMuPDF 1.28.2.

| Supplier | File                  | Bytes (stored / observed) | PDF pages (stored / observed) | SHA-256 (observed; equals stored)                                  | Result |
| -------- | --------------------- | ------------------------- | ----------------------------- | ------------------------------------------------------------------ | ------ |
| 34       | `34_Games_1976.pdf`   | 994128 / 994128           | 13 / 13                       | `eee42d00cdd66f9f24e334c2db503e17233fc73b6a87ed5f85c6868f17a2c021` | match  |
| 27       | `27_Tamhane_1979.pdf` | 1759491 / 1759491         | 11 / 11                       | `f6183845a373361b8840040ecd9f0afce59cb8cb5170abf44c551376cd414bf0` | match  |
| 28       | `28_Dunnett_1980.pdf` | 726755 / 726755           | 6 / 6                         | `ac862081c93be6ce38ba0dc17b811cb3dd96227cf6ba50f66a7c35715a2870a0` | match  |

Bibliographic identity, confirmed from the first printed page of each file:

- **SRC-20 / supplier 34.** Games, P. A., and Howell, J. F. (1976), "Pairwise Multiple
  Comparison Procedures with Unequal N's and/or Variances: A Monte Carlo Study,"
  _Journal of Educational Statistics_ 1(2):113–125. No publisher cover: PDF page _n_ is
  printed page 112 + _n_ (PDF 1 = p. 113, PDF 13 = p. 125). The PDF header line reads
  "Summer 1976, Volume 1, Number 2, Pp. 113-125" (the text layer garbles this line; the
  page image is unambiguous).
- **SRC-21a / supplier 27.** Tamhane, A. C. (1979), "A Comparison of Procedures for
  Multiple Comparisons of Means with Unequal Variances," _JASA_ 74(366):471–480; DOI
  `10.1080/01621459.1979.10482541`. PDF page 1 is a Taylor & Francis cover; PDF page _n_
  is printed page 469 + _n_ (PDF 2 = p. 471, PDF 11 = p. 480).
- **SRC-21b / supplier 28.** Dunnett, C. W. (1980), "Pairwise Multiple Comparisons in
  the Unequal Variance Case," _JASA_ 75(372):796–800; DOI
  `10.1080/01621459.1980.10477552`, Applications Section, December 1980. PDF page 1 is a
  Taylor & Francis cover; PDF page _n_ is printed page 794 + _n_ (PDF 2 = p. 796, PDF 6
  = p. 800). This is the unequal-variance paper (the catalogue's "Dunnett 1980b"), not
  the homogeneous-variance paper at pp. 789–795 (SRC-08); p. 796 cites the latter as
  "the previous article (Dunnett 1980)" and p. 800 lists it separately.

No missing or mismatched source exists, so no `SOURCE_ACCESS_INCOMPLETE` partition is
needed for SR-I.

### 3.2 Inspection boundary

Every page of all three papers was read from the text layer. The following pages were
additionally checked as rendered page images (150 dpi) because they carry the formulas,
tables, or footnotes on which findings depend: Games–Howell pp. 116, 117, 118, 119,
121, 123; Tamhane pp. 473, 475, 476, 477, 480; Dunnett pp. 796, 797, 798, 799, 800.
Tables were transcribed from the page images, not from the text layer. Page images and
extractions are not committed.

Not inspected (cited by the sources, not in the packet): Tamhane (1977), Keselman and
Rogan (1978), Ury and Wiggins (1971), Pratt (1964), Cochran (1964), Hochberg (1975),
Šidák (1967) (inspected earlier by the author-side Part H, see Section 8.3), Dunnett
(1980a, pp. 789–795; SRC-08), Harter (1960), Stoline and Ury (1979), Hahn and
Hendrickson (1971), Wang (1971). Section 8.4 states which claims depend on these.

## 4. Games and Howell (1976) — direct findings (C-I1, HET-01)

Pinpoints are printed pages. "GH" denotes the procedure the paper calls "Method BF"
(the Behrens–Fisher modification of Tukey's WSD).

### 4.1 Model and assumptions (item 1)

- p. 113: K independent populations; the family is the complete set of K(K−1)/2
  pairwise contrasts; per-comparison rate P(EI) and familywise rate FWI are defined on
  pp. 113–114 (FWI = "probability of making one or more Type I errors in the complete
  family of contrasts").
- pp. 114, 116: normality is assumed throughout; variances are allowed to differ;
  sample sizes are allowed to differ; the per-pair variance estimates are the two
  sample variances s²_k, s²_k′ with n_k − 1 and n_k′ − 1 df (p. 116 formula).
- p. 116 (citing Mehta and Srinivasan 1970 and Wang 1971) and p. 122: the paper's own
  operating advice is a minimum n of 6 per group; control is "dubious" at n = 3.

### 4.2 Statistic, degrees of freedom, critical value, sidedness (item 2)

- p. 116: Welch's approximate t, v = (Ȳ₁ − Ȳ₂)/√(s₁²/n₁ + s₂²/n₂), rejects H₀ if
  |v| ≥ t(α/2, ν) with
  ν = (s₁²/n₁ + s₂²/n₂)² / [(s₁²/n₁)²/(n₁−1) + (s₂²/n₂)²/(n₂−1)].
- p. 117: "Method BF used the v statistic and Welch df. H₀ was rejected if
  |v| ≥ q(α, K, ν)/2^{1/2}" where q is the Studentized range point for K means; "The
  above critical values should set FWI ≈ .05." Two-sided throughout.
- pp. 122–123: the same construction is presented as "approximate 95% simultaneous
  confidence intervals" Ȳ_k − Ȳ_k′ ± q(.05, K, ν)/√2 · √(s²_k/n_k + s²_k′/n_k′)
  (Table V and the worked pair 4–1). The paper computes ν = 6.937 and **rounds to 7**
  before entering the range table; Table V lists integer df only (13, 7, 6, 10, 10, 4).
- p. 122, Table IV: the illustration includes a sample with variance exactly 0
  (sample 3, n = 10); for the pair 1–3 the df collapses to n₁ − 1 = 4 and the interval
  width uses s₁²/n₁ alone. The paper does not comment on this edge case.
- No one-sided version, no contrast extension, and no p-value or adjusted-p output is
  described. The paper states no formal null beyond the pairwise equalities and the
  omnibus null (p. 113).

### 4.3 Error-rate concepts and the strength of the claim (item 3)

- The paper distinguishes P(EI) from FWI (pp. 113–114) and reports both.
- FWI is estimated only under the complete null (all four means equal; p. 117 states
  that non-null conditions were created by adding constants, and those runs feed the
  power columns). The word "control" is used descriptively of simulation outcomes;
  there is no theorem, no inequality, and no claim of strong control. The abstract
  (p. 113) claims "satisfactory control" for unequal n's of six and up and calls
  control with n's of three "dubious".
- Investigator note (inference, Section 9): because the intervals are location-pivotal,
  their complete-null non-coverage rate equals the joint non-coverage rate under any
  mean configuration; this is the only sense in which the complete-null FWI evidence
  speaks to partial nulls, and it is not stated by the paper.

### 4.4 What is proved versus what is simulated (item 4)

Nothing is proved. The evidence is entirely Monte Carlo:

- pp. 116–117 design: K = 4; multiplicative congruential generator (Payne et al. 1969,
  cycle 2³¹ − 2); each datum drawn from a stored population of 10,000 normal deviates
  and scaled; four variance conditions 4:4:4:4, 1:3:5:7, 1:1:7:7, 1:1:1:13 (mean
  variance 4); three n conditions; 1,000 experiments per VC × NC cell in replications
  of 250; the "unbiased" rows pool 2,000 experiments (Tables I and III footnotes).
- Investigation One (moderate n: NC 1 = 6, 10, 14, 16; NC 2 = 10 each; NC 3 = 16, 14,
  10, 6), Table I (p. 118): BF FWI from .041 to .071 across the eleven rows; "the mean
  FWI value of the BF method is slightly above the .05 level; a 95 percent confidence
  interval runs from .0545 to .0631" (p. 118). The paper says the results "do not
  contradict the hypothesis that the BF method provides stable control of FWI".
- Table II (p. 119): per-contrast P(EI) at t(.025) critical values; BF stays near .05
  where MSW and t are biased.
- Investigation Two (small n: NC 1 = 3, 4, 8, 11; NC 2 = 5 each; NC 3 = 11, 8, 4, 3),
  Table III (p. 121): BF FWI from .048 to .092; under NC 3 the three heterogeneous rows
  are .092, .082, .080 (2,000 experiments), attributed on p. 120 to contrasts pairing
  n = 3 from a large-variance population with n = 11 or 8 from a small-variance one,
  where "the BF was positively biased".
- Nominal-level exceedance is therefore documented by the paper itself, both on average
  (moderate n) and materially (small n with adverse pairing).

### 4.5 Relation to the other procedures (item 5)

The paper compares BF only with MSW (Kramer-type pooled-variance range test) and the
two-sample pooled t with a range critical value. T2, T3, and C are not mentioned (they
post-date it).

### 4.6 Printed doubts and internal inconsistencies (item 6)

- p. 123 text: "q(.05,4,7)/√2 = 4.69/1.4142 = 3.316". Recomputation gives
  q(.05; 4, 7) = 4.681 (Section 12.1), so 4.68 rather than 4.69 would be the rounded
  table value; the printed interval for pair 4–1 (2.5196, 4.4004) is consistent with
  3.316 and not with 3.310. The other five intervals reproduce from the standard table
  values to the printed precision. Retained as a printed-value doubt; no erratum is
  asserted.
- p. 113 running head is garbled in the PDF text layer ("Volume 13 Number 23"); the
  page image reads Volume 1, Number 2.
- Tables I and III present rows with 1,000 and 2,000 experiments side by side; the
  footnotes make this explicit, but the text's "1,000 random experiments of each cell"
  (p. 117) does not mention the pooling.

### 4.7 Catalogue comparison for HET-01 (item 7)

See Section 10.

## 5. Tamhane (1979) — direct findings (C-I2, HET-02; also HET-01 evidence)

### 5.1 Model and assumptions (item 1)

- p. 471: one-way fixed-effects model, e_ij independent N(0, σ_i²), all μ_i and σ_i²
  unknown; s_i² an unbiased estimate of σ_i² on ν_i df independent of X̄_i, "for the
  most part" ν_i = n_i − 1.
- p. 472: procedures of the second group (all pairwise differences, extendable to
  contrasts) are "inexact; that is, they are either conservative or approximate"
  because "the contrasts problem is a generalization of the Behrens–Fisher problem for
  which no exact solution is known to exist".
- p. 473: "most of the procedures … are approximate-conservative (approximate because of
  the Welch solution; conservative because of the Bonferroni-type inequality used). The
  validity of the Welch solution in the case of the two-sample problem has been
  demonstrated by Wang (1971). Wang recommends that … n_i ≥ 6 for each sample."

### 5.2 Constructions, df, critical values (item 2)

- (2.5), p. 473: ν̂_ij = (s_i²/n_i + s_j²/n_j)² / {s_i⁴/n_i²(n_i−1) + s_j⁴/n_j²(n_j−1)} —
  identical to Games–Howell's p. 116 formula.
- **GH**, p. 473: μ_i − μ_j ∈ [X̄_i − X̄_j ± q_{ν̂_ij,k,α} · (1/√2) · (s_i²/n_i +
  s_j²/n_j)^{1/2}], q the upper α point of the Studentized range with parameters k and
  ν; "approximate 100(1 − α)% joint CI's"; "The use of the studentized range statistic
  in the GH procedure does not seem to have been adequately justified; in fact it turns
  out in the MC studies that in some instances GH procedure yields familywise Type I
  error rate greater than the specified level α, that is, it is radical."
- **T2**, p. 473 (proposed in Tamhane 1977, restated here): μ_i − μ_j ∈ [X̄_i − X̄_j ±
  t_{ν̂_ij,γ}(s_i²/n_i + s_j²/n_j)^{1/2}], t_{ν,γ} the upper γ point of Student's t,
  γ = ½{1 − (1 − α)^{1/k′}}, k′ = k(k−1)/2; "based on the Welch solution and the Šidák
  inequality"; "approximate-conservative". T1 (Banerjee's solution with Šidák) is
  dropped as "highly conservative relative to T2".
- **UW**, p. 473: same as T2 with Bonferroni β = α/2k′ instead of Šidák γ.
- **§3.2 df modification (Ury and Wiggins, based on Pratt 1964)**, p. 474: ν̂_ij is
  replaced by n_i + n_j − 2 when one of four balance conditions holds (9/10 ≤ n_i/n_j ≤
  10/9; 9/10 < (s_i²/n_i)/(s_j²/n_j) < 10/9; 4/5 ≤ n_i/n_j ≤ 5/4 and ½ ≤ ratio ≤ 2;
  2/3 ≤ n_i/n_j ≤ 3/2 and ¾ ≤ ratio < 4/3). Modified procedures are primed: UW′, T2′,
  GH′, BF′. "In fact, in our MC studies GH′ was tried but turned out to be substantially
  radical. Therefore, we retained GH, which itself is somewhat radical." The original
  UW, T2, and BF "are dropped from further consideration" in favour of UW′, T2′, BF′.
- **The procedure simulated in this paper under the name T2′ is T2 with the df
  replacement; the unmodified T2 is not simulated here** (Table 3 rows are D′, S, H1,
  T2′, GH, BF′, TSS, GT2).
- p. 475, §4: "It is easy to check that q_{ν,k,α}/√2 ≤ t_{ν,γ} with equality holding
  iff k = 2. Thus GH uniformly dominates T2." No proof is given; the inequality is
  verified numerically in Section 12.2. The paper adds that GH versus T2′ is not
  ordered, because their df can differ.
- p. 472: pairwise intervals extend to all contrasts by Hochberg (1975) Lemma 3.1;
  "This extension is not in the original articles of Ury and Wiggins and Games and
  Howell."

### 5.3 Error-rate concept and strength (item 3)

The criterion is the achieved joint confidence level of the k′ intervals (p. 471, "(a)
… correspond to the familywise Type I error rate"), estimated with all μ_i = 0
"without loss of generality" (p. 476). No procedure of the second group is claimed to
have an exact or proved level; T2 and T2′ are "approximate-conservative"; GH is
"approximate" and observed "radical".

### 5.4 Proved versus simulated (item 4)

- Simulation design (pp. 475–476): k = 4 and 8; α = .05 reported (.10 also run,
  "quite similar"); eight (σ², n) configurations per k with n_i ∈ {7, …, 13} and
  variances (1,1,1,1), (1,2,3,4), (1,4,7,10) in direct and reversed pairing with sample
  sizes (Table 1, p. 476); 1,000 experiments per cell; X̄_i ~ N(0, σ_i²/n_i) and
  s_i² ~ σ_i²χ²_{ν_i}/ν_i generated directly (Box–Muller; χ² by −Σ log U for even ν;
  RANF). Critical points (§5.2, p. 476): t by IMSL MDSTI ("exact results even in the
  case of fractional df"); q by interpolation in Harter (1960); |m| by interpolation in
  Stoline and Ury; "Linear harmonic interpolation with respect to the df was used".
- Table 3 (p. 477), estimated confidence levels (SE ≈ .0069 at .95; asterisk = below
  .942, the 10 % one-sided critical region): T2′ ranges .947–.973 (k = 4) and .942–.973
  (k = 8), never asterisked; GH ranges .936–.957 (k = 4; asterisks at configurations 3
  and 8) and .916–.949 (k = 8; asterisks at configurations 1, 3, 4).
- p. 477: "only GH tends to be liberal but there does not seem to be any specific
  pattern of configurations for which GH is liberal. This liberal nature of GH was
  noted in Games and Howell (1976), although in the MC study done by Keselman and Rogan
  (1978) GH is shown to control the confidence level more precisely."
- Table 4 (p. 478): GH gives the shortest average half-widths in all eight
  configurations, T2′ next.
- p. 479, recommendations: "we would recommend GH and T2′ for pairwise comparisons, GH
  giving slightly narrower CI's than T2′ at the risk of not attaining the designated
  confidence level by a small amount in some cases. For general contrast comparisons we
  recommend the BF′ procedure."

### 5.5 Relation between the procedures (item 5)

GH and T2 share the statistic, the df formula, and the interval form; they differ only in
the critical constant (range/√2 versus Šidák t). T2′ and GH′ differ from T2 and GH by
the §3.2 df replacement. T3 and C do not appear in this paper (Dunnett p. 797 states
this).

### 5.6 Printed doubts and internal inconsistencies (item 6)

- p. 479 reference list prints "Games, Paul A., and Howell, John F. (1986)"; the text
  and the journal volume (1, 113–125) show 1976. Retained as a printed error in the
  reference list; the citation target is unambiguous.
- p. 476 cites "Stoline and Ury (1978)" for the |m| tables while p. 480 lists Stoline
  and Ury (1979), _Technometrics_, "to appear". Retained as an internal inconsistency;
  Dunnett p. 797 cites the same tables as (1979).
- The text layer of Table 3 is unreliable; the image was used (Section 3.2).

## 6. Dunnett (1980b) — direct findings (C-I2, HET-03; also HET-01 and HET-02 evidence)

### 6.1 Model and assumptions (item 1)

p. 796: y_ij = μ_i + e_ij with e_ij independent N(0, σ_i²), μ_i and σ_i² unknown;
s_i² an unbiased estimate of σ_i² on ν_i df independent of ȳ_i (the simulation uses
ν_i = n_i − 1, p. 797); target: joint confidence intervals for the k(k−1)/2 differences.

### 6.2 Constructions, df, critical values (item 2)

All four procedures share the interval form (1.2): ȳ_i − ȳ_j ± A_{ij,α,k}(s_i²/n_i +
s_j²/n_j)^{1/2}, "where A_{ij,α,k} is to be chosen to achieve, if possible, the desired
joint confidence coefficient 1 − α".

| Procedure | A_{ij,α,k} (p. 796)                                                                                                       | df concept                                                                                                                        | Basis stated by the paper                                                                                                                                                    |
| --------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GH        | (1.3) SR_{α,k,ν̂_ij}/√2                                                                                                    | (1.4) ν̂_ij = (s_i²/n_i + s_j²/n_j)²/(s_i⁴/n_i²ν_i + s_j⁴/n_j²ν_j), attributed to Smith (1936), Welch (1938), Satterthwaite (1946) | Games and Howell (1976); Welch approximate-df analogue of Student's t                                                                                                        |
| C         | (1.5) SR_{α,k,ν**ij}/√2 with (1.6) SR*{α,k,ν*_ij} = (SR_{α,k,ν_i}·s_i²/n_i + SR_{α,k,ν_j}·s_j²/n_j)/(s_i²/n_i + s_j²/n_j) | implied ν*_ij lies between ν_i and ν_j (p. 800)                                                                                   | weighted average of two range points, extending Cochran (1964); "does not appear to have been previously suggested"                                                          |
| T2        | (1.7) t_{γ,ν̂_ij}, the two-sided γ point of Student's t, γ = 1 − (1 − α)^{1/k*}, k* = k(k−1)/2                             | (1.4)                                                                                                                             | Tamhane (1977, 1979); Šidák's multiplicative inequality                                                                                                                      |
| T3        | (1.8) SMM_{α,k*,ν̂_ij}, the α point of the Studentized maximum modulus of k* uncorrelated normal variates with ν̂_ij df     | (1.4)                                                                                                                             | Šidák's (1967) uncorrelated-t inequality, "sharper" than the multiplicative inequality; "does not appear to have been previously proposed"; tables in Stoline and Ury (1979) |

Dunnett's γ is the two-sided point 1 − (1 − α)^{1/k*}; Tamhane's γ is the upper-tail
point ½{1 − (1 − α)^{1/k′}}. They define the same critical value (Section 9, inference).
All intervals are two-sided; no one-sided variant, contrast extension, or adjusted-p
output is described.

### 6.3 Error-rate concept and strength (item 3)

The criterion is the error rate = 1 − (joint confidence coefficient) for the k* intervals
(p. 797, "whether any of them have failed to include the true value μ_i − μ_j = 0"). The
paper's own statements of guarantee strength:

- p. 797: T2 is "approximate-conservative" (quoting Tamhane); T3 "is
  approximate-conservative and, since it is based on a sharper Šidák bound, it will have
  uniformly shorter confidence interval length than the T2 procedure. It remains to be
  determined whether it is actually conservative; one of the aims of the computer
  simulation study … was to determine whether this is the case."
- p. 799, §4.2: at df = ∞ (known variances) "the GH procedure is known to have error
  rate ≤ α, based on the results of the preceding article (Dunnett 1980). However, this
  is not necessarily true for finite df."
- p. 800, §4.3: "The C and GH procedures become identical for infinite df. Thus the C
  procedure can also claim to achieve error rates ≤ α in the infinite df (known
  variance) case. Based on the results in Table 1, the C procedure is conservative for
  finite df."

No finite-df theorem is stated for any of the four procedures.

### 6.4 Proved versus simulated (item 4)

- Design (pp. 797–799): k = 4 and 8; ȳ_i = x_iσ_i/√n_i with x_i ~ N(0,1) (IMSL GGNOR);
  s_i² = σ_i²χ²_i/ν_i with χ² from uniforms (GGUBS) through AS 91 (PPCHI2); ν_i =
  n_i − 1; SR points from Harter (1960) with quadratic interpolation on reciprocal df
  (fractional ν̂ for GH, integral ν for C); SMM points from the author's own program
  ("believed to be accurate to four decimal places", agreeing with Hahn and Hendrickson
  1971 and Stoline and Ury 1979 to three places) with the same interpolation; t points
  from IMSL MDSTI; α = .05 only. Base sample sizes (7,7,7,7), (7,9,11,13), (7,…,7 for
  k = 8), each multiplied by 1, 2, 8, ∞ with σ_i²/n_i held fixed so that only ν_i
  changes; variance patterns (1, c, c², c³) and (1,1,c,c,c²,c²,c³,c³). The same normal
  and uniform draws are reused across all conditions ("positive correlation between the
  error rate estimates", p. 799). N = 10,000 per set; SE ≈ .0022 at .05 (p. 799).
- Table 1 (p. 798), estimated error rates at nominal .05 (60 cells per procedure):
  - GH: Simulation I (k = 4, equal n) .0493–.0531; Simulation II (k = 4, unequal n)
    .0422–.0534; Simulation III (k = 8) .0286–.0622. All values above .05 occur at
    c ∈ {.5, 1, 2, 4} with ×1 or ×2 df; at k = 8, ×1 the rates are .0622, .0593, .0603,
    .0570, .0521 for c = .5, 1, 2, 4, 10. Footnote a (GH only) marks cells whose rate
    differs significantly from the c = 1 rate (McNemar continuity-corrected χ² > 3.84).
  - C: .0225–.0503; the only value at or above .05 (.0503) is the c = 1, ×∞ cell of
    Simulation II, where C and GH coincide by construction.
  - T2: .0221–.0425. T3: .0223–.0438. Both below .05 in every cell; T3 ≥ T2 in every
    finite-df cell and equal at ×∞.
  - TK (Tukey–Kramer, pooled variance) is included as a baseline and is "not valid for
    unequal variance situations".
- Table 2 (p. 798) compares average A for C and T3 as a function of V =
  (s_i²/n_i)/(s_j²/n_j) ∈ {1, 2, 4, 10, ∞}; "not obtained by simulation, but rather …
  computed for each (i, j) pair and averaged" (p. 799). Reproduced in Section 12.4.
- Conclusions (pp. 799–800): T2 and T3 "are both conservative"; identical at df → ∞;
  T3 less conservative and preferred. GH's error rate "decreases as the value of c
  becomes either much smaller or much larger than 1"; "for c = 1, the error rate seems
  to increase slightly as the df become small, although the change is statistically
  significant only for k = 8"; "for finite df, the GH procedure appears to become
  somewhat liberal for the value c = 1 … However, values of c near 1 are likely to be
  of more interest in practice". C is conservative for finite df, "more conservative
  than T2 and T3" for small df, "preferable when the df are large or moderately large".

### 6.5 Relation between the procedures (item 5)

- p. 797: Tamhane (1979) narrowed the practical choice to GH or T2; C and T3 were not
  considered there.
- p. 800: C's implied df ν*_ij lies between ν_i and ν_j, whereas GH's ν̂_ij "may be as
  high as ν_i + ν_j"; the displayed identity
  1/ν̂ = 1/ν′ − 2V/((V+1)²·ν̄), ν̄ the harmonic mean of ν_i and ν_j, "places the point ν̂
  to the left of ν′ … in the direction of smaller df and hence a more liberal value of
  SR". Section 12.5 verifies the identity and records that it holds exactly when ν′ is
  the weighted average taken on the reciprocal-df scale (the figure's abscissa), not on
  the df scale.
- p. 799: "The GH intervals are always shorter than the C intervals and the T2 intervals
  are always longer than the T3 intervals."

### 6.6 Printed doubts and internal inconsistencies (item 6)

- p. 799 text: variance multipliers "c = .1, .25, .5, 1, 2, 4, 10 chosen to cover a wide
  range"; Table 1 (p. 798) tabulates only c ∈ {.5, 1, 2, 4, 10}. Results for c = .1 and
  .25 are not reported. Retained as a text–table discrepancy.
- p. 796, (1.6) in the text layer is garbled; the page image gives the formula as
  transcribed in Section 6.2.
- Table 1 text layer misreads several cells ("0.041Ea", "0.I046"); the image was used.
- The p. 799 claim that GH has error rate ≤ α at df = ∞ is a pointer to Dunnett (1980a),
  not a result of this paper (Section 8.4).

## 7. Cross-source comparison: what is the same and what must be kept separate

### 7.1 Shared elements (stated by the sources)

| Element                  | Games–Howell 1976                                   | Tamhane 1979                                         | Dunnett 1980b                                             | Same?                                          |
| ------------------------ | --------------------------------------------------- | ---------------------------------------------------- | --------------------------------------------------------- | ---------------------------------------------- |
| Model                    | K independent normal samples, unequal σ², unequal n | one-way fixed effects, e_ij independent N(0, σ_i²)   | same as Tamhane                                           | yes                                            |
| Family                   | all K(K−1)/2 pairs                                  | all pairs (extension to contrasts via Hochberg 1975) | all k(k−1)/2 differences                                  | yes for the pairwise family                    |
| Per-pair statistic       | v = diff/√(s₁²/n₁ + s₂²/n₂)                         | same                                                 | same (interval form (1.2))                                | yes                                            |
| Welch df                 | p. 116 formula with n − 1                           | (2.5), with n − 1                                    | (1.4), with general ν_i                                   | yes (identical for ν_i = n_i − 1)              |
| GH critical constant     | q(α, K, ν)/√2                                       | q_{ν̂_ij,k,α}/√2                                      | SR_{α,k,ν̂_ij}/√2                                          | yes                                            |
| Fractional-df handling   | rounds ν to an integer (worked example)             | linear harmonic interpolation in tables              | quadratic interpolation on reciprocal df                  | **no** — three different numerical conventions |
| Sidedness / output       | two-sided tests and intervals                       | two-sided intervals                                  | two-sided intervals                                       | yes                                            |
| Evidence type            | Monte Carlo (data level, 1,000–2,000 per cell)      | Monte Carlo (statistic level, 1,000 per cell)        | Monte Carlo (statistic level, 10,000 per set, correlated) | all simulation; no theorem in any paper        |
| GH exceeds nominal level | yes (p. 118 CI .0545–.0631; Table III up to .092)   | yes ("radical"; Table 3 as low as .916)              | yes (up to .0622 at k = 8; "somewhat liberal" at c = 1)   | all three agree                                |

### 7.2 Elements that must be treated as distinct procedures

1. **GH versus GH′.** GH′ (Games–Howell with the Ury–Wiggins/Pratt df replacement) is
   "substantially radical" (Tamhane p. 474). Any Protocol identity for HET-01 must
   exclude the df replacement.
2. **T2 versus T2′.** T2 (Welch df, Šidák t) is defined in Tamhane 1977 and restated in
   1979 and 1980b. The 1979 simulation evidence is for T2′ (df replaced under the four
   balance conditions); the 1980b evidence is for T2 with the plain Welch df (1.4). The
   catalogue label "Tamhane T2 (1979)" spans two variants whose evidence is separate.
3. **T3 versus C.** Same interval form and same family, but different critical
   distributions (SMM of k* uncorrelated variates at Welch df versus a weighted average
   of two Studentized-range points at the two integer df), different df behaviour (T3
   uses ν̂_ij up to ν_i + ν_j; C's implied df lies between ν_i and ν_j), and opposite
   ordering of interval length across df (Dunnett Table 2). One catalogue entry
   (HET-03) currently covers both.
4. **GH versus C.** Identical at df = ∞ only; for finite df C is uniformly more
   conservative and longer.
5. **T2 versus T3.** Identical at df = ∞ only; T3 ≤ T2 in critical value for finite df
   (verified numerically in Section 12.2 for common df).

### 7.3 Notation differences that do not change the procedure

- γ as upper-tail (Tamhane) versus two-sided (Dunnett) probability: same critical value.
- k′ (Tamhane) and k* (Dunnett) both denote k(k−1)/2.
- Games–Howell writes q(α, K, ν) for what the others write q_{ν,k,α} or SR_{α,k,ν}.

## 8. Conflicts, unresolved questions, and unread dependencies

### 8.1 Conflicts between the sources

None on constructions or df. On the assessment of GH there is a difference of emphasis,
not of data: Games–Howell (1976) describe BF as providing "adequate control" for n ≥ 6
while reporting a mean FWI above .05; Tamhane calls GH "radical" in some configurations;
Dunnett locates the liberality at variance ratios near 1 with small df. All three data
sets show exceedances of the same order (roughly 10–25 % relative at k = 4, up to
roughly 25 % at k = 8 or n = 3).

### 8.2 Contrary evidence cited but not inspected

Tamhane p. 477 reports that Keselman and Rogan (1978) found GH "to control the
confidence level more precisely". That study is not in the packet. It does not change
the finding that the assigned sources document exceedances; it is recorded as a possible
reopen item only if a proposal relies on GH attaining the nominal level.

### 8.3 Basis of the "conservative" label for T2 and T3

Both papers label T2 and T3 "approximate-conservative" by construction (Šidák
inequality) and confirm conservativeness only by simulation. The author-side Part H.2
(rows B-5 and B-6, read after the PDFs) records from Šidák (1967) that the studentized
extension uses one common random scale and "does not license arbitrary
coordinate-specific standard errors", and that the discussion "distinguishes the
unknown-unequal-variance case". The T2/T3 statistics have pair-specific denominators
built from two sample variances. Neither Tamhane nor Dunnett claims that Šidák's theorem
applies verbatim; both frame conservativeness as expected-and-simulated. **Investigator
conclusion:** the sources support "approximate-conservative, confirmed by simulation in
the studied ranges" and do not support "proved conservative". This is consistent with
Part H's boundary and is not a new conflict.

### 8.4 Proof pointers to sources outside the packet

| Claim                                                      | Where stated              | Depends on (not inspected here)                 | Effect on SR-I                                                                                                                                                                   |
| ---------------------------------------------------------- | ------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GH (and C) have error rate ≤ α at df = ∞ (known variances) | Dunnett p. 799, p. 800    | Dunnett (1980a), SRC-08                         | Not decision-bearing for HET-01/03 (finite df is the case of interest); the semantic input's F-17 records SRC-08's evidence as simulation, so this pointer is not a proof either |
| T2 first proposed; T1 versus T2 simulation                 | Tamhane p. 473            | Tamhane (1977)                                  | Construction fully restated in 1979 and 1980b; the 1977 simulation is not needed for C-I2                                                                                        |
| Welch solution valid for n_i ≥ 6                           | Tamhane p. 473; GH p. 116 | Wang (1971); Mehta and Srinivasan (1970)        | Operating advice only; not a guarantee statement                                                                                                                                 |
| df replacement conditions                                  | Tamhane p. 474            | Ury and Wiggins (1971); Pratt (1964)            | Needed only if a T2′/GH′ variant is ever proposed                                                                                                                                |
| Extension of pairwise intervals to all contrasts           | Tamhane p. 472            | Hochberg (1975), Lemma 3.1                      | Outside the catalogue's pairwise member set for HET-01/02/03                                                                                                                     |
| SMM table values                                           | Dunnett p. 797            | Stoline and Ury (1979); Hahn–Hendrickson (1971) | Numerical lane; the SMM law is fully specified by the text and reproduced in Section 12                                                                                          |

None of these blocks C-I1 or C-I2 as the commission defines them.

### 8.5 Questions the sources do not resolve (Protocol-side decisions)

- Fractional-df handling (round, interpolate, or evaluate the law exactly at
  non-integer df). The three sources use three conventions; Section 12.1 shows the
  choice moves a critical value at the third decimal (3.310 versus 3.318 for the
  worked pair).
- Minimum sample size or minimum df. The sources give advice (n ≥ 6) and observe
  failures at n = 3; none states an admissibility rule.
- Behaviour when a sample variance is zero (Games–Howell's own example, Table IV).
- One-sided intervals, adjusted p-values, and contrast extensions: not described for
  these procedures by these texts.
- Whether a Protocol may describe GH as "controlling" FWER at all (Section 10).

## 9. Facts, inferences, and decisions kept separate

**Facts stated by the sources** are those in Sections 4–6 with pinpoints.

**Investigator inferences (not stated by the sources):**

- I-1. Location pivotality: for each of the four procedures the event "some interval
  misses its true difference" has the same probability under every mean vector, so the
  complete-null simulations of all three papers estimate the joint non-coverage
  probability in general, and the derived tests' familywise error under any partial null
  is bounded by that probability. This is why Tamhane and Dunnett may set μ_i = 0
  "without loss of generality"; Games–Howell's FWI evidence gains the same reach by the
  same argument. The bound is not a guarantee at α: it is a bound by a simulated
  quantity.
- I-2. Tamhane's γ and Dunnett's γ yield identical critical values because the
  two-sided γ point of t at level 1 − (1 − α)^{1/k*} is the upper ½{1 − (1 − α)^{1/k*}}
  point.
- I-3. Dunnett's p. 800 identity is exact when ν′ is defined on the reciprocal-df
  scale; the text's "weighted average of ν_i and ν_j" is loose but the figure's
  abscissa (ν⁻¹) makes the intended scale clear.
- I-4. On common df, GH ≤ T3 ≤ T2 in critical value (Section 12.2). The sources state
  the two pairwise orderings (GH ≤ T2, T3 ≤ T2) but not the chain with common df.
- I-5. The known-variance ordering GH = C at df = ∞ and T2 = T3 at df = ∞ follows from
  the definitions (both range points coincide; the Šidák t and SMM points coincide at
  the normal limit); the sources state both.

**Protocol decisions (not made here):** whether to keep HET-01 as `R3-CAND`, whether to
split HET-02 and HET-03, which fractional-df convention to adopt, what minimum-df or
zero-variance admissibility to require, and whether a simulation-only bound can support
any guarantee wording in a Contract. Software defaults were not consulted and are not
used to fill any of these gaps.

## 10. Claim table and catalogue comparison

### 10.1 Claim-to-source table (C-I1, C-I2)

| Claim ID | Claim (from the result blob's Section 3)            | Established by                                                                                                                                                                                                                               | Status                                             |
| -------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| C-I1     | Games–Howell (1976): construction                   | GH pp. 116–117 (statistic, Welch df, q(α, K, ν)/√2 rejection rule), pp. 122–123 (interval form, Table V); confirmed by Tamhane p. 473 and Dunnett (1.3)–(1.4)                                                                                | `SUPPORTED`                                        |
| C-I1     | Games–Howell (1976): Monte Carlo evidence type      | GH pp. 116–117 (design), Table I p. 118, Table II p. 119, Table III p. 121; no theorem anywhere in the paper                                                                                                                                 | `SUPPORTED`                                        |
| C-I1     | Games–Howell (1976): claimed control                | GH p. 113 (abstract: "satisfactory control" for unequal n ≥ 6; "dubious" at 3), p. 118 (mean FWI CI .0545–.0631), p. 120 (positive bias with n = 3), p. 122 (advice n ≥ 6). Claim is descriptive of simulations; no analytic control claimed | `SUPPORTED` (as a bounded, simulation-based claim) |
| C-I2     | Tamhane (1979) T2: construction and df              | Tamhane p. 473 (T2 formula, γ, k′), (2.5) df; p. 474 §3.2 (T2′ df replacement); Dunnett (1.7) with (1.4)                                                                                                                                     | `SUPPORTED`                                        |
| C-I2     | Tamhane (1979) T2: evidence type                    | Tamhane pp. 475–477 (design, Table 3 for **T2′**); Dunnett Table 1 p. 798 for **T2**; both simulation; "approximate-conservative" label pp. 473, 797                                                                                         | `SUPPORTED` (variant split T2/T2′ noted)           |
| C-I2     | Dunnett (1980b) T3: construction, df, evidence type | Dunnett (1.8) p. 796 with (1.4); p. 797 (Šidák uncorrelated-t basis; "remains to be determined whether it is actually conservative"); Table 1 p. 798; §4.1 p. 799                                                                            | `SUPPORTED`                                        |
| C-I2     | Dunnett (1980b) C: construction, df, evidence type  | Dunnett (1.5)–(1.6) p. 796; p. 797 (Cochran 1964 analogue); Table 1 p. 798; §4.3 p. 800 (df between ν_i and ν_j; conservative for finite df)                                                                                                 | `SUPPORTED`                                        |

### 10.2 Catalogue statements, item by item

| Catalogue statement (fixed semantic input)                                                                                                                                                         | Disposition              | Basis                                                                                                                                                                                                                                                          |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| §2.2 SRC-20: "Heteroscedastic pairwise procedure and its evidence type"                                                                                                                            | supports                 | Section 4                                                                                                                                                                                                                                                      |
| §2.2 SRC-21: "T2/T3/C heteroscedastic pairwise variants"; Dunnett (1980b) JASA 75(372):796–800                                                                                                     | supports                 | Section 3.1 (identity), Sections 5–6                                                                                                                                                                                                                           |
| §8.5 HET-01 "Games-Howell (1976) … snippet evidence indicates Monte Carlo justification, so guarantee type itself needs verification"                                                              | supports, then resolves  | Evidence type is Monte Carlo only; the guarantee type is now verified as: no analytic guarantee; simulated familywise rate near but sometimes above α (Sections 4.4, 5.4, 6.4)                                                                                 |
| §9 HET-01 guarantee: "approximate simultaneous coverage / FWER (evidence type pending)"                                                                                                            | **narrows**              | "Approximate" is supported. "FWER" must be read as a simulation-estimated joint non-coverage that exceeds α by a small amount in documented configurations, with the paper's own n ≥ 6 caveat. No source supports "control at α" in either weak or strong form |
| §9 HET-01 assumptions: "normality; unequal variances; Welch-type df (pending SR-I)"                                                                                                                | supports                 | Sections 4.1–4.2; df formula identical in all three sources                                                                                                                                                                                                    |
| §9 HET-01 outputs: "intervals/tests per pair"; numerics: "Studentized range; per-pair Welch-Satterthwaite df"                                                                                      | supports; narrows        | Outputs supported (two-sided only). Numerics: the fractional-df convention is unresolved among the sources (Section 8.5) and GH′ (df replacement) must be excluded (Section 7.2)                                                                               |
| §8.5 HET-02 "Tamhane T2 (1979)"                                                                                                                                                                    | **narrows**              | T2 is a 1977 procedure restated in 1979; the 1979 evidence is for T2′; the T2 evidence is Dunnett's. Entry identity should name the df variant                                                                                                                 |
| §8.5 HET-03 "Dunnett T3 and C (1980b)"                                                                                                                                                             | **narrows**              | Two procedures with different critical laws and df behaviour (Section 7.2); the paper identity and the "distinct paper from SRC-08" note are supported                                                                                                         |
| §5 I-04: "no inspected source provides a proved heteroscedastic analogue, and the heteroscedastic pairwise candidates rest on simulation-type evidence pending SRC-20/SRC-21 inspection"           | supports (now confirmed) | Sections 4.4, 5.4, 6.4, 8.3                                                                                                                                                                                                                                    |
| §10 D7: "Heteroscedastic pairwise Contracts (HET-01 family) after SR-I"                                                                                                                            | does not resolve         | Sequencing statement; the sources neither support nor contradict it                                                                                                                                                                                            |
| §15: "t-distribution and Welch-Satterthwaite degrees-of-freedom numerics from the two-group lane are reusable inputs to per-pair heteroscedastic constructions (HET-01) and to t-based thresholds" | supports; narrows        | The per-pair df is exactly the two-group Welch df (GH p. 116). Reuse of t numerics applies to T2, not to GH (Studentized range) or T3 (SMM); those laws at fractional df are a separate numerical need                                                         |
| §17 SR-I row: blocked items HET-01..03; sources SRC-20, SRC-21                                                                                                                                     | supports                 | All assigned texts inspected                                                                                                                                                                                                                                   |

No catalogue statement is contradicted by the sources.

## 11. Entry impact

| Entry  | Fixed disposition | Source-established characterization                                                                                                                                                                                                                              | Investigator's proposed impact (for the steward)                                                                                                                                              |
| ------ | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| HET-01 | `R3-CAND`†        | Single-step all-pairs intervals; Welch df (no replacement); range/√2 constant; two-sided; simulation-only evidence; documented small exceedances of α (all three sources); authors' own n ≥ 6 caveat                                                             | Classification unchanged by this record. Guarantee wording must be narrowed before any Contract; the `R3-CAND` status itself is a steward question given the absence of any control guarantee |
| HET-02 | `RES-ONLY`†       | T2: Welch df, Šidák t constant; approximate-conservative by construction; conservative in every simulated cell (Dunnett, T2; Tamhane, T2′)                                                                                                                       | Unchanged; record the T2/T2′ variant split as a reopen trigger                                                                                                                                |
| HET-03 | `RES-ONLY`†       | T3: Welch df, SMM constant; approximate-conservative; conservative in every simulated cell; shorter than T2. C: weighted range constant at integer df; conservative in every finite-df cell; equals GH at df = ∞; longer than T3 for small df, shorter for large | Unchanged; record a two-way variant split (T3, C) as a reopen trigger                                                                                                                         |

## 12. Reproductions

Script: `reproduce-sr-i.py` (this directory). Environment: Python 3.11.15, numpy 2.4.6,
scipy 1.17.1, run in this session's container. All Studentized-range quantiles were
computed by an own fixed-node quadrature of the classical integral (route B) and
cross-checked by evaluating `scipy.stats.studentized_range.cdf` at the route-B quantile
(route A; every reported check returned 0.95000). The SMM law has no scipy counterpart;
its quadrature was self-checked against closed forms (k* = 1 gives the t point; ν = ∞
gives the normal closed form) and against the printed table values below. These are
diagnostics of the investigator's reading; they are not oracle evidence, and rerunning
one library is not claimed to be an independent accuracy guarantee.

### 12.1 Games–Howell Table V (p. 123)

All six v statistics and integer df reproduce exactly (v to three decimals, df 13, 7,
6, 10, 10, 4). With integer df and recomputed q(.05; 4, ν)/√2 = 2.9351, 3.3102, 3.4617,
3.0594, 3.0594, 4.0709 the six intervals reproduce the printed endpoints to within
0.0009, except pair 4–1, where the printed (2.5196, 4.4004) corresponds to the text's
4.69/√2 = 3.3164 rather than to q(.05; 4, 7) = 4.6813 (own; scipy CDF 0.95000). The
printed 4–3 interval implies q(.05; 4, 13) = 4.150 against the recomputed 4.1509. Using
the unrounded df 6.937 for pair 4–1 gives 3.3182, so rounding versus interpolation moves
this critical value by about 0.008.

### 12.2 Tamhane p. 475 inequality and the T2/T3/GH ordering

On the grid k ∈ {2, 3, 4, 6, 8} × ν ∈ {3, 5, 6, 8, 10, 12, 24, 48, 120, ∞}, the maximum
of q_{k,ν,.05}/√2 − t_{ν,γ} is 0.000000 (attained at k = 2, where the two coincide to
quadrature tolerance), and q/√2 ≤ SMM_{k*,ν} ≤ t_{ν,γ} holds in every cell. Example at
k = 4, ν = 6: 3.4617 ≤ 3.6644 ≤ 3.8447. The printed inequality is confirmed on this
grid; the sources give no proof and none is claimed here.

### 12.3 Tamhane Table 2 (p. 476)

| Quantity          | Printed | Recomputed |
| ----------------- | ------- | ---------- |
| q_{4,24,.05}      | 3.901   | 3.9013     |
| q_{8,48,.05}      | 4.481   | 4.4806     |
| \|m\|_{6,24,.05}  | 2.851   | 2.8507     |
| \|m\|_{6,36,.05}  | 2.775   | 2.7748     |
| \|m\|_{28,48,.05} | 3.286   | 3.2858     |
| \|m\|_{28,72,.05} | 3.228   | 3.2285     |

### 12.4 Dunnett Table 2 (p. 798), k = 4

For sample sizes (7,7,7,7), (7,9,11,13), (14,14,14,14), (56,56,56,56) and V ∈ {1, 2, 4,
10, ∞}, the pair-averaged C and T3 constants recomputed from (1.5)–(1.6) and (1.8) with
(1.4) match every printed entry to the printed two decimals (for example (7,7,7,7):
C 3.462 versus 3.46 at all V; T3 3.094, 3.152, 3.286, 3.463, 3.664 versus 3.09, 3.15,
3.29, 3.46, 3.66). This confirms the reading that C's df enters through the two integer
ν_i, ν_j and T3's through the Welch ν̂_ij.

### 12.5 Dunnett p. 800 df identity

With 1/ν′ = (V/(V+1))/ν_i + (1/(V+1))/ν_j, the identity 1/ν̂ = 1/ν′ − 2V/((V+1)²ν̄) holds
to 3 × 10⁻¹⁷ on a grid of (ν_i, ν_j, V); with ν′ as the arithmetic weighted average it
fails (discrepancy up to 0.099). The grid also confirms min(ν_i, ν_j) ≤ ν̂ ≤ ν_i + ν_j.

### 12.6 Independent Monte Carlo spot check of Dunnett Table 1 (c = 1, ×1)

A separate generator (numpy PCG64, seed 20260908), 40,000 replicates per case, with
critical values interpolated on reciprocal df from own quadrature grids:

| Case               | Procedure | Own estimate (SE) | Dunnett printed |
| ------------------ | --------- | ----------------- | --------------- |
| k = 4, (7,7,7,7)   | GH        | .0510 (.0011)     | .0503           |
|                    | C         | .0248 (.0008)     | .0246           |
|                    | T2        | .0371 (.0009)     | .0366           |
|                    | T3        | .0406 (.0010)     | .0392           |
| k = 4, (7,9,11,13) | GH        | .0531 (.0011)     | .0527           |
|                    | C         | .0303 (.0009)     | .0306           |
|                    | T2        | .0409 (.0010)     | .0407           |
|                    | T3        | .0433 (.0010)     | .0438           |
| k = 8, (7,…,7)     | GH        | .0624 (.0012)     | .0593           |
|                    | C         | .0226 (.0007)     | .0225           |
|                    | T2        | .0321 (.0009)     | .0323           |
|                    | T3        | .0435 (.0010)     | .0424           |

All twelve estimates agree with the printed values within about 1.3 combined standard
errors. In particular, the GH exceedance at k = 8 (own .0624; printed .0593; nominal
.05) and the conservativeness of C, T2, and T3 are reproduced by an independent
generator and independent quantile code. This is a spot check of three of sixty cells,
not a replication of the study.

## 13. Findings

### BLOCKER

None. No assigned source is missing or mismatched, no decision-bearing claim in C-I1 or
C-I2 lacks a pinpoint, and no catalogue characterization is contradicted.

### SHOULD-FIX (catalogue narrowings the steward must accept or reject before SR-I is treated as closed)

- **S-1 (HET-01 guarantee wording).** Replace "approximate simultaneous coverage / FWER
  (evidence type pending)" with a statement that the joint non-coverage is estimated by
  simulation only, is documented to exceed α by a small amount in identified
  configurations (Games–Howell pp. 118, 121; Tamhane p. 477; Dunnett pp. 798–799), and
  carries no analytic control claim of any strength. Exclude the GH′ df-replacement
  variant from the entry identity (Tamhane p. 474).
- **S-2 (HET-02 identity).** Name the variant: T2 (Welch df) as defined in Tamhane 1977
  and restated in 1979/1980b, with Dunnett's 1980b simulation as its evidence; T2′ (df
  replaced under the four balance conditions) with Tamhane's 1979 Table 3 as its
  evidence. Record the split as a reopen trigger, not a redefinition of the fixed entry.
- **S-3 (HET-03 split).** Record T3 and C as separate variant identities under HET-03:
  different critical laws (SMM at Welch df; weighted Studentized range at integer df),
  different df behaviour, opposite interval-length ordering across df.

### NICE-TO-HAVE

- **N-1.** Printed-value doubts to carry forward: Games–Howell p. 123 "4.69" for
  q(.05; 4, 7) (recomputed 4.681); Tamhane p. 479 reference "Games and Howell (1986)";
  Tamhane p. 476 "Stoline and Ury (1978)" versus p. 480 (1979, to appear); Dunnett
  p. 799 lists seven c values while Table 1 reports five.
- **N-2.** Dunnett p. 800: the df identity is exact on the reciprocal-df scale; the
  text's phrasing of ν′ is loose. Worth a one-line note wherever the identity is reused.
- **N-3.** Games–Howell's Table IV contains a zero sample variance; a future
  admissibility rule should say explicitly whether such an input is admissible or
  refused, rather than inheriting the paper's silent handling.
- **N-4.** If any proposal ever relies on GH attaining the nominal level, Keselman and
  Rogan (1978) (cited by Tamhane p. 477 as contrary evidence) becomes a required source;
  it is not required for SR-I as commissioned.

## 14. Candidate dispositions (not accepted here)

| Item   | Candidate status                                | Reason                                                                                                                                                                                                                                                                                                                                                                          |
| ------ | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| C-I1   | `SUPPORTED`                                     | Construction, evidence type, and the bounded nature of the control claim are all pinned (Section 10.1)                                                                                                                                                                                                                                                                          |
| C-I2   | `SUPPORTED` with variant split                  | T2, T3, C constructions, df, and evidence types pinned; T2/T2′ and T3/C identities must be kept separate                                                                                                                                                                                                                                                                        |
| HET-01 | source obstacle removed; S-1 pending            | Section 11                                                                                                                                                                                                                                                                                                                                                                      |
| HET-02 | source obstacle removed; S-2 pending            | Section 11                                                                                                                                                                                                                                                                                                                                                                      |
| HET-03 | source obstacle removed; S-3 pending            | Section 11                                                                                                                                                                                                                                                                                                                                                                      |
| SR-I   | **candidate `CLOSED`** (source completion only) | Under the commission's definition every decision-bearing claim is directly supported with exact artifact identity and pinpoints. If the steward treats S-1 to S-3 as unresolved catalogue conflicts rather than as recorded narrowings, the candidate is `PARTIAL` with those three named gaps; `INPUT_INCOMPLETE` is not supportable because all assigned texts were inspected |

`CLOSED` here would mean only that the source-acquisition obstacle for SR-I is removed.
It would not select Games–Howell, T2, T3, or C for Release 3, would not change the
fixed `R3-CAND`/`RES-ONLY` classifications, and would not alter the overall
`INPUT_INCOMPLETE`, `SOURCE_SET_READY = false`, `NARROW`, or any earlier `PENDING`
item. Formal acceptance requires the steward's decision and, per the commission, an
exact-head independent review of whatever author-side result incorporates this work.

## 15. Steward decisions needed

1. Whether to accept S-1 to S-3 as catalogue narrowings recorded by addendum (as was
   done for SR-C and SR-F), or to treat them as conflicts requiring re-adjudication.
2. Whether HET-01 can remain `R3-CAND` when no source provides a control guarantee of
   any strength, or whether a candidate must first receive a Protocol-side decision on
   what guarantee wording (if any) a simulation-only bound may carry.
3. How this independent record is to be combined with the still-outstanding author-side
   SR-I result: as its primary input (then only an exact-head review of the combined
   result is needed) or as a parallel independent pass to be compared against a separate
   author-side reading.
4. Whether the fractional-df convention and the zero-variance case are to be decided in
   the numerical lane or in the semantic lane (Section 8.5).

## 16. Validation record

Run at the investigation head, after adding the two files (dependencies already present
in the environment were reused; no fresh frozen install was performed):

| Check                                       | Result | Observed                                                                                                                                                                                                                                          |
| ------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm format:check`                         | pass   | "All matched files use Prettier code style!"                                                                                                                                                                                                      |
| `pnpm lint:markdown`                        | pass   | "Linting: 356 files … Summary: 0 issues in 0 files"                                                                                                                                                                                               |
| `node --import tsx tooling/src/validate.ts` | pass   | "validate: OK - registries, traceability, normative lint, authority, gates, conformance manifest, links, private-dependency and language audits, phase-1 schemas, cross-checks, code-path audits, and the snapshot manifest mechanism are clean." |
| `git diff --check` (staged)                 | pass   | no whitespace errors                                                                                                                                                                                                                              |
| `python3 reproduce-sr-i.py`                 | pass   | 27 s wall time; output transcribed in Section 12                                                                                                                                                                                                  |

Reused from existing records, not re-run: the earlier continuous-integration runs on the
fixed commit; the custody hashing recorded in D.2 and N.3 (re-derived here anyway,
Section 3.1). Not run: `pnpm check` (full suite), `pnpm install --frozen-lockfile`,
`pnpm check:generated`, `pnpm test`. No authoritative artifact, registry, schema, or
generated file is touched, so these are outside the scope of the required checks for a
review-input addition.

## 17. Public-artifact self-check

- Files added: this record and `reproduce-sr-i.py`. No PDF, page image, or full-text
  extraction is committed. No copyrighted text beyond short quotations for pinpoint
  identification is reproduced.
- No fixed input, commission, semantic result, earlier review, registry, schema,
  specification, conformance artifact, reference code, or generated file is modified.
- Branch and file names are neutral and role-based; no session identifier appears in
  the branch name or the public artifact.
- Model testimony is disclosed in Section 2 as service-reported information; no
  exact-build log is claimed.
- No identifier from another authority system is introduced; no Requirement ID, Contract
  identifier, or Public Check is minted or implied.
- Nothing here opens public discussion, adopts a method, accepts a hold, merges a
  branch, or releases.

## 18. Follow-up investigation prompt

Additional primary-source acquisition is **not** required to close the source obstacle
for SR-I. The next required work is the author-side SR-I result and its exact-head
independent review. The prompt below can be handed to a separate session as is; the
optional lane at its end covers the only two uninspected texts that could matter, and
only under the stated conditions.

```text
Role: author-side investigator for hold SR-I of the Release 3 semantic source-acquisition
result (licklider-ai/nomue-protocol). Do not merge, accept a hold, adopt a method, open
public discussion, or release.

Fixed inputs (verify by Git object before any source work):
- investigation commit 7cf5a5d0a14446fce0a67d0850793bbd4e117d67 (tree f806edd99e94adbc9f12193ea52ec3a08611da20; sole parent c6ba9c923d142e0dacbb62ea20009cbd0ecb34c5);
- result governance/drafts/release-3-preparation/semantic-source-acquisition-result.md, blob 608cd7b04d2d34accb209060ee9163b39210f4f9, 389970 bytes, SHA-256 48adf4a0f94fd2c0d2fc509aef1a579feb8651d339135c021975093578621f32;
- commission blob 3c7ddcc696f0c284213f7efe0da68e747bc238d7;
- fixed semantic input commit 7bd9c5ab854777c3e99e624d9d2ed62731228852, blob 8f21526040924b891f64724c2d0fde9ea94eff92;
- independent SR-I investigation record: review-inputs/r3-sri-primary-investigation/REVIEW-RESULT.md on branch review/r3-sri-primary-investigation-20260908 (pin its commit and blob at the time of use).

Required attachments (already received; match SHA-256 before reading):
- 34_Games_1976.pdf, 994128 bytes, 13 pages, eee42d00cdd66f9f24e334c2db503e17233fc73b6a87ed5f85c6868f17a2c021;
- 27_Tamhane_1979.pdf, 1759491 bytes, 11 pages, f6183845a373361b8840040ecd9f0afce59cb8cb5170abf44c551376cd414bf0;
- 28_Dunnett_1980.pdf, 726755 bytes, 6 pages, ac862081c93be6ce38ba0dc17b811cb3dd96227cf6ba50f66a7c35715a2870a0 (pp. 796-800; not the pp. 789-795 paper).

Task:
1. Read AGENTS.md, CHARTER.md, AUTHORITY.md, governance/RFC.md, the commission, the
   semantic input Sections 2.2, 5, 8.5, 9, 15, 17, and result Parts D.2, D.3, N.2, Q.4.
2. Read the three PDFs in full before reading the independent record's Sections 4-14;
   disclose the order actually followed.
3. Write the author-side SR-I part (Part R or the next free letter) appended to the
   result file: claim-to-source table for C-I1 and C-I2 with printed-page pinpoints;
   entry-by-entry impact for HET-01/02/03; the T2/T2' and T3/C variant splits as reopen
   triggers; the GH' exclusion; the fractional-df, minimum-df, and zero-variance
   questions as Protocol-side decisions; a proposed SR-I disposition using the
   commission's four-way scale; and the updated ledger without changing any other hold,
   the overall INPUT_INCOMPLETE, SOURCE_SET_READY, NARROW, or any PENDING item.
4. Where your reading differs from the independent record, state the difference with
   both pinpoints; do not resolve by majority or convenience.
5. Reuse the independent record's reproductions only by citation; if you recompute,
   use a different route and say so.

Completion condition: every C-I1/C-I2 claim pinned; S-1 to S-3 of the independent
record each answered (accepted as narrowing, or disputed with pinpoints); validation
run: pnpm format:check, pnpm lint:markdown, node --import tsx tooling/src/validate.ts,
git diff --check.
Stop condition: any PDF hash mismatch (record SOURCE_ACCESS_INCOMPLETE for the affected
claims and continue with the rest); any request to change a fixed input.
Output: one commit on a new neutral branch from the fixed commit (or from the current
head of the research aggregation branch if the steward so instructs, with the difference
reported), and a draft PR against research/r3-srf-acceptance-20260908; then commission
a separate exact-head independent review of that commit.

Optional lane (only if the steward requires it): Tamhane (1977), Communications in
Statistics A6(1):15-32, to pin the original T2 definition and the T1-versus-T2
simulation (needed only if HET-02's identity is to cite 1977 directly); Keselman and
Rogan (1978), JASA 73:47-52, to record the contrary Games-Howell simulation (needed only
if a proposal relies on Games-Howell attaining the nominal level). Neither is required
for the SR-I source obstacle. Unavailable suppliers 38/44/45/46 have no dependency here.
```
