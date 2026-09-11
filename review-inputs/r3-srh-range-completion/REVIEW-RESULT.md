# Release 3 Source-Acquisition Result Part L — Independent Repair Review of S-K1 and Primary-Source Completion for Newman (1939) and Duncan (1955)

**Status: informative independent review result; non-normative; not adopted.**
This record is a separate-context, exact-head review of the Part L increment proposed in
PR #207 of the Release 3 semantic source-acquisition result, performed as the two
separately reported checks that result Section L.4 commissions:

- **Check A (repair review).** Close-only review of Section L.2 (the author-side repair of
  PR #206 finding S-K1) against PR #206 Section 10 and the unchanged K.3 item 3, reusing
  PR #206's completed Welsch (1977) primary inspection. Original 25 was not re-read.
- **Check B (primary-source completion).** First independent primary-source verification
  of the two SR-H readings that no review record on the repository had covered: C.3 row
  06 (Newman 1939, claim `C-H1` / `APR-10`) and C.3 row 17 (Duncan 1955, claim `C-H2` /
  `APR-11`), together with their K.6 reuse. Both originals were supplied to the review
  environment and re-hashed; they match the C.2 identities exactly.

The review selects no Contract, procedure, variant, identifier, schema, Public Check,
tolerance, critical value, interpolation rule, implementation, RFC decision, R4 method,
or release outcome; it updates no hold, issue, gate, or catalogue class; it merges
nothing and accepts nothing. Attribution is role-based; material process provenance is
disclosed in Sections 1 and 13.

**Check A verdict: `GO` for the Part L delta; S-K1 `CLOSED` as an additive author-side
repair; no regression** (Section 7). Every L.2 statement is consistent with the PR #206
Section 10 finding and with the printed-page evidence PR #206 recorded from Welsch
pp.568, 569 and 575; the Appendix A monotone-enforcement step is attributed to the
step-up (GAPA/GAPB) table construction only; it is not transferred to NKA/NKB as a
printed fact; the general tail-monotonicity statement stays investigator reasoning; the
326756-byte Parts A–K prefix, the K.3 text, the ledger and every disposition are
unchanged. `BLOCKER` 0 / `SHOULD-FIX` 0 / `NICE-TO-HAVE` 2 (A-N1, A-N2 in Section 7).

**Check B verdict: `GO` for C.3 rows 06 and 17 and their K.6 reuse as bounded
characterizations** (Section 12). Every row-06 and row-17 statement is supported by the
printed pages at the stated pinpoints, with formulas, inequalities and subscripts
checked on page images. The existing p.28 degrees-of-freedom doubt (C.7) is confirmed and
sharpened: `f = 3` is not a tabulated argument of Newman's Tables III/IV, and the printed
critical values on that page are those of the `f = 30` row. One further printed
inconsistency in Duncan p.28 (Section 9) is recorded, not corrected.
`SOURCE_ACCESS_INCOMPLETE` does not apply to either original. `BLOCKER` 0 /
`SHOULD-FIX` 0 / `NICE-TO-HAVE` 5 (B-N1 to B-N5 in Section 12).

**Combined assessment (Section 11): the `SR-H` `PARTIAL` candidate is supported by the
combined fixed evidence** — PR #206's four-original review, the accepted `C-H4`
evidence reused unchanged, and this review's verification of the two remaining texts.
`CLOSED` is not reached and is not proposed: `APR-12` still resolves to several distinct
procedures (K.3 item 1, PR #206 Section 8), the exact monotonicity/selection conditions
and the recorded print conflicts remain named gaps, and completion of source inspection
is not converted into hold closure or method selection. Whether hold-level `PARTIAL` is
formally accepted remains a steward decision not made here. **`APR-10`–`APR-14` stay
`RES-ONLY`; candidate ledger 5 `CLOSED` / 1 `PARTIAL` / 8 `INPUT_INCOMPLETE`; overall
`INPUT_INCOMPLETE`; semantic `NARROW`; 35 originals in custody; all other holds and the
R4 limitations unchanged** (Section 11). **Independence: context `ESTABLISHED`; model
level session-service-recorded for the review side, testimony-supported for the author
side; no steward determination made here** (Section 13). **Merge, hold acceptance,
method or variant adoption, numerical replacement, public opening, release:
`NOT PERFORMED`** and not authorized by this record.

## 1. Review identity, scope, role, and independence

| Field                 | Value                                                                                                                                                                                                                                                                                                                                                                           |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository            | `licklider-ai/nomue-protocol` (public)                                                                                                                                                                                                                                                                                                                                          |
| Reviewed pull request | #207 (draft; head branch `research/r3-srh-range-review-followup-20260908`; base `research/r3-srh-range-synthesis-20260908`, the PR #204/#206 head, comparison only)                                                                                                                                                                                                             |
| Reviewed exact head   | `044078d3b19ff3307dc347b0b9e7ecbbed1750c6` (the PR head at the start and at the end of this review; Section 2)                                                                                                                                                                                                                                                                  |
| Result path           | `governance/drafts/release-3-preparation/semantic-source-acquisition-result.md`                                                                                                                                                                                                                                                                                                 |
| Review date           | 2026-09-08 (UTC)                                                                                                                                                                                                                                                                                                                                                                |
| Reviewer role         | independent exact-head reviewer for the two checks commissioned in result Section L.4, under the acquisition commission's review clause and the user's request to review PR #207                                                                                                                                                                                                |
| Non-involvement       | this review session did not author, revise, or repair the acquisition commission, any of Parts A–L of the result, the continuation record, or any prior review record. It was started fresh on 2026-09-08 (session created 02:21:00Z, after the reviewed commit at 02:14:13Z and PR #207 at 02:14:51Z) from a new clone of `main` at `f39100161cb45de15767bdb19ed54aba9489b41a` |
| Prior records read    | PR #206's review (`review-inputs/r3-srh-range-synthesis/REVIEW-RESULT.md` at `f1cbcca6…`) was read in full before the verdicts were fixed, because L.4 item 1 commissions a comparison against its Section 10 and its Section 4 Welsch evidence is reused (Section 4). Parts I/J, PR #201/#203 and continuation Section 16 were not re-read; their `C-H4` verdicts are reused   |
| Originals inspected   | two lawfully supplied PDFs (Section 3), delivered to the review environment by the user as local uploads; no retrieval, purchase, or redistribution                                                                                                                                                                                                                             |
| Review branch         | `review/r3-srh-range-completion-20260908`, created from the reviewed head as sole parent; an unused name at creation time                                                                                                                                                                                                                                                       |
| Files added           | this file only                                                                                                                                                                                                                                                                                                                                                                  |
| Not stored in Git     | the PDFs, page images, crops, and text extractions (kept in the session scratch directory only)                                                                                                                                                                                                                                                                                 |
| Comment on the PR     | none posted                                                                                                                                                                                                                                                                                                                                                                     |

Read before source work: `AGENTS.md`, `CHARTER.md`, `AUTHORITY.md`, `governance/RFC.md`
(research gate rules 2–5 in particular), the pinned acquisition commission (Section 2),
the Release 3 preparation `README.md`, result Sections C.1–C.3, C.7, I.5, K.1–K.7 and
L.1–L.4, and the fixed semantic input's `APR-10`–`APR-12` and `SR-H` rows (Sections 8,
9 and 17 of that document). The directory-local `AGENTS.md` files exist only under
`spec/`, `conformance/` and `reference/`; none applies to `review-inputs/` or
`governance/`.

## 2. Fixed identity verification (expected versus observed)

Live head checked at review start (before any source work) and again immediately before
the review commit; it did not move. `STALE_HEAD` does not apply.

| Check                        | Expected                                                                                                                | Observed                                                                                                                                                                                 | Result |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| Live head (start)            | `044078d3b19ff3307dc347b0b9e7ecbbed1750c6`                                                                              | PR `head.sha` and `origin/research/r3-srh-range-review-followup-20260908` both `044078d3…`                                                                                               | match  |
| Live head (end)              | same                                                                                                                    | re-fetched before commit: `044078d3…`; PR still open, draft, unmerged                                                                                                                    | match  |
| Sole parent                  | `070e5dd569f0dfcb6f15ec49daebc0544af217d9`                                                                              | `git cat-file -p 044078d3…` shows exactly one `parent` line, `070e5dd5…`; equals PR `base.sha`                                                                                           | match  |
| Head tree                    | `a24aa097da7b5e8eb0978bc18fa76f9279e32cea`                                                                              | `git cat-file -p 044078d3…` → tree `a24aa097…`                                                                                                                                           | match  |
| Result blob at head          | `ff2ee8c3ca08b57ecc62c143a46153b02bcd04f7`                                                                              | `git rev-parse 044078d3…:<result path>` → `ff2ee8c3…`                                                                                                                                    | match  |
| Result bytes                 | 334121                                                                                                                  | `git cat-file -s` → 334121                                                                                                                                                               | match  |
| Result SHA-256               | `02290488c7a9997b72caf228bb6e32a03465b4117d65f456826b5a3fa957acb1`                                                      | `git show … \| sha256sum` → `02290488…57acb1`                                                                                                                                            | match  |
| Changed paths parent → head  | the result file only, append-only                                                                                       | `git diff --stat` → one file, `+111/−0`; no other path touched                                                                                                                           | match  |
| Parts A–K prefix             | first 326756 bytes identical to parent blob `5ee739767f3b29db6a7628f092e26d9b909830c8`                                  | parent blob is 326756 bytes, SHA-256 `ecddbd70…28cac9`; `head -c 326756` of the head blob has the same SHA-256 and compares byte-equal with `cmp`                                        | match  |
| Commission blob              | `3c7ddcc696f0c284213f7efe0da68e747bc238d7` at `f39100161cb45de15767bdb19ed54aba9489b41a`                                | `git rev-parse f3910016…:<commission path>` → `3c7ddcc6…`; `f3910016…` is `origin/main` and the merge base of the head with `main`                                                       | match  |
| Fixed semantic input         | commit `7bd9c5ab854777c3e99e624d9d2ed62731228852`, blob `8f21526040924b891f64724c2d0fde9ea94eff92`                      | `git rev-parse 7bd9c5ab…:<semantic result path>` → `8f215260…`                                                                                                                           | match  |
| PR #206 review (L.1 locator) | commit `f1cbcca6e1ff06670d43d44bd38bf76a7a43833a`, parent `070e5dd5…`, tree `90b49522…`, blob `752b7a1e…` (56183 bytes) | `git cat-file -p f1cbcca6…` → tree `90b49522740540e35d3af8eb0bb8dacf133902b8`, sole parent `070e5dd5…`; `git rev-parse f1cbcca6…:<review path>` → `752b7a1e…`; `git cat-file -s` → 56183 | match  |
| Continuous integration       | green on the head                                                                                                       | five check runs on `044078d3…`, all `completed` / `success`                                                                                                                              | match  |
| Prior SR-H review branches   | present, untouched                                                                                                      | `review/r3-srh-lsd-primary-20260908`, `review/r3-srh-lsd-repair-20260908`, `review/r3-srh-range-synthesis-20260908` exist at their recorded heads; not modified here                     | match  |

The 326756-byte prefix equality is also the proof that K.3 item 3 (the text S-K1
addresses) is unchanged at the head: the repair is purely additive in Part L.

## 3. Source artifact identity and inspection performed

Both files were re-hashed from the supplied bytes and opened with an independent PDF
library (PyMuPDF 1.28.2 under Python 3.11.15); page counts were recomputed. Every value
matches C.2 and the L.3 table.

| Supplier / file           |   Bytes | PDF pages | SHA-256 (recomputed)                                               | Printed pages read as text                                                                                                  | Page images inspected at 170–200 dpi                                                                                                                              |
| ------------------------- | ------: | --------: | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 06 / `06_Newman_1939.pdf` | 1141066 |        12 | `2a95351862462f2165a4a2f82f16572eb4a0482afcea2772c590ade02e45e974` | 20–28 (minimum scope 20–24, 27–28, plus 25–26 for the tables and Example A)                                                 | 20, 21, 22, 23, 24 (full pages: definitions, (1)–(10), Tables I–II), 25 (Tables III–IV), 27, 28 (Examples A–C and the `f = 3` print)                              |
| 17 / `17_Duncan_1955.pdf` | 4442167 |        43 | `6504e0bd884850d639ea5e0a9b5794d3c02f7d3df5895e3ca64ced6face64bdf` | 1–2, 5–7, 13–16, 28, 41 (minimum scope 5–7, 16, 28, 41, plus 1–2 and 13–15 for the definitions the row-17 claims depend on) | 3 (Table II, rotated), 5, 6, 7 (worked test, exception rule, Section 3 model), 13 (Section 4.3 definitions), 16, 28 (Section 5.4.2 rule), 41 (table construction) |

Page mapping confirmed on the covers and running heads: for 06, PDF page 1 is the
JSTOR cover and printed page `p` is PDF page `p − 18` (C.3 states `p−18`); for 17, PDF
page 1 is the JSTOR cover and printed page `p` is PDF page `p + 1` (C.3 states `p+1`).
Bibliographic identity on the covers: Newman, _Biometrika_ 31(1/2), July 1939,
pp.20–30, JSTOR 2334973; Duncan, _Biometrics_ 11(1), March 1955, pp.1–42, JSTOR
3001478 — both as in the fixed semantic input's Section 2.2 (`SRC-29`) and C.3.

Additional coverage beyond the L.3 minimum, read because a stated claim depended on it
(L.3 asks for this to be reported rather than stopped at): Newman pp.25–26 (the working
Tables III/IV, whose tabulated `f` arguments decide the p.28 doubt, and Example A's
`s = 15.95` and `q = 16.1`); Duncan pp.1–2 (the barley data and the paper's own
description of the new test as combining Newman/Keuls simplicity with the multiple
comparisons test's power), pp.13–15 (Section 4.3 definitions of _p_-mean significance
and protection levels and the independent-tests analogy that p.16 generalizes), and the
Table II page (p.3) to check the p.5 quotation of the `n₂ = 30` row.

Not inspected by this review, and not approved by it: Newman's pp.29–30 (Example C's
worked numbers and references); Duncan's Sections 4.1–4.2, 5.1–5.3, 5.4.1, 5.4.3–5.4.4,
6 and the multiple F tests, Table III (1% level), Tables V–VII and the figures; any
external proof or table either paper cites (Pearson 1932, McKay–Pearson 1933, Hartley
1938, Fisher 1938, Pearson–Hartley, Beyer 1953). Keuls (1952), Ryan (1960), Einot–Gabriel
(1975), Welsch (1977) and Hayter (1986) were **not** re-read here; where their content
matters (Sections 4 and 9) the PR #206 and PR #201/#203 records are reused with
attribution.

## 4. Check A — L.2 against PR #206 Section 10 and the unchanged K.3 item 3

PR #206 S-K1 (Section 10 of that record) states: K.3 item 3 describes the successive
maxima of raw critical values as "investigator reasoning", whereas Welsch p.569
Appendix A prints, for the step-up tables, "If C_k turns out as a result of this
computation to be less than C_{k−1}, we shall put C_k = C_{k−1} in order to preserve the
ordering of the C_i"; the p.575 usage example (GAPA, t = 5, ν = 20: 3.58, 3.97, 3.97,
4.29) shows its effect; for NKA/NKB, p.571 states only that inverse interpolation "was
the same as that described for C₂" and states no enforcement step; the record should
cite the Appendix A sentence as a source statement for the step-up tables and state that
the step-down tables carry no such printed statement; no disposition changes.

