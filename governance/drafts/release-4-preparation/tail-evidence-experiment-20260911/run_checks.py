"""Reproduce recorded normal/optimized checks inside the experimental envelope."""
import hashlib
import json
import platform
from pathlib import Path
import subprocess
import sys

HERE = Path(__file__).resolve().parent


def main():
    manifest = json.loads((HERE/'INPUTS.json').read_text())
    if hashlib.sha256((HERE/'test_wrapper.py').read_bytes()).hexdigest() != manifest['wrapper_regression_harness_sha256']:
        raise RuntimeError('wrapper harness hash')
    result = {'python': platform.python_version(), 'platform': platform.platform(),
              'timeout_seconds': 30, 'address_space_mib': 256}
    for name in ('test_consumer.py', 'test_wrapper.py'):
        rows = []
        for optimized in (False, True):
            script = ('import resource,runpy; resource.setrlimit(resource.RLIMIT_AS,'
                      '(256*1024*1024,256*1024*1024)); runpy.run_path('+repr(name)+',run_name="__main__")')
            run = subprocess.run([sys.executable]+(['-O'] if optimized else [])+['-c',script],
                                 cwd=HERE,capture_output=True,text=True,timeout=30,check=True)
            rows.append(json.loads(run.stdout))
        if rows[0] != rows[1]: raise RuntimeError('optimized mismatch: '+name)
        result[name] = {'normal':rows[0], 'optimized':rows[1]}
    print(json.dumps(result,indent=2,sort_keys=True))


if __name__=='__main__': main()
