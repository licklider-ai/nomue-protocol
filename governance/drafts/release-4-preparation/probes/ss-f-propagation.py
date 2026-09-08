"""Disposable research: exact input algebra versus three explicit float graphs.
No inferential calibration, supported domain, algorithm or tolerance is selected.
"""
from fractions import Fraction as Q
import hashlib
import io
import json
import math
import platform
from contextlib import redirect_stdout
from pathlib import Path
import numpy as np

SIGNS = [(1, -1, -1, 1), (1, -1, 1, -1),
         (1, 1, -1, -1), (1, 1, 1, 1)]

def exact(y, n):
    a = [Q(float(v)) for v in y]
    means = [sum(a[c*n:(c+1)*n]) / n for c in range(4)]
    beta = [sum(means[c]*SIGNS[c][j] for c in range(4))/4
            for j in range(4)]
    ss = [4*n*b*b for b in beta[1:]]
    sse = sum((a[c*n+i]-means[c])**2 for c in range(4) for i in range(n))
    # Different exact arrangement: total minus fitted squared norm, plus partition.
    assert sse == sum(v*v for v in a)-n*sum(m*m for m in means)
    total = sum((v-beta[0])**2 for v in a)
    assert total == sse+sum(ss)
    f = [v/(sse/(4*(n-1))) for v in ss] if sse else None
    return {'ss': ss, 'sse': [sse], 'f': f}

def graphs(y, n):
    X = np.array([s for s in SIGNS for _ in range(n)], dtype=np.float64)
    q, r = np.linalg.qr(X, mode='reduced')
    means = [sum(float(v) for v in y[c*n:(c+1)*n])/n for c in range(4)]
    b = [sum(means[c]*SIGNS[c][j] for c in range(4))/4 for j in range(4)]
    residual = [float(y[c*n+i])-means[c] for c in range(4) for i in range(n)]
    out = [('builtin_cell', b, residual)]
    for name, response in [('qr', y), ('centered_qr', y-y[0])]:
        beta = np.linalg.solve(r, q.T @ response)
        out.append((name, beta, response-X @ beta))
    answer = {}
    with np.errstate(all='ignore'):
        for name, beta, residual in out:
            # Explicit binary64 node order; residual aggregation uses builtin sum.
            ss = [float(np.float64(4*n)*np.float64(v)*np.float64(v)) for v in beta[1:]]
            sse = float(sum(float(np.float64(v)*np.float64(v)) for v in residual))
            mse = float(np.float64(sse)/np.float64(4*(n-1)))
            f = [float(np.float64(v)/np.float64(mse)) for v in ss]
            answer[name] = {'ss': ss, 'sse': [sse], 'f': f}
    return answer

def projection(v):
    try: return float(v)
    except OverflowError: return math.copysign(math.inf, v.numerator)

def new_metrics():
    return dict(values=0, exact_real_matches=0, projected_matches=0,
                nonfinite=0, spurious_nonzero_from_exact_zero=0,
                zero_when_projected_truth_nonzero=0)

summary = {name: {k: new_metrics() for k in ('ss','sse','f')}
           for name in ('builtin_cell','qr','centered_qr')}
rows = []
witnesses = []
for n in range(2,17):
    for e in (0,20,40):
        for k in (0,20,40,52,53,54,60):
            for axis in (1,2,3):
                y = np.array([float(Q(2)**e+s[axis]*Q(2)**(-k)+Q(2*i-(n-1),4))
                              for s in SIGNS for i in range(n)], dtype=np.float64)
                truth = exact(y,n)
                assert truth['f'] is not None
                routes = graphs(y,n)
                for name, values in routes.items():
                    for quantity in ('ss','sse','f'):
                        for j,(v,t) in enumerate(zip(values[quantity],truth[quantity])):
                            m=summary[name][quantity];m['values']+=1
                            m['nonfinite']+=not math.isfinite(v)
                            m['exact_real_matches']+=math.isfinite(v) and Q(v)==t
                            m['projected_matches']+=v.hex()==projection(t).hex()
                            m['spurious_nonzero_from_exact_zero']+=t==0 and v!=0
                            m['zero_when_projected_truth_nonzero']+=v==0 and projection(t)!=0
                            if quantity=='f' and j==axis-1 and t==0 and v!=0 and len(witnesses)<2:
                                witnesses.append(dict(n=n,e=e,k=k,axis=axis,route=name,
                                                      truth=str(t),observed=v.hex()))
                rows.append(dict(n=n,e=e,k=k,axis=axis,
                    truth={key:[str(v) for v in val] for key,val in truth.items()},
                    observed={name:{key:[v.hex() for v in val] for key,val in values.items()}
                              for name,values in routes.items()}))

# Explicit domain diagnostic: an exactly zero residual must not become valid F
# solely because a floating residual is spuriously positive. No refusal code chosen.
zero_residual = []
for means in ([7.,7.,7.,7.],[0.,1.,2.,4.],[2.**40,2.**40+1,2.**40+2,2.**40+4]):
    y=np.repeat(np.array(means),2);truth=exact(y,2);assert truth['f'] is None
    vals=graphs(y,2)
    zero_residual.append(dict(cell_means=[v.hex() for v in means],exact_sse='0',
        routes={name:{'sse':values['sse'][0].hex(),
                      'finite_f_count':sum(math.isfinite(v) for v in values['f']),
                      'f':[v.hex() for v in values['f']]}
                for name,values in vals.items()}))

buf=io.StringIO()
with redirect_stdout(buf): np.show_config()
payload=json.dumps(rows,sort_keys=True,separators=(',',':')).encode()
result=dict(status='AUTHOR_EXPLORATORY_NOT_REVIEWED',cases=len(rows),
    comparison_values_per_quantity=dict(ss=2835,sse=945,f=2835),
    environment=dict(python=platform.python_version(),numpy=np.__version__,
                     machine=platform.machine(),numpy_configuration=buf.getvalue(),
                     threading='not pinned; no portability claim'),
    script_sha256=hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
    corpus_sha256=hashlib.sha256(payload).hexdigest(),summary=summary,
    witnesses=witnesses,zero_residual_diagnostics=zero_residual)
print(json.dumps(result,indent=2,sort_keys=True))
