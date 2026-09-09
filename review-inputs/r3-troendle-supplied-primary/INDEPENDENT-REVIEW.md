# Independent review of the bounded Troendle investigation

Use the submitted full commit identified in this investigation's draft PR body
as REVIEW_COMMIT. Pin it before reading; do not follow a moving branch. Its
sole parent is `55d30240252517aa4a84b8cccf374a72260c3426`. This is a later
review instruction, not a claim that independent review has occurred.

## Fixed input and source gates

1. Read AGENTS.md and the six ordered Read-first documents, applicable local
   instructions, the semantic-source-acquisition commission, the original
   `review-inputs/r3-source-review-receipts/TROENDLE-HANDOFF.md`, cumulative
   Parts Y-AA and the new Part AB. Read this directory's complete report and
   both scripts. Read the prior Ge report as attributed reused evidence.
2. Verify the exact commit, sole parent, tree and output blob identities against
   the draft PR body. Verify exactly four additions in this directory and only
   the cumulative append as an existing-file modification. Run
   `python3 review-inputs/r3-troendle-supplied-primary/check-preservation.py`
   on the reviewed commit before creating a separate output commit. Independently
   verify the 552103-byte prefix, SHA-256
   `7f558850f37e70487e145e97d2fdf15d5ea0ddf0fb537074fb810b489bf4306c`,
   and every other pre-existing blob. The fixed semantic catalogue remains blob
   `8f21526040924b891f64724c2d0fde9ea94eff92` at commit
   `7bd9c5ab854777c3e99e624d9d2ed62731228852`.
3. Use the supplied `30_Troendle_1995.pdf`: 1020647 bytes, 10 pages, SHA-256
   `21c9fbad95c8c29e709863aa45d314deca1f70f4bf148da1b7407f3178f08b54`.
   If unavailable, request the identical attachment, not another original.
   PDF 1 is the cover; PDF 2-10 are pp.370-378. The source cap is already
   approved. No new original, purchase or repeat scope approval is needed.

## Scientific review

Read the supplied article in full and inspect the decision-bearing images.
Concentrate on the following bounded questions:

- Verify (1)-(5), all three SR algorithms, inclusive event counting, strict
  alpha comparison, fixed observed order, shared resamples, all-rejected
  endpoint and the running maximum on p.375. Distinguish printed rules from
  the author's index tie convention and the infimum qualification.
- Verify the family is multiple outcomes in two groups, not all pairs among
  multiple groups. Check statistic direction, p-value transformation and the
  limits of maxT/minP equivalence.
- Verify Theorem 1's ideal-calibration boundary and Theorem 2's exact order of
  limits, limsup, fixed N0, with-replacement law, integrability and iid true-
  subvector premise on p.376. Assess whether the report's remaining proof
  limitations are sufficient and candid, including (A.12)'s malformed display
  and boundary mass at alpha. Do not turn an inspected theorem statement into
  a claim of fully verified arbitrary-G convergence.
- Independently assess the common-reference first-true-step argument, the tie
  block argument and the need for joint rather than merely marginal null
  equality. The prior Ge discussion is reused, not a new reading of that PDF.
- Recalculate the six-allocation example and the 256 pooled draws independently.
  Check the author's hand pair-sum arithmetic (12 and 37 counts), the 252-
  allocation source example, and the convolution lower bound 193/512. Check
  the Bernoulli finite-M witness: 3/16 at alpha=1/20 is outside the theorem's
  limit and is not presented as a contradiction of it.
- Run the author diagnostic, but do not count that alone as independent
  recalculation. Test at least one tied ordering, equality at alpha, broken
  draw alignment and stopping/monotonicity example with your own reasoning.
- Confirm that Tables 1-9 are treated as empirical/source material and that
  Table 8's marginal counts cannot reconstruct Table 9's joint resampling.
  No historical Fortran, raw infant data or simulation replication is required.

## Scope, disclosure and return

Give GO, NO-GO or INSUFFICIENT_EVIDENCE only for the accuracy of the bounded
submitted author record, with BLOCKER / SHOULD-FIX / NICE-TO-HAVE counts,
precise page findings, independently obtained values and omitted work.
A GO does not certify the unrestricted theorem, satisfy formal independence
automatically, close RSM-02 or authorize release.

Keep 9 CLOSED (SR-B/C/D/F/G/I/J/K/L), 1 PARTIAL (SR-H), and 4 INPUT_INCOMPLETE
(SR-A/E, RSM-01/02); SOURCE_SET_READY=false; overall INPUT_INCOMPLETE;
NARROW/TRANSFER; candidate/reserved classes; prior limited acceptances and
residual conditions. Do not investigate or repair PR #174/#263/#265, redefine
the catalogue, substitute sources, authorize public opening or merge. Bibliography
entries are not inspected originals. A new wider scientific question may be
recorded as a future scoped task, not silently solved by an unprovided source.

Use a neutral new `review/r3-troendle-supplied-primary-*` branch from
REVIEW_COMMIT. Add a separate English review report and any independent
reproduction script; preserve the reviewed author files and historical append
bytes. Run `pnpm format:check`, `pnpm lint:markdown`,
`node --import tsx tooling/src/validate.ts` and `git diff --cached --check`,
plus diagnostic and output-scope preservation checks. The author's preservation
script checks its own five-file increment; after adding review files, audit your
new increment separately rather than relaxing the author script.

Create a separate draft PR targeting
`research/r3-troendle-supplied-primary-20260909`. Record reviewed and returned
immutable identities and failed/unavailable checks. Recheck the original
reviewed head before submission and disclose any movement without changing
the review target. Disclose prior involvement, context, provider and model
attestation limits. A separate investigator/model pass is required by the
research gate; the author cannot self-certify it. End with a Japanese account
of the bounded verdict, necessary repairs and remaining review boundaries.
