# FND-1 Animal-Endpoint Close-Review Result

**Status: informative close-review result; non-normative; not adopted.** This
report reviews only the frozen animal-endpoint source result retained under
`FND1-H04` / `H04-S4`, as assigned by
`2026-09-02-nonclinical-estimand-animal-endpoint-close-review-commission.md`.
It performs no new source pass, adopts no Protocol vocabulary, authorizes no
implementation, closes no hold or Research Gate, and affects no release.

**Repository operation: NOT PERFORMED.** Commission §9 was replaced, at the
commissioning steward's instruction, by an off-repository handoff. No branch,
commit, push, or merge was made or is claimed; the assigned result placeholder
(blob `0215d6acc9e986ea2dea00a57e485144a726f8e1`) is unchanged in the
repository; the formatting, lint, and validation commands of §9.5 were not run
against the repository. Steward intake is pending.

## 1. Identity, input, access, artifact, and independence checks

**Reviewer role and independence.** Independent close reviewer. The reviewer
did not author the frozen result, the earlier access-failure response it
repairs, or the repair instruction, and had not read the animal-endpoint
commission or result before this review. Prior exposure disclosed: the same
review context earlier performed a separate close review of a different FND-1
result under a different commission; none of that material was opened or used
here. No second-brain, project-history, account-memory, or other-session
material was consulted.

**Review execution base.** Commit
`cf796ef25504944835a46666885ba1a7e84bcf70`, the commit containing the
close-review commission (commission blob
`443745dfd726ecc77698e74f236279899d0fbb63`), pinned as a detached checkout
with a clean working tree.

**Fixed repository identity (commission §1).**

| Item Fixed value Observed Check       |                                                                                                                |                                                                                  |        |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------ |
| Result path                           | `evidence/research/foundation-identity/fnd-1/2026-09-02-nonclinical-estimand-animal-endpoint-source-result.md` | Present at every commit below                                                    | `PASS` |
| Result commit                         | `579f3c208e3fdabb84a97401dd2823c1918d67b4`                                                                     | Commit present; parent `9340ab34…`; records the animal-endpoint source result    | `PASS` |
| Intake merge                          | `a0d23552bfab56d8f8dccff53bd10e903ff53d32`                                                                     | Merge commit; parents `ad094314…` and `579f3c20…`                                | `PASS` |
| Ancestry                              | result commit → intake merge → review base                                                                     | `579f3c20…` is an ancestor of `a0d23552…`, which is an ancestor of `cf796ef…`    | `PASS` |
| Result blob                           | `e70e0f1020878fc76757e895fcc85aef63acda4e`                                                                     | Byte-identical at the result commit, intake merge, review base, and working tree | `PASS` |
| Result SHA-256                        | `2e354101fa17d9792dcce13886f455370efe7b7408c99d79d3b3649762642b57`                                             | Recomputed: identical                                                            | `PASS` |
| Result length                         | 321 lines                                                                                                      | 321 lines                                                                        | `PASS` |
| Recorded research disposition         | `NARROW`                                                                                                       | §2, §11, and the final line                                                      | `PASS` |
| Proposed sub-hold disposition         | `H04-S4: NARROW_AND_CLOSE`                                                                                     | §2 and §11                                                                       | `PASS` |
| Result's self-declared execution base | `836cfa0a132b76b008b3444c882fbf96e4cc3bf7`                                                                     | Commit present; ancestor of the result commit                                    | `PASS` |

**Permitted inputs read (commission §2).**

1. The animal-endpoint source commission, blob `e16e0618a7cfa9318eac9ab5610f0fa471bddc74` (verified at the review base).
2. The completion steward disposition, blob `3b100162c64dbb079eb969effd26ceef847fea5c` (verified), used only for the accepted boundary (`H04-S4` not verifiable, remains open: no inspected animal or humane-endpoint source established post-assignment or terminal-event handling outside ICH vocabulary) and the exact residual (residual item 2: a directly inspected non-clinical experimental source on post-assignment condition change or terminal events without assuming ICH strategy vocabulary).
3. The frozen result, blob `e70e0f1020878fc76757e895fcc85aef63acda4e` (verified).
4. This commission and the assigned placeholder.

Repository operating instructions were read solely to govern repository
operations and were not used as source-content evidence.

