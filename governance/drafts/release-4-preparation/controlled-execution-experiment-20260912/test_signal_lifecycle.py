"""Isolated regressions for the user-supplied signal/reaping review of be2c488."""
import json
import os
from pathlib import Path
import signal
import subprocess
import sys
import threading
import time

import supervisor as s

HERE = Path(__file__).resolve().parent


def need(ok, label):
    if not ok:
        raise RuntimeError(label)


def child(mode):
    before_handlers = {sig: signal.getsignal(sig) for sig in (signal.SIGINT, signal.SIGTERM)}
    before_mask = signal.pthread_sigmask(signal.SIG_BLOCK, set())
    caller_read, caller_write = os.pipe2(os.O_NONBLOCK | os.O_CLOEXEC)
    original_wakeup_fd = signal.set_wakeup_fd(caller_write)
    before_fds = len(os.listdir('/proc/self/fd'))
    original_popen = s.subprocess.Popen
    original_killpg = s.os.killpg
    original_wait = s.subprocess.Popen.wait
    original_selector = s.selectors.DefaultSelector
    events, children, threads = [], [], []
    killed = set()
    signal_number = signal.SIGINT if mode == 'loop-int' else signal.SIGTERM
    result = None
    fire, delivered, ready = threading.Event(), threading.Event(), threading.Event()
    if mode in ('thread-launch', 'thread-select', 'run-receipt', 'loop-int', 'loop-term'):
        def sender():
            signal.pthread_sigmask(signal.SIG_UNBLOCK, {signal.SIGINT, signal.SIGTERM})
            ready.set()
            if fire.wait(3):
                if mode == 'thread-select':
                    time.sleep(.15)  # Let main enter the blocking OS select.
                # Target this pre-existing unmasked thread, rather than relying
                # on the kernel to choose it for a process-directed signal.
                signal.pthread_kill(threading.get_ident(), signal_number)
                delivered.set()
        t = threading.Thread(target=sender)
        threads.append(t); t.start(); ready.wait()

    def launch(*args, **kwargs):
        if mode == 'launch-failure':
            raise OSError('injected launch failure')
        p = original_popen(*args, **kwargs)
        children.append(p.pid)
        if mode in ('thread-launch', 'run-receipt', 'loop-int', 'loop-term'):
            # An additional unmasked thread exists while the actual child handle
            # has not yet returned to supervisor._launch. Delivery completes here.
            fire.set(); need(delivered.wait(2), 'thread signal not delivered')
            time.sleep(.02)
        return p

    def killpg(pid, sig):
        # The PID is still owned and unreaped at the exact group-signal point.
        os.waitid(os.P_PID, pid, os.WEXITED | os.WNOHANG | os.WNOWAIT)
        events.append('kill-before-reap')
        killed.add(pid)
        if mode == 'repeated-cleanup':
            for _ in range(20):
                os.kill(os.getpid(), signal.SIGTERM)
                os.kill(os.getpid(), signal.SIGINT)
        return original_killpg(pid, sig)

    def wait(p, *args, **kwargs):
        need(p.pid in killed, 'wait/reap preceded group signal')
        events.append('wait-after-kill')
        return original_wait(p, *args, **kwargs)

    class BlockingSelector(original_selector):
        def select(self, timeout=None):
            # No writable stdin or stdout activity can wake this wait.
            if not any(k.data == 'stdin' for k in self.get_map().values()):
                fire.set()
            return super().select(timeout)

    if mode == 'thread-select':
        signal.pthread_sigmask(signal.SIG_BLOCK, {signal.SIGTERM})
        s.selectors.DefaultSelector = BlockingSelector
    s.subprocess.Popen = launch
    # Patch the original class, since the factory is now a function.
    original_popen.wait = wait
    s.os.killpg = killpg
    if mode in ('loop-int', 'loop-term'):
        for _ in range(2):
            s.run([[0., 1.] for _ in range(4)], 'cancel-loop')
            print('LOOP-CONTINUED', flush=True)
        raise RuntimeError('loop did not terminate')
    command = [sys.executable, '-I', '-B', str(HERE/'probe.py'),
               'environment' if mode == 'normal-reap' else 'hang']
    timer = None
    if mode == 'repeated-cleanup':
        timer = threading.Timer(.08, lambda: os.kill(os.getpid(), signal.SIGTERM))
        timer.start()
    try:
        if mode == 'run-receipt':
            result = s.run([[0., 1.] for _ in range(4)], 'cancel-receipt')
        else:
            result = s._launch(command, b'', wall=3 if mode == 'thread-select' else 1)
        need(mode in ('normal-reap', 'launch-failure'), 'cancellation returned normally')
        need(result['category'] == ('execution_error' if mode == 'launch-failure' else
                                    'completed_transport'), 'completion category')
    except (KeyboardInterrupt, SystemExit) as error:
        need(mode != 'normal-reap', 'unexpected cancellation')
        result = error.receipt
        need(error.signum == signal.SIGTERM, 'first cancellation not retained')
        need(isinstance(error, SystemExit) and error.code == 143, 'TERM termination semantics')
        if mode == 'thread-select':
            need(delivered.is_set(), 'target thread did not receive signal')
            need(result['elapsed_seconds'] < 1.5, 'cancellation waited for wall deadline')
            need('deadline' not in result['causes'], 'deadline preceded cancellation')
        if mode == 'run-receipt':
            need(result['environment'] == s.host(), 'cancellation environment missing')
            need(result['scientific_validity'] == 'not_asserted', 'cancellation validity missing')
        need('transport' not in result and result['category'] == 'cancelled', 'cancelled output')
    finally:
        if timer: timer.join()
        for t in threads: t.join()
        original_popen.wait = original_wait
        s.subprocess.Popen = original_popen
        s.os.killpg = original_killpg
        s.selectors.DefaultSelector = original_selector
        observed_mask = signal.pthread_sigmask(signal.SIG_SETMASK, before_mask)
    need(result['worker_reaped'] == (mode != 'launch-failure'), 'worker reap status')
    for pid in children:
        try:
            os.kill(pid, 0)
        except ProcessLookupError:
            pass
        else:
            raise RuntimeError('worker still present')
    need(before_handlers == {sig: signal.getsignal(sig) for sig in before_handlers}, 'handler restoration')
    expected_mask = before_mask | {signal.SIGTERM} if mode == 'thread-select' else before_mask
    need(expected_mask == observed_mask, 'supervisor changed caller mask')
    need(before_fds == len(os.listdir('/proc/self/fd')), 'fd leak')
    restored_wakeup_fd = signal.set_wakeup_fd(original_wakeup_fd)
    need(restored_wakeup_fd == caller_write, 'caller wakeup fd not restored')
    os.close(caller_read); os.close(caller_write)
    print(json.dumps({'mode':mode,'passed':True,'receipt':result,'events':events,
                      'handlers_restored':True,'fds_restored':True,'wakeup_fd_restored':True,'worker_absent':True}))


