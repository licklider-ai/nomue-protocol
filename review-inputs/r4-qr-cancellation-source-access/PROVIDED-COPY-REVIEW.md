# Release 4 QR and Cancellation Supplement — Provided-Copy Review of the Two Documentation Pages

**Status: informative independent review; non-normative; not adopted.**

This report follows `REVIEW-RESULT.md` in this directory (commit `284bdf79…`, Section 3),
which recorded that neither documentation page could be retrieved from the reviewing session.
It reviews the copies of both pages that were subsequently provided in an acquisition packet.
It does not overwrite or amend the earlier report.

## 1. Verdict

| Dimension                           | Result                                                                                                                                                                                                                                           |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Scope                               | Provenance and content of provided copies of the NIST/SEMATECH two-way ANOVA page and the LAPACK Users' Guide linear least squares page, against the supplement's bounded claims; nothing else                                                   |
| Input identity                      | complete and matching; `INPUT_INCOMPLETE` not raised (Section 3)                                                                                                                                                                                 |
| Packet integrity                    | every hash in `SHA256SUMS`, `acquisition.json`, and `nist-intake.json` re-computed and matched; inner NIST ZIP byte-identical to the unpacked copies (Section 4)                                                                                 |
| LAPACK page, provenance             | **supplied author-acquired copy** (Python `urllib`, HTTP 200, 10,807 bytes, SHA-256 `763c46f0…`); not a reviewer retrieval (Section 5.1)                                                                                                         |
| LAPACK page, content                | **`CONFIRMED_ON_PROVIDED_COPY`** for B-1, B-2, B-3; all eight equation images inspected and matching their `ALT` text; no contradiction (Section 6.2)                                                                                            |
| NIST page, provenance               | **user-supplied copy, supplier-reported as `curl`-acquired** (11,162 bytes, SHA-256 `737359e7…`); HTTP status, absence of redirect, and User-Agent are supplier statements; no response headers or exact command supplied (Section 5.2)          |
| NIST page, content                  | **`CONFIRMED_ON_PROVIDED_COPY`** for A-1 to A-4 from the active TeX and the HTML ANOVA table; the seven legacy GIFs inspected and consistent; notation discrepancies recorded, not corrected (Section 6.1)                                       |
| Missing assets                      | MathJax, NIST header/footer CSS/JS, analytics, navigation images not archived; none carries mathematical content; no effect on the bounded evidence (Section 5.3)                                                                                |
| Contradictions                      | none between either provided copy and the supplement (Section 7)                                                                                                                                                                                 |
| Source-access status                | **`SOURCE_ACCESS_INCOMPLETE` retained, residual narrowed to provenance only**: every content item of PR 210 Section 12 item 1 is now checked with a raw-HTML hash, but no independent retrieval from the official hosts has occurred (Section 8) |
| Existing content verdict            | PR 210's `GO` for the supplement at `0be8bb15…` is neither re-assessed nor reopened; this review adds no finding against it (Section 8)                                                                                                          |
| New findings against the supplement | 0 `BLOCKER`, 0 `SHOULD-FIX`, 0 `NICE-TO-HAVE`; packet-level and page-level observations P-1 to P-7 in Section 9, none graded                                                                                                                     |
| Independence status                 | model/provider and work-context independence from the author; same model family as the PR 208 and PR 210 reviewers; same session as the earlier report in this directory; no human-investigator independence (Section 2)                         |

`CONFIRMED_ON_PROVIDED_COPY` means that the text and images actually present in the supplied
bytes support the supplement's statement at the quoted location. It is not a statement that the
supplied bytes are what the official host serves; that is the provenance row, kept separate.
Hash equality and successful acquisition were not used to infer content validity, and content
consistency was not used to infer provenance.

## 2. Independence, roles, and boundary

- **Commission.** The repository maintainer (GitHub `tasuku-kobayashi`) supplied the packet
  `r4sourcehandoff20260908_1.zip` (SHA-256 `61edb647…`, 48,116 bytes) and asked that the
  source-only review resume under the packet's `README.md`. The same maintainer authored or
  commissioned the supplement, opened PR 205, PR 208, and PR 210, commissioned both prior
  reviews and the earlier report in this directory, and, by the packet's own record, personally
  performed the NIST acquisition.
- **Packet preparer.** The packet's `README.md` states it was "prepared in the continuing
  OpenAI-assisted authoring context" as "an author/coordinator acquisition packet, not an
  independent review or a source-access closure decision." The LAPACK copy and
  `acquisition.json` come from that context; the NIST copy came to that context from the
  maintainer and was passed through unchanged (Section 4).
