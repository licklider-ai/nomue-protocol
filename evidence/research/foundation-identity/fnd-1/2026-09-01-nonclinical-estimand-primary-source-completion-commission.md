# FND-1 Non-Clinical Estimand Primary-Source Completion Commission

**Status: informative primary-source completion commission; non-normative; not
adopted.** This commission addresses only the exact source requirement retained
for `FND1-H04`. It does not define Protocol vocabulary, select a schema or
method, authorize implementation, close the full FND-1 Research Gate, or affect
a release.

## 1. Bounded purpose

Directly inspect the non-ICH primary or formal texts needed to test the
source-bounded candidate recorded for `FND1-H04`:

1. a target quantity may need a target unit set, condition or exposure,
   outcome with scale and assessment occasion, and population-level summary,
   with a comparison direction only when a comparison exists;
2. assigned condition, realized condition trajectory, terminal event,
   outcome-existence status, observation-information state, analysis-set
   membership, datum relevance, and mechanism assumption are distinct facts
   with distinct candidate bearers; and
3. event handling is only conditionally estimand-defining: some changes alter
   the target, while an unobserved but conceptually defined outcome may leave
   the target fixed and alter only the analysis procedure.

Attack these propositions. Do not search only for confirmation. The pass may
narrow or reject them and may identify a smaller residual. It does not adopt
them as Protocol concepts.

## 2. Fixed research state and permitted inputs

The execution base is the exact repository commit containing this commission.
Record its full SHA before source work.

Read only:

1. this commission;
2. the original
   [`non-clinical estimand source-closure commission`](2026-08-31-nonclinical-estimand-source-closure-commission.md);
3. the frozen initial
   [`primary-source result`](2026-08-31-nonclinical-estimand-primary-source-result.md),
   used only as an access and question ledger; and
4. the bounded
   [`steward disposition`](2026-09-01-nonclinical-estimand-source-steward-disposition.md),
   used for the accepted boundaries and exact residual source requirement.

Do not read the repository-analysis result, reconciliation, close-review
result, FND-2 results, review branches, private repositories, or Release 2,
paired-t, or t-family numerical-contract material.

This is a completion of the primary-source research role, not a new blind
replication. Disclose any prior exposure and do not treat the earlier result or
steward disposition as evidence for source-content claims.

## 3. Exact completion requirements

The pass is complete only when it directly inspects enough full text to address
all four rows below. A source may satisfy more than one row, but source counts
do not replace the required distinctions.

| Requirement | Direct evidence required                                                                                                                                                                                                                                                    |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `H04-S1`    | At least two primary or formal texts outside the ICH E9(R1) vocabulary that define target quantities, potential outcomes, or exposure effects, with pinpoints for the target unit set, condition or exposure, outcome, time or assessment occasion, and population summary. |
| `H04-S2`    | A primary or formal source that distinguishes an outcome that is defined but unobserved from an outcome that is structurally nonexistent or truncated by a terminal event.                                                                                                  |
| `H04-S3`    | A primary or formal source that distinguishes a detection-limit, bounded, interval-censored, left-censored, or right-censored observation from an ordinary missing observation.                                                                                             |
| `H04-S4`    | Where a suitable text is available, a non-clinical experimental or animal source addressing post-assignment condition change, humane or terminal endpoints, or measurements prevented by a terminal event without importing ICH strategy names.                             |

For `H04-S1`, merely naming a potential outcome is insufficient. The report
must identify which requested elements the text defines directly, which follow
only by inference, and which are absent.

For `H04-S2` and `H04-S3`, a vocabulary contrast in an abstract is
insufficient. Inspect the complete argument, definitions, and conditions.

`H04-S4` is evidence-strengthening rather than a substitute for `H04-S1`
through `H04-S3`. If no suitable full text is available after a documented
search, record `NOT_VERIFIABLE` and preserve that residual without blocking
completed work on the other rows.

## 4. Priority acquisition leads

The entries below are discovery leads, not pre-approved evidence. Verify every
bibliographic identity against the inspected artifact. Replace a lead with a
nearer primary or formal text when the inspected citations or definitions show
that another source is controlling.

