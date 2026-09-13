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
    before_fds = len(os.listdir('/proc/self/fd'))
    original_popen = s.subprocess.Popen
    original_killpg = s.os.killpg
    original_wait = s.subprocess.Popen.wait
    events, children, threads = [], [], []
    killed = set()
    signal_number = signal.SIGINT if mode == 'loop-int' else signal.SIGTERM
    result = None
    fire, delivered, ready = threading.Event(), threading.Event(), threading.Event()
    if mode in ('thread-launch', 'loop-int', 'loop-term'):
        def sender():
            signal.pthread_sigmask(signal.SIG_UNBLOCK, {signal.SIGINT, signal.SIGTERM})
            ready.set()
            if fire.wait(3):
                # Target this pre-existing unmasked thread, rather than relying
                # on the kernel to choose it for a process-directed signal.
                signal.pthread_kill(threading.get_ident(), signal_number)
                delivered.set()
        t = threading.Thread(target=sender)
        threads.append(t); t.start(); ready.wait()

    def launch(*args, **kwargs):
        p = original_popen(*args, **kwargs)
        children.append(p.pid)
        if mode in ('thread-launch', 'loop-int', 'loop-term'):
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
        result = s._launch(command, b'', wall=1)
        need(mode == 'normal-reap', 'cancellation returned normally')
        need(result['category'] == 'completed_transport', 'normal completion failed')
    except (KeyboardInterrupt, SystemExit) as error:
        need(mode != 'normal-reap', 'unexpected cancellation')
        result = error.receipt
        need(error.signum == signal.SIGTERM, 'first cancellation not retained')
        need(isinstance(error, SystemExit) and error.code == 143, 'TERM termination semantics')
        need('transport' not in result and result['category'] == 'cancelled', 'cancelled output')
    finally:
        if timer: timer.join()
        for t in threads: t.join()
        original_popen.wait = original_wait
        s.subprocess.Popen = original_popen
        s.os.killpg = original_killpg
    need(result['worker_reaped'], 'worker not reaped')
    for pid in children:
        try:
            os.kill(pid, 0)
        except ProcessLookupError:
            pass
        else:
            raise RuntimeError('worker still present')
    need(before_handlers == {sig: signal.getsignal(sig) for sig in before_handlers}, 'handler restoration')
    need(before_mask == signal.pthread_sigmask(signal.SIG_BLOCK, set()), 'mask changed')
    need(before_fds == len(os.listdir('/proc/self/fd')), 'fd leak')
    print(json.dumps({'mode':mode,'passed':True,'receipt':result,'events':events,
                      'handlers_restored':True,'fds_restored':True,'worker_absent':True}))


def main():
    rows = []
    for mode in ('thread-launch','repeated-cleanup','normal-reap','loop-int','loop-term'):
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
