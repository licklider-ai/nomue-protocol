# Tooling

Non-authoritative infrastructure that validates the authoritative artifacts,
regenerates the non-authoritative artifacts, and replays the Phase 1 suites.
Nothing here defines specification meaning.

## Entry points (`pnpm <script>`)

| Script                  | Source                                                                     | Purpose                                                                                                                                                                                                                                                                                             |
| ----------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `validate`              | [src/validate.ts](src/validate.ts)                                         | Full static suite: meta-schema validation of registries, requirement traceability, normative lint, authority-manifest checks, gate/gate-index mirroring, conformance-manifest checks, link audit, private-dependency audit, Phase 1 schema compilation, cross-artifact checks, and code-path audits |
| `generate`              | [src/generate.ts](src/generate.ts)                                         | Regenerate `generated/` views and TypeScript bindings                                                                                                                                                                                                                                               |
| `check:generated`       | [src/generate.ts](src/generate.ts) `--check`                               | Fail on drift in any generated artifact                                                                                                                                                                                                                                                             |
| `schema:validate`       | [src/phase1/schema-validate.ts](src/phase1/schema-validate.ts)             | Compile the Phase 1 schemas ($id uniqueness, reference resolution)                                                                                                                                                                                                                                  |
| `schema:generate-types` | [src/phase1/generate-types.ts](src/phase1/generate-types.ts)               | Regenerate only the TypeScript bindings                                                                                                                                                                                                                                                             |
| `canonicalization:test` | [src/phase1/canonicalization-test.ts](src/phase1/canonicalization-test.ts) | Replay the JCS/digest vectors, differentially against an independent JCS implementation                                                                                                                                                                                                             |
| `conformance:test`      | [src/phase1/conformance-run.ts](src/phase1/conformance-run.ts)             | Replay every conformance fixture against the reference verifier                                                                                                                                                                                                                                     |
| `verifier:example`      | [src/phase1/verifier-example.ts](src/phase1/verifier-example.ts)           | Verify the example Record and compare report, canonical content, and hashes                                                                                                                                                                                                                         |
| `evidence:phase1`       | [src/phase1/evidence-phase1.ts](src/phase1/evidence-phase1.ts)             | Regenerate (or `--check`) the deterministic Phase 1 development evidence                                                                                                                                                                                                                            |
| `check:phase1`          | -                                                                          | schema:validate + canonicalization:test + conformance:test + verifier:example + evidence diff                                                                                                                                                                                                       |
| -                       | [src/normative-lint.ts](src/normative-lint.ts)                             | Standalone normative language lint                                                                                                                                                                                                                                                                  |
| -                       | [src/link-audit.ts](src/link-audit.ts)                                     | Standalone markdown link audit (never fetches external URIs)                                                                                                                                                                                                                                        |
| -                       | [src/private-dependency-audit.ts](src/private-dependency-audit.ts)         | Standalone private-dependency audit                                                                                                                                                                                                                                                                 |
| -                       | [src/phase1/author-vectors.ts](src/phase1/author-vectors.ts)               | Development-time vector authoring (differential against independent JCS)                                                                                                                                                                                                                            |
| -                       | [src/phase1/author-fixtures.ts](src/phase1/author-fixtures.ts)             | Development-time fixture/example authoring with asserted expectations                                                                                                                                                                                                                               |

Shared logic lives in [src/lib/](src/lib/repo.ts) and
[src/phase1/](src/phase1/schemas.ts) as pure functions so the tests in
[tests/](tests/authority.test.ts) can exercise both the healthy repository
state and synthetic conflict cases.

## Design constraints

- Deterministic: generated output and evidence depend only on the repository
  state.
- Offline: no tool contacts the network.
- Conflict-detecting, not conflict-resolving: any cross-artifact mismatch is
  reported as a failure; nothing is silently preferred (NRS-GOV-0003 in
  [../spec/core/authority-and-governance.md](../spec/core/authority-and-governance.md)).
