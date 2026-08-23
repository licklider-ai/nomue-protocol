# Welch Calculation

**Status: Normative.** This document binds the Phase 1 Welch two-sample
t-test calculation. It is the single home of these formulas; other documents
reference this one instead of restating them.

Throughout, group 1 is the first entry of `group_order` and group 2 is the
second entry. For each group `i`, `n_i` is the observation count, `mean_i` the
arithmetic mean of the group's outcome values, and `variance_i` the group
sample variance.

## Sample variance

<a id="NRS-PROFILE-ITGC-0008"></a>
**NRS-PROFILE-ITGC-0008 - Sample variance definition** (stability: STABLE-INTENT, status: active)
Each group sample variance MUST use the n minus one denominator.

Informative note, written out:

```text
variance_i = sum over group i of (x - mean_i)^2 / (n_i - 1)
```

## Test statistic

<a id="NRS-PROFILE-ITGC-0009"></a>
**NRS-PROFILE-ITGC-0009 - Welch statistic definition** (stability: STABLE-INTENT, status: active)
The Welch test statistic MUST be calculated from the declared group-order mean
difference and the unpooled standard error.

Informative note, written out:

```text
mean_difference = mean_1 - mean_2
a = variance_1 / n_1
b = variance_2 / n_2
standard_error = sqrt(a + b)
t = mean_difference / standard_error
```

## Degrees of freedom

<a id="NRS-PROFILE-ITGC-0010"></a>
**NRS-PROFILE-ITGC-0010 - Welch degrees of freedom** (stability: STABLE-INTENT, status: active)
The degrees of freedom MUST use the declared Welch-Satterthwaite formula.

Informative note, written out:

```text
df = (a + b)^2 / ( a^2 / (n_1 - 1) + b^2 / (n_2 - 1) )
```

## p-value

<a id="NRS-PROFILE-ITGC-0011"></a>
**NRS-PROFILE-ITGC-0011 - Two-sided p-value** (stability: STABLE-INTENT, status: active)
The p-value MUST be the two-sided Student t-distribution probability for the
absolute Welch statistic and declared degrees of freedom.

<a id="NRS-VERIFY-0019"></a>
**NRS-VERIFY-0019 - Tail-safe two-sided p-value evaluation** (stability: CORE, status: active)
A supported two-sided Student t p-value MUST be evaluated by a direct
lower-tail or survival-tail method and MUST NOT be calculated by subtracting
a positive-tail cumulative probability from one.

Informative note, written out:

```text
p = 2 * CDF(-abs(t), df)
```

is the preferred direct lower-tail form. The form `2 * (1 - CDF(abs(t), df))`
is prohibited because subtracting a positive-tail cumulative probability from
one can suffer catastrophic cancellation in the tails. Implementations may
clamp `p` into `[0, 1]` only when the raw value lies outside that interval;
underflow to zero in binary64 is numerical underflow, not exact probability
zero (NRS-VERIFY-0021). The normative definition is the mathematical tail
probability; no particular summation order or library is the source of truth.

## Informative: zero standard error

When `standard_error` is zero the statistic is undefined; the precondition
check fails with `NRS-ZERO-STANDARD-ERROR` and this calculation does not run
(bound by
[phase-1-minimal-profile.md#NRS-PROFILE-ITGC-0014](phase-1-minimal-profile.md#NRS-PROFILE-ITGC-0014)).
