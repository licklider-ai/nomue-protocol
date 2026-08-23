# ADR-0029: Domain-Separated Digest Requirement Repair

**Status: Accepted** (pre-release normative consistency repair, 2026-08-18).

## Problem

ADR-0027 / NRS-CANON-0020 adopted domain separation for Record content
digests, snapshot-manifest hashes, and attestation signing contexts. The
reference verifier, canonicalization vectors, emitted Records, examples, and
independent emitter fixture authoring were updated to the tagged digest
procedure under canonicalization version `urn:nomue:canonicalization:jcs:0.2.0-draft.1`.

However, several active normative artifacts still described the pre-ADR-0027
untagged formula:

- NRS-CANON-0002 (SHA-256 of the JCS canonical form alone)
- NRS-EMIT-0002 (emitter obligation stated in the same untagged terms)
- informative prose in the integrity model and Release Policy snapshot-hash
  description

Those statements conflicted with NRS-CANON-0020 and with deployed behavior.

## Decision

Do not silently reinterpret the withdrawn requirements.

1. **Withdraw** NRS-CANON-0002 and NRS-EMIT-0002 as tombstones in
   [../../registries/requirements.yaml](../../registries/requirements.yaml).
2. **Issue successors** that state the already-deployed contract explicitly:
   - NRS-CANON-0022 — domain-separated SHA-256 Record content digest
   - NRS-EMIT-0004 — emitted Record MUST satisfy NRS-CANON-0022
3. **Move current conformance and public-surface references** from the
   withdrawn IDs to the successors.
4. **Clarify informative prose** in the integrity model and Release Policy
   without changing normative meaning outside the new requirements.

Supersession chains:

- NRS-CANON-0002 → superseded_by NRS-CANON-0022
- NRS-EMIT-0002 → superseded_by NRS-EMIT-0004

## Important non-change

This repair does **not** change:

- digest output bytes,
- fixture Record bytes,
- example Record bytes,
- reference verifier digest algorithms,
- canonicalization version identifiers,
- interpretation bundle identifiers,
- schema versions,
- or `urn:nomue:*` check/profile identifiers.

Canonicalization version `urn:nomue:canonicalization:jcs:0.2.0-draft.1` already
includes the record-content domain tag; this ADR aligns normative text with that
existing meaning.

## Historical preservation

Withdrawn Requirement IDs remain in the registry permanently. Prior ADRs,
historical gate evidence, and development evidence that mention the old IDs are
not rewritten; correction is recorded here and in the successor requirements.
