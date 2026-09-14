"""Linux-only Docker observer. No container runtime or kernel is treated as a real-time OS."""
import argparse
from collections import Counter
import json
import os
from pathlib import Path
import platform
import shutil
import subprocess
import time
import uuid
from common import data, sha, require
from delivery import finalize

HERE=Path(__file__).resolve().parent

def command(args, timeout=20):
    return subprocess.check_output(args,timeout=timeout,stderr=subprocess.STDOUT)

def inspect(name):
    return json.loads(command(['docker','inspect',name]))[0]

def cg_values(path):
    values={}
    for field in ('memory.max','memory.peak','memory.events','pids.max','pids.current','cpu.max','cpu.stat','cgroup.procs'):
        try: values[field]=(path/field).read_text().strip()
        except FileNotFoundError: values[field]='gone'
    return values

def one(image, profile_name, profile, name, item, mode, outputs):
    unique='r4-ec3-'+uuid.uuid4().hex
    folder=outputs/unique; folder.mkdir()
    start=time.monotonic()
    control=item.get('control','normal')
    deadline=4 if control in ('parent-timeout','report-timeout','cleanup-escalation','tree-memory') else profile['wall']
    result={'case':name,'profile':profile_name,'mode':mode,'input_sha256':item['raw_sha256'],
            'effective_outer_wall_seconds':deadline,'container_created':False}
    args=['docker','run','-d','--user',str(os.getuid())+':'+str(os.getgid()),'--name',unique,'--network','none','--read-only','--cap-drop','ALL',
          '--security-opt','no-new-privileges','--pids-limit','32','--cpus','2',
          '--memory',str(profile['tree_mib'])+'m','--memory-swap',str(profile['tree_mib'])+'m',
          '--tmpfs','/tmp:rw,noexec,nosuid,size=8m','--log-driver','json-file','--log-opt','max-size=1m','--log-opt','max-file=1',
          '--mount','type=bind,src='+str(folder.resolve())+',dst=/out',image,
          '/usr/local/bin/python','-B']+(['-O']*mode)+['/harness/parent.py',profile_name,name,str(mode)]
    path=None
    try:
        command(args)
        result['container_created']=True
        state=inspect(unique)
        pid=state['State']['Pid']
        cg=Path('/proc')/str(pid)/'cgroup'
        require(pid>0 and cg.exists(),'live container for cgroup accounting')
        membership=cg.read_text().strip().splitlines()
        require(len(membership)==1 and membership[0].startswith('0::'),'unified cgroup v2 required')
        path=Path('/sys/fs/cgroup')/membership[0][3:].lstrip('/')
        initial=cg_values(path)
        require(initial['memory.max']==str(profile['tree_mib']*1024**2),'tree memory enforced')
        require(initial['pids.max']=='32','pids enforced')
        require(state['HostConfig']['MemorySwap']==state['HostConfig']['Memory'],'swap disabled')
        result['cgroup_initial']=initial
        result['runtime_config']={k:state['HostConfig'][k] for k in ('Memory','MemorySwap','PidsLimit','NanoCpus','ReadonlyRootfs','NetworkMode','CapDrop','SecurityOpt')}
        while not (folder/'ready').exists():
            if time.monotonic()-start>=deadline:
                result['outer_failure']='full_invocation_deadline'; break
            if not inspect(unique)['State']['Running']:
                result['outer_failure']='container_exit'; break
            time.sleep(0.03)
        result['cgroup_before_cleanup']=cg_values(path)
        result['report_ready']=(folder/'ready').exists()
        if result['report_ready']:
            with (folder/'report.json').open('rb') as stream: raw=stream.read(profile['report']+1)
            require(len(raw)<=profile['report'],'collected full report cap')
            result['report_sha256']=sha(raw)
            result['report']=json.loads(raw)  # Generated trusted research report only.
            result['report_metrics']=json.loads((folder/'metrics.json').read_bytes())
        else:
            result['report']=None
        result['work_and_delivery_wall_seconds']=time.monotonic()-start
    except Exception as error:
        result['harness_error']=str(error)[:300]
        if isinstance(error,subprocess.CalledProcessError): result['command_error']=error.output.decode(errors='replace')[:2000]
        try:
            inspect(unique)
            result['container_created']=True
        except Exception: pass
        result['report']=None
    finally:
        if result['container_created']:
            try: result['container_diagnostic']=command(['docker','logs','--tail','25',unique]).decode(errors='replace')[:3000]
            except Exception: pass
            cleanup=time.monotonic()
            try:
                # SIGTERM, then daemon SIGKILL after two seconds. Control-plane timeout is separate.
                command(['docker','stop','--time','2',unique],timeout=12)
                final=inspect(unique)
                result['container_final']={k:final['State'][k] for k in ('Running','Pid','ExitCode','OOMKilled','Error')}
                result['cgroup_after_cleanup']=cg_values(path) if path else None
                require(not final['State']['Running'] and final['State']['Pid']==0,'container stopped')
                require(path is not None and (not (path/'cgroup.procs').exists() or not (path/'cgroup.procs').read_text().strip()),'all container descendants gone')
                result['cleanup_ok']=True
            except Exception as error:
                result['cleanup_ok']=False
                result['cleanup_error']=str(error)[:300]
                try: command(['docker','kill',unique])
                except Exception: pass
            result['cleanup_seconds']=time.monotonic()-cleanup
            # Remove only the exact container this invocation created.
            command(['docker','rm',unique])
    result['full_invocation_wall_seconds']=time.monotonic()-start
    result['final_outcome']=finalize(result)
    if not result.get('cleanup_ok'):
        result['check']='FAIL'
        return result
    report=result.get('report')
    expected=item.get('expected')
    if 'harness_error' in result:
        result['check']='FAIL'
    elif expected is not None:
        small_padding=profile_name=='small' and name=='padded-two-MiB'
        result['check']='PASS' if (report is not None and
            ((small_padding and report['execution']=='execution_refusal' and report['result'] is None)
             or (not small_padding and report['result']==expected and report['execution'].startswith('completed_candidate')))) else 'FAIL'
        if report and report.get('result') and report['result']['gate']=='supported-domain refusal':
            require(report['worker_started'] is False,'C>B rejected before worker launch')
    else:
        outer_control=control in ('parent-timeout','report-timeout','cleanup-escalation','tree-memory')
        result['check']='PASS' if (outer_control and report is None and 'outer_failure' in result) or (not outer_control and report is not None and report['execution']=='execution_refusal' and report['result'] is None) else 'FAIL'
    return result

