"""Deterministic F-01 controls; fake Docker/clock, real observer one() and delivery."""
import copy
from contextlib import ExitStack
import json
from pathlib import Path
import tempfile
import sys
from unittest.mock import patch
from common import require, data
from delivery import finalize
import run_suite as observer

COMPLETED = {'execution':'completed_candidate','result':{'gate':'eligible','sentinel':'valid numerical result'}}

def direct_controls():
    records=[]
    base={'cleanup_ok':True,'report':copy.deepcopy(COMPLETED),'report_sha256':'fixed-research-hash'}
    def exercise(name, edits, wanted):
        row=copy.deepcopy(base)
        edits(row)
        out=finalize(row)
        require(out['execution']=='execution_refusal' and out['result'] is None,name+' suppressed')
        require(out['reason']==wanted,name+' reason')
        require(row.get('report') is None or row['report'].get('result') is None,name+' no exposed numerical report')
        # Later report arrival and successful cleanup cannot undo the latched failure.
        row['report']=copy.deepcopy(COMPLETED); row['cleanup_ok']=True
        require(finalize(row)==out,name+' remains failed after late report and cleanup')
        records.append({'case':name,'outcome':out})
    for reason in ('full_invocation_deadline','container_exit'):
        exercise('report + '+reason,lambda r,k=reason:r.update(outer_failure=k),reason)
    exercise('report + OOM',lambda r:r.update(container_final={'OOMKilled':True}),'tree_memory_limit')
    exercise('report + harness failure',lambda r:r.update(harness_error='collected full report cap'),'collected full report cap')
    exercise('report + empty harness diagnostic',lambda r:r.update(harness_error=''),'execution_error')
    for cause in ('cpu_limit','allocation_failure','abnormal_exit','invalid_worker_output','output_overflow',
                  'deadline','cancelled','cleanup_failed','child_ownership_lost','execution_error'):
        def edit(row,cause=cause):
            row['report']['receipts']={'worker':{'category':cause,'causes':[cause]}}
        exercise('report + worker '+cause,edit,'worker:'+cause)
    exercise('report + cleanup failure',lambda r:r.update(cleanup_ok=False),'cleanup_failure')
    exercise('report + surviving descendants',lambda r:r.update(container_final={'Running':True,'Pid':123}),'cleanup_failure')
    for malformed in ([],{}, {'execution':'completed_candidate','result':None},
                      {'execution':'completed_candidate','result':{},'receipts':None}):
        exercise('malformed report '+str(len(records)),lambda r,m=malformed:r.update(report=m),'invalid_worker_output')
    row=copy.deepcopy(base)
    row.update(outer_failure='full_invocation_deadline',cleanup_ok=False,container_final={'OOMKilled':True})
    out=finalize(row)
    require(out['reason']=='full_invocation_deadline' and row['execution_failure_reasons']==
            ['full_invocation_deadline','tree_memory_limit','cleanup_failure'],'all failure reasons retained in precedence order')
    records.append({'case':'concurrent failure reasons','outcome':out,'reasons':row['execution_failure_reasons']})
    for execution in ('completed_candidate','completed_candidate_gate'):
        row=copy.deepcopy(base); row['report']['execution']=execution
        require(finalize(row)=={'execution':execution,'reason':None,'result':COMPLETED['result']},'normal valid report unchanged')
        records.append({'case':'normal '+execution,'outcome':finalize(row)})
    row={'cleanup_ok':True,'report':{'execution':'execution_refusal','reason':'worker:abnormal_exit','result':None}}
    require(finalize(row)==row['report'],'existing safe refusal unchanged')
    records.append({'case':'existing safe refusal','outcome':finalize(row)})
    return records

