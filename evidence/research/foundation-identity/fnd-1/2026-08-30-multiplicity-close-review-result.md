# FND-1 Multiplicity Primary-Text Close-Review Result

**Status: informative close-review result; non-normative; not adopted.**
Role: independent repository close reviewer. This review verifies whether the
completed primary-text closure result satisfies its commission and can be
accepted as source-bounded closure input for `FND1-H01`, `FND1-H02`, and
`FND1-H03`. It reopens no FND-1 hypothesis, case, taxonomy, vocabulary,
representation, Release 2, paired-t, or t-family numerical question.

## Verdict

**GO.**

No `BLOCKER`, `SHOULD_FIX`, or `NICE_TO_HAVE` findings. All twelve closure
checks pass. `GO` means the result is ready for steward Research Gate
disposition of the three multiplicity holds. It is not Protocol adoption and
authorizes none of the work listed in Section 7.

## 1. Review identity

| Item                             | Value                                                                                   |
| -------------------------------- | --------------------------------------------------------------------------------------- |
| Review commit (reviewed state)   | `bf35ef43bff7101616baf72875e62a85f4b8b388`                                              |
| Parent of review commit          | `0f7bd198f705614da03200b33a1e50c7df413444`                                              |
| Review branch                    | `review/fnd-1-multiplicity-close-review-20260831`, created from the review commit       |
| Reviewed artifact                | `2026-08-30-multiplicity-primary-text-closure-result.md` (repaired revision, 381 lines) |
| Recorded commission commit       | `e674bacc90ad127602072432bc730d1b5c05c20a`                                              |
| Environment                      | fresh clone, detached checkout; Node v22.22.2, pnpm 11.7.0, Linux x86_64                |
| Read scope honored               | the two commissions, the closure result, and the reconciled FND-1 result only           |
| Earlier reviews and prior drafts | not opened and not used as evidence, per the commission's independence restriction      |

Reviewed inputs, verified as git objects:

- The closure commission, the close-review commission, and the reconciled
  FND-1 result are blob-identical between the recorded commission commit
  `e674bacc…` and the review commit `bf35ef43…`, so the investigator and this
  review executed the same commissioned text.
- The review commit's full delta is exactly four paths: the replaced closure
  result, the `authority/authority-manifest.yaml` note for that same artifact
  (updated from the source-access-incomplete description to the completed
  `NARROW_AND_CLOSE` description, matching the replaced content), and the two
  regenerated indexes that embed the manifest hash. No other path changed.
- The closure result itself records that the investigator performed no
  repository modification; the recording commit is the steward's, consistent
  with the closure result's own metadata.

## 2. Closure checks C-01 through C-12

| Check | Result | Basis                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ----- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| C-01  | PASS   | Commission commit recorded as the full SHA `e674bacc…` and verified to contain the identical commission bytes; the completed result is contained in `bf35ef43…`; the recording commit's changed-file scope is the result file plus its own manifest note and the two mechanically regenerated indexes; the reconciled-result path in the metadata matches the actual file.                                                                                                                                   |
| C-02  | PASS   | The result attests full inspection of all four originals with a complete source register: titles, authors, journals, stable URL or DOI, source host, access date, PDF page count, printed page range, an arithmetically consistent printed-to-PDF mapping for every paper (cover page plus one-to-one advance), and a SHA-256 of each inspected file. The readiness condition is asserted and nothing in scope contradicts it. Independent re-inspection was not possible from this environment (Section 3). |
| C-03  | PASS   | All 61 atomic-claim rows (13 Holm, 15 Benjamini-Hochberg, 19 Dunnett, 14 Tukey) carry printed-page pinpoints with a theorem, definition, equation, scheme, table, section, or paragraph locator, mechanically verified to lie inside each paper's registered printed range; absence claims are pinned to the full inspected range; Sections 2 and 5 through 9 reuse the same pinpoints.                                                                                                                      |
| C-04  | PASS   | Later work is systematically separated: positive-dependence, arbitrary-dependence, and adaptive false-discovery results, the Studentized-range all-pairs procedure, and the unequal-size extension are marked absent from the originals and assigned to later primary sources; commission-supplied DOIs not printed in the attached copies are flagged as such; the file hashes are scoped as artifact hashes, not publisher identifiers.                                                                    |
| C-05  | PASS   | Holm's procedure (ordering, `α/(n+1-k)` thresholds, stopping), its strong free-combinations family-wise control, and its dependence-free validity are stated as three separated claims; the independence-based product-form variant and the weighted variant are separated from the main theorem.                                                                                                                                                                                                            |
| C-06  | PASS   | Benjamini-Hochberg definitions (`V`, `R`, `Q` with the no-rejection zero convention, false discovery rate as an expectation), the step-up procedure, the theorem with its independence condition and `(m0/m)q*` bound, and the appendix proof assumptions are separated; claims from later work are listed apart.                                                                                                                                                                                            |
| C-07  | PASS   | Dunnett's many-to-one family, joint-confidence guarantee, multivariate-t distribution, common-variance and independent-variance-estimate assumptions, general arbitrary-group-size construction versus equal-size table instruments, two-sided-table conservatism, and one-sided versus two-sided constants are each separated; the family-wise restatement is refused as `NOT_VERIFIABLE` from this source.                                                                                                 |
| C-08  | PASS   | Tukey (1949) is characterized as the three-stage gap, straggler, and upper-tail F procedure with a conjectural composite error rate; the Studentized-range all-pairs method and the unequal-size extension are stated absent, with the Studentized range appearing only as a cited comparator.                                                                                                                                                                                                               |
| C-09  | PASS   | Only the four permitted statuses appear; the atomic ledger uses `VERIFIED_DIRECT` 60 times and `NOT_VERIFIABLE` once; the overclaim table uses `CONTRADICTED` and `NOT_VERIFIABLE`; directly assessable claims are not deflected into `CROSS_SOURCE_INFERENCE`.                                                                                                                                                                                                                                              |
| C-10  | PASS   | Exactly one permitted disposition per hold: `NARROW_AND_CLOSE` for each of `FND1-H01`, `FND1-H02`, and `FND1-H03`, each backed by the cited ledger rows; the `FND1-H03` narrowing retains the all-pairs successor evidence requirement identically in Sections 2, 6, 7, and 9.                                                                                                                                                                                                                               |
| C-11  | PASS   | No method, default, identifier, field, schema, refusal code, public check, API, implementation, or release change is selected; the result's cross-source conditions answer the commissioned identity-boundary questions only; non-adoption is stated in the status line, Section 10, and the final line.                                                                                                                                                                                                     |
| C-12  | PASS   | Attribution is the commissioned role only; no drafting or review software, service, provider, model, or mechanism is recorded or implied; the only named hosts are the papers' source hosts, which the source-access rule requires; no human authorship is claimed.                                                                                                                                                                                                                                          |

