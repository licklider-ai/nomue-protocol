# Release 4 QR and Cancellation Supplement — Supporting-Documentation Source-Access Review

**Status: informative independent review; non-normative; not adopted.**

## 1. Verdict

| Dimension                                 | Result                                                                                                                                                                 |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scope of this review                      | The two supporting-documentation pages left open by PR 210 Section 5 and Section 12 item 1 only                                                                        |
| Input identity                            | complete and matching; `INPUT_INCOMPLETE` not raised (Section 3)                                                                                                       |
| NIST/SEMATECH e-Handbook, two-way ANOVA   | **`NOT_RETRIEVED`** — egress policy denial on `itl.nist.gov` and `www.itl.nist.gov`; no raw HTML, no extracted text, no provided copy (Section 4)                      |
| LAPACK Users' Guide, linear least squares | **`NOT_RETRIEVED`** — egress policy denial on `www.netlib.org` and `netlib.org`; no raw HTML, no extracted text, no provided copy (Section 4)                          |
| Source-access status                      | **`SOURCE_ACCESS_INCOMPLETE`** — unchanged from PR 208 Section 5 and PR 210 Section 5; the completion instructions in PR 210 Section 12 item 1 remain open (Section 8) |
| Existing content verdict                  | PR 210's `GO` for the corrected supplement at `0be8bb15…` is neither re-assessed nor reopened here; this review adds no finding against it (Section 8)                 |
| Contradictions found                      | none asserted and none excluded: nothing was inspected that could contradict or confirm the supplement's characterisation of either page (Section 6)                   |
| New findings                              | 0 `BLOCKER`, 0 `SHOULD-FIX`, 0 `NICE-TO-HAVE`; one observation, O-1, recorded without a finding grade (Section 7)                                                      |
| Independence status                       | model/provider and work-context independence from the author; same model family as the PR 208 and PR 210 reviewers; no human-investigator independence (Section 2)     |

The verdict in the fourth and fifth rows means only that the source-access hold recorded by
the two prior reviews stays exactly as recorded. This review does not treat the documentation
check as complete, does not substitute any summary, snippet, recollection, or hash comparison
for inspection of the pages, and does not change the content verdict, SF-1 closure, or N-1 to
N-9 dispositions of PR 210. It closes nothing in Release 4, the original factorial-methodology
source holds, the S6 unbalanced two-system hold, or the programme `INPUT_INCOMPLETE`, and it
merges, ratifies, publishes, adopts, or changes nothing (Section 9).

## 2. Independence, roles, and boundary

- **Commission.** This review was commissioned on 2026-09-08 by the repository maintainer
  (GitHub `tasuku-kobayashi`), who also authored or commissioned the supplement, opened PR 205,
  PR 208, and PR 210, and commissioned both prior reviews. The commission limited the task to
  the two supporting-documentation pages and stated that the numerical review is complete, so
  the 945-case corpus was not re-executed and SF-1 was not re-reviewed.
- **Reviewer.** This review was produced by an Anthropic model in a Claude Code remote session
  started from a fresh container clone of the repository. The session service reports both the
  configured model and the model that served the latest turn as `claude-fable-5-1`. The prior
  reviews in PR 208 and PR 210 were produced by the same model family in different sessions;
  this pass is therefore separate from the author's model and provider (the supplement records
  an OpenAI-assisted author), but it is not a different model family from the prior reviewers.
  That is disclosed rather than claimed as additional independence.
- **Human role.** No human investigator inspected either page for this review. No human expert
  review supplemented this pass. No human-investigator independence is claimed.
- **Assisting tools.** `git` in the session clone (object identity), the GitHub API through the
  session's GitHub tool (PR 210 state), `curl` through the session's egress proxy (direct HTTPS),
  the session's web text-extraction tool (`WebFetch`), and the session's web search tool
  (`WebSearch`). No other model, service, or person contributed. No Python, NumPy, or repository
  numerical tooling was executed, by design of the commission.