**Not read.** The potential-outcomes lineage commission and result and their
close review; any later reconciliation or disposition; earlier non-clinical
estimand results or reviews; FND-2 results; unrelated review branches; private
repositories; Release 2, paired-t, and t-family numerical-contract material.
No other review or investigator summary was used as source-content evidence.

**Source access.** Publisher, resolver, archive, and CCAC routes for all three
artifacts were attempted on 2026-09-02 and were refused at the network
boundary (zero bytes retrieved). The commissioning steward then supplied the
three artifacts as files on 2026-09-02 (08:41 UTC). SHA-256 and byte size were
recomputed on the supplied files before any page was opened, and again after
reading; page counts were computed from each file's page tree.

**Artifact identity.**

| Source Expected SHA-256 Recomputed Bytes expected / observed PDF pages expected / observed Check |                                                                    |           |                       |         |        |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ | --------- | --------------------- | ------- | ------ |
| `AE-01`                                                                                          | `6c03d0078f364eb318bd777f58152aa0f5418e26e44dc99f417ae46e9d544408` | identical | 160,465 / 160,465     | 39 / 39 | `PASS` |
| `AE-02r`                                                                                         | `c8715531356ee47aa792cc7caeba4e5db9560b279065d473f201389b3c5963fc` | identical | 1,286,311 / 1,286,311 | 44 / 44 | `PASS` |
| `AE-03`                                                                                          | `7116e1ec237765c152f8b56f84061692f1996e81d9686a0a57f45e722ba76c89` | identical | 1,428,433 / 1,428,433 | 23 / 23 | `PASS` |

All three files are the exact artifacts recorded by the frozen result (its
§1.3 register). No `ARTIFACT_VARIANT` was needed or used. The source-access
gate of commission §3 is passed.

## 2. Source-artifact, edition, replacement, and page-map checks

### 2.1 `AE-01` (OECD guidance, document `ENV/JM/MONO(2000)7`)

- **Identity marks in the artifact.** Page 1: unclassified cover with the document code, OLIS date 20 December 2000, distribution date 21 December 2000, Environment Directorate, Joint Meeting, full title. Page 3: OECD Environmental Health and Safety Publications, Series on Testing and Assessment No. 19, Paris, November 2000. Page 5: copyright OECD 2000. The word 2002 does not occur anywhere in the artifact.
- **DOI/ISBN route.** The file's PDF metadata carries the title, the author OECD, and the DOI `10.1787/9789264078376-en` in its subject field; creation date 2000-12-20 from an Acrobat Distiller 4.0 original, re-saved by a 2025 conversion. The filename carries the ISBN-derived DOI suffix. Reading: the artifact is the 2000 document as distributed under the later DOI/ISBN identity; describing it as OECD 2002 without explanation would misstate its internal dates, while describing it as a 2000 document is accurate. The frozen result records the 2000 marks and the ISBN filename but is silent on the commission's 2002 citation and on the DOI (SHOULD\_FIX-3).
- **Page map.** Printed page equals PDF page; the running header carries the page number from p. 2 onward; the cover is p. 1. Verified on pp. 1, 2, 10, 11, 26, 39. Annex 1 pp. 27–29; Annex 2 p. 30; Annex 3 pp. 31–38; Annex 4 p. 39 (one page).
- **Text layer and image checks.** Full text layer on all 39 pages. Table 1 (p. 26) and Annex 4 (p. 39) were checked against page images: every value and both table notes reproduce; the Annex 4 written-plan instruction and its seven sign classes reproduce.

### 2.2 `AE-02r` (CCAC 2022 guidelines)