- **Reviewer.** This review was produced by an Anthropic model in a Claude Code remote session.
  The session service reports the configured model and the model that served the latest turn
  as `claude-fable-5-1`. It is the same session that produced `REVIEW-RESULT.md` at
  `284bdf79…`, so this follow-up is a continuation by the same reviewer, not a second
  reviewer. The PR 208 and PR 210 reviews were produced by the same model family in different
  sessions. This pass is therefore separate from the author's model and provider, but not a
  different model family from the prior reviewers; that is disclosed, not claimed as further
  independence.
- **Human role.** The maintainer's `curl` acquisition of the NIST page is the only human action
  in the evidence chain, and it was performed by the party that commissioned the work under
  review. No human investigator independent of the author inspected either page. No human
  expert review supplemented this pass.
- **Assisting tools.** `git` and the GitHub API through the session's GitHub tool (identity of
  inputs and of commit `284bdf79…`); `unzip`, `sha256sum`, `file`, and Python 3 standard
  library for hash and structure checks; Pillow 12.3.0 installed into a scratch virtual
  environment solely to enlarge the GIF images for inspection; the session's image viewer for
  reading the GIFs and enlarged PNGs. No network access to `itl.nist.gov` or `www.netlib.org`
  was attempted in this pass, since `REVIEW-RESULT.md` Section 4 already established the
  egress denial and the proxy documentation forbids retrying policy denials.
- **What was not used.** No search-engine snippet, no recollection of either page, no
  author summary as evidence, and no page hash as a substitute for reading. The supplement's
  own descriptions of the pages were read only as the claims under review.
- **Git metadata.** The review commit's author and committer fields carry the intake tooling
  identity configured in the session container, not a human reviewer's name. The accountable
  role, scope, and boundary are those stated here.
- **Branch (disclosed).** Committed on the session-designated branch
  `claude/pr210-nist-lapack-verification-j44enn` on top of `284bdf79…`. No PR is opened by this
  review.

## 3. Exact identity

| Field                                   | Re-derived value                                                                                                                                                                                                                                                                                  | Matches packet README |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| Supplement                              | commit `0be8bb1519d7aec2810b03192de6590ec9168c60`, path `governance/drafts/release-4-preparation/qr-cancellation-supplement.md`, blob `007d689e2c44f50df6242137348add66c5019cc8`                                                                                                                  | yes                   |
| Close review                            | commit `f599e1350e0eb48ee168ac726d0244ebd51de802`, path `review-inputs/r4-qr-cancellation-supplement-close/REVIEW-RESULT.md`, blob `3a27ff94092349e7d8bba7d41e1197ba2f138951`; Sections 5, 9, 12 read                                                                                             | yes                   |
| Earlier report in this directory        | `284bdf79…` resolves to `284bdf794b90d5a74af1f02c97da900e8f56b1e0`, sole parent `f599e135…`, GitHub commit page confirms one added file `review-inputs/r4-qr-cancellation-source-access/REVIEW-RESULT.md` (+300), blob `13167c8177db618a889831375aca41dc21ce9dee`, committed 2026-09-08T06:20:34Z | yes                   |
| Packet                                  | `r4sourcehandoff20260908_1.zip`, SHA-256 `61edb647e867e4e26bc3771acce2eb2e2361924610ba34d7612fa9b184984ba4`, 48,116 bytes; `README.md` SHA-256 `5bb27f83…`; `SHA256SUMS` SHA-256 `b5f7b5c4…`                                                                                                      | —                     |
| `PROVIDED-COPY-REVIEW.md` pre-existing? | no, neither locally nor on the remote branch                                                                                                                                                                                                                                                      | —                     |

The identity of `284bdf79…` was checked from GitHub as the packet README asks, and the packet
itself does not verify that report; nothing in this follow-up relies on the packet's description
of it. The packet's timestamps (06:23–06:43 UTC) post-date that commit (06:20 UTC), consistent
with the README's account of the sequence.

## 4. Packet integrity

Verified on 2026-09-08 between 06:45 and 06:48 UTC in the session container.

- `sha256sum -c SHA256SUMS`: 10 of 10 entries `OK`; the set of files covered by `SHA256SUMS`
  equals the set of files present other than `SHA256SUMS` itself (no uncovered and no missing
  file).
- `acquisition.json`: 19 records with a `file` field; for every one the recorded `bytes` and
  `sha256` equal the re-computed values of the packet file. 18 of them carry
  `html_img_attributes`; parsed in document order, the 18 `IMG` elements of
  `lapack/original.html` have attribute dictionaries identical to those 18 records.
