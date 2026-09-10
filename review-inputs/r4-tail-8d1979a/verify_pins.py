"""Check fixed author content and referenced Git identities; read-only."""
import hashlib
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
HERE = Path(__file__).resolve().parent

def git(*args):
    return subprocess.check_output(['git','-C',str(ROOT),*args])

def main():
    data=json.loads((HERE/'INPUTS.json').read_text())
    sha=data['commit']
    assert git('show','-s','--format=%P',sha).decode().strip()==data['sole_parent']
    assert git('rev-parse',sha+'^{tree}').decode().strip()==data['tree']
    assert len(data['files'])==13
    assert set(git('diff-tree','--no-commit-id','--name-only','-r',sha).decode().splitlines())=={x['path'] for x in data['files']}
    for item in data['files']+data['author_input_manifest']['files']:
        commit=item.get('commit',sha)
        obj=commit+':'+item['path']
        content=git('show',obj)
        assert git('rev-parse',obj).decode().strip()==item['blob']
        assert len(content)==item['bytes']
        assert hashlib.sha256(content).hexdigest()==item['sha256']
        if commit==sha:
            assert (ROOT/item['path']).read_bytes()==content
    for commit,meta in data['author_input_manifest']['commits'].items():
        assert git('rev-parse',commit+'^{tree}').decode().strip()==meta['tree']
        assert git('show','-s','--format=%P',commit).decode().split()==meta['parents']
    print('PASS: fixed commit/parent/tree; 13 author files unchanged; 23 referenced blobs and 5 commit identities')

if __name__=='__main__':
    main()
