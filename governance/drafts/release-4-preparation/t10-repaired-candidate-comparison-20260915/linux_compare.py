"""UNISSUED CANDIDATE. Full corrected corpus through fixed Linux lifecycle."""
import argparse
import hashlib
import json
from pathlib import Path
import platform
import subprocess
import sys
from compare_result import semantic
HERE=Path(__file__).resolve().parent
REV=HERE.parent/'t10-independent-expectation-corpus-revision-2-20260915'
sys.path.insert(0,str(HERE.parent/'t09-check-report-lifecycle-20260915'))
from invoke import invoke,delivery,data,command

def require(ok,s):
    if not ok:raise ValueError(s)

def main():
    p=argparse.ArgumentParser();p.add_argument('output',type=Path);p.add_argument('--image',default='nomue-t10-repaired');a=p.parse_args()
    require(platform.system()=='Linux' and platform.machine()=='x86_64' and platform.python_version()=='3.12.14','fixed Linux observer')
    a.output.mkdir(exist_ok=False,parents=True)
    subprocess.run(['python','-B',str(REV/'check_revision.py')],check=True)
    freeze=hashlib.sha256((REV/'MANIFEST.json').read_bytes()).hexdigest()
    fixtures=[json.loads(x) for x in (REV/'corpus/fixtures.jsonl').read_bytes().splitlines()]
    host=dict(status='UNISSUED CANDIDATE',python=platform.python_version(),machine=platform.machine(),kernel=platform.release(),image=json.loads(command(['docker','image','inspect',a.image]))[0]['Id'],expectation_commit='c262931584bbdac0018ffdef59a9b5a186b7cc5c',repair_commit='083c292090c2d921022af954888b9a74418f1237',freeze_sha256=freeze)
    (a.output/'HOST.json').write_bytes(data(host));previous={};count=0
    with (a.output/'RUNS.jsonl').open('wb') as log:
        for mode in (0,1):
            for f in fixtures:
                raw=f['raw'].encode();row=invoke(a.image,raw,mode);out=delivery(row,len(raw));got=semantic(f,out);issues=[]
                if got!=f['expected']:issues.append('frozen semantic mismatch')
                if not row['cleanup_ok'] or row.get('harness_error'):issues.append('lifecycle failure')
                audit=row.get('application_diagnostics') or {};worker=(audit.get('receipts') or {}).get('worker');modes=audit.get('modes')
                if f['category']=='D' and worker:issues.append('rejected input invoked worker')
                if worker:
                    if modes!={'supervisor':mode,'worker':mode}:issues.append('actual optimization flag')
                    if worker.get('python')!='3.12.14':issues.append('actual worker version')
                if mode==0:previous[f['id']]=got
                elif got!=previous[f['id']]:issues.append('mode semantics differ')
                row.update(case=f['id'],delivered=out,semantic=got,freeze_sha256=freeze,issues=issues,check='MISMATCH' if issues else 'PASS')
                log.write(data(row));log.flush();count+=1
                if issues:
                    (a.output/'MISMATCH.json').write_bytes(data(dict(fixture=f['id'],mode=mode,expected=f['expected'],actual=got,issues=issues)))
                    raise ValueError('T10 INDEPENDENT EXPECTATION MISMATCH '+f['id']+': '+str(issues))
                if count%20==0:print(json.dumps(dict(completed=count,total=2*len(fixtures),mode=mode)),flush=True)
    (a.output/'SUMMARY.json').write_bytes(data(dict(status='UNISSUED CANDIDATE',runs=count,mode_pairs=len(previous),result='PASS',freeze_sha256=freeze)))
if __name__=='__main__':main()
