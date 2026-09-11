"""E2: cgroup v2 lifecycle semantics on a unified hierarchy; no controllers are needed.
Creates a private child cgroup under NOMUE_REVIEW_V2_ROOT (default /sys/fs/cgroup/unified),
runs a leader that spawns a setsid grandchild holding the stdout pipe, then observes
cgroup.events populated, zombie state, rmdir and cgroup.kill behaviour. Removes the cgroup."""
import json, os, signal, subprocess, sys, time

ROOT = os.environ.get('NOMUE_REVIEW_V2_ROOT', '/sys/fs/cgroup/unified')
CG = f'{ROOT}/nomue-review-e2-{os.getpid()}'


def rd(p):
    return open(p).read().strip()


def populated():
    return dict(l.split() for l in rd(f'{CG}/cgroup.events').splitlines())['populated']


def state(pid):
    try:
        st = open(f'/proc/{pid}/stat').read()
        a = st[st.rindex(')') + 2:].split()
        return {'state': a[0], 'ppid': int(a[1])}
    except FileNotFoundError:
        return {'state': 'gone'}


def main():
    log = {'v2_root': ROOT, 'root_controllers': rd(f'{ROOT}/cgroup.controllers')}
    os.mkdir(CG)
    try:
        log['created_files'] = sorted(os.listdir(CG))
        leader_code = ('import os, subprocess, sys, time\n'
                       'g = subprocess.Popen([sys.executable, "-c", "import time; time.sleep(120)"], start_new_session=True)\n'
                       'print("leader", os.getpid(), "grandchild", g.pid, flush=True)\n'
                       'time.sleep(120)\n')
        cmd = f"echo $$ > {CG}/cgroup.procs && exec {sys.executable} -c '{leader_code}'"
        p = subprocess.Popen(['sh', '-c', cmd], stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
        first = p.stdout.readline().split()
        leader, grand = int(first[1]), int(first[3])
        time.sleep(0.2)
        log['procs_after_start'] = rd(f'{CG}/cgroup.procs').split()
        log['populated_after_start'] = populated()
        log['grandchild_v2_cgroup_line'] = [l for l in rd(f'/proc/{grand}/cgroup').splitlines() if l.startswith('0::')]
        log['grandchild_sid_differs_from_leader'] = os.getsid(grand) != os.getsid(leader)
        os.kill(leader, signal.SIGKILL)  # what an execFile timeout does: signal the direct child only
        time.sleep(0.3)
        log['leader_unreaped'] = state(leader)
        log['procs_after_leader_kill_unreaped'] = rd(f'{CG}/cgroup.procs').split()
        log['populated_after_leader_kill_unreaped'] = populated()
        os.set_blocking(p.stdout.fileno(), False)
        try:
            log['pipe_eof_after_leader_kill'] = p.stdout.read() == ''
        except Exception as e:
            log['pipe_eof_after_leader_kill'] = f'no EOF ({type(e).__name__})'
        p.wait()
        log['leader_wait_status'] = p.returncode
        time.sleep(0.2)
        log['populated_after_leader_reaped'] = populated()
        log['grandchild_after_leader_reaped'] = state(grand)
        try:
            os.rmdir(CG)
            log['rmdir_while_populated'] = 'succeeded (unexpected)'
        except OSError as e:
            log['rmdir_while_populated'] = f'errno {e.errno} {e.strerror}'
        t0 = time.monotonic()
        open(f'{CG}/cgroup.kill', 'w').write('1')
        while populated() != '0' and time.monotonic() - t0 < 5:
            time.sleep(0.001)
        log['cgroup_kill_to_populated0_ms'] = round((time.monotonic() - t0) * 1000, 2)
        log['populated_after_cgroup_kill'] = populated()
        log['grandchild_immediately_after_populated0'] = state(grand)
        time.sleep(0.5)
        log['grandchild_500ms_later'] = state(grand)
        try:
            log['pipe_eof_after_cgroup_kill'] = p.stdout.read() in ('', None)
        except Exception as e:
            log['pipe_eof_after_cgroup_kill'] = f'no EOF ({type(e).__name__})'
    finally:
        try:
            os.rmdir(CG)
            log['rmdir_after_kill'] = 'ok'
        except OSError as e:
            log['rmdir_after_kill'] = f'errno {e.errno} {e.strerror}'
    print(json.dumps(log, indent=1))


if __name__ == '__main__':
    main()
