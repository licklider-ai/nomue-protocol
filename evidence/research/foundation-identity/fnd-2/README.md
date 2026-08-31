# FND-2 Independent Research Instructions

**Status: informative research commission; non-normative; not adopted.** The
investigation produces Research Gate input. It does not select Protocol fields,
schemas, identifiers, transport standards, missing-data defaults,
implementation behavior, or a release change.

**Current disposition:** the completed source-bounded investigation is accepted
with disposition `DEFER`; see
[`2026-08-30-source-bounded-steward-disposition.md`](2026-08-30-source-bounded-steward-disposition.md).
The full FND-2 Research Gate remains open and no Protocol adoption is
authorized.

## Active bounded source-completion follow-up

The
[`analysis-data source-completion commission`](2026-08-31-analysis-data-source-completion-commission.md)
reopens only `HOLD-01` through `HOLD-04` for two isolated passes:

| Pass                                                    | Pending result                                                                                                     |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| External primary-source investigation                   | [`2026-08-31-analysis-data-primary-source-result.md`](2026-08-31-analysis-data-primary-source-result.md)           |
| Repository, standard-model, and representation analysis | [`2026-08-31-analysis-data-repository-analysis-result.md`](2026-08-31-analysis-data-repository-analysis-result.md) |

`HOLD-05` remains open and outside this package. The historical source-bounded
disposition is not rewritten; later reconciliation records whether the new
evidence closes, narrows, or preserves each reopened hold.

## Assignment

Act as an independent primary-source investigator and adversarial reviewer with
expertise in analysis data, missingness, provenance, research objects, and CDISC
standards. Attempt to refute the candidate vocabulary and standards composition
at the class, slot, and constraint level. Do not search for support merely to
justify a nomue proposal.

### Repository operation

1. Start from the exact repository commit containing this instruction and record
   its full SHA in the result.
2. Create a reviewer-owned branch from that commit. Do not work on the package
   branch or `main` directly.
3. Read exactly these research inputs before beginning source work:
   - this file;
   - [`../2026-08-30-counterexample-corpus-v1.md`](../2026-08-30-counterexample-corpus-v1.md);
   - [`../2026-08-30-common-response-template-v1.md`](../2026-08-30-common-response-template-v1.md).
4. If any input is missing, unreadable, or version-ambiguous, write only the
   template's identity check into
   [`2026-08-30-independent-research-result.md`](2026-08-30-independent-research-result.md),
   mark `INPUT_INCOMPLETE`, and stop. Do not reconstruct missing content.
5. Otherwise replace that result placeholder with the complete English report,
   preserving the common template headings.
6. Leave every other repository file unchanged. Format and check the completed
   result with:

   ```bash
   pnpm exec prettier --write evidence/research/foundation-identity/fnd-2/2026-08-30-independent-research-result.md
   pnpm exec markdownlint-cli2 evidence/research/foundation-identity/fnd-2/2026-08-30-independent-research-result.md
   pnpm validate
   ```

7. Commit the single result-file change, push the reviewer branch, and report the
   branch name and full commit SHA to the commissioning steward. Do not open or
   merge a Protocol-adoption change.

## Independence boundary

- Do not read the FND-1 result, whether complete or pending.
- Do not search for or rely on prior nomue research package v1 or v2,
  adversarial reviews, adjudication memoranda, closure records, or unpublished
  conclusions.
- Do not inspect or use Release 2 candidate artifacts as evidence.
- If excluded material is supplied automatically, disclose the exposure and do
  not use it in the evidence or conclusions.
- Another model's answer, search snippets, blogs, and product descriptions are
  not evidence.
- Treat the eight value states, identity tuple, and proposed standards division
  of responsibility as falsifiable hypotheses.

## Scope

### Investigate

Determine the minimum identity and assurance distinctions needed to recompute or
compare analysis data and results, including:

- source snapshot, key, selection, and analysis-population identity;
- cell or value state versus a missingness-mechanism assumption;
- joins, deduplication, imputation, censoring, aggregation, and weighting;
- transformation DAG and execution order;
- PRNG, version, seed, draw order, and execution details for stochastic
  preprocessing;