| Lead ID   | Candidate source                                                                                                                                                                                         | Stable identity or public route                                            | Intended requirement |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------- |
| `LEAD-01` | Splawa-Neyman, “On the Application of Probability Theory to Agricultural Experiments. Essay on Principles. Section 9,” English translation, _Statistical Science_ 5(4), 1990, pp. 465–472                | DOI `10.1214/ss/1177012031`; UC Berkeley digital collection record `86214` | `H04-S1`             |
| `LEAD-02` | Rubin, “Estimating Causal Effects of Treatments in Randomized and Nonrandomized Studies,” _Journal of Educational Psychology_ 66(5), 1974, pp. 688–701                                                   | DOI `10.1037/h0037350`                                                     | `H04-S1`             |
| `LEAD-03` | Holland, “Statistics and Causal Inference,” _Journal of the American Statistical Association_ 81(396), 1986, pp. 945–960                                                                                 | DOI `10.1080/01621459.1986.10478354`                                       | `H04-S1`             |
| `LEAD-04` | Zhang and Rubin, “Estimation of Causal Effects via Principal Stratification When Some Outcomes are Truncated by ‘Death’,” _Journal of Educational and Behavioral Statistics_ 28(4), 2003, pp. 353–368    | DOI `10.3102/10769986028004353`                                            | `H04-S2`             |
| `LEAD-05` | Kurland, Johnson, Egleston, and Diehr, “Longitudinal Data with Follow-up Truncated by Death: Match the Analysis Method to Research Aims,” _Statistical Science_ 24(2), 2009, pp. 211–222                 | DOI `10.1214/09-STS293`; PMCID `PMC2812934`                                | `H04-S2`             |
| `LEAD-06` | Gilliom and Helsel, “Estimation of Distributional Parameters for Censored Trace Level Water Quality Data: 1. Estimation Techniques,” _Water Resources Research_ 22(2), 1986, pp. 135–146                 | DOI `10.1029/WR022i002p00135`; USGS publication record `70014951`          | `H04-S3`             |
| `LEAD-07` | Helsel, “Less than Obvious—Statistical Treatment of Data Below the Detection Limit,” _Environmental Science & Technology_ 24(12), 1990, pp. 1766–1774                                                    | DOI `10.1021/es00082a001`                                                  | `H04-S3`             |
| `LEAD-08` | OECD, _Guidance Document on the Recognition, Assessment and Use of Clinical Signs as Humane Endpoints for Experimental Animals Used in Safety Evaluation_, Series on Testing and Assessment No. 19, 2002 | DOI `10.1787/9789264078376-en`                                             | `H04-S4`             |

At least two inspected `H04-S1` texts must not be two descriptions of the same
paper. Prefer sources from different application settings or formal lineages.
The report must not infer that the word “treatment” carries clinical meaning
merely because a general causal source uses it.

## 5. Artifact and access discipline

For every decision-bearing source:

1. inspect the complete primary, formal, or official text;
2. record the complete citation, DOI or stable URL, host, publication or
   adoption date, access date, and source class;
3. if a file is supplied, compute SHA-256 before reading, record total PDF
   pages, and map printed pages to PDF pages;
4. inspect page images when the text layer is absent or formulae, tables, or
   symbols are degraded;
5. give a printed page, section, definition, theorem, table, figure, or
   equivalent pinpoint for each atomic claim; and
6. keep quotation from any one source below 25 words in the whole report.

Do not publish source files, credentials, access tokens, or non-redistributable
content in the repository. Source artifacts are inspection inputs, not
repository contents.

Search snippets, abstracts, catalog pages, encyclopedias, blogs, software
documentation, and prior reports are discovery aids only. They do not support
a decision-bearing claim. If a lead is inaccessible, complete every accessible
source, record the failed route, mark only the affected claims
`NOT_VERIFIABLE`, and produce an exact acquisition list.

An artifact hash mismatch is `ARTIFACT_VARIANT`, not automatic corruption or
equivalence. Record the difference, verify the bibliographic identity, and
avoid absence claims until the variant is resolved.

## 6. Required claim tests

The report must answer each question from inspected text rather than from the
candidate wording:

1. What object carries each potential or target outcome: person, plot, animal,
   sample, experimental unit, or another unit?
2. How does each source define the condition, exposure, intervention, or
   assignment and the alternative against which it is compared?
3. Is the outcome indexed by time, condition, both, or neither?
4. Which aggregation or population summary is defined, and over which target
   unit set?
5. Does the source require a contrast, or can it represent a single-condition
   or descriptive target?
6. Does an unobserved outcome remain a well-defined value in the source's
   model, or is no hidden value defined after the truncating event?
7. Does the source distinguish censoring or a detection bound from absence of
   an observation? Which information remains known?
8. Which fact bearer is supported directly for assignment, realized exposure,
   terminal event, outcome existence, observation state, analysis-set
   membership, and missingness assumption?
9. Which handling choices alter the target quantity, and which alter only an
   estimator, likelihood, imputation, or analysis procedure?
