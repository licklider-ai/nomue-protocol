# Release 3 Source-Acquisition Result Part C — Independent Primary-Source Review of the SR-K and SR-G Closure Candidates

**Status: informative independent review result; non-normative; not adopted.**
This record reviews one exact commit of the Release 3 semantic source-acquisition
result, and within it only the two source-closure candidates proposed in Part C for
holds `SR-K` and `SR-G`, against the five supplied original PDFs that those two
candidates rely on. It selects no Contract, procedure, identifier, schema, Public
Check, tolerance, support domain, RFC decision, R4 method, or release outcome; it
updates no hold, issue, gate, or catalogue class; and it merges nothing.
Attribution is role-based only.

**Overall review verdict: `GO`** (Section 10), bounded to the two candidates.
`SR-K`: review `GO`, source-supportable hold disposition `CLOSED`. `SR-G` with
X-1: review `GO`, source-supportable hold disposition `CLOSED`. Findings:
`BLOCKER` 0, `SHOULD-FIX` 2, `NICE-TO-HAVE` 5 (Section 9). `GO` here does not
cover the other twelve dispositions in C.5, the other fourteen supplied PDFs, the
intake of C.2/C.3 beyond the five originals, Release 3 as a whole, or Release 4.

## 1. Review identity, scope, and independence

| Field                     | Value                                                                                                                                                          |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository                | `licklider-ai/nomue-protocol` (public)                                                                                                                         |
| Reviewed pull request     | #186 (draft; head branch `research/r3-source-intake-srk-20260907`; base `main`)                                                                                |
| Reviewed exact head       | `37d3ed1626964c20080c26614052e2ce1971d635`                                                                                                                     |
| Sole parent / base        | `f39100161cb45de15767bdb19ed54aba9489b41a` (`main` at review start and end)                                                                                    |
| Head tree                 | `fa1ab61fea7f6982a49f1c591e518c93cbbaac78`                                                                                                                     |
| Changed path              | `governance/drafts/release-3-preparation/semantic-source-acquisition-result.md` (1 path, +461/−0)                                                              |
| Result blob (head)        | `ab3db6a9a7fe82745da28530df8d807a33cf19e8`, SHA-256 `1a26835faa7cd22f5902b985e12c2d8edc4458866e670985c2553080d7b7de0e`                                         |
| Result blob (parent)      | `5465cbcfd00708facac94785d9244b79166cb81e` (Parts A and B before the Part C append)                                                                            |
| Commission path / blob    | `governance/drafts/release-3-preparation/semantic-source-acquisition-commission.md`, `3c7ddcc696f0c284213f7efe0da68e747bc238d7` (identical at parent and head) |
| Semantic comparison input | commit `7bd9c5ab854777c3e99e624d9d2ed62731228852`, tree `f0436f5784dbe34d4c150893c20a60f0431c5d90`                                                             |
| Review date               | 2026-09-07                                                                                                                                                     |
| Reviewer role             | independent reviewer of the exact head; see the independence boundary below                                                                                    |
| Review branch             | `review/r3-srk-srg-source-closure-20260907`, created from the reviewed head as sole parent                                                                     |
| Review posture            | adversarial primary-source review; the purpose was to break the two closure candidates, not to support them                                                    |

**In scope.** Result Part C sections C.4 (C-K1, C-K2, C-K3), C.5 rows `SR-K`
and `SR-G`, C.6 (C-G1, X-1, the nine 1969 corrections, the R4 handoff
boundary), C.7 as far as it concerns sources 04, 16 and 19, and the C.8/C.9
review instructions and validation boundary. Source artifacts 04, 09, 10, 16, 19.

**Out of scope, and not reviewed.** The other twelve C.5 dispositions; C.3 rows
for sources 01–03, 05–07, 11–15, 17, 18, 31; the Rom and Romano–Wolf diagnostics
in C.7 (their originals were not supplied to this review; Section 7); the
correctness of Parts A and B beyond byte-prefix preservation; Release 4 review
PR 184; any RSM entry. The absence of the other fourteen PDFs is a scope
limitation of this review, not a defect of the reviewed result. Nothing in this
record extends to them.

**Independence boundary.** This review was performed in a separate LLM-assisted
review session with its own context, in a managed remote execution environment,
starting from a fresh clone of the public repository. The review session did not
author, prepare, repair, or record acceptance of the semantic research result,
either commission, the source-acquisition result Parts A, B or C, the source
intake, the PR #186 text, or any prior review record; it had no access to the
authoring session's context beyond the committed artifacts and the live PR
metadata. It therefore is not a second pass in the authoring context. Result
C.1 discloses only "an LLM-assisted authoring session" and does not name the
authoring model; the reviewer's own model identifier is held in the review
session record and disclosed to the steward outside this file, and is not
reproduced here. Consequently, RFC rule 2's separate-context requirement is
established from the repository; distinctness at the level of the underlying
model is not verifiable from repository artifacts and is left for the steward
to record from the two session records when the acceptance is written. The
`GO` below is issued on the separate-context basis and is conditioned on that
recording; if the steward's records show the same model in both sessions, the
steward adjudicates whether RFC rule 2 is satisfied before treating either hold
as closed.

**Environment.** Linux container; Node v22.22.2; pnpm 11.7.0 with the pinned
lockfile installed by `pnpm install --frozen-lockfile` (exit 0); Python 3.11
with PyMuPDF 1.28.2 for text extraction and 130–150 dpi page images; exact
rational arithmetic from the Python standard library. No private repository,
private package, or product implementation was read. The read-first documents
in `AGENTS.md` (CHARTER, AUTHORITY, authority manifest, requirements registry,
ID policy, RFC) were read before the review.

