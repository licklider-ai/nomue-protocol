"""Disposable fixed-corpus evidence checker; not a Protocol verifier."""
import hashlib
import importlib.util
import json
import re
from decimal import Context, Decimal, localcontext
from fractions import Fraction as Q
from functools import lru_cache
from pathlib import Path

HERE = Path(__file__).resolve().parent
SOURCE = HERE.parent / 'tail-feasibility-20260910'
MAX_BYTES = 2_000_000


def require(ok, message):
    if not ok:
        raise ValueError(message)


def pairs(items):
    out = {}
    for k, v in items:
        require(k not in out, 'duplicate key')
        out[k] = v
    return out


def read(path):
    with Path(path).open('rb') as stream:
        data = stream.read(MAX_BYTES + 1)
    require(len(data) <= MAX_BYTES, 'file budget exceeded')
    def constant(_):
        raise ValueError('nonfinite JSON constant')
    return json.loads(data, object_pairs_hook=pairs, parse_constant=constant)


PINS = read(HERE / 'INPUTS.json')['files']
for name, digest in PINS.items():
    require(hashlib.sha256((SOURCE / name).read_bytes()).hexdigest() == digest,
            'trusted source changed: ' + name)


def module(name):
    spec = importlib.util.spec_from_file_location('fixed_' + name, SOURCE / (name + '.py'))
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result


candidate, oracle = module('candidate'), module('oracle')
FIXED = read(SOURCE / 'results.json')
ROSTER = [(r['n'], r['f_hex'], r['family']) for r in FIXED['rows']]
KEYS = set(FIXED['rows'][0])


def unpack(v):
    require(type(v) is dict and set(v) == {'significand_hex', 'exponent'}, 'dyadic shape')
    s, e = v['significand_hex'], v['exponent']
    require(type(s) is str and re.fullmatch(r'0x[0-9a-f]{1,128}', s) is not None,
            'significand budget/type')
    require(type(e) is int and -200000 <= e <= 200000, 'exponent budget/type')
    k = int(s, 16)
    return Q(k << e) if e >= 0 else Q(k, 1 << -e)


def bounds(v):
    require(type(v) is list and len(v) == 2, 'interval shape')
    lo, hi = map(unpack, v)
    require(0 <= lo <= hi <= 1, 'interval order/range')
    return lo, hi


@lru_cache(maxsize=220)
def targets(index):
    n, text, _ = ROSTER[index]
    f = float.fromhex(text)
    cb = candidate.finite_enclosure(f, n, 128)
    ob = oracle.oracle(f, n, 256)
    # Pin ambient Decimal settings rather than inherit caller precision/rounding.
    with localcontext(Context(prec=28, Emin=-999999, Emax=999999)):
        decimal = str(candidate.decimal_candidate(f, n, 80))
    return cb, ob, decimal


def check_row(row, index):
    require(type(row) is dict and set(row) == KEYS, 'row fields')
    n, f, family = ROSTER[index]
    require(type(row['n']) is int and row['n'] == n and row['f_hex'] == f
            and row['family'] == family, 'fixed roster mismatch')
    require(type(row['nu']) is int and row['nu'] == 4 * (n - 1), 'degrees')
    cb, ob, decimal = targets(index)
    cl, ch = bounds(row['candidate_bounds'])
    ol, oh = bounds(row['oracle_bounds'])
    require(cl <= cb[0] <= cb[1] <= ch, 'candidate containment')
    require(ol <= ob[0] <= ob[1] <= oh, 'oracle containment')
    require(max(cl, ol) <= min(ch, oh), 'disjoint intervals')
    code = oracle.projection((ol, oh))
    require(code is not None and oracle.projection((cl, ch)) == code, 'unresolved projection')
    require(row['round_binary64_bits'] == f'{code:016x}', 'rounded bits')
    require(row['oracle_route'] == ob[2] and type(row['oracle_work']) is int
            and row['oracle_work'] == ob[3], 'oracle provenance')
    require(row['decimal_80_digits'] == decimal, 'Decimal diagnostic')
    error = max(abs(Q(Decimal(decimal)) - ob[0]), abs(Q(Decimal(decimal)) - ob[1]))
    require(unpack(row['decimal_abs_error_upper']) >= error, 'Decimal error bound')
    kind = ('positive-rounds-zero' if code == 0 else 'rounded-one' if code == 0x3ff0000000000000
            else 'subnormal' if code < 1 << 52 else 'normal')
    require(row['projection_class'] == kind, 'projection class')
    require(row['mathematical_tail'] == ('exact-one' if float.fromhex(f) == 0
            else 'strictly-positive-less-than-one'), 'mathematical tail')


def check(packet):
    require(type(packet) is dict and set(packet) == {'summary', 'rows'}, 'packet fields')
    rows = packet['rows']
    require(type(rows) is list and len(rows) == len(ROSTER), 'fixed corpus size')
    # Historical probe counters/status are byte-semantic metadata, not re-executed here.
    require(json.dumps(packet['summary'], sort_keys=True, allow_nan=False) ==
            json.dumps(FIXED['summary'], sort_keys=True), 'fixed summary mismatch')
    for i, row in enumerate(rows):
        check_row(row, i)
    return len(rows)


if __name__ == '__main__':
    import sys
    path = sys.argv[1] if len(sys.argv) == 2 else SOURCE / 'results.json'
    print(json.dumps({'checked_rows': check(read(path)), 'scope': 'fixed research corpus only'}))
