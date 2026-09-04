# Release 3 Semantic Source-Acquisition Result — Exact-Head Review of the SR-L Completion Pass

**Status: informative exact-head review result; non-normative; not adopted.** This
record reviews one exact commit of the Release 3 semantic source-acquisition result
against its commission, with the review scope limited to the Pass 2 closure of hold
SR-L and the integrity of the surrounding record. It selects no Contract, procedure,
identifier, schema, Public Check, tolerance, support domain, RFC decision, or release
outcome; it repairs nothing and merges nothing. Attribution is role-based only.

**Verdict: `GO`** (Section 12), with zero `BLOCKER`, two `SHOULD-FIX`, and four
`NICE-TO-HAVE` findings (Section 11). SR-L `CLOSED` is approved; the source-count
statements need a separate repair (S-1) that does not affect any disposition.

## 1. Review identity

| Field                        | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository                   | `licklider-ai/nomue-protocol`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Reviewed pull request        | #173                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Reviewed exact head          | `d1d04750aa085f7a92586a1154b8ff118bdd29cc`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Head tree                    | `c86ab4c68cc51ebbc3c6f2e7edb815a2fac4ddf3`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Sole parent                  | `0ef1bcd2b59b2ef95bd46476a0c5347b51f2c6ae` (Pass 1 head; tree `809699ff8326f794a41d406125ee9babf3cffef8`; result blob `72de5f5a85b97f3d84aa213c16b231cf7656f7c9`)                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Branch base                  | `65a53a4f2e54c691ccd76f71814c5a6e507f0046` (`origin/main` at review start and end)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Reviewed result blob         | `d622494fadfc40d62ff62257f247150ed36985fa`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Changed path (target commit) | `governance/drafts/release-3-preparation/semantic-source-acquisition-result.md` (1 path, +454/−2)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Commission blob              | `3c7ddcc696f0c284213f7efe0da68e747bc238d7` (identical at base and head)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Fixed semantic input         | commit `7bd9c5ab854777c3e99e624d9d2ed62731228852`, tree `f0436f5784dbe34d4c150893c20a60f0431c5d90`, result blob `8f21526040924b891f64724c2d0fde9ea94eff92` (identical at head)                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Supplied packet              | ZIP SHA-256 `a4cc5b6ebbc6eb1a85b59b099de1da6c88b7830c6bd5afe6ae14152d294ad693`; three PDF artifacts (Section 3)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Review date                  | 2026-09-04                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Reviewer role                | exact-head primary-source reviewer for the SR-L completion pass                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Independence boundary        | **This review was performed in the same working context that produced the reviewed Pass 2 commit.** Every identity, hash, pinpoint, count, and preservation check below was re-derived from Git objects and from the packet artifacts rather than taken from the reviewed text, but the review is not a separate-investigator review in the sense of the repository's research gate (a second pass in the authoring context is not enough for that purpose). The steward should treat this record as an exact-head verification and commission a separate-context reviewer before relying on SR-L closure for any gate. |
| Review branch                | `review/r3-semantic-source-acquisition-sr-l-d1d0475`, created from the reviewed head as sole parent                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Review posture               | falsification-oriented: the purpose was to find a reason SR-L must not close, a pinpoint that does not match the artifact, or a Pass 1 or catalogue statement that was altered                                                                                                                                                                                                                                                                                                                                                                                                                                          |

Live PR state read from the hosting service at review start and re-read after the
source work: state open, not merged, head `d1d04750…`, base `65a53a4f…`, two commits,
one changed file, `mergeable_state: clean`, five check runs on the head all
`success`. The head did not move during the review; `STALE_HEAD` does not apply.

## 2. Fixed-value and repository-identity verification

Every expected value was re-derived from Git objects after a fresh fetch, not taken
from the PR text, the instruction, or the result text.

| Check                                                                                        | Result                                                                                           |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `git cat-file -p d1d04750…`                                                                  | tree `c86ab4c6…`; exactly one parent, `0ef1bcd2…`; role-based author and committer identity      |
| `git rev-parse 0ef1bcd2…^{tree}`; parent count                                               | `809699ff…`; one parent (`65a53a4f…`)                                                            |
| `git ls-tree 0ef1bcd2… <result path>`                                                        | blob `72de5f5a…`                                                                                 |
| `git ls-tree d1d04750… <result path>`                                                        | blob `d622494f…`                                                                                 |
| `git diff --stat 0ef1bcd2… d1d04750…`                                                        | one path, `+454/−2`, the result file only (`M`)                                                  |
| `git diff --name-status 65a53a4f… d1d04750…`                                                 | one path, `A`, the result file only; no other path differs from `main`                           |
| Commission, README, semantic result, semantic commission, numerical commission blobs at head | `3c7ddcc6…`, `97ffd65f…`, `8f215260…`, `c6760efc…`, `5125d541…` — all unchanged from `65a53a4f…` |
| Fixed semantic input snapshot                                                                | `7bd9c5ab…` tree `f0436f57…`; result blob `8f215260…` at the snapshot and at the reviewed head   |
| Live PR head at start and end                                                                | `d1d04750…` both times                                                                           |
| Head CI (run `33838818866`)                                                                  | five jobs, all `success`, completed 05:00–05:01 UTC                                              |

