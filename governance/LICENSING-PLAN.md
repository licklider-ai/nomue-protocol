# Licensing Decision and Adoption Record

**Status: adopted for Release 1.** The operative legal terms are the repository-root
[`LICENSE.md`](../LICENSE.md). This document records the governance decision and
implementation boundary; it is not a substitute for the grants in `LICENSE.md`.

## Adopted Release 1 structure

| Artifact class                                                                                                                                                             | Adopted treatment                                                                            |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Protocol specification and explanatory prose authored by Licklider                                                                                                         | Creative Commons Attribution 4.0 International (`CC BY 4.0`)                                 |
| Software and machine-readable materials authored by Licklider, including schemas, registries, conformance fixtures/vectors, tooling, bindings, and reference/verifier code | Apache License 2.0 (`Apache-2.0`)                                                            |
| Patent rights necessary to implement officially published Covered Specifications                                                                                           | Supplemental Essential-Claims-limited royalty-free Protocol Patent Grant in `LICENSE.md`     |
| External contributions that alter Protocol normative meaning or conformance behavior                                                                                       | Not accepted without a separate written Contributor Agreement in effect before incorporation |

The copyright licenses and the Protocol Patent Grant are legally distinct. Defensive
termination of the Protocol Patent Grant does not terminate or modify rights under
CC BY 4.0 or Apache-2.0. Apache-2.0's own patent and contribution provisions apply to
Apache Materials according to Apache-2.0 itself.

## Proprietary implementation boundary

The Protocol standardizes the minimum semantics necessary for interoperability and
independent verification. Commercially differentiated implementation techniques are
not made Protocol requirements merely because they improve performance, automation,
scale, management, deployment, or user experience.

Technology Licklider intends to retain as proprietary product or licensing value must
not be made a Normative Requirement (including a normative optional requirement)
unless the steward explicitly decides that making that technology part of the
royalty-free Protocol surface is strategically preferable to retaining it as
proprietary implementation technology.

The operative Essential Claims definition, exclusions, Covered Specification scope,
defensive termination, successors/assigns terms, contribution boundary, and other
legal mechanics are defined only in [`LICENSE.md`](../LICENSE.md).

## Release 1 review and adoption

The Release 1 licensing design underwent multiple independent LLM-assisted adversarial
reviews, including a clause-level attack review of the drafted `LICENSE.md`. The final
review found no architectural blocker and recommended targeted drafting repairs. Those
repairs were applied before adoption.

The Founder/CEO explicitly decided on 2026-08-20 to proceed without external counsel
review for Release 1 and accepted the residual legal risk. This fact must not be
represented as external-counsel approval. Professional counsel review is deferred and
may be obtained later, particularly before a future patent dispute, material patent
transfer/M&A event, or successor release where the legal risk materially changes.

## Contribution boundary

Discussion, issue reports, suggestions, and feedback are welcome but do not by
themselves create a Protocol patent commitment or an accepted normative contribution.
An external change is normative based on its semantic effect, not its file type or
outbound license. For example, a schema or registry change that alters Protocol
normative meaning or conformance behavior is an External Normative Contribution even
though the file is otherwise Apache-2.0 licensed.

External Normative Contributions are not incorporated until a separate written
Contributor Agreement applicable to that contribution is in effect. Release 1 does
not establish a general Corporate CLA, DCO, or contributor portal.

## Trademark boundary

Trademark ownership, registration, certification programs, and detailed name-use
rules are separate from copyright and patent licensing. `LICENSE.md` grants no
trademark or endorsement rights beyond nominative or descriptive uses independently
permitted by applicable law.