def main():
    rows = []
    for mode in ('thread-launch','thread-select','run-receipt','launch-failure',
                 'repeated-cleanup','normal-reap','loop-int','loop-term'):
        run = subprocess.run([sys.executable, str(HERE/'test_signal_lifecycle.py'), mode],
                             cwd=HERE,capture_output=True,text=True,timeout=5)
        if mode.startswith('loop-'):
            need(run.returncode in ((-2,130) if mode=='loop-int' else (143,)), 'uncaught cancellation exit: '+repr(run))
            need('LOOP-CONTINUED' not in run.stdout, 'loop continued after cancellation')
            rows.append({'mode':mode,'passed':True,'exit_code':run.returncode,'loop_continued':False})
        else:
            need(run.returncode == 0, run.stderr)
            rows.append(json.loads(run.stdout))
    # Event-driven select should block on the remaining deadline, not 10 ms.
    actual = s.selectors.DefaultSelector
    timeouts = []
    class RecordingSelector(actual):
        def select(self, timeout=None):
            timeouts.append(timeout)
            return super().select(timeout)
    s.selectors.DefaultSelector = RecordingSelector
    try:
        receipt = s._launch([sys.executable,'-I','-B',str(HERE/'probe.py'),'hang'],b'',wall=.2)
    finally:
        s.selectors.DefaultSelector = actual
    need(receipt['category']=='deadline' and len(timeouts)<=4 and max(timeouts)>.1, 'polling persists')
    rows.append({'mode':'event-driven-wait','passed':True,'selector_calls':len(timeouts),'timeouts':timeouts})
    original_chld = signal.signal(signal.SIGCHLD, signal.SIG_IGN)
    try:
        rejected = s.run([[0.,1.] for _ in range(4)], 'ignored-chld')
        need(rejected['category']=='unsupported_host_or_source', 'auto-reap host not refused')
    finally:
        signal.signal(signal.SIGCHLD, original_chld)
    rows.append({'mode':'auto-reap-host-refused','passed':True})
    print(json.dumps({'checks':len(rows),'rows':rows},indent=2))


if __name__ == '__main__':
    child(sys.argv[1]) if len(sys.argv)>1 else main()
