# Verification Report

**Status: Normative.** This document binds the verification-report invariants
shared by the currently registered report surfaces. The Phase 1 structural
representation is
[../../schemas/reports/verification-report.schema.json](../../schemas/reports/verification-report.schema.json).
The Phase 2A verifier pipeline uses
[../../schemas/reports/verification-report-0.2.schema.json](../../schemas/reports/verification-report-0.2.schema.json),
which expands the guarantee boundary to five explicit `not_asserted` fields.
An additive, EXPERIMENTAL attestation-capable report schema is retained as
[../../schemas/reports/verification-report-0.2-draft-3.schema.json](../../schemas/reports/verification-report-0.2-draft-3.schema.json):
it supersedes draft.2 by adding the optional RFC 3161 timestamp member to an
assertion. No registered interpretation bundle currently declares attestation
support, and the reference verifier pipeline does not emit `attestations`.

## Report requirements

<a id="NRS-CORE-0008"></a>
**NRS-CORE-0008 - Verification report separation** (stability: STABLE-INTENT, status: active)
A verification report produced by a verifier MUST be a separate artifact and
MUST NOT mutate the verified Record revision.

<a id="NRS-VERIFY-0011"></a>
**NRS-VERIFY-0011 - Exact Record reference** (stability: CORE, status: active)
A verification report MUST identify the exact record identifier, revision
identifier, content digest, interpretation bundle, and check versions used.

<a id="NRS-VERIFY-0012"></a>
**NRS-VERIFY-0012 - Reason-code requirement** (stability: STABLE-INTENT, status: active)
A failed, indeterminate, not-run, or errored result MUST include at least one
registered reason code.

## Informative: report structure

Every current verifier-produced report contains:

- `record_reference` - record identifier, revision identifier, and the
  independently recomputed content digest of the verified revision;
- `interpretation_bundle_id` - the bundle under which verification ran;
- `verifier` - name, version, and source commit of the producing verifier;
- `generated_at` - wall-clock production time (excluded from the semantic
  projection below);
- `conformance` - the result of the `record-conformance` covered rule;
- `verification_results` - one scoped result per executed public check, each
  inseparable from its check identifier, check version, and scope;
- `guarantee_boundary` - Phase 1 fixes `scientific_validity` to
  `not_asserted`; Phase 2A additionally fixes `declaration_truth`,
  `distributional_model_validity`, `causal_interpretation`, and
  `standardized_effect_size` to `not_asserted`.

A verifier-produced report has no overall status, no `VERIFIED` value, no
whole-record validity boolean, and no significance boolean. Scientific validity
is represented as `not_asserted` (bound by
[../core/verification-principles.md#NRS-VERIFY-0003](../core/verification-principles.md#NRS-VERIFY-0003)).

The EXPERIMENTAL draft.3 report schema may carry an optional `attestations`
member when a downstream tool explicitly attaches attestations. That member is
structurally separate from `conformance` and `verification_results` and is
subject to the non-escalation rule NRS-VERIFY-0004. Its presence is not part of
the current verifier pipeline or any registered bundle's attestation support.

## Informative: verification semantic projection

For cross-environment comparison of reports produced by the current verifier
pipeline, the _verification semantic projection_ is the report object with the
`generated_at` member and the `verifier` member removed, and all remaining
members retained. It therefore contains the record reference, bundle identifier,
conformance result, scoped verification results (including reason codes and
numeric evidence), and the guarantee boundary - the semantically necessary
content - while excluding wall-clock time, build paths, and other
environment-specific detail. Two verification runs agree semantically when the
JCS canonical forms of their projections are byte-identical; the projection
hash is the SHA-256 digest of that canonical form.

The current cross-environment evidence does not exercise downstream-attached
attestations because registered bundles declare `attestation_support: none` and
the verifier pipeline emits no `attestations` member.
