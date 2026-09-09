# Release 4 editorial preparation review handoff

Read AGENTS.md and its required governance documents first. This is an independent
review of an informative preparation increment. Review numerical correctness in
the separate PR 218 lane rather than treating this editorial pass as its substitute.

Resolve `research/r4-rfc-preparation-draft` once in `licklider-ai/nomue-protocol`.
Record full head, parent, tree and blobs for `rfc-preparation-draft.md`,
`source-followup-2026-09-08.md`, and this file under
`governance/drafts/release-4-preparation/`. The expected parent is PR 218 input
`4cf3e12acc77bd38c09d5acd2588ede66ee265b2`. Verify its five files are unchanged.
If any identity differs, report the difference and do not silently follow a
moving head. Read the pinned readiness document and prior input table.

Check the following:

1. The draft is editorial preparation and does not promote unreviewed semantic or
   numerical results into an RFC decision. Test this against the research
   commission's independent-review requirement, not just the draft's disclaimer.
2. Proposed authority owners, eventual artifact changes, stability-tier treatment,
   migration obligations and decision requested agree with current governance.
   Identify missing exact artifact or Requirement ID mapping that prevents R4-P5
   closure. No ID is allocated by this draft.
3. Candidate scope and staged checks do not silently select intervals, multiplicity,
   algorithm, tolerance, reason code, support domain or Release 3 dependency.
   Verify R4-P1-P6 and S1-S6 have not been waived by changing the definition of done.
4. Source access claims match what was actually obtained. Acquire and inspect the
   original Cochran/Yates sources if available; record exact identities and pages.
   If unavailable, still complete the editorial review and distinguish its verdict
   from incomplete primary-source work. Preserve completed provided-copy acceptance.
5. Record which questions can remain public discussion topics and which require
   resolution before opening. Do not claim the full Release 4 RFC is ready just
   because this preparation document is coherent.

Create an English report under
`review-inputs/r4-rfc-preparation/REVIEW-RESULT.md` with exact inputs, findings,
source access, bounded verdict, independence disclosure and applicable validation.
Use a neutral review branch and draft PR. Do not merge, ratify, open a public
RFC window or alter Release 3. Human roles and model metadata are recorded only
as supported by evidence; a fresh context and separate model are distinguished
from a claim of independent human investigators.
