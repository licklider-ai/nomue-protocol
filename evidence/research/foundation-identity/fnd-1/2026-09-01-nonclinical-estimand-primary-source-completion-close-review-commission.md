# FND-1 Non-Clinical Estimand Primary-Source Completion Close-Review Commission

**Status: informative close-review commission; non-normative; not adopted.**
This commission reviews only the completed primary-source result retained under
`FND1-H04`. It does not perform a new source-completion pass, adopt Protocol
vocabulary, authorize implementation, close the full FND-1 Research Gate, or
affect a release.

## 1. Fixed identity

The review target is fixed as follows:

| Item                          | Fixed value                                                                                                       |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Result path                   | `evidence/research/foundation-identity/fnd-1/2026-09-01-nonclinical-estimand-primary-source-completion-result.md` |
| Result commit                 | `8854f8f25916459a0bb367508b60597ffc88b581`                                                                        |
| Intake merge                  | `92610983fcf8c77cdd14eeedf6e3351b3379a55f`                                                                        |
| Result blob                   | `cee91b8080173d3759e267fa8cec5a5b6e5d067f`                                                                        |
| Result SHA-256                | `c6321fd1c6df44339784930575d112e4d915cfa0aa05b79b24699894584d75b3`                                                |
| Result length                 | 399 lines after repository formatting                                                                             |
| Recorded research disposition | `DEFER`                                                                                                           |
| Recorded hold disposition     | `FND1-H04: KEEP_OPEN`                                                                                             |

Before substantive review, independently verify every commit, ancestry, path,
blob, SHA-256, and final disposition above. Confirm that the result blob is
byte-identical at the result commit, intake merge, and review execution base.
If any identity fails, report `INPUT_INCOMPLETE` and stop.

The result self-reports a bounded six-item repair pass. Neither the repair
instruction nor the superseded draft is a repository input to this review. Do
not reconstruct either item or claim to verify the before-and-after repair
history. Review only the frozen result identified above against its governing
commissions, accepted boundary, and the directly inspected source texts.

## 2. Permitted repository inputs and exclusions

Read only these repository documents, plus this commission and its assigned
result placeholder:

1. the original
   [source-closure commission](2026-08-31-nonclinical-estimand-source-closure-commission.md),
   blob `c19bcff2ac1d3d8666869e186c530eb885da67f8`;
2. the frozen initial
   [primary-source result](2026-08-31-nonclinical-estimand-primary-source-result.md),
   blob `6566923b7f08c59d8f5fd1c13c8aa2b3e0d53116`, used only as
   the earlier access and question ledger;
3. the bounded
   [steward disposition](2026-09-01-nonclinical-estimand-source-steward-disposition.md),
   blob `7faf5c89227576136bf5bbc9c577edea48116038`;
4. the
   [primary-source completion commission](2026-09-01-nonclinical-estimand-primary-source-completion-commission.md),
   blob `df47345853c22481dc5402b7f93690fdbc575de6`; and
5. the frozen
   [completion result](2026-09-01-nonclinical-estimand-primary-source-completion-result.md),
   blob `cee91b8080173d3759e267fa8cec5a5b6e5d067f`.

Do not read the repository-analysis result, reconciliation candidate,
reconciliation close-review result, FND-2 results, unrelated review branches,
private repositories, or Release 2, paired-t, and t-family numerical-contract
material. Do not use another review or another investigator's summary as
source-content evidence.

This is a close-only review. Do not expand the candidate source list to finish
the still-open `H04-S1` or `H04-S4` research. A source outside the two
mandatory spot-check targets below may be opened only to resolve the identity
or variant relationship of one of those targets.

## 3. Mandatory source-access gate

The review is intended to verify source content, not merely repository
bookkeeping. Directly inspect both targets:

### 3.1 SRC-05

- Kurland, Johnson, Egleston, and Diehr, “Longitudinal Data with Follow-up
  Truncated by Death: Match the Analysis Method to Research Aims”;
- arXiv `1001.2697v1`, including its record page and complete v1 PDF;
- journal identity: _Statistical Science_ 24(2), 2009, pp. 211–222;
- DOI `10.1214/09-STS293`; report number `IMS-STS-STS293`.

Download or otherwise inspect the complete PDF. Record the artifact SHA-256,
PDF page count, version, access date, and a usable map from every
decision-bearing result pinpoint to the inspected PDF page, section, table, or
equation. If the journal or PMCID version is used to resolve a variant, record
that artifact separately and do not silently treat it as byte-identical to the
arXiv file.

### 3.2 SRC-06

- Singh and Nocerino, “Robust Estimation of Mean and Variance Using
  Environmental Data Sets with Below Detection Limit Observations”;
- U.S. EPA NEPIS dockey `P1010E75`;
- stable TXT route
  <https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P1010E75.TXT>;
