# Release 4 Numerical Research Result — Independent Review of the Degree-Domain Guard Successor

**Status: informative independent review result; non-normative; not adopted.** This
record reviews one exact successor commit of the preliminary Release 4 factorial
numerical research result: the author-side repair that adds a positive-even-integer
degree-of-freedom guard to both exploratory F-tail routes and one additional corpus
case. The question answered is whether the repair delta is correct and free of
regression, and whether PR #184 finding N-B1 is closed at this head. It does not
re-adjudicate the whole numerical result, does not resolve PR #184's
`SOURCE_ACCESS_INCOMPLETE` dispositions or its Section 5.4 completion work, and selects
no Contract, procedure, identifier, schema, Public Check, tolerance, support domain,
numerical guarantee, RFC decision, or release outcome. It merges nothing. Attribution is
role-based only; material process provenance is disclosed in Sections 1 and 12.

**Delta verdict: `GO`** (Section 11). **N-B1: `CLOSED`** at head `5962cc2d…` on
content. No valid-case numerical drift; no zero-SSE inference; no promotion of any
diagnostic, hold or boundary. New findings: `BLOCKER` 0, `SHOULD-FIX` 0,
`NICE-TO-HAVE` 2.

**Independence status: context `ESTABLISHED`, model-level `PENDING`** (Section 12).
**Formal acceptance: `NOT PERFORMED`** and not authorized by this record. Programme
disposition remains `INPUT_INCOMPLETE`; all per-entry assessments remain `PRELIM`.

## 1. Review identity, scope, role, and independence

