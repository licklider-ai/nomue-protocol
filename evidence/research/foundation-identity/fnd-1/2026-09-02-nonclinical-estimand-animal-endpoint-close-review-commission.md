# FND-1 Animal-Endpoint Close-Review Commission

**Status: informative close-review commission; non-normative; not adopted.**
This commission reviews only the completed animal-endpoint source result
retained under `FND1-H04` / `H04-S4`. It does not perform a new source pass,
adopt Protocol vocabulary, authorize implementation, close `FND1-H04` or the
full FND-1 Research Gate, or affect a release.

## 1. Fixed identity

The review target is fixed as follows:

| Item                          | Fixed value                                                                                                    |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Result path                   | `evidence/research/foundation-identity/fnd-1/2026-09-02-nonclinical-estimand-animal-endpoint-source-result.md` |
| Result commit                 | `579f3c208e3fdabb84a97401dd2823c1918d67b4`                                                                     |
| Intake merge                  | `a0d23552bfab56d8f8dccff53bd10e903ff53d32`                                                                     |
| Result blob                   | `e70e0f1020878fc76757e895fcc85aef63acda4e`                                                                     |
| Result SHA-256                | `2e354101fa17d9792dcce13886f455370efe7b7408c99d79d3b3649762642b57`                                             |
| Result length                 | 321 lines after repository formatting                                                                          |
| Recorded research disposition | `NARROW`                                                                                                       |
| Proposed sub-hold disposition | `H04-S4: NARROW_AND_CLOSE`                                                                                     |

Before substantive review, independently verify every commit, ancestry, path,
blob, SHA-256, line count, and disposition above. Confirm that the result blob
is byte-identical at the result commit, intake merge, review execution base,
and current review branch. If any identity fails, report `INPUT_INCOMPLETE`
and stop.

The frozen result is identified as a source-supplied repair of an earlier
access-failure response. That superseded response and its repair instruction
are not repository inputs to this review. Do not reconstruct them or claim to
verify that repair history. Review only the frozen result identified above.

## 2. Permitted repository inputs and exclusions

Read only these repository documents, plus this commission and its assigned
result placeholder:

1. the original
   [animal-endpoint source commission](2026-09-02-nonclinical-estimand-animal-endpoint-source-commission.md),
   blob `e16e0618a7cfa9318eac9ab5610f0fa471bddc74`;
2. the bounded
   [completion steward disposition](2026-09-02-nonclinical-estimand-completion-steward-disposition.md),
   blob `3b100162c64dbb079eb969effd26ceef847fea5c`, used only for
   the accepted boundary and exact residual; and
3. the frozen
   [animal-endpoint source result](2026-09-02-nonclinical-estimand-animal-endpoint-source-result.md),
   blob `e70e0f1020878fc76757e895fcc85aef63acda4e`.

Do not read the potential-outcomes lineage commission or result, its close
review, any later reconciliation or disposition, earlier non-clinical estimand
results or reviews, FND-2 results, unrelated review branches, private
repositories, or Release 2, paired-t, and t-family numerical-contract
material. Do not use another review or another investigator's summary as
source-content evidence.

This is a close-only review. Do not expand the animal-source corpus to make a
new case for or against the candidate. A source outside the three mandatory
artifacts below may be opened only to resolve the bibliographic identity,
edition relationship, or official replacement status of a mandatory artifact.

The reviewer must be independent of the source pass that produced the frozen
result. Disclose prior exposure. Prior authorship of the frozen result is an
independence failure for this commission.

## 3. Mandatory source-access gate

The review verifies source content rather than merely repository bookkeeping.
Directly inspect the exact three artifacts recorded by the result.

### 3.1 AE-01 — OECD guidance

- _Guidance Document on the Recognition, Assessment, and Use of Clinical
  Signs as Humane Endpoints for Experimental Animals Used in Safety
  Evaluation_;
- result-recorded artifact identity: document code `ENV/JM/MONO(2000)7`, OLIS
  distribution 20/21 December 2000, and OECD Series on Testing and Assessment
  No. 19;
- commission-recorded bibliographic lead: OECD (2002), DOI
  `10.1787/9789264078376-en`;
- expected artifact SHA-256
  `6c03d0078f364eb318bd777f58152aa0f5418e26e44dc99f417ae46e9d544408`;
