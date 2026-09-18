"""Read-only custody check; never extracts or executes archived source."""
import hashlib
import json
from pathlib import Path, PurePosixPath
import zipfile

HERE = Path(__file__).resolve().parent
manifest = json.loads((HERE / 'EVIDENCE.json').read_text())
for entry in manifest['artifacts']:
    raw = (HERE / entry['file']).read_bytes()
    assert len(raw) == entry['bytes'], entry['file']
    assert hashlib.sha256(raw).hexdigest() == entry['sha256'], entry['file']
    with zipfile.ZipFile(HERE / entry['file']) as archive:
        names = archive.namelist()
        assert len(names) == entry['members'] and len(set(names)) == len(names)
        for item in archive.infolist():
            path = PurePosixPath(item.filename)
            assert not path.is_absolute() and '..' not in path.parts
            assert '\\' not in item.filename
            assert (item.external_attr >> 16) & 0o170000 != 0o120000
        assert archive.testzip() is None
        result = json.loads(archive.read('RESULTS.json'))
        assert result['passed'] == result['total'] == entry['total']
        assert len(result['rows']) == entry['total']
        assert all(row['pass'] for row in result['rows'])
        if entry.get('helper_cases'):
            helper = json.loads(archive.read('helper-faults/RESULTS.json'))
            assert helper['passed'] == helper['total'] == entry['helper_cases']
            assert helper['inventory_sha256'] == entry['runtime_manifest_sha256']
            assert sum('evidence_class' in r for r in result['rows']) == entry['helper_cases']
        print(f"{entry['file']}: exact ZIP hash, member safety, {entry['total']} results OK")
print('Custody check only; not independent review, host qualification or D1 closure.')
