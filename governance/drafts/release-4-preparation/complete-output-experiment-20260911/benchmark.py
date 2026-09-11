"""Isolated Linux full-call probes; measured evidence, not latency guarantees."""
import json
import platform
from pathlib import Path
import random
import resource
import subprocess
import sys
import time

HERE=Path(__file__).resolve().parent


def cells_for(name):
    if name=='zero-65':
        return [[float(i%2) for i in range(65)] for _ in range(4)]
    if name=='wide-33':
        return [[float(i%2) for i in range(33)] for _ in range(3)]+[[2.**116]*33]
    n=int(name.split('-')[1]); rng=random.Random(n)
    return [[rng.random()*10 for _ in range(n)] for _ in range(4)]


def child(name):
    resource.setrlimit(resource.RLIMIT_AS,(256*1024*1024,256*1024*1024))
    start=time.perf_counter()
    import complete as m
    cells=cells_for(name)
    if name.startswith('stress-'):
        original=m.projection
        calls=0
        def force_full_schedule(bounds):
            nonlocal calls
            calls+=1
            return original(bounds) if calls%3==0 else None
        m.projection=force_full_schedule
    try:
        result=m.complete(cells,'benchmark')
        decision={'outcome':result['outcome']}
        if result['outcome']=='complete_experiment':
            decision['tail_bits']=[result['tails'][a]['bits'] for a in m.AXES]
            decision['F_widths']=[max(abs(x).bit_length(),y.bit_length()) for x,y in result['exact']['f']]
    except m.Refusal as e:
        decision={'outcome':'planned_refusal','stage':e.stage,'quantity':e.quantity,'reason':e.reason}
    print(json.dumps({'name':name,'input_hex':[[x.hex() for x in c] for c in cells],
                      'decision':decision,'elapsed_seconds':time.perf_counter()-start,
                      'peak_rss_kib':resource.getrusage(resource.RUSAGE_SELF).ru_maxrss}))


def main():
    if len(sys.argv)==3 and sys.argv[1]=='--child':
        child(sys.argv[2]);return
    rows=[]
    for name in ['ordinary-2','ordinary-5','ordinary-17','ordinary-33','ordinary-46','ordinary-47','ordinary-65','zero-65','wide-33','stress-46']:
        for optimized in (False,True):
            cmd=[sys.executable]+(['-O'] if optimized else [])+[str(Path(__file__).resolve()),'--child',name]
            # Timeout/MemoryError/unexpected exceptions fail the experiment, not a refusal.
            run=subprocess.run(cmd,cwd=HERE,capture_output=True,text=True,timeout=30,check=True)
            row=json.loads(run.stdout);row['optimized']=optimized;rows.append(row)
        if rows[-1]['decision']!=rows[-2]['decision']:
            raise ValueError('normal/optimized decision mismatch')
    print(json.dumps({'python':platform.python_version(),'platform':platform.platform(),
                      'timeout_seconds_per_process':30,'address_space_mib':256,
                      'rows':rows},indent=2,sort_keys=True))


if __name__=='__main__':
    main()
