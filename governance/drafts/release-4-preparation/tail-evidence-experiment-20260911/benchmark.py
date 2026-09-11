"""Whole-consumer subprocess probes; fixtures are generated outside timed calls."""
import json
import platform
from pathlib import Path
import random
import resource
import subprocess
import sys
import tempfile
import time
from fractions import Fraction as Q

HERE = Path(__file__).resolve().parent


def full_schedule(m):
    original = m.projection
    calls = 0
    def project(bounds):
        nonlocal calls
        calls += 1
        return original(bounds) if calls % 3 == 0 else None
    m.projection = project


def fib(n):
    if n == 0: return 0, 1
    a, b = fib(n//2)
    c, d = a*(2*b-a), a*a+b*b
    return (d, c+d) if n%2 else (c, d)


def prepare(name):
    import consumer as c
    from test_consumer import packet
    n = int(name.split('-')[1]); rng = random.Random(n)
    cells = [[rng.random()*10 for _ in range(n)] for _ in range(4)]
    if name.startswith('zero'): cells = [[float(i%2) for i in range(n)]]*4
    if name.startswith('wide'): cells = [[float(i%2) for i in range(n)]]*3+[[2.**116]*n]
    # Generate the wider 128-bit producer interval; it also contains any tighter
    # 512-bit interval used by the forced-schedule consumer stress probe.
    result = c.target.complete(cells, 'benchmark')
    submission = packet(result)
    if not name.startswith('zero'):
        denominator = 1 << (c.CAP-1)
        for row in submission['rows']:
            lower, upper = Q(*row['lower']), Q(*row['upper'])
            # Outward dyadic approximation, almost cap-size valid evidence.
            lo = Q((lower.numerator*denominator)//lower.denominator, denominator)
            hi = Q(-((-upper.numerator*denominator)//upper.denominator), denominator)
            row['lower'], row['upper'] = (lo.numerator,lo.denominator), (hi.numerator,hi.denominator)
    if name.startswith('fibonacci'):
        a, b = fib(377570)
        if b.bit_length() > c.CAP: raise RuntimeError('Fibonacci fixture size')
        for row in submission['rows']: row['lower'] = row['upper'] = (a,b)
    widths = [max(abs(x).bit_length(), y.bit_length()) for x,y in result['exact']['f']]
    for row in submission['rows']:
        for key in ('lower','upper'): row[key] = [hex(x) for x in row[key]]
    return {'cells': [[x.hex() for x in row] for row in cells], 'submission': submission,
            'F_widths': widths}


def child(name, path):
    resource.setrlimit(resource.RLIMIT_AS, (256*1024*1024,256*1024*1024))
    start = time.perf_counter()
    import consumer as c
    data = json.loads(Path(path).read_text())
    cells = [[float.fromhex(x) for x in row] for row in data['cells']]
    submitted = data['submission']; submitted['rows'] = tuple(submitted['rows'])
    for row in submitted['rows']:
        row['df'] = tuple(row['df'])
        for key in ('lower','upper'): row[key] = tuple(int(x,16) for x in row[key])
    endpoint_bits = max(x.bit_length() for row in submitted['rows'] for key in ('lower','upper') for x in row[key])
    if name.startswith(('stress','fibonacci')): full_schedule(c.target)
    try:
        result = c.consume(cells, 'benchmark', submitted)
        decision = result['outcome']
    except c.EvidenceRefusal as error:
        decision = str(error)
    expected = 'candidate containment' if name.startswith('fibonacci') else 'probability_evidence_consistent_experiment'
    if decision != expected: raise RuntimeError('unexpected benchmark decision: '+decision)
    print(json.dumps({'name': name, 'decision': decision, 'F_widths': data['F_widths'],
                      'endpoint_bits': endpoint_bits, 'input_hex': data['cells'],
                      'elapsed_seconds': time.perf_counter()-start,
                      'peak_rss_kib': resource.getrusage(resource.RUSAGE_SELF).ru_maxrss}))


def main():
    if len(sys.argv)==4 and sys.argv[1]=='--child':
        child(sys.argv[2],sys.argv[3]); return
    rows=[]
    with tempfile.TemporaryDirectory() as folder:
        for name in ('ordinary-2','ordinary-46','wide-33','zero-65','stress-46','fibonacci-46'):
            path=Path(folder)/'fixture.json'
            path.write_text(json.dumps(prepare(name)))
            for optimized in (False, True):
                cmd=[sys.executable]+(['-O'] if optimized else [])+[str(Path(__file__).resolve()),'--child',name,str(path)]
                run=subprocess.run(cmd,cwd=HERE,capture_output=True,text=True,timeout=30,check=True)
                row=json.loads(run.stdout);row['optimized']=optimized;rows.append(row)
            if rows[-1]['decision']!=rows[-2]['decision']: raise RuntimeError('optimization mismatch')
    print(json.dumps({'python':platform.python_version(),'platform':platform.platform(),
                      'address_space_mib':256,'timeout_seconds':30,'rows':rows},indent=2))


if __name__=='__main__': main()
