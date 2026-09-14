"""G1-G3 disposable research. No public implementation or independent review.

Integer common-denominator tail compared with integral/rational-root identities,
previous Fraction Horner, positive-sum enclosures and inverse rounding cells.
No Python assert: every validation runs under -O as well as normal mode.
"""
import argparse
from fractions import Fraction as Q
import hashlib
import importlib.util
import json
import math
from pathlib import Path
import struct
import sys

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
PRIOR = HERE.parent / 't04-ec1-ec2-evidence-20260914'
ONE = 0x3ff0000000000000
MAX = 0x7fefffffffffffff
CHECKS = 0


def check(condition, message):
    global CHECKS
    CHECKS += 1
    if not condition:
        raise AssertionError(message)


def pair(q):
    return [hex(q.numerator), hex(q.denominator)]


def val(code):
    return Q(*struct.unpack('>d', struct.pack('>Q', code))[0].as_integer_ratio())


def width(q):
    return max(1, abs(q.numerator).bit_length(), q.denominator.bit_length())


def cost(n, widths, schedule=(128, 256, 512)):
    """RG1 symbolic charged upper bounds; not measured CPU instructions."""
    check(type(n) is int and 2 <= n <= (1 << 51)-1, 'cost count domain')
    check(len(widths) == 3 and all(type(w) is int and w >= 1 for w in widths), 'three widths')
    a = 2*(n-1)
    r = (n-1).bit_length()
    ell = (2*a-1).bit_length()
    k0 = 2*2098+4*r+2200
    unit = lambda k: 64*(k+1)**3
    pre = (128*n+2048)*unit(k0)
    exact, staged, ks = [], [], [k0]
    for w in widths:
        t = w+ell+2
        kx = 8*a*(t+ell+4)+8192
        exact.append((32*a+256)*unit(kx))
        ks.append(kx)
        stages = []
        for b in schedule:
            check(type(b) is int and b >= 1, 'stage precision domain')
            k = 64*a*a*(t+b+ell+8)+8192
            stages.append((64*a*a+8*b+512)*unit(k))
            ks.append(k)
        staged.append(stages)
    # Exact-only evidence does not charge unused staged operands.
    ex_k = max([k0] + [8*a*(w+ell+2+ell+4)+8192 for w in widths])
    ex_evidence_bits = 22*(8*ex_k+512)+320
    st_evidence_bits = 22*(8*max(ks)+512)+320
    ex_evidence_work = ex_evidence_bits*ex_evidence_bits
    st_evidence_work = st_evidence_bits*st_evidence_bits
    return {'n': n, 'a': a, 'widths': widths, 'k_pre': k0,
            'preflight': pre, 'exact_tails': exact, 'staged_tails': staged,
            'S_C': pre+sum(exact)+ex_evidence_work,
            'S_A': pre+sum(map(sum, staged))+st_evidence_work,
            'S_B': pre+sum(map(sum, staged))+sum(exact)+st_evidence_work,
            'exact_evidence_bits': ex_evidence_bits,
            'staged_evidence_bits': st_evidence_bits}


