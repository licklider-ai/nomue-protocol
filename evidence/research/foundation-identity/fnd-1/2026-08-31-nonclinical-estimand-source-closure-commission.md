# FND-1 Non-Clinical Estimand Source-Closure Commission

**Status: informative research commission; non-normative; not adopted.** This
commission addresses only `FND1-H04`. It does not define Protocol vocabulary,
select a schema, authorize implementation, close the full FND-1 Research Gate,
or affect a release.

## 1. Bounded question

Determine which parts of an estimand description can be reused outside clinical
trials, particularly in general experimental, animal, assay, and wet-lab
research, without importing clinical intercurrent-event terminology or implying
that one vocabulary fits every domain.

The candidate proposition to attack is:

> A reusable abstract scaffold may distinguish population, condition or
> exposure, outcome and timing, event or missing-outcome handling, and
> population-level summary, while domain-specific event categories and handling
> strategies remain separate.

The investigation decides whether this proposition survives, how it must be
narrowed, and whether `FND1-H04` can be closed in a bounded form.

## 2. Baseline and explicit exclusions

The accepted baseline is the source-bounded FND-1 reconciliation at
[`2026-08-30-independent-research-result.md`](2026-08-30-independent-research-result.md).
Its E/P/H/M/D/V decomposition, candidate event-handling language, and hold
wording are hypotheses to test, not adopted terminology.

Exclude:

- every Release 2 artifact, review, implementation, and decision;
- paired-t and t-family numerical-contract work;
- selection of a statistical method, missing-data method, or causal estimator;
- public fields, schemas, identifiers, vocabularies, reason codes, APIs, and
  implementation;
- a universal taxonomy for every scientific domain; and
- legal, regulatory-compliance, or clinical-development judgments.

## 3. Two isolated passes

The passes are performed in separate contexts and remain blind to one another
until both results are frozen.

| Pass | Role                                              | Assigned output                                                                                                                  | Repository operation                                              |
| ---- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| A    | Independent external primary-source investigator  | [`2026-08-31-nonclinical-estimand-primary-source-result.md`](2026-08-31-nonclinical-estimand-primary-source-result.md)           | None. Return one complete Markdown report to the steward.         |
| B    | Independent repository and representation analyst | [`2026-08-31-nonclinical-estimand-repository-analysis-result.md`](2026-08-31-nonclinical-estimand-repository-analysis-result.md) | Replace only the assigned placeholder on a reviewer-owned branch. |

Neither pass reads the other pass result, a future reconciliation, unrelated
review branches, unpublished conclusions, or private repositories. General
background knowledge is disclosed but is not evidence.

### 3.1 Pass A inputs

Pass A reads this commission only before beginning source work. The commission
contains the complete question and candidate proposition. The investigator does
not need repository access and must not claim a repository write.

### 3.2 Pass B inputs

Pass B starts from the exact commit containing this commission and reads only:

1. this commission;
2. [`2026-08-30-independent-research-result.md`](2026-08-30-independent-research-result.md);
3. [`2026-08-31-multiplicity-steward-disposition.md`](2026-08-31-multiplicity-steward-disposition.md);
4. [`../2026-08-30-counterexample-corpus-v1.md`](../2026-08-30-counterexample-corpus-v1.md); and
5. [`../2026-08-30-common-response-template-v1.md`](../2026-08-30-common-response-template-v1.md).

It must not read the Pass A result. Repository-wide text search is permitted
only to locate public statements relevant to this bounded question. Do not open
Release 2 paths or use them as evidence.

## 4. Access and evidence rules

- Decision-bearing source claims require full primary or formal text with a
  page, section, theorem, definition, table, class, or equivalent pinpoint.
- Search snippets, abstracts, blogs, product descriptions, and another report
  are discovery aids only.
- An inaccessible source does not stop the entire pass. Record the access
  attempt, mark only the affected claim `NOT_VERIFIABLE`, complete all remaining
  work, and return `DEFER` if the missing text prevents closure.
- Distinguish `VERIFIED_DIRECT`, `CROSS_SOURCE_INFERENCE`,
  `POSSIBLE_PROJECT_CONVENTION`, `CONTRADICTED`, and `NOT_VERIFIABLE`.
- Bound every absence claim to the exact version and inspected scope.
- Keep verbatim quotation from any one source below 25 words in the whole
  report.

## 5. Minimum source basis for Pass A

Inspect, where accessible:

1. the full ICH E9(R1) text as the clinical reference point;
2. at least two formal or primary sources that define estimands, target
   quantities, or treatment/exposure effects outside the ICH clinical-trial
   vocabulary;
3. at least two formal or primary sources applicable to non-clinical,
   laboratory, animal, assay, or general experimental research;
4. primary or formal sources addressing missing outcomes, censoring or
   detection limits, post-assignment events, treatment or condition changes,
   protocol deviations, or terminal events outside a purely clinical framing;
   and
5. any nearest source that contradicts the proposed reusable scaffold.

Do not treat clinical guidance as direct evidence that its strategy names apply
verbatim outside clinical trials. Do not treat a non-clinical reporting
checklist as if it defined an estimand unless its text actually does so.

## 6. Required research questions

