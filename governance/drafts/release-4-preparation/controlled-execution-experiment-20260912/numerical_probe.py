"""Test-only worker injection: real bootstrap and limits, no production probe hook."""
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
mode = sys.argv[1]
sys.argv = [str(HERE / 'worker.py'), str(256 * 1024 * 1024), '25']
sys.path.insert(0, str(HERE))
import worker  # The actual bootstrap applies the limits before test injection.

if mode == 'memory':
    try:
        data = bytearray(512 * 1024 * 1024)
    except MemoryError:
        sys.exit(71)
    sys.exit(1)

source = HERE.parent / 'tail-evidence-experiment-20260911'
sys.path.insert(0, str(source))
import consumer
if mode == 'unresolved':
    consumer.target.projection = lambda bounds: None
else:
    raise ValueError('unknown probe')
worker.main()
