"""UNISSUED CANDIDATE. Load immutable Git blobs; no fetch and no core edits."""
from contextlib import contextmanager
import hashlib
import importlib.util
import json
from pathlib import Path
import subprocess
import tempfile

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
INPUTS = json.loads((HERE / "INPUTS.json").read_text(encoding="utf-8"))


def require(ok, message):
    if not ok:
        raise ValueError(message)


@contextmanager
def reviewed_core():
    entries = INPUTS["core_files"]
    request = "".join(e["git_blob"] + "\n" for e in entries).encode("ascii")
    result = subprocess.run(["git", "-c", "safe.directory=" + ROOT.as_posix(), "-C", str(ROOT), "cat-file", "--batch"], input=request, capture_output=True, check=True)
    offset = 0
    with tempfile.TemporaryDirectory(prefix="nomue-t08-core-") as directory:
        root = Path(directory).resolve()
        for entry in entries:
            end = result.stdout.index(b"\n", offset)
            oid, kind, size = result.stdout[offset:end].decode("ascii").split()
            size = int(size)
            data = result.stdout[end + 1:end + 1 + size]
            offset = end + size + 2
            require(kind == "blob" and oid == entry["git_blob"], "source Git identity")
            require(hashlib.sha256(data).hexdigest() == entry["sha256"], "source SHA: " + entry["path"])
            path = (root / entry["path"]).resolve()
            require(root in path.parents, "source path containment")
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(data)
        path = root / INPUTS["procedure_path"]
        spec = importlib.util.spec_from_file_location("t08_pinned_g5", path)
        core = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(core)
        require(Path(core.__file__).resolve() == path, "core origin")
        require(str(core.B) == INPUTS["B"] and core.COST_SHA == INPUTS["cost_sha256"], "numerical identity")
        yield core
