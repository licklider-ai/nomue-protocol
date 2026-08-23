# Effect Estimate

**Status: Normative.** This document binds the Phase 2A supported effect
estimand.

## Supported estimand

<a id="NRS-PROFILE-ITGC-0015"></a>
**NRS-PROFILE-ITGC-0015 - Supported effect estimand** (stability: STABLE-INTENT, status: active)
The Phase 2A ITGC profile MUST define the supported effect estimand as the
unstandardized arithmetic mean of the first declared group minus the
unstandardized arithmetic mean of the second declared group.

Informative note, written out (the group indices follow `group_order`,
consistent with
[welch-calculation.md#NRS-PROFILE-ITGC-0009](welch-calculation.md#NRS-PROFILE-ITGC-0009)):

```text
estimate = mean_1 - mean_2
```

The declared representation is `effect_estimate.kind =
unstandardized_arithmetic_mean_difference` with `estimand.direction =
group_order_first_minus_second`; the Phase 2A verifier recomputes the
estimate and its standard error from the observations
([../../verification/phase-2a-welch-recompute.md](../../verification/phase-2a-welch-recompute.md)).

## Standardized effect sizes

<a id="NRS-PROFILE-ITGC-0026"></a>
**NRS-PROFILE-ITGC-0026 - Standardized effect size not asserted** (stability: CORE, status: active)
The Phase 2A ITGC profile MUST NOT emit or imply a standardized effect-size
estimate.

Informative note: the absence of a standardized effect size is intentional,
not an omission. The Welch test assumes no equal variances, while pooled-SD
standardization (for example Cohen's d or pooled Hedges' g) reintroduces an
equal-variance denominator whose meaning then diverges from the test's
variance model; under unequal variances, several competing standardized
definitions exist. Phase 2A therefore supports only the mean difference,
whose meaning is unique, and the verification report fixes
`standardized_effect_size` to `not_asserted`. Adding a standardized effect
size in a future phase requires new Requirement IDs, a new method
identifier, a new check version, and a new bundle version (see
[../../../governance/decisions/ADR-0012-standardized-effect-sizes-deferred.md](../../../governance/decisions/ADR-0012-standardized-effect-sizes-deferred.md)).
