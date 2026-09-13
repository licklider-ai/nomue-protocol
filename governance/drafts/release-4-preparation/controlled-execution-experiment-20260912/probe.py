"""Trusted test-only fault injector. Never selected from input or submission data."""
import os
import resource
import sys
import time

mode = sys.argv[1]
resource.setrlimit(resource.RLIMIT_CORE, (0, 0))
if mode == 'cpu':
    resource.setrlimit(resource.RLIMIT_CPU, (1, 2))
    while True:
        pass
elif mode == 'memory':
    resource.setrlimit(resource.RLIMIT_AS, (128 * 1024 * 1024,) * 2)
    try:
        data = bytearray(512 * 1024 * 1024)
    except MemoryError:
        os.write(2, b'memory allocation failed\n')
        sys.exit(71)
    sys.exit(1)
elif mode == 'hang':
    time.sleep(60)
elif mode == 'closed-pipes-hang':
    os.close(1)
    os.close(2)
    time.sleep(60)
elif mode in ('stdout', 'stderr'):
    while True:
        os.write(1 if mode == 'stdout' else 2, b'x' * 65536)
elif mode == 'invalid':
    print('not-json')
elif mode == 'empty-success':
    print('{}')
elif mode == 'stderr-success':
    print('{}')
    print('unexpected', file=sys.stderr)
elif mode == 'crash':
    sys.exit(7)
elif mode == 'early-eof':
    sys.exit(0)
elif mode == 'environment':
    import json
    print(json.dumps({'isolated': sys.flags.isolated, 'pythonpath': os.environ.get('PYTHONPATH'),
                      'cwd': os.getcwd()}))
else:
    raise ValueError('unknown trusted probe')