## 3. Packet and artifact identity (independent re-derivation)

The packet was re-extracted into a fresh review directory and every hash recomputed.

| Item                                     | Expected                                                           | Recomputed | Pages | Document-information corroboration                                                                                                                |
| ---------------------------------------- | ------------------------------------------------------------------ | ---------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| ZIP                                      | `a4cc5b6ebbc6eb1a85b59b099de1da6c88b7830c6bd5afe6ae14152d294ad693` | match      | —     | 7 members: README, manifest (47 data rows, 18 columns), gaps, three PDFs                                                                          |
| `SRC-32-fda-2022-multiple-endpoints.pdf` | `40284a050aab0037799072b2340e37d4b02ab6f7f2339fff6ea1cd55673a9563` | match      | 29    | Title "Multiple Endpoints in Clinical Trials - Guidance for Industry"; Author "FDA/CDER"; created 2022-10-18                                      |
| `SRC-33a-ema-2002-ptc.pdf`               | `897bb9d6e9ced1865f709ca5fde8bbdcc2258ac6d89ed831cd6dcfaa0621e284` | match      | 11    | Title "Points to consider on multiplicity issues in clinical trials"; Author "European Medicines Agency"; created 2002-10-01; modified 2017-06-29 |
| `SRC-33b-ema-2017-draft.pdf`             | `1c5977c36f5f45a4845cb706ab6fc1a9c1a90a98ce68df7e6dcad240143982f7` | match      | 15    | Title "Guideline on multiplicity issues in clinical trials - for publication"; Author "European Medicines Agency"; created 2017-04-10             |

Cover and masthead facts re-read from the artifacts' own text layers:

- **SRC-32**: cover carries the title, "U.S. Department of Health and Human Services /
  Food and Drug Administration / Center for Drug Evaluation and Research (CDER) /
  Center for Biologics Evaluation and Research (CBER) / October 2022 / Biostatistics";
  printed p. 1 states "This guidance represents the current thinking of the Food and
  Drug Administration"; no draft banner; footnote 6 on printed p. 3 labels a different
  guidance "draft". Printed pagination 1–26 = PDF pp. 4–29; margin line numbers 1–438
  begin on printed p. 15. No docket number appears in the artifact.
- **SRC-33a**: cover carries "London, 19 September 2002 / CPMP/EWP/908/99 / COMMITTEE
  FOR PROPRIETARY MEDICINAL PRODUCTS (CPMP) / POINTS TO CONSIDER ON MULTIPLICITY ISSUES
  IN CLINICAL TRIALS", the procedural table ending "ADOPTION BY CPMP September 2002",
  and the notice "EMEA 2002 Reproduction and/or distribution of this document is
  authorised for non commercial purposes only provided the EMEA is acknowledged".
  Printed "1/10" … "10/10" = PDF pp. 2–11.
- **SRC-33b**: p. 1 lines 1–5 carry "15 December 2016 / EMA/CHMP/44762/2017 / Committee
  for Human Medicinal Products (CHMP) / Guideline on multiplicity issues in clinical
  trials / Draft"; the procedural table records BSWP agreement November 2016, CHMP
  release for consultation 15 December 2016, consultation 1 April–30 June 2017; lines
  7–8 state that the guideline "replaces" CPMP/EWP/908/99; the notice reads "©
  European Medicines Agency, 2017. Reproduction is authorised provided the source is
  acknowledged." Margin line numbers 1–599; PDF page = printed page.

### 3.1 Host provenance (separate from artifact identity)

| Attempt                                                                                           | Result                             |
| ------------------------------------------------------------------------------------------------- | ---------------------------------- |
| Re-download of SRC-32 from the issuing-authority download URL (`www.fda.gov`)                     | `CONNECT` refused (403) before TLS |
| Re-download of SRC-33a and SRC-33b from the issuing-authority document URLs (`www.ema.europa.eu`) | `CONNECT` refused (403) before TLS |
| Page-fetch instrument against the EMA guideline landing page and the FDA guidance landing page    | egress refusal for both domains    |

