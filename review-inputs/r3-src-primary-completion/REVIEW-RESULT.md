# Release 3 Source-Acquisition Result Parts D–F — SR-C Primary-Source Completion Review at the Fixed Head

**Status: informative independent review result; non-normative; not adopted.**
This record completes, with the six original SR-C papers in hand, the primary-source
part of the review that PR #194 (`review-inputs/r3-src-six-source-synthesis/REVIEW-RESULT.md`)
had to leave as `SOURCE_ACCESS_INCOMPLETE`. It reviews the same exact commit of the
Release 3 semantic source-acquisition result. It is a new report, not an overwrite of
PR #194, whose record is preserved unchanged. It selects no Contract, procedure,
identifier, schema, Public Check, tolerance, support domain, RFC decision, R4 method,
or release outcome; it updates no hold, issue, gate, or catalogue class; it merges
nothing. Attribution is role-based only; material process provenance is disclosed in
Sections 1 and 11.

**Content verdict: `GO`** (Section 10), bounded to the SR-C six-source scope at the
exact head below. Every decision-bearing statement of C.3 rows 11/12/13/14/18, D.4.1,
E.2, E.3 and F.1–F.5 that this record checked was found on the stated printed page of
the supplied original, or is correctly labelled investigator inference. The E.3 sets
match Shaffer's Table 2 row by row and, independently, all 164 cells of
Holland–Copenhaver's Table 1. The F.2 adjusted-output derivations agree with the
printed premises (Hochberg Lemma (8) non-strict; Hommel's shortcut strict in the
search, non-strict in the final rejection). The Rom Table 1 cell at α = .01, row 10,
prints 1.01 × 10⁻³ as F.3 reports, while the recurrence constant is
0.001004472598983613…; an exact polynomial integration performed here confirms that
the F.3 recurrence constants satisfy A_n(α) = 1 − α exactly for n = 1..10, so the
printed cell is a genuine printed-source conflict, not an extraction, rounding or
transcription artefact. It is retained, not corrected. Findings: `BLOCKER` 0,
`SHOULD-FIX` 0, `NICE-TO-HAVE` 4 new (Section 8); PR #194's N-D1–N-D4 and N-F1 are
tracked individually in Section 7.

**`SR-C` disposition:** `PARTIAL` is accurate and remains the proposed disposition.
Source-supportable `CLOSED` is reachable after the steward records the bounded Rom
adjudication assessed in Section 10; this record supports that boundary but does not
make the decision. **Independence status: context `ESTABLISHED`, model-level
`PENDING`** (Section 11). **Formal hold acceptance: `NOT PERFORMED`** and not
authorized by this record.

## 1. Review identity, scope, role, and independence

| Field                 | Value                                                                                                                                                                                                                                                                                  |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository            | `licklider-ai/nomue-protocol` (public)                                                                                                                                                                                                                                                 |
| Reviewed pull request | #193 (draft; head branch `research/r3-additional-source-intake-20260907`; base `research/r3-source-intake-srk-20260907`)                                                                                                                                                               |
| Reviewed exact head   | `eb6c0b2657b0b8b1f5b4ca64e48ad0436319ecc4` (fixed; the PR head at the start and at the end of this pass)                                                                                                                                                                               |
| Result path           | `governance/drafts/release-3-preparation/semantic-source-acquisition-result.md`                                                                                                                                                                                                        |
| Review date           | 2026-09-07 (UTC)                                                                                                                                                                                                                                                                       |
| Reviewer role         | independent primary-source completion reviewer for the SR-C six-source scope, following result Sections E.5/F.5 and the packet README supplied by the steward for this pass                                                                                                            |
| Non-involvement       | this review session did not author, revise, or repair the acquisition commission, Parts A–F of the result, PR #186, PR #193, the PR #187, #188 or #192 reviews, the PR #189 record, or any Release 4 record; it authored PR #194's record, which this record tests rather than assumes |
| Review posture        | falsification-oriented: every in-scope pinpoint was located on the printed page of the supplied original; page images were inspected wherever extracted text was unreliable (formulas, inequality signs, tables); reviewer recollection carries no evidential weight                   |
| Private material      | the six original PDFs were supplied privately and were read here; none is committed, quoted at length, or extracted into the repository. No private repository, path, package, or product implementation was read                                                                      |

**Scope (README "Required completion scope" items 1–7).** C-C1 through C-C5 as
stated in C.3 (rows 11, 12, 13, 14, 18), E.2 and F.2, against all six originals; the
F.2 output derivations against their printed premises; Shaffer pp.826–831 including
Tables 1 and 2 and the Section 4 variants; Holland–Copenhaver pp.418–422; Rom p.664
equation (2) and all twenty MH cells; the proposed bounded Rom adjudication; and
PR #194's open items. Out of scope: the ten other Part D papers (N-D4 stays open and no
source is requested here), Parts A–C content, the other thirteen hold dispositions
beyond confirming that they are carried unchanged, Release 4, and any acceptance
decision.

**Reuse from PR #194 (attributed, not re-run unless stated).** The fixed identity
verification (Section 2), the Parts A–E byte-prefix checks, the D.2 hash bookkeeping,
the D.3 routing check, the commission-category assessment of `PARTIAL`, the E.3/F.4/C.7
transcript reproductions, the F.2 algebra, and the repository validation at
`eb6c0b26…` without any review file were performed in this same session for PR #194 and
are carried forward. Their outcome (`GO` on every separable check) was confirmed by
re-reading the recorded results; the E.3 and F.4 diagnostics were also re-executed
during this pass because their outputs are compared with the originals below.

