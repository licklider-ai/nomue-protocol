"""UNISSUED CANDIDATE. Compare semantic delivery with frozen expectations."""
import struct

def encode(v,i):
    return str(int(v)) if i<5 else str(struct.unpack('>Q',struct.pack('>d',0.0 if v==0 else float(v)))[0])

def exit_code(out):
    if out['execution']!='completed':return {'internal_error':5,'resource_limit':4,'unsupported_bundle':3}.get(out['refusal']['refusal_kind'],2)
    cs=[out['report']['conformance']]+out['report']['verification_results']
    return 2 if any(c.get('outcome')=='fail' for c in cs) else 6 if any(c.get('outcome')=='indeterminate' for c in cs) else 3 if any(c['execution']!='completed' for c in cs) else 0

def semantic(f,out):
    if 'required_reason_codes' in f['expected']:
        r=out.get('refusal',{});e=f['expected']
        return dict(execution=out['execution'],refusal_kind=r.get('refusal_kind'),output_type=r.get('output_type'),schema=r.get('$schema'),
          required_reason_codes=[c for c in e['required_reason_codes'] if c in r.get('reason_codes',[])],report_present='report' in out,
          external_check_results_present=any(k in x for x in (out,r) for k in ('conformance','verification_results','quantity_evidence')),exit_code=exit_code(out))
    if out['execution']!='completed':return dict(execution=out['execution'],reason=out.get('refusal',{}).get('reason_codes',[None])[0])
    p=out['report'];qs=[]
    for i,q in enumerate(p.get('quantity_evidence',{}).get('quantity_results',[])):
        ident={k:q[k] for k in ('quantity','cell_id','contrast_kind') if k in q}
        qs.append(dict(identity=ident,expected_code=encode(q['recomputed'],i),outcome=q['outcome'],reason=(q['reason_codes'] or [None])[0]))
    e=dict(execution='completed',conformance=p['conformance']['outcome'],profile_eligibility=p['profile_eligibility'],
      checks=['completed/'+c['outcome'] if c['execution']=='completed' else c['execution'] for c in p['verification_results']],
      reasons=[c['reason_codes'] for c in p['verification_results']],quantities=qs)
    if e['conformance']=='fail':e['conformance_reason']=p['conformance']['reason_codes'][0]
    return e
