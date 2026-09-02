# FND-1 Potential-Outcomes Lineage Close-Review Result

**Status: informative close-review result; non-normative; not adopted.** This
report reviews only the frozen potential-outcomes lineage result retained under
`FND1-H04` / `H04-S1`, as assigned by
[`2026-09-02-nonclinical-estimand-potential-outcomes-lineage-close-review-commission.md`](2026-09-02-nonclinical-estimand-potential-outcomes-lineage-close-review-commission.md).
It performs no new lineage pass, adopts no Protocol vocabulary, authorizes no
implementation, closes no hold or Research Gate, and affects no release.

## 1. Identity, input, access, artifact, and independence checks

**Reviewer role and independence.** Independent, repository-capable close
reviewer. The reviewer did not author the frozen result or any earlier draft of
it, had no exposure to the frozen result before this review, and did not
reconstruct or inspect the superseded same-role draft disclosed in the frozen
result's §1. No FND-1 file other than the permitted inputs listed below was
opened for content.

**Review execution base.** Commit
`cf796ef25504944835a46666885ba1a7e84bcf70`, the commit containing the
close-review commission (commission blob
`daee7b7c8bf1e335793967c7175258b955be466f`, first added at
`373c979201868aa591e97075435f915737095b97`). Review branch
`research/fnd-1-potential-outcomes-lineage-close-review-20260902` was created
from that commit; the working tree was clean before the single-file
replacement recorded here.

**Fixed repository identity (commission §1).**

| Item                                  | Fixed value                                                                                                        | Observed                                                                                          | Check  |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- | ------ |
| Result path                           | `evidence/research/foundation-identity/fnd-1/2026-09-02-nonclinical-estimand-potential-outcomes-lineage-result.md` | Present at every commit below                                                                     | `PASS` |
| Result commit                         | `9340ab34321618403a309e536c34aad4ba996897`                                                                         | Commit object present; parent `3b4eab15bf3f5bb02819d27b4ab9e28bf2055f0b`                          | `PASS` |
| Intake merge                          | `ad0943144838c433df9ce17d08a03ba61a1e2e9a`                                                                         | Merge commit; parents `3b4eab15…` and `9340ab34…`                                                 | `PASS` |
| Ancestry                              | result commit → intake merge → review base → review branch                                                         | Each is an ancestor of the next; `cf796ef…` is also an ancestor of the current default branch     | `PASS` |
| Result blob                           | `510e4fc6ec85f958da9ce9228ce292f411c9983f`                                                                         | Byte-identical at the result commit, intake merge, review base, review branch, and working tree   | `PASS` |
| Result SHA-256                        | `b928ebf2f53ef0f5338a0561f8a89bcdd8024f0101ef60f5465e2ab2088daee7`                                                 | Recomputed on the blob: identical                                                                 | `PASS` |
| Result length                         | 268 lines                                                                                                          | 268 lines                                                                                         | `PASS` |
| Recorded research disposition         | `NARROW`                                                                                                           | §2, §11, and the final line of the frozen result                                                  | `PASS` |
| Proposed sub-hold disposition         | `H04-S1: NARROW_AND_CLOSE`                                                                                         | §2 and §11 of the frozen result                                                                   | `PASS` |
| Result's self-declared execution base | `836cfa0a132b76b008b3444c882fbf96e4cc3bf7`                                                                         | Commit present; ancestor of the result commit; carries the lineage commission at blob `ef1cd2b0…` | `PASS` |

**Permitted inputs read (commission §2).**

1. The lineage commission, blob `ef1cd2b0120123c7c35d0a0542302aac4693117f`
   (verified at the review base).
2. The completion steward disposition, blob
   `3b100162c64dbb079eb969effd26ceef847fea5c` (verified), used only for the
   accepted boundary (`H04-S1` partially met: one formal non-ICH source carries
   the principal target-quantity elements; two-formal-text condition unmet;
   canonical lineage not directly inspected) and the exact residual (direct
   inspection of the identified Neyman, Rubin, and Holland texts).
3. The frozen result, blob `510e4fc6ec85f958da9ce9228ce292f411c9983f`
   (verified).
4. This commission and the assigned placeholder (placeholder blob
   `5df9f71efd92b2f0db592bd813263135e0250206`, replaced by this report).

Repository operating instructions were read solely to govern repository
operations and were not used as source-content evidence.

**Not read.** The animal-endpoint commission and result; any later
reconciliation or disposition; earlier non-clinical estimand results or
reviews; FND-2 results; unrelated review branches; private repositories;
Release 2, paired-t, and t-family numerical-contract material. No other review
or investigator summary was used as source-content evidence.

**Source access.** Publisher, DOI-resolver, and archive routes for all three
artifacts were attempted first on 2026-09-02 and were not reachable from the
review environment (every connection was refused at the network boundary; zero
bytes were retrieved). The commissioning steward then supplied the three
artifacts as files on 2026-09-02 (access time 07:05 UTC). SHA-256 and byte
size were recomputed on the supplied files before any page was opened; page
counts were computed from each file's page tree.

**Artifact identity.**

