# Name Usage Policy (Draft)

**Status: Draft, open for review.** This is project governance describing
how the names "nomue Record" and "nomue-attested" may be used descriptively
by third parties. It is **not** a trademark filing and does not address
trademark registration or ownership, which is resolved separately and is
not reopened by this document. Copyright and patent licensing are governed
by the repository-root [LICENSE.md](../LICENSE.md). This draft follows the
same review discipline as any other governance change in this repository
([RFC.md](RFC.md)) and is not binding until accepted.

## Why two different names, two different conditions

"nomue Record" describes a _format claim_: a document that actually
conforms to this specification's public contract. "nomue-attested"
describes a _signature claim_: a statement that a specific party performed
a specific verification procedure and signs for the result. These are
different claims with different consequences for a reader, so they carry
different usage conditions.

## Using "nomue Record"

A document or a piece of software MAY be described as producing, consuming,
or being a "nomue Record" if it satisfies what this draft calls **Layer 1a
conformance**:

- a document called a "nomue Record" actually validates against a
  currently registered Record schema for the interpretation bundle it
  declares (no unregistered or invented bundle), and its declared content
  digest matches the recomputed one;
- software that claims to "verify nomue Records" implements the public
  verification behavior this specification defines - conformance,
  integrity, admissibility/computability, and recomputation as applicable -
  and does not emit a prohibited overall status (NRS-VERIFY-0001) or claim
  scientific validity beyond what NRS-VERIFY-0003 permits;
- neither claim requires using the reference implementation in this
  repository (`reference/verifier`, `reference/stats-kernel`) - those are
  explicitly non-authoritative, and an independent implementation that
  satisfies the specification is just as entitled to the name as the
  reference one.

A document or tool that does not meet Layer 1a conformance should not be
described as a "nomue Record" or a "nomue Record verifier" - not because of
trademark enforcement (out of scope here), but because the claim would be
false: readers reasonably infer from the name that the public contract
actually holds.

## Using "nomue-attested"

"nomue-attested" is reserved for the project's own signature only: a
statement produced under the Protocol's experimental attestation cryptosuite
and trust semantics and signed by a project key that is valid under the
published trust-root rules.

An EXPERIMENTAL normative attestation contract and signature-suite/trust
semantics exist in [../spec/attestation/README.md](../spec/attestation/README.md),
but every Release 1 interpretation bundle declares `attestation_support: none`
and the trust-root registry contains no production key. Therefore Release 1
supports no production `nomue-attested` output, and neither the project nor a
third party can truthfully represent a Release 1 result as `nomue-attested`.

A third party's own independent verification result, however faithfully
computed, is a "nomue Record verification" (if it satisfies Layer 1a
conformance above), not a "nomue-attested" one; the latter term is
specifically about whose signature is on the statement and whether that
signature satisfies the applicable trust-root semantics, not about how
correct the underlying verification was.

## What this document does not decide

- Trademark registration, ownership, or enforcement - resolved elsewhere,
  not reopened here.
- Whether or when a future registered interpretation bundle will bind
  production attestation support.
- Any conformance-mark, badge, or logo program - not addressed by this
  draft; a future revision may propose one.

## Status of this draft

This is project governance proposed as part of Phase 2A hardening, not yet
accepted per the RFC process in [RFC.md](RFC.md). Until accepted, its content
is a proposal, not a rule.
