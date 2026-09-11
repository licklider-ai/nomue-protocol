"""Paired full-invocation measurements; global reset is opt-in on disposable hosted CI only."""
import argparse
import base64
import ctypes
import hashlib
import json
import mmap
import os
from pathlib import Path
import platform
import shutil
import subprocess
import sys
import tempfile
import time
import uuid

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
CONTROL = HERE.parent / 'holm-controlled-execution-20260911'
CGROOT = Path('/sys/fs/cgroup')


def sha(path):
    with open(path, 'rb') as f:
        return hashlib.file_digest(f, 'sha256').hexdigest()


def kv(path):
    return {k: int(v) for k, v in (line.split() for line in path.read_text().splitlines())}


def resident(path):
    # Owned regular sentinel only; address acquisition never reads/faults file contents.
    size = path.stat().st_size
    pages = (size + mmap.PAGESIZE - 1) // mmap.PAGESIZE
    with path.open('rb') as f, mmap.mmap(f.fileno(), size, access=mmap.ACCESS_COPY) as mapping:
        anchor = ctypes.c_char.from_buffer(mapping)
        vector = (ctypes.c_ubyte * pages)()
        libc = ctypes.CDLL(None, use_errno=True)
        libc.mincore.argtypes = [ctypes.c_void_p, ctypes.c_size_t, ctypes.c_void_p]
        libc.mincore.restype = ctypes.c_int
        result = libc.mincore(ctypes.addressof(anchor), size, vector)
        del anchor
        if result:
            raise OSError(ctypes.get_errno(), 'mincore sentinel')
        return {'pages': pages, 'resident': sum(x & 1 for x in vector)}


def reset_cache(sentinel):
    with sentinel.open('wb') as f:
        for _ in range(64):
            f.write(b'x' * 65536)
        f.flush()
        os.fsync(f.fileno())
    before_pages = resident(sentinel)
    os.sync()
    before = kv(Path('/proc/vmstat'))
    Path('/proc/sys/vm/drop_caches').write_text('3\n')
    after = kv(Path('/proc/vmstat'))
    after_pages = resident(sentinel)
    delta = {k: after[k] - before[k] for k in ('drop_pagecache', 'drop_slab')}
    receipt = {'request': 3, 'write_succeeded': True, 'vmstat_delta': delta,
               'sentinel_before': before_pages, 'sentinel_after': after_pages}
    receipt['pass'] = (all(v >= 1 for v in delta.values()) and
                       before_pages['resident'] == before_pages['pages'] and after_pages['resident'] == 0)
    return receipt


def verify_output(result, case):
    output = result['output']
    if case['want'] == 'pass':
        assert len(output['checks']) == 5
        assert all(c['execution'] == 'completed' and c['outcome'] == 'pass' for c in output['checks'])
        original = base64.b64decode(result['verified_record_base64'], validate=True)
        assert hashlib.sha256(original).hexdigest() == case['record_sha256']
    else:
        assert output['reason'] == case['want'], output
        assert 'verified_record_base64' not in result
    return output


def prepare(directory, node):
    subprocess.run([node, str(HERE / 'prepare.mjs'), str(directory)], cwd=ROOT, check=True, timeout=30)
    return json.loads((directory / 'cases.json').read_text())


def teardown(delegation):
    (delegation / 'cgroup.kill').write_text('1')
    deadline = time.monotonic() + 5
    while kv(delegation / 'cgroup.events')['populated'] and time.monotonic() < deadline:
        time.sleep(.02)
    assert kv(delegation / 'cgroup.events')['populated'] == 0, 'outer cleanup populated'
    for directory, _, _ in os.walk(delegation, topdown=False):
        Path(directory).rmdir()
    assert not delegation.exists()


