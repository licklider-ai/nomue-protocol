"""E5: SIGKILL the Node leader of a real envelope call while the Python worker is running.
Checks whether the worker outlives the leader and whether bridge.runWorker's temporary
directory (removed only by a JavaScript finally block) is left behind."""
import glob, json, os, signal, subprocess, tempfile, time

NODE = os.environ.get('NOMUE_REVIEW_NODE', 'node')
HERE = os.path.dirname(os.path.abspath(__file__))


def main():
    before = set(glob.glob(os.path.join(tempfile.gettempdir(), 'holm-worker-*')))
    p = subprocess.Popen([NODE, os.path.join(HERE, 'real_call.mjs')], stdout=subprocess.PIPE, stderr=subprocess.PIPE, start_new_session=True)
    worker, t0 = None, time.monotonic()
    while p.poll() is None and time.monotonic() - t0 < 20 and worker is None:
        for e in os.listdir('/proc'):
            if e.isdigit():
                try:
                    st = open(f'/proc/{e}/stat').read()
                    a = st[st.rindex(')') + 2:].split()
                    if int(a[1]) == p.pid and 'python' in st[:st.rindex(')')]:
                        worker = int(e)
                except Exception:
                    pass
        time.sleep(0.0005)
    log = {'worker_found_while_leader_alive': worker is not None}
    if worker:
        os.kill(p.pid, signal.SIGKILL)
        p.wait()
        time.sleep(0.3)
        log['leader_status'] = p.returncode
        log['worker_exists_after_leader_kill'] = os.path.exists(f'/proc/{worker}')
        if log['worker_exists_after_leader_kill']:
            st = open(f'/proc/{worker}/stat').read()
            a = st[st.rindex(')') + 2:].split()
            log['worker_state'] = a[0]
            log['worker_ppid'] = int(a[1])
            time.sleep(2)
            log['worker_exists_after_2s'] = os.path.exists(f'/proc/{worker}')
            try:
                os.kill(worker, signal.SIGKILL)
            except ProcessLookupError:
                pass
    after = set(glob.glob(os.path.join(tempfile.gettempdir(), 'holm-worker-*')))
    log['leaked_tmp_dirs'] = sorted(after - before)
    log['leaked_contents'] = {}
    for d in after - before:
        log['leaked_contents'][d] = os.listdir(d)
        subprocess.run(['rm', '-rf', d])
    print(json.dumps(log, indent=1))


if __name__ == '__main__':
    main()
