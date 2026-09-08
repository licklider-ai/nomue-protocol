# Release 3 Source-Acquisition Result Part H — Independent Primary-Source Review of the SR-B Completion (Dunn 1961, Šidák 1967)

**Status: informative independent review result; non-normative; not adopted.**
This record is a separate-context, exact-head review of the Part H increment proposed
in PR #198 of the Release 3 semantic source-acquisition result. Part H proposes that
hold `SR-B` (PVL-01 attribution and PVL-02) be `CLOSED` for its source-acquisition
obstacle after direct inspection of the two assigned originals, suppliers 20 (Šidák
1967, SRC-13) and 21 (Dunn 1961, SRC-14). This review re-read both originals from the
supplied bytes, checked every H.2 claim against page images, re-derived the H.3
mathematics independently, re-examined the H.4 conflicts on the printed pages, and
checked the H.5 disposition and counts against the commission. It selects no
Contract, procedure, identifier, schema, Public Check, tolerance, support domain, RFC
decision, R4 method, or release outcome; it updates no hold, issue, gate, or catalogue
class; it merges nothing. Attribution is role-based; material process provenance is
disclosed in Sections 1 and 12.

**Content verdict: `GO`** (Section 11), bounded to the Part H delta at the exact head
below. Every source statement in H.2 (B-1 through B-6, the attribution paragraph and
the Slepian note) is supported by the printed pages at the stated pinpoints; the H.3
derivations are mathematically correct and correctly separated from what the originals
print; both H.4 conflicts are confirmed on page images and are correctly kept outside
the PVL-01/02 basis; the ledger arithmetic (5 `CLOSED` / 0 `PARTIAL` / 9
`INPUT_INCOMPLETE`, overall `INPUT_INCOMPLETE`, `NARROW` retained) is right. Findings:
`BLOCKER` 0, `SHOULD-FIX` 2, `NICE-TO-HAVE` 5 (Section 9). Neither `SHOULD-FIX`
changes a disposition; both are precision additions for a successor increment.

**Source-supportable hold disposition:** `SR-B` `CLOSED` as a source-result candidate,
for the source-acquisition obstacle only, under the narrowed PVL-02 reading of H.3
(Section 7). **Independence status: context `ESTABLISHED`; model level:
testimony-supported for Part H, steward determination pending** (Section 12).
**Formal hold acceptance: `NOT PERFORMED`** and not authorized by this record.

## 1. Review identity, scope, role, and independence

