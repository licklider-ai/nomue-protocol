"""Regression expectations from PR 283 O1/O2, not candidate output copying."""
import copy
import json
import platform
import sys
import tempfile
from fractions import Fraction as Q
from pathlib import Path
import check as new

sys.path.insert(0, str(new.SOURCE))
import verify_results as old

passed = []
old_o1 = []
old_o2 = []


def rejected(name, fn, expected):
    try:
        fn()
    except ValueError as error:
        assert str(error) == expected, (name, str(error), expected)
        passed.append({'case': name, 'reason': str(error)})
    else:
        raise AssertionError('accepted: ' + name)


packet = copy.deepcopy(new.FIXED)
original_count = new.check(packet)
assert original_count == len(new.ROSTER)
index = next(i for i, r in enumerate(packet['rows']) if r['n'] == 2 and r['f_hex'] == float(4).hex())
row = packet['rows'][index]
lo, hi, _, _ = new.oracle.oracle(4., 2, 256)
den = 1 << 400
point = Q(-((-lo.numerator * den) // lo.denominator), den)
point_excluded = lo <= point <= hi and point < new.oracle.oracle(4., 2, 384)[0]
assert point_excluded
encoded = {'significand_hex': hex(point.numerator), 'exponent': -(point.denominator.bit_length() - 1)}
bad = copy.deepcopy(row)
bad['candidate_bounds'] = [encoded, encoded]
old.check(bad)
old_o2.append('singleton witness')
rejected('O2 submitted interval misses fixed candidate enclosure', lambda: new.check_row(bad, index), 'candidate containment')
for key, val in [('decimal_80_digits', '0'), ('decimal_abs_error_upper', {'significand_hex':'0x0','exponent':0}),
                 ('mathematical_tail','exact-one'), ('projection_class','normal-wrong'), ('family','other')]:
    bad = copy.deepcopy(row); bad[key] = val
    old.check(bad)
    old_o1.append(key)
    reason={'decimal_80_digits':'Decimal diagnostic','decimal_abs_error_upper':'Decimal error bound',
            'mathematical_tail':'mathematical tail','projection_class':'projection class','family':'fixed roster mismatch'}[key]
    rejected('O1 ' + key, lambda: new.check_row(bad, index), reason)
for key, val in [('n',True),('nu',4.0),('f_hex',float(1).hex()),('oracle_route','wrong'),
                 ('oracle_work',True),('round_binary64_bits','0000000000000000'),
                 ('candidate_bounds',[{'significand_hex':'0x0','exponent':0}]*2),
                 ('oracle_bounds',[{'significand_hex':'0x0','exponent':0}]*2)]:
    bad=copy.deepcopy(row);bad[key]=val
    reason={'n':'fixed roster mismatch','nu':'degrees','f_hex':'fixed roster mismatch',
            'oracle_route':'oracle provenance','oracle_work':'oracle provenance',
            'round_binary64_bits':'rounded bits','candidate_bounds':'candidate containment','oracle_bounds':'oracle containment'}[key]
    rejected(key,lambda:new.check_row(bad,index),reason)
for key in row:
    bad=copy.deepcopy(row);del bad[key]
    rejected('missing '+key,lambda:new.check_row(bad,index),'row fields')
for label, change in [('drop',lambda p:p['rows'].pop()),('duplicate',lambda p:p['rows'].__setitem__(1,p['rows'][0])),
                       ('reorder',lambda p:p['rows'].reverse()),('counter',lambda p:p['summary'].__setitem__('cases',219)),
                       ('extra',lambda p:p.__setitem__('other',0))]:
    bad=copy.deepcopy(packet);change(bad)
    reason={'drop':'fixed corpus size','duplicate':'fixed roster mismatch','reorder':'fixed roster mismatch',
            'counter':'fixed summary mismatch','extra':'packet fields'}[label]
    rejected(label,lambda:new.check(bad),reason)
for guard_index, interval in enumerate([[{'significand_hex':'0x1','exponent':200001}]*2,
                 [{'significand_hex':'0x1','exponent':True}]*2,
                 [{'significand_hex':'0x'+'1'*129,'exponent':0}]*2,
                 list(reversed(row['candidate_bounds']))]):
    bad=copy.deepcopy(row);bad['candidate_bounds']=interval
    rejected('interval guard',lambda:new.check_row(bad,index),
             ['exponent budget/type','exponent budget/type','significand budget/type','interval order/range'][guard_index])
# Positive non-identical representation: doubling a significand and decrementing
# its exponent preserves the exact endpoint. No whole-file equality shortcut.
good=copy.deepcopy(packet)
for r in good['rows']:
    for key in ['candidate_bounds','oracle_bounds']:
        for end in r[key]:
            end['significand_hex']=hex(2*int(end['significand_hex'],16));end['exponent']-=1
equivalent_count = new.check(good)
assert equivalent_count == original_count
wider=copy.deepcopy(row)
for key in ['candidate_bounds','oracle_bounds']:
    wider[key][0]['significand_hex']=hex(int(wider[key][0]['significand_hex'],16)-1)
    wider[key][1]['significand_hex']=hex(int(wider[key][1]['significand_hex'],16)+1)
new.check_row(wider,index)
valid_widened = [index]
# A tighter valid interval need not contain the fixed candidate enclosure.
tighter = copy.deepcopy(row)
def encode(q):
    assert q.denominator & (q.denominator-1) == 0
    return {'significand_hex':hex(q.numerator),'exponent':-(q.denominator.bit_length()-1)}
# Use the separately computed oracle interval, rounded outward to dyadics.
l,h,_,_ = new.oracle.oracle(4.,2,384)
scale=1<<450
lq=Q((l.numerator*scale)//l.denominator,scale)
hq=Q(-((-h.numerator*scale)//h.denominator),scale)
assert lq <= l <= h <= hq
tighter['candidate_bounds']=[encode(lq),encode(hq)]
rejected('valid tighter interval is outside fixed-enclosure contract',lambda:new.check_row(tighter,index),'candidate containment')
# Mutating DefaultContext must not alter the diagnostic. Clear the cache.
from decimal import DefaultContext, ROUND_DOWN, Inexact
old_rounding, old_traps = DefaultContext.rounding, DefaultContext.traps.copy()
expected = new.targets(index)
try:
    DefaultContext.rounding=ROUND_DOWN
    DefaultContext.traps[Inexact]=True
    new.targets.cache_clear()
    assert new.targets(index) == expected
finally:
    DefaultContext.rounding=old_rounding
    DefaultContext.traps=old_traps
    new.targets.cache_clear()
with tempfile.TemporaryDirectory() as tmp:
    p=Path(tmp)/'bad.json'
    for text, reason in [('{"rows":[],"rows":[]}','duplicate key'), ('{"x":NaN}','nonfinite JSON constant'),
                         ('{"x":1e999}','nonfinite JSON number'),('x'*(new.MAX_BYTES+1),'file budget exceeded')]:
        p.write_text(text)
        rejected('raw input',lambda:new.read(p),reason)
result={'status':'author-side regression passed; independent review pending',
        'original_rows':original_count,'equivalent_encoding_rows':equivalent_count,'valid_widened_rows':len(valid_widened),'rejected_mutations':len(passed),
        'rejections':passed,'old_checker_accepts_O1':len(old_o1),'old_checker_accepts_O2':len(old_o2),
        'python':platform.python_version(),'platform':platform.platform(),
        'O2_witness':encoded,'O2_proved_below_tighter_lower_bound':point_excluded}
Path(__file__).with_name('RESULTS.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps({k:v for k,v in result.items() if k not in ['rejections','O2_witness']}))