- expected byte size `160,465` and PDF page count `39`; and
- expected map: PDF pages 1–39 carry matching header page numbers.

Treat the 2000 document marks, the commission's 2002 citation, and the later
DOI/ISBN distribution identity as a relationship to verify, not as equivalent
dates or editions by assumption.

### 3.2 AE-02r — CCAC 2022 replacement

- Canadian Council on Animal Care, _CCAC Guidelines: Identification of
  Scientific Endpoints, Humane Intervention Points, and Cumulative Endpoints_;
- March 2022; ISBN `978-0-919087-95-8`;
- expected artifact SHA-256
  `c8715531356ee47aa792cc7caeba4e5db9560b279065d473f201389b3c5963fc`;
- expected byte size `1,286,311` and PDF page count `44`; and
- expected map: printed page = PDF page minus 5 after five unnumbered front
  pages.

The original commission named a CCAC 1998 source. The frozen result uses the
2022 document as a nearer official replacement and expressly records that the
artifact does not name the 1998 title or contain an internal supersession
notice. Independently verify the same-body identity, role coverage, current
official status, and the exact limit of any succession claim.

### 3.3 AE-03 — Workman et al. 2010

- Workman et al. (2010), “Guidelines for the Welfare and Use of Animals in
  Cancer Research,” _British Journal of Cancer_ 102(11), pp. 1555–1577;
- DOI `10.1038/sj.bjc.6605642`; PMCID `PMC2883160`;
- expected artifact SHA-256
  `7116e1ec237765c152f8b56f84061692f1996e81d9686a0a57f45e722ba76c89`;
- expected byte size `1,428,433` and PDF page count `23`; and
- expected map: printed page = 1554 + PDF page.

For each artifact, recompute SHA-256 and byte size before reading. Record PDF
page count, printed-page map, access date, text-layer condition, and every
image inspection needed for tables, box criteria, figures, or footnotes. An
authenticated artifact with different bytes is `ARTIFACT_VARIANT`; it may help
resolve identity but cannot verify the frozen result's exact artifact, byte
count, or page map.

### 3.4 Failure rule

Search results, snippets, abstracts, catalog records, prior reports, and memory
cannot replace a mandatory artifact. If any exact artifact cannot be inspected
completely enough to test its load-bearing claims, return only:

1. the completed repository identity check;
2. the artifact hashes available and the access attempts;
3. `SOURCE_ACCESS_INCOMPLETE`; and
4. the exact missing artifact needed for rerun.

In that case, do not issue `GO` or `NO_GO`, do not modify the repository, and
do not infer the inaccessible text.

## 4. Review question

Determine whether the frozen result is accurate, reproducible, properly
bounded, and eligible for later steward reconciliation of `H04-S4` with the
separate `H04-S1` result.

The review does not decide whether the candidate structure becomes Protocol
meaning. It does not close `H04-S4` itself. It checks whether the proposed
`NARROW_AND_CLOSE` disposition is supported on the original commission's exact
source and replacement rules and whether all narrowing conditions are
preserved.

## 5. Required adversarial source checks

### 5.1 AE-01 identity, timing, and actions

Verify and try to falsify:

1. the complete title, issuing body, document code, distribution date, series
   number, DOI/ISBN route, edition or rendition relationship, and page map;
2. whether describing this exact artifact as OECD 2002, as a 2000 document, or
   as both without explanation would misstate its identity;
3. `AC-01` through `AC-08`, including the paragraph numbers, distinct
   definitions of humane endpoint, impending death, and moribund state;
4. the action ladder of treatment, temporary exposure termination, dose
   reduction, killing, and remaining on test;
5. planning-time rules, increased observation frequency, sign-onset timing,
   found-dead versus humanely-killed record provenance, and Annex 4 escalation
   plans;
6. whether counting a humanely killed animal as a dosage-dependent death is an
   analysis-set rule, a test-guideline convention, or something stronger; and
7. whether any source statement defines a hidden, missing, prevented, or
   nonexistent post-event outcome.

### 5.2 AE-02r replacement identity and claims

Verify and try to falsify:

1. the complete artifact identity, issuing body, date, ISBN, extent, page map,
   obligation grading, and general scope;
2. whether the artifact is current official CCAC guidance and covers the
   endpoint-selection role needed by the commission;
3. whether the evidence justifies “controlling official replacement,” only
   “nearer same-body official source,” or neither;
