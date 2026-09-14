"""Reference practicality observations only; never determines public membership."""
import argparse
import ctypes
from ctypes import wintypes
from datetime import datetime, timezone
import json
from pathlib import Path
import subprocess
import sys
import time
import check_evidence as research

HERE=Path(__file__).resolve().parent


def peak_working_set():
    if sys.platform!='win32':
        return None
    class Counters(ctypes.Structure):
        _fields_=[('cb',wintypes.DWORD),('PageFaultCount',wintypes.DWORD)]+[(x,ctypes.c_size_t) for x in
                  ('PeakWorkingSetSize','WorkingSetSize','QuotaPeakPagedPoolUsage','QuotaPagedPoolUsage',
                   'QuotaPeakNonPagedPoolUsage','QuotaNonPagedPoolUsage','PagefileUsage','PeakPagefileUsage','PrivateUsage')]
    kernel=ctypes.WinDLL('kernel32',use_last_error=True)
    kernel.GetCurrentProcess.restype=wintypes.HANDLE
    psapi=ctypes.WinDLL('psapi',use_last_error=True)
    psapi.GetProcessMemoryInfo.argtypes=[wintypes.HANDLE,ctypes.POINTER(Counters),wintypes.DWORD]
    counters=Counters()
    counters.cb=ctypes.sizeof(counters)
    if not psapi.GetProcessMemoryInfo(kernel.GetCurrentProcess(),ctypes.byref(counters),counters.cb):
        raise OSError(ctypes.get_last_error(),'GetProcessMemoryInfo')
    return counters.PeakWorkingSetSize


def worker():
    request=json.loads(sys.stdin.read())
    g,o,ar=research.subjects()
    before=peak_working_set()
    cpu=time.process_time_ns()
    wall=time.perf_counter_ns()
    row=research.evaluate(request['recipe'],g,o,ar,cached=False,independent_controls=False)
    cpu=time.process_time_ns()-cpu
    wall=time.perf_counter_ns()-wall
    peak=peak_working_set()
    row_hash=research.digest(row)
    # Frontier rows append their anchor only in the deterministic corpus writer.
    expected=request['expected']
    expected={k:v for k,v in expected.items() if k!='anchor_budget'}
    research.require(row_hash==research.digest(expected),'reference deterministic row matches saved result')
    print(json.dumps({'id':row['id'],'optimize':sys.flags.optimize,'cpu_ns':cpu,'wall_ns':wall,
                      'peak_working_set_bytes':peak,'baseline_peak_working_set_bytes':before,
                      'peak_increase_bytes':None if peak is None else max(0,peak-before),
                      'numerical_witness_bytes':row['actual_witness_bytes'],
                      'row_sha256':row_hash,'numerical_output_match':True},sort_keys=True))


def measure():
    result=json.loads((HERE/'RESULTS.jsonl').read_text())
    ordinary={r['id']:r for r in result['rows']}
    recipe={r['id']:r for r in result['corpus']}
    selected=[]
    for r in result['rows']:
        take=(r['group']=='ordinary' and r['n'] in (32,128,256,512)) or \
             (r['group']=='dynamic_range' and r['n']==256) or \
             (r['group']=='cancellation' and r['n'] in (128,512)) or \
             r['group']=='raw_boundary' or r['id'].startswith('boundary_witnesses_') or \
             r['id'].startswith('exact_midpoint_tails_')
        if take:
            selected.append((recipe[r['id']],r))
    for r in result['frontiers']:
        recipe_keys=('id','group','kind','n','F','expected_code','scope')
        selected.append(({k:r[k] for k in recipe_keys},r))
    records=[]
    for index,(rec,expected) in enumerate(selected):
        for mode in (0,1):
            command=[sys.executable]+(['-O'] if mode else [])+['-B',str(Path(__file__).resolve()),'--worker']
            start=time.perf_counter_ns()
            try:
                completed=subprocess.run(command,input=json.dumps({'recipe':rec,'expected':expected}),
                                         capture_output=True,text=True,timeout=30,check=False)
                parent_wall=time.perf_counter_ns()-start
                if completed.returncode!=0:
                    item={'id':rec['id'],'mode':mode,'status':'execution_error','stderr':completed.stderr[-2000:]}
                else:
                    item=json.loads(completed.stdout)
                    research.require(item['optimize']==mode,'actual isolated optimization mode')
                    item.update({'status':'completed','parent_wall_ns':parent_wall,'stdout_bytes':len(completed.stdout.encode())})
            except subprocess.TimeoutExpired:
                item={'id':rec['id'],'mode':mode,'status':'observation_timeout_not_domain_refusal'}
            item.update({'kind':rec['kind'],'group':rec['group'],'n':rec['n'],
                         'charged_cost':None if expected['cost'] is None else expected['cost']['total'],
                         'cost_dominant':None if expected['cost'] is None else expected['cost']['dominant'],
                         'admission_by_budget':{b['name']:research.decision(expected,b['B']) for b in result['budgets']}})
            records.append(item)
        if (index+1)%10==0:
            print('Measured '+str(index+1)+'/'+str(len(selected))+' probes',file=sys.stderr,flush=True)
    capture={'scope':'reference practicality evidence only; no public resource cap or EC3 support claim',
             'started_date_utc':datetime.now(timezone.utc).isoformat(),
             'observation_timeout_seconds':30,'cases_per_mode':len(selected),
             'process_model':'one new subprocess per probe and mode; startup excluded from inner times, included in parent_wall',
             'memory_metric':'Windows process lifetime peak working set; baseline and increase separately recorded',
             'records':records}
    (HERE/'REFERENCE-OBSERVATIONS.json').write_text(json.dumps(capture,indent=2)+'\n',encoding='utf-8')
    print(json.dumps({'probes':len(selected),'records':len(records),'statuses':dict(__import__('collections').Counter(x['status'] for x in records))}))
    research.require(all(x['status']=='completed' for x in records),'all observed processes completed; inspect failures without changing public membership')


if __name__=='__main__':
    p=argparse.ArgumentParser()
    p.add_argument('--worker',action='store_true')
    p.add_argument('--measure',action='store_true')
    args=p.parse_args()
    if args.worker:
        worker()
    elif args.measure:
        measure()
    else:
        p.error('use --measure to create a new nondeterministic observation capture')
