"""Pin final formatted derivative and unchanged transitive dependencies."""
import hashlib
import json
from pathlib import Path
here = Path(__file__).resolve().parent
root = here.parents[3]
old = json.loads((here.parent/'holm-public-candidate-20260911/INPUTS.json').read_text())
paths = {r['path'] for r in old['runtime'] if '/holm-public-candidate-20260911/' not in r['path']}
paths.add('reference/verifier/src/limits.ts')
for r in old['runtime']:
    if '/holm-public-candidate-20260911/' in r['path']:
        paths.add(str((here/Path(r['path']).name).relative_to(root)))
paths.add(str((here/'budget.mjs').relative_to(root)))
(here/'INPUTS.json').write_text(json.dumps({'base_commit':'84117fb7b285da43ebb3168c12155f31c4c49bc7','status':'unissued repair successor; historical candidates unchanged','runtime':[{'path':p,'sha256':hashlib.sha256((root/p).read_bytes()).hexdigest()}for p in sorted(paths)]},indent=2)+'\n')
