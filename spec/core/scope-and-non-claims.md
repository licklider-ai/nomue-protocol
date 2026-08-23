# Scope and Non-Claims

**Status: Informative overview.** Binding guarantee boundaries and non-claims
are owned by the [Charter](../../CHARTER.md), normative verification/profile
requirements, registered public checks, and report schemas. This page summarizes
those boundaries and does not create an independent source of truth.

## Scope

The broader Protocol scope includes the following as each is defined in its own
phase. A concept appearing here does not mean that every registered Record schema or
interpretation bundle supports it:

- declarations about a scientific analysis,
- analytical decisions,
- inputs and provenance references,
- results and artifact bindings,
- revision lineage,
- verification results,
- finalized human-approval facts,
- attestations,
- extensions and profile identification, and
- the stored form of policy-evaluation results.

The initial domain is the life sciences. The first supported statistical profile is
the Independent Two-Group Continuous Profile (`NRS-PROFILE-ITGC` namespace); its
Phase 1 minimal slice supports only the two-sided Welch two-sample t-test (see
[../profiles/independent-two-group-continuous/README.md](../profiles/independent-two-group-continuous/README.md)).

## Non-claims

nomue Record does not guarantee, and no conforming artifact or verifier output
asserts:

- the correctness of a research project as a whole,
- the truth of scientific conclusions,
- the truthfulness of input data or of researcher declarations,
- causal relationships,
- acceptance of a paper by any venue,
- complete compliance with laws or regulations,
- the validity of arbitrary statistical methods, or
- scientific validity outside an explicitly supported profile.

Scientific validity outside a supported, scoped procedure is represented as
_not asserted_ (see
[verification-principles.md](verification-principles.md)), which is deliberately
distinct from both "unknown" and "passed".

## Relation to Release 1

Release 1 is a Public Draft: an immutable, bounded experiment intended to test the
project's core hypotheses, not a completed standard. The gates that bound it are
registered in
[../../authority/release-1-gates.yaml](../../authority/release-1-gates.yaml).
