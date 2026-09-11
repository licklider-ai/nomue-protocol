"""Author-side integration checks with a separate arithmetic formula and tail oracle."""
from fractions import Fraction as Q
from pathlib import Path
from unittest.mock import patch
import hashlib
import json
import random
import shutil
import subprocess
import sys
import tempfile
import complete as m
import rational_oracle as oracle

HERE = Path(__file__).resolve().parent
counts = {}
records = []


def check(ok, name):
    if not ok:
        raise ValueError('test failed: ' + name)
    counts[name] = counts.get(name, 0) + 1


def independent(cells):
    data = [[Q(x) for x in cell] for cell in cells]
    n = len(data[0])
    a, b, c, d = [sum(cell)/n for cell in data]
    estimates = [(-a-b+c+d)/2, (-a+b-c+d)/2, a-b-c+d]
    ss = [n*estimates[0]**2, n*estimates[1]**2, n*estimates[2]**2/4]
    sse = sum((x-sum(cell)/n)**2 for cell in data for x in cell)
    return {'estimates': estimates, 'ss': ss, 'sse': [sse], 'f': [x*4*(n-1)/sse for x in ss]}


def accepted(cells, name, oracle_check=True):
    result = m.complete(cells, 'fixture')
    check(result['outcome'] == 'complete_experiment', 'complete')
    expected = independent(cells)
    for key, values in expected.items():
        check([Q(*p) for p in result['exact'][key]] == values, 'arithmetic oracle')
        for value, display in zip(values, result['displays'][key]):
            check(float(value).hex() == display['nearest'], 'display oracle')
    check(sum(len(v) for v in result['exact'].values())+len(result['tails']) == 13, 'quantity inventory')
    check(result['df'] == {axis: (1, 4*(len(cells[0])-1)) for axis in m.AXES}, 'df')
    for axis, f in zip(m.AXES, expected['f']):
        tail = result['tails'][axis]
        if oracle_check:
            bounds = oracle.oracle(f, len(cells[0]), 256)
            check(oracle.projection(bounds) == tail['encoding'], 'tail independent formula')
            check(max(bounds[0], tail['bounds'][0]) <= min(bounds[1], tail['bounds'][1]), 'tail overlap')
    records.append({'name': name, 'cells': [[x.hex() for x in cell] for cell in cells],
                    'digest': result['identity']['digest'],
                    'tail_encodings': [result['tails'][k]['encoding'] for k in m.AXES]})
    return result


def rejected(cells, revision, stage, quantity, reason):
    with patch.object(m, 'evaluate_tail', side_effect=RuntimeError('tail before admission')) as tail:
        try:
            m.complete(cells, revision)
        except m.Refusal as error:
            check((error.stage, error.quantity, error.reason) == (stage, quantity, reason), 'precise refusal')
        else:
            raise ValueError('expected refusal')
        check(tail.call_count == 0, 'no tail before admission')


