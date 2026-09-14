"""Mutation controls for the archive verifier and historical oracle CI adapter."""
import copy
from contextlib import contextmanager
import hashlib
import json
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest

import validate_saved_evidence as archive
import validate_tail_oracle as oracle


class EvidenceControls(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.temporary = tempfile.TemporaryDirectory(prefix='r4-evidence-controls-')
        cls.addClassCleanup(cls.temporary.cleanup)
        cls.root = Path(cls.temporary.name) / 'repository'
        subprocess.run(['git', 'clone', '--quiet', '--shared', '--no-checkout',
                        str(archive.ROOT), str(cls.root)], check=True)
        subprocess.run(['git', 'checkout', '--quiet', '--detach', archive.ARCHIVE_COMMIT],
                       cwd=cls.root, check=True)
        cls.packet = cls.root / archive.DIRECTORY
        cls.manifest = json.loads((cls.packet / 'MANIFEST.json').read_text())
        cls.report = oracle.run()

    @contextmanager
    def changed(self, path, contents):
        before = path.read_bytes()
        path.write_bytes(contents)
        try:
            yield
        finally:
            path.write_bytes(before)

    def test_original_archive(self):
        self.assertEqual(archive.validate(self.root)['archive_files'], 12)

    def test_missing_history(self):
        with tempfile.TemporaryDirectory(prefix='r4-no-history-') as temporary:
            root = Path(temporary)
            subprocess.run(['git', 'init', '--quiet', str(root)], check=True)
            (root / archive.DIRECTORY).mkdir(parents=True)
            shutil.copyfile(self.packet / 'MANIFEST.json', root / archive.DIRECTORY / 'MANIFEST.json')
            with self.assertRaises(subprocess.CalledProcessError):
                archive.validate(root)

    def test_changed_saved_result(self):
        path = self.packet / 'execution.json'
        with self.changed(path, path.read_bytes() + b' '):
            with self.assertRaisesRegex(ValueError, 'SHA-256 mismatch'):
                archive.validate(self.root)

    def test_changed_result_and_rehashed_manifest(self):
        data = b'{}\n'
        manifest = copy.deepcopy(self.manifest)
        manifest['files'][0]['repository_sha256'] = hashlib.sha256(data).hexdigest()
        with self.changed(self.packet / manifest['files'][0]['path'], data):
            with self.changed(self.packet / 'MANIFEST.json', json.dumps(manifest).encode()):
                with self.assertRaisesRegex(ValueError, 'immutable evidence commit'):
                    archive.validate(self.root)

    def test_missing_result(self):
        path = self.packet / 'execution.json'
        before = path.read_bytes()
        path.unlink()
        try:
            with self.assertRaisesRegex(ValueError, 'inventory'):
                archive.validate(self.root)
        finally:
            path.write_bytes(before)

    def test_extra_result(self):
        path = self.packet / 'unexpected.json'
        path.write_text('{}')
        try:
            with self.assertRaisesRegex(ValueError, 'inventory'):
                archive.validate(self.root)
        finally:
            path.unlink()

    def test_symlink_result(self):
        path = self.packet / 'execution.json'
        before = path.read_bytes()
        path.unlink()
        path.symlink_to('execution-optimized.json')
        try:
            with self.assertRaisesRegex(ValueError, 'symlink'):
                archive.validate(self.root)
        finally:
            path.unlink()
            path.write_bytes(before)

    def test_runtime_drift(self):
        path = self.packet.parent / 'supervisor.py'
        with self.changed(path, path.read_bytes() + b'\n# drift\n'):
            with self.assertRaisesRegex(ValueError, 'working tree:'):
                archive.validate(self.root)

    def test_historical_input_drift(self):
        path = self.packet.parent / 'EXECUTION.json'
        with self.changed(path, b'{"rows": []}'):
            with self.assertRaisesRegex(ValueError, 'working tree:'):
                archive.validate(self.root)

    def test_original_oracle_report(self):
        self.assertEqual(oracle.validate_report(self.report)['values'], 17)

    def test_report_rejections(self):
        mutations = [
            lambda r: r.update(values=0, rows=[], all_agree=True),
            lambda r: r.update(values=16, rows=r['rows'][:-1]),
            lambda r: r.update(all_agree=False),
            lambda r: r.update(all_agree=1),
            lambda r: r['rows'][0].update({'agrees_within_1e-12': False}),
            lambda r: r['rows'][0].update(committed_encoding=float('nan')),
            lambda r: r['rows'][0].update(continued_fraction=float('inf')),
            lambda r: r['rows'][0].update(committed_encoding=2),
            lambda r: r['rows'][0].update(relative_difference=1),
            lambda r: r['rows'][0].update(committed_encoding=0.5),
            lambda r: r['rows'].__setitem__(1, copy.deepcopy(r['rows'][0])),
        ]
        for number, mutate in enumerate(mutations):
            with self.subTest(mutation=number):
                report = copy.deepcopy(self.report)
                mutate(report)
                with self.assertRaises(ValueError):
                    oracle.validate_report(report)

    def test_strict_json(self):
        for raw in ('{"x":1,"x":2}', '{"x":NaN}', '{"x":Infinity}'):
            with self.subTest(raw=raw), self.assertRaises(ValueError):
                archive.strict_json(raw)

    def test_cli_rejects_bad_inputs(self):
        with tempfile.TemporaryDirectory(prefix='r4-oracle-inputs-') as temporary:
            directory = Path(temporary) / oracle.HERE.relative_to(archive.ROOT)
            directory.mkdir(parents=True)
            for name in ('validate_tail_oracle.py', 'validate_saved_evidence.py',
                         'separate_tail_oracle.py', 'EXECUTION.json', 'BENCHMARKS.json'):
                shutil.copyfile(oracle.HERE / name, directory / name)
            def run():
                return subprocess.run([sys.executable, '-B', str(directory / 'validate_tail_oracle.py')],
                                      capture_output=True, text=True, timeout=60)
            self.assertEqual(run().returncode, 0)
            path = directory / 'EXECUTION.json'
            source = path.read_bytes()
            data = json.loads(source)
            for row in data['rows']:
                tails = row.get('receipt', {}).get('outcome', {}).get('result', {}).get('tails')
                if tails:
                    tails['A']['encoding'] = '3fe0000000000000'
                    break
            else:
                self.fail('mutation did not reach a tail')
            path.write_text(json.dumps(data))
            result = run()
            self.assertNotEqual(result.returncode, 0)
            self.assertIn('numerical disagreement', result.stderr)
            path.write_bytes(source)
            for name in ('EXECUTION.json', 'BENCHMARKS.json'):
                (directory / name).write_text('{"rows": []}')
            result = run()
            self.assertNotEqual(result.returncode, 0)
            self.assertIn('coverage', result.stderr)
            path.unlink()
            self.assertNotEqual(run().returncode, 0)


if __name__ == '__main__':
    unittest.main()