- **Author-side material.** The supplement's own statements that it inspected both pages through
  web extraction on 2026-09-08 were read as claims under review, not as evidence. No author-side
  session, intermediate material, or provided copy of either page was consulted, because none
  was supplied with the commission.
- **Git metadata.** The review commit's author and committer fields carry the intake tooling
  identity configured in the session container, not a human reviewer's name. The accountable
  role, scope, and boundary are those stated in this section.
- **Branch (disclosed).** The deliverable is committed on the session-designated branch
  `claude/pr210-nist-lapack-verification-j44enn`, started exactly at PR 210's head
  `f599e135…` so that the review delta is one added file. The branch prefix is imposed by the
  session tooling. No PR is opened by this review.

## 3. Exact identity

All identities were re-derived from Git objects fetched by commit id into the session clone
before either input was read.

| Field                        | Re-derived value                                                                                                                                                                       | Matches commission |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Repository                   | `licklider-ai/nomue-protocol`                                                                                                                                                          | yes                |
| Supplement commit            | `0be8bb1519d7aec2810b03192de6590ec9168c60` (object type `commit`)                                                                                                                      | yes                |
| Supplement path              | `governance/drafts/release-4-preparation/qr-cancellation-supplement.md`                                                                                                                | yes                |
| Supplement blob              | `007d689e2c44f50df6242137348add66c5019cc8`                                                                                                                                             | yes                |
| Close review commit          | `f599e1350e0eb48ee168ac726d0244ebd51de802` (object type `commit`), sole parent `0be8bb15…`                                                                                             | yes                |
| Close review path            | `review-inputs/r4-qr-cancellation-supplement-close/REVIEW-RESULT.md`                                                                                                                   | yes                |
| Close review blob            | `3a27ff94092349e7d8bba7d41e1197ba2f138951`                                                                                                                                             | yes                |
| PR 210 state at review time  | open draft, head `f599e135…` on `claude/qr-cancellation-review-prompt-tkb8rh`, base `research/r4-qr-cancellation-supplement` at `7a2baaf3…`, 1 commit, 1 file, mergeable state `clean` | consistent         |
| PR 208 review (context only) | commit `253fe14b…`, `review-inputs/r4-qr-cancellation-supplement/REVIEW-RESULT.md`, Section 5 read for the original source-access hold                                                 | —                  |

Sections read in full from the close review at blob `3a27ff94…`: Section 1 (verdict), Section 2
(independence), Section 3 (identity), Section 5 (source access), Section 9 (boundary statement),
Section 12 (remaining actions and reopen conditions), and Section 13 (provenance). The
supplement at blob `007d689e…` was read in full. No identity was missing or mismatched, so
`INPUT_INCOMPLETE` was not raised.

What PR 210 Section 5 and Section 12 item 1 leave open, restated: for each of the two pages,
record retrieval date, requested and final URL, acquisition method, byte count, and raw-HTML
hash distinguished from extracted text; confirm the balanced fixed-effects partition and
`N − ab` residual degrees of freedom on the NIST page; confirm full-rank QR/LQ for `xGELS`
versus the rank-deficient driver families on the LAPACK page; and inspect any equation images.
PR 210 Section 9 states, and this review agrees, that completing that work would be
supporting-documentation closure only.

## 4. Acquisition record

All attempts were made on 2026-09-08 from the session container. Outbound HTTPS from the
container goes through a policy-enforcing egress proxy; the proxy's status endpoint records the
reason for each rejected tunnel. The proxy documentation instructs that a 403 is an
organisation egress-policy denial that must be reported, not retried or routed around. One
additional attempt per page was made against the alternate official hostname (with or without
`www.`), because a redirect between those hostnames is the normal way the "final URL" field
would differ from the requested URL; both were denied identically. No cache, mirror, archive
service, or third-party copy was tried.

### 4.1 NIST/SEMATECH e-Handbook of Statistical Methods, 7.4.3.7 "The two-way ANOVA"

