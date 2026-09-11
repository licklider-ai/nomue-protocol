"""Predetermined lifecycle expectations. Real cgroup tests require --delegation."""
import argparse
from concurrent.futures import ThreadPoolExecutor
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import time

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
ENVELOPE = HERE
NODE = shutil.which("node")
PYTHON = sys.executable
rows = []


def check(name, fn):
    try:
        evidence = fn()
        rows.append({"name": name, "pass": True, "evidence": evidence})
    except Exception as e:
        rows.append({"name": name, "pass": False, "error": repr(e)})


def invoke(delegation, probe=None, options=(), record=None, expected=None, env=None, pass_fds=()):
    args = [PYTHON, "-I", str(HERE / "supervisor.py"), "--delegation", delegation,
            "--node", NODE, "--python", PYTHON]
    if probe:
        args += ["--probe", probe]
    args += list(options) + [str(record or ENVELOPE / "example-record.jcs"),
                            str(expected or ENVELOPE / "example-expected.json")]
    p = subprocess.run(args, capture_output=True, timeout=80, cwd=ROOT, env=env, pass_fds=pass_fds)
    assert p.returncode == 0, p.stderr.decode()[-2000:]
    value = json.loads(p.stdout)
    assert ("result" in value) == (value["category"] == "completed_valid")
    return value


