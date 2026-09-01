# FND-1 Non-Clinical Estimand Source Reconciliation Candidate

**Status: informative steward reconciliation candidate; non-normative; not
adopted.** This document reconciles the frozen primary-source and
repository-analysis passes for `FND1-H04`. It records a bounded research-state
candidate only. It defines no Protocol vocabulary, selects no schema or
identifier, authorizes no implementation, closes no Research Gate, and affects
no release.

## 1. Identity and fixed inputs

| Input                                           | Commit or content identity                                                                                                                                         | Role in this reconciliation                                                                                                 |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| Non-clinical estimand source-closure commission | commit `586b9dfa748dd45995991463b569a0e883b2838d`; blob `c19bcff2ac1d3d8666869e186c530eb885da67f8`                                                                 | bounded question, evidence rules, and isolated-pass contract                                                                |
| Primary-source result                           | result commit `aace6fba32c0c95aa5f2396130c9755442fa405f`; intake merge `761b30dc39ae7c91131b2610e53d7666bc459e5b`; blob `6566923b7f08c59d8f5fd1c13c8aa2b3e0d53116` | Pass A external-source analysis; `NARROW / KEEP_OPEN`                                                                       |
| Repository-analysis result                      | result commit `cb563a897c51fe66afcad07a4948cb47e125376d`; intake merge `929c92c9af192f1ef13f1152c5be04c8de3823a4`; blob `1c72c759b5d5a0d3cf024b53bcd1bd3a582aee53` | Pass B repository, corpus, and representation analysis; `NARROW / KEEP_OPEN`                                                |
| Accepted FND-1 baseline                         | blob `dca6118720f8991dbdb0bd12b7528d0f18783f58` at the reconciliation base                                                                                         | controlling source-bounded hypotheses, E/P/H/M/D/V decomposition, and preserved holds                                       |
| Multiplicity steward disposition                | blob `5e8a69ba571637408c79e1c46d9167f679b57c38` at the reconciliation base                                                                                         | controlling hold boundary: `FND1-H01` through `FND1-H03` are narrowed and closed; `FND1-H04` through `FND1-H08` remain open |

The supplied Pass A artifact contained one pre-report workflow sentence and an
access-log appendix after its completion marker. Intake removed only that
sentence, moved the unchanged appendix before the marker, removed Markdown code
quoting from the marker, and applied repository formatting. The intake PR
records the supplied artifact SHA-256 and committed blob. No research claim,
source status, counterexample, disposition, or exclusion changed.

Pass B was accepted at its original commit and blob without content repair. Its
Section 1.3 statement that no earlier investigation result was opened is read
with the explicit exception immediately established by Section 1.2: the five
commission-permitted fixed inputs were read, and no additional earlier result
was used. This reconciliation does not broaden that independence claim.

## 2. Scope and exclusions

This reconciliation answers only what the two frozen passes establish about
reusing an estimand-like structure outside clinical trials. It excludes:

- registration or adoption of an estimand vocabulary;
- public fields, schemas, identifiers, reason codes, checks, or APIs;
- selection of a missing-data, censoring, causal, or terminal-event method;
- a universal event taxonomy for every scientific domain;
- any claim that current Record declarations already implement the reconciled
  candidate completely;
- closure of `FND1-H05` through `FND1-H08`;
- Release 2, paired-t, and t-family numerical-contract work; and
- legal, regulatory-compliance, or clinical-development judgments.

## 3. Why the pass dispositions do not conflict

| Question                                                    | Primary-source pass                                                                                                                     | Repository-analysis pass                                                                                                    | Reconciled reading                                                               |
| ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Is the whole candidate scaffold supported?                  | `NARROW`: ICH E9(R1), ICH M10, ICH Q2(R2), and ARRIVE 2.0 support only bounded components and distinctions.                             | `NARROW`: the corpus and public surface support partial analogues but expose missing bearers and lossy binary declarations. | Both reject the broad five-part proposition as one lossless structure.           |
| Can one event-or-missing-outcome attribute cover all cases? | No. Missing observations, bounded values, terminal events, condition changes, and structural non-existence have different consequences. | No. Seven cases across six domains require different bearers and different outcome-existence meanings.                      | The umbrella attribute is rejected as a universal mapping.                       |
| Are clinical strategy names reusable verbatim?              | No automatic transfer is supported; the inspected ICH text is clinically framed.                                                        | No current public surface imports those names, and none is needed to express the repository cases.                          | Do not import the ICH strategy list as general Protocol vocabulary.              |
| Does handling always belong to estimand identity?           | No. Some handling changes the target; other handling changes only the procedure.                                                        | No. Condition changes and terminal events can change E, while a lost reading can leave E fixed and change P.                | Handling is conditionally estimand-defining, not universally E-level or P-level. |
| Can `FND1-H04` close now?                                   | No. Direct non-ICH target-quantity and missingness sources remained inaccessible.                                                       | No. Repository evidence cannot supply external primary-source truth.                                                        | `KEEP_OPEN` is the only evidence-consistent overall disposition.                 |

