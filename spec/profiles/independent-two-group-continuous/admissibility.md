# ITGC Profile Admissibility Boundaries

**Status: Normative.** This document binds the Phase 2A admissibility
boundaries of the ITGC profile (`NRS-PROFILE-ITGC` namespace, continued).
The declared values are structurally representable in the 0.2 schema even
when unsupported; an unsupported declaration fails the profile-admissibility
check with its registered reason code, never silently. Judgment basis:
`declared_record_structure` only (see [non-claims.md](non-claims.md)).

## Design boundaries

<a id="NRS-PROFILE-ITGC-0019"></a>
**NRS-PROFILE-ITGC-0019 - Unpaired design boundary** (stability: STABLE-INTENT, status: active)
The Phase 2A ITGC profile MUST reject a design declaring paired observations.

<a id="NRS-PROFILE-ITGC-0020"></a>
**NRS-PROFILE-ITGC-0020 - Repeated-measure boundary** (stability: STABLE-INTENT, status: active)
The Phase 2A ITGC profile MUST reject a design declaring repeated
measurements.

<a id="NRS-PROFILE-ITGC-0021"></a>
**NRS-PROFILE-ITGC-0021 - Clustering boundary** (stability: STABLE-INTENT, status: active)
The Phase 2A ITGC profile MUST reject a design declaring clustered
experimental units.

## Data-handling boundaries

<a id="NRS-PROFILE-ITGC-0022"></a>
**NRS-PROFILE-ITGC-0022 - Unweighted-analysis boundary** (stability: STABLE-INTENT, status: active)
The Phase 2A ITGC profile MUST reject a Record declaring weighted analysis.

<a id="NRS-PROFILE-ITGC-0023"></a>
**NRS-PROFILE-ITGC-0023 - Untransformed-outcome boundary** (stability: EXPERIMENTAL, status: active)
The Phase 2A ITGC profile MUST reject a Record declaring an outcome
transformation.

<a id="NRS-PROFILE-ITGC-0024"></a>
**NRS-PROFILE-ITGC-0024 - Complete represented analysis population** (stability: EXPERIMENTAL, status: active)
The Phase 2A ITGC profile MUST require the analyzed population to contain
all observations represented in the Record.

<a id="NRS-PROFILE-ITGC-0025"></a>
**NRS-PROFILE-ITGC-0025 - No supported missingness policy** (stability: EXPERIMENTAL, status: active)
The Phase 2A ITGC profile MUST reject a Record declaring missing outcomes
rather than applying an implicit missingness policy.

## Informative: supported declaration values

| Declaration                          | Supported                 | Unsupported (admissibility fails) |
| ------------------------------------ | ------------------------- | --------------------------------- |
| `declarations.grouping_structure`    | `independent_groups`      | (schema-closed)                   |
| `declarations.pairing`               | `none`                    | `present`                         |
| `declarations.repeated_measurements` | `none`                    | `present`                         |
| `declarations.clustering`            | `none_declared`           | `present`                         |
| `data_handling.analysis_population`  | `all_record_observations` | `subset_or_exclusions_present`    |
| `data_handling.missing_outcomes`     | `none`                    | `present`                         |
| `data_handling.transformation`       | `none`                    | `present`                         |
| `data_handling.weighting`            | `none`                    | `present`                         |

The method, alternative, estimand, and confidence-level boundaries also
belong to admissibility in this bundle
([phase-1-minimal-profile.md#NRS-PROFILE-ITGC-0007](phase-1-minimal-profile.md#NRS-PROFILE-ITGC-0007),
[effect-estimate.md#NRS-PROFILE-ITGC-0015](effect-estimate.md#NRS-PROFILE-ITGC-0015),
[confidence-interval.md#NRS-PROFILE-ITGC-0016](confidence-interval.md#NRS-PROFILE-ITGC-0016)).
An admissibility failure gates the dependent checks
([../../verification/profile-admissibility-check.md#NRS-VERIFY-0017](../../verification/profile-admissibility-check.md#NRS-VERIFY-0017))
and is a scoped result: nothing presents the Record, let alone the research,
as scientifically wrong as a whole.
