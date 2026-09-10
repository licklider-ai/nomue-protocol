"""Read-only integrity check for the informative candidate map; not a scientific gate."""
import collections
import hashlib
import json
from pathlib import Path
import re
import subprocess

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
BASE = 'dedd26a3e0655001b67e40ccfb741e43ecb07beb'
OPENING = '7774242f0df81342c5abca97a8fbe40844306fa6'
CATALOGUE = '7bd9c5ab854777c3e99e624d9d2ed62731228852'
PREFIX = HERE.relative_to(ROOT).as_posix() + '/'


def git(*args):
    return subprocess.check_output(['git', '-C', str(ROOT), *args])


def catalogue_rows(content, opening=False):
    result = []
    for line in content.decode().splitlines():
        cells = [v.strip() for v in re.split(r'(?<!\\)\|', line)[1:-1]]
        if len(cells) < 4 or not re.fullmatch(
            r'(OMN|PVL|CLS|APR|HET|MTO|MCB|FDR|RSM)-\d\d', cells[0]
        ):
            continue
        match = re.search(r'R3-CAND|RES-ONLY|TRANSFER|REJECT', cells[2 if opening else 3])
        if match:
            result.append(dict(id=cells[0], name=cells[1], classification=match[0]))
    return result


manifest = json.loads((HERE / 'inputs.json').read_text())
package = json.loads((HERE / 'candidates.json').read_text())
accounting = json.loads((HERE / 'classification-check.json').read_text())
a = catalogue_rows(git('show', CATALOGUE + ':governance/drafts/release-3-preparation/semantic-research-result.md'))
b = catalogue_rows(git('show', OPENING + ':governance/drafts/release-3-preparation/supplied-scope-opening-record.md'), True)
assert a == b == accounting['rows']
assert len(a) == len({r['id'] for r in a}) == 49
assert dict(collections.Counter(r['classification'] for r in a)) == accounting['counts'] == {
    'R3-CAND': 15, 'RES-ONLY': 27, 'TRANSFER': 5, 'REJECT': 2
}
assert package['historical_source_ledger'] == {
    'CLOSED': ['SR-B','SR-C','SR-D','SR-F','SR-G','SR-I','SR-J','SR-K','SR-L'],
    'PARTIAL': ['SR-H'], 'INPUT_INCOMPLETE': ['SR-A','SR-E','RSM-01','RSM-02'],
    'SOURCE_SET_READY': False, 'overall': 'INPUT_INCOMPLETE', 'program_disposition': 'NARROW'
}
assert package['retained_numerical_holds'] == ['NB-' + str(i).zfill(2) for i in range(1,11)]
assert package['withdrawn_guarantees'] == ['B2','C3','G']
items = package['candidates']
assert len(items) == 15
assert {r['id'] for r in items} == {r['id'] for r in a if r['classification'] == 'R3-CAND'}
assert sorted(r['proposed_order'] for r in items) == list(range(1, 16))
assert package['first_candidate'] == 'PVL-03'
assert package['alternatives'] == ['PVL-01', 'PVL-07']
required = ['variant', 'target_hypotheses', 'inputs', 'proposed_outputs', 'assumptions',
            'guarantee_scope', 'decision_bearing_claims', 'primary_pinpoints',
            'evidence_keys', 'evidence_connection_gap', 'scientific_unresolved',
            'dependencies', 'next_minimum_work', 'ordering_reason']
for row in items:
    assert all(row.get(key) for key in required), row['id']
    assert row['name'] == next(r['name'] for r in a if r['id'] == row['id'])
    assert row['classification'] == 'R3-CAND'
    assert row['adoption'] == 'NOT_PERFORMED'
    assert row['implementation_eligibility'] == 'NOT_ESTABLISHED'
    assert row['opening_premise_exclusion_retained'] == (row['id'] in {'OMN-02','APR-09','FDR-01','FDR-02'})
    assert set(row['dependencies']) == {'numerical', 'structural', 'other_methods', 'holds'}
    assert all(key in package['evidence'] for key in row['evidence_keys'])
for entry in manifest['inputs'] + list(package['evidence'].values()):
    raw = git('show', entry['commit'] + ':' + entry['path'])
    assert git('rev-parse', entry['commit'] + ':' + entry['path']).decode().strip() == entry['blob']
    assert hashlib.sha256(raw).hexdigest() == entry['sha256']
    if 'url' in entry:
        assert entry['url'] == 'https://github.com/licklider-ai/nomue-protocol/blob/' + entry['commit'] + '/' + entry['path']
for key in ['base', 'opening']:
    item = manifest[key]
    assert git('show', '-s', '--format=%P', item['commit']).decode().strip() == item['sole_parent']
    assert git('rev-parse', item['commit'] + '^{tree}').decode().strip() == item['tree']
changed = git('diff', '--name-only', BASE).decode().splitlines()
staged = git('diff', '--cached', '--name-only', BASE).decode().splitlines()
untracked = git('ls-files', '--others', '--exclude-standard').decode().splitlines()
assert all(path.startswith(PREFIX) for path in changed + staged + untracked)
report = (HERE / 'REPORT.md').read_text()
assert all('### ' + row['id'] + ' — ' in report for row in items)
print(json.dumps({'result': 'PASS', 'classifications': 49, 'candidates': 15,
                  'evidence_files': len(package['evidence']), 'input_entries': len(manifest['inputs']),
                  'exclusions_preserved': True, 'changes_confined_to_output_directory': True}))
