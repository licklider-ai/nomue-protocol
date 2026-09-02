# FND-1 Potential-Outcomes Lineage Close-Review Commission

**Status: informative close-review commission; non-normative; not adopted.**
This commission reviews only the completed potential-outcomes lineage result
retained under `FND1-H04` / `H04-S1`. It does not perform a new lineage pass,
adopt Protocol vocabulary, authorize implementation, close `FND1-H04` or the
full FND-1 Research Gate, or affect a release.

## 1. Fixed identity

The review target is fixed as follows:

| Item                          | Fixed value                                                                                                        |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Result path                   | `evidence/research/foundation-identity/fnd-1/2026-09-02-nonclinical-estimand-potential-outcomes-lineage-result.md` |
| Result commit                 | `9340ab34321618403a309e536c34aad4ba996897`                                                                         |
| Intake merge                  | `ad0943144838c433df9ce17d08a03ba61a1e2e9a`                                                                         |
| Result blob                   | `510e4fc6ec85f958da9ce9228ce292f411c9983f`                                                                         |
| Result SHA-256                | `b928ebf2f53ef0f5338a0561f8a89bcdd8024f0101ef60f5465e2ab2088daee7`                                                 |
| Result length                 | 268 lines after repository formatting                                                                              |
| Recorded research disposition | `NARROW`                                                                                                           |
| Proposed sub-hold disposition | `H04-S1: NARROW_AND_CLOSE`                                                                                         |

Before substantive review, independently verify every commit, ancestry, path,
blob, SHA-256, line count, and disposition above. Confirm that the result blob
is byte-identical at the result commit, intake merge, review execution base,
and current review branch. If any identity fails, report `INPUT_INCOMPLETE`
and stop.

The result discloses an earlier same-role draft that was repaired after a
Rubin artifact became available. That superseded draft is not a repository
input to this review. Do not reconstruct it or claim to verify the repair
history. Review only the frozen result identified above.

## 2. Permitted repository inputs and exclusions

Read only these repository documents, plus this commission and its assigned
result placeholder:

1. the original
   [potential-outcomes lineage commission](2026-09-02-nonclinical-estimand-potential-outcomes-lineage-commission.md),
   blob `ef1cd2b0120123c7c35d0a0542302aac4693117f`;
2. the bounded
   [completion steward disposition](2026-09-02-nonclinical-estimand-completion-steward-disposition.md),
   blob `3b100162c64dbb079eb969effd26ceef847fea5c`, used only for
   the accepted boundary and exact residual; and
3. the frozen
   [potential-outcomes lineage result](2026-09-02-nonclinical-estimand-potential-outcomes-lineage-result.md),
   blob `510e4fc6ec85f958da9ce9228ce292f411c9983f`.

Repository-level operating instructions required by `AGENTS.md` may be read
solely to govern repository operations. They are not substantive review inputs,
must not be used as source-content evidence, and do not expand the research
scope fixed above.

Do not read the animal-endpoint commission or result, any later reconciliation
or disposition, earlier non-clinical estimand results or reviews, FND-2
results, unrelated review branches, private repositories, or Release 2,
paired-t, and t-family numerical-contract material. Do not use another review
or another investigator's summary as source-content evidence.

This is a close-only review. Do not expand the source list to establish later
SUTVA, no-interference, treatment-version, or modern target-quantity lineage.
A source outside the three mandatory artifacts below may be opened only to
resolve the bibliographic identity or rendition relationship of one mandatory
artifact.

The reviewer must be independent of the source pass that produced the frozen
result. Disclose prior exposure. Prior authorship of the frozen result is an
independence failure for this commission.

## 3. Mandatory source-access gate

The review verifies source content rather than merely repository bookkeeping.
Directly inspect the exact three artifacts recorded by the result.

### 3.1 PO-01 — Neyman translation

- Splawa-Neyman, Dabrowska, and Speed (1990), “On the Application of
  Probability Theory to Agricultural Experiments. Essay on Principles.
  Section 9,” _Statistical Science_ 5(4), pp. 465–472;
- DOI `10.1214/ss/1177012031`;
- expected artifact SHA-256
  `03ae590248dafc54bdc0e6ec509a83eea4ea210646995e3469c653982dd79047`;
- expected byte size `2,007,596` and PDF page count `9`; and
- inspected authorial range: printed pp. 465–472, excluding Rubin's
  accompanying Comment as evidence.

### 3.2 PO-02 — Rubin 1974

- Rubin (1974), “Estimating Causal Effects of Treatments in Randomized and
  Nonrandomized Studies,” _Journal of Educational Psychology_ 66(5),
  pp. 688–701;
- DOI `10.1037/h0037350`; ERIC `EJ118470`;
- expected artifact SHA-256
  `e0fa8701ba613f01a0de321775e9793597aae5c9084fcbd8b9539cd8272321fa`;
- expected byte size `1,274,918` and PDF page count `14`; and
- expected rendition boundary: a bibliographically verified modern
  publisher rendition classified as `ARTIFACT_VARIANT`, not asserted to be a
  first-generation scan.