## 2. Fixed-input identity verification

Every value below was recomputed from Git objects and file bytes in this clone,
not copied from the PR text or from the result text.

| Check                                                              | Result                                                                                                                       |
| ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `git log -1 --format=%P 37d3ed16…`                                 | exactly one parent, `f3910016…`                                                                                              |
| `git rev-parse 37d3ed16…^{tree}`                                   | `fa1ab61f…`                                                                                                                  |
| `git diff-tree --no-commit-id -r 37d3ed16…`                        | one path, mode `100644`, blob `5465cbcf…` → `ab3db6a9…`, status `M`; the result file only                                    |
| SHA-256 of blob `ab3db6a9…`                                        | `1a26835f…` (matches the PR's stated value)                                                                                  |
| Byte-prefix test (`cmp -n 164493 old new`)                         | the 164 493-byte parent blob is byte-for-byte the prefix of the 209 255-byte head blob; Parts A and B are unchanged          |
| Commission blob at parent and head                                 | `3c7ddcc6…` in both trees                                                                                                    |
| Semantic comparison commit `7bd9c5ab…`                             | tree `f0436f57…`; result blob `8f215260…`; original semantic commission blob `c6760efc…`; both present at the recorded paths |
| Preserved review blobs `fc61decb…`, `e6464295…`, `395054fd…`       | all three exist as blobs at their `review-inputs/…/REVIEW-RESULT.md` paths in tree `f0436f57…`                               |
| Live PR #186 (read at review start and re-read before the verdict) | head `37d3ed16…`, base `f3910016…`, one commit, one changed file, `mergeable_state: clean`, draft; the head did not move     |
| `git diff --check f3910016… 37d3ed16…`                             | exit 0, no whitespace errors                                                                                                 |

No identity mismatch was found, so the content review proceeded on the fixed head.
The preserved review blobs in full are `fc61decb017821c403841a6db822ccd5e5b7233d`,
`e646429582d206d5299ce5ff1d0c2b8978323cd3`, and
`395054fd1e2f22a5ad63460b86be0394de429605`.

## 3. Inputs read and what they require of the two candidates

- **Commission (`3c7ddcc6…`).** The question is whether holds can be closed by
  direct inspection of the identified primary texts "without silently changing a
  procedure variant, assumption, guarantee, comparison family, or output claim".
  `SR-G` covers APR-09 with source SRC-12; `SR-K` covers FDR-01 dependence scope
  and FDR-02 through FDR-04 with sources SRC-22, SRC-23, SRC-24. Eight analysis
  items apply per entry. `CLOSED` means all decision-bearing source claims needed
  by the hold are directly supported with exact artifact identity and pinpoints,
  and "does not select the procedure for Release 3"; `PARTIAL` means named gaps
  remain; `NO_GO` means material contradiction; `INPUT_INCOMPLETE` means the text
  cannot be inspected.
- **Fixed semantic result (`8f215260…`).** Section 17 hold rows `SR-G` (APR-09 →
  SRC-12) and `SR-K` (FDR-01 dependence scope; FDR-02, FDR-03, FDR-04 → SRC-22,
  SRC-23, SRC-24). Catalogue rows: FDR-01 `R3-CAND` "fully sourced under
  independence … the dependence condition for one-way shared-variance p-values is
  part of hold SR-K"; FDR-02 `R3-CAND`† (PRDS definition and coverage of one-way
  statistics); FDR-03 `RES-ONLY`†; FDR-04 `TRANSFER(… Releases 16–20 horizon)`†;
  APR-09 `R3-CAND`† with the `sqrt((k−1)F)` projection and data-dependent
  contrasts. Inference I-03 holds open whether shared-error-term p-values satisfy
  step-up dependence conditions.
- **Acquisition result Parts A/B (`5465cbcf…`).** Claim rows C-G1, C-K1, C-K2,
  C-K3 (Section 3) were `NOT_INSPECTED`; X-1 records the SRC-12 page-range doubt
  (87–104 in the fixed result versus 87–110 in an index snippet) and requires the
  range to be read from the artifact.
- **Preserved reviews (`fc61decb…`, `e6464295…`, `395054fd…`).** They fixed the
  SR-K row's coverage (FDR-04 added, S-2/R-1) and gave FDR-04 its `TRANSFER`
  disposition; none inspected SRC-12 or SRC-22 through SRC-24. They constrain
  this review only in that the catalogue classes must remain unchanged, which
  C.5 asserts and Section 5.4 below confirms.

## 4. Primary-source artifact verification

SHA-256 values were recomputed on the supplied original bytes; all five match
the result's C.2 table and the review commission. Page counts are PDF pages.
Printed-page to PDF-page mappings in C.3 were checked against page headers.

| Number | File                    | Recomputed SHA-256                                                 | PDF pages | Printed pages checked | Mapping in C.3          |
| ------ | ----------------------- | ------------------------------------------------------------------ | --------: | --------------------- | ----------------------- |
| 04     | `04_Benjamini_2001.pdf` | `4bfbec2b1099968fee729852c5d6c3a8123ba6e5748e1e9583a81d5c5ebdef27` |        24 | 1165–1188 continuous  | p−1164 (p.1165 = PDF 1) |
| 09     | `09_Scheffe_1953.pdf`   | `bb0bd080601c566697ebb657f81aa6d08cc2a02239a31d4ada7c5a7da2cda701` |        19 | 87–104 continuous     | p−85 (p.87 = PDF 2)     |
| 10     | `10_Scheffe_1969.pdf`   | `df5671bfb92e0ab64354dad5a117be19d7b536c2d0e2a9cc22ead004b1beb9ba` |         2 | 229                   | 229 = PDF 2             |
| 16     | `16_Benjamini_2006.pdf` | `d96aea58a5490bb4c6e339e3fc9528affa09c10637003ba9f5533ca0d7a632e8` |        18 | 491–507 continuous    | p−489 (p.491 = PDF 2)   |
| 19     | `19_Storey_2002.pdf`    | `4eafd121b98b693aa7fb3386de536a6a4902446cc4f48d8f5c3f2e489615a046` |        21 | 479–498 continuous    | p−477 (p.479 = PDF 2)   |

