"""Identity/accounting checks, not a scientific or independence gate.

Run from any directory in a clone containing the pinned Git objects. The original
map check runs in a temporary clean detached worktree. Review-output scope is
checked separately against the fixed reviewed commit.
"""
import collections
import hashlib
import json
from pathlib import Path
import re
import subprocess
import tempfile

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
REVIEW = '7f3321b5d8168611baba7647a864d862d87c0a55'
PARENT = 'dedd26a3e0655001b67e40ccfb741e43ecb07beb'
TREE = '84e98484d01bf9baac91ecf6adba96c83927bc49'
PREFIX = 'governance/drafts/release-3-preparation/candidate-evidence-map-20260910/'
OUT = 'review-inputs/r3-evidence-map-holm-7f3321b/'


def git(*args, root=ROOT):
    return subprocess.check_output(['git', '-C', str(root), *args])


def pinned(path):
    return git('show', REVIEW + ':' + path)


assert git('cat-file', '-t', REVIEW).strip() == b'commit'
assert git('show', '-s', '--format=%P', REVIEW).decode().strip() == PARENT
assert git('rev-parse', REVIEW + '^{tree}').decode().strip() == TREE
expected = sorted(PREFIX + n for n in [
    'REPORT.md', 'VALIDATION.md', 'candidates.json', 'classification-check.json',
    'inputs.json', 'check-map.py'
])
original_delta = git('diff-tree', '--no-commit-id', '--name-status', '-r', REVIEW).decode().splitlines()
assert sorted(original_delta) == ['A\t' + p for p in expected]
package = json.loads(pinned(PREFIX + 'candidates.json'))
manifest = json.loads(pinned(PREFIX + 'inputs.json'))
accounting = json.loads(pinned(PREFIX + 'classification-check.json'))
identities = []
for key, entry in package['evidence'].items():
    raw = git('show', entry['commit'] + ':' + entry['path'])
    blob = git('rev-parse', entry['commit'] + ':' + entry['path']).decode().strip()
    sha = hashlib.sha256(raw).hexdigest()
    assert (blob, sha, len(raw)) == (entry['blob'], entry['sha256'], entry['bytes'])
    assert any(all(entry[k] == item[k] for k in ['commit', 'path', 'blob', 'sha256'])
               for item in manifest['inputs'])
    identities.append(dict(key=key, commit=entry['commit'], path=entry['path'],
                           blob=blob, sha256=sha, bytes=len(raw)))
# Independently extract all 49 exact names and classifications in both inputs.
parsed = []
for key, column in [('catalogue', 3), ('opening', 2)]:
    entry = package['evidence'][key]
    text = git('show', entry['commit'] + ':' + entry['path']).decode()
    rows = []
    for line in text.splitlines():
        cells = [c.strip() for c in re.split(r'(?<!\\)\|', line)[1:-1]]
        if len(cells) < 4 or not re.fullmatch(r'(OMN|PVL|CLS|APR|HET|MTO|MCB|FDR|RSM)-\d{2}', cells[0]):
            continue
        match = re.search(r'R3-CAND|RES-ONLY|TRANSFER|REJECT', cells[column])
        if match:
            rows.append(dict(id=cells[0], name=cells[1], classification=match[0]))
    parsed.append(rows)
assert parsed[0] == parsed[1] == accounting['rows']
assert len(parsed[0]) == len({r['id'] for r in parsed[0]}) == 49
counts = dict(collections.Counter(r['classification'] for r in parsed[0]))
assert counts == {'R3-CAND': 15, 'RES-ONLY': 27, 'TRANSFER': 5, 'REJECT': 2}
manual = (HERE / 'CANDIDATE-CONNECTIONS.md').read_text()
manual_ids = re.findall(r'^\| ((?:OMN|PVL|CLS|APR|HET|MTO|FDR)-\d{2}) +\|', manual, re.M)
assert manual_ids == [r['id'] for r in package['candidates']]
# Check explicitly cited locator anchors exist. Presence is not claim truth.
anchors = {
    'holm_source': ['L3', 'L4', 'L5', 'FND1-H01', '43a5a10279f8bf1752a3e8d4a8407f9717579f8f903be4bcd62d969e82d573af'],
    'multiplicity_review': ['C-05', 'the original texts could not be opened'],
    'opening': ['2.1', 'not a finding that no such record exists'],
    'numerical': ['uncertified numerical observations', 'N-08', 'N-17'],
    'allpairs_source': ['(1.2)', 'Hayter'],
}
for key, needles in anchors.items():
    entry = package['evidence'][key]
    body = git('show', entry['commit'] + ':' + entry['path']).decode()
    for needle in needles:
        assert needle in body, (key, needle)
# Original scope check is deliberately isolated from added review outputs.
with tempfile.TemporaryDirectory(prefix='r3-map-clean-') as temp:
    clean = Path(temp) / 'tree'
    subprocess.run(['git', '-C', str(ROOT), 'worktree', 'add', '--detach', str(clean), REVIEW],
                   check=True, capture_output=True)
    try:
        assert not git('status', '--porcelain', root=clean)
        result = subprocess.check_output(['python', str(clean / PREFIX / 'check-map.py')], cwd=clean)
        original_check = json.loads(result)
        assert original_check['result'] == 'PASS'
        assert not git('status', '--porcelain', root=clean)
    finally:
        subprocess.run(['git', '-C', str(ROOT), 'worktree', 'remove', str(clean)],
                       check=True, capture_output=True)
# Review change scope, separately from original delta and original scope check.
tracked = git('diff', '--name-status', REVIEW).decode().splitlines()
for line in tracked:
    status, path = line.split('\t')
    assert status == 'A' and path.startswith(OUT), line
untracked = git('ls-files', '--others', '--exclude-standard').decode().splitlines()
assert all(p.startswith(OUT) for p in untracked), untracked
for path in expected:
    assert (ROOT / path).read_bytes() == pinned(path), path
assert not git('diff', '--check', REVIEW)
print(json.dumps({
    'result': 'PASS', 'review_commit': REVIEW, 'sole_parent': PARENT, 'tree': TREE,
    'original_delta': original_delta, 'original_clean_worktree_check': original_check,
    'original_clean_before_and_after': True,
    'review_scope_checked_separately': True,
    'review_added_paths': sorted([s.split('\t')[1] for s in tracked] + untracked),
    'classification_counts': counts, 'exact_classification_rows': parsed[0],
    'manual_candidate_connections_present': manual_ids,
    'manual_assessment_not_proved_by_script': True,
    'locator_anchors_checked': anchors,
    'evidence_identities': identities,
    'omissions': ['primary PDF reread and rehash', 'numerical research replay',
                  'full implementation test suite', 'full mathematical reproof',
                  'independent model or human authentication']
}, indent=2))
