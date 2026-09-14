"""Test-only supervisor optimization propagation and independent flag observations."""
import json
import os
from pathlib import Path
import subprocess
import sys


def supervisor_command(*args):
    # Ignore PYTHONOPTIMIZE so an inherited environment cannot override level 0.
    flags = ['-E', '-B']
    if sys.flags.optimize:
        flags.append('-' + 'O' * sys.flags.optimize)
    return [sys.executable, *flags, *map(str, args)]


def check_mode(expected):
    actual = sys.flags.optimize
    if type(expected) is not int or expected not in (0, 1, 2) or actual != expected:
        raise RuntimeError(f'supervisor optimization mismatch: expected {expected}, observed {actual}')
    return actual


def main():
    rows = []
    for level in (0, 1, 2):
        flags = ['-E', '-B'] + (['-' + 'O' * level] if level else [])
        # Deliberately conflict with the requested level, including level zero.
        env = {**os.environ, 'PYTHONOPTIMIZE': str((level + 1) % 3)}
        command = [sys.executable, *flags, str(Path(__file__).resolve())]
        result = subprocess.run(command + ['--driver', str(level)], env=env,
                                capture_output=True, text=True, timeout=10, check=True)
        observed = json.loads(result.stdout)
        if observed != {'driver_optimize': level, 'supervisor_optimize': level}:
            raise RuntimeError('mode propagation failed: ' + repr(observed))
        rows.append({'name': 'propagate-' + str(level), 'passed': True, **observed})
        rejected = subprocess.run(command + ['--observe', str((level + 1) % 3)], env=env,
                                  capture_output=True, text=True, timeout=10)
        if rejected.returncode == 0 or 'supervisor optimization mismatch' not in rejected.stderr:
            raise RuntimeError('wrong expected mode was not rejected')
        rows.append({'name': 'reject-mismatch-' + str(level), 'passed': True})
    print(json.dumps({'python': sys.version.split()[0], 'checks': len(rows), 'rows': rows}, indent=2))


if __name__ == '__main__':
    if len(sys.argv) == 1:
        main()
    elif len(sys.argv) == 3 and sys.argv[1] in ('--driver', '--observe'):
        actual = check_mode(int(sys.argv[2]))
        if sys.argv[1] == '--driver':
            result = subprocess.run(supervisor_command(__file__, '--observe', actual),
                                    capture_output=True, text=True, timeout=10, check=True)
            observed = json.loads(result.stdout)['supervisor_optimize']
            if observed != actual:
                raise RuntimeError('isolated supervisor mode differs from driver')
            print(json.dumps({'driver_optimize': actual, 'supervisor_optimize': observed}))
        else:
            print(json.dumps({'supervisor_optimize': actual}))
    else:
        raise ValueError('expected --driver/--observe and an explicit optimization level')