| Field                  | Attempt 1                                                                                                                                                                 | Attempt 2                                             | Attempt 3                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------- |
| Retrieval time (UTC)   | 2026-09-08T06:15:13Z                                                                                                                                                      | 2026-09-08 between 06:15 and 06:16                    | 2026-09-08T06:17:02Z                                                |
| Requested URL          | `https://itl.nist.gov/div898/handbook/prc/section4/prc437.htm`                                                                                                            | same as attempt 1                                     | `https://www.itl.nist.gov/div898/handbook/prc/section4/prc437.htm`  |
| Final URL              | none; the TLS tunnel was never established                                                                                                                                | none                                                  | none; the TLS tunnel was never established                          |
| Method                 | `curl -sS -L` via the session egress proxy (raw HTML intended)                                                                                                            | session web text-extraction tool (`WebFetch`)         | `curl -sS -L` via the session egress proxy (raw HTML intended)      |
| HTTP status            | none (`curl: (56) CONNECT tunnel failed, response 403`)                                                                                                                   | tool error `EGRESS_BLOCKED` for domain `itl.nist.gov` | none (`curl: (56) CONNECT tunnel failed, response 403`)             |
| Bytes received         | 0                                                                                                                                                                         | 0                                                     | 0                                                                   |
| SHA-256                | not computable (no bytes)                                                                                                                                                 | not computable                                        | not computable                                                      |
| Proxy status-log entry | `06:15:13.342Z itl.nist.gov:443 connect_rejected` — "gateway answered 403 to CONNECT (policy denial or upstream failure)"                                                 | —                                                     | `06:17:02.376Z www.itl.nist.gov:443 connect_rejected` (same detail) |
| Passages inspected     | none                                                                                                                                                                      | none                                                  | none                                                                |
| Equation images        | none inspected; the page could not be loaded, so it is not known from this review whether the partition and degrees-of-freedom expressions are rendered as images or text | none                                                  | none                                                                |

### 4.2 LAPACK Users' Guide, "Linear Least Squares (LLS) Problems"

| Field                  | Attempt 1                                                                                                                   | Attempt 2                                               | Attempt 3                                                      |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | -------------------------------------------------------------- |
| Retrieval time (UTC)   | 2026-09-08T06:15:13Z                                                                                                        | 2026-09-08 between 06:15 and 06:16                      | 2026-09-08T06:17:02Z                                           |
| Requested URL          | `https://www.netlib.org/lapack/lug/node27.html`                                                                             | same as attempt 1                                       | `https://netlib.org/lapack/lug/node27.html`                    |
| Final URL              | none; the TLS tunnel was never established                                                                                  | none                                                    | none; the TLS tunnel was never established                     |
| Method                 | `curl -sS -L` via the session egress proxy (raw HTML intended)                                                              | session web text-extraction tool (`WebFetch`)           | `curl -sS -L` via the session egress proxy (raw HTML intended) |
| HTTP status            | none (`curl: (56) CONNECT tunnel failed, response 403`)                                                                     | tool error `EGRESS_BLOCKED` for domain `www.netlib.org` | none (`curl: (56) CONNECT tunnel failed, response 403`)        |
| Bytes received         | 0                                                                                                                           | 0                                                       | 0                                                              |
| SHA-256                | not computable (no bytes)                                                                                                   | not computable                                          | not computable                                                 |
| Proxy status-log entry | `06:15:13.668Z www.netlib.org:443 connect_rejected` — "gateway answered 403 to CONNECT (policy denial or upstream failure)" | —                                                       | `06:17:02.663Z netlib.org:443 connect_rejected` (same detail)  |
| Passages inspected     | none                                                                                                                        | none                                                    | none                                                           |
| Equation images        | none inspected; see the note in 4.1                                                                                         | none                                                    | none                                                           |

### 4.3 Material classes, distinguished

