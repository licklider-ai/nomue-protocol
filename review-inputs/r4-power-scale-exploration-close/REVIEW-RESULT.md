# Release 4 Power-of-Two Scaling Exploration — Repair Close Review

**Status: informative independent close review; non-normative; not adopted.**

## 1. Verdict

| Dimension                 | Result                                                                                                                                                                        |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Input integrity           | **`MATCH`**: successor head, parent, tree and the five changed blobs; the original script, transcript, README and the returned review blob are unchanged (Section 3)          |
| Successor reproduction    | **`REPRODUCED`**: all twelve rows of the target-detail transcript and every non-environment field are identical on CPython 3.12.3 / NumPy 2.3.5 / OpenBLAS 0.3.30 (Section 5) |
| Added values              | **`CONFIRMED`**: every added field in all twelve rows agrees string-for-string with a reviewer-side exact reconstruction that imports no submitted routine (Section 4)        |
| Original fields           | **`IDENTICAL`** between the two transcripts except the declared change of `exact_f_preserved` to `null` on the two zero-residual rows (Section 5)                             |
| SF-1                      | **`CLOSED`** (Section 6)                                                                                                                                                      |
| SF-2                      | **`CLOSED`** on substance; one factual detail in the repaired explanation is wrong and is returned as C-1 — the same detail was wrong in the returned review (Section 6)      |
| N-1 / N-2 / N-3           | addressed; N-1's conditional scope verified (Section 7)                                                                                                                       |
| Author qualifications     | all three accepted; the returned review's "1/8 exactly", "±2^−1674" and "fourth patch level" statements are corrected here (Section 8)                                        |
| Findings on the successor | 0 `BLOCKER`, 1 `SHOULD-FIX`, 2 `NICE-TO-HAVE` (Section 9)                                                                                                                     |
| Holds and conditions      | unchanged; no scaling adopted; public-opening readiness **`NOT_READY`** (Section 10)                                                                                          |
| Independence              | model, provider and work-context independence from the OpenAI-assisted author; same session as the returned review, disclosed (Section 2)                                     |

The bounded `GO` for the original exploration at `431ac4e6…` stands as recorded. The successor
at `a45590d5…` is a faithful clarification; with C-1 repaired it would carry no open finding.
Nothing here adopts power-of-two scaling, closes a source hold or preparation condition, or
authorizes supported execution, an RFC window, public discussion, a release or a Release 3
change.

## 2. Independence, roles and boundary

- **Commission.** The "For independent close review" paragraph of
  `governance/drafts/release-4-preparation/power-scale-review-repair.md` at the successor head
  (blob `6dbf7112…`): pin head, parent and changed blobs; reconstruct the added exact values and
  projections without submitted routines; check the relative-change magnitude and the SS
  qualification; inspect the QR residual explanation; compare all original fields; adjudicate
  SF-1/SF-2 separately; verify N-1's conditional scope; return a review-only draft PR.
- **Reviewer.** An Anthropic model, `claude-fable-5-1`, in Claude Code remote session
  `session_0161XbYyVUYMC9stxNhpwdUU`; the session service reported `session_context.model` and
  `last_served_model` as `claude-fable-5-1`. This is the session that produced the returned
  review `4137e490…`; a close review by the same session checks the author's repair of its own
  findings and also corrects its own errors (Section 8). It is not a second independent reviewer.
- **Author.** The successor records OpenAI Codex assistance in the existing maintainer context.
- **Assistance.** No other model, service or person contributed. External code executed: the
  submitted `power-scale-target-detail.py` (which executes the unchanged `ss-f-propagation.py`)
  at the successor head, and a reviewer-written script described in Section 4.
- **Not performed.** No source acquisition, purchase, message, merge, RFC action, identifier
  allocation, Release 3 change or steward decision.

## 3. Exact identity and preservation