- `nist-intake.json`: all nine listed file hashes and sizes equal the re-computed values; the
  inner archive `supplied-archives/nist_prc437.zip` (SHA-256 `08d28a2e…`, 14,607 bytes) unpacks
  to nine files whose SHA-256 values are identical, file for file, to those under
  `nist-supplied/`. The Japanese-named acquisition record inside the inner ZIP is stored under
  a `#Uxxxx`-escaped name and is byte-identical to the Japanese-titled acquisition record text file under `nist-supplied/` (title meaning "acquisition record"; escaped in the inner ZIP as `#U53d6#U5f97#U8a18#U9332.txt`).
- `file(1)`: both HTML files are ASCII text with LF line endings and no bytes above 0x7F; all
  25 GIFs are single-frame GIF87a/89a images with the pixel dimensions given in the `IMG`
  attributes (LAPACK) or the commented `IMG` attributes (NIST, e.g. `mod2way.gif` 209×41,
  `twoss.gif` 272×225 against a commented `width=270`, `anova19.gif` 506×205 against a commented
  `width=508`; the two-pixel differences are in the legacy comments, not in the images).

A matching hash establishes only that the packet is internally consistent and unmodified since
its records were written. It establishes nothing about what the official hosts serve.

## 5. Provenance, per page

### 5.1 LAPACK Users' Guide, `https://www.netlib.org/lapack/lug/node27.html`

| Field                   | Value                                                                                                                                                                                                                                                                                             | Basis                                           |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| Class                   | supplied author-acquired copy                                                                                                                                                                                                                                                                     | packet README and `acquisition.json`            |
| Retrieval time          | started 2026-09-08T06:23:14.66Z (HTML); images 06:23:26Z to 06:24:20Z                                                                                                                                                                                                                             | `acquisition.json` (author-recorded)            |
| Requested URL           | `https://www.netlib.org/lapack/lug/node27.html`                                                                                                                                                                                                                                                   | `acquisition.json`                              |
| Final URL               | identical to requested URL (no redirect recorded)                                                                                                                                                                                                                                                 | `acquisition.json` (author-recorded)            |
| Method                  | Python `urllib` with redirects enabled, response body saved without rewriting                                                                                                                                                                                                                     | `acquisition.json`; `acquire.py` supplied (P-1) |
| HTTP status, type       | 200, `text/html; charset=UTF-8`                                                                                                                                                                                                                                                                   | `acquisition.json` (author-recorded)            |
| Bytes, SHA-256          | 10,807; `763c46f0a820556064728229857e126a69130dbb99b0061d271290c65bf99708`                                                                                                                                                                                                                        | re-computed from the packet file                |
| Images                  | 18 `IMG` occurrences: 8 equation images `img9.gif` to `img16.gif` (803, 300, 520, 543, 856, 878, 416, 467 bytes) and 5 navigation icons each occurring twice; all 18 retrieved with HTTP 200 and hashes recorded; the navigation `http://` `SRC` values were recorded as redirected to `https://` | `acquisition.json`; re-computed hashes          |
| Internal markers        | LaTeX2HTML 98.2 beta6 header; `<ADDRESS>` "Susan Blackford, 1999-10-01"; declared charset `iso-8859-1` in the document while the response header is recorded as UTF-8 (no non-ASCII bytes present, so no practical conflict)                                                                      | read from the file                              |
| Independently witnessed | nothing about the transfer; only the bytes and their hashes                                                                                                                                                                                                                                       | —                                               |

### 5.2 NIST/SEMATECH e-Handbook, `https://itl.nist.gov/div898/handbook/prc/section4/prc437.htm`

