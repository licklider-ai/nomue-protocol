"""Read-only packet and inherited-source identity check; no policy approval."""
import hashlib
import json
from pathlib import Path
import subprocess

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
BASE = '663e44a0e632854d740abc26ff0f705db8d87c3f'


def require(ok, message):
    if not ok:
        raise AssertionError(message)


def git(*args):
    return subprocess.check_output(['git','-c','safe.directory=C:/nomue-protocol',
                                    '--no-optional-locks',*args],cwd=ROOT,text=True).strip()


def main():
    manifest = json.loads((HERE/'MANIFEST.json').read_text())
    inputs = json.loads((HERE/'INPUTS.json').read_text())
    require(inputs['input_commit'] == BASE, 'source base')
    for item in inputs['files']:
        require(hashlib.sha256((ROOT/item['path']).read_bytes()).hexdigest() == item['sha256'],
                'source bytes '+item['path'])
        require(git('rev-parse',BASE+':'+item['path']) == item['git_blob'], 'source git blob')
    expected = set(manifest['artifacts']) | {'MANIFEST.json'}
    actual = {p.name for p in HERE.iterdir() if p.is_file()}
    require(expected == actual, 'complete artifact inventory')
    for name,digest in manifest['artifacts'].items():
        require(hashlib.sha256((HERE/name).read_bytes()).hexdigest() == digest, 'artifact '+name)
    require(manifest['results_sha256'] == manifest['artifacts']['RESULTS.jsonl'], 'result identity')
    head = git('rev-parse','HEAD')
    rel = HERE.relative_to(ROOT).as_posix()+'/'
    changes = git('diff','--name-only',BASE,'HEAD').splitlines()
    require(all(p.startswith(rel) for p in changes), 'only new research directory changed')
    require(not git('diff','--name-only',BASE,'HEAD','--',':(exclude)'+rel), 'historical trees unchanged')
    print(json.dumps({'artifact_count':len(expected),'input_files':len(inputs['files']),
                      'HEAD':head,'base':BASE,'hashes':'PASS',
                      'committed_delta_only_new_packet':head != BASE},sort_keys=True))


if __name__ == '__main__':
    main()