1. Which attributes are genuinely domain-neutral: target population, condition
   or exposure, outcome, time origin or assessment window, summary, contrast,
   or another element?
2. Which ICH E9(R1) concepts are inseparable from clinical treatment and
   intercurrent-event language?
3. What are the correct bearers of the relevant facts: unit, observation,
   outcome, analysis population, estimand, event, or procedure?
4. Can dropout, condition switching, protocol deviation, censoring, below-limit
   observations, terminal events, and structurally impossible outcomes share
   one abstract category without erasing material distinctions?
5. Does an event-handling attribute belong to estimand identity in every
   domain, only conditionally, or not at all?
6. When does changing event or missing-outcome handling change the estimand,
   and when does it change only the inference procedure?
7. Which declarations can be checked structurally, and which remain scientific
   assumptions or externally attributed facts?
8. Is the candidate phrase "condition-transition and missing-outcome handling"
   useful, overbroad, category-mistaken, or already occupied by a better formal
   concept?
9. What minimum counterexample defeats any proposed universal mapping?
10. What exact narrow statement, if any, is strong enough to close
    `FND1-H04`?

## 7. Required counterexamples

Both passes analyze at least six value-independent cases spanning no fewer than
four domains. Include:

- an assay observation below a detection or quantification limit;
- a subject or experimental unit that never reaches an applicable measurement
  time;
- a condition or exposure change after assignment;
- a terminal event that makes a later outcome structurally impossible;
- an observation that is missing while the outcome remains conceptually
  defined; and
- a case where the same datum is relevant to one estimand and irrelevant to
  another.

For each case, record the domain, bearer, time relation, estimand effect,
procedure effect, missing declaration, evidence basis, and whether a proposed
cross-domain term loses information. Numerical agreement never establishes
semantic identity.

## 8. Required result structure

Each pass returns the same numbered sections:

1. identity, input, access, and independence checks;
2. one disposition: `ADVANCE`, `NARROW`, `DEFER`, or `NO_GO`;
3. search method and version-fixed source register;
4. atomic claim-evidence ledger;
5. clinical-specific versus reusable-structure matrix;
6. six-or-more counterexample classifications;
7. candidate attribute and bearer matrix;
8. candidate vocabulary attack, including rejected terms;
9. falsification attempts, disagreements, and scoped absence claims;
10. `FND1-H04` disposition: `CLOSE`, `NARROW_AND_CLOSE`, or `KEEP_OPEN`;
11. residual holds and next evidence; and
12. public-artifact and sanitization self-check.

The report must state separately:

- what a source says;
- what follows by cross-source inference;
- what could only be a future project convention; and
- what remains unknown.

## 9. Pass B repository tasks

In addition to Sections 1 through 12, Pass B must:

1. test every proposed reusable attribute against the existing FND-1 corpus and
   E/P/H/M/D/V decomposition;
2. identify any current public statement that imports clinical terminology too
   broadly, with its exact path and line;
3. determine whether the six required cases can be expressed without adding a
   public schema;
4. produce a closure matrix mapping each `FND1-H04` question to direct evidence,
   inference, contradiction, or unresolved source need; and
5. leave all Protocol and authority decisions to later reconciliation.

If the fixed inputs are missing or ambiguous, write only the identity section,
mark `INPUT_INCOMPLETE`, and stop. Source inaccessibility is not
`INPUT_INCOMPLETE`.

## 10. Repository operation for Pass B

1. Create a neutral, task-oriented branch from the exact commission commit.
2. Replace only
   `evidence/research/foundation-identity/fnd-1/2026-08-31-nonclinical-estimand-repository-analysis-result.md`.
3. Run:

   ```bash
   pnpm exec prettier --write evidence/research/foundation-identity/fnd-1/2026-08-31-nonclinical-estimand-repository-analysis-result.md
   pnpm exec markdownlint-cli2 evidence/research/foundation-identity/fnd-1/2026-08-31-nonclinical-estimand-repository-analysis-result.md
   pnpm validate
   ```

4. Commit and push the single-file result change. Report the branch name, full
   commit SHA, parent SHA, changed file, validation results, disposition, and
   final readiness line.

Public branch names, filenames, commit messages, and report prose identify only
the research role and task. They do not identify or imply the drafting or review
software, service, provider, or mechanism.

## 11. Handoff and final lines

The steward reconciles the two frozen results later and preserves material
disagreement. Neither pass result closes the hold by itself.

Pass A ends with exactly one of:

`FND-1 NON-CLINICAL ESTIMAND PRIMARY-SOURCE PASS COMPLETE - ADVANCE - NOT PROTOCOL ADOPTION`

`FND-1 NON-CLINICAL ESTIMAND PRIMARY-SOURCE PASS COMPLETE - NARROW - NOT PROTOCOL ADOPTION`

`FND-1 NON-CLINICAL ESTIMAND PRIMARY-SOURCE PASS COMPLETE - DEFER - NOT PROTOCOL ADOPTION`

`FND-1 NON-CLINICAL ESTIMAND PRIMARY-SOURCE PASS COMPLETE - NO-GO - NOT PROTOCOL ADOPTION`

Pass B uses the same four alternatives with `REPOSITORY-ANALYSIS PASS` in
place of `PRIMARY-SOURCE PASS`.
