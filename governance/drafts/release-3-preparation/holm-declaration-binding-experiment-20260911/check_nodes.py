"""Author-side limited node correction confirmation, not an independent review."""
from collections import Counter, deque
import importlib.util
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
source = HERE.parent / 'holm-declaration-binding-design-20260911/check_design_witnesses.py'
spec = importlib.util.spec_from_file_location('design_witness', source)
design = importlib.util.module_from_spec(spec)
spec.loader.exec_module(design)
# Reuse the materialized fixture, but count breadth-first with typed categories.
queue, counts = deque([design.maximal_document()]), Counter()
while queue:
    value = queue.popleft()
    counts[type(value).__name__] += 1
    if type(value) is dict:
        queue.extend(value.values())
    elif type(value) is list:
        queue.extend(value)
result = {
    'scope':'Author-side limited counting confirmation, not independent review',
    'design_commit':'1e6c4be371bc91f63577f70a5e0fc7742aef16a8',
    'breadth_first_node_counts':dict(counts), 'total':sum(counts.values()),
    'd0_cap':24576, 'sidecar_cap':2048,
    'adjusted_array_nodes':1+120*4, 'outer_nodes':3,
    'submitted_upper_bound':24576+2048+(1+120*4)+3, 'submitted_cap':28672,
    'depth_embedding':{'expected':32,'outer_levels':2,'submitted':34},
}
if result['total'] != 42450 or result['submitted_upper_bound'] != 27108:
    raise RuntimeError('node correction mismatch')
if result != json.loads((HERE/'NODE-CONFIRMATION.json').read_text()):
    raise RuntimeError('recorded node confirmation mismatch')
print(json.dumps(result, indent=2))