Each L.2 statement is compared below with that finding and with PR #206's Section 4
transcriptions of Welsch pp.567–569, 571 and 575 (page images inspected by that review).
"Reused" means this review relies on PR #206's printed-page confirmation and did not
re-open original 25.

| L.2 statement                                                                                                                                                                   | PR #206 evidence reused                                                                                                                                                                                     | Assessment                                                                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "The K.3 item 3 caution is incomplete as a description of attribution"                                                                                                          | S-K1 heading: "K.3 item 3 under-attributes the monotone-enforcement step"                                                                                                                                   | Consistent; the same defect is named                                                                                                                                                           |
| For the **step-up** construction, Welsch p.569 Appendix A "explicitly specifies replacing a newly computed `C_k` below `C_(k-1)` by `C_(k-1)` to preserve the ordering"         | S-K1 quotation of the Appendix A sentence; Section 4 row "numerical and directional boundaries" (Appendix A: step-up `C_k` by conditional Monte Carlo)                                                      | Supported as a faithful paraphrase of the quoted sentence; pinpoint p.569 Appendix A agrees. The locator "after (A.1)" is finer than anything PR #206 recorded and is not verified here (A-N1) |
| "This is a source statement for GAPA/GAPB, not merely investigator reasoning"                                                                                                   | PR #206 Section 5 item 4: the enforcement "is a stated step of Welsch's step-up table construction (p.569, Appendix A), not only investigator reasoning"; p.568 names GAPA/GAPB as the step-up procedures   | Supported; GAPA/GAPB are the step-up procedures to which Appendix A applies                                                                                                                    |
| p.575 GAPA example at `t=5`, `nu=20` prints 3.58, 3.97, 3.97, 4.29 in increasing stretch order; the repetition illustrates the monotone sequence without certifying the numbers | S-K1: "The p.575 usage example shows its effect (GAPA, t = 5, ν = 20: 3.58, 3.97, 3.97, 4.29)"                                                                                                              | Supported; the four values and their order agree; L.2 correctly refuses to certify them or reconstruct their computation                                                                       |
| For **step-down** NKA/NKB, p.568 Theorem 2 requires a nondecreasing critical sequence                                                                                           | Section 4: Theorem 2 "For a step-down procedure with C_t ≥ C_{t−1} ≥ … ≥ C₂"; NKA/NKB "use the studentized range"                                                                                           | Supported (nondecreasing in stretch size)                                                                                                                                                      |
| p.571 opening paragraph: inverse interpolation as for C₂, Monte Carlo unnecessary; it does not explicitly prescribe the same replacement step                                   | Section 4: p.571 "no conditioning and, therefore, no Monte Carlo is necessary"; S-K1: p.571 states only that interpolation "was the same as that described for C₂" and "does not state an enforcement step" | Supported                                                                                                                                                                                      |
| "Do not transfer the Appendix A step-up instruction to every step-down table as a printed historical fact"                                                                      | S-K1: "state that the step-down tables carry no such printed statement"                                                                                                                                     | Supported; this is exactly the boundary S-K1 asked for, and L.2 does not attribute the replacement step to NKA/NKB                                                                             |
| "raising a critical value cannot increase its tail probability remains investigator reasoning"                                                                                  | S-K1: "the investigator's caution that a bare quantile list is not a complete procedure stands"; K.3 item 3 unchanged (Section 2 prefix check)                                                              | Supported; the general statement is correctly kept on the inference side, separate from the two printed facts above                                                                            |
| "No numerical table, production monotonization rule, guarantee or implementation is adopted"                                                                                    | S-K1: "No disposition changes"                                                                                                                                                                              | Supported; Section 5 below confirms that no disposition, class or ledger value moved                                                                                                           |
| "The page images were inspected in Part K's author pass; PR 206's source confirmation is reused here. No new PDF reading or numerical recomputation is claimed"                 | PR #206 Section 3 (Welsch images pp.567, 568, 569 inspected)                                                                                                                                                | Consistent and correctly bounded; this review likewise claims no new reading of original 25                                                                                                    |

