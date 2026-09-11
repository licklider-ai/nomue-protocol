"""Read-only reconstruction of additional historical evidence; not attestation."""
import base64
import hashlib
import io
import json
from pathlib import Path
import zipfile

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
sha = lambda b: hashlib.sha256(b).hexdigest()
meta = json.loads((HERE / "SERVICE-METADATA.json").read_text())
runs = {r["id"]: r for r in meta["runs"]}
artifacts = {a["id"]: a for a in meta["artifacts"]}
checks = json.loads((HERE / "ZIP-CHECKS.json").read_text())
count = 0
for row in checks["archives"]:
    raw = base64.b64decode(b"".join((HERE / row["encoded_zip"]).read_bytes().split()), validate=True)
    artifact = artifacts[row["artifact_id"]]
    run = runs[row["run_id"]]
    assert artifact["workflow_run"]["id"] == run["id"]
    assert artifact["workflow_run"]["head_sha"] == run["head_sha"]
    assert artifact["digest"] == "sha256:" + sha(raw)
    assert sha(raw) == row["zip_sha256"] and len(raw) == row["zip_bytes"]
    with zipfile.ZipFile(io.BytesIO(raw)) as z:
        names = [m["original_path"] for m in row["members"]]
        assert len(names) == len(set(names)) == len(z.infolist())
        assert set(z.namelist()) == set(names)
        for member in row["members"]:
            b = z.read(member["original_path"])
            assert sha(b) == member["sha256"] and len(b) == member["bytes"]
            assert (ROOT / member["archived_path"]).read_bytes() == b
            count += 1
for ref in checks["external_references"]:
    assert sha((ROOT / ref["path"]).read_bytes()) == ref["sha256"]
for line in (HERE / "SHA256SUMS.txt").read_text().splitlines():
    digest, name = line.split("  ", 1)
    assert sha((HERE / name).read_bytes()) == digest, name
print(json.dumps({"archives": len(checks["archives"]), "exact_member_mappings": count, "service_head_joins": len(checks["archives"])}))

# The follow-up implementation archive and exact source surface, independently of
# whether this checkout adds further evidence files to the full repository tree.
ci = HERE / "ci"
if ci.exists():
    integration = json.loads((ci / "INTEGRATION.json").read_text())
    for run in integration["runs"]:
        assert run["head_sha"] == integration["tested_head"]
        assert run["conclusion"] == "success"
        assert run["jobs"] and all(j["conclusion"] == "success" for j in run["jobs"])
    artifact = integration["artifact"]
    assert artifact["workflow_run"]["head_sha"] == integration["tested_head"]
    assert any(r["id"] == artifact["workflow_run"]["id"] for r in integration["runs"])
    raw = base64.b64decode(b"".join((ci / "public-candidate.zip.base64.txt").read_bytes().split()), validate=True)
    assert artifact["digest"] == "sha256:" + sha(raw)
    members = json.loads((ci / "MEMBERS.json").read_text())
    with zipfile.ZipFile(io.BytesIO(raw)) as z:
        names = [m["original_path"] for m in members]
        assert len(z.infolist()) == len(names) == len(set(names)) == 6
        assert set(z.namelist()) == set(names)
        for member in members:
            b = z.read(member["original_path"])
            assert sha(b) == member["sha256"] and len(b) == member["bytes"]
            assert (ci / member["archived_path"]).read_bytes() == b
    for source in integration["source_inputs"]:
        assert sha((ROOT / source["path"]).read_bytes()) == source["sha256"], source["path"]
    guard = json.loads((ci / "members/host-guard-results.json.txt").read_text())
    assert guard["node"].startswith("v22.")
    receipt = guard["receipt"]
    assert receipt["category"] == "unsupported_host" and "result" not in receipt
    assert receipt["evidence"]["leader_exit"] == 78
    assert receipt["evidence"]["bytes_observed"] == {"stdout": 0, "stderr": 0}
    assert receipt["evidence"]["cleanup"] == dict.fromkeys(["populated_zero", "echild", "cgroup_removed", "temporary_removed"], True)
    assert guard["public_output"]["reason_codes"] == ["candidate:holm:unsupported_host"]
    print("Follow-up CI archive, runtime source inputs and unsupported-host receipt verified")
