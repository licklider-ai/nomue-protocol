# Holm checkpoint candidate

Informative, unissued successor `0.3.0-candidate.2`. This packet adds in-process
resource checkpoints to the [public candidate](../holm-public-candidate-20260911/README.md)
without changing that candidate or registering support. It implements the checkpoint
approach proposed in the [adoption decisions](../holm-adoption-map-20260911/DECISIONS.md).
Formal adoption, Requirement allocation, registry dispatch and release publication
remain separate decisions under the open Release 3 RFC.

## Behavior and limits

`entry.mjs` takes exactly two regular file paths: Record, then expected context.
It reads at most each cap plus one byte, retains strict input rejection priority,
and emits one private JSON result. `public.mjs` converts a locally trusted completed
supervisor receipt to the candidate public output. Receipts are not authenticated
remote attestations. No Record field or CLI option controls the clock, heap probe,
worker replacement or input reader.

One budget starts before Record file I/O and is shared by both verifier passes.
It uses the existing `reference/verifier/src/limits.ts` comparison semantics, with
a monotonic clock, 5,000 ms elapsed time and 536,870,912 bytes of sampled JavaScript
heap. Equality is admitted; exceeding time wins over exceeding heap. These are
initial engineering limits inherited from the reference defaults, not universal
performance guarantees. Static module loading and Node bootstrap precede this
inner budget and remain covered by the outer supervisor deadline.

Checks occur after eligible Record parsing, storage verification, eligible expected
context parsing, context agreement, declaration preparation, admission, worker
completion, report validation, and final transport serialization. There is also a
check before expected-context I/O. The final check precedes stdout writing. Raw
syntax and parsed-size refusals retain ingress priority. A crossed budget yields
only a `processing` / `resource_limit` refusal with `processing_timeout` or
`processing_heap`; no partial checks, payload, or verified Record bytes survive.
Worker exceptions cannot absorb a resource refusal into `worker_failure`.

Checkpoints do not interrupt an operation. In particular, the inherited 25-second
worker deadline can elapse before the next inner observation; 5 seconds is not a
hard preemption guarantee. The unchanged 30-second outer deadline and cgroup
limits cover stalls and whole-process resources. Sampled heap excludes native and
Python allocations and cannot observe between-check peaks. The inherited cgroup
512 MiB limit may act before the inner heap limit. Outer OOM, pids, cancellation,
deadline, overflow and cleanup failures still discard inner results according to
the existing supervisor precedence.

Public refusal schemas gain the processing stage and two reason codes; all packet
identifiers advance to candidate.2. The old candidate.1 and registered bundles
retain their original behavior. Unknown input size remains `not_observed`; this
change does not settle the separate input-evidence design decision.

## Reproduce

Use Linux x64, Node 24.19.0, Python 3.12.14 and the pinned pnpm lockfile. From the
repository root, set `NOMUE_EXPERIMENT_PYTHON` to the absolute Python executable.
Run these files with `node --import tsx`, in order:

1. `test_envelope.mjs`: 82 candidate controls and 132 registered legacy fixtures.
2. `test_public.mjs`: public conversion and schema controls.
3. `test_budget.mjs`: deterministic boundary, shared-budget and discard controls.

All three are in this directory. Run `python3 test_execution.py --output <path>`
from this directory for seven local controls. The dedicated
[workflow](../../../../.github/workflows/r3-holm-checkpoint-candidate.yml) executes
`ci_host.py` on a disposable delegated cgroup v2 host and preserves raw receipts.
It adds a real 5.1-second worker delay using the default monotonic budget, followed
by refusal and complete cleanup. `test_receipts.mjs` validates every public
conversion and requires exactly five successful original-byte forwards.

`INPUTS.json` pins runtime dependencies; `TEMPLATES.json` records the immutable
candidate.1 source files used for derivation. `pin_runtime.py` updates pins only
when deliberately reviewing a changed runtime, after formatting. It is not a test
that independently approves new source content. Do not repin to bypass drift.
The candidate is maintained directly; no generator rewrites it from the old packet.

## Evidence and remaining decisions

`BUDGET-RESULTS.json`, `RESULTS.json` and `PUBLIC-RESULTS.json` record local checks.
Actual cgroup evidence is supplied by the workflow; local checks do not stand in
for unavailable local controller enforcement. See `REVIEW.md` for review scope.

This candidate advances the implementation of NRS-SEC-0006's in-process checkpoint
obligation. It does not alone close formal adoption or every Release 3 gate. The
adoption map still needs a coordinated candidate.2 update, input-size evidence
needs its own decision, and steward adoption remains subject to the RFC window
(earliest unchanged STABLE decision: 2026-10-09T11:50:18Z, not automatic approval).