- **Identity.** Cover (PDF p. 1) and imprint (PDF p. 2): CCAC guidelines on identification of scientific endpoints, humane intervention points, and cumulative endpoints; date of publication March 2022; ISBN 978-0-919087-95-8; Ottawa. PDF metadata: same title, author Canadian Council on Animal Care, created 2022-03-18.
- **Official status and role.** The Preface (printed p. 1) describes the CCAC as the national peer-review organization setting and overseeing standards for animals in science, states that the document is part of the general guidelines series, that it describes current standards and processes for identifying scientific endpoints, humane intervention points, and cumulative endpoints, that it applies to all animals used for scientific purposes, and that investigators at certified institutions are subject to it. Printed p. 5 states the guidelines have been expanded in light of current evidence. Obligation grading (must / should) is defined on printed pp. 2 and 4. Currency is verified to the artifact's self-description as of March 2022; no external confirmation was possible from this environment, consistent with the frozen result's residual 4.
- **Succession limit.** The artifact contains no occurrence of 1998, no supersession or replacement notice, and no reference to the 1998 title (word-boundary searches: 1998, supersede, superseded, replace all zero). The frozen result records exactly this limit and rests succession on issuing-body identity and role coverage. `AE-01` itself cites the 1998 CCAC title as reference (20) on p. 24 and attributes the Annex 2 question list (p. 30) to it; this same-corpus trace corroborates the 1998 document's endpoint-selection role without inspecting it.
- **Page map.** Printed page equals PDF page minus 5. PDF pp. 1–3 are unnumbered (cover, imprint, acknowledgements); PDF pp. 4–5 carry roman numerals i–ii; printed 1 begins at PDF p. 6. Verified on printed pp. 1, 2, 4, 11, 23, 27, 38, 39.
- **Text layer.** Full text layer on all 44 pages; the Appendix 2 template and glossary reproduce; no image inspection was needed.

### 2.3 `AE-03` (Workman et al. 2010)

- **Identity.** PDF p. 1 masthead: British Journal of Cancer (2010) 102, 1555–1577, DOI `10.1038/sj.bjc.6605642`, open-access marks, received and accepted March 2010; NCRI ad hoc committee authorship. PDF metadata: same title, author, journal reference, created 2010-05-24. Source class: journal-published domain guidelines.
- **Domain boundary.** Printed p. 1556 restricts scope to cancer research and places regulatory toxicology outside the review. Thresholds on p. 1571 are oncology-specific and the article states that each study should be tailored (pp. 1556, 1571).
- **Page map.** Printed page equals 1554 plus PDF page; verified on PDF pp. 1, 2, 9, 13, 15, 16, 17, 23.
- **Text layer and image checks.** Full text layer; Box 5 and the adjacent tumour-burden and clinical-signs passages on p. 1571 were checked against page images at 200 dpi: all eleven Box 5 items, the 20%-at-any-time and 15%-over-72-h weight-loss rule with its reference baselines, the 48-h necrosis clock, the tumour mean-diameter limits, the justification-required exception, and the cohort-vigilance instruction reproduce.
- **Section location.** The Humane Endpoints section begins on printed p. 1569 (PDF p. 15) and continues onto p. 1570. Both source sentences that the frozen result quotes for AC-14 and for attack 5 are on p. 1569; the sentence quoted for AC-15 is on p. 1570.

## 3. Closure matrix

| Check Result Evidence |        |                                                                                                                                                                                                                                                                                                                                                                      |
| --------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| C-01                  | `PASS` | Every fixed identity, ancestry relation, blob, SHA-256, line count, and disposition matches (§1).                                                                                                                                                                                                                                                                    |
| C-02                  | `PASS` | Only the permitted repository inputs and the three exact artifacts were used by this review; the frozen result's §1.2 exclusions and §1.4 prior-exposure disclosure are adequate; its claims are anchored to the three artifacts.                                                                                                                                    |
| C-03                  | `PASS` | Twelve sections in the commissioned order; atomic statuses and matrix grades drawn from the allowed sets; one research disposition (`NARROW`); one sub-hold proposal (`NARROW_AND_CLOSE`); final line exact; all eight cases carry every commissioned column; all ten terms reported.                                                                                |
| C-04                  | `FAIL` | Identity, source range, page map, and text/image checks reproduce. The 2000/2002/DOI relationship is not stated in the result (SHOULD\_FIX-3). The recorded 19-word quotation total reproduces only if two quoted search-hit strings are excluded; the complete count is 25 words, not below the limit (SHOULD\_FIX-2).                                              |
| C-05                  | `PASS` | AC-01 through AC-08 and the `AE-01` matrix and case cells are supported at the recorded grades (§5); the paragraph 54 counting rule is kept as a test-guideline convention; no post-event outcome semantics are created.                                                                                                                                             |
| C-06                  | `PASS` | Identity, March 2022 date, ISBN, extent, page map, obligation grading, and general scope reproduce; official status verified to the artifact's self-description; the replacement rationale is bounded to same body, current standards, and role coverage with the missing supersession notice recorded; 19 quoted words reproduce (21 with two single quoted words). |
| C-07                  | `FAIL` | AC-09 through AC-13 reproduce at the recorded grades and no direct 1998 supersession is claimed. The bearer-7 cell wording for `AE-02r` exceeds Guideline 2's wording (SHOULD\_FIX-4); the grade can stand only with the wording aligned to the source.                                                                                                              |
| C-08                  | `PASS` | Identity, domain boundary, page map, Box 5 image checks, and the 20-word quotation total (24 with the attack-5 phrase; below the limit) reproduce.                                                                                                                                                                                                                   |
| C-09                  | `PASS` | AC-14 through AC-17 are supported in substance at the recorded grades and no guidance is converted into a statistical guarantee; AC-14's page anchor is one page off (SHOULD\_FIX-1) but its named section makes the sentence locatable.                                                                                                                             |
| C-10                  | `FAIL` | AC-18 through AC-21, the terminology search, the eight cases, the preserved disagreement, and the synthesis stay within source support and are reproduced here; one of the 24 matrix cells (bearer 7, `AE-02r`) is worded beyond the artifact (SHOULD\_FIX-4), and one cell note understates `AE-02r` pp. 25–26 (NICE\_TO\_HAVE-2).                                  |
| C-11                  | `PASS` | `AE-01` and `AE-03` inspected completely; a replacement for `AE-02` justified on the source commission's own criterion (same body, same general endpoint-selection role, documented as the nearer source); direct evidence for the endpoint-time-action boundary in three separately issued sources; the terminology disagreement preserved.                         |
| C-12                  | `PASS` | `NARROW` / `NARROW_AND_CLOSE` is the only proposal; `FND1-H04`, `H04-S1`, the full Research Gate, and release gates are stated to remain open; no Protocol, schema, method, implementation, or release decision appears.                                                                                                                                             |

