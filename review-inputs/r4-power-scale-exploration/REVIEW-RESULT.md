# Release 4 Power-of-Two Scaling Exploration — Bounded Independent Review

**Status: informative independent review; non-normative; not adopted.**

## 1. Verdict

| Dimension                  | Result                                                                                                                                                                                                                                             |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Input integrity            | **`MATCH`**: head, parent, tree, the four changed blobs, the recorded script/source SHA-256 values, and the unchanged historical probes and results (Section 3)                                                                                    |
| Reproduction               | **`REPRODUCED`**: all twelve transcript rows and every non-environment field are identical on CPython 3.12.3 / NumPy 2.3.5 / OpenBLAS 0.3.30; the historical corpus digest `558b6e65…` reproduces (Section 5)                                      |
| Independent reconstruction | **`CONFIRMED`**: six fixtures and twelve rows rebuilt with reviewer-side exact arithmetic without the submitted probes; conversion loss, exact F targets, positivity of SSE and all thirty-six floating observations agree bit-for-bit (Section 4) |
| Report statements          | **`GO`** (bounded) for the uniform-scale, offset, mixed-magnitude and zero-residual statements as written; two `SHOULD-FIX` clarifications concern what the mixed fixture does and does not show (Sections 4, 6)                                   |
| Findings                   | 0 `BLOCKER`, 2 `SHOULD-FIX`, 3 `NICE-TO-HAVE` (Section 6)                                                                                                                                                                                          |
| Holds and conditions       | S1–S6, P1 and R4-P1 through R4-P6 unchanged; no scaling algorithm, admission bound, output representation, tolerance or refusal code adopted; public-opening readiness **`NOT_READY`** (Section 7)                                                 |
| Independence               | model, provider and work-context independence from the OpenAI-assisted author; same model identifier as the preserved Release 4 reviews; this session produced the accepted programme-audit review (Section 2)                                     |

`GO` here means only that the exploration record at the exact head `431ac4e6…` reports what its
script computed, that the reviewer reproduced and independently reconstructed every row, and
that its stated limits are correct. It does not adopt power-of-two scaling, select a graph,
close any source hold or preparation condition, or authorize supported execution, an RFC window,
public discussion, a release, or a Release 3 change.

## 2. Independence, roles and boundary

- **Commission.** The "Independent review request" section of
  `governance/drafts/release-4-preparation/power-scale-exploration.md` at the reviewed head
  (blob `ae1fbedb…`): resolve once, record commit/tree and three file blobs, reconstruct the six
  fixtures with independent exact arithmetic, separate conversion loss from computation error,
  reproduce all twelve rows, verify the four statements, check that the mixed fixture's true F
  projection is not confused with finite QR output, preserve historical evidence, and return a
  bounded review with concrete corrections.
- **Reviewer.** An Anthropic model, `claude-fable-5-1`, in Claude Code remote session
  `session_0161XbYyVUYMC9stxNhpwdUU`; the session service reported `session_context.model` and
  `last_served_model` as `claude-fable-5-1`. Exact model-build identity beyond that identifier is
  not available as authenticated runtime metadata.
- **Author.** The increment records OpenAI Codex assistance in the existing maintainer context.
  The reviewer shares no context with that authoring session.
- **Prior context.** This session earlier produced `review-inputs/r4-programme-audit/REVIEW-RESULT.md`
  (accepted at main `fa82ccc1…`) and a chat review of the handoff documents. The
  exact-arithmetic reconstruction used here was written fresh for the six fixtures; it shares its
  level-mean and coded-contrast derivation with the earlier review's fixture check.
- **Provider overlap.** The preserved Release 4 reviews record the same model identifier in
  different sessions. Independence is at the model, provider and work-context level relative to
  the author; it is not human-investigator independence and is not claimed as such.
- **Assistance.** No other model, service or person contributed. External code executed: the
  submitted `power-scale-exploration.py` (which itself executes the unchanged
  `ss-f-propagation.py`) at the reviewed head, and a reviewer-written script described in
  Section 4.
- **Not performed.** No source acquisition, purchase, message, merge, RFC action, identifier
  allocation, Release 3 change or steward decision.

## 3. Exact identity and preservation