Reviewer addition, from Check B (Section 9): Duncan p.41 prints the analogous device for
Duncan's own tables — `Q(p, n₂, α) = max{R(p, n₂, γ_{p,α}), Q(p−1, n₂, α)}` for `p > 2` —
which PR #206 S-K1 mentioned via C.3 row 17 and which is now independently verified on
the page image. Like Welsch's Appendix A sentence, it is a printed construction rule for
one author's tables and is not evidence about any other table.

## 5. Check A — L.1, L.3 and L.4 consistency and regression check

- **L.1 identities.** The PR #206 commit, sole parent, tree, review blob and byte count
  quoted in L.1 all match the fetched objects (Section 2). L.1's statement that the PR
  #206 reviewer "expressly does not independently verify Newman/Duncan or formally accept
  the hold" is an accurate summary of PR #206 Sections 8, 9 and 11.
- **L.3 optional findings.** N-K1 through N-K5 are the five `NICE-TO-HAVE` items of PR
  #206 Section 10; L.3's deferral and its N-K2 remark (K.3 uses only the sum budget and
  adopts no product guarantee) are consistent with K.2/K.3 and with PR #206 Section 6.
- **L.3 coverage gap.** L.3's description of PR #206 Section 9 (author-side C.3 readings
  never independently reviewed; independent coverage missing, not a reversal of
  acquisition) is accurate. The two-row table reproduces the C.2 bytes, PDF page counts and
  SHA-256 values exactly and the PR #206 Section 9 minimum page scope exactly. L.3 says
  the identities are "reused from C.2, not rehashed in this pass" and that the PDFs are
  absent from the author environment's intake directories; the second statement is
  author-side environment testimony that this review cannot check and does not need to:
  the supplied copies match C.2 byte-for-byte (Section 3).