| Field                    | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Basis                                                                                  |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Class                    | user-supplied copy, supplier-reported as `curl`-acquired; passed through the author context unchanged                                                                                                                                                                                                                                                                                                                                                                                                | the acquisition record text file, `nist-intake.json`, hash identity with the inner ZIP |
| Supplier-reported time   | 2026-09-08 15:35–15:40 JST (06:35–06:40 UTC); the record also cites a server response-header time of 06:37 UTC                                                                                                                                                                                                                                                                                                                                                                                       | supplier statement; no header supplied                                                 |
| Requested URL            | `https://itl.nist.gov/div898/handbook/prc/section4/prc437.htm`                                                                                                                                                                                                                                                                                                                                                                                                                                       | supplier statement                                                                     |
| Final URL                | supplier reports no redirect and HTTP 200 directly                                                                                                                                                                                                                                                                                                                                                                                                                                                   | supplier statement; not witnessed                                                      |
| Method, as stated        | "no GUI browser was used"; "acquisition and saving were done with a Linux command-line client (`curl`, TLS)"; "a browser-equivalent User-Agent was specified" (translated from the Japanese record). The same record then says the file set "is treated as a browser-saved copy" and, in the same breath, that it is "not an unmodified capture of the transfer or a complete mirror of the server response."                                                                                        | supplier statement, quoted both ways (P-2)                                             |
| Actual stated method     | `curl` over TLS with a browser-like User-Agent, HTML body saved as received, seven `eqns/*.gif` fetched separately. The "browser-saved copy" phrase describes the intended layout of the file set, not the tool used. Classified here as a **`curl`-acquired copy**, as `nist-intake.json` also does                                                                                                                                                                                                 | reviewer reading of the record                                                         |
| Not supplied             | response headers, the exact `curl` command line, the User-Agent string, TLS or IP details                                                                                                                                                                                                                                                                                                                                                                                                            | (P-3)                                                                                  |
| Bytes, SHA-256           | 11,162; `737359e7439ea04df5a3408c4ae91cab255183a0fe35e1725326b144f6de1f7f`                                                                                                                                                                                                                                                                                                                                                                                                                           | re-computed from the packet file                                                       |
| Images                   | seven GIFs under `prc437_files/eqns/` (`mod2way`, `mu`, `tau`, `beta`, `gamma`, `twoss`, `anova19`); all referenced only inside HTML comments in the page (Section 5.3)                                                                                                                                                                                                                                                                                                                              | read from the file; hashes re-computed                                                 |
| Independently observable | the page's trailing inline script contains a base64 value `MTc4ODg0OTM1Mw==` that decodes to `1788849353`, i.e. 2026-09-08T06:35:53Z, inside the supplier-reported window; the page also carries a federated-analytics tag and a `/cdn-cgi/challenge-platform/` reference, i.e. markers of a CDN-fronted live response. These markers were observed in the bytes. They are consistent with the stated acquisition but do not prove it: a timestamp inside an HTML file can be produced in other ways | reviewer observation (P-4)                                                             |
| Earlier author attempt   | `acquisition.json` records the author's own `urllib` request at 06:23:14Z returning "HTTP Error 403: Forbidden" from the server (not a proxy denial); this is historical and is not the supplied copy's provenance                                                                                                                                                                                                                                                                                   | `acquisition.json`                                                                     |

Supplier statements and independently established facts are kept apart in the "Basis" column.
Established from the bytes: sizes, hashes, internal structure, the embedded timestamp value,
and the content read in Section 6. Supplier-reported only: HTTP 200, absence of redirect,
User-Agent, and the exact acquisition time.

### 5.3 Missing assets and their impact

| Asset (NIST page)                                         | Supplied | Carries reviewed content                                                                        | Impact on the bounded evidence  |
| --------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------- | ------------------------------- |
| MathJax 3 (`cdn.jsdelivr.net`)                            | no       | no: it renders the TeX that is present verbatim in the HTML; the TeX source is readable as text | none                            |
| `../../nist-header-footer/` CSS and JS, jQuery            | no       | no                                                                                              | none                            |
| Federated analytics script                                | no       | no                                                                                              | none                            |
| `../../gifs/nvgtbr.gif`, `nvgbrbtm.gif` navigation images | no       | no; supplier reports both returned HTTP 302 to `https://www.nist.gov/itl/` at acquisition time  | none                            |
| `eqns/*.gif` (seven)                                      | yes      | legacy duplicates of the active TeX and table, referenced only inside `<!-- -->` comments       | none required; inspected anyway |

The supplied NIST HTML places the seven GIFs under `prc437_files/eqns/` while the commented
references say `eqns/`; since the references are commented out, no rendering depends on the
path. All statements checked in Section 6.1 are in uncommented HTML text or TeX source, so the
absence of MathJax and site chrome does not change what the page says; it changes only how it
would look in a browser. For the LAPACK page nothing is missing: every `IMG` was retrieved,
and the stylesheet `lug_l2h.css` (not retrieved, not an `IMG`) carries no content.

## 6. Content, per page, against the supplement

Quotations are verbatim from the supplied bytes; TeX is quoted as written in the HTML.

### 6.1 NIST page (A-1 to A-4)

