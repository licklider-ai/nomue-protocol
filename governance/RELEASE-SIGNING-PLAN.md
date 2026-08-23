# Release Signing Plan (Release 1)

**Status: implementation present; Release 1 C5 production issuance pending.**
R1-14 requires release signing **before public publication**. The repository contains
deterministic target preparation and independent signature verification
(`pnpm release:signing:prepare` / `pnpm release:signing:verify`). Production signing
remains a deliberate steward operation outside CI.

## Release commit roles

Release 1 uses the C/P/R/D model defined by `RELEASE-POLICY.md`:

- **C**: frozen candidate content commit;
- **P**: later release-control pin commit that records C and its freeze manifest;
- **R**: release source commit whose exact source archive is signed;
- **D**: release-decision commit that records completed R1-14 evidence and final
  release authorization; the publication tag points to D.

D is not a signing target and cannot contain its own final SHA. Source-controlled
records therefore define the tag target by the D role. D's exact SHA is published
after D exists in the annotated tag message and GitHub Release notes.

## Principle: key separation

Release signing uses a key lineage **separate from the attestation key**:

- The attestation key speaks about Records and verification assertions.
- The release signing key speaks about published repository artifacts: "these bytes
  are the Release 1 artifacts published by nomue."

The two claims have different audiences and compromise blast radii. One key never
serves both purposes.

## Release 1 signing targets

Exactly three targets are signed:

1. **Source archive** of release source commit R.
2. **`release-checksums.json`**, containing SHA-256 digests for the source archive
   and Protocol snapshot manifest plus candidate C / release-source R identities.
3. **Protocol snapshot manifest**, generated from a checkout at R.

`pnpm release:signing:prepare` copies the source archive and snapshot manifest into
one detached release bundle, generates `release-checksums.json`, and writes
`release-signing-targets.json` naming the exact three targets, hashes, byte sizes,
detached signature filenames, C, R, and the Protocol snapshot hash. It never accesses
a private key.

The signed manifests use `candidate_content_commit` for C and
`release_source_commit` for R. They deliberately contain no D field because D does
not exist when the targets are prepared and D is not one of the signed source inputs.

## Signature format

Release 1 uses a separate **ECDSA P-256 / SHA-256** Cloud KMS key
(`EC_SIGN_P256_SHA256`). For each target, `gcloud kms asymmetric-sign` is invoked
with `--digest-algorithm sha256`; the CLI hashes the complete input file locally and
Cloud KMS signs that SHA-256 digest. This avoids any raw-input size limit while
binding the signature to the complete target bytes.

The detached `.sig` files are the base64-encoded DER ECDSA signatures emitted by
`gcloud`. `pnpm release:signing:verify` first verifies each target's recorded SHA-256
and byte size, then verifies the ECDSA signature over SHA-256 of the target with the
published SPKI public key.

The earlier pre-release `release-g1` Ed25519 ceremony attempt is superseded and is
not a Release 1 issuance key: Cloud KMS raw-data signing could not accept the full
source archive. Release 1 production issuance uses generation 2.

## Verification procedure (relying party)

1. Obtain the release bundle, its three `.sig` files, and the release-signing public
   key.
2. Cross-check the published SPKI-SHA-256 fingerprint through the release publication
   channels.
3. Run `pnpm release:signing:verify -- --bundle <dir> --public-key <pem>
--expected-fingerprint <sha256:...>`.
4. The verifier first checks each target's recorded SHA-256 and byte size, then
   verifies all three ECDSA P-256 / SHA-256 signatures. Any missing target, changed
   byte, missing signature, wrong fingerprint, or invalid signature fails closed.
5. Independently compare the signed Protocol snapshot manifest against the
   snapshot-scoped files at R path-by-path and by SHA-256. A valid signature over a
   stale or unrelated snapshot manifest does not establish release equivalence.
6. After D exists, repeat the Protocol snapshot comparison against tagged D. Because
   only permitted release-state/evidence paths may differ from R, the snapshot-scoped
   bytes at R and D must be identical.

## Key generation and custody

Use the same custody posture as `KEY-CEREMONY-RUNBOOK.md`, but with a **separate
release key ring and key series**:

- production key id for Release 1: `urn:nomue:release-key:g:2`;
- GCP Cloud KMS asymmetric-signing key using `EC_SIGN_P256_SHA256`;
- dedicated release-signing key ring (not the attestation key ring);
- signer principal has `roles/cloudkms.signerVerifier` on this key only;
- break-glass administration is separate from the day-to-day signer;
- **no CI identity receives signing permission**;
- public key, KMS key-version resource, protection level, creation time, and
  SPKI-SHA-256 fingerprint are captured as Release 1 evidence.

The signing operation is human-initiated and audit-logged. Tooling prepares and
verifies bytes; it does not create, export, or store production private key material.
The public audit-evidence copy removes `callerIp` and
`callerSuppliedUserAgent`; the controlled issuance environment retains the original
Cloud audit response.

## Release ordering

```text
candidate C frozen
-> release-control pin P records C
-> applicable non-signing gate evidence collected
-> candidate equivalence holds
-> release source commit R selected
-> source archive + Protocol snapshot manifest generated from R
-> release:signing:prepare records C and R
-> Cloud KMS signs SHA-256 digests of the three targets
-> release:signing:verify succeeds with published public key
-> signed snapshot manifest is proven equivalent to R
-> release-decision commit D records R1-14 close and final authorization
-> candidate and signed-snapshot equivalence are rechecked at D
-> annotated release tag points to D
```

GitHub's automatically generated source archive for the D tag is not one of the
KMS-signed targets. Release notes must identify the separately attached
`source-archive.tar.gz` generated from R as the signed Release 1 source artifact.

## Deferred to R2

**SLSA provenance** remains explicitly reserved for R2. Release 1 signs the release
artifacts themselves; it does not claim build-chain provenance.
