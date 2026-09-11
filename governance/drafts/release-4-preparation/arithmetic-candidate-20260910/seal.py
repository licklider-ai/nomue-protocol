"""Refresh local artifact checksums after authoring/formatting, before commit."""
import hashlib
from pathlib import Path
HERE=Path(__file__).resolve().parent
paths=sorted(p for p in HERE.rglob('*') if p.is_file() and '__pycache__' not in p.parts and p.name!='SHA256SUMS')
(HERE/'SHA256SUMS').write_text(''.join(hashlib.sha256(p.read_bytes()).hexdigest()+'  '+str(p.relative_to(HERE))+'\n' for p in paths))
print(f'Sealed {len(paths)} files')
