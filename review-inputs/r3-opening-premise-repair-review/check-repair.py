"""Read-only structural verification of the fixed PR 272 repair and return."""
import collections
import hashlib
import json
from pathlib import Path
import re
import subprocess

ROOT = Path(__file__).resolve().parents[2]
INPUT = '545f6eb4c28eb93bd7cc5404dd45afd475822317'
PARENT = 'c28d87a2260ca04c99e3c3927e8aa847aad1bd38'
MAIN = 'dedd26a3e0655001b67e40ccfb741e43ecb07beb'
PREP = 'governance/drafts/release-3-preparation/'
RFC = 'governance/drafts/release-3-independent-multigroup-rfc.md'
CUM = PREP + 'semantic-source-acquisition-result.md'
MAP = PREP + 'supplied-scope-opening-record.md'
CAT = PREP + 'semantic-research-result.md'
README = PREP + 'README.md'
PRIOR = 'review-inputs/r3-supplied-scope-opening-review/'


def git(*args):
    return subprocess.check_output(['git', *args], cwd=ROOT)


def require(condition, label):
    if not condition:
        raise RuntimeError(label)


def blob(ref, path):
    return git('show', f'{ref}:{path}')


def tree(ref):
    result = {}
    for row in git('ls-tree', '-rz', ref).split(b'\0'):
        if row:
            meta, path = row.split(b'\t', 1)
            result[path.decode()] = meta.decode()
    return result


def entries(value):
    result = {}
    for identifier, tail in re.findall(
        r'^\|\s*((?:OMN|PVL|CLS|APR|HET|MTO|MCB|FDR|RSM)-\d{2})\s*\|([^\n]+)',
        value, re.M
    ):
        require(identifier not in result, 'duplicate ' + identifier)
        labels = re.findall(r'R3-CAND|RES-ONLY|TRANSFER|REJECT', tail)
        require(len(labels) == 1, 'disposition ' + identifier)
        result[identifier] = {'technique': tail.split('|')[0].strip(), 'disposition': labels[0]}
    return result


raw = git('cat-file', 'commit', INPUT)
require(hashlib.sha1(b'commit ' + str(len(raw)).encode() + b'\0' + raw).hexdigest() == INPUT, 'commit object')
require(re.findall(rb'^parent (\w+)$', raw, re.M) == [PARENT.encode()], 'sole parent')
require(git('rev-parse', INPUT + '^{tree}').decode().strip() == 'a0e0b2a09763ff784126c1b11004517d8f937990', 'input tree')
old, new = tree(PARENT), tree(INPUT)
changed = {p for p in old.keys() | new.keys() if old.get(p) != new.get(p)}
require(changed == {RFC, CUM, MAP, README}, 'four-path repair')
require(old.keys() == new.keys(), 'path inventory')
previous, current = blob(PARENT, CUM), blob(INPUT, CUM)
require(len(previous) == 569423 and current.startswith(previous), 'A-AD prefix')
require(current[len(previous):].decode().lstrip().startswith('## Part AE.'), 'AE boundary')
require(git('rev-parse', f'{PARENT}:{CUM}').decode().strip() == 'abb9d6addaa028118489c7f27c5815cc370ecb38', 'prior cumulative blob')
require(new[CAT].split()[-1] == '8f21526040924b891f64724c2d0fde9ea94eff92', 'catalogue blob')
require(blob(INPUT, CAT) == blob('7bd9c5ab854777c3e99e624d9d2ed62731228852', CAT), 'frozen catalogue')
prior_paths = [p for p in old if p.startswith(PRIOR)]
require(len(prior_paths) == 3 and all(new[p] == old[p] for p in prior_paths), 'prior review artifacts')
require(new[PRIOR + 'REVIEW-RESULT.md'].split()[-1] == '8b1e9aad128970146d70bc4f44ec2d9e5ac16c59', 'PR 271 report blob')
catalogue = blob(INPUT, CAT).decode().split('## 8. In-scope technique catalogue\n', 1)[1].split('## 9.', 1)[0]
overlay = blob(INPUT, MAP).decode().split('## 3.', 1)[1].split('## 4.', 1)[0]
old_overlay = blob(PARENT, MAP).decode().split('## 3.', 1)[1].split('## 4.', 1)[0]
rows = entries(overlay)
require(rows == entries(catalogue) == entries(old_overlay) and len(rows) == 49, '49 names/IDs/dispositions')
counts = dict(collections.Counter(v['disposition'] for v in rows.values()))
require(counts == {'R3-CAND': 15, 'RES-ONLY': 27, 'TRANSFER': 5, 'REJECT': 2}, '15/27/5/2')
require(re.findall(r'^\|\s*(GUI-\d{2})\s*\|', catalogue, re.M) == ['GUI-01', 'GUI-02'], 'guidance')
exclusions = catalogue.split('### 8.10', 1)[1].split('Catalogue totals:', 1)[0]
require(sum(line.startswith('|') for line in exclusions.splitlines()) - 2 == 5, 'five exclusions')
old_sequence = blob(PARENT, README).decode().split('## Immediate sequence\n', 1)[1].strip()
historic_sequence = blob(INPUT, README).decode().split('## Historical immediate sequence (2026-09-06; superseded)\n', 1)[1].split('## Current immediate sequence', 1)[0].strip()
require(old_sequence == historic_sequence, 'historical sequence verbatim')
authority = ['AGENTS.md', 'CHARTER.md', 'AUTHORITY.md', 'authority/authority-manifest.yaml', 'registries/requirements.yaml', 'governance/ID-POLICY.md', 'governance/RFC.md', 'registries/stability-tiers.yaml']
main_tree = tree(MAIN)
for path in authority:
    require(old[path] == new[path] == main_tree[path], 'authority ' + path)
# Prove the review return preserves every input byte and executable mode.
for path, meta in new.items():
    mode, kind, sha = meta.split()
    require(kind == 'blob', 'object type ' + path)
    local = ROOT / path
    require(local.read_bytes() == git('cat-file', 'blob', sha), 'input bytes ' + path)
    require(bool(local.stat().st_mode & 0o111) == (mode == '100755'), 'input mode ' + path)
require(not git('diff', '--name-only', '--diff-filter=DMRT', INPUT).strip(), 'return modifies input')
print(json.dumps({
    'status': 'PASS', 'input_commit': INPUT, 'sole_parent': PARENT,
    'input_tree': 'a0e0b2a09763ff784126c1b11004517d8f937990',
    'main_observed': MAIN, 'changed_paths': sorted(changed),
    'unchanged_previous_paths_and_modes': len(old) - len(changed),
    'preserved_input_paths_in_return': len(new),
    'prefix_bytes': len(previous), 'prefix_sha256': hashlib.sha256(previous).hexdigest(),
    'input_blobs': {p: new[p].split()[-1] for p in sorted(changed | set(prior_paths) | {CAT})},
    'catalogue_counts': counts, 'catalogue': rows,
    'guidance_entries': 2, 'exclusions': 5,
    'prior_review_artifacts_unchanged': prior_paths,
    'authority_paths_equal': authority,
    'historical_sequence_verbatim': True,
    'limits': 'Structural checks only. Semantic exclusion, evidence sufficiency and independence require the report; no statistical or primary-source replay.'
}, indent=2))
