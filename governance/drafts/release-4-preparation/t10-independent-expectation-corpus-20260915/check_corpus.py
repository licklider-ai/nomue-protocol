"""UNISSUED CANDIDATE. Corpus/provenance checks; no candidate execution."""
import ast
from collections import Counter
from fractions import Fraction as Q
import hashlib
import json
from pathlib import Path
import re
import sys
import subprocess
from build_corpus import HERE, ROOT, PINS, SOURCES, source, require, data, number, cost

def rows(name):
    return [json.loads(line) for line in (HERE/'corpus'/name).read_bytes().splitlines()]

def check():
    for id in SOURCES:source(id)
    fs=rows('fixtures.jsonl');require(len(fs)==174,'fixture count')
    for key in ('id','input_sha256'):require(len({f[key] for f in fs})==len(fs),'unique '+key)
    for f in fs:
        require(f['input_sha256']==hashlib.sha256(f['raw'].encode()).hexdigest(),'input SHA '+f['id'])
        e=f['expected'];qs=e.get('quantities',[])
        require(not qs or len(qs)==22,'22 completeness')
        if qs:
            require(len({json.dumps(q['identity'],sort_keys=True) for q in qs})==22,'22 distinct identities')
            require(e['checks'][3]=='completed/'+('fail' if any(q['outcome']=='fail' for q in qs) else 'pass'),'aggregate')
        for c in f['claims']:
            require(c['independence_level'] in ('A','B','C','D') and c['derivation'] and c['sources'],'provenance')
            require(all(s in SOURCES for s in c['sources']),'source ids')
            require(c['candidate_output_used_to_derive_expectation'] is False,'claim noncircularity flag')
        require(f['candidate_output_used_to_derive_expectation'] is False,'fixture noncircularity flag')
    for i in range(22):
        f=next(f for f in fs if f['id']=='g5/mismatch-'+str(i))
        require([j for j,q in enumerate(f['expected']['quantities']) if q['outcome']=='fail']==[i],'single mismatch coverage')
    require({f['ledger']['relation'] for f in fs if f.get('ledger')}=={'<','=','>'},'cost boundary')
    for f in rows('tails.jsonl'):
        t=Q(*(int(x,16) for x in f['t']));q=Q(*(int(x,16) for x in f['exact_p']));ff=Q(*(int(x,16) for x in f['F']))
        require(ff==4*t*t/(1-t*t),'exact rational F')
        # Positive-coefficient specialization, distinct from builder subtraction.
        require(q==(1-t)**2*(t+2)/2>0,'positive tail identity')
        c=int(f['expected_code']);v=Q(number(c))
        low=Q(0) if c==0 else (Q(number(c-1))+v)/2
        high=Q(1) if c==0x3ff0000000000000 else (v+Q(number(c+1)))/2
        require(low<=q<=high and (c%2==0 or low<q<high),'exact rounding cell')
        midpoint=Q(5,16)-Q(1,1<<55)
        if f['id']=='midpoint-near-above':require(0<q-midpoint<Q(1,1<<100),'above midpoint')
        if f['id']=='midpoint-near-below':require(0<midpoint-q<Q(1,1<<100),'below midpoint')
    scan={}
    allowed={'copy','fractions','hashlib','json','math','pathlib','struct','subprocess','sys'}
    tree=ast.parse((HERE/'build_corpus.py').read_text(encoding='utf-8-sig'))
    imports=[]
    for n in ast.walk(tree):
        if isinstance(n,ast.Import):imports += [x.name for x in n.names]
        if isinstance(n,ast.ImportFrom):imports.append(n.module)
        if isinstance(n,ast.Call) and isinstance(n.func,ast.Name):require(n.func.id not in ('exec','eval','__import__','compile'),'dynamic code forbidden')
    require(set(imports)<=allowed,'builder import allowlist')
    # Narrow subprocess channels: immutable source read and input-only JCS sealer.
    calls=[ast.unparse(n) for n in ast.walk(tree) if isinstance(n,ast.Call) and isinstance(n.func,ast.Attribute) and isinstance(n.func.value,ast.Name) and n.func.value.id=='subprocess']
    require(len(calls)==2 and all('check_output' in c for c in calls),'only two external commands')
    require(any("['show'," in c and 'GIT' in c for c in calls) and any("'seal.mjs'" in c and "['node'," in c for c in calls),'source-only and sealing-only channels')
    sealer=(HERE/'seal.mjs').read_text(); jsimports=re.findall(r'from\s+["\x27]([^"\x27]+)',sealer)
    require(sorted(jsimports)==['canonicalize','node:crypto'],'sealer dependency allowlist')
    require(not any(x in sealer for x in ('import(', 'require(', 'eval(', 'child_process')),'sealer no dynamic loading')
    return dict(status='UNISSUED CANDIDATE',records=len(fs),categories=dict(Counter(f['category'] for f in fs)),
      source_pins=len(SOURCES),single_mismatch_slots=22,component_projections=len(rows('projections.jsonl')),component_tails=len(rows('tails.jsonl')),
      builder_imports=sorted(imports),builder_external_calls=calls,sealer_imports=jsimports,
      reviewed_numeric_path='C: G5 frozen independent vectors, tied to T05 NUMERICAL-CLOSE; not G5 results',
      candidate_executed=False,limitations='Static allowlist plus source review; not a general sandbox or proof of reviewer independence.',result='PASS')

def verify_freeze():
    obj=json.loads((HERE/'EXPECTATIONS-FREEZE.json').read_text())
    for name,sha in obj['sha256'].items():require(hashlib.sha256((HERE/name).read_bytes()).hexdigest()==sha,'frozen expectation '+name)
    require(obj['candidate_executed_before_freeze'] is False,'precomparison order')
    return hashlib.sha256((HERE/'EXPECTATIONS-FREEZE.json').read_bytes()).hexdigest()

if __name__=='__main__':
    result=check()
    if '--freeze' in sys.argv:
        require(not (HERE/'EXPECTATIONS-FREEZE.json').exists(),'never overwrite expectation freeze')
        (HERE/'SELF-CHECK.json').write_bytes(data(result))
        subprocess.run(['node',str(ROOT/'node_modules/prettier/bin/prettier.cjs'),'--write',str(HERE/'SELF-CHECK.json')],check=True)
        names=['INPUTS.json','build_corpus.py','seal.mjs','check_corpus.py','SELF-CHECK.json']+[str(x.relative_to(HERE)).replace('\\','/') for x in sorted((HERE/'corpus').glob('*.jsonl'))]
        (HERE/'EXPECTATIONS-FREEZE.json').write_bytes(data(dict(status='UNISSUED CANDIDATE',base=PINS['base'],candidate_executed_before_freeze=False,
          order='independent construction -> source/import/self checks -> this immutable hash manifest -> candidate comparison',
          sha256={n:hashlib.sha256((HERE/n).read_bytes()).hexdigest() for n in names})))
        subprocess.run(['node',str(ROOT/'node_modules/prettier/bin/prettier.cjs'),'--write',str(HERE/'EXPECTATIONS-FREEZE.json')],check=True)
    if (HERE/'EXPECTATIONS-FREEZE.json').exists():result['freeze_sha256']=verify_freeze()
    print(json.dumps(result,sort_keys=True))
