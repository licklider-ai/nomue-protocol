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
    if signal.getsignal(signal.SIGCHLD) != signal.SIG_DFL or not hasattr(os, 'pidfd_open'):
        raise ValueError('pidfd and default SIGCHLD required')
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
    """Exclusive child ownership; other threads may run, but may not reap this child.

    Cancellation is recorded without raising inside a signal handler. A self-pipe
    wakes select; a pidfd observes exit without reaping or releasing the PID.
    """
    if threading.current_thread() is not threading.main_thread():
        raise ValueError('main-thread supervisor required')
    if signal.getsignal(signal.SIGCHLD) != signal.SIG_DFL:
        raise ValueError('default SIGCHLD and exclusive child ownership required')
    started = time.monotonic() if started is None else started
    flags = []
    process = selector = None
    pidfd = None
    wake_read = wake_write = None
    stdout, stderr = bytearray(), bytearray()
    counts = {'stdout': 0, 'stderr': 0}
    cleanup = False
    code = None
    previous = {}
    cancelled_signal = None
    pending_exception = None
    exit_seen = False

    def cancel(signum, frame):
        nonlocal cancelled_signal
        if cancelled_signal is None:
            cancelled_signal = signum
        # Nonblocking: a full pipe already guarantees a wakeup. No exception
        # escapes, including during Popen assignment or any cleanup instruction.
        try:
            os.write(wake_write, b'x')
        except (OSError, TypeError):
            pass

    def mark(reason):
        if reason not in flags:
            flags.append(reason)

    def observe_exit():
        # WNOWAIT retains the zombie/PID until group cleanup is complete.
        result = os.waitid(os.P_PID, process.pid, os.WEXITED | os.WNOHANG | os.WNOWAIT)
        if result is None:
            return None
        return result.si_status if result.si_code == os.CLD_EXITED else -result.si_status

    try:
        wake_read, wake_write = os.pipe2(os.O_NONBLOCK | os.O_CLOEXEC)
        for sig in (signal.SIGINT, signal.SIGTERM):
            previous[sig] = signal.signal(sig, cancel)
        process = subprocess.Popen(command, stdin=subprocess.PIPE, stdout=subprocess.PIPE,
                                   stderr=subprocess.PIPE, cwd=HERE,
                                   env={'PATH': '/usr/bin:/bin', 'LANG': 'C.UTF-8'},
                                   start_new_session=True, close_fds=True)
        pidfd = os.pidfd_open(process.pid)
        selector = selectors.DefaultSelector()
        selector.register(wake_read, selectors.EVENT_READ, 'cancel')
        selector.register(pidfd, selectors.EVENT_READ, 'exit')
        for stream, name, event in ((process.stdin, 'stdin', selectors.EVENT_WRITE),
                                    (process.stdout, 'stdout', selectors.EVENT_READ),
                                    (process.stderr, 'stderr', selectors.EVENT_READ)):
            os.set_blocking(stream.fileno(), False)
            selector.register(stream, event, name)
        sent = 0
        while True:
            if cancelled_signal is not None:
                mark('cancelled')
                break
            remaining = wall - (time.monotonic() - started)
            if remaining <= 0:
                mark('deadline')
                break
            streams_open = any(k.data in ('stdin', 'stdout', 'stderr') for k in selector.get_map().values())
            if exit_seen and not streams_open:
                break
            for key, _ in selector.select(remaining):
                if key.data == 'cancel':
                    try:
                        os.read(wake_read, 65536)
                    except BlockingIOError:
                        pass
                elif key.data == 'exit':
                    code = observe_exit()
                    if code is None:
                        raise RuntimeError('pidfd without waitable child')
                    exit_seen = True
                    selector.unregister(pidfd)
                elif key.data == 'stdin':
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
        if time.monotonic() - started >= wall:
            mark('deadline')
    except (KeyboardInterrupt, SystemExit) as error:
        # Preserve explicit exceptions from trusted caller hooks as well.
        pending_exception = error
        mark('cancelled')
    except Exception:
        mark('execution_error')
    finally:
        # Keep the non-raising handlers installed throughout cleanup. Repeated
        # signals only update the flag/pipe; no vulnerable SIG_IGN transition.
        try:
            if process is not None:
                owned = True
                try:
                    observe_exit()
                except ChildProcessError:
                    # Never signal a numeric process-group ID after losing child
                    # ownership. Concurrent external reapers are unsupported.
                    owned = False
                    mark('child_ownership_lost')
                if owned:
                    try:
                        os.killpg(process.pid, signal.SIGKILL)
                    except ProcessLookupError:
                        pass
                    except OSError:
                        mark('cleanup_failed')
                    try:
                        code = process.wait(timeout=CLEANUP)
                        cleanup = True
                    except (subprocess.TimeoutExpired, ChildProcessError):
                        mark('cleanup_failed')
        finally:
            if selector:
                selector.close()
            if process is not None:
                for stream in (process.stdin, process.stdout, process.stderr):
                    if stream is not None:
                        stream.close()
            if pidfd is not None:
                os.close(pidfd)
            # Restore the caller's handlers before closing the self-pipe.
            try:
                if signal.SIGINT in previous:
                    signal.signal(signal.SIGINT, previous[signal.SIGINT])
            finally:
                try:
                    if signal.SIGTERM in previous:
                        signal.signal(signal.SIGTERM, previous[signal.SIGTERM])
                finally:
                    for fd in (wake_read, wake_write):
                        if fd is not None:
                            os.close(fd)
    if cancelled_signal is not None:
        mark('cancelled')
    if code == -signal.SIGXCPU:
        mark('cpu_limit')
    elif code == 71:
        mark('allocation_failure')
    elif code != 0 and not flags:
        mark('abnormal_exit')
    if stderr and not flags:
        mark('unexpected_stderr')
    receipt = {'category': 'cancelled' if cancelled_signal is not None else (flags[0] if flags else 'completed_transport'),
               'causes': flags, 'elapsed_seconds': time.monotonic() - started, 'worker_reaped': cleanup,
               'exit_code': code, 'bytes_observed': counts,
               'bytes_buffered': {'stdout': len(stdout), 'stderr': len(stderr)}}
    if cancelled_signal is not None:
        error = KeyboardInterrupt() if cancelled_signal == signal.SIGINT else SystemExit(128 + cancelled_signal)
        error.receipt = receipt
        error.signum = cancelled_signal
        raise error
    if pending_exception is not None:
        pending_exception.receipt = receipt
        raise pending_exception
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
