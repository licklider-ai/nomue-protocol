# Power-scale review repair

Status: author-side repair, not independent closure or steward acceptance.
Input: `431ac4e6e59d880eca3df07219783d622ce11e31`.
Returned review: `4137e4902d8460e059b3d60e31fa45905a8df5fb`, preserved
[verbatim](../../../review-inputs/r4-power-scale-exploration/REVIEW-RESULT.md)
with blob `830b5816439ecb226d8a36df2b02aa13650ac0dd`.

| Finding | Repair                                                                                                                                                                                       |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SF-1    | Add a separate successor script/transcript with transformed exact F, both projections and exact relative change; describe the tiny mixed-case change without implying material target damage |
| SF-2    | Explain finite QR output against infinite target projections and the spurious residual mechanism; record direct projection agreement only for these rows                                     |
| N-1     | Explain conditional scaling equivariance; retain the operation-path and implementation limits rather than assert a universal BLAS theorem                                                    |
| N-2     | Mark undefined F preservation null in the successor; exclude those rows from the invariance assertion                                                                                        |
| N-3     | State F-only recovery and the normalized SS/SSE scale factor                                                                                                                                 |

The review's Section 4 says transformed exact SS is 1/8 exactly. Author-side
exact recomputation finds all three differ from 1/8; each projects to 1/8.
Its relative-change powers are also magnitude approximations, not exact
equalities. These qualifications preserve the review text and bounded verdict.
Section 5's fourth distinct CPython patch-level count is unsupported by the
listed reproductions: the documented distinct levels are 3.12.3, 3.12.13 and
3.12.14; another execution on 3.12.3 is not a fourth distinct patch level.

Validation: execute the successor, compare every historical row field except
the explicitly corrected undefined-F applicability, check original corpus digest
and source hashes, and run repository formatting/lint/typecheck/validation.
No original script/result or historical review is rewritten. This repair reuses
the author exact routine; it does not claim independent numerical evidence.

For independent close review, pin the successor head, parent and changed blobs.
Reconstruct the added exact values and projections without submitted routines,
check the relative-change magnitude and SS qualification, inspect the QR residual
explanation, compare all original fields, and adjudicate SF-1/SF-2 separately.
Verify N-1's conditional scope rather than infer library-wide equivariance.
Return a review-only draft PR with input identity and bounded disposition; no
merge, scaling adoption, source closure or public-opening decision is requested.

Repair assistance: OpenAI Codex in the existing authoring context, 2026-09-09.
