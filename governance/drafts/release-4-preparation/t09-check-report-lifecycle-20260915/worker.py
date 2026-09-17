"""UNISSUED CANDIDATE. Resource wrapper around unchanged T08/G5."""
import json
import os
from pathlib import Path
import resource
import signal
import subprocess
import sys
import time
HERE=Path(__file__).resolve().parent
profile=json.loads((HERE/'PROFILE.json').read_text())
mode=int(sys.argv[1]);control=sys.argv[2]
if sys.flags.optimize!=mode:raise RuntimeError('worker mode mismatch')
mem=profile['worker_address_space_bytes'];cpu=1 if control=='cpu' else profile['cpu_soft_hard_seconds'][0]
resource.setrlimit(resource.RLIMIT_AS,(mem,mem));resource.setrlimit(resource.RLIMIT_CPU,(cpu,cpu+1));resource.setrlimit(resource.RLIMIT_CORE,(0,0))
try:
    if control in ('timeout','descendant','escaped-descendant'):
        if control!='timeout':subprocess.Popen([sys.executable,'-B','-c','import time,signal;signal.signal(signal.SIGTERM,signal.SIG_IGN);time.sleep(120)'],start_new_session=control=='escaped-descendant')
        signal.signal(signal.SIGTERM,signal.SIG_IGN);time.sleep(120)
    if control=='cpu':
        while True:pass
    if control=='crash':os._exit(23)
    if control=='memory':
        blocks=[]
        while True:blocks.append(bytearray(8*1024**2))
    if control in ('stdout','stderr'):
        stream=sys.stdout.buffer if control=='stdout' else sys.stderr.buffer
        while True:stream.write(b'x'*65536);stream.flush()
    if control=='malformed':print('{broken');sys.exit(0)
    raw=sys.stdin.buffer.read(profile['internal_transport_bytes']+1)
    if len(raw)>profile['internal_transport_bytes']:raise ValueError('transport size')
    sys.path.insert(0,str(HERE.parent/'t08-limited-numerical-adapter-20260915'))
    from numerical_bridge import evaluate
    from core_loader import reviewed_core
    with reviewed_core() as core:
        out=evaluate(core,json.loads(raw))
        # Labeled generic architecture control, not actual S-C uncertainty.
        if control in ('unresolved','fail-unresolved'):
            out['numerical']['quantities'][5]['outcome']='indeterminate'
            out['numerical']['quantities'][5].pop('projected',None)
            out['numerical']['recomputation']=core.aggregate([q['outcome'] for q in out['numerical']['quantities']])
    if control=='partial':out['numerical']['quantities']=out['numerical']['quantities'][:7]
    if control=='wrong-identity':out['context']['numerical_commit']='wrong'
    capsule={'result':out,'limits':{'cpu':list(resource.getrlimit(resource.RLIMIT_CPU)),'address_space':list(resource.getrlimit(resource.RLIMIT_AS))},'worker_optimize':sys.flags.optimize}
    print(json.dumps(capsule,separators=(',',':'),allow_nan=False),flush=True)
except MemoryError:os._exit(71)
