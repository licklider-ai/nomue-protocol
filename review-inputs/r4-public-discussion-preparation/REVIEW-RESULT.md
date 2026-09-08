# Release 4 Public Discussion Preparation — Independent Numerical and Preparation Review

**Status: informative independent review; non-normative; not adopted.**

## 1. Verdict

| Dimension                | Result                                                                                                                                                            |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Numerical correctness    | **`GO`** for the SS/F propagation supplement and probe as an accurate, bounded, reproducible exploratory record at the exact input head only (Section 5)          |
| Source access            | **`SOURCE_ACCESS_INCOMPLETE`**: no original for S1 or S5 could be retrieved from this container; every candidate host was blocked by the egress proxy (Section 7) |
| Public-opening readiness | **`NOT_READY`**, as the readiness document itself records: R4-P1 (S1/S5), R4-P5 and R4-P6 remain open; nothing in this review closes them (Section 6)             |
| Formal adoption          | not requested by the input and not granted; no algorithm, tolerance, domain, reason code, identifier or Release 3 dependency is selected                          |
| Findings                 | 0 `BLOCKER`, 2 `SHOULD-FIX`, 6 `NICE-TO-HAVE` (Section 9); neither `SHOULD-FIX` invalidates any count, hash or witness                                            |
| Independence             | model, provider and work-context independence only; not human-investigator independence (Section 2)                                                               |
| Programme holds          | semantic `INPUT_INCOMPLETE`, numerical `INPUT_INCOMPLETE`, S1–S6 and the QR supplement's `COMPLETE_ON_PROVIDED_COPIES` disposition are all unchanged              |

`GO` means only that every count, witness and diagnostic in the submitted result was reproduced
bit-for-bit from an independently written exact oracle and independently re-executed floating
graphs, that the supplement's prose claims are supported on the finite corpus without stating a
domain or inferential conclusion, and that the environment dependence of those counts was
characterised. It does not establish an error bound, an F sampling distribution, a production
graph, or readiness to open Release 4 discussion.

## 2. Independence, roles and boundary

- **Author of the reviewed increment.** The readiness document, supplement, probe and prompt
  record OpenAI Codex assistance in the maintainer's task context. This review did not consult
  that context or any intermediate author material.
- **Reviewer.** An Anthropic model, `claude-fable-5-1`, in a Claude Code remote session
  (`session_013ko6ZfBtBaYEc9kJtVDZRk`), in a fresh container cloned at session start. The
  session service reported `session_context.model` and `last_served_model` as
  `claude-fable-5-1` for this session. This satisfies the separate-model requirement of the
  research gate in `governance/RFC.md`; it is not organisational or human-investigator
  independence. The repository maintainer (GitHub `tasuku-kobayashi`) commissioned both the
  authoring and this review.
- **Assistance.** No other model, service or person contributed. Web search results were used
  only to discover acquisition routes (Section 7); no snippet was used as evidence for any
  numerical or methodological claim. External code executed: CPython, NumPy, uv, pnpm, Node and
  the repository's own tooling.
- **Git metadata.** The commit author field carries the session tooling identity; the
  accountable role, scope and boundary are those stated here.

## 3. Exact identity

All identities were re-derived from Git objects fetched into the session clone on 2026-09-08.

| Field                             | Value                                                                                            | Matches prompt |
| --------------------------------- | ------------------------------------------------------------------------------------------------ | -------------- |
| Repository                        | `licklider-ai/nomue-protocol`                                                                    | yes            |
| Branch resolved once              | `research/r4-opening-readiness-next`                                                             | yes            |
| Input commit                      | `4cf3e12acc77bd38c09d5acd2588ede66ee265b2`                                                       | yes            |
| Sole parent (= baseline = `main`) | `cd217f88238a2ecc57b72f5835a813d92270f5ad`                                                       | yes            |
| Input tree                        | `49abd44b124e47cb5887ffdf7c82f44810e908e2`                                                       | —              |
| Delta vs parent                   | 5 files added, 562 insertions, 0 deletions, all under `governance/drafts/release-4-preparation/` | —              |
| Pull request                      | 218, draft, open, base `main`                                                                    | —              |

Blobs and SHA-256 of the five input files (paths relative to `governance/drafts/release-4-preparation/`):

| File                                  | Blob                                       | SHA-256                                                            |
| ------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------ |
| `public-discussion-readiness.md`      | `34db33cd4f6ebc0bc75b011399127545ace6cb20` | `c740d187d7a9c9d8bc84929960c95f2c5800d315ddef8c909b6536b3c7d856ef` |
| `public-discussion-review-prompt.md`  | `28ee20acf1a0f0dd55c6bba6a18640f8a4f20486` | `d3e566599fd929a9745499af98b9a1b3f7d4fc81d150566451f7feb46cad4948` |
| `ss-f-propagation-supplement.md`      | `2613a182e2affcf4e4d928dc3a9ede4e43454eb1` | `e04636c89e823a90f22c7798d65f1a0692e2bee42fc4cb2c4150e3eb34464035` |
| `probes/ss-f-propagation.py`          | `a3f9a9a4ad3e031ae0e63857400359c0c08f2fba` | `8c68703fb5fa8cf002c593b0b9a2bff0256cf9fc090ba43eb02436f262225839` |
| `probes/ss-f-propagation-result.json` | `38bd5d8eadcbcc91dc1ae8630eb05ba4be4daa53` | `418475dc015e7bb1064213841996a0b11a1db0f8ce6df2d538ce6adac0a19568` |

