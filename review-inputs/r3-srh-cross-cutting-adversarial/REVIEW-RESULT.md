# Release 3 SR-H Research Result — Cross-Cutting Adversarial Independent Review (Parts I–L, C.2/C.3/C.7, Continuation Sections 15–17, and the Four Prior SR-H Reviews)

**Status: informative independent review result; non-normative; not adopted.**
This record is a separate-context, exact-head, cross-cutting review of the SR-H evidence
chain that supports the `SR-H` `PARTIAL` candidate and the acceptance preparation in
continuation Section 17. Its purpose was not to re-confirm the four prior `GO` verdicts
but to look, across the originals, the mathematics, the procedures, the evidence chain,
and the approval scope, for errors or over-statements that the prior reviews could have
missed in common. Attacks that found nothing are recorded as such. The review selects no
Contract, procedure, variant, identifier, schema, Public Check, tolerance, critical value,
interpolation or monotonization rule, implementation, RFC decision, R4 method, or release
outcome; it updates no hold, issue, gate, or catalogue class; it merges nothing and
accepts nothing. Attribution is role-based; material process provenance is disclosed in
Sections 1 and 13.

**Summary of verdicts (defined in Section 12):**

| Axis                                                              | Verdict                                                                                                                                                                                                                                                                                                                                                                         |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A. Source support of the decision-bearing claims                  | `GO` for the six originals inspected here (Hayter, Keuls, Ryan, Einot–Gabriel, Welsch, Duncan); `SOURCE_ACCESS_INCOMPLETE` for Newman (1939), which was not supplied to this session. No claim was contradicted by a page.                                                                                                                                                      |
| B. Mathematical reasoning and numerical diagnostics               | `GO`. Every recorded deduction re-derived; every diagnostic reproduced and independently recomputed by a different route; no counterexample found by the attacks in Section 7.                                                                                                                                                                                                  |
| C. Review reuse and evidence chain                                | `GO` with precision corrections (N-X4, N-X5). No instance of a prior `GO` standing in for a page was found; every coverage claim traces to a page-image reading.                                                                                                                                                                                                                |
| D. Approval scope, independence records, state                    | `GO` with precision corrections (N-X6, N-X7). Approvals are scoped as recorded; the ledger, precedence, `NARROW`, `RES-ONLY` classes and the 35-original count are correct; historical `PENDING` statements are preserved byte-exactly.                                                                                                                                         |
| E. Overall: `SR-H` `PARTIAL` candidate and acceptance preparation | **`GO` with one `SHOULD-FIX` (S-X1)** — supported on this review's own evidence for six of the seven texts, on PR #211's page-level verification for Newman. S-X1 does not change the candidate disposition but narrows one of the named gaps and must be repaired before that gap is characterized further. Not an unconditional `GO`; steward decisions listed in Section 11. |

Findings: `BLOCKER` 0 / `SHOULD-FIX` 1 / `NICE-TO-HAVE` 7 (Section 9). Of these, one
reopens a prior optional finding with independent confirmation (A-N1 of PR #211, now
confirmed on the page and resolvable); the rest are new. No prior finding is repeated as a
new count.

## 1. Review identity, role, independence, and disclosures

