# D0 completion and D1 engineering handoff

Date: 2026-09-18 UTC. D0 design checkpoint complete; D1 engineering permitted.
This record is contributor intake, not a new review or formal adoption decision.

The reviewer-authored REPAIR-CONFIRMATION.md is retained without changes from
commit `6410025cb56631a63c311e4aa213890e02f4d0be`, Git blob
`47739e97439e60027221023cb6c54d6e5aabcae8`, SHA-256
`fd0a05188e3a02338f65bac778b86a17f1b4df4b6f19982cf35bdf37e1c16076`.
Its reviewed target is `1eb6b931d7e20466bb8d3c364965545362efb2f0`, tree
`a5f8e21095f396c04819ae33a80e10b5bdd7888a`. The reviewer closes two MAJOR and four
MINOR findings, permitting only unissued implementation. Prior review and
commission bytes remain unchanged. No unrelated branch history is merged.

The only design-text correction at intake is editorial E-1: K's table prerequisite
is now simply S passes. Projection unavailability still refuses as specified in
the reviewed prose and R3D-43. No new behavior or expanded claim is introduced.

## D1 continuation

The first implemented component checkpoint is saved in
[nomue-verifier PR #20](https://github.com/licklider-ai/nomue-verifier/pull/20),
head `a82997073b17277f85d524f61efb7bc9249192a5`, tree
`0695e9b67995710cd365fec944c0443c17b65107`, based on
`940b8fb6990632029bcebd2ebdf6ce9dca8e9244`.
Its [handoff and review request](https://github.com/licklider-ai/nomue-verifier/blob/a82997073b17277f85d524f61efb7bc9249192a5/development/r3-holm/HANDOFF.md)
cover raw-preserving projection and dependency/reason propagation. Author checks
passed 36 component tests (including 192 graph combinations and 15 output
mutations), strict TypeScript checking, existing npm tests and actual package
smoke/exclusion checks on Node 24.19.0 / Linux x64. Hosted CI and independent
implementation review are separate. D1 overall and all 44 full-call cases remain
open; no package runtime or Protocol source pin is advanced.

Develop in the public nomue-verifier repository, outside its npm runtime and
supported dispatch until the coordinated adoption/integration permits promotion.
Start with the two newly reviewed foundations: raw-preserving stored-byte
projection and explicit seven-result dependency/reason propagation. Test these
directly with independently specified byte vectors and crossed graph states before
connecting schema admission, D0/Holm validators, caller input and execution controls.

This sequencing does not declare D1 complete or narrow its acceptance matrix.
Maintain a case-to-test map distinguishing component evidence from full-call
evidence. None of the 44 planned full-call cases becomes passing merely because
a helper test passes. A tested component checkpoint can receive a bounded code
review while the full candidate, schemas, fixtures, real-host evidence and
conformance/dispatcher/output-protocol join remain explicitly unfinished.

Keep Protocol candidate.4 and all original numerical/evidence bytes intact. Do not
relabel historical test runs as successor evidence or update SOURCE-PIN merely
because a development branch exists. The next implementation handoff must include
exact Verifier commit/tree, changed files, actual commands/results, self-review,
remaining cases and an independent review request for the completed code scope.

No merge, supported capability, permanent identifier, RFC-window change or release
is authorized by this intake. Prepared with OpenAI Codex assistance in the existing
author/coordinator context; the independent confirmation retains its own disclosure.
