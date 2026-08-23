# R1-12 Legal Adoption Review — 2026-08-20

**Gate:** R1-12 — Legal implementation boundary  
**Class:** Release 1 evidence record  
**Decision posture:** pre-candidate legal package adopted; gate remains open until candidate freeze/pin under the 2026-08-18 gate-reset rule

## Evidence reviewed

The Release 1 legal package now contains the required implementation boundaries:

1. **Specification license** — `LICENSE.md` applies CC BY 4.0 to Protocol Prose.
2. **Verifier/code license** — `LICENSE.md` applies Apache-2.0 to software and machine-readable materials, including verifier/reference code, schemas, registries, conformance materials, tooling, and bindings.
3. **Patent implementation terms** — `LICENSE.md` contains a separate Essential-Claims-limited worldwide royalty-free Protocol Patent Grant with scoped defensive termination, first-brought defensive-action protection, anti-circumvention, and successor/assignment handling.
4. **Contribution terms** — `LICENSE.md` distinguishes non-normative Apache contributions from External Normative Contributions and prohibits incorporation of an External Normative Contribution without a separate written Contributor Agreement already in effect.
5. **Legal review record** — the licensing architecture and draft clauses were subjected to repeated LLM-assisted adversarial review. The final clause-level review returned `B — Adopt after targeted redlines`; the identified P0 drafting gaps and selected P1 clarifications were applied before adoption.

## Founder decision and counsel boundary

The Founder/CEO previously communicated a legal-check disposition and approved recording it. During the subsequent drafting process, the Founder clarified that no external-lawyer approval had actually been obtained for the final `LICENSE.md` terms.

On 2026-08-20 the Founder/CEO explicitly decided to **skip external counsel review for Release 1**, proceed with the reviewed terms, and accept the residual legal risk in order not to block Release 1. The project therefore makes **no claim that outside counsel reviewed or approved this license**.

This is a deliberate release-risk decision, not an assertion that every clause is enforceable in every jurisdiction. Counsel review is deferred and may be obtained if later events materially increase legal exposure, such as patent enforcement, material patent transfer/M&A, or a successor release with a changed patent surface.

## Pre-candidate disposition

The prior R1-12 blocker — absence of adopted specification/code licenses, patent implementation terms, and contribution terms — is resolved by the adopted `LICENSE.md`.

R1-12 is **not closed in this record**. The repository's 2026-08-18 gate-reset decision requires every Release 1 gate to remain `open` with a null current decision until a final candidate is frozen and pinned. After candidate C is pinned, R1-12 should receive a candidate-scoped confirmation that the frozen candidate contains the same adopted legal package, then be closed by steward decision.