Reading method: the full text layer of all five PDFs was read. Because the JSTOR
text layers of 09, 10, 16 and 19 corrupt or drop mathematical symbols (absolute
value bars, hats, subscripts, inequality signs), every definition, theorem,
equation, inequality, and table cell that bears on a judgment below was checked
against the rendered page image: 04 pp.1174, 1175, 1180; 09 pp.88, 89, 93, 100,
102, 103; 10 p.229; 16 pp.493, 495, 497, 498; 19 pp.481, 483, 487, 490. Other
pages were read from text. This is a reading of the decision-bearing statements,
not a full proof audit of every lemma or every table.

No source needed for the two candidates was missing; `SOURCE_ACCESS_INCOMPLETE`
does not apply to any in-scope claim.

## 5. SR-K adversarial verification (C.4, C.5 row SR-K)

Each C.4 row was checked against the printed page; the reviewer's adversarial
tests follow the commission's eight items and the handoff list in C.8 item 4.

### 5.1 C-K1 — Benjamini and Yekutieli (2001), source 04

| Result claim (C.4.1)                                                                                    | Source check                                                                                                                                                                                                                                                                                     | Verdict                                                                                                                                |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| p.1167 (1), p.1169 §2.1: fixed finite family, `Q = V/R` or 0, FDR = `E(Q)`, BH `iq/m`                   | p.1167 procedure (1) `k = max{i : p_(i) ≤ (i/m) q}`; p.1169 `Q = V/R if R > 0, 0 otherwise`, FDR `= E(Q)`                                                                                                                                                                                        | supported                                                                                                                              |
| p.1168 PRDS definition; Theorem 1.2 bound `(m0/m) q` on the true-null subset                            | Property PRDS: for any increasing set `D` and each `i ∈ I0`, `P(X ∈ D \| X_i = x)` nondecreasing in `x`; Theorem 1.2 requires PRDS "on the subset of test statistics corresponding to true null hypotheses"; p.1170 states PRDS and positive association do not imply one another                | supported; partial-null coverage and "empirical positive correlation is insufficient" are both source-backed                           |
| p.1169 Theorem 1.3, proof pp.1182–1183: `q / Σ_{i=1}^m (1/i)` for any dependence                        | Theorem 1.3 statement p.1169; proof p.1182–1183 uses (27) `Σ_k p_ijk = q/m`, i.e. uniform (at most uniform) null p-values; nothing repairs invalid p-values                                                                                                                                      | supported                                                                                                                              |
| pp.1172–1174 Case 1, Corollary 3.3, Case 3: absolute-value statistics with independent chi-square scale | Page image p.1174: Corollary 3.3 is printed for `\|Y\|` PRDS on `I0` and `\|X\| = \|Y\|/S`; Case 3: if `Σ = I` the components of `\|Y\|` are independent hence PRDS on any subset; for `Σ ≠ I`, MTP2 only when all `μ_i = 0`; a null block independent of the non-null block is also covered     | supported; "shared denominator alone does not suffice" is the correct reading                                                          |
| pp.1174–1175 Case 4, p.1180 Remark 4.2: signed Studentized statistics not PRDS; one-sided at `q < 1/2`  | Case 4: "`Y/S` is not PRDS. Yet … if `q` … is less than 1/2, the Benjamini Hochberg procedure applied to `Y/S` offers FDR control"; Remark 4.2: PRDS needed only for sets of form (11) and `P_i ∈ [0, q]`, "used to establish that Theorem 1.2 holds for one-sided multivariate t and `q < 1/2`" | supported; the `q < 1/2` restriction and the Case 1 numerator condition (`σ_ij ≥ 0` for `i ∈ I0`, all `j ≠ i`) are preserved           |
| p.1175 Problems 2–3: orthogonal contrasts in balanced designs; one-sided many-to-one                    | Problem 2 places two-sided correlated t-tests under Case 3; Problem 3: `X_i = (Y_i − Y_0)/(c_i S)`, independent `Y_i`, `S²/σ² ~ χ²_ν/ν`, `ρ_ij > 0`, "thus according to Case 4, X is PRDS" — the paper's own shorthand, since Case 4 says `Y/S` is not PRDS                                      | supported, including the result's warning not to read Problem 3 in isolation                                                           |
| p.1182 discussion: general normal all-pairs applicability "unresolved"                                  | p.1182: whether BH controls FDR "when testing pairwise comparisons of normal means, either Studentized or not" is an open question; simulations suggest it does; "It is known that the distribution of the test statistics is not MTP2. The PRDS condition does not hold as well."               | supported as to FDR control being open; **imprecise** as to PRDS: the source affirmatively says PRDS fails for all-pairs (finding S-1) |

Investigator derivation ("Concrete scope mapping") checked line by line:

- Prespecified contrasts orthogonal in the covariance metric of independent normal
  group means with common variance have uncorrelated, hence independent, normal
  numerators; with an independent residual chi-square scale this is Case 3 with
  `Σ = I` after scaling. Correct. Balance does not make an arbitrary chosen family
  orthogonal. Correct.
