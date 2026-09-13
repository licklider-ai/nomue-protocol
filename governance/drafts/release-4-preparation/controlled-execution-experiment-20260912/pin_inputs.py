"""Author-only manifest generation. Review/test commands never repin sources."""
import hashlib
import json
from pathlib import Path
import subprocess

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
SOURCE = HERE.parent / 'tail-evidence-experiment-20260911'
runtime = [SOURCE / name for name in ('consumer.py', 'complete.py', 'upstream_arithmetic.py',
           'rational_candidate.py', 'rational_oracle.py', 'budget.py', 'INPUTS.json')]
runtime += [HERE / name for name in ('worker.py', 'transport.py', 'supervisor.py', 'output.py')]
value = {'status': 'unissued_experiment',
         'baseline': '4a62f8e1768049560cb0ce8f09ef1676cb42130b',
         'numerical_directory': str(SOURCE.relative_to(ROOT)),
         'runtime': [{'path': str(p.relative_to(ROOT)),
                      'sha256': hashlib.sha256(p.read_bytes()).hexdigest()} for p in runtime],
         'inherited_source_commit': '97ef2926dbea7251d9fa611d4ada6513341f9826',
         'r3_priority': {'observed_pr': 330, 'policy': 'no R3 or shared authority/runtime changes'}}
# Fail rather than silently binding different historical numerical bytes.
for p in runtime[:7]:
    original = subprocess.check_output(['git', 'show', value['inherited_source_commit'] + ':' + str(p.relative_to(ROOT))], cwd=ROOT)
    if p.read_bytes() != original:
        raise RuntimeError('inherited source drift: ' + str(p))
(HERE / 'INPUTS.json').write_text(json.dumps(value, indent=2) + '\n')
