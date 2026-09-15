"""UNISSUED CANDIDATE. Linux Docker lifecycle and final-delivery owner."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import platform
import subprocess
import tempfile
import time
import uuid
from fixed import load
HERE=Path(__file__).resolve().parent
PROFILE=json.loads((HERE/'PROFILE.json').read_text())
FINALIZE=load('t09_fixed_delivery','t04-ec3-ec4-evidence-20260914/delivery.py').finalize
APP='/repo/governance/drafts/release-4-preparation/t09-check-report-lifecycle-20260915/app.mjs'

def data(x):return (json.dumps(x,sort_keys=True,separators=(',',':'),allow_nan=False)+'\n').encode()
def command(args,timeout=20):return subprocess.check_output(args,timeout=timeout,stderr=subprocess.STDOUT)
def inspect(name):return json.loads(command(['docker','inspect',name]))[0]
def cg_values(path):
    return {n:(path/n).read_text().strip() if (path/n).exists() else 'gone' for n in ('memory.max','memory.peak','memory.events','pids.max','pids.current','cgroup.procs')}
def require(ok,label):
    if not ok:raise ValueError(label)

def invoke(image,raw,mode=0,control='normal',started=None):
    require(platform.system()=='Linux' and platform.machine()=='x86_64','Linux x86_64 observer required')
    start=time.monotonic() if started is None else started;name='nomue-t09-'+uuid.uuid4().hex;created=False;cg=None
    row={'mode':mode,'control':control,'input_sha256':hashlib.sha256(raw).hexdigest(),'report':None,'cleanup_ok':False}
    deadline=4 if control in ('tree-memory','report-timeout') else PROFILE['full_invocation_wall_seconds']
    with tempfile.TemporaryDirectory(prefix='nomue-t09-invoke-') as tmp:
        folder=Path(tmp);(folder/'input.json').write_bytes(raw[:PROFILE['raw_bytes']+1])
        try:
            command(['docker','run','-d','--name',name,'--user',str(os.getuid())+':'+str(os.getgid()),'--network','none','--read-only','--cap-drop','ALL','--security-opt','no-new-privileges','--pids-limit','32','--cpus','2','--memory','512m','--memory-swap','512m','--tmpfs','/tmp:rw,noexec,nosuid,size=8m','--log-driver','json-file','--log-opt','max-size=1m','--log-opt','max-file=1','--mount','type=bind,src='+tmp+',dst=/out',image,'node','--max-old-space-size=128',APP,str(mode),control]);created=True
            state=inspect(name);pid=state['State']['Pid'];require(pid>0,'application starts')
            membership=(Path('/proc')/str(pid)/'cgroup').read_text().strip().splitlines();require(len(membership)==1 and membership[0].startswith('0::'),'cgroup v2')
            cg=Path('/sys/fs/cgroup')/membership[0][3:].lstrip('/');row['cgroup_initial']=cg_values(cg)
            require(row['cgroup_initial']['memory.max']==str(PROFILE['container_charged_memory_bytes']),'tree memory')
            require(row['cgroup_initial']['pids.max']=='32' and state['HostConfig']['MemorySwap']==state['HostConfig']['Memory'],'tasks and swap')
            row['runtime_config']={k:state['HostConfig'][k] for k in ('Memory','MemorySwap','PidsLimit','NanoCpus','ReadonlyRootfs','NetworkMode','CapDrop','SecurityOpt')}
            while True:
                if time.monotonic()-start>=deadline:row['outer_failure']='full_invocation_deadline';break
                if (folder/'ready').exists():break
                if not inspect(name)['State']['Running']:row['outer_failure']='container_exit';break
                time.sleep(0.03)
            row['cgroup_before_cleanup']=cg_values(cg)
            if (folder/'ready').exists() and 'outer_failure' not in row:
                with (folder/'report.json').open('rb') as stream:encoded=stream.read(PROFILE['full_report_bytes']+1)
                require(len(encoded)<=PROFILE['full_report_bytes'],'collected report bound')
                row['report_sha256']=hashlib.sha256(encoded).hexdigest();row['report']=json.loads(encoded)
                require(type(row['report']) is dict,'candidate capsule')
            if time.monotonic()-start>=deadline:row.setdefault('outer_failure','full_invocation_deadline')
        except Exception as e:
            row['harness_error']=type(e).__name__;row['diagnostic']=str(e)[:400]
            try:inspect(name);created=True
            except Exception:pass
        finally:
            if created:
                try:
                    command(['docker','stop','--time','2',name],timeout=12)
                    state=inspect(name)['State'];row['container_final']={k:state[k] for k in ('Running','Pid','ExitCode','OOMKilled','Error')}
                    row['cgroup_after_cleanup']=cg_values(cg) if cg else None
                    require(not state['Running'] and state['Pid']==0,'namespace stopped')
                    require(cg is not None and (not (cg/'cgroup.procs').exists() or not (cg/'cgroup.procs').read_text().strip()),'descendants gone')
                    row['cleanup_ok']=True
                except Exception as e:
                    row['cleanup_ok']=False;row['cleanup_error']=type(e).__name__
                    try:command(['docker','kill',name])
                    except Exception:pass
                try:command(['docker','rm',name])
                except Exception:row['cleanup_ok']=False
    # Named synthetic controls run after actual containment, with a valid late report.
    if control=='cleanup-failure':row['cleanup_ok']=False
    if control=='descendant-remains':row['container_final']['Pid']=1
    if control=='deadline-late-report':row['outer_failure']='full_invocation_deadline'
    row['elapsed_seconds']=time.monotonic()-start
    if row['elapsed_seconds']>=deadline:row.setdefault('outer_failure','full_invocation_deadline')
    if isinstance(row.get('report'),dict):row['application_diagnostics']={k:row['report'].get(k) for k in ('reason','receipts','modes','diagnostic')}
    row['final_outcome']=FINALIZE(row)
    return row

def delivery(row,raw_size):
    outcome=row['final_outcome']
    if outcome['execution']!='execution_refusal':return outcome['result']
    cause=outcome['reason']  # Preserve the fixed T04 first latched cause.
    if 'deadline' in cause:code='NRS-TIMEOUT-LIMIT-EXCEEDED'
    elif 'memory' in cause or 'allocation' in cause:code='NRS-MEMORY-LIMIT-EXCEEDED'
    elif 'cpu_limit' in cause or 'overflow' in cause or cause in ('transport_bound','report_bound'):code='NRS-RESOURCE-LIMIT-EXCEEDED'
    else:code='NRS-INTERNAL-VERIFIER-ERROR'
    kind='internal_error' if code=='NRS-INTERNAL-VERIFIER-ERROR' else 'resource_limit'
    refusal={'$schema':'urn:nomue:schema:verifier-refusal:0.2.0-draft.3','output_type':'nomue-verifier-refusal','refusal_kind':kind,'reason_codes':[code],'message':code,'verifier':{'name':'nomue-r4-t09-research','version':'0.1.0-draft.1'},'input_evidence':{'input_size_bytes':raw_size},'generated_at':'2026-09-15T00:00:00Z'}
    if code in ('NRS-TIMEOUT-LIMIT-EXCEEDED','NRS-MEMORY-LIMIT-EXCEEDED'):refusal['limit_category']={'NRS-TIMEOUT-LIMIT-EXCEEDED':'processing_timeout','NRS-MEMORY-LIMIT-EXCEEDED':'memory_limit'}[code]
    return {'status':'UNISSUED CANDIDATE','execution':'execution_refusal','provenance':{'t07_commit':'fb773cc2092678f8409c2f0d25289028356eeb86','t08_commit':'76542b5d0370fc51d60f22efda2af00cafe33ad1','numerical_commit':'66fa2bc201c86c62f21bb94825479427c24d8522','report_schema_sha256':hashlib.sha256((HERE/'report.schema.json').read_bytes()).hexdigest()},'refusal':refusal}

def main():
    p=argparse.ArgumentParser();p.add_argument('record',type=Path);p.add_argument('--image',default='nomue-t09-research');p.add_argument('--optimized',action='store_true');a=p.parse_args()
    start=time.monotonic()
    with a.record.open('rb') as f:raw=f.read(PROFILE['raw_bytes']+1)
    row=invoke(a.image,raw,int(a.optimized),started=start)
    # Research envelope; a failed invocation never has a report/result member.
    outcome=row['final_outcome'];delivered=delivery(row,len(raw))
    encoded=data(delivered);require(len(encoded)<=PROFILE['full_report_bytes'],'delivery bound')
    print(encoded.decode(),end='')
    x=delivered
    if x['execution']!='completed':raise SystemExit(5 if x['refusal']['refusal_kind']=='internal_error' else 4 if x['refusal']['refusal_kind']=='resource_limit' else 3 if x['refusal']['refusal_kind']=='unsupported_bundle' else 2)
    checks=[x['report']['conformance']]+x['report']['verification_results']
    raise SystemExit(2 if any(c.get('outcome')=='fail' for c in checks) else 6 if any(c.get('outcome')=='indeterminate' for c in checks) else 3 if any(c['execution']!='completed' for c in checks) else 0)
if __name__=='__main__':main()