- One-sided treatment-minus-control comparisons: numerator covariance between two
  distinct comparisons is `var(Y_0) > 0`, so Case 1's sign condition holds and Case
  4 gives the route at `q < 1/2`. Correct. It is not a two-sided many-to-one or a
  global PRDS statement. Correct.
- Arbitrary two-sided all-pairs, data-selected families, Welch unequal-variance
  comparisons, or estimated general covariance are not covered by Cases 1–4, and
  Theorem 1.3's harmonic correction is the only route in this source given valid
  marginal p-values. Correct, and the source itself says PRDS does not hold for
  all-pairs (p.1182).
- Adjusted values as suffix minima of `m p_(j)/j` (or `m H_m p_(j)/j`): correct
  threshold-equivalent algebra; not Storey's q-value. Correct. Source 16 p.493
  prints the ordinary-BH version as the FDR-adjusted p-value (finding N-2).

Adversarial tests from C.8 item 4: shared denominator versus independent
numerators — correctly separated; one-sided versus two-sided — correctly
separated (Case 4 versus Case 3); PRDS versus positive correlation — correctly
separated (p.1170 and Case 1's remark that not all correlations need be
nonnegative); `q < 1/2` — preserved; fixed-family counting — preserved ("member
set and `m` remain fixed"). The result does not claim that all one-way
shared-variance statistics satisfy PRDS, and it does not claim BH control for
all-pairs. C-K1 is answered conditionally and family-specifically, which is the
only answer this source supports.

### 5.2 C-K2 — Benjamini, Krieger and Yekutieli (2006), source 16

| Result claim (C.4.2)                                                                                                                                                      | Source check                                                                                                                                                                                                                                 | Verdict                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Definition 6 (p.495): stage 1 at `q' = q/(1+q)`; stop at `r1 = 0` (reject none) or `r1 = m` (reject all); else `m̂0 = m − r1`, rerun on all `m` p-values at `q* = q' m/m̂0` | Page image p.495 Definition 6, Steps 1–3, verbatim                                                                                                                                                                                           | supported                                                 |
| Theorem 1 (pp.496–498): FDR `≤ q` under independence; null p-values valid                                                                                                 | Theorem 1 and proof on pp.497–498; §5 setup on p.496 assumes independent statistics, null p-values stochastically at least uniform, `m̂0` increasing in each `P_i`; proof closes with Lemma 1 at `p = 1/(1+q)`: `q/(1+q) · m0 · (1+q)/m0 = q` | supported (pinpoint precision, N-4)                       |
| Definitions 2–5 (pp.493–495), Definition 7 (p.496), Theorem 2 (p.498) are distinct                                                                                        | Definition 2 p.493; 3, 4, 5 p.494–495; 7 p.496; Theorem 2 p.498 is for a prespecified quantile `k`                                                                                                                                           | supported                                                 |
| No transfer to data-chosen rank, iteration, or dependence; §6.3 simulations are not a theorem                                                                             | p.502 §6.3: once the same dependent p-values are used in both stages "it is difficult to study analytically … we therefore resort to a simulation study"; Fig. 1–2 are simulations                                                           | supported                                                 |
| Motivating inequality (1) p.495 prints `(m−R)/(1−q) ≤ (m−R)(1+q)`, false for `0<q<1`                                                                                      | Page image confirms the printed chain `m0 ≤ (m−R)/(1−(R/m)q) ≤ (m−R)/(1−q) ≤ (m−R)(1+q)`; since `1/(1−q) > 1+q` the last step is false as printed; Theorem 1 does not use it                                                                 | supported; correctly isolated from the theorem            |
| p.505 example: BH 4, TST 8; second example not reproducible (138 p-values absent)                                                                                         | Independently recomputed (Section 7): BH at 0.05 → 4; stage 1 at `1/21` → 4; `q* = 5/77 ≈ 0.06494` → 8 (p.505 prints 0.06494 and 8). Example 2 gives only counts (138, 34)                                                                   | supported                                                 |
| Storey-family `+1` and `p ≤ λ` modifications (pp.495, 499) belong to the compared procedures                                                                              | p.495 and p.499 describe Storey et al. (2004) modifications `{m+1−r(λ)}` and `p_(i) ≤ λ`                                                                                                                                                     | supported; nothing is inserted into source 19's estimator |
| FDR-03 stays `RES-ONLY` requiring variant identification; "adaptive BH" not released as a broad name                                                                      | C.5 keeps `RES-ONLY`; C.4.2 names Definition 6 as the theorem-backed variant and lists the others as distinct                                                                                                                                | supported                                                 |

The result does not extend Theorem 1 to any other adaptive or multi-stage
procedure or to dependence. C-K2 is answered.

### 5.3 C-K3 — Storey (2002), source 19

| Result claim (C.4.3)                                                                                             | Source check                                                                                                                                                                     | Verdict                                       |
| ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| p.481 Definition 1: `pFDR = E[V/R \| R > 0]`; `FDR = E[V/R \| R > 0] Pr(R > 0)`                                  | Page image p.481 equations (1), (2); "pFDR is identically 1 when all null hypotheses are true"                                                                                   | supported                                     |
| p.482 Theorem 1: iid tests, Bernoulli null indicators, common region; `pFDR(Γ) = Pr(H = 0 \| T ∈ Γ)`             | Theorem 1 (3)–(4); "For this theorem to hold we must assume that the `H_i` are random"                                                                                           | supported                                     |
| p.483 (5)–(10): `π̂0 = W(λ)/((1−λ)m)`, `R(γ)`, `FDR̂ = W(λ)γ/((1−λ){R(γ) ∨ 1})`, `pFDR̂ = FDR̂/{1−(1−γ)^m}`; no `+1` | Page image p.483 (6)–(10) verbatim; no `+1` anywhere in the 2002 estimator; `λ` fixed "for now", chosen in §9                                                                    | supported                                     |
| p.487 Theorem 2, proof pp.496–497: expected untruncated estimates conservative                                   | Page image p.487: `E{pFDR̂_λ(γ)} ≥ pFDR(γ)` and `E{FDR̂_λ(γ)} ≥ FDR(γ)` "for all `γ` and `π0`", "stated under the assumption that we do not truncate the estimates at 1"           | supported; not a pointwise bound              |
| pp.484, 488 Theorem 3: truncation at 1 improves MSE                                                              | p.484 recommends setting to 1; Theorem 3 p.488 is the MSE statement only                                                                                                         | supported                                     |
| pp.488–489 Theorem 4 and Corollary 1: limit depends on `g` and `λ`; `g(0)=0, g(1)=1, g(λ)>λ`                     | p.488 assumptions and (16); p.489 (17) for concave `g`; `g'(1)` discussion                                                                                                       | supported                                     |
| p.490 Definitions 2–3, p.491 Algorithm 2: q-value as infimum; estimated q-values as suffix minima of `pFDR̂`      | Page image p.490 (20), (21); "The right-hand side of the definition only holds when the `H_i` are random as in theorem 1"; Algorithm 2 `q̂(p_(i)) = min{pFDR̂(p_(i)), q̂(p_(i+1))}` | supported; finite-`m` factor is inside `pFDR̂` |
| p.490 last paragraph: exact operating characteristics of `q̂` left open                                           | Verbatim: "The exact operating characteristics of `q̂(p_(i))` are left as an open problem, but simulations show that it behaves conservatively"                                   | supported                                     |
| pp.493–494 bootstrap `λ`; no exact finite-sample guarantee inferred                                              | §9 Algorithm 3; no theorem accompanies the selection                                                                                                                             | supported                                     |
| The `Pr{R(γ) > 0} ≥ 1 − (1−γ)^m` step (pp.483, 496) needs per-test rejection probability at least `γ`            | p.483 "clearly a lower bound"; p.496 (32) "under independence"; the bound holds when `π0 γ + π1 g(γ) ≥ γ`, i.e. `g(γ) ≥ γ`, which p.488 assumes                                  | supported; a correct and sharp boundary       |
| Remark 2 p.497 refers weaker-assumption proofs elsewhere; not inspected                                          | Verbatim reference to Storey and Tibshirani (2001)                                                                                                                               | supported; correctly not treated as read      |

Estimation versus control is kept separate throughout C.4.3: Theorem 2 is
stated as conservatism in expectation of the estimate at a fixed region and
fixed `λ`, not as control of a data-chosen rejection rule. One sentence
misdescribes what C.7 reproduces (finding N-3). FDR-04 retains `TRANSFER`.
C-K3 is answered.

### 5.4 SR-K disposition reasoning

- All three assigned texts (SRC-22, SRC-23, SRC-24) were inspected with exact
  artifact identity and printed pinpoints; the reviewer found no decision-bearing
  statement in C.4 that the sources contradict.
- The catalogue's FDR-02 characterization (FDR under PRDS on the true-null
  subset; harmonic-sum inflation under arbitrary dependence; any declared finite
  family; rejection set output) is directly supported. FDR-01's dependence
  question is answered as far as SRC-22 can answer it: Case 3 and Case 4 families
  are covered under stated conditions; all-pairs Studentized comparisons are not
  PRDS and their BH control is open in the source. FDR-03's theorem-backed
  variant is identified (Definition 6, Theorem 1, independence) and the other
  variants are separated. FDR-04's estimator, target, and output semantics are
  identified with their model conditions and open questions.