- output identity and provenance;
- commitments, attestations, and local verification for private data; and
- the roles and possible links among USDM v4.0.0, ARS v1.0, ADaM, PROV-O,
  PROV-CONSTRAINTS, and RO-Crate 1.3.

### Exclude

- Release 2 and its candidate specifications, reviews, implementation, or
  adoption sequence;
- paired-t and t-family numerical-contract work;
- adoption of a particular imputation method or missingness model;
- adoption of a transport or packaging standard;
- public schema or field design, Protocol identifiers, refusal codes, APIs, and
  implementation;
- organization-wide privacy policy or legal-compliance judgment; and
- a universal requirement to disclose raw data.

## Candidate hypotheses to attack

Evaluate each hypothesis as `SUPPORTED`, `PARTIAL`, `CONTRADICTED`, or
`NOT_VERIFIABLE`, then state a corrected narrow form.

1. A blank or generic `missing` value is insufficient; at least the eight
   candidate value states below may need to be distinguished.
2. MCAR, MAR, and MNAR describe assumptions about missingness mechanisms rather
   than cell-level states and belong on a separate axis.
3. An analysis dataset needs identity as an immutable derived entity that links
   source, selection, transformations, execution, and output.
4. None of PROV, RO-Crate, CDISC ARS, USDM, or ADaM alone closes every required
   element of statistical identity.
5. USDM primarily represents study-design and estimand-side concepts, ARS
   primarily represents analysis and result-side concepts, and an explicit
   linking profile may be needed.
6. Private-data evidence needs separate assurance descriptions for attested,
   identity-checked, locally recomputed, and publicly recomputed results rather
   than claiming equivalent guarantees.

## Required research questions

1. What primary-source basis exists for distinguishing each candidate value
   state? Identify which names come from external standards and which are only
   project vocabulary:
   - `observed`;
   - `not_collected`;
   - `structurally_nonexistent`;
   - `not_relevant_to_estimand`;
   - `censored_or_bounded`;
   - `imputed`;
   - `derived`;
   - `excluded`.
2. If a candidate needs to be merged, split, renamed, narrowed, or dropped,
   provide a counterexample and primary evidence.
3. How should MCAR, MAR, MNAR, the handling method, and a sensitivity branch be
   separated from a cell state?
4. Which of source, key, selection, population, missingness, transformation,
   derivation, execution, output, and verification are identity-bearing?
5. Should byte identity and logical dataset identity be separate? Locate the
   boundary for row order, column order, serialization, floating-point spelling,
   and locale.
6. Is a transformation DAG needed instead of an expression string? What minimum
   operation version, parameter, input/output hash, and ordering information is
   needed?
7. For stochastic preprocessing, how far beyond a seed do PRNG identity,
   version, draw order, parallelism, and execution scheduling need to be fixed?
8. Should multiple imputation be represented as one dataset, M derived entities,
   a pooling activity, or another structure? Does a standard state this
   directly?
9. When private raw bytes or hashes cannot be public, what can a commitment,
   attestation, or trusted local verifier establish, and what remains
   unverified?
10. Which USDM v4.0.0 and ARS v1.0 classes and slots could link population,
    condition, variable, summary, intercurrent-event strategy, analysis set,
    method, and result without overstating either standard?
11. Which identity, constraint, and packaging functions belong to PROV-O,
    PROV-CONSTRAINTS, and RO-Crate 1.3, and which statistical semantics remain in
    a separate profile?
12. What inspected version, class/slot/schema scope, and search record are needed
    before asserting that standard X lacks concept Y?

## Counterexample task

Classify all `FND2-01` through `FND2-12` cases in the shared corpus.

- Equal output bytes or values do not erase a provenance difference.
- A physical difference such as row order does not automatically establish a
  logical-identity difference.
- Do not infer absent declarations.
- Use `unresolved` and propose an alternative data-identity taxonomy when the
  provisional relation vocabulary is inadequate.