| Item | Check item                                                             | Page passage (supplied copy)                                                                                                                                                                                                                                                                                                                                                                                                                                               | Supplement passage (blob `007d689e…`)                                                                                          | Status                       |
| ---- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------- |
| A-1a | fixed-effects model                                                    | "The factors \(A\) and \(B\) are said to be _fixed factors_ and the model is a _fixed-effects model_. Random actors will be discussed later." (margin note "Fixed factors and fixed effects models")                                                                                                                                                                                                                                                                       | "balanced fixed-effects sums-of-squares partition"                                                                             | `CONFIRMED_ON_PROVIDED_COPY` |
| A-1b | equal number of observations per treatment combination                 | "When an \(a \times b\) factorial experiment is conducted with an equal number of observations per treatment combination, the total (corrected) sum of squares is partitioned as:"; the model indices run `k = 1, 2, \ldots, r` for every `(i, j)`                                                                                                                                                                                                                         | "Only complete balanced replicated two-by-two cell algebra is probed"; "balanced"                                              | `CONFIRMED_ON_PROVIDED_COPY` |
| A-2  | partition of the total sum of squares into A, B, interaction, residual | `$$ SS(total) = SS(A) + SS(B) + SS(AB) + SSE \, , $$` followed by the reference formulas `SS(A) = rb \sum_{i=1}^a (\bar{y}_{i..} - \bar{y}_{...})^2`, `SS(B) = ra \sum_{j=1}^b (\ldots)^2`, `SS(AB) = r \sum_{j=1}^b \sum_{i=1}^a (\bar{y}_{ij.} - \bar{y}_{i..} - \bar{y}_{.j.} + \bar{y}_{...})^2`, `SSE = \sum_k \sum_j \sum_i (y_{ijk} - \bar{y}_{ij.})^2`, `SS(Total) = \sum_k \sum_j \sum_i (y_{ijk} - \bar{y}_{...})^2` (dot-subscript spacing macros omitted here) | "effect sums of squares are `N*beta[j]**2` for j=1,2,3"; fence assertion `total == sse + sum(N*b*b for b in beta[1:])`         | `CONFIRMED_ON_PROVIDED_COPY` |
| A-3  | residual degrees of freedom `N − ab`                                   | ANOVA table row "Error", df cell `\((N-ab)\)`, mean square `\(SSE / (N-ab)\)`; also "Total (Corrected)" df `\((N-1)\)`, factor rows `(a-1)`, `(b-1)`, interaction `(a-1)(b-1)`; legacy `anova19.gif` shows the same table with "(N - ab)"                                                                                                                                                                                                                                  | "Residual degrees of freedom are N-4"; "residual N-ab degrees of freedom"                                                      | `CONFIRMED_ON_PROVIDED_COPY` |
| A-4  | consistency of the page with the supplement's description              | The page's scope is the balanced fixed-effects `a × b` layout; it says nothing about unbalanced designs, weighting, or numerical algorithms                                                                                                                                                                                                                                                                                                                                | "supporting documentation, not closure of original-source access holds"; the balanced qualifier; N-4 as the a = b = 2 instance | `CONFIRMED_ON_PROVIDED_COPY` |

Reviewer inference, labelled as such and not a page statement: for the supplement's ±1-coded
balanced 2×2 design with `r` replicates, `N = 4r = 2rb`, each level mean deviates from the grand
mean by `±beta_A`, so the page's `SS(A) = rb Σ_i (ȳ_i.. − ȳ...)² = rb · 2 · beta_A² = N · beta_A²`,
and likewise for `B` and `AB`. The supplement's `N*beta[j]**2` form is therefore the page's
cell-means form specialised to that design, which is what the supplement's per-case assertion
exercises. This equivalence was already re-derived in PR 208 Section 6.1; it is restated only
to show why the two forms are the same claim.

Notation on the page, recorded verbatim and not normalised (P-5):

- The active model line is `$$ Y_{ij} = \mu + \tau_i + \beta_j + \gamma_{ij} + \epsilon_{ijk} \, , $$`
  with `k = 1, …, r`: the left-hand side carries `ij` while the error term carries `ijk`. The
  commented legacy image `mod2way.gif` reads `Y_ijk = μ + τ_i + β_j + γ_ij + ε_ijk` (three
  subscripts on the left), and its commented `ALT` text reads `Y(ij) = … + epsilon)ijk)` with
  an unbalanced parenthesis. The three representations of the same model therefore differ in
  the left-hand subscript. None of the supplement's claims depends on that subscript.
- `N` is used in the ANOVA table without being defined on the page; the model's index ranges
  imply `N = abr`. The supplement defines its own `N` as the number of observations.
- "Random actors" (for "factors") is the page's spelling.
- The legacy `twoss.gif` reads `SS(B) = ra Σ_{j=1}^{b} (ȳ_{.j.} − ȳ_{...})²` and otherwise
  matches the active TeX formulas; its commented `ALT` text writes `Ybar(j.)` and `ybar(i.)`
  with two dots where the image has three. Legacy comments are less precise than the active
  TeX; the active TeX is the representation checked above.