Consequently: **artifact identity is CONFIRMED** from the artifacts' own covers,
reference numbers, dates, and document-information fields, which are mutually
consistent and consistent with the fixed result's bibliographic identities; **host
provenance is NOT VERIFIED** in this review (no SHA-256 comparison against the issuing
hosts was possible). The reviewed result records the same limitation as U-5 and does
not claim host verification.

### 3.2 EMA live-page checks requested for this review

| Question                                                           | Result                                                                                                 |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Is CPMP/EWP/908/99 still listed as the effective version?          | `NOT_VERIFIED` — issuing host unreachable from this environment                                        |
| Is EMA/CHMP/44762/2017 still listed as draft, consultation closed? | `NOT_VERIFIED` — same                                                                                  |
| Does a superseding final guideline exist?                          | `NOT_VERIFIED` — same; no inspected artifact establishes one; the 2017 artifact is a draft on its face |

The reviewed result does not rely on any of these three facts: it names the 2017 text as
a draft, carries currency as X-7, and lists supersession as a reopen condition. The
packet's assertion about the landing page remains a supplier assertion in both records.

## 4. Pinpoint verification against the artifacts

Every printed-page, section, and margin-line pinpoint cited in the reviewed result's
Sections B.4–B.6 and B.9 was located in the re-extracted text. The margin-line
numbers were mapped to PDF pages from the artifacts' own printed numbering.

### 4.1 SRC-32 (FDA 2022)

| Cited pinpoint                                                                                                                                             | Verified content                                                                                                                                                                                                                                                                                                           | Result |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| printed p. 1, "current thinking"                                                                                                                           | present (PDF p. 4)                                                                                                                                                                                                                                                                                                         | match  |
| printed p. 2, §II scope: other multiplicity sources "will not be specifically addressed"; "focuses on … multiple endpoints within a single clinical trial" | present (PDF p. 5)                                                                                                                                                                                                                                                                                                         | match  |
| printed p. 3, footnote 6 "When final, this guidance …"                                                                                                     | present (PDF p. 6)                                                                                                                                                                                                                                                                                                         | match  |
| printed p. 4, §II.B overall Type I error definition                                                                                                        | "minimize the chances of a false favorable conclusion for any primary or secondary endpoints … regardless of which and how many of these endpoints in the study have no effect. The Type I error probability associated with testing multiple endpoints of a study is called overall Type I error probability." (PDF p. 7) | match  |
| printed p. 4, α = 0.05 / 0.025                                                                                                                             | present (PDF p. 7)                                                                                                                                                                                                                                                                                                         | match  |
| printed p. 5, inflation examples ≈0.05, ≈7%, ≈22%                                                                                                          | present (PDF p. 8); reviewer recomputation 0.0494, 0.0731, 0.2237                                                                                                                                                                                                                                                          | match  |
| printed p. 7, §III.A.3 "all together"                                                                                                                      | present (PDF p. 10)                                                                                                                                                                                                                                                                                                        | match  |
| printed p. 8, 64% joint power                                                                                                                              | present (PDF p. 11); 0.8 × 0.8 = 0.64                                                                                                                                                                                                                                                                                      | match  |
| printed p. 13, §IV "at least one endpoint regardless of the presence or absence …"; "0.05 (or 0.025 for one-sided tests)"                                  | present (PDF p. 16)                                                                                                                                                                                                                                                                                                        | match  |
| references, lines 15–16, 22–26, 46–47, 52–53, 97–98, 100–101                                                                                               | Bretz 2009 (Stat Med 28:586–604); CPMP 2002 PtC; Hochberg 1988 (Biometrika 75:800–802); Holm 1979 (Scand J Stat 6(2):65–70); Westfall & Young 1993 (Wiley-Interscience, NY); Wiens 2003 (Pharm Stat 2:211–215) — all at the cited lines on printed pp. 15–17                                                               | match  |
| appendix preamble, lines 110–115                                                                                                                           | "this guidance does not attempt to recommend any one method over another in most cases" (printed p. 18)                                                                                                                                                                                                                    | match  |
| §1 Bonferroni lines 117–134; §2 Holm lines 136–166                                                                                                         | headings at lines 117 and 136 (printed p. 18)                                                                                                                                                                                                                                                                              | match  |
| §3 Hochberg lines 168–198; assumption statement lines 188–198                                                                                              | heading at 168 (printed p. 19); "Bonferroni and the Holm procedures are well known for being assumption-free" at 188; Hochberg conditions at 191–198 (printed pp. 19–20), citing Sarkar et al. 1997 and Huque 2016                                                                                                         | match  |
| §4 PAAS lines 200–221; validity lines 211–213                                                                                                              | present (printed p. 20)                                                                                                                                                                                                                                                                                                    | match  |
| §5 fixed sequence lines 223–248                                                                                                                            | heading at 223 (printed p. 20)                                                                                                                                                                                                                                                                                             | match  |
| §6 resampling lines 250–269; assumptions lines 261–269                                                                                                     | present (printed p. 21); Westfall and Young 1993 cited at line 252                                                                                                                                                                                                                                                         | match  |
| §7 gatekeeping lines 271–295; serial 283–290; parallel 292–295                                                                                             | "serial gatekeeping, parallel gatekeeping and their generalization referred to as tree-structured gatekeeping" at 279–281 (printed p. 21); serial 283–290 (printed pp. 21–22); parallel with "separable testing method (e.g., Bonferroni method or Truncated Holm method)" 292–295 (printed p. 22)                         | match  |
| multi-branched gatekeeping lines 308–311; Figure A1 printed p. 23                                                                                          | present (printed p. 22); Figure A1 caption at line 332 (printed p. 23)                                                                                                                                                                                                                                                     | match  |
| §8 graphical lines 341–438                                                                                                                                 | heading at 341 (printed p. 23); text ends at 438 (printed p. 26)                                                                                                                                                                                                                                                           | match  |
| "familywise", "family-wise", "FWER": zero occurrences                                                                                                      | full-text search: 0, 0, 0; "overall Type I error" occurs throughout                                                                                                                                                                                                                                                        | match  |
| no docket number in the artifact                                                                                                                           | confirmed                                                                                                                                                                                                                                                                                                                  | match  |

