"""Explicit author refresh only. CI checks pins; it never calls this program."""
from pathlib import Path
import hashlib,json
here=Path(__file__).resolve().parent
root=here.parents[3]
old=json.loads((here.parent/'holm-adoption-map-repair-20260911/INPUTS.json').read_text())
paths={x['path'] for x in old['files']}
for pattern in ['review-inputs/r3-holm-public-candidate-review-20260911/**/*.txt','governance/drafts/release-3-preparation/holm-separated-candidate-20260912/*','schemas/meta/*registry.schema.json']:
 paths.update(str(p.relative_to(root)) for p in root.glob(pattern) if p.is_file())
paths.update(['AGENTS.md','CHARTER.md','AUTHORITY.md','governance/RFC.md','governance/ID-POLICY.md','registries/stability-tiers.yaml','registries/requirements.yaml','registries/public-checks.yaml','registries/reason-codes.yaml','registries/public-contract-surfaces.yaml','registries/interpretation-bundles.yaml','spec/verification/public-checks.md','spec/verification/verifier-refusal.md','spec/verification/verification-report.md','schemas/meta/interpretation-bundles.schema.json','schemas/meta/public-contract-surfaces.schema.json','governance/drafts/release-3-preparation/r3-followup-review-20260911/README.md','review-inputs/r3-holm-welch-source-connection-20260911/REPORT.md','review-inputs/r4-ieee-clause-confirmation-20260911/REPORT.md','review-inputs/r3-holm-promotion-20c8e3b/REPORT.md','review-inputs/r3-holm-envelope-review-20260911/REVIEW.md','review-inputs/r3-admission-method-review-20260911/REVIEW.md'])
claims=json.loads((here/'CLAIMS.json').read_text())
for claim in claims['claims']:
 paths.update(claim['evidence']+claim['implementation'])
paths.update(x['path'] for x in json.loads((here.parent/'holm-separated-candidate-20260912/INPUTS.json').read_text())['runtime'])
for pattern in ['*.mjs','meta-schema-preview/*.json','conformance/*']:
 paths.update(str(p.relative_to(root)) for p in here.glob(pattern) if p.is_file())
paths.update(str((here/n).relative_to(root)) for n in ['CLAIMS.json','REQUIREMENTS.json','SURFACES.json','REGISTRY-PREVIEW.json','FIXTURES.json','META-DELTA.json'])
files=[{'path':p,'sha256':hashlib.sha256((root/p).read_bytes()).hexdigest()} for p in sorted(paths)]
(here/'INPUTS.json').write_text(json.dumps({'base_commit':'4a62f8e1768049560cb0ce8f09ef1676cb42130b','status':'author-pinned unchanged sources and new derivative; no historical evidence rewritten','files':files},indent=2)+'\n')
