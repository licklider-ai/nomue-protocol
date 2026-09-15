"""Emit only allowlisted public synthetic test receipts for durable connector retrieval.

No secret/environment dump, arbitrary path argument, input mutation or upload.
The GitHub artifact remains the primary run artifact; this exact-byte duplicate
can be recovered from authenticated job logs when a materialized download fails.
"""
import base64
import gzip
import hashlib
import json
import os
from pathlib import Path
import subprocess

root = Path(__file__).resolve().parents[4]
observations = Path(os.environ['RUNNER_TEMP']) / 'holm-adoption-observations'
paths = [(root / name, name) for name in [
    'host-guard-results.json', 'execution-host.json',
    'execution-cgroup-results.json', 'candidate-public-receipts.json']]
paths += [(observations / name, 'adoption-observations/' + name) for name in [
    'RESULTS.json', 'PUBLIC-RESULTS.json', 'BUDGET-RESULTS.json',
    'SEPARATION-RESULTS.json', 'FIXTURE-RESULTS.json', 'ADOPTION-RESULTS.json']]
files = []
for path, name in paths:
    raw = path.read_bytes()
    if len(raw) > 8 * 1024 * 1024:
        raise ValueError('unexpected receipt size: ' + name)
    files.append({'name': name, 'bytes': len(raw),
                  'sha256': hashlib.sha256(raw).hexdigest(),
                  'base64': base64.b64encode(raw).decode('ascii')})
event = json.loads(Path(os.environ['GITHUB_EVENT_PATH']).read_text())
payload = {'format': 'r3-holm-ci-evidence-v1',
           'run_id': os.environ['GITHUB_RUN_ID'],
           'event': os.environ['GITHUB_EVENT_NAME'],
           'event_head_sha': event.get('pull_request', {}).get('head', {}).get('sha'),
           'event_sha': os.environ['GITHUB_SHA'],
           'checkout_sha': subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=root, text=True).strip(),
           'checkout_tree': subprocess.check_output(['git', 'rev-parse', 'HEAD^{tree}'], cwd=root, text=True).strip(),
           'files': files}
raw = json.dumps(payload, sort_keys=True, separators=(',', ':')).encode()
packed = gzip.compress(raw, mtime=0)
encoded = base64.b64encode(packed).decode('ascii')
chunks = [encoded[i:i+6000] for i in range(0, len(encoded), 6000)]
print('NOMUE_CI_EVIDENCE_SHA256 ' + hashlib.sha256(packed).hexdigest())
for i, chunk in enumerate(chunks, 1):
    print(f'NOMUE_CI_EVIDENCE_V1 {i}/{len(chunks)} {chunk}')
