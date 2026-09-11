"""Explicit checks: unexpected exceptions are failures, also under python -O."""
import copy
import hashlib
import json
import os
import subprocess
import sys
import tempfile
from pathlib import Path
from fractions import Fraction as Q
from unittest.mock import patch
import consumer as c
from rational_oracle import oracle

HERE = Path(__file__).resolve().parent
checks = []
O2 = [[0., 1.], [0., 1.], [1., 2.], [1., 2.]]
ORDINARY = [[0., 1.], [1., 2.], [2., 3.], [4., 5.]]


def check(ok, label):
    if not ok:
        raise RuntimeError(label)
    checks.append(label)


def packet(result):
    return {**result['identity'], 'rows': tuple(
        {'contrast': axis, 'df': result['df'][axis],
         'lower': (result['tails'][axis]['bounds'][0].numerator,
                   result['tails'][axis]['bounds'][0].denominator),
         'upper': (result['tails'][axis]['bounds'][1].numerator,
                   result['tails'][axis]['bounds'][1].denominator),
         'encoding': result['tails'][axis]['encoding']} for axis in c.target.AXES)}


def refuse(call, reason, before=False):
    with patch.object(c.target, 'complete_snapshot', wraps=c.target.complete_snapshot) as run:
        try:
            call()
        except c.EvidenceRefusal as error:
            check(str(error) == reason, 'refusal: ' + reason)
        else:
            raise RuntimeError('not rejected: ' + reason)
        if before:
            check(run.call_count == 0, 'pre-recompute: ' + reason)