| Field                 | Value                                                                                                                                                                                                                                                                                                                                                                                                            |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository            | `licklider-ai/nomue-protocol` (public)                                                                                                                                                                                                                                                                                                                                                                           |
| Reviewed pull request | #198 (draft; head branch `research/r3-srb-primary-completion-20260907`; base `research/r3-src-closure-proposal-20260907`, the PR #196 branch, comparison only)                                                                                                                                                                                                                                                   |
| Reviewed exact head   | `f6d39534e85920a8331941126a6eb384244e34f1` (the PR head at the start and at the end of this review; see Section 2)                                                                                                                                                                                                                                                                                               |
| Result path           | `governance/drafts/release-3-preparation/semantic-source-acquisition-result.md`                                                                                                                                                                                                                                                                                                                                  |
| Review date           | 2026-09-08 (UTC)                                                                                                                                                                                                                                                                                                                                                                                                 |
| Reviewer role         | independent primary-source reviewer for Part H, following result Section H.5 and the user's request to review PR #198                                                                                                                                                                                                                                                                                            |
| Non-involvement       | this review session did not author, revise, or repair the acquisition commission, any of Parts A–H of the result, the continuation record, or any prior review record (PR #187, #188, #189, #192, #194, #195, #197). It was started fresh on 2026-09-08 from a new clone. It is not the session that produced the PR #194/#195/#197 records; those are treated here as third-party records, not as own testimony |
| Review posture        | falsification-oriented: every identity, byte count, hash, pinpoint, equation, inequality direction, table value, degrees-of-freedom statement, count and boundary statement in H.1–H.5 was checked against Git objects, the live PR metadata, the commission, the fixed semantic result, the two supplied originals (page images and text), and independent recomputation                                        |
| Private material      | the two supplied PDFs were read locally and are not committed; no private repository, path, package, product implementation or work item was read                                                                                                                                                                                                                                                                |

**Scope (H.5).** Part H only: H.1 custody and identity; H.2 B-1 through B-6, the
attribution paragraph and the Slepian note; the H.3 derivations and catalogue
reconciliation; the H.4 conflicts and reopen boundaries; the H.5 disposition, ledger
and handoff. Out of scope: the other thirty-three supplied originals, the thirteen
non-SR-B dispositions carried from G.3 (checked for arithmetic only), Parts A–G content
beyond what Part H cites, Release 4, and any acceptance decision. The six-source SR-C
review of PR #195 and the Part G delta review of PR #197 are not redone.

**Model information (recorded on an ordinary accountable basis, not guessed).** This
pass ran in a managed remote execution session (Anthropic cloud environment) created
2026-09-08T00:22:00Z. The session-management service, queried during this pass,
reported `configured_model: claude-fable-5-1` and `last_served_model:
claude-fable-5-1`. No serving-build log was requested or is required. Part H states
that its author side was OpenAI-assisted; that statement is author testimony and is not
verifiable from Git objects (Section 12).

**Environment.** Linux container (managed cloud environment); Node v22.22.2; pnpm
11.7.0; `pnpm install --frozen-lockfile` in this session, exit 0. Python 3.11 with
PyMuPDF 1.28.2 (page rendering at 150 dpi and text extraction of the two PDFs) and
SciPy (`scipy.stats.norm`, `scipy.stats.t`, `scipy.stats.f`, `scipy.stats.chi`,
`scipy.integrate.quad`, `scipy.optimize.brentq`) for the reproductions in Sections 5
and 6. No repository code was used for any statistical computation.

## 2. Fixed identity verification (expected versus observed)

All identities were checked against local Git objects fetched from `origin` and against
the live GitHub PR and commit metadata. Every row matches.

| Item                              | Expected (task / Part H)                                                                                                                      | Observed                                                                                                                                                                                                             | Result |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| PR #198 live state at start       | draft, open, head `f6d39534…`, base `research/r3-src-closure-proposal-20260907`                                                               | draft, open, `mergeable_state: clean`, head `f6d39534e85920a8331941126a6eb384244e34f1`, base at `80ad520cf25e8cdf647f20e7d08d5bb426a85633`, 1 commit, 1 changed file, +165/−0; `git ls-remote` head branch = same    | match  |
| Head commit                       | `f6d39534e85920a8331941126a6eb384244e34f1`                                                                                                    | commit present; tree `e3dcea61d7f6b6b02456255b7a3b6dcaa088e02a`; 993 tree entries (`git ls-tree -r`); author/committer date 2026-09-07T10:06:58Z; message "Record Dunn and Sidak primary-source completion for SR-B" | match  |
| Sole parent                       | `80ad520cf25e8cdf647f20e7d08d5bb426a85633`                                                                                                    | exactly one `parent` line in the commit object, equal to the expected value; parent tree `3006ec05ec4de222a68edb1d15c1d2e4d82f70e8`; parent is not an ancestor of `origin/main`                                      | match  |
| Result blob at head               | `b0679cbad8d384158b93ce414f8dfb7f2270ea74`                                                                                                    | `git rev-parse <head>:<path>` = same; 283253 bytes; SHA-256 `cd625b72dbe304a2ed371045b55a3d1cfc606c8e9cb7dfc4cff0587a881187c1`                                                                                       | match  |
| Result blob at parent             | `34f01d4e14b0e0feac7ef934f11e886535c90c41`                                                                                                    | `git rev-parse <parent>:<path>` = same; 267540 bytes; SHA-256 `5de235d47fd4bc1c26a6e3f156a62dcb106d61b13df9047d1d3ae74f060d2341`                                                                                     | match  |
| Change set                        | Part H appended to the result file only                                                                                                       | `git diff --name-status` parent..head: one `M` line, the result path; one hunk `@@ -2323,3 +2323,168 @@`; +165 lines, 0 deletions                                                                                    | match  |
| Parts A–G prefix                  | 267540 bytes preserved byte-exactly                                                                                                           | `cmp -n 267540 <parent blob> <head blob>` exits 0; the head blob's first 267540 bytes equal the parent blob                                                                                                          | match  |
| Commission                        | containing commit `f39100161cb45de15767bdb19ed54aba9489b41a`, blob `3c7ddcc696f0c284213f7efe0da68e747bc238d7`                                 | `git rev-parse f3910016…:governance/drafts/release-3-preparation/semantic-source-acquisition-commission.md` = `3c7ddcc6…`; `f3910016…` is an ancestor of the head; the head carries the same blob at that path       | match  |
| Fixed semantic input              | commit `7bd9c5ab854777c3e99e624d9d2ed62731228852`, blob `8f21526040924b891f64724c2d0fde9ea94eff92`                                            | `git rev-parse 7bd9c5ab…:governance/drafts/release-3-preparation/semantic-research-result.md` = `8f215260…`                                                                                                          | match  |
| PR #197 review record             | commit `3828b82b0b2e79b7ba05f6eb771288c39d49435b`, blob `a3725411d3e6a6f32d98b0a5d798c541e401a3b3`                                            | `git rev-parse 3828b82b…:review-inputs/r3-src-closure-proposal/REVIEW-RESULT.md` = `a3725411…`                                                                                                                       | match  |
| Continuation record               | commit `e048cc0622bd5e063b692c7e6072674f1631df85`, blob `1b09b81f8bd6a9e368111d21e1c7733d09a47de7`                                            | `git rev-parse e048cc06…:governance/drafts/research-continuation-2026-09-07.md` = `1b09b81f…`; Section 12 records the limited SR-C acceptance and names SR-B as the next source work                                 | match  |
| Supplied original 20 (Šidák 1967) | SHA-256 `6cd0ccda87a138d447391991c9858f5cea4294bfaeccaa8518754d2854d89533`; 641762 bytes; 9 PDF pages; DOI `10.1080/01621459.1967.10482935`   | `sha256sum` = same; 641762 bytes; 9 pages (publisher cover + printed pp. 626–633); cover page prints the same DOI, JASA 62:318, 626–633                                                                              | match  |
| Supplied original 21 (Dunn 1961)  | SHA-256 `14aa5adbbf07da8e7a73f4451a04d62bd7da198f6053e120afab29145a422488`; 1385001 bytes; 14 PDF pages; DOI `10.1080/01621459.1961.10482090` | `sha256sum` = same; 1385001 bytes; 14 pages (publisher cover + printed pp. 52–64); cover page prints the same DOI, JASA 56:293, 52–64                                                                                | match  |
| H.1 identity versus D.2           | H.1 row values equal the D.2 rows for suppliers 20 and 21                                                                                     | D.2 (result lines 1642–1643) lists the same bytes, page counts and hashes; D.3 (lines 1671–1672) routes 20 → SR-B/SRC-13/PVL-02 and 21 → SR-B/SRC-14/PVL-01                                                          | match  |
| Supplier total                    | 35, no re-count of 20 and 21                                                                                                                  | C.2 nineteen artifacts + D.2 sixteen artifacts = 35 (result line 1623); suppliers 20 and 21 are two of the sixteen; H.1 adds no artifact row                                                                         | match  |
| Review branch name                | `review/r3-srb-primary-completion-20260908` if unused                                                                                         | `git ls-remote --heads origin review/r3-srb-primary-completion-20260908` returned nothing before this branch was created; the name was used                                                                          | match  |

The upload filenames carried copy prefixes (`b68d7ea8-20_Sidak_1967.pdf`,
`8a587802-21_Dunn_1961.pdf`); byte identity, not the filename, was used. No ZIP
unpacking was needed.

## 3. Source inspection actually performed

| Original     | Read as rendered page images (150 dpi)                                                                                                                 | Read as extracted text only                                                | Not read |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- | -------- |
| Šidák (1967) | printed pp. 626, 627, 628, 629, 630, 631, 632, 633 (every printed page: Sections 1–7, Theorems 1–2, Corollaries 1–2, Remarks 1–3, Table 1, references) | cover page (DOI)                                                           | none     |
| Dunn (1961)  | printed pp. 52, 53, 54, 55, 60, 61, 62, 63, 64 (abstract, Sections 1, 2, start of 3, Tables 1–2 and 5–8, Section 5 example, Section 6, references)     | cover page (DOI); printed pp. 56–59 (Sections 3–4 comparisons, Tables 3–4) | none     |

Every equation, inequality direction, table value and degrees-of-freedom statement
cited below was read from the page image, not from the text layer; the text layer of
both scans damages subscripts, inequality signs and table alignment.

## 4. H.2 direct source findings — claim-by-claim verification

Each row states what the original prints (source fact), whether the H.2 wording is
accurate, and any limit. `SUPPORTED` means the H.2 statement is an accurate account of
the printed text at the stated pinpoint.

| H.2 item                                      | What the original prints (verified on page image)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | H.2 accuracy                                                                                                                                                                                                                                                                                                                                                                                      | Verdict               |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| B-1: finite planned family and attribution    | Dunn p. 52 (abstract, Section 1): "picking in advance a number (say m) of linear contrasts among k means"; p. 53 Section 2: estimates normally distributed with variances a_ii σ² and covariances a_ij σ², a_ii and a_ij known, σ² possibly unknown; σ̂² independent of the estimates with νσ̂²/σ² chi-square on ν degrees of freedom; (1) θ_s, (2) θ̂_s with variance b_s²σ², (3) t_s = (θ̂_s − θ_s)/(b_s σ̂), each Student t on ν d.f.; "using a Bonferroni inequality, one can obtain a lower limit to the probability that all the t_i's lie between −c and +c … without knowing anything about this joint distribution except that all the marginals are Student t distributions"; (4) P[−c < t_i < c, i = 1, …, m] ≥ 1 − 2m ∫_c^∞ f^(ν)(t) dt                                                                                                                                                                                                                                                                     | Accurate. The pinpoint "equations (1)–(6)" spans pp. 53–54; Section 2 begins on p. 53 and p. 52 carries the planned-in-advance statement. Dunn's parenthetical that the known-up-to-σ² dispersion matrix "is necessary in order to construct t statistics which are free of nuisance parameters" is consistent with H.2's "known up to a common scale"                                            | `SUPPORTED`           |
| B-2: equal allocation and supported intervals | Dunn p. 54: (5) P[−c < (θ̂_s − θ_s)/(b_s σ̂) < c, s = 1, …, m] ≥ 1 − α; (6) θ̂_s ± c b_s σ̂; c defined by ∫_c^∞ f^(ν)(t) dt = α/(2m); the text then says "Here the overall confidence level for the m linear combinations is 1 − α"; (7) for sample means that "are statistically independent" with a_ii = 1/n_i, a_ij = 0: (Σ c_is ȳ_i) ± c √(Σ c_is²/n_i) σ̂                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Accurate on the tail allocation, the lower bound and the "level 1 − α" wording caveat. One omission: H.2 says (7) "permits unequal sample sizes with the stated common-scale model" but does not state Dunn's condition for (7), that the sample means be statistically independent (a_ij = 0). The general form (6) is what covers known non-zero covariances (finding S-H1)                     | `SUPPORTED` with S-H1 |
| B-3: Gaussian symmetric rectangles            | Šidák p. 626 Theorem 1: X k-dimensional normal, zero means, "arbitrary variances σ_1², …, σ_k², and an arbitrary correlation matrix R"; for any positive c_1, …, c_k, (1) P(\|X_1\| ≤ c_1, …, \|X_k\| ≤ c_k) ≥ P(\|X_1\| ≤ c_1)·P(\|X_2\| ≤ c_2, …, \|X_k\| ≤ c_k) (p. 627); proof via Anderson's Corollary 2 for the non-singular case; p. 628: "If their distribution is a singular one, it may be approximated by a sequence of non-singular distributions; hence, by an obvious passage to the limit, the validity of (1) can be established in general"; Corollary 1 (4): P(\|X_1\| ≤ c_1, …, \|X_k\| ≤ c_k) ≥ ∏ P(\|X_i\| ≤ c_i), "by induction"                                                                                                                                                                                                                                                                                                                                                             | Accurate. No sign restriction on ρ_ij is imposed anywhere in Theorem 1 or Corollary 1. Šidák's Remark 1 (p. 628) is a stated conjecture about monotonicity in λρ_1j, explicitly unproved there; H.2 correctly does not rely on it                                                                                                                                                                 | `SUPPORTED`           |
| B-4: independent-coordinate calibration       | Šidák pp. 628–629 Section 3: X_i = n^{1/2}(Ȳ_i − μ_i)/σ_i satisfy Theorem 1 and Corollary 1 with unit variances; "we may determine c_1, …, c_k such that the right-hand side of (4) equals 1 − α", rectangle (5); "we may always act as if all coordinates of the vectors Y_ν were independent. For any case of dependent coordinates (4) shows that the confidence level of (5) can never be less than 1 − α"; usually c_1 = … = c_k = c_α with Φ(c_α) = ½[1 + (1 − α)^{1/k}]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Accurate. Φ(c_α) = ½[1 + (1 − α)^{1/k}] is equivalent to marginal two-sided coverage 2Φ(c_α) − 1 = (1 − α)^{1/k}, as H.2 states                                                                                                                                                                                                                                                                   | `SUPPORTED`           |
| B-5: common random scale and boundary         | Šidák p. 629 Theorem 2: under P, Z k-dimensional normal, zero means, arbitrary variances and correlation matrix; under P_1 the same except Z_1 independent of Z_2, …, Z_k; "s is a positive random variable, which is independent of Z_1, …, Z_k and has the same distribution both under P and P_1"; (6) P(\|Z_1\|/s ≤ c_1, …) ≥ P_1(…) ≥ P(\|Z_1\|/s ≤ c_1)·P(\|Z_2\|/s ≤ c_2, …); proof by conditioning (7) and Kimball's inequality (p. 630). Corollary 2 (8): P(\|Z_1\|/s ≤ c_1, …, \|Z_k\|/s ≤ c_k) ≥ P_k(…) ≥ ∏ P(\|Z_i\|/s ≤ c_i), P_k having all coordinates independent. Section 5 (pp. 630–631): σ_1² = … = σ_k² = σ² unknown; s_g² from "some fixed index g", Z_i = n^{1/2}(Ȳ_i − μ_i), s = s_g "satisfy the assumptions of Theorem 2 and Corollary 2 (see [2, Theorem 3.3.2])"; rectangle (9); middle probability is k-dimensional Student with zero correlations and n − 1 d.f. Remark 3 (p. 631): "applicable only in the case of equal variances"; per-coordinate s_i analogue is an unproved hope | Accurate on every element: one positive scale, independence from the Gaussian vector, same scale law under the compared distributions, product bound, single-coordinate sample variance on n − 1 d.f., no licence for coordinate-specific standard errors                                                                                                                                         | `SUPPORTED`           |
| B-6: pooled-scale qualification               | Šidák p. 631 Remark 2: for Dunn's pooled s² = k^{-1} Σ s_g² "keeping, however, n − 1 degrees of freedom", the distributions of s² under P, P_1 and P_k differ and (n − 1)s²/σ² "may not have a χ² distribution. Thus our Theorem 2 and Corollary 2 can not be applied; more precisely, the inequalities between the first and the middle terms in (6) and in (8) can not be established by our method. Still, it is easy to show, by a proof similar to that given above, that the inequalities between the first and the last terms in (6) and in (8) remain true for this s²". p. 632 Section 7: "The validity of the 'best' procedure described in this paper is now proved only for the variances known, or unknown but equal. For the variances unknown and unequal we may apply … the procedure based on the Bonferroni inequality"                                                                                                                                                                          | Accurate. H.2 correctly preserves that the first-to-last product bound for the pooled s² is asserted by the author "by a proof similar", not printed, and that the unequal-variance case is expressly outside the paper's proof. The prohibition on transferring to arbitrary Welch statistics is the correct reading of Remark 3 and Section 7                                                   | `SUPPORTED`           |
| Attribution paragraph (Dunn pp. 52–53)        | Dunn pp. 52–53: "The method given here is so simple and so general that I am sure it must have been used before this. I do not find it, however, so can only conclude that perhaps its very simplicity has kept statisticians from realizing that it is a very good method in some situations"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Accurate: Dunn leaves prior use open. H.2's resolution of SRC-14 as the assigned primary account of the procedure, not as a priority claim, is the only reading the text supports. This satisfies the SR-B coverage "PVL-01 attribution" as the fixed semantic result frames it (Section 17: "SRC-14" as the named primary source), which is assigned-source attribution, not historical priority | `SUPPORTED`           |
| Slepian note (Šidák p. 628)                   | p. 628: "one-sided result was found by D. Slepian [11] (see also [7], p. 805)": P_R{X_1 ≤ c_1, …, X_k ≤ c_k} ≥ P_K{…} when ρ_ij ≥ κ_ij for all i ≠ j                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Accurate; correctly kept apart from Theorem 1 and not attributed to B-3. Šidák p. 630 also credits Dunnett and Sobel [6] with a one-sided analogue for ρ_ij = b_i b_j (N-H3)                                                                                                                                                                                                                      | `SUPPORTED`           |

**Cross-attribution observed in both originals (not decision-bearing).** Šidák's
abstract (p. 626) states that the paper proves "the following conjecture of O. J. Dunn
[3], [4]"; p. 628 and p. 630 credit Dunn [3] with the special cases k = 2 or 3 and
ρ_ij = b_i b_j. Dunn (1961) p. 64 states the same conjecture in her own words ("In [3] I
conjectured that P attains its smallest possible value when all the correlations are
zero. This was established, however, only for m = 2 and 3"). Dunn p. 64 also notes that
for ν = ∞ and zero correlations P = [1 − (α/m)]^m. These passages corroborate H.2's
attribution reading and the pairing of the two sources; Part H does not cite them
(N-H2).

## 5. H.3 investigator derivations — independent mathematical check

The derivations below were reproduced from the stated premises without reference to
Part H's text beyond its statements; each conclusion was then compared to H.3. Setting:
a finite family of m ≥ 1 hypotheses fixed before any data-dependent selection; α ∈
(0, 1); I_0 the true-null index set, m_0 = |I_0| ≤ m; each true-null p-value valid,
P(p_i ≤ u) ≤ u for all u ∈ [0, 1].

**PVL-01 (Bonferroni).** Reject H_i iff p_i ≤ α/m. Then P(any false rejection) =
P(∪*{i∈I_0} {p_i ≤ α/m}) ≤ Σ*{i∈I_0} P(p_i ≤ α/m) ≤ m_0 α/m ≤ α. Only Boole's
inequality and marginal validity are used; no dependence, normality or continuity
assumption enters, and the bound holds for every configuration of false nulls (strong
control). The threshold inversion p_i ≤ α/m ⇔ m p_i ≤ α gives adjusted p_i = m p_i; the
cap min(1, ·) never changes a decision because α < 1 (checked on 10^5 random
(m, p, α) triples). H.3's statements are correct, and H.3 correctly says that Dunn's
Student-t construction is one sourced instance of valid marginals, not a condition of
the argument. This matches fixed-result F-10 (Holm's Theorem 1, Boole inequality). The
abstract p-value form and min(1, m p) are not printed in Dunn; H.3 says so.

**PVL-02 (Šidák-type single step).** Let t = 1 − (1 − α)^{1/m} ∈ (0, α]. Reject H_i
iff p_i ≤ t. Suppose the no-rejection product bound P(∩*{i∈I_0} {p_i > t}) ≥
∏*{i∈I_0} P(p_i > t). By validity P(p_i > t) ≥ 1 − t, so P(no false rejection) ≥ (1 −
t)^{m_0} = (1 − α)^{m_0/m} ≥ 1 − α, hence P(any false rejection) ≤ 1 − (1 − α)^{m_0/m}
≤ α, for every m_0 ≤ m, i.e. for every configuration of false nulls. Edge cases: m_0 =
0 gives false-rejection probability 0; m = 1 gives t = α; if the true-null p-values are
independent the product bound holds with equality, and if in addition they are exactly
uniform and m_0 = m the bound is attained: 1 − (1 − t)^m = α. Numerical spot checks (m
∈ {1, 2, 5, 10, 100}, all m_0) agree. The threshold inversion p_i ≤ t ⇔ (1 − p_i)^m ≥
1 − α ⇔ 1 − (1 − p_i)^m ≤ α gives adjusted p_i = 1 − (1 − p_i)^m (checked on 10^5
random triples). H.3's chain is correct and its statement that the inversion "alone
does not establish the joint bound or strong FWER for an arbitrary dependent p-value
family" is correct: the product bound is the load-bearing premise.

**Sourced dependent case.** Let the true-null pivots (X_i)_{i∈I_0} be jointly centered
Gaussian with positive marginal variances (a sub-vector of a jointly Gaussian estimator
vector is jointly Gaussian; under a true null the pivot is centered because the
hypothesized value equals the true value). With two-sided p_i = 2(1 − Φ(|X_i|/σ_i)),
{p_i > t} = {|X_i| < c} with c = σ_i Φ^{-1}(1 − t/2). Šidák Corollary 1 (4) gives
P(∩ {|X_i| ≤ c_i}) ≥ ∏ P(|X_i| ≤ c_i). Because each marginal is continuous, P(|X_i| =
c_i) = 0 for each i, so the strict and non-strict events differ by a null set and the
product bound transfers to the strict no-rejection event exactly as H.3 says. The
common-scale case (Corollary 2 (8), Theorem 2 conditions on s) transfers in the same
way to studentized pivots |Z_i|/s with one scale s independent of Z and with the same
law under the compared distributions, giving the B-5 family. Dunn's Section 2 family
(common σ̂, Z_s = (θ̂_s − θ_s)/b_s with common variance σ²) is an instance of the
Theorem 2 setting; Part H does not state this and need not. Conditions that must hold
and that H.3 records: joint Gaussianity and the covariance structure of the true-null
sub-vector under the actual parameter configuration; positivity of the marginal
variances (implicit in H.3's "continuous boundary", made explicit here, N-H1); one
common scale, not coordinate-specific scales (Remark 3); two-sided symmetric limits,
not one-sided (the one-sided Slepian and Dunnett–Sobel results are different theorems
with different hypotheses).

**Catalogue reconciliation.** The fixed result labels PVL-02's condition
"independence/orthant condition (pending SR-B)" (Section 12 comparison table) and
"independence/positive-orthant conditions unverified here" (Section 6.2). Šidák (1967)
never uses the word "orthant", imposes no sign condition in Theorem 1 or Corollary 1,
and proves the result for symmetric rectangles of a centered Gaussian vector with an
arbitrary correlation matrix (plus the common-scale extension). H.3's reconciliation —
replace the shorthand by the explicit no-rejection product bound and the sourced
Gaussian cases; do not assert arbitrary dependence, merely non-negative pairwise
correlations, or an unspecified positive-dependence label — is the correct reading. It
narrows the catalogue's characterization to the source's own condition; it does not
contradict it and it introduces no new procedure. Both entries correctly remain
`R3-CAND`. The fixed catalogue is not edited (correct under the commission); recording
the narrowed condition in the entry text is a future catalogue-revision step (N-H4).

**Not printed in the originals, correctly flagged as investigator derivation.** The
true-null-subset argument, the adjusted-p formulas min(1, m p) and 1 − (1 − p)^m, the
threshold inversions, and the transfer from confidence rectangles to a rejection rule.
Šidák prints the marginal calibration (1 − α)^{1/k} (p. 629) and Dunn prints α/(2m)
(p. 54); neither prints an adjusted p-value.

## 6. H.4 conflicts — page-image confirmation, classification and adequacy of exclusion

### 6.1 Šidák p. 631 Table 1 and p. 632

**Confirmed on page image.** Table 1 (p. 631), α = 0.05, row n − 1 = ∞: k = 2 prints
2.23 (first column, reproduced from [10] or [4], middle probability of (8) = 0.95) and
2.24 (second column, last term of (8) = 0.95, computed from [12]); k = 5 prints 2.57 /
2.57; k = 8 prints 2.73 / 2.73. p. 632: "Naturally, the two values for each k in the
last row should be equal (thus it seems that the reproduced value 2.23 for k = 2 is
erroneous)."

**Reviewer reproduction (reviewer-side only; nothing adopted).** For n − 1 = ∞ both
columns reduce to c with 2Φ(c) − 1 = 0.95^{1/k}: k = 2 → 2.2365 (rounds to 2.24); k =
5 → 2.5688 (2.57); k = 8 → 2.7270 (2.73). Šidák's suspicion is therefore arithmetically
confirmed: 2.24 is the value consistent with the table's own definition and 2.23 is
not. All twelve finite-d.f. second-column values reproduce to the printed two decimals
as t_ν quantiles at ½[1 + 0.95^{1/k}] (e.g. k = 2: 3.152, 2.626, 2.483, 2.417; k = 5:
4.012, 3.157, 2.937, 2.836; k = 8: 4.501, 3.434, 3.166, 3.045). The twelve finite-d.f.
first-column values were reproduced by one-dimensional quadrature of E[(2Φ(c s) − 1)^k]
with s² ~ χ²_ν/ν: eleven agree to the printed two decimals and one (k = 5, ν = 5)
computes to 3.789 against printed 3.78, a 0.01 difference not adjudicated here.

**Classification.** Text–table inconsistency: yes (one cell). Author doubt expressed:
yes, in the original text. Formal erratum: none found in or attached to the supplied
artifact; none searched for (out of scope). Correct replacement value: derivable and
reproduced above, but not printed by the author as a correction. **Exclusion
adequacy:** the cell is a comparison illustration; nothing in B-3 to B-6 or in the
PVL-02 characterization depends on Table 1. Excluding it from the decision basis is
correct and sufficient; no adjudication is needed for SR-B. Any future numerical use of
Table 1 requires separate review, as H.4 states.

### 6.2 Dunn p. 61 versus p. 63 (Section 5 factorial example)

**Confirmed on page image.** p. 61 Section 5: two-way classification, a rows, b
columns, n observations per cell; "The pooled estimate of the variance, σ̂², has
n(a − 1)(b − 1) degrees of freedom." p. 63 Table 7 column headers: a = 3, b = 4, n = 3,
ν = 24 (m = 84, c = 3.97); a = 4, b = 5, n = 4, ν = 60 (m = 195, c = 4.31). Arithmetic:
ab(n − 1) = 24 and 60; n(a − 1)(b − 1) = 18 and 48. H.4's statement that the headers
equal ab(n − 1) and not the p. 61 expression is exactly right; ab(n − 1) is the
within-cell (pooled) error d.f. of the stated model, so the p. 61 expression is the odd
one out, but neither the author nor a publisher corrects it in the supplied artifact.

**Additional reviewer observation (new; not in Part H).** Recomputing Table 7's c
values as Bonferroni t quantiles t_ν(1 − 0.05/(2m)): for the first design (header ν = 24) the printed 3.97, 3.73, 3.87, 3.53 (Tables 7 and 8, m = 84, 48, 64, 28) compare with
3.952, 3.729, 3.844, 3.513 at ν = 24, consistent with the header up to the graphical
interpolation Dunn declares for her tables. For the second design (header ν = 60) the
printed 4.31, 3.93, 4.26, 3.71 (m = 195, 75, 165, 45) compare with 3.887, 3.590, 3.836,
3.426 at ν = 60 but with 4.284, 3.907, 4.218, 3.703 at ν = 24. The second design's c
values are therefore consistent with ν = 24, not with the printed header ν = 60, while
the same design's S values in Table 8 (5.92 and 5.78) reproduce at ν = 60 (√(20
F_{0.05}(20, 60)) = 5.91; √(19 F_{0.05}(19, 60)) = 5.79). This is a second internal
inconsistency within the example, in the numbers rather than the formula. It is
recorded here as a reviewer observation for the conflict record (S-H2); it is not
adjudicated and no replacement value is adopted.

**Classification.** Text–table inconsistency: yes (formula versus headers), and
additionally header-versus-values inconsistency in one column. Author doubt expressed:
no. Formal erratum: none in the supplied artifact. Correct replacement: ab(n − 1) is the
standard result for the stated model, but it is a reviewer statement, not a printed
correction. **Exclusion adequacy:** Section 2's generic ν (B-1/B-2) is independent of
the example; PVL-01's attribution and the abstract Bonferroni argument do not depend on
Section 5 at all. Excluding the example from the PVL-01/02 basis is correct and
sufficient for SR-B. The example must not be reused numerically (R4 or elsewhere)
without separate adjudication, and the conflict record should carry the additional
observation above before any such reuse.

### 6.3 R4 and reopen boundaries

H.4 states that the Dunn observation "resolves none of PR 184's source-access
findings". Correct: nothing in Part H supplies an R4 source, and no R4 finding is
marked resolved. The reopen list in H.4 (post hoc family selection, invalid marginals,
unestablished product condition for PVL-02, different tail or scale construction,
priority becoming decision-bearing, new primary evidence) covers every assumption this
review found load-bearing in Sections 4–5. RFC rule 5 (adjudication of material
disagreement) is not triggered for SR-B: the two originals do not disagree with each
other on any decision-bearing claim; the recorded conflicts are internal to
non-decision-bearing tables and an example.

## 7. H.5 disposition, ledger and boundaries — assessment against the commission

**Does the narrowed reading satisfy the commissioned source claims?** The commission
defines `CLOSED` as "all decision-bearing source claims needed by the hold are directly
supported, with exact artifact identity and pinpoints", and `PARTIAL` as "some claims
are supported but named gaps remain". SR-B's claims in the fixed result are C-B1
(Dunn 1961 as the named primary source of the Bonferroni-inequality procedure,
attribution only) and C-B2 (Šidák 1967: single-step product-form level, and the
dependence condition under which it holds).

- C-B1 is directly supported at Dunn pp. 52–54 (Section 4 above). The fixed result's
  own framing (Section 17: "PVL-01 attribution" with SRC-14 as the named source) is
  assigned-source attribution; historical priority was never a catalogue claim, and
  Dunn's text forecloses a priority claim anyway. No gap.
- C-B2's product-form level is directly supported at Šidák p. 628 (4), p. 629 (Section
  3 calibration), p. 630 (8). C-B2's dependence condition is directly supported at
  Šidák pp. 626–631, but as the source's own condition (centered Gaussian, arbitrary
  correlation, symmetric rectangles; common independent random scale), which is
  narrower and more specific than the catalogue's "independence/orthant" shorthand.
  The commission's item 7 expressly allows a source to "narrow" a catalogue
  characterization; a narrowing that is fully pinpointed is not a "named gap" in source
  support. No source text remains to be identified or inspected.

