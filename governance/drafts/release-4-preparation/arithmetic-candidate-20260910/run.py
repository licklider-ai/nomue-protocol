"""Reproducible exploratory comparisons; writes only to explicit --out directory."""
import argparse
import hashlib
import io
import json
import math
import os
import platform
import struct
import sys
import time
from contextlib import redirect_stdout
from fractions import Fraction as Q
from pathlib import Path
import numpy as np
from candidate import exact_candidate, lattice, project
from oracle import expected
from float_graphs import evaluate

HERE = Path(__file__).resolve().parent


def write(path, obj):
    path.write_text(json.dumps(obj, sort_keys=True, indent=2, allow_nan=False)+'\n')


def frac(q):
    return [str(q.numerator), str(q.denominator)]


def truth_json(t):
    return {k: None if v is None else [frac(q) for q in v] for k,v in t.items()}


def fixture_list():
    base = [[m-.5,m+.5] for m in (0.,2.,4.,8.)]
    cases = [('ordinary', base)]
    for e in (-600,600,-1073,1020):
        cases.append(('uniform_'+str(e), [[math.ldexp(x,e) for x in c] for c in base]))
    cases.extend([
        ('large_offset', [[x+2.**40 for x in c] for c in base]),
        ('negative_response', [[-x for x in c] for c in base]),
        ('reverse_A', [base[i] for i in (2,3,0,1)]),
        ('reverse_B', [base[i] for i in (1,0,3,2)]),
        ('swap_factors', [base[i] for i in (0,2,1,3)]),
        ('reverse_units', [c[::-1] for c in base]),
        ('mixed_legacy', [[0.,2.**-1074],[1.,1.5],[2.,2.5],[2.**600,2.**600]]),
        ('all_zero_effects', [[-.5,.5] for _ in range(4)]),
        ('zero_A_only', [[m-.5,m+.5] for m in (0.,4.,1.,3.)]),
        ('zero_SSE_nonconstant', [[m,m] for m in (0.,1.,2.,4.)]),
        ('zero_SSE_constant', [[7.,7.] for _ in range(4)]),
        ('zero_SSE_all_zero', [[0.,0.] for _ in range(4)]),
        ('positive_SSE_min_subnormal', [[0.,2.**-1074] for _ in range(4)]),
        ('positive_SSE_rounds_zero', [[0.,2.**-600] for _ in range(4)]),
        ('positive_F_rounds_zero', [[-1.,1.],[-1.,1.],[-1.,1.],[0.,2.**-1074]]),
        ('max_finite_opposite', [[-sys.float_info.max,sys.float_info.max] for _ in range(4)]),
        ('max_finite_constant', [[sys.float_info.max]*2 for _ in range(4)]),
        ('mean_rounding_n3', [[1.,1.,math.nextafter(1.,math.inf)] for _ in range(4)]),
    ])
    for n in range(2,17):
        for e in (0,20,40):
            for k in (0,20,40,52,53,54,60):
                for axis in (1,2,3):
                    signs = [(1,-1,-1,1),(1,-1,1,-1),(1,1,-1,-1),(1,1,1,1)]
                    cells = [[float(Q(2)**e+s[axis]*Q(2)**(-k)+Q(2*i-(n-1),4)) for i in range(n)] for s in signs]
                    cases.append((f'legacy_n{n}_e{e}_k{k}_axis{axis}',cells))
    return cases


def validate_projection(q, p):
    lo,hi = float.fromhex(p['lower']),float.fromhex(p['upper'])
    assert (not math.isfinite(lo) or Q(lo) <= q) and (not math.isfinite(hi) or q <= Q(hi))
    if p['nearest'] is None:
        assert abs(q) > Q(sys.float_info.max)
        return
    # Independent conversion path: Python Fraction -> float, plus nextafter.
    r = float(q)
    actual = float.fromhex(p['nearest'])
    assert actual.hex() == r.hex() or actual == r == 0
    if Q(r) == q:
        assert lo == hi == r
    elif Q(r) < q:
        assert lo == r and hi == math.nextafter(r,math.inf)
    else:
        assert hi == r and lo == math.nextafter(r,-math.inf)


