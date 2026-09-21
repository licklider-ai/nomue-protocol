# Contribution-instruction withdrawal — 2026-09-21

The steward directed removal of the publication-boundary and
implementation-ownership section from [AGENTS.md](../AGENTS.md). Publication
selection is operated as steward direction and is not maintained as public
contribution instruction. This is operating maintenance. No license, Protocol
semantics, review requirement, signed release, supported bundle, numerical
expectation, tolerance or public-discussion window is changed.

The repository-ownership facts a contributor needs are unchanged and remain
documented where the affected files live:
[reference/AGENTS.md](../reference/AGENTS.md),
[reference/README.md](../reference/README.md) and [README.md](../README.md).

## Why the pin is advanced here

Commit `0a64c90dec7c56e416da26b81d1aed6e77086ffc` withdrew an earlier AGENTS.md
revision and recorded the condition for any future one: a contributor editing its
own governing instructions and then re-pinning them to match would defeat the
control, so a pin may be advanced only by a steward-approved instruction
transition, with the pin advanced in the same change set.

That condition is met here. The instruction change is steward-directed, the
approval is recorded in this file, and the pin advance is the execution of that
approval rather than a contributor's self-approval. The guard's structural
assertion is preserved rather than relaxed.

## Instruction pin transition

The same two R3 historical-source checks continue to pin AGENTS.md. The
historical instructions remain an exact prefix; only the approved suffix changes.

- Historical AGENTS.md SHA-256, unchanged as an inventory pin and as the required
  prefix: `059d84ddbd634f42178810a53d9db1e9886a8a07ae15d5269b6090191dca68ed`.
- Superseded approved SHA-256, recorded on 2026-09-14:
  `7cbc579ef13cd2845fba79c1e74a5eb0655719956f11d51ce20a17b09d1715a5`.
- Current approved AGENTS.md SHA-256:
  `fe5d646f77ce290e2f7555102c8850a8548e07ef00a1c430d1184127bfe669a4`.
- The approved-append boundary moves from the removed section heading to
  `## Requesting adversarial review`. The bytes before it must still reconstruct
  the historical SHA-256 exactly, so the guard's guarantee is unchanged: the old
  instructions cannot be edited, and only the approved suffix may differ.
- The shared checker
  [tooling/maintenance/pinned-contribution-source.mjs](../tooling/maintenance/pinned-contribution-source.mjs)
  moves from SHA-256
  `7d745abad717f7ff52eb86e3a9e4614a0421886fd06e25e8ca830364948d57ec` to
  `5dfe10d230bda0e8c0c244c67c726005fe5b8365e8635098ab64c19572e21d2c`. Its
  regression tests still reject old-body edits, suffix edits or removal, unknown
  pins and changes to unrelated source; no wildcard, ignored-file class or runtime
  exemption is added.
- The maintained-control digest for that checker is updated in the evidence
  packet's `TRANSITION.json`. The updated digest describes the current checker. It
  is not a rerun, a replacement of historical evidence, or a change to any
  historical pin, archived output or review conclusion.

## Non-claims

Removing text from the default branch does not remove it from repository history,
from existing commits, or from any published release artifact, and it does not
restore secrecy over already public material. Passing the checks above establishes
the preserved inputs and the declared instruction transition. It does not extend an
earlier independent review to a new scientific candidate, and it grants no research,
adoption or release approval.

## Process record

- Accountable roles: steward direction for the instruction change and the pin
  advance; contributor execution and validation.
- Prepared and validated in an automated contributor session under that direction.
  The review of this change set is author self-review, not independent clearance,
  and it carries no Research Gate meaning.
- Inspected sources: `AGENTS.md`, the shared checker and its regression tests, the
  2026-09-14 continuity record, the R3 adoption-map inputs, the evidence-repair
  packet and the workflows that run them.
- Validation environment: Node.js v22.22.2 with pnpm 11.7.0 and Python 3.12.
  `pnpm check` is green, the checker's regression tests pass, and the R3 source
  generation and archive checks pass. The adoption-map replay pins Node.js
  v24.19.0 in its recorded snapshot and therefore cannot execute on this local
  runtime; it runs on the pinned version in continuous integration, which is where
  this change set is confirmed. The same replay fails identically on an unchanged
  checkout of this repository at that local runtime, so the mismatch is the
  environment and not this change.
