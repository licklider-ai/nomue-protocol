"""Verify trusted local source snapshots before importing candidate modules.
The manifest and this loader remain trusted; this is not authenticated storage.
"""
from pathlib import Path
import hashlib
import json

def verify(root=None):
    root = Path(__file__).resolve().parent if root is None else Path(root)
    manifest = json.loads((root / 'INPUTS.json').read_text())
    for name, expected in manifest['runtime_sha256'].items():
        if hashlib.sha256((root / name).read_bytes()).hexdigest() != expected:
            raise ValueError('source hash mismatch: ' + name)
