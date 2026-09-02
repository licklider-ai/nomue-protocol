# FND-1 Non-Clinical Estimand Primary-Source Completion Close-Review Result

**Status: informative close-review result; non-normative; not adopted.** This
report answers only
[`2026-09-01-nonclinical-estimand-primary-source-completion-close-review-commission.md`](2026-09-01-nonclinical-estimand-primary-source-completion-close-review-commission.md).
It reviews the frozen `FND1-H04` primary-source completion result against the
two directly inspected mandatory source artifacts. It performs no new
source-completion research and records no hold closure, Research Gate
decision, Protocol adoption, vocabulary registration, schema or method
selection, implementation permission, or release change.

## 1. Identity, input, access, and independence checks

### 1.1 Review identity

| Item                  | Value                                                                           |
| --------------------- | ------------------------------------------------------------------------------- |
| Role                  | Independent close reviewer for the `FND1-H04` primary-source completion result  |
| Review date           | 2026-09-02                                                                      |
| Execution-base commit | `16e468223917d641c2c014a59e791fafdbff00e9` (recorded before substantive review) |
| Branch                | Neutral task branch created from the execution base                             |
| Assigned output       | This file only                                                                  |

### 1.2 Fixed-identity verification (commission §1)

All identities were verified directly against repository objects before
substantive review:

- result commit `8854f8f25916459a0bb367508b60597ffc88b581` is an ancestor of
  intake merge `92610983fcf8c77cdd14eeedf6e3351b3379a55f`, which is an
  ancestor of the execution base;
- the result blob `cee91b8080173d3759e267fa8cec5a5b6e5d067f` is byte-identical
  at the result commit, the intake merge, and the execution base;
- the recomputed result SHA-256 equals
  `c6321fd1c6df44339784930575d112e4d915cfa0aa05b79b24699894584d75b3`;
- the result is exactly 399 lines;
- the recorded dispositions are `DEFER` and `FND1-H04: KEEP_OPEN`, and the
  final line matches the commissioned `DEFER` template exactly.

Decision: identity check `PASS`; `INPUT_COMPLETE`.

### 1.3 Permitted inputs (commission §2)

Blob identities verified at the execution base and read in full: the
source-closure commission (`c19bcff2…`), the frozen initial primary-source
result (`6566923b…`, used only as the earlier access and question ledger), the
steward disposition (`7faf5c89…`), the completion commission (`df473458…`),
and the frozen completion result (`cee91b80…`). The commission and its result
placeholder complete the set. No excluded artifact was opened during this
review, and no other review or investigator summary is used as source-content
evidence for any ruling below.

### 1.4 Independence and prior-exposure disclosure

The working context performing this review previously, under separate
steward-assigned tasks in the same commissioning account: produced the frozen
Pass B repository-analysis result; authored the reconciliation close-review
result; and read the reconciliation candidate, the completion result, and
this commission while reviewing their preparation changes. The steward
assigned this review with that history known. The exposure is disclosed, not
concealed: every source ruling below is grounded in the two artifacts
inspected in this review, with page anchors, and every repository ruling in
verified git objects — not in memory of earlier readings. The §2-excluded
artifacts were not reopened.

### 1.5 Source-access record

The review environment's egress policy blocks both mandatory network routes
(documented attempts: `arxiv.org` and `export.arxiv.org` — CONNECT rejected,
policy denial; `nepis.epa.gov` — CONNECT rejected, policy denial; a
server-side fetch of both hosts — egress blocked). The steward therefore
supplied both source artifacts directly into the review environment, and both
were inspected in full. The arXiv record page could not be re-fetched, so
record-page-only metadata (the report number field) is noted in Section 2
rather than independently re-verified; artifact-internal identity fully
verifies both sources.

## 2. Source-artifact and version checks

### 2.1 SRC-05 (mandatory target, inspected in full)