def main():
    base = c.target.complete(O2, 'o2')
    p = packet(base)
    check(c.consume(O2, 'o2', p)['outcome'] == 'probability_evidence_consistent_experiment', 'natural packet')
    check(base['exact']['f'] == [(4, 1), (0, 1), (0, 1)], 'independent O2 F')
    # Independent exact polynomial-integral value for n=2, F=4 is irrational;
    # use the separately derived oracle for enclosure overlap and encoding.
    for axis, f in zip(c.target.AXES, (Q(4), Q(0), Q(0))):
        lo, hi = oracle(f, 2, 384)[:2]
        bounds = base['tails'][axis]['bounds']
        check(max(lo, bounds[0]) <= min(hi, bounds[1]), 'oracle overlap ' + axis)
        check(c.round_probability(lo) == c.round_probability(hi) == base['tails'][axis]['encoding'], 'oracle encoding ' + axis)
    lo, hi = oracle(Q(4), 2, 256)[:2]
    scale = 1 << 400
    point = Q(-((-lo.numerator * scale) // lo.denominator), scale)
    check(lo <= point <= hi and point < oracle(Q(4), 2, 384)[0], 'O2 independently below tighter lower bound')
    check(c.round_probability(point) == p['rows'][0]['encoding'], 'O2 same display')
    def replace_interval(interval):
        value = copy.deepcopy(p)
        for key, q in zip(('lower', 'upper'), interval):
            value['rows'][0][key] = (q.numerator, q.denominator)
        return value
    false = replace_interval((point, point))
    refuse(lambda: c.consume(O2, 'o2', false), 'candidate containment')
    tight = c.target.finite_enclosure(Q(4), 2, 512)
    check(base['tails']['A']['bounds'][0] < tight[0] <= tight[1] < base['tails']['A']['bounds'][1], 'same algorithm tighter witness')
    refuse(lambda: c.consume(O2, 'o2', replace_interval(tight)), 'candidate containment')
    ol, ou = oracle(Q(4), 2, 384)[:2]
    refuse(lambda: c.consume(O2, 'o2', replace_interval((ol, ou))), 'candidate containment')
    bounds = base['tails']['A']['bounds']; delta = bounds[1]-bounds[0]
    widened = replace_interval((bounds[0]-delta, bounds[1]+delta))
    check(c.consume(O2, 'o2', widened)['outcome'] == 'probability_evidence_consistent_experiment', 'natural widened packet')
    refuse(lambda: c.consume(O2, 'o2', replace_interval((Q(0), Q(1)))), 'endpoint encoding')
    # Malformed or misbound packets fail before exact arithmetic and tail work.
    mutations = [
        ('revision', 'other', 'revision binding'), ('digest', '0'*64, 'digest binding'),
        ('rows', p['rows'][:2], 'rows shape'), ('rows', list(p['rows']), 'rows shape'),
        ('revision', True, 'revision scalar'), ('digest', 'G'*64, 'digest scalar')]
    for key, value, reason in mutations:
        bad = copy.deepcopy(p); bad[key] = value
        refuse(lambda: c.consume(O2, 'o2', bad), reason, True)
    row_mutations = [
        ('contrast', 'B', 'contrast binding'), ('df', (1, 8), 'df binding'),
        ('df', (True, 4), 'df type'), ('df', (1, 260), 'df range'),
        ('encoding', True, 'encoding type'), ('encoding', c.ONE+1, 'encoding range'),
        ('lower', [0, 1], 'lower shape'), ('lower', (True, 1), 'endpoint type'),
        ('lower', (Q(0), 1), 'endpoint type'), ('lower', (0., 1), 'endpoint type'),
        ('lower', (0, 0), 'endpoint domain'), ('lower', (-1, 2), 'endpoint domain'),
        ('lower', (2, 1), 'endpoint domain'), ('lower', (0, 2), 'endpoint reduced'),
        ('lower', (1 << c.CAP, 1), 'endpoint size'),
        ('upper', (1, 1 << c.CAP), 'endpoint size'),
        ('lower', (1, 1), 'endpoint order')]
    for key, value, reason in row_mutations:
        bad = copy.deepcopy(p); bad['rows'][2][key] = value
        # B/AB's [1,1] makes the reversed lower case require a separate upper.
        if reason == 'endpoint order': bad['rows'][2]['upper'] = (0, 1)
        refuse(lambda: c.consume(O2, 'o2', bad), reason, True)
    for extra in ('precision', 'uri', 'code', 'cache'):
        bad = copy.deepcopy(p); bad[extra] = 'unused'
        refuse(lambda: c.consume(O2, 'o2', bad), 'envelope shape', True)
    bad = copy.deepcopy(p); bad['rows'][0]['encoding'] ^= 1
    refuse(lambda: c.consume(O2, 'o2', bad), 'endpoint encoding')
    bad = copy.deepcopy(p); bad['rows'][2]['encoding'] -= 1
    refuse(lambda: c.consume(O2, 'o2', bad), 'endpoint encoding')
    swapped = copy.deepcopy(p); swapped['rows'] = tuple(reversed(p['rows']))
    refuse(lambda: c.consume(O2, 'o2', swapped), 'contrast binding', True)
    translated = [[x+8 for x in row] for row in O2]
    refuse(lambda: c.consume(translated, 'o2', p), 'digest binding', True)
    signed = copy.deepcopy(O2); signed[0][0] = -0.
    refuse(lambda: c.consume(signed, 'o2', p), 'digest binding', True)
    other = c.target.complete(ORDINARY, 'o2')
    copied_identity = copy.deepcopy(p); copied_identity.update(other['identity'])
    refuse(lambda: c.consume(ORDINARY, 'o2', copied_identity), 'candidate containment')
    class Evil:
        called = False
        def __eq__(self, other):
            Evil.called = True
            raise RuntimeError('hostile equality executed')
        def __hash__(self): return 123
    class Integer(int): pass
    class Dictionary(dict): pass
    for value in (Evil(), Integer(0), bytearray(b'0')):
        bad = copy.deepcopy(p); bad['rows'][2]['lower'] = (value, 1)
        refuse(lambda: c.consume(O2, 'o2', bad), 'endpoint type', True)
    refuse(lambda: c.consume(O2, 'o2', Dictionary(p)), 'envelope shape', True)
    bad = copy.deepcopy(p); del bad['digest']; bad[Evil()] = 'x'
    refuse(lambda: c.consume(O2, 'o2', bad), 'envelope key type', True)
    check(not Evil.called, 'no hostile equality')
    # All operands bounded before any gcd; malformed final row wins first.
    bad = copy.deepcopy(p); bad['rows'][0]['lower'] = (0, 2); bad['rows'][2]['upper'] = (1, 1 << c.CAP)
    with patch.object(c.math, 'gcd', side_effect=RuntimeError('early gcd')):
        refuse(lambda: c.consume(O2, 'o2', bad), 'endpoint size', True)
    # Expected-input failures keep their original Refusal, and happen first.
    try:
        c.consume([], 'o2', None)
    except c.target.Refusal as error:
        check(str(error) == '1:cells:shape', 'expected input first')
    else: raise RuntimeError('expected input accepted')
    constant = [[0., 0.]]*4
    bad = copy.deepcopy(p); bad.update(c.target.input_identity(constant, 'o2'))
    try: c.consume(constant, 'o2', bad)
    except c.target.Refusal as error: check(str(error) == '4:SSE:exact zero', 'upstream SSE refusal')
    else: raise RuntimeError('zero SSE accepted')
    with patch.object(c.target, 'evaluate_tail', return_value={'bounds': (Q(0), Q(1)), 'encoding': None, 'bits': 512}):
        unresolved = c.consume(O2, 'o2', p)
        check(unresolved['outcome'] == 'unresolved_experiment' and 'contrasts' not in unresolved, 'unresolved not acceptance')
    with patch.object(c.target, 'complete_snapshot', wraps=c.target.complete_snapshot) as run:
        c.consume(O2, 'o2', p)
        check(run.call_count == 1, 'one complete recomputation')
    # The probability oracle is test-only even when the whole consumer runs.
    import rational_oracle
    with patch.object(rational_oracle, 'oracle', side_effect=RuntimeError('runtime oracle')):
        check(c.consume(O2, 'o2', p)['outcome'] == 'probability_evidence_consistent_experiment', 'candidate-only consumer')
    # A later inadmissible contrast prevents all probability work.
    import random
    rng = random.Random(17)
    x = [rng.random()*10 for _ in range(65)]
    y = [rng.random()*10 for _ in range(65)]
    cells = [x,y,x.copy(),y.copy()]
    bad = copy.deepcopy(p); bad.update(c.target.input_identity(cells, 'o2'))
    for row in bad['rows']: row['df'] = (1,256)
    with patch.object(c.target, 'evaluate_tail', side_effect=RuntimeError('early tail')):
        try: c.consume(cells, 'o2', bad)
        except c.target.Refusal as error:
            check(str(error) == '6:f:B:rational work budget', 'all contrast consumer preflight')
        else: raise RuntimeError('over-budget accepted')
    t, e = Q(3,4), Q(1,1<<56)
    bounds = (t-e,t+e); code = c.round_probability(t)
    c.check_interval((t-2*e,t+2*e), code, bounds, code)
    check(True, 'toy widened predicate')
    refuse(lambda: c.check_interval((t-e/2,t+e/2), code, bounds, code), 'candidate containment')
    refuse(lambda: c.check_interval((t-e,t-e), code, bounds, code), 'candidate containment')
    refuse(lambda: c.check_interval((Q(0),Q(1)), code, bounds, code), 'endpoint encoding')
    # Regression against immutable old wrapper in a fresh process; compare full
    # repr including exact values, bounds, diagnostics and exact refusal strings.
    baseline = HERE.parent / 'complete-output-experiment-20260911'
    manifest = json.loads((HERE/'INPUTS.json').read_text())
    check(hashlib.sha256((baseline/'complete.py').read_bytes()).hexdigest() == manifest['baseline_sha256'], 'baseline pin')
    cases = [O2, ORDINARY, [[0.,1.]]*4, constant, [],
             [[x*2.**-600 for x in row] for row in ORDINARY],
             [[x*2.**600 for x in row] for row in ORDINARY],
             [[0.,2.**-537]]*3+[[2.**500]*2], [[0.,2.**-538]]*4,
             [[0.,float('inf')]]*4, [[0.,1]]*4]
    runner = "import complete\ntry:\n print(repr(complete.complete(" + '{case}' + ", 'regression')))\nexcept complete.Refusal as e:\n print(str(e))\n"
    for i, cells in enumerate(cases):
        # repr(inf) needs a local name in this isolated script.
        script = 'inf=float("inf")\n' + runner.replace('{case}', repr(cells))
        proc = subprocess.run([sys.executable, '-c', script], cwd=baseline, capture_output=True, text=True, check=True, timeout=30)
        try: actual = repr(c.target.complete(cells, 'regression'))
        except c.target.Refusal as error: actual = str(error)
        check(actual == proc.stdout.strip(), 'wrapper regression ' + str(i))
    # Every runtime pin gets a named mutation and a preloaded-module check.
    for name in c.PINS:
        with tempfile.TemporaryDirectory() as folder:
            dst = Path(folder)
            for path in HERE.glob('*.py'): (dst/path.name).write_bytes(path.read_bytes())
            (dst/'INPUTS.json').write_bytes((HERE/'INPUTS.json').read_bytes())
            with (dst/name).open('ab') as handle: handle.write(b'\n# mutation\n')
            proc = subprocess.run([sys.executable, '-c', 'import consumer'], cwd=dst, capture_output=True, text=True, timeout=30)
            check(proc.returncode != 0 and proc.stderr.strip().endswith('ValueError: dependency hash: '+name), 'tamper '+name)
        script = f"import sys, types; sys.modules[{name[:-3]!r}]=types.ModuleType({name[:-3]!r}); import consumer"
        proc = subprocess.run([sys.executable, '-c', script], cwd=HERE, capture_output=True, text=True, timeout=30)
        check(proc.returncode != 0 and proc.stderr.strip().endswith('ValueError: dependency origin: '+name), 'shadow '+name)
    print(json.dumps({'checks': len(checks), 'labels': checks, 'O2': {
        'point_hex': [hex(point.numerator), hex(point.denominator)],
        'candidate_bounds_hex': [[hex(q.numerator), hex(q.denominator)] for q in base['tails']['A']['bounds']],
        'encoding_hex': hex(base['tails']['A']['encoding']),
        'resolved_bits': base['tails']['A']['bits']}}, indent=2))


if __name__ == '__main__': main()
