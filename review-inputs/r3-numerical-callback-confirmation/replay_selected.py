"""Replay five complete unchanged scripts, preserving raw stdout and stderr.

Usage: python replay_selected.py EXTRACTED_PROBE_DIRECTORY OUTPUT_DIRECTORY
Use the existing hash-pinned numerical-reproduction requirements. Select the
intended Python environment before invoking this file. Output paths are not
stored as scientific evidence.
"""
import concurrent.futures
import datetime
import hashlib
import json
import os
from pathlib import Path
import subprocess
import sys
import time

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / 'review-inputs/r3-numerical-reproduction'))
import verify_replay as V


def main():
    source_dir = Path(sys.argv[1]).resolve()
    output_dir = Path(sys.argv[2]).resolve()
    output_dir.mkdir(parents=True, exist_ok=False)

    def run(name):
        source = source_dir / V.SCRIPTS[name]
        started = datetime.datetime.now(datetime.timezone.utc).isoformat()
        t0 = time.monotonic()
        result = subprocess.run([sys.executable, '-u', source.name], cwd=source_dir,
                                capture_output=True, env={**os.environ, 'PYTHONHASHSEED': '0'})
        elapsed = time.monotonic() - t0
        expected = (source_dir / f'probe_{name}.out.expected').read_bytes()
        record = {'probe': name, 'source_sha256': V.sha(source.read_bytes()),
                  'exit_code': result.returncode, 'elapsed_seconds': round(elapsed, 3),
                  'started_utc': started,
                  'finished_utc': datetime.datetime.now(datetime.timezone.utc).isoformat(),
                  'stdout_sha256': V.sha(result.stdout), 'stderr_sha256': V.sha(result.stderr),
                  'stdout': result.stdout.decode(), 'stderr': result.stderr.decode(),
                  'comparison': V.comparison_form(result.stdout) == V.comparison_form(expected)}
        (output_dir / f'{name}.json').write_text(json.dumps(record, indent=2) + '\n')
        return record

    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
        records = list(pool.map(run, ['a', 'd', 'e', 'f', 'c2']))
    (output_dir / 'selected-replay.json').write_text(json.dumps(records, indent=2) + '\n')
    assert all(r['exit_code'] == 0 and not r['stderr'] and r['comparison'] for r in records)
    print('Five complete scripts reproduced with the disclosed timing comparison.')


if __name__ == '__main__':
    main()
