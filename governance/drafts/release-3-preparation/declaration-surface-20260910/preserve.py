"""Verify pinned Git inputs and forbid changes outside this exploratory directory."""
import hashlib
import json
import pathlib
import subprocess

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[3]
PREFIX = HERE.relative_to(ROOT).as_posix() + "/"


def git(*args):
    return subprocess.check_output(["git", *args], cwd=ROOT)


manifest = json.loads((HERE / "INPUTS.json").read_text())
for label in ("base", "source"):
    assert git("rev-parse", manifest[label + "_commit"] + "^{tree}").decode().strip() == manifest[label + "_tree"]
for item in manifest["inputs"]:
    data = git("show", item["commit"] + ":" + item["path"])
    assert hashlib.sha256(data).hexdigest() == item["sha256"]
    assert len(data) == item["bytes"]
    assert git("rev-parse", item["commit"] + ":" + item["path"]).decode().strip() == item["blob"]
changes = git("diff", "--name-status", manifest["base_commit"], "--").decode().splitlines()
for line in changes:
    status, path = line.split("\t")
    assert status == "A" and path.startswith(PREFIX), line
untracked = git("ls-files", "--others", "--exclude-standard").decode().splitlines()
assert all(path.startswith(PREFIX) for path in untracked), untracked
for label in manifest["collision_scan"]["labels"]:
    for commit in manifest["collision_scan"]["commits"]:
        result = subprocess.run(["git", "grep", "-F", label, commit, "--"], cwd=ROOT, capture_output=True)
        assert result.returncode == 1, (commit, label, result.stdout)
print(json.dumps({"pinned_files": len(manifest["inputs"]), "pins_match": True, "outside_directory_changes": 0, "collision_matches_at_fixed_inputs": 0}, indent=2))
