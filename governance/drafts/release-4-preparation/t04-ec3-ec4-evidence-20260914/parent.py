"""Research full invocation inside an outer process-tree resource boundary."""
import json
import os
from pathlib import Path
import resource
import signal
import sys
import time
from common import EXEC, IDENTITY, data, load_g5, require, sha

START=time.monotonic()
profile_name, case_id, mode_arg = sys.argv[1:4]
mode=int(mode_arg)
profile=json.loads(Path('/harness/profiles.json').read_text())[profile_name]
case=json.loads(Path('/cases/index.json').read_text())[case_id]
control=case.get('control','normal')
sys.path.insert(0,str(Path('/execution')/EXEC))
import supervisor as s
require(sys.flags.optimize==mode,'parent optimization mismatch')
host=s.host()
p=load_g5()
report={'case':case_id,'profile':profile_name,'mode':mode,'host':host,
        'scientific_validity':'not_asserted','execution':'pending','result':None,
        'worker_started':False,'phases':{},'receipts':{},'raw_sha256':case['raw_sha256']}

def elapsed(): return time.monotonic()-START

def launch(command, payload, cap):
    return s._launch(command,payload,wall=max(0.01,profile['wall']-elapsed()),out_cap=cap)

def receipt_phase(name, command, payload, cap):
    a=time.monotonic()
    receipt=launch(command,payload,cap)
    report['phases'][name]=time.monotonic()-a
    transport=receipt.pop('transport',None)
    report['receipts'][name]=receipt
    if receipt['category']!='completed_transport':
        raise RuntimeError(name+':'+receipt['category'])
    return transport