4. whether absence of an internal supersession notice is recorded accurately
   and makes any part of the proposed closure unsupported;
5. `AC-09` through `AC-13`, including the distinction among scientific
   endpoint, humane intervention point, cumulative endpoint, and unexpected
   negative outcome;
6. the graded intervention ladder, preapproval, amendment, pilot-study,
   per-animal record, later-endpoint, and outlier-data claims; and
7. whether the claimed direct datum-relevance and analysis-membership support
   exceeds the artifact's actual wording.

### 5.3 AE-03 domain boundary and claims

Verify and try to falsify:

1. the article identity, page map, source class, and image checks for Box 5 and
   other degraded regions;
2. `AC-14` through `AC-17`, including the welfare-versus-valid-outcome
   boundary, death-endpoint statement, quantified triggers, exceptions,
   vigilance escalation, and termination grounds;
3. every threshold, clock, reference baseline, and exception attributed to
   printed p. 1571;
4. whether a qualitative statement that early endpoints may increase
   precision is incorrectly upgraded to a statistical guarantee; and
5. whether oncology-specific thresholds are kept domain-specific rather than
   presented as general animal-study vocabulary.

### 5.4 Cross-source, absence, and disposition attacks

Check:

1. every `VERIFIED_DIRECT` row has a reproducible printed-page and element
   anchor in its own source;
2. `AC-18` follows the reported full-range extraction, targeted reading, image
   checks, and supplementary search method and is correctly graded
   `CROSS_SOURCE_INFERENCE`, not direct absence evidence;
3. `AC-19` and `AC-20` remain cross-source inference and possible project
   convention respectively;
4. all 24 bearer-matrix cells use one allowed grade and do not convert
   monitoring records into a statistical value-state taxonomy;
5. assigned condition, realized trajectory, event-with-time, outcome
   existence, observation state, analysis-set membership, datum relevance,
   and mechanism assumption remain distinct;
6. the seven required cases plus the investigator-created trajectory/event
   collapse attack contain every commissioned field and never infer identity
   from numerical agreement;
7. all ten required terminology searches are reproduced by exact
   word-boundary searches in each complete artifact, with both `intercurrent`
   hits classified by sense;
8. quotation totals of 19 words for `AE-01`, 19 for `AE-02r`, and 20 for
   `AE-03` are reproducible and remain below the per-source limit;
9. source agreement is not treated as a vote, and the `humane endpoint` versus
   `humane intervention point` disagreement is preserved;
10. uninspected CCAC 1998, Morton 2000, and Toth 2000 content is never inferred;
11. the exact residual list does not undermine the bounded
    `NARROW_AND_CLOSE` proposal; and
12. the report makes no Protocol, schema, method, implementation, release, or
    full-gate decision.

## 6. Closure matrix

Record `PASS` or `FAIL` with concise evidence for every row:

| Check | Requirement                                                                                                                                                                             |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| C-01  | All fixed repository identities, ancestry, blob, SHA-256, line count, and dispositions match.                                                                                           |
| C-02  | Only permitted repository inputs and the three exact source artifacts were used; independence and exclusions are adequate.                                                              |
| C-03  | The result preserves the commissioned twelve-section structure, allowed status vocabularies, one research disposition, one sub-hold proposal, and exact final line.                     |
| C-04  | `AE-01` identity, 2000/2002 relationship, source range, page map, text/image checks, and quote count are reproducible and accurately bounded.                                           |
| C-05  | `AE-01` supports `AC-01` through `AC-08` and its bearer/case cells at the recorded grades without creating post-event outcome semantics.                                                |
| C-06  | `AE-02r` identity, official status, source-role replacement rationale, page map, text/image checks, and quote count are reproducible and accurately bounded.                            |
| C-07  | `AE-02r` supports `AC-09` through `AC-13` and its bearer/case cells at the recorded grades without silently claiming direct 1998 supersession.                                          |
| C-08  | `AE-03` identity, domain boundary, page map, Box 5 checks, and quote count are reproducible and accurately bounded.                                                                     |
| C-09  | `AE-03` supports `AC-14` through `AC-17` and its bearer/case cells at the recorded grades without converting guidance into a statistical guarantee.                                     |
| C-10  | `AC-18` through `AC-21`, the 24-cell matrix, terminology search, falsification cases, material disagreement, and synthesis stay within actual source support.                           |
| C-11  | The original commission's closure threshold is met by complete required-source inspection or a justified official replacement, direct independent evidence, and preserved disagreement. |
| C-12  | `NARROW / NARROW_AND_CLOSE` is the only recorded proposal; no Protocol adoption, `FND1-H04` closure, full Research Gate closure, or release decision appears.                           |