- reported date May 2001 and Clearance Number `01-062`.

Retrieve the complete served rendition. Record its raw-byte SHA-256, byte or
character length, title-block identity, internal page markers, terminal text,
and access date. Determine whether the served text supports “complete text,”
“substantial body,” or a narrower description. Give reproducible text anchors
for every decision-bearing claim; generic labels such as “methods section” are
not enough unless the section is uniquely named and located.

### 3.3 Failure rule

Search results, snippets, abstracts, bibliographic records, earlier reports,
and memory cannot replace either mandatory text. If either target cannot be
inspected in full enough to test its load-bearing claims, return only:

1. the completed identity check;
2. the access attempts and exact failure;
3. `SOURCE_ACCESS_INCOMPLETE`; and
4. the exact artifact or route needed for rerun.

In that case, do not issue `GO` or `NO_GO`, do not modify the repository,
and do not infer the missing text.

## 4. Review question

Determine whether the frozen result is accurate, reproducible, properly
bounded, and eligible for a steward disposition that still keeps
`FND1-H04` open.

The review does **not** decide whether the four-part target-quantity candidate
is adopted, whether `FND1-H04` can close after new research, or whether a
Protocol field should exist. It checks whether the current
`DEFER / KEEP_OPEN` result can be relied on as source-bounded research input.

## 5. Required adversarial source checks

### 5.1 SRC-05 identity and version

Verify:

1. arXiv `1001.2697v1` is the inspected version and the record metadata in
   the result is accurate;
2. the title, authors, DOI, journal reference, report number, and version date
   match;
3. the result does not treat the arXiv preprint and published article as
   byte-identical;
4. the result's section, table, and equation references are locatable in the
   inspected artifact; and
5. every scoped absence claim is truly bounded to that exact version.

### 5.2 SRC-05 load-bearing claims

Try to falsify, narrow, or reclassify:

- D1: whether the text directly defines all elements attributed to it,
  especially whether a cohort index or survival stratum is properly described
  as a condition or exposure;
- D7 and D8: whether the complete argument directly distinguishes a
  defined-but-unobserved outcome from an outcome that is structurally
  nonexistent after death, rather than merely warning against implicit
  post-death imputation;
- D12: whether the named model classes change the target quantity in the
  precise ways asserted;
- `H04-S2: Met`: whether this conclusion rests on direct full-text evidence
  as required by the completion commission; and
- the D14(a) absence finding using the exact listed search terms over the
  complete v1 text.

Do not use the Zhang and Rubin abstract to cure any gap in the Kurland
full-text argument. The result itself classifies that abstract as discovery
tier only.

### 5.3 SRC-06 identity and rendition

Verify:

1. the title block, authors, affiliations, issuing offices, date, clearance
   number, and stable route;
2. the internal page numbering and the claim that references end at page 33;
3. whether the text is a journal article, government technical document,
   manuscript rendition, or another form, preserving any ambiguity;
4. whether the retrieved rendition is complete, truncated, duplicated, or
   otherwise transformed; and
5. whether the result's “substantial body” boundary is accurate.

### 5.4 SRC-06 load-bearing claims

Try to falsify, narrow, or reclassify:

- D2: whether the target quantities and unit set attributed to the document
  are directly defined;
- D9: whether below-detection-limit observations retain a bound and inequality
  fact and are distinguished from ordinary missing observations;
- D10: whether the Type I / Type II censoring distinction is stated as
  reported;
- D11: whether the document directly supports the claimed bias comparison and
  the assertion that the target remains unchanged;
- `H04-S3: Met with recorded caveat`: whether the complete argument directly
  satisfies the commission's required distinction from ordinary missingness,
  rather than relying on cross-source inference; and
- D14(b): whether its `CROSS_SOURCE_INFERENCE` status and inspected-range
  wording are sufficiently narrow.

### 5.5 Cross-cutting attacks

Check:

1. every decision-bearing `VERIFIED_DIRECT` row has a reproducible source
   anchor;
2. no abstract, secondary text, catalog record, or inaccessible source carries
   a closure rationale;
3. quotation stays below 25 words per source across the result;
4. source statements, cross-source inference, and possible project convention
   remain separate;
5. the seven falsification cases do not use numerical agreement as semantic
   identity;
6. `H04-S1` remains only partially met and materially blocks hold closure;
7. `H04-S4` remains `NOT_VERIFIABLE` and is not silently used;
8. the exact next-evidence list is still sufficient and honest; and
9. the report makes no Protocol, schema, method, implementation, or release
   decision.

## 6. Closure matrix

Record `PASS` or `FAIL` with concise evidence for every row:

