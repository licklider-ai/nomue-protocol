# FND-1 Non-Clinical Estimand Source Steward Disposition

**Status: informative research disposition; non-normative; not adopted.** This
record accepts the reviewed, source-bounded reconciliation of the
non-clinical estimand follow-up as research input. It does not establish a
general cross-domain estimand standard, select Protocol vocabulary, authorize
implementation, close `FND1-H04`, close the FND-1 Research Gate, or affect a
release.

## Recorded disposition

| Item                            | Disposition                                                                                                                                                    |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Research package                | `FND-1`                                                                                                                                                        |
| Hold                            | `FND1-H04`                                                                                                                                                     |
| Reconciliation                  | [`2026-09-01-nonclinical-estimand-source-reconciliation.md`](2026-09-01-nonclinical-estimand-source-reconciliation.md)                                         |
| Reconciliation candidate commit | `55d727e770831c159e5645a0b3e6621b8abadb2a`                                                                                                                     |
| Reconciliation intake merge     | `8b21134e28a9a645fad65506830ebdcc91499013`                                                                                                                     |
| Reconciliation blob             | `f06e4f2dbc6fea1b40559730064a6bf5cf291f9d`                                                                                                                     |
| Close-review result             | [`2026-09-01-nonclinical-estimand-source-reconciliation-close-review-result.md`](2026-09-01-nonclinical-estimand-source-reconciliation-close-review-result.md) |
| Close-review result commit      | `7103fb272dc1501fab68d7e840b444912851084e`                                                                                                                     |
| Close-review result blob        | `5d96b72faac484d0945fbbc0a54da33672bb06d3`                                                                                                                     |
| Close-review result SHA-256     | `09bccb400c2ac642878b7a783f7de2c84a854b6f7fe74668a702296bdcf9eca6`                                                                                             |
| Close-review intake             | pull request #119; head `8862fd8c12fba0ce6430b43c1ab7745ef30c082f`                                                                                             |
| Close-review verdict            | `GO`; C-01 through C-12 passed; no blocker or should-fix finding; two non-direction-changing observations                                                      |
| Steward disposition             | `ACCEPTED AS SOURCE-BOUNDED NON-CLINICAL ESTIMAND RECONCILIATION`                                                                                              |
| Research disposition            | `NARROW`                                                                                                                                                       |
| `FND1-H04`                      | `KEEP_OPEN` pending the exact primary-source completion package                                                                                                |
| Other FND-1 holds               | `FND1-H05` through `FND1-H08` remain open                                                                                                                      |
| Full FND-1 Research Gate        | Not ready; not closed                                                                                                                                          |
| Protocol adoption               | None                                                                                                                                                           |

The accepted result is a bounded reconciliation state, not a hold closure.
`KEEP_OPEN` retains the commissioned status of `FND1-H04`; no subclaim is
assigned `NARROW_AND_CLOSE` by this record.

## Intake and review ruling

The primary-source pass and repository-analysis pass each returned
`NARROW / KEEP_OPEN`. Their evidence sets were complementary: the first
inspected bounded clinical and non-clinical formal material while recording
unavailable non-ICH target-quantity and missingness texts; the second tested
the candidate against the fixed corpus and public repository surface without
using external sources. The reconciliation correctly treats their agreement
as evidence-scope convergence, not as a vote that can replace missing primary
sources.

The close-only review returned `GO`. It verified all fixed commits, merges,
paths, and blobs; passed C-01 through C-12; and found no blocker or should-fix
issue. Its two observations concern self-contained identity wording and an
ambiguous use of the word `unit`; neither changes the candidate direction,
the `KEEP_OPEN` disposition, or the downstream boundary.

The review result is preserved at the exact blob and SHA-256 recorded above.
The intake topology makes the reviewer result commit and the then-current main
commit direct parents, while the accompanying changes update only informative
bookkeeping and generated views.

The close reviewer disclosed that the same working context had previously
produced the frozen repository-analysis pass. This record therefore accepts
the review as a disclosed close-only artifact-fidelity check, not as a fresh
or clean-room scientific replication of Pass B. The object-level and
line-by-line checks remain usable for the commissioned handoff; no additional
scientific independence is claimed.

## Accepted bounded conclusions

The following conclusions are accepted only within the frozen corpus,
inspected source scope, and repository scope recorded by the two passes:

1. A method name alone does not identify the target quantity or the complete
   inferential result. This remains inherited from the accepted FND-1
   baseline.
2. The positive cross-domain candidate is narrowed to a target unit set,
   condition or exposure, outcome with scale and assessment occasion, and
   population-level summary with comparison direction when a comparison
   exists. This remains a `POSSIBLE_PROJECT_CONVENTION`, not a formal standard.
3. A condition contrast is not universal. Single-condition quantification and
   census-style targets remain valid counterexamples to a required contrast.
4. One universal event-or-missing-outcome handling attribute is not lossless
   across the tested cases.
5. Handling is conditionally estimand-defining. A condition transition or
   terminal event may change the target, while an unobserved but conceptually
   defined outcome may leave the target fixed and change only the analysis
   procedure.
6. ICH strategy names must not be imported verbatim as general Protocol
   vocabulary on this evidence. This non-transfer boundary is not a universal
   ban on separately justified causal or domain-specific concepts.
7. The current public surface supplies partial analogues and fails closed for
   unsupported handling. It does not implement the full candidate scaffold.

These conclusions do not establish that the candidate is complete across all
scientific domains. The positive generalization remains the reason
`FND1-H04` stays open.

## Required bearer separation

The following facts remain separate research candidates and must not be
collapsed into one field or state:

