"""UNISSUED CANDIDATE. Validate a stopped T10 packet, never issue numerical GO."""
import hashlib
import json
import subprocess
from pathlib import Path
from check_corpus import check, verify_freeze, rows
from build_corpus import HERE, ROOT, PINS, require

def git(*args):
    return subprocess.check_output(['git','-c','safe.directory='+ROOT.as_posix(),'-C',str(ROOT),*args])

def sha(b):return hashlib.sha256(b).hexdigest()

check();freeze=verify_freeze()
observed=[json.loads(x) for x in (HERE/'NORMAL.jsonl').read_bytes().splitlines()]
fixtures=rows('fixtures.jsonl')
require(len(observed)==171,'stop at first mismatch')
require([o['id'] for o in observed]==[f['id'] for f in fixtures[:171]],'execution prefix')
for o,f in zip(observed,fixtures):
    require(o['freeze_sha256']==freeze and o['input_sha256']==f['input_sha256'],'measurement binding')
    require(o['mode']==0 and (o['core_optimize']==0 if o['numerical_calls'] else o['core_optimize'] is None),'measured mode')
require(all(o['result']=='PASS' and not o['issues'] for o in observed[:-1]),'170 matched')
require(observed[-1]['result']=='MISMATCH' and observed[-1]['id']=='structure/overflow-number','known mismatch retained')
diag=json.loads((HERE/'DIAGNOSIS.json').read_text())
require(diag['numerical_calls']==0 and diag['actual']['refusal']['refusal_kind']=='internal_error','diagnosis matches failure')
for x in diag['diagnosis_sources']:
    b=git('show',x['commit']+':'+x['path'])
    require(sha(b)==x['sha256'],'diagnosis source')
    require(git('rev-parse',x['commit']+':'+x['path']).decode().strip()==x['git_blob'],'diagnosis blob')
prefix=HERE.relative_to(ROOT).as_posix()+'/'
changes=git('diff','--name-only',PINS['base']).decode().splitlines()
require(all(x.startswith(prefix) for x in changes),'only additive T10 content')
require(not git('diff','--name-only','--diff-filter=MD',PINS['base']).decode().strip(),'no existing file edits or deletions')
# Direct source/worktree preservation plus saved historical evidence validation.
subprocess.run(['python','-B',str(HERE.parent/'t09-check-report-lifecycle-20260915/verify_packet.py')],check=True)
m=json.loads((HERE/'MANIFEST.json').read_text())
files={f.relative_to(HERE).as_posix():f for f in HERE.rglob('*') if f.is_file() and '__pycache__' not in f.parts and f.name!='MANIFEST.json'}
require(set(files)==set(m['sha256']),'complete T10 manifest')
for name,path in files.items():require(sha(path.read_bytes().replace(b'\r\n',b'\n'))==m['sha256'][name],'T10 hash '+name)
require(m['status']=='UNISSUED CANDIDATE' and m['verdict']=='NOT READY','no false GO')
print(json.dumps(dict(packet='PASS',verdict='T10 INDEPENDENT-EXPECTATION CORPUS — NOT READY',normal_matched=170,mismatches=1,unexecuted_records=3,optimized='not executed',linux='not executed',freeze_sha256=freeze)))