### 6.2 LAPACK page (B-1 to B-3)

| Item | Check item                                                                                           | Page passage (supplied copy)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Supplement passage (blob `007d689e…`)                                                                                                                                                                                      | Status                       |
| ---- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| B-1  | `xGELS` assumes full rank and uses a QR or LQ factorisation                                          | "The driver routine xGELS solves problem (2.1) on the assumption that rank(A) = min(m,n) -- in other words, A has full rank -- finding a least squares solution of an overdetermined system when m > n, and a minimum norm solution of an underdetermined system when m < n. xGELS uses a QR or LQ factorization of A, and also allows A to be replaced by A^T in the statement of the problem (or by A^H if A is complex)." Table 2.3 row: "solve LLS using QR or LQ factorization — SGELS, CGELS, DGELS, ZGELS"                                                                                                                                                                                                                                  | "full-rank QR/LQ"                                                                                                                                                                                                          | `CONFIRMED_ON_PROVIDED_COPY` |
| B-2  | `xGELSX` / `xGELSY` / `xGELSS` / `xGELSD` handle the rank-deficient case, distinguished from `xGELS` | "In the general case when we may have rank(A) < min(m,n) -- in other words, A may be rank-deficient -- we seek the minimum norm least squares solution x … The driver routines xGELSX, xGELSY, xGELSS, and xGELSD solve this general formulation of problem 2.1, allowing for the possibility that A is rank-deficient; xGELSX and xGELSY use a complete orthogonal factorization of A, while xGELSS uses the singular value decomposition of A, and xGELSD uses the singular value decomposition of A with an algorithm based on divide and conquer." Also: "xGELSX has been retained for compatibility with Release 2.0 of LAPACK"; Table 2.3 rows for complete orthogonal factorization (xGELSY), SVD (xGELSS), divide-and-conquer SVD (xGELSD) | "separate rank-deficient driver families"                                                                                                                                                                                  | `CONFIRMED_ON_PROVIDED_COPY` |
| B-3  | the page's general description is not conflated with the NumPy route actually executed               | The page describes driver routines and their factorisations at the level above; it does not describe `dgeqrf`, `dorgqr`, `gesv`, or any triangular solve, and it does not describe NumPy                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | "This probe explicitly constructs QR and uses a general linear solver on its R matrix; it does not claim to execute DGELS or a specialized triangular solver"; N-1 names `dgeqrf`/`dorgqr` for `qr` and `gesv` for `solve` | `CONFIRMED_ON_PROVIDED_COPY` |

The probe's NumPy `qr`-plus-`solve` route is not `xGELS`, and the supplement does not say it
is. The page supports exactly the distinction the supplement draws: `xGELS` is the full-rank
QR/LQ driver; the four other drivers are the rank-deficient-capable family; the probe uses
neither and says so. The routine names the supplement gives for its own route were checked
against upstream sources in PR 210 Section 7 and are not re-checked here.

Equation images: all eight were opened and read. `img9.gif` renders "minimize_x ‖b − Ax‖₂";
`img10.gif` "m ≥ n"; `img11.gif` "rank(A) = n"; `img12.gif` "rank(A) = m"; `img13.gif`
"rank(A) = min(m,n)"; `img14.gif` "rank(A) < min(m,n)"; `img15.gif` "‖b − Ax‖₂"; `img16.gif`
"‖B − AX‖₂". Each matches the `ALT` text and the `<!-- MATH -->` comment beside it. The ten
navigation-icon occurrences are the five standard LaTeX2HTML icons, twice each, and carry no
content.

## 7. Contradictions

None. No statement in either supplied copy contradicts the supplement's characterisation of
that page, and no statement in the supplement attributes to either page something the copy
does not say. PR 210's reopen condition ("if an inspection of the blocked pages contradicts the
algebra re-derived in PR 208 Section 6.1") is not triggered on the provided copies. Whether the
official hosts serve these same bytes is a provenance question (Section 8), not a contradiction.

## 8. Source-access determination

Against the completion instructions of PR 210 Section 12 item 1:

| Instruction                                               | NIST page                                                  | LAPACK page                                             |
| --------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------- |
| retrieval date recorded                                   | supplier-reported window; embedded timestamp consistent    | author-recorded, to the second                          |
| acquisition method recorded                               | `curl`, supplier-reported; no headers or command line      | Python `urllib`, author-recorded, script supplied (P-1) |
| raw-HTML hash, distinguished from extracted text          | yes: raw bytes, `737359e7…`; no extracted text used        | yes: raw bytes, `763c46f0…`; no extracted text used     |
| balanced partition and `N − ab` confirmed                 | yes, on the provided copy                                  | —                                                       |
| full-rank QR/LQ versus rank-deficient families confirmed  | —                                                          | yes, on the provided copy                               |
| equation images inspected                                 | yes, all seven (legacy, commented out) plus the active TeX | yes, all eight                                          |
| retrieval by a reviewer with access to the official hosts | **no**                                                     | **no**                                                  |