- Record decisive attributes, primary-source IDs, confidence, missing
  declarations, and the reachable verification or assurance class for every
  case.

Add and analyze two investigator-created cases:

1. multiple imputation represented as M derived entities plus a pooling
   activity, compared with a serious alternative representation; and
2. one private dataset under public recomputation, trusted local recomputation,
   and signed-attestation-only evidence.

## Minimum primary-source and formal-model basis

Inspect at least the following formal text or version-fixed official model:

- ICH E9(R1);
- the formal SPIRIT-CONSORT 2025 material for Items 27b and 27c;
- official CDISC ADaM material;
- the complete CDISC Analysis Results Standard v1.0 logical model, including
  every class and slot relevant to the claims;
- the USDM data dictionary at the official CDISC DDF-RA tag `v4.0.0`;
- the W3C PROV-O Recommendation;
- W3C PROV-CONSTRAINTS;
- the RO-Crate 1.3 specification; and
- additional primary sources on multiple imputation, censoring, missing-value
  semantics, and data provenance.

### Required version-fixed spot checks

1. At DDF-RA tag `v4.0.0`, inspect the official `Estimand` and
   `IntercurrentEvent` definitions. Record whether and where the slots
   `interventions`, `analysisPopulation`, `variableOfInterest`,
   `intercurrentEvents`, `populationSummary`, and `strategy` occur. Do not use
   an earlier main-branch snapshot while labelling it v4.0.0.
2. In ARS v1.0, inspect `Analysis`, `AnalysisSet`, `DataSubset`,
   `GroupingFactor`, `AnalysisMethod`, `Operation`, `OperationResult`, and their
   relevant slots.
3. Any claim that ARS lacks an intercurrent-event strategy, general value-state
   vocabulary, MCAR/MAR/MNAR representation, or imputation PRNG includes an
   absence ledger with version, inspected class/slot scope, search terms, and
   results.
4. A later standard version does not silently replace the fixed v4.0.0 or v1.0
   finding. Record later versions separately as version differences.

For each decision-bearing source, record the complete citation, direct URL,
version or tag, publication date, and a page, section, class, slot, or equivalent
pinpoint. Do not decide model capability from a marketing page. Separate a model
search result from a normative document's direct statement. Keep verbatim
quotation from any one source below 25 words in total.

Separate what a standard represents directly from cross-standard investigator
inference and from any possible future nomue profile. Preserve material
disagreement and version differences rather than resolving them by vote.

## Required result content

Complete the common template, including:

1. identity and input checks;
2. one disposition: `ADVANCE`, `NARROW`, `DEFER`, or `NO_GO`;
3. a versioned primary-source register;
4. a claim-evidence ledger;
5. 12/12 corpus classifications plus the two added cases;
6. an eight-state crosswalk with `KEEP`, `SPLIT`, `MERGE`, `NARROW`, `DROP`, or
   `UNRESOLVED` for each candidate;
7. an analysis-data identity-tuple necessity matrix;
8. a standard capability matrix;
9. a candidate USDM v4.0.0 to ARS v1.0 linking profile;
10. worked examples for a transformation DAG, stochastic preprocessing, and
    multiple imputation;
11. a private-data assurance-class comparison;
12. an absence ledger, falsification attempts, and material disagreements; and
13. required narrowing, unresolved holds, and next evidence.

The report's final line is exactly one of:

`READY FOR FND-2 RESEARCH GATE ADJUDICATION - NOT PROTOCOL ADOPTION`

`NOT READY FOR FND-2 RESEARCH GATE ADJUDICATION - NOT PROTOCOL ADOPTION`

## Provenance and sanitization

- Commissioning context: independent foundational Research Gate pass for FND-2.
- Instruction completion date: 2026-08-30.
- Citing decision record: none; pre-decision research input.
- Sanitization check: complete (2026-08-30, reviewer: research-package
  preparer); remediation performed: none.

The investigator completes the public-artifact and sanitization self-check in
the result before pushing it.