The commission's "narrows" outcome combined with fully pinpointed claims is therefore
category-consistent with `CLOSED` for the source-acquisition obstacle. `PARTIAL` would
be the correct disposition only if some claim needed by SR-B lacked source support;
this review found none. The residual item created by the narrowing is a catalogue
wording follow-up (the PVL-02 condition text in any future catalogue revision must
carry the H.3 condition, not the shorthand), which is a reopen trigger already listed
in H.4, not a source gap.

**Ledger.** G.3 records 4 `CLOSED` (SR-C, SR-G, SR-K, SR-L), 0 `PARTIAL`, 10
`INPUT_INCOMPLETE` (SR-A, SR-B, SR-D, SR-E, SR-F, SR-H, SR-I, SR-J, RSM-01, RSM-02).
Moving SR-B alone gives 5 / 0 / 9 with the fourteen entries H.5 lists; the counts and
the membership are correct. Overall precedence: no `NO_GO`; nine `INPUT_INCOMPLETE`
remain, so overall `INPUT_INCOMPLETE` is correct; `SOURCE_SET_READY` is not reached;
the existing semantic `NARROW` is correctly retained.

**Boundaries.** H.5 keeps the candidate-`CLOSED` / formal-acceptance distinction
explicit ("not GO from an independent reviewer and is not formal SR-B acceptance"; "the
candidate count does not assert five formally accepted holds"); the SR-C acceptance is
cited at the exact continuation identity; SR-K/SR-G acceptance is left separate; both
PVL entries remain `R3-CAND`, unselected; no method adoption, numerical guarantee,
implementation or tolerance claim is made, and H.3's last paragraph says so expressly.
No public-discussion opening, ratification or release is implied.

## 8. Reuse of prior evidence and independence of this pass

| Item                                                                   | Source of the prior check                                               | Reused for                                                           | Re-run here?                                                                                                               |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Custody identities of suppliers 20 and 21                              | result D.2/D.3 at `80ad520c…` (author-side record)                      | expected values only                                                 | yes: hashes, bytes, page counts and DOIs recomputed from the supplied bytes                                                |
| Parts A–G prefix at 267540 bytes; G.3 ledger; SR-C acceptance identity | PR #197 record, blob `a3725411…` (third-party independent review, `GO`) | context for the ledger delta; the Part G verdict is not re-litigated | prefix, ledger arithmetic and the continuation identity re-checked from Git objects; the six-source SR-C review not redone |
| Fixed semantic PVL-01/PVL-02 rows, F-10, Section 17 SR-B row           | blob `8f215260…`                                                        | the catalogue characterization that Part H reconciles                | read directly                                                                                                              |
| Commission definitions of `CLOSED`/`PARTIAL`/precedence                | blob `3c7ddcc6…`                                                        | Section 7                                                            | read directly                                                                                                              |

No prior review of Part H exists; nothing about Part H was reused from any earlier
record. The prior model-independence determinations (Decision B for the D–F six-source
pass; the historical `PENDING` entries in PRs #192, #194, #195) are not applied to Part
H and are not rewritten (Section 12).

## 9. Findings

### BLOCKER

None.

### SHOULD-FIX (precision; neither changes any disposition or requires moving the reviewed head)

- **S-H1 — B-2's account of Dunn equation (7) omits its independence condition.** Dunn
  p. 54 introduces (7) for the case "when ȳ_1, …, ȳ_k are statistically independent,
  then a_ii = 1/n_i … for i ≠ j, a_ij = 0". H.2 B-2 says (7) "permits unequal sample
  sizes with the stated common-scale model", which reads as if (7) held under the
  general Section 2 covariance model. The general interval (6) is the form that covers
  known non-zero covariances; (7) is the independent-means special case. A successor
  increment should state the a_ij = 0 condition. Commission analysis item 4
  (dependence assumptions) is otherwise met by B-1.
- **S-H2 — The Dunn example conflict record should carry the second inconsistency
  found here.** In addition to the p. 61 formula versus the p. 63 headers, the second
  design's c values in Tables 7–8 (4.31, 3.93, 4.26, 3.71) reproduce as Bonferroni t
  quantiles at ν = 24, not at the printed ν = 60, while the same design's S values
  reproduce at ν = 60 (Section 6.2). H.4 already excludes the example from the PVL-01/02
  basis and routes it to R4, so the disposition is unaffected; but per the commission's
  conflict rule the record should be complete before any numerical reuse. No cell is to
  be silently fixed.

### NICE-TO-HAVE

- **N-H1** — H.3's boundary argument ("continuous boundary has zero marginal
  probability") implicitly requires strictly positive marginal variances for the
  true-null pivots; stating it avoids a degenerate-coordinate reading of Šidák's
  "arbitrary variances".
- **N-H2** — Šidák's abstract and pp. 628/630 credit Dunn [3] with the conjecture and
  its k = 2, 3 and ρ_ij = b_i b_j cases, and Dunn (1961) p. 64 restates the conjecture and
  the ν = ∞ zero-correlation value [1 − (α/m)]^m. Citing these would strengthen the
  attribution paragraph and the pairing of SRC-13 with SRC-14 at no cost.
- **N-H3** — Šidák p. 630 also names a one-sided analogue by Dunnett and Sobel [6]
  (ρ_ij = b_i b_j). Like the Slepian note, it is not the symmetric-rectangle theorem;
  listing it alongside Slepian would make the "no one-sided guarantee" boundary
  complete.
- **N-H4** — The narrowed PVL-02 condition lives only in H.3. When the catalogue is
  next revised through its own process, the PVL-02 entry text ("independence/orthant
  condition") should be replaced by the H.3 condition; this is outside the commission
  and is noted so it is not lost.
- **N-H5** — H.1's page-image coverage statement (Šidák pp. 627–631; Dunn pp. 53–54,
  61, 63) is narrower than what this review needed to confirm B-3's singular-limit
  paragraph (p. 628, covered) and B-6's Section 7 statement (p. 632, not in the H.1
  image list, though the claim is accurate). A successor could list p. 632.

## 10. Repository validation

Run with the working tree at `f6d39534…` (before adding this file) on the new branch,
and again after adding this file:

| Command                                                                                              | At `f6d39534…`                               | With this file                                                                           | Exit |
| ---------------------------------------------------------------------------------------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------- | ---: |
| `pnpm format:check`                                                                                  | "All matched files use Prettier code style!" | same (after `prettier --write` on this file only)                                        |    0 |
| `pnpm lint:markdown`                                                                                 | 355 files, 0 issues                          | 356 files, 0 issues                                                                      |    0 |
| `node --import tsx tooling/src/validate.ts`                                                          | "validate: OK - … are clean."                | same                                                                                     |    0 |
| `git diff --check 80ad520cf25e8cdf647f20e7d08d5bb426a85633 f6d39534e85920a8331941126a6eb384244e34f1` | no output                                    | no output (also `git diff --check` on the working tree with this file staged: no output) |    0 |

No aggregate `pnpm check` was run. A clean repository check is not evidence of
substantive correctness; Sections 4–7 are.

## 11. Verdicts

| Determination                                                               | Verdict                                                                                                                                                                                                                                                                            |
| --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Identity and prefix (H.1, PR #198, parent, blobs, tree, originals)          | all match; Parts A–G preserved byte-exactly; suppliers 20/21 not double-counted; total 35                                                                                                                                                                                          |
| H.2 source findings B-1 to B-6, attribution, Slepian note                   | **`GO`** — every statement supported at the stated pinpoints on page images; S-H1 is a precision omission on (7)                                                                                                                                                                   |
| H.3 derivations                                                             | **`GO`** — PVL-01 union bound, PVL-02 product-bound chain, edge cases, threshold inversions and the Gaussian/common-scale transfer independently re-derived and found correct; printed-versus-derived boundary correctly drawn                                                     |
| H.4 conflicts                                                               | **`GO`** — both confirmed on page images; classifications correct; exclusion from the PVL-01/02 basis adequate; no RFC rule 5 adjudication needed for SR-B; S-H2 adds a further Dunn-example inconsistency to be recorded before any numerical reuse                               |
| `SR-B` source-supportable disposition                                       | **`CLOSED` as a source-result candidate**, for the source-acquisition obstacle only, under the H.3 narrowed PVL-02 condition; category-consistent with the commission (narrowing with full pinpoints, no named source gap); not formal hold acceptance                             |
| Ledger 5 / 0 / 9, overall `INPUT_INCOMPLETE`, `NARROW`, PVL-01/02 `R3-CAND` | correct; precedence applied correctly; thirteen other dispositions carried unchanged (arithmetic checked, content not reviewed)                                                                                                                                                    |
| Independence — context                                                      | `ESTABLISHED` (Section 12)                                                                                                                                                                                                                                                         |
| Independence — model level (RFC rule 2) for Part H                          | testimony-supported: reviewer model `claude-fable-5-1` recorded from the session service; author side OpenAI-assisted per Part H's own statement; the two are different providers on ordinary accountable testimony; steward determination pending; historical `PENDING` preserved |
| Formal hold acceptance                                                      | `NOT PERFORMED`; not authorized by this record                                                                                                                                                                                                                                     |

`GO` means only that, at exact head `f6d39534…`, Part H's source statements are
accurate to the two originals, its derivations are correct and correctly labelled as
derivations, its conflicts are real and correctly quarantined, and its proposed SR-B
disposition and counts are consistent with the commission. It does not close SR-B
formally, approve PR #196 or #198 for merge, cover the other thirty-three originals or
the other thirteen dispositions, reconsider the `NARROW` programme disposition, open
public discussion, adopt any procedure or output contract, adopt any R4 method,
certify any numerical implementation or table value, or authorize a release.

## 12. Independence evidence and its limits

Kept separate from the content verdict.

- **Established: separate context and non-involvement.** This session was created
  2026-09-08T00:22:00Z from a fresh clone, more than fourteen hours after the Part H
  commit (2026-09-07T10:06:58Z), with no access to any authoring session's context. It
  authored none of Parts A–H, the commission, the continuation record, or any prior
  review record; it read them only from the pushed Git objects. The user's instruction
  to review PR #198 is the only input it received about the target.
- **Established: reviewer-side model identifier.** `claude-fable-5-1` (configured and
  last-served), read from the session-management service during this pass; this is
  session testimony from that service, not provider-side telemetry. No exact-build log
  was requested, consistent with H.5.
- **Recorded: author-side provenance.** Part H states it was produced by "the
  continuing OpenAI-assisted investigator". That is first-hand author testimony recorded
  in the result; it cannot be proved or disproved from Git objects, and this record
  neither invalidates it for that reason nor presents it as verified. On that ordinary
  accountable basis the reviewer and author sides are different model providers, which
  is what RFC rule 2 asks for; whether that satisfies the project's criterion for Part
  H is the steward's determination, as it was for the D–F pass (Decision B), and it is
  left pending here. Decision B itself is scoped to the D–F six-source pass and is not
  applied to Part H; the historical `PENDING` entries in earlier records are not
  rewritten.
- **Human responsibility.** This text was produced in an LLM-assisted review session at
  the user's instruction; accountable human responsibility for commissioning and acting
  on it rests with the steward. No human authorship of this text is claimed.

## 13. Non-promotions and remaining acceptance steps

- Formal acceptance of SR-B as `CLOSED` for the source-acquisition obstacle, through
  the existing hold process, is the steward's decision and is not performed here. The
  steward's model-level independence determination for Part H (Section 12) is likewise
  pending.
- S-H1 and S-H2 are for a successor increment or the continuation record; neither
  requires moving the reviewed head. S-H2 must be in the conflict record before any
  numerical reuse of Dunn's Section 5 example (R4 lane).
- N-H4 (catalogue wording of the PVL-02 condition) belongs to a future catalogue
  revision under its own process, not to this commission.
- SR-A, SR-D, SR-E, SR-F, SR-H, SR-I, SR-J, RSM-01, RSM-02 work, N-D4 and the R4
  source gaps remain open exactly as D.5, G.3 and H.4 state. SR-K/SR-G acceptance
  remains a separate question.
- Merge decisions on PRs #196 and #198 and on this review PR are the steward's; this
  record authorizes none.
- This record is a review input only; it is not an authoritative artifact. No source
  PDF, page image or text extraction is committed with it.

## Public-artifact self-check

- [x] Only the public repository at the fixed head, parent and base, the live PR
      metadata (read at start and end), the pinned commission, the fixed semantic
      result, the continuation record at `e048cc06…`, the PR #197 record, and the two
      supplied originals were used; no private repository, work item, or product
      implementation was read.
- [x] This file is the only change in the review commit; the reviewed result, both
      commissions, the continuation record, the preserved reviews, `main` and every
      authoritative artifact are unchanged; no branch was renamed, deleted or
      force-pushed; the reviewed head was not moved.
- [x] Attribution is role-based. Material process provenance (LLM-assisted reviewer
      session, reviewer model identifier, environment, date, hashes, reused versus
      re-run checks, author-side testimony as testimony) is disclosed; no unsupported
      human authorship or non-involvement is implied.
- [x] Source statements, investigator inference, reviewer inference and reviewer
      recomputation, findings, the content verdict, the independence status and the
      acceptance status are kept separate.
- [x] No merge, hold update, Issue change, discussion opening, method adoption,
      formal acceptance, ratification, or release was performed, and none is
      authorized by this record.

RELEASE 3 PART H INDEPENDENT PRIMARY-SOURCE REVIEW COMPLETE - CONTENT GO AT f6d39534 - SR-B CLOSED SOURCE-RESULT CANDIDATE SUPPORTED UNDER THE H.3 NARROWED PVL-02 CONDITION - 0 BLOCKER, 2 SHOULD-FIX, 5 NICE-TO-HAVE - MODEL-LEVEL INDEPENDENCE TESTIMONY-SUPPORTED, STEWARD DETERMINATION PENDING, HISTORICAL PENDING PRESERVED - FORMAL ACCEPTANCE NOT PERFORMED - NOT MERGE APPROVAL - NOT HOLD CLOSURE - NOT PROTOCOL ADOPTION