The script SHA-256 equals the `script_sha256` recorded inside the result file. The immutable
research inputs listed in the readiness document were fetched and verified:

| Input                       | Commit                                     | Exists | Blob recorded                              | Blob verified |
| --------------------------- | ------------------------------------------ | ------ | ------------------------------------------ | ------------- |
| Semantic research, PR 181   | `a2687f10719b399dafb511999cc1ef5b406a0c02` | yes    | `f70e89e995b0ec88d61d1a7eddf681ddb6d454b3` | yes           |
| Numerical research, PR 190  | `5962cc2def5b1aca7e30d219f12a9a6486ca7b11` | yes    | `200296de5745a3bc7087de4d924e1759f4c0f84e` | yes           |
| Degree-guard review, PR 191 | `2e3698ba32c0dae6dcd07ab8c71272d990fbaf49` | yes    | `8cf64bbe35e4c9f9537dc134f8334f6e5c44178f` | yes           |

All three commits are the live heads of the cited pull requests at review time. No input was
missing, so no review scope is reported as `INPUT_INCOMPLETE` for identity reasons. The later
head `bf4004694f68018534e01bde2f2a33214accba19` (PR 219) stacks three prose files on this input
and leaves all five files above byte-identical; it is reviewed separately under
`review-inputs/r4-rfc-preparation/`.

## 4. Governance inputs read

`AGENTS.md` and its ordered prerequisites (`CHARTER.md`, `AUTHORITY.md`,
`authority/authority-manifest.yaml`, `registries/requirements.yaml`, `governance/ID-POLICY.md`,
`governance/RFC.md`), the Release 4 preparation `README.md`, both commissions, the semantic
result at `a2687f1…`, the numerical result at `5962cc2…`, the degree-guard review at
`2e3698b…`, the accepted QR supplement and its reviews on `main`, and the provided-copy
addendum recording `COMPLETE_ON_PROVIDED_COPIES`. No directory-local `AGENTS.md` governs
`governance/drafts/` or `review-inputs/`.

## 5. Numerical review

### 5.1 Reproduction environments

Container: Ubuntu 24.04.4, kernel 6.18.44, x86_64 (Intel Xeon 2.80 GHz, 4 logical CPUs; the
author's `numpy_configuration` lists `AVX512_CNL` and `AVX512_ICL` under "found", this host
lists them under "not found"; everything else in that text is identical). Thread count was not
pinned unless stated. The author's exact interpreter build (CPython 3.12.13) was not available
to `uv` from this container, so the system CPython 3.12.3 was used.

| Run | Interpreter     | NumPy / OpenBLAS     | Threads | Corpus SHA-256 (prefix) | Summary counts        | Witnesses   | Zero-residual diagnostics |
| --- | --------------- | -------------------- | ------- | ----------------------- | --------------------- | ----------- | ------------------------- |
| 1   | CPython 3.12.3  | 2.3.5 / 0.3.30       | default | `558b6e65…`             | identical to author   | identical   | identical                 |
| 2   | CPython 3.12.3  | 2.3.5 / 0.3.30       | 1       | `558b6e65…`             | identical to run 1    | identical   | identical                 |
| 3   | CPython 3.11.15 | 2.3.5 / 0.3.30       | default | `82ec21e3…`             | differs (Section 5.5) | identical   | identical                 |
| 4   | CPython 3.12.3  | 2.5.3 / 0.3.34.106.0 | default | `cd55c061…`             | differs (Section 5.5) | both differ | identical                 |

Run 1 reproduces the author's `corpus_sha256`
`558b6e65da273bf836204f7d0f5b4bae08cfd85918a23374a475197c2e851ca3`, every summary count, both
witnesses and all three zero-residual diagnostics bit-for-bit on an interpreter build that is not
the author's. Runs 1 and 2 produced byte-identical output files.

### 5.2 Independent derivation of the exact expectations

The reviewer checker (Section 12, `checker.py`, SHA-256
`e8bac1471c8540de09763bbfba79a978946a8b5bab1e72822227872d2277b67b`) derives truth without the
author's `exact()` function and without the orthogonality shortcut:

- inputs are lifted from the actual binary64 values (`Fraction(float(v))`), not the intended
  rationals; 666 of 945 cases have at least one input changed by conversion;
- the full-model coefficients are obtained by Fraction Gaussian elimination on the normal
  equations `X'X b = X'y`, treating `X'X` as a generic matrix;
- `SSE` is the exact squared norm of `y − X b`;
- each effect `SS` is the reduced-model difference `SSE(model without that column) − SSE(full)`,
  each reduced model solved by the same generic elimination;
- `df = N − 4` and `F = SS / (SSE / df)` only when `SSE ≠ 0`.

For all 945 cases the generic route agrees exactly with the closed-form arrangement
(`beta = X'y / N`, `SS = 4 n beta²`, within-cell `W`), so the author's `exact()` is confirmed by
a route that does not share its algebra. Rows serialised as the author's script serialises them
reproduce the author's corpus digest, which confirms that the observed floating values are also
the ones the author's script produces. A negative control that changes the residual degrees of
freedom to `N − 3` in both truth and graphs changes the digest to `d776e515…`, so the digest
comparison is sensitive to the quantities under review.

### 5.3 Graph inspection

