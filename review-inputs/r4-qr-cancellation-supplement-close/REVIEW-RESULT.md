# Release 4 QR and Cancellation Supplement — Independent Close Review of the Summation Repair

**Status: informative independent review; non-normative; not adopted.**

## 1. Verdict

| Dimension            | Result                                                                                                                |
| -------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Content verdict      | **`GO`** for the corrected supplement at the fixed repair input only                                                  |
| SF-1                 | **`CLOSED`** (Section 6)                                                                                              |
| N-1 to N-7 recording | accepted as recorded; individual dispositions in Section 7                                                            |
| Source-access status | **`SOURCE_ACCESS_INCOMPLETE`** (both cited documentation pages remain blocked by the egress proxy; Section 5)         |
| Regression findings  | none; prose-only change, fence byte-identical, all counts and witnesses preserved (Section 4)                         |
| New findings         | 0 `BLOCKER`, 0 `SHOULD-FIX`, 2 `NICE-TO-HAVE` (N-8, N-9 in Section 8)                                                 |
| Independence status  | model/provider and work-context independence, as in the prior review; not human-investigator independence (Section 2) |

`GO` means only that the repaired supplement at `0be8bb15…` is an accurate, bounded record whose
prose repair correctly describes the executed direct route, whose unchanged Python fence and
transcript reproduce bit-for-bit under a CPython 3.12 / NumPy 2.3.5 environment, and whose
recording of the prior review's optional findings matches that review's Sections 6–8. It does
not merge or ratify anything, issue an identifier, open discussion, update a website, complete
the numerical commission, close the programme `INPUT_INCOMPLETE`, close the original factorial
methodology source holds or the S6 unbalanced two-system hold, or authorize any production
algorithm or release. The source-access status is reported separately from the content verdict
and does not depend on it.

## 2. Independence, roles, and boundary

- **Author of the reviewed repair.** The supplement records that it was "Prepared by the
  OpenAI-assisted research author in the current authoring context." This review did not
  consult that context, its session, or any intermediate author material. The author's own
  re-inspection of the NIST, LAPACK, Python, and NumPy pages is treated as author-side work and
  is not counted toward independent source closure.
- **Reviewer.** This review was produced by an Anthropic model in a Claude Code remote session.
  The session service reports the configured model and the model that served the latest turn
  as `claude-fable-5-1`. The session was started from a fresh container clone of the repository.
  The prior review (PR 208) was also produced by `claude-fable-5-1` in a different session; this
  close review is therefore separate from the author's model and provider, but not from the
  prior reviewer's model. It satisfies the separate-model requirement of the research gate in
  `governance/RFC.md` (item 2) with respect to the author; it is a second pass by the same model
  family with respect to PR 208, which is disclosed rather than claimed as further independence.
- **Human role.** The repository maintainer (GitHub `tasuku-kobayashi`) authored or commissioned
  the supplement, opened PR 205 and PR 208, committed the close-review prompt at `7a2baaf3…`,
  and commissioned this review. The same human commissioned the authoring and both reviews.
  No human-investigator independence is claimed, and no human expert review supplemented this
  pass.
- **Assistance.** No other model, service, or person contributed. External code executed:
  CPython 3.12.3, 3.11.15, NumPy 2.3.5, 2.4.6, 2.5.3, uv, pnpm, Node, and the repository's own
  tooling. Network access was limited to GitHub-hosted raw files and PyPI (Section 5).
- **Git metadata.** The review commit's author/committer fields carry the intake tooling
  identity configured in the session container (`Claude <noreply@anthropic.com>`), not a human
  reviewer's name. The accountable role, scope, and boundary are those stated here.
- **Branch constraint (disclosed).** The close-review prompt asks for the deliverable on
  `review/r4-qr-cancellation-supplement-close`. That branch did not exist at review time and
  was not created: the session that produced this review is bound by a higher-priority
  execution requirement to develop and push only on the session-designated branch
  `claude/qr-cancellation-review-prompt-tkb8rh`. The branch was reset to start exactly at the
  fixed repair input (it carried no other work), so the review delta is one file on top of
  `0be8bb15…` as requested. The branch prefix is imposed by the session tooling, not a naming
  choice of this review; the file path and content follow the prompt exactly.

## 3. Exact identity

All identities were re-derived from Git objects in the session clone before any content was
read for review. The fixed input was fetched by commit id, not taken from a branch tip.

