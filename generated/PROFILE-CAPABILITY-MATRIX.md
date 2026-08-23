<!--
GENERATED FILE - DO NOT EDIT.

Source artifacts:
- registries/public-checks.yaml (sha256:522ddfdb910f6c935baf33d93d7c5130d36227b371e22852fa46f6308713f6f9)
- registries/interpretation-bundles.yaml (sha256:fe019d7be977e5f8a6e63508616fef1efef6a400b5449ab386f9b26625d8d290)

Generation command: pnpm generate
-->

# Profile Capability Matrix

Non-authoritative view of what each check establishes, per bundle. No
check asserts scientific validity, declaration truth, or a standardized
effect size; there is no overall status.

## `urn:nomue:bundle:itgc-minimal:0.1.0-draft.1`

Guarantee boundary: scientific_validity: not_asserted.

| Check | Scope | Conformance | Consistency | Recomputation | Signature | Claim posture |
| --- | --- | --- | --- | --- | --- | --- |
| `urn:nomue:check:record-conformance:0.1.0-draft.1` | record | judged | checked | not_checked | not_checked | asserted |
| `urn:nomue:check:record-integrity:0.1.0-draft.1` | record_revision | required precondition | checked | recomputed | not_checked | asserted |
| `urn:nomue:check:itgc-preconditions:0.1.0-draft.1` | analysis | required precondition | checked | consistency_only | not_checked | asserted |
| `urn:nomue:check:welch-recompute:0.1.0-draft.1` | result | required precondition | checked | recomputed | not_checked | asserted |

## `urn:nomue:bundle:itgc-guarantee:0.2.0-draft.1`

Guarantee boundary: scientific_validity, declaration_truth, distributional_model_validity, causal_interpretation, standardized_effect_size: all not_asserted.

| Check | Scope | Conformance | Consistency | Recomputation | Signature | Claim posture |
| --- | --- | --- | --- | --- | --- | --- |
| `urn:nomue:check:record-conformance:0.2.0-draft.1` | record | judged | checked | not_checked | not_checked | asserted |
| `urn:nomue:check:record-integrity:0.2.0-draft.1` | record_revision | required precondition | checked | recomputed | not_checked | asserted |
| `urn:nomue:check:itgc-profile-admissibility:0.2.0-draft.1` | record | required precondition | checked | not_checked | not_checked | asserted |
| `urn:nomue:check:welch-computability:0.2.0-draft.1` | analysis | required precondition | checked | consistency_only | not_checked | asserted |
| `urn:nomue:check:welch-recompute:0.2.0-draft.1` | result | required precondition | checked | recomputed | not_checked | asserted |

## `urn:nomue:bundle:itgc-guarantee:0.2.1-draft.1`

Guarantee boundary: scientific_validity, declaration_truth, distributional_model_validity, causal_interpretation, standardized_effect_size: all not_asserted.

| Check | Scope | Conformance | Consistency | Recomputation | Signature | Claim posture |
| --- | --- | --- | --- | --- | --- | --- |
| `urn:nomue:check:record-conformance:0.2.0-draft.1` | record | judged | checked | not_checked | not_checked | asserted |
| `urn:nomue:check:record-integrity:0.2.0-draft.1` | record_revision | required precondition | checked | recomputed | not_checked | asserted |
| `urn:nomue:check:itgc-profile-admissibility:0.2.0-draft.1` | record | required precondition | checked | not_checked | not_checked | asserted |
| `urn:nomue:check:welch-computability:0.2.1-draft.1` | analysis | required precondition | checked | consistency_only | not_checked | asserted |
| `urn:nomue:check:welch-recompute:0.2.1-draft.1` | result | required precondition | checked | recomputed | not_checked | asserted |
