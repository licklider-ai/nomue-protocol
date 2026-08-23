# Independent Review Record - Phase 2A

- Reviewer: independent adversarial reviewer context (AI subagent), separate
  from the implementing context; read-only; re-derived the kernel math with
  a from-scratch t-distribution implementation (continued-fraction
  incomplete beta + bisection quantile, no SciPy/stdlib lineage), replayed
  every suite, and executed adversarial probes against the live verifier.
- Result: **0 BLOCKER, 2 MAJOR, 8 MINOR.** Clean dimensions included: Phase 1
  semantic drift (none; structured manifest diff), exact bundle dispatch,
  all Welch/SE/df/p/critical-value/CI math (independently re-derived,
  <= 9e-15 relative on every declared fixture value), CI edge cases
  (variance zero, n=2, large magnitude, CI crossing zero), no significance
  boolean or overall status, confidence-level authority, standardized
  effect-size leakage (none), admissibility/declaration-truth posture,
  refusal artifact consistency, resource limits, reason-code propagation,
  no network/execution surface, no Phase 2B scope creep, and full
  traceability of all 25 new requirements. All 12 R1 gates open/null.

## Disposition of findings

| Finding                                                                                                                                      | Severity | Disposition                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| -------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MAJOR-1: hostile declared bundle identifiers were echoed into refusals, producing schema-invalid refusals at runtime (NRS-VERIFY-0018)       | MAJOR    | **Fixed.** `isDeclarableBundleId` gates the field: identifiers that cannot be carried within the schema's uri constraints are omitted, never echoed, fabricated, or truncated (documented in spec/verification/verifier-refusal.md). New fixture A2-R-008 pins the behavior with runner-side refusal-schema validation.                                                                                                                       |
| MAJOR-2: finite-but-extreme observations overflowed intermediate quantities and escaped the computability check into internal_error (exit 5) | MAJOR    | **Fixed.** The kernel now guards finiteness of means, variances, standard error, mean difference, t, and df (`NON_FINITE_RESULT`, fail closed); the 0.2 pipeline maps it to `NRS-NUMERICAL-COMPUTABILITY-FAILED` (completed/fail) and the 0.1 pipeline to `NRS-NON-FINITE-NUMERIC-VALUE`. New fixture A2-C-002 pins overflow as a data property, never a verifier defect.                                                                     |
| MINOR-1: ADR-0015/README/evidence understated the B-002..B-006 input-pin refresh                                                             | MINOR    | **Fixed.** ADR-0015 gained correction item 3 (old/new pins for the version-string advance) and a "pinned versus corrected, stated precisely" section; conformance/README and the bundle-compatibility evidence use the precise wording: Phase 1 Record interpretation semantics and successful verification projections remain pinned; verifier-level refusal behavior received explicitly documented pre-release corrections under ADR-0015. |
| MINOR-2: dispatch never cross-checked its constants against the bundle registry; non-string bundle values undocumented                       | MINOR    | **Fixed.** Resource loading now fails loud if an implemented bundle is not registered; multi-bundle-dispatch.md documents both the registered-and-implemented condition and the non-string case.                                                                                                                                                                                                                                              |
| MINOR-3: the 0.95 level was not machine-readable where its ownership is claimed                                                              | MINOR    | **Fixed.** The welch-recompute 0.2 registry entry carries `comparison_constants` (level, CI method, estimand kind); the verifier reads them and fails loud on any disagreement with the implemented constants (conflict detection, no silent preference).                                                                                                                                                                                     |
| MINOR-4: "hand-authored before implementation" provenance unverifiable pre-commit; kernel-generated fixture inputs circular                  | MINOR    | **Partially addressed.** The kernel-generated-inputs residual is now disclosed in the expectations header (circularity broken only by the independent oracle comparison). The temporal claim becomes verifiable from this commit onward; acknowledged as assertion-backed for the initial authoring.                                                                                                                                          |
| MINOR-5: refusal-schema conditionals comment-only; runner failed open if the refusal schema did not compile                                  | MINOR    | **Fixed.** The schema enforces kind-conditioned presence of `declared_bundle_id` and `limit_category` via if/then; the runner surfaces schema-compilation issues and treats a missing refusal validator as a suite failure.                                                                                                                                                                                                                   |
| MINOR-6: pre-conformance not_run scopes contradict the registered scope_kind                                                                 | MINOR    | **Fixed (documented).** The scope convention (identifiers untrustworthy before conformance -> record_revision scope) is recorded in the public-check registry header; a scoped rework is deferred to a future check version because the current shape is pinned.                                                                                                                                                                              |
| MINOR-7: CLI human summary understated the 0.2 guarantee boundary                                                                            | MINOR    | **Fixed.** The summary iterates the actual guarantee-boundary members.                                                                                                                                                                                                                                                                                                                                                                        |
| MINOR-8: oracle datasets duplicated with no mechanical link to fixture inputs                                                                | MINOR    | **Fixed.** `tooling/src/phase2a/datasets.ts` is the single source imported by both the fixture authoring and the oracle comparison.                                                                                                                                                                                                                                                                                                           |

