"""Collect T11 Linux regression receipts without modifying expected data."""

import datetime
import hashlib
import json
import os
from pathlib import Path
import platform
import shutil
import subprocess
import sys
import time

ROOT = Path(__file__).resolve().parents[4]
HERE = Path(__file__).resolve().parent
OUTPUT = Path(sys.argv[1]).resolve()
OUTPUT.mkdir(parents=True, exist_ok=True)
PREPARATION = "governance/drafts/release-4-preparation/"


def output(command):
    return subprocess.check_output(command, cwd=ROOT, text=True, encoding="utf-8").strip()


commands = [
    ("full-check", ["pnpm", "check"]),
    ("path-observation", ["node", str(HERE / "path_observation.mjs")]),
    (
        "t09-focused",
        [
            "pnpm",
            "exec",
            "tsx",
            PREPARATION + "t09-canonicalization-repair-20260915/focused.ts",
        ],
    ),
]
for optimized in (False, True):
    tag = "optimized" if optimized else "normal"
    t09 = [
        "pnpm",
        "exec",
        "tsx",
        PREPARATION + "t09-check-report-lifecycle-20260915/tests.ts",
    ]
    if optimized:
        t09.append("--optimized")
    commands.append(("t09-" + tag, t09))
    f01 = ["python"]
    if optimized:
        f01.append("-O")
    f01 += [
        "-B",
        PREPARATION + "t09-check-report-lifecycle-20260915/test_f01.py",
    ]
    commands.append(("f01-" + tag, f01))

git = ["git", "-c", "safe.directory=" + ROOT.as_posix()]
environment = dict(
    os.environ,
    NO_COLOR="1",
    FORCE_COLOR="0",
    PYTHONDONTWRITEBYTECODE="1",
)
receipt = {
    "source_commit": output(git + ["rev-parse", "HEAD"]),
    "tracked_diff": output(git + ["diff", "--name-only"]),
    "node": output(["node", "--version"]),
    "pnpm": output([shutil.which("pnpm"), "--version"]),
    "python": platform.python_version(),
    "platform": platform.system(),
    "machine": platform.machine(),
    "started_utc": datetime.datetime.now(datetime.timezone.utc).isoformat(),
    "runs": [],
}

for name, command in commands:
    invoked = [shutil.which(command[0]) or command[0], *command[1:]]
    started = time.monotonic()
    result = subprocess.run(
        invoked,
        cwd=ROOT,
        env=environment,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        check=False,
    )
    data = result.stdout.replace(str(ROOT).encode(), b"<repository>")
    path = OUTPUT / (name + ".txt")
    path.write_bytes(data)
    row = {
        "name": name,
        "command": command,
        "exit_code": result.returncode,
        "seconds": round(time.monotonic() - started, 3),
        "output": path.name,
        "sha256": hashlib.sha256(data).hexdigest(),
    }
    receipt["runs"].append(row)
    (OUTPUT / "receipt.json").write_text(
        json.dumps(receipt, indent=2) + "\n", encoding="utf-8"
    )
    print(json.dumps(row), flush=True)
    if result.returncode != 0:
        sys.exit(result.returncode)
