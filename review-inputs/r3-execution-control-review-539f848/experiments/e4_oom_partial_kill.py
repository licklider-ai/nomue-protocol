"""E4: which process an OOM kill selects inside one memory cgroup, and what the leader reports.
Uses the cgroup v1 memory controller (the only memory controller writable in the review sandbox);
the partial-kill behaviour is the documented default of cgroup v2 as well (memory.oom.group=0).
Creates child cgroups under NOMUE_REVIEW_V1_MEMORY_CGROUP (required). Modes:
  child  : Node leader spawns a Python child (execFile, like bridge.runWorker) that allocates 300 MiB
  both   : Node keeps 60 MiB, then the child allocates 300 MiB
  parent : Node allocates 400 MiB before spawning
The leader mirrors bridge.mjs/envelope.mjs: any execFile error becomes a worker_failure report."""
import json, os, subprocess, sys, time, signal

BASE = os.environ['NOMUE_REVIEW_V1_MEMORY_CGROUP']
NODE = os.environ.get('NOMUE_REVIEW_NODE', 'node')
PY = os.environ.get('NOMUE_EXPERIMENT_PYTHON', sys.executable)
LIMIT = 96 * 1024 * 1024
LEADER = r'''
const { execFile } = require("node:child_process");
const mode = process.argv[1];
const keep = [];
if (mode === "parent") for (let i = 0; i < 400; i++) keep.push(Buffer.alloc(1 << 20, 1));
if (mode === "both") for (let i = 0; i < 60; i++) keep.push(Buffer.alloc(1 << 20, 1));
execFile(process.env.NOMUE_EXPERIMENT_PYTHON, ["-I", "-c", "b=bytearray(300*1024*1024)\nfor i in range(0,len(b),4096): b[i]=1\nprint('ok')"],
  { timeout: 25000, killSignal: "SIGKILL", maxBuffer: 262144, encoding: "utf8" },
  (err, stdout) => {
    console.log(JSON.stringify(err ? { kind: "report", arithmetic: "error", reasons: ["worker_failure"], child_signal: err.signal, child_code: err.code }
                                   : { kind: "report", arithmetic: "pass", stdout: stdout.trim() }));
    process.exit(0);
  });
'''


def rd(p):
    return open(p).read().strip()


def main():
    results = {}
    for mode in ('child', 'both', 'parent'):
        cg = f'{BASE}/nomue-review-e4-{os.getpid()}-{mode}'
        os.mkdir(cg)
        try:
            open(f'{cg}/memory.limit_in_bytes', 'w').write(str(LIMIT))
            cmd = f"echo $$ > {cg}/cgroup.procs && exec {NODE} -e '{LEADER}' -- {mode}"
            t0 = time.monotonic()
            p = subprocess.Popen(['sh', '-c', cmd], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True,
                                 start_new_session=True, env=dict(os.environ, NOMUE_EXPERIMENT_PYTHON=PY))
            try:
                so, se = p.communicate(timeout=30)
            except subprocess.TimeoutExpired:
                os.killpg(p.pid, signal.SIGKILL)
                so, se = p.communicate()
            procs_left = rd(f'{cg}/cgroup.procs').split()
            time.sleep(0.3)
            results[mode] = {'limit_readback': int(rd(f'{cg}/memory.limit_in_bytes')), 'leader_returncode': p.returncode,
                             'leader_stdout': so.strip()[:300], 'leader_stderr_tail': se.strip()[-200:],
                             'wall_s': round(time.monotonic() - t0, 3), 'oom_kill_count': rd(f'{cg}/memory.oom_control').split()[-1],
                             'charged_peak_bytes': int(rd(f'{cg}/memory.max_usage_in_bytes')),
                             'procs_left_in_cgroup_right_after_leader_exit': procs_left}
            for pid in rd(f'{cg}/cgroup.procs').split():
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
            results[mode]['rmdir_ok'] = not os.path.exists(cg)
    print(json.dumps(results, indent=1))


if __name__ == '__main__':
    main()
