# FND-1 Dual-Pass Independent Research Commission

**Status: informative research commission; non-normative; not adopted.** The
investigation produces Research Gate input. It does not select Protocol fields,
schemas, identifiers, method defaults, implementation behavior, or a release
change.

**Current disposition:** both isolated passes and the bounded multiplicity
primary-text follow-up are complete. The
[`reconciled result`](2026-08-30-independent-research-result.md) remains
accepted as dual-pass, source-bounded FND-1 input with disposition `NARROW`.
The
[`multiplicity steward disposition`](2026-08-31-multiplicity-steward-disposition.md)
closes `FND1-H01` through `FND1-H03` in narrowed form. `FND1-H04` through
`FND1-H08` and the all-pairs successor-source requirement remain open. The full
FND-1 Research Gate remains open, and no Protocol adoption is authorized.

## Active bounded source-closure follow-ups

Two independent, role-based packages now address the source questions that can
advance before corpus expansion or schema design:

| Follow-up                                    | Commission                                                                                                                     | Primary-source result                                                                                                  | Repository-analysis result                                                                                                       |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Non-clinical estimand structure (`FND1-H04`) | [`2026-08-31-nonclinical-estimand-source-closure-commission.md`](2026-08-31-nonclinical-estimand-source-closure-commission.md) | [`2026-08-31-nonclinical-estimand-primary-source-result.md`](2026-08-31-nonclinical-estimand-primary-source-result.md) | [`2026-08-31-nonclinical-estimand-repository-analysis-result.md`](2026-08-31-nonclinical-estimand-repository-analysis-result.md) |
| All-pairs and unequal-size successor sources | [`2026-08-31-all-pairs-successor-source-closure-commission.md`](2026-08-31-all-pairs-successor-source-closure-commission.md)   | [`2026-08-31-all-pairs-successor-primary-source-result.md`](2026-08-31-all-pairs-successor-primary-source-result.md)   | [`2026-08-31-all-pairs-successor-repository-analysis-result.md`](2026-08-31-all-pairs-successor-repository-analysis-result.md)   |

Each package keeps its two passes blind until both outputs are frozen. The
result files are pending placeholders and create no hold closure. `FND1-H05`
through `FND1-H08` remain outside these source-closure packages.

## Completed follow-up: multiplicity primary-text closure

This bounded investigation addressed only `FND1-H01`, `FND1-H02`, and
`FND1-H03` from the reconciled result:

| Stage                        | Commission                                                                                                                 | Result                                                                                                             |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Original-paper investigation | [`2026-08-30-multiplicity-primary-text-closure-commission.md`](2026-08-30-multiplicity-primary-text-closure-commission.md) | [`2026-08-30-multiplicity-primary-text-closure-result.md`](2026-08-30-multiplicity-primary-text-closure-result.md) |
| Repository close review      | [`2026-08-30-multiplicity-close-review-commission.md`](2026-08-30-multiplicity-close-review-commission.md)                 | [`2026-08-30-multiplicity-close-review-result.md`](2026-08-30-multiplicity-close-review-result.md)                 |

The
[`steward disposition`](2026-08-31-multiplicity-steward-disposition.md)
accepts the reviewed source-bounded findings and records the three narrowed
hold closures. Neither stage nor the disposition authorizes Protocol adoption.
The non-clinical vocabulary hold and every other FND-1 hold remain outside this
closure package.

## Completed original execution mode

The original FND-1 scientific question set below remains in force. Its earlier
single-investigator repository procedure is superseded by two isolated passes:

| Pass                             | Entry point                                                                                                    | Assigned result                                                                                                |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Genspark primary-source research | [`2026-08-30-genspark-primary-source-prompt.md`](2026-08-30-genspark-primary-source-prompt.md)                 | [`2026-08-30-genspark-primary-source-result.md`](2026-08-30-genspark-primary-source-result.md)                 |
| Claude Code repository analysis  | [`2026-08-30-claude-code-repository-analysis-prompt.md`](2026-08-30-claude-code-repository-analysis-prompt.md) | [`2026-08-30-claude-code-repository-analysis-result.md`](2026-08-30-claude-code-repository-analysis-result.md) |

The two prompts use the same numbered report sections and table columns so that
their findings can be compared mechanically. During the initial passes, neither
investigator reads the other pass result, the FND-2 result, or prior nomue
adjudication material.

