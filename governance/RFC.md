# RFC Process

Changes to authoritative artifacts follow this public RFC process.

## Participation

Participation — filing an issue, opening a pull request, or writing an RFC
proposal itself — is open to anonymous and pseudonymous contributors at
every stage and every stability tier. Anonymity is never itself a reason to
reject discussion or a proposal.

The one exception is the Decision stage for CORE material (see Stages,
below): the approval that moves CORE material forward requires a named
steward's explicit, attributable signature. This is a constraint on who can
approve a CORE decision, not on who can participate up to that point —
anonymous discussion, drafting, and even authorship of the proposal text
remain unaffected; a steward reviews and signs, they need not be the
proposal's author.

## When an RFC is required

- Any change to a normative clause, Requirement ID, registry semantics, schema,
  conformance expectation, or public contract surface.
- Not required for: typo fixes that do not change meaning, informative
  clarifications, tooling changes that do not alter validation semantics, and
  regeneration of `generated/` views.

## Research gate for externally grounded semantics

Some Protocol decisions depend on knowledge that this repository cannot establish
from its own artifacts: scientific methodology, numerical analysis, security and
cryptography, interoperability standards, clinical or regulatory guidance, domain
workflows, or other evolving external practice. Those decisions pass a research
gate before the design is frozen or implementation encodes the choice.

The gate applies when a proposed authoritative semantic or behavioral change, or a
reference implementation change intended to support such a change, materially
depends on an external fact, standard, methodological convention, empirical result,
or community consensus. Typical domains include statistics and numerical methods,
security and cryptography, canonicalization and identity standards,
interoperability, clinical and regulatory semantics, omics/single-cell/spatial
workflows, causal inference, machine learning, Bayesian methods, and privacy or data
governance. The list is illustrative rather than exhaustive; the trigger is the
dependency on external knowledge, not the topic label.

A research-gated change uses the following discipline:

1. **Research before design freeze.** The question is investigated before the
   implementation or normative wording commits the project to one answer. Where
   practical, the research question is framed without exposing a preferred design
   so that the evidence collection is not merely a search for confirmation.
2. **Independent pass.** At least one research pass is performed independently of
   the agent or reviewer responsible for the proposed solution. For statistical or
   numerical methodology, the project requires a separate LLM/model to perform an
   independent primary-source review before implementation; a second pass in the
   same authoring context is not a substitute. Human expert review may supplement
   this requirement.
3. **Primary-source basis.** Decision-bearing claims are grounded in primary
   sources appropriate to the domain — for example standards and specifications,
   original methodological papers, official guidance, or authoritative upstream
   documentation. Secondary sources may assist discovery or context but do not
   silently replace the primary basis.
4. **Facts, inference, and decision stay separate.** The research record identifies
   what the sources establish, what is inferred from them, what remains uncertain
   or disputed, and which product/Protocol decision the project makes. A project
   convention is not presented as community consensus merely because the project
   needs a deterministic rule.
5. **Material disagreement is adjudicated.** If primary sources materially disagree,
   the area is fast-moving or contested, or the choice is unusually difficult to
   reverse, an additional independent review or direct primary-source adjudication
   is performed before the decision is treated as settled.
6. **Traceable handoff.** The resulting design or decision record identifies the
   research evidence it relied on and the scope to which that evidence applies. No
   fixed evidence schema is required by this process; the artifact only needs to be
   reviewable and stably referenced.

### Research planning, reuse, and priority

The optimization target of the Research Gate is **semantically correct, bounded,
independently checkable Protocol meaning**. Minimizing the number, duration, or cost
of research passes is not a success criterion. Research cost can change sequencing
or motivate a narrower supported scope, but it does not justify leaving a material
external semantic choice implicit or copying a convenient software default.

Research is planned in three reusable layers:

1. **Foundational research** covers cross-cutting semantics that are likely to govern
   many future capabilities. Examples include deterministic randomness and PRNG/seed
   identity, numerical tolerance derivation, iterative-solver reproducibility,
   multiplicity, missing-data semantics, estimand frameworks, stochastic
   verification classes, and external-tool or reference identity.
2. **Method-family research** covers semantics shared by a family of related
   capabilities before every member repeats the same investigation. Examples include
   rank/permutation inference, regression/GLM fitting, survival-analysis event/tie
   semantics, differential-expression workflows, causal weighting/matching, or ML
   evaluation and resampling.
3. **Capability-specific adjudication** resolves the remaining bounded choices that
   change the meaning or result of one concrete Contract or procedure — for example
   a zero-handling convention, a tie method, a confidence-interval construction, or
   a versioned computational branch.

