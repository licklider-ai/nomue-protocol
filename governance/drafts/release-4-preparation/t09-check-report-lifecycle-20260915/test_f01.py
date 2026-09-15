"""UNISSUED CANDIDATE. Deterministic F-01 controls on an actual valid report."""
import copy
import json
from pathlib import Path
import sys
from invoke import FINALIZE, delivery
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
summary={'status':'UNISSUED CANDIDATE','python_optimize':sys.flags.optimize,'controls':rows,'result':'PASS'}
if '--save' in sys.argv:(HERE/sys.argv[sys.argv.index('--save')+1]).write_text(json.dumps(summary,indent=2)+'\n')
print(json.dumps({'result':'PASS','controls':len(rows),'python_optimize':sys.flags.optimize}))
