"""Bounded author applicability check, not independent scientific review.
Run from repository root; reads the fixed Holm source from Git without modifying it.
"""
from fractions import Fraction
import hashlib
import json
import subprocess

COMMIT = 'c4ad231471deba354bd018550b2378f2d740b944'
PATH = 'governance/drafts/release-3-preparation/holm-experiment-20260911/candidate.py'
source = subprocess.check_output(['git', 'show', f'{COMMIT}:{PATH}'])
# Trusted repository source, not Record-supplied code.
module = {'__name__': 'pinned_holm_author_check'}
exec(compile(source, PATH, 'exec'), module)
patterns = [0, 1, (1 << 52)-1, 1 << 52, (1023 << 52)-1, 1023 << 52]
checked = 0
for bits in patterns:
    exponent, trailing = (bits >> 52) & 2047, bits & ((1 << 52)-1)
    exact = (Fraction(trailing) * Fraction(2)**-1074 if exponent == 0
             else (1 + Fraction(trailing, 1 << 52)) * Fraction(2)**(exponent-1023))
    raw = bits.to_bytes(8, 'big')
    if Fraction(module['decode'](raw), 1 << 1074) != exact:
        raise ValueError('source field mapping')
    if module['project'](int(exact*(1 << 1074))) != raw:
        raise ValueError('exact boundary projection')
    checked += 1
try:
    module['decode']((1 << 63).to_bytes(8, 'big'))
except ValueError as error:
    if str(error) != 'p domain':
        raise
else:
    raise ValueError('negative zero policy mismatch')
if Fraction(0.05) == Fraction(1, 20):
    raise ValueError('alpha distinction')
print(json.dumps({'commit': COMMIT, 'source_sha256': hashlib.sha256(source).hexdigest(),
                  'field_boundaries': checked, 'negative_zero_policy': 'explicit refusal',
                  'binary64_005_differs_from_one_twentieth': True}, indent=2))