Genspark performs the external primary-source investigation and returns one
complete Markdown report. It does not claim a repository write. Claude Code
performs the repository, corpus, authority, and representation analysis on a
reviewer-owned branch and changes only its assigned result file.

After both passes are complete, the steward compares them, preserves material
disagreement, and records a separate FND-1 disposition. Neither pass alone
replaces the final
[`2026-08-30-independent-research-result.md`](2026-08-30-independent-research-result.md)
or authorizes Protocol adoption.

## Assignment

Act as an independent primary-source investigator and adversarial reviewer with
expertise in statistical methodology, estimands, multiplicity, and research
design. Attempt to break or narrow the candidate hypotheses. Do not search for
support merely to justify a nomue proposal.

### Superseded single-pass repository procedure

The steps in this subsection are retained as provenance for the original
commission. They are not the active execution instructions. Investigators use
only the pass-specific entry points above.

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
   pnpm exec prettier --write evidence/research/foundation-identity/fnd-1/2026-08-30-independent-research-result.md
   pnpm exec markdownlint-cli2 evidence/research/foundation-identity/fnd-1/2026-08-30-independent-research-result.md
   pnpm validate
   ```

7. Commit the single result-file change, push the reviewer branch, and report the
   branch name and full commit SHA to the commissioning steward. Do not open or
   merge a Protocol-adoption change.

## Independence boundary

- Do not read the FND-2 result, whether complete or pending.
- Do not search for or rely on prior nomue research package v1 or v2,
  adversarial reviews, adjudication memoranda, closure records, or unpublished
  conclusions.
- Do not inspect or use Release 2 candidate artifacts as evidence.
- If excluded material is supplied automatically, disclose the exposure and do
  not use it in the evidence or conclusions.
- Another model's answer, search snippets, blogs, and product descriptions are
  not evidence.
- Treat the candidate hypotheses, four relation labels, and candidate attributes
  as falsifiable research hypotheses.

## Scope

### Investigate

Determine the minimum semantic information needed to distinguish results from
different tests, estimators, analysis sets, and hypothesis families as:

- addressing the same estimand or inferential target;
- related but not representable as one combined effect;
- addressing different targets or hypotheses and therefore not comparable; or
- not classifiable or acceptable because declarations are missing,
  contradictory, or selected after results were inspected.

### Exclude

- Release 2 and its candidate specifications, reviews, implementation, or
  adoption sequence;
- paired-t, paired two-condition, and t-family numerical-contract work;
- selection of a default multi-group method;
- concrete adoption of repeated-measures, clustered, longitudinal, factorial,
  or mixed-model methods;
- concrete adoption of survival, causal, Bayesian, or high-dimensional methods;
- public schema or field design, Protocol identifiers, refusal codes, APIs, and
  implementation;
- a meta-analysis method for pooling results from different studies.

An out-of-scope source may be used only to clarify a boundary. Do not continue
from that boundary into an adoption recommendation.

## Candidate hypotheses to attack

Evaluate each hypothesis as `SUPPORTED`, `PARTIAL`, `CONTRADICTED`, or
`NOT_VERIFIABLE`, then state a corrected narrow form.

1. A method name does not identify an estimand; structured identity attributes
   are needed.
2. Routing and admissibility need to be determined from declarations fixed
   before outcome values or result-dependent diagnostics are inspected.
3. A hypothesis family's member set and error criterion, such as FWER or FDR,
   form part of inferential meaning or the protected guarantee boundary.
4. Relations between results can be provisionally classified as `aligned`,
   `parallel_not_combinable`, `not_comparable`, or
   `inadmissible_or_unsupported`.
5. An abstract portion of the ICH E9(R1) estimand structure may be reusable in
   non-clinical or wet-lab settings without importing its clinical-trial and
   intercurrent-event vocabulary verbatim.

## Required research questions

1. Is it necessary to distinguish the same estimand from the same statistical
   inference target?
2. Which candidate attributes are always needed, and which are conditional?
   Address at least:
   - scientific objective and decision role;
   - target population, sampling frame, and unit of analysis;
   - condition, comparator, and assignment semantics;
   - outcome, time origin, assessment window, unit, and scale;
   - missingness, censoring, and intercurrent-event handling;
   - transformation graph;
   - population summary, contrast, direction, and margin;
   - analysis population, exclusions, weights, pairing, and clustering;
   - estimator, test family, uncertainty target, and confidence level;
   - hypothesis family, member set, error criterion, and procedure version.
3. Under which conditions do exact unit conversion, one-to-one transformation,
   and reparameterization preserve identity?
4. What separates primary and sensitivity analyses for one estimand from a
   secondary analysis that targets another estimand?
5. Can internal agreement among effect estimate, confidence interval, test null,
   direction, margin, and multiplicity family be checked formally?
6. In which senses do all-pairs, many-to-one, planned-contrast, omnibus, and
   gatekeeping procedures address different questions or guarantee boundaries?
7. How far can FWER-controlled and FDR-controlled results be compared for the
   same hypothesis set?
8. Which primary sources establish concerns with choosing a procedure after
   inspecting outcomes, p-values, or variance diagnostics?
9. Is the provisional four-relation taxonomy sufficient? Identify overlap,
   omissions, ordering, context dependence, and a better taxonomy if needed.
10. Which ICH E9(R1) concepts are clinical-trial-specific, and which abstract
    structure can be reused in non-clinical or wet-lab research? Inspect at least
    two primary or formal sources outside ICH or oriented toward general or
    non-clinical research.

## Counterexample task

Classify all `FND1-01` through `FND1-12` cases in the shared corpus.

- Do not justify a relation from agreement or proximity of result values.
- Do not infer absent declarations.
- Use `unresolved` and propose an alternative relation when the provisional
  vocabulary is inadequate.
- Record decisive attributes, primary-source IDs, confidence, and missing
  declarations for every case.
- `aligned` does not authorize automatic combination.

Add and analyze two investigator-created cases:

1. a clear primary-analysis and sensitivity-analysis pair that addresses the
   same estimand; and
2. a counterexample called a sensitivity analysis that actually changes the
   estimand.

## Minimum primary-source basis

Inspect the formal or original text of at least the following; secondary sources
do not substitute for them:

- ICH E9(R1);
- the final FDA guidance on multiple endpoints in clinical trials;
- Holm (1979);
- Benjamini and Hochberg (1995);
- Dunnett (1955);
- Tukey (1949);
- the ASA Statement on p-values;
- additional primary sources on sensitivity analysis, estimand alignment, and
  data-dependent method selection; and
- at least two formal or primary sources applicable outside ICH or to general or
  non-clinical research.

For each decision-bearing source, record the complete citation, DOI or direct
URL, version, publication date, and a page, section, theorem, or equivalent
pinpoint. If the full primary text cannot be reached, mark the relevant claim
`NOT_VERIFIABLE`; do not promote an abstract or secondary summary into a direct
fact. Keep verbatim quotation from any one source below 25 words in total.

Separate what a source states directly from cross-source investigator inference
and from any possible future nomue convention. Preserve material disagreement
rather than resolving it by vote.

## Required result content

The requirements below govern the final reconciled FND-1 research result. Each
initial pass instead follows the aligned report contract embedded in its own
entry point. Neither initial investigator edits the final result file.

Complete the common template, including:

1. identity and input checks;
2. one disposition: `ADVANCE`, `NARROW`, `DEFER`, or `NO_GO`;
3. a versioned primary-source register;
4. a claim-evidence ledger;
5. 12/12 corpus classifications plus the two added cases;
6. a candidate identity-attribute matrix;
7. candidate inference internal-consistency rules;
8. a multiplicity-family catalogue;
9. a boundary table separating ICH clinical language from potentially reusable
   abstract structure;
10. falsification attempts and material disagreements; and
11. required narrowing, unresolved holds, and next evidence.

The report's final line is exactly one of:

`READY FOR FND-1 RESEARCH GATE ADJUDICATION - NOT PROTOCOL ADOPTION`

`NOT READY FOR FND-1 RESEARCH GATE ADJUDICATION - NOT PROTOCOL ADOPTION`

## Provenance and sanitization

- Commissioning context: independent foundational Research Gate pass for FND-1.
- Instruction completion date: 2026-08-30.
- Citing decision record: none; pre-decision research input.
- Sanitization check: complete (2026-08-30, reviewer: research-package
  preparer); remediation performed: none.

The investigator completes the public-artifact and sanitization self-check in
the result before pushing it.