## 4. Findings by severity

### BLOCKER

None. No false or materially overstated source claim, no unlocatable
load-bearing evidence, no incorrect evidence grade on a load-bearing row, no
invalid source identity or replacement relationship, no scope breach, and no
disposition error was found.

### SHOULD\_FIX

**SHOULD\_FIX-1 —** **`AE-03`** **Humane Endpoints anchors are one page off.** AC-14
cites the Humane Endpoints section at p. 1570; attack 5, §5 questions 1 and
5, and the bearer-7 cell for `AE-03` also cite p. 1570. The section heading,
the eleven-word sentence fragment quoted in AC-14, and the four-word precision
phrase quoted in attack 5 are on printed p. 1569 (PDF p. 15); the section
continues onto p. 1570, where the nine-word death-endpoint sentence of AC-15
sits. The substance of AC-14 is confirmed; the anchor must read pp. 1569–1570
with the quoted sentences at p. 1569.

**SHOULD\_FIX-2 —** **`AE-01`** **quotation total is not below the limit on a
complete count.** The result records 19 words for `AE-01`, which reproduces as
the AC-01 quotation (15 words) plus the AC-06 quotation (4 words, counting the
hyphenated term as one). The result also quotes, in quotation marks, the
four-word dental example from Annex 4 (§7) and the two-word infection phrase
from Annex 3 (§9). Counting every quoted verbatim string gives 25 words (26 if
the hyphenated term counts as two), which is not below the 25-word limit of
the source commission §4.6. `AE-02r`: 19 recorded; 21 if the two single quoted
obligation words are counted; below the limit either way. `AE-03`: 20
recorded; 24 with the attack-5 phrase; below the limit either way. Repair:
paraphrase or unquote at least one of the two `AE-01` search-hit strings and
restate the per-source totals under an explicit counting rule.

**SHOULD\_FIX-3 — The 2000/2002/DOI relationship is not stated.** The result
identifies the artifact by its 2000 marks and the ISBN in the filename but
never addresses the commission's OECD (2002) citation or the DOI route. The
artifact carries no 2002 date; its PDF metadata carries the DOI; it is the
2000 document as distributed under the later DOI/ISBN identity (§2.1). The
result must record this relationship and state that the 2002 citation is a
distribution-catalogue date, not an internal date or edition, so that the
identity is bounded as the commission requires.

**SHOULD\_FIX-4 — Bearer-7 cell for** **`AE-02r`** **exceeds the artifact's wording.**
The cell reads that pilot data are expressly not usable as scientific data
(Guideline 2, p. 2), and §2 calls this a pilot-data usability rule. Guideline
2 states that pilot studies must focus on determining welfare-appropriate
endpoints rather than on generating usable scientific data, and Section 2.1.1
(p. 7) lets pilot studies justify chosen scientific endpoints. That is a
purpose rule for pilot studies, not an express prohibition on using pilot
data. `DEFINED_DIRECTLY` can stand only with the cell and §2 reworded to the
source's focus rule; otherwise the cell is `CROSS_SOURCE_INFERENCE`. The cell
is not load-bearing for the closure proposal.