| Class                                       | Obtained | Used for confirmation | Note                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------- | -------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Raw HTML from the official host             | no       | —                     | Sections 4.1 and 4.2                                                                                                                                                                                                                                                                                         |
| Web-tool extracted text of the fetched page | no       | —                     | the extraction tool was denied at the same egress layer                                                                                                                                                                                                                                                      |
| Copy provided with the commission           | none     | —                     | none was supplied; had one been supplied it would have been reported under this row, with its own hash, as a provided copy rather than as a retrieval                                                                                                                                                        |
| Search-engine index snippets                | yes      | **no**                | at about 06:16 UTC the session's web search tool, restricted to the official domains, returned index entries for both pages with short third-party summaries; they are neither the page, an extraction of a fetched page, nor a provided copy, and were not used to confirm any claim or to compute any hash |
| Author's summary in the supplement          | yes      | **no**                | read as the claim under review                                                                                                                                                                                                                                                                               |
| Hash comparison                             | n/a      | **no**                | no page hash exists in the supplement, in PR 208, in PR 210, or here                                                                                                                                                                                                                                         |
| Reviewer recollection of the pages          | —        | **no**                | not substituted                                                                                                                                                                                                                                                                                              |

## 5. Claim-to-evidence mapping

The commission's check items are listed against the passage of the supplement (blob
`007d689e…`) that makes each claim and the evidence this review could obtain. Because neither
page was inspected, every page-side cell is `UNVERIFIED`; the status column is deliberately
not `CONFIRMED` and not `CONTRADICTED`.

### 5.1 NIST/SEMATECH e-Handbook, two-way ANOVA

| Item | Check item from the commission                                                     | Supplement passage (blob `007d689e…`)                                                                                                                                                                    | Page passage inspected | Status       |
| ---- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ------------ |
| A-1  | fixed-effects model with an equal number of observations per treatment combination | "Source inspection": "balanced fixed-effects sums-of-squares partition and residual degrees of freedom"; "Scope and exact inputs": "Only complete balanced replicated two-by-two cell algebra is probed" | none                   | `UNVERIFIED` |
| A-2  | partition of the total sum of squares into A, B, interaction, and residual         | "Scope and exact inputs": for `X'X = N I` the effect sums of squares are `N*beta[j]**2` for j = 1, 2, 3; the fence asserts `total == sse + sum(N*b*b for b in beta[1:])` for every case                  | none                   | `UNVERIFIED` |
| A-3  | residual degrees of freedom `N − ab`                                               | "Scope and exact inputs": "Residual degrees of freedom are N-4"; "Review intake and successor corrections": "residual N-ab degrees of freedom"                                                           | none                   | `UNVERIFIED` |
| A-4  | consistency of the page with the supplement's description                          | the supplement's description is the union of A-1 to A-3, with the page classified as "supporting documentation, not closure of original-source access holds"                                             | none                   | `UNVERIFIED` |

Repository-internal observations that do not depend on the page, recorded so they are not
mistaken for page verification: the supplement's `N − 4` is the `a = b = 2` instance of
`N − ab`; its per-effect sum of squares `N*beta[j]**2` follows from the stated orthogonal design
`X'X = N I`; and its restriction to the complete balanced replicated case matches the
"balanced" qualifier it attributes to the page. PR 208 Section 6.1 re-derived that algebra from
the design matrix, and PR 210 Section 5 records that the content verdict rests on that
re-derivation rather than on the page. Whether the page states these things in the form the
supplement attributes to it remains uninspected.

### 5.2 LAPACK Users' Guide, linear least squares

| Item | Check item from the commission                                                                               | Supplement passage (blob `007d689e…`)                                                                                                                                                                                                                                                                                                         | Page passage inspected | Status                                                            |
| ---- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ----------------------------------------------------------------- |
| B-1  | `xGELS` assumes full rank and uses a QR or LQ factorisation                                                  | "Source inspection": "full-rank QR/LQ and separate rank-deficient driver families"                                                                                                                                                                                                                                                            | none                   | `UNVERIFIED`                                                      |
| B-2  | `xGELSX` / `xGELSY` / `xGELSS` / `xGELSD` are the rank-deficient-capable drivers, distinguished from `xGELS` | "Source inspection": "separate rank-deficient driver families"; the supplement does not name the four drivers individually                                                                                                                                                                                                                    | none                   | `UNVERIFIED`                                                      |
| B-3  | the page's general description is not conflated with the NumPy call path actually executed                   | "Source inspection": "This probe explicitly constructs QR and uses a general linear solver on its R matrix; it does not claim to execute DGELS or a specialized triangular solver"; "The QR routes call `np.linalg.qr` and then `np.linalg.solve` on the computed R matrix"; N-1 names `dgeqrf`/`dorgqr` for `qr` and `gesv` (LU) for `solve` | none                   | supplement side: **no conflation found**; page side: `UNVERIFIED` |

