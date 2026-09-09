"""Author-side boundary diagnostic; no supported graph or domain is selected."""
from contextlib import redirect_stdout
from fractions import Fraction
import hashlib
import io
import json
from pathlib import Path
import platform
import runpy
import numpy as np

source = Path(__file__).with_name('ss-f-propagation.py')
with redirect_stdout(io.StringIO()):
    submitted = runpy.run_path(str(source))
expected = [Fraction(100), Fraction(36), Fraction(4)]
base = [-0.5, 0.5, 1.5, 2.5, 3.5, 4.5, 7.5, 8.5]
rows = []
for exponent in (0, -600, 600):
    y = np.ldexp(np.array(base, dtype=np.float64), exponent)
    assert np.isfinite(y).all()
    # Exact power-of-two scaling of these dyadic observations is representable.
    assert all(Fraction(float(v)) == Fraction(b) * Fraction(2) ** exponent
               for v, b in zip(y, base))
    truth = submitted['exact'](y, 2)
    assert truth['f'] == expected and truth['sse'][0] > 0
    with np.errstate(all='ignore'):
        graphs = submitted['graphs'](y, 2)
    rows.append(dict(scale_exponent=exponent, exact_f=[str(v) for v in expected],
                     exact_sse_positive=True,
                     observed={name:{key:[v.hex() for v in values]
                                     for key,values in result.items()}
                               for name,result in graphs.items()}))
result = dict(status='AUTHOR_SELF_AUDIT_NOT_INDEPENDENT',
              python=platform.python_version(), numpy=np.__version__,
              source_sha256=hashlib.sha256(source.read_bytes()).hexdigest(),
              script_sha256=hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
              original_corpus_sha256=submitted['result']['corpus_sha256'],
              numpy_configuration=submitted['result']['environment']['numpy_configuration'],
              threading='not pinned; environment-specific observations', cases=rows)
print(json.dumps(result, indent=2, sort_keys=True))
