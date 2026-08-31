# FND-2 Analysis-Data Source-Completion Commission

**Status: informative research commission; non-normative; not adopted.** This
commission reopens only FND-2 `HOLD-01` through `HOLD-04` for a bounded source
completion. It does not reopen `HOLD-05`, define Protocol vocabulary, select a
standard or transport, choose a missing-data method, authorize implementation,
close the full FND-2 Research Gate, or affect a release.

## 1. Bounded question

Complete the previously inaccessible primary-source basis needed to evaluate:

1. estimand alignment and intercurrent-event semantics;
2. protocol and analysis-data declaration completeness;
3. ADaM traceability, analysis-data conventions, and any directly represented
   imputation or value-state distinctions; and
4. missingness mechanisms, multiple-imputation representation, and censoring
   semantics.

The source-bounded result at
[`2026-08-30-independent-research-result.md`](2026-08-30-independent-research-result.md)
remains the accepted baseline. Its six-state candidate, identity tuple,
USDM-to-ARS linking proposal, and assurance classes remain hypotheses to attack.

## 2. Holds in scope

| Hold      | Exact closure question                                                                                                                           |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `HOLD-01` | Which estimand-side identity and link statements survive direct ICH E9(R1) inspection?                                                           |
| `HOLD-02` | What do SPIRIT 2025 Items 27b and 27c directly require for analysis, population, missing-data, and protocol declarations?                        |
| `HOLD-03` | What do ADaM v2.1, ADaMIG v1.3, and official traceability or conformance materials represent directly?                                           |
| `HOLD-04` | What do the primary missingness, multiple-imputation, and censoring sources establish, and what representation questions remain project choices? |

`HOLD-05` on commitment strength, attestation, and PROV-to-schema.org mapping is
reserved for a later assurance-composition investigation.

## 3. Explicit exclusions

Exclude:

- Release 2 and all paired-t or t-family numerical-contract material;
- adoption of MCAR, MAR, MNAR, any imputation method, pooling rule, censoring
  method, or sensitivity procedure;
- adoption of ADaM, USDM, ARS, PROV, RO-Crate, schema.org, or another transport
  or packaging standard;
- public fields, schemas, identifiers, value-state names, refusal codes, APIs,
  implementation, and conformance expectations;
- `HOLD-05` assurance-composition and cryptographic-commitment questions; and
- organization-wide privacy, disclosure, legal, or regulatory judgments.

## 4. Two isolated passes

| Pass | Role                                                               | Assigned output                                                                                                    | Repository operation                                              |
| ---- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| A    | Independent external primary-source investigator                   | [`2026-08-31-analysis-data-primary-source-result.md`](2026-08-31-analysis-data-primary-source-result.md)           | None. Return one complete Markdown report to the steward.         |
| B    | Independent repository, standard-model, and representation analyst | [`2026-08-31-analysis-data-repository-analysis-result.md`](2026-08-31-analysis-data-repository-analysis-result.md) | Replace only the assigned placeholder on a reviewer-owned branch. |

The passes remain blind to one another until both results are frozen. Neither
pass reads the other result, a future reconciliation, FND-1 results, unrelated
review branches, private repositories, or Release 2 material.

### 4.1 Pass A inputs

Pass A reads this commission only before beginning source work. It does not
claim a repository write.

### 4.2 Pass B inputs

Pass B starts from the exact commission commit and reads only:

1. this commission;
2. [`2026-08-30-independent-research-result.md`](2026-08-30-independent-research-result.md);
3. [`2026-08-30-source-bounded-steward-disposition.md`](2026-08-30-source-bounded-steward-disposition.md);
4. [`../2026-08-30-counterexample-corpus-v1.md`](../2026-08-30-counterexample-corpus-v1.md); and
5. [`../2026-08-30-common-response-template-v1.md`](../2026-08-30-common-response-template-v1.md).

It must not read the Pass A result or any FND-1 result. Repository-wide search
is limited to public FND-2 and standards-related statements outside excluded
paths.

## 5. Access and evidence rules

