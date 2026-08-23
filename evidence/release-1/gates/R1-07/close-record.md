# Gate Close Record: R1-07 - Immutable public surface and version authority

- Decision: **pass** (closed 2026-08-13)
- Authority: steward decision
  [2026-08-13 gate close review](../../decisions/2026-08-13-gate-close-review.md), ruling 1
- Evidence state basis: commit `e429a58`, working tree clean
- Audited by: gate-close-review-agent; approved by: release-gate-steward

## Required evidence, item by item

| Required evidence (registry)                                 | Artifact                                                                                                                                                                                                                                                                                       | Verdict |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| Content-addressed snapshot manifest with hashes              | Snapshot manifest mechanism (ADR-0023, `pnpm snapshot:manifest`, deterministic; `checkSnapshotManifestMechanism` runs in `pnpm validate`); manifest hash at audit time recorded in [snapshot-manifest-hash.txt](snapshot-manifest-hash.txt)                                                    | holds   |
| Registry consistency validation output at the release commit | [registry-validation-output.txt](registry-validation-output.txt) - full `pnpm validate` output at commit `e429a58`, clean (schemas, registries, authority manifest, gates/gate-index mirroring, links, private-dependency audit, snapshot mechanism)                                           | holds   |
| Public-surface review record (including language review)     | [registries/public-contract-surfaces.yaml](../../../../registries/public-contract-surfaces.yaml) (NRS-PCS-0001..0013) + generated views; public language fixed by ADR-0004 and enforced by the normative-language lint in `pnpm validate`; review accepted via the 2026-08-13 steward decision | holds   |

## Steward-named supplements (all present)

- Snapshot runbook:
  [governance/SNAPSHOT-RUNBOOK.md](../../../../governance/SNAPSHOT-RUNBOOK.md)
  (Batch 2 U7, procedural companion to RELEASE-POLICY.md)
- Version authority: the six-identifier version map (specification, schema,
  canonicalization, public-check, verifier, attestation-procedure) in
  [spec/versioning/interpretation-bundle.md](../../../../spec/versioning/interpretation-bundle.md),
  with the profile version tracked separately as profile-family-specific

## Notes

- "At the release commit" is satisfiable only mechanically before a release
  exists: this close confirms the mechanism, the coherence of version
  authority, and a clean validation at the audit commit. The actual release
  snapshot re-runs the same validation as part of
  [governance/SNAPSHOT-RUNBOOK.md](../../../../governance/SNAPSHOT-RUNBOOK.md);
  no frozen manifest expectation exists before the first Public Draft
  (ADR-0023), which is by design and not a residual of this gate.
- Release signing is tracked by gate R1-14 (open), not this gate (Batch 5 Y6
  scope split).
