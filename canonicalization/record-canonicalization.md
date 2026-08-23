# Record Canonicalization

**Status: Normative.** This document binds the Phase 1 canonicalization and
digest procedure (`NRS-CANON` namespace). The digest projection itself is
bound in [../spec/core/integrity-model.md](../spec/core/integrity-model.md).

## Input eligibility

RFC 8785 JCS operates on parsed values; by the time an implementation's
JSON parser has produced a value, duplicate object member names have
already been collapsed by implementation-defined first-wins or last-wins
behavior, and nothing downstream can detect them. Eligibility is therefore
enforced on the raw JSON text, before bundle routing, schema validation,
canonicalization, or digest computation (ADR-0018).

<a id="NRS-CANON-0007"></a>
**NRS-CANON-0007 - Unique JSON member names** (stability: CORE, status: active)
A Record or verifier input subject to nomue JSON processing MUST NOT
contain duplicate object member names after JSON string escape decoding. A
conforming verifier MUST reject such input before bundle selection, Schema
validation, canonicalization, or verification and MUST NOT apply
first-wins or last-wins semantics.

Informative note: the rule covers every object at every depth, including
objects inside arrays, and rejects duplicates even when the duplicated
values are identical. Member names are compared after escape decoding, so
the literal name `"interpretation_bundle_id"` and its escaped-equivalent
spelling `"\u0069nterpretation_bundle_id"` are the same name.
Member-name-like text inside a string VALUE is not a member name and is
never a false positive.

<a id="NRS-CANON-0008"></a>
**NRS-CANON-0008 - Unicode-valid JSON strings** (stability: CORE, status: active)
A Record or verifier input subject to JCS canonicalization MUST contain
only JSON strings that can be represented as valid Unicode scalar-value
sequences. A conforming verifier MUST reject unpaired surrogate code units
and MUST NOT silently replace, normalize, or discard them.

Informative note: the rule covers object member names and string values at
every depth. Correctly paired surrogates are accepted unchanged. No
Unicode normalization is performed: NFC and NFD sequences are distinct
code-point sequences and remain so through canonicalization.

### Additional input-stage MUSTs (Batch 5, E1')

<a id="NRS-CANON-0014"></a>
**NRS-CANON-0014 - Lexical-stage duplicate detection, emitter and verifier alike** (stability: EXPERIMENTAL, status: active)
RFC 8785 itself requires an input-stage error (its strongest, "must"-level
strength) only for lone surrogates and NaN/Infinity; the requirements of
this section are ADDITIONAL constraints this specification imposes on top
of it. Because the ubiquitous `JSON.parse` silently accepts duplicate
member names with last-wins semantics before any downstream code can see
them, an emitter MUST NOT produce, and a verifier MUST detect at the byte
or lexical stage (by a pre-scan of the raw text or a dedicated lexer,
never by inspecting the parsed value), duplicate object member names -
this fixes the DETECTION STAGE for the duplicate prohibition of
NRS-CANON-0007, which remains the substantive rule.

<a id="NRS-CANON-0015"></a>
**NRS-CANON-0015 - Negative zero input is rejected** (stability: EXPERIMENTAL, status: active)
A number token whose numeric value is negative zero (`-0`, `-0.0`,
`-0e5`, and every equivalent spelling) MUST be rejected at the lexical
stage with `NRS-NEGATIVE-ZERO-NUMBER`; an implementation MUST NOT silently
serialize it to `0`. This raises RFC 8785 Erratum 7920's SHOULD to a MUST
of this specification: silent `-0`-to-`0` collapse would let two byte
sequences with observably different parsed values (under `Object.is`)
share one canonical form and digest without either side noticing.

### Pre-routing rejection priority

<a id="NRS-CANON-0023"></a>
**NRS-CANON-0023 - Pre-routing rejection priority** (stability: EXPERIMENTAL, status: active)
When one input violates several pre-routing rules, a conforming verifier MUST
report the first applicable class in this fixed order and MUST NOT let a later
class override an earlier one. The refusal kind and exit code MUST follow
[../spec/verification/verifier-refusal.md](../spec/verification/verifier-refusal.md):

1. raw resource refusal (byte-size limit; parser exhaustion)
2. malformed JSON syntax (`NRS-PARSE-FAILED`, `parse_error`)
3. duplicate object member name (`NRS-DUPLICATE-JSON-MEMBER`, `parse_error`)
4. invalid Unicode scalar sequence (`NRS-INVALID-UNICODE-STRING`, `parse_error`)
5. negative-zero number token (`NRS-NEGATIVE-ZERO-NUMBER`, `parse_error`)
6. parsed resource limits (nesting depth, observation count, string length)
7. routing envelope violation (`NRS-BUNDLE-ID-MISSING` / `NRS-BUNDLE-ID-INVALID`, `routing_error`)
8. unsupported bundle (`NRS-UNSUPPORTED-BUNDLE`, `unsupported_bundle`)

