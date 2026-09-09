"""Bounded author diagnostics; no source oracle or Protocol implementation."""
from itertools import product
from math import sqrt
import numpy as np
import scipy
from scipy.special import roots_hermitenorm, roots_genlaguerre, ndtr, gamma
from scipy.stats import t
from scipy.optimize import brentq


def rectangle(limit, sizes, df, order):
    """Symmetric t rectangle via common normal + independent chi scale."""
    z, wz = roots_hermitenorm(order)
    x, wx = roots_genlaguerre(order, df / 2 - 1)
    wz = wz / sqrt(2 * np.pi)
    wx = wx / gamma(df / 2)
    u = np.sqrt(2 * x / df)
    lam = np.sqrt(np.array(sizes) / (11 + np.array(sizes)))
    a = limit * u[:, None, None]
    b = lam[None, None, :] * z[None, :, None]
    s = np.sqrt(1 - lam**2)[None, None, :]
    conditional = np.prod(ndtr((a - b) / s) - ndtr((-a - b) / s), axis=2)
    return float(wx @ conditional @ wz)


def sd(values, critical):
    out = []
    for i in reversed(range(len(values))):
        if values[i] < critical[i]:
            break
        out.append(i + 1)
    return sorted(out)


def su(values, critical):
    for i, (v, c) in enumerate(zip(values, critical)):
        if v >= c:
            return list(range(i + 1, len(values) + 1))
    return []


def order_probability(cdf):
    """Lemma 3.1 recursion, conditional iid uniforms at CDF thresholds."""
    if not cdf:
        return 1.0
    return sum(order_probability(cdf[:j] + cdf[j+1:]) *
               (cdf[j] - (cdf[j-1] if j else 0)) for j in range(len(cdf)))


def enumerate_probability(cdf):
    """Separate exhaustive categorical count of sorted-threshold event."""
    cuts = [0] + list(cdf) + [1]
    prob = 0.0
    for cells in product(range(len(cdf) + 1), repeat=len(cdf)):
        if all(v <= i for i, v in enumerate(sorted(cells))):
            prob += float(np.prod([cuts[v+1] - cuts[v] for v in cells]))
    return prob


def main():
    print('SciPy', scipy.__version__)
    values = [1.62, 1.74, 2.52, 2.75, 4.57]
    sizes = [10, 12, 9, 10, 10]
    tails = []
    for n in [64, 96]:
        tails.append(np.array([1 - rectangle(v, sizes[:i+1], 93, n)
                               for i, v in enumerate(values)]))
    assert max(abs(tails[0] - tails[1])) < 2e-7
    local = tails[-1]
    adjusted = np.maximum.accumulate(local[::-1])[::-1]
    print('1991 rounded-stat local', local.tolist())
    print('1991 adjusted', adjusted.tolist())
    assert max(abs(local - [.109, .151, .037, .025, 0])) < .001
    assert max(abs(adjusted - [.151, .151, .037, .025, 0])) < .001
    assert list(np.flatnonzero(adjusted <= .05) + 1) == [3, 4, 5]
    marginal_bounds = np.arange(1, 6) * 2 * t.sf(values, 93)
    holm = np.maximum.accumulate(marginal_bounds[::-1])[::-1]
    assert np.all(local <= marginal_bounds + 1e-12)
    assert np.all(adjusted <= holm + 1e-12)
    assert marginal_bounds[0] < adjusted[0]
    print('1991 upper-bound distinction: raw Holm', marginal_bounds[0],
          '< adjusted Dunnett', adjusted[0], '; cumulative Holm', holm[0])
    critical = [brentq(lambda q: rectangle(q, sizes[:m], 93, 96) - .95, 1, 4)
                for m in range(1, 6)]
    print('1991 critical values', critical)
    assert max(abs(np.array(critical) - [1.986, 2.246, 2.391, 2.489, 2.562])) < .001
    for a in [(.1, .4), (.2, .3, .8), (.1, .1, .7), (.3, .5, .6, .9)]:
        assert abs(order_probability(a) - enumerate_probability(a)) < 1e-12
    # Known variance, rho=0, m=2: P(T_(1)<c1,T_(2)<c2)=2*a*b-a*a.
    a = .95
    b = (.95 + a*a)/(2*a)
    assert abs(b - .975) < 1e-12
    assert abs(order_probability((a, b)) - .95) < 1e-12
    print('1992 lemma independently enumerated; rho=0 known-scale m=2 CDF', b)
    c_su = [1.697, 2.008, 2.157, 2.260, 2.339, 2.402]
    c_sd = [1.697, 1.989, 2.147, 2.255, 2.335, 2.399]
    for v, eu, ed in [([1.50, 2.02, 2.25, 2.28, 2.32, 2.50], [2,3,4,5,6], [6]),
                      ([1.50, 2.00, 2.15, 2.30, 2.47, 2.50], [4,5,6], [2,3,4,5,6])]:
        assert su(v, c_su) == eu and sd(v, c_sd) == ed
    print('1992 Table 6/7 decisions reproduce; no uniform rejection-set dominance')
    # Exhaustive finite corroboration of parametric Hsu event implication, not coverage simulation.
    total = 0
    for theta in product([-1, 0, 2], repeat=3):
        best = max(range(3), key=lambda i: theta[i])
        for err in product([-1, 0, 1], repeat=3):
            if max(err[j] - err[best] for j in range(3) if j != best) > 1:
                continue
            y = [v + e for v, e in zip(theta, err)]
            for i in range(3):
                target = theta[i] - max(theta[j] for j in range(3) if j != i)
                delta = y[i] - max(y[j] for j in range(3) if j != i)
                assert min(delta - 1, 0) <= target <= max(delta + 1, 0)
            total += 1
    print('Hsu event implies all three intervals:', total, 'configurations including ties')
    assert (max([2, 1, 0]) - max([1, 0])) == 1
    print('ALL BOUNDED SR-J DIAGNOSTICS PASSED')


if __name__ == '__main__':
    main()
