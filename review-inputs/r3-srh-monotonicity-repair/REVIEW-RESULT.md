# Release 3 SR-H Research Result — Close-Only Independent Review of the Part M S-X1 Repair (Ordered-Range Monotonicity Source Conflict)

**Status: informative independent review result; non-normative; not adopted.**
This record is a separate-context, exact-head, close-only review of Part M of the
Release 3 semantic source-acquisition result (pull request #213), the author-side repair
of finding S-X1 of the cross-cutting adversarial review (pull request #212). Its scope is
the S-X1 repair paragraph M.2, the evidence-precision paragraph M.3, and the state and
commission paragraph M.4, checked against the printed page 576 of Einot and Gabriel
(1975), PR #212 Sections 5.3, 6.6, 9 and 10, the pinned diagnostic script, the
acquisition commission, the continuation record and the cited prior review records. It
does not repeat the seven-source wide review. It selects no Contract, procedure,
variant, identifier, schema, Public Check, tolerance, critical value, interpolation or
monotonization rule, implementation, RFC decision, R4 method or release outcome; it
updates no hold, issue, gate or catalogue class; it merges nothing and accepts nothing.
Attribution is role-based; material process provenance is disclosed in Sections 1 and 12.

**Summary of verdicts (labels defined in Section 10):**

| Check                                                          | Verdict                                                                                                                                                                                                                                                                                                                  |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| A. M.2 against the p.576 page image and PR #212 §5.3/§6.6/§9   | `GO`. The printed statement, its locator, the `[9, Sec. 9]` proof pointer and the uninspected status are recorded accurately; the four representative pairs reproduce exactly to the displayed eight decimals; source statement, review diagnostics, author recomputation and future adoption are kept separate.         |
| B. M.3 attribution and precision corrections                   | `GO`. Every attribution checked against the cited Git objects and the commission text is correct; no prior review or result text is rewritten.                                                                                                                                                                           |
| C. State, ledger, independence records, `PENDING` preservation | `GO`. Ledger 5 `CLOSED` / 1 `PARTIAL` / 8 `INPUT_INCOMPLETE`, overall `INPUT_INCOMPLETE`, `SOURCE_SET_READY` false, `NARROW`, APR-10–14 `RES-ONLY`, 35 originals, SR-H `PARTIAL` candidate with formal acceptance pending, continuation Section 17 still a proposal; all unchanged.                                      |
| D. Regression                                                  | none. The first 334121 bytes of the head blob equal the parent blob byte for byte; the change set is one file, append-only.                                                                                                                                                                                              |
| **E. Overall: S-X1**                                           | **`CLOSED` as an additive author-side repair at head `f7ab3214…`**, with zero `BLOCKER`, zero `SHOULD-FIX` and five `NICE-TO-HAVE` (Section 10). The named monotonicity gap of SR-H remains open as recorded; this closure is of the recording defect only. Nothing here accepts SR-H, adopts a rule, or moves any head. |

## 1. Review identity, role, independence, and disclosures

| Field                     | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository                | `licklider-ai/nomue-protocol` (public)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Reviewed object           | PR #213, head `f7ab321477bbb4f6decefbf931615ff6966e9e6e` (branch `research/r3-srh-monotonicity-repair-20260908`), Part M of `governance/drafts/release-3-preparation/semantic-source-acquisition-result.md`                                                                                                                                                                                                                                                                                                           |
| Review date               | 2026-09-08 (UTC; session created 06:24:17Z, after the reviewed commit at 06:17:53Z and PR #213 at 06:18:28Z)                                                                                                                                                                                                                                                                                                                                                                                                          |
| Reviewer role             | separate-context independent reviewer for the close-only repair scope commissioned in M.4 and by the user; not an author-side role                                                                                                                                                                                                                                                                                                                                                                                    |
| Non-involvement           | this session did not author, revise or repair Part M, any of Parts A–L, the continuation record, the acquisition commission, or any of the five prior SR-H review records (PR #201, #203, #206, #211, #212). It started from a fresh clone of the repository. No prior review session is this session. This is a statement of ordinary testimony; the Git objects establish artifact identity and commit order only (see M.3 N-X6)                                                                                    |
| Scope limitation          | **close-only.** This review does not re-inspect Hayter, Welsch, Ryan, Keuls, Duncan or Newman, and does not re-run the full Section 6.6 grid. Source observations other than Einot–Gabriel p.576 are reused from the cited prior records exactly as M.3 attributes them (Section 3). The only new original inspected is supplier 24, and of it only the printed pages 576 and 583 (reference list)                                                                                                                    |
| **Not a blind review**    | PR #212 Sections 1–3, 5.3, 6.6, 9, 10 and 13, the pinned script, and Part M itself were read before the p.576 page image was opened. Independence of the source reading rests on the page image having been read for every cited element, not on blindness                                                                                                                                                                                                                                                            |
| Same model family         | the session-management service reported this session's `configured_model`, `session_context.model` and `external_metadata.last_served_model` as `claude-fable-5-1` when queried during the review. Every prior SR-H review record reports the same identifier for its review side; the author side reports OpenAI assistance in its own text (M.1). Correlated blind spots across the review chain therefore remain possible. No serving-build log is available or claimed; this is service testimony, not a Git fact |
| Originals inspected       | one lawfully supplied PDF (`24_Einot_1975.pdf`), delivered as a local upload; no retrieval, purchase or redistribution; not committed                                                                                                                                                                                                                                                                                                                                                                                 |
| Review branch             | `review/r3-srh-monotonicity-repair-20260908`, created from the reviewed head as sole parent; the name was unused at creation (`git ls-remote --heads` listed no `review/r3-srh-monotonicity-*` ref)                                                                                                                                                                                                                                                                                                                   |
| Designated harness branch | the session harness designated `claude/pr-213-part-m-sx1-review-i2mlqp`; the user's instruction explicitly required an unused neutral review branch from the fixed head, so that instruction was followed and nothing was pushed to the harness branch                                                                                                                                                                                                                                                                |
| Files added               | this file only; no PDF, page image, text extraction or scratch output is stored in Git                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Comment on any PR         | none posted                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

Read before source work, in the `AGENTS.md` order: `CHARTER.md`, `AUTHORITY.md`
(authority classes; `review-inputs/` is informative), `governance/ID-POLICY.md`,
`governance/RFC.md` (research-gate rules 2–6), the pinned acquisition commission
(Question, RSM-02 paragraph, Hold dispositions), result Parts K.2, K.4, K.6, L.2, L.4 and
all of Part M, continuation Sections 12, 14 and 17, and the prior review records named in
Section 2. No directory-local `AGENTS.md` applies to `review-inputs/` or `governance/`.

## 2. Fixed identity verification (start and end of review)

Live state was read at review start (before any source work) and again immediately before
the review commit. Nothing moved; the verdicts below apply to the fixed head only. If the
head moves later, Section 2 must be repeated and the append-only prefix property
re-established before anything here is reused for the new head.

| Item                            | Expected                                                                                                                                                                                          | Observed                                                                                                                                                                                                                            | Result |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| PR #213 live head (start / end) | `f7ab321477bbb4f6decefbf931615ff6966e9e6e`                                                                                                                                                        | PR `head.sha` and `origin/research/r3-srh-monotonicity-repair-20260908` both `f7ab3214…` at start and at end; draft, open, unmerged, `mergeable_state: clean`; base `research/r3-srh-range-review-followup-20260908` at `044078d3…` | match  |
| Sole parent / tree              | `044078d3b19ff3307dc347b0b9e7ecbbed1750c6` / `f47d884d5ac24c45a7092b966184139c24ec627d`                                                                                                           | `git cat-file -p`: exactly one `parent` line, `044078d3…`; tree `f47d884d…`                                                                                                                                                         | match  |
| Result blob / bytes / SHA-256   | `18e18eb1900f3560b752c336addf2c88bd1ff616` / 343401 / `1eecef7ab783a806c1bbaeb26980db6b18b0808698777a660fb4754d3f605dcb`                                                                          | `git ls-tree`, `wc -c`, `sha256sum` on the blob content — all equal                                                                                                                                                                 | match  |
| Change set parent → head        | result file only, append-only                                                                                                                                                                     | `git diff --stat 044078d3… f7ab3214…`: one file, +142/−0                                                                                                                                                                            | match  |
| Prefix Parts A–L                | head blob's first 334121 bytes = parent blob `ff2ee8c3ca08b57ecc62c143a46153b02bcd04f7` (334121 bytes, SHA-256 `02290488c7a9997b72caf228bb6e32a03465b4117d65f456826b5a3fa957acb1`)                | `head -c 334121 \| cmp` exits 0; the prefix's SHA-256 equals the parent blob's SHA-256; parent blob size 334121                                                                                                                     | match  |
| Part M                          | bytes 334122–343401 of the head blob                                                                                                                                                              | 9280 bytes, 142 lines, headings M.1–M.4; no other text                                                                                                                                                                              | match  |
| PR #212 review                  | commit `ec0840c0ae20d71fbca715cf1e41880f3b09a20a`, sole parent `044078d3…`, tree `79272100bbf9a693bd864c43a01da63568f2fa9b`, review blob `2d1dd72a904d8097d40eafadd9b7dcc19df22ab9`, 103533 bytes | all equal (`review-inputs/r3-srh-cross-cutting-adversarial/REVIEW-RESULT.md`)                                                                                                                                                       | match  |
| PR #212 diagnostic script       | blob `c9424d55d80ed5ea68c02e61a4255e9684356980` at that commit                                                                                                                                    | `git ls-tree` equal (`review-inputs/r3-srh-cross-cutting-adversarial/scripts/critical_sequence_monotonicity.py`)                                                                                                                    | match  |
| Commission                      | commit `f39100161cb45de15767bdb19ed54aba9489b41a`, blob `3c7ddcc696f0c284213f7efe0da68e747bc238d7`                                                                                                | equal (`governance/drafts/release-3-preparation/semantic-source-acquisition-commission.md`)                                                                                                                                         | match  |
| Continuation record             | commit `a0db221edec78377d867bf0f4636d684d44dc5af`, blob `ea44c75032d12c5c635459129972ccf71ae73134`                                                                                                | equal (`governance/drafts/research-continuation-2026-09-07.md`); Sections 12, 14, 17 present                                                                                                                                        | match  |
| PR #211 review (Newman reuse)   | commit `a5e921c07ea2ab4f0147864fd2323f607512ef0d`, sole parent `044078d3…`, tree `6b7691a1b80d5400cea8dcb85d1bd8b38e59bbe9`, blob `63ee9079012cf7fa2e3a3b909ef294538a99c70b`                      | all equal (`review-inputs/r3-srh-range-completion/REVIEW-RESULT.md`); Section 8 is the Newman check                                                                                                                                 | match  |
| PR #201 / #203 / #206 reviews   | `92867850…` blob `39232d73…`; `f30cd00d…` blob `1b50c625…`; `f1cbcca6…` blob `752b7a1e…` (identities taken from PR #212 Section 2 and continuation Section 17)                                    | all present at the named commits (`r3-srh-lsd-primary`, `r3-srh-lsd-repair`, `r3-srh-range-synthesis`)                                                                                                                              | match  |

## 3. Source artifact identity, inspection performed, and evidence reused

| Supplier / file          |   Bytes | PDF pages | SHA-256 (recomputed)                                               | Read here                                                                                                                                              |
| ------------------------ | ------: | --------: | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 24 / `24_Einot_1975.pdf` | 1211995 |        11 | `1b097f5cdf16785e0aebf9c29359b957beb94caf51bb46255eaceb3d841cd57b` | printed p.576 (PDF page 4) as a 150 dpi page image and 220 dpi column crops; printed p.583 (PDF page 11) reference list at 200 dpi, for entry [9] only |

The saved identity in M.4 (1211995 bytes, 11 PDF pages, the SHA-256 above) was checked
before the attachment was compared; the attachment matches on all three values. Page
mapping confirmed on the running heads: PDF page 1 is the publisher cover, PDF page 4
prints "576 Journal of the American Statistical Association, September 1975". The text
layer damages subscripts and inequality signs; every element cited in Section 4 was read
from the page image.

**Evidence reused, not re-inspected** (explicit reuse, as M.3 states it): Newman (1939)
from PR #211 Section 8; Hayter (1986) page inspection from PR #201 Section 3, with
PR #203 as the transcription-only delta that states it did not read the PDF; Welsch, Ryan,
Keuls and Duncan observations from PR #206, #211 and #212 as cited in M.3. N-X1–N-X3 of
PR #212 are checked here only as attributions to that record (Section 7), not against
originals; no new source question arose, so no further PDF was requested.

**Not inspected, and not approved:** Einot–Gabriel reference [9] (the proof pointer),
[27], pp.574–575, 577–582 and every other original; any external proof; any formal
erratum.

## 4. Check A — M.2 against the p.576 page image

Items are the numbered checks A.1–A.3 and A.7 of the review instruction.

| M.2 element                                                                                                | Page evidence (image)                                                                                                                                                                                                                                                                                                                                                                                                        | Result                                                                                                                                                                         |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| "printed p.576, Section 1.4"                                                                               | running head "576 …"; heading "1.4 Statistics and Allocation of Levels" at the top of the left column                                                                                                                                                                                                                                                                                                                        | SUPPORTED                                                                                                                                                                      |
| "gives critical values for methods using the same statistic"                                               | right column: "For any other method M, which uses the same statistics T, ζ_k^M is evaluated as in (1.15) but the remaining critical values ζ_p^M (p = 2, ···, k − 1) are, by (1.3), taken as upper 100γ_p^M percentage points of the distribution of T_P under ω_P."                                                                                                                                                         | SUPPORTED                                                                                                                                                                      |
| `zeta_p^M < zeta_r^M if p < r` in (1.16)                                                                   | display "ζ_p^M < ζ_r^M if p < r , (1.16)" followed by "so that the critical values increase with the size of set P to be tested."                                                                                                                                                                                                                                                                                            | SUPPORTED; inequality direction and subscripts read from the image                                                                                                             |
| "refers to `[9, Sec. 9]` for the proof"                                                                    | "It has been shown (see [9, Sec. 9]) that" immediately precedes the display                                                                                                                                                                                                                                                                                                                                                  | SUPPORTED                                                                                                                                                                      |
| "The paragraph follows (1.15), in the same section as allocations (1.11)–(1.13)"                           | (1.11) Newman–Keuls γ_p = α, (1.12) Duncan-type 1 − (1 − α)^((p−1)/(k−1)), (1.13) Ryan-type 1 − (1 − α)^(p/k), (1.14)–(1.15) STP, all in the same right column; the (1.16) sentence is in the second paragraph after display (1.15) (the paragraph beginning "The unique critical value ζ for an STP can be evaluated from (1.15) …"), immediately before the heading "1.5 Comparison of Levels, Critical Values and Powers" | SUPPORTED; the locator is correct but coarse (N-M3)                                                                                                                            |
| "This statement was missing from K.2/K.4 and the monotonicity-gap account"                                 | not a page item: `grep` of the 334121-byte parent blob finds no "(1.16)" and no "1.16"; K.2's Einot–Gabriel row stops at "(1.6)–(1.15), footnote 2"; K.4, K.6 and L.2 do not mention the statement                                                                                                                                                                                                                           | SUPPORTED; S-X1's premise confirmed independently                                                                                                                              |
| "PR 212 Sections 5.3/9 confirmed it on the page image"                                                     | PR #212 §5.3 row "(1.16) monotone critical values" quotes the sentence from the image; §9 S-X1 repeats it                                                                                                                                                                                                                                                                                                                    | SUPPORTED                                                                                                                                                                      |
| "Reference [9]'s proof has not been inspected in this work. No condition … or formal erratum, is asserted" | M.2 asserts nothing about the content of [9]; it records the pointer only. Reviewer note from p.583 (reference list, read here): [9] is Gabriel, K.R., "A Procedure for Testing the Homogeneity of All Sets of Means in Analysis of Variance," _Biometrics_ 20 (September 1964), 459–77. Its Section 9 was **not** read by this review or by any record (N-M1)                                                               | SUPPORTED (A.2 satisfied)                                                                                                                                                      |
| (1.16) and the proof dependency as a reopen item (A.7)                                                     | M.2 closing paragraph: "Add (1.16) and its proof dependency to the monotonicity reopen list before any affected characterization, algorithm or table reuse"; "The missing-proof conditions and appropriate family characterization remain unresolved"                                                                                                                                                                        | SUPPORTED in substance: the item is explicitly recorded as future reopen scope and the recording gap named by S-X1 is closed. The sentence is phrased as an instruction (N-M2) |

**Separation of statement classes (A.3).** M.2 keeps four things apart and labels each:
(a) the printed source statement and its external proof pointer ("Source statement"),
(b) PR #212's finite-grid diagnostic results ("Diagnostic conflict", attributed to §6.6
and the pinned script), (c) the author's own four-pair recomputation ("The author
reproduced … not an independent oracle or a rerun of its full grid"), and (d) what is
and is not adopted ("No max rule, replacement critical value, numerical tolerance or
procedure is adopted"; "Add … to the monotonicity reopen list"). No sentence in M.2
presents a diagnostic as a source fact or a source sentence as a verified theorem.

## 5. Check A — numerical reproduction (A.4) and grid-summary boundary (A.5)

**A.4 — the four representative pairs.** Recomputed from the allocations as written in
the M.2 table with `scipy.stats.studentized_range.ppf(1 - gamma_p, p, nu)`, SciPy 1.17.1
(the author reports 1.17.0), NumPy 2.4.6, Python 3.11, in this container:

| M.2 row                                      | γ_p, γ_{p+1} (computed from the stated allocation) | Raw quantiles recomputed here | M.2 prints              | Direction |
| -------------------------------------------- | -------------------------------------------------- | ----------------------------- | ----------------------- | --------- |
| Einot–Gabriel Ryan (1.13), k = 8, ν = 3, 6→7 | 0.0377394, 0.0438894                               | 8.91186585, 8.89435083        | 8.91186585 > 8.89435083 | decrease  |
| rescaled Duncan (1.12), k = 4, ν = 3, 3→4    | 0.0336175, 0.05                                    | 6.86866438, 6.82452645        | 6.86866438 > 6.82452645 | decrease  |
| Welsch A, k = 6, ν = 20, 4→5                 | 0.0333333, 0.05                                    | 4.23450864, 4.23185675        | 4.23450864 > 4.23185675 | decrease  |
| Welsch A, k = 8, ν = ∞, 6→7                  | 0.0375, 0.05                                       | 4.17130447, 4.16955416        | 4.17130447 > 4.16955416 | decrease  |

All eight values agree with M.2 to every displayed digit (eight decimals), and all four
pairs decrease. This is a reproduction with the same numerical library family as the
author and as PR #212; **it is not an independent numerical-error guarantee**, exactly as
M.2 says. The reproduction shows that M.2 transcribed its own computation correctly and
that the stated allocations produce the stated numbers; it does not certify the numbers.

**Reviewer-side sanity check by a different route (recorded, not adopted, no certificate
claimed).** To see whether the four decreases could be artifacts of SciPy's quadrature
rather than properties of the distribution, the upper-tail probability of each of the
eight quantiles was recomputed by direct numerical integration in `mpmath` (20 decimal
digits): the range distribution as p ∫ φ(x) [Φ(x + q) − Φ(x)]^(p−1) dx, and the
Studentized range as the χ_ν/√ν mixture of that integral. Every recomputed tail
probability equals the target γ_p to within 6 × 10⁻¹⁰ (worst case the ν = ∞, p = 7
point at 5.1 × 10⁻¹⁰). The decreases (0.0175, 0.0441, 0.0027 and 0.0017 in the quantile)
are therefore many orders of magnitude larger than the disagreement between the two
routes. This is a reviewer diagnostic for the four points only; it says nothing about the
rest of the grid and is not a numerical oracle for the Protocol.

**Section 6.6's finite-grid wording (A.5).** PR #212 §6.6 aggregates its Welsch A result
as "at every ν including ∞, one decrease at p = t−2 → t−1, for t ≥ 8 (α = .05) or t ≥ 15
(α = .01); e.g. t = 8, ν = ∞ …; t = 6, ν = 20: C₄ = 4.2345 > C₅ = 4.2319". M.2 records
this as a finite-grid observation, declines to adopt the aggregate wording "as an
exhaustive threshold description (it also gives a k = 6 example)", and does not turn any
row into a universal threshold or a theorem. That reading is correct and is the right
boundary. To resolve the apparent tension between the "t ≥ 8" clause and the k = 6
example, the Welsch A allocation alone was re-run here over the full §6.6 grid (the
other five allocations were not re-run; the full-grid rerun is not needed and not
claimed). Result: at α = .05 the "every ν including ∞" property begins at k = 8 and the
"one decrease at p = k−2 → k−1" description holds for ν ≥ 10; decreases at finite ν
also occur at k = 5 (ν = 3, 5) and k = 6 (ν = 3, 5, 10, 20, the last being the printed
example), and at ν = 3 (k ≥ 10) and ν = 5 (k ≥ 15) several adjacent decreases occur, not
one. At α = .01 the "every ν" property begins at k = 15, with finite-ν decreases from
k = 5. So the §6.6 aggregate sentence describes the onset of the every-ν property, not
the onset of any decrease, and its "one decrease" clause is a large-ν description. None
of this contradicts M.2, which adopts neither clause; it confirms that M.2's refusal to
read §6.6's summary as an exhaustive threshold is necessary, not merely cautious. The
§6.6 Ryan-allocation example sequence (α = .05, k = 8, ν = 3: 7.573, 8.452, 8.767,
8.884, 8.912, 8.894, 8.852) also reproduces exactly.

**Allocation identity (A.5, second part).** M.2 correctly separates the paper's own
allocations, (1.12) rescaled Duncan and (1.13) Ryan-type, from Welsch's later A
allocation, and says of the latter that it "is not presented as an allocation printed in
the 1975 paper". The M.2 table's Welsch A formula (`gamma_p = alpha*p/k`, except
`gamma_(k-1) = gamma_k = alpha`) matches the pinned script's `WelschA` lambda
(`alpha if p >= k-1 else alpha*p/k`) and K.2's Welsch row. The "Diagnostic conflict"
paragraph names four of the six allocations the script covers (Newman–Keuls, Ryan-type,
rescaled Duncan, Welsch A); Ryan (1.13′)/Welsch B and Duncan's original allocation are
also on the grid but are not summarized in M.2 (N-M5). The omission does not misstate
anything; it only means M.2's list is not the whole grid.

## 6. Check A — procedure-level boundary (A.6)

M.2's boundary sentences were checked against the theorem structure recorded in K.2
(Welsch Theorems 1–2 "require a nondecreasing critical sequence") and L.2 (no printed
enforcement step for NKA/NKB):

- "The failure of a raw sequence to be nondecreasing means Welsch's nondecreasing-sequence
  theorem hypothesis cannot simply be assumed; it does not by itself prove that the whole
  procedure exceeds its error budget." Correct: a failed hypothesis removes the theorem's
  guarantee; it is not a counterexample to the conclusion. M.2 does not assert FWER
  exceedance from the raw sequences.
- "Nor does the absence of a printed NKA/NKB enforcement step authorize inventing one."
  Consistent with L.2 and with PR #212 §6.6 consequence (ii), which names the missing
  step as a gap rather than supplying one.
- "No max rule, replacement critical value, numerical tolerance or procedure is adopted."
  Confirmed: Part M introduces no rule, table, algorithm or tolerance; the Duncan p.41
  max rule remains a recorded source fact of another paper (PR #211 §9), not an adopted
  step.
- "L.2's step-up attribution remains intact." Confirmed by prefix identity; Part M does
  not touch L.2, and M.2 makes no claim about the step-up construction.

The diagnostics are thus recorded as challenging "an unqualified reading of (1.16) for the
raw range quantiles of the paper's own allocations", which is precisely what the
finite-grid observations support, and nothing more.

## 7. Check B — M.3 attribution and precision

| M.3 statement                                                                                                                                         | Checked against                                                                                                                                                                                                                                                                                                           | Result                                                                                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PR #212 lists N-X1 through N-X8 although its heading says seven `NICE-TO-HAVE`                                                                        | PR #212 summary "NICE-TO-HAVE 7"; §9 heading "NICE-TO-HAVE (7)"; eight bullets N-X1–N-X8; summary sentence "one reopens a prior optional finding … the rest are new. No prior finding is repeated as a new count"                                                                                                         | SUPPORTED. M.3 uses the identifiers and does not rewrite PR #212. The count of seven is reconcilable as seven new findings plus the reopened N-X1; M.3 does not say so (N-M4)                                 |
| N-X1 supplies page-image support for PR #211 A-N1's previously unverified "after (A.1)" locator                                                       | PR #212 §9 N-X1 ("confirmed on the p.569 image … A-N1 can be closed"); continuation §17 ("A-N1's finer locator 'after (A.1)' remains unverified in the reused review")                                                                                                                                                    | SUPPORTED                                                                                                                                                                                                     |
| N-X2/N-X3 remain attributed to PR #212 §6.5/§9 and deferred; not new author source checks, certified values or errata                                 | PR #212 §9 N-X2, N-X3; §10 "Formal erratum searches … no network host was contacted"                                                                                                                                                                                                                                      | SUPPORTED; consistent with the K.4 conflict-record practice                                                                                                                                                   |
| N-X4: Hayter page-level inspection is PR #201; PR #203 reviewed the additive repair and explicitly did not reread the PDF                             | PR #201 blob `39232d73…` Section 3 (pp. 1000–1004 read as page images, 300 dpi crops); PR #203 blob `1b50c625…`: "the Hayter (1986) PDF was not supplied to and not requested by this pass", "transcription and presentation only"                                                                                        | SUPPORTED. Continuation §17's "PR 201/203" is read with those separate roles, as M.3 says                                                                                                                     |
| N-X5: the explicit multiple-variant instruction is in the commission's RSM-02 paragraph; SR-H uses the general `PARTIAL` definition                   | commission blob `3c7ddcc6…`, "Required source coverage": "For `RSM-02`, … If the evidence resolves to multiple variants rather than one reviewed family characterization, assign `PARTIAL` with named gaps"; "Hold dispositions": "`PARTIAL`: some claims are supported but named gaps remain"                            | SUPPORTED. M.3's further statement that "multiple names alone do not establish a gap" and that the APR-12 characterization and monotonicity/selection conditions are the substantive gaps matches K.6 and L.4 |
| N-X6: Git verifies artifact identity and commit order; model/session and non-involvement statements are ordinary testimony                            | PR #212 §9 N-X6; continuation §17 proposal 2 ("Git objects establish artifact identity; session/model and non-involvement statements are ordinary testimony")                                                                                                                                                             | SUPPORTED; this record follows the same rule (Section 1)                                                                                                                                                      |
| N-X7: limited SR-C acceptance in §12, limited SR-B acceptance in §14; SR-K/SR-G separate; SR-L inherited; five `CLOSED` candidates ≠ five acceptances | continuation §12 "SR-C: ACCEPTED AS CLOSED for the source-acquisition obstacle only … SR-L is inherited; SR-K/SR-G retain their separate acceptance question"; §14 "SR-B: ACCEPTED AS CLOSED for the source-acquisition obstacle only … SR-K/SR-G acceptance remains separate … not a count of five newly accepted holds" | SUPPORTED                                                                                                                                                                                                     |
| N-X8: print conflicts gate affected numerical reuse; not by themselves the reason the hold cannot close; the substantive SR-H gaps remain             | PR #212 §9 N-X8; K.6 named gaps; M.2's own conflict entry is treated the same way                                                                                                                                                                                                                                         | SUPPORTED                                                                                                                                                                                                     |
| Newman: covered by PR #211 Section 8 at `a5e921c0…`, blob `63ee9079…`; explicit reuse; PR #212 and the author pass did not reread Newman              | PR #211 §8 (Newman pp.20–28 on page images, √2 relation, f = 30 reading); PR #212 §3 ("not supplied; not read — SOURCE_ACCESS_INCOMPLETE"); M.1 records the same                                                                                                                                                          | SUPPORTED; no new Newman question was raised by Part M, so no further copy was requested by this review                                                                                                       |
| M.1: PR #212 identity, "six originals were inspected there", "read the four earlier reviews before the originals", "same review-side model family"    | PR #212 §1 (Not a blind review; Same model family), §3 (six files re-hashed, Newman not read), Section 2 identities                                                                                                                                                                                                       | SUPPORTED                                                                                                                                                                                                     |

No M.3 statement rewrites, re-labels or overwrites any prior result or review text; the
prior records remain at their recorded identities (Section 2).

## 8. Check C — state, ledger, independence records, and `PENDING` preservation

| Item                            | Expected (from L.4 and continuation §17)                                              | Part M                                                                                                                         | Result |
| ------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------ |
| SR-H disposition                | `PARTIAL` candidate, formal acceptance pending                                        | M.4: "SR-H remains PARTIAL candidate, formal acceptance pending"                                                               | match  |
| Ledger                          | 5 `CLOSED` / 1 `PARTIAL` / 8 `INPUT_INCOMPLETE`, 14 entries                           | M.4: "5 CLOSED / 1 PARTIAL / 8 INPUT_INCOMPLETE"                                                                               | match  |
| Overall / readiness / scope     | `INPUT_INCOMPLETE`; `SOURCE_SET_READY` false; semantic `NARROW`; APR-10–14 `RES-ONLY` | M.4: all four stated                                                                                                           | match  |
| Originals                       | 35                                                                                    | M.4: "35 originals"                                                                                                            | match  |
| Continuation §17                | proposals, not enacted                                                                | M.4: "still contains proposals, not enacted Parts K/L independence or hold acceptance"; the record at `ea44c750…` is unchanged | match  |
| Historical `PENDING` statements | preserved byte-exactly                                                                | Parts A–L unchanged (prefix identity); continuation record not touched by PR #213 (one-file change set)                        | match  |
| S-X1 status                     | author-side repair pending independent review                                         | M.4: "addressed on the author side, pending independent close-only review"                                                     | match  |
| Independence wording            | Git identity ≠ model/session testimony ≠ non-involvement testimony                    | M.1 and M.3 N-X6 keep the three apart; M.1 discloses continuing OpenAI assistance on the author side                           | match  |
| Actions excluded                | no merge, adoption, R4 closure, public opening, publication or release                | M.4 final sentence                                                                                                             | match  |

The candidate count of five `CLOSED` is not presented anywhere in Part M as five formal
acceptances; the two limited acceptances (SR-C §12, SR-B §14) are named as such.

## 9. Regression check

- Parts A–L: byte-identical prefix (Section 2). No prior number, disposition, hash,
  pinpoint or `PENDING` statement is altered.
- Change set: exactly one path, append-only, 142 added lines. `main`, the commission,
  the continuation record and every prior review branch are untouched by PR #213.
- Consistency of Part M with the unchanged text: M.2's Welsch A formula agrees with K.2;
  M.2's affected-use boundary agrees with K.6's reopen conditions ("inspect any external
  primary proof required by a claim that is actually retained, rather than assuming a
  cited proof has been audited") — (1.16) is not retained as a claim, and its proof is
  flagged as uninspected, so the K.6 rule is applied rather than contradicted.
- Public-artifact checks at the fixed head, before this file was added: all pass
  (Section 12).

## 10. Findings

Labels: `BLOCKER` — would change a disposition, count or accepted characterization;
`SHOULD-FIX` — a specific repair required before the affected part is relied upon;
`NICE-TO-HAVE` — precision or convenience, no effect on any verdict. Existing findings of
PR #212 (N-X1–N-X8) are not recounted; they are checked as attributions in Section 7.

**BLOCKER:** none.

**SHOULD-FIX:** none.

**NICE-TO-HAVE (5):**

- **N-M1 — New.** M.2 records the proof pointer as `[9, Sec. 9]` without its
  bibliographic identity. The p.583 reference list prints [9] as Gabriel, K.R., "A
  Procedure for Testing the Homogeneity of All Sets of Means in Analysis of Variance,"
  _Biometrics_ 20 (September 1964), 459–77. Naming it in the reopen entry would make the
  future inspection actionable. The reference itself remains uninspected; nothing about
  its Section 9 is asserted here.
- **N-M2 — New (wording).** The reopen entry is phrased as an instruction ("Add (1.16)
  and its proof dependency to the monotonicity reopen list …"). A declarative form ("(1.16)
  and its [9, Sec. 9] dependency are added to the K.6 reopen conditions") would remove
  any reading that the addition is still outstanding. The substance is present and S-X1
  is closed on it.
- **N-M3 — New (locator precision).** "The paragraph follows (1.15)" is correct but
  coarse: the (1.16) sentence is in the second paragraph after display (1.15), the
  paragraph that begins "The unique critical value ζ for an STP can be evaluated from
  (1.15) …", and it is the last text before the "1.5 Comparison of Levels, Critical
  Values and Powers" heading. (PR #212's "two lines below (1.15)" is likewise
  approximate.) A future increment could carry the finer locator; no verdict depends on
  it.
- **N-M4 — New (existing-review precision).** M.3 notes the eight identifiers against
  PR #212's heading count of seven without offering the reconciliation that PR #212's
  own summary supplies (seven new findings plus the reopened N-X1, "no prior finding is
  repeated as a new count"). Recording that reading would close the apparent discrepancy
  without touching PR #212.
- **N-M5 — New (completeness of the grid summary).** M.2's "Diagnostic conflict"
  paragraph summarizes four of the six allocations on the §6.6 grid; the Ryan
  (1.13′)/Welsch B and Duncan-original rows are not mentioned. A one-line note that the
  grid covers six allocations and that M.2 summarizes only those bearing on (1.16) and
  on Welsch A would prevent M.2's list from being read as the whole grid.

**Reviewer observations recorded without a finding:** the Welsch A single-allocation
rerun of Section 5 (onset of the every-ν property at k = 8 for α = .05 and k = 15 for
α = .01; finite-ν decreases from k = 5; multiple adjacent decreases at ν = 3, 5 for
large k) is consistent with §6.6's examples and with M.2; it is not adopted as a
threshold statement and is not an input to any disposition.

## 11. Unverified scope

- Einot–Gabriel reference [9] (Gabriel 1964) Section 9: not read; whether it states
  conditions under which (1.16) holds, and for which statistics and allocations, is
  unknown to every record including this one. Reference [27]; pp.574–575 and 577–582 of
  the 1975 paper (read in PR #212, not here).
- All other originals (Hayter, Welsch, Ryan, Keuls, Duncan, Newman): reused as recorded
  in Section 3; not re-read.
- The §6.6 grid for the Newman–Keuls, Ryan-type, Ryan (1.13′)/Welsch B, Duncan-original
  and rescaled-Duncan allocations: not re-run; the four M.2 pairs and the Welsch A
  allocation only.
- Numerical accuracy of SciPy's `studentized_range` beyond the four points checked by
  the `mpmath` route; no numerical oracle or tolerance is proposed.
- Formal erratum status of (1.16) or of any print conflict: no publisher, DOI or erratum
  host was contacted.
- Model identity of the author side and of every prior session: testimony only.
- Aggregate `pnpm check`, `pnpm test`, `pnpm typecheck`, `pnpm check:generated` and the
  Phase 1 suite: **not run** (Section 12). A fresh install was performed (dependencies
  were absent in the fresh clone) but no claim about the aggregate suite follows from it.

## 12. Deliverable identity, environment, and validation

- Branch `review/r3-srh-monotonicity-repair-20260908`, sole parent
  `f7ab321477bbb4f6decefbf931615ff6966e9e6e`; file added:
  `review-inputs/r3-srh-monotonicity-repair/REVIEW-RESULT.md` only. The reviewed result,
  the commission, the continuation record, the prior reviews and `main` are unchanged.
  The review commit, tree and blob identifiers are reported in the draft PR body and were
  checked against the GitHub-side objects after the push.
- Environment: managed remote Linux container (fresh clone); Node v22.22.2; pnpm 11.7.0;
  `pnpm install --frozen-lockfile` exit 0 (dependencies were not present before it);
  Python 3.11 with PyMuPDF 1.28.2 (hashing, page count, rendering), SciPy 1.17.1, NumPy
  2.4.6, mpmath. Outbound network only through the session proxy; no publisher, DOI or
  erratum host contacted; the GitHub API was used for live PR metadata and for the draft
  PR.
- Model information (ordinary accountable basis, Section 1): `claude-fable-5-1` as
  reported by the session-management service for configured, current and last-served
  model. Not a Git fact; no serving-build log requested or available.
- Validation (actual results):

| Check                                       | Fixed head `f7ab3214…`, before adding this file             | Final state with this file added                            |
| ------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| `pnpm format:check`                         | pass ("All matched files use Prettier code style!"), exit 0 | pass ("All matched files use Prettier code style!"), exit 0 |
| `pnpm lint:markdown`                        | pass (355 files, 0 issues), exit 0                          | pass (356 files, 0 issues), exit 0                          |
| `node --import tsx tooling/src/validate.ts` | pass ("validate: OK", audits clean), exit 0                 | pass ("validate: OK", audits clean), exit 0                 |
| `git diff --check`                          | clean (unstaged and `--cached`), exit 0                     | clean (unstaged and `--cached`), exit 0                     |

No aggregate `pnpm check`, test suite, typecheck, generated-diff check or Phase 1 suite is
claimed for either state.

## 13. Reproduction

```text
git fetch origin f7ab321477bbb4f6decefbf931615ff6966e9e6e
git cat-file -p f7ab3214…                                   # one parent 044078d3…, tree f47d884d…
P=governance/drafts/release-3-preparation/semantic-source-acquisition-result.md
git rev-parse f7ab3214…:$P                                  # 18e18eb1…
git show f7ab3214…:$P | wc -c                               # 343401
git show f7ab3214…:$P | sha256sum                           # 1eecef7a…05dcb
git show f7ab3214…:$P | head -c 334121 | cmp - <(git show 044078d3…:$P)   # byte-equal
git show f7ab3214…:$P | tail -c +334122                     # Part M, 9280 bytes
sha256sum 24_Einot_1975.pdf                                 # 1b097f5c…cd57b, 1211995 bytes, 11 pages
python3 - <<'EOF'
from scipy.stats import studentized_range as sr
a=.05
print(sr.ppf(1-(1-(1-a)**(6/8)),6,3), sr.ppf(1-(1-(1-a)**(7/8)),7,3))      # 8.91186585 8.89435083
print(sr.ppf(1-(1-(1-a)**(2/3)),3,3), sr.ppf(1-a,4,3))                      # 6.86866438 6.82452645
print(sr.ppf(1-a*4/6,4,20), sr.ppf(1-a,5,20))                               # 4.23450864 4.23185675
import numpy as np
print(sr.ppf(1-a*6/8,6,np.inf), sr.ppf(1-a,7,np.inf))                       # 4.17130447 4.16955416
EOF
```

RELEASE 3 SR-H PART M CLOSE-ONLY REVIEW COMPLETE - EINOT–GABRIEL p.576 (1.16) VERIFIED ON
THE PAGE IMAGE - FOUR PAIRS REPRODUCED - S-X1 CLOSED AS AN ADDITIVE AUTHOR-SIDE REPAIR -
ZERO BLOCKER, ZERO SHOULD-FIX, FIVE NICE-TO-HAVE - SR-H PARTIAL CANDIDATE UNCHANGED -
NOT ACCEPTED - NOT ADOPTED
