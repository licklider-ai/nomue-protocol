"""UNISSUED CANDIDATE. Verify direct inputs, inherited core and packet hashes."""
import hashlib
import json
from pathlib import Path
import subprocess
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[3]
def read(p):return json.loads(p.read_text(encoding='utf-8'))
def require(ok,message):
    if not ok:raise SystemExit('FAIL: '+message)
def sha(b):return hashlib.sha256(b).hexdigest()
def git(*a):return subprocess.check_output(['git','-c','safe.directory='+ROOT.as_posix(),'-C',str(ROOT),*a])
x=read(HERE/'INPUTS.json');entries=x['files']
raw=git('cat-file','--batch') if not entries else subprocess.check_output(['git','-c','safe.directory='+ROOT.as_posix(),'-C',str(ROOT),'cat-file','--batch'],input=''.join(e['commit']+':'+e['path']+'\n' for e in entries).encode())
offset=0
for e in entries:
    end=raw.index(b'\n',offset);oid,kind,size=raw[offset:end].decode().split();size=int(size);b=raw[end+1:end+1+size];offset=end+size+2
    require(oid==e['git_blob'] and kind=='blob' and sha(b)==e['sha256'],'pin '+e['path'])
    if e['commit']==x['base']:require((ROOT/e['path']).read_bytes().replace(b'\r\n',b'\n')==b,'preserved '+e['path'])
    if e['path'].endswith('CANDIDATE-PROFILE.json'):require((HERE/'PROFILE.json').read_bytes().replace(b'\r\n',b'\n')==b,'unchanged Medium profile')
subprocess.run(['python','-B',str(HERE.parent/'t08-limited-numerical-adapter-20260915/verify_packet.py')],check=True)
n=read(HERE/'RESULTS.json');o=read(HERE/'RESULTS-optimized.json');require(n['result']==o['result']=='PASS' and n['mode']==0 and o['mode']==1,'mode results');require(n['fixtures']==o['fixtures'] and n['assertions']==o['assertions'],'semantic mode agreement')
for f in ['F01-CONTROLS.json','F01-CONTROLS-optimized.json']:
    r=read(HERE/f);require(r['result']=='PASS' and len(r['controls'])==10 and all(z['latched'] and z['no_completed_result'] for z in r['controls']),'F01 controls')
m=read(HERE/'MANIFEST.json');files={p.relative_to(HERE).as_posix():p for p in HERE.rglob('*') if p.is_file() and p.name!='MANIFEST.json'}
require(set(files)=={e['path'] for e in m['files']},'manifest complete')
for e in m['files']:require(sha(files[e['path']].read_bytes().replace(b'\r\n',b'\n'))==e['sha256'],'hash '+e['path'])
require(sha((ROOT/'.github/workflows/r4-t09-candidate.yml').read_bytes().replace(b'\r\n',b'\n'))==m['workflow_sha256'],'workflow hash')
print('PASS: '+str(len(entries))+' direct/historical pins; T08 inherited G5 pins; Medium profile; report modes; F01; '+str(len(files))+' artifact hashes')
