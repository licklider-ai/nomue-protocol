# FND-1 Non-Clinical Estimand Animal-Endpoint Source Commission

**Status: informative primary-source commission; non-normative; not adopted.**
This commission addresses only the non-clinical animal and humane-endpoint
residual retained under `FND1-H04` and `H04-S4`. It does not define Protocol
vocabulary, select an animal-study or statistical method, authorize
implementation, close the full FND-1 Research Gate, or affect a release.

## 1. Bounded purpose

Directly inspect non-clinical experimental or formal animal-study sources that
address humane or terminal endpoints, post-assignment changes in animal
condition, early removal or euthanasia, and planned measurements prevented by
an event. Determine which facts the sources actually distinguish and which
cross-domain interpretations remain unsupported.

Attack, narrow, or reject the candidate that the following facts require
separate bearers:

1. assigned experimental condition;
2. realized condition or welfare trajectory over time;
3. humane or terminal event and its time;
4. whether a scheduled outcome still exists conceptually;
5. whether an observation was obtained, bounded, or absent; and
6. whether a handling choice changes the scientific target or only the study
   procedure.

The pass must not import ICH E9(R1) strategy names, treat animal-welfare
guidance as statistical estimand authority, or infer a hidden outcome after
euthanasia unless the inspected source defines one.

## 2. Fixed research state and permitted inputs

The execution base is the exact repository commit containing this commission.
Record its full SHA before source work.

Read only:

1. this commission; and
2. the bounded
   [`FND1-H04` completion steward disposition](2026-09-02-nonclinical-estimand-completion-steward-disposition.md),
   used only to identify the accepted boundary and exact residual.

Do not read the companion potential-outcomes result, any later reconciliation
or review, the earlier primary-source completion result, repository-analysis
results, FND-2 results, review branches, private repositories, or Release 2,
paired-t, or t-family numerical-contract material.

This is an independent source-completion role. Disclose prior exposure.
Background knowledge and search indexes may guide retrieval but are not
evidence.

## 3. Mandatory and priority source set

Inspect the complete text of `AE-01` and `AE-03`. Inspect `AE-02` when a
bibliographically authenticated full text is available. If `AE-02` cannot be
obtained, inspect one controlling official replacement that covers the same
general endpoint-selection role and document why it is the nearer source.

| Source ID | Required or priority source                                                                                                                                                                                    | Stable identity                                                                                      | Intended role                                                                                           |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `AE-01`   | OECD (2002), _Guidance Document on the Recognition, Assessment and Use of Clinical Signs as Humane Endpoints for Experimental Animals Used in Safety Evaluation_, OECD Series on Testing and Assessment No. 19 | DOI `10.1787/9789264078376-en`; 39 pages                                                             | Official safety-evaluation guidance; endpoint recognition, timing, action, and study-objective boundary |
| `AE-02`   | Canadian Council on Animal Care (1998), _Guidelines on: Choosing an Appropriate Endpoint in Experiments Using Animals for Research, Teaching and Testing_                                                      | Official CCAC title; approximately 30 pages; authenticated supplied file or official route preferred | General formal endpoint-selection guidance across non-clinical applications                             |
| `AE-03`   | Workman, P. et al. (2010), “Guidelines for the Welfare and Use of Animals in Cancer Research,” _British Journal of Cancer_ 102(11)                                                                             | DOI `10.1038/sj.bjc.6605642`; PMCID `PMC2883160`; pp. 1555–1577                                      | Domain-specific full-text guidance linking humane endpoints, study design, and scientific outcomes      |

At least one additional primary or formal source may be inspected when needed
to attack a boundary. Priority leads include:

- Morton, D. B. (2000), “A Systematic Approach for Establishing Humane
  Endpoints,” _ILAR Journal_ 41(2), pp. 80–86, DOI
  `10.1093/ilar.41.2.80`; and
- Toth, L. A. (2000), “Defining the Moribund Condition as an Experimental
  Endpoint for Animal Research,” _ILAR Journal_ 41(2), pp. 72–79, DOI
  `10.1093/ilar.41.2.72`.

A catalog record, abstract, institutional summary, or later citation does not
substitute for the controlling full text. If a mandatory route fails, complete
every accessible source, record the failure, mark only affected claims
`NOT_VERIFIABLE`, and produce an exact acquisition list.

