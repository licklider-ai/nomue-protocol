"""Fail-closed CI adapter for the unchanged historical 17-value oracle."""
import json
import math
from pathlib import Path
import subprocess
import sys

from validate_saved_evidence import strict_json

HERE = Path(__file__).resolve().parent
EXPECTED_VALUES = 17


def validate_report(report):
    rows = report['rows']
    if (type(report['values']) is not int or report['values'] != EXPECTED_VALUES
            or type(rows) is not list or len(rows) != EXPECTED_VALUES):
        raise ValueError('oracle coverage differs from the historical 17-value inventory')
    if report['all_agree'] is not True:
        raise ValueError('oracle reports a numerical disagreement')
    identities = set()
    for row in rows:
        identity = (row['source'], row['row'], row['contrast'], row['n_per_cell'], row['f'])
        if identity in identities:
            raise ValueError('duplicate oracle observation')
        identities.add(identity)
        if row['agrees_within_1e-12'] is not True:
            raise ValueError('oracle row reports a numerical disagreement')
        for field in ('f', 'committed_encoding', 'continued_fraction',
                      'relative_difference', 'enclosure_width'):
            value = row[field]
            if type(value) not in (int, float) or not math.isfinite(value):
                raise ValueError('invalid oracle number: ' + field)
        encoded, separate = row['committed_encoding'], row['continued_fraction']
        if not 0 <= encoded <= 1 or not 0 <= separate <= 1:
            raise ValueError('oracle probability outside [0, 1]')
        relative = abs(separate - encoded) / max(encoded, 1e-300)
        if not 0 <= row['relative_difference'] < 1e-12 or relative >= 1e-12:
            raise ValueError('oracle numerical comparison failed')
        closed = row['closed_form_nu4']
        if closed is not None:
            if (type(closed) not in (int, float) or not math.isfinite(closed)
                    or not 0 <= closed <= 1 or encoded == 0
                    or abs(closed - encoded) / encoded >= 1e-12):
                raise ValueError('closed-form comparison failed')
    return report


def run(directory=HERE):
    for name in ('EXECUTION.json', 'BENCHMARKS.json'):
        strict_json((directory / name).read_bytes())
    result = subprocess.run(
        [sys.executable, '-E', '-B', str(directory / 'separate_tail_oracle.py')],
        check=True, capture_output=True, text=True, timeout=60)
    return validate_report(strict_json(result.stdout))


if __name__ == '__main__':
    print(json.dumps(run(), indent=2, allow_nan=False))
