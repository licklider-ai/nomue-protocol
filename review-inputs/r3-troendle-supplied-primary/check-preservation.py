#!/usr/bin/env python3
"""Verify immutable inputs and append-only scope; no source PDF is required."""
import hashlib
from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parents[2]
INPUT = '55d30240252517aa4a84b8cccf374a72260c3426'
PARENT = '9e95cdee40b64cbf0f42dca8e3fab1c075507168'
SEMANTIC = '7bd9c5ab854777c3e99e624d9d2ed62731228852'
RESULT = 'governance/drafts/release-3-preparation/semantic-source-acquisition-result.md'
NEW = {'review-inputs/r3-troendle-supplied-primary/' + name for name in (
    'REVIEW-RESULT.md', 'check-troendle.py', 'check-preservation.py', 'INDEPENDENT-REVIEW.md')}


def git(*args):
    return subprocess.check_output(['git', '-C', str(ROOT), *args])


def blob(data):
    return hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest()


def tree(ref):
    result = {}
    for line in git('ls-tree', '-rz', ref).split(b'\0'):
        if line:
            meta, path = line.split(b'\t')
            mode, kind, sha = meta.decode().split()
            assert kind == 'blob'
            result[path.decode()] = (mode, sha)
    return result


assert git('show', '-s', '--format=%P', INPUT).decode().strip() == PARENT
assert git('rev-parse', INPUT+'^{tree}').decode().strip() == 'a469f08b484d032f2301b89518960a27c28226e1'
assert git('rev-parse', SEMANTIC+'^{tree}').decode().strip() == 'f0436f5784dbe34d4c150893c20a60f0431c5d90'
old, base = tree(PARENT), tree(INPUT)
assert set(base) - set(old) == {'review-inputs/r3-source-review-receipts/SRA-RECEIVED-REVIEW.txt',
                              'review-inputs/r3-source-review-receipts/TROENDLE-HANDOFF.md'}
assert not set(old)-set(base)
assert [p for p in old if old[p] != base[p]] == [RESULT]
prior = git('show', PARENT+':'+RESULT)
prefix = git('show', INPUT+':'+RESULT)
assert len(prior) == 542963 and prefix.startswith(prior)
assert hashlib.sha256(prior).hexdigest() == '8fbe47a29f0953823af1288331b53cffa20088fb612dedd3af6856bdf8857162'
assert len(prefix) == 552103 and blob(prefix) == 'db3cb0bb2766c8bb776bff9162ed8b35759e29e6'
assert hashlib.sha256(prefix).hexdigest() == '7f558850f37e70487e145e97d2fdf15d5ea0ddf0fb537074fb810b489bf4306c'
pins = {
    'governance/drafts/release-3-preparation/semantic-source-acquisition-commission.md': '3c7ddcc696f0c284213f7efe0da68e747bc238d7',
    'governance/drafts/release-3-preparation/semantic-research-result.md': '8f21526040924b891f64724c2d0fde9ea94eff92',
    'review-inputs/r3-supplied-source-scope/REVIEW-RESULT.md': '6092ab5a856673c414c02f04478373fd8492ba89',
    'review-inputs/r3-supplied-source-scope/check-ge.py': 'aa7664372c125e37e8cfc5a9c2ae8b97e44a70bb',
}
for p, sha in pins.items():
    assert base[p][1] == sha
for p, (_, sha) in base.items():
    data = (ROOT/p).read_bytes()
    if p == RESULT:
        assert data.startswith(prefix)
        assert data[len(prefix):].startswith(b'\n## Part AB.')
    else:
        assert blob(data) == sha, p
tracked = set(git('ls-files', '-z').decode().strip('\0').split('\0'))
assert tracked - set(base) == NEW, 'Stage the four new files before this check'
assert not set(base) - tracked
for p in NEW:
    assert p not in base and (ROOT/p).is_file()
# Index must match the inspected working bytes, both before and after commit.
assert not git('diff', '--name-only'), 'Unstaged tracked change'
head = git('rev-parse', 'HEAD').decode().strip()
if head != INPUT:
    assert git('show', '-s', '--format=%P', head).decode().strip() == INPUT
    assert set(git('diff', '--name-only', INPUT, head).decode().splitlines()) == NEW | {RESULT}
print('INPUT commit/parent/tree, semantic pins and prior increment PASS')
print('552103-byte Parts A-AA prefix and every other pre-existing blob PASS')
print('Four added files only; no PDF, authoritative or numerical-lane change PASS')
for p in sorted(NEW | {RESULT}):
    data = (ROOT/p).read_bytes()
    print(p, len(data), blob(data), hashlib.sha256(data).hexdigest())
