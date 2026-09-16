"""Trusted research worker. Does not edit or launch the historical numerical worker."""
import json
import os
from pathlib import Path
import resource
import signal
import subprocess
import sys
import time
from common import data, load_g5, sha

profile = json.loads(Path('/harness/profiles.json').read_text())[sys.argv[1]]
control = sys.argv[2]
expected_mode = int(sys.argv[3])
if sys.flags.optimize != expected_mode:
    raise RuntimeError('worker optimization mismatch')
mem = profile['worker_mib']*1024**2
cpu = 1 if control == 'cpu' else profile['cpu']
resource.setrlimit(resource.RLIMIT_AS,(mem,mem))
resource.setrlimit(resource.RLIMIT_CPU,(cpu,cpu+1))
resource.setrlimit(resource.RLIMIT_CORE,(0,0))
start=time.monotonic()
try:
    if control in ('timeout','descendant','escaped-descendant'):
        if control != 'timeout':
            subprocess.Popen([sys.executable,'-B','-c','import signal,time; signal.signal(signal.SIGTERM,signal.SIG_IGN); time.sleep(120)'],start_new_session=control=='escaped-descendant')
        signal.signal(signal.SIGTERM,signal.SIG_IGN)
        time.sleep(120)
    if control == 'cpu':
        while True: pass
    if control == 'crash': os._exit(23)
    if control == 'memory':
        blocks=[]
        while True: blocks.append(bytearray(8*1024**2))
    if control in ('stdout','stderr'):
        stream=sys.stdout.buffer if control=='stdout' else sys.stderr.buffer
        while True: stream.write(b'x'*65536); stream.flush()
    if control == 'malformed':
        print('{broken'); sys.exit(0)
    # This is generated internal transport, never raw Record text.
    raw=sys.stdin.buffer.read(profile['transport']+1)
    if len(raw)>profile['transport']: raise ValueError('internal input bound')
    item=json.loads(raw)
    p=load_g5()
    out=p.run(item['record'],item['integrity_ok'],item['envelope_ok'])
    if control=='partial': out['quantities']=out['quantities'][:7]
    if control=='wrong-identity': out['candidate_identity']='0'*64
    if control=='report-overflow': out['extra']='x'*profile['report']
    usage=resource.getrusage(resource.RUSAGE_SELF)
    capsule={'result':out,'input_sha256':sha(raw),'mode':sys.flags.optimize,
             'limits':{'cpu':[cpu,cpu+1],'address_space':[mem,mem]},
             'cpu_seconds':usage.ru_utime+usage.ru_stime,'rss_kib':usage.ru_maxrss,
             'wall_seconds':time.monotonic()-start}
    sys.stdout.buffer.write(data(capsule))
except MemoryError:
    os._exit(71)
