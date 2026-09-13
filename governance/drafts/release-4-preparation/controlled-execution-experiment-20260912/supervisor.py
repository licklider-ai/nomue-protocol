"""Isolated single-worker experiment; no public API or process-tree memory claim."""
import hashlib
import json
import os
from pathlib import Path
import platform
import selectors
import signal
import subprocess
import sys
import threading
import time

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
MEMORY = 256 * 1024 * 1024
CPU = 25
WALL = 30.0
CLEANUP = 2.0
OUT_CAP = 2 * 1024 * 1024
ERR_CAP = 65536


def host():
    if threading.current_thread() is not threading.main_thread():
        raise ValueError('main-thread supervisor required for cancellation handling')
    if (platform.system(), platform.machine(), platform.python_implementation(),
            platform.python_version()) != ('Linux', 'x86_64', 'CPython', '3.12.14'):
        raise ValueError('experimental host requires Linux x86_64 CPython 3.12.14')
    pins = json.loads((HERE / 'INPUTS.json').read_text())
    for row in pins['runtime']:
        if hashlib.sha256((ROOT / row['path']).read_bytes()).hexdigest() != row['sha256']:
            raise ValueError('runtime source drift')
    return {'python': platform.python_version(), 'machine': platform.machine(),
            'kernel': platform.release(),
            'python_sha256': hashlib.sha256(Path(sys.executable).read_bytes()).hexdigest()}


def _launch(command, payload, *, wall=WALL, out_cap=OUT_CAP, started=None):
    """Trusted internal harness; command/limits cannot come from caller data."""
    started = time.monotonic() if started is None else started
    flags = []
    process = selector = None
    stdout, stderr = bytearray(), bytearray()
    counts = {'stdout': 0, 'stderr': 0}
    cleanup = False
    code = None
    previous = {}
    def cancel(signum, frame):
        raise KeyboardInterrupt
    def mark(reason):
        if reason not in flags:
            flags.append(reason)
    try:
        for sig in (signal.SIGINT, signal.SIGTERM):
            previous[sig] = signal.signal(sig, cancel)
        # Do not let a cancellation arrive after the child exists but before
        # Popen has returned the handle needed for cleanup.
        mask = signal.pthread_sigmask(signal.SIG_BLOCK, {signal.SIGINT, signal.SIGTERM})
        try:
            process = subprocess.Popen(command, stdin=subprocess.PIPE, stdout=subprocess.PIPE,
                                       stderr=subprocess.PIPE, cwd=HERE,
                                       env={'PATH': '/usr/bin:/bin', 'LANG': 'C.UTF-8'},
                                       start_new_session=True, close_fds=True)
        finally:
            signal.pthread_sigmask(signal.SIG_SETMASK, mask)
        selector = selectors.DefaultSelector()
        for stream, name, event in ((process.stdin, 'stdin', selectors.EVENT_WRITE),
                                    (process.stdout, 'stdout', selectors.EVENT_READ),
                                    (process.stderr, 'stderr', selectors.EVENT_READ)):
            os.set_blocking(stream.fileno(), False)
            selector.register(stream, event, name)
        sent = 0
        while selector.get_map():
            if time.monotonic() - started >= wall:
                mark('deadline')
                break
            for key, _ in selector.select(min(.01, max(0, wall - (time.monotonic() - started)))):
                if key.data == 'stdin':
                    try:
                        sent += os.write(key.fd, payload[sent:sent + 65536])
                    except BrokenPipeError:
                        sent = len(payload)
                    if sent == len(payload):
                        selector.unregister(key.fileobj)
                        key.fileobj.close()
                else:
                    b = os.read(key.fd, 65536)
                    if not b:
                        selector.unregister(key.fileobj)
                        key.fileobj.close()
                        continue
                    counts[key.data] += len(b)
                    target, cap = (stdout, out_cap) if key.data == 'stdout' else (stderr, ERR_CAP)
                    target.extend(b[:max(0, cap - len(target))])
                    if counts[key.data] > cap:
                        mark('output_overflow')
            if flags:
                break
        if not flags:
            try:
                code = process.wait(timeout=max(.001, wall - (time.monotonic() - started)))
            except subprocess.TimeoutExpired:
                mark('deadline')
        if time.monotonic() - started >= wall:
            mark('deadline')
    except (KeyboardInterrupt, SystemExit):
        mark('cancelled')
    except Exception:
        mark('execution_error')
    finally:
        # Repeated cancellation cannot interrupt cleanup. Restore caller handlers
        # only once all child pipes are closed and the trusted worker is reaped.
        for sig in previous:
            signal.signal(sig, signal.SIG_IGN)
        if process is not None:
            # Even a normally exited leader can leave a pipe holder. The trusted
            # numerical path creates no descendants; group kill is best effort
            # cleanup, not a process-tree sandbox or cgroup substitute.
            try:
                os.killpg(process.pid, signal.SIGKILL)
            except ProcessLookupError:
                pass
            except OSError:
                mark('cleanup_failed')
            try:
                code = process.wait(timeout=CLEANUP)
                cleanup = True
            except subprocess.TimeoutExpired:
                mark('cleanup_failed')
        if selector:
            for key in list(selector.get_map().values()):
                key.fileobj.close()
            selector.close()
        elif process is not None:
            for stream in (process.stdin, process.stdout, process.stderr):
                if stream is not None:
                    stream.close()
        for sig, handler in previous.items():
            signal.signal(sig, handler)
    if code == -signal.SIGXCPU:
        mark('cpu_limit')
    elif code == 71:
        mark('allocation_failure')
    elif code != 0 and not flags:
        mark('abnormal_exit')
    if stderr and not flags:
        mark('unexpected_stderr')
    receipt = {'category': flags[0] if flags else 'completed_transport', 'causes': flags,
               'elapsed_seconds': time.monotonic() - started, 'worker_reaped': cleanup,
               'exit_code': code, 'bytes_observed': counts,
               'bytes_buffered': {'stdout': len(stdout), 'stderr': len(stderr)}}
    if not flags:
        try:
            result = json.loads(stdout)  # Generated trusted worker transport, not a Record.
            if type(result) is not dict:
                raise ValueError('transport object')
            receipt['transport'] = result
        except (ValueError, RecursionError):
            receipt.update(category='invalid_worker_output', causes=['invalid_worker_output'])
    return receipt


