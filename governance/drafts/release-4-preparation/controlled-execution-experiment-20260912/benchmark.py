"""Actual controlled invocations at ordinary/admission boundaries; no worst-case proof."""
import json
import random
from pathlib import Path
import sys

import supervisor as s

HERE = Path(__file__).resolve().parent


def main():
    rows = []
    for n in (2,32,45,46,47,65):
        rng = random.Random(0)
        cells = [[10*rng.random() for _ in range(n)] for _ in range(4)]
        result = s.run(cells, 'boundary')
        if result['category'] != 'completed_worker':
            raise RuntimeError('unexpected execution failure: '+repr(result))
        # Expectations derive from the separately tested admission inequalities.
        expected = 'completed' if n <= 46 else 'refused'
        if result['outcome']['state'] != expected:
            raise RuntimeError('unexpected admission: '+repr(result))
        rows.append({'name':'ordinary-'+str(n),'input_hex':[[x.hex() for x in c] for c in cells],
                     'receipt':result})
    # Cap-size evidence exercises transport conversion, pipe delivery, endpoint
    # gcd and final containment within the actual worker. Use independently known
    # F=0,p=1: no candidate-generated expected probability is needed.
    cells = [[0.,1.] for _ in range(4)]
    result = s.run(cells,'cap')
    identity = result['outcome']['result']['identity']
    pair = (1, (1 << 262144)-1)
    submitted = {**identity, 'rows':tuple({'contrast':axis,'df':(1,4),'lower':pair,
                 'upper':(1,1),'encoding':0x3ff0000000000000} for axis in ('A','B','AB'))}
    result = s.run(cells,'cap',submitted)
    if result['category'] != 'completed_worker' or result['outcome']['reason'] != 'endpoint encoding':
        raise RuntimeError('cap probe failed: '+repr(result))
    rows.append({'name':'cap-size-endpoints','endpoint_bits':262144,'receipt':result})
    print(json.dumps({'claim':'Observed controlled executions; not portable latency or whole-domain proof',
                      'rows':rows},indent=2))


if __name__ == '__main__':
    main()