## 4. Artifact, version, and access discipline

For every decision-bearing source:

1. verify the complete citation and issuing body against the inspected
   artifact;
2. record the DOI or stable URL, host, issue or adoption date, access date,
   source class, and inspected edition or rendition;
3. when a file is supplied, compute SHA-256 before reading and record the byte
   size, total PDF pages, printed-page range, and printed-to-PDF page map;
4. inspect page images where tables, scoring criteria, symbols, or footnotes are
   degraded in the text layer;
5. give a printed page plus a section, table, checklist, paragraph, or other
   element locator for every decision-bearing claim; and
6. keep quotation from any one source below 25 words in the whole report.

Do not publish source files, credentials, access tokens, or non-redistributable
content. Search snippets and abstracts are discovery aids only.

An artifact mismatch is `ARTIFACT_VARIANT`, not automatic corruption or
equivalence. Resolve the identity and inspected range before making an absence
claim.

## 5. Required source tests

Answer each question separately for each source:

1. How does the source define a humane, experimental, terminal, or intervention
   endpoint? Keep welfare endpoints distinct from statistical endpoints.
2. What object bears the relevant fact: animal, observation, assigned protocol,
   clinical-sign record, study arm, or another object?
3. Which event or condition triggers supportive treatment, removal, termination
   of a procedure, or euthanasia, and how is its time recorded?
4. Does the source distinguish assigned experimental condition from the
   animal's realized health or welfare trajectory?
5. What planned measurements, outcomes, or scientific objectives may be
   affected when the endpoint is reached early?
6. Does the source define a post-event outcome as conceptually existing,
   unobserved, prevented, undefined, or not discussed? Do not supply a category
   that the source does not support.
7. Does the source distinguish a missing observation from an observation
   prevented by removal or euthanasia?
8. Which endpoint or intervention choices affect study design or scientific
   objectives, and which merely specify monitoring or welfare action?
9. What is fixed before the experiment, what may be revised from pilot evidence,
   and what is triggered by the realized animal state?
10. Does the source use any ICH E9(R1) strategy name in that strategy sense?
    Record raw hit counts and classify every hit by meaning rather than
    reporting the raw term as absent.

For question 10, search at least these word-boundary terms and phrases in each
complete inspected text: `ICH`, `E9`, `intercurrent`, `estimand`, `treatment
policy`, `hypothetical`, `composite`, `while-on-treatment`, `principal stratum`,
and `principal stratification`. State the version and inspected range.

## 6. Required bearer and event matrix

For each source, classify direct support for:

1. assigned condition — bearer: experimental unit or assignment record;
2. realized condition trajectory — bearer: animal over time;
3. humane or terminal event — bearer: event attached to animal and time;
4. outcome-existence status — bearer: animal × scheduled occasion;
5. observation-information state — bearer: observation;
6. analysis-set membership — bearer: animal relative to an analysis;
7. datum relevance — bearer: `(datum, target)` relation; and
8. mechanism assumption — bearer: analysis procedure.

Use exactly one evidence grade per cell: `DEFINED_DIRECTLY`,
`CROSS_SOURCE_INFERENCE`, `ABSENT_IN_INSPECTED_SCOPE`, `CONTRADICTED`, or
`NOT_VERIFIABLE`. The candidate bearer labels are hypotheses, not source facts.

## 7. Required falsification cases

Apply the inspected evidence to at least these seven value-independent cases:

1. an animal reaches a prespecified humane endpoint before a scheduled assay;
2. an animal receives supportive treatment and remains in the study;
3. euthanasia occurs immediately after the final planned measurement;
4. an animal is found dead before the next scheduled observation;
5. a scheduled observation is absent because of equipment failure while the
   animal remains alive;
6. two studies record the same endpoint time but use different prespecified
   trigger rules; and
7. the same welfare event is relevant to one scientific target but not another.

For each case record the domain, bearer, assignment, realized trajectory,
event and time, outcome-existence status, observation state, target effect,
procedure effect, source IDs, missing declarations, and whether the candidate
survives. Numerical equality never establishes semantic identity.

Add at least one investigator-created counterexample aimed at collapsing two
candidate bearers or showing that a proposed distinction is unnecessary. Do
not treat any case as pre-labelled gold data.

## 8. Overclaim and transfer attacks

