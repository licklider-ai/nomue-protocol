# Admission measurement harness: bounded method review

Date: 2026-09-11. Verdict: **PASS for the bounded measurement implementation**
after failure-retention and CI-driven empty-hierarchy repairs. See
[CI-REPAIR.md](CI-REPAIR.md) for the initial real-CI failure, this review
limitation, the fixed follow-up candidate, and the bounded repair judgment. This is not a statistical-method review, B-2
decision, dedicated kernel execution result, or Release 3 adoption decision.

## Role and fixed files

The reviewer is the separate-context OpenAI-assisted investigator who prepared
this experiment's primary-source report. The reviewer did not implement the
harness, but influenced its design through source findings and subsequent
recommendations. Same inherited model configuration and shared infrastructure;
no different-provider or human independence is asserted.

INPUTS.json fixes the five final inspected working-tree files by SHA-256;
INPUTS-initial.json fixes the initial candidate. Final INPUTS.json pins these files to the follow-up immutable candidate commit;
INPUTS-before-ci.json preserves the preceding working-tree file snapshot. No repository files were changed. No real cache
reset or cgroup write was executed by this review.

## Finding disposition

**S-01, failed cache preparation and outer cleanup could lose attempted rows:
CLOSED for the repaired bounded paths.**

The initial finding and its evidence remain in REVIEW-initial.md and
SAFE-CHECKS-initial.json. The author added an initial report before the host guard,
a post-preparation checkpoint, per-reset exception recording, a catch around an
unexpected trial exception, and individually protected outer kill/wait operations.
The original failure and subsequent cleanup errors now remain separate facts.

The two safe local controls were rerun against the repaired files. Both pass:

| Control                                         | Repaired observation                                                                                |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| First reset raises a synthetic OSError          | Report exists; all three reset attempts retain failed rows and the exception; process exits nonzero |
| Trial times out, then outer process kill raises | A failed row returns; initial timeout, kill error, wait error, and cleanup result are retained      |

SAFE-CHECKS.json records these observations. safe_failure_checks.py takes an
explicit repository path and uses synthetic functions plus ordinary temporary
directories. No actual cache reset or /sys/fs/cgroup mutation occurs. The dummy
cleanup's Directory-not-empty result is expected: its fake cgroup controls are
ordinary files, unlike actual kernel interfaces.

## Method and scope assessment

The reviewed implementation matches the accepted full-invocation procedure:
stock integrity preflight remains intact; the supervisor joins its enclosing
hierarchy before exec; every trial uses a fresh hierarchy; leaf and enclosing
peaks remain separate. Reset trials request sync/drop_caches and inspect event
deltas plus an owned nonfaulted sentinel. Fresh-process repeats and six fixed
shapes include admitted large inputs and a predetermined refusal. Output
acceptance checks completion, all scoped check outcomes, and original-byte
forwarding hashes; the refusal prohibits forwarding.

No consequential mismeasurement or false PASS was identified in those bounded
success paths. The VM opt-in/identity guard has the stated trusted-operator limit.
The README accurately limits coldness, cache ownership, startup accounting,
finite measurements, and retained stdout projection. The SCOPE note does not make
production fleet engineering or this particular Linux mechanism a universal
Protocol requirement. Supervisor-crash recovery remains unclosed.

## Remaining limitations

Checkpoint writes use direct replacement of file contents, not an atomic rename.
A hard termination during a write can leave an incomplete file; the harness does
not establish crash-safe artifact durability. A later robustness improvement can
use a temporary adjacent file and atomic replacement. This is not a remaining
blocker for the bounded trial method, which preserves handled preparation and
cleanup failures and has external CI job logs.

The initial metadata construction precedes the first checkpoint, and an early
host-admission error can leave only the initial report plus CI traceback. A cache
exception records failure without necessarily recovering every earlier partial
cache observation. Neither path may be counted as a successful measurement.
A missing or truncated report requires explicit failure, not inferred completion.

Dedicated kernel measurements remain the author's experiment until independently
executed or explicitly inspected as received evidence. No further methodology
expansion or scientific assurance follows from these two helper controls.