| Item             | Verified value                                                                                                                                                                                             |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Artifact         | Steward-supplied PDF, 302,528 bytes                                                                                                                                                                        |
| SHA-256          | `cc8a8878f767c9793aacd447eff7367eb49e6d86457e02d0f7fdd578cb06a33d`                                                                                                                                         |
| PDF page count   | 13 (from the PDF page tree)                                                                                                                                                                                |
| Internal version | Every page carries the arXiv stamp `arXiv:1001.2697v1 [stat.ME] 15 Jan 2010` (p. 1)                                                                                                                        |
| Journal identity | p. 1 header: _Statistical Science_ 2009, Vol. 24, No. 2, 211–222; DOI `10.1214/09-STS293`                                                                                                                  |
| Title/authors    | p. 1: the commissioned title; Kurland, Johnson, Egleston, Diehr                                                                                                                                            |
| Terminal text    | References end with Ye, Lin and Taylor (2008), _Biometrics_ 64, on p. 13                                                                                                                                   |
| Variant boundary | The artifact is the arXiv v1 preprint; its pagination (1–13) differs from the print pagination (211–222), and the frozen result never treats the two as byte-identical (`ARTIFACT_VARIANT` recorded there) |

The report number `IMS-STS-STS293` appears only on the arXiv record page,
which this review could not re-fetch; that single field remains as recorded
by the frozen result and carries no load-bearing claim. The result's
outstanding residual "preprint PDF page count not established" is resolved by
this review: 13 pages.

### 2.2 SRC-06 (mandatory target, inspected in full as a rendition variant)

| Item             | Verified value                                                                                                                                                                                                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Artifact         | Steward-supplied PDF rendition of NEPIS dockey `P1010E75`, 338,805 bytes; NEPIS file marker `085CMB04.PDF 1/8/04` on the title page                                                                                                                                                   |
| SHA-256          | `24ac1815879205e35dc6a38b3d3060825171fa3865c1bc39761010fbc63d7958`                                                                                                                                                                                                                    |
| Extent           | 39 PDF pages: cover and front matter plus internally numbered pages 1–34                                                                                                                                                                                                              |
| Title block      | PDF p. 2: the commissioned title; "Journal Article Published May 2001"; "Clearance Number 01-062"; Anita Singh, Lockheed-Martin Environmental Systems & Technologies Company; John Nocerino, U.S. EPA National Exposure Research Laboratory                                           |
| Issuing offices  | U.S. EPA Office of Research and Development and NERL named in the front matter                                                                                                                                                                                                        |
| Form             | Self-described "Journal Article" with no journal named on the artifact; the result's "formal government technical report" classification correctly preserves this ambiguity                                                                                                           |
| Internal pages   | Numbered 1–34; table of contents lists "References … 33"; the References section heads internal p. 33 and ends on internal p. 34                                                                                                                                                      |
| Terminal text    | References end with the RCRA ground-water guidance entry (U.S. EPA, 1992) on internal p. 34                                                                                                                                                                                           |
| Rendition ruling | This PDF rendition is the complete document. The mandatory TXT route remained network-blocked, so the frozen result's TXT-specific descriptions (unpaginated conversion; served range) could not be byte-re-verified; they are assessed against the complete document content instead |

Determination per commission §3.2: the inspected rendition supports
"complete text" for this PDF artifact. The frozen result's "substantial body,
not verified complete-text" boundary for its TXT rendition was honest; its
one extent misstatement is Finding 2.

Access gate: both mandatory targets inspected in full enough to test every
load-bearing claim → the §3.3 failure rule does not apply and a verdict is
issued.

## 3. Closure matrix (C-01 through C-12)

