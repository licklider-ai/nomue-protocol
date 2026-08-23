# ADR-0027: Canonicalization Hardening - Pre-Release Destructive Revision

**Status: Accepted** (Batch 5, ratified decisions E1'-E5', 2026-08-13).

## Context

Two R-B surveys plus a targeted falsification review (intake slots
reserved under `evidence/research/`; documents provided by the steward)
produced an 18-item integrated inspection list for the canonicalization
and input path. Implementing the ratified fixes required changing digest
computation itself - something possible ONLY before any public release,
because every existing digest value changes.

## Decision

1. **Domain separation (E4, NRS-CANON-0020)**: the record-content digest
   prefixes `nomue/record-content/v1` + LF; the snapshot-manifest hash
   prefixes `nomue/snapshot-manifest/v1` + LF; the attestation signing
   payload uses DSSE PAE with payload type
   `application/vnd.nomue.assertion+json`. Bytes hashed in one context can
   no longer collide with another context.
2. **Canonicalization version advanced**:
   `urn:nomue:canonicalization:jcs:0.1.0-draft.1` ->
   `urn:nomue:canonicalization:jcs:0.2.0-draft.1`, updated IN PLACE across
   both Record schemas' consts, all three interpretation-bundle entries,
   and the authoring toolchain.
3. **Input-stage MUSTs (E1', NRS-CANON-0014/0015)**: lexical-stage
   duplicate detection fixed as the required detection stage for emitter
   and verifier; negative-zero number tokens rejected with the new
   `NRS-NEGATIVE-ZERO-NUMBER` (Erratum 7920 SHOULD -> this spec's MUST).
   The golden vector `negative-zero` was RECLASSIFIED from kind
   `canonical` (normalize to 0) to `strict_rejection`.
4. **Two-stage gate (E2', NRS-CANON-0016/0017, NRS-VERIFY-0027)**:
   canonical bytes are the storage/exchange form; ingress
   canonicalize-then-compare; verify-stage stored-bytes digest plus
   idempotency; verified bytes are the bytes handed onward (DSSE
   discipline verbatim).
5. **Unicode domains (E3', NRS-CANON-0018/0019)** and **hash identity
   (E5, NRS-CANON-0021)** as specified in
   `canonicalization/record-canonicalization.md`.

## Why this is legitimate despite being destructive

Nothing has been published: no Public Draft snapshot exists, no gate has
closed on any digest value, and no external party holds a Record. The
immutability rules this revision would otherwise violate
(NRS-VERSION-0006 bundle immutability, the retained-schema convention,
ADR-0017's S-001 input-byte pin) protect PUBLISHED meaning; the steward
ratified editing them in place now precisely because this window closes at
first publication. Everything was regenerated in one coherent commit set:
conformance fixtures (120), golden vectors (16), both examples, evidence
pins, TypeScript bindings, and the S-001 pin
(old `afe74c54bb4f9c45e0fb25c9dc548ea5ff2b93993ebf9b30d8dab9dbeb3d3845`,
new `480282507229c7f048c3a423f4a5f594e62b0c9f2a83c38551d9a93c2199168c` -
its bytes embed the canonicalization id and a digest).

## Old-digest incompatibility (pinned in the negative)

Digests computed under 0.1.0-draft.1 DO NOT match under 0.2.0-draft.1.
`tooling/tests/canonicalization-hardening.test.ts` pins this: the legacy
untagged digest of a valid Record differs from the new tagged digest, and
a Record declaring its legacy digest now fails integrity verification.
The verifier version advanced to 0.2.0-draft.5.

## Rejected alternative

Serialization-format change (CBOR or similar deterministic encodings) was
already rejected by the ratified decision: current JCS is retained and
reinforced by this batch's constraints instead.