- **L.4 dispositions.** The ledger (5/1/8), overall `INPUT_INCOMPLETE`, semantic `NARROW`,
  35 originals, `APR-10`–`APR-14` `RES-ONLY`, the existing `C-H4` acceptance and the
  unchanged holds are the K.6 values PR #206 Section 8 confirmed; Part L states them
  without alteration. L.4's statement that the S-K1 repair "does not resolve the APR-12
  variant questions or the recorded print conflicts" is correct: nothing in L.2 touches
  K.3 item 1 or K.4.
- **Regression.** No text before byte 326756 changed; no new source claim about any of
  the four Part K originals or about Hayter is introduced; the only new source-attributed
  content (the Appendix A step and the p.575 values) is confirmed above; the closing
  status line keeps "SR-H PARTIAL CANDIDATE - OVERALL INPUT_INCOMPLETE". No regression
  found.

## 6. Check A — separation of source statement and inference after Part L

After Part L, the attribution for the monotone critical sequence reads as follows, which
the review finds correct and complete for the S-K1 purpose:

| Item                                                                            | Status after Part L                                        | Basis                              |
| ------------------------------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------- |
| Step-up tables (GAPA/GAPB): `C_k := C_{k−1}` when the computed `C_k` is smaller | printed source statement, Welsch p.569 Appendix A          | PR #206 S-K1 quotation, reused     |
| Step-down tables (NKA/NKB): any enforcement step                                | no printed statement; p.568 Theorem 2 assumes the ordering | PR #206 Section 4 and S-K1, reused |
| Duncan's tables: `Q(p) = max{R(p, γ_p), Q(p−1)}`                                | printed source statement, Duncan p.41                      | this review, Section 9             |
| "Raising a critical value cannot increase its tail probability"                 | investigator reasoning (K.3 item 3, unchanged)             | L.2 third paragraph                |
| Any production monotonization rule or table                                     | not adopted                                                | L.2, L.4                           |

## 7. Check A verdict and findings

`GO` for the Part L delta at head `044078d3b19ff3307dc347b0b9e7ecbbed1750c6`. **S-K1:
`CLOSED`** as an additive author-side repair: L.2 cites the Appendix A sentence as a
source statement for the step-up tables, states that the step-down tables carry no such
printed statement, and leaves the general inference on the inference side, which is what
PR #206 Section 10 asked for. K.3 item 3's original wording remains in the preserved
prefix; because the repair is additive, readers of K.3 alone still see the earlier
under-attribution, and L.2 is the record that corrects it. That is the repository's
append-only convention, not a defect. No `PARTIAL` or `OPEN` residue on S-K1 and no
regression.

**BLOCKER:** none. **SHOULD-FIX:** none.

**NICE-TO-HAVE:**

- **A-N1** — L.2 locates the enforcement sentence "after (A.1)". PR #206 quoted the
  sentence from p.569 Appendix A without an equation anchor, so the "(A.1)" position is
  the only L.2 detail this review could not confirm from reused evidence. It is not
  decision-bearing and did not justify re-opening original 25; a future pass that has
  Welsch open can confirm or drop the anchor.
- **A-N2** — L.2 could cross-reference Duncan p.41 (C.3 row 17, verified in Section 9) as
  the analogous printed construction rule, since PR #206 S-K1 already drew that parallel;
  this would make the "one author's tables only" boundary self-evident to later readers.

## 8. Check B — Newman (1939), C.3 row 06 and the K.6 `APR-10` reuse

C.3 row 06 states: "Studentized range with independent scale estimate; two-member
critical value has sqrt(2) relation to two-sided t. Keuls remains unread; a rounded table
is not a certified oracle", pinpoints pp.20–24, 27–28, claim `C-H1` / `APR-10`
"partial".

