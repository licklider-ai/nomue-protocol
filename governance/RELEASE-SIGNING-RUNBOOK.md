# Release 1 Signing Runbook — GCP Cloud KMS

**Status: operational runbook; production ceremony not yet executed.**

This runbook signs Release 1 distribution artifacts. It does **not** create a Record
attestation key and does not grant CI access to signing material.

## 1. One-time release key ceremony

Use a dedicated GCP project/audit posture and a release-specific key ring.

The earlier pre-release `release-g1` Ed25519 attempt is superseded and must not be
used for Release 1 production issuance. Create generation 2 with P-256 / SHA-256:

```bash
gcloud kms keyrings create nomue-release --location <region>

gcloud kms keys create release-g2 \
  --keyring nomue-release \
  --location <region> \
  --purpose asymmetric-signing \
  --default-algorithm ec-sign-p256-sha256 \
  --protection-level <chosen>
```

If the key ring already exists, do not recreate it. At ceremony time, record the
project, region, key ring, key name, key version, protection level, creation time,
signer principal, and audit-log configuration. Grant the dedicated signer only
`roles/cloudkms.signerVerifier` on this key. Do not grant a GitHub Actions / CI
identity access to it.

Retrieve the public key:

```bash
gcloud kms keys versions get-public-key 1 \
  --key release-g2 \
  --keyring nomue-release \
  --location <region> \
  --output-file release-g2.pem
```

Record its SPKI-SHA-256 fingerprint:

```bash
pnpm trust-root:fingerprint --pem release-g2.pem
```

The release key is a distinct key series from attestation keys. Release 1 production
identity:

`urn:nomue:release-key:g:2`.

## 2. Prepare final Release 1 artifacts

Do this only after candidate C is frozen/pinned, gate evidence is complete enough to
know the final release-control commit, and candidate equivalence still holds.

Create the final source archive outside the checkout and the detached Protocol
snapshot manifest. Record:

- candidate content commit C;
- final release commit R;
- one-line Protocol snapshot hash (`sha256:...`).

Then prepare the signing bundle:

```bash
pnpm release:signing:prepare -- \
  --archive /path/to/nomue-protocol-release.tar.gz \
  --snapshot-manifest /path/to/protocol-snapshot-manifest.json \
  --candidate <40-hex-C> \
  --release <40-hex-R> \
  --snapshot-hash sha256:<64-hex> \
  --out /path/to/release-signing-bundle
```

The bundle contains fixed filenames:

- `source-archive.tar.gz`
- `release-checksums.json`
- `protocol-snapshot-manifest.json`
- `release-signing-targets.json`

The first three are the exact R1-14 signing targets. The targets manifest is detached
operational metadata identifying their hashes, byte sizes, signature filenames and
signature suite.

## 3. Sign each target with Cloud KMS

`EC_SIGN_P256_SHA256` signs a SHA-256 digest. Use `--digest-algorithm sha256` for
every target so the complete local input file is hashed by the gcloud CLI before the
digest is sent to Cloud KMS. Run each signing call deliberately from the steward
issuance environment:

```bash
for file in \
  source-archive.tar.gz \
  release-checksums.json \
  protocol-snapshot-manifest.json
do
  gcloud kms asymmetric-sign \
    --key release-g2 \
    --keyring nomue-release \
    --location <region> \
    --version 1 \
    --digest-algorithm sha256 \
    --input-file "/path/to/release-signing-bundle/$file" \
    --signature-file "/path/to/release-signing-bundle/$file.sig"
done
```

Keep the Cloud Audit Logs identifiers for all three operations as Release 1 evidence.
`gcloud` writes each detached ECDSA signature as base64 text; the underlying ECDSA
signature is DER encoded.

## 4. Independently verify before gate close

```bash
pnpm release:signing:verify -- \
  --bundle /path/to/release-signing-bundle \
  --public-key release-g2.pem \
  --expected-fingerprint sha256:<SPKI-fingerprint>
```

Success requires all three target hashes/sizes and all three ECDSA P-256 / SHA-256
signatures to verify. Any changed byte, wrong key, wrong fingerprint, missing
signature, or missing target fails closed.

Capture the JSON output in `evidence/release-1/gates/R1-14/` together with:

- release public key PEM;
- key metadata / fingerprint record;
- three KMS audit-log identifiers;
- the detached signing target manifest;
- a relying-party walkthrough reproducing successful verification.

Do not commit private key material. Cloud KMS private key bytes never leave KMS.

## 5. Publication boundary

R1-14 closes only after the successful verification evidence above exists. A signed
artifact does not itself authorize publication: every other applicable Release 1 gate,
including the legal gate, must independently close before tag/publication.
