# Power-of-two scaling: bounded exploration

Status: original exploration received bounded GO in PR 235 at `431ac4e6`;
this successor clarification awaits independent close review. Date: 2026-09-09.
Baseline: accepted preparation at main `fa82ccc174f33c4e68658a6b279034fd8399e055`.
The prior programme acceptance authorizes continued research, not this algorithm.

The [script](probes/power-scale-exploration.py) compares the unchanged three
SS/F graphs on six fixtures, each with raw inputs and one scaling transformation.
It chooses exponent `-frexp(max(abs(y)))[1]` and applies NumPy ldexp to every
input. This makes the largest absolute transformed input lie in [0.5,1).
There are twelve input/transform rows and thirty-six graph evaluations.
All six fixtures have two observations per cell. This is a finite experiment,
not a supported-domain study or a ranking of general algorithms.

## Results

| Fixture                                                               | Observation                                                                                                                                                                                                                                                                |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Original fixture at scales 1, 2^-600, 2^600                           | Scaling loses no input information and restores the extreme-scale floating F outputs to the corresponding unit-scale graph F outputs; direct F is exactly 100,36,4, while QR retains its recorded small rounding differences                                               |
| Original fixture plus common offset 2^40                              | Scaling preserves inputs but leaves each graph's F outputs bitwise unchanged; the uncentered QR cancellation error is not repaired by this normalization                                                                                                                   |
| Mixed magnitudes, including the smallest positive subnormal and 2^600 | Scaling erases the subnormal input at zero-based index 1 and changes the exact F target (relative magnitude approximately 2^-1674; both targets project to +inf). QR returns finite values after scaling, illustrating why finiteness alone is not evidence of correctness |
| Exact zero-residual control                                           | Scaling preserves inputs but leaves the old behavior: direct F is infinite and QR reports finite F from spurious positive residuals. Scaling does not resolve the zero-residual policy                                                                                     |

The mixed fixture is `[0, 2^-1074, 1, 1.5, 2, 2.5, 2^600, 2^600]`.
Its exact residual is positive. Unlike the uniform fixtures, its exact F values
are not constrained to be representable in binary64. Its finite QR output is
not a recovery of the original exact target. The transcript records full exact
F rationals and the input hex values to make this distinction inspectable.

## Target-detail successor

[The target-detail script](probes/power-scale-target-detail.py) and
[its transcript](probes/power-scale-target-detail-result.json) add the actual
post-transform exact F, before/after projections, exact relative change, and
post-transform SS/SSE targets and projections. The original script and transcript
remain unchanged. Zero-residual rows now use null for F preservation because F
is undefined there; equality of two missing values is not an invariance result.

For the mixed fixture, relative F changes are approximately +2^-1674, +2^-1674
and -2^-1674, not exactly those powers. Both original and transformed exact F
project to positive infinity. This witnesses conversion loss, not a materially
different binary64 F target. The transformed exact SSE is 2^-1204 and projects
to zero. Exact SS values differ slightly from 1/8 and each rounds to 1/8.

The scaled QR routes instead compute SSE `0x1.1p-106`, dominated by rounding
residuals at the two 0.5 observations, and F `0x1.e1e1e1e1e1e22p+104`.
These finite F values are about 2^1098 smaller than the exact targets, whose
projections are infinite. This is spurious positive residual from floating QR,
also seen in the zero-residual diagnostics; it is not evidence that the tiny
input-conversion loss caused the large F discrepancy. In these two mixed rows,
`builtin_cell` matches the exact targets' SS/SSE/F projections. This is not a
ranking or supported-domain statement.

Power-of-two scaling commutes with rounding for suitably scaled elementary
operations when the relevant results remain in range and the operation path is
unchanged. The fixed-design QR factorization does not depend on the response.
This explains the observed uniform recovery and offset invariance; these rows
are not independent evidence of improved relative accuracy. A universal claim
covering every BLAS/solve implementation would additionally need a fixed
operation graph and proof about its branches and intermediates. This experiment
does not provide that implementation-wide guarantee. Only F outputs recover the
unit-scale outputs: normalized uniform SS and SSE are 2^-8 times their unit-scale
values.

See [the repair record](power-scale-review-repair.md) for the returned review,
qualifications and the close-review request.

## Reproduction and limits

Run from the repository root:

```sh
python governance/drafts/release-4-preparation/probes/power-scale-exploration.py
```

[The transcript](probes/power-scale-exploration-result.json) records CPython
3.12.14, NumPy 2.3.5, NumPy build configuration, source/script hashes and unpinned
thread settings. Loading the historical probe reproduces its original corpus
digest `558b6e65da273bf836204f7d0f5b4bae08cfd85918a23374a475197c2e851ca3`.
The original probe and JSON remain unchanged.

This script reuses the author's exact routine and graph implementations. It is
not an independent oracle or a new independent review. Exact rationals are formed
from the actual input floats; transformed floats are compared with exact scaled
inputs before interpreting output changes. Exact F invariance is asserted for
lossless transformations, and the mixed fixture's lost index is asserted.

The evidence supports investigating scaling but rejects a blanket assumption that
power-of-two normalization is lossless or sufficient. It does not choose admission
bounds, centering order, output representation, tolerances or refusal codes, and
does not establish F-distribution calibration. Source holds and opening conditions
remain open. Further mixed-scale and cancellation analysis remains necessary.

## Independent review request

Resolve this increment once and record its exact commit/tree and three file blobs.
Reconstruct the six fixtures with independent exact arithmetic, inspect conversion
loss separately from computation error, reproduce all twelve rows, and verify the
uniform-scale, offset, mixed-scale and zero-residual statements above. Check that
the mixed fixture's true F projection is not confused with finite QR output.
Preserve historical evidence. Return a bounded review and concrete corrections;
do not adopt scaling or close programme conditions from these witnesses. The
review uses a separate model/context under the existing research gate.

Prepared with OpenAI Codex assistance in the existing authoring context.

## Residual-location correction

The [close review](../../../review-inputs/r4-power-scale-exploration-close/REVIEW-RESULT.md)
at `3332083e62effda3af823dc47b8d56e15cbc7fd3` reports SF-1 CLOSED and SF-2
CLOSED on substance, with C-1 correcting the residual location. The author
reproduced both QR residual vectors on CPython 3.12.14 / NumPy 2.3.5:
`[0x1.8p-55, 0x1.8p-55, 0x1p-54, 0x1p-54, 0x1.8p-55, 0x1.8p-55, 0, 0]`.
Their squared sum is `17 * 2^-110`, matching `0x1.1p-106`. The explanation
above now locates these residuals correctly. No script or transcript changed.
The original review's mistaken location is preserved and superseded by its
reviewer's close-review correction, not silently rewritten.

For readable inspection of the long mixed-row relative-change rationals, the
signs for A, B and AB are +, + and -, respectively; each decimal log2 absolute
magnitude rounds to -1674.000000000 at nine decimal places. These display
approximations were computed from the exact fractions with 60-digit Decimal
logarithms; the exact transcript remains the reference and the changes are not
exact powers of two. This addresses C-N2 in prose without changing the reviewed
transcript. C-N1's magnitude qualification is also added directly to the table.

The preserved close-review blob is `78a99a0f2f9e3cffd8035e2e9061a47337f77dfa`.
Its same-session review boundary remains disclosed. This is an author-side C-1
repair, not a new independent close verdict, steward acceptance or merge decision.
