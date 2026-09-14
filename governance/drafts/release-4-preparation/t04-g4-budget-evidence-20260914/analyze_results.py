"""Deterministic analysis of fixed G4 coverage and recorded telemetry."""
import argparse
from collections import Counter
import hashlib
import json
import math
from pathlib import Path
import statistics
import check_evidence as r

HERE=Path(__file__).resolve().parent


def ranks(values):
    ordered=sorted(range(len(values)),key=lambda i:values[i])
    out=[0.]*len(values)
    i=0
    while i<len(ordered):
        j=i+1
        while j<len(ordered) and values[ordered[j]]==values[ordered[i]]:
            j+=1
        rank=(i+j-1)/2+1
        for k in ordered[i:j]: out[k]=rank
        i=j
    return out


def spearman(x,y):
    if len(x)<3 or len(set(x))<2 or len(set(y))<2: return None
    return statistics.correlation(ranks(x),ranks(y))


def analyze():
    data=json.loads((HERE/'RESULTS.jsonl').read_text())
    capture=json.loads((HERE/'REFERENCE-OBSERVATIONS.json').read_text())
    records=capture['records']
    r.require(len(records)==2*capture['cases_per_mode'],'complete mode capture')
    completed=[x for x in records if x['status']=='completed']
    for ident in {x['id'] for x in completed}:
        pair=[x for x in completed if x['id']==ident]
        r.require({x['optimize'] for x in pair}=={0,1},'actual child modes')
        r.require(len({x['row_sha256'] for x in pair})==1,'mode-independent numerical output')
    modes={}
    for mode in (0,1):
        rows=[x for x in completed if x['optimize']==mode and x['charged_cost'] is not None]
        costs=sorted(x['charged_cost'] for x in rows)
        low=costs[(len(costs)-1)//4]
        wall_hi=sorted(x['wall_ns'] for x in rows)[3*(len(rows)-1)//4]
        memory_hi=sorted(x['peak_working_set_bytes'] for x in rows)[3*(len(rows)-1)//4]
        outliers=[{'id':x['id'],'cost':x['charged_cost'],'wall_ns':x['wall_ns'],
                   'cpu_ns':x['cpu_ns'],'peak_bytes':x['peak_working_set_bytes'],
                   'baseline_peak_bytes':x['baseline_peak_working_set_bytes'],
                   'peak_increase_bytes':x['peak_increase_bytes'],
                   'runtime_flag':x['wall_ns']>=wall_hi,'memory_flag':x['peak_working_set_bytes']>=memory_hi}
                  for x in rows if x['charged_cost']<=low and (x['wall_ns']>=wall_hi or x['peak_working_set_bytes']>=memory_hi)]
        modes[str(mode)]={'spearman_cost_wall':spearman([x['charged_cost'] for x in rows],[x['wall_ns'] for x in rows]),
                          'spearman_cost_cpu':spearman([x['charged_cost'] for x in rows],[x['cpu_ns'] for x in rows]),
                          'spearman_cost_peak':spearman([x['charged_cost'] for x in rows],[x['peak_working_set_bytes'] for x in rows]),
                          'outlier_rule':'bottom cost quartile AND top wall or peak-memory quartile, inclusive ties; descriptive screen',
                          'cost_q1':low,'wall_q3_ns':wall_hi,'memory_q3_bytes':memory_hi,'outliers':outliers}
    summaries=[]
    for b in data['budgets']:
        admitted=[x for x in completed if x['admission_by_budget'][b['name']]=='admitted']
        reference={'completed_admitted_observations':len(admitted),
                   'max_inner_wall_ns':max(x['wall_ns'] for x in admitted),
                   'max_cpu_ns':max(x['cpu_ns'] for x in admitted),
                   'max_peak_working_set_bytes':max(x['peak_working_set_bytes'] for x in admitted),
                   'max_peak_increase_bytes':max(x['peak_increase_bytes'] for x in admitted),
                   'max_numerical_witness_bytes':max(x['numerical_witness_bytes'] for x in admitted),
                   'max_wall_case':max(admitted,key=lambda x:x['wall_ns'])['id'],
                   'max_peak_case':max(admitted,key=lambda x:x['peak_working_set_bytes'])['id'],
                   'measured_cases':sorted({x['id'] for x in admitted}),
                   'noncompleted_admitted':[x['id'] for x in records if x['admission_by_budget'][b['name']]=='admitted' and x['status']!='completed']}
        raw=[row for row in data['rows'] if row['kind']=='raw_observations']
        reasons=Counter(r.decision(row,b['B']) for row in raw)
        summaries.append({'name':b['name'],'B':b['B'],'anchor':b['anchor'],'raw_total':len(raw),
                          'raw_admitted':reasons['admitted'],'raw_refused':len(raw)-reasons['admitted'],
                          'raw_refusal_reasons':dict(sorted((k,v) for k,v in reasons.items() if k!='admitted')),
                          'synthetic_tail_admitted':b['coverage']['groups']['synthetic_tail']['admitted'],
                          'reference':reference,'criteria':b['criteria'],
                          'derived_count_frontier':b['derived_count_frontier'],'equal_width_frontiers':b['equal_width_frontiers']})
    passing=[x for x in summaries if all(x['criteria'].values()) and not x['reference']['noncompleted_admitted']]
    r.require(passing,'some budget satisfies predeclared usefulness plus measured completion')
    chosen=min(passing,key=lambda x:x['B'])
    return {'selection':{'name':chosen['name'],'B':chosen['B'],
                         'status':'WORKING BUDGET - PENDING G5 AND EC1/EC2 CLOSE REVIEW',
                         'reason':'Smallest of three transition-anchored budgets satisfying PLAN criteria and finite reference observations',
                         'standalone_n_bound':'A: no additional ceiling; RFC representation bound and cost-implied frontier remain'},
            'budgets':summaries,'correlation_and_outliers':modes,
            'observation_statuses':dict(Counter(x['status'] for x in records)),
            'monotonicity':data['monotonicity'],
            'input_hashes':{name:hashlib.sha256((HERE/name).read_bytes()).hexdigest() for name in ('RESULTS.jsonl','REFERENCE-OBSERVATIONS.json')},
            'limits':'finite authored corpus and selected probes; no business SLA, population rate, hardware-independent runtime guarantee or support closure'}


def main():
    p=argparse.ArgumentParser()
    p.add_argument('--write',action='store_true')
    p.add_argument('--check',action='store_true')
    args=p.parse_args()
    result=analyze()
    raw=r.canonical(result)
    if args.write: (HERE/'ANALYSIS.jsonl').write_bytes(raw)
    if args.check: r.require((HERE/'ANALYSIS.jsonl').read_bytes()==raw,'saved analysis bytes')
    print(json.dumps({'selection':result['selection'],'budgets':[{k:b[k] for k in ('name','B','raw_admitted','raw_refused','synthetic_tail_admitted','reference','equal_width_frontiers')} for b in result['budgets']],
                      'correlation_and_outliers':result['correlation_and_outliers']},sort_keys=True))


if __name__=='__main__': main()