def trial(directory, case, node):
    d = CGROOT / ('nomue-admission-' + uuid.uuid4().hex)
    d.mkdir()
    row = {'delegation': str(d), 'pass': False}
    process = None
    try:
        (d / 'cgroup.subtree_control').write_text('+cpu +memory +pids')
        (d / 'supervisor').mkdir()
        (d / 'calls').mkdir()
        (d / 'calls' / 'cgroup.subtree_control').write_text('+cpu +memory +pids')
        # A fresh empty cgroup can already have kernel charges; never subtract peaks.
        row['outer_initial_peak_bytes'] = int((d / 'memory.peak').read_text())
        row['outer_initial_current_bytes'] = int((d / 'memory.current').read_text())
        assert kv(d / 'cgroup.events')['populated'] == 0, 'fresh hierarchy has tasks'
        before = kv(d / 'memory.events')
        before_pids = kv(d / 'pids.events')
        # The tiny trusted launcher joins before exec. Its earlier allocations are excluded.
        launcher = "import os,sys; open(sys.argv[1]+'/supervisor/cgroup.procs','w').write(str(os.getpid())); os.execv(sys.argv[2],sys.argv[2:])"
        args = [sys.executable, '-I', '-c', launcher, str(d), sys.executable, '-I',
                str(CONTROL / 'supervisor.py'), '--delegation', str(d), '--node', node,
                '--python', sys.executable, str(directory / (case['name'] + '.record')),
                str(directory / (case['name'] + '.expected'))]
        started = time.monotonic()
        process = subprocess.Popen(args, cwd=ROOT, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                                   env={'PATH': '/usr/bin:/bin', 'LANG': 'C.UTF-8'}, close_fds=True)
        out, err = process.communicate(timeout=45)
        row['external_elapsed_seconds'] = time.monotonic() - started
        row['outer_peak_bytes'] = int((d / 'memory.peak').read_text())
        row['outer_memory_events'] = {k: v - before.get(k, 0) for k, v in kv(d / 'memory.events').items()}
        row['outer_pids_events'] = {k: v - before_pids.get(k, 0) for k, v in kv(d / 'pids.events').items()}
        row['outer_cpu_stat'] = kv(d / 'cpu.stat')
        row['outer_limits'] = {n: (d / n).read_text().strip() for n in ('memory.max', 'memory.swap.max', 'pids.max', 'cpu.max')}
        row['exit'] = process.returncode
        row['stderr'] = err.decode('utf-8', errors='replace')[:2048]
        row['raw_receipt_sha256'] = hashlib.sha256(out).hexdigest()
        row['raw_receipt_bytes'] = len(out)
        assert process.returncode == 0 and not err, row
        receipt = json.loads(out)
        # Retain exact OS observations and output checks, omitting repeated Record bytes.
        row['receipt'] = {k: v for k, v in receipt.items() if k != 'result'}
        assert receipt['category'] == 'completed_valid', receipt['category']
        assert all(receipt['evidence']['cleanup'].values())
        assert not any(row['outer_memory_events'].values()) and not any(row['outer_pids_events'].values())
        assert receipt['evidence']['memory.peak'] is not None
        assert row['outer_peak_bytes'] >= receipt['evidence']['memory.peak']
        row['output'] = verify_output(receipt['result'], case)
        row['forwarded_record_sha256'] = case['record_sha256'] if case['want'] == 'pass' else None
        row['pass'] = True
    except Exception as e:
        row['error'] = repr(e)
    finally:
        if process and process.poll() is None:
            for name, operation in [('subtree_kill', lambda: (d / 'cgroup.kill').write_text('1')),
                                    ('launcher_kill', process.kill),
                                    ('launcher_wait', lambda: process.communicate(timeout=5))]:
                try:
                    operation()
                except Exception as e:
                    row.setdefault('cleanup_attempt_errors', {})[name] = repr(e)
                    row['pass'] = False
        try:
            teardown(d)
            row['outer_cleanup'] = True
        except Exception as e:
            row['outer_cleanup'] = False
            row['cleanup_error'] = repr(e)
            row['pass'] = False
    return row


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--disposable-host-cache-reset', action='store_true')
    p.add_argument('--output', required=True)
    a = p.parse_args()
    node = shutil.which('node')
    report = {'scope': 'unissued full-invocation admission observations', 'kernel': platform.release(),
              'node': subprocess.check_output([node, '--version'], text=True).strip(),
              'python': sys.version, 'real_cache_reset': a.disposable_host_cache_reset, 'rows': []}
    output = Path(a.output).resolve()
    output.write_text(json.dumps(report, indent=2) + '\n')
    if a.disposable_host_cache_reset:
        # Explicit operator opt-in AND hosted-runner identity, never merely sudo availability.
        assert os.geteuid() == 0 and os.environ.get('GITHUB_ACTIONS') == 'true'
        assert os.environ.get('RUNNER_ENVIRONMENT') == 'github-hosted' and os.environ.get('RUNNER_OS') == 'Linux'
        assert {'cpu', 'memory', 'pids'}.issubset((CGROOT / 'cgroup.subtree_control').read_text().split())
        report['host'] = {k: os.environ.get(k) for k in ('GITHUB_RUN_ID', 'GITHUB_SHA', 'RUNNER_ENVIRONMENT', 'RUNNER_OS', 'ImageOS', 'ImageVersion')}
        report['ancestor_limits'] = {n: (CGROOT / n).read_text().strip() if (CGROOT / n).exists() else None for n in ('memory.max', 'memory.swap.max', 'pids.max', 'cpu.max')}
        report['mounts'] = Path('/proc/mounts').read_text()
    report['runtime'] = {'node_sha256': sha(node), 'python_sha256': sha(sys.executable),
                         'supervisor_sha256': sha(CONTROL / 'supervisor.py')}
    with tempfile.TemporaryDirectory(prefix='nomue-admission-inputs-') as td:
        directory = Path(td)
        report['cases'] = prepare(directory, node)
        output.write_text(json.dumps(report, indent=2) + '\n')
        for case in report['cases']:
            if not a.disposable_host_cache_reset:
                env = {'PATH': '/usr/bin:/bin', 'NOMUE_EXPERIMENT_PYTHON': sys.executable, 'TMPDIR': td}
                result = subprocess.run([node, str(CONTROL / 'entry.mjs'), str(directory / (case['name'] + '.record')),
                                         str(directory / (case['name'] + '.expected'))], cwd=ROOT,
                                        env=env, capture_output=True, timeout=30)
                row = {'case': case['name'], 'mode': 'local-entry-only', 'pass': False}
                try:
                    assert result.returncode == 0 and not result.stderr
                    row['output'] = verify_output(json.loads(result.stdout), case)
                    row['pass'] = True
                except Exception as e:
                    row['error'] = repr(e)
                report['rows'].append(row)
            else:
                for repeat in range(3):
                    for mode in ('cache-reset-requested', 'warm-repeat'):
                        try:
                            cache = reset_cache(directory / 'sentinel') if mode == 'cache-reset-requested' else {'request': None, 'pass': True}
                        except Exception as e:
                            cache = {'request': 3, 'pass': False, 'error': repr(e)}
                        if cache['pass']:
                            try:
                                row = trial(directory, case, node)
                            except Exception as e:
                                row = {'pass': False, 'error': repr(e)}
                        else:
                            row = {'pass': False, 'error': 'cache preparation failed; trial not run'}
                        row.update({'case': case['name'], 'repeat': repeat, 'mode': mode, 'cache': cache})
                        report['rows'].append(row)
                        output.write_text(json.dumps(report, indent=2) + '\n')
        report['controls'] = len(report['rows'])
        report['passed'] = sum(r['pass'] for r in report['rows'])
        output.write_text(json.dumps(report, indent=2) + '\n')
        print(json.dumps({k: report[k] for k in ('real_cache_reset', 'controls', 'passed')}))
        if report['passed'] != report['controls']:
            raise SystemExit(1)


if __name__ == '__main__':
    main()