| Field                                        | Re-derived value                                                                                                                                                                               | Matches prompt                          |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| Repository                                   | `licklider-ai/nomue-protocol`                                                                                                                                                                  | yes                                     |
| Repair input commit                          | `0be8bb1519d7aec2810b03192de6590ec9168c60`, "Correct factorial summation route and record review findings"                                                                                     | yes                                     |
| Sole parent                                  | `42eb498473bdf6d318ac9f1180f71b08cc2e3422`                                                                                                                                                     | yes                                     |
| Input tree                                   | `df0e656467e66ec13b7a44016e6dbb45fcf4ae80`                                                                                                                                                     | yes                                     |
| Only changed path vs parent                  | `governance/drafts/release-4-preparation/qr-cancellation-supplement.md` (1 file, +67 −10)                                                                                                      | yes                                     |
| Repaired supplement blob                     | `007d689e2c44f50df6242137348add66c5019cc8`; file SHA-256 `9a2aab3d7efc14d2f40f77e4676cc91e5e8b9f2a29b0d9db58027084da9d4d4a` (231 lines)                                                        | yes                                     |
| Parent supplement blob                       | `94cb0e0b86df2451b531660b913f8dd504f1ffed`; file SHA-256 `5bfe5267…` (174 lines), equal to the PR 208 reviewed blob                                                                            | yes                                     |
| Predecessor numerical input                  | `014824e482d0dccac696053176f834b0f5e45fb6`, "Record exploratory factorial QR and cancellation evidence"                                                                                        | yes                                     |
| Prior review                                 | commit `253fe14b801b861a23714e7491b6bb9e19951b2f`, file `review-inputs/r4-qr-cancellation-supplement/REVIEW-RESULT.md`, blob `5c6f30630f3daee80c59210e892398b53d4cd660` (703 lines)            | yes                                     |
| Extracted Python fence SHA-256               | `50a014324de141b32c284c5e5cbcc3cca9ea825ab6f8c7fe9e76d320b7c1bbfe` (single fence, 59 lines) at both `007d689e…` and `94cb0e0b…`; byte-identical                                                | yes                                     |
| Author-reported corpus SHA-256               | `2371c1ef31a25816e09d08324718dd87329c5b6aa93076fd17ae772373fff55c`                                                                                                                             | reproduced                              |
| Close-review prompt                          | `governance/drafts/release-4-preparation/qr-cancellation-close-review-prompt.md` at `7a2baaf3d8dcf2a0570f7d6486758f8d56865c69`, whose sole parent is `0be8bb15…` and which adds only that file | —                                       |
| PR 205 live head at review time              | `7a2baaf3…` (draft, open, base `main` at `f3910016…`, head `research/r4-qr-cancellation-supplement`)                                                                                           | prompt adds after input, as anticipated |
| PR 208 live head at review time              | `1057e321…` (draft, open, base `research/r4-qr-cancellation-supplement`); its review file is the blob named above                                                                              | —                                       |
| `review/r4-qr-cancellation-supplement-close` | does not exist on the remote                                                                                                                                                                   | see Section 2                           |

No identity was missing or mismatched, so `INPUT_INCOMPLETE` was not raised and the review
proceeded.

## 4. Bounded check 1 — prose-only change and re-execution

