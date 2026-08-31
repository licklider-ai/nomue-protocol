# FND-1 All-Pairs Successor-Source Closure Commission

**Status: informative research commission; non-normative; not adopted.** This
commission addresses only the successor-source requirement retained after the
narrowed closure of `FND1-H03`. It does not select an all-pairs procedure,
define a method identifier, authorize implementation, close the full FND-1
Research Gate, or affect a release.

## 1. Bounded question

Identify and inspect the correct primary texts for:

1. the Studentized-range all-pairs procedure commonly associated with Tukey;
   and
2. the later unequal-sample-size extension commonly associated with Kramer.

Determine exactly what each inspected text establishes, which assumptions and
guarantees belong to which source, and which later variants must remain
separate. The investigation must not attribute those later procedures to Tukey
(1949), which the completed original-paper pass found does not contain them.

## 2. Baseline and explicit exclusions

The accepted baseline consists of:

- [`2026-08-30-multiplicity-primary-text-closure-result.md`](2026-08-30-multiplicity-primary-text-closure-result.md);
- [`2026-08-30-multiplicity-close-review-result.md`](2026-08-30-multiplicity-close-review-result.md); and
- [`2026-08-31-multiplicity-steward-disposition.md`](2026-08-31-multiplicity-steward-disposition.md).

Those records close `FND1-H03` only in narrowed form and retain this successor
requirement. Their wording is a boundary to test, not permission to infer the
later method from its modern name.

Exclude:

- Holm, Benjamini-Hochberg, and Dunnett re-review except where necessary to
  distinguish families;
- heteroscedastic all-pairs procedures, including Games-Howell, unless a source
  is needed solely to state a boundary;
- selection of an all-pairs default or supported Protocol method;
- numerical implementation, critical-value tables, approximation tolerances,
  or software behavior;
- Release 2, paired-t, and t-family numerical-contract work; and
- public schemas, identifiers, requirement text, APIs, or conformance behavior.

## 3. Two isolated passes

| Pass | Role                                             | Assigned output                                                                                                                | Repository operation                                              |
| ---- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| A    | Independent external primary-source investigator | [`2026-08-31-all-pairs-successor-primary-source-result.md`](2026-08-31-all-pairs-successor-primary-source-result.md)           | None. Return one complete Markdown report to the steward.         |
| B    | Independent repository and attribution analyst   | [`2026-08-31-all-pairs-successor-repository-analysis-result.md`](2026-08-31-all-pairs-successor-repository-analysis-result.md) | Replace only the assigned placeholder on a reviewer-owned branch. |

The passes remain blind to one another until both results are frozen. Neither
pass reads a future reconciliation, unrelated review branches, private
repositories, or Release 2 material.

### 3.1 Pass A inputs

Pass A reads this commission only before beginning source work. It does not
claim a repository write.

### 3.2 Pass B inputs

Pass B reads only this commission and the three baseline records listed in
Section 2. It must not read the Pass A result. Repository-wide text search is
permitted to locate statements containing Tukey, Studentized range, HSD,
all-pairs, Kramer, unequal sample size, balance, or family-wise error, but do
not open Release 2 paths or use them as evidence.

## 4. Access and source-identity rules

- Verify title, author, year, publication status, journal or archival location,
  and stable identifier from the inspected artifact or an authoritative
  bibliographic record.
- Do not assume that a modern eponym identifies one original text or one set of
  assumptions.
- Decision-bearing source claims require full text and a printed-page,
  section, theorem, equation, table, scheme, or paragraph pinpoint.
- If an original source is unpublished, incomplete, unavailable, or only
  indirectly cited, record that fact and determine whether a later primary or
  authoritative formal source can support a narrower claim. Do not silently
  upgrade a secondary account.
- Source inaccessibility does not stop the pass. Complete all accessible work,
  mark affected claims `NOT_VERIFIABLE`, and use `DEFER` when the retained
  requirement cannot be closed.
- Keep quotation from any one source below 25 words in the entire report.

## 5. Candidate source identities to verify, not assume

The investigation must independently resolve:

1. the work commonly cited as Tukey's Studentized-range all-pairs procedure;
2. the work commonly cited as Kramer's unequal-sample-size extension;
3. whether the original procedure and the unequal-size extension are tests,
   simultaneous confidence procedures, or both;
4. whether the name "Tukey HSD" accurately refers to every inspected variant;
   and
5. which later sources, if any, are required for the modern procedure usually
   implemented under that name.

Tukey (1949) remains a comparison source only for proving the historical
boundary already recorded. It is not accepted as the missing successor source.

## 6. Required research questions

1. What exact comparison family is covered: all pairwise mean differences,
   selected pairs, ranges, or another object?
2. What are the assumptions about independence, normality, common variance,
   group balance, sample size, and variance estimation?
