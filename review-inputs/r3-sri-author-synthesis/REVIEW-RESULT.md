# Release 3 Semantic Source Acquisition — Independent Exact-Head Primary-Source Review of the SR-I Author Synthesis (Part R)

**Status: informative independent review result; non-normative; not adopted.** This
record is the separate-context independent exact-head primary-source review of Part R
of the Release 3 semantic source-acquisition result (pull request #228), executed under
the review handoff written in Part R Section R.8. It selects no procedure, Contract,
identifier, schema, Public Check, implementation, or release outcome; it does not open
public discussion, change the fixed semantic result, adopt its catalogue, accept any
hold, or authorize implementation; and it merges nothing. Attribution is role-based
only.

**Content verdict: `GO`** (Section 13), with zero `BLOCKER`, zero `SHOULD-FIX`, and four
`NICE-TO-HAVE` observations. All six author precision findings in Part R Section R.5
are **confirmed against the original page images**. S-1 to S-3 of pull request #226 are
faithfully addressed as proposed narrowings. The bounded, source-completion-only SR-I
`CLOSED` proposal is **source-supportable**, conditional on the steward accepting
S-1 to S-3 as recorded narrowings rather than as unresolved conflicts. The current
6/2/6 ledger and the conditional 7/1/6 ledger are both arithmetically correct against
Part Q. This content verdict is **not** steward acceptance: SR-I remains `PARTIAL`,
overall `INPUT_INCOMPLETE`, `SOURCE_SET_READY=false`, `NARROW`, the fixed
`R3-CAND`/`RES-ONLY` classifications, every other hold disposition, and the separate R4
state are preserved and untouched by this record.

## 1. Review identity

| Field                       | Value                                                                                                                                                                                                                                                                                               |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository                  | `licklider-ai/nomue-protocol` (public)                                                                                                                                                                                                                                                              |
| Reviewed pull request       | #228 (draft; head branch `research/r3-sri-author-synthesis-20260909`; base `research/r3-srf-acceptance-20260908`)                                                                                                                                                                                   |
| Reviewed exact head         | `3a8bc0d86718a2cf47ce12089a9030a02e41a297`                                                                                                                                                                                                                                                          |
| Head tree                   | `a7ca249511be2bd84dd9135d99f63428db58cfb6`                                                                                                                                                                                                                                                          |
| Sole parent                 | `7cf5a5d0a14446fce0a67d0850793bbd4e117d67` (Part Q head; tree `f806edd99e94adbc9f12193ea52ec3a08611da20`; its own sole parent `c6ba9c923d142e0dacbb62ea20009cbd0ecb34c5`)                                                                                                                           |
| Reviewed result path        | `governance/drafts/release-3-preparation/semantic-source-acquisition-result.md`                                                                                                                                                                                                                     |
| Reviewed result blob        | `6c4afc4363a129e707e777ebccea2a2034d74290` (417005 bytes; SHA-256 `52bf464832f01bcfd3f96fe0ea922fef136d0ea849ec14158008b48fcd7f44b0`; 4226 lines)                                                                                                                                                   |
| Parent result blob          | `608cd7b04d2d34accb209060ee9163b39210f4f9` (389970 bytes; SHA-256 `48adf4a0f94fd2c0d2fc509aef1a579feb8651d339135c021975093578621f32`; 3910 lines)                                                                                                                                                   |
| Change set parent → head    | 1 path, +316/−0; the 389970-byte Parts A–Q prefix is byte-identical                                                                                                                                                                                                                                 |
| Operative commission blob   | `3c7ddcc696f0c284213f7efe0da68e747bc238d7` at `governance/drafts/release-3-preparation/semantic-source-acquisition-commission.md` (present unchanged at the head)                                                                                                                                   |
| Fixed semantic input        | commit `7bd9c5ab854777c3e99e624d9d2ed62731228852`; result blob `8f21526040924b891f64724c2d0fde9ea94eff92` (present at that commit and, unchanged, at the reviewed head)                                                                                                                             |
| Reused independent record   | pull request #226 at commit `a3e1c735b7878be071dc7268c63c6f4bada25a9a` (sole parent `7cf5a5d0…`; tree `d5f33ab36b764843bb651847389ce2e929214573`); `review-inputs/r3-sri-primary-investigation/REVIEW-RESULT.md` blob `3520d2293bbbf855e07fee150953cc7709d6349f` (81005 bytes; SHA-256 `d36cbc12…`) |
| Reused script identity      | `review-inputs/r3-sri-primary-investigation/reproduce-sr-i.py` blob `19d7d172f916857fbd7ab97b2f9809c7f8bd2876` (15752 bytes; SHA-256 `28958715…`); not executed here                                                                                                                                |
| Live state at review start  | `origin/main` at `cd217f88238a2ecc57b72f5835a813d92270f5ad`; `research/r3-sri-author-synthesis-20260909` at `3a8bc0d8…`; `research/r3-srf-acceptance-20260908` at `7cf5a5d0…`; `review/r3-sri-primary-investigation-20260908` at `a3e1c735…`                                                        |
| Review date                 | 2026-09-09 (00:31–01:00 UTC approximately)                                                                                                                                                                                                                                                          |
| Reviewer role               | separate-context independent exact-head primary-source reviewer for Part R                                                                                                                                                                                                                          |
| Review branch               | `review/r3-sri-author-synthesis-20260909`, created from the reviewed head as sole parent (name confirmed unused on the remote before creation)                                                                                                                                                      |
| Files added by this review  | this file only                                                                                                                                                                                                                                                                                      |
| Files changed               | none                                                                                                                                                                                                                                                                                                |
| Comment on the pull request | none posted                                                                                                                                                                                                                                                                                         |

### 1.1 Identity gate

Re-derived from fetched Git objects after a fresh fetch of `main`, `refs/pull/228/head`,
`refs/pull/226/head`, and the fixed head, with the target fixed in a detached checkout.

| Check                                | Expected                                  | Observed                                                                                  | Result |
| ------------------------------------ | ----------------------------------------- | ----------------------------------------------------------------------------------------- | ------ |
| Head object                          | commit `3a8bc0d8…`                        | `git cat-file -t` → commit; `git cat-file -p` → tree `a7ca2495…`, one `parent` line       | match  |
| Sole parent                          | `7cf5a5d0…`                               | `git rev-list --parents -n1` → exactly one parent, `7cf5a5d0…`                            | match  |
| Parent tree / parent's parent        | `f806edd9…` / `c6ba9c92…`                 | re-derived from `7cf5a5d0…`                                                               | match  |
| Result blob at head                  | `6c4afc43…`                               | `git rev-parse 3a8bc0d8…:<result path>` → `6c4afc43…`                                     | match  |
| Result bytes / SHA-256               | 417005 / `52bf4648…`                      | `wc -c` and `sha256sum` on `git cat-file -p`                                              | match  |
| Parent result blob / bytes / SHA-256 | `608cd7b0…` / 389970 / `48adf4a0…`        | same derivation on `7cf5a5d0…`                                                            | match  |
| Parts A–Q prefix                     | first 389970 bytes identical              | `cmp -n 389970` → identical                                                               | match  |
| Change set                           | result file only, +316                    | `git diff --stat 7cf5a5d0… 3a8bc0d8…` → one path, 316 insertions, 0 deletions             | match  |
| Commission blob at head              | `3c7ddcc6…`                               | present at the commission path in `git ls-tree -r 3a8bc0d8…`                              | match  |
| Semantic input blob                  | `8f215260…` at `7bd9c5ab…` and at head    | present at the semantic-result path in both trees                                         | match  |
| PR #226 head / parent / tree         | `a3e1c735…` / `7cf5a5d0…` / `d5f33ab3…`   | re-derived from `refs/pull/226/head`                                                      | match  |
| PR #226 record and script blobs      | `3520d229…` (81005) / `19d7d172…` (15752) | `git rev-parse`, `git cat-file -s`, `sha256sum` → as stated in R.1                        | match  |
| Pull-request body identity block     | head, parent, tree, blob, bytes, SHA-256  | every value in the #228 body equals the re-derived value                                  | match  |
| Pull-request state                   | open draft, not merged                    | `state: open`, `draft: true`, `merged: false`, `mergeable_state: clean`, 1 commit, 1 file | match  |
| Live author head before this commit  | `3a8bc0d8…`                               | `git ls-remote origin refs/heads/research/r3-sri-author-synthesis-20260909` → `3a8bc0d8…` | match  |

`STALE_HEAD` does not apply: the live head did not move between review start and the
review commit (re-checked immediately before committing; Section 12).

## 2. Independence, context basis, and reading order

**Separate context.** This review was performed in a work session created fresh on
2026-09-09 (00:31 UTC) from a clean clone. The reviewer did not author Part R, did not
author or execute pull request #226, and did not participate in any earlier pass,
drafting, supply, or review recorded in the result blob. Nothing in this record is
carried over from reviewer recall of the documents: every identity, hash, page count,
table cell, and formula below was re-derived during this session from Git objects, from
the three attached PDFs, or from the candidate text.

**Model/context basis (disclosed, as R.8 requires; no build log demanded or claimed).**
The session-description service reports configured model `claude-fable-5-1` and
last-served model `claude-fable-5-1`. Pull request #226 Section 2 records the same
service-reported model for its investigator, and Part R R.1 records an OpenAI-assisted
author. Separate-context independence from both Part R and PR #226 is therefore
claimed; same-model-family independence from PR #226 is **not** claimed. The
scoped steward determination recorded for SR-F does not automatically cover SR-I, as
Part R itself notes; that separate-model question stays a steward determination on
ordinary provenance evidence and is not decided here.

**Reading order (disclosed exactly).**

1. `AGENTS.md`, `CHARTER.md`, `AUTHORITY.md`, the head of
   `authority/authority-manifest.yaml`, the head and namespace list of
   `registries/requirements.yaml`, `governance/ID-POLICY.md`, `governance/RFC.md`.
   No directory-local `AGENTS.md` exists for `review-inputs/` or `governance/`.
2. The #228 body and the Git identity gate (Section 1.1).
3. **Part R itself, in full** (the +316-line diff), as the object under review. This
   review is therefore non-blind to the author's six precision findings and to the
   author's characterization of PR #226 before the originals were opened.
4. PDF identity gate (Section 3). The commission blob; the fixed semantic input's
   Sections 8.5 (HET-01/02/03 rows), 9 (Games–Howell row), 2.2 (SRC-20/21), and 17
   (SR-I row); one earlier review record for format only.
5. **Direct page-image inspection before PR #226's body.** Page images were rendered
   (150 dpi; 300 dpi crops of Tamhane Table 3, the p. 476 generator sentence, and the
   Dunnett p. 800 identity) and read in this order: Tamhane pp. 474, 477, 476; Dunnett
   pp. 800, 797; Dunnett pp. 796, 798, 799; Games–Howell pp. 118, 121, 122, 123;
   Tamhane pp. 473, 475. Text extraction was read for Games–Howell pp. 116, 117, 120
   and Tamhane pp. 471, 472. The six-finding checks in Section 5 were completed from
   these images **before** step 6.
6. Only then was PR #226's record read in full (Sections 1–18), followed by Part Q
   Section Q.4 (ledger), the D.2/N.3 custody rows, and the parent's Part H rows cited
   by R.4.

PR #226 Section 18 had asked the author to read the PDFs before its Sections 4–14;
Part R R.1 discloses the author did the opposite. For this review the object under
review (Part R) necessarily came first; the originals were then inspected before the
reused independent record, so the six-finding verdicts in Section 5 were formed from
page images and Part R, not from PR #226's transcriptions. Nothing was read from
private repositories.

## 3. Source identity gate (R.2)

The three attached files were hashed, sized, and page-counted with PyMuPDF 1.28.2 in this
session, then compared with R.2 and with the parent's stored D.2 (suppliers 27, 28) and
N.3 (supplier 34) rows.

| Supplier | File                  | Bytes (R.2 / observed) | PDF pages (R.2 / observed) | SHA-256 (observed; equals R.2, D.2/N.3, and PR #226 §3.1)          | Result |
| -------- | --------------------- | ---------------------- | -------------------------- | ------------------------------------------------------------------ | ------ |
| 34       | `34_Games_1976.pdf`   | 994128 / 994128        | 13 / 13                    | `eee42d00cdd66f9f24e334c2db503e17233fc73b6a87ed5f85c6868f17a2c021` | match  |
| 27       | `27_Tamhane_1979.pdf` | 1759491 / 1759491      | 11 / 11                    | `f6183845a373361b8840040ecd9f0afce59cb8cb5170abf44c551376cd414bf0` | match  |
| 28       | `28_Dunnett_1980.pdf` | 726755 / 726755        | 6 / 6                      | `ac862081c93be6ce38ba0dc17b811cb3dd96227cf6ba50f66a7c35715a2870a0` | match  |

Page mapping confirmed from the images: Games–Howell PDF 1 = printed p. 113 (no cover);
Tamhane PDF 1 is a publisher cover, PDF 2 = p. 471; Dunnett PDF 1 is a publisher cover,
PDF 2 = p. 796 ("Pairwise Multiple Comparisons in the Unequal Variance Case", JASA
December 1980, Volume 75, Number 372, Applications Section). Supplier 28 is the
pp. 796–800 paper, not the pp. 789–795 paper, which p. 796 cites as "the previous
article (Dunnett 1980)" and p. 800 lists separately. No `SOURCE_ACCESS_INCOMPLETE`
partition is needed. R.2's statement that these are repeat checks of received
artifacts (42 numbered originals plus one unnumbered corrigendum, 43 artifacts) is
consistent with the parent's Part N/P accounting and is reused, not recounted.

No PDF, page image, crop, or text extraction is committed; all were kept in a
session-local scratch directory.

## 4. Evidence basis: direct versus reused

| Evidence                                                                                                                                                                      | Basis in this review                                                                                                                                               |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Git identities (Section 1.1)                                                                                                                                                  | **direct**, re-derived                                                                                                                                             |
| PDF identities (Section 3)                                                                                                                                                    | **direct**, re-hashed and re-paged                                                                                                                                 |
| Six R.5 precision findings (Section 5)                                                                                                                                        | **direct**, page images (300 dpi crops where cells or symbols are small)                                                                                           |
| R.3 constructions, df, critical laws (Section 6)                                                                                                                              | **direct**, page images of Tamhane p. 473, Dunnett p. 796, Games–Howell pp. 117, 123                                                                               |
| R.4 counts, ranges, and arithmetic (Section 7)                                                                                                                                | **direct**, transcribed from the table images and recomputed by hand                                                                                               |
| R.6 df algebra and the ν_i = 6, ν_j = 12, V = 1 example (Section 8)                                                                                                           | **direct**, exact rational arithmetic                                                                                                                              |
| PR #226's broad page-by-page source review (its Sections 4–6), catalogue mapping (10), and entry impact (11)                                                                  | **reused with attribution**, read after the direct checks; not re-derived line by line                                                                             |
| PR #226's quadrature, table reproductions, and 40 000-draw Monte Carlo spot check (its Section 12)                                                                            | **reused with attribution**; not rerun; not treated as certified error bounds                                                                                      |
| PR #226's N-1 printed doubts (GH 4.69; reference years; seven versus five c values)                                                                                           | GH p. 123 "4.69" and Dunnett p. 799 seven c values **viewed directly**; the Tamhane reference-year items reused from PR #226 and Part R, not re-verified in images |
| Part H rows B-5/B-6 (Šidák common-scale boundary) cited by R.4                                                                                                                | **reused** from the parent result; not re-inspected against Šidák (1967)                                                                                           |
| Sources cited but not in the packet (Tamhane 1977, Keselman–Rogan 1978, Dunnett 1980a, Hochberg 1975, Ury–Wiggins 1971, Miller 1966, Hahn–Hendrickson 1971, Stoline–Ury 1979) | **not inspected**; Section 11 states which claims depend on them                                                                                                   |

## 5. The six author precision findings, checked against the page images

Each finding is stated as Part R states it, then the printed original as read here, then
the status. "PR #226" cells quote the reused record's text as read in step 6.

| #   | Part R finding (R.5)                                                                                                                                                                            | Original, as read from the page image                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | PR #226 text it corrects                                                                                                                                           | Status        |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| 1   | T2′ Table 3 rows are .947–.968 (k = 4) and .942–.973 (k = 8); two k = 4 cells and one k = 8 cell are below .95; none is asterisked                                                              | Tamhane p. 477, Table 3, T2′ rows (300 dpi crop): k = 4: .955 .956 .953 .954 .963 **.947** .968 **.948**; k = 8: .966 .963 .965 **.942** .966 .963 .966 .973. No asterisk on any T2′ cell. Footnote: asterisk marks achieved level below .95 at 10 percent significance (text p. 477: "confidence levels < .942")                                                                                                                                                                                                                 | §5.4 "T2′ ranges .947–.973 (k = 4)" — the k = 4 maximum is .968, not .973; §11 "conservative in every simulated cell (… Tamhane, T2′)" — three cells are below .95 | **CONFIRMED** |
| 2   | The four p. 474 df-replacement conditions use non-strict comparisons throughout                                                                                                                 | Tamhane p. 474 §3.2, printed with ≤ in every position: 1. 9/10 ≤ n_i/n_j ≤ 10/9; 2. 9/10 ≤ (s_i²/n_i)/(s_j²/n_j) ≤ 10/9; 3. 4/5 ≤ n_i/n_j ≤ 5/4 and 1/2 ≤ (s_i²/n_i)/(s_j²/n_j) ≤ 2; 4. 2/3 ≤ n_i/n_j ≤ 3/2 and 3/4 ≤ (s_i²/n_i)/(s_j²/n_j) ≤ 4/3                                                                                                                                                                                                                                                                                 | §5.2 transcribes condition 2 with strict "<" at both ends and condition 4's upper ratio bound as "< 4/3"                                                           | **CONFIRMED** |
| 3   | Relative exceedances reach 84 % (GH .092) and 68 % (coverage .916); the no-proof statement should be limited to the finite-df procedures under investigation                                    | Games–Howell p. 121, Table III, NC 3 (11, 8, 4, 3), σ² = 1, 3, 5, 7, BF column: **.092** (2000 experiments). Tamhane p. 477, GH k = 8 configuration 4: **.916\***. (.092 − .05)/.05 = 0.84; (.084 − .05)/.05 = 0.68. Tamhane p. 476 also prints exact distributional work for other procedures (the H1 integral (5.2); IMSL "exact" t and F points), and Table 2's \|m\| column serves GT2 (p. 474)                                                                                                                               | §8.1 "roughly 10–25 % relative at k = 4, up to roughly 25 % at k = 8 or n = 3"; outcome paragraph "exceeding the nominal familywise level by a small amount"       | **CONFIRMED** |
| 4   | Dunnett p. 800: the identity makes 1/ν̂ smaller (ν̂ larger) than the reciprocal-df comparator; the printed "direction of smaller df" is a source inconsistency; the plotted direction is retained | p. 800 (300 dpi crop): "1/ν̂ = 1/ν′ − [2V/(V+1)²]·(1/ν̄) where ν̄ is the harmonic mean of ν_i and ν_j. This places the point ν̂ to the left of ν′, which is in the direction of smaller df and hence a more liberal value of SR." p. 799 figure: abscissa ν⁻¹, labelled ∞ at the left end and 1 at the right; ν̂ is drawn leftmost, then ν_i, ν′, ν̄, ν\*, ν_j. Left on this axis is **larger** df; a larger df gives a smaller SR point, which is the "more liberal" clause. Only "smaller df" contradicts the identity and the figure | §6.5 quotes the sentence without flagging the contradiction; §12.5 and N-2 address only the ν′ scale                                                               | **CONFIRMED** |
| 5   | Dunnett p. 797 describes GH's joint confidence coefficient as sometimes exceeding 1 − α while referring to the flaw Tamhane identified; the sign is not to be silently reversed                 | p. 797, first column: "the GH procedure having shorter confidence intervals than those with the T2 procedure but with a joint confidence coefficient that sometimes exceeded 1 − α"; same column, later: "Since Tamhane has identified a higher-than-nominal error rate as a possible flaw in the use of the GH procedure". Tamhane p. 477 Table 3 and Dunnett Table 1 both show GH **shortfall** in coverage, not excess                                                                                                         | Not recorded in PR #226                                                                                                                                            | **CONFIRMED** |
| 6   | Tamhane p. 476 prints the even-df chi-square generator as −Σ_{i=1}^{ν/2} log_e U_i with no factor 2; that expression has mean ν/2                                                               | p. 476 §5.3 (300 dpi crop): "the chi-squared rv's were generated by using the relation (for ν even) χ²_ν ∼ −Σ_{i=1}^{ν/2} log_e U_i where the U_i are independent uniform [0, 1] rv's." Since −log U ∼ Exp(1) with mean 1, the printed sum has mean ν/2; 2·(−Σ) is the χ²_ν variate                                                                                                                                                                                                                                               | §5.4 "χ² by −Σ log U for even ν" transcribed without comment                                                                                                       | **CONFIRMED** |

Part R's handling of each is also appropriate: no erratum is asserted, the p. 800
plotted direction and the p. 797 wording are preserved as discrepancies, and finding 6
is explicitly not treated as evidence of what the historical program executed.

## 6. R.3 constructions and claim-to-source mapping

Checked against Tamhane p. 473, Dunnett p. 796 (1.2)–(1.8), Games–Howell pp. 116–117
and 122–123.

| R.3 statement                                                                                                            | Verification                                                                                                                                                                                                                                                                                                                                                        | Status                                            |
| ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| Model: independent normal groups, unknown means, unequal variances and sizes; variance estimate on specified ν_i df      | Tamhane p. 471 ("unbiased estimate of σ_i² based on ν_i df that is independent of X̄_i; for the most part … ν_i = n_i − 1"); Dunnett p. 796 (same)                                                                                                                                                                                                                   | supported                                         |
| GH: statistic = difference / SE_ij; half-width q(α, k, ν_W)·SE_ij/√2; Games–Howell "Method BF"; not Tamhane's BF         | Games–Howell p. 117 ("Method BF used the v statistic and Welch df … q(α, K, ν)/2^{1/2}"); p. 123 worked pair; Tamhane p. 473 GH display; Dunnett (1.3)–(1.4). Tamhane p. 473 "BF" is Brown–Forsythe (1974)                                                                                                                                                          | supported                                         |
| T2: half-width t_upper(u, ν_W)·SE_ij; Dunnett's two-sided γ = 2 × Tamhane's upper-tail γ                                 | Tamhane p. 473: t_{ν̂_ij,γ}, "upper γ point", γ = ½{1 − (1 − α)^{1/k′}}; Dunnett (1.7): "two-sided γ point", γ = 1 − (1 − α)^{1/k\*}                                                                                                                                                                                                                                 | supported                                         |
| T2′: Welch df replaced by n_i + n_j − 2 under the p. 474 conditions; 1979 Table 3 evidence belongs to T2′                | p. 474 §3.2; p. 474 "we drop original procedures UW, T2, and BF from further consideration"; p. 475 glossary; p. 477 Table 3 row label "T2′"                                                                                                                                                                                                                        | supported                                         |
| T3: SMM upper-α point for m coordinates at ν_W df, times SE_ij; one shared chi-square scale                              | Dunnett (1.8): "α point of the Studentized maximum modulus distribution of k\* uncorrelated normal variates with ν̂_ij df". The **shared-scale** clause is the standard SMM definition (Miller 1966 is cited by Tamhane p. 474; Dunnett p. 797 matches his program to Hahn–Hendrickson 1971 and Stoline–Ury 1979 tables); it is not a sentence of the assigned texts | supported; shared-scale clause is inference (N-3) |
| C: half-width [a_i q(α,k,ν_i) + a_j q(α,k,ν_j)]·SE_ij/[(a_i + a_j)√2]; average the range points, not the df or variances | Dunnett (1.5)–(1.6) verbatim                                                                                                                                                                                                                                                                                                                                        | supported                                         |
| C's df boundary: integer in the ordinary-sample simulations; the general formula does not require integer df             | p. 796 model with general ν_i; p. 797 "integral df needed to apply the Cochran formula (1.6)" refers to the simulation with ν_i = n_i − 1; the implied single df ν\* (p. 800) is descriptive                                                                                                                                                                        | supported                                         |
| GH′ excluded; Tamhane drops it as substantially liberal                                                                  | p. 474: "GH′ was tried but turned out to be substantially radical. Therefore, we retained GH, which itself is somewhat radical."                                                                                                                                                                                                                                    | supported                                         |
| Tamhane p. 472 discusses the contrast extension through Hochberg (1975) Lemma 3.1, outside the all-pairs claims          | p. 472 §2.1.2: extension "by using Lemma 3.1 of Hochberg (1975). (This extension is not in the original articles of Ury and Wiggins and Games and Howell.)"                                                                                                                                                                                                         | supported                                         |
| No new catalogue ID is minted for a primed variant or for the T3/C split                                                 | Part R text; the fixed semantic input is unchanged (blob `8f215260…`)                                                                                                                                                                                                                                                                                               | confirmed                                         |

## 7. R.4 evidence strength and simulation boundaries

| R.4 statement                                                                                                                 | Verification from the images                                                                                                                                                                                                                                                                         | Status    |
| ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Games–Howell: four groups; four variance patterns; moderate and small n sets; 1000 per cell, 2000 in marked rows              | pp. 116–117 design (K = 4; VC 1–4; 1,000 experiments per VC × NC cell); Tables I and III footnotes a/b (1000/2000); p. 120 "An additional 1,000 experiments were run under the NC 3 condition"                                                                                                       | supported |
| Table I BF range .041–.071; p. 118 CI .0545–.0631 for the mean FWI                                                            | Table I BF column: .062 .065 .055 .042 .060 .041 .051 .071 .060 .064 .064 → min .041, max .071; p. 118 sentence verbatim                                                                                                                                                                             | supported |
| Table III includes .092 at (11, 8, 4, 3), σ² = 1, 3, 5, 7                                                                     | Table III NC 3 first row, BF .092 (footnote b)                                                                                                                                                                                                                                                       | supported |
| Tamhane: k = 4 or 8; eight configurations each; n_i 7–13; 1000 experiments; .05 printed                                       | p. 475 §5.1; p. 476 Table 1 (n from 7 to 13) and §5.3 ("1,000 experiments were run")                                                                                                                                                                                                                 | supported |
| GH coverage reaches .936 (k = 4) and .916 (k = 8)                                                                             | Table 3 GH rows: k = 4 minimum .936\* (configuration 8); k = 8 minimum .916\* (configuration 4)                                                                                                                                                                                                      | supported |
| T2′ ranges and below-.95 counts                                                                                               | Section 5, finding 1                                                                                                                                                                                                                                                                                 | supported |
| Dunnett: three base size configurations; five tabulated c; four scales including ∞; 10 000 draws per set, reused across sets  | p. 798 Table 1 header (Simulations I–III; c = .5, 1.0, 2.0, 4.0, 10.0; ×1, ×2, ×8, ×∞); p. 799 "N = 10,000 simulations for each of the three sets"; "the same original sets of random normal deviates … and random uniform variates … were used"                                                     | supported |
| Table 1 GH includes .0622 at k = 8; all T2/T3 rates below .05; C finite-df rates below .05; Simulation II c = 1 ×∞ cell .0503 | Table 1: GH Simulation III c = .5 ×1 = .0622; T2 maximum .0425, T3 maximum .0438; C: all ×1/×2/×8 cells ≤ .0469; Simulation II c = 1.0 ×∞ = .0503 (GH ×∞ in the same cell is also .0503, the two procedures coinciding at infinite df)                                                               | supported |
| Coverage versus error-rate reading; .916 ↔ .084; 4.2 points / 84 %; 3.4 points / 68 %                                         | Recomputed exactly                                                                                                                                                                                                                                                                                   | supported |
| p. 476 Table 2 SMM constants are for GT2                                                                                      | p. 474: GT2 uses \|m\|_{k′,ν,α}; p. 476 "The \|m\| values needed for GT2"                                                                                                                                                                                                                            | supported |
| Dunnett pp. 799–800 asserts a known-variance GH/C bound by reference to his other 1980 paper; that dependency unverified here | p. 799 §4.2 "the GH procedure is known to have error rate ≤ α, based on the results of the preceding article (Dunnett 1980). However, this is not necessarily true for finite df."; p. 800 §4.3 "the C procedure can also claim to achieve error rates ≤ α in the infinite df (known variance) case" | supported |
| The Part H common-scale Šidák inequality is not a proof for pair-specific random standard errors and random Welch df          | Consistent with the parent's Part H rows B-5/B-6 (reused) and PR #226 §8.3; Dunnett p. 797 itself says of T3 "It remains to be determined whether it is actually conservative"                                                                                                                       | supported |

Additional printed observations made here and not in Part R or PR #226 N-1 are recorded
as NICE-TO-HAVE items in Section 13; none alters an R.4 number.

## 8. R.6 author inferences and arithmetic

- **Location invariance.** Subtracting the true difference removes the means from each
  interval's noncoverage event for all four constructions (the statistic depends on the
  data only through ȳ_i − ȳ_j − (μ_i − μ_j) and the s_i²). Part R correctly labels this
  author reasoning agreeing with PR #226 I-1, not a sourced theorem, and correctly
  declines to convert a simulated estimate into a proved bound.
- **df algebra.** With w = V/(V + 1) = a_i/(a_i + a_j) and h = 2/(1/ν_i + 1/ν_j):
  1/ν_W = w²/ν_i + (1 − w)²/ν_j and 1/ν′ = w/ν_i + (1 − w)/ν_j give
  1/ν′ − 1/ν_W = w(1 − w)(1/ν_i + 1/ν_j) = 2w(1 − w)/h, and 2w(1 − w) = 2V/(V + 1)².
  This reproduces Dunnett's printed identity exactly when 1/ν′ is the weighted average
  of the reciprocal df (the abscissa of the chord point in the p. 799 figure), which is
  the reading PR #226 §12.5 also reached numerically. Example ν_i = 6, ν_j = 12, V = 1:
  1/ν′ = 1/12 + 1/24 = 1/8 → ν′ = 8; 1/ν_W = 1/24 + 1/48 = 1/16 → ν_W = 16; harmonic
  mean ν̄ = 8 and 1/8 − (1/2)(1/8) = 1/16. Part R's example is exact.
- **Counts.** The three below-.95 T2′ cells (Section 5, finding 1) and the two relative
  excesses (Section 7) were recounted and recomputed here.
- **Semantic/numerical allocation.** The three fractional-df conventions Part R lists
  (Games–Howell p. 123 rounds 6.937 to 7; Tamhane p. 476 "Linear harmonic interpolation
  with respect to the df"; Dunnett p. 797 "quadratic interpolation on reciprocal df") are
  each printed as stated. The zero-variance illustration (Games–Howell p. 122, Table IV,
  s² = 0.000 for sample 3) is printed as stated; Part R's refusal to turn either the
  one-zero or the two-zero case into a rule is correct. The proposed lane ordering is a
  work-allocation proposal, not a decision, and is recorded as such.

## 9. S-1 to S-3, HET variant mapping, and the fixed classifications

| PR #226 finding | Part R response (R.5)                                                                                                                                                                                                                                                                              | Faithful? | Note                                                                                                                                                                                                                          |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| S-1 / HET-01    | Simulation-based approximate intervals; documented exceedances at stated configurations; no general finite-df level-α guarantee in the assigned texts; GH′ excluded; exceedances not all qualified as small; `R3-CAND` retained as an unselected candidate authorizing no guaranteed-FWER Contract | yes       | Part R strengthens S-1 by removing the "small amount" qualifier (Section 5, finding 3), which the page images support                                                                                                         |
| S-2 / HET-02    | T2 (Welch df) with Dunnett 1980b experiments; T2′ with Tamhane 1979 experiments; Tamhane 1977 as an attribution through the inspected texts; `RES-ONLY` kept; split is a reopen trigger, not a new ID                                                                                              | yes       | Tamhane p. 477 states "compare the performance of T2′ with that of T2 (see Table 1 of Tamhane 1977; T2 is referred to as the W procedure there)", which supports treating the unmodified-T2 1977 evidence as attribution only |
| S-3 / HET-03    | T3 (SMM at Welch df) and C (weighted range points at the two variance-estimate df) kept separate; width ordering depends on df and design; `RES-ONLY` kept; two descriptive variants under one entry                                                                                               | yes       | Dunnett p. 800: C "will result in longer confidence intervals than T3 for small df but shorter ones for large df"; Table 2 p. 798 shows both orderings                                                                        |

The fixed semantic input is unchanged (Section 1.1), so no classification token was
altered. Part R's recommendation to retain HET-01's `R3-CAND` label while withholding a
level-α guarantee and implementation approval is a recommendation only; PR #226 §15
item 2 (whether a candidate may carry that label with no control guarantee of any
strength) remains an open steward question that this review does not decide.

## 10. Disposition, ledgers, and the bounded `CLOSED` proposal

- **Ledger arithmetic.** Part Q Q.4 reads 6 `CLOSED` / 1 `PARTIAL` (SR-H) / 7
  `INPUT_INCOMPLETE` (including SR-I). Part R moves SR-I alone to `PARTIAL`, giving
  6/2/6; the conditional source-only SR-I `CLOSED` gives 7/1/6. Both are correct and
  neither is enacted. Overall `INPUT_INCOMPLETE` remains correct under the commission's
  precedence rule (no `NO_GO`; six `INPUT_INCOMPLETE`).
- **Is the bounded `CLOSED` proposal source-supportable?** The commission defines
  `CLOSED` as every decision-bearing source claim needed by the hold being directly
  supported with exact artifact identity and pinpoints, removing only the
  source-acquisition obstacle. For SR-I (HET-01/02/03; C-I1, C-I2): all assigned texts
  are in custody and identity-matched; every construction, df formula, critical law, and
  evidence type is pinned to printed pages by PR #226 and again by Part R, and re-located
  here; the three narrowings are recorded with pinpoints; the remaining printed
  discrepancies (Section 5, findings 4–6, and Section 13) are source-precision items
  that do not turn any assigned text back into a missing source and do not contradict a
  construction. On that definition the proposal is supportable, **conditional** on the
  steward accepting S-1 to S-3 as recorded narrowings. If the steward treats them as
  unresolved catalogue conflicts, `PARTIAL` with those named gaps is the correct
  disposition, exactly as PR #226 §14 and Part R R.7 both state.
- **What `CLOSED` would not mean.** It would not select Games–Howell, T2, T2′, T3, or C
  for Release 3; would not change `R3-CAND`/`RES-ONLY`; would not establish any
  level-α guarantee, numerical certification, or implementation approval; and would not
  alter `SOURCE_SET_READY=false`, `NARROW`, any `TRANSFER`, any `PENDING` item, or R4.
- **Steward acceptance is separate.** This record issues a content `GO`. Formal
  acceptance of the narrowings, the conditional ledger change, the HET-01 label
  question, and the separate-model determination for SR-I are steward decisions that
  remain open after this review.

## 11. Unverified scope and unread dependencies

| Item                                                                      | Status here                                                                      | Bearing                                                                                                                                        |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| PR #226 quadrature, table reproductions, and Monte Carlo spot check (§12) | reused by citation; not rerun                                                    | diagnostic only; no decision in Part R rests on them alone                                                                                     |
| Tamhane (1977)                                                            | not inspected                                                                    | needed only if HET-02's identity is to cite the 1977 definition or the unmodified-T2 simulation directly                                       |
| Keselman and Rogan (1978)                                                 | not inspected                                                                    | needed only if a proposal relies on Games–Howell attaining the nominal level (Tamhane p. 477 cites it as contrary evidence)                    |
| Dunnett (1980a), pp. 789–795 (SRC-08)                                     | not inspected in this review                                                     | needed before relying on the known-variance ≤ α pointer on Dunnett pp. 799–800; existing SRC-08 custody should be checked before reacquisition |
| Hochberg (1975) Lemma 3.1; Ury–Wiggins (1971); Pratt (1964)               | not inspected                                                                    | contrast extension and df-replacement provenance; outside the all-pairs claims and the unprimed identities                                     |
| Miller (1966); Hahn–Hendrickson (1971); Stoline–Ury (1979)                | not inspected                                                                    | SMM definition and tables (N-3); numerical lane                                                                                                |
| Šidák (1967)                                                              | not re-inspected; Part H rows reused                                             | conservativeness-by-construction boundary for T2/T3                                                                                            |
| Historical simulation programs (Tamhane 1979; Dunnett 1980b)              | not available                                                                    | finding 6 is a printed-expression observation only                                                                                             |
| Tamhane pp. 478–480 and Games–Howell pp. 113–115, 119, 124–125            | read from text extraction only (PR #226 also viewed p. 119 and p. 480 as images) | no Part R claim depends on a table cell on these pages                                                                                         |
| Full `pnpm check`, `pnpm test`, `pnpm typecheck`, `pnpm check:generated`  | not run (Section 12)                                                             | no authoritative, registry, schema, or generated file is touched                                                                               |

No additional primary source is required to complete this review or to support the
bounded `CLOSED` proposal. No new material source conflict was found; Section 14 gives
the conditional follow-up prompt for the optional lanes only.

## 12. Validation record

Run at the review head after adding this file, with dependencies installed by
`pnpm install --frozen-lockfile` in this session (the lockfile passed pnpm's
supply-chain check; the install resolved 387 packages).

| Check                                       | Result | Observed                                                                            |
| ------------------------------------------- | ------ | ----------------------------------------------------------------------------------- |
| `pnpm format:check`                         | pass   | "All matched files use Prettier code style!"                                        |
| `pnpm lint:markdown`                        | pass   | "Linting: 356 files … Summary: 0 issues in 0 files"                                 |
| `node --import tsx tooling/src/validate.ts` | pass   | "validate: OK - … code-path audits, and the snapshot manifest mechanism are clean." |
| `git diff --check` (staged)                 | pass   | no whitespace errors                                                                |
| Live author head re-check before commit     | match  | `refs/heads/research/r3-sri-author-synthesis-20260909` → `3a8bc0d8…`                |

Not run: `pnpm check` (full suite), `pnpm typecheck`, `pnpm test`, `pnpm check:generated`,
`reproduce-sr-i.py`. Continuous-integration state for pull request #228 is reported by
GitHub on that pull request and is not restated here.

## 13. Findings

### BLOCKER

None. Every fixed identity matches; every assigned source is in custody and
identity-matched; every one of the six author precision findings is confirmed on the
page images; no R.3 construction, R.4 number, or R.6 derivation is contradicted by the
originals; the fixed inputs, PR #226, and Parts A–Q are byte-preserved.

### SHOULD-FIX

None.

### NICE-TO-HAVE (author-side precision items for a later addendum; none blocks the content verdict)

- **N-1 (Tamhane Table 3 asterisk).** In the k = 4 GH row, configuration 6 prints
  `.940` with no asterisk, while `.941` (k = 4 configuration 3; k = 8 configuration 1)
  and the GT2 `.940` in the same configuration-6 column are asterisked. Under the
  footnote's criterion (one-sided 10 percent; text threshold "< .942") the GH `.940`
  should carry the flag. A printed inconsistency of the source; it does not affect any
  Part R count (Part R counts T2′ cells, not GH flags). Worth adding to the retained
  printed-doubt list beside PR #226 N-1.
- **N-2 (Dunnett p. 797 attribution).** The same p. 797 paragraph that finding 5
  addresses also says Tamhane (1979) "showed by computer simulation that it [T2] was
  actually conservative over the range … he considered in his simulations". Tamhane's
  1979 simulation is of T2′ (Part R R.3; Tamhane p. 474), and the unmodified-T2
  simulation is attributed by Tamhane p. 477 to Tamhane (1977) Table 1. Part R's S-2
  mapping is already correct; recording this second p. 797 imprecision beside finding 5
  would make the T2/T2′ evidence trail complete on the Dunnett side as well.
- **N-3 (R.3 T3 row).** "The SMM critical law uses one shared chi-square scale" is the
  standard definition of the Studentized maximum modulus and is consistent with the
  tables Dunnett p. 797 matches his program against, but it is not a sentence of the
  assigned texts, which say only "k\* uncorrelated normal variates with ν̂_ij df".
  Labelling that clause as an inference (with Miller 1966 / Hahn–Hendrickson 1971 as the
  unread definitional sources) would keep R.3's "bounded source result" column purely
  sourced.
- **N-4 (Games–Howell p. 120).** R.4 cites p. 120 for the design; the sentence that
  explains the 2000-experiment rows in Table III ("An additional 1,000 experiments were
  run under the NC 3 condition") and the paper's own attribution of the .092-class
  failures to n = 3 paired with n = 11 or 8 both sit on p. 120. Pinning that sentence
  would tie R.4's "marked pooled/additional rows" phrase to its source.

## 14. Determinations, verdict, and conditional follow-up

| Determination                                                                                            | Result                                                                                                                     |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Separate-context independence of this review from Part R and PR #226                                     | **satisfied** (same-model-family independence from PR #226 not claimed)                                                    |
| Fixed identities (head, parent, tree, blob, bytes, SHA-256, prefix, PR #226, commission, semantic input) | **all match**                                                                                                              |
| Source identities (suppliers 34/27/28: hash, bytes, pages)                                               | **all match**                                                                                                              |
| Six author precision findings                                                                            | **all CONFIRMED** on page images                                                                                           |
| R.3 equations and C's df boundary                                                                        | **supported** (N-3 labelling note)                                                                                         |
| R.4 counts, ranges, and arithmetic                                                                       | **supported**                                                                                                              |
| R.6 algebra and worked example                                                                           | **exact**                                                                                                                  |
| S-1 to S-3                                                                                               | **faithfully addressed** as proposed narrowings; not enacted                                                               |
| Bounded, source-completion-only SR-I `CLOSED`                                                            | **source-supportable, conditional** on steward acceptance of S-1 to S-3 as narrowings; otherwise `PARTIAL` with named gaps |
| 6/2/6 current and 7/1/6 conditional ledgers                                                              | **correct**; neither enacted                                                                                               |
| Overall `INPUT_INCOMPLETE`, `SOURCE_SET_READY=false`, `NARROW`, `TRANSFER`, R4, other holds              | **preserved**                                                                                                              |
| `R3-CAND` (HET-01), `RES-ONLY` (HET-02/03)                                                               | **unchanged**; HET-01 label question remains a steward question                                                            |
| Steward acceptance, hold acceptance, method adoption, discussion opening, publication, release           | **not performed**                                                                                                          |

**Content verdict: `GO`.** Part R conforms to the R.8 handoff for the scope it claims.
Recommended steward action, which this record does not perform: decide S-1 to S-3;
if accepted as narrowings, SR-I may be recorded as `CLOSED` for source completion only
(ledger 7/1/6), with the four NICE-TO-HAVE items above available for a later editorial
addendum. If the live head of `research/r3-sri-author-synthesis-20260909` moves before
that decision, this verdict lapses and a fresh identity gate is required.

**Conditional follow-up prompt.** No additional investigation is required for the
bounded `CLOSED` proposal. The prompt below applies only if the steward requires one of
the optional lanes.

```text
Role: primary-source investigator for an optional SR-I lane
(licklider-ai/nomue-protocol). Do not merge, accept a hold, adopt a method,
open public discussion, or release.

Fixed inputs (verify by Git object first): Part R head
3a8bc0d86718a2cf47ce12089a9030a02e41a297 (result blob
6c4afc4363a129e707e777ebccea2a2034d74290, 417005 bytes); PR #226 commit
a3e1c735b7878be071dc7268c63c6f4bada25a9a; this review record (pin its commit
and blob at the time of use); suppliers 34/27/28 with the R.2 hashes.

Lane A (only if HET-02's identity is to cite Tamhane 1977 directly):
acquire Tamhane (1977), Communications in Statistics A6(1):15-32; pin the
original T2 ("W") definition, its gamma, its df, and Table 1; state whether
the 1977 simulation is of unmodified T2 with Welch df.
Completion: T2 identity pinned to 1977 pages; any difference from Tamhane
1979 p. 473 and Dunnett 1980b (1.7) recorded with both pinpoints.

Lane B (only if a proposal relies on Games-Howell attaining the nominal
level): acquire Keselman and Rogan (1978), JASA 73:47-52; record its
design, its GH estimates, and whether any configuration overlaps
Games-Howell Table III or Tamhane Table 3. Completion: the contrary evidence
is pinned; the documented exceedances in the assigned texts are not erased.

Lane C (only if the known-variance GH/C bound on Dunnett pp. 799-800 is to
be relied on): check existing SRC-08 custody (Dunnett 1980, JASA 75:789-795)
before any reacquisition; pin the statement and its proof or simulation
basis; state whether it is a theorem or a simulation result. Completion: the
pointer is classified as proof or simulation with page pinpoints.

For every lane: separate source statement from inference; do not change the
fixed catalogue, Part R, PR #226, or any ledger; write an English record on a
fresh neutral review branch from the fixed head; run pnpm format:check,
pnpm lint:markdown, node --import tsx tooling/src/validate.ts, and
git diff --check; open a separate draft PR; do not merge.
```

## 15. Public-artifact self-check

- This file is the only path added; it is on a review branch whose sole parent is the
  reviewed head. Part R, Parts A–Q, PR #226 and its script, both commissions, the fixed
  semantic input, every registry, schema, specification, conformance artifact, reference
  code, and generated file are untouched. Nothing is merged; no hold is accepted; no
  procedure is adopted; no discussion is opened; nothing is published or released.
- No PDF, page image, crop, or full-text extraction is committed. Quotations from the
  originals are limited to the short passages needed to identify pinpoints.
- Branch and file names are neutral and role-based; no session mirror branch was used.
- Model/context basis is disclosed in Section 2 as service-reported information; no
  exact-build log is claimed or demanded.
- No identifier from another authority system is introduced; no Requirement ID,
  Contract identifier, catalogue ID, or Public Check is minted or implied.

RELEASE 3 SR-I AUTHOR-SYNTHESIS (PART R) INDEPENDENT REVIEW COMPLETE - CONTENT GO - SEPARATE-CONTEXT INDEPENDENCE SATISFIED - SIX PRECISION FINDINGS CONFIRMED ON PAGE IMAGES - S-1 TO S-3 FAITHFULLY ADDRESSED - BOUNDED SR-I CLOSED SOURCE-SUPPORTABLE CONDITIONAL ON STEWARD ACCEPTANCE - SR-I PARTIAL, 6/2/6 CURRENT, 7/1/6 CONDITIONAL, NEITHER ENACTED - OVERALL INPUT_INCOMPLETE PRESERVED - SOURCE_SET_READY FALSE - NARROW, TRANSFER, R3-CAND/RES-ONLY, R4 PRESERVED - NOT STEWARD ACCEPTANCE - NOT PROTOCOL ADOPTION
