import importlib.util,json,os,pathlib,subprocess,sys,tempfile
if len(sys.argv)!=2: raise SystemExit('usage: safe_failure_checks.py /absolute/repository')
root=pathlib.Path(sys.argv[1]).resolve()
output_directory=pathlib.Path(__file__).resolve().parent
source=root/'governance/drafts/release-3-preparation/holm-execution-admission-20260911/measure.py'
spec=importlib.util.spec_from_file_location('admission_reviewed',source);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
rows=[]
with tempfile.TemporaryDirectory(prefix='admission-method-review-') as td:
 p=pathlib.Path(td);(p/'cgroup.subtree_control').write_text('cpu memory pids')
 m.CGROOT=p
 m.prepare=lambda directory,node:[{'name':'safe-mock-case'}]
 m.reset_cache=lambda sentinel:(_ for _ in ()).throw(OSError('synthetic reset write failure'))
 oldargv=sys.argv;oldenv=os.environ.copy()
 try:
  os.environ.update({'GITHUB_ACTIONS':'true','RUNNER_ENVIRONMENT':'github-hosted','RUNNER_OS':'Linux'})
  sys.argv=['measure.py','--disposable-host-cache-reset','--output',str(p/'results.json')]
  try:m.main();exception=None
  except BaseException as e:exception=repr(e)
  saved=json.loads((p/'results.json').read_text()) if (p/'results.json').exists() else None
  reset_rows=[r for r in saved.get('rows',[]) if r.get('mode')=='cache-reset-requested'] if saved else []
  rows.append({'control':'first_reset_exception','exception':exception,'report_exists':saved is not None,'failed_reset_rows_retained':len(reset_rows),'failure_retention_pass':len(reset_rows)==3 and all(not r['pass'] and 'synthetic reset write failure' in r['cache'].get('error','') for r in reset_rows)})
 finally:sys.argv=oldargv;os.environ.clear();os.environ.update(oldenv)
with tempfile.TemporaryDirectory(prefix='admission-method-review-') as td:
 p=pathlib.Path(td);m.CGROOT=p
 real_mkdir=pathlib.Path.mkdir
 def fake_mkdir(self,*a,**kw):
  ret=real_mkdir(self,*a,**kw)
  if self.name.startswith('nomue-admission-'):
   (self/'memory.peak').write_text('0');(self/'memory.events').write_text('max 0\noom 0\noom_kill 0\n');(self/'pids.events').write_text('max 0\n');(self/'cgroup.events').write_text('populated 0\n')
  return ret
 class FakeProcess:
  def communicate(self,timeout):raise subprocess.TimeoutExpired('safe mock',timeout)
  def poll(self):return None
  def kill(self):raise OSError('synthetic outer kill race')
 original_popen=m.subprocess.Popen
 try:
  pathlib.Path.mkdir=fake_mkdir;m.subprocess.Popen=lambda *a,**kw:FakeProcess()
  try:r=m.trial(p,{'name':'safe-mock-case'},'/unused/node');exception=None
  except Exception as e:r=None;exception=repr(e)
  rows.append({'control':'timeout_then_outer_kill_error','exception':exception,'row_returned':r is not None,'failure_retention_pass':r is not None and not r['pass'] and 'launcher_kill' in r.get('cleanup_attempt_errors',{}) and 'launcher_wait' in r.get('cleanup_attempt_errors',{}),'retained_trial':r})
 finally:pathlib.Path.mkdir=real_mkdir;m.subprocess.Popen=original_popen
out=output_directory/'SAFE-CHECKS.json';out.write_text(json.dumps(rows,indent=2)+'\n');print(out.read_text())
