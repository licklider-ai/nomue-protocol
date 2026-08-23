# ADR-0026: Ed25519 Adoption and the Post-Quantum Migration Path

**Status: Accepted** (signature-infrastructure decision 1, ratified by the
steward's Batch 4 instruction, 2026-08-13).

## Context

The attestation first increment (spec/attestation/README.md, merged from
`feat/phase-2a-attestation-draft`) shipped
`urn:nomue:signature-suite:ed25519:1` with `status: proposed` - explicitly
a technical proposal, not a decision. The signature-infrastructure
ratification resolves the adoption question and the migration-path
question together.

## Decision

1. **Ed25519 (RFC 8032, plain deterministic variant) is adopted** as the
   v0 attestation signature suite:
   `registries/attestation-signature-suites.yaml` moves the suite from
   `proposed` to `adopted`.
2. **Hedged/randomized signing variants are NOT adopted.** The rationale
   for hedging is resistance to fault-injection attacks against the
   signer; those attacks presuppose physical access to (or glitch-level
   control over) the signing device. The adopted operational model signs
   inside Google Cloud KMS on the server side
   (governance/KEY-CEREMONY-RUNBOOK.md); physical fault injection against
   Google's signing infrastructure is outside this threat model
   (security/threat-model.md's trust boundary), and accepting the
   deterministic variant keeps the suite exactly the RFC 8032 behavior
   every independent verifier library implements.
3. **Runtime algorithm agility remains zero** (NRS-ATTEST-0003 is
   unchanged): a verifier never selects an algorithm by negotiation,
   fallback, or key-shape inference. Adoption changes which single suite
   is allow-listed, not how dispatch works.
4. **The only algorithm-change mechanism is registry + spec-version
   transition** (new normative clause NRS-ATTEST-0006): adding or
   changing an algorithm happens exclusively by adding a NEW versioned
   suite to the allow-list registry together with a specification-version
   transition; existing suite entries are never edited in place to a
   different algorithm, and removal is tombstoning (`withdrawn` +
   `superseded_by`), mirroring governance/ID-POLICY.md.

## Post-quantum migration path (informative reservation)

Named future candidates are **ML-DSA (FIPS 204)** and **SLH-DSA
(FIPS 205)**. These are reserved informatively - no suite entry exists, no
parameters are chosen, and nothing here commits to either - so that the
future transition is a registry addition along the NRS-ATTEST-0006 path,
not a redesign. Operational feasibility note (checked 2026-08-13 against
the Cloud KMS algorithms documentation): Google Cloud KMS already lists
`PQ_SIGN_ML_DSA_{44,65,87}` and `PQ_SIGN_SLH_DSA_SHA2_128S` algorithm
identifiers, so the adopted custody platform has a native path for the
named candidates when a transition is proposed. Long-term validity across
the transition is handled by the LTV note (timestamp + pre-Q-day
resealing), not by the signature algorithm alone - see
spec/attestation/README.md's LTV section.

## Consequences

Verifier behavior is unchanged (the allow-list still contains exactly one
suite; only its status changed). Gate R1-11 is NOT closed by this ADR -
its cryptosuite-structure evidence advances, and the close remains a
steward decision. The trust-root mechanism that gives adoption its
operational meaning is specified in spec/attestation/README.md's trust
root section (NRS-ATTEST-0007/0008, same ratification batch).
