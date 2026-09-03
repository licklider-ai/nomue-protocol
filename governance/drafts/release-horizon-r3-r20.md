# Protocol Release Horizon: Release 3 through Release 20

**Status: canonical informative planning index.** This document is the single
planning reference for the current Release 3 through Release 20 horizon. It creates
no Protocol meaning, supported capability, identifier, Requirement ID, work-start
authority, RFC disposition, release commitment, or review-window change. A release
may adopt only what its own public RFC and complete authoritative change set decide.

## Planning model

Release planning and reusable research planning are related but distinct:

- a release is a bounded public proposal that may eventually change Protocol
  meaning;
- cross-cutting research may serve several releases but never changes Protocol
  meaning by itself;
- each release RFC states which research result it adopts, does not adopt, or leaves
  unresolved;
- research may run ahead of a release, and public RFC discussion may run in parallel
  with candidate development;
- implementation remains vertical: each supported capability closes its own
  Contract, Profile, schemas, Public Checks, conformance, numerical evidence, and
  release decision.

Release horizon states are `next candidate`, `near horizon`, `planned`, and
`exploratory`. Research states are `queued`, `active`, `decision-ready`, and
`closed/deferred`. These labels coordinate work only; they are not Protocol or RFC
states.

An active cross-cutting investigation should have a public issue or an equivalently
public, stably linked work record. It has no minimum discussion window or quorum.
The consuming release RFC remains responsible for the public decision and for any
applicable discussion window.

## Current horizon

| Release horizon | Planning state | Candidate direction                                                                                                                                                                                           | Reuse and dependency boundary                                                                                                                                                                                                                                  |
| --------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Release 3       | next candidate | A bounded independent multi-group continuous-inference vertical slice, including an explicitly identified omnibus target and only the contrast or multiplicity surface justified by its Research Gate package | May reuse completed Release 2 successor architecture after verifying its final disposition; requires release-scoped adjudication of F-distribution numerics, comparison-family meaning, and multiplicity                                                       |
| Release 4       | next candidate | A bounded factorial and interaction-inference vertical slice                                                                                                                                                  | Should reuse the applicable F-distribution, projection, and multiplicity foundation established for Release 3, but must independently close factorial estimands, design declarations, admissibility, interaction meaning, and any non-reusable numerical graph |
| Release 5       | near horizon   | Rank-based successor Contracts: paired signed-rank and independent rank-sum are leading candidates                                                                                                            | Existing research handoffs may be reused only within their recorded scope; the two Contracts close independently even if one publication train carries both                                                                                                    |
| Releases 6–10   | near horizon   | Repeated or clustered dependence, correlation and linear models, categorical outcomes, count or rate outcomes, and survival or time-to-event inference                                                        | Exact order remains open and is chosen by research maturity, dependency closure, product demand, and ability to form a bounded vertical slice                                                                                                                  |
| Releases 11–15  | planned        | Nonlinear or dose-response inference, diagnostic-accuracy or ROC families, equivalence or non-inferiority, multiple-endpoint procedures, and meta-analysis or evidence synthesis                              | Iterative fitting, directional claims, evidence identity, and multiplicity dependencies must be closed before the relevant design freeze                                                                                                                       |
| Releases 16–20  | exploratory    | High-dimensional or omics workflows, causal estimands, Bayesian computation, and machine-learning evaluation or resampling                                                                                    | These subjects remain research horizons until a portable, independently checkable, resource-bounded Protocol claim can be stated                                                                                                                               |

This table fixes neither one capability per release nor the listed order inside a
range. Splitting, combining, or reordering a future release updates this planning
index; it does not require a Protocol decision unless authoritative meaning is also
changed.

## Cross-cutting research dependencies

| Research line                                                          | Current planning state                                                      | Earliest expected consumers                                      | Adoption boundary                                                                                                     |
| ---------------------------------------------------------------------- | --------------------------------------------------------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| F-distribution evaluation, projection, and independent oracle strategy | queued                                                                      | Releases 3 and 4                                                 | Each release selects its own operation graph, support domain, resource bounds, tables or algorithms, and tolerances   |
| Multiplicity-family and FWER/FDR semantics                             | decision-ready in bounded foundational records; release application pending | Releases 3, 4, and later multiple-endpoint capabilities          | A release defines the protected family, criterion, procedure, ordering, and guarantee it actually adopts              |
| Estimand and inference-routing identity                                | decision-ready in bounded foundational records; release application pending | Releases 3 onward                                                | Every Contract still declares its own target, design assumptions, routing, and refusal boundary                       |
| Iterative fitting and convergence reproducibility                      | queued                                                                      | Linear-model successors and Releases 11–20                       | No iterative implementation is promoted until initialization, stopping, resource, and numerical semantics are bounded |
| Seeded stochastic reproducibility                                      | queued                                                                      | Resampling, permutation, Bayesian, and machine-learning releases | Each consuming RFC binds the randomness identity and replay or verification class it adopts                           |
| Missingness, preprocessing, and analysis-population identity           | active                                                                      | Releases 3 onward                                                | A release either adopts explicit semantics or keeps the relevant input outside support                                |