| Item                             | Observation                                                                                                                                                                                                                                                                                                                                                                 |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Graph ordering                   | `ss = (4n · v) · v` left to right in binary64; `sse = builtin sum` of `v·v` over residuals; `mse = sse / (4(n−1))`; `f = ss / mse`. The supplement's description ("square coefficients in the specified binary64 order and aggregate squared residuals using builtin sum") matches the code.                                                                                |
| Builtin sum semantics            | Three summation sites use CPython's builtin `sum()` over floats: `builtin_cell` cell means, `builtin_cell` contrast coefficients, and the residual aggregation of **all three** routes. On CPython 3.12 these are Neumaier-compensated (established in the prior QR reviews); on 3.11 they are naive.                                                                       |
| Centered response                | `centered_qr` subtracts `y[0]` and uses the centered response for both the QR solve and the residual `response − X·beta`; the residual vector is algebraically the same as the uncentered one. Centering subtraction is inexact when `y[0]` is large relative to the perturbation (135 cases in the earlier probe).                                                         |
| Projection versus real equality  | `projected_matches` compares `v.hex()` to `float(t).hex()`; `exact_real_matches` requires `Fraction(v) == t`. Of the 2835 exact `SS` targets 102 are not binary64-representable, of the 945 `SSE` targets 141, of the 2835 `F` targets 306. For `SS` the two counts coincide on every route because no route produced the rounded projection of a non-representable target. |
| Zero / nonfinite classification  | `nonfinite` counts non-finite values; `spurious_nonzero_from_exact_zero` counts `t == 0 and v != 0` (a NaN would count, but no NaN occurred); `zero_when_projected_truth_nonzero` counts `v == 0 and float(t) != 0`. All 8505 evaluated values were finite, as claimed.                                                                                                     |
| Denominator domain               | Exact `F` is left undefined (`None`) when exact `SSE == 0`; the 945-case corpus never triggers it (asserted); the three diagnostics do. The floating graphs divide regardless and the result records NaN/inf/finite outcomes. No refusal policy is chosen. Correct as described.                                                                                            |
| `comparison_values_per_quantity` | A literal `dict(ss=2835, sse=945, f=2835)` in the script, not computed; consistent with the recomputed `values` fields (N-1).                                                                                                                                                                                                                                               |
| Witness selection                | Only the selected axis (`j == axis − 1`) and only for `F`; the first two encounters are recorded. Both witnesses were reproduced and are at `n=2, e=0, k=54, axis=1`.                                                                                                                                                                                                       |

### 5.4 Recount

The independent checker recomputed every summary metric and every witness. All 54 counts equal
the author's (three routes × three quantities × six metrics), including the table in the
supplement: projected `SS` 2691 / 314 / 170, projected `SSE` 945 / 648 / 908, projected `F`
2637 / 303 / 162, spurious nonzero `F` 0 / 2134 / 2281, and lost nonzero `F` 105 / 9 / 3 for
`builtin_cell` / `qr` / `centered_qr`.

Denominators the supplement does not print (N-2): 2415 of the 2835 exact `F` targets are exactly
zero (1890 non-selected-axis values by design plus 525 selected-axis values whose perturbation
vanished in binary64 conversion), and only 420 are nonzero. The spurious counts are therefore
rates over 2415 zeros: 2134/2415 for `qr`, 2281/2415 for `centered_qr`, 0/2415 for
`builtin_cell`; on the selected axis alone, 462/525, 501/525 and 0/525.

### 5.5 Meaningful errors, not counts

Magnitudes recomputed from the run 1 corpus (`analyze.py`, SHA-256
`a4530f0a86a04c2c6226e0158985f2e2b827c2f7d2289e314806bb00af740a0f`):

| Route          | Largest `F` where exact `F = 0` | Where                    | Largest `SSE` relative error             | Where                    | Largest exact `F` returned as `0` |
| -------------- | ------------------------------- | ------------------------ | ---------------------------------------- | ------------------------ | --------------------------------- |
| `builtin_cell` | 0                               | —                        | 8.9e-17                                  | `n=5, e=0, k=52`         | 2.0e-31                           |
| `qr`           | 1.9e-6                          | `n=2, e=40, k=0, axis=2` | 1.25e-6 (`1/2` → `0x1.0000150000000p-1`) | `n=2, e=40, k=0, axis=3` | 3.2e-31                           |
| `centered_qr`  | 7.3e-30                         | `n=14, e=0, k=0, axis=2` | 2.2e-16                                  | `n=3, e=0, k=53`         | 4.2e-31                           |

Reading: the 105 / 9 / 3 "lost" nonzero targets all have exact `F` below 5e-31; every one of
them arises at `e=0` with `k ∈ {52, 53, 54, 60}`, where the surviving perturbation after input
rounding is a few units in the last place and the exact `F` is an artefact of asymmetric
rounding. They are not evidence that any route drops a practically meaningful `F`. The
uncentered `qr` route's meaningful error is at large offsets (`e=40`), where its `SSE` is wrong
by about one part in a million and spurious `F` values of order 1e-6 appear; centering repairs
that class (7e-30) but not the tiny-perturbation class. The `builtin_cell` route on CPython 3.12
has no spurious value anywhere on this corpus. Relative errors on nonzero `F` targets are
dominated by targets of order 1e-38, where relative error is not meaningful; the largest
absolute errors on nonzero targets are of the same 1e-31 order as the lost targets except the
`e=40` `qr` cases above.

Environment dependence (runs 3 and 4):

