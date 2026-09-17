"""Verify the Release 4 T12 whole-candidate freeze without generating evidence."""

from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path
import subprocess
import sys

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
MANIFEST = HERE / "FREEZE-MANIFEST.json"
SOURCE = "5478f30981da04faded03eaa0d15419a6665210d"
BASE = "3880db43a64e1758494f3c78f6850daab0e3e9e9"
STATUS = "UNISSUED CANDIDATE"


def require(condition: bool, message: str) -> None:
    if not condition:
        raise ValueError(message)


def git(*args: str) -> bytes:
    return subprocess.check_output(
        ["git", "-c", "safe.directory=" + ROOT.as_posix(), "-C", str(ROOT), *args]
    )


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def run(command: list[str]) -> None:
    subprocess.run(command, cwd=ROOT, check=True)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--deep", action="store_true", help="run existing T06-T11 packet checkers"
    )
    args = parser.parse_args()

    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    require(manifest["status"] == STATUS, "freeze status")
    require(manifest["repository"] == "licklider-ai/nomue-protocol", "repository identity")
    require(manifest["candidate_source_commit"] == SOURCE, "candidate source commit")
    require(manifest["formal_baseline_commit"] == BASE, "formal baseline commit")
    require(manifest["release_4_issued"] is False, "Release 4 issuance flag")

    commits = [item["commit"] for item in manifest["chronology"]]
    for commit in commits + [BASE, SOURCE]:
        require(
            git("cat-file", "-t", commit).strip() == b"commit",
            "missing commit " + commit,
        )

    chain = manifest["candidate_ancestry"]
    for older, newer in zip(chain, chain[1:]):
        run(
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
            ]
        )
    run(
        [
            "git",
            "-c",
            "safe.directory=" + ROOT.as_posix(),
            "-C",
            str(ROOT),
            "merge-base",
            "--is-ancestor",
            SOURCE,
            "HEAD",
        ]
    )

    seen: set[tuple[str, str]] = set()
    for item in manifest["inventory"]:
        key = (item["source_commit"], item["path"])
        require(key not in seen, "duplicate inventory binding " + repr(key))
        seen.add(key)
        data = git("show", item["source_commit"] + ":" + item["path"])
        require(sha256(data) == item["sha256"], "inventory hash " + item["id"])
        require(len(data) == item["bytes"], "inventory length " + item["id"])
        require(
            item["provenance"] in {"historical", "reused", "newly frozen"},
            "provenance " + item["id"],
        )

    for item in manifest["package_files"]:
        data = (HERE / item["path"]).read_bytes().replace(b"\r\n", b"\n")
        require(sha256(data) == item["sha256"], "package hash " + item["path"])
        require(len(data) == item["bytes"], "package length " + item["path"])

    receipt = json.loads(
        (HERE / "REPRODUCTION-RECEIPT.json").read_text(encoding="utf-8")
    )
    manifest_bytes = MANIFEST.read_bytes().replace(b"\r\n", b"\n")
    require(receipt["result"] == "PASS", "T12 receipt result")
    require(
        receipt["candidate_source_commit"] == SOURCE,
        "T12 receipt source commit",
    )
    require(
        receipt["freeze_manifest"]["sha256"] == sha256(manifest_bytes),
        "T12 receipt manifest hash",
    )
    require(
        receipt["new_semantics_introduced"] is False
        and receipt["formal_surfaces_changed"] is False
        and receipt["release_4_issued"] is False,
        "T12 receipt preservation flags",
    )

    for path in manifest["protected_trees"]:
        require(
            git("diff", "--name-only", BASE, SOURCE, "--", path).strip() == b"",
            "protected surface drift " + path,
        )

    allowed = (
        ".github/workflows/r4-t09-candidate.yml",
        ".github/workflows/r4-t10-corrected-corpus.yml",
        ".github/workflows/r4-t11-regression.yml",
        ".prettierignore",
    )
    candidate_changes = git("diff", "--name-only", BASE, SOURCE).decode().splitlines()
    require(
        all(
            path in allowed
            or path.startswith("governance/drafts/release-4-preparation/t0")
            or path.startswith("governance/drafts/release-4-preparation/t1")
            for path in candidate_changes
        ),
        "candidate publication or unrelated source change",
    )
    post_source = git("diff", "--name-only", SOURCE, "HEAD").decode().splitlines()
    prefix = HERE.relative_to(ROOT).as_posix() + "/"
    require(
        all(path.startswith(prefix) for path in post_source),
        "post-T11 change outside T12 package",
    )

    t06_path = ROOT / (
        "governance/drafts/release-4-preparation/"
        "t06-candidate-requirement-surfaces-20260915/CANDIDATE.json"
    )
    t06 = json.loads(t06_path.read_text(encoding="utf-8"))
    require(t06["bundle_binding"]["supported"] is False, "T06 supported flag")
    require(len(t06["quantities"]) == 22, "T06 quantity count")
    require(len(t06["requirements"]) == 16, "T06 Requirement count")
    require(
        all(item["status"] == STATUS for item in t06["requirements"]),
        "T06 issuance status",
    )

    t10_path = ROOT / (
        "governance/drafts/release-4-preparation/"
        "t10-repaired-candidate-comparison-20260915/CAPTURE.json"
    )
    t10 = json.loads(t10_path.read_text(encoding="utf-8"))
    require(
        t10["headSha"] == "98052127e51efbed12580077c3a6e4e002af3a11",
        "T10 Linux source binding",
    )
    require(t10["conclusion"] == "success", "T10 Linux conclusion")
    t11_path = ROOT / (
        "governance/drafts/release-4-preparation/"
        "t11-old-version-shared-change-regression-20260915/LINUX-RECEIPT.json"
    )
    t11 = json.loads(t11_path.read_text(encoding="utf-8"))
    require(
        t11["source_commit"] == "2dcb4255cfbfefa2f22ad9c35b0717281cae563a",
        "T11 Linux source binding",
    )
    require(all(item["exit_code"] == 0 for item in t11["runs"]), "T11 Linux receipt")
    continuation_path = ROOT / (
        "governance/drafts/release-4-preparation/"
        "t11-old-version-shared-change-regression-20260915/CONTINUATION-MANIFEST.json"
    )
    continuation = json.loads(continuation_path.read_text(encoding="utf-8"))
    for path, expected in continuation["sha256"].items():
        data = (ROOT / path).read_bytes().replace(b"\r\n", b"\n")
        require(sha256(data) == expected, "T11 continuation hash " + path)
    require(
        continuation["linux_run_id"] == 34944226774
        and continuation["linux_source_commit"]
        == "2dcb4255cfbfefa2f22ad9c35b0717281cae563a",
        "T11 continuation run binding",
    )

    report = (HERE / "REPORT.md").read_text(encoding="utf-8")
    for boundary in manifest["semantic_boundaries"]:
        require(boundary["witness"] in report, "semantic boundary " + boundary["id"])

    if args.deep:
        scripts = [
            "governance/drafts/release-4-preparation/t06-candidate-requirement-surfaces-20260915/verify_candidate.py",
            "governance/drafts/release-4-preparation/t07-closed-schemas-validator-20260915/verify_packet.py",
            "governance/drafts/release-4-preparation/t08-limited-numerical-adapter-20260915/verify_packet.py",
            "governance/drafts/release-4-preparation/t10-independent-expectation-corpus-20260915/check_corpus.py",
            "governance/drafts/release-4-preparation/t10-independent-expectation-corpus-revision-2-20260915/check_revision.py",
        ]
        for script in scripts:
            run([sys.executable, "-B", script])

    print(
        json.dumps(
            {
                "result": "PASS",
                "inventory_items": len(manifest["inventory"]),
                "package_files": len(manifest["package_files"]),
                "commits": len(set(commits)),
                "protected_trees": len(manifest["protected_trees"]),
                "deep": args.deep,
                "status": STATUS,
            }
        )
    )


if __name__ == "__main__":
    main()
