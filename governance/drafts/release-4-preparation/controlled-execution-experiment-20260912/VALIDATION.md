# Validation and evidence boundaries

The root-level captures below are historical observations retained from
`73b1afd7c8405a91730ace272b845bb07a68288d`. Their optimized coverage is
qualified by the T02-SF01 correction at the end of this document. They are not
recaptures of the repaired test driver.

Local capture completed 2026-09-13 UTC on Linux x86_64, CPython 3.12.14,
Node 24.19.0 and pnpm 11.19.0 (package launcher declaration 11.7.0).

| Evidence                 | Observed result                                                  |
| ------------------------ | ---------------------------------------------------------------- |
| EXECUTION.json           | 67 checks passed                                                 |
| EXECUTION-OPTIMIZED.json | Same 67 check names passed; optimized parent, fixed normal child |
| ADMISSION.json           | 320 rows; algebraic policy restatement agrees for every row      |
| BENCHMARKS.json          | Seven controlled calls; expected complete/refused dispositions   |
| Source identity          | Seven inherited files equal the pinned historical commit bytes   |
| Repository checks        | Markdown lint 605 files, typecheck and direct validator passed   |

The five seeded preflights per count all pass through n=46. At n=47 one of
five passes; at n=48..65 none of these five samples passes. A separate n=65
zero-contrast example completes, demonstrating that the boundary is data dependent.
Selected ordinary calls at n=2/32/45/46 complete; n=47/65 seed-zero calls refuse.
The current BENCHMARKS.json maximum is 1.618 seconds (ordinary-46) on this host.
These probes do not force the full precision schedule or establish its worst case;
the historical roughly 15-second combined stress observation remains separate.

Author checks exercise actual OS CPU/address-space limits, wall timeout,
SIGTERM cancellation, pipe overflow, abnormal exit, bounded output, source drift,
identity mismatch and partial-result suppression. Separate-formula witnesses fix
SSE=2, F=(0,0,0), p=(1,1,1), and F=(25,9,1) before candidate execution.

Normal and optimized parent runs are saved separately. The production child
command deliberately uses a fixed non-optimized interpreter invocation in both;
these are not two independent child builds or a claim to test optimized child
execution. Historical normal/optimized numerical suites provide their own evidence.

The 320-row admission probe tests all three F values, against an algebraic restatement of the same guard inequalities and constants.
This is a consistency check, not an independent oracle: a shared wrong constant
can pass both expressions. It does not establish the policy limits or satisfy
the Research Gate / independent numerical-oracle requirement. It does not run probability tails. Benchmarks
then execute selected accepted/refused inputs through the actual worker.
Seeded synthetic admission is not a scientific or user-population success rate.

The runtime manifest binds unchanged numerical files plus the new execution and
transport files. Tests reject a corrupted copied dependency. No tests regenerate
the manifest. The trusted manifest, loaders, stdlib and interpreter remain the
trust root; no hostile filesystem or runtime compromise is claimed to be solved.

Repository formatting, Markdown lint, typecheck and validation are run after
evidence capture. This change is informative and does not modify authoritative
artifacts. Exact-head GitHub CI is checked separately and recorded in the PR.
Saved local outputs are author observations, not an independent review.

The aggregate local `pnpm check` reached the tsx CLI IPC `listen EPERM` restriction
after formatting, Markdown lint and typecheck. Direct `node --import tsx` repository
validation passed. Full aggregate checks are delegated to actual GitHub CI, not
reported as a local aggregate pass. The later cancellation-during-launch repair
has 67 checks and supersedes the initial 66-check checkpoint.

## Supplied-review repair validation (2026-09-13 UTC)

The earlier 67-check checkpoint did not establish safe cancellation or reaping.
The review findings are accepted in REVIEW-RESPONSE.md. Updated EXECUTION and
EXECUTION-OPTIMIZED each pass 67 controls; SIGNALS and SIGNALS-OPTIMIZED each
at df33b8d passed seven additional lifecycle controls, including a signal directed to an
already-running unmasked thread during Popen, repeated signals during cleanup,
uncaught caller-loop termination, group-kill-before-reap ordering, event-driven
waits and rejection of an auto-reap SIGCHLD host. Current saved outputs replace
prior observations; original bytes remain in commit be2c488.

