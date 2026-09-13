# Bounded Holm adoption preparation

Base: `4a62f8e1768049560cb0ce8f09ef1676cb42130b` (main after PR #329).
Date: 2026-09-12 UTC. Informative and unissued. The owner requested work toward
M1–M4 preparation, with self-adversarial checks and durable PR preservation.
No authoritative artifact, public support, identifier allocation, RFC window,
research-gate state or release decision changes in this packet.

Accountable role: repository contributor with OpenAI Codex assistance in the
continuing author/coordinator context. The visible conversation includes earlier
work summaries. This is not a fresh independent reviewer or a human expert.
No original Holm/IEEE PDFs were newly inspected; attributed fixed source reviews
are reused, with implementation hash/delta checks and actual regression execution.
The user's report of joint human/Claude review for #318–#325 is retained from
PR #328; no extra identity, source-reading or timing attestation is invented.

## Read in this order

1. [Claim applicability](CLAIM-REVIEW.md): bounded source/B-2 reuse and new deltas.
2. [Contract proposal](CONTRACT-PROPOSAL.md): exact supported operation and outputs.
3. [RFC impact](RFC-IMPACT.md): existing authority constraints and discussion boundary.
4. [Coupling plan](COUPLING.md), `REQUIREMENTS.json`, `SURFACES.json`, and
   `REGISTRY-PREVIEW.json`: concrete proposed ownership, rows and destinations.
5. [Self-review](SELF-REVIEW.md), `VALIDATION.json`, and [restart](RESTART.md).
6. [External review intake](EXTERNAL-REVIEW-INTAKE.md): fixed-head reported
   findings and unresolved steward design questions, recorded on 2026-09-13.

The executable successor is
[candidate.4](../holm-separated-candidate-20260912/README.md).
Its new conformance separation closes an implementation gap found while preparing
adoption. It does not claim final review of that new output contract.

## Milestones and completion criteria

| Work milestone          | Preparation outcome                                                                                                                        | Acceptance boundary                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| M0 custody              | Base candidate, predecessor heads and evidence preserved                                                                                   | Completed by #329; preserved here                                                            |
| M1 claim applicability  | Exact numerical pins, accepted source scope, prior B-2 recommendation and changed public/control surfaces separated                        | Coordinator disposition prepared; steward acceptance and final changed-surface review remain |
| M2 bounded Contract     | One all-pairs supplied-p operation, exact/display comparison, separate conformance, unknown size, execution bounds and non-claims explicit | Concrete proposal prepared; no semantic freeze claimed                                       |
| M3 coupling             | Successor executable/schema/tests, explicit property ownership and prospective authority/registry destinations                             | Not an apply-ready authoritative patch; see remaining joins in COUPLING.md                   |
| M4 final readiness      | Adversarial controls and source-bound CI prepared/executed as recorded in VALIDATION.json                                                  | Final independent changed-surface review, remaining coupling and RFC disposition required    |
| M5 adoption/publication | Later exact decision, authoritative integration, freeze and release checks                                                                 | Not performed                                                                                |
| M6 breadth              | Fourteen other candidates retained with original dispositions                                                                              | Not a prerequisite of this bounded first capability                                          |

These milestone labels are planning locators, not a second release-gate registry.
There is no single overall completion percentage. Numerical evidence, candidate
engineering, authority coupling and publication state are separately observable.