### 4.2 SRC-33a (CPMP 2002)

| Cited pinpoint                                                                                                 | Verified content                                                                                                                                                                                                               | Result |
| -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| printed p. 1, §1 strong-sense definition                                                                       | "control of the family-wise type I error in the strong sense, i.e., there is control on the probability to reject at least one true null hypothesis, regardless which subset of null hypotheses happens to be true" (PDF p. 2) | match  |
| printed p. 1, five subgroups at 2.5% → 12%                                                                     | present; reviewer recomputation 0.1189                                                                                                                                                                                         | match  |
| printed p. 2, §2 multiple-level-α tests; α splitting; CI consistency; Bonferroni fallback                      | present (PDF p. 3)                                                                                                                                                                                                             | match  |
| printed p. 3, §2.1 "members from the set of closed testing procedures that control the family-wise error rate" | present (PDF p. 4)                                                                                                                                                                                                             | match  |
| printed p. 5, §2.5 multi-arm "minimal prerequisite"; pairwise intervals "usually too narrow"                   | "control of the family-wise type I error in the strong sense (i.e. application of closed test procedures) is a minimal prerequisite for confirmatory claims" and the interval remark (PDF p. 6)                                | match  |
| printed pp. 5–6, §2.5.3 dose-response "mandatory"; exploratory pairwise "not necessary"                        | present (PDF pp. 6–7)                                                                                                                                                                                                          | match  |
| cover reproduction notice "non commercial purposes only"                                                       | present (PDF p. 1)                                                                                                                                                                                                             | match  |

### 4.3 SRC-33b (EMA 2017 draft)

| Cited pinpoint                                                                      | Verified content                                                                                                                                                                                                                    | Result |
| ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| p. 1, lines 1–5 identity; lines 7–8 "replaces"                                      | present                                                                                                                                                                                                                             | match  |
| p. 3, lines 57–58 identifier "EMA/286914/2012"                                      | present                                                                                                                                                                                                                             | match  |
| p. 4, lines 105–111 study-wise strong-sense definition                              | "control of the study-wise type I error in the strong sense, i.e. there is control on the probability to reject at least one out of several true null hypotheses, regardless of which subset of null hypotheses happens to be true" | match  |
| p. 4, lines 119–121 frequentist framing                                             | present                                                                                                                                                                                                                             | match  |
| pp. 5–6, lines 173–179 multiple-level-α; local significance level; Dunnett          | present; Dunnett at 178                                                                                                                                                                                                             | match  |
| p. 6, lines 180–183 "without room for choice"                                       | present                                                                                                                                                                                                                             | match  |
| p. 8, lines 303–305 multi-arm "minimal prerequisite" (no closed-test parenthetical) | present; the parenthetical is absent                                                                                                                                                                                                | match  |
| pp. 9–10, lines 337–356 Phase II "may not be required"; Phase III "mandatory"       | present                                                                                                                                                                                                                             | match  |
| pp. 14–15, lines 561–599 estimation; 596–599 Bonferroni-corrected intervals         | present                                                                                                                                                                                                                             | match  |
| "family-wise" absent; "closed test" absent; "study-wise" on pp. 4, 5, 8, 9, 10      | confirmed                                                                                                                                                                                                                           | match  |

