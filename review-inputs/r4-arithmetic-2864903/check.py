"""Bounded reviewer checks. Outputs only to --out; never seals author evidence.
Expectation: hex rationals + pairwise differences + orthogonal fitted columns.
Projection oracle: exponent selection and quotient/remainder, no binary search.
"""
import argparse
import hashlib
import importlib.util
import json
import math
import random
import struct
import sys
from fractions import Fraction as R
from pathlib import Path

PIN = '2864903316b4b4b2b219a56b42c535bfec7935b3'
PREFIX = 'governance/drafts/release-4-preparation/arithmetic-candidate-20260910'


def hexrat(x):
    mantissa, exponent = x.hex().split('p')
    sign = -1 if mantissa.startswith('-') else 1
    mantissa = mantissa.lstrip('-')[2:]
    whole, fraction = mantissa.split('.')
    return sign * R(int(whole + fraction, 16), 16**len(fraction)) * R(2)**int(exponent)


def truth(cells):
    n = len(cells[0])
    x = [[hexrat(v) for v in cell] for cell in cells]
    means = [sum(c) / n for c in x]
    columns = [(1, 1, 1, 1), (-1, -1, 1, 1), (-1, 1, -1, 1), (1, -1, -1, 1)]
    beta = [sum(s * v for s, cell in zip(col, x) for v in cell) / (4*n) for col in columns]
    fitted = [sum(col[c] * b for col, b in zip(columns, beta)) for c in range(4)]
    assert fitted == means
    # n * sum residual^2 = sum_{i<j} (x_i-x_j)^2, no rounded means or moments.
    sse = sum((cell[i]-cell[j])**2 for cell in x for i in range(n) for j in range(i)) / n
    ss = [sum((col[c]*b)**2 for c in range(4) for _ in range(n)) for col,b in zip(columns[1:],beta[1:])]
    return dict(means=means, beta=beta, estimates=[2*beta[1],2*beta[2],4*beta[3]],
                ss=ss, sse=[sse], df=[R(4*n-4)], f=None if sse==0 else [v*(4*n-4)/sse for v in ss])


def projection(q):
    if q == 0:
        return dict(lower=0., upper=0., nearest=0., status='exact_zero')
    a = abs(q)
    maximum = R(2)**1024 - R(2)**971
    if a > maximum:
        p = dict(lower=sys.float_info.max, upper=math.inf, nearest=None, status='above_max_finite')
    else:
        e = a.numerator.bit_length() - a.denominator.bit_length()
        if a < R(2)**e:
            e -= 1
        step = R(2)**max(-1074,e-52)
        v = a/step
        k, rem = divmod(v.numerator,v.denominator)
        exact = rem == 0
        upper = k if exact else k+1
        nearest = k + int(2*rem > v.denominator or (2*rem == v.denominator and k%2==1))
        # Each product is representable; float conversion does no rounding here.
        p = dict(lower=float(k*step),upper=float(upper*step),nearest=float(nearest*step),
                 status='exactly_representable' if exact else ('nonzero_rounds_to_zero' if nearest==0 else 'rounded'))
    if q < 0:
        p['lower'],p['upper'] = -p['upper'],-p['lower']
        p['nearest'] = None if p['nearest'] is None else -p['nearest']
        if p['status']=='above_max_finite': p['status']='below_minus_max_finite'
    return p


def check_projection(q, candidate):
    p = candidate.project((q.numerator,q.denominator))
    expected = projection(q)
    for key in ('lower','upper','nearest'):
        assert p[key] == (None if expected[key] is None else expected[key].hex()), (q,key,p,expected)
    assert p['status']==expected['status']
    if math.isfinite(expected['lower']) and math.isfinite(expected['upper']):
        lo,hi = hexrat(expected['lower']),hexrat(expected['upper'])
        assert lo <= q <= hi
        assert abs(hexrat(expected['nearest'])-q) <= (hi-lo)/2
        assert lo==hi or math.nextafter(expected['lower'],math.inf)==expected['upper']
    return p


def encode(t):
    return {k:None if v is None else [str(x) for x in v] for k,v in t.items()}


