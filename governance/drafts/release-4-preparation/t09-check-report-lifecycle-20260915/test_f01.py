"""UNISSUED CANDIDATE. Deterministic F-01 controls on an actual valid report."""
import copy
import json
from pathlib import Path
import sys
from invoke import FINALIZE, delivery, exit_code
HERE=Path(__file__).resolve().parent
report=json.loads((HERE/'fixtures/pass-report.json').read_text())
base={'report':{'execution':'completed_candidate','result':report,'receipts':{}},'cleanup_ok':True,'container_final':{'Running':False,'Pid':0,'ExitCode':0,'OOMKilled':False,'Error':''}}
controls={
 'deadline':lambda r:r.update(outer_failure='full_invocation_deadline'),
 'oom':lambda r:r['container_final'].update(OOMKilled=True),
 'cpu':lambda r:r['report']['receipts'].update(worker={'category':'cpu_limit','causes':['cpu_limit']}),
 'crash':lambda r:r['container_final'].update(ExitCode=23),
 'overflow':lambda r:r['report']['receipts'].update(worker={'category':'output_overflow','causes':['output_overflow']}),
 'malformed':lambda r:r['report']['receipts'].update(worker={'category':'invalid_worker_output','causes':['invalid_worker_output']}),
 'cleanup':lambda r:r.update(cleanup_ok=False),
 'descendant':lambda r:r['container_final'].update(Pid=123),
 'inner-refusal':lambda r:r['report'].update(execution='execution_refusal',reason='NRS-INTERNAL-VERIFIER-ERROR',result=None),
 'previous-failure':lambda r:r.update(execution_failure_reasons=['full_invocation_deadline'])}
rows=[]
for name,mutate in controls.items():
 row=copy.deepcopy(base);mutate(row);out=FINALIZE(row)
 if out['execution']!='execution_refusal' or out['result'] is not None:raise AssertionError(name)
 # Even a fresh valid late report and successful cleanup cannot clear a latch.
 row['report']=copy.deepcopy(base['report']);row['cleanup_ok']=True;row['container_final']=copy.deepcopy(base['container_final']);row.pop('outer_failure',None)
 again=FINALIZE(row)
 if again['execution']!='execution_refusal' or again['result'] is not None:raise AssertionError('resurrected '+name)
 row['final_outcome']=again;safe=delivery(row,100)
 if 'report' in safe or safe['execution']!='execution_refusal':raise AssertionError('delivery '+name)
 rows.append({'control':name,'latched':True,'no_completed_result':True,'delivery':safe})

def refusal(kind,code):
 return {'status':'UNISSUED CANDIDATE','execution':'execution_refusal','refusal':{'refusal_kind':kind,'reason_codes':[code]}}

# F13-01: the internal UTF-8 cause remains latched while the already-safe,
# authority-defined external parse refusal survives final delivery.
parse=refusal('parse_error','NRS-PARSE-FAILED')
utf8={'report':{'execution':'execution_refusal','reason':'invalid_utf8','result':None,'candidate_refusal':parse,'receipts':{}},'cleanup_ok':True,'container_final':copy.deepcopy(base['container_final'])}
utf8['final_outcome']=FINALIZE(utf8)
safe=delivery(utf8,1)
if utf8['final_outcome']['reason']!='invalid_utf8':raise AssertionError('internal cause changed')
if safe is not parse or safe['refusal']['refusal_kind']!='parse_error' or safe['refusal']['reason_codes']!=['NRS-PARSE-FAILED']:raise AssertionError('invalid UTF-8 delivery')
if exit_code(safe)!=2 or 'report' in safe or utf8['report']['receipts']:raise AssertionError('invalid UTF-8 observables')

# Neighbor controls: a different internal/resource cause cannot borrow the parse
# refusal, while the pre-existing exact-reason retention rule remains intact.
neighbor=[]
for cause,expected_kind,expected_code in (
 ('execution_error','internal_error','NRS-INTERNAL-VERIFIER-ERROR'),
 ('transport_bound','resource_limit','NRS-RESOURCE-LIMIT-EXCEEDED'),
):
 row=copy.deepcopy(utf8);row['final_outcome']={'execution':'execution_refusal','reason':cause,'result':None};out=delivery(row,1)
 if out is parse or out['refusal']['refusal_kind']!=expected_kind or out['refusal']['reason_codes']!=[expected_code]:raise AssertionError('neighbor '+cause)
 neighbor.append({'cause':cause,'refusal_kind':expected_kind,'reason_code':expected_code})
canonical=refusal('canonicalization_failure','NRS-CANONICALIZATION-FAILED')
row=copy.deepcopy(utf8);row['report']['candidate_refusal']=canonical;row['final_outcome']={'execution':'execution_refusal','reason':'NRS-CANONICALIZATION-FAILED','result':None}
if delivery(row,1) is not canonical:raise AssertionError('exact retained refusal')

# An already-latched outer deadline stays authoritative over a later parse
# refusal, preserving the T04/F-01 precedence rule.
row=copy.deepcopy(utf8);row['execution_failure_reasons']=['full_invocation_deadline'];row['final_outcome']=FINALIZE(row);out=delivery(row,1)
if row['final_outcome']['reason']!='full_invocation_deadline' or out is parse or out['refusal']['refusal_kind']!='resource_limit' or out['refusal']['reason_codes']!=['NRS-TIMEOUT-LIMIT-EXCEEDED']:raise AssertionError('F-01 precedence')

focused={'input_hex':'FF','internal_cause':'invalid_utf8','execution':'execution_refusal','refusal_kind':'parse_error','reason_codes':['NRS-PARSE-FAILED'],'exit_code':2,'report_present':False,'numerical_core_invocations':0,'neighbor_controls':neighbor,'f01_outer_deadline_preserved':True}
summary={'status':'UNISSUED CANDIDATE','python_optimize':sys.flags.optimize,'controls':rows,'f13_01':focused,'result':'PASS'}
if '--save' in sys.argv:(HERE/sys.argv[sys.argv.index('--save')+1]).write_text(json.dumps(summary,indent=2)+'\n')
print(json.dumps({'result':'PASS','controls':len(rows),'f13_01':'PASS','python_optimize':sys.flags.optimize}))
