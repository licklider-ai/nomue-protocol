"""Check T06 documentation metadata only; no numerical/schema implementation."""
from pathlib import Path
import hashlib
import json
import re
import subprocess

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
STATUS = "UNISSUED CANDIDATE"


def require(condition, message):
    if not condition:
        raise SystemExit("FAIL: " + message)


def git(*args):
    return subprocess.check_output(
        ["git", "-c", "safe.directory=" + ROOT.as_posix(), "-C", str(ROOT), *args]
    )


def read(name):
    return json.loads((HERE / name).read_text(encoding="utf-8"))


def digest(data):
    return hashlib.sha256(data).hexdigest()


def unique(values, label):
    require(len(values) == len(set(values)), "duplicate " + label)


inputs = read("INPUTS.json")
candidate = read("CANDIDATE.json")
manifest = read("MANIFEST.json")
for data in (inputs, candidate, manifest):
    require(data["status"] == STATUS, "unissued status")
require(inputs["base"] == "3880db43a64e1758494f3c78f6850daab0e3e9e9", "base")
source = {}
unique([x["id"] for x in inputs["files"]], "source id")
for entry in inputs["files"]:
    ref = entry["artifact_commit"] + ":" + entry["path"]
    data = git("show", ref)
    require(git("rev-parse", ref).decode().strip() == entry["git_blob"], ref + " blob")
    require(digest(data) == entry["sha256"] and len(data) == entry["bytes"], ref + " bytes")
    require(entry["url"] == "https://github.com/licklider-ai/nomue-protocol/blob/" + entry["artifact_commit"] + "/" + entry["path"], "source URL")
    source[entry["id"]] = data.decode()
for commit in inputs["snapshots"].values():
    require(git("cat-file", "-t", commit).strip() == b"commit", "snapshot commit")
require(inputs["opening_rfc_blob"] == next(x["git_blob"] for x in inputs["files"] if x["id"] == "RFC"), "RFC identity")
require(inputs["cost_sha256"] == "f1eb1fd866d3a48589c3e7d37b3536f700e4d5271f9a85834fa3575f034512d2", "cost constant")
require(digest(source["COST"].encode()) == inputs["cost_sha256"], "cost source")

ids = candidate["identifiers"]
keys = [x["key"] for x in ids]
unique(keys, "identity key")
unique([x["id"] for x in ids], "protocol identifier")
require(len(ids) == 11, "six RFC identities and five check roles")
for entry in ids:
    require(entry["status"] == STATUS, "identifier issuance")
    require(re.fullmatch(r"https://nomue\.ai/id/(contract|profile|schema|bundle|check)/[a-z][a-z0-9-]*/0\.1\.0-draft\.1", entry["id"]) is not None, "identifier grammar")
    require(entry["version"] == "0.1.0-draft.1", "version")
    if entry["family"] != "check":
        require(entry["id"] in source["RFC"], "RFC semantic identity")
    require(all(entry["id"] not in source[s] for s in ["CHECKS", "BUNDLES", "R2-IDS"]), "collision with existing identity")

reqs = candidate["requirements"]
reqids = [r["id"] for r in reqs]
unique(reqids, "Requirement ID")
expected_ids = {f"NRS-CONTRACT-BTF-{i:04}" for i in range(1, 6)} | {f"NRS-PROFILE-BTF-{i:04}" for i in range(1, 5)} | {f"NRS-VERIFY-{i:04}" for i in range(29, 33)} | {f"NRS-CORE-{i:04}" for i in range(20, 23)}
require(set(reqids) == expected_ids, "16 RFC Requirement candidates")
for r in reqs:
    require(r["status"] == STATUS and r["id"] in source["RFC"], "RFC clause status")
    require(r["id"] not in source["REQUIREMENTS"], "Requirement already allocated")
    require(r["owner"].startswith("spec/") and r["owner"][5:] in source["RFC"], "sole RFC owner")
    require(all(s in source for s in r["sources"]), "clause source")
for pcs in candidate["surface_ids"]:
    require(pcs in source["RFC"] and pcs not in source["SURFACES"], "PCS allocation")

q = candidate["quantities"]
require([x["ordinal"] for x in q] == list(range(22)), "22 ordinals")
expected = []
for name, discriminators in [
    ("n", [("cell_id", "cell(" + cell + ")") for cell in ["00", "01", "10", "11"]]),
    ("residual_degrees_of_freedom", [(None, None)]),
    ("mean", [("cell_id", "cell(" + cell + ")") for cell in ["00", "01", "10", "11"]]),
    ("signed_estimate", [("contrast_kind", k) for k in ["A", "B", "AB"]]),
    ("sum_of_squares", [("contrast_kind", k) for k in ["A", "B", "AB"]]),
    ("residual_sum_of_squares", [(None, None)]),
    ("f_statistic", [("contrast_kind", k) for k in ["A", "B", "AB"]]),
    ("p_value", [("contrast_kind", k) for k in ["A", "B", "AB"]]),
]:
    for disc, value in discriminators:
        expected.append((name, {disc: value} if disc else {}))