- Catalogue classes are unchanged: FDR-01 `R3-CAND` under its explicit
  independence declaration, FDR-02 `R3-CAND`†, FDR-03 `RES-ONLY`†, FDR-04
  `TRANSFER`†; the daggers are not removed by the result and are not removed by
  this review.
- `CLOSED` versus `PARTIAL`: the residual all-pairs question is not a gap in
  source acquisition. It is a limitation stated by the assigned source itself,
  recorded in C.4.1 as an unsupported family, and no source in the fixed hold row
  could close it. Under the commission's definitions, the source-acquisition
  obstacle for `SR-K` has been removed, and the source-supportable disposition is
  `CLOSED` with the narrowed, family-specific scope recorded. If the steward
  reads `CLOSED` as requiring the all-pairs question itself to be answered, the
  disposition would instead be `PARTIAL` with exactly that one named gap; this
  review records the alternative so the steward's acceptance can state which
  reading it applies. Either reading keeps every catalogue class unchanged.
- The `CLOSED` candidate is not generalized: it does not close SR-A through SR-J,
  RSM-01/02, or the numerical lane, and C.5's overall `INPUT_INCOMPLETE` is
  correct under the commission's precedence.

## 6. SR-G and X-1 adversarial verification (C.6, C.5 row SR-G)