### 3.3 PO-03 — Holland 1986

- Holland (1986), “Statistics and Causal Inference,” _Journal of the American
  Statistical Association_ 81(396), pp. 945–960;
- DOI `10.1080/01621459.1986.10478354`; JSTOR stable `2289064`;
- expected artifact SHA-256
  `3c2fd027c19353bdb28972045d8b44225b6895db1d2ced685b41a11619248c6c`;
- expected byte size `2,577,683` and PDF page count `17`; and
- expected map: JSTOR cover at PDF p. 1 and printed pp. 945–960 at PDF
  pp. 2–17.

For each artifact, recompute SHA-256 and byte size before reading. Record PDF
page count, printed-page map, access date, text-layer condition, and any image
inspection needed for formulas, symbols, footnotes, or editorial brackets.
An authenticated artifact with different bytes is `ARTIFACT_VARIANT`; it may
help resolve source identity but cannot verify the frozen result's exact
artifact, byte count, or page map.

### 3.4 Failure rule

Search results, snippets, abstracts, bibliographic records, prior reports, and
memory cannot replace a mandatory artifact. If any exact artifact cannot be
inspected completely enough to test its load-bearing claims, return only:

1. the completed repository identity check;
2. the artifact hashes available and the access attempts;
3. `SOURCE_ACCESS_INCOMPLETE`; and
4. the exact missing artifact needed for rerun.

In that case, do not issue `GO` or `NO_GO`, do not modify the repository, and
do not infer the inaccessible text.

## 4. Review question

Determine whether the frozen result is accurate, reproducible, properly
bounded, and eligible for later steward reconciliation of `H04-S1` with the
separate `H04-S4` result.

The review does not decide whether the candidate structure becomes Protocol
meaning. It does not close `H04-S1` itself. It checks whether the proposed
`NARROW_AND_CLOSE` disposition is supported on the commission's exact source
scope and whether all narrowing conditions are correctly preserved.

## 5. Required adversarial source checks

### 5.1 PO-01 identity, range, and load-bearing claims

Verify and try to falsify:

1. the artifact is the 1990 English translation of the identified Section 9,
   not the complete 1923 monograph;
2. the result's printed-to-PDF map, including the page occupied by Figure 1;
3. N1 through N8: plot bearer, finite plot set, variety index, yield object,
   single-variety mean, two-variety contrast, urn assignment, estimator, and
   variance formula;
4. whether the single-variety mean used in N6 is directly a target quantity,
   merely a finite-population quantity, or only an estimator-side object;
5. N9 and N10: the bounded absence findings for later terminology and an
   explicit assessment-occasion index;
6. whether “unit-treatment additivity” is editorial rather than authorial and
   whether the result's retained-verbatim count is exact; and
7. whether any statement from Rubin's accompanying Comment leaks into the
   reported evidence.

### 5.2 PO-02 symbols, target sets, and assumptions

Verify and try to falsify:

1. R1 through R7: the definition of a trial, `t1` and `t2`, `E` and `C`,
   `y(E)` and `y(C)`, the per-trial contrast, and the choice of arithmetic
   mean;
2. R8 and R9: Greek lowercase `τ` on printed p. 692 and capital Latin `T` on
   printed p. 697 are distinct symbols for distinct target unit sets;
3. the reported parenthetical distinction between unbiasedness for `T` and
   for `τ`;
4. R10 through R12: estimator, allocation, significance-level, covariate, and
   assumed-random-assignment or sampling claims at their exact evidence
   grades;
5. R13: whether the paper truly supplies no non-contrastive target on the
   inspected scope; and
6. R14 and R15: whether the result correctly separates per-trial exclusivity
   and covariate invariance from between-units no-interference,
   treatment-version, SUTVA, and a modern general “target quantity” category.

### 5.3 PO-03 terminology, assumptions, and absence claims

Verify and try to falsify:

1. H1 through H7 and H10 through H12 at the reported sections, equations, and
   pages;
2. the exact names and mathematical roles of every assumption that the result
   paraphrases as response identity, time invariance, non-carryover,
   assignment independence, or identical per-unit effects;
3. H8 across the complete printed pp. 945–960: whether the paper names or
   defines SUTVA, stable-unit-treatment-value, no-interference, consistency,
   or treatment-version concepts in any wording;
4. whether absence of a later term is incorrectly presented as absence of its
   underlying concept;
5. whether the result confuses assignment independence with between-unit
   no-interference; and
6. H13: the boundary between Holland's own quantities and a possible modern
   project mapping to “target quantity.”

### 5.4 Cross-source and disposition attacks

Check:

1. every `VERIFIED_DIRECT` row has a reproducible printed-page and element
   anchor in its own source;
2. source statements, cross-source inference, and possible project convention
   remain separate;
3. chronology does not backdate Holland's language onto Neyman or Rubin;
4. source count is never treated as a vote;
5. all nine target-element rows are supported at the grade recorded, including
   the assessment-occasion and comparison-direction rows required for
   `H04-S1` closure;