| Check | Result        | Evidence                                                                                                                                                                                                                                                                              |
| ----- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| C-01  | PASS          | Section 1.2: every fixed commit, ancestry, path, blob, SHA-256, line count, disposition, and final line matches repository objects exactly                                                                                                                                            |
| C-02  | PASS          | Sections 1.3–1.5: only permitted repository inputs and the two bounded source targets were used; exclusions honored; prior exposure disclosed; the frozen result's own §1 exposure disclosure is adequate                                                                             |
| C-03  | PASS          | Twelve sections in commissioned order; only commissioned statuses used; exactly one research disposition (`DEFER`), one hold disposition (`KEEP_OPEN`), and the exact commissioned final line                                                                                         |
| C-04  | PASS          | Section 2.1: artifact identity, v1 version stamp, variant boundary, and page count verified; every SRC-05 pinpoint used by the result is locatable (Section 5); the page-count residual is resolved, not contradicted                                                                 |
| C-05  | PASS          | Section 5: D1, D7, D8, D12, and `H04-S2: Met` all verify against the full v1 text at the recorded grades                                                                                                                                                                              |
| C-06  | FAIL (scoped) | Section 2.2: identity, internal markers, and the substantial-body boundary verify, but the extent line "references end p. 33 / numbering ends at 33" does not reproduce — references begin at internal p. 33 and end at internal p. 34 (Finding 2)                                    |
| C-07  | PASS          | Section 5: D2 and D9–D11, and `H04-S3: Met with recorded caveat`, verify against the document at the recorded grades, with internal-page anchors now available                                                                                                                        |
| C-08  | PASS          | `H04-S1` remains correctly limited to partially met: SRC-06 defines no condition/exposure element (verified — no contrast exists anywhere in the document), and only SRC-05 carries all required elements; the uninspected potential-outcomes lineage remains material to `KEEP_OPEN` |
| C-09  | PASS          | `H04-S2` rests on SRC-05's complete argument (abstract p. 1; §3.1 p. 3; Table 2 p. 4; §4); the Zhang–Rubin abstract remains corroboration-only and carries no closure rationale                                                                                                       |
| C-10  | PASS          | `H04-S3` rests on SRC-06's direct definitions and prohibition (Section 5, D9–D10); the rendition caveats are preserved and were rendition-specific, not content defects                                                                                                               |
| C-11  | FAIL (scoped) | Quotation budget, atomic statuses, falsification cases, and the residual list verify, but the D14 search record is incompletely bounded: four listed terms occur in the inspected texts in non-ICH senses and are unreported (Finding 1)                                              |
| C-12  | PASS          | `DEFER / KEEP_OPEN` is the only disposition recorded; no Protocol, schema, method, identifier, implementation, release, or excluded-scope decision appears anywhere in the result                                                                                                     |

## 4. Findings by severity

### BLOCKER

None. No false or materially overstated source claim, unlocatable
load-bearing evidence, incorrect evidence grade, invalid source identity,
overclosure, scope breach, or disposition error was found.

### SHOULD_FIX

1. **D14 search record is incomplete as written (C-11).** The result lists
   raw search terms and reports only a strategy-name absence, without
   recording that four listed terms do occur in the inspected texts:
   in SRC-05 v1, `estimand` appears 8 times as a general statistical term
   (e.g., "regression model estimands" p. 2; "conditional estimand" p. 11),
   `hypothetical` 15 times as an ordinary adjective (hypothetical data and
   participants), `composite` once ("composite response", p. 11), and
   principal stratification is a named model class (Table 2 p. 4; §4.2.2
   p. 8) in its causal-literature sense; in SRC-06, `hypothetical` occurs
   once ("hypothetical normal quantiles", PDF p. 14). The qualified claim
   itself survives: both texts predate ICH E9(R1) (2019) and contain no
   ICH-strategy-name usage, and word-boundary searches for `ICH`, `E9`,
   `intercurrent`, `treatment policy`, and `while-on-treatment` return zero
   in both texts. But a third party re-running the recorded searches obtains
   nonzero hits the record neither reports nor classifies, and SRC-05's
   native use of `estimand` and potential-outcome notation
   (f(Yi(z) | Si(0) > s, Si(1) > s), Table 2 p. 4) is evidence-relevant
   information the result omits. The omission understates favorable
   evidence; it overstates nothing.