| Change                                       | `builtin_cell`                                                      | `qr`                                                                                 | `centered_qr`                                                                       |
| -------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| CPython 3.11.15 (same NumPy)                 | spurious `F` 0 → **10**; lost 105 → 117; projected `SS` 2691 → 2681 | projected `SSE` 648 → 629; `SS`/`F` rows unchanged                                   | projected `SSE` 908 → 750; projected `F` 162 → 163                                  |
| NumPy 2.5.3 / OpenBLAS 0.3.34 (same CPython) | unchanged                                                           | projected `SS` 314 → 210; spurious `F` 2134 → 2236; witness `0x1.c6f6e4f27c83ep-212` | projected `SS` 170 → 80; spurious `F` 2281 → 2386; witness `0x1.b857f92c82316p-215` |

Both witnesses keep their sign and order of magnitude on the other BLAS build; the zero-residual
diagnostics are identical in all four runs. The interpreter change reaches all three routes
because the residual aggregation uses the builtin sum; the BLAS change reaches only the QR rows.
These are environment differences, not code or mathematical errors: the corpus digest is a
function of the interpreter's summation and the BLAS build, as the supplement says.

### 5.6 Zero-residual diagnostics

Reproduced exactly on every run. Confirmed readings: the constant dataset gives uncentered `SSE`
`0x1.2p-95` and three finite `F` from `qr`, and `0/0 = NaN` from the other two routes; the
`[0, 1, 2, 4]` dataset gives `SSE = 0` and `inf` from `builtin_cell`, and `SSE` `0x1.3p-99` with
finite `F` of order 2^104 from both QR routes; the `2^40`-offset dataset gives `SSE` `0x1.8p-21`
from `qr` and, from `centered_qr`, values bitwise identical to the second dataset because
subtracting `2^40` maps it onto `[0, 1, 2, 4]` exactly (N-4). The supplement's sentences about
these diagnostics are accurate. The observation supports investigating a residual-domain
decision and selects nothing.

### 5.7 Prose claims of the supplement

| Claim                                                                          | Assessment                                                                                                                  |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| Corpus composition 15 × 3 × 7 × 3 = 945; truth from actual binary64 inputs     | confirmed                                                                                                                   |
| `SS = 4 n beta²`, `df = 4(n−1)`, `F = SS/(SSE/df)`; identities asserted        | confirmed; consistent with the semantic result's `SSA = n dA²` with `dA = 2 beta` and `SSAB = n dAB²/4` with `dAB = 4 beta` |
| Graph descriptions of the three routes                                         | confirmed (Section 5.3)                                                                                                     |
| "Python 3.12 sum behavior matters"; BLAS values not portable                   | confirmed and quantified (Section 5.5); see SF-2 for the strength of the statement                                          |
| Table of counts                                                                | confirmed                                                                                                                   |
| All values finite on this corpus; no safety for larger magnitudes              | confirmed; correctly bounded                                                                                                |
| Witness values and "not evidence of a practically significant false rejection" | confirmed                                                                                                                   |
| Zero-residual paragraph                                                        | confirmed                                                                                                                   |
| "Cell graph loses 105 nonzero projected F targets"                             | supported on the corpus as a count; see SF-1 for the missing magnitude                                                      |
| No bound, tolerance, rank policy, p-value, interval, platform guarantee        | none is stated or implied; no normative keyword; no registry, schema, conformance, reference or generated path touched      |

No claim overstates a domain or inferential conclusion. Bitwise-match counts are not presented
as statistical rejection rates.

## 6. Preparation and source review

### 6.1 R4-P1 to R4-P6 mapping

The readiness table restates the six holds of the Release 4 preparation README without
renaming, merging or weakening any of them, and its "Work before opening" column is consistent
with the README's "Required resolution" column. The statement that "a missing proof can be an
explicit implementation hold where preparation permits it; an unsupported scientific claim is not
made acceptable by calling it a discussion draft" is the correct reading of the README's "resolved
or explicitly bounded" condition: R4-P3 and R4-P4 admit explicit holds by their own wording;
R4-P1 does not for any inferential claim the proposal retains.

Other checks: the input table's three commits and blobs are correct (Section 3); the statement
that PR 191's `GO` leaves the model-independence question and programme `INPUT_INCOMPLETE` open
matches that review's closing line ("MODEL-LEVEL INDEPENDENCE PENDING - PROGRAMME
INPUT_INCOMPLETE UNCHANGED"); the correction that the Biometrika 39 (1952) 65–81 paper is by
E. J. Williams matches the semantic result's S2 row and the publisher record located by search;
the `COMPLETE_ON_PROVIDED_COPIES` statement matches the addendum on `main` and is correctly
limited to the two documentation pages of the QR supplement.

### 6.2 Hidden methodological choices in Candidate A

Searched for choices made without being declared: factor and level order (declared);
main-effect averaging weights (equal over the other factor, declared, matching the semantic
result); interaction normalisation (`dAB` versus `dAB/2` versus coded `dAB/4`, all three
distinguished); denominator (full-model residual `SSE/[4(n−1)]`, stated in the supplement and
implied by "retain the full model"); error model (normal, independent, common variance, named
in R4-P1 as still needing sources rather than assumed); randomisation versus model-based
inference (kept separate in R4-P1 and in the PR 219 follow-up); intervals (inclusion and level
left undecided); multiplicity (no guarantee offered); replication minimum (`n ≥ 2`, from the
README); upper resource bound (not chosen; explicit hold); zero-residual behaviour (not chosen;
explicit hold). No undeclared selection was found. The proposal does not import an unbalanced
Type I–IV convention because balance is required.

