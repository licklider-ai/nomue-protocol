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
The repair source commit's standard CI and all other workflows subsequently
passed. The final-head CI results must be reported separately.

Actual Linux x86_64 CPython 3.12.14 execution completed in
[R4 CI run 34802483082](https://github.com/licklider-ai/nomue-protocol/actions/runs/34802483082)
on exact repair commit `761eb8e00cdfc06c9f3792271b4c384f922669ce`.
The workflow explicitly checked out that PR head. Kernel: 6.17.0-1022-azure;
interpreter SHA-256:
`bef88f140b625959f8af25c7b75cce2cd5d4b29cc2f2b079befd7f68eda4dba0`.

| Control group            | Normal driver | Optimized driver | Observation                                                    |
| ------------------------ | ------------- | ---------------- | -------------------------------------------------------------- |
| Execution                | 68 pass       | 68 pass          | Driver 0/1; both isolated cancellation supervisors observe 0/1 |
| Lifecycle                | 10 pass       | 10 pass          | Each supervisor records 0/1, including uncaught-loop cases     |
| Host boundaries          | 6 pass        | 6 pass           | Each isolated supervisor verifies expected and observed 0/1    |
| Explicit-head packet     | 19 pass       | 19 pass          | Target is the repair commit; supervisor records 0/1            |
| Worker interpreter probe | 0             | 0                | Fixed -I -B invocation remains non-optimized                   |

The portable mode suite passes six controls, including exact 0/1/2 propagation
and mismatched-level rejection. Level 2 is a helper regression, not a claim of a
full -OO runtime validation. Admission has 320 rows and benchmarks seven calls.
The unchanged oracle reports agreement on 17 historical observed tail values.
It reads the root historical EXECUTION/BENCHMARKS files, not the new CI captures.
These are author-run CI observations, not an independent close review.

## Successor evidence bindings

The 12 CI outputs are preserved as JSON under
[t02-sf01-validation](t02-sf01-validation/MANIFEST.json).
MANIFEST.json binds the executed head/tree, run/artifact identity, exact code
hashes, original artifact stdout hashes and formatted repository-file hashes.
The two normal-reap cwd observations use a declared <CHECKOUT> prefix to avoid
publishing host-absolute paths. Each transformation and original value hash is
recorded in the manifest. All remaining JSON values were compared with the
artifact after formatting; mode, numerical and control results are unchanged.

The evidence-record commit follows the executed source commit. Reuse at that
later head requires all recorded code bindings to match; it does not relabel the
run as execution on the later commit. Final-head CI is checked separately and
reported in the repair handoff. Historical root captures and review targets stay
unchanged, with the old optimized coverage qualified in VALIDATION.md.

## Preservation and independent handoff

The 11 runtime hashes in INPUTS.json still match; that manifest is not repinned.
Seven numerical dependencies and all three original separate-review assets are
unchanged. Root EXECUTION, SIGNALS, HOST-BOUNDARIES, BENCHMARKS, ORACLE and PACKET
captures retain their historical bytes. The 1.618-second benchmark maximum in
VALIDATION.md continues to describe that historical BENCHMARKS.json only.

The successor review should verify the per-process mode observations, unchanged
runtime bindings, capture target and test-file hashes. A repair verdict is not a
GO, Research Gate closure, policy adoption, release or permission to merge.