Attempt at least these attacks:

1. treating a humane endpoint as a statistical analysis endpoint;
2. treating euthanasia as ordinary missingness without source support;
3. treating any post-event scheduled value as structurally nonexistent merely
   because it was not measured;
4. treating supportive treatment as equivalent to removal from the assigned
   condition;
5. treating an ethical or welfare recommendation as a statistical guarantee;
6. treating a domain-specific oncology threshold as universal animal-study
   vocabulary;
7. treating a raw search-term absence as conceptual absence; and
8. importing an ICH strategy label because a generic word such as
   `hypothetical` or `composite` appears.

State which attacks survive and which narrow the candidate.

## 9. Evidence and disposition vocabulary

Use only these atomic-claim statuses:

- `VERIFIED_DIRECT`
- `CROSS_SOURCE_INFERENCE`
- `POSSIBLE_PROJECT_CONVENTION`
- `CONTRADICTED`
- `NOT_VERIFIABLE`

Select exactly one research disposition: `ADVANCE`, `NARROW`, `DEFER`, or
`NO_GO`.

Select exactly one `H04-S4` disposition: `CLOSE`, `NARROW_AND_CLOSE`, or
`KEEP_OPEN`.

`CLOSE` or `NARROW_AND_CLOSE` requires complete inspection of `AE-01` and
`AE-03`, complete inspection of `AE-02` or a justified controlling official
replacement, direct evidence from at least two independent sources for the
endpoint-time-action boundary, preservation of all material disagreement, and
no remaining uncertainty material to the bounded `H04-S4` question.

This pass alone cannot close `FND1-H04`; it can only propose a disposition for
the `H04-S4` residual. The companion `H04-S1` pass and a later steward
reconciliation remain separate.

## 10. Required result structure

Return one complete English Markdown report using these sections in order:

1. identity, input, access, artifact, and independence checks;
2. executive disposition;
3. inspected-source register and page maps;
4. atomic claim-evidence ledger;
5. endpoint definitions, triggers, actions, and timing;
6. bearer and event matrix;
7. outcome-existence and observation-state boundary;
8. required falsification cases;
9. raw terminology search and sense classification;
10. overclaim, transfer, and misattribution attacks;
11. `H04-S4` disposition, residuals, and exact next evidence; and
12. public-artifact and sanitization self-check.

The report must keep source statements, cross-source inference, and possible
project conventions separate. It must not recommend a Protocol field, schema,
method, identifier, or implementation.

## 11. Execution and handoff

The external primary-source investigator returns the complete report to the
commissioning steward. It performs no repository write and claims no branch,
commit, push, or merge.

The steward places the accepted report into
[`2026-09-02-nonclinical-estimand-animal-endpoint-source-result.md`](2026-09-02-nonclinical-estimand-animal-endpoint-source-result.md)
without silently strengthening its claims. A separate repository-capable
reviewer may later verify artifact identity, source pinpoints, scope, and the
proposed sub-hold disposition.

## 12. Explicit non-decisions and final lines

This commission does not:

- adopt a cross-domain animal-event, endpoint, missingness, or estimand
  vocabulary;
- import an ICH strategy name into general scientific use;
- choose a humane-endpoint threshold, euthanasia rule, missing-data method,
  causal interpretation, or analysis-set rule;
- define a Record field, schema, identifier, reason code, public check,
  conformance rule, API, or implementation;
- close `H04-S1`, `FND1-H04` through `FND1-H08`, the full FND-1 Research Gate,
  or any release gate; or
- affect Release 2, paired-t, or t-family numerical-contract work.

End the report with exactly one line matching the selected research
disposition:

`FND-1 ANIMAL-ENDPOINT PRIMARY-SOURCE PASS COMPLETE - ADVANCE - NOT PROTOCOL ADOPTION`

`FND-1 ANIMAL-ENDPOINT PRIMARY-SOURCE PASS COMPLETE - NARROW - NOT PROTOCOL ADOPTION`

`FND-1 ANIMAL-ENDPOINT PRIMARY-SOURCE PASS COMPLETE - DEFER - NOT PROTOCOL ADOPTION`

`FND-1 ANIMAL-ENDPOINT PRIMARY-SOURCE PASS COMPLETE - NO-GO - NOT PROTOCOL ADOPTION`