Every content-side instruction is satisfied on the provided copies, with raw-byte hashes. The
one instruction not satisfied is the one PR 210 addressed to "a reviewer with access": neither
copy was retrieved by a reviewer, the LAPACK copy was acquired by the authoring context under
review, and the NIST copy was acquired by the commissioning maintainer with the transfer
details unwitnessed.

Status: **`SOURCE_ACCESS_INCOMPLETE` retained, with the residual narrowed to provenance.**
Concretely, what remains open is a single item: an independent retrieval of each page from its
official host by a party other than the author or the maintainer, recording date, final URL,
and raw-byte SHA-256, and comparing those hashes with `737359e7…` and `763c46f0…`. A match
would close the residual; a mismatch would not by itself indicate tampering, since the NIST
page embeds a per-response CDN timestamp and either page may be re-published, so a mismatch
would call for a content comparison rather than a hash comparison. Whether provided-copy
confirmation is sufficient for supporting documentation is a steward decision that this review
does not make; the research gate in `governance/RFC.md` treats these pages as supporting
documentation, not as the primary methodological basis, and the original-source holds are
untouched either way (Section 10).

This determination is separate from the existing content verdict. PR 210's `GO` for the
corrected supplement at `0be8bb15…` did not depend on either page (PR 210 Section 5); this
review finds nothing that would reopen it and does not extend it. `GO` and the narrowed
`SOURCE_ACCESS_INCOMPLETE` continue to coexist.

## 9. Observations

None is a finding against the supplement. P-1 to P-4 concern the packet's provenance records;
P-5 to P-7 concern the pages themselves.

- **P-1.** The supplied `acquire.py` writes the method string "Python urllib HTTPS; response
  body bytes without rewriting", whereas all 20 records in `acquisition.json` carry "Python
  urllib with redirects enabled; response body bytes saved without rewriting; requested and
  final URL schemes recorded separately". The supplied script is therefore not byte-for-byte
  the program that wrote the supplied JSON, or the JSON was edited afterwards. The hashes and
  byte counts in the JSON match the files regardless, so this affects the reproducibility of
  the acquisition procedure, not the integrity of the delivered bytes.
- **P-2.** The NIST acquisition record states that no browser was used and that `curl` was
  used, and also labels the file set "a browser-saved copy". The actual stated method is
  `curl`; the label describes the intended layout. This review classifies the copy by the
  stated method, as `nist-intake.json` already does.
- **P-3.** For the NIST copy, no response headers, no exact `curl` command line, and no
  User-Agent string were supplied, so HTTP 200 and "no redirect" are supplier statements.
- **P-4.** The NIST HTML's trailing script embeds a base64 timestamp decoding to
  2026-09-08T06:35:53Z, inside the supplier-reported window and two minutes before the
  supplier's cited response-header time. This is consistent with, but not proof of, the stated
  acquisition.
- **P-5.** Notation on the NIST page differs between its three representations of the model
  (active TeX `Y_{ij}` with `\epsilon_{ijk}`; legacy image `Y_ijk`; legacy `ALT` text `Y(ij)`
  with an unbalanced parenthesis), `N` is undefined on the page, and "Random actors" is the
  page's spelling. Recorded verbatim in Section 6.1; not corrected; not material to any
  supplement claim.
- **P-6.** The NIST page declares `charset=iso-8859-1` and the LAPACK response is recorded as
  `charset=UTF-8` against a document declaring `iso-8859-1`; both files contain only ASCII
  bytes, so neither declaration affects the content.
