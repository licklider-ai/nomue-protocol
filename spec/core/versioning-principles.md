# Versioning Principles

**Status: Normative.** This document binds the versioning principles of the nomue
Record Specification (`NRS-VERSION` namespace). Concrete version-transition
documents and registered interpretation bundles live under
[../versioning/](../versioning/README.md) and in
[../../registries/interpretation-bundles.yaml](../../registries/interpretation-bundles.yaml).

## Snapshots

<a id="NRS-VERSION-0001"></a>
**NRS-VERSION-0001 - Immutable public snapshots** (stability: CORE, status: active)
Each published Public Draft snapshot MUST be immutable and content-addressed.

Informative note: release mechanics, including invalidation of gate evidence when
authoritative sources change, are governed by
[../../governance/RELEASE-POLICY.md](../../governance/RELEASE-POLICY.md).

## Interpretation

<a id="NRS-VERSION-0002"></a>
**NRS-VERSION-0002 - Unsupported interpretation tuples fail closed** (stability: CORE, status: active)
An unsupported combination of specification, schema, canonicalization,
public-check, and attestation-procedure versions MUST fail closed and MUST NOT be
interpreted using guessed compatibility.

Informative note: supported combinations are published as interpretation
bundles in the interpretation-bundle registry; currently registered bundles
include the Phase 1 minimal ITGC bundle and successor Phase 2A guarantee
bundles. Exact identifiers and version tuples are authoritative only in
[../../registries/interpretation-bundles.yaml](../../registries/interpretation-bundles.yaml),
not in this explanatory note.
