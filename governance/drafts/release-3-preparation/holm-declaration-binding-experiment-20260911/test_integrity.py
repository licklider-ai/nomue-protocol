"""Fresh-process loader controls; no mutation of historical repository files."""
from pathlib import Path
import json
import os
import shutil
import subprocess
import tempfile

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
NODE = shutil.which('node')
counts=[]


def require(ok,label):
    if not ok: raise RuntimeError(label)
    counts.append(label)


def main():
    manifest=json.loads((HERE/'INPUTS.json').read_text())
    python=os.environ.get('NOMUE_EXPERIMENT_PYTHON',manifest['python_executable'])
    with tempfile.TemporaryDirectory() as folder:
        base=Path(folder)/'repo';packet=base/HERE.relative_to(ROOT)
        shutil.copytree(HERE,packet,ignore=shutil.ignore_patterns('__pycache__'))
        subprocess.run(['cp','-a','--reflink=auto',str(ROOT/'node_modules'),str(base/'node_modules')],check=True)
        for name in manifest['runtime']:
            origin=(HERE/name).resolve();target=(packet/name).resolve()
            if not target.exists():
                target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(origin.read_bytes())
        module=str(packet/'bridge.mjs')
        def run():return subprocess.run([NODE,'--input-type=module','-e','await import('+json.dumps(module)+')'],cwd=base,capture_output=True,text=True,timeout=10)
        require(run().returncode==0,'isolated import')
        for name in manifest['runtime']:
            target=(packet/name).resolve();raw=target.read_bytes()
            target.write_bytes(raw+b'\n ')
            result=run();require(result.returncode!=0 and 'dependency hash: '+name in result.stderr,'runtime tamper '+name)
            target.write_bytes(raw)
        name=next(x for x in manifest['packages'] if x.endswith('/dist/2020.js'))
        target=base/name;raw=target.read_bytes();target.write_bytes(raw+b'\n ')
        result=run();require(result.returncode!=0 and 'dependency hash: '+name in result.stderr,'Ajv package tamper');target.write_bytes(raw)
        # Copy the complete Ajv package to a different in-repo origin and route
        # the package symlink there. Hashes at the original pin still pass.
        alias=base/'node_modules/ajv';actual=alias.resolve();other=actual.parent/'ajv-shifted'
        shutil.copytree(actual,other);alias.unlink()
        # A relative path, wholly inside this isolated repository.
        alias.symlink_to(os.path.relpath(other,alias.parent),target_is_directory=True)
        result=run();require(result.returncode!=0 and 'dependency origin: ajv' in result.stderr,'Ajv origin substitution')
        alias.unlink();alias.symlink_to(os.path.relpath(actual,alias.parent),target_is_directory=True)
        require(run().returncode==0,'Ajv origin restored')
        # Private worker checks source bytes itself, independently of coordinator.
        target=packet/'candidate.py';raw=target.read_bytes();target.write_bytes(raw+b'\n ')
        result=subprocess.run([python,str(packet/'worker.py')],input='{}',capture_output=True,text=True,timeout=10)
        require(result.returncode!=0 and 'dependency hash: candidate.py' in result.stderr,'worker direct pin')
        target.write_bytes(raw)
        # The coordinator launches the worker in isolated mode: an inherited PYTHONPATH
        # shadowing a standard-library module must not reach it. The direct control
        # shows the shadow is effective when isolation is absent.
        shadow=Path(folder)/'shadow';shadow.mkdir();(shadow/'hashlib.py').write_text("raise RuntimeError('shadowed hashlib')\n")
        env=dict(os.environ,PYTHONPATH=str(shadow),NOMUE_EXPERIMENT_PYTHON=python)
        result=subprocess.run([python,str(packet/'worker.py')],input='{}',capture_output=True,text=True,timeout=10,env=env)
        require(result.returncode!=0 and 'shadowed hashlib' in result.stderr,'shadow control without isolation')
        script=('const b=await import('+json.dumps(module)+');const f=await import('+json.dumps(str(packet/'fixtures.mjs'))+');'
                'const r=await b.checkBinding(...f.texts(f.fixture()));'
                'if(r.outcome!=="declaration_bound_supplied_p_arithmetic_consistent")process.exit(3);')
        result=subprocess.run([NODE,'--input-type=module','-e',script],cwd=base,capture_output=True,text=True,timeout=30,env=env)
        require(result.returncode==0,'worker isolated mode')
    print(json.dumps({'checks':len(counts),'labels':counts},indent=2))


if __name__=='__main__':main()