- **P-7.** The LAPACK page is dated 1999-10-01 (third-edition Users' Guide, LaTeX2HTML output)
  and notes that `xGELSX` "has been retained for compatibility with Release 2.0 of LAPACK".
  The supplement cites the page for driver-family distinctions only; the date does not affect
  those distinctions, and Reference LAPACK source at `v3.12.0` was already inspected for the
  routine-name check in PR 210 Section 7.

## 10. Boundary statement

This review concerns two supporting-documentation pages and the provenance of provided copies
of them. It does not close the original factorial-methodology source holds recorded in the
Release 4 preparation package, the S6 unbalanced two-system hold from the semantic result at
`a2687f10…`, the programme `INPUT_INCOMPLETE`, or the numerical commission; it does not
authorise any production algorithm, graph selection, tolerance, or release; it re-executes no
numerical probe and re-reviews neither SF-1 nor N-1 to N-9. Release 3 scope and numbering are
unchanged. No merge, ratification, identifier issuance, public discussion, website claim, or
method adoption is made or authorised by this record.

## 11. Remaining actions and reopen conditions

1. A party other than the author and the maintainer, with access to `itl.nist.gov` and
   `www.netlib.org`: retrieve each page once, record date, requested and final URL, method,
   byte count, and raw-byte SHA-256, and compare with Section 5. On a hash match, the
   provenance residual closes. On a mismatch, compare content against Section 6 before drawing
   any conclusion.
2. Steward, optionally: decide whether provided-copy confirmation of supporting documentation
   is sufficient for the Release 4 preparation record without item 1. This review takes no
   position.
3. Packet preparer, optionally: supply the exact `acquire.py` revision that wrote
   `acquisition.json` (P-1) and, if still available, the NIST response headers (P-3). Neither
   is required for the content determination.
4. Reopen this review if the supplement blob `007d689e…`, the close-review blob `3a27ff94…`,
   or the earlier report blob `13167c81…` changes, or if item 1 produces content that differs
   from Section 6.

## 12. Validation

Performed in the session container on the branch named in Section 2 after adding this file,
with dependencies installed by `pnpm install --frozen-lockfile`:

- Prettier on this file (`pnpm exec prettier --write` then `--check` on the changed path).
- `pnpm lint:markdown`.
- `pnpm typecheck`.
- `pnpm validate` (registries, traceability, normative lint, authority manifest, links,
  private-dependency and code-path audits; the link audit does not fetch external URIs).
- `git diff --check`, and confirmation that the only change against `284bdf79…` is the addition
  of this file.

All passed on the committed text: Prettier reports the file formatted; `pnpm lint:markdown`
reports 360 files, 0 issues; `pnpm typecheck` is clean; `pnpm validate` reports every validator
clean; `git diff --check` is clean and the staged diff against `284bdf79…` adds exactly this one
file. One earlier `pnpm validate` run failed the public-language audit because a draft of this
report quoted the packet's Japanese file title verbatim; the title is now described in English
(Sections 4, 5.2, 13) and the audit passes. No authoritative artifact, generated file, or
production code changed, so the full `pnpm check` suite was not run, consistent with the prior
reviews.

## 13. Provenance

- Review date: 2026-09-08 (packet inspection 06:45–06:48 UTC; report written after).
- Inputs: supplement at `0be8bb1519d7aec2810b03192de6590ec9168c60`, blob
  `007d689e2c44f50df6242137348add66c5019cc8`; close review at
  `f599e1350e0eb48ee168ac726d0244ebd51de802`, blob `3a27ff94092349e7d8bba7d41e1197ba2f138951`;
  earlier report at `284bdf794b90d5a74af1f02c97da900e8f56b1e0`, blob
  `13167c8177db618a889831375aca41dc21ce9dee`.
- Packet: `r4sourcehandoff20260908_1.zip`, SHA-256
  `61edb647e867e4e26bc3771acce2eb2e2361924610ba34d7612fa9b184984ba4`, 48,116 bytes, containing
  `README.md` (`5bb27f83…`), `SHA256SUMS` (`b5f7b5c4…`), `acquisition.json` (`eb7bdc74…`),
  `nist-intake.json` (`bf73d9d5…`), `acquire.py` (`5e13f1c5…`), `lapack/original.html`
  (`763c46f0…`, 10,807 bytes) with 18 image files, `nist-supplied/prc437.htm` (`737359e7…`,
  11,162 bytes) with seven image files and the acquisition record text file (`b9945105…`), and
  `supplied-archives/nist_prc437.zip` (`08d28a2e…`, 14,607 bytes). The packet is not committed
  to the repository by this review; the hashes above identify it.
- Reviewer: Anthropic `claude-fable-5-1` in a Claude Code remote session (session identifier in
  the commit trailer), the same session that produced `284bdf79…`; no other model or person
  contributed to the review itself; the packet preparer and the NIST supplier are identified in
  Section 2.
- Environment: Linux 6.18.44 x86_64 session container; Python 3 standard library, Pillow 12.3.0
  in a scratch virtual environment for image enlargement only; no network access to either
  official host attempted in this pass.
- Validation results: Section 12.
- Only file created by this review:
  `review-inputs/r4-qr-cancellation-source-access/PROVIDED-COPY-REVIEW.md`. `REVIEW-RESULT.md`
  in this directory, the reviewed supplement, the PR 208 and PR 210 review files, and all other
  artifacts are unchanged.
