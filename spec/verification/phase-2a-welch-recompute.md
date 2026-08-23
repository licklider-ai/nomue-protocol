# Phase 2A Welch Recomputation

**Status: Normative.** This document binds the Phase 2A recomputation and
comparison duties (`NRS-VERIFY` namespace, continued). The formulas live in
[../profiles/independent-two-group-continuous/welch-calculation.md](../profiles/independent-two-group-continuous/welch-calculation.md)
and
[../profiles/independent-two-group-continuous/confidence-interval.md](../profiles/independent-two-group-continuous/confidence-interval.md);
they are referenced here, never restated.

## Recomputation duties

<a id="NRS-VERIFY-0014"></a>
**NRS-VERIFY-0014 - Mean-difference effect recomputation** (stability: EXPERIMENTAL, status: active)
A conforming Phase 2A verifier MUST recompute the supported mean difference
and its standard error from the Record observations.

<a id="NRS-VERIFY-0015"></a>
**NRS-VERIFY-0015 - Confidence-interval recomputation** (stability: EXPERIMENTAL, status: active)
A conforming Phase 2A verifier MUST recompute the supported 95%
mean-difference confidence interval.

## Comparison

<a id="NRS-VERIFY-0016"></a>
**NRS-VERIFY-0016 - Effect-result comparison** (stability: EXPERIMENTAL, status: active)
The recomputed effect estimate, standard error, confidence interval, and
test result MUST be compared with the declared result using the applicable
public-check policy.

Informative note: the check
`urn:nomue:check:welch-recompute:0.2.0-draft.1` recomputes group sizes,
means, sample variances, the mean difference, the standard error, the test
statistic, the degrees of freedom, the p-value, the Student t critical
value, and both interval endpoints, then compares each declared quantity
under the tolerance policy owned by the check version
([../../canonicalization/numerical-comparison.md](../../canonicalization/numerical-comparison.md)).
Because the test and the interval share one standard error and one degrees
of freedom, a Record whose test result is right but whose interval is wrong
(or the reverse) fails comparison on exactly the mismatched quantities; the
consistency between the p-value and the interval is thereby checkable
without any significance field.
