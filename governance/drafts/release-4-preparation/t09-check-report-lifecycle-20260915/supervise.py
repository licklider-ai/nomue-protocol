"""UNISSUED CANDIDATE. Reuse exact PR #331 launch/cleanup implementation."""
import json
import platform
from pathlib import Path
import sys
from fixed import load
HERE=Path(__file__).resolve().parent
profile=json.loads((HERE/'PROFILE.json').read_text())
mode=int(sys.argv[1]);control=sys.argv[2]
if (platform.system(),platform.machine(),platform.python_version())!=('Linux','x86_64','3.12.14'):raise RuntimeError('unsupported reference host')
if sys.flags.optimize!=mode:raise RuntimeError('supervisor mode mismatch')
s=load('t09_fixed_supervisor','controlled-execution-experiment-20260912/supervisor.py')
raw=sys.stdin.buffer.read(profile['internal_transport_bytes']+1)
if len(raw)>profile['internal_transport_bytes']:raise ValueError('transport size')
command=[sys.executable,'-B']+(['-O'] if mode else [])+[str(HERE/'worker.py'),str(mode),control]
try:
    receipt=s._launch(command,raw,wall=1 if control in ('timeout','descendant','escaped-descendant') else profile['full_invocation_wall_seconds'],out_cap=profile['worker_stdout_bytes'])
except (KeyboardInterrupt,SystemExit) as error:
    receipt=getattr(error,'receipt',{'category':'cancelled','causes':['cancelled'],'worker_reaped':False})
print(json.dumps({'receipt':receipt,'supervisor_optimize':sys.flags.optimize,'python':platform.python_version()},separators=(',',':')),flush=True)