| Source  | Expected SHA-256                                                   | Recomputed SHA-256 | Bytes expected / observed | PDF pages expected / observed | Check  |
| ------- | ------------------------------------------------------------------ | ------------------ | ------------------------- | ----------------------------- | ------ |
| `PO-01` | `03ae590248dafc54bdc0e6ec509a83eea4ea210646995e3469c653982dd79047` | identical          | 2,007,596 / 2,007,596     | 9 / 9                         | `PASS` |
| `PO-02` | `e0fa8701ba613f01a0de321775e9793597aae5c9084fcbd8b9539cd8272321fa` | identical          | 1,274,918 / 1,274,918     | 14 / 14                       | `PASS` |
| `PO-03` | `3c2fd027c19353bdb28972045d8b44225b6895db1d2ced685b41a11619248c6c` | identical          | 2,577,683 / 2,577,683     | 17 / 17                       | `PASS` |

All three files are the exact artifacts recorded by the frozen result. No
`ARTIFACT_VARIANT` relative to the frozen record was needed or used. The
source-access gate of commission §3 is passed; the substantive review below
was performed on these exact bytes.

## 2. Source-artifact, rendition, and page-map checks

### 2.1 `PO-01` (Neyman, translated 1990)

- **Rendition.** PDF 1.3, produced by a 2006 page-to-PDF conversion. Page 1
  carries the journal header (volume 5, number 4, pages 465–480), the title,
  the translators' credit line naming the 1923 Polish original, the abstract,
  the key words, and an archive digitization notice. That notice is the only
  text-layer content in the file; pages 2–9 have no text layer at all. Every
  page was inspected as a rendered image (full pages at 130 dpi; 230 dpi crops
  for equations, bracketed source-page anchors, and the editorial note).
- **Translation boundary.** Confirmed: the inspected work is the 1990 English
  translation of Section 9 of the 1923 monograph, not the complete monograph.
- **Printed-to-PDF map.** 465 → p. 1; 466 → p. 2 (Figure 1 and its caption
  only, under the running head); 467 → p. 3; 468 → p. 4; 469 → p. 5;
  470 → p. 6; 471 → p. 7; 472 → p. 8. PDF p. 9 is a full-page photographic
  plate with no text and no printed page number; it is not Comment text. The
  accompanying Comment begins on printed p. 472 below the end of the translated
  text, lies outside the authorial range, and was not read for evidence. The
  frozen result's map for pp. 465–472, including the Figure 1 page, is
  reproduced; its description of PDF p. 9 is not.
- **Bracketed source-page anchors.** `[29]`, `[30]`, `[31]` on p. 467; `[32]`,
  `[33]` on p. 468; `[34]`, `[35]`, `[36]` on p. 469; `[35]` (printed a second
  time), `[37]`, `[38]` on p. 470; `[39]`, `[40]` on p. 471; `[41]`, `[42]` on
  p. 472. The repeated `[35]` is a feature of the printed translation.
- **Image checks performed.** Eq. (13) and the per-variety mean on p. 467;
  Eq. (16) on p. 470; Eq. (17), the choice of the correlation value, and the
  translators' bracketed additivity note on p. 471; the definition of the
  true difference and the closing fertilizer sentence on p. 472.

### 2.2 `PO-02` (Rubin 1974)

- **Rendition.** PDF 1.5, produced by a 2025 publisher-side conversion with an
  intact text layer on all 14 pages and a rights footer repeated on every
  page (excluded from pinpoint reading). The journal header on p. 688 (volume
  66, number 5, pages 688–701) and the 1973 received-date stamp on p. 701 match
  the fixed bibliographic identity. The frozen result's `ARTIFACT_VARIANT`
  classification (modern publisher rendition, not a first-generation scan) is
  consistent with the file metadata and does not affect page-numbered anchors.
- **Printed-to-PDF map.** 688 → p. 1 through 701 → p. 14, verified from the
  printed page token on every page.
- **Symbol checks at 230 dpi.** Greek lowercase `τ` is introduced on p. 692 by
  a displayed formula as the mean of per-trial contrasts over the `2N` trials;
  `τ` recurs on pp. 693–694 in the unbiasedness argument. Capital Latin `T` is
  introduced on p. 697 for the mean over the `M`-trial population, and the
  parenthetical on p. 697 states unbiasedness for `T` and not necessarily for
  `τ`; `T` recurs on p. 698. Hypothesized per-trial effects carry a tilde and
  are distinct from both.

### 2.3 `PO-03` (Holland 1986)

- **Rendition.** PDF 1.4, produced by a 2008 archive conversion. Page 1 is the
  archive cover page (title, author, source, stable identifier, access date
  in 2009) and is the only page with a text layer; pages 2–17 are image-only
  and were inspected as rendered images with 230 dpi crops for the §3
  equations, §4.3, §4.4, and §8.2.
- **Printed-to-PDF map.** Cover → p. 1; 945 → p. 2 through 960 → p. 17,
  verified from the printed page numbers; the reference list ends on p. 960.
- **Equation locations verified.** (1)–(4) on p. 947; (5)–(7) on p. 948;
  (8)–(15) on p. 949; (16)–(26) on p. 952; (27)–(29) on p. 953; (30)–(35) on
  p. 957; (36)–(44) on p. 958.