| Result claim (C.6)                                                                                                                             | Source check                                                                                                                                                                                                         | Verdict                                  |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Model: jointly normal unbiased `μ̂_i`, covariance `a_ij σ²` with known `a_ij`, `σ̂²` independent with `ν σ̂²/σ² ~ χ²_ν`, rank conditions          | 09 p.87 (4); p.88: rank `k` if the `μ_i` are unrestricted, `k − 1` under restriction (1); `ν` degrees of freedom; known-`σ²` case by `ν = ∞`                                                                         | supported                                |
| Half-width `sqrt((k−1) F) · sqrt(σ̂²_θ̂)` with `σ̂²_θ̂ = Σ Σ a_ij c_i c_j σ̂²`; contrasts `Σ c_i = 0`                                               | p.88 (6), (7) `S² = (k−1) F_α(k−1, ν)`; p.89 (8) `θ̂ − S σ̂_θ̂ ≤ θ ≤ θ̂ + S σ̂_θ̂`; p.87 (2), (3)                                                                                                                          | supported                                |
| `F_α` is the upper `α` point; the result's `F_(1−α)` lower-tail notation is the same quantile                                                  | p.89 first line: "`F_α(k−1, ν)` denotes the upper `α` point"                                                                                                                                                         | supported                                |
| Coverage exactly `1 − α` for the totality of contrasts, at least `1 − α` for any subset; data-suggested contrasts within the space are covered | p.89: "the probability is `1 − α` that the values `θ` of all the contrasts simultaneously satisfy (8)"; "including any suggested by the way the observed means fall out … will be `≥ 1 − α`"                         | supported                                |
| Choosing between procedures after seeing the data is not licensed (pp.92–93)                                                                   | pp.92–93: "not permissible to use both on the same data and then choose the one with the results we like better — unless we are willing to settle for an overall confidence coefficient known only to be `≥ 1 − 2α`" | supported                                |
| Global `F` equivalence (pp.95–96) concerns existence of some significant contrast, not a pairwise difference or a prelisted finite family      | pp.95–96: `F` accepts iff statement (i) for all contrasts; `F` rejects iff statements (ii)/(iii) "for some contrasts"; footnote p.96: the confidence sphere covers the origin                                        | supported                                |
| Original pages 87–104 continuous; X-1 resolves to 87–104                                                                                       | JSTOR cover and every page header of 09: 87–104, eighteen pages, references end on p.104; 10 p.229 item (1) heads "Biometrika (1953), 40, 87–104"                                                                    | supported; X-1 resolved by two artifacts |
| pp.100–101 power approximations are not numerical certificates                                                                                 | p.100 "approximately", "moderate or large values of `ν`"; p.101 (33), (34) "rougher"                                                                                                                                 | supported                                |
| R4 illustration: centered interaction covariance `v(δ_ik − 1/a)(δ_jl − 1/b)`; `±v/4` for 2×2                                                   | Reviewer algebra agrees; the deleted footnote's reason ("the `a_ij` are not all equal for `i ≠ j`") is exactly this non-constancy; it is labelled investigator algebra, not attributed to the paper                  | supported                                |
| Closure candidate excludes the 1959 book, other holds, and any specific R4 interval construction                                               | C.6 states this; no R4 method is adopted anywhere in Part C                                                                                                                                                          | supported                                |

**Nine corrections (10 p.229 item (1)) checked against both page images.**

| Correction as printed in 10                                                                                                                                           | Locator exists in 09 (image)                                                                  | C.6 table row |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ------------- |
| p.89 l.8 from bottom: `μ̂_1` should read `μ̂_i`                                                                                                                         | p.89 "indeterminates `μ̂_1`, is `k − 1`"                                                       | matches       |
| p.90 l.7: insert comma after `η_j`                                                                                                                                    | p.90 line 7                                                                                   | matches       |
| p.93: delete footnote; "Tukey's method does not apply to the interactions, since the `a_ij` are not all equal for `i ≠ j`"                                            | p.93 starred footnote on interactions as contrasts and "General superiority of (8) over (14)" | matches       |
| p.100 l. below (28): `ψ > A` should read `ψ ≥ A`                                                                                                                      | p.100 "For `ψ > A`, `P_2` is the probability of (28)"                                         | matches       |
| p.100 2nd and 7th lines below (28): `ψ ≤ A` should read `ψ < A`                                                                                                       | p.100 "for `0 ≤ ψ ≤ A`, `P_2` trivially equals 1" and "value 1 for `ψ ≤ A`"                   | matches       |
| p.102 l.16: `ζ̂_1` should read `ζ̂_i`                                                                                                                                   | p.102 "the `ζ̂_1` will be normal with variance `C²σ²`"                                         | matches       |
| p.102 l.5 from bottom: insert "It is assumed that `γ < ½π` in the following developments; the value of `P_2` at `γ = ½π`, stated in §4, is easily derived separately" | p.102 after "since cosec `γ = ψ/A`, that the derivative `f'(γ)` is positive"                  | matches       |
| p.102 l.14 from bottom: `ζ_{k−1}` should read `ζ̂_{k−1}`                                                                                                               | p.102 "equals `ζ_{k−1} tan γ`"                                                                | matches       |
| p.103 2nd line above (38): insert `w` before `p_1`                                                                                                                    | p.103 "`f'(γ) = ∫ p_1(w cos γ − B sin γ) p_2(w sin γ + B cos γ) dw`"                          | matches       |

Items (2) and (3) on p.229 concern other authors and are correctly excluded.
None of the nine corrections touches the method statement (1), (8), or the
proof of §2; they affect one Tukey-comparison footnote, boundary equalities in
the power section, and typographical subscripts. The closure candidate's method
claims therefore survive the corrections, and C.6 records them completely.

