import pathlib,json,copy,hashlib
root=pathlib.Path(__file__).resolve().parents[4]; p=pathlib.Path(__file__).resolve().parent
# Abort if template/runtime input bytes differ from the recorded base.
import subprocess
BASE='6116ea1e4ff21c312a904ccf461f59554819c848'
source_paths=['schemas/common/identifier.schema.json','governance/drafts/release-3-preparation/holm-record-surface-20260911/record-body.schema.json','reference/verifier/src/strict-json.ts','reference/verifier/src/jcs.ts']
source_paths += ['governance/drafts/release-3-preparation/holm-declaration-binding-experiment-20260911/'+f for f in ['bridge.mjs','d0.mjs','candidate.py','worker.py','candidate.schema.json','fixture-contracts.json','INPUTS.json']]
for name in source_paths:
    pinned=subprocess.check_output(['git','show',BASE+':'+name],cwd=root)
    if (root/name).read_bytes()!=pinned: raise SystemExit('Source differs from recorded base: '+name)
s=json.loads((p.parent/'holm-record-surface-20260911/record-body.schema.json').read_text()); ids=json.loads((root/'schemas/common/identifier.schema.json').read_text())['$defs']
base='https://example.invalid/nomue-exercise/'
names={k:base+'holm-'+k+'/v1' for k in ['record','bundle','profile','report','refusal']}
stages=['integrity','context','declaration','admission','arithmetic']
names['checks']={k:base+'holm-check-'+k+'/v1' for k in stages}
obj=lambda props:{'type':'object','additionalProperties':False,'required':list(props),'properties':props}
string={'type':'string','minLength':1,'maxLength':256}
inputs=copy.deepcopy(s['properties']['inputs']); inputs['required'].remove('revision');del inputs['properties']['revision'];inputs['properties']['kind']={'const':'unissued-holm-envelope-input-v1'}
payload=obj({'declaration':s['properties']['declaration'],'inputs':inputs,'result':s['properties']['result']})
integrity=obj({'canonicalization_id':{'const':'urn:nomue:canonicalization:jcs:0.2.0-draft.1'},'digest_algorithm':{'const':'sha-256'},'digest_scope':{'const':'record_without_integrity'},'content_digest':ids['sha256Digest']})
record=obj({'$schema':{'const':names['record']},'record_type':{'const':'nomue-record'},'record_id':ids['uri'],'revision_id':ids['uri'],'created_at':ids['rfc3339UtcZ'],'interpretation_bundle_id':{'const':names['bundle']},'profile_id':{'const':names['profile']},'payload':payload,'integrity':integrity});record['$defs']=s['$defs']
expected=obj({'record_id':ids['uri'],'revision_id':ids['uri'],'declaration':s['properties']['declaration'],'inputs':inputs});expected['$defs']=s['$defs']
reason={'type':'string','pattern':'^[a-z][a-z0-9_]*$','maxLength':96}
reasonlist={'type':'array','items':reason,'uniqueItems':True,'maxItems':64}
detail=obj({'source_stage':{'type':['string','null'],'maxLength':64},'codes':{'type':'array','items':string,'uniqueItems':True,'maxItems':64},'bridge_reason':{'type':['string','null'],'maxLength':256}})
scope=obj({'record_id':ids['uri'],'revision_id':ids['uri'],'analysis_id':s['properties']['result']['properties']['analysis_id'],'family_id':s['properties']['result']['properties']['family_id'],'result_id':s['properties']['result']['properties']['result_id']})
check=obj({'stage':{'enum':stages},'check_ref':{'enum':list(names['checks'].values())},'scope':scope,'execution':{'enum':['completed','not_run','error']},'reasons':reasonlist})
check['properties'].update({'outcome':{'enum':['pass','fail']},'details':detail,'error':obj({'error_type':string,'message':{'type':'string','minLength':1,'maxLength':512}})})
check['allOf']=[{'if':{'properties':{'execution':{'const':'completed'}}},'then':{'required':['outcome'],'not':{'required':['error']}},'else':{'not':{'required':['outcome']},'properties':{'reasons':{'minItems':1}}}}, {'if':{'properties':{'execution':{'const':'error'}}},'then':{'required':['error']},'else':{'not':{'required':['error']}}}, {'if':{'properties':{'outcome':{'const':'fail'}},'required':['outcome']},'then':{'properties':{'reasons':{'minItems':1}}}}, {'if':{'properties':{'outcome':{'const':'pass'}},'required':['outcome']},'then':{'properties':{'reasons':{'maxItems':0}}}}]
checks={'type':'array','minItems':5,'maxItems':5,'prefixItems':[{'allOf':[{'$ref':'#/$defs/check'},{'properties':{'stage':{'const':k},'check_ref':{'const':names['checks'][k]}}}]}for k in stages]}
gb=obj({k:{'const':'not_asserted'} for k in ['scientific_validity','declaration_truth','distributional_model_validity','causal_interpretation','standardized_effect_size','familywise_error_control','source_authenticity']});gb['properties']['p_generation']={'const':'outside_scope'};gb['required'].append('p_generation')
report=obj({'kind':{'const':names['report']},'record_reference':obj({'record_id':ids['uri'],'revision_id':ids['uri'],'content_digest':ids['sha256Digest']}),'interpretation_bundle_id':{'const':names['bundle']},'verifier':obj({'name':{'const':'holm-envelope-exercise'},'version':{'const':'unissued-v1'},'source_digest':ids['sha256Digest']}),'generated_at':ids['rfc3339UtcZ'],'checks':checks,'guarantee_boundary':gb});report['$defs']={'check':check}
refusal=obj({'kind':{'const':names['refusal']},'stage':{'enum':['setup','raw','parsed','routing','schema','storage','expected_context','binding','reporting']},'refusal_kind':{'enum':['internal_error','parse_error','resource_limit','routing_error','unsupported_bundle','schema_error','canonicalization_failure','noncanonical_storage','expected_context_error']},'reason':reason});refusal['properties']['details']=detail
for name,v in [('record.schema.json',record),('expected.schema.json',expected),('report.schema.json',report),('refusal.schema.json',refusal)]:
 v['$schema']='https://json-schema.org/draft/2020-12/schema'; v['$comment']='Unissued research exercise. example.invalid identities are fixture sentinels, not allocated Protocol identifiers.';(p/name).write_text(json.dumps(v,indent=2)+'\n')
