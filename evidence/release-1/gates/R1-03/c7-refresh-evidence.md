# R1-03 Candidate C7 implementation-evidence refresh

**Gate:** R1-03 — Implementation evidence for conformance, verification, and attestations  
**Candidate C:** `f4206ac3f85dc8f783d14d63413cff87ab2ed82b`  
**Pinned by P:** `fb63509fed707de4033756238e8dacc23175e621`  
**Release-control commit tested:** `ead6785b09e96f6a229ce6c148179af0b29a97f0`  
**Recorded:** 2026-08-24

## Fresh C7 execution evidence

Exact-SHA CI run `32673296824` completed successfully for `ead6785b09e96f6a229ce6c148179af0b29a97f0`. The tested tree is Candidate C7-equivalent and carries only permitted release-control/evidence changes after C7.

The CI matrix completed successfully on Linux x64, Linux x64 with Node 24, Linux arm64, macOS arm64, and Windows x64. The executed checks include registry/schema/authority validation, canonicalization vectors, Phase 1 and Phase 2A conformance, Release 1 examples, refusal/resource fixtures, verifier checks, generated-artifact drift checks, numerical oracle comparison, and the test suite containing the experimental approval/attestation fixtures.

The immediately preceding gate-impact execution run `32671518530` also completed successfully after actually changing R1-03/R1-07/R1-12/R1-14 to open state. In that run:

- `pnpm snapshot:manifest --check-candidate` passed for Candidate C7 with 608 frozen files and unchanged gate definitions;
- `pnpm validate` passed;
- the Vitest suite passed 228/228 tests across 20 files, including `attestation.test.ts` and `release-signing.test.ts`;
- canonicalization passed 16 vectors against an independent JCS implementation;
- conformance passed 132 pinned fixtures;
- the canonical verifier example verified with matching report, canonical content, and hashes;
- Phase 2A and refusal suites passed.

Run URLs:

- [CI run 32673296824](https://github.com/licklider-ai/nomue-protocol-release1-cleanroom/actions/runs/32673296824)
- [Gate-impact run 32671518530](https://github.com/licklider-ai/nomue-protocol-release1-cleanroom/actions/runs/32671518530)

## C7 delta disposition

The C3→C7 impact review identified one normative EXPERIMENTAL approval change: the fixed approval statement moved from the prior non-English rendering to fixed English wording under the same experimental statement identifier. Approval remains outside the Release 1 supported Record bundle, but the relevant fixtures and implementation paths are exercised by the fresh C7 test/conformance evidence above.

No Release 1 supported verifier check, numerical contract, schema bundle, refusal contract, or public-check semantics were changed by that wording edit.

## Decision support

The required R1-03 implementation evidence has therefore been refreshed against Candidate C7. This record does not substitute for R1-04 external-operator evidence, R1-09 independent rebuild evidence, or R1-14 production signing evidence.
