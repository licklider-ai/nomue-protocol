"""Author evidence: separate residual/quotient oracle, frozen expectations, full records."""
import argparse
from collections import Counter
import copy
from fractions import Fraction as Q
import hashlib
import json
import math
from pathlib import Path
import subprocess
import sys
import procedure as p

HERE = Path(__file__).resolve().parent
CHECKS = 0

def check(ok, message):
    global CHECKS
    CHECKS += 1
    if not ok:
        raise AssertionError(message)

def bridge(raw, seal=False):
    cmd = ['node','--import','tsx',str(HERE/'strict-ingress.ts')]+(['--seal'] if seal else [])
    return subprocess.check_output(cmd,input=raw,cwd=p.ROOT)

def direct_targets(cells):
    # No call to G5 graph/project/tail, or historical moment/project subject.
    d = p.oracle.direct(cells)
    rs = [q for k in ('means','estimates','ss','sse') for q in d[k]]
    if d['f'] is not None:
        rs += d['f']
    codes = [p.oracle.rn(q) for q in rs]
    if d['f'] is None:
        category, cost = 'computability fail', None
    else:
        widths = [max(1,abs(q.numerator).bit_length(),q.denominator.bit_length()) for q in d['f']]
        cost = p.gate.cost(len(cells[0]),widths)['S_C']
        category = ('supported-domain refusal' if cost > p.B else 'representation refusal'
                    if None in codes or codes[10] == 0 else 'eligible')
    tails = []
    if category == 'eligible':
        for f in d['f']:
            code, _, _ = p.oracle.exact_tail_sign_oracle(f,len(cells[0]))
            tails.append(code)
        if 0 in tails:
            category = 'representation refusal'
    ints = d['counts']+[d['df']]
    return {'gate':category,'cost':cost,'integer_targets':ints,'exact_real':[p.pair(q) for q in rs],
            'target_codes':ints+codes+tails,'tail_codes':tails}

