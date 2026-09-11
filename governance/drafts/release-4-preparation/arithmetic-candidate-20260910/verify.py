"""Verify fixed inputs, historical reproduction, and optionally numeric replay."""
import argparse
import hashlib
import json
import subprocess
from pathlib import Path

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[3]


def read(p):return json.loads(p.read_text())


def main(rerun):
    manifest=read(HERE/'INPUTS.json')
    count=0
    for item in manifest['files']:
        actual=subprocess.check_output(['git','ls-tree',item['commit'],'--',item['path']],cwd=ROOT).decode().strip()
        if not item['present']:
            assert not actual
            continue
        assert actual.split()[2]==item['blob']
        content=subprocess.check_output(['git','cat-file','blob',item['blob']],cwd=ROOT)
        assert len(content)==item['bytes'] and hashlib.sha256(content).hexdigest()==item['sha256']
        count+=1
    original=read(HERE.parent/'probes/ss-f-propagation-result.json')
    replay=read(HERE/'results/historical-rerun.json')
    for k in ('cases','corpus_sha256','summary','witnesses','zero_residual_diagnostics','script_sha256'):
        assert original[k]==replay[k], ('historical',k)
    if rerun:
        for filename in ('inputs.json','exact-results.json','float-results.json','summary.json'):
            assert read(HERE/'results'/filename)==read(rerun/filename), ('replay',filename)
    sums=HERE/'SHA256SUMS'
    hashes=0
    if sums.exists():
        for line in sums.read_text().splitlines():
            digest,name=line.split('  ',1)
            assert hashlib.sha256((HERE/name).read_bytes()).hexdigest()==digest, name
            hashes+=1
    # The work adds only this subtree; no tracked baseline path may be edited.
    diff=subprocess.check_output(['git','diff','--name-status',manifest['base']],cwd=ROOT).decode().splitlines()
    prefix=str(HERE.relative_to(ROOT))+'/'
    assert all(line.startswith('A\t'+prefix) for line in diff), diff
    print(json.dumps(dict(input_blobs_verified=count,historical_corpus_sha256=replay['corpus_sha256'],
        numeric_replay=bool(rerun),sealed_files_verified=hashes,baseline_preserved=True)))

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--rerun',type=Path);main(p.parse_args().rerun)
