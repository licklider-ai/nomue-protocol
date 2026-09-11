"""Check integer admission envelope only; does not execute numerical candidates."""
from pathlib import Path
import json
rows=[]
for n in range(2,66):
    a=2*(n-1)
    width=min(6500,1000000//(a*a))
    if a*a*width>1000000 or a*a*(width+512)>10000000:
        raise ValueError('admission boundary')
    if width<6500 and a*a*(width+1)<=1000000:
        raise ValueError('not maximal')
    rows.append({'n_per_cell':n,'max_component_bits':width})
p=Path(__file__).with_name('admission-envelope.json')
actual=json.loads(p.read_text())
if actual!={'scope':'adapter precision at most 512; score only, not runtime','rows':rows}:
    raise ValueError('envelope differs')
print('64 admission boundaries verified; no numerical candidate executed')
