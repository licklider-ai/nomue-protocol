"""Mutation checks for the historical/current source boundary, using real evidence."""
import importlib.util
import json
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
spec = importlib.util.spec_from_file_location("generations", HERE / "check_generations.py")
generations = importlib.util.module_from_spec(spec)
spec.loader.exec_module(generations)


class SourceGenerationTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory(prefix="r3-generation-mutation-")
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)
        for directory in (generations.PACKET, generations.ARCHIVE):
            shutil.copytree(ROOT / directory, self.root / directory, ignore=shutil.ignore_patterns("__pycache__"))
        integration = json.loads((ROOT / generations.ARCHIVE / "ci/INTEGRATION.json").read_text())
        checks = json.loads((ROOT / generations.ARCHIVE / "ZIP-CHECKS.json").read_text())
        paths = {row["path"] for row in integration["source_inputs"]}
        paths.update(row["path"] for row in checks["external_references"])
        paths.update(member["archived_path"] for row in checks["archives"] for member in row["members"])
        paths.update((generations.RESULTS, generations.GUARD))
        for path in paths:
            target = self.root / path
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes((ROOT / path).read_bytes())

    def reject(self, path):
        target = self.root / path
        target.write_bytes(target.read_bytes() + b"\n")
        with self.assertRaises((ValueError, subprocess.CalledProcessError)):
            generations.verify(self.root)

    def test_unchanged_evidence_and_successor_inputs_pass(self):
        result = generations.verify(self.root)
        self.assertEqual(result["historical_archive_check"], "pass")
        self.assertEqual((result["historical_fixture_count"], result["current_fixture_count"]), (132, 134))

    def test_current_inventory_drift(self):
        self.reject(generations.MAP)

    def test_current_snapshot_drift(self):
        self.reject(generations.RESULTS)

    def test_current_workflow_drift(self):
        self.reject(generations.WORKFLOW)

    def test_preserved_inventory_drift(self):
        self.reject(generations.PACKET / "historical/adoption-inputs.json.txt")

    def test_preserved_snapshot_drift(self):
        self.reject(generations.PACKET / "historical/candidate-results.json.txt")

    def test_preserved_workflow_drift(self):
        self.reject(generations.PACKET / "historical/checkpoint-workflow.yml.txt")

    def test_rehashed_historical_input_cannot_restate_archive(self):
        path = self.root / generations.PACKET / "TRANSITION.json"
        data = json.loads(path.read_text())
        row = next(row for row in data["transitions"] if row["path"] == generations.MAP)
        historical = self.root / generations.PACKET / row["historical_copy"]
        historical.write_bytes(historical.read_bytes() + b"\n")
        row["old_sha256"] = generations.digest(historical.read_bytes())
        path.write_text(json.dumps(data))
        with self.assertRaisesRegex(ValueError, "archive/transition mismatch"):
            generations.verify(self.root)

    def test_rehashed_current_result_still_requires_inventory_binding(self):
        path = self.root / generations.PACKET / "TRANSITION.json"
        data = json.loads(path.read_text())
        row = next(row for row in data["transitions"] if row["path"] == generations.RESULTS)
        current = self.root / generations.RESULTS
        current.write_bytes(current.read_bytes() + b"\n")
        row["new_sha256"] = generations.digest(current.read_bytes())
        path.write_text(json.dumps(data))
        with self.assertRaisesRegex(ValueError, "current snapshot not bound"):
            generations.verify(self.root)

    def test_unlisted_source_drift(self):
        self.reject("governance/drafts/release-3-preparation/holm-repaired-candidate-20260911/entry.mjs")

    def test_archived_member_drift(self):
        self.reject(generations.ARCHIVE / "ci/members/host-guard-results.json.txt")

    def test_archived_checksum_drift(self):
        self.reject(generations.ARCHIVE / "SHA256SUMS.txt")

    def test_original_checker_drift(self):
        self.reject(generations.ARCHIVE / "check_evidence.py")

    def test_instruction_drift(self):
        self.reject("AGENTS.md")

    def test_instruction_guard_drift(self):
        self.reject(generations.GUARD)

    def test_missing_transition_rejected(self):
        path = self.root / generations.PACKET / "TRANSITION.json"
        data = json.loads(path.read_text())
        data["transitions"] = [row for row in data["transitions"] if row["path"] != generations.MAP]
        path.write_text(json.dumps(data))
        with self.assertRaisesRegex(ValueError, "transition scope"):
            generations.verify(self.root)

    def test_missing_preserved_control_rejected(self):
        path = self.root / generations.PACKET / "TRANSITION.json"
        data = json.loads(path.read_text())
        data["preserved_controls"] = []
        path.write_text(json.dumps(data))
        with self.assertRaisesRegex(ValueError, "preserved control scope"):
            generations.verify(self.root)


if __name__ == "__main__":
    unittest.main()
