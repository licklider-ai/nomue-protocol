"""Reproduce candidate preflight eligibility, not a completed-output success rate."""
import hashlib
import json
from pathlib import Path
import random
import sys
from fractions import Fraction

import supervisor

HERE = Path(__file__).resolve().parent


def main():
    supervisor.host()
    source = HERE.parent / 'tail-evidence-experiment-20260911'
    sys.path.insert(0, str(source))
    import complete
    rows = []
    for n in range(2,66):
        for seed in range(5):
            rng = random.Random(seed)
            cells = [[10*rng.random() for _ in range(n)] for _ in range(4)]
            exact = complete.exact_candidate(cells)
            fs = [Fraction(*pair) for pair in exact['f']]
            widths = [max(f.numerator.bit_length(),f.denominator.bit_length()) for f in fs]
            admitted = True
            reasons = []
            for axis, f in zip(complete.AXES, fs):
                try:
                    complete.guard(f,n)
                    for bits in complete.PRECISIONS:
                        complete.work_guard(f,n,bits)
                except ValueError as error:
                    admitted = False
                    reasons.append({'axis':axis,'reason':str(error)})
            a = 2*(n-1)
            ceiling = min(6500, 1000000//(a*a), 10000000//(a*a)-512)
            if admitted != all(w <= ceiling for w in widths):
                raise RuntimeError('independent inequality disagreement')
            raw = json.dumps([[x.hex() for x in c] for c in cells],separators=(',',':')).encode()
            rows.append({'n_per_cell':n,'seed':seed,'input_sha256':hashlib.sha256(raw).hexdigest(),
                         'F_widths':widths,'width_ceiling':ceiling,'preflight_eligible':admitted,'reasons':reasons})
    print(json.dumps({'sampling':'CPython 3.12 random.Random(seed); cell-major 10*random(); seeds 0..4',
                      'claim':'All three F preflights only; not completed computation or population success',
                      'rows':rows},indent=2))


if __name__ == '__main__':
    main()
