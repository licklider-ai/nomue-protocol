"""Author-side packet controls; metamorphic relations are not an independent oracle."""
import copy
from fractions import Fraction
import json
from pathlib import Path
import subprocess
import sys
from unittest.mock import patch

import supervisor as s
from transport import encode

HERE = Path(__file__).resolve().parent
TARGET = '1caac8df84ba73e73e160e844fcc228fc884f31c'


def main():
    target = sys.argv[1] if len(sys.argv) == 2 else TARGET
    # Review the immutable runtime, even if later commits add review records.
    pins = json.loads((HERE / 'INPUTS.json').read_text())
    for row in pins['runtime']:
        original = subprocess.check_output(['git', 'show', target + ':' + row['path']], cwd=s.ROOT)
        if (s.ROOT / row['path']).read_bytes() != original:
            raise RuntimeError('review target runtime changed')
    environment = s.host()
    rows = []

    def check(ok, name):
        if not ok:
            raise RuntimeError(name)
        rows.append({'name': name, 'passed': True})

    cells = [[0., 2.], [2., 4.], [4., 6.], [8., 10.]]

    def complete(data):
        receipt = s.run(data, 'packet-review')
        if receipt['category'] != 'completed_worker' or receipt['outcome']['state'] != 'completed':
            raise RuntimeError(repr(receipt))
        return receipt['outcome']['result']

    def exact(result, key):
        return [Fraction(int(a, 16), int(b, 16)) for a, b in result['exact'][key]]

    base = complete(cells)
    # Four within-cell deviations are (-1,+1), hence SSE=8, independently of code.
    check(exact(base, 'sse') == [8], 'hand-derived SSE=8')
    check(sum(len(base['exact'][key]) for key in ('estimates', 'ss', 'sse', 'f')) +
          len(base['tails']) == 13 and len(base['df']) == 3, 'complete inventory')
    for label, data, signs, scale in (
        ('swap A', cells[2:] + cells[:2], [-1, 1, -1], 1),
        ('swap B', [cells[1], cells[0], cells[3], cells[2]], [1, -1, -1], 1),
        ('translate', [[x + 16 for x in c] for c in cells], [1, 1, 1], 1),
        ('scale', [[x * 4 for x in c] for c in cells], [1, 1, 1], 4),
    ):
        result = complete(data)
        check(exact(result, 'estimates') == [v * sign * scale for v, sign in
                                             zip(exact(base, 'estimates'), signs)], label + ' estimates')
        check(all(exact(result, key) == [v * scale * scale for v in exact(base, key)]
                  for key in ('ss', 'sse')) and exact(result, 'f') == exact(base, 'f') and
              result['tails'] == base['tails'] and result['df'] == base['df'], label + ' invariants')

    class HostileList(list):
        def __len__(self):
            raise RuntimeError('caller operation invoked')

    class HostileFloat(float):
        def hex(self):
            raise RuntimeError('caller operation invoked')

    for label, data in [('outer subclass', HostileList(cells)),
                        ('cell subclass', [HostileList(cells[0])] + cells[1:]),
                        ('float subclass', [[HostileFloat(0.), 2.]] + cells[1:]),
                        ('bool observation', [[False, 2.]] + cells[1:])]:
        check(s.run(data, 'packet-review')['category'] == 'input_refused', label + ' refused')

    # Signed zeros have the same arithmetic meaning but distinct transport identity.
    positive = [[0., 1.] for _ in range(4)]
    negative = copy.deepcopy(positive); negative[0][0] = -0.
    p, n = complete(positive), complete(negative)
    check(p['identity']['digest'] != n['identity']['digest'] and p['exact'] == n['exact'],
          'signed-zero binding without arithmetic difference')

    receipt = s.run(cells, 'packet-review')
    for label, mutate in [
        ('wrong identity', lambda r: r['outcome']['result']['identity'].update(digest='0' * 64)),
        ('missing tail', lambda r: r['outcome']['result']['tails'].pop('AB')),
        ('extra result key', lambda r: r['outcome']['result'].update(extra=True)),
        ('partial unresolved', lambda r: r.update(outcome={'state': 'unresolved',
                                                          'reason': 'probability_projection', 'result': base})),
    ]:
        transport = {'kind': 'r4-controlled-experiment', 'scientific_validity': 'not_asserted',
                     'limits': receipt['enforced_limits'], 'outcome': copy.deepcopy(receipt['outcome'])}
        mutate(transport)
        with patch.object(s, '_launch', return_value={'category': 'completed_transport',
                                                     'causes': [], 'transport': transport}):
            invalid = s.run(cells, 'packet-review')
        check(invalid['category'] == 'invalid_worker_output' and 'outcome' not in invalid,
              label + ' suppresses output')
    print(json.dumps({'target': target, 'environment': environment,
                      'provenance': 'continuing author context; not independent review',
                      'checks': len(rows), 'rows': rows}, indent=2))


if __name__ == '__main__':
    main()
