# R1-14 pre-signing state for Candidate C8

**Candidate C:** `83d07d03f27cec0c245cf836c042e5378733b0a2`  
**Pin P:** `bed7823a011dc452989b9bbae94bd6b44aabb4bc`  
**Status:** open; fresh production signing required before Release 1 publication

The earlier Candidate C3 production-signing outputs were superseded before
publication and are not the Release 1 final signing evidence. They have been
removed from the current release-source tree so that the signed Release 1
source archive cannot be mistaken for a mixture of C3 and C8 ceremony state.

Release 1 continues to use the existing release-specific Cloud KMS key:

- key identity: `urn:nomue:release-key:g:2`;
- project: `nomue-protocol`;
- location: `asia-northeast1`;
- key ring: `nomue-release`;
- key: `release-g2`;
- version: `1`;
- algorithm: `EC_SIGN_P256_SHA256`.

The reusable key evidence remains in this directory:

- `release-g2.pem`;
- `release-key-fingerprint.txt`;
- `release-key-metadata.txt`.

Fresh R1-14 evidence must be generated from Candidate C8 and the final release
source commit R. The three signed targets are the R source archive,
`release-checksums.json` v1.1, and the C8 Protocol snapshot manifest. The
public Cloud Audit Log copy must remove both `callerIp` and
`callerSuppliedUserAgent`. R1-14 remains open until all three signatures,
positive and negative verification, KMS audit entries, fresh-clone hashes,
and signed-snapshot equivalence have passed.
