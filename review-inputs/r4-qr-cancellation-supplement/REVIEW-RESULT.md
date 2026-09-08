# Release 4 QR and Cancellation Supplement — Independent Exact-Head Review

**Status: informative independent review; non-normative; not adopted.**

## 1. Verdict

| Dimension            | Result                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------- |
| Content verdict      | **`GO`** for the bounded research supplement at the exact input head only                   |
| Source-access status | **`SOURCE_ACCESS_INCOMPLETE`** (both cited documentation pages blocked by the egress proxy) |
| Independence status  | Established at the model/provider and work-context level; see Section 2 for the boundary    |
| Findings             | 0 `BLOCKER`, 1 `SHOULD-FIX`, 7 `NICE-TO-HAVE`                                               |

`GO` here means only that the supplement is an accurate, bounded, reproducible informative
research record whose exact-arithmetic claims were independently re-derived and whose
floating transcript was reproduced bit-for-bit under the disclosed interpreter and NumPy
versions. It does not complete the numerical commission, close the programme
`INPUT_INCOMPLETE` or any source-access hold (including the semantic S6 two-system hold),
adopt an algorithm, select a production graph, establish a tolerance or support bound, issue
an identifier, start an RFC, or open public discussion. The `SHOULD-FIX` finding concerns a
route label and an environment-dependence attribution; it does not invalidate any count or
witness in the transcript (Section 7, SF-1).

## 2. Independence, roles, and boundary

- **Author of the reviewed supplement.** The supplement records that it was "Prepared by the
  OpenAI-assisted research author in the current authoring context." This review did not
  consult that context, its session, or any intermediate author material.
