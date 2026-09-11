"""Deterministic admission probes; no tail evaluation or population claim."""
from pathlib import Path
import random,json,math
from adapter import prepare
from budget import work_guard
rows=[]
for n in (45,46,47,65):
    for seed in range(5):
        rng=random.Random(seed)
        cells=[[10*rng.random() for _ in range(n)] for _ in range(4)]
        c=prepare(cells,'admission-probe','A');f=c['lower']
        width=max(f.numerator.bit_length(),f.denominator.bit_length())
        try: work_guard(f,n,128); admitted=True
        except ValueError as e:
            if str(e)!='rational work budget': raise
            admitted=False
        rows.append({'n':n,'seed':seed,'width':width,'admitted':admitted})
result={'sampling':'CPython random.Random(seed), four cells of n values 10*random(), contrast A',
        'rows':rows,'width_110_max_n':1+math.isqrt(1000000//(4*110)),
        'width_120_max_n':1+math.isqrt(1000000//(4*120)),
        'n65_max_width':1000000//(128*128)}
Path(__file__).with_name('ADMISSION-PROBES.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps(result))