def main():
    ordinary = [[0.,1.],[1.,2.],[2.,3.],[4.,5.]]
    accepted(ordinary, 'ordinary')
    accepted([[0.,1.] for _ in range(4)], 'all-zero-effects')
    small = [[0.,1.] for _ in range(4)]
    small[-1][0] = float.fromhex('0x0.0000000000001p-1022')
    r = accepted(small, 'positive-F-rounds-zero')
    check(all(Q(*f)>0 for f in r['exact']['f']) and
          all(d['status']=='nonzero_rounds_to_zero' for d in r['displays']['f']), 'positive F retained')
    for seed in range(8):
        rng=random.Random(seed)
        accepted([[rng.randrange(-20,21)/8 for _ in range(2+seed%4)] for _ in range(4)], 'dyadic-'+str(seed))
    wide=accepted([[float(i%2) for i in range(33)] for _ in range(3)]+[[2.**116]*33], 'wide-positive-tail-rounds-zero')
    check(all(t['encoding']==0 and t['bounds'][0]>0 for t in wide['tails'].values()), 'positive probability rounded zero')
    rejected([], '', 1, 'cells', 'shape')
    rejected([[0.]]*4, '', 1, 'cells', 'count')
    rejected(ordinary, 'x'*65, 2, 'revision', 'identity')
    rejected(ordinary, 'é', 2, 'revision', 'identity')
    rejected([[0,1.]]*4, 'r', 3, 'observations', 'finite binary64')
    rejected([[float('nan'),1.]]*4, 'r', 3, 'observations', 'finite binary64')
    class F(float):
        pass
    rejected([[F(0),1.]]*4, 'r', 3, 'observations', 'finite binary64')
    rejected([[float(k)]*2 for k in range(4)], 'r', 4, 'SSE', 'exact zero')
    rejected([[x*2.**-600 for x in c] for c in ordinary], 'r', 5, 'SSE', 'positive representation')
    rejected([[x*2.**600 for x in c] for c in ordinary], 'r', 5, 'ss:A', 'finite representation')
    rejected([[0.,2.**-538] for _ in range(4)], 'r', 5, 'SSE', 'positive representation')
    rejected([[0.,2.**-537] for _ in range(3)]+[[2.**500]*2], 'r', 5, 'f:A', 'finite representation')
    rng=random.Random(17)
    x=[rng.random()*10 for _ in range(65)]; y=[rng.random()*10 for _ in range(65)]
    # Exact A=AB=0; only B exceeds width budget. A still gets no tail call.
    rejected([x,y,x.copy(),y.copy()], 'r', 6, 'f:B', 'rational work budget')
    with patch.object(oracle, 'oracle', side_effect=RuntimeError('runtime oracle called')):
        check(m.complete(ordinary, 'r')['outcome']=='complete_experiment', 'candidate-only runtime')
    real=m.evaluate_tail
    def unresolved_second(f,n):
        if f==9:
            return {'bounds':(Q(0),Q(1)), 'encoding':None, 'bits':512}
        return real(f,n)
    with patch.object(m,'evaluate_tail',side_effect=unresolved_second) as tails:
        r=m.complete(ordinary,'r')
        check(r['outcome']=='unresolved_experiment' and r['quantity']=='B' and
              tuple(r['diagnostic_tails'])==('A',) and 'exact' not in r and tails.call_count==2,
              'injected unresolved control flow')
    try:
        m.assemble({},2,{}, {}, {'A':{'encoding':0}, 'B':{'encoding':0}})
    except RuntimeError as e:
        check(str(e)=='incomplete contrast construction', 'internal completeness invariant')
    else:
        raise ValueError('missing contrast accepted')
    plus=m.complete(ordinary,'r')['identity']['digest']
    changed=[c.copy() for c in ordinary]; changed[0][0]=-0.0
    check(plus!=m.complete(changed,'r')['identity']['digest'], 'signed zero identity')
    check(plus!=m.complete(ordinary,'R')['identity']['digest'], 'revision identity')
    check(plus!=m.complete([[x+1 for x in c] for c in ordinary],'r')['identity']['digest'], 'translated input identity')
    for name in m.manifest['dependencies']:
        with tempfile.TemporaryDirectory() as d:
            target=Path(d)/'packet'; shutil.copytree(HERE,target,ignore=shutil.ignore_patterns('__pycache__'))
            with (target/name).open('ab') as f: f.write(b'\n# changed\n')
            r=subprocess.run([sys.executable,'-c','import complete'],cwd=target,capture_output=True,text=True)
            check(r.returncode!=0 and 'dependency hash: '+name in r.stderr, 'dependency tamper refusal')
        # A same-named module already imported in the process must not satisfy the pin.
        stem=name[:-3]
        code=('import sys,types; sys.modules[%r]=types.ModuleType(%r); import complete'%(stem,stem))
        r=subprocess.run([sys.executable,'-c',code],cwd=HERE,capture_output=True,text=True)
        check(r.returncode!=0 and 'dependency origin: '+name in r.stderr, 'dependency origin refusal')
    print(json.dumps({'checks':counts, 'total':sum(counts.values()),'accepted_cases':records},indent=2,sort_keys=True))


if __name__=='__main__':
    main()
