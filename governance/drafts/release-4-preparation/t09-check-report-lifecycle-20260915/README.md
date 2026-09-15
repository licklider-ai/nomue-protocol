# R4 T09 check, reason, report and lifecycle

Status: **UNISSUED CANDIDATE**, 2026-09-15. No production support or formal issuance.

T07 strict/closed validation -> unchanged T08/G5 numerical adapter -> candidate
check/report -> fixed T04 failure latch -> cleanup-gated bounded delivery.

- [Assessment](REPORT.md), [lifecycle](LIFECYCLE.md), [reason inventory](REASONS.md)
- [Report schema and invariants](REPORT-SCHEMA.md), [responsibilities](RESPONSIBILITY-MATRIX.md)
- [Report code](report.ts), [closed report](report.schema.json), [internal envelope](invocation.schema.json)
- [Application](app.ts), [supervisor wrapper](supervise.py), [worker wrapper](worker.py)
- [Linux invocation](invoke.py), [image preparation](prepare.py), [Linux suite](linux_tests.py)
- [Report tests](tests.ts), [failure latch controls](test_f01.py)
- [Linux evidence](MEASUREMENTS.md), [capture](CAPTURE.json), [artifact manifest](MANIFEST.json)
- [Input pins](INPUTS.json), [Medium profile](PROFILE.json), [packet checker](verify_packet.py)

## Reproduce

Run from the repository root with the existing locked Node dependencies installed.
The pinned Git blobs are needed locally; runtime loading does not fetch.

```sh
pnpm exec tsx governance/drafts/release-4-preparation/t09-check-report-lifecycle-20260915/tests.ts
pnpm exec tsx governance/drafts/release-4-preparation/t09-check-report-lifecycle-20260915/tests.ts --optimized
python -B governance/drafts/release-4-preparation/t09-check-report-lifecycle-20260915/test_f01.py
python -O -B governance/drafts/release-4-preparation/t09-check-report-lifecycle-20260915/test_f01.py
pnpm exec tsx governance/drafts/release-4-preparation/t09-check-report-lifecycle-20260915/verify_measurements.ts
python -B governance/drafts/release-4-preparation/t09-check-report-lifecycle-20260915/verify_packet.py
pnpm exec tsc -p governance/drafts/release-4-preparation/t09-check-report-lifecycle-20260915/tsconfig.json
```

On a Linux x86_64 Docker host, using fresh temporary paths:

```sh
python -B governance/drafts/release-4-preparation/t09-check-report-lifecycle-20260915/prepare.py /tmp/nomue-t09-stage
docker build -t nomue-t09-research /tmp/nomue-t09-stage
python -B governance/drafts/release-4-preparation/t09-check-report-lifecycle-20260915/linux_tests.py /tmp/nomue-t09-results
python -B governance/drafts/release-4-preparation/t09-check-report-lifecycle-20260915/invoke.py record.json
```

The invocation entrypoint is research/internal only. Its output is either one report
envelope or one refusal envelope; it is not wired into the public CLI or dispatcher.
