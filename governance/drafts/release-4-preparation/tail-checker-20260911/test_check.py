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


def rejected(name, fn):
    try:
        fn()
    except (ValueError, TypeError, KeyError):
        passed.append(name)
    else:
        raise AssertionError('accepted: ' + name)


packet = copy.deepcopy(new.FIXED)
assert new.check(packet) == 220
index = next(i for i, r in enumerate(packet['rows']) if r['n'] == 2 and r['f_hex'] == float(4).hex())
row = packet['rows'][index]
lo, hi, _, _ = new.oracle.oracle(4., 2, 256)
den = 1 << 400
point = Q(-((-lo.numerator * den) // lo.denominator), den)
assert lo <= point <= hi and point < new.oracle.oracle(4., 2, 384)[0]
encoded = {'significand_hex': hex(point.numerator), 'exponent': -(point.denominator.bit_length() - 1)}
bad = copy.deepcopy(row)
bad['candidate_bounds'] = [encoded, encoded]
old.check(bad)
rejected('O2 point excludes truth but passes old overlap check', lambda: new.check_row(bad, index))
for key, val in [('decimal_80_digits', '0'), ('decimal_abs_error_upper', {'significand_hex':'0x0','exponent':0}),
                 ('mathematical_tail','exact-one'), ('projection_class','normal-wrong'), ('family','other')]:
    bad = copy.deepcopy(row); bad[key] = val
    old.check(bad)
    rejected('O1 ' + key, lambda: new.check_row(bad, index))
for key, val in [('n',True),('nu',4.0),('f_hex',float(1).hex()),('oracle_route','wrong'),
                 ('oracle_work',True),('round_binary64_bits','0000000000000000'),
                 ('candidate_bounds',[{'significand_hex':'0x0','exponent':0}]*2),
                 ('oracle_bounds',[{'significand_hex':'0x0','exponent':0}]*2)]:
    bad=copy.deepcopy(row);bad[key]=val
    rejected(key,lambda:new.check_row(bad,index))
for key in row:
    bad=copy.deepcopy(row);del bad[key]
    rejected('missing '+key,lambda:new.check_row(bad,index))
for label, change in [('drop',lambda p:p['rows'].pop()),('duplicate',lambda p:p['rows'].__setitem__(1,p['rows'][0])),
                       ('reorder',lambda p:p['rows'].reverse()),('counter',lambda p:p['summary'].__setitem__('cases',219)),
                       ('extra',lambda p:p.__setitem__('other',0))]:
    bad=copy.deepcopy(packet);change(bad)
    rejected(label,lambda:new.check(bad))
for interval in [[{'significand_hex':'0x1','exponent':200001}]*2,
                 [{'significand_hex':'0x1','exponent':True}]*2,
                 [{'significand_hex':'0x'+'1'*129,'exponent':0}]*2,
                 list(reversed(row['candidate_bounds']))]:
    bad=copy.deepcopy(row);bad['candidate_bounds']=interval
    rejected('interval guard',lambda:new.check_row(bad,index))
# Positive non-identical representation: doubling a significand and decrementing
# its exponent preserves the exact endpoint. No whole-file equality shortcut.
good=copy.deepcopy(packet)
for r in good['rows']:
    for key in ['candidate_bounds','oracle_bounds']:
        for end in r[key]:
            end['significand_hex']=hex(2*int(end['significand_hex'],16));end['exponent']-=1
assert new.check(good)==220
wider=copy.deepcopy(row)
for key in ['candidate_bounds','oracle_bounds']:
    wider[key][0]['significand_hex']=hex(int(wider[key][0]['significand_hex'],16)-1)
    wider[key][1]['significand_hex']=hex(int(wider[key][1]['significand_hex'],16)+1)
new.check_row(wider,index)
with tempfile.TemporaryDirectory() as tmp:
    p=Path(tmp)/'bad.json'
    for text in ['{"rows":[],"rows":[]}', '{"x":NaN}', 'x'*(new.MAX_BYTES+1)]:
        p.write_text(text)
        rejected('raw input',lambda:new.read(p))
result={'status':'author-side regression passed; independent review pending',
        'original_rows':220,'equivalent_encoding_rows':220,'valid_widened_rows':1,'rejected_mutations':len(passed),
        'rejections':passed,'old_checker_accepts_O1':5,'old_checker_accepts_O2':1,
        'python':platform.python_version(),'platform':platform.platform(),
        'O2_witness':encoded,'O2_proved_below_tighter_lower_bound':True}
Path(__file__).with_name('RESULTS.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps({k:v for k,v in result.items() if k not in ['rejections','O2_witness']}))
