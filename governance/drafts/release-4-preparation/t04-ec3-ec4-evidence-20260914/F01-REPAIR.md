# F-01 execution-failure delivery repair

Status: `F-01 REPAIRED — READY FOR TARGETED T04 CLOSE RE-REVIEW` (author assessment).
The steward reports the independent T04 close review as NOT READY with this one
blocker. This repair does not close T04 or commission another review.

## Target and root cause

Repair base: `64a9a4aa188fb16077245e8d87503765460a410f`, on
`research/r4-t04-ec3-ec4-evidence-20260914`. Main stays at
`3880db43a64e1758494f3c78f6850daab0e3e9e9`.

The old finalizer inspected deadline/OOM only when the report was absent. The
observer could detect a deadline, recheck ready, collect a valid late report,
clean up successfully and pass its expected numerical comparison. The report
therefore overrode an already established execution failure.

## Minimal repair and invariant

Once an invocation execution failure is established, its numerical result is
undeliverable even if a valid report subsequently arrives or cleanup succeeds.
The final outcome remains `execution_refusal`, with `result:null`, never a
completed numerical pass/fail or numerical indeterminate.

- `delivery.py` makes invocation/worker failure evidence authoritative, followed
  by containment/cleanup, report validity, and finally a numerical result.
  OOM refines generic container exit to the existing `tree_memory_limit` reason.
  Existing reason strings are retained in `execution_failure_reasons`; this is a
  sticky diagnostic list, not a new outcome taxonomy or public identifier scheme.
  A completed/partial report is removed and its available hash quarantined. An
  already-safe refusal receipt can remain for diagnostics.
- `run_suite.py` checks deadline before accepting ready, avoids loading a report
  after a latched outer failure, and rechecks time after report acquisition.
  Cleanup retains its existing separate allowance. Expected numerical success
  is decided from `final_outcome`, not from a provisional report.
- The saved-result checker replays the current finalizer over every historical
  receipt and requires the exact original final outcome. It does not rewrite or
  relabel the historical measurements as new runtime evidence.

## Deterministic adversarial controls

[F01-CONTROLS.json](F01-CONTROLS.json) contains 34 new cases in each interpreter
mode, plus the seven existing delivery checks in each mode. Nine cases call the
actual observer `one()` with controlled Docker, process-state and clock seams.
No real timing race, Docker availability or sleeps are required for these controls.

The forced orders include deadline then report, report then deadline, and deadline
during report acquisition. All produce the same deadline refusal, `result:null`,
and `check:FAIL` for a case expecting numerical success, despite successful cleanup.
A negative-control suite assertion passing is distinct from a numerical invocation
being classified as completed.

Valid report plus OOM, CPU limit, allocation failure, worker crash, malformed
output, output overflow, cancellation, ownership/descendant failure, harness failure
(including empty diagnostic text) and cleanup failure all suppress numerical
results. Re-finalizing with a later valid report cannot clear the failure.
Multiple causes are retained; normal completed candidate/gate results and an
already-safe refusal remain unchanged.

[F01-BASELINE-REPRODUCTION.json](F01-BASELINE-REPRODUCTION.json) records six observer
regressions against the read-only original source and direct reproduction of
report-plus-deadline and report-plus-OOM delivering a completed result. Thus these
controls reject the reviewed implementation rather than merely echoing the repair.

These are generated receipt/control-flow tests, not new numerical or physical
resource measurements. The existing CI also runs the same controls in normal and
optimized mode; its exact repair commit/run is reported in the handoff.

## Preservation and validation

The 338 saved receipts replay identically under the repaired finalizer in both
modes; saved analyses, input hashes, measurements and captured host evidence remain
unchanged. No numerical or resource-profile values are reselected. J-cost(B,S-C),
B, Z-B, S-C, all 22 comparisons and aggregation stay pinned to the existing inputs.

The repair only changes this EC3/EC4 research directory. Opening RFC, T03,
Architecture, G1-G5, the EC1/EC2 candidate, historical POLICY/receipts, main and
PR #331 history remain untouched. Both profile JSON files and all 11 historical
runtime hashes are checked against the base. Support layers are unchanged.

Commands from repository root:

```sh
python -B governance/drafts/release-4-preparation/t04-ec3-ec4-evidence-20260914/check_failure_delivery.py
python -O -B governance/drafts/release-4-preparation/t04-ec3-ec4-evidence-20260914/check_failure_delivery.py
python -B governance/drafts/release-4-preparation/t04-ec3-ec4-evidence-20260914/verify_measurements.py
python -O -B governance/drafts/release-4-preparation/t04-ec3-ec4-evidence-20260914/verify_measurements.py
pnpm validate
pnpm lint:markdown
git diff --check
```

Prettier covers affected Markdown/JSON; MANIFEST binds the repaired source and
new control evidence. The control file separately records source hashes and local
runtime provenance. No old measurement/source SHA is silently promoted to the
repaired observer. T05 and later work, production integration and issuance remain
untouched. Independent targeted re-review is still required.