In classes 1-5 no bundle is selected, no verification report exists, and
no canonical form or digest is produced from the input.

## Canonical form

<a id="NRS-CANON-0001"></a>
**NRS-CANON-0001 - JCS canonicalization** (stability: EXPERIMENTAL, status: active)
The Phase 1 content-digest projection MUST be canonicalized using RFC 8785
JSON Canonicalization Scheme.

Informative note: RFC 8785 fixes member ordering (sorted by UTF-16 code
units), number serialization (shortest round-trip ECMAScript form), string
escaping, and the absence of insignificant whitespace. The canonical output is
encoded as UTF-8. Under JCS, presentation differences in the input - member
order, whitespace, exponent or decimal notation - do not change the
canonical form; negative zero never reaches the canonicalizer since Batch 5
(NRS-CANON-0015 rejects it at the lexical stage).

## Digest

<a id="NRS-CANON-0002"></a>

Informative note (withdrawn): **NRS-CANON-0002 - SHA-256 content digest** was
withdrawn and superseded by
[NRS-CANON-0022](#NRS-CANON-0022) after the pre-release domain-separation
revision (ADR-0029). Its untagged SHA-256(JCS projection) wording conflicted with
the domain-separated digest adopted by ADR-0027 / NRS-CANON-0020.

<a id="NRS-CANON-0022"></a>
**NRS-CANON-0022 - Domain-separated SHA-256 Record content digest** (stability: EXPERIMENTAL, status: active)
The Phase 1 Record content digest MUST be SHA-256 over the UTF-8 byte sequence
formed by concatenating the fixed ASCII context tag `nomue/record-content/v1`,
a single line-feed byte (0x0A), and the UTF-8 encoding of the RFC 8785 JCS
canonical form of the declared digest projection
([../spec/core/integrity-model.md#NRS-CORE-0006](../spec/core/integrity-model.md#NRS-CORE-0006)).

Informative note: the digest is recorded as the string `sha256:` followed by
64 lowercase hexadecimal digits. NRS-CANON-0020 requires domain separation for
digest contexts; this requirement gives the complete Record content digest
formula. The digest projection excludes exactly the `integrity` member and
nothing else.

## Failure behavior

<a id="NRS-CANON-0005"></a>
**NRS-CANON-0005 - Canonicalization failure is closed** (stability: CORE, status: active)
A canonicalization or digest-computation failure MUST fail closed and MUST NOT
be replaced by an inferred or partial digest.

Informative note: inputs outside the Phase 1 numeric model (for example a
non-finite number reaching the canonicalizer) are canonicalization failures,
reported with reason code `NRS-CANONICALIZATION-FAILED`; the verifier never
substitutes a guessed digest.

## Storage, exchange, and the two-stage gate (Batch 5, E2')

<a id="NRS-CANON-0016"></a>
**NRS-CANON-0016 - Canonical bytes are the storage and exchange form; ingress gate** (stability: EXPERIMENTAL, status: active)
The storage and exchange form of a Record MUST be the canonical byte
sequence itself, and at ingress - the point where a byte sequence is FIRST
accepted for storage or exchange - an implementation MUST perform
canonicalize-then-compare (parse, re-canonicalize, byte-compare against
the input) together with the input-stage constraints of this document, and
MUST reject non-canonical bytes rather than re-canonicalize and store its
own output. Ingress is the only point at which a pre-storage substitution
attack is detectable; rewriting bytes there would erase the evidence the
gate exists to catch.

<a id="NRS-CANON-0017"></a>
**NRS-CANON-0017 - Verify-stage digest comparison and idempotency; re-canonicalization is never the only path** (stability: EXPERIMENTAL, status: active)
At verify time an implementation MUST compare the digest computed over the
STORED canonical bytes against the declared digest, and MUST additionally
confirm idempotency (parsing the stored bytes and re-canonicalizing them
reproduces the stored bytes exactly); an implementation MUST NOT make
re-canonicalization of a parsed value the only path through which
verification can succeed, because a canonicalizer defect would then both
produce and confirm the same wrong bytes.

<a id="NRS-VERIFY-0027"></a>
**NRS-VERIFY-0027 - Verified bytes are the bytes handed onward** (stability: EXPERIMENTAL, status: active)
The byte sequence that was verified and the byte sequence passed to the
application layer MUST be identical, and an implementation MUST NOT
re-parse an envelope after verification to extract its payload - the DSSE
discipline, adopted verbatim. Proven in the negative by unit test: the
reference ingress gate returns the original input string on acceptance and
rejects (never rewrites) non-canonical input.

Informative note (cautionary reference): the Matrix ecosystem's Canonical
JSON deployments repeatedly hit signature mismatches and state resets
caused by round-trip re-canonicalization - servers re-serializing events
and verifying their own re-serialization rather than the received bytes.
That operational history is why the two-stage gate above never treats
re-canonicalized output as the thing verified: the received canonical
bytes are the object of verification, and re-canonicalization is only an
idempotency CHECK on top.

## Unicode domains (Batch 5, E3')

<a id="NRS-CANON-0018"></a>
**NRS-CANON-0018 - The signing and digest target is the text as given** (stability: EXPERIMENTAL, status: active)
Digest and signature computation MUST operate on the canonical form of the
text exactly as given; an implementation MUST NOT apply Unicode
normalization (NFC, NFD, or any other transform) to any part of the digest
or signing input - consistent with RFC 8785 section 3.1's own negative
requirement against normalizing.

<a id="NRS-CANON-0019"></a>
**NRS-CANON-0019 - Identifier-domain boundary declaration** (stability: EXPERIMENTAL, status: active)
The set of v0 fields in the IDENTIFIER domain - fields whose values are
matched against external identity systems rather than carried as opaque
content - is empty in practice: attester identity is bound to the key
fingerprint of the trust root, not to a human-readable name, and every
other string field is content or an opaque URN compared only for exact
equality. Any future field addition that introduces a genuine
identifier-domain string MUST be accompanied by an explicit PRECIS-style
profile decision (including whether NFC becomes mandatory FOR THAT FIELD
ONLY) before the field enters any schema; the content domain's
no-normalization rule (NRS-CANON-0018) is never widened by such a
decision.

Informative note (confusables): visually confusable strings with distinct
canonical forms (for example Cyrillic and Latin lookalikes) are a display
problem, not a digest problem: the established course is that display
contracts and public checks may warn about them, while canonicalization
and digests treat them as the distinct code-point sequences they are.

## Domain separation (Batch 5, E4)

<a id="NRS-CANON-0020"></a>
**NRS-CANON-0020 - Digest contexts are domain-separated** (stability: EXPERIMENTAL, status: active)
Each digest context MUST prefix the hashed bytes with its fixed context
tag - `nomue/record-content/v1` + LF for a Record's content digest and
`nomue/snapshot-manifest/v1` + LF for the snapshot-manifest hash - and the
attestation signing payload MUST use the DSSE Pre-Authentication Encoding
with payload type `application/vnd.nomue.assertion+json`; bytes hashed or
signed in one context MUST NOT be presented as a digest or signature of
another context.

Informative note (revision record): the tags arrived with canonicalization
version `urn:nomue:canonicalization:jcs:0.2.0-draft.1` as a PRE-RELEASE
DESTRUCTIVE revision (ADR-0027): digests computed under 0.1.0-draft.1 do
not match, every fixture, golden vector, example, and pin was regenerated
in one coherent commit set, and a negative test pins the incompatibility
(the old untagged digest of a valid Record now fails integrity
verification).

## Hash algorithm identity (Batch 5, E5)

<a id="NRS-CANON-0021"></a>
**NRS-CANON-0021 - The digest algorithm is a declared field, fixed at SHA-256, changed only by spec-version transition** (stability: EXPERIMENTAL, status: active)
The digest algorithm MUST be carried as the explicit
`integrity.digest_algorithm` field (fixed at `sha-256` in v0), and a
change of algorithm MUST happen only through a specification-version
transition - the same discipline as signature-suite changes
([../spec/attestation/README.md#NRS-ATTEST-0006](../spec/attestation/README.md#NRS-ATTEST-0006)) -
never by accepting alternative algorithm values in place. The algorithm
field and the canonicalization version are separate version axes: the
former names the hash, the latter names the canonical-form-and-context
procedure, and neither implies the other
([../spec/versioning/interpretation-bundle.md](../spec/versioning/interpretation-bundle.md)).

## Informative: identifiers stay identifiers

Canonicalization operates on the Record content as given. URIs inside the
Record are treated as opaque strings; nothing is fetched, resolved, or
normalized through network access
([../spec/core/record-envelope.md#NRS-CORE-0004](../spec/core/record-envelope.md#NRS-CORE-0004)).