| Fact                          | Candidate bearer                                | Preserved boundary                                                            |
| ----------------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------- |
| Assigned condition            | experimental unit or assignment record          | assignment differs from realized exposure                                     |
| Realized condition trajectory | experimental unit over time                     | condition change differs from missing observation                             |
| Terminal event                | event attached to an experimental unit and time | a later outcome may cease to exist                                            |
| Outcome-existence status      | experimental unit and assessment occasion       | defined-but-unobserved differs from structurally nonexistent                  |
| Observation-information state | observation                                     | exact, bounded, below-limit, censored, and absent carry different information |
| Analysis-set membership       | experimental unit relative to an analysis       | exclusion is not an observation state or event                                |
| Datum relevance               | `(datum, estimand)` relation                    | relevance is not an intrinsic property of a datum                             |
| Mechanism assumption          | analysis procedure                              | an assumption is not an observed fact                                         |

Here, **measurement unit** refers to the unit of measurement attached to the
outcome. **Experimental unit** refers to the scientific unit assigned to a
condition or represented in an analysis. This wording resolves the review's
second observation without modifying the frozen reconciliation.

## Exact residual source requirement

`FND1-H04` remains open until a bounded completion pass directly inspects:

1. at least two primary or formal texts defining target quantities, potential
   outcomes, or exposure effects outside the ICH E9(R1) vocabulary, with exact
   pinpoints for target unit set, condition, outcome, time, and population
   summary;
2. a primary or formal source distinguishing defined-but-unobserved outcomes
   from structurally nonexistent outcomes or terminal-event truncation;
3. a primary or formal source distinguishing detection-limit, bounded, or
   censored observations from ordinary missing observations; and
4. where available, a non-clinical experimental or animal source addressing
   post-assignment condition change or terminal events without importing ICH
   strategy names.

Candidate sources named by the earlier pass remain discovery leads, not
verified evidence, until their full texts, stable identities, versions, and
pinpoints are recorded. Source counts do not substitute for resolving material
disagreement.

## Resolution of review observations

### Observation 1 — reconciliation-base identity

The frozen reconciliation remains unchanged. This disposition records its
candidate commit `55d727e770831c159e5645a0b3e6621b8abadb2a`, intake merge
`8b21134e28a9a645fad65506830ebdcc91499013`, and blob
`f06e4f2dbc6fea1b40559730064a6bf5cf291f9d` explicitly. Those identities bound
the phrase "at the reconciliation base" without requiring an editorial repair
to the reviewed artifact.

### Observation 2 — two meanings of unit

This record uses `measurement unit` for an outcome's unit of measurement and
`experimental unit` for the scientific unit assigned, observed, or analyzed.
The clarification changes no candidate attribute, bearer, or disposition.

## Repository-repair ruling

No repair to a live normative or public-contract surface follows from this
disposition. The repository-analysis pass found no broad import of clinical
intercurrent-event language in its fixed scope. Missing structured bearers for
target population, assessment occasion, exposure history, outcome existence,
and observation-information state remain research and design gaps, not defects
in the currently bounded public profile.

This ruling does not pre-authorize a future schema. Any field, vocabulary,
reason code, conformance rule, or public check requires its own Research Gate
evidence, design proposal, review, and adoption decision.

## Current FND-1 state

| Hold       | State         | Preserved unresolved question                                                    |
| ---------- | ------------- | -------------------------------------------------------------------------------- |
| `FND1-H01` | Narrow-closed | Holm guarantee and later independence-based variant separation                   |
| `FND1-H02` | Narrow-closed | Benjamini-Hochberg original theorem and later dependence-result separation       |
| `FND1-H03` | Narrow-closed | Original multiplicity attribution, with a separate historical residual open      |
| `FND1-H04` | `KEEP_OPEN`   | Direct non-ICH target, event, missingness, censoring, and terminal-event sources |
| `FND1-H05` | Open          | Derived-summary relation rules on an expanded corpus                             |
| `FND1-H06` | Open          | Units, timing, margins, transformations, and analysis-set design                 |
| `FND1-H07` | Open          | Attestation and provenance for procedure-selection assurance                     |
| `FND1-H08` | Open          | Domain-specific sensitivity-link semantics                                       |

The full FND-1 Research Gate remains open. The next eligible work is the exact
source-completion package above; no public schema or Protocol surface follows
directly from this disposition.

## Explicit non-decisions

This disposition does not:

- adopt a cross-domain estimand or event vocabulary;
- register an ICH strategy name for general scientific use;
- choose a missingness, censoring, causal, terminal-event, or sensitivity
  method;
- add or modify a Record field, schema, identifier, vocabulary term, reason
  code, public check, API, conformance rule, or implementation;
- close `FND1-H04` through `FND1-H08`, the full FND-1 Research Gate, or a
  release gate;
- treat the disclosed close review as a clean-room scientific replication; or
- affect Release 2, paired-t, or t-family numerical-contract work.

## Reopen conditions

Re-adjudication is required if:

- direct non-ICH primary sources materially contradict the four-part candidate
  or the conditional estimand/procedure boundary;
- a later corpus case cannot be represented without collapsing the preserved
  bearer or value-state distinctions;
- a current public or normative surface introduces a broader clinical-language
  import than the repository-analysis pass inspected;
- the recorded review-result blob or intake topology is found not to match the
  identities above; or
- a future design proposal relies on the candidate as if it were already an
  adopted or complete cross-domain standard.

FND1-H04 RECONCILIATION ACCEPTED - PRIMARY-SOURCE REQUIREMENT OPEN - NOT PROTOCOL ADOPTION
