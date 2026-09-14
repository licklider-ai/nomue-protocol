"""Read-only G4 input/artifact/decision identity verification."""
import hashlib
import json
from pathlib import Path
import subprocess
import check_evidence as r

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[3]
BASE='225eca96d485978ee01cbe08d535387900252bca'


def git(*args):
    return subprocess.check_output(['git','-c','safe.directory=C:/nomue-protocol',
                                    '--no-optional-locks',*args],cwd=ROOT,text=True).strip()


def main():
    inputs=json.loads((HERE/'INPUTS.json').read_text(encoding='utf-8'))
    manifest=json.loads((HERE/'MANIFEST.json').read_text(encoding='utf-8'))
    r.require(inputs['input_commit']==BASE,'fixed G4 source base')
    for row in inputs['files']:
        r.require(hashlib.sha256((ROOT/row['path']).read_bytes()).hexdigest()==row['sha256'],'source bytes '+row['path'])
        r.require(git('rev-parse',BASE+':'+row['path'])==row['git_blob'],'input Git blob')
    r.require(set(manifest['artifacts'])|{'MANIFEST.json'}=={x.name for x in HERE.iterdir() if x.is_file()},'complete artifact inventory')
    for name,sha in manifest['artifacts'].items():
        r.require(hashlib.sha256((HERE/name).read_bytes()).hexdigest()==sha,'artifact '+name)
    result=json.loads((HERE/'RESULTS.jsonl').read_text(encoding='utf-8'))
    analysis=json.loads((HERE/'ANALYSIS.jsonl').read_text(encoding='utf-8'))
    cost_sha=hashlib.sha256((HERE/'COST-DEFINITION.json').read_bytes()).hexdigest()
    r.require(result['cost_definition_sha256']==cost_sha==manifest['cost_definition_sha256'],'one fixed cost revision')
    selected=analysis['selection']['B']
    r.require(str(selected)==manifest['working_budget_decimal'],'exact working budget')
    r.require(str(selected) in (HERE/'DECISION.md').read_text(encoding='utf-8'),'decision has exact budget')
    r.require(cost_sha in (HERE/'DECISION.md').read_text(encoding='utf-8'),'decision has exact cost identity')
    relative=HERE.relative_to(ROOT).as_posix()+'/'
    changed=git('diff','--name-only',BASE,'HEAD').splitlines()
    r.require(all(x.startswith(relative) for x in changed),'committed delta restricted to new G4 packet')
    r.subjects()
    print(json.dumps({'HEAD':git('rev-parse','HEAD'),'input_files':len(inputs['files']),
                      'artifacts':len(manifest['artifacts'])+1,'hashes':'PASS',
                      'working_budget_decimal':str(selected),'cost_definition_sha256':cost_sha},sort_keys=True))


if __name__=='__main__': main()
