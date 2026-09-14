"""Bounded internal transport for trusted in-memory callers; never a Record parser."""
import json
import math

INPUT_CAP = 1024 * 1024
ENDPOINT_BITS = 262144
AXES = ('A', 'B', 'AB')
ALPHABET = frozenset('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_.-')


def need(ok, reason):
    if not ok:
        raise ValueError(reason)


def fields(value, names):
    need(type(value) is dict and len(value) == len(names), 'transport shape')
    need(all(type(k) is str and len(k) <= 16 for k in value), 'transport key')
    need(set(value) == names, 'transport fields')


def encode(cells, revision, submitted=None):
    # No caller-defined conversion, comparison or iteration methods are invoked.
    # Concurrent caller mutation is outside this synchronous in-memory API.
    need(type(cells) is list and len(cells) == 4, 'four cells')
    need(all(type(c) is list and 2 <= len(c) <= 65 for c in cells), 'cell size')
    need(all(len(c) == len(cells[0]) for c in cells), 'balanced cells')
    need(type(revision) is str and 1 <= len(revision) <= 64 and
         all(x in ALPHABET for x in revision), 'revision')
    need(all(type(x) is float and math.isfinite(x) for c in cells for x in c),
         'finite binary64')
    value = {'cells': [[x.hex() for x in c] for c in cells], 'revision': revision}
    if submitted is not None:
        fields(submitted, {'revision', 'digest', 'rows'})
        need(type(submitted['revision']) is str and 1 <= len(submitted['revision']) <= 64 and
             all(x in ALPHABET for x in submitted['revision']), 'submitted revision')
        need(type(submitted['digest']) is str and len(submitted['digest']) == 64 and
             all(x in '0123456789abcdef' for x in submitted['digest']), 'submitted digest')
        rows = submitted['rows']
        need(type(rows) is tuple and len(rows) == 3, 'three rows')
        encoded = []
        for row in rows:
            fields(row, {'contrast', 'df', 'lower', 'upper', 'encoding'})
            need(type(row['contrast']) is str and 1 <= len(row['contrast']) <= 2, 'contrast')
            need(type(row['df']) is tuple and len(row['df']) == 2 and
                 all(type(x) is int and 0 <= x <= 256 for x in row['df']), 'df')
            need(type(row['encoding']) is int and 0 <= row['encoding'] <= 0x3ff0000000000000,
                 'encoding')
            item = {k: row[k] for k in ('contrast', 'df', 'encoding')}
            for key in ('lower', 'upper'):
                pair = row[key]
                need(type(pair) is tuple and len(pair) == 2 and
                     all(type(x) is int and x.bit_length() <= ENDPOINT_BITS for x in pair),
                     'endpoint size or type')
                # Domain/reduction/identity decisions belong to the pinned consumer.
                item[key] = [hex(x) for x in pair]
            encoded.append(item)
        value['submitted'] = {**{k: submitted[k] for k in ('revision', 'digest')}, 'rows': encoded}
    raw = json.dumps(value, separators=(',', ':'), ensure_ascii=True).encode('ascii')
    need(len(raw) <= INPUT_CAP, 'transport size')
    return raw


def decode(raw):
    # Only encode() output is delivered to this internal worker. Not user JSON.
    need(len(raw) <= INPUT_CAP, 'transport size')
    value = json.loads(raw)
    cells = [[float.fromhex(x) for x in c] for c in value['cells']]
    submission = value.get('submitted')
    if submission is not None:
        submission['rows'] = tuple(submission['rows'])
        for row in submission['rows']:
            row['df'] = tuple(row['df'])
            for key in ('lower', 'upper'):
                row[key] = tuple(int(x, 16) for x in row[key])
    return cells, value['revision'], submission
