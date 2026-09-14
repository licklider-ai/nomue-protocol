# Validation record

## Exact execution evidence

Source: `a6cddeba659ae2c52e6a7901d3e5a41102080274`.
[GitHub Linux run 34830324114](https://github.com/licklider-ai/nomue-protocol/actions/runs/34830324114)
completed successfully on 2026-09-14.

- 338 actual invocations: Small 16, Medium 306, Large 16. Every planned assertion
  passed, including expected numerical mismatches and candidate/refusal gates.
- Medium includes all 128 immutable G5 raw Records in both modes, one extra normal
  padded representation in both modes, and 24 negative/control inputs in both modes.
- Parent optimization is observed as 0/1 in 330 returned parent receipts. Eight
  outer-killed cases have no returned flag; none is fabricated. Successful research
  workers report their own expected 0/1 flag. The old production worker is unchanged.
- Normal/optimized saved measurement checkers validate all 338 rows, independent
  target vectors, source/case/report hashes, actual failure causes, process ownership,
  input/output caps, cgroup limits and empty/gone post-cleanup membership.
- Seven controlled final-delivery receipt assertions pass in each mode. This
  separate control does not claim an actual unkillable-kernel failure was induced.

## Local archive verification

Windows CPython 3.12.10 verifies saved generated evidence, not Linux resource
execution. The following succeed on the final formatted artifact:

```sh
python -B governance/drafts/release-4-preparation/t04-ec3-ec4-evidence-20260914/verify_measurements.py
python -O -B governance/drafts/release-4-preparation/t04-ec3-ec4-evidence-20260914/verify_measurements.py
python -B governance/drafts/release-4-preparation/t04-ec3-ec4-evidence-20260914/check_failure_delivery.py
python -O -B governance/drafts/release-4-preparation/t04-ec3-ec4-evidence-20260914/check_failure_delivery.py
pnpm validate
pnpm lint:markdown
git diff --check
```

Prettier checks cover every added Markdown/JSON/TypeScript file and the workflow.
Python sources are syntax-checked; their behavior is exercised in Linux CI.
Formatting a captured JSON document changes its archive bytes, not parsed
measurement values. Original capture hashes and final archive hashes are separate.
The generated `MEASUREMENTS.jsonl` remains byte-preserved.

## Preservation and independence

The outgoing diff is confined to the new EC3/EC4 research directory and measurement
workflow. All 11 historical runtime hashes match, and opening RFC/historical
research/review files remain unchanged relative to their fixed inputs. Main still
resolves to `3880db43a64e1758494f3c78f6850daab0e3e9e9` at handoff verification.

Documentation/capture commits after the measured source do not relabel old tests
as tests of changed runtime: the measured source SHA, exported source hashes and
new final artifact hashes are explicit. No independent review is performed here.
One subsequent combined T04 Independent Close Review remains required.
