"""G4 fixed-cost budget/domain research, not G5 public-check integration."""
import argparse
from collections import Counter
from fractions import Fraction as Q
import hashlib
import importlib.util
import json
import math
from pathlib import Path
import struct
import sys

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
GATE = HERE.parent/'t04-g1-g3-research-gate-20260914'
OLD = HERE.parent/'t04-ec1-ec2-evidence-20260914'
CHECKS = 0
TAIL_CACHE = {}


def require(ok,message):
    global CHECKS
    CHECKS += 1
    if not ok:
        raise AssertionError(message)


def canonical(value):
    return (json.dumps(value,sort_keys=True,separators=(',',':'))+'\n').encode()


def digest(value):
    return hashlib.sha256(canonical(value)).hexdigest()


def module(name,path):
    spec=importlib.util.spec_from_file_location(name,path)
    m=importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    require(Path(m.__file__).resolve()==path,'module origin')
    return m


def subjects():
    definition=json.loads((HERE/'COST-DEFINITION.json').read_text())
    for key in ('source','derivation'):
        row=definition[key]
        require(hashlib.sha256((ROOT/row['path']).read_bytes()).hexdigest()==row['sha256'],'cost source pin')
    require(hashlib.sha256((HERE/'PLAN.md').read_bytes()).hexdigest()==definition['precomparison_plan_sha256'],'plan pin')
    g=module('gate_research',GATE/'check_evidence.py')
    o=module('old_research',OLD/'check_evidence.py')
    ar,_=o.load_subjects()
    return g,o,ar


def fixed_cost(n,widths):
    require(2<=n<=(1<<51)-1 and len(widths)==3 and min(widths)>=1,'cost inputs')
    a=2*(n-1)
    r=(n-1).bit_length()
    ell=(2*a-1).bit_length()
    unit=lambda k:64*(k+1)**3
    k0=4196+4*r+2200
    kx=[8*a*(w+2*ell+6)+8192 for w in widths]
    pre=(128*n+2048)*unit(k0)
    construction=32*a*sum(unit(k) for k in kx)
    decision=256*sum(unit(k) for k in kx)
    evidence_bits=22*(8*max([k0]+kx)+512)+320
    evidence=evidence_bits**2
    components={'preflight_and_non_tail':pre,'linear_tail_construction_allowance':construction,
                'fixed_tail_boundary_decision_allowance':decision,'evidence_and_aggregation':evidence}
    return {'total':sum(components.values()),'components':components,'K0':k0,'Kx':kx,
            'evidence_bits_bound':evidence_bits,'dominant':max(components,key=components.get)}


def count_frontier(budget):
    lo,hi=1,(1<<51)-1
    while lo<hi:
        mid=(lo+hi+1)//2
        if fixed_cost(mid,[1,1,1])['total']<=budget:
            lo=mid
        else:
            hi=mid-1
    return lo


def width_frontier(n,budget):
    if fixed_cost(n,[1]*3)['total']>budget:
        return None
    lo,hi=1,4353
    while lo<hi:
        mid=(lo+hi+1)//2
        if fixed_cost(n,[mid]*3)['total']<=budget:
            lo=mid
        else:
            hi=mid-1
    return lo


def raw_cells(recipe,n):
    if recipe=='ordinary_zero':
        return [[((i*5)%11-5)/8 for i in range(n)] for _ in range(4)]
    if recipe=='ordinary_dyadic':
        return [[((i*7+c*11)%31-15)/8 + (0,1,2,4)[c]/4 for i in range(n)] for c in range(4)]
    if recipe=='ordinary_decimal':
        # Fixed binary64 values from decimal lexical inputs, then exact dyadic operations.
        base=[float(x) for x in ('0.1','0.7','1.3','2.9','4.1','5.3','7.7')]
        return [[base[(i*3+c)%len(base)] + c/4 for i in range(n)] for c in range(4)]
    if recipe=='ordinary_tiny_contrast':
        return [[((i*5)%11-5)/8 + c*2.**-20 for i in range(n)] for c in range(4)]
    if recipe.startswith('scaled_'):
        exponent=int(recipe.split('_')[1])
        return [[math.ldexp(x,exponent) for x in cell] for cell in raw_cells('ordinary_dyadic',n)]
    if recipe=='mixed_exponents':
        return [[math.ldexp((-1. if i%2 else 1.)*(1+c/8),(-200,0,200)[i%3]) for i in range(n)] for c in range(4)]
    if recipe=='extreme_finite':
        m=float.fromhex('0x1.fffffffffffffp+1023')
        return [[m if i%2 else -m for i in range(n)] for _ in range(4)]
    if recipe=='large_offset':
        base=2.**500
        return [[base+((i*7+c*3)%13)*2.**448 for i in range(n)] for c in range(4)]
    if recipe=='tiny_contrast':
        return [[(-1. if i%2 else 1.) + (c*2.**-48 if i==0 else 0.) for i in range(n)] for c in range(4)]
    if recipe=='tiny_residual':
        return [[c/4+(i%2)*2.**-40 for i in range(n)] for c in range(4)]
    if recipe=='cancellation_moments':
        return [[1.+((i+c)%3)*2.**-52 for i in range(n)] for c in range(4)]
    raise ValueError(recipe)


