"""Read-only T05 evidence identity checks; no numerical execution or new review."""
import hashlib
import json
from pathlib import Path
import re
import subprocess

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
PREFIX = "governance/drafts/release-4-preparation/"


def require(ok, message):
    if not ok:
        raise RuntimeError(message)


def git(*args):
    return subprocess.check_output(["git", "-c", "safe.directory=" + ROOT.as_posix(), *args], cwd=ROOT)


def content(commit, path):
    return git("show", commit + ":" + path)


def digest(data):
    return hashlib.sha256(data).hexdigest()


def main():
    inputs = json.loads((HERE / "INPUTS.json").read_text(encoding="utf-8"))
    pins = {item["id"]: item for item in inputs["files"]}
    for item in pins.values():
        data = content(item["artifact_commit"], item["path"])
        require(digest(data) == item["sha256"] and len(data) == item["bytes"], "source bytes: " + item["id"])
        require(git("rev-parse", item["artifact_commit"] + ":" + item["path"]).decode().strip() == item["git_blob"], "source blob")
        require(item["url"] == "https://github.com/licklider-ai/nomue-protocol/blob/" + item["artifact_commit"] + "/" + item["path"], "immutable URL")
        if item["reviewed_target"]:
            git("cat-file", "-e", item["reviewed_target"] + "^{commit}")
    c = inputs["candidates"]
    for descendant in (c["research_gate"], c["numerical"]):
        git("merge-base", "--is-ancestor", c["architecture"], descendant)
    git("merge-base", "--is-ancestor", c["research_gate"], c["numerical"])
    git("merge-base", "--is-ancestor", c["main"], c["execution"])
    for commit in c.values():
        require(git("rev-parse", commit + ":" + PREFIX + "opening-rfc-candidate.md").decode().strip() == inputs["opening_rfc_blob"], "opening RFC preservation")
    for label in ("T03", "ARCH", "RG1", "RG2", "RG3", "RG5"):
        p = pins[label]
        require(content(c["numerical"], p["path"]) == content(p["artifact_commit"], p["path"]), "numerical successor drift: " + label)
    historical = json.loads(content(c["numerical"], pins["G5-INPUTS"]["path"]))
    for p in historical["files"]:
        data = content(historical["input_commit"], p["path"])
        require(digest(data) == p["sha256"], "G5 input hash: " + p["path"])
        require(git("rev-parse", historical["input_commit"] + ":" + p["path"]).decode().strip() == p["git_blob"], "G5 blob")
        require(content(c["numerical"], p["path"]) == data, "G5 input preserved")
    execution = json.loads(content(c["execution"], pins["EC34"]["path"]))
    for key, expected in (("numerical_candidate", c["numerical"]), ("architecture", c["architecture"]), ("execution_baseline", c["main"]), ("B", inputs["B"]), ("cost_sha256", inputs["cost_sha256"])):
        require(str(execution[key]) == expected, "execution binding: " + key)
    require(digest(content(c["numerical"], pins["COST"]["path"])) == inputs["cost_sha256"], "fixed cost")
    for p in execution["runtime_11"]:
        for commit in (c["main"], c["numerical"], c["execution"]):
            require(digest(content(commit, p["path"])) == p["sha256"], "historical runtime preservation")
    receipts = json.loads((HERE / "RECEIPTS.json").read_text(encoding="utf-8"))
    require(len(receipts) == 4, "receipt count")
    for receipt in receipts:
        require(re.fullmatch("[0-9a-f]{64}", receipt["original_final_message_sha256"]) is not None, "receipt text digest")
        git("cat-file", "-e", receipt["reviewed_commit"] + "^{commit}")
    # Original task-message digests were computed at intake; public Git objects
    # do not contain their originals. This check does not pretend to authenticate them.
    for doc in HERE.glob("*.md"):
        text = doc.read_text(encoding="utf-8")
        for target in re.findall(r"\]\(([^)]+)\)", text):
            if "://" in target:
                require(target in {p["url"] for p in pins.values()}, "unbound external URL: " + target)
                continue
            path, _, anchor = target.partition("#")
            destination = HERE / path if path else doc
            require(destination.is_file(), "broken local link: " + target)
            if anchor:
                headings = re.findall(r"^#+ (.+)$", destination.read_text(encoding="utf-8"), re.M)
                slugs = {re.sub(r"[^a-z0-9 _-]", "", h.lower()).replace(" ", "-") for h in headings}
                require(anchor in slugs, "broken anchor: " + target)
    manifest = json.loads((HERE / "MANIFEST.json").read_text(encoding="utf-8"))
    actual = {p.name for p in HERE.iterdir() if p.is_file() and p.name != "MANIFEST.json"}
    require(actual == set(manifest["files"]), "manifest file set")
    for name, p in manifest["files"].items():
        data = (HERE / name).read_bytes()
        require(digest(data) == p["sha256"] and len(data) == p["bytes"], "manifest: " + name)
    changes = git("diff", "--name-only", inputs["base"], "HEAD").decode().splitlines()
    require(all(p.startswith(PREFIX + HERE.name + "/") for p in changes), "committed scope outside T05")
    print(json.dumps({"source_pins": len(pins), "G5_preserved_input_pins": len(historical["files"]), "runtime_hashes_per_snapshot": len(execution["runtime_11"]), "review_message_provenance_entries": len(receipts), "manifest_files": len(actual), "status": "PASS", "scope": "identity and link audit only; original task messages checked at intake, no numerical rerun or new review"}))


if __name__ == "__main__":
    main()
