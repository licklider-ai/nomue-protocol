# R4 T07 closed schemas and relational validator

Status: **UNISSUED CANDIDATE**, 2026-09-15. Base: T06
`ae1ad029179f31ae463882e8467e9367398263c9`.

This additive packet represents the fixed T06 semantics. It registers no schema,
Requirement, check or supported bundle. It neither recomputes numerical truth nor
executes a worker. Report definitions are a T07/T08/T09 boundary, not a final report
implementation. T08 and later tasks have not started.

## Contents

- [Report and conventions](REPORT.md)
- [Schema coverage and deferred responsibilities](SCHEMA-COVERAGE.md)
- [Validation rules and deterministic order](VALIDATION-RULES.md)
- [Responsibility matrix](RESPONSIBILITY-MATRIX.md)
- [Machine-readable coverage](COVERAGE.json)
- [Validator source](validator.ts), [tests](tests.ts), [local TypeScript config](tsconfig.json)
- [Record schema](schemas/record-balanced-two-factor-0.1-draft-1.schema.json)
- [Payload schema](schemas/balanced-two-factor-0.1-draft-1.schema.json)
- [Report component schema](schemas/verification-report-balanced-two-factor-0.1-draft-1.schema.json)
- [Fixture expectations](fixtures/cases.json)
- [Default results](RESULTS.json), [JIT-disabled results](RESULTS-jitless.json)
- [Inputs](INPUTS.json), [manifest](MANIFEST.json), [packet checker](verify_packet.py)

## Reproduce

Run from repository root; commands do not issue support or run numerical experiments.

```text
pnpm exec tsx governance/drafts/release-4-preparation/t07-closed-schemas-validator-20260915/tests.ts
pnpm exec node --jitless --import tsx governance/drafts/release-4-preparation/t07-closed-schemas-validator-20260915/tests.ts
pnpm exec tsc -p governance/drafts/release-4-preparation/t07-closed-schemas-validator-20260915/tsconfig.json
python -B governance/drafts/release-4-preparation/t07-closed-schemas-validator-20260915/verify_packet.py
pnpm validate
pnpm lint:markdown
pnpm exec prettier --check governance/drafts/release-4-preparation/t07-closed-schemas-validator-20260915
git diff --check
```

`--save RESULTS.json` explicitly captures a local test run; ordinary tests are read-only.
Saved outputs are author representation evidence, not independent scientific review.
