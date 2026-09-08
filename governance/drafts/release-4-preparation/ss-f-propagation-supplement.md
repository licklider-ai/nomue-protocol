# Exploratory propagation from coefficients to SS and F

Status: exploratory record independently reviewed at `4cf3e12a`; subsequent prose repairs await close review. Date: 2026-09-08.
The original JSON status is retained as historical author-run metadata.
This disposable probe extends the accepted QR investigation; it does not reopen
that supplement's acceptance or select an implementation.

## Reproduction and mathematical target

Run `python probes/ss-f-propagation.py` from this directory using Python 3.12.13
and NumPy 2.3.5. The recorded environment, script SHA-256 and canonical corpus
SHA-256 are in [the result](probes/ss-f-propagation-result.json).
The [script](probes/ss-f-propagation.py) is the executable graph specification.
Threading was not pinned. BLAS-dependent values are not portable promises.

The corpus has replicate counts 2 through 16, offsets with exponents 0, 20, 40,
perturbations with negative exponents 0, 20, 40, 52, 53, 54, 60, and three effect
axes: 945 datasets. The exact target is computed from the actual binary64 inputs,
not the ideal pre-conversion values. Fraction arithmetic computes cell means,
coded coefficients, effect SS = 4*n*beta squared, within-cell SSE, residual
degrees of freedom 4*(n-1), and F = SS/(SSE/df).
Exact total-minus-fitted and total-partition identities are asserted. These are
algebraic crosschecks within one author context, not an independent oracle review
and not a proof of the F sampling distribution.

Three explicit floating graphs are compared. `builtin_cell` uses Python builtin
sum for means and contrast coefficients and within-cell residuals. `qr` uses
NumPy reduced QR followed by solve and response-minus-fitted residuals.
`centered_qr` first subtracts the initial observation and uses that response for
both coefficients and residuals. All graphs square coefficients in the specified
binary64 order and aggregate squared residuals using builtin sum. Python 3.12
sum behavior matters. Centering subtraction is not assumed exact.
This extended graph and its digest are distinct from the earlier coefficient
probe. The digest serializes all exact and observed rows as specified in code.

## Observations on this run

A projected match means bitwise equality to Python's binary64 conversion of the
exact rational target. It is stricter than a tolerance test and differs from
exact-real equality. Counts alone are not measures of statistical importance;
the structured corpus contains many exact zero contrasts.

| Graph        | Projected SS matches / 2835 | Projected SSE matches / 945 | Projected F matches / 2835 | Nonzero F where exact F is zero | Zero F where projected target is nonzero |
| ------------ | --------------------------- | --------------------------- | -------------------------- | ------------------------------- | ---------------------------------------- |
| builtin_cell | 2691                        | 945                         | 2637                       | 0                               | 105                                      |
| qr           | 314                         | 648                         | 303                        | 2134                            | 9                                        |
| centered_qr  | 170                         | 908                         | 162                        | 2281                            | 3                                        |

The independent review at `c8ce35c` (Section 5.4-5.5 of
[the numerical review](../../../review-inputs/r4-public-discussion-preparation/REVIEW-RESULT.md))
adds the following context. Of 2835 exact F targets, 2415 are zero and 420
are nonzero. Among 945 selected-axis targets, 525 are zero. Thus the spurious
nonzero counts are 0/2415, 2134/2415 and 2281/2415, respectively.

| Graph        | Largest spurious F at exact zero (approximate) | Largest relative SSE error (approximate) | Largest exact F returned as zero (approximate) |
| ------------ | ---------------------------------------------- | ---------------------------------------- | ---------------------------------------------- |
| builtin_cell | 0                                              | 8.9e-17                                  | 2.0e-31                                        |
| qr           | 1.9e-6                                         | 1.25e-6                                  | 3.2e-31                                        |
| centered_qr  | 7.3e-30                                        | 2.2e-16                                  | 4.2e-31                                        |

These magnitudes are attributed to the reviewer's independently derived analysis,
not newly measured by this prose repair. All 105/9/3 lost targets are below
5e-31 and arise from asymmetric input rounding; their counts do not establish
loss of a practically meaningful effect. The uncentered QR residual error is
largest at offset 2^40. These observations do not establish a general significance
threshold or a guarantee outside this corpus.

The interpreter is part of the operation definition. The builtin sum is used
at three sites: `builtin_cell` cell means, `builtin_cell` contrast coefficients,
and the squared-residual aggregation of all three routes.
The reviewer observed 10 spurious nonzero F values for builtin_cell on CPython
3.11.15 with the same NumPy 2.3.5, versus zero on CPython 3.12.3, and SSE counts
changed for every route. NumPy 2.5.3 with OpenBLAS 0.3.34 also changed QR rows and
both witnesses, while the builtin_cell rows remained unchanged. Neither route
has a cross-environment bitwise promise.

All evaluated SS, SSE and F values in the 945-case corpus were finite. This
corpus does not establish safety for larger magnitudes or other datasets.
For n=2, offset exponent 0, perturbation exponent 54 and axis 1, exact selected
F is zero; QR returns `0x1.fffffffffffe0p-219`, while centered QR returns
`0x1.0000000000001p-319`. These tiny nonzero examples are not evidence of a
practically significant false rejection.

Three additional datasets have exactly zero within-cell residuals. The probe
leaves their exact F ratios undefined instead of treating positive divided by
zero as an admissible finite inferential result. Uncentered QR emits three
finite F values for each diagnostic because the computed SSE is spuriously
positive. Centered QR does so for the two nonconstant datasets. The constant
7-valued dataset produces uncentered SSE `0x1.2000000000000p-95`.
This is concrete motivation to investigate a residual-domain decision; it does
not choose a threshold, refusal code, or supported execution policy. Builtin
cell arithmetic produces NaN or infinity here, which is also not a completed
user-facing policy.

## Limits and next investigation

The cell graph loses 105 nonzero projected F targets, all below 5e-31 in the
reviewed analysis. Its higher bit-match count is not a blanket recommendation. QR's stability in other
settings is not refuted by cancellation-sensitive exact-zero examples.
No worst-case error bound, tolerance, rank policy, p-value, confidence interval,
resource maximum, or cross-platform guarantee is supplied. Factor/order
invariance is not re-tested in this increment. The diagnostic set is deliberately
small. Independent reproduction, independently derived expectations and review
of graph-to-claim correspondence remain required before promotion.

Authoring and execution used OpenAI Codex in the maintainer task context;
independence is not claimed. The independent review is preserved separately; this author-side prose repair
is not its own close review. This evidence is informative and does not change
normative contracts or close programme `INPUT_INCOMPLETE`.
