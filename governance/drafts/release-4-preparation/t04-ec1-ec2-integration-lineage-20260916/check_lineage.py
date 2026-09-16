"""Verify immutable EC1/EC2 provenance and the separate T03 main representation."""
import argparse
import hashlib
import json
from pathlib import Path
import subprocess
import sys
import tempfile


HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
INPUTS = json.loads((HERE / "INPUTS.json").read_text(encoding="utf-8"))
RESULTS = HERE / "RESULTS.json"
MANIFEST = HERE / "MANIFEST.json"


def require(condition, message):
    if not condition:
        raise AssertionError(message)


def sha256(data):
    return hashlib.sha256(data).hexdigest()


def git(*args, data=None):
    return subprocess.run(
        ["git", "-c", "safe.directory=" + ROOT.as_posix(), "-C", str(ROOT), *args],
        input=data,
        capture_output=True,
        check=True,
    ).stdout


def git_text(*args):
    return git(*args).decode("utf-8")


def blob(oid):
    return git("cat-file", "blob", oid)


def commit_blob(commit, path):
    return git_text("rev-parse", commit + ":" + path).strip()


def source_bytes(commit, path, expected_blob, expected_sha):
    require(commit_blob(commit, path) == expected_blob, "historical blob " + path)
    data = blob(expected_blob)
    require(sha256(data) == expected_sha, "historical SHA-256 " + path)
    return data


def historical_provenance():
    historical = INPUTS["historical_review"]
    t03 = source_bytes(
        historical["architecture_commit"],
        historical["t03_path"],
        historical["t03_blob"],
        historical["t03_sha256"],
    )
    require(
        commit_blob(historical["t03_reviewed_commit"], historical["t03_path"])
        == historical["t03_blob"],
        "reviewed T03 blob",
    )
    artifact_data = {}
    for artifact in historical["evidence_artifacts"]:
        data = git("show", historical["evidence_commit"] + ":" + artifact["path"])
        require(
            commit_blob(historical["evidence_commit"], artifact["path"])
            == artifact["git_blob"],
            "historical evidence blob " + artifact["path"],
        )
        if "sha256" in artifact:
            require(sha256(data) == artifact["sha256"], "historical evidence SHA-256 " + artifact["path"])
        artifact_data[artifact["path"]] = data
    original_inputs_path = historical["evidence_artifacts"][0]["path"]
    original_inputs = json.loads(artifact_data[original_inputs_path])
    require(original_inputs["input_commit"] == historical["architecture_commit"], "historical architecture input")
    require(len(original_inputs["files"]) == 22, "historical source-pin count")
    pinned = {}
    for item in original_inputs["files"]:
        data = source_bytes(
            historical["architecture_commit"], item["path"], item["git_blob"], item["sha256"]
        )
        pinned[item["path"]] = data
    require(pinned[historical["t03_path"]] == t03, "historical T03 source provenance")
    return historical, artifact_data, pinned


def replay_historical_checker(historical, artifacts, pinned):
    with tempfile.TemporaryDirectory(prefix="nomue-t04-ec12-historical-") as temporary:
        repository = Path(temporary) / "repository"
        for path, data in pinned.items():
            destination = repository / path
            destination.parent.mkdir(parents=True, exist_ok=True)
            destination.write_bytes(data)
        for path, data in artifacts.items():
            destination = repository / path
            destination.parent.mkdir(parents=True, exist_ok=True)
            destination.write_bytes(data)
        checker_path = repository / historical["evidence_artifacts"][1]["path"]
        command = [sys.executable]
        if sys.flags.optimize:
            command.append("-O")
        command.extend(["-B", str(checker_path), "--check"])
        completed = subprocess.run(command, capture_output=True, text=True)
        require(completed.returncode == 0, "historical checker exit: " + completed.stderr)
        output = json.loads(completed.stdout)
        require(output["checks"] == 5908, "historical checker count")
        require(
            output["sha256"]
            == "b78e1912e0b3856434a82aec0168646e152e747439fd67a18d6ccfd95fe8e4d7",
            "historical saved result digest",
        )
        require(output["matched_saved"] is True, "historical saved result equality")
        return {"checks": output["checks"], "saved_result_sha256": output["sha256"]}


def current_t03_binding(historical):
    current = INPUTS["current_integration"]
    path = current["t03_path"]
    current_data = source_bytes(
        current["t03_merge_commit"], path, current["t03_blob"], current["t03_sha256"]
    )
    require(
        commit_blob(current["t03_repair_commit"], path) == current["t03_blob"],
        "T03 repair representation blob",
    )
    require(
        git("merge-base", "--is-ancestor", current["t03_repair_commit"], current["t03_merge_commit"]) == b"",
        "T03 repair precedes main merge",
    )
    require(
        git("merge-base", "--is-ancestor", current["t03_merge_commit"], "HEAD") == b"",
        "integration base ancestry",
    )
    require((ROOT / path).read_bytes() == current_data, "current T03 working-tree representation")
    historical_data = source_bytes(
        historical["architecture_commit"],
        historical["t03_path"],
        historical["t03_blob"],
        historical["t03_sha256"],
    )
    old = (
        b"  at P. The explicit T03 follow-up notes now linked from those documents do not\n"
        b"  rewrite the meaning of their historical captures or reviews.\n"
    )
    new = (
        b"  at P. They remain immutable historical captures; this decision record and the\n"
        b"  Release 4 preparation README carry the later T03 candidate explanation without\n"
        b"  rewriting the meaning of those captures or their reviews.\n"
    )
    require(historical_data.count(old) == 1 and current_data.count(new) == 1, "known representation paragraph")
    require(historical_data.replace(old, b"<T03-PRESERVATION-PARAGRAPH>\n") == current_data.replace(new, b"<T03-PRESERVATION-PARAGRAPH>\n"), "T03 exact diff classification")
    return {
        "historical_sha256": historical["t03_sha256"],
        "current_sha256": current["t03_sha256"],
        "classification": "preservation-location-only",
    }


def validate_manifest():
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    files = {
        path.name: path
        for path in HERE.iterdir()
        if path.is_file() and path.name != "MANIFEST.json"
    }
    require({entry["path"] for entry in manifest["files"]} == set(files), "lineage manifest inventory")
    for entry in manifest["files"]:
        data = files[entry["path"]].read_bytes()
        require(sha256(data) == entry["sha256"], "lineage manifest SHA-256 " + entry["path"])
        require(len(data) == entry["bytes"], "lineage manifest bytes " + entry["path"])


def run():
    historical, artifacts, pinned = historical_provenance()
    replay = replay_historical_checker(historical, artifacts, pinned)
    current = current_t03_binding(historical)
    return {
        "status": "integration_lineage_verified_not_ec_closure",
        "historical_source_pins": len(pinned),
        "historical_replay": replay,
        "current_t03": current,
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--write", action="store_true")
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    result = run()
    encoded = (json.dumps(result, indent=2, sort_keys=True) + "\n").encode("utf-8")
    if args.write:
        RESULTS.write_bytes(encoded)
    if args.check:
        require(RESULTS.read_bytes() == encoded, "lineage saved result equality")
        validate_manifest()
    print(json.dumps({"matched_saved": args.check, "optimize": sys.flags.optimize, "sha256": sha256(encoded)}, sort_keys=True))


if __name__ == "__main__":
    main()