## Additional pre-close items (steward direction, same change set)

1. **Pinned/corrected separation** recorded as above (ADR-0015, README,
   evidence).
2. **Refusal-schema authority clarified as bundle-independent**: the
   interpretation-bundle registry now carries a machine-readable
   `verifier_output_contract` (verification_report selected by
   interpretation_bundle; verifier_refusal selected by
   verifier_output_protocol, bundle_independent: true), with the meta-schema
   updated and the spec stating that the 0.1 bundle acquires no dependency
   on any 0.2 Record schema.
3. **Evidence-completion fixtures promoted to the official suite**:
   M-012 (dataset reference mismatch), M-013 (design reference mismatch),
   M-014 (duplicate group_id via the semantic exactly-two-groups path), and
   B-008 (a `1e999` literal parses to infinity and fails closed as a
   canonicalization refusal - Phase 1 finite-binary64/JCS fail-closed
   contract evidence), plus A2-C-002 and A2-R-008 from the MAJOR fixes.
   Total fixtures: 76.

After all fixes, the complete suite (76 fixtures, 73 tests, validation,
generated and evidence diffs, both examples, oracle comparison) was re-run
green on Windows and Linux. Blocker count at close: 0; major count at
close: 0.

---

## Full review text (as delivered by the reviewer)

The reviewer's complete findings text is preserved verbatim below.

### MAJOR-1: Verifier can emit schema-invalid refusals for hostile declared bundle identifiers (NRS-VERIFY-0018 violated at runtime)

`verify.ts` copies any string `interpretation_bundle_id` verbatim into the refusal's `declared_bundle_id`, but the refusal schema constrains that field to the common `uri` definition. Confirmed by execution: inputs `{"interpretation_bundle_id":"x"}`, an id with an embedded space, and a 3004-char id each produce an `unsupported_bundle` refusal (exit 3) that fails validation against its own declared schema. The refusal remains honest and fail-closed, which keeps this out of BLOCKER territory. Fix: include `declared_bundle_id` only when it satisfies the uri constraints, or validate every refusal before emitting; add a fixture.

### MAJOR-2: Finite-but-extreme observations crash into `internal_error` (exit 5) instead of the specified Welch-computability `completed`/`fail`

The kernel guards finiteness only for CI endpoints; observations `[1.7e308, 1.6e308]` vs `[-1.7e308, -1.6e308]` overflow the squared-deviation sum, produce `t = NaN`, and `studentTCdf` throws a plain `RangeError` that escapes the computability catch and surfaces as `internal_error`, exit 5. A data property is misreported as a verifier defect. Fix: finiteness checks in the kernel raising `StatsKernelError`, mapped to `NRS-NUMERICAL-COMPUTABILITY-FAILED`, plus an overflow fixture.

### MINOR-1..MINOR-8 (summaries)

1. Phase 1 fixture-pin changes understated (B-002..B-006 `input_sha256` refreshed by the verifier version-string advance; expectations genuinely unchanged).
2. Bundle dispatch never cross-checks its hardcoded constants against the bundle registry; non-string bundle values undocumented.
3. The 0.95 confidence level not machine-readable in the check registry despite the ownership claim.
4. "Hand-authored before implementation" provenance unverifiable until committed; valid-fixture inputs kernel-generated (mitigated by the oracle cross-check, independently confirmed to <= 9e-15).
5. Refusal-schema field-presence rules comment-only; runner fails open if the refusal schema does not compile.
6. Pre-conformance `not_run` scope kinds contradict the registry's declared `scope_kind` (pinned pattern).
7. CLI human summary prints only `scientific_validity` for 0.2 reports.
8. Oracle datasets duplicated in two modules with no mechanical link.

### Clean dimensions (verbatim summary)

Phase 1 semantic drift: none. Exact bundle dispatch: clean. Math: independently re-derived, every declared value agrees to <= 9e-15 relative. t-quantile wrapper: fails closed, pinned, not an oracle. CI edge cases: all confirmed. No significance boolean / overall status. Confidence-level authority: clean. Standardized effect-size leakage: none. Admissibility/declaration-truth posture: clean. Refusal artifact: consistent (subject to MAJOR-1). Resource limits: aligned. Reason-code propagation: mechanically enforced, green. Network/execution surfaces: none. Phase 2B scope creep: none. Requirement traceability: all 25 new IDs anchored exactly once with matching stability; R1 gates all open/null.

### Summary

| Severity | Count |
| -------- | ----- |
| BLOCKER  | 0     |
| MAJOR    | 2     |
| MINOR    | 8     |

"The Phase 2A slice is in strong shape: the statistics are correct (independently re-derived), the meta-rules hold on every pinned surface, Phase 1 behavior is genuinely preserved, and the expectation/oracle scaffolding is unusually disciplined. The two MAJOR findings are adversarial-input gaps in the reference verifier - both fail closed but contradict written contracts and deserve fixes plus pinned fixtures before the bundle is treated as review-complete."