The detailed research portfolio and research-package expectations remain in the
[Protocol Research Frontier Map](research-frontier-map.md). This table records only
the dependencies needed to interpret the release horizon.

## Release 3: milestones before public discussion

The objective of this phase is to open a reviewable public question, not to finish
the implementation first.

1. **Bound the proposed vertical slice.** State the independent-group design,
   omnibus target, supported result surface, and explicit exclusions. Contrasts,
   post-hoc procedures, multiplicity guarantees, standardized effects, missing-data
   handling, and broad model families stay excluded unless the RFC defines them
   precisely.
2. **Assemble the Research Gate handoff.** Map the existing foundational estimand,
   routing, and multiplicity records to the Release 3 question. Commission only the
   missing release-scoped work, especially F-distribution numerical and oracle
   semantics and any selected comparison family.
3. **Define the Release 2 dependency.** Identify which successor identifier,
   Contract, bundle, schema, and verifier patterns are conditional on Release 2.
   Keep all Release 3 spellings unissued and record what must be revised if the
   Release 2 disposition changes.
4. **Draft the Release 3 RFC.** Include motivation, bounded semantics, affected
   authority classes and stability tiers, compatibility, excluded capabilities,
   research dispositions, unresolved holds, and the exact decision requested.
5. **Prepare a review-readiness check.** Independently confirm that the draft does
   not silently select an unresolved estimand, multiplicity family, numerical
   algorithm, tolerance, support domain, or identifier.
6. **Open the public discussion.** Publish the RFC issue, record the opening time,
   applicable tier, minimum window, and earliest decision time. Opening the issue
   authorizes discussion and candidate preparation only.

Release 2 publication is not a prerequisite to opening Release 3 discussion.
Release 3 must, however, keep dependencies conditional until the Release 2
authoritative disposition and surfaces are known.

## Release 3: milestones after public discussion opens

1. **Maintain the scope ledger.** Classify comments and research updates as
   clarification, evidence, repair, or material semantic change. Restart the public
   window when the applicable governance rules require it.
2. **Build the candidate vertical slice.** Prepare candidate normative text,
   Requirement namespaces, identifiers, schemas, bundle bindings, Public Checks,
   reason codes, fixtures, reference dispatch, and generated views without issuing
   them.
3. **Close numerical and execution evidence.** Select and independently review the
   operation graph, F-tail or equivalent procedure, projection policy, resource and
   support bounds, platform or execution predicate, tolerances, and adversarial
   refusal behavior.
4. **Close structural and cross-artifact review.** Verify identifier ownership,
   closed schemas, exact-bundle dispatch, Release 1 and Release 2 historical
   preservation, positive and negative fixtures, and complete traceability.
5. **Assemble the steward ratification package.** Separate the RFC scope decision
   from permanent namespace, identifier, schema, numerical-contract, supported-
   execution, Public Check, bundle, and release-candidate decisions.
6. **Record the RFC decision after the earliest time.** Accept, revise, defer, or
   reject the proposal with rationale and a record of public participation. No
   comment quorum is implied.
7. **Land and publish only the accepted change set.** Apply the authoritative
   changes together, rerun release gates against the pinned candidate, preserve
   review evidence, and publish the supported bundle and release artifacts.

Candidate development and independent review may proceed throughout the public
window. Work that depends on an unsettled discussion outcome remains reversible and
unissued.

## Release 4 parallel start

Release 4 preparation may begin while Release 3 is under public discussion:

1. frame the factorial or interaction question and exclusions;
2. identify which Release 3 F-distribution and multiplicity results are genuinely
   reusable and which factorial questions remain independent;
3. commission the missing design, estimand, admissibility, and numerical research;
4. draft a standalone RFC whose dependencies on Release 3 are explicit and
   conditional; and
5. open Release 4 discussion once its own bounded question and Research Gate handoff
   are reviewable.

Release 4 need not wait for Release 3 publication merely to begin discussion. It
must not present a Release 3 candidate decision as settled Protocol meaning. A
material Release 3 change that alters Release 4 semantics requires Release 4 to be
revised and, where applicable, to restart its own discussion window.

## Update discipline

Keep this index lightweight:

- update it when a release direction, range placement, dependency, or research
  state materially changes;
- create a public research issue only when an investigation becomes active;
- do not add a registry, schema, validator, per-release status file, or automated
  gate solely for this horizon;
- keep application-product work-item mapping outside this document until that
  mapping is needed for an active release; and
- let each release RFC and authoritative artifact remain the source of truth for
  actual Protocol decisions.
