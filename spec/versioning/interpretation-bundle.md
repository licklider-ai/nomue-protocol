# Interpretation Bundles

**Status: Normative.** This document binds the Phase 1 interpretation-bundle
model. The registry is
[../../registries/interpretation-bundles.yaml](../../registries/interpretation-bundles.yaml);
fail-closed handling of unsupported combinations is bound by
[../core/versioning-principles.md#NRS-VERSION-0002](../core/versioning-principles.md#NRS-VERSION-0002).

## Bundle requirements

<a id="NRS-VERSION-0003"></a>
**NRS-VERSION-0003 - Interpretation bundle declaration** (stability: CORE, status: active)
A Record MUST declare the interpretation bundle under which it is to be parsed
and verified.

<a id="NRS-VERSION-0004"></a>
**NRS-VERSION-0004 - Bundle version pinning** (stability: STABLE-INTENT, status: active)
An interpretation bundle MUST pin the applicable Schema, canonicalization,
profile, public-check, and attestation-support state.

## Informative: Phase 1 bundle

The initial bundle, registered in Phase 1, is
`urn:nomue:bundle:itgc-minimal:0.1.0-draft.1`. It is EXPERIMENTAL, not
publicly released, and declares `attestation_support: none`: no attestation
procedure version exists in Phase 1, and none is fabricated. The Phase 1
bootstrap itself is not a bundle. Being registered earliest carries no
meaning: registry order is non-normative and no default bundle exists
(NRS-VERSION-0007).

A verifier that encounters a bundle identifier it does not support refuses
verification of that Record (fail closed) rather than guessing compatibility
with a nearby version; a Record whose bundle declaration is missing or not
a string receives a routing refusal and selects no bundle at all.

## Informative: independent version identifiers and where each is carried

NRS-VERSION-0004 pins several of these per bundle, but they are tracked in
different places, at different scopes, and not all of them are per-bundle.
This table is a map, not a new requirement; each identifier's binding
authority remains the document or registry cited in its own row.

| Identifier                | What it versions                                              | Where it is carried                                                                                   | Scope                                                                           |
| ------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Specification version     | The normative text itself                                     | `spec_version` on the interpretation-bundle registry entry (`registries/interpretation-bundles.yaml`) | Per bundle                                                                      |
| Schema version            | The Record JSON Schema                                        | `schema_version` on the bundle entry; also the Record's own `$schema` field                           | Per bundle; also self-declared by every Record                                  |
| Canonicalization version  | The JCS profile and digest projection                         | `canonicalization_version` on the bundle entry; also the Record's `integrity.canonicalization_id`     | Per bundle; also self-declared by every Record                                  |
| Public-check version      | The recomputation/consistency checks and tolerances           | `public_check_set_version` on the bundle entry; individual `check_version` per check                  | Per bundle, with finer per-check versioning                                     |
| Verifier version          | The implementation that produced a report                     | `verification-report.schema.json`'s `verifier.name` / `verifier.version` / `verifier.source_commit`   | Per verification report, not per bundle                                         |
| Attestation-support state | Whether a concrete attestation procedure is bound to a bundle | `attestation_support` on the bundle entry (currently `none` for every registered bundle)              | Per bundle; trust semantics exist experimentally, but current bundles bind none |

Attestation trust semantics are defined experimentally by the NRS-ATTEST
requirements and the attestation registries; that is distinct from a bundle
binding a concrete attestation procedure. No currently registered bundle does
so (`attestation_support: none`).

The verifier version is deliberately not a bundle-registry field: a single
bundle can honestly be verified by different verifier builds over time, and
the report — not the bundle registry — is where that fact is recorded
(NRS-VERIFY-0011). A seventh identifier, the profile version (`profile_id`
on the bundle entry), is also independently tracked but is out of scope for
this table because it is specific to the ITGC profile family rather than a
cross-cutting axis.
