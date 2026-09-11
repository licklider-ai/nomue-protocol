"""Independent file transport and refusal-priority controls; no numerical oracle claim."""
import argparse, base64, copy, hashlib, json, os, shutil, subprocess, sys, tempfile, time
from pathlib import Path
p=argparse.ArgumentParser(); p.add_argument('repository'); p.add_argument('--output',required=True); a=p.parse_args(); root=Path(a.repository).resolve()
e=root/'governance/drafts/release-3-preparation/holm-envelope-experiment-20260911'; c=e.parent/'holm-controlled-execution-20260911'; rows=[]
def canonical(v): return json.dumps(v,sort_keys=True,separators=(',',':'),ensure_ascii=False).encode()
def sealed(v):
    v=copy.deepcopy(v); integrity=v.pop('integrity'); digest=hashlib.sha256(b'nomue/record-content/v1\n'+canonical(v)).hexdigest(); v['integrity']={**integrity,'content_digest':'sha256:'+digest}; return canonical(v)
record=json.loads((e/'example-record.jcs').read_bytes()); expected=json.loads((e/'example-expected.json').read_bytes())
with tempfile.TemporaryDirectory() as td:
 t=Path(td); rp=t/'record'; ep=t/'expected'; absent=t/'absent'
 def run(rb,eb,path=None):
    rp.write_bytes(rb)
    if eb is not None: ep.write_bytes(eb)
    start=time.monotonic(); r=subprocess.run([shutil.which('node'),str(c/'entry.mjs'),str(rp),str(path or ep)],cwd=root,env={'PATH':'/usr/bin:/bin','TMPDIR':td,'NOMUE_EXPERIMENT_PYTHON':sys.executable},capture_output=True,timeout=30)
    return r,time.monotonic()-start
 def control(name,rb,eb,reason=None,stage=None,exitcode=0,path=None,forward=False):
    try:
     r,elapsed=run(rb,eb,path); assert r.returncode==exitcode,(r.returncode,r.stderr)
     if exitcode: assert not r.stdout
     else:
      out=json.loads(r.stdout); val=out['output']; assert not r.stderr
      if reason: assert val.get('reason')==reason,val
      if stage: assert next(x for x in val['checks'] if x['stage']==stage)['outcome']=='fail',val
      assert ('verified_record_base64' in out)==forward
      if forward: assert base64.b64decode(out['verified_record_base64'])==rb
     rows.append({'name':name,'passed':True,'elapsed_seconds':elapsed,'exit':r.returncode,'reason':reason,'failed_stage':stage,'forwarded':forward})
    except Exception as ex: rows.append({'name':name,'passed':False,'error':repr(ex)})
 rb=(e/'example-record.jcs').read_bytes(); eb=(e/'example-expected.json').read_bytes()
 control('baseline original bytes',rb,eb,forward=True)
 control('raw duplicate before missing expected',b'{"x":1,"x":2}',None,reason='record_duplicate_member',path=absent)
 control('raw UTF8 before missing expected',b'\xff',None,reason='record_utf8',path=absent)
 v=copy.deepcopy(record); v.pop('interpretation_bundle_id'); control('routing before missing expected',canonical(v),None,reason='bundle_missing',path=absent)
 v=copy.deepcopy(record); v['extra']='x'; control('schema before missing expected',canonical(v),None,reason='record_schema',path=absent)
 control('storage before missing expected',b' '+rb,None,reason='stored_bytes_noncanonical',path=absent)
 v=copy.deepcopy(record); v['integrity']['content_digest']='sha256:'+'0'*64; control('digest failure before missing expected',canonical(v),None,stage='integrity',path=absent)
 control('valid record missing expected',rb,None,exitcode=65,path=absent)
 control('expected invalid UTF8',rb,b'\xff',exitcode=65)
 control('expected cap wins over UTF8',rb,b'\xff'*(1572864+1),reason='expected_bytes')
 control('expected duplicate',rb,b'{"x":1,"x":2}',reason='expected_duplicate_member')
 v=copy.deepcopy(expected); v['record_id']='urn:example:different'; control('context failure',rb,canonical(v),stage='context')
 fifo=t/'fifo'; os.mkfifo(fifo); control('expected FIFO',rb,None,path=fifo,exitcode=65)
 control('expected directory',rb,None,path=t,exitcode=65)
 link=t/'expected-link'; link.symlink_to(ep); control('expected symlink',rb,eb,path=link,exitcode=65)
 v=copy.deepcopy(record); v['payload']['result']['adjusted'][0]['adjusted_hex']='0'; control('arithmetic mismatch scoped failure',sealed(v),eb,stage='arithmetic')
Path(a.output).write_text(json.dumps({'candidate':subprocess.check_output(['git','rev-parse','HEAD'],cwd=root,text=True).strip(),'rows':rows,'passed':sum(x['passed'] for x in rows),'controls':len(rows)},indent=2)+'\n'); print(json.dumps(rows,indent=2))
