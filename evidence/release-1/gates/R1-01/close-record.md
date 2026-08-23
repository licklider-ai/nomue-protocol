# Gate Close Record: R1-01 - Verification depth and capability matrix

- Decision: **pass** (closed 2026-08-13)
- Authority: steward decision
  [2026-08-13 gate close review](../../decisions/2026-08-13-gate-close-review.md), ruling 1
- Evidence state basis: commit `e429a58`, working tree clean
- Audited by: gate-close-review-agent; approved by: release-gate-steward

## Required evidence, item by item

| Required evidence (registry)                               | Artifact                                                                                                                                                                                                                                                             | Verdict |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| Published capability matrix covering every shipped check   | [generated/PROFILE-CAPABILITY-MATRIX.md](../../../../generated/PROFILE-CAPABILITY-MATRIX.md) - all 3 registered bundles, every allowed check listed                                                                                                                  | holds   |
| Per-check depth analysis                                   | [generated/PUBLIC-CHECKS.md](../../../../generated/PUBLIC-CHECKS.md) - `calculation_evidence` / `consistency_evidence` / `signature_evidence` per check                                                                                                              | holds   |
| Mapping from checks to Requirement IDs                     | `requirement_ids` per check in [registries/public-checks.yaml](../../../../registries/public-checks.yaml), mirrored in the generated views                                                                                                                           | holds   |
| Adversarial review of overclaim risk in all public wording | Steward review action, performed and accepted via the 2026-08-13 steward decision (ruling 1); guarantee-boundary wording is additionally pinned by `guarantee_boundary` members being `const: "not_asserted"` in the report schemas and by NRS-VERIFY-0001/0002/0003 | holds   |

## Notes

- Items 1-3 are auto-generated from `registries/public-checks.yaml` and
  `registries/interpretation-bundles.yaml` (`pnpm generate`); drift fails CI
  (`pnpm check:generated`), so the matrix cannot silently diverge from the
  shipped checks.
- Item 4 had been flagged in the gate registry notes as "a steward review
  action ... remains open"; the 2026-08-13 steward decision is that review's
  completion record. No wording change was requested by the review.
