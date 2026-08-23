# Gate Close Record: R1-05 - Threat model and adversarial corpus

- Decision: **pass** (closed 2026-08-13)
- Authority: steward decision
  [2026-08-13 gate close review](../../decisions/2026-08-13-gate-close-review.md), ruling 1
- Evidence state basis: commit `e429a58`, working tree clean
- Audited by: gate-close-review-agent; approved by: release-gate-steward

## Required evidence, item by item

| Required evidence (registry)                       | Artifact                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Verdict |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| Published threat model                             | [security/threat-model.md](../../../../security/threat-model.md) (assets, trust boundary, threat catalogue mapped to mitigations and fixtures)                                                                                                                                                                                                                                                                                                                 | holds   |
| Adversarial corpus with expected behavior per item | Conformance fixture families `structural`, `semantic`, `strict_json`, `routing`, `numerical_contract`, `verifier_behavior` (incl. hostile fixtures B-007/B-008/B-009 and the A2-R resource-refusal series) with expectations pinned per fixture in [conformance/manifest.yaml](../../../../conformance/manifest.yaml); canonicalization rejection vectors in [canonicalization/test-vectors/](../../../../canonicalization/test-vectors/manifest.yaml)         | holds   |
| Run logs showing actual behavior matches expected  | [adversarial-run-2026-08-13.txt](adversarial-run-2026-08-13.txt) (A2-R fixtures: 8/8 match pinned expectations; fresh fuzz run: 21,135 iterations, 0 unsafe outcomes), plus the pinned fuzz artifact [evidence/development/fuzz-runs/run-seed-42.json](../../../development/fuzz-runs/run-seed-42.json) (13,871 iterations, 0 unsafe) and [evidence/development/phase-2a/resource-limit-report.json](../../../development/phase-2a/resource-limit-report.json) | holds   |

## Steward-named supplements (all present)

- Resource limits: ADR-0022 (in-process time and memory bounds), NRS-SEC-0003/0005/0006,
  [security/phase-2a-resource-refusal.md](../../../../security/phase-2a-resource-refusal.md)
- Fuzzing: schema-guided mutation fuzzer
  (`tooling/src/fuzz/schema-guided-fuzzer.ts`) with the documented
  finding-to-fixture reflow procedure
  ([evidence/development/fuzz-runs/README.md](../../../development/fuzz-runs/README.md))
- Inspection ledger: the 18-item three-way-verdict ledger
  [security/INPUT-HARDENING-LEDGER.md](../../../../security/INPUT-HARDENING-LEDGER.md)
  (Batch 5 Y5)

## Notes

- The registry notes' earlier reservation ("not an exhaustive or
  professionally red-teamed adversarial review") remains true as a
  characterization; the steward judged the curated-by-threat-category corpus
  plus time-bounded randomized fuzzing sufficient for this gate's close.
  Professional red-teaming is not a registered evidence item of this gate.
- The fresh fuzz run's JSON output was discarded to preserve the pinned
  `run-seed-42.json` artifact unchanged; its stdout summary is captured in
  the run log above.
