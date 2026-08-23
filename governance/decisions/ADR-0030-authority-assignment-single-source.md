# ADR-0030: Authority Assignment Single Source

**Status: Accepted** (pre-release authority-model consistency repair, 2026-08-18).

## Problem

Protocol authority target assignments were maintained in two places:

- [../../AUTHORITY.md](../../AUTHORITY.md) — a hand-written "Authority by target" table
- [../../authority/authority-manifest.yaml](../../authority/authority-manifest.yaml) —
  the machine-readable exhaustive assignment list

The two had drifted (20 manifest targets vs 18 prose rows; four manifest-only targets;
two prose-only rows). AUTHORITY.md also claimed the prose table and manifest were
"validated together" even though tooling did not parse or compare the prose table.

Maintaining two exhaustive assignment sources guarantees future drift.

## Decision

### A. One exhaustive assignment source

[../../authority/authority-manifest.yaml](../../authority/authority-manifest.yaml) is
the sole exhaustive machine-readable source for target → authoritative artifact
assignment.

[../../AUTHORITY.md](../../AUTHORITY.md) defines the authority model, artifact-class
semantics, the authoritative/normative distinction, conflict policy, and change
coupling. It does **not** duplicate the exhaustive assignment list.

[../../generated/AUTHORITY-INDEX.md](../../generated/AUTHORITY-INDEX.md) is the
non-authoritative human-readable view generated from the manifest by `pnpm generate`.

### B. No prose↔manifest table validator

Do not build tooling that parses AUTHORITY.md's assignment table and compares it to
the manifest. That would preserve dual maintenance under a false sense of safety.

Instead enforce:

```text
authority/authority-manifest.yaml
      ↓ pnpm generate
generated/AUTHORITY-INDEX.md
```

and validate manifest structure plus generated drift (`pnpm check:generated`).

### C. Authoritative ≠ Normative

`authoritative` is an artifact-class assignment in the manifest: an artifact carries
authority only for its explicitly assigned target(s).

`Normative` is a semantic status of binding specification content (MUST-bound
Requirement IDs in `spec/` and `canonicalization/`).

All normative requirement documents must be `class: authoritative`, but not every
authoritative artifact is normative prose (schemas, registries, CHARTER, evidence).

### D. Limited evidence authority

`class: evidence` artifacts may carry limited authority only when explicitly assigned
to an allowed evidence/decision target:

- `phase-1-development-evidence`
- `phase-2a-development-evidence`
- `release-decision`

Evidence never carries normative Protocol meaning authority.

Tooling rejects evidence artifacts assigned to any other target.

## Non-changes

- No vocabulary, stability-tier, digest, statistical, schema, check, lifecycle, or
  attestation semantic changes.
- No Release 1 gate state changes.
- No `urn:nomue` identifier migration.