- Inspect complete primary, normative, or official standard text. Marketing
  pages, snippets, abstracts, and secondary summaries do not establish a
  decision-bearing claim.
- Record exact version, publication date, stable URL or DOI, host, access date,
  page or section, class or slot, and inspected scope.
- Authenticated official access is acceptable and recorded as such. Do not
  publish credentials, access tokens, or non-redistributable source content.
- If a source is inaccessible, complete every other source and analysis,
  preserve an access log, mark only affected claims `NOT_VERIFIABLE`, and use
  `DEFER` if closure depends on them. Source inaccessibility is not a reason to
  stop the entire pass.
- Distinguish a standard's direct representation from investigator inference
  and from a possible future project profile.
- Bound every negative finding to exact versions, files, classes, slots,
  sections, and search terms.
- Keep quotation from any one source below 25 words in the whole report.

## 6. Minimum primary-source and formal-model basis for Pass A

Inspect, where accessible:

1. ICH E9(R1), full authoritative text;
2. the SPIRIT 2025 Statement and Explanation and Elaboration material covering
   Items 27b and 27c;
3. official CDISC ADaM v2.1 and ADaMIG v1.3 text, plus the official
   traceability and conformance material needed for the claims;
4. Rubin (1976), "Inference and Missing Data," or the exact primary source
   needed for each missingness-mechanism claim;
5. Rubin (1987), _Multiple Imputation for Nonresponse in Surveys_, or primary
   sources that directly establish the representation and pooling claims under
   review;
6. Kaplan and Meier (1958), "Nonparametric Estimation from Incomplete
   Observations," and additional primary sources needed to distinguish
   censoring, truncation, interval bounds, and assay detection limits; and
7. any nearer source that contradicts the baseline's proposed state boundaries
   or multiple-imputation representation.

Do not use a modern textbook to silently replace an original theorem or
definition. A modern formal standard may support a current representation claim
only within its own stated scope.

## 7. Required research questions

### 7.1 Estimand and reporting alignment

1. Which ICH E9(R1) estimand attributes and intercurrent-event statements are
   identity-bearing, and what does the text not say about analysis-data
   identity?
2. Does the baseline USDM-to-ARS link inventory accurately separate direct
   standard representation from proposed composition?
3. What do SPIRIT Items 27b and 27c require directly, and which declarations are
   recommendations, examples, or investigator inference?

### 7.2 ADaM

1. What are ADaM's direct objects and traceability relations among source data,
   analysis datasets, analysis variables, parameters, records, and results?
2. Which official variables or conventions, if any, distinguish observed,
   derived, imputed, censored, structurally absent, or excluded values?
3. Which statements apply to ADaM v2.1, ADaMIG v1.3, another document, a
   controlled-terminology artifact, or an implementation convention?
4. Does direct ADaM inspection confirm, narrow, or contradict the baseline
   capability-matrix row and the claim that no inspected standard closes the
   full identity tuple alone?

### 7.3 Missingness, imputation, and censoring

1. What are the exact bearers and conditions of MCAR, MAR, and MNAR-type
   statements, and are they cell states, process assumptions, model
   restrictions, or another object?
2. Which aspects of a multiple-imputation procedure are required for scientific
   identity, reproducibility, and pooled inference? Separate methodology from a
   proposed provenance representation.
3. Does any inspected source require representing multiple imputations as M
   datasets, one composite object, a repeated-analysis collection, or a pooling
   activity?
4. Which forms of right, left, interval, administrative, and detection-limit
   censoring must remain distinct, and how do censoring and truncation differ?
5. Does `censored_or_bounded` need to be split, renamed, or removed from the
   candidate cell-state axis?
6. What boundary separates `imputed` from `derived`, and is that boundary
   standard-backed or only a possible project convention?
7. Which parts of the narrowed six-state candidate can be closed, and which
   remain unresolved?

## 8. Required falsification cases

Analyze at least the following cases without relying on output-value agreement:

1. a value absent because it was never collected versus absent because it was
   structurally impossible;
2. a left-censored assay result versus a stored point equal to the limit;
3. an administratively right-censored time-to-event record versus dropout;
4. one deterministic derived value versus one model-based imputed value;
5. M imputed datasets with identical pooled output but different imputation or
   execution identity;