### NICE\_TO\_HAVE

**NICE\_TO\_HAVE-1 —** **`AE-01`** **locators.** Annex 4 is a single page (p. 39);
AC-08, §5 question 9, and cases C6 and C8 cite pp. 38–39, and §7 places the
Annex 4 dental hit at p. 38. Paragraph 46 is on p. 19 (AC-05 and attack 4 cite
pp. 18–19); paragraph 60 is on p. 22 (bearer 6 cites pp. 21–22). Annex 3
(p. 35) carries a second moribund gloss consistent with paragraph 12 and could
be cited with AC-03.

**NICE\_TO\_HAVE-2 —** **`AE-02r`** **details.** PDF pp. 4–5 carry roman numerals, so
the front matter is not wholly unnumbered. The fish example names the tank as
the likely experimental unit (p. 25) and recommends random tank assignments
(p. 26); the bearer-1 cell note that treatment groups are acknowledged without
assignment semantics should cite these passages (the conservative grade may
remain). AC-10's phrase about severity exceeding approval combines p. 4
(expected severity exceeded) with p. 5 and the glossary (approved level); cite
both.

**NICE\_TO\_HAVE-3 —** **`AE-03`** **wording.** The §5 cells for question 2 (protocol
and licence) and question 9 (licensed limits) use a term absent from the
article; the article refers to national legislation (p. 1556) and legal
responsibilities (p. 1557). AC-16's 48-hour clock applies to necrosis
resulting in skin breakdown or exudation, not to ulceration as such. Bearer 1
for `AE-03` has a stronger anchor in Box 3 (p. 1567: one control group
against multiple treated groups) than in Box 5's vehicle-treated controls.

**NICE\_TO\_HAVE-4 — Supplementary search record.** The word mechanism also
occurs twice in `AE-01` (p. 20: an organisational sense and a toxicological
sense) and the phrase statistical analysis once in `AE-01` (p. 4, a series
title); listing them completes the §7 record. `AE-01`'s own citation of the
1998 CCAC title (reference 20, p. 24; Annex 2, p. 30) could be recorded as a
same-corpus trace supporting the replacement's role coverage.

## 5. Source-by-source rulings for AC-01 through AC-21

Ruling vocabulary: `SUPPORTED` (claim and grade reproduce at the recorded
anchor); `SUPPORTED_ANCHOR_DEFECT` (claim and grade reproduce, but a recorded
page or element anchor is wrong or imprecise); `NOT_SUPPORTED_AS_WORDED`.