| Object                                                      | Observed                                                                                                     |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Successor head                                              | `a45590d5baeee2d0e34289be8cd0f5524cb81631`, sole parent `431ac4e6e59d880eca3df07219783d622ce11e31`           |
| Tree                                                        | `839de789da6956e1e4722a5c5b24d50483a5db32`                                                                   |
| `power-scale-exploration.md`                                | blob `5e3dad5cfa8376fbca5725900fd5235780573d63` (changed from `ae1fbedb…`)                                   |
| `power-scale-review-repair.md`                              | blob `6dbf711228e9be121d8346e0ce401e9ecce0b153` (added)                                                      |
| `probes/power-scale-target-detail.py`                       | blob `16bb888d5509f27266d7472887e9c3289eb8d235` (added); SHA-256 `f0624e40…` = recorded `script_sha256`      |
| `probes/power-scale-target-detail-result.json`              | blob `60d25e29d29716201dfa6acf94b41fd312adb589` (added)                                                      |
| `review-inputs/r4-power-scale-exploration/REVIEW-RESULT.md` | blob `830b5816439ecb226d8a36df2b02aa13650ac0dd` (added; identical to review commit `4137e490…`)              |
| `probes/power-scale-exploration.py`, `…-result.json`        | blobs `35d900d3…`, `1fb3c0af…` unchanged                                                                     |
| `probes/ss-f-propagation.py`                                | blob `a3f9a9a4…` unchanged; SHA-256 `8c68703f…` = recorded `source_sha256`                                   |
| `README.md`                                                 | blob `c6411b4e…` unchanged                                                                                   |
| Increment                                                   | five files, 1175 insertions, 7 deletions; nothing outside the preparation directory and the preserved review |

## 4. Independent reconstruction of the added values

A reviewer-written script (SHA-256
`da2be1697807be0742aaa8cffc07623be032c20671a1bf3293310451e12b65a4`, not committed) rebuilt the
six fixtures, the `frexp`/`ldexp` transform and the conversion-loss test in pure Python, and
computed with `fractions.Fraction` the exact F before and after the actual transform, both
binary64 projections, the exact relative change, the post-transform SS and SSE and their
projections, and the `null`-aware preservation flag. Exact values used two routes asserted equal
(level-mean decomposition and coded contrasts; total partition asserted). No submitted function
was imported.

Result: for all twelve rows, the twelve fields `conversion_loss_indices`, `exact_f`,
`exact_f_after_transform`, `exact_f_projection_before`, `exact_f_projection_after`,
`exact_f_relative_change`, `exact_ss_after_transform`, `exact_sse_after_transform`,
`exact_ss_projection_after`, `exact_sse_projection_after`, `exact_f_preserved` and
`exact_sse_positive` are identical to the successor transcript, including the 4981-character and
1101-character F rationals and the 4557-character relative-change rationals of the mixed rows.

Quantities checked for the mixed fixture after scaling by 2^−601 (index 1 lost):

| Quantity                                    | Reviewer value                                                                          |
| ------------------------------------------- | --------------------------------------------------------------------------------------- |
| Exact SS_A − 1/8                            | +2^−602 exactly; SS_A ≠ 1/8; projects to `0x1p-3`                                       |
| Exact SS_B − 1/8                            | −2^−602 exactly; projects to `0x1p-3`                                                   |
| Exact SS_AB − 1/8                           | ≈ −2^−600.19; projects to `0x1p-3`                                                      |
| Exact SSE                                   | 2^−1204 exactly; projects to `0x0p+0`                                                   |
| Exact F before / after, each effect         | both ≈ 2^1203.000000; both project to `+inf`                                            |
| Exact relative change (after−before)/before | signs +, +, −; log2 of magnitude −1674.000000000 to nine decimals; not exactly ±2^−1674 |

The successor's statements "relative F changes are approximately +2^−1674, +2^−1674 and
−2^−1674, not exactly those powers", "both … project to positive infinity", "transformed exact
SSE is 2^−1204 and projects to zero" and "exact SS values differ slightly from 1/8 and each
rounds to 1/8" are all confirmed.

## 5. Successor reproduction and original-field comparison

`python power-scale-target-detail.py` from a copy of the head's `probes/` directory (CPython
3.12.3, NumPy 2.3.5 wheel, scipy-openblas / OpenBLAS 0.3.30, threads not pinned): exit 0; both
assertions pass; `cases` (12 rows), `status`, `numpy`, `original_corpus_sha256`,
`script_sha256`, `source_sha256` and `threading` identical to the pinned transcript; `python`
reports 3.12.3 against the recorded 3.12.14. The historical corpus digest `558b6e65…` reproduced
through the executed original probe.

