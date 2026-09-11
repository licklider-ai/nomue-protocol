"""Deliberate source refresh after review; never run automatically in CI."""
import hashlib,json
from pathlib import Path
here=Path(__file__).resolve().parent
root=here.parents[3]
old=json.loads((here.parent/'holm-adoption-map-20260911/INPUTS.json').read_text())
paths={r['path'] for r in old['files']}
# Conservative test/runtime closure: corpus, schema validation and reference dispatch.
for rel in ['reference/verifier','conformance','schemas','tooling/src',
            'governance/drafts/release-3-preparation/holm-repaired-candidate-20260911',
            'governance/drafts/release-3-preparation/holm-adoption-map-repair-20260911',
            'governance/drafts/release-3-preparation/holm-declaration-binding-experiment-20260911']:
 for p in (root/rel).rglob('*'):
  if p.is_file() and p.suffix in {'.mjs','.ts','.py','.json','.yaml','.jcs'} and p!=here/'INPUTS.json':paths.add(str(p.relative_to(root)))
for r in json.loads((here.parent/'holm-repaired-candidate-20260911/INPUTS.json').read_text())['runtime']:paths.add(r['path'])
(here/'INPUTS.json').write_text(json.dumps({'base':'84117fb7b285da43ebb3168c12155f31c4c49bc7','scope':'conservative runtime and executed test closure; not a claim that historical review inputs are complete','files':[{'path':p,'sha256':hashlib.sha256((root/p).read_bytes()).hexdigest()} for p in sorted(paths)]},indent=2)+'\n')
