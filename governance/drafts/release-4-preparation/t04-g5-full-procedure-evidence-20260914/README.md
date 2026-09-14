# R4 T04 G5 numerical procedure evidence

Research-only submission above G4 commit `0562813a2a5b112e73a0d0f0f80160cc3bd08ce7`.
Read [REPORT.md](REPORT.md) for procedure, charge reconciliation, outcomes and limits.
No EC1/EC2 closure or independent reviewer claim is made here.

## Artifacts

- [procedure.py](procedure.py): one exact graph, fixed admission, 22 comparisons,
  S-C, gates, aggregation and constructed bounded numerical evidence.
- [strict-ingress.ts](strict-ingress.ts): existing strict parser/digest/envelope
  research adapter; no production verifier changes or public schema registration.
- [check_evidence.py](check_evidence.py): independent-path author expectations,
  complete fixture checks, corpus reconciliation and synthetic controls.
- [RECORDS.jsonl](RECORDS.jsonl), [EXPECTED-VECTORS.jsonl](EXPECTED-VECTORS.jsonl),
  [RESULTS.jsonl](RESULTS.jsonl): immutable submission inputs and deterministic results.
- [INPUTS.json](INPUTS.json), [MANIFEST.json](MANIFEST.json),
  [VALIDATION.json](VALIDATION.json): source/identity hashes and execution records.
- [verify_artifacts.py](verify_artifacts.py): read-only verification of hashes,
  source Git blobs, direct base, candidate identity and additive change scope.

## Reproduction

Run from the repository root with installed pinned dependencies. The following
commands only read the saved fixtures and compare results; Python `-B` avoids
writing cache files. Commands do not claim production bundle support.

```powershell
python -B governance/drafts/release-4-preparation/t04-g5-full-procedure-evidence-20260914/check_evidence.py
python -B -O governance/drafts/release-4-preparation/t04-g5-full-procedure-evidence-20260914/check_evidence.py
python -B governance/drafts/release-4-preparation/t04-g5-full-procedure-evidence-20260914/verify_artifacts.py
pnpm validate
pnpm lint:markdown
pnpm exec prettier --check governance/drafts/release-4-preparation/t04-g5-full-procedure-evidence-20260914
 git diff --check
```

`check_evidence.py --generate` regenerates raw Records and oracle expectations;
`--write` saves author results. Neither is a review command; use the read-only
commands above for submission verification. Raw Records are always routed through
`parseStrictJson`, including generated candidates before sealing. `--generate`
never invokes the G5 graph, arithmetic projection or tail function for expected
values. Results and expectations use content hashes, not timestamps or timing.

The candidate identity includes REPORT, procedure and ingress source hashes plus
the pinned input manifest. Changing these invalidates the saved candidate/results;
format sources before regeneration. Manifest generation is an author freeze step,
not a way to approve changed artifacts during independent review.