| Field                     | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository                | `licklider-ai/nomue-protocol` (public)                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Primary reviewed object   | PR #207, head `044078d3b19ff3307dc347b0b9e7ecbbed1750c6` (branch `research/r3-srh-range-review-followup-20260908`), result path `governance/drafts/release-3-preparation/semantic-source-acquisition-result.md`                                                                                                                                                                                                                                                                                   |
| Review date               | 2026-09-08 (UTC)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Reviewer role             | cross-cutting adversarial independent reviewer, commissioned by the user for the SR-H research result and its acceptance preparation; not an author-side repair role                                                                                                                                                                                                                                                                                                                              |
| Non-involvement           | this session did not author, revise, or repair the acquisition commission, any Part of the result (A–L), the continuation record, or any of the four prior SR-H review records (PR #201, #203, #206, #211). It was created at 2026-09-08T04:27:40Z, after the reviewed commit (02:14:13Z), PR #207 (02:14:51Z) and PR #211 (02:37:18Z), from a fresh clone. None of the prior review sessions are this session.                                                                                   |
| **Not a blind review**    | **The four prior review records (PR #201, #203, #206, #211) and continuation Sections 15–17 were read in full before any original was opened and before any provisional verdict was fixed.** The task required comparing the prior reviews; the ordering (sources first, reviews second) that the task suggests was therefore not followed for the reading step. Independence of the source readings below rests on the fact that every claim was re-checked on the page image, not on blindness. |
| Same model family         | The review side of every prior SR-H review record reports the same provider/model family as this session (Section 13). Correlated blind spots across the review chain are therefore possible; this review does not remove that risk, it only adds one more pass with a different (cross-cutting, adversarial) posture.                                                                                                                                                                            |
| Originals inspected       | six lawfully supplied PDFs (Section 3), delivered as local uploads; no retrieval, purchase, or redistribution. **Newman (1939) was not supplied and was not read.**                                                                                                                                                                                                                                                                                                                               |
| Review branch             | `review/r3-srh-cross-cutting-adversarial-20260908`, created from the reviewed head as sole parent; the name was unused at creation time (checked with `git ls-remote --heads`)                                                                                                                                                                                                                                                                                                                    |
| Files added               | this file and the five diagnostic scripts under `scripts/` (Section 13); nothing else                                                                                                                                                                                                                                                                                                                                                                                                             |
| Not stored in Git         | the PDFs, page images, text extractions, and scratch outputs                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Comment on any PR         | none posted                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Designated harness branch | The session harness designated `claude/file-sharing-uvwdc8`; the user's task instruction explicitly required an unused neutral review branch instead, so that instruction was followed and no push was made to the harness branch                                                                                                                                                                                                                                                                 |

Read before source work, in the `AGENTS.md` order: `CHARTER.md`, `AUTHORITY.md`,
`authority/authority-manifest.yaml` (outline), `registries/requirements.yaml` (outline),
`governance/ID-POLICY.md`, `governance/RFC.md` (research-gate rules 2, 4, 5, 6 in
particular); the pinned acquisition commission; result Parts C.1–C.3, C.7, I, J, K, L in
full and Parts A/B/D/H as needed for identities and the H.5 ledger; continuation Sections
11–17; the fixed semantic input's Sections 2.2, 8, 17 and 20. No directory-local
`AGENTS.md` applies to `review-inputs/` or `governance/`.

## 2. Fixed identity verification (start and end of review)

Live state was read at review start (before any source work) and again immediately
before the review commit. Nothing moved; `STALE_HEAD` does not apply. Every fixed input
named in the task was recomputed locally from fetched Git objects.

| Item                            | Expected                                                                                                                                                                           | Observed                                                                                                                                                                                                         | Result |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| PR #207 live head (start / end) | `044078d3b19ff3307dc347b0b9e7ecbbed1750c6`                                                                                                                                         | PR `head.sha` and `origin/research/r3-srh-range-review-followup-20260908` both `044078d3…` at start and at end; draft, open, unmerged, `mergeable_state: clean`; five check runs on the head all `success`       | match  |
| Sole parent / tree              | `070e5dd569f0dfcb6f15ec49daebc0544af217d9` / `a24aa097da7b5e8eb0978bc18fa76f9279e32cea`                                                                                            | `git log --format=%P %T`: one parent `070e5dd5…`, tree `a24aa097…`                                                                                                                                               | match  |
| Result blob / bytes / SHA-256   | `ff2ee8c3ca08b57ecc62c143a46153b02bcd04f7` / 334121 / `02290488c7a9997b72caf228bb6e32a03465b4117d65f456826b5a3fa957acb1`                                                           | `git rev-parse`, `git cat-file -s`, `sha256sum` — all equal                                                                                                                                                      | match  |
| Change set parent → head        | result file only, append-only                                                                                                                                                      | `git diff --stat`: one file, +111/−0                                                                                                                                                                             | match  |
| Prefix chain A–K / A–J / A–I    | head blob's first 326756 bytes = parent blob; parent's first 303208 = `1b2a1efa…` blob; that blob's first 297669 = `81835178…` blob                                                | `cmp` exits 0 for all three                                                                                                                                                                                      | match  |
| Continuation record             | commit `a0db221edec78377d867bf0f4636d684d44dc5af`, blob `ea44c75032d12c5c635459129972ccf71ae73134`                                                                                 | `git rev-parse a0db221e…:governance/drafts/research-continuation-2026-09-07.md` = `ea44c750…`; Sections 15–17 present                                                                                            | match  |
| Commission                      | commit `f39100161cb45de15767bdb19ed54aba9489b41a` (= `origin/main`), blob `3c7ddcc696f0c284213f7efe0da68e747bc238d7`                                                               | equal                                                                                                                                                                                                            | match  |
| Fixed semantic input            | commit `7bd9c5ab854777c3e99e624d9d2ed62731228852`, tree `f0436f5784dbe34d4c150893c20a60f0431c5d90`, blob `8f21526040924b891f64724c2d0fde9ea94eff92`                                | tree equal; the blob is at `governance/drafts/release-3-preparation/semantic-research-result.md` in that tree (the task's phrase "semantic result blob" refers to that path, not to the acquisition result path) | match  |
| PR #201 review                  | `92867850f00d9d3a0f0f62b527707cb198196f51`, blob `39232d73052774cabeab6c090c29deed64b6126c`                                                                                        | equal; 52801 bytes                                                                                                                                                                                               | match  |
| PR #203 review                  | `f30cd00d01666ec07f2573d428fed6c92689ba85`, blob `1b50c6251466ebe0d02cae4111d5c685cbfb9efd`                                                                                        | equal; 43924 bytes                                                                                                                                                                                               | match  |
| PR #206 review                  | `f1cbcca6e1ff06670d43d44bd38bf76a7a43833a`, blob `752b7a1e8b2f4c2d3c67dc59bea6c36e69b8ad59`                                                                                        | equal; 56183 bytes; sole parent `070e5dd5…`                                                                                                                                                                      | match  |
| PR #211 review                  | `a5e921c07ea2ab4f0147864fd2323f607512ef0d`, sole parent `044078d3…`, tree `6b7691a1b80d5400cea8dcb85d1bd8b38e59bbe9`, blob `63ee9079012cf7fa2e3a3b909ef294538a99c70b`, 76460 bytes | all equal; live PR #211 draft, open, unmerged, head unchanged                                                                                                                                                    | match  |
| Prior SR-H review branches      | untouched                                                                                                                                                                          | all four exist at their recorded heads; not modified here                                                                                                                                                        | match  |

The task text carried a truncated/miscopied SHA-256 for `26_Hayter_1986.pdf` in its table
and the correct 64-hex value in a separate note; the supplied file matches the correct
value and the C.2/D.2 record (Section 3). This is an identity note about the task text,
not a finding about the repository.

## 3. Source artifact identity and inspection performed

All six supplied files were re-hashed and opened with an independent PDF library
(PyMuPDF 1.28.2); page counts recomputed. Every value matches C.2/D.2 and K.1/L.3.

| Supplier / file           |   Bytes | PDF pages | SHA-256 (recomputed)                                                                              | Printed pages read as page images (150 dpi)                                                                                             |
| ------------------------- | ------: | --------: | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 26 / `26_Hayter_1986.pdf` |  582732 |         6 | `33000fec094c81a4dbb581653d28d3a72bb8a2379a8baafbc1dafab1d6032eed`                                | 1000, 1001, 1002 (Theorem 1, proof, Table 1), 1003 (Theorem 2, Appendix A.1/A.2)                                                        |
| 25 / `25_Welsch_1977.pdf` |  954326 |        11 | `1111684b7f639503ae40caa063556f79f0da5729c34fcef6286ba9b2498a0600`                                | 567, 568, 569 (Theorems 1–2, A/B, §5.2, Appendix A), 571 (NKA/NKB paragraph, WSD example), 575 (table-use paragraph)                    |
| 24 / `24_Einot_1975.pdf`  | 1211995 |        11 | `1b097f5cdf16785e0aebf9c29359b957beb94caf51bb46255eaceb3d841cd57b`                                | 575 (§1.2–1.3), 576 ((1.6)–(1.19), footnote 2), 577 (§1.6–1.7), 578 ((1.23)–(1.26), cross-references)                                   |
| 36 / `36_Ryan_1960.pdf`   |  750050 |        11 | `4a8b0f3429c4f538f5d34da776c6b410506b95e95b0a3d5d0bb21c6f2e522c99`                                | 319 (rules 1–3, basis), 320 (block formula, product form), 321 (EW expansion, footnote 3), 322 (confidence limits)                      |
| 35 / `35_Keuls_1952.pdf`  |  564826 |        11 | `3c15767f3d732bd3268b2dc7dacba397fd736e8181bb9ddbc0fc9a63941e1616`                                | 115, 116, 117, 120, 121                                                                                                                 |
| 17 / `17_Duncan_1955.pdf` | 4442167 |        43 | `6504e0bd884850d639ea5e0a9b5794d3c02f7d3df5895e3ca64ced6face64bdf`                                | 3 (Table II), 5, 6, 7, 13, 14, 15, 16, 28, 41                                                                                           |
| 06 / `06_Newman_1939.pdf` | 1141066 |        12 | `2a95351862462f2165a4a2f82f16572eb4a0482afcea2772c590ade02e45e974` (recorded, **not recomputed**) | **not supplied; not read** — `SOURCE_ACCESS_INCOMPLETE` for every Newman-dependent claim (C.3 row 06; PR #211 Section 8; C.7 p.28 line) |

Page mapping confirmed on covers/running heads: Hayter, Einot–Gabriel and Welsch PDF
page 1 is a publisher cover; Keuls and Ryan PDF page 1 is the first printed page; Duncan
printed page p is PDF page p + 1. The text layer of all six scans damages subscripts and
inequality signs; every equation, inequality direction and table value cited below was
read from the page image.

Not inspected, and not approved: Hayter references (p.1004); Welsch pp.566, 570,
572–574 (tables, Appendix B/C beyond p.571); Einot–Gabriel pp.579–583 (Monte Carlo and
§2.7); Ryan pp.323–328; Keuls figures and pp.112–114, 118–119, 122; Duncan pp.1–2, 8–12,
17–27, 29–40, 42; every external proof cited by any paper (Hayter 1984 = `SRC-06`;
Einot–Gabriel [9] and [27]; Beyer 1953; Pearson–Hartley).

## 4. Inventory of decision-bearing claims and their provenance classes

The inventory was built from the commission (required analysis items 1–8, hold
definitions) and from the author-side result before the originals were opened for
verification. Each claim is tagged with the class the task asks to keep separate:
**SRC** = explicit source statement; **AUT** = author derivation/inference; **REV** =
prior reviewer derivation/inference; **THIS** = independently confirmed by this review
(page image and/or independent computation); **EXT** = depends on an uninspected
external proof or source; **STW** = steward choice/approval.

| #   | Claim (entry)                                                                                                                                                                                             | Where stated                                        | Class as recorded                   | This review                                                                                                                                                                    |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Protected LSD: α-level F gate, then all k(k−1)/2 α-level t tests; complete-null FWER ≤ α (weak control) (`APR-13`)                                                                                        | I.2, Hayter p.1000, (2.2)                           | SRC                                 | THIS: p.1000 §1, p.1001 (2.2) confirmed                                                                                                                                        |
| 2   | Theorem 1: MFWER = Pr{Q_{k−1,ν} > √2 t_{α/2,ν}} for balanced models and unbalanced k = 3; upper bound for unbalanced k ≥ 4 (`APR-13`)                                                                     | I.2, p.1001 (2.1), p.1002                           | SRC (+EXT for k ≥ 4 via A.1)        | THIS: confirmed as printed; A.1 proof is deferred to Hayter (1984) as I.2 says; equality cases are self-contained (PR #201 §6, re-derived here)                                |
| 3   | Modified LSD: gate retained, stage-2 critical point q_{α,k−1,ν}/√2; MFWER = α balanced/k = 3, ≤ α unbalanced k ≥ 4 (`APR-14`)                                                                             | I.2, pp.1002–1003 Theorem 2                         | SRC (+EXT k ≥ 4)                    | THIS: confirmed                                                                                                                                                                |
| 4   | k = 3 reduction to α; supremum not maximum; T_ij algebra; k−1 is a range dimension, not the family size; no gate removal; no Welch carry-over                                                             | I.3                                                 | AUT                                 | THIS: each re-derived; correct                                                                                                                                                 |
| 5   | Table 1 (ν = ∞) differs from the tabulated expression in 38 of 54 cells at four decimals, column-dependent sign (S-I1 / J.2)                                                                              | PR #201 §7; J.2; continuation §15                   | REV                                 | THIS: independently recomputed by two different routes; counts, maxima, directions, k-lists identical (Section 6.1)                                                            |
| 6   | Keuls: ordered-range stepping with size-indexed Studentized-range points after ANOVA; no theorem, no error-rate definition (`APR-10`)                                                                     | K.2, pp.116–121                                     | SRC                                 | THIS: confirmed                                                                                                                                                                |
| 7   | Ryan's 1960 rule: layered extremes-first testing; span of k samples tested at two-sided level 2a/(n(k−1)) with the ordinary pairwise test (`APR-12`)                                                      | K.2, pp.318–319                                     | SRC                                 | THIS: confirmed                                                                                                                                                                |
| 8   | Ryan's budget: k_i a/n per block; sum ≤ a; product form is an approximation (N-K2)                                                                                                                        | K.2/K.3, p.320–321                                  | SRC + AUT + REV                     | THIS: confirmed on p.320–321; sum-budget argument re-derived under interleaving (Section 6.3)                                                                                  |
| 9   | Einot–Gabriel: model, strict all-containing-set rule (1.2), statistics (1.8)/(1.9), allocations (1.11)–(1.13)/(1.13′), separated-block bound (1.23)–(1.26) (`APR-10`/`APR-11`/`APR-12`)                   | K.2, pp.575–578                                     | SRC                                 | THIS: confirmed; **plus one unrecorded source statement, (1.16), relevant to the named monotonicity gap (S-X1)**                                                               |
| 10  | Welsch: ordered equal-size means, independent χ² scale; A/B allocations; Theorems 1–2 under a nondecreasing critical sequence; GAPA/GAPB vs NKA/NKB; Type I ∪ Type III control is a conjecture (`APR-12`) | K.2, L.2, pp.567–569, 571, 575                      | SRC                                 | THIS: confirmed, including L.2's finer locator "after (A.1)" (resolves A-N1)                                                                                                   |
| 11  | Duncan: equal-precision independent normal means, independent χ² estimate with n₂ df; p-mean protection (1−α)^(p−1); every containing subset; p.41 max rule; nominal 5% is not 5% FWER (`APR-11`)         | C.3 row 17; PR #211 §9                              | SRC + AUT + REV                     | THIS: confirmed on pp.5–7, 13–16, 28, 41 and Table II                                                                                                                          |
| 12  | Newman: Studentized range with independent χ²-type scale; n = 2 point = t√2; empirical tables; p.28 `f = 3` print (`APR-10`)                                                                              | C.3 row 06; PR #211 §8                              | SRC + REV                           | **SOURCE_ACCESS_INCOMPLETE** here; only the numerical claims (t√2 values; q_{.05}(5,30) = 4.1, (6,30) = 4.3) were recomputed and agree with what PR #211 reports (Section 6.5) |
| 13  | NK strong-control failure: two separated equal pairs give 1−(1−α)² under known σ² (K.3 item 4); Duncan's own p-mean levels exceed α for p ≥ 3                                                             | K.3; PR #211 §9                                     | AUT/REV from SRC                    | THIS: (1.24)–(1.25) confirmed; both mechanisms reproduced by simulation (Section 6.4)                                                                                          |
| 14  | `APR-12` is a compound label for several executable procedures; single REGWQ identity not fixed                                                                                                           | K.3 item 1; PR #206 §6                              | AUT/REV                             | THIS: agree (Section 7, attack B)                                                                                                                                              |
| 15  | `SR-H` `PARTIAL` (not `INPUT_INCOMPLETE`, not `CLOSED`); ledger 5/1/8; overall `INPUT_INCOMPLETE`; `SOURCE_SET_READY` false; `NARROW`; `RES-ONLY`; 35 originals                                           | K.6, L.4, PR #206 §8, PR #211 §11, continuation §17 | AUT/REV (candidate) + STW (pending) | THIS: definitions applied independently (Section 8); consistent, with the attribution nit N-X5                                                                                 |
| 16  | Scoped model independence for Parts I, J (approved) and K/L (proposed)                                                                                                                                    | continuation §15, §16, §17                          | STW on testimony                    | THIS: testimony/Git separation is correctly kept; nothing here verifies model identity (Section 8)                                                                             |

## 5. Axis A — source support checked on page images

`SUPPORTED` means the recorded statement is a faithful, bounded reading of the printed
text at the stated pinpoint, checked on the page image by this review.

### 5.1 Hayter (1986), Part I I.2/I.3 and PR #201

| Item                                                                         | Page evidence (image)                                                                                                                                                                                                     | Result                                                                 |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Model, family, S² law, ν, k ≥ 3, balance                                     | p.1000 §2 and p.1001 top: independent N(0, σ²) errors; S² "distributed independently of the X̄_i as a σ²χ²_ν/ν"; "Usually the ANOVA mean squared error with ν = Σ n_i − k"; "If the n_i are all equal … balanced"; "k ≥ 3" | SUPPORTED                                                              |
| Two-stage LSD; (2.2)                                                         | p.1000 §1; p.1001 (2.2): "≤ Pr{stage-1 F test rejects} = α"                                                                                                                                                               | SUPPORTED                                                              |
| Theorem 1 statement and cases                                                | p.1001: "For any balanced one-way model, and for an unbalanced one-way model with k = 3 … (2.1) … For any unbalanced one-way model with k ≥ 4, the right side of Equation (2.1) provides an upper bound"                  | SUPPORTED                                                              |
| Cluster construction; conditional independence; limit                        | p.1001: V₁ ∪ ⋯ ∪ V_t; "The events A_r … do not depend on the values of the means μ_i … and conditional on S², they are independent"; (2.5) limit as cluster separation → ∞; p.1002: "t = 2, v₁ = k − 1, and v₂ = 1"       | SUPPORTED                                                              |
| (2.9) Spjøtvoll lower bound; (2.10)–(2.11) via A.2; "h_i is decreasing in i" | p.1002 left column                                                                                                                                                                                                        | SUPPORTED                                                              |
| Unbalanced qualification and k − 1 equal sizes                               | p.1002 right column: Dunnett (1980) simulations and Uusipaikka (1985) calculations cited; "if the imbalance is such that k − 1 of the k sample sizes n_i are equal, then there will be equality in Equation (2.12)"       | SUPPORTED; cited studies unread (EXT), as I.2 says                     |
| "It is not clear how the expression depends on ν"                            | p.1002 §3                                                                                                                                                                                                                 | SUPPORTED (finite-ν values are reviewer diagnostics only; Section 6.1) |
| Modified LSD, Theorem 2                                                      | p.1002 bottom / p.1003: "use q_{α,k−1,ν}/√2 instead of t_{α/2,ν} as the critical point in the k(k − 1)/2 stage-2 pairwise comparisons"; Theorem 2 as recorded                                                             | SUPPORTED                                                              |
| A.1 deferral; A.2 self-contained                                             | p.1003: "The rather lengthy proof of this theorem is presented in Hayter (1984) and is not given here"; A.2 with proof, lemma 0 ≤ B_j < ∞, log-concavity chain                                                            | SUPPORTED                                                              |
| Table 1 values                                                               | p.1002 Table 1, 54 cells transcribed by this review and used in Section 6.1                                                                                                                                               | transcription agrees with the values PR #201 compared                  |

### 5.2 Welsch (1977), K.2 and L.2

| Item                                                            | Page evidence (image)                                                                                                                                                                                                                                                | Result                                                                                                                 |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Model, ordering, rules (1)–(3), SNK order                       | p.567: m₁ ≤ ⋯ ≤ m_t "with equal sample sizes"; t independent Gaussian populations, S² an independent χ²_ν/ν estimator; "(Note that m₁, the smallest sample mean, does not necessarily come from M₁.)"; SNK "C_t ≥ C_{t−1} > … ≥ C₂ and examines the t stretch first" | SUPPORTED                                                                                                              |
| Theorem 1 (step-up, C₂ ≤ ⋯ ≤ C_t) and its interleaving argument | p.567: proof text "since sample means from other blocks could lie between two means from the ith block. … We require that C₃ ≥ C₂ so that the event T(2, d_i) > sC₃ is included in T(2, d_i) > sC₂"                                                                  | SUPPORTED; the printed proof itself handles interleaving through the monotone sequence                                 |
| A/B allocations; GAPA/GAPB                                      | p.568: "A. P(j) = jα/t, j = 2, …, t − 2, t, with P(t − 1) = α" ; "B. P(j) = jα/t, j = 2, …, t"                                                                                                                                                                       | SUPPORTED                                                                                                              |
| §4 on Ryan; Theorem 2 (step-down, C_t ≥ ⋯ ≥ C₂); NKA/NKB        | p.568: Ryan "chose … the two-sample t test rather than … the Studentized range"; "Ryan (1960, p. 321) considered method A but failed to note that for logical consistency the critical values need to form a monotone sequence"; Theorem 2 as recorded               | SUPPORTED                                                                                                              |
| §5.2 conjecture on Type I ∪ Type III                            | p.569: "We cannot prove such a result for the tests we propose, except in very special cases. We conjecture that such a result is true generally."                                                                                                                   | SUPPORTED                                                                                                              |
| Appendix A monotone enforcement; locator                        | p.569 Appendix A: the sentence "If C_k turns out as a result of this computation to be less than C_{k−1}, we shall put C_k = C_{k−1} in order to preserve the ordering of the C_i" is printed **immediately after display (A.1) and before (A.2)**                   | SUPPORTED; L.2's "after (A.1)" is confirmed on the page (PR #211 A-N1 can be closed)                                   |
| p.571 NKA/NKB paragraph                                         | "Since NKA and NKB are step-down procedures, no conditioning and, therefore, no Monte Carlo is necessary … The inverse interpolation method was the same as that described for C₂ above." No enforcement step printed.                                               | SUPPORTED                                                                                                              |
| p.575 usage values                                              | GAPA (part b), t = 5, 20 df: 3.58, 3.97, 3.97, 4.29; NKA (part c): 4.23, 3.96, 3.93, 3.58; "Linear harmonic ν-wise interpolation is recommended."                                                                                                                    | SUPPORTED; the four NKA values reproduce from q_{.05}(5,20), q_{.05}(4,20), q_{.03}(3,20), q_{.02}(2,20) (Section 6.5) |

### 5.3 Einot and Gabriel (1975), K.2 and K.4

| Item                                                                    | Page evidence (image)                                                                                                                                                                                                                                                                                                                                    | Result                                                                                |
| ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Model; strict all-containing-set rule                                   | p.575 §1.2: variances σ²/n_i, n_e s²/σ² chi-square independent of the means; (1.2) T_R > ζ_r ∀R (P ⊆ R ⊆ K); "ω_P is retained if T_R ≤ ζ_r for at least one set R containing P, including P itself and the total set K"                                                                                                                                  | SUPPORTED                                                                             |
| Nominal vs true level; γ_k = α                                          | p.575 §1.3 (1.3)–(1.4); "The true level is thus seen to be at most equal to the nominal level"                                                                                                                                                                                                                                                           | SUPPORTED                                                                             |
| Statistics and allocations                                              | p.576 (1.6)–(1.9); (1.10) "T_P^(2) = 2{T_P^(1)}² when p = 2"; (1.11)–(1.13); footnote 2 (1.13′) γ_p = αp/k "very slightly more conservative"                                                                                                                                                                                                             | SUPPORTED; (1.10) coefficient conflict confirmed (Section 6.5)                        |
| **(1.16) monotone critical values**                                     | p.576: "For any other method M, which uses the same statistics T, ζ_k^M is evaluated as in (1.15) but the remaining critical values ζ_p^M … are, by (1.3), taken as upper 100γ_p^M percentage points … It has been shown (see [9, Sec. 9]) that ζ_p^M < ζ_r^M if p < r (1.16) so that the critical values increase with the size of set P to be tested." | **Printed source statement not recorded in K.2, K.4, L.2, PR #206 or PR #211** (S-X1) |
| (1.17)–(1.19) orderings                                                 | p.576                                                                                                                                                                                                                                                                                                                                                    | SUPPORTED; (1.17) re-derived: p/k > (p−1)/(k−1) iff p < k                             |
| §1.6 stepwise procedure; retained set retains subsets; STP-only outputs | p.577                                                                                                                                                                                                                                                                                                                                                    | SUPPORTED                                                                             |
| §1.7 separated blocks; (1.23) Kimball; known-σ² equality; (1.24)–(1.26) | p.578; the cross-references "allocation of levels (1.10)" and "Ryan allocation (1.12)" are printed where the formulas are (1.11) and (1.13)                                                                                                                                                                                                              | SUPPORTED; cross-reference conflict confirmed                                         |

### 5.4 Ryan (1960), K.2

| Item                                                                                       | Page evidence (image)                                                                                                                                                                                                                                                                 | Result                                                 |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Rules 1–3; ordinary pairwise tables                                                        | p.319 left column, as quoted in PR #206 §4                                                                                                                                                                                                                                            | SUPPORTED                                              |
| Basis: complete null; per-experiment vs experimentwise                                     | p.319 right column and footnote 2 (three rate definitions)                                                                                                                                                                                                                            | SUPPORTED                                              |
| Block budget; product form; separation assumption declared unnecessary                     | p.320: k₁(k₁−1)/2 · 2a/(n(k₁−1)) = (k₁/n)a; "The error rate for the total experiment is not exactly the sum … but fortunately their sum is a good approximation"; "(This assumption is needed only for clarity of explanation; it will be shown below to be unnecessary in general.)" | SUPPORTED                                              |
| EW ≤ Σ k_i a/n = a; worked .0490099501; footnote 3 (5/6 a)                                 | p.321                                                                                                                                                                                                                                                                                 | SUPPORTED; arithmetic reproduced exactly (Section 6.5) |
| Confidence limits at constant 2a/(n(n−1)); "we pay no attention to the order of the means" | p.322                                                                                                                                                                                                                                                                                 | SUPPORTED                                              |

### 5.5 Keuls (1952), K.2 and K.4

| Item                                                                                                                                           | Page evidence (image) | Result                                           |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------ |
| Proposition (uncorrelated, same σ); n_e = 24; printed `2983,03 : 12 = 124,29`                                                                  | p.115                 | SUPPORTED; divisor/quotient conflict confirmed   |
| Normal law; F = 11,21; t-test D = 18,80; `176,0 − 97,7 = 78,2`                                                                                 | p.116                 | SUPPORTED; 78,2 vs 78,3 conflict confirmed       |
| Range test: Pearson–Hartley table, graph-read R_{0,05}, Δ_{0,05} = 33,61; 78,3 > 33,61                                                         | p.117                 | SUPPORTED; two further print observations (N-X2) |
| "nearly equivalent" criteria; neglected first-conclusion error; accumulation                                                                   | p.120                 | SUPPORTED                                        |
| Stepping to 5 remaining varieties, Δ_{0,05} = 26,91; footnote 1 on Newman and Tukey; "Mathematical study about a good test remains to be done" | p.121                 | SUPPORTED                                        |

### 5.6 Duncan (1955), C.3 row 17 and PR #211 §9

| Item                                                                                         | Page evidence (image)                                                                                                                                                                       | Result                                                             |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Table II n₂ = 30 row; n₂ = 4 row                                                             | p.3: row 30 = 2.89 3.04 3.12 3.20 3.25 3.29 …; row 4 = 3.93 4.01 4.02 4.02 4.02 … (repeated value from p = 4)                                                                               | SUPPORTED (both PR #211 observations)                              |
| Worked example, R_p, testing order                                                           | p.5 (values, order), p.6 (rule and italic Exception with footnote "subset … include the complete set"), p.7 (steps 13, short cut, "R_p become smaller with decreases in the subset size p") | SUPPORTED                                                          |
| Section 3 model                                                                              | p.7: common standard error σ_m; "n₂ s_m²/σ_m² is distributed as χ² with n₂ degrees of freedom, independently of m₁, …, m_n"                                                                 | SUPPORTED                                                          |
| p-mean significance/protection definitions                                                   | p.13 §4.3 as quoted by PR #211                                                                                                                                                              | SUPPORTED                                                          |
| γ₄ = 79.7%, γ₃ = 87.8% for the multiple normal-deviate test; (.95)³ = 85.7%; (.95)² = 90.25% | pp.14–15                                                                                                                                                                                    | SUPPORTED                                                          |
| γ_p = γ₂^(p−1); printed 95, 90.25, 85.7, 81.5, 77.4, 73.5; γ₁₀₁ = 0.6%                       | p.16                                                                                                                                                                                        | SUPPORTED                                                          |
| p.28 transposition; §5.4.2 "each and every subset which contains the given means"            | p.28: "the four-mean and three-mean protection levels are raised from 87.8% and 79.7% respectively to 95%"                                                                                  | SUPPORTED; transposition confirmed                                 |
| p.41 construction and "ensures … is γ_{p,α}"                                                 | p.41: "Q(p, n₂, α) = R(p, n₂, γ_{p,α}) or Q(p − 1, n₂, α), whichever is the larger, for all other values of p"                                                                              | SUPPORTED; B-N3's "at least" reading stands (Section 7, attack C2) |

## 6. Axis B — independent mathematics and numerics

Every computation below was made with code written by this review (scripts under
`scripts/`), with SciPy 1.17.1, mpmath and NumPy under Python 3.11; no repository code
and no author-side code path was used except for the verbatim K.5 rerun in 6.2. All
values are diagnostics, not oracles, tolerances, or certified enclosures.

### 6.1 Hayter Table 1 — 54-cell diagnostic, independent route

Route: (a) mpmath Gauss–Legendre quadrature at 40 digits on [−14, 14] subdivided in
steps of 2 (the author used SciPy adaptive `quad` on [−12, 12]; PR #201 used mpmath
tanh-sinh); (b) `scipy.stats.studentized_range.sf` with `df = inf` (PR #201 used
`df = 1e6`); (c) for k = 4 additionally a two-dimensional order-statistic integral with a
different integrand (6·φ(x)φ(y)(Φ(y) − Φ(x)) over x ≤ y ≤ x + q), giving .1222663059.
Routes (a) and (b) agree to eight decimals for all 54 cells.

| α   | Cells differing at four decimals | Largest \|computed − printed\| | Sign (computed − printed) among differing cells | k list                     |
| --- | -------------------------------- | -----------------------------: | ----------------------------------------------- | -------------------------- |
| .01 | 16 of 18                         |                .00065 (k = 20) | all positive (printed below computed)           | 5–20                       |
| .05 | 14 of 18                         |                .00013 (k = 15) | all positive                                    | 4–15, 17, 18               |
| .10 | 8 of 18                          |                 .00012 (k = 8) | all negative (printed above computed)           | 5, 7, 8, 9, 10, 11, 13, 17 |

This reproduces PR #201 Section 7 / J.2 / continuation §15 exactly (38 of 54; same
per-column counts, maxima, directions and k lists). The S-I1 figures, which continuation
§16 accepted "on the transcription basis" only, now have an independent recomputation.
The cause remains unestablished; no erratum was searched for; no value is adopted.

Related checks (script `hayter_a2_and_finite_nu.py`): h₁…h₁₁ at 2q = √2·z_{.025}
decrease and satisfy h_i² > h_{i−1}h_{i+1} for i = 2…10; (2.10) Π h_{v_i} ≥ h_{k−1} holds
over every partition with t ≥ 2 for k = 3…8 (brute force); the k = 3 identity
Pr{Q_{2,ν} > √2 t_{α/2,ν}} = .0500 holds at ν = 5, 10, 30, 120; the k = 4, α = .05
values .1143 (ν = 10), .1196 (ν = 30), .1216 (ν = 120), .1223 (ν = ∞) agree with PR #201's
finite-ν note; Pr{Q_{5,20} > q_{.05,5,20}} = .0500 (Theorem 2 sanity).

### 6.2 K.5 verbatim rerun and independent count

The K.5 block was extracted from the head blob at run time and executed unchanged
(`k5_rerun_and_arithmetic.py`): `partitions checked: 2712`, `NK two-block limit: 39/400`,
`two-mean augmented-F/range-squared: 1/2`. Independently, Σ_{t=2}^{20} p(t) computed by
Euler's pentagonal recurrence is 2712. The A/B budget inequality for all t is proven in
PR #206 §6; that proof was re-derived here and is correct (B: Σ_{d_i ≥ 2} d_i α/t ≤ α;
A: a block of size ≥ t − 1 leaves only singletons, else B applies). K.5 is a finite
confirmation and says so.

### 6.3 Ryan's sum budget under interleaving — derivation

Attack premise: the sum-budget Σ k_i a/n ≤ a might rely on Ryan's p.320 "far enough
apart" simplification. Expected failure: a configuration with interleaved blocks where
an inner pair is tested at a less stringent level than the block level, so that the
Bonferroni count over pairs at 2a/(n(d − 1)) does not cover it. Observed: no failure. A
false rejection of a pair inside a homogeneous block B of size d requires (rule 3 and the
containing-span logic) that the contiguous span from B's smallest to B's largest sample
mean was declared significant; that span has size j ≥ d, its range equals B's range, and
its level 2a/(n(j − 1)) ≤ 2a/(n(d − 1)); so the event is contained in {range_B exceeds
the size-d criterion} ⊆ ∪_{pairs in B}{|diff| exceeds the size-d criterion}, whose
probability is at most (d(d − 1)/2)·2a/(n(d − 1)) = ad/n. Summing over blocks gives ≤ a.
This needs the size-indexed criteria to be nondecreasing in span size, which holds for
Ryan's levels with one pairwise reference distribution — exactly the point PR #206 §6
records and Welsch p.568 makes. Ryan's own text asserts the separation assumption is
unnecessary (p.320) without printing this argument.

### 6.4 Monte Carlo attack on strong control under interleaving (ν = ∞)

Script `stepdown_fwer_simulation.py`, 20 000 replications per configuration, known
variance, contiguous-span step-down with the all-containing-spans rule, α = .05.
Standard error ≈ .0015 at .05. An error is a declared difference between two means with
equal true means.

| Configuration                       |    NK | REGW-R (1.13) | NKB (1.13′/B) | Duncan (1−α)^(p−1) | Ryan-t (pairwise) |
| ----------------------------------- | ----: | ------------: | ------------: | -----------------: | ----------------: |
| k = 4, pairs (0,0,20,20)            | .0948 |         .0510 |         .0485 |              .0976 |             .0462 |
| k = 4, pairs (0,0,1,1) interleaving | .0346 |         .0255 |         .0237 |              .0759 |             .0213 |
| k = 4, pairs (0,0,.5,.5)            | .0281 |         .0240 |         .0238 |              .0666 |             .0211 |
| k = 6, three separated pairs        | .1435 |         .0521 |         .0495 |              .1452 |             .0492 |
| k = 6, triples (0,0,0,.7,.7,.7)     | .0300 |         .0263 |         .0272 |              .1379 |             .0214 |
| k = 6, pairs step .8                | .0232 |         .0164 |         .0155 |              .0908 |             .0137 |
| k = 8, four separated pairs         | .1859 |         .0508 |         .0510 |              .1838 |             .0468 |
| k = 8, four pairs step .9           | .0255 |         .0132 |         .0143 |              .1170 |             .0104 |
| k = 5, (0,0,0,0,20)                 | .0493 |         .0406 |         .0371 |              .1416 |             .0343 |

Theory: NK separated pairs 1 − (1−α)^q = .0975, .1426, .1855 for q = 2, 3, 4 (K.3 item 4
and Einot–Gabriel (1.24)); Duncan with a block of four equal means 1 − .95³ = .1426. The
simulation matches those values within sampling error, confirms that the NK and Duncan
mechanisms recorded in K.3/C.3/PR #211 are real, and finds no configuration — separated
or interleaved — where REGW-R, NKB or Ryan's pairwise rule exceeds α. The separated
REGW-R values sit at α, as the known-σ² equality in (1.23)/(1.26) predicts. A simulation
cannot prove control; it only failed to falsify it.

### 6.5 Printed-arithmetic rechecks (exact rationals / independent quantiles)

| Item                                    | Recomputed                                                                                                                                                                                                                     | Status of the record                                                                                 |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| Keuls p.115                             | 2983.03/12 = 248.5858…; 2983.03/24 = 124.2929…; 16713.74/12 = 1392.8117; 1392.81/124.29 = 11.206; √124.29 = 11.149                                                                                                             | K.4 and PR #206 §7 correct; divisor 24 is consistent with F = 11,21 and σ = 11,15                    |
| Keuls p.116/117                         | 176.0 − 97.7 = 78.3                                                                                                                                                                                                            | K.4 correct                                                                                          |
| Keuls p.117 (new)                       | 11.15/√3 = 6.4375 (printed "6,45"); 33,61/5,22 = 6.4387; graph-read R_{0,05}(p, 24) for p = 13…2 differ from SciPy quantiles by up to .04 (5,22 vs 5.18; 5,14 vs 5.10; 5,05 vs 5.01; 4,95 vs 4.92; 4,83 vs 4.81; 4,70 vs 4.68) | Not recorded anywhere; N-X2. Not decision-bearing; strengthens K.4's "not an oracle"                 |
| Einot–Gabriel (1.10)                    | n = 1, means 0 and 2, s = 1: (1.8)² = 4, (1.9) = 2, ratio 1/2                                                                                                                                                                  | K.4 correct                                                                                          |
| Ryan p.321                              | 1 − .99⁵ = .0490099501 exactly; (5·4/2)(2/(6·4)) = 5/6                                                                                                                                                                         | K.2 correct                                                                                          |
| Duncan p.5 / p.16                       | R(p, 30, .95^(p−1)) = 2.888, 3.035, 3.131, 3.199, 3.250, 3.290; 3.643 × printed = 10.53 … 11.99; 100·.95^(p−1) = 95, 90.25, 85.74, 81.45, 77.38, 73.51; .95¹⁰⁰ = 0.59%                                                         | PR #211 §9 correct                                                                                   |
| Newman (10) and p.28 (values only)      | t_{.975,f}√2 = 3.64, 3.15, 2.95, 2.89 (f = 5, 10, 20, 30); t_{.995,f}√2 = 5.70, 4.48, 4.02, 3.89; q_{.05}(5,30) = 4.1, q_{.05}(6,30) = 4.3; q_{.05}(5,5) = 5.67, (6,5) = 6.03                                                  | Numbers agree with what PR #211 reports; **the page itself was not seen** (SOURCE_ACCESS_INCOMPLETE) |
| Welsch p.575 NKA                        | q_{.05}(5,20) = 4.23, q_{.05}(4,20) = 3.96, q_{.03}(3,20) = 3.93, q_{.02}(2,20) = 3.58                                                                                                                                         | L.2/PR #206 values reproduce from the A allocation                                                   |
| Welsch p.571 (new)                      | WSD example prints "(4.23 + 3.28)/2" where the SNK value is q_{.05}(3,20) = 3.58                                                                                                                                               | Not recorded anywhere; N-X3. Outside every decision-bearing claim                                    |
| Einot–Gabriel (1.17)/(1.18), footnote 2 | at α = .05, k = 7 the three allocations order as printed; Bernoulli 1 − (1−α)^(p/k) ≥ αp/k for 2 ≤ p ≤ k ≤ 7                                                                                                                   | PR #206 §6 correct                                                                                   |

### 6.6 Monotonicity of the raw critical-value sequences (the named gap)

Attack premise: K.6 names "exact monotonicity/selection conditions" as an open gap, and
L.2 records that no enforcement step is printed for NKA/NKB. If the raw (un-enforced)
quantile sequences of the variants are in fact monotone over the practical grid, the gap
is narrower than described; if they are not, the gap is real and the source statement
(1.16) of Einot–Gabriel is over-stated as printed. Script
`critical_sequence_monotonicity.py` computes, for α ∈ {.01, .05}, k ∈ {3, 4, 5, 6, 8,
10, 12, 15, 20} and ν ∈ {3, 5, 10, 20, 60, ∞}, the sequence ζ_p (p = 2…k) of upper
γ_p Studentized-range points for six allocations and reports every decrease.

Result (script output retained in the PR body and reproducible in about fifteen
minutes):

| Allocation (statistic: Studentized range)                   | Decreases found on the grid                                                                                                                                                                       | Reading                                                                                                                                                                                                                                                                        |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Newman–Keuls, γ_p = α                                       | none                                                                                                                                                                                              | monotone on the whole grid, as expected for a fixed level                                                                                                                                                                                                                      |
| Einot–Gabriel Ryan allocation (1.13), γ_p = 1 − (1−α)^(p/k) | ν = 3 for k ≥ 8 and ν = 5 for k ≥ 15 (both α); none for ν ≥ 10. Example α = .05, k = 8, ν = 3: 7.573, 8.452, 8.767, 8.884, 8.912, 8.894, 8.852                                                    | raw sequence is not monotone at small error df                                                                                                                                                                                                                                 |
| Ryan (1.13′) / Welsch B, γ_p = αp/k (NKB)                   | same pattern (ν = 3, 5 only)                                                                                                                                                                      | as above                                                                                                                                                                                                                                                                       |
| Welsch A (NKA), γ_p = pα/t, γ_{t−1} = γ_t = α               | **at every ν including ∞**, one decrease at p = t−2 → t−1, for t ≥ 8 (α = .05) or t ≥ 15 (α = .01); e.g. t = 8, ν = ∞, α = .05: C₆ = 4.171 > C₇ = 4.170; t = 6, ν = 20: C₄ = 4.2345 > C₅ = 4.2319 | the A allocation's jump to level α at p = t−1 makes the raw sequence non-monotone at practical sizes; Theorem 2's hypothesis C_t ≥ … ≥ C₂ is then not met by the raw quantiles and an enforcement step is needed — the step that L.2 correctly says is not printed for NKA/NKB |
| Duncan original, γ_p = 1 − (1−α)^(p−1)                      | ν = 3, 5 (k ≥ 4) and ν = 10 (k ≥ 15, α = .05); for α = .05, n₂ = 4 the raw points 3.926, 4.013, 4.033, 4.025, 4.003, … bind the p.41 max rule from p = 5 (Table II prints 4.02 from p = 4)        | consistent with Duncan's printed max rule and with PR #211's diagnostic                                                                                                                                                                                                        |
| Einot–Gabriel rescaled Duncan (1.12)                        | ν = 3, 5 (k ≥ 4)                                                                                                                                                                                  | not monotone at small df                                                                                                                                                                                                                                                       |

Consequences recorded as diagnostics, not as adopted rules: (i) for the Ryan-type and
rescaled-Duncan allocations that Einot–Gabriel compare, the printed unconditional claim
(1.16) "ζ_p^M < ζ_r^M if p < r" fails at ν = 3 and ν = 5 on this grid and holds for ν ≥ 10,
so (1.16) is an over-statement as printed unless [9] carries a condition that the 1975
text omits; (ii) for Welsch's A allocation the raw sequence is non-monotone at every df
once t ≥ 8, which makes the absence of a printed enforcement step for NKA (L.2) a
substantive gap for those table sizes rather than a formality; (iii) Ryan's own pairwise
rule is monotone by construction (one t reference, decreasing level); (iv) none of this
touches the `RES-ONLY` status or any accepted characterization, because every record
already conditions the step-down guarantees on a monotone sequence (K.2, K.3 item 3,
L.2).

## 7. Attacks that found no defect (recorded with premise, expected failure, observation)

| #   | Attack (task Section 6 item)                                                                                                | Premise / expected failure                                                                                   | Observed                                                                                                                                                                                                              |
| --- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A1  | Premise confusion (normality, independence, equal precision, common σ², independent χ² scale, df) across the seven readings | a recorded row silently drops or adds a model condition                                                      | None. Hayter (p.1000–1001), Welsch (p.567), Einot–Gabriel (p.575), Duncan (p.7), Keuls (p.115–116) conditions are recorded as printed; Ryan's plug-in generality is recorded as the source's claim, not a guarantee   |
| A2  | Balanced vs unbalanced; known vs estimated σ²                                                                               | an equality stated where only a bound is printed                                                             | None. Hayter equality/bound split is recorded; Einot–Gabriel (1.23) equality is limited to known σ² "and, approximately, for large error d.f."; K.3 item 4 says so                                                    |
| A3  | All containing subsets vs contiguous spans                                                                                  | Duncan's "each and every subset" (p.28) read as the contiguous-span rule without justification               | PR #211 §9 gives the equivalence under nondecreasing critical ranges; re-derived: any subset containing the pair lies in the contiguous span between its own extremes, has the same range and no larger size; correct |
| A4  | Pairwise level vs range level; step-up vs step-down; stopping rules; omnibus F gate                                         | Ryan's pairwise levels treated as range quantiles, or Welsch's step-up construction transferred to step-down | None. K.2 and L.2 keep them apart; Keuls's F-then-range sequence and Hayter's F gate are recorded as procedural facts, not as error-control proofs                                                                    |
| A5  | Weak vs strong FWER; nominal vs attained                                                                                    | "weak-only" for NK inferred from Newman alone; Duncan's nominal 5% read as FWER                              | None. Weak control of NK follows from the first-step level; strong-control failure is Einot–Gabriel §1.7 (and simulation 6.4); Duncan's own p.13/p.16 numbers exceed α for p ≥ 3                                      |
| B1  | Newman ≡ Keuls                                                                                                              | a byte-identical algorithm asserted                                                                          | Not asserted (K.6, PR #206 §5, PR #211 §8). Newman side not verifiable here                                                                                                                                           |
| B2  | Duncan original ≡ Einot–Gabriel rescaled Duncan                                                                             | (1.12) used to characterize `APR-11`                                                                         | Not done; K.6 and PR #211 §9 keep the two calibrations apart; numeric levels differ (.098 vs .017 at p = 3, k = 7)                                                                                                    |
| B3  | Ryan original ≡ later range/F formalizations; GAPA/GAPB ≡ NKA/NKB                                                           | a single "REGWQ" identity asserted                                                                           | Not asserted; six distinct executable procedures are named (PR #206 §6)                                                                                                                                               |
| B4  | Hayter equality cases depending on the external 1984 proof                                                                  | Theorem 1/2 equality cases attributed to A.1                                                                 | Not done; PR #201 §6 and N-I4 limit the dependency to unbalanced k ≥ 4; re-derived here                                                                                                                               |
| C1  | Welsch's printed step-up enforcement transferred to NKA/NKB                                                                 | L.2 or PR #211 attributes C_k := C_{k−1} to the step-down tables                                             | Not done; confirmed on p.569/p.571 images                                                                                                                                                                             |
| C2  | Duncan's max rule read as "attained protection always exactly γ_p"                                                          | C.3 row 17 or PR #211 states equality                                                                        | C.3 says "monotonizes"; PR #211 B-N3 records "at least"; Table II n₂ = 4 shows the rule binding (repeated 4.02), so equality fails there; correct                                                                     |
| C3  | "Raising a critical value lowers tail probability" used as a whole-procedure guarantee                                      | K.3 item 3 or L.2 claims control from that local fact alone                                                  | Not done; both keep it as investigator reasoning and require Welsch's theorem hypotheses                                                                                                                              |
| C4  | Ryan's budget under interleaving and several true groups                                                                    | see 6.3/6.4                                                                                                  | No failure found; derivation closes with monotone criteria; simulation ≤ α                                                                                                                                            |
| C5  | Products of block events taken as independent under a common estimated scale                                                | a product bound asserted as exact for finite ν                                                               | Not done; Einot–Gabriel's Kimball inequality is recorded as an inequality; Ryan's product form is flagged (N-K2); Hayter conditions on S²                                                                             |
| C6  | Finite enumeration (K.5, 2712 partitions) presented as a proof                                                              | K.5 or PR #206 claims the theorem from the enumeration                                                       | Not done; K.5 disclaims it; PR #206 §6 supplies the general argument                                                                                                                                                  |
| D1  | Circular reuse ("another review said GO" in place of a page)                                                                | a coverage claim that traces only to a verdict                                                               | None found: Newman/Duncan → PR #211 page images; Keuls/Ryan/Einot–Gabriel/Welsch → PR #206 page images; Hayter → PR #201 page images (PR #203 is transcription-only and did not read the PDF — N-X4)                  |
| D2  | Candidate `CLOSED` count treated as accepted count                                                                          | continuation or result says five holds are accepted                                                          | Not done; each record says "existing candidate statuses, not five new acceptances"; formally recorded acceptances are limited SR-C (§12) and limited SR-B (§14); SR-K/SR-G "remains separate"; SR-L is inherited      |
| D3  | Prior `PENDING` silently overwritten                                                                                        | a byte change inside a preserved prefix                                                                      | None; prefix chain byte-equal (Section 2)                                                                                                                                                                             |
| D4  | Blanket approval widened to new scope                                                                                       | §15's Part I approval applied to Parts K/L                                                                   | Not done; §16 applies §15 decision 3 only to the authorized S-I1/S-I2 delta; §17 records proposals "not yet enacted"                                                                                                  |
| D5  | Timestamps or Git names used as model/non-involvement proof                                                                 | a record says Git proves the model                                                                           | Not done; every record separates Git identity from model testimony; one wording nit (N-X6)                                                                                                                            |
| D6  | R4, other holds, public discussion or release advanced by the reviewed documents                                            | any status change outside SR-H                                                                               | None; every closing line keeps them unchanged; no catalogue text is edited (`RES-ONLY` intact in the fixed input, which is unchanged at `7bd9c5ab…`)                                                                  |

## 8. Axis C and D — evidence chain, approval scope, independence records, state

**PARTIAL against the commission's definitions.** `INPUT_INCOMPLETE` = "required source
text cannot be identified or inspected"; `PARTIAL` = "some claims are supported but
named gaps remain"; `CLOSED` = "all decision-bearing source claims needed by the hold
are directly supported, with exact artifact identity and pinpoints" and "does not select
the procedure". All seven texts named for SR-H (Section 17 of the fixed input: SRC-29 and
SRC-35) have been inspected author-side and have one independent page-level reading each
on the repository (six of them a second, partial one here). The claims C-H1…C-H4 as
characterized are supported. Named gaps remain: the `APR-12` variant identity (six
executable procedures under one entry), the monotone-sequence condition of Welsch's
theorems and its status for each printed table (now with the unrecorded Einot–Gabriel
(1.16) statement, S-X1), and the print conflicts. `PARTIAL` is the consistent label.
Two precision points: (i) the sentence "If the evidence resolves to multiple variants
rather than one reviewed family characterization, assign PARTIAL with named gaps" that PR #206 §8 and PR #211 §11 quote as "the commission's own rule for this case" is printed in
the commission's RSM-02 paragraph, not in the general hold-disposition list; the general
`PARTIAL` definition supports the same outcome, so the disposition is unaffected (N-X5);
(ii) the recorded print conflicts (Keuls example arithmetic, Einot–Gabriel (1.10) and
cross-references, Newman `f = 3`, Duncan p.28 transposition) touch no decision-bearing
claim; they gate numerical reuse, not hold closure, and it would be clearer to say so
rather than list them among the reasons `CLOSED` is not reached (N-X8). The substantive
reason `CLOSED` is not reached is the variant/monotonicity gap, which is real (Section
6.6).

**Independent coverage vs support of every claim.** Continuation §17 says "All seven
designated texts now have scoped independent coverage" and immediately limits it to "the
recorded claims and pages, not blanket approval". That limitation is accurate. Coverage
means exactly one independent page reading per text before this review; the claims each
covers are enumerated in PR #206 §4 and PR #211 §§8–9. This review did not find a claim
that is relied upon and covered by no page reading, except that this review itself could
not re-verify Newman.

**APR-12 open question is concrete.** Six named procedures, two allocations (1.13 vs
1.13′/B vs A), range vs F statistic, step-up vs step-down, and the monotone-sequence
hypothesis are specific; the next increment proposed in §17 (characterize the variants
from the reviewed evidence) is well-defined research preparation, not selection.

**S-I1/S-I2/S-K1 closure vs underlying discrepancy.** §16 and §17 keep them apart
("The table discrepancy itself remains unresolved"; "S-K1's repair does not resolve the
APR-12 variant questions or the recorded print conflicts"). Correct.

**Approved / proposed / reviewed distinctions in §§15–17.** §15: three decisions marked
APPROVED/ACCEPTED with explicit limits; §16: acceptance under the standing §15 decision
3, explicitly "not a new user statement"; §17: "Concrete bounded decision proposal, not
yet enacted" with three numbered proposals and "review delivery is not recorded as a new
steward approval". The distinction is maintained. Whether §16's application of decision 3
to a later delta was within the steward's intent is a steward matter; the record makes
the basis visible.

**Independence records.** All four reviews and this one separate (a) session-service
model testimony for the review side, (b) first-hand author testimony ("OpenAI-assisted")
for the author side, (c) Git identity, which none of them treats as model evidence, and
(d) non-involvement, which is a statement verifiable only against commit timestamps and
the absence of the reviewer's identity in author-side objects. This review verified (c)
and the commit-timestamp side of (d) for all eight commits in the chain (author commits
carry the steward's Git identity at +09:00; review commits carry the review session
identity at UTC; each review commit follows its input commit). Session creation times
are service testimony, not Git facts; PR #206 §12 and PR #211 §13 call the separation
"Git- and service-verifiable", which is accurate only if read as two different bases
(N-X6). No exact-build log is required by any record, and none is required here. The
steward determinations in §15/§16 and the proposal in §17 rest on that ordinary evidence;
this review neither makes nor pre-empts them.

**State statements verified.** Ledger 5 `CLOSED` (SR-B, SR-C, SR-G, SR-K, SR-L — H.5
table, candidate statuses) / 1 `PARTIAL` (SR-H candidate) / 8 `INPUT_INCOMPLETE` = 14;
precedence: no `NO_GO`, at least one `INPUT_INCOMPLETE` → overall `INPUT_INCOMPLETE`;
`SOURCE_SET_READY` false (requires 14 `CLOSED`); semantic `NARROW` unchanged (fixed
input's Section 20 logic is unaffected by any SR-H change); `APR-10`–`APR-14` `RES-ONLY`
(fixed input unchanged; no catalogue edit anywhere in Parts I–L); 35 originals = C.2's 19
(01–07, 09–19, 31) + D.2's 16 (08, 20–30, 32, 33, 35, 36), all distinct, 34 absent. All
correct. Formally accepted holds are not five: limited SR-C (§12) and limited SR-B (§14)
only; SR-K/SR-G acceptance is recorded as separate/pending; SR-L is inherited from Part
B and no acceptance record for it was found in §§11–17.

**RFC rules.** Rule 2 (separate model): satisfied on testimony per the steward's
recorded ordinary-evidence approach; not verifiable from Git; this review does not
change that. Rule 4 (facts/inference/decision separation): maintained in every inspected
part, with the one unrecorded source fact of S-X1. Rule 5 (material disagreement): no
primary-source disagreement requiring adjudication was found; the allocation differences
between Ryan (1.13′), Einot–Gabriel (1.13) and Welsch A/B are different choices, and
Welsch's criticism of Ryan (monotonicity) is a stated condition, not a conflict of
results. Rule 6 (traceable handoff): every increment names its inputs by commit/blob.

## 9. Findings

Classification by decision impact. **Existing** = already recorded by a prior review
(not counted); **Reopened** = a prior optional finding now given new evidence;
**New** = first recorded here.

**BLOCKER:** none.

**SHOULD-FIX (1):**

- **S-X1 — New. Einot–Gabriel p.576 (1.16) is an unrecorded printed source statement
  about the named monotonicity gap.** Target: PR #207 head `044078d3…`, result K.2 row
  "C-H3, distinct statistics and allocations", K.4, K.6 named gaps, and L.2; also PR
  #206 §4/§5 item 4 and PR #211 §6/§11 (existing reviews to be corrected, not
  rewritten). Problem: K.6 and L.4 name "exact monotonicity/selection conditions" as an
  open gap and L.2 records that no enforcement step is printed for NKA/NKB, while the
  Einot–Gabriel page that K.2 cites for the allocations prints, two lines below (1.15),
  "It has been shown (see [9, Sec. 9]) that ζ_p^M < ζ_r^M if p < r (1.16) so that the
  critical values increase with the size of set P to be tested" — an unconditional
  statement for "any other method M, which uses the same statistics T", attributed to
  an external proof ([9]) that no record has inspected. Independent computation
  (Section 6.6): on a grid of α ∈ {.01, .05}, k ≤ 20, ν ∈ {3, 5, 10, 20, 60, ∞}, the raw Studentized-range quantile sequences are monotone for the Newman–Keuls allocation everywhere, non-monotone at ν = 3 and ν = 5 for the paper's own Ryan (1.13) and rescaled-Duncan (1.12) allocations, and non-monotone at every ν (including ∞) for Welsch's A allocation once t ≥ 8; so (1.16) is not unconditionally true as printed for the allocations the paper compares. Impact on the SR-H judgment: none on
  the `PARTIAL` label; the gap stays open. Impact on future work: the gap's description
  is incomplete (a source statement plus an external proof pointer exist and are
  unrecorded), and, as printed, (1.16) is an unqualified claim that fails for at least
  one allocation discussed in the same literature (Duncan's original at small n₂, Table
  II row 4), so it belongs in the K.4-style conflict list before any monotonicity work
  reuses it. Minimal repair (author side, additive): one K.4-style paragraph citing
  p.576 (1.16) and [9, Sec. 9] as an uninspected external proof, stating the numerical
  status per allocation from Section 6.6 as a diagnostic, and adding (1.16) to the
  reopen/affected-use list. Re-review scope after repair: close-only, this paragraph
  against the p.576 image and Section 6.6; no other original needed.

**NICE-TO-HAVE (7):**

- **N-X1 — Reopened (PR #211 A-N1).** L.2's locator "after (A.1)" for Welsch's
  enforcement sentence is confirmed on the p.569 image: the sentence follows display
  (A.1) directly and precedes (A.2). A-N1 can be closed without further inspection.
- **N-X2 — New.** Keuls p.117 prints σ/√3 = 6,45 where 11,15/√3 = 6.4375, and the
  graph-read Studentized-range points for 13…2 means at 24 df exceed present-day
  quantiles by up to .04 (Section 6.5). Both belong with the K.4 Keuls observations;
  neither is decision-bearing; both reinforce "not a numerical oracle".
- **N-X3 — New.** Welsch p.571 WSD example prints "(4.23 + 3.28)/2" where the SNK
  three-stretch value at 20 df is 3.58 (the other three terms are the SNK values). Outside
  every SR-H claim (WSD is not catalogued); a K.4-style line would prevent reuse.
- **N-X4 — New.** Continuation §17 lists Hayter's independent coverage as "PR 201/203".
  PR #203 is a transcription-only delta review that states it did not read the PDF; the
  page-level coverage is PR #201 alone. Wording only.
- **N-X5 — New (existing-review precision).** PR #206 §8 and PR #211 §11 attribute the
  "multiple variants → PARTIAL with named gaps" sentence to the commission's general hold
  rule; it is printed in the RSM-02 paragraph. The general `PARTIAL` definition yields
  the same result, so no disposition changes. Proposed correction: a one-line
  clarification in a future increment; the review records themselves stay unchanged.
- **N-X6 — New (existing-review precision).** PR #206 §12 and PR #211 §13 describe
  context separation as "Git- and service-verifiable". Git verifies commit order and
  author identity only; session creation times and model names are service testimony.
  Reading the phrase as two separate bases is correct; a future record could say so.
- **N-X7 — New.** The five `CLOSED` candidates are correctly labelled as candidates
  everywhere, but no single place in Parts I–L or §§15–17 lists which holds carry a
  formal (limited) acceptance record (SR-C §12, SR-B §14) versus none (SR-G, SR-K, SR-L).
  A one-line inventory would prevent the candidate count from being read as an
  accepted count downstream.
- **N-X8 — New.** K.6/L.4 list "resolution or explicit exclusion of the disputed
  numeric/formula material before any affected use" among the named gaps of `PARTIAL`.
  Those conflicts touch no decision-bearing claim; they gate numerical reuse. Stating
  that the substantive closure obstacle is the variant/monotonicity question, and that
  the print conflicts are use-gates, would make the non-`CLOSED` reason unambiguous.

**Existing findings re-checked, not recounted:** S-I1 (now independently recomputed,
Section 6.1); S-I2 (J.3 matches the code); S-K1 (L.2 correct on the page); N-K1–N-K5,
N-I1–N-I7, N-J1–N-J2, A-N2, B-N1–B-N5 — all remain accurate on this review's reading;
B-N1 and B-N2 could not be re-verified for Newman (SOURCE_ACCESS_INCOMPLETE) but B-N2
(Duncan transposition) is confirmed on p.28.

**Errors in prior reviews:** none found in any content verdict. The two precision points
(N-X5, N-X6) do not change any prior verdict; the prior records should be preserved and
corrected only by a later note.

## 10. Unverified scope

- Newman (1939): every page claim (C.3 row 06; PR #211 §8; C.7 p.28 line; B-N1, B-N4).
- Einot–Gabriel [9] (source of (1.16)) and [27] (unequal-size conservativeness); Hayter
  (1984) proof of A.1 (`SRC-06`, inspected in an earlier FND-1 record for the
  Tukey–Kramer theorem, not re-read here); Beyer (1953); Pearson–Hartley tables; the
  Dunnett (1980)/Uusipaikka (1985) closeness results.
- Welsch's printed critical-number tables (pp.572–574) and whether any NKA/NKB entry was
  in fact enforced; Einot–Gabriel Monte Carlo tables; Ryan's proportion/variance
  procedures; Keuls's figures.
- Finite-ν behaviour of the modified LSD beyond the sanity check; any adjusted-p or
  interval semantics (none is claimed by any record).
- Formal erratum searches for any of the print conflicts (no network host was contacted).
- Model identity of any prior session and of the author side (testimony only, as every
  record states).
- Aggregate `pnpm check`, tests, typecheck, generated-diff check, and Phase 1 suite were
  **not** run (Section 13).

## 11. Decisions this review leaves to the steward

1. Whether the ordinary-evidence approach of §15/§16 is extended to Parts K/L (§17
   proposal 2). Nothing here adds Git-verifiable model evidence.
2. Whether `SR-H` is accepted as `PARTIAL` for the source-acquisition research
   disposition (§17 proposal 3), on the combined evidence plus this review, noting that
   this review could not re-verify Newman and that S-X1 should be repaired first if the
   monotonicity gap is to be characterized in the next increment.
3. Whether S-X1's repair is folded into the next SR-H increment already proposed in §17
   or recorded as a separate close-only delta.
4. Whether the two existing-review precision points (N-X5, N-X6) are recorded as a note
   in a future increment.

## 12. Verdict labels used here

- `GO`: the reviewed material, at the exact head, is correct and correctly bounded for
  the stated axis; optional findings may remain.
- `GO with SHOULD-FIX`: as `GO`, but a specific repair is required before the affected
  part of the record is relied upon further; the disposition itself is unaffected.
- `REPAIR_REQUIRED`: a defect changes or would change a disposition, count, or accepted
  characterization (none assigned here).
- `SOURCE_ACCESS_INCOMPLETE`: the original needed for a claim was not available to this
  review; no GO is inferred from any other record for that scope.

**Overall (E):** the fixed-input `SR-H` `PARTIAL` candidate and the §17 acceptance
preparation are **supported** by this review's own verification for six texts and by PR #211's page-level verification for Newman, with one `SHOULD-FIX` (S-X1) that narrows a
named gap rather than removing or widening it. This is not an unconditional `GO`: S-X1
is repairable additively, and the steward decisions in Section 11 remain open. No
statement here applies to a head other than `044078d3…`; if the head moves, the
identity checks in Section 2 must be repeated and the append-only prefix property
re-established before any of this is reused.

## 13. Deliverable identity, validation, and provenance

- Branch `review/r3-srh-cross-cutting-adversarial-20260908`, sole parent
  `044078d3b19ff3307dc347b0b9e7ecbbed1750c6`; files added:
  `review-inputs/r3-srh-cross-cutting-adversarial/REVIEW-RESULT.md` and
  `review-inputs/r3-srh-cross-cutting-adversarial/scripts/` (five Python files:
  `hayter_table1_check.py`, `hayter_a2_and_finite_nu.py`, `k5_rerun_and_arithmetic.py`,
  `stepdown_fwer_simulation.py`, `critical_sequence_monotonicity.py`). No other path is
  touched; the reviewed result, commission, continuation record, prior reviews and
  `main` are unchanged. The review commit, tree, and blob identifiers are reported in
  the draft PR body and were checked against the GitHub-side objects after push.
- Environment: managed remote Linux container; Node v22.22.2; pnpm 11.7.0; `pnpm
install --frozen-lockfile` exit 0 in the working clone; Python 3.11 with PyMuPDF 1.28.2
  (hashing, page counts, 150 dpi rendering), SciPy 1.17.1, NumPy, mpmath. Outbound
  network only through the session proxy; no publisher, DOI or erratum host contacted.
- Model information (ordinary accountable basis): the session-management service,
  queried during this review, reported `configured_model`, `session_context.model` and
  `external_metadata.last_served_model` all as `claude-fable-5-1`. The prior review
  records report the same identifier for their review sides; the author side reports
  OpenAI assistance in its own text. None of this is a Git fact.
- Validation (actual results):

| Check                                       | Fixed head `044078d3…`, before adding files (working clone) | Final state with this file and `scripts/` added             |
| ------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| `pnpm format:check`                         | pass ("All matched files use Prettier code style!"), exit 0 | pass ("All matched files use Prettier code style!"), exit 0 |
| `pnpm lint:markdown`                        | pass (355 files, 0 issues), exit 0                          | pass (356 files, 0 issues), exit 0                          |
| `node --import tsx tooling/src/validate.ts` | pass (audits clean), exit 0                                 | pass (audits clean), exit 0                                 |
| `git diff --check`                          | clean, exit 0                                               | clean (unstaged and `--cached`), exit 0                     |

A first baseline run inside a `git worktree` of the same head reported one validator
issue: the private-dependency audit flagged the worktree's `.git` pointer file, which
contains the host's absolute home path. That is an environment artifact of worktrees,
not a repository defect; the baseline above was re-run in the ordinary clone and is
clean. No aggregate `pnpm check`, test suite, typecheck, generated-diff check, or Phase
1 suite is claimed.

## 14. Reproduction

```text
git fetch origin 044078d3b19ff3307dc347b0b9e7ecbbed1750c6
git log -1 --format='%P %T' 044078d3…                      # 070e5dd5… a24aa097…
P=governance/drafts/release-3-preparation/semantic-source-acquisition-result.md
git rev-parse 044078d3…:$P                                  # ff2ee8c3…
git show 044078d3…:$P | wc -c                               # 334121
git show 044078d3…:$P | sha256sum                           # 02290488…57acb1
git show 044078d3…:$P | head -c 326756 | cmp - <(git show 070e5dd5…:$P)   # byte-equal
sha256sum 26_Hayter_1986.pdf 25_Welsch_1977.pdf 24_Einot_1975.pdf 36_Ryan_1960.pdf 35_Keuls_1952.pdf 17_Duncan_1955.pdf   # Section 3
python3 scripts/hayter_table1_check.py                      # Section 6.1 (54 cells)
python3 scripts/hayter_a2_and_finite_nu.py                  # Section 6.1 (A.2, finite nu)
python3 scripts/k5_rerun_and_arithmetic.py <repo-root>      # Section 6.2 and 6.5
python3 scripts/stepdown_fwer_simulation.py 20000           # Section 6.4 (seeded)
python3 scripts/critical_sequence_monotonicity.py           # Section 6.6 (about 15 minutes)
```

RELEASE 3 SR-H CROSS-CUTTING ADVERSARIAL REVIEW COMPLETE - SIX ORIGINALS VERIFIED, NEWMAN
SOURCE_ACCESS_INCOMPLETE - GO WITH ONE SHOULD-FIX (S-X1) - SR-H PARTIAL CANDIDATE SUPPORTED -
NOT ACCEPTED - NOT ADOPTED
