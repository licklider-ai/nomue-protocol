"""UNISSUED CANDIDATE. Candidate component comparison AFTER expectation freeze."""
import hashlib
import importlib.util
import json
from pathlib import Path
import platform
import sys
from fractions import Fraction as Q
HERE=Path(__file__).resolve().parent
REV=HERE.parent/'t10-independent-expectation-corpus-revision-2-20260915'
sys.path.insert(0,str(HERE.parent/'t08-limited-numerical-adapter-20260915'))
from core_loader import reviewed_core

def main():
    output=Path(sys.argv[sys.argv.index('--output')+1])
    if output.exists():raise ValueError('new output required')
    m=json.loads((REV/'MANIFEST.json').read_text())
    for name,h in m['sha256'].items():
        if hashlib.sha256((REV/name).read_bytes().replace(b'\r\n',b'\n')).hexdigest()!=h:raise ValueError('B freeze drift')
    rows=[]
    with reviewed_core() as core:
        for group,name in [('projection','projections.jsonl'),('tail','tails.jsonl')]:
            for line in (REV/'corpus'/name).read_bytes().splitlines():
                f=json.loads(line)
                if group=='projection':
                    q=Q(*(int(x,16) for x in f['rational']));code,detail=core.project(q)
                    got=None if code is None else str(code)
                else:
                    q=Q(*(int(x,16) for x in f['F']));detail=core.tail(q,f['n']);got=str(detail['code'])
                row=dict(id=f['id'],scope=f['scope'],group=group,expected_code=f['expected_code'],actual_code=got,result='PASS' if got==f['expected_code'] else 'MISMATCH')
                rows.append(row)
                if row['result']!='PASS':
                    output.write_text(json.dumps(dict(rows=rows,result='MISMATCH'),indent=2)+'\n');raise ValueError('T10 INDEPENDENT EXPECTATION MISMATCH '+f['id'])
    output.write_text(json.dumps(dict(status='UNISSUED CANDIDATE',python=platform.python_version(),system=platform.system(),machine=platform.machine(),optimize=sys.flags.optimize,expectation_commit='c262931584bbdac0018ffdef59a9b5a186b7cc5c',rows=rows,result='PASS'),indent=2)+'\n',encoding='utf-8',newline='\n')
    print(json.dumps(dict(result='PASS',components=len(rows),optimize=sys.flags.optimize)))
if __name__=='__main__':main()
