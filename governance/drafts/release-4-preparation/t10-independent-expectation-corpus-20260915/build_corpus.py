"""UNISSUED CANDIDATE. Assemble reviewed truth BEFORE any candidate execution.
No numerical subject imports; reviewed vectors remain immutable. Component-only
n=2 tails specialize the already-reviewed beta integral, with rational t.
"""
import copy
from fractions import Fraction as Q
import hashlib
import json
import math
from pathlib import Path
import struct
import subprocess
import sys

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
PINS = json.loads((HERE / 'INPUTS.json').read_text())
SOURCES = {x['id']: x for x in PINS['sources']}
GIT = ['git', '-c', 'safe.directory=' + ROOT.as_posix()]
B = int(PINS['B'])
ONE = 0x3ff0000000000000
MAX = 0x7fefffffffffffff

def require(ok, message):
    if not ok:
        raise ValueError(message)

def source(id):
    pin = SOURCES[id]
    raw = subprocess.check_output(GIT + ['show', pin['commit'] + ':' + pin['path']], cwd=ROOT)
    require(hashlib.sha256(raw).hexdigest() == pin['sha256'], 'source SHA ' + id)
    require(hashlib.sha1(b'blob '+str(len(raw)).encode()+b'\0'+raw).hexdigest() == pin['git_blob'], 'source blob ' + id)
    return raw

def data(value):
    return (json.dumps(value, sort_keys=True, separators=(',', ':'), ensure_ascii=True, allow_nan=False)+'\n').encode()

def bits(x):
    return struct.unpack('>Q', struct.pack('>d', float(x)))[0]

def number(x):
    return struct.unpack('>d', struct.pack('>Q', x))[0]

def pair(q):
    return [hex(q.numerator), hex(q.denominator)]

def seal(records):
    # canonicalize is pinned by LOCK. This only authors input integrity, no truth.
    return json.loads(subprocess.check_output(['node', str(HERE/'seal.mjs')], input=data(records), cwd=ROOT))

def claim(name, level, sources, note):
    return dict(claim=name, independence_level=level, sources=sources,
                derivation=note, candidate_output_used_to_derive_expectation=False)

def quantity_ids(record):
    d=record['payload']['design']; fs={f['factor_id']:f for f in d['factors']}
    levels=[fs[f]['level_order'] for f in d['factor_order']]
    cells={tuple(c['levels']):c['cell_id'] for c in d['cells']}
    order=[cells[(a,b)] for a in levels[0] for b in levels[1]]
    return ([{'quantity':'n','cell_id':c} for c in order]
        +[{'quantity':'residual_degrees_of_freedom'}]
        +[{'quantity':'mean','cell_id':c} for c in order]
        +[{'quantity':k,'contrast_kind':c} for k in ('signed_estimate','sum_of_squares') for c in ('A','B','AB')]
        +[{'quantity':'residual_sum_of_squares'}]
        +[{'quantity':k,'contrast_kind':c} for k in ('f_statistic','p_value') for c in ('A','B','AB')])

def declarations(r):
    result=r['payload']['result']; ids=quantity_ids(r)
    ss={x['cell_id']:x for x in result['cell_summaries']}; cs={x['kind']:x for x in result['contrasts']}
    out=[]
    for i,x in enumerate(ids):
        obj=ss[x['cell_id']] if 'cell_id' in x else cs[x['contrast_kind']] if 'contrast_kind' in x else result
        v=obj[x['quantity']]
        out.append(int(v) if i<5 else bits(v))
    return out

def cost(n, widths):
    # Declarative RG1 ledger, evaluated directly; no imported costing routine.
    a=2*(n-1); r=(n-1).bit_length(); ell=(2*a-1).bit_length()
    k0=6396+4*r
    ks=[8*a*(w+2*ell+6)+8192 for w in widths]
    parts=[64*(128*n+2048)*(k0+1)**3,
           64*(32*a+256)*sum((k+1)**3 for k in ks),
           (22*(8*max([k0]+ks)+512)+320)**2]
    return sum(parts)