## 3. Verification method and recorded access limit

- All identity claims were re-derived from git objects in a fresh clone at the
  review commit, including blob-level identity of the three in-scope inputs
  across the commission and review commits and the exact delta of the
  recording commit.
- Mechanical checks on the closure result: the eleven required section
  headings appear exactly and in order; the final line is exactly the
  commissioned `READY` line and is the last line; the quotation budget holds
  with precisely two quoted spans in the whole document (eight words from
  Holm, four from Benjamini-Hochberg, none from Dunnett or Tukey); all 61
  pinpoint pages fall inside the registered printed ranges; every
  printed-to-PDF mapping is arithmetically consistent with its page count and
  printed range; each hold carries exactly one disposition.
- Consistency with the reconciled FND-1 result: the hold boundaries restated
  in the closure result match Section 9.2 of the reconciled result verbatim in
  substance; the closed claims are exactly the reconciliation's held
  `NOT_VERIFIABLE` original-theorem items; `FND1-H04` through `FND1-H08`
  remain held and receive no findings; the reconciliation's cross-source
  statements about family and criterion boundaries are confirmed, not
  contradicted, by the closure result's primary-text findings.
- **Recorded limit:** the four attached original PDFs are not repository
  contents, and this environment's network egress is restricted to repository
  and package infrastructure, so the original texts could not be opened for
  pinpoint spot checks and the attachment hashes could not be re-derived. Per
  the commission, that limit is recorded here rather than substituted with
  content reconstructed from memory. Within this review, C-02 and C-03
  therefore rest on the result's attestations, its complete and
  arithmetically consistent source register, the mechanical pinpoint
  validation, and full cross-document consistency, all of which pass without
  exception. Re-verification of the attachment bytes remains available to any
  party holding the same files, via the recorded SHA-256 values.
- The prior revision of the closure result and any earlier review material
  were not opened. The repair-only revision character was accepted on the
  current document's own terms: its source register contains exactly the four
  commissioned papers, and its content satisfies every commissioned check in
  its present state, which is what closure requires.

## 4. Repository validation

At the review commit, before the replacement: `pnpm install --frozen-lockfile`
followed by the full repository validation pipeline (Prettier check, Markdown
lint, typecheck, registry, authority, traceability, private-dependency, and
code-path validation, the full test suite of 41 files and 431 tests, and the
generated-file check) completed with exit code 0. After replacing this file,
Prettier and markdownlint pass on the replaced file and the same full pipeline
was rerun green, leaving a clean working tree. The authority manifest carries
no content hash for this informative artifact, so the replacement is
validation-neutral; updating this path's manifest note from its placeholder
wording is a steward step at merge time, consistent with how the recording
commit updated the closure result's own note.

## 5. Findings

None. No `BLOCKER`, no `SHOULD_FIX`, no `NICE_TO_HAVE`.

## 6. Hold dispositions the evidence permits

| Hold       | Permitted disposition | Basis                                                                                                                                                                                                                                                                                  |
| ---------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `FND1-H01` | `NARROW_AND_CLOSE`    | Direct-inspection requirement satisfied for Holm (1979); procedure, strong free-combinations control, and dependence-free validity are pinned; the independence-based product-form and weighted constructions carry their own attached conditions; later formalizations stay separate. |
| `FND1-H02` | `NARROW_AND_CLOSE`    | Direct-inspection requirement satisfied for Benjamini-Hochberg (1995); definitions, step-up procedure, independence-conditioned theorem, and `(m0/m)q*` bound are pinned; positive-dependence, arbitrary-dependence, and adaptive results remain separate primary-source questions.    |
| `FND1-H03` | `NARROW_AND_CLOSE`    | Direct-inspection requirement satisfied for Dunnett (1955) and Tukey (1949); the many-to-one half is sourced; the all-pairs half is not present in these originals and is correctly retained as a separately defined evidence requirement against the later primary sources.           |

`FND1-H04` through `FND1-H08` remain held and are untouched by this review.

## 7. Work that remains unauthorized

This `GO` authorizes only the steward Research Gate disposition of
`FND1-H01` through `FND1-H03` on the closure result's stated boundaries. It
does not authorize: any Protocol field, schema, identifier, vocabulary
registration, refusal code, supported method, method default, public check,
API, implementation, or release change; adoption of any multiplicity
procedure or of the E/P/H/M/D/V decomposition as Protocol surface; closure of
`FND1-H04` through `FND1-H08`; the retained all-pairs successor evidence
requirement; FND-1 Research Gate closure as a whole; and any Release 2 or
excluded-scope decision.

READY FOR FND-1 MULTIPLICITY STEWARD DISPOSITION - NOT PROTOCOL ADOPTION
