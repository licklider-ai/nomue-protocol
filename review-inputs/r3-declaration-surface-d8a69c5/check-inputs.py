"""Reviewer checks of immutable objects, manifests and output-only scope."""
import collections
import hashlib
import json
import pathlib
import re
import subprocess

ROOT = pathlib.Path(__file__).resolve().parents[2]
TARGET = 'd8a69c570d2b376a62f649cfb32765f1fbb646d8'
PARENT = 'dedd26a3e0655001b67e40ccfb741e43ecb07beb'
SOURCE = '7774242f0df81342c5abca97a8fbe40844306fa6'
CANDIDATE = 'governance/drafts/release-3-preparation/declaration-surface-20260910/'
OUTPUT = 'review-inputs/r3-declaration-surface-d8a69c5/'


def git(*args):
    return subprocess.check_output(['git', *args], cwd=ROOT)


def inventory(ref):
    entries = {}
    for row in git('ls-tree', '-rz', ref).split(b'\0'):
        if row:
            meta, path = row.split(b'\t', 1)
            entries[path.decode()] = meta.decode()
    return entries


raw = git('cat-file', 'commit', TARGET)
assert hashlib.sha1(b'commit ' + str(len(raw)).encode() + b'\0' + raw).hexdigest() == TARGET
headers = raw.split(b'\n\n', 1)[0].decode().splitlines()
assert [s[7:] for s in headers if s.startswith('parent ')] == [PARENT]
assert headers[0] == 'tree 0b03d0fb6ee49a127df9de7cfbfb47d47ee7d731'
base, target = inventory(PARENT), inventory(TARGET)
assert all(target.get(p) == v for p, v in base.items())
added = sorted(set(target) - set(base))
assert len(added) == 13 and all(p.startswith(CANDIDATE) for p in added)
manifest = json.loads(git('show', TARGET + ':' + CANDIDATE + 'INPUTS.json'))
assert len(manifest['inputs']) == 25
assert len({(i['commit'], i['path']) for i in manifest['inputs']}) == 25
pins = []
for item in manifest['inputs']:
    ref = item['commit'] + ':' + item['path']
    data = git('cat-file', 'blob', ref)
    sha = hashlib.sha256(data).hexdigest()
    blob = hashlib.sha1(b'blob ' + str(len(data)).encode() + b'\0' + data).hexdigest()
    assert (len(data), sha, blob) == (item['bytes'], item['sha256'], item['blob'])
    assert item['url'] == 'https://github.com/licklider-ai/nomue-protocol/blob/' + item['commit'] + '/' + item['path']
    pins.append({'commit': item['commit'], 'path': item['path'], 'blob': blob, 'bytes': len(data), 'sha256': sha})
assert git('show', '-s', '--format=%P', SOURCE).decode().strip().split() == manifest['source_parents']
for label in ['base', 'source']:
    assert git('rev-parse', manifest[label + '_commit'] + '^{tree}').decode().strip() == manifest[label + '_tree']
map_text = git('show', SOURCE + ':governance/drafts/release-3-preparation/supplied-scope-opening-record.md').decode()
rows = re.findall(r'^\| ((?:OMN|PVL|CLS|APR|HET|MTO|MCB|FDR|RSM)-\d+)\s*\|[^\n]*?\| (R3-CAND|RES-ONLY|TRANSFER|REJECT)\s*\|', map_text, re.M)
assert len(rows) == len(dict(rows)) == 49
counts = dict(collections.Counter(state for _, state in rows))
assert counts == {'R3-CAND': 15, 'RES-ONLY': 27, 'TRANSFER': 5, 'REJECT': 2}
for label in manifest['collision_scan']['labels']:
    for ref in [PARENT, SOURCE]:
        r = subprocess.run(['git', 'grep', '-F', label, ref, '--'], cwd=ROOT, capture_output=True)
        assert r.returncode == 1
changes = git('diff', '--name-status', TARGET, '--').decode().splitlines()
assert all(row.startswith('A\t' + OUTPUT) for row in changes), changes
untracked = git('ls-files', '--others', '--exclude-standard').decode().splitlines()
assert all(p.startswith(OUTPUT) for p in untracked), untracked
print(json.dumps({'review_commit': TARGET, 'parent': PARENT, 'tree': headers[0][5:], 'source_commit': SOURCE, 'source_tree': manifest['source_tree'], 'base_paths_preserved_with_modes': len(base), 'candidate_added_paths': added, 'pins': pins, 'pins_matched': 25, 'classification_counts': counts, 'classifications': dict(rows), 'collision_matches': 0, 'candidate_modified_by_review': False, 'review_changes_confined_to': OUTPUT}, indent=2))