No cited pinpoint failed to match. No quoted passage differs from the artifact beyond
line-break whitespace.

## 5. SR-L closure examination

| Question put to the closure                                                                                           | Finding                                                                                                                                                                                                                                                                                                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Does FDA treat the overall Type I error as the probability of falsely rejecting any true null?                        | Yes. Printed p. 4 ("false favorable conclusion for any primary or secondary endpoints … regardless of which and how many of these endpoints in the study have no effect") and printed p. 13 ("at least one endpoint regardless of the presence or absence of treatment effects in the other endpoints").                                                                                       |
| Is the "strong-sense FWER equivalent" reading an excessive investigator inference?                                    | No. The quantity is defined over any configuration of true nulls, which is the strong-sense definition; the result labels the equivalence as investigator inference (B.6.1 item 2), records that the artifact never uses the words (U-1), and uses the guidance's own term where it quotes it. The reviewer independently reads the two passages the same way.                                 |
| Are the serial, parallel, tree-structured, and multi-branched gatekeeping pinpoints correct?                          | Yes (Section 4.1): lines 279–281, 283–290, 292–295, 308–311; Figure A1 on printed p. 23.                                                                                                                                                                                                                                                                                                       |
| Is the scope limitation (FDA does not directly address multi-group comparison) correct?                               | Yes. Printed p. 2 confines the guidance to multiple endpoints within a single trial and says other sources of multiplicity (multiple doses, time points, subgroups) "will not be specifically addressed"; printed p. 5 and p. 22 mention dose groups only in passing. The result records this as `NARROWED`, not as a contradiction, which is the correct relation.                            |
| Does EMA 2002 define family-wise Type I error in the strong sense directly?                                           | Yes, verbatim on printed p. 1.                                                                                                                                                                                                                                                                                                                                                                 |
| Does EMA 2002 make strong-sense control a minimal prerequisite for more than two arms?                                | Yes, verbatim on printed p. 5 (§2.5), with the parenthetical "(i.e. application of closed test procedures)"; §2.5.3 makes it "mandatory" for confirmatory dose-response studies.                                                                                                                                                                                                               |
| Is the EMA 2017 study-wise strong-sense description and the 2002→2017 difference account correct?                     | Yes. The 2017 definition (p. 4, lines 108–111) is the same quantity under the name "study-wise"; the multi-arm prerequisite persists (p. 8, lines 303–305) without the closed-test parenthetical; Dunnett's test is named (p. 6, line 178); an estimation section is added (§10). The result's U-3 states exactly these differences and treats them as differences, not a conflict.            |
| Is the draft treated as an adopted document anywhere?                                                                 | No. B.4.3 labels it "Draft for consultation"; B.5 row C-L2 (d) records that the "replaces" statement is made in a draft; B.6.2 item 8 and B.11 make supersession a reopen condition; B.11 item 3 forbids citing the draft's estimation section as adopted text.                                                                                                                                |
| Are SRC-32's Bonferroni, Holm, Hochberg, fixed-sequence, graphical, and resampling descriptions used for other holds? | No. B.6.1 item 4 records them as secondary characterizations and states they are not used for SR-B, SR-C, SR-D, RSM-01, or RSM-02; B.7 repeats this in the SR-B, SR-C, SR-D, SR-J, and RSM-01 rows; B.8 does the same for the resampling paragraph; the SRC-33b Dunnett mention is likewise marked not used for MTO-01 or SR-J. No other hold's disposition changes between Pass 1 and Pass 2. |
| Are all decision-bearing claims for the hold supported with artifact identity and pinpoints?                          | Yes. The hold's claims are C-L1 (FWER framing; gatekeeping vocabulary) and C-L2 (multiplicity framing). Rows C-L1 (a), (b), C-L2 (a), (b), (c) are `SUPPORTED` with verified pinpoints; C-L1 (c) is a scope narrowing; C-L2 (d) is a currency question, not a source claim. The commission's `CLOSED` condition is met.                                                                        |

