# Verification Principles

**Status: Normative.** This document binds the verification principles of the nomue
Record Specification (`NRS-VERIFY` and `NRS-SEC` namespaces). The Phase 1 check
model, execution/outcome model, and verification report are bound in
[../verification/](../verification/README.md).

## Scoped results

<a id="NRS-VERIFY-0001"></a>
**NRS-VERIFY-0001 - No overall VERIFIED status** (stability: CORE, status: active)
A conforming verifier MUST NOT emit a single overall status named VERIFIED, or an
equivalent unscoped statement implying that the research or Record is correct as a
whole.

Informative note: verification output is a set of scoped results. Collapsing them
into one overall verdict would assert far more than any check actually established.

<a id="NRS-VERIFY-0002"></a>
**NRS-VERIFY-0002 - Scope-bound verification output** (stability: CORE, status: active)
Every verification result MUST identify its evaluated scope, check or procedure
identifier, and applicable version.

<a id="NRS-VERIFY-0003"></a>
**NRS-VERIFY-0003 - Scientific validity is not asserted** (stability: CORE, status: active)
Scientific validity outside an explicitly supported and scoped procedure MUST be
represented as not asserted, not as unknown or passed.

Informative note: "not asserted" is a deliberate third state. "Unknown" would
suggest the question was posed and left unanswered; "passed" would assert an
evaluation that never took place. See the vocabulary registry for the definition.

## Attestations do not change verification

<a id="NRS-VERIFY-0004"></a>
**NRS-VERIFY-0004 - Attestation non-escalation** (stability: CORE, status: active)
Adding, removing, or changing an attestation MUST NOT mutate an existing
verification result.

Informative note: an attestation is a signed assertion by an issuer. It can be
recorded alongside verification results, but it never upgrades, downgrades, or
substitutes for them.

## Offline verification

<a id="NRS-SEC-0001"></a>
**NRS-SEC-0001 - Offline-by-default verification** (stability: CORE, status: active)
A conforming verifier MUST operate without network access for locally available
verification material and MUST NOT implicitly dereference an external URI.

Informative note: a verifier may offer explicit, user-initiated retrieval as a
separate operation, but never silently fetches remote material as part of
verification.