These layers are a planning and reuse structure, not evidence grades or fixed quotas.
A prior investigation is reused only to the extent that its scope, assumptions,
source versions, and unresolved questions still cover the proposed decision. The
normal reopen conditions below continue to apply.

When several near-term capabilities depend on the same unresolved foundational or
method-family semantics, that shared investigation is ordinarily completed before
freezing the first dependent capability. This avoids repeatedly making local choices
that later conflict. Research may therefore run ahead of implementation at the
shared-foundation or method-family level, while implementation should normally
advance vertically — one bounded capability from Contract through verification and
conformance — rather than adding broad shallow support whose semantics have not been
closed.

**Informative initial shared-foundation queue.** The following topics are expected to
be reused across multiple planned capabilities and are candidates for early Research
Gate work as soon as the first dependent capability approaches design freeze:

- seeded reproducibility, PRNG identity, and deterministic permutation/bootstrap/
  stochastic-procedure semantics;
- reproducibility and numerical contracts for iterative optimization and fitting
  procedures, including convergence and tolerance semantics;
- multiplicity families and the exact meaning/versioning of FWER/FDR procedures;
- missing-data declarations, MCAR/MAR/MNAR boundaries, multiple imputation, and
  pooling semantics;
- estimand frameworks and the distinction between statistical targets and causal or
  clinical interpretation;
- standardized effect-size families and confidence-interval/reporting semantics;
- stochastic verification classes, including what can be recomputed from declared
  draws versus what remains an attested or consistency-checked fact;
- identity and consistency semantics for external scientific tools, reference
  databases, and versioned outputs;
- a general numerical-tolerance derivation framework, extending current
  quantity-specific oracle/tolerance work without replacing check-specific evidence.

This queue is not exhaustive and is not an obligation to research an abstract topic
before any concrete use exists. Its purpose is to preserve likely shared work so
that capability design can reuse it instead of rediscovering or contradicting it.

The gate is not a claim of scientific validity and does not replace conformance,
independent numerical oracles, validation studies, security review, or release-gate
evidence. It prevents unsupported external assumptions from becoming Protocol
meaning; those other mechanisms establish different properties.

Disposable exploratory spikes that create no authoritative artifact, pinned
expectation, public contract surface, or implementation behavior intended for merge
are outside the research gate. If an exploratory result is promoted into one of
those forms and the promoted choice materially depends on external knowledge, the
gate applies before that promotion.

The research gate does not need to be repeated for typo fixes, generated-file
synchronization, implementation refactors with no semantic behavior change, tests
that only encode already-authoritative behavior, or straightforward implementation
of a previously researched and still-applicable decision. It reopens when the scope
materially expands, a source or standard is superseded in a way that affects the
decision, new primary evidence creates a material conflict, or implementation
reveals an externally grounded choice that the existing research did not cover.

If the available evidence does not support a sufficiently bounded semantic choice,
the change is deferred or its claim is narrowed. Uncertainty is not resolved by
copying the behavior of the reference implementation, by model memory, or by
silently choosing the most convenient behavior.

The research gate also applies to internal pre-publication work even when the public
RFC discussion window is not yet active.

## Stages

1. **Draft** - the proposal is written down: motivation, exact artifact changes,
   affected Requirement IDs (existing and new), stability tier of the affected
   material, migration impact, and — when the research gate applies — the evidence
   record and its disposition.
2. **Public discussion** - the proposal is open for comment for at least the
   minimum public-discussion window registered for the highest affected
   stability tier. The authoritative windows live in
   [../registries/stability-tiers.yaml](../registries/stability-tiers.yaml);
   this document deliberately does not duplicate the numbers.
3. **Decision** - for CORE material, explicit approval by named stewards is
   required. The decision and its rationale are recorded.
4. **Implementation** - the change lands as one change set updating the
   specification, registries, schemas, conformance artifacts, and regenerated
   views together, per [../AUTHORITY.md](../AUTHORITY.md).

## Identifier discipline

RFCs never renumber or reuse identifiers. Meaning-breaking changes issue new
Requirement IDs and tombstone the old ones per [ID-POLICY.md](ID-POLICY.md).

## Phase 0 status

The process above is defined but has not yet been exercised; no RFC exists.
While the repository is pre-release and has a single steward organization
(Licklider), the discussion windows apply from the first public snapshot
onward; internal pre-publication changes are governed by the validation suite
and this repository's change-coupling rules.
