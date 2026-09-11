"""Replay independent sections/cases of pinned B/C scripts without changing their bodies.

Raw task stdout is preserved. The ordered transcript is a concatenation, not the
stdout of one serial process. Execution metadata identifies each selected section.
"""
import ast
import concurrent.futures
import copy
import datetime
import hashlib
import json
import os
from pathlib import Path
import subprocess
import sys
import time

ROOT = Path(__file__).resolve().parent

def is_banner(node):
    return (isinstance(node, ast.Expr) and isinstance(node.value, ast.Call)
            and isinstance(node.value.func, ast.Name) and node.value.func.id == 'print'
            and node.value.args and isinstance(node.value.args[0], ast.Constant)
            and isinstance(node.value.args[0].value, str)
            and node.value.args[0].value.startswith('==='))

def make_tasks(path):
    source = path.read_bytes()
    module = ast.parse(source)
    main = module.body[-1]
    assert isinstance(main, ast.If) and ast.unparse(main.test) == "__name__ == '__main__'"
    definitions = module.body[:-1]
    starts = [i for i, n in enumerate(main.body) if is_banner(n)]
    initial = main.body[:starts[0]]
    tasks = []
    for section, (start, end) in enumerate(zip(starts, starts[1:] + [len(main.body)])):
        nodes = main.body[start:end]
        # Split a section only when it has exactly one for-loop and that loop is
        # the final statement. Its iterations share no state used by another case.
        loops = [n for n in nodes if isinstance(n, ast.For)]
        if len(loops) == 1 and nodes[-1] is loops[0]:
            loop = loops[0]
            pre = nodes[1:-1]
            ns = {}
            # Determine the finite literal case list. Probe B uses Fraction in
            # one such list; preserve it as AST rather than evaluating it here.
            iterable = loop.iter
            if isinstance(iterable, ast.Name):
                assign = next(n for n in pre if isinstance(n, ast.Assign)
                              and any(isinstance(t, ast.Name) and t.id == iterable.id for t in n.targets))
                iterable = assign.value
            if isinstance(iterable, (ast.List, ast.Tuple)):
                for case, value in enumerate(iterable.elts):
                    selected = copy.deepcopy(loop)
                    selected.iter = ast.List(elts=[copy.deepcopy(value)], ctx=ast.Load())
                    tasks.append((f'{section:02d}-{case:02d}', definitions + initial
                                  + ([nodes[0]] if case == 0 else []) + pre + [selected]))
                continue
        tasks.append((f'{section:02d}-00', definitions + initial + nodes))
    return tasks

def run_task(info):
    name, script, key, nodes = info
    stem = f'{name}-{key}'
    path = ROOT / 'parallel' / (stem + '.py')
    # The AST renderer preserves operations and control flow; the source hash and
    # selection key bind it back to the unmodified Appendix A script.
    rendered = ast.unparse(ast.fix_missing_locations(ast.Module(body=nodes, type_ignores=[]))) + '\n'
    path.write_text(rendered)
    start = datetime.datetime.now(datetime.timezone.utc).isoformat()
    t0 = time.monotonic()
    with path.with_suffix('.out').open('wb') as out, path.with_suffix('.err').open('wb') as err:
        result = subprocess.run([sys.executable, '-u', str(path.relative_to(ROOT))], cwd=ROOT,
                                stdout=out, stderr=err, env={**os.environ, 'PYTHONHASHSEED': '0'})
    record = {'probe': name, 'source': script.name, 'selection': key,
              'source_sha256': hashlib.sha256(script.read_bytes()).hexdigest(),
              'executed_sha256': hashlib.sha256(path.read_bytes()).hexdigest(),
              'started_utc': start, 'finished_utc': datetime.datetime.now(datetime.timezone.utc).isoformat(),
              'elapsed_seconds': round(time.monotonic() - t0, 3), 'exit_code': result.returncode}
    for suffix in ['out', 'err']:
        data = path.with_suffix('.' + suffix).read_bytes()
        record[suffix + '_bytes'] = len(data)
        record[suffix + '_sha256'] = hashlib.sha256(data).hexdigest()
    path.with_suffix('.json').write_text(json.dumps(record, indent=2) + '\n')
    print(json.dumps(record), flush=True)
    return record

if __name__ == '__main__':
    (ROOT / 'parallel').mkdir(exist_ok=True)
    inputs = [('b', ROOT / 'probe_b_studentized_range.py'), ('c', ROOT / 'probe_c_dunnett.py')]
    jobs = [(name, script, key, nodes) for name, script in inputs for key, nodes in make_tasks(script)]
    print('Tasks:', len(jobs), flush=True)
    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
        results = list(pool.map(run_task, jobs))
    for name, script in inputs:
        selected = sorted((r for r in results if r['probe'] == name), key=lambda r: r['selection'])
        for suffix in ['out', 'err']:
            data = b''.join((ROOT / 'parallel' / (f"{name}-{r['selection']}.{suffix}")).read_bytes() for r in selected)
            (ROOT / f'probe_{name}.parallel.{suffix}').write_bytes(data)
    (ROOT / 'parallel-runs.json').write_text(json.dumps(results, indent=2) + '\n')
    raise SystemExit(0 if all(r['exit_code'] == 0 for r in results) else 1)