def main(out):
    out.mkdir(parents=True, exist_ok=True)
    cases = fixture_list()
    inputs = [{'name': name, 'n':len(cells[0]), 'cells_hex': [[x.hex() for x in c] for c in cells]} for name,cells in cases]
    write(out/'inputs.json', inputs)
    exact_rows, observations, summary = [], [], {}
    exact_checks = projection_checks = decode_checks = 0
    cached_projection = {}
    started = time.perf_counter()
    for name,cells in cases:
        t = expected(cells)  # expectation first; separate module, no candidate call
        candidate = exact_candidate(cells)
        for cell in cells:
            for x in cell:
                assert Q(lattice(x),1<<1074) == Q(*x.as_integer_ratio())
                decode_checks += 1
        projected = {}
        for key, values in t.items():
            if values is None:
                assert candidate[key] is None
                projected[key] = None
                continue
            assert values == [Q(*p) for p in candidate[key]], (name,key)
            exact_checks += len(values)
            projected[key] = []
            for q,pair in zip(values,candidate[key]):
                if pair not in cached_projection:
                    cached_projection[pair] = project(pair)
                p = cached_projection[pair]
                validate_projection(q,p)
                projection_checks += 1
                projected[key].append(p)
        routes, shift, transformed = evaluate(cells)
        tt = expected(transformed)
        loss = []
        scale = Q(2)**shift
        for i,(cell,scaled_cell) in enumerate(zip(cells,transformed)):
            for j,(x,z) in enumerate(zip(cell,scaled_cell)):
                if Q(z) != Q(x)*scale:
                    loss.append(i*len(cell)+j)
        assert loss or tt['f'] == t['f']
        for route, values in routes.items():
            target = tt if route.startswith('scaled') else t
            for key, observed in values.items():
                m = summary.setdefault(route,{}).setdefault(key,dict(values=0,projected_matches=0,nonfinite=0,spurious_nonzero=0,positive_target_observed_zero=0,undefined_target_finite=0,max_abs_error='0'))
                if target[key] is None:
                    m['undefined_target_finite'] += sum(math.isfinite(float(v)) for v in observed)
                    continue
                for v,q in zip(observed,target[key]):
                    v = float(v)
                    m['values'] += 1
                    try: r = float(q)
                    except OverflowError: r = math.inf if q>0 else -math.inf
                    m['projected_matches'] += v.hex() == r.hex() or v == r == 0
                    m['nonfinite'] += not math.isfinite(v)
                    m['spurious_nonzero'] += q == 0 and math.isfinite(v) and v != 0
                    m['positive_target_observed_zero'] += q > 0 and v == 0
                    if math.isfinite(v):
                        err = abs(Q(v)-q)
                        if err > Q(m['max_abs_error']): m['max_abs_error'] = str(err)
        exact_rows.append(dict(name=name, expected=truth_json(t), candidate_exact={k:None if v is None else [[str(a),str(b)] for a,b in v] for k,v in candidate.items()}, projection=projected))
        observations.append(dict(name=name, scaling_exponent=shift, transformed_hex=[[v.hex() for v in c] for c in transformed], conversion_loss_indices=loss,
            transformed_exact=truth_json(tt), exact_F_preserved=None if t['f'] is None or tt['f'] is None else t['f']==tt['f'],
            graph_outputs={r:{k:[float(v).hex() for v in vv] for k,vv in vals.items()} for r,vals in routes.items()}))
    byname = {r['name']:r for r in exact_rows}
    t0 = expected(cases[0][1])
    assert t0['estimates'] == [5,3,2] and t0['ss'] == [50,18,2] and t0['sse']==[2] and t0['f']==[100,36,4]
    # Metamorphic checks use independently computed expectations.
    mapping = dict(cases)
    for name,signs in [('reverse_A',[-1,1,-1]),('reverse_B',[1,-1,-1]),('negative_response',[-1,-1,-1])]:
        t = expected(mapping[name])
        assert t['estimates'] == [s*v for s,v in zip(signs,t0['estimates'])]
        assert t['ss']==t0['ss'] and t['f']==t0['f'] and t['sse']==t0['sse']
    ts = expected(mapping['swap_factors'])
    assert ts['estimates']==[t0['estimates'][1],t0['estimates'][0],t0['estimates'][2]]
    assert ts['f']==[36,100,4]
    assert expected(mapping['reverse_units']) == t0
    for name in ('uniform_-600','uniform_600','uniform_-1073','uniform_1020','large_offset'):
        assert expected(mapping[name])['f'] == t0['f']
    assert byname['positive_SSE_min_subnormal']['projection']['sse'][0]['status']=='nonzero_rounds_to_zero'
    assert byname['positive_F_rounds_zero']['projection']['f'][0]['status']=='nonzero_rounds_to_zero'
    assert observations[11]['name']=='mixed_legacy' and observations[11]['conversion_loss_indices']==[1]
    # Negative guards and projection ties/boundaries, outside statistical fixtures.
    invalid = [[[0.,1.]]*3, [[0.]]*4, [[0.,1.],[0.,1.,2.],[0.,1.],[0.,1.]], [[0.,math.inf]]*4, [[0.,math.nan]]*4]
    for cells in invalid:
        try: exact_candidate(cells)
        except ValueError: pass
        else: raise AssertionError('invalid input accepted')
    probe_values = [Q(0),Q(1,3),-Q(1,3),Q(1,1<<1075),-Q(1,1<<1075), Q(3,1<<1075), Q(sys.float_info.max), Q(sys.float_info.max)+1,
                    Q(sys.float_info.max)*2, -Q(sys.float_info.max)*2,Q(1)+Q(1,1<<53),Q(1)+Q(3,1<<53)]
    for q in probe_values: validate_projection(q,project((q.numerator,q.denominator)))
    elapsed = time.perf_counter()-started
    write(out/'exact-results.json',exact_rows)
    write(out/'float-results.json',observations)
    write(out/'summary.json',dict(status='AUTHOR_EXPLORATORY_NOT_INDEPENDENTLY_REVIEWED',cases=len(cases),legacy_cases=945,
        exact_quantity_equalities=exact_checks,projection_checks=projection_checks,lattice_decode_checks=decode_checks,
        invalid_guard_checks=len(invalid),projection_boundary_checks=len(probe_values),float_metrics=summary,
        disclaimer='Finite observed errors are descriptive, not a tolerance or supported-domain proof. Scaled metrics compare transformed-input truth; loss is separately recorded.'))
    buf=io.StringIO()
    with redirect_stdout(buf): np.show_config()
    write(out/'environment.json',dict(python=sys.version,numpy=np.__version__,platform=platform.platform(),machine=platform.machine(),
        numpy_config=buf.getvalue(),float_info=str(sys.float_info),thread_env={k:os.environ.get(k) for k in ('OPENBLAS_NUM_THREADS','OMP_NUM_THREADS','MKL_NUM_THREADS')},
        elapsed_seconds=elapsed,clock='perf_counter wall time, combined experiment; not a resource guarantee',
        source_sha256={p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in HERE.glob('*.py')}))
    print(json.dumps(dict(cases=len(cases),exact_checks=exact_checks,projection_checks=projection_checks,seconds=elapsed)))

if __name__ == '__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--out',type=Path,required=True)
    main(parser.parse_args().out)
