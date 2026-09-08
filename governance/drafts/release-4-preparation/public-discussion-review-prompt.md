# Independent review instructions for Release 4 opening preparation

Act as an independent investigator in a separate authoring context. Read
AGENTS.md and its ordered governance prerequisites first. Review this research
increment for public-discussion preparation, not formal adoption. Do not merge,
publish, ratify, change Release 3, or close a wider programme hold.

## Pin inputs before work

Resolve `research/r4-opening-readiness-next` in `licklider-ai/nomue-protocol`
once and record its full commit, parent, tree and the blobs for this prompt,
`public-discussion-readiness.md`, `ss-f-propagation-supplement.md`, and the two
files under `probes/`. These paths are relative to
`governance/drafts/release-4-preparation/`.
Do not follow later moving-head changes without a fresh input record. Check the
script SHA-256 against the recorded result. Verify the immutable semantic,
numerical and degree-guard inputs listed in the readiness document; if missing,
report the affected review scope as `INPUT_INCOMPLETE` rather than inventing it.
The baseline is `cd217f88238a2ecc57b72f5835a813d92270f5ad`.

## Numerical review

1. Independently derive the exact SS, SSE, df and F expectations from actual
   binary64 inputs. Do not use the submitted exact function as the sole oracle.
2. Re-run the 945 cases and three diagnostics. Record Python, NumPy, BLAS,
   threading and script/corpus hashes. Separate environment-dependent differences
   from code or mathematical errors. Report all counts without truncated totals.
3. Check graph ordering, builtin sum semantics, centered-response residuals,
   projection versus real equality, zero/nonfinite classification and denominator
   domain handling. Verify the witnesses and investigate meaningful errors rather
   than judging algorithms from bit-match counts alone.
4. Decide whether each prose claim is supported only on the finite corpus, or
   overstates a domain or inferential conclusion. No proposed tolerance is implied.

## Preparation and source review

Review the R4-P1 through R4-P6 mapping against the existing commission. Identify
any hidden methodological choice in Candidate A, including normalization,
error assumptions, intervals, multiplicity and exclusions. Assess which S1-S6
holds are necessary before opening and which may remain clearly staged; do not
waive S6 solely because the proposed first scope is smaller.

Prioritize obtaining and reviewing original sources for classical fixed-effects
F calibration and any proposed interval (S5), recording exact editions, pages,
assumptions and claim mappings, and reconcile the missing Yates source (S1).
Use lawful accessible originals or transparently identified provided copies.
An abstract, catalogue entry or secondary summary is not full-source review.
Record unavailable inputs and create a precise acquisition request if needed;
do not bypass access controls. Do not repeat the already completed NIST/LAPACK
provided-copy review just to demand a different downloader.

If carrying out S6, run two actual installed statistical systems on the same
unbalanced fixture, with factor coding, model terms, hypothesis matrices,
weighting, software versions and outputs recorded. Algebraic reconstruction or
two calls to the same system do not satisfy that task.

## Deliverable

Add an English review record under
`review-inputs/r4-public-discussion-preparation/REVIEW-RESULT.md` on a neutral
review branch and create a draft PR. Record exact inputs, sources accessed,
independent derivation, executable reproduction, BLOCKER/SHOULD-FIX/NICE-TO-HAVE
findings, and a bounded verdict. Separate numerical correctness, source access,
public-opening readiness and formal adoption. Disclose provider/model identity
as actually available, role and independence limits; do not invent a human
investigator identity. Run applicable formatting, lint and repository validation.
A GO on this supplement alone does not authorize public opening of Release 4.