### 6.3 S1–S6 staging

| Hold | Needed before opening a Candidate A discussion?                                                                                                                                                                                              |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| S1   | Yes for any retained F or interval claim: the balanced factorial test basis is the S1 target. Alternatively the proposal must present those claims as unsupported and held, not as proposed guarantees.                                      |
| S2   | No, provided interaction decomposition and data-selected contrasts stay excluded (they are).                                                                                                                                                 |
| S3   | No for Candidate A; required before any unbalanced exclusion rationale claims that the labels are ambiguous on original-source grounds rather than on the semantic result's executed counterexample.                                         |
| S4   | No for Candidate A; the exclusion of heteroscedastic and permutation methods is a scope choice, and the readiness document says exclusion is not a validity claim.                                                                           |
| S5   | Yes, same condition as S1: the F null distribution, residual degrees of freedom and any interval formula need original support before they are proposed as verifiable claims.                                                                |
| S6   | Not waived by narrowing. It can remain a staged research hold while Candidate A is discussed, if and only if the proposal's exclusion of unbalanced designs does not rely on a software-disagreement claim that S6 was commissioned to test. |

The prompt's warning not to waive S6 "solely because the proposed first scope is smaller" is
honoured by the readiness document (work-order item 4) and by this staging.

### 6.4 S6 two-system execution

Not carried out. R is not installed in this container (`which R Rscript` returned nothing) and
no second statistical system was available; algebraic reconstruction would not satisfy the task.
S6 remains open exactly as the semantic result records it.

## 7. Source access

Attempted 2026-09-08 (08:17–08:25 UTC) by direct HTTPS through the session's egress proxy
(`curl`) and by the session's web text-extraction tool. Every attempt below failed with a proxy
`403` on `CONNECT` or `EGRESS_BLOCKED`; no bytes of any target were received.

| Target                                                                                    | Host                                                    | Result  |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------- | ------- |
| Cochran 1934 abstract page and Cambridge Core PDF route (DOI `10.1017/S0305004100016595`) | `www.cambridge.org`, `doi.org`, `api.crossref.org`      | blocked |
| Yates 1937 Internet Archive scan (item `in.ernet.dli.2015.449111`)                        | `archive.org`                                           | blocked |
| Yates 1937 catalogue records (HathiTrust `002016019`; Rothamsted repository item `98765`) | `catalog.hathitrust.org`, `repository.rothamsted.ac.uk` | blocked |
| Yates 1937 Google Books record (`YW1OAAAAMAAJ`)                                           | `books.google.com`                                      | blocked |
| Nature 142, 90 (1938) book review                                                         | `www.nature.com`                                        | blocked |
| Fisher 1925 chapters V and VIII, Classics in the History of Psychology transcription      | `psychclassics.yorku.ca`                                | blocked |
| ADS record `1934PCPS...30..178C`                                                          | `ui.adsabs.harvard.edu`                                 | blocked |

Status: **`SOURCE_ACCESS_INCOMPLETE`** for S1 and S5. Nothing was substituted: no abstract,
snippet, catalogue record, secondary summary or recollection was used to support any inferential
claim, and no acquisition hash is claimed. The `COMPLETE_ON_PROVIDED_COPIES` disposition of the
two QR-supplement documentation pages was not re-litigated.

Acquisition request (discovery only; every identity below is a search-result identity that has
not been inspected and must be verified on retrieval): (1) W. G. Cochran, "The distribution of
quadratic forms in a normal system, with applications to the analysis of covariance",
Proceedings of the Cambridge Philosophical Society 30(2), 178–191, 30 April 1934, DOI
`10.1017/S0305004100016595`, Cambridge Core online date reported as 24 October 2008; (2) F.
Yates, _The Design and Analysis of Factorial Experiments_, Imperial Bureau of Soil Science
Technical Communication 35, Harpenden, 1937, for which search reports a Digital Library of India
scan on the Internet Archive (item `in.ernet.dli.2015.449111`, reported 98 pages), a HathiTrust
catalogue record `002016019` and a Rothamsted Research repository item `98765`; (3) the York
University transcription is reported by search to be of the 1925 first edition (Oliver and
Boyd), which would need edition verification against the printed text before use. For each
retrieved file record provider, edition, retrieval date, byte length, SHA-256 and any missing
pages, and keep inspection permission separate from redistribution permission.

## 8. Public-opening readiness

Not ready, and not claimed to be by the input. Open before any opening decision: R4-P1 (S1/S5
originals for retained claims; reviewed semantic catalogue still `INPUT_INCOMPLETE`), R4-P3
(this review covers the SS/F probe only; tails, intervals and resource bounds remain holds),
R4-P5 (no standalone RFC exists at this head; PR 219 is a preparation draft) and R4-P6 (no
assembled proposal exists to review). R4-P2 is recommended, not reviewed as adopted. R4-P4
remains conditional. Questions that can remain public discussion topics without blocking an
opening, once the above are resolved or explicitly held: interval inclusion and level,
multiplicity treatment, numerical route and tolerance, zero-residual reason-code behaviour, and
the Release 3 dependency.

## 9. Findings

### BLOCKER

None.

### SF-1 (`SHOULD-FIX`) — report magnitudes next to the counts

