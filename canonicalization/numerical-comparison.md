# Numerical Comparison Policy

**Status: Normative.** This document binds the Phase 1 numerical comparison
policy used when a recomputed result is compared with a declared result.

## Tolerance authority

<a id="NRS-CANON-0006"></a>
**NRS-CANON-0006 - Tolerance authority** (stability: CORE, status: active)
Numerical comparison tolerance MUST be controlled by the applicable
public-check version and MUST NOT be widened by an individual Record.

Informative note: a Record carries no tolerance fields at all. The tolerances
below belong to public check
`urn:nomue:check:welch-recompute:0.1.0-draft.1` and change only through a new
check version with a recorded rationale and test vectors.

## Comparison formula

A recomputed value `actual` matches a declared value `expected` when:

```text
abs(actual - expected)
  <=
max(
  absolute_tolerance,
  relative_tolerance * max(abs(actual), abs(expected))
)
```

## Phase 1 tolerances

| Quantity                        | Comparison                         |
| ------------------------------- | ---------------------------------- |
| Integer counts (`n`)            | exact equality                     |
| `group_id` and other references | exact string equality              |
| mean                            | absolute `1e-12`, relative `1e-12` |
| sample variance                 | absolute `1e-12`, relative `1e-12` |
| mean difference                 | absolute `1e-12`, relative `1e-12` |
| t statistic                     | absolute `1e-12`, relative `1e-12` |
| degrees of freedom              | absolute `1e-12`, relative `1e-12` |
| p-value                         | absolute `1e-12`, relative `1e-10` |

## Phase 2A additions (check welch-recompute 0.2.0-draft.1)

The Phase 2A check version extends the compared quantities; the same
comparison formula applies, and the authority stays with the check version:

| Quantity                     | Comparison                         |
| ---------------------------- | ---------------------------------- |
| effect estimate (`estimate`) | absolute `1e-12`, relative `1e-12` |
| standard error               | absolute `1e-12`, relative `1e-12` |
| confidence-interval lower    | absolute `1e-12`, relative `1e-10` |
| confidence-interval upper    | absolute `1e-12`, relative `1e-10` |
| confidence level             | exact equality (0.95)              |
| estimand kind                | exact equality (schema constant)   |
| CI method identifier         | exact string equality              |

Declared endpoints additionally satisfy lower <= upper; reversed endpoints
fail with `NRS-CONFIDENCE-INTERVAL-ORDER-INVALID`. Machine-readable values
live in [../registries/public-checks.yaml](../registries/public-checks.yaml);
a change is a new check version with rationale, test vectors, and
independent oracle comparison, and a Record can never widen a tolerance.

## Mismatch reporting

A quantity outside tolerance fails the comparison; the check completes with
outcome `fail` and reason code `NRS-DECLARED-RESULT-MISMATCH`, and the
evidence object names each mismatched quantity with its declared and
recomputed values. Exact-equality fields that differ are reported the same
way.

## Phase 2A 0.2.1 successor (check welch-recompute 0.2.1-draft.1)

<a id="NRS-VERIFY-0020"></a>
**NRS-VERIFY-0020 - Positive p-value and zero are distinct** (stability: CORE, status: active)
A numerical comparison MUST NOT treat a positive p-value and zero as
equivalent.

The successor check version `urn:nomue:check:welch-recompute:0.2.1-draft.1`
uses zero absolute tolerance and relative `1e-10` only for `p_value`:

| Quantity | Comparison                                                    |
| -------- | ------------------------------------------------------------- |
| p-value  | absolute `0`, relative `1e-10`; positive and zero never match |

All other compared quantities retain the 0.2.0-draft.1 tolerances. A change
to these semantics requires a new public-check version (NRS-VERSION-0009).

## Decimal oracle reference layer (S1 close, EXPERIMENTAL)

This layer formalizes the decimal-string oracle records already captured
under `evidence/development/` (the `p_value_mpmath_str` fields) as a
reference layer for oracle-vs-runtime comparison. It changes nothing about
the public checks or the conformance suite's current behavior: no public
check consumes a decimal oracle reference, and none is added here.

<a id="NRS-CANON-0012"></a>
**NRS-CANON-0012 - Decimal oracle reference record** (stability: EXPERIMENTAL, status: active)
A decimal oracle reference MUST be stored as a decimal string in scientific
or plain decimal notation (never as a binary64 number, whose conversion
would destroy exactly the digits the reference exists to preserve), and the
artifact carrying it MUST declare the oracle's algorithm, implementation,
implementation version, and working precision in significant digits. The
reference layer exists precisely because a true value can lie outside
binary64's representable range or below the algorithm floor of a binary64
evaluation path while remaining exactly representable as a short decimal
string.

<a id="NRS-CANON-0013"></a>
**NRS-CANON-0013 - Comparison against a decimal oracle reference** (stability: EXPERIMENTAL, status: active)
A comparison of a runtime binary64 value against a decimal oracle reference
MUST first convert the reference decimal string to binary64 by round-to-
nearest (ties-to-even), and then require the runtime value to lie within
the declared tolerance of that converted value. When the converted value is
zero because the reference magnitude is below the smallest positive
binary64 subnormal, the comparison is outside this rule's domain and MUST
be reported as not comparable rather than as agreement with zero.

Informative note: the current captures satisfying this layer are the
mpmath records in `evidence/development/phase-1/oracle/`,
`evidence/development/phase-2a/oracle/`,
`evidence/development/oracle-tail-cases/`, and
`evidence/development/oracle-floor-map/` (algorithm: regularized incomplete
beta; implementation: mpmath 1.4.1; precision: 60 decimal digits; string
precision: 30 significant digits).