| Object                                            | Observed                                                                                                      |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| PR 234 head                                       | `431ac4e6e59d880eca3df07219783d622ce11e31`, sole parent `fa82ccc174f33c4e68658a6b279034fd8399e055` (`main`)   |
| Tree                                              | `255dda897e6b1596d7b4a9bd109912fe7172077b`                                                                    |
| `power-scale-exploration.md`                      | blob `ae1fbedbe7cd4569194465da6394a7a9e91fcc3b`                                                               |
| `probes/power-scale-exploration.py`               | blob `35d900d3b89fd0f00bbfa75d94c584a28a860118`; SHA-256 `aac06550…` = recorded `script_sha256`               |
| `probes/power-scale-exploration-result.json`      | blob `1fb3c0af7a4c2061c6bef7885c5b99474a80eb4e`                                                               |
| `README.md`                                       | blob `c6411b4e5a45fa171f4d1130e8cb0ce2eb572290`; five added navigation lines only                             |
| Increment                                         | four files, 691 insertions, 0 deletions; nothing outside the preparation directory                            |
| `probes/ss-f-propagation.py`                      | blob `a3f9a9a4…` at head, `main` and PR 218 input `4cf3e12a…`; SHA-256 `8c68703f…` = recorded `source_sha256` |
| `probes/ss-f-propagation-result.json`             | blob `38bd5d8e…` at head, `main` and `4cf3e12a…`                                                              |
| `probes/scale-boundary-audit.py`, `…-result.json` | blobs `ef0f26e3…`, `64b1ca32…` at head and `main`                                                             |
| Linked navigation targets                         | all five README-linked preparation files exist at the head                                                    |

The steward acceptance record at the head names PR 229 head `1d4d5360…` and the accepted
review `510cad76…`/`cf7416d8…`; the review blob is present unchanged in `main`. The README's
statement that this exploration "is not covered by that acceptance" agrees with that record.

## 4. Independent reconstruction

A reviewer-written script (SHA-256
`ce140ecdab5b9641fa3e3b88c52120fe21eb08f0c444245df98ebaacc118f81c`, not committed) rebuilt the
six fixtures from the report's prose, computed `-frexp(max|y|)[1]` and the `ldexp` transform
in pure Python, and evaluated three exact targets per row with `fractions.Fraction`: the raw
inputs, the ideal (lossless) scaled inputs, and the actual transformed binary64 inputs. Exact
values were derived by two routes asserted equal (level-mean decomposition and coded
contrasts, with the total partition asserted). The three graphs were re-implemented from the
supplement's prose (pure-Python floats for `builtin_cell`; NumPy reduced QR and solve for the
QR routes). No submitted function was imported.

| Fixture         | Exponent | Loss    | Exact F raw               | Exact F after transform       | Observations versus transcript |
| --------------- | -------- | ------- | ------------------------- | ----------------------------- | ------------------------------ |
| `uniform_0`     | −4       | none    | 100, 36, 4                | identical                     | 3/3 graphs bit-identical       |
| `uniform_-600`  | +596     | none    | 100, 36, 4                | identical                     | 3/3 graphs bit-identical       |
| `uniform_600`   | −604     | none    | 100, 36, 4                | identical                     | 3/3 graphs bit-identical       |
| `offset`        | −41      | none    | 100, 36, 4                | identical                     | 3/3 graphs bit-identical       |
| `mixed`         | −601     | index 1 | ≈ 2^1203 each (see below) | changed by a relative 2^−1674 | 3/3 graphs bit-identical       |
| `zero_residual` | −4       | none    | undefined (SSE 0)         | undefined                     | 3/3 graphs bit-identical       |

All twelve rows agree with the transcript on `conversion_loss_indices`, `exact_f`,
`exact_f_preserved`, `exact_sse_positive` and all thirty-six graph outputs. The raw exact F
rationals recorded for the mixed fixture were reproduced exactly. Exact F invariance under the
ideal transform was asserted for every fixture, including the mixed one; the target change in
the mixed row comes only from the lost input.

