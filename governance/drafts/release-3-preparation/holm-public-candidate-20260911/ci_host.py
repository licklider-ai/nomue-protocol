"""Provision only an owned subtree on a disposable dedicated CI host; never enable root controllers."""
import json
import os
from pathlib import Path
import subprocess
import sys
import time

HERE = Path(__file__).resolve().parent
root = Path('/sys/fs/cgroup')
delegation = root / ('nomue-execution-' + str(os.getpid()))
if not {'cpu', 'memory', 'pids'}.issubset((root / 'cgroup.subtree_control').read_text().split()):
    raise SystemExit('CI host does not delegate cpu/memory/pids; no root-controller changes attempted')
delegation.mkdir()
try:
    code = '''
import errno,json,os,sys
from pathlib import Path
d=Path(sys.argv[1])
(d/'cgroup.procs').write_text(str(os.getpid()))
try:
    (d/'cgroup.subtree_control').write_text('+memory +pids +cpu')
    raise AssertionError('internal-process constraint not enforced')
except OSError as e:
    assert e.errno == errno.EBUSY, e
(d/'supervisor').mkdir()
(d/'supervisor'/'cgroup.procs').write_text(str(os.getpid()))
(d/'cgroup.subtree_control').write_text('+memory +pids +cpu')
(d/'calls').mkdir()
(d/'calls'/'cgroup.subtree_control').write_text('+memory +pids +cpu')
print(json.dumps({'T2_before_move':'EBUSY','T2_after_move':'enabled','delegation':str(d)}))
'''
    result = subprocess.check_output([sys.executable, '-I', '-c', code, str(delegation)], text=True)
    Path('execution-host.json').write_text(result)
    subprocess.run([sys.executable, '-I', str(HERE / 'test_execution.py'), '--delegation', str(delegation),
                    '--output', 'execution-cgroup-results.json'], check=True, timeout=300)
finally:
    (delegation / 'cgroup.kill').write_text('1')
    deadline = time.monotonic() + 5
    while 'populated 1' in (delegation / 'cgroup.events').read_text() and time.monotonic() < deadline:
        time.sleep(.02)
    for directory, subdirectories, files in os.walk(delegation, topdown=False):
        Path(directory).rmdir()
