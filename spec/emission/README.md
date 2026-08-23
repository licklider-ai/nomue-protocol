# Emitting nomue Records

**Status: Normative (EXPERIMENTAL), minimal set.** A guide for a third
party writing software that produces its own nomue Record documents,
without depending on any nomue product or private repository
([../../AGENTS.md](../../AGENTS.md)). Most of what a Record must satisfy is
already defined elsewhere - [../README.md](../README.md) (which indexes
`spec/core/`), [../../canonicalization/](../../canonicalization/README.md),
and [../profiles/](../profiles/README.md) - and this document is mostly a
map of that existing material for someone approaching it from the "I want
to produce output" direction rather than the "I want to verify input"
direction the rest of `spec/` is written from. The emitter specification
currently contains three active requirements: NRS-EMIT-0001, NRS-EMIT-0003,
and NRS-EMIT-0004. NRS-EMIT-0002 is a withdrawn predecessor of
NRS-EMIT-0004.

## Requirements

<a id="NRS-EMIT-0001"></a>
**NRS-EMIT-0001 - Emitted Record schema validity** (stability: EXPERIMENTAL, status: active)
An emitted Record MUST validate against the JSON Schema pinned by its
declared `interpretation_bundle_id`
([../versioning/interpretation-bundle.md](../versioning/interpretation-bundle.md)).
This is independently checkable: any conforming JSON Schema implementation
loading the published schema files under
[../../schemas/](../../schemas/README.md) reaches the same verdict, without
running this repository's reference verifier.

<a id="NRS-EMIT-0002"></a>

