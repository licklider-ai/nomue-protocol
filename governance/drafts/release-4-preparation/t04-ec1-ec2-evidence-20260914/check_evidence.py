"""Disposable EC1/EC2 research; no public verifier or support selection.

Independent residual arithmetic, exponent/quotient projection, midpoint-cell
membership and a polynomial tail path are authored here. Historical code is
loaded only as a comparison subject. Shared Python integer/Fraction primitives
and author context are disclosed; no independent investigator is claimed.
"""
import argparse
import hashlib
import importlib.util
import json
import math
from pathlib import Path
import struct
import sys
from fractions import Fraction as Q

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
BASE = 'cd9d780ac06a3b998ff5d4717429b0177a222fe8'
UNIT = 1 << 1074
MAX_CODE = 0x7fefffffffffffff
ONE_CODE = 0x3ff0000000000000
SIGN = 1 << 63
L = 2098
CHECKS = 0


def require(ok, message):
    global CHECKS
    CHECKS += 1
    if not ok:
        raise AssertionError(message)


def value(code):
    return Q(*struct.unpack('>d', struct.pack('>Q', code))[0].as_integer_ratio())


MAX_VALUE = value(MAX_CODE)


def rn(q):
    """Separate quotient rounding, not historical ordered-encoding search."""
    if abs(q) > MAX_VALUE:
        return None
    sign = SIGN if q < 0 else 0
    p, d = abs(q.numerator), q.denominator
    if p == 0:
        return 0
    exponent = p.bit_length() - d.bit_length()
    if (p < d * (1 << exponent)) if exponent >= 0 else (p * (1 << -exponent) < d):
        exponent -= 1
    step = max(-1074, exponent - 52)
    num, den = (p << -step, d) if step < 0 else (p, d << step)
    significand, remainder = divmod(num, den)
    if 2 * remainder > den or (2 * remainder == den and significand & 1):
        significand += 1
    if significand == 0:
        return 0  # Public zero token, not a received-token normalization rule.
    if step == -1074 and significand < (1 << 52):
        return sign | significand
    if significand == 1 << 53:
        significand >>= 1
        step += 1
    return sign | ((step + 1075) << 52) | (significand - (1 << 52))


def rounding_cell_intersects(lo, hi, code):
    """Independent inverse-cell oracle for probability encodings [0,1]."""
    q = value(code)
    lower = Q(0) if code == 0 else (value(code - 1) + q) / 2
    upper = Q(1) if code == ONE_CODE else (q + value(code + 1)) / 2
    even = code % 2 == 0
    return not (hi < lower or (hi == lower and not even) or
                lo > upper or (lo == upper and not even))


def candidate_range(lo, hi):
    require(0 <= lo <= hi <= 1, 'probability interval order')
    return rn(lo), rn(hi)


def bounded_decision(lo, hi, declared):
    """Exploratory gate diagnostic: ambiguous underflow is deliberately OPEN."""
    first, last = candidate_range(lo, hi)
    if last == 0:
        return 'positive_tail_underflow_refusal'
    if first == 0:
        return 'underflow_gate_unresolved_OPEN'
    if not first <= declared <= last:
        return 'mismatch'
    return 'pass' if first == last else 'indeterminate'


def direct(cells):
    """Residual-square route independent of historical integer moments."""
    ys = [[Q(*y.as_integer_ratio()) for y in cell] for cell in cells]
    n = len(cells[0])
    means = [sum(cell, Q(0)) / n for cell in ys]
    da = (means[2] + means[3] - means[0] - means[1]) / 2
    db = (means[1] + means[3] - means[0] - means[2]) / 2
    dab = (means[3] - means[2]) - (means[1] - means[0])
    effects = [da, db, dab]
    ss = [n * da**2, n * db**2, n * dab**2 / 4]
    sse = sum(((y - mean)**2 for cell, mean in zip(ys, means) for y in cell), Q(0))
    df = 4 * (n - 1)
    fs = None if sse == 0 else [df * s / sse for s in ss]
    return {'counts': [n] * 4, 'means': means, 'estimates': effects,
            'ss': ss, 'sse': [sse], 'df': df, 'f': fs}


