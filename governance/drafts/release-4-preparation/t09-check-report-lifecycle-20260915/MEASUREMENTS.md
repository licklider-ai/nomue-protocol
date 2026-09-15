# Linux integrated evidence

Status: **UNISSUED CANDIDATE**. Integration author evidence, not a formal release judgment.

## Exact target and environment

- Measured source: `b7627d53c53e22fe998f7f7e8f86f714ca877620`.
- [Successful workflow run](https://github.com/licklider-ai/nomue-protocol/actions/runs/34934534883).
- Linux x86_64, kernel `6.17.0-1022-azure`, observer and worker CPython 3.12.14.
- Image: `sha256:916954dbeb697e66419f4368779e5869f7370c51da03b3a9423428f7417c986e`.
- Node 24.14.0 in the fixed image recipe.
- [Capture and attempt identities](CAPTURE.json), [host](measurements/nomue-t09-results/HOST.json),
  [summary](measurements/nomue-t09-results/SUMMARY.json), [raw runs](measurements/nomue-t09-results/RUNS.jsonl),
  [image source manifest](measurements/nomue-t09-stage/SOURCE-MANIFEST.json).

The final packet adds evidence, documentation and offline verification to this measured
commit. Candidate runtime, schemas, reasons, inputs and profile bytes are checked against
the measured source manifest; earlier-head success is not relabeled as a later runtime run.
Downloaded artifact hashes are recorded before JSON whitespace formatting. RUNS.jsonl
keeps the original bytes. Formatting does not change the captured values.

## Results

All 52 Linux invocations passed. Sixteen paired normal/optimized cases produced identical
semantic report envelopes. Supervisor and worker reported optimize flags 0/0 and 1/1.
Normal worker receipts attest the applied CPU [25,26] and AS [268435456,268435456] limits.
All real cleanup runs confirmed stopped namespace/PID zero and empty/removed cgroup.procs.

Thirty-two final reports and twenty refusals were separately read back through the closed
T09 validator, using T07 Record context where available. The largest delivered JSON in
this corpus is 6,454 bytes with the offline checker's default JSON spacing, below both
the stdout and final-report bounds. This is a finite observed size, not a universal claim.

Actual controls establish SIGXCPU, AS allocation refusal, worker deadline, process-group
and escaped-descendant cleanup, abnormal exit, malformed/partial/wrong-identity output,
stdout overflow, stderr overflow and cgroup OOM. Cause-specific assertions prevent an
unrelated startup failure from being counted as a successful resource probe. Observed
overflow bytes were 4,259,840 stdout and 131,072 stderr; retained buffers remained capped.
Transport and report probes construct cap+1 payloads and exercise the actual size checks.
Raw oversize and malformed input remain separate from public numerical membership.

Cleanup-failure, remaining-descendant and late-deadline controls are named synthetic
observer conditions after actual cleanup. Generic unresolved and fail-plus-unresolved
are labeled architecture controls after unchanged G5 execution; they are not claims
that the selected S-C leaves eligible normal completion unresolved. CPU/wall shortening
is confined to named probes, with the unchanged Medium profile checked on normal runs.

The same frozen public-supported Record is used for reference resource failures. Such
failures never rewrite public membership into a C>B conclusion. Numerical gate Records
separately exercise supported-domain, representation and exact-SSE computability outcomes.

## Supplemental and historical evidence

Windows CPython 3.12.10 / Node 24.14.0 passed 263 report assertions per mode and ten
F-01 controls per mode. Linux reran both sets with CPython 3.12.14 before full integration.
The Windows invocation entrypoint also returned a bounded machine refusal with exit 5
for its unsupported observer environment, without a traceback or completed report.

The first Linux attempt safely failed at the initial canary because the fixed supervisor
was materialized at insufficient path depth. That T09 loader defect was repaired without
editing the supervisor. A second successful run was followed by explicit propagation of
inner refusals into the existing failure latch and stricter cause-specific assertions.
Only the final run above is the final runtime validation target.

Local Docker Desktop failed during inference-manager socket initialization. No reset,
configuration repair or data deletion was performed; the hosted Linux run closes the
Linux validation gap. No additional independent numerical review was required because
fixed numerical and lifecycle semantics were reused and integration tests passed.