require([(x["quantity"], x["discriminator"]) for x in q] == expected, "RFC quantities, discriminators and G5 order")
unique([x["declared_path"] for x in q], "declared path")
for x in q:
    require(x["quantity"] in source["RFC"], "RFC quantity spelling")
    require(x["declared_path"].endswith("." + x["quantity"]), "declaration field binding")
    require(x["comparison"] == ("exact_integer" if x["ordinal"] < 5 else "strict_projected_binary64"), "comparison category")

bindings = candidate["bindings"]
unique([(b["requirement"], b["surface"]) for b in bindings], "clause/surface binding")
expected_bindings = {(r["id"], s) for r in reqs for s in r["surfaces"]}
require({(b["requirement"], b["surface"]) for b in bindings} == expected_bindings, "complete clause bindings")
require({b["surface"] for b in bindings} == set(candidate["surfaces"]), "surface coverage")
for b in bindings:
    task = "T07" if b["surface"] in ["envelope", "input", "declarations", "conformance"] else "T09" if b["surface"] in ["evidence", "outcomes", "guarantee"] else "T08"
    require(b["task"] == task and b["status"] == STATUS, "single primary responsibility")
checks = {x["key"]: x for x in ids if x["family"] == "check"}
require(set(checks) == {"conformance", "integrity", "admissibility", "computability", "recompute"}, "five role graph")

def visit(key, stack):
    require(key not in stack, "dependency cycle")
    for dependency in checks[key]["depends_on"]:
        require(dependency in checks, "missing dependency")
        visit(dependency, stack + [key])

for key, entry in checks.items():
    visit(key, [])
    require(set(entry["requirements"]) <= set(reqids), "check requirement reference")
require(checks["integrity"]["depends_on"] == ["conformance"], "independent integrity")
bundle = candidate["bundle_binding"]
require(bundle["supported"] is False, "not supported bundle")
require(bundle["schemas"] == ["record", "payload", "report"], "schema binding")
require(bundle["checks"] == list(checks), "exact check set")
require(bundle["canonicalization"] in source["RFC"] or bundle["canonicalization"] in source["CANON"], "existing canonicalization")
for key in [bundle["bundle"], bundle["contract"], bundle["profile"], *bundle["schemas"], *bundle["checks"]]:
    require(key in keys, "unresolved bundle binding")
pub = candidate["public_numerical"]
require(pub["B"] == inputs["B"] == "52969003320369754284032", "B")
require(pub["cost_sha256"] == inputs["cost_sha256"], "bound cost")
require(pub["domain"] == "J-cost(B,S-C)" and pub["procedure"] == "S-C" and pub["eligibility"] == "Z-B", "frozen selections")
require(pub["standalone_n_ceiling"] is None, "no standalone public n ceiling")
for forbidden in ["25/26", "30 sec", "linux", "cpython", "stdout", "stderr", "memory cap"]:
    require(forbidden not in json.dumps(pub).lower(), "reference cap in public metadata")
    require(forbidden not in (HERE / "REQUIREMENT-CANDIDATE.md").read_text().lower(), "reference cap in public clause")

for path in HERE.glob("*.md"):
    text = path.read_text(encoding="utf-8")
    require(STATUS in text, path.name + " status")
    for destination in re.findall(r"\[[^\]]*\]\(([^)]+)\)", text):
        if "://" not in destination:
            require((path.parent / destination.split("#")[0]).is_file(), path.name + " local link " + destination)
    for r in reqs:
        if path.name == "BINDING-MATRIX.md":
            require(r["id"] in text, "Markdown clause binding")
files = manifest["files"]
require({x["path"] for x in files} == {p.name for p in HERE.iterdir() if p.is_file() and p.name != "MANIFEST.json"}, "manifest inventory")
for entry in files:
    data = (HERE / entry["path"]).read_bytes()
    require(digest(data) == entry["sha256"] and len(data) == entry["bytes"], "manifest hash " + entry["path"])
print(f"PASS: {len(source)} source pins; {len(ids)} identities; {len(reqs)} clauses; 22 quantities; {len(bindings)} bindings; graph, status, constants, links, {len(files)} manifest files")
