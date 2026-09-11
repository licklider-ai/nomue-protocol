#!/usr/bin/env python3
"""Audit fixed author increment and additions-only review index independently."""
import hashlib
from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parents[2]
REVIEW = '0e82d4a3d6f098753a703287f9424fe590b886d5'
PARENT = '55d30240252517aa4a84b8cccf374a72260c3426'
RESULT = 'governance/drafts/release-3-preparation/semantic-source-acquisition-result.md'
AUTHOR_DIR = 'review-inputs/r3-troendle-supplied-primary/'
REVIEW_DIR = 'review-inputs/r3-troendle-bounded-review/'
ADDITIONS = {REVIEW_DIR + p for p in ('REVIEW-RESULT.md', 'check-independent.py', 'check-preservation.py')}
PINS = {
    RESULT: (559874, 'abb1d947e1bdfcc52600f6fde4c0b774340685ea', 'da0426eb5f339b16ee0caf7d36aa5c1a7e5961c5d758e2104d0043ffcc1102c9'),
    AUTHOR_DIR + 'REVIEW-RESULT.md': (32286, 'a3f67bc1d2d97d818ba5f8be2cc66c13ce475345', '0c3f197292def10eaeaf2516b352879c97b1923463b6211bdfc0fbb50b68d271'),
    AUTHOR_DIR + 'INDEPENDENT-REVIEW.md': (6008, '63828a07034209af7df8957ed2c1697b985737d0', '0c1fb96012ab09845cc4e1af0154e93bb6b3f734b2bd34bddb0570817b29c532'),
    AUTHOR_DIR + 'check-troendle.py': (7458, '642304fc96647eb72171fdd59611ad75928eedf0', 'f4ad6aca80048198ed5ef13753111cc9c7674f35e12a39a19c71ab3307faddea'),
    AUTHOR_DIR + 'check-preservation.py': (3922, '322abcc958bbe207e14eb20a1b9b44c51d9192f4', '9af793e6afb68bb477e60bd5f2b5e45bce17472b4d25056b113b3ad2ecbf0050'),
}


def git(*args):
    return subprocess.check_output(['git', '-C', str(ROOT), *args])


def tree(ref):
    return dict((row.split(b'\t')[1], row.split(b'\t')[0])
                for row in git('ls-tree', '-rz', ref).split(b'\0') if row)


def identity(data):
    return (len(data), hashlib.sha1(b'blob ' + str(len(data)).encode() + b'\0' + data).hexdigest(),
            hashlib.sha256(data).hexdigest())


assert git('show', '-s', '--format=%P', REVIEW).decode().strip() == PARENT
assert git('rev-parse', REVIEW + '^{tree}').decode().strip() == '22991421dc023eb140e522a6962ae76ac2d7cf6a'
old, reviewed = tree(PARENT), tree(REVIEW)
assert set(reviewed) - set(old) == {p.encode() for p in PINS if p != RESULT}
assert not set(old) - set(reviewed)
assert {p for p in old if old[p] != reviewed[p]} == {RESULT.encode()}
prefix = git('show', PARENT + ':' + RESULT)
assert identity(prefix) == (552103, 'db3cb0bb2766c8bb776bff9162ed8b35759e29e6',
                            '7f558850f37e70487e145e97d2fdf15d5ea0ddf0fb537074fb810b489bf4306c')
assert git('show', REVIEW + ':' + RESULT).startswith(prefix)
for path, pin in PINS.items():
    assert identity(git('show', REVIEW + ':' + path)) == pin
semantic = 'governance/drafts/release-3-preparation/semantic-research-result.md'
assert git('rev-parse', REVIEW + ':' + semantic).decode().strip() == '8f21526040924b891f64724c2d0fde9ea94eff92'
assert git('rev-parse', '7bd9c5ab854777c3e99e624d9d2ed62731228852:' + semantic).decode().strip() == '8f21526040924b891f64724c2d0fde9ea94eff92'
print('Fixed commit, sole parent, tree, five PR-body identities and 552103-byte prefix PASS')
print('Every other parent tree entry preserved; semantic catalogue pin PASS')
index = tree(git('write-tree').decode().strip())
assert set(index) - set(reviewed) == {p.encode() for p in ADDITIONS}
assert not set(reviewed) - set(index)
assert all(index[p] == reviewed[p] for p in reviewed)
assert not git('diff', '--name-only')
for path in ADDITIONS:
    data = (ROOT / path).read_bytes()
    assert data == git('show', ':' + path)
    print(path, *identity(data))
head = git('rev-parse', 'HEAD').decode().strip()
if head != REVIEW:
    assert git('show', '-s', '--format=%P', head).decode().strip() == REVIEW
    assert tree(head) == index
print('Exactly three review additions; every reviewed mode/blob and working/index byte preserved PASS')
