"""Disposable scale experiment; reuses author oracle, not independent review."""
from contextlib import redirect_stdout
from fractions import Fraction as Q
import hashlib
import io
import json
import math
from pathlib import Path
import platform
import runpy
import numpy as np

source = Path(__file__).with_name('ss-f-propagation.py')
with redirect_stdout(io.StringIO()):
    old = runpy.run_path(str(source))
base = np.array([-.5,.5,1.5,2.5,3.5,4.5,7.5,8.5])
fixtures = [(f'uniform_{e}', np.ldexp(base,e)) for e in (0,-600,600)]
fixtures += [('offset', base+2.0**40),
             ('mixed',np.array([0.,math.ulp(0.),1.,1.5,2.,2.5,2.0**600,2.0**600])),
             ('zero_residual', np.array([0.,0.,2.,2.,4.,4.,8.,8.]))]
rows = []
for name, y in fixtures:
    truth = old['exact'](y,2)
    exponent = math.frexp(max(abs(float(v)) for v in y))[1]
    for transform, e in [('raw',0),('power_scale',-exponent)]:
        with np.errstate(all='ignore'):
            z = np.ldexp(y,e)
        losses = [i for i,(a,b) in enumerate(zip(y,z)) if Q(float(b)) != Q(float(a))*Q(2)**e]
        transformed = old['exact'](z,2)
        with np.errstate(all='ignore'):
            observed = old['graphs'](z,2)
        rows.append(dict(fixture=name,transform=transform,scale_exponent=e,
                         inputs=[float(v).hex() for v in y], transformed_inputs=[float(v).hex() for v in z],
                         conversion_loss_indices=losses,exact_sse_positive=truth['sse'][0]>0,
                         exact_f=None if truth['f'] is None else [str(v) for v in truth['f']],
                         exact_f_preserved=truth['f']==transformed['f'],
                         observed={route:{k:[v.hex() for v in vals] for k,vals in result.items()}
                                   for route,result in observed.items()}))
assert all(r['exact_f_preserved'] for r in rows if not r['conversion_loss_indices'])
assert next(r for r in rows if r['fixture']=='mixed' and r['transform']=='power_scale')['conversion_loss_indices']==[1]
result=dict(status='AUTHOR_EXPLORATORY_NOT_INDEPENDENTLY_REVIEWED',python=platform.python_version(),numpy=np.__version__,
            source_sha256=hashlib.sha256(source.read_bytes()).hexdigest(),
            script_sha256=hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
            original_corpus_sha256=old['result']['corpus_sha256'],
            numpy_configuration=old['result']['environment']['numpy_configuration'],
            threading='not pinned', cases=rows)
print(json.dumps(result,sort_keys=True,indent=2))
