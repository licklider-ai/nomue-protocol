# Gate Close Record: R1-11 - Cryptosuite and trust semantics (conditional close)

- Decision: **pass** (closed 2026-08-13, conditional per ruling 2)
- Authority: steward decision
  [2026-08-13 gate close review](../../decisions/2026-08-13-gate-close-review.md), ruling 2
- Evidence state basis: commit `e429a58`, working tree clean
- Audited by: gate-close-review-agent; approved by: release-gate-steward

## Condition attached by the steward

The outstanding production item - entering the first production trust-root
key generation after the steward's key ceremony - is moved to the
[pre-publication checklist](../../pre-publication-checklist.md) (item 1)
and ceases to block this gate. Until that item completes, the trust root
remains empty by design, trust-root evaluation fails closed, and nothing
can be `nomue-attested` (NRS-ATTEST-0007).

## Required evidence, item by item

| Required evidence (registry)                                                    | Artifact                                                                                                                                                                                                                                                                                                                                                                                                                                       | Verdict |
| ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| Cryptosuite structure definition and rationale                                  | [ADR-0026](../../../../governance/decisions/ADR-0026-ed25519-adoption-pq-migration-path.md) (Ed25519 adoption, PQ migration path); [registries/attestation-signature-suites.yaml](../../../../registries/attestation-signature-suites.yaml) (`urn:nomue:signature-suite:ed25519:1`, adopted; no algorithm agility, NRS-ATTEST-0003/0006)                                                                                                       | holds   |
| Trust semantics definition (what an attestation does and does not claim)        | [spec/attestation/README.md](../../../../spec/attestation/README.md): NRS-ATTEST-0004 (depth-3 evidence, never calculation or consistency), 0005 (never enters `verification_results`), 0007/0008 (trust-root pinning, key generations), 0009 (no revocation in v0 - absence of revocation info is not a claim of non-compromise), 0010 (transparency logs never a validity condition)                                                         | holds   |
| Negative test corpus and run logs (invalid signatures, wrong issuer, tampering) | [tooling/tests/attestation.test.ts](../../../../tooling/tests/attestation.test.ts): tampered signature, content mutated after signing, wrong key, non-allow-listed algorithm, unpinned key (`NRS-SIGNATURE-KEY-NOT-PINNED`), key outside validity window (`NRS-SIGNATURE-KEY-OUTSIDE-VALIDITY`), invalid base64, draft-2/draft-3 schema boundaries. Run log: [negative-test-run.txt](negative-test-run.txt) - 18/18 passed at the audit commit | holds   |

## Notes

- The gate's applicability clause reserves a `not_applicable` judgment for
  the production-lifecycle portion if Release 1 ships test-only attestation
  material; the steward instead chose conditional close with the production
  item tracked on the pre-publication checklist, which is stricter (the
  item remains visibly open until the ceremony).
- Production key material still does not exist; no claim to the contrary is
  made by this close.
