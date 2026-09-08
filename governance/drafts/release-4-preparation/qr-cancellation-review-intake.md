# Release 4 QR supplement close-review intake

Status: informative intake with steward-authorized acceptance recorded below; not a
release decision. Date: 2026-09-08. Prepared by the continuing OpenAI-assisted author.
The earlier sections retain the historical state before the final acceptance.

## Exact review and scope

[PR 210](https://github.com/licklider-ai/nomue-protocol/pull/210) records the close
review in commit `f599e1350e0eb48ee168ac726d0244ebd51de802`, adding only
`review-inputs/r4-qr-cancellation-supplement-close/REVIEW-RESULT.md`, blob
`3a27ff94092349e7d8bba7d41e1197ba2f138951`.

Its reviewed input is `0be8bb1519d7aec2810b03192de6590ec9168c60`, report blob
`007d689e2c44f50df6242137348add66c5019cc8`. The author confirmed the review
file identity and sole added path through repository retrieval, and confirmed
that the current research branch still carries that exact supplement blob.
The review's own identity gate reports the parent and tree matching the prompt.

The review records content GO for this corrected informative supplement, SF-1
CLOSED, N-1 through N-7 accepted as recorded, no regression, zero new BLOCKER,
zero new SHOULD-FIX, and two NICE-TO-HAVE findings. Source access remains
SOURCE_ACCESS_INCOMPLETE. This intake records those findings without promoting
the supplement into accepted methodology, a production graph, or a release.

The reported independence is model/provider and work-context independence from
the author. The close reviewer and PR 208 reviewer use the same model family in
separate sessions; human-investigator independence is not claimed. The review's
session-imposed branch constraint is preserved in its Section 2. No branch is
deleted, renamed, or duplicated by this intake.

## Optional findings retained without changing the reviewed report

N-8: PR 210 Section 8 reports that CPython 3.12.3 with NumPy 2.5.3 and bundled
OpenBLAS 0.3.34.106.0 changed the QR rows and witness QR values while preserving
the direct row. For example, it reports 869 nonzero coefficient errors and 480
spurious nonzero selected coefficients for uncentered QR, versus the original
850 and 462. This is the reviewer's observation, not a new author experiment or
an attribution of causality to one changed dependency. It concretely supports
the existing warning against assuming agreement across every build.

N-9: PR 210 Section 8 recommends retaining Python's qualification that the
improved summation applies on most builds, since defining SLOW_SUM disables the
compensated fast path. The reviewed report already scopes its statement to the
disclosed interpreter. This is recorded as a build-dependent qualification;
there is no claim covering every CPython 3.12 build or future version.

Both findings explicitly require no action for the bounded GO. The report,
Python fence, transcript, original prompt, and close prompt remain unchanged.
The numerical repair cycle is complete at the reviewed input; optional findings
are retained here rather than reopening it solely for additional prose.

## Remaining source-access work

The independent source task is confined to these supporting pages:

- [NIST two-way ANOVA](https://itl.nist.gov/div898/handbook/prc/section4/prc437.htm):
  balanced fixed-effects partition and residual N-ab degrees of freedom.
- [LAPACK Users' Guide, linear least squares](https://www.netlib.org/lapack/lug/node27.html):
  full-rank QR/LQ versus rank-deficient driver families.

The author's attempt to acquire raw HTML for a reviewer handoff in this intake
did not complete: the execution service reported that network approval was
cancelled before a decision. No raw file, digest, or source packet is claimed.
Earlier author-side web-text inspection does not close independent source access.

When original HTML can be retrieved or supplied, an independent reviewer can
complete just PR 210 Section 5: record URL, retrieval date, acquisition route,
hashes, raw-versus-extracted distinction, and the bounded source findings. Preserve
the exact reviewed supplement and both prior reviews. If URLs are still blocked
and no originals are supplied, retain SOURCE_ACCESS_INCOMPLETE rather than repeat
the numerical review or substitute the author's summary. Supplied files need
their own provenance and content checks; a matching hash alone is not validation.

No new full numerical-review prompt is necessary. Source completion does not
close the original factorial-methodology source holds, the semantic S6 two-system
hold, programme INPUT_INCOMPLETE, or the remaining squared-effect/F projection,
rank-deficient-design, and supported-execution work. Release 3 and its numbering
are unchanged. PR 205 and the review PRs remain unmerged; no ratification,
identifier issuance, algorithm adoption, public discussion, or website update
is enacted by this intake.

## Steward-authorized acceptance and integration

On 2026-09-08, the commissioning steward explicitly confirmed approval,
ratification and acceptance, and instructed the coordinator to merge this bounded
work. This records that instruction for the QR supplement and its supporting
reviews, not a Release 4 release decision or adoption of a production algorithm.

The accepted supplement remains at blob
`007d689e2c44f50df6242137348add66c5019cc8`, reviewed at
`0be8bb1519d7aec2810b03192de6590ec9168c60`. Numerical content GO and SF-1 CLOSED
remain unchanged. The initial review is retained at the exact blob
`5c6f30630f3daee80c59210e892398b53d4cd660` cited by the close review; PR 208's
presentation variant differed only in two environment-provenance lines, which
were restored to that cited version before integration. PR 210 retains blob
`3a27ff94092349e7d8bba7d41e1197ba2f138951`.

Source-access review history is preserved in PR 217: the initial failed-access
report, provided-copy inspection, and correcting addendum. The controlling source
status is COMPLETE_ON_PROVIDED_COPIES for these two documentation pages, per
`review-inputs/r4-qr-cancellation-source-access/PROVIDED-COPY-REVIEW-ADDENDUM.md`
at `b7b4b1463253bdc0f016d2b93486cf2ebe9390e5`, blob
`d180862273255fb84de2c8ad34f37efdc6720af7`. This supersedes the earlier
SOURCE_ACCESS_INCOMPLETE bookkeeping above for these pages only. The steward
accepts that bounded provided-copy determination with its disclosed provenance
limits; no further direct retrieval is required for this intake.

The reviewed packet is identified by SHA-256
`61edb647e867e4e26bc3771acce2eb2e2361924610ba34d7612fa9b184984ba4`.
The addendum records 33 matching checksums, withdraws unsupported acquisition-role
assertions, and discloses the author's post-acquisition method-string edit. The
packet and historical review files are unchanged. Supplied bytes and reported
transfer details remain distinguished from independently witnessed acquisition.

PRs 208, 210 and 217 were merged into the research branch under this authorization;
PR 205 carries the resulting research and review record into main. The original
factorial-methodology holds, S6, programme INPUT_INCOMPLETE, and remaining numerical
commission work remain open. Release 3 scope and numbering are unchanged. This
acceptance issues no identifiers, changes no schema, tolerance or supported
execution contract, and publishes no release or website announcement.
