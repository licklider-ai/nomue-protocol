"""Check the archived exact-byte synthetic CI receipts without refreshing them."""
import base64
import gzip
import hashlib
import json
from pathlib import Path

p = Path(__file__).resolve().parent / 'ci'
manifest = json.loads((p / 'MEMBERS.json').read_text())
packed = base64.b64decode(''.join((p / 'RECEIPTS.json.gz.base64.txt').read_text().split()), validate=True)
assert hashlib.sha256(packed).hexdigest() == manifest['gzip_sha256']
payload = json.loads(gzip.decompress(packed))
for key in ['format', 'run_id', 'event', 'event_head_sha', 'event_sha', 'checkout_sha', 'checkout_tree']:
    assert payload[key] == manifest[key], key
assert payload['run_id'] == '34726549437'
assert payload['event_head_sha'] == 'c999d8b3bf5ff3b8c58b0f018eb6c85b038c65ca'
assert payload['checkout_tree'] == '25388544b5f2094c1be497de6d09ab73487ed1ea'
assert len(payload['files']) == len(manifest['members']) == 10
decoded = {}
for entry, member in zip(payload['files'], manifest['members']):
    for key in ['name', 'bytes', 'sha256']:
        assert entry[key] == member[key], key
    archive = Path(member['archived_path'])
    assert archive.name == str(archive)
    raw = base64.b64decode(entry['base64'], validate=True)
    assert len(raw) == member['bytes']
    assert hashlib.sha256(raw).hexdigest() == member['sha256']
    assert raw == (p / archive).read_bytes()
    assert entry['name'] not in decoded
    decoded[entry['name']] = json.loads(raw)
execution = decoded['execution-cgroup-results.json']
assert execution['cgroup_tests'] == 'RUN'
assert execution['controls'] == execution['passed'] == len(execution['rows']) == 33
assert all(row['pass'] is True for row in execution['rows'])
assert decoded['candidate-public-receipts.json'] == {
    'receipts': 28, 'original_byte_forwards': 5, 'all_public_outputs_valid': True}
host = decoded['host-guard-results.json']
assert host['node'].startswith('v22.')
assert host['public_output']['refusal_kind'] == 'unsupported_execution'
evidence = host['receipt']['evidence']
assert evidence['leader_exit'] == 78
assert evidence['bytes_observed'] == {'stdout': 0, 'stderr': 0}
assert len(evidence['cleanup']) == 4 and all(evidence['cleanup'].values())
print('PASS: 10 exact-byte members; 33 execution controls; 28 public receipts; Node 22 refusal')
