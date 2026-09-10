"""Disposable positive finite-sum candidate; no production support claim."""
from decimal import Decimal as D, localcontext
from fractions import Fraction as Q
from math import comb, factorial, isfinite, copysign, isqrt

MAX_N = 65  # Research budget, not a proposed supported count.
MAX_BITS = 2048


def guard(f, n):
    if type(n) is not int or not 2 <= n <= MAX_N:
        raise ValueError("count outside probe budget/domain")
    if type(f) is not float or not isfinite(f) or f < 0 or copysign(1, f) < 0:
        raise ValueError("expected finite nonnegative binary64, excluding negative zero")
    return Q(f), 2 * (n - 1)


def decimal_candidate(f, n, digits=80):
    q, a = guard(f, n)
    if type(digits) is not int or not 20 <= digits <= 700:
        raise ValueError("decimal precision outside probe budget")
    if not q:
        return D(1)
    with localcontext() as c:
        c.prec = digits
        nu = D(2 * a)
        v = D(q.numerator) / D(q.denominator)
        x = nu / (nu + v)
        r = (v / (nu + v)).sqrt()
        d = x / (1 + r)  # Do not subtract r from one.
        s = 1 + r
        term = s ** (a - 1) / a
        total = term
        for k in range(a - 1):
            term *= D(a - 1 - k) * d / (D(a + k + 1) * s)
            total += term
        h = D(2) ** (2 * a - 1) * D(factorial(a)) * D(factorial(a - 1)) / D(factorial(2 * a))
        return +(d ** a * total / h)


def finite_enclosure(f, n, bits=128):
    q, a = guard(f, n)
    if type(bits) is not int or not 8 <= bits <= MAX_BITS:
        raise ValueError("square-root precision outside probe budget")
    if not q:
        return Q(1), Q(1)
    x = Q(2 * a) / (2 * a + q)
    z = q / (2 * a + q)
    scale = 1 << bits
    k = isqrt((z.numerator << (2 * bits)) // z.denominator)
    lo = Q(k, scale)
    hi = lo if lo * lo == z else min(Q(k + 1, scale), Q(1))
    dl, dh = x / (1 + hi), x / (1 + lo)
    sl, sh = 1 + lo, 1 + hi
    h = Q(2 ** (2 * a - 1) * factorial(a) * factorial(a - 1), factorial(2 * a))

    def integral(d, s):
        # Positive independent monomials: evaluate endpoints termwise.
        return sum((Q(comb(a - 1, j) * factorial(j) * factorial(a - 1), factorial(a + j))
                    * d ** (a + j) * s ** (a - 1 - j) for j in range(a)), Q(0)) / h

    return max(Q(0), integral(dl, sl)), min(Q(1), integral(dh, sh))
