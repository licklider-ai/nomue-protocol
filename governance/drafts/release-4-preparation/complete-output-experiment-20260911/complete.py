"""Disposable raw-input experiment; not a Record API or supported public check."""
import hashlib
import json
import math
from pathlib import Path
from fractions import Fraction as Q

HERE = Path(__file__).resolve().parent
# Fresh trusted Python process/module search path is part of this experiment.
# Loader, manifest and Python runtime are trusted; this is not a hostile-code sandbox.
manifest = json.loads((HERE / 'INPUTS.json').read_text())
for name, pin in manifest['dependencies'].items():
    if hashlib.sha256((HERE / name).read_bytes()).hexdigest() != pin['sha256']:
        raise ValueError('dependency hash: ' + name)
from upstream_arithmetic import exact_candidate, project
from rational_candidate import guard, finite_enclosure
from rational_oracle import projection
from budget import work_guard

AXES = ('A', 'B', 'AB')
PRECISIONS = (128, 256, 512)
ALPHABET = frozenset('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_.-')


class Refusal(ValueError):
    """Planned local refusal, not a Protocol reason code."""
    def __init__(self, stage, quantity, reason):
        self.stage, self.quantity, self.reason = stage, quantity, reason
        super().__init__(f'{stage}:{quantity}:{reason}')


def require(ok, stage, quantity, reason):
    if not ok:
        raise Refusal(stage, quantity, reason)


def evaluate_tail(f, n):
    for bits in PRECISIONS:
        bounds = finite_enclosure(f, n, bits)
        encoding = projection(bounds)  # Encoding helper only; no probability oracle.
        if encoding is not None:
            return {'bounds': bounds, 'encoding': encoding, 'bits': bits}
    return {'bounds': bounds, 'encoding': None, 'bits': bits}


def assemble(identity, n, exact, displays, tails):
    # Internal construction failures are bugs, not planned input refusals.
    if tuple(tails) != AXES or any(tails[k]['encoding'] is None for k in AXES):
        raise RuntimeError('incomplete contrast construction')
    return {'outcome': 'complete_experiment', 'identity': identity,
            'df': {k: (1, 4*(n-1)) for k in AXES},
            'exact': exact, 'displays': displays, 'tails': tails}


def complete(cells, revision):
    require(type(cells) is list and len(cells) == 4 and
            all(type(c) is list for c in cells), 1, 'cells', 'shape')
    n = len(cells[0])
    require(2 <= n <= 65 and all(len(c) == n for c in cells), 1, 'cells', 'count')
    require(type(revision) is str and 1 <= len(revision) <= 64 and
            all(c in ALPHABET for c in revision), 2, 'revision', 'identity')
    snapshot = [c.copy() for c in cells]
    require(all(type(x) is float and math.isfinite(x) for c in snapshot for x in c),
            3, 'observations', 'finite binary64')
    # Caller mutation during this call is outside the in-memory experiment contract.
    exact = exact_candidate(snapshot)
    require(Q(*exact['sse'][0]) > 0, 4, 'SSE', 'exact zero')
    payload = ['r4-complete-output-experiment-v1', revision,
               ['A0B0', 'A0B1', 'A1B0', 'A1B1'],
               [[x.hex() for x in c] for c in snapshot]]
    identity = {'revision': revision, 'digest': hashlib.sha256(
        json.dumps(payload, separators=(',', ':'), ensure_ascii=True).encode()).hexdigest()}
    # Only the mandatory exact arithmetic quantities are returned as output.
    mandatory = {key: exact[key] for key in ('estimates', 'ss', 'sse', 'f')}
    displays = {}
    for key in ('estimates', 'ss', 'sse', 'f'):
        displays[key] = []
        for i, pair in enumerate(mandatory[key]):
            quantity = 'SSE' if key == 'sse' else key + ':' + AXES[i]
            value = project(pair)
            require(value['nearest'] is not None, 5, quantity, 'finite representation')
            if key == 'sse':
                require(value['status'] != 'nonzero_rounds_to_zero',
                        5, quantity, 'positive representation')
            displays[key].append(value)
    fs = [Q(*pair) for pair in exact['f']]
    # Preflight every contrast at every planned precision before ANY tail work.
    for axis, f in zip(AXES, fs):
        try:
            guard(f, n)
            for bits in PRECISIONS:
                work_guard(f, n, bits)
        except ValueError as error:
            raise Refusal(6, 'f:' + axis, str(error)) from error
    tails = {}
    for axis, f in zip(AXES, fs):
        tail = evaluate_tail(f, n)
        if tail['encoding'] is None:
            return {'outcome': 'unresolved_experiment', 'identity': identity,
                    'quantity': axis, 'bounds': tail['bounds'], 'bits': tail['bits'],
                    'diagnostic_tails': tails}
        tails[axis] = tail
    return assemble(identity, n, mandatory, displays, tails)
