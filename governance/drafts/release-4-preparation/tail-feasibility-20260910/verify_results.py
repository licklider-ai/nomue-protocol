"""Recompute oracle evidence without importing the candidate or probe."""
import copy
import json
from fractions import Fraction as Q
from pathlib import Path
from oracle import oracle, projection


def unpack(v):
    sig, e = int(v['significand_hex'],16), v['exponent']
    return Q(sig << e) if e >= 0 else Q(sig, 1 << -e)


def check(row):
    if row['nu'] != 4*(row['n']-1):
        raise ValueError('degree mismatch')
    f = float.fromhex(row['f_hex'])
    lo, hi, route, work = oracle(f,row['n'],256)
    ol, oh = map(unpack,row['oracle_bounds'])
    if not (0 <= ol <= lo <= hi <= oh <= 1):
        raise ValueError('oracle enclosure mismatch')
    code = projection((ol,oh))
    if code is None or f'{code:016x}' != row['round_binary64_bits']:
        raise ValueError('projection mismatch')
    if route != row['oracle_route'] or work != row['oracle_work']:
        raise ValueError('oracle provenance mismatch')
    dl, dh = map(unpack,row['candidate_bounds'])
    if max(dl,lo) > min(dh,hi) or projection((dl,dh)) != code:
        raise ValueError('candidate comparison mismatch')


def main():
    rows=json.loads(Path(__file__).with_name('results.json').read_text())['rows']
    for row in rows:
        check(row)
    row=next(r for r in rows if r['n']==2 and r['f_hex']==float(1).hex())
    bad=[]
    for key,value in [('nu',8),('n',3),('f_hex',float(4).hex()),
                      ('round_binary64_bits','0000000000000000'),('oracle_work',999),
                      ('oracle_route','unreceived')]:
        r=copy.deepcopy(row);r[key]=value;bad.append(r)
    r=copy.deepcopy(row)
    r['oracle_bounds']=[{'significand_hex':'0x0','exponent':0}]*2
    bad.append(r)
    for r in bad:
        try:check(r)
        except ValueError:pass
        else:raise AssertionError('mutation survived')
    print(f'{len(rows)} oracle records checked; {len(bad)} altered evidence records rejected')


if __name__=='__main__':
    main()
