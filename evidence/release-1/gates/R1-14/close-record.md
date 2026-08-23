# Gate Close Record: R1-14 — Release signing

- Decision: **pass** (closed 2026-08-23)
- Authority: Founder/CEO, acting as Release 1 Steward
- Candidate: `8833ee02664903a69459fc178e4d2802f4241e0f` (C3)
- Signed final release commit:
  `a3be45596b7fbc31820d7f124192ec5ece01cc84`
- Decision record:
  [2026-08-23 R1-14 steward approval](../../decisions/2026-08-23-r1-14-steward-approval.md)

## Required evidence, item by item

| Required evidence | Artifact | Verdict |
| --- | --- | --- |
| Release signing plan, key separation, verification procedure, and key management | `release-signing-ceremony.md`, `release-key-metadata.txt`, `release-key-fingerprint.txt`, and `release-g2.pem` | holds |
| Signatures over the source archive, checksums, and Protocol snapshot manifest | `source-archive.tar.gz.sig`, `release-checksums.json.sig`, `protocol-snapshot-manifest.json.sig`, and `release-signing-targets.json` | holds |
| Successful relying-party verification | `positive-verification.log` verifies 3/3 targets | holds |
| Fail-closed negative verification | `negative-verification.log` rejects a tampered manifest with non-zero exit | holds |
| Cloud KMS audit correspondence | `kms-audit-entries-final.json` and `kms-signing-audit-evidence.txt` capture 3/3 signing calls with public IP data removed | holds |
| Current-head candidate equivalence and public boundary | GitHub Actions run [32637780255](https://github.com/licklider-ai/nomue-protocol/actions/runs/32637780255), step `Candidate equivalence and public boundary` | holds |
| SLSA scope | Reserved for Release 2; not claimed for Release 1 | holds |

## Disposition

No open R1-14 deviation remains. The release assets must use the exact signed
bytes and the release tag must identify the signed final release commit
`a3be45596b7fbc31820d7f124192ec5ece01cc84`.