The 320-row admission result is unchanged in value; it checks an algebraic
restatement with the same constants and is not an independent oracle. Seven
benchmarks were rerun against the repaired supervisor. Worker numerical source
identities are unchanged. Tests and repairs are author-side execution evidence.

## Cross-thread blocked-select repair (2026-09-13 UTC)

Current SIGNALS and SIGNALS-OPTIMIZED replace the seven-control checkpoint with
ten controls each. Added cases cover select-blocked thread-directed delivery,
public run() cancellation receipt metadata, and failed-launch restoration.
A pre-existing non-default wakeup fd is checked after all direct lifecycle modes.
The blocked-select test sends after 150 ms and requires completion before 1.5 s
with a three-second deadline; normal and optimized elapsed observations are in
the respective receipts. Running the new thread-select test against df33b8d's
supervisor fails on its cancellation-latency assertion.

EXECUTION and EXECUTION-OPTIMIZED were recaptured with 67 controls each, plus
320 admission rows and seven benchmark calls against the new manifest. All seven
inherited files still match the pinned historical commit. These are author
observations on CPython 3.12.14; the supplied review's separate execution scope
is preserved in REVIEW-RESPONSE.md.

## Separate-review intake and parent boundary repairs

SEPARATE-REVIEW.md/json and separate_tail_oracle.py are preserved unchanged from
47b8803282de83576563e350395a1c13ab683a67. Their target is 1caac8d and their
runtime reruns used CPython 3.12.3 with the reported version patched, as disclosed
there; pinned-interpreter evidence was taken from f7be54e CI. No patched host
report is treated as an actual CPython 3.12.14 execution.

The successor's local captures use actual CPython 3.12.14: 67 execution controls,
ten lifecycle controls and six parent-host controls in each mode, 320 admission
rows and seven benchmarks. The new controls refuse path/cached module shadows
before launch and refuse default/custom SIGPIPE dispositions through both run()
and _launch, preserving caller state. The dedicated workflow runs both modes.

The separate oracle was rerun over the recaptured evidence; its observed rows
are saved in HOST-REPAIR-ORACLE.json. This author rerun is not a new independent
review. The 19 packet controls accept an explicit fixed commit/tree argument for
successor validation while retaining their historical default. Historical review
records are not rewritten to claim review of the successor.

## T02-SF01 supervisor optimization coverage correction

The prior `python -O` lifecycle driver started eight isolated test supervisors
without `-O`. Only the two controls executed inside that driver used its
optimization level. The two isolated cancellation controls in test_execution.py
also started normal-mode supervisors. Consequently, earlier descriptions of all
67 execution / ten lifecycle controls exercising an optimized supervisor were
too broad. The saved observations remain historical; their filenames do not
establish the optimization level of each isolated process.

The repair passes the exact driver level (0, 1 or 2) to each isolated test
supervisor. Each process compares its own sys.flags.optimize with the explicit
expected value before invoking the supervisor and emits that observation.
Uncaught cancellation-loop cases emit it before cancellation, so their exit
status alone is not evidence of the requested mode. Parent drivers check the
returned observation. Host-boundary controls use the same test-only helper.

The helper ignores PYTHONOPTIMIZE and explicitly selects the driver level;
regression controls exercise all three levels with a contradictory environment
and reject an incorrect expected level. Production worker invocation remains
`python -I -B worker.py`, without optimization. An additional environment probe
checks that this interpreter flag combination has optimize=0; it is a probe of
the fixed launch flags, not an extra optimized worker configuration.

Repaired execution has 68 controls (the previous 67 plus the worker-mode probe).
Lifecycle still has ten controls, now with per-supervisor mode observations;
host-boundary controls still number six. Packet controls report their own
supervisor level and receive the exact checkout commit explicitly in CI.

Current repair status and separately pinned successor evidence belong in
[T02-SF01-REPAIR.md](T02-SF01-REPAIR.md). This correction is author-side work;
T02 remains NOT CLOSED pending an independent close review of the successor.
