"""Linux external deadline; process-reported peak RSS in isolated probes; failures are never refusals."""
import json
import os
from pathlib import Path
import platform
import shutil
import signal
import subprocess
import sys
import tempfile
import time

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[3]
NODE=shutil.which('node')
CAP=512*1024


def run(args):
    with tempfile.TemporaryFile() as out,tempfile.TemporaryFile() as err:
        start=time.monotonic();p=subprocess.Popen(args,cwd=ROOT,stdout=out,stderr=err,start_new_session=True)
        try:
            while p.poll() is None:
                if time.monotonic()-start>30:raise RuntimeError('whole-process timeout')
                time.sleep(.01)
        except BaseException:
            os.killpg(p.pid,signal.SIGKILL);p.wait();raise
        out.seek(0);err.seek(0)
        if p.returncode:raise RuntimeError(err.read().decode())
        return json.load(out),{'wall_seconds':time.monotonic()-start}


def main():
    modes=[]
    base=[NODE,'--max-old-space-size=256']
    for optimized in (False,True):
        result,metrics=run(base+[str(HERE/'test_bridge.mjs')]+(['--optimized'] if optimized else []))
        modes.append({'optimized_python':optimized,'result':result,**metrics})
    if modes[0]['result']!=modes[1]['result']:raise RuntimeError('normal/optimized mismatch')
    rows=[]
    for name in ('baseline','max-family','large-admitted','max-count-refusal','wide-strings','origin-long'):
        for optimized in (False,True):
            result,metrics=run(base+[str(HERE/'probe.mjs'),name]+(['--optimized'] if optimized else []))
            if result['node_peak_rss_kib']<=0 or (result['launches'] and result['worker_peak_rss_kib']<=0):raise RuntimeError('missing RSS measurement')
            if result['sum_of_process_peaks_kib']>CAP:raise RuntimeError('observed sum of process peaks exceeds ceiling')
            rows.append({'optimized_python':optimized,**result,**metrics})
        if rows[-1]['decision']!=rows[-2]['decision']:raise RuntimeError('probe optimization mismatch')
    print(json.dumps({'python':platform.python_version(),'node':subprocess.check_output([NODE,'--version'],text=True).strip(),
                     'platform':platform.platform(),'python_executable':sys.executable,'node_executable':NODE,
                     'timeout_seconds':30,'observed_sum_of_process_peaks_ceiling_kib':CAP,'live_tree_rss_enforcement':'not_measured_proc_unavailable',
                     'rss_method':'sum of Node and sequential Python process-reported peak RSS; post-run check',
                     'node_old_space_mib':256,'python_address_space_mib':256,'tests':modes,'probes':rows},indent=2))


if __name__=='__main__':main()