The different access sets therefore strengthen the same narrowing. Neither
pass fills the other's stated primary-source gap, so agreement cannot be used
as a vote to close the hold.

## 4. Reconciled candidate structure

### 4.1 Reusable core, subject to source completion

The narrow candidate core is:

1. **Target unit set** — the population or set of units about which the target
   quantity is defined, kept separate from the analyzed subset.
2. **Condition or exposure** — assignment, condition, or exposure semantics;
   a contrast is conditional because some quantification questions have only
   one condition.
3. **Outcome and assessment occasion** — the outcome, unit, scale, time origin,
   and assessment time or window needed to identify what is measured.
4. **Population-level summary and contrast direction** — the summary of the
   outcome distribution and, when applicable, the comparison function and
   direction.

This is a `POSSIBLE_PROJECT_CONVENTION`, not a formal cross-domain standard.
Pass A directly inspected clinical and non-clinical formal texts, but did not
directly inspect the primary non-ICH target-quantity texts needed to establish
that the whole core travels across domains. Pass B found only partial current
repository analogues: target population and exposure details remain partly
free text, assessment occasion lacks a structured bearer, and the existing
binary data-handling declarations fail closed rather than representing the
candidate semantics.

### 4.2 Facts that must stay separate

| Fact class                    | Correct bearer candidate                 | Why it is separate                                                                         | Typical effect                                                           |
| ----------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| Assigned condition            | experimental unit or assignment record   | assignment is not the same fact as realized exposure                                       | estimand-defining when the target contrasts assigned conditions          |
| Realized condition trajectory | unit over time                           | condition switching changes exposure history without creating missing data                 | may change the estimand                                                  |
| Terminal event                | event attached to a unit and time        | a later outcome may cease to exist rather than become unobserved                           | often requires a different target definition                             |
| Outcome-existence status      | unit and assessment occasion             | defined-but-unobserved and structurally nonexistent outcomes are not interchangeable       | determines whether imputation is conceptually admissible                 |
| Observation-information state | observation                              | exact, bounded, below-limit, censored, and absent observations carry different information | often changes the inference procedure rather than the target             |
| Analysis-set membership       | unit relative to an analysis declaration | exclusion is not a cell state or an event                                                  | may change the analyzed population or the target if silently substituted |
| Datum relevance               | `(datum, estimand)` relation             | relevance is not an intrinsic property of a datum                                          | controls which declared target the datum can inform                      |
| Mechanism assumption          | analysis procedure                       | an assumption such as ignorability is not an observed fact                                 | procedure-level and externally justified                                 |

No single bearer supports an undifferentiated
`condition-transition and missing-outcome handling` attribute. The phrase may
remain a discussion heading, but it is rejected as one estimand field or one
universal event class.

## 5. Clinical-language boundary

The directly inspected ICH text supports a narrow negative conclusion: its
intercurrent-event construct and named strategies are presented in clinical
treatment language, and it separately distinguishes intercurrent events from
missing data. This evidence does not justify importing the terms as a universal
non-clinical vocabulary.

It also does not justify the broader claim that the underlying mathematical
concepts are forbidden outside clinical trials. In particular, Pass A's
suggestion to reject `principal stratum` for cross-domain reuse is narrowed
here: no universal Protocol term is adopted, but the formal causal concept
cannot be ruled out for a separately researched domain or method family without
its own primary sources. Likewise, `terminal event` remains descriptive
candidate language rather than a registered cross-domain category.

Candidate boundary: preserve abstract target distinctions where evidence
supports them; do not transfer the ICH strategy names, clinical category list,
or regulatory decision role verbatim; and do not convert that non-transfer
rule into a ban on separately justified causal or domain-specific concepts.

## 6. Claim disposition matrix

