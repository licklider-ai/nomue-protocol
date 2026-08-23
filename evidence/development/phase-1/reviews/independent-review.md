# Independent Review Record - Phase 1

- Reviewer: independent adversarial reviewer context (AI subagent), separate
  from the implementing context; read-only access; verified numerical claims
  with its own independently written JCS canonicalizer, SHA-256 digest, and
  Student-t CDF rather than the repository's code.
- Scope: authority drift, requirement traceability, schema/spec mismatches,
  numerical formulas and group-order sign, zero-standard-error behavior,
  tolerance ownership, overall-status leakage, fail-closed bundle handling,
  execution/URI surfaces, fixture adequacy, scope creep, release gates,
  generated artifacts, private dependencies.
- Result: 1 BLOCKER, 2 MAJOR, 8 MINOR. Clean dimensions included: numerical
  correctness (V-001 digest and p-value reproduced independently), tolerance
  ownership, overall-status absence, fail-closed bundle handling,
  execution/URI surfaces, scope creep, release gates (all open/null),
  generated artifacts, private dependencies, and full 54-anchor requirement
  traceability.

## Disposition of findings

| Finding                                                                                                                                                       | Severity | Disposition                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BLOCKER-1: reason-code `applicable_check_ids` contradicted the pinned not_run propagation in the conformance manifest, and tooling could not see the conflict | BLOCKER  | **Fixed at the source.** The registry header now defines `applicable_check_ids` as every check whose result may carry the code, including gating not_run results; the affected code entries were extended accordingly; `pnpm validate` now cross-checks every pinned manifest reason code against the registry lists, so a recurrence fails validation (NRS-GOV-0003). |
| MAJOR-1: registered machine-testable invariants and the direction-defining comparison lacked fixtures                                                         | MAJOR    | **Partially fixed.** Added M-011 (result summaries not in group_order) and P-007 (mean-difference sign flip, the group-order direction error). Remaining gaps recorded openly below.                                                                                                                                                                                   |
| MAJOR-2: conformance expectations authored from and replayed against the same reference verifier                                                              | MAJOR    | **Mitigated and recorded.** Reason-code expectations are now registry-cross-checked and numeric expectations remain oracle-cross-checked; the residual circularity for execution states and projection hashes is disclosed in the manifest header and conformance/README.md and stays open work relevant to gates R1-03 and R1-08.                                     |
| MINOR-1: `analysis-ref-resolves` never evaluated under its own identifier                                                                                     | MINOR    | Fixed: registry note states it is evaluated via `result-references-analysis` in Phase 1.                                                                                                                                                                                                                                                                               |
| MINOR-2: undocumented `urn:nomue:unidentified:*` sentinels                                                                                                    | MINOR    | Fixed: documented as implementation-defined sentinels in the verifier README; standardization deferred.                                                                                                                                                                                                                                                                |
| MINOR-3: refusal object unspecified; `not_json` mislabeled canonicalization failures                                                                          | MINOR    | Partially fixed: new refusal kind `not_canonicalizable`; refusal kinds documented in the README as an implementation-defined diagnostic shape. A refusal schema/surface entry stays open.                                                                                                                                                                              |
| MINOR-4: `canonicalize`/`digest` CLI crashed unhandled on non-canonicalizable input                                                                           | MINOR    | Fixed: both commands now fail cleanly with exit 2.                                                                                                                                                                                                                                                                                                                     |
| MINOR-5: timestamp regex admitted calendar-invalid values                                                                                                     | MINOR    | Fixed: bounded month/day/hour/minute/second ranges; exact calendar validity documented as out of scope for Phase 1.                                                                                                                                                                                                                                                    |
| MINOR-6: stale namespace descriptions                                                                                                                         | MINOR    | Fixed: NRS-CANON and NRS-PROFILE-ITGC marked active as of Phase 1.                                                                                                                                                                                                                                                                                                     |
| MINOR-7: welch-recompute never compared its declared exact field `group_id`                                                                                   | MINOR    | Fixed: in-check exact comparison added as defense in depth.                                                                                                                                                                                                                                                                                                            |
| MINOR-8: exit-code 2 table row incomplete                                                                                                                     | MINOR    | Fixed: README documents that exit 2 also covers the two no-report refusals.                                                                                                                                                                                                                                                                                            |

## Remaining open findings (not hidden)

- Fixtures still missing for: `dataset-ref-resolves` and `design-ref-resolves`
  mismatches, the semantic path of `exactly-two-groups` (duplicate group_id),
  the non-finite-overflow refusal (`1e999`), and three of the four resource
  limits (size, observation count, string length; only nesting depth has
  B-007). The overflow and limit paths are covered by unit tests but not by
  manifest-pinned fixtures.
- The refusal object has no JSON Schema and no public-contract-surface entry.
- Implementation-independent derivation of non-numeric conformance
  expectations remains open (see MAJOR-2 disposition).

