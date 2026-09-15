"""UNISSUED CANDIDATE. Final evidence, chronology and preservation validation."""
import hashlib
import json
from pathlib import Path
import subprocess
import sys
from compare_result import semantic
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[3]
BASE='f18712ac5b9ca0a1facd60cb0d04184e5994c398'
B='c262931584bbdac0018ffdef59a9b5a186b7cc5c'
C='083c292090c2d921022af954888b9a74418f1237'
MEASURED='98052127e51efbed12580077c3a6e4e002af3a11'
REV=HERE.parent/'t10-independent-expectation-corpus-revision-2-20260915'
OLD=HERE.parent/'t10-independent-expectation-corpus-20260915'
T09=HERE.parent/'t09-check-report-lifecycle-20260915'
REPAIR=HERE.parent/'t09-canonicalization-repair-20260915'
def read(p):return json.loads(p.read_text(encoding='utf-8'))
def sha(b):return hashlib.sha256(b).hexdigest()
def norm(p):return p.read_bytes().replace(b'\r\n',b'\n')
def require(ok,s):
    if not ok:raise ValueError(s)
def git(*a):return subprocess.check_output(['git','-c','safe.directory='+ROOT.as_posix(),'-C',str(ROOT),*a])
def check_manifest(folder):
    m=read(folder/'MANIFEST.json')
    for name,h in m['sha256'].items():require(sha(norm(folder/name))==h,'manifest '+str(folder.name)+'/'+name)

def main():
    for a,b in [(BASE,B),(B,C),(C,MEASURED)]:
        subprocess.run(['git','-c','safe.directory='+ROOT.as_posix(),'-C',str(ROOT),'merge-base','--is-ancestor',a,b],check=True)
    require(git('rev-parse',B+'^').decode().strip()==BASE and git('rev-parse',C+'^').decode().strip()==B,'separate B before C commits')
    subprocess.run(['python','-B',str(REV/'check_revision.py')],check=True)
    subprocess.run(['python','-B',str(OLD/'check_corpus.py')],check=True)
    check_manifest(OLD);check_manifest(REV);check_manifest(REPAIR)
    # Every pre-existing file remains byte-identical except the explicit C repair.
    changed=git('diff','--name-only','--diff-filter=MD',BASE).decode().splitlines()
    report_path=(T09/'report.ts').relative_to(ROOT).as_posix()
    require(changed==[report_path],'one historical runtime change')
    require(git('show',C+':'+report_path)==norm(T09/'report.ts'),'C source unchanged')
    require(sha(norm(T09/'report.ts'))==read(REPAIR/'MANIFEST.json')['repaired_report_sha256'],'repair source hash')
    subprocess.run(['python','-B',str(HERE.parent/'t08-limited-numerical-adapter-20260915/verify_packet.py')],check=True)
    original_t09=read(T09/'MANIFEST.json')
    for x in original_t09['files']:
        path=T09/x['path']
        if path.name!='report.ts':require(sha(norm(path))==x['sha256'],'historical T09 '+x['path'])
    require(sha(norm(ROOT/'.github/workflows/r4-t09-candidate.yml'))==original_t09['workflow_sha256'],'old workflow')
    fixtures=[json.loads(x) for x in (REV/'corpus/fixtures.jsonl').read_bytes().splitlines()];index={f['id']:f for f in fixtures}
    require(len(index)==174,'full corpus')
    win={}
    for mode,name in [(0,'NORMAL.jsonl'),(1,'OPTIMIZED.jsonl')]:
        rows=[json.loads(x) for x in (HERE/name).read_bytes().splitlines()]
        require([x['id'] for x in rows]==list(index),'complete Windows order')
        for row in rows:
            f=index[row['id']];require(row['result']=='PASS' and not row['issues'],'Windows result')
            require(semantic(f,row['delivered'])==f['expected']==row['actual'],'independent saved delivery comparison')
            require(row['mode']==mode and (row['core_optimize']==mode if row['numerical_calls'] else row['core_optimize'] is None),'Windows mode')
            require(row['input_sha256']==f['input_sha256'],'input binding')
            if mode==0:win[row['id']]=row['actual']
            else:require(win[row['id']]==row['actual'],'Windows mode equality')
    capture=read(HERE/'CAPTURE.json');require(capture['conclusion']=='success' and capture['headSha']==MEASURED,'successful exact CI')
    for name,h in capture['downloaded_sha256'].items():require(sha((HERE/'measurements'/name).read_bytes())==h,'captured raw artifact')
    run_path=next((HERE/'measurements').rglob('RUNS.jsonl'));host=read(run_path.parent/'HOST.json');summary=read(run_path.parent/'SUMMARY.json')
    require(host['python']=='3.12.14' and host['machine']=='x86_64','Linux host')
    require(summary['runs']==348 and summary['mode_pairs']==174 and summary['result']=='PASS','Linux complete')
    linux=[json.loads(x) for x in run_path.read_bytes().splitlines()]
    require([(x['mode'],x['case']) for x in linux]==[(m,id) for m in (0,1) for id in index],'complete Linux order')
    for row in linux:
        f=index[row['case']];require(row['check']=='PASS' and not row['issues'] and row['cleanup_ok'],'Linux result / cleanup')
        require(semantic(f,row['delivered'])==f['expected']==win[f['id']],'cross-platform full semantic equality')
        require(row['input_sha256']==f['input_sha256'],'Linux input binding')
        audit=row.get('application_diagnostics') or {};w=(audit.get('receipts') or {}).get('worker')
        if w:
            require(audit['modes']=={'supervisor':row['mode'],'worker':row['mode']},'Linux actual process modes')
            require(w['python']=='3.12.14' and w['enforced_limits']=={'cpu':[25,26],'address_space':[268435456,268435456]},'unchanged worker limits')
        if f['category']=='D':require(not w,'rejection before numerical worker')
    source=read(next((HERE/'measurements').rglob('SOURCE-MANIFEST.json')))
    require(source['source_commit']==MEASURED and source['files'][report_path]==sha(norm(T09/'report.ts')),'Linux repaired runtime source')
    component_files=[HERE/'COMPONENTS.json',HERE/'COMPONENTS-optimized.json']+list((HERE/'measurements').rglob('normal.json'))+list((HERE/'measurements').rglob('optimized.json'))
    require(len(component_files)==4,'two platforms, two component modes')
    expected_components={}
    for group,name in [('projection','projections.jsonl'),('tail','tails.jsonl')]:
        for line in (REV/'corpus'/name).read_bytes().splitlines():
            f=json.loads(line);expected_components[(group,f['id'])]=f
    for path in component_files:
        x=read(path);require(x['result']=='PASS' and len(x['rows'])==22,'component result')
        require([(r['group'],r['id']) for r in x['rows']]==list(expected_components),'component coverage')
        require(all(r['expected_code']==r['actual_code']==expected_components[(r['group'],r['id'])]['expected_code'] for r in x['rows']),'frozen component match')
        require(x['optimize']==(1 if 'optimized' in path.name else 0),'component actual mode')
    if (HERE/'MANIFEST.json').exists():check_manifest(HERE)
    print(json.dumps(dict(result='PASS',windows=348,linux=348,component_runs=88,mode_pairs=174,old_freeze_preserved=True,B_before_C=True,only_runtime_change='T09/report.ts',T09_limited_repair='GO',T10='checks complete; final commit/push/clean gate still required')))
if __name__=='__main__':main()
