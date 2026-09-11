"""Run from this directory: python probe.py. Writes deterministic results.json."""
import json
import math
import struct
from collections import Counter
from decimal import Decimal
from fractions import Fraction as Q
from pathlib import Path
from candidate import decimal_candidate, finite_enclosure
from oracle import oracle, projection, round_probability


def dyadic(q, upward=False, precision=180):
    if not q:
        return {"significand_hex": "0x0", "exponent": 0}
    e = q.numerator.bit_length() - q.denominator.bit_length() - precision
    scaled = q * (1 << -e) if e < 0 else q / (1 << e)
    k, rem = divmod(scaled.numerator, scaled.denominator)
    return {"significand_hex": hex(k + bool(upward and rem)), "exponent": e}


def decode(v):
    k, e = int(v["significand_hex"], 16), v["exponent"]
    return Q(k * (1 << e)) if e >= 0 else Q(k, 1 << -e)


def enc(bounds):
    return [dyadic(bounds[0]), dyadic(bounds[1], True)]


def classify(code):
    if code is None:
        return "unresolved"
    if code == 0:
        return "positive-rounds-zero"
    if code == 0x3ff0000000000000:
        return "rounded-one"
    if code < 1 << 52:
        return "subnormal"
    return "normal"


def run():
    cases = []
    fs = [0., math.ulp(0.), 2.**-108, 2.**-106, 2.**-100, 0.25, 1., 4., 36., 100.,
          2.**100, 2.**510, 2.**540, float.fromhex('0x1.fffffffffffffp+1023')]
    for n in range(2, 17):
        cases.extend((f, n, "count-grid") for f in fs)
    cases.extend((f, 65, "larger-count-budget") for f in [0., 1., 256., 2.**100])

    # Adjacent binary64 F values at probability projection class transitions.
    # This is fixture discovery, not a quantile/critical-value deliverable.
    def from_code(k):
        return struct.unpack('>d', k.to_bytes(8, 'big'))[0]

    for target, label in [(Q(1)-Q(1,2**54), "one-boundary"),
                          (Q(1,2**1022)-Q(1,2**1075), "normal-boundary"),
                          (Q(1,2**1075), "zero-boundary")]:
        lo, hi = 0, 0x7fefffffffffffff
        while hi - lo > 1:
            mid = (lo + hi) // 2
            f = from_code(mid)
            l, u, _, _ = oracle(f, 2, bits=256)
            if l > target:
                lo = mid
            elif u < target:
                hi = mid
            else:
                raise ArithmeticError("fixture discovery unresolved; no direction guessed")
        cases.extend((from_code(k), 2, label) for k in (lo, hi))

    rows = []
    for f, n, label in cases:
        a = finite_enclosure(f, n, 128)
        b = oracle(f, n, 256)
        assert max(a[0], b[0]) <= min(a[1], b[1]), (f, n, "disjoint")
        pa, pb = projection(a), projection(b)
        assert pa == pb and pa is not None, (f, n, "projection not closed")
        d = decimal_candidate(f, n, 80)
        dq = Q(d)
        err = max(abs(dq-b[0]), abs(dq-b[1]))
        # Diagnostic only; interval supplies the error, not this threshold.
        assert err <= (b[1] * Q(1, 10**65)), (f, n, "decimal diagnostic")
        packed_a, packed_b = enc(a), enc(b)
        assert projection(tuple(map(decode, packed_a))) == pa
        assert projection(tuple(map(decode, packed_b))) == pb
        rows.append({"n":n, "nu":4*(n-1), "f_hex":f.hex(), "family":label,
                     "candidate_bounds":packed_a, "oracle_bounds":packed_b,
                     "oracle_route":b[2], "oracle_work":b[3],
                     "decimal_80_digits":str(d), "decimal_abs_error_upper":dyadic(err, True),
                     "round_binary64_bits":f"{pa:016x}", "projection_class":classify(pa),
                     "mathematical_tail":"exact-one" if f == 0 else "strictly-positive-less-than-one"})

    negatives = 0
    class IntSubclass(int):
        pass
    for fn in (decimal_candidate, finite_enclosure, oracle):
        for f,n in [(1.,v) for v in (0,1,-1,True,2.0,IntSubclass(2),66)] + [(v,2) for v in (-1.,-0.,math.inf,math.nan,1)]:
            try:
                fn(f,n)
            except ValueError:
                negatives += 1
            else:
                raise AssertionError("missing input guard")
    for fn,args in [(finite_enclosure,(1.,2,2049)),(finite_enclosure,(1.,2,True)),
                    (decimal_candidate,(1.,2,701)),(oracle,(1.,2,2049)),(oracle,(4.,2,256,513))]:
        try:
            fn(*args)
        except ValueError:
            negatives += 1
        else:
            raise AssertionError("missing resource guard")
    try:
        oracle(4.,2,256,1)
    except ArithmeticError:
        negatives += 1
    else:
        raise AssertionError("series cap not enforced")

    # Force precision failure and record successful refinement rather than guess.
    low = finite_enclosure(1.,2,8)
    assert projection(low) is None
    high = finite_enclosure(1.,2,128)
    assert projection(high) is not None
    refined = finite_enclosure(1.,2,256)
    assert max(high[0],refined[0]) <= min(high[1],refined[1])
    assert refined[1]-refined[0] < high[1]-high[0]

    # Exact dyadic midpoint tests, including tie parity and class transitions.
    midpoint_cases = [(Q(1,2**1075),0), (Q(3,2**1075),2),
                      (Q(1)-Q(1,2**54),0x3ff0000000000000),
                      (Q(1,2**1022)-Q(1,2**1075),1<<52)]
    for q, expected in midpoint_cases:
        assert round_probability(q) == expected
    # Oracle-based negative controls, not dictionary-inequality controls.
    controls = 0
    for row in rows:
        if row['f_hex'] != '0x0.0p+0':
            lo, hi = map(decode,row['oracle_bounds'])
            assert lo > 0
            wrong_zero, wrong_double = Q(0), 2 * Q(Decimal(row['decimal_80_digits']))
            assert not lo <= wrong_zero <= hi
            assert not lo <= wrong_double <= hi
            controls += 2
    # Upstream interval witness (not a raw-data guarantee).
    flo, fhi = math.nextafter(4.,0.), math.nextafter(4.,math.inf)
    pl, pu = oracle(fhi,2)[0], oracle(flo,2)[1]
    center = oracle(4.,2)
    assert pl <= center[0] <= center[1] <= pu
    # Hand-integrated (1-u^2)^5 at u=1/2: exact rational witness.
    assert oracle(4.,4)[:2] == (Q(35995,524288), Q(35995,524288))
    summary = {"cases":len(rows), "projection_counts":dict(Counter(r['projection_class'] for r in rows)),
               "domain_and_resource_rejections":negatives, "oracle_numeric_negative_controls":controls,
               "midpoint_cases":len(midpoint_cases), "precision_refinement":"8 unresolved; 128 and 256 closed",
               "max_oracle_series_terms":max(r['oracle_work'] for r in rows if r['oracle_route']=='positive-series'),
               "upstream_interval_witness":{"f_lower":flo.hex(),"f_upper":fhi.hex(),"p_bounds":enc((pl,pu))},
               "status":"author-side exploration passed; independent review pending"}
    Path(__file__).with_name('results.json').write_text(json.dumps({"summary":summary,"rows":rows},indent=2)+'\n')
    print(json.dumps(summary,indent=2))


if __name__ == '__main__':
    run()
