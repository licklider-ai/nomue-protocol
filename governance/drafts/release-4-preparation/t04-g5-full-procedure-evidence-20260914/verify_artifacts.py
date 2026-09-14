"""Read-only verification of the fixed G5 submission, not independent review."""
import hashlib
import json
from pathlib import Path
import subprocess
import procedure as p

HERE = Path(__file__).resolve().parent

def git(*args):
    return subprocess.check_output(['git','-c','safe.directory=C:/nomue-protocol',
                                    '--no-optional-locks',*args],cwd=p.ROOT,text=True).strip()

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def main():
    inputs = json.loads((HERE/'INPUTS.json').read_text(encoding='utf-8'))
    manifest = json.loads((HERE/'MANIFEST.json').read_text(encoding='utf-8'))
    p.require(inputs['input_commit'] == p.BASE,'input commit')
    for row in inputs['files']:
        p.require(sha(p.ROOT/row['path']) == row['sha256'],'source bytes '+row['path'])
        p.require(git('rev-parse',p.BASE+':'+row['path']) == row['git_blob'],'base source blob')
    p.require(set(manifest['artifacts'])|{'MANIFEST.json'} == {x.name for x in HERE.iterdir() if x.is_file()},'complete inventory')
    for name,digest in manifest['artifacts'].items():
        p.require(sha(HERE/name) == digest,'artifact '+name)
    p.require(manifest['candidate_identity'] == p.candidate_identity(),'candidate identity')
    p.require(manifest['working_budget_decimal'] == str(p.B) and manifest['cost_definition_sha256'] == p.COST_SHA,'B/cost freeze')
    data = json.loads((HERE/'RESULTS.jsonl').read_text(encoding='utf-8'))
    for item in data['cases']+data['generic_controls']:
        p.require(item['result']['candidate_identity'] == p.candidate_identity(),'result candidate binding')
    relative = HERE.relative_to(p.ROOT).as_posix()+'/'
    changed = git('diff','--name-only',p.BASE,'HEAD').splitlines()+git('diff','--name-only','HEAD').splitlines()
    p.require(all(name.startswith(relative) for name in changed),'only additive G5 directory')
    status = git('status','--porcelain=v1','--untracked-files=all')
    for row in status.splitlines():
        p.require(row[3:].startswith(relative),'no unrelated working tree path')
    head = git('rev-parse','HEAD')
    if head != p.BASE:
        p.require(git('rev-parse','HEAD^') == p.BASE,'G4 direct parent')
        names = git('diff','--name-status',p.BASE,head).splitlines()
        p.require(all(row.startswith('A\t'+relative) for row in names),'G5 additions only')
    print(json.dumps({'HEAD':head,'base':p.BASE,'input_files':len(inputs['files']),
                      'artifacts':len(manifest['artifacts'])+1,'candidate_identity':p.candidate_identity(),
                      'hashes':'PASS','working_tree_clean':not status},sort_keys=True))

if __name__ == '__main__':
    main()
