"""Live process-tree RSS sampling for the isolated probes; requires a readable /proc."""
import json
import os
from pathlib import Path
import platform
import shutil
import signal
import subprocess
import sys
import time

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
NODE = shutil.which('node')
CEILING_KIB = 512 * 1024
INTERVAL = 0.002
PROBES = ('baseline', 'max-family', 'large-admitted', 'max-count-refusal', 'wide-strings', 'origin-long')


def tree_rss_kib(session):
    """Sum VmRSS over every process whose session id is the probe's; /proc is the source."""
    total, members = 0, 0
    for entry in os.listdir('/proc'):
        if not entry.isdigit():
            continue
        try:
            with open(f'/proc/{entry}/stat') as handle:
                stat = handle.read()
            if int(stat[stat.rindex(')') + 2:].split()[3]) != session:
                continue
            with open(f'/proc/{entry}/status') as handle:
                for line in handle:
                    if line.startswith('VmRSS:'):
                        total += int(line.split()[1])
                        members += 1
                        break
        except (FileNotFoundError, ProcessLookupError, ValueError):
            continue
    return total, members


def probe(name, optimized):
    args = [NODE, '--max-old-space-size=256', str(HERE / 'probe.mjs'), name] + (['--optimized'] if optimized else [])
    start = time.monotonic()
    process = subprocess.Popen(args, cwd=ROOT, stdout=subprocess.PIPE, stderr=subprocess.PIPE, start_new_session=True)
    peak = samples = widest = 0
    try:
        while process.poll() is None:
            if time.monotonic() - start > 30:
                raise RuntimeError('whole-process timeout')
            rss, members = tree_rss_kib(process.pid)
            peak, widest, samples = max(peak, rss), max(widest, members), samples + 1
            if rss > CEILING_KIB:
                raise RuntimeError('live process-tree RSS ceiling')
            time.sleep(INTERVAL)
    except BaseException:
        os.killpg(process.pid, signal.SIGKILL)
        process.wait()
        raise
    if process.returncode:
        raise RuntimeError(process.stderr.read().decode())
    result = json.loads(process.stdout.read())
    if samples == 0 or peak <= 0:
        raise RuntimeError('no live sample')
    return {'name': name, 'optimized_python': optimized, 'decision': result['decision'], 'launches': result['launches'],
            'live_tree_peak_rss_kib': peak, 'samples': samples, 'max_concurrent_processes': widest,
            'sum_of_process_peaks_kib': result['sum_of_process_peaks_kib'],
            'wall_seconds': time.monotonic() - start}


def main():
    own = tree_rss_kib(os.getsid(0))
    if own[0] <= 0:
        raise RuntimeError('/proc process-tree RSS unavailable')
    rows = [probe(name, optimized) for name in PROBES for optimized in (False, True)]
    print(json.dumps({'python': platform.python_version(), 'node': subprocess.check_output([NODE, '--version'], text=True).strip(),
                      'platform': platform.platform(), 'method': 'sum of VmRSS over the probe session process tree read from /proc at each sample',
                      'sample_interval_seconds': INTERVAL, 'timeout_seconds': 30, 'live_tree_rss_ceiling_kib': CEILING_KIB,
                      'ceiling_is_hard_limit': False, 'probes': rows}, indent=2))


if __name__ == '__main__':
    main()