- **Reviewer.** This review was produced by an Anthropic model, `claude-fable-5-1`, running in
  a Claude Code remote session (session identifier recorded in the commit trailer), in a fresh
  container cloned from the repository at the start of the session. The serving model reported
  by the session service for this session was `claude-fable-5-1`. This satisfies the
  separate-model requirement of the research gate in `governance/RFC.md` (item 2, "a separate
  LLM/model to perform an independent primary-source review").
- **Human role.** The repository maintainer (GitHub `tasuku-kobayashi`) opened the reviewed
  pull request 205 and commissioned this review through the review prompt committed at
  `42eb4984…`. The same human therefore commissioned both the authoring and the review. The
  independence established here is at the model, provider, and work-context level; it is not
  organisational or human-investigator independence, and this record does not claim otherwise.
  No human expert review supplemented this pass.
- **Assistance.** No other model, service, or person contributed to this review. Web text
  extraction was attempted and failed (Section 5). The only external code executed was CPython,
  NumPy, uv, pnpm, and the repository's own tooling.
- **Git metadata.** The review commit's author/committer fields carry the intake tooling
  identity configured in the session container, not a human reviewer's name. The accountable
  role, scope, and boundary are those stated in this section.

If a stricter reading of independence requires a human investigator not involved in
commissioning the authoring, that requirement is not met here and the verdict should be read
as a model-level independent review only.

## 3. Exact identity

All identities below were re-derived from Git objects in the session clone.

| Field                           | Re-derived value                                                                                                                                 | Matches prompt |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| Repository                      | `licklider-ai/nomue-protocol`                                                                                                                    | yes            |
| Input commit                    | `014824e482d0dccac696053176f834b0f5e45fb6`                                                                                                       | yes            |
| Input commit subject            | "Record exploratory factorial QR and cancellation evidence"                                                                                      | —              |
| Sole parent                     | `f39100161cb45de15767bdb19ed54aba9489b41a` (equal to `origin/main` at review time)                                                               | yes            |
| Input tree                      | `d14fe1c07174ad5380b7de68f73acd63e859c9aa`                                                                                                       | yes            |
| Changed paths vs parent         | exactly `governance/drafts/release-4-preparation/qr-cancellation-supplement.md`, added                                                           | yes            |
| Diff statistics                 | 1 file, 174 insertions, 0 deletions                                                                                                              | —              |
| Supplement blob                 | `94cb0e0b86df2451b531660b913f8dd504f1ffed`                                                                                                       | yes            |
| Supplement SHA-256 (file bytes) | `5bfe52673f267e5db85b9284691a47b3e2698453b02799f974bb26278d928eee`                                                                               | —              |
| Extracted Python fence SHA-256  | `50a014324de141b32c284c5e5cbcc3cca9ea825ab6f8c7fe9e76d320b7c1bbfe` (59 lines)                                                                    | —              |
| Author-reported corpus SHA-256  | `2371c1ef31a25816e09d08324718dd87329c5b6aa93076fd17ae772373fff55c`                                                                               | reproduced     |
| Pull request                    | 205, draft, open, base `main` at `f39100161…`, head branch `research/r4-qr-cancellation-supplement`                                              | —              |
| Live PR head at review time     | `42eb498473bdf6d318ac9f1180f71b08cc2e3422`, sole parent `014824e…`                                                                               | see N-5        |
| Delta `014824e…` → `42eb498…`   | adds only `governance/drafts/release-4-preparation/qr-cancellation-review-prompt.md` (blob `a0bf18bd…`); supplement blob unchanged (`94cb0e0b…`) | —              |

Prior heads pinned by the supplement were fetched and confirmed as the live heads of the
cited pull requests:

| Cited PR | Pinned commit                              | Live head matches | Changed path                                                                      | State       |
| -------- | ------------------------------------------ | ----------------- | --------------------------------------------------------------------------------- | ----------- |
| 181      | `a2687f10719b399dafb511999cc1ef5b406a0c02` | yes               | `governance/drafts/release-4-preparation/semantic-research-result.md` (added)     | open        |
| 184      | `1d493622af970145925f35c8d2cd95f6cbf03cc7` | yes               | `review-inputs/r4-factorial-research-exact-head/REVIEW-RESULT.md` (added)         | open        |
| 190      | `5962cc2def5b1aca7e30d219f12a9a6486ca7b11` | yes               | `governance/drafts/release-4-preparation/numerical-research-result.md` (modified) | open, draft |

**Claimed gap verified.** The numerical result at `5962cc2…` states, in its executed-probe
paragraph: "Generic QR and a near-zero nonzero contrast projection family remain unexecuted."
Its graph-alternative table marks the full least-squares row "PRELIM-PARTIAL: exact diagonal
solve probed; generic QR/SVD binary64 implementation not run." The supplement's bounded
question therefore addresses a gap that the pinned prior result records as open. The semantic
result at `a2687f1…` records hold S6 ("No two independent installed software systems were
executed on the same unbalanced fixture"); the supplement correctly states that it does not
close S6.

No identity was missing or mismatched, so the review proceeded to numerical conclusions.

## 4. Governance inputs read

`AGENTS.md` and its ordered prerequisites (`CHARTER.md`, `AUTHORITY.md`,
`authority/authority-manifest.yaml`, `registries/requirements.yaml`,
`governance/ID-POLICY.md`, `governance/RFC.md`), the Release 4 preparation `README.md`, the
numerical research commission, the semantic research result at `a2687f1…`, the prior review at
`1d49362…`, and the numerical result at `5962cc2…`. No directory-local `AGENTS.md` governs
`governance/drafts/` or `review-inputs/`. The Release 4 preparation package records that the
supplement's kind of work (a self-contained probe before the reviewed semantic handoff) is
permitted as preliminary reuse analysis and cannot issue a final numerical disposition; the
supplement claims none.

## 5. Source access

| Source cited by the supplement                                           | Host             | Attempt                                      | Result                                                   |
| ------------------------------------------------------------------------ | ---------------- | -------------------------------------------- | -------------------------------------------------------- |
| NIST/SEMATECH Engineering Statistics Handbook, `prc/section4/prc437.htm` | `itl.nist.gov`   | direct HTTPS fetch; web text extraction tool | CONNECT rejected (HTTP 403 from proxy); `EGRESS_BLOCKED` |
| LAPACK Users' Guide, linear least squares, `lapack/lug/node27.html`      | `www.netlib.org` | direct HTTPS fetch; web text extraction tool | CONNECT rejected (HTTP 403 from proxy); `EGRESS_BLOCKED` |

Status: **`SOURCE_ACCESS_INCOMPLETE`**. No snippet, cached copy, or recollection was
substituted. Consequences:

- The supplement's characterisation of the two pages (balanced fixed-effects partition and
  residual degrees of freedom; full-rank QR/LQ versus rank-deficient driver families) was not
  re-inspected. It is consistent with how the preparation ledger and the numerical result at
  `5962cc2…` describe the same families, but that is repository-internal consistency, not
  source verification.
- The supplement itself classifies both pages as "supporting documentation, not closure of
  original-source access holds," and records that no immutable revision or raw-file hash was
  obtained. That classification is correct: neither page is an original methodological source
  (Yates, Tukey, or the original sums-of-squares literature named in the preparation ledger),
  and neither is an upstream algorithm specification of the executed routines.
- The content verdict in Section 1 does not depend on either page. Every algebraic claim the
  supplement attributes to them was independently derived in Section 6 from the design matrix
  alone. What the pages cannot supply, and what this review also does not supply, is the
  original-source basis for the factorial semantics; those holds stay exactly as recorded.

Completion work for a reviewer with access: fetch both pages, record the retrieval date and
a content hash, confirm the partition, degrees-of-freedom, and driver-family statements, and
confirm that the NIST page concerns the balanced case only.

## 6. Independent derivation and reviewer oracle

### 6.1 Algebra derived without the supplement's route

With cell order 00, 01, 10, 11, columns intercept, A, B, AB, and `n` replicates per cell
(`N = 4n`), the design rows are `(1, ±1, ±1, ±1)` with `A = (−1, −1, 1, 1)`,
`B = (−1, 1, −1, 1)`, `AB = A∘B = (1, −1, −1, 1)` as stated. Every pair of distinct columns is
orthogonal and every column has squared norm `N`, so `X'X = N·I₄` and the least-squares
coefficients are `β = X'y / N` (verified mechanically on all 945 designs by forming `X'X`
without assuming orthogonality). Sign conventions: `β_A` is half the difference between the
A = +1 mean and the A = −1 mean; `β_B` likewise; `β_AB` is one quarter of the
difference-in-differences `(m₁₁ − m₁₀) − (m₀₁ − m₀₀)`. So the main contrasts are `2β` and the
interaction contrast is `4β_AB`, as the supplement states. Residual degrees of freedom are
`N − 4` for the full-rank four-parameter model (stated, not computed, in the supplement).
Effect sums of squares: the extra sum of squares from dropping column `j` equals
`(X'y)_j² / N = N·β_j²`, and `SST = Σ N β_j² + SSE` for `j = 1..3`.

NIST-to-coded mapping: the balanced two-way marginal-mean formulas
`SSA = 2n Σ_i (ȳ_i·· − ȳ)²`, `SSB = 2n Σ_j (ȳ_·j· − ȳ)²`,
`SSAB = n Σ_ij (ȳ_ij − ȳ_i·· − ȳ_·j· + ȳ)²`, `SSE = Σ (y − ȳ_ij)²` reduce, for two levels,
to `N β_A²`, `N β_B²`, `N β_AB²`, and the within-cell residual respectively. This mapping is an
identity of the balanced complete design. It proves nothing about sampling distributions,
error variance homogeneity, the validity of the F ratio, unbalanced weighting, or which
hypothesis an unbalanced convention tests; the supplement says the same.

### 6.2 Reviewer-owned oracle

The oracle below (SHA-256 of the fenced bytes
`908911d6014ecc84d62692fff1c834aec6c35ae7e8b7ee51f3a3806f239d9d4d`) uses three arrangements
that differ from the author's orthogonality closed form, all in exact rational arithmetic on
the admitted binary64 inputs:

- **R1** exact normal equations `X'X β = X'y` solved by Gauss-Jordan elimination (no `N·I`
  assumption; `X'X` is also compared to `N·I`);
- **R2** extra sums of squares from refitting three reduced models without one column each;
- **R3** the NIST-style marginal-mean partition and total sum of squares.

It also inspects the floating routes, re-derives the summary table from the author's corpus
rows, and runs the symmetry and extra families requested by the review prompt. Neither the
author's function nor any Protocol kernel is used as truth. The intended inputs are regenerated
from the formula stated in the supplement; that formula is the only shared element.

```python
# Reviewer-owned exact oracle for the Release 4 QR and cancellation supplement.
# Different algebraic arrangement from the author's orthogonality route:
#   R1 exact normal equations solved by Gauss-Jordan (no X'X = N I assumption)
#   R2 extra sum of squares from reduced-model refits
#   R3 NIST balanced two-way marginal-mean formulas
# Truth is always reconstructed from admitted binary64 inputs.
from fractions import Fraction as Q
import hashlib, json, math, platform, sys
import numpy as np

SIGNS = [(1, -1, -1, 1), (1, -1, 1, -1), (1, 1, -1, -1), (1, 1, 1, 1)]  # cells 00,01,10,11


def gauss_jordan(A, b):
    n = len(A)
    M = [list(map(Q, A[i])) + [Q(b[i])] for i in range(n)]
    for col in range(n):
        piv = next(r for r in range(col, n) if M[r][col] != 0)
        M[col], M[piv] = M[piv], M[col]
        p = M[col][col]
        M[col] = [v / p for v in M[col]]
        for r in range(n):
            if r != col and M[r][col] != 0:
                f = M[r][col]
                M[r] = [a - f * c for a, c in zip(M[r], M[col])]
    return [M[i][n] for i in range(n)]


def fit_exact(xrows, y):
    N, p = len(xrows), len(xrows[0])
    XtX = [[sum(xrows[i][a] * xrows[i][c] for i in range(N)) for c in range(p)] for a in range(p)]
    Xty = [sum(xrows[i][a] * y[i] for i in range(N)) for a in range(p)]
    beta = gauss_jordan(XtX, Xty)
    sse = sum((y[i] - sum(xrows[i][a] * beta[a] for a in range(p))) ** 2 for i in range(N))
    return beta, sse, XtX


def nist_partition(y, n):
    # cells 00,01,10,11 with n replicates; factor A = first index, B = second
    cell = [y[c * n:(c + 1) * n] for c in range(4)]
    m = [sum(v) / n for v in cell]
    gm = sum(y) / len(y)
    mA = [(m[0] + m[1]) / 2, (m[2] + m[3]) / 2]
    mB = [(m[0] + m[2]) / 2, (m[1] + m[3]) / 2]
    ssA = 2 * n * sum((v - gm) ** 2 for v in mA)
    ssB = 2 * n * sum((v - gm) ** 2 for v in mB)
    ssAB = n * sum((m[2 * i + j] - mA[i] - mB[j] + gm) ** 2 for i in range(2) for j in range(2))
    sse = sum((v - m[c]) ** 2 for c in range(4) for v in cell[c])
    sst = sum((v - gm) ** 2 for v in y)
    return ssA, ssB, ssAB, sse, sst, m


def intended(n, e, k, axis, delta_override=None, spread=Q(1, 4)):
    offset = Q(2) ** e
    delta = Q(2) ** (-k) if delta_override is None else delta_override
    return [offset + SIGNS[c][axis] * delta + (2 * r - (n - 1)) * spread for c in range(4) for r in range(n)], delta


def naive_sum(vals):
    s = 0.0
    for v in vals:
        s += v
    return s


def back_substitution(r, rhs):
    x = np.zeros(4)
    for i in range(3, -1, -1):
        acc = rhs[i]
        for j in range(i + 1, 4):
            acc = acc - r[i, j] * x[j]
        x[i] = acc / r[i, i]
    return x


def float_routes(X, y, q, r):
    qr = np.linalg.solve(r, q.T @ y)
    centered = y - y[0]
    qr_c = np.linalg.solve(r, q.T @ centered)
    return qr, qr_c, centered


report = {}
report["env"] = dict(python=sys.version, numpy=np.__version__, platform=platform.platform(),
                     machine=platform.machine())
cfg = np.show_config("dicts")["Build Dependencies"]
report["env"]["blas"] = cfg["blas"].get("openblas configuration", cfg["blas"].get("name"))
report["env"]["lapack"] = cfg["lapack"].get("openblas configuration", cfg["lapack"].get("name"))
report["qr_doc_mentions_lapack"] = [w for w in ("geqrf", "orgqr", "gesdd", "gelsd") if w in (np.linalg.qr.__doc__ or "")]

mismatch = {"beta_vs_orthogonality": 0, "r2_vs_nbeta2": 0, "r3_vs_nbeta2": 0, "sse_r1_vs_r3": 0,
            "partition": 0, "contrast_scaling": 0, "author_truth": 0, "author_errors": 0}
centering_inexact_cases = 0
centering_inexact_obs = 0
builtin_vs_naive_diff = 0
builtin_vs_fsum_diff = 0
solve_vs_backsub_diff = 0
qr_vs_lstsq_diff = 0
r_offdiag_max = 0.0
r_diag_dev_max = 0.0
other_axis_false_nonzero = {"qr": 0, "centered_qr": 0, "direct_naive": 0}
false_nonzero_mag = {"qr": Q(0), "centered_qr": Q(0)}
false_nonzero_rel_ulp = {"qr": Q(0), "centered_qr": Q(0)}
reversal_exact_ok = exchange_exact_ok = perm_exact_ok = 0
reversal_float_bitdiff = exchange_float_bitdiff = perm_float_bitdiff = 0
perm_direct_naive_bitdiff = 0
author_rows = json.load(open(sys.argv[1])) if len(sys.argv) > 1 else None
recount = {"direct": [0, Q(0), 0], "qr": [0, Q(0), 0], "centered_qr": [0, Q(0), 0]}
author_idx = 0
ncases = 0
for n in range(2, 17):
    for e in (0, 20, 40):
        for k in (0, 20, 40, 52, 53, 54, 60):
            for axis in (1, 2, 3):
                ncases += 1
                ints, delta = intended(n, e, k, axis)
                y = np.array([float(v) for v in ints], dtype=np.float64)
                ex = [Q(float(v)) for v in y]
                N = 4 * n
                xrows = [SIGNS[c] for c in range(4) for _ in range(n)]
                beta, sse, XtX = fit_exact(xrows, ex)
                # cross-check R1 against the orthogonality closed form (author's arrangement)
                orth = [sum(ex[i] * xrows[i][j] for i in range(N)) / N for j in range(4)]
                if beta != orth:
                    mismatch["beta_vs_orthogonality"] += 1
                if XtX != [[N if a == c else 0 for c in range(4)] for a in range(4)]:
                    mismatch["beta_vs_orthogonality"] += 1
                # R2 extra sum of squares
                for j in (1, 2, 3):
                    red = [tuple(v for a, v in enumerate(row) if a != j) for row in xrows]
                    _, sse_red, _ = fit_exact(red, ex)
                    if sse_red - sse != N * beta[j] ** 2:
                        mismatch["r2_vs_nbeta2"] += 1
                # R3 NIST partition
                ssA, ssB, ssAB, sse3, sst, m = nist_partition(ex, n)
                if (ssA, ssB, ssAB) != tuple(N * beta[j] ** 2 for j in (1, 2, 3)):
                    mismatch["r3_vs_nbeta2"] += 1
                if sse3 != sse:
                    mismatch["sse_r1_vs_r3"] += 1
                if sst != ssA + ssB + ssAB + sse:
                    mismatch["partition"] += 1
                # contrast scaling claims: main contrast = 2*beta, DiD = 4*beta_AB
                cA = (m[2] + m[3]) / 2 - (m[0] + m[1]) / 2
                cB = (m[1] + m[3]) / 2 - (m[0] + m[2]) / 2
                did = (m[3] - m[2]) - (m[1] - m[0])
                if (cA, cB, did) != (2 * beta[1], 2 * beta[2], 4 * beta[3]):
                    mismatch["contrast_scaling"] += 1
                # floating routes
                X = np.array(xrows, dtype=float)
                q, r = np.linalg.qr(X, mode="reduced")
                r_offdiag_max = max(r_offdiag_max, float(np.max(np.abs(r - np.diag(np.diag(r))))))
                r_diag_dev_max = max(r_diag_dev_max, float(np.max(np.abs(np.abs(np.diag(r)) - math.sqrt(N)))))
                qr, qr_c, centered = float_routes(X, y, q, r)
                rhs = q.T @ y
                if not np.array_equal(back_substitution(r, rhs), qr):
                    solve_vs_backsub_diff += 1
                ls = np.linalg.lstsq(X, y, rcond=None)[0]
                if not np.array_equal(ls, qr):
                    qr_vs_lstsq_diff += 1
                # centering exactness
                inexact = sum(1 for i in range(N) if Q(float(centered[i])) != ex[i] - ex[0])
                if inexact:
                    centering_inexact_cases += 1
                    centering_inexact_obs += inexact
                # summation-order sensitivity of the direct route on this interpreter
                cells = [y[c * n:(c + 1) * n] for c in range(4)]
                m_builtin = [sum(float(v) for v in c) / n for c in cells]
                m_naive = [naive_sum([float(v) for v in c]) / n for c in cells]
                m_fsum = [math.fsum(c) / n for c in cells]
                if m_builtin != m_naive:
                    builtin_vs_naive_diff += 1
                if m_builtin != m_fsum:
                    builtin_vs_fsum_diff += 1
                direct_naive = [naive_sum([m_naive[c] * SIGNS[c][j] for c in range(4)]) / 4 for j in range(4)]
                # false nonzero on the two non-selected axes (their exact coefficient is zero)
                for j in (1, 2, 3):
                    if j == axis or beta[j] != 0:
                        continue
                    if qr[j] != 0:
                        other_axis_false_nonzero["qr"] += 1
                    if qr_c[j] != 0:
                        other_axis_false_nonzero["centered_qr"] += 1
                    if direct_naive[j] != 0:
                        other_axis_false_nonzero["direct_naive"] += 1
                # magnitude of false nonzeros on the selected axis relative to ulp(offset)
                if beta[axis] == 0:
                    ulp = Q(math.ulp(float(Q(2) ** e)))
                    for name, val in (("qr", qr[axis]), ("centered_qr", qr_c[axis])):
                        if val != 0:
                            false_nonzero_mag[name] = max(false_nonzero_mag[name], abs(Q(float(val))))
                            false_nonzero_rel_ulp[name] = max(false_nonzero_rel_ulp[name], abs(Q(float(val))) / ulp)
                # symmetry checks: factor reversal, factor exchange, observation permutation
                rev = [(s[0], -s[1], s[2], -s[3]) for s in xrows]
                b_rev, sse_rev, _ = fit_exact(rev, ex)
                if b_rev == [beta[0], -beta[1], beta[2], -beta[3]] and sse_rev == sse:
                    reversal_exact_ok += 1
                Xr = np.array(rev, dtype=float)
                qx, rx = np.linalg.qr(Xr, mode="reduced")
                qr_rev = np.linalg.solve(rx, qx.T @ y)
                if not np.array_equal(qr_rev * np.array([1, -1, 1, -1.0]), qr):
                    reversal_float_bitdiff += 1
                # exchange: relabel factors -> cell order becomes 00,10,01,11
                order = [0, 2, 1, 3]
                ex_x = [ex[c * n + i] for c in order for i in range(n)]
                y_x = np.array([y[c * n + i] for c in order for i in range(n)])
                b_x, sse_x, _ = fit_exact(xrows, ex_x)
                if b_x == [beta[0], beta[2], beta[1], beta[3]] and sse_x == sse:
                    exchange_exact_ok += 1
                qr_x = np.linalg.solve(r, q.T @ y_x)
                if not np.array_equal(qr_x[[0, 2, 1, 3]], qr):
                    exchange_float_bitdiff += 1
                # within-cell observation reversal
                ex_p = [ex[c * n + (n - 1 - i)] for c in range(4) for i in range(n)]
                y_p = np.array([y[c * n + (n - 1 - i)] for c in range(4) for i in range(n)])
                b_p, sse_p, _ = fit_exact(xrows, ex_p)
                if b_p == beta and sse_p == sse:
                    perm_exact_ok += 1
                if not np.array_equal(np.linalg.solve(r, q.T @ y_p), qr):
                    perm_float_bitdiff += 1
                cells_p = [y_p[c * n:(c + 1) * n] for c in range(4)]
                if [naive_sum(list(c)) / n for c in cells_p] != m_naive:
                    perm_direct_naive_bitdiff += 1
                # compare with the author's corpus rows if supplied
                if author_rows is not None:
                    row = author_rows[author_idx]
                    author_idx += 1
                    assert (row["n"], row["offset_exponent"], row["k"], row["axis"]) == (n, e, k, axis)
                    if Q(row["truth"]) != beta[axis] or Q(row["intended"]) != delta or Q(row["input_loss"]) != abs(beta[axis] - delta):
                        mismatch["author_truth"] += 1
                    vals = [float.fromhex(row[name]) for name in ("direct", "qr", "centered_qr")]
                    my_err = [abs(Q(v) - beta[axis]) for v in vals]
                    if [str(x) for x in my_err] != row["errors"]:
                        mismatch["author_errors"] += 1
                    for j, name in enumerate(("direct", "qr", "centered_qr")):
                        if my_err[j] != 0:
                            recount[name][0] += 1
                        recount[name][1] = max(recount[name][1], my_err[j])
                        if beta[axis] == 0 and vals[j] != 0:
                            recount[name][2] += 1

report["cases"] = ncases
report["exact_cross_checks_mismatches"] = mismatch
report["author_corpus_recount"] = {k: [v[0], str(v[1]), v[2]] for k, v in recount.items()} if author_rows else None
report["centering"] = dict(cases_with_inexact_subtraction=centering_inexact_cases,
                           inexact_observations=centering_inexact_obs)
report["direct_summation"] = dict(builtin_sum_differs_from_naive_loop=builtin_vs_naive_diff,
                                  builtin_sum_differs_from_fsum=builtin_vs_fsum_diff)
report["qr_structure"] = dict(max_abs_offdiagonal_R=r_offdiag_max, max_abs_dev_diag_from_sqrtN=r_diag_dev_max,
                              solve_vs_manual_backsub_bitdiff_cases=solve_vs_backsub_diff,
                              qr_vs_lstsq_svd_bitdiff_cases=qr_vs_lstsq_diff)
report["other_axis_false_nonzero"] = other_axis_false_nonzero
report["false_nonzero_selected_axis"] = {k: dict(max_abs=str(v), max_abs_float=float(v), max_rel_ulp_offset=float(false_nonzero_rel_ulp[k]))
                                         for k, v in false_nonzero_mag.items()}
report["symmetry"] = dict(reversal_exact_ok=reversal_exact_ok, exchange_exact_ok=exchange_exact_ok,
                          permutation_exact_ok=perm_exact_ok, reversal_qr_bitdiff=reversal_float_bitdiff,
                          exchange_qr_bitdiff=exchange_float_bitdiff, permutation_qr_bitdiff=perm_float_bitdiff,
                          permutation_direct_naive_bitdiff=perm_direct_naive_bitdiff)

# Extra families not in the author's corpus: tiny nonzero coefficients that survive projection,
# subnormal coefficients, exact-zero all axes at large offset.
extra = []
for label, n, e, delta, spread in (("tiny_2^-60_spread_2^-70", 3, None, Q(2) ** -60, Q(2) ** -70),
                                    ("subnormal_2^-1070_spread_2^-1074", 2, None, Q(2) ** -1070, Q(2) ** -1074),
                                    ("zero_all_axes_offset_2^40", 4, 40, Q(0), Q(1, 4)),
                                    ("tiny_2^-30_offset_2^20", 2, 20, Q(2) ** -30, Q(1, 4))):
    for axis in (1, 2, 3):
        off = Q(0) if e is None else Q(2) ** e
        ints = [off + SIGNS[c][axis] * delta + (2 * r - (n - 1)) * spread for c in range(4) for r in range(n)]
        y = np.array([float(v) for v in ints])
        ex = [Q(float(v)) for v in y]
        xrows = [SIGNS[c] for c in range(4) for _ in range(n)]
        beta, sse, _ = fit_exact(xrows, ex)
        X = np.array(xrows, dtype=float)
        q, r = np.linalg.qr(X, mode="reduced")
        qr, qr_c, _ = float_routes(X, y, q, r)
        cells = [y[c * n:(c + 1) * n] for c in range(4)]
        mn = [naive_sum(list(c)) / n for c in cells]
        direct = [naive_sum([mn[c] * SIGNS[c][j] for c in range(4)]) / 4 for j in range(4)]
        extra.append(dict(family=label, axis=axis, truth=str(beta[axis]), input_preserved=beta[axis] == delta,
                          direct=direct[axis].hex(), qr=float(qr[axis]).hex(), centered_qr=float(qr_c[axis]).hex(),
                          all_axes_truth=[str(b) for b in beta[1:]],
                          qr_nonzero_where_truth_zero=[bool(qr[j] != 0) for j in (1, 2, 3) if beta[j] == 0]))
report["extra_families"] = extra
out = json.dumps(report, sort_keys=True, indent=1)
print(out)
print("oracle_report_sha256", hashlib.sha256(out.encode()).hexdigest(), file=sys.stderr)
```

Usage: run the author's fence with one appended line
`json.dump(rows, open("corpus_rows.json", "w"))` after the `payload = …` line (this does not
change the computed rows or the printed hash), then run the oracle with that file as its
argument. The oracle report embeds the environment strings, so its own digest is
environment-specific by construction: `19740b3e1c4a1d91d3648eac524a7b01895caaf9e710fe7133b87d1f3ad597c4`
on Python 3.12.11 / NumPy 2.3.5 and `9bbfdfa8c1ce97652e4bc54e8fd4f153581da83d1b59a2d15b7eef816b1944ee`
on Python 3.11.15 / NumPy 2.4.6.

### 6.3 Oracle results (945 corpus cases, both interpreters unless stated)

| Check                                                                                       | Result                                                                                                                |
| ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `X'X = N·I₄` formed without assuming it                                                     | 945/945                                                                                                               |
| R1 Gauss-Jordan `β` equals orthogonality closed form                                        | 945/945, all four coefficients                                                                                        |
| R2 extra SS from reduced refits equals `N·β_j²`, `j = 1..3`                                 | 945/945 (2,835 refits)                                                                                                |
| R3 NIST marginal-mean `SSA, SSB, SSAB` equal `N·β_j²`; R3 `SSE` equals R1 `SSE`             | 945/945                                                                                                               |
| `SST = SSA + SSB + SSAB + SSE`                                                              | 945/945                                                                                                               |
| Main contrasts `= 2β`, difference-in-differences `= 4β_AB`                                  | 945/945                                                                                                               |
| Author `truth`, `intended`, `input_loss` strings equal oracle values                        | 945/945                                                                                                               |
| Author `errors` strings recomputed from the recorded hex results against oracle truth       | 945/945                                                                                                               |
| Author summary table recounted from rows (nonzero error / largest / false nonzero)          | direct 144 / see SF-1 / 0; QR 850 / `2340808394435/9007199254740992` / 462; centered 885 / `1/1125899906842624` / 501 |
| `input_changed`, `exact_zero_after_input` recounted                                         | 666, 525                                                                                                              |
| Exact routes invariant under factor reversal (A → −A), factor exchange, in-cell permutation | 945/945 each                                                                                                          |
| Floating QR bitwise-invariant under factor reversal / exchange / in-cell permutation        | 945 / 19 / 55 cases invariant (926 and 890 differ bitwise)                                                            |
| `y − y[0]` centering exact for every observation                                            | inexact in 135 cases (1,440 observations); see N-3                                                                    |
| `np.linalg.qr` documentation names LAPACK `dgeqrf`/`dorgqr`; `np.linalg.solve` names `gesv` | confirmed from docstrings                                                                                             |
| QR route bitwise equal to `np.linalg.lstsq` (SVD-based)                                     | 0/945 (differs in every case: the executed route is not a mislabeled SVD solve)                                       |
| Max off-diagonal magnitude of computed `R`; max deviation of `abs(diag(R))` from `√N`       | `2.1e-15`; `1.8e-15`                                                                                                  |
| `np.linalg.solve(r, …)` bitwise equal to a naive back-substitution                          | differs in 54 cases; see N-1                                                                                          |
| Builtin `sum()` equals a naive sequential loop / equals `math.fsum`                         | 3.12: differs from loop in 15 cases, equals `fsum` in all; 3.11: equals loop in all, differs from `fsum` in 15        |

Distribution facts recomputed from the rows: the 525 exact-zero cases are all `(offset, k)`
cells where `2^−k` is below half an ulp of the offset plus spread (`(0,54)` partially, `(0,60)`,
every `k ≥ 40` at offset `2^20`, every `k ≥ 20` at offset `2^40`). Direct-route nonzero errors
occur only at offset `2^0` with `k ∈ {52, 53, 54, 60}`, that is, when the surviving admitted
coefficient is itself a few ulps of the replicate spread. The largest uncentered-QR error is at
`n = 13, offset 2^40, k = 0, axis A` (truth 1, error ≈ `2.6e-4`); the largest centered-QR error
is at `n = 7, offset 1, k = 0, axis A` (truth 1, error `2^−50`). Among nonzero-truth cases the
uncentered QR relative error exceeds 1 in 85 cases (maximum ≈ 2,480 at
`n = 15, offset 1, k = 60, axis B`) and the centered QR in 97 cases (maximum ≈ 9,916, same
case); these are cases where the admitted coefficient is a tiny projection residue, and they
substantiate the supplement's statement that a small normwise residual does not certify an
individual near-zero coefficient.

### 6.4 Extra families outside the author's corpus

| Family                                                | Axis | Truth preserved by input | Direct (naive loop) | Uncentered QR                                                    | Centered QR                          |
| ----------------------------------------------------- | ---- | ------------------------ | ------------------- | ---------------------------------------------------------------- | ------------------------------------ |
| `2^−60` coefficient, no offset, spread `2^−70`, n = 3 | A/B  | yes                      | exact               | `0x1.ffffffffffffdp-61` (≈ 1.5 ulp low); other zero axes nonzero | same as QR                           |
|                                                       | AB   | yes                      | exact               | exact; axis B spurious nonzero                                   | exact                                |
| subnormal `2^−1070`, spread `2^−1074`, n = 2          | all  | yes                      | exact               | exact                                                            | exact                                |
| all three coefficients exactly zero, offset `2^40`    | A    | yes                      | zero                | zero on A; spurious `≠ 0` on B                                   | zero                                 |
|                                                       | B    | yes                      | zero                | `−0x1.0000000000001p-14` on B                                    | `−0x1.0000000000001p-55`             |
|                                                       | AB   | yes                      | zero                | `−0` on AB; spurious on B                                        | `−0x1p-55`                           |
| `2^−30` coefficient, offset `2^20`, n = 2             | A    | yes                      | exact               | `0x1.0f876ccdf6cdap-30` (≈ 6 % high)                             | `0x1.ffffff6cfd51fp-31` (≈ 2e−8 low) |

Spurious nonzero results on the uncentered QR route in the author's corpus reach
`4596467122019239/2^64 ≈ 2.49e−4`, which is `≈ 1.02 ulp(2^40)`; on the centered route they
reach `≈ 5.9e−16` (`≈ 2.7 ulp(1)`). On the two non-selected axes (whose exact coefficient is
zero in every corpus case) the uncentered QR route is nonzero in 1,672 of 1,890 axis instances
and the centered route in 1,780; a naive sequential direct route is nonzero in 10.

## 7. Findings

### SF-1 (`SHOULD-FIX`) — the "sequential cell means" route is compensated summation on the disclosed interpreter, and the corpus hash depends on the Python minor version, not the BLAS build

Locations: Source inspection section, "Floating routes use sequential cell means and NumPy
QR respectively"; Observed transcript table row "Sequential cell means"; Observed transcript
paragraph attributing environment dependence to the NumPy/OpenBLAS build.

Evidence. CPython 3.12 changed the builtin `sum()` to use Neumaier compensated summation for
floats. The probe's direct route computes cell means with `sum(float(v) for v in …)` and the
contrast with `sum(m[c]*signs[c][j] …)`. On Python 3.12.11 the builtin equals `math.fsum` in
all 945 cases and differs from a naive sequential loop in 15; on Python 3.11.15 it equals the
naive loop in all cases and differs from `fsum` in 15 (`sum([1e100, 1.0, -1e100])` returns
`1.0` on 3.12 and `0.0` on 3.11). Consequently:

| Environment                                                | Corpus SHA-256    | Direct largest absolute error | QR / centered rows |
| ---------------------------------------------------------- | ----------------- | ----------------------------- | ------------------ |
| Author: Python 3.12.13, NumPy 2.3.5, OpenBLAS 0.3.30       | `2371c1ef…`       | `3/45035996273704960`         | as published       |
| Reviewer: Python 3.12.11, NumPy 2.3.5, OpenBLAS 0.3.30     | `2371c1ef…` match | `3/45035996273704960`         | identical          |
| Reviewer: Python 3.12.11, NumPy 2.4.6, OpenBLAS 0.3.31.188 | `2371c1ef…` match | `3/45035996273704960`         | identical          |
| Reviewer: Python 3.11.15, NumPy 2.4.6, OpenBLAS 0.3.31.188 | `ca494795…`       | `1/7318349394477056`          | identical          |

So the LAPACK/OpenBLAS routes reproduced bit-for-bit across two OpenBLAS builds, and the only
environment-dependent quantity observed was the pure-Python direct route through the
interpreter's `sum()`. The supplement's counts (144 nonzero errors, 0 false nonzeros) hold on
both interpreters; the label and the attribution do not. Comparing "Neumaier-compensated cell
means" with generic QR is a legitimate comparison, but it is not the comparison the text names,
and a reader could take the direct row as evidence about naive sequential accumulation.

Repair condition: rename the route to state that it uses the interpreter's builtin `sum()`
(Neumaier-compensated on CPython ≥ 3.12), or replace the two `sum()` calls with an explicit
sequential loop and re-run; state that the corpus hash is specific to CPython ≥ 3.12 semantics;
and list the interpreter, not only the BLAS build, as the environment dependency of the direct
row. Any of these keeps the transcript honest; none changes the QR rows.

### N-1 (`NICE-TO-HAVE`) — name the executed LAPACK path exactly

The supplement says the probe "explicitly constructs QR and solves its triangular system."
The executed calls are `np.linalg.qr` (Householder `dgeqrf` + `dorgqr`, per NumPy's
documentation) followed by `np.linalg.solve` (`gesv`: LU with partial pivoting on the 4×4 `R`),
not a triangular solver. The computed `R` is not exactly diagonal (off-diagonals up to
`2.1e−15`), which is the mechanism by which a single-axis input perturbs the other axes.
Recording the routine names makes the graph reproducible and avoids reading "triangular solve"
as `dtrtrs`.

### N-2 (`NICE-TO-HAVE`) — report false-nonzero magnitude alongside the count

The "Nonzero result when exact coefficient is zero" column is literally correct and the text
warns that a tiny residual counts. The counted values nevertheless span from `2^−163` to
`≈ 1 ulp(offset)`; giving the maximum magnitude per route (Section 6.4) and the non-selected-axis
counts would prevent the column from being read as a severity ranking. The witness text is
accurate as written.

### N-3 (`NICE-TO-HAVE`) — quantify centering inexactness

"Subtraction itself can round" is stated, so no exact-subtraction assumption is hidden, and the
exact truth never uses the centered vector. The oracle shows that `y − y[0]` is inexact in 135
of 945 cases (1,440 observations). Recording that count in the transcript would make the
comparison of the centered route self-contained.

### N-4 (`NICE-TO-HAVE`) — state that no binary64 sum of squares, mean square, or F was computed

The transcript reports coefficients only. Effect sums of squares `N·β²`, residual sum of
squares, mean squares, F ratios, and F tails are stated algebraically or listed as remaining
work, but no floating value of any of them is computed. The remaining-work paragraph names
"squared-effect/F projection"; an explicit sentence that the transcript contains no floating SS
or F value would remove any ambiguity.

### N-5 (`NICE-TO-HAVE`) — pin the reviewable head in the pull request

Pull request 205's live head is `42eb498…`, whose sole change over the reviewed input
`014824e…` is the review prompt file. The supplement blob is identical at both commits. The PR
description or the supplement should state which commit is the reviewable head so that later
readers do not treat the prompt file as part of the reviewed content.

### N-6 (`NICE-TO-HAVE`) — add the commission's symmetry probes to the floating routes

The numerical commission requires factor reversal, factor exchange, and observation permutation
probes. The prior result at `5962cc2…` ran them on exact routes only. The oracle shows the
floating QR route is bitwise-invariant under factor reversal but changes bits under factor
exchange in 926 cases and under in-cell permutation in 890 cases (naive direct: 24). Recording
this in the supplement would document that the QR graph is order-sensitive in exactly the way
the commission asks each graph to disclose.

### N-7 (`NICE-TO-HAVE`) — thread pinning is not needed for this probe, and that can be said

Re-running with `OPENBLAS_NUM_THREADS=1` produced the same corpus hash on both interpreters
(4 hardware threads available). For 4-column QR the BLAS calls are below any threading
threshold; a sentence saying so would close the "thread count was not pinned" caveat without a
portability claim.

## 8. Reproduction transcript

Environment: Linux 6.18.44 x86_64 (glibc 2.39), 4 hardware threads, no `*_NUM_THREADS`
variables set unless stated. NumPy wheels bundle their own OpenBLAS (`USE64BITINT DYNAMIC_ARCH
NO_AFFINITY Haswell MAX_THREADS=64`; SIMD dispatch found `X86_V3`/`X86_V4`, no AVX-512 ICL/SPR).

| Run | Interpreter                                | NumPy / OpenBLAS     | Threads | Cases | Corpus SHA-256                                                     |
| --- | ------------------------------------------ | -------------------- | ------- | ----- | ------------------------------------------------------------------ |
| 1   | CPython 3.11.15 (system, GCC 13.3)         | 2.4.6 / 0.3.31.188.0 | default | 945   | `ca4947956e5b97a25f96d8ac62a572726a187d6095133ea9409f9f6457f5be7a` |
| 2   | CPython 3.11.15                            | 2.4.6 / 0.3.31.188.0 | 1       | 945   | `ca4947956e5b97a25f96d8ac62a572726a187d6095133ea9409f9f6457f5be7a` |
| 3   | CPython 3.12.11 (uv-managed, Clang 20.1.4) | 2.3.5 / 0.3.30       | default | 945   | `2371c1ef31a25816e09d08324718dd87329c5b6aa93076fd17ae772373fff55c` |
| 4   | CPython 3.12.11                            | 2.3.5 / 0.3.30       | 1       | 945   | `2371c1ef31a25816e09d08324718dd87329c5b6aa93076fd17ae772373fff55c` |
| 5   | CPython 3.12.11                            | 2.4.6 / 0.3.31.188.0 | default | 945   | `2371c1ef31a25816e09d08324718dd87329c5b6aa93076fd17ae772373fff55c` |

All five runs printed `input_changed 666`, `exact_zero_after_input 525`, the QR row
`850 / 2340808394435/9007199254740992 / 462`, the centered row `885 / 1/1125899906842624 / 501`,
the direct row `144 / … / 0`, and both witnesses with the published hex values. All 945
in-script orthogonality and partition assertions passed in every run. The fence was extracted
byte-exactly from the blob (single fence, 59 lines, SHA-256 `50a01432…`). Explanation of the
run 1–2 difference is given in SF-1; it is not a BLAS, LAPACK, threading, or architecture
effect.

## 9. Boundary checks requested by the review prompt

| Item                                                                                                                                      | Result                                                                                                                                                                                                                      |
| ----------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Generic QR actually executed, not mislabeled SVD or `DGELS`                                                                               | Confirmed (Householder QR via `dgeqrf`/`dorgqr`; differs bitwise from SVD-based `lstsq` in 945/945; supplement disclaims `DGELS`)                                                                                           |
| Unbalanced two-system semantic comparison (S6) not closed                                                                                 | Confirmed; the supplement states it does not close S6 and only balanced cells are probed                                                                                                                                    |
| No production graph selected                                                                                                              | Confirmed ("Centering is a compared graph, not a selected repair"; "No tolerance is inferred")                                                                                                                              |
| Remaining squared-effect / F projection gaps                                                                                              | Entirely open: no binary64 SS, MS, F, or tail value computed; rank-deficient, missing-cell, overflow/underflow-of-squares, interval, and admission work untouched                                                           |
| Counts concern selected axis only, not statistical decisions or tolerances                                                                | Confirmed in text; non-selected-axis behaviour quantified in Section 6.4                                                                                                                                                    |
| False-nonzero label or text overstates the finding                                                                                        | Not overstated; magnitude reporting recommended (N-2)                                                                                                                                                                       |
| Intended rational vs binary64 input projection vs subsequent arithmetic                                                                   | Separated correctly: truth is reconstructed from admitted inputs; 666 projections changed the intended coefficient, 525 to exact zero; no exact-subtraction assumption is hidden                                            |
| Release 3 artifacts, numbering, authoritative files, source holds, supported-execution boundary, tolerances, registered identities, gates | Unchanged: the sole change is one added informative draft; no registry, schema, conformance, reference, generated, gate, or evidence path is touched; no normative keyword, requirement anchor, or identifier is introduced |

## 10. Validation

Executed in the session clone with `pnpm install --frozen-lockfile` (pnpm 11.7.0, Node
v22.22.2).

| Check                                        | At fixed input `014824e…`         | After adding this report |
| -------------------------------------------- | --------------------------------- | ------------------------ |
| `pnpm exec prettier --check` (changed files) | pass                              | pass                     |
| `pnpm format:check` (repository)             | not run at input; see next column | pass                     |
| `pnpm lint:markdown`                         | 356 files, 0 issues               | 357 files, 0 issues      |
| `pnpm typecheck`                             | pass                              | pass                     |
| `pnpm validate` (tsx CLI wrapper)            | `validate: OK`                    | `validate: OK`           |
| `node --import tsx tooling/src/validate.ts`  | `validate: OK`                    | `validate: OK`           |
| `git diff --check`                           | clean                             | clean                    |

The tsx CLI's IPC socket was not denied in this environment, so both invocation forms ran; the
author's report of a denied IPC socket under `pnpm validate` was not reproduced here and is
environment-specific. The full `pnpm check` test suite was not run: no authoritative artifact
changes at either head. Hosted CI for pull request 205 was not consulted as evidence.

## 11. Remaining actions and reopen conditions

1. Author: apply SF-1 (route label and interpreter dependence) and, optionally, N-1 to N-7 in a
   successor commit; a successor changing the fence needs a fresh exact-head review of the new
   fence digest and transcript.
2. A reviewer with network access: complete Section 5 for the two documentation pages.
3. Programme: the supplement remains informative input to the numerical commission; the
   programme disposition stays `INPUT_INCOMPLETE`, all source holds (including S6) stay open,
   and squared-effect/F projection, rank-deficient designs, and admission evidence remain
   unprobed.
4. Reopen this review if the supplement blob, the extracted fence, or the pinned prior heads
   change, or if a primary-source inspection contradicts the algebra stated in Section 6.1.

No merge, ratification, identifier issuance, algorithm adoption, public discussion, or website
claim is made or authorised by this record.

## 12. Provenance

- Review date: 2026-09-08.
- Reviewed head: `014824e482d0dccac696053176f834b0f5e45fb6` (tree `d14fe1c0…`, blob
  `94cb0e0b…`).
- Reviewer: Anthropic `claude-fable-5-1` in a Claude Code remote session; no other model or
  person contributed; the human commissioner is the repository maintainer who also opened the
  reviewed pull request (Section 2).
- Reviewer oracle SHA-256: `908911d6014ecc84d62692fff1c834aec6c35ae7e8b7ee51f3a3806f239d9d4d`;
  oracle report digests `19740b3e…` (3.12/2.3.5) and `9bbfdfa8…` (3.11/2.4.6).
- Author fence SHA-256: `50a014324de141b32c284c5e5cbcc3cca9ea825ab6f8c7fe9e76d320b7c1bbfe`.
- Inspected sources: none of the two cited web pages could be retrieved (Section 5); all other
  inputs are repository Git objects at the commits named in Section 3.
- Only file created by this review: `review-inputs/r4-qr-cancellation-supplement/REVIEW-RESULT.md`.
  The reviewed supplement is unchanged.
