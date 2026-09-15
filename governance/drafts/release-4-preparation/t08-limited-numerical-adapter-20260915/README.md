# R4 T08 limited numerical adapter

Status: **UNISSUED CANDIDATE**, 2026-09-15.

T07-validated Record -> lossless private binary64 transport -> unchanged reviewed
G5 procedure -> T07 quantity-evidence boundary and T09 numerical handoff.
No supported bundle, dispatcher, production hook or final report is added.

## Packet

- [Report and conventions](REPORT.md)
- [Adapter contract](ADAPTER-CONTRACT.md)
- [Responsibility matrix](RESPONSIBILITY-MATRIX.md)
- [Adapter](adapter.ts), [private Python bridge](numerical_bridge.py), [pinned loader](core_loader.py)
- [Integration tests](tests.ts), [generic core controls](test_core_boundary.py)
- [Frozen expected vectors](fixtures/cases.json)
- [Normal results](RESULTS.json), [optimized results](RESULTS-optimized.json)
- [Input/source pins](INPUTS.json), [manifest](MANIFEST.json), [packet checker](verify_packet.py)

## Reproduce

From the repository root, with the pinned Git objects available locally:

```text
pnpm exec tsx governance/drafts/release-4-preparation/t08-limited-numerical-adapter-20260915/tests.ts
pnpm exec tsx governance/drafts/release-4-preparation/t08-limited-numerical-adapter-20260915/tests.ts --optimized
python -B governance/drafts/release-4-preparation/t08-limited-numerical-adapter-20260915/test_core_boundary.py
python -O -B governance/drafts/release-4-preparation/t08-limited-numerical-adapter-20260915/test_core_boundary.py
pnpm exec tsc -p governance/drafts/release-4-preparation/t08-limited-numerical-adapter-20260915/tsconfig.json
python -B governance/drafts/release-4-preparation/t08-limited-numerical-adapter-20260915/verify_packet.py
pnpm validate
pnpm lint:markdown
pnpm exec prettier --check governance/drafts/release-4-preparation/t08-limited-numerical-adapter-20260915
git diff --check
```

The loader performs no fetch. Missing source objects fail execution, not public-domain
membership. Temporary source materialization preserves original paths and bytes;
there is no second editable numerical implementation. `--save RESULTS.json` (or
RESULTS-optimized.json) explicitly captures author test evidence. Routine runs do
not edit repository files. Python uses -B; -O is propagated to the actual core process.
