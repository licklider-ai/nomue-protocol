"""Pin final formatted runtime, including reused dependencies and public presentation."""
import hashlib
import json
from pathlib import Path

here = Path(__file__).resolve().parent
root = here.parents[3]
old = json.loads((here.parent / 'holm-controlled-execution-20260911/INPUTS.json').read_text())
paths = {x['path'] for x in old['runtime'] if '/holm-controlled-execution-20260911/' not in x['path']
         and '/holm-envelope-experiment-20260911/' not in x['path']}
paths.update(str((here / n).relative_to(root)) for n in [
    'entry.mjs', 'supervisor.py', 'envelope.mjs', 'public.mjs', 'present.mjs', 'identities.json', 'diagnostics.json', 'declaration-shapes.json',
    'outcomes.json', 'record.schema.json', 'expected.schema.json', 'report.schema.json',
    'refusal.schema.json', 'private-report.schema.json', 'private-refusal.schema.json'])
value = {'base_commit': '234abcaf256eac491a68b4b4b1593bf3983a8992',
         'status': 'unissued candidate; complete candidate runtime and inherited transitive pins',
         'runtime': [{'path': p, 'sha256': hashlib.sha256((root / p).read_bytes()).hexdigest()}
                     for p in sorted(paths)]}
(here / 'INPUTS.json').write_text(json.dumps(value, indent=2) + '\n')