def moments_and_bounds(cells):
    n = len(cells[0])
    r = (n - 1).bit_length()
    zs = [[int(Q(*y.as_integer_ratio()) * UNIT) for y in cell] for cell in cells]
    s = [sum(cell) for cell in zs]
    squares = [sum(z*z for z in cell) for cell in zs]
    c = [-s[0]-s[1]+s[2]+s[3], -s[0]+s[1]-s[2]+s[3], s[0]-s[1]-s[2]+s[3]]
    e = n * sum(squares) - sum(t*t for t in s)
    require(e >= 0, 'nonnegative exact residual')
    values = {
        'z': [z for cell in zs for z in cell], 'sum': s, 'square_sum': squares,
        'contrast': c, 'residual_numerator': [e],
        'F_unreduced_numerator': [(n-1)*t*t for t in c],
        'deviation_numerator': [n*z-sc for cell, sc in zip(zs, s) for z in cell],
    }
    bounds = {'z': L, 'sum': L+r, 'square_sum': 2*L+r,
              'contrast': L+r+2, 'residual_numerator': 2*L+2*r+2,
              'F_unreduced_numerator': 2*L+3*r+4, 'deviation_numerator': L+r+1}
    observed = {k: max(abs(v).bit_length() for v in vs) for k, vs in values.items()}
    for k, bits in observed.items():
        require(bits <= bounds[k], 'growth bound ' + k)
    fs = None if e == 0 else [Q((n-1)*t*t, e) for t in c]
    widths = [] if fs is None else [max(f.numerator.bit_length(), f.denominator.bit_length()) for f in fs]
    return {'n': n, 'r': r, 'observed_bits': observed, 'upper_bits': bounds,
            'F_widths': widths}


def root_bracket(z, bits):
    """Exact binary bisection; no historical isqrt implementation."""
    scale = 1 << bits
    low, high = 0, scale
    while low < high:
        mid = (low + high + 1) // 2
        if mid * mid * z.denominator <= z.numerator * scale * scale:
            low = mid
        else:
            high = mid - 1
    lo = Q(low, scale)
    hi = lo if lo*lo == z else Q(low+1, scale)
    require(lo*lo <= z <= hi*hi, 'root bracket')
    return lo, hi


def polynomial_tail(f, n, bits):
    """Reviewed mathematical route, newly coded recurrence; not a new review."""
    a = 2 * (n-1)
    if f == 0:
        return Q(1), Q(1)
    lo, hi = root_bracket(f / (2*a+f), bits)
    def integral(t):
        power = t
        total = Q(0)
        for j in range(a):
            total += (-1)**j * math.comb(a-1, j) * power / (2*j+1)
            power *= t*t
        return total
    h = integral(Q(1))
    return max(Q(0), 1-integral(hi)/h), min(Q(1), 1-integral(lo)/h)


def exact_tail_sign_oracle(f, n):
    """New exact sign derivation from the reviewed polynomial, not adopted.

    H(r)=r P(r^2); p=1-H(r)/h, with P(z)>0, h>0.
    Thus T=z*(P(z)/h)^2=(1-p)^2 is rational. For v in [0,1],
    sign(p-v) is the opposite of sign(T-(1-v)^2). No root or
    finite-precision approximation is needed. This route needs independent
    proof-to-code review before any promotion.
    """
    a = 2*(n-1)
    z = f/(2*a+f)
    poly = Q(0)
    h = Q(0)
    for j in reversed(range(a)):
        coefficient = Q((-1)**j * math.comb(a-1,j), 2*j+1)
        poly = poly*z + coefficient
        h += coefficient
    require(poly > 0 and h > 0, 'positive normalization for exact squaring')
    t = z*(poly/h)**2
    require(0 <= t < 1, 'positive finite-F tail')
    def compare(v):
        require(0 <= v <= 1, 'oracle comparison range')
        delta = (1-v)**2 - t
        return (delta > 0)-(delta < 0)
    low, high, steps = 0, ONE_CODE, 0
    while low < high:
        steps += 1
        mid = (low+high+1)//2
        if compare(value(mid)) >= 0:
            low = mid
        else:
            high = mid-1
    require(steps <= 63, 'bounded probability encoding search')
    if compare(value(low)) == 0:
        encoding = low
    else:
        midpoint = (value(low)+value(low+1))/2
        direction = compare(midpoint)
        encoding = low if direction < 0 or (direction == 0 and low % 2 == 0) else low+1
    return encoding, compare, t

def fraction_pair(q):
    return [hex(q.numerator), hex(q.denominator)]


def interval_digest(bounds):
    return hashlib.sha256(json.dumps([fraction_pair(x) for x in bounds], separators=(',', ':')).encode()).hexdigest()


def historical_guard(n, width, bits):
    a = 2*(n-1)
    return width <= 6500 and a*a*(width+bits) <= 10_000_000 and a*a*width <= 1_000_000


