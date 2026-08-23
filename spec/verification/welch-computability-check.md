# Welch Computability Check

**Status: Normative.** The binding separation and propagation clauses live
in [profile-admissibility-check.md](profile-admissibility-check.md)
(NRS-VERIFY-0013, NRS-VERIFY-0017); this document describes the
computability conditions the check
`urn:nomue:check:welch-computability:0.2.0-draft.1` evaluates.

## Conditions

For a Record that passed conformance and profile admissibility, the check
computes, from the observations in declared group order:

- at least two observations per group (defense in depth; conformance already
  requires this),
- finite outcome values,
- computable group sample variances,
- a standard error greater than zero,
- finite Welch-Satterthwaite degrees of freedom,
- a finite Student t critical value at the supported level,
- a finite two-sided p-value,
- finite confidence-interval endpoints.

## Outcomes

- Every condition holds: `completed` / `pass`; the recomputation check runs.
- A condition fails: `completed` / `fail` with the specific reason code
  (`NRS-ZERO-STANDARD-ERROR`, `NRS-CRITICAL-VALUE-CALCULATION-FAILED`,
  `NRS-NON-FINITE-NUMERIC-VALUE`, or `NRS-GROUP-SIZE-BELOW-TWO`) plus the
  general `NRS-NUMERICAL-COMPUTABILITY-FAILED`; the recomputation check is
  `not_run` with the blocking codes.

A computability failure is a property of the data under the supported
method. No method change, approximation, or fallback is applied, and no
whole-record judgment is implied.

## Numerical underflow (0.2.1 successor)

<a id="NRS-VERIFY-0021"></a>
**NRS-VERIFY-0021 - P-value underflow is not exact probability zero** (stability: CORE, status: active)
When finite test-statistic and positive degrees-of-freedom inputs produce a
numerical p-value of zero, the verifier MUST classify the result as numerical
underflow and MUST NOT assert zero as the exact tail probability.

Under bundle `urn:nomue:bundle:itgc-guarantee:0.2.1-draft.1`, computability
fails with `NRS-P-VALUE-UNDERFLOW` and recomputation is `not_run`.

## Intermediate overflow of the tail evaluation (S1 close)

<a id="NRS-VERIFY-0026"></a>
**NRS-VERIFY-0026 - Squared-test-statistic overflow is an explicit refusal, never a silent endpoint** (stability: EXPERIMENTAL, status: active)
The adopted tail-evaluation path forms the squared test statistic as an
intermediate quantity (the regularized-incomplete-beta argument is
`df / (df + t^2)`). When that intermediate is not representable as a finite
binary64 value, an implementation MUST refuse to evaluate the tail
probability and MUST report the condition as an explicit computability
failure carrying `NRS-T-SQUARED-OVERFLOW`; it MUST NOT return an endpoint
value (`0` or `1`) as if it were the evaluated probability. This is a
safety requirement about failure visibility, not a precision improvement:
no alternative evaluation path (log-domain or otherwise) is required or
applied - the log-first kernel and arbitrary-precision-runtime options
were rejected under discussion item S1 (see the S1-close decision record
in `governance/decisions/`).

Informative note: this condition is disjoint from the algorithm floor
mapped in `evidence/development/oracle-floor-map/` - the floor zeroes the
result while every intermediate is still finite (at `|t|` around `1e77`),
whereas this clause covers `|t|` beyond about `1.34e154`, where `t^2`
itself leaves the binary64 range and the evaluation would otherwise
collapse without any indication.
