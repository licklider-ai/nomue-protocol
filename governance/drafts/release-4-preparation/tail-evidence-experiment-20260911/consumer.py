"""Disposable in-memory probability-evidence consumer; not a public check."""
import hashlib
import importlib
import json
import math
import sys
from fractions import Fraction as Q
from pathlib import Path

HERE = Path(__file__).resolve().parent
# Trusted loader/manifest/runtime. Origin checks do not authenticate hostile
# in-memory code with a forged __file__. Use a fresh trusted Python process.
PINS = json.loads((HERE / 'INPUTS.json').read_text())['runtime']
for name, digest in PINS.items():
    path = HERE / name
    if hashlib.sha256(path.read_bytes()).hexdigest() != digest:
        raise ValueError('dependency hash: ' + name)
    module = sys.modules.get(name[:-3])
    if module is not None and Path(getattr(module, '__file__', '') or '').resolve() != path:
        raise ValueError('dependency origin: ' + name)
for name in PINS:
    module = importlib.import_module(name[:-3])
    if Path(getattr(module, '__file__', '') or '').resolve() != HERE / name:
        raise ValueError('dependency origin: ' + name)
import complete as target
from rational_oracle import round_probability  # Encoding helper, not tail oracle.

CAP = 262144
ONE = 0x3ff0000000000000


class EvidenceRefusal(ValueError):
    """Experimental evidence refusal, distinct from the upstream input refusal."""


def require(condition, reason):
    if not condition:
        raise EvidenceRefusal(reason)


def fields(value, keys, label):
    require(type(value) is dict and len(value) == len(keys), label + ' shape')
    # Do not hash or compare unchecked keys, including attacker-defined equality.
    require(all(type(k) is str for k in value), label + ' key type')
    require(all(len(k) <= 16 for k in value), label + ' key size')
    require(set(value) == keys, label + ' keys')


def validate_shape(submitted):
    fields(submitted, {'revision', 'digest', 'rows'}, 'envelope')
    rows = submitted['rows']
    require(type(rows) is tuple and len(rows) == 3, 'rows shape')
    for row in rows:
        fields(row, {'contrast', 'df', 'lower', 'upper', 'encoding'}, 'row')
        for key in ('df', 'lower', 'upper'):
            require(type(row[key]) is tuple and len(row[key]) == 2, key + ' shape')
    revision, digest = submitted['revision'], submitted['digest']
    require(type(revision) is str and 1 <= len(revision) <= 64 and
            all(x in target.ALPHABET for x in revision), 'revision scalar')
    require(type(digest) is str and len(digest) == 64 and
            all(x in '0123456789abcdef' for x in digest), 'digest scalar')
    for row in rows:
        axis = row['contrast']
        require(type(axis) is str and 1 <= len(axis) <= 2, 'contrast scalar')
        df = row['df']
        require(all(type(x) is int for x in df), 'df type')
        require(df[0] == 1 and 4 <= df[1] <= 256, 'df range')
        require(type(row['encoding']) is int, 'encoding type')
        require(0 <= row['encoding'] <= ONE, 'encoding range')
        for key in ('lower', 'upper'):
            pair = row[key]
            require(all(type(x) is int for x in pair), 'endpoint type')
            require(all(x.bit_length() <= CAP for x in pair), 'endpoint size')
            require(0 <= pair[0] <= pair[1] and pair[1] > 0, 'endpoint domain')
    return rows


def decode(rows):
    intervals = []
    for row in rows:
        for key in ('lower', 'upper'):
            require(math.gcd(*row[key]) == 1, 'endpoint reduced')
        lower, upper = Q(*row['lower']), Q(*row['upper'])
        require(lower <= upper, 'endpoint order')
        intervals.append((lower, upper))
    return intervals


def check_interval(interval, encoding, bounds, expected_encoding):
    lower, upper = interval
    require(lower <= bounds[0] <= bounds[1] <= upper, 'candidate containment')
    require(round_probability(lower) == encoding and
            round_probability(upper) == encoding, 'endpoint encoding')
    require(encoding == expected_encoding, 'target encoding')


def consume(expected_cells, expected_revision, submitted):
    snapshot, n = target.snapshot_input(expected_cells, expected_revision)
    rows = validate_shape(submitted)
    identity = target.input_identity(snapshot, expected_revision)
    require(submitted['revision'] == identity['revision'], 'revision binding')
    require(submitted['digest'] == identity['digest'], 'digest binding')
    for axis, row in zip(target.AXES, rows):
        require(row['contrast'] == axis, 'contrast binding')
        require(row['df'] == (1, 4*(n-1)), 'df binding')
    intervals = decode(rows)
    result = target.complete_snapshot(snapshot, n, identity)
    if result['outcome'] != 'complete_experiment':
        return {'outcome': 'unresolved_experiment', 'target': result}
    for axis, row, interval in zip(target.AXES, rows, intervals):
        tail = result['tails'][axis]
        check_interval(interval, row['encoding'], tail['bounds'], tail['encoding'])
    return {'outcome': 'probability_evidence_consistent_experiment',
            'identity': identity, 'contrasts': target.AXES,
            'scientific_validity': 'not_asserted'}
