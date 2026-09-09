"""Independently bind all recorded task bodies to the fixed Appendix A AST.

Also checks immutable Git identities and untouched scientific evidence. This
is a finite source-transport audit, not a numerical-execution attestation.
"""
import ast
import copy
import hashlib
import json
from pathlib import Path
import re
import subprocess

ROOT = Path(__file__).resolve().parents[2]
HEAD = "a133707a0c09008a26709318c8cc54e000b3bd36"
OLD = "9f39eafd4b0a676e6615956b5a7899f195fc0358"
RESULT = "governance/drafts/release-3-preparation/numerical-research-result.md"
EVIDENCE = "review-inputs/r3-numerical-reproduction/replay-evidence.json"


def git(*args):
    return subprocess.check_output(["git", *args], cwd=ROOT)


def blocks(data, language):
    return re.findall(rb"^```" + language.encode() + rb"\n(.*?)^```", data, re.M | re.S)


def partition(source):
    """Select original statements, expanding only final literal case loops."""
    mod = ast.parse(source)
    guard = mod.body[-1]
    assert isinstance(guard, ast.If) and not guard.orelse
    assert ast.unparse(guard.test) == "__name__ == '__main__'"
    sections, initial = [], []
    for node in guard.body:
        banner = (isinstance(node, ast.Expr) and isinstance(node.value, ast.Call)
                  and isinstance(node.value.func, ast.Name) and node.value.func.id == "print"
                  and node.value.args and isinstance(node.value.args[0], ast.Constant)
                  and isinstance(node.value.args[0].value, str)
                  and node.value.args[0].value.startswith("==="))
        if banner:
            sections.append([node])
        elif sections:
            sections[-1].append(node)
        else:
            initial.append(node)
    selected = {}
    for index, section in enumerate(sections):
        tail = section[-1]
        loops = [n for n in section if isinstance(n, ast.For)]
        iterable = tail.iter if isinstance(tail, ast.For) else None
        if isinstance(iterable, ast.Name):
            definitions = [n.value for n in section if isinstance(n, ast.Assign)
                           and any(isinstance(t, ast.Name) and t.id == iterable.id for t in n.targets)]
            assert len(definitions) == 1
            iterable = definitions[0]
        if len(loops) == 1 and tail is loops[0] and isinstance(iterable, (ast.List, ast.Tuple)):
            for case, value in enumerate(iterable.elts):
                one = copy.deepcopy(tail)
                one.iter = ast.List(elts=[copy.deepcopy(value)], ctx=ast.Load())
                body = mod.body[:-1] + initial + (section[:1] if case == 0 else []) + section[1:-1] + [one]
                selected[f"{index:02d}-{case:02d}"] = body
        else:
            selected[f"{index:02d}-00"] = mod.body[:-1] + initial + section
    return {key: ast.unparse(ast.fix_missing_locations(ast.Module(body=value, type_ignores=[]))) + "\n"
            for key, value in selected.items()}


def main():
    raw = git("cat-file", "commit", HEAD)
    assert hashlib.sha1(b"commit " + str(len(raw)).encode() + b"\0" + raw).hexdigest() == HEAD
    assert re.findall(rb"^parent (\w+)$", raw, re.M) == [b"0abdca8f822d0de3faf35f218f762a951fd75e9e"]
    assert git("rev-parse", HEAD + "^{tree}").strip() == b"6df6404b4bc893832d187296937b52122d065387"
    assert git("rev-parse", HEAD + ":" + RESULT).strip() == b"e0ab5d224c7b2e2c155d611cc3f7a2ae63336c99"
    assert git("rev-parse", HEAD + ":" + EVIDENCE).strip() == b"449cbea788e0c2c49f10728ffa9d0c1c12724fba"
    fixed = git("show", HEAD + ":" + RESULT)
    old = git("show", OLD + ":" + RESULT)
    current = (ROOT / RESULT).read_bytes()
    scripts = blocks(fixed, "python")
    assert len(scripts) == 8 and scripts == blocks(old, "python") == blocks(current, "python")
    assert len(blocks(fixed, "text")) == 8 and blocks(fixed, "text") == blocks(current, "text")
    assert (ROOT / EVIDENCE).read_bytes() == git("show", HEAD + ":" + EVIDENCE)
    evidence = json.loads((ROOT / EVIDENCE).read_text())
    driver = ROOT / "review-inputs/r3-numerical-reproduction/parallel_replay.py"
    assert hashlib.sha256(driver.read_bytes()).hexdigest() == evidence["parallel_driver_sha256"]
    assert len(evidence["parallel_tasks"]) == 41
    checked = {}
    for probe, source in [("b", scripts[1]), ("c", scripts[3])]:
        expected = partition(source)
        actual = {r["selection"]: r for r in evidence["parallel_tasks"] if r["probe"] == probe}
        assert set(expected) == set(actual)
        for key, code in expected.items():
            assert code == actual[key]["executed_source"], (probe, key)
            assert hashlib.sha256(code.encode()).hexdigest() == actual[key]["executed_sha256"]
        checked[probe] = len(actual)
    changed = git("diff-tree", "--no-commit-id", "--name-status", "-r", HEAD).decode().splitlines()
    assert len(changed) == 6 and all(line.startswith("A\t") for line in changed)
    print(json.dumps({"fixed_commit_object": "MATCH", "added_files": 6,
                      "unchanged_scripts": "8/8", "unchanged_output_fences": "8/8",
                      "unchanged_replay_evidence": True, "driver_digest": "MATCH",
                      "task_bodies_derived_from_original_ast": checked}, indent=2))


if __name__ == "__main__":
    main()