def want(delegation, mode, category, options=()):
    r = invoke(delegation, mode, options)
    assert r["category"] == category, r
    if category != "unsupported_host":
        assert all(r["evidence"]["cleanup"].values()), r
        assert not Path(r["evidence"]["temporary"]).exists()
        assert not Path(r["evidence"]["leaf"]).exists()
    return r


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--delegation")
    p.add_argument("--output", required=True)
    a = p.parse_args()
    sys.path.insert(0, str(HERE))
    import supervisor
    def internal_contract():
        for raw in [b'{"output":{"kind":"x","x":' + b'9'*400 + b'}}', b'{"output":{"kind":"x","x":1e999}}', b'{"output":{"kind":"x","x":"\\ud800"}}',
                    b'{"output":{"kind":"x","x":-0}}', b'{"output":{"kind":"x","x":-1e-999}}']:
            try:
                supervisor.strict_transport(raw)
                raise AssertionError('accepted ineligible transport')
            except ValueError:
                pass
        for flags, expected in [({'memory_enforced':True,'deadline':True},'memory_enforced'),
                                ({'pids_enforced':True,'abnormal_exit':True},'pids_enforced'),
                                ({'cleanup_failed':True,'memory_enforced':True},'cleanup_failed'),
                                ({'cancelled':True,'deadline':True},'cancelled')]:
            assert supervisor.category(flags)==expected
        return {'negative_transport_cases':5,'precedence_cases':4}
    check('private output eligibility and precedence', internal_contract)
    check("T1 unavailable delegation before input open", lambda: want("/unavailable", None, "unsupported_host"))
    # Local transport controls exercise actual files with native Node, without claiming cgroup coverage.
    with tempfile.TemporaryDirectory() as td:
        temp = Path(td)
        def entry(record, expected=ENVELOPE / "example-expected.json"):
            env = {"PATH": "/usr/bin:/bin", "TMPDIR": td, "NOMUE_EXPERIMENT_PYTHON": PYTHON}
            return subprocess.run([NODE, str(HERE / "entry.mjs"), str(record), str(expected)],
                                  capture_output=True, env=env, timeout=30, cwd=ROOT)
        def baseline():
            r = entry(ENVELOPE / "example-record.jcs")
            v = json.loads(r.stdout)
            assert r.returncode == 0 and all(c["outcome"] == "pass" for c in v["output"]["checks"])
            import base64
            assert base64.b64decode(v["verified_record_base64"]) == (ENVELOPE / "example-record.jcs").read_bytes()
            return {"checks": 5, "snapshot_equal": True}
        check("entry baseline and original-byte forwarding", baseline)
        for size in [2359297, 2359296 + 10 * 1024 * 1024]:
            def oversize(size=size):
                file = temp / "oversize"
                with file.open("wb") as f:
                    f.truncate(size)
                r = entry(file, temp / "missing-expected")
                assert r.returncode == 0, r.stderr
                assert json.loads(r.stdout)["output"]["reason"] == "record_bytes"
                return {"size": size, "reason": "record_bytes"}
            check("T8 record byte boundary " + str(size), oversize)
        def fifo():
            file = temp / "fifo"
            os.mkfifo(file)
            start = time.monotonic()
            r = entry(file)
            assert r.returncode == 65 and not r.stdout
            return {"elapsed_seconds": time.monotonic() - start, "exit": 65}
        check("T8 FIFO nonblocking refusal", fifo)
        def priority():
            r = entry(temp, temp / "absent")
            assert r.returncode == 65 and not r.stdout
            malformed = temp / "bad"
            malformed.write_text('{"a":1,"a":2}')
            r = entry(malformed, temp / "absent")
            assert json.loads(r.stdout)["output"]["reason"] == "record_duplicate_member"
            return {"directory_exit": 65, "malformed_record_before_expected_io": True}
        check("entry directory and record-first priority", priority)
        if a.delegation:
            check("T12 real baseline through supervisor", lambda: want(a.delegation, None, "completed_valid"))
            subprocess.run([NODE, str(HERE / 'prepare_cases.mjs'), td], check=True, cwd=ROOT)
            for case in json.loads((temp / 'cases.json').read_text()):
                def stage_case(case=case):
                    name, want = case['name'], case['want']
                    r = invoke(a.delegation, record=temp / (name + '.record'), expected=temp / (name + '.expected'))
                    assert r['category'] == 'completed_valid', r
                    out = r['result']['output']
                    if ':' in want:
                        stage, outcome = want.split(':')
                        assert next(c for c in out['checks'] if c['stage']==stage)['outcome']==outcome, r
                    else:
                        assert out['reason']==want, r
                    assert 'verified_record_base64' not in r['result']
                    return r
                check('T12 scoped output ' + case['name'], stage_case)
            for name in ['maximum', 'large-declaration', 'six-variants']:
                def real_case(name=name):
                    r = invoke(a.delegation, record=temp / (name + '.record'), expected=temp / (name + '.expected'))
                    assert r['category'] == 'completed_valid', r
                    assert all(c.get('outcome') == 'pass' for c in r['result']['output']['checks']), r
                    assert all(r['evidence']['cleanup'].values()), r
                    return r
                check('T12 real ' + name, real_case)
            for mode, category, options in [
                ("worker-memory", "memory_enforced", ["--memory", "100663296"]),
                ("node-memory", "memory_enforced", ["--memory", "100663296"]),
                ("pids", "pids_enforced", ["--tasks", "32"]),
                ("descendant", "completed_valid", []),
                ("stdout", "output_overflow", []),
                ("stderr", "output_overflow", []),
                ("hang", "deadline", ["--deadline", "1"]),
                ("invalid", "completed_invalid_output", []),
            ]:
                check("cgroup " + mode, lambda m=mode, c=category, o=options: want(a.delegation, m, c, o))
            def environment():
                env = dict(os.environ, NODE_OPTIONS="--require=/nonexistent-marker.cjs", PYTHONPATH="/nonexistent")
                marker = temp / 'nomue-inherited-descriptor-sentinel'
                with marker.open('w') as f:
                    r = invoke(a.delegation, "environment", env=env, pass_fds=(f.fileno(),))
                assert r["category"] == "completed_valid", r
                return r
            check("T11 environment and descriptor sanitization", environment)
            def cancellation():
                args = [PYTHON, '-I', str(HERE / 'supervisor.py'), '--delegation', a.delegation,
                        '--node', NODE, '--python', PYTHON, '--probe', 'hang', 'unused', 'unused']
                child = subprocess.Popen(args, stdout=subprocess.PIPE, stderr=subprocess.PIPE, cwd=ROOT)
                time.sleep(.5)
                child.terminate()
                out, err = child.communicate(timeout=10)
                r = json.loads(out)
                assert r['category'] == 'cancelled' and 'result' not in r, r
                assert all(r['evidence']['cleanup'].values()), r
                return r
            check('supervisor cancellation and cleanup', cancellation)
            def siblings():
                with ThreadPoolExecutor(2) as pool:
                    f = pool.submit(want, a.delegation, "worker-memory", "memory_enforced", ["--memory", "100663296"])
                    g = pool.submit(want, a.delegation, None, "completed_valid")
                    return {"limited": f.result(), "sibling": g.result()}
            check("T10 concurrent isolated calls", siblings)
    output = {"scope": "controlled execution research; no public support registration",
              "node": subprocess.check_output([NODE, "--version"], text=True).strip(),
              "python": sys.version, "cgroup_tests": "RUN" if a.delegation else "NOT_RUN",
              "rows": rows, "passed": sum(r["pass"] for r in rows), "controls": len(rows)}
    Path(a.output).write_text(json.dumps(output, indent=2) + "\n")
    print(json.dumps({k: output[k] for k in ("cgroup_tests", "passed", "controls")}))
    if any(not r["pass"] for r in rows):
        print(json.dumps([r for r in rows if not r["pass"]], indent=2))
        raise SystemExit(1)


if __name__ == "__main__":
    main()
