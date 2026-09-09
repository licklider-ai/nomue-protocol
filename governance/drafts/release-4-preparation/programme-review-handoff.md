# Release 4 programme audit: independent review handoff

Perform a bounded independent review of the programme audit and preceding wording
repairs. This is not the final R4-P6 opening review. Use a separate model and work
context from the OpenAI-assisted author; report actual model/provider information
available to you, uncertainty, and reuse of any prior review context. Do not infer
human independence from model independence.

## Fixed input and identity checks

Repository: `licklider-ai/nomue-protocol`.

| Input                                             | Expected value                             |
| ------------------------------------------------- | ------------------------------------------ |
| PR 227 head                                       | `f01b870bdce4e051476e4b74d56b4deb4217307e` |
| Parent, including the two wording repairs         | `68a8726ea564a88fe3663dfd84bfde8c4550d6e6` |
| PR 227 tree                                       | `af6606a1f85af83c36714a4c64708688a9308068` |
| Pre-repair input independently reviewed in PR 225 | `ed7bfeb9f9ca2cee6e8766e90d9ee6a5091cb68b` |
| Preserved PR 225 review blob                      | `28aa4f8dcefe5bc0285c65c6374a5ae5040b2bbe` |
| Original SS/F probe blob                          | `a3f9a9a4ad3e031ae0e63857400359c0c08f2fba` |
| Original SS/F result blob                         | `38bd5d8eadcbcc91dc1ae8630eb05ba4be4daa53` |

Fetch the exact commits; a moving branch is a locator only. Read AGENTS.md and its
ordered governance prerequisites. Confirm head, parent, tree and listed blobs.
Compare the complete nine-file PR 227 increment with its parent, and the parent's
two-file wording repair with `ed7bfeb9`. Record any unavailable or mismatched input;
do not silently review a newer head or issue an unqualified verdict on missing input.

The companion workplan and this handoff are later author-side instructions, not
part of the pinned PR 227 input. Record their consumed commit and blobs separately.
You may flag defects in them, but keep their assessment separate from the fixed
audit verdict. Neither document supplies new experimental evidence.

## Review scope

1. Read `programme-self-audit-2026-09-09.md` under the Release 4 preparation
   directory. Check A1-A6 against the cited pinned research and preserved reviews.
   Assess the full readiness/source/architecture map, not merely changed sentences.
2. Close-check SF-R1 against the actual three graph implementations: builtin-cell
   means, builtin-cell contrast coefficients, and all-three-route residual sums.
   Close-check SF-R2 against ID-POLICY and ADR-0032. State CLOSED or still open
   individually; do not rewrite PR 225's historical verdict.
3. Independently reconstruct the three scale fixtures using exact arithmetic
   without the submitted `exact()` function. Check representability of the inputs,
   SS, SSE, df and F ratios; reproduce floating observations separately. Determine
   whether the text correctly distinguishes exact zero residual from numerical
   underflow and avoids a general algorithm or supported-domain claim.
4. Reproduce the original 945-case corpus on CPython 3.12 and NumPy 2.3.5 where
   available. Expected corpus digest:
   `558b6e65da273bf836204f7d0f5b4bae08cfd85918a23374a475197c2e851ca3`.
   Record interpreter, NumPy, BLAS and thread settings. An environment mismatch is
   investigated, not silently normalized. Distinguish the corpus digest from file
   hashes. Check the 19845 total quantity count versus 8505 F-only values.
5. Verify preservation of original probe/result, QR supplement, and three review
   records. Check that completed NIST/LAPACK provided-copy review stays complete
   within its accepted scope and is not confused with missing original methodology.
6. Check S1-S6 and P1 ambiguity dispositions, the PR 190 oracle parameter limits,
   unresolved Contract/Profile allocation and conditional Release 3 reuse. Do not
   close a source hold from metadata, a download attempt, or the algebraic probe.
   Further source acquisition is optional for this bounded audit review; disclose
   any access limitation and its claim-specific impact. No purchase or messaging.

## Verdict and deliverable

Report separately: input integrity; SF-R1/SF-R2 closure; audit/algebra accuracy;
source state by claim; workplan comments if any; and overall opening readiness.
Use BLOCKER, SHOULD-FIX and NICE-TO-HAVE findings with evidence and concrete repairs.
A bounded GO does not close R4-P1/P3/P5/P6, adopt a method, allocate identifiers,
approve execution support, or authorize public discussion.

Add only `review-inputs/r4-programme-audit/REVIEW-RESULT.md` on a neutral review
branch based on the exact PR 227 head. Preserve historical artifacts. Run formatting,
Markdown lint, typecheck, repository validation and diff checks as applicable;
record commands, failures and limitations accurately. Open a draft PR targeting
`research/r4-programme-adversarial-audit`, disclosing the fixed reviewed input.
If that target moves, disclose the changed comparison before delivery. Do not
merge, open an RFC, change Release 3 or treat earlier steward approvals as approval
of this increment. Return the full review commit and file blob.

Commission prepared with OpenAI Codex assistance in the existing authoring context,
2026-09-09. This handoff is not an independent review result.
