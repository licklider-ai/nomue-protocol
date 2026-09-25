# Release 5 paused-work recovery and handoff

Status: preservation record, 2026-09-17 UTC. No new design or gate decision.
This handoff is sufficient to resume without access to prior chat memory, local
worktrees, temporary authoring scripts or a cached dependency installation.

## Durable location and fixed checkpoint

- Repository: [licklider-ai/nomue-protocol](https://github.com/licklider-ai/nomue-protocol).
- Draft PR: [#349](https://github.com/licklider-ai/nomue-protocol/pull/349).
- Former remote branch: `preparation/r5-projection-inventory` (retired after
  its head became reachable from `main`).
- Public discussion: [#346](https://github.com/licklider-ai/nomue-protocol/issues/346).
- Completed work checkpoint: `2599375d876bd09b09be33e2f99da9fbc6dec40a`.
- Checkpoint tree: `d588603722e10a39e2a22539053164b47c3f2321`.
- Observed main baseline: `a24958e1107cc75ecf189eb0176691357812a6ba`.
- All 12 GitHub CI checks passed at the completed work checkpoint. This is
  repository validation, not executed R5 conformance evidence.

This handoff and its checksum manifest are an additive commit after that checkpoint.
Use the commit containing this handoff as the recovery pin. The manifest describes
unchanged checkpoint bytes and deliberately excludes itself and this new handoff.
Compare a newer PR head with the recovery pin before continuing; do not overwrite
intervening work or silently retarget a retained review.

## Recover and verify

Clone the public repository into a new directory and check out the exact recovery
commit `2599375d876bd09b09be33e2f99da9fbc6dec40a` in a task-named work branch.
No PR branch fetch or prior scratch path is required. From the repository root run:

```sh
sha256sum -c governance/drafts/release-5-preparation/projection-inventory-20260917/preservation-sha256.txt
node governance/drafts/release-5-preparation/projection-inventory-20260917/check.mjs
```

The first command verifies this preservation checkpoint; later intentional edits
will naturally differ and need a new explicit checkpoint, not silent checksum
replacement. The second requires Node.js (the repository specifies Node >=20),
uses only built-in modules and needs no package installation. Expected output:
`source_inventory_consistent`, 12 sources, 24 cells, 36 fragments,
`semantic_mapping_validation: not_performed`, `r5_support: not_issued`.

For actual subsequent repository edits, read `AGENTS.md` and its required governance
sources, then use the pinned package manager from `package.json` and dependencies
from `pnpm-lock.yaml`. Full validation uses `pnpm check`. Do not reuse a transient
absolute formatter path from a previous session. Historical replay commands and
conditions are already recorded in the case specifications.

All modified/untracked files in the four earlier R5 worktrees were checked against
objects reachable from the checkpoint: their contents are preserved in its Git
history. The current bounded-work tree was clean and matched the remote checkpoint.
One-off text-editing helpers are not recovery dependencies: their complete outputs
are committed. The reusable inventory verifier is the committed `check.mjs`;
there is no uncommitted R5 projector, runtime or executable 37-case suite to recover.

## Reading order and completed scope

1. [Packet README](README.md), [live readiness](../public-discussion-readiness.md)
   and [opening RFC](../opening-rfc-candidate.md).
2. [Independent research addendum](independent-research-addendum.md) and
   [research intake](research-intake.md): six of eight named full texts inspected,
   two unread-source holds plus three raw-artifact limitations.
3. [Conditional mapping draft](conditional-mapping-draft.md),
   [Record/report draft](record-and-report-draft.md) and
   [decision binding](decision-binding-proposal.md): 24 family/fact cells;
   one proposed timing status per existing covered analysis; qualified mapping
   reference from check identity, local table key and check version.
4. [Case specifications](case-specifications.md): exactly 37 planned labels,
   with construction, expected boundary, evidence and prerequisites. They are
   not executed tests. Original tables remain in [verification cases](verification-cases.md)
   and [report follow-up](report-surface-followup.md).
5. [Independent diff review](bounded-design-diff-review.md): initial two should-fix
   findings and one improvement, all confirmed repaired. Reviewed design commit
   `cfb72958b74ae6a1b35261c68eace19e720efd81`; repair commit
   `c38dd69efbdd07adb924fe72eed23096175cc09a`. This separate-context design
   review is not another primary-source investigation or owner acceptance.

The checksum manifest covers preparation files, pinned external-to-packet repository
inputs and restoration metadata. Git history retains earlier revisions as well.
The independent research report SHA-256 is
`73aa96f111f51f4276e788879dad3d789eee5fe0612ee81561216778c10ad177`;
the final bounded diff-review report SHA-256 is
`1278f547f5c49124b784a32eda557a4a77e2b0fff9bef5be772fa46c6a6497a1`.

## Why work is paused

The user authorized only the bounded timing/reference/case preparation and its
independent review while acquiring five papers. That work is complete. Do not
resume implementation merely because the informative PR passes CI or a PDF arrives.
R5-P2 is PARTIAL; P3/P5/P6 OPEN; P7 PROVISIONAL. P1/P4 retain PREPARED opening
status and P8 is closed for opening only. No R5 supported bundle or normative
identifier is issued; family participation depends on accepted successors.
The exact schema/reason-code choices and owner acceptance remain unresolved.

The [primary-source completion request](primary-source-completion-request.md)
is the research commission. Priority 1 is full-text inspection of Zimmerman 1997
(DOI `10.3102/10769986022003349`) and Zimmerman 2004
(DOI `10.1348/000711004849222`). Priority 2 is reproducible raw copies/version
checks for Lazic 2010 (`10.1186/1471-2202-11-5`), Rasch et al. 2011
(`10.1007/s00362-009-0224-x`) and Nosek et al. 2018
(`10.1073/pnas.1708274114`). Research Gate is an internal evidence-review gate;
a ResearchGate website account or academic affiliation is not required.

## Next action when the user resumes

Verify the fixed checkpoint and current PR state first. If new source files or a
researcher's report are supplied, identify exact editions, URLs, dates, byte hashes
and inspected passages; distinguish acquisition from substantive review. Follow
the commissioned questions and the repository's independent primary-source review
requirement, reconcile findings claim by claim, and keep unavailable items open.
Do not overwrite prior research reports. Preserve copyrighted source files through
an appropriate private durable channel, not in the public repository.

Prepare only the changes supported by the findings and the user's renewed scope.
If no new evidence or instruction changes a prerequisite, report that the work
remains paused. Do not silently narrow the public claim, change timing's dataset-wide
meaning, close a gate, freeze specifications, implement, merge, mint IDs or start
another discussion clock. The public discussion's actual current state must be
checked when a later decision depends on it.

Prepared with OpenAI Codex assistance in the continuing coordinator context.
Preservation and recovery verification do not constitute additional design approval.
