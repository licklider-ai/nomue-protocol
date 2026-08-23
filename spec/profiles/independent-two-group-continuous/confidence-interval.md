# Mean-Difference Confidence Interval

**Status: Normative.** This document binds the Phase 2A standard error and
confidence interval. It is the single normative home of these formulas; the
test statistic, degrees of freedom, and p-value remain bound in
[welch-calculation.md](welch-calculation.md) and are referenced, not
restated.

## Confidence level

<a id="NRS-PROFILE-ITGC-0016"></a>
**NRS-PROFILE-ITGC-0016 - Supported confidence level** (stability: STABLE-INTENT, status: active)
The Phase 2A ITGC profile MUST use a two-sided confidence level of 0.95.

Informative note: the level is owned by the applicable public-check version
(NRS-CANON-0006 applies to it like any comparison policy). A Record cannot
choose another level; it declares the required 0.95, and a different
declared level fails admissibility (analysis declaration) or comparison
(declared interval) with `NRS-CONFIDENCE-LEVEL-MISMATCH`.

## Standard error

<a id="NRS-PROFILE-ITGC-0017"></a>
**NRS-PROFILE-ITGC-0017 - Welch standard error** (stability: STABLE-INTENT, status: active)
The mean-difference standard error MUST be the square root of the sum of
each group sample variance divided by its sample size.

Informative note, written out (same quantities as
[welch-calculation.md#NRS-PROFILE-ITGC-0009](welch-calculation.md#NRS-PROFILE-ITGC-0009)):

```text
a = variance_1 / n_1
b = variance_2 / n_2
standard_error = sqrt(a + b)
```

## Confidence interval

<a id="NRS-PROFILE-ITGC-0018"></a>
**NRS-PROFILE-ITGC-0018 - Welch mean-difference confidence interval** (stability: STABLE-INTENT, status: active)
The supported mean-difference confidence interval MUST use the declared
Welch standard error, Welch-Satterthwaite degrees of freedom, and the
two-sided Student t critical value.

Informative note, written out (df as bound in
[welch-calculation.md#NRS-PROFILE-ITGC-0010](welch-calculation.md#NRS-PROFILE-ITGC-0010)):

```text
critical_value = t_quantile(0.975, df)
lower = mean_difference - critical_value * standard_error
upper = mean_difference + critical_value * standard_error
```

The interval satisfies `lower <= upper`; reversed declared endpoints fail
comparison with `NRS-CONFIDENCE-INTERVAL-ORDER-INVALID`. The interval uses
exactly the same standard error and degrees of freedom as the test - never a
different variance model. A critical-value computation failure fails closed
(`NRS-CRITICAL-VALUE-CALCULATION-FAILED`); there is no silent fallback to a
normal approximation, and any numerically required clamp is recorded in the
internal evidence. The supported interval method identifier is
`urn:nomue:method:welch-satterthwaite-mean-difference-ci:1`.

## Informative: no significance boolean

Whether the interval contains zero generates no significance field, no
significant/non-significant classification, and no claim label; the
relationship between the p-value and the interval is checkable by
consistency comparison only
([../../verification/phase-2a-welch-recompute.md](../../verification/phase-2a-welch-recompute.md)).