10. Does any inspected non-clinical source support importing an ICH
    intercurrent-event strategy name verbatim? Bound every negative answer to
    the exact inspected scope.

## 7. Required falsification cases

Apply the inspected evidence to at least these six value-independent cases:

1. an agricultural plot has one observed yield but potential yields under
   multiple crop varieties;
2. an outcome is scheduled after a terminal event and no hidden value exists;
3. an outcome remains defined at the assessment occasion but was not observed;
4. a water-quality or assay value is known only to be below a detection limit;
5. an experimental animal reaches a humane endpoint before a scheduled
   measurement; and
6. the same datum is relevant to one target quantity but irrelevant to another.

For each case record the domain, bearer, time relation, target-quantity effect,
procedure effect, observation-information state, source IDs, missing
declarations, and whether the accepted candidate survives. Numerical agreement
never establishes semantic identity.

Add at least one investigator-created counterexample aimed at defeating the
four-part target-quantity candidate or the bearer separation. Do not treat
these cases as pre-labelled gold data.

## 8. Evidence and disposition vocabulary

Use only these atomic-claim statuses:

- `VERIFIED_DIRECT`
- `CROSS_SOURCE_INFERENCE`
- `POSSIBLE_PROJECT_CONVENTION`
- `CONTRADICTED`
- `NOT_VERIFIABLE`

Select exactly one research disposition: `ADVANCE`, `NARROW`, `DEFER`, or
`NO_GO`.

Select exactly one `FND1-H04` disposition: `CLOSE`, `NARROW_AND_CLOSE`, or
`KEEP_OPEN`.

`CLOSE` or `NARROW_AND_CLOSE` requires all mandatory rows `H04-S1` through
`H04-S3` to be supported by direct full-text evidence, all material
disagreements to be preserved, and every remaining uncertainty to be
non-material to the bounded hold. `H04-S4` may remain a separately stated
evidence-strengthening residual only if it does not carry a claim needed for
the closure rationale.

Agreement between sources is not a vote. Conflicting definitions, domains, or
bearers remain explicit.

## 9. Required result structure

Replace the result placeholder with one complete English Markdown report using
these sections in order:

1. identity, input, artifact, access, and independence checks;
2. executive disposition;
3. complete inspected-source register and page maps;
4. atomic claim-evidence ledger;
5. target-quantity element matrix;
6. outcome-existence, missingness, and censoring boundary matrix;
7. non-clinical event and bearer analysis;
8. required falsification cases;
9. overclaim, transfer, and misattribution attacks;
10. completion matrix for `H04-S1` through `H04-S4`;
11. `FND1-H04` disposition, residuals, and exact next evidence; and
12. public-artifact and sanitization self-check.

The result must distinguish source statements, cross-source inference, and
possible project conventions. It must state whether each accepted candidate
conclusion survives, is narrowed, or is contradicted.

## 10. Execution and handoff

The external primary-source investigator returns the complete result to the
commissioning steward. It performs no repository write and claims no branch,
commit, push, or merge.

After intake, a separate repository-capable reviewer may verify artifact
identity, claim pinpoints, source-boundary compliance, and the proposed hold
disposition. That later review is not authorized to adopt Protocol fields or
close the full FND-1 Research Gate.

## 11. Explicit non-decisions

This commission does not:

- adopt a cross-domain estimand, missingness, censoring, event, or bearer
  vocabulary;
- import an ICH strategy name into general scientific use;
- select a causal, missing-data, censoring, terminal-event, or sensitivity
  method;
- define a Record field, schema, identifier, reason code, public check,
  conformance rule, API, or implementation;
- close `FND1-H05` through `FND1-H08`, the full FND-1 Research Gate, or any
  release gate; or
- affect Release 2, paired-t, or t-family numerical-contract work.

## 12. Final lines

End the report with exactly one line matching the selected research
disposition:

`FND-1 NON-CLINICAL ESTIMAND PRIMARY-SOURCE COMPLETION PASS COMPLETE - ADVANCE - NOT PROTOCOL ADOPTION`

`FND-1 NON-CLINICAL ESTIMAND PRIMARY-SOURCE COMPLETION PASS COMPLETE - NARROW - NOT PROTOCOL ADOPTION`

`FND-1 NON-CLINICAL ESTIMAND PRIMARY-SOURCE COMPLETION PASS COMPLETE - DEFER - NOT PROTOCOL ADOPTION`

`FND-1 NON-CLINICAL ESTIMAND PRIMARY-SOURCE COMPLETION PASS COMPLETE - NO-GO - NOT PROTOCOL ADOPTION`
