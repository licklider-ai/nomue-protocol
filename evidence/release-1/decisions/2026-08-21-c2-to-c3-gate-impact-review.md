# Release 1 Candidate C2 → C3 Gate-Impact Review

**Date:** 2026-08-21  
**Prior candidate C2:** `2f31c424951a1606563a1f7575d0d5688d34b410`  
**Current candidate C3:** `8833ee02664903a69459fc178e4d2802f4241e0f`  
**C3 release-control freeze merge:** `8aad5833efa4ac807b02991bb4d3df5934e1f0ac`

## Purpose

Determine whether the C2 gate approvals remain valid for C3 after the Release 1 signing repair, without mechanically re-running or re-approving unrelated gates.

## Frozen-candidate delta

C3 preserves the Release 1 Protocol, Record, statistical, verifier, numerical, canonical-case, and relying-party verification semantics that were approved for C2. The candidate replacement is limited to the Release 1 signing path and directly associated generated/format-control material:

- Release signing plan/runbook: Ed25519 raw-byte signing → ECDSA P-256 / SHA-256 (`EC_SIGN_P256_SHA256`);
- release signing prepare/verify tooling updated to the P-256/SHA-256 suite;
- signing regression tests updated, including a source archive larger than the prior Cloud KMS raw-input limit;
- `.prettierignore` / generated README updates required by the repaired release-control state.

The gate-definition digest remains unchanged:

`092836ca774f89b53d726998c8548468ea28b9ac7e13304ddeaf4cf92f66e32b`

C3 was frozen from the exact candidate commit with 615 frozen files. `snapshot:manifest --check-public-boundary` and `snapshot:manifest --check-candidate` both passed, and PR #48's normal five-job CI passed on Linux x64, Linux x64 / Node 24, Linux arm64, macOS arm64, and Windows x64 before the release-control freeze was merged.

## Gate impact

| Gate | C3 impact | Disposition |
| --- | --- | --- |
| R1-01 | No Protocol/public claim semantic change. | C2 PASS remains valid. |
| R1-02 | No comparison/canonical-case change. | C2 PASS remains valid. |
| R1-03 | No conformance/attestation-support boundary change. | C2 PASS remains valid. |
| R1-04 | Offline verifier path and Candidate verification semantics unchanged. | External C2 PASS remains valid for C3. |
| R1-05 | No threat-model/refusal/verifier semantic change. | C2 PASS remains valid. |
| R1-06 | No canonical-case data/rights/epistemic change. | C2 PASS remains valid. |
| R1-07 | Candidate identity changed; fresh C3 freeze, candidate-equivalence, public-boundary, and normal CI evidence were obtained. | PASS refreshed for C3. |
| R1-08 | No numerical checks, numerical contracts, or oracle implementation change. | C2 PASS remains valid. |
| R1-09 | Verifier source/build inputs relevant to independent rebuild are unchanged by the signing-suite repair. | External C2 PASS remains valid for C3. |
| R1-10 | Canonical-case preregistration and case identity unchanged. | C2 PASS remains valid. |
| R1-11 | Record attestation support/trust semantics unchanged; release signing remains a separate key lineage. | C2 PASS remains valid. |
| R1-12 | License/patent/contribution package unchanged. | C2 PASS remains valid. |
| R1-13 | Verification-report/refusal CLI interface and exit-code contract unchanged. | C2 PASS remains valid. |
| R1-14 | Release signing suite and production release key generation changed. Prior incomplete `release-g1` attempt cannot satisfy this gate. | **Requires new C3 production signing evidence using `release-g2` and complete three-target verification.** |

## Decision

The C2 → C3 replacement does **not** invalidate R1-01 through R1-13. Existing PASS decisions remain applicable to Candidate C3; R1-07 is additionally supported by fresh C3 freeze/equivalence/CI evidence.

R1-14 remains the sole open Release 1 gate and must be satisfied with the repaired ECDSA P-256 / SHA-256 production signing ceremony before publication.

This record does not close R1-14 and does not alter Candidate C3 frozen content.
