"""Verify immutable repository inputs and the confined staged/review delta."""
import hashlib
import json
import subprocess
from pathlib import Path


def main():
    here=Path(__file__).resolve().parent
    root=here.parents[3]
    def git(*args):
        return subprocess.check_output(['git','-C',str(root),*args])
    data=json.loads((here/'inputs.json').read_text())
    for sha, meta in data['commits'].items():
        assert git('rev-parse',sha+'^{tree}').decode().strip()==meta['tree']
        assert git('show','-s','--format=%P',sha).decode().split()==meta['parents']
    for row in data['files']:
        obj=row['commit']+':'+row['path']
        content=git('show',obj)
        assert git('rev-parse',obj).decode().strip()==row['blob']
        assert len(content)==row['bytes']
        assert hashlib.sha256(content).hexdigest()==row['sha256']
    prefix=here.relative_to(root).as_posix()+'/'
    staged=git('diff','--cached','--name-only',data['base']).decode().splitlines()
    assert all(p.startswith(prefix) for p in staged)
    print(f"{len(data['commits'])} commit identities and {len(data['files'])} blobs verified; {len(staged)} staged paths confined")


if __name__=='__main__':
    main()
