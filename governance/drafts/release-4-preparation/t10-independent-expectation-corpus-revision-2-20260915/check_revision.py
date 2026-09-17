"""UNISSUED CANDIDATE. Read-only revision/pin/non-circularity checks."""
import ast
import hashlib
import json
from pathlib import Path
import subprocess
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[3]
def require(ok,s):
    if not ok:raise ValueError(s)
def check():
    pins=json.loads((HERE/'INPUTS.json').read_text());sources={}
    for p in pins['sources']:
        b=subprocess.check_output(['git','-c','safe.directory='+ROOT.as_posix(),'-C',str(ROOT),'show',p['commit']+':'+p['path']])
        require(hashlib.sha256(b).hexdigest()==p['sha256'],'SHA '+p['id'])
        require(hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==p['git_blob'],'blob')
        sources[p['id']]=b
    old=[json.loads(x) for x in sources['original-corpus'].splitlines()]
    new=[json.loads(x) for x in (HERE/'corpus/fixtures.jsonl').read_bytes().splitlines()]
    require(len(old)==len(new)==174,'full corpus')
    changed=[a['id'] for a,b in zip(old,new) if a!=b]
    require(changed==['structure/overflow-number'],'one expectation revision')
    require(all(a['raw']==b['raw'] and a['input_sha256']==b['input_sha256'] for a,b in zip(old,new)),'inputs unchanged')
    e=next(x for x in new if x['id']=='structure/overflow-number')['expected']
    require(e['refusal_kind']=='canonicalization_failure' and not e['report_present'] and not e['external_check_results_present'],'no invented report')
    require(e['required_reason_codes']==['NRS-CANONICALIZATION-FAILED'] and e['exit_code']==2,'observable code')
    for id,name in [('projection-vectors','projections.jsonl'),('tail-vectors','tails.jsonl')]:require((HERE/'corpus'/name).read_bytes()==sources[id],'unchanged components')
    tree=ast.parse((HERE/'build_revision.py').read_text(encoding='utf-8-sig'));imports=[];calls=[];reads=[]
    for n in ast.walk(tree):
        if isinstance(n,ast.Import):imports.extend(x.name for x in n.names)
        if isinstance(n,ast.ImportFrom):imports.append(n.module)
        if isinstance(n,ast.Call):
            if isinstance(n.func,ast.Name):
                require(n.func.id not in ('eval','exec','compile','__import__'),'dynamic source')
                if n.func.id=='read_source':reads.append(ast.unparse(n))
            if isinstance(n.func,ast.Attribute) and isinstance(n.func.value,ast.Name) and n.func.value.id=='subprocess':calls.append(ast.unparse(n))
    require(set(imports)=={'hashlib','json','pathlib','subprocess'},'imports')
    require(len(calls)==1 and "'show'" in calls[0] and 'check_output' in calls[0],'Git source only')
    require(reads==["read_source('original-corpus')",'read_source(id)'] or set(reads)=={"read_source('original-corpus')",'read_source(id)'},'read channels')
    result=dict(status='UNISSUED CANDIDATE',records=174,changed=changed,source_pins=len(sources),imports=imports,external_calls=calls,source_reads=reads,candidate_imported=False,candidate_invoked=False,candidate_output_used=False,result='PASS')
    if (HERE/'MANIFEST.json').exists():
        m=json.loads((HERE/'MANIFEST.json').read_text())
        for name,h in m['sha256'].items():require(hashlib.sha256((HERE/name).read_bytes().replace(b'\r\n',b'\n')).hexdigest()==h,'freeze '+name)
    return result
if __name__=='__main__':print(json.dumps(check(),sort_keys=True))
