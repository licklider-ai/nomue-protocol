# R1-14 Production Release Signing Ceremony — Candidate C8 / release-g2

**Gate:** R1-14 — Release signing  
**Ceremony date:** 2026-08-24 UTC  
**Status:** PASS; evidence complete for release-decision close

## Identities

| Field | Value |
| --- | --- |
| Candidate content commit C | `83d07d03f27cec0c245cf836c042e5378733b0a2` |
| Pin commit P | `bed7823a011dc452989b9bbae94bd6b44aabb4bc` |
| Release source commit R | `47eeafb0b2b096658cacf219bf5af867b687c6a7` |
| Release key | `urn:nomue:release-key:g:2` |
| KMS key version | `projects/nomue-protocol/locations/asia-northeast1/keyRings/nomue-release/cryptoKeys/release-g2/cryptoKeyVersions/1` |
| Algorithm | `EC_SIGN_P256_SHA256` |
| SPKI fingerprint | `sha256:07d6ce902794edb9e94800407f93505c4c9cc01f150f4963c07c00966634b3fe` |
| Protocol snapshot hash | `sha256:fc26c770538abe3598fc27a571ca6e99cc29763e0a25859a80c267ee2d80ab06` |
| Signing window | `2026-08-24T00:48:47Z` – `2026-08-24T00:49:25Z` |

## Verification result

- Prepared target hashes and byte sizes remained unchanged.
- ECDSA P-256 / SHA-256 verification with `release-g2.pem`: PASS 3/3.
- Tampered Protocol snapshot copy: rejected with non-zero verifier exit.
- Signed Protocol snapshot vs R: PASS 83/83 paths; zero missing paths; zero digest mismatches.
- Current Cloud KMS audit correspondence: PASS 3/3 by exact target digest.
- Public audit JSON removes `callerIp` and `callerSuppliedUserAgent` only.

The signed source archive is a detached release asset and is not committed into the repository. Its Git archive commit identity is R `47eeafb0b2b096658cacf219bf5af867b687c6a7`.

SLSA provenance remains reserved for Release 2 and is not claimed for Release 1.
