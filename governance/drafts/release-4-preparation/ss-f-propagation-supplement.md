# Exploratory propagation from coefficients to SS and F

Status: `AUTHOR_EXPLORATORY_NOT_REVIEWED`. Date: 2026-09-08.
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

The cell graph loses 105 nonzero projected F targets in this corpus, so its
higher bit-match count is not a blanket recommendation. QR's stability in other
settings is not refuted by cancellation-sensitive exact-zero examples.
No worst-case error bound, tolerance, rank policy, p-value, confidence interval,
resource maximum, or cross-platform guarantee is supplied. Factor/order
invariance is not re-tested in this increment. The diagnostic set is deliberately
small. Independent reproduction, independently derived expectations and review
of graph-to-claim correspondence remain required before promotion.

Authoring and execution used OpenAI Codex in the maintainer task context;
independence is not claimed. This evidence is informative and does not change
normative contracts or close programme `INPUT_INCOMPLETE`.