def main(root, out, replay):
    packet = root/PREFIX
    spec = importlib.util.spec_from_file_location('reviewed_candidate', packet/'candidate.py')
    candidate = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(candidate)
    counts = dict(corpus_cases=0,corpus_quantities=0,additional_cases=0,additional_quantities=0,projection_boundaries=0,decoded_scalars=0)
    cache = set()
    def assess(cells, kind):
        expected = truth(cells)  # constructed before the candidate call
        actual = candidate.exact_candidate(cells)
        assert set(actual)==set(expected)
        for cell in cells:
            for v in cell:
                assert R(candidate.lattice(v),2**1074)==hexrat(v)
                counts['decoded_scalars']+=1
        for key, vals in expected.items():
            if vals is None:
                assert actual[key] is None
                continue
            assert len(actual[key])==len(vals)
            for q, pair in zip(vals,actual[key]):
                assert R(*pair)==q,(key,q,pair)
                assert pair[1]>0 and math.gcd(*pair)==1
                if q not in cache:
                    check_projection(q,candidate)
                    cache.add(q)
                counts[kind+'_quantities']+=1
        counts[kind+'_cases']+=1
        return expected
    saved = json.loads((packet/'results/exact-results.json').read_text())
    inputs = json.loads((packet/'results/inputs.json').read_text())
    assert len(inputs)==len(saved)==968
    for row, result in zip(inputs,saved):
        assert row['name']==result['name']
        t=assess([[float.fromhex(v) for v in c] for c in row['cells_hex']], 'corpus')
        for k,v in t.items():
            if v is None:
                assert result['expected'][k] is None and result['candidate_exact'][k] is None and result['projection'][k] is None
            else:
                assert len(result['expected'][k])==len(v)==len(result['projection'][k])
                assert [R(int(a),int(b)) for a,b in result['expected'][k]]==v
                assert [R(int(a),int(b)) for a,b in result['candidate_exact'][k]]==v
                assert result['projection'][k]==[candidate.project((q.numerator,q.denominator)) for q in v]
    u=math.ulp(1.)
    tiny=math.ulp(0.)
    maximum=sys.float_info.max
    base=[[0.,1.,3.],[2.,5.,9.],[-4.,1.,7.],[8.,9.,13.]]
    named={
        'third_mean':[[1.,1.,1.+u] for _ in range(4)],
        'third_mean_offset':[[2.**900,2.**900,math.nextafter(2.**900,math.inf)] for _ in range(4)],
        'opposite_max': [[-maximum,maximum] for _ in range(4)],
        'mixed':[[0.,tiny],[1.,1.5],[2.,2.5],[2.**600,2.**600]],
        'zero_sse': [[v,v,v] for v in (-3.,0.,2.,11.)],
        'positive_sse_zero_projection':[[0.,tiny] for _ in range(4)],
        'positive_f_zero_projection':[[-1.,1.],[-1.,1.],[-1.,1.],[0.,tiny]],
        'signed_zero': [[-0.,0.] for _ in range(4)],
        'asymmetric_n3':base,
        'offset':[[v+2.**40 for v in c] for c in base],
        'reverse_units':[c[::-1] for c in base],
        'reverse_a':[base[i] for i in (2,3,0,1)],
        'reverse_b':[base[i] for i in (1,0,3,2)],
        'exchange':[base[i] for i in (0,2,1,3)],
        'negate':[[-v for v in c] for c in base],
        'scale_down':[[math.ldexp(v,-700) for v in c] for c in base],
        'scale_up':[[math.ldexp(v,700) for v in c] for c in base],
    }
    results={k:assess(c,'additional') for k,c in named.items()}
    r=results['third_mean']
    assert r['means']==[R(1)+R(2)**-52/3]*4
    assert r['sse']==[R(8,3)*R(2)**-104] and r['f']==[0,0,0]
    raw=sum(sum((v-sum(c)/3)**2 for v in c) for c in named['third_mean'])
    assert hexrat(raw)/r['sse'][0]==R(3,2)
    assert results['opposite_max']['sse']==[8*hexrat(maximum)**2]
    assert results['positive_sse_zero_projection']['sse']==[R(2)**-2147]
    t=R(2)**-1074
    assert results['positive_f_zero_projection']['f']==[t*t/(12+t*t)]*3
    assert results['mixed']['sse']==[R(1,4)+t*t/2]
    b=results['asymmetric_n3']
    assert results['reverse_units']==b
    for name,signs in [('reverse_a',[-1,1,-1]),('reverse_b',[1,-1,-1]),('negate',[-1,-1,-1])]:
        assert results[name]['estimates']==[s*v for s,v in zip(signs,b['estimates'])]
        assert all(results[name][k]==b[k] for k in ('ss','sse','df','f'))
    assert results['exchange']['f']==[b['f'][1],b['f'][0],b['f'][2]]
    assert results['exchange']['estimates']==[b['estimates'][1],b['estimates'][0],b['estimates'][2]]
    assert all(results['offset'][k]==b[k] for k in ('ss','sse','df','f','estimates'))
    for name,e in [('scale_down',-700),('scale_up',700)]:
        assert results[name]['f']==b['f']
        assert results[name]['ss']==[v*R(2)**(2*e) for v in b['ss']]
        assert results[name]['sse']==[b['sse'][0]*R(2)**(2*e)]
        assert all(hexrat(y)==hexrat(x)*R(2)**e for c,d in zip(base,named[name]) for x,y in zip(c,d))
    rng=random.Random(2792864903)
    for _ in range(120):
        n=rng.randrange(2,10)
        cells=[]
        for c in range(4):
            cell=[]
            for i in range(n):
                bits=(rng.randrange(2)<<63)|(rng.randrange(2047)<<52)|rng.getrandbits(52)
                cell.append(struct.unpack('>d',struct.pack('>Q',bits))[0])
            cells.append(cell)
        assess(cells,'additional')
    # All normal binade transitions, boundary neighbors, both tie parities and signs.
    for e in range(-1022,1024):
        x=R(2)**e
        below=hexrat(math.nextafter(float(x),0.))
        above=hexrat(math.nextafter(float(x),math.inf))
        for q in (x,(below+x)/2,(x+above)/2,(x+3*above)/4):
            for sign in (-1,1):
                check_projection(sign*q,candidate)
                counts['projection_boundaries']+=1
    for q in (R(0),t,t/2,t/4,3*t/2,5*t/2,hexrat(maximum),hexrat(maximum)+1,2*hexrat(maximum),R(1,3)):
        for sign in (-1,1):
            check_projection(sign*q,candidate)
            counts['projection_boundaries']+=1
    assert float(hexrat(maximum)+1)==maximum
    assert candidate.project(((hexrat(maximum)+1).numerator,1))['nearest'] is None
    invalid=[[],[[1.,2.]]*3,[[1.,2.]]*5,[[1.]]*4,[[],[],[],[]],[[1.,2.],[1.,2.,3.],[1.,2.],[1.,2.]],[[0.,math.inf]]*4,[[0.,-math.inf]]*4,[[0.,math.nan]]*4]
    for cells in invalid:
        try: candidate.exact_candidate(cells)
        except ValueError: pass
        else: raise AssertionError('invalid accepted')
    # Internal helper preconditions are not enforced; characterize without widening domain.
    coercion=[]
    for label,value in [('bool',True),('int_rounding',2**53+1),('string','1'),('none',None)]:
        try:
            result=candidate.lattice(value)
            coercion.append(dict(input_kind=label,accepted=True,decoded=str(R(result,2**1074))))
        except (TypeError,ValueError,OverflowError,struct.error) as err:
            coercion.append(dict(input_kind=label,accepted=False,error=type(err).__name__))
    bad_projection={str(p):candidate.project(p) for p in ((0,0),(1,0),(1,-1))}
    fresh=json.loads((replay/'historical-fresh.json').read_text())
    old=json.loads((packet/'results/historical-rerun.json').read_text())
    historical_keys=[k for k in old if k!='environment']
    assert all(fresh[k]==old[k] for k in historical_keys)
    resources=json.loads((replay/'resources.json').read_text())
    assert resources['exponent_edge_decode_checks']==20470
    assert [r['observations'] for r in resources['workloads']]==[8,64,1024,16384]
    float_rows=json.loads((replay/'float-results.json').read_text())
    witness=next(r for r in float_rows if r['name']=='mean_rounding_n3')
    assert float.fromhex(witness['graph_outputs']['raw_qr']['f'][1])==2.25
    nmax=2**51-1
    zmax=(2**53-1)*2**2045
    bounds={'z':zmax,'S':nmax*zmax,'Q':nmax*zmax*zmax,'C':4*nmax*zmax,
            'E':4*nmax*nmax*zmax*zmax,'F_numerator':16*nmax*nmax*(nmax-1)*zmax*zmax,
            'denominator':4*nmax*nmax*zmax*zmax}
    bounds['projection_product']=2*zmax*bounds['denominator']
    bounds['twice_target']=2*bounds['F_numerator']*2**1074
    assert bounds['E']<2**4300 and bounds['F_numerator']<2**4353
    assert max(bounds.values())<2**6500
    payload=dict(status='PASS_BOUNDED_CANDIDATE_CHECKS',review_commit=PIN,counts=counts,
        invalid_guards=len(invalid),named={k:dict(cells_hex=[[v.hex() for v in c] for c in named[k]],expected=encode(v)) for k,v in results.items()},
        raw_n3_sse=raw.hex(),raw_n3_relative_error='1/2',n3_float_witness=witness,
        helper_coercion=coercion,out_of_precondition_projection=bad_projection,
        bound_bits={k:v.bit_length() for k,v in bounds.items()},resources=resources,
        historical_equal_keys=historical_keys,historical_corpus_sha256=fresh['corpus_sha256'],
        source_sha256=hashlib.sha256((packet/'candidate.py').read_bytes()).hexdigest(),
        environment=json.loads((replay/'environment.json').read_text()),
        limits='One reviewer context, no separate-model primary-source pass. Random cases are seeded finite evidence; input coercion and malformed pairs are outside the finite-binary64/positive-denominator preconditions.')
    out.write_text(json.dumps(payload,indent=2,sort_keys=True,allow_nan=False)+'\n')
    print(json.dumps(dict(status=payload['status'],counts=counts,invalid_guards=len(invalid),bound_bits=payload['bound_bits'])))

if __name__=='__main__':
    p=argparse.ArgumentParser()
    p.add_argument('--root',type=Path,required=True)
    p.add_argument('--out',type=Path,required=True)
    p.add_argument('--replay',type=Path,required=True)
    a=p.parse_args()
    main(a.root.resolve(),a.out.resolve(),a.replay.resolve())
