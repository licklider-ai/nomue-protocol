# T02-SF01 supervisor-mode coverage repair

Repair base: `73b1afd7c8405a91730ace272b845bb07a68288d`, PR #331.
Scope: the mismatch between optimized test-driver mode and isolated supervisor
mode. This is an author-side repair, not an independent review or a T02 close.
T02 remains NOT CLOSED. No T03 or later task is undertaken.

## Change and provenance

The prior lifecycle subprocess commands and two cancellation commands omitted
optimization flags. sys.executable alone does not inherit them. The test-only
helper now propagates the exact level, ignores conflicting PYTHONOPTIMIZE, and
requires each isolated process to check and emit its actual flag before testing.
The lifecycle driver checks early observations even when cancellation terminates
the process. Host tests also verify their observed level, including level 2.
Production worker flags, supervisor implementation and numerical bytes are unchanged.

Prepared with OpenAI Codex in the continuing T01/T02 conversation, now acting as
repair author. The prior reviewer role does not make this repair independently
approved. Independent close review must use the final pushed successor.

## Validation status

Local Windows CPython 3.12.10: all changed Python programs parse; the six portable
mode controls pass under normal and optimized drivers. They include observed
0/1/2 propagation with conflicting environment settings and rejection of wrong
expected levels. No mocked platform version is used for these results.

Local pnpm check passed formatting, Markdown lint (611 files), typecheck and
repository validation, then finished Vitest with 517 passes and three failures
in unchanged R2 Group 3 admission/selection tests. Diagnostics concern filesystem
read grants and the exact supported-execution selection evidence. The aggregate
command therefore did not pass locally; later chained checks did not run. No R2
source, fixture or evidence is changed to address these unrelated failures.
The final-head CI results must be reported separately.

Linux CPython 3.12.14 execution and successor artifact capture are pending the
repair commit's GitHub CI. The workflow now checks out the exact PR head, runs
the existing suites plus mode controls, explicit-head packet controls in both
modes, and the unchanged 17-value oracle. Results will be recorded with the
executed commit and code hashes rather than relabeling historical captures.

## Preservation and independent handoff

The 11 runtime hashes in INPUTS.json still match; that manifest is not repinned.
Seven numerical dependencies and all three original separate-review assets are
unchanged. Root EXECUTION, SIGNALS, HOST-BOUNDARIES, BENCHMARKS, ORACLE and PACKET
captures retain their historical bytes. The 1.618-second benchmark maximum in
VALIDATION.md continues to describe that historical BENCHMARKS.json only.

The successor review should verify the per-process mode observations, unchanged
runtime bindings, capture target and test-file hashes. A repair verdict is not a
GO, Research Gate closure, policy adoption, release or permission to merge.
