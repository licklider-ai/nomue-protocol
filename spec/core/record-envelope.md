# Record Envelope

**Status: Normative.** This document binds the Phase 1 minimal Record envelope
(`NRS-CORE` namespace, continued). The structural representation is
[../../schemas/record/record.schema.json](../../schemas/record/record.schema.json);
the digest rules are in [integrity-model.md](integrity-model.md).

## Envelope requirements

<a id="NRS-CORE-0003"></a>
**NRS-CORE-0003 - Minimal Record envelope** (stability: STABLE-INTENT, status: active)
A Phase 1 Record MUST declare its schema identifier, record type, record
identifier, revision identifier, creation time, interpretation bundle, profile,
payload, and integrity metadata.

<a id="NRS-CORE-0004"></a>
**NRS-CORE-0004 - Identifiers are not locators** (stability: CORE, status: active)
A conforming verifier MUST treat Record, revision, schema, profile, bundle,
method, and check identifiers as identifiers and MUST NOT implicitly
dereference them.

Informative note (HTTPS-shaped identifiers): an identifier may itself be an
HTTPS URI - for example a future Protocol-issued identifier under
`https://nomue.ai/id/`
([../../governance/decisions/ADR-0031-nomue-ai-identifier-architecture.md](../../governance/decisions/ADR-0031-nomue-ai-identifier-architecture.md)).
The scheme does not change this clause: identification never implies
retrieval, and a verifier performs no DNS resolution and no fetch to
interpret such an identifier. Even where a human or a browser can retrieve
something at that URI, redirects and retrieved representations carry no
Protocol meaning; the identifier's meaning is fixed by the published
Protocol snapshot, the registries, and the normative documents that bind
it.

<a id="NRS-CORE-0005"></a>
**NRS-CORE-0005 - Revision immutability** (stability: CORE, status: active)
The content associated with a published revision identifier MUST NOT change
without issuance of a new revision identifier.

<a id="NRS-CORE-0007"></a>
**NRS-CORE-0007 - Closed Phase 1 surface** (stability: STABLE-INTENT, status: active)
A Record interpreted under the Phase 1 bundle MUST reject properties not
declared by the applicable Phase 1 Schema.

## Informative: field meanings

- `$schema` - the identifier of the Phase 1 Record Schema. It is an identifier,
  not a locator; a verifier never fetches it.
- `record_type` - the constant `nomue-record`.
- `record_id` - a URI identifying the logical Record. Phase 1 examples use
  URNs. A verifier never dereferences it.
- `revision_id` - a URI identifying one immutable revision of the Record.
  Parent-revision lineage is not represented in Phase 1.
- `created_at` - the Record creation time in RFC 3339 UTC form with a `Z`
  suffix (no numeric offsets). It is a creation time, not a signing time.
- `interpretation_bundle_id` - names the registered combination of schema,
  canonicalization, profile, and public-check versions under which this Record
  is parsed and verified (see
  [../versioning/interpretation-bundle.md](../versioning/interpretation-bundle.md)).
- `profile_id` - names the profile; Phase 1 supports only the Independent
  Two-Group Continuous profile.
- `payload` - the scientific declarations: dataset, design, analysis, and the
  declared result.
- `integrity` - digest metadata for the Record content; excluded from the
  digest input itself (see [integrity-model.md](integrity-model.md)).

## Informative: closed surface

The Phase 1 Schema declares every allowed property and closes the rest
(`additionalProperties: false` throughout). No extension or placeholder fields
exist in Phase 1; the extension mechanism remains reserved
([../extensions/README.md](../extensions/README.md)).