| Check | Requirement                                                                                                                                                      |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| C-01  | All fixed repository identities, ancestry, blob, SHA-256, and final dispositions match.                                                                          |
| C-02  | Only permitted repository inputs and bounded source targets were used; exclusions and prior-exposure disclosures are adequate.                                   |
| C-03  | The result preserves the commissioned twelve-section structure, allowed status vocabulary, one research disposition, one hold disposition, and exact final line. |
| C-04  | SRC-05 artifact identity, version, variant boundary, page count, and source anchors are reproducible.                                                            |
| C-05  | SRC-05 supports D1, D7, D8, D12, and the stated H04-S2 disposition at the recorded evidence grades.                                                              |
| C-06  | SRC-06 identity, rendition extent, internal page markers, and inspection boundary are accurate and reproducible.                                                 |
| C-07  | SRC-06 supports D2 and D9 through D11, and the stated H04-S3 disposition, at the recorded evidence grades.                                                       |
| C-08  | H04-S1 is correctly limited to partially met and remains material to KEEP_OPEN.                                                                                  |
| C-09  | H04-S2 does not rely on an abstract, secondary source, or inference to satisfy its direct-evidence requirement.                                                  |
| C-10  | H04-S3 directly distinguishes bounded or censored observations from ordinary missing observations, with all rendition caveats preserved.                         |
| C-11  | D14 absence claims, quotation budget, atomic statuses, falsification cases, and exact residual list are correctly bounded.                                       |
| C-12  | DEFER / KEEP_OPEN is the only disposition recorded; no Protocol adoption, FND-1 Gate closure, release change, or excluded-scope decision appears.                |

A check is `PASS` only when the inspected source and frozen repository
artifact support it. Agreement with the result is not enough.

## 7. Findings and verdict

Classify each finding:

- **BLOCKER:** a false or materially overstated source claim, unlocatable
  load-bearing evidence, incorrect evidence grade, invalid source identity,
  overclosure, scope breach, or disposition error that prevents steward use;
- **SHOULD_FIX:** a reproducibility or boundary defect that must be repaired
  before disposition even if it does not change `DEFER / KEEP_OPEN`; or
- **NICE_TO_HAVE:** a non-direction-changing clarity improvement.

Select exactly one verdict after the source-access gate passes:

- **GO:** eligible for bounded steward disposition while `FND1-H04` remains
  open; or
- **NO_GO:** repair is required before steward disposition.

Any BLOCKER yields `NO_GO`. A SHOULD_FIX yields `NO_GO` when it prevents a
third party from locating or reproducing a load-bearing source check. A
NICE_TO_HAVE alone does not prevent `GO`.

`GO` never means Protocol adoption, hold closure, implementation approval,
or release approval.

## 8. Required result

Replace only
`evidence/research/foundation-identity/fnd-1/2026-09-01-nonclinical-estimand-primary-source-completion-close-review-result.md`
with one English Markdown report containing, in order:

1. identity, input, access, and independence checks;
2. source-artifact and version checks;
3. C-01 through C-12 closure matrix;
4. findings by severity;
5. claim-by-claim source ruling for D1, D2, D7 through D12, D14, H04-S1,
   H04-S2, H04-S3, and H04-S4;
6. disposition and governance-boundary assessment;
7. residuals and exact repair instructions, if any; and
8. final verdict and handoff statement.

For `GO`, end with exactly:

`READY FOR FND-1 NON-CLINICAL ESTIMAND COMPLETION STEWARD DISPOSITION - NOT PROTOCOL ADOPTION`

For `NO_GO`, end with exactly:

`NOT READY FOR FND-1 NON-CLINICAL ESTIMAND COMPLETION STEWARD DISPOSITION - NOT PROTOCOL ADOPTION`

## 9. Repository operation

1. Start from the exact commit containing this commission and record its full
   SHA.
2. Create a neutral, task-oriented branch from that commit.
3. Read only the inputs in Section 2 and inspect only the source scope in
   Section 3.
4. Replace only the assigned result placeholder.
5. Run:

   ```bash
   pnpm exec prettier --write evidence/research/foundation-identity/fnd-1/2026-09-01-nonclinical-estimand-primary-source-completion-close-review-result.md
   pnpm exec markdownlint-cli2 evidence/research/foundation-identity/fnd-1/2026-09-01-nonclinical-estimand-primary-source-completion-close-review-result.md
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

- complete the still-open H04-S1 or H04-S4 source research;
- adopt or reject a cross-domain estimand, event, bearer, missingness, or
  censoring vocabulary;
- select a causal, missing-data, censoring, terminal-event, or sensitivity
  method;
- add a Record field, schema, identifier, vocabulary term, reason code, public
  check, conformance rule, API, or implementation;
- close FND1-H04 through FND1-H08, the full FND-1 Research Gate, or any release
  gate; or
- affect Release 2, paired-t, or t-family numerical-contract work.