The table and the sentence "The cell graph loses 105 nonzero projected F targets in this corpus,
so its higher bit-match count is not a blanket recommendation" are accurate as counts but give
the reader no way to see that all 105 (and the 9 and 3) lost targets are exact `F` values below
5e-31 produced by input rounding, while the uncentered `qr` route's meaningful error is a
1.25e-6 relative `SSE` error and spurious `F` of order 1e-6 at `e=40`, and `centered_qr`'s
spurious values never exceed 7.3e-30. Add one magnitude row per route (Section 5.5) and the
exact-zero denominator (N-2). Without it the counts can be read as ranking routes, which the
supplement says they must not do. No number changes.

### SF-2 (`SHOULD-FIX`) — state that the `builtin_cell` zero-spurious result and all `SSE` counts are interpreter-specific

"Python 3.12 sum behavior matters" is true but weaker than the evidence: on CPython 3.11.15 with
the same NumPy the `builtin_cell` route produces 10 spurious nonzero `F` values from exact zeros
and the `SSE` columns of all three routes change, because the residual aggregation of every
route uses the builtin sum. The accepted QR supplement was repaired to say "the interpreter is
part of the operation definition"; this supplement should say the same for its three summation
sites and record one counter-interpreter. No number changes.

### N-1 (`NICE-TO-HAVE`)

`comparison_values_per_quantity` is a literal in the script. Compute it from the summary so the
result cannot drift from the counts.

### N-2 (`NICE-TO-HAVE`)

Print the exact-zero denominators (2415 of 2835 `F` targets; 525 of 945 selected-axis targets)
so that 2134 and 2281 read as rates over exact zeros.

### N-3 (`NICE-TO-HAVE`)

Record the NumPy 2.5.3 / OpenBLAS 0.3.34 counter-example (Section 5.5): QR rows and both
witnesses change, `builtin_cell` does not. The supplement's non-portability sentence already
covers it; a concrete instance stops a reader from treating the QR rows as more portable than
the cell row.

### N-4 (`NICE-TO-HAVE`)

Say that the third zero-residual diagnostic's `centered_qr` values are bitwise those of the
second diagnostic (exact centering onto `[0, 1, 2, 4]`), so the centered route contributes two,
not three, distinct observations.

### N-5 (`NICE-TO-HAVE`)

The readiness document's "approximately 50%" planning estimate has no artifact behind it. It is
labelled as a planning judgment; consider removing it from a document intended for outsiders.

### N-6 (`NICE-TO-HAVE`)

The review prompt's deliverable path and the PR 219 handoff's path differ
(`r4-public-discussion-preparation` versus `r4-rfc-preparation`); both are followed here. A
future prompt could name the numerical and editorial lanes in one index to keep the pair
discoverable.

## 10. Bounded verdict

| Determination            | Verdict                                                                                                                                                                                         |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Numerical correctness    | **`GO`** at `4cf3e12a…`: independently derived expectations, bit-for-bit reproduction, accurate prose, environment dependence characterised; two prose `SHOULD-FIX` items, no count invalidated |
| Source access            | **`SOURCE_ACCESS_INCOMPLETE`** (S1, S5); acquisition request recorded                                                                                                                           |
| Public-opening readiness | **`NOT_READY`**; R4-P1, R4-P3 (beyond this probe), R4-P5, R4-P6 open; no hold waived                                                                                                            |
| Formal adoption          | not requested; nothing adopted, selected, allocated or opened                                                                                                                                   |
| Programme                | semantic and numerical `INPUT_INCOMPLETE` unchanged                                                                                                                                             |

A `GO` on this supplement does not authorise public opening of Release 4.

## 11. Validation record

Executed in the session clone after `pnpm install --frozen-lockfile` (pnpm 11.7.0, Node
22.22.2, tsx 4.23.11):

| Check                                                              | Result                          |
| ------------------------------------------------------------------ | ------------------------------- |
| `pnpm exec prettier --check` on the two files added by this review | pass                            |
| `pnpm format:check`                                                | pass                            |
| `pnpm lint:markdown`                                               | see the commit-time count below |
| `pnpm typecheck`                                                   | pass                            |
| `node --import tsx tooling/src/validate.ts`                        | all validators clean            |
| `git diff --check`                                                 | clean                           |

The `pnpm check` test suite and the Phase 1 suite were not run: no authoritative, registry,
schema, conformance, reference, generated or evidence path is touched by this review. The
counts recorded at commit time: Markdown lint 366 files, 0 issues (this review branch is based on `main` `cd217f88…` plus the two review files).

Files created by this review: `review-inputs/r4-public-discussion-preparation/REVIEW-RESULT.md`
and `review-inputs/r4-rfc-preparation/REVIEW-RESULT.md`. No other artifact changed. The reviewed
input files were executed from a scratch extraction of the input tree, not modified.

## 12. Reviewer scripts

`checker.py` (SHA-256 `e8bac147…`), run as `python checker.py rows.json`, needs no input file:
it regenerates the corpus from the formula stated in the supplement (the only shared element),
computes truth by generic exact least squares and reduced-model differences, re-executes the
floating graphs with the same NumPy calls, recomputes every metric, and dumps the rows:

