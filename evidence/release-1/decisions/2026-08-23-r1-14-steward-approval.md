# Release 1 — Steward approval for R1-14

**Decision date:** 2026-08-23  
**Candidate:** `8833ee02664903a69459fc178e4d2802f4241e0f` (Candidate C3)  
**Signed final release commit:** `a3be45596b7fbc31820d7f124192ec5ece01cc84`  
**Signing-evidence merge:** `cc49ed7bbc673b344a673f9e5b23a6b0695b586e`  
**Decision authority:** Founder/CEO, acting as Release 1 Steward

## Evidence reviewed

The Steward reviewed the production signing evidence under
`evidence/release-1/gates/R1-14/` and confirmed:

- the release key is `release-g2`, using ECDSA P-256 / SHA-256 and a key
  lineage separate from attestation identity;
- the exact 825,865-byte source archive has SHA-256
  `f45a8d2afd964f0dc7d224f0c00d38cc8b0b6d7ad8f06e82768bad1b84ff567b`;
- the source archive, release checksums, and Protocol snapshot manifest are
  signed and bound to Candidate C3 and final release commit `a3be455`;
- positive verification passed for all three targets;
- negative tamper verification failed closed with a non-zero exit;
- three Cloud KMS AsymmetricSign Data Access audit entries were captured and
  the checked-in public evidence removes `callerIp`;
- `hashes.sha256` matches the checked-in public R1-14 evidence;
- PR #50 changes only `evidence/release-1/gates/R1-14/**` and preserves the
  frozen Candidate C3 content;
- workflow run
  [32637780255](https://github.com/licklider-ai/nomue-protocol/actions/runs/32637780255)
  passed at PR #50's final head, including explicit
  `snapshot:manifest --check-public-boundary` and
  `snapshot:manifest --check-candidate` execution.

SLSA provenance remains explicitly reserved for Release 2 and is not claimed
for Release 1.

## Decision

**R1-14 — Release signing: PASS.**

R1-14 is closed for Candidate C3. All Release 1 gates are now closed with an
explicit pass decision.

This decision authorizes the remaining controlled publication steps. It does
not change Candidate C3, does not change the signed final release commit, and
does not by itself create the release tag or make the repository public.