(p/'identities.json').write_text(json.dumps(names,indent=2)+'\n')
old=p.parent/'holm-declaration-binding-experiment-20260911'; fs=['bridge.mjs','d0.mjs','candidate.py','worker.py','candidate.schema.json','fixture-contracts.json','INPUTS.json']
paths=[str((old/f).relative_to(root)) for f in fs]+['reference/verifier/src/strict-json.ts','reference/verifier/src/jcs.ts']
(p/'INPUTS.json').write_text(json.dumps({'base_commit':'6116ea1e4ff21c312a904ccf461f59554819c848','reviewed_body_head':'b0cfe157c22a868c2b45331b5fdbfebea2487bd0','status':'unissued full-envelope experiment; existing source and numerical reviews reused','runtime':[{'path':x,'sha256':hashlib.sha256((root/x).read_bytes()).hexdigest()}for x in paths]},indent=2)+'\n')

# Exercise diagnostics are locally versioned proposal vocabulary, not public IDs.
diag=json.loads((p/'diagnostics.json').read_text())
for name,keys in [('refusal.schema.json',list(diag['refusals'])),('report.schema.json',['prerequisite_failed']+sum(diag['checks'].values(),[]))]:
    target=p/name; data=json.loads(target.read_text())
    if name.startswith('refusal'): data['properties']['reason']['enum']=keys
    else: data['$defs']['check']['properties']['reasons']['items']['enum']=keys
    target.write_text(json.dumps(data,indent=2)+'\n')
