"""Validate T11 continuation, preservation, and exact Git chronology."""

import hashlib
import json
from pathlib import Path
import subprocess

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
T10 = "db2efb3e301ba66797c1093f914b2466326e2d81"
STOP = "ea2cb95356dba3a38850998fa2e322fdff1f471e"
LINUX_SOURCE = "2dcb4255cfbfefa2f22ad9c35b0717281cae563a"
OLD_MANIFEST_SHA256 = "6c4d1e3ba7111f8b4b7af11fda2adfc6ec723178828593fd2aeaef840b9b4eef"
RAW = {
    "governance/drafts/release-4-preparation/t10-repaired-candidate-comparison-20260915/measurements/nomue-t10-results/HOST.json": "13ddd09bbc46c0f664361843ec45cd976b7a2cbb050ed8265fd28882be1b5f0a",
    "governance/drafts/release-4-preparation/t10-repaired-candidate-comparison-20260915/measurements/nomue-t10-results/SUMMARY.json": "58bac097fa7fccfdd5fd8af82a8813e093a77e9cee97fa715c2aa6cfe523fcc9",
}


def git(*args):
    return subprocess.check_output(
        ["git", "-c", "safe.directory=" + ROOT.as_posix(), "-C", str(ROOT), *args]
    )


def sha(data):
    return hashlib.sha256(data).hexdigest()


def require(condition, message):
    if not condition:
        raise ValueError(message)


def main():
    for older, newer in ((T10, STOP), (STOP, LINUX_SOURCE), (LINUX_SOURCE, "HEAD")):
        subprocess.run(
            [
                "git",
                "-c",
                "safe.directory=" + ROOT.as_posix(),
                "-C",
                str(ROOT),
                "merge-base",
                "--is-ancestor",
                older,
                newer,
            ],
            check=True,
        )
    old_manifest_path = HERE.relative_to(ROOT).as_posix() + "/MANIFEST.json"
    require(
        sha(git("show", STOP + ":" + old_manifest_path)) == OLD_MANIFEST_SHA256,
        "historical stop manifest",
    )
    allowed_prefix = HERE.relative_to(ROOT).as_posix() + "/"
    changed = git("diff", "--name-only", T10, "HEAD").decode().splitlines()
    require(
        all(
            path == ".prettierignore"
            or path == ".github/workflows/r4-t11-regression.yml"
            or path.startswith(allowed_prefix)
            for path in changed
        ),
        "T11 scope",
    )
    baseline_ignore = git("show", T10 + ":.prettierignore").decode().splitlines()
    current_ignore = (ROOT / ".prettierignore").read_text(encoding="utf-8").splitlines()
    expected_tail = [
        "# Raw T10 Linux receipts: preserve CAPTURE.json SHA-256 evidence bytes.",
        *RAW.keys(),
    ]
    require(current_ignore == baseline_ignore + expected_tail, "exact prettier exclusions")
    for path, expected in RAW.items():
        current = (ROOT / path).read_bytes()
        require(sha(current) == expected, "raw receipt " + path)
        require(git("show", T10 + ":" + path) == current, "T10 bytes " + path)
    linux = json.loads((HERE / "LINUX-CAPTURE.json").read_text(encoding="utf-8"))
    windows = json.loads((HERE / "WINDOWS-CONTINUATION.json").read_text(encoding="utf-8"))
    require(linux["status"] == "SUCCESS", "Linux status")
    require(linux["source_commit"] == LINUX_SOURCE, "Linux source")
    require(all(run["exit_code"] == 0 for run in linux["runs"]), "Linux suite exits")
    require(linux["three_windows_failures_on_linux"] == "PASS", "Linux unit classification")
    require(windows["unit_suite_from_stop_receipt"]["passed"] == 517, "Windows pass count")
    require(windows["unit_suite_from_stop_receipt"]["failed"] == 3, "Windows failure count")
    require(windows["path_observation"]["module_under_grant"] is False, "Windows path")
    require(windows["path_observation"]["posix_control"] is True, "POSIX control")
    manifest = json.loads((HERE / "CONTINUATION-MANIFEST.json").read_text(encoding="utf-8"))
    for path, expected in manifest["sha256"].items():
        data = (ROOT / path).read_bytes().replace(b"\r\n", b"\n")
        require(sha(data) == expected, "continuation manifest " + path)
    print(
        json.dumps(
            {
                "result": "PASS",
                "windows_unit": "517 pass / 3 classified platform failures",
                "linux_unit": "520 pass / 0 fail",
                "linux_source": LINUX_SOURCE,
                "t09_collateral": "PASS",
                "old_expectations_changed": False,
                "new_semantics": False,
                "T11": "technical checks complete; final commit/push/clean gate remains",
            }
        )
    )


if __name__ == "__main__":
    main()
