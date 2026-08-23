# R1-14 Production Release Signing Ceremony — release-g2

**Gate:** R1-14 — Production release signing evidence  
**Recorded:** 2026-08-21 (UTC ceremony; audit-gap closure)  
**Evidence type:** steward production signing ceremony record  
**Status:** signing, verification, and KMS audit evidence captured; gate remains **OPEN** pending Founder/Steward approval

## Ceremony identities

| Field | Value |
| --- | --- |
| Candidate content commit C | `8833ee02664903a69459fc178e4d2802f4241e0f` |
| Final release-control commit R | `a3be45596b7fbc31820d7f124192ec5ece01cc84` |
| Release key | `urn:nomue:release-key:g:2` |
| GCP key | `release-g2` version `1` |
| Algorithm | `EC_SIGN_P256_SHA256` |
| Protection level | `SOFTWARE` |
| SPKI fingerprint | `sha256:07d6ce902794edb9e94800407f93505c4c9cc01f150f4963c07c00966634b3fe` |
| Protocol snapshot hash | `sha256:525188d552ded5d0f0937fb8ad8ddfc1a7dc19baa0bcdb212942865f78111899` |

## Preconditions verified

- `main` checked out at exact commit R with clean working tree.
- `pnpm snapshot:manifest --check-public-boundary` — PASS
- `pnpm snapshot:manifest --check-candidate` — PASS (615 frozen files unchanged)
- Public key PEM present; fingerprint matched KMS public key export.

## Signing targets (3/3 signed; bytes unchanged)

| Target | SHA-256 | Size (bytes) | Signature |
| --- | --- | ---: | --- |
| `source-archive.tar.gz` | `sha256:f45a8d2afd964f0dc7d224f0c00d38cc8b0b6d7ad8f06e82768bad1b84ff567b` | 825865 | `source-archive.tar.gz.sig` |
| `release-checksums.json` | `sha256:c958f799362c82dcbf02e7887044ffd357ff3726ee75212d5230d9d1d957a753` | 756 | `release-checksums.json.sig` |
| `protocol-snapshot-manifest.json` | `sha256:71f99718c98c93cf7d28eb35dd2b29c7a2cde84c184a111df5eb737ac4afb236` | 13141 | `protocol-snapshot-manifest.json.sig` |

The source archive itself is **not** committed to this repository. Digest and detached
signatures are recorded here; the archive was generated outside the checkout from
exact commit R via `git archive`.

## Signing history

### Initial ceremony

Initial signing succeeded: all three targets were signed with `release-g2` version 1
and positive verification passed (3/3). Data Access audit logging was not configured
on the KMS-owning project at that time; no audit entries were captured.

### Audit-gap closure re-sign (2026-08-21T07:14:30Z–07:14:38Z UTC)

After enabling Cloud KMS DATA_READ audit logging on project `nomue-protocol`
(KMS key owner, project number 806845135459), the steward re-signed the exact same
three target bytes with the same `release-g2` version 1 key. Target SHA-256 digests
were verified unchanged before re-signing. All three re-sign operations succeeded.
Positive verification passed again (3/3). Three AsymmetricSign Data Access audit
entries were captured. See `kms-signing-audit-evidence.txt` and
`kms-audit-entries-final.json`.

Initial signatures and earlier failed audit queries are preserved for traceability.

## Independent verification

### Positive verification — PASS (post audit-gap closure re-sign)

```bash
pnpm release:signing:verify -- \
  --bundle <production bundle> \
  --public-key release-g2.pem \
  --expected-fingerprint sha256:07d6ce902794edb9e94800407f93505c4c9cc01f150f4963c07c00966634b3fe
```

Result: `ok = true`; all three targets verified (`source_archive`, `checksums`,
`protocol_snapshot_manifest`). See `positive-verification.log`.

### Negative verification — PASS (tampered copy rejected; initial ceremony)

A copied bundle with one byte changed in `protocol-snapshot-manifest.json` failed
closed with non-zero exit and `sha256 mismatch` on the tampered target. See
`negative-verification.log`. The production bundle was not modified.

## KMS audit evidence

**Captured (3/3).** The checked-in public audit JSON removes `callerIp` fields;
decision-bearing digests, insertIds, key resource, principal, and timestamps remain
unchanged. AsymmetricSign Data Access audit entries with insertIds
`1hbdwj1e110g1`, `16qdkhhdhq6x`, and `1ghomb5e13xk5` correspond to the three
target digests. See `kms-signing-audit-evidence.txt` and `kms-audit-entries-final.json`.

## Gate disposition

**R1-14 remains OPEN.** This ceremony does not close the gate. Founder/Steward must
review this evidence and record an explicit gate decision before R1-14 may close.

## Evidence files in this directory

- `release-g2.pem` — public key only
- `release-key-metadata.txt`
- `release-key-fingerprint.txt`
- `release-signing-targets.json`
- `release-checksums.json`
- `protocol-snapshot-manifest.json`
- `source-archive.tar.gz.sig`
- `release-checksums.json.sig`
- `protocol-snapshot-manifest.json.sig`
- `positive-verification.log`
- `negative-verification.log`
- `kms-signing-audit-evidence.txt`
- `kms-audit-query-resign-attempt.json` (earlier failed query; retained)
- `kms-audit-entries-final.json`
- `hashes.sha256`

No private key material, credentials, or tokens are included.
