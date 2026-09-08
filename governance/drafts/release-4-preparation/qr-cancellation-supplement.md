# Release 4 QR and cancellation supplement

Status: informative exploratory research; not adopted; successor repair review pending.
Date: 2026-09-08. Prepared by the OpenAI-assisted research author in the current
authoring context. This is not a separate-investigator review or a completion of
the numerical commission. No production implementation is introduced.

## Scope and exact inputs

Base main: `f39100161cb45de15767bdb19ed54aba9489b41a`.
The bounded question extends the unexecuted generic QR and near-zero contrast
families identified in numerical PR 190 at
`5962cc2def5b1aca7e30d219f12a9a6486ca7b11`. Semantic input: PR 181 at
`a2687f10719b399dafb511999cc1ef5b406a0c02`. Prior research review: PR 184 at
`1d493622af970145925f35c8d2cd95f6cbf03cc7`.
The prior reports and their dispositions are preserved.

Only complete balanced replicated two-by-two cell algebra is probed. Cell order
is 00, 01, 10, 11. The design columns are intercept, A, B, AB with signs
`A=(-1,-1,1,1)`, `B=(-1,1,-1,1)`, `AB=(1,-1,-1,1)`.
For N observations the exact design satisfies `X'X=N I`; effect sums of squares
are `N*beta[j]**2` for j=1,2,3. Main contrasts are twice their coefficients;
the difference-in-differences interaction is four times its coefficient.
Residual degrees of freedom are N-4. This algebra does not establish sampling
distributions, confidence coverage, causal meaning, or multiplicity control.

## Source inspection

The following official HTML texts were directly inspected on 2026-09-08 through
web text extraction. No immutable upstream revision or raw-file hash was obtained;
these are supporting documentation, not closure of original-source access holds.