def corpus():
    rows=[]
    for n in (2,3,8,16,32,64,128,256,512):
        for recipe in ('ordinary_zero','ordinary_dyadic','ordinary_decimal','ordinary_tiny_contrast'):
            rows.append({'id':recipe+'_n'+str(n),'group':'ordinary','kind':'raw_observations','n':n,'recipe':recipe})
    for n in (2,16,64,256):
        for recipe in ('scaled_-400','scaled_-20','scaled_20','scaled_400','mixed_exponents','extreme_finite'):
            rows.append({'id':recipe+'_n'+str(n),'group':'dynamic_range','kind':'raw_observations','n':n,'recipe':recipe})
    for n in (2,8,32,128,512):
        for recipe in ('large_offset','tiny_contrast','tiny_residual','cancellation_moments'):
            rows.append({'id':recipe+'_n'+str(n),'group':'cancellation','kind':'raw_observations','n':n,'recipe':recipe})
    inherited=json.loads((GATE/'RESULTS.jsonl').read_text())
    for row in inherited['raw_fixtures']:
        rows.append({'id':'inherited_'+row['name'],'group':'raw_boundary','kind':'raw_observations','n':2,
                     'cells_hex':row['cells_hex'],'source':'G1-G3 raw_fixtures/'+row['name']})
    for key in ('tail_probes','boundary_witnesses','exact_midpoint_tails'):
        for i,row in enumerate(inherited[key]):
            rows.append({'id':key+'_'+str(i),'group':'synthetic_tail','kind':'synthetic_three_equal_tails',
                         'n':row.get('n',2),'F':row['F'],'expected_code':row['result']['code'],
                         'label':row.get('label','exact_midpoint'),'source':'G1-G3 '+key+'/'+str(i)})
    return rows


def evaluate(recipe,g,o,ar,cached=True,independent_controls=True):
    n=recipe['n']
    pre=fixed_cost(n,[1]*3)['components']['preflight_and_non_tail']
    row={k:v for k,v in recipe.items() if k not in ('cells_hex',)}
    row.update({'preflight_charge':pre,'cost':None,'widths':None,'semantic_gate':'eligible',
                'tail_codes':[],'tail_witness_sha256':[],'observed_tail_bits':[],
                'actual_witness_bytes':0})
    if recipe['kind']=='raw_observations':
        cells=[[float.fromhex(x) for x in c] for c in recipe['cells_hex']] if 'cells_hex' in recipe else raw_cells(recipe['recipe'],n)
        row['observations_sha256']=digest([[x.hex() for x in c] for c in cells])
        vals=[abs(x) for c in cells for x in c if x]
        row['magnitude_exponents']=None if not vals else [min(math.frexp(x)[1]-1 for x in vals),max(math.frexp(x)[1]-1 for x in vals)]
        exact=ar.exact_candidate(cells)
        sse=Q(*exact['sse'][0])
        require(sse>=0,'explicit SSE invariant in both modes')
        if independent_controls:
            direct=o.direct(cells)
            for k in ('means','estimates','ss','sse','f'):
                got=None if exact[k] is None else [Q(*v) for v in exact[k]]
                require(got==direct[k],'residual/moment cross-check '+recipe['id']+':'+k)
        if not sse:
            row['semantic_gate']='exact_zero_SSE'
            row['non_tail_projection_count']=11
            row['dependency']='three_F_and_three_p_not_run'
            return row
        fs=[Q(*f) for f in exact['f']]
        targets=[Q(*v) for k in ('means','estimates','ss','sse','f') for v in exact[k]]
        require(len(targets)==14,'14 mandatory non-tail real projections')
        codes=[o.rn(q) for q in targets]
        row['non_tail_projection_count']=len(codes)
        row['non_tail_codes']=codes
        if any(c is None for c in codes):
            row['semantic_gate']='D04_arithmetic_range'
        elif o.rn(sse)==0:
            row['semantic_gate']='positive_SSE_projects_zero'
    else:
        fs=[Q(int(recipe['F'][0],16),int(recipe['F'][1],16))]*3
        row['magnitude_exponents']=None
        row['non_tail_projection_count']=None
        row['scope']='synthetic three equal exact-F tails; not whole-Record admission evidence'
    widths=[g.width(f) for f in fs]
    row['widths']=widths
    row['cost']=fixed_cost(n,widths)
    require(row['cost']['total']==g.cost(n,widths)['S_C'],'frozen reviewed cost equality')
    if recipe['kind']=='raw_observations':
        require(max(widths)<=4353,'derived raw-input F width bound')
    if row['semantic_gate']!='eligible':
        row['dependency']='three_p_not_run_after_representation_gate'
        return row
    for f in fs:
        key=(n,f)
        if cached and key in TAIL_CACHE:
            tail=TAIL_CACHE[key]
        else:
            tail,_=g.integer_tail(f,n)
            if cached:
                TAIL_CACHE[key]=tail
        row['tail_codes'].append(tail['code'])
        row['tail_witness_sha256'].append(digest(tail['T']))
        row['observed_tail_bits'].append(tail['observed_bits'])
        row['actual_witness_bytes']+=len(canonical(tail))
    if recipe['kind']!='raw_observations' and recipe.get('expected_code') is not None:
        require(all(c==recipe['expected_code'] for c in row['tail_codes']),'inherited boundary expectation')
    if 0 in row['tail_codes']:
        row['semantic_gate']='positive_tail_underflow'
    return row