| Claim Ruling Evidence |                           |                                                                                                                                                                                                                                                                                                                                                                                            |
| --------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `AC-01`               | `SUPPORTED`               | Paragraph 9, p. 10: the humane-endpoint definition reproduces verbatim (15 words).                                                                                                                                                                                                                                                                                                         |
| `AC-02`               | `SUPPORTED`               | Paragraph 10, p. 10: humane killing, temporary termination of exposure, or dose reduction; paragraph 62, p. 22: temporarily stop dosing or reduce dose while the animal stays on test.                                                                                                                                                                                                     |
| `AC-03`               | `SUPPORTED`               | Paragraph 12, pp. 10–11: predictable death, impending death relative to the next planned observation, and moribund as dying or inability to survive even if treated; three distinct definitions.                                                                                                                                                                                           |
| `AC-04`               | `SUPPORTED`               | Paragraph 11, p. 10 (planning-time identification; protocol and SOPs); paragraph 41, p. 17 (increased frequency after onset; timing documented); Annex 3 introduction, p. 31 (dates of initial and subsequent observations; frequency increased).                                                                                                                                          |
| `AC-05`               | `SUPPORTED_ANCHOR_DEFECT` | Paragraph 46 is on p. 19 (treatment if it does not interfere with conduct or objectives; humane killing for severe signs); paragraph 42, p. 18 (potential loss of valuable data weighed); paragraph 19, p. 12 (without compromising scientific objectives). The pp. 18–19 range is imprecise.                                                                                              |
| `AC-06`               | `SUPPORTED`               | Paragraphs 54–55, p. 21: no death endpoint required; humanely killed animals regarded as dosage-dependent deaths; Guidelines 423 and 425 use impending death as the only endpoint. The counting rule is a test-guideline convention and the result presents it as nothing stronger.                                                                                                        |
| `AC-07`               | `SUPPORTED`               | Table 1 note (2), p. 26, verified on the page image: last signs before found dead versus last signs before humane killing.                                                                                                                                                                                                                                                                 |
| `AC-08`               | `SUPPORTED_ANCHOR_DEFECT` | Annex 4, p. 39 (single page; cited as pp. 38–39): written plan with the schedule of future observations and decision endpoints; paragraph 62, p. 22.                                                                                                                                                                                                                                       |
| `AC-09`               | `SUPPORTED`               | Glossary, pp. 38–39 (scientific endpoints; live use complete when reached; humane intervention points as pre-established criteria); Introduction, p. 4 (term used instead of humane endpoints; action not necessarily euthanasia). Both quotations reproduce.                                                                                                                              |
| `AC-10`               | `SUPPORTED`               | Introduction, p. 4: environment change, supportive care, antibiotics, pain relief, temporary or permanent removal, euthanasia when expected severity is exceeded or benefit no longer justifies impact.                                                                                                                                                                                    |
| `AC-11`               | `SUPPORTED`               | Guidelines 1–2, p. 2 (protocol-described, committee-approved before starting; pilot studies when evidence is insufficient; the six-word quotation reproduces); Section 2.1.1, pp. 7–8.                                                                                                                                                                                                     |
| `AC-12`               | `SUPPORTED`               | Introduction, pp. 4–5: unexpected negative outcomes (unrelated illness, life-support systems failure, unexpected adverse effects) may warrant interventions before scientific endpoints are achieved.                                                                                                                                                                                      |
| `AC-13`               | `SUPPORTED`               | Section 2.2.4, p. 11 (discretion to implement earlier scientific endpoints; other changes by amendment); Section 2.2.5, p. 11 (per-animal intervention records; treated animals later reaching the endpoint; outlier data); Section 2.3.1, p. 12.                                                                                                                                          |
| `AC-14`               | `SUPPORTED_ANCHOR_DEFECT` | The eleven-word quotation and the precision statement are in the Humane Endpoints section at p. 1569, not p. 1570 (SHOULD\_FIX-1). Substance and grade confirmed.                                                                                                                                                                                                                          |
| `AC-15`               | `SUPPORTED`               | p. 1570: intentional use of death as an endpoint unacceptable; animals not allowed to become moribund; also the general-recommendations list on p. 1557.                                                                                                                                                                                                                                   |
| `AC-16`               | `SUPPORTED`               | Box 5 and the tumour-burden and clinical-signs passages, p. 1571, verified on page images: weight-loss rule with both baselines, 48-h necrosis clock, mean-diameter limits, justification-required exceptions, immediate humane termination, cohort vigilance.                                                                                                                             |
| `AC-17`               | `SUPPORTED`               | p. 1571, closing sentence of the clinical-signs passage: suffering unjustified by the objective; objective achieved or unrealisable; quality of results compromised.                                                                                                                                                                                                                       |
| `AC-18`               | `SUPPORTED`               | Method reproduced: word-boundary searches over all three complete texts return the reported hits (dental example p. 39, not p. 38; MCAR/MAR/MNAR zero; mechanism biological in `AE-03`; censor once in `AE-02r` p. 27); targeted reading of the definitional, procedural, and record sections finds no existence or missingness definition. `CROSS_SOURCE_INFERENCE` is the correct grade. |
| `AC-19`               | `SUPPORTED`               | Cross-source synthesis of trigger rule, event time, and action correctly graded `CROSS_SOURCE_INFERENCE`.                                                                                                                                                                                                                                                                                  |
| `AC-20`               | `SUPPORTED`               | Per-event-class declaration correctly graded `POSSIBLE_PROJECT_CONVENTION`; no source is credited with it.                                                                                                                                                                                                                                                                                 |
| `AC-21`               | `SUPPORTED`               | CCAC 1998, Morton 2000, and Toth 2000 content graded `NOT_VERIFIABLE`; nothing in the result infers their content.                                                                                                                                                                                                                                                                         |

Every `VERIFIED_DIRECT` row has a printed-page and element anchor in its own
source; AC-14's page is off by one and three `AE-01` anchors are imprecise, as
recorded.

