# ADR-0009: Verification Report Separate from Record

**Status: Accepted** (Phase 1, 2026-08-10)

## Context

Verification output could be embedded in the Record, or exist as its own
artifact. Embedding would mutate the verified revision and blur who asserts
what.

## Decision

A verification report is a separate artifact (NRS-CORE-0008). It pins the
exact record identifier, revision identifier, recomputed content digest,
bundle, and check versions (NRS-VERIFY-0011); separates conformance from
verification results (NRS-VERIFY-0005); carries scoped results under the
execution/outcome invariant (NRS-VERIFY-0010) with registered reason codes
(NRS-VERIFY-0012); has no overall status, no VERIFIED value, no whole-record
boolean; and fixes `scientific_validity` to `not_asserted`. A verification
semantic projection (report minus `generated_at` and `verifier`) defines
cross-environment agreement.

## Consequences

- A Record revision stays immutable through any number of verifications.
- Reports from different verifiers and platforms are comparable via the
  projection hash.
- Consumers wanting a one-bit answer must read scoped results; that friction
  is deliberate.

## Rejected alternatives

- **Embedding results in the Record**: rejected; it mutates the revision and
  conflates issuer assertions with verifier findings.
- **An overall status field "for convenience"**: rejected; it is exactly the
  overclaim NRS-VERIFY-0001 prohibits.
