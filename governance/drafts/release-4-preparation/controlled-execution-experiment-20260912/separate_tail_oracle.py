"""Separate-review oracle: committed tail encodings versus an incomplete-beta route.

Reads EXECUTION.json and BENCHMARKS.json only. Imports nothing from the packet or
its pinned numerical sources. Two routes: a Lentz continued fraction for the
regularized incomplete beta I_{nu/(nu+F)}(nu/2, 1/2) in binary64, and, for
nu = 4 only, the closed-form Student-t survival 1 - t(t^2+6)/(t^2+4)^(3/2) with
t = sqrt(F) evaluated in 60-digit decimal. Both are reviewer arithmetic, not a
primary-source methodological review and not a whole-domain proof.
"""
import json
import math
import struct
from decimal import Decimal, getcontext
from fractions import Fraction as Q
from pathlib import Path

HERE = Path(__file__).resolve().parent
getcontext().prec = 60


def betacf(a, b, x, max_iterations=2000, eps=1e-16, tiny=1e-300):
    qab, qap, qam = a + b, a + 1, a - 1
    c, d = 1.0, 1 - qab * x / qap
    d = tiny if abs(d) < tiny else d
    d = 1 / d
    h = d
    for m in range(1, max_iterations + 1):
        m2 = 2 * m
        aa = m * (b - m) * x / ((qam + m2) * (a + m2))
        d = 1 + aa * d
        d = tiny if abs(d) < tiny else d
        c = 1 + aa / c
        c = tiny if abs(c) < tiny else c
        d = 1 / d
        h *= d * c
        aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2))
        d = 1 + aa * d
        d = tiny if abs(d) < tiny else d
        c = 1 + aa / c
        c = tiny if abs(c) < tiny else c
        d = 1 / d
        delta = d * c
        h *= delta
        if abs(delta - 1) < eps:
            return h
    raise ArithmeticError('continued fraction did not converge')


def regularized_beta(a, b, x):
    if x <= 0:
        return 0.0
    if x >= 1:
        return 1.0
    front = math.exp(math.lgamma(a + b) - math.lgamma(a) - math.lgamma(b)
                     + a * math.log(x) + b * math.log(1 - x))
    if x < (a + 1) / (a + b + 2):
        return front * betacf(a, b, x) / a
    return 1 - front * betacf(b, a, 1 - x) / b


def upper_tail(f, nu):
    """P(F_{1,nu} > f) = I_{nu/(nu+f)}(nu/2, 1/2)."""
    return regularized_beta(nu / 2, 0.5, nu / (nu + f))


def t4_closed_form(f):
    t = (Decimal(f.numerator) / Decimal(f.denominator)).sqrt()
    return 1 - t * (t * t + 6) / ((t * t + 4) ** Decimal('1.5'))


def encoding_to_float(hex_bits):
    return struct.unpack('>d', struct.pack('>Q', int(hex_bits, 16)))[0]


def rational(pair):
    return Q(int(pair[0], 16), int(pair[1], 16))


def main():
    rows, seen = [], set()
    for name in ('EXECUTION.json', 'BENCHMARKS.json'):
        for row in json.loads((HERE / name).read_text())['rows']:
            receipt = row.get('receipt')
            if type(receipt) is not dict or receipt.get('category') != 'completed_worker':
                continue
            outcome = receipt['outcome']
            if outcome.get('state') != 'completed' or 'tails' not in outcome.get('result', {}):
                continue
            result = outcome['result']
            n = int(result['df']['A'][1], 16) // 4 + 1
            nu = 4 * (n - 1)
            for i, axis in enumerate(('A', 'B', 'AB')):
                f = rational(result['exact']['f'][i])
                key = (n, f)
                if key in seen:
                    continue
                seen.add(key)
                tail = result['tails'][axis]
                lower = rational(tail['bounds'][0]['rational'])
                upper = rational(tail['bounds'][1]['rational'])
                encoded = encoding_to_float(tail['encoding'])
                separate = upper_tail(float(f), nu)
                closed = float(t4_closed_form(f)) if nu == 4 and f > 0 else None
                relative = abs(separate - encoded) / max(encoded, 1e-300)
                rows.append({'source': name, 'row': row['name'], 'contrast': axis, 'n_per_cell': n,
                             'f': float(f), 'committed_encoding': encoded,
                             'continued_fraction': separate, 'closed_form_nu4': closed,
                             'relative_difference': relative,
                             'enclosure_width': float(upper - lower),
                             'agrees_within_1e-12': relative < 1e-12 and
                             (closed is None or abs(closed - encoded) / encoded < 1e-12)})
    print(json.dumps({'claim': 'binary64 agreement of committed tail encodings with two separate '
                               'routes; not a primary-source review or whole-domain proof',
                      'values': len(rows), 'all_agree': all(r['agrees_within_1e-12'] for r in rows),
                      'rows': rows}, indent=2))


if __name__ == '__main__':
    main()