**Uniform and offset statements.** Confirmed. Both are consequences of exact equivariance:
every node in the three graphs (builtin sums, division by a constant, the QR of the constant
design matrix, `solve`, squaring, the final ratio) commutes exactly with multiplication by 2^k
in binary64 whenever no intermediate leaves the finite normal range. Recovery of the unit-scale
outputs and the bitwise-unchanged offset outputs are therefore guaranteed, not empirical
findings, and the uncentered QR cancellation error (relative 6.2e−5, 3.9e−5 and −4.1e−4 on
the three F values) is preserved exactly by the normalization.

**Mixed-magnitude statement.** Confirmed with two qualifications recorded as SHOULD-FIX.
Independent values for the mixed fixture `[0, 2^−1074, 1, 1.5, 2, 2.5, 2^600, 2^600]`:

| Quantity                                  | Raw inputs               | After scaling by 2^−601 (index 1 lost)                           |
| ----------------------------------------- | ------------------------ | ---------------------------------------------------------------- |
| Exact SSE                                 | 1/4 + 2^−2149            | 2^−1204                                                          |
| Exact SS (each effect)                    | ≈ 2^1199                 | 1/8 exactly                                                      |
| Exact F (each effect)                     | ≈ 2^1203.0               | ≈ 2^1203.0; relative change ±2^−1674                             |
| Binary64 projection of exact SSE / SS / F | `0x1p-2` / `inf` / `inf` | `0x0p+0` / `0x1p-3` / `inf`                                      |
| `builtin_cell` output                     | `0x1p-2` / `inf` / `inf` | `0x0p+0` / `0x1p-3` / `inf`                                      |
| `qr`, `centered_qr` output                | `inf` / `inf` / `nan`    | `0x1.1p-106` / `0x1.0000000000002p-3` / `0x1.e1e1e1e1e1e22p+104` |

Both exact F targets, before and after the lost input, project to `+inf`; the target does
change, but by a relative 2^−1674, far below any binary64 resolution. The finite QR value
2^104.9 is not close to either target: it is about 2^1098 too small, because the QR routes'
SSE `0x1.1p-106` is rounding noise from residuals at the two `0.5` observations, while the true
SSE 2^−1204 projects to zero. This is the spurious-positive-residual mechanism already recorded
in the zero-residual diagnostics, not an effect of scaling. In both mixed rows the `builtin_cell`
outputs equal the correctly rounded projections of the exact SSE, SS and F targets; this is a
statement about these two rows, not a ranking or a supported-domain claim.

**Zero-residual statement.** Confirmed. Exact SSE is 0 at both scales; `builtin_cell` yields
SSE 0 and F `inf`; the QR routes yield spurious SSE `0x1.3p-97` (raw) and `0x1.3p-105` (scaled,
exactly 2^−8 times) with finite F values unchanged by scaling. Scaling neither creates nor
removes this behavior.

## 5. Reproduction of the transcript

Executed from a copy of the head's `probes/` directory:

| Item                                                                                       | Pinned transcript                       | This review                                   |
| ------------------------------------------------------------------------------------------ | --------------------------------------- | --------------------------------------------- |
| Interpreter                                                                                | CPython 3.12.14                         | CPython 3.12.3 (`uv` managed)                 |
| NumPy / BLAS                                                                               | 2.3.5 / scipy-openblas, OpenBLAS 0.3.30 | 2.3.5 wheel / scipy-openblas, OpenBLAS 0.3.30 |
| Threads                                                                                    | not pinned                              | not pinned; no thread variables set; 4 CPUs   |
| `cases` (12 rows)                                                                          | —                                       | identical                                     |
| `status`, `numpy`, `original_corpus_sha256`, `script_sha256`, `source_sha256`, `threading` | —                                       | identical                                     |
| `python`                                                                                   | 3.12.14                                 | 3.12.3 (expected difference)                  |

The script executes the unchanged historical probe and reports its live corpus digest, so the
`558b6e65…` reproduction is a fourth CPython 3.12 patch level on which that digest holds. The
script's two assertions (exact F preserved for every lossless row; loss index `[1]` for the
scaled mixed row) passed here as well.

## 6. Findings

### BLOCKER

None.

### SF-1 (`SHOULD-FIX`) — record the post-transform exact target and its magnitude

