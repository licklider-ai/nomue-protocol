# Gate Close Record: R1-13 - Relying-party interface documentation

- Decision: **pass** (closed 2026-08-13)
- Authority: steward decision
  [2026-08-13 gate close review](../../decisions/2026-08-13-gate-close-review.md), ruling 1
- Evidence state basis: commit `e429a58`, working tree clean
- Audited by: gate-close-review-agent; approved by: release-gate-steward

## Required evidence, item by item

| Required evidence (registry)                                                       | Artifact                                                                                                                                                                                                                                                                                                                                                                                                                 | Verdict |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| Published relying-party interface section                                          | [spec/verification/relying-party-interface.md](../../../../spec/verification/relying-party-interface.md) (NRS-VERIFY-0022/0023/0024/0025)                                                                                                                                                                                                                                                                                | holds   |
| Review record confirming claims match the current report/refusal schemas           | Audit at commit `e429a58`: the section's reading rules reference exactly the members of `verification-report-0.2-draft-3.schema.json` (`verification_results[].execution/outcome`, `guarantee_boundary`) and `verifier-refusal-0.2-draft-3.schema.json` (`output_type`, `refusal_kind`); the exit-code table matches `reference/verifier/src/cli.ts` (drift-tested, below). Accepted via the 2026-08-13 steward decision | holds   |
| Confirmation the section adds no new normative field to the public contract        | NRS-VERIFY-0022/0023/0024 are interpretive constraints on existing report fields; NRS-VERIFY-0025 constrains CLI exit behavior, not any Record/report schema. No schema declares a field introduced by this section (checked against `schemas/` at the audit commit)                                                                                                                                                     | holds   |
| Machine-readable CLI output mode and a documented, drift-tested exit-code contract | `pnpm nomue-record verify <record.json> --format json\|json-compact\|human` ([reference/verifier/src/cli.ts](../../../../reference/verifier/src/cli.ts)); drift test [tooling/tests/exit-code-contract.test.ts](../../../../tooling/tests/exit-code-contract.test.ts). Run log: [exit-code-contract-run.txt](exit-code-contract-run.txt) - 7/7 passed at the audit commit                                                | holds   |
| A CI-integration example demonstrating the interface end-to-end                    | [examples/ci-integration/](../../../../examples/ci-integration/README.md) with [github-actions-pr-gate.yml](../../../../examples/ci-integration/github-actions-pr-gate.yml)                                                                                                                                                                                                                                              | holds   |

## Notes

- The relying-party interface document itself remains EXPERIMENTAL in the
  stability registry; this gate confirms the documentation exists, is
  accurate against the schemas, and adds no normative surface - it does not
  promote the document's tier.
