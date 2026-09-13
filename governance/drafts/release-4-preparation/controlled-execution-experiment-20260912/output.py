"""Closed internal result grammar; no second numerical implementation or public schema."""
import hashlib
import json
import re

AXES = ('A', 'B', 'AB')
INTEGER = re.compile(r'-?0x(?:0|[1-9a-f][0-9a-f]*)\Z')
FLOAT = re.compile(r'-?0x[01]\.[0-9a-f]+p[+-][0-9]+\Z')


def need(ok):
    if not ok:
        raise ValueError('invalid worker outcome')


def keys(value, names):
    need(type(value) is dict and set(value) == set(names))


def integer(value, positive=False):
    need(type(value) is str and len(value) <= 65540 and INTEGER.fullmatch(value) is not None)
    need(value != '-0x0')
    if positive:
        need(not value.startswith('-') and value != '0x0')


def rational(value):
    need(type(value) is list and len(value) == 2)
    integer(value[0]); integer(value[1], positive=True)


def validate(outcome, payload):
    request = json.loads(payload)  # encode()'s trusted transport, not Record JSON.
    state = outcome['state']
    if state == 'refused':
        need(set(outcome) in ({'state','stage','reason'}, {'state','stage','quantity','reason'}))
        need(type(outcome['reason']) is str and 1 <= len(outcome['reason']) <= 128)
        stage = outcome['stage']
        need((type(stage) is int and 1 <= stage <= 6) or (type(stage) is str and stage == 'evidence'))
        if 'quantity' in outcome:
            need(type(outcome['quantity']) is str and 1 <= len(outcome['quantity']) <= 32)
        return
    if state == 'unresolved':
        keys(outcome, ('state','reason'))
        need(outcome['reason'] == 'probability_projection')
        return
    need(state == 'completed')
    keys(outcome, ('state','result'))
    result = outcome['result']
    source = ['r4-complete-output-experiment-v1', request['revision'],
              ['A0B0','A0B1','A1B0','A1B1'], request['cells']]
    identity = {'revision':request['revision'], 'digest':hashlib.sha256(
        json.dumps(source,separators=(',', ':'),ensure_ascii=True).encode()).hexdigest()}
    need(type(result) is dict and result.get('identity') == identity)
    if 'submitted' in request:
        keys(result, ('outcome','identity','contrasts','scientific_validity'))
        need(result['outcome'] == 'probability_evidence_consistent_experiment')
        need(result['contrasts'] == list(AXES) and result['scientific_validity'] == 'not_asserted')
        return
    keys(result, ('outcome','identity','df','exact','displays','tails'))
    need(result['outcome'] == 'complete_experiment')
    keys(result['df'], AXES); keys(result['tails'], AXES)
    keys(result['exact'], ('estimates','ss','sse','f'))
    keys(result['displays'], ('estimates','ss','sse','f'))
    for name, count in (('estimates',3), ('ss',3), ('sse',1), ('f',3)):
        exact, displays = result['exact'][name], result['displays'][name]
        need(type(exact) is list and len(exact) == count and type(displays) is list and len(displays) == count)
        for pair in exact:
            rational(pair)
        for display in displays:
            keys(display, ('lower','upper','nearest','status'))
            need(display['status'] in ('exact_zero','exactly_representable','rounded','nonzero_rounds_to_zero'))
            for key in ('lower','upper','nearest'):
                need(type(display[key]) is str and len(display[key]) <= 32 and FLOAT.fullmatch(display[key]) is not None)
    for axis in AXES:
        need(result['df'][axis] == ['0x1', hex(4*(len(request['cells'][0])-1))])
        tail = result['tails'][axis]
        keys(tail, ('bounds','encoding','bits'))
        need(tail['bits'] in ('0x80','0x100','0x200'))
        integer(tail['encoding'])
        need(0 <= int(tail['encoding'],16) <= 0x3ff0000000000000)
        need(type(tail['bounds']) is list and len(tail['bounds']) == 2)
        for bound in tail['bounds']:
            keys(bound, ('rational',)); rational(bound['rational'])
