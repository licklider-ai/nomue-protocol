# ADR-0006: RFC 8785 JCS and SHA-256 Digest Projection

**Status: Accepted** (Phase 1, 2026-08-10). **Extended by
[ADR-0018](ADR-0018-strict-jcs-input.md)** (Phase 2A repair): raw input
must be JCS-eligible - duplicate object member names and unpaired
surrogates are rejected before canonicalization or digest computation, so
no digest is ever computed from ambiguous input.

## Context

The content digest must be recomputable byte-for-byte by independent
implementations on any platform, from JSON whose presentation (member order,
whitespace, number notation) may vary.

## Decision

- The digest input is the Record with exactly the `integrity` member removed;
  nothing else is excluded (NRS-CORE-0006).
- The projection is canonicalized with RFC 8785 JCS (NRS-CANON-0001), encoded
  as UTF-8, and hashed with SHA-256 (NRS-CANON-0002), recorded as
  `sha256:` + 64 lowercase hex digits.
- Canonicalization or digest failure fails closed (NRS-CANON-0005).
- Test vectors are cross-checked against an independent existing JCS
  implementation; the reference canonicalizer is never its own only witness.

## Consequences

- Digest stability rides on JCS's ECMAScript number serialization, which
  binary64-based implementations reproduce deterministically.
- Signed-zero and number-notation differences vanish in the canonical form,
  which the numeric model aligns with (ADR-0007).

## Rejected alternatives

- **Hash the raw bytes as transmitted**: rejected; presentation-equivalent
  documents would get different digests.
- **Custom canonicalization**: rejected; an RFC with existing independent
  implementations beats a bespoke scheme for cross-checking.
- **Multihash/multibase envelope**: deferred; one fixed algorithm is enough
  for a Public Draft and avoids a premature agility surface.