```python
"""Independent checker for PR 218 ss-f-propagation probe.
Truth is derived by generic exact least squares (Fraction Gaussian elimination on
the normal equations, no orthogonality shortcut), with effect SS obtained as
SSE(reduced model without the effect) - SSE(full model).  Floating graphs are
re-executed with the same NumPy calls; rows are serialized like the author script
so the corpus SHA-256 can be compared; summary counts are recomputed independently."""
from fractions import Fraction as Q
import hashlib, json, math, sys, platform, os
import numpy as np

SIGNS = [(1, -1, -1, 1), (1, -1, 1, -1), (1, 1, -1, -1), (1, 1, 1, 1)]

def solve_exact(A, b):
    """Gaussian elimination with Fractions; returns solution of A x = b (A square, full rank)."""
    n = len(A); M = [list(map(Q, row)) + [Q(v)] for row, v in zip(A, b)]
    for i in range(n):
        p = next(r for r in range(i, n) if M[r][i] != 0)
        M[i], M[p] = M[p], M[i]
        for r in range(n):
            if r != i and M[r][i] != 0:
                f = M[r][i] / M[i][i]
                M[r] = [a - f * c for a, c in zip(M[r], M[i])]
    return [M[i][n] / M[i][i] for i in range(n)]

def sse_of(cols, y):
    """Exact SSE of least squares of y on the given design columns."""
    k = len(cols)
    XtX = [[sum(cols[i][r] * cols[j][r] for r in range(len(y))) for j in range(k)] for i in range(k)]
    Xty = [sum(cols[i][r] * y[r] for r in range(len(y))) for i in range(k)]
    beta = solve_exact(XtX, Xty)
    fitted = [sum(beta[j] * cols[j][r] for j in range(k)) for r in range(len(y))]
    return sum((yy - ff) ** 2 for yy, ff in zip(y, fitted)), beta

def truth_generic(yf, n):
    y = [Q(float(v)) for v in yf]
    N = 4 * n
    cols = [[Q(SIGNS[r // n][j]) for r in range(N)] for j in range(4)]
    sse_full, beta = sse_of(cols, y)
    ss = []
    for j in (1, 2, 3):
        reduced = [cols[i] for i in range(4) if i != j]
        sse_red, _ = sse_of(reduced, y)
        ss.append(sse_red - sse_full)
    df = N - 4
    f = [v / (sse_full / df) for v in ss] if sse_full != 0 else None
    return {'ss': ss, 'sse': [sse_full], 'f': f}, beta

def graphs(y, n):
    X = np.array([s for s in SIGNS for _ in range(n)], dtype=np.float64)
    q, r = np.linalg.qr(X, mode='reduced')
    means = [sum(float(v) for v in y[c*n:(c+1)*n])/n for c in range(4)]
    b = [sum(means[c]*SIGNS[c][j] for c in range(4))/4 for j in range(4)]
    residual = [float(y[c*n+i])-means[c] for c in range(4) for i in range(n)]
    out = [('builtin_cell', b, residual)]
    for name, response in [('qr', y), ('centered_qr', y-y[0])]:
        beta = np.linalg.solve(r, q.T @ response)
        out.append((name, beta, response-X @ beta))
    answer = {}
    with np.errstate(all='ignore'):
        for name, beta, residual in out:
            ss = [float(np.float64(4*n)*np.float64(v)*np.float64(v)) for v in beta[1:]]
            sse = float(sum(float(np.float64(v)*np.float64(v)) for v in residual))
            mse = float(np.float64(sse)/np.float64(4*(n-1)))
            f = [float(np.float64(v)/np.float64(mse)) for v in ss]
            answer[name] = {'ss': ss, 'sse': [sse], 'f': f}
    return answer

def projection(v):
    try: return float(v)
    except OverflowError: return math.copysign(math.inf, v.numerator)

def metrics():
    return dict(values=0, exact_real_matches=0, projected_matches=0, nonfinite=0,
                spurious_nonzero_from_exact_zero=0, zero_when_projected_truth_nonzero=0)

summary = {name: {k: metrics() for k in ('ss','sse','f')} for name in ('builtin_cell','qr','centered_qr')}
rows = []; witnesses = []; lost = []; spurious_by = {}; nonrepresentable = {'ss':0,'sse':0,'f':0}
truth_zero_f = 0; cases = 0; rounded_inputs = 0
for n in range(2,17):
    for e in (0,20,40):
        for k in (0,20,40,52,53,54,60):
            for axis in (1,2,3):
                intended = [Q(2)**e+s[axis]*Q(2)**(-k)+Q(2*i-(n-1),4) for s in SIGNS for i in range(n)]
                y = np.array([float(v) for v in intended], dtype=np.float64)
                rounded_inputs += any(Q(float(v)) != v for v in intended)
                truth, beta = truth_generic(y, n)
                assert truth['f'] is not None
                # cross-check: closed-form cell-mean arrangement
                a = [Q(float(v)) for v in y]
                means = [sum(a[c*n:(c+1)*n])/n for c in range(4)]
                bcf = [sum(means[c]*SIGNS[c][j] for c in range(4))/4 for j in range(4)]
                assert bcf == beta, (n,e,k,axis)
                assert [4*n*b_*b_ for b_ in bcf[1:]] == truth['ss']
                W = sum((a[c*n+i]-means[c])**2 for c in range(4) for i in range(n))
                assert W == truth['sse'][0]
                cases += 1
                for j in range(3):
                    truth_zero_f += truth['f'][j] == 0
                for qn in ('ss','sse','f'):
                    for t in truth[qn]:
                        nonrepresentable[qn] += Q(projection(t)) != t if math.isfinite(projection(t)) else 1
                routes = graphs(y,n)
                for name, values in routes.items():
                    for qn in ('ss','sse','f'):
                        for j,(v,t) in enumerate(zip(values[qn],truth[qn])):
                            m = summary[name][qn]; m['values'] += 1
                            m['nonfinite'] += not math.isfinite(v)
                            m['exact_real_matches'] += math.isfinite(v) and Q(v)==t
                            m['projected_matches'] += v.hex()==projection(t).hex()
                            m['spurious_nonzero_from_exact_zero'] += t==0 and v!=0
                            m['zero_when_projected_truth_nonzero'] += v==0 and projection(t)!=0
                            if qn=='f' and v==0 and projection(t)!=0:
                                lost.append((name,n,e,k,axis,j+1,float(t)))
                            if qn=='f' and t==0 and v!=0:
                                spurious_by.setdefault(name,{}).setdefault((e,k),0); spurious_by[name][(e,k)]+=1
                            if qn=='f' and j==axis-1 and t==0 and v!=0 and len(witnesses)<2:
                                witnesses.append(dict(n=n,e=e,k=k,axis=axis,route=name,truth=str(t),observed=v.hex()))
                rows.append(dict(n=n,e=e,k=k,axis=axis,
                    truth={key:[str(v) for v in val] for key,val in truth.items()},
                    observed={name:{key:[v.hex() for v in val] for key,val in values.items()} for name,values in routes.items()}))

payload = json.dumps(rows,sort_keys=True,separators=(',',':')).encode()
print("python", platform.python_version(), "numpy", np.__version__, "threads", os.environ.get('OPENBLAS_NUM_THREADS','unset'))
print("cases", cases, "rows_with_rounded_inputs", rounded_inputs, "truth_zero_F_values", truth_zero_f)
print("corpus_sha256", hashlib.sha256(payload).hexdigest())
print("nonrepresentable_truth_values", nonrepresentable)
print(json.dumps(summary, sort_keys=True))
print("witnesses", json.dumps(witnesses))
# zero-residual diagnostics
zr = []
for means in ([7.,7.,7.,7.],[0.,1.,2.,4.],[2.**40,2.**40+1,2.**40+2,2.**40+4]):
    y = np.repeat(np.array(means),2); t,_ = truth_generic(y,2); assert t['f'] is None and t['sse'][0]==0
    vals = graphs(y,2)
    zr.append({name:{'sse':v['sse'][0].hex(),'finite_f_count':sum(math.isfinite(x) for x in v['f']),'f':[x.hex() for x in v['f']]} for name,v in vals.items()})
print("zero_residual", json.dumps(zr))
# lost nonzero F targets: characterise
from collections import Counter
print("lost_by_route_e_k", Counter((l[0],l[2],l[3]) for l in lost))
print("lost_magnitudes_builtin", sorted(set(l[6] for l in lost if l[0]=='builtin_cell'))[:10], "max", max((l[6] for l in lost if l[0]=='builtin_cell'), default=None))
print("lost_max_by_route", {r: max((l[6] for l in lost if l[0]==r), default=None) for r in ('builtin_cell','qr','centered_qr')})
print("spurious_f_by_route_e_k", {r: sorted(d.items()) for r,d in spurious_by.items()})
if len(sys.argv) > 1:
    json.dump(rows, open(sys.argv[1],'w'))
```

