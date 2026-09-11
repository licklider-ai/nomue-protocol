"""Disposable in-memory experiment, not a Record API or supported check."""
from fractions import Fraction as Q
import hashlib
import json
import math
from pins import verify
verify()
from upstream_arithmetic import exact_candidate
from rational_candidate import finite_enclosure
from rational_oracle import projection


def prepare(cells, revision, contrast):
    if type(revision) is not str or not revision or contrast not in ('A', 'B', 'AB'):
        raise ValueError('identity')
    if type(cells) is not list or len(cells) != 4 or any(type(c) is not list for c in cells):
        raise ValueError('cells')
    n = len(cells[0])
    if not 2 <= n <= 65 or any(len(c) != n for c in cells):
        raise ValueError('count')
    if any(type(x) is not float or not math.isfinite(x) for c in cells for x in c):
        raise ValueError('observations')
    payload = ['r4-composition-experiment-v1', revision, ['A0B0','A0B1','A1B0','A1B1'],
               [[x.hex() for x in c] for c in cells]]
    digest = hashlib.sha256(json.dumps(payload, ensure_ascii=True, separators=(',', ':')).encode()).hexdigest()
    exact = exact_candidate(cells)
    if Q(*exact['sse'][0]) <= 0:
        raise ValueError('exact SSE is zero')
    f = Q(*exact['f'][('A','B','AB').index(contrast)])
    return {'digest':digest, 'revision':revision, 'contrast':contrast, 'n':n, 'df':4*(n-1),
            'sse':Q(*exact['sse'][0]), 'lower':f, 'upper':f}


def tail(lower, upper, n, precisions=(128,256,512)):
    if type(lower) is not Q or type(upper) is not Q or not 0 <= lower <= upper:
        raise ValueError('F interval')
    if type(precisions) is not tuple or not precisions or len(precisions)>3 or any(type(b) is not int or not 8<=b<=512 for b in precisions):
        raise ValueError('precision budget')
    for bits in precisions:
        left = finite_enclosure(upper,n,bits)
        right = left if lower == upper else finite_enclosure(lower,n,bits)
        bounds = (left[0],right[1])
        rounded = projection(bounds)
        if rounded is not None:
            return {'bounds':bounds, 'encoding':rounded, 'status':'resolved', 'bits':bits}
    return {'bounds':bounds, 'encoding':None, 'status':'unresolved', 'bits':bits}


def compose(cells, revision, contrast, carrier):
    expected = prepare(cells,revision,contrast)
    if type(carrier) is not dict or set(carrier)!=set(expected):
        raise ValueError('carrier shape')
    for key in expected:
        if key in ('lower','upper'):
            continue
        if type(carrier[key]) is not type(expected[key]) or carrier[key]!=expected[key]:
            raise ValueError('carrier binding')
    lo,hi = carrier['lower'],carrier['upper']
    if type(lo) is not Q or type(hi) is not Q or not 0<=lo<=expected['lower']<=hi:
        raise ValueError('upstream containment')
    return tail(lo,hi,expected['n'])