def decision(row,budget):
    if row['cost'] is None:
        return 'semantic_refusal:'+row['semantic_gate']
    if row['cost']['total']>budget:
        return 'cost_refusal:'+row['cost']['dominant']
    if row['semantic_gate']!='eligible':
        return 'semantic_refusal:'+row['semantic_gate']
    return 'admitted'


def distribution(values):
    vals=sorted(values)
    if not vals:
        return None
    return {'min':vals[0],'median':vals[(len(vals)-1)//2],'p90':vals[math.ceil(.9*len(vals))-1],'max':vals[-1]}


def coverage(rows,budget):
    groups={}
    for group in sorted({r['group'] for r in rows}):
        subset=[r for r in rows if r['group']==group]
        admitted=[r for r in subset if decision(r,budget)=='admitted']
        refused=[r for r in subset if decision(r,budget)!='admitted']
        by_n={str(n):{'total':sum(r['n']==n for r in subset),
                     'admitted':sum(r['n']==n for r in admitted)} for n in sorted({r['n'] for r in subset})}
        groups[group]={'total':len(subset),'admitted':len(admitted),'refused':len(refused),
                       'refusal_rate_fraction':[len(refused),len(subset)],
                       'refusal_reasons':dict(sorted(Counter(decision(r,budget) for r in refused).items())),
                       'n_distribution':by_n,'max_admitted_n':max((r['n'] for r in admitted),default=None),
                       'min_refused_n':min((r['n'] for r in refused),default=None),
                       'charged_cost_distribution':distribution([r['cost']['total'] for r in subset if r['cost']]),
                       'admitted_cost_distribution':distribution([r['cost']['total'] for r in admitted]),
                       'admitted_ids':[r['id'] for r in admitted]}
    strata={}
    for group in ('dynamic_range','cancellation'):
        for label in sorted({r.get('recipe') for r in rows if r['group']==group}):
            subset=[r for r in rows if r.get('recipe')==label]
            strata[label]={'total':len(subset),'admitted':sum(decision(r,budget)=='admitted' for r in subset)}
    return {'groups':groups,'strata':strata}


def run():
    g,o,ar=subjects()
    recipes=corpus()
    rows=[evaluate(r,g,o,ar) for r in recipes]
    budgets=[]
    for name,ceiling in [('Small',32),('Medium',128),('Large',512)]:
        anchors=[r for r in rows if r['group']=='ordinary' and r['n']<=ceiling]
        anchor=max(anchors,key=lambda r:r['cost']['total'])
        b=anchor['cost']['total']
        require(decision(anchor,b)=='admitted' and decision(anchor,b-1).startswith('cost_refusal'),'inclusive anchor threshold')
        budgets.append({'name':name,'B':b,'anchor':anchor['id'],'anchor_n_tier':ceiling,
                        'coverage':coverage(rows,b),'derived_count_frontier':count_frontier(b)})
    require(budgets[0]['B']<budgets[1]['B']<budgets[2]['B'],'strict budget ordering')
    sets=[{r['id'] for r in rows if decision(r,b['B'])=='admitted'} for b in budgets]
    require(sets[0]<=sets[1]<=sets[2],'budget membership monotonicity')
    for b in budgets:
        frontier=b['derived_count_frontier']
        require(fixed_cost(frontier,[1]*3)['total']<=b['B'],'derived count boundary inside')
        require(fixed_cost(frontier+1,[1]*3)['total']>b['B'],'derived count boundary outside')
        b['equal_width_frontiers']={str(n):width_frontier(n,b['B']) for n in (2,16,32,64,128,256,512,frontier)}
        b['criteria']={
            'all_ordinary_through_128':all(decision(r,b['B'])=='admitted' for r in rows if r['group']=='ordinary' and r['n']<=128),
            'ordinary_larger_count':any(decision(r,b['B'])=='admitted' for r in rows if r['group']=='ordinary' and r['n']>=256),
            'small_and_large_scalings':all(any(decision(r,b['B'])=='admitted' for r in rows if r.get('recipe')==label) for label in ('scaled_-400','scaled_400')),
            'offset_and_tiny_contrast':all(any(decision(r,b['B'])=='admitted' for r in rows if r.get('recipe')==label) for label in ('large_offset','tiny_contrast')),
            'positive_boundary_witnesses':all(decision(r,b['B'])=='admitted' for r in rows if r['id'].startswith('boundary_witnesses_') and r['semantic_gate']=='eligible'),
            'explained_cost_refusals':any(decision(r,b['B']).startswith('cost_refusal:') for r in rows),
            'underflow_not_admitted':all(decision(r,b['B'])!='admitted' for r in rows if r['semantic_gate']=='positive_tail_underflow')}
    frontiers=[]
    for budget in budgets:
        for n in sorted({2,32,min(128,budget['derived_count_frontier']),budget['derived_count_frontier']}):
            w=width_frontier(n,budget['B'])
            f=Q(0) if w==1 else Q((1<<w)-1,(1<<w)-3)
            recipe={'id':'frontier_'+budget['name']+'_n'+str(n),'group':'symbolic_frontier',
                    'kind':'synthetic_three_equal_tails','n':n,'F':g.pair(f),
                    'expected_code':None,'scope':'width-frontier rational probe; raw realization unestablished'}
            row=evaluate(recipe,g,o,ar)
            row['anchor_budget']=budget['name']
            require(row['cost']['total']<=budget['B'],'symbolic frontier work admission')
            frontiers.append(row)
    outcomes=[]
    for name,states,expected in [('all_pass',['pass']*22,'pass'),
                                 ('one_mismatch',['pass']*21+['mismatch'],'fail'),
                                 ('multiple_mismatches',['mismatch']*2+['pass']*20,'fail'),
                                 ('representation_refusal',['refusal']+['not_run']*21,'gated_no_comparison_aggregate'),
                                 ('dependency_not_run',['pass']*19+['not_run']*3,'gated_no_comparison_aggregate')]:
        require(o.aggregate(states)==expected,'mandatory outcome control')
        outcomes.append({'name':name,'states':states,'expected':expected,'scope':'abstract 22-slot control, not G5 integration'})
    for n in (2,3,16,128,512,(1<<51)-1):
        for ws in ([1,1,1],[1,4353,17],[4353]*3):
            require(fixed_cost(n,ws)['total']==g.cost(n,ws)['S_C'],'producer expression equality control')
    return {'scope':'G4 only; raw-observation admission vs synthetic tail proxy separated',
            'cost_definition_sha256':hashlib.sha256((HERE/'COST-DEFINITION.json').read_bytes()).hexdigest(),
            'corpus':recipes,'rows':rows,'budgets':budgets,'frontiers':frontiers,'outcomes':outcomes,'checks':CHECKS,
            'monotonicity':'PASS','timing_used_for_membership':False}


def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('--write',action='store_true')
    parser.add_argument('--check',action='store_true')
    args=parser.parse_args()
    result=run()
    raw=canonical(result)
    if args.write:
        (HERE/'RESULTS.jsonl').write_bytes(raw)
    if args.check:
        require((HERE/'RESULTS.jsonl').read_bytes()==raw,'saved byte equality')
    print(json.dumps({'checks':result['checks'],'cases':len(result['rows']),
                      'sha256':hashlib.sha256(raw).hexdigest(),'optimize':sys.flags.optimize,
                      'budgets':[{k:b[k] for k in ('name','B','anchor','derived_count_frontier','criteria')} for b in result['budgets']]},sort_keys=True))


if __name__=='__main__':
    main()