def expected(gate, reason=None, mismatch=(), codes=(), record=None, integrity='pass'):
    e=dict(execution='completed',conformance='pass',profile_eligibility='eligible',
           checks=['completed/'+integrity,'completed/pass','completed/pass','completed/'+('fail' if mismatch else 'pass')],
           reasons=[[] if integrity=='pass' else ['NRS-DIGEST-MISMATCH'],[],[],[]],quantities=[])
    if gate in ('input_refusal','unsupported_bundle','resource_refusal'):
        return dict(execution='execution_refusal',reason=reason)
    if gate=='conformance_failure':
        e.update(conformance='fail',conformance_reason=reason,profile_eligibility='not_evaluated',checks=['not_run']*4,reasons=[[reason]]*4)
    elif gate=='admissibility_failure':
        e.update(profile_eligibility='ineligible',checks=['completed/'+integrity,'completed/fail','not_run','not_run'])
        e['reasons'][1:]=[[reason],[reason],[reason]]
    elif gate!='eligible':
        e['checks'][2:]=['completed/fail' if gate=='computability fail' else 'not_run','not_run']
        e['reasons'][2:]=[[reason],[reason]]
    else:
        e['quantities']=[dict(identity=x,expected_code=str(c),outcome='fail' if i in mismatch else 'pass',
                             reason='NRS-DECLARED-RESULT-MISMATCH' if i in mismatch else None)
                         for i,(x,c) in enumerate(zip(quantity_ids(record),codes))]
        if mismatch:e['reasons'][3]=['NRS-DECLARED-RESULT-MISMATCH']
    return e

