# Release 3 Source-Acquisition Result Part C — Additional Independent Primary-Source Pass for the SR-K / SR-G Closure Candidates

**Status: informative independent review result; non-normative; not adopted.**
This record is an additional, separate-context primary-source review of one exact
commit of the Release 3 semantic source-acquisition result. It goes back to the five
supplied original PDFs for the two source-closure candidates proposed in Part C for
holds `SR-K` and `SR-G`; it is not an endorsement of the summaries in the two preserved
reviews (PR #187 and PR #188), which it treats as findings to test. It selects no
Contract, procedure, identifier, schema, Public Check, tolerance, support domain, RFC
decision, R4 method, or release outcome; it updates no hold, issue, gate, or catalogue
class; it merges nothing. Attribution is role-based only; material process provenance
is disclosed in Sections 1 and 11.

**Content verdict: `GO`** (Section 10), bounded to the two candidates at the exact head
below. `SR-K`: source-supportable hold disposition `CLOSED` under the bounded reading
written in C.4.4 (the `PARTIAL` alternative remains recorded for the steward). `SR-G`
with X-1: source-supportable hold disposition `CLOSED`; X-1 is pp. 87–104. Prior
findings: S-1, S-2, N-1, N-2, N-3 `CLOSED`; N-4 `PARTIAL` (optional part deferred by
the author, value independently computed here); N-5 `DEFERRED`; R-N1, R-N2 still open
as cosmetic items. New findings: `BLOCKER` 0, `SHOULD-FIX` 0, `NICE-TO-HAVE` 3.

**Independence status: context `ESTABLISHED`, model-level `PENDING`** (Section 11).
**Formal hold acceptance: `NOT PERFORMED`** and not authorized by this record.

## 1. Review identity, scope, role, and independence

| Field                 | Value                                                                                                                                                                                                                                                |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository            | `licklider-ai/nomue-protocol` (public)                                                                                                                                                                                                               |
| Reviewed pull request | #186 (draft; head branch `research/r3-source-intake-srk-20260907`; base `main`)                                                                                                                                                                      |
| Reviewed exact head   | `9eee0caf6a423d509a996be71df8cff8b4d1e9df`                                                                                                                                                                                                           |
| Result path           | `governance/drafts/release-3-preparation/semantic-source-acquisition-result.md`                                                                                                                                                                      |
| Review date           | 2026-09-07 (UTC)                                                                                                                                                                                                                                     |
| Reviewer role         | additional independent primary-source reviewer for the bounded SR-K / SR-G scope, commissioned by the steward's handoff (PR #189 record, Section 3, and the review instruction supplied in this session)                                             |
| Non-involvement       | this review session did not author, revise, or repair the acquisition commission, Parts A/B/C of the result, the C.10 repair, PR #186, the PR #187 or PR #188 reviews, the PR #189 continuation record, or any Release 4 record                      |
| Review posture        | falsification-oriented: every in-scope decision-bearing statement of C.3 (rows 09/10 and the page mapping), C.4, C.5, C.6, C.7, C.4.4 and C.10 was checked against the original pages; page images were rendered where OCR or a formula was in doubt |
| Private material      | none; no private repository, path, package, or product implementation was read                                                                                                                                                                       |

**Scope.** C.4 (C.4.1–C.4.4), C.5, C.6, the related C.3 rows (09, 10, and the printed-page
mapping for 04/09/10/16/19), the in-scope C.7 calculations, and the C.4.4/C.10 reopen
conditions and boundaries, all against the five originals 04, 09, 10, 16, 19. Out of
scope and not reviewed here: the other twelve C.5 dispositions (which include the
inherited `SR-L`), the other fourteen supplied artifacts, the C.7 lines that depend on
sources 14 and 31, Release 4, and any acceptance decision.

**Model information (recorded on an ordinary accountable basis, not guessed).** This
review was performed in a managed remote execution session started 2026-09-07T07:58:39Z,
separate from every authoring session. The session-management service was queried during
the review and reported `configured_model: claude-fable-5-1` and
`last_served_model: claude-fable-5-1`. This is the reviewer-side identifier; the
authoring-side identifiers are discussed in Section 11. No serving-build log was
requested or is required.

**Environment.** Linux container (managed cloud environment); Node v22.22.2; pnpm 11.7.0
as pinned by `packageManager` (global pnpm 10.33.0 delegating to the pin); dependencies
installed with `pnpm install --frozen-lockfile` from the pinned lockfile; Python 3.11.15
(PyMuPDF 1.28.2 for text extraction and page images; `mpmath` 1.4.1 installed but not
needed for this record) and Python 3.12.3; exact rational arithmetic from the Python
standard library for every recomputation.

## 2. Fixed identity verification (expected versus observed)

All values were re-derived from Git objects fetched from the public repository and
from the supplied file bytes.

| Object                                 | Expected (handoff)                                                   | Observed                                                                             | Status |
| -------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------ |
| `main` at preparation time             | `f39100161cb45de15767bdb19ed54aba9489b41a`                           | `origin/main` = `f3910016…`, tree `6be22cd54124aecedbe396392a6d3a89d94f2c8f`         | match  |
| PR #186 head                           | `9eee0caf6a423d509a996be71df8cff8b4d1e9df`                           | live head `9eee0caf…` (API and `git ls-remote`), unchanged at start and end          | match  |
| Sole parent                            | `37d3ed1626964c20080c26614052e2ce1971d635`                           | exactly one parent, `37d3ed16…`                                                      | match  |
| Tree                                   | `e72cae8b40e0c37924115162f63901b8e72a64a6`                           | `git rev-parse 9eee0caf…^{tree}` = `e72cae8b…`                                       | match  |
| Result blob                            | `47b497d67bcf7e02382c1fe20cd69a8e615c31cf`                           | `git ls-tree` at head = `47b497d6…`                                                  | match  |
| Result SHA-256 / bytes                 | `444fa1d7…f10680` / 213491                                           | `444fa1d78f585c21ea26db3e8d7c2dfe39dc0728a4d6a3d996665df060f10680` / 213491          | match  |
| Changed paths parent → head            | one path                                                             | `git diff --stat`: the result file only, +72/−14                                     | match  |
| Parts A/B blob                         | `5465cbcfd00708facac94785d9244b79166cb81e`, 164493 bytes             | 164493 bytes; `cmp -n 164493` against the head blob: byte-for-byte prefix            | match  |
| Acquisition commission                 | blob `3c7ddcc696f0c284213f7efe0da68e747bc238d7` at `f3910016…`       | `git ls-tree f3910016…` = `3c7ddcc6…`                                                | match  |
| Old semantic input                     | commit `7bd9c5ab…`, tree `f0436f57…`, blobs `8f215260…`, `c6760efc…` | tree `f0436f5784dbe34d4c150893c20a60f0431c5d90`; both blobs present at those paths   | match  |
| Preserved old review blobs             | `fc61decb…`, `e6464295…`, `395054fd…`                                | all three resolve to `blob` objects                                                  | match  |
| PR #187 review                         | commit `f8c17dba…`, parent `37d3ed16…`, blob `a92da5e6…`             | commit, sole parent, and blob at the stated path confirmed; branch unchanged         | match  |
| PR #188 review                         | commit `a082036b…`, parent `9eee0caf…`, blob `3cd95847…`             | commit, sole parent, and blob at the stated path confirmed; branch unchanged         | match  |
| PR #189 record                         | commit `3f4cbdd5…`, blob `60404fe5…`                                 | commit and blob at `governance/drafts/research-continuation-2026-09-07.md` confirmed | match  |
| `git diff --check 37d3ed16… 9eee0caf…` | clean                                                                | no output, exit 0                                                                    | match  |

Live PR #186 metadata (mutable) was read from the hosting API at about 08:02 UTC on
2026-09-07: state open, draft, two commits, one changed file, `mergeable_state: clean`.
Its closing user clarification was read; it records that the earlier exact-serving-build
demand was too narrow, that humans performed the investigation/repair and each review
with partial Claude Fable 5.1 assistance in fully separated contexts, and that this
account does not by itself establish a different assisting model across stages. Merge
state from the API is transient and was not treated as content evidence; no merge was
attempted.

**Original artifacts.** The five supplied PDFs (local filenames carry a supplier prefix;
only bytes were compared) were hashed and match C.2, PR #187 Section 4, and PR #189
Section 1 exactly:

| Source |   Bytes | SHA-256                                                            | PDF pages |
| ------ | ------: | ------------------------------------------------------------------ | --------: |
| 04     |  169653 | `4bfbec2b1099968fee729852c5d6c3a8123ba6e5748e1e9583a81d5c5ebdef27` |        24 |
| 09     |  908514 | `bb0bd080601c566697ebb657f81aa6d08cc2a02239a31d4ada7c5a7da2cda701` |        19 |
| 10     |  219412 | `df5671bfb92e0ab64354dad5a117be19d7b536c2d0e2a9cc22ead004b1beb9ba` |         2 |
| 16     | 1777550 | `d96aea58a5490bb4c6e339e3fc9528affa09c10637003ba9f5533ca0d7a632e8` |        18 |
| 19     |  634954 | `4eafd121b98b693aa7fb3386de536a6a4902446cc4f48d8f5c3f2e489615a046` |        21 |

`SOURCE_ACCESS_INCOMPLETE` applies to no in-scope claim. Hash agreement was not treated
as content verification; the pages were read. The C.3 printed-page mapping was verified
for these five artifacts (04: p−1164; 09: p−85; 10: p.229 = PDF page 2; 16: p−489;
19: p−477) and the C.2 page counts match.

## 3. What was read and how

Text was extracted from the original bytes with PyMuPDF; page images were rendered and
inspected at the sites marked "image" below.

| Source | Pages read (printed)                               | Sites checked on page images                                                                            |
| ------ | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| 04     | 1165, 1167–1169, 1172–1175, 1180, 1182–1183        | 1182 (second paragraph on two-sided scope and pairwise comparisons)                                     |
| 16     | 491, 493–506                                       | 493 (FDR-adjusted p-value formula), 495 (Definition 6 and inequality (1)), 506 (Example 2 second stage) |
| 19     | 481–484, 487–491, 493–494, 496–497                 | none needed; the formulas of (5)–(10), Definition 3, Algorithm 2 and the proofs read cleanly in text    |
| 09     | 87–90, 92–93, 95–96, 100–104, plus the JSTOR cover | 88 (rank conditions), 93 (starred interaction footnote)                                                 |
| 10     | 229 (both PDF pages)                               | none needed                                                                                             |

## 4. SR-K primary-source verification (C.4, C.5 row SR-K, C.4.4)

### 4.1 C-K1 — BH dependence and BY variants (source 04)

| C.4.1 row / statement                                                                                                     | Source check (04)                                                                                                                                                                                                                                                                                                                              | Verdict   |
| ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Fixed family of m hypotheses; FDR = E[V/(R or 1)]; BH step-up uses i q/m                                                  | p.1167 (1) `k = max{i : p_(i) ≤ (i/m) q}`; p.1169 §2.1 `Q = V/R` if `R > 0`, `0` otherwise, FDR = E[Q]                                                                                                                                                                                                                                         | supported |
| PRDS on the true-null subset; BH FDR ≤ (m0/m) q; partial-null configurations covered                                      | p.1168 Property PRDS ("for each i ∈ I0 … nondecreasing in x"); Theorem 1.2 "PRDS on the subset of test statistics corresponding to true null hypotheses"; p.1168 "we prove the theorem for the case when not all tested hypotheses are true"                                                                                                   | supported |
| Theorem 1.3: q/Σ(1/j) for arbitrary dependence; proof pp.1182–1183                                                        | p.1169 Theorem 1.3; p.1182 "for any joint distribution of the test statistics"; proof (27)–(29) on pp.1182–1183                                                                                                                                                                                                                                | supported |
| Valid marginal null p-values remain necessary for Theorem 1.3                                                             | proof step (27) uses `Pr(P_i ∈ ((j−1)q/m, jq/m])` summing to `q/m`; p.1180 (21) shows the discrete/super-uniform direction. Investigator inference, correctly labelled as a boundary                                                                                                                                                           | supported |
| Case 1 / Corollary 3.3 / Case 3: certain normal numerators and their absolute values over an independent chi-square scale | pp.1172–1173 Case 1 (one-sided, `σ_ij ≥ 0` for `i ∈ I0`); p.1174 Corollary 3.3 (`abs(Y)` PRDS on I0 and `S²` independent `χ²_ν` ⇒ `abs(Y)/S` PRDS on I0); p.1174 Case 3 (`Σ = I` ⇒ components of `abs(Y)` independent, PRDS over any subset; `Σ ≠ I` MTP2 only under conditions and only when all `μ_i = 0`)                                   | supported |
| Two-sided shared-denominator tests not automatically covered                                                              | p.1174 Case 3's `Σ ≠ I` limitation; p.1182 "the scope of problems for which the two-sided tests retain the same level of control" is stated as open                                                                                                                                                                                            | supported |
| Case 4 / Remark 4.2: signed Studentized statistics need not be PRDS; one-sided at q < 1/2 suffices                        | pp.1174–1175 Case 4 ("Y/S is not PRDS … if q … is less than 1/2, the Benjamini Hochberg procedure applied to Y/S offers FDR control"); p.1180 Remark 4.2 ("PRDS is a sufficient but not a necessary condition … one-sided multivariate t and q < 1/2")                                                                                         | supported |
| Problems 2–3: orthogonal contrasts in a balanced design; one-sided many-to-one; Problem 3's shorthand PRDS statement      | p.1175 Problem 2 "two-sided correlated t-tests, which thus fall under Case 3"; Problem 3 one-sided, `(Y_i − Y_0)/(c_i S)`, `ρ_ij > 0`, "according to Case 4, X is PRDS on the set of true null hypotheses" — the shorthand is verbatim, and C.4.1's warning to read it with Case 4 and Remark 4.2 is correct                                   | supported |
| p.1182 row (S-1 wording): MTP2 and PRDS stated not to hold for pairwise comparisons; FDR control there left open          | image, p.1182: "Another important open question is whether the same procedure controls the FDR when testing pairwise comparisons of normal means, either Studentized or not. Simulation studies … show that this is the case. It is known that the distribution of the test statistics is not MTP2. The PRDS condition does not hold as well." | supported |
| "This is a limitation of this source, not a claim about the current literature"                                           | correct characterization; nothing in C.4 generalizes the 2001 open question to later work                                                                                                                                                                                                                                                      | supported |

**Scope-mapping bullets (investigator derivation).** Bullet 1 (prespecified contrasts
orthogonal in the covariance metric, common variance, residual estimate independent of
the means, two-sided absolute statistics ⇒ Case 3): under joint normality, zero
covariance means independence, so `|Y|` has independent components and is PRDS over any
subset; Corollary 3.3 then transfers PRDS on I0 to `|Y|/S`. The chain is exactly what
pp.1174–1175 (Case 3, Problem 2) license. Bullet 2 (one-sided treatment-minus-control,
positive numerator covariance equal to the control-mean variance, `q < 1/2` ⇒ Case 4):
matches Problem 3 verbatim; the reviewer confirms `Cov(Y_i − Y_0, Y_j − Y_0) = Var(Y_0) > 0`.
Bullet 3 (arbitrary two-sided all-pairs, data-selected family, Welch, estimated general
covariance ⇒ no unadjusted BH control from this source; Theorem 1.3 available only with
valid p-values; no alternative selected): consistent with p.1182 and with the catalogue's
`I-03`. The reviewer found no statement in C.4.1 that the source contradicts.

**Output/numerical boundary.** Image, 16 p.493: "the FDR-adjusted p-value of `H_(i)` is
`p^LSU_(i) = min{ m p_(j)/j | j ≥ i }` … rejecting all hypotheses whose FDR-adjusted
p-value is at most q". No cap at 1 is printed (R-N1 stands as a precision note). The
harmonic form `m H_m p_(j)/j` is labelled investigator algebra, as it should be. The
statement that this is not Storey's q-value definition is correct (Section 4.3).

### 4.2 C-K2 — two-stage and other adaptive procedures (source 16)

| C.4.2 statement                                                                                                                     | Source check (16)                                                                                                                                                                                                                                                                                  | Verdict   |
| ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Definition 6 (TST): BH at `q' = q/(1+q)`; `r1 = 0` ⇒ none; `r1 = m` ⇒ all; else `m̂0 = m − r1` and BH on all m p-values at `q' m/m̂0` | image, p.495 Definition 6, Steps 1–3, verbatim                                                                                                                                                                                                                                                     | supported |
| Theorem 1 and proof pp.497–498 (setup p.496): FDR ≤ q under independence                                                            | p.496 §5 setup (independent statistics; discrete nulls stochastically larger than uniform; `m̂0` increasing in each p-value); p.497 Lemma 1 and Theorem 1 "When the test statistics are independent the two-stage procedure controls the false discovery rate at level q"; proof continues to p.498 | supported |
| Guarantee does not repair invalid p-values; no df/balance/variance model supplied by the rule                                       | §5's only distributional input is the p-value law; correct boundary                                                                                                                                                                                                                                | supported |
| Definitions 2–5 (pp.493–495), Definition 7, Theorem 2's prespecified-rank estimator (p.498) are distinct procedures                 | p.493 Def. 2; p.494 Defs. 3–4 and Def. 5 (continuing to p.495); p.496 Def. 7; p.498 Theorem 2 "quantile adaptive linear step-up procedure" with `m̂0 = (m+1−k)/(1−P_(k))` at "a prespecified quantile"                                                                                              | supported |
| pp.502–504 positive-dependence simulations do not establish a PRDS theorem                                                          | p.502 §6.3: "It is difficult to study analytically … we therefore resort to a simulation study"                                                                                                                                                                                                    | supported |
| pp.499–501 keep the `+1` and `p ≤ λ` conditions of the compared (Storey et al. 2004) procedure                                      | p.495 and p.499: modifications "replacing `{m − r(λ)}` by `{m + 1 − r(λ)}` and further requiring `p ≤ λ` for a hypothesis to be rejected"; p.501 "the theorem … is for the estimator with `(m + 1 − k)`"                                                                                           | supported |
| Motivating inequality (1) on p.495 displays `(m−R)/(1−q) ≤ (m−R)(1+q)`, false for `0 < q < 1`, `m − R > 0`                          | image, p.495 (1): `m̂0 ≤ (m−R)/(1−(R/m)q) ≤ (m−R)/(1−q) ≤ (m−R)(1+q)`; the reviewer recomputed `1/(1−q) > 1+q` for q ∈ {0.01, 0.05, 0.1, 0.5, 0.9}; the paper's "right-most bound is the one implicitly used" is motivation only and Theorem 1 does not depend on it                                | supported |
| p.505 example: BH 4 rejections, TST 8; second example's 138 p-values absent                                                         | p.505 Example 1 lists the fifteen p-values, "Four hypotheses were rejected … at level 0.05", second stage "0.06494, resulting in the rejection of the eight hypotheses whose p-values are less than or equal to 0.0344"; Example 2 gives counts (34 of 138) only                                   | supported |
| Catalogue impact: FDR-03 bounded `RES-ONLY`; adjusted p for an adaptive rule needs its own inversion                                | consistent with the fixed catalogue row FDR-03 `RES-ONLY`†                                                                                                                                                                                                                                         | supported |

### 4.3 C-K3 — Storey estimation and q-values (source 19)

| C.4.3 row                                                                           | Source check (19)                                                                                                                                                                                                                                                                                     | Verdict   |
| ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| 481 Definition 1                                                                    | (1) FDR = E[V/R \| R > 0] Pr(R > 0); (2) pFDR = E[V/R \| R > 0]; "pFDR is identically 1 when all null hypotheses are true (m = m0)"                                                                                                                                                                   | supported |
| 482 Theorem 1 and model                                                             | §3: "identical hypothesis tests … independent statistics", "H_i are independent Bernoulli random variables"; Theorem 1 (3)–(4): pFDR(Γ) = π0 Pr(T ∈ Γ \| H = 0)/Pr(T ∈ Γ) = Pr(H = 0 \| T ∈ Γ)                                                                                                        | supported |
| 483 equations (5)–(10)                                                              | (6) `π̂0(λ) = W(λ)/((1−λ)m)`; (7) `Pr̂(P ≤ γ) = R(γ)/m`; (8) `Q̂`; `R(γ) ∨ 1` replacement; `1 − (1−γ)^m` lower bound for Pr{R(γ) > 0}; (9) `pFDR̂_λ(γ)`; (10) `FDR̂_λ(γ)`; no `+1` anywhere                                                                                                                | supported |
| 487 Theorem 2, proof 496–497                                                        | Theorem 2 `E{pFDR̂_λ(γ)} ≥ pFDR(γ)` and `E{FDR̂_λ(γ)} ≥ FDR(γ)`; "under the assumption that we do not truncate the estimates at 1"; proof (31)–(44) on pp.496–497                                                                                                                                       | supported |
| 484, 488 Theorem 3                                                                  | p.484 recommendation to set the estimate to 1 when it exceeds 1; p.488 Theorem 3 (MSE improvement by truncation)                                                                                                                                                                                      | supported |
| 488–489 Theorem 4 and corollaries                                                   | p.488 assumptions `g(0) = 0`, `g(1) = 1`, `g(λ) > λ`; Theorem 4 limit; Corollary 1 for concave `g` with `g'(1)`; p.489 "If g is not concave, then the optimal λ … may not be λ = 1"                                                                                                                   | supported |
| 490 Definitions 2–3, 491 Algorithm 2                                                | Definition 2 `q(t) = inf pFDR(Γ)` over nested regions containing t; Definition 3 for independent p-values; Algorithm 2 `q̂(p_(m)) = pFDR̂(p_(m))`, `q̂(p_(i)) = min{pFDR̂(p_(i)), q̂(p_(i+1))}`                                                                                                            | supported |
| 490 last paragraph: exact operating characteristics open                            | "The exact operating characteristics … [open] problem, but simulations show that it behaves conservatively"                                                                                                                                                                                           | supported |
| 493–494 bootstrap selection of λ and intervals                                      | §9, (25)–(29), Algorithm 3                                                                                                                                                                                                                                                                            | supported |
| Null uniform (483); Pr(R > 0) bound needs rejection probability ≥ γ; Remark 2 (497) | p.483 "null distribution (i.e. uniform[0,1])"; p.496 "since Pr{R(γ) > 0} ≥ 1 − (1 − γ)^m under independence" — the reviewer confirms this needs each `Pr(p_i ≤ γ) ≥ γ`, which the paper's `g(λ) > λ` setting supplies; p.497 Remark 2 refers weaker-assumption proofs to Storey and Tibshirani (2001) | supported |
| p.481 all-null identity versus C.7 (N-3 wording)                                    | C.7 prints the finite-m estimator gap (0.08 versus 0.4333); the all-null statement is p.481's; the repaired sentence attributes each correctly                                                                                                                                                        | supported |

### 4.4 C.4.4 reopen conditions and closure scope; C.5 row SR-K; C.3

- Each C.4.4 trigger names a concrete condition: family (all-pairs or any non-Case-3/4
  family), sidedness, fixed member set, normal/covariance/independent-scale model,
  `q < 1/2`, marginal p-value validity for Theorem 1.3, adaptive variant other than
  Definition 6, stopping/counting rules, dependence guarantee, Storey estimates used as
  guaranteed rejection rules, `+1` / `p ≤ λ`, data-selected `λ`/regions, mixture/power
  assumptions, truncation/endpoint conventions, source-version/hash change, and
  contradictions in 04 Theorems 1.2/1.3, 16 Theorem 1, 19 Theorem 2. This satisfies
  commission required-analysis item 8 for SR-K and covers PR #187 S-2 (a)–(d).
- C.4.4 keeps the residual all-pairs BH-control question open, keeps `I-03` for
  unsupported families, records the limited source-acquisition reading of `CLOSED` and
  the `PARTIAL` alternative without choosing, and does not adopt the harmonic correction
  as a fallback. The user's scope direction in PR #186 is authorization to proceed, not
  a proof; C.4.4 does not use it as one.
- C.5: `SR-K CLOSED` (candidate only), `SR-G CLOSED`, `SR-L CLOSED` (inherited), eleven
  `INPUT_INCOMPLETE` (SR-A, B, C, D, E, F, H, I, J, RSM-01, RSM-02); totals 3/11/0/0;
  overall `INPUT_INCOMPLETE`; `SOURCE_SET_READY` not satisfied. Recounted mechanically.
  Catalogue classes FDR-01 `R3-CAND`, FDR-02 `R3-CAND`†, FDR-03 `RES-ONLY`†, FDR-04
  `TRANSFER`† match the fixed semantic result (blob `8f215260…`, rows FDR-01–04 and hold
  row SR-K → SRC-22/23/24). The daggers are not removed by the result and not by this
  review.
- C.3: rows 09 and 10 and the page mapping are correct; the C.2 sizes, hashes and page
  counts for 04/09/10/16/19 are correct.

`SR-K` limited `CLOSED` therefore means only what the commission defines: the assigned
sources SRC-22/23/24 were inspected with exact identity, and every decision-bearing C.4
statement for the recorded families, assumptions and variants is directly supported or
correctly labelled as investigator inference. It does not establish BH control for
arbitrary all-pairs families, does not remove `I-03` for unsupported families, and does
not select any procedure.

## 5. SR-G primary-source verification (C.6, C.5 row SR-G, C.3 rows 09/10)

| C.6 statement                                                                                                                                                                         | Source check (09, 10)                                                                                                                                                                                                                                                                                                                                           | Verdict   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Jointly normal unbiased estimates, known covariance shape `a_ij σ²`, independent `σ̂²` with `ν σ̂²/σ² ~ χ²_ν`; rank `k` unrestricted, `k−1` under restriction (1) (N-1)                 | p.87 (4) and the "Model I" assumption; image, p.88: "`ν σ̂²/σ²` has the `χ²` distribution with `ν` D.F. … if the `μ_i` are unrestricted the rank of the covariance matrix with elements (4) is `k`, and … if the `μ_i` are subject to a restriction (1) then the `μ̂_i` are subject to the same restriction (1) and the rank of the covariance matrix is `k − 1`" | supported |
| Half-width `sqrt((k−1) F) · sqrt(s² c'Ac)` for contrasts with `Σ c_i = 0`; `F_(1−α)` lower-tail notation equals the paper's upper-α point                                             | p.87 (2)–(3); p.88 (6)–(7) `S² = (k−1) F_α(k−1, ν)`; p.89 "`F_α(k−1, ν)` denotes the upper α point"; p.89 (8)                                                                                                                                                                                                                                                   | supported |
| Coverage `1−α` for the totality of contrasts, `≥ 1−α` for a subset; data-suggested contrasts covered (p.89)                                                                           | p.89 "the probability is `1 − α` that the values θ of all the contrasts simultaneously satisfy (8)"; "including any suggested by the way the observed means fall out … will be `≥ 1 − α`"                                                                                                                                                                       | supported |
| Data-dependent choice between procedures not licensed (pp.92–93)                                                                                                                      | pp.92–93 "not permissible to use both on the same data and then choose the one with the results we like better — unless … `≥ 1 − 2α`"                                                                                                                                                                                                                           | supported |
| Global F equivalence (pp.95–96) concerns existence of some significant contrast                                                                                                       | pp.95–96 F accepts iff statement (i) for all contrasts, rejects iff (ii)/(iii) for some; p.96 footnote: confidence sphere covers the origin                                                                                                                                                                                                                     | supported |
| Original pp.87–104 continuous; X-1 = 87–104; pp.105–110 not part of the article                                                                                                       | JSTOR cover "pp. 87-104"; page headers 87 … 104 with references ending on p.104; 10 p.229 item (1) "Biometrika (1953), 40, 87–104"                                                                                                                                                                                                                              | supported |
| pp.100–101 power approximations are not numerical certificates                                                                                                                        | p.100 "approximately … moderate or large values of ν"; p.101 (33), (34) "still rougher"                                                                                                                                                                                                                                                                         | supported |
| R4 illustration: centered interaction covariance `v(δ_ik − 1/a)(δ_jl − 1/b)`, `±v/4` off-diagonal for 2×2; balance does not satisfy the deleted footnote's equal-covariance condition | reviewer brute-force check of the formula for (a,b) ∈ {(2,2), (2,3), (3,4)} from the definition `e_ij = m_ij − m_i· − m_·j + m_··`: identical; 2×2 off-diagonals `−1/4` and `+1/4`; labelled investigator algebra, not attributed to the paper                                                                                                                  | supported |
| Closure excludes the 1959 book, other holds, and any specific R4 interval construction                                                                                                | stated in C.6; no R4 method is adopted anywhere in Part C                                                                                                                                                                                                                                                                                                       | supported |

**Nine corrections (10 p.229 item (1)) against the 1953 original.**

| Correction as printed in 10                                                                                                | Site in 09                                                                                                                                                                                     | How confirmed | C.6 row |
| -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------- |
| p.89, l.8 from bottom: `μ̂_1` → `μ̂_i`                                                                                       | p.89 "linear forms in indeterminates `μ̂_1`, is `k − 1`"                                                                                                                                        | text          | matches |
| p.90, l.7: insert comma after `η_j`                                                                                        | p.90 line 7 ("Writing `E(η̂_j) = η_j` we get from (9)")                                                                                                                                         | text          | matches |
| p.93: delete footnote; "Tukey's method does not apply to the interactions, since the `a_ij` are not all equal for `i ≠ j`" | image, p.93 starred footnote "Interactions may also be regarded as contrasts … General superiority of (8) over (14) for the interaction contrasts is indicated by some numerical calculations" | image         | matches |
| p.100, l. below (28): `ψ > A` → `ψ ≥ A`                                                                                    | p.100 "For `ψ > A`, `P_2` is the probability of (28)"                                                                                                                                          | text          | matches |
| p.100, 2nd and 7th lines below (28): `ψ ≤ A` → `ψ < A`                                                                     | p.100 "for `0 ≤ ψ ≤ A`, `P_2` trivially equals 1"; "the value 1 for `ψ ≤ A`"                                                                                                                   | text          | matches |
| p.102, l.16: `ζ̂_1` → `ζ̂_i`                                                                                                 | p.102 "the `ζ̂_1` will be normal with variance `C²σ²`"                                                                                                                                          | text          | matches |
| p.102, l.5 from bottom: insert the `γ < ½π` sentence                                                                       | p.102 after "that the derivative `f'(γ)` is positive", before "Let us write the case of equality in (22)"                                                                                      | text          | matches |
| p.102, l.14 from bottom: `ζ_{k−1}` → `ζ̂_{k−1}`                                                                             | p.102 "equals `ζ_{k−1} tan γ`"                                                                                                                                                                 | text          | matches |
| p.103, 2nd line above (38): insert `w` before `p_1`                                                                        | p.103 "`∫ p_1(w cos γ − B sin γ) p_2(w sin γ + B cos γ) dw`"                                                                                                                                   | text          | matches |

Items (2) and (3) on p.229 concern other authors and are correctly excluded. None of the
nine corrections touches the method statement (1)–(8) or the §2 proof; the closure
candidate's method claims survive them, and the interaction-footnote deletion is the one
correction with methodological content for Release 4 reuse. C.6 preserves it.

`SR-G` source-supportable disposition: `CLOSED` (candidate only; APR-09 stays `R3-CAND`†
until acceptance). X-1 is resolved to pp.87–104 by two artifacts; no purchase of
pp.105–110 is required or requested.

## 6. Reproductions and the reviewer's own recomputation

**C.7 rerun.** The single Python fence of Part C was extracted from blob `47b497d6…` and
executed under Python 3.11.15 (exit 0). Output matched the recorded transcript exactly,
including the Rom and Romano–Wolf lines. Those two lines depend on sources 14 and 31,
which were not supplied to this review; their rerun is code reproduction only and no
primary-source finding about them is claimed (they are outside this record's scope).

**Independent recomputation (reviewer's own exact-rational code, written from the
printed inputs, not from C.7).**

| Item                                                                          | Reviewer result                                                                                                                                                    | Agrees with |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| 16 p.505 Example 1, BH at q = 0.05 on the fifteen printed p-values            | 4 rejections                                                                                                                                                       | source, C.7 |
| TST stage 1 at `q' = 1/21`                                                    | 4 rejections                                                                                                                                                       | source, C.7 |
| TST stage 2 level and count                                                   | `q* = (1/21)(15/11) = 5/77 ≈ 0.06494`; 8 rejections; eighth threshold `0.034632 ≥ 0.0344`, ninth `0.038961 < 0.0459`                                               | source, C.7 |
| 16 p.506 Example 2 second-stage level from printed counts (N-4 optional part) | `(1/21)(138/104) = 0.063187`; image p.506 prints "`q* = (0·05/1·05) × (138/104) = 0·063`"                                                                          | source      |
| p.495 inequality (1), right-most bound                                        | `1/(1−q) > 1+q` for q ∈ {0.01, 0.05, 0.1, 0.5, 0.9}: the printed `≤` is false                                                                                      | C.4.2       |
| Lemma 1 and Theorem 1 closing bound                                           | `E[1/(Y+1)] = (1 − (1−p)^k)/(kp)` for `Y ~ Bi(k−1, p)` verified exactly for k ∈ {1, 2, 3, 5, 10, 25}; with `p = 1/(1+q)`, `q' · m0 · E[1/(Y+1)] ≤ q` in every case | source      |
| 19 (6)–(10) on the five illustrative p-values used in C.7 (λ = 1/2, γ = 0.04) | `W = 2`, `R = 2`, `π̂0 = 4/5`, `FDR̂ = 2/25 = 0.08`, `pFDR̂ = 0.433305`; Algorithm 2 suffix minima monotone                                                           | C.7         |
| Scheffé R4 illustration                                                       | interaction covariance formula verified by brute force (Section 5)                                                                                                 | C.6         |
| `H_15`                                                                        | `3.318…`; p.1183's `log m + 1/2` approximation gives `3.208…`, consistent with "≈"                                                                                 | source      |

The five Storey p-values are investigator-chosen illustrations, not data printed in
source 19 (see finding A-N1); the reproduction verifies the estimator formulas only.

## 7. Prior findings, individually

| Finding (origin) | State at head `9eee0caf…` as verified here                                                                                                                                                                               | Disposition    |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| S-1 (PR #187)    | C.4.1 row wording separates "MTP2 and PRDS do not hold" from "whether BH controls FDR there remains open in its account"; matches p.1182 image; refusal scope unchanged                                                  | `CLOSED`       |
| S-2 (PR #187)    | C.4.4 present; every element (a)–(d) named; consistent with commission item 8 and with the fixed catalogue classes                                                                                                       | `CLOSED`       |
| N-1 (PR #187)    | C.6 states rank `k` / `k−1` under restriction (1); matches p.88 image                                                                                                                                                    | `CLOSED`       |
| N-2 (PR #187)    | C.4.1 cites 16 p.493 for the ordinary-BH suffix minimum; harmonic form remains investigator algebra; matches p.493 image                                                                                                 | `CLOSED`       |
| N-3 (PR #187)    | C.4.3 closing sentence now attributes the all-null identity to p.481 and the finite-m gap to C.7                                                                                                                         | `CLOSED`       |
| N-4 (PR #187)    | pinpoint repaired to pp.497–498 with setup p.496 (correct); optional Example 2 level not added by the author; the reviewer computed it (0.063187, printed 0·063) so the author may record it without further source work | `PARTIAL`      |
| N-5 (PR #187)    | original-token column not added; deferred by the author in C.10; the sites are enumerated in Section 5 of this record                                                                                                    | `DEFERRED`     |
| R-N1 (PR #188)   | p.493 prints no cap at 1; C.4.1 attributes the cap to "the representation here", which is accurate; a three-word clarification remains optional                                                                          | open, cosmetic |
| R-N2 (PR #188)   | the C.9 status line still precedes C.10 rather than closing the file; documentary placement only                                                                                                                         | open, cosmetic |

## 8. New findings

### BLOCKER

None.

### SHOULD-FIX

None.

### NICE-TO-HAVE

- **A-N1 — C.7's Storey inputs are illustrative, not printed data.** File: result C.7,
  Storey block, and PR #187 Section 7 ("from the printed inputs on … 19 p.483"). Source
  19 p.483 prints the estimator formulas (6)–(10), not a five-value p-value set; the values
  `.01, .04, .2, .6, .9` are the investigator's own illustration. The C.7 transcript line
  "Storey fixed-region estimates" is correct as a formula reproduction, but a reader could
  take the inputs as source data. Minimal fix: one clause in C.7 ("on five illustrative
  p-values chosen here"). No impact on any disposition. Re-review: none required.
- **A-N2 — The p.1182 two-sided sentence is not cited.** File: result C.4.1, row "1182
  discussion". The sentence immediately before the pairwise-comparison sentence, "An
  important question that remains to be answered is the scope of problems for which the
  two-sided tests retain the same level of control", directly supports the scope-mapping
  refusal of two-sided many-to-one guarantees and the Case 3 boundary. Citing it would
  strengthen the row's pinpoint. No impact on any disposition. Re-review: none required.
- **A-N3 — Example 2 level now recomputable and printed.** File: result C.4.2 (N-4
  optional part). The printed second-stage level `0·063` on p.506 was confirmed on the
  page image and reproduced from the printed counts as `0.063187`; recording it would
  complete N-4 without needing the 138 p-values. Optional; no impact. Re-review: none
  required.

None of these affects the source support for either candidate, and none requires a
repair commit before acceptance. Any edit to the result would itself require a new
exact-head review.

## 9. Repository validation

Executed in an isolated clone (remote set to the public repository URL, no path to any
other checkout) with the pinned dependencies installed from the lockfile, working tree
at `9eee0caf…`:

| Command                                                                                              | Result                                       | Exit |
| ---------------------------------------------------------------------------------------------------- | -------------------------------------------- | ---: |
| `pnpm install --frozen-lockfile` (offline from the populated store)                                  | "Done"                                       |    0 |
| `pnpm format:check`                                                                                  | "All matched files use Prettier code style!" |    0 |
| `pnpm lint:markdown`                                                                                 | 355 files, 0 issues                          |    0 |
| `node --import tsx tooling/src/validate.ts`                                                          | "… are clean." (validate OK)                 |    0 |
| `git diff --check 37d3ed1626964c20080c26614052e2ce1971d635 9eee0caf6a423d509a996be71df8cff8b4d1e9df` | no output                                    |    0 |

The same commands were re-run after adding this record and passed (recorded in the
review PR). An earlier attempt using a Git worktree failed the validator's
private-dependency audit on the worktree's `.git` pointer file; that was an artifact of
the reviewer's checkout mechanism, not of the reviewed head, and was replaced by the
clone above. No aggregate `pnpm check` was run; unrelated suites were not repeated. A
clean repository check is not evidence of methodological correctness; Sections 4–6 are.

## 10. Verdicts

| Determination                           | Verdict                                                                                                                                                                                                                                                                                                        |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Content review (this record's scope)    | **`GO`** — every in-scope decision-bearing statement of C.4–C.6 is supported by the five originals as read here or is correctly labelled investigator inference; C.7 in-scope calculations reproduced and independently recomputed; no regression in C.4.4/C.10; 0 `BLOCKER`, 0 `SHOULD-FIX`, 3 `NICE-TO-HAVE` |
| `SR-K` source support (04, 16, 19)      | source-supportable `CLOSED` under the bounded C.4.4 reading; the `PARTIAL` reading (if the steward requires the residual all-pairs question to be answered by the hold) remains recorded; the all-pairs BH-control question and `I-03` for unsupported families remain open                                    |
| `SR-G` source support (09, 10)          | source-supportable `CLOSED`; X-1 = pp.87–104; nine corrections complete; interaction-footnote deletion preserved                                                                                                                                                                                               |
| Independence — context                  | `ESTABLISHED` (Section 11)                                                                                                                                                                                                                                                                                     |
| Independence — model level (RFC rule 2) | `PENDING` (Section 11); not a source-access limitation                                                                                                                                                                                                                                                         |
| Formal hold acceptance                  | `NOT PERFORMED`; not authorized by this record                                                                                                                                                                                                                                                                 |

`GO` means only that, at exact head `9eee0caf6a423d509a996be71df8cff8b4d1e9df`, the two
proposed closures are supported by the five original artifacts as independently re-read
in this session, that their stated limits are the sources' limits, and that the fixed
catalogue classes are untouched. `GO` does not close either hold, approve PR #186 for
merge, approve the other twelve C.5 dispositions or the fourteen uninspected artifacts,
reconsider the `NARROW` programme disposition, open public discussion, adopt any FDR or
Scheffé procedure or output contract, adopt any R4 interaction method, repin any Release
4 head, certify any numerical implementation, or authorize a release. The content `GO`
does not resolve the independence status below.

## 11. Independence evidence and its limits

Kept separate from the content verdict.

- **Established: separate context and non-involvement.** This session began on
  2026-09-07T07:58:39Z, after every reviewed commit and after PR #188's commit, from a
  fresh clone of the public repository, with the five PDFs supplied as files and no
  access to any authoring or prior review session's context. It authored none of the
  reviewed material (Section 1). It is therefore not a second pass in the authoring
  context, and it is not a continuation of the PR #187/#188 review session either.
- **Established: reviewer-side model identifier.** `claude-fable-5-1` (configured and
  last-served), read from the session-management service during the review. It is
  recorded here as reviewer session testimony from that service, not as provider-side
  telemetry.
- **Recorded, not verified: authoring-side identifiers.** The repository's own records
  describe the authoring assistance in two ways. Result C.1 says the intake "used an
  LLM-assisted authoring session"; C.10 says the authoring environment "identifies the
  assistant as GPT but does not expose a verifiable exact serving-model identifier"; the
  PR #189 continuation record and the Release 4 successor header say "OpenAI assistant
  support". The user's clarification appended to PR #186 says humans performed the
  investigation/repair and each review "with partial assistance from Claude Fable5.1".
  These accounts are not reconciled in the record: the coordinator-side records name a
  different model family from the user's account of the assisting model. Neither is
  verifiable from Git objects, and this review does not choose between them.
- **Consequence.** RFC rule 2's "separate LLM/model" criterion cannot be marked
  satisfied by this record. If the authoring assistance was GPT/OpenAI as the coordinator
  records state, this pass was performed by a different model; if it was Claude Fable 5.1
  throughout as the user's account can be read, this pass adds a separate context but not
  a separate model. The steward's acceptance record should state which account it
  relies on and on what basis. This is an acceptance prerequisite, not missing source
  access, and it does not weaken the content findings above. The user need not repeat
  the working-arrangement account; what is missing is a recorded reconciliation of the
  two existing accounts.
- **Human responsibility.** This text was produced in an LLM-assisted review session at
  the steward's instruction; accountable human responsibility for commissioning and
  acting on it rests with the steward. No human authorship of this text is claimed.
- **Environment coincidence disclosed.** The managed environment reported the same Node,
  pnpm and PyMuPDF versions as PR #188's environment section. That reflects a shared
  managed image, not a shared session.

## 12. Non-promotions and remaining work

- Steward acceptance of `SR-K` and `SR-G` through the existing hold process, applying
  the reading of `CLOSED` stated in the PR's scope direction and C.4.4, recording the
  reconciliation in Section 11, and carrying N-4's optional part, N-5, R-N1, R-N2 and
  A-N1–A-N3.
- Everything listed as remaining in result C.8, PR #187 Section 11 and PR #188 Section
  10 stays open: the other holds and their originals (including the reported supplier
  item 08, whose bytes and bibliography are not in this session and were not used),
  Shaffer for SR-C, the numerical lane, Release 4 successors, PR #184 Section 5.4, RFC
  and pre-opening review, and every steward decision.
- This record is a review input only; it is not an authoritative artifact. No source
  PDF or full-text extraction is committed with it.

## Public-artifact self-check

- [x] Only the public repository at the fixed head, parent and base, the live PR
      metadata (read time recorded), the preserved review and continuation blobs, and the
      five user-supplied original PDFs were used; no private repository, work item, or
      product implementation was read.
- [x] This file is the only change in the review commit; the reviewed result, both
      commissions, the preserved reviews, the source PDFs, and every authoritative
      artifact are unchanged.
- [x] Attribution is role-based. Material process provenance (separate LLM-assisted
      review session, reviewer model identifier, environment, tooling, date, hashes) is
      disclosed; no unsupported human authorship or non-involvement is implied.
- [x] Source facts, reviewer inference, findings, the content verdict, the independence
      status and the acceptance status are kept separate.
- [x] No merge, hold update, Issue change, discussion opening, method adoption,
      ratification, or release was performed, and none is authorized by this record.

RELEASE 3 SR-K / SR-G ADDITIONAL PRIMARY-SOURCE PASS COMPLETE - CONTENT GO (TWO CANDIDATES ONLY) - MODEL-LEVEL INDEPENDENCE PENDING - FORMAL ACCEPTANCE NOT PERFORMED - NOT MERGE APPROVAL - NOT HOLD CLOSURE - NOT PROTOCOL ADOPTION
