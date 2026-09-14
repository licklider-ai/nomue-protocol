"""Verify the immutable T02-SF01 archive; this does not authenticate CI stdout."""
import hashlib
import json
from pathlib import Path
import subprocess

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
ARCHIVE_COMMIT = '2732a26fd61d4e726fbd95b4d7622574cfcd9d82'
DIRECTORY = HERE.relative_to(ROOT).as_posix() + '/t02-sf01-validation'
WORKFLOW = '.github/workflows/r4-controlled-execution.yml'


def strict_json(raw):
    def pairs(items):
        result = {}
        for key, value in items:
            if key in result:
                raise ValueError('duplicate JSON member: ' + key)
            result[key] = value
        return result

    def constant(value):
        raise ValueError('non-finite JSON number: ' + value)

    return json.loads(raw, object_pairs_hook=pairs, parse_constant=constant)


def git_bytes(root, revision, path):
    return subprocess.check_output(['git', 'show', revision + ':' + path],
                                   cwd=root, stderr=subprocess.PIPE)


def local_bytes(root, path):
    relative = Path(path)
    if relative.is_absolute() or '..' in relative.parts:
        raise ValueError('invalid archive path')
    current = root
    for part in relative.parts:
        current = current / part
        if current.is_symlink():
            raise ValueError('symlink in archive path: ' + path)
    return current.read_bytes()


def match(raw, expected, label):
    if hashlib.sha256(raw).hexdigest() != expected:
        raise ValueError('SHA-256 mismatch: ' + label)


def validate(root=ROOT):
    manifest_path = DIRECTORY + '/MANIFEST.json'
    raw = local_bytes(root, manifest_path)
    # Anchor the inventory too: changing both data and its digest is not enough.
    if raw != git_bytes(root, ARCHIVE_COMMIT, manifest_path):
        raise ValueError('archive manifest differs from immutable evidence commit')
    manifest = strict_json(raw)
    tree = subprocess.check_output(
        ['git', 'rev-parse', manifest['executed_head'] + '^{tree}'],
        cwd=root, text=True).strip()
    if tree != manifest['executed_tree']:
        raise ValueError('executed tree mismatch')
    expected = {'MANIFEST.json', *(item['path'] for item in manifest['files'])}
    if {p.name for p in (root / DIRECTORY).iterdir()} != expected:
        raise ValueError('archive file inventory mismatch')
    for item in manifest['files']:
        path = DIRECTORY + '/' + item['path']
        saved = local_bytes(root, path)
        match(saved, item['repository_sha256'], path)
        strict_json(saved)
    groups = (
        (manifest['code_bindings'], manifest['executed_head']),
        (manifest['oracle_input_scope']['inputs'], manifest['executed_head']),
        (manifest['unchanged_from_review_base'], manifest['review_base']),
    )
    for rows, revision in groups:
        for item in rows:
            path = item['path']
            match(git_bytes(root, revision, path), item['sha256'], revision + ':' + path)
            # This successor workflow adds validation. Its historical bytes are
            # checked above; it is explicitly not the archived executed workflow.
            if path != WORKFLOW:
                match(local_bytes(root, path), item['sha256'], 'working tree:' + path)
    return {'archive_files': len(manifest['files']),
            'code_bindings': len(manifest['code_bindings']),
            'historical_bindings': sum(len(rows) for rows, _ in groups),
            'status': 'archive_consistent_not_ci_authentication'}


if __name__ == '__main__':
    print(json.dumps(validate(), indent=2))