3. What simultaneous confidence or family-wise error statement is proved or
   claimed, and under what conditions?
4. Which constants arise from the Studentized-range distribution, and how are
   sidedness and confidence level represented?
5. Does the unequal-size construction prove exact control, conservative
   control, an approximation, or only propose a procedure?
6. Which statements concern a mathematical construction and which concern
   printed tables or computational instruments?
7. What later corrections, refinements, or renamed variants must not be
   attributed to the inspected original texts?
8. Can the public project safely use one historical label for the balanced and
   unequal-size procedures, or must source/variant identity remain explicit?
9. What is the narrowest defensible successor-source statement?
10. Can the retained requirement be closed, narrowed and closed, or must it
    stay open?

## 7. Required claim matrix

For every inspected source, provide one row for each applicable claim:

| Field                     | Required content                                                       |
| ------------------------- | ---------------------------------------------------------------------- |
| Source identity           | Full citation, stable identifier, inspected artifact hash if available |
| Procedure object          | Test, interval, range, contrast family, or table                       |
| Member set                | Exact all-pairs or other comparison set                                |
| Design                    | Balanced, unequal-size, or another design restriction                  |
| Variance model            | Common, separate, known, estimated, or unstated                        |
| Distributional assumption | Exact wording and pinpoint                                             |
| Guarantee                 | Exact, conservative, approximate, conjectural, or not stated           |
| Sidedness                 | One-sided, two-sided, simultaneous intervals, or not applicable        |
| Later-work boundary       | What the source does not establish                                     |
| Evidence status           | Direct, inference, contradicted, or not verifiable                     |

Absence findings must identify the complete page or section range searched and
the search terms used.

## 8. Required result structure

Each pass returns:

1. identity, input, access, and independence checks;
2. one disposition: `ADVANCE`, `NARROW`, `DEFER`, or `NO_GO`;
3. source-discovery and source-identity record;
4. version-fixed primary-source register;
5. atomic claim-evidence ledger;
6. chronology and variant-separation table;
7. the required claim matrix;
8. direct comparison with the Tukey (1949) boundary;
9. overclaim and misattribution attacks;
10. successor-source disposition: `CLOSE`, `NARROW_AND_CLOSE`, or
    `KEEP_OPEN`;
11. residual holds and exact next sources; and
12. public-artifact and sanitization self-check.

## 9. Pass B repository tasks

Pass B must:

1. enumerate every relevant public statement found outside excluded paths;
2. classify each as accurate, too broad, historically misattributed,
   unsupported, or merely a pending research statement;
3. prove that the completed FND1-H03 record remains unchanged and bounded;
4. identify the smallest future repair, if any, without making that repair;
5. distinguish evidence needed for family identity from evidence needed for
   numerical implementation; and
6. produce a closure matrix for the retained successor requirement.

If a fixed input is missing or ambiguous, write only the identity section,
mark `INPUT_INCOMPLETE`, and stop. Source inaccessibility is not
`INPUT_INCOMPLETE`.

## 10. Repository operation for Pass B

1. Create a neutral, task-oriented branch from the exact commission commit.
2. Replace only
   `evidence/research/foundation-identity/fnd-1/2026-08-31-all-pairs-successor-repository-analysis-result.md`.
3. Run:

   ```bash
   pnpm exec prettier --write evidence/research/foundation-identity/fnd-1/2026-08-31-all-pairs-successor-repository-analysis-result.md
   pnpm exec markdownlint-cli2 evidence/research/foundation-identity/fnd-1/2026-08-31-all-pairs-successor-repository-analysis-result.md
   pnpm validate
   ```

4. Commit and push the single-file result. Report the branch name, full commit
   SHA, parent SHA, changed file, validations, disposition, and final line.

Every public name and statement remains neutral and role-based. Do not identify
or imply the drafting or review software, service, provider, or mechanism.

## 11. Handoff and final lines

The steward reconciles the two frozen results. Neither result by itself changes
the existing narrowed disposition.

Pass A ends with exactly one of:

`FND-1 ALL-PAIRS SUCCESSOR PRIMARY-SOURCE PASS COMPLETE - ADVANCE - NOT PROTOCOL ADOPTION`

`FND-1 ALL-PAIRS SUCCESSOR PRIMARY-SOURCE PASS COMPLETE - NARROW - NOT PROTOCOL ADOPTION`

`FND-1 ALL-PAIRS SUCCESSOR PRIMARY-SOURCE PASS COMPLETE - DEFER - NOT PROTOCOL ADOPTION`

`FND-1 ALL-PAIRS SUCCESSOR PRIMARY-SOURCE PASS COMPLETE - NO-GO - NOT PROTOCOL ADOPTION`

Pass B uses the same four alternatives with `REPOSITORY-ANALYSIS PASS` in
place of `PRIMARY-SOURCE PASS`.
