"""UNISSUED CANDIDATE. Authority-only correction, no subject execution."""
import hashlib
import json
from pathlib import Path
import subprocess
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[3]
PINS=json.loads((HERE/'INPUTS.json').read_text())
ALLOWED={'original-corpus','projection-vectors','tail-vectors'}
def read_source(id):
    if id not in ALLOWED:raise ValueError('non-expectation generator input')
    x=next(x for x in PINS['sources'] if x['id']==id)
    b=subprocess.check_output(['git','-c','safe.directory='+ROOT.as_posix(),'-C',str(ROOT),'show',x['commit']+':'+x['path']])
    if hashlib.sha256(b).hexdigest()!=x['sha256']:raise ValueError('pin')
    return b

def main():
    raw=read_source('original-corpus');rows=[json.loads(x) for x in raw.splitlines()]
    f=next(x for x in rows if x['id']=='structure/overflow-number')
    f['expected']={'execution':'execution_refusal','refusal_kind':'canonicalization_failure','output_type':'nomue-verifier-refusal',
      'schema':'urn:nomue:schema:verifier-refusal:0.2.0-draft.3','required_reason_codes':['NRS-CANONICALIZATION-FAILED'],
      'report_present':False,'external_check_results_present':False,'exit_code':2}
    f['internal_expectation']={'numerical_calls':0}
    f['claims']=[{'claim':'external reportless canonicalization failure','independence_level':'D',
      'sources':['refusal-contract','canonicalization','exit-contract','refusal-schema','reasons'],
      'derivation':'NRS-CORE-0011 / CANON-0005 / VERIFY-0018 and VERIFY-0025; final invocation authority, not T07 local diagnostic or candidate actual.',
      'candidate_output_used_to_derive_expectation':False},
      {'claim':'internal numerical core not invoked','independence_level':'D','sources':['t07-evidence','t07-rules'],
       'derivation':'Known structurally rejected input does not reach numerical work; no internal check state added to the external refusal.',
       'candidate_output_used_to_derive_expectation':False}]
    target=HERE/'corpus';target.mkdir(exist_ok=True)
    (target/'fixtures.jsonl').write_bytes(b''.join((json.dumps(x,sort_keys=True,separators=(',',':'),ensure_ascii=True)+'\n').encode() for x in rows))
    for id,name in [('projection-vectors','projections.jsonl'),('tail-vectors','tails.jsonl')]:
        (target/name).write_bytes(read_source(id))
if __name__=='__main__':main()
