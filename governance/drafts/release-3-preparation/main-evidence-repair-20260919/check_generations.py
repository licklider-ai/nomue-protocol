"""Verify fixed historical evidence and the explicitly approved successor inputs.

The archived checker executes unchanged in a temporary reconstruction. This does
not replay historical experiments or turn their receipts into current evidence.
Current experiment replay remains a separate, mandatory workflow step.
"""
import argparse
import hashlib
import json
from pathlib import Path
import subprocess
import sys
import tempfile

PACKET = Path("governance/drafts/release-3-preparation/main-evidence-repair-20260919")
ARCHIVE = Path("governance/drafts/release-3-preparation/r3-followup-review-20260911")
MAP = "governance/drafts/release-3-preparation/holm-adoption-map-repair-20260911/INPUTS.json"
RESULTS = "governance/drafts/release-3-preparation/holm-repaired-candidate-20260911/RESULTS.json"
WORKFLOW = ".github/workflows/r3-holm-checkpoint-candidate.yml"
GUARD = "tooling/maintenance/pinned-contribution-source.mjs"


def require(condition, message):
    if not condition:
        raise ValueError(message)


def read(root, relative):
    path = Path(relative)
    require(not path.is_absolute() and ".." not in path.parts, "unsafe evidence path")
    target = root / path
    require(target.resolve().is_relative_to(root.resolve()), "external evidence path")
    require(not target.is_symlink() and target.is_file(), f"regular file required: {path}")
    return target.read_bytes()


def digest(data):
    return hashlib.sha256(data).hexdigest()


def pinned(root, path, expected):
    data = read(root, path)
    require(digest(data) == expected, f"source drift: {path}")
    return data


def index(rows):
    result = {row["path"]: row for row in rows}
    require(len(result) == len(rows), "duplicate source path")
    return result


def prepare(root, destination):
    transition = json.loads(read(root, PACKET / "TRANSITION.json"))
    entries = index(transition["transitions"])
    require(set(entries) == {MAP, RESULTS, WORKFLOW}, "unexpected transition scope")
    historical = {}
    current = {}
    for path, row in entries.items():
        historical[path] = pinned(root, PACKET / row["historical_copy"], row["old_sha256"])
        current[path] = pinned(root, path, row["new_sha256"])
    controls = index(transition["preserved_controls"])
    require(set(controls) == {str(ARCHIVE / "check_evidence.py"), str(ARCHIVE / "SHA256SUMS.txt"), GUARD}, "unexpected preserved control scope")
    for row in controls.values():
        pinned(root, row["path"], row["sha256"])

    integration = json.loads(read(root, ARCHIVE / "ci/INTEGRATION.json"))
    require(integration["tested_head"] == transition["historical_tested_head"], "historical head drift")
    sources = index(integration["source_inputs"])
    for path in (MAP, WORKFLOW):
        require(sources[path]["sha256"] == entries[path]["old_sha256"], "archive/transition mismatch")
    for generation, data, count in (("historical", historical, 132), ("current", current, 134)):
        inventory = index(json.loads(data[MAP])["files"])
        require(inventory[RESULTS]["sha256"] == digest(data[RESULTS]), f"{generation} snapshot not bound")
        snapshot = json.loads(data[RESULTS])
        rows = [row for row in snapshot["rows"] if row.get("group") == "legacy_regression"]
        require(len(rows) == 1, "legacy regression row missing or duplicated")
        require(snapshot["legacy_fixtures"] == rows[0]["fixtures"] == count, f"{generation} count drift")

    def copy(path, data=None):
        target = destination / path
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(read(root, path) if data is None else data)

    # Preserve every archived byte, including checksum lists and the checker.
    for path in (root / ARCHIVE).rglob("*"):
        if path.is_file() and "__pycache__" not in path.parts:
            copy(path.relative_to(root))
    checks = json.loads(read(root, ARCHIVE / "ZIP-CHECKS.json"))
    for archive in checks["archives"]:
        for member in archive["members"]:
            copy(member["archived_path"])
    for row in checks["external_references"]:
        copy(row["path"])
    for path in sources:
        copy(path, historical.get(path))
    copy(RESULTS, historical[RESULTS])
    # Retain the already-approved instruction transition, without changing its pins.
    copy(GUARD)
    return {
        "historical_tested_head": integration["tested_head"],
        "historical_fixture_count": 132,
        "current_fixture_count": 134,
        "current_inputs_sha256": digest(current[MAP]),
        "current_results_sha256": digest(current[RESULTS]),
        "current_workflow_sha256": digest(current[WORKFLOW]),
        "scope": "source generations and archived evidence; current execution is checked separately",
    }


def verify(root):
    with tempfile.TemporaryDirectory(prefix="r3-historical-evidence-") as temporary:
        destination = Path(temporary)
        result = prepare(root, destination)
        # -I prevents PYTHONOPTIMIZE from disabling the original assertions.
        subprocess.run([sys.executable, "-I", str(destination / ARCHIVE / "check_evidence.py")], check=True)
    result["historical_archive_check"] = "pass"
    return result


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()
    result = verify(Path(__file__).resolve().parents[4])
    text = json.dumps(result, indent=2) + "\n"
    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(text)
    print(text, end="")