def aggregate(states, invocation_ok=True):
    if not invocation_ok:
        return 'error_no_completed_results'
    if any(x in ('not_run', 'refusal', 'error') for x in states):
        return 'gated_no_comparison_aggregate'
    if 'mismatch' in states:
        return 'fail'
    if all(x == 'pass' for x in states) and states:
        return 'pass'
    return 'indeterminate'


def load_subjects():
    pins = json.loads((HERE / 'INPUTS.json').read_text())
    require(pins['input_commit'] == BASE, 'fixed architecture input')
    for row in pins['files']:
        require(hashlib.sha256((ROOT / row['path']).read_bytes()).hexdigest() == row['sha256'], 'source pin ' + row['path'])
    numerical = ROOT / 'governance/drafts/release-4-preparation/tail-evidence-experiment-20260911'
    sys.path.insert(0, str(numerical))
    import upstream_arithmetic
    import rational_candidate
    for module in (upstream_arithmetic, rational_candidate):
        require(Path(module.__file__).resolve().parent == numerical, 'subject origin')
    return upstream_arithmetic, rational_candidate


def run():
    arithmetic, tail = load_subjects()
    tiny = math.ldexp(1.0, -1074)
    max_float = float.fromhex('0x1.fffffffffffffp+1023')
    fixtures = {
        'ordinary': [[m-.5, m+.5] for m in (0., 2., 4., 8.)],
        'zero_sse': [[float(k)]*2 for k in range(4)],
        'sse_projection_zero': [[0., tiny] for _ in range(4)],
        'negative_mean_rounds_zero': [[-tiny, 0.] for _ in range(4)],
        'max_finite_sse_zero': [[max_float]*2 for _ in range(4)],
        'opposite_maxima': [[-max_float, max_float] for _ in range(4)],
        'common_offset': [[1., math.nextafter(1., 2.)] for _ in range(4)],
        'large_common_offset': [[2.**500, math.nextafter(2.**500, math.inf)] for _ in range(4)],
        'positive_p_underflow': [[-2.**-270, 2.**-270]]*2 + [[1., 1.]]*2,
        'nonbinary_mean': [[1., 1., math.nextafter(1., 2.)] for _ in range(4)],
    }
    for n in (2, 3, 5, 17, 33, 46, 47, 65, 66, 70, 71, 128):
        fixtures['zero_effect_n_' + str(n)] = [[float(i % 2) for i in range(n)] for _ in range(4)]
        fixtures['dyadic_n_' + str(n)] = [[float(((i*7+c*11) % 31)-15)/8 for i in range(n)] for c in range(4)]
    arithmetic_rows = []
    for name, cells in fixtures.items():
        expected = direct(cells)
        actual = arithmetic.exact_candidate(cells)
        for key in ('means', 'estimates', 'ss', 'sse', 'f'):
            want = expected[key]
            got = None if actual[key] is None else [Q(*x) for x in actual[key]]
            require(want == got, name + ':' + key)
            if want:
                for q in want:
                    code = rn(q)
                    old = arithmetic.project((q.numerator, q.denominator))['nearest']
                    require((code is None) == (old is None), 'finite convention')
                    if code is not None:
                        got_q = Q(*float.fromhex(old).as_integer_ratio())
                        require(value(code) == got_q, 'projection route equality')
                        require(Q(*float(q).as_integer_ratio()) == got_q, 'CPython cross-check')
        require(actual['df'] == [(expected['df'], 1)], 'df exact integer')
        row = moments_and_bounds(cells)
        row['name'] = name
        row['input_hex'] = [[x.hex() for x in cell] for cell in cells]
        row['historical_n_gate'] = row['n'] <= 65
        row['work_only_512'] = bool(row['F_widths']) and all(historical_guard(row['n'], w, 512) for w in row['F_widths'])
        row['SSE_projection'] = rn(expected['sse'][0])
        arithmetic_rows.append(row)

    projection_rows = []
    for code in (0, 1, 2, (1<<52)-1, 1<<52, 0x3fd0000000000000, ONE_CODE-2):
        lo, hi = value(code), value(code+1)
        midpoint = (lo+hi)/2
        for left, right in ((lo, hi), (midpoint, midpoint), ((lo+midpoint)/2, (midpoint+hi)/2)):
            first, last = candidate_range(left, right)
            for trial in range(max(0, first-2), min(ONE_CODE, last+2)+1):
                require((first <= trial <= last) == rounding_cell_intersects(left, right, trial), 'inverse rounding-cell membership')
            projection_rows.append({'lo': fraction_pair(left), 'hi': fraction_pair(right), 'first': first, 'last': last})
    for q in (MAX_VALUE, MAX_VALUE+1, -MAX_VALUE, -MAX_VALUE-1, Q(1,1<<1075), -Q(1,1<<1075)):
        code = rn(q)
        require((code is None) == (abs(q)>MAX_VALUE), 'max finite convention')
    wide = candidate_range(value(100), value(104))
    require(wide == (100,104), 'interior encoding retained')
    require(bounded_decision(value(100), value(104), 102) == 'indeterminate', 'interior not mismatch')
    require(bounded_decision(value(100), value(104), 105) == 'mismatch', 'outside provable mismatch')
    require(bounded_decision(Q(0), Q(1, 1<<1074), 1) == 'underflow_gate_unresolved_OPEN', 'zero not silently discarded')
    require(bounded_decision(Q(0), Q(1, 1<<1076), 0) == 'positive_tail_underflow_refusal', 'underflow not pass')

    tail_rows = []
    for n in (2, 5, 17, 33, 46, 65):
        for f in (Q(0), Q(1,3), Q(4), Q(256), Q(1<<100), Q(1<<540)):
            exact_code, compare_truth, truth_square = exact_tail_sign_oracle(f,n)
            stages = []
            prior = None
            for bits in (128, 256, 512):
                w = max(f.numerator.bit_length(), f.denominator.bit_length())
                if not historical_guard(n, w, bits):
                    stages.append({'bits': bits, 'state': 'historical_work_refusal'})
                    continue
                bounds = tail.finite_enclosure(f, n, bits)
                require(0 <= bounds[0] <= bounds[1] <= 1, 'candidate interval order')
                require(compare_truth(bounds[0]) >= 0 and compare_truth(bounds[1]) <= 0, 'exact-sign truth containment')
                oracle = polynomial_tail(f, n, bits+32) if n <= 5 else bounds
                if n <= 5:
                    require(compare_truth(oracle[0]) >= 0 and compare_truth(oracle[1]) <= 0, 'polynomial bracket vs exact-sign truth')
                if prior:
                    require(prior[0] <= bounds[0] <= bounds[1] <= prior[1], 'nested refinement')
                first, last = candidate_range(*bounds)
                require(first <= exact_code <= last, 'exact-sign projection code retained')
                o_first, o_last = candidate_range(*oracle)
                if o_first == o_last:
                    require(first <= o_first <= last, 'oracle singleton in candidate range')
                if f:
                    ratio = (1 + Q(1, 1<<bits))**(4*n-5)
                    require(bounds[1] <= bounds[0]*ratio, 'reviewed relative enclosure ratio')
                state = 'underflow_refusal' if last == 0 else ('underflow_gate_OPEN' if first == 0 else ('singleton' if first == last else 'multiple'))
                stages.append({'bits': bits, 'state': state, 'first': first, 'last': last,
                               'candidate_count': last-first+1, 'enclosure_sha256': interval_digest(bounds),
                               'auxiliary_polynomial_oracle': n <= 5,
                               'auxiliary_interval_sha256': interval_digest(oracle) if n <= 5 else None,
                               'auxiliary_singleton': (o_first == o_last) if n <= 5 else None,
                               'exact_sign_encoding': exact_code})
                prior = bounds
            tail_rows.append({'n': n, 'F': fraction_pair(f), 'stages': stages,
                              'exact_sign_encoding':exact_code,'cdf_square_sha256':interval_digest([truth_square])})

    midpoint_rows = []
    boundary = (value(0x3fe0000000000000) + value(0x3fe0000000000001))/2
    for root_bits in (180, 300, 600):
        # n=2 has p=1-(3r-r^3)/2. Pick dyadic r just above the
        # inverse image of a binary64 midpoint, giving an exact rational truth.
        scale = 1 << root_bits
        low, high = 0, scale
        def p_at(k):
            r = Q(k, scale)
            return 1-(3*r-r*r*r)/2
        while high-low > 1:
            mid = (low+high)//2
            if p_at(mid) > boundary:
                low = mid
            else:
                high = mid
        r = Q(high, scale)
        f = 4*r*r/(1-r*r)
        truth = p_at(high)
        declared = rn(truth)
        exact_code, compare_truth, _ = exact_tail_sign_oracle(f,2)
        require(exact_code == declared and compare_truth(truth) == 0,'known rational tail vs exact-sign oracle')
        stages = []
        for bits in (128,256,512,1024):
            bounds = tail.finite_enclosure(f,2,bits)
            require(bounds[0] <= truth <= bounds[1], 'exact polynomial midpoint witness')
            first,last = candidate_range(*bounds)
            require(first <= declared <= last, 'known truth code retained')
            stages.append({'bits':bits,'first':first,'last':last,
                           'decision':bounded_decision(*bounds,declared),
                           'enclosure_sha256':interval_digest(bounds)})
        require(stages[0]['decision']=='indeterminate', '128-bit unresolved witness')
        require(stages[-1]['decision']=='pass', '1024-bit resolving witness')
        if root_bits == 600:
            require(stages[2]['decision']=='indeterminate','512-to-1024 observable change')
        midpoint_rows.append({'scope':'exact-F tail input; no raw binary64 Record realization established',
                              'root_bits':root_bits,'F':fraction_pair(f),'true_p':fraction_pair(truth),
                              'declared_encoding':declared,'stages':stages})
    raw_underflow = direct(fixtures['positive_p_underflow'])['f'][0]
    raw_encoding, _, _ = exact_tail_sign_oracle(raw_underflow,2)
    require(raw_encoding == 0, 'exact-sign oracle confirms raw underflow')
    known_encoding, known_compare, _ = exact_tail_sign_oracle(Q(4,3),2)
    require(known_encoding == rn(Q(5,16)) and known_compare(Q(5,16)) == 0, 'exact n2 F4/3 rational truth')
    require(known_compare(Q(1,2)) < 0, 'false singleton enclosure rejected by truth oracle')
    raw_underflow_bounds = tail.finite_enclosure(raw_underflow,2,128)
    require(candidate_range(*raw_underflow_bounds)==(0,0), 'realized raw-record positive p underflow')

    guard_rows = [{'n': n, 'w': w, 'bits': b, 'accepted': historical_guard(n,w,b)}
                  for n in (2,5,17,33,46,47,65,66,70,71,128,501)
                  for w in (1,2,61,62,100,120,121,123,541,6500,6501)
                  for b in (128,256,512,1024)]
    require(historical_guard(70,1,512) and not historical_guard(71,1,512), 'derived work-only count frontier')
    require(historical_guard(65,61,512) and not historical_guard(65,62,512), 'n65 width frontier')
    require(not historical_guard(70,1,1024), 'schedule changes membership')
    require(2*L + 3*51 + 4 == 4353 < 6500, 'binary64/RFC count theoretical width ceiling')
    require(aggregate(['indeterminate','mismatch','pass']) == 'fail', 'late mismatch retained')
    require(aggregate(['pass','indeterminate','pass']) == 'indeterminate', 'unresolved retained')
    require(aggregate(['pass']*22) == 'pass', '22 mandatory scalar aggregate')
    require(aggregate(['pass','not_run']) == 'gated_no_comparison_aggregate', 'dependency gate')
    require(aggregate(['mismatch','pass'], False) == 'error_no_completed_results', 'invocation failure suppresses results')
    require(aggregate([]) != 'pass', 'no vacuous pass')
    return {'input_commit': BASE, 'status': 'author_research_not_closure', 'checks': CHECKS,
            'mandatory_scalar_count': 22, 'real_quantity_count': 17,
            'arithmetic': arithmetic_rows, 'projection_cells': projection_rows,
            'tails': tail_rows, 'midpoint_tails': midpoint_rows, 'work_grid': guard_rows,
            'gaps': ['concrete_count_and_work_selection', 'underflow_gate_straddling_zero',
                     'midpoint_resolution_separation_or_utility_bound', 'whole_procedure_cost_calibration',
                     'independent_review_of_new_derivations_and_code']}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--write', action='store_true')
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    result = run()
    text = json.dumps(result, sort_keys=True, separators=(',', ':'), ensure_ascii=True) + '\n'
    raw = text.encode()
    if args.write:
        (HERE / 'RESULTS.jsonl').write_bytes(raw)
    if args.check:
        require(raw == (HERE / 'RESULTS.jsonl').read_bytes(), 'deterministic saved result equality')
    summary = {'checks': result['checks'], 'sha256': hashlib.sha256(raw).hexdigest(),
               'arithmetic_cases': len(result['arithmetic']), 'tail_cases': len(result['tails']),
               'grid_rows': len(result['work_grid']), 'matched_saved': args.check}
    print(json.dumps(summary, sort_keys=True))


if __name__ == '__main__':
    main()