## 6. Bearer-matrix, terminology, falsification, and quote-budget rulings

### 6.1 Bearer and event matrix (24 cells)

| Bearer `AE-01` `AE-02r` `AE-03`  |                                                                                              |                                                                                               |                                                                             |
| -------------------------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| 1. Assigned condition            | Supported (paragraph 54, p. 21; paragraph 62, p. 22).                                        | Grade supported; the note understates pp. 25–26 (experimental unit; random tank assignments). | Grade supported; Box 3, p. 1567 is the stronger anchor.                     |
| 2. Realized trajectory           | Supported (paragraph 41, p. 17; paragraph 62, p. 22).                                        | Supported (pp. 2, 4).                                                                         | Supported (Box 5, p. 1571).                                                 |
| 3. Humane or terminal event      | Supported (pp. 17, 26, 31).                                                                  | Supported (pp. 10–11).                                                                        | Supported (p. 1571).                                                        |
| 4. Outcome-existence status      | Absence supported; counting rule only (paragraph 54).                                        | Absence supported; nearest passage p. 27 defines no existence semantics.                      | Absence supported.                                                          |
| 5. Observation-information state | Supported as inference (p. 26).                                                              | Absence supported.                                                                            | Absence supported.                                                          |
| 6. Analysis-set membership       | Supported as a test-guideline counting rule (paragraph 54, p. 21); paragraph 60 is on p. 22. | Supported as inference (p. 11).                                                               | Supported as inference (p. 1571).                                           |
| 7. Datum relevance               | Supported as inference (paragraph 42, p. 18; paragraph 62, p. 22).                           | Wording exceeds Guideline 2 (SHOULD\_FIX-4); grade defensible only after rewording.           | Supported as inference; the passage is on p. 1569.                          |
| 8. Mechanism assumption          | Absence supported.                                                                           | Supported as inference (p. 27, cited proportional-hazards and censored-data mention).         | Absence supported; p. 1567 urges statistical expertise without a mechanism. |

The eight bearers are kept distinct throughout; monitoring records are never
converted into a statistical value-state taxonomy; no cell is `CONTRADICTED`,
which the artifacts confirm.

### 6.2 Terminology search

Exact case-insensitive word-boundary searches over each complete text
reproduce every reported count: ICH, E9, estimand, treatment policy,
hypothetical, composite, while-on-treatment, principal stratum, and principal
stratification return zero in all three artifacts; intercurrent returns two
hits in `AE-01` (pp. 33, 36), both in the concurrent-infection sense, and zero
elsewhere. The sense classification is correct. `PASS`.

### 6.3 Falsification cases

C1–C7 and the investigator-created C8 carry every commissioned column. C1, C2,
C4, C6, C7, and C8 are supported at their anchors (with the Annex 4 page
nit). C3 correctly uses the glossary (pp. 38–39) and the terminal
tumour-weight passage (p. 1571). C5 correctly declines to attribute an
equipment-failure data state to any source and keeps the constructed
separation at `POSSIBLE_PROJECT_CONVENTION`. C6 is the explicit test that
equal clock times do not establish the same declared rule; numerical
agreement is nowhere used as identity. C8's trajectory predicates (72-h
maintained loss, p. 1571; continuing weight loss, Annex 4, p. 39; sign
duration, paragraph 41, p. 17) reproduce. `PASS`.

### 6.4 Material disagreement and synthesis

The humane-endpoint versus humane-intervention-point divergence is real
(`AE-02r` p. 4 states the substitution; `AE-01` and `AE-03` use humane
endpoint throughout) and is preserved, not harmonised. Agreement across the
three sources is described as evidence-scope convergence and not used as a
vote. `PASS`.

### 6.5 Quote budget

Recorded totals: 19 / 19 / 20. Reproduced: `AE-01` 19 on the ledger
quotations alone, 25 on a complete count of quoted strings (SHOULD\_FIX-2);
`AE-02r` 19, or 21 with two single quoted words; `AE-03` 20, or 24 with the
attack-5 phrase. Two of three sources are below the limit on every counting
rule; `AE-01` is below the limit only under the undisclosed exclusion.

**This report's retained verbatim.** No source prose is quoted in this report;
quoted strings are identified by description and word count only. Per-source
retained verbatim: `AE-01` 0, `AE-02r` 0, `AE-03` 0.

## 7. Proposed `H04-S4` disposition and governance-boundary assessment