`analyze.py` (SHA-256 `a4530f0a…`), run on the dumped rows, produced the magnitude table of
Section 5.5:

```python
import json, math, sys
from fractions import Fraction as Q
rows = json.load(open(sys.argv[1]))
routes = ('builtin_cell','qr','centered_qr')
res = {r:{q:dict(max_spurious=0.0, max_spurious_case=None, max_rel=0.0, max_rel_case=None, n_nonzero=0, n_zero=0) for q in ('ss','sse','f')} for r in routes}
sel = {r:dict(zero_truth=0, spurious=0, max_spurious=0.0) for r in routes}
for row in rows:
    for r in routes:
        for q in ('ss','sse','f'):
            for j,(vh,ts) in enumerate(zip(row['observed'][r][q], row['truth'][q])):
                v = float.fromhex(vh); t = Q(ts)
                d = res[r][q]
                if t == 0:
                    d['n_zero'] += 1
                    if abs(v) > d['max_spurious']:
                        d['max_spurious'] = abs(v); d['max_spurious_case'] = (row['n'],row['e'],row['k'],row['axis'],j+1)
                else:
                    d['n_nonzero'] += 1
                    rel = abs((Q(v) - t)/t)
                    if rel > d['max_rel']:
                        d['max_rel'] = float(rel); d['max_rel_case'] = (row['n'],row['e'],row['k'],row['axis'],j+1, ts, vh)
                if q=='f' and j==row['axis']-1 and t==0:
                    sel[r]['zero_truth'] += 1
                    if v != 0:
                        sel[r]['spurious'] += 1; sel[r]['max_spurious'] = max(sel[r]['max_spurious'], abs(v))
for r in routes:
    for q in ('ss','sse','f'):
        d = res[r][q]
        print(r, q, "zero-truth", d['n_zero'], "nonzero-truth", d['n_nonzero'], "max|v| on zero truth", repr(d['max_spurious']), d['max_spurious_case'], "max rel err on nonzero truth", repr(d['max_rel']), d['max_rel_case'])
print("selected-axis F:", sel)
```

RELEASE 4 PUBLIC DISCUSSION PREPARATION REVIEW COMPLETE - NUMERICAL GO AT 4cf3e12a - SOURCE ACCESS INCOMPLETE - NOT READY TO OPEN - MODEL-LEVEL INDEPENDENCE ONLY - PROGRAMME INPUT_INCOMPLETE UNCHANGED - NOT MERGE APPROVAL - NOT PROTOCOL ADOPTION