Informative note (withdrawn): **NRS-EMIT-0002 - Emitted Record digest
correctness** was withdrawn and superseded by
[NRS-EMIT-0004](#NRS-EMIT-0004) after the pre-release domain-separation
revision (ADR-0029). Its untagged SHA-256(JCS projection) wording conflicted
with the domain-separated digest defined by NRS-CANON-0022.

<a id="NRS-EMIT-0004"></a>
**NRS-EMIT-0004 - Emitted Record domain-separated digest correctness** (stability: EXPERIMENTAL, status: active)
An emitted Record's declared `integrity.content_digest` MUST equal the Record
content digest defined by
[NRS-CANON-0022](../../canonicalization/record-canonicalization.md#NRS-CANON-0022)
over the NRS-CORE-0006 digest projection.

Informative note: a third-party implementation can reach the same digest
independently by applying RFC 8785 JCS, the fixed record-content domain tag
`nomue/record-content/v1` + LF, and SHA-256 -
[../../canonicalization/test-vectors/](../../canonicalization/test-vectors/manifest.yaml)
exists so a third party can check their own JCS implementation against
known-correct output first. Expected fixture values for NRS-EMIT-0001 and
NRS-EMIT-0004 (E-001..E-005,
[../../conformance/manifest.yaml](../../conformance/manifest.yaml)) are
computed independently - AJV against the raw schema files for NRS-EMIT-0001,
an independent JCS package plus `node:crypto` for NRS-EMIT-0004 - rather than
derived from the reference verifier's own output.

## Goal and non-goal

- **Goal**: it is possible, using only this public specification, to write
  a program that emits a JSON document a conforming verifier accepts -
  without running any part of the nomue product, without an agent session,
  and without any interactive clarification protocol.
- **Non-goal**: this document does not attempt to help a third party
  replicate the full nomue product environment (the analysis-decision
  collection flow, the clarification UI, the agent orchestration that
  produces a Record end-to-end in the actual product). That is Layer 2
  scope, explicitly excluded from this repository
  ([../core/layer-boundary.md](../core/layer-boundary.md)). A third-party
  emitter that already has its own analysis pipeline, statistics results,
  and metadata only needs to know how to shape and seal that data as a
  Record - this document, and the requirements it maps, covers exactly
  that.

## What an emitter must produce, mapped to existing requirements

1. **A Record document matching the pinned schema for the interpretation
   bundle you declare.** `interpretation_bundle_id` selects everything else
   (NRS-VERSION-0003); there is no default. See
   [../versioning/interpretation-bundle.md](../versioning/interpretation-bundle.md)
   for the currently registered bundles and
   [../../schemas/record/](../../schemas/record/) /
   [../../schemas/profiles/](../../schemas/profiles/) for their exact
   shape.
2. **A correctly computed content digest**, not merely a plausible-looking
   one. The digest is defined by NRS-CANON-0022 over the NRS-CORE-0006
   projection
   ([../../canonicalization/record-canonicalization.md](../../canonicalization/record-canonicalization.md)).
   `pnpm nomue-record digest <record.json>` (non-normative reference
   implementation) computes this; an emitter is free to implement JCS
   itself, and `canonicalization/test-vectors/` exists precisely so an
   independent implementation can be checked against known-correct output
   without trusting the reference implementation.
3. **Values within the finite-binary64 numeric model**: no raw `NaN` or
   `Infinity` tokens, no reliance on distinguishing `-0` from `0`
   ([../../canonicalization/phase-1-numeric-model.md](../../canonicalization/phase-1-numeric-model.md)).
4. **Profile-specific admissibility** (for the ITGC guarantee profile:
   exactly two groups, declared independence, matching observation/group
   references, and so on -
   [../profiles/independent-two-group-continuous/admissibility.md](../profiles/independent-two-group-continuous/admissibility.md)).
   An emitter that declares results outside a supported profile's
   admissibility conditions will see them reported as a failed
   admissibility check, not silently accepted.
5. **Honest declared results.** A verifier recomputes and compares; an
   emitter gains nothing by declaring a result it did not actually compute
   correctly (NRS-VERIFY-0009 and the profile's own computation
   requirements), since a mismatch fails closed rather than being averaged,
   rounded, or otherwise smoothed over.

## What an emitter must NOT do

- Do not add fields the current schema does not declare. The Phase 1/2A
  surface is closed (`additionalProperties: false` throughout,
  NRS-CORE-0007); an unrecognized field is a structural conformance
  failure, not a tolerated extension (no extension mechanism exists yet,
  [../extensions/README.md](../extensions/README.md)).
- Do not fabricate a `not_asserted` field as if it were evidence of
  anything, and do not attempt to make a report claim more than it should
  by shaping input to produce a misleadingly clean-looking result set
  ([relying-party-interface.md](../verification/relying-party-interface.md)
  describes the reading side of this same discipline).
- Do not treat identifiers as locators. `record_id`/`revision_id` and any
  other declared identifier are opaque strings a verifier never
  dereferences (NRS-CORE-0004); an emitter should not encode meaning into
  them that depends on dereferencing.

## No signing or digest indirection (Batch 5)

<a id="NRS-EMIT-0003"></a>
**NRS-EMIT-0003 - No Reference or Transform indirection in emitted material** (stability: EXPERIMENTAL, status: active)
An emitter MUST NOT introduce any indirection between a digest or
signature and the bytes it covers: no by-reference signing target (a
digest of a pointer standing in for the pointed-to content), no
transform chain applied between the covered bytes and the hash input, and
no field whose meaning is "the real payload is elsewhere". The covered
bytes are the canonical form itself, directly - this specification
deliberately has no Reference/Transform mechanism (the XML-DSig
family's indirection surface is the canonical cautionary example), and an
emitter MUST NOT emulate one inside string fields. Emitters also share
the input-stage MUSTs verbatim: never emit duplicate member names
(NRS-CANON-0014) and never emit a negative-zero number token
(NRS-CANON-0015).

## Validating your own output before distributing it

`pnpm nomue-record verify <record.json>` (or an independent implementation
of the same public specification) is how an emitter checks its own work
before distributing a Record. There is no separate "emitter conformance"
check: an emitted Record is judged by the exact same structural, semantic,
canonicalization, and public-check requirements as any other Record
(see [../../conformance/README.md](../../conformance/README.md)'s
`emitter` family note).
