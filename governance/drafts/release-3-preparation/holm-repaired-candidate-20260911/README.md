# Repaired Holm candidate

Unissued `0.3.0-candidate.3`, superseding the checkpoint candidate as the active
implementation exercise. Candidate.1, candidate.2 and their exact evidence remain
unchanged in their original directories and commits. The new runtime derives from
candidate.2 at `84117fb7b285da43ebb3168c12155f31c4c49bc7`.

The numerical kernel and checkpoint semantics are unchanged. This repair uses
`candidate:holm:<local_reason>` values, explicitly local labels scoped by the
unissued schema, instead of issuing registry-looking NRS reason codes. No new
registered namespace or alias is created. Formal adoption requires an explicit
mapping to the authoritative reason-code registry and a coordinated version change.

Successful forwarded bytes are checked against the report content digest. Invalid
expected-context UTF-8 produces a parse refusal. The public refusal JSON Schema
itself constrains reason, stage, kind and limit combinations, in addition to the
runtime validator. Existing original-byte and resource-discard checks remain.

Tests compare committed snapshots by default and write observations only to the
optional `NOMUE_TEST_OUTPUT` directory. `--refresh-examples` is a deliberate author
operation requiring diff review, never used by CI. Expected outcomes are assertions
in the tests; generated example reports are regression snapshots, not independent
numerical oracles. Interpreter paths are recorded in observations and excluded only
from portable RESULTS snapshot comparison. No fixture data, reason, count, numerical
value, or source digest is normalized away.

From the repository root, use Node 24.19.0, Python 3.12.14 and installed pinned
dependencies. Set `NOMUE_EXPERIMENT_PYTHON` to the absolute interpreter path, then run
this directory's `test_envelope.mjs`, `test_public.mjs`, `test_budget.mjs` and
`test_repairs.mjs` with `node --import tsx`. The repair workflow also executes real
cgroup controls and checks for tracked-file changes. The two-pass inner budget is
5,000 ms and 512 MiB of sampled JS heap; it cannot preempt work between checks.
The outer 30-second deadline and real cgroup limits remain necessary.

See the [repair disposition](../r3-review-repair-20260911/README.md) for the complete
finding assessment, historical evidence limits, CI source identity and remaining
adoption conditions. This is not a new independent research review or formal adoption.
