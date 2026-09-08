# Close review: factorial summation description and source access

Review licklider-ai/nomue-protocol in a context independent of the OpenAI-assisted
author. Follow AGENTS.md and its ordered governance prerequisites, including the
separate-model requirement for numerical review. Disclose actual reviewer roles,
assistance, and independence without inventing human-investigator independence.

## Fixed input

- Repair input: `0be8bb1519d7aec2810b03192de6590ec9168c60`.
- Sole parent: `42eb498473bdf6d318ac9f1180f71b08cc2e3422`.
- Input tree: `df0e656467e66ec13b7a44016e6dbb45fcf4ae80`.
- Only changed path against parent:
  `governance/drafts/release-4-preparation/qr-cancellation-supplement.md`.
- Repaired report blob: `007d689e2c44f50df6242137348add66c5019cc8`.
- Predecessor numerical input: `014824e482d0dccac696053176f834b0f5e45fb6`.
- Prior review: commit `253fe14b801b861a23714e7491b6bb9e19951b2f`, file
  `review-inputs/r4-qr-cancellation-supplement/REVIEW-RESULT.md`, blob
  `5c6f30630f3daee80c59210e892398b53d4cd660` (PR 208).
- Unchanged Python fence SHA-256:
  `50a014324de141b32c284c5e5cbcc3cca9ea825ab6f8c7fe9e76d320b7c1bbfe`.
- Original corpus SHA-256 in the disclosed author environment:
  `2371c1ef31a25816e09d08324718dd87329c5b6aa93076fd17ae772373fff55c`.

The containing PR may add this prompt after the input commit. Review the pinned
input rather than substituting a moving branch tip. Stop with INPUT_INCOMPLETE if
identity differs or input is missing. Preserve the original review and supplement.

## Bounded checks

1. Confirm only prose changed, the Python fence is byte-identical, and the original
   counts, errors, and witnesses are preserved. Re-execute the 945-case probe under
   CPython 3.12 and document exact versions; do not turn one matching environment
   into a portable requirement.
2. Close or retain SF-1: check the builtin-sum label, both float summation sites,
   compensated behavior on the disclosed CPython 3.12, and interpreter-dependent
   direct row. Inspect official Python 3.12 documentation and, where necessary,
   CPython implementation. No naive-loop interpretation or promise for every future
   Python version is justified.
3. Inspect N-1 through N-7's new recording against PR 208 Sections 6–8. Check route
   names, selected versus non-selected axes, approximate magnitudes, 135-case/1,440-
   observation centering count, no floating SS/MS/F/tails, head distinction, and
   transformation counts. Inspect NumPy QR and solve docs for Householder QR and
   general gesv solve; do not infer actual implementation solely from disagreement
   with SVD output. Keep the naive-loop direct diagnostics separate from builtin sum.
4. Check that observed thread-run agreement is not promoted to a general threading
   threshold or a statement that execution controls are unnecessary. Check that
   reviewer observations are attributed and not presented as new author experiments.
5. Independently complete the prior source-access work if possible:
   - <https://itl.nist.gov/div898/handbook/prc/section4/prc437.htm>
   - <https://www.netlib.org/lapack/lug/node27.html>
     Record date, acquisition method, exact retrieved content and its hash. Distinguish
     raw HTML from tool-extracted text. Confirm balanced fixed-effects partition and
     N-ab residual degrees of freedom; confirm full-rank QR/LQ versus rank-deficient
     driver families. Author-side inspection is not independent source closure. If
     blocked, report SOURCE_ACCESS_INCOMPLETE without substituting the author's summary.
6. These pages are supporting documentation. Their inspection does not close the
   original factorial-methodology source holds, the S6 unbalanced two-system hold,
   programme INPUT_INCOMPLETE, or authorize any production algorithm or release.
7. Run changed-file Prettier, Markdown lint, typecheck, direct repository validation,
   and diff checks. The equivalent direct validator is
   `node --import tsx tooling/src/validate.ts` if the tsx CLI IPC is blocked.

## Deliverable

Create only `review-inputs/r4-qr-cancellation-supplement-close/REVIEW-RESULT.md`
on `review/r4-qr-cancellation-supplement-close`, starting at the fixed repair
input. If that branch exists, inspect before using it and do not overwrite work.
Return a draft PR targeting `research/r4-qr-cancellation-supplement`, or the full
review file if writes are unavailable. Preserve all prior artifacts. Do not create
additional duplicate branches unless an applicable higher-priority requirement
forces one; disclose any such constraint.

Report exact identity, source access separately from content verdict, SF-1 CLOSED
or OPEN with evidence, individual N-1–N-7 dispositions, regression findings,
validation, and provenance. Limit GO to the corrected supplement; do not merge,
ratify, issue identifiers, open discussion, or update websites. Return the review
PR, reviewed head, findings counts, source status, and remaining actions.