def run(cells, revision, submitted=None):
    """Synchronous, builtin-only Python inputs; no caller-supplied execution policy."""
    started = time.monotonic()
    try:
        environment = host()
    except (ValueError, OSError, KeyError, TypeError):
        return {'category': 'unsupported_host_or_source', 'scientific_validity': 'not_asserted'}
    from transport import encode
    try:
        payload = encode(cells, revision, submitted)
    except ValueError as error:
        return {'category': 'input_refused', 'reason': str(error), 'scientific_validity': 'not_asserted'}
    command = [sys.executable, '-I', '-B', str(HERE / 'worker.py'), str(MEMORY), str(CPU)]
    receipt = _launch(command, payload, started=started)
    receipt['environment'] = environment
    receipt['scientific_validity'] = 'not_asserted'
    transport = receipt.pop('transport', None)
    if receipt['category'] == 'completed_transport':
        expected_limits = {'address_space': [MEMORY, MEMORY], 'cpu': [CPU, CPU + 1], 'core': [0, 0]}
        if (type(transport) is not dict or set(transport) != {'kind', 'scientific_validity', 'limits', 'outcome'} or
                transport['kind'] != 'r4-controlled-experiment' or
                transport['scientific_validity'] != 'not_asserted' or transport['limits'] != expected_limits or
                type(transport['outcome']) is not dict or
                transport['outcome'].get('state') not in ('completed', 'refused', 'unresolved')):
            receipt.update(category='invalid_worker_output', causes=['invalid_worker_output'])
        else:
            from output import validate
            try:
                validate(transport['outcome'], payload)
            except (ValueError, KeyError, TypeError):
                receipt.update(category='invalid_worker_output', causes=['invalid_worker_output'])
            else:
                receipt['category'] = 'completed_worker'
                receipt['outcome'] = transport['outcome']
                receipt['enforced_limits'] = expected_limits
    return receipt
