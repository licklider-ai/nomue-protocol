# Key Compromise Runbook (skeleton, Batch 4 - DRAFT)

**Status: draft skeleton; operational adoption is a steward decision.**
v0 has NO protocol-level revocation (NRS-ATTEST-0009): compromise response
is operational, built entirely from trust-root generation supersession
(NRS-ATTEST-0008) plus publication. A future transparency log, if ever
adopted, would add detection - never a verification-validity condition
(NRS-ATTEST-0010).

## Trigger

Confirmed or credibly suspected compromise of the active attestation
signing key (Cloud KMS key misuse indication, audit-log anomaly, insider
report, custody-platform incident notice).

## Steps (in order)

1. **Freeze issuance.** Revoke the signer service account's
   `signerVerifier` binding on the affected key immediately (break-glass
   admin). New assertions stop; existing artifacts are untouched.
2. **Issue the next generation.** Run the key ceremony
   (governance/KEY-CEREMONY-RUNBOOK.md) for generation N+1 - new key, new
   fingerprint, three-channel publication.
3. **Update the trust root.** In one commit: add the generation N+1 entry
   (`status: active`), mark generation N `status: superseded`,
   `superseded_by` = the new key_id, and set generation N's `valid_until`
   to the compromise-window boundary decided in step 4. Never delete the
   old entry.
4. **Announce the old key's signing period.** Publish (same three
   channels as the fingerprint) the interval during which generation N
   signatures are considered issued-by-us: from its `valid_from` to the
   best-established compromise time (conservative if unknown). Assertions
   verifying against generation N outside that window fail the trust-root
   validity check (`NRS-SIGNATURE-KEY-OUTSIDE-VALIDITY`) by construction.
5. **Identify affected Records.** From the issuance audit log (Cloud KMS
   Data Access logs) enumerate every assertion signed in the suspect
   window; match against published Records carrying generation-N
   assertions.
6. **Offer re-attestation.** For affected Records whose holders want it,
   re-run the verification procedure and issue fresh generation-N+1
   assertions (holder opt-in; the old assertion is not deleted - the
   record of what was signed remains, with its validity bounded by
   step 4's window).

## Non-goals

- No retroactive editing of published Records or assertions.
- No protocol revocation list; the trust root's validity windows are the
  single mechanism (v0).
- Nothing here judges the scientific content of affected Records.
