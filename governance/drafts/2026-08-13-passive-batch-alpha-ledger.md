# Passive Batch Alpha - Reverse-Request Disposition Ledger (2026-08-13)

**Class: draft/working record (non-authoritative).** Input: the finalized
Layer-2 reverse-request list v1 (R-01..R-17), produced by the licklider-v1
Phase 2 reorganization and delivered as an independent file outside both
repositories. Processing rules were fixed in advance:

- **(a)** documentation clarification/annotation that changes no contract
  meaning - applied in this batch (appending discipline, stability-tier
  notes preserved, snapshot manifest regenerated).
- **(b)** substantive contract change (schema, normative text, digest
  surface, verification semantics) - NOT applied. The non-authoritative
  consultation-ticket draft was excluded from the Release 1 public surface;
  this ledger retains the disposition of each request. Anything that could
  invalidate closed-gate evidence is (b) by rule.
- **(c)** requests caused by misreading Layer-1 documents - rejected with
  recorded reasons.

Requests from nomue-app (B2) will be processed as batch beta under the
same rules when they arrive.

## Ledger (17 items)

| Req  | Summary                                                                 | Class   | Disposition in this batch                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---- | ----------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| R-01 | Merge the lifecycle contract to main                                    | (b)     | Consultation C-R01. A merge is a steward release-surface decision, not a documentation clarification.                                                                                                                                                                                                                                                                                                                                                                                                                 |
| R-02 | First released, pinnable artifact set (version + hash + change channel) | (b)     | Consultation C-R02. Release definition/timing is a release-policy decision.                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| R-03 | Distributable conformance-suite packaging                               | (b)     | Consultation C-R03. New distribution artifact class.                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| R-04 | Executable distribution of the reference verifier                       | (b)     | Consultation C-R04. New distribution artifact; boundary-compatible but substantive.                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| R-05 | Approval JSON Schema + Record attachment mechanism                      | (b)     | Consultation C-R05. New schema and possibly envelope surface - digest-surface change class.                                                                                                                                                                                                                                                                                                                                                                                                                           |
| R-06 | Trust-root key ceremony timing                                          | (b)     | Consultation C-R06. Partially addressed already: the generation-1 entry is pre-publication checklist item 1 (R1-11 conditional close). The remaining ask - a committed date - is the steward's.                                                                                                                                                                                                                                                                                                                       |
| R-07 | `check` axis: spec text (3 values) vs schema/implementation (4 values)  | (a)+(b) | **(a) applied**: interim informative note added to [spec/core/record-lifecycle.md](../../spec/core/record-lifecycle.md) naming `not_evaluated`, fixture LC-002, and the schema as the complete value list. **(b)**: the clause fix itself is a STABLE-INTENT normative-text change - consultation C-R07.                                                                                                                                                                                                              |
| R-08 | Conditional requirements in clarification `expected_form`               | (b)     | Consultation C-R08. Schema change (EXPERIMENTAL, but still contract surface).                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| R-09 | Machine-readable resource limits                                        | (b)     | Consultation C-R09. New authoritative registry surface.                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| R-10 | Registry-snapshot identification in state-view                          | (b)     | Consultation C-R10. Schema field addition.                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| R-11 | Stale "unmerged" self-descriptions                                      | **(a)** | **Applied.** Corrected with dated notes in [spec/approval/README.md](../../spec/approval/README.md), [registries/stability-tiers.yaml](../../registries/stability-tiers.yaml), [schemas/reports/verification-report-0.2-draft-3.schema.json](../../schemas/reports/verification-report-0.2-draft-3.schema.json) (description string only), and both affected notes in [authority/authority-manifest.yaml](../../authority/authority-manifest.yaml). No contract meaning touched; merge state is authoritative in git. |
| R-12 | Extra-Record provenance: definition timing                              | (b)     | Consultation C-R12. Roadmap commitment.                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| R-13 | Profile roadmap for launch coverage B-F                                 | (b)     | Consultation C-R13. Roadmap commitment.                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| R-14 | Layer-2 aggregation vocabulary (or explicit non-decision)               | (b)     | Consultation C-R14. Vocabulary/normative decision; touching relying-party-interface.md risks R1-13 evidence.                                                                                                                                                                                                                                                                                                                                                                                                          |
| R-15 | Migration support across pre-release breaking changes                   | (b)     | Consultation C-R15. Release-policy change.                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| R-16 | Consumer-facing entry document                                          | **(a)** | **Applied.** New informative document [spec/consuming-layer-1.md](../../spec/consuming-layer-1.md) (reading order, pin discipline, status caveats), registered informative in the authority manifest. Defines nothing; navigation only.                                                                                                                                                                                                                                                                               |
| R-17 | Exit-code 2 ambiguity                                                   | (b)     | Consultation C-R17. Verification-semantics change; **would invalidate R1-13 closed-gate evidence** (exit-code contract is a required-evidence item there).                                                                                                                                                                                                                                                                                                                                                            |

## (c) rejections: none (0 items)

The Phase 2 finalization already ran a misreading review on the Layer-2
side (zero withdrawals, reasons recorded in the list itself). This batch
re-examined each item from the Layer-1 side and confirms: every request
rests on a verifiable repository fact (R-07 mismatch verified against
schema + fixture LC-002; R-11 verified against git; R-17's dual meaning is
documented by the specification itself; the remaining items request
artifacts or decisions that genuinely do not exist). No request
originates in a misreading. This zero-count is recorded deliberately so a
future reader knows the (c) lane was exercised, not skipped.

## Batch verification record

- Applied (a) items: R-07 note, R-11 corrections (4 files), R-16 new
  document + manifest registration.
- `pnpm generate` / `pnpm validate` / `pnpm test` re-run green at the
  batch commit (see commit message).
- Snapshot manifest regenerated after the batch; the post-batch hash is
  recorded in the commit message. The pre-batch hash
  (`sha256:e32f6e469c26da0f387358dfa81e05308f1f82aedcbc9b54b4d2aad5f1c6f2b1`,
  gate-close audit at e429a58) remains valid for the R1-07 close record,
  which is pinned to its own audit commit.
- Closed-gate evidence invalidated by this batch: **none** (rule check:
  no edited file is cited as evidence by any closed gate; the draft-3
  schema edit is a description string only and R1-13's evidence cites
  the relying-party section, CLI, tests, and CI example, all untouched).
