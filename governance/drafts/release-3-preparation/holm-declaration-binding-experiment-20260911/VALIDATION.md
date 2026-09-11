# Validation and reproduction

Run from the repository root with the pinned pnpm dependencies installed inside
this checkout. This experiment uses Linux, Node 24 native TypeScript stripping,
and Python with the standard `resource` module. It does not claim Node 20 or
Windows support. Set `NOMUE_EXPERIMENT_PYTHON` to an absolute Python executable if
the author path in `INPUTS.json` differs; run the harness with that same Python.

```sh
python governance/drafts/release-3-preparation/holm-declaration-binding-experiment-20260911/check_nodes.py
python -O governance/drafts/release-3-preparation/holm-declaration-binding-experiment-20260911/check_nodes.py
python governance/drafts/release-3-preparation/holm-declaration-binding-experiment-20260911/run_suite.py > /tmp/r3-binding-results.json
python governance/drafts/release-3-preparation/holm-declaration-binding-experiment-20260911/test_integrity.py > /tmp/r3-binding-integrity.json
node governance/drafts/release-3-preparation/holm-declaration-binding-experiment-20260911/d0.mjs > /tmp/r3-d0-results.json
```

The node command requires the design source pin in local git object history.
`run_suite.py` runs normal and optimized workers, checks exact test-result equality,
and runs twelve isolated admission/resource probes. `RESULTS.json` preserves this
run. Timings, process peaks, executable paths and platform fields vary by host;
labels, decisions, input hashes and sizes should match. Reproduction writes only
the specified temporary outputs, not committed results. `test_integrity.py` uses
an isolated temporary copy, modifies/restores dependencies there and removes it.

Do not run `pin_inputs.mjs` as validation: it is author-only pin regeneration and
would accept deliberately changed dependencies into a new manifest. Validate the
pinned hashes instead. Source copies in `INPUTS.json` were matched against their
source commits and `SHA256SUMS` covers this packet. Formatting, Markdown lint,
repository validation and whitespace checks are recorded with the draft PR.
No full authoritative suite is claimed for this additions-only draft change.