| Field                 | Value                                                                                                                                                                                                                                                                                          |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository            | `licklider-ai/nomue-protocol` (public)                                                                                                                                                                                                                                                         |
| Reviewed pull request | #190 (draft; head branch `research/r4-numerical-degree-guard-20260907`; base `research/r4-factorial-numerics-58675e6`, which is PR #180's branch)                                                                                                                                              |
| Reviewed exact head   | `5962cc2def5b1aca7e30d219f12a9a6486ca7b11`                                                                                                                                                                                                                                                     |
| Sole parent           | `5bae1f2548a7126c254c51b65b0eda4ae4941343` (PR #180's fixed head, reviewed in PR #184 as head B)                                                                                                                                                                                               |
| Changed path          | `governance/drafts/release-4-preparation/numerical-research-result.md` (only path)                                                                                                                                                                                                             |
| Review date           | 2026-09-07 (UTC)                                                                                                                                                                                                                                                                               |
| Reviewer role         | independent exact-head reviewer of the successor delta, commissioned by the steward's review instruction supplied in this session                                                                                                                                                              |
| Non-involvement       | this review session did not author, revise, or repair the Release 4 preparation package, either commission, PR #180 (original or repaired), PR #181, PR #182, PR #184, PR #189, or PR #190; it did not author any Release 3 record either                                                      |
| Review posture        | falsification-oriented: recompute every identity, extract and hash the scripts byte-exactly, rerun both, diff the transcripts, attack the guard with values beyond the recorded fourteen, mutate the guard locally to prove the check detects defects, and look for any promotion in the prose |
| Private material      | none; no private repository, path, package, or product implementation was read                                                                                                                                                                                                                 |

**Model information.** The session-management service reported
`configured_model: claude-fable-5-1` and `last_served_model: claude-fable-5-1` for this
review session (started 2026-09-07T07:58:39Z). The successor's own header records
"investigation/repair coordinator with OpenAI assistant support"; see Section 12.

**Environment.** Linux container (managed cloud environment); Node v22.22.2; pnpm 11.7.0
as pinned by `packageManager`; dependencies installed with `pnpm install --frozen-lockfile`
from the pinned lockfile; Python 3.12.3 and Python 3.11.15 (x86_64) for the scripts;
`mpmath` 1.4.1 (Python 3.11) as an independent oracle. The result records Python 3.12.13;
the version line is the only transcript difference observed (Section 4).

## 2. Fixed identity verification (expected versus observed)

| Object                                               | Expected (handoff)                                                                                           | Observed                                                                                                                       | Status   |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | -------- |
| PR #190 head                                         | `5962cc2def5b1aca7e30d219f12a9a6486ca7b11`                                                                   | live head `5962cc2d…` (API and `git ls-remote`), unchanged at start and end                                                    | match    |
| Sole parent                                          | `5bae1f2548a7126c254c51b65b0eda4ae4941343`                                                                   | exactly one parent, `5bae1f25…`                                                                                                | match    |
| Tree                                                 | not supplied                                                                                                 | `c807e2b583a4d2c5c65706d1bd999b8c69d2d2b7` (recorded, not asserted against an expectation)                                     | recorded |
| Changed paths                                        | one                                                                                                          | `git diff --stat 5bae1f25… 5962cc2d…`: the result file only, +105/−6                                                           | match    |
| New result blob                                      | `200296de5745a3bc7087de4d924e1759f4c0f84e`                                                                   | `git ls-tree` at head = `200296de…`                                                                                            | match    |
| Old result blob                                      | `5b3668b8fb1b3c23f975654b21ffb8e8a1d41c46`                                                                   | `git ls-tree` at parent = `5b3668b8…`; PR #180 head and branch still at `5bae1f25…`                                            | match    |
| New Python fence SHA-256                             | `ae3fc166acc8c00e135e198810e5e32459d6518c16b69247a755d2d9a4225ed4`                                           | single `python` fence, extracted byte-exactly with its trailing newline: same hash                                             | match    |
| Old Python fence SHA-256                             | `b66f7826badf2d335fa7faf9669a625752c30848a1fc24a1dae0dd41eba9cf0e`                                           | single `python` fence at the parent blob: same hash                                                                            | match    |
| PR #184 review                                       | commit `1d493622…`, path `review-inputs/r4-factorial-research-exact-head/REVIEW-RESULT.md`, blob `f676f8ab…` | commit (sole parent `58675e66…`), path and blob confirmed; branch `review/r4-factorial-research-exact-head-20260906` unchanged | match    |
| Fixed preparation commit                             | `58675e66dbf263c94688d47867c731ad4efddbf6`                                                                   | R4 README blob `34fa11bd…`, numerical commission blob `48836247…` read from that commit                                        | match    |
| Base branch `research/r4-factorial-numerics-58675e6` | PR #180 head                                                                                                 | `5bae1f25…`; not merged into; no push to it                                                                                    | match    |
| `git diff --check 5bae1f25… 5962cc2d…`               | clean                                                                                                        | no output, exit 0                                                                                                              | match    |

Live PR #190 metadata (mutable) was read from the hosting API at about 08:02 UTC on
2026-09-07: open, draft, one commit, one changed file, `mergeable_state: clean`, base
`research/r4-factorial-numerics-58675e6`. PR #180 and PR #184 were open and unmerged when
read (about 08:04 UTC). The API merge state is transient and was not used as content
evidence; the review is against the fixed parent, not the moving base.

## 3. The delta, read in full

`git diff 5bae1f25… 5962cc2d…` touches nine regions of the result file, all consistent
with the PR description:

1. Header: adds the successor repair role ("investigation/repair coordinator with
   OpenAI assistant support, 2026-09-07") and "This successor is not independently
   reviewed."
2. §4: adds "Both probe routes now reject degrees of freedom that are not positive even
   Python integers before evaluating nu/2. This guard does not provide a general
   Candidate B oracle or a Protocol admission rule."
3. §7: replaces the script hash sentence with the new hash and "Earlier script
   identities remain in Sections 11 and 12"; changes "All-equal global observations are
   not separately executed" to "are now separately executed in the successor".
4. §9 script: adds `require_even_nu`; adds one call to it as the first statement of
   `tail_bounds` and of `series`; appends the fourteen-call negative loop and the
   all-equal four-cell case.
5. §10: adds a paragraph marking the repository-validation paragraphs as the historical
   2026-09-06 record and the transcript as replaced; relabels the transcript "(successor,
   2026-09-07, exit 0)"; the transcript gains two lines and the new hash.
6. §11: adds a paragraph marking it as the historical 2026-09-06 repair account.
7. New §12 "Degree-domain successor, 2026-09-07" with the preserved identities of PR
   #180 and PR #184, the repair and executed evidence, reuse limits, and the review
   handoff.

Nothing else changed: §§1–3, 5, 6, 8, the §9 code before the guard and after it (all
valid-case probes), the historical §10 validation text, and §11's original content are
byte-identical to the parent.

## 4. Script extraction, execution, and transcript comparison

| Step                                          | Result                                                                                                                                                                                                                                                                                                                       |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Extraction                                    | one `python` fence in each blob; the fence body plus its terminating newline hashes to the recorded value in both cases (the body without that newline does not)                                                                                                                                                             |
| Old script, Python 3.12.3                     | exit 0; identical to the parent's recorded transcript except the version line (`3.12.3` versus recorded `3.12.13`)                                                                                                                                                                                                           |
| New script, Python 3.12.3                     | exit 0; identical to §10's recorded successor transcript except the same version line                                                                                                                                                                                                                                        |
| Old and new scripts, Python 3.11.15           | exit 0 each; identical to the 3.12.3 runs except the version line (`3.11.15`)                                                                                                                                                                                                                                                |
| Old → new transcript delta (same interpreter) | exactly: the old hash line is replaced by the two new `PASS` lines followed by the new hash line; every other line, including all nine tail comparisons, the four projection lines, the critical bracket, the near-zero projections, the admission and manifest controls, and the threshold/midpoint line, is byte-identical |

The version-line difference is an environment difference (interpreter patch level), not
a content difference; the result records its own interpreter honestly and the reviewer
records the reviewer's. No other environment-dependent output exists in either transcript.

## 5. Guard verification

**Placement and form (read from the exact new fence).**

- `require_even_nu(nu)` is the first executable statement of `tail_bounds` and of
  `series`; `a = nu//2` appears only after it in both routines, and no truncating
  division, `Decimal` conversion or polynomial/series work precedes it.
- The guard is `if type(nu) is not int or nu <= 0 or nu % 2: raise ValueError(...)`. It
  contains no `assert`; running the guard under `python3.12 -O` still raises for `3`,
  `4.0` and `True` through both routes (checked directly, not inferred from the script
  finishing).
- The shared `nu//2` hazard identified in §12 is real: with the old script, `tail_bounds`
  and `series` at `ν = 3, F = 3` both silently used `a = 1` and returned `0.292893`
  (enclosure and series agreeing), whereas the true `Q(3; 1, 3) = I_{1/2}(3/2, 1/2) =
0.181690` (independent oracle). Agreement of the two routes therefore concealed the
  same parameter error, exactly as N-B1 and §12 state. The floored result is not even the
  `ν = 2` answer (`0.225403`), so it was wrong for every reading.

**Recorded negatives.** The fourteen calls (`1, 3, 9, 0, -2, True, 4.0` through each
route) were reproduced: each raises `ValueError` with the exact message
`probe requires positive even integer nu`; the script's `else: raise AssertionError`
branch is never reached.

**Reviewer's additional boundary attack (25 values × 2 routes = 50 calls).** Values:
the seven recorded ones plus `False`, `-4`, `5`, `1001`, `4.5`, `'4'`, `Fraction(4)`,
`Decimal(4)`, `4+0j`, an `int` subclass instance with value 4, `None`, `2**63+1`, `-1`,
`7`, `2.0`, `6.0`, `10**6+1`, `[4]`. All 50 calls were rejected with the exact message;
no call raised any other exception type and none was accepted. Positive controls
`2, 4, 6, 60, 200` were accepted by both routes and the series value lay inside the
rational enclosure in each case.

## 6. Mutation testing (local, temporary, never committed)

Each mutation edited a scratch copy of the exact new fence and ran the whole script; the
copy was deleted afterwards. "Detected" means the script did not exit 0 and did not
print the degree-domain `PASS` line.

| Mutation                                                         | Outcome                                                                                                   | Detected |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | -------- |
| M1 remove the guard call from `tail_bounds`                      | `ZeroDivisionError` at `nu = 1` (`a = 0`, `h(1) = 0`) before the loop's assertion                         | yes      |
| M2 remove the guard call from `series`                           | `decimal.DivisionByZero` at `nu = 1`                                                                      | yes      |
| M3 guard checks parity only (`nu % 2`)                           | `ZeroDivisionError` at `nu = 0`                                                                           | yes      |
| M4 guard uses `isinstance(nu, int)` instead of `type(nu) is int` | exit 0; transcript identical except the hash line                                                         | no       |
| M5 guard drops the positivity test                               | `ZeroDivisionError` at `nu = 0`                                                                           | yes      |
| M6 guard rewritten as an `assert`, script run with `-O`          | `ZeroDivisionError` at `nu = 1`                                                                           | yes      |
| M7 floor `nu` to even before the guard                           | `AssertionError: ('tail_bounds', 3)` from the negative loop                                               | yes      |
| M8 guard rejects only the crash-inducing values `1, 0, -2`       | `AssertionError: ('tail_bounds', 3)`; the valid-case lines print first, the degree-domain `PASS` does not | yes      |

M4 is not a defect of the guard: `True` is odd and `False` is non-positive, so every
boolean is rejected by the parity or positivity test regardless of the type check, and
the result's claim "Booleans and integral-valued floats are rejected" holds. It shows only
that the fourteen recorded negatives cannot distinguish the strict `type(nu) is int`
check from `isinstance`, because no boolean is a positive even integer (finding G-N1).
M7 and M8 confirm that the designed detection path (the loop's `raise AssertionError`,
a statement that survives `-O`) fires for a silent-floor defect on odd `ν ≥ 3`.

## 7. Regression checks on the unchanged evidence

| Item                                                                                                           | Method                                                                                                                                                           | Result                                                                                                                                                                            |
| -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nine positive tails, eighteen zero/doubled controls                                                            | rerun (Section 4); the transcript line is byte-identical                                                                                                         | no drift                                                                                                                                                                          |
| Nine tails against an independent oracle                                                                       | `mpmath.betainc(ν/2, 1/2, 0, ν/(ν+F), regularized=True)` at 400 and 600 decimal digits, compared with the 1024-bit rational enclosure from the new `tail_bounds` | oracle inside the enclosure in all nine cases; series relative difference from the oracle ≤ 6·10⁻¹⁴⁹ (limited by the 150-digit series)                                            |
| Enclosure width                                                                                                | `(hi − lo)/lo` at 1024 bits                                                                                                                                      | between 7·10⁻²⁷⁹ and 4·10⁻³⁰⁸; a 250-digit oracle run was too coarse for one case (`ν = 60, F = 480`) and was discarded as an oracle-precision artifact, not an enclosure failure |
| Four projections `F = 2^510, 2^530, 2^540, 2^600` at `ν = 4`                                                   | rerun plus direct evaluation                                                                                                                                     | `lo > 0` and `float(lo) == float(hi)` with the recorded hexadecimal forms, including the two positive tails projecting to `0x0.0p+0`                                              |
| Critical bracket, near-zero and adjacent projections                                                           | rerun                                                                                                                                                            | lines byte-identical                                                                                                                                                              |
| Counts 2–16 algebra, six transformations, Gram and decomposition, three isolated zero contrasts, zero residual | rerun                                                                                                                                                            | lines byte-identical                                                                                                                                                              |
| Admission and manifest toy controls                                                                            | rerun                                                                                                                                                            | lines byte-identical; still labelled toy only                                                                                                                                     |

The rerun is reproduction, not an independent mathematical proof; the oracle comparison
is an independent numerical check of the nine recorded points only and certifies neither
the series remainder nor a support domain. (A symmetry-route oracle `1 − I_{1−x}(1/2, ν/2)`
was also tried and, as expected, loses all digits at `F = 2^100` by cancellation; only
the direct route is reported.)

## 8. The all-equal corpus case

For cells `[[7, 7]] * 4`: by hand, all four cell means are 7, so
`c_A = c_B = c_AB = 0`, each effect sum of squares `n c²/4 = 0`, and the residual sum of
squares `Σ (y − m)² = 0`. The script's `algebra` returns `([0, 0, 0], [0, 0, 0], 0)`,
and the transcript line "all-equal cells: three zero contrasts, zero SS and zero residual:
PASS" is reproduced. The script forms no `F` statistic anywhere (no `SS/MSE` division
exists in the fence), so no `0/0` is manufactured, and §12 explicitly declines to
"select a refusal code". The pre-existing zero-residual case with nonzero contrasts
(`[[i, i] for i in range(4)]` → contrasts `4, 2, 0`, residual `0`) is unchanged. §3's
statement that "this report selects no endpoint or refusal code" for zero SSE stands.