**Adversarial distinctions from C.8 item 5.** All-contrasts versus all-pairs:
kept (p.89's warning that Tukey is preferable when only the `½k(k−1)` differences
matter is preserved as a comparison, not adopted). Data-suggested contrasts
versus data-chosen procedure: kept. Global `F` versus pairwise rejection: kept.
Covariance and rank: kept. No R4 method is inferred. The candidate is bounded to
APR-09 / C-G1 and X-1.

SR-G disposition reasoning: the single assigned source (SRC-12) plus its
published correction were inspected with exact identity; C-G1's three
components (all-contrast simultaneous coverage, `sqrt((k−1)F)` projection,
admissibility of data-suggested contrasts) are directly supported; X-1 is
resolved by artifact. Source-supportable disposition: `CLOSED`. APR-09 stays
`R3-CAND`† until the steward's acceptance, exactly as C.5 states.

## 7. Reproductions

- **C.7 rerun.** The Python block in C.7 was extracted verbatim from blob
  `ab3db6a9…` and executed (exit 0). Output matched the recorded transcript
  character for character:

  ```text
  BKY example: BH=4, first=4, second=8; motivating inequality false
  Rom alpha=.01 n=10: 0.001004472598983613
  Romano-Wolf all ties: strict rejects=False, inclusive rejects=True, p=1
  Storey fixed-region estimates: 0.08 0.43330536145016
  ```

- **Independent recomputation (reviewer's own code, exact rationals, from the
  printed inputs on 16 p.505 and 19 p.483).** BH at `q = 0.05` on the fifteen
  printed p-values: 4 rejections. Stage 1 at `q' = 1/21`: 4 rejections. Second
  stage at `q* = (1/21)(15/11) = 5/77 ≈ 0.064935`: 8 rejections; the eighth
  threshold is `5/77 · 8/15 ≈ 0.034632 ≥ 0.0344` and the ninth is
  `≈ 0.038961 < 0.0459`. The printed level 0.06494 and count 8 are reproduced.
  Example 2's second-stage level from the printed counts alone is
  `(1/21)(138/104) ≈ 0.06319`, matching the printed "0.063" (N-4). The printed
  inequality (1) fails for every `q ∈ {0.01, 0.05, 0.1, 0.5}`. Theorem 1's
  closing bound was checked numerically for `m0 ∈ {1, 2, 5, 10}`:
  `q/(1+q) · m0 · E[1/(Y+1)] ≤ q` with `Y ~ Bi(m0−1, 1/(1+q))`. Storey's
  estimator on the five illustrative p-values with `λ = 1/2`, `γ = 0.04`:
  `W = 2`, `R = 2`, `FDR̂ = 2/25`, `pFDR̂ ≈ 0.43331`; Algorithm 2 suffix minima
  were also computed and are monotone as p.490 requires.
- **Out of scope in C.7.** The Rom (1990) recurrence and the Romano–Wolf
  all-ties diagnostic executed as part of the rerun, but their originals (14, 31)
  were not supplied to this review. Their execution is recorded here as a code
  reproduction only; no primary-source review of those two observations is
  claimed, and C.3 rows 14 and 31 are not covered by this record.

## 8. Repository validation at the exact head

Run in this clone with the pinned dependencies installed
(`pnpm install --frozen-lockfile`, exit 0), working tree at `37d3ed16…`:

| Command                                                                                              | Result                                                      | Exit |
| ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ---: |
| `pnpm format:check`                                                                                  | "All matched files use Prettier code style!"                |    0 |
| `pnpm lint:markdown`                                                                                 | 355 files, 0 issues                                         |    0 |
| `node --import tsx tooling/src/validate.ts`                                                          | "validate: OK" (registries, traceability, links, audits, …) |    0 |
| `git diff --check f39100161cb45de15767bdb19ed54aba9489b41a 37d3ed1626964c20080c26614052e2ce1971d635` | no output                                                   |    0 |

The same three repository commands were re-run after adding this record and
passed (recorded in the review commit). A clean repository check is not
evidence of methodological correctness; Sections 5–7 are.

## 9. Findings

### BLOCKER

None.

### SHOULD-FIX

- **S-1 — All-pairs row understates the source.** File: result, C.4.1 table,
  row "1182 discussion". Source: 04 p.1182, second paragraph. The row says
  general all-pairs applicability "was unresolved in the paper's account". The
  page says two things: FDR control of BH for pairwise comparisons of normal
  means is an open question (simulation-supported only), and "It is known that
  the distribution of the test statistics is not MTP2. The PRDS condition does
  not hold as well." So the Theorem 1.2 route is affirmatively unavailable for
  all-pairs, not merely unresolved. Impact: none on the disposition, because the
  scope-mapping bullet already refuses unadjusted BH for all-pairs; but the
  claim-to-source row is the pinpoint a future reader will cite, and it could be
  read as leaving PRDS open. Minimal fix: reword the row to "PRDS (and MTP2) is
  stated not to hold for pairwise comparisons; FDR control there is left open".
  Re-review condition: the row's wording matches p.1182; no other change.
- **S-2 — Exact reopen condition for SR-K not stated.** File: result, C.4/C.5.
  Commission required-analysis item 8 asks for the exact reopen condition for
  anything not closed. C.6 states one for SR-G; for SR-K the only statements are
  C.7's "New contradictions in that theorem would reopen C-K2/SR-K" and the
  unsupported-family list in C.4.1. Impact: none on the source-supportable
  disposition, but the acceptance record needs a trigger list to be checkable.
  Minimal fix: add one SR-K reopen sentence naming (a) any proposal that relies
  on BH control for all-pairs or other non-Case-3/4 families without the
  Theorem 1.3 correction or a new primary source, (b) any adaptive variant other
  than Definition 6 or any use under dependence, (c) any use of the Storey
  estimator as a rejection rule with a guarantee claim, with `+1` or `p ≤ λ`
  modifications, or with data-driven `λ`, and (d) any contradiction found in the
  Theorem 1.2/1.3, Theorem 1 (16) or Theorem 2 (19) proofs. Re-review condition:
  the sentence is present and consistent with the fixed catalogue classes.

