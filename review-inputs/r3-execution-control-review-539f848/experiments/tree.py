"""E1: sample the process tree of a command's session from /proc: per-process thread counts,
VmRSS and command lines. Reports the peak total thread count and every distinct process seen."""
import json, os, subprocess, sys, time


def snapshot(sid):
    rows = []
    for e in os.listdir('/proc'):
        if not e.isdigit():
            continue
        try:
            st = open(f'/proc/{e}/stat').read()
            after = st[st.rindex(')') + 2:].split()
            if int(after[3]) != sid:
                continue
            status = dict(l.split(':', 1) for l in open(f'/proc/{e}/status') if ':' in l)
            cmd = open(f'/proc/{e}/cmdline', 'rb').read().replace(b'\0', b' ').decode(errors='replace')[:140]
            rows.append({'pid': int(e), 'ppid': int(after[1]), 'threads': int(status['Threads']),
                         'vmrss_kib': int(status.get('VmRSS', '0 kB').split()[0]), 'comm': status['Name'].strip(), 'cmd': cmd})
        except Exception:
            continue
    return rows


def run(args, env=None, interval=0.005, limit=60):
    p = subprocess.Popen(args, stdout=subprocess.PIPE, stderr=subprocess.PIPE, start_new_session=True, env=env)
    peak_procs, peak_threads, seen = [], 0, {}
    t0 = time.monotonic()
    while p.poll() is None and time.monotonic() - t0 < limit:
        s = snapshot(p.pid)
        th = sum(r['threads'] for r in s)
        if th > peak_threads:
            peak_threads, peak_procs = th, s
        for r in s:
            key = (r['comm'], r['cmd'])
            seen[key] = max(seen.get(key, 0), r['threads'])
        time.sleep(interval)
    out, err = p.communicate(timeout=10)
    return {'args': args, 'returncode': p.returncode, 'wall_s': round(time.monotonic() - t0, 3),
            'peak_total_threads': peak_threads, 'peak_snapshot': peak_procs,
            'distinct_processes': [{'comm': k[0], 'cmd': k[1], 'max_threads': v} for k, v in seen.items()],
            'stdout_head': out[:300].decode(errors='replace'), 'stderr_head': err[:300].decode(errors='replace')}


if __name__ == '__main__':
    print(json.dumps(run(sys.argv[1:]), indent=1))
