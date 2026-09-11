"""E4b: the real envelope call (real_call.mjs: Node leader + real isolated Python worker) inside
a cgroup v1 memory cgroup at several limits with a 15 s wall deadline. Records exit status,
output presence, OOM count, reclaim failure count, charged peak and leftovers. Compare the
charged peak with the VmRSS sampled by tree.py for the same call."""
import json, os, signal, subprocess, sys, time

BASE = os.environ['NOMUE_REVIEW_V1_MEMORY_CGROUP']
NODE = os.environ.get('NOMUE_REVIEW_NODE', 'node')
HERE = os.path.dirname(os.path.abspath(__file__))


def rd(p):
    return open(p).read().strip()


def main():
    out = {}
    for mib in (8, 16, 32, 48, 100, 512):
        cg = f'{BASE}/nomue-review-e4b-{os.getpid()}-{mib}'
        os.mkdir(cg)
        row = {}
        try:
            open(f'{cg}/memory.limit_in_bytes', 'w').write(str(mib * 1024 * 1024))
            row['limit_readback'] = int(rd(f'{cg}/memory.limit_in_bytes'))
            cmd = f'echo $$ > {cg}/cgroup.procs && exec {NODE} {HERE}/real_call.mjs'
            t0 = time.monotonic()
            p = subprocess.Popen(['sh', '-c', cmd], stdout=subprocess.PIPE, stderr=subprocess.PIPE, start_new_session=True)
            try:
                so, se = p.communicate(timeout=15)
                row['outcome'] = 'exited'
            except subprocess.TimeoutExpired:
                row['outcome'] = 'wall_deadline_15s'
                row['procs_in_cgroup_at_deadline'] = rd(f'{cg}/cgroup.procs').split()
                row['usage_at_deadline'] = int(rd(f'{cg}/memory.usage_in_bytes'))
                row['failcnt_at_deadline'] = int(rd(f'{cg}/memory.failcnt'))
                os.killpg(p.pid, signal.SIGKILL)
                so, se = p.communicate()
            row['wall_s'] = round(time.monotonic() - t0, 3)
            time.sleep(0.3)
            row.update({'leader_returncode': p.returncode, 'stdout_bytes': len(so),
                        'stdout_head': so.decode(errors='replace').strip()[:120], 'stderr_tail': se.decode(errors='replace').strip()[-200:],
                        'oom_kill_count': rd(f'{cg}/memory.oom_control').split()[-1],
                        'charged_peak_bytes': int(rd(f'{cg}/memory.max_usage_in_bytes')), 'failcnt': int(rd(f'{cg}/memory.failcnt')),
                        'procs_left_after_leader_exit': rd(f'{cg}/cgroup.procs').split()})
            for pid in row['procs_left_after_leader_exit']:
                try:
                    os.kill(int(pid), signal.SIGKILL)
                except ProcessLookupError:
                    pass
        finally:
            for _ in range(100):
                try:
                    os.rmdir(cg)
                    break
                except OSError:
                    time.sleep(0.05)
            row['rmdir_ok'] = not os.path.exists(cg)
        out[f'{mib}MiB'] = row
    print(json.dumps(out, indent=1))


if __name__ == '__main__':
    main()