**Model information (recorded on an ordinary accountable basis, not guessed).** This
pass ran in the same managed remote execution session as PR #194 (started
2026-09-07T08:51:15Z; the packet was supplied at about 09:16Z). The session-management
service was re-queried during this pass and reported `configured_model: claude-fable-5-1`
and `last_served_model: claude-fable-5-1`. No serving-build log was requested or is
required.

**Environment.** Linux container (managed cloud environment); Node v22.22.2; pnpm
11.7.0; dependencies installed with `pnpm install --frozen-lockfile` (exit 0, PR #194
Section 9); Python 3.11.15 and 3.12.3 with the standard library (`fractions`, exact
integers) for every recomputation; PyMuPDF 1.28.2 installed in this pass for text
extraction and page rendering at 150 dpi (300 dpi crops where noted). The network egress
denials recorded in PR #194 Section 3 were not retried; the supplied packet made them
unnecessary.

## 2. Fixed identity verification (expected versus observed)

Reused from PR #194 Section 2 and re-checked against the README values in this pass:

| Object                        | Expected (README / PR #193)                                                                                                              | Observed                                                                                                             | Status |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------ |
| Reviewed head                 | `eb6c0b2657b0b8b1f5b4ca64e48ad0436319ecc4`                                                                                               | live PR #193 head `eb6c0b26…` at start and end of this pass                                                          | match  |
| Sole parent / tree            | `fb1a2f647d3157083a1aaceee207b75624385480` / `0b9f56c3c0f6f094a45bdc45bb32af62e7eb152b`                                                  | exactly one parent `fb1a2f64…`; tree `0b9f56c3…`                                                                     | match  |
| Result blob / bytes / SHA-256 | `6ce3fbaa88ece237c27091a355e6f920ca175179` / 259026 / `938dea98…9025`                                                                    | `6ce3fbaa…`; 259026 bytes; `938dea980fae84411b53a4cbe08745b14211b96988d14b5e8add6576a32f9025`                        | match  |
| Parts A–E prefix              | 245812 bytes preserved                                                                                                                   | `cmp -n 245812` byte-exact (PR #194)                                                                                 | match  |
| Commission                    | blob `3c7ddcc696f0c284213f7efe0da68e747bc238d7` at `f39100161cb45de15767bdb19ed54aba9489b41a`                                            | `git ls-tree` confirms (PR #194)                                                                                     | match  |
| PR #194 record preserved      | commit `f3fa9767de2043de7ec54054b078b70b0765eb94`, parent `eb6c0b26…`, tree `371143d1…`, blob `b552000598b6b668ac544d6ae42cdb6f26cf69de` | `git rev-parse f3fa9767…:review-inputs/r3-src-six-source-synthesis/REVIEW-RESULT.md` = `b5520005…`; branch untouched | match  |
| Review branch / path unused   | `review/r3-src-primary-completion-20260907`; `review-inputs/r3-src-primary-completion/REVIEW-RESULT.md`                                  | branch absent from the remote; path absent from the head tree                                                        | match  |

## 3. Source access: the supplied packet

| Item            | Observed                                                                                                                                                                                                                                                                                                                                                  |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Packet          | one ZIP, 3678913 bytes, SHA-256 `b196efcff9060f7ec3f750e77ba3d11a471b55a0f4992d587a12dfc99096cdf2`; `unzip -t`: no errors; contents `README.md`, `manifest.json` and six PDFs                                                                                                                                                                             |
| Manifest check  | all six files match `manifest.json` byte length and SHA-256                                                                                                                                                                                                                                                                                               |
| C.2 / D.2 check | 11 `6e8a40c5…` 642630 B, 5 pages; 12 `588aa12d…` 974801 B, 4 pages; 13 `c006eb7c…` 655387 B, 5 pages; 14 `9c72d73a…` 436687 B, 4 pages; 18 `d632570b…` 964480 B, 8 pages; 22 `6ea4bb9f…` 870893 B, 7 pages — every hash, length and page count equals the C.2 (11–18) or D.2 (22) record; F.1's "duplicate transfer, count stays 35" is therefore correct |
| Page mapping    | C.3's printed-to-PDF offsets (11 p−749; 12 p−798; 13 p−381; 14 p−661; 18 p−415) and D.2's "PDF page 2 = p.826" for 22 all verified: PDF page 1 is a JSTOR or Taylor & Francis cover in every file                                                                                                                                                         |
| Reading         | full extracted text of all six articles read (about 101 KB); page images inspected for Simes p.752; Hochberg pp.800–801; Hommel pp.384–385; Rom p.664; Holland–Copenhaver pp.418, 420; Shaffer pp.827–830, with a 300 dpi crop of Shaffer Section 4.1                                                                                                     |

All six originals were accessible; no claim below is `SOURCE_ACCESS_INCOMPLETE`.

## 4. C-C1 through C-C5 against the originals

Each row states what the printed page says, whether the result's characterization
(C.3, E.2, F.2) is supported, and any boundary.

### 4.1 C-C1 / PVL-06 — Simes (11), pp.751–754

- **p.751, Section 2:** the modified procedure rejects H₀ = {H(1), …, H(n)} "if
  P(j) ≤ jα/n for any j = 1, …, n". The result's "some p_(j) ≤ jα/m" (C.3 row 11) is
  the printed rule.
- **p.752, Theorem and proof:** for order statistics of n independent uniform (0, 1)
  variables, A_n(α) = pr{P(j) > jα/n; j = 1, …, n} = 1 − α, proved by induction. The
  result's "independent uniform null p-values supply exact level" (E.2) and
  "p.752 proves exact global level for independent uniform null p-values" (F.2) are
  the printed theorem.
- **p.752, after the proof:** "The modified test procedure is conservative provided
  pr{∪ P(j) ≤ jα/n} ≤ α. This inequality is not true in general as counterexamples,
  albeit pathological, can be found." F.2's "explicitly states that the inequality is
  not general" is verbatim in substance; E.2's "No arbitrary-dependence claim" is
  correct.
- **pp.752–753, Section 3:** simulations (multivariate normal, common ρ; multivariate
  gamma) with the level not exceeding 0.05 in the reported conditions. F.2's "not a
  theorem for arbitrary dependence" is the correct reading.
- **p.754:** individual hypotheses H(1), …, H(j) with j = max{j: P(j) ≤ jα/n} may be
  rejected only "in an exploratory sense … preferably confirmed in subsequent
  studies"; Holm's sequentially rejective test is named as the formal basis. E.2's
  "A global rejection does not identify individual false nulls or establish individual
  strong FWER" and F.2's "Page 754 treats additional individual rejections … as
  exploratory" are supported.
- **Verdict:** C-C1 supported at the stated pinpoints; `RES-ONLY` boundary correct.

### 4.2 C-C2 / PVL-07 — Hochberg (12), pp.800–802

- **p.800:** equations (1)–(3) define weak and strong control; (4) is Holm's rule
  P(j) ≤ α/(m − j + 1) for all j ≤ i; (5) is Simes's rule; "Simes proved that this
  procedure has level α under H₀ when the p-values are independent."
- **p.801:** the extended Simes procedure (6) over all subset intersections; "When the
  original Simes procedure has an α level familywise error rate under H₀, the extended
  Simes procedure will control the familywise error rate in the strong sense … That
  follows from the closure principle." The printed derivation assumes "a collection
  H … satisfying the condition of free-association (Holm, 1979)". The **Lemma** reads,
  verified on the page image: "For any i = m, m − 1, …, 1, if P(i) ≤ α/(m − i + 1) (8)
  then Simes's procedure rejects all H(i′) (i′ ≤ i)." The comparison is **non-strict**
  (≤). The paragraph after the proof gives the descending scan starting at P(m) ≤ α.
- **Result statements checked:** C.3 row 12 ("rejects through largest i with
  p_(i) ≤ α/(m−i+1); inherits Simes validity requirements for relevant intersections,
  not Holm's arbitrary-dependence scope"), E.2 ("strong FWER subject to the relevant
  Simes validity … validity is needed for the relevant true-null intersections") and
  F.2 ("p.801 equation (8) uses the non-strict comparison and the following paragraph
  gives the descending scan") are all supported. No adjusted p-value is printed
  anywhere in the paper, so F.2's labelling of the suffix-minimum formula as
  investigator algebra is correct.
- **Boundary found:** the printed free-association assumption (p.801) is not carried
  in the E.2 row; see N-P1. It is not decision-bearing for the recorded
  characterization because the closure argument controls the FWER for whichever
  intersections are possible, and Hommel p.384 Section 3 shows that logical
  restriction can only sharpen the procedure.
- **Verdict:** C-C2 supported; `R3-CAND`† retention with the narrowed reading is
  correct.

### 4.3 C-C3 / PVL-08 — Hommel (13), pp.383–386

- **pp.383–384:** the introduction relates Bonferroni, Rüger, Hommel (1983) and Simes
  overall tests and states that Simes's procedure "does not always lead to a level α
  test of H₀", is conjectured conservative for "a large family of multivariate
  distributions" by simulation, and is exact for independent statistics.
- **p.384, Section 2, Theorem (Hommel, 1986):** the closed-testing theorem. The
  **shortcut**, verified on the page image: "compute j = max{i ∈ {1, …, n}:
  P(n−i+k) > kα/i for k = 1, …, i}. If the maximum does not exist, reject all H_i
  (i = 1, …, n), otherwise reject all H_i with P_i ≤ α/j." The search comparison is
  **strict** (>), the final rejection **non-strict** (≤), exactly as F.2 states. The
  paper continues: "this procedure controls the multiple level α provided each of
  Simes's tests for H_I is a level α test. In particular, the multiple level α is kept
  if the n tests are independent."
- **p.384, Section 3:** Shaffer's improvement is restated with t_i = max{j ∈ S:
  j ≤ n − i + 1}; for 10 pairwise comparisons of 5 distributions
  "S = {1, 2, 3, 4, 6, 10} (Shaffer, 1986, Table 2)" and t₁ = 10, t₂ = … = t₅ = 6,
  t₆ = t₇ = 4, t₈ = 3, t₉ = 2, t₁₀ = 1; the logically restricted Simes variant takes
  j = max{i ∈ S: …}. This set equals E.3's S(5) without the element 0, which the
  search cannot use; F.4's `allowed={1,2,3,4,6,10}` is therefore the printed set.
- **p.385, Section 4:** the ten p-values are printed as in F.4; α = 0.05; "the general
  multiple Simes procedure … j = 5 … H₁, H₂, H₃ are rejected"; "because of 5 ∉ S one
  obtains j = 4 … H₁, …, H₅ are rejected by the improved procedure". F.4's reproduced
  values (j = 5 / 3; j = 4 / 5) equal the printed ones. Table 1 gives simulated error
  rates for a pairwise-normal setting; the exact entries 0.05 and 0.049375 for |I| = 2
  are 1 − (1 − 0.025)² = 0.049375 for the Bonferroni test (recomputed).
- **Result statements checked:** C.3 row 13, E.2 ("Closed-Simes construction supports
  elementary-hypothesis strong FWER when the local intersection tests are valid";
  "Invalid local tests are not repaired by closure") and F.2 (shortcut, boundaries,
  example, "does not print this adjusted-output expression", not extended to the
  Section 3 variant) are all supported. The paper contains no adjusted p-value.
- **Verdict:** C-C3 supported; `RES-ONLY` retention correct.

### 4.4 C-C4 / PVL-09 — Shaffer (22), pp.826–831

- **p.826, Section 1:** ordering Y(1) ≤ … ≤ Y(n), Holm's SRB with denominators
  n − j + 1, stop-at-first-acceptance ("Acceptance of H(k) implies acceptance of H(l)
  for all l > k"); hypotheses assumed minimal.
- **p.827, Section 2 (page image):** "At stage j, instead of rejecting H(j) if
  Y(j) ≤ α/(n − j + 1), reject H(j) if Y(j) ≤ α/t_j, where t_j equals the maximum
  number of possibly true hypotheses, given that at least j − 1 hypotheses are false";
  t_j = max_{a_i ≤ n−j+1} a_i over the set A of possible numbers of true hypotheses; the
  proof follows Holm's ("if m hypotheses are true, an error must occur at or before
  stage n − m + 1 … Pr(no errors) ≥ … ≥ 1 − Σ_{i∈I} α/m = 1 − α"). D.4.1's and E.3's
  descriptions of the stage denominator and of the proof are the printed text. Section
  1's "free combinations" remark (p.827) says Holm's procedure "remains valid" without
  free combinations and the MSRB improves it.
- **p.827, Section 3.1 and Table 1:** the k(k − 1)/2 pairwise hypotheses (3.1);
  **Table 1 is on p.827** (this answers PR #194's N-D2) and gives A = {0, 1, 2, 3, 6}
  for k = 4 via the five partitions; recursion (3.2)
  S(k) = ∪_{j=1..k} {C(j,2) + x: x ∈ S(k − j)} is printed on p.827 with
  S(0) = S(1) = {0} stated at the top of p.828, and proved by induction on p.828.
- **p.828, Table 2 (page image):** rows k = 3..10 read 0,1,3; 0–3,6; 0–4,6,10;
  0–4,6,7,10,15; 0–7,9,10,11,15,21; 0–13,15,16,21,28; 0–13,15,16,18,21,22,28,36;
  0–18,20,21,22,24,28,29,36,45. Expanding the ranges gives exactly the eight sets in
  E.3's "Observed output". The NOTE under Table 2 restates t_j = max_{a_i ≤ n−j+1} a_i.
- **p.829, Section 4.1 (300 dpi crop):** after initial rejection at level α of a more
  comprehensive hypothesis implying "at least some number r of the n hypotheses (but
  not which ones) are false, r = 1, 2, …, n − 1", the critical values for
  H(1), …, H(r) may be replaced; the printed replacement is written α/t_(n−r). E.3's
  description ("initial level-α rejection … that implies at least r component
  hypotheses are false. It is not an arbitrary screening step") is supported; see
  N-P3 on the printed index. **Section 4.2:** t_j* is "the maximum number of hypotheses
  that could be true, given that the specific hypotheses H(1), …, H(j−1) are false",
  with its own proof; E.3's "uses the identities of previously rejected hypotheses" is
  the printed text.
- **pp.829–830, Section 5:** Illustration 1 (three proportions) and Illustration 2
  (2 × 3 balanced factorial, fixed-effects ANOVA, pairwise contrasts within each level
  after a significant interaction, using the 4.1 and 4.2 modifications); "For α = .05,
  the respective values are 3.68 and 3.53" on p.830. E.3's statements, including the
  non-reproduction of these two range critical values, are accurate.
- **p.830, Section 6:** "the improvements … are based on logical analysis of the
  relationships among the hypotheses and are independent of the particular test
  statistics used, except for knowledge of their respective marginal distributions";
  distributional information is a separate route. E.2's "no additional
  joint-independence requirement for the basic Bonferroni argument" and E.3's
  "Section 6 … distinguishes logical information from further distributional
  information" are the printed text. The Appendix (pp.830–831) proves (3.7); E.1's
  "including the appendix and references" is accurate (this answers N-D3's factual
  part).
- **Verdict:** C-C4 supported; the three variants (count-based Section 2,
  initial-composite-test 4.1, identity-sensitive 4.2) are distinct in the source as E.3
  says; `RES-ONLY` retention and the R4 boundary are correct.

### 4.5 C-C5 / PVL-10 — Rom (14), pp.663–665, and Holland–Copenhaver (18), pp.417–423

**Rom.**

- **p.663:** Simes and Hochberg both reject H₀ when p(i) ≤ c_i for some i, with
  c_i = iα/n (Simes) and c_i = α/(n + 1 − i) (Hochberg); Hochberg's procedure is
  consonant; Hommel (1989) showed his procedure more powerful; the paper attributes
  that to Hochberg's conservatism and modifies the critical points.
- **p.664 (page image):** under the global null the p(i) are order statistics of n
  independent uniforms; c_{1₁} = α; c_{i_j} = c_{(i+1)_{j+1}}; the integrated identity;
  the recurrence (2) Σ_{i=1}^{n−1} [c_{n_n}^i − C(n, i) c_{(n−i)_n}^{n−i}] = 0;
  "Iteratively substituting n = 2, 3, … in (2), we obtain the modified critical points
  in Table 1"; "The closure principle of Marcus, Peritz & Gabriel (1976), ensures that
  the modified procedure strongly controls the family-wise error rate". The sequential
  individual-inference description follows Hochberg's. F.3's rearrangement
  (b₁ = α; b_n = [Σ_{i=1}^{n−1} α^i − Σ_{i=1}^{n−2} C(n, i) b_{i+1}^{n−i}]/n, with
  c_{n_n} = α and b_n = c_{1_n}) is the printed (2) with the i = n − 1 term moved to
  the left, since c_{(n−i)_n} = b_{i+1}.
- **Table 1, all twenty MH cells (page image):** α = .05: 5.00×10⁻², 2.50×10⁻²,
  1.69×10⁻², 1.27×10⁻², 1.02×10⁻², 8.51×10⁻³, 7.30×10⁻³, 6.39×10⁻³, 5.68×10⁻³,
  5.11×10⁻³; α = .01: 1.00×10⁻², 5.00×10⁻³, 3.34×10⁻³, 2.51×10⁻³, 2.01×10⁻³,
  1.67×10⁻³, 1.43×10⁻³, 1.26×10⁻³, 1.12×10⁻³, **1.01×10⁻³**. This is exactly F.4's
  `printed` transcription. Nineteen cells equal the recurrence values at three
  significant figures; the α = .01, row 10 cell does not (Section 6).
- **Result statements checked:** C.3 row 14, E.2 ("Sharpened step-up procedure with
  recursively calibrated constants"; "Independence basis"; the conflict) and F.3 are
  supported. The paper defines the constants by (2) and presents Table 1 as obtained
  from (2); this is the textual basis for the adjudication boundary in Section 10.

**Holland–Copenhaver.**

- **p.418 (page image):** hypotheses minimal; I the true set with t members; "The
  marginal distribution of P_i is uniform on (0, 1)"; Shaffer's rule (2.1)
  P(i∗) > α/t_{i∗} with i∗ the smallest such index, rejecting H(1), …, H(i∗−1); t_i
  defined there as the maximum number of possibly true hypotheses given that the
  specific H(1), …, H(i−1) are false, with the remark that in the all-pairs example the
  t_i do not depend on which hypotheses are false; Table 1 announced for K = 3..10.
- **p.419:** Table 1 of t_i values; "suppose … one does not wish to test some proper
  subset … Then the {t_i} cannot be read from Table 1. Nor are they determined merely by
  K and k_L; the configuration of the deleted tests and the ordering of the H_i matter
  as well." F.2's "Page 419 warns that deleting comparisons changes the needed bounds"
  is the printed text.
- **p.420 (page image):** **Definition 3.1** (Dykstra, Hewett and Thompson, 1973):
  X₁, …, X_k are "positively orthant dependent" if
  Pr(X₁ ≤ x₁, …, X_k ≤ x_k) ≥ Π Pr(X_i ≤ x_i) for all x — a lower-orthant product
  inequality. **Theorem 3.1:** with each H_i rejected for a sufficiently large
  statistic and the statistics positively orthant dependent, i∗ is the smallest index
  with P(i∗) > C(t_{i∗}) (3.1), C(x) = 1 − (1 − α)^{1/x}; reject H(1), …, H(i∗−1);
  if no i∗ satisfies (3.1) reject all; the generalized Type I error is at most α. The
  proof uses t_{i∗} ≥ t and the product inequality to reach (3.2) = 1 − α. The
  count-only rule P(i∗) > C(k − i∗ + 1) is noted as a uniform improvement on Holm.
- **pp.421–422:** examples (i)–(v) of positively orthant dependent statistics with
  citations (Karlin and Rinott; Dykstra; Šidák 1967; Dykstra and Hewett); Table 2
  applies the procedure to the Rhizobium data (K = 6, k = 15) with t_i =
  15, 10, 10, 10, 10, 10, 7, 7, 7, 6, 4, 4, 3, 2, 1 and the two threshold columns.
- **Result statements checked:** C.3 row 18 ("Step-down critical value
  1 − (1 − α)^{1/t_i}, stopping at first failure; t_i bounds possible true null count
  under preceding rejections. POD lower-orthant condition is not merely positive
  pairwise correlation"), E.2 and F.2 are supported: the threshold, the strict
  stopping comparison, the uniform-marginal assumption, the orthant condition, the
  family-specificity warning and the separate-variant identity are all on the stated
  pages. The statement that positive orthant dependence is "not merely positive
  pairwise correlation" is investigator inference from the k-variate definition and is
  correctly placed in the assumptions column; the paper does not itself contrast the
  two. See N-P2 for the source's own term.
- **Verdict:** C-C5 supported for both variants; they remain distinct procedures under
  the shared ID as C.3 requires.

## 5. Output derivations, diagnostics and the Rom cell (F.2–F.4)

- **Hochberg adjusted output.** Premise verified: Lemma (8) is non-strict and the
  scan is descending. The suffix-minimum formula is the exact inversion of that rule
  (PR #194 Section 5.6); with the premise now confirmed on the page, the derivation is
  supported end to end. The tie and cap remarks stand (cap never active, N-F1).
- **Hommel adjusted output.** Premises verified: the strict search / non-strict
  rejection shortcut and the closed-testing theorem are printed at p.384; the
  closure inversion (max over supersets of the Simes local adjusted level) is the
  correct definition and, per F.4 (re-executed here: 251 multisets, 1395 levels, both
  equivalences pass), agrees with the printed shortcut on the tested grid. The printed
  example values (j = 5 / 3 rejections; restricted j = 4 / 5 rejections) are
  reproduced.
- **F.4 transcription of Rom Table 1.** All twenty MH cells in F.4's `printed`
  dictionary equal the page image (Section 4.5); the diagnostic's single reported
  mismatch is the only cell that differs from the recurrence.
- **Rom cell (README item 5).** Reviewer's independent check, beyond re-running the
  recurrence: the probability A_n(α) = pr{p(i) > c_i for all i} for n independent
  uniforms was computed by exact nested polynomial integration in rational arithmetic
  (no recurrence used) with c_i = b_{n−i+1} taken from the F.3 recurrence; for
  α = .05 and α = .01 and every n = 1..10 the result is exactly 1 − α. The F.3
  recurrence therefore reproduces the paper's defining condition (1) exactly, and
  b₁₀(.01) = 0.001004472598983613… is the true constant. It rounds to 1.00 × 10⁻³
  under any standard rounding rule (a printed 1.01 × 10⁻³ would need a value of at
  least 0.001005). Rounding every intermediate constant to three significant figures
  before the next step also yields 1.00 × 10⁻³, so propagated rounding does not
  explain the printed cell either. The printed 1.01 × 10⁻³ is thus a genuine
  printed-source conflict confined to one derived table entry; the paper's own text
  presents the table as derived from (2). No erratum was sought here (F.3 records the
  author's limited search); the cell is retained as printed and no value is approved
  for Protocol use.

## 6. Reproductions and the reviewer's own recomputation

| Item                                          | Method                                                                                          | Result                                                                                                                               |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Shaffer Table 2 (p.828) versus E.3 sets       | ranges expanded by hand from the page image; compared with the E.3 "Observed output"            | all eight rows (k = 3..10) identical                                                                                                 |
| Shaffer Table 1 (p.827)                       | read from the page image                                                                        | A = {0, 1, 2, 3, 6} for k = 4; partitions and counts as D.4.1 states                                                                 |
| Holland–Copenhaver Table 1 (p.419)            | parsed from extracted text (164 cells, K = 3..10); compared with t_i = max{x ∈ S(K): x ≤ n−i+1} | all 164 cells match; an independent printed confirmation of E.3's S(k) and of the E.3 k = 4 denominators                             |
| Holland–Copenhaver Table 2 (p.421) thresholds | .05/t_i and 1 − .95^{1/t_i} recomputed for t_i = 15,10,10,10,10,10,7,7,7,6,4,4,3,2,1            | .0033/.0034, .0050/.0051, .0071/.0073, .0083/.0085, .0125/.0127, .0167/.0170, .0250/.0253, .0500/.0500: equal to the printed columns |
| Hommel p.384 t-values and p.385 example       | F.4 re-executed under Python 3.11.15 and 3.12.3                                                 | t₁..t₁₀ = 10,6,6,6,6,4,4,3,2,1 equal the printed line; j = 5 / 3 and j = 4 / 5 equal the printed example                             |
| Hommel Table 1 exact entries                  | 1 − (1 − .025)²                                                                                 | 0.049375, as printed                                                                                                                 |
| Rom recurrence                                | F.3 recurrence, exact rationals                                                                 | twenty constants; nineteen printed cells matched at 3 s.f.; row 10, α = .01: 0.001004472598983613                                    |
| Rom defining condition (1)                    | exact polynomial integration of n! over the ordered region, no recurrence                       | A_n(α) = 1 − α exactly for n = 1..10 at both α with the recurrence constants                                                         |
| Rom rounding hypothesis                       | recurrence with each b_n rounded to 3 s.f. before use                                           | row 10, α = .01 still 1.00 × 10⁻³                                                                                                    |
| E.3 diagnostic                                | re-executed                                                                                     | identical to the "Observed output"                                                                                                   |
| F.4 diagnostic                                | re-executed under 3.11.15 and 3.12.3                                                            | identical except the interpreter version line                                                                                        |

## 7. Prior findings, individually (README item 7)

| Finding (PR #194)                       | Status after this pass                                                                                                                                                 |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| N-D1 (E.3 hard-coded `6-j+1`)           | `OPEN`, cosmetic; no numerical consequence; does not justify moving the head                                                                                           |
| N-D2 (Table 1 page not stated)          | `ANSWERED` by this review: Table 1 is on p.827, Table 2 on p.828; the optional prose addition remains at the author's discretion                                       |
| N-D3 (E.1 read range)                   | `ANSWERED` by this review: pp.826–831 include Section 6 and the Appendix on pp.830–831; every E.3 pinpoint beyond p.828 was located; optional prose clarification only |
| N-D4 (other Part D bibliographic spans) | `OPEN`, outside this six-source pass by instruction; no source requested or approved here                                                                              |
| N-F1 (caps never active)                | `CONFIRMED`, optional clarification only                                                                                                                               |

None of these requires a change to the reviewed head.

## 8. New findings

### BLOCKER

None.

### SHOULD-FIX

None.

### NICE-TO-HAVE

- **N-P1 (E.2 PVL-07, assumption record).** Hochberg p.801 states the derivation for
  "a collection H … satisfying the condition of free-association (Holm, 1979)". The
  E.2 assumptions column does not carry this printed assumption. Recording it would
  complete commission item 4 for PVL-07. It is not decision-bearing: the closure
  argument (p.801) and Hommel Section 3 (p.384) show that logical restrictions do not
  invalidate the procedure and can only sharpen it, and E.4's reopen conditions already
  name family and equality-constraint changes.
- **N-P2 (C.3 row 18 / E.2 / F.2, terminology).** The source's term is "positively
  orthant dependent" (Definition 3.1, citing Dykstra, Hewett and Thompson 1973); the
  result's "lower-orthant" describes the form of the printed inequality. Carrying the
  printed term alongside the descriptive one would make the row searchable against the
  source.
- **N-P3 (E.3 / Shaffer 4.1, source notation).** Shaffer p.829 prints the 4.1
  replacement as α/t_(n−r). Under the Section 2 definition, "at least r false" gives the
  denominator t_{r+1}, and the two illustrations on p.830 (three hypotheses, r = 1,
  level α; six hypotheses, r = 1, level α/4) are consistent with t_{r+1}, while a
  literal t_{n−r} reading gives a different value in the second illustration. E.3 does
  not transcribe the printed index, so nothing in the reviewed record is affected; any
  later specification of the 4.1 variant should transcribe and interpret the printed
  index explicitly rather than by memory. Recorded as a source observation, not as an
  erratum claim.
- **N-P4 (E.3, pinpoint).** E.3 says "Section 2, p.827, orders the marginal
  significance probabilities"; the ordering and the stop rule are defined in Section 1
  on p.826, and Section 2 changes only the stage denominators. Cosmetic.

## 9. Repository validation

Reused (attributed, not re-run): at `eb6c0b26…` without any review file,
`pnpm format:check`, `pnpm lint:markdown` (355 files, 0 issues),
`node --import tsx tooling/src/validate.ts` and `git diff --check` all exited 0 in this
session (PR #194 Section 9).

Run in this pass with this file added on `review/r3-src-primary-completion-20260907`:

| Command                                      | Result                                       | Exit |
| -------------------------------------------- | -------------------------------------------- | ---: |
| `pnpm format:check`                          | "All matched files use Prettier code style!" |    0 |
| `pnpm lint:markdown`                         | 356 files, 0 issues                          |    0 |
| `node --import tsx tooling/src/validate.ts`  | "… are clean."                               |    0 |
| `git diff --check eb6c0b26… <review commit>` | no output                                    |    0 |

No aggregate `pnpm check` was run. A clean repository check is not evidence of source
correctness; Sections 4–6 are.

## 10. Verdicts

| Determination                                                     | Verdict                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Content review (SR-C six-source scope at `eb6c0b26…`)             | **`GO`** — C-C1–C-C5 as characterized in C.3, E.2 and F.2 are directly supported at the stated printed pages of the six originals whose hashes match C.2/D.2; the F.2 derivations agree with their printed premises; the E.3 sets match Shaffer Table 2 and Holland–Copenhaver Table 1; the Rom cell conflict is real and correctly retained; 0 `BLOCKER`, 0 `SHOULD-FIX`, 4 `NICE-TO-HAVE`                                                                                                            |
| PR #194 separable `GO`                                            | **confirmed**; its `SOURCE_ACCESS_INCOMPLETE` is superseded for the SR-C scope by this record and was never content approval                                                                                                                                                                                                                                                                                                                                                                           |
| `SR-C` proposed `PARTIAL` (F.5 / README item 6)                   | **accurate**: every decision-bearing procedural claim is source-supported; one recorded primary-source conflict (Rom p.664 Table 1, α = .01, row 10) awaits the separate adjudication the commission requires                                                                                                                                                                                                                                                                                          |
| Proposed bounded adjudication (README item 6)                     | **supported by the source**: Rom defines the constants by equation (2) and presents Table 1 as obtained by iterating (2); the procedure's guarantee rests on (2), the step-up structure and the closure principle, not on any printed cell. Retaining the printed conflict, grounding PVL-10 (Rom) in (2) and the procedure, not adopting Table 1 as numerical authority, and requiring separately reviewed computation for any future constants is consistent with the commission and with the source |
| Later `CLOSED` source proposal                                    | **could be supported** once the steward records that adjudication: the hold's decision-bearing claims would then all be directly supported with exact identities and pinpoints. `PARTIAL` remains until that decision, which this record does not make                                                                                                                                                                                                                                                 |
| Other thirteen dispositions, overall `INPUT_INCOMPLETE`, `NARROW` | carried unchanged (PR #194)                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Independence — context                                            | `ESTABLISHED` (Section 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Independence — model level (RFC rule 2)                           | `PENDING` (Section 11); not a source-access limitation                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Formal hold acceptance                                            | `NOT PERFORMED`; not authorized by this record                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

`GO` means only that, at exact head `eb6c0b26…`, the SR-C six-source content of Parts
D–F is supported by the six original artifacts as read in this session, that its stated
limits are the sources' limits, and that the fixed catalogue classes are untouched. It
does not close SR-C, approve PR #193 or PR #194 for merge, cover the ten other Part D
papers or the other thirteen dispositions, reconsider the `NARROW` programme
disposition, open public discussion, adopt any step-up, closed-Simes, logically
restricted or product-form procedure or any adjusted-p output contract, adopt any R4
method, certify any numerical implementation, or authorize a release.

## 11. Independence evidence and its limits

Kept separate from the content verdict.

- **Established: separate context and non-involvement.** This pass ran in the
  reviewer session started 2026-09-07T08:51:15Z, after every reviewed commit, from a
  fresh clone, with the six PDFs supplied as a private packet and no access to any
  authoring session's context. It authored none of the reviewed material. It did
  author PR #194's record; this record tests that record's carried checks rather than
  assuming them, and it supersedes PR #194's source-access limitation only for the
  scope stated here.
- **Established: reviewer-side model identifier.** `claude-fable-5-1` (configured and
  last-served), re-read from the session-management service during this pass; reviewer
  session testimony from that service, not provider-side telemetry.
- **Recorded, not verified: authoring-side account.** The packet README, D.1, E.1 and
  the PR text state that Parts D, E and F, including the computations and repairs at
  this input, were prepared with OpenAI assistant support in the continuing author
  session, and that earlier mixed human-led and partial-Claude assistance for Parts A–C
  is preserved; neither account asserts exclusive human authorship. Taken as written,
  the authoring assistance for D–F and the reviewing assistance here come from different
  providers; that is the record's first-hand testimony and is not verifiable from Git
  objects. The historical `PENDING` for Parts A–C (PR #192 Section 11) is not erased.
- **Consequence.** RFC rule 2's separate-model criterion is not marked satisfied by
  this record; the steward's acceptance record should state which account it relies
  on. This is an acceptance prerequisite, not missing source access.
- **Human responsibility.** This text was produced in an LLM-assisted review session
  at the steward's instruction; accountable human responsibility for commissioning and
  acting on it rests with the steward. No human authorship of this text is claimed.

## 12. Non-promotions and remaining work

- Steward adjudication of the Rom Table 1 conflict on the boundary assessed in
  Section 10; then, if recorded, a `CLOSED` source proposal for SR-C may be prepared by
  the author and reviewed against its new exact identity.
- The four `NICE-TO-HAVE` items and PR #194's N-D1 are optional prose changes for a
  future increment; none justifies moving the author head now.
- N-D4 and the uninspected content of the other ten Part D papers remain explicitly
  open and outside this pass; SR-A, SR-B, SR-F, SR-H, SR-I, SR-J and RSM-02 work
  remains as D.5 states; the R4 source gaps are untouched.
- Steward acceptance of SR-K and SR-G per PR #192 Section 12, and every steward
  decision, remain outside this record.
- This record is a review input only; it is not an authoritative artifact. No source
  PDF, full-text extraction or page image is committed with it.

## Public-artifact self-check

- [x] Only the public repository at the fixed head, the live PR metadata (read at start
      and end), the pinned commission, the fixed semantic result, PR #194's record and
      the six privately supplied original PDFs were used; no private repository, work
      item, or product implementation was read.
- [x] This file is the only change in the review commit; the reviewed result, both
      commissions, the preserved reviews (PRs #187, #188, #192, #194), the source PDFs
      and every authoritative artifact are unchanged; no branch was renamed, deleted or
      force-pushed.
- [x] Attribution is role-based. Material process provenance (same LLM-assisted
      reviewer session as PR #194, reviewer model identifier, packet identity,
      environment, tooling, date, hashes, reused versus re-run checks) is disclosed; no
      unsupported human authorship or non-involvement is implied.
- [x] Source statements, investigator inference, reviewer inference, findings, the
      content verdict, the independence status and the acceptance status are kept
      separate; quotations are short and identified by printed page.
- [x] No merge, hold update, Issue change, discussion opening, method adoption,
      formal adjudication, ratification, or release was performed, and none is
      authorized by this record.

RELEASE 3 SR-C PRIMARY-SOURCE COMPLETION REVIEW COMPLETE - CONTENT GO (SIX-SOURCE SCOPE AT eb6c0b26) - ROM TABLE 1 CELL CONFLICT CONFIRMED AND RETAINED - SR-C PARTIAL ACCURATE, CLOSED REACHABLE AFTER ADJUDICATION - MODEL-LEVEL INDEPENDENCE PENDING - FORMAL ACCEPTANCE NOT PERFORMED - NOT MERGE APPROVAL - NOT HOLD CLOSURE - NOT PROTOCOL ADOPTION
