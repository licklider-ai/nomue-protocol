"""Bounded author diagnostics; no production method or public tolerance.

Run: python3 review-inputs/r3-sra-supplied-primary/check-sra.py
Rational algebra except explicitly labelled illustrative tail computations.
"""

from fractions import Fraction as F
from itertools import product
from math import isclose, log

import scipy
from scipy.stats import chi2, f


def quantities(n, means, variances):
    n, x, v = [list(map(F, a)) for a in (n, means, variances)]
    g, total = len(n), sum(n)
    weights = [a / b for a, b in zip(n, v)]
    u = sum(weights)
    center = sum(a * b for a, b in zip(weights, x)) / u
    q = sum(a * (b - center) ** 2 for a, b in zip(weights, x))
    s = sum((1 - w / u) ** 2 / (ni - 1) for w, ni in zip(weights, n))
    w_stat = q / (g - 1) / (1 + F(2 * (g - 2), g * g - 1) * s)
    w_df = F(g * g - 1, 3) / s
    grand = sum(a * b for a, b in zip(n, x)) / total
    between = sum(a * (b - grand) ** 2 for a, b in zip(n, x))
    parts = [(1 - a / total) * b for a, b in zip(n, v)]
    denominator = sum(parts)
    bf = between / denominator
    bf_df = denominator ** 2 / sum(a * a / (ni - 1) for a, ni in zip(parts, n))
    classic = between / (g - 1) / (sum((a - 1) * b for a, b in zip(n, v)) / (total - g))
    return q, s, w_stat, w_df, bf, bf_df, classic


def main():
    count = 0
    # Independent closed forms for the two-group reduction.
    for n1, n2, v1, v2 in product([3, 7, 11], [4, 8], [1, 4], [2, 9]):
        out = quantities([n1, n2], [0, 2], [v1, v2])
        a, b = F(v1, n1), F(v2, n2)
        t_squared = F(4) / (a + b)
        df = (a + b) ** 2 / (a * a / (n1 - 1) + b * b / (n2 - 1))
        assert out[0] == out[2] == out[4] == t_squared
        assert out[3] == out[5] == df
        count += 1
    print(f'two-group Welch / modified-F reductions: {count} cases PASS')

    for g in range(2, 7):
        for q in [F(1), F(3), F(8)]:
            s = F(2, 15)
            r, p, zeta = g - 1, F(g - 1, 2), q / 2
            # James (40): q + 2 h1; (41) first-order term; (43).
            h1 = F(1, 4) * (3 * zeta ** 2 / (p * (p + 1)) + zeta / p) * s
            from_41 = q + F(1, 2) * (3 * q * q / (r * (r + 2)) + q / r) * s
            from_43 = q * (1 + (3 * q + g + 1) * s / (2 * (g * g - 1)))
            assert q + 2 * h1 == from_41 == from_43
    print('James (40), first-order part of (41), and (43): 15 rational cases PASS')

    example = quantities([11, 16, 21], [0, 1, 2], [1, 4, 9])
    shifted = quantities([11, 16, 21], [7, 8, 9], [1, 4, 9])
    scaled = quantities([11, 16, 21], [0, -3, -6], [9, 36, 81])
    assert example == shifted == scaled
    for g in [2, 3, 4, 6]:
        out = quantities([11] * g, list(range(g)), list(range(1, g + 1)))
        assert out[4] == out[6]
        assert out[5] <= 10 * g
    print('translation / scale invariance and balanced statistic equality PASS')
    print('unequal example Q,S,W,Welch_df,Fstar,Fstar_df,ANOVA_F:')
    print([str(z) for z in example])
    print('illustrative approximate p(W), p(Fstar):',
          f.sf(float(example[2]), 2, float(example[3])),
          f.sf(float(example[4]), 2, float(example[5])))

    # df=2 gives an independent elementary chi-square quantile.
    q = -2 * log(0.05)
    assert isclose(q, chi2.isf(0.05, 2), rel_tol=1e-14)
    out = quantities([11, 11, 11], [0, 1, 1], [1, 1, 1])
    cutoff = q * (1 + (3 * q + 4) * float(out[1]) / 16)
    assert out[0] == F(22, 3) and out[1] == F(2, 15)
    assert float(out[0]) > cutoff > float(out[0] / 2)
    print('normalization witness Q=22/3, printed J=11/3, S=2/15')
    print('James first-order cutoff:', cutoff)
    print('James Q rejects; literal Brown-Forsythe printed J does not PASS')
    q3 = chi2.isf(0.05, 3)
    print('literal printed J large-df size for g=4:', chi2.sf(3 * q3, 3))

    # Reconstruct Table 2's equal-variance 5% columns from printed Table 3.
    table3 = [
        ['1.34', '3.57', '1.43', '.42', '4.49', '.59', '1.39', '3.69', '1.31'],
        ['7.48', '61.07', '3.91', '1.95', '66.60', '1.03', '5.88', '61.75', '3.23'],
        ['5.16', '50.15', '2.15', '1.87', '53.44', '1.00', '5.31', '49.13', '3.17'],
        ['4.40', '29.22', '2.56', '1.48', '32.14', '1.20', '4.23', '29.11', '2.67'],
    ]
    table2 = [['4.9', '5.1', '5.0'], ['68.6', '67.6', '65.0'],
              ['55.3', '54.4', '52.3'], ['33.6', '33.3', '31.8']]
    totals = []
    for row, expected in zip(table3, table2):
        a, b, c, d, e, h, i, j, k = map(F, row)
        assert a + b == d + e
        assert b + c == j + k
        assert e + h == i + j
        triple = [a + b, e + h, b + c]
        assert all(abs(v - F(t)) <= F(1, 20) for v, t in zip(triple, expected))
        totals.append([float(v) for v in triple])
    print('Table 3 sums (F,Fstar,W):', totals)
    print('Table 3 agrees internally and with Table 2 printed rounding PASS')
    print('SciPy:', scipy.__version__)
    print('ALL BOUNDED SR-A DIAGNOSTICS PASSED')


if __name__ == '__main__':
    main()