**Disposition.** The proposed `H04-S4: NARROW_AND_CLOSE` is supported on the
original commission's exact source and replacement rules. `AE-01` and `AE-03`
were inspected completely; the `AE-02` replacement is justified on the
commission's stated criterion (same issuing body, same general
endpoint-selection role, documented as the nearer source) with the absence of
a supersession notice recorded rather than hidden; the endpoint-time-action
boundary is directly evidenced in three separately issued sources from three
issuing bodies (AC-03 and AC-04; AC-10 and AC-12; AC-16); the terminology
disagreement is preserved; and the narrowing conditions (outcome-existence
semantics and mechanism assumptions effectively absent; target-relative datum
relevance largely inferential; oncology thresholds domain-specific; no ICH
strategy vocabulary) are all kept. The four SHOULD\_FIX items do not change
this assessment; they are documentation and boundary repairs.

**Governance boundaries.** The frozen result makes no Protocol, schema,
method, implementation, release, or full-gate decision; it keeps `FND1-H04`,
`H04-S1`, the full FND-1 Research Gate, and all release gates open; it imports
no ICH strategy name; it chooses no humane-endpoint threshold or euthanasia
rule. Those boundaries are respected. This review likewise decides nothing
beyond the eligibility question in commission §4.

## 8. Residuals and exact repair instructions

Apply before steward reconciliation; none expands the corpus beyond the three
artifacts.

1. **SHOULD\_FIX-1.** In AC-14, attack 5, §5 questions 1 and 5, and the `AE-03` bearer-7 cell, cite the Humane Endpoints section as pp. 1569–1570 with the two quoted sentences at p. 1569; keep AC-15 at p. 1570.
2. **SHOULD\_FIX-2.** Paraphrase or unquote at least one of the two `AE-01` search-hit strings in §7 and §9, state the counting rule (all quoted verbatim strings; hyphenated terms as one word), and restate the three per-source totals so that each is below 25.
3. **SHOULD\_FIX-3.** Add to the `AE-01` register: the artifact bears 2000 marks only; its PDF metadata carries DOI `10.1787/9789264078376-en`; the commission's 2002 citation is the later distribution identity of this same 2000 document; the artifact is not an OECD 2002 edition.
4. **SHOULD\_FIX-4.** Reword the `AE-02r` bearer-7 cell and the §2 phrase to Guideline 2's focus rule (pilot studies determine welfare-appropriate endpoints and are not for generating usable scientific data), citing p. 2 and Section 2.1.1, p. 7; keep or lower the grade accordingly.
5. **NICE\_TO\_HAVE-1 through -4.** Apply at the author's discretion; none changes a grade or the disposition.

Residuals carried unchanged from the frozen result: `FND1-H04` overall remains
governed by the companion `H04-S1` pass and later reconciliation; CCAC 1998,
Morton 2000, and Toth 2000 remain uninspected; the 1998-to-2022 succession
rests on same-body identity and role coverage and, if it ever becomes
load-bearing on its own, needs official CCAC records.

## 9. Final verdict and handoff statement

**Verdict:** **`GO`****.** No BLOCKER. Four SHOULD\_FIX items and four NICE\_TO\_HAVE
items are recorded; none prevents a third party from locating, reproducing, or
correctly bounding a load-bearing claim, so none forces `NO_GO`. All twelve
closure rows were tested on the exact artifacts: C-01, C-02, C-03, C-05, C-06,
C-08, C-09, C-11, and C-12 pass; C-04, C-07, and C-10 fail on the documented
SHOULD\_FIX items. `GO` means only that the frozen result is eligible for later
bounded steward reconciliation of `H04-S4` with the separate `H04-S1` result
once the §8 repairs are applied; it is not Protocol adoption, `H04-S4`
closure, `FND1-H04` closure, implementation approval, or release approval, and
it does not affect Release 2, paired-t, or t-family work.

**Handoff.** Returned to the commissioning steward as an off-repository
report. Repository operation: NOT PERFORMED; steward intake pending. The
steward may place this report into the assigned result path, run the §9.5
formatting, lint, and validation commands, and record the intake commit; the
SHOULD\_FIX repairs may be applied to the frozen result by a bounded steward
correction that records old and new wording without changing any grade except
as stated in item 4.

---

READY FOR FND-1 ANIMAL-ENDPOINT STEWARD RECONCILIATION - NOT PROTOCOL ADOPTION
