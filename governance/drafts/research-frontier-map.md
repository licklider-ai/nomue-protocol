# Protocol Research Frontier Map

**Status: informative research-planning document.** This map creates no Protocol
meaning, identifier, Requirement ID, supported capability, work-start authority,
RFC disposition, release commitment, or review-window change. It does not change
the current Release 2 scope or decision sequence.

## Purpose

Protocol research is intentionally allowed to lead implementation by a wide margin.
The goal is to investigate difficult scientific, numerical, and verification
questions before a product or release is waiting for an answer.

Research order and implementation order are different:

- research may run in parallel across near-term and long-horizon subjects;
- investigations may finish in a different order from product milestones;
- a completed investigation is reusable evidence, not implementation approval;
- authoritative implementation still advances as a bounded vertical capability
  through the normal Research Gate, RFC, conformance, and release process.

## Operating model

1. **Investigate broadly, decide narrowly.** Early work may survey a large domain,
   but every decision-bearing handoff states the exact model, estimand, assumptions,
   data semantics, numerical domain, and unresolved questions it covers.
2. **Front-load reusable work.** Foundational and method-family research is started
   early when it is likely to prevent several capabilities from repeating or
   contradicting the same semantic decision.
3. **Keep implementation vertical.** Broad research does not justify broad shallow
   implementation. A supported capability still closes its own Contract, Profile,
   Public Check, schema, conformance, oracle, and decision obligations.
4. **Allow negative outcomes.** A useful investigation may end in a no-go,
   non-uniqueness result, narrower supported claim, or explicit refusal boundary.
5. **Recheck at adoption.** Research is reused only while its sources, assumptions,
   versions, and open holds still cover the proposed Protocol decision.

## Research portfolio

### Shared scientific semantics

- machine-actionable admissibility, method-family routing, and refusal boundaries;
- estimand identity and alignment among tests, effect estimates, confidence
  intervals, and scientific interpretations;
- multiplicity-family definition and versioned FWER/FDR procedure semantics;
- missing-data declarations, analysis-population identity, preprocessing,
  transformations, weighting, and pooling;
- unit-of-analysis, pairing, clustering, repeated-measure, censoring, exposure, and
  other design declarations;
- seeded randomness and deterministic permutation, bootstrap, simulation, or other
  stochastic procedures.

### Numerical and oracle assurance

- deterministic operation graphs, target-format projection, mathematical-truth
  error, and refusal as separate ledgers;
- certified or bounded evaluation of t, F, normal, chi-square, beta/gamma, survival,
  and other statistical special functions;
- correctly-rounded constants, finite tables, and independent reference suites;
- cross-platform and cross-implementation reproducibility classes;
- iterative fitting, initialization, convergence, stopping, and resource ceilings;
- quantity-specific comparison policies supported by independent evidence rather
  than a universal tolerance.

### Analysis-method families

- independent multi-group continuous inference, contrasts, post-hoc procedures, and
  multiplicity;
- paired two-condition continuous inference;
- rank, permutation, and other discrete-reference procedures;
- repeated-measures, clustered, longitudinal, and mixed-dependence designs;
- factorial, interaction, correlation, linear-model, regression, categorical,
  count/rate, survival, and nonlinear/dose-response families;
- multivariate or multiple-endpoint procedures where the represented target and
  multiplicity boundary can be made explicit.

### Evidence and verification semantics

- machine-actionable evidence sufficiency and bounded claim-evidence coverage;
- sound composition of separately scoped assurance results;
- distinctions among computed, recomputed, checked, certified, and not asserted;
- provenance and identity for derived datasets, transformations, external tools,
  reference databases, and versioned outputs;
- resource-bounded verification and fail-closed handling of unsupported evidence.

### Exploratory horizon

The following are legitimate research subjects when they can be reduced to bounded
questions that may affect portable verification semantics:

- equivalence, non-inferiority, and explicitly directional inference;
- diagnostic-accuracy and ROC-family inference;
- meta-analysis and evidence synthesis;
- high-dimensional, omics, single-cell, and spatial workflows;
- causal estimands and weighting/matching procedures;
- Bayesian computation and posterior/decision summaries;
- machine-learning evaluation, resampling, calibration, and uncertainty.

Placement here is permission to investigate, not a commitment to standardize or
support the subject.

## Research priority bands

These bands allocate research attention only. They do not set implementation,
publication, RFC, or release order, and work in different bands may proceed in
parallel.

### Current closure and reuse

- close the bounded paired-t numerical and oracle questions already needed by the
  current Release 2 candidate;
- extract reusable t-family, target-projection, refusal, and certificate patterns;
- continue existing rank/discrete and cross-implementation investigations without
  treating them as current Protocol support.

### Commission now

- independent multi-group continuous semantics, contrasts, and multiplicity;
- cross-family admissibility, routing, estimand, and refusal semantics;
- missingness, preprocessing, analysis-population, and transformation identity;
- reusable special-function and numerical-certification architecture beyond the
  t-family;
- survival data meaning: time origin, event, censoring, risk set, and tie semantics;
- repeated/clustered dependence and iterative-fitting reproducibility.

### Long-lead parallel exploration

- the remaining method families and evidence/verification subjects above;
- frontier subjects whose primary-source base, numerical difficulty, or data meaning
  makes late investigation likely to delay a future capability.

A subject moves closer to adoption because its bounded question and evidence mature,
not merely because it appears in an earlier band.

## Expected research package

A decision-bearing research handoff records:

1. the bounded question and excluded questions;
2. primary sources, source versions, and an access/confirmation record;
3. source-established facts, project inference, and possible project convention as
   separate sections;
4. material disagreements, failed searches, and unresolved holds;
5. the model, estimand, assumptions, data and design semantics, and output target;
6. required declarations and candidate representation consequences;
7. refusal, non-computability, and resource boundaries;
8. numerical procedure, oracle, certification, and cross-implementation needs;
9. reusable scope, limitations, and reopen conditions; and
10. available dispositions, including defer, narrow, and no-go.

The package need not propose Protocol wording. Research is most useful when it
clarifies the decision space without silently preselecting an implementation.

## Intake and promotion boundary

Research artifacts remain evidence inputs. A result affects Protocol meaning only
after the public repository independently verifies an allowed handoff, applies the
Research Gate, records the applicable disposition, and lands the complete
authoritative change set through normal governance.

No research plan, completed survey, paper, benchmark, implementation spike, or
external capability request can by itself issue an identifier, register support,
change a review outcome, or authorize a release.