The report says the transcript "records full exact F rationals … to make this distinction
inspectable" and that scaling "changes its exact F target", but the transcript stores only the
raw target (`exact_f`) and a boolean `exact_f_preserved`. Add per row the exact F computed on
the actual transformed inputs and both projections. State that for this fixture the change is
a relative ±2^−1674 and both targets project to `+inf`, so the mixed row demonstrates
conversion loss but not a materially different target. If a witness of a material target
change is wanted, choose a fixture whose lost subnormal deviations dominate SSE.

### SF-2 (`SHOULD-FIX`) — say what the finite QR output is wrong against, and why

"QR returns finite values after scaling, illustrating why finiteness alone is not evidence of
correctness" is true but unexplained. Record that both exact targets project to `+inf`, that
the QR value 2^104.9 is about 2^1098 too small, and that its SSE `0x1.1p-106` is rounding
noise at the `0.5` cell where the true SSE (2^−1204) projects to zero — the same
spurious-positive-residual mechanism as the zero-residual diagnostics, not a scaling effect.
Record, without ranking, that `builtin_cell` returns the correctly rounded projections in both
mixed rows.

### N-1 (`NICE-TO-HAVE`) — state the equivariance argument

Add one sentence that all three graphs are exactly equivariant under power-of-two scaling
absent underflow/overflow, so the uniform recovery and offset invariance are guaranteed and
the thirty-six evaluations cannot reveal graph differences beyond those already visible at unit
scale. This supports the report's own conclusion that normalization only moves the failure
boundary.

### N-2 (`NICE-TO-HAVE`) — `exact_f_preserved` is vacuous for the zero-residual fixture

`None == None` yields `true` for both zero-residual rows and the assertion counts them as
preserved. Record `null` or "not applicable" instead.

### N-3 (`NICE-TO-HAVE`) — "restores … unit-scale graph outputs" applies to F only

After normalization the transformed inputs are the base fixture times 2^−4, so SS and SSE are
2^−8 times their unit-scale values and only the F outputs coincide; the table wording should
say F outputs, as the transcript shows.

## 7. Bounded verdict

| Determination                        | Verdict                                                                                                        |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| Input integrity and preservation     | **`MATCH`**; historical probes, results and reviews unchanged                                                  |
| Transcript reproduction              | **`REPRODUCED`** on CPython 3.12.3 / NumPy 2.3.5                                                               |
| Exploration record at `431ac4e6…`    | **`GO`** as accurate finite author-side evidence, with SF-1 and SF-2 clarifications requested                  |
| Power-of-two scaling                 | not adopted; not shown sufficient (offset cancellation and zero-residual behavior unchanged; input loss shown) |
| Source holds, R4-P1 to R4-P6         | unchanged; nothing closed                                                                                      |
| Public-opening readiness             | **`NOT_READY`**                                                                                                |
| Adoption, allocation, opening, merge | none requested; none granted                                                                                   |

## 8. Validation record

Executed in the session clone (Node v22.22.2, pnpm 11.7.0, `pnpm install --frozen-lockfile`).
Numerical work ran in a `uv` virtual environment (CPython 3.12.3, NumPy 2.3.5 wheel with bundled
scipy-openblas / OpenBLAS 0.3.30): `python power-scale-exploration.py` exit 0 with output as in
Section 5; the reviewer-written reconstruction exit 0 with results as in Section 4.

Repository checks on this branch (head plus this file), all exit 0: `pnpm exec prettier --check`
on this file; `pnpm lint:markdown` (384 files, 0 issues); `pnpm typecheck`; `pnpm validate`
("registries, traceability, normative lint, authority, gates, conformance manifest, links,
private-dependency and language audits, phase-1 schemas, cross-checks, code-path audits, and
the snapshot manifest mechanism are clean"); `git diff --cached --check`. No aggregate
`pnpm check` was run because no authoritative, generated or evidence artifact changed.
Repository hygiene is not evidence of numerical correctness.

RELEASE 4 POWER-SCALE EXPLORATION REVIEW COMPLETE - BOUNDED GO AT 431ac4e6 - TRANSCRIPT REPRODUCED - SCALING NOT ADOPTED - HOLDS UNCHANGED - NOT READY TO OPEN - MODEL-LEVEL INDEPENDENCE ONLY - NOT MERGE APPROVAL - NOT PROTOCOL ADOPTION
