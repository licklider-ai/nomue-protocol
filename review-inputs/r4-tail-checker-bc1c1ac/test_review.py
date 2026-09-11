"""Additional bounded review probes; no scientific-method closure claim."""
import copy
import decimal
import importlib.util
import json
import platform
import sys
import tempfile
from fractions import Fraction as Q
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
TARGET = ROOT / 'governance/drafts/release-4-preparation/tail-checker-20260911'
spec = importlib.util.spec_from_file_location('reviewed_checker', TARGET / 'check.py')
c = importlib.util.module_from_spec(spec)
spec.loader.exec_module(c)
results = []

def reject(name, fn, reason):
    try:
        fn()
    except ValueError as exc:
        assert type(exc) is ValueError and str(exc) == reason, (name, type(exc), str(exc))
        results.append({'case': name, 'result': 'rejected', 'reason': str(exc)})
    else:
        raise AssertionError(name)

def record(name):
    results.append({'case': name, 'result': 'passed'})

index = next(i for i, r in enumerate(c.FIXED['rows']) if r['n'] == 2 and r['f_hex'] == (4.).hex())
row = c.FIXED['rows'][index]
assert c.check(copy.deepcopy(c.FIXED)) == 220
record('fixed corpus independently rerun')
baseline = c.targets(index)
saved_default = decimal.DefaultContext.copy()
saved_current = decimal.getcontext().copy()
try:
    for ctx in [decimal.DefaultContext, decimal.getcontext()]:
        ctx.prec = 3
        ctx.rounding = decimal.ROUND_FLOOR
        ctx.Emin = -9
        ctx.Emax = 9
        ctx.capitals = 0
        ctx.clamp = 1
        for flag in ctx.traps:
            ctx.traps[flag] = True
            ctx.flags[flag] = True
    c.targets.cache_clear()
    assert c.targets(index) == baseline
    c.check_row(copy.deepcopy(row), index)
    record('all traps flags and context fields mutated in default and ambient contexts')
finally:
    for attr in ['prec','rounding','Emin','Emax','capitals','clamp','traps','flags']:
        setattr(decimal.DefaultContext, attr, getattr(saved_default, attr))
    decimal.setcontext(saved_current)
    c.targets.cache_clear()

for field in row:
    bad = copy.deepcopy(row)
    bad[field] = None
    expected = {'n':'fixed roster mismatch','nu':'degrees','f_hex':'fixed roster mismatch',
        'family':'fixed roster mismatch','candidate_bounds':'interval shape','oracle_bounds':'interval shape',
        'round_binary64_bits':'rounded bits','oracle_route':'oracle provenance','oracle_work':'oracle provenance',
        'decimal_80_digits':'Decimal diagnostic','decimal_abs_error_upper':'dyadic shape',
        'projection_class':'projection class','mathematical_tail':'mathematical tail'}[field]
    reject('null ' + field, lambda: c.check_row(bad,index), expected)

bad=copy.deepcopy(row)
bad['decimal_abs_error_upper']={'significand_hex':'0x1','exponent':0}
c.check_row(bad,index)
record('conservative Decimal error upper bound accepted')

# This is a real exercise of the new overlap guard, using controlled trusted
# implementation fault injection rather than attacker-controlled packet changes.
real_targets=c.targets
cb,ob,diag=real_targets(index)
c.targets=lambda i: ((Q(0),Q(0)),(Q(1),Q(1),ob[2],ob[3]),diag)
try:
    reject('disjoint recomputation fault injection',lambda:c.check_row(row,index),'recomputed intervals disjoint')
finally:
    c.targets=real_targets

# Separate oracle refinement gives a conservative truth enclosure, but this
# fixed-envelope policy intentionally rejects it as candidate evidence.
lo,hi,_,_=c.oracle.oracle(4.,2,512)
scale=1<<500
l=Q(lo.numerator*scale//lo.denominator,scale)
h=Q(-((-hi.numerator*scale)//hi.denominator),scale)
assert l <= lo <= hi <= h
assert not(l <= cb[0] <= cb[1] <= h)
def encode(q):
    return {'significand_hex':hex(q.numerator),'exponent':-(q.denominator.bit_length()-1)}
bad=copy.deepcopy(row)
bad['candidate_bounds']=[encode(l),encode(h)]
reject('512-bit oracle enclosure still outside fixed candidate contract',lambda:c.check_row(bad,index),'candidate containment')

with tempfile.TemporaryDirectory() as tmp:
    p=Path(tmp)/'input.json'
    for token in ['1e999','-1e999','1.8e308','-1.8e308']:
        p.write_text('{"nested":[{"value":'+token+'}]}')
        reject('overflow '+token,lambda:c.read(p),'nonfinite JSON number')
    for token in ['NaN','Infinity','-Infinity']:
        p.write_text('['+token+']')
        reject('constant '+token,lambda:c.read(p),'nonfinite JSON constant')
    p.write_text('{"a":{"x":1,"x":2}}')
    reject('nested duplicate',lambda:c.read(p),'duplicate key')
    p.write_text('{"x":1.7976931348623157e308}')
    assert c.read(p)['x'] == sys.float_info.max
    record('largest finite binary64 parses')
    p.write_text('{"x":1e-999}')
    assert c.read(p)['x'] == 0
    record('finite JSON underflow is permitted at parser level')

payload={'reviewed_commit':'bc1c1ace426d51e55c9551090f6e400af2ac17d2',
    'python':sys.version,'platform':platform.platform(),'cases':results,
    'passed':len(results),'rejected':sum(r['result']=='rejected' for r in results)}
Path(__file__).with_name('extra-results.json').write_text(json.dumps(payload,indent=2)+'\n')
print(json.dumps({k:v for k,v in payload.items() if k!='cases'}))
