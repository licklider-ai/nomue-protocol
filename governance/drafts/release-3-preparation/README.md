# Release 3 Public-Review Preparation

**Current status: public discussion opened on 2026-09-09 in [Issue #274](https://github.com/licklider-ai/nomue-protocol/issues/274).**
See the [actual opening receipt](public-opening-record.md) for PR #273 GO,
fixed inputs, exclusions and the 30-day window. Earliest decision:
2026-10-09T11:50:18Z. The preparation statuses and sequences below are historical
and superseded by the receipt for current operational status; they do not request
another opening review or start a second window. Scientific and numerical holds
remain unchanged.

Current first-capability work: the
[R3 execution-boundary assessment](holm-execution-admission-20260911/SCOPE.md)
and [admission review/evidence](../../../review-inputs/r3-admission-method-review-20260911/README.md)
connect the bounded supplied-p Holm implementation to its remaining public
Contract/schema/check/bundle work. Hosted-service capacity engineering is separate;
these research observations do not adopt or publish Release 3.

The [coordinated Holm public candidate](holm-public-candidate-20260911/README.md)
now connects the bounded Contract, proposed identities, schemas, scoped outcomes,
exact candidate dispatch and conformance controls. It remains unissued;
[adoption changes and decisions](holm-public-candidate-20260911/COUPLING.md) are explicit.

The [checkpoint successor](holm-checkpoint-candidate-20260911/README.md) adds shared
in-process time/heap budgets and discards partial results on exceedance.

The [adoption map and restart point](holm-adoption-map-20260911/README.md)
proposes Requirement allocations, inventories public fields and records the next
checkpoint/output implementation decisions. It is non-operative preparation.

## Preserved pre-opening preparation record

**Status: informative pre-public work record.** Release 3 public discussion is not
open. This package starts the research and scope work needed to make a bounded RFC
reviewable. It creates no Protocol meaning, identifier, Requirement ID, supported
capability, RFC window, release commitment, or implementation authority.

## Current supplied-scope opening preparation (2026-09-09)

The steward has adopted provided originals as this RFC's source scope, allowing
later reviewed additions. The [opening record](supplied-scope-opening-record.md)
and [updated RFC](../release-3-independent-multigroup-rfc.md) supersede the dated
September 6 status snapshot below for current scope. Historical ledger: 9 CLOSED /
1 PARTIAL / 4 INPUT_INCOMPLETE; SOURCE_SET_READY=false. Troendle's bounded review
and SF-01 repair have received close-only GO. Numerical B2/C3/G guarantees remain
withdrawn. R3-H1-H6 have proposed explicit treatments; R3-H7 is pending whole-package
independent review. No public window has started.

## Objective

Prepare a public RFC for a bounded but comprehensive independent multi-group
continuous-inference program without waiting for Release 2 publication or for the
entire Release 3 implementation to be complete.

Release 2 dependencies remain conditional until Release 2 has an authoritative
disposition. No Release 2 candidate spelling or surface is treated as issued by this
package.

## Release 3 scope candidate

Release 3 is intended to cover the independent one-way multi-group inference family,
not only a single omnibus procedure. Its research and public-discussion scope
includes:

- an explicitly declared one-way design with at least three independent groups;
- one finite continuous outcome and explicit group membership;
- omnibus targets and procedures under their separately stated variance and sampling
  assumptions;
- explicit all-pairs, many-to-one, planned-contrast, and post-hoc comparison
  families;
- single-step, stepwise, closed, simultaneous-interval, and other relevant
  multiplicity procedure families, including both FWER and FDR claims where they are
  scientifically coherent for the represented family;
- deterministic results containing only the quantities justified by each selected
  Contract, comparison family, multiplicity claim, and reviewed numerical procedure;
  and
- fail-closed refusal outside the selected design, data, numerical, resource, and
  execution domain.

No procedure is selected by this work-start record. The semantic investigation must
compare the defensible omnibus, follow-up, contrast, and multiplicity candidates,
including their target, member set, assumptions, error criterion, ordering, and
degrees-of-freedom meaning, before any Contract or Public Check is frozen.

Comprehensive research does not mean automatic support for every named historical or
software procedure. It means that every in-scope technique found by the documented
search and inclusion rules receives an explicit disposition: candidate for Release 3
implementation, research-only evidence, transfer to a named later release, or reject
with rationale. Nothing is silently omitted, and no software catalogue defines the
inventory.

Implementation remains vertical. Separate Contracts or Public Checks close their
own semantics, numerical evidence, schemas, fixtures, and reviews in dependency
order. They may share one Release 3 publication train without being collapsed into
one method or one guarantee.

## Boundary exclusions

The following remain outside the Release 3 design family unless the public RFC is
materially revised. Their research and implementation can still be completed in
their own release programs:

- paired, repeated-measures, clustered, longitudinal, or otherwise dependent data;
- factorial or interaction designs;
- covariate adjustment, regression, weighting, transformations, normalization, or
  imputation;
- inferred group membership, independence, or analysis-population selection;
- automatic complete-case selection or any missing-data default;
- automatic switching among classical, heteroscedastic, rank, permutation, or other
  procedures based on observed values;
- causal, clinical, regulatory, or domain-specific interpretations;
- Record-supplied confidence levels, tolerances, algorithms, or executable code;
  and
- a claim that a successful check validates the research project as a whole.

An observation required by the selected procedure is either present and admitted or
the check refuses. This narrow boundary avoids adopting a missing-data or imputation
policy merely to open the RFC.

## Existing research reuse and open work

| Input area                              | Current usable boundary                                                                                                        | Release 3 treatment                                                                                                                                                              |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Estimand and inference-routing research | Bounded foundational findings and dispositions exist; the full foundation gate remains open                                    | Reuse only the source-bounded distinctions that apply to the selected omnibus target; do not claim full-gate closure                                                             |
| Multiplicity research                   | Original-procedure attribution and family distinctions are narrow-closed; later procedure applications remain release-specific | Use the bounded findings as inputs, then complete a Release 3 catalogue and disposition for omnibus, contrast, post-hoc, simultaneous-interval, FWER, and FDR procedure families |
| Derived-summary and design holds        | Foundational holds covering relation rules and units, timing, transformations, and analysis sets remain open                   | Resolve only the one-way independent-group declarations needed by this slice; do not silently close broader holds                                                                |
| Attestation and sensitivity holds       | Still open                                                                                                                     | Exclude these surfaces from the initial Release 3 slice                                                                                                                          |
| Missingness and analysis-data research  | Source-bounded work exists but the full gate is not closed                                                                     | Require explicit admitted observations and refuse missing or undeclared selection; adopt no general missingness semantics                                                        |
| Release 2 successor architecture        | Complete candidate and independent-review preparation exists; final RFC and authoritative decisions remain open                | Describe identifier, Contract, bundle, schema, and verifier reuse as conditional and recheck after Release 2 disposition                                                         |

## Two independent research lanes

The two commissioned lanes may run in parallel:

1. [Statistical semantics and comparison-family commission](semantic-research-commission.md)
   builds the comprehensive in-scope procedure catalogue and determines which
   omnibus, contrast, post-hoc, interval, and multiplicity claims can be stated
   without an unsupported method, estimand, variance, or admissibility choice.
2. [Multiplicity numerical and oracle commission](numerical-research-commission.md)
   determines which required F, t, Studentized-range, multivariate-probability,
   adjustment, and projection routes can be made deterministic, independently
   checkable, and resource-bounded.

The statistical semantics result must be independently reviewed before the RFC
scope is treated as ready. The numerical lane may remain active when public
discussion opens if the RFC explicitly leaves the operation graph, algorithm,
support domain, resource bounds, platform predicate, and tolerances undecided. Those
items must close before design freeze or authoritative implementation.

## Current research-gate state

The following is an informative status reconciliation as of 2026-09-06 against
`main` at `0eb388e11c240795282b6b17d7718501757d1e43`. It records existing
decisions; it does not make a new gate decision. The detailed evidence, review
limitations, and ordered remaining work are in the
[readiness audit](readiness-audit-2026-09-06.md).

| Area                              | Current state                                                                                           | Evidence and next boundary                                                                                                                                                                                            |
| --------------------------------- | ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Semantic catalogue                | Reviewed `NARROW`; 49 procedure/variant entries, plus 2 guidance entries and 5 recorded exclusions      | The [fixed result](semantic-research-result.md) remains unchanged; catalogue membership does not establish implementation support                                                                                     |
| SR-L source acquisition           | `CLOSED`, independently reviewed and merged through PR #173                                             | The [Pass 2 result](semantic-source-acquisition-result.md) and [preserved independent review](../../../review-inputs/r3-semantic-source-acquisition-sr-l-repair/REVIEW-RESULT.md) cover the two guidance entries only |
| SR-A through SR-K, RSM-01, RSM-02 | 13 items remain `INPUT_INCOMPLETE`                                                                      | Overall `INPUT_INCOMPLETE`, `SOURCE_SET_READY=false`, and `NARROW` remain in force; the source list contains 44–45 still-uninspected items, conditional on bibliographic gap X-8                                      |
| Numerical investigation           | PR #174 remains open at `9f39eafd4b0a676e6615956b5a7899f195fc0358`; not an accepted research result     | The successor returns `INPUT_INCOMPLETE` without a numerical disposition; its repair still needs independent close-only review, including the original review's probe-reproduction requirement                        |
| Release 2 dependency              | Groups 1–4 and final review-readiness have preserved candidate reviews; final ratification remains open | Reuse stays conditional; the earliest RFC decision is `2026-09-25T20:52:54Z`, not an automatic approval or publication date                                                                                           |
| Release 3 public opening          | Not open; no opening or earliest-decision timestamp                                                     | R3-H1 through R3-H7 still require an integrated pre-opening disposition; no identifier, schema, Contract, Public Check, or support has been issued                                                                    |

SR-L closure does not lift the fixed catalogue's guidance hold markers in place or
close any other source hold. X-7 (issuer currency), U-5 (issuer-copy hash comparison),
and X-8 (the Marcus bibliographic identity) remain visible in the Pass 2 record.
The resampling-based multiplicity entries remain in the RFC's research scope even
though their implementation is transferred to the seeded-stochastic program; their
semantic source gaps are not delegated to the numerical lane.

The
[semantic source-acquisition commission](semantic-source-acquisition-commission.md)
is the bounded follow-up for those holds. It may run in parallel with the numerical
commission. Neither result opens public discussion by itself.

## Public-opening gate

Release 3 public discussion can open when all of the following are true:

1. the statistical commission has a stable scope-and-catalogue result and independent
   review;
2. the RFC draft states the bounded design family, inclusion rules, procedure
   catalogue, staged implementation model, result classes, and refusal boundary;
3. every reused research conclusion is linked with its exact scope and reopen
   conditions;
4. every unresolved numerical or structural decision is named rather than hidden in
   an implementation default;
5. Release 2 dependencies are conditional and all Release 3 identifiers remain
   unissued;
6. the highest affected stability tier and applicable minimum discussion window are
   identified; and
7. an independent readiness pass finds no undisclosed material semantic selection.

Opening the RFC issue records its discussion URL, opening time, applicable tier,
minimum window, and earliest decision time. It authorizes public discussion and
reversible candidate work only.

## Work during the public window

After opening, procedure-specific semantic adjudication, the numerical lane,
candidate Contracts and Profile, namespaces, identifiers, schemas, bundle binding,
Public Checks, reason codes, conformance fixtures, reference dispatch, resource and
platform evidence, and independent reviews may proceed in parallel. Nothing becomes
issued or supported before the RFC and later ratification decisions authorize the
applicable complete authoritative change sets.

## Release 4 handoff

The Release 3 work records which F-distribution, projection, oracle, and
comparison-family findings are reusable by a later factorial or interaction RFC.
That record is evidence reuse, not automatic Release 4 adoption. Factorial targets,
main and simple effects, interactions, design balance, admissibility, and any
different numerical graph remain separate Release 4 questions.

## Historical immediate sequence (2026-09-06; superseded)

1. complete and independently review SR-A through SR-K and RSM-01/RSM-02, preserving
   the completed SR-L result and its reopen conditions; resolve X-8 to fix the source
   count;
2. close the remaining repair-review obligations of PR #174 and preserve its review
   before considering intake; separately obtain and inspect the missing numerical
   primary sources under the numerical commission;
3. reconcile R3-H1 through R3-H6 in the RFC from accepted research findings,
   preserving `NARROW` until a separately reviewed reconsideration and naming every
   unresolved numerical decision as an explicit hold;
4. perform the pre-opening readiness pass; and
5. open public discussion without waiting for every procedure implementation to
   close.

## Current immediate sequence (2026-09-09)

1. Review PR #271's B-01 narrower-premise repair and S-01 correction against the
   fixed repaired package; keep its H2-H6 findings as reused evidence.
2. Obtain focused H1/H7 reconsideration, including evidence scope and independence
   boundaries. Do not reacquire originals or require full historical hold closure.
3. Apply any necessary repair and confirm the final fixed RFC and current authority.
4. Execute the authorized opening only after readiness is established; record the
   actual issue, UTC creation time, tier, minimum window and earliest decision.
5. Continue numerical/implementation research under explicit holds. Future source
   additions require their own identity, claim review and material-scope assessment.

The historical list above is retained for traceability and is not an instruction
to obtain missing sources or complete every historical hold before opening.
