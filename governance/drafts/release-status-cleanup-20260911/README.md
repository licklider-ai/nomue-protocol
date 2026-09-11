# Release status and predecessor PR cleanup

Informative maintenance round authorized by the repository owner on 2026-09-11.
Checked main: `a2281924b9a2912f8cf52d396fe348b807a380d3` (through PR #328).
Accountable role: repository contributor coordinating the cleanup with OpenAI
Codex assistance in the continuing context. This is a preservation and status
check, not a new independent scientific review or a formal release decision.

## Disposition

PR-DISPOSITIONS.json pins all 52 observed open PR heads and their individual
closure reasons. Forty-four exact heads are already main ancestors. Four opening
review reports and PR #182's unique self-review are exact blobs in main; PR #215
has no additional tree delta; PR #174 is superseded by the corrected #265 record.
The one unactivated tooling proposal, #209, has documented false denials and is
replaced as the current approach by #328. Its old hook is not activated.

The prior [asset integration audit](../research-asset-integration-20260911/README.md)
records why older conflicting revisions are not drop-in changes. This round closes
the old delivery PRs with an appended disposition and retains their branches,
commits, discussion and existing body text. Closing a predecessor PR is not a new
merge, an approval of its historical contents, or closure of a research hold.

Each head is checked again immediately before updating its PR. A changed head is
left open for reassessment. CLOSURE-RESULTS.json records actual returned outcomes;
a planned row alone is not proof that a PR was closed. The three public RFC issues (#25, #274 and #261) remain open and retain their
original minimum windows.

## Completed delivery cleanup

All 52 predecessor PRs were closed after rechecking their pinned heads.
CLOSURE-RESULTS.json records each returned closure timestamp and disposition.
The observed remaining open PR was this cleanup PR (#329); the three RFC issues
were still open. No branch was deleted, and every original PR body was retained
before appending its closure explanation.

## Validation correction

Standard CI run 34647488522 on `f65a177e53e531bad00c1ea26d3f1fb741af096f`
correctly rejected a navigation insertion into the hash-pinned R2 steward
ratification package (one source-binding test failed on each Linux x64 job).
That insertion was removed, restoring the exact baseline document. Its current
status remains available through the new release-status page and candidate
READMEs. No snapshot hash or test expectation was changed.

## Current navigation

[Release status](../RELEASE-STATUS.md) gives one current R2/R3/R4 view and explicit
next work. The candidate and preparation READMEs link to it. Existing fixed
JSON checkpoints, reviews, numerical code, tables, schemas, registry entries,
conformance expectations and raw CI evidence are not rewritten to make them look
new. Where a historical file still says pending, the current view names its later
receipt and distinguishes review-readiness from final adoption.

The R3 human/Claude joint-review clarification for #318–#325 remains as recorded
in #328. No new human review of this maintenance round is asserted.
