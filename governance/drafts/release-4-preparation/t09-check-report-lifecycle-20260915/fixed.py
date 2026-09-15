"""UNISSUED CANDIDATE. Immutable execution input loader."""
import hashlib
import importlib.util
import json
from pathlib import Path
import subprocess
import tempfile
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[3]
INPUTS=json.loads((HERE/'INPUTS.json').read_text())
_TEMP=[]
def load(name,suffix):
    entry=next(e for e in INPUTS['files'] if e['path'].endswith(suffix))
    data=subprocess.check_output(['git','-c','safe.directory='+ROOT.as_posix(),'-C',str(ROOT),'cat-file','blob',entry['git_blob']])
    if hashlib.sha256(data).hexdigest()!=entry['sha256']:raise ValueError('fixed execution source hash')
    folder=tempfile.TemporaryDirectory(prefix='nomue-t09-fixed-');_TEMP.append(folder)
    path=Path(folder.name)/(name+'.py');path.write_bytes(data)
    spec=importlib.util.spec_from_file_location(name,path);module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
    return module
