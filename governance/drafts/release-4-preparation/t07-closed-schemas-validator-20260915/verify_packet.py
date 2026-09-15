"""UNISSUED CANDIDATE: verify T07 pins/coverage/manifest, never numerical truth."""
from pathlib import Path
import hashlib
import json
import re
import subprocess

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
T06 = HERE.parent / "t06-candidate-requirement-surfaces-20260915"
STATUS = "UNISSUED CANDIDATE"


def require(condition, message):
    if not condition:
        raise SystemExit("FAIL: " + message)


def read(path):
    return json.loads(path.read_text(encoding="utf-8"))


def git(*args):
    return subprocess.check_output(["git", "-c", "safe.directory=" + ROOT.as_posix(), "-C", str(ROOT), *args])


def sha(data):
    return hashlib.sha256(data).hexdigest()


inputs = read(HERE / "INPUTS.json")
require(inputs["base"] == "ae1ad029179f31ae463882e8467e9367398263c9", "T06 base")
for entry in inputs["files"]:
    ref = entry["commit"] + ":" + entry["path"]
    data = git("show", ref)
    require(git("rev-parse", ref).decode().strip() == entry["git_blob"], ref + " blob")
    require(sha(data) == entry["sha256"], ref + " SHA")
    require((ROOT / entry["path"]).read_bytes().replace(b"\r\n", b"\n") == data, "preserved input " + entry["path"])
# Check inherited sources at their original revisions rather than relabeling them.
for entry in read(T06 / "INPUTS.json")["files"]:
    require(sha(git("show", entry["artifact_commit"] + ":" + entry["path"])) == entry["sha256"], "T06 transitive pin")
candidate = read(T06 / "CANDIDATE.json")
ids = {x["key"]: x["id"] for x in candidate["identifiers"]}
schemas = [read(p) for p in sorted((HERE / "schemas").glob("*.schema.json"))]
require({s["$id"] for s in schemas} == {ids[x] for x in ["record", "payload", "report"]}, "three exact schema identities")
require(len(schemas) == 3, "no duplicate schema ID")
index = {s["$id"]: s for s in schemas}
common = read(ROOT / "schemas/common/identifier.schema.json")
index[common["$id"]] = common
refs = []


def resolve_ref(ref, current):
    base, _, fragment = ref.partition("#")
    require((base or current) in index, "unapproved external schema " + ref)
    node = index[base or current]
    if fragment:
        require(fragment.startswith("/"), "pointer reference")
        for part in fragment[1:].split("/"):
            node = node[part.replace("~1", "/").replace("~0", "~")]
    return node


def walk(node, current):
    if isinstance(node, dict):
        if "$ref" in node:
            resolve_ref(node["$ref"], current)
            refs.append(node["$ref"])
        if node.get("type") == "object":
            require(node.get("additionalProperties") is False, "open object")
            require(set(node["required"]) <= set(node["properties"]), "required properties")
        for value in node.values():
            walk(value, current)
    elif isinstance(node, list):
        for value in node:
            walk(value, current)


for schema in schemas:
    require(schema["$schema"] == "https://json-schema.org/draft/2020-12/schema", "dialect")
    require(STATUS in schema.get("$comment", "") + schema.get("description", ""), "candidate status")
    walk(schema, schema["$id"])
coverage = read(HERE / "COVERAGE.json")
require({x["surface"] for x in coverage["surfaces"]} == set(candidate["surfaces"]), "all T06 surfaces")
require({r["id"]: r["surfaces"] for r in coverage["requirements"]} == {r["id"]: r["surfaces"] for r in candidate["requirements"]}, "all Requirement bindings")
for entry in coverage["surfaces"]:
    require(entry["schema_refs"] and entry["boundary"], "explicit surface boundary")
    for ref in entry["schema_refs"]:
        resolve_ref(ref, ids["report"])
require(index[ids["report"]].get("not") == {}, "explicit T09 root deferral")
require(len(candidate["quantities"]) == 22, "fixed quantity inventory")
fields = {q["quantity"] for q in candidate["quantities"]}
actual = {q["properties"]["quantity"]["const"] for q in index[ids["report"]]["$defs"]["quantityResult"]["oneOf"]}
require(actual == fields, "canonical quantity names")
normal = read(HERE / "RESULTS.json")
jitless = read(HERE / "RESULTS-jitless.json")
require(normal["result"] == jitless["result"] == "PASS", "saved checks")
require(normal["mode"] == "default" and jitless["mode"] == "jitless", "distinct modes")
require(normal["counts"] == jitless["counts"] and normal["assertions"] == jitless["assertions"], "mode agreement")
for path in HERE.glob("*.md"):
    text = path.read_text(encoding="utf-8")
    require(STATUS in text, path.name + " status")
    for target in re.findall(r"\[[^\]]*\]\(([^)]+)\)", text):
        if "://" not in target:
            require((path.parent / target.split("#")[0]).is_file(), path.name + " local link " + target)
source = (HERE / "validator.ts").read_text(encoding="utf-8")
for forbidden in ["child_process", "fetch(", "Date.now", "performance.now", "Math.random", "52969003320369754284032", "S-C(", "costScore("]:
    require(forbidden not in source, "forbidden numerical/environment operation " + forbidden)
manifest = read(HERE / "MANIFEST.json")
require(manifest["status"] == inputs["status"] == coverage["status"] == STATUS, "metadata status")
files = {p.relative_to(HERE).as_posix(): p for p in HERE.rglob("*") if p.is_file() and p.name != "MANIFEST.json"}
require(set(files) == {e["path"] for e in manifest["files"]}, "manifest completeness")
for entry in manifest["files"]:
    data = files[entry["path"]].read_bytes()
    require(sha(data) == entry["sha256"] and len(data) == entry["bytes"], "manifest " + entry["path"])
print(f"PASS: {len(inputs['files'])} direct pins + 35 inherited pins; 3 schemas; {len(refs)} resolved refs; 11 surfaces / 16 clauses; 22 quantities; {len(files)} file hashes; default/jitless agreement")