6. the seven falsification cases distinguish target-identity effects from
   estimator effects and never use numerical agreement as identity;
7. the interference and multiple-version cases do not upgrade a constructed
   extension into a direct source claim;
8. the retained-verbatim audit is complete and each source remains below
   25 words;
9. the exact residual list does not undermine the bounded
   `NARROW_AND_CLOSE` proposal; and
10. the report makes no Protocol, schema, method, implementation, release, or
    full-gate decision.

## 6. Closure matrix

Record `PASS` or `FAIL` with concise evidence for every row:

| Check | Requirement                                                                                                                                                           |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| C-01  | All fixed repository identities, ancestry, blob, SHA-256, line count, and dispositions match.                                                                         |
| C-02  | Only permitted repository inputs and the three exact source artifacts were used; independence and exclusions are adequate.                                            |
| C-03  | The result preserves the commissioned twelve-section structure, allowed status vocabulary, one research disposition, one sub-hold proposal, and exact final line.     |
| C-04  | PO-01 identity, translation boundary, authorial range, page map, text/image checks, and editorial-note separation are reproducible.                                   |
| C-05  | PO-01 supports N1 through N11 at the recorded grades without treating an estimator-side quantity or later comment as stronger evidence.                               |
| C-06  | PO-02 identity, artifact-variant boundary, page map, and the `τ` versus `T` distinction are accurate and reproducible.                                                |
| C-07  | PO-02 supports R1 through R15 at the recorded grades without converting per-trial conditions into no-interference or treatment-version conditions.                    |
| C-08  | PO-03 identity, page map, assumption names, equations, and complete-scope terminology checks are accurate and reproducible.                                           |
| C-09  | PO-03 supports H1 through H13 at the recorded grades, including every absence claim and its absence-of-term versus absence-of-concept boundary.                       |
| C-10  | The target-element matrix, chronology, falsification cases, material disagreements, and cross-source synthesis stay within the three sources' actual support.         |
| C-11  | Direct evidence satisfies the original `H04-S1` closure threshold in at least two independent texts for every required target element, with all narrowing notes kept. |
| C-12  | `NARROW / NARROW_AND_CLOSE` is the only recorded proposal; no Protocol adoption, `FND1-H04` closure, full Research Gate closure, or release decision appears.         |

A check is `PASS` only when the inspected artifact and frozen repository
record support it. Agreement with the result is not enough.

## 7. Findings and verdict

Classify each finding:

- **BLOCKER:** a false or materially overstated source claim, unlocatable
  load-bearing evidence, incorrect evidence grade, invalid source identity,
  unsupported sub-hold closure proposal, scope breach, or disposition error;
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

`GO` never means Protocol adoption, `H04-S1` closure, `FND1-H04` closure,
implementation approval, or release approval.

## 8. Required result

Replace only
`evidence/research/foundation-identity/fnd-1/2026-09-02-nonclinical-estimand-potential-outcomes-lineage-close-review-result.md`
with one English Markdown report containing, in order:

1. identity, input, access, artifact, and independence checks;
2. source-artifact, rendition, and page-map checks;
3. C-01 through C-12 closure matrix;
4. findings by severity;
5. source-by-source ruling for N1–N11, R1–R15, and H1–H13;
6. target-element, chronology, falsification, and quote-budget rulings;
7. proposed `H04-S1` disposition and governance-boundary assessment;
8. residuals and exact repair instructions, if any; and
9. final verdict and handoff statement.

For `GO`, end with exactly:

`READY FOR FND-1 POTENTIAL-OUTCOMES LINEAGE STEWARD RECONCILIATION - NOT PROTOCOL ADOPTION`

For `NO_GO`, end with exactly:

`NOT READY FOR FND-1 POTENTIAL-OUTCOMES LINEAGE STEWARD RECONCILIATION - NOT PROTOCOL ADOPTION`

## 9. Repository operation

1. Start from the exact commit containing this commission and record its full
   SHA.
2. Create a neutral, task-oriented branch from that commit.
3. Read only the inputs in Section 2 and inspect only the source scope in
   Section 3.
4. Replace only the assigned result placeholder.
5. Run:

   ```bash
   pnpm exec prettier --write evidence/research/foundation-identity/fnd-1/2026-09-02-nonclinical-estimand-potential-outcomes-lineage-close-review-result.md
   pnpm exec markdownlint-cli2 evidence/research/foundation-identity/fnd-1/2026-09-02-nonclinical-estimand-potential-outcomes-lineage-close-review-result.md
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

- expand the lineage beyond the three mandatory texts;
- adopt a causal, cross-domain estimand, SUTVA, interference, consistency, or
  treatment-version vocabulary;
- select a causal estimator, design, missing-data method, or sensitivity
  method;
- define a Record field, schema, identifier, vocabulary term, reason code,
  public check, conformance rule, API, or implementation;
- close `H04-S1`, `H04-S4`, `FND1-H04` through `FND1-H08`, the full FND-1
  Research Gate, or any release gate; or
- affect Release 2, paired-t, or t-family numerical-contract work.