2. **SRC-06 extent misstatement (C-06).** The result records "internal page
   numbering ends at 33 (references)" and "references end p. 33". On the
   complete document, the table of contents places References at internal
   p. 33, where the section begins; it ends on internal p. 34, and internal
   numbering ends at 34. Either the TXT rendition served to the investigator
   truncated before internal p. 34, or the boundary was misread; the
   result's own "substantial body, not verified complete-text" caveat and
   its "approximately 34 pages" estimate already anticipated this. No
   load-bearing claim cites internal p. 34 (references only).

Neither SHOULD_FIX prevents a third party from locating or reproducing a
load-bearing source check: every load-bearing check is reproduced in this
report with page anchors. Under commission §7 they therefore do not yield
`NO_GO`, and they must be addressed in or before the steward disposition
(Section 7 gives the exact repairs).

### NICE_TO_HAVE

1. D11's clause that substitution bias "leaves the target quantity
   unchanged" is an accurate interpretive frame (all compared procedures
   estimate the same population mean and standard deviation of one censored
   distribution) rather than a sentence of the source; a wording note would
   make the inference explicit.
2. The result's residual list can strike item 4: the SRC-05 preprint page
   count is now established (13 pages).

## 5. Claim-by-claim source ruling

| Claim    | Ruling               | Basis on the inspected artifacts                                                                                                                                                                                                                                                                                                                                                                                                                           |
| -------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1       | UPHELD               | SRC-05 p. 1 (abstract) and p. 3 (§3.1) define the cohort, the 3MSE outcome with scale 0–100, occasions indexed by age, years from baseline, and years from death, survivor averages, and group differences; Table 2 (p. 4) fixes the factorizations. The "condition" element is a cohort/group index (gender z) and survival stratum, not an assigned exposure — consistent with the result's own bearer table, which claims no new support for assignment |
| D2       | UPHELD               | SRC-06 abstract (PDF p. 4) and introduction (PDF p. 6, internal pp. 1–2): the target is the population mean, standard deviation, and distributional parameters of one left-censored trace-level distribution; no condition or exposure contrast exists anywhere in the document                                                                                                                                                                            |
| D7       | UPHELD               | SRC-05 p. 1: unconditional models "may implicitly impute data beyond the time of death"; p. 3 (§3.1): data were not considered missing when follow-up was truncated by death; Table 2 p. 4                                                                                                                                                                                                                                                                 |
| D8       | UPHELD               | SRC-05 pp. 2–3: nonresponse among the living is defined, MAR-addressable, and modeled — distinct from truncation                                                                                                                                                                                                                                                                                                                                           |
| D9       | UPHELD               | SRC-06 PDF p. 6 (internal p. 1): non-detects "cannot be ignored or deleted"; values reported as below the known limit L (abstract, PDF p. 4) — the bound and inequality fact are retained                                                                                                                                                                                                                                                                  |
| D10      | UPHELD               | SRC-06 PDF p. 6 (internal pp. 1–2): Type I censoring fixes the censoring point with variable count; Type II fixes the count with variable point — exactly as reported                                                                                                                                                                                                                                                                                      |
| D11      | UPHELD               | SRC-06 PDF p. 7 (substitution by 0, L/2, or L; bias findings) and PDF p. 37 (internal p. 32, conclusions): stay away from substitution methods; the shared estimation objective supports the procedure-versus-target framing (NICE_TO_HAVE 1)                                                                                                                                                                                                              |
| D12      | UPHELD               | SRC-05 p. 1 and Table 2 (p. 4): unconditional, fully conditional (pattern-mixture, principal stratification, terminal decline), partly conditional, and joint factorizations name different target quantities; §§4.1–4.4 (pp. 5–9) develop each                                                                                                                                                                                                            |
| D14(a)   | NARROWED (Finding 1) | The strategy-name absence over the complete v1 text verifies; the search record must additionally report the per-term hits and their non-ICH senses (Section 4)                                                                                                                                                                                                                                                                                            |
| D14(b)   | UPHELD, strengthened | On the complete PDF rendition, word-boundary hits for `ICH`, `E9`, `intercurrent`, `estimand`, and every strategy name are zero; `hypothetical` occurs once in a probability-plot sense. The result's inspected-range-limited `CROSS_SOURCE_INFERENCE` grade was appropriately conservative                                                                                                                                                                |
| `H04-S1` | UPHELD as stated     | Partially met. SRC-05 alone carries all required elements; SRC-06 supports only the no-contrast and single-distribution points. SRC-05's native `estimand` usage and potential-outcome notation strengthen the narrow direct evidence but do not supply the second full-element formal text; the canonical lineage remains uninspected and material                                                                                                        |
| `H04-S2` | UPHELD               | Met on SRC-05's complete direct argument; no abstract or secondary source carries the rationale                                                                                                                                                                                                                                                                                                                                                            |
| `H04-S3` | UPHELD               | Met, with the rendition caveats preserved; the distinction from ordinary missingness is direct (definitions plus the deletion prohibition), and internal-page anchors now exist on the PDF rendition                                                                                                                                                                                                                                                       |
| `H04-S4` | UPHELD               | `NOT_VERIFIABLE` stands; nothing in the result silently uses it, and falsification case F5 remains unresolved as recorded                                                                                                                                                                                                                                                                                                                                  |

