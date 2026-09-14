"""G5 research candidate. No public bundle, check, schema or support issuance."""
from fractions import Fraction as Q
import hashlib
import importlib.util
import json
import math
from pathlib import Path
import re
import struct

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
BASE = '0562813a2a5b112e73a0d0f0f80160cc3bd08ce7'
B = 52969003320369754284032
COST_SHA = 'f1eb1fd866d3a48589c3e7d37b3536f700e4d5271f9a85834fa3575f034512d2'
G4DIR = HERE.parent/'t04-g4-budget-evidence-20260914'

def require(ok, message):
    if not ok:
        raise AssertionError(message)

def load(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    require(Path(module.__file__).resolve() == path, 'module origin')
    return module

require(hashlib.sha256((G4DIR/'COST-DEFINITION.json').read_bytes()).hexdigest() == COST_SHA, 'frozen cost')
g4 = load('g5_fixed_g4', G4DIR/'check_evidence.py')
gate, oracle, arithmetic = g4.subjects()
UNIT = 1 << 1074
ONE = 0x3ff0000000000000
MAX = 0x7fefffffffffffff
PREFIX = 'https://nomue.ai/id/'
REV = '/0.1.0-draft.1'
IDS = {k: PREFIX+k+'/balanced-two-factor'+REV for k in ('contract','profile','bundle')}
IDS['schema'] = PREFIX+'schema/record-balanced-two-factor'+REV
QUANTITIES = ([f'n:{i}' for i in range(4)]+['df']+[f'mean:{i}' for i in range(4)]
              +[f'{kind}:{j}' for kind in ('effect','ss') for j in ('A','B','AB')]
              +['sse']+[f'{kind}:{j}' for kind in ('f','p') for j in ('A','B','AB')])

def canonical(x):
    return (json.dumps(x, sort_keys=True, separators=(',',':'), ensure_ascii=True, allow_nan=False)+'\n').encode()

def bits(x):
    return struct.unpack('>Q', struct.pack('>d', float(x)))[0]

def number(code):
    return struct.unpack('>d', struct.pack('>Q', code))[0]

def value(code):
    return Q(*number(code).as_integer_ratio())

def pair(q):
    return [hex(q.numerator), hex(q.denominator)]

def width(q):
    return max(1, abs(q.numerator).bit_length(), q.denominator.bit_length())

def graph(cells):
    """One canonical moment graph; no projected inputs and no extra beta outputs."""
    n = len(cells[0])
    sums, squares = [], []
    for cell in cells:
        s = q = 0
        for y in cell:
            z = arithmetic.lattice(y)
            s += z
            q += z*z
        sums.append(s)
        squares.append(q)
    c = [-sums[0]-sums[1]+sums[2]+sums[3], -sums[0]+sums[1]-sums[2]+sums[3],
         sums[0]-sums[1]-sums[2]+sums[3]]
    e = n*sum(squares)-sum(s*s for s in sums)
    require(e >= 0, 'nonnegative exact SSE')
    real = ([Q(s,n*UNIT) for s in sums]
            +[Q(v,(n if j == 2 else 2*n)*UNIT) for j,v in enumerate(c)]
            +[Q(v*v,4*n*UNIT*UNIT) for v in c]+[Q(e,n*UNIT*UNIT)])
    fs = None if e == 0 else [Q((n-1)*v*v,e) for v in c]
    if fs is not None:
        real += fs
    return {'n':n,'S':sums,'Q':squares,'C':c,'E':e,'integers':[n]*4+[4*(n-1)],'real':real,'F':fs}

def project(q):
    p = arithmetic.project((q.numerator,q.denominator))
    code = None if p['nearest'] is None else bits(float.fromhex(p['nearest']))
    if code == 1 << 63:
        code = 0  # Internal projection only; received -0 is rejected by strict ingress.
    return code, p['status']

def tail(f, n):
    """Reviewed homogeneous polynomial, with linear binomial recurrence ledger."""
    a = 2*(n-1)
    aa, bb = f.numerator, f.numerator+2*a*f.denominator
    d = 1
    for j in range(a):
        d *= 2*j+1
    coefficients, choose = [], 1
    for j in range(a):
        coefficients.append((1 if j%2 == 0 else -1)*choose*(d//(2*j+1)))
        if j+1 < a:
            choose = choose*(a-1-j)//(j+1)
    h = sum(coefficients)
    acc, power = coefficients[-1], 1
    for j in range(a-2,-1,-1):
        power *= bb
        acc = acc*aa+coefficients[j]*power
    tn, td = aa*acc*acc, bb*power*power*h*h
    require(h > 0 and acc > 0 and 0 <= tn < td, 'finite positive tail invariant')
    calls = 0
    def compare(v):
        nonlocal calls
        require(0 <= v <= 1, 'bounded boundary')
        calls += 1
        u, vden = v.numerator, v.denominator
        delta = (vden-u)**2*td-vden*vden*tn
        return (delta > 0)-(delta < 0)
    low, high = 0, ONE
    while low < high:
        mid = (low+high+1)//2
        if compare(value(mid)) >= 0:
            low = mid
        else:
            high = mid-1
    equality = compare(value(low))
    midpoint = None
    if equality == 0:
        code = low
    else:
        midpoint = compare((value(low)+value(low+1))/2)
        code = low if midpoint < 0 or (midpoint == 0 and low%2 == 0) else low+1
    zero = compare(Q(1,1 << 1075))
    require(calls <= 66 and (code == 0) == (zero <= 0), 'bounded exact decision')
    return {'code':code,'T':[hex(tn),hex(td)],'floor':low,'equality_sign':equality,
            'midpoint_sign':midpoint,'zero_sign':zero,'boundary_calls':calls,
            'positive':True,'z':pair(Q(aa,bb))}

class ConformanceError(ValueError):
    pass

def shape(ok, reason):
    if not ok:
        raise ConformanceError(reason)

def keys(obj, names):
    shape(type(obj) is dict and set(obj) == set(names.split()), 'closed required members')

def local(x):
    shape(type(x) is str and 1 <= len(x) <= 256 and re.fullmatch(r'[A-Za-z0-9][A-Za-z0-9._-]*',x) is not None, 'local id')

def real(x, low=None, high=None, positive=False):
    shape(type(x) in (int,float) and math.isfinite(x) and not (x == 0 and bits(x) >> 63), 'finite nonnegative-zero token value')
    shape((low is None or x >= low) and (high is None or x <= high) and (not positive or x > 0), 'numeric range')

def integer(x, lo, hi):
    real(x,lo,hi)
    shape(x == int(x), 'integer')

def uri(x):
    shape(type(x) is str and 3 <= len(x) <= 2048 and re.fullmatch(r'[A-Za-z][A-Za-z0-9+.-]*:[^\s]+',x) is not None, 'URI')

def associate(record):
    """Candidate RFC validation after existing strict ingress, not registered schema."""
    keys(record,'$schema record_type record_id revision_id created_at interpretation_bundle_id profile_id payload integrity')
    shape(record['$schema'] == IDS['schema'] and record['record_type'] == 'nomue-record'
          and record['interpretation_bundle_id'] == IDS['bundle'] and record['profile_id'] == IDS['profile'], 'exact candidate routing')
    integrity = record['integrity']
    keys(integrity,'canonicalization_id digest_algorithm digest_scope content_digest')
    shape(integrity['canonicalization_id'] == 'urn:nomue:canonicalization:jcs:0.2.0-draft.1'
          and integrity['digest_algorithm'] == 'sha-256' and integrity['digest_scope'] == 'record_without_integrity'
          and re.fullmatch(r'sha256:[0-9a-f]{64}',integrity['content_digest']) is not None, 'integrity shape')
    p = record['payload']
    keys(p,'dataset design analysis result')
    ds, design, analysis, result = (p[k] for k in ('dataset','design','analysis','result'))
    keys(ds,'dataset_id observations')
    keys(design,'design_id dataset_id factor_order factors cells model_applicability_declared')
    keys(analysis,'analysis_id design_id contract_id')
    keys(result,'result_id analysis_id cell_summaries residual_sum_of_squares residual_degrees_of_freedom contrasts')
    for obj, fields in ((ds,('dataset_id',)),(design,('design_id','dataset_id')),
                        (analysis,('analysis_id','design_id')),(result,('result_id','analysis_id'))):
        for k in fields:
            local(obj[k])
    shape(design['dataset_id'] == ds['dataset_id'] and analysis['design_id'] == design['design_id']
          and result['analysis_id'] == analysis['analysis_id'] and analysis['contract_id'] == IDS['contract'], 'references')
    shape(type(design['model_applicability_declared']) is bool, 'required model boolean')
    order, factors = design['factor_order'], design['factors']
    shape(type(order) is list and len(order) == 2 and type(factors) is list and len(factors) == 2, 'two factors')
    for x in order:
        local(x)
    shape(len(set(order)) == 2, 'distinct factors')
    levels = {}
    for f in factors:
        keys(f,'factor_id level_order')
        local(f['factor_id'])
        v = f['level_order']
        shape(type(v) is list and len(v) == 2, 'two levels')
        for x in v:
            local(x)
        shape(v[0] != v[1] and f['factor_id'] not in levels, 'distinct factor/levels')
        levels[f['factor_id']] = v
    shape(set(levels) == set(order), 'factor ordering references')
    tuples = [(x,y) for x in levels[order[0]] for y in levels[order[1]]]
    shape(type(design['cells']) is list and len(design['cells']) == 4, 'four cells')
    cellmap, tuplemap = {}, {}
    for c in design['cells']:
        keys(c,'cell_id levels')
        local(c['cell_id'])
        shape(type(c['levels']) is list and len(c['levels']) == 2, 'cell level tuple')
        for x in c['levels']:
            local(x)
        t = tuple(c['levels'])
        shape(t in tuples and t not in tuplemap and c['cell_id'] not in cellmap, 'Cartesian cell cover')
        cellmap[c['cell_id']] = tuples.index(t)
        tuplemap[t] = c['cell_id']
    canonical_ids = [tuplemap[t] for t in tuples]
    observations = ds['observations']
    shape(type(observations) is list, 'observations array')
    cells, observation_ids, units = [[] for _ in range(4)], [], []
    for obs in observations:
        keys(obs,'observation_id experimental_unit_id cell_id outcome_value')
        for k in ('observation_id','experimental_unit_id','cell_id'):
            local(obs[k])
        shape(obs['cell_id'] in cellmap, 'observation reference')
        observation_ids.append(obs['observation_id'])
        units.append(obs['experimental_unit_id'])
        real(obs['outcome_value'])
        cells[cellmap[obs['cell_id']]].append(float(obs['outcome_value']))
    ordered_ids = sorted(observation_ids)
    shape(all(a != b for a,b in zip(ordered_ids,ordered_ids[1:])), 'unique observation identities')
    shape(type(result['cell_summaries']) is list and len(result['cell_summaries']) == 4, 'four summaries')
    summaries = {}
    for s in result['cell_summaries']:
        keys(s,'cell_id n mean')
        local(s['cell_id'])
        shape(s['cell_id'] in cellmap and s['cell_id'] not in summaries, 'summary association')
        integer(s['n'],2,(1 << 51)-1)
        real(s['mean'])
        summaries[s['cell_id']] = s
    contrasts = {}
    shape(type(result['contrasts']) is list and len(result['contrasts']) == 3, 'three contrasts')
    for c in result['contrasts']:
        keys(c,'kind signed_estimate sum_of_squares f_statistic p_value')
        shape(c['kind'] in ('A','B','AB') and c['kind'] not in contrasts, 'contrast kinds')
        real(c['signed_estimate'])
        real(c['sum_of_squares'],0)
        real(c['f_statistic'],0)
        real(c['p_value'],0,1)
        contrasts[c['kind']] = c
    real(result['residual_sum_of_squares'],positive=True)
    integer(result['residual_degrees_of_freedom'],4,9007199254740984)
    declared = ([int(summaries[c]['n']) for c in canonical_ids]+[int(result['residual_degrees_of_freedom'])]
                +[summaries[c]['mean'] for c in canonical_ids]
                +[contrasts[c][field] for field in ('signed_estimate','sum_of_squares') for c in ('A','B','AB')]
                +[result['residual_sum_of_squares']]
                +[contrasts[c][field] for field in ('f_statistic','p_value') for c in ('A','B','AB')])
    return cells, declared, units, canonical_ids

def aggregate(states, invocation_ok=True):
    if not invocation_ok:
        return 'execution error/refusal'
    if 'not_run' in states:
        return 'not_run'
    if 'fail' in states:
        return 'completed/fail'
    if 'indeterminate' in states:
        return 'completed/indeterminate'
    require(len(states) == 22 and set(states) == {'pass'}, 'all mandatory comparisons')
    return 'completed/pass'

def run(record, integrity_ok, envelope_ok, fault=None, unresolved=(), budget=B):
    """Internal parsed transport only. fault/unresolved/budget overrides are test controls."""
    out = {'candidate_identity':candidate_identity(),'recomputation':'not_run','gate':None,'cost':None,'membership':False,
           'integrity':'pass' if integrity_ok else 'fail','quantities':[
               {'identity':q,'outcome':'not_run','reason':'prerequisite','dependency':'pending'} for q in QUANTITIES]}
    def refused(category, reason):
        out['gate'] = category
        if category == 'execution error/refusal':
            out['membership'] = None
        out['reason'] = reason
        for row in out['quantities']:
            row['dependency'] = category
        return out
    if not envelope_ok:
        out['integrity'] = 'not_run'
        return refused('conformance fail','existing envelope constraints with candidate identities')
    try:
        cells, declared, units, ids = associate(record)
    except (ConformanceError,KeyError,TypeError,OverflowError) as error:
        out['integrity'] = 'not_run'
        return refused('conformance fail',str(error))
    out['scope'] = {'kind':'result','id':record['payload']['result']['result_id'],'cell_order':ids}
    counts = [len(c) for c in cells]
    if any(a == b for a,b in zip(sorted(units),sorted(units)[1:])) or len(set(counts)) != 1 or not 2 <= counts[0] <= (1 << 51)-1:
        return refused('admissibility fail','independent units and balanced repeated cells')
    if not record['payload']['design']['model_applicability_declared']:
        return refused('admissibility fail','model declaration false')
    n = counts[0]
    if fault == 'predicate':
        return refused('execution error/refusal','predicate evaluation failure; not predicate=false')
    preliminary = g4.fixed_cost(n,[1]*3)
    if preliminary['components']['preflight_and_non_tail'] > budget:
        return refused('supported-domain refusal','Cpre exceeds B before exact graph')
    x = graph(cells)
    if x['E'] == 0:
        return refused('computability fail','exact SSE zero; recomputation prerequisite false; F and p undefined')
    widths = [width(f) for f in x['F']]
    cost = g4.fixed_cost(n,widths)
    out['cost'] = cost['total']
    out['widths'] = widths
    if cost['total'] > budget:
        return refused('supported-domain refusal','full fixed cost exceeds B')
    codes_and_reasons = [project(q) for q in x['real']]
    codes = [v[0] for v in codes_and_reasons]
    if None in codes:
        return refused('representation refusal','D04 exact magnitude exceeds MAX_FINITE')
    if codes[10] == 0:
        return refused('representation refusal','positive exact SSE projects zero')
    tails = [tail(f,n) for f in x['F']]
    out['tail_eligibility'] = [{'code':t['code'],'positive':True,'zero_sign':t['zero_sign']} for t in tails]
    if any(t['zero_sign'] <= 0 for t in tails):
        return refused('representation refusal','positive tail underflow; not exact p=0 or declared mismatch')
    out['membership'] = True
    out['gate'] = 'eligible'
    target_codes = x['integers']+codes+[t['code'] for t in tails]
    for i, row in enumerate(out['quantities']):
        if fault in ('timeout','crash','resource','malformed') and i == 7:
            # Simulated invocation failures only, not a supervisor/EC3 test.
            out['quantities'] = []
            out['recomputation'] = 'execution error/refusal'
            out['gate'] = 'execution error/refusal'
            out['reason'] = 'simulated '+fault+'; completed partial quantities suppressed'
            return out
        dec = declared[i] if i < 5 else bits(declared[i])
        row.update({'declared':dec,'projected':target_codes[i],'dependency':'satisfied',
                    'outcome':'pass' if dec == target_codes[i] else 'fail',
                    'reason':'strict equality' if dec == target_codes[i] else 'declared-result mismatch'})
        if i < 5:
            row['exact_integer'] = target_codes[i]
        elif i < 19:
            row['exact'] = pair(x['real'][i-5])
            row['projection_reason'] = codes_and_reasons[i-5][1]
        else:
            row['tail'] = tails[i-19]
            row['exact_F_dependency'] = 16+(i-19)
            row['df_dependency'] = 4
        if i in unresolved:
            # Sound singleton numerical result is not changed in the actual S-C path.
            row['outcome'] = 'indeterminate'
            row['reason'] = 'synthetic normally-completed unresolved control'
            row.pop('projected',None)
    out['recomputation'] = aggregate([q['outcome'] for q in out['quantities']])
    out['evidence_bits_bound'] = cost['evidence_bits_bound']
    compact = compact_evidence(out,max([cost['K0']]+cost['Kx']))
    out['compact_evidence_bits'] = len(compact)*8
    out['compact_evidence_sha256'] = hashlib.sha256(compact).hexdigest()
    require(len(compact)*8 <= cost['evidence_bits_bound'], 'constructed compact evidence bound')
    # JSON is an author rendering; fixed compact tuple witness is defined in REPORT.
    out['rendered_evidence_bits'] = len(canonical(out['quantities']))*8
    require(out['rendered_evidence_bits'] <= cost['evidence_bits_bound'], 'sample evidence rendering bound')
    return out

def compact_evidence(out, k):
    """Research witness encoding only; no public schema or protocol identifier.

    Fixed order carries quantity identity; header maps cell ordinals to local IDs.
    Tags: state pass/fail/indeterminate; reason equal/mismatch/unresolved; dependency.
    At most four signed K-bit components per row (T and z, or one exact rational).
    A separate record context and candidate content identity bind this witness.
    """
    data = bytearray(bytes.fromhex(out['candidate_identity']))
    for text in [out['scope']['id']]+out['scope']['cell_order']:
        raw = text.encode('ascii')
        require(len(raw) <= 256,'bounded identity')
        data.extend(len(raw).to_bytes(2,'big'))
        data.extend(raw)
    size = (k+7)//8
    for i,row in enumerate(out['quantities']):
        state = {'pass':0,'fail':1,'indeterminate':2}[row['outcome']]
        data.extend(bytes([i,state,state,1]))
        data.extend(row['declared'].to_bytes(8,'big'))
        data.extend(row.get('projected',0).to_bytes(8,'big'))
        data.extend(bytes([int('projected' in row)]))
        if 'tail' in row:
            t = row['tail']
            components = t['T']+t['z']
            data.extend(t['floor'].to_bytes(8,'big'))
            data.extend(bytes([t['equality_sign']+1, 3 if t['midpoint_sign'] is None else t['midpoint_sign']+1,
                               t['zero_sign']+1,row['exact_F_dependency'],row['df_dependency']]))
        elif 'exact' in row:
            components = row['exact']
        else:
            components = [hex(row['exact_integer'])]
        data.extend(bytes([len(components)]))
        for text in components:
            v = int(text,16)
            require(abs(v).bit_length() <= k,'witness component envelope')
            data.extend(bytes([int(v < 0)]))
            data.extend(abs(v).to_bytes(size,'big'))
    return bytes(data)

def candidate_identity():
    parts = {'input_commit':BASE,'B':str(B),'cost_definition_sha256':COST_SHA,
             'input_manifest_sha256':hashlib.sha256((HERE/'INPUTS.json').read_bytes()).hexdigest(),
             'sources':{name:hashlib.sha256((HERE/name).read_bytes()).hexdigest()
                        for name in ('procedure.py','strict-ingress.ts','REPORT.md')}}
    return hashlib.sha256(canonical(parts)).hexdigest()
