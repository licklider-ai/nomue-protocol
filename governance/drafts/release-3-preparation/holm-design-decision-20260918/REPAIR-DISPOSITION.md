# Design-review repair disposition and close-only handoff

Date: 2026-09-18 UTC. Author/coordinator repair record. The subsequent
[independent confirmation](../../../../review-inputs/r3-holm-design-decision-20260918/REPAIR-CONFIRMATION.md)
closes all six findings at `1eb6b93` with GO_FOR_UNISSUED_IMPLEMENTATION.
The historical request below remains for traceability; D1 may now proceed.
No candidate, numerical source,
registry, schema, fixture, authority assignment or RFC is changed.

## Review custody

The reviewer-authored [result](../../../../review-inputs/r3-holm-design-decision-20260918/REVIEW-RESULT.md)
is imported byte-for-byte from commit
`18c69c2be1760cc6931e9fb57c589c1a6376cc47`, without merging the reviewer's divergent
branch or unrelated R2 work. Its Git blob is
`f8bb84b0a0d9feea418ef77ff0d896bc1ff549d8`; SHA-256 is
`d413389df59b13bd7a4c60f08825a32536e1c928a1cdf655821e5015c34964ad`.

The original reviewed target is `804502addc26d26cec9b6e29c61f54254f5e0a49`,
tree `41c3eea3f05d2bdf6f67648d0a0b9f68d5e76a58`, based on
`0c7a685a1ea6b2b2d0dbe8966c572be95b82755a`. Its REPAIR_REQUIRED verdict and
reported CI/test evidence are historical, not tests of this repair. The original
REVIEW-COMMISSION.md is unchanged; its 36-case count describes that target.

## Finding dispositions

| Finding | Proposed repair                                                                                                                                                                                                                                | Close-only check                                                                                                |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| M-1     | DESIGN defines raw-preserving integrity-excluded P(B), stored-byte reference hash, K-to-I dependency, independent idempotency comparison, and rejection of ingress on K fail; LANDING names all four canonicalization/forwarding clauses       | R3D-14/15 specify I not_run, K blocker and P(B) reference; R3D-44 rejects a reserialization-only success route  |
| M-2     | DESIGN retains blocking-reason propagation, including explicit prerequisite identities, actual codes, transitive/multiple blockers and deterministic union; LANDING retains the main meta-schema constant and identifies report schema impacts | R3D-31/42 reject generic-only/missing/unrelated reasons; no promotion of PR #330's generic-prerequisite preview |
| m-1     | Canonicalization, extraction and digest unavailability always refuse; K has no unavailable-projection report state                                                                                                                             | R3D-43; K not_run on S fail remains distinct from unavailable canonicalization                                  |
| m-2     | R3D-37 through R3D-41 cover schema/resource precedence, K with D/C failures, Record/revision context mismatch, and legacy calls with expected context; R3D-05 pins reference digest ownership                                                  | Confirm all combinations and their report/refusal/no-forward outcomes; legacy extra argument explicitly refuses |
| m-3     | DESIGN maps all twelve candidate.4 refusal kinds; distinguishes expected-only parse/access errors from Record/resource/lifecycle failures                                                                                                      | Map agrees with R3D-16/17/18/32/34/41 and preserves invocation-level refusal selection                          |
| m-4     | LANDING includes NRS-VERIFY-0012 and records that reportable schema failure returns to Phase 1/2A behavior                                                                                                                                     | No blanket CORE-change claim or blanket RFC-window exemption                                                    |

The matrix is now 44 planned cases, not executed evidence. The last three additions
make transitive reason propagation, unavailable projections and the two digest
paths directly reviewable. Numeric expectations and runtime qualification remain
unchanged and are not re-reviewed by this text repair.

## Close-only commission

Use the exact new PR #355 head recorded in its body; record full head, parent(s),
tree, base and file delta before review. Compare with `804502a`, separating the
unaltered review intake from the repair. Confirm the preserved review blob and
original commission are unchanged. Read DESIGN, ACCEPTANCE and LANDING together;
check index/README counts and this disposition only for accurate navigation and
claims. Unchanged scope can rely on the retained initial review.

Focus on the two highest risks: no path that hashes only a reserialized value can
produce I pass or forwarding, and no blocked result can discard the actual reason
for its nonexecution. Check that raw P(B) extraction does not claim a noncanonical
input is canonical, and that reference hashes in failure reports are not digest
agreement verdicts. The raw-preserving extractor is a successor obligation, not
an assertion about candidate.4's narrower helper.

Return GO_FOR_UNISSUED_IMPLEMENTATION, REPAIR_REQUIRED or BLOCKED with each of the
six findings explicitly closed or still open. Disclose continuing reviewer
context, inspections and NOT_RUN items. No new source-theorem, candidate runtime,
actual-host or whole-release review is requested. Preserve a new fixed-head
REPAIR-CONFIRMATION.md beside the original review; do not overwrite it.

## Validation and remaining boundaries

Author checks cover formatting, Markdown lint, repository validation, diff scope,
review-byte identity, unchanged original commission, local links and the 44 unique
case locators. Actual results and the validated tree are recorded in the PR body.
These are author checks with OpenAI Codex assistance, not independent clearance.

The pre-existing RFC introduction/opening-record mismatch remains outside this
repair. PR #354's concurrent RELEASE-STATUS edits require reconciliation when
either branch is integrated; no unrelated release status or adoption decision is
imported here. A design confirmation permits the next unissued engineering step,
not merge, support activation, adoption, RFC-window action or publication.
