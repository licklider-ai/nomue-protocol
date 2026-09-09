# Independent primary-source review of the bounded SR-J follow-up (PR #248)

**Status: informative independent review of one bounded author record, 2026-09-09.
Verdict for the accuracy of the author record only: `GO`, zero BLOCKER, zero
SHOULD-FIX, six NICE-TO-HAVE notes.** This review checks whether the author
investigation at the fixed head below accurately reports what the three supplied
originals say and what its own calculations show. It does not close SR-J, does not
accept any hold, does not waive or substitute the required Naik (1975) original,
does not select a method and does not authorize implementation, merge, public
opening or release. SR-J remains `INPUT_INCOMPLETE`.

## 1. Task, fixed input and identity gate

The steward supplied the pinned commit `cbbc51143b82d97b29afaa0902ee2a42456d3166`
(PR #248) and asked for Section 10 of
`review-inputs/r3-srj-primary-followup/REVIEW-RESULT.md` to be executed with the
three original attachments. Every identity below was re-derived from Git objects
fetched into this clone and from local bytes; none is copied from the PR body.

| Fixed object                            | Verified value                                                                                                                                                                                                                          |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Reviewed head                           | `cbbc51143b82d97b29afaa0902ee2a42456d3166`; live `research/r3-srj-primary-followup-20260909` head at start and immediately before this review's push                                                                                    |
| Sole parent                             | `95683fc99403dc614e4722fb2ee7ab2760afed37` (PR #247 head; exactly one parent)                                                                                                                                                           |
| Parent's sole parent                    | `0624d98715706f1a940025407a91dccf9e8b3881` (Part U)                                                                                                                                                                                     |
| Tree / parent tree                      | `027e6f895664180fc12db7af76043a1fdbdc2853` / `a767192529cd161f41a1784ad00bcfb7651ac614`                                                                                                                                                 |
| Changed paths versus parent             | exactly two additions: `review-inputs/r3-srj-primary-followup/REVIEW-RESULT.md`, `review-inputs/r3-srj-primary-followup/check-srj.py`; 514 insertions, 0 deletions                                                                      |
| Report blob / bytes / SHA-256           | `572ffb3763a48b57ad77cbde30179728d8a8d5c3` / 27075 / `2c89bd1d153c5f79467aa14009dfa962aff929466ef67cbed34e75b8872a8fbc`                                                                                                                 |
| Script blob / bytes / SHA-256           | `7cec5f5bc1e31d0075ba1b6cc9184b677a44ffd2` / 5008 / `30c450d417828171a54900d34010945f20c282e779785be6beb22e92f11280d2`                                                                                                                  |
| Parts A–U result blob / bytes / SHA-256 | `7f05c96ea2d45ddfcc762bc1f785652dce51f5c3` / 466932 / `802ca0c5adfe8c489ba5365e694237d25e2d6d84a975cef15b20e4dd2fb9a376`; unchanged at the reviewed head                                                                                |
| PR #247 report blob / bytes / SHA-256   | `da6172063d72b3799e1cd47884c496901a6843c7` / 17531 / `d50ad6fb2fce7c2f399c27230da400d2912f59d8ce048c19b7e27be7efdbe882`; unchanged                                                                                                      |
| Commission blob                         | `3c7ddcc696f0c284213f7efe0da68e747bc238d7`; unchanged                                                                                                                                                                                   |
| Fixed semantic comparison               | commit `7bd9c5ab854777c3e99e624d9d2ed62731228852` exists; `semantic-research-result.md` there is blob `8f21526040924b891f64724c2d0fde9ea94eff92`                                                                                        |
| PR #248 metadata                        | head `cbbc5114…`, base `review/r3-srd-acceptance-20260909` at `95683fc9…`; PR #247 head still `95683fc9…`; PR #248 body identities equal the values above                                                                               |
| Live `main`                             | `0abdca8f822d0de3faf35f218f762a951fd75e9e` at review time (the author compared against `ed6e9d9b…`, which is no longer the tip)                                                                                                         |
| Read-first files                        | `AGENTS.md`, `CHARTER.md`, `AUTHORITY.md`, `authority/authority-manifest.yaml`, `registries/requirements.yaml`, `governance/ID-POLICY.md`, `governance/RFC.md`: blobs identical at the reviewed head, at `ed6e9d9b…` and at live `main` |
| Nested `AGENTS.md`                      | only `spec/`, `conformance/`, `reference/`; none applies to `review-inputs/`                                                                                                                                                            |

Section 1 of the author record is therefore accurate in every identity it states.
Parts A–U and all prior artifacts are unchanged at the reviewed head.

## 2. Role, prior involvement and independence limits

- Role: independent primary-source reviewer executing REVIEW-RESULT.md Section 10.
  The judgement target is the accuracy of the bounded author record, separate from
  SR-J source completion.
- Prior involvement: none. This is a fresh Claude Code remote session
  (`session_01KbcdmXLKQExA7TLJLbgYmb`) that did not author PR #248, #247, #245,
  #244 or any Part A–U, and took part in no acceptance conversation.
- Model and context basis: the session service reports configured model
  `claude-fable-5-1` and last-served model `claude-fable-5-1`. The record under
  review is, by its own account, OpenAI Codex-assisted author work, so this pass is
  a different model family from the author. It is the same model family that PR
  #244 and PR #247 report for themselves. Git identity is not model evidence and no
  model-build verification is claimed.
- Not blind: Section 10 requires reading the author report first. REVIEW-RESULT.md,
  `check-srj.py`, the PR #248 body, the commission, result Parts N and U, the PR
  #247 report and the Read-first files were read before the originals. The
  characterizations below were then checked against the originals directly.
- Reading method: Dunnett–Tamhane 1991 and 1992 carry text layers; their complete
  extracted text was read, and printed pp. 941, 942, 943, 945, 946, 947 (1991) and
  pp. 164, 165, 168, 169, 170 (1992) were read as page images. Hsu 1984 has no text
  layer; all nine pages were read as page images. Tools: PyMuPDF 1.28.2 for
  extraction and rendering; pages rendered at 110 dpi.
- Not verifiable here: the author's own process claims (which pages the author
  viewed as images, the archive `03_…zip` identity for supplier 29, the HTTP 403
  from the publisher). Outbound access to `doi.org`, `tandfonline.com` and
  `api.crossref.org` is denied by this environment's egress policy, so the Naik
  DOI resolution is unverified from here. Naik (1975) was not read and remains
  required.

## 3. Original attachments: hashes, bytes, pages, page mapping

| Attachment            |   Bytes | PDF pages | SHA-256                                                            | Text layer  |
| --------------------- | ------: | --------: | ------------------------------------------------------------------ | ----------- |
| `42_Dunnett_1991.pdf` |  634124 |         9 | `ed93660e9e8286f1ff2e0026f972c783ac523ac96465e1689e17b4f99a960161` | yes         |
| `29_Dunnett_1992.pdf` | 1099979 |        10 | `f1144f4ca64d874d1d812cfc6b0b8f9d275d2251619796805d5ac955594386f6` | yes (OCR)   |
| `05_Hsu_1984.pdf`     |  649578 |         9 | `ac190ceeb614141b64da413248d94e3a3cfe050ab42be31ef7b4dc8db089065b` | none (scan) |

All three equal the author's Section 2 table and the existing custody rows in the
result file (Part C row for 05, Part D rows for 29 and its archive, Part N row for
42). Page mapping confirmed: 42 PDF page + 938 gives 939–947; 29 PDF page 1 is a
publisher cover and PDF pages 2–10 give 162–170; 05 PDF page + 1135 gives 1136–1144.
Bibliographic identities on the first pages match Section 2 (Statistics in Medicine
10:939–947; JASA 87:162–170, DOI on the cover; Annals of Statistics 12(3):1136–1144).

## 4. Dunnett–Tamhane 1991 (MTO-02): source checks and independent recomputation

Every claim below was checked on the printed page named.

- p. 941: model (independent normal means, common unknown variance, pooled `S^2`
  with `v = Σ n_i − (k+1)` df); statistics (1); product correlation
  `ρ_ij = λ_i λ_j`, `λ_i = 1/√(1 + n_0/n_i)`, which equals the author's
  `√(n_i/(n_i+n_0))`; relabelling by observed `t`, with the explicit sentence that
  the random variables are not assumed ordered; step-down rule with **strict**
  `t_m > t^{(α)}_{m,v,R_m}`; FWE control attributed to Hochberg and Tamhane pp.
  54–56 and, on p. 940, to Marcus et al.'s closure argument. Author Sections 4.1
  and 4.2 are accurate on all of these.
- p. 942: (3) local `p'_m`, (4) `p_m = max(p'_m, p_{m+1})`, i.e. the suffix
  maximum; rejection at `p_m ≤ α` (**inclusive**); the sentence "there is no
  analytical proof that this approximation is always conservative" for the
  average-correlation approximation; the Holm paragraph reads, verbatim, "Then
  `m p''_m` is the Bonferroni upper bound on `p_m`", where `p_m` is the adjusted
  value defined by (4). Two-sided version (5) with absolute statistics.
- p. 945, Table II, row `m = 1`: `m p''_m = 0.109`, `p'_m = 0.109`, `p_m = 0.151`.
  So `0.109 < 0.151`: the printed table contradicts the p. 942 sentence read
  literally, exactly as the author says. The union bound does give
  `p'_m ≤ m p''_m`, and the suffix maximum of the `m p''_m` (`0.170` at `m = 1`)
  does bound `p_m`. **The author's Section 4.3 correction is verified and is a
  wording/formula-target problem only; the stopped step-down procedure is not
  affected.**
- p. 946: Table IV's lower limits use Dunnett's single-step constant
  `t^{(α)}_{k,v,R_k} = 2.19`, and pp. 946–947 say the step-down method "is for
  significance testing only". Author Section 4.4 is accurate.
- p. 947: acknowledgements state that additional data enabled the statistics "with
  greater precision"; reference 7 is Naik (1975), Communications in Statistics –
  A, 4, 519–535; reference 8 is Marcus, Peritz and Gabriel (1976), Biometrika 63,
  655–660.

Independent recomputation (reviewer code, not the author's): the product-correlation
rectangle was evaluated by nested adaptive quadrature (`scipy.integrate.quad` over
the chi-scale and the common normal factor), which is a different scheme from the
author's Gauss–Hermite/generalized-Laguerre rule, and cross-checked with SciPy's
`multivariate_t.cdf` (Genz quasi-Monte Carlo). SciPy 1.17.1, NumPy 2.4.6.

| Quantity (ranks 1–5)               | Reviewer values                                                 | Author values                             | Printed                       |
| ---------------------------------- | --------------------------------------------------------------- | ----------------------------------------- | ----------------------------- |
| local `p'_m`                       | .108618427, .150451054, .036242938, .025396276, .000073152      | identical to nine decimals                | .109 .151 .037 .025 .000      |
| adjusted `p_m`                     | .150451054, .150451054, .036242938, .025396276, .000073152      | identical                                 | .151 .151 .037 .025 .000      |
| `m p''_m`                          | .108618, .170334, .040321, .028646, .000075                     | .108618427 (m=1), .170334133 (cumulative) | .109 .170 .040 .029 .000      |
| exact 5% two-sided critical values | 1.985801813, 2.246333594, 2.391292357, 2.488934240, 2.562465052 | agree to 1e-8                             | 1.986 2.246 2.391 2.489 2.562 |
| Bonferroni `t_{v}^{(.05/m)}`       | 1.9858, 2.2783, 2.4381, 2.5472, 2.6297                          | not reported                              | 1.986 2.278 2.438 2.547 2.630 |
| Genz cross-check                   | `m = 2`: .150451; `m = 5`: .000073                              | —                                         | —                             |

Challenge to the ".001 corroboration" and the rounded-input explanation: from the
two-decimal statistics the reviewer obtains `.1505` and `.0362`, which round to
`.150` and `.036`, not the printed `.151` and `.037`. Sensitivity of the reviewer's
own integral to the unprinted third decimal: `p'_2` is `.1519` at `t = 1.735` and
`.1490` at `t = 1.745`, so `.151` is reached near `t ≈ 1.738`; `p'_3` is `.0367`
at `t = 2.515`, so `.037` is reached for `t` in `[2.515, 2.520)`. Both printed
values therefore lie inside the rounding envelope of the printed two-decimal
statistics. The author's statement that no numerical erratum follows from
recomputing rounded statistics is supported, and its refusal to claim exact
printed-decimal reproduction is correct.

Table IV (second family, `n_0 = 10`, sizes 10, 9, 10, 12 in rank order): reviewer
adjusted `p_m` = .911, .911, .905, .486 against printed .91, .91, .90, .49 (the
printed column is the adjusted value; the local `p'_1` is .727); the one-sided 5%
point of the four-variate maximum is 2.1886 against the printed 2.19. The author
did not claim these; they are additional evidence that the Table IV limits are
single-step constants as Section 4.4 says.

Author argument 4.2 (sufficient FWER control): checked and sound. It is the
standard argument: at the first true rejection the remaining labelled set contains
the true set `I`; the maximum quantile of a superset is at least that of `I`
because the exceedance event of the superset maximum contains that of `I`; under
nonpositive shifts the true statistics are coordinatewise no larger than the
central vector. The record correctly does not claim intervals or robustness.

## 5. Dunnett–Tamhane 1992 (MTO-03): source checks and independent recomputation

- p. 163: common variance and common known correlation; independent `χ²` variance
  estimate; example (2) gives `ρ = n/(n_0 + n)` for equal treatment sizes with a
  possibly different control size. Accurate in Section 5.
- p. 164: SU rule "accept `H_(i)` iff `H_(j)` accepted for `j = 1, …, i−1` and
  `t_(i) < c_i`", i.e. first crossing `t_(i) ≥ c_i` rejects that and all larger;
  Theorem 3.1 (least-favourable configuration at `θ_i → ∞` for false hypotheses)
  with its proof "given in Dunnett and Tamhane (1990)", Technical Report 90-1;
  (3.1) calibrates by the ordered event `(T_1,…,T_m) < (c_1,…,c_m)` in the
  order-statistic sense; existence of nondecreasing finite solutions "for arbitrary
  `m`" is not shown, only for `m = 2` (again "see DT"), plus computational
  experience for `m ≤ 8` and independent statistics up to 1,000; Proposition 3.1:
  `c'_m < c_m < c''_m` for `m > 1`, with `c'_m < c_m` argued on the page and
  `c_m < c''_m` "proved only for `m = 2` in DT" and conjectured for `m > 2`; the
  page then states SU is uniformly more powerful than HC "because of" that
  inequality for `m > 2`. Author Section 5 is accurate on every point.
- p. 165: Lemma 3.1 recursion by conditioning `Z_m` on successive intervals; the
  `c'_m` may be used for `m > 8` "a bit on the liberal side". Accurate.
- p. 168: SD adjusted `p̃_(m) = max(p̃'_(m), p̃_(m+1))`; SU adjusted
  `p̃_(m) = min(p̃'_(m), p̃_(m−1))` with `c_1 ≤ … ≤ c_m`, `c_m = t_(m)` and the
  implicit equations `P{(T_1,…,T_i) < (c_1,…,c_i)} = 1 − p̃'_(m)`, `i = 1,…,m`.
  The author's "prefix minimum, not a suffix maximum or marginal-p multiplication"
  is accurate.
- p. 169: Table 6 constants and the two examples read exactly as the author's
  table; the text confirms SD rejecting only `H_6` (since `t_5 = 2.320 <
c'_5 = 2.335`) and SU rejecting `H_2`–`H_6` (since `t_2 = 2.020 > c_2 = 2.008`)
  in Example 1, and SD `H_2`–`H_6` versus SU `H_4`–`H_6` in Example 2.
- p. 170: the proof of Theorem 3.1 "makes crucial use of the equal correlation
  assumption"; unequal-correlation constants and the conservatism of an
  average-correlation approximation "would require investigation". References list
  Dunnett and Tamhane (1990) Technical Report 90-1; Marcus, Peritz and Gabriel
  (1976) Biometrika 63, 655–660; Naik (1975) Communications in Statistics, Part
  A, 4, 519–535.

Independent recomputation. The ordered event for iid normal components was
evaluated by a multinomial cell-count dynamic programme (not Lemma 3.1's recursion)
and agreed with brute-force enumeration to 1e-13 on four threshold vectors including
ties; the outer integrals used nested adaptive quadrature. Constants were solved
recursively by root finding.

| Table / setting                        | Reviewer values                                | Printed                                  |
| -------------------------------------- | ---------------------------------------------- | ---------------------------------------- |
| Table 1, `ρ = 0`, `v = ∞`, `m = 1…5`   | 1.6449, 1.9600, 2.1230, 2.2349, 2.3192         | 1.645, 1.960, 2.123, 2.235, 2.319        |
| Table 1, `ρ = .5`, `v = ∞`, `m = 1…4`  | 1.6449, 1.9330, 2.0708, 2.1651                 | 1.645, 1.933, 2.071, 2.165               |
| Table 6, SU `c_m`, `ρ = .5`, `v = 30`  | 1.6973, 2.0077, 2.1573, 2.2602, 2.3385, 2.4016 | 1.697, 2.008, 2.157, 2.260, 2.339, 2.402 |
| Table 6, SD `c'_m`, `ρ = .5`, `v = 30` | 1.6973, 1.9890, 2.1473, 2.2546, 2.3352, 2.3994 | 1.697, 1.989, 2.147, 2.255, 2.335, 2.399 |
| Table 7, Example 1, SD `p̃'_m`          | .0720, .0470, .0405, .0475, .0516, .0405       | .072, .047, .041, .048, .052, .041       |
| Table 7, Example 1, SD adjusted `p̃_m`  | .072, .052, .052, .052, .052, .041             | .072, .052, .052, .052, .052, .041       |
| Table 7, Example 1, SU `p̃'_2`, `p̃'_3`  | .0488, .0412                                   | .049, .041                               |

Every printed constant used by the author's decision reproductions is reproduced by
the reviewer's own construction to the printed precision. This goes beyond the
author's stated bounded corroboration (which reused the printed constants) and
supports the author's characterization of the calibration event. The remaining SU
adjusted values, Table 2 (two-sided) and the finite-df tables for other `ρ` were not
recomputed.

Author argument 5.1: checked and sound. Given a nondecreasing sequence and the
event `V_j < c_j` for all ordered true statistics, a first crossing at rank `r`
followed by a true null forces a true `V_j ≥ t_(r) ≥ c_r ≥ c_j` with `j ≤ r`, a
contradiction. Note N-3 below records a consequence the author did not draw.

## 6. Hsu 1984 (MCB-01): source checks

Read on the page images.

- p. 1136: target `θ_i − max_{j≠i} θ_j`; intervals
  `[−(Y_i − max_{j≠i} Y_j − d)^−, (Y_i − max_{j≠i} Y_j + d)^+]`, which is the
  author's `[min(Δ_i − d, 0), max(Δ_i + d, 0)]`; lower bounds imply indifference
  zone selection and upper bounds imply subset selection.
- p. 1137: independent samples of size `n`; distributions differ in location only,
  `F` absolutely continuous; ties in `θ` broken "in any manner"; statistics `T`
  with the translation property; parametric `T_ij = Y_i − Y_j` for a translation
  equivariant `U`.
- p. 1138: pivotal event `E` with `A` monotone and permutationally invariant and
  `P[E] ≥ P* ≥ 1/k`.
- p. 1139: Theorem 3.1, "for all `θ`", `P[D*_i ≤ θ_i − max_{j≠i} θ_j ≤ D**_i for
all i] ≥ P*`; the proof is by event inclusion `E ⊆ E_1 ∩ E_2`.
- p. 1140: parametric `E = {Y_(k) − Y_(i) − (θ_(k) − θ_(i)) > −d}`; `d` from
  `∫[G(z+d)]^{k−1} dG(z) = P*` when `G` is known, and for the normal case
  `d = d' s/√n` with `d'` from the double integral over the distribution of
  `s/σ`. The author's "arbitrary univariate t or Sidak constant is not licensed"
  is a correct reading.
- p. 1141: (3.2) upper-bound inference; the tie discussion; indifference-zone
  reading of the lower bounds.
- pp. 1142–1144: MCtB extension and references; read for scope only.

The author's event-inclusion verification in Section 6 was re-derived by hand and
also exercised on 14,417 randomized integer configurations with ties for `k = 3…5`
(reviewer code, using the paper's strict event); no violation. The author's
statements that every constrained interval contains zero, that coverage is "at
least" and not equality, and that MCB-01 is a selection-type entry distinct from a
fixed-control family are accurate.

## 7. Bibliography, X-3 and X-8, and the missing original

- X-3: both reference lists (1991 ref. 7, p. 947; 1992 p. 170) identify Naik, U. D.
  (1975), "Some selection rules for comparing p processes with a standard",
  Communications in Statistics, Part A – Theory and Methods, 4, 519–535. The 17
  printed pages requested by the author is the correct count. This settles
  bibliographic identity only; the article's contents remain unread and required.
- X-8: both lists cite exactly one Marcus item, the three-author 1976 Biometrika
  63:655–660 paper, which is SRC-18. Neither list cites a single-author Marcus
  1976 text. The author's proposal (map SRC-28's "Marcus (1976)" to SRC-18) is
  supported by the inspected lists; as the author says, the mapping is for the
  integration review and steward to accept, and it does not alter SR-D's accepted
  scope.
- The publisher DOI and the HTTP 403 are not verifiable from this environment
  (egress denied). No conclusion about access routes is drawn here either.
- No waiver, alternate-basis acceptance or reduced-scope decision is made or
  recommended by this review.

## 8. Script and repository checks (actual outputs)

Executed at the reviewed head in a detached checkout, same lockfile, `pnpm install
--frozen-lockfile`; Node v22.22.2, pnpm 11.7.0, Prettier 3.9.6, markdownlint-cli2
v0.23.2.

- `python3 review-inputs/r3-srj-primary-followup/check-srj.py` (Python 3.11,
  SciPy 1.17.1, NumPy 2.4.6): printed the Section 4–6 values exactly as reported and
  ended `ALL BOUNDED SR-J DIAGNOSTICS PASSED`; exit 0; 1.3 s. The author reports
  SciPy 1.17.0; the difference is disclosed and produced no change.
- `pnpm format:check`: "All matched files use Prettier code style!"; exit 0.
- `pnpm lint:markdown`: "Linting: 361 files … Summary: 0 issues in 0 files"; exit 0.
- `node --import tsx tooling/src/validate.ts`: "validate: OK - registries,
  traceability, normative lint, authority, gates, conformance manifest, links,
  private-dependency and language audits, phase-1 schemas, cross-checks, code-path
  audits, and the snapshot manifest mechanism are clean."; exit 0. (A first run in
  a `git worktree` failed the private-dependency audit on the worktree's own
  `.git` pointer file, which contains an absolute home path; that is an artifact of
  the worktree mechanism, not of the reviewed commit, and the run in the primary
  clone at the same head is the one reported.)
- `git diff --cached --check` and `git diff 95683fc9…..cbbc5114… --check`: no
  output; exit 0.
- Not run: full `pnpm check`, tests, typecheck, generated checks, Phase 1/2 suites,
  earlier statistical diagnostics. The reviewed change adds no authoritative
  artifact.

## 9. Findings

**BLOCKER: none.** **SHOULD-FIX: none.** Every source characterization, pinpoint,
identity, table value and numerical claim examined was found accurate, and the
author's two sufficient arguments are sound.

NICE-TO-HAVE (none moves the verdict; none is required before integration):

- N-1: `check-srj.py` `rectangle()` hard-codes the control size 11
  (`11 + np.array(sizes)`) while taking `sizes` as a parameter; it is correct for
  Table II only. Parameterize or comment.
- N-2: Section 5 could say explicitly that the `m = 2` existence result and the
  `m = 2` inequality `c_2 < c''_2` are both only cited to the uninspected 1990
  report (the 1992 paper prints neither proof), and that the paper's own "SU is
  uniformly more powerful than HC" statement (pp. 164–165) rests on the
  conjectured inequality for `m > 2`.
- N-3: the Section 5.1 argument gives the FWE bound for every configuration once
  (3.1) calibration and monotone constants are assumed; Theorem 3.1's
  least-favourable result is then not needed for the bound (it identifies where
  equality holds). The record says only that it "does not prove" the theorem; the
  stronger, still-conditional statement could be recorded.
- N-4: Section 4.3 calls `.108618427` the "unadjusted Holm bound"; it is the
  `m = 1` marginal Bonferroni bound `1·p''_1`. "Holm" is normally reserved for the
  suffix maximum (`.170334133`), which the record does compute.
- N-5: Section 1 compares the Read-first files against `main` at `ed6e9d9b…`;
  `main` had moved to `0abdca8f…` by review time. The seven blobs are still
  identical, so nothing changes; future records could state the compared commit's
  role as a snapshot rather than "fetched main".
- N-6: the record's Table IV discussion could note that the printed `p_m` column
  is already the adjusted value (the local `p'_1` is about .73), so the second
  family exhibits the suffix-maximum effect as well.

## 10. Verdict and boundaries

- The bounded author record at `cbbc5114…` is **accurate**: `GO` for the record's
  accuracy, zero BLOCKER, zero SHOULD-FIX.
- SR-J: remains `INPUT_INCOMPLETE`. Naik (1975) is required and unread. No source
  substitution, waiver, hold acceptance, method selection, implementation, merge,
  public opening or release is authorized or recommended by this review. The 1991
  paper supports its own bounded construction only.
- Ledger unchanged: 8 `CLOSED` (SR-B, SR-C, SR-D, SR-F, SR-G, SR-I, SR-K, SR-L),
  1 `PARTIAL` (SR-H), 5 `INPUT_INCOMPLETE` (SR-A, SR-E, SR-J, RSM-01, RSM-02);
  overall `INPUT_INCOMPLETE`, `SOURCE_SET_READY=false`, `NARROW`, `TRANSFER`, all
  `R3-CAND`/`RES-ONLY` tokens, scoped SR-D and SR-I acceptances, custody 42+1 and
  R4 unchanged.
- Executed here: identity re-derivation; hash, byte and page verification of the
  three originals; direct reading of the pinpointed pages; independent
  recomputation of Tables II, III and IV (1991), Table 1 (two settings), Table 6
  and part of Table 7 (1992); Hsu event inclusion; the author script; the four
  repository checks.
- Not executed: Naik retrieval or reading; publisher/DOI verification; archive
  identity for supplier 29; the author's image-check process; two-sided step-up
  constants; the full step-up adjusted-p table; any coverage simulation for Hsu;
  full `pnpm check`.
- This review is added on the neutral branch
  `review/r3-srj-primary-followup-20260909` as the single file
  `review-inputs/r3-srj-primary-followup/INDEPENDENT-REVIEW.md`, with a separate
  draft PR against `research/r3-srj-primary-followup-20260909`. No session-labelled
  mirror branch was created and nothing is merged.