def make_record(name,cells,expected):
    cids = ['cell-00','cell-01','cell-10','cell-11']
    target = expected['target_codes']
    # Gated fixtures carry complete structurally legal declarations, not claimed truth.
    def projected(i, fallback=0.0):
        return p.number(target[i]) if i < len(target) and target[i] is not None else fallback
    sse = projected(15,1.0)
    if sse <= 0:
        sse = 1.0
    record = {'$schema':p.IDS['schema'],'record_type':'nomue-record','record_id':'urn:g5:record:'+name,
              'revision_id':'urn:g5:revision:'+name,'created_at':'2026-09-14T00:00:00Z',
              'interpretation_bundle_id':p.IDS['bundle'],'profile_id':p.IDS['profile'],
              'payload':{'dataset':{'dataset_id':'data','observations':[
                  {'observation_id':f'o-{c}-{i}','experimental_unit_id':f'u-{c}-{i}',
                   'cell_id':cids[c],'outcome_value':y} for c,cell in enumerate(cells) for i,y in enumerate(cell)]},
                  'design':{'design_id':'design','dataset_id':'data','factor_order':['A','B'],
                            'factors':[{'factor_id':'A','level_order':['low','high']},{'factor_id':'B','level_order':['low','high']}],
                            'cells':[{'cell_id':cid,'levels':[('low','high')[c//2],('low','high')[c%2]]} for c,cid in enumerate(cids)],
                            'model_applicability_declared':True},
                  'analysis':{'analysis_id':'analysis','design_id':'design','contract_id':p.IDS['contract']},
                  'result':{'result_id':'result','analysis_id':'analysis',
                            'cell_summaries':[{'cell_id':cid,'n':len(cells[c]),'mean':projected(5+c)} for c,cid in enumerate(cids)],
                            'residual_sum_of_squares':sse,'residual_degrees_of_freedom':4*(len(cells[0])-1),
                            'contrasts':[{'kind':kind,'signed_estimate':projected(9+j),'sum_of_squares':projected(12+j),
                                          'f_statistic':projected(16+j),'p_value':projected(19+j,0.5)} for j,kind in enumerate(('A','B','AB'))]}},
              'integrity':{'canonicalization_id':'urn:nomue:canonicalization:jcs:0.2.0-draft.1','digest_algorithm':'sha-256',
                           'digest_scope':'record_without_integrity','content_digest':'sha256:'+'0'*64}}
    return record

def perturb(record,i):
    result = record['payload']['result']
    if i < 4:
        result['cell_summaries'][i]['n'] += 1
    elif i == 4:
        result['residual_degrees_of_freedom'] += 1
    else:
        if i < 9:
            obj, key = result['cell_summaries'][i-5], 'mean'
        elif i < 12:
            obj,key = result['contrasts'][i-9], 'signed_estimate'
        elif i < 15:
            obj,key = result['contrasts'][i-12], 'sum_of_squares'
        elif i == 15:
            obj,key = result,'residual_sum_of_squares'
        elif i < 19:
            obj,key = result['contrasts'][i-16], 'f_statistic'
        else:
            obj,key = result['contrasts'][i-19], 'p_value'
        v = obj[key]
        obj[key] = math.nextafter(v, -math.inf if key == 'p_value' and v == 1 else math.inf)

def generate():
    records, expectations = [], []
    def add(name,cells,mutate=None,mismatches=(),override=None):
        expected = direct_targets(cells)
        record = make_record(name,cells,expected)
        if mutate:
            mutate(record)
        if override:
            expected['gate'] = override
        expected.update({'id':name,'mismatches':list(mismatches),'source':'residual arithmetic / quotient projection / Fraction Horner author oracle'})
        records.append(record)
        expectations.append(expected)
    for recipe in p.g4.corpus():
        if recipe['kind'] != 'raw_observations':
            continue
        cells = ([[float.fromhex(y) for y in c] for c in recipe['cells_hex']] if 'cells_hex' in recipe
                 else p.g4.raw_cells(recipe['recipe'],recipe['n']))
        add(recipe['id'],cells)
    basic = p.g4.raw_cells('ordinary_dyadic',3)
    for i in range(22):
        add('mismatch-'+str(i),basic,lambda r,i=i:perturb(r,i),(i,))
    add('multiple-mismatch',basic,lambda r:[perturb(r,i) for i in (0,5,9,12,15,16,19)],(0,5,9,12,15,16,19))
    def reorder(record):
        payload = record['payload']
        for arr in (payload['dataset']['observations'],payload['design']['factors'],payload['design']['cells'],
                    payload['result']['cell_summaries'],payload['result']['contrasts']):
            arr.reverse()
    add('permuted-arrays',basic,reorder)
    def max_ids(record):
        payload = record['payload']
        for obs in payload['dataset']['observations']:
            for field in ('observation_id','experimental_unit_id'):
                obs[field] = obs[field].ljust(256,'x')
        mapping = {c['cell_id']:c['cell_id'].ljust(256,'x') for c in payload['design']['cells']}
        for obj in payload['design']['cells']+payload['result']['cell_summaries']+payload['dataset']['observations']:
            obj['cell_id'] = mapping[obj['cell_id']]
        payload['result']['result_id'] = 'r'*256
    add('maximum-local-ids',basic,max_ids)
    add('fractional-UTC-timestamp',basic,lambda r:r.__setitem__('created_at','2026-09-14T00:00:00.123Z'))
    add('declared-SSE-zero',basic,lambda r:r['payload']['result'].__setitem__('residual_sum_of_squares',0),'', 'conformance fail')
    add('model-false',basic,lambda r:r['payload']['design'].__setitem__('model_applicability_declared',False),override='admissibility fail')
    add('model-missing',basic,lambda r:r['payload']['design'].pop('model_applicability_declared'),override='conformance fail')
    add('repeated-unit',basic,lambda r:r['payload']['dataset']['observations'][1].__setitem__('experimental_unit_id','u-0-0'),override='admissibility fail')
    add('duplicate-observation',basic,lambda r:r['payload']['dataset']['observations'][1].__setitem__('observation_id','o-0-0'),override='conformance fail')
    add('unbalanced',basic,lambda r:r['payload']['dataset']['observations'].pop(),override='admissibility fail')
    add('unknown-payload-member',basic,lambda r:r['payload'].__setitem__('intervals',[]),override='conformance fail')
    add('exact-SSE-zero',[[float(c)]*2 for c in range(4)])
    add('positive-SSE-projects-zero',[[0.,math.ldexp(1.,-1074)]]*4)
    add('positive-F-projects-zero',[[-1.,1.],[-1.,1.],[0.,math.ldexp(1.,-1074)],[0.,0.]])
    add('negative-effect-projects-zero',[[0.,math.ldexp(1.,-1074)],[0.,0.],[-1.,1.],[-1.,1.]])
    add('positive-p-underflow',[[-2.**-270,2.**-270]]*2+[[1.,1.]]*2)
    add('positive-subnormal-p',[[-2.**-260,2.**-260]]*2+[[1.,1.]]*2)
    add('adjacent-count-above-anchor',p.g4.raw_cells('ordinary_decimal',129))
    near = p.g4.raw_cells('ordinary_decimal',128)
    near[2][3] = math.nextafter(near[2][3],-math.inf)
    add('single-ULP-above-anchor',near)
    raw = b''.join(p.canonical(r) for r in records)
    sealed = bridge(raw,True)
    (HERE/'RECORDS.jsonl').write_bytes(sealed)
    (HERE/'EXPECTED-VECTORS.jsonl').write_bytes(b''.join(p.canonical(e) for e in expectations))
    print(json.dumps({'generated_records':len(records),'raw_sha256':hashlib.sha256(sealed).hexdigest()}))

def run():
    expected = [json.loads(line) for line in (HERE/'EXPECTED-VECTORS.jsonl').read_text(encoding='utf-8').splitlines()]
    # Only parse INTERNAL transport generated by the existing TypeScript strict parser.
    transport = [json.loads(line) for line in bridge((HERE/'RECORDS.jsonl').read_bytes()).splitlines()]
    check(len(transport) == len(expected),'fixture count')
    results, by_id = [], {}
    for item, exp in zip(transport,expected):
        check('ingress_error' not in item, 'complete raw ingress '+exp['id'])
        record = item['record']
        check(record['record_id'] == 'urn:g5:record:'+exp['id'], 'fixture identity')
        out = p.run(record,item['integrity_ok'],item['envelope_ok'])
        check(out['gate'] == exp['gate'], 'gate '+exp['id']+': '+str(out.get('reason')))
        if exp['gate'] == 'eligible':
            rows = out['quantities']
            check(len(rows) == 22,'all 22 '+exp['id'])
            check([i for i,r in enumerate(rows) if r['outcome'] == 'fail'] == exp['mismatches'],'exact mismatch positions '+exp['id'])
            check([r['projected'] for r in rows] == exp['target_codes'],'independent 22 target vector '+exp['id'])
            check([r['exact'] for r in rows[5:19]] == exp['exact_real'],'independent exact graph '+exp['id'])
            check(out['recomputation'] == ('completed/fail' if exp['mismatches'] else 'completed/pass'),'aggregate '+exp['id'])
            check(out['cost'] == exp['cost'],'cost cross-check '+exp['id'])
            for row in rows[19:]:
                f = Q(*(int(x,16) for x in rows[row['exact_F_dependency']]['exact']))
                t, compare = p.gate.integer_tail(f,exp['integer_targets'][0])
                check(t['T'] == row['tail']['T'] and t['code'] == row['projected'],'reviewed S-C integer pair and code '+exp['id'])
                p.gate.cell_check(compare,t['code'])
        else:
            check(out['recomputation'] == 'not_run' and all(r['outcome'] == 'not_run' for r in out['quantities']), 'dependency gating '+exp['id'])
        row = {'id':exp['id'],'result':out}
        results.append(row)
        by_id[exp['id']] = (record,out)
    g4saved = json.loads((p.G4DIR/'RESULTS.jsonl').read_text(encoding='utf-8'))
    corpus = []
    for old in g4saved['rows']:
        if old['kind'] == 'raw_observations':
            out = by_id[old['id']][1]
            wanted = p.g4.decision(old,p.B) == 'admitted'
            check(out['membership'] == wanted,'G4/G5 raw membership '+old['id'])
            if out['cost'] is not None:
                check(out['cost'] == old['cost']['total'],'G4 exact full charge '+old['id'])
            corpus.append({'id':old['id'],'kind':'complete raw Record','membership':wanted})
        else:
            f = Q(*(int(x,16) for x in old['F']))
            t = p.tail(f,old['n'])
            check(t['code'] == old['expected_code'],'synthetic inherited tail decision')
            cc = p.g4.fixed_cost(old['n'],[p.width(f)]*3)['total']
            member = cc <= p.B and t['zero_sign'] > 0
            check(member == (p.g4.decision(old,p.B) == 'admitted'),'G4 synthetic membership')
            corpus.append({'id':old['id'],'kind':'synthetic-only rational tail; raw realization unestablished','membership':member})
    anchor, aout = by_id['ordinary_decimal_n128']
    check(aout['cost'] == p.B and aout['membership'],'exact B anchor')
    control = p.run(anchor,True,True,budget=p.B-1)
    check(control['gate'] == 'supported-domain refusal','anchor B-1 excludes equality')
    above = by_id['adjacent-count-above-anchor'][1]
    check(above['cost'] > p.B and not above['membership'],'nearby complete raw cost above B')
    checks = [{'case':'B equality','cost':p.B,'at_B':True,'at_B_minus_1':False},
              {'case':'next count of anchor recipe','cost':above['cost'],'delta_above_B':above['cost']-p.B}]
    near = by_id['single-ULP-above-anchor'][1]
    check(p.B < near['cost'] < above['cost'] and not near['membership'],'one-ULP nearby complete Record refuses')
    checks.append({'case':'single ULP change at cell 2 observation 3, downward','cost':near['cost'],'delta_above_B':near['cost']-p.B})
    check(p.B <= p.B and not p.B+1 <= p.B,'synthetic charge threshold B/B+1')
    checks.append({'case':'synthetic scalar threshold only, C=B+1 is not a realized fixed-cost score','admit_B':True,'admit_B_plus_1':False})
    for n in (2,3,32,128,442):
        prev = None
        for w in (1,2,34,129,367,4353):
            cost = p.g4.fixed_cost(n,[w]*3)['total']
            check(prev is None or prev <= cost,'width monotonicity')
            check(cost < p.g4.fixed_cost(n+1,[w]*3)['total'],'count monotonicity')
            prev = cost
    for cost in [r['result']['cost'] for r in results if r['result']['cost'] is not None]:
        check([cost <= b for b in (p.B-1,p.B,p.B+1)] == sorted([cost <= b for b in (p.B-1,p.B,p.B+1)]),'budget monotonicity')
    base = by_id['ordinary_dyadic_n3'][0]
    generic = []
    for label,record,unresolved,wanted in (
        ('unresolved-only',base,(0,),'completed/indeterminate'),
        ('unresolved-and-later-fail',by_id['mismatch-21'][0],(0,),'completed/fail'),
        ('early-fail-and-unresolved',by_id['mismatch-0'][0],(1,),'completed/fail')):
        out = p.run(record,True,True,unresolved=unresolved)
        check(out['recomputation'] == wanted and len(out['quantities']) == 22,'continued generic aggregation '+label)
        generic.append({'label':label,'scope':'synthetic unresolved control; not an S-C ambiguity','result':out})
    for fault in ('predicate','timeout','crash','resource','malformed'):
        out = p.run(base,True,True,fault=fault)
        check(out['gate'] == 'execution error/refusal','fault '+fault)
        if fault != 'predicate':
            check(out['quantities'] == [],'suppress partial outcomes '+fault)
        generic.append({'label':fault,'scope':'simulated invocation fault; no EC3 evidence','result':out})
    bad = b'{"x":1,"x":2}\n{"x":-0}\n{"x":"\\ud800"}\n{"x":1e400}\n'
    strict_results = [json.loads(line) for line in bridge(bad).splitlines()]
    check(len(strict_results) == 4 and all('ingress_error' in r for r in strict_results),'strict input negative controls')
    # Explicit semantic witnesses in full Records, independent of all-pass alone.
    fs = by_id['positive-F-projects-zero'][1]['quantities']
    check(all(r['projected'] == 0 for r in fs[16:19]) and any(int(r['exact'][0],16) > 0 for r in fs[16:19]),'positive exact F retained under zero display')
    neg = by_id['negative-effect-projects-zero'][1]['quantities'][9]
    check(int(neg['exact'][0],16) < 0 and neg['projected'] == 0,'negative projection normalized output zero only')
    ps = by_id['positive-subnormal-p'][1]['quantities'][19]['projected']
    check(0 < ps < 1 << 52,'positive subnormal tail passes')
    under = by_id['positive-p-underflow'][1]
    check(under['gate'] == 'representation refusal' and any(t['code'] == 0 and t['positive'] for t in under['tail_eligibility']),'positive underflow never pass or indeterminate')
    check(all(r['projected'] == p.ONE for r in by_id['ordinary_zero_n2'][1]['quantities'][19:]),'F zero gives p one')
    return {'scope':'G5 author evidence, not independent close review','base':p.BASE,'B':p.B,'cost_sha256':p.COST_SHA,
            'records_sha256':hashlib.sha256((HERE/'RECORDS.jsonl').read_bytes()).hexdigest(),
            'expectations_sha256':hashlib.sha256((HERE/'EXPECTED-VECTORS.jsonl').read_bytes()).hexdigest(),
            'cases':results,'g4_corpus':corpus,'B_checks':checks,'generic_controls':generic,
            'strict_ingress_controls':strict_results,'checks':CHECKS,
            'summary':dict(sorted(Counter(r['result']['gate'] for r in results).items()))}

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--generate',action='store_true')
    parser.add_argument('--write',action='store_true')
    args = parser.parse_args()
    if args.generate:
        generate()
        return
    result = run()
    data = p.canonical(result)
    if args.write:
        (HERE/'RESULTS.jsonl').write_bytes(data)
    else:
        check(data == (HERE/'RESULTS.jsonl').read_bytes(),'saved result byte equality')
    print(json.dumps({'checks':CHECKS,'cases':len(result['cases']),'summary':result['summary'],
                      'sha256':hashlib.sha256(data).hexdigest(),'optimize':sys.flags.optimize},sort_keys=True))

if __name__ == '__main__':
    main()