**Only prose changed.** The diff `42eb4984…` → `0be8bb15…` touches one file. After replacing the
Python fence with a placeholder in both versions, the remaining diff is 77 changed lines of
prose and tables; the fence bodies compare byte-equal (`cmp` exit 0) and both hash to
`50a01432…`. The changes are: the status line; the LAPACK bullet ("uses a general linear solver
on its R matrix … not … a specialized triangular solver"); the direct-route description
("builtin `sum()` … compensated accumulation"); the table row label "Sequential cell means" →
"CPython builtin-sum cell means"; a new section "Review intake and successor corrections"; and
the "Next reviewable work" sentence. The "Observed transcript" numbers, both witnesses, the
"Author-side validation" section, and the interpretation paragraphs are unchanged.

**Counts, errors, and witnesses preserved.** The table rows 144 / `3/45035996273704960` / 0,
850 / `2340808394435/9007199254740992` / 462, and 885 / `1/1125899906842624` / 501, the counts
666 and 525, and both witness hex values are identical in the parent and repaired blobs and
match the re-execution below.

**Re-execution.** The fence was extracted byte-exactly from blob `007d689e…` and run unmodified,
and also with two appended lines after `payload = …` that dump the row list to a file (this does
not change the computed rows or the printed hash; the modified copy's SHA-256 is
`6fd0ae0b6521fa39565494f8f8f8890e387d59239d351072d4fa2fbbcdcc9682`). Environment: Linux
6.18.44 x86_64, glibc 2.39, 4 hardware threads; interpreters are Ubuntu system builds
(GCC 13.3.0) driven through `uv` virtual environments; NumPy wheels from PyPI bundle their own
OpenBLAS.

| Run | Interpreter     | NumPy / OpenBLAS     | Threads | Corpus SHA-256                                                     | Direct row                      | QR row                           | Centered row          |
| --- | --------------- | -------------------- | ------- | ------------------------------------------------------------------ | ------------------------------- | -------------------------------- | --------------------- |
| 1   | CPython 3.12.3  | 2.3.5 / 0.3.30       | default | `2371c1ef…`                                                        | 144 / `3/45035996273704960` / 0 | 850 / `2340808394435/2^53` / 462 | 885 / `2^−50` / 501   |
| 2   | CPython 3.12.3  | 2.3.5 / 0.3.30       | 1       | `2371c1ef…`                                                        | identical                       | identical                        | identical             |
| 3   | CPython 3.12.3  | 2.5.3 / 0.3.34.106.0 | default | `06c2153ddd2d184c7d39d9be96bfd6a2dc5075971202cce59b06732084768b0a` | 144 / `3/45035996273704960` / 0 | 869 / `661439513069/2^51` / 480  | 895 / `11/2^53` / 525 |
| 4   | CPython 3.12.3  | 2.5.3 / 0.3.34.106.0 | 1       | `06c2153d…`                                                        | identical to run 3              | identical to run 3               | identical to run 3    |
| 5   | CPython 3.11.15 | 2.4.6 / 0.3.31.188.0 | default | `ca4947956e5b97a25f96d8ac62a572726a187d6095133ea9409f9f6457f5be7a` | 144 / `1/7318349394477056` / 0  | 850 / `2340808394435/2^53` / 462 | 885 / `2^−50` / 501   |
| 6   | CPython 3.11.15 | 2.4.6 / 0.3.31.188.0 | 1       | `ca494795…`                                                        | identical to run 5              | identical to run 5               | identical to run 5    |

All six runs printed `cases 945`, `input_changed 666`, `exact_zero_after_input 525`, and passed
all 945 in-script orthogonality and partition assertions. Runs 1–2 reproduce the author's digest
and both witnesses exactly on a CPython 3.12 build that is neither the author's 3.12.13 nor the
prior reviewer's 3.12.11. Runs 5–6 reproduce the PR 208 CPython 3.11 digest and direct
maximum error exactly. Runs 3–4 are a new observation recorded as N-8 (Section 8): a later
NumPy/OpenBLAS build changes the QR and centered rows and the QR/centered values of both
witnesses, while the direct row is unchanged. The exact-version statements above describe the
environments actually executed; one matching environment is not turned into a portable
requirement, and the digest is not claimed to be reproducible on other builds.

## 5. Source access

Attempted on 2026-09-08 (02:26–02:30 UTC) from the session container, by direct HTTPS
(`curl` through the session's egress proxy) and by the session's web text-extraction tool.

| Source                                                                       | Host                        | Result                                                                  |
| ---------------------------------------------------------------------------- | --------------------------- | ----------------------------------------------------------------------- |
| NIST/SEMATECH e-Handbook, `prc/section4/prc437.htm`                          | `itl.nist.gov`              | CONNECT rejected, HTTP 403 from proxy; extraction tool `EGRESS_BLOCKED` |
| LAPACK Users' Guide, `lapack/lug/node27.html`                                | `www.netlib.org`            | CONNECT rejected, HTTP 403 from proxy; extraction tool `EGRESS_BLOCKED` |
| Python 3.12 rendered documentation, `library/functions.html#sum`             | `docs.python.org`           | blocked (403 / `EGRESS_BLOCKED`)                                        |
| NumPy 2.3 rendered documentation, `numpy.linalg.qr` and `numpy.linalg.solve` | `numpy.org`                 | blocked (403 / `EGRESS_BLOCKED`)                                        |
| CPython and NumPy repository files (raw)                                     | `raw.githubusercontent.com` | reachable; retrieved files listed in Section 6.2 and 7 with SHA-256     |
| LAPACK reference sources (raw)                                               | `raw.githubusercontent.com` | reachable; retrieved files listed in Section 7 with SHA-256             |

Status for the two pages named by the prompt: **`SOURCE_ACCESS_INCOMPLETE`**. No cached copy,
snippet, recollection, or the author's summary was substituted. The prior review's completion
instructions (fetch both pages, record date and content hash, confirm the balanced partition and
`N − ab` residual degrees of freedom, confirm full-rank QR/LQ versus rank-deficient driver
families, distinguish raw HTML from tool-extracted text) therefore remain open for a reviewer
with network access to those hosts. The author's statement that it re-inspected both HTML texts
through web extraction on 2026-09-08 is author-side inspection and does not close the gap; the
supplement itself says so.

The rendered Python and NumPy documentation pages were also unreachable. For the SF-1 and N-1
checks, the documentation _sources_ that generate those pages were retrieved instead from the
upstream repositories at the exact tags named by the supplement and by the author's environment
(Section 6.2, Section 7); they are upstream primary text, retrieved with hashes, but they are
not the rendered pages the supplement links.

Consequences for the verdict: the content verdict does not depend on the NIST or LAPACK Users'
Guide pages. The algebraic facts they would support (balanced partition, `N − 4` residual
degrees of freedom for the two-by-two case, full-rank QR/LQ versus rank-deficient drivers) were
independently re-derived in PR 208 Section 6.1 and are not changed by this prose repair.
Neither page is an original methodological source, and their inspection would not close the
original factorial-methodology holds (Section 9).

## 6. Bounded check 2 — SF-1

### 6.1 What PR 208 required

PR 208's repair condition: rename the direct route to state that it uses the interpreter's
builtin `sum()` (Neumaier-compensated on CPython ≥ 3.12) _or_ replace the two `sum()` calls with
an explicit loop and re-run; state that the corpus hash is specific to the interpreter's
summation semantics; list the interpreter, not only the BLAS build, as the environment
dependency of the direct row.

### 6.2 Evidence gathered by this review

**Both summation sites.** The fence contains exactly two float summation sites on the direct
route: `m = [sum(float(v) for v in y[c*n:(c+1)*n])/n …]` (cell means) and
`direct = [sum(m[c]*signs[c][j] for c in range(4))/4 …]` (contrast). Both call the builtin with
an implicit integer start of 0 and float items only. The other `sum()` calls in the fence
operate on `Fraction` values and take the generic (exact) path. The supplement's sentence "uses
Python's builtin `sum()` for both cell means and the contrast" is accurate.

**CPython implementation.** `Python/bltinmodule.c` was retrieved from the CPython repository at
three tags (SHA-256 of the retrieved files):

| Tag                               | File SHA-256                                                       | `builtin_sum_impl` float path                                                             |
| --------------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| `v3.12.3` (executed here)         | `e1acb65d489050a47681a932fd53ead498a7966c1e672605b64fc030d740c9a2` | Neumaier compensation (comment cites Neumaier 1974); compensation added at exit if finite |
| `v3.12.13` (author's interpreter) | `368b677db85bd846fc85271d6e7170ee8e529230bd1ea352d16ccef0a75787e0` | same algorithm (two "Neumaier" mentions)                                                  |
| `v3.11.15` (PR 208 run 1–2)       | `b7443e3794754e6202026486f366af8d506adf88a2a56252d46fd2b968908e76` | plain `f_result += x` accumulation; no compensation                                       |

Mechanism read from the 3.12 source: with start `0` (an `int`), the integer fast path adds the
first float item through `PyNumber_Add`, giving an exact float; the float fast path then
accumulates every further float item with the Kahan–Babuška–Neumaier update
(`t = f + x; c += (|f| ≥ |x|) ? (f − t) + x : (x − t) + f; f = t`) and adds `c` once at the end
if it is nonzero and finite. The whole fast path is compiled only when `SLOW_SUM` is not defined,
which is why the official documentation says "on most builds".

**Official documentation source.** `Doc/library/functions.rst` at `v3.12.13` (SHA-256
`963d7143ba762daba0675a6cb3b2b470fd374f2110e92a678f4f28ee85bd7048`) carries, under `sum()`,
"`versionchanged:: 3.12` Summation of floats switched to an algorithm that gives higher accuracy
on most builds." `Doc/whatsnew/3.12.rst` at `v3.12.3` (SHA-256 `8bb2d3313df970936c53c2c3198cb42e99e1af87d3906a7dc830d19a60625030`)
states "`sum()` now uses Neumaier summation to improve accuracy and commutativity when summing
floats or mixed ints and floats. (Contributed by Raymond Hettinger in gh-100425.)" The
supplement's statement that the 3.12 documentation "records a changed float-summation
algorithm" and its attribution of the Neumaier identification to PR 208 are both accurate; this
review confirms the identification from the upstream source and What's New text.

**Behavioural check on the executed interpreters** (reviewer script, Section 10, run on the
dumped corpus rows): on CPython 3.12.3 the builtin equals a pure-Python transcription of the
3.12 Neumaier loop at both sites in 945/945 cases, and differs from a naive left-to-right loop
at the cell-mean site in 15 cases and at the contrast site in 14 cases; every recorded `direct`
hex value in the corpus equals the Neumaier transcription (945/945) and the naive loop only in
930/945. On CPython 3.11.15 the builtin equals the naive loop in 945/945 and differs from the
Neumaier transcription at the two sites in 15 and 23 cases; the corpus `direct` values equal
the naive loop in 945/945. `sum([1e100, 1.0, -1e100])` returns `1.0` on 3.12.3 and `0.0` on
3.11.15.

**Interpreter dependence of the direct row.** Section 4 runs 1 and 5 differ only in the direct
row's largest absolute error (`3/45035996273704960` versus `1/7318349394477056`) while their QR
and centered rows and both witnesses are identical (NumPy differs between those runs, and run 5
also matches PR 208's run 1 bit-for-bit, so the difference is attributable to the interpreter).
The 144 / 0 direct counts hold on both.

### 6.3 Check of the repaired text against the evidence

| Repaired statement                                                                                                                      | Assessment                                                                                                                                                       |
| --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Table label "CPython builtin-sum cell means"                                                                                            | accurate; names the operation actually executed                                                                                                                  |
| "uses Python's builtin `sum()` for both cell means and the contrast"                                                                    | accurate (two sites, Section 6.2)                                                                                                                                |
| "On the disclosed CPython 3.12 interpreter its float sums use compensated accumulation, not a naive left-to-right addition loop"        | accurate and correctly scoped to the disclosed interpreter; consistent with the "on most builds" hedge in the official text and with the `SLOW_SUM` build switch |
| "The interpreter is part of the operation definition"                                                                                   | accurate; the direct row is a function of the interpreter's `sum()` semantics                                                                                    |
| Official-documentation citation and PR 208's Neumaier identification                                                                    | both confirmed from upstream sources                                                                                                                             |
| CPython 3.12.11 / NumPy 2.3.5 and 2.4.6 reproduce the digest; CPython 3.11.15 gives `ca494795…` and `1/7318349394477056`                | matches PR 208 Sections 7–8 exactly; independently reproduced here for 3.11.15 / 2.4.6 and (on 3.12.3) for 2.3.5                                                 |
| "The counts and both witnesses remain unchanged in those runs. The observed difference is in the Python direct route, not the QR rows." | accurate as attributed to PR 208's runs; see N-8 for a later build where the QR rows do change                                                                   |
| "Agreement across those builds does not guarantee agreement on every BLAS build, interpreter, or later Python version"                  | accurate; no promise for future Python versions is made, and the review does not require one                                                                     |
| No remaining "sequential" label                                                                                                         | confirmed by text sweep; "naive" appears only in the negation and in the N-2 row that distinguishes the reviewer's naive-loop graph                              |

The repair chose the relabel-and-explain option rather than replacing the calls with a loop,
which is one of the two alternatives PR 208 offered, and it keeps the fence and transcript
unchanged so that the original digest remains reproducible. No naive-loop interpretation
remains, no cross-version promise is made, and the environment dependency of the direct row is
now stated as the interpreter.

**SF-1 disposition: `CLOSED`.**

## 7. Bounded checks 3 and 4 — N-1 to N-7 recording

The reviewer script (Section 10) recomputed each quantity from the corpus rows of run 1 and
from the same NumPy calls the fence makes, using an exact cell-mean arrangement for truth rather
than the author's `X'y / N` closed form. Results on CPython 3.12.3 / NumPy 2.3.5 unless stated.

| Finding | Successor recording                                                                                                                                                                              | Recomputed here                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Disposition                                                                                                                                       |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| N-1     | `qr` documented as `dgeqrf`/`dorgqr` for real double inputs; `solve` as `gesv`, a general LU-based solve on R, not `dtrtrs`                                                                      | Installed NumPy 2.3.5 docstrings and `numpy/linalg/_linalg.py` at `v2.3.5` (SHA-256 `eab0bbee9c8758d387934dc32849f01deceb50261d02e22d41f03ad6ff2562cc`): `qr` "is an interface to the LAPACK routines `dgeqrf`, `zgeqrf`, `dorgqr`, and `zungqr`" and describes `h` as "Householder reflectors" for mode `raw`; `solve`: "computed using LAPACK routine `_gesv`". Reference LAPACK `v3.12.0` sources: `dgesv.f` (SHA-256 `0179d91e…`) "LU decomposition with partial pivoting and row interchanges"; `dgeqrf.f` (`8745948a…`) Q "represented as a product of elementary reflectors"; `dorgqr.f` (`4ab5a36a…`) generates Q from those reflectors; `dtrtrs.f` (`53de6e83…`) is the separate triangular solver the fence does not call. "For real double inputs" is the author's gloss of the `d` prefix; it is correct LAPACK naming but not a sentence in the NumPy text. | accepted; route names accurate                                                                                                                    |
| N-2     | selected-axis spurious maxima ≈ 2.49e-4 uncentered, 5.9e-16 centered; direct count zero; non-selected axes QR 1,672/1,890, centered 1,780/1,890; naive-loop direct count 10 is a different graph | `4596467122019239/2^64 ≈ 2.4917e-4` and `1504547036859213/2^101 ≈ 5.934e-16`; selected-axis direct false-nonzero 0; non-selected instances 1,890 with exact coefficient zero in all; QR nonzero 1,672, centered 1,780, naive loop 10, builtin `sum()` 0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | accepted; selected/non-selected distinction and magnitudes correct; the builtin-sum row is correctly kept separate from the naive-loop diagnostic |
| N-3     | inexact centering in 135/945 cases, 1,440 observations; truth from admitted inputs                                                                                                               | 135 cases, 1,440 observations                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | accepted                                                                                                                                          |
| N-4     | floating coefficients only; no binary64 SS, MS, F, or tail                                                                                                                                       | fence inspection: exact `Fraction` sums of squares only; no floating SS/MS/F/tail computed                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | accepted                                                                                                                                          |
| N-5     | original reviewed input vs prompt-only successor distinguished; repaired input pinned separately                                                                                                 | `014824e…` → `42eb4984…` adds only the review prompt with blob `94cb0e0b…` unchanged; `0be8bb15…` is pinned by the close-review prompt at `7a2baaf3…`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | accepted; head distinction correct                                                                                                                |
| N-6     | factor reversal preserves QR bits; factor exchange changes them in 926/945; in-cell permutation in 890/945; no invariance theorem                                                                | reversal 0/945 differ; exchange 926/945; within-cell reversal (the transformation PR 208 executed) 890/945                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | accepted; transformation counts correct and scoped                                                                                                |
| N-7     | default-thread and one-thread digests match within each tested interpreter; recorded as observation; no universal threshold or dispensability of thread control                                  | runs 1/2, 3/4, 5/6 in Section 4 match pairwise                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | accepted; see below                                                                                                                               |

**Check 4.** The successor's N-7 row is more conservative than PR 208's own N-7 text (which
said thread pinning "is not needed for this probe"): it records the agreement as an observation
and explicitly declines a universal threading threshold or a statement that execution controls
are unnecessary. The "Thread count was not pinned" caveat in the transcript is retained. This is
the correct treatment. All seven rows are introduced as "observations of PR 208, Sections 6–8,
not new author experiments or universal bounds", the counts are attributed to "the review" or
"the reviewer", and the author's own new work is limited to prose and re-inspection statements
that are labelled author-side. No reviewer observation is presented as an author experiment.

**Actual implementation versus SVD disagreement.** The identification of the executed QR path
rests on the NumPy documentation and the LAPACK reference sources above, not on the prior
review's observation that the route differs bitwise from the SVD-based `lstsq`; that
disagreement is consistent with, but is not the basis for, the route names.

## 8. Regression findings and new findings

**Regression findings: none.** The prose repair does not alter any number, hex value, count,
hash, or claim of the original transcript, does not introduce a tolerance, ranking, production
selection, or normative keyword, and does not touch any registry, schema, conformance,
reference, generated, gate, or evidence path. The Release 3 scope statement and the list of open
holds are unchanged. The successor's summary of PR 208 (0 / 1 / 7, `SOURCE_ACCESS_INCOMPLETE`,
model-level independence only) is accurate.

### N-8 (`NICE-TO-HAVE`) — record that the QR rows are also build-dependent

Under CPython 3.12.3 with NumPy 2.5.3 (bundled OpenBLAS 0.3.34.106.0) the fence prints corpus
SHA-256 `06c2153d…`, QR row 869 / `661439513069/2251799813685248` / 480, centered row 895 /
`11/9007199254740992` / 525, witness 1 centered QR `-0x1.dad26fa052472p-111` (instead of
`-0x1.6a09e667f3bcdp-163`), and witness 2 QR `0x1.0004cd7477bc4p-40` (instead of
`0x1.00002f0aa6583p-40`); the direct row and witness direct values are unchanged, as are 666 and 525. The supplement already says agreement "does not guarantee agreement on every BLAS build",
so nothing in it is contradicted. Recording this concrete counter-example would stop a reader
from taking the QR rows as more portable than the direct row. The qualitative conclusions
(large spurious nonzero counts on QR, zero on the direct route, centering not a repair) are the
same on both builds. No action is required for `GO`.

### N-9 (`NICE-TO-HAVE`) — cite the "on most builds" qualifier

The official text hedges the 3.12 change with "on most builds" because the compensated fast
path is compiled out when `SLOW_SUM` is defined. The supplement's "on the disclosed CPython 3.12
interpreter" already scopes the claim correctly; quoting the qualifier would make the scoping
self-explanatory without a future-version promise. No action is required for `GO`.

## 9. Bounded check 6 — boundary statement

The NIST handbook page and the LAPACK Users' Guide page are supporting documentation. Their
inspection, whether by the author, by PR 208, or by this review if access had succeeded, would
not close the original factorial-methodology source holds recorded in the Release 4 preparation
package, the S6 unbalanced two-system hold from the semantic result at `a2687f10…`, or the
programme `INPUT_INCOMPLETE`, and would not authorize any production algorithm, graph selection,
tolerance, or release. This review closes none of them and selects nothing. The `GO` in
Section 1 is limited to the corrected supplement as an informative record at `0be8bb15…`.

## 10. Reviewer script and provenance of computed results

The reviewer script (`checker.py`, SHA-256 `890ad2464dddee627b6bb931a604448efd9672bf8bacf0618519e293c4a3af5c`)
loads the dumped corpus rows, regenerates the inputs from the formula stated in the supplement
(the only shared element), computes exact truth through cell means in `Fraction` arithmetic,
re-executes `np.linalg.qr` / `np.linalg.solve` with the fence's calls, and recomputes the SF-1
summation-site comparisons (builtin vs naive loop vs a Python transcription of the CPython 3.12
Neumaier loop), the N-2 magnitudes and non-selected-axis counts, the N-3 centering counts, and
the N-6 transformation counts. It is reproduced below.

```python
# Close-review checker: independent recomputation of the successor's N-1..N-7 recordings
# and the SF-1 summation-site behaviour. Loads the corpus rows produced by the unchanged
# author fence (with a dump line appended) and recomputes floating routes with the same calls.
from fractions import Fraction as Q
import json, math, sys, platform
import numpy as np

SIGNS = [(1, -1, -1, 1), (1, -1, 1, -1), (1, 1, -1, -1), (1, 1, 1, 1)]
rows = json.load(open(sys.argv[1]))

def naive(vals):
    s = 0.0
    for v in vals: s += v
    return s

def neumaier(vals):
    # transcription of CPython 3.12 Python/bltinmodule.c float path (start=0 int -> first float item)
    f = 0.0; c = 0.0
    for x in vals:
        t = f + x
        if abs(f) >= abs(x): c += (f - t) + x
        else: c += (x - t) + f
        f = t
    if c and math.isfinite(c): f += c
    return f

stats = dict(cases=0, other_axis_truth_nonzero=0,
             other_qr_nonzero=0, other_cqr_nonzero=0, other_naive_nonzero=0, other_builtin_nonzero=0, other_instances=0,
             sel_zero_cases=0, sel_qr_max=Q(0), sel_cqr_max=Q(0), sel_qr_nonzero=0, sel_cqr_nonzero=0,
             center_inexact_cases=0, center_inexact_obs=0,
             rev_qr_diff=0, exch_qr_diff=0, perm_qr_diff=0,
             site1_builtin_vs_naive=0, site2_builtin_vs_naive=0, site1_builtin_vs_neumaier=0, site2_builtin_vs_neumaier=0,
             corpus_direct_vs_neumaier=0, corpus_direct_vs_naive=0, corpus_qr_match=0, corpus_cqr_match=0, truth_match=0)
idx = 0
for n in range(2, 17):
    for e in (0, 20, 40):
        for k in (0, 20, 40, 52, 53, 54, 60):
            for axis in (1, 2, 3):
                row = rows[idx]; idx += 1
                assert (row['n'], row['offset_exponent'], row['k'], row['axis']) == (n, e, k, axis)
                delta = Q(2) ** (-k); off = Q(2) ** e
                intended = [off + SIGNS[c][axis] * delta + Q(2 * r - (n - 1), 4) for c in range(4) for r in range(n)]
                y = np.array([float(v) for v in intended], dtype=np.float64)
                ex = [Q(float(v)) for v in y]
                N = 4 * n
                # exact coefficients through cell means (different arrangement from X'y/N)
                cm = [sum(ex[c * n:(c + 1) * n]) / n for c in range(4)]
                beta = [sum(cm[c] * SIGNS[c][j] for c in range(4)) / 4 for j in range(4)]
                if Q(row['truth']) == beta[axis]: stats['truth_match'] += 1
                X = np.array([s for s in SIGNS for _ in range(n)], dtype=float)
                q, r = np.linalg.qr(X, mode='reduced')
                qr = np.linalg.solve(r, q.T @ y)
                centered = y - y[0]
                cqr = np.linalg.solve(r, q.T @ centered)
                if float(qr[axis]).hex() == row['qr']: stats['corpus_qr_match'] += 1
                if float(cqr[axis]).hex() == row['centered_qr']: stats['corpus_cqr_match'] += 1
                # summation sites
                cells = [[float(v) for v in y[c * n:(c + 1) * n]] for c in range(4)]
                m_b = [sum(cl) / n for cl in cells]
                m_n = [naive(cl) / n for cl in cells]
                m_k = [neumaier(cl) / n for cl in cells]
                if m_b != m_n: stats['site1_builtin_vs_naive'] += 1
                if m_b != m_k: stats['site1_builtin_vs_neumaier'] += 1
                d_b = [sum(m_b[c] * SIGNS[c][j] for c in range(4)) / 4 for j in range(4)]
                d_bn = [naive([m_b[c] * SIGNS[c][j] for c in range(4)]) / 4 for j in range(4)]
                d_k = [neumaier([m_k[c] * SIGNS[c][j] for c in range(4)]) / 4 for j in range(4)]
                d_nn = [naive([m_n[c] * SIGNS[c][j] for c in range(4)]) / 4 for j in range(4)]
                if d_b != d_bn: stats['site2_builtin_vs_naive'] += 1
                if d_b != d_k: stats['site2_builtin_vs_neumaier'] += 1
                if float(d_k[axis]).hex() == row['direct']: stats['corpus_direct_vs_neumaier'] += 1
                if float(d_nn[axis]).hex() == row['direct']: stats['corpus_direct_vs_naive'] += 1
                # non-selected axes
                for j in (1, 2, 3):
                    if j == axis: continue
                    stats['other_instances'] += 1
                    if beta[j] != 0: stats['other_axis_truth_nonzero'] += 1
                    if qr[j] != 0: stats['other_qr_nonzero'] += 1
                    if cqr[j] != 0: stats['other_cqr_nonzero'] += 1
                    if d_nn[j] != 0: stats['other_naive_nonzero'] += 1
                    if d_b[j] != 0: stats['other_builtin_nonzero'] += 1
                # selected-axis spurious magnitude
                if beta[axis] == 0:
                    stats['sel_zero_cases'] += 1
                    if qr[axis] != 0:
                        stats['sel_qr_nonzero'] += 1; stats['sel_qr_max'] = max(stats['sel_qr_max'], abs(Q(float(qr[axis]))))
                    if cqr[axis] != 0:
                        stats['sel_cqr_nonzero'] += 1; stats['sel_cqr_max'] = max(stats['sel_cqr_max'], abs(Q(float(cqr[axis]))))
                # centering
                bad = sum(1 for i in range(N) if Q(float(centered[i])) != ex[i] - ex[0])
                if bad: stats['center_inexact_cases'] += 1; stats['center_inexact_obs'] += bad
                # transformations (as specified in PR 208 Section 6.2)
                Xr = np.array([(s[0], -s[1], s[2], -s[3]) for s in SIGNS for _ in range(n)], dtype=float)
                qx, rx = np.linalg.qr(Xr, mode='reduced')
                if not np.array_equal(np.linalg.solve(rx, qx.T @ y) * np.array([1, -1, 1, -1.0]), qr): stats['rev_qr_diff'] += 1
                y_x = np.array([y[c * n + i] for c in (0, 2, 1, 3) for i in range(n)])
                if not np.array_equal(np.linalg.solve(r, q.T @ y_x)[[0, 2, 1, 3]], qr): stats['exch_qr_diff'] += 1
                y_p = np.array([y[c * n + (n - 1 - i)] for c in range(4) for i in range(n)])
                if not np.array_equal(np.linalg.solve(r, q.T @ y_p), qr): stats['perm_qr_diff'] += 1
                stats['cases'] += 1
stats['sel_qr_max'] = (str(stats['sel_qr_max']), float(stats['sel_qr_max']))
stats['sel_cqr_max'] = (str(stats['sel_cqr_max']), float(stats['sel_cqr_max']))
stats['sum_1e100_1_-1e100'] = sum([1e100, 1.0, -1e100])
stats['env'] = (platform.python_version(), np.__version__)
print(json.dumps(stats, indent=1))
```

Results (CPython 3.12.3 / NumPy 2.3.5, corpus rows SHA-256 `1a7eb0c63507a1c13bb63df51585c13cba18c569112501bbd6dba550c6d82c83`):
`truth_match 945`, `corpus_qr_match 945`, `corpus_cqr_match 945`, `other_axis_truth_nonzero 0`,
`other_qr_nonzero 1672`, `other_cqr_nonzero 1780`, `other_naive_nonzero 10`,
`other_builtin_nonzero 0`, `sel_zero_cases 525`, `sel_qr_nonzero 462`, `sel_cqr_nonzero 501`,
`sel_qr_max 4596467122019239/18446744073709551616`, `sel_cqr_max 1504547036859213/2535301200456458802993406410752`,
`center_inexact_cases 135`, `center_inexact_obs 1440`, `rev_qr_diff 0`, `exch_qr_diff 926`,
`perm_qr_diff 890`, `site1_builtin_vs_naive 15`, `site2_builtin_vs_naive 14`,
`site1_builtin_vs_neumaier 0`, `site2_builtin_vs_neumaier 0`, `corpus_direct_vs_neumaier 945`,
`corpus_direct_vs_naive 930`, `sum_1e100_1_-1e100 1.0`. On CPython 3.11.15 / NumPy 2.4.6 (rows
SHA-256 `5a37453a…`) the QR, centering, and transformation counts are identical, the builtin
equals the naive loop at both sites in 945/945, and `sum_1e100_1_-1e100` is `0.0`. On CPython
3.12.3 / NumPy 2.5.3 (rows SHA-256 `c284cecb…`) the summation-site results are identical to the
2.3.5 run while the QR-dependent counts differ (non-selected QR 1,756, centered 1,861; selected
480 / 525; exchange 933; permutation 845), consistent with N-8.

## 11. Bounded check 7 — validation

Executed in the session clone with `pnpm install --frozen-lockfile` (pnpm 11.7.0, Node
v22.22.2).

| Check                                                          | At repair input `0be8bb15…` | After adding this report |
| -------------------------------------------------------------- | --------------------------- | ------------------------ |
| `pnpm exec prettier --check` on the changed file(s)            | pass                        | pass                     |
| `pnpm format:check` (repository)                               | pass                        | pass                     |
| `pnpm lint:markdown`                                           | 357 files, 0 issues         | 358 files, 0 issues      |
| `pnpm typecheck`                                               | pass                        | pass                     |
| `pnpm validate` (tsx CLI wrapper)                              | all validators clean        | all validators clean     |
| `node --import tsx tooling/src/validate.ts`                    | all validators clean        | all validators clean     |
| `git diff --check` (`42eb4984…`→`0be8bb15…`; then this commit) | clean                       | clean                    |

The tsx CLI's IPC socket was not denied in this environment, so both invocation forms ran; the
author's report of a denied socket is environment-specific, as PR 208 also found. The full
`pnpm check` test suite was not run: no authoritative artifact changes at either head. Hosted CI
was not consulted as evidence.

## 12. Remaining actions and reopen conditions

1. A reviewer with access to `itl.nist.gov` and `www.netlib.org`: complete Section 5 for the two
   documentation pages (date, acquisition method, raw HTML hash distinguished from extracted
   text, balanced partition and `N − ab` residual degrees of freedom, full-rank QR/LQ versus
   rank-deficient driver families). This remains supporting-documentation closure only.
2. Author, optionally: record N-8 and N-9 in a successor. Neither is required for `GO`.
3. Programme: the supplement remains informative input to the numerical commission; the
   programme disposition stays `INPUT_INCOMPLETE`; all original factorial-methodology source
   holds and the S6 hold stay open; squared-effect/F projection, rank-deficient designs, and
   admission evidence remain unprobed.
4. Reopen this review if the supplement blob, the extracted fence, the pinned prior heads, or
   the PR 208 review blob change, or if an inspection of the blocked pages contradicts the
   algebra re-derived in PR 208 Section 6.1.

No merge, ratification, identifier issuance, algorithm adoption, public discussion, or website
claim is made or authorized by this record.

## 13. Provenance

- Review date: 2026-09-08.
- Reviewed head: `0be8bb1519d7aec2810b03192de6590ec9168c60` (tree `df0e6564…`, supplement blob
  `007d689e…`, fence SHA-256 `50a01432…`); predecessor `014824e4…`; prior review blob
  `5c6f3063…` at `253fe14b…`.
- Reviewer: Anthropic `claude-fable-5-1` in a Claude Code remote session (session identifier in
  the commit trailer); no other model or person contributed; the human commissioner is the
  repository maintainer who also commissioned the authoring and PR 208 (Section 2).
- Environments executed: CPython 3.12.3 (Ubuntu, GCC 13.3.0) with NumPy 2.3.5 (OpenBLAS 0.3.30)
  and NumPy 2.5.3 (OpenBLAS 0.3.34.106.0); CPython 3.11.15 with NumPy 2.4.6 (OpenBLAS
  0.3.31.188.0); Linux 6.18.44 x86_64, glibc 2.39, 4 hardware threads. CPython 3.12.13 (the
  author's version) could not be installed in the container and was not executed.
- Reviewer script SHA-256: `890ad246…`; fence-with-dump SHA-256: `6fd0ae0b…`; corpus row files
  `1a7eb0c6…` (3.12.3/2.3.5), `c284cecb…` (3.12.3/2.5.3), `5a37453a…` (3.11.15/2.4.6).
- Retrieved upstream files (all from `raw.githubusercontent.com`, 2026-09-08 02:26–02:30 UTC,
  SHA-256 of raw bytes): CPython `Python/bltinmodule.c` at `v3.12.3` (`e1acb65d…`), `v3.12.13`
  (`368b677d…`), `v3.11.15` (`b7443e37…`); `Doc/library/functions.rst` at `v3.12.3`
  (`66a77050…`) and `v3.12.13` (`963d7143…`); `Doc/whatsnew/3.12.rst` at `v3.12.3`
  (`8bb2d331…`); NumPy `numpy/linalg/_linalg.py` at `v2.3.5` (`eab0bbee…`); Reference LAPACK
  `SRC/dgesv.f` (`0179d91e…`), `SRC/dgeqrf.f` (`8745948a…`), `SRC/dorgqr.f` (`4ab5a36a…`),
  `SRC/dtrtrs.f` (`53de6e83…`) at `v3.12.0`. These are raw source files, not rendered pages.
- Blocked sources: `itl.nist.gov`, `www.netlib.org`, `docs.python.org`, `numpy.org` (Section 5).
- Only file created by this review:
  `review-inputs/r4-qr-cancellation-supplement-close/REVIEW-RESULT.md`. The reviewed
  supplement, the prior review, and all other artifacts are unchanged.
