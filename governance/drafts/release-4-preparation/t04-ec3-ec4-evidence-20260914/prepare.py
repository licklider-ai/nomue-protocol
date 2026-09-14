"""Export immutable inputs and construct a disposable Linux measurement image context."""
import argparse
import io
import json
from pathlib import Path
import shutil
import subprocess
import tarfile
from common import data, sha, EXECUTION, NUMERICAL, G5

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[3]

def main():
    args=argparse.ArgumentParser()
    args.add_argument('stage',type=Path)
    a=args.parse_args()
    a.stage.mkdir(parents=True,exist_ok=False)
    sources={}
    for label,commit in [('execution',EXECUTION),('numerical',NUMERICAL)]:
        target=a.stage/label
        target.mkdir()
        archive=subprocess.check_output(['git','-c','safe.directory='+str(ROOT),'archive',commit],cwd=ROOT)
        with tarfile.open(fileobj=io.BytesIO(archive)) as t:
            t.extractall(target,filter='data')
        sources[label]={'commit':commit,'files':{str(p.relative_to(target)).replace('\\','/'):sha(p.read_bytes()) for p in sorted(target.rglob('*')) if p.is_file()}}
    harness=a.stage/'harness'; harness.mkdir()
    for name in ('common.py','parent.py','worker.py','profiles.json'):
        shutil.copyfile(HERE/name,harness/name)
    # Resolve the locked transitive esbuild through tsx without adding dependencies.
    script="""const {createRequire}=require('module'); const r=createRequire(require.resolve('tsx/package.json'));
const esbuild=r('esbuild'); esbuild.buildSync({entryPoints:[process.argv[1]],bundle:true,platform:'node',format:'cjs',outfile:process.argv[2]});"""
    subprocess.run(['node','-e',script,str(HERE/'ingress.ts'),str(harness/'ingress.cjs')],cwd=ROOT,check=True)
    (a.stage/'Dockerfile').write_bytes((HERE/'Dockerfile').read_bytes())
    frozen=a.stage/'numerical'/G5
    raw=(frozen/'RECORDS.jsonl').read_bytes().splitlines(keepends=True)
    expected=[json.loads(line) for line in (frozen/'EXPECTED-VECTORS.jsonl').read_text().splitlines()]
    saved={row['id']:row['result'] for row in json.loads((frozen/'RESULTS.jsonl').read_text())['cases']}
    cases=a.stage/'cases'; cases.mkdir()
    index={}
    for line,exp in zip(raw,expected):
        name=exp['id']; filename=name+'.json'
        (cases/filename).write_bytes(line)
        index[name]={'file':filename,'raw_sha256':sha(line),'expected':saved[name],'independent_vector':exp}
    basic=(cases/'ordinary_dyadic_n3.json').read_bytes()
    variants={'padded-two-MiB':basic+b' '*2097152,'raw-oversize':basic+b' '*5242880,
              'duplicate-member':b'{"x":1,"x":2}','negative-zero':b'{"x":-0}',
              'unpaired-surrogate':b'{"x":"\\ud800"}','nonfinite':b'{"x":1e400}',
              'depth':b'['*66+b'0'+b']'*66,'malformed-raw':b'{broken'}
    for name,line in variants.items():
        (cases/(name+'.json')).write_bytes(line)
        index[name]={'file':name+'.json','raw_sha256':sha(line)}
        if name=='padded-two-MiB': index[name]['expected']=saved['ordinary_dyadic_n3']
    for name in ('transport','stdout','stderr','timeout','cpu','crash','memory','malformed','partial','wrong-identity','descendant','escaped-descendant','parent-timeout','report-timeout','cleanup-escalation','tree-memory','report-cap'):
        index['control-'+name]={'file':'ordinary_dyadic_n3.json','raw_sha256':sha(basic),'control':name}
    (cases/'index.json').write_bytes(data(index))
    manifest={'inputs':sources,'harness':{p.name:sha(p.read_bytes()) for p in sorted(harness.iterdir())},'cases_sha256':sha(data(index))}
    (a.stage/'source-manifest.json').write_bytes(data(manifest))
    print(json.dumps({'stage':str(a.stage),'cases':len(index),'manifest_sha256':sha(data(manifest))}))
if __name__=='__main__': main()