**SR-L `CLOSED`: approved**, with the qualifications the result already records (U-1
terminology; endpoint-family scope; X-7 currency; U-5 host provenance) and with the
independence boundary in Section 1.

## 6. X-7, U-1 through U-5, and X-8 against the closure

| Item | Content in the reviewed result                                                         | Reviewer ruling                                                                                                                                                                                                                                                                                                                          |
| ---- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| X-7  | Supersession of the 2017 draft or the 2002 PtC unresolved; reopen condition            | **Acceptable as a reopen condition; does not block closure.** The catalogue entry GUI-02 names the 2002 PtC and the 2017 _draft_; both were inspected as named. Whether a later final text exists is a currency question about the catalogue, not a claim the inspected texts fail to support. `NOT_VERIFIED` here (Section 3.2).        |
| U-1  | FDA does not use "familywise"/"FWER"                                                   | Correct and adequately recorded; consistent with closure.                                                                                                                                                                                                                                                                                |
| U-2  | SRC-33a printed notice is non-commercial-only, narrower than the packet's stated basis | Correct (cover verified). Affects the packet's redistribution claim only; no file is committed; consistent with closure.                                                                                                                                                                                                                 |
| U-3  | 2002→2017 differences                                                                  | Correct (Section 4.3). Treated as differences, not an adjudicated conflict; appropriate for a framing entry.                                                                                                                                                                                                                             |
| U-4  | "EMA/286914/2012" cross-reference anomaly in SRC-33b                                   | Present at p. 3, line 57. Correctly recorded as source-internal; no identity impact.                                                                                                                                                                                                                                                     |
| U-5  | Host re-hash not performed                                                             | **Does not block closure.** The commission permits lawfully supplied local copies and asks for bibliographic identity, route, date, SHA-256, and pinpoints, all of which are recorded. Host provenance remains a steward or reviewer action with host access (Section 3.1); the result already makes a hash mismatch a reopen condition. |
| X-8  | "Marcus (1976)" in SRC-28 omitted from Section 11; identity unresolved                 | Correctly raised as a named bibliographic gap. **The determinate figures built on it (48 required, 45 uninspected) are not established** — see Section 7 and finding S-1.                                                                                                                                                                |

## 7. Source-count examination

### 7.1 Recount from the Pass 1 text (blob `72de5f5a…`)

Section 11 rows by hold: SR-A 4, SR-B 2, SR-C 6, SR-D 5, SR-E 1, SR-F 3, SR-G 1,
SR-H 7, SR-I 3, SR-J 4, SR-K 3, SR-L 3 = **42** SR rows; plus one RSM-01 row and one
RSM-02 row (four candidates) = 44 table rows. Section 2.8 states 43 SR sources. The
packet manifest has 47 data rows = 42 SR + SRC-25 + V-1 … V-4, with `GAP_LEGAL_URL_ONLY`
on exactly four rows (SRC-22, SRC-23, SRC-24, SRC-30) against the packet's `gaps.md`
Section 1 figure of 3. All of this matches the reviewed result's Section B.10.

### 7.2 Identity of "Marcus (1976)" in SRC-28

The fixed semantic result (blob `8f215260…`) lists SRC-18 as Marcus, Peritz, and
Gabriel (1976), "On Closed Testing Procedures with Special Reference to Ordered
Analysis of Variance," Biometrika 63(3):655–660, and lists SRC-28 as "Marcus
(1976)/Naik (1975)/Dunnett and Tamhane (1991, 1992) step-down and step-up many-to-one
procedures". The catalogue rows MTO-02 and MTO-03 name only Naik (1975) and
Dunnett-Tamhane (1991, 1992); no row names "Marcus (1976)" as a procedure source.

Reviewer determination: **the identity cannot be established from an inspectable
primary source in this environment.** The reference lists of Dunnett and Tamhane
(1991, 1992) are behind hosts that refused the connection; the web index returns only
snippets, which the commission excludes as decision-bearing; and reviewer recall is
not evidence. Two readings are open:

1. the same text as SRC-18 (the closed-testing paper, whose closure principle
   underlies step-down many-to-one testing), cited in SRC-28 as lineage — under this
   reading Section 11 omits nothing, Section 2.8's 43 double-counts one text, the
   distinct SR requirement is 42, the total is 47, and 44 items remain uninspected;
2. a distinct Marcus 1976 text — under this reading Section 11 omits one item, the SR
   requirement is 43, the total is 48, and 45 remain uninspected, and a full
   bibliographic identity must be supplied before it can be added to the required list.