6. a record excluded from one analysis set but retained in another;
7. identical logical data serialized with different row or column order; and
8. two analysis datasets connected to the same estimand but produced through
   different selection or transformation paths.

Record decisive attributes, bearer, source support, identity consequence,
assurance consequence, missing declarations, and classification confidence.

## 9. Required result structure

Each pass returns:

1. identity, input, access, and independence checks;
2. one disposition: `ADVANCE`, `NARROW`, `DEFER`, or `NO_GO`;
3. search method and complete access log;
4. version-fixed source and standard register;
5. atomic claim-evidence ledger;
6. ICH and SPIRIT requirement matrix;
7. ADaM class, variable, traceability, and capability matrix;
8. missingness-mechanism and cell-state bearer matrix;
9. multiple-imputation representation comparison;
10. censoring and truncation taxonomy with counterexamples;
11. updated candidate-state and identity-tuple matrix;
12. falsification cases, disagreements, and scoped absence claims;
13. one disposition for each `HOLD-01` through `HOLD-04`: `CLOSE`,
    `NARROW_AND_CLOSE`, or `KEEP_OPEN`;
14. exact repair map for the source-bounded baseline, without performing the
    repair; and
15. public-artifact and sanitization self-check.

## 10. Pass B repository and model tasks

Pass B must:

1. reproduce the fixed-version ARS v1.0.0, USDM v4.0.0, PROV-O,
   PROV-CONSTRAINTS, and RO-Crate 1.3 checks from official sources;
2. independently inspect any officially accessible ADaM artifact rather than
   relying on the baseline report;
3. test all eight required cases against the existing corpus, state matrix,
   identity tuple, transformation DAG, and assurance-axis separation;
4. identify every baseline claim that would be confirmed, narrowed,
   contradicted, or left unchanged by each possible primary-source outcome;
5. verify that no proposed repair would silently adopt a public schema or
   vocabulary; and
6. produce a hold-by-hold closure matrix.

If a fixed input is missing or ambiguous, write only the identity section,
mark `INPUT_INCOMPLETE`, and stop. Source inaccessibility is not
`INPUT_INCOMPLETE`.

## 11. Repository operation for Pass B

1. Create a neutral, task-oriented branch from the exact commission commit.
2. Replace only
   `evidence/research/foundation-identity/fnd-2/2026-08-31-analysis-data-repository-analysis-result.md`.
3. Run:

   ```bash
   pnpm exec prettier --write evidence/research/foundation-identity/fnd-2/2026-08-31-analysis-data-repository-analysis-result.md
   pnpm exec markdownlint-cli2 evidence/research/foundation-identity/fnd-2/2026-08-31-analysis-data-repository-analysis-result.md
   pnpm validate
   ```

4. Commit and push the single-file result. Report the branch name, full commit
   SHA, parent SHA, changed file, validations, disposition, hold dispositions,
   and final line.

Public names and prose remain neutral and role-based. Do not identify or imply
the drafting or review software, service, provider, or mechanism.

## 12. Handoff and final lines

The steward reconciles the two frozen results. Neither pass result closes a hold
by itself. `HOLD-05` remains open and outside this package regardless of the
outcome.

Pass A ends with exactly one of:

`FND-2 ANALYSIS-DATA PRIMARY-SOURCE PASS COMPLETE - ADVANCE - NOT PROTOCOL ADOPTION`

`FND-2 ANALYSIS-DATA PRIMARY-SOURCE PASS COMPLETE - NARROW - NOT PROTOCOL ADOPTION`

`FND-2 ANALYSIS-DATA PRIMARY-SOURCE PASS COMPLETE - DEFER - NOT PROTOCOL ADOPTION`

`FND-2 ANALYSIS-DATA PRIMARY-SOURCE PASS COMPLETE - NO-GO - NOT PROTOCOL ADOPTION`

Pass B uses the same four alternatives with `REPOSITORY-ANALYSIS PASS` in
place of `PRIMARY-SOURCE PASS`.
