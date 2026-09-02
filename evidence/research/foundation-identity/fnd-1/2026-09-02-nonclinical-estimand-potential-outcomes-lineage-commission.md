# FND-1 Non-Clinical Estimand Potential-Outcomes Lineage Commission

**Status: informative primary-source commission; non-normative; not adopted.**
This commission addresses only the potential-outcomes lineage residual retained
under `FND1-H04` and `H04-S1`. It does not define Protocol vocabulary, select a
causal method, authorize implementation, close the full FND-1 Research Gate, or
affect a release.

## 1. Bounded purpose

Directly inspect the identified Neyman, Rubin, and Holland texts and determine
what each primary text actually establishes about the identity of a target
quantity or causal effect. Attack, narrow, or reject the following candidate:

> Outside ICH E9(R1), a target quantity may require an explicit target unit set,
> condition or exposure, outcome with scale and assessment occasion, and
> population-level summary; a comparison direction is conditional on a
> comparison existing.

The pass must distinguish a source-defined object from a cross-source synthesis
and from any possible future project convention. It must not treat the later
potential-outcomes vocabulary as if every earlier text used it, and it must not
infer clinical meaning from the word `treatment`.

## 2. Fixed research state and permitted inputs

The execution base is the exact repository commit containing this commission.
Record its full SHA before source work.

Read only:

1. this commission; and
2. the bounded
   [`FND1-H04` completion steward disposition](2026-09-02-nonclinical-estimand-completion-steward-disposition.md),
   used only to identify the accepted boundary and exact residual.

Do not read the companion animal-endpoint result, any later reconciliation or
review, the earlier primary-source completion result, repository-analysis
results, FND-2 results, review branches, private repositories, or Release 2,
paired-t, or t-family numerical-contract material.

This is a source-completion role, not a repository-analysis role. Disclose any
prior exposure. General background knowledge may guide retrieval but is not
evidence.

## 3. Mandatory primary texts

Inspect the complete text of all three sources below. A catalog record,
abstract, excerpt, lecture note, textbook, or secondary restatement does not
substitute for the primary text.

| Source ID | Required source                                                                                                                                                                                             | Stable identity                                       | Expected printed extent |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ----------------------- |
| `PO-01`   | Splawa-Neyman, J. (1990), “On the Application of Probability Theory to Agricultural Experiments. Essay on Principles. Section 9,” translated by D. M. Dabrowska and T. P. Speed, _Statistical Science_ 5(4) | DOI `10.1214/ss/1177012031`                           | pp. 465–472             |
| `PO-02`   | Rubin, D. B. (1974), “Estimating Causal Effects of Treatments in Randomized and Nonrandomized Studies,” _Journal of Educational Psychology_ 66(5)                                                           | DOI `10.1037/h0037350`; ERIC `EJ118470`               | pp. 688–701             |
| `PO-03`   | Holland, P. W. (1986), “Statistics and Causal Inference,” _Journal of the American Statistical Association_ 81(396)                                                                                         | DOI `10.1080/01621459.1986.10478354`; JSTOR `2289064` | pp. 945–960             |

Use the specified edition or an authenticated artifact with the same
bibliographic identity. For `PO-01`, record that the inspected work is the 1990
English translation of the identified section rather than silently treating it
as the complete 1923 Polish monograph.

If a mandatory source remains inaccessible, complete all accessible work,
record every failed route, mark only the affected claims `NOT_VERIFIABLE`, and
return an exact acquisition list. Do not reconstruct the text from later
sources.

## 4. Artifact, version, and access discipline

For every inspected source:

1. record the complete citation, DOI or stable URL, host, publication date,
   access date, source class, and inspected edition or rendition;
2. when a file is supplied, compute SHA-256 before reading and record the byte
   size, total PDF pages, printed-page range, and printed-to-PDF page map;
3. inspect page images when formulas, tables, subscripts, or symbols are absent
   or degraded in the text layer;
4. give a printed page plus a definition, equation, table, paragraph, or other
   element locator for every decision-bearing claim; and
5. keep quotation from any one source below 25 words in the whole report.

Do not publish source files, credentials, access tokens, or non-redistributable
content. Search snippets and bibliographic records are discovery aids only.

An artifact mismatch is `ARTIFACT_VARIANT`, not proof of either corruption or
equivalence. Resolve the bibliographic identity and avoid absence claims until
the relevant inspected range is established.

## 5. Required source tests

Answer each question separately for each source, using its own terminology:

1. What is the bearer of the potential or target outcome: plot, person,
   experimental unit, trial, or another object?
2. What is the target unit set, and is it finite, sampled, conceptual, or
   otherwise defined?
3. How are the condition, variety, treatment, exposure, or alternative states
   identified?
4. How is the outcome indexed by unit, condition, and time? Distinguish an
   explicit time index from chronology that follows only by inference.
5. Which unit-level effect, average effect, mean difference, variance, or other
   population summary is defined, and over which unit set?
6. Is a contrast constitutive of the target in that text, or does the formalism
   also define a non-contrastive target quantity?
7. Which parts concern target identity, which concern assignment or sampling,
   and which concern an estimator or its variance?
8. What is observable for one unit, what remains counterfactual, and what—if
   anything—is called missing by the source itself?
9. Does the text impose or discuss no-interference, treatment-version, or
   consistency conditions? Attribute later labels such as `SUTVA` only to the
   text that actually uses or defines them.
10. Which candidate element is directly supported, follows only by
    cross-source inference, is absent, or is contradicted?

## 6. Required chronology and terminology separation