def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('stage',type=Path); parser.add_argument('output',type=Path)
    parser.add_argument('--image',default='r4-ec3-research')
    a=parser.parse_args()
    a.output.mkdir(parents=True,exist_ok=False)
    require(platform.system()=='Linux' and platform.machine()=='x86_64','Linux x86_64 observer')
    index=json.loads((a.stage/'cases/index.json').read_bytes())
    profiles=json.loads((HERE/'profiles.json').read_bytes())
    shutil.copyfile(a.stage/'source-manifest.json',a.output/'SOURCE-MANIFEST.json')
    shutil.copyfile(a.stage/'cases/index.json',a.output/'CASE-MANIFEST.json')
    host={'observer_python':platform.python_version(),'kernel':platform.release(),
          'docker_version':json.loads(command(['docker','version','--format','{{json .}}'])),
          'image':json.loads(command(['docker','image','inspect',a.image])),
          'image_runtime':json.loads(command(['docker','run','--rm','--network','none',a.image,'python','-B','-c',
              'import sys,platform,json,hashlib,pathlib;print(json.dumps({"python":platform.python_version(),"machine":platform.machine(),"python_sha256":hashlib.sha256(pathlib.Path(sys.executable).read_bytes()).hexdigest()}))'])),
          'workflow_commit':os.environ.get('GITHUB_SHA'),'workflow_run':os.environ.get('GITHUB_RUN_ID')}
    require(host['image_runtime']['python']=='3.12.14','exact validation Python')
    (a.output/'HOST.json').write_bytes(data(host))
    outputs=a.output/'invocations'; outputs.mkdir()
    # All frozen complete raw records in Medium; focused cross-profile comparison.
    selected=[name for name,item in index.items() if 'expected' in item]
    subset=['ordinary_dyadic_n3','ordinary_decimal_n128','ordinary_zero_n256','cancellation_moments_n128',
            'positive-subnormal-p','maximum-local-ids','padded-two-MiB','single-ULP-above-anchor']
    plan=[(profile,mode,name) for profile in profiles for mode in (0,1)
          for name in (list(index) if profile=='medium' else subset)]
    rows=[]
    with (a.output/'MEASUREMENTS.jsonl').open('wb') as f:
        for i,(profile,mode,name) in enumerate(plan):
            row=one(a.image,profile,profiles[profile],name,index[name],mode,outputs)
            rows.append(row); f.write(data(row)); f.flush()
            print(str(i+1)+'/'+str(len(plan)),profile,mode,name,row['check'],flush=True)
            require(row.get('cleanup_ok'), 'cleanup failed: '+json.dumps(row))
            require(i!=0 or row['check']=='PASS','initial end-to-end canary failed: '+json.dumps(row))
    summary={'runs':len(rows),'checks':dict(Counter(row['check'] for row in rows)),'profiles':profiles}
    (a.output/'SUMMARY.json').write_bytes(data(summary))
    require(all(row['check']=='PASS' for row in rows),'research suite has failed checks; retain evidence')
if __name__=='__main__': main()
