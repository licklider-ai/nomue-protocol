"""UNISSUED CANDIDATE. Disposable image context, no changes to fixed source."""
import argparse
import hashlib
import io
import json
from pathlib import Path
import shutil
import subprocess
import tarfile
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[3]
def git(*args):return subprocess.check_output(['git','-c','safe.directory='+ROOT.as_posix(),'-C',str(ROOT),*args])
def main():
    p=argparse.ArgumentParser();p.add_argument('stage',type=Path);a=p.parse_args();a.stage.mkdir(parents=True,exist_ok=False)
    repo=a.stage/'repo';repo.mkdir()
    # Fixed T08 direct dependency tree; T09 additions are copied separately.
    archive=git('archive','76542b5d0370fc51d60f22efda2af00cafe33ad1')
    with tarfile.open(fileobj=io.BytesIO(archive)) as t:t.extractall(repo,filter='data')
    rel=HERE.relative_to(ROOT);shutil.copytree(HERE,repo/rel,ignore=shutil.ignore_patterns('__pycache__'))
    subprocess.run(['git','init','--quiet',str(repo)],check=True)
    pins=json.loads((HERE/'INPUTS.json').read_text())['files']+json.loads((HERE.parent/'t08-limited-numerical-adapter-20260915/INPUTS.json').read_text())['core_files']
    for e in {e['git_blob']:e for e in pins}.values():
        data=git('cat-file','blob',e['git_blob'])
        if hashlib.sha256(data).hexdigest()!=e['sha256']:raise ValueError('source drift')
        oid=subprocess.check_output(['git','-C',str(repo),'hash-object','-w','--stdin'],input=data).decode().strip()
        if oid!=e['git_blob']:raise ValueError('source object identity')
    subprocess.run(['node',str(HERE/'bundle.mjs'),str(HERE/'app.ts'),str(repo/rel/'app.mjs')],cwd=ROOT,check=True)
    shutil.copyfile(HERE/'Dockerfile',a.stage/'Dockerfile')
    manifest={str(f.relative_to(repo)).replace('\\','/'):hashlib.sha256(f.read_bytes()).hexdigest() for f in sorted(repo.rglob('*')) if f.is_file() and '.git' not in f.parts}
    (a.stage/'SOURCE-MANIFEST.json').write_text(json.dumps({'source_commit':git('rev-parse','HEAD').decode().strip(),'files':manifest},indent=2)+'\n')
    print(json.dumps({'files':len(manifest),'source_commit':git('rev-parse','HEAD').decode().strip()}))
if __name__=='__main__':main()