Build a chronology table that keeps these roles separate:

- Neyman's agricultural potential-yield construction and randomization model;
- Rubin's unit-level and average causal-effect definitions and design
  discussion; and
- Holland's later causal-inference vocabulary, assumptions, and distinctions.

Do not backdate Holland's labels or later community terminology onto Neyman or
Rubin. Do not claim that an equivalent mathematical object has identical
scientific meaning across application domains without source-grounded
conditions.

## 7. Required target-element matrix

For each source, classify every candidate element as:

- `DEFINED_DIRECTLY`;
- `CROSS_SOURCE_INFERENCE`;
- `ABSENT_IN_INSPECTED_SCOPE`;
- `CONTRADICTED`; or
- `NOT_VERIFIABLE`.

The matrix must include:

1. target unit set;
2. condition or exposure;
3. outcome and scale;
4. time origin or assessment occasion;
5. population-level summary;
6. comparison direction, when applicable;
7. assignment or sampling mechanism;
8. estimator or variance object; and
9. interference, consistency, or treatment-version condition.

Every absence row must state the exact version and inspected range. Absence of
a term is not absence of the underlying concept.

## 8. Required falsification cases

Apply the inspected evidence to at least these six value-independent cases:

1. the same plots and crop-yield scale but a different pair of varieties;
2. the same observed sample but a different declared target unit set;
3. the same unit-level potential outcomes but a different population summary;
4. a descriptive single-condition mean for which no contrast is requested;
5. interference, where one unit's outcome depends on another unit's assigned
   condition; and
6. multiple versions of a nominally identical condition that may produce
   different outcomes.

For each case record the bearer, unit set, condition index, time relation,
summary, target-identity effect, estimator effect, source IDs, missing
declarations, and whether the candidate survives. Numerical equality never
establishes semantic identity.

Add at least one investigator-created counterexample aimed at showing that the
four principal elements are insufficient or that one is not always necessary.
Do not treat any case as pre-labelled gold data.

## 9. Evidence and disposition vocabulary

Use only these atomic-claim statuses:

- `VERIFIED_DIRECT`
- `CROSS_SOURCE_INFERENCE`
- `POSSIBLE_PROJECT_CONVENTION`
- `CONTRADICTED`
- `NOT_VERIFIABLE`

Select exactly one research disposition: `ADVANCE`, `NARROW`, `DEFER`, or
`NO_GO`.

Select exactly one `H04-S1` disposition: `CLOSE`, `NARROW_AND_CLOSE`, or
`KEEP_OPEN`.

`CLOSE` or `NARROW_AND_CLOSE` requires all three mandatory texts to have been
inspected in full, direct pinpoints for every requested element in at least two
independent texts, preservation of every material disagreement, and no
remaining uncertainty material to the bounded `H04-S1` question. Source count
is not a vote.

This pass alone cannot close `FND1-H04`; it can only propose a disposition for
the `H04-S1` residual. The companion `H04-S4` pass and a later steward
reconciliation remain separate.

## 10. Required result structure

Return one complete English Markdown report using these sections in order:

1. identity, input, access, artifact, and independence checks;
2. executive disposition;
3. inspected-source register and page maps;
4. chronology and terminology separation;
5. atomic claim-evidence ledger;
6. source-by-source target-element matrix;
7. bearer, condition, time, summary, and observability analysis;
8. required falsification cases;
9. cross-source agreements and material disagreements;
10. overclaim, transfer, and misattribution attacks;
11. `H04-S1` disposition, residuals, and exact next evidence; and
12. public-artifact and sanitization self-check.

The report must say whether each accepted candidate conclusion survives, is
narrowed, or is contradicted. It must not recommend a Protocol field, schema,
method, identifier, or implementation.

## 11. Execution and handoff

The external primary-source investigator returns the complete report to the
commissioning steward. It performs no repository write and claims no branch,
commit, push, or merge.

The steward places the accepted report into
[`2026-09-02-nonclinical-estimand-potential-outcomes-lineage-result.md`](2026-09-02-nonclinical-estimand-potential-outcomes-lineage-result.md)
without silently strengthening its claims. A separate repository-capable
reviewer may later verify artifact identity, source pinpoints, scope, and the
proposed sub-hold disposition.

## 12. Explicit non-decisions and final lines

This commission does not:

- adopt a causal or cross-domain estimand vocabulary;
- define a universal potential-outcomes model;
- select a causal estimator, design, missing-data method, or sensitivity
  method;
- define a Record field, schema, identifier, reason code, public check,
  conformance rule, API, or implementation;
- close `H04-S4`, `FND1-H04` through `FND1-H08`, the full FND-1 Research Gate,
  or any release gate; or
- affect Release 2, paired-t, or t-family numerical-contract work.

End the report with exactly one line matching the selected research
disposition:

`FND-1 POTENTIAL-OUTCOMES LINEAGE PRIMARY-SOURCE PASS COMPLETE - ADVANCE - NOT PROTOCOL ADOPTION`

`FND-1 POTENTIAL-OUTCOMES LINEAGE PRIMARY-SOURCE PASS COMPLETE - NARROW - NOT PROTOCOL ADOPTION`

`FND-1 POTENTIAL-OUTCOMES LINEAGE PRIMARY-SOURCE PASS COMPLETE - DEFER - NOT PROTOCOL ADOPTION`

`FND-1 POTENTIAL-OUTCOMES LINEAGE PRIMARY-SOURCE PASS COMPLETE - NO-GO - NOT PROTOCOL ADOPTION`
