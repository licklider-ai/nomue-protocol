# Power-of-two scaling: bounded exploration

Status: author exploratory evidence, 2026-09-09; independent review pending.
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

| Fixture                                                               | Observation                                                                                                                                                                                                                |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Original fixture at scales 1, 2^-600, 2^600                           | Scaling loses no input information and restores the extreme-scale floating F outputs to the corresponding unit-scale graph outputs; direct F is exactly 100,36,4, while QR retains its recorded small rounding differences |
| Original fixture plus common offset 2^40                              | Scaling preserves inputs but leaves each graph's F outputs bitwise unchanged; the uncentered QR cancellation error is not repaired by this normalization                                                                   |
| Mixed magnitudes, including the smallest positive subnormal and 2^600 | Scaling erases the subnormal input at zero-based index 1 and changes the exact F target. QR returns finite values after scaling, illustrating why finiteness alone is not evidence of correctness                          |
| Exact zero-residual control                                           | Scaling preserves inputs but leaves the old behavior: direct F is infinite and QR reports finite F from spurious positive residuals. Scaling does not resolve the zero-residual policy                                     |

The mixed fixture is `[0, 2^-1074, 1, 1.5, 2, 2.5, 2^600, 2^600]`.
Its exact residual is positive. Unlike the uniform fixtures, its exact F values
are not constrained to be representable in binary64. Its finite QR output is
not a recovery of the original exact target. The transcript records full exact
F rationals and the input hex values to make this distinction inspectable.

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