## 3. Closure matrix

| Check | Result | Evidence                                                                                                                                                                                                                                                                                                                                                                             |
| ----- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| C-01  | `PASS` | Every fixed identity, ancestry relation, blob, SHA-256, line count, and disposition matches (§1).                                                                                                                                                                                                                                                                                    |
| C-02  | `PASS` | Only the permitted repository inputs and the three exact artifacts were used by this review; the frozen result's exclusion list and independence disclosure are adequate; the single external bibliographic record it used for `PO-02` identity is a discovery aid permitted by the lineage commission §4.                                                                           |
| C-03  | `PASS` | Twelve sections in the commissioned order; atomic statuses drawn from the allowed set (absence annotations in parentheses); matrix vocabulary as commissioned; exactly one research disposition (`NARROW`); exactly one sub-hold proposal (`NARROW_AND_CLOSE`); final line exact.                                                                                                    |
| C-04  | `FAIL` | Identity, translation boundary, authorial range, and the pp. 465–472 map reproduce. The editorial-note anchor does not: the result places the bracketed additivity note and anchor `[40]` on p. 472; both are on p. 471. The register also describes PDF p. 9 as Comment text (it is a photographic plate) and the text layer as partial (pages 2–9 have none).                      |
| C-05  | `PASS` | N1–N11 are supported at the recorded grades (§5.1); the single-variety mean is graded as a defined finite-population quantity, not upgraded from its estimator; no statement from the Comment enters the evidence.                                                                                                                                                                   |
| C-06  | `PASS` | Exact artifact; rendition boundary stated and consistent; page map reproduced; `τ` (p. 692) and `T` (p. 697) verified as distinct symbols for distinct unit sets, with the p. 697 parenthetical reproduced.                                                                                                                                                                          |
| C-07  | `PASS` | R1–R15 are supported at the recorded grades (§5.2); the per-trial exclusivity condition (p. 689) and the covariate-invariance condition (p. 696, footnote 8) are kept as per-trial or per-covariate conditions and never converted into no-interference or treatment-version conditions.                                                                                             |
| C-08  | `FAIL` | Identity, page map, and assumption roles reproduce. Equation anchors do not: Eqs. (8)–(11) are on p. 949, not p. 948; Eq. (35) is on p. 957, not p. 958. The row-9 consistency component is not ruled on for `PO-03`, and the one occurrence of that word on p. 956 (a factor in Hill's list, a different sense) is not recorded by the complete-scope terminology check.            |
| C-09  | `FAIL` | H1–H11 and H13 are supported at the recorded grades. The second clause of H12 is not: §4.4 (p. 949) states that the average causal effect `T` is of interest for its own sake; it does not present a single-condition population mean as an object of practical interest (BLOCKER-1).                                                                                                |
| C-10  | `FAIL` | Chronology, source-count discipline, and the interference and version cases stay within the three texts. Matrix row 6 (`PO-03`), Case 4 (`PO-03` leg), and the contrast-constitutive disagreement inherit BLOCKER-1; several `VERIFIED_DIRECT` anchors (p. 466; p. 472 `[40]`; Eq. (16) at p. 469; Eq. (35) at p. 958; strong ignorability at §4.3) are not reproducible as written. |
| C-11  | `FAIL` | Five of the six candidate elements have accurate direct pinpoints in at least two texts with the narrowing notes kept. The comparison-direction element has an accurate direct pinpoint only in `PO-01` as written; its `PO-03` support rests on the overstated §4.4 reading.                                                                                                        |
| C-12  | `PASS` | `NARROW` / `NARROW_AND_CLOSE` is the only proposal; `FND1-H04`, the full Research Gate, `FND1-H05` through `FND1-H08`, and all release gates are stated to remain open; no Protocol, schema, method, implementation, or release decision appears.                                                                                                                                    |

## 4. Findings by severity

### BLOCKER

**BLOCKER-1 — `PO-03` §4.4 is overstated on a load-bearing row.** Row H12
(second clause), matrix row 6 for `PO-03`, falsification Case 4 (`PO-03`
leg), the contrast-constitutive disagreement in §9, and the
comparison-direction element in §11 all rest on the claim that Holland §4.4
(p. 949) treats a single-condition population mean as an object of practical
interest, illustrated by a state-average reading score. The inspected page
does not support this. The first paragraph of §4.4 states that the value of the
average causal effect `T` is of potential interest for its own sake, gives a
state education director choosing the best reading program as the example,
and says the average causal effect of the best program would show up as an
increase in statewide average scores. The object presented as of interest is
`T`, a contrast; the example motivates a population average over a unit-level
effect (the second paragraph continues that theme), not a non-contrastive
target. The grade `VERIFIED_DIRECT` is therefore incorrect for that clause.
Holland's formalism does define per-condition population means: `E(Y_t)` and
`E(Y_c)` on p. 947 (Eq. (4) and the sentence stating that units exposed to `t`
give information about `E(Y_t)` as the mean of `Y_t` over `U`) and in §4.3
(p. 948, the definition of `E(Y_t)` as the average of `Y_t(u)` over `U`; Eqs.
(7)–(8) on pp. 948–949). Those passages define the means as identifiable
ingredients of `T`; none presents a single-condition mean as a target of
interest. Because the frozen result uses the §4.4 reading as the second of the
two independent texts required for the comparison-direction element, the
`NARROW_AND_CLOSE` proposal is not supported on the evidence as written.

### SHOULD_FIX

**SHOULD_FIX-1 — `PO-01` body text anchored to the Figure 1 page.** N1
(body anchor), N2, N3, matrix rows 1–3 for `PO-01`, and §10 overclaim attack 1
cite p. 466 for body text. Printed p. 466 carries only Figure 1 and its
caption, as the frozen result's own page map records. Correct anchors: the
field of `m` equal plots, `U_1, …, U_m`, and the arithmetic mean `a` are on
p. 465 (left column); the doubly indexed sequences `U_i1, …, U_im` for
`i = 1, …, v` and the `v` urns are on p. 465 (right column); Eq. (13),
anchor `[29]`, the per-variety mean `a_i`, and the `v`-urn scheme with the
disappearing-label property are on p. 467.

**SHOULD_FIX-2 — `PO-01` anchor `[40]` and the editorial note placed on
p. 472.** N3, N5, N8, N9, the N9 claim text, §10 misattribution attack, and
matrix row 9 place `[40]`, the choice of the correlation value, and the
bracketed additivity note on p. 472. All three are on p. 471 (right column).
On p. 472, the definition of the true difference follows `[41]` and the
closing fertilizer sentence precedes `[42]`. The substance of N9 (the phrase is
editorial, bracketed, and not authorial; the retained-verbatim count of three
is exact) is confirmed; only the page is wrong, but it is wrong in every place
the note is cited.

**SHOULD_FIX-3 — `PO-01` Eq. (16) page and role.** Eq. (16) is on p. 470, not
p. 469 (N6, Case 4, and the matrix row 8 range). Eq. (16) is the variance
estimate for the arithmetic mean of `κ` observations of one variety; the mean
estimator itself is the linear function with equal weights derived on p. 469
and written with the `X_i` notation on p. 470. Case 4 describes Eq. (16) as
the per-variety mean estimator; that description conflates the estimator and
its variance estimate.

**SHOULD_FIX-4 — `PO-03` equation and section anchors.** H7 cites p. 948 for
Eqs. (7)–(9): only Eq. (7) is on p. 948; Eqs. (8)–(9) are on p. 949. H11 and
matrix row 8 cite p. 948 for Eqs. (10)–(11); both are on p. 949. H13 and Case 3
cite p. 958 for Eq. (35); it is on p. 957. The §9 disagreement on the
covariate condition places the reference to strong ignorability in §4.3
(p. 948); it is in §4.5 (p. 949).

**SHOULD_FIX-5 — Row 9 consistency component unaddressed for `PO-02` and
`PO-03`.** The commissioned matrix row is "interference, consistency, or
treatment-version condition". N9 rules on a consistency condition for `PO-01`;
R14, H8, and the matrix cells for `PO-02` and `PO-03` do not. For `PO-03`, the
complete-scope check must record that the word occurs once, on p. 956, as one
of Hill's factors (generality of an association across populations), which is
not a potential-outcomes condition, and that the observed-response identity
`Y_S = Y_{S(u)}(u)` (pp. 947–948) is defined without being named as an
assumption (absence of term, not of concept). For `PO-02`, the corresponding
ruling over pp. 688–701 must be stated.

### NICE_TO_HAVE

**NICE_TO_HAVE-1 — `PO-01` register accuracy.** PDF p. 9 is a photographic
plate, not a continuation of the Comment; pages 2–9 have no text layer, so
"partial for some interior pages" understates the condition; the printed
translation repeats anchor `[35]` on p. 470.

**NICE_TO_HAVE-2 — `PO-02` source term for the `M`-trial set.** On p. 697
Rubin's own term, in his quotation marks, is "target population". Recording it
would sharpen R15 and §10 attack 2, which correctly state that the general
category "target quantity" does not appear.

**NICE_TO_HAVE-3 — `PO-03` neighbouring terminology.** §6 (pp. 953–954) uses
"multiple versions of the response" for the potential responses, which is not
a treatment-version concept; §4.4 (p. 949) names the constant-effect assumption
"additivity", which is the notion the translators' bracket in `PO-01` points
to. Recording both would strengthen the absence claims and the editorial-note
separation.

**NICE_TO_HAVE-4 — Verbatim audit completeness.** The two-word source compound
"potential yield(s)" from the translators' abstract (p. 465) is used unquoted
in N1 and §4 and is not counted. Counting it leaves `PO-01` at ten words,
still below the budget.

**NICE_TO_HAVE-5 — §2 one-line reason.** The statement that direct pinpointed
claims exist for every element the matrix grades in at least two texts is true
for rows 1–8 only if row 9 is read as satisfied by directly verified absence;
say so.

**NICE_TO_HAVE-6 — Minor locators.** H3's `S(u)` and the `t` / `c` indicator
are introduced in the third paragraph of §3 (p. 946, right column), not the
opening two; §5 begins on p. 949 (H9 gives pp. 950–958); R4's definitional
sentence for `Y` is on p. 689.

## 5. Source-by-source rulings

Ruling vocabulary: `SUPPORTED` (claim and grade reproduce at the recorded
anchor); `SUPPORTED_ANCHOR_DEFECT` (claim and grade reproduce, but at least
one recorded page or element anchor is wrong); `NOT_SUPPORTED_AS_GRADED`.

### 5.1 `PO-01` — N1 through N11

| Row | Ruling                    | Evidence                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| N1  | `SUPPORTED_ANCHOR_DEFECT` | Abstract (p. 465): double-indexed array of unknown potential yields, one index for varieties and one for plots. Body: doubly indexed sequences on p. 465 (right column); Eq. (13) with `[29]` on p. 467. The "p. 466" anchor is the Figure 1 page (SHOULD_FIX-1).                                                                                                                                                                                                                                                         |
| N2  | `SUPPORTED_ANCHOR_DEFECT` | Field divided into `m` equal plots with true yields `U_1, …, U_m`, p. 465 (not p. 466). Finite and closed by construction: the urn holds `m` balls, one per plot (p. 467).                                                                                                                                                                                                                                                                                                                                                |
| N3  | `SUPPORTED_ANCHOR_DEFECT` | `v` urns, one per variety (p. 465, p. 467); a drawn plot label disappears from all other urns (p. 467). Extension to fertilizers: p. 471 (italicized conclusion) and p. 472 (closing sentence before `[42]`, not `[40]`).                                                                                                                                                                                                                                                                                                 |
| N4  | `SUPPORTED`               | `a_i` defined on p. 467 as the arithmetic mean of the `m` numbers in (13); scalar yield on the (variety, plot) pair.                                                                                                                                                                                                                                                                                                                                                                                                      |
| N5  | `SUPPORTED_ANCHOR_DEFECT` | Expected difference of partial averages equals `a_i − a_j` (p. 470); Eq. (17) (p. 471); the true difference `Δ` defined on p. 472 after `[41]` (not `[40]`).                                                                                                                                                                                                                                                                                                                                                              |
| N6  | `SUPPORTED_ANCHOR_DEFECT` | The single-variety mean `a` / `a_i` is a defined finite-population quantity (pp. 465, 467) and the explicit target of estimation in the one-urn analysis (pp. 467–469: the arithmetic mean of `κ` draws is the best linear estimate of `a`); Eq. (16) is its variance estimate and is on p. 470 (SHOULD_FIX-3). On the commission's question: `a_i` is a finite-population quantity that the text treats as a target of estimation, while the text's stated primary interest is the difference (p. 471). The grade holds. |
| N7  | `SUPPORTED`               | Sampling without replacement from the `v`-urn scheme with the cross-urn label constraint, p. 467; dependence of successive draws, pp. 467–468.                                                                                                                                                                                                                                                                                                                                                                            |
| N8  | `SUPPORTED_ANCHOR_DEFECT` | Eq. (17) with the finite-population factor and correlation `r`, p. 471; the choice `r = 1` and the italicized conclusion, p. 471 (not p. 472 `[40]`).                                                                                                                                                                                                                                                                                                                                                                     |
| N9  | `SUPPORTED_ANCHOR_DEFECT` | Full scope pp. 465–472 re-read: no SUTVA, no between-plots no-interference, no treatment-version, and no consistency condition in the authorial text. The additivity phrase occurs once, inside the translators' bracket, on p. 471 (not p. 472). Retained-verbatim count of three is exact.                                                                                                                                                                                                                              |
| N10 | `SUPPORTED`               | No time subscript on `U_ik`, on `a_i`, or on the partial averages anywhere in pp. 465–472; the single harvest is implicit only.                                                                                                                                                                                                                                                                                                                                                                                           |
| N11 | `SUPPORTED`               | `POSSIBLE_PROJECT_CONVENTION` is the correct grade; the general category is not used by that name.                                                                                                                                                                                                                                                                                                                                                                                                                        |

No statement from the accompanying Comment leaks into the reported evidence;
every `PO-01` claim traces to pp. 465–472.

### 5.2 `PO-02` — R1 through R15

| Row | Ruling      | Evidence                                                                                                                                                                                                                                                     |
| --- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| R1  | `SUPPORTED` | Trial defined on p. 689 as a unit with initiation time `t1` and measurement time `t2`, `t1 < t2`.                                                                                                                                                            |
| R2  | `SUPPORTED` | `2N` in-study trials (p. 690, p. 692); `M`-trial population as a simple random sample frame (p. 697); assumed random sampling for generalization (pp. 698–699).                                                                                              |
| R3  | `SUPPORTED` | Assumption (b) on p. 689: a trial cannot be both an `E` trial and a `C` trial; joint initiation is a third treatment.                                                                                                                                        |
| R4  | `SUPPORTED` | `Y` dichotomous or more continuous, with success–failure and reading-test examples (p. 689, opening paragraph, continuing the p. 688 introduction).                                                                                                          |
| R5  | `SUPPORTED` | Assumption (a) on p. 689: an initiation time can be ascertained for each unit; both times enter the definition of the effect.                                                                                                                                |
| R6  | `SUPPORTED` | Three-line definitional block on p. 689: `y(E)`, `y(C)`, and their difference as the causal effect for that trial.                                                                                                                                           |
| R7  | `SUPPORTED` | Average over the `M` trials chosen on p. 690; footnote 6 considers median and midmean and the text keeps the mean for tractability under randomization.                                                                                                      |
| R8  | `SUPPORTED` | Greek lowercase `τ` defined by displayed formula on p. 692 (verified at 230 dpi).                                                                                                                                                                            |
| R9  | `SUPPORTED` | Capital Latin `T` for the `M`-trial mean on p. 697; parenthetical states unbiasedness for `T` and not necessarily for `τ` (verified at 230 dpi).                                                                                                             |
| R10 | `SUPPORTED` | Estimator `ȳ_d` on p. 692; two formal benefits stated on p. 693; unbiasedness over the equally likely allocations pp. 693–694; significance levels pp. 694–695.                                                                                              |
| R11 | `SUPPORTED` | Prior variable `x_j` with the same value under `E` or `C`, p. 696; footnote 8 on p. 696 records the loss of assured unbiasedness when the value could depend on the treatment.                                                                               |
| R12 | `SUPPORTED` | Both assumed-random constructs are introduced by name on p. 698 and applied on pp. 698–699 for generalization and for observational studies.                                                                                                                 |
| R13 | `SUPPORTED` | Every defined summary (per-trial difference, `τ`, `T`, hypothesized average) is a contrast; no single-condition target is defined in pp. 688–701.                                                                                                            |
| R14 | `SUPPORTED` | Full scope re-read: no SUTVA, no between-units no-interference, no treatment-version wording. The p. 690 carryover remark concerns one unit across two trials. Consistency is not ruled on (SHOULD_FIX-5), which does not change this row's stated absences. |
| R15 | `SUPPORTED` | `POSSIBLE_PROJECT_CONVENTION` is correct; the source's own p. 697 term is "target population", not "target quantity" (NICE_TO_HAVE-2).                                                                                                                       |

### 5.3 `PO-03` — H1 through H13

| Row | Ruling                    | Evidence                                                                                                                                                                                                                                                                                                                                                                     |
| --- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| H1  | `SUPPORTED`               | §2, p. 945: population `U` of units `u`; examples include subjects, laboratory equipment, households, plots of land.                                                                                                                                                                                                                                                         |
| H2  | `SUPPORTED`               | §2, p. 945: all probabilities, distributions, and expected values computed over `U`.                                                                                                                                                                                                                                                                                         |
| H3  | `SUPPORTED_ANCHOR_DEFECT` | §3, p. 946: cause and treatment used interchangeably (second paragraph); `t`, `c`, and the indicator `S(u)` (third paragraph, right column), not the opening two paragraphs.                                                                                                                                                                                                 |
| H4  | `SUPPORTED`               | §3, p. 947: Eqs. (1)–(4); the observed response `Y_{S(u)}(u)` is stated at the foot of p. 947 and completed at the head of p. 948.                                                                                                                                                                                                                                           |
| H5  | `SUPPORTED`               | §3, p. 948: the (a)–(b)–(c) distinction; §9, p. 959: first of the two immediate consequences and the warning against confusing `Y_t` or `Y_c` with `Y_S`.                                                                                                                                                                                                                    |
| H6  | `SUPPORTED`               | §3, p. 946: pre-exposure and post-exposure classes; §4.1, p. 948: the two named time-related assumptions (temporal stability; causal transience), paraphrased accurately.                                                                                                                                                                                                    |
| H7  | `SUPPORTED_ANCHOR_DEFECT` | §4.3, p. 948: independence of `S` from `Y_t`, `Y_c`, and all other variables over `U`; Eq. (7) p. 948; Eqs. (8)–(9) p. 949 (SHOULD_FIX-4).                                                                                                                                                                                                                                   |
| H8  | `SUPPORTED`               | Full scope pp. 945–960 re-read: no SUTVA, no stable-unit-treatment-value wording, no between-units no-interference statement, no treatment-version condition. Named neighbouring assumptions (§4.1 temporal stability and causal transience; §4.2 unit homogeneity; §4.3 independence; §4.4 constant effect, also called additivity) are paraphrased at their correct roles. |
| H9  | `SUPPORTED_ANCHOR_DEFECT` | §5 (pp. 949–952), §6 (pp. 953–954), §8 (pp. 955–958) cover philosophy, statisticians, medicine, economics, and social science; §5 begins on p. 949.                                                                                                                                                                                                                          |
| H10 | `SUPPORTED`               | §7, p. 955: an attribute cannot be a cause because potential exposability does not apply; §9, p. 959 restates it.                                                                                                                                                                                                                                                            |
| H11 | `SUPPORTED_ANCHOR_DEFECT` | Eqs. (10)–(11) and the identification of `T` with the association-only quantity under independence are on p. 949 (not p. 948); §4.4, p. 949: constant effect and unit homogeneity.                                                                                                                                                                                           |
| H12 | `NOT_SUPPORTED_AS_GRADED` | First clause supported: §9, p. 959, second idea (two causes define an effect). Second clause not supported: §4.4, p. 949, presents `T` as of interest for its own sake (BLOCKER-1).                                                                                                                                                                                          |
| H13 | `SUPPORTED_ANCHOR_DEFECT` | `POSSIBLE_PROJECT_CONVENTION` is correct; Eq. (35) `T(z)` is on p. 957 (not p. 958).                                                                                                                                                                                                                                                                                         |

The commission's specific attacks: the result does not confuse assignment
independence with between-unit no-interference (it keeps them apart in H7, H8,
Case 5, and §10 attack 3); absence of a later term is not presented as absence
of the concept (§10 interpretation-of-absence attack); chronology is not
backdated.

## 6. Target-element, chronology, falsification, and quote-budget rulings

### 6.1 Target-element matrix

| Element                                   | Ruling                                                                                                                                                                                                                                                                                                  |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Target unit set                        | Supported in all three texts at `DEFINED_DIRECTLY`; `PO-01` anchor should read p. 465 and p. 467.                                                                                                                                                                                                       |
| 2. Condition / exposure                   | Supported in all three; `PO-01` anchor should read pp. 465, 467, 471–472.                                                                                                                                                                                                                               |
| 3. Outcome and scale                      | Supported in all three; `PO-01` anchor should read pp. 465, 467.                                                                                                                                                                                                                                        |
| 4. Time origin / assessment occasion      | Supported: `PO-02` (p. 689) and `PO-03` (pp. 946, 948) at `DEFINED_DIRECTLY`; `PO-01` absence over pp. 465–472 verified; narrowing note kept.                                                                                                                                                           |
| 5. Population-level summary               | Supported in all three; `τ` (p. 692) and `T` (p. 697) correctly kept distinct.                                                                                                                                                                                                                          |
| 6. Comparison direction (when applicable) | `PO-01`: supported (contrast pp. 470–472; non-contrastive `a_i` pp. 465–469). `PO-02`: supported as constitutive. `PO-03`: contrast supported (§9, p. 959); the non-contrastive reading of §4.4 is not supported (BLOCKER-1). The candidate's conditional wording is not shown at two texts as written. |
| 7. Assignment / sampling mechanism        | Supported in all three.                                                                                                                                                                                                                                                                                 |
| 8. Estimator / variance object            | Supported in all three; `PO-01` Eq. (16) is on p. 470; `PO-03` Eqs. (10)–(11) are on p. 949.                                                                                                                                                                                                            |
| 9. Interference / consistency / version   | Interference and treatment-version absences verified in all three at the stated scope, with the editorial note in `PO-01` on p. 471; the consistency component is unaddressed for `PO-02` and `PO-03` (SHOULD_FIX-5).                                                                                   |

### 6.2 Chronology

The chronology table keeps the three roles apart; no Holland label is applied
to Neyman or Rubin; the translators' bracket is attributed to the translators;
ICH vocabulary is correctly stated to post-date all three texts. `PASS`.

### 6.3 Falsification cases

| Case | Ruling                                                                                                                                              |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Supported by `PO-01` (Eq. (17), p. 471).                                                                                                            |
| 2    | Supported: `PO-02` pp. 697–699 (`T` versus `τ`; assumed random sampling); `PO-03` §2, p. 945.                                                       |
| 3    | Supported in substance; Eq. (35) is on p. 957 (SHOULD_FIX-4); the p. 690 footnote 6 anchor is correct.                                              |
| 4    | `PO-01` leg supported (with the Eq. (16) role and page corrected); `PO-03` leg not supported as anchored (BLOCKER-1); `PO-02` leg supported.        |
| 5    | Supported: the joint-assignment rewriting is correctly graded `CROSS_SOURCE_INFERENCE`; no text is credited with a between-units condition.         |
| 6    | Supported: the `PO-02` covariate-invariance condition is kept as adjacent evidence; no upgrade to a direct treatment-version claim.                 |
| 7    | Supported: §4.4, p. 949, is correctly read for the variability remark; the variance of per-unit contrasts is correctly left undecided by the texts. |

Numerical agreement is never used as identity in any case. `PASS` except for
the Case 4 `PO-03` leg.

### 6.4 Material disagreements and synthesis

Time-constitutive-bearer, bearer-abstraction, and covariate-condition
disagreements are preserved and accurate (the strong-ignorability reference
belongs to §4.5). The contrast-constitutive disagreement is preserved in
substance but is mis-anchored for both texts: `PO-01` Eq. (16) is a variance
estimate, and `PO-03` §4.4 does not define the per-condition mean (p. 947 and
§4.3 do). Source count is never treated as a vote.

### 6.5 Quote budget

The frozen result's audit is complete for quoted phrases: the only retained
verbatim source phrase is the two-word editorial phrase from `PO-01`, counted
three times for six words; `PO-02` and `PO-03` retain none. One unquoted
two-word source compound is uncounted (NICE_TO_HAVE-4). Every source remains
below 25 words. `PASS`.

**This report's retained verbatim.** `PO-01`: the two-word compound for the
potential yields, quoted once in §4 (two words). `PO-02`: "target population",
quoted once in §4 and once in §5.2 (four words). `PO-03`: the five-word §6
phrase for the response versions, quoted once in §4, and the one-word §4.4
assumption label, used twice in §4 and §5.3 (seven words). Assumption names
are otherwise recorded as labels, not as prose quotation. Each source is below
25 words.

## 7. Proposed `H04-S1` disposition and governance-boundary assessment

**Disposition.** The proposed `H04-S1: NARROW_AND_CLOSE` is not supported on
the frozen result as written. Five candidate elements (target unit set,
condition, outcome with scale, assessment occasion, population-level summary)
are directly supported in at least two texts with the narrowing notes kept.
The sixth, the conditional comparison direction, is directly supported in
`PO-01` and is claimed for `PO-03` on a reading of §4.4 that the page does not
bear. Whether a corrected `PO-03` anchor (the per-condition means defined on
p. 947 and in §4.3) is enough to hold the element at two texts is a judgment
the repaired result must make explicitly; this review does not make it.

**Governance boundaries.** The frozen result makes no Protocol, schema, method,
implementation, release, or full-gate decision; it keeps `FND1-H04`, the full
FND-1 Research Gate, `FND1-H05` through `FND1-H08`, and all release gates open;
it takes no `H04-S4` evidence; and it introduces no ICH strategy vocabulary.
Those boundaries are respected. This review likewise decides nothing beyond
the eligibility question in commission §4.

## 8. Residuals and exact repair instructions

Repair is required before steward reconciliation. Each item names the exact
change; none expands the source list beyond the three mandatory texts.

1. **BLOCKER-1.** Rewrite H12 to: §9 (p. 959) treats a contrast as
   constitutive of an effect; §4.4 (p. 949) presents the average causal effect
   `T` as of interest for its own sake and contrasts the population average
   with the unit-level effect. Re-anchor any non-contrastive `PO-03` object to
   p. 947 (Eq. (4) and the sentence on information about `E(Y_t)`) and §4.3
   (p. 948 definition of `E(Y_t)`; Eqs. (7)–(8) pp. 948–949), graded as a
   defined population quantity that the text uses as an ingredient of `T`, not
   as a target of practical interest. Propagate the same correction to matrix
   row 6 (`PO-03`), Case 4 (`PO-03` leg), the §9 contrast-constitutive
   disagreement, and §11 element 6. Then restate, with reasons, whether the
   comparison-direction element is held at two texts; if it is not, change the
   `H04-S1` proposal accordingly.
2. **SHOULD_FIX-1.** Replace every "p. 466" body anchor for `PO-01` with
   p. 465 or p. 467 as listed in §4 above.
3. **SHOULD_FIX-2.** Move `[40]`, the choice `r = 1`, and the editorial
   additivity note to p. 471 in N3, N5, N8, N9, §10, and matrix row 9; cite
   p. 472 `[41]` for the true-difference definition and p. 472 (before `[42]`)
   for the fertilizer sentence.
4. **SHOULD_FIX-3.** Cite Eq. (16) at p. 470 and describe it as the variance
   estimate of the single-variety mean; cite the equal-weight linear estimate
   (p. 469) or the `X_i` average (p. 470) as the mean estimator in Case 4.
5. **SHOULD_FIX-4.** Cite Eqs. (8)–(11) at p. 949, Eq. (35) at p. 957, and
   strong ignorability at §4.5, p. 949.
6. **SHOULD_FIX-5.** Add explicit consistency rulings to R14, H8, and matrix
   row 9 for `PO-02` and `PO-03`, recording the p. 956 occurrence in `PO-03`
   and its sense, and the unnamed observed-response identity on pp. 947–948.
7. **NICE_TO_HAVE-1 through -6.** Apply at the author's discretion; none
   changes a grade or the disposition.

After repair, the frozen result must be re-frozen with a new blob and SHA-256
and re-reviewed on that identity; this review's verdict applies only to blob
`510e4fc6ec85f958da9ce9228ce292f411c9983f`.

## 9. Final verdict and handoff statement

**Verdict: `NO_GO`.** One BLOCKER (an overstated, load-bearing `PO-03` claim at
an incorrect evidence grade) and five SHOULD_FIX items (non-reproducible
anchors and an unaddressed row-9 component) are recorded. All twelve closure
rows were tested on the exact artifacts; C-01, C-02, C-03, C-05, C-06, C-07,
and C-12 pass; C-04, C-08, C-09, C-10, and C-11 fail. The verdict is a
statement about the frozen result's readiness for bounded steward
reconciliation only; it is not Protocol adoption, `H04-S1` closure, `FND1-H04`
closure, implementation approval, or release approval, and it does not affect
Release 2, paired-t, or t-family work.

**Handoff.** Returned to the commissioning steward with the repair list in §8.
The steward may commission a bounded repair of the frozen result on the three
mandatory texts; the repaired result requires a fresh close review on its new
identity before reconciliation with the separate `H04-S4` result.

---

NOT READY FOR FND-1 POTENTIAL-OUTCOMES LINEAGE STEWARD RECONCILIATION - NOT PROTOCOL ADOPTION
