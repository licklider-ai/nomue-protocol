"""Isolated parent module-origin and SIGPIPE pre-launch regression controls."""
import json
import os
from pathlib import Path
import signal
import subprocess
import sys
import tempfile
import types
from unittest.mock import patch

import supervisor as s


def need(ok, name):
    if not ok:
        raise RuntimeError(name)


def child(mode):
    s.host()
    with tempfile.TemporaryDirectory() as temp:
        path = Path(temp)
        if mode.startswith(('path-', 'cached-')):
            name = mode.split('-', 1)[1]
            marker = path / 'executed'
            fake = path / (name + '.py')
            fake.write_text('from pathlib import Path\nPath(' + repr(str(marker)) + ').touch()\n')
            sys.modules.pop(name, None)
            if mode.startswith('cached-'):
                module = types.ModuleType(name)
                module.__file__ = str(fake)
                sys.modules[name] = module
            else:
                sys.path.insert(0, str(path))
            with patch.object(s, '_launch', side_effect=RuntimeError('child launched')):
                result = s.run([[0., 1.]] * 4, 'shadow')
            need(result['category'] == 'unsupported_host_or_source', 'shadow not refused')
            need(not marker.exists(), 'shadow module executed')
        else:
            disposition = signal.SIG_DFL if mode == 'sigpipe-default' else lambda *_: None
            previous = signal.signal(signal.SIGPIPE, disposition)
            try:
                with patch.object(s.subprocess, 'Popen', side_effect=RuntimeError('child launched')):
                    result = s.run([[0., 1.]] * 4, 'sigpipe')
                    need(result['category'] == 'unsupported_host_or_source', 'SIGPIPE host not refused')
                    try:
                        s._launch(['unused'], b'x')
                    except ValueError as error:
                        need('SIGPIPE' in str(error), 'wrong direct refusal')
                    else:
                        raise RuntimeError('direct launch did not refuse SIGPIPE')
                need(signal.getsignal(signal.SIGPIPE) == disposition, 'caller SIGPIPE changed')
            finally:
                signal.signal(signal.SIGPIPE, previous)
    print(json.dumps({'mode': mode, 'passed': True, 'child_started': False}))


def main():
    rows = []
    for mode in ('path-transport', 'path-output', 'cached-transport', 'cached-output',
                 'sigpipe-default', 'sigpipe-custom'):
        result = subprocess.run([sys.executable] + (['-O'] if sys.flags.optimize else []) + ['-B', __file__, mode], capture_output=True,
                                text=True, timeout=5, check=True)
        rows.append(json.loads(result.stdout))
    print(json.dumps({'python': sys.version.split()[0], 'optimized_parent': bool(sys.flags.optimize),
                      'checks': len(rows), 'rows': rows}, indent=2))


if __name__ == '__main__':
    child(sys.argv[1]) if len(sys.argv) > 1 else main()
