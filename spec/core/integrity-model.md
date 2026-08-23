# Integrity Model

**Status: Normative.** This document binds the Phase 1 integrity model. The
canonicalization and digest algorithms themselves are bound in
[../../canonicalization/record-canonicalization.md](../../canonicalization/record-canonicalization.md).

## Digest projection

<a id="NRS-CORE-0006"></a>
**NRS-CORE-0006 - Integrity exclusion** (stability: STABLE-INTENT, status: active)
The integrity object MUST be excluded from the content-digest projection, and
no other declared Record field MAY be silently excluded by the Phase 1 bundle.

Informative note: the content-digest projection is the Record object with the
`integrity` member removed and every other declared member retained:

```json
{
  "$schema": "...",
  "record_type": "...",
  "record_id": "...",
  "revision_id": "...",
  "created_at": "...",
  "interpretation_bundle_id": "...",
  "profile_id": "...",
  "payload": {}
}
```

The projection is canonicalized with RFC 8785 JCS, prefixed with the fixed
record-content domain tag `nomue/record-content/v1` and a line-feed byte, then
hashed with SHA-256; the complete formula is defined by
[NRS-CANON-0022](../../canonicalization/record-canonicalization.md#NRS-CANON-0022).
The digest is recorded as `sha256:` followed by 64 lowercase hexadecimal digits.
A verifier recomputes this digest from the Record content and compares it with
the declared `integrity.content_digest`; it never trusts the declared value.

Informative note: content digest consistency is not an authorship or
authenticity guarantee.

A digest is only ever computed from JCS-eligible input: raw JSON that
contains a duplicate object member name or a string with an unpaired
surrogate is rejected before canonicalization, so no canonical form and no
digest exist for ambiguous input, and the same raw bytes can never carry
two different digest meanings across implementations
([../../canonicalization/record-canonicalization.md#NRS-CANON-0007](../../canonicalization/record-canonicalization.md#NRS-CANON-0007),
[../../canonicalization/record-canonicalization.md#NRS-CANON-0008](../../canonicalization/record-canonicalization.md#NRS-CANON-0008)).

## Informative: integrity fields

- `canonicalization_id` - identifies the canonicalization procedure; under the
  Phase 1 bundle this is the registered JCS canonicalization identifier.
- `digest_algorithm` - the constant `sha-256` in Phase 1.
- `digest_scope` - the constant `record_without_integrity` in Phase 1, naming
  the projection above.
- `content_digest` - the declared digest of the canonicalized projection.

## Informative: out of scope in Phase 1

Signing scopes, signatures, attestation, trusted time, and issuer identity are
not defined in Phase 1 (see
[../attestation/README.md](../attestation/README.md) and gate R1-11).