| Row-06 or L.3 element                                                            | Printed evidence at the pinpoint                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Result                                                                                                                                                                                                                                                                                                                                                                                                          |
| -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Studentized range                                                                | p.20: the ratio `q = w/s`, "where w is the range in a sample of n observations from a normal population with standard deviation σ"; p.21: "probability levels for 'studentized' functions" (Hartley 1938)                                                                                                                                                                                                                                                                                                                                                                                                         | Supported                                                                                                                                                                                                                                                                                                                                                                                                       |
| Independent scale estimate                                                       | p.20: "s² is an _independent_ and unbiassed estimate of σ² based on f degrees of freedom, obtained from a sum of squares in the usual manner"; p.21: p(s) is the χ-type density (1) and "w and s are independent"; p.28 Example C: an estimate `s'` from mean pair-ranges cannot be used with the tables "since the sampling distribution of (s')² is not that of χ²"                                                                                                                                                                                                                                             | Supported; the source itself states both independence and the chi-square-type requirement                                                                                                                                                                                                                                                                                                                       |
| Degrees of freedom                                                               | p.20: `f` is the df of `s²`; p.22 (2), Table I and (4) are indexed by `f`; Example A p.26–27 uses `f = 20` (Latin-square error df), Example B p.27 uses `f = 30`, Example C p.28 uses `k` (number of duplicate pairs)                                                                                                                                                                                                                                                                                                                                                                                             | Supported; `f` is the error df of the independent estimate, on the scale of the means (p.20 "an independent estimate, s², of their sampling variance"; p.27 "the standard deviation of a mean of seven plots … s = 9.52")                                                                                                                                                                                       |
| Two-member critical value has the √2 relation to two-sided t                     | p.23, "Special case when n = 2": (5)–(9) derive `p(q)` as "the positive half of a 'Student' distribution having f degrees of freedom"; (10) `q_α = t_α √2`, "where t_α will be respectively the 5 and 1 % levels for t"; footnote: "These levels correspond to deviations at which the ordinates cut off 2·5 and 0·5 % from each end of the t-distribution, but they are termed by Fisher the 5 and 1 % levels"                                                                                                                                                                                                   | Supported on the page image, including the footnote that makes `t_α` the two-sided point. Reviewer check: Table II's `n = 2` column reproduces `t_{0.975,f}·√2` and `t_{0.995,f}·√2` at all five `f` (5, 10, 20, 30, ∞) to the printed two decimals (3.64, 3.15, 2.95, 2.89, 2.77; 5.70, 4.48, 4.02, 3.89, 3.64)                                                                                                |
| A rounded table is not a certified oracle                                        | p.21: the tables "rest to some extent on an empirical basis"; p.22 (a)–(d): E. S. Pearson's empirical curves for `n = 4, 6, 10, 20` in place of the unknown `p(w)`, quadrature at interval 0·5, trial values and backward interpolation; p.23: only `n = 2, 3` exact; Tables III/IV by five- and six-point Lagrangian interpolation in `60/n` and `60/f`, "reduced to one place of decimals"                                                                                                                                                                                                                      | Supported; the caution is the source's own description of its construction                                                                                                                                                                                                                                                                                                                                      |
| Ordered-range construction (K.6 `APR-10` row: "Newman author record C.3 reused") | p.20–21: compare the largest-minus-smallest treatment mean with `s`; "Should this difference be clearly significant … the more divergent of the extremes, say x̄₁, could be set aside, and the difference x̄_n − x̄₂ compared with s, using n − 1 and f"; attributed to "Student" (1927); Examples A and B (pp.26–28) apply successive omission of divergent treatments with the critical value for the reduced `n`; p.27 (iii) also tries a split into two groups; p.27: the method "must be employed with discretion … when observations are rejected and a hypothesis tested using the selected data that remain" | Supported as a successive-elimination range procedure without a formal stopping rule or error-rate statement. Newman prints no familywise claim; the only stated level is `α` for each range test. K.6's boundary that "Keuls and Newman are not asserted to be byte-identical algorithms" is correct: Keuls (per PR #206 Section 5) adds the subgroup-criterion stepping that Newman describes only informally |
| "Keuls remains unread"                                                           | —                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Historical statement of the C.3 pass (2026-09-07); superseded by Part K and PR #206, and read that way (B-N5)                                                                                                                                                                                                                                                                                                   |

