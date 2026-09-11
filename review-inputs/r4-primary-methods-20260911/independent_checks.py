"""Bounded independent derivation checks for the R4 primary-methods review."""

from fractions import Fraction as F
from math import comb, factorial, isqrt
import json
import struct


U = 1 << 1074


def decode(x):
    bits = struct.unpack(">Q", struct.pack(">d", x))[0]
    sign = bits >> 63
    exponent = (bits >> 52) & 0x7FF
    fraction = bits & ((1 << 52) - 1)
    if exponent == 0x7FF:
        raise ValueError("nonfinite")
    z = fraction if exponent == 0 else ((1 << 52) | fraction) << (exponent - 1)
    return -z if sign else z


def pairwise_sse(cell):
    z = [decode(x) for x in cell]
    n = len(z)
    moment = n * sum(v * v for v in z) - sum(z) ** 2
    pairs = sum((z[i] - z[j]) ** 2 for i in range(n) for j in range(i + 1, n))
    assert moment == pairs >= 0
    return F(moment, n * U * U)


def h(a):
    polynomial = sum((F((-1) ** j * comb(a - 1, j), 2 * j + 1) for j in range(a)), F(0))
    factorial_form = F(2 ** (2 * a - 1) * factorial(a) * factorial(a - 1), factorial(2 * a))
    assert polynomial == factorial_form
    return polynomial


def finite_sum_at_rational_root(a, r):
    x = 1 - r * r
    d, s = 1 - r, 1 + r
    total = sum((F(comb(a - 1, k) * factorial(k) * factorial(a - 1), factorial(a + k))
                 * d ** (a + k) * s ** (a - 1 - k) for k in range(a)), F(0))
    return total / h(a), x


def polynomial_tail(a, r):
    H = lambda u: sum((F((-1) ** j * comb(a - 1, j), 2 * j + 1) * u ** (2 * j + 1)
                       for j in range(a)), F(0))
    return (h(a) - H(r)) / h(a)


def root_bracket(z, bits):
    scale = 1 << bits
    k = isqrt((z.numerator << (2 * bits)) // z.denominator)
    lo = F(k, scale)
    hi = lo if lo * lo == z else F(k + 1, scale)
    assert lo * lo <= z <= hi * hi
    return lo, hi


def main():
    values = [0.0, -0.0, 2.0 ** -1074, -(2.0 ** -1074), 2.0 ** -1022,
              float.fromhex("0x1.fffffffffffffp+1023"), 1.0, -1.0]
    for x in values:
        assert F(decode(x), U) == F(*x.as_integer_ratio())

    cells = [[0.0, 2.0 ** -1074], [1.0, 1.0, float.fromhex("0x1.0000000000001p+0")]]
    sse = [pairwise_sse(c) for c in cells]
    assert sse[0] == F(1, 2 * U * U)

    # n=4 gives a=6 and f=4 gives r=1/2 exactly.
    q_sum, x = finite_sum_at_rational_root(6, F(1, 2))
    q_poly = polynomial_tail(6, F(1, 2))
    assert x == F(3, 4)
    assert q_sum == q_poly == F(35995, 524288)

    brackets = []
    for z in [F(1, 3), F(1, 2), F(3, 4), F(1, 2 ** 1074)]:
        lo, hi = root_bracket(z, 128)
        brackets.append({"z": str(z), "lo": str(lo), "hi": str(hi)})

    result = {
        "binary64_decode_cases": len(values),
        "pairwise_sse_cases": len(cells),
        "normalization_a_checked": list(range(1, 17)),
        "exact_tail_witness": str(q_sum),
        "root_brackets": brackets,
        "status": "pass",
    }
    for a in range(1, 17):
        h(a)
    print(json.dumps(result, indent=2, sort_keys=True))


if __name__ == "__main__":
    main()