## 6. Disposition and governance-boundary assessment

`DEFER / KEEP_OPEN` is the only disposition in the frozen result and is the
correct one on its own closure rules: `H04-S1`'s two-formal-text condition is
unmet, so `CLOSE` and `NARROW_AND_CLOSE` are unavailable. The result adopts
no vocabulary, field, schema, identifier, method, reason code, check, API,
implementation, or release change; keeps `FND1-H05` through `FND1-H08` and
the full Research Gate untouched; and stays out of Release 2, paired-t, and
t-family scope. The closure-bearing evidence rests entirely on the two
directly inspected texts; abstracts and secondaries remain discovery-tier
throughout.

## 7. Residuals and exact repair instructions

Repairs required by Section 4, addressable either as a bounded record repair
of the frozen result or as corrections recorded in the steward disposition
citing this review:

1. Re-scope the D14 record to state, per listed search term and per source,
   the word-boundary hit count and sense classification reported in
   Section 4, keeping the strategy-name absence conclusion unchanged.
2. Correct the SRC-06 extent record: internal numbering ends at 34;
   References begin at internal p. 33 and end at internal p. 34; if the TXT
   rendition genuinely ended at internal p. 33, record that truncation
   boundary explicitly instead.

Residuals after this review: the `H04-S1` potential-outcomes lineage gap
(Neyman 1923/1990; Rubin 1974; Holland 1986) and the `H04-S4`
animal/humane-endpoint gap stand unchanged and remain material to
`KEEP_OPEN`; the LEAD-06/LEAD-07 originals remain uninspected behind SRC-06;
the SRC-05 record-page metadata (report number) was not independently
re-fetched here; residual item 4 of the frozen result (preprint page count)
is resolved at 13 pages. The result's acquisition list remains sufficient
and honest.

## 8. Final verdict and handoff statement

**Verdict: `GO`.** The fixed identities are exact; both mandatory source
artifacts were directly and completely inspected; every load-bearing source
claim and both `Met` requirement rows verify at their recorded evidence
grades; `H04-S1` stays correctly partial; the dispositions and governance
boundaries are correct. The two SHOULD_FIX findings are documentation-level,
change no direction, and are fully reproduced and corrected in this report;
under commission §7 neither yields `NO_GO`, and both must be addressed in or
before the steward disposition per Section 7. `GO` does not mean Protocol
adoption, hold closure, implementation approval, or release approval;
`FND1-H04` remains open.

READY FOR FND-1 NON-CLINICAL ESTIMAND COMPLETION STEWARD DISPOSITION - NOT PROTOCOL ADOPTION
