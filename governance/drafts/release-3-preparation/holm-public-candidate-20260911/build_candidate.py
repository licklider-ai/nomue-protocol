"""Reproduce the unissued candidate from reviewed, immutable repository templates.

Generated files stay in this informative packet, never in registered surfaces.
Run before formatting; pin_runtime.py records the final formatted runtime bytes.
"""
import copy
import hashlib
import json
from pathlib import Path
import subprocess

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
BASE = '234abcaf256eac491a68b4b4b1593bf3983a8992'
OLD = HERE.parent / 'holm-envelope-experiment-20260911'
CONTROL = HERE.parent / 'holm-controlled-execution-20260911'
sources = []


def source(directory, name):
    path = directory / name
    rel = str(path.relative_to(ROOT))
    raw = subprocess.check_output(['git', 'show', BASE + ':' + rel], cwd=ROOT)
    if path.read_bytes() != raw:
        raise ValueError('reviewed template drift: ' + rel)
    sources.append({'path': rel, 'sha256': hashlib.sha256(raw).hexdigest()})
    return raw.decode()


def write(name, value):
    (HERE / name).write_text(json.dumps(value, indent=2) + '\n')


oldids = json.loads(source(OLD, 'identities.json'))
identity = lambda family, name: 'https://nomue.ai/id/' + family + '/' + name + '/0.3.0-candidate.1'
ids = {k: identity(family, 'holm-supplied-p-' + k) for k, family in
       [('record', 'schema'), ('bundle', 'bundle'), ('profile', 'profile'),
        ('report', 'schema'), ('refusal', 'schema'), ('expected', 'schema'), ('contract', 'contract')]}
ids['checks'] = {k: identity('check', 'holm-' + k) for k in oldids['checks']}
replacements = {oldids[k]: ids[k] for k in ['record', 'bundle', 'profile', 'report', 'refusal']}
replacements.update({oldids['checks'][k]: ids['checks'][k] for k in oldids['checks']})


def rename(text):
    for old, new in replacements.items():
        text = text.replace(old, new)
    return text


write('identities.json', ids)
catalog = json.loads(source(HERE.parent / 'holm-declaration-binding-experiment-20260911', 'fixture-contracts.json'))
shapes = {row['result_kind']: row['contract_ref'] for row in catalog}
write('declaration-shapes.json', {'status': 'unissued declaration shapes, not executable Contracts',
                                 'legacy_adapter': shapes})


def declaration_schema(value):
    if isinstance(value, dict):
        if 'contract_ref' in value:
            del value['contract_ref']
            value['operation_kind'] = {'enum': list(shapes)}
        if isinstance(value.get('required'), list):
            value['required'] = ['operation_kind' if k == 'contract_ref' else k for k in value['required']]
        for child in value.values():
            declaration_schema(child)
    elif isinstance(value, list):
        for child in value:
            declaration_schema(child)


diag = json.loads(source(OLD, 'diagnostics.json'))
write('diagnostics.json', diag)
for name in ['record', 'expected', 'report', 'refusal']:
    schema = json.loads(rename(source(OLD, name + '.schema.json')))
    schema['$comment'] = 'Unissued R3 candidate. Proposed identities are not allocated or supported by the registered verifier.'
    if name == 'record':
        schema['properties']['payload']['required'].append('contract_id')
        schema['properties']['payload']['properties']['contract_id'] = {'const': ids['contract']}
    if name in ['record', 'expected']:
        schema['$id'] = ids[name]
        declaration_schema(schema)
    write(('private-' if name in ['report', 'refusal'] else '') + name + '.schema.json', schema)

engine = source(OLD, 'envelope.mjs')
engine = engine.replace('// Unissued full-envelope experiment; fixture identities never enter bundle dispatch.',
                        '// Unissued candidate engine; exact dispatch here does not register a supported bundle.')
engine = engine.replace('local("./" + n + ".schema.json")',
                        'local("./" + (["report", "refusal"].includes(n) ? "private-" : "") + n + ".schema.json")')
engine = engine.replace('const STAGES =', 'const SHAPES = JSON.parse(fs.readFileSync(local("./declaration-shapes.json"), "utf8")).legacy_adapter;\nconst STAGES =')
engine = engine.replace('  d.artifact_kind =', '''  for (const item of [...d.analyses, ...d.result_slots]) {
    item.contract_ref = SHAPES[item.operation_kind];
    delete item.operation_kind;
  }
  d.artifact_kind =''')
(HERE / 'envelope.mjs').write_text(engine)
tests = source(OLD, 'test_envelope.mjs').replace('      declaration,\n', '      contract_id: IDS.contract,\n      declaration,\n')
tests = tests.replace('https://example.invalid/\"));', 'https://nomue.ai/id/check/\"));')
convert = '''  for (const item of [...declaration.analyses, ...declaration.result_slots]) {
    item.operation_kind = item.contract_ref.slice("example-contract-".length, -3).replaceAll("-", "_");
    delete item.contract_ref;
  }
'''
tests = tests.replace('  declaration.artifact_kind =', convert + '  declaration.artifact_kind =')
(HERE / 'test_envelope.mjs').write_text(tests)
for name in ['entry.mjs', 'supervisor.py', 'probes.mjs', 'prepare_cases.mjs', 'test_execution.py', 'ci_host.py']:
    text = source(CONTROL, name)
    text = text.replace('../holm-envelope-experiment-20260911/', './')
    text = text.replace('HERE.parent / "holm-envelope-experiment-20260911"', 'HERE')
    if name == 'prepare_cases.mjs':
        text = text.replace('  r.payload = {\n', '  r.payload = {\n    contract_id: initial.payload.contract_id,\n')
        text = text.replace('  declaration.artifact_kind =', convert + '  declaration.artifact_kind =')
    (HERE / name).write_text(text)

