"""Runs E1-E5 from the repository root and writes RESULTS.json beside this file.
Required environment: NOMUE_EXPERIMENT_PYTHON (absolute Python 3), NOMUE_REVIEW_V1_MEMORY_CGROUP
(a writable cgroup v1 memory cgroup that this process may create children in; E4/E4b are
skipped as NOT_RUN without it), optional NOMUE_REVIEW_V2_ROOT (writable cgroup v2 mount)."""
import json, os, platform, subprocess, sys, time

HERE = os.path.dirname(os.path.abspath(__file__))
NODE = os.environ.get('NOMUE_REVIEW_NODE', 'node')
sys.path.insert(0, HERE)
from tree import run as tree_run  # noqa: E402


def sh(args, env=None):
    p = subprocess.run(args, capture_output=True, text=True, env=env or os.environ, timeout=300)
    try:
        return json.loads(p.stdout)
    except json.JSONDecodeError:
        return {'returncode': p.returncode, 'stdout': p.stdout[-2000:], 'stderr': p.stderr[-2000:]}


def main():
    out = {'environment': {'kernel': platform.release(), 'machine': platform.machine(),
                           'node': subprocess.check_output([NODE, '--version'], text=True).strip(),
                           'python': subprocess.check_output([os.environ['NOMUE_EXPERIMENT_PYTHON'], '--version'], text=True).strip(),
                           'self_cgroup': open('/proc/self/cgroup').read().strip().splitlines(),
                           'proc_cgroups': open('/proc/cgroups').read().strip().splitlines(),
                           'v2_root_controllers': None, 'started_utc': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())}}
    v2 = os.environ.get('NOMUE_REVIEW_V2_ROOT', '/sys/fs/cgroup/unified')
    try:
        out['environment']['v2_root_controllers'] = open(f'{v2}/cgroup.controllers').read().strip()
    except OSError as e:
        out['environment']['v2_root_controllers'] = f'unreadable: {e}'
    out['E1a_plain_node'] = tree_run([NODE, '-e', 'setTimeout(()=>{},300)'])
    out['E1b_plain_python_isolated'] = tree_run([os.environ['NOMUE_EXPERIMENT_PYTHON'], '-I', '-c', 'import time; time.sleep(0.3)'])
    out['E1c_real_call_native_type_stripping'] = tree_run([NODE, os.path.join(HERE, 'real_call.mjs')])
    out['E1d_real_call_import_tsx'] = tree_run([NODE, '--import', 'tsx', os.path.join(HERE, 'real_call.mjs')])
    out['E2_cgroup_v2_lifecycle'] = sh([sys.executable, os.path.join(HERE, 'e2_cgroup_v2_lifecycle.py')])
    out['E3_execfile_timeout_with_grandchild_pipe'] = sh([NODE, os.path.join(HERE, 'e3_execfile_pipe.mjs')])
    if os.environ.get('NOMUE_REVIEW_V1_MEMORY_CGROUP'):
        out['E4_oom_partial_kill'] = sh([sys.executable, os.path.join(HERE, 'e4_oom_partial_kill.py')])
        out['E4b_real_call_under_memory_limits'] = sh([sys.executable, os.path.join(HERE, 'e4b_real_call_limits.py')])
    else:
        out['E4_oom_partial_kill'] = out['E4b_real_call_under_memory_limits'] = 'NOT_RUN: no writable memory cgroup configured'
    out['E5_leader_kill_leftovers'] = sh([sys.executable, os.path.join(HERE, 'e5_leader_kill_leftovers.py')])
    out['environment']['finished_utc'] = time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())
    with open(os.path.join(HERE, 'RESULTS.json'), 'w') as f:
        json.dump(out, f, indent=1)
        f.write('\n')
    print('wrote', os.path.join(HERE, 'RESULTS.json'))


if __name__ == '__main__':
    main()