B-3 has a supplement-side component that does not require the page. The supplement never
claims that its probe executes `xGELS` or any Users' Guide driver, states explicitly that it
does not, and names the NumPy-documented routines instead. PR 210 Section 7 records that those
routine names were checked against installed NumPy 2.3.5 docstrings, `numpy/linalg/_linalg.py`
at `v2.3.5`, and Reference LAPACK `dgesv.f`, `dgeqrf.f`, `dorgqr.f`, and `dtrtrs.f` at `v3.12.0`
retrieved with hashes. This review re-read the supplement's wording and finds the distinction
maintained throughout; it did not repeat the routine-name check, which is outside the
commission. What remains open on B-3 is only whether the page's own description of `xGELS` is
as the supplement summarises it, which is B-1.

## 6. Contradictions

None asserted and none excluded. A contradiction between the supplement and either page can
be established only by inspecting the page; no page content of any class listed in Section 4.3
was used. The supplement's description of both pages is consistent with how PR 208 Section 5,
PR 210 Section 5, and the Release 4 preparation material describe the same families, which is
repository-internal consistency and not source verification. PR 210's reopen condition
("if an inspection of the blocked pages contradicts the algebra re-derived in PR 208
Section 6.1") is therefore neither triggered nor discharged.

## 7. Findings and observations

- 0 `BLOCKER`, 0 `SHOULD-FIX`, 0 `NICE-TO-HAVE`. No new finding can be raised against the
  supplement's page characterisation without inspecting the pages, and none is raised.
- **O-1 (observation, no grade).** The supplement links the NIST page at the host `itl.nist.gov`
  while the search index lists the same path under `www.itl.nist.gov`; likewise the LAPACK page
  is linked under `www.netlib.org` and also indexed under `netlib.org`. Whether either host
  redirects to the other could not be observed because no tunnel was established. A future
  retrieval should record both the requested and the final URL, as the commission asks, so that
  the citation form can be settled by observation rather than assumed. This is not a defect in
  the supplement.

## 8. Can the source check be treated as complete?

**No.** For both pages the answer to each completion instruction in PR 210 Section 12 item 1
is:

| Instruction                                              | NIST page          | LAPACK page        |
| -------------------------------------------------------- | ------------------ | ------------------ |
| retrieval date recorded                                  | attempt dates only | attempt dates only |
| acquisition method recorded                              | yes (all failed)   | yes (all failed)   |
| raw-HTML hash, distinguished from extracted text         | no (0 bytes)       | no (0 bytes)       |
| balanced partition and `N − ab` confirmed                | no                 | —                  |
| full-rank QR/LQ versus rank-deficient families confirmed | —                  | no                 |
| equation images inspected                                | no                 | no                 |

Source-access status therefore remains **`SOURCE_ACCESS_INCOMPLETE`**, exactly as in PR 208
Section 5 and PR 210 Section 5. The reason is a single one for both pages: the session's
organisation egress policy denies every tunnel to `itl.nist.gov`, `www.itl.nist.gov`,
`www.netlib.org`, and `netlib.org`, and no sufficient original material was provided with the
commission. Nothing was retrieved for either page, so there is no partial confirmation to
preserve beyond the attempt records in Section 4 and the supplement-side reading of B-3 in
Section 5.2.

This determination is separate from the existing content verdict. PR 210's `GO` for the
corrected supplement at `0be8bb15…` was reached on the basis that the content verdict does not
depend on either page (PR 210 Section 5, last paragraph). This review does not re-assess that
verdict, finds nothing that would reopen it, and does not extend it. `GO` and
`SOURCE_ACCESS_INCOMPLETE` continue to coexist as they did before this review.

## 9. Boundary statement

This review concerns two supporting-documentation pages only. Even had both pages been
retrieved and found consistent, that would not close the original factorial-methodology source
holds in the Release 4 preparation package, the S6 unbalanced two-system hold from the semantic
result at `a2687f10…`, the programme `INPUT_INCOMPLETE`, or the numerical commission, and would
not authorise any production algorithm, graph selection, tolerance, or release. Since neither
page was retrieved, none of those is touched. Release 3 scope and numbering are unchanged. No
merge, ratification, identifier issuance, public discussion, website claim, or method adoption
is made or authorised by this record.

## 10. Remaining actions and reopen conditions

1. A reviewer whose environment can reach `itl.nist.gov` (or `www.itl.nist.gov`) and
   `www.netlib.org` (or `netlib.org`): perform the retrieval described in Section 3, filling
   every row of the Section 4 tables with observed values, then complete the Section 5 mapping
   from the page text and any equation images, and record whether the pages contradict the
   supplement. That remains supporting-documentation closure only (Section 9).
2. Alternatively, the maintainer may supply raw HTML captures of both pages, including the
   equation image files, with capture date and SHA-256. A review based on such captures must
   report them as provided copies, not as retrievals, and should say so in its verdict.
3. Reopen this review if the supplement blob `007d689e…` or the close-review blob `3a27ff94…`
   changes, or if a later retrieval of either page shows a form of the partition, degrees of
   freedom, or driver-family description that differs from the supplement's summary.

## 11. Validation

Performed in the session container on the branch named in Section 2 after adding this file,
with dependencies installed by `pnpm install --frozen-lockfile`:

- Prettier on this file (`pnpm exec prettier --check` on the changed path; formatted with
  `--write` where needed).
- `pnpm lint:markdown`.
- `pnpm typecheck`.
- `pnpm validate` (registries, traceability, normative lint, authority manifest, links,
  private-dependency and code-path audits; the link audit does not fetch external URIs).
- `git diff --check` and confirmation that the only change against `f599e135…` is the addition
  of this file.

All of the above passed: Prettier reports the file formatted; `pnpm lint:markdown` reports
359 files, 0 issues; `pnpm typecheck` is clean; `pnpm validate` reports every validator clean;
`git diff --check` is clean and the staged diff against `f599e135…` adds exactly this one file.
No authoritative artifact, generated file, or production code changed, so the full
`pnpm check` suite was not run, consistent with PR 208 and PR 210.

## 12. Provenance

- Review date: 2026-09-08 (attempts 06:15–06:17 UTC).
- Inputs: supplement at `0be8bb1519d7aec2810b03192de6590ec9168c60`, blob
  `007d689e2c44f50df6242137348add66c5019cc8`; close review at
  `f599e1350e0eb48ee168ac726d0244ebd51de802`, blob `3a27ff94092349e7d8bba7d41e1197ba2f138951`;
  PR 208 review at `253fe14b…` read for Section 5 only.
- Reviewer: Anthropic `claude-fable-5-1` in a Claude Code remote session (session identifier in
  the commit trailer); no other model or person contributed; the human commissioner is the
  repository maintainer (Section 2).
- Environment: Linux 6.18.44 x86_64 session container; outbound HTTPS through the session
  egress proxy; `curl` and the session's web tools as the only network clients used; no
  numerical software executed.
- Blocked hosts, all `connect_rejected` with "gateway answered 403 to CONNECT (policy denial or
  upstream failure)": `itl.nist.gov`, `www.itl.nist.gov`, `www.netlib.org`, `netlib.org`.
- Retrieved page bytes: none. Page hashes: none.
- Only file created by this review:
  `review-inputs/r4-qr-cancellation-source-access/REVIEW-RESULT.md`. The reviewed supplement,
  the PR 208 and PR 210 review files, and all other artifacts are unchanged.