code = lambda reason: 'NRS-HOLM-' + reason.upper().replace('_', '-')
reasons = {reason: code(reason) for reason in list(diag['refusals']) + ['prerequisite_failed'] +
           sum(diag['checks'].values(), [])}
execution = {
    'cleanup_failed': ('internal_error', 'cleanup_failed', None),
    'memory_enforced': ('resource_limit', 'memory_enforced', 'memory_limit'),
    'pids_enforced': ('resource_limit', 'pids_enforced', 'task_limit'),
    'cancelled': ('execution_cancelled', 'cancelled', None),
    'deadline': ('resource_limit', 'deadline', 'processing_timeout'),
    'output_overflow': ('resource_limit', 'output_overflow', 'output_size'),
    'unsupported_host': ('unsupported_execution', 'unsupported_host', None),
    'setup_failed': ('internal_error', 'setup_failed', None),
    'invalid_input': ('input_access_error', 'invalid_input', None),
    'abnormal_exit': ('internal_error', 'abnormal_exit', None),
    'completed_invalid_output': ('internal_error', 'completed_invalid_output', None),
}
for category, (kind, reason, limit) in execution.items():
    reasons[reason] = code(reason)
execution = {k: {'refusal_kind': kind, 'reason': reason, 'limit_category': limit}
             for k, (kind, reason, limit) in execution.items()}
limits = {}
for reason, row in diag['refusals'].items():
    if row['refusal_kind'] == 'resource_limit':
        suffix = reason.rsplit('_', 1)[-1]
        limits[reason] = {'bytes': 'file_size', 'depth': 'nesting_depth', 'nodes': 'node_count',
                         'container': 'container_size', 'string': 'string_length', 'key': 'string_length',
                         'exhaustion': 'parser_exhaustion'}.get(suffix, 'binding_admission')
write('outcomes.json', {'status': 'unissued proposal; no reason identifiers allocated',
                       'reasons': reasons, 'execution_precedence': list(execution),
                       'execution': execution, 'input_limits': limits})
report = json.loads((HERE / 'private-report.schema.json').read_text())
report['$id'] = ids['report']
report['required'].remove('kind')
del report['properties']['kind']
report['required'] += ['$schema', 'report_type']
report['properties']['$schema'] = {'const': ids['report']}
report['properties']['report_type'] = {'const': 'nomue-verification-report'}
check = report['$defs']['check']
check['required'][check['required'].index('reasons')] = 'reason_codes'
check['properties']['reason_codes'] = check['properties'].pop('reasons')
check['properties']['reason_codes']['items'] = {'enum': [reasons[r] for r in ['prerequisite_failed'] + sum(diag['checks'].values(), [])]}
# Rewrite property locators in the conditional rules, never literal Record values.
check['allOf'] = json.loads(json.dumps(check['allOf']).replace('"reasons"', '"reason_codes"'))
write('report.schema.json', report)
obj = lambda props: {'type': 'object', 'additionalProperties': False, 'required': list(props), 'properties': props}
refusal = obj({'$schema': {'const': ids['refusal']}, 'output_type': {'const': 'nomue-verifier-refusal'},
               'stage': {'enum': ['execution'] + sorted({x['stage'] for x in diag['refusals'].values()})},
               'refusal_kind': {'enum': sorted({x['refusal_kind'] for x in diag['refusals'].values()} | {x['refusal_kind'] for x in execution.values()})},
               'reason_codes': {'type': 'array', 'minItems': 1, 'maxItems': 1, 'items': {'enum': [reasons[r] for r in sorted(set(diag['refusals']) | set(execution))]}},
               'message': {'type': 'string', 'minLength': 1, 'maxLength': 256},
               'verifier': obj({'name': {'const': 'holm-public-candidate'}, 'version': {'const': 'unissued-v1'}}),
               'input_evidence': obj({'availability': {'const': 'not_observed'}}),
               'generated_at': copy.deepcopy(report['properties']['generated_at'])})
refusal['properties']['limit_category'] = {'enum': sorted(set(limits.values()) | {x['limit_category'] for x in execution.values() if x['limit_category']})}
refusal['properties']['details'] = json.loads((HERE / 'private-refusal.schema.json').read_text())['properties']['details']
refusal['allOf'] = [{'if': {'properties': {'refusal_kind': {'const': 'resource_limit'}}},
                     'then': {'required': ['limit_category']}, 'else': {'not': {'required': ['limit_category']}}}]
refusal['$schema'] = 'https://json-schema.org/draft/2020-12/schema'
refusal['$id'] = ids['refusal']
refusal['$comment'] = report['$comment']
write('refusal.schema.json', refusal)
write('TEMPLATES.json', {'base_commit': BASE, 'sources': sorted(sources, key=lambda x: x['path'])})
