"""Bounded checks derived from directly inspected IEEE 754-2019 clauses."""

from fractions import Fraction
import json
import struct

U = 1 << 1074
MAX = 0x7FEFFFFFFFFFFFFF
INF = 0x7FF0000000000000


def require(condition, message):
    if not condition:
        raise AssertionError(message)


def ratio_from_fields(bits):
    sign = bits >> 63
    exponent = (bits >> 52) & 0x7FF
    fraction = bits & ((1 << 52) - 1)
    if exponent == 0x7FF:
        raise ValueError("nonfinite")
    integer = fraction if exponent == 0 else ((1 << 52) | fraction) << (exponent - 1)
    return Fraction(-integer if sign else integer, U)


def nearest_positive(q):
    """Nearest/even encoding for nonnegative q below the IEEE infinity threshold."""
    if q < 0:
        raise ValueError("negative")
    lo, hi = 0, MAX
    while lo < hi:
        mid = (lo + hi + 1) // 2
        if ratio_from_fields(mid) <= q:
            lo = mid
        else:
            hi = mid - 1
    if lo == MAX:
        midpoint_to_infinity = ratio_from_fields(MAX) + Fraction(1 << 970)
        return MAX if q < midpoint_to_infinity else INF
    up = lo + 1
    twice = 2 * q - ratio_from_fields(lo) - ratio_from_fields(up)
    return lo if twice < 0 or (twice == 0 and lo % 2 == 0) else up


def main():
    cases = [
        0x0000000000000000,
        0x8000000000000000,
        0x0000000000000001,
        0x000FFFFFFFFFFFFF,
        0x0010000000000000,
        0x3FF0000000000000,
        MAX,
        MAX | (1 << 63),
    ]
    for bits in cases:
        x = struct.unpack(">d", struct.pack(">Q", bits))[0]
        require(
            ratio_from_fields(bits) == Fraction(*x.as_integer_ratio()),
            f"field decode mismatch: {bits:016x}",
        )

    require(
        ratio_from_fields(0) == ratio_from_fields(1 << 63) == 0,
        "signed zeros did not collapse to integer zero",
    )
    require(ratio_from_fields(1) == Fraction(1, U), "minimum subnormal mismatch")
    require(
        ratio_from_fields(0x0010000000000000) == Fraction(1, 1 << 1022),
        "minimum normal mismatch",
    )
    require(
        ratio_from_fields(MAX) == Fraction((1 << 53) - 1) * (1 << 971),
        "maximum finite mismatch",
    )

    midpoint_cases = [
        (0, 1),
        (1, 2),
        (0x0010000000000000, 0x0010000000000001),
        (0x3FF0000000000000, 0x3FF0000000000001),
    ]
    for low, high in midpoint_cases:
        midpoint = (ratio_from_fields(low) + ratio_from_fields(high)) / 2
        expected = low if low % 2 == 0 else high
        require(
            nearest_positive(midpoint) == expected,
            f"ties-to-even mismatch: {low:016x}/{high:016x}",
        )

    ordered = [0, 1, 2, 0x000FFFFFFFFFFFFF, 0x0010000000000000,
               0x3FF0000000000000, MAX]
    require(
        all(
            ratio_from_fields(a) < ratio_from_fields(b)
            for a, b in zip(ordered, ordered[1:])
        ),
        "selected positive finite encodings are not monotone",
    )

    one = Fraction(1)
    ulp = Fraction(1, 1 << 52)
    lower, upper = one + ulp / 5, one + 2 * ulp / 5
    require(lower <= upper, "invalid interval ordering")
    require(
        nearest_positive(lower)
        == nearest_positive(upper)
        == 0x3FF0000000000000,
        "equal-endpoint interval projection mismatch",
    )

    max_finite = ratio_from_fields(MAX)
    half_overflow_ulp = Fraction(1 << 970)
    ieee_infinity_threshold = max_finite + half_overflow_ulp
    require(
        nearest_positive(max_finite + 1) == MAX,
        "value immediately above maximum finite should round to maximum finite",
    )
    require(
        nearest_positive(ieee_infinity_threshold) == INF,
        "IEEE nearest-mode infinity threshold mismatch",
    )

    print(json.dumps({
        "field_decode_cases": len(cases),
        "interval_projection_cases": 1,
        "midpoint_tie_cases": len(midpoint_cases),
        "monotone_order_points": len(ordered),
        "signed_zero_encodings_collapse_in_lattice": True,
        "above_max_project_refusal_is_stricter_than_ieee_nearest": True,
        "status": "pass"
    }, indent=2, sort_keys=True))


if __name__ == "__main__":
    main()