| Claim group                                                                                            | Reconciled evidence status                                                                                                                                         | Candidate disposition                                     |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| Method name alone identifies an estimand                                                               | Already rejected by the accepted FND-1 baseline; both passes preserve structured target attributes                                                                 | carried forward; outside this bounded hold decision       |
| Target unit set, condition/exposure, outcome and occasion, and population summary form a reusable core | Compatible with all counterexamples and partially supported by inspected sources and repository analogues; direct non-ICH target-quantity texts remain uninspected | `NARROW`; `KEEP_OPEN` as a cross-domain source claim      |
| Every target requires a condition contrast                                                             | Falsified by single-condition quantification and census-style cases                                                                                                | reject as universal; condition or exposure is conditional |
| One event-or-missing-outcome handling attribute is lossless                                            | Falsified by bounded observations, terminal events, defined-but-missing outcomes, and condition transitions                                                        | reject as universal                                       |
| Handling is always estimand-defining                                                                   | Falsified by procedure-only missing-observation cases                                                                                                              | reject as universal                                       |
| Handling is never estimand-defining                                                                    | Falsified by condition-transition and terminal-event target choices                                                                                                | reject as universal                                       |
| ICH event and strategy names should be general Protocol vocabulary                                     | No direct evidence supports verbatim transfer; the current public surface does not depend on them                                                                  | do not adopt; narrow negative boundary supported          |
| Current public Record surface implements the reconciled scaffold                                       | Contradicted by the missing target-population, assessment-occasion, event, outcome-existence, and value-state bearers                                              | reject; only partial analogues exist                      |
| A public schema change is required now                                                                 | The cases are expressible in research prose and corpus rows; no reviewed Protocol design exists                                                                    | no repair or schema change authorized                     |

## 7. Overall research-state disposition

Candidate research disposition: **`NARROW`.**

Candidate `FND1-H04` disposition: **`KEEP_OPEN`.**

The two passes support rejecting the universal umbrella and retaining a
bearer-explicit candidate decomposition. They do not supply the minimum direct
primary-source basis for treating that decomposition as a closed
cross-domain estimand framework. The full FND-1 Research Gate remains open.

This is intentionally not `NARROW_AND_CLOSE`: the missing evidence is relevant
to the positive cross-domain claim, not merely historical attribution or
wording.

## 8. Repository repair assessment

Pass B found no broad import of clinical intercurrent-event language on the
inspected normative, schema, registry, generated-vocabulary, or public-example
surface. The current surface fails closed for unsupported data handling rather
than guessing a missingness policy.

No public-surface repair is required by this reconciliation. The missing
assessment-occasion, target-population, exposure-history, outcome-existence,
and value-state bearers are research and design gaps, not defects in the
currently bounded Welch-only profile. They remain outside Protocol adoption
until `FND1-H04`, `FND1-H06`, and any capability-specific Research Gate work
support a concrete design.

The authority-manifest notes for the two result files are updated only to
replace stale placeholder descriptions with their completed informative
dispositions. That bookkeeping creates no authority.

## 9. Residual source requirement and next action

The smallest evidence-completion package should directly inspect:

1. at least two primary or formal texts defining target quantities, potential
   outcomes, or exposure effects outside the ICH E9(R1) vocabulary, with exact
   pinpoints for unit set, condition, outcome, time, and population summary;
2. a primary or formal source distinguishing defined-but-unobserved outcomes
   from structurally nonexistent outcomes or terminal-event truncation;
3. a primary or formal source distinguishing detection-limit or censored
   observations from ordinary missing observations; and
4. where available, a non-clinical experimental or animal source addressing
   post-assignment condition change or terminal events without importing the
   ICH strategy names.

Candidate sources already identified by Pass A include Neyman (1923/1990),
Rubin (1974), Rubin (1976), Hernán and Robins, Helsel (1990), OECD Test
Guideline 408, and formal detection-limit or censoring standards. Identification
is not verification. A completion pass must inspect the full text, record
stable identities and pinpoints, and preserve disagreements rather than count
sources.

Before opening that completion package, run a close-only review of this
reconciliation. The review checks fixed-input identity, cross-pass fidelity,
the narrowed candidate, the explicit `KEEP_OPEN` disposition, the residual
source requirement, and the absence of unauthorized Protocol adoption. It does
not re-perform the external investigation or inspect Release 2 material.

## 10. Public-artifact and boundary self-check

- [x] Pass A and Pass B are reconciled by evidence scope, not by vote.
- [x] Direct source statements, cross-pass inference, and possible project
      conventions remain separate.
- [x] The current public surface is described only as partial analogues, not a
      completed cross-domain scaffold.
- [x] Missing observations, bounded values, terminal events, structural
      non-existence, condition transitions, and relevance remain separate.
- [x] The clinical-language boundary does not become a general ban on causal
      or domain-specific concepts.
- [x] `FND1-H04` remains open and its residual source requirement is explicit.
- [x] `FND1-H05` through `FND1-H08` and the full FND-1 Research Gate remain
      open.
- [x] No vocabulary, field, schema, identifier, method, default, reason code,
      API, implementation, check, or release change is selected.
- [x] Release 2, paired-t, and t-family numerical-contract work remain
      excluded.
- [x] Attribution is neutral and role-based; no drafting, investigation, or
      review software, service, provider, or mechanism is identified or
      implied.

READY FOR FND-1 NON-CLINICAL ESTIMAND RECONCILIATION CLOSE REVIEW - NOT PROTOCOL ADOPTION