def main():
    fixtures=[]
    def add(id, category, raw, exp, claims, **extra):
        fixtures.append(dict(id=id,status='UNISSUED CANDIDATE',category=category,raw=raw,
          input_sha256=hashlib.sha256(raw.encode()).hexdigest(),expected=exp,claims=claims,
          candidate_output_used_to_derive_expectation=False,**extra))
    records=source('G5-RECORDS.jsonl').decode().splitlines()
    vectors=[json.loads(x) for x in source('G5-EXPECTED-VECTORS.jsonl').splitlines()]
    require(len(records)==len(vectors)==128,'reviewed 128 Records')
    indexed={e['id']:(raw,e) for raw,e in zip(records,vectors)}
    gate_reasons={'computability fail':'NRS-BTF-ZERO-RESIDUAL','representation refusal':'NRS-BTF-REPRESENTATION-UNSUPPORTED',
                  'supported-domain refusal':'NRS-BTF-SUPPORTED-DOMAIN-EXCLUDED'}
    structure={'declared-SSE-zero':('conformance_failure','NRS-SCHEMA-INVALID'),
      'model-missing':('conformance_failure','NRS-SCHEMA-INVALID'),
      'unknown-payload-member':('conformance_failure','NRS-SCHEMA-INVALID'),
      'duplicate-observation':('conformance_failure','NRS-BTF-IDENTITY-AMBIGUOUS'),
      'model-false':('admissibility_failure','NRS-BTF-MODEL-NOT-DECLARED'),
      'repeated-unit':('admissibility_failure','NRS-BTF-UNIT-NOT-UNIQUE'),
      'unbalanced':('admissibility_failure','NRS-BTF-CELL-COUNTS-UNSUPPORTED')}
    truth=[claim('integer, arithmetic and tail projection values','C',['G5-EXPECTED-VECTORS.jsonl','OLD-ORACLE','G5-check_evidence.py','T05-REVIEW-EVIDENCE.md','T05-RECEIPTS.json'],
      'Frozen residual/quotient/Fraction expectations. EC1/EC2 separate close checked residual arithmetic and positive-coefficient tail rounding cells; not G5 RESULTS replay. Each quantity inherits this source plus its vector id/ordinal.')]
    semantics=claim('gate, dependency, aggregate and reasons','D',['CLAUSES','SURFACE','OPEN'],
      'Transcribe fixed preflight / SSE / cost / D04 / Z-B order and all-quantity comparison. Admissibility does not gate integrity. No claimed partial public evidence after a numerical gate.')
    for raw,e in zip(records,vectors):
        r=json.loads(raw);gate=e['gate'];reason=gate_reasons.get(gate);id=e['id']
        if id in structure:gate,reason=structure[id]
        codes=e['target_codes']; mismatch=e['mismatches'] or []
        if gate=='eligible':
            require(len(codes)==22,'complete '+id)
            require([i for i,(a,b) in enumerate(zip(declarations(r),codes)) if a!=b]==mismatch,'declared mutation '+id)
        ledger=None
        if e['cost'] is not None:
            fs=[Q(int(a,16),int(b,16)) for a,b in e['exact_real'][11:14]]
            ws=[max(1,abs(f.numerator).bit_length(),f.denominator.bit_length()) for f in fs]
            require(len(ws)==3 and cost(e['integer_targets'][0],ws)==e['cost'],'independent ledger '+id)
            ledger=dict(n=e['integer_targets'][0],widths=ws,C=str(e['cost']),B=str(B),relation='<' if e['cost']<B else '=' if e['cost']==B else '>')
        exp=expected(gate,reason,mismatch,codes,r)
        add('g5/'+id,'B' if mismatch else 'D' if id in structure else 'A' if gate=='eligible' else 'C',raw,exp,
          truth+[semantics,claim('J-cost boundary','C',['G4-COST-DEFINITION.json','G4-DECISION.md','T05-REVIEW-EVIDENCE.md'],
          'Reviewed full cost witness; separately evaluate declarative ledger from n and reduced F widths, without candidate costing helper.')],
          vector_id=id,ledger=ledger,exact_arithmetic=e['exact_real'])
    # Add deliberate multi-slot mutations of reviewed truth. Input digest only is resealed.
    base_raw,base_e=indexed['ordinary_dyadic_n3'];mutations=[]
    patterns={'two-mismatches':[0,5],'multiple-nontail':[5,6,15],'tail-and-nontail':[9,20],'three-effects':[9,10,11]}
    for id,indices in patterns.items():
        r=json.loads(base_raw);ids=quantity_ids(r);res=r['payload']['result']
        for i in indices:
            x=ids[i];obj=next(s for s in res['cell_summaries'] if s['cell_id']==x['cell_id']) if 'cell_id' in x else next(s for s in res['contrasts'] if s['kind']==x['contrast_kind']) if 'contrast_kind' in x else res
            v=obj[x['quantity']];obj[x['quantity']]=v+1 if i<5 else math.nextafter(v,-math.inf if i>=19 else math.inf)
        mutations.append(r)
    for (id,indices),raw in zip(patterns.items(),seal(mutations)):
        r=json.loads(raw);require([i for i,(a,b) in enumerate(zip(declarations(r),base_e['target_codes'])) if a!=b]==indices,'mutation identities')
        add('multi/'+id,'E',raw,expected('eligible',mismatch=indices,codes=base_e['target_codes'],record=r),truth+[semantics,claim('deliberate mismatch identities','D',['G5-EXPECTED-VECTORS.jsonl'],'Modify only listed declarations relative to independently fixed ordinary_dyadic_n3 truth; reseal input digest.')],vector_id='ordinary_dyadic_n3',mutated_indices=indices)
    for f in json.loads(source('T07'))['cases']:
        x=f['expected']
        if f['kind']!='record' or x['category']=='accepted':continue
        add('structure/'+f['name'],'D',f['raw'],expected(x['category'],x['reason'],integrity='fail'),
            [semantics,claim('structural rejection and reason','D',['T07','OPEN','CLAUSES'],
             f['name']+': '+x['stage']+' construction in hand-authored T07 fixture. These declarations are not numerical truth. All-zero placeholder digest intentionally fails if integrity is reached.')])
    add('structure/malformed-json','D','{broken',expected('input_refusal','NRS-PARSE-FAILED'),
        [claim('malformed input refusal','D',['CANON','CLAUSES'],'Unquoted object member name is not JSON; no numerical invocation.')])
    # Never execute the implementation to discover expectations.
    out=HERE/'corpus';out.mkdir(exist_ok=True)
    (out/'fixtures.jsonl').write_bytes(b''.join(data(f) for f in fixtures))
    # Component-only binary64 expectations, analytic IEEE fields/midpoints.
    projections=[]
    def proj(id,q,code,note):
        projections.append(dict(id=id,scope='component-only; not whole-Record admission',rational=pair(q),expected_code=None if code is None else str(code),
          claims=[claim('public projection','A',['IEEE','IEEE-VECTORS','CLAUSES'],note)],candidate_output_used_to_derive_expectation=False))
    unit=Q(1,1<<1074);maxq=Q((1<<53)-1)*(1<<971)
    for code in (0,1,2,(1<<52)-1,1<<52,ONE,MAX):
        proj('exact-'+hex(code),Q(number(code)),code,'IEEE field value is already exactly representable; D04 allows the finite maximum.')
    for lo,hi in ((0,1),(1,2),((1<<52)-1,1<<52),(ONE,ONE+1),(ONE+1,ONE+2)):
        proj('midpoint-'+hex(lo),(Q(number(lo))+Q(number(hi)))/2,lo if lo%2==0 else hi,'Exact adjacent midpoint selects even low-order significand bit.')
    proj('ordinary-inexact',Q(1)+Q(1,5*(1<<52)),ONE,'One plus one fifth ulp is below midpoint.')
    proj('negative-permitted-zero',-unit/4,0,'Internal projection normalizes mathematical nonzero rounding to zero; received -0 stays forbidden.')
    proj('above-finite-D04',maxq+1,None,'Project convention refuses exact magnitude above max, even when IEEE nearest would be max.')
    (out/'projections.jsonl').write_bytes(b''.join(data(x) for x in projections))
    # n=2 => a=2. Reviewed integral gives p = 1 - (3t-t^3)/2,
    # with F=4t^2/(1-t^2). Rational t makes p exact, with no root algorithm.
    tails=[]
    ts=[('F-zero',Q(0)),('rational-ordinary',Q(1,2)),('midpoint-near-above',Q(1,2)+Q(1,9*(1<<52))),
        ('midpoint-near-below',Q(1,2)+Q(1,9*(1<<52))+Q(1,1<<110)),
        ('positive-small-normal',1-Q(1,1<<500)),('positive-subnormal',1-Q(1,1<<520)),
        ('positive-underflow',1-Q(1,1<<540))]
    for id,t in ts:
        f=4*t*t/(1-t*t);q=1-(3*t-t*t*t)/2;c=bits(float(q))
        require(q>0,'finite F positive tail')
        tails.append(dict(id=id,scope='component-only exact F; no raw realization or J-cost admission claim',n=2,F=pair(f),t=pair(t),exact_p=pair(q),expected_code=str(c),positive=True,
          public_gate='representation refusal' if c==0 else 'tail-eligible',
          claims=[claim('tail projection and Z-B','A',['METHOD','METHOD-VECTORS','CLAUSES'],
           'Specialize reviewed beta integral at a=2, rational t: F=4t^2/(1-t^2); p=1-(3t-t^3)/2. Exact Fraction converted once by CPython nearest-even, verified by exact midpoint inequalities in self-check; no S-C/helper or candidate output.')],candidate_output_used_to_derive_expectation=False))
    (out/'tails.jsonl').write_bytes(b''.join(data(x) for x in tails))
    print(json.dumps(dict(records=len(fixtures),projections=len(projections),tails=len(tails),candidate_executed=False)))

if __name__=='__main__':main()