def observer_control(order):
    """Reach the original deadline/ready race without scheduling or sleeps."""
    profile=json.loads((observer.HERE/'profiles.json').read_text(encoding='utf-8'))['medium']
    events=[]
    with tempfile.TemporaryDirectory(prefix='r4-f01-') as temp:
        root=Path(temp); outputs=root/'outputs'; outputs.mkdir()
        folder=outputs/'r4-ec3-fixed'
        proc=root/'proc/123/cgroup'; proc.parent.mkdir(parents=True); proc.write_text('0::/probe')
        cg=root/'cgroup/probe'; cg.mkdir(parents=True); (cg/'cgroup.procs').write_text('123')
        state={'stopped':False,'clocks':0,'cg_reads':0}
        def publish():
            report=copy.deepcopy(COMPLETED)
            if order=='malformed': report=[]
            if order=='cpu': report['receipts']={'worker':{'category':'cpu_limit','causes':['cpu_limit']}}
            (folder/'report.json').write_bytes(data(report))
            (folder/'metrics.json').write_bytes(data({'report_bytes':len(data(report))}))
            (folder/'ready').write_text('ready')
            events.append('report_arrival')
        def command(args,timeout=20):
            if args[:3]==['docker','run','-d']:
                require(('-O' in args)==(sys.flags.optimize>0),'parent command optimization follows driver')
                if order!='deadline_then_report': publish()
            elif args[:2]==['docker','stop']:
                if order=='cleanup_failure': raise RuntimeError('controlled cleanup failure')
                state['stopped']=True; (cg/'cgroup.procs').write_text(''); events.append('cleanup_success')
            elif args[:2]==['docker','kill']:
                state['stopped']=True; (cg/'cgroup.procs').write_text(''); events.append('fallback_kill')
            return b''
        def inspect(_):
            final=state['stopped']
            return {'State':{'Pid':0 if final else 123,'Running':not final,
                            'ExitCode':23 if final and order=='crash' else 0,
                            'OOMKilled':final and order=='oom','Error':''},
                    'HostConfig':{'Memory':536870912,'MemorySwap':536870912,'PidsLimit':32,
                                  'NanoCpus':2000000000,'ReadonlyRootfs':True,'NetworkMode':'none',
                                  'CapDrop':['ALL'],'SecurityOpt':['no-new-privileges']}}
        def clock():
            state['clocks']+=1
            due=(state['clocks']>=2 if order in ('deadline_then_report','report_then_deadline')
                 else state['clocks']>=3 if order=='deadline_during_collection' else False)
            if due and 'deadline_detectable' not in events: events.append('deadline_detectable')
            return 30.0 if due else 0.0
        def values(_):
            state['cg_reads']+=1
            # The historical observer rechecked ready after this exact point.
            if order=='deadline_then_report' and state['cg_reads']==2: publish()
            return {'memory.max':'536870912','pids.max':'32','cgroup.procs':(cg/'cgroup.procs').read_text()}
        def mapped_path(value):
            if value=='/proc': return root/'proc'
            if value=='/sys/fs/cgroup': return root/'cgroup'
            return Path(value)
        with ExitStack() as stack:
            for name,value in [('command',command),('inspect',inspect),('cg_values',values),('Path',mapped_path)]:
                stack.enter_context(patch.object(observer,name,value))
            stack.enter_context(patch.object(observer.time,'monotonic',clock))
            stack.enter_context(patch.object(observer.time,'sleep',lambda _:None))
            stack.enter_context(patch.object(observer.os,'getuid',lambda:1000,create=True))
            stack.enter_context(patch.object(observer.os,'getgid',lambda:1000,create=True))
            stack.enter_context(patch.object(observer.uuid,'uuid4',lambda:type('Id',(),{'hex':'fixed'})()))
            row=observer.one('trusted-research-image','medium',profile,'ordinary',
                             {'raw_sha256':'fixed-input','expected':COMPLETED['result']},sys.flags.optimize,outputs)
        outcome=row['final_outcome']
        if order=='normal':
            require(row['check']=='PASS' and outcome['result']==COMPLETED['result'],'normal observer preserved')
        else:
            expected={'deadline_then_report':'full_invocation_deadline','report_then_deadline':'full_invocation_deadline',
                      'deadline_during_collection':'full_invocation_deadline','oom':'tree_memory_limit',
                      'cpu':'worker:cpu_limit','crash':'container_exit','cleanup_failure':'cleanup_failure',
                      'malformed':'invalid_worker_output'}[order]
            require(outcome=={'execution':'execution_refusal','reason':expected,'result':None},order+' final refusal')
            require(row['check']=='FAIL',order+' cannot pass expected numerical comparison')
            require(row['report'] is None,order+' numerical report suppressed')
            if order!='cleanup_failure': require(row['cleanup_ok'],order+' cleanup cannot restore success')
        if order=='deadline_then_report': require(events.index('deadline_detectable')<events.index('report_arrival'),'forced late-report ordering')
        if order in ('report_then_deadline','deadline_during_collection'): require(events.index('report_arrival')<events.index('deadline_detectable'),'forced early-report ordering')
        return {'case':order,'events':events,'outcome':outcome,'check':row['check'],'cleanup_ok':row['cleanup_ok']}

def run_controls():
    direct=direct_controls()
    actual=[observer_control(name) for name in ('deadline_then_report','report_then_deadline','deadline_during_collection',
             'oom','cpu','crash','cleanup_failure','malformed','normal')]
    return {'direct_cases':direct,'observer_cases':actual,'case_count':len(direct)+len(actual),
            'scope':'Deterministic generated receipt and actual one() control-flow tests with fake Docker/clock; not new resource measurements'}