After the fixes, the full suite (`pnpm check`, including validation with the
new applicability cross-check, 34 fixtures, vectors, example verification,
and evidence regeneration) was re-run green; blocker count at close: 0.

---

## Full review text (as delivered by the reviewer)

## Independent Adversarial Specification Review - nomue Record Specification, Phase 1 Minimal Record Slice

**Repository:** `C:\nomue\nomue-record` (branch `feat/phase-1-minimal-record`, uncommitted working tree)
**Reviewer role:** independent, adversarial; read-only. No files were modified.
**Date:** 2026-08-10
**Method:** every claim below was verified by reading the cited files; numerical claims were re-verified with an independently written JCS canonicalizer, SHA-256 digest, and Student-t CDF (regularized incomplete beta), not with the repository's own code.

### BLOCKER-1 - Reason-code applicability contradicts between the reason-code registry, the conformance manifest, and the verifier

`registries/reason-codes.yaml` declares itself "authoritative for the reason codes carried by failed, indeterminate, not-run, or errored results," and every code carries a curated `applicable_check_ids` list. Several codes are curated to a strict subset of checks, yet the verifier propagates conformance-failure codes onto the `not_run` results of the three verification checks, and the zero-SE code onto the `not_run` welch-recompute result - and `conformance/manifest.yaml` pins exactly those propagated codes. Two authoritative artifacts therefore make incompatible claims, and per AUTHORITY.md's own conflict policy this must fail validation and block release - but the cross-checks only verified that referenced check IDs exist, so the conflict passed `pnpm validate` silently. **Fix:** define the semantics of `applicable_check_ids` explicitly and either extend the lists with a manifest-walking cross-check, or redefine the field as "originating check" with a dedicated gating code.

### MAJOR-1 - Several registered machine-testable invariants and the direction-defining comparison have no conformance fixture

The 32 fixtures cover the claimed cases, but no fixture exercises: `dataset-ref-resolves`, `design-ref-resolves`, `result-summaries-match-group-order` (the invariant that makes the verifier's index-based comparison sound), the semantic path of `exactly-two-groups`, the mean-difference sign flip (the exact quantity NRS-PROFILE-ITGC-0006 pins down), the non-finite-overflow refusal path, or three of the four resource limits. **Fix:** add fixtures; at minimum the mean-difference sign flip and the summaries-order swap.

### MAJOR-2 - Conformance expectations are authored from, and replayed against, the same reference verifier

For numeric values the circularity is mitigated by the independent oracle evidence (this review's independent recomputation also confirms V-001 exactly: t = -3.6742346141747673, df = 4, p within 4.5e-17). But for reason-code sets, exit codes, execution/outcome shapes, and semantic projection hashes, the "authoritative" expectations are definitionally whatever the non-normative implementation did at authoring time (BLOCKER-1 is a live example). **Fix:** derive part of the expectations independently, or add a registry-driven expectation generator; state the residual circularity explicitly.

### MINOR-1 - Registered invariant `analysis-ref-resolves` is never evaluated under its own identifier

### MINOR-2 - Fabricated placeholder identifiers `urn:nomue:unidentified:*` are invented by the implementation and defined nowhere

### MINOR-3 - The refusal object is unspecified, and refusal kind `not_json` mislabels canonicalization failures of valid JSON

### MINOR-4 - `canonicalize` and `digest` CLI commands crash unhandled on non-canonicalizable input

### MINOR-5 - `created_at`/`generated_at` regex admits calendar-invalid timestamps

### MINOR-6 - Stale namespace descriptions in the requirements registry

### MINOR-7 - The welch-recompute check never itself compares `group_id`, despite declaring it an exact field

### MINOR-8 - Verifier README exit-code table is incomplete for exit 2

### Clean dimensions

Normative clauses vs requirement registry: clean (all 54 anchors mechanically cross-checked; no orphans). Schema vs spec ranges: clean except MINOR-5. Numerical correctness: clean (kernel formulas match the spec exactly; V-001 digest byte-identical and p agrees to 4.5e-17 under independent recomputation; zero-SE path exactly as NRS-PROFILE-ITGC-0014 requires). Tolerance ownership: clean. Overall-status leakage: clean. Fail-closed bundle handling: clean. Execution/URI surfaces: clean. Scope creep: clean. Release gates: clean (all twelve open/null, mirrored in the gate index). Generated artifacts: clean (headers and source hashes verified by rehashing). Private dependencies: clean.

### Summary

| Severity | Count |
| -------- | ----- |
| BLOCKER  | 1     |
| MAJOR    | 2     |
| MINOR    | 8     |

"The slice is unusually disciplined for its size: the math is right and independently reproducible, the meta-rules all hold, and spec-to-registry traceability is mechanically exact. The one blocking issue is a genuine cross-artifact contradiction that the repository's own conflict policy says must fail validation but that the current tooling cannot see; it is cheap to fix in either direction, but it must be fixed at the source, not papered over in the manifest."
