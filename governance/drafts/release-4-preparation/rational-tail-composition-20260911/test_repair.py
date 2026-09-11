"""Bounded repair probes, including actual snapshot tampering."""
from pathlib import Path
from fractions import Fraction as Q
import json, shutil, tempfile, time
from adapter import tail
from pins import verify

p=Path(__file__).resolve().parent
manifest=json.loads((p/'INPUTS.json').read_text())
checked=[]
with tempfile.TemporaryDirectory() as tmp:
    root=Path(tmp)/'packet';root.mkdir()
    shutil.copyfile(p/'INPUTS.json',root/'INPUTS.json')
    for name in manifest['runtime_sha256']:
        dst=root/name;dst.parent.mkdir(parents=True,exist_ok=True)
        shutil.copyfile(p/name,dst)
    verify(root)
    for name in manifest['runtime_sha256']:
        dst=root/name;data=dst.read_bytes();dst.write_bytes(data+b'\n# mutation')
        try: verify(root)
        except ValueError as e:
            if str(e)!='source hash mismatch: '+name: raise
            checked.append(name)
        else: raise RuntimeError('tamper accepted')
        dst.write_bytes(data)
timings=[]
for n,width in [(65,53),(16,1100),(8,2200),(2,6500),(65,1100),(65,2200),(65,6500)]:
    q=Q((1<<width)-1);start=time.perf_counter()
    try: result=tail(q,q,n,(128,));status=result['status']
    except ValueError as e:
        if str(e)!='rational work budget': raise
        status='refused'
    timings.append({'n':n,'width':width,'status':status,'seconds':time.perf_counter()-start})
(p/'REPAIR-RESULTS.json').write_text(json.dumps({'tamper_rejections':checked,'timings':timings},indent=2)+'\n')
print(timings)