Comparing every field of the original transcript (`1fb3c0af…`) with the same field in the
successor transcript: all values identical except `exact_f_preserved` on the two
`zero_residual` rows (`true` → `null`), exactly as the repair record declares. The eight added
keys are those listed in Section 4; `numpy_configuration` is identical between the two
transcripts.

## 6. SF-1 and SF-2 adjudication

**SF-1 — `CLOSED`.** The successor transcript records, per row, the post-transform exact F, both
projections, the exact relative change, and post-transform SS/SSE with projections; the report
states that the mixed row "witnesses conversion loss, not a materially different binary64 F
target". Every recorded value is confirmed (Section 4). The original script and transcript are
untouched, which is the right way to add the fields.

**SF-2 — `CLOSED` on substance, with C-1.** The successor explains the finite QR output against
the infinite projections of both targets, gives the 2^1098 gap (reviewer: 1098.09 in log2),
attributes it to spurious positive residual from floating QR as in the zero-residual
diagnostics, says the input-conversion loss did not cause it, and records the `builtin_cell`
projection agreement for the two mixed rows only, without ranking. All of that is confirmed.

One detail is wrong: "SSE `0x1.1p-106`, dominated by rounding residuals at the two 0.5
observations". A reviewer implementation of the QR route on the scaled mixed inputs (which
reproduces the transcript's SS, SSE and F bit-for-bit) gives residuals

| Observation   | Input               | QR residual (hex) | Square       |
| ------------- | ------------------- | ----------------- | ------------ |
| 0, 1 (cell 1) | 0, 0                | `0x1.8p-55` each  | `0x1.2p-109` |
| 2, 3 (cell 2) | 2^−601, 1.5·2^−601  | `0x1p-54` each    | `0x1p-108`   |
| 4, 5 (cell 3) | 2^−600, 1.25·2^−600 | `0x1.8p-55` each  | `0x1.2p-109` |
| 6, 7 (cell 4) | 0.5, 0.5            | `0x0p+0` each     | `0x0p+0`     |

The two `0.5` observations are fitted exactly and contribute nothing; the whole SSE
`17 · 2^−110 = 0x1.1p-106` comes from the six small-magnitude observations, whose fitted values
carry the rounding of coefficients determined at the `0.5` magnitude (each coefficient ≈ 1/8,
rounding ≈ 2^−54 to 2^−55). The mechanism the successor names — rounding at the dominant
magnitude, unrelated to the 2^−1074 input — is right; the location is not. The returned review's
own SF-2 text ("rounding noise at the `0.5` cell") carried the same error, and the successor
repeated it. Repair per C-1.

## 7. N-1, N-2 and N-3

