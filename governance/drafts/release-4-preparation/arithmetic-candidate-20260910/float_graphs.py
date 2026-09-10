"""New exploratory graph plus the pinned historical graphs, without old oracle.
Extract only SIGNS and graphs from the recorded source via AST; no top-level run.
"""
import ast
import math
from pathlib import Path
import numpy as np

SOURCE = Path(__file__).resolve().parent.parent/'probes/ss-f-propagation.py'


def legacy():
    tree = ast.parse(SOURCE.read_text())
    nodes = [n for n in tree.body if isinstance(n, ast.FunctionDef) and n.name == 'graphs'
             or isinstance(n, ast.Assign) and any(isinstance(t, ast.Name) and t.id == 'SIGNS' for t in n.targets)]
    assert len(nodes) == 2
    env = {'np': np}
    exec(compile(ast.Module(body=nodes, type_ignores=[]), str(SOURCE), 'exec'), env)
    return env['graphs']

HISTORICAL = legacy()


def evaluate(cells):
    n = len(cells[0])
    y = np.array(cells, dtype=np.float64).reshape(-1)
    out = {}
    shift = -math.frexp(max(abs(float(v)) for v in y))[1] if np.any(y) else 0
    with np.errstate(all='ignore'):
        for prefix, response in [('raw', y), ('scaled', np.ldexp(y, shift))]:
            routes = HISTORICAL(response, n)
            for name, value in routes.items():
                # Means/estimates are added only for the explicit builtin-cell graph.
                if name == 'builtin_cell':
                    m = [sum(float(v) for v in response[c*n:(c+1)*n])/n for c in range(4)]
                    beta = [sum(m[c]*[(1,-1,-1,1),(1,-1,1,-1),(1,1,-1,-1),(1,1,1,1)][c][j] for c in range(4))/4 for j in range(4)]
                    value.update(means=m, beta=beta, estimates=[2*beta[1],2*beta[2],4*beta[3]], df=[4*(n-1)])
                out[prefix+'_'+name] = value
        # Minimal alternative: one common normalization, then per-cell anchor.
        z = np.ldexp(y, shift).reshape(4,n)
        means, residual = [], []
        for cell in z:
            anchor = float(cell[0])
            d = [float(v)-anchor for v in cell]
            md = math.fsum(d)/n
            means.append(anchor+md)
            residual.extend(v-md for v in d)
        da = ((means[2]-means[0])+(means[3]-means[1]))/2
        db = ((means[1]-means[0])+(means[3]-means[2]))/2
        dab = (means[3]-means[2])-(means[1]-means[0])
        ss = [float(np.float64(n)*v*v) for v in (da,db,dab/2)]
        sse = math.fsum(float(np.float64(v)*v) for v in residual)
        out['scaled_anchored_cell'] = dict(means=means, estimates=[da,db,dab], ss=ss, sse=[sse],
            df=[4*(n-1)], f=[float(np.float64(v)/np.float64(sse/(4*(n-1)))) for v in ss])
    return out, shift, np.ldexp(y, shift).reshape(4,n).tolist()