def integer_tail(f, n):
    """No Fraction polynomial operations and no gcd after incoming exact F.

    Homogeneous Horner gives N = B^(a-1) D P(A/B), H = D h.
    Return integer numerator/denominator of T, not a root approximation.
    """
    check(type(n) is int and n >= 2 and f >= 0, 'integer tail domain')
    a = 2*(n-1)
    aa, bb = f.numerator, f.numerator+2*a*f.denominator
    d = math.prod(range(1, 2*a, 2))
    coefficients = [(-1)**j * math.comb(a-1, j)*(d//(2*j+1)) for j in range(a)]
    h = sum(coefficients)
    acc, power = coefficients[-1], 1
    observed = max(d.bit_length(), *(abs(c).bit_length() for c in coefficients))
    for j in range(a-2, -1, -1):
        power *= bb
        acc = acc*aa+coefficients[j]*power
        observed = max(observed, abs(acc).bit_length(), power.bit_length())
    tn = aa*acc*acc
    td = bb*power*power*h*h
    check(acc > 0 and h > 0 and 0 <= tn < td, 'positive polynomial and finite tail')
    w = width(f)
    ell = (2*a-1).bit_length()
    k = 8*a*(w+ell+2+ell+4)+8192
    check(max(observed, tn.bit_length(), td.bit_length()) <= k, 'RG1 exact operand envelope sample')
    calls = 0
    def compare(v):
        nonlocal calls
        check(0 <= v <= 1, 'comparison boundary domain')
        calls += 1
        num, den = v.numerator, v.denominator
        delta = (den-num)**2*td-den*den*tn
        return (delta > 0)-(delta < 0)
    # Bisection over ordered encodings, then tie-even selection.
    low, high, steps = 0, ONE, 0
    while low < high:
        mid = (low+high+1)//2
        if compare(val(mid)) >= 0:
            low = mid
        else:
            high = mid-1
        steps += 1
    if compare(val(low)) == 0:
        code = low
    else:
        check(low < ONE, 'nonexact floor has successor')
        sign = compare((val(low)+val(low+1))/2)
        code = low if sign < 0 or (sign == 0 and low % 2 == 0) else low+1
    zero_sign = compare(Q(1, 1 << 1075))
    check((code == 0) == (zero_sign <= 0), 'exact zero eligibility agrees with projection')
    check(steps <= 63 and calls <= 66, 'finite boundary comparison count')
    return {'code': code, 'zero_sign': zero_sign, 'steps': steps,
            'observed_bits': max(observed, tn.bit_length(), td.bit_length()),
            'bound_bits': k, 'T': [hex(tn), hex(td)]}, compare


def rational_root_truth(r, a):
    """Positive tail integral after u=r+(1-r)t.

    (1-u^2)^(a-1) = (1-r)^(a-1)(1-t)^(a-1)
                           * ((1+r)+(1-r)t)^(a-1).
    Integer beta integrals give positive coefficients, no squared CDF.
    """
    d, s = 1-r, 1+r
    numerator = sum((Q(math.comb(a-1,j)*math.factorial(j)*math.factorial(a-1),
                       math.factorial(a+j))*d**(a+j)*s**(a-1-j)
                     for j in range(a)), Q(0))
    h = Q((1 << (2*a-1))*math.factorial(a)*math.factorial(a-1), math.factorial(2*a))
    return numerator/h


def coefficients_identity(a):
    """Expand positive-tail expression in r and compare ALL coefficients.

    Separately construct h - integral_0^r(1-u^2)^(a-1)du.
    """
    degree = 2*a-1
    positive = [Q(0) for _ in range(degree+1)]
    for j in range(a):
        c = Q(math.comb(a-1,j)*math.factorial(j)*math.factorial(a-1), math.factorial(a+j))
        for i in range(a+j+1):
            for k in range(a-j):
                positive[i+k] += c*(-1)**i*math.comb(a+j,i)*math.comb(a-1-j,k)
    expected = [Q(0) for _ in range(degree+1)]
    expected[0] = Q((1 << (2*a-1))*math.factorial(a)*math.factorial(a-1), math.factorial(2*a))
    for j in range(a):
        expected[2*j+1] = -Q((-1)**j*math.comb(a-1,j), 2*j+1)
    check(positive == expected, 'expanded integral identity a='+str(a))


def cell_check(compare, code):
    lo = Q(0) if code == 0 else (val(code-1)+val(code))/2
    hi = Q(1) if code == ONE else (val(code)+val(code+1))/2
    check(compare(lo) >= (1 if code % 2 else 0), 'inverse lower cell endpoint')
    check(compare(hi) <= (-1 if code % 2 else 0), 'inverse upper cell endpoint')


def load_prior():
    inputs = json.loads((HERE/'INPUTS.json').read_text())
    for item in inputs['files']:
        check(hashlib.sha256((ROOT/item['path']).read_bytes()).hexdigest() == item['sha256'], 'input hash '+item['path'])
    spec = importlib.util.spec_from_file_location('prior_research', PRIOR/'check_evidence.py')
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    check(Path(module.__file__).resolve() == PRIOR/'check_evidence.py', 'prior module origin')
    _, tail = module.load_subjects()
    return module, tail


def run():
    old, tail = load_prior()
    identities = list(range(2, 11))
    for a in identities:
        coefficients_identity(a)
    small = []
    for n in range(2, 7):
        for denominator in range(2, 13):
            for numerator in range(denominator):
                r = Q(numerator, denominator)
                f = 4*(n-1)*r*r/(1-r*r)
                truth = rational_root_truth(r, 2*(n-1))
                result, compare = integer_tail(f, n)
                check(compare(truth) == 0, 'known rational root truth equality')
                check(result['code'] == old.rn(truth), 'separate quotient projection')
                cell_check(compare, result['code'])
                small.append([n,numerator,denominator,result['code']])
    # Real finite rational F tails exactly at ordinary binary64 midpoints.
    # These are mathematical tail inputs, not established raw Record inputs.
    exact_midpoint_tails = []
    for root_numerator in (131073,131075,131077,131079):
        rr = Q(root_numerator,1 << 18)
        f = 4*rr*rr/(1-rr*rr)
        truth = (1-rr)**2*(2+rr)/2
        result,compare = integer_tail(f,2)
        code = old.rn(truth)
        lower_candidates = [k for k in (code-1,code)
                            if (val(k)+val(k+1))/2 == truth]
        check(len(lower_candidates) == 1,'real exact-F midpoint construction')
        lower = lower_candidates[0]
        check(compare(truth) == 0,'terminal exact midpoint equality')
        check(result['code'] == (lower if lower%2 == 0 else lower+1),
              'terminal exact tail tie-even branch')
        exact_midpoint_tails.append({'scope':'synthetic mathematical finite-F tail; no raw realization',
                                     'F':pair(f),'true_p':pair(truth),'lower_code':lower,
                                     'result':result})
    check({x['lower_code']%2 for x in exact_midpoint_tails} == {0,1},
          'both terminal even and odd lower-code ties exercised')
    probes = []
    for n in (2, 3, 5, 17, 65, 70):
        for label, f in [('F_zero',Q(0)), ('tiny_F', val(1)), ('ordinary',Q(4,3)),
                         ('large_F',Q(1 << 540)), ('max_finite_F',val(MAX))]:
            result, compare = integer_tail(f,n)
            prior_code, _, prior_t = old.exact_tail_sign_oracle(f,n)
            check(prior_code == result['code'], 'Fraction Horner projection cross-check')
            check(Q(int(result['T'][0],16),int(result['T'][1],16)) == prior_t, 'Fraction Horner T cross-check')
            cell_check(compare,result['code'])
            stages = []
            for b in (128,256,512):
                if n <= 65 and old.historical_guard(n,width(f),b):
                    lo,hi = tail.finite_enclosure(f,n,b)
                    check(compare(lo) >= 0 and compare(hi) <= 0, 'positive enclosure containment')
                    stages.append({'b':b,'range':list(old.candidate_range(lo,hi))})
                else:
                    stages.append({'b':b,'historical_guard_refusal':True})
            probes.append({'label':label, 'scope':'synthetic mathematical fixture; raw realization not established',
                           'n':n,'F':pair(f),'result':result,'stages':stages})
    # Rational-root witnesses on BOTH sides of three rounding boundaries.
    boundaries = [('ordinary_midpoint',(val(0x3fe0000000000000)+val(0x3fe0000000000001))/2,640),
                  ('normal_subnormal_midpoint',(val((1<<52)-1)+val(1<<52))/2,1200),
                  ('zero_subnormal_midpoint',Q(1,1<<1075),1200),
                  ('near_one_midpoint',1-Q(1,1<<54),640)]
    boundary_rows = []
    for label,v,bits in boundaries:
        scale = 1 << bits
        low,high = 0,scale
        def p_at(k):
            # n=2 factored positive expression, independent of squared-CDF code.
            rr = Q(k,scale)
            return (1-rr)**2*(2+rr)/2
        while high-low > 1:
            mid = (low+high)//2
            if p_at(mid) > v:
                low = mid
            else:
                high = mid
        for k in (low,high):
            rr = Q(k,scale)
            f = 4*rr*rr/(1-rr*rr)
            truth = p_at(k)
            result,compare = integer_tail(f,2)
            check(result['code'] == old.rn(truth), 'boundary known truth projection')
            check(compare(v) == (truth>v)-(truth<v), 'boundary signed comparator')
            check(compare(truth) == 0, 'rational witness equality')
            cell_check(compare,result['code'])
            stages = []
            for b in (128,256,512,1024):
                lo,hi = tail.finite_enclosure(f,2,b)
                check(lo <= truth <= hi, 'boundary positive-sum enclosure contains truth')
                stages.append({'b':b,'range':list(old.candidate_range(lo,hi)),
                               'decision':old.bounded_decision(lo,hi,result['code'])})
            boundary_rows.append({'label':label,'scope':'synthetic mathematical fixture; no raw Record realization',
                                  'root_bits':bits,'F':pair(f),'true_p':pair(truth),'boundary':pair(v),
                                  'side':compare(v),'result':result,'stages':stages})
        check(p_at(low)>v and p_at(high)<v, 'strict two-sided boundary witnesses')
    # Exact ties at all selected encoding cell types: mathematical comparator
    # controls, NOT a claim that the corresponding T is a realized F tail.
    tie_rows = []
    for code in (0,1,2,(1<<52)-1,1<<52,0x3fe0000000000000,0x3fe0000000000001,ONE-1):
        v = (val(code)+val(code+1))/2
        check(old.rn(v) == (code if code%2 == 0 else code+1), 'exact midpoint even parity')
        t = (1-v)**2
        check((1-v)**2-t == 0, 'exact-sign synthetic tie')
        tie_rows.append({'lower_code':code,'midpoint':pair(v),'rounded_code':old.rn(v),
                         'scope':'synthetic boundary control, not tail realization'})
    tiny, maxf = float.fromhex('0x0.0000000000001p-1022'),float.fromhex('0x1.fffffffffffffp+1023')
    fixtures = {'cancellation': [[1.,math.nextafter(1.,2.)]]*4,
                'large_common_offset':[[2.**500,math.nextafter(2.**500,math.inf)]]*4,
                'maximal_finite': [[-maxf,maxf]]*4,
                'maximal_constant':[[maxf,maxf]]*4,
                'positive_underflow':[[-2.**-270,2.**-270]]*2+[[1.,1.]]*2,
                'sse_projection_zero':[[0.,tiny]]*4,
                'negative_mean_zero':[[-tiny,0.]]*4}
    raw = []
    for name,cells in fixtures.items():
        direct = old.direct(cells)
        moment = old.moments_and_bounds(cells)
        observed,bounds,widths = moment['observed_bits'],moment['upper_bits'],moment['F_widths']
        outcomes = []
        if direct['f'] is not None:
            for f in direct['f']:
                res,_ = integer_tail(f,2)
                outcomes.append(res['code'])
        if name == 'positive_underflow':
            check(direct['f'][0] == 1<<541 and outcomes[0] == 0, 'raw realized positive underflow')
        if name == 'sse_projection_zero':
            check(direct['sse'][0] > 0 and old.rn(direct['sse'][0]) == 0, 'SSE representation refusal')
        raw.append({'name':name,'scope':'raw binary64 observations; not a full Record',
                    'cells_hex':[[y.hex() for y in cell] for cell in cells],
                    'observed_bits':observed,'bounds':bounds,'F_widths':widths,
                    'SSE':pair(direct['sse'][0]),'SSE_projection':old.rn(direct['sse'][0]),
                    'tail_encodings':outcomes,
                    'preflight':cost(2,widths if widths else [1,1,1])['preflight']})
    aggregate_rows = []
    for states,expected in [(['pass']*22,'pass'),(['indeterminate']+['pass']*20+['mismatch'],'fail'),
                            (['indeterminate']+['pass']*21,'indeterminate'),
                            (['refusal']+['pass']*21,'gated_no_comparison_aggregate')]:
        check(old.aggregate(states) == expected,'22 quantity skeleton aggregation')
        aggregate_rows.append({'states':states,'expected':expected,'scope':'abstract controls, not EC3 report implementation'})
    check(old.aggregate(['pass']*22,False) == 'error_no_completed_results','invocation failure suppression')
    grid = []
    for n in (2,5,17,65,66,70,71,128,501,(1<<51)-1):
        for w in (1,61,62,541,4353):
            c = cost(n,[w]*3)
            c['synthetic_width_parameter'] = True
            c['J65_old_scores'] = n <= 65 and old.historical_guard(n,w,512)
            c['J70_old_scores'] = n <= 70 and old.historical_guard(n,w,512)
            c['J_cost_B_sensitivity_only'] = {str(b):c['S_C'] <= 1<<b for b in (65,70,75,80,90)}
            grid.append(c)
    # Explicit guard/coefficient mutation controls, not just matching paths.
    known, compare = integer_tail(Q(4,3),2)
    check(compare(Q(5,16)) == 0 and compare(Q(1,2)) != 0,'reject false singleton truth')
    check(known['zero_sign'] > 0,'known positive eligible tail')
    return {'scope':'G1-G3 research only; no independent clearance or policy adoption',
            'identities_all_coefficients_a':identities, 'small_degree_root_grid':small,
            'tail_probes':probes,'boundary_witnesses':boundary_rows,'tie_controls':tie_rows,
            'exact_midpoint_tails':exact_midpoint_tails,
            'raw_fixtures':raw,'aggregation_controls':aggregate_rows,'cost_grid':grid,'checks':CHECKS}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--write',action='store_true')
    parser.add_argument('--check',action='store_true')
    args = parser.parse_args()
    result = run()
    raw = (json.dumps(result,sort_keys=True,separators=(',',':'))+'\n').encode()
    if args.write:
        (HERE/'RESULTS.jsonl').write_bytes(raw)
    if args.check:
        check((HERE/'RESULTS.jsonl').read_bytes() == raw,'saved result byte equality')
    print(json.dumps({'checks':result['checks'],'sha256':hashlib.sha256(raw).hexdigest(),
                      'optimize':sys.flags.optimize,'saved_checked':args.check,
                      'small_degree_cases':len(result['small_degree_root_grid']),
                      'tail_probes':len(result['tail_probes']),'boundary_witnesses':len(result['boundary_witnesses'])},sort_keys=True))


if __name__ == '__main__':
    main()
