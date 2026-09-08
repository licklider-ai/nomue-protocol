# Independent review: Release 4 QR and cancellation supplement

Review licklider-ai/nomue-protocol in a fresh context, independently of the author.
Use a separate model from the OpenAI-assisted author as required by governance/RFC.md;
record the actual human/assistance roles, model/provider if used, and independence
boundary. Do not invent authorship or independence. If the required independence
cannot be established, report that limitation before issuing an independent verdict.

## Fixed input

- Input commit: `014824e482d0dccac696053176f834b0f5e45fb6`.
- Parent: `f39100161cb45de15767bdb19ed54aba9489b41a`.
- Input tree: `d14fe1c07174ad5380b7de68f73acd63e859c9aa`.
- Sole changed file: `governance/drafts/release-4-preparation/qr-cancellation-supplement.md`.
- File blob: `94cb0e0b86df2451b531660b913f8dd504f1ffed`.
- Expected computed corpus SHA-256 in the author's environment:
  `2371c1ef31a25816e09d08324718dd87329c5b6aa93076fd17ae772373fff55c`.

Read AGENTS.md and its ordered governance prerequisites. Verify these Git identities
and the sole-file delta before evaluating content. Read the preparation README and
numerical commission as context; this supplement does not replace the commissioned
report or claim a programme disposition. Inspect the exact prior PR 181, 184, and
190 commits pinned in the supplement where needed to verify its claimed gap.

## Review work

1. Directly inspect the cited NIST and LAPACK documentation. Distinguish official
   explanatory documentation from original methodological sources. If source access
   fails, record SOURCE_ACCESS_INCOMPLETE without substituting snippets or memory.
2. Independently derive the four-cell contrast coefficients, sign conventions,
   interaction scaling, residual degrees of freedom, and sums-of-squares partition.
   Check the NIST-to-coded-design mapping and what it does not prove.
3. Extract and execute the embedded Python fence. Record Python, NumPy, operating
   system, architecture, BLAS/LAPACK build and thread settings. Verify 945 cases,
   counts, errors, both witnesses, and the corpus digest. Explain environment-dependent
   floating differences rather than requiring this hash on an unrelated build.
4. Write a reviewer-owned exact oracle using a different algebraic arrangement.
   Cross-check all effect coefficients and residual/effect sums of squares on admitted
   binary64 inputs. Do not use the author's function or the Protocol kernel as truth.
5. Challenge the distinction between intended rational coefficients, binary64 input
   projection, and subsequent arithmetic. Test zero coefficients and tiny nonzero
   coefficients, factor reversal/exchange, and an observation permutation. Check that
   the centered route introduces no unstated exact-subtraction assumption.
6. Check that nonzero-error counts and largest absolute errors concern the selected
   axis only, are not statistical decisions or portable tolerances, and do not rank
   methods universally. Inspect whether the false-nonzero label or explanatory text
   overstates the numerical finding. A small normwise residual does not certify an
   individual near-zero coefficient.
7. Check that generic QR is actually executed, not mislabeled SVD or DGELS, and that
   the work neither closes unbalanced two-system semantic comparison nor selects a
   production graph. Identify remaining squared-effect/F projection gaps explicitly.
8. Confirm no Release 3 artifact, numbering, authoritative file, source hold,
   supported-execution boundary, tolerance, registered identity, or gate changes.
9. Run Markdown formatting/lint, typecheck, and direct repository validation on the
   fixed input and after adding the report. If tsx CLI IPC is denied, invoke the same
   validator with `node --import tsx tooling/src/validate.ts`; disclose the distinction.

## Output and decision

Create only `review-inputs/r4-qr-cancellation-supplement/REVIEW-RESULT.md` on a new
`review/r4-qr-cancellation-supplement` branch based on the fixed input commit.
Preserve the input report unchanged. Include identity, source access, independent
oracle method, reproduction transcript/digests, findings with exact locations and
repair/reopen conditions, validation, and provenance. Label findings BLOCKER,
SHOULD-FIX, or NICE-TO-HAVE. Distinguish content verdict GO/NO-GO from source-access
and independence status; a GO here is only for this bounded research supplement.

If an input identity is unavailable or mismatched, report INPUT_INCOMPLETE and stop
before numerical conclusions. Open a draft PR if repository write access is available;
otherwise return the full review file. Do not merge, ratify, issue identifiers, adopt
an algorithm, open public discussion, or publish website claims. Return the PR link,
reviewed exact head, verdict, finding counts, and remaining actions.
