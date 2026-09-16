"""Research artifact utilities, not a reference implementation."""
import hashlib
import importlib.util
import json
from pathlib import Path

PREP = Path('governance/drafts/release-4-preparation')
G5 = PREP/'t04-g5-full-procedure-evidence-20260914'
EXEC = PREP/'controlled-execution-experiment-20260912'
NUMERICAL = '66fa2bc201c86c62f21bb94825479427c24d8522'
EXECUTION = '3880db43a64e1758494f3c78f6850daab0e3e9e9'
IDENTITY = 'f14664e1082a7a346e6587a23384552aa543f8f1ec76fca07c402383734a7471'

def data(x):
    return (json.dumps(x,sort_keys=True,separators=(',',':'),allow_nan=False)+'\n').encode()

def sha(b):
    return hashlib.sha256(b).hexdigest()

def require(ok, label):
    if not ok:
        raise ValueError(label)

def load_g5():
    path = Path('/numerical')/G5/'procedure.py'
    spec = importlib.util.spec_from_file_location('fixed_g5',path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    require(module.candidate_identity() == IDENTITY, 'fixed candidate identity')
    return module
