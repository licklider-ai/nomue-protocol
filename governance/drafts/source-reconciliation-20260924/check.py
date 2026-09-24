"""Check receipt identity and frozen packet bytes; not scientific validity."""

import argparse
import hashlib
import json
import subprocess
import zipfile
from pathlib import Path, PurePosixPath


def require(condition, message):
    if not condition:
        raise ValueError(message)


def sha(data):
    return hashlib.sha256(data).hexdigest()


packet = Path(__file__).resolve().parent
repo = packet.parents[2]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--archive", type=Path)
parser.add_argument("--extracted-dir", type=Path)
args = parser.parse_args()
sources = json.loads((packet / "SOURCES.json").read_text(encoding="utf-8"))
target = json.loads((packet / "TARGET.json").read_text(encoding="utf-8"))
require(len(sources["artifacts"]) == 17, "expected 17 artifacts")
require(len({a["original_filename"] for a in sources["artifacts"]}) == 17,
        "duplicate source basenames")
require(not list(packet.glob("*.pdf")), "PDF in public packet")
for entry in target["files"]:
    data = (packet / entry["path"]).read_bytes()
    require(len(data) == entry["bytes"] and sha(data) == entry["sha256"],
            "target changed: " + entry["path"])
matched = 0
for artifact in sources["artifacts"]:
    previous = artifact["prior_match"]
    if previous:
        data = subprocess.check_output(
            ["git", "show", previous["commit"] + ":" + previous["path"]], cwd=repo)
        require(sha(data) == previous["record_sha256"], "prior record changed")
        require(artifact["sha256"].encode() in data, "prior hash not recorded")
        matched += 1
    require(artifact["mapping"]["reopen"] == "no", "unexpected closure reopening")
    for evidence in artifact["mapping"]["repository_evidence"]:
        require((repo / evidence).is_file(), "missing evidence: " + evidence)
require(matched == 16, "expected 16 previous matches")
archive_result = "NOT_RUN - provide --archive to check original bytes"
if args.archive:
    raw = args.archive.read_bytes()
    require(len(raw) == sources["archive"]["byte_size"], "archive size mismatch")
    require(sha(raw) == sources["archive"]["sha256"], "archive hash mismatch")
    with zipfile.ZipFile(args.archive) as archive:
        entries = [e for e in archive.infolist() if not e.is_dir()]
        require(len(entries) == 17, "archive count mismatch")
        for artifact in sources["artifacts"]:
            index = artifact["received_artifact"]["archive_member_ordinal"] - 1
            entry = entries[index]
            require(PurePosixPath(entry.filename).name == artifact["original_filename"],
                    "archive member mismatch")
            data = archive.read(entry)
            require(len(data) == artifact["byte_size"] and sha(data) == artifact["sha256"],
                    "PDF content mismatch: " + artifact["original_filename"])
            if args.extracted_dir:
                require((args.extracted_dir / artifact["original_filename"]).read_bytes() == data,
                        "extracted copy mismatch: " + artifact["original_filename"])
    archive_result = "PASS - 17 exact original byte streams; archive unchanged"
require(not args.extracted_dir or args.archive, "--extracted-dir requires --archive")
print(json.dumps({"packet_identity": "PASS", "prior_sha256_matches": matched,
                  "sources": 17, "archive": archive_result,
                  "extracted_copies": "PASS" if args.extracted_dir else "NOT_RUN",
                  "scientific_or_release_gate": "NOT_ASSESSED"}, indent=2))