**The existing p.28 degrees-of-freedom doubt (C.7: "06 p.28 prints f=3 while preceding
f=30 and referenced table values suggest a discrepancy").** Confirmed and sharpened on
the page images:

- p.27 fixes Example B's error df at `f₂ = 30` and enters Tables III and IV "with n = 7,
  f = 30"; p.28 (i) and (ii) print "for n = 5, f = 3" and "for n = 6, f = 3".
- Tables III and IV (p.25) tabulate `f = 5, 6, …, 20, 24, 30, 40, 60, ∞` only; `f = 3` is
  not an argument of either table, so the printed `f = 3` cannot have been "entered".
- The critical values printed on p.28, `q₀.₀₅ = 4·1` (n = 5) and `4·3` (n = 6), are the
  `f = 30` entries of Table III (row 30: 2·89, 3·5, 3·9, **4·1**, **4·3**, 4·5, …); the
  `f = 5` entries would be 5·7 and 6·0.
- The arithmetic on the page is consistent: 379·86 − 341·86 = 38·0, 38·0/9·52 = 3·99 →
  "4·0"; 387·14 − 360·43 = 26·71, 26·7/9·52 = 2·80 → "2·8".

Investigator inference, recorded and not adopted: the intended value is `f = 30`, and
the example's conclusions are unaffected. No erratum was searched for or is claimed; the
print is retained as C.7 requires, and the doubt is now a confirmed print inconsistency
with a plausible intended value rather than an open reading question.

**Separation for row 06.** Source statements: the definition of `q`, the independence and
chi-square-type requirement on `s`, the `n = 2` derivation and (10), the empirical
construction of the tables, the successive-elimination suggestion and its caution.
Investigator inference: the √2 numerical check in Table II, the `f = 30` reading of
p.28, and the observation that Newman's first-step range test is exactly level `α`
under the complete null (weak control) — which Newman does not state and which the
catalogue's `APR-10` note ("reported weak-only FWER control unverified") is not closed
by, because the weak-only characterization concerns the complete Newman–Keuls stepping
procedure, whose strong-control failure mechanism is the Einot–Gabriel Section 1.7
material verified by PR #206, not Newman's paper.

## 9. Check B — Duncan (1955), C.3 row 17 and the K.6 `APR-11` reuse

C.3 row 17 states: "Equal-precision independent normal means and independent variance
estimate; p-mean protection (1−alpha)^(p−1). Every containing ordered subset matters;
p.41 monotonizes critical ranges by max with predecessor. Nominal 5% is not general 5%
FWER", pinpoints pp.5–7, 16, 28, 41, claim `C-H2` / `APR-11`.

| Row-17 or L.3 element                                                     | Printed evidence at the pinpoint                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Result                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Equal-precision, independent, normal means                                | p.7 Section 3: observed means `m₁, …, m_n` "assumed to have been drawn independently from n normal populations with 'true' means μ₁, …, μ_n respectively, and a common standard error σ_m"                                                                                                                                                                                                                                                                                                                                                                                                                                      | Supported (common standard error of the means = equal precision)                                                                                                                                                                                                                                                                                                                                                                                                            |
| Independent variance estimate and its df                                  | p.7: "the usual estimate s_m, which is independent of the observed means and is based on a number of degrees of freedom, denoted by n₂. (More precisely, s_m has the property that n₂s_m²/σ_m² is distributed as χ² with n₂ degrees of freedom, independently of m₁, m₂, …, m_n.)"; p.5: `s_m = 3.643`, `n₂ = 30` in the example                                                                                                                                                                                                                                                                                                | Supported on the page image, including the subscripts and the χ² statement                                                                                                                                                                                                                                                                                                                                                                                                  |
| Protection level definition (needed for the FWER statement)               | p.13 Section 4.3 (additional coverage): "A p-mean significance level in general represents the maximum probability of finding at least one wrong significant difference among p observed means"; the p-mean protection level is its complement, "the minimum probability of finding no wrong significant differences among p observed means"; `γ(1,2) = minimum P[dec.(1,2 underscored) \| μ₁ = μ₂] = 1 − α(1,2)`; `γ(a₁,…,a_p) = minimum P[dec.(a₁,…,a_p underscored) \| μ_{a₁} = … = μ_{a_p}]`, `p = 2, …, n`                                                                                                                 | Supported; the p-mean protection level is one minus the maximal probability of at least one false significant difference among a set of `p` means whose true means are equal                                                                                                                                                                                                                                                                                                |
| p-mean protection level `(1−α)^(p−1)`                                     | p.16: "the value γ_p = γ₂^(p−1) for any p-mean protection level is appropriate in association with the value γ₂ for a two-mean protection level. The exponent p − 1 … is given by the number of independent comparisons which can be specified, or the degrees of freedom, among the p means"; example values `γ₂ = 95%, γ₃ = 90.25%, γ₄ = 85.7%, γ₅ = 81.5%, γ₆ = 77.4%, γ₇ = 73.5%`; `γ₁₀₁ = (.95)^100 = 0.6%`; p.28: `α_p = 1 − γ_p, γ_p = (1 − α)^(p−1)`; p.41: `γ_{p,α} = (1 − α)^(p−1)`                                                                                                                                   | Supported on the page images (exponent `p − 1` confirmed at all three places). Reviewer arithmetic: `0.95^(p−1)` for `p = 2..7` gives 95, 90.25, 85.74, 81.45, 77.38, 73.51% and `0.95^100 = 0.59%`, matching the printed roundings                                                                                                                                                                                                                                         |
| Every containing (ordered) subset matters                                 | p.6 (italic rule): "each difference is significant if it exceeds the corresponding shortest significant range; otherwise it is not significant … _Exception_: … no difference between two means can be declared significant if the two means concerned are both contained in a subset of the means which has a non-significant range" (footnote: "subset" includes the complete set); p.28 Section 5.4.2 general rule: "The difference between any two means in a set of n means is significant provided the range of each and every subset which contains the given means is significant according to an α_p-level range test" | Supported. Reviewer note: p.28 says "each and every subset", not only contiguous ordered subsets; with critical ranges nondecreasing in `p` (p.7, p.41) the two readings coincide, because any subset containing two means lies inside the contiguous span between its own extremes, which has the same range and at least as large a size. C.3's "ordered subset" wording is therefore an equivalent reading under the printed monotone construction, not a stronger claim |
| p.41 monotonizes critical ranges by max with predecessor                  | p.41: "Q(p, n₂, α) = R(p, n₂, γ_{p,α}) for p = 2, and … Q(p, n₂, α) = R(p, n₂, γ_{p,α}) or Q(p − 1, n₂, α), whichever is the larger, for all other values of p. This ensures that each p-mean protection level in the new multiple range test is γ_{p,α} for all values of p"; p.7: "the shortest significant ranges R_p become smaller with decreases in the subset size p"                                                                                                                                                                                                                                                    | Supported on the page image (`whichever is the larger`). See B-N3 on "is γ_{p,α}"                                                                                                                                                                                                                                                                                                                                                                                           |
| Worked example values (internal consistency of pp.5–7)                    | p.5 quotes Table II at `n₂ = 30`: 2.89, 3.04, 3.12, 3.20, 3.25, 3.29; Table II p.3 (image, rotated) row 30 prints the same six values; `R_p = 3.643 × Q` gives 10.53, 11.07, 11.37, 11.66, 11.84, 11.99 (recomputed, all match); the thirteen differences in steps 1–13 (21.7, 13.2, 10.3, 21.6, 13.1, 18.0, 9.5, 11.9, 11.4, 8.5) recompute exactly from the Table I means; `71.3 − 11.99 = 59.31`                                                                                                                                                                                                                             | Supported; no arithmetic inconsistency found on these pages                                                                                                                                                                                                                                                                                                                                                                                                                 |
| "Nominal 5% is not general 5% FWER"                                       | By the p.13 definition, the p-mean significance level `1 − γ_p = 1 − (1−α)^(p−1)` is the maximal probability of at least one false significant difference among `p` means with equal true means; p.16 prints `γ₇ = 73.5%` for the seven-mean test and `γ₁₀₁ = 0.6%`; p.16 also states that the two-mean level guarantees only that "the probability of finding a significant difference between any two means when the corresponding true means are equal is definitely less than or equal to 5%"                                                                                                                               | Supported as a direct consequence of printed definitions and values: for `p ≥ 3` the source's own p-mean significance level exceeds `α` (26.5% at `p = 7`, 99.4% at `p = 101`). The words "familywise error rate" are the investigator's translation; the numbers are Duncan's                                                                                                                                                                                              |
| Distinction from the Einot–Gabriel rescaled allocation (K.6 `APR-11` row) | Duncan's own calibration is `γ_p = (1−α)^(p−1)`, i.e. `α_p = 1 − (1−α)^(p−1)`, which reaches `1 − (1−α)^(n−1)` at `p = n` (pp.16, 28, 41). PR #206 Section 4 (reused, Einot–Gabriel not re-read) records (1.12) `γ_p^D = 1 − (1−α)^((p−1)/(k−1))`, "adjusted so as to ensure experimentwise level α", which equals `α` at `p = k`; and p.574–575 of that paper describing conventional Duncan tables as tabulated by the pairwise error rate                                                                                                                                                                                    | Supported: the two are different calibrations. For `k = 7`, `α = .05` the original levels are .050, .098, .143, .186, .226, .265 and the rescaled ones .0085, .017, .025, .034, .042, .050. K.6's "distinct calibration, not a contradiction of the existing conventional-FWER warning" is correct                                                                                                                                                                          |

**Reviewer diagnostic on the p.41 construction (not an oracle, not adopted).** With an
independent Studentized-range implementation (SciPy 1.17.1 `studentized_range.ppf`), the
`100γ_{p,.05}` percentage points `R(p, 30, 0.95^(p−1))` for `p = 2..7` are 2.888, 3.035,
3.131, 3.199, 3.250, 3.290, which round to the printed `n₂ = 30` row exactly; the max
rule does not bind there. At small `n₂` the raw points are not monotone (for `n₂ = 4`:
3.926, 4.013, 4.033, 4.025, 4.003, 3.974) and Table II prints the repeated value 4.02
from `p = 4` onward, which is the visible effect of the p.41 rule; the second-decimal
difference between 4.033 and the printed 4.02 is within the precision one would expect
from Beyer's 1953 methods cited on p.41 for `n₂ < 10` and is not resolved here.
`R(2, 30, 0.95) = 2.888 = t_{0.975,30}·√2`, which is Newman's (10) again.

**Printed inconsistency observed on p.28 (Section 5.4.1 paragraph, outside row 17's
claims but inside the commissioned page).** p.28 states "In the test of four means, the
four-mean and three-mean protection levels are raised from 87.8% and 79.7% respectively
to 95%", whereas pp.14–15 assign `γ₄ = 79.7%` and `γ₃ = 87.8%` to the multiple
normal-deviate test. The two percentages are transposed relative to "four-mean and
three-mean … respectively". Retained as a print observation; no correction adopted and no
erratum searched (B-N2). It does not affect the new multiple range test's values.

**Separation for row 17.** Source statements: the Section 3 model, the p.13 definitions,
the `(1−α)^(p−1)` protection levels and their printed values, the p.6/p.28 containing-set
rules, the p.41 construction and its claim about protection levels, the p.5–7 example.
Investigator inference: the "FWER" label, the equivalence of "every subset" and "every
contiguous ordered subset" under monotone critical ranges, the SciPy diagnostic, the
`≥ γ_p` reading in B-N3, and the transposition reading of the p.28 paragraph.

## 10. Check B — impact on K.6, on the fixed semantic input and on the C.3 page mapping

| Record                                                                                         | Assessment                                                                                                                                                                                                                                                                                              |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| K.6 `APR-10 / C-H1` row                                                                        | "Newman author record C.3 reused" is now independently confirmed for what row 06 claims; the row's "ordered-range construction … supported" holds for Newman's successive-elimination form; the strong-control-failure evidence is Einot–Gabriel's, as the row says; `RES-ONLY` retention is unaffected |
| K.6 `APR-11 / C-H2` row                                                                        | "Preserve original pairwise-alpha protection-level interpretation" is confirmed (`γ₂ = 1 − α`, p.13/p.16); the rescaled-versus-original distinction is confirmed; `RES-ONLY` retention is unaffected; K.6's "no fresh Duncan audit" was accurate for Part K and is now supplemented by this review      |
| K.6 reopen condition "a full SR-H closure review must cover or explicitly reuse Newman/Duncan" | This review provides that coverage for rows 06 and 17 as stated; it does not cover Newman pp.29–30 or Duncan's other sections (Section 3)                                                                                                                                                               |
| Fixed semantic input `APR-10` ("reported weak-only FWER control unverified")                   | Newman's text neither states nor refutes a familywise property; the weak-only characterization remains a statement about the Newman–Keuls stepping procedure resolved on the Keuls/Einot–Gabriel side (PR #206 Sections 4–5), not by row 06. No catalogue text change is proposed                       |
| Fixed semantic input `APR-11` ("reported not to control FWER")                                 | Now source-grounded in Duncan's own definitions and printed protection levels (Section 9); "reported" can be read as "verified from the primary text" in a future catalogue revision, which this review does not make                                                                                   |
| C.3 page mapping for 06 (`p−18`) and 17 (`p+1`)                                                | Verified on the covers and running heads (Section 3)                                                                                                                                                                                                                                                    |
| C.7 conflict line for 06 p.28                                                                  | Confirmed and sharpened (Section 8); the C.7 wording can stand; B-N1 offers the sharper form                                                                                                                                                                                                            |

## 11. Combined assessment of the `SR-H` `PARTIAL` candidate

**Commission definitions applied** (acquisition commission "Hold dispositions").
`INPUT_INCOMPLETE`: "required source text cannot be identified or inspected".
`PARTIAL`: "some claims are supported but named gaps remain". `CLOSED`: "all
decision-bearing source claims needed by the hold are directly supported, with exact
artifact identity and pinpoints", and `CLOSED` "does not select the procedure". The
commission also directs: "If the evidence resolves to multiple variants rather than one
reviewed family characterization, assign PARTIAL with named gaps."

**Evidence inventory for the seven SR-H texts after this review.**

| Text                 | Claim         | Author-side inspection | Independent review                                                        |
| -------------------- | ------------- | ---------------------- | ------------------------------------------------------------------------- |
| Newman (1939)        | `C-H1`        | C.3 row 06             | this review (Section 8)                                                   |
| Keuls (1952)         | `C-H1`        | Part K                 | PR #206 (reused, not re-read)                                             |
| Duncan (1955)        | `C-H2`        | C.3 row 17             | this review (Section 9)                                                   |
| Ryan (1960)          | `C-H3`        | Part K                 | PR #206 (reused, not re-read)                                             |
| Einot–Gabriel (1975) | `C-H3`/`C-H2` | Part K                 | PR #206 (reused, not re-read)                                             |
| Welsch (1977)        | `C-H3`        | Part K, L.2            | PR #206 (reused, not re-read); L.2 repair reviewed here (Check A)         |
| Hayter (1986)        | `C-H4`        | Parts I/J              | PR #201/#203 and continuation Section 16 acceptance (reused, not re-read) |

**Assessment.** The obstacle that defines `INPUT_INCOMPLETE` is absent for every text,
and every author-side reading that the hold relies on now has independent coverage on
the repository. The supported claims are the `C-H1`, `C-H2`, `C-H3` and `C-H4`
characterizations at their pinpoints; the named gaps are unchanged and real: the
intended `APR-12` variant boundary (six executable procedures under one catalogue entry
per PR #206 Section 6, including GAPA/GAPB as separate reopen candidates), the exact
monotonicity and selection conditions (now with the Welsch step-up and Duncan
constructions attributed as printed and the NKA/NKB construction unattributed), and the
resolution or explicit exclusion of the recorded print material (K.4's three items and
the two Newman/Duncan print inconsistencies recorded here) before any affected use.
**On the reviewer's own reading of the definitions, the `SR-H` `PARTIAL` candidate is
supported by the combined fixed evidence.** It is not assumed: had rows 06 or 17 been
contradicted by the pages, the `C-H1`/`C-H2` basis would have needed re-characterization
before `PARTIAL` could be assessed, and that did not occur.

**What this assessment does not do.** It does not convert the completed source inspection
into `CLOSED`: the `APR-12` variant branch by itself makes `CLOSED` unreachable under the
commission rule quoted above, independently of any residual doubt. It does not select a
Newman–Keuls, Duncan, Ryan, Einot–Gabriel or Welsch variant, a critical-value table, an
interpolation rule or a monotonization rule for `APR-10`–`APR-12`; it does not treat the
Einot–Gabriel rescaled Duncan allocation as Duncan's procedure or vice versa; it does not
reinterpret the `RES-ONLY` classes; and it does not accept the hold, which the
commission and L.4 reserve for the steward.

**Ledger and program state confirmed.** 5 `CLOSED` (SR-B, SR-C, SR-G, SR-K, SR-L; existing
candidate statuses, not re-accepted here) / 1 `PARTIAL` (SR-H candidate) / 8
`INPUT_INCOMPLETE` (SR-A, SR-D, SR-E, SR-F, SR-I, SR-J, RSM-01, RSM-02) = 14 entries;
commission precedence: no `NO_GO`, at least one `INPUT_INCOMPLETE`, so overall
`INPUT_INCOMPLETE` and `SOURCE_SET_READY` false; `APR-10`–`APR-14` `RES-ONLY`; semantic
`NARROW` (fixed input Section 12 logic unchanged); 35 originals (Part B's three, C.2's
sixteen additional and D.2's sixteen, as K.1 and H.1 state; no supplier or count change
here); the `C-H4` acceptance, all other holds, the R4 source-access finding and the
public-opening gate unchanged. These agree with K.6, L.4 and PR #206 Section 8.

`SOURCE_ACCESS_INCOMPLETE` is **not** assigned to any scope: both commissioned originals
were available and matched their recorded identities, and no additional original was
required for the claims checked.

## 12. Check B verdict and findings

`GO` for C.3 rows 06 and 17 and their K.6 reuse, as bounded characterizations at the
stated pinpoints, at head `044078d3b19ff3307dc347b0b9e7ecbbed1750c6`. Basis: Sections
8–10. Scope limits: Section 3.

**BLOCKER:** none. **SHOULD-FIX:** none.

**NICE-TO-HAVE:**

- **B-N1** — The C.7 line for 06 p.28 can be sharpened to the verified form: `f = 3` is
  not a tabulated argument of Tables III/IV, the printed `q₀.₀₅` values 4·1 and 4·3 are
  the `f = 30` entries, and p.27 fixes `f₂ = 30` for the example; still no erratum
  claimed.
- **B-N2** — Duncan p.28, first full paragraph, transposes 87.8% and 79.7% relative to
  pp.14–15's `γ₃` and `γ₄` of the multiple normal-deviate test (Section 9). A conflict
  line in the K.4 style would preserve this print without correction.
- **B-N3** — Duncan p.41 says the max rule "ensures that each p-mean protection level …
  is γ_{p,α}". Where the predecessor value is the larger, or where the containing-subset
  rule retains a subset, the attained protection level is at least `γ_{p,α}`; "is" reads
  as "is at least". Reviewer inference; recording it would keep the protection-level
  claim from being read as an equality guarantee.
- **B-N4** — Newman p.21 credits the successive-elimination suggestion to "Student"
  (1927, "Errors in routine analysis", pp.161–2). The historical-attribution row for
  `APR-10` could record this, as K.2 does for Keuls's footnote on Newman and Tukey.
- **B-N5** — C.3 row 06's "Keuls remains unread" is a 2026-09-07 statement now superseded
  by Part K and PR #206; a one-line note in a future part would prevent a reader of C.3
  alone from taking it as current.

## 13. Independence record

- **Context separation (Git- and service-verifiable):** this review's session was
  created at 2026-09-08T02:21:00Z, after the reviewed commit (02:14:13Z) and PR #207
  (02:14:51Z), from a fresh clone of `main` at
  `f39100161cb45de15767bdb19ed54aba9489b41a`. The review branch was created from the exact
  head and adds one file; the reviewed result, the commission, the continuation record,
  all prior reviews and `main` are untouched (Section 14). The reviewer did not
  participate in the investigation, drafting or repair of Parts A–L. As disclosed in
  Section 1, PR #206's review was read in full before the verdicts were fixed, because
  L.4 item 1 commissions a comparison against it and its Welsch evidence is reused; the
  Check B source readings (Sections 8–9) were made from the page images before the
  corresponding C.3 rows were compared with them. **Context: `ESTABLISHED`.**
- **Model level (ordinary evidence):** the review side is recorded from the session
  service as `claude-fable-5-1` (configured, current, and last served, read during this
  session). The author side's "continuing OpenAI-assisted author/coordinator" statement
  is first-hand testimony in L.1 and the PR #207 body, not a Git fact. The two sides are
  therefore different providers on the ordinary-evidence basis the continuation record
  has used for Parts G–L; this record makes no steward determination.
- **Git identity is not model testimony.** The reviewed commit carries the steward's Git
  identity; the review commit carries this session's configured Git identity. Neither
  proves which model produced the text.
- **Not required and not demanded:** exact serving-build logs on either side.
- **No unsupported statements** are made about which human participants took part on
  either side beyond what L.1, K.1 and the PR bodies themselves say, and historical
  `PENDING` statements in Parts A–L, the prior review records and the continuation record
  are unchanged and not reinterpreted by this record.
- **A new chat is not independence.** Independence here rests on the non-involvement
  statement above, verifiable from session and commit timestamps and from the absence of
  this session's identity in any author-side object.

## 14. Deliverable identity and validation

- Branch `review/r3-srh-range-completion-20260908`, sole parent
  `044078d3b19ff3307dc347b0b9e7ecbbed1750c6`; one added file,
  `review-inputs/r3-srh-range-completion/REVIEW-RESULT.md`; no other path touched. The
  review commit, tree, and blob identifiers are reported in the draft PR body and were
  checked against the GitHub-side objects after push.
- Environment: fresh clone; Node 22.22.2; pnpm 11.7.0; `pnpm install --frozen-lockfile`
  succeeded; Python 3.11.15 with PyMuPDF 1.28.2 for hashing, page counting, text extraction
  and 170–200 dpi page rendering, and SciPy 1.17.1 for the `t` and Studentized-range
  diagnostics. Outbound network only through the session proxy; no publisher, DOI, or
  erratum host was contacted.
- Validation results on the review branch with this file present (actual results,
  recorded after execution; the PR body carries the final run): `pnpm format:check` —
  PASS; `pnpm lint:markdown` — PASS; `node --import tsx tooling/src/validate.ts` — PASS;
  `git diff --check` — clean. No aggregate `pnpm check`, test suite, generated-diff
  check, or Phase 1 suite is claimed.

## 15. Reproduction

```text
git fetch origin 044078d3b19ff3307dc347b0b9e7ecbbed1750c6
git cat-file -p 044078d3b19ff3307dc347b0b9e7ecbbed1750c6            # tree a24aa097…, one parent 070e5dd5…
git rev-parse 044078d3…:governance/drafts/release-3-preparation/semantic-source-acquisition-result.md   # ff2ee8c3…
git show 044078d3…:<result path> | wc -c                             # 334121
git show 044078d3…:<result path> | sha256sum                        # 02290488…57acb1
git show 044078d3…:<result path> | head -c 326756 | cmp - <(git show 070e5dd5…:<result path>)   # byte-equal
sha256sum 06_Newman_1939.pdf 17_Duncan_1955.pdf                      # Section 3
python3 - <<'PY'   # Newman (10) and Duncan p.41 diagnostics (SciPy)
from scipy.stats import t, studentized_range
print([round(t.ppf(0.975, f) * 2 ** 0.5, 2) for f in (5, 10, 20, 30)])        # 3.64 3.15 2.95 2.89
print([round(studentized_range.ppf(0.95 ** (p - 1), p, 30), 2) for p in range(2, 8)])  # 2.89 3.04 3.12 3.20 3.25 3.29
print(round(studentized_range.ppf(0.95, 5, 30), 1), round(studentized_range.ppf(0.95, 6, 30), 1))  # 4.1 4.3 (f = 30)
PY
```
