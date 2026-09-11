"""Read-only identity, catalogue and preservation checks for PR 270."""
import collections
import hashlib
import json
from pathlib import Path
import re
import subprocess

ROOT = Path(__file__).resolve().parents[2]
HEAD = 'fca5094a227422fd2d7d72ed8a7dc64f0f6ddc21'
PARENT = '829e1050ab35ced87867490c974ea07b6e1545c9'
MAIN = 'dedd26a3e0655001b67e40ccfb741e43ecb07beb'
PREP = 'governance/drafts/release-3-preparation/'
CAT = PREP + 'semantic-research-result.md'
CUM = PREP + 'semantic-source-acquisition-result.md'
OPEN = PREP + 'supplied-scope-opening-record.md'
RFC = 'governance/drafts/release-3-independent-multigroup-rfc.md'


def git(*args):
    return subprocess.check_output(['git', *args], cwd=ROOT)


def text_at(ref, path):
    return git('show', f'{ref}:{path}').decode()


def tree(ref):
    result = {}
    for row in git('ls-tree', '-rz', ref).split(b'\0'):
        if row:
            meta, path = row.split(b'\t', 1)
            result[path.decode()] = meta.decode()
    return result


def require(condition, message):
    if not condition:
        raise RuntimeError(message)


commit = git('cat-file', 'commit', HEAD)
require(hashlib.sha1(b'commit ' + str(len(commit)).encode() + b'\0' + commit).hexdigest() == HEAD, 'commit hash')
require(re.findall(rb'^parent (\w+)$', commit, re.M) == [PARENT.encode()], 'sole parent')
require(git('rev-parse', HEAD + '^{tree}').decode().strip() == '2dfaa6e354b87e41a87df820399771dbde0df688', 'tree')
old, new = tree(PARENT), tree(HEAD)
changed = {p for p in old.keys() | new.keys() if old.get(p) != new.get(p)}
expected = {RFC, PREP + 'README.md', CUM, OPEN, 'review-inputs/r3-supplied-scope-opening/INDEPENDENT-REVIEW.md'}
require(changed == expected, 'five-path increment')
require(set(old) - set(new) == set(), 'deleted path')
previous = git('show', f'{PARENT}:{CUM}')
current = git('show', f'{HEAD}:{CUM}')
require(len(previous) == 565802 and current.startswith(previous), 'A-AC prefix')
require(hashlib.sha256(previous).hexdigest() == '31d852a1c0e92688c2c1ec2ec1b6fd5f1c34eac3be1282a4f4ae98ab1247d9eb', 'prefix SHA256')
require(current[len(previous):].decode().lstrip().startswith('## Part AD.'), 'append boundary')
pins = {
    CAT: '8f21526040924b891f64724c2d0fde9ea94eff92',
    CUM: 'abb9d6addaa028118489c7f27c5815cc370ecb38',
    RFC: 'd214baea5c2c99d5c6aaa61696c83c50f5bce170',
    OPEN: '7b5ccb3e34ce390fe8b61686a9d5a59f76e4bce5',
    'review-inputs/r3-supplied-scope-opening/INDEPENDENT-REVIEW.md': 'db01342a4c4261f37608d2cc2e72752ed1c6ef10',
}
for path, sha in pins.items():
    require(new[path].split()[-1] == sha, path)
require(git('rev-parse', f'7bd9c5ab854777c3e99e624d9d2ed62731228852:{CAT}').decode().strip() == pins[CAT], 'frozen catalogue')
cat = text_at(HEAD, CAT)
section8 = cat.split('## 8. In-scope technique catalogue\n', 1)[1].split('## 9.', 1)[0]
overlay = text_at(HEAD, OPEN).split('## 3.', 1)[1].split('## 4.', 1)[0]
pattern = re.compile(r'^\|\s*((?:OMN|PVL|CLS|APR|HET|MTO|MCB|FDR|RSM)-\d{2})\s*\|([^\n]+)', re.M)


def entries(value):
    rows = pattern.findall(value)
    result = {}
    for identifier, row in rows:
        require(identifier not in result, 'duplicate ' + identifier)
        labels = re.findall(r'R3-CAND|RES-ONLY|TRANSFER|REJECT', row)
        require(len(labels) == 1, 'disposition ' + identifier)
        name = row.split('|')[0].strip()
        result[identifier] = {'technique': name, 'disposition': labels[0]}
    return result


frozen, opening = entries(section8), entries(overlay)
require(frozen == opening and len(opening) == 49, 'catalogue identity/label/name equality')
counts = dict(collections.Counter(v['disposition'] for v in opening.values()))
require(counts == {'R3-CAND': 15, 'RES-ONLY': 27, 'TRANSFER': 5, 'REJECT': 2}, 'counts')
require(re.findall(r'^\|\s*(GUI-\d{2})\s*\|', section8, re.M) == ['GUI-01', 'GUI-02'], 'guidance')
exclusions = section8.split('### 8.10', 1)[1].split('Catalogue totals:', 1)[0]
require(len([s for s in exclusions.splitlines() if s.startswith('|')]) - 2 == 5, 'exclusions')
check_paths = ['AGENTS.md', 'CHARTER.md', 'AUTHORITY.md', 'authority/authority-manifest.yaml', 'registries/requirements.yaml', 'governance/ID-POLICY.md', 'governance/RFC.md', 'registries/stability-tiers.yaml']
main_tree = tree(MAIN)
for path in check_paths:
    require(main_tree[path] == new[path] == old[path], 'authority drift ' + path)
require(main_tree[RFC] == old[RFC], 'baseline RFC')
num = '92bea491e237df6aec08ae1e3c4c52e43ec3593d'
require(git('rev-parse', num + '^{tree}').decode().strip() == '053b922dcf4f0d38afe5a68f9a6dfccb8ddd35fe', 'numerical tree')
for path, sha in {
    PREP + 'numerical-research-result.md': '0d360ec3eaa1ede0d6112555027255a6e3e695c3',
    'review-inputs/r3-numerical-callback-confirmation/REVIEW-RESULT.md': '42c9f39904ff325a553b4414cd1c63009e785e90',
}.items():
    require(git('rev-parse', f'{num}:{path}').decode().strip() == sha, 'numerical pin')
# The return is additive: check both working bytes and any staged/committed edits.
for path, meta in new.items():
    mode, kind, sha = meta.split()
    require(kind == 'blob', 'unexpected object ' + path)
    local = ROOT / path
    require(local.read_bytes() == git('cat-file', 'blob', sha), 'review modified input ' + path)
    require(bool(local.stat().st_mode & 0o111) == (mode == '100755'), 'review changed mode ' + path)
require(not git('diff', '--name-only', '--diff-filter=DMRT', HEAD).strip(), 'tracked input changed')
print(json.dumps({
    'status': 'PASS', 'review_commit': HEAD, 'sole_parent': PARENT,
    'main_observed': MAIN, 'changed_paths': sorted(changed),
    'unchanged_previous_paths_and_modes': len(old) - 3,
    'preserved_input_paths_in_return': len(new),
    'prefix_bytes': len(previous), 'prefix_sha256': hashlib.sha256(previous).hexdigest(),
    'catalogue_counts': counts, 'catalogue': opening,
    'guidance_entries': 2, 'exclusions': 5, 'authority_paths_equal': check_paths,
    'limits': 'Structural checks only; no scientific guarantee or formal independence attestation.'
}, indent=2))
