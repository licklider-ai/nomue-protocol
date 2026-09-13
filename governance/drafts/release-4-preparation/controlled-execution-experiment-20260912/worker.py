"""Trusted single-process experimental worker. Invoked only by supervisor.py."""
import os
import resource
import signal
import sys

# Apply hard limits before packet loading, transport decoding or numerical imports.
resource.setrlimit(resource.RLIMIT_CORE, (0, 0))
memory, cpu = int(sys.argv[1]), int(sys.argv[2])
resource.setrlimit(resource.RLIMIT_AS, (memory, memory))
resource.setrlimit(resource.RLIMIT_CPU, (cpu, cpu + 1))
# The parent blocks cancellation across process creation to retain the handle.
signal.pthread_sigmask(signal.SIG_UNBLOCK, {signal.SIGINT, signal.SIGTERM})

import hashlib
import json
from fractions import Fraction
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def wire(value):
    if type(value) is int:
        return hex(value)
    if type(value) is Fraction:
        return {'rational': [hex(value.numerator), hex(value.denominator)]}
    if type(value) in (list, tuple):
        return [wire(x) for x in value]
    if type(value) is dict:
        return {k: wire(v) for k, v in value.items()}
    if value is None or type(value) in (str, bool):
        return value
    raise TypeError('unexpected result type')


def main():
    pins = json.loads((HERE / 'INPUTS.json').read_text())
    for row in pins['runtime']:
        if digest(ROOT / row['path']) != row['sha256']:
            raise RuntimeError('runtime source drift')
    sys.path.insert(0, str(HERE))
    from transport import INPUT_CAP, decode
    raw = sys.stdin.buffer.read(INPUT_CAP + 1)
    cells, revision, submitted = decode(raw)
    source = ROOT / pins['numerical_directory']
    sys.path.insert(0, str(source))
    import consumer
    if Path(consumer.__file__).resolve() != source / 'consumer.py':
        raise RuntimeError('consumer origin')
    limits = {'address_space': list(resource.getrlimit(resource.RLIMIT_AS)),
              'cpu': list(resource.getrlimit(resource.RLIMIT_CPU)),
              'core': list(resource.getrlimit(resource.RLIMIT_CORE))}
    try:
        result = (consumer.target.complete(cells, revision) if submitted is None else
                  consumer.consume(cells, revision, submitted))
        if result['outcome'] == 'unresolved_experiment':
            # Do not forward partial diagnostic tails or unresolved interval material.
            outcome = {'state': 'unresolved', 'reason': 'probability_projection'}
        else:
            outcome = {'state': 'completed', 'result': wire(result)}
    except consumer.target.Refusal as error:
        outcome = {'state': 'refused', 'stage': error.stage,
                   'quantity': error.quantity, 'reason': error.reason}
    except consumer.EvidenceRefusal as error:
        outcome = {'state': 'refused', 'stage': 'evidence', 'reason': str(error)}
    result = {'kind': 'r4-controlled-experiment', 'scientific_validity': 'not_asserted',
              'limits': limits, 'outcome': outcome}
    sys.stdout.write(json.dumps(result, separators=(',', ':'), ensure_ascii=True))


if __name__ == '__main__':
    try:
        main()
    except MemoryError:
        # Tiny fixed output; failure to allocate even this cannot become success.
        os.write(2, b'memory allocation failed\n')
        sys.exit(71)
