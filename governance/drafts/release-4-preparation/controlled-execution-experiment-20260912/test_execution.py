"""Adversarial execution checks and separate-formula fixed numerical witnesses."""
import copy
import hashlib
import json
import os
from pathlib import Path
import platform
import sys
import subprocess
from unittest.mock import patch

import supervisor as s
from transport import encode

HERE = Path(__file__).resolve().parent
rows = []


def check(ok, name, receipt=None):
    if not ok:
        raise RuntimeError(name + ': ' + repr(receipt))
    rows.append({'name': name, 'passed': True, **({'receipt': receipt} if receipt else {})})


def outcome(cells, revision='test', submitted=None):
    result = s.run(cells, revision, submitted)
    check(result['category'] == 'completed_worker', 'worker completes', result)
    return result['outcome']


def main():
    same = [[0., 1.] for _ in range(4)]
    base = outcome(same)
    result = base['result']
    check(base['state'] == 'completed', 'complete outcome')
    # Four cell means equal 1/2. Within-cell SSE=4*(1/4+1/4)=2;
    # all contrasts and F are exactly zero, all three upper tails exactly one.
    check(result['exact']['sse'] == [['0x2', '0x1']], 'hand SSE=2')
    check(result['exact']['f'] == [['0x0', '0x1']] * 3, 'hand all F=0')
    check(all(t['encoding'] == '0x3ff0000000000000' for t in result['tails'].values()), 'hand p=1')
    ordinary = outcome([[0., 1.], [1., 2.], [2., 3.], [4., 5.]])
    check(ordinary['result']['exact']['f'] == [['0x19', '0x1'], ['0x9', '0x1'], ['0x1', '0x1']],
          'separate contrast derivation F=25,9,1')
    payload = ['r4-complete-output-experiment-v1', 'test', ['A0B0','A0B1','A1B0','A1B1'],
               [[x.hex() for x in c] for c in same]]
    digest = hashlib.sha256(json.dumps(payload, separators=(',', ':'), ensure_ascii=True).encode()).hexdigest()
    packet = {'revision': 'test', 'digest': digest, 'rows': tuple(
        {'contrast': axis, 'df': (1, 4), 'lower': (1,1), 'upper': (1,1),
         'encoding': 0x3ff0000000000000} for axis in ('A','B','AB'))}
    checked = outcome(same, submitted=packet)
    check(checked['result']['outcome'] == 'probability_evidence_consistent_experiment', 'hand p=1 evidence')
    bad = copy.deepcopy(packet); bad['rows'][2]['encoding'] -= 1
    refused = outcome(same, submitted=bad)
    check(refused['state'] == 'refused' and 'result' not in refused, 'last row suppresses all success')
    bad = copy.deepcopy(packet); bad['digest'] = '0' * 64
    check(outcome(same, submitted=bad)['reason'] == 'digest binding', 'digest mismatch')
    bad = copy.deepcopy(packet); bad['rows'][1]['df'] = (1,8)
    check(outcome(same, submitted=bad)['reason'] == 'df binding', 'df mismatch')
    zeros = outcome([[1.,1.] for _ in range(4)])
    check(zeros['state'] == 'refused' and zeros['reason'] == 'exact zero', 'zero SSE refuses')
    tiny = outcome([[0., float.fromhex('0x0.0000000000001p-1022')] for _ in range(4)])
    check(tiny['state'] == 'refused' and tiny['reason'] == 'positive representation', 'positive SSE rounds to zero')
    signed = [[-0.,1.]] + same[1:]
    check(outcome(signed)['result']['identity']['digest'] != result['identity']['digest'], 'signed zero identity preserved')
    check(outcome([[float(i % 2) for i in range(65)] for _ in range(4)])['state'] == 'completed', 'n=65 zero contrasts')
    bad_inputs = [[], [[0.,1.]]*3, [[0.,1.]]*3+[[0.,1.,2.]], [[0.]*66]*4,
                  [[True,1.]]+same[1:], [[1,1.]]+same[1:], [[float('inf'),1.]]+same[1:]]
    class Hostile:
        def __str__(self): raise RuntimeError('hostile str')
        def __eq__(self, other): raise RuntimeError('hostile equality')
        def __iter__(self): raise RuntimeError('hostile iteration')
    bad_inputs += [Hostile(), [[Hostile(),1.]]+same[1:]]
    for i, cells in enumerate(bad_inputs):
        with patch.object(s, '_launch', side_effect=RuntimeError('launched invalid input')):
            check(s.run(cells, 'test')['category'] == 'input_refused', 'input early refusal ' + str(i))
    bad = copy.deepcopy(packet); bad['rows'][0]['lower'] = (1 << 262144, 1)
    with patch.object(s, '_launch', side_effect=RuntimeError('launched oversized endpoint')):
        check(s.run(same, 'test', bad)['category'] == 'input_refused', 'endpoint cap prelaunch')
    with patch.object(s.platform, 'machine', return_value='aarch64'), patch.object(s, '_launch', side_effect=RuntimeError('launched unsupported host')):
        check(s.run(same, 'test')['category'] == 'unsupported_host_or_source', 'unsupported host prelaunch')
    # CPU time excludes scheduler wait; leave wall headroom on shared CI hosts.
    # Still require SIGXCPU classification, never accept deadline as a pass.
    cases = [('cpu','cpu_limit',15), ('memory','allocation_failure',3), ('hang','deadline',.15),
             ('closed-pipes-hang','deadline',.15), ('stdout','output_overflow',3),
             ('stderr','output_overflow',3), ('invalid','invalid_worker_output',3),
             ('crash','abnormal_exit',3), ('early-eof','invalid_worker_output',3),
             ('stderr-success','unexpected_stderr',3)]
    for name, category, wall in cases:
        receipt = s._launch([sys.executable,'-I','-B',str(HERE/'probe.py'),name], b'', wall=wall, out_cap=65536)
        check(receipt['category'] == category and receipt['worker_reaped'] and 'transport' not in receipt,
              'actual ' + name, receipt)
        check(receipt['bytes_buffered']['stdout'] <= 65536 and receipt['bytes_buffered']['stderr'] <= s.ERR_CAP,
              'bounded pipe buffers ' + name)
    env = s._launch([sys.executable,'-I','-B',str(HERE/'probe.py'),'environment'], b'')
    check(env['transport']['isolated'] == 1 and env['transport']['pythonpath'] is None, 'isolated environment')
    # Output may be transport-complete without constituting a valid result.
    with patch.object(s, '_launch', return_value={'category':'completed_transport','transport':{},'causes':[]}):
        check(s.run(same,'test')['category'] == 'invalid_worker_output', 'malformed worker receipt rejected')
    from output import validate
    raw = encode(same, 'test')
    mutations = [lambda x: x['result'].pop('tails'),
                 lambda x: x['result']['identity'].update(digest='0'*64),
                 lambda x: x['result']['df'].update(AB=['0x1','0x8']),
                 lambda x: x['result']['tails']['AB'].update(encoding='0x4000000000000000'),
                 lambda x: x['result']['displays']['sse'][0].update(nearest=None),
                 lambda x: x['result']['exact'].update(f=[])]
    for i, mutate in enumerate(mutations):
        forged = copy.deepcopy(base); mutate(forged)
        try:
            validate(forged, raw)
        except ValueError:
            check(True, 'output mutation ' + str(i))
        else:
            raise RuntimeError('accepted malformed output')
    cancel_code = """import json,os,signal,sys,threading
import supervisor as s
timer=threading.Timer(.15, lambda: os.kill(os.getpid(), signal.SIGTERM))
timer.start()
try:
    s._launch([sys.executable,'-I','-B',str(s.HERE/'probe.py'),'hang'],b'',wall=3)
except (KeyboardInterrupt,SystemExit) as error:
    r=error.receipt
else:
    raise RuntimeError('cancellation swallowed')
timer.join()
print(json.dumps(r))
"""
    cancelled = json.loads(subprocess.check_output([sys.executable,'-c',cancel_code],cwd=HERE,timeout=5))
    check(cancelled['category']=='cancelled' and cancelled['worker_reaped'] and 'transport' not in cancelled,
          'actual SIGTERM cleanup', cancelled)
    launch_cancel_code = """import json,os,signal,sys
import supervisor as s
original=s.subprocess.Popen
def launching(*args,**kwargs):
    process=original(*args,**kwargs)
    os.kill(os.getpid(),signal.SIGTERM)
    return process
s.subprocess.Popen=launching
try:
    s._launch([sys.executable,'-I','-B',str(s.HERE/'probe.py'),'hang'],b'',wall=3)
except (KeyboardInterrupt,SystemExit) as error:
    print(json.dumps(error.receipt))
else:
    raise RuntimeError('launch cancellation swallowed')
"""
    cancelled=json.loads(subprocess.check_output([sys.executable,'-c',launch_cancel_code],cwd=HERE,timeout=5))
    check(cancelled['category']=='cancelled' and cancelled['worker_reaped'] and 'transport' not in cancelled,
          'SIGTERM during child creation retains cleanup handle',cancelled)
    # Check an actual corrupted copied dependency without changing historical bytes.
    import tempfile
    with tempfile.TemporaryDirectory() as temp:
        root = Path(temp)
        (root/'INPUTS.json').write_text(json.dumps({'runtime':[{'path':'bad.py','sha256':'0'*64}]}))
        (root/'bad.py').write_text('pass\n')
        with patch.object(s,'HERE',root), patch.object(s,'ROOT',root):
            check(s.run(same,'test')['category']=='unsupported_host_or_source','source mutation refused')
    for name in ('unresolved','memory'):
        receipt=s._launch([sys.executable,'-I','-B',str(HERE/'numerical_probe.py'),name],encode(same,'test'))
        if name=='unresolved':
            check(receipt['transport']['outcome']=={'state':'unresolved','reason':'probability_projection'},
                  'actual worker unresolved suppresses diagnostics', receipt)
        else:
            check(receipt['category']=='allocation_failure' and receipt['worker_reaped'] and 'transport' not in receipt,
                  'actual worker bootstrap enforces address space', receipt)
    print(json.dumps({'python':platform.python_version(), 'optimized':bool(sys.flags.optimize),
                      'checks':len(rows), 'rows':rows}, indent=2))


if __name__ == '__main__':
    main()
