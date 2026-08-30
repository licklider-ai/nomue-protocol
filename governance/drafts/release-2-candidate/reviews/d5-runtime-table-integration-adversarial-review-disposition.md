# D5 runtime-table integration adversarial-review disposition

## Review identity

- Implementation target: `f9b039d746fb32364d1cc9c517a71d56873dbc79`
- Review protocol commit: `b3670f98dd40d2d08516e037ad36f1c2bc3b4100`
- Independent review-result commit: `09e720615dd3705773a5a4cc764cc3be37cedea9`
- Review type: independent, adversarial, delta-scoped review
- Verdict: **GO**
- Findings: none
- Additional primary-source research requested: none

The reviewed target connects the exact inverse-beta table accepted after PR #37 to
the unchanged runtime-series evaluation graph reviewed after PR #33. The review
confirmed the exact implementation tree, its parent baseline, and the intended
11-file delta with no unexpected path.

## Evidence established by the review

The reviewer confirmed that the checked-in table is byte-identical to the prior
review artifact and independently recomputed its SHA-256 as
`ba1f992199e9e153956589d62dcf5a6509575100bb7c923c170bfa45fdd76c08`.

The review also established:

- rejection of all 32 table mutations, including coherent structural changes,
  hostile binary64 encodings, promotion flags, undeclared fields, and malformed
  JSON, with no uncaught exception;
- exact table lookup and graph equivalence across 371 cases, including every
  integer df from 1 through 200, a separately selected statistic corpus, and
  invalid-input classification checks, with zero mismatch;
- rejection of all 15 promotion mutations across the integration checkpoint, the
  prior table checkpoint, and the numerical-readiness checkpoint;
- preservation of the Release 1 and authoritative surfaces;
- no new externally grounded numerical decision requiring another research pass;
  and
- a successful fresh-clone `pnpm install --frozen-lockfile` and full `pnpm check`,
  followed by an empty `git status --porcelain`.

The reviewer reported one worktree-local private-dependency-audit false positive
caused by Git's absolute administrative worktree path. A separate fresh clone
passed the same validation, so the observation was environmental and was not a
finding against the implementation target.

## Disposition

The hash-bound table-to-graph connection is accepted as a reviewed,
non-authoritative R2-D5 candidate integration. It may be merged in that limited
state.

This disposition does not select a final runtime table or final table hash,
establish a supported df maximum, prove a global truth-error bound, close the
supported-platform matrix, activate runtime support, issue a Public Check or
bundle, approve paired-t support, complete R2-D5, publish Release 2, or close the
public review.