- **N-1 — addressed; conditional scope verified.** The successor states that power-of-two scaling
  commutes with rounding "for suitably scaled elementary operations when the relevant results
  remain in range and the operation path is unchanged", that the fixed-design QR does not depend
  on the response, and that no implementation-wide BLAS/solve guarantee follows. That is the
  correct scope: the argument covers the executed path (design-only QR, `q.T @ resp`, triangular
  solve, squares, builtin sums, ratios) and needs the in-range and same-path conditions, which
  a library kernel with magnitude-dependent branches could violate. The returned review's N-1
  wording ("every node … commutes exactly … whenever no intermediate leaves the finite normal
  range") omitted the operation-path condition; the successor's narrower statement is
  preferred. The transcript's bit-identical F outputs across the three uniform scales for all
  three graphs are consistent with, not proof of, the conditional claim.
- **N-2 — addressed.** `exact_f_preserved` is `null` on both zero-residual rows and the script's
  invariance assertion skips `None`; verified in the transcript and the script.
- **N-3 — addressed.** The table now says "unit-scale graph F outputs" and the successor section
  states the 2^−8 factor for normalized SS and SSE.

## 8. Author qualifications of the returned review — accepted

| Qualification (repair record)                        | Reviewer disposition                                                                                                                                                                                         |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| "transformed exact SS is 1/8 exactly" is wrong       | **Accepted.** SS_A = 1/8 + 2^−602, SS_B = 1/8 − 2^−602, SS_AB ≈ 1/8 − 2^−600.19; each projects to 1/8. The review's Section 4 table cell is corrected here.                                                  |
| "±2^−1674" are magnitude approximations              | **Accepted.** log2 of the exact relative changes is −1674.000000000 to nine decimals but not exactly −1674; signs +, +, −.                                                                                   |
| "fourth distinct CPython patch level" is unsupported | **Accepted.** The numerical review at `c8ce35c5…` already reproduced `558b6e65…` on CPython 3.12.3; the documented distinct levels are 3.12.3, 3.12.13 and 3.12.14. The review's run was a repeat on 3.12.3. |

A fourth correction, not raised by the author, is recorded in Section 6: the review's
attribution of the QR residual noise to the two `0.5` observations was wrong. The review blob
`830b5816…` is preserved as returned; these corrections supersede the affected sentences.

## 9. Findings on the successor

### BLOCKER

None.

### C-1 (`SHOULD-FIX`) — correct the residual location in the SF-2 explanation

In the "Target-detail successor" section, replace "dominated by rounding residuals at the two
0.5 observations" with wording of the form: "the two 0.5 observations are fitted exactly; the
SSE comes from residuals of about 2^−54 to 2^−55 at the six small-magnitude observations, which
carry the rounding of coefficients determined at the 0.5 magnitude". No number changes; the
mechanism statement and the 2^1098 gap stand.

### C-N1 (`NICE-TO-HAVE`) — qualify the Results-table sentence in place

The "Mixed magnitudes" row still says scaling "changes the exact F target" without the
successor's qualification. Add "(by a relative ≈ 2^−1674; both targets project to +inf)" or a
pointer to the successor section so the table is not read alone.

### C-N2 (`NICE-TO-HAVE`) — add a readable magnitude beside the relative-change rationals

`exact_f_relative_change` entries are 4557-character rationals. A companion field with the sign
and a decimal log2 magnitude would make the row inspectable without a computer-algebra step.

## 10. Bounded verdict

| Determination                            | Verdict                                                                    |
| ---------------------------------------- | -------------------------------------------------------------------------- |
| Input integrity and preservation         | **`MATCH`**; returned review and historical evidence unchanged             |
| Successor transcript                     | **`REPRODUCED`**; added values independently **`CONFIRMED`**               |
| SF-1 / SF-2                              | **`CLOSED`** / **`CLOSED`** on substance with C-1 wording repair requested |
| N-1 / N-2 / N-3                          | addressed                                                                  |
| Original exploration `GO` at `431ac4e6…` | stands                                                                     |
| Power-of-two scaling                     | not adopted; not shown sufficient                                          |
| Source holds, R4-P1 to R4-P6             | unchanged; nothing closed                                                  |
| Public-opening readiness                 | **`NOT_READY`**                                                            |
| Adoption, allocation, opening, merge     | none requested; none granted                                               |

## 11. Validation record

Executed in the session clone (Node v22.22.2, pnpm 11.7.0, `pnpm install --frozen-lockfile`).
Numerical work ran in a `uv` virtual environment (CPython 3.12.3, NumPy 2.3.5 wheel with bundled
scipy-openblas / OpenBLAS 0.3.30): submitted successor exit 0 with output as in Section 5;
reviewer-written reconstruction exit 0 with results as in Sections 4 and 6.

Repository checks on this branch (successor head merged, plus this file), all exit 0:
`pnpm exec prettier --check` on this file; `pnpm lint:markdown` (386 files, 0 issues);
`pnpm typecheck`; `pnpm validate` ("registries, traceability, normative lint, authority, gates,
conformance manifest, links, private-dependency and language audits, phase-1 schemas,
cross-checks, code-path audits, and the snapshot manifest mechanism are clean");
`git diff --cached --check`. No aggregate `pnpm check` was run because no authoritative,
generated or evidence artifact changed. Repository hygiene is not evidence of numerical
correctness.

RELEASE 4 POWER-SCALE REPAIR CLOSE REVIEW COMPLETE - SF-1 CLOSED - SF-2 CLOSED WITH C-1 WORDING REPAIR - ADDED VALUES CONFIRMED - SCALING NOT ADOPTED - HOLDS UNCHANGED - NOT READY TO OPEN - SAME-SESSION CLOSE REVIEW DISCLOSED - NOT MERGE APPROVAL - NOT PROTOCOL ADOPTION
