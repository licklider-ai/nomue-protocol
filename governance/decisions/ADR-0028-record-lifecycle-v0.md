# ADR-0028: Record Lifecycle State Model v0

**Status: Accepted** (Batch 6, two-stage: design approved by the steward
with rulings, 2026-08-13).

## Context

The Batch 6 stage-1 design document
(governance/drafts/record-lifecycle-v0-design.md) proposed the v0
lifecycle state model and stopped for approval. The steward approved with
three rulings, recorded here verbatim in substance.

## Rulings

1. **Design approved as drafted**, including the central architecture -
   state is a DERIVED PROJECTION over the artifact graph, never a mutable
   field in the immutable Record - and the exclusion of the Execution
   axis (six axes adopted: profile_eligibility, check, freshness,
   approval, verification, disclosure).
2. **Tier placement**: the three skeleton intents are **CORE**
   immediately; axis names, the precondition grammar, and the
   clarification format details are **STABLE-INTENT**. Basis: this is an
   application of the ratified "skeleton-CORE + details-STABLE-INTENT"
   mixed-placement decision. The attestation/approval increments'
   EXPERIMENTAL starts were provisional states BEFORE a steward decision
   existed; here the decision exists, so immediate application is
   correct.
3. **Disclosure carrier approved**: the withdrawal/supersession notice
   satellite artifact is introduced, but the new artifact TYPE starts
   **EXPERIMENTAL** and is managed separately from the CORE intents.

## Implementation notes (from the approval)

- The Record envelope is unchanged (welcomed); if a new envelope field
  ever becomes necessary, the draft-3 discipline applies (prove the
  previous schema version rejects the new field).
- The precondition predicate conjunction must not reintroduce an overall
  verdict (NRS-VERIFY-0001) through the back door: the predicate
  vocabulary is CLOSED and contains no outcome-aggregating predicate;
  `tooling/tests/lifecycle.test.ts` pins this in the negative (the design
  document's self-observation, promoted to a test).
- The next-stage MCP reference implementation is noted as this contract's
  first consumer.

## Consequences

New: spec/core/record-lifecycle.md (NRS-CORE-0013..0019), three lifecycle
schemas (state view, clarification, disclosure notice - EXPERIMENTAL
artifacts), the lifecycle-operations registry with its meta-schema, the
projection/precondition reference implementation
(reference/verifier/src/lifecycle.ts), the `lifecycle` conformance family
(LC fixtures), reason code NRS-LIFECYCLE-PRECONDITION-NOT-MET, an
appended boundary clarification on ADR-0001, and state-reading notes in
the relying-party interface. No gate state changes; no Record envelope or
bundle change; no verifier pipeline change (the projection is a separate
entry point).
