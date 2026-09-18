# Independent design checkpoint commission

Status: awaiting an independent reviewer; no verdict is supplied by the author.
Purpose: decide whether this output-design packet is coherent and sufficiently
specified to guide an unissued successor. Do not review it as a tested candidate,
formal decision packet, source-theorem proof or permission to publish.

## Fixed target and inputs

The delivery PR supplies the exact target commit. Before review, record its full
head, parent(s), tree, merge base and changed-file list. Do not review a moving
branch name alone. Base is `0c7a685a1ea6b2b2d0dbe8966c572be95b82755a`.
Read AGENTS.md and its required authority inputs, this packet's four companion
documents, and the fixed PR #330 inputs linked by README.md. Compare the proposed
graph with candidate.4 rather than attributing the new behavior to old receipts.

The strongest failure questions are:

1. Does Record-local conformance really avoid dependence on supplied context and
   digest agreement, without generating self-derived expected context, trusting
   unadmitted data, weakening resources or broadening arithmetic guarantees?
2. Is each schema/storage/context failure representable truthfully? Look hardest
   at schema-invalid inputs, missing references, recomputed digest ownership,
   malformed expected context, and resource failure after provisional passes.
3. Are schema and storage meaningful separately scoped results, with a complete
   dependency/error/not_run policy and no fabricated pass, identity or outcome?
4. Does the 36-case matrix expose the changed behavior, impossible outputs and
   legacy drift? Identify missing high-impact combinations, not just counts.
5. Are prior numerical/source/host reviews reused only in their actual scope,
   and are RFC/authority/shared-verifier joins still substantive open work?

## Required return

Return `GO_FOR_UNISSUED_IMPLEMENTATION`, `REPAIR_REQUIRED`, or `BLOCKED`, explicitly
not adoption/release GO. Give BLOCKER/MAJOR/MINOR findings with exact locations,
failure scenario, minimal correction and closure check. Also record useful
nonblocking observations separately; do not turn every future engineering task
into a defect in this design checkpoint.

Disclose author/repair involvement, human/model assistance and context limits,
source access, commands/environment actually used, hashes inspected, and all
NOT_RUN items. A reviewer who helped author these dispositions cannot certify
independence for that scope. No fresh primary-source/PDF review is requested for
unchanged numerical claims; reopen only an actually affected claim.

Preserve a new reviewer-authored fixed-head record, preferably under
`review-inputs/r3-holm-design-decision-20260918/`, with its own commit/branch or PR.
Do not edit historical receipts or refresh candidate pins. A GO closes only this
design checkpoint. Changed implementation, integrated execution and final
governance decisions each still need their applicable evidence/disposition.

## Author preflight

The author must check the outgoing diff is informative-only, local links resolve,
all 36 locators are unique, current authority references are accurate, and the
fixed evidence is not overclaimed. Run formatting, Markdown lint and repository
validation; record actual commands/results in the delivery PR. These checks are
not independent clearance. Preserve the PR head before asking for review and
pause dependent implementation at this checkpoint under AGENTS.md.
