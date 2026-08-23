# Candidate C2 — Steward approval for R1-04 and R1-09

**Decision date:** 2026-08-21  
**Candidate:** `2f31c424951a1606563a1f7575d0d5688d34b410`  
**Decision authority:** Founder/CEO, acting as Release 1 Steward

The Steward reviewed the External Operator result and the subsequent integrity/adversarial review recorded in `evidence/release-1/external-operator-op2-review.md` and explicitly approved both remaining external-evidence gates as **PASS**:

- **R1-04 — External offline verification in clean environments:** PASS
- **R1-09 — Verifier provenance and rebuildability:** PASS

The underlying External Operator Evidence package is bound to Candidate C2. The received ZIP SHA-256 is:

`19c38b5c770c96d1aa8fef8b245ef2f8c98687b70417668726e200f75761d096`

The package contained 38 evidence files and its internal `hashes.sha256` manifest was independently checked: 38/38 file hashes matched.

The disclosed deviations — prior use of the physical host for nomue development, reuse of packages from the host pnpm store for R1-09, and an operator-side PowerShell quoting failure before the successful direct `pnpm generate` invocation — were reviewed and accepted as non-blocking. They do not alter Candidate C2 and do not defeat the authoritative gate requirements.

This decision closes R1-04 and R1-09 for Candidate C2. It does not close R1-14 or authorize publication. Production release signing remains required.
