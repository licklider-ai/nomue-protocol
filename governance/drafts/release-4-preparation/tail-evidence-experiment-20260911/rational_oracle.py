"""Independent formula/implementation routes. No imports from candidate.py.

Shared trusted primitives: Python integers, Fraction, isqrt; not independent
hardware or independent investigators. See REPORT.md for proof obligations.
"""
from fractions import Fraction as Q
from budget import work_guard
from math import comb, isqrt, isfinite, copysign


def oracle(f, n, bits=256, max_terms=512):
    if type(n) is not int or n < 2 or n > 65:
        raise ValueError("oracle count guard")
    if type(f) is not Q or f < 0 or max(f.numerator.bit_length(), f.denominator.bit_length()) > 6500:
        raise ValueError("oracle F guard")
    if type(bits) is not int or not 8 <= bits <= 2048:
        raise ValueError("oracle precision guard")
    if type(max_terms) is not int or not 1 <= max_terms <= 512:
        raise ValueError("oracle series budget guard")
    work_guard(f, n, bits)
    f = Q(f)
    a = 2 * (n - 1)
    if f == 0:
        return Q(1), Q(1), "endpoint", 0
    x = Q(2 * a) / (2 * a + f)
    # Independent normalization by the polynomial integral, not factorials.
    h = sum((Q((-1) ** j * comb(a - 1, j), 2 * j + 1) for j in range(a)), Q(0))
    if x <= Q(1, 2):
        # B_x(a,1/2)=x^a sum c_k x^k/(a+k), c_k=(1/2)_k/k!.
        term = Q(1, a)
        total = term
        prefactor = x ** a / (2 * h)
        for j in range(max_terms):
            nxt = term * Q(2 * j + 1, 2 * j + 2) * Q(a + j, a + j + 1) * x
            rem = nxt / (1 - x)
            if rem <= total / (1 << bits):
                return prefactor * total, prefactor * (total + rem), "positive-series", j + 1
            total += nxt
            term = nxt
        raise ArithmeticError("oracle series cap; no guessed value")
    z = 1 - x
    scale = 1 << bits
    k = isqrt(z.numerator * scale * scale // z.denominator)
    l = Q(k, scale)
    u = l if l * l == z else min(Q(k + 1, scale), Q(1))

    def H(t):
        return sum((Q((-1) ** j * comb(a - 1, j), 2 * j + 1) * t ** (2 * j + 1)
                    for j in range(a)), Q(0))

    return 1 - H(u) / h, 1 - H(l) / h, "polynomial-integral", a


def round_probability(q):
    """Exact rational -> binary64 encoding, ties to even, no float conversion."""
    if not 0 <= q <= 1:
        raise ValueError("probability outside [0,1]")
    if q == 0:
        return 0
    p, d = q.numerator, q.denominator
    e = p.bit_length() - d.bit_length()
    if (p < d << e) if e >= 0 else (p << -e < d):
        e -= 1
    step = max(e - 52, -1074)
    num, den = (p << -step, d) if step < 0 else (p, d << step)
    sig, rem = divmod(num, den)
    sig += 2 * rem > den or (2 * rem == den and sig % 2 == 1)
    if sig == 0:
        return 0
    if step == -1074 and sig < (1 << 52):
        return sig
    if sig == (1 << 53):
        sig >>= 1
        step += 1
    return ((step + 52 + 1023) << 52) | (sig - (1 << 52))


def projection(bounds):
    l, u = bounds[:2]
    a, b = round_probability(l), round_probability(u)
    return a if a == b else None
