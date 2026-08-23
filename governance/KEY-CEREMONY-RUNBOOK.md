# Key Ceremony Runbook - GCP Cloud KMS (Batch 4, steward operations)

**Status: operational runbook, DRAFT until first executed.** The steward
performs every step here; nothing in this repository's tooling generates,
stores, or publishes production key material. Decision basis: Ed25519
adoption (ADR-0026), trust root (NRS-ATTEST-0007/0008), custody on Google
Cloud KMS (ratified decision 2).

## Platform support (verified 2026-08-13)

The Cloud KMS algorithms documentation lists `EC_SIGN_ED25519` as a
supported asymmetric-signing algorithm, and also lists the reserved
post-quantum families (`PQ_SIGN_ML_DSA_{44,65,87}`,
`PQ_SIGN_SLH_DSA_SHA2_128S`) - so both the adopted suite and the ADR-0026
migration candidates have a native custody path. The public algorithms
page does not enumerate per-protection-level availability, so **step 3
verifies the protection-level choice against the live console/API listing
at ceremony time**; note also that Ed25519 is not a FIPS 140-approved
algorithm, so FIPS-validation claims do not attach to it regardless of
protection level (this does not affect decisions 1-2; recorded for
completeness).

## Ceremony steps

1. **Project and audit posture** (once)
   - Dedicated GCP project for signing (no shared workloads).
   - Enable Cloud Audit Logs **Data Access logs** for Cloud KMS in that
     project, so every future sign operation is logged with principal,
     time, and key version.
2. **Key ring**
   - `gcloud kms keyrings create nomue-attestation --location <region>`
     (pick one region deliberately; record it).
3. **Key creation** (the core act)
   - Verify in the console/API that `EC_SIGN_ED25519` is offered at the
     intended protection level; prefer **HSM** if offered for Ed25519,
     otherwise SOFTWARE - record which was actually available and chosen.
   - `gcloud kms keys create attestation-g1 --keyring nomue-attestation
--location <region> --purpose asymmetric-signing
--default-algorithm ec-sign-ed25519 --protection-level <chosen>`
   - Record: project, region, key ring, key name, key version resource
     name, protection level, creation time.
4. **IAM least privilege**
   - A dedicated signer service account with
     `roles/cloudkms.signerVerifier` on **this single key only** (never
     project-wide), used exclusively from the steward's issuance
     environment.
   - **No CI identity gets any role on the key.** Signing never runs in
     CI; issuance is a deliberate, audited, human-initiated operation.
   - A separate break-glass admin principal holds key-admin rights;
     day-to-day issuance identity cannot destroy or rotate the key.
5. **Public key retrieval and fingerprint**
   - `gcloud kms keys versions get-public-key 1 --key attestation-g1
--keyring nomue-attestation --location <region>
--output-file attestation-g1.pem`
   - `pnpm trust-root:fingerprint --pem attestation-g1.pem` - record the
     `sha256:` fingerprint (method: SHA-256 over DER SPKI, fixed by the
     trust root registry).
6. **Trust root pin commit**
   - Add the first generation entry to
     `registries/attestation-trust-root.yaml`: `key_id`
     `urn:nomue:attestation-key:g:1`, `generation: 1`, `suite_id`
     `urn:nomue:signature-suite:ed25519:1`, the PEM, the fingerprint,
     `valid_from` (ceremony time, UTC), `valid_until: null`,
     `status: active`, `superseded_by: null`.
   - `pnpm check` (validate re-derives the fingerprint from the PEM and
     cross-checks the suite reference), then commit. The trust root is
     authoritative-class, so the commit lands inside the
     content-addressed snapshot surface automatically.
7. **Three-channel fingerprint publication** (do all three; record URLs/locations)
   - [ ] GitHub: the trust-root commit itself plus the fingerprint stated
         in the release/README surface.
   - [ ] nomue.ai site: a page stating key_id, generation, fingerprint,
         and validity start.
   - [ ] Position paper: the fingerprint line in the next revision's
         appendix.
   - A relying party should be able to cross-check all three channels
     against `pnpm trust-root:fingerprint` output.
8. **Signing call path** (per issuance, after the ceremony)
   - Compute the assertion signing payload locally
     (`assertionSigningPayload`, JCS canonical bytes).
   - `gcloud kms asymmetric-sign` (or the API equivalent) with the signer
     service account, **outside CI**, capturing the audit-log entry ID
     alongside the issued assertion.

## RFC 3161 timestamping (best-effort, X6)

For canonical Records the steward MAY additionally obtain an RFC 3161
timestamp, best-effort and never a validity condition (NRS-ATTEST-0011):

1. Extract the Record's `content_digest` bytes (the hex after `sha256:`).
2. Request a token from a public TSA of record (record which TSA and its
   policy OID), over that digest.
3. Store the token detached next to the Record (`<record>.tsr`) - never
   inside the Record (closed envelope, NRS-CORE-0007) - and note the TSA,
   request time, and token hash in the accompanying evidence README.
4. For assertions, the token MAY instead be embedded in the optional
   `rfc3161_timestamp` member (schema draft-3).

## What this runbook is not

Executing it is a steward operation with real-world side effects (cloud
resources, publication); this repository only records the procedure and
verifies the resulting pin. No step here closes gate R1-11.
