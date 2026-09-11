"""Reviewer checks; recurrence + bisection + encoding search expectations.
Run from the repository root. Standard library only; no candidate expectation copying.
"""
import copy
import hashlib
import json
import math
import random
import struct
import sys
from fractions import Fraction as R
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
AUTHOR = ROOT / "governance/drafts/release-4-preparation/tail-feasibility-20260910"
sys.path.insert(0, str(AUTHOR))
import candidate
import oracle
import probe
import verify_results


def root_bracket(z, bits=320):
    # Binary search, deliberately no isqrt or candidate root routine.
    l, u = 0, 1 << bits
    while u-l > 1:
        m = (l+u)//2
        if m*m*z.denominator <= z.numerator*(1 << (2*bits)):
            l = m
        else:
            u = m
    low = R(l, 1 << bits)
    return low, low if low*low == z else R(u, 1 << bits)


def recurrence_tail(r, a):
    # J_m=int_r^1 (1-u^2)^(m-1)du; integration by parts.
    j, h, power = 1-r, R(1), R(1)
    for m in range(2, a+1):
        power *= 1-r*r
        j = ((2*m-2)*j-r*power)/(2*m-1)
        h = R(2*m-2, 2*m-1)*h
    return j/h


def independent_tail(f, n):
    nu = 4*(n-1)
    l, u = root_bracket(R(f)/(nu+R(f)))
    return recurrence_tail(u, nu//2), recurrence_tail(l, nu//2)


def value(code):
    exp, frac = code >> 52, code & ((1 << 52)-1)
    return R(frac, 1 << 1074) if exp == 0 else R((1 << 52)+frac)*R(2)**(exp-1075)


def nearest(q):
    # Search all nonnegative encodings up to one; compare exact distances.
    l, u = 0, 0x3ff0000000000000
    while u-l > 1:
        m = (l+u)//2
        if value(m) <= q:
            l = m
        else:
            u = m
    dl, du = q-value(l), value(u)-q
    return l if dl < du or (dl == du and l % 2 == 0) else u


def run():
    counts = {}
    rows = []
    # Branch crossing at all selected sizes, including n=65 budget endpoint.
    for n in (2,3,5,8,17,32,51,52,64,65):
        nu = float(4*(n-1))
        for f in (0., 0.125, 2.5, math.nextafter(nu, 0.), nu, math.nextafter(nu, math.inf)):
            expected = independent_tail(f,n)
            c = candidate.finite_enclosure(f,n)
            o = oracle.oracle(f,n)
            assert max(c[0], expected[0]) <= min(c[1], expected[1])
            assert max(o[0], expected[0]) <= min(o[1], expected[1])
            want = nearest(expected[0])
            assert want == nearest(expected[1])
            assert oracle.projection(c) == oracle.projection(o) == want
            rows.append({"n":n,"f_hex":f.hex(),"expected_bits":f"{want:016x}","route":o[2]})
    counts["independent_tail_cases"] = len(rows)
    exact = []
    for n, r in [(n,R(1,2)) for n in (4,7,10,16,31,64)] + [(n,R(3,4)) for n in (8,15,22,29,36,43,50,57,64)]:
        f = R(4*(n-1))*r*r/(1-r*r)
        assert R(float(f)) == f
        want = recurrence_tail(r,2*(n-1))
        c = candidate.finite_enclosure(float(f),n)
        assert c == (want,want)
        o = oracle.oracle(float(f),n)
        assert o[0] <= want <= o[1]
        exact.append({"n":n,"r":str(r),"f_hex":float(f).hex(),"exact_Q":str(want)})
    counts["exact_square_witnesses"] = len(exact)
    round_count = 0
    for e in range(-1074, 1):
        q = R(2)**e
        gap = R(2)**max(e-52,-1074)
        for v in (q, q-gap/3, q+gap/3):
            if 0 <= v <= 1:
                assert oracle.round_probability(v) == nearest(v)
                round_count += 1
    rng = random.Random(278)
    codes = [0,1,2,(1 << 52)-1,1 << 52,0x3fefffffffffffff]
    codes += [rng.randrange(0,0x3ff0000000000000) for _ in range(128)]
    for code in codes:
        l, u = value(code), value(code+1)
        mid, eps = (l+u)/2, (u-l)/16
        for q in (mid-eps,mid,mid+eps):
            assert oracle.round_probability(q) == nearest(q)
            round_count += 1
        assert oracle.round_probability(mid) == code + (code % 2)
        assert oracle.projection((mid-eps,mid+eps)) is None
    counts["rounding_checks"] = round_count
    counts["midpoint_straddles"] = len(codes)
    serial = [R(0),R(1),R(1,3),R(2)**-20000,R(1)-R(2)**-1080]
    for q in serial:
        assert probe.decode(probe.dyadic(q)) <= q <= probe.decode(probe.dyadic(q,True))
    counts["outward_serialization"] = len(serial)
    # Relative-width proof: exact ratio before clipping, upper bound after clipping.
    for n in (2,17,65):
        for f in (math.ulp(0.),1.,float(4*(n-1)),float.fromhex("0x1.fffffffffffffp+1023")):
            l,u = root_bracket(R(f)/(4*(n-1)+R(f)),8)
            low,high = candidate.finite_enclosure(f,n,8)
            assert low > 0 and high/low <= ((1+u)/(1+l))**(4*(n-1)-1)
            assert u-l <= R(1,256)
    counts["relative_width_cases"] = 12
    rejects = 0
    class IS(int): pass
    class FS(float): pass
    for fn in (candidate.decimal_candidate,candidate.finite_enclosure,oracle.oracle):
        for n in (True,False,IS(2),2.,R(2),None,"2",1,66,10**100):
            try: fn(0.,n)
            except ValueError: rejects += 1
            else: raise AssertionError("count admitted")
        for f in (True,0,FS(1),R(1),None,"1",-0.,-math.inf,math.inf,math.nan,-1.):
            try: fn(f,2)
            except ValueError: rejects += 1
            else: raise AssertionError("F admitted")
    for fn, kw in [(candidate.finite_enclosure,"bits"),(oracle.oracle,"bits"),(candidate.decimal_candidate,"digits")]:
        for v in (True,8.,None,0,7,2049):
            try: fn(0.,2,**{kw:v})
            except ValueError: rejects += 1
            else: raise AssertionError("precision admitted")
    for k in (True,1.,0,-1,513):
        try: oracle.oracle(0.,2,max_terms=k)
        except ValueError: rejects += 1
        else: raise AssertionError("cap admitted")
    for bits,cap in ((256,1),(2048,512)):
        try: oracle.oracle(4.,2,bits,cap)
        except ArithmeticError: rejects += 1
        else: raise AssertionError("cap did not fail closed")
    assert oracle.projection(candidate.finite_enclosure(1.,2,8)) is None
    for fn in (candidate.finite_enclosure,oracle.oracle):
        assert fn(0.,65,2048)[:2] == (R(1),R(1))
    assert candidate.decimal_candidate(0.,65,700) == 1
    counts["additional_rejections"] = rejects
    # Checker's intentional/actual coverage, not a whole-record authenticity claim.
    source = json.loads((AUTHOR/"results.json").read_text())
    row = next(r for r in source["rows"] if r["n"] == 2 and float.fromhex(r["f_hex"]) == 4.)
    survived = []
    for key,val in [("decimal_80_digits","0"),("decimal_abs_error_upper",{"significand_hex":"0x0","exponent":0}),("mathematical_tail","exact-one"),("projection_class","positive-rounds-zero"),("family","replacement")]:
        bad = copy.deepcopy(row); bad[key] = val
        verify_results.check(bad)
        survived.append(key)
    # A dyadic lower part of the 256-bit oracle interval, disproved by 384-bit lower bound.
    lo,hi,_,_ = oracle.oracle(4.,2,256)
    den = 1 << 400
    point = R(-((-lo.numerator*den)//lo.denominator),den)
    strict_lower = oracle.oracle(4.,2,384)[0]
    assert lo <= point <= hi and point < strict_lower
    bad = copy.deepcopy(row)
    encoded = {"significand_hex":hex(point.numerator),"exponent":-(point.denominator.bit_length()-1)}
    bad["candidate_bounds"] = [encoded,encoded]
    verify_results.check(bad)
    mutation = {"row_input":{"n":2,"f_hex":float(4).hex()},"accepted_non_enclosure":bad["candidate_bounds"],"proof_point_below_true_tail":point < strict_lower,"unchecked_fields":survived}
    counts["unchecked_field_mutations_accepted"] = len(survived)
    counts["non_enclosing_candidate_interval_accepted"] = 1
    return {"status":"checks_passed_with_documented_checker_limits","counts":counts,"tail_cases":rows,"exact_witnesses":exact,"checker_limit_witness":mutation}


if __name__ == "__main__":
    result = run()
    path = Path(__file__).with_name("independent-results.json")
    path.write_text(json.dumps(result,indent=2)+"\n")
    print(json.dumps(result["counts"],indent=2))
