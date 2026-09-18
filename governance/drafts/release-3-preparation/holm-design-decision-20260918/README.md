# Holm output-design decision preparation

Date: 2026-09-18 UTC. Informative, unissued, and **pending independent design
review**. This is a continuation of PR #330, not a replacement implementation or
a formal Release 3 decision packet. No candidate, registry, RFC, support flag,
research disposition or public snapshot is changed.

## What this checkpoint supplies

The development direction is to return safely established Record-local results
even when caller expectations disagree, and to report safely established
nonconformance as failure rather than refuse every such input. Refusal remains
necessary when safe, faithful reporting is impossible. The coordinator carries
forward the owner's earlier development instruction; this is not an attributable
formal steward adoption record.

1. [Design dispositions](DESIGN.md) turn the three recorded questions into an
   explicit proposed dependency policy and report/refusal boundary.
2. [Acceptance matrix](ACCEPTANCE.md) specifies 36 required cases, not executed
   test evidence or registered conformance fixtures.
3. [Landing and milestones](LANDING.md) separates successor engineering,
   shared-verifier integration, authoritative coupling and adoption.
4. [Independent review commission](REVIEW-COMMISSION.md) fixes the review scope,
   failure questions and return format before dependent implementation begins.

The constant schema-admission row becomes a genuine versioned schema result in
the proposed successor. Its exact wire representation and the added storage
result still require implementation and review; candidate.4 is not reinterpreted.

## Fixed evidence and what it does not establish

Repository: `licklider-ai/nomue-protocol`.

| Input                         | Fixed identity                                                                                          | Use and limit                                                                       |
| ----------------------------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Packet base main              | `0c7a685a1ea6b2b2d0dbe8966c572be95b82755a`                                                              | Current authority and integration baseline; candidate.4 is not present on this base |
| PR #330 preserved head        | `b52389fd3efc6b8968613f59f147a578d5bbb55d`                                                              | Unmerged candidate.4 and adoption preparation; not adopted support                  |
| Changed-surface review target | `8262f8b7312888400e1cb0ce82efc53a004f7a55`                                                              | Conditional bounded readiness, not successor-design approval                        |
| Candidate.4 execution head    | `c999d8b3bf5ff3b8c58b0f018eb6c85b038c65ca`                                                              | Historical runtime evidence, not execution of this proposal                         |
| RFC design questions          | [Issue #274 comment](https://github.com/licklider-ai/nomue-protocol/issues/274#issuecomment-5650143054) | Public discussion of unresolved questions, not their formal disposition             |

Read the fixed PR #330
[packet](https://github.com/licklider-ai/nomue-protocol/tree/b52389fd3efc6b8968613f59f147a578d5bbb55d/governance/drafts/release-3-preparation/holm-adoption-preparation-20260912),
especially `CLAIM-REVIEW.md`, `CONTRACT-PROPOSAL.md`, `COUPLING.md`,
`EXTERNAL-REVIEW-INTAKE.md`, `VALIDATION.json` and `ci/README.md`.
The diff from the reviewed head to the preserved head adds only the intake and
two documentation links; it does not approve the successor proposed here.

The attributed external reviewer used Node 22.22.2 / Python 3.12.3, not the pinned
tuple, and reported envelope/packet snapshot failures. Raw independent probe
scripts/logs were not supplied. Preserve these limits. Candidate.4's separate
hosted evidence includes log-recovered, hash-bound synthetic receipt members;
the original GitHub artifact ZIP was not retrieved in that custody round.
Do not relabel either source as new independent execution or numerical review.

Unchanged Holm/IEEE/B-2 evidence remains reusable within its recorded claim and
byte scope. This packet has not newly inspected primary-source PDFs, run the
candidate suites, or qualified a new numerical implementation. Previously
reported joint human/Claude review is retained without inventing identities or
source-access attestations. No unpublished successor implementation is relied on.

## Completion boundary

This checkpoint prepares a reviewable design, not M4 closure. The next milestone
is a fixed-head independent design disposition, then a tested unissued successor.
The full 49-technique inventory and the other fourteen R3 candidates remain in
scope with their existing dispositions. A first Holm capability is not completion
or narrowing of the comprehensive R3 programme. R2 dependencies remain conditional
on the exact reused interface; R4 and Naik/MTO-02 are not prerequisites of this slice.

Prepared with OpenAI Codex assistance in the continuing author/coordinator
context. Self-checks are author checks, not independent or human expert review.