def run():
    if control in ('parent-timeout','cleanup-escalation'):
        if control=='cleanup-escalation': signal.signal(signal.SIGTERM,signal.SIG_IGN)
        while True: time.sleep(1)
    if control=='tree-memory':
        blocks=[]
        while True: blocks.append(bytearray(16*1024**2))
    a=time.monotonic()
    with open('/cases/'+case['file'],'rb') as f: raw=f.read(profile['raw']+1)
    report['raw_bytes']=len(raw)
    require(len(raw)<=profile['raw'],'raw bound')
    require(sha(raw)==case['raw_sha256'],'input binding')
    report['phases']['raw_acquisition']=time.monotonic()-a
    item=receipt_phase('ingress', ['/usr/local/bin/node','--max-old-space-size='+str(profile['node_mib']),'/harness/ingress.cjs'],raw,profile['transport'])
    require(type(item)==dict and 'ingress_error' not in item,'strict ingress refused')
    a=time.monotonic()
    payload=data(item)
    if control=='transport': payload=b'x'*(profile['transport']+1)
    require(len(payload)<=profile['transport'],'internal transport bound')
    report['transport_bytes']=len(payload)
    # Bounded exact parent preflight avoids launching tail work for C>B.
    # G5 is unchanged. Repeating its non-tail graph for eligible cases is adapter overhead.
    preflight=None
    try:
        cells,declared,units,ids=p.associate(item['record'])
        counts=[len(c) for c in cells]
        admissible=(len(set(counts))==1 and counts[0]>=2 and len(set(units))==len(units)
                    and item['record']['payload']['design']['model_applicability_declared'])
        if item['envelope_ok'] and admissible:
            cheap=p.g4.fixed_cost(counts[0],[1]*3)
            if cheap['components']['preflight_and_non_tail']>p.B:
                preflight=p.run(item['record'],item['integrity_ok'],item['envelope_ok'])
            else:
                graph=p.graph(cells)
                if graph['F'] is not None and p.g4.fixed_cost(counts[0],[p.width(f) for f in graph['F']])['total']>p.B:
                    preflight=p.run(item['record'],item['integrity_ok'],item['envelope_ok'])
    except (p.ConformanceError,KeyError,TypeError,OverflowError):
        pass  # The unchanged G5 conformance gate owns the numerical candidate outcome.
    report['phases']['parent_preparation']=time.monotonic()-a
    if preflight is not None:
        report['result']=preflight
        report['execution']='completed_candidate_gate'
        return
    report['worker_started']=True
    command=[sys.executable,'-B']+(['-O']*mode)+['/harness/worker.py',profile_name,control,str(mode)]
    if control in ('timeout','descendant','escaped-descendant'):
        receipt=s._launch(command,payload,wall=1.0,out_cap=profile['stdout'])
        report['receipts']['worker']=receipt
        report['phases']['worker']=receipt['elapsed_seconds']
        raise RuntimeError('worker:'+receipt['category'])
    capsule=receipt_phase('worker',command,payload,profile['stdout'])
    a=time.monotonic()
    require(type(capsule)==dict and set(capsule)=={'result','input_sha256','mode','limits','cpu_seconds','rss_kib','wall_seconds'},'capsule shape')
    require(capsule['mode']==mode and capsule['input_sha256']==sha(payload),'capsule binding')
    require(capsule['limits']=={'cpu':[profile['cpu'],profile['cpu']+1],'address_space':[profile['worker_mib']*1024**2]*2},'worker limits')
    out=capsule['result']
    require(type(out)==dict and out.get('candidate_identity')==IDENTITY,'candidate binding')
    rows=out.get('quantities')
    require(type(rows)==list and len(rows)==22 and [r.get('identity') for r in rows]==p.QUANTITIES,'complete ordered output')
    if out['gate']=='eligible':
        require(out['membership'] is True and all(r.get('dependency')=='satisfied' for r in rows),'eligible state')
        require(out['recomputation']==p.aggregate([r['outcome'] for r in rows]),'aggregation')
        _,declared,_,ids=p.associate(item['record'])
        require(out['scope']=={'kind':'result','id':item['record']['payload']['result']['result_id'],'cell_order':ids},'scope')
        require([r['declared'] for r in rows]==declared[:5]+[p.bits(v) for v in declared[5:]],'declaration binding')
        require(all(r['outcome']==('pass' if r['declared']==r['projected'] else 'fail') for r in rows),'comparison binding')
    else:
        require(out['membership'] is False and out['recomputation']=='not_run' and all(r['outcome']=='not_run' for r in rows),'gated state')
    report['worker_measurements']={k:capsule[k] for k in ('mode','limits','cpu_seconds','rss_kib','wall_seconds')}
    report['result']=out
    report['execution']='completed_candidate'
    report['phases']['parent_result_validation']=time.monotonic()-a

try:
    run()
except BaseException as error:
    report['execution']='execution_refusal'
    report['reason']=str(error)[:160]
    report['result']=None
if control=='report-timeout':
    while True: time.sleep(1)
a=time.monotonic()
usage=resource.getrusage(resource.RUSAGE_SELF)
report['parent_rss_kib']=usage.ru_maxrss
report['parent_cpu_seconds']=usage.ru_utime+usage.ru_stime
report['parent_active_wall_seconds']=elapsed()
# The full report has its own cap, independent of G5 witness and worker stdout caps.
encoded=data(report)
if control=='report-cap': encoded=b'x'*(profile['report']+1)
if len(encoded)>profile['report']:
    report.update(execution='execution_refusal',reason='full report bound',result=None)
    encoded=data(report)
require(len(encoded)<=profile['report'],'bounded refusal report')
Path('/out/report.json').write_bytes(encoded)
Path('/out/metrics.json').write_bytes(data({'report_construction_seconds':time.monotonic()-a,'report_bytes':len(encoded),'active_wall_seconds':elapsed()}))
Path('/out/ready').write_text('ready')
# Hold for the trusted observer to read cgroup peak, then terminate PID namespace.
signal.signal(signal.SIGTERM,lambda *_:sys.exit(0))
while True: time.sleep(1)
