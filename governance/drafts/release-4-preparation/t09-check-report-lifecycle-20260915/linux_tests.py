"""UNISSUED CANDIDATE. Finite integrated Linux corpus and actual resource controls."""
import argparse
import hashlib
import json
from pathlib import Path
import platform
from invoke import invoke,delivery,command,data,require
HERE=Path(__file__).resolve().parent

def main():
    p=argparse.ArgumentParser();p.add_argument('output',type=Path);p.add_argument('--image',default='nomue-t09-research');a=p.parse_args();a.output.mkdir(parents=True,exist_ok=False)
    source=json.loads((HERE.parent/'t08-limited-numerical-adapter-20260915/fixtures/cases.json').read_text())['cases'];index={f['id']:f for f in source}
    names=['ordinary_dyadic_n3','ordinary_decimal_n128','ordinary_zero_n256','positive-subnormal-p','positive-SSE-projects-zero','exact-SSE-zero','positive-p-underflow','extreme_finite_n2','mismatch-0','mismatch-21','multiple-mismatch','single-ULP-above-anchor']
    plan=[(m,n,data(index[n]['record']),'normal',index[n]['expected']) for m in (0,1) for n in names]
    basic=data(index['ordinary_dyadic_n3']['record'])
    for m in (0,1):
        for name,control,raw in [('unresolved','unresolved',basic),('fail-unresolved','fail-unresolved',data(index['mismatch-6']['record']))]:plan.append((m,name,raw,control,None))
        bad=json.loads(basic);bad['payload']['extra']=1;plan.append((m,'structural',data(bad),'normal',None))
        bad=json.loads(basic);bad['payload']['design']['model_applicability_declared']=False;plan.append((m,'admissibility',data(bad),'normal',None))
    for control in ('cpu','memory','timeout','descendant','escaped-descendant','crash','stdout','stderr','malformed','partial','wrong-identity','transport','report-cap','tree-memory','report-timeout','cleanup-failure','descendant-remains','deadline-late-report'):
        plan.append((1,control,basic,control,None))
    plan.extend([(0,'raw-oversize',basic+b' '*5242880,'normal',None),(0,'malformed-raw',b'{broken','normal',None)])
    host={'status':'UNISSUED CANDIDATE','observer_python':platform.python_version(),'kernel':platform.release(),'machine':platform.machine(),'image':json.loads(command(['docker','image','inspect',a.image]))[0]['Id']}
    (a.output/'HOST.json').write_bytes(data(host));rows=[]
    with (a.output/'RUNS.jsonl').open('wb') as log:
        for mode,name,raw,control,expected in plan:
            row=invoke(a.image,raw,mode,control);row['case']=name;safe=delivery(row,len(raw));row['delivered']=safe
            ok='harness_error' not in row
            if expected is not None:
                r=safe.get('report');ok=ok and bool(r)
                if r:
                    c=r['verification_results'][3]
                    ok=ok and (c.get('outcome')==('fail' if expected['mismatches'] else 'pass') if expected['gate']=='eligible' else c['execution']=='not_run')
                    if expected['gate']=='eligible':ok=ok and len(r['quantity_evidence']['quantity_results'])==22
            elif name in ('unresolved','fail-unresolved'):
                r=safe.get('report');ok=ok and bool(r) and r['verification_results'][3].get('outcome')==('fail' if name=='fail-unresolved' else 'indeterminate')
            elif name in ('structural','admissibility'):
                r=safe.get('report');ok=ok and bool(r) and r['conformance']['outcome']==('fail' if name=='structural' else 'pass') and r['profile_eligibility']==('not_evaluated' if name=='structural' else 'ineligible')
            else:ok=ok and safe['execution']=='execution_refusal' and 'report' not in safe
            required_causes={'cpu':'worker:cpu_limit','memory':'worker:allocation_failure','timeout':'worker:deadline','descendant':'worker:deadline','escaped-descendant':'worker:deadline','crash':'worker:abnormal_exit','stdout':'worker:output_overflow','stderr':'worker:output_overflow','malformed':'worker:invalid_worker_output','partial':'NRS-INTERNAL-VERIFIER-ERROR','wrong-identity':'NRS-INTERNAL-VERIFIER-ERROR','transport':'transport_bound','report-cap':'report_bound','tree-memory':'tree_memory_limit','report-timeout':'full_invocation_deadline','cleanup-failure':'cleanup_failure','descendant-remains':'cleanup_failure','deadline-late-report':'full_invocation_deadline'}
            if control in required_causes:ok=ok and required_causes[control] in row.get('execution_failure_reasons',[])
            if control in ('stdout','stderr'):
                counts=row.get('application_diagnostics',{}).get('receipts',{}).get('worker',{}).get('bytes_observed',{})
                ok=ok and counts.get(control,0)>(4194304 if control=='stdout' else 65536)
            if control=='tree-memory':ok=ok and row.get('container_final',{}).get('OOMKilled') is True
            if control not in ('cleanup-failure','descendant-remains'):ok=ok and row['cleanup_ok']
            row['check']='PASS' if ok else 'FAIL';rows.append(row);log.write(data(row));log.flush();print(len(rows),len(plan),name,mode,row['check'],flush=True)
            if not ok:raise ValueError('integrated case failed: '+json.dumps(row)[:6000])
    require(index['ordinary_dyadic_n3']['expected']['gate']=='eligible','control input is public-supported')
    require(all(r['input_sha256']==hashlib.sha256(basic).hexdigest() for r in rows if r['control'] in ('cpu','memory','timeout','stdout','stderr','tree-memory')),'same supported Record despite reference failures')
    # Compare exact semantic delivery across normal/optimized on shared cases.
    n={r['case']:r['delivered'] for r in rows if r['mode']==0};o={r['case']:r['delivered'] for r in rows if r['mode']==1}
    for name in n.keys()&o.keys():require(n[name]==o[name],'mode agreement: '+name)
    (a.output/'SUMMARY.json').write_bytes(data({'status':'UNISSUED CANDIDATE','runs':len(rows),'passed':len(rows),'mode_pairs':len(n.keys()&o.keys()),'result':'PASS'}))
if __name__=='__main__':main()