A check is `PASS` only when the inspected artifact and frozen repository
record support it. Agreement with the result is not enough.

## 7. Findings and verdict

Classify each finding:

- **BLOCKER:** a false or materially overstated source claim, unlocatable
  load-bearing evidence, incorrect evidence grade, invalid source identity or
  replacement relationship, unsupported sub-hold closure proposal, scope
  breach, or disposition error;
- **SHOULD_FIX:** a reproducibility or boundary defect that must be repaired
  before reconciliation even if it does not necessarily change the proposed
  disposition; or
- **NICE_TO_HAVE:** a non-direction-changing clarity improvement.

Select exactly one verdict after the source-access gate passes:

- **GO:** eligible for later bounded steward reconciliation; or
- **NO_GO:** repair is required before reconciliation.

Any BLOCKER yields `NO_GO`. A SHOULD_FIX yields `NO_GO` when it prevents a
third party from locating, reproducing, or correctly bounding a load-bearing
claim. A NICE_TO_HAVE alone does not prevent `GO`.

`GO` never means Protocol adoption, `H04-S4` closure, `FND1-H04` closure,
implementation approval, or release approval.

## 8. Required result

Replace only
`evidence/research/foundation-identity/fnd-1/2026-09-02-nonclinical-estimand-animal-endpoint-close-review-result.md`
with one English Markdown report containing, in order:

1. identity, input, access, artifact, and independence checks;
2. source-artifact, edition, replacement, and page-map checks;
3. C-01 through C-12 closure matrix;
4. findings by severity;
5. source-by-source ruling for `AC-01` through `AC-21`;
6. bearer-matrix, terminology, falsification, and quote-budget rulings;
7. proposed `H04-S4` disposition and governance-boundary assessment;
8. residuals and exact repair instructions, if any; and
9. final verdict and handoff statement.

For `GO`, end with exactly:

`READY FOR FND-1 ANIMAL-ENDPOINT STEWARD RECONCILIATION - NOT PROTOCOL ADOPTION`

For `NO_GO`, end with exactly:

`NOT READY FOR FND-1 ANIMAL-ENDPOINT STEWARD RECONCILIATION - NOT PROTOCOL ADOPTION`

## 9. Repository operation

1. Start from the exact commit containing this commission and record its full
   SHA.
2. Create a neutral, task-oriented branch from that commit.
3. Read only the inputs in Section 2 and inspect only the source scope in
   Section 3.
4. Replace only the assigned result placeholder.
5. Run:

   ```bash
   pnpm exec prettier --write evidence/research/foundation-identity/fnd-1/2026-09-02-nonclinical-estimand-animal-endpoint-close-review-result.md
   pnpm exec markdownlint-cli2 evidence/research/foundation-identity/fnd-1/2026-09-02-nonclinical-estimand-animal-endpoint-close-review-result.md
   pnpm validate
   ```

6. Commit and push the single-file result change. Do not merge.
7. Report the branch name, full commit SHA, parent SHA, changed file,
   validation results, source-artifact hashes, verdict, findings, and final
   line.

Public branch names, filenames, commit messages, and report prose identify only
the research role and task. They do not identify or imply the drafting or
review software, service, provider, or mechanism. They do not make a false
claim of human authorship.

## 10. Explicit non-decisions

This review does not:

- expand the animal-source corpus beyond identity and replacement checks;
- adopt an animal-event, endpoint, estimand, missingness, censoring,
  outcome-existence, or mechanism vocabulary;
- import an ICH strategy name into general scientific use;
- choose a humane-endpoint threshold, euthanasia rule, animal-study method,
  missing-data method, or analysis-set rule;
- define a Record field, schema, identifier, vocabulary term, reason code,
  public check, conformance rule, API, or implementation;
- close `H04-S1`, `H04-S4`, `FND1-H04` through `FND1-H08`, the full FND-1
  Research Gate, or any release gate; or
- affect Release 2, paired-t, or t-family numerical-contract work.
