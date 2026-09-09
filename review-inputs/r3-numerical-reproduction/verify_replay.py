"""Check fenced-byte identities, replay coverage, and explicit transcript differences.

This checks evidence transport and the declared finite cases, not mathematical truth.
"""
import argparse
import ast
import collections
import hashlib
import json
from pathlib import Path
import re

SCRIPTS = {
    'a': 'probe_a_f_tail.py', 'b': 'probe_b_studentized_range.py',
    'g': 'probe_g_range_bracket.py', 'c': 'probe_c_dunnett.py',
    'c2': 'probe_c2_dunnett_boundaries.py', 'd': 'probe_d_adjusted_p.py',
    'e': 'probe_e_stochastic_intervals.py', 'f': 'probe_f_quantiles_resources.py',
}
EXPECTED_TASKS = {
    'b': ['00-00', '00-01', '00-02', '00-03', '00-04', '00-05', '01-00']
         + [f'02-{i:02d}' for i in range(11)]
         + ['03-00', '04-00', '04-01', '04-02', '04-03', '05-00'],
    'c': ['00-00', '00-01', '00-02', '01-00', '01-01', '01-02', '01-03',
          '02-00', '02-01', '02-02', '02-03', '03-00', '03-01', '03-02',
          '04-00', '05-00', '06-00'],
}

def sha(data):
    return hashlib.sha256(data).hexdigest()

def read_record(path):
    text = path.read_bytes().decode('utf-8')
    blocks = {}
    for match in re.finditer(r'^### ([AB]\.\d[^\n]*)\n(.*?)^```(python|text)\n(.*?)^```',
                             text, re.M | re.S):
        heading, markup, language, body = match.groups()
        name = re.search(r'`(probe_[^`]+\.(?:py|out))`', heading).group(1)
        assert name not in blocks, ('duplicate', name)
        data = body.encode()
        if language == 'python':
            ast.parse(body)
            row = re.search(r'^\|\s*`' + re.escape(name) + r'`\s*\|\s*`([0-9a-f]{64})`', text, re.M)
            assert row, name
            expected = row.group(1)
        else:
            expected = re.search(r'SHA-256 `([0-9a-f]{64})`', heading).group(1)
        assert sha(data) == expected, ('fenced-byte digest mismatch', name, sha(data), expected)
        blocks[name] = data
    assert set(blocks) == set(SCRIPTS.values()) | {f'probe_{n}.out' for n in SCRIPTS}, set(blocks)
    matrix = text.split('## 6. Coverage matrix')[1].split('### 6.1')[0]
    rows = [line for line in matrix.splitlines()
            if re.match(r'\| (OMN|PVL|CLS|APR|HET|MTO|MCB|FDR|RSM)-\d\d', line)]
    ids = [r.split('|')[1].strip() for r in rows]
    labels = collections.Counter(x for r in rows for x in re.findall(r'`(PRELIM-[A-Z-]+)`', r))
    assert len(ids) == len(set(ids)) == 49
    assert dict(labels) == {'PRELIM-FEASIBLE': 22, 'PRELIM-FEASIBLE-TABLE': 6,
                            'PRELIM-ORACLE-ONLY': 9, 'PRELIM-DEFER': 6,
                            'PRELIM-TRANSFER': 5, 'PRELIM-NA': 2}, labels
    assert [r.split('|')[1].strip() for r in rows
            if len(re.findall(r'`(PRELIM-[A-Z-]+)`', r)) > 1] == ['MTO-01']
    summary = text.split('### 17.2')[1].split('## 18.')[0]
    summary_ids = re.findall(r'\b(?:OMN|PVL|CLS|APR|HET|MTO|MCB|FDR|RSM)-\d\d\b', summary)
    assert len(summary_ids) == 50 and set(summary_ids) == set(ids)
    assert {k: v for k, v in collections.Counter(summary_ids).items() if v > 1} == {'MTO-01': 2}
    return blocks

def comparison_form(data):
    lines = []
    for line in data.decode().splitlines():
        line = re.sub(r'\([0-9]+(?:\.[0-9]+)?s\)', '(<elapsed>s)', line)
        line = re.sub(r'\btime [0-9]+(?:\.[0-9]+)?s', 'time <elapsed>s', line)
        line = re.sub(r'^(exact (?:Holm m=100000|Hommel O\(m\^2\) m=2000): )\d+(?:\.\d+)?s',
                      r'\1<elapsed>s', line)
        if line.startswith(('python ', 'versions ')):
            line = re.sub(r'\bpython 3\.12\.(?:13|14)\b', 'python <recorded-patch-version>', line)
        # One known historical formatter deletion; never used for stored-byte hashes.
        if line == '=== C1 vs C3 (Arb rigorous) ':
            line = line[:-1]
        lines.append(line)
    return '\n'.join(lines) + '\n'

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('record', type=Path)
    parser.add_argument('--extract-to', type=Path)
    parser.add_argument('--evidence', type=Path)
    parser.add_argument('--compare-to', type=Path)
    args = parser.parse_args()
    blocks = read_record(args.record)
    if args.extract_to:
        args.extract_to.mkdir(parents=True, exist_ok=False)
        for name, data in blocks.items():
            target = name if name.endswith('.py') else name + '.expected'
            (args.extract_to / target).write_bytes(data)
    result = {'script_hashes': '8/8', 'output_hashes': '8/8', 'catalogue_ids': 49,
              'scope_assignments': 50}
    if args.evidence:
        evidence = json.loads(args.evidence.read_text())
        assert len(evidence['captures']) == 8
        by_name = {r['probe']: r for r in evidence['captures']}
        assert set(by_name) == set(SCRIPTS)
        for name, record in by_name.items():
            assert record['source_sha256'] == sha(blocks[SCRIPTS[name]])
            actual = record['stdout'].encode()
            assert record['exit_code'] == 0 and record['stderr'] == ''
            assert actual == blocks[f'probe_{name}.out']
            assert sha(actual) == record['out_sha256']
            assert len(actual) == record['out_bytes']
            assert record['err_sha256'] == sha(b'') and record['err_bytes'] == 0
        for name, expected in EXPECTED_TASKS.items():
            tasks = sorted((r for r in evidence['parallel_tasks'] if r['probe'] == name),
                           key=lambda r: r['selection'])
            assert [r['selection'] for r in tasks] == expected
            assert all(r['exit_code'] == 0 and r['stderr'] == '' for r in tasks)
            for task in tasks:
                assert task['source_sha256'] == sha(blocks[SCRIPTS[name]])
                assert sha(task['stdout'].encode()) == task['out_sha256']
                assert len(task['stdout'].encode()) == task['out_bytes']
                assert sha(task['executed_source'].encode()) == task['executed_sha256']
                assert task['err_sha256'] == sha(b'') and task['err_bytes'] == 0
            assert ''.join(r['stdout'] for r in tasks) == by_name[name]['stdout']
        result['capture_bindings'] = '8/8'
        result['parallel_task_coverage'] = '41/41'
    if args.compare_to:
        old = read_record(args.compare_to)
        result['comparison'] = {}
        for name, script in SCRIPTS.items():
            assert blocks[script] == old[script], ('changed probe script', script)
            filename = f'probe_{name}.out'
            same = comparison_form(blocks[filename]) == comparison_form(old[filename])
            result['comparison'][name] = 'MATCH' if same else 'DIFFERENCE_REQUIRES_REVIEW'
        # A mismatch is reported without any implicit numeric tolerance or rounding.
    print(json.dumps(result, indent=2))

if __name__ == '__main__':
    main()