Because the reviewed blob is fixed, both items can be carried in the steward's
acceptance record or in a successor result; neither requires a repair commit
before acceptance, and any edit to the result would itself require a new
exact-head review.

### NICE-TO-HAVE

- **N-1 — Rank conditions.** C.6 says "with the paper's rank conditions" without
  stating them; 09 p.88 gives rank `k` (unrestricted) or `k − 1` (under
  restriction (1)). Since the R4 handoff turns on contrast rank, spelling them
  out would help. Re-review: one clause added.
- **N-2 — Adjusted p-value source pinpoint.** C.4.1 labels the ordinary-BH
  adjusted values as investigator algebra. 16 p.493 prints
  `p^LSU_(i) = min{ m p_(j)/j | j ≥ i }` as "the FDR-adjusted p-value". The
  ordinary-BH form can be cited to that page; the harmonic form remains
  investigator algebra. Re-review: pinpoint added.
- **N-3 — "Reproduced in C.7" overstates.** C.4.3 last sentence says the
  all-null "pFDR = 1 while FDR is much smaller" distinction is reproduced in
  C.7. C.7 reproduces the estimator gap from the finite-`m` factor
  (0.08 versus 0.4333), not the all-null identity, which is a p.481 statement.
  Re-review: sentence reworded.
- **N-4 — Pinpoint precision and an available recomputation.** C.4.2 cites
  Theorem 1 "pp.496–498"; the theorem and its proof are on pp.497–498 (p.496 is
  the §5 setup). Example 2's second-stage level `≈ 0.0632` is recomputable from
  the printed counts even without the 138 p-values and could be recorded.
  Re-review: pinpoint and optional sentence.
- **N-5 — Corrections table locator column.** C.6's table gives the corrections
  but not the original wording at each locator; adding the printed original
  tokens (as in Section 6 above) would let a future reader confirm each site
  without the 1953 artifact at hand. Re-review: column added or not; no impact.

## 10. Verdicts

| Candidate                     | Review verdict | Source-supportable hold disposition                          | Basis                                                                                                                               |
| ----------------------------- | -------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `SR-K` (C-K1, C-K2, C-K3)     | `GO`           | `CLOSED` (narrowed scope; see 5.4 for the `PARTIAL` reading) | SRC-22/23/24 inspected; every decision-bearing C.4 statement supported; unsupported families explicitly recorded; classes unchanged |
| `SR-G` (C-G1, X-1)            | `GO`           | `CLOSED`                                                     | SRC-12 and its 1969 correction inspected; C-G1 supported; nine corrections complete; X-1 resolved to 87–104                         |
| **Overall (both candidates)** | **`GO`**       | —                                                            | 0 `BLOCKER`; 2 `SHOULD-FIX` carried to the acceptance record; independence recorded with its boundary                               |

`GO` means only that, at exact head `37d3ed1626964c20080c26614052e2ce1971d635`,
the two proposed closures are supported by the five original artifacts as read
in this review, that their stated limits are the sources' limits, and that the
fixed catalogue classes are untouched. `GO` does not: close either hold (that is
a steward acceptance step through the existing process), approve the other
twelve C.5 dispositions or the fourteen uninspected artifacts, reconsider the
`NARROW` programme disposition, open public discussion, adopt any FDR or
Scheffé procedure or output contract, adopt any R4 interaction method, repin PR
181 or PR 184, certify any numerical implementation, or authorize a release. It
is not merge approval for PR #186; merge remains the steward's decision under
the existing process.

## 11. Remaining work and non-promotions

- Steward acceptance of the two candidates through the existing hold process,
  recording S-1 and S-2 and the reading of `CLOSED` applied in 5.4, and recording
  the two sessions' model identities to close the independence boundary.
- Independent review of the remaining C.2/C.3 intake and of any later closure
  candidates for SR-A through SR-J and RSM-01/02, each with its originals.
- The numerical lane, Release 4 successors, PR 184 Section 5.4, RFC and
  pre-opening review, and every steward decision remain distinct work.
- This record is a review input only; it is not an authoritative artifact.

## Public-artifact self-check

- [x] Only the public repository at the fixed head and parent, the live PR
      metadata, and the five user-supplied original PDFs were used; no private
      repository, work item, or product implementation was read.
- [x] This file is the only change in the review commit; the reviewed result,
      both commissions, the source PDFs, and every authoritative artifact are
      unchanged. No source PDF or full-text extraction is committed.
- [x] Attribution is role-based. Material process provenance is disclosed
      (separate LLM-assisted review session, environment, extraction tooling,
      dates, hashes); the reviewer's model identifier is held in the session
      record and is disclosed to the steward outside this file. No human
      authorship is claimed for this record.
- [x] Facts re-derived from Git objects and page images, reviewer inference,
      findings, and the verdict's limits are kept separate.
- [x] No merge, hold update, issue change, discussion opening, method adoption,
      ratification, or release was performed, and none is authorized by this
      record.

RELEASE 3 SR-K / SR-G SOURCE-CLOSURE INDEPENDENT REVIEW COMPLETE - GO (TWO CANDIDATES ONLY) - NOT MERGE APPROVAL - NOT HOLD CLOSURE - NOT PROTOCOL ADOPTION
