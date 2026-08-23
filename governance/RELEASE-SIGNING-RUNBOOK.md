# Release 1 Signing Runbook — GCP Cloud KMS

**Status: operational runbook.**

This runbook signs Release 1 distribution artifacts. It does **not** create a Record
attestation key and does not grant CI access to signing material.

Release 1 uses four commit roles defined by
[RELEASE-POLICY.md](RELEASE-POLICY.md): candidate content commit **C**,
release-control pin commit **P**, release source commit **R**, and release-decision
commit **D**. The signed source archive is generated from R. The publication tag
points to D after R1-14 closes. D is not a signing input and MUST NOT be required to
contain its own SHA.

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

## 2. Establish release source commit R and prepare artifacts

Do this only after candidate C is frozen and pinned by P, every non-signing gate is
ready for final disposition, and candidate equivalence still holds.

Select the exact **release source commit R**. R is the commit whose source tree is
archived into the signed `source-archive.tar.gz`. R MUST remain candidate-equivalent
to C: changes after C are limited to the release-state/evidence paths permitted by
the candidate freeze model.

Create the source archive from R outside the checkout and generate the detached
Protocol snapshot manifest from a checkout at R. Record:

- candidate content commit C;
- release source commit R;
- one-line Protocol snapshot hash (`sha256:...`).

Then prepare the signing bundle:

```bash
pnpm release:signing:prepare -- \
  --archive /path/to/nomue-protocol-release.tar.gz \
  --snapshot-manifest /path/to/protocol-snapshot-manifest.json \
  --candidate <40-hex-C> \
  --release-source <40-hex-R> \
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
signature suite. Both signed JSON manifests identify C and R. They do not identify D,
because D does not yet exist and cannot contain its own eventual SHA.

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

For the public audit-evidence copy, remove only fields explicitly classified as
publication metadata that is not decision-bearing. For Release 1 this includes both
`callerIp` and `callerSuppliedUserAgent`. Preserve the original audit response in the
controlled issuance environment; do not commit it if it contains those fields.

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

Independently verify that the signed `protocol-snapshot-manifest.json` matches the
snapshot-scoped files in a checkout at R, path by path and SHA-256 by SHA-256. This
is distinct from signature verification: a valid signature over a stale manifest is
not sufficient release evidence.

Capture the verification output in `evidence/release-1/gates/R1-14/` together with:

- release public key PEM;
- key metadata / fingerprint record;
- three KMS audit-log identifiers and the sanitized public audit-evidence copy;
- the detached signing target manifest;
- a relying-party walkthrough reproducing successful verification; and
- the signed-snapshot-to-R tree equivalence result.

Do not commit private key material. Cloud KMS private key bytes never leave KMS.

## 5. Close R1-14 in release-decision commit D

R1-14 closes only after the successful verification evidence above exists. Create a
release-decision commit D that records the completed R1-14 evidence and final release
authorization. D may record the already-known SHAs for C, P, and R.

D MUST NOT contain a field that purports to contain D's own exact SHA. The close
record instead defines the publication target by role:

> The Release 1 tag points to the release-decision commit that introduces this final
> R1-14 close record and final release authorization.

After D exists, record D's exact SHA in the annotated tag message and GitHub Release
notes. The tag MUST point to D.

Before tagging, check out D and establish all three independently:

1. candidate equivalence: D's frozen candidate surface still matches C;
2. signature validity: all three signed targets produced from R verify; and
3. Protocol snapshot equivalence: the signed snapshot manifest matches the
   snapshot-scoped files in D path-by-path and by SHA-256.

Because release-decision/evidence paths are outside the Protocol snapshot scope,
items 1 and 3 can both hold at D when the release process has followed the permitted
post-freeze mutation boundary.

## 6. Publication boundary

The annotated Release 1 tag points to D only after every applicable gate is closed and
the checks above pass. GitHub Release notes MUST state that:

- the attached `source-archive.tar.gz` generated from R is the cryptographically
  signed Release 1 source artifact; and
- GitHub's automatically generated source archive for the D tag is not one of the
  three KMS-signed targets.

The GitHub Release notes SHOULD list the exact SHAs for C, P, R, and D and the
Protocol snapshot hash. These values are external publication metadata and do not
create a self-reference inside D.