## 9. Boundary, scope, and promotion checks

| Check                                                                                                                                 | Evidence at head                                                                                                                                                                                                                                                                        | Result     |
| ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Guard is a probe-domain restriction, not a Protocol input rule                                                                        | §4 "not a Protocol admission rule"; §9 comment "Probe domain only; not a Protocol admission rule"; §12 "deliberately a Python probe-domain restriction, not a selected Protocol input policy"                                                                                           | prevented  |
| Candidate A `ν = 4(n−1)` even; Candidate B not thereby covered; numerator degrees still open                                          | §12 "Candidate A has nu=4(n-1), so its recorded corpus stays within the even-degree specialization. Candidate B can have odd residual degrees of freedom, and even residual degrees alone do not handle its multi-degree numerator"; §4 "does not provide a general Candidate B oracle" | prevented  |
| Candidate B balanced `a × b`, Candidate C unbalanced (not the old commission's Candidate B typo)                                      | fixed-commit R4 README table (A: balanced 2×2; B: balanced `a × b`; C: unbalanced); result §4 and §6 rows unchanged; PR #189 Section 4 restates it                                                                                                                                      | consistent |
| No promotion of `1e-120`, precision, method, numerical guarantee, resource limits, F endpoints, series remainder, portable projection | §12 "F-input endpoints, precision parameters, resource caps, portable projection and series remainder certification still require their own work. The diagnostic 1e-120 remains a research comparison threshold, not a Protocol tolerance"; §4/§5/§6/§8 unchanged                       | prevented  |
| No source or semantic hold promoted                                                                                                   | §12 "No blanket closure of PR 184, other NICE-TO-HAVE items or source holds is claimed"; §1 unchanged ("No later input or reviewed Release 4 semantic handoff is incorporated")                                                                                                         | prevented  |
| §10 historical record versus successor transcript; §11 historical repair; §12 successor repair                                        | §10's new lead paragraph and relabelled transcript; §11's new lead paragraph; §7's "Earlier script identities remain in Sections 11 and 12"; §12 pins PR #180's blob and old hash and PR #184's commit and blob. The three layers are labelled and dated and are not conflated          | separated  |
| Preserved objects                                                                                                                     | PR #180 head/branch, PR #184 commit/branch/blob unchanged (Section 2)                                                                                                                                                                                                                   | preserved  |
| Programme and per-entry labels                                                                                                        | header `INPUT_INCOMPLETE`; §12 "all per-entry assessments remain PRELIM"; no `NUMERIC_*`, `ORACLE_ONLY`, `NARROW` or `DEFER` assignment introduced (mechanical search)                                                                                                                  | confirmed  |
| PR #190 body claims                                                                                                                   | identities, hashes, "all old output lines before the script hash are identical", "adds 14 rejected degree-domain calls and the all-equal cell check": each verified above; the body's Node/pnpm/Python versions are the author's environment and are not re-asserted here               | verified   |

## 10. N-B1 and the other PR #184 items

| Item                                             | Disposition at head `5962cc2d…`                                                                                                                                                                                                                                               |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| N-B1 (even-degree restriction not guarded)       | **`CLOSED`** on content: PR #184's close condition ("the successor's routine rejects odd ν or a general-b route replaces it") is met by the first alternative in both routines; the hash is re-recorded; §4 states the restriction. Independence for this closure: Section 12 |
| N-A1, N-A2, N-A3, N-A4 (head A), N-B2, N-C1      | not addressed by this delta and not claimed to be; unchanged                                                                                                                                                                                                                  |
| PR #184 heads A and B `SOURCE_ACCESS_INCOMPLETE` | unchanged; Section 5.4 completion (two PDF identities, arXiv version, Williams publisher record, four upstream pages) remains the separate work PR #189 Section 4 describes; this review needed no external source and inferred nothing about them                            |
| Programme `INPUT_INCOMPLETE`                     | unchanged                                                                                                                                                                                                                                                                     |

No previously unknown whole-programme problem was detected in the course of this review.
Had one been, it would have been reported without widening this bounded `GO`.

## 11. Findings and verdicts

### BLOCKER

None.

### SHOULD-FIX

None.

### NICE-TO-HAVE

- **G-N1 — The negative corpus cannot exercise the strict type test.** File: result §9
  negative loop and §12 "Booleans … are rejected". The claim is true, but because every
  boolean is either odd or non-positive, the fourteen calls cannot tell `type(nu) is int`
  from `isinstance(nu, int)` (mutation M4 survives). If the author wants the strictness
  against `int` subclasses to be evidenced, one positive-even `int`-subclass value would
  do; otherwise the sentence could say the rejection follows from parity/positivity. No
  impact; re-review: none required, and any edit changes the script hash.
- **G-N2 — Recorded interpreter patch level.** File: result §7 and §10 transcript
  ("3.12.13"). The successor was reproduced here under 3.12.3 and 3.11.15 with only the
  version line differing. Recording that the transcript's first line is
  environment-dependent would save future reviewers a false-diff check. No impact;
  re-review: none required.

### Verdicts

| Determination                             | Verdict                                                                                                                                                                                                                                                                                                                            |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repair delta (this record's scope)        | **`GO`** — the guard is placed before any computation in both routes, is not an assertion, rejects the recorded fourteen and fifty further calls, is detected by the check when removed or weakened (M1–M3, M5–M8), and changes no valid-case output; the all-equal case is correct and infers nothing; the prose promotes nothing |
| N-B1                                      | **`CLOSED`** (content)                                                                                                                                                                                                                                                                                                             |
| PR #184 overall and per-head dispositions | unchanged (`SOURCE_ACCESS_INCOMPLETE`); not converted by this `GO`                                                                                                                                                                                                                                                                 |
| Programme                                 | `INPUT_INCOMPLETE`, unchanged                                                                                                                                                                                                                                                                                                      |
| Independence — context                    | `ESTABLISHED` (Section 12)                                                                                                                                                                                                                                                                                                         |
| Independence — model level (RFC rule 2)   | `PENDING` (Section 12)                                                                                                                                                                                                                                                                                                             |
| Formal acceptance / promotion             | `NOT PERFORMED`; not authorized by this record                                                                                                                                                                                                                                                                                     |

`GO` means only that, at exact head `5962cc2def5b1aca7e30d219f12a9a6486ca7b11`, the
successor delta does what §12 says and nothing else. It does not resolve the numerical or
semantic `INPUT_INCOMPLETE`, complete PR #184 Section 5.4, certify the enclosure, series,
projection or any tolerance, adopt Candidate A or any method, start an RFC, open public
discussion, authorize design freeze or implementation, ratify or publish Release 4, or
approve merging PR #180, #184 or #190 (including into PR #180's branch, which this review
neither merged into nor pushed to).

## 12. Independence evidence and its limits

- **Established: separate context and non-involvement.** This session began on
  2026-09-07T07:58:39Z from a fresh clone of the public repository, after PR #190's
  commit, with no access to the coordinator's or any prior reviewer's session; it
  authored none of the reviewed material (Section 1).
- **Established: reviewer-side model identifier.** `claude-fable-5-1` (configured and
  last-served), read from the session-management service; recorded as session testimony.
- **Recorded, not verified: author-side identifier.** The successor header and §12 say
  the repair was made by the "investigation/repair coordinator with OpenAI assistant
  support"; the PR #189 record says the same of itself. The user's clarification on PR
  #186 describes the assisting model across investigation/repair and reviews as Claude
  Fable 5.1. These accounts are not reconciled in the record and cannot be verified from
  Git objects; this review does not choose between them. PR #184's reviewer intentionally
  recorded no software identity, so the prior numerical review supplies no comparison
  either.
- **Consequence.** The model-level criterion of RFC rule 2 is `PENDING` for the closure
  of N-B1 in the same way as for the Release 3 acceptance: if the repair assistance was
  OpenAI/GPT as the record states, this pass is a different model; if the user's account
  is read as Claude Fable 5.1 assistance throughout, it is a separate context but not a
  separate model. The steward's record should state which account it relies on. This is
  an acceptance prerequisite, not a defect of the delta, and it does not weaken the
  content findings.
- **Human responsibility.** This text was produced in an LLM-assisted review session at
  the steward's instruction; accountable human responsibility rests with the steward. No
  human authorship of this text is claimed.

## 13. Repository validation

Executed in an isolated clone (remote set to the public repository URL) with the pinned
dependencies installed from the lockfile, working tree at `5962cc2d…`:

| Command                                                                                              | Result                                       | Exit |
| ---------------------------------------------------------------------------------------------------- | -------------------------------------------- | ---: |
| `pnpm install --frozen-lockfile` (offline from the populated store)                                  | "Done"                                       |    0 |
| `pnpm format:check`                                                                                  | "All matched files use Prettier code style!" |    0 |
| `pnpm lint:markdown`                                                                                 | 357 files, 0 issues                          |    0 |
| `pnpm typecheck`                                                                                     | `tsc --noEmit`, no output                    |    0 |
| `node --import tsx tooling/src/validate.ts`                                                          | "… are clean." (validate OK)                 |    0 |
| `git diff --check 5bae1f2548a7126c254c51b65b0eda4ae4941343 5962cc2def5b1aca7e30d219f12a9a6486ca7b11` | no output                                    |    0 |
| Old and new §9 scripts, Python 3.12.3 and 3.11.15                                                    | exit 0 each; transcripts as in Section 4     |    0 |

The same repository commands were re-run after adding this record and passed (recorded
in the review PR). An earlier attempt using a Git worktree failed the validator's
private-dependency audit on the worktree's `.git` pointer file; that was an artifact of
the reviewer's checkout mechanism, not of the reviewed head, and was replaced by the
clone above. No aggregate `pnpm check` or unrelated suite was run. CI or repository
hygiene is not evidence of numerical correctness; Sections 4–8 are.

## Public-artifact self-check

- [x] Only the public repository at the fixed head, parent and preparation commit, the
      live PR metadata (read times recorded), and the preserved PR #184 review were used;
      no external source was needed; no private repository, work item, or product
      implementation was read.
- [x] This file is the only change in the review commit; the reviewed result, PR #180,
      PR #184, both commissions, and every authoritative artifact are unchanged; no
      mutation of the script was committed.
- [x] Attribution is role-based. Material process provenance (separate LLM-assisted
      review session, reviewer model identifier, environment, interpreters, oracle
      library, date, hashes) is disclosed; no unsupported human authorship or
      non-involvement is implied.
- [x] Reproduction, independent oracle checks, reviewer inference, findings, the delta
      verdict, the independence status and the acceptance status are kept separate.
- [x] No merge (including into PR #180's branch), hold update, Issue change, discussion
      opening, method adoption, ratification, or release was performed, and none is
      authorized by this record.

RELEASE 4 NUMERICAL DEGREE-DOMAIN GUARD SUCCESSOR REVIEW COMPLETE - DELTA GO - N-B1 CLOSED (CONTENT) - MODEL-LEVEL INDEPENDENCE PENDING - PROGRAMME INPUT_INCOMPLETE UNCHANGED - NOT MERGE APPROVAL - NOT PROTOCOL ADOPTION