The reviewed result adopts reading 2 as determinate ("The corrected required-source
enumeration is 43 SR items"; "the required total is 48"; "45" uninspected; B.13 "add
to SR-J: Marcus (1976)") while simultaneously stating in X-8 that the identity is
unresolved. That is an internal inconsistency in the count, not in any disposition:
SR-J is `INPUT_INCOMPLETE` under either reading, and no other figure in Section B.7,
B.8, or B.12 depends on it. **Finding S-1** asks that the figures be written as a
range (47–48 required; 44–45 uninspected; 42–43 SR) with X-8 as the named gap until a
reference list or other inspectable bibliographic source settles it.

## 8. Preservation checks

| Check                                                                                                               | Result                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pass 1 body preserved verbatim                                                                                      | `diff` of parent lines 16–611 against head lines 30–625: identical. The parent's closing line is present unchanged at head line 628, preceded by a one-line label. Head lines 1–11 identical to the parent. The only removed text is the two-line Pass 1 overall-disposition paragraph, replaced by a paragraph that names Pass 2 and preserves the catalogue/`NARROW`/`TRANSFER` sentence; a Pass ledger (H2) is inserted. |
| Pass 1 Section 2.8 ("43"), Section 11 ("42" rows), Section 12 (`INPUT_INCOMPLETE`, "Zero of fourteen are `CLOSED`") | unchanged in the head; corrections live only in Part B                                                                                                                                                                                                                                                                                                                                                                      |
| Fixed 49-entry catalogue, `NARROW`, two `TRANSFER` dispositions                                                     | the fixed semantic result blob `8f215260…` is byte-identical at the snapshot, at `main`, and at the reviewed head; Part B changes no catalogue token; B.7 keeps RSM-01 and RSM-02 `INPUT_INCOMPLETE` with `TRANSFER` preserved; B.12 states `NARROW` stands                                                                                                                                                                 |
| RSM-02 candidates                                                                                                   | V-1 … V-4 remain reopen triggers / variant-split candidates (B.8); no promotion, no redefinition                                                                                                                                                                                                                                                                                                                            |
| Overall `INPUT_INCOMPLETE`; 13 of 14 open; `SOURCE_SET_READY` false                                                 | B.12: `NO_GO` none, `INPUT_INCOMPLETE` thirteen, `PARTIAL` none, `CLOSED` one; "One of fourteen is `CLOSED`. Not satisfied."; closing line "13 OF 14 OPEN"                                                                                                                                                                                                                                                                  |
| Authority boundary                                                                                                  | one path differs from `main`; no PDF, ZIP, or other source file is tracked; authoritative artifacts, registries, schemas, conformance, reference code, generated views, Release 2 material, both commissions, the fixed result, and the RFC draft are unchanged                                                                                                                                                             |
| Public discussion, procedure selection, implementation, Protocol adoption                                           | not opened, not selected, not authorized; the status paragraph, B.7 ("selects nothing, changes no catalogue token"), B.15, and the closing line ("NOT PROTOCOL ADOPTION") all say so                                                                                                                                                                                                                                        |
| Neutral metadata                                                                                                    | commit author and committer are role-based; commit message, branch name, and result text name no drafting, extraction, search, or review mechanism; the packet's non-neutral metadata cell is not reproduced                                                                                                                                                                                                                |

## 9. Validation

Run in the working clone against the reviewed head content before the review branch
was created, and re-run after adding this file:

- `pnpm format:check`: clean.
- `pnpm lint:markdown`: 350 files at the reviewed head (351 with this record), 0 issues.
- `node --import tsx tooling/src/validate.ts`: `validate: OK`.

CI on the reviewed head: run `33838818866`, five jobs `success`. The repository's CI
workflow triggers on pushes to `main` and `feat/**` and on pull requests; a push of
the review branch alone does not trigger it, so no CI run is expected on the review
commit unless a pull request is opened for it.

## 10. Source-access boundary of this review

Only the three packet artifacts were inspected. No source assigned to SR-A through
SR-K, RSM-01, or RSM-02 was inspected, and this review makes no content ruling and no
closure ruling on any of them. Every host attempted (`www.fda.gov`,
`www.ema.europa.eu`, and the page-fetch instrument against both) refused the
connection; the web index was used for one discovery-grade query on X-8 whose result
is not relied on.

## 11. Findings

### BLOCKER

None.

### SHOULD-FIX

- **S-1 (source-count determinacy; separate from SR-L closure).** Section B.10 states
  "The corrected required-source enumeration is 43 SR items", "the required total is
  48", and "45" uninspected, and Section B.13 adds Marcus (1976) to SR-J as a required
  item, while X-8 states that the identity of "Marcus (1976)" is unresolved. Until an
  inspectable bibliographic source settles whether it is SRC-18 or a distinct text,
  write the figures as ranges — 42–43 SR items, 47–48 total, 44–45 uninspected — and
  make the B.13 addition conditional on X-8. The PR description's "corrected SR count
  is 43" should follow the same repair. No disposition, hold, or the overall
  `INPUT_INCOMPLETE` depends on the figure.
- **S-2 (reviewer-independence provenance).** The result's Section 1.2 records the
  investigator role for Pass 1 only; Part B does not restate who performed Pass 2 or
  its independence boundary from Pass 1. Add a one-line provenance statement to Part B
  (role, independence boundary from the Pass 1 investigator and from the packet
  supplier, date), so that the record is self-describing when read at the head without
  this review.

### NICE-TO-HAVE

- **N-1.** B.1's PR-state row reports "five checks successful"; those were the checks
  on the parent head at Pass 2 start. Say "on the parent head" to avoid reading it as
  the Pass 2 head's CI.
- **N-2.** B.5 row C-L1 (a) could add the "family of endpoints" / "primary endpoint
  family" usages (printed pp. 6–7, 13) as the artifact's own family vocabulary next to
  the U-1 note; this strengthens, without changing, the terminology qualification.
- **N-3.** The pass ledger's time column ("04:46+") could carry the exact packet
  receipt and acquisition-attempt timestamps already given in B.2 and B.3.
- **N-4.** B.4.1's redistribution row states the federal-work basis as an investigator
  note sourced from the packet; a citation-free wording ("not stated in the artifact;
  not relied on") would keep the row to artifact-derived facts.

## 12. Verdict and its limits

**`GO`.**

At exact head `d1d04750aa085f7a92586a1154b8ff118bdd29cc`:

- **SR-L `CLOSED`: approved.** Every decision-bearing claim the hold exists to verify
  is directly supported by the inspected issuing-authority texts at verified
  pinpoints; the qualifications (terminology, endpoint-family scope, draft status,
  currency, host provenance) are recorded rather than hidden; no secondary description
  in those texts is used for any other hold or entry.
- **X-7:** acceptable as a reopen condition; not closure-blocking; `NOT_VERIFIED`
  against the live issuing host by this review.
- **U-5:** host re-hash outstanding; does not block closure; remains a steward or
  reviewer action with host access.
- **X-8 / source totals:** X-8 correctly raised; the determinate figures 43 / 48 / 45
  are not established and require repair to ranges (S-1); no disposition depends on
  them.
- **Overall `INPUT_INCOMPLETE`:** correct under the precedence rule (no `NO_GO`;
  thirteen `INPUT_INCOMPLETE`).
- **`SOURCE_SET_READY = false`:** correct.
- **`NARROW` and both `TRANSFER` dispositions:** preserved; the fixed catalogue blob is
  unchanged.
- **Public discussion, procedure selection, implementation, Protocol adoption:** not
  started; the record says so at every level.

`GO` means only that the Pass 2 record conforms to the commission for the scope
reviewed and may proceed to the steward's merge consideration as an informative
research record, with S-1 and S-2 recorded for repair in or before the steward's
disposition. It is not a separate-context independent review (Section 1); the
steward decides whether that boundary requires a further reviewer before any gate
relies on SR-L closure. It closes no other hold, does not reach `SOURCE_SET_READY`,
opens no public discussion, selects no procedure, and authorizes no implementation.

## Public-artifact self-check

- Only this file is added, on a branch whose sole parent is the reviewed head. The
  candidate result, both commissions, the fixed semantic result, the RFC draft, the
  README, authoritative artifacts, registries, schemas, conformance artifacts,
  reference code, generated views, and Release 2 material are unchanged.
- No PDF, ZIP, or other primary-source file is committed.
- Attribution is role-based; no drafting, extraction, search, or review software,
  service, provider, or mechanism is identified; no human authorship is claimed; the
  independence boundary is stated rather than implied.
- Source-established facts (Sections 3–4), reviewer rulings (Sections 5–8), and
  findings (Section 11) are kept separate.

RELEASE 3 SEMANTIC SOURCE-ACQUISITION SR-L COMPLETION REVIEW COMPLETE - GO - SR-L CLOSED APPROVED - COUNT REPAIR REQUIRED (S-1) - OVERALL INPUT_INCOMPLETE PRESERVED - SOURCE_SET_READY FALSE - NARROW AND TRANSFER PRESERVED - NOT A SEPARATE-CONTEXT REVIEW - NOT PROTOCOL ADOPTION
