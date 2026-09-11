"""Replay historical fault controls in temporary files; never overwrite archived evidence."""
import pathlib,tempfile,subprocess,sys,json
root=pathlib.Path(__file__).resolve().parents[4]
original=root/'review-inputs/r3-admission-method-review-20260911/safe_failure_checks.py'
with tempfile.TemporaryDirectory(prefix='holm-safe-checks-') as td:
 script=pathlib.Path(td)/'checks.py'
 text=original.read_text().replace('holm-execution-admission-20260911/measure.py','holm-admission-repair-20260911/measure.py')
 script.write_text(text)
 subprocess.run([sys.executable,str(script),str(root)],check=True)
 rows=json.loads((pathlib.Path(td)/"SAFE-CHECKS.json").read_text())
 assert len(rows)==2 and all(r["failure_retention_pass"] for r in rows)