- [NIST, two-way ANOVA](https://itl.nist.gov/div898/handbook/prc/section4/prc437.htm):
  balanced fixed-effects sums-of-squares partition and residual degrees of freedom.
- [LAPACK Users' Guide, linear least squares](https://www.netlib.org/lapack/lug/node27.html):
  full-rank QR/LQ and separate rank-deficient driver families. This probe explicitly
  constructs QR and uses a general linear solver on its R matrix; it does not
  claim to execute DGELS or a specialized triangular solver.

The exact coefficient route below derives from orthogonality using Python
Fractions. The direct floating route uses Python's builtin `sum()` for both cell
means and the contrast. On the disclosed CPython 3.12 interpreter its float sums
use compensated accumulation, not a naive left-to-right addition loop. The QR
routes call `np.linalg.qr` and then `np.linalg.solve` on the computed R matrix.
They do not constitute two independent statistical software systems for unbalanced
hypothesis semantics, and do not close the prior S6 hold.

## Reproducible probe

Extract this document's Python fence to a temporary file and run with Python and
NumPy. No Protocol reference kernel is used as an oracle. All fractions used as
truth are reconstructed from admitted binary64 inputs, not intended decimal data.
The designed rational inputs are retained separately to expose input projection.

```python
from fractions import Fraction as Q
import hashlib
import json
import platform
import numpy as np

signs = [(1, -1, -1, 1), (1, -1, 1, -1),
         (1, 1, -1, -1), (1, 1, 1, 1)]
rows = []
for n in range(2, 17):
    for exponent in (0, 20, 40):
        offset = Q(2)**exponent
        for k in (0, 20, 40, 52, 53, 54, 60):
            delta = Q(2)**(-k)
            for axis in (1, 2, 3):
                intended = [offset + s[axis]*delta + Q(2*r-(n-1), 4)
                            for s in signs for r in range(n)]
                y = np.array([float(v) for v in intended], dtype=np.float64)
                exact = [Q(float(v)) for v in y]
                X = np.array([s for s in signs for _ in range(n)], dtype=float)
                N = 4*n
                beta = [sum(exact[i]*int(X[i,j]) for i in range(N))/N
                        for j in range(4)]
                assert np.array_equal(X.T @ X, N*np.eye(4))
                means = [sum(exact[c*n:(c+1)*n])/n for c in range(4)]
                sse = sum((exact[i]-means[i//n])**2 for i in range(N))
                total = sum((v-beta[0])**2 for v in exact)
                assert total == sse + sum(N*b*b for b in beta[1:])
                m = [sum(float(v) for v in y[c*n:(c+1)*n])/n
                     for c in range(4)]
                direct = [sum(m[c]*signs[c][j] for c in range(4))/4
                          for j in range(4)]
                q, r = np.linalg.qr(X, mode='reduced')
                qr = np.linalg.solve(r, q.T @ y)
                centered = y-y[0]
                qr_centered = np.linalg.solve(r, q.T @ centered)
                truth = beta[axis]
                rows.append(dict(n=n, offset_exponent=exponent, k=k, axis=axis,
                    intended=str(delta), truth=str(truth),
                    input_loss=str(abs(truth-delta)),
                    direct=float(direct[axis]).hex(), qr=float(qr[axis]).hex(),
                    centered_qr=float(qr_centered[axis]).hex(),
                    errors=[str(abs(Q(float(v))-truth)) for v in
                            (direct[axis], qr[axis], qr_centered[axis])]))

payload = json.dumps(rows, sort_keys=True, separators=(',', ':')).encode()
print('python', platform.python_version(), 'numpy', np.__version__,
      'machine', platform.machine())
print('cases', len(rows), 'corpus_sha256', hashlib.sha256(payload).hexdigest())
print('input_changed', sum(Q(r['input_loss']) != 0 for r in rows))
print('exact_zero_after_input', sum(Q(r['truth']) == 0 for r in rows))
for j, name in enumerate(('direct', 'qr', 'centered_qr')):
    print(name, 'nonzero_error', sum(Q(r['errors'][j]) != 0 for r in rows),
          'largest_absolute_error', max(Q(r['errors'][j]) for r in rows),
          'false_nonzero', sum(Q(r['truth']) == 0 and
                              float.fromhex(r[name]) != 0 for r in rows))
for target in ((2, 40, 20, 1), (3, 0, 40, 1)):
    print('witness', next(r for r in rows if
          (r['n'], r['offset_exponent'], r['k'], r['axis']) == target))
```

## Observed transcript

Executed on Linux x86_64, Python 3.12.13, NumPy 2.3.5. NumPy build information
reports OpenBLAS 0.3.30, USE64BITINT, DYNAMIC_ARCH, NO_AFFINITY, Haswell,
MAX_THREADS=64 for BLAS and LAPACK. This is environment disclosure, not an
execution allowlist or proof of bitwise portability. Thread count was not pinned.

All 945 exact orthogonality and sums-of-squares partition assertions passed.
The output corpus SHA-256 was
`2371c1ef31a25816e09d08324718dd87329c5b6aa93076fd17ae772373fff55c`.
Input projection changed 666 intended coefficients; 525 became exact zero.

| Route                          | Nonzero coefficient error | Largest absolute error         | Nonzero result when exact coefficient is zero |
| ------------------------------ | ------------------------: | ------------------------------ | --------------------------------------------: |
| CPython builtin-sum cell means |                       144 | 3/45035996273704960            |                                             0 |
| Uncentered QR                  |                       850 | 2340808394435/9007199254740992 |                                           462 |
| First-observation-centered QR  |                       885 | 1/1125899906842624             |                                           501 |

Counts concern only the chosen effect axis in each case, not every coefficient or
all floating operations. A tiny nonzero residual counts as an error; this table is
not a statistical significance comparison or an overall ranking of algorithms.

Two reproducible witnesses:

- `n=2, offset=2**40, delta=2**-20, axis=A`: admitted-input exact coefficient
  zero, direct result zero, QR `0x1.6a09e667f3bcdp-14`, centered QR
  `-0x1.6a09e667f3bcdp-163`. Input projection already removed the intended
  effect, while QR introduced a nonzero computed coefficient.
- `n=3, offset=1, delta=2**-40, axis=A`: input coefficient preserved exactly,
  direct `0x1.0000000000000p-40`, QR `0x1.00002f0aa6583p-40`, centered QR
  `0x1.00027e3f8f0a3p-40`. Centering did not improve this coefficient's error.

## Review intake and successor corrections

The predecessor at `014824e482d0dccac696053176f834b0f5e45fb6`, blob
`94cb0e0b86df2451b531660b913f8dd504f1ffed`, received the bounded content GO
in [PR 208's fixed review](https://github.com/licklider-ai/nomue-protocol/blob/253fe14b801b861a23714e7491b6bb9e19951b2f/review-inputs/r4-qr-cancellation-supplement/REVIEW-RESULT.md).
The review reports 0 BLOCKER, 1 SHOULD-FIX, 7 NICE-TO-HAVE, and
SOURCE_ACCESS_INCOMPLETE. Its stated independence is model/provider and work-context
independence; it does not claim independent human investigators. This author-side
intake preserves those limits and makes no new steward determination.
The later PR 205 head `42eb498473bdf6d318ac9f1180f71b08cc2e3422` added only
the original review prompt, with the same supplement blob. That prompt remains
historical; this successor requires the close-review prompt.

SF-1 is repaired by relabeling and explaining the direct route, preserving the
Python fence and original transcript. The interpreter is part of the operation
definition. [Python 3.12's official documentation](https://docs.python.org/3.12/library/functions.html#sum)
records a changed float-summation algorithm. PR 208 identifies it as Neumaier
compensation and reproduces the original digest with CPython 3.12.11 under both
NumPy 2.3.5 and 2.4.6. With CPython 3.11.15 it instead reports corpus SHA-256
`ca4947956e5b97a25f96d8ac62a572726a187d6095133ea9409f9f6457f5be7a`
and direct maximum error `1/7318349394477056`. The counts and both witnesses
remain unchanged in those runs. The observed difference is in the Python direct
route, not the QR rows. Agreement across those builds does not guarantee agreement
on every BLAS build, interpreter, or later Python version.

Optional findings are recorded below as observations of PR 208, Sections 6–8,
not new author experiments or universal bounds:

| Finding | Successor treatment                                                                                                                                                                                                                                                                                                                                                                               |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| N-1     | Name the actual calls: NumPy documents `qr` as using `dgeqrf`/`dorgqr` for real double inputs and `solve` as using `gesv`. The latter is a general LU-based solve on R, not `dtrtrs`.                                                                                                                                                                                                             |
| N-2     | For exact-zero selected coefficients the reviewer reports maximum spurious magnitudes about 2.49e-4 uncentered and 5.9e-16 centered; the direct count is zero. Across the two non-selected axes, QR is nonzero in 1,672/1,890 instances and centered QR in 1,780/1,890. The review's naive-loop direct count of 10 is a different graph and is not substituted for this report's builtin-sum row. |
| N-3     | The review finds inexact centering in 135/945 cases, affecting 1,440 observations. Exact truth continues to come from the original admitted inputs.                                                                                                                                                                                                                                               |
| N-4     | This probe computes floating coefficients only. It computes no binary64 sum of squares, mean square, F statistic, or tail probability.                                                                                                                                                                                                                                                            |
| N-5     | The original reviewed input and prompt-only successor are distinguished above. The repaired input will be pinned separately for close review.                                                                                                                                                                                                                                                     |
| N-6     | For the review's specified transformations and comparisons, factor reversal preserves QR bits, factor exchange changes them in 926/945 cases, and in-cell permutation in 890/945. These finite probes do not establish a general invariance theorem.                                                                                                                                              |
| N-7     | The review's default-thread and one-thread runs have matching digests within each tested interpreter. This is recorded as an observation; no universal threading threshold or dispensability of thread control is established.                                                                                                                                                                    |

The author re-inspected the NIST and LAPACK HTML texts on 2026-09-08 through
web extraction: the balanced partition, residual N-ab degrees of freedom, and
full-rank versus rank-deficient solver-family descriptions are consistent with
the supplement. The author also inspected the linked Python documentation and
the [NumPy QR](https://numpy.org/doc/2.3/reference/generated/numpy.linalg.qr.html)
and [solve](https://numpy.org/doc/2.3/reference/generated/numpy.linalg.solve.html)
documentation, cross-checking the routine names against installed NumPy 2.3.5
docstrings. These are author-side inspections, with no raw-source archive or
immutable upstream hash, so PR 208's independent source-access gap remains open.

The unchanged Python fence SHA-256 is
`50a014324de141b32c284c5e5cbcc3cca9ea825ab6f8c7fe9e76d320b7c1bbfe`.
SF-1 is author-repaired, pending independent close review. None of the optional
recordings closes a programme hold or extends the predecessor GO to this successor.

## Author-side validation

The embedded probe was rerun after Markdown formatting and reproduced the same
945-case corpus hash. Markdown lint and TypeScript type checking passed.
Direct `node --import tsx tooling/src/validate.ts` passed all repository validators.
The `pnpm validate` wrapper first failed because the environment denied the tsx
CLI's IPC socket; invoking the same validator via Node's import loader succeeded.
No authoritative artifact or production code changed, so the full test suite was
not run. These are author-side checks, not independent numerical review.

## Interpretation and remaining work

The corpus deliberately varies replication, common translation, small nonzero
coefficients, and each of the three effect axes. It is a finite diagnostic family;
16 replications is not an admitted maximum. An exact zero after input projection
is distinct from a nonzero exact coefficient lost by later arithmetic. Relative
error at an exact zero is undefined, so the transcript reports absolute error and
spurious nonzero counts instead.

Centering is a compared graph, not a selected repair: subtraction itself can round,
and this corpus cannot justify a portable bound. QR can have small normwise error
while an individual near-zero effect has a large relative error. Numerical rank,
missing cells, unequal weighting, overflow, underflow of squared effects, F tails,
near-critical decisions, intervals, permutations, and deployment admission require
their own probes and proofs. No tolerance is inferred from the observed maximum.

Next reviewable work is independent close review of this prose repair and the
source-access supplement, then extension to squared-effect/F projection and rank-deficient designs
under separately settled semantics. The earlier programme INPUT_INCOMPLETE and
source-access holds remain open. Release 3 scope and numbering are unchanged.
