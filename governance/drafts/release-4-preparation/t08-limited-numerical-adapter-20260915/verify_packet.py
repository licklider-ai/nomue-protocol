"""UNISSUED CANDIDATE. Verify frozen inputs and integration evidence, not truth."""
import hashlib
import json
from pathlib import Path
import re
import subprocess

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
STATUS = "UNISSUED CANDIDATE"


def require(ok, message):
    if not ok:
        raise SystemExit("FAIL: " + message)


def read(path):
    return json.loads(path.read_text(encoding="utf-8"))


def sha(data):
    return hashlib.sha256(data).hexdigest()


inputs = read(HERE / "INPUTS.json")
require(inputs["base"] == "fb773cc2092678f8409c2f0d25289028356eeb86", "T07 base")
require(inputs["numerical_commit"] == "66fa2bc201c86c62f21bb94825479427c24d8522", "reviewed G5")
require(inputs["B"] == "52969003320369754284032", "B")
require(inputs["cost_sha256"] == "f1eb1fd866d3a48589c3e7d37b3536f700e4d5271f9a85834fa3575f034512d2", "cost definition")
groups = ["core_files", "direct_files", "fixture_sources", "preserved_runtime"]
require([len(inputs[k]) for k in groups] == [71, 33, 2, 11], "source inventory")
entries = [e for k in groups for e in inputs[k]]
requests = "".join(e["commit"] + ":" + e["path"] + "\n" for e in entries).encode()
raw = subprocess.check_output(["git", "-c", "safe.directory=" + ROOT.as_posix(), "-C", str(ROOT), "cat-file", "--batch"], input=requests)
offset = 0
blobs = {}
for e in entries:
    end = raw.index(b"\n", offset)
    oid, kind, size = raw[offset:end].decode().split()
    size = int(size)
    data = raw[end + 1:end + 1 + size]
    offset = end + size + 2
    require(oid == e["git_blob"] and kind == "blob" and sha(data) == e["sha256"], "pin " + e["path"])
    blobs[(e["commit"], e["path"])] = data
for e in inputs["direct_files"] + inputs["preserved_runtime"]:
    require((ROOT / e["path"]).read_bytes().replace(b"\r\n", b"\n") == blobs[(e["commit"], e["path"])], "preserved current bytes: " + e["path"])
# Reconstruct the selected independent expectations from their frozen source only.
sources = {Path(e["path"]).name: blobs[(e["commit"], e["path"])] for e in inputs["fixture_sources"]}
records = [json.loads(x) for x in sources["RECORDS.jsonl"].splitlines()]
vectors = [json.loads(x) for x in sources["EXPECTED-VECTORS.jsonl"].splitlines()]
require(len(records) == len(vectors), "source alignment")
index = {v["id"]: (r, v) for r, v in zip(records, vectors)}
fixtures = read(HERE / "fixtures/cases.json")
require(fixtures["source_commit"] == inputs["numerical_commit"], "fixture provenance")
require(len(fixtures["cases"]) == len({f["id"] for f in fixtures["cases"]}) == 37, "37 distinct selected fixtures")
for f in fixtures["cases"]:
    r, v = index[f["id"]]
    require(f["record"] == r, "unchanged source Record " + f["id"])
    expected = {"gate": v["gate"], "cost": None if v.get("cost") is None else str(v["cost"]), "mismatches": v.get("mismatches", []), "target_codes": [None if x is None else str(x) for x in v["target_codes"]] if "target_codes" in v else None}
    require(f["expected"] == expected, "frozen expected vector " + f["id"])
normal = read(HERE / "RESULTS.json")
optimized = read(HERE / "RESULTS-optimized.json")
require(normal["result"] == optimized["result"] == "PASS", "saved test verdicts")
require(normal["python_optimize"] == 0 and optimized["python_optimize"] == 1, "actual process modes")
require(normal["mode"] == "normal" and optimized["mode"] == "optimized", "mode labels")
require(normal["python"] and normal["python"] == optimized["python"], "Python version")
require(normal["fixtures"] == optimized["fixtures"] and normal["assertions"] == optimized["assertions"], "mode agreement")
require(normal["t07"] == optimized["t07"] == {"accepted": 8, "rejected": 41}, "T07 contract results")
require([x["id"] for x in normal["fixtures"]] == [x["id"] for x in fixtures["cases"]], "saved corpus completeness")
for f, result in zip(fixtures["cases"], normal["fixtures"]):
    require(all(result[k] == f["expected"][k] for k in ("gate", "cost", "mismatches")), "saved numerical outcome " + f["id"])
for path in HERE.glob("*.md"):
    content = path.read_text(encoding="utf-8")
    require(STATUS in content, path.name + " candidate label")
    for target in re.findall(r"\[[^\]]*\]\(([^)]+)\)", content):
        if "://" not in target:
            require((path.parent / target.split("#")[0]).is_file(), path.name + " link " + target)
manifest = read(HERE / "MANIFEST.json")
require(inputs["status"] == manifest["status"] == fixtures["status"] == STATUS, "metadata status")
files = {p.relative_to(HERE).as_posix(): p for p in HERE.rglob("*") if p.is_file() and p.name != "MANIFEST.json"}
require(set(files) == {e["path"] for e in manifest["files"]}, "complete manifest")
for e in manifest["files"]:
    data = files[e["path"]].read_bytes().replace(b"\r\n", b"\n")
    require(sha(data) == e["sha256"] and len(data) == e["bytes"], "manifest " + e["path"])
print(f"PASS: 71 G5 pins; 33 T06/T07 + 11 runtime pins preserved; 37 frozen fixture pairs; normal/optimized agreement; {len(files)} artifact hashes")
