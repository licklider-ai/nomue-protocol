# ITGC Profile Non-Claims

**Status: Normative.** This document binds the interpretation boundary of
conformance and admissibility results.

## Declaration truth

<a id="NRS-CORE-0009"></a>
**NRS-CORE-0009 - Declaration truth is not asserted** (stability: CORE, status: active)
A successful conformance or profile-admissibility result MUST NOT be
interpreted as proof that a scientific or experimental declaration is true.

Informative note: profile admissibility judges the declared Record structure
(judgment basis: `declared_record_structure`). A pass establishes that the
declarations, as written, lie inside the ITGC guarantee boundary and that
the Record structure is consistent with them - nothing more.

## Informative: what admissibility never establishes

- that the experimental-unit declaration is true;
- that the groups really are independent;
- that no exclusion, selection, or preprocessing happened upstream of the
  Record;
- that the distributional model behind the Welch procedure is scientifically
  appropriate for the data;
- any causal interpretation of the mean difference;
- the validity of the study design as a whole.

The Phase 2A verification report makes these boundaries machine-readable:
`guarantee_boundary` fixes `scientific_validity`, `declaration_truth`,
`distributional_model_validity`, `causal_interpretation`, and
`standardized_effect_size` to `not_asserted`
([../../verification/verification-report.md](../../verification/verification-report.md)
and the 0.2 report schema).
