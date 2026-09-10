"""Exploratory integer-lattice candidate. No Protocol support or adoption.
No oracle import and no floating arithmetic before the final projection.
"""
import math
import struct

UNIT = 1 << 1074
MAX_BITS = 0x7fefffffffffffff


def lattice(x):
    """Decode the binary64 bit pattern to the integer x * 2**1074."""
    bits = struct.unpack('>Q', struct.pack('>d', x))[0]
    sign, exponent, fraction = bits >> 63, (bits >> 52) & 2047, bits & ((1 << 52)-1)
    if exponent == 2047:
        raise ValueError('nonfinite input')
    z = fraction if exponent == 0 else ((1 << 52) | fraction) << (exponent-1)
    return -z if sign else z


def rational(a, b):
    if b <= 0:
        raise ValueError('nonpositive denominator')
    g = math.gcd(a, b)
    return (a // g, b // g)


def exact_candidate(cells):
    if len(cells) != 4 or len(cells[0]) < 2 or any(len(c) != len(cells[0]) for c in cells):
        raise ValueError('requires four equal cells and n >= 2')
    n = len(cells[0])
    if n > 2251799813685247:
        raise ValueError('outside proposed representational count ceiling')
    S, Q = [], []
    zero = True
    for cell in cells:
        s, q, first = 0, 0, lattice(cell[0])
        for x in cell:
            z = lattice(x)
            s += z
            q += z*z
            zero = zero and z == first
        S.append(s)
        Q.append(q)
    C = [-S[0]-S[1]+S[2]+S[3], -S[0]+S[1]-S[2]+S[3], S[0]-S[1]-S[2]+S[3]]
    E = n*sum(Q) - sum(s*s for s in S)
    assert E >= 0 and (E == 0) == zero
    out = {'means': [rational(s, n*UNIT) for s in S],
           'estimates': [rational(c, (n if j == 2 else 2*n)*UNIT) for j,c in enumerate(C)],
           'beta': [rational(sum(S), 4*n*UNIT)] + [rational(c, 4*n*UNIT) for c in C],
           'ss': [rational(c*c, 4*n*UNIT*UNIT) for c in C],
           'sse': [rational(E, n*UNIT*UNIT)],
           'df': [rational(4*(n-1), 1)],
           'f': None if E == 0 else [rational((n-1)*c*c, E) for c in C]}
    return out


def bits_float(bits):
    return struct.unpack('>d', struct.pack('>Q', bits))[0]


def project(pair):
    """Integer comparisons locate adjacent binary64 endpoints, <=63 iterations.
    Above max finite: no point projection; infinity is a diagnostic bound only.
    Otherwise choose nearest, ties to even; preserve the exact-zero distinction.
    """
    a, b = pair
    if a == 0:
        return dict(lower='0x0.0p+0', upper='0x0.0p+0', nearest='0x0.0p+0', status='exact_zero')
    neg = a < 0
    a = abs(a)
    target = a*UNIT
    if lattice(bits_float(MAX_BITS))*b < target:
        low, high, near, status = bits_float(MAX_BITS).hex(), 'inf', None, 'above_max_finite'
    else:
        lo, hi = 0, MAX_BITS
        while lo < hi:
            mid = (lo+hi+1)//2
            if lattice(bits_float(mid))*b <= target:
                lo = mid
            else:
                hi = mid-1
        z = lattice(bits_float(lo))
        up = lo if z*b == target else lo+1
        low, high = bits_float(lo).hex(), bits_float(up).hex()
        distance = 2*target - (z+lattice(bits_float(up)))*b
        nearest_bits = lo if distance < 0 or (distance == 0 and lo % 2 == 0) else up
        near = bits_float(nearest_bits).hex()
        status = 'exactly_representable' if up == lo else ('nonzero_rounds_to_zero' if nearest_bits == 0 else 'rounded')
    if neg:
        low, high = ('-'+high), ('-'+low)
        near = None if near is None else '-'+near
        if status == 'above_max_finite':
            status = 'below_minus_max_finite'
    return dict(lower=low, upper=high, nearest=near, status=status)
