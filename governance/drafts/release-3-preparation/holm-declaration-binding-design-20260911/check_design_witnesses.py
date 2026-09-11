"""Reviewer-side design witnesses: exact Holm vectors and document-budget sizing. No bridge is run."""
from fractions import Fraction as Q
from struct import pack
import json

U = 1 << 1074


def require(condition, message):
    if not condition:
        raise ValueError(message)


def holm(values):
    """Ordinary Holm on the 2^-1074 lattice, independent of the pinned candidate code."""
    lattice = [int(p * U) for p in values]
    require(all(Q(a, U) == p for a, p in zip(lattice, values)), 'dyadic inputs')
    m = len(lattice)
    order = sorted(range(m), key=lambda i: (lattice[i], i))
    adjusted, running = [0] * m, 0
    for rank, i in enumerate(order, 1):
        running = max(running, (m - rank + 1) * lattice[i])
        adjusted[i] = min(U, running)
    return adjusted


def display(a):
    return pack('>d', float(Q(a, U))).hex()


def encoding(p):
    return pack('>d', float(p)).hex()


def count_nodes(value):
    """Count container/scalar values, not object keys, iteratively."""
    stack, count = [value], 0
    while stack:
        value = stack.pop()
        count += 1
        if type(value) is dict: stack.extend(value.values())
        elif type(value) is list: stack.extend(value)
    return count


def maximal_document():
    # Materialize actual counts; a per-object estimate omitted growing population
    # reference arrays and units. The template is an already pinned source.
    import copy
    import hashlib
    import itertools
    import subprocess
    from pathlib import Path
    pins = json.loads((Path(__file__).parent / 'INPUTS.json').read_text())['inputs']
    pin = next(x for x in pins if x['path'].endswith('/declaration-surface-20260910/example.json'))
    raw = subprocess.check_output(['git', 'show', pin['commit'] + ':' + pin['path']])
    require(hashlib.sha256(raw).hexdigest() == pin['sha256'], 'example pin')
    d = json.loads(raw)  # Trusted hash-pinned fixture, not external verifier ingress.
    analysis, family, slot = (copy.deepcopy(d[k][4]) for k in ('analyses','families','result_slots'))
    d['design']['groups'] = [{'group_id': 'g-'+str(i)} for i in range(16)]
    d['design']['units'] = [{'experimental_unit_id':'u-'+str(i), 'group_id':'g-'+str(i%16)} for i in range(1024)]
    d['dataset']['observations'] = [{'observation_id':'o-'+str(i), 'experimental_unit_id':'u-'+str(i),
                                    'group_id':'g-'+str(i%16), 'value':float(i)} for i in range(1024)]
    member = copy.deepcopy(family['members'][0])
    family['members'] = []
    for j,(a,b) in enumerate(itertools.combinations(range(16),2)):
        m = copy.deepcopy(member)
        m.update(member_id='m-'+str(j),minuend_group_id='g-'+str(a),subtrahend_group_id='g-'+str(b))
        family['members'].append(m)
    analysis['population']['observation_ids'] = [x['observation_id'] for x in d['dataset']['observations']]
    slot['member_ids'] = [x['member_id'] for x in family['members']]
    d['analyses'],d['families'],d['result_slots'] = [],[],[]
    for i in range(16):
        a,f,r = copy.deepcopy(analysis),copy.deepcopy(family),copy.deepcopy(slot)
        a.update(analysis_id='a-'+str(i),family_id='f-'+str(i))
        f.update(analysis_id=a['analysis_id'],family_id=a['family_id'])
        r.update(analysis_id=a['analysis_id'],family_id=a['family_id'],result_id='r-'+str(i))
        d['analyses'].append(a);d['families'].append(f);d['result_slots'].append(r)
    return d


def main():
    supplied = [Q(1, 64), Q(1, 32), Q(1, 8)]
    require([encoding(p) for p in supplied] == ['3f90000000000000', '3fa0000000000000', '3fc0000000000000'], 'input encodings')
    adjusted = holm(supplied)
    require(adjusted == [3 << 1068, 1 << 1070, 1 << 1071], 'three-member lattice values')
    require([display(a) for a in adjusted] == ['3fa8000000000000', '3fb0000000000000', '3fc0000000000000'], 'three-member displays')
    x = Q(1, 4) + Q(3, 1 << 54)
    require(encoding(x) == '3fd0000000000003', 'collision input encoding')
    a = holm([x, Q(3, 4), Q(1)])
    b = int((Q(3, 4) + Q(8, 1 << 54)) * U)
    require(Q(a[0], U) == Q(3, 4) + Q(9, 1 << 54) and a[1:] == [U, U], 'collision adjusted values')
    require(a[0] != b and display(a[0]) == display(b) == '3fe8000000000004', 'same display, different exact value')
    require(len(format(U, 'x')) == 269, 'adjusted_hex width')
    d0 = count_nodes(maximal_document())
    # These separate caps are conjunctive, not a promise to admit simultaneous
    # maxima. Keep the proposed resource scope rather than silently raising it.
    require(d0 > 24576, 'all-count-max witness must exceed D0 node budget')
    sidecar_cap = 2048
    # Adjusted array: one array node plus 120 row objects with three scalars.
    # Envelope: root, kind scalar and binding object, plus embedded values.
    submitted_bound = 24576 + sidecar_cap + (1 + 120*4) + 3
    require(submitted_bound <= 28672, 'all admitted embedded values fit submitted node cap')
    print(json.dumps({'three_member_displays': [display(v) for v in adjusted],
                      'collision_display': display(a[0]), 'adjusted_hex_digits': 269,
                      'node_counts': {'all_count_max_d0': d0, 'd0_cap': 24576, 'sidecar_cap': sidecar_cap, 'submitted_upper_bound': submitted_bound, 'submitted_cap': 28672}}, indent=2))


if __name__ == '__main__':
    main()
