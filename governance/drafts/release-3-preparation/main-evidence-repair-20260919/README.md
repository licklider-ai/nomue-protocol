# R3 evidence generations after PR #358

## Decision and scope

On 2026-09-19 UTC, the user approved the additional A/B repair scope proposed in
[the dependency investigation](../main-drift-decision-20260919/README.md): retain
historical evidence unchanged, verify its fixed inputs, and separately verify
current inputs and current execution. This supersedes that investigation's pause
for A/B only. C (instruction revision) and D (new aggregate gate) remain proposals.

Inspected main is `9c597d42e1c22ca908f3f7e1485d88378c049ae7`. The author-context
historical CI integration record concerns `634abfa0bc4055c7615df433b5942d412fb49747`.
Its scope is not independent Research Gate clearance. No independent R3 reviewer
receipt was found directly pinning the active repaired snapshot, but the CI
record pins it transitively through the adoption-map inventory. That dependency
is preserved, not advanced as though the old run tested the new corpus.

Process disclosure: the accountable contributor used OpenAI Codex to investigate,
implement and self-review this repair, using public repository sources. This is
author-side engineering verification, not independent numerical review, adoption,
D1 completion, release approval or a change to an RFC discussion window.

## Changes and rationale

- The active adoption-map inventory advances eight changed inputs, includes the
  two new df=1 fixtures and updates the repaired snapshot's resulting hash. Its
  declared source count grows from 422 to 424. The AGENTS and self-checker pins
  and their existing exact transition mechanism are unchanged.
- Only the CI-executed repaired candidate snapshot changes: `legacy_fixtures` and
  the `legacy_regression` row's `fixtures` both advance from 132 to 134. The two
  historical checkpoint/envelope snapshots retain 132. No expectation outcome,
  numerical value, runtime pin or candidate algorithm changes.
- The checkpoint workflow runs `check_generations.py` and its mutation tests.
  Current candidate replays, source audit, clean-tree check and artifact upload
  remain. Other workflows are unchanged. This is scoped to the existing R3
  checkpoint workflow; it adds no blocking R3 requirement to `pnpm check`.

[TRANSITION.json](TRANSITION.json) records exact old/new hashes. The three files
under `historical/` are byte copies from the inspected main, not regenerated
results. They preserve the old inventory, candidate snapshot and workflow.

The conformance corpus is an executed dependency, so the inventory refresh is
supported by re-running the candidate tests. The 132 prior manifest rows and six
prior 0.2.1 expectation rows are unchanged; only `A2-1-V-004` and `A2-1-P-005` are
added. The erratum's references remain valid.

## Verification boundary

The new checker first checks the exact current inventory, snapshot and workflow
hashes. It also checks the old copies, binds the old inventory/workflow to the
original CI record, and checks that each generation's snapshot digest and both
fixture counts agree. It then copies the original archive and its external
references into a temporary directory. Only the explicitly recorded old inputs
are restored there; all other archived source checks still use current bytes.

The original `check_evidence.py` runs unchanged in that directory, with all
archive, checksum, member, service/head, source and unsupported-host assertions.
The previously approved AGENTS transition still runs through the unchanged
maintenance guard. No original checksum list, archive, integration receipt,
review receipt or historical checker is edited. Missing or altered inputs fail;
there is no automatic repinning or fallback to successful historical results.

This checks historical evidence integrity, not a new historical execution. New
134-fixture execution remains a separate prerequisite in the existing workflow.
`GENERATION-CHECK.json` is uploaded next to the fresh execution observations so
consumers can distinguish the two generations.

## Reproduction and review

Use the existing Node 24.19.0 / Python 3.12.14 environment and pinned lockfile:

```sh
node --test tooling/maintenance/pinned-contribution-source.test.mjs
NOMUE_EXPERIMENT_PYTHON="$(command -v python3)" node governance/drafts/release-3-preparation/holm-adoption-map-repair-20260911/check.mjs
python3 -I governance/drafts/release-3-preparation/main-evidence-repair-20260919/test_generations.py
python3 -I governance/drafts/release-3-preparation/main-evidence-repair-20260919/check_generations.py
pnpm check
```

The mutation tests alter current inventory/results/workflow, preserved
inventory/results, an otherwise unchanged runtime source, archive member,
checksum list, historical checker, instructions, instruction guard and the
transition set. The unchanged baseline passes; every mutation is rejected.

Local full-suite validation has an environment limitation: `pnpm check` stops
when the `tsx` CLI tries to create an IPC socket (`listen EPERM`). The same
package-defined leaf commands are therefore also run with `node --import tsx`
as the TypeScript launcher. No check, assertion, source or package script is
disabled or edited. The ordinary `pnpm check` invocation still needs hosted CI
confirmation. Actual cgroup execution is likewise left to the unchanged public
candidate workflow, not claimed from local inner tests.

Validation results and self-review dispositions are recorded in
[VALIDATION.md](VALIDATION.md). No new independent clearance is claimed.
