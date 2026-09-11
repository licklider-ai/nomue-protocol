"""Independent rootless controls. Fake cgroup files are not kernel evidence."""
import argparse, importlib.util, json, os, shutil, subprocess, sys, tempfile
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import patch

ap=argparse.ArgumentParser(); ap.add_argument('repository'); ap.add_argument('--output', required=True); args=ap.parse_args()
repo=Path(args.repository).resolve()
packet=repo/'governance/drafts/release-3-preparation/holm-controlled-execution-20260911'
spec=importlib.util.spec_from_file_location('candidate', packet/'supervisor.py'); m=importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
rows=[]
def check(name, fn):
    try: rows.append({'name':name,'passed':True,'evidence':fn()})
    except Exception as e: rows.append({'name':name,'passed':False,'error':repr(e)})

def simulated_run(late=False, memory=False, pids=False):
    with tempfile.TemporaryDirectory() as td:
        parent=Path(td)/'delegation'; (parent/'calls').mkdir(parents=True); (parent/'supervisor').mkdir(); (parent/'supervisor'/'cgroup.procs').touch()
        oldmkdir=Path.mkdir; oldrmdir=Path.rmdir; oldwrite=Path.write_text
        def mkdir(path,*a,**kw):
            ret=oldmkdir(path,*a,**kw)
            if path.name.startswith('call-'):
                for name,data in {'cgroup.kill':'','memory.events.local':'max 0\noom 0\noom_kill 0\n','pids.events':'max 0\n','cgroup.events':'populated 0\n','cpu.stat':'usage_usec 0\n'}.items(): oldwrite(path/name,data)
            return ret
        kills=0
        def write(path,data,*a,**kw):
            nonlocal kills
            if path.name=='cgroup.kill':
                kills+=1
                if kills>=2:
                    if memory: oldwrite(path.parent/'memory.events.local','max 1\noom 0\noom_kill 0\n')
                    if pids: oldwrite(path.parent/'pids.events','max 1\n')
            return oldwrite(path,data,*a,**kw)
        def rmdir(path):
            if path.name.startswith('call-'):
                for f in path.iterdir(): f.unlink()
            return oldrmdir(path)
        class Child:
            pid=123456789; returncode=0
            def __init__(self,*a,**kw):
                self.stdout=self.stream(b'{"output":{"kind":"trusted-probe"}}'); self.stderr=self.stream(b'')
            def stream(self,b):
                r,w=os.pipe(); os.write(w,b); os.close(w); return os.fdopen(r,'rb')
            def poll(self): return 0
            def kill(self): raise AssertionError('already-exited child should not need leader kill')
        ticks=iter([0,0.99 if late else 0.1]); last=[0]
        def clock():
            last[0]=next(ticks,1.01 if late else 0.2); return last[0]
        a=SimpleNamespace(delegation=str(parent),node=shutil.which('node'),python=sys.executable,memory=536870912,tasks=64,deadline=1,cleanup=3,record='not-opened',expected='not-opened',probe=None)
        m.CANCELLED=False
        with patch.object(m,'supported',return_value=parent), patch.object(m.ctypes,'CDLL',return_value=SimpleNamespace(prctl=lambda *a:0)), patch.object(Path,'mkdir',mkdir), patch.object(Path,'write_text',write), patch.object(Path,'rmdir',rmdir), patch.object(m.subprocess,'Popen',Child), patch.object(m.os,'waitpid',side_effect=ChildProcessError), patch.object(m.time,'monotonic',clock):
            return m.run(a)

def deadline():
    r=simulated_run(late=True)
    assert r['category']=='deadline' and 'result' not in r, r
    return r
check('Completion observed after deadline must invalidate output',deadline)
for name,opts,cat in [('memory max event without OOM',{'memory':True},'memory_enforced'),('pids event with exit-zero output',{'pids':True},'pids_enforced')]:
    def f(opts=opts,cat=cat):
        r=simulated_run(**opts); assert r['category']==cat and 'result' not in r,r; return r
    check(name,f)
for name,raw in [('duplicate key',b'{"output":{"kind":"x","kind":"x"}}'),('nonfinite constant',b'{"output":{"kind":"x","n":NaN}}'),('overflow exponent',b'{"output":{"kind":"x","n":1e400}}'),('lone surrogate',b'{"output":{"kind":"\\ud800"}}'),('surrogate key',b'{"output":{"kind":"x","\\ud800":0}}'),('negative zero integer',b'{"output":{"kind":"x","n":-0}}'),('negative zero float',b'{"output":{"kind":"x","n":-0.0}}'),('negative underflow',b'{"output":{"kind":"x","n":-1e-999}}'),('overflow integer',b'{"output":{"kind":"x","n":'+b'9'*400+b'}}')]:
    def f(raw=raw):
        try: m.strict_transport(raw)
        except (ValueError,UnicodeError,OverflowError): return {'rejected':True}
        raise AssertionError('accepted ineligible trusted transport')
    check('Strict transport rejects '+name,f)

def regression():
    p=subprocess.run([sys.executable,'-I',str(packet/'test_execution.py'),'--output',str(Path(args.output).with_name('author-local-results.json'))],cwd=repo,capture_output=True,text=True,timeout=60)
    assert p.returncode==0, {'stdout':p.stdout,'stderr':p.stderr}; return json.loads(p.stdout)
check('Author local file transport suite',regression)
Path(args.output).write_text(json.dumps({'candidate':subprocess.check_output(['git','rev-parse','HEAD'],cwd=repo,text=True).strip(),'rows':rows,'passed':sum(r['passed'] for r in rows),'controls':len(rows),'cgroup_tests':'NOT_RUN; only ordinary temporary files used for state-machine simulation'},indent=2)+'\n')
print(json.dumps(rows,indent=2))
